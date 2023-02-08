import { Uniform } from '../../../three/three-core/Three';

export const ColorCorrectionShader: {
	uniforms: {
		tDiffuse: Uniform;
		powRGB: Uniform;
		mulRGB: Uniform;
		addRGB: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
