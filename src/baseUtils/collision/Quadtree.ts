/**
 * quadtree-js
 */

import getUUID from '../maths/getUUID';
interface boundsType {
	width: number;
	height: number;
	x: number;
	y: number;
}
interface defaultRect {
	x: number;
	y: number;
	width: number;
	height: number;
}
/**
 * The Quadtree uses rectangle objects for all areas ("Rect").
 * All rectangles require the properties x, y, width, height
 * @typedef {Object} Rect
 * @property {number} x         X-Position
 * @property {number} y         Y-Position
 * @property {number} width     Width
 * @property {number} height    Height
 */

export default class Quadtree<T> {
	private _id: string;
	public max_objects: number;
	public max_levels: number;
	public level: number;
	public bounds: boundsType;
	public getQuadrantIndex: any; //TODO
	public treeLeafs: { [key: string]: Quadtree<T> };
	public middlePoint: { x: number; y: number };
	public objects: Array<T>;
	public nodes: Array<Quadtree<T>>;
	/**
	 * Quadtree Constructor
	 * @class Quadtree
	 * @param {Rect} bounds                 bounds of the node ({ x, y, width, height })
	 * @param {number} [max_objects=10]     (optional) max objects a node can hold before splitting into 4 subnodes (default: 10)
	 * @param {number} [max_levels=4]       (optional) total max levels inside root Quadtree (default: 4)
	 * @param {number} [level=0]            (optional) depth level, required for subnodes (default: 0)
	 */
	constructor({
		bounds,
		maxObjects,
		maxLevels,
		level,
		getQuadrantIndex,
		treeLeafs = {},
	}: {
		bounds: boundsType;
		maxObjects?: number;
		maxLevels?: number;
		level?: number;
		getQuadrantIndex?: Function;
		treeLeafs?: {};
	}) {
		this._id = getUUID();
		this.max_objects = maxObjects || 10;
		this.max_levels = maxLevels || 4;

		this.level = level || 0;
		this.bounds = bounds;
		this.getQuadrantIndex = getQuadrantIndex;
		this.treeLeafs = treeLeafs; // 装载有对象的 叶子 四叉树

		// middlePoint is QuadRect center point {x, y}
		this.middlePoint = {
			x: this.bounds.x + this.bounds.width / 2,
			y: this.bounds.y + this.bounds.height / 2,
		};

		this.objects = [];
		this.nodes = [];
	}

	/**
	 * Split the node into 4 subnodes
	 * @memberof Quadtree
	 */
	split() {
		const nextLevel = this.level + 1,
			subWidth = this.bounds.width / 2,
			subHeight = this.bounds.height / 2,
			x = this.bounds.x,
			y = this.bounds.y;

		//top right node
		this.nodes[0] = new Quadtree({
			bounds: { x: x + subWidth, y, width: subWidth, height: subHeight },
			maxObjects: this.max_objects,
			maxLevels: this.max_levels,
			level: nextLevel,
			getQuadrantIndex: this.getQuadrantIndex,
			treeLeafs: this.treeLeafs,
		});

		//top left node
		this.nodes[1] = new Quadtree({
			bounds: { x, y, width: subWidth, height: subHeight },
			maxObjects: this.max_objects,
			maxLevels: this.max_levels,
			level: nextLevel,
			getQuadrantIndex: this.getQuadrantIndex,
			treeLeafs: this.treeLeafs,
		});

		//bottom left node
		this.nodes[2] = new Quadtree({
			bounds: { x, y: y + subHeight, width: subWidth, height: subHeight },
			maxObjects: this.max_objects,
			maxLevels: this.max_levels,
			level: nextLevel,
			getQuadrantIndex: this.getQuadrantIndex,
			treeLeafs: this.treeLeafs,
		});

		//bottom right node
		this.nodes[3] = new Quadtree({
			bounds: {
				x: x + subWidth,
				y: y + subHeight,
				width: subWidth,
				height: subHeight,
			},
			maxObjects: this.max_objects,
			maxLevels: this.max_levels,
			level: nextLevel,
			getQuadrantIndex: this.getQuadrantIndex,
			treeLeafs: this.treeLeafs,
		});
	}

