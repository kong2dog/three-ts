import { BufferGeometry } from '../../../three/three-core/Three';

export class TeapotGeometry extends BufferGeometry {
	constructor(
		size?: number,
		segments?: number,
		bottom?: boolean,
		lid?: boolean,
		body?: boolean,
		fitLid?: boolean,
		blinn?: number
	);
}
