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
export declare class Shader {
    program: WebGLProgram;
    gl: WebGL2RenderingContext;
    /**
     * Create a shader object.
     * @constructor
     * @param {WebGL2RenderingContext} glContext Context to create the shader with
     * @param {string} vSource Source code for vertex shader
     * @param {string} fSource Source code for fragment shader
     */
    constructor(glContext: WebGL2RenderingContext, vSource: string, fSource: string);
    /**
     * Create a WebGL shader.
     * @param {string} source Shader source code
     * @param {number} type Represents a WebGL shader type
     * @return {WebGLShader} A handle to the new WebGL shader
     */
    private createGLShader;
    /**
     * Send a 2-float uniform to to GPU memory.
     * @param {string} name Name for uniform in shader code
     * @param {number} x First float value
     * @param {number} y Second float value
     * @return {boolean} Did the call succeed?
     */
    uniform2f(name: string, x: number, y: number): boolean;
    /**
     * Instruct WebGL to bind this shader program.
     */
    use(): void;
    /**
     * Instruct WebGL to unbind shaders.
     */
    disable(): void;
    /**
     * Delete this shader from GPU memory.
     */
    delete(): void;
}
export declare function createShader(gl: WebGL2RenderingContext, shader_source: ShaderSource): Shader;
