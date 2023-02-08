import { Uniform } from '../../../three/three-core/Three';

export const PixelShader: {
	uniforms: {
		tDiffuse: Uniform;
		resolution: Uniform;
		pixelSize: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
