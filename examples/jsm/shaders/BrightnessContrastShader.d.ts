import { Uniform } from '../../../three/three-core/Three';

export const BrightnessContrastShader: {
	uniforms: {
		tDiffuse: Uniform;
		brightness: Uniform;
		contrast: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
