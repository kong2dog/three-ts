import { Uniform } from '../../../three/three-core/Three';

export const RGBShiftShader: {
	uniforms: {
		tDiffuse: Uniform;
		amount: Uniform;
		angle: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
