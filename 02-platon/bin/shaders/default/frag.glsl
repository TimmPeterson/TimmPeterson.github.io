#version 300 es
precision highp float;

out vec4 OutColor;

in vec3 DrawPos;
in vec3 DrawNormal;

uniform u_material {
    vec4 Ka4;
    vec4 Kd4;
    vec4 KsPh;
};

#define Ka Ka4.xyz
#define Kd Kd4.xyz
#define Ks KsPh.xyz
#define Ph KsPh.w

uniform float Time;

void main(void) {
    vec3 L = normalize(vec3(0, 0.5f, 1));
    vec3 N = normalize(DrawNormal);

    N = faceforward(N, normalize(DrawPos), N);

    float k = dot(L, normalize(N));

    vec3 color = k * Kd;//vec3(0.0f, 0.7f, 0.7f);
    vec3 R, V = vec3(0, 0, -1);

    R = reflect(V, N);
    color += Ks * max(0.01f, pow(dot(R, L), Ph));

    //OutColor = vec4(Ka, 1.0f);
    OutColor = vec4(color, 1.0f);
    //OutColor = vec4(N, 1.0);
}