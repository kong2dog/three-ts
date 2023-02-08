import { Uniform } from '../../../three/three-core/Three';

export const HorizontalBlurShader: {
	uniforms: {
		tDiffuse: Uniform;
		h: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
