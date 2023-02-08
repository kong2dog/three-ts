import {
	Vector3,
	Object3D,
	Mesh,
	QuadraticBezierCurve3,
	// Line,
} from '../../../three';
import { Line2 } from '../../../examples/jsm/lines/Line2';

import { LineGeometry } from '../../../examples/jsm/lines/LineGeometry';
import { LineMaterial } from '../../../examples/jsm/lines/LineMaterial';
import { ArrowGeometry } from '../geometry/ArrowGeometry';
import { ArrowMaterial } from '../materials/ArrowMateria';

const _axis = new Vector3();

export default class ArrowLineHelper extends Object3D {
	line: Line2;
	arrow1: Mesh<ArrowGeometry, ArrowMaterial> | undefined;
	center: Vector3;

	// dir is assumed to be normalized

	constructor(
		origin: Vector3 = new Vector3(0, 0, 0),
		end: Vector3 = new Vector3(0, 0, 0),
		ctlPoint: Vector3,
		linewidth = 1,
		hasArrow: Boolean = true,
		color: any = 0xf58200,
		// ctlOffset = 60,
		headLength?: number,
		headWidth?: number
	) {
		super();
		this.center = new Vector3(0, 0, 0);
		if (!headLength) {
			headLength = linewidth * 8;
		}
		if (!headWidth) {
			headWidth = linewidth * 4;
		}
		this.type = 'ArrowLineHelper';

		const _lineGeometry = new LineGeometry();

		const curve = new QuadraticBezierCurve3(origin, ctlPoint, end);
		const pointVecs = curve.getPoints(60);
		const points = pointVecs.reduce((arr, item: any) => {
			return arr.concat(item.x, item.y, item.z);
		}, []);
		this.center = pointVecs[29];
		_lineGeometry.setPositions(points);

		// this.position.copy(origin);
		const lineMat = new LineMaterial({
			color,
			// 线宽度
			linewidth,
			// worldUnits:true,
		});
		const screenHeight = window.screen.height;
		const screenWidth = window.screen.width;
		lineMat.resolution.set(screenWidth, screenHeight);
		this.line = new Line2(_lineGeometry, lineMat);
		this.line.matrixAutoUpdate = false;
		this.add(this.line);

		if (hasArrow) {
			const arrowMat = new ArrowMaterial({
				color,
				width: headWidth,
				height: headLength,
			});
			arrowMat.resolution.set(screenWidth, screenHeight);
			//切线,获取线中点位置的点和切线来画箭头
			const arrowP1 = curve.getPoint(0.5);
			const arrowDir1 = curve.getTangent(0.5);
			const arrowGeo1 = new ArrowGeometry();
			// const arrowGeo2 = new ArrowGeometry();
			// const arrowGeo3 = new ArrowGeometry();
			// const arrDirPos1 = arrowP1.clone().add(arrowDir1);
			arrowGeo1.setPositions([
				arrowP1.x,
				arrowP1.y,
				arrowP1.z,
				arrowDir1.x,
				arrowDir1.y,
				arrowDir1.z,
			]);
			// arrowGeo2.setPositions([arrowP2.x, arrowP2.y, arrowP2.z, arrowDir2.x, arrowDir2.y, arrowDir2.z]);
			// arrowGeo3.setPositions([arrowP3.x, arrowP3.y, arrowP3.z, arrowDir3.x, arrowDir3.y, arrowDir3.z]);
			this.arrow1 = new Mesh(arrowGeo1, arrowMat);
			// this.arrow2 = new Mesh(arrowGeo2, arrowMat);
			// this.arrow3 = new Mesh(arrowGeo3, arrowMat);
			this.arrow1.matrixAutoUpdate = false;
			this.arrow1.position.copy(arrowP1.clone());
			this.arrow1.updateMatrix();
			// this.arrow2.matrixAutoUpdate = false;
			// this.arrow3.matrixAutoUpdate = false;

			this.add(this.arrow1);
			// this.add(this.arrow2);
			// this.add(this.arrow3);
		}
	}

	setColor(color: any) {
		this.line.material.color.set(color);
		if (this.arrow1 !== undefined) {
			this.arrow1.material.color.set(color);
		}
	}

	copy(source: any) {
		super.copy(source, false);

		this.line.copy(source.line);

		return this;
	}

	raycast(raycaster: any, intersects: any) {
		this.line.raycast(raycaster, intersects);
		if (intersects) {
			for (let i = 0; i < intersects.length; i++) {
				const intersect = intersects[i];
				if (intersect && intersect.object == this.line) {
					delete intersect.object;
					intersect.object = this;
					// break;
				}
			}
		}
	}
}
