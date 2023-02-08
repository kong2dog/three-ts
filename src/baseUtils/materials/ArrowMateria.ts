import {
	ShaderLib,
	ShaderMaterial,
	UniformsLib,
	UniformsUtils,
	Vector2,
} from '../../../three';

const arrow = {
	worldUnits: { value: 1 },
	width: { value: 1 },
	height: { value: 1 },
	resolution: { value: new Vector2(1, 1) },
};
ShaderLib['arrow'] = {
	uniforms: UniformsUtils.merge([UniformsLib.common, UniformsLib.fog, arrow]),

	vertexShader: `
	#include <common>
	#include <color_pars_vertex>
	#include <fog_pars_vertex>
	#include <logdepthbuf_pars_vertex>
	#include <clipping_planes_pars_vertex>
	  struct Bound2 {
          vec2 min;
		  vec2 max;
	  };
	  attribute vec3 basePos;
	//   attribute vec3 arrowDir;
	  attribute vec3 arrDirzPos;
	  uniform vec2 resolution;
	
	  uniform float width;
	  uniform float height;

	  varying vec3 oriPos;

		vec4 transform(vec3 coord) {
		    return projectionMatrix * modelViewMatrix * vec4(coord, 1.0);
		}

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}
 
		float intersectBox(vec2 origin , vec2 dir ,Bound2 box ) {

			float tmin; float tmax; float tymin; float tymax ;

        	float invdirx = 1.0 / dir.x;
        	float invdiry = 1.0 / dir.y;
			

			if ( invdirx >= 0.0 ) {

				tmin = ( box.min.x - origin.x ) * invdirx;
				tmax = ( box.max.x - origin.x ) * invdirx;

			} else {

				tmin = ( box.max.x - origin.x ) * invdirx;
				tmax = ( box.min.x - origin.x ) * invdirx;

			}

			if ( invdiry >= 0.0 ) {

				tymin = ( box.min.y - origin.y ) * invdiry;
				tymax = ( box.max.y - origin.y ) * invdiry;

			} else {

				tymin = ( box.max.y - origin.y ) * invdiry;
				tymax = ( box.min.y - origin.y ) * invdiry;

			}

			if ( ( tmin > tymax ) || ( tymin > tmax ) ) return 0.0;

			// These lines also handle the case where tmin or tmax is NaN
			// (result of 0 * Infinity). x !== x returns true if x is NaN

			if ( tymin > tmin || tmin != tmin ) tmin = tymin;

			if ( tymax < tmax || tmax != tmax ) tmax = tymax;
		
			//return point closest to the ray (positive side)

			if ( tmax < 0.0 ) return 0.0;

			return tmin >= 0.0 ? tmin : tmax ;

	    }
	void main(){
		// vec4 baseClip = transform(basePos)	;
		vec4 start = modelViewMatrix * vec4( vec3(0.0,0.0,0.0), 1.0 );
		// vec4 start = modelViewMatrix * vec4( basePos, 1.0 );
		vec4 end = modelViewMatrix * vec4( arrDirzPos, 1.0 );
		// vec4 arrowDirClip =  projectionMatrix * modelViewMatrix * vec4(arrowDir,0.0);


		bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

		if ( perspective ) {

			if ( start.z < 0.0 && end.z >= 0.0 ) {

				trimSegment( start, end );

			} else if ( end.z < 0.0 && start.z >= 0.0 ) {

				trimSegment( end, start );

			}

		}

		// clip space
		vec4 clipStart = projectionMatrix * start;
		vec4 clipEnd = projectionMatrix * end;

		// ndc space
		vec3 ndcStart = clipStart.xyz / clipStart.w;
		vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

		// direction
		vec2 dir = ndcEnd.xy - ndcStart.xy;
		

		// vec2 boundWH = vec2(20.0, 18.0);
		// boundWH /= resolution.y;
		// Bound2 box ;
		// box.min = vec2( baseClip.xy - boundWH );
		// box.max = vec2( baseClip.xy + boundWH );
		 

		// vec3 ndcBase = baseClip.xyz / baseClip.w;
		// vec3 ndcArrow = arrowClip.xyz / arrowClip.w;

		float aspect = resolution.x / resolution.y;
  
		// vec2 dir = vec2(arrowDirClip.xy);

		dir.x *= aspect;
		dir = normalize( dir );

		vec2 offset = vec2( dir.y, -dir.x );
		// undo aspect ratio adjustment
		dir.x /= aspect;
		offset.x /= aspect;
 
		// float t = intersectBox( baseClip.xy , -dir , box);
		// baseClip.xy += t * (-dir);

		// if (position.x == 1.0) {
		// 	// offset *= 1.0;
		// 	offset *= width;
		// } else if (position.x == -1.0) {
		// 	offset *= -1.0;
		// 	offset *= width;
		// } else if (position.x == 2.0) {
		// 	offset = dir;
		// 	offset *= height;
		// }
		if (position.x < 0.0) {
			offset *= -1.0;
			offset *= width;
		} else if (position.x < 2.0) {
			// offset *= 1.0;
			offset *= width;
		} else {
			offset = dir;
			offset *= height;
		}
		offset /= resolution.y;
		// offset *= baseClip.w;
		offset *= clipStart.w;

        // baseClip.xy += offset;
        clipStart.xy += offset;
	
		 
		// oriPos = vec3(baseClip.xyz);
		 
        // gl_Position =  transform( position ) ;
        // gl_Position =  baseClip ;
        gl_Position =  clipStart ;
        // gl_Position =  vec4(offset, 0 , device.w) ;

        // gl_Position =  transform( device.xyz )  ;

		#include <logdepthbuf_vertex>
		#include <clipping_planes_vertex>
		#include <fog_vertex>
	  }
    `,
	fragmentShader: /* glsl */ `
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		varying vec3 oriPos;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		varying vec2 vUv;

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>
 

			float alpha = opacity;

			 

			vec4 diffuseColor = vec4( diffuse, alpha );
			// vec4 diffuseColor = vec4( oriPos, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <encodings_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`,
};

