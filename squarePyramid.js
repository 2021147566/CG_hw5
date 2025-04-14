export class SquarePyramid {
    constructor(gl) {
        this.gl = gl;

        this.vao = gl.createVertexArray();
        this.vbo = gl.createBuffer();
        this.cbo = gl.createBuffer();
        this.ebo = gl.createBuffer();

        // 정점 위치: base 4개 + apex 4개 (사면별 색상 분리)
        const vertices = new Float32Array([
            // base (for 4 side faces, duplicated)
            -0.5, 0.0, -0.5,  // 0 (yellow base)
             0.5, 0.0, -0.5,  // 1 (yellow base)
        
             0.5, 0.0, -0.5,  // 2 (red base)
             0.5, 0.0,  0.5,  // 3 (red base)
        
             0.5, 0.0,  0.5,  // 4 (green base)
            -0.5, 0.0,  0.5,  // 5 (green base)
        
            -0.5, 0.0,  0.5,  // 6 (magenta base)
            -0.5, 0.0, -0.5,  // 7 (magenta base)
        
            // apex 4개
            0.0, 1.0, 0.0,  // 8 yellow
            0.0, 1.0, 0.0,  // 9 red
            0.0, 1.0, 0.0,  // 10 green
            0.0, 1.0, 0.0   // 11 magenta
        ]);

        const colors = new Float32Array([
            // base (match side color)
            1.0, 1.0, 0.0, 1.0,  // 0 yellow
            1.0, 1.0, 0.0, 1.0,  // 1 yellow
        
            1.0, 0.0, 0.0, 1.0,  // 2 red
            1.0, 0.0, 0.0, 1.0,  // 3 red
        
            0.0, 1.0, 1.0, 1.0,  // 4 green
            0.0, 1.0, 1.0, 1.0,  // 5 green
        
            1.0, 0.0, 1.0, 1.0,  // 6 magenta
            1.0, 0.0, 1.0, 1.0,  // 7 magenta
        
            // apex
            1.0, 1.0, 0.0, 1.0,  // 8 yellow
            1.0, 0.0, 0.0, 1.0,  // 9 red
            0.0, 1.0, 1.0, 1.0,  // 10 green
            1.0, 0.0, 1.0, 1.0   // 11 magenta
        ]);

        const indices = new Uint16Array([
            0, 1, 8,    // yellow
            2, 3, 9,    // red
            4, 5, 10,   // green
            6, 7, 11    // magenta
        ]);

        // VAO binding
        gl.bindVertexArray(this.vao);

        // Position buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);

        // Color buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.cbo);
        gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
        gl.vertexAttribPointer(2, 4, gl.FLOAT, false, 0, 0); 
        gl.enableVertexAttribArray(2);

        // Index buffer
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

        gl.bindVertexArray(null);

        this.indexCount = indices.length;
    }

    draw(shader) {
        const gl = this.gl;
        shader.use();
        gl.bindVertexArray(this.vao);
        gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);
        gl.bindVertexArray(null);
    }
}
