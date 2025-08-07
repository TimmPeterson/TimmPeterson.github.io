#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;

out vec4 outColor;


vec2 mul(vec2 a, vec2 b)
{
  return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}

void main() 
{  
  	float mn = min(u_resolution.x, u_resolution.y);
    vec2 uv = 2.0 * (gl_FragCoord.xy - 0.5 * u_resolution) / mn;
   	
  	uv = (uv - vec2(0.25, 0)) * 1.25;
	vec3 col = vec3(0);
 	vec2 z = uv, z0 = uv;
  	int n = 0;
  
  	while (n < 256 && z.x * z.x + z.y * z.y < 4.0)
    {
      z = mul(z, z) + z0;
      n++;
    }
  
  	float m = float(n);
  	col = vec3(n, n, n) / 255.0;

    outColor = vec4(col, 1.0);
}