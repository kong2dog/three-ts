import { Uniform } from '../../../three/three-core/Three';

export const SobelOperatorShader: {
	uniforms: {
		tDiffuse: Uniform;
		resolution: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
