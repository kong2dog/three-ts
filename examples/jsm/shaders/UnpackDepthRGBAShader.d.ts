import { Uniform } from '../../../three/three-core/Three';

export const UnpackDepthRGBAShader: {
	uniforms: {
		tDiffuse: Uniform;
		opacity: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
