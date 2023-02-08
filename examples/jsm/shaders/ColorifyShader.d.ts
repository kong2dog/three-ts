import { Uniform } from '../../../three/three-core/Three';

export const ColorifyShader: {
	uniforms: {
		tDiffuse: Uniform;
		color: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
