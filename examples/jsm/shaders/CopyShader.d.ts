import { Uniform } from '../../../three/three-core/Three';

export const CopyShader: {
	uniforms: {
		tDiffuse: Uniform;
		opacity: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
