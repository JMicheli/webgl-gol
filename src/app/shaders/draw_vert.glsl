#version 300 es
precision highp float;
layout(location = 0) in vec2 a_pos;
out vec2 v_texcoord;

void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
  v_texcoord = vec2((a_pos.x + 1.0)/2.0, (a_pos.y + 1.0)/2.0);
}
