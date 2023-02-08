import {
	Box3,
	Float32BufferAttribute,
	InstancedBufferGeometry,
	InstancedInterleavedBuffer,
	InterleavedBufferAttribute,
	Matrix4,
	Vector3,
} from '../../../three';

const _box = new Box3();
const _vector = new Vector3();

class ArrowGeometry extends InstancedBufferGeometry {
	width: number;
	height: number;
	isArrowGeometry: boolean;

	constructor(width = 1, height = 1) {
		super();
		this.width = width;
		this.height = height;
		this.isArrowGeometry = true;

		this.type = 'ArrowGeometry';

		const positions = [1, 0, 2, 2, 1, 1, -1, -1, 1];
		const uvs = [-1, 2, 1, 2, -1, 1, 1, 1];
		const index = [0, 1, 2];

		this.setIndex(index);
		this.setAttribute('position', new Float32BufferAttribute(positions, 3));
		this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
	}

	applyMatrix4(matrix: Matrix4) {
		const basePos = this.attributes.basePos;
		if (basePos !== undefined) {
			basePos.applyMatrix4(matrix);

			console.log('arrow matrix', matrix);
			basePos.needsUpdate = true;
		}

		// if ( this.boundingBox !== null ) {

		// 	this.computeBoundingBox();

		// }

		// if ( this.boundingSphere !== null ) {

		// 	this.computeBoundingSphere();

		// }

		return this;
	}

	setPositions(array: any) {
		let pointer: any;

		if (array instanceof Float32Array) {
			pointer = array;
		} else if (Array.isArray(array)) {
			pointer = new Float32Array(array);
		}

		const instanceBuffer = new InstancedInterleavedBuffer(pointer, 6, 1); // xyz

		this.setAttribute(
			'basePos',
			new InterleavedBufferAttribute(instanceBuffer, 3, 0)
		); // xyz
		this.setAttribute(
			'arrDirzPos',
			new InterleavedBufferAttribute(instanceBuffer, 3, 3)
		); // xyz

		// this.computeBoundingBox();
		// this.computeBoundingSphere();

		return this;
	}

	setColors(array: any) {
		let colors: any;

		if (array instanceof Float32Array) {
			colors = array;
		} else if (Array.isArray(array)) {
			colors = new Float32Array(array);
		}

		const instanceColorBuffer = new InstancedInterleavedBuffer(colors, 3, 1); // rgb, rgb

		this.setAttribute(
			'instanceColorBase',
			new InterleavedBufferAttribute(instanceColorBuffer, 3, 0)
		); // rgb

		return this;
	}

	computeBoundingBox() {
		if (this.boundingBox === null) {
			this.boundingBox = new Box3();
		}

		const basePos = this.attributes.basePos;

		if (basePos !== undefined) {
			// this.boundingBox.setFromBufferAttribute(basePos );

			// _box.setFromBufferAttribute( end );

			this.boundingBox.union(_box);
		}
	}

	toJSON() {
		// todo
	}

	applyMatrix(matrix: Matrix4) {
		console.warn(
			'THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4().'
		);

		return this.applyMatrix4(matrix);
	}
}

export { ArrowGeometry };
