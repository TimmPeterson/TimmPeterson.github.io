#version 300 es
in vec2 a_position;
in float a_id;

uniform float u_N;

out vec3 fragColor;

void main() {
    // Размещаем точки по окружности
    float N = 100.0;           // количество вершин
    float angle = a_id / u_N * 6.28318530718; // полный круг = 2π

    vec2 pos = vec2(cos(angle), sin(angle)) * 0.8; // радиус 0.8 от центра
    gl_Position = vec4(pos, 0.0, 1.0);
    gl_PointSize = 12.0;
    
    fragColor = vec3(1.0);
}
