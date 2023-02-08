import { Uniform } from '../../../three/three-core/Three';

export const TriangleBlurShader: {
	uniforms: {
		texture: Uniform;
		delta: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
