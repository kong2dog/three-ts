import { Uniform } from '../../../three/three-core/Three';

export const LuminosityShader: {
	uniforms: {
		tDiffuse: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
