
const editor = CodeMirror.fromTextArea(document.getElementById('shader-editor'), {
  lineNumbers: true,
  mode: "text/x-c++src",
  theme: "material-palenight"
});
editor.setSize("100%", "100%");

const params = new URLSearchParams(window.location.search);
const shaderName = params.get('shader-name');

if (shaderName) {
  fetch(`../shaders/vert/${shaderName}.glsl`)
    .then(response => {
      if (!response.ok) {
          throw new Error("Файл не найден");
      }
      return response.text();
    })
    .then(text => {
      editor.setValue(text);
      runBtn.click();
    })
    .catch(err => {
      editor.setValue("Ошибка загрузки шейдера: " + err.message);
    });
} else {
    editor.setValue("шейдер не задан");
}

// 1. Получение контекста WebGL2
const canvas = document.getElementById("shader-canvas");
const gl = canvas.getContext("webgl2", { depth: true });
const logDiv = document.getElementById("shader-log");

if (!gl) {
    alert("Ваш браузер не поддерживает WebGL2");
}

gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LEQUAL);

// Масштабируем канвас под размер окна
function resizeCanvas() {
    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    const dpr = window.devicePixelRatio || 1;
    const width  = Math.floor(displayWidth  * dpr);
    const height = Math.floor(displayHeight * dpr);

    if (canvas.width !== width || canvas.height !== height) {
        canvas.width  = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
    }
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// --------------------
// 2. Инициализация данных
// --------------------
let N = params.get('N') || 100;
document.querySelector('#vertex-count-slider').value = N;

// массивы позиций и id
const positions = [];
const ids = [];
for (let i = 0; i < N; i++) {
    positions.push(0.0, 0.0); // все в центре
    ids.push(i);
}

let vao = gl.createVertexArray();
gl.bindVertexArray(vao);

// буфер позиций
let positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

// буфер id
let idBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, idBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ids), gl.STATIC_DRAW);

// --------------------
// 3. Фиксированный фрагментный шейдер
// --------------------
const fragmentShaderSource = `#version 300 es
precision highp float;

in vec3 fragColor;

out vec4 outColor;

void main() {
    outColor = vec4(fragColor, 1.0);
}`;

// --------------------
// 4. Компиляция шейдеров
// --------------------
function compileShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        logDiv.innerHTML = '<p class="red">Ошибка компиляции шейдера:\n' + gl.getShaderInfoLog(shader) + '</p>';     
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function createProgram(vertexSource, fragmentSource) {
    const vShader = compileShader(gl.VERTEX_SHADER, vertexSource);
    const fShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);

    if (!vShader || !fShader) return null;

    const prog = gl.createProgram();
    gl.attachShader(prog, vShader);
    gl.attachShader(prog, fShader);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        logDiv.innerHTML = '<p class="red">Ошибка линковки программы:\n' + gl.getProgramInfoLog(prog) + '</p>';
        return null;
    }

    return prog;
}

// --------------------
// 5. Обновление вершинного шейдера
// --------------------
let program = null;
let uNLocation = null;
let uTimeLocation = null;
let uResolutionLocation = null;

function updateVertexShader(vertexSource) {
    const newProgram = createProgram(vertexSource, fragmentShaderSource);
    if (!newProgram) return;

    program = newProgram;
    gl.useProgram(program);

    gl.bindVertexArray(vao);

    // атрибут позиции
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // атрибут ID
    const idLoc = gl.getAttribLocation(program, "a_id");
    gl.bindBuffer(gl.ARRAY_BUFFER, idBuffer);
    gl.enableVertexAttribArray(idLoc);
    gl.vertexAttribPointer(idLoc, 1, gl.FLOAT, false, 0, 0);

    // Получаем локацию u_N
    uNLocation = gl.getUniformLocation(program, "u_N");

    // Получаем локацию u_tim
    uTimeLocation = gl.getUniformLocation(program, "u_time");

    // Получаем локацию u_resolution
    uResolutionLocation = gl.getUniformLocation(program, "u_resolution");
}

// --------------------
// 6. Рендер
// --------------------

let startTime = performance.now();

function render() {
    let currentTime = (performance.now() - startTime) / 1000.0;

    resizeCanvas();
    if (!program) return;

    gl.useProgram(program);
    gl.bindVertexArray(vao);

    // Передаём текущее N в uniform
    if (uNLocation) {
        gl.uniform1f(uNLocation, N);
    }

    if (uTimeLocation) {
        gl.uniform1f(uTimeLocation, currentTime);
    }

    if (uResolutionLocation) {
        gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);  
    }

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0, 0, 0, 1);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    gl.drawArrays(gl.POINTS, 0, N);

    requestAnimationFrame(render);
}

// --------------------
// 7. Колбэк на кнопку
// --------------------
const runBtn       = document.querySelector(".run-btn");
const shaderEditor = document.querySelector(".shader-editor");

runBtn.addEventListener("click", () => {
    const vertexShaderSource = editor.getValue();
    logDiv.innerHTML = '<p class="green">Compiled successfully!</p>';
    updateVertexShader(vertexShaderSource);
});

// --------------------
// 8. Дефолтный вершинный шейдер
// --------------------
const defaultVertexShader = `#version 300 es
in vec2 a_position;
in float a_id;

out vec3 fragColor;

void main() {
    // Простое позиционирование всех точек
    float angle = a_id * 0.06283; // ~2pi/100
    gl_Position = vec4(a_position + vec2(cos(angle), sin(angle)) * 0.5, 0.0, 1.0);
    gl_PointSize = 10.0;
    fragColor = vec3(0.0);
}`;

shaderEditor.value = defaultVertexShader;
updateVertexShader(defaultVertexShader);
resizeCanvas();
render();

//
// Divider
//

resizeCanvas();

const leftPanel  = document.querySelector('.editor-panel');
const divider    = document.querySelector('.divider');
const rightPanel = document.querySelector('.canvas-panel');

let isResizing = false;

divider.addEventListener('mousedown', () => {
  isResizing = true;
  document.body.style.cursor = 'ew-resize';
  console.log('mousedown');
});

document.addEventListener('mousemove', (e) => {
  if (!isResizing) return;
  const totalWidth = document.body.clientWidth;
  const leftWidth = e.clientX;
  leftPanel.style.flex = '0 0 ' + leftWidth + 'px';
  rightPanel.style.flex = '1 1 auto';
  resizeCanvas();
});

document.addEventListener('mouseup', () => {
  isResizing = false;
  document.body.style.cursor = 'default';
});

// window.setTimeout(resizeCanvas, 3000);
//
// End of divider
//


//
// Slider
//

// Ссылки на слайдер и текст
const slider = document.getElementById("vertex-count-slider");
const sliderLabel = document.getElementById("vertex-count-label");

// Функция обновления буферов при изменении N
function updateVertexBuffers(newN) {
    N = newN;

    // Обновляем текст
    sliderLabel.textContent = N;

    // Генерируем новые массивы
    const positions = [];
    const ids = [];
    for (let i = 0; i < N; i++) {
        positions.push(0.0, 0.0);
        ids.push(i);
    }

    // Обновляем буферы на GPU
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, idBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ids), gl.STATIC_DRAW);
}

// Слушаем изменение ползунка
slider.addEventListener("input", (e) => {
    const newN = parseInt(e.target.value);
    updateVertexBuffers(newN);
});

// Инициализация при старте
updateVertexBuffers(N);

//
// End of slider
//