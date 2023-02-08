import { Uniform } from '../../../three/three-core/Three';

export const MirrorShader: {
	uniforms: {
		tDiffuse: Uniform;
		side: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
