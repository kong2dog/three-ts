import { Uniform } from '../../../three/three-core/Three';

export const AfterimageShader: {
	uniforms: {
		damp: Uniform;
		tOld: Uniform;
		tNew: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
