import { Uniform } from '../../../three/three-core/Three';

export const WaterRefractionShader: {
	uniforms: {
		color: Uniform;
		time: Uniform;
		tDiffuse: Uniform;
		tDudv: Uniform;
		textureMatrix: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
