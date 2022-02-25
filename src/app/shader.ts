/**
 * A class abstracting WebGL shader functionality.
 */
export default class Shader {
  public program: WebGLProgram;
  public gl: WebGL2RenderingContext;

  /**
   * Create a shader object.
   * @constructor
   * @param {WebGL2RenderingContext} glContext Context to create the shader with
   * @param {string} vSource Source code for vertex shader
   * @param {string} fSource Source code for fragment shader
   */
  constructor(glContext: WebGL2RenderingContext, vSource: string, fSource: string) {
    // Store context, place in const for readability
    const gl = this.gl = glContext;

    // Create a program and store it
    const prog = glContext.createProgram();
    if (!prog) { throw new Error("Failed to create program"); } else { this.program = prog; }

    const vShader = this.createGLShader(vSource, gl.VERTEX_SHADER);
    const fShader = this.createGLShader(fSource, gl.FRAGMENT_SHADER);
    gl.attachShader(prog, vShader);
    gl.deleteShader(vShader);
    gl.attachShader(prog, fShader);
    gl.deleteShader(fShader);
    gl.linkProgram(prog);

    // Handle errors
    const error = gl.getProgramInfoLog(prog);
    if (error) { throw new Error("Problem with program creation: " + error); }
  }

  /**
   * Create a WebGL shader.
   * @param {string} source Shader source code
   * @param {number} type Represents a WebGL shader type
   * @return {WebGLShader} A handle to the new WebGL shader
   */
  private createGLShader(source: string, type: number): WebGLShader {
    const gl = this.gl; // Convenience variable
    const shader = gl.createShader(type);
    if (!shader) { throw console.error("Failed to create shader of type " + type); }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    // Handle errors
    const error = gl.getShaderInfoLog(shader);
    if (error) { throw new Error("Shader compiler error: " + error); }

    return shader;
  }

  /**
   * Send a 2-float uniform to to GPU memory.
   * @param {string} name Name for uniform in shader code
   * @param {number} x First float value
   * @param {number} y Second float value
   * @return {boolean} Did the call succeed?
   */
  public uniform2f(name: string, x: number, y: number): boolean {
    this.use();
    const location = this.gl.getUniformLocation(this.program, name);
    if (location == -1) {
      this.disable();
      return false;
    }

    this.gl.uniform2f(location, x, y);
    this.disable();
    return true;
  }

  /**
   * Instruct WebGL to bind this shader program.
   */
  public use(): void {
    this.gl.useProgram(this.program);
  }

  /**
   * Instruct WebGL to unbind shaders.
   */
  public disable(): void {
    this.gl.useProgram(null);
  }

  /**
   * Delete this shader from GPU memory.
   */
  public delete(): void {
    this.disable();
    this.gl.deleteProgram(this.program);
  }
}
