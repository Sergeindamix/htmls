#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Función para generar ruido basada en https://thebookofshaders.com/13/
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main() {
    // Coordenadas normalizadas del píxel
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    // Color base
    vec3 color = vec3(0.0);

    // Generar ruido con la función random
    float n = random(st);

    // Añadir el tiempo al ruido para crear la animación
    n += u_time * 0.1;

    // Usar el ruido para modificar el color base
    color += n * vec3(0.5, 0.8, 1.0);

    // Asignar el color al píxel
    gl_FragColor = vec4(color,1.0);
}