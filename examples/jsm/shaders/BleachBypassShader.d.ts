import { Uniform } from '../../../three/three-core/Three';

export const BleachBypassShader: {
	uniforms: {
		tDiffuse: Uniform;
		opacity: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
