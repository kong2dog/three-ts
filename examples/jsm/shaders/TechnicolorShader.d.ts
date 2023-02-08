import { Uniform } from '../../../three/three-core/Three';

export const TechnicolorShader: {
	uniforms: {
		tDiffuse: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