class ArrowMaterial extends ShaderMaterial {
	isLineMaterial: boolean;
	resolution: any;
	color: any;

	constructor(parameters: any) {
		super({
			uniforms: UniformsUtils.clone(ShaderLib['arrow'].uniforms),

			vertexShader: ShaderLib['arrow'].vertexShader,
			fragmentShader: ShaderLib['arrow'].fragmentShader,

			clipping: true, // required for clipping support
		});

		this.isLineMaterial = true;

		Object.defineProperties(this, {
			color: {
				enumerable: true,

				get() {
					return this.uniforms.diffuse.value;
				},

				set(value) {
					this.uniforms.diffuse.value = value;
				},
			},

			worldUnits: {
				enumerable: true,

				get() {
					return 'WORLD_UNITS' in this.defines;
				},

				set(value) {
					if (value === true) {
						this.defines.WORLD_UNITS = '';
					} else {
						delete this.defines.WORLD_UNITS;
					}
				},
			},

			width: {
				enumerable: true,

				get() {
					return this.uniforms.width.value;
				},

				set(value) {
					this.uniforms.width.value = value;
				},
			},

			height: {
				enumerable: true,

				get() {
					return this.uniforms.height.value;
				},

				set(value) {
					this.uniforms.height.value = value;
				},
			},
			opacity: {
				enumerable: true,

				get() {
					return this.uniforms.opacity.value;
				},

				set(value) {
					this.uniforms.opacity.value = value;
				},
			},

			resolution: {
				enumerable: true,

				get() {
					return this.uniforms.resolution.value;
				},

				set(value) {
					this.uniforms.resolution.value.copy(value);
				},
			},

			alphaToCoverage: {
				enumerable: true,

				get() {
					return Boolean('USE_ALPHA_TO_COVERAGE' in this.defines);
				},

				set(value) {
					if (
						Boolean(value) !== Boolean('USE_ALPHA_TO_COVERAGE' in this.defines)
					) {
						this.needsUpdate = true;
					}

					if (value === true) {
						this.defines.USE_ALPHA_TO_COVERAGE = '';
						this.extensions.derivatives = true;
					} else {
						delete this.defines.USE_ALPHA_TO_COVERAGE;
						this.extensions.derivatives = false;
					}
				},
			},
		});

		this.setValues(parameters);
	}
}

export { ArrowMaterial };
