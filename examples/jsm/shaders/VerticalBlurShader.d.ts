import { Uniform } from '../../../three/three-core/Three';

export const VerticalBlurShader: {
	uniforms: {
		tDiffuse: Uniform;
		v: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
