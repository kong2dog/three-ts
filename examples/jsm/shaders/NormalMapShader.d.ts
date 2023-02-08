import { Uniform } from '../../../three/three-core/Three';

export const NormalMapShader: {
	uniforms: {
		heightMap: Uniform;
		resolution: Uniform;
		scale: Uniform;
		height: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
