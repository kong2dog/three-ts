import { BoxGeometry } from '../../../three/three-core/Three';

export class RoundedBoxGeometry extends BoxGeometry {
	constructor(
		width?: number,
		height?: number,
		depth?: number,
		segments?: number,
		radius?: number
	);
}
