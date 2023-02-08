import { Uniform } from '../../../three/three-core/Three';

export const FocusShader: {
	uniforms: {
		tDiffuse: Uniform;
		screenWidth: Uniform;
		screenHeight: Uniform;
		sampleDistance: Uniform;
		waveFactor: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
