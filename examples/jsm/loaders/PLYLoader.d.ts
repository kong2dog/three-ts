import {
	BufferGeometry,
	Loader,
	LoadingManager,
} from '../../../three/three-core/Three';

export class PLYLoader extends Loader {
	constructor(manager?: LoadingManager);
	propertyNameMapping: object;

	load(
		url: string,
		onLoad: (geometry: BufferGeometry) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(
		url: string,
		onProgress?: (event: ProgressEvent) => void
	): Promise<BufferGeometry>;
	setPropertyNameMapping(mapping: object): void;
	parse(data: ArrayBuffer | string): BufferGeometry;
}
