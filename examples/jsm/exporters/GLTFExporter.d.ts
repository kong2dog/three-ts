import { Object3D, AnimationClip } from '../../../three/three-core/Three';

export interface GLTFExporterOptions {
	binary?: boolean;
	trs?: boolean;
	onlyVisible?: boolean;
	truncateDrawRange?: boolean;
	embedImages?: boolean;
	animations?: AnimationClip[];
	forceIndices?: boolean;
	forcePowerOfTwoTextures?: boolean;
	includeCustomExtensions?: boolean;
}

export class GLTFExporter {
	constructor();

	parse(
		input: Object3D,
		onCompleted: (gltf: object) => void,
		options: GLTFExporterOptions
	): void;
	parseAsync(input: Object3D, options: GLTFExporterOptions): Promise<void>;
}
