import { Uniform } from '../../../three/three-core/Three';

export const HueSaturationShader: {
	uniforms: {
		tDiffuse: Uniform;
		hue: Uniform;
		saturation: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
