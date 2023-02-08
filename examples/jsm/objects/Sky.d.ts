import {
	BoxGeometry,
	Mesh,
	ShaderMaterial,
} from '../../../three/three-core/Three';

export class Sky extends Mesh {
	constructor();

	geometry: BoxGeometry;
	material: ShaderMaterial;

	static SkyShader: object;
}
