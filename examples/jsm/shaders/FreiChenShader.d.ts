import { Uniform } from '../../../three/three-core/Three';

export const FreiChenShader: {
	uniforms: {
		tDiffuse: Uniform;
		aspect: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
