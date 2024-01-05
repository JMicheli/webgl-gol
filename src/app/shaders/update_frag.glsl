#version 300 es
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
}
