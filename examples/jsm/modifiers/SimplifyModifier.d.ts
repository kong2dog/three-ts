import { BufferGeometry } from '../../../three/three-core/Three';

export class SimplifyModifier {
	constructor();
	modify(geometry: BufferGeometry, count: number): BufferGeometry;
}
