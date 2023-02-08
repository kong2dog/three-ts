import {
	WebGLRenderTarget,
	ShaderMaterial,
} from '../../../three/three-core/Three';

import { Pass } from './Pass';

export class BloomPass extends Pass {
	constructor(
		strength?: number,
		kernelSize?: number,
		sigma?: number,
		resolution?: number
	);
	renderTargetX: WebGLRenderTarget;
	renderTargetY: WebGLRenderTarget;
	copyUniforms: object;
	materialCopy: ShaderMaterial;
	convolutionUniforms: object;
	materialConvolution: ShaderMaterial;
	fsQuad: object;
}
