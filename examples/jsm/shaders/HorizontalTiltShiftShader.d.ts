import { Uniform } from '../../../three/three-core/Three';

export const HorizontalTiltShiftShader: {
	uniforms: {
		tDiffuse: Uniform;
		h: Uniform;
		r: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
