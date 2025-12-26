#version 300 es
precision highp float;

uniform float u_time;
uniform vec2  u_resolution;

out vec4 outColor;

float sphere( vec3 p, vec3 c, float r )
{
  return length(p - c) - r;
}

float scene( vec3 p )
{
  return sphere(p, vec3(0, 0, 0), 5.0);
}

vec3 phong( vec3 p, vec3 n )
{
  return vec3(1.0);
}

vec3 background( void )
{
  return vec3(0);
}

vec3 raymarch( vec3 ro, vec3 rd )
{
  const int STEPS = 100;
  const float DELTA = 0.01;
  const float FAR = 200.0;
  float dist = 0.0;

  for (int i = 0; i < STEPS; i++)
  {
    vec3 p = ro + dist * rd;
    float sdf = scene(p);

    if (sdf > FAR || dist > FAR)
      return background();
    if (sdf < DELTA)
      return phong(p, vec3(0));

    dist += sdf;
  }
  return background();
}

void main() 
{  
  float mn = min(u_resolution.x, u_resolution.y);
  vec2 uv = (2.0 * gl_FragCoord.xy - u_resolution) / mn;
  
  vec3 col = raymarch(vec3(0, 0, -8), normalize(vec3(uv, 1.0)));

  outColor = vec4(col, 1.0);
}