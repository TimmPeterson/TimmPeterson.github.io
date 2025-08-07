#version 300 es
in vec2 a_position;
in float a_id;

uniform float u_N;
uniform float u_time;
uniform vec2  u_resolution;

out vec3 fragColor;

void main() {
    // Размещаем точки по окружности
    float N = 100.0;           // количество вершин
    float angle = a_id / u_N * 6.28318530718 + u_time / 3.; // полный круг = 2π
  
    vec3 pos = vec3(vec2(cos(angle), sin(angle)) * 0.8, 0.0); // радиус 0.8 от центра
  	pos.z = pos.y + 1.8;
  
    gl_Position = vec4(pos.xy / pos.z, 0.0, 1.0);
  	
  	float ar = 1.0;
  	if (u_resolution.x > u_resolution.y) {
      ar = u_resolution.x / u_resolution.y;
      gl_Position.y *= ar;
    }
  	else {
      ar = u_resolution.y / u_resolution.x;
      gl_Position.x *= ar;
    }
  
    gl_PointSize = pow(4.0 - pos.z, 3.0);

    fragColor = vec3(1.0);
}