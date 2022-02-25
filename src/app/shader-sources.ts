/**
 * A set of Vertex and Fragment shader sources
 * as strings containing GLSL.
 */
export interface ShaderSource {
  Vertex: string;
  Fragment: string;
}

// Vertex shader for update call
const UpdateVertexSource: string = `#version 300 es
layout(location = 0) in vec2 a_pos;

void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

// Fragment shader for updating grid
const UpdateFragmentSource: string = `#version 300 es
precision highp float;
uniform sampler2D u_state;
uniform vec2 u_scale;
out vec4 color;

int cell_value(vec2 offset) {
  //Compute uvs from pixel space coordinates
  vec2 state_coords = (gl_FragCoord.xy + offset) / u_scale;
  return int(texture(u_state, state_coords));
}

int neighbors() {
  int count = 0;

  //Sum up all states
  count += cell_value(vec2(0,  1));
  count += cell_value(vec2(1,  1));
  count += cell_value(vec2(1,  0));
  count += cell_value(vec2(1, -1));
  count += cell_value(vec2(0, -1));
  count += cell_value(vec2(-1,-1));
  count += cell_value(vec2(-1, 0));
  count += cell_value(vec2(-1, 1));

  return count;
}

void main() {
  //Grab number of neighbors
  int n = neighbors();

  if (n < 2) {
    color = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }
  if (n > 3) {
    color = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }
  if (n == 3) {
    color = vec4(1.0, 1.0, 1.0, 1.0);
    return;
  }
  else {
    float state_color = float(cell_value(vec2(0.0, 0.0)));
    color = vec4(state_color, state_color, state_color, 1.0);
    return;
  }
}`;

// Vertex shader for draw call
const DrawVertexSource: string = `#version 300 es
precision highp float;
layout(location = 0) in vec2 a_pos;
out vec2 v_texcoord;

void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
  v_texcoord = vec2((a_pos.x + 1.0)/2.0, (a_pos.y + 1.0)/2.0);
}`;

// Fragment shader coloring grid on draw call
const DrawFragmentSource = `#version 300 es
precision highp float;

in vec2 v_texcoord;

uniform sampler2D u_texture;
out vec4 color;

void main() {
  color = texture(u_texture, v_texcoord);
}`;

export const UpdateSource: ShaderSource = {
  Vertex: UpdateVertexSource,
  Fragment: UpdateFragmentSource
};

export const DrawSource: ShaderSource = {
  Vertex: DrawVertexSource,
  Fragment: DrawFragmentSource
};
