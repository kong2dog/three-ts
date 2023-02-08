import { ShaderMaterial } from '../../../three/three-core/Three';

import { Pass } from './Pass';

export class FilmPass extends Pass {
	constructor(
		noiseIntensity?: number,
		scanlinesIntensity?: number,
		scanlinesCount?: number,
		grayscale?: number
	);
	uniforms: object;
	material: ShaderMaterial;
	fsQuad: object;
}
