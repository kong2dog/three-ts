import { BufferGeometry } from '../../../three/three-core/Three';

export class BoxLineGeometry extends BufferGeometry {
	constructor(
		width?: number,
		height?: number,
		depth?: number,
		widthSegments?: number,
		heightSegments?: number,
		depthSegments?: number
	);
}
