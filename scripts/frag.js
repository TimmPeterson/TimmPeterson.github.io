
const editor = CodeMirror.fromTextArea(document.getElementById('shader-editor'), {
  lineNumbers: true,
  mode: "text/x-c++src",
  theme: "material-palenight"
});
editor.setSize("100%", "100%");

const params = new URLSearchParams(window.location.search);
const shaderName = params.get('shader-name');

if (shaderName) {
  fetch(`../shaders/frag/${shaderName}.glsl`)
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
const gl = canvas.getContext("webgl2");
const logDiv = document.getElementById("shader-log");

if (!gl) {
    alert("Ваш браузер не поддерживает WebGL2");
}

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

// 2. Инициализация WebGL2 с простейшим vertex shader
const vertexShaderSource = `#version 300 es
in vec2 a_position;
void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
}`;

let program = null;
let vao = gl.createVertexArray();
gl.bindVertexArray(vao);

let positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
    -1,  1,
     1, -1,
     1,  1
]), gl.STATIC_DRAW);

let uTimeLocation = null;
let uResolutionLocation = null;

// Компиляция шейдера
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

// Создание и линковка программы
function createProgram(vertexSource, fragmentSource) {
    const vShader = compileShader(gl.VERTEX_SHADER, vertexSource);
    const fShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);

    if (!vShader || !fShader) return null;

    const prog = gl.createProgram();
    gl.attachShader(prog, vShader);
    gl.attachShader(prog, fShader);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error("Ошибка линковки программы:", gl.getProgramInfoLog(prog));
        return null;
    }

    return prog;
}

// 3. Функция обновления фрагментного шейдера
function updateFragmentShader(fragmentSource) {
    const newProgram = createProgram(vertexShaderSource, fragmentSource);
    if (!newProgram) return;

    program = newProgram;
    gl.useProgram(program);

    // Настройка атрибута позиции
    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    uTimeLocation = gl.getUniformLocation(program, "u_time");
    uResolutionLocation = gl.getUniformLocation(program, "u_resolution");
}

// 4. Рендер с передачей времени
let startTime = performance.now();

function render() {
    resizeCanvas();
    if (!program) return;

    gl.useProgram(program);
    gl.bindVertexArray(vao);

    let currentTime = (performance.now() - startTime) / 1000.0;

    if (uTimeLocation) {
        gl.uniform1f(uTimeLocation, currentTime);
    }

    if (uResolutionLocation) {
        gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);  
    }

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    requestAnimationFrame(render);
}

// 5. Колбэк на кнопку
const runBtn       = document.querySelector(".run-btn");
const shaderEditor = document.querySelector(".shader-editor");

runBtn.addEventListener("click", () => {
    const fragmentShaderSource = editor.getValue();
    logDiv.innerHTML = '<p class="green">Compiled successfully!</p>';
    updateFragmentShader(fragmentShaderSource);
});

// Первичная инициализация с дефолтным шейдером
updateFragmentShader(shaderEditor.value);
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
