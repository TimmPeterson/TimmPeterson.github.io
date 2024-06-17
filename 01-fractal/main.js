(function () {
  'use strict';

  //const { Pane } = require("./node_modules/tweakpane/dist/tweakpane.js");

  let canvas, gl, timeLoc;

  let MxLoc, MyLoc, MzLoc, rLoc, gLoc, bLoc, dxLoc, dyLoc;

  // OpenGL initialization function
  function initGL() {
    canvas = document.getElementById("myCan");
    canvas.addEventListener("mousemove", (e) => onMouseMove(e));
    canvas.addEventListener("wheel", (e) => onScroll(e));

    gl = canvas.getContext("webgl2");
    gl.clearColor(0.3, 0.47, 0.8, 1);

    // Shader creation
    let vs_txt = `#version 300 es
  precision highp float;
  in vec3 InPosition;
    
  out vec2 DrawPos;
  uniform float Time;
 
  void main( void )
  {
    gl_Position = vec4(InPosition, 1);
    DrawPos = InPosition.xy;
  }
  `;

    let fs_txt = `#version 300 es
  precision highp float;
  out vec4 OutColor;
  
  in vec2 DrawPos;
  uniform float Time;
  uniform float Mx;
  uniform float My;
  uniform float Mz;
  uniform float R;
  uniform float G;
  uniform float B;
  uniform float dX;
  uniform float dY;
  uniform float StartX;
  uniform float StartY;
  uniform float EndX;
  uniform float EndY;


  vec2 CmplMulCmpl( vec2 A, vec2 B )
  {
    return vec2(A.x * B.x - A.y * B.y, A.x * B.y + A.x * B.y);
  }

  vec2 f( vec2 Z ) 
  {
    return CmplMulCmpl(Z, Z);//CmplMulCmpl(CmplMulCmpl(Z, Z), Z);
  }

  void main( void )
  {
    int n = 0;  
    vec2 Z, Z0;
    
    Z = (gl_FragCoord.xy / vec2(2000.0) - 0.5) * 2.0;
    Z.x = (Z.x + 1.0) / 2.0 * (EndX - StartX) + StartX;
    Z.y = (Z.y + 1.0) / 2.0 * (EndY - StartY) + StartY;
    Z0 = Z;//vec2(0.5, 0.32);

    while (n < 255 && dot(Z, Z) < 4.0)
    {
      Z = f(Z);
      Z = Z + Z0;
      n++;
    }
    OutColor = vec4(vec3(3.0 * vec3(float(n) / 250.0, float(n) / 230.0, float(n) / 240.0)) * vec3(R, G, B) / 255.0, 1.0);
  }
  `;
    let vs = loadShader(gl.VERTEX_SHADER, vs_txt),
      fs = loadShader(gl.FRAGMENT_SHADER, fs_txt),
      prg = gl.createProgram();
    gl.attachShader(prg, vs);
    gl.attachShader(prg, fs);
    gl.linkProgram(prg);
    if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
      let buf = gl.getProgramInfoLog(prg);
      console.log("Shader program link fail: " + buf);
    }

    // Vertex buffer creation
    const size = 1;
    const vertexes = [
      -size,
      size,
      0,
      -size,
      -size,
      0,
      size,
      size,
      0,
      size,
      -size,
      0,
    ];
    const posLoc = gl.getAttribLocation(prg, "InPosition");
    let vertexArray = gl.createVertexArray();
    gl.bindVertexArray(vertexArray);
    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexes), gl.STATIC_DRAW);
    if (posLoc != -1) {
      gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(posLoc);
    }

    // Uniform data
    timeLoc = gl.getUniformLocation(prg, "Time");

    // Getting location from shader
    MxLoc = gl.getUniformLocation(prg, "Mx");
    MyLoc = gl.getUniformLocation(prg, "My");
    MzLoc = gl.getUniformLocation(prg, "Mz");
    rLoc = gl.getUniformLocation(prg, "R");
    gLoc = gl.getUniformLocation(prg, "G");
    bLoc = gl.getUniformLocation(prg, "B");
    dxLoc = gl.getUniformLocation(prg, "dX");
    dyLoc = gl.getUniformLocation(prg, "dY");
    LocEx = gl.getUniformLocation(prg, "EndX");
    LocSx = gl.getUniformLocation(prg, "StartX");
    LocEy = gl.getUniformLocation(prg, "EndY");
    LocSy = gl.getUniformLocation(prg, "StartY");

    gl.useProgram(prg);

    //const pane = new Pane();
    //pane.addBinding(PARAMS, "background");
  } // End of 'initGL' function

  // Load and compile shader function
  function loadShader(shaderType, shaderSource) {
    const shader = gl.createShader(shaderType);
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      let buf = gl.getShaderInfoLog(shader);
      console.log("Shader compile fail: " + buf);
    }
    return shader;
  } // End of 'loadShader' function

  // 
  let LocSx, LocSy, LocEx, LocEy;
  let StartX = -1, StartY = -1, EndX = 1, EndY = 1;

  // Main render frame function
  function render() {
    // console.log(`Frame ${x++}`);
    gl.clear(gl.COLOR_BUFFER_BIT);

    if (timeLoc != -1) {
      const date = new Date();
      let t =
        date.getMinutes() * 60 +
        date.getSeconds() +
        date.getMilliseconds() / 1000;

      gl.uniform1f(timeLoc, t);
      gl.uniform1f(MxLoc, Mx);
      gl.uniform1f(MyLoc, My);
      gl.uniform1f(MzLoc, Mz);
      gl.uniform1f(rLoc, PARAMS.background.r);
      gl.uniform1f(gLoc, PARAMS.background.g);
      gl.uniform1f(bLoc, PARAMS.background.b);
      gl.uniform1f(dxLoc, dx);
      gl.uniform1f(dyLoc, dy);
      gl.uniform1f(LocSx, StartX);
      gl.uniform1f(LocSy, StartY);
      gl.uniform1f(LocEx, EndX);
      gl.uniform1f(LocEy, EndY);
    }
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  } // End of 'render' function

  console.log("CGSG forever!!! mylib.js imported");

  let Mx = 0,
    My = 0,
    Mz = 1,
    dx = 0, dy = 0;
  const PARAMS = {
    //key: "#ff0055ff",
    background: { r: 255.0, g: 255.0, b: 255.0 },
  };

  function onScroll(event) {
    let sz = 0.001;

    event.preventDefault();
    Mz += event.deltaY * sz;

    let mx = (Mx / 2000.0 - 0.5) * 2;
    let my = (1.0 - My / 2000.0 - 0.5) * 2;
    let NewStartX, NewEndX, NewStartY, NewEndY;

    let f;
    if (event.deltaY < 0)
      f = 0.9;
    else
      f = 1 / .9;

    let nmx = (mx + 1) / 2 * (EndX - StartX) + StartX;
    let nmy = (my + 1) / 2 * (EndY - StartY) + StartY;

    NewStartX = nmx - f * (nmx - StartX);
    NewEndX = nmx - f * (nmx - EndX);

    NewStartY = nmy - f * (nmy - StartY);
    NewEndY = nmy - f * (nmy - EndY);

    StartX = NewStartX;
    StartY = NewStartY;
    EndX = NewEndX;
    EndY = NewEndY;
  }

  function onMouseMove(event) {
    if (event.buttons == 1) {
      let dx = EndX - StartX;
      let dy = EndY - StartY;
      StartX -= event.movementX / 2000.0 * dx;
      EndX -= event.movementX / 2000.0 * dx;
      StartY += event.movementY / 2000.0 * dy;
      EndY += event.movementY / 2000.0 * dy;
    }
    Mx = event.clientX;
    My = event.clientY;
    event.preventDefault();
  }


  window.addEventListener("load", () => {
    initGL();
    const draw = () => {
      render();
      window.requestAnimationFrame(draw);
    };
    draw();
  });

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL2NvbnN0IHsgUGFuZSB9ID0gcmVxdWlyZShcIi4vbm9kZV9tb2R1bGVzL3R3ZWFrcGFuZS9kaXN0L3R3ZWFrcGFuZS5qc1wiKTtcclxuXHJcbmxldCBjYW52YXMsIGdsLCB0aW1lTG9jO1xyXG5cclxubGV0IE14TG9jLCBNeUxvYywgTXpMb2MsIHJMb2MsIGdMb2MsIGJMb2MsIGR4TG9jLCBkeUxvYztcclxuXHJcbi8vIE9wZW5HTCBpbml0aWFsaXphdGlvbiBmdW5jdGlvblxyXG5mdW5jdGlvbiBpbml0R0woKSB7XHJcbiAgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUNhblwiKTtcclxuICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCAoZSkgPT4gb25Nb3VzZU1vdmUoZSkpO1xyXG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgKGUpID0+IG9uU2Nyb2xsKGUpKTtcclxuXHJcbiAgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dChcIndlYmdsMlwiKTtcclxuICBnbC5jbGVhckNvbG9yKDAuMywgMC40NywgMC44LCAxKTtcclxuXHJcbiAgLy8gU2hhZGVyIGNyZWF0aW9uXHJcbiAgbGV0IHZzX3R4dCA9IGAjdmVyc2lvbiAzMDAgZXNcclxuICBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7XHJcbiAgaW4gdmVjMyBJblBvc2l0aW9uO1xyXG4gICAgXHJcbiAgb3V0IHZlYzIgRHJhd1BvcztcclxuICB1bmlmb3JtIGZsb2F0IFRpbWU7XHJcbiBcclxuICB2b2lkIG1haW4oIHZvaWQgKVxyXG4gIHtcclxuICAgIGdsX1Bvc2l0aW9uID0gdmVjNChJblBvc2l0aW9uLCAxKTtcclxuICAgIERyYXdQb3MgPSBJblBvc2l0aW9uLnh5O1xyXG4gIH1cclxuICBgO1xyXG5cclxuICBsZXQgZnNfdHh0ID0gYCN2ZXJzaW9uIDMwMCBlc1xyXG4gIHByZWNpc2lvbiBoaWdocCBmbG9hdDtcclxuICBvdXQgdmVjNCBPdXRDb2xvcjtcclxuICBcclxuICBpbiB2ZWMyIERyYXdQb3M7XHJcbiAgdW5pZm9ybSBmbG9hdCBUaW1lO1xyXG4gIHVuaWZvcm0gZmxvYXQgTXg7XHJcbiAgdW5pZm9ybSBmbG9hdCBNeTtcclxuICB1bmlmb3JtIGZsb2F0IE16O1xyXG4gIHVuaWZvcm0gZmxvYXQgUjtcclxuICB1bmlmb3JtIGZsb2F0IEc7XHJcbiAgdW5pZm9ybSBmbG9hdCBCO1xyXG4gIHVuaWZvcm0gZmxvYXQgZFg7XHJcbiAgdW5pZm9ybSBmbG9hdCBkWTtcclxuICB1bmlmb3JtIGZsb2F0IFN0YXJ0WDtcclxuICB1bmlmb3JtIGZsb2F0IFN0YXJ0WTtcclxuICB1bmlmb3JtIGZsb2F0IEVuZFg7XHJcbiAgdW5pZm9ybSBmbG9hdCBFbmRZO1xyXG5cclxuXHJcbiAgdmVjMiBDbXBsTXVsQ21wbCggdmVjMiBBLCB2ZWMyIEIgKVxyXG4gIHtcclxuICAgIHJldHVybiB2ZWMyKEEueCAqIEIueCAtIEEueSAqIEIueSwgQS54ICogQi55ICsgQS54ICogQi55KTtcclxuICB9XHJcblxyXG4gIHZlYzIgZiggdmVjMiBaICkgXHJcbiAge1xyXG4gICAgcmV0dXJuIENtcGxNdWxDbXBsKFosIFopOy8vQ21wbE11bENtcGwoQ21wbE11bENtcGwoWiwgWiksIFopO1xyXG4gIH1cclxuXHJcbiAgdm9pZCBtYWluKCB2b2lkIClcclxuICB7XHJcbiAgICBpbnQgbiA9IDA7ICBcclxuICAgIHZlYzIgWiwgWjA7XHJcbiAgICBcclxuICAgIFogPSAoZ2xfRnJhZ0Nvb3JkLnh5IC8gdmVjMigyMDAwLjApIC0gMC41KSAqIDIuMDtcclxuICAgIFoueCA9IChaLnggKyAxLjApIC8gMi4wICogKEVuZFggLSBTdGFydFgpICsgU3RhcnRYO1xyXG4gICAgWi55ID0gKFoueSArIDEuMCkgLyAyLjAgKiAoRW5kWSAtIFN0YXJ0WSkgKyBTdGFydFk7XHJcbiAgICBaMCA9IFo7Ly92ZWMyKDAuNSwgMC4zMik7XHJcblxyXG4gICAgd2hpbGUgKG4gPCAyNTUgJiYgZG90KFosIFopIDwgNC4wKVxyXG4gICAge1xyXG4gICAgICBaID0gZihaKTtcclxuICAgICAgWiA9IFogKyBaMDtcclxuICAgICAgbisrO1xyXG4gICAgfVxyXG4gICAgT3V0Q29sb3IgPSB2ZWM0KHZlYzMoMy4wICogdmVjMyhmbG9hdChuKSAvIDI1MC4wLCBmbG9hdChuKSAvIDIzMC4wLCBmbG9hdChuKSAvIDI0MC4wKSkgKiB2ZWMzKFIsIEcsIEIpIC8gMjU1LjAsIDEuMCk7XHJcbiAgfVxyXG4gIGA7XHJcbiAgbGV0IHZzID0gbG9hZFNoYWRlcihnbC5WRVJURVhfU0hBREVSLCB2c190eHQpLFxyXG4gICAgZnMgPSBsb2FkU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUiwgZnNfdHh0KSxcclxuICAgIHByZyA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcclxuICBnbC5hdHRhY2hTaGFkZXIocHJnLCB2cyk7XHJcbiAgZ2wuYXR0YWNoU2hhZGVyKHByZywgZnMpO1xyXG4gIGdsLmxpbmtQcm9ncmFtKHByZyk7XHJcbiAgaWYgKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByZywgZ2wuTElOS19TVEFUVVMpKSB7XHJcbiAgICBsZXQgYnVmID0gZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJnKTtcclxuICAgIGNvbnNvbGUubG9nKFwiU2hhZGVyIHByb2dyYW0gbGluayBmYWlsOiBcIiArIGJ1Zik7XHJcbiAgfVxyXG5cclxuICAvLyBWZXJ0ZXggYnVmZmVyIGNyZWF0aW9uXHJcbiAgY29uc3Qgc2l6ZSA9IDE7XHJcbiAgY29uc3QgdmVydGV4ZXMgPSBbXHJcbiAgICAtc2l6ZSxcclxuICAgIHNpemUsXHJcbiAgICAwLFxyXG4gICAgLXNpemUsXHJcbiAgICAtc2l6ZSxcclxuICAgIDAsXHJcbiAgICBzaXplLFxyXG4gICAgc2l6ZSxcclxuICAgIDAsXHJcbiAgICBzaXplLFxyXG4gICAgLXNpemUsXHJcbiAgICAwLFxyXG4gIF07XHJcbiAgY29uc3QgcG9zTG9jID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJnLCBcIkluUG9zaXRpb25cIik7XHJcbiAgbGV0IHZlcnRleEFycmF5ID0gZ2wuY3JlYXRlVmVydGV4QXJyYXkoKTtcclxuICBnbC5iaW5kVmVydGV4QXJyYXkodmVydGV4QXJyYXkpO1xyXG4gIGxldCB2ZXJ0ZXhCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcclxuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdmVydGV4QnVmZmVyKTtcclxuICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheSh2ZXJ0ZXhlcyksIGdsLlNUQVRJQ19EUkFXKTtcclxuICBpZiAocG9zTG9jICE9IC0xKSB7XHJcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHBvc0xvYywgMywgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHBvc0xvYyk7XHJcbiAgfVxyXG5cclxuICAvLyBVbmlmb3JtIGRhdGFcclxuICB0aW1lTG9jID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByZywgXCJUaW1lXCIpO1xyXG5cclxuICAvLyBHZXR0aW5nIGxvY2F0aW9uIGZyb20gc2hhZGVyXHJcbiAgTXhMb2MgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJnLCBcIk14XCIpO1xyXG4gIE15TG9jID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByZywgXCJNeVwiKTtcclxuICBNekxvYyA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcmcsIFwiTXpcIik7XHJcbiAgckxvYyA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcmcsIFwiUlwiKTtcclxuICBnTG9jID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByZywgXCJHXCIpO1xyXG4gIGJMb2MgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJnLCBcIkJcIik7XHJcbiAgZHhMb2MgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJnLCBcImRYXCIpO1xyXG4gIGR5TG9jID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByZywgXCJkWVwiKTtcclxuICBMb2NFeCA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcmcsIFwiRW5kWFwiKTtcclxuICBMb2NTeCA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcmcsIFwiU3RhcnRYXCIpO1xyXG4gIExvY0V5ID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByZywgXCJFbmRZXCIpO1xyXG4gIExvY1N5ID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByZywgXCJTdGFydFlcIik7XHJcblxyXG4gIGdsLnVzZVByb2dyYW0ocHJnKTtcclxuXHJcbiAgLy9jb25zdCBwYW5lID0gbmV3IFBhbmUoKTtcclxuICAvL3BhbmUuYWRkQmluZGluZyhQQVJBTVMsIFwiYmFja2dyb3VuZFwiKTtcclxufSAvLyBFbmQgb2YgJ2luaXRHTCcgZnVuY3Rpb25cclxuXHJcbi8vIExvYWQgYW5kIGNvbXBpbGUgc2hhZGVyIGZ1bmN0aW9uXHJcbmZ1bmN0aW9uIGxvYWRTaGFkZXIoc2hhZGVyVHlwZSwgc2hhZGVyU291cmNlKSB7XHJcbiAgY29uc3Qgc2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKHNoYWRlclR5cGUpO1xyXG4gIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHNoYWRlclNvdXJjZSk7XHJcbiAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xyXG4gIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XHJcbiAgICBsZXQgYnVmID0gZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpO1xyXG4gICAgY29uc29sZS5sb2coXCJTaGFkZXIgY29tcGlsZSBmYWlsOiBcIiArIGJ1Zik7XHJcbiAgfVxyXG4gIHJldHVybiBzaGFkZXI7XHJcbn0gLy8gRW5kIG9mICdsb2FkU2hhZGVyJyBmdW5jdGlvblxyXG5cclxubGV0IHggPSAxO1xyXG5cclxuLy8gXHJcbmxldCBMb2NTeCwgTG9jU3ksIExvY0V4LCBMb2NFeTtcclxubGV0IFN0YXJ0WCA9IC0xLCBTdGFydFkgPSAtMSwgRW5kWCA9IDEsIEVuZFkgPSAxO1xyXG5cclxuLy8gTWFpbiByZW5kZXIgZnJhbWUgZnVuY3Rpb25cclxuZnVuY3Rpb24gcmVuZGVyKCkge1xyXG4gIC8vIGNvbnNvbGUubG9nKGBGcmFtZSAke3grK31gKTtcclxuICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKTtcclxuXHJcbiAgaWYgKHRpbWVMb2MgIT0gLTEpIHtcclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgbGV0IHQgPVxyXG4gICAgICBkYXRlLmdldE1pbnV0ZXMoKSAqIDYwICtcclxuICAgICAgZGF0ZS5nZXRTZWNvbmRzKCkgK1xyXG4gICAgICBkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8gMTAwMDtcclxuXHJcbiAgICBnbC51bmlmb3JtMWYodGltZUxvYywgdCk7XHJcbiAgICBnbC51bmlmb3JtMWYoTXhMb2MsIE14KTtcclxuICAgIGdsLnVuaWZvcm0xZihNeUxvYywgTXkpO1xyXG4gICAgZ2wudW5pZm9ybTFmKE16TG9jLCBNeik7XHJcbiAgICBnbC51bmlmb3JtMWYockxvYywgUEFSQU1TLmJhY2tncm91bmQucik7XHJcbiAgICBnbC51bmlmb3JtMWYoZ0xvYywgUEFSQU1TLmJhY2tncm91bmQuZyk7XHJcbiAgICBnbC51bmlmb3JtMWYoYkxvYywgUEFSQU1TLmJhY2tncm91bmQuYik7XHJcbiAgICBnbC51bmlmb3JtMWYoZHhMb2MsIGR4KTtcclxuICAgIGdsLnVuaWZvcm0xZihkeUxvYywgZHkpO1xyXG4gICAgZ2wudW5pZm9ybTFmKExvY1N4LCBTdGFydFgpO1xyXG4gICAgZ2wudW5pZm9ybTFmKExvY1N5LCBTdGFydFkpO1xyXG4gICAgZ2wudW5pZm9ybTFmKExvY0V4LCBFbmRYKTtcclxuICAgIGdsLnVuaWZvcm0xZihMb2NFeSwgRW5kWSk7XHJcbiAgfVxyXG4gIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVfU1RSSVAsIDAsIDQpO1xyXG59IC8vIEVuZCBvZiAncmVuZGVyJyBmdW5jdGlvblxyXG5cclxuY29uc29sZS5sb2coXCJDR1NHIGZvcmV2ZXIhISEgbXlsaWIuanMgaW1wb3J0ZWRcIik7XHJcblxyXG5sZXQgTXggPSAwLFxyXG4gIE15ID0gMCxcclxuICBNeiA9IDEsXHJcbiAgZHggPSAwLCBkeSA9IDA7XHJcbmNvbnN0IFBBUkFNUyA9IHtcclxuICAvL2tleTogXCIjZmYwMDU1ZmZcIixcclxuICBiYWNrZ3JvdW5kOiB7IHI6IDI1NS4wLCBnOiAyNTUuMCwgYjogMjU1LjAgfSxcclxufTtcclxubGV0IHBhbmU7XHJcbmxldCBwYW5lUiwgcGFuZUcsIHBhbmVCO1xyXG5cclxuZnVuY3Rpb24gb25DbGljayhldmVudCkge1xyXG4gIGxldCBzcGVlZCA9IDMwLFxyXG4gICAgc3ogPSAwLjA0O1xyXG5cclxuICBpZiAoZXZlbnQua2V5ID09IFwiQXJyb3dMZWZ0XCIpIGR4ICs9IHNwZWVkO1xyXG4gIGlmIChldmVudC5rZXkgPT0gXCJBcnJvd1JpZ2h0XCIpIGR4IC09IHNwZWVkO1xyXG4gIGlmIChldmVudC5rZXkgPT0gXCJBcnJvd1VwXCIpIGR5ICs9IHNwZWVkO1xyXG4gIGlmIChldmVudC5rZXkgPT0gXCJBcnJvd0Rvd25cIikgZHkgLT0gc3BlZWQ7XHJcbiAgaWYgKGV2ZW50LmtleSA9PSBcIlBhZ2VVcFwiKSBNeiAtPSBzejtcclxuICBpZiAoZXZlbnQua2V5ID09IFwiUGFnZURvd25cIikgTXogKz0gc3o7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uU2Nyb2xsKGV2ZW50KSB7XHJcbiAgbGV0IHN6ID0gMC4wMDE7XHJcblxyXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgTXogKz0gZXZlbnQuZGVsdGFZICogc3o7XHJcblxyXG4gIGxldCBteCA9IChNeCAvIDIwMDAuMCAtIDAuNSkgKiAyO1xyXG4gIGxldCBteSA9ICgxLjAgLSBNeSAvIDIwMDAuMCAtIDAuNSkgKiAyO1xyXG4gIGxldCBOZXdTdGFydFgsIE5ld0VuZFgsIE5ld1N0YXJ0WSwgTmV3RW5kWTtcclxuXHJcbiAgbGV0IGY7XHJcbiAgaWYgKGV2ZW50LmRlbHRhWSA8IDApXHJcbiAgICBmID0gMC45O1xyXG4gIGVsc2VcclxuICAgIGYgPSAxIC8gLjk7XHJcblxyXG4gIGxldCBubXggPSAobXggKyAxKSAvIDIgKiAoRW5kWCAtIFN0YXJ0WCkgKyBTdGFydFg7XHJcbiAgbGV0IG5teSA9IChteSArIDEpIC8gMiAqIChFbmRZIC0gU3RhcnRZKSArIFN0YXJ0WTtcclxuXHJcbiAgTmV3U3RhcnRYID0gbm14IC0gZiAqIChubXggLSBTdGFydFgpO1xyXG4gIE5ld0VuZFggPSBubXggLSBmICogKG5teCAtIEVuZFgpO1xyXG5cclxuICBOZXdTdGFydFkgPSBubXkgLSBmICogKG5teSAtIFN0YXJ0WSk7XHJcbiAgTmV3RW5kWSA9IG5teSAtIGYgKiAobm15IC0gRW5kWSk7XHJcblxyXG4gIFN0YXJ0WCA9IE5ld1N0YXJ0WDtcclxuICBTdGFydFkgPSBOZXdTdGFydFk7XHJcbiAgRW5kWCA9IE5ld0VuZFg7XHJcbiAgRW5kWSA9IE5ld0VuZFk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uTW91c2VNb3ZlKGV2ZW50KSB7XHJcbiAgaWYgKGV2ZW50LmJ1dHRvbnMgPT0gMSkge1xyXG4gICAgbGV0IGR4ID0gRW5kWCAtIFN0YXJ0WDtcclxuICAgIGxldCBkeSA9IEVuZFkgLSBTdGFydFk7XHJcbiAgICBTdGFydFggLT0gZXZlbnQubW92ZW1lbnRYIC8gMjAwMC4wICogZHg7XHJcbiAgICBFbmRYIC09IGV2ZW50Lm1vdmVtZW50WCAvIDIwMDAuMCAqIGR4O1xyXG4gICAgU3RhcnRZICs9IGV2ZW50Lm1vdmVtZW50WSAvIDIwMDAuMCAqIGR5O1xyXG4gICAgRW5kWSArPSBldmVudC5tb3ZlbWVudFkgLyAyMDAwLjAgKiBkeTtcclxuICB9XHJcbiAgTXggPSBldmVudC5jbGllbnRYO1xyXG4gIE15ID0gZXZlbnQuY2xpZW50WTtcclxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG59XHJcblxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcclxuICBpbml0R0woKTtcclxuICBjb25zdCBkcmF3ID0gKCkgPT4ge1xyXG4gICAgcmVuZGVyKCk7XHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xyXG4gIH07XHJcbiAgZHJhdygpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztFQUFBO0FBQ0E7RUFDQSxJQUFJLE1BQU0sRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDO0FBQ3hCO0VBQ0EsSUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO0FBQ3hEO0VBQ0E7RUFDQSxTQUFTLE1BQU0sR0FBRztFQUNsQixFQUFFLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0VBQzVDLEVBQUUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RCxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkQ7RUFDQSxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0VBQ25DLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuQztFQUNBO0VBQ0EsRUFBRSxJQUFJLE1BQU0sR0FBRyxDQUFDO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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
