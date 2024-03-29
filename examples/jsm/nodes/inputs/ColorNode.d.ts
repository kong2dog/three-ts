import { Color, ColorRepresentation } from '../../../../three/three-core/Three';

import { InputNode } from '../core/InputNode';
import { NodeBuilder } from '../core/NodeBuilder';

export class ColorNode extends InputNode {
	constructor(color: ColorRepresentation, g?: number, b?: number);

	value: Color;
	nodeType: string;

	generateReadonly(
		builder: NodeBuilder,
		output: string,
		uuid?: string,
		type?: string,
		ns?: string,
		needsUpdate?: boolean
	): string;
	copy(source: ColorNode): this;
}
