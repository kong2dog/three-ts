import {
	AnimationClip,
	Skeleton,
	Loader,
	LoadingManager,
} from '../../../three/three-core/Three';

export interface BVH {
	clip: AnimationClip;
	skeleton: Skeleton;
}

export class BVHLoader extends Loader {
	constructor(manager?: LoadingManager);
	animateBonePositions: boolean;
	animateBoneRotations: boolean;

	load(
		url: string,
		onLoad: (bvh: BVH) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(
		url: string,
		onProgress?: (event: ProgressEvent) => void
	): Promise<BVH>;
	parse(text: string): BVH;
}
