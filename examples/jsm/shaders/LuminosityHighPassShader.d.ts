import { Uniform } from '../../../three/three-core/Three';

export const LuminosityHighPassShader: {
	shaderID: string;
	uniforms: {
		tDiffuse: Uniform;
		luminosityThreshold: Uniform;
		smoothWidth: Uniform;
		defaultColor: Uniform;
		defaultOpacity: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
