/**
 * A set of Vertex and Fragment shader sources
 * as strings containing GLSL.
 */
export interface ShaderSource {
  Vertex: string;
  Fragment: string;
}

/**
 * A class abstracting WebGL shader functionality.
 */
export class Shader {
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
    this.gl = glContext;
    this.program = this.createShaderProgram(vSource, fSource);
  }

  private createShaderProgram(vSource: string, fSource: string): WebGLProgram {
    const gl = this.gl;
    const program = gl.createProgram();
    if (!program) throw new Error("Failed to create shader program");

    // Create shaders
    const vShader = this.createGLShader(vSource, gl.VERTEX_SHADER);
    const fShader = this.createGLShader(fSource, gl.FRAGMENT_SHADER);

    // Attach shaders to program and link
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);

    // Check if there was an error
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program);
      throw new Error("Shader program failed to link: " + info);
    }

    // Delete residual shader objects
    gl.deleteShader(vShader);
    gl.deleteShader(fShader);

    return program;
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
    if (!shader) {
      throw console.error("Failed to create shader of type " + type);
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    // Handle errors
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader);
      throw new Error("Shader compiler error: " + info);
    }

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

export function createShader(gl: WebGL2RenderingContext, shader_source: ShaderSource): Shader {
  return new Shader(gl, shader_source.Vertex, shader_source.Fragment);
}
