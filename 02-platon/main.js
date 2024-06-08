(function () {
    'use strict';

    class _mat4 {
        constructor(
            a00, a01, a02, a03,
            a10, a11, a12, a13,
            a20, a21, a22, a23,
            a30, a31, a32, a33
        ) {
            this.a = [[a00, a01, a02, a03],
            [a10, a11, a12, a13],
            [a20, a21, a22, a23],
            [a30, a31, a32, a33]];
        }

        frustum(left, right, bottom, top, near, far) {
            this.a = [[2 * near / (right - left), 0, 0, 0],
            [0, 2 * near / (top - bottom), 0, 0],
            [(right + left) / (right - left), (top + bottom) / (top - bottom), -(far + near) / (far - near), -1],
            [0, 0, -2 * near * far / (far - near), 0]];
        }

        mul(m) {
            return mat4(
                this.a[0][0] * m.a[0][0] + this.a[0][1] * m.a[1][0] + this.a[0][2] * m.a[2][0] + this.a[0][3] * m.a[3][0],
                this.a[0][0] * m.a[0][1] + this.a[0][1] * m.a[1][1] + this.a[0][2] * m.a[2][1] + this.a[0][3] * m.a[3][1],
                this.a[0][0] * m.a[0][2] + this.a[0][1] * m.a[1][2] + this.a[0][2] * m.a[2][2] + this.a[0][3] * m.a[3][2],
                this.a[0][0] * m.a[0][3] + this.a[0][1] * m.a[1][3] + this.a[0][2] * m.a[2][3] + this.a[0][3] * m.a[3][3],
                this.a[1][0] * m.a[0][0] + this.a[1][1] * m.a[1][0] + this.a[1][2] * m.a[2][0] + this.a[1][3] * m.a[3][0],
                this.a[1][0] * m.a[0][1] + this.a[1][1] * m.a[1][1] + this.a[1][2] * m.a[2][1] + this.a[1][3] * m.a[3][1],
                this.a[1][0] * m.a[0][2] + this.a[1][1] * m.a[1][2] + this.a[1][2] * m.a[2][2] + this.a[1][3] * m.a[3][2],
                this.a[1][0] * m.a[0][3] + this.a[1][1] * m.a[1][3] + this.a[1][2] * m.a[2][3] + this.a[1][3] * m.a[3][3],
                this.a[2][0] * m.a[0][0] + this.a[2][1] * m.a[1][0] + this.a[2][2] * m.a[2][0] + this.a[2][3] * m.a[3][0],
                this.a[2][0] * m.a[0][1] + this.a[2][1] * m.a[1][1] + this.a[2][2] * m.a[2][1] + this.a[2][3] * m.a[3][1],
                this.a[2][0] * m.a[0][2] + this.a[2][1] * m.a[1][2] + this.a[2][2] * m.a[2][2] + this.a[2][3] * m.a[3][2],
                this.a[2][0] * m.a[0][3] + this.a[2][1] * m.a[1][3] + this.a[2][2] * m.a[2][3] + this.a[2][3] * m.a[3][3],
                this.a[3][0] * m.a[0][0] + this.a[3][1] * m.a[1][0] + this.a[3][2] * m.a[2][0] + this.a[3][3] * m.a[3][0],
                this.a[3][0] * m.a[0][1] + this.a[3][1] * m.a[1][1] + this.a[3][2] * m.a[2][1] + this.a[3][3] * m.a[3][1],
                this.a[3][0] * m.a[0][2] + this.a[3][1] * m.a[1][2] + this.a[3][2] * m.a[2][2] + this.a[3][3] * m.a[3][2],
                this.a[3][0] * m.a[0][3] + this.a[3][1] * m.a[1][3] + this.a[3][2] * m.a[2][3] + this.a[3][3] * m.a[3][3]);
        }
    }

    function mat4(
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        a30, a31, a32, a33
    ) {
        if (a00 == 1 && a01 == undefined)
            return new _mat4(
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);
        if (typeof a00 == "object")
            return new _mat4(
                a00[0][0], a00[0][1], a00[0][2], a00[0][3],
                a00[1][0], a00[1][1], a00[1][2], a00[1][3],
                a00[2][0], a00[2][1], a00[2][2], a00[2][3],
                a00[3][0], a00[3][1], a00[3][2], a00[3][3]
            );
        return new _mat4(
            a00, a01, a02, a03,
            a10, a11, a12, a13,
            a20, a21, a22, a23,
            a30, a31, a32, a33
        );
    }

    function matrRotate(angle, axis) {
        let si = Math.sin(angle), co = Math.cos(angle),
            v = axis.norm();

        return mat4(
            co + v.x * v.x * (1 - co),
            v.x * v.y * (1 - co) + v.z * si,
            v.x * v.z * (1 - co) - v.y * si,
            0,
            v.y * v.x * (1 - co) - v.z * si,
            co + v.y * v.y * (1 - co),
            v.y * v.z * (1 - co) + v.x * si,
            0,
            v.z * v.x * (1 - co) + v.y * si,
            v.z * v.y * (1 - co) - v.x * si,
            co + v.z * v.z * (1 - co),
            0, 0, 0, 0, 1
        );
    }

    function matrTranslate(t) {
        return mat4(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            t.x, t.y, t.z, 1
        );
    }

    class Render {
        // Load and compile shader function
        loadShader(shaderType, shaderSource) {
            const shader = this.gl.createShader(shaderType);
            this.gl.shaderSource(shader, shaderSource);
            this.gl.compileShader(shader);
            if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
                let buf = this.gl.getShaderInfoLog(shader);
                console.log("Shader compile fail: " + buf);
            }
            return shader;
        } // End of 'loadShader' function

        render() {
            // console.log(`Frame ${x++}`);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            this.gl.clear(this.gl.DEPTH_BUFFER_BIT);

            if (this.timeLoc != -1) {
                const date = new Date();
                let t =
                    date.getMinutes() * 60 +
                    date.getSeconds() +
                    date.getMilliseconds() / 1000;

                this.gl.uniform1f(this.timeLoc, t);
            }

            //}
        } // End of 'render' function

        constructor(canvas) {
            this.canvas = canvas;

            this.projSize = 0.1;
            this.projDist = 0.1;
            this.farClip = 300;

            let rect = canvas.getBoundingClientRect();
            this.width = rect.right - rect.left + 1;
            this.height = rect.bottom - rect.top + 1;

            this.gl = canvas.getContext("webgl2");
            this.gl.clearColor(0.9, 0.9, 0.9, 1);

            this.gl.enable(this.gl.DEPTH_TEST);
            // Shader creation
            let vs_txt = `#version 300 es
        precision highp float;
        in vec3 InPosition;
        in vec3 InNormal;
            
        out vec3 DrawPos;
        out vec3 DrawNormal;

        uniform float Time;
        uniform mat4 MatrProj;
        uniform mat4 MatrW;
        
        void main( void )
        {
            gl_Position = MatrProj * vec4(InPosition, 1);
            DrawPos = vec3(MatrW * vec4(InPosition.xyz, 1.0));
            DrawNormal = mat3(transpose(inverse(MatrW))) * InNormal;
        }
        `;

            let fs_txt = `#version 300 es
        precision highp float;
        
        out vec4 OutColor;
        
        in vec3 DrawPos;
        in vec3 DrawNormal;

        uniform float Time;

        void main( void )
        {
            vec3 L = normalize(vec3(0, 0.5, 1));
            vec3 N = normalize(DrawNormal);
            
            N = faceforward(N, normalize(DrawPos), N);
            
            float k = dot(L, normalize(N));

            OutColor = vec4(k * vec3(1, 0.5, 0.5), 1.0);
            //OutColor = vec4(N, 1.0);
        }
        `;

            let vs = this.loadShader(this.gl.VERTEX_SHADER, vs_txt),
                fs = this.loadShader(this.gl.FRAGMENT_SHADER, fs_txt),
                prg = this.gl.createProgram();

            this.gl.attachShader(prg, vs);
            this.gl.attachShader(prg, fs);
            this.gl.linkProgram(prg);

            this.prg = prg;

            if (!this.gl.getProgramParameter(prg, this.gl.LINK_STATUS)) {
                let buf = this.gl.getProgramInfoLog(prg);
                console.log("Shader program link fail: " + buf);
            }

            // Uniform data
            this.timeLoc = this.gl.getUniformLocation(prg, "Time");
            this.posLoc = this.gl.getAttribLocation(prg, "InPosition");
            this.normLoc = this.gl.getAttribLocation(prg, "InNormal");
            this.matrProjLoc = this.gl.getUniformLocation(prg, "MatrProj");
            this.matrWLoc = this.gl.getUniformLocation(prg, "MatrW");
            this.gl.useProgram(prg);
        }
    }

    class _vec3 {
        constructor(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        len2() {
            return this.dot(this);
        }

        len() {
            return Math.sqrt(this.dot(this));
        }

        norm() {
            let len = this.len();

            if (len == 0)
                return vec3(0);

            if (len == 1)
                return vec3(this);
            return this.div(len);
        }

        add(v) {
            return vec3(this.x + v.x, this.y + v.y, this.z + v.z);
        }

        sub(v) {
            return vec3(this.x - v.x, this.y - v.y, this.z - v.z);
        }

        mul(k) {
            return vec3(this.x * k, this.y * k, this.z * k);
        }

        div(k) {
            return vec3(this.x / k, this.y / k, this.z / k);
        }

        dot(v) {
            return this.x * v.x + this.y * v.y + this.z * v.z;
        }

        cross(v) {
            return vec3(this.y * v.z - this.z * v.y,
                this.z * v.x - this.x * v.z,
                this.x * v.y - this.y * v.x);
        }

        mulmatr(m) {
            let w = this.x * m.a[0][3] +
                this.y * m.a[1][3] +
                this.x * m.a[2][3] +
                m.a[3][3];

            return vec3(
                (this.x * m.a[0][0] + this.y * m.a[1][0] + this.z * m.a[2][0] + m.a[3][0]) / w,
                (this.x * m.a[0][1] + this.y * m.a[1][1] + this.z * m.a[2][1] + m.a[3][1]) / w,
                (this.x * m.a[0][2] + this.y * m.a[1][2] + this.z * m.a[2][2] + m.a[3][2]) / w,);
        }

        transform(m) {
            return vec3(
                this.x * m.a[0][0] + this.y * m.a[1][0] + this.z * m.a[2][0],
                this.x * m.a[0][1] + this.y * m.a[1][1] + this.z * m.a[2][1],
                this.x * m.a[0][2] + this.y * m.a[1][2] + this.z * m.a[2][2]
            );
        }

        pointTransform() {
            return vec3(
                this.x * m.a[0][0] + this.y * m.a[1][0] + this.z * m.a[2][0] + m.a[3][0],
                this.x * m.a[0][1] + this.y * m.a[1][1] + this.z * m.a[2][1] + m.a[3][1],
                this.x * m.a[0][2] + this.y * m.a[1][2] + this.z * m.a[2][2] + m.a[3][2]
            );
        }
    }

    function vec3(x, y, z) {
        if (x == undefined)
            return new _vec3(0, 0, 0);
        if (typeof x == "object")
            return new _vec3(x.x, x.y, x.z);
        if (y == undefined)
            return new _vec3(x, x, x);
        return new _vec3(x, y, z);
    }

    class _vertex {
        constructor(pos, norm) {
            this.pos = pos;
            this.norm = norm;
        }
    }

    function vertex(pos, norm) {
        return new _vertex(pos, norm);
    }

    function autoNormals(vertexes, indicies) {
        let i;

        /* Set all vertex normals to zero */
        for (i = 0; i < vertexes.length; i++)
            vertexes[i].norm = vec3(0);

        /* Eval normal for every facet */
        for (i = 0; i < indicies.length; i += 3) {
            let
                n0 = indicies[i], n1 = indicies[i + 1], n2 = indicies[i + 2];
            let
                p0 = vertexes[n0].pos,
                p1 = vertexes[n1].pos,
                p2 = vertexes[n2].pos,
                N = p1.sub(p0).cross(p2.sub(p0)).norm();

            vertexes[n0].norm = vertexes[n0].norm.add(N);
            vertexes[n1].norm = vertexes[n1].norm.add(N);
            vertexes[n2].norm = vertexes[n2].norm.add(N);
        }

        /* Normalize all vertex normals */
        for (i = 0; i < vertexes.length; i++) {
            vertexes[i].norm = vertexes[i].norm.norm();
        }
    }

    class Prim {
        constructor(rnd, vertexes, indicies) {
            let trimash = [], i = 0;

            autoNormals(vertexes, indicies);

            for (let v of vertexes) {
                trimash[i++] = v.pos.x;
                trimash[i++] = v.pos.y;
                trimash[i++] = v.pos.z;
                trimash[i++] = v.norm.x;
                trimash[i++] = v.norm.y;
                trimash[i++] = v.norm.z;
            }

            this.vertexArrayId = rnd.gl.createVertexArray();

            rnd.gl.bindVertexArray(this.vertexArrayId);
            this.vertexBufferId = rnd.gl.createBuffer();

            rnd.gl.bindBuffer(rnd.gl.ARRAY_BUFFER, this.vertexBufferId);
            rnd.gl.bufferData(rnd.gl.ARRAY_BUFFER, new Float32Array(trimash), rnd.gl.STATIC_DRAW);

            if (rnd.posLoc != -1) {
                rnd.gl.vertexAttribPointer(rnd.posLoc, 3, rnd.gl.FLOAT, false, 24, 0);
                rnd.gl.enableVertexAttribArray(rnd.posLoc);
                rnd.gl.vertexAttribPointer(rnd.normLoc, 3, rnd.gl.FLOAT, false, 24, 12);
                rnd.gl.enableVertexAttribArray(rnd.normLoc);
            }

            this.IndexBufferId = rnd.gl.createBuffer();
            rnd.gl.bindBuffer(rnd.gl.ELEMENT_ARRAY_BUFFER, this.IndexBufferId);
            rnd.gl.bufferData(rnd.gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indicies), rnd.gl.STATIC_DRAW);

            this.numOfElements = indicies.length;
        }

        render(rnd, world) {
            let m = mat4(1);

            let rx = rnd.projSize, ry = rnd.projSize;

            /* Correct aspect ratio */
            if (rnd.width >= rnd.height)
                rx *= rnd.width / rnd.height;
            else
                ry *= rnd.height / rnd.width;

            m.frustum(-rx / 2, rx / 2, -ry / 2, ry / 2,
                rnd.projDist, rnd.farClip);

            m = world.mul(m);

            rnd.gl.uniformMatrix4fv(rnd.matrProjLoc, false, new Float32Array([].concat(...m.a)));
            rnd.gl.uniformMatrix4fv(rnd.matrWLoc, false, new Float32Array([].concat(...world.a)));

            rnd.gl.bindVertexArray(this.vertexArrayId);
            rnd.gl.bindBuffer(rnd.gl.ELEMENT_ARRAY_BUFFER, this.IndexBufferId);
            rnd.gl.drawElements(rnd.gl.TRIANGLES, this.numOfElements, rnd.gl.UNSIGNED_INT, 0);
        }
    }

    class Figure {
        operator() {
            this.vertexes = [];
        }

        setCube() {
            this.vertexes = [
                [vec3(-0.5, -0.5, -0.5), vec3(-0.5, 0.5, -0.5), vec3(0.5, 0.5, -0.5), vec3(0.5, -0.5, -0.5)],  // front
                [vec3(-0.5, -0.5, 0.5), vec3(-0.5, 0.5, 0.5), vec3(0.5, 0.5, 0.5), vec3(0.5, -0.5, 0.5)],      // back
                [vec3(-0.5, -0.5, -0.5), vec3(-0.5, -0.5, 0.5), vec3(-0.5, 0.5, 0.5), vec3(-0.5, 0.5, -0.5)],  // left
                [vec3(0.5, -0.5, -0.5), vec3(0.5, -0.5, 0.5), vec3(0.5, 0.5, 0.5), vec3(0.5, 0.5, -0.5)],      // right
                [vec3(-0.5, -0.5, -0.5), vec3(-0.5, -0.5, 0.5), vec3(0.5, -0.5, 0.5), vec3(0.5, -0.5, -0.5)],  // bottom
                [vec3(-0.5, 0.5, -0.5), vec3(-0.5, 0.5, 0.5), vec3(0.5, 0.5, 0.5), vec3(0.5, 0.5, -0.5)],      // top
            ];
        }

        setTetrahedron() {
            let sqrt3 = Math.sqrt(3.0), sqrt2 = Math.sqrt(2.0);

            let
                top = vec3(0, sqrt2 / sqrt3, 0),
                front = vec3(0, 0, sqrt3 / 3.0),
                left = vec3(-0.5, 0, -sqrt3 / 6.0),
                right = vec3(0.5, 0, -sqrt3 / 6.0);

            this.vertexes = [
                [left, front, top], // bot
                [left, right, top],
                [right, front, top],
                [front, right, left]
            ];
        }

        setOctahedron() {
            let sqrt2 = Math.sqrt(2.0);

            let
                top = vec3(0, 1 / sqrt2, 0),
                bot = top.mul(-1),
                lf = vec3(-0.5, 0, 0.5),
                lb = vec3(-0.5, 0, -0.5),
                rf = vec3(0.5, 0, 0.5),
                rb = vec3(0.5, 0, -0.5);

            this.vertexes = [
                [bot, lf, rf],
                [bot, lf, lb],
                [bot, lb, rb],
                [bot, rf, rb],
                [top, lf, rf],
                [top, lf, lb],
                [top, lb, rb],
                [top, rf, rb],
            ];
        }

        makePrim(rnd) {
            let indicies = [];
            let vertexes = [];
            let j = 0;

            for (let edge of this.vertexes) {
                for (let v of edge) {
                    vertexes.push(vertex(v, vec3(0)));
                }

                for (let i = 2; i < edge.length; i++) {
                    indicies.push(j + 0);
                    indicies.push(j + i - 1);
                    indicies.push(j + i);
                }
                j += edge.length;
            }

            return new Prim(rnd, vertexes, indicies);
        }
    }

    console.log("MAIN LOADED");

    let rnd1, rnd2, rnd3;

    function main() {

      let canvas1 = document.getElementById("myCan1");
      let canvas2 = document.getElementById("myCan2");
      let canvas3 = document.getElementById("myCan3");

      let x = vec3(1, 3, 5);
      let v = vec3(x);

      console.log(v);

      rnd1 = new Render(canvas1);
      rnd2 = new Render(canvas2);
      rnd3 = new Render(canvas3);

      /*
      let z = 0;
      let vertixes = [
        vertex(vec3(-1, -1, -1), vec3(0)), vertex(vec3(-1, 1, -1), vec3(0)), vertex(vec3(1, 1, -1), vec3(0)), vertex(vec3(1, -1, -1), vec3(0)),
        vertex(vec3(-1, -1, 1), vec3(0)), vertex(vec3(-1, 1, 1), vec3(0)), vertex(vec3(1, 1, 1), vec3(0)), vertex(vec3(1, -1, 1), vec3(0))
      ];
      let indicies = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 0, 1, 4, 1, 4, 5, 2, 6, 7, 2, 7, 3, 1, 5, 6, 1, 6, 2, 0, 4, 7, 0, 7, 3];
      */

      [
        vertex(vec3(-1, -1, 0), vec3(0, 0, 1)),
        vertex(vec3(-1, 1, 0), vec3(0, 0, 1)),
        vertex(vec3(1, 1, 0), vec3(0, 0, 1)),
        vertex(vec3(1, -1, 0), vec3(0, 0, 1))
      ];

      //let prim = new Prim(rnd1, vertexes, indicies);

      let fig = new Figure();

      fig.setOctahedron();
      let prim1 = fig.makePrim(rnd1);
      fig.setTetrahedron();
      let prim2 = fig.makePrim(rnd2);
      fig.setCube();
      let prim3 = fig.makePrim(rnd3);
      //let prim3 = fig.makePrim(rnd1);


      const draw = () => {
        // drawing

        const date = new Date();
        let t =
          date.getMinutes() * 60 +
          date.getSeconds() +
          date.getMilliseconds() / 1000;

        rnd1.render();
        prim1.render(rnd1, matrRotate(t, vec3(0, 1, 0)).mul(matrTranslate(vec3(0, 0, -3))));//matrRotate(t, vec3(0, 1, 0)));
        rnd2.render();
        prim2.render(rnd2, matrRotate(t, vec3(0, 1, 0)).mul(matrTranslate(vec3(0, 0, -3))));//matrRotate(t, vec3(0, 1, 0)));
        rnd3.render();
        prim3.render(rnd3, matrRotate(t, vec3(0, 1, 0)).mul(matrTranslate(vec3(0, 0, -3))));//matrRotate(t, vec3(0, 1, 0)));

        // animation register
        window.requestAnimationFrame(draw);
      };
      draw();
    }

    window.addEventListener("load", () => {
      main();
    });

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL210aC9tYXQ0LmpzIiwiLi4vc3JjL3JuZC9ybmQuanMiLCIuLi9zcmMvbXRoL3ZlYzMuanMiLCIuLi9zcmMvcm5kL3Jlcy9wcmltLmpzIiwiLi4vc3JjL3BsYXQvcGxhdC5qcyIsIi4uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIF9tYXQ0IHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGEwMCwgYTAxLCBhMDIsIGEwMyxcclxuICAgICAgICBhMTAsIGExMSwgYTEyLCBhMTMsXHJcbiAgICAgICAgYTIwLCBhMjEsIGEyMiwgYTIzLFxyXG4gICAgICAgIGEzMCwgYTMxLCBhMzIsIGEzM1xyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5hID0gW1thMDAsIGEwMSwgYTAyLCBhMDNdLFxyXG4gICAgICAgIFthMTAsIGExMSwgYTEyLCBhMTNdLFxyXG4gICAgICAgIFthMjAsIGEyMSwgYTIyLCBhMjNdLFxyXG4gICAgICAgIFthMzAsIGEzMSwgYTMyLCBhMzNdXTtcclxuICAgIH1cclxuXHJcbiAgICBmcnVzdHVtKGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKSB7XHJcbiAgICAgICAgdGhpcy5hID0gW1syICogbmVhciAvIChyaWdodCAtIGxlZnQpLCAwLCAwLCAwXSxcclxuICAgICAgICBbMCwgMiAqIG5lYXIgLyAodG9wIC0gYm90dG9tKSwgMCwgMF0sXHJcbiAgICAgICAgWyhyaWdodCArIGxlZnQpIC8gKHJpZ2h0IC0gbGVmdCksICh0b3AgKyBib3R0b20pIC8gKHRvcCAtIGJvdHRvbSksIC0oZmFyICsgbmVhcikgLyAoZmFyIC0gbmVhciksIC0xXSxcclxuICAgICAgICBbMCwgMCwgLTIgKiBuZWFyICogZmFyIC8gKGZhciAtIG5lYXIpLCAwXV07XHJcbiAgICB9XHJcblxyXG4gICAgbXVsKG0pIHtcclxuICAgICAgICByZXR1cm4gbWF0NChcclxuICAgICAgICAgICAgdGhpcy5hWzBdWzBdICogbS5hWzBdWzBdICsgdGhpcy5hWzBdWzFdICogbS5hWzFdWzBdICsgdGhpcy5hWzBdWzJdICogbS5hWzJdWzBdICsgdGhpcy5hWzBdWzNdICogbS5hWzNdWzBdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMF1bMF0gKiBtLmFbMF1bMV0gKyB0aGlzLmFbMF1bMV0gKiBtLmFbMV1bMV0gKyB0aGlzLmFbMF1bMl0gKiBtLmFbMl1bMV0gKyB0aGlzLmFbMF1bM10gKiBtLmFbM11bMV0sXHJcbiAgICAgICAgICAgIHRoaXMuYVswXVswXSAqIG0uYVswXVsyXSArIHRoaXMuYVswXVsxXSAqIG0uYVsxXVsyXSArIHRoaXMuYVswXVsyXSAqIG0uYVsyXVsyXSArIHRoaXMuYVswXVszXSAqIG0uYVszXVsyXSxcclxuICAgICAgICAgICAgdGhpcy5hWzBdWzBdICogbS5hWzBdWzNdICsgdGhpcy5hWzBdWzFdICogbS5hWzFdWzNdICsgdGhpcy5hWzBdWzJdICogbS5hWzJdWzNdICsgdGhpcy5hWzBdWzNdICogbS5hWzNdWzNdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMV1bMF0gKiBtLmFbMF1bMF0gKyB0aGlzLmFbMV1bMV0gKiBtLmFbMV1bMF0gKyB0aGlzLmFbMV1bMl0gKiBtLmFbMl1bMF0gKyB0aGlzLmFbMV1bM10gKiBtLmFbM11bMF0sXHJcbiAgICAgICAgICAgIHRoaXMuYVsxXVswXSAqIG0uYVswXVsxXSArIHRoaXMuYVsxXVsxXSAqIG0uYVsxXVsxXSArIHRoaXMuYVsxXVsyXSAqIG0uYVsyXVsxXSArIHRoaXMuYVsxXVszXSAqIG0uYVszXVsxXSxcclxuICAgICAgICAgICAgdGhpcy5hWzFdWzBdICogbS5hWzBdWzJdICsgdGhpcy5hWzFdWzFdICogbS5hWzFdWzJdICsgdGhpcy5hWzFdWzJdICogbS5hWzJdWzJdICsgdGhpcy5hWzFdWzNdICogbS5hWzNdWzJdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMV1bMF0gKiBtLmFbMF1bM10gKyB0aGlzLmFbMV1bMV0gKiBtLmFbMV1bM10gKyB0aGlzLmFbMV1bMl0gKiBtLmFbMl1bM10gKyB0aGlzLmFbMV1bM10gKiBtLmFbM11bM10sXHJcbiAgICAgICAgICAgIHRoaXMuYVsyXVswXSAqIG0uYVswXVswXSArIHRoaXMuYVsyXVsxXSAqIG0uYVsxXVswXSArIHRoaXMuYVsyXVsyXSAqIG0uYVsyXVswXSArIHRoaXMuYVsyXVszXSAqIG0uYVszXVswXSxcclxuICAgICAgICAgICAgdGhpcy5hWzJdWzBdICogbS5hWzBdWzFdICsgdGhpcy5hWzJdWzFdICogbS5hWzFdWzFdICsgdGhpcy5hWzJdWzJdICogbS5hWzJdWzFdICsgdGhpcy5hWzJdWzNdICogbS5hWzNdWzFdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMl1bMF0gKiBtLmFbMF1bMl0gKyB0aGlzLmFbMl1bMV0gKiBtLmFbMV1bMl0gKyB0aGlzLmFbMl1bMl0gKiBtLmFbMl1bMl0gKyB0aGlzLmFbMl1bM10gKiBtLmFbM11bMl0sXHJcbiAgICAgICAgICAgIHRoaXMuYVsyXVswXSAqIG0uYVswXVszXSArIHRoaXMuYVsyXVsxXSAqIG0uYVsxXVszXSArIHRoaXMuYVsyXVsyXSAqIG0uYVsyXVszXSArIHRoaXMuYVsyXVszXSAqIG0uYVszXVszXSxcclxuICAgICAgICAgICAgdGhpcy5hWzNdWzBdICogbS5hWzBdWzBdICsgdGhpcy5hWzNdWzFdICogbS5hWzFdWzBdICsgdGhpcy5hWzNdWzJdICogbS5hWzJdWzBdICsgdGhpcy5hWzNdWzNdICogbS5hWzNdWzBdLFxyXG4gICAgICAgICAgICB0aGlzLmFbM11bMF0gKiBtLmFbMF1bMV0gKyB0aGlzLmFbM11bMV0gKiBtLmFbMV1bMV0gKyB0aGlzLmFbM11bMl0gKiBtLmFbMl1bMV0gKyB0aGlzLmFbM11bM10gKiBtLmFbM11bMV0sXHJcbiAgICAgICAgICAgIHRoaXMuYVszXVswXSAqIG0uYVswXVsyXSArIHRoaXMuYVszXVsxXSAqIG0uYVsxXVsyXSArIHRoaXMuYVszXVsyXSAqIG0uYVsyXVsyXSArIHRoaXMuYVszXVszXSAqIG0uYVszXVsyXSxcclxuICAgICAgICAgICAgdGhpcy5hWzNdWzBdICogbS5hWzBdWzNdICsgdGhpcy5hWzNdWzFdICogbS5hWzFdWzNdICsgdGhpcy5hWzNdWzJdICogbS5hWzJdWzNdICsgdGhpcy5hWzNdWzNdICogbS5hWzNdWzNdKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1hdDQoXHJcbiAgICBhMDAsIGEwMSwgYTAyLCBhMDMsXHJcbiAgICBhMTAsIGExMSwgYTEyLCBhMTMsXHJcbiAgICBhMjAsIGEyMSwgYTIyLCBhMjMsXHJcbiAgICBhMzAsIGEzMSwgYTMyLCBhMzNcclxuKSB7XHJcbiAgICBpZiAoYTAwID09IDEgJiYgYTAxID09IHVuZGVmaW5lZClcclxuICAgICAgICByZXR1cm4gbmV3IF9tYXQ0KFxyXG4gICAgICAgICAgICAxLCAwLCAwLCAwLFxyXG4gICAgICAgICAgICAwLCAxLCAwLCAwLFxyXG4gICAgICAgICAgICAwLCAwLCAxLCAwLFxyXG4gICAgICAgICAgICAwLCAwLCAwLCAxKTtcclxuICAgIGlmICh0eXBlb2YgYTAwID09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgcmV0dXJuIG5ldyBfbWF0NChcclxuICAgICAgICAgICAgYTAwWzBdWzBdLCBhMDBbMF1bMV0sIGEwMFswXVsyXSwgYTAwWzBdWzNdLFxyXG4gICAgICAgICAgICBhMDBbMV1bMF0sIGEwMFsxXVsxXSwgYTAwWzFdWzJdLCBhMDBbMV1bM10sXHJcbiAgICAgICAgICAgIGEwMFsyXVswXSwgYTAwWzJdWzFdLCBhMDBbMl1bMl0sIGEwMFsyXVszXSxcclxuICAgICAgICAgICAgYTAwWzNdWzBdLCBhMDBbM11bMV0sIGEwMFszXVsyXSwgYTAwWzNdWzNdXHJcbiAgICAgICAgKTtcclxuICAgIHJldHVybiBuZXcgX21hdDQoXHJcbiAgICAgICAgYTAwLCBhMDEsIGEwMiwgYTAzLFxyXG4gICAgICAgIGExMCwgYTExLCBhMTIsIGExMyxcclxuICAgICAgICBhMjAsIGEyMSwgYTIyLCBhMjMsXHJcbiAgICAgICAgYTMwLCBhMzEsIGEzMiwgYTMzXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0clJvdGF0ZShhbmdsZSwgYXhpcykge1xyXG4gICAgbGV0XHJcbiAgICAgICAgYSA9IGFuZ2xlIC8gTWF0aC5QSSAqIDE4MC4wLFxyXG4gICAgICAgIHNpID0gTWF0aC5zaW4oYW5nbGUpLCBjbyA9IE1hdGguY29zKGFuZ2xlKSxcclxuICAgICAgICB2ID0gYXhpcy5ub3JtKCk7XHJcblxyXG4gICAgcmV0dXJuIG1hdDQoXHJcbiAgICAgICAgY28gKyB2LnggKiB2LnggKiAoMSAtIGNvKSxcclxuICAgICAgICB2LnggKiB2LnkgKiAoMSAtIGNvKSArIHYueiAqIHNpLFxyXG4gICAgICAgIHYueCAqIHYueiAqICgxIC0gY28pIC0gdi55ICogc2ksXHJcbiAgICAgICAgMCxcclxuICAgICAgICB2LnkgKiB2LnggKiAoMSAtIGNvKSAtIHYueiAqIHNpLFxyXG4gICAgICAgIGNvICsgdi55ICogdi55ICogKDEgLSBjbyksXHJcbiAgICAgICAgdi55ICogdi56ICogKDEgLSBjbykgKyB2LnggKiBzaSxcclxuICAgICAgICAwLFxyXG4gICAgICAgIHYueiAqIHYueCAqICgxIC0gY28pICsgdi55ICogc2ksXHJcbiAgICAgICAgdi56ICogdi55ICogKDEgLSBjbykgLSB2LnggKiBzaSxcclxuICAgICAgICBjbyArIHYueiAqIHYueiAqICgxIC0gY28pLFxyXG4gICAgICAgIDAsIDAsIDAsIDAsIDFcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXRyVHJhbnNsYXRlKHQpIHtcclxuICAgIHJldHVybiBtYXQ0KFxyXG4gICAgICAgIDEsIDAsIDAsIDAsXHJcbiAgICAgICAgMCwgMSwgMCwgMCxcclxuICAgICAgICAwLCAwLCAxLCAwLFxyXG4gICAgICAgIHQueCwgdC55LCB0LnosIDFcclxuICAgICk7XHJcbn0iLCJpbXBvcnQgeyBtYXQ0IH0gZnJvbSBcIi4uL210aC9tYXQ0LmpzXCJcclxuXHJcbmV4cG9ydCBjbGFzcyBSZW5kZXIge1xyXG4gICAgLy8gTG9hZCBhbmQgY29tcGlsZSBzaGFkZXIgZnVuY3Rpb25cclxuICAgIGxvYWRTaGFkZXIoc2hhZGVyVHlwZSwgc2hhZGVyU291cmNlKSB7XHJcbiAgICAgICAgY29uc3Qgc2hhZGVyID0gdGhpcy5nbC5jcmVhdGVTaGFkZXIoc2hhZGVyVHlwZSk7XHJcbiAgICAgICAgdGhpcy5nbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzaGFkZXJTb3VyY2UpO1xyXG4gICAgICAgIHRoaXMuZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xyXG4gICAgICAgIGlmICghdGhpcy5nbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCB0aGlzLmdsLkNPTVBJTEVfU1RBVFVTKSkge1xyXG4gICAgICAgICAgICBsZXQgYnVmID0gdGhpcy5nbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2hhZGVyIGNvbXBpbGUgZmFpbDogXCIgKyBidWYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2hhZGVyO1xyXG4gICAgfSAvLyBFbmQgb2YgJ2xvYWRTaGFkZXInIGZ1bmN0aW9uXHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBGcmFtZSAke3grK31gKTtcclxuICAgICAgICB0aGlzLmdsLmNsZWFyKHRoaXMuZ2wuQ09MT1JfQlVGRkVSX0JJVCk7XHJcbiAgICAgICAgdGhpcy5nbC5jbGVhcih0aGlzLmdsLkRFUFRIX0JVRkZFUl9CSVQpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50aW1lTG9jICE9IC0xKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICBsZXQgdCA9XHJcbiAgICAgICAgICAgICAgICBkYXRlLmdldE1pbnV0ZXMoKSAqIDYwICtcclxuICAgICAgICAgICAgICAgIGRhdGUuZ2V0U2Vjb25kcygpICtcclxuICAgICAgICAgICAgICAgIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLyAxMDAwO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5nbC51bmlmb3JtMWYodGhpcy50aW1lTG9jLCB0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vfVxyXG4gICAgfSAvLyBFbmQgb2YgJ3JlbmRlcicgZnVuY3Rpb25cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMpIHtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuXHJcbiAgICAgICAgdGhpcy5wcm9qU2l6ZSA9IDAuMTtcclxuICAgICAgICB0aGlzLnByb2pEaXN0ID0gMC4xO1xyXG4gICAgICAgIHRoaXMuZmFyQ2xpcCA9IDMwMDtcclxuXHJcbiAgICAgICAgbGV0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHJlY3QucmlnaHQgLSByZWN0LmxlZnQgKyAxO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gcmVjdC5ib3R0b20gLSByZWN0LnRvcCArIDE7XHJcblxyXG4gICAgICAgIHRoaXMuZ2wgPSBjYW52YXMuZ2V0Q29udGV4dChcIndlYmdsMlwiKTtcclxuICAgICAgICB0aGlzLmdsLmNsZWFyQ29sb3IoMC45LCAwLjksIDAuOSwgMSk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2wuZW5hYmxlKHRoaXMuZ2wuREVQVEhfVEVTVCk7XHJcbiAgICAgICAgLy8gU2hhZGVyIGNyZWF0aW9uXHJcbiAgICAgICAgbGV0IHZzX3R4dCA9IGAjdmVyc2lvbiAzMDAgZXNcclxuICAgICAgICBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7XHJcbiAgICAgICAgaW4gdmVjMyBJblBvc2l0aW9uO1xyXG4gICAgICAgIGluIHZlYzMgSW5Ob3JtYWw7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIG91dCB2ZWMzIERyYXdQb3M7XHJcbiAgICAgICAgb3V0IHZlYzMgRHJhd05vcm1hbDtcclxuXHJcbiAgICAgICAgdW5pZm9ybSBmbG9hdCBUaW1lO1xyXG4gICAgICAgIHVuaWZvcm0gbWF0NCBNYXRyUHJvajtcclxuICAgICAgICB1bmlmb3JtIG1hdDQgTWF0clc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdm9pZCBtYWluKCB2b2lkIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdsX1Bvc2l0aW9uID0gTWF0clByb2ogKiB2ZWM0KEluUG9zaXRpb24sIDEpO1xyXG4gICAgICAgICAgICBEcmF3UG9zID0gdmVjMyhNYXRyVyAqIHZlYzQoSW5Qb3NpdGlvbi54eXosIDEuMCkpO1xyXG4gICAgICAgICAgICBEcmF3Tm9ybWFsID0gbWF0Myh0cmFuc3Bvc2UoaW52ZXJzZShNYXRyVykpKSAqIEluTm9ybWFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBsZXQgZnNfdHh0ID0gYCN2ZXJzaW9uIDMwMCBlc1xyXG4gICAgICAgIHByZWNpc2lvbiBoaWdocCBmbG9hdDtcclxuICAgICAgICBcclxuICAgICAgICBvdXQgdmVjNCBPdXRDb2xvcjtcclxuICAgICAgICBcclxuICAgICAgICBpbiB2ZWMzIERyYXdQb3M7XHJcbiAgICAgICAgaW4gdmVjMyBEcmF3Tm9ybWFsO1xyXG5cclxuICAgICAgICB1bmlmb3JtIGZsb2F0IFRpbWU7XHJcblxyXG4gICAgICAgIHZvaWQgbWFpbiggdm9pZCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2ZWMzIEwgPSBub3JtYWxpemUodmVjMygwLCAwLjUsIDEpKTtcclxuICAgICAgICAgICAgdmVjMyBOID0gbm9ybWFsaXplKERyYXdOb3JtYWwpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgTiA9IGZhY2Vmb3J3YXJkKE4sIG5vcm1hbGl6ZShEcmF3UG9zKSwgTik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmbG9hdCBrID0gZG90KEwsIG5vcm1hbGl6ZShOKSk7XHJcblxyXG4gICAgICAgICAgICBPdXRDb2xvciA9IHZlYzQoayAqIHZlYzMoMSwgMC41LCAwLjUpLCAxLjApO1xyXG4gICAgICAgICAgICAvL091dENvbG9yID0gdmVjNChOLCAxLjApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBsZXQgdnMgPSB0aGlzLmxvYWRTaGFkZXIodGhpcy5nbC5WRVJURVhfU0hBREVSLCB2c190eHQpLFxyXG4gICAgICAgICAgICBmcyA9IHRoaXMubG9hZFNoYWRlcih0aGlzLmdsLkZSQUdNRU5UX1NIQURFUiwgZnNfdHh0KSxcclxuICAgICAgICAgICAgcHJnID0gdGhpcy5nbC5jcmVhdGVQcm9ncmFtKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2wuYXR0YWNoU2hhZGVyKHByZywgdnMpO1xyXG4gICAgICAgIHRoaXMuZ2wuYXR0YWNoU2hhZGVyKHByZywgZnMpO1xyXG4gICAgICAgIHRoaXMuZ2wubGlua1Byb2dyYW0ocHJnKTtcclxuXHJcbiAgICAgICAgdGhpcy5wcmcgPSBwcmc7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByZywgdGhpcy5nbC5MSU5LX1NUQVRVUykpIHtcclxuICAgICAgICAgICAgbGV0IGJ1ZiA9IHRoaXMuZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJnKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTaGFkZXIgcHJvZ3JhbSBsaW5rIGZhaWw6IFwiICsgYnVmKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVuaWZvcm0gZGF0YVxyXG4gICAgICAgIHRoaXMudGltZUxvYyA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByZywgXCJUaW1lXCIpO1xyXG4gICAgICAgIHRoaXMucG9zTG9jID0gdGhpcy5nbC5nZXRBdHRyaWJMb2NhdGlvbihwcmcsIFwiSW5Qb3NpdGlvblwiKTtcclxuICAgICAgICB0aGlzLm5vcm1Mb2MgPSB0aGlzLmdsLmdldEF0dHJpYkxvY2F0aW9uKHByZywgXCJJbk5vcm1hbFwiKTtcclxuICAgICAgICB0aGlzLm1hdHJQcm9qTG9jID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJnLCBcIk1hdHJQcm9qXCIpO1xyXG4gICAgICAgIHRoaXMubWF0cldMb2MgPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcmcsIFwiTWF0cldcIik7XHJcbiAgICAgICAgdGhpcy5nbC51c2VQcm9ncmFtKHByZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImNsYXNzIF92ZWMzIHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIHopIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy56ID0gejtcclxuICAgIH1cclxuXHJcbiAgICBsZW4yKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRvdCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBsZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmRvdCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbm9ybSgpIHtcclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5sZW4oKTtcclxuXHJcbiAgICAgICAgaWYgKGxlbiA9PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gdmVjMygwKTtcclxuXHJcbiAgICAgICAgaWYgKGxlbiA9PSAxKVxyXG4gICAgICAgICAgICByZXR1cm4gdmVjMyh0aGlzKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kaXYobGVuKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGQodikge1xyXG4gICAgICAgIHJldHVybiB2ZWMzKHRoaXMueCArIHYueCwgdGhpcy55ICsgdi55LCB0aGlzLnogKyB2LnopO1xyXG4gICAgfVxyXG5cclxuICAgIHN1Yih2KSB7XHJcbiAgICAgICAgcmV0dXJuIHZlYzModGhpcy54IC0gdi54LCB0aGlzLnkgLSB2LnksIHRoaXMueiAtIHYueik7XHJcbiAgICB9XHJcblxyXG4gICAgbXVsKGspIHtcclxuICAgICAgICByZXR1cm4gdmVjMyh0aGlzLnggKiBrLCB0aGlzLnkgKiBrLCB0aGlzLnogKiBrKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXYoaykge1xyXG4gICAgICAgIHJldHVybiB2ZWMzKHRoaXMueCAvIGssIHRoaXMueSAvIGssIHRoaXMueiAvIGspO1xyXG4gICAgfVxyXG5cclxuICAgIGRvdCh2KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueSArIHRoaXMueiAqIHYuejtcclxuICAgIH1cclxuXHJcbiAgICBjcm9zcyh2KSB7XHJcbiAgICAgICAgcmV0dXJuIHZlYzModGhpcy55ICogdi56IC0gdGhpcy56ICogdi55LFxyXG4gICAgICAgICAgICB0aGlzLnogKiB2LnggLSB0aGlzLnggKiB2LnosXHJcbiAgICAgICAgICAgIHRoaXMueCAqIHYueSAtIHRoaXMueSAqIHYueCk7XHJcbiAgICB9XHJcblxyXG4gICAgbXVsbWF0cihtKSB7XHJcbiAgICAgICAgbGV0IHcgPSB0aGlzLnggKiBtLmFbMF1bM10gK1xyXG4gICAgICAgICAgICB0aGlzLnkgKiBtLmFbMV1bM10gK1xyXG4gICAgICAgICAgICB0aGlzLnggKiBtLmFbMl1bM10gK1xyXG4gICAgICAgICAgICBtLmFbM11bM107XHJcblxyXG4gICAgICAgIHJldHVybiB2ZWMzKFxyXG4gICAgICAgICAgICAodGhpcy54ICogbS5hWzBdWzBdICsgdGhpcy55ICogbS5hWzFdWzBdICsgdGhpcy56ICogbS5hWzJdWzBdICsgbS5hWzNdWzBdKSAvIHcsXHJcbiAgICAgICAgICAgICh0aGlzLnggKiBtLmFbMF1bMV0gKyB0aGlzLnkgKiBtLmFbMV1bMV0gKyB0aGlzLnogKiBtLmFbMl1bMV0gKyBtLmFbM11bMV0pIC8gdyxcclxuICAgICAgICAgICAgKHRoaXMueCAqIG0uYVswXVsyXSArIHRoaXMueSAqIG0uYVsxXVsyXSArIHRoaXMueiAqIG0uYVsyXVsyXSArIG0uYVszXVsyXSkgLyB3LCk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNmb3JtKG0pIHtcclxuICAgICAgICByZXR1cm4gdmVjMyhcclxuICAgICAgICAgICAgdGhpcy54ICogbS5hWzBdWzBdICsgdGhpcy55ICogbS5hWzFdWzBdICsgdGhpcy56ICogbS5hWzJdWzBdLFxyXG4gICAgICAgICAgICB0aGlzLnggKiBtLmFbMF1bMV0gKyB0aGlzLnkgKiBtLmFbMV1bMV0gKyB0aGlzLnogKiBtLmFbMl1bMV0sXHJcbiAgICAgICAgICAgIHRoaXMueCAqIG0uYVswXVsyXSArIHRoaXMueSAqIG0uYVsxXVsyXSArIHRoaXMueiAqIG0uYVsyXVsyXVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9pbnRUcmFuc2Zvcm0oKSB7XHJcbiAgICAgICAgcmV0dXJuIHZlYzMoXHJcbiAgICAgICAgICAgIHRoaXMueCAqIG0uYVswXVswXSArIHRoaXMueSAqIG0uYVsxXVswXSArIHRoaXMueiAqIG0uYVsyXVswXSArIG0uYVszXVswXSxcclxuICAgICAgICAgICAgdGhpcy54ICogbS5hWzBdWzFdICsgdGhpcy55ICogbS5hWzFdWzFdICsgdGhpcy56ICogbS5hWzJdWzFdICsgbS5hWzNdWzFdLFxyXG4gICAgICAgICAgICB0aGlzLnggKiBtLmFbMF1bMl0gKyB0aGlzLnkgKiBtLmFbMV1bMl0gKyB0aGlzLnogKiBtLmFbMl1bMl0gKyBtLmFbM11bMl1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmVjMyh4LCB5LCB6KSB7XHJcbiAgICBpZiAoeCA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgcmV0dXJuIG5ldyBfdmVjMygwLCAwLCAwKTtcclxuICAgIGlmICh0eXBlb2YgeCA9PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIHJldHVybiBuZXcgX3ZlYzMoeC54LCB4LnksIHgueik7XHJcbiAgICBpZiAoeSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgcmV0dXJuIG5ldyBfdmVjMyh4LCB4LCB4KTtcclxuICAgIHJldHVybiBuZXcgX3ZlYzMoeCwgeSwgeik7XHJcbn1cclxuIiwiaW1wb3J0IHsgUmVuZGVyIH0gZnJvbSBcIi4uL3JuZC5qc1wiXHJcbmltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vLi4vbXRoL3ZlYzMuanNcIlxyXG5pbXBvcnQgeyBtYXQ0IH0gZnJvbSBcIi4uLy4uL210aC9tYXQ0LmpzXCJcclxuXHJcbmNsYXNzIF92ZXJ0ZXgge1xyXG4gICAgY29uc3RydWN0b3IocG9zLCBub3JtKSB7XHJcbiAgICAgICAgdGhpcy5wb3MgPSBwb3M7XHJcbiAgICAgICAgdGhpcy5ub3JtID0gbm9ybTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZlcnRleChwb3MsIG5vcm0pIHtcclxuICAgIHJldHVybiBuZXcgX3ZlcnRleChwb3MsIG5vcm0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXV0b05vcm1hbHModmVydGV4ZXMsIGluZGljaWVzKSB7XHJcbiAgICBsZXQgaTtcclxuXHJcbiAgICAvKiBTZXQgYWxsIHZlcnRleCBub3JtYWxzIHRvIHplcm8gKi9cclxuICAgIGZvciAoaSA9IDA7IGkgPCB2ZXJ0ZXhlcy5sZW5ndGg7IGkrKylcclxuICAgICAgICB2ZXJ0ZXhlc1tpXS5ub3JtID0gdmVjMygwKTtcclxuXHJcbiAgICAvKiBFdmFsIG5vcm1hbCBmb3IgZXZlcnkgZmFjZXQgKi9cclxuICAgIGZvciAoaSA9IDA7IGkgPCBpbmRpY2llcy5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICAgIGxldFxyXG4gICAgICAgICAgICBuMCA9IGluZGljaWVzW2ldLCBuMSA9IGluZGljaWVzW2kgKyAxXSwgbjIgPSBpbmRpY2llc1tpICsgMl07XHJcbiAgICAgICAgbGV0XHJcbiAgICAgICAgICAgIHAwID0gdmVydGV4ZXNbbjBdLnBvcyxcclxuICAgICAgICAgICAgcDEgPSB2ZXJ0ZXhlc1tuMV0ucG9zLFxyXG4gICAgICAgICAgICBwMiA9IHZlcnRleGVzW24yXS5wb3MsXHJcbiAgICAgICAgICAgIE4gPSBwMS5zdWIocDApLmNyb3NzKHAyLnN1YihwMCkpLm5vcm0oKTtcclxuXHJcbiAgICAgICAgdmVydGV4ZXNbbjBdLm5vcm0gPSB2ZXJ0ZXhlc1tuMF0ubm9ybS5hZGQoTik7XHJcbiAgICAgICAgdmVydGV4ZXNbbjFdLm5vcm0gPSB2ZXJ0ZXhlc1tuMV0ubm9ybS5hZGQoTik7XHJcbiAgICAgICAgdmVydGV4ZXNbbjJdLm5vcm0gPSB2ZXJ0ZXhlc1tuMl0ubm9ybS5hZGQoTik7XHJcbiAgICB9XHJcblxyXG4gICAgLyogTm9ybWFsaXplIGFsbCB2ZXJ0ZXggbm9ybWFscyAqL1xyXG4gICAgZm9yIChpID0gMDsgaSA8IHZlcnRleGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmVydGV4ZXNbaV0ubm9ybSA9IHZlcnRleGVzW2ldLm5vcm0ubm9ybSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUHJpbSB7XHJcbiAgICBjb25zdHJ1Y3RvcihybmQsIHZlcnRleGVzLCBpbmRpY2llcykge1xyXG4gICAgICAgIGxldCB0cmltYXNoID0gW10sIGkgPSAwO1xyXG5cclxuICAgICAgICBhdXRvTm9ybWFscyh2ZXJ0ZXhlcywgaW5kaWNpZXMpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCB2IG9mIHZlcnRleGVzKSB7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYucG9zLng7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYucG9zLnk7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYucG9zLno7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYubm9ybS54O1xyXG4gICAgICAgICAgICB0cmltYXNoW2krK10gPSB2Lm5vcm0ueTtcclxuICAgICAgICAgICAgdHJpbWFzaFtpKytdID0gdi5ub3JtLno7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZlcnRleEFycmF5SWQgPSBybmQuZ2wuY3JlYXRlVmVydGV4QXJyYXkoKTtcclxuXHJcbiAgICAgICAgcm5kLmdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLnZlcnRleEFycmF5SWQpO1xyXG4gICAgICAgIHRoaXMudmVydGV4QnVmZmVySWQgPSBybmQuZ2wuY3JlYXRlQnVmZmVyKCk7XHJcblxyXG4gICAgICAgIHJuZC5nbC5iaW5kQnVmZmVyKHJuZC5nbC5BUlJBWV9CVUZGRVIsIHRoaXMudmVydGV4QnVmZmVySWQpO1xyXG4gICAgICAgIHJuZC5nbC5idWZmZXJEYXRhKHJuZC5nbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodHJpbWFzaCksIHJuZC5nbC5TVEFUSUNfRFJBVyk7XHJcblxyXG4gICAgICAgIGlmIChybmQucG9zTG9jICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHJuZC5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHJuZC5wb3NMb2MsIDMsIHJuZC5nbC5GTE9BVCwgZmFsc2UsIDI0LCAwKTtcclxuICAgICAgICAgICAgcm5kLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHJuZC5wb3NMb2MpO1xyXG4gICAgICAgICAgICBybmQuZ2wudmVydGV4QXR0cmliUG9pbnRlcihybmQubm9ybUxvYywgMywgcm5kLmdsLkZMT0FULCBmYWxzZSwgMjQsIDEyKTtcclxuICAgICAgICAgICAgcm5kLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHJuZC5ub3JtTG9jKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuSW5kZXhCdWZmZXJJZCA9IHJuZC5nbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgICAgICBybmQuZ2wuYmluZEJ1ZmZlcihybmQuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuSW5kZXhCdWZmZXJJZCk7XHJcbiAgICAgICAgcm5kLmdsLmJ1ZmZlckRhdGEocm5kLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBuZXcgVWludDMyQXJyYXkoaW5kaWNpZXMpLCBybmQuZ2wuU1RBVElDX0RSQVcpO1xyXG5cclxuICAgICAgICB0aGlzLm51bU9mRWxlbWVudHMgPSBpbmRpY2llcy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKHJuZCwgd29ybGQpIHtcclxuICAgICAgICBsZXQgbSA9IG1hdDQoMSk7XHJcblxyXG4gICAgICAgIGxldCByeCA9IHJuZC5wcm9qU2l6ZSwgcnkgPSBybmQucHJvalNpemU7XHJcblxyXG4gICAgICAgIC8qIENvcnJlY3QgYXNwZWN0IHJhdGlvICovXHJcbiAgICAgICAgaWYgKHJuZC53aWR0aCA+PSBybmQuaGVpZ2h0KVxyXG4gICAgICAgICAgICByeCAqPSBybmQud2lkdGggLyBybmQuaGVpZ2h0O1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcnkgKj0gcm5kLmhlaWdodCAvIHJuZC53aWR0aDtcclxuXHJcbiAgICAgICAgbS5mcnVzdHVtKC1yeCAvIDIsIHJ4IC8gMiwgLXJ5IC8gMiwgcnkgLyAyLFxyXG4gICAgICAgICAgICBybmQucHJvakRpc3QsIHJuZC5mYXJDbGlwKTtcclxuXHJcbiAgICAgICAgbSA9IHdvcmxkLm11bChtKTtcclxuXHJcbiAgICAgICAgcm5kLmdsLnVuaWZvcm1NYXRyaXg0ZnYocm5kLm1hdHJQcm9qTG9jLCBmYWxzZSwgbmV3IEZsb2F0MzJBcnJheShbXS5jb25jYXQoLi4ubS5hKSkpO1xyXG4gICAgICAgIHJuZC5nbC51bmlmb3JtTWF0cml4NGZ2KHJuZC5tYXRyV0xvYywgZmFsc2UsIG5ldyBGbG9hdDMyQXJyYXkoW10uY29uY2F0KC4uLndvcmxkLmEpKSk7XHJcblxyXG4gICAgICAgIHJuZC5nbC5iaW5kVmVydGV4QXJyYXkodGhpcy52ZXJ0ZXhBcnJheUlkKTtcclxuICAgICAgICBybmQuZ2wuYmluZEJ1ZmZlcihybmQuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuSW5kZXhCdWZmZXJJZCk7XHJcbiAgICAgICAgcm5kLmdsLmRyYXdFbGVtZW50cyhybmQuZ2wuVFJJQU5HTEVTLCB0aGlzLm51bU9mRWxlbWVudHMsIHJuZC5nbC5VTlNJR05FRF9JTlQsIDApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IFByaW0sIHZlcnRleCB9IGZyb20gXCIuLi9ybmQvcmVzL3ByaW0uanNcIjtcclxuaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi9tdGgvdmVjMy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpZ3VyZSB7XHJcbiAgICBvcGVyYXRvcigpIHtcclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q3ViZSgpIHtcclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gW1xyXG4gICAgICAgICAgICBbdmVjMygtMC41LCAtMC41LCAtMC41KSwgdmVjMygtMC41LCAwLjUsIC0wLjUpLCB2ZWMzKDAuNSwgMC41LCAtMC41KSwgdmVjMygwLjUsIC0wLjUsIC0wLjUpXSwgIC8vIGZyb250XHJcbiAgICAgICAgICAgIFt2ZWMzKC0wLjUsIC0wLjUsIDAuNSksIHZlYzMoLTAuNSwgMC41LCAwLjUpLCB2ZWMzKDAuNSwgMC41LCAwLjUpLCB2ZWMzKDAuNSwgLTAuNSwgMC41KV0sICAgICAgLy8gYmFja1xyXG4gICAgICAgICAgICBbdmVjMygtMC41LCAtMC41LCAtMC41KSwgdmVjMygtMC41LCAtMC41LCAwLjUpLCB2ZWMzKC0wLjUsIDAuNSwgMC41KSwgdmVjMygtMC41LCAwLjUsIC0wLjUpXSwgIC8vIGxlZnRcclxuICAgICAgICAgICAgW3ZlYzMoMC41LCAtMC41LCAtMC41KSwgdmVjMygwLjUsIC0wLjUsIDAuNSksIHZlYzMoMC41LCAwLjUsIDAuNSksIHZlYzMoMC41LCAwLjUsIC0wLjUpXSwgICAgICAvLyByaWdodFxyXG4gICAgICAgICAgICBbdmVjMygtMC41LCAtMC41LCAtMC41KSwgdmVjMygtMC41LCAtMC41LCAwLjUpLCB2ZWMzKDAuNSwgLTAuNSwgMC41KSwgdmVjMygwLjUsIC0wLjUsIC0wLjUpXSwgIC8vIGJvdHRvbVxyXG4gICAgICAgICAgICBbdmVjMygtMC41LCAwLjUsIC0wLjUpLCB2ZWMzKC0wLjUsIDAuNSwgMC41KSwgdmVjMygwLjUsIDAuNSwgMC41KSwgdmVjMygwLjUsIDAuNSwgLTAuNSldLCAgICAgIC8vIHRvcFxyXG4gICAgICAgIF1cclxuICAgIH1cclxuXHJcbiAgICBzZXRUZXRyYWhlZHJvbigpIHtcclxuICAgICAgICBsZXQgc3FydDMgPSBNYXRoLnNxcnQoMy4wKSwgc3FydDIgPSBNYXRoLnNxcnQoMi4wKTtcclxuXHJcbiAgICAgICAgbGV0XHJcbiAgICAgICAgICAgIHRvcCA9IHZlYzMoMCwgc3FydDIgLyBzcXJ0MywgMCksXHJcbiAgICAgICAgICAgIGZyb250ID0gdmVjMygwLCAwLCBzcXJ0MyAvIDMuMCksXHJcbiAgICAgICAgICAgIGxlZnQgPSB2ZWMzKC0wLjUsIDAsIC1zcXJ0MyAvIDYuMCksXHJcbiAgICAgICAgICAgIHJpZ2h0ID0gdmVjMygwLjUsIDAsIC1zcXJ0MyAvIDYuMCk7XHJcblxyXG4gICAgICAgIHRoaXMudmVydGV4ZXMgPSBbXHJcbiAgICAgICAgICAgIFtsZWZ0LCBmcm9udCwgdG9wXSwgLy8gYm90XHJcbiAgICAgICAgICAgIFtsZWZ0LCByaWdodCwgdG9wXSxcclxuICAgICAgICAgICAgW3JpZ2h0LCBmcm9udCwgdG9wXSxcclxuICAgICAgICAgICAgW2Zyb250LCByaWdodCwgbGVmdF1cclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE9jdGFoZWRyb24oKSB7XHJcbiAgICAgICAgbGV0IHNxcnQzID0gTWF0aC5zcXJ0KDMuMCksIHNxcnQyID0gTWF0aC5zcXJ0KDIuMCk7XHJcblxyXG4gICAgICAgIGxldFxyXG4gICAgICAgICAgICB0b3AgPSB2ZWMzKDAsIDEgLyBzcXJ0MiwgMCksXHJcbiAgICAgICAgICAgIGJvdCA9IHRvcC5tdWwoLTEpLFxyXG4gICAgICAgICAgICBsZiA9IHZlYzMoLTAuNSwgMCwgMC41KSxcclxuICAgICAgICAgICAgbGIgPSB2ZWMzKC0wLjUsIDAsIC0wLjUpLFxyXG4gICAgICAgICAgICByZiA9IHZlYzMoMC41LCAwLCAwLjUpLFxyXG4gICAgICAgICAgICByYiA9IHZlYzMoMC41LCAwLCAtMC41KTtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcyA9IFtcclxuICAgICAgICAgICAgW2JvdCwgbGYsIHJmXSxcclxuICAgICAgICAgICAgW2JvdCwgbGYsIGxiXSxcclxuICAgICAgICAgICAgW2JvdCwgbGIsIHJiXSxcclxuICAgICAgICAgICAgW2JvdCwgcmYsIHJiXSxcclxuICAgICAgICAgICAgW3RvcCwgbGYsIHJmXSxcclxuICAgICAgICAgICAgW3RvcCwgbGYsIGxiXSxcclxuICAgICAgICAgICAgW3RvcCwgbGIsIHJiXSxcclxuICAgICAgICAgICAgW3RvcCwgcmYsIHJiXSxcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIG1ha2VQcmltKHJuZCkge1xyXG4gICAgICAgIGxldCBpbmRpY2llcyA9IFtdO1xyXG4gICAgICAgIGxldCB2ZXJ0ZXhlcyA9IFtdO1xyXG4gICAgICAgIGxldCBqID0gMDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZWRnZSBvZiB0aGlzLnZlcnRleGVzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHYgb2YgZWRnZSkge1xyXG4gICAgICAgICAgICAgICAgdmVydGV4ZXMucHVzaCh2ZXJ0ZXgodiwgdmVjMygwKSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMjsgaSA8IGVkZ2UubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGluZGljaWVzLnB1c2goaiArIDApO1xyXG4gICAgICAgICAgICAgICAgaW5kaWNpZXMucHVzaChqICsgaSAtIDEpO1xyXG4gICAgICAgICAgICAgICAgaW5kaWNpZXMucHVzaChqICsgaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaiArPSBlZGdlLmxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJpbShybmQsIHZlcnRleGVzLCBpbmRpY2llcyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBSZW5kZXIgfSBmcm9tIFwiLi9ybmQvcm5kLmpzXCJcclxuaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuL210aC92ZWMzLmpzXCJcclxuaW1wb3J0IHsgbWF0NCwgbWF0clJvdGF0ZSwgbWF0clRyYW5zbGF0ZSB9IGZyb20gXCIuL210aC9tYXQ0LmpzXCJcclxuaW1wb3J0IHsgUHJpbSwgdmVydGV4IH0gZnJvbSBcIi4vcm5kL3Jlcy9wcmltLmpzXCJcclxuaW1wb3J0IHsgRmlndXJlIH0gZnJvbSBcIi4vcGxhdC9wbGF0LmpzXCJcclxuXHJcbmNvbnNvbGUubG9nKFwiTUFJTiBMT0FERURcIik7XHJcblxyXG5sZXQgcm5kMSwgcm5kMiwgcm5kMztcclxuXHJcbmZ1bmN0aW9uIG1haW4oKSB7XHJcblxyXG4gIGxldCBjYW52YXMxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUNhbjFcIik7XHJcbiAgbGV0IGNhbnZhczIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Q2FuMlwiKTtcclxuICBsZXQgY2FudmFzMyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlDYW4zXCIpO1xyXG5cclxuICBsZXQgeCA9IHZlYzMoMSwgMywgNSk7XHJcbiAgbGV0IHYgPSB2ZWMzKHgpO1xyXG5cclxuICBjb25zb2xlLmxvZyh2KTtcclxuXHJcbiAgcm5kMSA9IG5ldyBSZW5kZXIoY2FudmFzMSk7XHJcbiAgcm5kMiA9IG5ldyBSZW5kZXIoY2FudmFzMik7XHJcbiAgcm5kMyA9IG5ldyBSZW5kZXIoY2FudmFzMyk7XHJcblxyXG4gIC8qXHJcbiAgbGV0IHogPSAwO1xyXG4gIGxldCB2ZXJ0aXhlcyA9IFtcclxuICAgIHZlcnRleCh2ZWMzKC0xLCAtMSwgLTEpLCB2ZWMzKDApKSwgdmVydGV4KHZlYzMoLTEsIDEsIC0xKSwgdmVjMygwKSksIHZlcnRleCh2ZWMzKDEsIDEsIC0xKSwgdmVjMygwKSksIHZlcnRleCh2ZWMzKDEsIC0xLCAtMSksIHZlYzMoMCkpLFxyXG4gICAgdmVydGV4KHZlYzMoLTEsIC0xLCAxKSwgdmVjMygwKSksIHZlcnRleCh2ZWMzKC0xLCAxLCAxKSwgdmVjMygwKSksIHZlcnRleCh2ZWMzKDEsIDEsIDEpLCB2ZWMzKDApKSwgdmVydGV4KHZlYzMoMSwgLTEsIDEpLCB2ZWMzKDApKVxyXG4gIF07XHJcbiAgbGV0IGluZGljaWVzID0gWzAsIDEsIDIsIDAsIDIsIDMsIDQsIDUsIDYsIDQsIDYsIDcsIDAsIDEsIDQsIDEsIDQsIDUsIDIsIDYsIDcsIDIsIDcsIDMsIDEsIDUsIDYsIDEsIDYsIDIsIDAsIDQsIDcsIDAsIDcsIDNdO1xyXG4gICovXHJcblxyXG4gIGxldCB2ZXJ0ZXhlcyA9IFtcclxuICAgIHZlcnRleCh2ZWMzKC0xLCAtMSwgMCksIHZlYzMoMCwgMCwgMSkpLFxyXG4gICAgdmVydGV4KHZlYzMoLTEsIDEsIDApLCB2ZWMzKDAsIDAsIDEpKSxcclxuICAgIHZlcnRleCh2ZWMzKDEsIDEsIDApLCB2ZWMzKDAsIDAsIDEpKSxcclxuICAgIHZlcnRleCh2ZWMzKDEsIC0xLCAwKSwgdmVjMygwLCAwLCAxKSlcclxuICBdXHJcblxyXG4gIGxldCBpbmRpY2llcyA9IFtcclxuICAgIDAsIDEsIDIsIDIsIDMsIDBcclxuICBdXHJcblxyXG4gIC8vbGV0IHByaW0gPSBuZXcgUHJpbShybmQxLCB2ZXJ0ZXhlcywgaW5kaWNpZXMpO1xyXG5cclxuICBsZXQgZmlnID0gbmV3IEZpZ3VyZSgpO1xyXG5cclxuICBmaWcuc2V0T2N0YWhlZHJvbigpO1xyXG4gIGxldCBwcmltMSA9IGZpZy5tYWtlUHJpbShybmQxKTtcclxuICBmaWcuc2V0VGV0cmFoZWRyb24oKTtcclxuICBsZXQgcHJpbTIgPSBmaWcubWFrZVByaW0ocm5kMik7XHJcbiAgZmlnLnNldEN1YmUoKTtcclxuICBsZXQgcHJpbTMgPSBmaWcubWFrZVByaW0ocm5kMyk7XHJcbiAgLy9sZXQgcHJpbTMgPSBmaWcubWFrZVByaW0ocm5kMSk7XHJcblxyXG5cclxuICBjb25zdCBkcmF3ID0gKCkgPT4ge1xyXG4gICAgLy8gZHJhd2luZ1xyXG5cclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgbGV0IHQgPVxyXG4gICAgICBkYXRlLmdldE1pbnV0ZXMoKSAqIDYwICtcclxuICAgICAgZGF0ZS5nZXRTZWNvbmRzKCkgK1xyXG4gICAgICBkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8gMTAwMDtcclxuXHJcbiAgICBybmQxLnJlbmRlcigpO1xyXG4gICAgcHJpbTEucmVuZGVyKHJuZDEsIG1hdHJSb3RhdGUodCwgdmVjMygwLCAxLCAwKSkubXVsKG1hdHJUcmFuc2xhdGUodmVjMygwLCAwLCAtMykpKSk7Ly9tYXRyUm90YXRlKHQsIHZlYzMoMCwgMSwgMCkpKTtcclxuICAgIHJuZDIucmVuZGVyKCk7XHJcbiAgICBwcmltMi5yZW5kZXIocm5kMiwgbWF0clJvdGF0ZSh0LCB2ZWMzKDAsIDEsIDApKS5tdWwobWF0clRyYW5zbGF0ZSh2ZWMzKDAsIDAsIC0zKSkpKTsvL21hdHJSb3RhdGUodCwgdmVjMygwLCAxLCAwKSkpO1xyXG4gICAgcm5kMy5yZW5kZXIoKTtcclxuICAgIHByaW0zLnJlbmRlcihybmQzLCBtYXRyUm90YXRlKHQsIHZlYzMoMCwgMSwgMCkpLm11bChtYXRyVHJhbnNsYXRlKHZlYzMoMCwgMCwgLTMpKSkpOy8vbWF0clJvdGF0ZSh0LCB2ZWMzKDAsIDEsIDApKSk7XHJcblxyXG4gICAgLy8gYW5pbWF0aW9uIHJlZ2lzdGVyXHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xyXG4gIH07XHJcbiAgZHJhdygpO1xyXG59XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xyXG4gIG1haW4oKTtcclxufSk7Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBLE1BQU0sS0FBSyxDQUFDO0lBQ1osSUFBSSxXQUFXO0lBQ2YsUUFBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQzFCLFFBQVEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUMxQixRQUFRLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDMUIsUUFBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQzFCLE1BQU07SUFDTixRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUN0QyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQzVCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDNUIsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDOUIsS0FBSztBQUNMO0lBQ0EsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUU7SUFDakQsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0RCxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUMsUUFBUSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsTUFBTSxLQUFLLEdBQUcsR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUcsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRCxLQUFLO0FBQ0w7SUFDQSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUU7SUFDWCxRQUFRLE9BQU8sSUFBSTtJQUNuQixZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZILEtBQUs7SUFDTCxDQUFDO0FBQ0Q7SUFDTyxTQUFTLElBQUk7SUFDcEIsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQ3RCLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUN0QixJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDdEIsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQ3RCLEVBQUU7SUFDRixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksU0FBUztJQUNwQyxRQUFRLE9BQU8sSUFBSSxLQUFLO0lBQ3hCLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUN0QixZQUFZLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxF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QUFDO0FBQ3RCO0lBQ0EsUUFBUSxPQUFPLElBQUk7SUFDbkIsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUMxRixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzFGLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQzdGLEtBQUs7QUFDTDtJQUNBLElBQUksU0FBUyxDQUFDLENBQUMsRUFBRTtJQUNqQixRQUFRLE9BQU8sSUFBSTtJQUNuQixZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxTQUFTLENBQUM7SUFDVixLQUFLO0FBQ0w7SUFDQSxJQUFJLGNBQWMsR0FBRztJQUNyQixRQUFRLE9BQU8sSUFBSTtJQUNuQixZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BGLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEYsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRixTQUFTLENBQUM7SUFDVixLQUFLO0lBQ0wsQ0FBQztBQUNEO0lBQ08sU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDOUIsSUFBSSxJQUFJLENBQUMsSUFBSSxTQUFTO0lBQ3RCLFFBQVEsT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxRQUFRO0lBQzVCLFFBQVEsT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLElBQUksSUFBSSxDQUFDLElBQUksU0FBUztJQUN0QixRQUFRLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsQyxJQUFJLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM5Qjs7SUNyRkEsTUFBTSxPQUFPLENBQUM7SUFDZCxJQUFJLFdBQVcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFO0lBQzNCLFFBQVEsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDdkIsUUFBUSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUN6QixLQUFLO0lBQ0wsQ0FBQztBQUNEO0lBQ08sU0FBUyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRTtJQUNsQyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7QUFDRDtJQUNPLFNBQVMsV0FBVyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUU7SUFDaEQsSUFBSSxJQUFJLENBQUMsQ0FBQztBQUNWO0lBQ0E7SUFDQSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7SUFDeEMsUUFBUSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuQztJQUNBO0lBQ0EsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtJQUM3QyxRQUFRO0lBQ1IsWUFBWSxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLFFBQVE7SUFDUixZQUFZLEVBQUUsR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRztJQUNqQyxZQUFZLEVBQUUsR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRztJQUNqQyxZQUFZLEVBQUUsR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRztJQUNqQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDcEQ7SUFDQSxRQUFRLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckQsUUFBUSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELFFBQVEsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRCxLQUFLO0FBQ0w7SUFDQTtJQUNBLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzFDLFFBQVEsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFB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QztJQUN4RyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNwRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hHLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEcsVUFBUztJQUNULEtBQUs7QUFDTDtJQUNBLElBQUksY0FBYyxHQUFHO0lBQ3JCLFFBQVEsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzRDtJQUNBLFFBQVE7SUFDUixZQUFZLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQzNDLFlBQVksS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssR0FBRyxHQUFHLENBQUM7SUFDM0MsWUFBWSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7SUFDOUMsWUFBWSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDL0M7SUFDQSxRQUFRLElBQUksQ0FBQyxRQUFRLEdBQUc7SUFDeEIsWUFBWSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDO0lBQzlCLFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQztJQUM5QixZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUM7SUFDL0IsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLEVB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
