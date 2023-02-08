import { Uniform } from '../../../three/three-core/Three';

export const SepiaShader: {
	uniforms: {
		tDiffuse: Uniform;
		amount: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
