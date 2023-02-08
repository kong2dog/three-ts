import { Uniform } from '../../../three/three-core/Three';

export const VignetteShader: {
	uniforms: {
		tDiffuse: Uniform;
		offset: Uniform;
		darkness: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
