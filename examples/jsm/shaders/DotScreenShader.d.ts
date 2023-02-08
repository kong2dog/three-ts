import { Uniform } from '../../../three/three-core/Three';

export const DotScreenShader: {
	uniforms: {
		tDiffuse: Uniform;
		tSize: Uniform;
		center: Uniform;
		angle: Uniform;
		scale: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
