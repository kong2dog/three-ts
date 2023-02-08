import {
	CubeTexture,
	LightProbe,
	WebGLRenderer,
	WebGLCubeRenderTarget,
} from '../../../three/three-core/Three';

export namespace LightProbeGenerator {
	function fromCubeTexture(cubeTexture: CubeTexture): LightProbe;
	function fromCubeRenderTarget(
		renderer: WebGLRenderer,
		cubeRenderTarget: WebGLCubeRenderTarget
	): LightProbe;
}
