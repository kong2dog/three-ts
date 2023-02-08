import { Uniform } from '../../../three/three-core/Three';

export const FXAAShader: {
	uniforms: {
		tDiffuse: Uniform;
		resolution: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
