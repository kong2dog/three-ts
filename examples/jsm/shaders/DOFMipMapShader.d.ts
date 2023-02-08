import { Uniform } from '../../../three/three-core/Three';

export const DOFMipMapShader: {
	uniforms: {
		tColor: Uniform;
		tDepth: Uniform;
		focus: Uniform;
		maxblur: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