	/**
	 * Determine which node the object belongs to
	 * @param {Rect} pRect      bounds of the area to be checked ({ x, y, width, height })
	 * @return {number[]}       an array of indexes of the intersecting subnodes (0-3 = top-right, top-left, bottom-left, bottom-right / ne, nw, sw, se)
	 * @memberof Quadtree
	 */
	getIndex(pRect: T) {
		if (this.getQuadrantIndex && typeof this.getQuadrantIndex === 'function') {
			return this.getQuadrantIndex(pRect, this.middlePoint);
		}
		return this.defaultGetIndex(pRect as unknown as defaultRect);
	}

	/**
	 * Determine which node the object belongs to
	 * @param {Rect} pRect      bounds of the area to be checked ({ x, y, width, height })
	 * @return {Set<Number>}       an array of indexes of the intersecting subnodes (0-3 = top-right, top-left, bottom-left, bottom-right / ne, nw, sw, se)
	 * @memberof Quadtree
	 */
	defaultGetIndex(pRect: defaultRect) {
		const indexes = new Set(),
			verticalMidpoint = this.middlePoint.y,
			horizontalMidpoint = this.middlePoint.x;

		const startIsNorth = pRect.x < horizontalMidpoint,
			startIsWest = pRect.y < verticalMidpoint,
			endIsEast = pRect.x + pRect.width > horizontalMidpoint,
			endIsSouth = pRect.y + pRect.height > verticalMidpoint;

		//top-right quad
		if (startIsNorth && endIsEast) {
			indexes.add(0);
		}

		//top-left quad
		if (startIsWest && startIsNorth) {
			indexes.add(1);
		}

		//bottom-left quad
		if (startIsWest && endIsSouth) {
			indexes.add(2);
		}

		//bottom-right quad
		if (endIsEast && endIsSouth) {
			indexes.add(3);
		}

		return indexes;
	}

	/**
	 * Insert the object into the node. If the node
	 * exceeds the capacity, it will split and add all
	 * objects to their corresponding subnodes.
	 * @param {Rect} pRect      bounds of the object to be added ({ x, y, width, height })
	 * @param {Function} getQuadrantIndex(quadCenter, pRect)      function of get quadrant Index , please return Array example as [0, 1, 2, 3];
	 *                                          0 :op-right quad , 1 : top-left quad , 2 : bottom-left quad , 3 : bottom-right quad
	 * @memberof Quadtree
	 */
	insert(pRect: T) {
		let i = 0,
			indexes;

		//if we have subnodes, call insert on matching subnodes
		if (this.nodes.length) {
			indexes = this.getIndex(pRect);
			for (const index of indexes.values()) {
				this.nodes[index].insert(pRect);
			}
			return;
		}

		//otherwise, store object here
		this.objects.push(pRect);
		this.treeLeafs[this._id] = this; // 将四叉树 记到 treeLeafs 容器中

		//max_objects reached
		if (
			this.objects.length > this.max_objects &&
			this.level < this.max_levels
		) {
			//split if we don't already have subnodes
			if (!this.nodes.length) {
				this.split();
			}

			//add all objects to their corresponding subnode
			for (i = 0; i < this.objects.length; i++) {
				indexes = this.getIndex(this.objects[i]);
				for (const index of indexes.values()) {
					this.nodes[index].insert(this.objects[i]);
				}
			}

			//clean up this node
			this.objects = [];
			delete this.treeLeafs[this._id];
		}
	}

	/**
	 * Return all objects that could collide with the given object
	 * @param {Rect} pRect      bounds of the object to be checked ({ x, y, width, height })
	 * @return {Rect[]}         array with all detected objects
	 * @memberof Quadtree
	 */
	retrieve(pRect: T) {
		const indexes = this.getIndex(pRect);
		let returnObjects: T[] = this.objects;

		//if we have subnodes, retrieve their objects
		if (this.nodes.length) {
			for (const index of indexes.values()) {
				returnObjects = returnObjects.concat(this.nodes[index].retrieve(pRect));
			}
		}

		//remove duplicates
		returnObjects = returnObjects.filter(function (item, index) {
			return returnObjects.indexOf(item) >= index;
		});

		return returnObjects;
	}

	// 获取 装载元素的叶子节点
	getTreeLeafs() {
		return Object.values(this.treeLeafs);
	}

	clear() {
		this.objects = [];

		for (let i = 0; i < this.nodes.length; i++) {
			if (this.nodes.length) {
				this.nodes[i].clear();
			}
		}

		this.nodes = [];
	}
}
