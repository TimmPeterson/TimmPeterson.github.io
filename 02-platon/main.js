(function () {
    'use strict';

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

        linearize() {
            return [this.x, this.y, this.z];
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

        linearize() {
            return [].concat(...this.a);
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

    function matrScale(s) {
        return mat4(
            s.x, 0, 0, 0,
            0, s.y, 0, 0,
            0, 0, s.z, 0,
            0, 0, 0, 1
        )
    }

    function matrFrustum(left, right, bottom, top, near, far) {
        return mat4(
            2 * near / (right - left), 0, 0, 0,
            0, 2 * near / (top - bottom), 0, 0,
            (right + left) / (right - left), (top + bottom) / (top - bottom), -(far + near) / (far - near), -1,
            0, 0, -2 * near * far / (far - near), 0
        );
    }

    function matrView(loc, at, up1) {
        let
            dir = at.sub(loc).norm(),
            right = dir.cross(up1).norm(),
            up = right.cross(dir).norm();
        return mat4(
            right.x, up.x, -dir.x, 0,
            right.y, up.y, -dir.y, 0,
            right.z, up.z, -dir.z, 0,
            -loc.dot(right), -loc.dot(up), loc.dot(dir), 1
        );
    }

    class Shader {
        constructor(rnd, name) {
            this.rnd = rnd;
            this.name = name;
            this.prg = null;
            this._init();
        }

        async _init() {
            this.shaders =
                [
                    {
                        id: null,
                        type: this.rnd.gl.VERTEX_SHADER,
                        name: "vert",
                        src: "",
                    },
                    {
                        id: null,
                        type: this.rnd.gl.FRAGMENT_SHADER,
                        name: "frag",
                        src: "",
                    }
                ];
            for (const s of this.shaders) {
                let response = await fetch(`bin/shaders/${this.name}/${s.name}.glsl`);
                let src = await response.text();
                if (typeof src == "string" && src != "")
                    s.src = src;
            }
            // recompile shaders
            this.updateShadersSource();
        }

        updateShadersSource() {
            this.shaders[0].id = null;
            this.shaders[1].id = null;

            if (this.shaders[0].src == "" || this.shaders[1].src == "")
                return;
            this.shaders.forEach(s => {
                s.id = this.rnd.gl.createShader(s.type);
                this.rnd.gl.shaderSource(s.id, s.src);
                this.rnd.gl.compileShader(s.id);
                if (!this.rnd.gl.getShaderParameter(s.id, this.rnd.gl.COMPILE_STATUS)) {
                    let buf = this.rnd.gl.getShaderInfoLog(s.id);
                    console.log(`Shader ${this.name}/${s.name} compile fail: ${buf}`);
                }
            });
            this.prg = this.rnd.gl.createProgram();
            this.shaders.forEach(s => {
                if (s.id != null)
                    this.rnd.gl.attachShader(this.prg, s.id);
            });
            this.rnd.gl.linkProgram(this.prg);
            if (!this.rnd.gl.getProgramParameter(this.prg, this.rnd.gl.LINK_STATUS)) {
                let buf = this.rnd.gl.getProgramInfoLog(this.prg);
                console.log(`Shader program ${this.name} link fail: ${buf}`);
            }
            this.updateShaderData();
        }

        updateShaderData() {
            this.posLoc = this.rnd.gl.getAttribLocation(this.prg, "InPosition");
            this.normLoc = this.rnd.gl.getAttribLocation(this.prg, "InNormal");

            // Shader uniforms
            this.uniforms = {};
            const countUniforms = this.rnd.gl.getProgramParameter(this.prg, this.rnd.gl.ACTIVE_UNIFORMS);
            for (let i = 0; i < countUniforms; i++) {
                const info = this.rnd.gl.getActiveUniform(this.prg, i);
                this.uniforms[info.name] = {
                    name: info.name,
                    type: info.type,
                    size: info.size,
                    loc: this.rnd.gl.getUniformLocation(this.prg, info.name),
                };
            }

            // Shader uniform blocks
            this.uniformBlocks = {};
            const countUniformBlocks = this.rnd.gl.getProgramParameter(this.prg, this.rnd.gl.ACTIVE_UNIFORM_BLOCKS);
            for (let i = 0; i < countUniformBlocks; i++) {
                const block_name = this.rnd.gl.getActiveUniformBlockName(this.prg, i);
                const index = this.rnd.gl.getUniformBlockIndex(this.prg, block_name);
                this.uniformBlocks[block_name] = {
                    name: block_name,
                    index: index,
                    size: this.rnd.gl.getActiveUniformBlockParameter(this.prg, index, this.rnd.gl.UNIFORM_BLOCK_DATA_SIZE),
                    bind: this.rnd.gl.getActiveUniformBlockParameter(this.prg, index, this.rnd.gl.UNIFORM_BLOCK_BINDING),
                };
            }

            this.rnd.matrixUBO.apply(this);
            this.rnd.primUBO.apply(this);
            this.rnd.timeUBO.apply(this);
        }

        apply() {
            if (this.prg != null) {
                this.rnd.gl.useProgram(this.prg);
                return true;
            }
            return false;
        }
    }

    class _buffer {
        constructor(rnd, type, size) {
            this.rnd = rnd;
            this.type = type;    // Buffer type (gl.***_BUFFER)
            this.size = size;    // Buffer size in bytes
            this.id = null;
            if (size == 0 || type == undefined)
                return;
            this.id = rnd.gl.createBuffer();
            this.rnd.gl.bindBuffer(type, this.id);
            this.rnd.gl.bufferData(type, size, rnd.gl.STATIC_DRAW);
        }

        update(data) {
            this.rnd.gl.bindBuffer(this.type, this.id);
            this.rnd.gl.bufferSubData(this.type, 0, data);
        }
    }

    class UniformBuffer extends _buffer {
        constructor(rnd, name, size, bindPoint) {
            super(rnd, rnd.gl.UNIFORM_BUFFER, size);
            this.name = name;
            this.bindPoint = bindPoint; // Buffer GPU binding point
        }

        apply(shd) {
            if (this.rnd == undefined || shd.prg == undefined || shd.uniformBlocks[this.name] == undefined)
                return;
            shd.rnd.gl.bindBufferRange(this.type, shd.uniformBlocks[this.name].index, this.id, 0, this.size);
            shd.rnd.gl.uniformBlockBinding(shd.prg, shd.uniformBlocks[this.name].index, this.bindPoint);
            shd.rnd.gl.bindBufferBase(shd.rnd.gl.UNIFORM_BUFFER, this.bindPoint, this.id);
        }
    }

    ////////////////////////////
    // Timer class module
    ////////////////////////////

    class Timer {
        constructor() {        
            this.globalTime = this.localTime = this.getTime();
            this.globalDeltaTime = this.localDeltaTime = 0;
            this.startTime = this.oldTime = this.oldTimeFPS = this.globalTime;
            this.frameCounter = 0;
            this.isPause = false;
            this.FPS = 30.0;
            this.pauseTime = 0;
        }

        // Get current global time funtion
        getTime() {
            const date = new Date();
            let t =
                date.getMilliseconds() / 1000.0 +
                date.getSeconds() +
                date.getMinutes() * 60;
            return t;
        };

        // Get current FPS function
        getFPS() {
            return this.FPS.toFixed(3);
        }

        pauseEnbale() {
            this.isPause = true;
        }

        pauseDisable() {
            this.isPause = false;
        }

        pauseSwitch() {
            if (this.isPause == false)
                this.isPause = true;
            else
                this.isPause = false;
        }

        // Reponse timer function
        response(tag_id = null) {
            let t = this.getTime();

            this.globalTime = t;
            this.globalDeltaTime = t - this.oldTime;

            if (this.isPause) {
                this.localDeltaTime = 0;
                this.pauseTime += t - this.oldTime;
            } 
            else {
                this.localDeltaTime = this.globalDeltaTime;
                this.localTime = t - this.pauseTime - this.startTime;
            }

            this.frameCounter++;
            if (t - this.oldTimeFPS > 3) {
                this.FPS = this.frameCounter / (t - this.oldTimeFPS);
                this.oldTimeFPS = t;
                this.frameCounter = 0;
                if (tag_id != null)
                    document.getElementById(tag_id).innerHTML = this.getFPS();
            }

            this.oldTime = t;
        };
    }

    class Render {

        setFrustum() {
            mat4(1);
            let rx = this.projSize, ry = this.projSize;

            /* Correct aspect ratio */
            if (this.width >= this.height)
                rx *= this.width / this.height;
            else
                ry *= this.height / this.width;

            this.matrProj = matrFrustum(-rx / 2, rx / 2, -ry / 2, ry / 2, this.projDist, this.farClip);
        }

        setCam(loc, at, up) {
            this.matrView = matrView(loc, at, up);
        }

        updateMatrixes() {
            this.matrixUBO.update(new Float32Array(this.matrProj.linearize().concat(this.matrView.linearize())));
        }

        renderStart() {
            this.timer.response();
            this.timeUBO.update(new Float32Array([this.timer.localTime, this.timer.localDeltaTime, this.timer.globalTime, this.timer.globalDeltaTime]));

            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
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

            this.setFrustum();
            this.setCam(vec3(0, 0, 0), vec3(0, 0, -1), vec3(0, 1, 0));
            this.matrixUBO = new UniformBuffer(this, "u_camera", 16 * 4 * 2, 0);
            this.updateMatrixes();

            this.primUBO = new UniformBuffer(this, "u_primitive", 16 * 4, 1);

            this.timer = new Timer();
            this.timeUBO = new UniformBuffer(this, "u_time", 16, 2);
        }
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
        create(shd, vertexes, indicies) {
            let trimash = [], i = 0;

            this.vertexes = vertexes;
            this.indicies = indicies;
            this.shd = shd;
            this.loaded = false;
            if (this.shd.prg != null)
                this.loaded = true;

            autoNormals(vertexes, indicies);

            for (let v of vertexes) {
                trimash[i++] = v.pos.x;
                trimash[i++] = v.pos.y;
                trimash[i++] = v.pos.z;
                trimash[i++] = v.norm.x;
                trimash[i++] = v.norm.y;
                trimash[i++] = v.norm.z;
            }

            this.vertexArrayId = shd.rnd.gl.createVertexArray();
            shd.rnd.gl.bindVertexArray(this.vertexArrayId);
            this.vertexBufferId = shd.rnd.gl.createBuffer();

            shd.rnd.gl.bindBuffer(shd.rnd.gl.ARRAY_BUFFER, this.vertexBufferId);
            shd.rnd.gl.bufferData(shd.rnd.gl.ARRAY_BUFFER, new Float32Array(trimash), shd.rnd.gl.STATIC_DRAW);

            if (this.posLoc != -1 && this.normLoc != -1) {
                shd.rnd.gl.vertexAttribPointer(shd.posLoc, 3, shd.rnd.gl.FLOAT, false, 24, 0);
                shd.rnd.gl.enableVertexAttribArray(shd.posLoc);
                shd.rnd.gl.vertexAttribPointer(shd.normLoc, 3, shd.rnd.gl.FLOAT, false, 24, 12);
                shd.rnd.gl.enableVertexAttribArray(shd.normLoc);
            }

            this.IndexBufferId = shd.rnd.gl.createBuffer();
            shd.rnd.gl.bindBuffer(shd.rnd.gl.ELEMENT_ARRAY_BUFFER, this.IndexBufferId);
            shd.rnd.gl.bufferData(shd.rnd.gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indicies), shd.rnd.gl.STATIC_DRAW);

            this.numOfElements = indicies.length;
        }

        constructor(mtl, vertexes, indicies) {
            this.mtl = mtl;
            this.create(mtl.shd, vertexes, indicies);
        }

        render(world) {

            // Recreating primitive if it wasn't created
            // (because of shader async initialization)
            if (this.shd.prg != null && this.loaded == false) {
                this.create(this.shd, this.vertexes, this.indicies);
                this.loaded = true;
            }

            // Drawing primitive if shader is loaded
            if (this.mtl.apply()) {
                this.shd.rnd.primUBO.update(new Float32Array(world.linearize()));
                this.shd.rnd.gl.bindVertexArray(this.vertexArrayId);
                this.shd.rnd.gl.bindBuffer(this.shd.rnd.gl.ELEMENT_ARRAY_BUFFER, this.IndexBufferId);
                this.shd.rnd.gl.drawElements(this.shd.rnd.gl.TRIANGLES, this.numOfElements, this.shd.rnd.gl.UNSIGNED_INT, 0);
            }
        }
    }

    class Figure {
        constructor() {
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

        setIcohedron() {

            let layer1 = [];
            let layer2 = [];

            let r = 0.5 / Math.sin(36 / 180 * Math.PI);
            let d = Math.sqrt(1 - Math.pow(2 * Math.sin(0.1 * Math.PI) * r, 2));

            for (let i = 0; i < 360; i += 72) {
                let angle = i / 180.0 * Math.PI;
                let p = vec3(r * Math.sin(angle), r * Math.cos(angle), -d / 2);

                layer1.push(p);
            }

            for (let i = 0; i < 360; i += 72) {
                let angle = (i + 36) / 180.0 * Math.PI;
                let p = vec3(r * Math.sin(angle), r * Math.cos(angle), d / 2);

                layer2.push(p);
            }

            let
                top = vec3(0, 0, r),
                bot = top.mul(-1);

            for (let i = 0; i < 5; i++) {
                let tri1 =
                    [
                        layer1[i],
                        layer2[i],
                        layer2[(i + 4) % 5]
                    ];
                this.vertexes.push(tri1);
            }
            for (let i = 0; i < 5; i++) {
                let tri2 =
                    [
                        layer2[i],
                        layer1[i],
                        layer1[(i + 1) % 5]
                    ];
                this.vertexes.push(tri2);
            }

            for (let i = 0; i < 5; i++) {
                let cap1 =
                    [
                        bot, layer1[i], layer1[(i + 1) % 5]
                    ];
                this.vertexes.push(cap1);
            }
            for (let i = 0; i < 5; i++) {
                let cap2 =
                    [
                        top, layer2[i], layer2[(i + 1) % 5]
                    ];
                this.vertexes.push(cap2);
            }

        }

        setDodecahedron() {
            let r = Math.sqrt(50 + 10 * Math.sqrt(5)) / 10;
            let R = 0.25 * (1 + Math.sqrt(5)) * Math.sqrt(3);
            let r0 = r * 2 * Math.cos((36 / 180 * Math.PI));

            let edge1 = [];
            let edge2 = [];
            let layer1 = [];
            let layer2 = [];

            let d = Math.sqrt(R * R - r * r);
            let d0 = Math.sqrt(R * R - r0 * r0);

            for (let i = 0; i < 360; i += 72) {
                let
                    a1 = i / 180 * Math.PI,
                    a2 = (i + 36) / 180 * Math.PI;

                let p1 = vec3(r * Math.sin(a1), r * Math.cos(a1), d);
                let p2 = vec3(r * Math.sin(a2), r * Math.cos(a2), -d);

                let l1 = vec3(r0 * Math.sin(a1), r0 * Math.cos(a1), d0);
                let l2 = vec3(r0 * Math.sin(a2), r0 * Math.cos(a2), -d0);

                edge1.push(p1);
                edge2.push(p2);

                layer1.push(l1);
                layer2.push(l2);
            }

            this.vertexes.push(edge1);
            this.vertexes.push(edge2);

            for (let i = 0; i < 5; i++) {
                let surface1 = [
                    edge1[i],
                    layer1[i],
                    layer2[i],
                    layer1[(i + 1) % 5],
                    edge1[(i + 1) % 5]
                ];
                let surface2 = [
                    edge2[i],
                    layer2[i],
                    layer1[i],
                    layer2[(i + 4) % 5],
                    edge2[(i + 4) % 5]
                ];
                this.vertexes.push(surface1);
                this.vertexes.push(surface2);
            }
            //this.vertexes = [edge1, layer1, layer2, edge2];
        }

        setStar() {
            this.vertexes = [];
            this.setDodecahedron();

            let verts = [];

            for (let i = 0; i < this.vertexes.length; i++) {
                let p = vec3(0);

                for (let v of this.vertexes[i]) {
                    p = p.add(v);
                }
                p = p.div(5);
                p = p.mul(3);

                let tris =
                    [
                        [this.vertexes[i][0], this.vertexes[i][1], p],
                        [this.vertexes[i][1], this.vertexes[i][2], p],
                        [this.vertexes[i][2], this.vertexes[i][3], p],
                        [this.vertexes[i][3], this.vertexes[i][4], p],
                        [this.vertexes[i][4], this.vertexes[i][0], p],
                    ];
                for (let i = 0; i < 5; i++)
                    verts.push(tris[i]);
            }

            this.vertexes = verts;
        }

        makePrim(mtl) {
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

            return new Prim(mtl, vertexes, indicies);
        }
    }

    class Material {
        constructor(shd, Ka, Kd, Ks, Ph) {
            this.shd = shd;
            this.Ka = Ka;
            this.Kd = Kd;
            this.Ks = Ks;
            this.Ph = Ph;

            this.UBO = new UniformBuffer(this.shd.rnd, "u_material", 16 * 3, 3);
            //this.UBO.update(new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
            this.UBO.update(new Float32Array(this.Ka.linearize().concat([0], this.Kd.linearize(), [0], this.Ks.linearize(), [Ph])));
        }
        apply() {
            if (this.shd.apply()) {
                this.UBO.apply(this.shd);
                return true;
            }
            return false;
        }
    }

    console.log("MAIN LOADED");

    function tpLog(text) {
      window.par.innerHTML += text;
    }

    function main() {

      window.par = document.getElementById("p");

      let canvases = [];
      let renders = [];
      let shaders = [];
      let prims = [];
      let figures = [];
      let rots = [];
      let mtls = [];
      let scales =
        [
          matrScale(vec3(3)), matrScale(vec3(2.8)),
          matrScale(vec3(2.7)), matrScale(vec3(2.2)),
          matrScale(vec3(1.8)), matrScale(vec3(1))
        ];

      for (let i = 0; i < 6; i++)
        figures[i] = new Figure();

      figures[0].setTetrahedron();
      figures[1].setOctahedron();
      figures[2].setCube();
      figures[3].setIcohedron();
      figures[4].setDodecahedron();
      figures[5].setStar();

      let mtl_props = [
        [vec3(0.1), vec3(0, 0.7, 0.7), vec3(0.5, 0.5, 0.5), 90],
        [vec3(0.1), vec3(0, 0, 0.7), vec3(0.5, 0.5, 0.0), 40],
        [vec3(0.1), vec3(0.2, 0.5, 0.5), vec3(0.5, 0.5, 0.5), 40],
        [vec3(0.1), vec3(0.7, 0.7, 0.7), vec3(0.5, 0.5, 0.5), 90],
        [vec3(0.1), vec3(0.2, 0.2, 0.2), vec3(0.1, 0.1, 0.1), 15],
        [vec3(0.1), vec3(0.7, 0.7, 0), vec3(0.9, 0.9, 0.9), 90],
      ];

      try {
        for (let i = 0; i < 6; i++) {
          canvases[i] = document.getElementById(`myCan${i + 1}`);
          renders[i] = new Render(canvases[i]);
          try {
            shaders[i] = new Shader(renders[i], "default");
          } catch (err) {
            tpLog(`${err.name} : ${err.str}`);
          }
          mtls[i] = new Material(shaders[i], ...mtl_props[i]);
          prims[i] = figures[i].makePrim(mtls[i]);
          canvases[i].hm = Hammer(canvases[i]);
          canvases[i].hm.get("rotate").set({ enable: true });
        }
      } catch (err) {
        tpLog(`${err.name} : ${err.message}`);
      }

      // Timer creation
      let timer = new Timer();

      let mtl = new Material(shaders[3], ...mtl_props[0]);
      let f = new Figure();
      f.setDodecahedron();
      let test_pr = f.makePrim(mtl);
      for (let i = 0; i < 6; i++) {
        rots[i] = mat4(1);
        let f2 = e => {
          if (e.deltaY > 0)
            scales[i] = scales[i].mul(matrScale(vec3(0.9)));
          else
            scales[i] = scales[i].mul(matrScale(vec3(1.1)));
        };

        let d, old = 0;
        let f3 = e => {
          d = e.angle - old;
          old = e.angle;
          rots[i] = rots[i].mul(matrRotate(d, vec3(0, 0, 1)));
        };
        let f4 = e => {
          rots[i] = rots[i].mul(matrRotate(0.1 * e.velocityX, vec3(0, 1, 0)));
          rots[i] = rots[i].mul(matrRotate(0.1 * e.velocityY, vec3(1, 0, 0)));
        };

        //canvases[i].addEventListener("mousemove", f1);
        canvases[i].addEventListener("wheel", f2);
        canvases[i].hm.on("rotate", f3);
        canvases[i].hm.on("pan", f4);
      }

      // Each frame rendering function declaration
      const draw = () => {

        // timer reponse
        timer.response();

        let t = timer.getTime();

        // frame render
        try {
          for (let i = 0; i < 6; i++) {
            renders[i].renderStart();
            if (i == 3)
              test_pr.render(scales[i].mul(matrRotate(t, vec3(0, 1, 0)).mul(rots[i].mul(matrTranslate(vec3(2, 2, -10))))));
            prims[i].render(scales[i].mul(matrRotate(t, vec3(0, 1, 0)).mul(rots[i].mul(matrTranslate(vec3(0, 0, -10))))));
          }
        } catch (err) {
          tpLog(`${err.name} : ${err.message}`);
        }

        window.requestAnimationFrame(draw);
      };
      draw();
    }

    window.addEventListener("load", () => {
      main();
    });

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL210aC92ZWMzLmpzIiwiLi4vc3JjL210aC9tYXQ0LmpzIiwiLi4vc3JjL3JuZC9yZXMvc2hkLmpzIiwiLi4vc3JjL3JuZC9yZXMvYnVmLmpzIiwiLi4vc3JjL3RpbWVyL3RpbWVyLmpzIiwiLi4vc3JjL3JuZC9ybmQuanMiLCIuLi9zcmMvcm5kL3Jlcy9wcmltLmpzIiwiLi4vc3JjL3BsYXQvcGxhdC5qcyIsIi4uL3NyYy9ybmQvcmVzL210bC5qcyIsIi4uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIF92ZWMzIHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIHopIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy56ID0gejtcclxuICAgIH1cclxuXHJcbiAgICBsZW4yKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRvdCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBsZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmRvdCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbm9ybSgpIHtcclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5sZW4oKTtcclxuXHJcbiAgICAgICAgaWYgKGxlbiA9PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gdmVjMygwKTtcclxuXHJcbiAgICAgICAgaWYgKGxlbiA9PSAxKVxyXG4gICAgICAgICAgICByZXR1cm4gdmVjMyh0aGlzKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kaXYobGVuKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGQodikge1xyXG4gICAgICAgIHJldHVybiB2ZWMzKHRoaXMueCArIHYueCwgdGhpcy55ICsgdi55LCB0aGlzLnogKyB2LnopO1xyXG4gICAgfVxyXG5cclxuICAgIHN1Yih2KSB7XHJcbiAgICAgICAgcmV0dXJuIHZlYzModGhpcy54IC0gdi54LCB0aGlzLnkgLSB2LnksIHRoaXMueiAtIHYueik7XHJcbiAgICB9XHJcblxyXG4gICAgbXVsKGspIHtcclxuICAgICAgICByZXR1cm4gdmVjMyh0aGlzLnggKiBrLCB0aGlzLnkgKiBrLCB0aGlzLnogKiBrKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXYoaykge1xyXG4gICAgICAgIHJldHVybiB2ZWMzKHRoaXMueCAvIGssIHRoaXMueSAvIGssIHRoaXMueiAvIGspO1xyXG4gICAgfVxyXG5cclxuICAgIGRvdCh2KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueSArIHRoaXMueiAqIHYuejtcclxuICAgIH1cclxuXHJcbiAgICBjcm9zcyh2KSB7XHJcbiAgICAgICAgcmV0dXJuIHZlYzModGhpcy55ICogdi56IC0gdGhpcy56ICogdi55LFxyXG4gICAgICAgICAgICB0aGlzLnogKiB2LnggLSB0aGlzLnggKiB2LnosXHJcbiAgICAgICAgICAgIHRoaXMueCAqIHYueSAtIHRoaXMueSAqIHYueCk7XHJcbiAgICB9XHJcblxyXG4gICAgbXVsbWF0cihtKSB7XHJcbiAgICAgICAgbGV0IHcgPSB0aGlzLnggKiBtLmFbMF1bM10gK1xyXG4gICAgICAgICAgICB0aGlzLnkgKiBtLmFbMV1bM10gK1xyXG4gICAgICAgICAgICB0aGlzLnggKiBtLmFbMl1bM10gK1xyXG4gICAgICAgICAgICBtLmFbM11bM107XHJcblxyXG4gICAgICAgIHJldHVybiB2ZWMzKFxyXG4gICAgICAgICAgICAodGhpcy54ICogbS5hWzBdWzBdICsgdGhpcy55ICogbS5hWzFdWzBdICsgdGhpcy56ICogbS5hWzJdWzBdICsgbS5hWzNdWzBdKSAvIHcsXHJcbiAgICAgICAgICAgICh0aGlzLnggKiBtLmFbMF1bMV0gKyB0aGlzLnkgKiBtLmFbMV1bMV0gKyB0aGlzLnogKiBtLmFbMl1bMV0gKyBtLmFbM11bMV0pIC8gdyxcclxuICAgICAgICAgICAgKHRoaXMueCAqIG0uYVswXVsyXSArIHRoaXMueSAqIG0uYVsxXVsyXSArIHRoaXMueiAqIG0uYVsyXVsyXSArIG0uYVszXVsyXSkgLyB3LCk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNmb3JtKG0pIHtcclxuICAgICAgICByZXR1cm4gdmVjMyhcclxuICAgICAgICAgICAgdGhpcy54ICogbS5hWzBdWzBdICsgdGhpcy55ICogbS5hWzFdWzBdICsgdGhpcy56ICogbS5hWzJdWzBdLFxyXG4gICAgICAgICAgICB0aGlzLnggKiBtLmFbMF1bMV0gKyB0aGlzLnkgKiBtLmFbMV1bMV0gKyB0aGlzLnogKiBtLmFbMl1bMV0sXHJcbiAgICAgICAgICAgIHRoaXMueCAqIG0uYVswXVsyXSArIHRoaXMueSAqIG0uYVsxXVsyXSArIHRoaXMueiAqIG0uYVsyXVsyXVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9pbnRUcmFuc2Zvcm0oKSB7XHJcbiAgICAgICAgcmV0dXJuIHZlYzMoXHJcbiAgICAgICAgICAgIHRoaXMueCAqIG0uYVswXVswXSArIHRoaXMueSAqIG0uYVsxXVswXSArIHRoaXMueiAqIG0uYVsyXVswXSArIG0uYVszXVswXSxcclxuICAgICAgICAgICAgdGhpcy54ICogbS5hWzBdWzFdICsgdGhpcy55ICogbS5hWzFdWzFdICsgdGhpcy56ICogbS5hWzJdWzFdICsgbS5hWzNdWzFdLFxyXG4gICAgICAgICAgICB0aGlzLnggKiBtLmFbMF1bMl0gKyB0aGlzLnkgKiBtLmFbMV1bMl0gKyB0aGlzLnogKiBtLmFbMl1bMl0gKyBtLmFbM11bMl1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGxpbmVhcml6ZSgpIHtcclxuICAgICAgICByZXR1cm4gW3RoaXMueCwgdGhpcy55LCB0aGlzLnpdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmVjMyh4LCB5LCB6KSB7XHJcbiAgICBpZiAoeCA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgcmV0dXJuIG5ldyBfdmVjMygwLCAwLCAwKTtcclxuICAgIGlmICh0eXBlb2YgeCA9PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIHJldHVybiBuZXcgX3ZlYzMoeC54LCB4LnksIHgueik7XHJcbiAgICBpZiAoeSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgcmV0dXJuIG5ldyBfdmVjMyh4LCB4LCB4KTtcclxuICAgIHJldHVybiBuZXcgX3ZlYzMoeCwgeSwgeik7XHJcbn1cclxuIiwiY2xhc3MgX21hdDQge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgYTAwLCBhMDEsIGEwMiwgYTAzLFxyXG4gICAgICAgIGExMCwgYTExLCBhMTIsIGExMyxcclxuICAgICAgICBhMjAsIGEyMSwgYTIyLCBhMjMsXHJcbiAgICAgICAgYTMwLCBhMzEsIGEzMiwgYTMzXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLmEgPSBbW2EwMCwgYTAxLCBhMDIsIGEwM10sXHJcbiAgICAgICAgW2ExMCwgYTExLCBhMTIsIGExM10sXHJcbiAgICAgICAgW2EyMCwgYTIxLCBhMjIsIGEyM10sXHJcbiAgICAgICAgW2EzMCwgYTMxLCBhMzIsIGEzM11dO1xyXG4gICAgfVxyXG5cclxuICAgIG11bChtKSB7XHJcbiAgICAgICAgcmV0dXJuIG1hdDQoXHJcbiAgICAgICAgICAgIHRoaXMuYVswXVswXSAqIG0uYVswXVswXSArIHRoaXMuYVswXVsxXSAqIG0uYVsxXVswXSArIHRoaXMuYVswXVsyXSAqIG0uYVsyXVswXSArIHRoaXMuYVswXVszXSAqIG0uYVszXVswXSxcclxuICAgICAgICAgICAgdGhpcy5hWzBdWzBdICogbS5hWzBdWzFdICsgdGhpcy5hWzBdWzFdICogbS5hWzFdWzFdICsgdGhpcy5hWzBdWzJdICogbS5hWzJdWzFdICsgdGhpcy5hWzBdWzNdICogbS5hWzNdWzFdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMF1bMF0gKiBtLmFbMF1bMl0gKyB0aGlzLmFbMF1bMV0gKiBtLmFbMV1bMl0gKyB0aGlzLmFbMF1bMl0gKiBtLmFbMl1bMl0gKyB0aGlzLmFbMF1bM10gKiBtLmFbM11bMl0sXHJcbiAgICAgICAgICAgIHRoaXMuYVswXVswXSAqIG0uYVswXVszXSArIHRoaXMuYVswXVsxXSAqIG0uYVsxXVszXSArIHRoaXMuYVswXVsyXSAqIG0uYVsyXVszXSArIHRoaXMuYVswXVszXSAqIG0uYVszXVszXSxcclxuICAgICAgICAgICAgdGhpcy5hWzFdWzBdICogbS5hWzBdWzBdICsgdGhpcy5hWzFdWzFdICogbS5hWzFdWzBdICsgdGhpcy5hWzFdWzJdICogbS5hWzJdWzBdICsgdGhpcy5hWzFdWzNdICogbS5hWzNdWzBdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMV1bMF0gKiBtLmFbMF1bMV0gKyB0aGlzLmFbMV1bMV0gKiBtLmFbMV1bMV0gKyB0aGlzLmFbMV1bMl0gKiBtLmFbMl1bMV0gKyB0aGlzLmFbMV1bM10gKiBtLmFbM11bMV0sXHJcbiAgICAgICAgICAgIHRoaXMuYVsxXVswXSAqIG0uYVswXVsyXSArIHRoaXMuYVsxXVsxXSAqIG0uYVsxXVsyXSArIHRoaXMuYVsxXVsyXSAqIG0uYVsyXVsyXSArIHRoaXMuYVsxXVszXSAqIG0uYVszXVsyXSxcclxuICAgICAgICAgICAgdGhpcy5hWzFdWzBdICogbS5hWzBdWzNdICsgdGhpcy5hWzFdWzFdICogbS5hWzFdWzNdICsgdGhpcy5hWzFdWzJdICogbS5hWzJdWzNdICsgdGhpcy5hWzFdWzNdICogbS5hWzNdWzNdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMl1bMF0gKiBtLmFbMF1bMF0gKyB0aGlzLmFbMl1bMV0gKiBtLmFbMV1bMF0gKyB0aGlzLmFbMl1bMl0gKiBtLmFbMl1bMF0gKyB0aGlzLmFbMl1bM10gKiBtLmFbM11bMF0sXHJcbiAgICAgICAgICAgIHRoaXMuYVsyXVswXSAqIG0uYVswXVsxXSArIHRoaXMuYVsyXVsxXSAqIG0uYVsxXVsxXSArIHRoaXMuYVsyXVsyXSAqIG0uYVsyXVsxXSArIHRoaXMuYVsyXVszXSAqIG0uYVszXVsxXSxcclxuICAgICAgICAgICAgdGhpcy5hWzJdWzBdICogbS5hWzBdWzJdICsgdGhpcy5hWzJdWzFdICogbS5hWzFdWzJdICsgdGhpcy5hWzJdWzJdICogbS5hWzJdWzJdICsgdGhpcy5hWzJdWzNdICogbS5hWzNdWzJdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMl1bMF0gKiBtLmFbMF1bM10gKyB0aGlzLmFbMl1bMV0gKiBtLmFbMV1bM10gKyB0aGlzLmFbMl1bMl0gKiBtLmFbMl1bM10gKyB0aGlzLmFbMl1bM10gKiBtLmFbM11bM10sXHJcbiAgICAgICAgICAgIHRoaXMuYVszXVswXSAqIG0uYVswXVswXSArIHRoaXMuYVszXVsxXSAqIG0uYVsxXVswXSArIHRoaXMuYVszXVsyXSAqIG0uYVsyXVswXSArIHRoaXMuYVszXVszXSAqIG0uYVszXVswXSxcclxuICAgICAgICAgICAgdGhpcy5hWzNdWzBdICogbS5hWzBdWzFdICsgdGhpcy5hWzNdWzFdICogbS5hWzFdWzFdICsgdGhpcy5hWzNdWzJdICogbS5hWzJdWzFdICsgdGhpcy5hWzNdWzNdICogbS5hWzNdWzFdLFxyXG4gICAgICAgICAgICB0aGlzLmFbM11bMF0gKiBtLmFbMF1bMl0gKyB0aGlzLmFbM11bMV0gKiBtLmFbMV1bMl0gKyB0aGlzLmFbM11bMl0gKiBtLmFbMl1bMl0gKyB0aGlzLmFbM11bM10gKiBtLmFbM11bMl0sXHJcbiAgICAgICAgICAgIHRoaXMuYVszXVswXSAqIG0uYVswXVszXSArIHRoaXMuYVszXVsxXSAqIG0uYVsxXVszXSArIHRoaXMuYVszXVsyXSAqIG0uYVsyXVszXSArIHRoaXMuYVszXVszXSAqIG0uYVszXVszXSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGluZWFyaXplKCkge1xyXG4gICAgICAgIHJldHVybiBbXS5jb25jYXQoLi4udGhpcy5hKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1hdDQoXHJcbiAgICBhMDAsIGEwMSwgYTAyLCBhMDMsXHJcbiAgICBhMTAsIGExMSwgYTEyLCBhMTMsXHJcbiAgICBhMjAsIGEyMSwgYTIyLCBhMjMsXHJcbiAgICBhMzAsIGEzMSwgYTMyLCBhMzNcclxuKSB7XHJcbiAgICBpZiAoYTAwID09IDEgJiYgYTAxID09IHVuZGVmaW5lZClcclxuICAgICAgICByZXR1cm4gbmV3IF9tYXQ0KFxyXG4gICAgICAgICAgICAxLCAwLCAwLCAwLFxyXG4gICAgICAgICAgICAwLCAxLCAwLCAwLFxyXG4gICAgICAgICAgICAwLCAwLCAxLCAwLFxyXG4gICAgICAgICAgICAwLCAwLCAwLCAxKTtcclxuICAgIGlmICh0eXBlb2YgYTAwID09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgcmV0dXJuIG5ldyBfbWF0NChcclxuICAgICAgICAgICAgYTAwWzBdWzBdLCBhMDBbMF1bMV0sIGEwMFswXVsyXSwgYTAwWzBdWzNdLFxyXG4gICAgICAgICAgICBhMDBbMV1bMF0sIGEwMFsxXVsxXSwgYTAwWzFdWzJdLCBhMDBbMV1bM10sXHJcbiAgICAgICAgICAgIGEwMFsyXVswXSwgYTAwWzJdWzFdLCBhMDBbMl1bMl0sIGEwMFsyXVszXSxcclxuICAgICAgICAgICAgYTAwWzNdWzBdLCBhMDBbM11bMV0sIGEwMFszXVsyXSwgYTAwWzNdWzNdXHJcbiAgICAgICAgKTtcclxuICAgIHJldHVybiBuZXcgX21hdDQoXHJcbiAgICAgICAgYTAwLCBhMDEsIGEwMiwgYTAzLFxyXG4gICAgICAgIGExMCwgYTExLCBhMTIsIGExMyxcclxuICAgICAgICBhMjAsIGEyMSwgYTIyLCBhMjMsXHJcbiAgICAgICAgYTMwLCBhMzEsIGEzMiwgYTMzXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0clJvdGF0ZShhbmdsZSwgYXhpcykge1xyXG4gICAgbGV0XHJcbiAgICAgICAgYSA9IGFuZ2xlIC8gTWF0aC5QSSAqIDE4MC4wLFxyXG4gICAgICAgIHNpID0gTWF0aC5zaW4oYW5nbGUpLCBjbyA9IE1hdGguY29zKGFuZ2xlKSxcclxuICAgICAgICB2ID0gYXhpcy5ub3JtKCk7XHJcblxyXG4gICAgcmV0dXJuIG1hdDQoXHJcbiAgICAgICAgY28gKyB2LnggKiB2LnggKiAoMSAtIGNvKSxcclxuICAgICAgICB2LnggKiB2LnkgKiAoMSAtIGNvKSArIHYueiAqIHNpLFxyXG4gICAgICAgIHYueCAqIHYueiAqICgxIC0gY28pIC0gdi55ICogc2ksXHJcbiAgICAgICAgMCxcclxuICAgICAgICB2LnkgKiB2LnggKiAoMSAtIGNvKSAtIHYueiAqIHNpLFxyXG4gICAgICAgIGNvICsgdi55ICogdi55ICogKDEgLSBjbyksXHJcbiAgICAgICAgdi55ICogdi56ICogKDEgLSBjbykgKyB2LnggKiBzaSxcclxuICAgICAgICAwLFxyXG4gICAgICAgIHYueiAqIHYueCAqICgxIC0gY28pICsgdi55ICogc2ksXHJcbiAgICAgICAgdi56ICogdi55ICogKDEgLSBjbykgLSB2LnggKiBzaSxcclxuICAgICAgICBjbyArIHYueiAqIHYueiAqICgxIC0gY28pLFxyXG4gICAgICAgIDAsIDAsIDAsIDAsIDFcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXRyVHJhbnNsYXRlKHQpIHtcclxuICAgIHJldHVybiBtYXQ0KFxyXG4gICAgICAgIDEsIDAsIDAsIDAsXHJcbiAgICAgICAgMCwgMSwgMCwgMCxcclxuICAgICAgICAwLCAwLCAxLCAwLFxyXG4gICAgICAgIHQueCwgdC55LCB0LnosIDFcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXRyU2NhbGUocykge1xyXG4gICAgcmV0dXJuIG1hdDQoXHJcbiAgICAgICAgcy54LCAwLCAwLCAwLFxyXG4gICAgICAgIDAsIHMueSwgMCwgMCxcclxuICAgICAgICAwLCAwLCBzLnosIDAsXHJcbiAgICAgICAgMCwgMCwgMCwgMVxyXG4gICAgKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0ckZydXN0dW0obGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpIHtcclxuICAgIHJldHVybiBtYXQ0KFxyXG4gICAgICAgIDIgKiBuZWFyIC8gKHJpZ2h0IC0gbGVmdCksIDAsIDAsIDAsXHJcbiAgICAgICAgMCwgMiAqIG5lYXIgLyAodG9wIC0gYm90dG9tKSwgMCwgMCxcclxuICAgICAgICAocmlnaHQgKyBsZWZ0KSAvIChyaWdodCAtIGxlZnQpLCAodG9wICsgYm90dG9tKSAvICh0b3AgLSBib3R0b20pLCAtKGZhciArIG5lYXIpIC8gKGZhciAtIG5lYXIpLCAtMSxcclxuICAgICAgICAwLCAwLCAtMiAqIG5lYXIgKiBmYXIgLyAoZmFyIC0gbmVhciksIDBcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXRyVmlldyhsb2MsIGF0LCB1cDEpIHtcclxuICAgIGxldFxyXG4gICAgICAgIGRpciA9IGF0LnN1Yihsb2MpLm5vcm0oKSxcclxuICAgICAgICByaWdodCA9IGRpci5jcm9zcyh1cDEpLm5vcm0oKSxcclxuICAgICAgICB1cCA9IHJpZ2h0LmNyb3NzKGRpcikubm9ybSgpO1xyXG4gICAgcmV0dXJuIG1hdDQoXHJcbiAgICAgICAgcmlnaHQueCwgdXAueCwgLWRpci54LCAwLFxyXG4gICAgICAgIHJpZ2h0LnksIHVwLnksIC1kaXIueSwgMCxcclxuICAgICAgICByaWdodC56LCB1cC56LCAtZGlyLnosIDAsXHJcbiAgICAgICAgLWxvYy5kb3QocmlnaHQpLCAtbG9jLmRvdCh1cCksIGxvYy5kb3QoZGlyKSwgMVxyXG4gICAgKTtcclxufSIsImV4cG9ydCBjbGFzcyBTaGFkZXIge1xyXG4gICAgY29uc3RydWN0b3Iocm5kLCBuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5ybmQgPSBybmQ7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnByZyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5faW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIF9pbml0KCkge1xyXG4gICAgICAgIHRoaXMuc2hhZGVycyA9XHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLnJuZC5nbC5WRVJURVhfU0hBREVSLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmVydFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNyYzogXCJcIixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogdGhpcy5ybmQuZ2wuRlJBR01FTlRfU0hBREVSLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZnJhZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNyYzogXCJcIixcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICBmb3IgKGNvbnN0IHMgb2YgdGhpcy5zaGFkZXJzKSB7XHJcbiAgICAgICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBiaW4vc2hhZGVycy8ke3RoaXMubmFtZX0vJHtzLm5hbWV9Lmdsc2xgKTtcclxuICAgICAgICAgICAgbGV0IHNyYyA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzcmMgPT0gXCJzdHJpbmdcIiAmJiBzcmMgIT0gXCJcIilcclxuICAgICAgICAgICAgICAgIHMuc3JjID0gc3JjO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZWNvbXBpbGUgc2hhZGVyc1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyc1NvdXJjZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVNoYWRlcnNTb3VyY2UoKSB7XHJcbiAgICAgICAgdGhpcy5zaGFkZXJzWzBdLmlkID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNoYWRlcnNbMV0uaWQgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zaGFkZXJzWzBdLnNyYyA9PSBcIlwiIHx8IHRoaXMuc2hhZGVyc1sxXS5zcmMgPT0gXCJcIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuc2hhZGVycy5mb3JFYWNoKHMgPT4ge1xyXG4gICAgICAgICAgICBzLmlkID0gdGhpcy5ybmQuZ2wuY3JlYXRlU2hhZGVyKHMudHlwZSk7XHJcbiAgICAgICAgICAgIHRoaXMucm5kLmdsLnNoYWRlclNvdXJjZShzLmlkLCBzLnNyYyk7XHJcbiAgICAgICAgICAgIHRoaXMucm5kLmdsLmNvbXBpbGVTaGFkZXIocy5pZCk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5ybmQuZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHMuaWQsIHRoaXMucm5kLmdsLkNPTVBJTEVfU1RBVFVTKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1ZiA9IHRoaXMucm5kLmdsLmdldFNoYWRlckluZm9Mb2cocy5pZCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgU2hhZGVyICR7dGhpcy5uYW1lfS8ke3MubmFtZX0gY29tcGlsZSBmYWlsOiAke2J1Zn1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucHJnID0gdGhpcy5ybmQuZ2wuY3JlYXRlUHJvZ3JhbSgpO1xyXG4gICAgICAgIHRoaXMuc2hhZGVycy5mb3JFYWNoKHMgPT4ge1xyXG4gICAgICAgICAgICBpZiAocy5pZCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ybmQuZ2wuYXR0YWNoU2hhZGVyKHRoaXMucHJnLCBzLmlkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnJuZC5nbC5saW5rUHJvZ3JhbSh0aGlzLnByZyk7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJuZC5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMucHJnLCB0aGlzLnJuZC5nbC5MSU5LX1NUQVRVUykpIHtcclxuICAgICAgICAgICAgbGV0IGJ1ZiA9IHRoaXMucm5kLmdsLmdldFByb2dyYW1JbmZvTG9nKHRoaXMucHJnKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYFNoYWRlciBwcm9ncmFtICR7dGhpcy5uYW1lfSBsaW5rIGZhaWw6ICR7YnVmfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlckRhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTaGFkZXJEYXRhKCkge1xyXG4gICAgICAgIHRoaXMucG9zTG9jID0gdGhpcy5ybmQuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5wcmcsIFwiSW5Qb3NpdGlvblwiKTtcclxuICAgICAgICB0aGlzLm5vcm1Mb2MgPSB0aGlzLnJuZC5nbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnByZywgXCJJbk5vcm1hbFwiKTtcclxuXHJcbiAgICAgICAgLy8gU2hhZGVyIHVuaWZvcm1zXHJcbiAgICAgICAgdGhpcy51bmlmb3JtcyA9IHt9O1xyXG4gICAgICAgIGNvbnN0IGNvdW50VW5pZm9ybXMgPSB0aGlzLnJuZC5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMucHJnLCB0aGlzLnJuZC5nbC5BQ1RJVkVfVU5JRk9STVMpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnRVbmlmb3JtczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSB0aGlzLnJuZC5nbC5nZXRBY3RpdmVVbmlmb3JtKHRoaXMucHJnLCBpKTtcclxuICAgICAgICAgICAgdGhpcy51bmlmb3Jtc1tpbmZvLm5hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogaW5mby5uYW1lLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogaW5mby50eXBlLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogaW5mby5zaXplLFxyXG4gICAgICAgICAgICAgICAgbG9jOiB0aGlzLnJuZC5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcmcsIGluZm8ubmFtZSksXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTaGFkZXIgdW5pZm9ybSBibG9ja3NcclxuICAgICAgICB0aGlzLnVuaWZvcm1CbG9ja3MgPSB7fTtcclxuICAgICAgICBjb25zdCBjb3VudFVuaWZvcm1CbG9ja3MgPSB0aGlzLnJuZC5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMucHJnLCB0aGlzLnJuZC5nbC5BQ1RJVkVfVU5JRk9STV9CTE9DS1MpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnRVbmlmb3JtQmxvY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgYmxvY2tfbmFtZSA9IHRoaXMucm5kLmdsLmdldEFjdGl2ZVVuaWZvcm1CbG9ja05hbWUodGhpcy5wcmcsIGkpO1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMucm5kLmdsLmdldFVuaWZvcm1CbG9ja0luZGV4KHRoaXMucHJnLCBibG9ja19uYW1lKTtcclxuICAgICAgICAgICAgdGhpcy51bmlmb3JtQmxvY2tzW2Jsb2NrX25hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogYmxvY2tfbmFtZSxcclxuICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgICAgIHNpemU6IHRoaXMucm5kLmdsLmdldEFjdGl2ZVVuaWZvcm1CbG9ja1BhcmFtZXRlcih0aGlzLnByZywgaW5kZXgsIHRoaXMucm5kLmdsLlVOSUZPUk1fQkxPQ0tfREFUQV9TSVpFKSxcclxuICAgICAgICAgICAgICAgIGJpbmQ6IHRoaXMucm5kLmdsLmdldEFjdGl2ZVVuaWZvcm1CbG9ja1BhcmFtZXRlcih0aGlzLnByZywgaW5kZXgsIHRoaXMucm5kLmdsLlVOSUZPUk1fQkxPQ0tfQklORElORyksXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJuZC5tYXRyaXhVQk8uYXBwbHkodGhpcyk7XHJcbiAgICAgICAgdGhpcy5ybmQucHJpbVVCTy5hcHBseSh0aGlzKTtcclxuICAgICAgICB0aGlzLnJuZC50aW1lVUJPLmFwcGx5KHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByZyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm5kLmdsLnVzZVByb2dyYW0odGhpcy5wcmcpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU2hhZGVyIH0gZnJvbSBcIi4vc2hkLmpzXCJcclxuXHJcbmNsYXNzIF9idWZmZXIge1xyXG4gICAgY29uc3RydWN0b3Iocm5kLCB0eXBlLCBzaXplKSB7XHJcbiAgICAgICAgdGhpcy5ybmQgPSBybmQ7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTsgICAgLy8gQnVmZmVyIHR5cGUgKGdsLioqKl9CVUZGRVIpXHJcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTsgICAgLy8gQnVmZmVyIHNpemUgaW4gYnl0ZXNcclxuICAgICAgICB0aGlzLmlkID0gbnVsbDtcclxuICAgICAgICBpZiAoc2l6ZSA9PSAwIHx8IHR5cGUgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pZCA9IHJuZC5nbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgICAgICB0aGlzLnJuZC5nbC5iaW5kQnVmZmVyKHR5cGUsIHRoaXMuaWQpO1xyXG4gICAgICAgIHRoaXMucm5kLmdsLmJ1ZmZlckRhdGEodHlwZSwgc2l6ZSwgcm5kLmdsLlNUQVRJQ19EUkFXKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZGF0YSkge1xyXG4gICAgICAgIHRoaXMucm5kLmdsLmJpbmRCdWZmZXIodGhpcy50eXBlLCB0aGlzLmlkKTtcclxuICAgICAgICB0aGlzLnJuZC5nbC5idWZmZXJTdWJEYXRhKHRoaXMudHlwZSwgMCwgZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVbmlmb3JtQnVmZmVyIGV4dGVuZHMgX2J1ZmZlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihybmQsIG5hbWUsIHNpemUsIGJpbmRQb2ludCkge1xyXG4gICAgICAgIHN1cGVyKHJuZCwgcm5kLmdsLlVOSUZPUk1fQlVGRkVSLCBzaXplKTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuYmluZFBvaW50ID0gYmluZFBvaW50OyAvLyBCdWZmZXIgR1BVIGJpbmRpbmcgcG9pbnRcclxuICAgIH1cclxuXHJcbiAgICBhcHBseShzaGQpIHtcclxuICAgICAgICBpZiAodGhpcy5ybmQgPT0gdW5kZWZpbmVkIHx8IHNoZC5wcmcgPT0gdW5kZWZpbmVkIHx8IHNoZC51bmlmb3JtQmxvY2tzW3RoaXMubmFtZV0gPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgc2hkLnJuZC5nbC5iaW5kQnVmZmVyUmFuZ2UodGhpcy50eXBlLCBzaGQudW5pZm9ybUJsb2Nrc1t0aGlzLm5hbWVdLmluZGV4LCB0aGlzLmlkLCAwLCB0aGlzLnNpemUpO1xyXG4gICAgICAgIHNoZC5ybmQuZ2wudW5pZm9ybUJsb2NrQmluZGluZyhzaGQucHJnLCBzaGQudW5pZm9ybUJsb2Nrc1t0aGlzLm5hbWVdLmluZGV4LCB0aGlzLmJpbmRQb2ludCk7XHJcbiAgICAgICAgc2hkLnJuZC5nbC5iaW5kQnVmZmVyQmFzZShzaGQucm5kLmdsLlVOSUZPUk1fQlVGRkVSLCB0aGlzLmJpbmRQb2ludCwgdGhpcy5pZCk7XHJcbiAgICB9XHJcbn0iLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vIFRpbWVyIGNsYXNzIG1vZHVsZVxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgY2xhc3MgVGltZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7ICAgICAgICBcclxuICAgICAgICB0aGlzLmdsb2JhbFRpbWUgPSB0aGlzLmxvY2FsVGltZSA9IHRoaXMuZ2V0VGltZSgpO1xyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGVsdGFUaW1lID0gdGhpcy5sb2NhbERlbHRhVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSB0aGlzLm9sZFRpbWUgPSB0aGlzLm9sZFRpbWVGUFMgPSB0aGlzLmdsb2JhbFRpbWU7XHJcbiAgICAgICAgdGhpcy5mcmFtZUNvdW50ZXIgPSAwO1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuRlBTID0gMzAuMDtcclxuICAgICAgICB0aGlzLnBhdXNlVGltZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2V0IGN1cnJlbnQgZ2xvYmFsIHRpbWUgZnVudGlvblxyXG4gICAgZ2V0VGltZSgpIHtcclxuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICBsZXQgdCA9XHJcbiAgICAgICAgICAgIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLyAxMDAwLjAgK1xyXG4gICAgICAgICAgICBkYXRlLmdldFNlY29uZHMoKSArXHJcbiAgICAgICAgICAgIGRhdGUuZ2V0TWludXRlcygpICogNjA7XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEdldCBjdXJyZW50IEZQUyBmdW5jdGlvblxyXG4gICAgZ2V0RlBTKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkZQUy50b0ZpeGVkKDMpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhdXNlRW5iYWxlKCkge1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcGF1c2VEaXNhYmxlKCkge1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHBhdXNlU3dpdGNoKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUGF1c2UgPT0gZmFsc2UpXHJcbiAgICAgICAgICAgIHRoaXMuaXNQYXVzZSA9IHRydWU7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLmlzUGF1c2UgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXBvbnNlIHRpbWVyIGZ1bmN0aW9uXHJcbiAgICByZXNwb25zZSh0YWdfaWQgPSBudWxsKSB7XHJcbiAgICAgICAgbGV0IHQgPSB0aGlzLmdldFRpbWUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5nbG9iYWxUaW1lID0gdDtcclxuICAgICAgICB0aGlzLmdsb2JhbERlbHRhVGltZSA9IHQgLSB0aGlzLm9sZFRpbWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzUGF1c2UpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2NhbERlbHRhVGltZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMucGF1c2VUaW1lICs9IHQgLSB0aGlzLm9sZFRpbWU7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sb2NhbERlbHRhVGltZSA9IHRoaXMuZ2xvYmFsRGVsdGFUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLmxvY2FsVGltZSA9IHQgLSB0aGlzLnBhdXNlVGltZSAtIHRoaXMuc3RhcnRUaW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5mcmFtZUNvdW50ZXIrKztcclxuICAgICAgICBpZiAodCAtIHRoaXMub2xkVGltZUZQUyA+IDMpIHtcclxuICAgICAgICAgICAgdGhpcy5GUFMgPSB0aGlzLmZyYW1lQ291bnRlciAvICh0IC0gdGhpcy5vbGRUaW1lRlBTKTtcclxuICAgICAgICAgICAgdGhpcy5vbGRUaW1lRlBTID0gdDtcclxuICAgICAgICAgICAgdGhpcy5mcmFtZUNvdW50ZXIgPSAwO1xyXG4gICAgICAgICAgICBpZiAodGFnX2lkICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YWdfaWQpLmlubmVySFRNTCA9IHRoaXMuZ2V0RlBTKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9sZFRpbWUgPSB0O1xyXG4gICAgfTtcclxufSIsImltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vbXRoL3ZlYzMuanNcIlxyXG5pbXBvcnQgeyBtYXQ0LCBtYXRyRnJ1c3R1bSwgbWF0clZpZXcgfSBmcm9tIFwiLi4vbXRoL21hdDQuanNcIlxyXG5pbXBvcnQgeyBVbmlmb3JtQnVmZmVyIH0gZnJvbSBcIi4vcmVzL2J1Zi5qc1wiXHJcbmltcG9ydCB7IFRpbWVyIH0gZnJvbSBcIi4uL3RpbWVyL3RpbWVyLmpzXCJcclxuXHJcbmV4cG9ydCBjbGFzcyBSZW5kZXIge1xyXG5cclxuICAgIHNldEZydXN0dW0oKSB7XHJcbiAgICAgICAgbGV0IG0gPSBtYXQ0KDEpO1xyXG4gICAgICAgIGxldCByeCA9IHRoaXMucHJvalNpemUsIHJ5ID0gdGhpcy5wcm9qU2l6ZTtcclxuXHJcbiAgICAgICAgLyogQ29ycmVjdCBhc3BlY3QgcmF0aW8gKi9cclxuICAgICAgICBpZiAodGhpcy53aWR0aCA+PSB0aGlzLmhlaWdodClcclxuICAgICAgICAgICAgcnggKj0gdGhpcy53aWR0aCAvIHRoaXMuaGVpZ2h0O1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcnkgKj0gdGhpcy5oZWlnaHQgLyB0aGlzLndpZHRoO1xyXG5cclxuICAgICAgICB0aGlzLm1hdHJQcm9qID0gbWF0ckZydXN0dW0oLXJ4IC8gMiwgcnggLyAyLCAtcnkgLyAyLCByeSAvIDIsIHRoaXMucHJvakRpc3QsIHRoaXMuZmFyQ2xpcCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q2FtKGxvYywgYXQsIHVwKSB7XHJcbiAgICAgICAgdGhpcy5tYXRyVmlldyA9IG1hdHJWaWV3KGxvYywgYXQsIHVwKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVNYXRyaXhlcygpIHtcclxuICAgICAgICB0aGlzLm1hdHJpeFVCTy51cGRhdGUobmV3IEZsb2F0MzJBcnJheSh0aGlzLm1hdHJQcm9qLmxpbmVhcml6ZSgpLmNvbmNhdCh0aGlzLm1hdHJWaWV3LmxpbmVhcml6ZSgpKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMudGltZXIucmVzcG9uc2UoKTtcclxuICAgICAgICB0aGlzLnRpbWVVQk8udXBkYXRlKG5ldyBGbG9hdDMyQXJyYXkoW3RoaXMudGltZXIubG9jYWxUaW1lLCB0aGlzLnRpbWVyLmxvY2FsRGVsdGFUaW1lLCB0aGlzLnRpbWVyLmdsb2JhbFRpbWUsIHRoaXMudGltZXIuZ2xvYmFsRGVsdGFUaW1lXSkpO1xyXG5cclxuICAgICAgICB0aGlzLmdsLmNsZWFyKHRoaXMuZ2wuQ09MT1JfQlVGRkVSX0JJVCk7XHJcbiAgICAgICAgdGhpcy5nbC5jbGVhcih0aGlzLmdsLkRFUFRIX0JVRkZFUl9CSVQpO1xyXG4gICAgfSAvLyBFbmQgb2YgJ3JlbmRlcicgZnVuY3Rpb25cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMpIHtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuXHJcbiAgICAgICAgdGhpcy5wcm9qU2l6ZSA9IDAuMTtcclxuICAgICAgICB0aGlzLnByb2pEaXN0ID0gMC4xO1xyXG4gICAgICAgIHRoaXMuZmFyQ2xpcCA9IDMwMDtcclxuXHJcbiAgICAgICAgbGV0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHJlY3QucmlnaHQgLSByZWN0LmxlZnQgKyAxO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gcmVjdC5ib3R0b20gLSByZWN0LnRvcCArIDE7XHJcblxyXG4gICAgICAgIHRoaXMuZ2wgPSBjYW52YXMuZ2V0Q29udGV4dChcIndlYmdsMlwiKTtcclxuICAgICAgICB0aGlzLmdsLmNsZWFyQ29sb3IoMC45LCAwLjksIDAuOSwgMSk7XHJcbiAgICAgICAgdGhpcy5nbC5lbmFibGUodGhpcy5nbC5ERVBUSF9URVNUKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRGcnVzdHVtKCk7XHJcbiAgICAgICAgdGhpcy5zZXRDYW0odmVjMygwLCAwLCAwKSwgdmVjMygwLCAwLCAtMSksIHZlYzMoMCwgMSwgMCkpO1xyXG4gICAgICAgIHRoaXMubWF0cml4VUJPID0gbmV3IFVuaWZvcm1CdWZmZXIodGhpcywgXCJ1X2NhbWVyYVwiLCAxNiAqIDQgKiAyLCAwKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1hdHJpeGVzKCk7XHJcblxyXG4gICAgICAgIHRoaXMucHJpbVVCTyA9IG5ldyBVbmlmb3JtQnVmZmVyKHRoaXMsIFwidV9wcmltaXRpdmVcIiwgMTYgKiA0LCAxKTtcclxuXHJcbiAgICAgICAgdGhpcy50aW1lciA9IG5ldyBUaW1lcigpO1xyXG4gICAgICAgIHRoaXMudGltZVVCTyA9IG5ldyBVbmlmb3JtQnVmZmVyKHRoaXMsIFwidV90aW1lXCIsIDE2LCAyKTtcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgUmVuZGVyIH0gZnJvbSBcIi4uL3JuZC5qc1wiXHJcbmltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vLi4vbXRoL3ZlYzMuanNcIlxyXG5pbXBvcnQgeyBtYXQ0LCBtYXRyRnJ1c3R1bSB9IGZyb20gXCIuLi8uLi9tdGgvbWF0NC5qc1wiXHJcbmltcG9ydCB7IFNoYWRlciB9IGZyb20gXCIuLi9yZXMvc2hkLmpzXCJcclxuXHJcbmNsYXNzIF92ZXJ0ZXgge1xyXG4gICAgY29uc3RydWN0b3IocG9zLCBub3JtKSB7XHJcbiAgICAgICAgdGhpcy5wb3MgPSBwb3M7XHJcbiAgICAgICAgdGhpcy5ub3JtID0gbm9ybTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZlcnRleChwb3MsIG5vcm0pIHtcclxuICAgIHJldHVybiBuZXcgX3ZlcnRleChwb3MsIG5vcm0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXV0b05vcm1hbHModmVydGV4ZXMsIGluZGljaWVzKSB7XHJcbiAgICBsZXQgaTtcclxuXHJcbiAgICAvKiBTZXQgYWxsIHZlcnRleCBub3JtYWxzIHRvIHplcm8gKi9cclxuICAgIGZvciAoaSA9IDA7IGkgPCB2ZXJ0ZXhlcy5sZW5ndGg7IGkrKylcclxuICAgICAgICB2ZXJ0ZXhlc1tpXS5ub3JtID0gdmVjMygwKTtcclxuXHJcbiAgICAvKiBFdmFsIG5vcm1hbCBmb3IgZXZlcnkgZmFjZXQgKi9cclxuICAgIGZvciAoaSA9IDA7IGkgPCBpbmRpY2llcy5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICAgIGxldFxyXG4gICAgICAgICAgICBuMCA9IGluZGljaWVzW2ldLCBuMSA9IGluZGljaWVzW2kgKyAxXSwgbjIgPSBpbmRpY2llc1tpICsgMl07XHJcbiAgICAgICAgbGV0XHJcbiAgICAgICAgICAgIHAwID0gdmVydGV4ZXNbbjBdLnBvcyxcclxuICAgICAgICAgICAgcDEgPSB2ZXJ0ZXhlc1tuMV0ucG9zLFxyXG4gICAgICAgICAgICBwMiA9IHZlcnRleGVzW24yXS5wb3MsXHJcbiAgICAgICAgICAgIE4gPSBwMS5zdWIocDApLmNyb3NzKHAyLnN1YihwMCkpLm5vcm0oKTtcclxuXHJcbiAgICAgICAgdmVydGV4ZXNbbjBdLm5vcm0gPSB2ZXJ0ZXhlc1tuMF0ubm9ybS5hZGQoTik7XHJcbiAgICAgICAgdmVydGV4ZXNbbjFdLm5vcm0gPSB2ZXJ0ZXhlc1tuMV0ubm9ybS5hZGQoTik7XHJcbiAgICAgICAgdmVydGV4ZXNbbjJdLm5vcm0gPSB2ZXJ0ZXhlc1tuMl0ubm9ybS5hZGQoTik7XHJcbiAgICB9XHJcblxyXG4gICAgLyogTm9ybWFsaXplIGFsbCB2ZXJ0ZXggbm9ybWFscyAqL1xyXG4gICAgZm9yIChpID0gMDsgaSA8IHZlcnRleGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmVydGV4ZXNbaV0ubm9ybSA9IHZlcnRleGVzW2ldLm5vcm0ubm9ybSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUHJpbSB7XHJcbiAgICBjcmVhdGUoc2hkLCB2ZXJ0ZXhlcywgaW5kaWNpZXMpIHtcclxuICAgICAgICBsZXQgdHJpbWFzaCA9IFtdLCBpID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcyA9IHZlcnRleGVzO1xyXG4gICAgICAgIHRoaXMuaW5kaWNpZXMgPSBpbmRpY2llcztcclxuICAgICAgICB0aGlzLnNoZCA9IHNoZDtcclxuICAgICAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnNoZC5wcmcgIT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBhdXRvTm9ybWFscyh2ZXJ0ZXhlcywgaW5kaWNpZXMpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCB2IG9mIHZlcnRleGVzKSB7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYucG9zLng7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYucG9zLnk7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYucG9zLno7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYubm9ybS54O1xyXG4gICAgICAgICAgICB0cmltYXNoW2krK10gPSB2Lm5vcm0ueTtcclxuICAgICAgICAgICAgdHJpbWFzaFtpKytdID0gdi5ub3JtLno7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZlcnRleEFycmF5SWQgPSBzaGQucm5kLmdsLmNyZWF0ZVZlcnRleEFycmF5KCk7XHJcbiAgICAgICAgc2hkLnJuZC5nbC5iaW5kVmVydGV4QXJyYXkodGhpcy52ZXJ0ZXhBcnJheUlkKTtcclxuICAgICAgICB0aGlzLnZlcnRleEJ1ZmZlcklkID0gc2hkLnJuZC5nbC5jcmVhdGVCdWZmZXIoKTtcclxuXHJcbiAgICAgICAgc2hkLnJuZC5nbC5iaW5kQnVmZmVyKHNoZC5ybmQuZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnZlcnRleEJ1ZmZlcklkKTtcclxuICAgICAgICBzaGQucm5kLmdsLmJ1ZmZlckRhdGEoc2hkLnJuZC5nbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodHJpbWFzaCksIHNoZC5ybmQuZ2wuU1RBVElDX0RSQVcpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wb3NMb2MgIT0gLTEgJiYgdGhpcy5ub3JtTG9jICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHNoZC5ybmQuZ2wudmVydGV4QXR0cmliUG9pbnRlcihzaGQucG9zTG9jLCAzLCBzaGQucm5kLmdsLkZMT0FULCBmYWxzZSwgMjQsIDApO1xyXG4gICAgICAgICAgICBzaGQucm5kLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHNoZC5wb3NMb2MpO1xyXG4gICAgICAgICAgICBzaGQucm5kLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIoc2hkLm5vcm1Mb2MsIDMsIHNoZC5ybmQuZ2wuRkxPQVQsIGZhbHNlLCAyNCwgMTIpO1xyXG4gICAgICAgICAgICBzaGQucm5kLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHNoZC5ub3JtTG9jKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuSW5kZXhCdWZmZXJJZCA9IHNoZC5ybmQuZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICAgICAgc2hkLnJuZC5nbC5iaW5kQnVmZmVyKHNoZC5ybmQuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuSW5kZXhCdWZmZXJJZCk7XHJcbiAgICAgICAgc2hkLnJuZC5nbC5idWZmZXJEYXRhKHNoZC5ybmQuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG5ldyBVaW50MzJBcnJheShpbmRpY2llcyksIHNoZC5ybmQuZ2wuU1RBVElDX0RSQVcpO1xyXG5cclxuICAgICAgICB0aGlzLm51bU9mRWxlbWVudHMgPSBpbmRpY2llcy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IobXRsLCB2ZXJ0ZXhlcywgaW5kaWNpZXMpIHtcclxuICAgICAgICB0aGlzLm10bCA9IG10bDtcclxuICAgICAgICB0aGlzLmNyZWF0ZShtdGwuc2hkLCB2ZXJ0ZXhlcywgaW5kaWNpZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih3b3JsZCkge1xyXG5cclxuICAgICAgICAvLyBSZWNyZWF0aW5nIHByaW1pdGl2ZSBpZiBpdCB3YXNuJ3QgY3JlYXRlZFxyXG4gICAgICAgIC8vIChiZWNhdXNlIG9mIHNoYWRlciBhc3luYyBpbml0aWFsaXphdGlvbilcclxuICAgICAgICBpZiAodGhpcy5zaGQucHJnICE9IG51bGwgJiYgdGhpcy5sb2FkZWQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGUodGhpcy5zaGQsIHRoaXMudmVydGV4ZXMsIHRoaXMuaW5kaWNpZXMpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEcmF3aW5nIHByaW1pdGl2ZSBpZiBzaGFkZXIgaXMgbG9hZGVkXHJcbiAgICAgICAgaWYgKHRoaXMubXRsLmFwcGx5KCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGQucm5kLnByaW1VQk8udXBkYXRlKG5ldyBGbG9hdDMyQXJyYXkod29ybGQubGluZWFyaXplKCkpKTtcclxuICAgICAgICAgICAgdGhpcy5zaGQucm5kLmdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLnZlcnRleEFycmF5SWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNoZC5ybmQuZ2wuYmluZEJ1ZmZlcih0aGlzLnNoZC5ybmQuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuSW5kZXhCdWZmZXJJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hkLnJuZC5nbC5kcmF3RWxlbWVudHModGhpcy5zaGQucm5kLmdsLlRSSUFOR0xFUywgdGhpcy5udW1PZkVsZW1lbnRzLCB0aGlzLnNoZC5ybmQuZ2wuVU5TSUdORURfSU5ULCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgUHJpbSwgdmVydGV4IH0gZnJvbSBcIi4uL3JuZC9yZXMvcHJpbS5qc1wiO1xyXG5pbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4uL210aC92ZWMzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRmlndXJlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMudmVydGV4ZXMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDdWJlKCkge1xyXG4gICAgICAgIHRoaXMudmVydGV4ZXMgPSBbXHJcbiAgICAgICAgICAgIFt2ZWMzKC0wLjUsIC0wLjUsIC0wLjUpLCB2ZWMzKC0wLjUsIDAuNSwgLTAuNSksIHZlYzMoMC41LCAwLjUsIC0wLjUpLCB2ZWMzKDAuNSwgLTAuNSwgLTAuNSldLCAgLy8gZnJvbnRcclxuICAgICAgICAgICAgW3ZlYzMoLTAuNSwgLTAuNSwgMC41KSwgdmVjMygtMC41LCAwLjUsIDAuNSksIHZlYzMoMC41LCAwLjUsIDAuNSksIHZlYzMoMC41LCAtMC41LCAwLjUpXSwgICAgICAvLyBiYWNrXHJcbiAgICAgICAgICAgIFt2ZWMzKC0wLjUsIC0wLjUsIC0wLjUpLCB2ZWMzKC0wLjUsIC0wLjUsIDAuNSksIHZlYzMoLTAuNSwgMC41LCAwLjUpLCB2ZWMzKC0wLjUsIDAuNSwgLTAuNSldLCAgLy8gbGVmdFxyXG4gICAgICAgICAgICBbdmVjMygwLjUsIC0wLjUsIC0wLjUpLCB2ZWMzKDAuNSwgLTAuNSwgMC41KSwgdmVjMygwLjUsIDAuNSwgMC41KSwgdmVjMygwLjUsIDAuNSwgLTAuNSldLCAgICAgIC8vIHJpZ2h0XHJcbiAgICAgICAgICAgIFt2ZWMzKC0wLjUsIC0wLjUsIC0wLjUpLCB2ZWMzKC0wLjUsIC0wLjUsIDAuNSksIHZlYzMoMC41LCAtMC41LCAwLjUpLCB2ZWMzKDAuNSwgLTAuNSwgLTAuNSldLCAgLy8gYm90dG9tXHJcbiAgICAgICAgICAgIFt2ZWMzKC0wLjUsIDAuNSwgLTAuNSksIHZlYzMoLTAuNSwgMC41LCAwLjUpLCB2ZWMzKDAuNSwgMC41LCAwLjUpLCB2ZWMzKDAuNSwgMC41LCAtMC41KV0sICAgICAgLy8gdG9wXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5cclxuICAgIHNldFRldHJhaGVkcm9uKCkge1xyXG4gICAgICAgIGxldCBzcXJ0MyA9IE1hdGguc3FydCgzLjApLCBzcXJ0MiA9IE1hdGguc3FydCgyLjApO1xyXG5cclxuICAgICAgICBsZXRcclxuICAgICAgICAgICAgdG9wID0gdmVjMygwLCBzcXJ0MiAvIHNxcnQzLCAwKSxcclxuICAgICAgICAgICAgZnJvbnQgPSB2ZWMzKDAsIDAsIHNxcnQzIC8gMy4wKSxcclxuICAgICAgICAgICAgbGVmdCA9IHZlYzMoLTAuNSwgMCwgLXNxcnQzIC8gNi4wKSxcclxuICAgICAgICAgICAgcmlnaHQgPSB2ZWMzKDAuNSwgMCwgLXNxcnQzIC8gNi4wKTtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcyA9IFtcclxuICAgICAgICAgICAgW2xlZnQsIGZyb250LCB0b3BdLCAvLyBib3RcclxuICAgICAgICAgICAgW2xlZnQsIHJpZ2h0LCB0b3BdLFxyXG4gICAgICAgICAgICBbcmlnaHQsIGZyb250LCB0b3BdLFxyXG4gICAgICAgICAgICBbZnJvbnQsIHJpZ2h0LCBsZWZ0XVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0T2N0YWhlZHJvbigpIHtcclxuICAgICAgICBsZXQgc3FydDMgPSBNYXRoLnNxcnQoMy4wKSwgc3FydDIgPSBNYXRoLnNxcnQoMi4wKTtcclxuXHJcbiAgICAgICAgbGV0XHJcbiAgICAgICAgICAgIHRvcCA9IHZlYzMoMCwgMSAvIHNxcnQyLCAwKSxcclxuICAgICAgICAgICAgYm90ID0gdG9wLm11bCgtMSksXHJcbiAgICAgICAgICAgIGxmID0gdmVjMygtMC41LCAwLCAwLjUpLFxyXG4gICAgICAgICAgICBsYiA9IHZlYzMoLTAuNSwgMCwgLTAuNSksXHJcbiAgICAgICAgICAgIHJmID0gdmVjMygwLjUsIDAsIDAuNSksXHJcbiAgICAgICAgICAgIHJiID0gdmVjMygwLjUsIDAsIC0wLjUpO1xyXG5cclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gW1xyXG4gICAgICAgICAgICBbYm90LCBsZiwgcmZdLFxyXG4gICAgICAgICAgICBbYm90LCBsZiwgbGJdLFxyXG4gICAgICAgICAgICBbYm90LCBsYiwgcmJdLFxyXG4gICAgICAgICAgICBbYm90LCByZiwgcmJdLFxyXG4gICAgICAgICAgICBbdG9wLCBsZiwgcmZdLFxyXG4gICAgICAgICAgICBbdG9wLCBsZiwgbGJdLFxyXG4gICAgICAgICAgICBbdG9wLCBsYiwgcmJdLFxyXG4gICAgICAgICAgICBbdG9wLCByZiwgcmJdLFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SWNvaGVkcm9uKCkge1xyXG5cclxuICAgICAgICBsZXQgbGF5ZXIxID0gW107XHJcbiAgICAgICAgbGV0IGxheWVyMiA9IFtdO1xyXG5cclxuICAgICAgICBsZXQgciA9IDAuNSAvIE1hdGguc2luKDM2IC8gMTgwICogTWF0aC5QSSk7XHJcbiAgICAgICAgbGV0IGQgPSBNYXRoLnNxcnQoMSAtIE1hdGgucG93KDIgKiBNYXRoLnNpbigwLjEgKiBNYXRoLlBJKSAqIHIsIDIpKVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM2MDsgaSArPSA3Mikge1xyXG4gICAgICAgICAgICBsZXQgYW5nbGUgPSBpIC8gMTgwLjAgKiBNYXRoLlBJO1xyXG4gICAgICAgICAgICBsZXQgcCA9IHZlYzMociAqIE1hdGguc2luKGFuZ2xlKSwgciAqIE1hdGguY29zKGFuZ2xlKSwgLWQgLyAyKTtcclxuXHJcbiAgICAgICAgICAgIGxheWVyMS5wdXNoKHApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzNjA7IGkgKz0gNzIpIHtcclxuICAgICAgICAgICAgbGV0IGFuZ2xlID0gKGkgKyAzNikgLyAxODAuMCAqIE1hdGguUEk7XHJcbiAgICAgICAgICAgIGxldCBwID0gdmVjMyhyICogTWF0aC5zaW4oYW5nbGUpLCByICogTWF0aC5jb3MoYW5nbGUpLCBkIC8gMik7XHJcblxyXG4gICAgICAgICAgICBsYXllcjIucHVzaChwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldFxyXG4gICAgICAgICAgICB0b3AgPSB2ZWMzKDAsIDAsIHIpLFxyXG4gICAgICAgICAgICBib3QgPSB0b3AubXVsKC0xKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRyaTEgPVxyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyMVtpXSxcclxuICAgICAgICAgICAgICAgICAgICBsYXllcjJbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIyWyhpICsgNCkgJSA1XVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2godHJpMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0cmkyID1cclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBsYXllcjJbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIxW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyMVsoaSArIDEpICUgNV1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKHRyaTIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNhcDEgPVxyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIGJvdCwgbGF5ZXIxW2ldLCBsYXllcjFbKGkgKyAxKSAlIDVdXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2goY2FwMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjYXAyID1cclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICB0b3AsIGxheWVyMltpXSwgbGF5ZXIyWyhpICsgMSkgJSA1XVxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKGNhcDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2V0RG9kZWNhaGVkcm9uKCkge1xyXG4gICAgICAgIGxldCByID0gTWF0aC5zcXJ0KDUwICsgMTAgKiBNYXRoLnNxcnQoNSkpIC8gMTA7XHJcbiAgICAgICAgbGV0IFIgPSAwLjI1ICogKDEgKyBNYXRoLnNxcnQoNSkpICogTWF0aC5zcXJ0KDMpO1xyXG4gICAgICAgIGxldCByMCA9IHIgKiAyICogTWF0aC5jb3MoKDM2IC8gMTgwICogTWF0aC5QSSkpO1xyXG5cclxuICAgICAgICBsZXQgZWRnZTEgPSBbXTtcclxuICAgICAgICBsZXQgZWRnZTIgPSBbXTtcclxuICAgICAgICBsZXQgbGF5ZXIxID0gW107XHJcbiAgICAgICAgbGV0IGxheWVyMiA9IFtdO1xyXG5cclxuICAgICAgICBsZXQgZCA9IE1hdGguc3FydChSICogUiAtIHIgKiByKTtcclxuICAgICAgICBsZXQgZDAgPSBNYXRoLnNxcnQoUiAqIFIgLSByMCAqIHIwKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzNjA7IGkgKz0gNzIpIHtcclxuICAgICAgICAgICAgbGV0XHJcbiAgICAgICAgICAgICAgICBhMSA9IGkgLyAxODAgKiBNYXRoLlBJLFxyXG4gICAgICAgICAgICAgICAgYTIgPSAoaSArIDM2KSAvIDE4MCAqIE1hdGguUEk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcDEgPSB2ZWMzKHIgKiBNYXRoLnNpbihhMSksIHIgKiBNYXRoLmNvcyhhMSksIGQpO1xyXG4gICAgICAgICAgICBsZXQgcDIgPSB2ZWMzKHIgKiBNYXRoLnNpbihhMiksIHIgKiBNYXRoLmNvcyhhMiksIC1kKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBsMSA9IHZlYzMocjAgKiBNYXRoLnNpbihhMSksIHIwICogTWF0aC5jb3MoYTEpLCBkMCk7XHJcbiAgICAgICAgICAgIGxldCBsMiA9IHZlYzMocjAgKiBNYXRoLnNpbihhMiksIHIwICogTWF0aC5jb3MoYTIpLCAtZDApO1xyXG5cclxuICAgICAgICAgICAgZWRnZTEucHVzaChwMSk7XHJcbiAgICAgICAgICAgIGVkZ2UyLnB1c2gocDIpO1xyXG5cclxuICAgICAgICAgICAgbGF5ZXIxLnB1c2gobDEpO1xyXG4gICAgICAgICAgICBsYXllcjIucHVzaChsMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2goZWRnZTEpO1xyXG4gICAgICAgIHRoaXMudmVydGV4ZXMucHVzaChlZGdlMik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzdXJmYWNlMSA9IFtcclxuICAgICAgICAgICAgICAgIGVkZ2UxW2ldLFxyXG4gICAgICAgICAgICAgICAgbGF5ZXIxW2ldLFxyXG4gICAgICAgICAgICAgICAgbGF5ZXIyW2ldLFxyXG4gICAgICAgICAgICAgICAgbGF5ZXIxWyhpICsgMSkgJSA1XSxcclxuICAgICAgICAgICAgICAgIGVkZ2UxWyhpICsgMSkgJSA1XVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIGxldCBzdXJmYWNlMiA9IFtcclxuICAgICAgICAgICAgICAgIGVkZ2UyW2ldLFxyXG4gICAgICAgICAgICAgICAgbGF5ZXIyW2ldLFxyXG4gICAgICAgICAgICAgICAgbGF5ZXIxW2ldLFxyXG4gICAgICAgICAgICAgICAgbGF5ZXIyWyhpICsgNCkgJSA1XSxcclxuICAgICAgICAgICAgICAgIGVkZ2UyWyhpICsgNCkgJSA1XVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIHRoaXMudmVydGV4ZXMucHVzaChzdXJmYWNlMSk7XHJcbiAgICAgICAgICAgIHRoaXMudmVydGV4ZXMucHVzaChzdXJmYWNlMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy52ZXJ0ZXhlcyA9IFtlZGdlMSwgbGF5ZXIxLCBsYXllcjIsIGVkZ2UyXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTdGFyKCkge1xyXG4gICAgICAgIHRoaXMudmVydGV4ZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnNldERvZGVjYWhlZHJvbigpO1xyXG5cclxuICAgICAgICBsZXQgdmVydHMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZlcnRleGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwID0gdmVjMygwKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHYgb2YgdGhpcy52ZXJ0ZXhlc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgcCA9IHAuYWRkKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHAgPSBwLmRpdig1KTtcclxuICAgICAgICAgICAgcCA9IHAubXVsKDMpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRyaXMgPVxyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnZlcnRleGVzW2ldWzBdLCB0aGlzLnZlcnRleGVzW2ldWzFdLCBwXSxcclxuICAgICAgICAgICAgICAgICAgICBbdGhpcy52ZXJ0ZXhlc1tpXVsxXSwgdGhpcy52ZXJ0ZXhlc1tpXVsyXSwgcF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMudmVydGV4ZXNbaV1bMl0sIHRoaXMudmVydGV4ZXNbaV1bM10sIHBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnZlcnRleGVzW2ldWzNdLCB0aGlzLnZlcnRleGVzW2ldWzRdLCBwXSxcclxuICAgICAgICAgICAgICAgICAgICBbdGhpcy52ZXJ0ZXhlc1tpXVs0XSwgdGhpcy52ZXJ0ZXhlc1tpXVswXSwgcF0sXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKylcclxuICAgICAgICAgICAgICAgIHZlcnRzLnB1c2godHJpc1tpXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gdmVydHM7XHJcbiAgICB9XHJcblxyXG4gICAgbWFrZVByaW0obXRsKSB7XHJcbiAgICAgICAgbGV0IGluZGljaWVzID0gW107XHJcbiAgICAgICAgbGV0IHZlcnRleGVzID0gW107XHJcbiAgICAgICAgbGV0IGogPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBlZGdlIG9mIHRoaXMudmVydGV4ZXMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgdiBvZiBlZGdlKSB7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0ZXhlcy5wdXNoKHZlcnRleCh2LCB2ZWMzKDApKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAyOyBpIDwgZWRnZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaW5kaWNpZXMucHVzaChqICsgMCk7XHJcbiAgICAgICAgICAgICAgICBpbmRpY2llcy5wdXNoKGogKyBpIC0gMSk7XHJcbiAgICAgICAgICAgICAgICBpbmRpY2llcy5wdXNoKGogKyBpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBqICs9IGVkZ2UubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcmltKG10bCwgdmVydGV4ZXMsIGluZGljaWVzKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vLi4vbXRoL3ZlYzMuanNcIlxyXG5pbXBvcnQgeyBVbmlmb3JtQnVmZmVyIH0gZnJvbSBcIi4vYnVmLmpzXCJcclxuXHJcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzaGQsIEthLCBLZCwgS3MsIFBoKSB7XHJcbiAgICAgICAgdGhpcy5zaGQgPSBzaGQ7XHJcbiAgICAgICAgdGhpcy5LYSA9IEthO1xyXG4gICAgICAgIHRoaXMuS2QgPSBLZDtcclxuICAgICAgICB0aGlzLktzID0gS3M7XHJcbiAgICAgICAgdGhpcy5QaCA9IFBoO1xyXG5cclxuICAgICAgICB0aGlzLlVCTyA9IG5ldyBVbmlmb3JtQnVmZmVyKHRoaXMuc2hkLnJuZCwgXCJ1X21hdGVyaWFsXCIsIDE2ICogMywgMyk7XHJcbiAgICAgICAgLy90aGlzLlVCTy51cGRhdGUobmV3IEZsb2F0MzJBcnJheShbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0pKTtcclxuICAgICAgICB0aGlzLlVCTy51cGRhdGUobmV3IEZsb2F0MzJBcnJheSh0aGlzLkthLmxpbmVhcml6ZSgpLmNvbmNhdChbMF0sIHRoaXMuS2QubGluZWFyaXplKCksIFswXSwgdGhpcy5Lcy5saW5lYXJpemUoKSwgW1BoXSkpKTtcclxuICAgIH1cclxuICAgIGFwcGx5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNoZC5hcHBseSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVUJPLmFwcGx5KHRoaXMuc2hkKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufTtcclxuXHJcbiIsImltcG9ydCB7IFJlbmRlciB9IGZyb20gXCIuL3JuZC9ybmQuanNcIlxyXG5pbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4vbXRoL3ZlYzMuanNcIlxyXG5pbXBvcnQgeyBtYXQ0LCBtYXRyUm90YXRlLCBtYXRyVHJhbnNsYXRlLCBtYXRyU2NhbGUgfSBmcm9tIFwiLi9tdGgvbWF0NC5qc1wiXHJcbmltcG9ydCB7IFByaW0sIHZlcnRleCB9IGZyb20gXCIuL3JuZC9yZXMvcHJpbS5qc1wiXHJcbmltcG9ydCB7IEZpZ3VyZSB9IGZyb20gXCIuL3BsYXQvcGxhdC5qc1wiXHJcbmltcG9ydCB7IFNoYWRlciB9IGZyb20gXCIuL3JuZC9yZXMvc2hkLmpzXCJcclxuaW1wb3J0IHsgVGltZXIgfSBmcm9tIFwiLi90aW1lci90aW1lci5qc1wiXHJcbmltcG9ydCB7IFVuaWZvcm1CdWZmZXIgfSBmcm9tIFwiLi9ybmQvcmVzL2J1Zi5qc1wiXHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcIi4vcm5kL3Jlcy9tdGwuanNcIlxyXG5cclxuY29uc29sZS5sb2coXCJNQUlOIExPQURFRFwiKTtcclxuXHJcbmxldCBybmQxO1xyXG5cclxuZnVuY3Rpb24gdHBMb2codGV4dCkge1xyXG4gIHdpbmRvdy5wYXIuaW5uZXJIVE1MICs9IHRleHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1haW4oKSB7XHJcblxyXG4gIHdpbmRvdy5wYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBcIik7XHJcblxyXG4gIGxldCBjYW52YXNlcyA9IFtdO1xyXG4gIGxldCByZW5kZXJzID0gW107XHJcbiAgbGV0IHNoYWRlcnMgPSBbXTtcclxuICBsZXQgcHJpbXMgPSBbXTtcclxuICBsZXQgVUJPcyA9IFtdO1xyXG4gIGxldCBmaWd1cmVzID0gW107XHJcbiAgbGV0IHJvdHMgPSBbXTtcclxuICBsZXQgbXRscyA9IFtdO1xyXG4gIGxldCBzY2FsZXMgPVxyXG4gICAgW1xyXG4gICAgICBtYXRyU2NhbGUodmVjMygzKSksIG1hdHJTY2FsZSh2ZWMzKDIuOCkpLFxyXG4gICAgICBtYXRyU2NhbGUodmVjMygyLjcpKSwgbWF0clNjYWxlKHZlYzMoMi4yKSksXHJcbiAgICAgIG1hdHJTY2FsZSh2ZWMzKDEuOCkpLCBtYXRyU2NhbGUodmVjMygxKSlcclxuICAgIF07XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKVxyXG4gICAgZmlndXJlc1tpXSA9IG5ldyBGaWd1cmUoKTtcclxuXHJcbiAgZmlndXJlc1swXS5zZXRUZXRyYWhlZHJvbigpO1xyXG4gIGZpZ3VyZXNbMV0uc2V0T2N0YWhlZHJvbigpO1xyXG4gIGZpZ3VyZXNbMl0uc2V0Q3ViZSgpO1xyXG4gIGZpZ3VyZXNbM10uc2V0SWNvaGVkcm9uKCk7XHJcbiAgZmlndXJlc1s0XS5zZXREb2RlY2FoZWRyb24oKTtcclxuICBmaWd1cmVzWzVdLnNldFN0YXIoKTtcclxuXHJcbiAgbGV0IGEgPSBbMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMV07XHJcblxyXG4gIGxldCBtdGxfcHJvcHMgPSBbXHJcbiAgICBbdmVjMygwLjEpLCB2ZWMzKDAsIDAuNywgMC43KSwgdmVjMygwLjUsIDAuNSwgMC41KSwgOTBdLFxyXG4gICAgW3ZlYzMoMC4xKSwgdmVjMygwLCAwLCAwLjcpLCB2ZWMzKDAuNSwgMC41LCAwLjApLCA0MF0sXHJcbiAgICBbdmVjMygwLjEpLCB2ZWMzKDAuMiwgMC41LCAwLjUpLCB2ZWMzKDAuNSwgMC41LCAwLjUpLCA0MF0sXHJcbiAgICBbdmVjMygwLjEpLCB2ZWMzKDAuNywgMC43LCAwLjcpLCB2ZWMzKDAuNSwgMC41LCAwLjUpLCA5MF0sXHJcbiAgICBbdmVjMygwLjEpLCB2ZWMzKDAuMiwgMC4yLCAwLjIpLCB2ZWMzKDAuMSwgMC4xLCAwLjEpLCAxNV0sXHJcbiAgICBbdmVjMygwLjEpLCB2ZWMzKDAuNywgMC43LCAwKSwgdmVjMygwLjksIDAuOSwgMC45KSwgOTBdLFxyXG4gIF07XHJcblxyXG4gIHRyeSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICBjYW52YXNlc1tpXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBteUNhbiR7aSArIDF9YCk7XHJcbiAgICAgIHJlbmRlcnNbaV0gPSBuZXcgUmVuZGVyKGNhbnZhc2VzW2ldKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBzaGFkZXJzW2ldID0gbmV3IFNoYWRlcihyZW5kZXJzW2ldLCBcImRlZmF1bHRcIik7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHRwTG9nKGAke2Vyci5uYW1lfSA6ICR7ZXJyLnN0cn1gKTtcclxuICAgICAgfVxyXG4gICAgICBtdGxzW2ldID0gbmV3IE1hdGVyaWFsKHNoYWRlcnNbaV0sIC4uLm10bF9wcm9wc1tpXSk7XHJcbiAgICAgIHByaW1zW2ldID0gZmlndXJlc1tpXS5tYWtlUHJpbShtdGxzW2ldKTtcclxuICAgICAgY2FudmFzZXNbaV0uaG0gPSBIYW1tZXIoY2FudmFzZXNbaV0pO1xyXG4gICAgICBjYW52YXNlc1tpXS5obS5nZXQoXCJyb3RhdGVcIikuc2V0KHsgZW5hYmxlOiB0cnVlIH0pO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgdHBMb2coYCR7ZXJyLm5hbWV9IDogJHtlcnIubWVzc2FnZX1gKTtcclxuICB9XHJcblxyXG4gIC8vIFRpbWVyIGNyZWF0aW9uXHJcbiAgbGV0IHRpbWVyID0gbmV3IFRpbWVyKCk7XHJcblxyXG4gIGxldCBtdGwgPSBuZXcgTWF0ZXJpYWwoc2hhZGVyc1szXSwgLi4ubXRsX3Byb3BzWzBdKTtcclxuICBsZXQgZiA9IG5ldyBGaWd1cmUoKTtcclxuICBmLnNldERvZGVjYWhlZHJvbigpO1xyXG4gIGxldCB0ZXN0X3ByID0gZi5tYWtlUHJpbShtdGwpO1xyXG5cclxuICBsZXQgcm90U3BlZWQgPSAwLjAxO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XHJcbiAgICByb3RzW2ldID0gbWF0NCgxKTtcclxuXHJcbiAgICBsZXQgZjEgPSBlID0+IHtcclxuICAgICAgcm90c1tpXSA9IHJvdHNbaV0ubXVsKG1hdHJSb3RhdGUocm90U3BlZWQgKiBlLm1vdmVtZW50WCwgdmVjMygwLCAxLCAwKSkpO1xyXG4gICAgICByb3RzW2ldID0gcm90c1tpXS5tdWwobWF0clJvdGF0ZShyb3RTcGVlZCAqIGUubW92ZW1lbnRZLCB2ZWMzKDEsIDAsIDApKSk7XHJcbiAgICB9O1xyXG4gICAgbGV0IGYyID0gZSA9PiB7XHJcbiAgICAgIGlmIChlLmRlbHRhWSA+IDApXHJcbiAgICAgICAgc2NhbGVzW2ldID0gc2NhbGVzW2ldLm11bChtYXRyU2NhbGUodmVjMygwLjkpKSk7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICBzY2FsZXNbaV0gPSBzY2FsZXNbaV0ubXVsKG1hdHJTY2FsZSh2ZWMzKDEuMSkpKTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGQsIG9sZCA9IDA7XHJcbiAgICBsZXQgZjMgPSBlID0+IHtcclxuICAgICAgZCA9IGUuYW5nbGUgLSBvbGQ7XHJcbiAgICAgIG9sZCA9IGUuYW5nbGU7XHJcbiAgICAgIHJvdHNbaV0gPSByb3RzW2ldLm11bChtYXRyUm90YXRlKGQsIHZlYzMoMCwgMCwgMSkpKTtcclxuICAgIH07XHJcbiAgICBsZXQgZjQgPSBlID0+IHtcclxuICAgICAgcm90c1tpXSA9IHJvdHNbaV0ubXVsKG1hdHJSb3RhdGUoMC4xICogZS52ZWxvY2l0eVgsIHZlYzMoMCwgMSwgMCkpKTtcclxuICAgICAgcm90c1tpXSA9IHJvdHNbaV0ubXVsKG1hdHJSb3RhdGUoMC4xICogZS52ZWxvY2l0eVksIHZlYzMoMSwgMCwgMCkpKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9jYW52YXNlc1tpXS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGYxKTtcclxuICAgIGNhbnZhc2VzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLCBmMik7XHJcbiAgICBjYW52YXNlc1tpXS5obS5vbihcInJvdGF0ZVwiLCBmMyk7XHJcbiAgICBjYW52YXNlc1tpXS5obS5vbihcInBhblwiLCBmNCk7XHJcbiAgfVxyXG5cclxuICAvLyBFYWNoIGZyYW1lIHJlbmRlcmluZyBmdW5jdGlvbiBkZWNsYXJhdGlvblxyXG4gIGNvbnN0IGRyYXcgPSAoKSA9PiB7XHJcblxyXG4gICAgLy8gdGltZXIgcmVwb25zZVxyXG4gICAgdGltZXIucmVzcG9uc2UoKTtcclxuXHJcbiAgICBsZXQgdCA9IHRpbWVyLmdldFRpbWUoKTtcclxuXHJcbiAgICAvLyBmcmFtZSByZW5kZXJcclxuICAgIHRyeSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XHJcbiAgICAgICAgcmVuZGVyc1tpXS5yZW5kZXJTdGFydCgpO1xyXG4gICAgICAgIGlmIChpID09IDMpXHJcbiAgICAgICAgICB0ZXN0X3ByLnJlbmRlcihzY2FsZXNbaV0ubXVsKG1hdHJSb3RhdGUodCwgdmVjMygwLCAxLCAwKSkubXVsKHJvdHNbaV0ubXVsKG1hdHJUcmFuc2xhdGUodmVjMygyLCAyLCAtMTApKSkpKSk7XHJcbiAgICAgICAgcHJpbXNbaV0ucmVuZGVyKHNjYWxlc1tpXS5tdWwobWF0clJvdGF0ZSh0LCB2ZWMzKDAsIDEsIDApKS5tdWwocm90c1tpXS5tdWwobWF0clRyYW5zbGF0ZSh2ZWMzKDAsIDAsIC0xMCkpKSkpKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRwTG9nKGAke2Vyci5uYW1lfSA6ICR7ZXJyLm1lc3NhZ2V9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcclxuICB9O1xyXG4gIGRyYXcoKTtcclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcclxuICBtYWluKCk7XHJcbn0pOyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQSxNQUFNLEtBQUssQ0FBQztJQUNaLElBQUksV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ3pCLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFD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SUFDekMsS0FBSztBQUNMO0lBQ0EsSUFBSSxPQUFPLENBQUMsQ0FBQyxFQUFFO0lBQ2YsUUFBUSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QixZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUIsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RCO0lBQ0EsUUFBUSxPQUFPLElBQUk7SUFDbkIsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUMxRixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzFGLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQzdGLEtBQUs7QUFDTDtJQUNBLElBQUksU0FBUyxDQUFDLENBQUMsRUFBRTtJQUNqQixRQUFRLE9BQU8sSUFBSTtJQUNuQixZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxTQUFTLENBQUM7SUFDVixLQUFLO0FBQ0w7SUFDQSxJQUFJLGNBQWMsR0FBRztJQUNyQixRQUFRLE9BQU8sSUFBSTtJQUNuQixZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BGLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEYsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRixTQUFTLENBQUM7SUFDVixLQUFLO0FBQ0w7SUFDQSxJQUFJLFNBQVMsR0FBRztJQUNoQixRQUFRLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLEtBQUs7SUFDTCxDQUFDO0FBQ0Q7SUFDTyxTQUFTLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUM5QixJQUFJLElBQUksQ0FBQyxJQUFJLFNBQVM7SUFDdEIsUUFBUSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLFFBQVE7SUFDNUIsUUFBUSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsSUFBSSxJQUFJLENBQUMsSUFBSSxTQUFTO0lBQ3RCLFFBQVEsT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLElBQUksT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlCOztJQzdGQSxNQUFNLEtBQUssQ0FBQztJQUNaLElBQUksV0FBVztJQUNmLFFBQVEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUMxQixRQUFRLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDMUIsUUFBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQzFCLFFBQVEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUMxQixNQUFNO0lBQ04sUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDdEMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUM1QixRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQzVCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzlCLEtBQUs7QUFDTDtJQUNBLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRTtJQUNYLFFBQVEsT0FBTyxJQUFJO0lBQ25CLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkgsS0FBSztBQUNMO0lBQ0EsSUFBSSxTQUFTLEdBQUc7SUFDaEIsUUFBUSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEMsS0FBSztJQUNMLENBQUM7QUFDRDtJQUNPLFNBQVMsSUFBSTtJQUNwQixJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDdEIsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQ3RCLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUN0QixJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDdEIsRUFBRTtJQUNGLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxTQUFTO0lBQ3BDLFFBQVEsT0FBTyxJQUFJLEtBQUs7SUFDeEIsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ3RCLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUN0QixZQUFZLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDdEIsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QixJQUFJLElBQUksT0FBTyxHQUFHLElBQUksUUFBUTtJQUM5QixRQUFRLE9BQU8sSUFBSSxLQUFLO0lBQ3hCLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RCxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RELFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RCxTQUFTLENBQUM7SUFDVixJQUFJLE9BQU8sSUFBSSxLQUFLO0lBQ3BCLFFBQVEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUMxQixRQUFRLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDMUIsUUFBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQzFCLFFBQVEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUMxQixLQUFLLENBQUM7SUFDTixDQUFDO0FBQ0Q7SUFDTyxTQUFTLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFO0lBQ3hDLElBQ08sSUFDQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25ELFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUc7QUFDeEI7SUFDQSxJQUFJLE9BQU8sSUFBSTtJQUNmLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2pDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7SUFDdkMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtJQUN2QyxRQUFRLENBQUM7SUFDVCxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO0lBQ3ZDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2pDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7SUFDdkMsUUFBUSxDQUFDO0lBQ1QsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtJQUN2QyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO0lBQ3ZDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2pDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckIsS0FBSyxDQUFDO0lBQ04sQ0FBQztBQUNEO0lBQ08sU0FBUyxhQUFhLENBQUMsQ0FBQyxFQUFFO0lBQ2pDLElBQUksT0FBTyxJQUFJO0lBQ2YsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ2xCLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNsQixRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDbEIsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3hCLEtBQUssQ0FBQztJQUNOLENBQUM7QUFDRDtJQUNPLFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRTtJQUM3QixJQUFJLE9BQU8sSUFBSTtJQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDcEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNwQixRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3BCLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNsQixLQUFLO0lBQ0wsQ0FBQztBQUNEO0lBQ08sU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUU7SUFDakUsSUFBSSxPQUFPLElBQUk7SUFDZixRQUFRLENBQUMsR0FBRyxJQUFJLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUMxQyxRQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUMxQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsTUFBTSxLQUFLLEdBQUcsR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQy9DLEtBQUssQ0FBQztJQUNOLENBQUM7QUFDRDtJQUNPLFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFO0lBQ3ZDLElBQUk7SUFDSixRQUFRLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTtJQUNoQyxRQUFRLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTtJQUNyQyxRQUFRLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JDLElBQUksT0FBTyxJQUFJO0lBQ2YsUUFBUSxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDaEMsUUFBUSxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDaEMsUUFBUSxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDaEMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztJQUN0RCxLQUFLLENBQUM7SUFDTjs7SUM3SE8sTUFBTSxNQUFNLENBQUM7SUFDcEIsSUFBSSxXQUFXLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRTtJQUMzQixRQUFRLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ3ZCLFFBQVEsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDekIsUUFBUSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztJQUN4QixRQUFRLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyQixLQUFLO0FBQ0w7SUFDQSxJQUFJLE1BQU0sS0FBSyxHQUFHO0lBQ2xCLFFBQVEsSUFBSSxDQUFDLE9BQU87SUFDcEIsWUFBWTtJQUNaLGdCQUFnQjtJQUNoQixvQkFBb0IsRUFBRSxFQUFFLElBQUk7SUFDNUIsb0JBQW9CLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxhQUFhO0lBQ25ELG9CQUFvQixJQUFJLEVBQUUsTUFBTTtJQUNoQyxvQkFBb0IsR0FBRyxFQUFFLEVBQUU7SUFDM0IsaUJBQWlCO0lBQ2pCLGdCQUFnQjtJQUNoQixvQkFBb0IsRUFBRSxFQUFFLElBQUk7SUFDNUIsb0JBQW9CLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxlQUFlO0lBQ3JELG9CQUFvQixJQUFJLEVBQUUsTUFBTTtJQUNoQyxvQkFBb0IsR0FBRyxFQUFFLEVBQUU7SUFDM0IsaUJBQWlCO0lBQ2pCLGFBQWEsQ0FBQztJQUNkLFFBQVEsS0FBSyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO0lBQ3RDLFlBQVksSUFBSSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2xGLFlBQVksSUFBSSxHQUFHLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDNUMsWUFBWSxJQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVEsSUFBSSxHQUFHLElBQUksRUFBRTtJQUNuRCxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDNUIsU0FBUztJQUNUO0lBQ0EsUUFBUSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUNuQyxLQUFLO0FBQ0w7SUFDQSxJQUFJLG1CQUFtQixHQUFHO0lBQzFCLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBQ2xDLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBQ2xDO0lBQ0EsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFO0lBQ2xFLFlBQVksT0FBTztJQUNuQixRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSTtJQUNsQyxZQUFZLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwRCxZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsRCxZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRTtJQUNuRixnQkFBZ0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdELGdCQUFnQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRixhQUFhO0lBQ2IsU0FBUyxDQUFDLENBQUM7SUFDWCxRQUFRLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDL0MsUUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUk7SUFDbEMsWUFBWSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSTtJQUM1QixnQkFBZ0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELFNBQVMsQ0FBQyxDQUFDO0lBQ1gsUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUU7SUFDakYsWUFBWSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUQsWUFBWSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RSxTQUFTO0lBQ1QsUUFBUSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUNoQyxLQUFLO0FBQ0w7SUFDQSxJQUFJLGdCQUFnQixHQUFHO0lBQ3ZCLFFBQVEsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzVFLFFBQVEsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzNFO0lBQ0E7SUFDQSxRQUFRLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQzNCLFFBQVEsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNyRyxRQUFRLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDaEQsWUFBWSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25FLFlBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7SUFDdkMsZ0JBQWdCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtJQUMvQixnQkFBZ0IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO0lBQy9CLGdCQUFnQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7SUFDL0IsZ0JBQWdCLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDeEUsYUFBYSxDQUFDO0lBQ2QsU0FBUztBQUNUO0lBQ0E7SUFDQSxRQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQ2hDLFFBQVEsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDaEgsUUFBUSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsa0JBQWtCLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDckQsWUFBWSxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xGLFlBQVksTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNqRixZQUFZLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUc7SUFDN0MsZ0JBQWdCLElBQUksRUFBRSxVQUFVO0lBQ2hDLGdCQUFnQixLQUFLLEVBQUUsS0FBSztJQUM1QixnQkFBZ0IsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO0lBQ3RILGdCQUFnQixJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMscUJBQXFCLENBQUM7SUFDcEgsYUFBYSxDQUFDO0lBQ2QsU0FBUztBQUNUO0lBQ0EsUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsS0FBSztBQUNMO0lBQ0EsSUFBSSxLQUFLLEdBQUc7SUFDWixRQUFRLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUU7SUFDOUIsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLFlBQVksT0FBTyxJQUFJLENBQUM7SUFDeEIsU0FBUztJQUNULFFBQVEsT0FBTyxLQUFLLENBQUM7SUFDckIsS0FBSztJQUNMOztJQ3ZHQSxNQUFNLE9BQU8sQ0FBQztJQUNkLElBQUksV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0lBQ2pDLFFBQVEsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDdkIsUUFBUSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUN6QixRQUFRLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLFFBQVEsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFDdkIsUUFBUSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLFNBQVM7SUFDMUMsWUFBWSxPQUFPO0lBQ25CLFFBQVEsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hDLFFBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUMsUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9ELEtBQUs7QUFDTDtJQUNBLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtJQUNqQixRQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNuRCxRQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0RCxLQUFLO0lBQ0wsQ0FBQztBQUNEO0lBQ08sTUFBTSxhQUFhLFNBQVMsT0FBTyxDQUFDO0lBQzNDLElBQUksV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtJQUM1QyxRQUFRLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEQsUUFBUSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUN6QixRQUFRLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQ25DLEtBQUs7QUFDTDtJQUNBLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRTtJQUNmLFFBQVEsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLFNBQVMsSUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLFNBQVMsSUFBSSxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTO0lBQ3RHLFlBQVksT0FBTztJQUNuQixRQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekcsUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEcsUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RGLEtBQUs7SUFDTDs7SUNuQ0E7SUFDQTtJQUNBO0FBQ0E7SUFDTyxNQUFNLEtBQUssQ0FBQztJQUNuQixJQUFJLFdBQVcsR0FBRztJQUNsQixRQUFRLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDMUQsUUFBUSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZELFFBQVEsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMxRSxRQUFRLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLFFBQVEsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDN0IsUUFBUSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztJQUN4QixRQUFRLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLEtBQUs7QUFDTDtJQUNBO0lBQ0EsSUFBSSxPQUFPLEdBQUc7SUFDZCxRQUFRLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDaEMsUUFBUSxJQUFJLENBQUM7SUFDYixZQUFZLElBQUksQ0FBQyxlQUFlLEVBQUUsR0FBRyxNQUFNO0lBQzNDLFlBQVksSUFBSSxDQUFDLFVBQVUsRUFBRTtJQUM3QixZQUFZLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDbkMsUUFBUSxPQUFPLENBQUMsQ0FBQztJQUNqQixLQUFLO0FBQ0w7SUFDQTtJQUNBLElBQUksTUFBTSxHQUFHO0lBQ2IsUUFBUSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25DLEtBQUs7QUFDTDtJQUNBLElBQUksV0FBVyxHQUFHO0lBQ2xCLFFBQVEsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDNUIsS0FBSztBQUNMO0lBQ0EsSUFBSSxZQUFZLEdBQUc7SUFDbkIsUUFBUSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUM3QixLQUFLO0FBQ0w7SUFDQSxJQUFJLFdBQVcsR0FBRztJQUNsQixRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxLQUFLO0lBQ2pDLFlBQVksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDaEM7SUFDQSxZQUFZLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ2pDLEtBQUs7QUFDTDtJQUNBO0lBQ0EsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksRUFBRTtJQUM1QixRQUFRLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUMvQjtJQUNBLFFBQVEsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDNUIsUUFBUSxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ2hEO0lBQ0EsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7SUFDMUIsWUFBWSxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztJQUNwQyxZQUFZLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDL0MsU0FBUztJQUNULGFBQWE7SUFDYixZQUFZLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUN2RCxZQUFZLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUNqRSxTQUFTO0FBQ1Q7SUFDQSxRQUFRLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM1QixRQUFRLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFFO0lBQ3JDLFlBQVksSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakUsWUFBWSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztJQUNoQyxZQUFZLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLFlBQVksSUFBSSxNQUFNLElBQUksSUFBSTtJQUM5QixnQkFBZ0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzFFLFNBQVM7QUFDVDtJQUNBLFFBQVEsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDekIsS0FBSztJQUNMOztJQ25FTyxNQUFNLE1BQU0sQ0FBQztBQUNwQjtJQUNBLElBQUksVUFBVSxHQUFHO0lBQ2pCLFFBQWdCLElBQUksQ0FBQyxDQUFDLEVBQUU7SUFDeEIsUUFBUSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0FBQ25EO0lBQ0E7SUFDQSxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTTtJQUNyQyxZQUFZLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDM0M7SUFDQSxZQUFZLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDM0M7SUFDQSxRQUFRLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25HLEtBQUs7QUFDTDtJQUNBLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0lBQ3hCLFFBQVEsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM5QyxLQUFLO0FBQ0w7SUFDQSxJQUFJLGNBQWMsR0FBRztJQUNyQixRQUFRLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0csS0FBSztBQUNMO0lBQ0EsSUFBSSxXQUFXLEdBQUc7SUFDbEIsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzlCLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwSjtJQUNBLFFBQVEsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2hELFFBQVEsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2hELEtBQUs7QUFDTDtJQUNBLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRTtJQUN4QixRQUFRLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQzdCO0lBQ0EsUUFBUSxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztJQUM1QixRQUFRLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO0lBQzVCLFFBQVEsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDM0I7SUFDQSxRQUFRLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ2xELFFBQVEsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ2hELFFBQVEsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQ2pEO0lBQ0EsUUFBUSxJQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUMsUUFBUSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3QyxRQUFRLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDM0M7SUFDQSxRQUFRLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMxQixRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLFFBQVEsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVFLFFBQVEsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQzlCO0lBQ0EsUUFBUSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6RTtJQUNBLFFBQVEsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0lBQ2pDLFFBQVEsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRSxLQUFLO0lBQ0w7O0lDeERBLE1BQU0sT0FBTyxDQUFDO0lBQ2QsSUFBSSxXQUFXLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRTtJQUMzQixRQUFRLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ3ZCLFFBQVEsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDekIsS0FBSztJQUNMLENBQUM7QUFDRDtJQUNPLFNBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUU7SUFDbEMsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0FBQ0Q7SUFDTyxTQUFTLFdBQVcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFO0lBQ2hELElBQUksSUFBSSxDQUFDLENBQUM7QUFDVjtJQUNBO0lBQ0EsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO0lBQ3hDLFFBQVEsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkM7SUFDQTtJQUNBLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDN0MsUUFBUTtJQUNSLFlBQVksRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN6RSxRQUFRO0lBQ1IsWUFBWSxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUc7SUFDakMsWUFBWSxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUc7SUFDakMsWUFBWSxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUc7SUFDakMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3BEO0lBQ0EsUUFBUSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELFFBQVEsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRCxRQUFRLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckQsS0FB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RyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6SCxTQUFTO0lBQ1QsS0FBSztJQUNMOztJQzFHTyxNQUFNLE1BQU0sQ0FBQztJQUNwQixJQUFJLFdBQVcsR0FBRztJQUNsQixRQUFRLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQzNCLEtBQUs7QUFDTDtJQUNBLElBQUksT0FBTyxHQUFHO0lBQ2QsUUFBUSxJQUFJLENBQUMsUUFBUSxHQUFHO0lBQ3hCLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDcEcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4RyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BHLFVBQVM7SUFDVCxLQUFLO0FBQ0w7SUFDQSxJQUFJLGNBQWMsR0FBRztJQUNyQixRQUFRLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0Q7SUFDQSxRQUFRO0lBQ1IsWUFBWSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxLQUFLLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUMzQyxZQUFZLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEdBQUcsR0FBRyxDQUFDO0lBQzNDLFlBQVksSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0lBQzlDLFlBQVksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQy9DO0lBQ0EsUUFBUSxJQUFJLENBQUMsUUFBUSxHQUFHO0lBQ3hCLFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQztJQUM5QixZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUM7SUFDOUIsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDO0lBQy9CLFlBQVksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQztJQUNoQyxTQUFTLENBQUM7SUFDVixLQUFLO0FBQ0w7SUFDQSxJQUFJLGFBQWEsR0FBRztJQUNwQixRQUFXLElBQXlCLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtBQUMzRDtJQUNBLFFBQVE7SUFDUixZQUFZLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLFlBQVksR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0IsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7SUFDbkMsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQztJQUNwQyxZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7SUFDbEMsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwQztJQUNBLFFBQVEsSUFBSSxDQUFDLFFBQVEsR0FBRztJQUN4QixZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDekIsWUFBWSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3pCLFlBQVksQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUN6QixZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDekIsWUFBWSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3pCLFlBQVksQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUN6QixZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDekIsWUFBWSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3pCLFNBQVMsQ0FBQztJQUNWLEtBQUs7QUFDTDtJQUNBLElBQUksWUFBWSxHQUFHO0FBQ25CO0lBQ0EsUUFBUSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDeEIsUUFBUSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDeEI7SUFDQSxRQUFRLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELFFBQVEsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQztBQUMzRTtJQUNBLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO0lBQzFDLFlBQVksSUFBSSxLQUFLLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQzVDLFlBQVksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzNFO0lBQ0EsWUFBWSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLFNBQVM7QUFDVDtJQUNBLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO0lBQzFDLFlBQVksSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ25ELFlBQVksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMxRTtJQUNBLFlBQVksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQixTQUFTO0FBQ1Q7SUFDQSxRQUFRO0lBQ1IsWUFBWSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQy9CLFlB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O0FBQ3hCO0lBQ0EsUUFBUSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLFFBQVEsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUM1QztJQUNBLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO0lBQzFDLFlBQVk7SUFDWixnQkFBZ0IsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUU7SUFDdEMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7QUFDOUM7SUFDQSxZQUFZLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqRSxZQUFZLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xFO0lBQ0EsWUFBWSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDcEUsWUFBWSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxH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TyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQy9CLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBR3ZCO0lBQ0EsRUFBRSxJQUFJLFNBQVMsR0FBRztJQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUMzRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUN6RCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMs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QztJQUN4RDtJQUNBLFFBQVEsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEQsS0FBSyxDQUFDO0FBQ047SUFDQSxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDbkIsSUFBSSxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7SUFDbEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7SUFDeEIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNwQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFELEtBQUssQ0FBQztJQUNOLElBQUksSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO0lBQ2xCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRSxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUUsS0FBSyxDQUFDO0FBQ047SUFDQTtJQUNBLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM5QyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNqQyxHQUFHO0FBQ0g7SUFDQTtJQUNBLEVBQUUsTUFBTSxJQUFJLEdBQUcsTUFBTTtBQUNyQjtJQUNBO0lBQ0EsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDckI7SUFDQSxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUM1QjtJQUNBO0lBQ0EsSUFBSSxJQUFJO0lBQ1IsTUFBTSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ2xDLFFBQVEsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNsQixVQUFVLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZILFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEgsT0FBTztJQUNQLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRTtJQUNsQixNQUFNLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QyxLQUFLO0FBQ0w7SUFDQSxJQUFJLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxHQUFHLENBQUM7SUFDSixFQUFFLElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQztBQUNEO0lBQ0EsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxNQUFNO0lBQ3RDLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUM7Ozs7OzsifQ==
