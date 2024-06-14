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
            this.texLoc = this.rnd.gl.getAttribLocation(this.prg, "InTexCoord");

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

    // General class for rendering.
    // One render per canvas.
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
            //this.timer.response();
            //this.timeUBO.update(new Float32Array([this.timer.localTime, this.timer.localDeltaTime, this.timer.globalTime, this.timer.globalDeltaTime]));
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
        }

        constructor(canvas) {
            this.canvas = canvas;

            // Default camera properties
            this.projSize = 0.1;
            this.projDist = 0.1;
            this.farClip = 300;

            // Evaluating canvas size
            let rect = canvas.getBoundingClientRect();
            this.width = rect.right - rect.left + 1;
            this.height = rect.bottom - rect.top + 1;

            // Getting GL context
            this.gl = canvas.getContext("webgl2");
            this.gl.clearColor(0.9, 0.9, 0.9, 1);
            this.gl.enable(this.gl.DEPTH_TEST);

            // Initializing camera
            this.setFrustum();
            this.setCam(vec3(0, 0, 0), vec3(0, 0, -1), vec3(0, 1, 0));
            this.matrixUBO = new UniformBuffer(this, "u_camera", 16 * 4 * 2, 0);
            this.updateMatrixes();

            // Initializing prim ubo
            this.primUBO = new UniformBuffer(this, "u_primitive", 16 * 4, 1);

            // Initializing timer
            this.timer = new Timer();
            this.timeUBO = new UniformBuffer(this, "u_time", 16, 2);
        }
    }

    class _vec2 {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    function vec2(x, y) {
        if (y == undefined)
            return new _vec2(x, x);
        return new _vec2(x, y);
    }

    class _vertex {
        constructor(pos, norm, tex) {
            this.pos = pos;
            this.norm = norm;
            this.tex = tex;
        }
    }

    function vertex(pos, norm, tex) {
        if (tex == undefined)
            return new _vertex(pos, norm, vec2(0));
        return new _vertex(pos, norm, tex);
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

            this.vertexes = [...vertexes];
            this.indicies = [...indicies];
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
                trimash[i++] = v.tex.x;
                trimash[i++] = v.tex.y;
            }

            this.vertexArrayId = shd.rnd.gl.createVertexArray();
            shd.rnd.gl.bindVertexArray(this.vertexArrayId);
            this.vertexBufferId = shd.rnd.gl.createBuffer();

            shd.rnd.gl.bindBuffer(shd.rnd.gl.ARRAY_BUFFER, this.vertexBufferId);
            shd.rnd.gl.bufferData(shd.rnd.gl.ARRAY_BUFFER, new Float32Array(trimash), shd.rnd.gl.STATIC_DRAW);

            if (this.posLoc != -1 && this.normLoc != -1) {
                shd.rnd.gl.vertexAttribPointer(shd.posLoc, 3, shd.rnd.gl.FLOAT, false, 32, 0);
                shd.rnd.gl.enableVertexAttribArray(shd.posLoc);
                shd.rnd.gl.vertexAttribPointer(shd.normLoc, 3, shd.rnd.gl.FLOAT, false, 32, 12);
                shd.rnd.gl.enableVertexAttribArray(shd.normLoc);
                shd.rnd.gl.vertexAttribPointer(shd.texLoc, 2, shd.rnd.gl.FLOAT, false, 32, 24);
                shd.rnd.gl.enableVertexAttribArray(shd.texLoc);
            }

            this.IndexBufferId = shd.rnd.gl.createBuffer();
            shd.rnd.gl.bindBuffer(shd.rnd.gl.ELEMENT_ARRAY_BUFFER, this.IndexBufferId);
            shd.rnd.gl.bufferData(shd.rnd.gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indicies), shd.rnd.gl.STATIC_DRAW);

            this.numOfElements = indicies.length;
        }

        constructor(mtl, vertexes, indicies) {
            this.transform = mat4(1);
            if (indicies == undefined) {
                this.mtl = mtl;
                this.shd = mtl.shd;
                this.fromObj(mtl, vertexes);
            } else {
                this.mtl = mtl;
                this.create(mtl.shd, vertexes, indicies);
            }
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
                this.shd.rnd.primUBO.update(new Float32Array(this.transform.mul(world).linearize()));
                this.shd.rnd.gl.bindVertexArray(this.vertexArrayId);
                this.shd.rnd.gl.bindBuffer(this.shd.rnd.gl.ELEMENT_ARRAY_BUFFER, this.IndexBufferId);
                this.shd.rnd.gl.drawElements(this.shd.rnd.gl.TRIANGLES, this.numOfElements, this.shd.rnd.gl.UNSIGNED_INT, 0);
            }
        }

        async fromObj(mtl, fileName) {
            let vtx = [];
            let file = await fetch(`bin/models/${fileName}.obj`);
            let src = await file.text();
            let lines = src.split('\n');

            this.vertexes = [];
            this.indicies = [];
            for (let line of lines) {
                if (line[0] == 'v') {
                    let toks = line.split(' ');
                    let v = [];

                    for (let i = 0; i < toks.length; i++) {
                        if (toks[i] == "") {
                            toks.splice(i, 1);
                            i--;
                        }
                    }

                    for (let i = 1; i < 4; i++)
                        v.push(parseFloat(toks[i]));

                    vtx.push(vec3(v[0], v[1], v[2]));
                    this.vertexes.push(vertex(vec3(v[0], v[1], v[2])));
                } else if (line[0] == 'f') {
                    let toks = line.split(' ');

                    for (let t = 1; t < 4; t++) {
                        vertex(vtx[parseInt(toks[t].split('/')[0]) - 1]);
                        this.indicies.push(parseInt(toks[t].split('/')[0]) - 1);
                        //this.vertexes.push(v);
                    }
                }
            }
            /*
            this.indicies = [];
            for (let i = 0; i < this.vertexes.length; i++)
                this.indicies.push(i);
            */
            this.create(mtl.shd, this.vertexes, this.indicies);
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
            this.texCoords = [
                [vec2(0, 0), vec2(0, 1), vec2(1, 1), vec2(1, 0)],
                [vec2(0, 0), vec2(0, 1), vec2(1, 1), vec2(1, 0)],
                [vec2(0, 0), vec2(0, 1), vec2(1, 1), vec2(1, 0)],
                [vec2(0, 0), vec2(0, 1), vec2(1, 1), vec2(1, 0)],
                [vec2(0, 0), vec2(0, 1), vec2(1, 1), vec2(1, 0)],
                [vec2(0, 0), vec2(0, 1), vec2(1, 1), vec2(1, 0)],
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

            for (let e = 0; e < this.vertexes.length; e++) {
                let edge = this.vertexes[e];

                if (this.texCoords != undefined) {
                    for (let v in edge) {
                        vertexes.push(vertex(edge[v], vec3(0), this.texCoords[e][v]));
                    }
                } else {
                    for (let v in edge) {
                        vertexes.push(vertex(edge[v], vec3(0)));
                    }
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

    // Class for holding material properties of primitive.
    class Material {
        constructor(shd, Ka, Kd, Ks, Ph) {
            this.shd = shd;
            this.Ka = Ka;
            this.Kd = Kd;
            this.Ks = Ks;
            this.Ph = Ph;
            this.textures = [null, null, null, null];

            this.UBO = new UniformBuffer(this.shd.rnd, "u_material", 16 * 4, 3);
            //this.UBO.update(new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
            this.update();
        }

        update() {
            let tex_flags = [0, 0, 0, 0];
            let data = this.Ka.linearize().concat([0], this.Kd.linearize(), [0], this.Ks.linearize(), [this.Ph]);

            for (let t = 0; t < 4; t++)
                if (this.textures[t] != null)
                    tex_flags[t] = 1;

            data = data.concat(tex_flags);

            this.UBO.update(new Float32Array(data));
        }

        apply() {
            if (this.shd.apply()) {
                this.UBO.apply(this.shd);

                for (let t = 0; t < 4; t++) {
                    if (this.textures[t] != null)
                        this.textures[t].apply(t);
                }
                return true;
            }

            return false;
        }

        attachTexture(texture, num) {
            if (num > 3 || num < 0)
                return;

            this.textures[num] = texture;
        }
    }

    class Texture {
        constructor(rnd, url) {
            const gl = rnd.gl;

            this.rnd = rnd;
            this.texId = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.textId);

            const level = 0;
            const internalFormat = gl.RGBA;
            const width = 1;
            const height = 1;
            const border = 0;
            const srcFormat = gl.RGBA;
            const srcType = gl.UNSIGNED_BYTE;
            const pixel = new Uint8Array([0, 0, 255, 255]); // opaque blue
            gl.texImage2D(
                gl.TEXTURE_2D,
                level,
                internalFormat,
                width,
                height,
                border,
                srcFormat,
                srcType,
                pixel,
            );

            const image = new Image();
            image.onload = () => {
                gl.bindTexture(gl.TEXTURE_2D, this.texId);
                gl.texImage2D(
                    gl.TEXTURE_2D,
                    level,
                    internalFormat,
                    srcFormat,
                    srcType,
                    image,
                );

                if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
                    // Yes, it's a power of 2. Generate mips.
                    gl.generateMipmap(gl.TEXTURE_2D);
                } else {
                    // No, it's not a power of 2. Turn off mips and set
                    // wrapping to clamp to edge
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                }
            };
            image.src = url;
        }

        apply(num) {
            this.rnd.gl.activeTexture(this.rnd.gl.TEXTURE0 + num);
            this.rnd.gl.bindTexture(this.rnd.gl.TEXTURE_2D, this.texId);
        }
    }

    function isPowerOf2(value) {
        return (value & (value - 1)) === 0;
    }

    function onPinch(element, onPinchStart, onPinchMove, onPinchEnd) {
        let scaling = false;
        let prev_dist = 0;

        element.addEventListener("ontouchstart", e => {
            if (e.touches.length === 2) {
                scaling = true;
                prev_dist = Math.hypot(
                    e.touches[0].pageX - e.touches[1].pageX,
                    e.touches[0].pageY - e.touches[1].pageY
                );
            }
        });
        element.addEventListener("ontouchmove", e => {
            if (scaling) {
                let dist = Math.hypot(
                    e.touches[0].pageX - e.touches[1].pageX,
                    e.touches[0].pageY - e.touches[1].pageY
                );
                let delta = dist - prev_dist;
                prev_dist = dist;
                onPinchMove(dist, delta);
            }
        });
        element.addEventListener("ontouchend", e => {
            if (scaling) {
                scaling = false;
            }
        });
    }

    function main() {
      window.par = document.getElementById("p");
      console.log("MAIN LOADED");
      //tpLog("MAIN LOADED");

      let canvases = [];
      let renders = [];
      let shaders = [];
      let prims = [];
      let figures = [];
      let rots = [];
      let mtls = [];
      let scales =
        [
          matrScale(vec3(5.8)), matrScale(vec3(4.7)),
          matrScale(vec3(4)), matrScale(vec3(3.2)),
          matrScale(vec3(2.1)), matrScale(vec3(1.2)), matrScale(vec3(0.3)), matrScale(vec3(4))
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
        [vec3(0.1), vec3(0.3, 0.35, 0.7), vec3(0.5, 0.5, 0.0), 40],
        [vec3(0.1), vec3(0.4, 0.6, 0.4), vec3(1, 1, 1), 90],
        [vec3(0.1), vec3(0.7, 0.7, 0.7), vec3(0.5, 0.5, 0.5), 90],
        [vec3(0.1), vec3(0.6, 0.2, 0.5), vec3(0.3, 0.3, 0.3), 40],
        [vec3(0.1), vec3(0.7, 0.7, 0), vec3(0.9, 0.9, 0.9), 90],
      ];

      canvases[6] = document.getElementById(`myCan7`);
      canvases[6].hm = Hammer(canvases[6]);
      canvases[6].hm.get("rotate").set({ enable: true });
      canvases[7] = document.getElementById(`myCan8`);
      canvases[7].hm = Hammer(canvases[7]);
      canvases[7].hm.get("rotate").set({ enable: true });

      for (let i = 0; i < 6; i++) {
        // Getting canvas from html
        canvases[i] = document.getElementById(`myCan${i + 1}`);

        // Initializing render object 
        renders[i] = new Render(canvases[i]);

        // Initializing shader for render object
        shaders[i] = new Shader(renders[i], "default");

        // Initializing material relaterd to shader
        mtls[i] = new Material(shaders[i], ...mtl_props[i]);

        // Creating primitive using material
        prims[i] = figures[i].makePrim(mtls[i]);

        // Initializing Hammer on canvas
        canvases[i].hm = Hammer(canvases[i]);
        canvases[i].hm.get("rotate").set({ enable: true });
      }
      prims[0].transform = matrTranslate(vec3(0, -0.3, 0));

      // Timer creation
      let timer = new Timer();
      // Test material and primitive 
      let render_model = new Render(canvases[6]);
      let shader_model = new Shader(render_model, "default");
      let mtl = new Material(shader_model, ...mtl_props[0]);
      let test_pr = new Prim(mtl, "cow");
      test_pr.transform = matrTranslate(vec3(0, -4.5, 0));

      let render_texture = new Render(canvases[7]);
      let shader_texture = new Shader(render_texture, "default");
      let mtl_texture = new Material(shader_texture, ...mtl_props[0]);
      //let tex = new Texture(render_texture, "bin/textures/PNG.PNG");
      let tex = new Texture(render_texture, "./bin/textures/em.jpg");
      mtl_texture.attachTexture(tex, 0);
      mtl_texture.update();
      let f = new Figure();
      f.setCube();
      let prim_tex = f.makePrim(mtl_texture);
      for (let i = 0; i < 8; i++) {
        rots[i] = mat4(1);
        let f2 = e => {
          if (e.deltaY > 0)
            scales[i] = scales[i].mul(matrScale(vec3(0.9)));
          else
            scales[i] = scales[i].mul(matrScale(vec3(1.1)));
        };

        let f3 = (dist, delta) => {
          if (delta < 0)
            scales[i] = scales[i].mul(matrScale(vec3(0.97)));
          else
            scales[i] = scales[i].mul(matrScale(vec3(1.02)));
        };
        let f4 = e => {
          rots[i] = rots[i].mul(matrRotate(0.22 * e.velocityX, vec3(0, 1, 0)));
          rots[i] = rots[i].mul(matrRotate(0.22 * e.velocityY, vec3(1, 0, 0)));
        };
        let onTap = e => {
          if (canvases[i].style.width == "35%") {
            canvases[i].style.width = "20%";
            canvases[i].style.position = "static";
            canvases[i].style.top = "auto";
            canvases[i].style.left = "auto";
            return;
          }

          canvases[i].style.width = "35%";
          canvases[i].style.position = "fixed";
          canvases[i].style.top = "0";
          canvases[i].style.left = "0";
          canvases[i].style.position = "absolute";
          canvases[i].style.top = "5%";
          canvases[i].style.left = "32%";

          for (let c = 0; c < canvases.length; c++) {
            if (c != i) {
              canvases[c].style.width = "20%";
              canvases[c].style.position = "static";
              canvases[c].style.top = "auto";
              canvases[c].style.left = "auto";  
            }
          }
        };

        //canvases[i].addEventListener("mousemove", f1);
        canvases[i].addEventListener("wheel", f2);
        canvases[i].hm.on("rotate", f3);
        canvases[i].hm.on("pan", f4);
        canvases[i].hm.on("tap", onTap);
        onPinch(canvases[i], () => {}, f3);
      }

      // Each frame rendering function declaration
      const draw = () => {

        // Timer reponse
        //timer.response();

        let t = timer.getTime();

        // Frame render
        for (let i = 0; i < 6; i++) {
          //  Starting posting cringe 
          renders[i].renderStart();

          // Rendering [i] primitive
          prims[i].render(scales[i].mul(matrRotate(t, vec3(0, 1, 0)).mul(rots[i].mul(matrTranslate(vec3(0, 0, -10))))));
        }

        render_model.renderStart();
        test_pr.render(scales[6].mul(matrRotate(t, vec3(0, 1, 0)).mul(rots[6].mul(matrTranslate(vec3(0, 0, -10))))));
        render_texture.renderStart();
        prim_tex.render(scales[7].mul(matrRotate(t, vec3(0, 1, 0)).mul(rots[7].mul(matrTranslate(vec3(0, 0, -10))))));

        window.requestAnimationFrame(draw);
      };
      draw();
    }

    window.addEventListener("load", () => {
      main();
    });

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL210aC92ZWMzLmpzIiwiLi4vc3JjL210aC9tYXQ0LmpzIiwiLi4vc3JjL3JuZC9yZXMvc2hkLmpzIiwiLi4vc3JjL3JuZC9yZXMvYnVmLmpzIiwiLi4vc3JjL3RpbWVyL3RpbWVyLmpzIiwiLi4vc3JjL3JuZC9ybmQuanMiLCIuLi9zcmMvbXRoL3ZlYzIuanMiLCIuLi9zcmMvcm5kL3Jlcy9wcmltLmpzIiwiLi4vc3JjL3BsYXQvcGxhdC5qcyIsIi4uL3NyYy9ybmQvcmVzL210bC5qcyIsIi4uL3NyYy9ybmQvcmVzL3RleC5qcyIsIi4uL3NyYy9pbnB1dC90Y2guanMiLCIuLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBfdmVjMyB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB6KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMueiA9IHo7XHJcbiAgICB9XHJcblxyXG4gICAgbGVuMigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb3QodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVuKCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5kb3QodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIG5vcm0oKSB7XHJcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMubGVuKCk7XHJcblxyXG4gICAgICAgIGlmIChsZW4gPT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIHZlYzMoMCk7XHJcblxyXG4gICAgICAgIGlmIChsZW4gPT0gMSlcclxuICAgICAgICAgICAgcmV0dXJuIHZlYzModGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGl2KGxlbik7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKHYpIHtcclxuICAgICAgICByZXR1cm4gdmVjMyh0aGlzLnggKyB2LngsIHRoaXMueSArIHYueSwgdGhpcy56ICsgdi56KTtcclxuICAgIH1cclxuXHJcbiAgICBzdWIodikge1xyXG4gICAgICAgIHJldHVybiB2ZWMzKHRoaXMueCAtIHYueCwgdGhpcy55IC0gdi55LCB0aGlzLnogLSB2LnopO1xyXG4gICAgfVxyXG5cclxuICAgIG11bChrKSB7XHJcbiAgICAgICAgcmV0dXJuIHZlYzModGhpcy54ICogaywgdGhpcy55ICogaywgdGhpcy56ICogayk7XHJcbiAgICB9XHJcblxyXG4gICAgZGl2KGspIHtcclxuICAgICAgICByZXR1cm4gdmVjMyh0aGlzLnggLyBrLCB0aGlzLnkgLyBrLCB0aGlzLnogLyBrKTtcclxuICAgIH1cclxuXHJcbiAgICBkb3Qodikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggKiB2LnggKyB0aGlzLnkgKiB2LnkgKyB0aGlzLnogKiB2Lno7XHJcbiAgICB9XHJcblxyXG4gICAgY3Jvc3Modikge1xyXG4gICAgICAgIHJldHVybiB2ZWMzKHRoaXMueSAqIHYueiAtIHRoaXMueiAqIHYueSxcclxuICAgICAgICAgICAgdGhpcy56ICogdi54IC0gdGhpcy54ICogdi56LFxyXG4gICAgICAgICAgICB0aGlzLnggKiB2LnkgLSB0aGlzLnkgKiB2LngpO1xyXG4gICAgfVxyXG5cclxuICAgIG11bG1hdHIobSkge1xyXG4gICAgICAgIGxldCB3ID0gdGhpcy54ICogbS5hWzBdWzNdICtcclxuICAgICAgICAgICAgdGhpcy55ICogbS5hWzFdWzNdICtcclxuICAgICAgICAgICAgdGhpcy54ICogbS5hWzJdWzNdICtcclxuICAgICAgICAgICAgbS5hWzNdWzNdO1xyXG5cclxuICAgICAgICByZXR1cm4gdmVjMyhcclxuICAgICAgICAgICAgKHRoaXMueCAqIG0uYVswXVswXSArIHRoaXMueSAqIG0uYVsxXVswXSArIHRoaXMueiAqIG0uYVsyXVswXSArIG0uYVszXVswXSkgLyB3LFxyXG4gICAgICAgICAgICAodGhpcy54ICogbS5hWzBdWzFdICsgdGhpcy55ICogbS5hWzFdWzFdICsgdGhpcy56ICogbS5hWzJdWzFdICsgbS5hWzNdWzFdKSAvIHcsXHJcbiAgICAgICAgICAgICh0aGlzLnggKiBtLmFbMF1bMl0gKyB0aGlzLnkgKiBtLmFbMV1bMl0gKyB0aGlzLnogKiBtLmFbMl1bMl0gKyBtLmFbM11bMl0pIC8gdywpO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zZm9ybShtKSB7XHJcbiAgICAgICAgcmV0dXJuIHZlYzMoXHJcbiAgICAgICAgICAgIHRoaXMueCAqIG0uYVswXVswXSArIHRoaXMueSAqIG0uYVsxXVswXSArIHRoaXMueiAqIG0uYVsyXVswXSxcclxuICAgICAgICAgICAgdGhpcy54ICogbS5hWzBdWzFdICsgdGhpcy55ICogbS5hWzFdWzFdICsgdGhpcy56ICogbS5hWzJdWzFdLFxyXG4gICAgICAgICAgICB0aGlzLnggKiBtLmFbMF1bMl0gKyB0aGlzLnkgKiBtLmFbMV1bMl0gKyB0aGlzLnogKiBtLmFbMl1bMl1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHBvaW50VHJhbnNmb3JtKCkge1xyXG4gICAgICAgIHJldHVybiB2ZWMzKFxyXG4gICAgICAgICAgICB0aGlzLnggKiBtLmFbMF1bMF0gKyB0aGlzLnkgKiBtLmFbMV1bMF0gKyB0aGlzLnogKiBtLmFbMl1bMF0gKyBtLmFbM11bMF0sXHJcbiAgICAgICAgICAgIHRoaXMueCAqIG0uYVswXVsxXSArIHRoaXMueSAqIG0uYVsxXVsxXSArIHRoaXMueiAqIG0uYVsyXVsxXSArIG0uYVszXVsxXSxcclxuICAgICAgICAgICAgdGhpcy54ICogbS5hWzBdWzJdICsgdGhpcy55ICogbS5hWzFdWzJdICsgdGhpcy56ICogbS5hWzJdWzJdICsgbS5hWzNdWzJdXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBsaW5lYXJpemUoKSB7XHJcbiAgICAgICAgcmV0dXJuIFt0aGlzLngsIHRoaXMueSwgdGhpcy56XTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZlYzMoeCwgeSwgeikge1xyXG4gICAgaWYgKHggPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHJldHVybiBuZXcgX3ZlYzMoMCwgMCwgMCk7XHJcbiAgICBpZiAodHlwZW9mIHggPT0gXCJvYmplY3RcIilcclxuICAgICAgICByZXR1cm4gbmV3IF92ZWMzKHgueCwgeC55LCB4LnopO1xyXG4gICAgaWYgKHkgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHJldHVybiBuZXcgX3ZlYzMoeCwgeCwgeCk7XHJcbiAgICByZXR1cm4gbmV3IF92ZWMzKHgsIHksIHopO1xyXG59XHJcbiIsImNsYXNzIF9tYXQ0IHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGEwMCwgYTAxLCBhMDIsIGEwMyxcclxuICAgICAgICBhMTAsIGExMSwgYTEyLCBhMTMsXHJcbiAgICAgICAgYTIwLCBhMjEsIGEyMiwgYTIzLFxyXG4gICAgICAgIGEzMCwgYTMxLCBhMzIsIGEzM1xyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5hID0gW1thMDAsIGEwMSwgYTAyLCBhMDNdLFxyXG4gICAgICAgIFthMTAsIGExMSwgYTEyLCBhMTNdLFxyXG4gICAgICAgIFthMjAsIGEyMSwgYTIyLCBhMjNdLFxyXG4gICAgICAgIFthMzAsIGEzMSwgYTMyLCBhMzNdXTtcclxuICAgIH1cclxuXHJcbiAgICBtdWwobSkge1xyXG4gICAgICAgIHJldHVybiBtYXQ0KFxyXG4gICAgICAgICAgICB0aGlzLmFbMF1bMF0gKiBtLmFbMF1bMF0gKyB0aGlzLmFbMF1bMV0gKiBtLmFbMV1bMF0gKyB0aGlzLmFbMF1bMl0gKiBtLmFbMl1bMF0gKyB0aGlzLmFbMF1bM10gKiBtLmFbM11bMF0sXHJcbiAgICAgICAgICAgIHRoaXMuYVswXVswXSAqIG0uYVswXVsxXSArIHRoaXMuYVswXVsxXSAqIG0uYVsxXVsxXSArIHRoaXMuYVswXVsyXSAqIG0uYVsyXVsxXSArIHRoaXMuYVswXVszXSAqIG0uYVszXVsxXSxcclxuICAgICAgICAgICAgdGhpcy5hWzBdWzBdICogbS5hWzBdWzJdICsgdGhpcy5hWzBdWzFdICogbS5hWzFdWzJdICsgdGhpcy5hWzBdWzJdICogbS5hWzJdWzJdICsgdGhpcy5hWzBdWzNdICogbS5hWzNdWzJdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMF1bMF0gKiBtLmFbMF1bM10gKyB0aGlzLmFbMF1bMV0gKiBtLmFbMV1bM10gKyB0aGlzLmFbMF1bMl0gKiBtLmFbMl1bM10gKyB0aGlzLmFbMF1bM10gKiBtLmFbM11bM10sXHJcbiAgICAgICAgICAgIHRoaXMuYVsxXVswXSAqIG0uYVswXVswXSArIHRoaXMuYVsxXVsxXSAqIG0uYVsxXVswXSArIHRoaXMuYVsxXVsyXSAqIG0uYVsyXVswXSArIHRoaXMuYVsxXVszXSAqIG0uYVszXVswXSxcclxuICAgICAgICAgICAgdGhpcy5hWzFdWzBdICogbS5hWzBdWzFdICsgdGhpcy5hWzFdWzFdICogbS5hWzFdWzFdICsgdGhpcy5hWzFdWzJdICogbS5hWzJdWzFdICsgdGhpcy5hWzFdWzNdICogbS5hWzNdWzFdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMV1bMF0gKiBtLmFbMF1bMl0gKyB0aGlzLmFbMV1bMV0gKiBtLmFbMV1bMl0gKyB0aGlzLmFbMV1bMl0gKiBtLmFbMl1bMl0gKyB0aGlzLmFbMV1bM10gKiBtLmFbM11bMl0sXHJcbiAgICAgICAgICAgIHRoaXMuYVsxXVswXSAqIG0uYVswXVszXSArIHRoaXMuYVsxXVsxXSAqIG0uYVsxXVszXSArIHRoaXMuYVsxXVsyXSAqIG0uYVsyXVszXSArIHRoaXMuYVsxXVszXSAqIG0uYVszXVszXSxcclxuICAgICAgICAgICAgdGhpcy5hWzJdWzBdICogbS5hWzBdWzBdICsgdGhpcy5hWzJdWzFdICogbS5hWzFdWzBdICsgdGhpcy5hWzJdWzJdICogbS5hWzJdWzBdICsgdGhpcy5hWzJdWzNdICogbS5hWzNdWzBdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMl1bMF0gKiBtLmFbMF1bMV0gKyB0aGlzLmFbMl1bMV0gKiBtLmFbMV1bMV0gKyB0aGlzLmFbMl1bMl0gKiBtLmFbMl1bMV0gKyB0aGlzLmFbMl1bM10gKiBtLmFbM11bMV0sXHJcbiAgICAgICAgICAgIHRoaXMuYVsyXVswXSAqIG0uYVswXVsyXSArIHRoaXMuYVsyXVsxXSAqIG0uYVsxXVsyXSArIHRoaXMuYVsyXVsyXSAqIG0uYVsyXVsyXSArIHRoaXMuYVsyXVszXSAqIG0uYVszXVsyXSxcclxuICAgICAgICAgICAgdGhpcy5hWzJdWzBdICogbS5hWzBdWzNdICsgdGhpcy5hWzJdWzFdICogbS5hWzFdWzNdICsgdGhpcy5hWzJdWzJdICogbS5hWzJdWzNdICsgdGhpcy5hWzJdWzNdICogbS5hWzNdWzNdLFxyXG4gICAgICAgICAgICB0aGlzLmFbM11bMF0gKiBtLmFbMF1bMF0gKyB0aGlzLmFbM11bMV0gKiBtLmFbMV1bMF0gKyB0aGlzLmFbM11bMl0gKiBtLmFbMl1bMF0gKyB0aGlzLmFbM11bM10gKiBtLmFbM11bMF0sXHJcbiAgICAgICAgICAgIHRoaXMuYVszXVswXSAqIG0uYVswXVsxXSArIHRoaXMuYVszXVsxXSAqIG0uYVsxXVsxXSArIHRoaXMuYVszXVsyXSAqIG0uYVsyXVsxXSArIHRoaXMuYVszXVszXSAqIG0uYVszXVsxXSxcclxuICAgICAgICAgICAgdGhpcy5hWzNdWzBdICogbS5hWzBdWzJdICsgdGhpcy5hWzNdWzFdICogbS5hWzFdWzJdICsgdGhpcy5hWzNdWzJdICogbS5hWzJdWzJdICsgdGhpcy5hWzNdWzNdICogbS5hWzNdWzJdLFxyXG4gICAgICAgICAgICB0aGlzLmFbM11bMF0gKiBtLmFbMF1bM10gKyB0aGlzLmFbM11bMV0gKiBtLmFbMV1bM10gKyB0aGlzLmFbM11bMl0gKiBtLmFbMl1bM10gKyB0aGlzLmFbM11bM10gKiBtLmFbM11bM10pO1xyXG4gICAgfVxyXG5cclxuICAgIGxpbmVhcml6ZSgpIHtcclxuICAgICAgICByZXR1cm4gW10uY29uY2F0KC4uLnRoaXMuYSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXQ0KFxyXG4gICAgYTAwLCBhMDEsIGEwMiwgYTAzLFxyXG4gICAgYTEwLCBhMTEsIGExMiwgYTEzLFxyXG4gICAgYTIwLCBhMjEsIGEyMiwgYTIzLFxyXG4gICAgYTMwLCBhMzEsIGEzMiwgYTMzXHJcbikge1xyXG4gICAgaWYgKGEwMCA9PSAxICYmIGEwMSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgcmV0dXJuIG5ldyBfbWF0NChcclxuICAgICAgICAgICAgMSwgMCwgMCwgMCxcclxuICAgICAgICAgICAgMCwgMSwgMCwgMCxcclxuICAgICAgICAgICAgMCwgMCwgMSwgMCxcclxuICAgICAgICAgICAgMCwgMCwgMCwgMSk7XHJcbiAgICBpZiAodHlwZW9mIGEwMCA9PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIHJldHVybiBuZXcgX21hdDQoXHJcbiAgICAgICAgICAgIGEwMFswXVswXSwgYTAwWzBdWzFdLCBhMDBbMF1bMl0sIGEwMFswXVszXSxcclxuICAgICAgICAgICAgYTAwWzFdWzBdLCBhMDBbMV1bMV0sIGEwMFsxXVsyXSwgYTAwWzFdWzNdLFxyXG4gICAgICAgICAgICBhMDBbMl1bMF0sIGEwMFsyXVsxXSwgYTAwWzJdWzJdLCBhMDBbMl1bM10sXHJcbiAgICAgICAgICAgIGEwMFszXVswXSwgYTAwWzNdWzFdLCBhMDBbM11bMl0sIGEwMFszXVszXVxyXG4gICAgICAgICk7XHJcbiAgICByZXR1cm4gbmV3IF9tYXQ0KFxyXG4gICAgICAgIGEwMCwgYTAxLCBhMDIsIGEwMyxcclxuICAgICAgICBhMTAsIGExMSwgYTEyLCBhMTMsXHJcbiAgICAgICAgYTIwLCBhMjEsIGEyMiwgYTIzLFxyXG4gICAgICAgIGEzMCwgYTMxLCBhMzIsIGEzM1xyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1hdHJSb3RhdGUoYW5nbGUsIGF4aXMpIHtcclxuICAgIGxldFxyXG4gICAgICAgIGEgPSBhbmdsZSAvIE1hdGguUEkgKiAxODAuMCxcclxuICAgICAgICBzaSA9IE1hdGguc2luKGFuZ2xlKSwgY28gPSBNYXRoLmNvcyhhbmdsZSksXHJcbiAgICAgICAgdiA9IGF4aXMubm9ybSgpO1xyXG5cclxuICAgIHJldHVybiBtYXQ0KFxyXG4gICAgICAgIGNvICsgdi54ICogdi54ICogKDEgLSBjbyksXHJcbiAgICAgICAgdi54ICogdi55ICogKDEgLSBjbykgKyB2LnogKiBzaSxcclxuICAgICAgICB2LnggKiB2LnogKiAoMSAtIGNvKSAtIHYueSAqIHNpLFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgdi55ICogdi54ICogKDEgLSBjbykgLSB2LnogKiBzaSxcclxuICAgICAgICBjbyArIHYueSAqIHYueSAqICgxIC0gY28pLFxyXG4gICAgICAgIHYueSAqIHYueiAqICgxIC0gY28pICsgdi54ICogc2ksXHJcbiAgICAgICAgMCxcclxuICAgICAgICB2LnogKiB2LnggKiAoMSAtIGNvKSArIHYueSAqIHNpLFxyXG4gICAgICAgIHYueiAqIHYueSAqICgxIC0gY28pIC0gdi54ICogc2ksXHJcbiAgICAgICAgY28gKyB2LnogKiB2LnogKiAoMSAtIGNvKSxcclxuICAgICAgICAwLCAwLCAwLCAwLCAxXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0clRyYW5zbGF0ZSh0KSB7XHJcbiAgICByZXR1cm4gbWF0NChcclxuICAgICAgICAxLCAwLCAwLCAwLFxyXG4gICAgICAgIDAsIDEsIDAsIDAsXHJcbiAgICAgICAgMCwgMCwgMSwgMCxcclxuICAgICAgICB0LngsIHQueSwgdC56LCAxXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0clNjYWxlKHMpIHtcclxuICAgIHJldHVybiBtYXQ0KFxyXG4gICAgICAgIHMueCwgMCwgMCwgMCxcclxuICAgICAgICAwLCBzLnksIDAsIDAsXHJcbiAgICAgICAgMCwgMCwgcy56LCAwLFxyXG4gICAgICAgIDAsIDAsIDAsIDFcclxuICAgIClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1hdHJGcnVzdHVtKGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKSB7XHJcbiAgICByZXR1cm4gbWF0NChcclxuICAgICAgICAyICogbmVhciAvIChyaWdodCAtIGxlZnQpLCAwLCAwLCAwLFxyXG4gICAgICAgIDAsIDIgKiBuZWFyIC8gKHRvcCAtIGJvdHRvbSksIDAsIDAsXHJcbiAgICAgICAgKHJpZ2h0ICsgbGVmdCkgLyAocmlnaHQgLSBsZWZ0KSwgKHRvcCArIGJvdHRvbSkgLyAodG9wIC0gYm90dG9tKSwgLShmYXIgKyBuZWFyKSAvIChmYXIgLSBuZWFyKSwgLTEsXHJcbiAgICAgICAgMCwgMCwgLTIgKiBuZWFyICogZmFyIC8gKGZhciAtIG5lYXIpLCAwXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0clZpZXcobG9jLCBhdCwgdXAxKSB7XHJcbiAgICBsZXRcclxuICAgICAgICBkaXIgPSBhdC5zdWIobG9jKS5ub3JtKCksXHJcbiAgICAgICAgcmlnaHQgPSBkaXIuY3Jvc3ModXAxKS5ub3JtKCksXHJcbiAgICAgICAgdXAgPSByaWdodC5jcm9zcyhkaXIpLm5vcm0oKTtcclxuICAgIHJldHVybiBtYXQ0KFxyXG4gICAgICAgIHJpZ2h0LngsIHVwLngsIC1kaXIueCwgMCxcclxuICAgICAgICByaWdodC55LCB1cC55LCAtZGlyLnksIDAsXHJcbiAgICAgICAgcmlnaHQueiwgdXAueiwgLWRpci56LCAwLFxyXG4gICAgICAgIC1sb2MuZG90KHJpZ2h0KSwgLWxvYy5kb3QodXApLCBsb2MuZG90KGRpciksIDFcclxuICAgICk7XHJcbn0iLCJleHBvcnQgY2xhc3MgU2hhZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHJuZCwgbmFtZSkge1xyXG4gICAgICAgIHRoaXMucm5kID0gcm5kO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5wcmcgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2luaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBfaW5pdCgpIHtcclxuICAgICAgICB0aGlzLnNoYWRlcnMgPVxyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogdGhpcy5ybmQuZ2wuVkVSVEVYX1NIQURFUixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZlcnRcIixcclxuICAgICAgICAgICAgICAgICAgICBzcmM6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMucm5kLmdsLkZSQUdNRU5UX1NIQURFUixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZyYWdcIixcclxuICAgICAgICAgICAgICAgICAgICBzcmM6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgZm9yIChjb25zdCBzIG9mIHRoaXMuc2hhZGVycykge1xyXG4gICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgYmluL3NoYWRlcnMvJHt0aGlzLm5hbWV9LyR7cy5uYW1lfS5nbHNsYCk7XHJcbiAgICAgICAgICAgIGxldCBzcmMgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3JjID09IFwic3RyaW5nXCIgJiYgc3JjICE9IFwiXCIpXHJcbiAgICAgICAgICAgICAgICBzLnNyYyA9IHNyYztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcmVjb21waWxlIHNoYWRlcnNcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlcnNTb3VyY2UoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTaGFkZXJzU291cmNlKCkge1xyXG4gICAgICAgIHRoaXMuc2hhZGVyc1swXS5pZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zaGFkZXJzWzFdLmlkID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2hhZGVyc1swXS5zcmMgPT0gXCJcIiB8fCB0aGlzLnNoYWRlcnNbMV0uc3JjID09IFwiXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLnNoYWRlcnMuZm9yRWFjaChzID0+IHtcclxuICAgICAgICAgICAgcy5pZCA9IHRoaXMucm5kLmdsLmNyZWF0ZVNoYWRlcihzLnR5cGUpO1xyXG4gICAgICAgICAgICB0aGlzLnJuZC5nbC5zaGFkZXJTb3VyY2Uocy5pZCwgcy5zcmMpO1xyXG4gICAgICAgICAgICB0aGlzLnJuZC5nbC5jb21waWxlU2hhZGVyKHMuaWQpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucm5kLmdsLmdldFNoYWRlclBhcmFtZXRlcihzLmlkLCB0aGlzLnJuZC5nbC5DT01QSUxFX1NUQVRVUykpIHtcclxuICAgICAgICAgICAgICAgIGxldCBidWYgPSB0aGlzLnJuZC5nbC5nZXRTaGFkZXJJbmZvTG9nKHMuaWQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFNoYWRlciAke3RoaXMubmFtZX0vJHtzLm5hbWV9IGNvbXBpbGUgZmFpbDogJHtidWZ9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnByZyA9IHRoaXMucm5kLmdsLmNyZWF0ZVByb2dyYW0oKTtcclxuICAgICAgICB0aGlzLnNoYWRlcnMuZm9yRWFjaChzID0+IHtcclxuICAgICAgICAgICAgaWYgKHMuaWQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMucm5kLmdsLmF0dGFjaFNoYWRlcih0aGlzLnByZywgcy5pZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5ybmQuZ2wubGlua1Byb2dyYW0odGhpcy5wcmcpO1xyXG4gICAgICAgIGlmICghdGhpcy5ybmQuZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLnByZywgdGhpcy5ybmQuZ2wuTElOS19TVEFUVVMpKSB7XHJcbiAgICAgICAgICAgIGxldCBidWYgPSB0aGlzLnJuZC5nbC5nZXRQcm9ncmFtSW5mb0xvZyh0aGlzLnByZyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBTaGFkZXIgcHJvZ3JhbSAke3RoaXMubmFtZX0gbGluayBmYWlsOiAke2J1Zn1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU2hhZGVyRGF0YSgpIHtcclxuICAgICAgICB0aGlzLnBvc0xvYyA9IHRoaXMucm5kLmdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMucHJnLCBcIkluUG9zaXRpb25cIik7XHJcbiAgICAgICAgdGhpcy5ub3JtTG9jID0gdGhpcy5ybmQuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5wcmcsIFwiSW5Ob3JtYWxcIik7XHJcbiAgICAgICAgdGhpcy50ZXhMb2MgPSB0aGlzLnJuZC5nbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnByZywgXCJJblRleENvb3JkXCIpO1xyXG5cclxuICAgICAgICAvLyBTaGFkZXIgdW5pZm9ybXNcclxuICAgICAgICB0aGlzLnVuaWZvcm1zID0ge307XHJcbiAgICAgICAgY29uc3QgY291bnRVbmlmb3JtcyA9IHRoaXMucm5kLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5wcmcsIHRoaXMucm5kLmdsLkFDVElWRV9VTklGT1JNUyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudFVuaWZvcm1zOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgaW5mbyA9IHRoaXMucm5kLmdsLmdldEFjdGl2ZVVuaWZvcm0odGhpcy5wcmcsIGkpO1xyXG4gICAgICAgICAgICB0aGlzLnVuaWZvcm1zW2luZm8ubmFtZV0gPSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBpbmZvLm5hbWUsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBpbmZvLnR5cGUsXHJcbiAgICAgICAgICAgICAgICBzaXplOiBpbmZvLnNpemUsXHJcbiAgICAgICAgICAgICAgICBsb2M6IHRoaXMucm5kLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnByZywgaW5mby5uYW1lKSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNoYWRlciB1bmlmb3JtIGJsb2Nrc1xyXG4gICAgICAgIHRoaXMudW5pZm9ybUJsb2NrcyA9IHt9O1xyXG4gICAgICAgIGNvbnN0IGNvdW50VW5pZm9ybUJsb2NrcyA9IHRoaXMucm5kLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5wcmcsIHRoaXMucm5kLmdsLkFDVElWRV9VTklGT1JNX0JMT0NLUyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudFVuaWZvcm1CbG9ja3M7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBibG9ja19uYW1lID0gdGhpcy5ybmQuZ2wuZ2V0QWN0aXZlVW5pZm9ybUJsb2NrTmFtZSh0aGlzLnByZywgaSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5ybmQuZ2wuZ2V0VW5pZm9ybUJsb2NrSW5kZXgodGhpcy5wcmcsIGJsb2NrX25hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLnVuaWZvcm1CbG9ja3NbYmxvY2tfbmFtZV0gPSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBibG9ja19uYW1lLFxyXG4gICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogdGhpcy5ybmQuZ2wuZ2V0QWN0aXZlVW5pZm9ybUJsb2NrUGFyYW1ldGVyKHRoaXMucHJnLCBpbmRleCwgdGhpcy5ybmQuZ2wuVU5JRk9STV9CTE9DS19EQVRBX1NJWkUpLFxyXG4gICAgICAgICAgICAgICAgYmluZDogdGhpcy5ybmQuZ2wuZ2V0QWN0aXZlVW5pZm9ybUJsb2NrUGFyYW1ldGVyKHRoaXMucHJnLCBpbmRleCwgdGhpcy5ybmQuZ2wuVU5JRk9STV9CTE9DS19CSU5ESU5HKSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucm5kLm1hdHJpeFVCTy5hcHBseSh0aGlzKTtcclxuICAgICAgICB0aGlzLnJuZC5wcmltVUJPLmFwcGx5KHRoaXMpO1xyXG4gICAgICAgIHRoaXMucm5kLnRpbWVVQk8uYXBwbHkodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJnICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5ybmQuZ2wudXNlUHJvZ3JhbSh0aGlzLnByZyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTaGFkZXIgfSBmcm9tIFwiLi9zaGQuanNcIlxyXG5cclxuY2xhc3MgX2J1ZmZlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihybmQsIHR5cGUsIHNpemUpIHtcclxuICAgICAgICB0aGlzLnJuZCA9IHJuZDtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlOyAgICAvLyBCdWZmZXIgdHlwZSAoZ2wuKioqX0JVRkZFUilcclxuICAgICAgICB0aGlzLnNpemUgPSBzaXplOyAgICAvLyBCdWZmZXIgc2l6ZSBpbiBieXRlc1xyXG4gICAgICAgIHRoaXMuaWQgPSBudWxsO1xyXG4gICAgICAgIGlmIChzaXplID09IDAgfHwgdHlwZSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLmlkID0gcm5kLmdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgICAgIHRoaXMucm5kLmdsLmJpbmRCdWZmZXIodHlwZSwgdGhpcy5pZCk7XHJcbiAgICAgICAgdGhpcy5ybmQuZ2wuYnVmZmVyRGF0YSh0eXBlLCBzaXplLCBybmQuZ2wuU1RBVElDX0RSQVcpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5ybmQuZ2wuYmluZEJ1ZmZlcih0aGlzLnR5cGUsIHRoaXMuaWQpO1xyXG4gICAgICAgIHRoaXMucm5kLmdsLmJ1ZmZlclN1YkRhdGEodGhpcy50eXBlLCAwLCBkYXRhKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFVuaWZvcm1CdWZmZXIgZXh0ZW5kcyBfYnVmZmVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHJuZCwgbmFtZSwgc2l6ZSwgYmluZFBvaW50KSB7XHJcbiAgICAgICAgc3VwZXIocm5kLCBybmQuZ2wuVU5JRk9STV9CVUZGRVIsIHNpemUpO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5iaW5kUG9pbnQgPSBiaW5kUG9pbnQ7IC8vIEJ1ZmZlciBHUFUgYmluZGluZyBwb2ludFxyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5KHNoZCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJuZCA9PSB1bmRlZmluZWQgfHwgc2hkLnByZyA9PSB1bmRlZmluZWQgfHwgc2hkLnVuaWZvcm1CbG9ja3NbdGhpcy5uYW1lXSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBzaGQucm5kLmdsLnVuaWZvcm1CbG9ja0JpbmRpbmcoc2hkLnByZywgc2hkLnVuaWZvcm1CbG9ja3NbdGhpcy5uYW1lXS5pbmRleCwgdGhpcy5iaW5kUG9pbnQpO1xyXG4gICAgICAgIHNoZC5ybmQuZ2wuYmluZEJ1ZmZlckJhc2Uoc2hkLnJuZC5nbC5VTklGT1JNX0JVRkZFUiwgdGhpcy5iaW5kUG9pbnQsIHRoaXMuaWQpO1xyXG4gICAgfVxyXG59IiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLyBUaW1lciBjbGFzcyBtb2R1bGVcclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuZXhwb3J0IGNsYXNzIFRpbWVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkgeyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5nbG9iYWxUaW1lID0gdGhpcy5sb2NhbFRpbWUgPSB0aGlzLmdldFRpbWUoKTtcclxuICAgICAgICB0aGlzLmdsb2JhbERlbHRhVGltZSA9IHRoaXMubG9jYWxEZWx0YVRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gdGhpcy5vbGRUaW1lID0gdGhpcy5vbGRUaW1lRlBTID0gdGhpcy5nbG9iYWxUaW1lO1xyXG4gICAgICAgIHRoaXMuZnJhbWVDb3VudGVyID0gMDtcclxuICAgICAgICB0aGlzLmlzUGF1c2UgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkZQUyA9IDMwLjA7XHJcbiAgICAgICAgdGhpcy5wYXVzZVRpbWUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEdldCBjdXJyZW50IGdsb2JhbCB0aW1lIGZ1bnRpb25cclxuICAgIGdldFRpbWUoKSB7XHJcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgbGV0IHQgPVxyXG4gICAgICAgICAgICBkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8gMTAwMC4wICtcclxuICAgICAgICAgICAgZGF0ZS5nZXRTZWNvbmRzKCkgK1xyXG4gICAgICAgICAgICBkYXRlLmdldE1pbnV0ZXMoKSAqIDYwO1xyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBHZXQgY3VycmVudCBGUFMgZnVuY3Rpb25cclxuICAgIGdldEZQUygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5GUFMudG9GaXhlZCgzKTtcclxuICAgIH1cclxuXHJcbiAgICBwYXVzZUVuYmFsZSgpIHtcclxuICAgICAgICB0aGlzLmlzUGF1c2UgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHBhdXNlRGlzYWJsZSgpIHtcclxuICAgICAgICB0aGlzLmlzUGF1c2UgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwYXVzZVN3aXRjaCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1BhdXNlID09IGZhbHNlKVxyXG4gICAgICAgICAgICB0aGlzLmlzUGF1c2UgPSB0cnVlO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5pc1BhdXNlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVwb25zZSB0aW1lciBmdW5jdGlvblxyXG4gICAgcmVzcG9uc2UodGFnX2lkID0gbnVsbCkge1xyXG4gICAgICAgIGxldCB0ID0gdGhpcy5nZXRUaW1lKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2xvYmFsVGltZSA9IHQ7XHJcbiAgICAgICAgdGhpcy5nbG9iYWxEZWx0YVRpbWUgPSB0IC0gdGhpcy5vbGRUaW1lO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1BhdXNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9jYWxEZWx0YVRpbWUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnBhdXNlVGltZSArPSB0IC0gdGhpcy5vbGRUaW1lO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9jYWxEZWx0YVRpbWUgPSB0aGlzLmdsb2JhbERlbHRhVGltZTtcclxuICAgICAgICAgICAgdGhpcy5sb2NhbFRpbWUgPSB0IC0gdGhpcy5wYXVzZVRpbWUgLSB0aGlzLnN0YXJ0VGltZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZnJhbWVDb3VudGVyKys7XHJcbiAgICAgICAgaWYgKHQgLSB0aGlzLm9sZFRpbWVGUFMgPiAzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuRlBTID0gdGhpcy5mcmFtZUNvdW50ZXIgLyAodCAtIHRoaXMub2xkVGltZUZQUyk7XHJcbiAgICAgICAgICAgIHRoaXMub2xkVGltZUZQUyA9IHQ7XHJcbiAgICAgICAgICAgIHRoaXMuZnJhbWVDb3VudGVyID0gMDtcclxuICAgICAgICAgICAgaWYgKHRhZ19pZCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFnX2lkKS5pbm5lckhUTUwgPSB0aGlzLmdldEZQUygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vbGRUaW1lID0gdDtcclxuICAgIH07XHJcbn0iLCJpbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4uL210aC92ZWMzLmpzXCJcclxuaW1wb3J0IHsgbWF0NCwgbWF0ckZydXN0dW0sIG1hdHJWaWV3IH0gZnJvbSBcIi4uL210aC9tYXQ0LmpzXCJcclxuaW1wb3J0IHsgVW5pZm9ybUJ1ZmZlciB9IGZyb20gXCIuL3Jlcy9idWYuanNcIlxyXG5pbXBvcnQgeyBUaW1lciB9IGZyb20gXCIuLi90aW1lci90aW1lci5qc1wiXHJcblxyXG4vLyBHZW5lcmFsIGNsYXNzIGZvciByZW5kZXJpbmcuXHJcbi8vIE9uZSByZW5kZXIgcGVyIGNhbnZhcy5cclxuZXhwb3J0IGNsYXNzIFJlbmRlciB7XHJcbiAgICBzZXRGcnVzdHVtKCkge1xyXG4gICAgICAgIGxldCBtID0gbWF0NCgxKTtcclxuICAgICAgICBsZXQgcnggPSB0aGlzLnByb2pTaXplLCByeSA9IHRoaXMucHJvalNpemU7XHJcblxyXG4gICAgICAgIC8qIENvcnJlY3QgYXNwZWN0IHJhdGlvICovXHJcbiAgICAgICAgaWYgKHRoaXMud2lkdGggPj0gdGhpcy5oZWlnaHQpXHJcbiAgICAgICAgICAgIHJ4ICo9IHRoaXMud2lkdGggLyB0aGlzLmhlaWdodDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJ5ICo9IHRoaXMuaGVpZ2h0IC8gdGhpcy53aWR0aDtcclxuXHJcbiAgICAgICAgdGhpcy5tYXRyUHJvaiA9IG1hdHJGcnVzdHVtKC1yeCAvIDIsIHJ4IC8gMiwgLXJ5IC8gMiwgcnkgLyAyLCB0aGlzLnByb2pEaXN0LCB0aGlzLmZhckNsaXApO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENhbShsb2MsIGF0LCB1cCkge1xyXG4gICAgICAgIHRoaXMubWF0clZpZXcgPSBtYXRyVmlldyhsb2MsIGF0LCB1cCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlTWF0cml4ZXMoKSB7XHJcbiAgICAgICAgdGhpcy5tYXRyaXhVQk8udXBkYXRlKG5ldyBGbG9hdDMyQXJyYXkodGhpcy5tYXRyUHJvai5saW5lYXJpemUoKS5jb25jYXQodGhpcy5tYXRyVmlldy5saW5lYXJpemUoKSkpKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTdGFydCgpIHtcclxuICAgICAgICAvL3RoaXMudGltZXIucmVzcG9uc2UoKTtcclxuICAgICAgICAvL3RoaXMudGltZVVCTy51cGRhdGUobmV3IEZsb2F0MzJBcnJheShbdGhpcy50aW1lci5sb2NhbFRpbWUsIHRoaXMudGltZXIubG9jYWxEZWx0YVRpbWUsIHRoaXMudGltZXIuZ2xvYmFsVGltZSwgdGhpcy50aW1lci5nbG9iYWxEZWx0YVRpbWVdKSk7XHJcbiAgICAgICAgdGhpcy5nbC5jbGVhcih0aGlzLmdsLkNPTE9SX0JVRkZFUl9CSVQpO1xyXG4gICAgICAgIHRoaXMuZ2wuY2xlYXIodGhpcy5nbC5ERVBUSF9CVUZGRVJfQklUKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMpIHtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuXHJcbiAgICAgICAgLy8gRGVmYXVsdCBjYW1lcmEgcHJvcGVydGllc1xyXG4gICAgICAgIHRoaXMucHJvalNpemUgPSAwLjE7XHJcbiAgICAgICAgdGhpcy5wcm9qRGlzdCA9IDAuMTtcclxuICAgICAgICB0aGlzLmZhckNsaXAgPSAzMDA7XHJcblxyXG4gICAgICAgIC8vIEV2YWx1YXRpbmcgY2FudmFzIHNpemVcclxuICAgICAgICBsZXQgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICB0aGlzLndpZHRoID0gcmVjdC5yaWdodCAtIHJlY3QubGVmdCArIDE7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSByZWN0LmJvdHRvbSAtIHJlY3QudG9wICsgMTtcclxuXHJcbiAgICAgICAgLy8gR2V0dGluZyBHTCBjb250ZXh0XHJcbiAgICAgICAgdGhpcy5nbCA9IGNhbnZhcy5nZXRDb250ZXh0KFwid2ViZ2wyXCIpO1xyXG4gICAgICAgIHRoaXMuZ2wuY2xlYXJDb2xvcigwLjksIDAuOSwgMC45LCAxKTtcclxuICAgICAgICB0aGlzLmdsLmVuYWJsZSh0aGlzLmdsLkRFUFRIX1RFU1QpO1xyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXppbmcgY2FtZXJhXHJcbiAgICAgICAgdGhpcy5zZXRGcnVzdHVtKCk7XHJcbiAgICAgICAgdGhpcy5zZXRDYW0odmVjMygwLCAwLCAwKSwgdmVjMygwLCAwLCAtMSksIHZlYzMoMCwgMSwgMCkpO1xyXG4gICAgICAgIHRoaXMubWF0cml4VUJPID0gbmV3IFVuaWZvcm1CdWZmZXIodGhpcywgXCJ1X2NhbWVyYVwiLCAxNiAqIDQgKiAyLCAwKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1hdHJpeGVzKCk7XHJcblxyXG4gICAgICAgIC8vIEluaXRpYWxpemluZyBwcmltIHVib1xyXG4gICAgICAgIHRoaXMucHJpbVVCTyA9IG5ldyBVbmlmb3JtQnVmZmVyKHRoaXMsIFwidV9wcmltaXRpdmVcIiwgMTYgKiA0LCAxKTtcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6aW5nIHRpbWVyXHJcbiAgICAgICAgdGhpcy50aW1lciA9IG5ldyBUaW1lcigpO1xyXG4gICAgICAgIHRoaXMudGltZVVCTyA9IG5ldyBVbmlmb3JtQnVmZmVyKHRoaXMsIFwidV90aW1lXCIsIDE2LCAyKTtcclxuICAgIH1cclxufVxyXG5cclxuIiwiY2xhc3MgX3ZlYzIge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZlYzIoeCwgeSkge1xyXG4gICAgaWYgKHkgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHJldHVybiBuZXcgX3ZlYzIoeCwgeCk7XHJcbiAgICByZXR1cm4gbmV3IF92ZWMyKHgsIHkpO1xyXG59IiwiaW1wb3J0IHsgUmVuZGVyIH0gZnJvbSBcIi4uL3JuZC5qc1wiXHJcbmltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vLi4vbXRoL3ZlYzMuanNcIlxyXG5pbXBvcnQgeyB2ZWMyIH0gZnJvbSBcIi4uLy4uL210aC92ZWMyLmpzXCJcclxuaW1wb3J0IHsgbWF0NCwgbWF0ckZydXN0dW0gfSBmcm9tIFwiLi4vLi4vbXRoL21hdDQuanNcIlxyXG5pbXBvcnQgeyBTaGFkZXIgfSBmcm9tIFwiLi4vcmVzL3NoZC5qc1wiXHJcblxyXG5jbGFzcyBfdmVydGV4IHtcclxuICAgIGNvbnN0cnVjdG9yKHBvcywgbm9ybSwgdGV4KSB7XHJcbiAgICAgICAgdGhpcy5wb3MgPSBwb3M7XHJcbiAgICAgICAgdGhpcy5ub3JtID0gbm9ybTtcclxuICAgICAgICB0aGlzLnRleCA9IHRleDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZlcnRleChwb3MsIG5vcm0sIHRleCkge1xyXG4gICAgaWYgKHRleCA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgcmV0dXJuIG5ldyBfdmVydGV4KHBvcywgbm9ybSwgdmVjMigwKSk7XHJcbiAgICByZXR1cm4gbmV3IF92ZXJ0ZXgocG9zLCBub3JtLCB0ZXgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXV0b05vcm1hbHModmVydGV4ZXMsIGluZGljaWVzKSB7XHJcbiAgICBsZXQgaTtcclxuXHJcbiAgICAvKiBTZXQgYWxsIHZlcnRleCBub3JtYWxzIHRvIHplcm8gKi9cclxuICAgIGZvciAoaSA9IDA7IGkgPCB2ZXJ0ZXhlcy5sZW5ndGg7IGkrKylcclxuICAgICAgICB2ZXJ0ZXhlc1tpXS5ub3JtID0gdmVjMygwKTtcclxuXHJcbiAgICAvKiBFdmFsIG5vcm1hbCBmb3IgZXZlcnkgZmFjZXQgKi9cclxuICAgIGZvciAoaSA9IDA7IGkgPCBpbmRpY2llcy5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICAgIGxldFxyXG4gICAgICAgICAgICBuMCA9IGluZGljaWVzW2ldLCBuMSA9IGluZGljaWVzW2kgKyAxXSwgbjIgPSBpbmRpY2llc1tpICsgMl07XHJcbiAgICAgICAgbGV0XHJcbiAgICAgICAgICAgIHAwID0gdmVydGV4ZXNbbjBdLnBvcyxcclxuICAgICAgICAgICAgcDEgPSB2ZXJ0ZXhlc1tuMV0ucG9zLFxyXG4gICAgICAgICAgICBwMiA9IHZlcnRleGVzW24yXS5wb3MsXHJcbiAgICAgICAgICAgIE4gPSBwMS5zdWIocDApLmNyb3NzKHAyLnN1YihwMCkpLm5vcm0oKTtcclxuXHJcbiAgICAgICAgdmVydGV4ZXNbbjBdLm5vcm0gPSB2ZXJ0ZXhlc1tuMF0ubm9ybS5hZGQoTik7XHJcbiAgICAgICAgdmVydGV4ZXNbbjFdLm5vcm0gPSB2ZXJ0ZXhlc1tuMV0ubm9ybS5hZGQoTik7XHJcbiAgICAgICAgdmVydGV4ZXNbbjJdLm5vcm0gPSB2ZXJ0ZXhlc1tuMl0ubm9ybS5hZGQoTik7XHJcbiAgICB9XHJcblxyXG4gICAgLyogTm9ybWFsaXplIGFsbCB2ZXJ0ZXggbm9ybWFscyAqL1xyXG4gICAgZm9yIChpID0gMDsgaSA8IHZlcnRleGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmVydGV4ZXNbaV0ubm9ybSA9IHZlcnRleGVzW2ldLm5vcm0ubm9ybSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUHJpbSB7XHJcbiAgICBjcmVhdGUoc2hkLCB2ZXJ0ZXhlcywgaW5kaWNpZXMpIHtcclxuICAgICAgICBsZXQgdHJpbWFzaCA9IFtdLCBpID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcyA9IFsuLi52ZXJ0ZXhlc107XHJcbiAgICAgICAgdGhpcy5pbmRpY2llcyA9IFsuLi5pbmRpY2llc107XHJcbiAgICAgICAgdGhpcy5zaGQgPSBzaGQ7XHJcbiAgICAgICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5zaGQucHJnICE9IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgYXV0b05vcm1hbHModmVydGV4ZXMsIGluZGljaWVzKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgdiBvZiB2ZXJ0ZXhlcykge1xyXG4gICAgICAgICAgICB0cmltYXNoW2krK10gPSB2LnBvcy54O1xyXG4gICAgICAgICAgICB0cmltYXNoW2krK10gPSB2LnBvcy55O1xyXG4gICAgICAgICAgICB0cmltYXNoW2krK10gPSB2LnBvcy56O1xyXG4gICAgICAgICAgICB0cmltYXNoW2krK10gPSB2Lm5vcm0ueDtcclxuICAgICAgICAgICAgdHJpbWFzaFtpKytdID0gdi5ub3JtLnk7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYubm9ybS56O1xyXG4gICAgICAgICAgICB0cmltYXNoW2krK10gPSB2LnRleC54O1xyXG4gICAgICAgICAgICB0cmltYXNoW2krK10gPSB2LnRleC55O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhBcnJheUlkID0gc2hkLnJuZC5nbC5jcmVhdGVWZXJ0ZXhBcnJheSgpO1xyXG4gICAgICAgIHNoZC5ybmQuZ2wuYmluZFZlcnRleEFycmF5KHRoaXMudmVydGV4QXJyYXlJZCk7XHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhCdWZmZXJJZCA9IHNoZC5ybmQuZ2wuY3JlYXRlQnVmZmVyKCk7XHJcblxyXG4gICAgICAgIHNoZC5ybmQuZ2wuYmluZEJ1ZmZlcihzaGQucm5kLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy52ZXJ0ZXhCdWZmZXJJZCk7XHJcbiAgICAgICAgc2hkLnJuZC5nbC5idWZmZXJEYXRhKHNoZC5ybmQuZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHRyaW1hc2gpLCBzaGQucm5kLmdsLlNUQVRJQ19EUkFXKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucG9zTG9jICE9IC0xICYmIHRoaXMubm9ybUxvYyAhPSAtMSkge1xyXG4gICAgICAgICAgICBzaGQucm5kLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIoc2hkLnBvc0xvYywgMywgc2hkLnJuZC5nbC5GTE9BVCwgZmFsc2UsIDMyLCAwKTtcclxuICAgICAgICAgICAgc2hkLnJuZC5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShzaGQucG9zTG9jKTtcclxuICAgICAgICAgICAgc2hkLnJuZC5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHNoZC5ub3JtTG9jLCAzLCBzaGQucm5kLmdsLkZMT0FULCBmYWxzZSwgMzIsIDEyKTtcclxuICAgICAgICAgICAgc2hkLnJuZC5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShzaGQubm9ybUxvYyk7XHJcbiAgICAgICAgICAgIHNoZC5ybmQuZ2wudmVydGV4QXR0cmliUG9pbnRlcihzaGQudGV4TG9jLCAyLCBzaGQucm5kLmdsLkZMT0FULCBmYWxzZSwgMzIsIDI0KTtcclxuICAgICAgICAgICAgc2hkLnJuZC5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShzaGQudGV4TG9jKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuSW5kZXhCdWZmZXJJZCA9IHNoZC5ybmQuZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICAgICAgc2hkLnJuZC5nbC5iaW5kQnVmZmVyKHNoZC5ybmQuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuSW5kZXhCdWZmZXJJZCk7XHJcbiAgICAgICAgc2hkLnJuZC5nbC5idWZmZXJEYXRhKHNoZC5ybmQuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG5ldyBVaW50MzJBcnJheShpbmRpY2llcyksIHNoZC5ybmQuZ2wuU1RBVElDX0RSQVcpO1xyXG5cclxuICAgICAgICB0aGlzLm51bU9mRWxlbWVudHMgPSBpbmRpY2llcy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IobXRsLCB2ZXJ0ZXhlcywgaW5kaWNpZXMpIHtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IG1hdDQoMSk7XHJcbiAgICAgICAgaWYgKGluZGljaWVzID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLm10bCA9IG10bDtcclxuICAgICAgICAgICAgdGhpcy5zaGQgPSBtdGwuc2hkO1xyXG4gICAgICAgICAgICB0aGlzLmZyb21PYmoobXRsLCB2ZXJ0ZXhlcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tdGwgPSBtdGw7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlKG10bC5zaGQsIHZlcnRleGVzLCBpbmRpY2llcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih3b3JsZCkge1xyXG5cclxuICAgICAgICAvLyBSZWNyZWF0aW5nIHByaW1pdGl2ZSBpZiBpdCB3YXNuJ3QgY3JlYXRlZFxyXG4gICAgICAgIC8vIChiZWNhdXNlIG9mIHNoYWRlciBhc3luYyBpbml0aWFsaXphdGlvbilcclxuICAgICAgICBpZiAodGhpcy5zaGQucHJnICE9IG51bGwgJiYgdGhpcy5sb2FkZWQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGUodGhpcy5zaGQsIHRoaXMudmVydGV4ZXMsIHRoaXMuaW5kaWNpZXMpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEcmF3aW5nIHByaW1pdGl2ZSBpZiBzaGFkZXIgaXMgbG9hZGVkXHJcbiAgICAgICAgaWYgKHRoaXMubXRsLmFwcGx5KCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGQucm5kLnByaW1VQk8udXBkYXRlKG5ldyBGbG9hdDMyQXJyYXkodGhpcy50cmFuc2Zvcm0ubXVsKHdvcmxkKS5saW5lYXJpemUoKSkpO1xyXG4gICAgICAgICAgICB0aGlzLnNoZC5ybmQuZ2wuYmluZFZlcnRleEFycmF5KHRoaXMudmVydGV4QXJyYXlJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hkLnJuZC5nbC5iaW5kQnVmZmVyKHRoaXMuc2hkLnJuZC5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5JbmRleEJ1ZmZlcklkKTtcclxuICAgICAgICAgICAgdGhpcy5zaGQucm5kLmdsLmRyYXdFbGVtZW50cyh0aGlzLnNoZC5ybmQuZ2wuVFJJQU5HTEVTLCB0aGlzLm51bU9mRWxlbWVudHMsIHRoaXMuc2hkLnJuZC5nbC5VTlNJR05FRF9JTlQsIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmcm9tT2JqKG10bCwgZmlsZU5hbWUpIHtcclxuICAgICAgICBsZXQgdnR4ID0gW107XHJcbiAgICAgICAgbGV0IGZpbGUgPSBhd2FpdCBmZXRjaChgYmluL21vZGVscy8ke2ZpbGVOYW1lfS5vYmpgKTtcclxuICAgICAgICBsZXQgc3JjID0gYXdhaXQgZmlsZS50ZXh0KCk7XHJcbiAgICAgICAgbGV0IGxpbmVzID0gc3JjLnNwbGl0KCdcXG4nKTtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaW5kaWNpZXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBsaW5lIG9mIGxpbmVzKSB7XHJcbiAgICAgICAgICAgIGlmIChsaW5lWzBdID09ICd2Jykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRva3MgPSBsaW5lLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdiA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9rcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0b2tzW2ldID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA0OyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgdi5wdXNoKHBhcnNlRmxvYXQodG9rc1tpXSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZ0eC5wdXNoKHZlYzModlswXSwgdlsxXSwgdlsyXSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKHZlcnRleCh2ZWMzKHZbMF0sIHZbMV0sIHZbMl0pKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluZVswXSA9PSAnZicpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0b2tzID0gbGluZS5zcGxpdCgnICcpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHZlcnRzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdCA9IDE7IHQgPCA0OyB0KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdiA9IHZlcnRleCh2dHhbcGFyc2VJbnQodG9rc1t0XS5zcGxpdCgnLycpWzBdKSAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGljaWVzLnB1c2gocGFyc2VJbnQodG9rc1t0XS5zcGxpdCgnLycpWzBdKSAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy52ZXJ0ZXhlcy5wdXNoKHYpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdGhpcy5pbmRpY2llcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52ZXJ0ZXhlcy5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgdGhpcy5pbmRpY2llcy5wdXNoKGkpO1xyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5jcmVhdGUobXRsLnNoZCwgdGhpcy52ZXJ0ZXhlcywgdGhpcy5pbmRpY2llcyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBQcmltLCB2ZXJ0ZXggfSBmcm9tIFwiLi4vcm5kL3Jlcy9wcmltLmpzXCI7XHJcbmltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vbXRoL3ZlYzMuanNcIjtcclxuaW1wb3J0IHsgdmVjMiB9IGZyb20gXCIuLi9tdGgvdmVjMi5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpZ3VyZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q3ViZSgpIHtcclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gW1xyXG4gICAgICAgICAgICBbdmVjMygtMC41LCAtMC41LCAtMC41KSwgdmVjMygtMC41LCAwLjUsIC0wLjUpLCB2ZWMzKDAuNSwgMC41LCAtMC41KSwgdmVjMygwLjUsIC0wLjUsIC0wLjUpXSwgIC8vIGZyb250XHJcbiAgICAgICAgICAgIFt2ZWMzKC0wLjUsIC0wLjUsIDAuNSksIHZlYzMoLTAuNSwgMC41LCAwLjUpLCB2ZWMzKDAuNSwgMC41LCAwLjUpLCB2ZWMzKDAuNSwgLTAuNSwgMC41KV0sICAgICAgLy8gYmFja1xyXG4gICAgICAgICAgICBbdmVjMygtMC41LCAtMC41LCAtMC41KSwgdmVjMygtMC41LCAtMC41LCAwLjUpLCB2ZWMzKC0wLjUsIDAuNSwgMC41KSwgdmVjMygtMC41LCAwLjUsIC0wLjUpXSwgIC8vIGxlZnRcclxuICAgICAgICAgICAgW3ZlYzMoMC41LCAtMC41LCAtMC41KSwgdmVjMygwLjUsIC0wLjUsIDAuNSksIHZlYzMoMC41LCAwLjUsIDAuNSksIHZlYzMoMC41LCAwLjUsIC0wLjUpXSwgICAgICAvLyByaWdodFxyXG4gICAgICAgICAgICBbdmVjMygtMC41LCAtMC41LCAtMC41KSwgdmVjMygtMC41LCAtMC41LCAwLjUpLCB2ZWMzKDAuNSwgLTAuNSwgMC41KSwgdmVjMygwLjUsIC0wLjUsIC0wLjUpXSwgIC8vIGJvdHRvbVxyXG4gICAgICAgICAgICBbdmVjMygtMC41LCAwLjUsIC0wLjUpLCB2ZWMzKC0wLjUsIDAuNSwgMC41KSwgdmVjMygwLjUsIDAuNSwgMC41KSwgdmVjMygwLjUsIDAuNSwgLTAuNSldLCAgICAgIC8vIHRvcFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdGhpcy50ZXhDb29yZHMgPSBbXHJcbiAgICAgICAgICAgIFt2ZWMyKDAsIDApLCB2ZWMyKDAsIDEpLCB2ZWMyKDEsIDEpLCB2ZWMyKDEsIDApXSxcclxuICAgICAgICAgICAgW3ZlYzIoMCwgMCksIHZlYzIoMCwgMSksIHZlYzIoMSwgMSksIHZlYzIoMSwgMCldLFxyXG4gICAgICAgICAgICBbdmVjMigwLCAwKSwgdmVjMigwLCAxKSwgdmVjMigxLCAxKSwgdmVjMigxLCAwKV0sXHJcbiAgICAgICAgICAgIFt2ZWMyKDAsIDApLCB2ZWMyKDAsIDEpLCB2ZWMyKDEsIDEpLCB2ZWMyKDEsIDApXSxcclxuICAgICAgICAgICAgW3ZlYzIoMCwgMCksIHZlYzIoMCwgMSksIHZlYzIoMSwgMSksIHZlYzIoMSwgMCldLFxyXG4gICAgICAgICAgICBbdmVjMigwLCAwKSwgdmVjMigwLCAxKSwgdmVjMigxLCAxKSwgdmVjMigxLCAwKV0sXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUZXRyYWhlZHJvbigpIHtcclxuICAgICAgICBsZXQgc3FydDMgPSBNYXRoLnNxcnQoMy4wKSwgc3FydDIgPSBNYXRoLnNxcnQoMi4wKTtcclxuXHJcbiAgICAgICAgbGV0XHJcbiAgICAgICAgICAgIHRvcCA9IHZlYzMoMCwgc3FydDIgLyBzcXJ0MywgMCksXHJcbiAgICAgICAgICAgIGZyb250ID0gdmVjMygwLCAwLCBzcXJ0MyAvIDMuMCksXHJcbiAgICAgICAgICAgIGxlZnQgPSB2ZWMzKC0wLjUsIDAsIC1zcXJ0MyAvIDYuMCksXHJcbiAgICAgICAgICAgIHJpZ2h0ID0gdmVjMygwLjUsIDAsIC1zcXJ0MyAvIDYuMCk7XHJcblxyXG4gICAgICAgIHRoaXMudmVydGV4ZXMgPSBbXHJcbiAgICAgICAgICAgIFtsZWZ0LCBmcm9udCwgdG9wXSwgLy8gYm90XHJcbiAgICAgICAgICAgIFtsZWZ0LCByaWdodCwgdG9wXSxcclxuICAgICAgICAgICAgW3JpZ2h0LCBmcm9udCwgdG9wXSxcclxuICAgICAgICAgICAgW2Zyb250LCByaWdodCwgbGVmdF1cclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE9jdGFoZWRyb24oKSB7XHJcbiAgICAgICAgbGV0IHNxcnQzID0gTWF0aC5zcXJ0KDMuMCksIHNxcnQyID0gTWF0aC5zcXJ0KDIuMCk7XHJcblxyXG4gICAgICAgIGxldFxyXG4gICAgICAgICAgICB0b3AgPSB2ZWMzKDAsIDEgLyBzcXJ0MiwgMCksXHJcbiAgICAgICAgICAgIGJvdCA9IHRvcC5tdWwoLTEpLFxyXG4gICAgICAgICAgICBsZiA9IHZlYzMoLTAuNSwgMCwgMC41KSxcclxuICAgICAgICAgICAgbGIgPSB2ZWMzKC0wLjUsIDAsIC0wLjUpLFxyXG4gICAgICAgICAgICByZiA9IHZlYzMoMC41LCAwLCAwLjUpLFxyXG4gICAgICAgICAgICByYiA9IHZlYzMoMC41LCAwLCAtMC41KTtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcyA9IFtcclxuICAgICAgICAgICAgW2JvdCwgbGYsIHJmXSxcclxuICAgICAgICAgICAgW2JvdCwgbGYsIGxiXSxcclxuICAgICAgICAgICAgW2JvdCwgbGIsIHJiXSxcclxuICAgICAgICAgICAgW2JvdCwgcmYsIHJiXSxcclxuICAgICAgICAgICAgW3RvcCwgbGYsIHJmXSxcclxuICAgICAgICAgICAgW3RvcCwgbGYsIGxiXSxcclxuICAgICAgICAgICAgW3RvcCwgbGIsIHJiXSxcclxuICAgICAgICAgICAgW3RvcCwgcmYsIHJiXSxcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEljb2hlZHJvbigpIHtcclxuXHJcbiAgICAgICAgbGV0IGxheWVyMSA9IFtdO1xyXG4gICAgICAgIGxldCBsYXllcjIgPSBbXTtcclxuXHJcbiAgICAgICAgbGV0IHIgPSAwLjUgLyBNYXRoLnNpbigzNiAvIDE4MCAqIE1hdGguUEkpO1xyXG4gICAgICAgIGxldCBkID0gTWF0aC5zcXJ0KDEgLSBNYXRoLnBvdygyICogTWF0aC5zaW4oMC4xICogTWF0aC5QSSkgKiByLCAyKSlcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzNjA7IGkgKz0gNzIpIHtcclxuICAgICAgICAgICAgbGV0IGFuZ2xlID0gaSAvIDE4MC4wICogTWF0aC5QSTtcclxuICAgICAgICAgICAgbGV0IHAgPSB2ZWMzKHIgKiBNYXRoLnNpbihhbmdsZSksIHIgKiBNYXRoLmNvcyhhbmdsZSksIC1kIC8gMik7XHJcblxyXG4gICAgICAgICAgICBsYXllcjEucHVzaChwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzYwOyBpICs9IDcyKSB7XHJcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IChpICsgMzYpIC8gMTgwLjAgKiBNYXRoLlBJO1xyXG4gICAgICAgICAgICBsZXQgcCA9IHZlYzMociAqIE1hdGguc2luKGFuZ2xlKSwgciAqIE1hdGguY29zKGFuZ2xlKSwgZCAvIDIpO1xyXG5cclxuICAgICAgICAgICAgbGF5ZXIyLnB1c2gocCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXRcclxuICAgICAgICAgICAgdG9wID0gdmVjMygwLCAwLCByKSxcclxuICAgICAgICAgICAgYm90ID0gdG9wLm11bCgtMSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0cmkxID1cclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBsYXllcjFbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIyW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyMlsoaSArIDQpICUgNV1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKHRyaTEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdHJpMiA9XHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIyW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyMVtpXSxcclxuICAgICAgICAgICAgICAgICAgICBsYXllcjFbKGkgKyAxKSAlIDVdXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIHRoaXMudmVydGV4ZXMucHVzaCh0cmkyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjYXAxID1cclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBib3QsIGxheWVyMVtpXSwgbGF5ZXIxWyhpICsgMSkgJSA1XVxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKGNhcDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2FwMiA9XHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wLCBsYXllcjJbaV0sIGxheWVyMlsoaSArIDEpICUgNV1cclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHRoaXMudmVydGV4ZXMucHVzaChjYXAyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNldERvZGVjYWhlZHJvbigpIHtcclxuICAgICAgICBsZXQgciA9IE1hdGguc3FydCg1MCArIDEwICogTWF0aC5zcXJ0KDUpKSAvIDEwO1xyXG4gICAgICAgIGxldCBSID0gMC4yNSAqICgxICsgTWF0aC5zcXJ0KDUpKSAqIE1hdGguc3FydCgzKTtcclxuICAgICAgICBsZXQgcjAgPSByICogMiAqIE1hdGguY29zKCgzNiAvIDE4MCAqIE1hdGguUEkpKTtcclxuXHJcbiAgICAgICAgbGV0IGVkZ2UxID0gW107XHJcbiAgICAgICAgbGV0IGVkZ2UyID0gW107XHJcbiAgICAgICAgbGV0IGxheWVyMSA9IFtdO1xyXG4gICAgICAgIGxldCBsYXllcjIgPSBbXTtcclxuXHJcbiAgICAgICAgbGV0IGQgPSBNYXRoLnNxcnQoUiAqIFIgLSByICogcik7XHJcbiAgICAgICAgbGV0IGQwID0gTWF0aC5zcXJ0KFIgKiBSIC0gcjAgKiByMCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzYwOyBpICs9IDcyKSB7XHJcbiAgICAgICAgICAgIGxldFxyXG4gICAgICAgICAgICAgICAgYTEgPSBpIC8gMTgwICogTWF0aC5QSSxcclxuICAgICAgICAgICAgICAgIGEyID0gKGkgKyAzNikgLyAxODAgKiBNYXRoLlBJO1xyXG5cclxuICAgICAgICAgICAgbGV0IHAxID0gdmVjMyhyICogTWF0aC5zaW4oYTEpLCByICogTWF0aC5jb3MoYTEpLCBkKTtcclxuICAgICAgICAgICAgbGV0IHAyID0gdmVjMyhyICogTWF0aC5zaW4oYTIpLCByICogTWF0aC5jb3MoYTIpLCAtZCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbDEgPSB2ZWMzKHIwICogTWF0aC5zaW4oYTEpLCByMCAqIE1hdGguY29zKGExKSwgZDApO1xyXG4gICAgICAgICAgICBsZXQgbDIgPSB2ZWMzKHIwICogTWF0aC5zaW4oYTIpLCByMCAqIE1hdGguY29zKGEyKSwgLWQwKTtcclxuXHJcbiAgICAgICAgICAgIGVkZ2UxLnB1c2gocDEpO1xyXG4gICAgICAgICAgICBlZGdlMi5wdXNoKHAyKTtcclxuXHJcbiAgICAgICAgICAgIGxheWVyMS5wdXNoKGwxKTtcclxuICAgICAgICAgICAgbGF5ZXIyLnB1c2gobDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKGVkZ2UxKTtcclxuICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2goZWRnZTIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3VyZmFjZTEgPSBbXHJcbiAgICAgICAgICAgICAgICBlZGdlMVtpXSxcclxuICAgICAgICAgICAgICAgIGxheWVyMVtpXSxcclxuICAgICAgICAgICAgICAgIGxheWVyMltpXSxcclxuICAgICAgICAgICAgICAgIGxheWVyMVsoaSArIDEpICUgNV0sXHJcbiAgICAgICAgICAgICAgICBlZGdlMVsoaSArIDEpICUgNV1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBsZXQgc3VyZmFjZTIgPSBbXHJcbiAgICAgICAgICAgICAgICBlZGdlMltpXSxcclxuICAgICAgICAgICAgICAgIGxheWVyMltpXSxcclxuICAgICAgICAgICAgICAgIGxheWVyMVtpXSxcclxuICAgICAgICAgICAgICAgIGxheWVyMlsoaSArIDQpICUgNV0sXHJcbiAgICAgICAgICAgICAgICBlZGdlMlsoaSArIDQpICUgNV1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2goc3VyZmFjZTEpO1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2goc3VyZmFjZTIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMudmVydGV4ZXMgPSBbZWRnZTEsIGxheWVyMSwgbGF5ZXIyLCBlZGdlMl07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U3RhcigpIHtcclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gW107XHJcbiAgICAgICAgdGhpcy5zZXREb2RlY2FoZWRyb24oKTtcclxuXHJcbiAgICAgICAgbGV0IHZlcnRzID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52ZXJ0ZXhlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcCA9IHZlYzMoMCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCB2IG9mIHRoaXMudmVydGV4ZXNbaV0pIHtcclxuICAgICAgICAgICAgICAgIHAgPSBwLmFkZCh2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwID0gcC5kaXYoNSk7XHJcbiAgICAgICAgICAgIHAgPSBwLm11bCgzKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0cmlzID1cclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbdGhpcy52ZXJ0ZXhlc1tpXVswXSwgdGhpcy52ZXJ0ZXhlc1tpXVsxXSwgcF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMudmVydGV4ZXNbaV1bMV0sIHRoaXMudmVydGV4ZXNbaV1bMl0sIHBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnZlcnRleGVzW2ldWzJdLCB0aGlzLnZlcnRleGVzW2ldWzNdLCBwXSxcclxuICAgICAgICAgICAgICAgICAgICBbdGhpcy52ZXJ0ZXhlc1tpXVszXSwgdGhpcy52ZXJ0ZXhlc1tpXVs0XSwgcF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMudmVydGV4ZXNbaV1bNF0sIHRoaXMudmVydGV4ZXNbaV1bMF0sIHBdLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspXHJcbiAgICAgICAgICAgICAgICB2ZXJ0cy5wdXNoKHRyaXNbaV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcyA9IHZlcnRzO1xyXG4gICAgfVxyXG5cclxuICAgIG1ha2VQcmltKG10bCkge1xyXG4gICAgICAgIGxldCBpbmRpY2llcyA9IFtdO1xyXG4gICAgICAgIGxldCB2ZXJ0ZXhlcyA9IFtdO1xyXG4gICAgICAgIGxldCBqID0gMDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZSA9IDA7IGUgPCB0aGlzLnZlcnRleGVzLmxlbmd0aDsgZSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlZGdlID0gdGhpcy52ZXJ0ZXhlc1tlXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRleENvb3JkcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHYgaW4gZWRnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleGVzLnB1c2godmVydGV4KGVkZ2Vbdl0sIHZlYzMoMCksIHRoaXMudGV4Q29vcmRzW2VdW3ZdKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB2IGluIGVkZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXhlcy5wdXNoKHZlcnRleChlZGdlW3ZdLCB2ZWMzKDApKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAyOyBpIDwgZWRnZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaW5kaWNpZXMucHVzaChqICsgMCk7XHJcbiAgICAgICAgICAgICAgICBpbmRpY2llcy5wdXNoKGogKyBpIC0gMSk7XHJcbiAgICAgICAgICAgICAgICBpbmRpY2llcy5wdXNoKGogKyBpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBqICs9IGVkZ2UubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcmltKG10bCwgdmVydGV4ZXMsIGluZGljaWVzKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vLi4vbXRoL3ZlYzMuanNcIlxyXG5pbXBvcnQgeyBVbmlmb3JtQnVmZmVyIH0gZnJvbSBcIi4vYnVmLmpzXCJcclxuXHJcbi8vIENsYXNzIGZvciBob2xkaW5nIG1hdGVyaWFsIHByb3BlcnRpZXMgb2YgcHJpbWl0aXZlLlxyXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWwge1xyXG4gICAgY29uc3RydWN0b3Ioc2hkLCBLYSwgS2QsIEtzLCBQaCkge1xyXG4gICAgICAgIHRoaXMuc2hkID0gc2hkO1xyXG4gICAgICAgIHRoaXMuS2EgPSBLYTtcclxuICAgICAgICB0aGlzLktkID0gS2Q7XHJcbiAgICAgICAgdGhpcy5LcyA9IEtzO1xyXG4gICAgICAgIHRoaXMuUGggPSBQaDtcclxuICAgICAgICB0aGlzLnRleHR1cmVzID0gW251bGwsIG51bGwsIG51bGwsIG51bGxdO1xyXG5cclxuICAgICAgICB0aGlzLlVCTyA9IG5ldyBVbmlmb3JtQnVmZmVyKHRoaXMuc2hkLnJuZCwgXCJ1X21hdGVyaWFsXCIsIDE2ICogNCwgMyk7XHJcbiAgICAgICAgLy90aGlzLlVCTy51cGRhdGUobmV3IEZsb2F0MzJBcnJheShbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0pKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBsZXQgdGV4X2ZsYWdzID0gWzAsIDAsIDAsIDBdO1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5LYS5saW5lYXJpemUoKS5jb25jYXQoWzBdLCB0aGlzLktkLmxpbmVhcml6ZSgpLCBbMF0sIHRoaXMuS3MubGluZWFyaXplKCksIFt0aGlzLlBoXSlcclxuXHJcbiAgICAgICAgZm9yIChsZXQgdCA9IDA7IHQgPCA0OyB0KyspXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRleHR1cmVzW3RdICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0ZXhfZmxhZ3NbdF0gPSAxO1xyXG5cclxuICAgICAgICBkYXRhID0gZGF0YS5jb25jYXQodGV4X2ZsYWdzKTtcclxuXHJcbiAgICAgICAgdGhpcy5VQk8udXBkYXRlKG5ldyBGbG9hdDMyQXJyYXkoZGF0YSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNoZC5hcHBseSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVUJPLmFwcGx5KHRoaXMuc2hkKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHQgPSAwOyB0IDwgNDsgdCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50ZXh0dXJlc1t0XSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZXNbdF0uYXBwbHkodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNoVGV4dHVyZSh0ZXh0dXJlLCBudW0pIHtcclxuICAgICAgICBpZiAobnVtID4gMyB8fCBudW0gPCAwKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMudGV4dHVyZXNbbnVtXSA9IHRleHR1cmU7XHJcbiAgICB9XHJcbn07XHJcblxyXG4iLCJleHBvcnQgY2xhc3MgVGV4dHVyZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihybmQsIHVybCkge1xyXG4gICAgICAgIGNvbnN0IGdsID0gcm5kLmdsO1xyXG5cclxuICAgICAgICB0aGlzLnJuZCA9IHJuZDtcclxuICAgICAgICB0aGlzLnRleElkID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMudGV4dElkKTtcclxuXHJcbiAgICAgICAgY29uc3QgbGV2ZWwgPSAwO1xyXG4gICAgICAgIGNvbnN0IGludGVybmFsRm9ybWF0ID0gZ2wuUkdCQTtcclxuICAgICAgICBjb25zdCB3aWR0aCA9IDE7XHJcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gMTtcclxuICAgICAgICBjb25zdCBib3JkZXIgPSAwO1xyXG4gICAgICAgIGNvbnN0IHNyY0Zvcm1hdCA9IGdsLlJHQkE7XHJcbiAgICAgICAgY29uc3Qgc3JjVHlwZSA9IGdsLlVOU0lHTkVEX0JZVEU7XHJcbiAgICAgICAgY29uc3QgcGl4ZWwgPSBuZXcgVWludDhBcnJheShbMCwgMCwgMjU1LCAyNTVdKTsgLy8gb3BhcXVlIGJsdWVcclxuICAgICAgICBnbC50ZXhJbWFnZTJEKFxyXG4gICAgICAgICAgICBnbC5URVhUVVJFXzJELFxyXG4gICAgICAgICAgICBsZXZlbCxcclxuICAgICAgICAgICAgaW50ZXJuYWxGb3JtYXQsXHJcbiAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgICAgIGJvcmRlcixcclxuICAgICAgICAgICAgc3JjRm9ybWF0LFxyXG4gICAgICAgICAgICBzcmNUeXBlLFxyXG4gICAgICAgICAgICBwaXhlbCxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXhJZCk7XHJcbiAgICAgICAgICAgIGdsLnRleEltYWdlMkQoXHJcbiAgICAgICAgICAgICAgICBnbC5URVhUVVJFXzJELFxyXG4gICAgICAgICAgICAgICAgbGV2ZWwsXHJcbiAgICAgICAgICAgICAgICBpbnRlcm5hbEZvcm1hdCxcclxuICAgICAgICAgICAgICAgIHNyY0Zvcm1hdCxcclxuICAgICAgICAgICAgICAgIHNyY1R5cGUsXHJcbiAgICAgICAgICAgICAgICBpbWFnZSxcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc1Bvd2VyT2YyKGltYWdlLndpZHRoKSAmJiBpc1Bvd2VyT2YyKGltYWdlLmhlaWdodCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIFllcywgaXQncyBhIHBvd2VyIG9mIDIuIEdlbmVyYXRlIG1pcHMuXHJcbiAgICAgICAgICAgICAgICBnbC5nZW5lcmF0ZU1pcG1hcChnbC5URVhUVVJFXzJEKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIE5vLCBpdCdzIG5vdCBhIHBvd2VyIG9mIDIuIFR1cm4gb2ZmIG1pcHMgYW5kIHNldFxyXG4gICAgICAgICAgICAgICAgLy8gd3JhcHBpbmcgdG8gY2xhbXAgdG8gZWRnZVxyXG4gICAgICAgICAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XHJcbiAgICAgICAgICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKTtcclxuICAgICAgICAgICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5MSU5FQVIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpbWFnZS5zcmMgPSB1cmw7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHkobnVtKSB7XHJcbiAgICAgICAgdGhpcy5ybmQuZ2wuYWN0aXZlVGV4dHVyZSh0aGlzLnJuZC5nbC5URVhUVVJFMCArIG51bSk7XHJcbiAgICAgICAgdGhpcy5ybmQuZ2wuYmluZFRleHR1cmUodGhpcy5ybmQuZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXhJZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzUG93ZXJPZjIodmFsdWUpIHtcclxuICAgIHJldHVybiAodmFsdWUgJiAodmFsdWUgLSAxKSkgPT09IDA7XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIG9uUGluY2goZWxlbWVudCwgb25QaW5jaFN0YXJ0LCBvblBpbmNoTW92ZSwgb25QaW5jaEVuZCkge1xyXG4gICAgbGV0IHNjYWxpbmcgPSBmYWxzZTtcclxuICAgIGxldCBwcmV2X2Rpc3QgPSAwO1xyXG5cclxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm9udG91Y2hzdGFydFwiLCBlID0+IHtcclxuICAgICAgICBpZiAoZS50b3VjaGVzLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICBzY2FsaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgcHJldl9kaXN0ID0gTWF0aC5oeXBvdChcclxuICAgICAgICAgICAgICAgIGUudG91Y2hlc1swXS5wYWdlWCAtIGUudG91Y2hlc1sxXS5wYWdlWCxcclxuICAgICAgICAgICAgICAgIGUudG91Y2hlc1swXS5wYWdlWSAtIGUudG91Y2hlc1sxXS5wYWdlWVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBvblBpbmNoU3RhcnQoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJvbnRvdWNobW92ZVwiLCBlID0+IHtcclxuICAgICAgICBpZiAoc2NhbGluZykge1xyXG4gICAgICAgICAgICBsZXQgZGlzdCA9IE1hdGguaHlwb3QoXHJcbiAgICAgICAgICAgICAgICBlLnRvdWNoZXNbMF0ucGFnZVggLSBlLnRvdWNoZXNbMV0ucGFnZVgsXHJcbiAgICAgICAgICAgICAgICBlLnRvdWNoZXNbMF0ucGFnZVkgLSBlLnRvdWNoZXNbMV0ucGFnZVlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgbGV0IGRlbHRhID0gZGlzdCAtIHByZXZfZGlzdDtcclxuICAgICAgICAgICAgcHJldl9kaXN0ID0gZGlzdDtcclxuICAgICAgICAgICAgb25QaW5jaE1vdmUoZGlzdCwgZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwib250b3VjaGVuZFwiLCBlID0+IHtcclxuICAgICAgICBpZiAoc2NhbGluZykge1xyXG4gICAgICAgICAgICBvblBpbmNoRW5kKGUpO1xyXG4gICAgICAgICAgICBzY2FsaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0iLCJpbXBvcnQgeyBSZW5kZXIgfSBmcm9tIFwiLi9ybmQvcm5kLmpzXCJcclxuaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuL210aC92ZWMzLmpzXCJcclxuaW1wb3J0IHsgbWF0NCwgbWF0clJvdGF0ZSwgbWF0clRyYW5zbGF0ZSwgbWF0clNjYWxlIH0gZnJvbSBcIi4vbXRoL21hdDQuanNcIlxyXG5pbXBvcnQgeyBQcmltLCB2ZXJ0ZXggfSBmcm9tIFwiLi9ybmQvcmVzL3ByaW0uanNcIlxyXG5pbXBvcnQgeyBGaWd1cmUgfSBmcm9tIFwiLi9wbGF0L3BsYXQuanNcIlxyXG5pbXBvcnQgeyBTaGFkZXIgfSBmcm9tIFwiLi9ybmQvcmVzL3NoZC5qc1wiXHJcbmltcG9ydCB7IFRpbWVyIH0gZnJvbSBcIi4vdGltZXIvdGltZXIuanNcIlxyXG5pbXBvcnQgeyBVbmlmb3JtQnVmZmVyIH0gZnJvbSBcIi4vcm5kL3Jlcy9idWYuanNcIlxyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCIuL3JuZC9yZXMvbXRsLmpzXCJcclxuaW1wb3J0IHsgVGV4dHVyZSB9IGZyb20gXCIuL3JuZC9yZXMvdGV4LmpzXCJcclxuaW1wb3J0IHsgb25QaW5jaCB9IGZyb20gXCIuL2lucHV0L3RjaC5qc1wiXHJcblxyXG5mdW5jdGlvbiB0cExvZyh0ZXh0KSB7XHJcbiAgd2luZG93LnBhci5pbm5lckhUTUwgKz0gdGV4dCArIFwiPGJyIC8+XCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1haW4oKSB7XHJcbiAgd2luZG93LnBhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicFwiKTtcclxuICBjb25zb2xlLmxvZyhcIk1BSU4gTE9BREVEXCIpO1xyXG4gIC8vdHBMb2coXCJNQUlOIExPQURFRFwiKTtcclxuXHJcbiAgbGV0IGNhbnZhc2VzID0gW107XHJcbiAgbGV0IHJlbmRlcnMgPSBbXTtcclxuICBsZXQgc2hhZGVycyA9IFtdO1xyXG4gIGxldCBwcmltcyA9IFtdO1xyXG4gIGxldCBVQk9zID0gW107XHJcbiAgbGV0IGZpZ3VyZXMgPSBbXTtcclxuICBsZXQgcm90cyA9IFtdO1xyXG4gIGxldCBtdGxzID0gW107XHJcbiAgbGV0IHNjYWxlcyA9XHJcbiAgICBbXHJcbiAgICAgIG1hdHJTY2FsZSh2ZWMzKDUuOCkpLCBtYXRyU2NhbGUodmVjMyg0LjcpKSxcclxuICAgICAgbWF0clNjYWxlKHZlYzMoNCkpLCBtYXRyU2NhbGUodmVjMygzLjIpKSxcclxuICAgICAgbWF0clNjYWxlKHZlYzMoMi4xKSksIG1hdHJTY2FsZSh2ZWMzKDEuMikpLCBtYXRyU2NhbGUodmVjMygwLjMpKSwgbWF0clNjYWxlKHZlYzMoNCkpXHJcbiAgICBdO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKylcclxuICAgIGZpZ3VyZXNbaV0gPSBuZXcgRmlndXJlKCk7XHJcbiAgZmlndXJlc1swXS5zZXRUZXRyYWhlZHJvbigpO1xyXG4gIGZpZ3VyZXNbMV0uc2V0T2N0YWhlZHJvbigpO1xyXG4gIGZpZ3VyZXNbMl0uc2V0Q3ViZSgpO1xyXG4gIGZpZ3VyZXNbM10uc2V0SWNvaGVkcm9uKCk7XHJcbiAgZmlndXJlc1s0XS5zZXREb2RlY2FoZWRyb24oKTtcclxuICBmaWd1cmVzWzVdLnNldFN0YXIoKTtcclxuXHJcbiAgbGV0IG10bF9wcm9wcyA9IFtcclxuICAgIFt2ZWMzKDAuMSksIHZlYzMoMCwgMC43LCAwLjcpLCB2ZWMzKDAuNSwgMC41LCAwLjUpLCA5MF0sXHJcbiAgICBbdmVjMygwLjEpLCB2ZWMzKDAuMywgMC4zNSwgMC43KSwgdmVjMygwLjUsIDAuNSwgMC4wKSwgNDBdLFxyXG4gICAgW3ZlYzMoMC4xKSwgdmVjMygwLjQsIDAuNiwgMC40KSwgdmVjMygxLCAxLCAxKSwgOTBdLFxyXG4gICAgW3ZlYzMoMC4xKSwgdmVjMygwLjcsIDAuNywgMC43KSwgdmVjMygwLjUsIDAuNSwgMC41KSwgOTBdLFxyXG4gICAgW3ZlYzMoMC4xKSwgdmVjMygwLjYsIDAuMiwgMC41KSwgdmVjMygwLjMsIDAuMywgMC4zKSwgNDBdLFxyXG4gICAgW3ZlYzMoMC4xKSwgdmVjMygwLjcsIDAuNywgMCksIHZlYzMoMC45LCAwLjksIDAuOSksIDkwXSxcclxuICBdO1xyXG5cclxuICBjYW52YXNlc1s2XSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBteUNhbjdgKTtcclxuICBjYW52YXNlc1s2XS5obSA9IEhhbW1lcihjYW52YXNlc1s2XSk7XHJcbiAgY2FudmFzZXNbNl0uaG0uZ2V0KFwicm90YXRlXCIpLnNldCh7IGVuYWJsZTogdHJ1ZSB9KTtcclxuICBjYW52YXNlc1s3XSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBteUNhbjhgKTtcclxuICBjYW52YXNlc1s3XS5obSA9IEhhbW1lcihjYW52YXNlc1s3XSk7XHJcbiAgY2FudmFzZXNbN10uaG0uZ2V0KFwicm90YXRlXCIpLnNldCh7IGVuYWJsZTogdHJ1ZSB9KTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcclxuICAgIC8vIEdldHRpbmcgY2FudmFzIGZyb20gaHRtbFxyXG4gICAgY2FudmFzZXNbaV0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbXlDYW4ke2kgKyAxfWApO1xyXG5cclxuICAgIC8vIEluaXRpYWxpemluZyByZW5kZXIgb2JqZWN0IFxyXG4gICAgcmVuZGVyc1tpXSA9IG5ldyBSZW5kZXIoY2FudmFzZXNbaV0pO1xyXG5cclxuICAgIC8vIEluaXRpYWxpemluZyBzaGFkZXIgZm9yIHJlbmRlciBvYmplY3RcclxuICAgIHNoYWRlcnNbaV0gPSBuZXcgU2hhZGVyKHJlbmRlcnNbaV0sIFwiZGVmYXVsdFwiKTtcclxuXHJcbiAgICAvLyBJbml0aWFsaXppbmcgbWF0ZXJpYWwgcmVsYXRlcmQgdG8gc2hhZGVyXHJcbiAgICBtdGxzW2ldID0gbmV3IE1hdGVyaWFsKHNoYWRlcnNbaV0sIC4uLm10bF9wcm9wc1tpXSk7XHJcblxyXG4gICAgLy8gQ3JlYXRpbmcgcHJpbWl0aXZlIHVzaW5nIG1hdGVyaWFsXHJcbiAgICBwcmltc1tpXSA9IGZpZ3VyZXNbaV0ubWFrZVByaW0obXRsc1tpXSk7XHJcblxyXG4gICAgLy8gSW5pdGlhbGl6aW5nIEhhbW1lciBvbiBjYW52YXNcclxuICAgIGNhbnZhc2VzW2ldLmhtID0gSGFtbWVyKGNhbnZhc2VzW2ldKTtcclxuICAgIGNhbnZhc2VzW2ldLmhtLmdldChcInJvdGF0ZVwiKS5zZXQoeyBlbmFibGU6IHRydWUgfSk7XHJcbiAgfVxyXG4gIHByaW1zWzBdLnRyYW5zZm9ybSA9IG1hdHJUcmFuc2xhdGUodmVjMygwLCAtMC4zLCAwKSk7XHJcblxyXG4gIC8vIFRpbWVyIGNyZWF0aW9uXHJcbiAgbGV0IHRpbWVyID0gbmV3IFRpbWVyKCk7XHJcbiAgLy8gVGVzdCBtYXRlcmlhbCBhbmQgcHJpbWl0aXZlIFxyXG4gIGxldCByZW5kZXJfbW9kZWwgPSBuZXcgUmVuZGVyKGNhbnZhc2VzWzZdKTtcclxuICBsZXQgc2hhZGVyX21vZGVsID0gbmV3IFNoYWRlcihyZW5kZXJfbW9kZWwsIFwiZGVmYXVsdFwiKTtcclxuICBsZXQgbXRsID0gbmV3IE1hdGVyaWFsKHNoYWRlcl9tb2RlbCwgLi4ubXRsX3Byb3BzWzBdKTtcclxuICBsZXQgdGVzdF9wciA9IG5ldyBQcmltKG10bCwgXCJjb3dcIik7XHJcbiAgdGVzdF9wci50cmFuc2Zvcm0gPSBtYXRyVHJhbnNsYXRlKHZlYzMoMCwgLTQuNSwgMCkpO1xyXG5cclxuICBsZXQgcmVuZGVyX3RleHR1cmUgPSBuZXcgUmVuZGVyKGNhbnZhc2VzWzddKTtcclxuICBsZXQgc2hhZGVyX3RleHR1cmUgPSBuZXcgU2hhZGVyKHJlbmRlcl90ZXh0dXJlLCBcImRlZmF1bHRcIik7XHJcbiAgbGV0IG10bF90ZXh0dXJlID0gbmV3IE1hdGVyaWFsKHNoYWRlcl90ZXh0dXJlLCAuLi5tdGxfcHJvcHNbMF0pO1xyXG4gIC8vbGV0IHRleCA9IG5ldyBUZXh0dXJlKHJlbmRlcl90ZXh0dXJlLCBcImJpbi90ZXh0dXJlcy9QTkcuUE5HXCIpO1xyXG4gIGxldCB0ZXggPSBuZXcgVGV4dHVyZShyZW5kZXJfdGV4dHVyZSwgXCIuL2Jpbi90ZXh0dXJlcy9lbS5qcGdcIik7XHJcbiAgbXRsX3RleHR1cmUuYXR0YWNoVGV4dHVyZSh0ZXgsIDApO1xyXG4gIG10bF90ZXh0dXJlLnVwZGF0ZSgpO1xyXG4gIGxldCBmID0gbmV3IEZpZ3VyZSgpO1xyXG4gIGYuc2V0Q3ViZSgpO1xyXG4gIGxldCBwcmltX3RleCA9IGYubWFrZVByaW0obXRsX3RleHR1cmUpO1xyXG5cclxuICAvL3Rlc3RfcHIudHJhbnNmb3JtID0gbWF0clRyYW5zbGF0ZSh2ZWMzKDAsIC01LjAsIDApKTtcclxuICAvL2NhbnZhc2VzWzZdLnN0eWxlLndpZHRoID0gXCI1MCVcIjtcclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAvLyBNb3VzZSBldmVudCBoYW5kbGVycyBzZXR0aW5nXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgbGV0IHJvdFNwZWVkID0gMC4wMTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xyXG4gICAgcm90c1tpXSA9IG1hdDQoMSk7XHJcblxyXG4gICAgbGV0IGYxID0gZSA9PiB7XHJcbiAgICAgIHJvdHNbaV0gPSByb3RzW2ldLm11bChtYXRyUm90YXRlKHJvdFNwZWVkICogZS5tb3ZlbWVudFgsIHZlYzMoMCwgMSwgMCkpKTtcclxuICAgICAgcm90c1tpXSA9IHJvdHNbaV0ubXVsKG1hdHJSb3RhdGUocm90U3BlZWQgKiBlLm1vdmVtZW50WSwgdmVjMygxLCAwLCAwKSkpO1xyXG4gICAgfTtcclxuICAgIGxldCBmMiA9IGUgPT4ge1xyXG4gICAgICBpZiAoZS5kZWx0YVkgPiAwKVxyXG4gICAgICAgIHNjYWxlc1tpXSA9IHNjYWxlc1tpXS5tdWwobWF0clNjYWxlKHZlYzMoMC45KSkpO1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgc2NhbGVzW2ldID0gc2NhbGVzW2ldLm11bChtYXRyU2NhbGUodmVjMygxLjEpKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBmMyA9IChkaXN0LCBkZWx0YSkgPT4ge1xyXG4gICAgICBpZiAoZGVsdGEgPCAwKVxyXG4gICAgICAgIHNjYWxlc1tpXSA9IHNjYWxlc1tpXS5tdWwobWF0clNjYWxlKHZlYzMoMC45NykpKTtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIHNjYWxlc1tpXSA9IHNjYWxlc1tpXS5tdWwobWF0clNjYWxlKHZlYzMoMS4wMikpKTtcclxuICAgIH07XHJcbiAgICBsZXQgZjQgPSBlID0+IHtcclxuICAgICAgcm90c1tpXSA9IHJvdHNbaV0ubXVsKG1hdHJSb3RhdGUoMC4yMiAqIGUudmVsb2NpdHlYLCB2ZWMzKDAsIDEsIDApKSk7XHJcbiAgICAgIHJvdHNbaV0gPSByb3RzW2ldLm11bChtYXRyUm90YXRlKDAuMjIgKiBlLnZlbG9jaXR5WSwgdmVjMygxLCAwLCAwKSkpO1xyXG4gICAgfTtcclxuICAgIGxldCBvblRhcCA9IGUgPT4ge1xyXG4gICAgICBpZiAoY2FudmFzZXNbaV0uc3R5bGUud2lkdGggPT0gXCIzNSVcIikge1xyXG4gICAgICAgIGNhbnZhc2VzW2ldLnN0eWxlLndpZHRoID0gXCIyMCVcIjtcclxuICAgICAgICBjYW52YXNlc1tpXS5zdHlsZS5wb3NpdGlvbiA9IFwic3RhdGljXCI7XHJcbiAgICAgICAgY2FudmFzZXNbaV0uc3R5bGUudG9wID0gXCJhdXRvXCI7XHJcbiAgICAgICAgY2FudmFzZXNbaV0uc3R5bGUubGVmdCA9IFwiYXV0b1wiO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY2FudmFzZXNbaV0uc3R5bGUud2lkdGggPSBcIjM1JVwiO1xyXG4gICAgICBjYW52YXNlc1tpXS5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcclxuICAgICAgY2FudmFzZXNbaV0uc3R5bGUudG9wID0gXCIwXCI7XHJcbiAgICAgIGNhbnZhc2VzW2ldLnN0eWxlLmxlZnQgPSBcIjBcIjtcclxuICAgICAgY2FudmFzZXNbaV0uc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICAgIGNhbnZhc2VzW2ldLnN0eWxlLnRvcCA9IFwiNSVcIjtcclxuICAgICAgY2FudmFzZXNbaV0uc3R5bGUubGVmdCA9IFwiMzIlXCI7XHJcblxyXG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGNhbnZhc2VzLmxlbmd0aDsgYysrKSB7XHJcbiAgICAgICAgaWYgKGMgIT0gaSkge1xyXG4gICAgICAgICAgY2FudmFzZXNbY10uc3R5bGUud2lkdGggPSBcIjIwJVwiO1xyXG4gICAgICAgICAgY2FudmFzZXNbY10uc3R5bGUucG9zaXRpb24gPSBcInN0YXRpY1wiO1xyXG4gICAgICAgICAgY2FudmFzZXNbY10uc3R5bGUudG9wID0gXCJhdXRvXCI7XHJcbiAgICAgICAgICBjYW52YXNlc1tjXS5zdHlsZS5sZWZ0ID0gXCJhdXRvXCI7ICBcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy9jYW52YXNlc1tpXS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGYxKTtcclxuICAgIGNhbnZhc2VzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLCBmMik7XHJcbiAgICBjYW52YXNlc1tpXS5obS5vbihcInJvdGF0ZVwiLCBmMyk7XHJcbiAgICBjYW52YXNlc1tpXS5obS5vbihcInBhblwiLCBmNCk7XHJcbiAgICBjYW52YXNlc1tpXS5obS5vbihcInRhcFwiLCBvblRhcCk7XHJcbiAgICBvblBpbmNoKGNhbnZhc2VzW2ldLCAoKSA9PiB7fSwgZjMsICgpID0+IHt9KTtcclxuICB9XHJcblxyXG4gIC8vIEVhY2ggZnJhbWUgcmVuZGVyaW5nIGZ1bmN0aW9uIGRlY2xhcmF0aW9uXHJcbiAgY29uc3QgZHJhdyA9ICgpID0+IHtcclxuXHJcbiAgICAvLyBUaW1lciByZXBvbnNlXHJcbiAgICAvL3RpbWVyLnJlc3BvbnNlKCk7XHJcblxyXG4gICAgbGV0IHQgPSB0aW1lci5nZXRUaW1lKCk7XHJcblxyXG4gICAgLy8gRnJhbWUgcmVuZGVyXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAvLyAgU3RhcnRpbmcgcG9zdGluZyBjcmluZ2UgXHJcbiAgICAgIHJlbmRlcnNbaV0ucmVuZGVyU3RhcnQoKTtcclxuXHJcbiAgICAgIC8vIFJlbmRlcmluZyBbaV0gcHJpbWl0aXZlXHJcbiAgICAgIHByaW1zW2ldLnJlbmRlcihzY2FsZXNbaV0ubXVsKG1hdHJSb3RhdGUodCwgdmVjMygwLCAxLCAwKSkubXVsKHJvdHNbaV0ubXVsKG1hdHJUcmFuc2xhdGUodmVjMygwLCAwLCAtMTApKSkpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyX21vZGVsLnJlbmRlclN0YXJ0KCk7XHJcbiAgICB0ZXN0X3ByLnJlbmRlcihzY2FsZXNbNl0ubXVsKG1hdHJSb3RhdGUodCwgdmVjMygwLCAxLCAwKSkubXVsKHJvdHNbNl0ubXVsKG1hdHJUcmFuc2xhdGUodmVjMygwLCAwLCAtMTApKSkpKSk7XHJcbiAgICByZW5kZXJfdGV4dHVyZS5yZW5kZXJTdGFydCgpO1xyXG4gICAgcHJpbV90ZXgucmVuZGVyKHNjYWxlc1s3XS5tdWwobWF0clJvdGF0ZSh0LCB2ZWMzKDAsIDEsIDApKS5tdWwocm90c1s3XS5tdWwobWF0clRyYW5zbGF0ZSh2ZWMzKDAsIDAsIC0xMCkpKSkpKTtcclxuXHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xyXG4gIH07XHJcbiAgZHJhdygpO1xyXG59XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xyXG4gIG1haW4oKTtcclxufSk7Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBLE1BQU0sS0FBSyxDQUFDO0lBQ1osSUFBSSxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDekIsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsS0FBSztBQUNMO0lBQ0EsSUFBSSxJQUFJLEdBQUc7SUFDWCxRQUFRLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixLQUFLO0FBQ0w7SUFDQSxJQUFJLEdBQUcsR0FBRztJQUNWLFFBQVEsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN6QyxLQUFLO0FBQ0w7SUFDQSxJQUFJLElBQUksR0FBRztJQUNYLFFBQVEsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzdCO0lBQ0EsUUFBUSxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLFlBQVksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0I7SUFDQSxRQUFRLElBQUksR0FBRyxJQUFJLENBQUM7SUFDcEIsWUFBWSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixRQUFRLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixLQUFLO0FBQ0w7SUFDQSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUU7SUFDWCxRQUFRLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUQsS0FBSztBQUNMO0lBQ0EsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFO0lBQ1gsUUFBUSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlELEtBQUs7QUFDTDtJQUNBLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRTtJQUNYLFFBQVEsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN4RCxLQUFLO0FBQ0w7SUFDQSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUU7SUFDWCxRQUFRLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDeEQsS0FBSztBQUNMO0lBQ0EsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFO0lBQ1gsUUFBUSxPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFELEtBQUs7QUFDTDtJQUNBLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRTtJQUNiLFFBQVEsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0MsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN2QyxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6QyxLQUFLO0FBQ0w7SUFDQSxJQUFJLE9BQU8sQ0FBQyxDQUFDLEVBQUU7SUFDZixRQUFRLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEMsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlCLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QixZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEI7SUFDQSxRQUFRLE9BQU8sSUFBSTtJQUNuQixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzFGLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDMUYsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDN0YsS0FBSztBQUNMO0lBQ0EsSUFBSSxTQUFTLENBQUMsQ0FBQyxFQUFFO0lBQ2pCLFFBQVEsT0FBTyxJQUFJO0lBQ25CLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLFNBQVMsQ0FBQztJQUNWLEtBQUs7QUFDTDtJQUNBLElBQUksY0FBYyxHQUFHO0lBQ3JCLFFBQVEsT0FBTyxJQUFJO0lBQ25CLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEYsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRixZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BGLFNBQVMsQ0FBQztJQUNWLEtBQUs7QUFDTDtJQUNBLElBQUksU0FBUyxHQUFHO0lBQ2hCLFFBQVEsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsS0FBSztJQUNMLENBQUM7QUFDRDtJQUNPLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQzlCLElBQUksSUFBSSxDQUFDLElBQUksU0FBUztJQUN0QixRQUFRLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksUUFBUTtJQUM1QixRQUFRLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QyxJQUFJLElBQUksQ0FBQyxJQUFJLFNBQVM7SUFDdEIsUUFBUSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEMsSUFBSSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDOUI7O0lDN0ZBLE1BQU0sS0FBSyxDQUFDO0lBQ1osSUFBSSxXQUFXO0lBQ2YsUUFBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQzFCLFFBQVEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUMxQixRQUFRLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDMUIsUUFBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQzFCLE1BQU07SUFDTixRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUN0QyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQzVCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDNUIsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDOUIsS0FBSztBQUNMO0lBQ0EsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFO0lBQ1gsUUFBUSxPQUFPLElBQUk7SUFDbkIsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2SCxLQUFLO0FBQ0w7SUFDQSxJQUFJLFNBQVMsR0FBRztJQUNoQixRQUFRLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQyxLQUFLO0lBQ0wsQ0FBQztBQUNEO0lBQ08sU0FBUyxJQUFJO0lBQ3BCLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUN0QixJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDdEIsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQ3RCLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUN0QixFQUFFO0lBQ0YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFNBQVM7SUFDcEMsUUFBUSxPQUFPLElBQUksS0FBSztJQUN4QixZQUFZLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDdEIsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ3RCLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUN0QixZQUFZLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLElBQUksSUFBSSxPQUFPLEdBQUcsSUFBSSxRQUFRO0lBQzlCLFFBQVEsT0FBTyxJQUFJLEtBQUs7SUFDeEIsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RELFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RCxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RELFNBQVMsQ0FBQztJQUNWLElBQUksT0FBTyxJQUFJLEtBQUs7SUFDcEIsUUFBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQzFCLFFBQVEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUMxQixRQUFRLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDMUIsUUFBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQzFCLEtBQUssQ0FBQztJQUNOLENBQUM7QUFDRDtJQUNPLFNBQVMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUU7SUFDeEMsSUFDTyxJQUNDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkQsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRztBQUN4QjtJQUNBLElBQUksT0FBTyxJQUFJO0lBQ2YsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDakMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtJQUN2QyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO0lBQ3ZDLFFBQVEsQ0FBQztJQUNULFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7SUFDdkMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDakMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtJQUN2QyxRQUFRLENBQUM7SUFDVCxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO0lBQ3ZDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7SUFDdkMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDakMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQixLQUFLLENBQUM7SUFDTixDQUFDO0FBQ0Q7SUFDTyxTQUFTLGFBQWEsQ0FBQyxDQUFDLEVBQUU7SUFDakMsSUFBSSxPQUFPLElBQUk7SUFDZixRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FB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QUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO0lBQzVCLFFBQVEsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7SUFDNUIsUUFBUSxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUMzQjtJQUNBO0lBQ0EsUUFBUSxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUNsRCxRQUFRLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNoRCxRQUFRLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNqRDtJQUNBO0lBQ0EsUUFBUSxJQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUMsUUFBUSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3QyxRQUFRLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDM0M7SUFDQTtJQUNBLFFBQVEsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzFCLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEUsUUFBUSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFD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QyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNwRDtJQUNBLFFBQVEsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRCxRQUFRLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckQsUUFBUSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELEtBQUs7QUFDTDtJQUNBO0lBQ0EsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDMUMsUUFBUSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkQsS0FBSztJQUNMLENBQUM7QUFDRDtJQUNPLE1BQU0sSUFBSSxDQUFDO0lBQ2xCLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFO0lBQ3BDLFFBQVEsSUFBSSxPQUFPLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEM7SUFDQSxRQUFRLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLFFBQVEsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUM7SUFDdEMsUUFBUSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUN2QixRQUFRLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQzVCLFFBQVEsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxJQUFJO0lBQ2hDLFlBQVksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDL0I7SUFDQSxRQUFRLFdBQVcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDeEM7SUFDQSxRQUFRLEtBQUssSUFBSSxDQUFDLElBQUksUUFBUSxFQUFFO0lBQ2hDLFlBQVksT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbkMsWUFBWSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNuQyxZQUFZLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ25DLFlBQVksT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDcEMsWUFBWSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNwQyxZQUFZLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLFlBQVksT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbkMsWUFBWSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNuQyxTQUFTO0FBQ1Q7SUFDQSxRQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM1RCxRQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkQsUUFBUSxJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQ3hEO0lBQ0EsUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM1RSxRQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDMUc7SUFDQSxRQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxFQUFFO0lBQ3JELFlBQVksR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDMUYsWUFBWSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0QsWUFBWSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM1RixZQUFZLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1RCxZQUFZLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzNGLFlBQVksR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsdUJBQXVCLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNELFNBQVM7QUFDVDtJQUNBLFFBQVEsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN2RCxRQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDbkYsUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbEg7SUFDQSxRQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUM3QyxLQUFLO0FBQ0w7SUFDQSxJQUFJLFdBQVcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtJQUN6QyxRQUFRLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLFFBQVEsSUFBSSxRQUFRLElBQUksU0FBUyxFQUFFO0lBQ25DLFlBQVksSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDM0IsWUFBWSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7SUFDL0IsWUFBWSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN4QyxTQUFTLE1BQU07SUFDZixZQUFZLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQzNCLFlBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNyRCxTQUFTO0lBQ1QsS0FBSztBQUNMO0lBQ0EsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO0FBQ2xCO0lBQ0E7SUFDQTtJQUNBLFFBQVEsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxLQUFLLEVBQUU7SUFDMUQsWUFBWSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEUsWUFBWSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUMvQixTQUFTO0FBQ1Q7SUFDQTtJQUNBLFFBQVEsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQzlCLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDakcsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUks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QUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDcEcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4RyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BHLFNBQVMsQ0FBQztJQUNWLFFBQVEsSUFBSSxDQUFDLFNBQVMsR0FBRztJQUN6QixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RCxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RCxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RCxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RCxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RCxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RCxTQUFTLENBQUM7SUFDVixLQUFLO0FBQ0w7SUFDQSxJQUFJLGNBQWMsR0FBRztJQUNyQixRQUFRLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0Q7SUFDQSxRQUFRO0lBQ1IsWUFBWSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxLQUFLLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUMzQyxZQUFZLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEdBQUcsR0FBRyxDQUFDO0lBQzNDLFlBQVksSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0lBQzlDLFlBQVksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQy9DO0lBQ0EsUUFBUSxJQUFJLENBQUMsUUFBUSxHQUFHO0lBQ3hCLFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQztJQUM5QixZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUM7SUFDOUIsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDO0lBQy9CLFlBQVksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQztJQUNoQyxTQUFTLENBQUM7SUFDVixLQUFLO0FBQ0w7SUFDQSxJQUFJLGFBQWEsR0FBRztJQUNwQixRQUFXLElBQXlCLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtBQUMzRDtJQUNBLFFBQVE7SUFDUixZQUFZLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLFlBQVksR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0IsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7SUFDbkMsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQztJQUNwQyxZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7SUFDbEMsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwQztJQUNBLFFBQVEsSUFBSSxDQUFDLFFBQVEsR0FBRztJQUN4QixZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDekIsWUFBWSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3pCLFlBQVksQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUN6QixZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDekIsWUFBWSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3pCLFlBQVksQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUN6QixZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDekIsWUFBWSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3pCLFNBQVMsQ0FBQztJQUNWLEtBQUs7QUFDTDtJQUNBLElBQUksWUFBWSxHQUFHO0FBQ25CO0lBQ0EsUUFBUSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDeEIsUUFBUSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDeEI7SUFDQSxRQUFRLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELFFBQVEsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQztBQUMzRTtJQUNBLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO0lBQzFDLFlBQVksSUFBSSxLQUFLLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQzVDLFlBQVksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzNFO0lBQ0EsWUFBWSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLFNBQVM7QUFDVDtJQUNBLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxD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LENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3ZELFFBQVEsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RCxRQUFRLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUN4RDtJQUNBLFFBQVEsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLFFBQVEsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLFFBQVEsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLFFBQVEsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ3hCO0lBQ0EsUUFBUSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLFFBQVEsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUM1QztJQUNBLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO0lBQzFDLFlBQVk7SUFDWixnQkFBZ0IsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUU7SUFDdEMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7QUFDOUM7SUFDQSxZQUFZLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqRSxZQUFZLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xFO0lBQ0EsWUFBWSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDcEUsWUFBWSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNyRTtJQUNBLFlBQVksS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzQixZQUFZLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDM0I7SUFDQSxZQUFZLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUIsWUFBWSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLFNBQVM7QUFDVDtJQUNBLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNsQztJQUNBLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FB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USxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDakQ7SUFDQSxRQUFRLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUU7SUFDQSxRQUFRLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN0QixLQUFLO0FBQ0w7SUFDQSxJQUFJLE1BQU0sR0FBRztJQUNiLFFBQVEsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNyQyxRQUFRLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUM7QUFDNUc7SUFDQSxRQUFRLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ2xDLFlBQVksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUk7SUFDeEMsZ0JBQWdCLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakM7SUFDQSxRQUFRLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3RDO0lBQ0EsUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2hELEtBQUs7QUFDTDtJ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QUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDOUQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDdkQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDN0QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDN0QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDM0QsR0FBRyxDQUFDO0FBQ0o7SUFDQSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNsRCxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDckQsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDbEQsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3JEO0lBQ0EsRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzlCO0lBQ0EsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNEO0lBQ0E7SUFDQSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6QztJQUNBO0lBQ0EsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ25EO0lBQ0E7SUFDQSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RDtJQUNBO0lBQ0EsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1QztJQUNBO0lBQ0EsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6QyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELEdBQUc7SUFDSCxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2RDtJQUNBO0lBQ0EsRUFBRSxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0lBQzFCO0lBQ0EsRUFBRSxJQUFJLFlBQVksR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QyxFQUFFLElBQUksWUFBWSxHQUFHLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN6RCxFQUFFLElBQUksR0FBRyxHQUFHLElBQUksUUFBUSxDQUFDLFlBQVksRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hELEVBQUUsSUFBSSxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLEVBQUUsT0FBTyxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3REO0lBQ0EsRUFBRSxJQUFJLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvQyxFQUFFLElBQUksY0FBYyxHQUFHLElBQUksTUFBTSxDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM3RCxFQUFFLElBQUksV0FBVyxHQUFHLElBQUksUUFBUSxDQUFDLGNBQWMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xFO0lBQ0EsRUFBRSxJQUFJLEdBQUcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxjQUFjLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztJQUNqRSxFQUFFLFdBQVcsQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLEVBQUUsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3ZCLEVBQUUsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztJQUN2QixFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNkLEVBQUUsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQVF6QyxFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDOUIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBTXRCLElBQUksSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO0lBQ2xCLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUM7SUFDdEIsUUFBUSxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RDtJQUNBLFFBQVEsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEQsS0FBSyxDQUFDO0FBQ047SUFDQSxJQUFJLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssS0FBSztJQUM5QixNQUFNLElBQUksS0FBSyxHQUFHLENBQUM7SUFDbkIsUUFBUSxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RDtJQUNBLFFBQVEsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekQsS0FBSyxDQUFDO0lBQ04sSUFBSSxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7SUFDbEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNFLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzRSxLQUFLLENBQUM7SUFDTixJQUFJLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSTtJQUNyQixNQUFNLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxFQUFFO0lBQzVDLFFBQVEsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxD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
