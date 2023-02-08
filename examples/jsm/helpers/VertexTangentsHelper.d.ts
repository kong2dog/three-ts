import { Object3D, LineSegments } from '../../../three/three-core/Three';

export class VertexTangentsHelper extends LineSegments {
	constructor(object: Object3D, size?: number, hex?: number);

	object: Object3D;
	size: number;

	update(): void;
}
