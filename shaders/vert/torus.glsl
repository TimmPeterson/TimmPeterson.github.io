#version 300 es
in vec2 a_position;
in float a_id;

uniform float u_N;
uniform float u_time;
uniform vec2  u_resolution;

out vec3 fragColor;

mat4 proj( float L, float R, float B, float T, float N, float F )
{
    return
        mat4(vec4(2. * N / (R - L), 0, 0, 0),
             vec4(0, 2. * N / (T - B), 0, 0),
             vec4((R + L) / (R - L), (T + B) / (T - B), -(F + N) / (F - N), -1),
             vec4(0, 0, -2. * N * F / (F - N), 0));
}

mat4 view( vec3 Loc, vec3 At, vec3 Up1 )
{
    vec3
      Dir 	= normalize(At - Loc),
      Right = normalize(cross(Dir, Up1)),
      Up 	= normalize(cross(Right, Dir));

    return 
      	mat4(vec4(Right.x, Up.x, -Dir.x, 0), 
             vec4(Right.y, Up.y, -Dir.y, 0), 
             vec4(Right.z, Up.z, -Dir.z, 0),
             vec4(-dot(Loc, Right), -dot(Loc, Up), dot(Loc, Dir), 1));
}

mat3 rot( vec3 axis, float angle )
{
  mat3 I = transpose(mat3(vec3(1, 0, 0),
                		  vec3(0, 1, 0),
                		  vec3(0, 0, 1)));
  mat3 X = transpose(mat3(vec3(0, -axis.z, axis.y),
                		  vec3(axis.z, 0, -axis.x),
                	      vec3(-axis.y, axis.x, 0)));
  mat3 P = transpose(mat3(vec3(axis.x * axis.x, axis.x * axis.y, axis.x * axis.z),
                		  vec3(axis.y * axis.x, axis.y * axis.y, axis.y * axis.z),
                		  vec3(axis.z * axis.x, axis.z * axis.y, axis.z * axis.z)));
  float c = cos(angle), s = sin(angle);
  
  return c * I + s * X + (1.0 - c) * P;
}

void main() {
    // Размещаем точки по окружности
  	int W = 50, H = 100;
  
  	vec2 UV     = vec2(int(a_id) / W, int(a_id) % W) / vec2(H, W);
  	float theta = UV.x * 2.0 * 3.1415;
  	float phi   = (UV.y + UV.x) * 2.0 * 3.1415;
  
    float angle = UV.y * 6.28318530718 + u_time / 3.; // полный круг = 2π
  
    vec3 pos = vec3(vec2(cos(angle), sin(angle)) * 0.8, 0.0); // радиус 0.8 от центра
  	pos.z = 1.0;
  
  
  	float R = 1.4, r = 0.6;
  
  	pos = rot(vec3(1, 0, 0), u_time / 5.0) * 
          rot(vec3(0, 1, 0), phi) * 
         (rot(vec3(1, 0, 0), theta) * vec3(0, r, 0) + vec3(0, 0, R));
  
    gl_Position = vec4(pos, 1.0);
  	gl_Position = proj(-1.0, 1.0, -1.0, 1.0, 2., 100.) * 
                  view(4.0 * vec3(1.0, 1.0, 1.0), vec3(0, 0, 0), vec3(0, 1, 0)) * 
                  gl_Position;
  	gl_Position = gl_Position / gl_Position.w;
  	
  	float ar = 1.0;
  	if (u_resolution.x < u_resolution.y) {
      ar = u_resolution.x / u_resolution.y;
      gl_Position.y *= ar;
    }
  	else {
      ar = u_resolution.y / u_resolution.x;
      gl_Position.x *= ar;
    }
  
  	fragColor = vec3(sin(vec2(theta, phi)), 1.0) * pow(1.3 - gl_Position.z, 7.0);
    gl_PointSize = 6.;//pow(4.0 - pos.z, 3.0);
}