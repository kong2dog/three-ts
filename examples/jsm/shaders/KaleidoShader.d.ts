import { Uniform } from '../../../three/three-core/Three';

export const KaleidoShader: {
	uniforms: {
		tDiffuse: Uniform;
		sides: Uniform;
		angle: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
