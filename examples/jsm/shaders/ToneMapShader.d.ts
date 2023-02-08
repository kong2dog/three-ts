import { Uniform } from '../../../three/three-core/Three';

export const ToneMapShader: {
	uniforms: {
		tDiffuse: Uniform;
		averageLuminance: Uniform;
		luminanceMap: Uniform;
		maxLuminance: Uniform;
		minLuminance: Uniform;
		middleGrey: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
