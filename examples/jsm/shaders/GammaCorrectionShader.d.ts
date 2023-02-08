import { Uniform } from '../../../three/three-core/Three';

export const GammaCorrectionShader: {
	uniforms: {
		tDiffuse: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
