var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e2) {
    throw err = [e2], e2;
  }
};
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e2) {
    throw mod = 0, e2;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// rendering-source/src/vendor/glfx.js
var glfx_exports = {};
__export(glfx_exports, {
  default: () => glfx_default
});
var fx, glfx_default;
var init_glfx = __esm({
  "rendering-source/src/vendor/glfx.js"() {
    fx = (function() {
      function q(a4, d2, c2) {
        return Math.max(a4, Math.min(d2, c2));
      }
      function w2(b2) {
        return { _: b2, loadContentsOf: function(b3) {
          a3 = this._.gl;
          this._.loadContentsOf(b3);
        }, destroy: function() {
          a3 = this._.gl;
          this._.destroy();
        } };
      }
      function A2(a4) {
        return w2(r2.fromElement(a4));
      }
      function B2(b2, d2) {
        var c2 = a3.UNSIGNED_BYTE;
        if (a3.getExtension("OES_texture_float") && a3.getExtension("OES_texture_float_linear")) {
          var e2 = new r2(100, 100, a3.RGBA, a3.FLOAT);
          try {
            e2.drawTo(function() {
              c2 = a3.FLOAT;
            });
          } catch (g2) {
          }
          e2.destroy();
        }
        this._.texture && this._.texture.destroy();
        this._.spareTexture && this._.spareTexture.destroy();
        this.width = b2;
        this.height = d2;
        this._.texture = new r2(b2, d2, a3.RGBA, c2);
        this._.spareTexture = new r2(b2, d2, a3.RGBA, c2);
        this._.extraTexture = this._.extraTexture || new r2(0, 0, a3.RGBA, c2);
        this._.flippedShader = this._.flippedShader || new h2(null, "uniform sampler2D texture;varying vec2 texCoord;void main(){gl_FragColor=texture2D(texture,vec2(texCoord.x,1.0-texCoord.y));}");
        this._.isInitialized = true;
      }
      function C2(a4, d2, c2) {
        this._.isInitialized && a4._.width == this.width && a4._.height == this.height || B2.call(this, d2 ? d2 : a4._.width, c2 ? c2 : a4._.height);
        a4._.use();
        this._.texture.drawTo(function() {
          h2.getDefaultShader().drawRect();
        });
        return this;
      }
      function D() {
        this._.texture.use();
        this._.flippedShader.drawRect();
        return this;
      }
      function f(a4, d2, c2, e2) {
        (c2 || this._.texture).use();
        this._.spareTexture.drawTo(function() {
          a4.uniforms(d2).drawRect();
        });
        this._.spareTexture.swapWith(e2 || this._.texture);
      }
      function E(a4) {
        a4.parentNode.insertBefore(this, a4);
        a4.parentNode.removeChild(a4);
        return this;
      }
      function F() {
        var b2 = new r2(this._.texture.width, this._.texture.height, a3.RGBA, a3.UNSIGNED_BYTE);
        this._.texture.use();
        b2.drawTo(function() {
          h2.getDefaultShader().drawRect();
        });
        return w2(b2);
      }
      function G2() {
        var b2 = this._.texture.width, d2 = this._.texture.height, c2 = new Uint8Array(4 * b2 * d2);
        this._.texture.drawTo(function() {
          a3.readPixels(0, 0, b2, d2, a3.RGBA, a3.UNSIGNED_BYTE, c2);
        });
        return c2;
      }
      function k(b2) {
        return function() {
          a3 = this._.gl;
          return b2.apply(this, arguments);
        };
      }
      function x2(a4, d2, c2, e2, g2, l3, n2, p2) {
        var m = c2 - g2, h3 = e2 - l3, f2 = n2 - g2, k2 = p2 - l3;
        g2 = a4 - c2 + g2 - n2;
        l3 = d2 - e2 + l3 - p2;
        var q2 = m * k2 - f2 * h3, f2 = (g2 * k2 - f2 * l3) / q2, m = (m * l3 - g2 * h3) / q2;
        return [c2 - a4 + f2 * c2, e2 - d2 + f2 * e2, f2, n2 - a4 + m * n2, p2 - d2 + m * p2, m, a4, d2, 1];
      }
      function y(a4) {
        var d2 = a4[0], c2 = a4[1], e2 = a4[2], g2 = a4[3], l3 = a4[4], n2 = a4[5], p2 = a4[6], m = a4[7];
        a4 = a4[8];
        var f2 = d2 * l3 * a4 - d2 * n2 * m - c2 * g2 * a4 + c2 * n2 * p2 + e2 * g2 * m - e2 * l3 * p2;
        return [(l3 * a4 - n2 * m) / f2, (e2 * m - c2 * a4) / f2, (c2 * n2 - e2 * l3) / f2, (n2 * p2 - g2 * a4) / f2, (d2 * a4 - e2 * p2) / f2, (e2 * g2 - d2 * n2) / f2, (g2 * m - l3 * p2) / f2, (c2 * p2 - d2 * m) / f2, (d2 * l3 - c2 * g2) / f2];
      }
      function z(a4) {
        var d2 = a4.length;
        this.xa = [];
        this.ya = [];
        this.u = [];
        this.y2 = [];
        a4.sort(function(a5, b2) {
          return a5[0] - b2[0];
        });
        for (var c2 = 0; c2 < d2; c2++) this.xa.push(a4[c2][0]), this.ya.push(a4[c2][1]);
        this.u[0] = 0;
        this.y2[0] = 0;
        for (c2 = 1; c2 < d2 - 1; ++c2) {
          a4 = this.xa[c2 + 1] - this.xa[c2 - 1];
          var e2 = (this.xa[c2] - this.xa[c2 - 1]) / a4, g2 = e2 * this.y2[c2 - 1] + 2;
          this.y2[c2] = (e2 - 1) / g2;
          this.u[c2] = (6 * ((this.ya[c2 + 1] - this.ya[c2]) / (this.xa[c2 + 1] - this.xa[c2]) - (this.ya[c2] - this.ya[c2 - 1]) / (this.xa[c2] - this.xa[c2 - 1])) / a4 - e2 * this.u[c2 - 1]) / g2;
        }
        this.y2[d2 - 1] = 0;
        for (c2 = d2 - 2; 0 <= c2; --c2) this.y2[c2] = this.y2[c2] * this.y2[c2 + 1] + this.u[c2];
      }
      function u2(a4, d2) {
        return new h2(null, a4 + "uniform sampler2D texture;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 coord=texCoord*texSize;" + d2 + "gl_FragColor=texture2D(texture,coord/texSize);vec2 clampedCoord=clamp(coord,vec2(0.0),texSize);if(coord!=clampedCoord){gl_FragColor.a*=max(0.0,1.0-length(coord-clampedCoord));}}");
      }
      function H(b2, d2) {
        a3.brightnessContrast = a3.brightnessContrast || new h2(null, "uniform sampler2D texture;uniform float brightness;uniform float contrast;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);color.rgb+=brightness;if(contrast>0.0){color.rgb=(color.rgb-0.5)/(1.0-contrast)+0.5;}else{color.rgb=(color.rgb-0.5)*(1.0+contrast)+0.5;}gl_FragColor=color;}");
        f.call(this, a3.brightnessContrast, { brightness: q(-1, b2, 1), contrast: q(-1, d2, 1) });
        return this;
      }
      function t2(a4) {
        a4 = new z(a4);
        for (var d2 = [], c2 = 0; 256 > c2; c2++) d2.push(q(0, Math.floor(256 * a4.interpolate(c2 / 255)), 255));
        return d2;
      }
      function I(b2, d2, c2) {
        b2 = t2(b2);
        1 == arguments.length ? d2 = c2 = b2 : (d2 = t2(d2), c2 = t2(c2));
        for (var e2 = [], g2 = 0; 256 > g2; g2++) e2.splice(e2.length, 0, b2[g2], d2[g2], c2[g2], 255);
        this._.extraTexture.initFromBytes(256, 1, e2);
        this._.extraTexture.use(1);
        a3.curves = a3.curves || new h2(null, "uniform sampler2D texture;uniform sampler2D map;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);color.r=texture2D(map,vec2(color.r)).r;color.g=texture2D(map,vec2(color.g)).g;color.b=texture2D(map,vec2(color.b)).b;gl_FragColor=color;}");
        a3.curves.textures({ map: 1 });
        f.call(this, a3.curves, {});
        return this;
      }
      function J(b2) {
        a3.denoise = a3.denoise || new h2(null, "uniform sampler2D texture;uniform float exponent;uniform float strength;uniform vec2 texSize;varying vec2 texCoord;void main(){vec4 center=texture2D(texture,texCoord);vec4 color=vec4(0.0);float total=0.0;for(float x=-4.0;x<=4.0;x+=1.0){for(float y=-4.0;y<=4.0;y+=1.0){vec4 sample=texture2D(texture,texCoord+vec2(x,y)/texSize);float weight=1.0-abs(dot(sample.rgb-center.rgb,vec3(0.25)));weight=pow(weight,exponent);color+=sample*weight;total+=weight;}}gl_FragColor=color/total;}");
        for (var d2 = 0; 2 > d2; d2++) f.call(this, a3.denoise, { exponent: Math.max(0, b2), texSize: [this.width, this.height] });
        return this;
      }
      function K2(b2, d2) {
        a3.hueSaturation = a3.hueSaturation || new h2(null, "uniform sampler2D texture;uniform float hue;uniform float saturation;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);float angle=hue*3.14159265;float s=sin(angle),c=cos(angle);vec3 weights=(vec3(2.0*c,-sqrt(3.0)*s-c,sqrt(3.0)*s-c)+1.0)/3.0;float len=length(color.rgb);color.rgb=vec3(dot(color.rgb,weights.xyz),dot(color.rgb,weights.zxy),dot(color.rgb,weights.yzx));float average=(color.r+color.g+color.b)/3.0;if(saturation>0.0){color.rgb+=(average-color.rgb)*(1.0-1.0/(1.001-saturation));}else{color.rgb+=(average-color.rgb)*(-saturation);}gl_FragColor=color;}");
        f.call(this, a3.hueSaturation, { hue: q(-1, b2, 1), saturation: q(-1, d2, 1) });
        return this;
      }
      function L2(b2) {
        a3.noise = a3.noise || new h2(null, "uniform sampler2D texture;uniform float amount;varying vec2 texCoord;float rand(vec2 co){return fract(sin(dot(co.xy,vec2(12.9898,78.233)))*43758.5453);}void main(){vec4 color=texture2D(texture,texCoord);float diff=(rand(texCoord)-0.5)*amount;color.r+=diff;color.g+=diff;color.b+=diff;gl_FragColor=color;}");
        f.call(this, a3.noise, { amount: q(0, b2, 1) });
        return this;
      }
      function M(b2) {
        a3.sepia = a3.sepia || new h2(null, "uniform sampler2D texture;uniform float amount;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);float r=color.r;float g=color.g;float b=color.b;color.r=min(1.0,(r*(1.0-(0.607*amount)))+(g*(0.769*amount))+(b*(0.189*amount)));color.g=min(1.0,(r*0.349*amount)+(g*(1.0-(0.314*amount)))+(b*0.168*amount));color.b=min(1.0,(r*0.272*amount)+(g*0.534*amount)+(b*(1.0-(0.869*amount))));gl_FragColor=color;}");
        f.call(this, a3.sepia, { amount: q(0, b2, 1) });
        return this;
      }
      function N(b2, d2) {
        a3.unsharpMask = a3.unsharpMask || new h2(null, "uniform sampler2D blurredTexture;uniform sampler2D originalTexture;uniform float strength;uniform float threshold;varying vec2 texCoord;void main(){vec4 blurred=texture2D(blurredTexture,texCoord);vec4 original=texture2D(originalTexture,texCoord);gl_FragColor=mix(blurred,original,1.0+strength);}");
        this._.extraTexture.ensureFormat(this._.texture);
        this._.texture.use();
        this._.extraTexture.drawTo(function() {
          h2.getDefaultShader().drawRect();
        });
        this._.extraTexture.use(1);
        this.triangleBlur(b2);
        a3.unsharpMask.textures({ originalTexture: 1 });
        f.call(this, a3.unsharpMask, { strength: d2 });
        this._.extraTexture.unuse(1);
        return this;
      }
      function O(b2) {
        a3.vibrance = a3.vibrance || new h2(null, "uniform sampler2D texture;uniform float amount;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);float average=(color.r+color.g+color.b)/3.0;float mx=max(color.r,max(color.g,color.b));float amt=(mx-average)*(-amount*3.0);color.rgb=mix(color.rgb,vec3(mx),amt);gl_FragColor=color;}");
        f.call(this, a3.vibrance, { amount: q(-1, b2, 1) });
        return this;
      }
      function P(b2, d2) {
        a3.vignette = a3.vignette || new h2(null, "uniform sampler2D texture;uniform float size;uniform float amount;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);float dist=distance(texCoord,vec2(0.5,0.5));color.rgb*=smoothstep(0.8,size*0.799,dist*(amount+size));gl_FragColor=color;}");
        f.call(this, a3.vignette, { size: q(0, b2, 1), amount: q(0, d2, 1) });
        return this;
      }
      function Q(b2, d2, c2) {
        a3.lensBlurPrePass = a3.lensBlurPrePass || new h2(null, "uniform sampler2D texture;uniform float power;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);color=pow(color,vec4(power));gl_FragColor=vec4(color);}");
        var e2 = "uniform sampler2D texture0;uniform sampler2D texture1;uniform vec2 delta0;uniform vec2 delta1;uniform float power;varying vec2 texCoord;" + s2 + "vec4 sample(vec2 delta){float offset=random(vec3(delta,151.7182),0.0);vec4 color=vec4(0.0);float total=0.0;for(float t=0.0;t<=30.0;t++){float percent=(t+offset)/30.0;color+=texture2D(texture0,texCoord+delta*percent);total+=1.0;}return color/total;}";
        a3.lensBlur0 = a3.lensBlur0 || new h2(null, e2 + "void main(){gl_FragColor=sample(delta0);}");
        a3.lensBlur1 = a3.lensBlur1 || new h2(null, e2 + "void main(){gl_FragColor=(sample(delta0)+sample(delta1))*0.5;}");
        a3.lensBlur2 = a3.lensBlur2 || new h2(null, e2 + "void main(){vec4 color=(sample(delta0)+2.0*texture2D(texture1,texCoord))/3.0;gl_FragColor=pow(color,vec4(power));}").textures({ texture1: 1 });
        for (var e2 = [], g2 = 0; 3 > g2; g2++) {
          var l3 = c2 + 2 * g2 * Math.PI / 3;
          e2.push([b2 * Math.sin(l3) / this.width, b2 * Math.cos(l3) / this.height]);
        }
        b2 = Math.pow(10, q(-1, d2, 1));
        f.call(this, a3.lensBlurPrePass, { power: b2 });
        this._.extraTexture.ensureFormat(this._.texture);
        f.call(this, a3.lensBlur0, { delta0: e2[0] }, this._.texture, this._.extraTexture);
        f.call(this, a3.lensBlur1, { delta0: e2[1], delta1: e2[2] }, this._.extraTexture, this._.extraTexture);
        f.call(this, a3.lensBlur0, { delta0: e2[1] });
        this._.extraTexture.use(1);
        f.call(this, a3.lensBlur2, { power: 1 / b2, delta0: e2[2] });
        return this;
      }
      function R2(b2, d2, c2, e2, g2, l3) {
        a3.tiltShift = a3.tiltShift || new h2(null, "uniform sampler2D texture;uniform float blurRadius;uniform float gradientRadius;uniform vec2 start;uniform vec2 end;uniform vec2 delta;uniform vec2 texSize;varying vec2 texCoord;" + s2 + "void main(){vec4 color=vec4(0.0);float total=0.0;float offset=random(vec3(12.9898,78.233,151.7182),0.0);vec2 normal=normalize(vec2(start.y-end.y,end.x-start.x));float radius=smoothstep(0.0,1.0,abs(dot(texCoord*texSize-start,normal))/gradientRadius)*blurRadius;for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);vec4 sample=texture2D(texture,texCoord+delta/texSize*percent*radius);sample.rgb*=sample.a;color+=sample*weight;total+=weight;}gl_FragColor=color/total;gl_FragColor.rgb/=gl_FragColor.a+0.00001;}");
        var n2 = c2 - b2, p2 = e2 - d2, m = Math.sqrt(n2 * n2 + p2 * p2);
        f.call(this, a3.tiltShift, { blurRadius: g2, gradientRadius: l3, start: [b2, d2], end: [c2, e2], delta: [n2 / m, p2 / m], texSize: [this.width, this.height] });
        f.call(this, a3.tiltShift, { blurRadius: g2, gradientRadius: l3, start: [b2, d2], end: [c2, e2], delta: [-p2 / m, n2 / m], texSize: [this.width, this.height] });
        return this;
      }
      function S2(b2) {
        a3.triangleBlur = a3.triangleBlur || new h2(null, "uniform sampler2D texture;uniform vec2 delta;varying vec2 texCoord;" + s2 + "void main(){vec4 color=vec4(0.0);float total=0.0;float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);vec4 sample=texture2D(texture,texCoord+delta*percent);sample.rgb*=sample.a;color+=sample*weight;total+=weight;}gl_FragColor=color/total;gl_FragColor.rgb/=gl_FragColor.a+0.00001;}");
        f.call(this, a3.triangleBlur, { delta: [b2 / this.width, 0] });
        f.call(this, a3.triangleBlur, { delta: [0, b2 / this.height] });
        return this;
      }
      function T(b2, d2, c2) {
        a3.zoomBlur = a3.zoomBlur || new h2(null, "uniform sampler2D texture;uniform vec2 center;uniform float strength;uniform vec2 texSize;varying vec2 texCoord;" + s2 + "void main(){vec4 color=vec4(0.0);float total=0.0;vec2 toCenter=center-texCoord*texSize;float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=0.0;t<=40.0;t++){float percent=(t+offset)/40.0;float weight=4.0*(percent-percent*percent);vec4 sample=texture2D(texture,texCoord+toCenter*percent*strength/texSize);sample.rgb*=sample.a;color+=sample*weight;total+=weight;}gl_FragColor=color/total;gl_FragColor.rgb/=gl_FragColor.a+0.00001;}");
        f.call(this, a3.zoomBlur, { center: [b2, d2], strength: c2, texSize: [this.width, this.height] });
        return this;
      }
      function U(b2, d2, c2, e2) {
        a3.colorHalftone = a3.colorHalftone || new h2(null, "uniform sampler2D texture;uniform vec2 center;uniform float angle;uniform float scale;uniform vec2 texSize;varying vec2 texCoord;float pattern(float angle){float s=sin(angle),c=cos(angle);vec2 tex=texCoord*texSize-center;vec2 point=vec2(c*tex.x-s*tex.y,s*tex.x+c*tex.y)*scale;return(sin(point.x)*sin(point.y))*4.0;}void main(){vec4 color=texture2D(texture,texCoord);vec3 cmy=1.0-color.rgb;float k=min(cmy.x,min(cmy.y,cmy.z));cmy=(cmy-k)/(1.0-k);cmy=clamp(cmy*10.0-3.0+vec3(pattern(angle+0.26179),pattern(angle+1.30899),pattern(angle)),0.0,1.0);k=clamp(k*10.0-5.0+pattern(angle+0.78539),0.0,1.0);gl_FragColor=vec4(1.0-cmy-k,color.a);}");
        f.call(this, a3.colorHalftone, { center: [b2, d2], angle: c2, scale: Math.PI / e2, texSize: [this.width, this.height] });
        return this;
      }
      function V2(b2, d2, c2, e2) {
        a3.dotScreen = a3.dotScreen || new h2(null, "uniform sampler2D texture;uniform vec2 center;uniform float angle;uniform float scale;uniform vec2 texSize;varying vec2 texCoord;float pattern(){float s=sin(angle),c=cos(angle);vec2 tex=texCoord*texSize-center;vec2 point=vec2(c*tex.x-s*tex.y,s*tex.x+c*tex.y)*scale;return(sin(point.x)*sin(point.y))*4.0;}void main(){vec4 color=texture2D(texture,texCoord);float average=(color.r+color.g+color.b)/3.0;gl_FragColor=vec4(vec3(average*10.0-5.0+pattern()),color.a);}");
        f.call(this, a3.dotScreen, { center: [b2, d2], angle: c2, scale: Math.PI / e2, texSize: [this.width, this.height] });
        return this;
      }
      function W(b2) {
        a3.edgeWork1 = a3.edgeWork1 || new h2(null, "uniform sampler2D texture;uniform vec2 delta;varying vec2 texCoord;" + s2 + "void main(){vec2 color=vec2(0.0);vec2 total=vec2(0.0);float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);vec3 sample=texture2D(texture,texCoord+delta*percent).rgb;float average=(sample.r+sample.g+sample.b)/3.0;color.x+=average*weight;total.x+=weight;if(abs(t)<15.0){weight=weight*2.0-1.0;color.y+=average*weight;total.y+=weight;}}gl_FragColor=vec4(color/total,0.0,1.0);}");
        a3.edgeWork2 = a3.edgeWork2 || new h2(null, "uniform sampler2D texture;uniform vec2 delta;varying vec2 texCoord;" + s2 + "void main(){vec2 color=vec2(0.0);vec2 total=vec2(0.0);float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);vec2 sample=texture2D(texture,texCoord+delta*percent).xy;color.x+=sample.x*weight;total.x+=weight;if(abs(t)<15.0){weight=weight*2.0-1.0;color.y+=sample.y*weight;total.y+=weight;}}float c=clamp(10000.0*(color.y/total.y-color.x/total.x)+0.5,0.0,1.0);gl_FragColor=vec4(c,c,c,1.0);}");
        f.call(this, a3.edgeWork1, { delta: [b2 / this.width, 0] });
        f.call(this, a3.edgeWork2, { delta: [0, b2 / this.height] });
        return this;
      }
      function X(b2, d2, c2) {
        a3.hexagonalPixelate = a3.hexagonalPixelate || new h2(null, "uniform sampler2D texture;uniform vec2 center;uniform float scale;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 tex=(texCoord*texSize-center)/scale;tex.y/=0.866025404;tex.x-=tex.y*0.5;vec2 a;if(tex.x+tex.y-floor(tex.x)-floor(tex.y)<1.0)a=vec2(floor(tex.x),floor(tex.y));else a=vec2(ceil(tex.x),ceil(tex.y));vec2 b=vec2(ceil(tex.x),floor(tex.y));vec2 c=vec2(floor(tex.x),ceil(tex.y));vec3 TEX=vec3(tex.x,tex.y,1.0-tex.x-tex.y);vec3 A=vec3(a.x,a.y,1.0-a.x-a.y);vec3 B=vec3(b.x,b.y,1.0-b.x-b.y);vec3 C=vec3(c.x,c.y,1.0-c.x-c.y);float alen=length(TEX-A);float blen=length(TEX-B);float clen=length(TEX-C);vec2 choice;if(alen<blen){if(alen<clen)choice=a;else choice=c;}else{if(blen<clen)choice=b;else choice=c;}choice.x+=choice.y*0.5;choice.y*=0.866025404;choice*=scale/texSize;gl_FragColor=texture2D(texture,choice+center/texSize);}");
        f.call(this, a3.hexagonalPixelate, { center: [b2, d2], scale: c2, texSize: [this.width, this.height] });
        return this;
      }
      function Y(b2) {
        a3.ink = a3.ink || new h2(null, "uniform sampler2D texture;uniform float strength;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 dx=vec2(1.0/texSize.x,0.0);vec2 dy=vec2(0.0,1.0/texSize.y);vec4 color=texture2D(texture,texCoord);float bigTotal=0.0;float smallTotal=0.0;vec3 bigAverage=vec3(0.0);vec3 smallAverage=vec3(0.0);for(float x=-2.0;x<=2.0;x+=1.0){for(float y=-2.0;y<=2.0;y+=1.0){vec3 sample=texture2D(texture,texCoord+dx*x+dy*y).rgb;bigAverage+=sample;bigTotal+=1.0;if(abs(x)+abs(y)<2.0){smallAverage+=sample;smallTotal+=1.0;}}}vec3 edge=max(vec3(0.0),bigAverage/bigTotal-smallAverage/smallTotal);gl_FragColor=vec4(color.rgb-dot(edge,edge)*strength*100000.0,color.a);}");
        f.call(this, a3.ink, { strength: b2 * b2 * b2 * b2 * b2, texSize: [this.width, this.height] });
        return this;
      }
      function Z(b2, d2, c2, e2) {
        a3.bulgePinch = a3.bulgePinch || u2("uniform float radius;uniform float strength;uniform vec2 center;", "coord-=center;float distance=length(coord);if(distance<radius){float percent=distance/radius;if(strength>0.0){coord*=mix(1.0,smoothstep(0.0,radius/distance,percent),strength*0.75);}else{coord*=mix(1.0,pow(percent,1.0+strength*0.75)*radius/distance,1.0-percent);}}coord+=center;");
        f.call(this, a3.bulgePinch, { radius: c2, strength: q(-1, e2, 1), center: [b2, d2], texSize: [this.width, this.height] });
        return this;
      }
      function $2(b2, d2, c2) {
        a3.matrixWarp = a3.matrixWarp || u2("uniform mat3 matrix;uniform bool useTextureSpace;", "if(useTextureSpace)coord=coord/texSize*2.0-1.0;vec3 warp=matrix*vec3(coord,1.0);coord=warp.xy/warp.z;if(useTextureSpace)coord=(coord*0.5+0.5)*texSize;");
        b2 = Array.prototype.concat.apply([], b2);
        if (4 == b2.length) b2 = [b2[0], b2[1], 0, b2[2], b2[3], 0, 0, 0, 1];
        else if (9 != b2.length) throw "can only warp with 2x2 or 3x3 matrix";
        f.call(this, a3.matrixWarp, { matrix: d2 ? y(b2) : b2, texSize: [this.width, this.height], useTextureSpace: c2 | 0 });
        return this;
      }
      function aa(a4, d2) {
        var c2 = x2.apply(null, d2), e2 = x2.apply(null, a4), c2 = y(c2);
        return this.matrixWarp([
          c2[0] * e2[0] + c2[1] * e2[3] + c2[2] * e2[6],
          c2[0] * e2[1] + c2[1] * e2[4] + c2[2] * e2[7],
          c2[0] * e2[2] + c2[1] * e2[5] + c2[2] * e2[8],
          c2[3] * e2[0] + c2[4] * e2[3] + c2[5] * e2[6],
          c2[3] * e2[1] + c2[4] * e2[4] + c2[5] * e2[7],
          c2[3] * e2[2] + c2[4] * e2[5] + c2[5] * e2[8],
          c2[6] * e2[0] + c2[7] * e2[3] + c2[8] * e2[6],
          c2[6] * e2[1] + c2[7] * e2[4] + c2[8] * e2[7],
          c2[6] * e2[2] + c2[7] * e2[5] + c2[8] * e2[8]
        ]);
      }
      function ba(b2, d2, c2, e2) {
        a3.swirl = a3.swirl || u2("uniform float radius;uniform float angle;uniform vec2 center;", "coord-=center;float distance=length(coord);if(distance<radius){float percent=(radius-distance)/radius;float theta=percent*percent*angle;float s=sin(theta);float c=cos(theta);coord=vec2(coord.x*c-coord.y*s,coord.x*s+coord.y*c);}coord+=center;");
        f.call(this, a3.swirl, { radius: c2, center: [b2, d2], angle: e2, texSize: [this.width, this.height] });
        return this;
      }
      var v = {};
      (function() {
        function a4(b2) {
          if (!b2.getExtension("OES_texture_float")) return false;
          var c3 = b2.createFramebuffer(), e3 = b2.createTexture();
          b2.bindTexture(b2.TEXTURE_2D, e3);
          b2.texParameteri(b2.TEXTURE_2D, b2.TEXTURE_MAG_FILTER, b2.NEAREST);
          b2.texParameteri(b2.TEXTURE_2D, b2.TEXTURE_MIN_FILTER, b2.NEAREST);
          b2.texParameteri(b2.TEXTURE_2D, b2.TEXTURE_WRAP_S, b2.CLAMP_TO_EDGE);
          b2.texParameteri(b2.TEXTURE_2D, b2.TEXTURE_WRAP_T, b2.CLAMP_TO_EDGE);
          b2.texImage2D(b2.TEXTURE_2D, 0, b2.RGBA, 1, 1, 0, b2.RGBA, b2.UNSIGNED_BYTE, null);
          b2.bindFramebuffer(b2.FRAMEBUFFER, c3);
          b2.framebufferTexture2D(b2.FRAMEBUFFER, b2.COLOR_ATTACHMENT0, b2.TEXTURE_2D, e3, 0);
          c3 = b2.createTexture();
          b2.bindTexture(b2.TEXTURE_2D, c3);
          b2.texParameteri(b2.TEXTURE_2D, b2.TEXTURE_MAG_FILTER, b2.LINEAR);
          b2.texParameteri(b2.TEXTURE_2D, b2.TEXTURE_MIN_FILTER, b2.LINEAR);
          b2.texParameteri(b2.TEXTURE_2D, b2.TEXTURE_WRAP_S, b2.CLAMP_TO_EDGE);
          b2.texParameteri(b2.TEXTURE_2D, b2.TEXTURE_WRAP_T, b2.CLAMP_TO_EDGE);
          b2.texImage2D(
            b2.TEXTURE_2D,
            0,
            b2.RGBA,
            2,
            2,
            0,
            b2.RGBA,
            b2.FLOAT,
            new Float32Array([2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
          );
          var e3 = b2.createProgram(), d3 = b2.createShader(b2.VERTEX_SHADER), g3 = b2.createShader(b2.FRAGMENT_SHADER);
          b2.shaderSource(d3, "attribute vec2 vertex;void main(){gl_Position=vec4(vertex,0.0,1.0);}");
          b2.shaderSource(g3, "uniform sampler2D texture;void main(){gl_FragColor=texture2D(texture,vec2(0.5));}");
          b2.compileShader(d3);
          b2.compileShader(g3);
          b2.attachShader(e3, d3);
          b2.attachShader(
            e3,
            g3
          );
          b2.linkProgram(e3);
          d3 = b2.createBuffer();
          b2.bindBuffer(b2.ARRAY_BUFFER, d3);
          b2.bufferData(b2.ARRAY_BUFFER, new Float32Array([0, 0]), b2.STREAM_DRAW);
          b2.enableVertexAttribArray(0);
          b2.vertexAttribPointer(0, 2, b2.FLOAT, false, 0, 0);
          d3 = new Uint8Array(4);
          b2.useProgram(e3);
          b2.viewport(0, 0, 1, 1);
          b2.bindTexture(b2.TEXTURE_2D, c3);
          b2.drawArrays(b2.POINTS, 0, 1);
          b2.readPixels(0, 0, 1, 1, b2.RGBA, b2.UNSIGNED_BYTE, d3);
          return 127 === d3[0] || 128 === d3[0];
        }
        function d2() {
        }
        function c2(a5) {
          "OES_texture_float_linear" === a5 ? (void 0 === this.$OES_texture_float_linear$ && Object.defineProperty(
            this,
            "$OES_texture_float_linear$",
            { enumerable: false, configurable: false, writable: false, value: new d2() }
          ), a5 = this.$OES_texture_float_linear$) : a5 = n2.call(this, a5);
          return a5;
        }
        function e2() {
          var a5 = f2.call(this);
          -1 === a5.indexOf("OES_texture_float_linear") && a5.push("OES_texture_float_linear");
          return a5;
        }
        try {
          var g2 = document.createElement("canvas").getContext("experimental-webgl");
        } catch (l3) {
        }
        if (g2 && -1 === g2.getSupportedExtensions().indexOf("OES_texture_float_linear") && a4(g2)) {
          var n2 = WebGLRenderingContext.prototype.getExtension, f2 = WebGLRenderingContext.prototype.getSupportedExtensions;
          WebGLRenderingContext.prototype.getExtension = c2;
          WebGLRenderingContext.prototype.getSupportedExtensions = e2;
        }
      })();
      var a3;
      v.canvas = function() {
        var b2 = document.createElement("canvas");
        try {
          a3 = b2.getContext("experimental-webgl", { premultipliedAlpha: false });
        } catch (d2) {
          a3 = null;
        }
        if (!a3) throw "This browser does not support WebGL";
        b2._ = { gl: a3, isInitialized: false, texture: null, spareTexture: null, flippedShader: null };
        b2.texture = k(A2);
        b2.draw = k(C2);
        b2.update = k(D);
        b2.replace = k(E);
        b2.contents = k(F);
        b2.getPixelArray = k(G2);
        b2.brightnessContrast = k(H);
        b2.hexagonalPixelate = k(X);
        b2.hueSaturation = k(K2);
        b2.colorHalftone = k(U);
        b2.triangleBlur = k(S2);
        b2.unsharpMask = k(N);
        b2.perspective = k(aa);
        b2.matrixWarp = k($2);
        b2.bulgePinch = k(Z);
        b2.tiltShift = k(R2);
        b2.dotScreen = k(V2);
        b2.edgeWork = k(W);
        b2.lensBlur = k(Q);
        b2.zoomBlur = k(T);
        b2.noise = k(L2);
        b2.denoise = k(J);
        b2.curves = k(I);
        b2.swirl = k(ba);
        b2.ink = k(Y);
        b2.vignette = k(P);
        b2.vibrance = k(O);
        b2.sepia = k(M);
        return b2;
      };
      v.splineInterpolate = t2;
      var h2 = (function() {
        function b2(b3, c3) {
          var e3 = a3.createShader(b3);
          a3.shaderSource(e3, c3);
          a3.compileShader(e3);
          if (!a3.getShaderParameter(
            e3,
            a3.COMPILE_STATUS
          )) throw "compile error: " + a3.getShaderInfoLog(e3);
          return e3;
        }
        function d2(d3, l3) {
          this.texCoordAttribute = this.vertexAttribute = null;
          this.program = a3.createProgram();
          d3 = d3 || c2;
          l3 = l3 || e2;
          l3 = "precision highp float;" + l3;
          a3.attachShader(this.program, b2(a3.VERTEX_SHADER, d3));
          a3.attachShader(this.program, b2(a3.FRAGMENT_SHADER, l3));
          a3.linkProgram(this.program);
          if (!a3.getProgramParameter(this.program, a3.LINK_STATUS)) throw "link error: " + a3.getProgramInfoLog(this.program);
        }
        var c2 = "attribute vec2 vertex;attribute vec2 _texCoord;varying vec2 texCoord;void main(){texCoord=_texCoord;gl_Position=vec4(vertex*2.0-1.0,0.0,1.0);}", e2 = "uniform sampler2D texture;varying vec2 texCoord;void main(){gl_FragColor=texture2D(texture,texCoord);}";
        d2.prototype.destroy = function() {
          a3.deleteProgram(this.program);
          this.program = null;
        };
        d2.prototype.uniforms = function(b3) {
          a3.useProgram(this.program);
          for (var e3 in b3) if (b3.hasOwnProperty(e3)) {
            var c3 = a3.getUniformLocation(this.program, e3);
            if (null !== c3) {
              var d3 = b3[e3];
              if ("[object Array]" == Object.prototype.toString.call(d3)) switch (d3.length) {
                case 1:
                  a3.uniform1fv(c3, new Float32Array(d3));
                  break;
                case 2:
                  a3.uniform2fv(c3, new Float32Array(d3));
                  break;
                case 3:
                  a3.uniform3fv(c3, new Float32Array(d3));
                  break;
                case 4:
                  a3.uniform4fv(c3, new Float32Array(d3));
                  break;
                case 9:
                  a3.uniformMatrix3fv(c3, false, new Float32Array(d3));
                  break;
                case 16:
                  a3.uniformMatrix4fv(c3, false, new Float32Array(d3));
                  break;
                default:
                  throw `dont't know how to load uniform "` + e3 + '" of length ' + d3.length;
              }
              else if ("[object Number]" == Object.prototype.toString.call(d3)) a3.uniform1f(c3, d3);
              else throw 'attempted to set uniform "' + e3 + '" to invalid value ' + (d3 || "undefined").toString();
            }
          }
          return this;
        };
        d2.prototype.textures = function(b3) {
          a3.useProgram(this.program);
          for (var c3 in b3) b3.hasOwnProperty(c3) && a3.uniform1i(a3.getUniformLocation(this.program, c3), b3[c3]);
          return this;
        };
        d2.prototype.drawRect = function(b3, c3, e3, d3) {
          var f2 = a3.getParameter(a3.VIEWPORT);
          c3 = void 0 !== c3 ? (c3 - f2[1]) / f2[3] : 0;
          b3 = void 0 !== b3 ? (b3 - f2[0]) / f2[2] : 0;
          e3 = void 0 !== e3 ? (e3 - f2[0]) / f2[2] : 1;
          d3 = void 0 !== d3 ? (d3 - f2[1]) / f2[3] : 1;
          null == a3.vertexBuffer && (a3.vertexBuffer = a3.createBuffer());
          a3.bindBuffer(a3.ARRAY_BUFFER, a3.vertexBuffer);
          a3.bufferData(a3.ARRAY_BUFFER, new Float32Array([
            b3,
            c3,
            b3,
            d3,
            e3,
            c3,
            e3,
            d3
          ]), a3.STATIC_DRAW);
          null == a3.texCoordBuffer && (a3.texCoordBuffer = a3.createBuffer(), a3.bindBuffer(a3.ARRAY_BUFFER, a3.texCoordBuffer), a3.bufferData(a3.ARRAY_BUFFER, new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]), a3.STATIC_DRAW));
          null == this.vertexAttribute && (this.vertexAttribute = a3.getAttribLocation(this.program, "vertex"), a3.enableVertexAttribArray(this.vertexAttribute));
          null == this.texCoordAttribute && (this.texCoordAttribute = a3.getAttribLocation(this.program, "_texCoord"), a3.enableVertexAttribArray(this.texCoordAttribute));
          a3.useProgram(this.program);
          a3.bindBuffer(a3.ARRAY_BUFFER, a3.vertexBuffer);
          a3.vertexAttribPointer(this.vertexAttribute, 2, a3.FLOAT, false, 0, 0);
          a3.bindBuffer(a3.ARRAY_BUFFER, a3.texCoordBuffer);
          a3.vertexAttribPointer(this.texCoordAttribute, 2, a3.FLOAT, false, 0, 0);
          a3.drawArrays(a3.TRIANGLE_STRIP, 0, 4);
        };
        d2.getDefaultShader = function() {
          a3.defaultShader = a3.defaultShader || new d2();
          return a3.defaultShader;
        };
        return d2;
      })();
      z.prototype.interpolate = function(a4) {
        for (var d2 = 0, c2 = this.ya.length - 1; 1 < c2 - d2; ) {
          var e2 = c2 + d2 >> 1;
          this.xa[e2] > a4 ? c2 = e2 : d2 = e2;
        }
        var e2 = this.xa[c2] - this.xa[d2], g2 = (this.xa[c2] - a4) / e2;
        a4 = (a4 - this.xa[d2]) / e2;
        return g2 * this.ya[d2] + a4 * this.ya[c2] + ((g2 * g2 * g2 - g2) * this.y2[d2] + (a4 * a4 * a4 - a4) * this.y2[c2]) * e2 * e2 / 6;
      };
      var r2 = (function() {
        function b2(b3, c3, d3, f2) {
          this.gl = a3;
          this.id = a3.createTexture();
          this.width = b3;
          this.height = c3;
          this.format = d3;
          this.type = f2;
          a3.bindTexture(a3.TEXTURE_2D, this.id);
          a3.texParameteri(a3.TEXTURE_2D, a3.TEXTURE_MAG_FILTER, a3.LINEAR);
          a3.texParameteri(a3.TEXTURE_2D, a3.TEXTURE_MIN_FILTER, a3.LINEAR);
          a3.texParameteri(a3.TEXTURE_2D, a3.TEXTURE_WRAP_S, a3.CLAMP_TO_EDGE);
          a3.texParameteri(
            a3.TEXTURE_2D,
            a3.TEXTURE_WRAP_T,
            a3.CLAMP_TO_EDGE
          );
          b3 && c3 && a3.texImage2D(a3.TEXTURE_2D, 0, this.format, b3, c3, 0, this.format, this.type, null);
        }
        function d2(a4) {
          null == c2 && (c2 = document.createElement("canvas"));
          c2.width = a4.width;
          c2.height = a4.height;
          a4 = c2.getContext("2d");
          a4.clearRect(0, 0, c2.width, c2.height);
          return a4;
        }
        b2.fromElement = function(c3) {
          var d3 = new b2(0, 0, a3.RGBA, a3.UNSIGNED_BYTE);
          d3.loadContentsOf(c3);
          return d3;
        };
        b2.prototype.loadContentsOf = function(b3) {
          this.width = b3.width || b3.videoWidth;
          this.height = b3.height || b3.videoHeight;
          a3.bindTexture(
            a3.TEXTURE_2D,
            this.id
          );
          a3.texImage2D(a3.TEXTURE_2D, 0, this.format, this.format, this.type, b3);
        };
        b2.prototype.initFromBytes = function(b3, c3, d3) {
          this.width = b3;
          this.height = c3;
          this.format = a3.RGBA;
          this.type = a3.UNSIGNED_BYTE;
          a3.bindTexture(a3.TEXTURE_2D, this.id);
          a3.texImage2D(a3.TEXTURE_2D, 0, a3.RGBA, b3, c3, 0, a3.RGBA, this.type, new Uint8Array(d3));
        };
        b2.prototype.destroy = function() {
          a3.deleteTexture(this.id);
          this.id = null;
        };
        b2.prototype.use = function(b3) {
          a3.activeTexture(a3.TEXTURE0 + (b3 || 0));
          a3.bindTexture(a3.TEXTURE_2D, this.id);
        };
        b2.prototype.unuse = function(b3) {
          a3.activeTexture(a3.TEXTURE0 + (b3 || 0));
          a3.bindTexture(a3.TEXTURE_2D, null);
        };
        b2.prototype.ensureFormat = function(b3, c3, d3, f2) {
          if (1 == arguments.length) {
            var h3 = arguments[0];
            b3 = h3.width;
            c3 = h3.height;
            d3 = h3.format;
            f2 = h3.type;
          }
          if (b3 != this.width || c3 != this.height || d3 != this.format || f2 != this.type) this.width = b3, this.height = c3, this.format = d3, this.type = f2, a3.bindTexture(a3.TEXTURE_2D, this.id), a3.texImage2D(a3.TEXTURE_2D, 0, this.format, b3, c3, 0, this.format, this.type, null);
        };
        b2.prototype.drawTo = function(b3) {
          a3.framebuffer = a3.framebuffer || a3.createFramebuffer();
          a3.bindFramebuffer(
            a3.FRAMEBUFFER,
            a3.framebuffer
          );
          a3.framebufferTexture2D(a3.FRAMEBUFFER, a3.COLOR_ATTACHMENT0, a3.TEXTURE_2D, this.id, 0);
          if (a3.checkFramebufferStatus(a3.FRAMEBUFFER) !== a3.FRAMEBUFFER_COMPLETE) throw Error("incomplete framebuffer");
          a3.viewport(0, 0, this.width, this.height);
          b3();
          a3.bindFramebuffer(a3.FRAMEBUFFER, null);
        };
        var c2 = null;
        b2.prototype.fillUsingCanvas = function(b3) {
          b3(d2(this));
          this.format = a3.RGBA;
          this.type = a3.UNSIGNED_BYTE;
          a3.bindTexture(a3.TEXTURE_2D, this.id);
          a3.texImage2D(a3.TEXTURE_2D, 0, a3.RGBA, a3.RGBA, a3.UNSIGNED_BYTE, c2);
          return this;
        };
        b2.prototype.toImage = function(b3) {
          this.use();
          h2.getDefaultShader().drawRect();
          var f2 = 4 * this.width * this.height, k2 = new Uint8Array(f2), n2 = d2(this), p2 = n2.createImageData(this.width, this.height);
          a3.readPixels(0, 0, this.width, this.height, a3.RGBA, a3.UNSIGNED_BYTE, k2);
          for (var m = 0; m < f2; m++) p2.data[m] = k2[m];
          n2.putImageData(p2, 0, 0);
          b3.src = c2.toDataURL();
        };
        b2.prototype.swapWith = function(a4) {
          var b3;
          b3 = a4.id;
          a4.id = this.id;
          this.id = b3;
          b3 = a4.width;
          a4.width = this.width;
          this.width = b3;
          b3 = a4.height;
          a4.height = this.height;
          this.height = b3;
          b3 = a4.format;
          a4.format = this.format;
          this.format = b3;
        };
        return b2;
      })(), s2 = "float random(vec3 scale,float seed){return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);}";
      return v;
    })();
    glfx_default = fx;
  }
});

// node_modules/qrcode/lib/can-promise.js
var require_can_promise = __commonJS({
  "node_modules/qrcode/lib/can-promise.js"(exports, module) {
    module.exports = function() {
      return typeof Promise === "function" && Promise.prototype && Promise.prototype.then;
    };
  }
});

// node_modules/qrcode/lib/core/utils.js
var require_utils = __commonJS({
  "node_modules/qrcode/lib/core/utils.js"(exports) {
    var toSJISFunction;
    var CODEWORDS_COUNT = [
      0,
      // Not used
      26,
      44,
      70,
      100,
      134,
      172,
      196,
      242,
      292,
      346,
      404,
      466,
      532,
      581,
      655,
      733,
      815,
      901,
      991,
      1085,
      1156,
      1258,
      1364,
      1474,
      1588,
      1706,
      1828,
      1921,
      2051,
      2185,
      2323,
      2465,
      2611,
      2761,
      2876,
      3034,
      3196,
      3362,
      3532,
      3706
    ];
    exports.getSymbolSize = function getSymbolSize(version) {
      if (!version) throw new Error('"version" cannot be null or undefined');
      if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
      return version * 4 + 17;
    };
    exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
      return CODEWORDS_COUNT[version];
    };
    exports.getBCHDigit = function(data) {
      let digit = 0;
      while (data !== 0) {
        digit++;
        data >>>= 1;
      }
      return digit;
    };
    exports.setToSJISFunction = function setToSJISFunction(f) {
      if (typeof f !== "function") {
        throw new Error('"toSJISFunc" is not a valid function.');
      }
      toSJISFunction = f;
    };
    exports.isKanjiModeEnabled = function() {
      return typeof toSJISFunction !== "undefined";
    };
    exports.toSJIS = function toSJIS(kanji) {
      return toSJISFunction(kanji);
    };
  }
});

// node_modules/qrcode/lib/core/error-correction-level.js
var require_error_correction_level = __commonJS({
  "node_modules/qrcode/lib/core/error-correction-level.js"(exports) {
    exports.L = { bit: 1 };
    exports.M = { bit: 0 };
    exports.Q = { bit: 3 };
    exports.H = { bit: 2 };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "l":
        case "low":
          return exports.L;
        case "m":
        case "medium":
          return exports.M;
        case "q":
        case "quartile":
          return exports.Q;
        case "h":
        case "high":
          return exports.H;
        default:
          throw new Error("Unknown EC Level: " + string);
      }
    }
    exports.isValid = function isValid(level) {
      return level && typeof level.bit !== "undefined" && level.bit >= 0 && level.bit < 4;
    };
    exports.from = function from(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e2) {
        return defaultValue;
      }
    };
  }
});

// node_modules/qrcode/lib/core/bit-buffer.js
var require_bit_buffer = __commonJS({
  "node_modules/qrcode/lib/core/bit-buffer.js"(exports, module) {
    function BitBuffer() {
      this.buffer = [];
      this.length = 0;
    }
    BitBuffer.prototype = {
      get: function(index) {
        const bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
      },
      put: function(num, length) {
        for (let i2 = 0; i2 < length; i2++) {
          this.putBit((num >>> length - i2 - 1 & 1) === 1);
        }
      },
      getLengthInBits: function() {
        return this.length;
      },
      putBit: function(bit) {
        const bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
          this.buffer.push(0);
        }
        if (bit) {
          this.buffer[bufIndex] |= 128 >>> this.length % 8;
        }
        this.length++;
      }
    };
    module.exports = BitBuffer;
  }
});

// node_modules/qrcode/lib/core/bit-matrix.js
var require_bit_matrix = __commonJS({
  "node_modules/qrcode/lib/core/bit-matrix.js"(exports, module) {
    function BitMatrix(size) {
      if (!size || size < 1) {
        throw new Error("BitMatrix size must be defined and greater than 0");
      }
      this.size = size;
      this.data = new Uint8Array(size * size);
      this.reservedBit = new Uint8Array(size * size);
    }
    BitMatrix.prototype.set = function(row, col, value, reserved) {
      const index = row * this.size + col;
      this.data[index] = value;
      if (reserved) this.reservedBit[index] = true;
    };
    BitMatrix.prototype.get = function(row, col) {
      return this.data[row * this.size + col];
    };
    BitMatrix.prototype.xor = function(row, col, value) {
      this.data[row * this.size + col] ^= value;
    };
    BitMatrix.prototype.isReserved = function(row, col) {
      return this.reservedBit[row * this.size + col];
    };
    module.exports = BitMatrix;
  }
});

// node_modules/qrcode/lib/core/alignment-pattern.js
var require_alignment_pattern = __commonJS({
  "node_modules/qrcode/lib/core/alignment-pattern.js"(exports) {
    var getSymbolSize = require_utils().getSymbolSize;
    exports.getRowColCoords = function getRowColCoords(version) {
      if (version === 1) return [];
      const posCount = Math.floor(version / 7) + 2;
      const size = getSymbolSize(version);
      const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
      const positions = [size - 7];
      for (let i2 = 1; i2 < posCount - 1; i2++) {
        positions[i2] = positions[i2 - 1] - intervals;
      }
      positions.push(6);
      return positions.reverse();
    };
    exports.getPositions = function getPositions(version) {
      const coords = [];
      const pos = exports.getRowColCoords(version);
      const posLength = pos.length;
      for (let i2 = 0; i2 < posLength; i2++) {
        for (let j = 0; j < posLength; j++) {
          if (i2 === 0 && j === 0 || // top-left
          i2 === 0 && j === posLength - 1 || // bottom-left
          i2 === posLength - 1 && j === 0) {
            continue;
          }
          coords.push([pos[i2], pos[j]]);
        }
      }
      return coords;
    };
  }
});

// node_modules/qrcode/lib/core/finder-pattern.js
var require_finder_pattern = __commonJS({
  "node_modules/qrcode/lib/core/finder-pattern.js"(exports) {
    var getSymbolSize = require_utils().getSymbolSize;
    var FINDER_PATTERN_SIZE = 7;
    exports.getPositions = function getPositions(version) {
      const size = getSymbolSize(version);
      return [
        // top-left
        [0, 0],
        // top-right
        [size - FINDER_PATTERN_SIZE, 0],
        // bottom-left
        [0, size - FINDER_PATTERN_SIZE]
      ];
    };
  }
});

// node_modules/qrcode/lib/core/mask-pattern.js
var require_mask_pattern = __commonJS({
  "node_modules/qrcode/lib/core/mask-pattern.js"(exports) {
    exports.Patterns = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    var PenaltyScores = {
      N1: 3,
      N2: 3,
      N3: 40,
      N4: 10
    };
    exports.isValid = function isValid(mask) {
      return mask != null && mask !== "" && !isNaN(mask) && mask >= 0 && mask <= 7;
    };
    exports.from = function from(value) {
      return exports.isValid(value) ? parseInt(value, 10) : void 0;
    };
    exports.getPenaltyN1 = function getPenaltyN1(data) {
      const size = data.size;
      let points = 0;
      let sameCountCol = 0;
      let sameCountRow = 0;
      let lastCol = null;
      let lastRow = null;
      for (let row = 0; row < size; row++) {
        sameCountCol = sameCountRow = 0;
        lastCol = lastRow = null;
        for (let col = 0; col < size; col++) {
          let module2 = data.get(row, col);
          if (module2 === lastCol) {
            sameCountCol++;
          } else {
            if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
            lastCol = module2;
            sameCountCol = 1;
          }
          module2 = data.get(col, row);
          if (module2 === lastRow) {
            sameCountRow++;
          } else {
            if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
            lastRow = module2;
            sameCountRow = 1;
          }
        }
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
      }
      return points;
    };
    exports.getPenaltyN2 = function getPenaltyN2(data) {
      const size = data.size;
      let points = 0;
      for (let row = 0; row < size - 1; row++) {
        for (let col = 0; col < size - 1; col++) {
          const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
          if (last === 4 || last === 0) points++;
        }
      }
      return points * PenaltyScores.N2;
    };
    exports.getPenaltyN3 = function getPenaltyN3(data) {
      const size = data.size;
      let points = 0;
      let bitsCol = 0;
      let bitsRow = 0;
      for (let row = 0; row < size; row++) {
        bitsCol = bitsRow = 0;
        for (let col = 0; col < size; col++) {
          bitsCol = bitsCol << 1 & 2047 | data.get(row, col);
          if (col >= 10 && (bitsCol === 1488 || bitsCol === 93)) points++;
          bitsRow = bitsRow << 1 & 2047 | data.get(col, row);
          if (col >= 10 && (bitsRow === 1488 || bitsRow === 93)) points++;
        }
      }
      return points * PenaltyScores.N3;
    };
    exports.getPenaltyN4 = function getPenaltyN4(data) {
      let darkCount = 0;
      const modulesCount = data.data.length;
      for (let i2 = 0; i2 < modulesCount; i2++) darkCount += data.data[i2];
      const k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
      return k * PenaltyScores.N4;
    };
    function getMaskAt(maskPattern, i2, j) {
      switch (maskPattern) {
        case exports.Patterns.PATTERN000:
          return (i2 + j) % 2 === 0;
        case exports.Patterns.PATTERN001:
          return i2 % 2 === 0;
        case exports.Patterns.PATTERN010:
          return j % 3 === 0;
        case exports.Patterns.PATTERN011:
          return (i2 + j) % 3 === 0;
        case exports.Patterns.PATTERN100:
          return (Math.floor(i2 / 2) + Math.floor(j / 3)) % 2 === 0;
        case exports.Patterns.PATTERN101:
          return i2 * j % 2 + i2 * j % 3 === 0;
        case exports.Patterns.PATTERN110:
          return (i2 * j % 2 + i2 * j % 3) % 2 === 0;
        case exports.Patterns.PATTERN111:
          return (i2 * j % 3 + (i2 + j) % 2) % 2 === 0;
        default:
          throw new Error("bad maskPattern:" + maskPattern);
      }
    }
    exports.applyMask = function applyMask2(pattern, data) {
      const size = data.size;
      for (let col = 0; col < size; col++) {
        for (let row = 0; row < size; row++) {
          if (data.isReserved(row, col)) continue;
          data.xor(row, col, getMaskAt(pattern, row, col));
        }
      }
    };
    exports.getBestMask = function getBestMask(data, setupFormatFunc) {
      const numPatterns = Object.keys(exports.Patterns).length;
      let bestPattern = 0;
      let lowerPenalty = Infinity;
      for (let p2 = 0; p2 < numPatterns; p2++) {
        setupFormatFunc(p2);
        exports.applyMask(p2, data);
        const penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
        exports.applyMask(p2, data);
        if (penalty < lowerPenalty) {
          lowerPenalty = penalty;
          bestPattern = p2;
        }
      }
      return bestPattern;
    };
  }
});

// node_modules/qrcode/lib/core/error-correction-code.js
var require_error_correction_code = __commonJS({
  "node_modules/qrcode/lib/core/error-correction-code.js"(exports) {
    var ECLevel = require_error_correction_level();
    var EC_BLOCKS_TABLE = [
      // L  M  Q  H
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      2,
      2,
      1,
      2,
      2,
      4,
      1,
      2,
      4,
      4,
      2,
      4,
      4,
      4,
      2,
      4,
      6,
      5,
      2,
      4,
      6,
      6,
      2,
      5,
      8,
      8,
      4,
      5,
      8,
      8,
      4,
      5,
      8,
      11,
      4,
      8,
      10,
      11,
      4,
      9,
      12,
      16,
      4,
      9,
      16,
      16,
      6,
      10,
      12,
      18,
      6,
      10,
      17,
      16,
      6,
      11,
      16,
      19,
      6,
      13,
      18,
      21,
      7,
      14,
      21,
      25,
      8,
      16,
      20,
      25,
      8,
      17,
      23,
      25,
      9,
      17,
      23,
      34,
      9,
      18,
      25,
      30,
      10,
      20,
      27,
      32,
      12,
      21,
      29,
      35,
      12,
      23,
      34,
      37,
      12,
      25,
      34,
      40,
      13,
      26,
      35,
      42,
      14,
      28,
      38,
      45,
      15,
      29,
      40,
      48,
      16,
      31,
      43,
      51,
      17,
      33,
      45,
      54,
      18,
      35,
      48,
      57,
      19,
      37,
      51,
      60,
      19,
      38,
      53,
      63,
      20,
      40,
      56,
      66,
      21,
      43,
      59,
      70,
      22,
      45,
      62,
      74,
      24,
      47,
      65,
      77,
      25,
      49,
      68,
      81
    ];
    var EC_CODEWORDS_TABLE = [
      // L  M  Q  H
      7,
      10,
      13,
      17,
      10,
      16,
      22,
      28,
      15,
      26,
      36,
      44,
      20,
      36,
      52,
      64,
      26,
      48,
      72,
      88,
      36,
      64,
      96,
      112,
      40,
      72,
      108,
      130,
      48,
      88,
      132,
      156,
      60,
      110,
      160,
      192,
      72,
      130,
      192,
      224,
      80,
      150,
      224,
      264,
      96,
      176,
      260,
      308,
      104,
      198,
      288,
      352,
      120,
      216,
      320,
      384,
      132,
      240,
      360,
      432,
      144,
      280,
      408,
      480,
      168,
      308,
      448,
      532,
      180,
      338,
      504,
      588,
      196,
      364,
      546,
      650,
      224,
      416,
      600,
      700,
      224,
      442,
      644,
      750,
      252,
      476,
      690,
      816,
      270,
      504,
      750,
      900,
      300,
      560,
      810,
      960,
      312,
      588,
      870,
      1050,
      336,
      644,
      952,
      1110,
      360,
      700,
      1020,
      1200,
      390,
      728,
      1050,
      1260,
      420,
      784,
      1140,
      1350,
      450,
      812,
      1200,
      1440,
      480,
      868,
      1290,
      1530,
      510,
      924,
      1350,
      1620,
      540,
      980,
      1440,
      1710,
      570,
      1036,
      1530,
      1800,
      570,
      1064,
      1590,
      1890,
      600,
      1120,
      1680,
      1980,
      630,
      1204,
      1770,
      2100,
      660,
      1260,
      1860,
      2220,
      720,
      1316,
      1950,
      2310,
      750,
      1372,
      2040,
      2430
    ];
    exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
    exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
  }
});

// node_modules/qrcode/lib/core/galois-field.js
var require_galois_field = __commonJS({
  "node_modules/qrcode/lib/core/galois-field.js"(exports) {
    var EXP_TABLE = new Uint8Array(512);
    var LOG_TABLE = new Uint8Array(256);
    (function initTables() {
      let x2 = 1;
      for (let i2 = 0; i2 < 255; i2++) {
        EXP_TABLE[i2] = x2;
        LOG_TABLE[x2] = i2;
        x2 <<= 1;
        if (x2 & 256) {
          x2 ^= 285;
        }
      }
      for (let i2 = 255; i2 < 512; i2++) {
        EXP_TABLE[i2] = EXP_TABLE[i2 - 255];
      }
    })();
    exports.log = function log(n2) {
      if (n2 < 1) throw new Error("log(" + n2 + ")");
      return LOG_TABLE[n2];
    };
    exports.exp = function exp(n2) {
      return EXP_TABLE[n2];
    };
    exports.mul = function mul(x2, y) {
      if (x2 === 0 || y === 0) return 0;
      return EXP_TABLE[LOG_TABLE[x2] + LOG_TABLE[y]];
    };
  }
});

// node_modules/qrcode/lib/core/polynomial.js
var require_polynomial = __commonJS({
  "node_modules/qrcode/lib/core/polynomial.js"(exports) {
    var GF = require_galois_field();
    exports.mul = function mul(p1, p2) {
      const coeff = new Uint8Array(p1.length + p2.length - 1);
      for (let i2 = 0; i2 < p1.length; i2++) {
        for (let j = 0; j < p2.length; j++) {
          coeff[i2 + j] ^= GF.mul(p1[i2], p2[j]);
        }
      }
      return coeff;
    };
    exports.mod = function mod(divident, divisor) {
      let result = new Uint8Array(divident);
      while (result.length - divisor.length >= 0) {
        const coeff = result[0];
        for (let i2 = 0; i2 < divisor.length; i2++) {
          result[i2] ^= GF.mul(divisor[i2], coeff);
        }
        let offset = 0;
        while (offset < result.length && result[offset] === 0) offset++;
        result = result.slice(offset);
      }
      return result;
    };
    exports.generateECPolynomial = function generateECPolynomial(degree) {
      let poly = new Uint8Array([1]);
      for (let i2 = 0; i2 < degree; i2++) {
        poly = exports.mul(poly, new Uint8Array([1, GF.exp(i2)]));
      }
      return poly;
    };
  }
});

// node_modules/qrcode/lib/core/reed-solomon-encoder.js
var require_reed_solomon_encoder = __commonJS({
  "node_modules/qrcode/lib/core/reed-solomon-encoder.js"(exports, module) {
    var Polynomial = require_polynomial();
    function ReedSolomonEncoder(degree) {
      this.genPoly = void 0;
      this.degree = degree;
      if (this.degree) this.initialize(this.degree);
    }
    ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
      this.degree = degree;
      this.genPoly = Polynomial.generateECPolynomial(this.degree);
    };
    ReedSolomonEncoder.prototype.encode = function encode(data) {
      if (!this.genPoly) {
        throw new Error("Encoder not initialized");
      }
      const paddedData = new Uint8Array(data.length + this.degree);
      paddedData.set(data);
      const remainder = Polynomial.mod(paddedData, this.genPoly);
      const start = this.degree - remainder.length;
      if (start > 0) {
        const buff = new Uint8Array(this.degree);
        buff.set(remainder, start);
        return buff;
      }
      return remainder;
    };
    module.exports = ReedSolomonEncoder;
  }
});

// node_modules/qrcode/lib/core/version-check.js
var require_version_check = __commonJS({
  "node_modules/qrcode/lib/core/version-check.js"(exports) {
    exports.isValid = function isValid(version) {
      return !isNaN(version) && version >= 1 && version <= 40;
    };
  }
});

// node_modules/qrcode/lib/core/regex.js
var require_regex = __commonJS({
  "node_modules/qrcode/lib/core/regex.js"(exports) {
    var numeric = "[0-9]+";
    var alphanumeric = "[A-Z $%*+\\-./:]+";
    var kanji = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
    kanji = kanji.replace(/u/g, "\\u");
    var byte = "(?:(?![A-Z0-9 $%*+\\-./:]|" + kanji + ")(?:.|[\r\n]))+";
    exports.KANJI = new RegExp(kanji, "g");
    exports.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
    exports.BYTE = new RegExp(byte, "g");
    exports.NUMERIC = new RegExp(numeric, "g");
    exports.ALPHANUMERIC = new RegExp(alphanumeric, "g");
    var TEST_KANJI = new RegExp("^" + kanji + "$");
    var TEST_NUMERIC = new RegExp("^" + numeric + "$");
    var TEST_ALPHANUMERIC = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
    exports.testKanji = function testKanji(str) {
      return TEST_KANJI.test(str);
    };
    exports.testNumeric = function testNumeric(str) {
      return TEST_NUMERIC.test(str);
    };
    exports.testAlphanumeric = function testAlphanumeric(str) {
      return TEST_ALPHANUMERIC.test(str);
    };
  }
});

// node_modules/qrcode/lib/core/mode.js
var require_mode = __commonJS({
  "node_modules/qrcode/lib/core/mode.js"(exports) {
    var VersionCheck = require_version_check();
    var Regex = require_regex();
    exports.NUMERIC = {
      id: "Numeric",
      bit: 1 << 0,
      ccBits: [10, 12, 14]
    };
    exports.ALPHANUMERIC = {
      id: "Alphanumeric",
      bit: 1 << 1,
      ccBits: [9, 11, 13]
    };
    exports.BYTE = {
      id: "Byte",
      bit: 1 << 2,
      ccBits: [8, 16, 16]
    };
    exports.KANJI = {
      id: "Kanji",
      bit: 1 << 3,
      ccBits: [8, 10, 12]
    };
    exports.MIXED = {
      bit: -1
    };
    exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
      if (!mode.ccBits) throw new Error("Invalid mode: " + mode);
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid version: " + version);
      }
      if (version >= 1 && version < 10) return mode.ccBits[0];
      else if (version < 27) return mode.ccBits[1];
      return mode.ccBits[2];
    };
    exports.getBestModeForData = function getBestModeForData(dataStr) {
      if (Regex.testNumeric(dataStr)) return exports.NUMERIC;
      else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;
      else if (Regex.testKanji(dataStr)) return exports.KANJI;
      else return exports.BYTE;
    };
    exports.toString = function toString(mode) {
      if (mode && mode.id) return mode.id;
      throw new Error("Invalid mode");
    };
    exports.isValid = function isValid(mode) {
      return mode && mode.bit && mode.ccBits;
    };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "numeric":
          return exports.NUMERIC;
        case "alphanumeric":
          return exports.ALPHANUMERIC;
        case "kanji":
          return exports.KANJI;
        case "byte":
          return exports.BYTE;
        default:
          throw new Error("Unknown mode: " + string);
      }
    }
    exports.from = function from(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e2) {
        return defaultValue;
      }
    };
  }
});

// node_modules/qrcode/lib/core/version.js
var require_version = __commonJS({
  "node_modules/qrcode/lib/core/version.js"(exports) {
    var Utils = require_utils();
    var ECCode = require_error_correction_code();
    var ECLevel = require_error_correction_level();
    var Mode = require_mode();
    var VersionCheck = require_version_check();
    var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
    var G18_BCH = Utils.getBCHDigit(G18);
    function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    function getReservedBitsCount(mode, version) {
      return Mode.getCharCountIndicator(mode, version) + 4;
    }
    function getTotalBitsFromDataArray(segments, version) {
      let totalBits = 0;
      segments.forEach(function(data) {
        const reservedBits = getReservedBitsCount(data.mode, version);
        totalBits += reservedBits + data.getBitsLength();
      });
      return totalBits;
    }
    function getBestVersionForMixedData(segments, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        const length = getTotalBitsFromDataArray(segments, currentVersion);
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    exports.from = function from(value, defaultValue) {
      if (VersionCheck.isValid(value)) {
        return parseInt(value, 10);
      }
      return defaultValue;
    };
    exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid QR Code version");
      }
      if (typeof mode === "undefined") mode = Mode.BYTE;
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (mode === Mode.MIXED) return dataTotalCodewordsBits;
      const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);
      switch (mode) {
        case Mode.NUMERIC:
          return Math.floor(usableBits / 10 * 3);
        case Mode.ALPHANUMERIC:
          return Math.floor(usableBits / 11 * 2);
        case Mode.KANJI:
          return Math.floor(usableBits / 13);
        case Mode.BYTE:
        default:
          return Math.floor(usableBits / 8);
      }
    };
    exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
      let seg;
      const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
      if (Array.isArray(data)) {
        if (data.length > 1) {
          return getBestVersionForMixedData(data, ecl);
        }
        if (data.length === 0) {
          return 1;
        }
        seg = data[0];
      } else {
        seg = data;
      }
      return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
    };
    exports.getEncodedBits = function getEncodedBits(version) {
      if (!VersionCheck.isValid(version) || version < 7) {
        throw new Error("Invalid QR Code version");
      }
      let d2 = version << 12;
      while (Utils.getBCHDigit(d2) - G18_BCH >= 0) {
        d2 ^= G18 << Utils.getBCHDigit(d2) - G18_BCH;
      }
      return version << 12 | d2;
    };
  }
});

// node_modules/qrcode/lib/core/format-info.js
var require_format_info = __commonJS({
  "node_modules/qrcode/lib/core/format-info.js"(exports) {
    var Utils = require_utils();
    var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
    var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
    var G15_BCH = Utils.getBCHDigit(G15);
    exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
      const data = errorCorrectionLevel.bit << 3 | mask;
      let d2 = data << 10;
      while (Utils.getBCHDigit(d2) - G15_BCH >= 0) {
        d2 ^= G15 << Utils.getBCHDigit(d2) - G15_BCH;
      }
      return (data << 10 | d2) ^ G15_MASK;
    };
  }
});

// node_modules/qrcode/lib/core/numeric-data.js
var require_numeric_data = __commonJS({
  "node_modules/qrcode/lib/core/numeric-data.js"(exports, module) {
    var Mode = require_mode();
    function NumericData(data) {
      this.mode = Mode.NUMERIC;
      this.data = data.toString();
    }
    NumericData.getBitsLength = function getBitsLength(length) {
      return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
    };
    NumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    NumericData.prototype.getBitsLength = function getBitsLength() {
      return NumericData.getBitsLength(this.data.length);
    };
    NumericData.prototype.write = function write(bitBuffer) {
      let i2, group, value;
      for (i2 = 0; i2 + 3 <= this.data.length; i2 += 3) {
        group = this.data.substr(i2, 3);
        value = parseInt(group, 10);
        bitBuffer.put(value, 10);
      }
      const remainingNum = this.data.length - i2;
      if (remainingNum > 0) {
        group = this.data.substr(i2);
        value = parseInt(group, 10);
        bitBuffer.put(value, remainingNum * 3 + 1);
      }
    };
    module.exports = NumericData;
  }
});

// node_modules/qrcode/lib/core/alphanumeric-data.js
var require_alphanumeric_data = __commonJS({
  "node_modules/qrcode/lib/core/alphanumeric-data.js"(exports, module) {
    var Mode = require_mode();
    var ALPHA_NUM_CHARS = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      " ",
      "$",
      "%",
      "*",
      "+",
      "-",
      ".",
      "/",
      ":"
    ];
    function AlphanumericData(data) {
      this.mode = Mode.ALPHANUMERIC;
      this.data = data;
    }
    AlphanumericData.getBitsLength = function getBitsLength(length) {
      return 11 * Math.floor(length / 2) + 6 * (length % 2);
    };
    AlphanumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    AlphanumericData.prototype.getBitsLength = function getBitsLength() {
      return AlphanumericData.getBitsLength(this.data.length);
    };
    AlphanumericData.prototype.write = function write(bitBuffer) {
      let i2;
      for (i2 = 0; i2 + 2 <= this.data.length; i2 += 2) {
        let value = ALPHA_NUM_CHARS.indexOf(this.data[i2]) * 45;
        value += ALPHA_NUM_CHARS.indexOf(this.data[i2 + 1]);
        bitBuffer.put(value, 11);
      }
      if (this.data.length % 2) {
        bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i2]), 6);
      }
    };
    module.exports = AlphanumericData;
  }
});

// node_modules/qrcode/lib/core/byte-data.js
var require_byte_data = __commonJS({
  "node_modules/qrcode/lib/core/byte-data.js"(exports, module) {
    var Mode = require_mode();
    function ByteData(data) {
      this.mode = Mode.BYTE;
      if (typeof data === "string") {
        this.data = new TextEncoder().encode(data);
      } else {
        this.data = new Uint8Array(data);
      }
    }
    ByteData.getBitsLength = function getBitsLength(length) {
      return length * 8;
    };
    ByteData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    ByteData.prototype.getBitsLength = function getBitsLength() {
      return ByteData.getBitsLength(this.data.length);
    };
    ByteData.prototype.write = function(bitBuffer) {
      for (let i2 = 0, l3 = this.data.length; i2 < l3; i2++) {
        bitBuffer.put(this.data[i2], 8);
      }
    };
    module.exports = ByteData;
  }
});

// node_modules/qrcode/lib/core/kanji-data.js
var require_kanji_data = __commonJS({
  "node_modules/qrcode/lib/core/kanji-data.js"(exports, module) {
    var Mode = require_mode();
    var Utils = require_utils();
    function KanjiData(data) {
      this.mode = Mode.KANJI;
      this.data = data;
    }
    KanjiData.getBitsLength = function getBitsLength(length) {
      return length * 13;
    };
    KanjiData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    KanjiData.prototype.getBitsLength = function getBitsLength() {
      return KanjiData.getBitsLength(this.data.length);
    };
    KanjiData.prototype.write = function(bitBuffer) {
      let i2;
      for (i2 = 0; i2 < this.data.length; i2++) {
        let value = Utils.toSJIS(this.data[i2]);
        if (value >= 33088 && value <= 40956) {
          value -= 33088;
        } else if (value >= 57408 && value <= 60351) {
          value -= 49472;
        } else {
          throw new Error(
            "Invalid SJIS character: " + this.data[i2] + "\nMake sure your charset is UTF-8"
          );
        }
        value = (value >>> 8 & 255) * 192 + (value & 255);
        bitBuffer.put(value, 13);
      }
    };
    module.exports = KanjiData;
  }
});

// node_modules/dijkstrajs/dijkstra.js
var require_dijkstra = __commonJS({
  "node_modules/dijkstrajs/dijkstra.js"(exports, module) {
    "use strict";
    var dijkstra = {
      single_source_shortest_paths: function(graph, s2, d2) {
        var predecessors = {};
        var costs = {};
        costs[s2] = 0;
        var open = dijkstra.PriorityQueue.make();
        open.push(s2, 0);
        var closest, u2, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
        while (!open.empty()) {
          closest = open.pop();
          u2 = closest.value;
          cost_of_s_to_u = closest.cost;
          adjacent_nodes = graph[u2] || {};
          for (v in adjacent_nodes) {
            if (adjacent_nodes.hasOwnProperty(v)) {
              cost_of_e = adjacent_nodes[v];
              cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
              cost_of_s_to_v = costs[v];
              first_visit = typeof costs[v] === "undefined";
              if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                costs[v] = cost_of_s_to_u_plus_cost_of_e;
                open.push(v, cost_of_s_to_u_plus_cost_of_e);
                predecessors[v] = u2;
              }
            }
          }
        }
        if (typeof d2 !== "undefined" && typeof costs[d2] === "undefined") {
          var msg = ["Could not find a path from ", s2, " to ", d2, "."].join("");
          throw new Error(msg);
        }
        return predecessors;
      },
      extract_shortest_path_from_predecessor_list: function(predecessors, d2) {
        var nodes = [];
        var u2 = d2;
        var predecessor;
        while (u2) {
          nodes.push(u2);
          predecessor = predecessors[u2];
          u2 = predecessors[u2];
        }
        nodes.reverse();
        return nodes;
      },
      find_path: function(graph, s2, d2) {
        var predecessors = dijkstra.single_source_shortest_paths(graph, s2, d2);
        return dijkstra.extract_shortest_path_from_predecessor_list(
          predecessors,
          d2
        );
      },
      /**
       * A very naive priority queue implementation.
       */
      PriorityQueue: {
        make: function(opts) {
          var T = dijkstra.PriorityQueue, t2 = {}, key;
          opts = opts || {};
          for (key in T) {
            if (T.hasOwnProperty(key)) {
              t2[key] = T[key];
            }
          }
          t2.queue = [];
          t2.sorter = opts.sorter || T.default_sorter;
          return t2;
        },
        default_sorter: function(a3, b2) {
          return a3.cost - b2.cost;
        },
        /**
         * Add a new item to the queue and ensure the highest priority element
         * is at the front of the queue.
         */
        push: function(value, cost) {
          var item = { value, cost };
          this.queue.push(item);
          this.queue.sort(this.sorter);
        },
        /**
         * Return the highest priority element in the queue.
         */
        pop: function() {
          return this.queue.shift();
        },
        empty: function() {
          return this.queue.length === 0;
        }
      }
    };
    if (typeof module !== "undefined") {
      module.exports = dijkstra;
    }
  }
});

// node_modules/qrcode/lib/core/segments.js
var require_segments = __commonJS({
  "node_modules/qrcode/lib/core/segments.js"(exports) {
    var Mode = require_mode();
    var NumericData = require_numeric_data();
    var AlphanumericData = require_alphanumeric_data();
    var ByteData = require_byte_data();
    var KanjiData = require_kanji_data();
    var Regex = require_regex();
    var Utils = require_utils();
    var dijkstra = require_dijkstra();
    function getStringByteLength(str) {
      return unescape(encodeURIComponent(str)).length;
    }
    function getSegments(regex, mode, str) {
      const segments = [];
      let result;
      while ((result = regex.exec(str)) !== null) {
        segments.push({
          data: result[0],
          index: result.index,
          mode,
          length: result[0].length
        });
      }
      return segments;
    }
    function getSegmentsFromString(dataStr) {
      const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
      const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
      let byteSegs;
      let kanjiSegs;
      if (Utils.isKanjiModeEnabled()) {
        byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
        kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
      } else {
        byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
        kanjiSegs = [];
      }
      const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
      return segs.sort(function(s1, s2) {
        return s1.index - s2.index;
      }).map(function(obj) {
        return {
          data: obj.data,
          mode: obj.mode,
          length: obj.length
        };
      });
    }
    function getSegmentBitsLength(length, mode) {
      switch (mode) {
        case Mode.NUMERIC:
          return NumericData.getBitsLength(length);
        case Mode.ALPHANUMERIC:
          return AlphanumericData.getBitsLength(length);
        case Mode.KANJI:
          return KanjiData.getBitsLength(length);
        case Mode.BYTE:
          return ByteData.getBitsLength(length);
      }
    }
    function mergeSegments(segs) {
      return segs.reduce(function(acc, curr) {
        const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
        if (prevSeg && prevSeg.mode === curr.mode) {
          acc[acc.length - 1].data += curr.data;
          return acc;
        }
        acc.push(curr);
        return acc;
      }, []);
    }
    function buildNodes(segs) {
      const nodes = [];
      for (let i2 = 0; i2 < segs.length; i2++) {
        const seg = segs[i2];
        switch (seg.mode) {
          case Mode.NUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.ALPHANUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.KANJI:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
            break;
          case Mode.BYTE:
            nodes.push([
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
        }
      }
      return nodes;
    }
    function buildGraph(nodes, version) {
      const table = {};
      const graph = { start: {} };
      let prevNodeIds = ["start"];
      for (let i2 = 0; i2 < nodes.length; i2++) {
        const nodeGroup = nodes[i2];
        const currentNodeIds = [];
        for (let j = 0; j < nodeGroup.length; j++) {
          const node = nodeGroup[j];
          const key = "" + i2 + j;
          currentNodeIds.push(key);
          table[key] = { node, lastCount: 0 };
          graph[key] = {};
          for (let n2 = 0; n2 < prevNodeIds.length; n2++) {
            const prevNodeId = prevNodeIds[n2];
            if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
              graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
              table[prevNodeId].lastCount += node.length;
            } else {
              if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
              graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version);
            }
          }
        }
        prevNodeIds = currentNodeIds;
      }
      for (let n2 = 0; n2 < prevNodeIds.length; n2++) {
        graph[prevNodeIds[n2]].end = 0;
      }
      return { map: graph, table };
    }
    function buildSingleSegment(data, modesHint) {
      let mode;
      const bestMode = Mode.getBestModeForData(data);
      mode = Mode.from(modesHint, bestMode);
      if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
        throw new Error('"' + data + '" cannot be encoded with mode ' + Mode.toString(mode) + ".\n Suggested mode is: " + Mode.toString(bestMode));
      }
      if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
        mode = Mode.BYTE;
      }
      switch (mode) {
        case Mode.NUMERIC:
          return new NumericData(data);
        case Mode.ALPHANUMERIC:
          return new AlphanumericData(data);
        case Mode.KANJI:
          return new KanjiData(data);
        case Mode.BYTE:
          return new ByteData(data);
      }
    }
    exports.fromArray = function fromArray(array) {
      return array.reduce(function(acc, seg) {
        if (typeof seg === "string") {
          acc.push(buildSingleSegment(seg, null));
        } else if (seg.data) {
          acc.push(buildSingleSegment(seg.data, seg.mode));
        }
        return acc;
      }, []);
    };
    exports.fromString = function fromString(data, version) {
      const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
      const nodes = buildNodes(segs);
      const graph = buildGraph(nodes, version);
      const path = dijkstra.find_path(graph.map, "start", "end");
      const optimizedSegs = [];
      for (let i2 = 1; i2 < path.length - 1; i2++) {
        optimizedSegs.push(graph.table[path[i2]].node);
      }
      return exports.fromArray(mergeSegments(optimizedSegs));
    };
    exports.rawSplit = function rawSplit(data) {
      return exports.fromArray(
        getSegmentsFromString(data, Utils.isKanjiModeEnabled())
      );
    };
  }
});

// node_modules/qrcode/lib/core/qrcode.js
var require_qrcode = __commonJS({
  "node_modules/qrcode/lib/core/qrcode.js"(exports) {
    var Utils = require_utils();
    var ECLevel = require_error_correction_level();
    var BitBuffer = require_bit_buffer();
    var BitMatrix = require_bit_matrix();
    var AlignmentPattern = require_alignment_pattern();
    var FinderPattern = require_finder_pattern();
    var MaskPattern = require_mask_pattern();
    var ECCode = require_error_correction_code();
    var ReedSolomonEncoder = require_reed_solomon_encoder();
    var Version = require_version();
    var FormatInfo = require_format_info();
    var Mode = require_mode();
    var Segments = require_segments();
    function setupFinderPattern(matrix, version) {
      const size = matrix.size;
      const pos = FinderPattern.getPositions(version);
      for (let i2 = 0; i2 < pos.length; i2++) {
        const row = pos[i2][0];
        const col = pos[i2][1];
        for (let r2 = -1; r2 <= 7; r2++) {
          if (row + r2 <= -1 || size <= row + r2) continue;
          for (let c2 = -1; c2 <= 7; c2++) {
            if (col + c2 <= -1 || size <= col + c2) continue;
            if (r2 >= 0 && r2 <= 6 && (c2 === 0 || c2 === 6) || c2 >= 0 && c2 <= 6 && (r2 === 0 || r2 === 6) || r2 >= 2 && r2 <= 4 && c2 >= 2 && c2 <= 4) {
              matrix.set(row + r2, col + c2, true, true);
            } else {
              matrix.set(row + r2, col + c2, false, true);
            }
          }
        }
      }
    }
    function setupTimingPattern(matrix) {
      const size = matrix.size;
      for (let r2 = 8; r2 < size - 8; r2++) {
        const value = r2 % 2 === 0;
        matrix.set(r2, 6, value, true);
        matrix.set(6, r2, value, true);
      }
    }
    function setupAlignmentPattern(matrix, version) {
      const pos = AlignmentPattern.getPositions(version);
      for (let i2 = 0; i2 < pos.length; i2++) {
        const row = pos[i2][0];
        const col = pos[i2][1];
        for (let r2 = -2; r2 <= 2; r2++) {
          for (let c2 = -2; c2 <= 2; c2++) {
            if (r2 === -2 || r2 === 2 || c2 === -2 || c2 === 2 || r2 === 0 && c2 === 0) {
              matrix.set(row + r2, col + c2, true, true);
            } else {
              matrix.set(row + r2, col + c2, false, true);
            }
          }
        }
      }
    }
    function setupVersionInfo(matrix, version) {
      const size = matrix.size;
      const bits = Version.getEncodedBits(version);
      let row, col, mod;
      for (let i2 = 0; i2 < 18; i2++) {
        row = Math.floor(i2 / 3);
        col = i2 % 3 + size - 8 - 3;
        mod = (bits >> i2 & 1) === 1;
        matrix.set(row, col, mod, true);
        matrix.set(col, row, mod, true);
      }
    }
    function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
      const size = matrix.size;
      const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
      let i2, mod;
      for (i2 = 0; i2 < 15; i2++) {
        mod = (bits >> i2 & 1) === 1;
        if (i2 < 6) {
          matrix.set(i2, 8, mod, true);
        } else if (i2 < 8) {
          matrix.set(i2 + 1, 8, mod, true);
        } else {
          matrix.set(size - 15 + i2, 8, mod, true);
        }
        if (i2 < 8) {
          matrix.set(8, size - i2 - 1, mod, true);
        } else if (i2 < 9) {
          matrix.set(8, 15 - i2 - 1 + 1, mod, true);
        } else {
          matrix.set(8, 15 - i2 - 1, mod, true);
        }
      }
      matrix.set(size - 8, 8, 1, true);
    }
    function setupData(matrix, data) {
      const size = matrix.size;
      let inc = -1;
      let row = size - 1;
      let bitIndex = 7;
      let byteIndex = 0;
      for (let col = size - 1; col > 0; col -= 2) {
        if (col === 6) col--;
        while (true) {
          for (let c2 = 0; c2 < 2; c2++) {
            if (!matrix.isReserved(row, col - c2)) {
              let dark = false;
              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) === 1;
              }
              matrix.set(row, col - c2, dark);
              bitIndex--;
              if (bitIndex === -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || size <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    }
    function createData(version, errorCorrectionLevel, segments) {
      const buffer = new BitBuffer();
      segments.forEach(function(data) {
        buffer.put(data.mode.bit, 4);
        buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));
        data.write(buffer);
      });
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
        buffer.put(0, 4);
      }
      while (buffer.getLengthInBits() % 8 !== 0) {
        buffer.putBit(0);
      }
      const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
      for (let i2 = 0; i2 < remainingByte; i2++) {
        buffer.put(i2 % 2 ? 17 : 236, 8);
      }
      return createCodewords(buffer, version, errorCorrectionLevel);
    }
    function createCodewords(bitBuffer, version, errorCorrectionLevel) {
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewords = totalCodewords - ecTotalCodewords;
      const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);
      const blocksInGroup2 = totalCodewords % ecTotalBlocks;
      const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
      const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
      const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
      const rs = new ReedSolomonEncoder(ecCount);
      let offset = 0;
      const dcData = new Array(ecTotalBlocks);
      const ecData = new Array(ecTotalBlocks);
      let maxDataSize = 0;
      const buffer = new Uint8Array(bitBuffer.buffer);
      for (let b2 = 0; b2 < ecTotalBlocks; b2++) {
        const dataSize = b2 < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
        dcData[b2] = buffer.slice(offset, offset + dataSize);
        ecData[b2] = rs.encode(dcData[b2]);
        offset += dataSize;
        maxDataSize = Math.max(maxDataSize, dataSize);
      }
      const data = new Uint8Array(totalCodewords);
      let index = 0;
      let i2, r2;
      for (i2 = 0; i2 < maxDataSize; i2++) {
        for (r2 = 0; r2 < ecTotalBlocks; r2++) {
          if (i2 < dcData[r2].length) {
            data[index++] = dcData[r2][i2];
          }
        }
      }
      for (i2 = 0; i2 < ecCount; i2++) {
        for (r2 = 0; r2 < ecTotalBlocks; r2++) {
          data[index++] = ecData[r2][i2];
        }
      }
      return data;
    }
    function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
      let segments;
      if (Array.isArray(data)) {
        segments = Segments.fromArray(data);
      } else if (typeof data === "string") {
        let estimatedVersion = version;
        if (!estimatedVersion) {
          const rawSegments = Segments.rawSplit(data);
          estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
        }
        segments = Segments.fromString(data, estimatedVersion || 40);
      } else {
        throw new Error("Invalid data");
      }
      const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);
      if (!bestVersion) {
        throw new Error("The amount of data is too big to be stored in a QR Code");
      }
      if (!version) {
        version = bestVersion;
      } else if (version < bestVersion) {
        throw new Error(
          "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + ".\n"
        );
      }
      const dataBits = createData(version, errorCorrectionLevel, segments);
      const moduleCount = Utils.getSymbolSize(version);
      const modules = new BitMatrix(moduleCount);
      setupFinderPattern(modules, version);
      setupTimingPattern(modules);
      setupAlignmentPattern(modules, version);
      setupFormatInfo(modules, errorCorrectionLevel, 0);
      if (version >= 7) {
        setupVersionInfo(modules, version);
      }
      setupData(modules, dataBits);
      if (isNaN(maskPattern)) {
        maskPattern = MaskPattern.getBestMask(
          modules,
          setupFormatInfo.bind(null, modules, errorCorrectionLevel)
        );
      }
      MaskPattern.applyMask(maskPattern, modules);
      setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
      return {
        modules,
        version,
        errorCorrectionLevel,
        maskPattern,
        segments
      };
    }
    exports.create = function create(data, options) {
      if (typeof data === "undefined" || data === "") {
        throw new Error("No input text");
      }
      let errorCorrectionLevel = ECLevel.M;
      let version;
      let mask;
      if (typeof options !== "undefined") {
        errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
        version = Version.from(options.version);
        mask = MaskPattern.from(options.maskPattern);
        if (options.toSJISFunc) {
          Utils.setToSJISFunction(options.toSJISFunc);
        }
      }
      return createSymbol(data, version, errorCorrectionLevel, mask);
    };
  }
});

// node_modules/qrcode/lib/renderer/utils.js
var require_utils2 = __commonJS({
  "node_modules/qrcode/lib/renderer/utils.js"(exports) {
    function hex2rgba(hex) {
      if (typeof hex === "number") {
        hex = hex.toString();
      }
      if (typeof hex !== "string") {
        throw new Error("Color should be defined as hex string");
      }
      let hexCode = hex.slice().replace("#", "").split("");
      if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
        throw new Error("Invalid hex color: " + hex);
      }
      if (hexCode.length === 3 || hexCode.length === 4) {
        hexCode = Array.prototype.concat.apply([], hexCode.map(function(c2) {
          return [c2, c2];
        }));
      }
      if (hexCode.length === 6) hexCode.push("F", "F");
      const hexValue = parseInt(hexCode.join(""), 16);
      return {
        r: hexValue >> 24 & 255,
        g: hexValue >> 16 & 255,
        b: hexValue >> 8 & 255,
        a: hexValue & 255,
        hex: "#" + hexCode.slice(0, 6).join("")
      };
    }
    exports.getOptions = function getOptions(options) {
      if (!options) options = {};
      if (!options.color) options.color = {};
      const margin = typeof options.margin === "undefined" || options.margin === null || options.margin < 0 ? 4 : options.margin;
      const width = options.width && options.width >= 21 ? options.width : void 0;
      const scale = options.scale || 4;
      return {
        width,
        scale: width ? 4 : scale,
        margin,
        color: {
          dark: hex2rgba(options.color.dark || "#000000ff"),
          light: hex2rgba(options.color.light || "#ffffffff")
        },
        type: options.type,
        rendererOpts: options.rendererOpts || {}
      };
    };
    exports.getScale = function getScale(qrSize, opts) {
      return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
    };
    exports.getImageWidth = function getImageWidth(qrSize, opts) {
      const scale = exports.getScale(qrSize, opts);
      return Math.floor((qrSize + opts.margin * 2) * scale);
    };
    exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
      const size = qr.modules.size;
      const data = qr.modules.data;
      const scale = exports.getScale(size, opts);
      const symbolSize = Math.floor((size + opts.margin * 2) * scale);
      const scaledMargin = opts.margin * scale;
      const palette = [opts.color.light, opts.color.dark];
      for (let i2 = 0; i2 < symbolSize; i2++) {
        for (let j = 0; j < symbolSize; j++) {
          let posDst = (i2 * symbolSize + j) * 4;
          let pxColor = opts.color.light;
          if (i2 >= scaledMargin && j >= scaledMargin && i2 < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
            const iSrc = Math.floor((i2 - scaledMargin) / scale);
            const jSrc = Math.floor((j - scaledMargin) / scale);
            pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
          }
          imgData[posDst++] = pxColor.r;
          imgData[posDst++] = pxColor.g;
          imgData[posDst++] = pxColor.b;
          imgData[posDst] = pxColor.a;
        }
      }
    };
  }
});

// node_modules/qrcode/lib/renderer/canvas.js
var require_canvas = __commonJS({
  "node_modules/qrcode/lib/renderer/canvas.js"(exports) {
    var Utils = require_utils2();
    function clearCanvas(ctx, canvas2, size) {
      ctx.clearRect(0, 0, canvas2.width, canvas2.height);
      if (!canvas2.style) canvas2.style = {};
      canvas2.height = size;
      canvas2.width = size;
      canvas2.style.height = size + "px";
      canvas2.style.width = size + "px";
    }
    function getCanvasElement() {
      try {
        return document.createElement("canvas");
      } catch (e2) {
        throw new Error("You need to specify a canvas element");
      }
    }
    exports.render = function render(qrData, canvas2, options) {
      let opts = options;
      let canvasEl = canvas2;
      if (typeof opts === "undefined" && (!canvas2 || !canvas2.getContext)) {
        opts = canvas2;
        canvas2 = void 0;
      }
      if (!canvas2) {
        canvasEl = getCanvasElement();
      }
      opts = Utils.getOptions(opts);
      const size = Utils.getImageWidth(qrData.modules.size, opts);
      const ctx = canvasEl.getContext("2d");
      const image2 = ctx.createImageData(size, size);
      Utils.qrToImageData(image2.data, qrData, opts);
      clearCanvas(ctx, canvasEl, size);
      ctx.putImageData(image2, 0, 0);
      return canvasEl;
    };
    exports.renderToDataURL = function renderToDataURL(qrData, canvas2, options) {
      let opts = options;
      if (typeof opts === "undefined" && (!canvas2 || !canvas2.getContext)) {
        opts = canvas2;
        canvas2 = void 0;
      }
      if (!opts) opts = {};
      const canvasEl = exports.render(qrData, canvas2, opts);
      const type = opts.type || "image/png";
      const rendererOpts = opts.rendererOpts || {};
      return canvasEl.toDataURL(type, rendererOpts.quality);
    };
  }
});

// node_modules/qrcode/lib/renderer/svg-tag.js
var require_svg_tag = __commonJS({
  "node_modules/qrcode/lib/renderer/svg-tag.js"(exports) {
    var Utils = require_utils2();
    function getColorAttrib(color, attrib) {
      const alpha = color.a / 255;
      const str = attrib + '="' + color.hex + '"';
      return alpha < 1 ? str + " " + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
    }
    function svgCmd(cmd, x2, y) {
      let str = cmd + x2;
      if (typeof y !== "undefined") str += " " + y;
      return str;
    }
    function qrToPath(data, size, margin) {
      let path = "";
      let moveBy = 0;
      let newRow = false;
      let lineLength = 0;
      for (let i2 = 0; i2 < data.length; i2++) {
        const col = Math.floor(i2 % size);
        const row = Math.floor(i2 / size);
        if (!col && !newRow) newRow = true;
        if (data[i2]) {
          lineLength++;
          if (!(i2 > 0 && col > 0 && data[i2 - 1])) {
            path += newRow ? svgCmd("M", col + margin, 0.5 + row + margin) : svgCmd("m", moveBy, 0);
            moveBy = 0;
            newRow = false;
          }
          if (!(col + 1 < size && data[i2 + 1])) {
            path += svgCmd("h", lineLength);
            lineLength = 0;
          }
        } else {
          moveBy++;
        }
      }
      return path;
    }
    exports.render = function render(qrData, options, cb) {
      const opts = Utils.getOptions(options);
      const size = qrData.modules.size;
      const data = qrData.modules.data;
      const qrcodesize = size + opts.margin * 2;
      const bg = !opts.color.light.a ? "" : "<path " + getColorAttrib(opts.color.light, "fill") + ' d="M0 0h' + qrcodesize + "v" + qrcodesize + 'H0z"/>';
      const path = "<path " + getColorAttrib(opts.color.dark, "stroke") + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
      const viewBox = 'viewBox="0 0 ' + qrcodesize + " " + qrcodesize + '"';
      const width = !opts.width ? "" : 'width="' + opts.width + '" height="' + opts.width + '" ';
      const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + "</svg>\n";
      if (typeof cb === "function") {
        cb(null, svgTag);
      }
      return svgTag;
    };
  }
});

// node_modules/qrcode/lib/browser.js
var require_browser = __commonJS({
  "node_modules/qrcode/lib/browser.js"(exports) {
    var canPromise = require_can_promise();
    var QRCode3 = require_qrcode();
    var CanvasRenderer = require_canvas();
    var SvgRenderer = require_svg_tag();
    function renderCanvas(renderFunc, canvas2, text, opts, cb) {
      const args = [].slice.call(arguments, 1);
      const argsNum = args.length;
      const isLastArgCb = typeof args[argsNum - 1] === "function";
      if (!isLastArgCb && !canPromise()) {
        throw new Error("Callback required as last argument");
      }
      if (isLastArgCb) {
        if (argsNum < 2) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 2) {
          cb = text;
          text = canvas2;
          canvas2 = opts = void 0;
        } else if (argsNum === 3) {
          if (canvas2.getContext && typeof cb === "undefined") {
            cb = opts;
            opts = void 0;
          } else {
            cb = opts;
            opts = text;
            text = canvas2;
            canvas2 = void 0;
          }
        }
      } else {
        if (argsNum < 1) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 1) {
          text = canvas2;
          canvas2 = opts = void 0;
        } else if (argsNum === 2 && !canvas2.getContext) {
          opts = text;
          text = canvas2;
          canvas2 = void 0;
        }
        return new Promise(function(resolve, reject) {
          try {
            const data = QRCode3.create(text, opts);
            resolve(renderFunc(data, canvas2, opts));
          } catch (e2) {
            reject(e2);
          }
        });
      }
      try {
        const data = QRCode3.create(text, opts);
        cb(null, renderFunc(data, canvas2, opts));
      } catch (e2) {
        cb(e2);
      }
    }
    exports.create = QRCode3.create;
    exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
    exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
    exports.toString = renderCanvas.bind(null, function(data, _, opts) {
      return SvgRenderer.render(data, opts);
    });
  }
});

// node_modules/konva/lib/Global.js
var PI_OVER_180 = Math.PI / 180;
function detectBrowser() {
  return typeof window !== "undefined" && // browser case
  ({}.toString.call(window) === "[object Window]" || // electron case
  {}.toString.call(window) === "[object global]");
}
var glob = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" ? self : {};
var Konva = {
  _global: glob,
  version: "10.7.1",
  isBrowser: detectBrowser(),
  isUnminified: /param/.test(function(param) {
  }.toString()),
  dblClickWindow: 400,
  getAngle(angle) {
    return Konva.angleDeg ? angle * PI_OVER_180 : angle;
  },
  enableTrace: false,
  pointerEventsEnabled: true,
  /**
   * Should Konva automatically update canvas on any changes. Default is true.
   * @property autoDrawEnabled
   * @default true
   * @name autoDrawEnabled
   * @memberof Konva
   * @example
   * Konva.autoDrawEnabled = true;
   */
  autoDrawEnabled: true,
  /**
   * Should we enable hit detection while dragging? For performance reasons, by default it is false.
   * But on some rare cases you want to see hit graph and check intersections. Just set it to true.
   * @property hitOnDragEnabled
   * @default false
   * @name hitOnDragEnabled
   * @memberof Konva
   * @example
   * Konva.hitOnDragEnabled = true;
   */
  hitOnDragEnabled: false,
  /**
   * Should we capture touch events and bind them to the touchstart target? That is how it works on DOM elements.
   * The case: we touchstart on div1, then touchmove out of that element into another element div2.
   * DOM will continue trigger touchmove events on div1 (not div2). Because events are "captured" into initial target.
   * By default Konva do not do that and will trigger touchmove on another element, while pointer is moving.
   * @property capturePointerEventsEnabled
   * @default false
   * @name capturePointerEventsEnabled
   * @memberof Konva
   * @example
   * Konva.capturePointerEventsEnabled = true;
   */
  capturePointerEventsEnabled: false,
  _renderBackend: "web",
  // web, node-canvas, skia-canvas
  /**
   * Use legacy text rendering. with "middle" baseline by default.
   * @property legacyTextRendering
   * @default false
   * @name legacyTextRendering
   * @memberof Konva
   * @example
   * Konva.legacyTextRendering = true;
   */
  legacyTextRendering: false,
  /**
   * Global pixel ratio configuration. KonvaJS automatically detect pixel ratio of current device.
   * But you may override such property, if you want to use your value. Set this value before any components initializations.
   * @property pixelRatio
   * @default window.devicePixelRatio || 1
   * @name pixelRatio
   * @memberof Konva
   * @example
   * // before any Konva code:
   * Konva.pixelRatio = 1;
   */
  pixelRatio: typeof window !== "undefined" && window.devicePixelRatio || 1,
  /**
   * Drag distance property. If you start to drag a node you may want to wait until pointer is moved to some distance from start point
   * on either axis, only then start dragging. Default is 3px.
   * @property dragDistance
   * @default 3
   * @memberof Konva
   * @example
   * Konva.dragDistance = 10;
   */
  dragDistance: 3,
  /**
   * Use degree values for angle properties. You may set this property to false if you want to use radian values.
   * @property angleDeg
   * @default true
   * @memberof Konva
   * @example
   * node.rotation(45); // 45 degrees
   * Konva.angleDeg = false;
   * node.rotation(Math.PI / 2); // PI/2 radian
   */
  angleDeg: true,
  /**
   * Show warnings about wrong API usage (`Konva.Util.warn`). Errors are always printed
   * @property showWarnings
   * @default true
   * @memberof Konva
   * @example
   * Konva.showWarnings = false;
   */
  showWarnings: true,
  /**
   * Configure what mouse buttons can be used for drag and drop.
   * Default value is [0, 1] - left and middle mouse buttons.
   * @property dragButtons
   * @default [0, 1]
   * @memberof Konva
   * @example
   * // enable left and right mouse buttons
   * Konva.dragButtons = [0, 2];
   */
  dragButtons: [0, 1],
  /**
   * returns whether or not drag and drop is currently active
   * @method
   * @memberof Konva
   */
  isDragging() {
    return Konva["DD"].isDragging;
  },
  /**
   * returns whether or not a Transformer is currently transforming a node
   * @method
   * @memberof Konva
   */
  isTransforming() {
    var _a2, _b;
    return (_b = (_a2 = Konva["Transformer"]) === null || _a2 === void 0 ? void 0 : _a2.isTransforming()) !== null && _b !== void 0 ? _b : false;
  },
  /**
   * returns whether or not a drag and drop operation is ready, but may
   *  not necessarily have started
   * @method
   * @memberof Konva
   */
  isDragReady() {
    return !!Konva["DD"].node;
  },
  /**
   * Should Konva release canvas elements on destroy. Default is true.
   * Useful to avoid memory leak issues in Safari on macOS/iOS.
   * @property releaseCanvasOnDestroy
   * @default true
   * @name releaseCanvasOnDestroy
   * @memberof Konva
   * @example
   * Konva.releaseCanvasOnDestroy = true;
   */
  releaseCanvasOnDestroy: true,
  document: glob.document,
  // insert Konva into global namespace (window)
  // it is required for npm packages
  _injectGlobal(Konva4) {
    if (typeof glob.Konva !== "undefined") {
      console.error("Several Konva instances detected. It is not recommended to use multiple Konva instances in the same environment.");
    }
    glob.Konva = Konva4;
  }
};
var _boundedShapes = /* @__PURE__ */ new Set();
var _registerNode = (NodeClass, boundsCoverPaint = false) => {
  Konva[NodeClass.prototype.getClassName()] = NodeClass;
  if (boundsCoverPaint)
    _boundedShapes.add(NodeClass);
};
Konva._injectGlobal(Konva);

// node_modules/konva/lib/Util.js
var NODE_ERROR = `Konva.js unsupported environment.

Looks like you are trying to use Konva.js in Node.js environment (or in a Web Worker), because "document" object is undefined.

To use Konva.js in Node.js environment, you need to use the "canvas-backend" or "skia-backend" module.

bash: npm install canvas
js: import "konva/canvas-backend";

or

bash: npm install skia-canvas
js: import "konva/skia-backend";
`;
var ensureBrowser = () => {
  if (typeof document === "undefined") {
    throw new Error(NODE_ERROR);
  }
};
var Transform = class _Transform {
  constructor(m) {
    this.dirty = false;
    this.m = m ? m.slice() : [1, 0, 0, 1, 0, 0];
  }
  reset() {
    this.m[0] = 1;
    this.m[1] = 0;
    this.m[2] = 0;
    this.m[3] = 1;
    this.m[4] = 0;
    this.m[5] = 0;
  }
  /**
   * Copy Konva.Transform object
   * @method
   * @name Konva.Transform#copy
   * @returns {Konva.Transform}
   * @example
   * const tr = shape.getTransform().copy()
   */
  copy() {
    return new _Transform(this.m);
  }
  copyInto(tr) {
    tr.m[0] = this.m[0];
    tr.m[1] = this.m[1];
    tr.m[2] = this.m[2];
    tr.m[3] = this.m[3];
    tr.m[4] = this.m[4];
    tr.m[5] = this.m[5];
  }
  /**
   * Transform point
   * @method
   * @name Konva.Transform#point
   * @param {Object} point 2D point(x, y)
   * @returns {Object} 2D point(x, y)
   */
  point(point) {
    const m = this.m;
    return {
      x: m[0] * point.x + m[2] * point.y + m[4],
      y: m[1] * point.x + m[3] * point.y + m[5]
    };
  }
  // Axis-aligned bounds of a rectangle after this transform.
  _getTransformedRect(rect) {
    const [a3, b2, c2, d2, e2, f] = this.m;
    const x1 = rect.x, y1 = rect.y, x2 = rect.x + rect.width, y2 = rect.y + rect.height;
    const xs = [
      a3 * x1 + c2 * y1 + e2,
      a3 * x2 + c2 * y1 + e2,
      a3 * x2 + c2 * y2 + e2,
      a3 * x1 + c2 * y2 + e2
    ];
    const ys = [
      b2 * x1 + d2 * y1 + f,
      b2 * x2 + d2 * y1 + f,
      b2 * x2 + d2 * y2 + f,
      b2 * x1 + d2 * y2 + f
    ];
    const minX = Math.min(xs[0], xs[1], xs[2], xs[3]);
    const minY = Math.min(ys[0], ys[1], ys[2], ys[3]);
    return {
      x: minX,
      y: minY,
      width: Math.max(xs[0], xs[1], xs[2], xs[3]) - minX,
      height: Math.max(ys[0], ys[1], ys[2], ys[3]) - minY
    };
  }
  /**
   * Apply translation
   * @method
   * @name Konva.Transform#translate
   * @param {Number} x
   * @param {Number} y
   * @returns {Konva.Transform}
   */
  translate(x2, y) {
    this.m[4] += this.m[0] * x2 + this.m[2] * y;
    this.m[5] += this.m[1] * x2 + this.m[3] * y;
    return this;
  }
  /**
   * Apply scale
   * @method
   * @name Konva.Transform#scale
   * @param {Number} sx
   * @param {Number} sy
   * @returns {Konva.Transform}
   */
  scale(sx, sy) {
    this.m[0] *= sx;
    this.m[1] *= sx;
    this.m[2] *= sy;
    this.m[3] *= sy;
    return this;
  }
  /**
   * Apply rotation
   * @method
   * @name Konva.Transform#rotate
   * @param {Number} rad  Angle in radians
   * @returns {Konva.Transform}
   */
  rotate(rad) {
    const c2 = Math.cos(rad);
    const s2 = Math.sin(rad);
    const m11 = this.m[0] * c2 + this.m[2] * s2;
    const m12 = this.m[1] * c2 + this.m[3] * s2;
    const m21 = this.m[0] * -s2 + this.m[2] * c2;
    const m22 = this.m[1] * -s2 + this.m[3] * c2;
    this.m[0] = m11;
    this.m[1] = m12;
    this.m[2] = m21;
    this.m[3] = m22;
    return this;
  }
  /**
   * Returns the translation
   * @method
   * @name Konva.Transform#getTranslation
   * @returns {Object} 2D point(x, y)
   */
  getTranslation() {
    return {
      x: this.m[4],
      y: this.m[5]
    };
  }
  /**
   * Apply skew
   * @method
   * @name Konva.Transform#skew
   * @param {Number} sx
   * @param {Number} sy
   * @returns {Konva.Transform}
   */
  skew(sx, sy) {
    const m11 = this.m[0] + this.m[2] * sy;
    const m12 = this.m[1] + this.m[3] * sy;
    const m21 = this.m[2] + this.m[0] * sx;
    const m22 = this.m[3] + this.m[1] * sx;
    this.m[0] = m11;
    this.m[1] = m12;
    this.m[2] = m21;
    this.m[3] = m22;
    return this;
  }
  /**
   * Transform multiplication
   * @method
   * @name Konva.Transform#multiply
   * @param {Konva.Transform} matrix
   * @returns {Konva.Transform}
   */
  multiply(matrix) {
    const m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
    const m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];
    const m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
    const m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];
    const dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
    const dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];
    this.m[0] = m11;
    this.m[1] = m12;
    this.m[2] = m21;
    this.m[3] = m22;
    this.m[4] = dx;
    this.m[5] = dy;
    return this;
  }
  /**
   * Invert the matrix
   * @method
   * @name Konva.Transform#invert
   * @returns {Konva.Transform}
   */
  // a transform with a zero scale on an axis has no inverse
  isInvertible() {
    return this.m[0] * this.m[3] - this.m[1] * this.m[2] !== 0;
  }
  invert() {
    const d2 = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
    const m0 = this.m[3] * d2;
    const m1 = -this.m[1] * d2;
    const m2 = -this.m[2] * d2;
    const m3 = this.m[0] * d2;
    const m4 = d2 * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
    const m5 = d2 * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
    this.m[0] = m0;
    this.m[1] = m1;
    this.m[2] = m2;
    this.m[3] = m3;
    this.m[4] = m4;
    this.m[5] = m5;
    return this;
  }
  /**
   * return matrix
   * @method
   * @name Konva.Transform#getMatrix
   */
  getMatrix() {
    return this.m;
  }
  /**
   * convert transformation matrix back into node's attributes
   * @method
   * @name Konva.Transform#decompose
   * @returns {Konva.Transform}
   */
  decompose() {
    const a3 = this.m[0];
    const b2 = this.m[1];
    const c2 = this.m[2];
    const d2 = this.m[3];
    const e2 = this.m[4];
    const f = this.m[5];
    const delta = a3 * d2 - b2 * c2;
    const result = {
      x: e2,
      y: f,
      rotation: 0,
      scaleX: 0,
      scaleY: 0,
      skewX: 0,
      skewY: 0
    };
    if (a3 != 0 || b2 != 0) {
      const r2 = Math.sqrt(a3 * a3 + b2 * b2);
      result.rotation = b2 > 0 ? Math.acos(a3 / r2) : -Math.acos(a3 / r2);
      result.scaleX = r2;
      result.scaleY = delta / r2;
      result.skewX = delta && (a3 * c2 + b2 * d2) / delta;
      result.skewY = 0;
    } else if (c2 != 0 || d2 != 0) {
      const s2 = Math.sqrt(c2 * c2 + d2 * d2);
      result.rotation = Math.PI / 2 - (d2 > 0 ? Math.acos(-c2 / s2) : -Math.acos(c2 / s2));
      result.scaleX = delta / s2;
      result.scaleY = s2;
      result.skewX = 0;
      result.skewY = delta && (a3 * c2 + b2 * d2) / delta;
    } else {
    }
    result.rotation = Util._getRotation(result.rotation);
    return result;
  }
};
var OBJECT_ARRAY = "[object Array]";
var OBJECT_NUMBER = "[object Number]";
var OBJECT_STRING = "[object String]";
var OBJECT_BOOLEAN = "[object Boolean]";
var PI_OVER_DEG180 = Math.PI / 180;
var DEG180_OVER_PI = 180 / Math.PI;
var HASH = "#";
var EMPTY_STRING = "";
var ZERO = "0";
var KONVA_WARNING = "Konva warning: ";
var KONVA_ERROR = "Konva error: ";
var COLORS = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  grey: [128, 128, 128],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  transparent: [0, 0, 0, 0],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50]
};
var _isCanvasFarblingActive = null;
var defaultWindow = typeof window !== "undefined" ? window : {};
var animQueues = /* @__PURE__ */ new WeakMap();
var requestFrame = (win, f) => {
  if (typeof win.requestAnimationFrame === "function") {
    win.requestAnimationFrame(f);
  } else if (typeof requestAnimationFrame !== "undefined") {
    requestAnimationFrame(f);
  } else {
    setTimeout(f, 16);
  }
};
var capitalizeCache = /* @__PURE__ */ new Map();
var TypedArray = Object.getPrototypeOf(Int8Array);
var splitColorComponents = (str) => {
  const components = str.trim();
  return components.indexOf(",") === -1 ? components.split(/\s*\/\s*|\s+/) : components.split(/\s*,\s*/);
};
var NUMBER_SOURCE = "[+-]?(?:\\d+\\.?\\d*|\\.\\d+)(?:e[+-]?\\d+)?";
var COLOR_COMPONENT_REGEX = new RegExp(`^(${NUMBER_SOURCE})(%?)$`, "i");
var parseColorComponent = (value, max) => {
  const match = COLOR_COMPONENT_REGEX.exec(value);
  if (!match) {
    return NaN;
  }
  const n2 = match[2] ? Number(match[1]) / 100 * max : Number(match[1]);
  return Math.min(Math.max(n2, 0), max);
};
var HEX_COLOR_REGEX = /^#[0-9a-f]+$/i;
var HUE_REGEX = new RegExp(`^(${NUMBER_SOURCE})(deg|grad|rad|turn)?$`, "i");
var HUE_UNITS = {
  deg: 1,
  grad: 0.9,
  rad: DEG180_OVER_PI,
  turn: 360
};
function clampRadius(radius, max) {
  return Math.min(Math.max(radius || 0, 0), max);
}
var Util = {
  /*
   * cherry-picked utilities from underscore.js
   */
  _isElement(obj) {
    return !!(obj && obj.nodeType == 1);
  },
  _isFunction(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  },
  _isPlainObject(obj) {
    return !!obj && obj.constructor === Object;
  },
  _isArray(obj) {
    return Object.prototype.toString.call(obj) === OBJECT_ARRAY;
  },
  _isNumber(obj) {
    return Object.prototype.toString.call(obj) === OBJECT_NUMBER && !isNaN(obj) && isFinite(obj);
  },
  _isString(obj) {
    return Object.prototype.toString.call(obj) === OBJECT_STRING;
  },
  _isBoolean(obj) {
    return Object.prototype.toString.call(obj) === OBJECT_BOOLEAN;
  },
  // arrays are objects too
  isObject(val) {
    return val instanceof Object;
  },
  isValidSelector(selector) {
    if (typeof selector !== "string") {
      return false;
    }
    const firstChar = selector[0];
    return firstChar === "#" || firstChar === "." || firstChar === firstChar.toUpperCase();
  },
  _sign(number) {
    if (number === 0) {
      return 1;
    }
    if (number > 0) {
      return 1;
    } else {
      return -1;
    }
  },
  requestAnimFrame(callback, win) {
    const target = win && !win.closed && win || defaultWindow;
    let queue = animQueues.get(target);
    if (!queue) {
      queue = [];
      animQueues.set(target, queue);
      requestFrame(target, function() {
        animQueues.delete(target);
        queue.forEach(function(cb) {
          cb();
        });
      });
    }
    queue.push(callback);
  },
  createCanvasElement() {
    ensureBrowser();
    const canvas2 = document.createElement("canvas");
    try {
      canvas2.style = canvas2.style || {};
    } catch (e2) {
    }
    return canvas2;
  },
  createImageElement() {
    ensureBrowser();
    return document.createElement("img");
  },
  /*
   * arg can be an image object or image data
   */
  _urlToImage(url, callback, onError) {
    const imageObj = Util.createImageElement();
    imageObj.onload = function() {
      callback(imageObj);
    };
    imageObj.onerror = (event) => {
      onError === null || onError === void 0 ? void 0 : onError(event instanceof Error ? event : new Error("Unable to load image."));
    };
    imageObj.src = url;
  },
  _rgbToHex(r2, g2, b2) {
    return ((1 << 24) + (r2 << 16) + (g2 << 8) + b2).toString(16).slice(1);
  },
  _hexToRgb(hex) {
    hex = hex.replace(HASH, EMPTY_STRING);
    const bigint = parseInt(hex, 16);
    return {
      r: bigint >> 16 & 255,
      g: bigint >> 8 & 255,
      b: bigint & 255
    };
  },
  /**
   * return random hex color
   * @method
   * @memberof Konva.Util
   * @example
   * shape.fill(Konva.Util.getRandomColor());
   */
  getRandomColor() {
    let randColor = (Math.random() * 16777215 << 0).toString(16);
    while (randColor.length < 6) {
      randColor = ZERO + randColor;
    }
    return HASH + randColor;
  },
  /**
   * Check if canvas farbling is active (e.g., Brave browser fingerprinting protection)
   * @method
   * @memberof Konva.Util
   * @returns {Boolean}
   */
  isCanvasFarblingActive() {
    if (_isCanvasFarblingActive !== null) {
      return _isCanvasFarblingActive;
    }
    if (typeof document === "undefined") {
      _isCanvasFarblingActive = false;
      return false;
    }
    const c2 = this.createCanvasElement();
    c2.width = 10;
    c2.height = 10;
    const ctx = c2.getContext("2d", {
      willReadFrequently: true
    });
    ctx.clearRect(0, 0, 10, 10);
    ctx.fillStyle = "#282828";
    ctx.fillRect(0, 0, 10, 10);
    const d2 = ctx.getImageData(0, 0, 10, 10).data;
    let isFarbling = false;
    for (let i2 = 0; i2 < 100; i2++) {
      if (d2[i2 * 4] !== 40 || d2[i2 * 4 + 1] !== 40 || d2[i2 * 4 + 2] !== 40 || d2[i2 * 4 + 3] !== 255) {
        isFarbling = true;
        break;
      }
    }
    _isCanvasFarblingActive = isFarbling;
    this.releaseCanvas(c2);
    return _isCanvasFarblingActive;
  },
  /**
   * Get a random color for hit detection (snapped to the hit color grid)
   * @method
   * @memberof Konva.Util
   * @returns {String} hex color string
   */
  getHitColor() {
    const channel = () => Math.random() * 256 | 0;
    return this.getHitColorKey(channel(), channel(), channel());
  },
  /**
   * Get hit color key from RGB values (snapped to the hit color grid)
   * @method
   * @memberof Konva.Util
   * @param {Number} r - red component (0-255)
   * @param {Number} g - green component (0-255)
   * @param {Number} b - blue component (0-255)
   * @returns {String} hex color key string
   */
  getHitColorKey(r2, g2, b2) {
    const step = this.isCanvasFarblingActive() ? 5 : 3;
    const snap = (value) => Math.round(value / step) * step;
    return HASH + this._rgbToHex(snap(r2), snap(g2), snap(b2));
  },
  /**
   * Snap a hex color to the hit color grid
   * @method
   * @memberof Konva.Util
   * @param {String} hex - hex color string (e.g., "#ff00ff")
   * @returns {String} snapped hex color string
   */
  getSnappedHexColor(hex) {
    const { r: r2, g: g2, b: b2 } = this._hexToRgb(hex);
    return this.getHitColorKey(r2, g2, b2);
  },
  /**
   * get RGB components of a color
   * @method
   * @memberof Konva.Util
   * @param {String} color
   * @example
   * // each of the following examples return {r:0, g:0, b:255}
   * var rgb = Konva.Util.getRGB('blue');
   * var rgb = Konva.Util.getRGB('#0000ff');
   * var rgb = Konva.Util.getRGB('rgb(0,0,255)');
   */
  getRGB(color) {
    var _a2;
    const { r: r2 = 0, g: g2 = 0, b: b2 = 0 } = (_a2 = Util.colorToRGBA(color)) !== null && _a2 !== void 0 ? _a2 : {};
    return { r: r2, g: g2, b: b2 };
  },
  // convert any color string to RGBA object
  // from https://github.com/component/color-parser
  colorToRGBA(str) {
    str = (str || "").trim() || "black";
    const color = Util._namedColorToRBA(str) || Util._hex3ColorToRGBA(str) || Util._hex4ColorToRGBA(str) || Util._hex6ColorToRGBA(str) || Util._hex8ColorToRGBA(str) || Util._rgbColorToRGBA(str) || Util._hslColorToRGBA(str);
    if (color && [color.r, color.g, color.b, color.a].every(Util._isNumber)) {
      return color;
    }
  },
  // Parse named css color. Like "green"
  _namedColorToRBA(str) {
    const c2 = COLORS[str.toLowerCase()];
    if (!c2) {
      return null;
    }
    return {
      r: c2[0],
      g: c2[1],
      b: c2[2],
      a: c2.length > 3 ? c2[3] : 1
    };
  },
  // Parse rgb(n, n, n), rgba(n, n, n, n) and rgb(n n n / n)
  _rgbColorToRGBA(str) {
    const match = /^rgba?\(([^)]*)\)$/i.exec(str);
    if (!match) {
      return;
    }
    const parts = splitColorComponents(match[1]);
    if (parts.length < 3 || parts.length > 4) {
      return;
    }
    return {
      r: parseColorComponent(parts[0], 255),
      g: parseColorComponent(parts[1], 255),
      b: parseColorComponent(parts[2], 255),
      a: parts.length > 3 ? parseColorComponent(parts[3], 1) : 1
    };
  },
  // Parse #nnnnnnnn
  _hex8ColorToRGBA(str) {
    if (str.length === 9 && HEX_COLOR_REGEX.test(str)) {
      return {
        r: parseInt(str.slice(1, 3), 16),
        g: parseInt(str.slice(3, 5), 16),
        b: parseInt(str.slice(5, 7), 16),
        a: parseInt(str.slice(7, 9), 16) / 255
      };
    }
  },
  // Parse #nnnnnn
  _hex6ColorToRGBA(str) {
    if (str.length === 7 && HEX_COLOR_REGEX.test(str)) {
      return {
        r: parseInt(str.slice(1, 3), 16),
        g: parseInt(str.slice(3, 5), 16),
        b: parseInt(str.slice(5, 7), 16),
        a: 1
      };
    }
  },
  // Parse #nnnn
  _hex4ColorToRGBA(str) {
    if (str.length === 5 && HEX_COLOR_REGEX.test(str)) {
      return {
        r: parseInt(str[1] + str[1], 16),
        g: parseInt(str[2] + str[2], 16),
        b: parseInt(str[3] + str[3], 16),
        a: parseInt(str[4] + str[4], 16) / 255
      };
    }
  },
  // Parse #nnn
  _hex3ColorToRGBA(str) {
    if (str.length === 4 && HEX_COLOR_REGEX.test(str)) {
      return {
        r: parseInt(str[1] + str[1], 16),
        g: parseInt(str[2] + str[2], 16),
        b: parseInt(str[3] + str[3], 16),
        a: 1
      };
    }
  },
  // Code adapted from https://github.com/Qix-/color-convert/blob/master/conversions.js#L244
  // Parse hsl(h, s%, l%), hsla(h, s%, l%, n) and hsl(h s% l% / n)
  _hslColorToRGBA(str) {
    const match = /^hsla?\(([^)]*)\)$/i.exec(str);
    if (!match) {
      return;
    }
    const parts = splitColorComponents(match[1]);
    if (parts.length < 3 || parts.length > 4) {
      return;
    }
    const hue = HUE_REGEX.exec(parts[0]);
    if (!hue) {
      return;
    }
    const unit = hue[2];
    const degrees = Number(hue[1]) * (unit ? HUE_UNITS[unit.toLowerCase()] : 1);
    if (!isFinite(degrees)) {
      return;
    }
    const h2 = (degrees % 360 + 360) % 360 / 360;
    const s2 = parseColorComponent(parts[1], 100) / 100;
    const l3 = parseColorComponent(parts[2], 100) / 100;
    const a3 = parts.length > 3 ? parseColorComponent(parts[3], 1) : 1;
    const t2 = l3 < 0.5 ? l3 * (1 + s2) : l3 + s2 - l3 * s2;
    const t1 = 2 * l3 - t2;
    const rgb = [0, 0, 0];
    for (let i2 = 0; i2 < 3; i2++) {
      let t3 = h2 + 1 / 3 * -(i2 - 1);
      if (t3 < 0) {
        t3++;
      }
      if (t3 > 1) {
        t3--;
      }
      let val;
      if (6 * t3 < 1) {
        val = t1 + (t2 - t1) * 6 * t3;
      } else if (2 * t3 < 1) {
        val = t2;
      } else if (3 * t3 < 2) {
        val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
      } else {
        val = t1;
      }
      rgb[i2] = val * 255;
    }
    return {
      r: Math.round(rgb[0]),
      g: Math.round(rgb[1]),
      b: Math.round(rgb[2]),
      a: a3
    };
  },
  // the bounds of a flat [x0, y0, x1, y1, ...] array. A NaN coordinate is
  // skipped so one bad point cannot turn the whole box into NaN; no usable
  // point at all is an empty rect
  _getPointsRect(points) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (let i2 = 0; i2 < points.length; i2 += 2) {
      const x2 = points[i2];
      const y = points[i2 + 1];
      if (!isNaN(x2)) {
        minX = Math.min(minX, x2);
        maxX = Math.max(maxX, x2);
      }
      if (!isNaN(y)) {
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
    if (!isFinite(minX + minY)) {
      return { x: 0, y: 0, width: 0, height: 0 };
    }
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  },
  /**
   * check intersection of two client rectangles
   * @method
   * @memberof Konva.Util
   * @param {Object} r1 - { x, y, width, height } client rectangle
   * @param {Object} r2 - { x, y, width, height } client rectangle
   * @example
   * const overlapping = Konva.Util.haveIntersection(shape1.getClientRect(), shape2.getClientRect());
   */
  haveIntersection(r1, r2) {
    return !(r2.x > r1.x + r1.width || r2.x + r2.width < r1.x || r2.y > r1.y + r1.height || r2.y + r2.height < r1.y);
  },
  // a deep copy of plain objects and arrays; class instances and elements
  // are shared, typed arrays are copied
  cloneObject(obj) {
    const copy = {};
    for (const key in obj) {
      copy[key] = Util._cloneValue(obj[key]);
    }
    return copy;
  },
  _cloneValue(val) {
    if (Util._isArray(val)) {
      return val.some((item) => typeof item === "object") ? val.map(Util._cloneValue) : val.slice();
    }
    if (Util._isPlainObject(val)) {
      return Util.cloneObject(val);
    }
    return val instanceof TypedArray ? val.slice() : val;
  },
  cloneArray(arr) {
    return arr.slice(0);
  },
  degToRad(deg) {
    return deg * PI_OVER_DEG180;
  },
  radToDeg(rad) {
    return rad * DEG180_OVER_PI;
  },
  _getRotation(radians) {
    return Konva.angleDeg ? Util.radToDeg(radians) : radians;
  },
  // Memoized — called per-attr per setAttrs; input vocabulary is bounded.
  _capitalize(str) {
    const cached = capitalizeCache.get(str);
    if (cached !== void 0)
      return cached;
    const out = str.charAt(0).toUpperCase() + str.slice(1);
    capitalizeCache.set(str, out);
    return out;
  },
  throw(str) {
    throw new Error(KONVA_ERROR + str);
  },
  error(str) {
    console.error(KONVA_ERROR + str);
  },
  warn(str) {
    if (!Konva.showWarnings) {
      return;
    }
    console.warn(KONVA_WARNING + str);
  },
  _batchEvents(batch, run) {
    if (!batch)
      return run();
    let called = false;
    let active = true;
    try {
      batch(() => {
        if (called || !active) {
          Util.warn("eventBatchFunc must call its argument exactly once, synchronously.");
          return;
        }
        called = true;
        run();
      });
    } finally {
      active = false;
      if (!called) {
        Util.warn("eventBatchFunc must call its argument synchronously.");
      }
    }
  },
  each(obj, func) {
    for (const key in obj) {
      func(key, obj[key]);
    }
  },
  _inRange(val, left, right) {
    return left <= val && val < right;
  },
  _getProjectionToSegment(x1, y1, x2, y2, x3, y3) {
    let x4, y, dist;
    const pd2 = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
    if (pd2 == 0) {
      x4 = x1;
      y = y1;
      dist = (x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2);
    } else {
      const u2 = ((x3 - x1) * (x2 - x1) + (y3 - y1) * (y2 - y1)) / pd2;
      if (u2 < 0) {
        x4 = x1;
        y = y1;
        dist = (x1 - x3) * (x1 - x3) + (y1 - y3) * (y1 - y3);
      } else if (u2 > 1) {
        x4 = x2;
        y = y2;
        dist = (x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3);
      } else {
        x4 = x1 + u2 * (x2 - x1);
        y = y1 + u2 * (y2 - y1);
        dist = (x4 - x3) * (x4 - x3) + (y - y3) * (y - y3);
      }
    }
    return [x4, y, dist];
  },
  // line as array of points.
  // line might be closed
  _getProjectionToLine(pt, line, isClosed) {
    const pc = Util.cloneObject(pt);
    let dist = Number.MAX_VALUE;
    line.forEach(function(p1, i2) {
      if (!isClosed && i2 === line.length - 1) {
        return;
      }
      const p2 = line[(i2 + 1) % line.length];
      const proj = Util._getProjectionToSegment(p1.x, p1.y, p2.x, p2.y, pt.x, pt.y);
      const px = proj[0], py = proj[1], pdist = proj[2];
      if (pdist < dist) {
        pc.x = px;
        pc.y = py;
        dist = pdist;
      }
    });
    return pc;
  },
  _prepareArrayForTween(startArray, endArray, isClosed) {
    const start = [], end = [];
    if (startArray.length > endArray.length) {
      const temp = endArray;
      endArray = startArray;
      startArray = temp;
    }
    for (let n2 = 0; n2 < startArray.length; n2 += 2) {
      start.push({
        x: startArray[n2],
        y: startArray[n2 + 1]
      });
    }
    for (let n2 = 0; n2 < endArray.length; n2 += 2) {
      end.push({
        x: endArray[n2],
        y: endArray[n2 + 1]
      });
    }
    const newStart = [];
    end.forEach(function(point) {
      const pr = Util._getProjectionToLine(point, start, isClosed);
      newStart.push(pr.x);
      newStart.push(pr.y);
    });
    return newStart;
  },
  // copies plain objects and arrays without DOM elements and circular
  // references, so the input (the live attrs of a node) is never modified.
  // Other objects (Date, class instances) are kept as they are
  _prepareToStringify(obj, ancestors = /* @__PURE__ */ new Set()) {
    const copy = Util._isArray(obj) ? [] : {};
    ancestors.add(obj);
    for (const key of Object.keys(obj)) {
      const val = obj[key];
      if (Util._isElement(val) || ancestors.has(val)) {
        continue;
      }
      copy[key] = Util._isPlainObject(val) || Util._isArray(val) ? Util._prepareToStringify(val, ancestors) : val;
    }
    ancestors.delete(obj);
    return copy;
  },
  // very simplified version of Object.assign
  _assign(target, source) {
    for (const key in source) {
      target[key] = source[key];
    }
    return target;
  },
  _getEventType(type) {
    if (type.indexOf("pointer") >= 0)
      return "pointer";
    if (type.indexOf("touch") >= 0)
      return "touch";
    return "mouse";
  },
  _getFirstPointerId(evt) {
    var _a2;
    if (!evt.touches) {
      return (_a2 = evt.pointerId) !== null && _a2 !== void 0 ? _a2 : 999;
    } else {
      return evt.changedTouches[0].identifier;
    }
  },
  releaseCanvas(...canvases) {
    if (!Konva.releaseCanvasOnDestroy)
      return;
    canvases.forEach((c2) => {
      c2.width = 0;
      c2.height = 0;
    });
  },
  // [topLeft, topRight, bottomRight, bottomLeft] radii that fit the box
  _cornerRadii(cornerRadius, width, height) {
    const max = Math.min(width, height) / 2;
    if (typeof cornerRadius === "number") {
      const radius = clampRadius(cornerRadius, max);
      return [radius, radius, radius, radius];
    }
    return [
      clampRadius(cornerRadius[0], max),
      clampRadius(cornerRadius[1], max),
      clampRadius(cornerRadius[2], max),
      clampRadius(cornerRadius[3], max)
    ];
  },
  drawRoundedRectPath(context, width, height, cornerRadius) {
    let xOrigin = width < 0 ? width : 0;
    let yOrigin = height < 0 ? height : 0;
    width = Math.abs(width);
    height = Math.abs(height);
    const [topLeft, topRight, bottomRight, bottomLeft] = Util._cornerRadii(cornerRadius, width, height);
    context.moveTo(xOrigin + topLeft, yOrigin);
    context.lineTo(xOrigin + width - topRight, yOrigin);
    context.arc(xOrigin + width - topRight, yOrigin + topRight, topRight, Math.PI * 3 / 2, 0, false);
    context.lineTo(xOrigin + width, yOrigin + height - bottomRight);
    context.arc(xOrigin + width - bottomRight, yOrigin + height - bottomRight, bottomRight, 0, Math.PI / 2, false);
    context.lineTo(xOrigin + bottomLeft, yOrigin + height);
    context.arc(xOrigin + bottomLeft, yOrigin + height - bottomLeft, bottomLeft, Math.PI / 2, Math.PI, false);
    context.lineTo(xOrigin, yOrigin + topLeft);
    context.arc(xOrigin + topLeft, yOrigin + topLeft, topLeft, Math.PI, Math.PI * 3 / 2, false);
  },
  drawRoundedPolygonPath(context, points, sides, radius, cornerRadius) {
    radius = Math.abs(radius);
    for (let i2 = 0; i2 < sides; i2++) {
      const prev = points[(i2 - 1 + sides) % sides];
      const curr = points[i2];
      const next = points[(i2 + 1) % sides];
      const vec1 = { x: curr.x - prev.x, y: curr.y - prev.y };
      const vec2 = { x: next.x - curr.x, y: next.y - curr.y };
      const len1 = Math.hypot(vec1.x, vec1.y);
      const len2 = Math.hypot(vec2.x, vec2.y);
      let currCornerRadius;
      if (typeof cornerRadius === "number") {
        currCornerRadius = cornerRadius;
      } else {
        currCornerRadius = i2 < cornerRadius.length ? cornerRadius[i2] : 0;
      }
      const maxCornerRadius = radius * Math.cos(Math.PI / sides);
      currCornerRadius = maxCornerRadius * Math.min(1, currCornerRadius / radius * 2);
      const normalVec1 = { x: vec1.x / len1, y: vec1.y / len1 };
      const normalVec2 = { x: vec2.x / len2, y: vec2.y / len2 };
      const p1 = {
        x: curr.x - normalVec1.x * currCornerRadius,
        y: curr.y - normalVec1.y * currCornerRadius
      };
      const p2 = {
        x: curr.x + normalVec2.x * currCornerRadius,
        y: curr.y + normalVec2.y * currCornerRadius
      };
      if (i2 === 0) {
        context.moveTo(p1.x, p1.y);
      } else {
        context.lineTo(p1.x, p1.y);
      }
      context.arcTo(curr.x, curr.y, p2.x, p2.y, currCornerRadius);
    }
  }
};

// node_modules/konva/lib/Context.js
function simplifyArray(arr) {
  const retArr = [], len = arr.length, util = Util;
  for (let n2 = 0; n2 < len; n2++) {
    let val = arr[n2];
    if (util._isNumber(val)) {
      val = Math.round(val * 1e3) / 1e3;
    } else if (!util._isString(val)) {
      val = val + "";
    }
    retArr.push(val);
  }
  return retArr;
}
var COMMA = ",";
var OPEN_PAREN = "(";
var CLOSE_PAREN = ")";
var SEMICOLON = ";";
var DOUBLE_PAREN = "()";
var EQUALS = "=";
var CONTEXT_METHODS = [
  "arc",
  "arcTo",
  "beginPath",
  "bezierCurveTo",
  "clearRect",
  "clip",
  "closePath",
  "createLinearGradient",
  "createPattern",
  "createRadialGradient",
  "drawImage",
  "ellipse",
  "fill",
  "fillText",
  "getImageData",
  "createImageData",
  "lineTo",
  "moveTo",
  "putImageData",
  "quadraticCurveTo",
  "rect",
  "roundRect",
  "restore",
  "rotate",
  "save",
  "scale",
  "setLineDash",
  "setTransform",
  "stroke",
  "strokeText",
  "transform",
  "translate"
];
var CONTEXT_PROPERTIES = [
  "fillStyle",
  "strokeStyle",
  "shadowColor",
  "shadowBlur",
  "shadowOffsetX",
  "shadowOffsetY",
  "letterSpacing",
  "lineCap",
  "lineDashOffset",
  "lineJoin",
  "lineWidth",
  "miterLimit",
  "direction",
  "font",
  "textAlign",
  "textBaseline",
  "globalAlpha",
  "globalCompositeOperation",
  "imageSmoothingEnabled",
  "imageSmoothingQuality",
  "filter"
];
var traceArrMax = 100;
var _cssFiltersSupported = null;
function isCSSFiltersSupported() {
  if (_cssFiltersSupported !== null) {
    return _cssFiltersSupported;
  }
  try {
    const canvas2 = Util.createCanvasElement();
    const ctx = canvas2.getContext("2d");
    _cssFiltersSupported = !!ctx && "filter" in ctx;
    Util.releaseCanvas(canvas2);
  } catch (e2) {
    _cssFiltersSupported = false;
  }
  return _cssFiltersSupported;
}
var Context = class {
  constructor(canvas2) {
    this.canvas = canvas2;
    if (Konva.enableTrace) {
      this.traceArr = [];
      this._enableTrace();
    }
  }
  /**
   * fill shape
   * @method
   * @name Konva.Context#fillShape
   * @param {Konva.Shape} shape
   */
  fillShape(shape) {
    if (shape.fillEnabled()) {
      this._fill(shape);
    }
  }
  _fill(shape) {
  }
  /**
   * stroke shape
   * @method
   * @name Konva.Context#strokeShape
   * @param {Konva.Shape} shape
   */
  strokeShape(shape) {
    if (shape.hasStroke()) {
      this._stroke(shape);
    }
  }
  _stroke(shape) {
  }
  /**
   * fill then stroke
   * @method
   * @name Konva.Context#fillStrokeShape
   * @param {Konva.Shape} shape
   */
  fillStrokeShape(shape) {
    if (shape.attrs.fillAfterStrokeEnabled) {
      this.strokeShape(shape);
      this.fillShape(shape);
    } else {
      this.fillShape(shape);
      this.strokeShape(shape);
    }
  }
  getTrace(relaxed, rounded) {
    let traceArr = this.traceArr, len = traceArr.length, str = "", n2, trace, method, args;
    for (n2 = 0; n2 < len; n2++) {
      trace = traceArr[n2];
      method = trace.method;
      if (method) {
        args = trace.args;
        str += method;
        if (relaxed) {
          str += DOUBLE_PAREN;
        } else {
          if (rounded) {
            args = args.map((a3) => typeof a3 === "number" ? Math.floor(a3) : a3);
          }
          str += OPEN_PAREN + args.join(COMMA) + CLOSE_PAREN;
        }
      } else {
        str += trace.property;
        if (!relaxed) {
          str += EQUALS + trace.val;
        }
      }
      str += SEMICOLON;
    }
    return str;
  }
  clearTrace() {
    this.traceArr = [];
  }
  _trace(str) {
    let traceArr = this.traceArr, len;
    traceArr.push(str);
    len = traceArr.length;
    if (len >= traceArrMax) {
      traceArr.shift();
    }
  }
  /**
   * reset canvas context transform
   * @method
   * @name Konva.Context#reset
   */
  reset() {
    const pixelRatio = this.getCanvas().getPixelRatio();
    this.setTransform(1 * pixelRatio, 0, 0, 1 * pixelRatio, 0, 0);
  }
  /**
   * get canvas wrapper
   * @method
   * @name Konva.Context#getCanvas
   * @returns {Konva.Canvas}
   */
  getCanvas() {
    return this.canvas;
  }
  /**
   * clear canvas
   * @method
   * @name Konva.Context#clear
   * @param {Object} [bounds]
   * @param {Number} [bounds.x]
   * @param {Number} [bounds.y]
   * @param {Number} [bounds.width]
   * @param {Number} [bounds.height]
   */
  clear(bounds) {
    const canvas2 = this.getCanvas();
    if (bounds) {
      this.clearRect(bounds.x || 0, bounds.y || 0, bounds.width || 0, bounds.height || 0);
    } else {
      this.clearRect(0, 0, canvas2.getWidth() / canvas2.pixelRatio, canvas2.getHeight() / canvas2.pixelRatio);
    }
  }
  // Copy a buffer already rasterized in destination pixels. The caller owns
  // save/restore, opacity, compositing and the destination clip.
  _drawDeviceBuffer(canvas2) {
    const { x: x2, y, width, height } = canvas2._isolationRect;
    this.setTransform(1, 0, 0, 1, 0, 0);
    this.imageSmoothingEnabled = false;
    this.drawImage(canvas2._canvas, 0, 0, width, height, x2, y, width, height);
  }
  _applyLineCap(shape) {
    const lineCap = shape.attrs.lineCap;
    if (lineCap) {
      this.setAttr("lineCap", lineCap);
    }
  }
  _getOpacity(shape) {
    if (!this._opacityRoot) {
      return shape.getAbsoluteOpacity();
    }
    let opacity = shape.opacity();
    let parent = shape.parent;
    while (parent && parent !== this._opacityRoot) {
      opacity *= parent.opacity();
      parent = parent.parent;
    }
    return opacity;
  }
  _applyOpacity(shape) {
    const absOpacity = this._getOpacity(shape);
    if (absOpacity !== 1) {
      this.setAttr("globalAlpha", absOpacity);
    }
  }
  _applyLineJoin(shape) {
    const lineJoin = shape.attrs.lineJoin;
    if (lineJoin) {
      this.setAttr("lineJoin", lineJoin);
    }
  }
  _applyMiterLimit(shape) {
    const miterLimit = shape.attrs.miterLimit;
    if (miterLimit != null) {
      this.setAttr("miterLimit", miterLimit);
    }
  }
  setAttr(attr, val) {
    this._context[attr] = val;
  }
  /**
   * arc function.
   * @method
   * @name Konva.Context#arc
   */
  arc(x2, y, radius, startAngle, endAngle, counterClockwise) {
    this._context.arc(x2, y, radius, startAngle, endAngle, counterClockwise);
  }
  /**
   * arcTo function.
   * @method
   * @name Konva.Context#arcTo
   *
   */
  arcTo(x1, y1, x2, y2, radius) {
    this._context.arcTo(x1, y1, x2, y2, radius);
  }
  /**
   * beginPath function.
   * @method
   * @name Konva.Context#beginPath
   */
  beginPath() {
    this._context.beginPath();
  }
  /**
   * bezierCurveTo function.
   * @method
   * @name Konva.Context#bezierCurveTo
   */
  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y) {
    this._context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y);
  }
  /**
   * clearRect function.
   * @method
   * @name Konva.Context#clearRect
   */
  clearRect(x2, y, width, height) {
    this._context.clearRect(x2, y, width, height);
  }
  clip(...args) {
    this._context.clip.apply(this._context, args);
  }
  /**
   * closePath function.
   * @method
   * @name Konva.Context#closePath
   */
  closePath() {
    this._context.closePath();
  }
  /**
   * createImageData function.
   * @method
   * @name Konva.Context#createImageData
   */
  createImageData(width, height) {
    const a3 = arguments;
    if (a3.length === 2) {
      return this._context.createImageData(width, height);
    } else if (a3.length === 1) {
      return this._context.createImageData(width);
    }
  }
  /**
   * createLinearGradient function.
   * @method
   * @name Konva.Context#createLinearGradient
   */
  createLinearGradient(x0, y0, x1, y1) {
    return this._context.createLinearGradient(x0, y0, x1, y1);
  }
  /**
   * createPattern function.
   * @method
   * @name Konva.Context#createPattern
   */
  createPattern(image2, repetition) {
    return this._context.createPattern(image2, repetition);
  }
  /**
   * createRadialGradient function.
   * @method
   * @name Konva.Context#createRadialGradient
   */
  createRadialGradient(x0, y0, r0, x1, y1, r1) {
    return this._context.createRadialGradient(x0, y0, r0, x1, y1, r1);
  }
  /**
   * drawImage function.
   * @method
   * @name Konva.Context#drawImage
   */
  drawImage(image2, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
    const a3 = arguments, _context = this._context;
    if (a3.length === 3) {
      _context.drawImage(image2, sx, sy);
    } else if (a3.length === 5) {
      _context.drawImage(image2, sx, sy, sWidth, sHeight);
    } else if (a3.length === 9) {
      _context.drawImage(image2, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
  }
  /**
   * ellipse function.
   * @method
   * @name Konva.Context#ellipse
   */
  ellipse(x2, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise) {
    this._context.ellipse(x2, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise);
  }
  /**
   * isPointInPath function.
   * @method
   * @name Konva.Context#isPointInPath
   */
  isPointInPath(x2, y, path, fillRule) {
    if (path) {
      return this._context.isPointInPath(path, x2, y, fillRule);
    }
    return this._context.isPointInPath(x2, y, fillRule);
  }
  fill(...args) {
    this._context.fill.apply(this._context, args);
  }
  /**
   * fillRect function.
   * @method
   * @name Konva.Context#fillRect
   */
  fillRect(x2, y, width, height) {
    this._context.fillRect(x2, y, width, height);
  }
  /**
   * strokeRect function.
   * @method
   * @name Konva.Context#strokeRect
   */
  strokeRect(x2, y, width, height) {
    this._context.strokeRect(x2, y, width, height);
  }
  /**
   * fillText function.
   * @method
   * @name Konva.Context#fillText
   */
  fillText(text, x2, y, maxWidth) {
    if (maxWidth) {
      this._context.fillText(text, x2, y, maxWidth);
    } else {
      this._context.fillText(text, x2, y);
    }
  }
  /**
   * measureText function.
   * @method
   * @name Konva.Context#measureText
   */
  measureText(text) {
    return this._context.measureText(text);
  }
  /**
   * getImageData function.
   * @method
   * @name Konva.Context#getImageData
   */
  getImageData(sx, sy, sw, sh) {
    return this._context.getImageData(sx, sy, sw, sh);
  }
  /**
   * lineTo function.
   * @method
   * @name Konva.Context#lineTo
   */
  lineTo(x2, y) {
    this._context.lineTo(x2, y);
  }
  /**
   * moveTo function.
   * @method
   * @name Konva.Context#moveTo
   */
  moveTo(x2, y) {
    this._context.moveTo(x2, y);
  }
  /**
   * rect function.
   * @method
   * @name Konva.Context#rect
   */
  rect(x2, y, width, height) {
    this._context.rect(x2, y, width, height);
  }
  /**
   * roundRect function.
   * @method
   * @name Konva.Context#roundRect
   */
  roundRect(x2, y, width, height, radii) {
    this._context.roundRect(x2, y, width, height, radii);
  }
  /**
   * putImageData function.
   * @method
   * @name Konva.Context#putImageData
   */
  putImageData(imageData, dx, dy) {
    this._context.putImageData(imageData, dx, dy);
  }
  /**
   * quadraticCurveTo function.
   * @method
   * @name Konva.Context#quadraticCurveTo
   */
  quadraticCurveTo(cpx, cpy, x2, y) {
    this._context.quadraticCurveTo(cpx, cpy, x2, y);
  }
  /**
   * restore function.
   * @method
   * @name Konva.Context#restore
   */
  restore() {
    this._context.restore();
  }
  /**
   * rotate function.
   * @method
   * @name Konva.Context#rotate
   */
  rotate(angle) {
    this._context.rotate(angle);
  }
  /**
   * save function.
   * @method
   * @name Konva.Context#save
   */
  save() {
    this._context.save();
  }
  /**
   * scale function.
   * @method
   * @name Konva.Context#scale
   */
  scale(x2, y) {
    this._context.scale(x2, y);
  }
  /**
   * setLineDash function.
   * @method
   * @name Konva.Context#setLineDash
   */
  setLineDash(segments) {
    this._context.setLineDash(segments);
  }
  /**
   * getLineDash function.
   * @method
   * @name Konva.Context#getLineDash
   */
  getLineDash() {
    return this._context.getLineDash();
  }
  /**
   * setTransform function.
   * @method
   * @name Konva.Context#setTransform
   */
  setTransform(a3, b2, c2, d2, e2, f) {
    this._context.setTransform(a3, b2, c2, d2, e2, f);
  }
  /**
   * stroke function.
   * @method
   * @name Konva.Context#stroke
   */
  stroke(path2d) {
    if (path2d) {
      this._context.stroke(path2d);
    } else {
      this._context.stroke();
    }
  }
  /**
   * strokeText function.
   * @method
   * @name Konva.Context#strokeText
   */
  strokeText(text, x2, y, maxWidth) {
    this._context.strokeText(text, x2, y, maxWidth);
  }
  /**
   * transform function.
   * @method
   * @name Konva.Context#transform
   */
  transform(a3, b2, c2, d2, e2, f) {
    this._context.transform(a3, b2, c2, d2, e2, f);
  }
  /**
   * translate function.
   * @method
   * @name Konva.Context#translate
   */
  translate(x2, y) {
    this._context.translate(x2, y);
  }
  _enableTrace() {
    let that = this, len = CONTEXT_METHODS.length, origSetter = this.setAttr, n2, args;
    const func = function(methodName) {
      let origMethod = that[methodName], ret;
      that[methodName] = function() {
        args = simplifyArray(Array.prototype.slice.call(arguments, 0));
        ret = origMethod.apply(that, arguments);
        that._trace({
          method: methodName,
          args
        });
        return ret;
      };
    };
    for (n2 = 0; n2 < len; n2++) {
      func(CONTEXT_METHODS[n2]);
    }
    that.setAttr = function() {
      origSetter.apply(that, arguments);
      const prop = arguments[0];
      let val = arguments[1];
      if (prop === "shadowOffsetX" || prop === "shadowOffsetY" || prop === "shadowBlur") {
        val = val / this.canvas.getPixelRatio();
      }
      that._trace({
        property: prop,
        val
      });
    };
  }
  _applyGlobalCompositeOperation(node) {
    const op = node.attrs.globalCompositeOperation;
    const def = !op || op === "source-over";
    if (!def) {
      this.setAttr("globalCompositeOperation", op);
    }
  }
};
CONTEXT_PROPERTIES.forEach(function(prop) {
  Object.defineProperty(Context.prototype, prop, {
    get() {
      return this._context[prop];
    },
    set(val) {
      this._context[prop] = val;
    }
  });
});
var SceneContext = class extends Context {
  constructor(canvas2, { willReadFrequently = false } = {}) {
    super(canvas2);
    this._context = canvas2._canvas.getContext("2d", {
      willReadFrequently
    });
  }
  _getFillPattern(shape) {
    const context = this._context;
    if ("patternQuality" in context) {
      context.patternQuality = context.imageSmoothingEnabled ? "good" : "nearest";
    }
    return shape._getFillPattern();
  }
  _getFillStyle(shape) {
    const color = shape.fill();
    const priority = shape.fillPriority();
    if (color && priority === "color")
      return color;
    const pattern = shape.fillPatternImage();
    if (pattern && priority === "pattern")
      return this._getFillPattern(shape);
    const linear = shape.fillLinearGradientColorStops();
    if (linear && priority === "linear-gradient")
      return shape._getLinearGradient();
    const radial = shape.fillRadialGradientColorStops();
    if (radial && priority === "radial-gradient")
      return shape._getRadialGradient();
    if (color)
      return color;
    if (pattern)
      return this._getFillPattern(shape);
    if (linear)
      return shape._getLinearGradient();
    if (radial)
      return shape._getRadialGradient();
  }
  _fill(shape) {
    const style = this._getFillStyle(shape);
    if (style !== void 0) {
      this.setAttr("fillStyle", style);
      shape._fillFunc(this);
    }
  }
  _strokeLinearGradient(shape) {
    let start = shape.getStrokeLinearGradientStartPoint(), end = shape.getStrokeLinearGradientEndPoint();
    if (!shape.getStrokeScaleEnabled()) {
      const { a: a3, b: b2, c: c2, d: d2, e: e2, f } = this._context.getTransform();
      const transform = new Transform([a3, b2, c2, d2, e2, f]);
      const ratio = this.canvas.getPixelRatio();
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const nx = d2 * dx - b2 * dy;
      const ny = a3 * dy - c2 * dx;
      const lengthSquared = nx * nx + ny * ny;
      const scale = lengthSquared ? (dx * dx + dy * dy) * (a3 * d2 - b2 * c2) / lengthSquared : 0;
      start = transform.point(start);
      end = { x: start.x + nx * scale, y: start.y + ny * scale };
      start = { x: start.x / ratio, y: start.y / ratio };
      end = { x: end.x / ratio, y: end.y / ratio };
    }
    const colorStops = shape.getStrokeLinearGradientColorStops(), grd = this.createLinearGradient(start.x, start.y, end.x, end.y);
    if (colorStops) {
      for (let n2 = 0; n2 < colorStops.length; n2 += 2) {
        grd.addColorStop(colorStops[n2], colorStops[n2 + 1]);
      }
      this.setAttr("strokeStyle", grd);
    }
  }
  _applyStrokeStyle(shape) {
    if (shape.strokeLinearGradientColorStops()) {
      this._strokeLinearGradient(shape);
    } else {
      this.setAttr("strokeStyle", shape.stroke());
    }
  }
  _stroke(shape) {
    const dash = shape.dash(), strokeScaleEnabled = shape.getStrokeScaleEnabled();
    if (!strokeScaleEnabled) {
      this.save();
    }
    this._applyLineCap(shape);
    if (dash && shape.dashEnabled()) {
      this.setLineDash(dash);
      this.setAttr("lineDashOffset", shape.dashOffset());
    }
    this.setAttr("lineWidth", shape.strokeWidth());
    const shadowColor = this.shadowColor;
    const shadowForStrokeEnabled = shape.getShadowForStrokeEnabled();
    if (!shadowForStrokeEnabled) {
      this.setAttr("shadowColor", "rgba(0,0,0,0)");
    }
    this._applyStrokeStyle(shape);
    if (!strokeScaleEnabled) {
      const pixelRatio = this.getCanvas().getPixelRatio();
      this.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }
    try {
      shape._strokeFunc(this);
    } finally {
      if (!shadowForStrokeEnabled) {
        this.setAttr("shadowColor", shadowColor);
      }
      if (!strokeScaleEnabled) {
        this.restore();
      }
    }
  }
  _applyShadow(shape) {
    var _a2;
    const color = (_a2 = shape.getShadowRGBA()) !== null && _a2 !== void 0 ? _a2 : "black", blur = shape.getShadowBlur(), offset = shape.getShadowOffset(), scale = shape.getAbsoluteScale(), ratio = this.canvas.getPixelRatio(), scaleX = scale.x * ratio, scaleY = scale.y * ratio;
    this.setAttr("shadowColor", color);
    this.setAttr("shadowBlur", blur * Math.min(Math.abs(scaleX), Math.abs(scaleY)));
    this.setAttr("shadowOffsetX", offset.x * scaleX);
    this.setAttr("shadowOffsetY", offset.y * scaleY);
  }
};
var HitContext = class extends Context {
  constructor(canvas2) {
    super(canvas2);
    this._context = canvas2._canvas.getContext("2d", {
      willReadFrequently: true
    });
  }
  _fill(shape) {
    this.save();
    this.setAttr("fillStyle", shape.colorKey);
    shape._fillFuncHit(this);
    this.restore();
  }
  strokeShape(shape) {
    if (shape.hasHitStroke()) {
      this._stroke(shape);
    }
  }
  _stroke(shape) {
    const strokeScaleEnabled = shape.getStrokeScaleEnabled();
    if (!strokeScaleEnabled) {
      this.save();
      const pixelRatio = this.getCanvas().getPixelRatio();
      this.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }
    this._applyLineCap(shape);
    const hitStrokeWidth = shape.hitStrokeWidth();
    const strokeWidth = hitStrokeWidth === "auto" ? shape.strokeWidth() : hitStrokeWidth;
    this.setAttr("lineWidth", strokeWidth);
    this.setAttr("strokeStyle", shape.colorKey);
    shape._strokeFuncHit(this);
    if (!strokeScaleEnabled) {
      this.restore();
    }
  }
};

// node_modules/konva/lib/Canvas.js
var Canvas = class {
  constructor(config) {
    this.pixelRatio = 1;
    this.width = 0;
    this.height = 0;
    this._logicalWidth = 0;
    this._logicalHeight = 0;
    this.isCache = false;
    const conf = config || {};
    const pixelRatio = conf.pixelRatio || Konva.pixelRatio || Konva._global.devicePixelRatio || 1;
    this.pixelRatio = pixelRatio;
    this._canvas = Util.createCanvasElement();
    this._canvas.style.padding = "0";
    this._canvas.style.margin = "0";
    this._canvas.style.border = "0";
    this._canvas.style.background = "transparent";
    this._canvas.style.position = "absolute";
    this._canvas.style.top = "0";
    this._canvas.style.left = "0";
  }
  /**
   * get canvas context
   * @method
   * @name Konva.Canvas#getContext
   * @returns {CanvasContext} context
   */
  getContext() {
    return this.context;
  }
  /**
   * get pixel ratio
   * @method
   * @name Konva.Canvas#getPixelRatio
   * @returns {Number} pixel ratio
   * @example
   * var pixelRatio = layer.getCanvas().getPixelRatio();
   */
  getPixelRatio() {
    return this.pixelRatio;
  }
  /**
   * set pixel ratio
   * KonvaJS automatically handles pixel ratio adustments in order to render crisp drawings
   *  on all devices. Most desktops, low end tablets, and low end phones, have device pixel ratios
   *  of 1.  Some high end tablets and phones, like iPhones and iPads have a device pixel ratio
   *  of 2.  Some Macbook Pros, and iMacs also have a device pixel ratio of 2.  Some high end Android devices have pixel
   *  ratios of 2 or 3.  Some browsers like Firefox allow you to configure the pixel ratio of the viewport.  Unless otherwise
   *  specificed, the pixel ratio will be defaulted to the actual device pixel ratio.  You can override the device pixel
   *  ratio for special situations, or, if you don't want the pixel ratio to be taken into account, you can set it to 1.
   * @method
   * @name Konva.Canvas#setPixelRatio
   * @param {Number} pixelRatio
   * @example
   * layer.getCanvas().setPixelRatio(3);
   */
  setPixelRatio(pixelRatio) {
    this.pixelRatio = pixelRatio;
    this.setSize(this._logicalWidth, this._logicalHeight);
  }
  setWidth(width) {
    this.setSize(width, this._logicalHeight);
  }
  setHeight(height) {
    this.setSize(this._logicalWidth, height);
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  // the bitmap holds whole pixels: a fractional pixel ratio truncates, and
  // a size that does not match the bitmap would resample every draw of it
  _bitmapSize(size) {
    return Math.floor((size || 0) * this.pixelRatio);
  }
  setSize(width, height) {
    if (!isFinite(width !== null && width !== void 0 ? width : 0) || !isFinite(height !== null && height !== void 0 ? height : 0)) {
      Util.error(`Canvas size must be finite numbers, got ${width}x${height}. The canvas is left empty.`);
      width = height = 0;
    }
    width = width || 0;
    height = height || 0;
    const pixelRatio = this.pixelRatio;
    const context = this.getContext()._context;
    const imageSmoothingEnabled = context.imageSmoothingEnabled;
    this._logicalWidth = width;
    this._logicalHeight = height;
    this.width = this._canvas.width = this._bitmapSize(width);
    this.height = this._canvas.height = this._bitmapSize(height);
    this._canvas.style.width = width + "px";
    this._canvas.style.height = height + "px";
    context.scale(pixelRatio, pixelRatio);
    context.imageSmoothingEnabled = imageSmoothingEnabled;
  }
  // setSize() re-allocates and clears the canvas even for the same size,
  // so lazily sized canvases use this to stay untouched when nothing changed
  setSizeIfChanged(width, height) {
    if (this.width !== this._bitmapSize(width) || this.height !== this._bitmapSize(height)) {
      this.setSize(width, height);
    }
  }
  /**
   * to data url
   * @method
   * @name Konva.Canvas#toDataURL
   * @param {String} mimeType
   * @param {Number} quality between 0 and 1 for jpg mime types
   * @returns {String} data url string
   */
  toDataURL(mimeType, quality) {
    try {
      return this._canvas.toDataURL(mimeType, quality);
    } catch (e2) {
      try {
        return this._canvas.toDataURL();
      } catch (err) {
        Util.error("Unable to get data URL. " + err.message + " For more info read https://konvajs.org/docs/posts/Tainted_Canvas.html.");
        throw err;
      }
    }
  }
};
var SceneCanvas = class _SceneCanvas extends Canvas {
  // A cleared surface over `rect` (in the current drawing space), or over the
  // whole canvas, in this canvas's device pixels. Siblings reuse it; nested
  // groups borrow from the surface itself, so they cannot clear a parent's
  // unfinished image.
  _prepareIsolationCanvas(rect) {
    const { a: a3, b: b2, c: c2, d: d2, e: e2, f } = this.getContext()._context.getTransform();
    const view = this._isolationRect || this;
    let x2 = 0, y = 0, width = view.width, height = view.height;
    if (rect) {
      const box = new Transform([a3, b2, c2, d2, e2, f])._getTransformedRect(rect);
      x2 = Math.max(0, Math.floor(box.x) - 1);
      y = Math.max(0, Math.floor(box.y) - 1);
      width = Math.min(width, Math.ceil(box.x + box.width) + 1) - x2;
      height = Math.min(height, Math.ceil(box.y + box.height) + 1) - y;
    }
    if (!(width > 0 && height > 0)) {
      x2 = y = 0;
      width = height = 1;
    }
    const surface = this._isolationCanvas || (this._isolationCanvas = new _SceneCanvas({
      width: 0,
      height: 0,
      pixelRatio: this.pixelRatio
    }));
    if (surface.width < width || surface.height < height) {
      const ratio = this.pixelRatio;
      const grow = (need, have, max) => Math.min(max, Math.ceil((have < need ? Math.max(need, have * 1.5) : have) / ratio));
      surface.setSize(grow(width, surface.width, this._logicalWidth), grow(height, surface.height, this._logicalHeight));
    }
    surface._isolationRect = { x: x2, y, width, height };
    const peak = surface._isolationPeak;
    peak.width = Math.max(peak.width, width);
    peak.height = Math.max(peak.height, height);
    const context = surface.getContext();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, width, height);
    context.setTransform(a3, b2, c2, d2, e2 - x2, f - y);
    const parent = this.getContext();
    context.imageSmoothingEnabled = parent.imageSmoothingEnabled;
    context.imageSmoothingQuality = parent.imageSmoothingQuality;
    context.direction = parent.direction;
    return surface;
  }
  // After a frame, free surfaces that ten frames in a row did not use or used
  // a small part of. Content that changes size keeps its surface.
  _trimIsolationCanvas() {
    const surface = this._isolationCanvas;
    if (!surface)
      return;
    const peak = surface._isolationPeak;
    const low = surface.width * surface.height > 4 * peak.width * peak.height;
    surface._isolationLowFrames = low ? surface._isolationLowFrames + 1 : 0;
    if (surface._isolationLowFrames >= 10) {
      this._releaseIsolationCanvas();
    } else {
      peak.width = peak.height = 0;
      surface._trimIsolationCanvas();
    }
  }
  _releaseIsolationCanvas() {
    const surface = this._isolationCanvas;
    if (surface) {
      surface._releaseIsolationCanvas();
      Util.releaseCanvas(surface._canvas);
      this._isolationCanvas = void 0;
    }
  }
  setSize(width, height) {
    this._releaseIsolationCanvas();
    super.setSize(width, height);
  }
  constructor(config = { width: 0, height: 0, willReadFrequently: false }) {
    super(config);
    this._isolationPeak = { width: 0, height: 0 };
    this._isolationLowFrames = 0;
    this.context = new SceneContext(this, {
      willReadFrequently: config.willReadFrequently
    });
    this.setSize(config.width, config.height);
  }
};
var HitCanvas = class extends Canvas {
  constructor(config = { width: 0, height: 0 }) {
    super(config);
    this.hitCanvas = true;
    this.context = new HitContext(this);
    this.context.imageSmoothingEnabled = false;
    this.setSize(config.width, config.height);
  }
};

// node_modules/konva/lib/DragAndDrop.js
var DD = {
  get isDragging() {
    let flag = false;
    DD._dragElements.forEach((elem) => {
      if (elem.dragStatus === "dragging") {
        flag = true;
      }
    });
    return flag;
  },
  get node() {
    let node;
    for (const elem of DD._dragElements.values()) {
      if (elem.dragStatus === "dragging")
        return elem.node;
      node = elem.node;
    }
    return node;
  },
  _dragElements: /* @__PURE__ */ new Map(),
  // Konva is imported into one window, but a stage may be rendered in another
  // one: an iframe, or a window opened with `window.open`. Such a window sends
  // its pointer events to itself, so `Konva.Stage` asks for every window it is
  // rendered in. The handlers get the window they listen to, as only that
  // window has pointer positions the stages of that window can use
  _listenToWindow(win) {
    const endDragBefore = (evt) => DD._endDragBefore(evt, win);
    const drag = (evt) => DD._batchEvents(() => DD._drag(evt, win), win);
    const endDragAfter = (evt) => DD._batchEvents(() => DD._endDragAfter(evt));
    win.addEventListener("mouseup", endDragBefore, true);
    win.addEventListener("touchend", endDragBefore, true);
    win.addEventListener("touchcancel", endDragBefore, true);
    win.addEventListener("mousemove", drag);
    win.addEventListener("touchmove", drag);
    win.addEventListener("mouseup", endDragAfter, false);
    win.addEventListener("touchend", endDragAfter, false);
    win.addEventListener("touchcancel", endDragAfter, false);
  },
  _batchEvents(callback, win) {
    if (!DD._dragElements.size)
      return;
    const batches = /* @__PURE__ */ new Set();
    for (const { node } of DD._dragElements.values()) {
      const stage = node.getStage();
      if (!stage || win && stage._getOwnerWindow() !== win)
        continue;
      const batch = stage.eventBatchFunc();
      if (batch)
        batches.add(batch);
    }
    let run = callback;
    for (const batch of batches) {
      const next = run;
      run = () => Util._batchEvents(batch, next);
    }
    run();
  },
  // methods
  _drag(evt, win) {
    const nodesToFireEvents = [];
    const positioned = /* @__PURE__ */ new Set();
    DD._dragElements.forEach((elem, key) => {
      const { node } = elem;
      const stage = node.getStage();
      if (win && stage._getOwnerWindow() !== win) {
        return;
      }
      if (!positioned.has(stage)) {
        stage.setPointersPositions(evt);
        positioned.add(stage);
      }
      if (elem.pointerEventType && elem.pointerEventType !== stage._pointerEventType) {
        return;
      }
      if (elem.pointerId === void 0) {
        elem.pointerId = Util._getFirstPointerId(evt);
        elem.pointerEventType = stage._pointerEventType;
        if (elem.dragStatus === "dragging") {
          stage._cancelClick(elem.pointerId, elem.pointerEventType);
        }
      }
      const pos = stage._changedPointerPositions.find((pos2) => pos2.id === elem.pointerId);
      if (!pos) {
        return;
      }
      if (elem.dragStatus !== "dragging") {
        const dragDistance = node.dragDistance();
        const distance = Math.max(Math.abs(pos.x - elem.startPointerPos.x), Math.abs(pos.y - elem.startPointerPos.y));
        if (distance < dragDistance) {
          return;
        }
        node.startDrag({ evt });
        if (!node.isDragging()) {
          return;
        }
      }
      node._setDragPosition(evt, elem);
      nodesToFireEvents.push(node);
    });
    nodesToFireEvents.forEach((node) => {
      if (!node.getStage()) {
        return;
      }
      node.fire("dragmove", {
        type: "dragmove",
        target: node,
        evt
      }, true);
    });
  },
  // dragBefore and dragAfter allows us to set correct order of events
  // setup all in dragbefore, and stop dragging only after pointerup triggered.
  _endDragBefore(evt, win, only) {
    const drawNodes = [];
    const positioned = /* @__PURE__ */ new Set();
    DD._dragElements.forEach((elem, key) => {
      const { node } = elem;
      if (only && elem !== only && elem.pointerId !== only.pointerId) {
        return;
      }
      const stage = node.getStage();
      if (evt && !positioned.has(stage) && (!win || stage._getOwnerWindow() === win)) {
        stage.setPointersPositions(evt);
        positioned.add(stage);
      }
      if (!only) {
        if (evt && elem.pointerEventType && elem.pointerEventType !== Util._getEventType(evt.type)) {
          return;
        }
        const released = elem.pointerId === void 0 || stage._changedPointerPositions.some((pos) => pos.id === elem.pointerId);
        if (!released) {
          return;
        }
      }
      if (elem.dragStatus === "ready") {
        DD._dragElements.delete(key);
      } else {
        stage._cancelClick(elem.pointerId, elem.pointerEventType);
        elem.dragStatus = "stopped";
        const drawNode = node.getLayer() || stage;
        if (drawNode && drawNodes.indexOf(drawNode) === -1) {
          drawNodes.push(drawNode);
        }
      }
    });
    drawNodes.forEach((drawNode) => {
      drawNode.draw();
    });
  },
  _endDragAfter(evt, only) {
    DD._dragElements.forEach((elem, key) => {
      if (elem.dragStatus !== "stopped" || only && elem !== only && elem.pointerId !== only.pointerId) {
        return;
      }
      elem.node.fire("dragend", {
        type: "dragend",
        target: elem.node,
        evt
      }, true);
      if (elem.dragStatus !== "dragging") {
        DD._dragElements.delete(key);
      }
    });
  }
};

// node_modules/konva/lib/PointerEvents.js
var Captures = /* @__PURE__ */ new Map();
var SUPPORT_POINTER_EVENTS = Konva._global["PointerEvent"] !== void 0;
function getCapturedShape(pointerId, stage) {
  const capture = Captures.get(pointerId);
  return capture && (!stage || capture.stage === stage) ? capture.shape : void 0;
}
function fireCapture(shape, type, pointerId) {
  shape._fire(type, { evt: new PointerEvent(type, { pointerId }), pointerId });
}
function hasPointerCapture(pointerId, shape) {
  var _a2;
  return ((_a2 = Captures.get(pointerId)) === null || _a2 === void 0 ? void 0 : _a2.shape) === shape;
}
function setPointerCapture(pointerId, shape) {
  var _a2;
  releaseCapture(pointerId);
  const stage = shape.getStage();
  if (!stage)
    return;
  Captures.set(pointerId, { shape, stage });
  if (SUPPORT_POINTER_EVENTS) {
    try {
      (_a2 = stage.content) === null || _a2 === void 0 ? void 0 : _a2.setPointerCapture(pointerId);
    } catch (e2) {
    }
    fireCapture(shape, "gotpointercapture", pointerId);
  }
}
function releaseCapturesOf(node) {
  Captures.forEach(({ shape, stage }, pointerId) => {
    if (shape === node || stage === node) {
      releaseCapture(pointerId);
    }
  });
}
function releaseCapture(pointerId, target) {
  var _a2;
  const capture = Captures.get(pointerId);
  if (!capture || target && capture.shape !== target)
    return;
  const { shape, stage } = capture;
  Captures.delete(pointerId);
  if (SUPPORT_POINTER_EVENTS) {
    try {
      (_a2 = stage.content) === null || _a2 === void 0 ? void 0 : _a2.releasePointerCapture(pointerId);
    } catch (e2) {
    }
    fireCapture(shape, "lostpointercapture", pointerId);
  }
}

// node_modules/konva/lib/Validators.js
function _formatValue(val) {
  if (Util._isString(val)) {
    return '"' + val + '"';
  }
  if (Object.prototype.toString.call(val) === "[object Number]") {
    return val;
  }
  if (Util._isBoolean(val)) {
    return val;
  }
  return Object.prototype.toString.call(val);
}
function RGBComponent(val) {
  if (val > 255) {
    return 255;
  } else if (val < 0) {
    return 0;
  }
  return Math.round(val);
}
function getNumberValidator() {
  if (Konva.isUnminified) {
    return function(val, attr) {
      if (!Util._isNumber(val)) {
        Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a number.');
      }
      return val;
    };
  }
}
function getNumberOrArrayOfNumbersValidator(noOfElements) {
  if (Konva.isUnminified) {
    return function(val, attr) {
      let isNumber = Util._isNumber(val);
      let isValidArray = Util._isArray(val) && val.length == noOfElements;
      if (!isNumber && !isValidArray) {
        Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a number or Array<number>(' + noOfElements + ")");
      }
      return val;
    };
  }
}
function getNumberOrAutoValidator() {
  if (Konva.isUnminified) {
    return function(val, attr) {
      const isNumber = Util._isNumber(val);
      const isAuto = val === "auto";
      if (!(isNumber || isAuto)) {
        Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a number or "auto".');
      }
      return val;
    };
  }
}
function getStringValidator() {
  if (Konva.isUnminified) {
    return function(val, attr) {
      if (!Util._isString(val)) {
        Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a string.');
      }
      return val;
    };
  }
}
function getStringOrGradientValidator() {
  if (Konva.isUnminified) {
    return function(val, attr) {
      const isString = Util._isString(val);
      const isGradient = Object.prototype.toString.call(val) === "[object CanvasGradient]" || val && val["addColorStop"];
      if (!(isString || isGradient)) {
        Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a string or a native gradient.');
      }
      return val;
    };
  }
}
function getNumberArrayValidator() {
  if (Konva.isUnminified) {
    return function(val, attr) {
      if (val instanceof TypedArray) {
        return val;
      }
      if (!Util._isArray(val)) {
        Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a array of numbers.');
      } else {
        val.forEach(function(item) {
          if (!Util._isNumber(item)) {
            Util.warn('"' + attr + '" attribute has non numeric element ' + item + ". Make sure that all elements are numbers.");
          }
        });
      }
      return val;
    };
  }
}
function getBooleanValidator() {
  if (Konva.isUnminified) {
    return function(val, attr) {
      const isBool = val === true || val === false;
      if (!isBool) {
        Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a boolean.');
      }
      return val;
    };
  }
}
function getComponentValidator(components) {
  if (Konva.isUnminified) {
    return function(val, attr) {
      if (val === void 0 || val === null) {
        return val;
      }
      if (!Util.isObject(val)) {
        Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be an object with properties ' + components);
      }
      return val;
    };
  }
}

// node_modules/konva/lib/Factory.js
var GET = "get";
var SET = "set";
var Factory = {
  addGetterSetter(constructor, attr, def, validator, after) {
    Factory.addGetter(constructor, attr, def);
    Factory.addSetter(constructor, attr, validator, after);
    Factory.addOverloadedGetterSetter(constructor, attr);
  },
  addGetter(constructor, attr, def) {
    const method = GET + Util._capitalize(attr);
    const isArr = Array.isArray(def);
    const getter = function() {
      const val = this.attrs[attr];
      return val === void 0 ? isArr ? def.slice() : def : val;
    };
    getter._def = def;
    constructor.prototype[method] = constructor.prototype[method] || getter;
  },
  addSetter(constructor, attr, validator, after) {
    const method = SET + Util._capitalize(attr);
    if (!constructor.prototype[method]) {
      Factory.overWriteSetter(constructor, attr, validator, after);
    }
  },
  overWriteSetter(constructor, attr, validator, after) {
    const method = SET + Util._capitalize(attr);
    constructor.prototype[method] = function(val) {
      if (validator && val !== void 0 && val !== null) {
        val = validator.call(this, val, attr);
      }
      this._setAttr(attr, val);
      if (after) {
        after.call(this);
      }
      return this;
    };
  },
  addComponentsGetterSetter(constructor, attr, components, validator, after) {
    const len = components.length, capitalize = Util._capitalize, getter = GET + capitalize(attr), setter = SET + capitalize(attr), keys = components.map((c2) => attr + capitalize(c2)), getters = keys.map((key) => GET + capitalize(key));
    constructor.prototype[getter] = function() {
      const ret = {};
      for (let n2 = 0; n2 < len; n2++) {
        const get = this[getters[n2]];
        ret[components[n2]] = get ? get.call(this) : this.attrs[keys[n2]];
      }
      return ret;
    };
    const basicValidator = getComponentValidator(components);
    constructor.prototype[setter] = function(val) {
      const oldVal = this[getter]();
      if (validator) {
        val = validator.call(this, val, attr);
      }
      if (basicValidator) {
        basicValidator.call(this, val, attr);
      }
      for (const key in val) {
        if (!val.hasOwnProperty(key)) {
          continue;
        }
        this._setAttr(attr + capitalize(key), val[key]);
      }
      if (!val) {
        components.forEach((component) => {
          this._setAttr(attr + capitalize(component), void 0);
        });
      }
      this._fireChangeEvent(attr, oldVal, val);
      if (after) {
        after.call(this);
      }
      return this;
    };
    Factory.addOverloadedGetterSetter(constructor, attr);
  },
  addOverloadedGetterSetter(constructor, attr) {
    const capitalizedAttr = Util._capitalize(attr), setter = SET + capitalizedAttr, getter = GET + capitalizedAttr;
    const accessor = function() {
      if (arguments.length) {
        this[setter](arguments[0]);
        return this;
      }
      return this[getter]();
    };
    constructor.prototype[attr] = accessor;
  },
  backCompat(constructor, methods) {
    Util.each(methods, function(oldMethodName, newMethodName) {
      const method = constructor.prototype[newMethodName];
      const oldGetter = GET + Util._capitalize(oldMethodName);
      const oldSetter = SET + Util._capitalize(oldMethodName);
      function deprecated() {
        Util.error('"' + oldMethodName + '" method is deprecated and will be removed soon. Use ""' + newMethodName + '" instead.');
        return method.apply(this, arguments);
      }
      constructor.prototype[oldMethodName] = deprecated;
      constructor.prototype[oldGetter] = deprecated;
      constructor.prototype[oldSetter] = deprecated;
    });
  },
  afterSetFilter() {
    this._filterUpToDate = false;
  }
};

// node_modules/konva/lib/Node.js
function parseCSSFilters(cssFilter) {
  const steps = [];
  const filterRegex = /(\w+)\(([^)]*)\)/g;
  let match;
  while ((match = filterRegex.exec(cssFilter)) !== null) {
    const [, name, argument] = match;
    if (![
      "blur",
      "brightness",
      "contrast",
      "grayscale",
      "sepia",
      "invert"
    ].includes(name)) {
      Util.warn(`CSS filter "${name}" is not supported in fallback mode. Consider using function filters for better compatibility.`);
      continue;
    }
    const value = argument.trim() === "" ? name === "blur" ? 0 : 1 : parseFloat(argument) / (argument.includes("%") ? 100 : 1);
    steps.push({ name, value });
  }
  return function(imageData, pixelRatio = 1) {
    var _a2;
    for (const { name, value } of steps) {
      if (["grayscale", "sepia", "invert"].includes(name)) {
        const amount = Math.min(1, Math.max(0, value));
        const data = imageData.data;
        for (let i2 = 0; i2 < data.length; i2 += 4) {
          const r2 = data[i2], g2 = data[i2 + 1], b2 = data[i2 + 2];
          let red, green, blue;
          if (name === "grayscale") {
            red = green = blue = 0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2;
          } else if (name === "sepia") {
            red = 0.393 * r2 + 0.769 * g2 + 0.189 * b2;
            green = 0.349 * r2 + 0.686 * g2 + 0.168 * b2;
            blue = 0.272 * r2 + 0.534 * g2 + 0.131 * b2;
          } else {
            red = 255 - r2;
            green = 255 - g2;
            blue = 255 - b2;
          }
          data[i2] = r2 + (red - r2) * amount;
          data[i2 + 1] = g2 + (green - g2) * amount;
          data[i2 + 2] = b2 + (blue - b2) * amount;
        }
        continue;
      }
      const filter = (_a2 = Konva.Filters) === null || _a2 === void 0 ? void 0 : _a2[Util._capitalize(name)];
      if (!filter)
        continue;
      const context = Object.create(this);
      context.attrs = { ...this.attrs };
      if (name === "blur")
        context.attrs.blurRadius = value * 0.5;
      if (name === "brightness")
        context.attrs.brightness = value;
      if (name === "contrast")
        context.attrs.contrast = 100 * (Math.sqrt(value) - 1);
      filter.call(context, imageData, pixelRatio);
    }
  };
}
var ABSOLUTE_OPACITY = "absoluteOpacity";
var ABSOLUTE_TRANSFORM = "absoluteTransform";
var CHANGE = "Change";
var CHILDREN = "children";
var KONVA = "konva";
var LISTENING = "listening";
var MOUSEENTER = "mouseenter";
var MOUSELEAVE = "mouseleave";
var POINTERENTER = "pointerenter";
var POINTERLEAVE = "pointerleave";
var TOUCHENTER = "touchenter";
var TOUCHLEAVE = "touchleave";
var NON_BUBBLING_EVENTS = [
  MOUSEENTER,
  MOUSELEAVE,
  POINTERENTER,
  POINTERLEAVE,
  TOUCHENTER,
  TOUCHLEAVE
];
var SET2 = "set";
var SHAPE = "Shape";
var SPACE = " ";
var STAGE = "stage";
var TRANSFORM = "transform";
var UPPER_STAGE = "Stage";
var VISIBLE = "visible";
var TRANSFORM_CHANGE_STR = [
  "xChange.konva",
  "yChange.konva",
  "scaleXChange.konva",
  "scaleYChange.konva",
  "skewXChange.konva",
  "skewYChange.konva",
  "rotationChange.konva",
  "offsetXChange.konva",
  "offsetYChange.konva",
  "transformsEnabledChange.konva"
].join(SPACE);
var idCounter = 1;
var Node = class _Node {
  constructor(config) {
    this._id = idCounter++;
    this.eventListeners = {};
    this.attrs = {};
    this.index = 0;
    this.parent = null;
    this._cache = {};
    this._canvasCache = null;
    this._batchingTransformChange = false;
    this._needClearTransformCache = false;
    this._filterUpToDate = false;
    this._isUnderCache = false;
    this._dragEventId = null;
    this._shouldFireChangeEvents = false;
    this.setAttrs(config);
    this._shouldFireChangeEvents = true;
  }
  hasChildren() {
    return false;
  }
  _clearCache(attr) {
    if ((attr === TRANSFORM || attr === ABSOLUTE_TRANSFORM) && this._cache[attr]) {
      this._cache[attr].dirty = true;
    } else if (attr) {
      this._cache[attr] = void 0;
    } else {
      this._cache = {};
      if (this._attrsVersion !== void 0)
        this._attrsVersion++;
    }
  }
  // drop the cached canvases and give their memory back
  _releaseCanvasCache() {
    const cache2 = this._canvasCache;
    if (cache2) {
      Util.releaseCanvas(cache2.scene._canvas, cache2.filter._canvas, ...cache2.hit ? [cache2.hit._canvas] : []);
      this._canvasCache = null;
    }
  }
  _getCache(attr, privateGetter) {
    let cache2 = this._cache[attr];
    const isTransform = attr === TRANSFORM || attr === ABSOLUTE_TRANSFORM;
    const invalid = cache2 === void 0 || isTransform && cache2.dirty === true;
    if (invalid) {
      cache2 = privateGetter.call(this);
      this._cache[attr] = cache2;
    }
    return cache2;
  }
  _getCanvasCache() {
    return this._canvasCache;
  }
  /*
   * when the logic for a cached result depends on ancestor propagation, use this
   * method to clear self and children cache
   */
  _clearSelfAndDescendantCache(attr) {
    this._clearCache(attr);
    if (attr === void 0 || attr === ABSOLUTE_TRANSFORM) {
      this.fire("absoluteTransformChange");
    }
  }
  static _runAfterAbsTransformCascade(cb) {
    if (_Node._absTransformCascadeDepth > 0) {
      _Node._pendingAfterCascade.push(cb);
    } else {
      cb();
    }
  }
  /**
   * clear cached canvas
   * @method
   * @name Konva.Node#clearCache
   * @returns {Konva.Node}
   * @example
   * node.clearCache();
   */
  clearCache() {
    this._releaseCanvasCache();
    this._clearSelfAndDescendantCache();
    this._requestDraw();
    return this;
  }
  /**
   *  cache node to improve drawing performance, apply filters, or create more accurate
   *  hit regions. For all basic shapes size of cache canvas will be automatically detected.
   *  If you need to cache your custom `Konva.Shape` instance you have to pass shape's bounding box
   *  properties. Look at [https://konvajs.org/docs/performance/Shape_Caching.html](https://konvajs.org/docs/performance/Shape_Caching.html) for more information.
   * @method
   * @name Konva.Node#cache
   * @param {Object} [config]
   * @param {Number} [config.x]
   * @param {Number} [config.y]
   * @param {Number} [config.width]
   * @param {Number} [config.height]
   * @param {Number} [config.offset]  increase canvas size by `offset` pixel in all directions.
   * @param {Boolean} [config.drawBorder] when set to true, a red border will be drawn around the cached
   *  region for debugging purposes
   * @param {Number} [config.pixelRatio] pixel ratio of the cache canvas, the canvas pixels per CSS pixel of the node. Default is `Konva.pixelRatio`, the device pixel ratio. A higher value keeps the cache sharp when the node is scaled up.
   * @param {Boolean} [config.imageSmoothingEnabled] control imageSmoothingEnabled property of created canvas for cache
   * @param {Number} [config.hitCanvasPixelRatio] change quality (or pixel ratio) of cached hit canvas.
   * @returns {Konva.Node}
   * @example
   * // cache a shape with the x,y position of the bounding box at the center and
   * // the width and height of the bounding box equal to the width and height of
   * // the shape obtained from shape.width() and shape.height()
   * image.cache();
   *
   * // cache a node and define the bounding box position and size
   * node.cache({
   *   x: -30,
   *   y: -30,
   *   width: 100,
   *   height: 200
   * });
   *
   * // cache a node and draw a red border around the bounding box
   * // for debugging purposes
   * node.cache({
   *   x: -30,
   *   y: -30,
   *   width: 100,
   *   height: 200,
   *   offset : 10,
   *   drawBorder: true
   * });
   */
  cache(config) {
    const conf = config || {};
    let rect = {};
    if (conf.x === void 0 || conf.y === void 0 || conf.width === void 0 || conf.height === void 0) {
      const wasUnderCache = this._isUnderCache;
      this._isUnderCache = true;
      rect = this.getClientRect({
        skipTransform: true,
        relativeTo: this.getParent() || void 0
      });
      this._isUnderCache = wasUnderCache;
    }
    let x2 = conf.x === void 0 ? Math.floor(rect.x) : conf.x, y = conf.y === void 0 ? Math.floor(rect.y) : conf.y, width = Math.ceil(conf.width || rect.x + rect.width - x2), height = Math.ceil(conf.height || rect.y + rect.height - y), pixelRatio = conf.pixelRatio, offset = conf.offset || 0, drawBorder = conf.drawBorder || false, hitCanvasPixelRatio = conf.hitCanvasPixelRatio || 1;
    if (width <= 0 || height <= 0 || !isFinite(x2 + y + width + height)) {
      Util.error(`Can not cache the node. Its size is 0 or its bounds are not finite numbers (${x2}, ${y}, ${width}x${height}). Caching is skipped.`);
      return this;
    }
    width += offset * 2;
    height += offset * 2;
    x2 -= offset;
    y -= offset;
    const cachedSceneCanvas = new SceneCanvas({
      pixelRatio,
      width,
      height
    }), cachedFilterCanvas = new SceneCanvas({
      pixelRatio,
      width: 0,
      height: 0,
      willReadFrequently: true
    }), sceneContext = cachedSceneCanvas.getContext();
    cachedSceneCanvas.isCache = true;
    this._releaseCanvasCache();
    this._filterUpToDate = false;
    if (conf.imageSmoothingEnabled === false) {
      cachedSceneCanvas.getContext()._context.imageSmoothingEnabled = false;
      cachedFilterCanvas.getContext()._context.imageSmoothingEnabled = false;
    }
    sceneContext.save();
    sceneContext.translate(-x2, -y);
    this._isUnderCache = true;
    this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
    try {
      this.drawScene(cachedSceneCanvas, this);
    } catch (e2) {
      Util.releaseCanvas(cachedSceneCanvas._canvas);
      throw e2;
    } finally {
      this._isUnderCache = false;
      this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
      sceneContext.restore();
      cachedSceneCanvas._releaseIsolationCanvas();
    }
    if (drawBorder) {
      sceneContext.save();
      sceneContext.beginPath();
      sceneContext.rect(0, 0, width, height);
      sceneContext.closePath();
      sceneContext.setAttr("strokeStyle", "red");
      sceneContext.setAttr("lineWidth", 5);
      sceneContext.stroke();
      sceneContext.restore();
    }
    this._canvasCache = {
      scene: cachedSceneCanvas,
      filter: cachedFilterCanvas,
      // the hit canvas is built on demand (see _getCachedHitCanvas)
      hit: null,
      hitConfig: {
        pixelRatio: hitCanvasPixelRatio,
        width,
        height
      },
      x: x2,
      y
    };
    this._clearSelfAndDescendantCache();
    this._requestDraw();
    return this;
  }
  // build the hit canvas of a cached node lazily - only when the hit graph
  // is actually needed, so a non-listening node never allocates it
  // https://github.com/konvajs/konva/issues/2009
  _getCachedHitCanvas(top) {
    if (top === this) {
      return null;
    }
    const cache2 = this._getCanvasCache();
    if (!cache2) {
      return null;
    }
    if (cache2.hit) {
      return cache2.hit;
    }
    const hitCanvas = new HitCanvas(cache2.hitConfig);
    hitCanvas.isCache = true;
    const hitContext = hitCanvas.getContext();
    hitContext.save();
    hitContext.translate(-cache2.x, -cache2.y);
    this.drawHit(hitCanvas, this);
    hitContext.restore();
    cache2.hit = hitCanvas;
    return hitCanvas;
  }
  /**
   * determine if node is currently cached
   * @method
   * @name Konva.Node#isCached
   * @returns {Boolean}
   */
  isCached() {
    return !!this._canvasCache;
  }
  /**
   * Return client rectangle {x, y, width, height} of node. This rectangle also include all styling (strokes, shadows, etc).
   * The purpose of the method is similar to getBoundingClientRect API of the DOM.
   * Non-scaling stroke padding is converted from its drawing canvas to the requested coordinates.
   * Cached strokes use the cache's coordinates; their pixels scale with the cached bitmap.
   * @method
   * @name Konva.Node#getClientRect
   * @param {Object} config
   * @param {Boolean} [config.skipTransform] should we apply transform to node for calculating rect?
   * @param {Boolean} [config.skipShadow] should we apply shadow to the node for calculating bound box?
   * @param {Boolean} [config.skipStroke] should we apply stroke to the node for calculating bound box?
   * @param {Object} [config.relativeTo] calculate client rect relative to one of the parents
   * @returns {Object} rect with {x, y, width, height} properties
   * @example
   * var rect = new Konva.Rect({
   *      width : 100,
   *      height : 100,
   *      x : 50,
   *      y : 50,
   *      strokeWidth : 4,
   *      stroke : 'black',
   *      offsetX : 50,
   *      scaleY : 2
   * });
   *
   * // get client rect without think off transformations (position, rotation, scale, offset, etc)
   * rect.getClientRect({ skipTransform: true});
   * // returns {
   * //     x : -2,   // two pixels for stroke / 2
   * //     y : -2,
   * //     width : 104, // increased by 4 for stroke
   * //     height : 104
   * //}
   *
   * // get client rect with transformation applied
   * rect.getClientRect();
   * // returns Object {x: -2, y: 46, width: 104, height: 208}
   */
  getClientRect(config) {
    throw new Error('abstract "getClientRect" method call');
  }
  _getCachedSceneRect(config) {
    const cache2 = config._forDrawing && !this._isUnderCache && this._getCanvasCache();
    if (!cache2)
      return;
    const rect = {
      x: cache2.x,
      y: cache2.y,
      width: cache2.scene.width / cache2.scene.pixelRatio,
      height: cache2.scene.height / cache2.scene.pixelRatio
    };
    return config.skipTransform ? rect : this._transformedRect(rect, config.relativeTo);
  }
  _transformedRect(rect, top) {
    return this.getAbsoluteTransform(top)._getTransformedRect(rect);
  }
  _drawCachedSceneCanvas(context) {
    context.save();
    context._applyOpacity(this);
    context._applyGlobalCompositeOperation(this);
    const canvasCache = this._getCanvasCache();
    context.translate(canvasCache.x, canvasCache.y);
    const cacheCanvas = this._getCachedSceneCanvas();
    const ratio = cacheCanvas.pixelRatio;
    context.drawImage(cacheCanvas._canvas, 0, 0, cacheCanvas.width / ratio, cacheCanvas.height / ratio);
    context.restore();
  }
  _drawCachedHitCanvas(context, hitCanvas) {
    const canvasCache = this._getCanvasCache();
    context.save();
    context.translate(canvasCache.x, canvasCache.y);
    context.drawImage(hitCanvas._canvas, 0, 0, hitCanvas.width / hitCanvas.pixelRatio, hitCanvas.height / hitCanvas.pixelRatio);
    context.restore();
  }
  _getCachedSceneCanvas() {
    let filters = this.filters(), cachedCanvas = this._getCanvasCache(), sceneCanvas = cachedCanvas.scene, filterCanvas = cachedCanvas.filter, filterContext = filterCanvas.getContext(), len, imageData, n2, filter;
    if (!filters || filters.length === 0) {
      return sceneCanvas;
    }
    if (this._filterUpToDate) {
      return filterCanvas;
    }
    let useNativeOnly = true;
    for (let i2 = 0; i2 < filters.length; i2++) {
      if (typeof filters[i2] !== "string" || !isCSSFiltersSupported()) {
        useNativeOnly = false;
        break;
      }
    }
    const ratio = sceneCanvas.pixelRatio;
    filterCanvas.setSizeIfChanged(sceneCanvas._logicalWidth, sceneCanvas._logicalHeight);
    if (useNativeOnly) {
      const finalFilter = filters.join(" ").replace(/url\((?:[^()"']|"[^"]*"|'[^']*')*\)|"[^"]*"|'[^']*'|([-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?)(px|em|rem|ex|ch|cap|ic|lh|rlh|vw|vh|vmin|vmax|cm|mm|q|in|pt|pc)\b/gi, (token, value, unit) => value === void 0 ? token : `${Number(value) * ratio}${unit}`);
      filterContext.clear();
      filterContext.save();
      filterContext.setAttr("filter", finalFilter);
      filterContext.drawImage(sceneCanvas._canvas, 0, 0, sceneCanvas.getWidth() / ratio, sceneCanvas.getHeight() / ratio);
      filterContext.restore();
      this._filterUpToDate = true;
      return filterCanvas;
    }
    try {
      len = filters.length;
      filterContext.clear();
      filterContext.drawImage(sceneCanvas._canvas, 0, 0, sceneCanvas.getWidth() / ratio, sceneCanvas.getHeight() / ratio);
      imageData = filterContext.getImageData(0, 0, filterCanvas.getWidth(), filterCanvas.getHeight());
      for (n2 = 0; n2 < len; n2++) {
        filter = filters[n2];
        if (typeof filter === "string") {
          filter = parseCSSFilters(filter);
        }
        filter.call(this, imageData, ratio);
      }
      filterContext.putImageData(imageData, 0, 0);
    } catch (e2) {
      Util.error("Unable to apply filter. " + e2.message + " This post my help you https://konvajs.org/docs/posts/Tainted_Canvas.html.");
    }
    this._filterUpToDate = true;
    return filterCanvas;
  }
  /**
   * bind events to the node. KonvaJS supports mouseover, mousemove,
   *  mouseout, mouseenter, mouseleave, mousedown, mouseup, wheel, contextmenu, click, dblclick, touchstart, touchmove,
   *  touchend, tap, dbltap, dragstart, dragmove, dragend and destroy events.
   *  Pass in a string of events delimited by a space to bind multiple events at once
   *  such as 'mousedown mouseup mousemove'. Include a namespace to bind an
   *  event by name such as 'click.foobar'.
   * @method
   * @name Konva.Node#on
   * @param {String} evtStr e.g. 'click', 'mousedown touchstart', 'mousedown.foo touchstart.foo'
   * @param {Function} handler The handler function. The first argument of that function is event object. Event object has `target` as main target of the event, `currentTarget` as current node listener and `evt` as native browser event.
   * @returns {Konva.Node}
   * @example
   * // add click listener
   * node.on('click', function() {
   *   console.log('you clicked me!');
   * });
   *
   * // get the target node
   * node.on('click', function(evt) {
   *   console.log(evt.target);
   * });
   *
   * // stop event propagation
   * node.on('click', function(evt) {
   *   evt.cancelBubble = true;
   * });
   *
   * // bind multiple listeners
   * node.on('click touchstart', function() {
   *   console.log('you clicked/touched me!');
   * });
   *
   * // namespace listener
   * node.on('click.foo', function() {
   *   console.log('you clicked/touched me!');
   * });
   *
   * // get the event type
   * node.on('click tap', function(evt) {
   *   var eventType = evt.type;
   * });
   *
   * // get native event object
   * node.on('click tap', function(evt) {
   *   var nativeEvent = evt.evt;
   * });
   *
   * // for change events, get the old and new val
   * node.on('xChange', function(evt) {
   *   var oldVal = evt.oldVal;
   *   var newVal = evt.newVal;
   * });
   *
   * // get event targets
   * // with event delegations
   * layer.on('click', 'Group', function(evt) {
   *   var shape = evt.target;
   *   var group = evt.currentTarget;
   * });
   */
  on(...args) {
    this._prepareListeners();
    const evtStr = args[0];
    const selectorOrHandler = args[1];
    const handler = args[2];
    if (args.length === 3) {
      return this._delegate.apply(this, args);
    }
    const events = evtStr.split(SPACE);
    for (let n2 = 0; n2 < events.length; n2++) {
      const event = events[n2];
      const parts = event.split(".");
      const baseEvent = parts[0];
      const name = parts[1] || "";
      if (!this.eventListeners[baseEvent]) {
        this.eventListeners[baseEvent] = [];
      }
      this.eventListeners[baseEvent].push({ name, handler: selectorOrHandler });
    }
    return this;
  }
  /**
   * remove event bindings from the node. Pass in a string of
   *  event types delimmited by a space to remove multiple event
   *  bindings at once such as 'mousedown mouseup mousemove'.
   *  include a namespace to remove an event binding by name
   *  such as 'click.foobar'. If you only give a name like '.foobar',
   *  all events in that namespace will be removed.
   * @method
   * @name Konva.Node#off
   * @param {String} evtStr e.g. 'click', 'mousedown touchstart', '.foobar'
   * @returns {Konva.Node}
   * @example
   * // remove listener
   * node.off('click');
   *
   * // remove multiple listeners
   * node.off('click touchstart');
   *
   * // remove listener by name
   * node.off('click.foo');
   */
  // listeners added to a prototype go into its own map, not the parent's,
  // and the lists flattened from the prototype chain so far are stale
  _prepareListeners() {
    if (this === this.constructor.prototype) {
      if (!this.hasOwnProperty("eventListeners")) {
        this.eventListeners = {};
      }
      _Node.protoListenerMap = /* @__PURE__ */ new WeakMap();
    }
  }
  off(evtStr, callback) {
    this._prepareListeners();
    let events = (evtStr || "").split(SPACE), len = events.length, n2, t2, event, parts, baseEvent, name;
    if (!evtStr) {
      for (t2 in this.eventListeners) {
        this._off(t2);
      }
    }
    for (n2 = 0; n2 < len; n2++) {
      event = events[n2];
      parts = event.split(".");
      baseEvent = parts[0];
      name = parts[1];
      if (baseEvent) {
        if (this.eventListeners[baseEvent]) {
          this._off(baseEvent, name, callback);
        }
      } else {
        for (t2 in this.eventListeners) {
          this._off(t2, name, callback);
        }
      }
    }
    return this;
  }
  // some event aliases for third party integration like HammerJS
  dispatchEvent(evt) {
    const e2 = {
      target: this,
      type: evt.type,
      evt
    };
    this.fire(evt.type, e2);
    return this;
  }
  addEventListener(type, handler) {
    this.on(type, function(evt) {
      handler.call(this, evt.evt);
    });
    return this;
  }
  removeEventListener(type) {
    this.off(type);
    return this;
  }
  // like node.on
  _delegate(event, selector, handler) {
    const stopNode = this;
    this.on(event, function(evt) {
      const targets = evt.target.findAncestors(selector, true, stopNode);
      for (let i2 = 0; i2 < targets.length; i2++) {
        evt = Util.cloneObject(evt);
        evt.currentTarget = targets[i2];
        handler.call(targets[i2], evt);
      }
    });
    return this;
  }
  /**
   * remove a node from parent, but don't destroy. You can reuse the node later.
   * @method
   * @name Konva.Node#remove
   * @returns {Konva.Node}
   * @example
   * node.remove();
   */
  remove() {
    if (this.isDragging()) {
      this.stopDrag();
    }
    DD._dragElements.delete(this._id);
    DD._dragElements.forEach((elem, key) => {
      if (this.isAncestorOf(elem.node)) {
        DD._dragElements.delete(key);
      }
    });
    this._remove();
    return this;
  }
  _clearCaches() {
    this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
    this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
    this._clearSelfAndDescendantCache(STAGE);
    this._clearSelfAndDescendantCache(VISIBLE);
    this._clearSelfAndDescendantCache(LISTENING);
  }
  _remove() {
    const parent = this.getParent();
    if (parent && parent.children) {
      parent.children.splice(this.index, 1);
      parent._setChildrenIndices();
      this.parent = null;
    }
    this._clearCaches();
  }
  /**
   * remove and destroy a node. Kill it and delete forever! You should not reuse node after destroy().
   * If the node is a container (Group, Stage or Layer) it will destroy all children too.
   * The node fires a `destroy` event first, so anything holding a reference to it can let go.
   * When an ancestor is being destroyed the node is already detached from its parent at that point.
   * @method
   * @name Konva.Node#destroy
   * @example
   * node.on('destroy', () => console.log('gone'));
   * node.destroy();
   */
  destroy() {
    this._fire("destroy", { target: this });
    releaseCapturesOf(this);
    this.remove();
    this.clearCache();
    return this;
  }
  /**
   * get attr
   * @method
   * @name Konva.Node#getAttr
   * @param {String} attr
   * @returns {Integer|String|Object|Array}
   * @example
   * var x = node.getAttr('x');
   */
  getAttr(attr) {
    const method = "get" + Util._capitalize(attr);
    if (Util._isFunction(this[method])) {
      return this[method]();
    }
    return this.attrs[attr];
  }
  /**
   * get ancestors
   * @method
   * @name Konva.Node#getAncestors
   * @returns {Array}
   * @example
   * shape.getAncestors().forEach(function(node) {
   *   console.log(node.id());
   * })
   */
  getAncestors() {
    let parent = this.getParent(), ancestors = [];
    while (parent) {
      ancestors.push(parent);
      parent = parent.getParent();
    }
    return ancestors;
  }
  /**
   * get attrs object literal
   * @method
   * @name Konva.Node#getAttrs
   * @returns {Object}
   */
  getAttrs() {
    return this.attrs || {};
  }
  /**
   * set multiple attrs at once using an object literal
   * @method
   * @name Konva.Node#setAttrs
   * @param {Object} config object containing key value pairs
   * @returns {Konva.Node}
   * @example
   * node.setAttrs({
   *   x: 5,
   *   fill: 'red'
   * });
   */
  setAttrs(config) {
    this._batchTransformChanges(() => {
      let key, method;
      if (!config) {
        return this;
      }
      for (key in config) {
        if (key === CHILDREN) {
          continue;
        }
        method = SET2 + Util._capitalize(key);
        if (Util._isFunction(this[method])) {
          this[method](config[key]);
        } else {
          this._setAttr(key, config[key]);
        }
      }
    });
    return this;
  }
  /**
   * determine if node is listening for events by taking into account ancestors.
   *
   * Parent    | Self      | isListening
   * listening | listening |
   * ----------+-----------+------------
   * T         | T         | T
   * T         | F         | F
   * F         | T         | F
   * F         | F         | F
   *
   * @method
   * @name Konva.Node#isListening
   * @returns {Boolean}
   */
  isListening() {
    return this._getCache(LISTENING, this._isListening);
  }
  _isListening(relativeTo) {
    const listening = this.listening();
    if (!listening) {
      return false;
    }
    const parent = this.getParent();
    if (parent && parent !== relativeTo && this !== relativeTo) {
      return parent._isListening(relativeTo);
    } else {
      return true;
    }
  }
  /**
   * determine if node is visible by taking into account ancestors.
   *
   * Parent    | Self      | isVisible
   * visible   | visible   |
   * ----------+-----------+------------
   * T         | T         | T
   * T         | F         | F
   * F         | T         | F
   * F         | F         | F
   * @method
   * @name Konva.Node#isVisible
   * @returns {Boolean}
   */
  isVisible() {
    return this._getCache(VISIBLE, this._isVisible);
  }
  _isVisible(relativeTo) {
    const visible = this.visible();
    if (!visible) {
      return false;
    }
    const parent = this.getParent();
    if (parent && parent !== relativeTo && this !== relativeTo) {
      return parent._isVisible(relativeTo);
    } else {
      return true;
    }
  }
  shouldDrawHit(top) {
    if (top) {
      return this._isVisible(top) && this._isListening(top);
    }
    return this.isListening() && this.isVisible();
  }
  /**
   * show node. set visible = true
   * @method
   * @name Konva.Node#show
   * @returns {Konva.Node}
   */
  show() {
    this.visible(true);
    return this;
  }
  /**
   * hide node.  Hidden nodes are no longer detectable
   * @method
   * @name Konva.Node#hide
   * @returns {Konva.Node}
   */
  hide() {
    this.visible(false);
    return this;
  }
  getZIndex() {
    return this.index || 0;
  }
  /**
   * get absolute z-index which takes into account sibling
   *  and ancestor indices
   * @method
   * @name Konva.Node#getAbsoluteZIndex
   * @returns {Integer}
   */
  getAbsoluteZIndex() {
    let depth = this.getDepth(), that = this, index = 0, nodes, len, n2, child;
    function addChildren(children) {
      nodes = [];
      len = children.length;
      for (n2 = 0; n2 < len; n2++) {
        child = children[n2];
        index++;
        if (child.nodeType !== SHAPE) {
          nodes = nodes.concat(child.children);
        }
        if (child._id === that._id) {
          n2 = len;
        }
      }
      if (nodes.length > 0 && nodes[0].getDepth() <= depth) {
        addChildren(nodes);
      }
    }
    const stage = this.getStage();
    if (that.nodeType !== UPPER_STAGE && stage) {
      addChildren(stage.children);
    }
    return index;
  }
  /**
   * get node depth in node tree.  Returns an integer.
   *  e.g. Stage depth will always be 0.  Layers will always be 1.  Groups and Shapes will always
   *  be >= 2
   * @method
   * @name Konva.Node#getDepth
   * @returns {Integer}
   * @example
   * var depth = shape.getDepth(); // 2 for a shape right inside of a layer
   */
  getDepth() {
    let depth = 0, parent = this.parent;
    while (parent) {
      depth++;
      parent = parent.parent;
    }
    return depth;
  }
  // sometimes we do several attributes changes
  // like node.position(pos)
  // for performance reasons, lets batch transform reset
  // so it work faster
  _batchTransformChanges(func) {
    if (this._batchingTransformChange) {
      func();
      return;
    }
    this._batchingTransformChange = true;
    try {
      func();
    } finally {
      this._batchingTransformChange = false;
      if (this._needClearTransformCache) {
        this._needClearTransformCache = false;
        this._clearCache(TRANSFORM);
        this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
      }
    }
  }
  setPosition(pos) {
    this._batchTransformChanges(() => {
      this.x(pos.x);
      this.y(pos.y);
    });
    return this;
  }
  getPosition() {
    return {
      x: this.x(),
      y: this.y()
    };
  }
  /**
   * get position of first pointer (like mouse or first touch) relative to local coordinates of current node
   * @method
   * @name Konva.Node#getRelativePointerPosition
   * @returns {Konva.Node}
   * @example
   *
   * // let's think we have a rectangle at position x = 10, y = 10
   * // now we clicked at x = 15, y = 15 of the stage
   * // if you want to know position of the click, related to the rectangle you can use
   * rect.getRelativePointerPosition();
   */
  getRelativePointerPosition() {
    const stage = this.getStage();
    if (!stage) {
      return null;
    }
    const pos = stage.getPointerPosition();
    if (!pos) {
      return null;
    }
    const transform = this.getAbsoluteTransform().copy();
    transform.invert();
    return transform.point(pos);
  }
  /**
   * get absolute position of a node. That function can be used to calculate absolute position, but relative to any ancestor
   * @method
   * @name Konva.Node#getAbsolutePosition
   * @param {Object} [top] optional ancestor node
   * @returns {Konva.Node}
   * @example
   *
   * // returns absolute position relative to top-left corner of canvas
   * node.getAbsolutePosition();
   *
   * // calculate absolute position of node, inside stage
   * // so stage transforms are ignored
   * node.getAbsolutePosition(stage)
   */
  getAbsolutePosition(top) {
    const absoluteMatrix = this.getAbsoluteTransform(top).getMatrix(), absoluteTransform = new Transform(), offset = this.offset();
    absoluteTransform.m = absoluteMatrix.slice();
    absoluteTransform.translate(offset.x, offset.y);
    return absoluteTransform.getTranslation();
  }
  setAbsolutePosition(pos) {
    const { x: x2, y, ...origTrans } = this._clearTransform();
    this.attrs.x = x2;
    this.attrs.y = y;
    this._clearCache(TRANSFORM);
    const it = this._getAbsoluteTransform().copy();
    const invertible = it.isInvertible();
    it.invert();
    it.translate(pos.x, pos.y);
    const { x: dx, y: dy } = it.getTranslation();
    this._setTransform(origTrans);
    if (invertible) {
      this.setPosition({ x: this.attrs.x + dx, y: this.attrs.y + dy });
    } else {
      Util.warn("Cannot set the absolute position: the absolute transform is not invertible (an ancestor has a zero scale).");
    }
    this._clearCache(TRANSFORM);
    this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
    return this;
  }
  _setTransform(trans) {
    let key;
    for (key in trans) {
      this.attrs[key] = trans[key];
    }
  }
  _clearTransform() {
    const trans = {
      x: this.x(),
      y: this.y(),
      rotation: this.rotation(),
      scaleX: this.scaleX(),
      scaleY: this.scaleY(),
      offsetX: this.offsetX(),
      offsetY: this.offsetY(),
      skewX: this.skewX(),
      skewY: this.skewY()
    };
    this.attrs.x = 0;
    this.attrs.y = 0;
    this.attrs.rotation = 0;
    this.attrs.scaleX = 1;
    this.attrs.scaleY = 1;
    this.attrs.offsetX = 0;
    this.attrs.offsetY = 0;
    this.attrs.skewX = 0;
    this.attrs.skewY = 0;
    return trans;
  }
  /**
   * move node by an amount relative to its current position
   * @method
   * @name Konva.Node#move
   * @param {Object} change
   * @param {Number} change.x
   * @param {Number} change.y
   * @returns {Konva.Node}
   * @example
   * // move node in x direction by 1px and y direction by 2px
   * node.move({
   *   x: 1,
   *   y: 2
   * });
   */
  move(change) {
    let changeX = change.x, changeY = change.y, x2 = this.x(), y = this.y();
    if (changeX !== void 0) {
      x2 += changeX;
    }
    if (changeY !== void 0) {
      y += changeY;
    }
    this.setPosition({ x: x2, y });
    return this;
  }
  /**
   * rotate node by an amount in degrees relative to its current rotation
   * @method
   * @name Konva.Node#rotate
   * @param {Number} theta
   * @returns {Konva.Node}
   */
  rotate(theta) {
    this.rotation(this.rotation() + theta);
    return this;
  }
  /**
   * move node to the top of its siblings
   * @method
   * @name Konva.Node#moveToTop
   * @returns {Boolean}
   */
  moveToTop() {
    if (!this.parent) {
      Util.warn("Node has no parent. moveToTop function is ignored.");
      return false;
    }
    const index = this.index, len = this.parent.children.length;
    if (index < len - 1) {
      this.parent.children.splice(index, 1);
      this.parent.children.push(this);
      this.parent._setChildrenIndices();
      return true;
    }
    return false;
  }
  /**
   * move node up
   * @method
   * @name Konva.Node#moveUp
   * @returns {Boolean} flag is moved or not
   */
  moveUp() {
    if (!this.parent) {
      Util.warn("Node has no parent. moveUp function is ignored.");
      return false;
    }
    const index = this.index, len = this.parent.children.length;
    if (index < len - 1) {
      this.parent.children.splice(index, 1);
      this.parent.children.splice(index + 1, 0, this);
      this.parent._setChildrenIndices();
      return true;
    }
    return false;
  }
  /**
   * move node down
   * @method
   * @name Konva.Node#moveDown
   * @returns {Boolean}
   */
  moveDown() {
    if (!this.parent) {
      Util.warn("Node has no parent. moveDown function is ignored.");
      return false;
    }
    const index = this.index;
    if (index > 0) {
      this.parent.children.splice(index, 1);
      this.parent.children.splice(index - 1, 0, this);
      this.parent._setChildrenIndices();
      return true;
    }
    return false;
  }
  /**
   * move node to the bottom of its siblings
   * @method
   * @name Konva.Node#moveToBottom
   * @returns {Boolean}
   */
  moveToBottom() {
    if (!this.parent) {
      Util.warn("Node has no parent. moveToBottom function is ignored.");
      return false;
    }
    const index = this.index;
    if (index > 0) {
      this.parent.children.splice(index, 1);
      this.parent.children.unshift(this);
      this.parent._setChildrenIndices();
      return true;
    }
    return false;
  }
  setZIndex(zIndex) {
    if (!this.parent) {
      Util.warn("Node has no parent. zIndex parameter is ignored.");
      return this;
    }
    if (zIndex < 0 || zIndex >= this.parent.children.length) {
      Util.warn("Unexpected value " + zIndex + " for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to " + (this.parent.children.length - 1) + ".");
    }
    const index = this.index;
    this.parent.children.splice(index, 1);
    this.parent.children.splice(zIndex, 0, this);
    this.parent._setChildrenIndices();
    return this;
  }
  /**
   * get absolute opacity
   * @method
   * @name Konva.Node#getAbsoluteOpacity
   * @returns {Number}
   */
  getAbsoluteOpacity() {
    return this._getCache(ABSOLUTE_OPACITY, this._getAbsoluteOpacity);
  }
  _getAbsoluteOpacity() {
    let absOpacity = this.opacity();
    const parent = this.getParent();
    if (parent && !parent._isUnderCache) {
      absOpacity *= parent.getAbsoluteOpacity();
    }
    return absOpacity;
  }
  /**
   * move node to another container
   * @method
   * @name Konva.Node#moveTo
   * @param {Container} newContainer
   * @returns {Konva.Node}
   * @example
   * // move node from current layer into layer2
   * node.moveTo(layer2);
   */
  moveTo(newContainer) {
    if (this.getParent() !== newContainer) {
      this._remove();
      newContainer.add(this);
    }
    return this;
  }
  /**
   * convert Node into an object for serialization.  Returns an object.
   * @method
   * @name Konva.Node#toObject
   * @returns {Object}
   */
  toObject() {
    var _a2;
    const attrs = this.getAttrs();
    let key, val, nonPlainObject;
    const obj = {
      attrs: {},
      className: this.getClassName()
    };
    for (key in attrs) {
      val = attrs[key];
      if (val instanceof TypedArray) {
        val = Array.from(val);
      }
      nonPlainObject = Util.isObject(val) && !Util._isPlainObject(val) && !Util._isArray(val);
      if (nonPlainObject) {
        continue;
      }
      if (((_a2 = this["get" + Util._capitalize(key)]) === null || _a2 === void 0 ? void 0 : _a2._def) !== val || key === "brightness" || key === "threshold") {
        obj.attrs[key] = key === "filters" && Util._isArray(val) ? val.filter((filter) => typeof filter === "string") : Util.isObject(val) ? Util._prepareToStringify(val) : val;
      }
    }
    return obj;
  }
  /**
   * convert Node into a JSON string.  Returns a JSON string.
   * @method
   * @name Konva.Node#toJSON
   * @returns {String}
   */
  toJSON() {
    return JSON.stringify(this.toObject());
  }
  /**
   * get parent container
   * @method
   * @name Konva.Node#getParent
   * @returns {Konva.Node}
   */
  getParent() {
    return this.parent;
  }
  /**
   * get all ancestors (parent then parent of the parent, etc) of the node
   * @method
   * @name Konva.Node#findAncestors
   * @param {String} selector selector for search
   * @param {Boolean} [includeSelf] show we think that node is ancestro itself?
   * @param {Konva.Node} [stopNode] optional node where we need to stop searching (one of ancestors)
   * @returns {Array} [ancestors]
   * @example
   * // get one of the parent group
   * var parentGroups = node.findAncestors('Group');
   */
  findAncestors(selector, includeSelf, stopNode) {
    const res = [];
    if (includeSelf && this._isMatch(selector)) {
      res.push(this);
    }
    let ancestor = this.parent;
    while (ancestor) {
      if (ancestor === stopNode) {
        return res;
      }
      if (ancestor._isMatch(selector)) {
        res.push(ancestor);
      }
      ancestor = ancestor.parent;
    }
    return res;
  }
  isAncestorOf(node) {
    return false;
  }
  /**
   * get ancestor (parent or parent of the parent, etc) of the node that match passed selector
   * @method
   * @name Konva.Node#findAncestor
   * @param {String} selector selector for search
   * @param {Boolean} [includeSelf] show we think that node is ancestro itself?
   * @param {Konva.Node} [stopNode] optional node where we need to stop searching (one of ancestors)
   * @returns {Konva.Node} ancestor
   * @example
   * // get one of the parent group
   * var group = node.findAncestors('.mygroup');
   */
  findAncestor(selector, includeSelf, stopNode) {
    return this.findAncestors(selector, includeSelf, stopNode)[0];
  }
  // is current node match passed selector?
  _isMatch(selector) {
    if (!selector) {
      return false;
    }
    if (typeof selector === "function") {
      return selector(this);
    }
    let selectorArr = selector.replace(/ /g, "").split(","), len = selectorArr.length, n2, sel;
    for (n2 = 0; n2 < len; n2++) {
      sel = selectorArr[n2];
      if (!Util.isValidSelector(sel)) {
        Util.warn('Selector "' + sel + '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".');
        Util.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".');
        Util.warn("Konva is awesome, right?");
      }
      if (sel.charAt(0) === "#") {
        if (this.id() === sel.slice(1)) {
          return true;
        }
      } else if (sel.charAt(0) === ".") {
        if (this.hasName(sel.slice(1))) {
          return true;
        }
      } else if (this.className === sel || this.nodeType === sel) {
        return true;
      }
    }
    return false;
  }
  /**
   * get layer ancestor
   * @method
   * @name Konva.Node#getLayer
   * @returns {Konva.Layer}
   */
  getLayer() {
    const parent = this.getParent();
    return parent ? parent.getLayer() : null;
  }
  /**
   * get stage ancestor
   * @method
   * @name Konva.Node#getStage
   * @returns {Konva.Stage}
   */
  getStage() {
    return this._getCache(STAGE, this._getStage);
  }
  _getStage() {
    const parent = this.getParent();
    if (parent) {
      return parent.getStage();
    } else {
      return null;
    }
  }
  /**
   * fire event
   * @method
   * @name Konva.Node#fire
   * @param {String} eventType event type.  can be a regular event, like click, mouseover, or mouseout, or it can be a custom event, like myCustomEvent
   * @param {Event} [evt] event object
   * @param {Boolean} [bubble] setting the value to false, or leaving it undefined, will result in the event
   *  not bubbling.  Setting the value to true will result in the event bubbling.
   * @returns {Konva.Node}
   * @example
   * // manually fire click event
   * node.fire('click');
   *
   * // fire custom event
   * node.fire('foo');
   *
   * // fire custom event with custom event object
   * node.fire('foo', {
   *   bar: 10
   * });
   *
   * // fire click event that bubbles
   * node.fire('click', null, true);
   */
  fire(eventType, evt, bubble) {
    evt = evt || {};
    evt.target = evt.target || this;
    if (bubble) {
      this._fireAndBubble(eventType, evt);
    } else {
      this._fire(eventType, evt);
    }
    return this;
  }
  /**
   * get absolute transform of the node which takes into
   *  account its ancestor transforms
   * @method
   * @name Konva.Node#getAbsoluteTransform
   * @returns {Konva.Transform}
   */
  getAbsoluteTransform(top) {
    if (top || this._hasCachedAncestor()) {
      return this._getAbsoluteTransform(top);
    }
    return this._getCache(ABSOLUTE_TRANSFORM, this._getCachedAbsoluteTransform);
  }
  _hasCachedAncestor() {
    let parent = this.parent;
    while (parent) {
      if (parent.isCached()) {
        return true;
      }
      parent = parent.parent;
    }
    return false;
  }
  // relative to `top`: the transforms of `top` and of its ancestors are
  // left out. Goes through the parent, so an ancestor that redefines its
  // absolute transform (Konva.Transformer) is honoured
  _getAbsoluteTransform(top) {
    const at = new Transform();
    if (this === top) {
      return at;
    }
    if (this.parent && this.parent !== top) {
      this.parent.getAbsoluteTransform(top).copyInto(at);
    }
    return this._multiplyOwnTransform(at);
  }
  // the cached transform of the parent, then the own one
  _getCachedAbsoluteTransform() {
    const at = this._cache[ABSOLUTE_TRANSFORM] || new Transform();
    if (this.parent) {
      this.parent.getAbsoluteTransform().copyInto(at);
    } else {
      at.reset();
    }
    this._multiplyOwnTransform(at);
    at.dirty = false;
    return at;
  }
  _multiplyOwnTransform(at) {
    const transformsEnabled = this.transformsEnabled();
    if (transformsEnabled === "all") {
      at.multiply(this.getTransform());
    } else if (transformsEnabled === "position") {
      const x2 = this.attrs.x || 0;
      const y = this.attrs.y || 0;
      const offsetX = this.attrs.offsetX || 0;
      const offsetY = this.attrs.offsetY || 0;
      at.translate(x2 - offsetX, y - offsetY);
    }
    return at;
  }
  /**
   * get absolute scale of the node which takes into
   *  account its ancestor scales
   * @method
   * @name Konva.Node#getAbsoluteScale
   * @returns {Object}
   * @example
   * // get absolute scale x
   * var scaleX = node.getAbsoluteScale().x;
   */
  getAbsoluteScale(top) {
    let parent = this;
    while (parent) {
      if (parent._isUnderCache) {
        top = parent;
      }
      parent = parent.getParent();
    }
    const transform = this.getAbsoluteTransform(top);
    const attrs = transform.decompose();
    return {
      x: attrs.scaleX,
      y: attrs.scaleY
    };
  }
  /**
   * get absolute rotation of the node which takes into
   *  account its ancestor rotations
   * @method
   * @name Konva.Node#getAbsoluteRotation
   * @returns {Number}
   * @example
   * // get absolute rotation
   * var rotation = node.getAbsoluteRotation();
   */
  getAbsoluteRotation() {
    return this.getAbsoluteTransform().decompose().rotation;
  }
  /**
   * get transform of the node
   * @method
   * @name Konva.Node#getTransform
   * @returns {Konva.Transform}
   */
  getTransform() {
    return this._getCache(TRANSFORM, this._getTransform);
  }
  _getTransform() {
    var _a2, _b;
    const m = this._cache[TRANSFORM] || new Transform();
    m.reset();
    const x2 = this.x(), y = this.y(), rotation = Konva.getAngle(this.rotation()), scaleX = (_a2 = this.attrs.scaleX) !== null && _a2 !== void 0 ? _a2 : 1, scaleY = (_b = this.attrs.scaleY) !== null && _b !== void 0 ? _b : 1, skewX = this.attrs.skewX || 0, skewY = this.attrs.skewY || 0, offsetX = this.attrs.offsetX || 0, offsetY = this.attrs.offsetY || 0;
    if (x2 !== 0 || y !== 0) {
      m.translate(x2, y);
    }
    if (rotation !== 0) {
      m.rotate(rotation);
    }
    if (skewX !== 0 || skewY !== 0) {
      m.skew(skewX, skewY);
    }
    if (scaleX !== 1 || scaleY !== 1) {
      m.scale(scaleX, scaleY);
    }
    if (offsetX !== 0 || offsetY !== 0) {
      m.translate(-1 * offsetX, -1 * offsetY);
    }
    m.dirty = false;
    return m;
  }
  /**
   * clone node.  Returns a new Node instance with identical attributes.  You can also override
   *  the node properties with an object literal, enabling you to use an existing node as a template
   *  for another node
   * @method
   * @name Konva.Node#clone
   * @param {Object} obj override attrs
   * @returns {Konva.Node}
   * @example
   * // simple clone
   * var clone = node.clone();
   *
   * // clone a node and override the x position
   * var clone = rect.clone({
   *   x: 5
   * });
   */
  clone(obj) {
    let attrs = Util.cloneObject(this.attrs), key, allListeners, len, n2, listener;
    for (key in obj) {
      attrs[key] = obj[key];
    }
    const node = new this.constructor(attrs);
    for (key in this.eventListeners) {
      allListeners = this.eventListeners[key];
      len = allListeners.length;
      for (n2 = 0; n2 < len; n2++) {
        listener = allListeners[n2];
        if (listener.name.indexOf(KONVA) < 0) {
          if (!node.eventListeners[key]) {
            node.eventListeners[key] = [];
          }
          node.eventListeners[key].push(listener);
        }
      }
    }
    return node;
  }
  _toKonvaCanvas(config) {
    config = config || {};
    const needsBox = config.x === void 0 || config.y === void 0 || !config.width || !config.height;
    const box = needsBox ? this.getClientRect() : { x: 0, y: 0, width: 0, height: 0 };
    if (!isFinite(box.x + box.y + box.width + box.height)) {
      Util.error(`Cannot find the bounds of the node to export, its client rect is ${box.x}, ${box.y}, ${box.width}x${box.height}. Check its position, size and points.`);
    }
    const stage = this.getStage(), x2 = config.x !== void 0 ? config.x : Math.floor(box.x), y = config.y !== void 0 ? config.y : Math.floor(box.y), pixelRatio = config.pixelRatio || 1, canvas2 = new SceneCanvas({
      width: config.width || Math.max(0, Math.ceil(box.x + box.width - x2)) || (stage ? stage.width() : 0),
      height: config.height || Math.max(0, Math.ceil(box.y + box.height - y)) || (stage ? stage.height() : 0),
      pixelRatio
    }), context = canvas2.getContext();
    if (config.imageSmoothingEnabled === false) {
      context._context.imageSmoothingEnabled = false;
    }
    context.save();
    if (x2 || y) {
      context.translate(-1 * x2, -1 * y);
    }
    this.drawScene(canvas2);
    context.restore();
    canvas2._releaseIsolationCanvas();
    return canvas2;
  }
  /**
   * converts node into an canvas element.
   * @method
   * @name Konva.Node#toCanvas
   * @param {Object} config
   * @param {Function} config.callback function executed when the composite has completed
   * @param {Number} [config.x] x position of canvas section
   * @param {Number} [config.y] y position of canvas section
   * @param {Number} [config.width] width of canvas section
   * @param {Number} [config.height] height of canvas section
   * @param {Number} [config.pixelRatio] pixelRatio of output canvas. Default is 1.
   * Higher pixel ratios increase export resolution. Cached nodes keep their cache resolution.
   * Rebuild caches at the export pixel ratio to preserve detail.
   * The pixel ratio multiplies the dimensions of the exported image.
   * If you export to 500x500 size with pixelRatio = 2, then produced image will have size 1000x1000.
   * @param {Boolean} [config.imageSmoothingEnabled] set this to false if you want to disable imageSmoothing
   * @example
   * var canvas = node.toCanvas();
   */
  toCanvas(config) {
    return this._toKonvaCanvas(config)._canvas;
  }
  /**
   * Creates a composite data URL (base64 string). If MIME type is not
   * specified, then "image/png" will result. For "image/jpeg", specify a quality
   * level as quality (range 0.0 - 1.0)
   * @method
   * @name Konva.Node#toDataURL
   * @param {Object} config
   * @param {String} [config.mimeType] can be "image/png" or "image/jpeg".
   *  "image/png" is the default
   * @param {Number} [config.x] x position of canvas section
   * @param {Number} [config.y] y position of canvas section
   * @param {Number} [config.width] width of canvas section
   * @param {Number} [config.height] height of canvas section
   * @param {Number} [config.quality] jpeg quality.  If using an "image/jpeg" mimeType,
   *  you can specify the quality from 0 to 1, where 0 is very poor quality and 1
   *  is very high quality
   * @param {Number} [config.pixelRatio] pixelRatio of output image url. Default is 1.
   * Higher pixel ratios increase export resolution. Cached nodes keep their cache resolution.
   * Rebuild caches at the export pixel ratio to preserve detail.
   * The pixel ratio multiplies the dimensions of the exported image.
   * If you export to 500x500 size with pixelRatio = 2, then produced image will have size 1000x1000.
   * @param {Boolean} [config.imageSmoothingEnabled] set this to false if you want to disable imageSmoothing
   * @returns {String}
   */
  toDataURL(config) {
    var _a2;
    config = config || {};
    const mimeType = config.mimeType || null, quality = (_a2 = config.quality) !== null && _a2 !== void 0 ? _a2 : null;
    const url = this._toKonvaCanvas(config).toDataURL(mimeType, quality);
    if (config.callback) {
      config.callback(url);
    }
    return url;
  }
  /**
   * converts node into an image.  Since the toImage
   *  method is asynchronous, the resulting image can only be retrieved from the config callback
   *  or the returned Promise.  toImage is most commonly used
   *  to cache complex drawings as an image so that they don't have to constantly be redrawn
   * @method
   * @name Konva.Node#toImage
   * @param {Object} config
   * @param {Function} [config.callback] function executed when the composite has completed
   * @param {String} [config.mimeType] can be "image/png" or "image/jpeg".
   *  "image/png" is the default
   * @param {Number} [config.x] x position of canvas section
   * @param {Number} [config.y] y position of canvas section
   * @param {Number} [config.width] width of canvas section
   * @param {Number} [config.height] height of canvas section
   * @param {Number} [config.quality] jpeg quality.  If using an "image/jpeg" mimeType,
   *  you can specify the quality from 0 to 1, where 0 is very poor quality and 1
   *  is very high quality
   * @param {Number} [config.pixelRatio] pixelRatio of output image. Default is 1.
   * Higher pixel ratios increase export resolution. Cached nodes keep their cache resolution.
   * Rebuild caches at the export pixel ratio to preserve detail.
   * The pixel ratio multiplies the dimensions of the exported image.
   * If you export to 500x500 size with pixelRatio = 2, then produced image will have size 1000x1000.
   * @param {Boolean} [config.imageSmoothingEnabled] set this to false if you want to disable imageSmoothing
   * @return {Promise<Image>}
   * @example
   * var image = node.toImage({
   *   callback(img) {
   *     // do stuff with img
   *   }
   * });
   */
  toImage(config) {
    return new Promise((resolve, reject) => {
      try {
        const { callback, ...rest } = config || {};
        Util._urlToImage(this.toDataURL(rest), function(img) {
          resolve(img);
          callback === null || callback === void 0 ? void 0 : callback(img);
        }, reject);
      } catch (err) {
        reject(err);
      }
    });
  }
  /**
   * Converts node into a blob.  Since the toBlob method is asynchronous,
   *  the resulting blob can only be retrieved from the config callback
   *  or the returned Promise.
   * @method
   * @name Konva.Node#toBlob
   * @param {Object} config
   * @param {Function} [config.callback] function executed when the composite has completed
   * @param {Number} [config.x] x position of canvas section
   * @param {Number} [config.y] y position of canvas section
   * @param {Number} [config.width] width of canvas section
   * @param {Number} [config.height] height of canvas section
   * @param {Number} [config.pixelRatio] pixelRatio of output canvas. Default is 1.
   * Higher pixel ratios increase export resolution. Cached nodes keep their cache resolution.
   * Rebuild caches at the export pixel ratio to preserve detail.
   * The pixel ratio multiplies the dimensions of the exported image.
   * If you export to 500x500 size with pixelRatio = 2, then produced image will have size 1000x1000.
   * @param {Boolean} [config.imageSmoothingEnabled] set this to false if you want to disable imageSmoothing
   * @example
   * var blob = await node.toBlob({});
   * @returns {Promise<Blob>} rejects if the canvas can not be encoded
   */
  toBlob(config) {
    return new Promise((resolve, reject) => {
      try {
        this.toCanvas(config).toBlob((blob) => {
          var _a2;
          if (!blob) {
            reject(new Error("Konva: toBlob() failed, the canvas was not encoded"));
            return;
          }
          resolve(blob);
          (_a2 = config === null || config === void 0 ? void 0 : config.callback) === null || _a2 === void 0 ? void 0 : _a2.call(config, blob);
        }, config === null || config === void 0 ? void 0 : config.mimeType, config === null || config === void 0 ? void 0 : config.quality);
      } catch (err) {
        reject(err);
      }
    });
  }
  setSize(size) {
    this.width(size.width);
    this.height(size.height);
    return this;
  }
  getSize() {
    return {
      width: this.width(),
      height: this.height()
    };
  }
  /**
   * get class name, which may return Stage, Layer, Group, or shape class names like Rect, Circle, Text, etc.
   * @method
   * @name Konva.Node#getClassName
   * @returns {String}
   */
  getClassName() {
    return this.className || this.nodeType;
  }
  /**
   * get the node type, which may return Stage, Layer, Group, or Shape
   * @method
   * @name Konva.Node#getType
   * @returns {String}
   */
  getType() {
    return this.nodeType;
  }
  getDragDistance() {
    if (this.attrs.dragDistance !== void 0) {
      return this.attrs.dragDistance;
    } else if (this.parent) {
      return this.parent.getDragDistance();
    } else {
      return Konva.dragDistance;
    }
  }
  _off(type, name, callback) {
    let evtListeners = this.eventListeners[type], i2, evtName, handler;
    for (i2 = 0; i2 < evtListeners.length; i2++) {
      evtName = evtListeners[i2].name;
      handler = evtListeners[i2].handler;
      if ((evtName !== "konva" || name === "konva") && (!name || evtName === name) && (!callback || callback === handler)) {
        evtListeners.splice(i2, 1);
        if (evtListeners.length === 0) {
          delete this.eventListeners[type];
          break;
        }
        i2--;
      }
    }
  }
  _fireChangeEvent(attr, oldVal, newVal) {
    this._fire(attr + CHANGE, {
      oldVal,
      newVal
    });
  }
  /**
   * add name to node
   * @method
   * @name Konva.Node#addName
   * @param {String} name
   * @returns {Konva.Node}
   * @example
   * node.name('red');
   * node.addName('selected');
   * node.name(); // return 'red selected'
   */
  addName(name) {
    if (!this.hasName(name)) {
      const oldName = this.name();
      const newName = oldName ? oldName + " " + name : name;
      this.name(newName);
    }
    return this;
  }
  /**
   * check is node has name
   * @method
   * @name Konva.Node#hasName
   * @param {String} name
   * @returns {Boolean}
   * @example
   * node.name('red');
   * node.hasName('red');   // return true
   * node.hasName('selected'); // return false
   * node.hasName(''); // return false
   */
  hasName(name) {
    if (!name) {
      return false;
    }
    const fullName = this.name();
    if (!fullName) {
      return false;
    }
    const names = (fullName || "").split(/\s/g);
    return names.indexOf(name) !== -1;
  }
  /**
   * remove name from node
   * @method
   * @name Konva.Node#removeName
   * @param {String} name
   * @returns {Konva.Node}
   * @example
   * node.name('red selected');
   * node.removeName('selected');
   * node.hasName('selected'); // return false
   * node.name(); // return 'red'
   */
  removeName(name) {
    const names = (this.name() || "").split(/\s/g);
    const index = names.indexOf(name);
    if (index !== -1) {
      names.splice(index, 1);
      this.name(names.join(" "));
    }
    return this;
  }
  /**
   * set attr
   * @method
   * @name Konva.Node#setAttr
   * @param {String} attr
   * @param {*} val
   * @returns {Konva.Node}
   * @example
   * node.setAttr('x', 5);
   */
  setAttr(attr, val) {
    const func = this[SET2 + Util._capitalize(attr)];
    if (Util._isFunction(func)) {
      func.call(this, val);
    } else {
      this._setAttr(attr, val);
    }
    return this;
  }
  _addSubtreeObserver(observer) {
    var _a2;
    ((_a2 = this._subtreeObservers) !== null && _a2 !== void 0 ? _a2 : this._subtreeObservers = /* @__PURE__ */ new Set()).add(observer);
    _Node._subtreeObserverCount++;
  }
  _removeSubtreeObserver(observer) {
    var _a2;
    if ((_a2 = this._subtreeObservers) === null || _a2 === void 0 ? void 0 : _a2.delete(observer)) {
      _Node._subtreeObserverCount--;
    }
  }
  // Tells the observers of this node and of its ancestors that something below
  // them changed. A node's own changes reach its observers through its change
  // events, so a draw request starts at the parent. A container calls this
  // itself when its child list changes.
  _notifySubtreeChange() {
    if (!_Node._subtreeObserverCount)
      return;
    for (let node = this; node; node = node.parent) {
      const observers = node._subtreeObservers;
      if (observers)
        for (const o2 of observers)
          o2._onSubtreeChange(node);
    }
  }
  _requestDraw() {
    var _a2;
    (_a2 = this.parent) === null || _a2 === void 0 ? void 0 : _a2._notifySubtreeChange();
    if (Konva.autoDrawEnabled) {
      const drawNode = this.getLayer() || this.getStage();
      drawNode === null || drawNode === void 0 ? void 0 : drawNode.batchDraw();
    }
  }
  _setAttr(key, val) {
    const oldVal = this.attrs[key];
    if (oldVal === val && !Util.isObject(val)) {
      return;
    }
    if (val === void 0 || val === null) {
      delete this.attrs[key];
    } else {
      this.attrs[key] = val;
    }
    if (this._attrsVersion !== void 0)
      this._attrsVersion++;
    if (this._shouldFireChangeEvents) {
      this._fireChangeEvent(key, oldVal, val);
    }
    this._requestDraw();
  }
  _fireAndBubble(eventType, evt, compareShape) {
    if (evt && this.nodeType === SHAPE) {
      evt.target = this;
    }
    const nonBubbling = NON_BUBBLING_EVENTS.indexOf(eventType) !== -1;
    const shouldStop = nonBubbling && (compareShape && (this === compareShape || this.isAncestorOf && this.isAncestorOf(compareShape)) || this.nodeType === "Stage" && !compareShape);
    if (!shouldStop) {
      this._fire(eventType, evt);
      const stopBubble = nonBubbling && compareShape && compareShape.isAncestorOf && compareShape.isAncestorOf(this) && !compareShape.isAncestorOf(this.parent);
      if ((evt && !evt.cancelBubble || !evt) && this.parent && this.parent.isListening() && !stopBubble) {
        if (compareShape && compareShape.parent) {
          this._fireAndBubble.call(this.parent, eventType, evt, compareShape);
        } else {
          this._fireAndBubble.call(this.parent, eventType, evt);
        }
      }
    }
  }
  _getProtoListeners(eventType) {
    var _a2, _b;
    const proto = Object.getPrototypeOf(this);
    let allListeners = _Node.protoListenerMap.get(proto);
    if (!allListeners) {
      allListeners = {};
      _Node.protoListenerMap.set(proto, allListeners);
    }
    let events = allListeners[eventType];
    if (events === void 0) {
      events = [];
      const seen = /* @__PURE__ */ new Set();
      let obj = Object.getPrototypeOf(this);
      while (obj) {
        const hierarchyEvents = (_b = (_a2 = obj.eventListeners) === null || _a2 === void 0 ? void 0 : _a2[eventType]) !== null && _b !== void 0 ? _b : [];
        for (let i2 = 0; i2 < hierarchyEvents.length; i2++) {
          const entry = hierarchyEvents[i2];
          if (!seen.has(entry)) {
            seen.add(entry);
            events.push(entry);
          }
        }
        obj = Object.getPrototypeOf(obj);
      }
      allListeners[eventType] = events;
    }
    return events;
  }
  _fire(eventType, evt) {
    evt = evt || {};
    evt.currentTarget = this;
    evt.type = eventType;
    const topListeners = this._getProtoListeners(eventType);
    if (topListeners) {
      for (let i2 = 0; i2 < topListeners.length; i2++) {
        topListeners[i2].handler.call(this, evt);
      }
    }
    const selfListeners = this.eventListeners[eventType];
    if (selfListeners) {
      const list = selfListeners.slice();
      const origLen = list.length;
      for (let i2 = 0; i2 < list.length; i2++) {
        list[i2].handler.call(this, evt);
      }
      const liveListeners = this.eventListeners[eventType];
      if (liveListeners) {
        for (let i2 = origLen; i2 < liveListeners.length; i2++) {
          liveListeners[i2].handler.call(this, evt);
        }
      }
    }
  }
  /**
   * draw both scene and hit graphs.  If the node being drawn is the stage, all of the layers will be cleared and redrawn
   * @method
   * @name Konva.Node#draw
   * @returns {Konva.Node}
   */
  draw() {
    this.drawScene();
    this.drawHit();
    return this;
  }
  // drag & drop
  _createDragElement(evt) {
    var _a2;
    const pointerId = evt ? evt.pointerId : void 0;
    const stage = this.getStage();
    const ap = this.getAbsolutePosition();
    if (!stage) {
      return;
    }
    const pos = stage._getPointerById(pointerId) || stage._changedPointerPositions[0] || ap;
    const type = ((_a2 = evt === null || evt === void 0 ? void 0 : evt.evt) === null || _a2 === void 0 ? void 0 : _a2.type) ? Util._getEventType(evt.evt.type) : stage._pointerEventType;
    const bound = type !== "pointer";
    DD._dragElements.set(this._id, {
      node: this,
      startPointerPos: pos,
      offset: {
        x: pos.x - ap.x,
        y: pos.y - ap.y
      },
      dragStatus: "ready",
      pointerId: bound ? pointerId !== null && pointerId !== void 0 ? pointerId : "id" in pos ? pos.id : void 0 : void 0,
      pointerEventType: bound ? type : void 0,
      startEvent: evt
    });
  }
  /**
   * initiate drag and drop.
   * @method
   * @name Konva.Node#startDrag
   */
  startDrag(evt, bubbleEvent = true) {
    var _a2;
    if (!DD._dragElements.has(this._id)) {
      this._createDragElement(evt);
    }
    const elem = DD._dragElements.get(this._id);
    if (!elem) {
      return;
    }
    elem.dragStatus = "dragging";
    (_a2 = this.getStage()) === null || _a2 === void 0 ? void 0 : _a2._cancelClick(elem.pointerId, elem.pointerEventType);
    this.fire("dragstart", {
      type: "dragstart",
      target: this,
      // Use the stored start event if available (from mousedown/touchstart),
      // otherwise fall back to the provided event (when startDrag is called programmatically)
      evt: elem.startEvent && elem.startEvent.evt || evt && evt.evt
    }, bubbleEvent);
  }
  _setDragPosition(evt, elem) {
    const pos = this.getStage()._getPointerById(elem.pointerId);
    if (!pos) {
      return;
    }
    let newNodePos = {
      x: pos.x - elem.offset.x,
      y: pos.y - elem.offset.y
    };
    const dbf = this.dragBoundFunc();
    if (dbf !== void 0) {
      const bounded = dbf.call(this, newNodePos, evt);
      if (!bounded) {
        Util.warn("dragBoundFunc did not return any value. That is unexpected behavior. You must return new absolute position from dragBoundFunc.");
      } else if (!Util._isNumber(bounded.x) || !Util._isNumber(bounded.y)) {
        Util.warn(`dragBoundFunc returned a position with a non-finite x or y (${bounded.x}, ${bounded.y}). The node was not moved.`);
        return;
      } else {
        newNodePos = bounded;
      }
    }
    const lastPos = elem.lastPos;
    if (!lastPos || lastPos.x !== newNodePos.x || lastPos.y !== newNodePos.y) {
      this.setAbsolutePosition(newNodePos);
      this._requestDraw();
    }
    elem.lastPos = newNodePos;
  }
  /**
   * stop drag and drop
   * @method
   * @name Konva.Node#stopDrag
   */
  stopDrag(evt) {
    const elem = DD._dragElements.get(this._id);
    if (!elem) {
      return;
    }
    elem.dragStatus = "stopped";
    DD._endDragBefore(evt, void 0, elem);
    DD._endDragAfter(evt, elem);
  }
  setDraggable(draggable) {
    this._setAttr("draggable", draggable);
    this._dragChange();
  }
  /**
   * determine if node is currently in drag and drop mode
   * @method
   * @name Konva.Node#isDragging
   */
  isDragging() {
    const elem = DD._dragElements.get(this._id);
    return elem ? elem.dragStatus === "dragging" : false;
  }
  _listenDrag() {
    this._dragCleanup();
    this.on("mousedown.konva touchstart.konva", function(evt) {
      const shouldCheckButton = evt.evt["button"] !== void 0;
      const canDrag = !shouldCheckButton || Konva.dragButtons.indexOf(evt.evt["button"]) >= 0;
      if (!canDrag) {
        return;
      }
      if (DD._dragElements.has(this._id)) {
        return;
      }
      let hasDraggingChild = false;
      DD._dragElements.forEach((elem) => {
        if (this.isAncestorOf(elem.node)) {
          hasDraggingChild = true;
        }
      });
      if (!hasDraggingChild) {
        this._createDragElement(evt);
      }
    });
  }
  _dragChange() {
    if (this.attrs.draggable) {
      this._listenDrag();
    } else {
      this._dragCleanup();
      const stage = this.getStage();
      if (!stage) {
        return;
      }
      const dragElement = DD._dragElements.get(this._id);
      const isDragging = dragElement && dragElement.dragStatus === "dragging";
      const isReady = dragElement && dragElement.dragStatus === "ready";
      if (isDragging) {
        this.stopDrag();
      } else if (isReady) {
        DD._dragElements.delete(this._id);
      }
    }
  }
  _dragCleanup() {
    this.off("mousedown.konva");
    this.off("touchstart.konva");
  }
  /**
   * determine if node (at least partially) is currently in user-visible area
   * @method
   * @param {(Number | Object)} margin optional margin in pixels
   * @param {Number} margin.x
   * @param {Number} margin.y
   * @returns {Boolean}
   * @name Konva.Node#isClientRectOnScreen
   * @example
   * // get index
   * // default calculations
   * var isOnScreen = node.isClientRectOnScreen()
   * // increase object size (or screen size) for cases when objects close to the screen still need to be marked as "visible"
   * var isOnScreen = node.isClientRectOnScreen({ x: stage.width(), y: stage.height() })
   */
  isClientRectOnScreen(margin = { x: 0, y: 0 }) {
    const stage = this.getStage();
    if (!stage) {
      return false;
    }
    const screenRect = {
      x: -margin.x,
      y: -margin.y,
      width: stage.width() + 2 * margin.x,
      height: stage.height() + 2 * margin.y
    };
    return Util.haveIntersection(screenRect, this.getClientRect());
  }
  /**
   * create node with JSON string or an Object. Deserialization restores attributes only,
   *  not functions, images or event handlers (that would make the serialized object huge):
   *  `sceneFunc`/`hitFunc` of custom shapes, images and `fillPatternImage`, `clipFunc`,
   *  `dragBoundFunc`, filter functions, the `nodes`, `boundBoxFunc` and `anchorStyleFunc`
   *  of a Transformer, typed arrays and the `cache()` state. If your app uses them (it probably
   *  does), select the nodes after loading the stage and set these properties again with
   *  `on()`, `sceneFunc()`, `image()` and so on
   * @method
   * @memberof Konva.Node
   * @param {String|Object} data string or object
   * @param {Element} [container] optional container dom element used only if you're
   *  creating a stage node
   */
  static create(data, container) {
    if (Util._isString(data)) {
      data = JSON.parse(data);
    }
    return this._createNode(data, container);
  }
  static _createNode(obj, container) {
    let className = _Node.prototype.getClassName.call(obj), children = obj.children, no, len, n2;
    if (container) {
      obj.attrs.container = container;
    }
    if (!Konva[className]) {
      const fallback = children ? "Group" : "Shape";
      Util.warn('Can not find a node with class name "' + className + `". Fallback to "${fallback}".`);
      className = fallback;
    }
    const Class = Konva[className];
    no = new Class(obj.attrs);
    if (children) {
      len = children.length;
      for (n2 = 0; n2 < len; n2++) {
        no.add(_Node._createNode(children[n2]));
      }
    }
    return no;
  }
};
Node._subtreeObserverCount = 0;
Node._absTransformCascadeDepth = 0;
Node._pendingAfterCascade = [];
Node.protoListenerMap = /* @__PURE__ */ new WeakMap();
Node.prototype.nodeType = "Node";
Node.prototype._attrsAffectingSize = [];
Node.prototype.on(TRANSFORM_CHANGE_STR, function() {
  if (this._batchingTransformChange) {
    this._needClearTransformCache = true;
    return;
  }
  this._clearCache(TRANSFORM);
  this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
});
Node.prototype.on("visibleChange.konva", function() {
  this._clearSelfAndDescendantCache(VISIBLE);
});
Node.prototype.on("listeningChange.konva", function() {
  this._clearSelfAndDescendantCache(LISTENING);
  for (let parent = this.getParent(); parent; parent = parent.getParent()) {
    const cache2 = parent._getCanvasCache();
    if (cache2 === null || cache2 === void 0 ? void 0 : cache2.hit) {
      Util.releaseCanvas(cache2.hit._canvas);
      cache2.hit = null;
    }
  }
});
Node.prototype.on("opacityChange.konva", function() {
  this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
});
var addGetterSetter = Factory.addGetterSetter;
addGetterSetter(Node, "zIndex");
addGetterSetter(Node, "absolutePosition");
addGetterSetter(Node, "position");
addGetterSetter(Node, "x", 0, getNumberValidator());
addGetterSetter(Node, "y", 0, getNumberValidator());
addGetterSetter(Node, "globalCompositeOperation", "source-over", getStringValidator());
addGetterSetter(Node, "opacity", 1, getNumberValidator());
addGetterSetter(Node, "name", "", getStringValidator());
addGetterSetter(Node, "id", "", getStringValidator());
addGetterSetter(Node, "rotation", 0, getNumberValidator());
Factory.addComponentsGetterSetter(Node, "scale", ["x", "y"]);
addGetterSetter(Node, "scaleX", 1, getNumberValidator());
addGetterSetter(Node, "scaleY", 1, getNumberValidator());
Factory.addComponentsGetterSetter(Node, "skew", ["x", "y"]);
addGetterSetter(Node, "skewX", 0, getNumberValidator());
addGetterSetter(Node, "skewY", 0, getNumberValidator());
Factory.addComponentsGetterSetter(Node, "offset", ["x", "y"]);
addGetterSetter(Node, "offsetX", 0, getNumberValidator());
addGetterSetter(Node, "offsetY", 0, getNumberValidator());
addGetterSetter(Node, "dragDistance", void 0, getNumberValidator());
addGetterSetter(Node, "width", 0, getNumberValidator());
addGetterSetter(Node, "height", 0, getNumberValidator());
addGetterSetter(Node, "listening", true, getBooleanValidator());
addGetterSetter(Node, "preventDefault", true, getBooleanValidator());
addGetterSetter(Node, "filters", void 0, function(val) {
  this._filterUpToDate = false;
  return val;
});
addGetterSetter(Node, "visible", true, getBooleanValidator());
addGetterSetter(Node, "transformsEnabled", "all", getStringValidator());
addGetterSetter(Node, "size");
addGetterSetter(Node, "dragBoundFunc");
addGetterSetter(Node, "draggable", false, getBooleanValidator());
Factory.backCompat(Node, {
  rotateDeg: "rotate",
  setRotationDeg: "setRotation",
  getRotationDeg: "getRotation"
});

// node_modules/konva/lib/Container.js
var Container = class extends Node {
  constructor() {
    super(...arguments);
    this.children = [];
  }
  /**
   * returns an array of direct descendant nodes
   * @method
   * @name Konva.Container#getChildren
   * @param {Function} [filterFunc] filter function
   * @returns {Array}
   * @example
   * // get all children
   * var children = layer.getChildren();
   *
   * // get only circles
   * var circles = layer.getChildren(function(node){
   *    return node.getClassName() === 'Circle';
   * });
   */
  getChildren(filterFunc) {
    const children = this.children || [];
    return filterFunc ? children.filter(filterFunc) : children.slice();
  }
  /**
   * determine if node has children
   * @method
   * @name Konva.Container#hasChildren
   * @returns {Boolean}
   */
  hasChildren() {
    return this.children.length > 0;
  }
  /**
   * remove all children. Children will be still in memory.
   * If you want to completely destroy all children please use "destroyChildren" method instead
   * @method
   * @name Konva.Container#removeChildren
   */
  removeChildren() {
    this.children.forEach((child) => {
      child.parent = null;
      child.index = 0;
      child.remove();
    });
    this.children = [];
    this._notifySubtreeChange();
    this._requestDraw();
    return this;
  }
  /**
   * destroy all children nodes.
   * @method
   * @name Konva.Container#destroyChildren
   */
  destroyChildren() {
    this.children.forEach((child) => {
      child.parent = null;
      child.index = 0;
      child.destroy();
    });
    this.children = [];
    this._notifySubtreeChange();
    this._requestDraw();
    return this;
  }
  /**
   * add a child and children into container
   * @name Konva.Container#add
   * @method
   * @param {...Konva.Node} children
   * @returns {Container}
   * @example
   * layer.add(rect);
   * layer.add(shape1, shape2, shape3);
   * // empty arrays are accepted, though each individual child must be defined
   * layer.add(...shapes);
   */
  add(...children) {
    if (children.length === 0) {
      return this;
    }
    if (children.length > 1) {
      for (let i2 = 0; i2 < children.length; i2++) {
        this.add(children[i2]);
      }
      return this;
    }
    const child = children[0];
    if (child.getParent()) {
      child.moveTo(this);
      return this;
    }
    this._validateAdd(child);
    child.index = this.children.length;
    child.parent = this;
    child._clearCaches();
    this.children.push(child);
    this._fire("add", {
      child
    });
    this._notifySubtreeChange();
    this._requestDraw();
    return this;
  }
  destroy() {
    if (this.hasChildren()) {
      this.destroyChildren();
    }
    super.destroy();
    return this;
  }
  /**
   * return an array of nodes that match the selector.
   * You can provide a string with '#' for id selections and '.' for name selections.
   * Or a function that will return true/false when a node is passed through.  See example below.
   * With strings you can also select by type or class name. Pass multiple selectors
   * separated by a comma.
   * @method
   * @name Konva.Container#find
   * @param {String | Function} selector
   * @returns {Array}
   * @example
   *
   * Passing a string as a selector
   * // select node with id foo
   * var node = stage.find('#foo');
   *
   * // select nodes with name bar inside layer
   * var nodes = layer.find('.bar');
   *
   * // select all groups inside layer
   * var nodes = layer.find('Group');
   *
   * // select all rectangles inside layer
   * var nodes = layer.find('Rect');
   *
   * // select node with an id of foo or a name of bar inside layer
   * var nodes = layer.find('#foo, .bar');
   *
   * Passing a function as a selector
   *
   * // get all groups with a function
   * var groups = stage.find(node => {
   *  return node.getType() === 'Group';
   * });
   *
   * // get only Nodes with partial opacity
   * var alphaNodes = layer.find(node => {
   *  return node.getType() === 'Node' && node.getAbsoluteOpacity() < 1;
   * });
   */
  find(selector) {
    return this._generalFind(selector, false);
  }
  /**
   * return a first node from `find` method
   * @method
   * @name Konva.Container#findOne
   * @param {String | Function} selector
   * @returns {Konva.Node | Undefined}
   * @example
   * // select node with id foo
   * var node = stage.findOne('#foo');
   *
   * // select node with name bar inside layer
   * var nodes = layer.findOne('.bar');
   *
   * // select the first node to return true in a function
   * var node = stage.findOne(node => {
   *  return node.getType() === 'Shape'
   * })
   */
  findOne(selector) {
    const result = this._generalFind(selector, true);
    return result.length > 0 ? result[0] : void 0;
  }
  _generalFind(selector, findOne) {
    const retArr = [];
    this._descendants((node) => {
      const valid = node._isMatch(selector);
      if (valid) {
        retArr.push(node);
      }
      if (valid && findOne) {
        return true;
      }
      return false;
    });
    return retArr;
  }
  _descendants(fn) {
    let shouldStop = false;
    for (const child of this.children) {
      shouldStop = fn(child);
      if (shouldStop) {
        return true;
      }
      if (!child.hasChildren()) {
        continue;
      }
      shouldStop = child._descendants(fn);
      if (shouldStop) {
        return true;
      }
    }
    return false;
  }
  // extenders
  toObject() {
    const obj = Node.prototype.toObject.call(this);
    obj.children = [];
    this.children.forEach((child) => {
      obj.children.push(child.toObject());
    });
    return obj;
  }
  /**
   * determine if node is an ancestor
   * of descendant
   * @method
   * @name Konva.Container#isAncestorOf
   * @param {Konva.Node} node
   */
  isAncestorOf(node) {
    let parent = node.getParent();
    while (parent) {
      if (parent._id === this._id) {
        return true;
      }
      parent = parent.getParent();
    }
    return false;
  }
  clone(obj) {
    const node = Node.prototype.clone.call(this, obj);
    this.children.forEach(function(no) {
      node.add(no.clone());
    });
    return node;
  }
  /**
   * get all shapes that intersect a point.  Note: because this method must clear a temporary
   * canvas and redraw every shape inside the container, it should only be used for special situations
   * because it performs very poorly.  Please use the {@link Konva.Stage#getIntersection} method if at all possible
   * because it performs much better.
   * Nodes with listening set to false or invisible nodes are not detected
   * @method
   * @name Konva.Container#getAllIntersections
   * @param {Object} pos
   * @param {Number} pos.x
   * @param {Number} pos.y
   * @returns {Array} array of shapes
   */
  getAllIntersections(pos) {
    const arr = [];
    this.find("Shape").forEach((shape) => {
      if (shape.isVisible() && shape.intersects(pos)) {
        arr.push(shape);
      }
    });
    return arr;
  }
  _clearSelfAndDescendantCache(attr) {
    var _a2;
    const isAbsTransform = attr === void 0 || attr === "absoluteTransform";
    if (isAbsTransform)
      Node._absTransformCascadeDepth++;
    try {
      super._clearSelfAndDescendantCache(attr);
      if (attr === "absoluteTransform" && this.isCached())
        return;
      (_a2 = this.children) === null || _a2 === void 0 ? void 0 : _a2.forEach(function(node) {
        node._clearSelfAndDescendantCache(attr);
      });
    } finally {
      if (isAbsTransform && --Node._absTransformCascadeDepth === 0) {
        const callbacks = Node._pendingAfterCascade;
        if (callbacks.length) {
          Node._pendingAfterCascade = [];
          for (let i2 = 0; i2 < callbacks.length; i2++)
            callbacks[i2]();
        }
      }
    }
  }
  _setChildrenIndices() {
    var _a2;
    (_a2 = this.children) === null || _a2 === void 0 ? void 0 : _a2.forEach(function(child, n2) {
      child.index = n2;
    });
    this._notifySubtreeChange();
    this._requestDraw();
  }
  drawScene(can, top) {
    const layer = this.getLayer(), canvas2 = can || layer && layer.getCanvas(), context = canvas2 && canvas2.getContext(), cachedCanvas = this._getCanvasCache(), cachedSceneCanvas = cachedCanvas && cachedCanvas.scene;
    const caching = top === this;
    if (!(top ? this._isVisible(top) : this.isVisible()) && !caching) {
      return this;
    }
    if (cachedSceneCanvas) {
      context.save();
      const m = this.getAbsoluteTransform(top).getMatrix();
      context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
      this._drawCachedSceneCanvas(context);
      context.restore();
    } else {
      this._drawChildren("drawScene", canvas2, top);
    }
    return this;
  }
  drawHit(can, top) {
    if (!this.shouldDrawHit(top)) {
      return this;
    }
    const layer = this.getLayer(), canvas2 = can || layer && layer.hitCanvas, context = canvas2 && canvas2.getContext(), cachedHitCanvas = this._getCachedHitCanvas(top);
    if (cachedHitCanvas) {
      context.save();
      const m = this.getAbsoluteTransform(top).getMatrix();
      context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
      this._drawCachedHitCanvas(context, cachedHitCanvas);
      context.restore();
    } else {
      this._drawChildren("drawHit", canvas2, top);
    }
    return this;
  }
  _drawChildren(drawMethod, canvas2, top) {
    const context = canvas2 && canvas2.getContext(), clipWidth = this.clipWidth(), clipHeight = this.clipHeight(), clipFunc = this.clipFunc(), hasClip = typeof clipWidth === "number" && typeof clipHeight === "number" || clipFunc;
    const selfCache = top === this;
    if (hasClip) {
      context.save();
      const transform = this.getAbsoluteTransform(top);
      let m = transform.getMatrix();
      context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
      context.beginPath();
      let clipArgs;
      if (clipFunc) {
        clipArgs = clipFunc.call(this, context, this);
      } else {
        const clipX = this.clipX();
        const clipY = this.clipY();
        context.rect(clipX || 0, clipY || 0, clipWidth, clipHeight);
      }
      context.clip.apply(context, clipArgs);
      m = transform.copy().invert().getMatrix();
      context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
    }
    const hasComposition = !selfCache && this.globalCompositeOperation() !== "source-over" && drawMethod === "drawScene";
    if (hasComposition) {
      context.save();
      context._applyGlobalCompositeOperation(this);
    }
    try {
      this._drawChildNodes(drawMethod, canvas2, top);
    } finally {
      if (hasComposition) {
        context.restore();
      }
      if (hasClip) {
        context.restore();
      }
    }
  }
  _drawChildNodes(drawMethod, canvas2, top) {
    var _a2;
    (_a2 = this.children) === null || _a2 === void 0 ? void 0 : _a2.forEach(function(child) {
      child[drawMethod](canvas2, top);
    });
  }
  getClientRect(config = {}) {
    var _a2;
    const cachedRect = this._getCachedSceneRect(config);
    if (cachedRect)
      return cachedRect;
    const skipTransform = config.skipTransform;
    const relativeTo = config.relativeTo;
    const [a3, b2, c2, d2] = this.getAbsoluteTransform().getMatrix();
    const measureTransformed = !skipTransform && (config._forDrawing || a3 * d2 - b2 * c2 === 0);
    let minX, minY, maxX, maxY;
    let selfRect = {
      x: Infinity,
      y: Infinity,
      width: 0,
      height: 0
    };
    const that = this;
    (_a2 = this.children) === null || _a2 === void 0 ? void 0 : _a2.forEach(function(child) {
      if (!child.visible()) {
        return;
      }
      const rect = child.getClientRect({
        relativeTo: measureTransformed ? relativeTo : that,
        _forDrawing: config._forDrawing,
        skipShadow: config.skipShadow,
        skipStroke: config.skipStroke
      });
      if (rect.width === 0 && rect.height === 0 || !isFinite(rect.x + rect.y + rect.width + rect.height)) {
        return;
      }
      if (minX === void 0) {
        minX = rect.x;
        minY = rect.y;
        maxX = rect.x + rect.width;
        maxY = rect.y + rect.height;
      } else {
        minX = Math.min(minX, rect.x);
        minY = Math.min(minY, rect.y);
        maxX = Math.max(maxX, rect.x + rect.width);
        maxY = Math.max(maxY, rect.y + rect.height);
      }
    });
    if (minX !== void 0) {
      selfRect = {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY
      };
    } else {
      selfRect = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    }
    if (!skipTransform && !measureTransformed) {
      return this._transformedRect(selfRect, relativeTo);
    }
    return selfRect;
  }
};
Factory.addComponentsGetterSetter(Container, "clip", [
  "x",
  "y",
  "width",
  "height"
]);
Factory.addGetterSetter(Container, "clipX", void 0, getNumberValidator());
Factory.addGetterSetter(Container, "clipY", void 0, getNumberValidator());
Factory.addGetterSetter(Container, "clipWidth", void 0, getNumberValidator());
Factory.addGetterSetter(Container, "clipHeight", void 0, getNumberValidator());
Factory.addGetterSetter(Container, "clipFunc");

// node_modules/konva/lib/Stage.js
var STAGE2 = "Stage";
var STRING = "string";
var PX = "px";
var MOUSEOUT = "mouseout";
var MOUSELEAVE2 = "mouseleave";
var MOUSEOVER = "mouseover";
var MOUSEENTER2 = "mouseenter";
var MOUSEMOVE = "mousemove";
var MOUSEDOWN = "mousedown";
var MOUSEUP = "mouseup";
var POINTERMOVE = "pointermove";
var POINTERDOWN = "pointerdown";
var POINTERUP = "pointerup";
var POINTERCANCEL = "pointercancel";
var LOSTPOINTERCAPTURE = "lostpointercapture";
var POINTEROUT = "pointerout";
var POINTERLEAVE2 = "pointerleave";
var POINTEROVER = "pointerover";
var POINTERENTER2 = "pointerenter";
var CONTEXTMENU = "contextmenu";
var TOUCHSTART = "touchstart";
var TOUCHEND = "touchend";
var TOUCHMOVE = "touchmove";
var TOUCHCANCEL = "touchcancel";
var WHEEL = "wheel";
var MAX_LAYERS_NUMBER = 5;
var EVENTS = [
  [MOUSEENTER2, "_pointerenter"],
  [MOUSEDOWN, "_pointerdown"],
  [MOUSEMOVE, "_pointermove"],
  [MOUSEUP, "_pointerup"],
  [MOUSELEAVE2, "_pointerleave"],
  [TOUCHSTART, "_pointerdown"],
  [TOUCHMOVE, "_pointermove"],
  [TOUCHEND, "_pointerup"],
  [TOUCHCANCEL, "_pointercancel"],
  [MOUSEOVER, "_pointerover"],
  [WHEEL, "_wheel"],
  [CONTEXTMENU, "_contextmenu"],
  [POINTERDOWN, "_pointerdown"],
  [POINTERMOVE, "_pointermove"],
  [POINTERUP, "_pointerup"],
  [POINTERCANCEL, "_pointercancel"],
  [POINTERLEAVE2, "_pointerleave"],
  [LOSTPOINTERCAPTURE, "_lostpointercapture"]
];
var EVENTS_MAP = {
  mouse: {
    [POINTEROUT]: MOUSEOUT,
    [POINTERLEAVE2]: MOUSELEAVE2,
    [POINTEROVER]: MOUSEOVER,
    [POINTERENTER2]: MOUSEENTER2,
    [POINTERMOVE]: MOUSEMOVE,
    [POINTERDOWN]: MOUSEDOWN,
    [POINTERUP]: MOUSEUP,
    [POINTERCANCEL]: "mousecancel",
    pointerclick: "click",
    pointerdblclick: "dblclick"
  },
  touch: {
    [POINTEROUT]: "touchout",
    [POINTERLEAVE2]: "touchleave",
    [POINTEROVER]: "touchover",
    [POINTERENTER2]: "touchenter",
    [POINTERMOVE]: TOUCHMOVE,
    [POINTERDOWN]: TOUCHSTART,
    [POINTERUP]: TOUCHEND,
    [POINTERCANCEL]: TOUCHCANCEL,
    pointerclick: "tap",
    pointerdblclick: "dbltap"
  },
  pointer: {
    [POINTEROUT]: POINTEROUT,
    [POINTERLEAVE2]: POINTERLEAVE2,
    [POINTEROVER]: POINTEROVER,
    [POINTERENTER2]: POINTERENTER2,
    [POINTERMOVE]: POINTERMOVE,
    [POINTERDOWN]: POINTERDOWN,
    [POINTERUP]: POINTERUP,
    [POINTERCANCEL]: POINTERCANCEL,
    pointerclick: "pointerclick",
    pointerdblclick: "pointerdblclick"
  }
};
var getEventsMap = (eventType) => {
  const type = Util._getEventType(eventType);
  if (type === "pointer") {
    return Konva.pointerEventsEnabled && EVENTS_MAP.pointer;
  }
  if (type === "touch") {
    return EVENTS_MAP.touch;
  }
  if (type === "mouse") {
    return EVENTS_MAP.mouse;
  }
};
function checkNoClip(attrs = {}) {
  if (attrs.clipFunc || attrs.clipWidth || attrs.clipHeight) {
    Util.warn("Stage does not support clipping. Please use clip for Layers or Groups.");
  }
  return attrs;
}
var NO_POINTERS_MESSAGE = `Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);`;
var stages = [];
var listeningWindows = /* @__PURE__ */ new WeakSet();
var listenToWindow = (win) => {
  if (!win || listeningWindows.has(win)) {
    return;
  }
  listeningWindows.add(win);
  DD._listenToWindow(win);
  win.document.addEventListener("visibilitychange", () => {
    stages.forEach((stage) => {
      stage.batchDraw();
    });
  });
};
var Stage = class extends Container {
  constructor(config) {
    super(checkNoClip(config));
    this._pointerPositions = [];
    this._changedPointerPositions = [];
    this._pointerStates = /* @__PURE__ */ new Map();
    this._lastClicks = {};
    this._buildDOM();
    this._bindContentEvents();
    stages.push(this);
    this.on("widthChange.konva heightChange.konva", this._resizeDOM);
    this.on("visibleChange.konva", this._checkVisibility);
    this.on("clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva", () => {
      checkNoClip(this.attrs);
    });
    this._checkVisibility();
  }
  _validateAdd(child) {
    const isLayer = child.getType() === "Layer";
    const isFastLayer = child.getType() === "FastLayer";
    const valid = isLayer || isFastLayer;
    if (!valid) {
      Util.throw("You may only add layers to the stage.");
    }
  }
  _checkVisibility() {
    if (!this.content) {
      return;
    }
    const style = this.visible() ? "" : "none";
    this.content.style.display = style;
  }
  /**
   * The window the stage is rendered in. It is not always the window Konva was
   * imported into: the container may belong to an iframe, or to a window
   * opened with `window.open`.
   */
  _getOwnerWindow() {
    var _a2;
    const element = this.content || this.container();
    return ((_a2 = element === null || element === void 0 ? void 0 : element.ownerDocument) === null || _a2 === void 0 ? void 0 : _a2.defaultView) || (Konva.isBrowser ? window : null);
  }
  /**
   * set container dom element which contains the stage wrapper div element
   * @method
   * @name Konva.Stage#setContainer
   * @param {DomElement} container can pass in a dom element or id string
   */
  setContainer(container) {
    if (typeof container === STRING) {
      let id2;
      if (container.charAt(0) === ".") {
        const className = container.slice(1);
        container = document.getElementsByClassName(className)[0];
      } else {
        if (container.charAt(0) !== "#") {
          id2 = container;
        } else {
          id2 = container.slice(1);
        }
        container = document.getElementById(id2);
      }
      if (!container) {
        throw "Can not find container in document with id " + id2;
      }
    }
    this._setAttr("container", container);
    if (this.content) {
      if (this.content.parentElement) {
        this.content.parentElement.removeChild(this.content);
      }
      container.appendChild(this.content);
      listenToWindow(this._getOwnerWindow());
    }
    return this;
  }
  shouldDrawHit() {
    return true;
  }
  /**
   * clear all layers
   * @method
   * @name Konva.Stage#clear
   */
  clear() {
    const layers = this.children, len = layers.length;
    for (let n2 = 0; n2 < len; n2++) {
      layers[n2].clear();
    }
    return this;
  }
  clone(obj) {
    if (!obj) {
      obj = {};
    }
    obj.container = typeof document !== "undefined" && document.createElement("div");
    return Container.prototype.clone.call(this, obj);
  }
  destroy() {
    var _a2;
    super.destroy();
    this._pointerStates.clear();
    this._lastClicks = {};
    const content = this.content;
    (_a2 = content === null || content === void 0 ? void 0 : content.parentNode) === null || _a2 === void 0 ? void 0 : _a2.removeChild(content);
    const index = stages.indexOf(this);
    if (index > -1) {
      stages.splice(index, 1);
    }
    Util.releaseCanvas(this.bufferHitCanvas._canvas);
    return this;
  }
  /**
   * returns ABSOLUTE pointer position which can be a touch position or mouse position
   * pointer position doesn't include any transforms (such as scale) of the stage
   * it is just a plain position of pointer relative to top-left corner of the canvas
   * @method
   * @name Konva.Stage#getPointerPosition
   * @returns {Vector2d|null}
   */
  getPointerPosition() {
    const pos = this._pointerPositions[0] || this._changedPointerPositions[0];
    if (!pos) {
      Util.warn(NO_POINTERS_MESSAGE);
      return null;
    }
    return {
      x: pos.x,
      y: pos.y
    };
  }
  _getPointerById(id2) {
    return this._pointerPositions.find((p2) => p2.id === id2);
  }
  getPointersPositions() {
    return this._pointerPositions;
  }
  getStage() {
    return this;
  }
  getContent() {
    return this.content;
  }
  _toKonvaCanvas(config) {
    config = { ...config };
    config.x = config.x || 0;
    config.y = config.y || 0;
    config.width = config.width || this.width();
    config.height = config.height || this.height();
    const canvas2 = new SceneCanvas({
      width: config.width,
      height: config.height,
      pixelRatio: config.pixelRatio || 1
    });
    const _context = canvas2.getContext()._context;
    const layers = this.children;
    if (config.x || config.y) {
      _context.translate(-1 * config.x, -1 * config.y);
    }
    layers.forEach(function(layer) {
      if (!layer.isVisible()) {
        return;
      }
      const layerCanvas = layer._toKonvaCanvas(config);
      _context.drawImage(layerCanvas._canvas, config.x, config.y, layerCanvas.getWidth() / layerCanvas.getPixelRatio(), layerCanvas.getHeight() / layerCanvas.getPixelRatio());
      Util.releaseCanvas(layerCanvas._canvas);
    });
    return canvas2;
  }
  /**
   * get visible intersection shape. This is the preferred
   *  method for determining if a point intersects a shape or not.
   *  It reads the hit canvas, so it finds what pointer events would: nodes with
   *  listening set to false or invisible nodes are not detected, a shape with opacity 0
   *  is, and `hitStrokeWidth` counts. The position is relative to the top left corner of the
   * stage container, like `stage.getPointerPosition()`, without the stage transform
   * @method
   * @name Konva.Stage#getIntersection
   * @param {Object} pos
   * @param {Number} pos.x
   * @param {Number} pos.y
   * @returns {Konva.Node}
   * @example
   * var shape = stage.getIntersection({x: 50, y: 50});
   */
  getIntersection(pos) {
    if (!pos) {
      return null;
    }
    const layers = this.children, len = layers.length, end = len - 1;
    for (let n2 = end; n2 >= 0; n2--) {
      const shape = layers[n2].getIntersection(pos);
      if (shape) {
        return shape;
      }
    }
    return null;
  }
  _resizeDOM() {
    const width = this.width();
    const height = this.height();
    if (this.content) {
      this.content.style.width = width + PX;
      this.content.style.height = height + PX;
    }
    this.children.forEach((layer) => {
      layer._setSize({ width, height });
      layer.draw();
    });
  }
  add(layer, ...rest) {
    if (arguments.length > 1) {
      for (let i2 = 0; i2 < arguments.length; i2++) {
        this.add(arguments[i2]);
      }
      return this;
    }
    super.add(layer);
    const length = this.children.length;
    if (length > MAX_LAYERS_NUMBER) {
      Util.warn("The stage has " + length + " layers. Recommended maximum number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group.");
    }
    layer._setSize({ width: this.width(), height: this.height() });
    layer.draw();
    if (Konva.isBrowser) {
      this.content.appendChild(layer.canvas._canvas);
    }
    return this;
  }
  getParent() {
    return null;
  }
  getLayer() {
    return null;
  }
  hasPointerCapture(pointerId) {
    return hasPointerCapture(pointerId, this);
  }
  setPointerCapture(pointerId) {
    setPointerCapture(pointerId, this);
  }
  releaseCapture(pointerId) {
    releaseCapture(pointerId, this);
  }
  /**
   * returns an array of layers
   * @method
   * @name Konva.Stage#getLayers
   */
  getLayers() {
    return this.getChildren();
  }
  _bindContentEvents() {
    if (!Konva.isBrowser) {
      return;
    }
    EVENTS.forEach(([event, methodName]) => {
      this.content.addEventListener(event, (evt) => {
        this._batchEvents(() => this[methodName](evt));
      }, { passive: false });
    });
  }
  _batchEvents(callback) {
    Util._batchEvents(this.eventBatchFunc(), callback);
  }
  _pointerenter(evt) {
    this.setPointersPositions(evt);
    const events = getEventsMap(evt.type);
    if (events) {
      this._fire(events.pointerenter, {
        evt,
        target: this,
        currentTarget: this
      });
    }
  }
  _pointerover(evt) {
    this.setPointersPositions(evt);
    const events = getEventsMap(evt.type);
    if (events) {
      this._fire(events.pointerover, {
        evt,
        target: this,
        currentTarget: this
      });
    }
  }
  _pointerEventsEnabled() {
    if (Konva.hitOnDragEnabled)
      return true;
    for (const { node, dragStatus } of DD._dragElements.values()) {
      if (dragStatus === "dragging" && node.getStage() === this)
        return false;
    }
    return !this.getLayers().some((layer) => {
      var _a2;
      return (_a2 = Konva["Transformer"]) === null || _a2 === void 0 ? void 0 : _a2._isLayerTransforming(layer);
    });
  }
  _cancelClick(pointerId, eventType) {
    const types = eventType ? [eventType] : ["mouse", "touch", "pointer"];
    for (const type of types) {
      const state = this._pointerStates.get(`${type}:${pointerId}`);
      if (!state)
        continue;
      state.clickStartShape = void 0;
      if (state.relatedPointer)
        state.relatedPointer.clickStartShape = void 0;
    }
  }
  _pointerleave(evt) {
    var _a2, _b;
    const events = getEventsMap(evt.type);
    const eventType = Util._getEventType(evt.type);
    if (!events) {
      return;
    }
    this.setPointersPositions(evt);
    const pointerId = (_a2 = this._changedPointerPositions[0]) === null || _a2 === void 0 ? void 0 : _a2.id;
    const key = `${eventType}:${pointerId}`;
    const state = this._pointerStates.get(key);
    const targetShape = ((_b = state === null || state === void 0 ? void 0 : state.targetShape) === null || _b === void 0 ? void 0 : _b.getStage()) === this ? state.targetShape : void 0;
    const eventsEnabled = this._pointerEventsEnabled() || evt.pointerType === "touch" && !(state === null || state === void 0 ? void 0 : state.downPosition);
    if (eventsEnabled) {
      if ((state === null || state === void 0 ? void 0 : state.clickStartShape) !== void 0) {
        state.targetShape = void 0;
      } else {
        this._pointerStates.delete(key);
      }
    }
    if (targetShape && eventsEnabled) {
      targetShape._fireAndBubble(events.pointerout, { evt, pointerId });
      targetShape._fireAndBubble(events.pointerleave, { evt, pointerId });
      this._fire(events.pointerleave, {
        evt,
        target: this,
        currentTarget: this
      });
    } else if (eventsEnabled) {
      this._fire(events.pointerleave, {
        evt,
        target: this,
        currentTarget: this
      });
      this._fire(events.pointerout, {
        evt,
        target: this,
        currentTarget: this
      });
    }
    this.pointerPos = null;
    this._pointerPositions = [];
    this._changedPointerPositions = [];
    this._pointerEventType = void 0;
  }
  _pointerdown(evt) {
    const events = getEventsMap(evt.type);
    const eventType = Util._getEventType(evt.type);
    if (!events) {
      return;
    }
    this.setPointersPositions(evt);
    let triggeredOnShape = false;
    this._changedPointerPositions.forEach((pos) => {
      var _a2;
      const shape = this.getIntersection(pos);
      const key = `${eventType}:${pos.id}`;
      const state = {
        targetShape: (_a2 = this._pointerStates.get(key)) === null || _a2 === void 0 ? void 0 : _a2.targetShape,
        clickStartShape: shape && shape.isListening() ? shape : null,
        lastClick: this._lastClicks[eventType],
        downPosition: pos,
        pointerType: evt.pointerType
      };
      this._pointerStates.delete(key);
      if (eventType !== "pointer") {
        for (const [pointerKey, pointer] of [
          ...this._pointerStates
        ].reverse()) {
          if (!pointerKey.startsWith("pointer:") || !pointer.downPosition || eventType === "touch" && pointer.relatedPointer)
            continue;
          const matches = eventType === "mouse" ? pointer.pointerType !== "touch" : pointer.pointerType === "touch" && pointer.downPosition.x === pos.x && pointer.downPosition.y === pos.y;
          if (matches) {
            state.relatedPointer = pointer;
            pointer.relatedPointer = state;
            if (pointer.clickStartShape === void 0)
              state.clickStartShape = void 0;
            break;
          }
        }
      }
      this._pointerStates.set(key, state);
      for (const elem of DD._dragElements.values()) {
        if (elem.dragStatus === "dragging" && (elem.pointerId === void 0 || elem.pointerEventType === eventType && elem.pointerId === pos.id || elem.pointerEventType === "mouse" && eventType === "pointer" && state.pointerType !== "touch") && elem.node.getStage() === this) {
          if (elem.pointerId === void 0 && eventType !== "pointer") {
            elem.pointerId = pos.id;
            elem.pointerEventType = eventType;
          }
          this._cancelClick(pos.id, eventType);
        }
      }
      if (!shape || !shape.isListening()) {
        return;
      }
      if (Konva.capturePointerEventsEnabled) {
        shape.setPointerCapture(pos.id);
      }
      shape._fireAndBubble(events.pointerdown, {
        evt,
        pointerId: pos.id
      });
      triggeredOnShape = true;
      const isTouch = evt.type.indexOf("touch") >= 0;
      if (shape.preventDefault() && evt.cancelable && isTouch) {
        evt.preventDefault();
      }
    });
    if (!triggeredOnShape) {
      this._fire(events.pointerdown, {
        evt,
        target: this,
        currentTarget: this,
        pointerId: this._changedPointerPositions[0].id
      });
    }
  }
  _pointermove(evt) {
    const events = getEventsMap(evt.type);
    const eventType = Util._getEventType(evt.type);
    if (!events) {
      return;
    }
    const isTouchPointer = evt.type.indexOf("touch") >= 0 || evt.pointerType === "touch";
    if (evt.cancelable && isTouchPointer) {
      for (const { node, dragStatus } of DD._dragElements.values()) {
        if (dragStatus === "dragging" && node.getStage() === this && node.preventDefault()) {
          evt.preventDefault();
          break;
        }
      }
    }
    this.setPointersPositions(evt);
    const eventsEnabled = this._pointerEventsEnabled();
    if (!eventsEnabled) {
      return;
    }
    const processedShapesIds = {};
    let triggeredOnShape = false;
    this._changedPointerPositions.forEach((pos) => {
      var _a2;
      const key = `${eventType}:${pos.id}`;
      let state = this._pointerStates.get(key);
      if (!state) {
        state = {};
        this._pointerStates.set(key, state);
      }
      const shape = getCapturedShape(pos.id) || this.getIntersection(pos);
      const targetShape = state.targetShape === shape || ((_a2 = state.targetShape) === null || _a2 === void 0 ? void 0 : _a2.getStage()) === this ? state.targetShape : void 0;
      const pointerId = pos.id;
      const event = { evt, pointerId };
      const differentTarget = targetShape !== shape;
      state.targetShape = shape && shape.isListening() ? shape : void 0;
      if (differentTarget && targetShape) {
        targetShape._fireAndBubble(events.pointerout, { ...event }, shape);
        targetShape._fireAndBubble(events.pointerleave, { ...event }, shape);
      }
      if (shape && shape.isListening()) {
        triggeredOnShape = true;
        if (differentTarget) {
          shape._fireAndBubble(events.pointerover, { ...event }, targetShape);
          shape._fireAndBubble(events.pointerenter, { ...event }, targetShape);
        }
        if (!processedShapesIds[shape._id]) {
          processedShapesIds[shape._id] = true;
          shape._fireAndBubble(events.pointermove, { ...event });
        }
      } else {
        if (targetShape) {
          this._fire(events.pointerover, {
            evt,
            target: this,
            currentTarget: this,
            pointerId
          });
        }
      }
    });
    if (!triggeredOnShape) {
      this._fire(events.pointermove, {
        evt,
        target: this,
        currentTarget: this,
        pointerId: this._changedPointerPositions[0].id
      });
    }
  }
  _pointerup(evt) {
    const events = getEventsMap(evt.type);
    const eventType = Util._getEventType(evt.type);
    if (!events) {
      return;
    }
    this.setPointersPositions(evt);
    const processedShapesIds = {};
    let skipPointerUpTrigger = false;
    this._changedPointerPositions.forEach((pos) => {
      var _a2;
      const key = `${eventType}:${pos.id}`;
      const state = this._pointerStates.get(key);
      const listenClick = (state === null || state === void 0 ? void 0 : state.clickStartShape) !== void 0;
      const clickStartShape = state === null || state === void 0 ? void 0 : state.clickStartShape;
      if ((state === null || state === void 0 ? void 0 : state.targetShape) && eventType !== "touch") {
        this._pointerStates.set(key, { targetShape: state.targetShape });
      } else {
        this._pointerStates.delete(key);
      }
      const shape = getCapturedShape(pos.id) || this.getIntersection(pos);
      const alreadyReleased = shape && processedShapesIds[shape._id];
      if (shape) {
        shape.releaseCapture(pos.id);
        processedShapesIds[shape._id] = true;
      }
      const pointerId = pos.id;
      const event = { evt, pointerId };
      const clickTarget = shape && shape.isListening() ? shape : null;
      const lastClick = this._lastClicks[eventType];
      const canClick = listenClick && (!clickTarget || clickStartShape === clickTarget);
      const fireDblClick = canClick && lastClick && (state === null || state === void 0 ? void 0 : state.lastClick) === lastClick && lastClick.shape === clickTarget && Date.now() - lastClick.time < Konva.dblClickWindow;
      if (canClick) {
        this._lastClicks[eventType] = fireDblClick ? void 0 : { shape: clickTarget, time: Date.now() };
      }
      if (shape && shape.isListening()) {
        skipPointerUpTrigger = true;
        if (!alreadyReleased) {
          shape._fireAndBubble(events.pointerup, { ...event });
        }
        if (listenClick && clickStartShape === shape) {
          shape._fireAndBubble(events.pointerclick, { ...event });
          if (fireDblClick) {
            shape._fireAndBubble(events.pointerdblclick, { ...event });
          }
        }
      } else {
        if (!skipPointerUpTrigger) {
          this._fire(events.pointerup, {
            evt,
            target: this,
            currentTarget: this,
            pointerId: this._changedPointerPositions[0].id
          });
          skipPointerUpTrigger = true;
        }
        if (listenClick) {
          this._fire(events.pointerclick, {
            evt,
            target: this,
            currentTarget: this,
            pointerId
          });
        }
        if (fireDblClick) {
          this._fire(events.pointerdblclick, {
            evt,
            target: this,
            currentTarget: this,
            pointerId
          });
        }
      }
      if (eventType === "touch" && ((_a2 = state === null || state === void 0 ? void 0 : state.targetShape) === null || _a2 === void 0 ? void 0 : _a2.getStage()) === this) {
        state.targetShape._fireAndBubble(events.pointerout, { ...event });
        state.targetShape._fireAndBubble(events.pointerleave, { ...event });
      }
    });
    if (!skipPointerUpTrigger) {
      this._fire(events.pointerup, {
        evt,
        target: this,
        currentTarget: this,
        pointerId: this._changedPointerPositions[0].id
      });
    }
    if (evt.cancelable && eventType !== "touch" && eventType !== "pointer") {
      evt.preventDefault();
    }
  }
  _contextmenu(evt) {
    this.setPointersPositions(evt);
    const shape = this.getIntersection(this.getPointerPosition());
    if (shape && shape.isListening()) {
      shape._fireAndBubble(CONTEXTMENU, { evt });
    } else {
      this._fire(CONTEXTMENU, {
        evt,
        target: this,
        currentTarget: this
      });
    }
  }
  _wheel(evt) {
    this.setPointersPositions(evt);
    const shape = this.getIntersection(this.getPointerPosition());
    if (shape && shape.isListening()) {
      shape._fireAndBubble(WHEEL, { evt });
    } else {
      this._fire(WHEEL, {
        evt,
        target: this,
        currentTarget: this
      });
    }
  }
  _pointercancel(evt) {
    this.setPointersPositions(evt);
    const events = getEventsMap(evt.type);
    this._changedPointerPositions.forEach((pos) => {
      var _a2;
      const eventType = Util._getEventType(evt.type);
      const key = `${eventType}:${pos.id}`;
      this._cancelClick(pos.id, eventType);
      const targetShape = (_a2 = this._pointerStates.get(key)) === null || _a2 === void 0 ? void 0 : _a2.targetShape;
      if (targetShape && eventType !== "touch") {
        this._pointerStates.set(key, { targetShape });
      } else {
        this._pointerStates.delete(key);
      }
      const shape = getCapturedShape(pos.id) || this.getIntersection(pos);
      const event = { evt, pointerId: pos.id };
      if (shape) {
        if (events)
          shape._fireAndBubble(events.pointercancel, { ...event });
        shape._fireAndBubble(POINTERUP, { ...event });
      } else if (events) {
        this._fire(events.pointercancel, {
          ...event,
          target: this,
          currentTarget: this
        });
      }
      releaseCapture(pos.id);
      if (events && eventType === "touch" && (targetShape === null || targetShape === void 0 ? void 0 : targetShape.getStage()) === this) {
        targetShape._fireAndBubble(events.pointerout, { ...event });
        targetShape._fireAndBubble(events.pointerleave, { ...event });
      }
    });
  }
  _lostpointercapture(evt) {
    const captured = getCapturedShape(evt.pointerId, this);
    if (captured) {
      releaseCapture(evt.pointerId);
    }
  }
  /**
   * manually register pointers positions (mouse/touch) in the stage.
   * So you can use stage.getPointerPosition(). Usually you don't need to use that method
   * because all internal events are automatically registered. It may be useful if event
   * is triggered outside of the stage, but you still want to use Konva methods to get pointers position.
   * @method
   * @name Konva.Stage#setPointersPositions
   * @param {Object} evt Event object
   * @example
   *
   * window.addEventListener('mousemove', (e) => {
   *   stage.setPointersPositions(e);
   * });
   */
  setPointersPositions(evt) {
    const contentPosition = this._getContentPosition();
    let x2 = null, y = null;
    evt = evt ? evt : window.event;
    if (evt.touches !== void 0) {
      this._pointerEventType = "touch";
      this._pointerPositions = [];
      this._changedPointerPositions = [];
      Array.prototype.forEach.call(evt.touches, (touch) => {
        this._pointerPositions.push({
          id: touch.identifier,
          x: (touch.clientX - contentPosition.left) / contentPosition.scaleX,
          y: (touch.clientY - contentPosition.top) / contentPosition.scaleY
        });
      });
      Array.prototype.forEach.call(evt.changedTouches || evt.touches, (touch) => {
        this._changedPointerPositions.push({
          id: touch.identifier,
          x: (touch.clientX - contentPosition.left) / contentPosition.scaleX,
          y: (touch.clientY - contentPosition.top) / contentPosition.scaleY
        });
      });
    } else {
      this._pointerEventType = evt.pointerId === void 0 ? "mouse" : "pointer";
      x2 = (evt.clientX - contentPosition.left) / contentPosition.scaleX;
      y = (evt.clientY - contentPosition.top) / contentPosition.scaleY;
      this.pointerPos = {
        x: x2,
        y
      };
      this._pointerPositions = [{ x: x2, y, id: Util._getFirstPointerId(evt) }];
      this._changedPointerPositions = [
        { x: x2, y, id: Util._getFirstPointerId(evt) }
      ];
    }
  }
  _setPointerPosition(evt) {
    Util.warn('Method _setPointerPosition is deprecated. Use "stage.setPointersPositions(event)" instead.');
    this.setPointersPositions(evt);
  }
  _getContentPosition() {
    if (!this.content || !this.content.getBoundingClientRect) {
      return {
        top: 0,
        left: 0,
        scaleX: 1,
        scaleY: 1
      };
    }
    const rect = this.content.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      // sometimes clientWidth can be equals to 0
      // i saw it in react-konva test, looks like it is because of hidden testing element
      scaleX: rect.width / this.content.clientWidth || 1,
      scaleY: rect.height / this.content.clientHeight || 1
    };
  }
  _buildDOM() {
    this.bufferHitCanvas = new HitCanvas({
      pixelRatio: 1,
      width: 0,
      height: 0
    });
    if (!Konva.isBrowser) {
      return;
    }
    const container = this.container();
    if (!container) {
      throw "Stage has no container. A container is required.";
    }
    container.innerHTML = "";
    this.content = container.ownerDocument.createElement("div");
    this.content.style.position = "relative";
    this.content.style.userSelect = "none";
    this.content.className = "konvajs-content";
    this.content.setAttribute("role", "presentation");
    container.appendChild(this.content);
    listenToWindow(this._getOwnerWindow());
    this._resizeDOM();
  }
  // currently cache function is now working for stage, because stage has no its own canvas element
  cache() {
    Util.warn("Cache function is not allowed for stage. You may use cache only for layers, groups and shapes.");
    return this;
  }
  clearCache() {
    return this;
  }
  /**
   * batch draw
   * @method
   * @name Konva.Stage#batchDraw
   * @return {Konva.Stage} this
   */
  batchDraw() {
    var _a2;
    (_a2 = this.children) === null || _a2 === void 0 ? void 0 : _a2.forEach(function(layer) {
      layer.batchDraw();
    });
    return this;
  }
};
Stage.prototype.nodeType = STAGE2;
_registerNode(Stage);
Factory.addGetterSetter(Stage, "container");
Factory.addGetterSetter(Stage, "eventBatchFunc");

// node_modules/konva/lib/Shape.js
var HAS_SHADOW = "hasShadow";
var HAS_FILL = "hasFill";
var HAS_STROKE = "hasStroke";
var SHADOW_RGBA = "shadowRGBA";
var patternImage = "patternImage";
var linearGradient = "linearGradient";
var radialGradient = "radialGradient";
var dummyContext;
function getDummyContext() {
  if (dummyContext) {
    return dummyContext;
  }
  dummyContext = Util.createCanvasElement().getContext("2d");
  return dummyContext;
}
var shapes = {};
function _fillFunc(context) {
  const fillRule = this.attrs.fillRule;
  if (fillRule) {
    context.fill(fillRule);
  } else {
    context.fill();
  }
}
function _strokeFunc(context) {
  context.stroke();
}
function _clearHasShadowCache() {
  this._clearCache(HAS_SHADOW);
}
function _clearHasFillCache() {
  this._clearCache(HAS_FILL);
}
function _clearHasStrokeCache() {
  this._clearCache(HAS_STROKE);
}
function _clearGetShadowRGBACache() {
  this._clearCache(SHADOW_RGBA);
}
function _clearFillPatternCache() {
  this._clearCache(patternImage);
}
function _clearLinearGradientCache() {
  this._clearCache(linearGradient);
}
function _clearRadialGradientCache() {
  this._clearCache(radialGradient);
}
var Shape = class _Shape extends Node {
  constructor(config) {
    super(config);
    let key;
    let attempts = 0;
    while (true) {
      key = Util.getHitColor();
      if (key && !(key in shapes)) {
        break;
      }
      attempts++;
      if (attempts >= 1e4) {
        Util.warn("Failed to find a unique color key for a shape. Konva may work incorrectly. Most likely your browser is using canvas farbling. Consider disabling it.");
        key = Util.getRandomColor();
        break;
      }
    }
    this.colorKey = key;
    shapes[key] = this;
  }
  /**
   * @deprecated
   */
  getContext() {
    Util.warn("shape.getContext() method is deprecated. Please do not use it.");
    return this.getLayer().getContext();
  }
  /**
   * @deprecated
   */
  getCanvas() {
    Util.warn("shape.getCanvas() method is deprecated. Please do not use it.");
    return this.getLayer().getCanvas();
  }
  getSceneFunc() {
    return this.attrs.sceneFunc || this["_sceneFunc"];
  }
  getHitFunc() {
    return this.attrs.hitFunc || this["_hitFunc"];
  }
  /**
   * returns whether or not a shadow will be rendered
   * @method
   * @name Konva.Shape#hasShadow
   * @returns {Boolean}
   */
  hasShadow() {
    return this._getCache(HAS_SHADOW, this._hasShadow);
  }
  _hasShadow() {
    return this.shadowEnabled() && this.shadowOpacity() !== 0 && !!(this.shadowColor() || this.shadowBlur() || this.shadowOffsetX() || this.shadowOffsetY());
  }
  _getFillPattern() {
    return this._getCache(patternImage, this.__getFillPattern);
  }
  __getFillPattern() {
    if (this.fillPatternImage()) {
      const ctx = getDummyContext();
      const pattern = ctx.createPattern(this.fillPatternImage(), this.fillPatternRepeat() || "repeat");
      if (pattern && pattern.setTransform) {
        const tr = new Transform();
        tr.translate(this.fillPatternX(), this.fillPatternY());
        tr.rotate(Konva.getAngle(this.fillPatternRotation()));
        tr.scale(this.fillPatternScaleX(), this.fillPatternScaleY());
        tr.translate(-1 * this.fillPatternOffsetX(), -1 * this.fillPatternOffsetY());
        const m = tr.getMatrix();
        const matrix = typeof DOMMatrix === "undefined" ? {
          a: m[0],
          // Horizontal scaling. A value of 1 results in no scaling.
          b: m[1],
          // Vertical skewing.
          c: m[2],
          // Horizontal skewing.
          d: m[3],
          e: m[4],
          // Horizontal translation (moving).
          f: m[5]
          // Vertical translation (moving).
        } : new DOMMatrix(m);
        pattern.setTransform(matrix);
      }
      return pattern;
    }
  }
  _getLinearGradient() {
    return this._getCache(linearGradient, this.__getLinearGradient);
  }
  __getLinearGradient() {
    const colorStops = this.fillLinearGradientColorStops();
    if (colorStops) {
      const ctx = getDummyContext();
      const start = this.fillLinearGradientStartPoint();
      const end = this.fillLinearGradientEndPoint();
      const grd = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
      for (let n2 = 0; n2 < colorStops.length; n2 += 2) {
        grd.addColorStop(colorStops[n2], colorStops[n2 + 1]);
      }
      return grd;
    }
  }
  _getRadialGradient() {
    return this._getCache(radialGradient, this.__getRadialGradient);
  }
  __getRadialGradient() {
    const colorStops = this.fillRadialGradientColorStops();
    if (colorStops) {
      const ctx = getDummyContext();
      const start = this.fillRadialGradientStartPoint();
      const end = this.fillRadialGradientEndPoint();
      const grd = ctx.createRadialGradient(start.x, start.y, this.fillRadialGradientStartRadius(), end.x, end.y, this.fillRadialGradientEndRadius());
      for (let n2 = 0; n2 < colorStops.length; n2 += 2) {
        grd.addColorStop(colorStops[n2], colorStops[n2 + 1]);
      }
      return grd;
    }
  }
  getShadowRGBA() {
    return this._getCache(SHADOW_RGBA, this._getShadowRGBA);
  }
  _getShadowRGBA() {
    if (!this.hasShadow()) {
      return;
    }
    const rgba = Util.colorToRGBA(this.shadowColor());
    if (rgba) {
      return "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a * (this.shadowOpacity() || 1) + ")";
    }
  }
  /**
   * returns whether or not the shape will be filled
   * @method
   * @name Konva.Shape#hasFill
   * @returns {Boolean}
   */
  hasFill() {
    return this._getCache(HAS_FILL, this._hasFill);
  }
  _hasFill() {
    return this.fillEnabled() && !!(this.fill() || this.fillPatternImage() || this.fillLinearGradientColorStops() || this.fillRadialGradientColorStops());
  }
  /**
   * returns whether or not the shape will be stroked
   * @method
   * @name Konva.Shape#hasStroke
   * @returns {Boolean}
   */
  hasStroke() {
    return this._getCache(HAS_STROKE, this._hasStroke);
  }
  _hasStroke() {
    return this.strokeEnabled() && !!(this.strokeWidth() && (this.stroke() || this.strokeLinearGradientColorStops()));
  }
  hasHitStroke() {
    const width = this.hitStrokeWidth();
    if (width === "auto") {
      return this.hasStroke();
    }
    return this.strokeEnabled() && !!width;
  }
  /**
   * determines if point is in the shape, regardless if other shapes are on top of it.  Note: because
   *  this method clears a temporary canvas and then redraws the shape, it performs very poorly if executed many times
   *  consecutively.  Please use the {@link Konva.Stage#getIntersection} method if at all possible
   *  because it performs much better. A shape that is invisible, not listening or not on a stage
   *  never intersects
   * @method
   * @name Konva.Shape#intersects
   * @param {Object} point
   * @param {Number} point.x
   * @param {Number} point.y
   * @returns {Boolean}
   */
  intersects(point) {
    const stage = this.getStage();
    if (!stage) {
      return false;
    }
    const bufferHitCanvas = stage.bufferHitCanvas;
    bufferHitCanvas.setSizeIfChanged(stage.width(), stage.height());
    bufferHitCanvas.getContext().clear();
    this.drawHit(bufferHitCanvas);
    const p2 = bufferHitCanvas.context.getImageData(Math.floor(point.x), Math.floor(point.y), 1, 1).data;
    return p2[3] > 0;
  }
  destroy() {
    Node.prototype.destroy.call(this);
    delete shapes[this.colorKey];
    delete this.colorKey;
    return this;
  }
  // why do we need buffer canvas?
  // it give better result when a shape has
  // stroke with fill and with some opacity
  _useBufferCanvas(forceFill, opacity = this.getAbsoluteOpacity()) {
    var _a2;
    const perfectDrawEnabled = (_a2 = this.attrs.perfectDrawEnabled) !== null && _a2 !== void 0 ? _a2 : true;
    if (!perfectDrawEnabled) {
      return false;
    }
    const hasFill = forceFill || this.hasFill();
    const hasStroke = this.hasStroke();
    const isTransparent = !this._isUnderCache && opacity !== 1;
    if (hasFill && hasStroke && isTransparent) {
      return true;
    }
    const hasShadow = this.hasShadow();
    const strokeForShadow = this.shadowForStrokeEnabled();
    if (hasFill && hasStroke && hasShadow && strokeForShadow) {
      return true;
    }
    return false;
  }
  setStrokeHitEnabled(val) {
    Util.warn("strokeHitEnabled property is deprecated. Please use hitStrokeWidth instead.");
    if (val) {
      this.hitStrokeWidth("auto");
    } else {
      this.hitStrokeWidth(0);
    }
  }
  getStrokeHitEnabled() {
    if (this.hitStrokeWidth() === 0) {
      return false;
    } else {
      return true;
    }
  }
  /**
   * return self rectangle (x, y, width, height) of shape.
   * This method are not taken into account transformation and styles.
   * @method
   * @name Konva.Shape#getSelfRect
   * @returns {Object} rect with {x, y, width, height} properties
   * @example
   *
   * rect.getSelfRect();  // return {x:0, y:0, width:rect.width(), height:rect.height()}
   * circle.getSelfRect();  // return {x: - circle.width() / 2, y: - circle.height() / 2, width:circle.width(), height:circle.height()}
   *
   */
  getSelfRect() {
    const selfRectFunc = this.attrs.selfRectFunc;
    if (selfRectFunc)
      return { ...selfRectFunc.call(this, this) };
    const size = this.size();
    return {
      x: this._centroid ? -size.width / 2 : 0,
      y: this._centroid ? -size.height / 2 : 0,
      width: size.width,
      height: size.height
    };
  }
  _getSelfRectForDrawing() {
    return this.getSelfRect();
  }
  getClientRect(config = {}) {
    const cachedRect = this._getCachedSceneRect(config);
    if (cachedRect)
      return cachedRect;
    const skipTransform = config.skipTransform;
    const relativeTo = config.relativeTo;
    const forDrawing = config._forDrawing;
    const fillRect = !forDrawing ? this.getSelfRect() : this.strokeScaleEnabled() ? new Transform()._getTransformedRect(this._getSelfRectForDrawing()) : this._transformedRect(this._getSelfRectForDrawing(), relativeTo);
    const applyStroke = !config.skipStroke && this.hasStroke();
    const strokeWidth = applyStroke ? forDrawing ? this._getStrokePadding() * 2 : this.strokeWidth() : 0;
    let strokeWidthX = strokeWidth;
    let strokeWidthY = strokeWidth;
    let collapsedStroke;
    if (!forDrawing && strokeWidth && !this.strokeScaleEnabled()) {
      let top = this;
      while (top && !top.isCached() && !top._isUnderCache)
        top = top.parent;
      const [a3, b2, c2, d2] = this.getAbsoluteTransform(top).getMatrix();
      const determinant = Math.abs(a3 * d2 - b2 * c2);
      if (determinant) {
        strokeWidthX *= Math.hypot(c2, d2) / determinant;
        strokeWidthY *= Math.hypot(a3, b2) / determinant;
      } else if (!skipTransform) {
        strokeWidthX = strokeWidthY = 0;
        collapsedStroke = top ? top.getAbsoluteTransform().copy() : new Transform();
        if (relativeTo) {
          const relativeTransform = relativeTo.getAbsoluteTransform();
          const [a4, b3, c3, d3] = relativeTransform.getMatrix();
          collapsedStroke = a4 * d3 - b3 * c3 ? relativeTransform.copy().invert().multiply(collapsedStroke) : new Transform();
        }
      }
    }
    let rect = {
      x: fillRect.x - strokeWidthX / 2,
      y: fillRect.y - strokeWidthY / 2,
      width: fillRect.width + strokeWidthX,
      height: fillRect.height + strokeWidthY
    };
    if (forDrawing && this.strokeScaleEnabled()) {
      rect = this._transformedRect(rect, relativeTo);
    }
    if (!config.skipShadow && this.hasShadow()) {
      const scale = forDrawing ? this.getAbsoluteScale() : { x: 1, y: 1 };
      const dx = this.shadowOffsetX() * scale.x;
      const dy = this.shadowOffsetY() * scale.y;
      const blur = this.shadowBlur() * (forDrawing ? 2 * Math.min(Math.abs(scale.x), Math.abs(scale.y)) : 1);
      rect.x += Math.min(0, dx) - blur;
      rect.y += Math.min(0, dy) - blur;
      rect.width += Math.abs(dx) + blur * 2;
      rect.height += Math.abs(dy) + blur * 2;
    }
    if (forDrawing) {
      return rect;
    }
    if (!skipTransform) {
      const transformed = this._transformedRect(rect, relativeTo);
      if (collapsedStroke) {
        const [a3, b2, c2, d2] = collapsedStroke.getMatrix();
        const x2 = strokeWidth * Math.hypot(a3, c2) / 2;
        const y = strokeWidth * Math.hypot(b2, d2) / 2;
        transformed.x -= x2;
        transformed.y -= y;
        transformed.width += x2 * 2;
        transformed.height += y * 2;
      }
      return transformed;
    }
    return rect;
  }
  _getStrokePadding(miterLimit = this.miterLimit() || 10) {
    if (this.attrs.sceneFunc)
      miterLimit = this.miterLimit() || 10;
    return Math.abs(this.strokeWidth()) / 2 * Math.max(this.lineCap() === "square" ? Math.SQRT2 : 1, (this.lineJoin() || "miter") === "miter" ? miterLimit : 1);
  }
  drawScene(can, top) {
    const layer = this.getLayer();
    const canvas2 = can || layer.getCanvas(), context = canvas2.getContext(), cachedCanvas = this._getCanvasCache(), drawFunc = this.getSceneFunc(), hasShadow = this.hasShadow();
    const cachingSelf = top === this;
    if (!(top ? this._isVisible(top) : this.isVisible()) && !cachingSelf) {
      return this;
    }
    if (cachedCanvas) {
      context.save();
      const m = this.getAbsoluteTransform(top).getMatrix();
      context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
      this._drawCachedSceneCanvas(context);
      context.restore();
      return this;
    }
    if (!drawFunc) {
      return this;
    }
    context.save();
    try {
      if (canvas2.width && canvas2.height && this._useBufferCanvas(void 0, context._getOpacity(this))) {
        const bounded = !!context._opacityRoot || !!this.attrs.selfRectFunc && this.getSelfRect === _Shape.prototype.getSelfRect || !this.attrs.sceneFunc && !this.attrs.charRenderFunc && _boundedShapes.has(this.constructor);
        const bc = canvas2._prepareIsolationCanvas(bounded ? this.getClientRect({
          _forDrawing: true,
          relativeTo: top,
          skipShadow: true
        }) : void 0);
        const bufferContext = bc.getContext();
        bufferContext.save();
        bufferContext._applyLineJoin(this);
        bufferContext._applyMiterLimit(this);
        const o2 = this.getAbsoluteTransform(top).getMatrix();
        bufferContext.transform(o2[0], o2[1], o2[2], o2[3], o2[4], o2[5]);
        drawFunc.call(this, bufferContext, this);
        bufferContext.restore();
        if (hasShadow) {
          context._applyShadow(this);
        }
        if (!cachingSelf) {
          context._applyOpacity(this);
          context._applyGlobalCompositeOperation(this);
        }
        context._drawDeviceBuffer(bc);
      } else {
        context._applyLineJoin(this);
        context._applyMiterLimit(this);
        if (!cachingSelf) {
          const o2 = this.getAbsoluteTransform(top).getMatrix();
          context.transform(o2[0], o2[1], o2[2], o2[3], o2[4], o2[5]);
          context._applyOpacity(this);
          context._applyGlobalCompositeOperation(this);
        }
        if (hasShadow) {
          context._applyShadow(this);
        }
        drawFunc.call(this, context, this);
      }
    } catch (error) {
      canvas2._releaseIsolationCanvas();
      throw error;
    } finally {
      context.restore();
    }
    return this;
  }
  drawHit(can, top) {
    if (!this.shouldDrawHit(top)) {
      return this;
    }
    const layer = this.getLayer(), canvas2 = can || layer.hitCanvas, context = canvas2 && canvas2.getContext(), drawFunc = this.hitFunc() || this.sceneFunc(), cachedHitCanvas = this._getCachedHitCanvas(top);
    if (!this.colorKey) {
      Util.warn("Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. If you want to reuse shape you should call remove() instead of destroy()");
    }
    if (cachedHitCanvas) {
      context.save();
      const m = this.getAbsoluteTransform(top).getMatrix();
      context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
      this._drawCachedHitCanvas(context, cachedHitCanvas);
      context.restore();
      return this;
    }
    if (!drawFunc) {
      return this;
    }
    context.save();
    context._applyLineJoin(this);
    context._applyMiterLimit(this);
    const selfCache = this === top;
    if (!selfCache) {
      const o2 = this.getAbsoluteTransform(top).getMatrix();
      context.transform(o2[0], o2[1], o2[2], o2[3], o2[4], o2[5]);
    }
    try {
      drawFunc.call(this, context, this);
    } finally {
      context.restore();
    }
    return this;
  }
  /**
   * draw hit graph using the cached scene canvas
   * @method
   * @name Konva.Shape#drawHitFromCache
   * @param {Integer} alphaThreshold alpha channel threshold that determines whether or not
   *  a pixel should be drawn onto the hit graph.  Must be a value between 0 and 255.
   *  The default is 0
   * @returns {Konva.Shape}
   * @example
   * shape.cache();
   * shape.drawHitFromCache();
   */
  drawHitFromCache(alphaThreshold = 0) {
    const sceneCanvas = this._getCachedSceneCanvas(), hitCanvas = this._getCachedHitCanvas(), hitContext = hitCanvas.getContext(), hitWidth = hitCanvas.getWidth(), hitHeight = hitCanvas.getHeight();
    hitContext.clear();
    hitContext.drawImage(sceneCanvas._canvas, 0, 0, hitWidth / hitCanvas.pixelRatio, hitHeight / hitCanvas.pixelRatio);
    try {
      const hitImageData = hitContext.getImageData(0, 0, hitWidth, hitHeight);
      const hitData = hitImageData.data;
      const len = hitData.length;
      const rgbColorKey = Util._hexToRgb(this.colorKey);
      for (let i2 = 0; i2 < len; i2 += 4) {
        const alpha = hitData[i2 + 3];
        if (alpha > alphaThreshold) {
          hitData[i2] = rgbColorKey.r;
          hitData[i2 + 1] = rgbColorKey.g;
          hitData[i2 + 2] = rgbColorKey.b;
          hitData[i2 + 3] = 255;
        } else {
          hitData[i2 + 3] = 0;
        }
      }
      hitContext.putImageData(hitImageData, 0, 0);
    } catch (e2) {
      Util.error("Unable to draw hit graph from cached scene canvas. " + e2.message);
    }
    return this;
  }
  hasPointerCapture(pointerId) {
    return hasPointerCapture(pointerId, this);
  }
  setPointerCapture(pointerId) {
    setPointerCapture(pointerId, this);
  }
  releaseCapture(pointerId) {
    releaseCapture(pointerId, this);
  }
};
Shape.prototype._fillFunc = _fillFunc;
Shape.prototype._strokeFunc = _strokeFunc;
Shape.prototype._fillFuncHit = _fillFunc;
Shape.prototype._strokeFuncHit = _strokeFunc;
Shape.prototype._centroid = false;
Shape.prototype.nodeType = "Shape";
_registerNode(Shape);
Shape.prototype.on("shadowColorChange.konva shadowBlurChange.konva shadowOffsetXChange.konva shadowOffsetYChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", _clearHasShadowCache);
Shape.prototype.on("shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", _clearGetShadowRGBACache);
Shape.prototype.on("fillEnabledChange.konva fillChange.konva fillPatternImageChange.konva fillLinearGradientColorStopsChange.konva fillRadialGradientColorStopsChange.konva", _clearHasFillCache);
Shape.prototype.on("strokeEnabledChange.konva strokeWidthChange.konva strokeChange.konva strokeLinearGradientColorStopsChange.konva", _clearHasStrokeCache);
Shape.prototype.on("fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva fillPatternScaleXChange.konva fillPatternScaleYChange.konva fillPatternOffsetXChange.konva fillPatternOffsetYChange.konva fillPatternXChange.konva fillPatternYChange.konva fillPatternRotationChange.konva", _clearFillPatternCache);
Shape.prototype.on("fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva", _clearLinearGradientCache);
Shape.prototype.on("fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva", _clearRadialGradientCache);
Factory.addGetterSetter(Shape, "stroke", void 0, getStringOrGradientValidator());
Factory.addGetterSetter(Shape, "strokeWidth", 2, getNumberValidator());
Factory.addGetterSetter(Shape, "fillAfterStrokeEnabled", false);
Factory.addGetterSetter(Shape, "hitStrokeWidth", "auto", getNumberOrAutoValidator());
Factory.addGetterSetter(Shape, "strokeHitEnabled", true, getBooleanValidator());
Factory.addGetterSetter(Shape, "perfectDrawEnabled", true, getBooleanValidator());
Factory.addGetterSetter(Shape, "shadowForStrokeEnabled", true, getBooleanValidator());
Factory.addGetterSetter(Shape, "lineJoin");
Factory.addGetterSetter(Shape, "lineCap");
Factory.addGetterSetter(Shape, "miterLimit");
Factory.addGetterSetter(Shape, "sceneFunc");
Factory.addGetterSetter(Shape, "hitFunc");
Factory.addGetterSetter(Shape, "selfRectFunc");
Factory.addGetterSetter(Shape, "dash");
Factory.addGetterSetter(Shape, "dashOffset", 0, getNumberValidator());
Factory.addGetterSetter(Shape, "shadowColor", void 0, getStringValidator());
Factory.addGetterSetter(Shape, "shadowBlur", 0, getNumberValidator());
Factory.addGetterSetter(Shape, "shadowOpacity", 1, getNumberValidator());
Factory.addComponentsGetterSetter(Shape, "shadowOffset", ["x", "y"]);
Factory.addGetterSetter(Shape, "shadowOffsetX", 0, getNumberValidator());
Factory.addGetterSetter(Shape, "shadowOffsetY", 0, getNumberValidator());
Factory.addGetterSetter(Shape, "fillPatternImage");
Factory.addGetterSetter(Shape, "fill", void 0, getStringOrGradientValidator());
Factory.addGetterSetter(Shape, "fillPatternX", 0, getNumberValidator());
Factory.addGetterSetter(Shape, "fillPatternY", 0, getNumberValidator());
Factory.addGetterSetter(Shape, "fillLinearGradientColorStops");
Factory.addGetterSetter(Shape, "strokeLinearGradientColorStops");
Factory.addGetterSetter(Shape, "fillRadialGradientStartRadius", 0);
Factory.addGetterSetter(Shape, "fillRadialGradientEndRadius", 0);
Factory.addGetterSetter(Shape, "fillRadialGradientColorStops");
Factory.addGetterSetter(Shape, "fillPatternRepeat", "repeat");
Factory.addGetterSetter(Shape, "fillEnabled", true);
Factory.addGetterSetter(Shape, "strokeEnabled", true);
Factory.addGetterSetter(Shape, "shadowEnabled", true);
Factory.addGetterSetter(Shape, "dashEnabled", true);
Factory.addGetterSetter(Shape, "strokeScaleEnabled", true);
Factory.addGetterSetter(Shape, "fillPriority", "color");
Factory.addComponentsGetterSetter(Shape, "fillPatternOffset", ["x", "y"]);
Factory.addGetterSetter(Shape, "fillPatternOffsetX", 0, getNumberValidator());
Factory.addGetterSetter(Shape, "fillPatternOffsetY", 0, getNumberValidator());
Factory.addComponentsGetterSetter(Shape, "fillPatternScale", ["x", "y"]);
Factory.addGetterSetter(Shape, "fillPatternScaleX", 1, getNumberValidator());
Factory.addGetterSetter(Shape, "fillPatternScaleY", 1, getNumberValidator());
Factory.addComponentsGetterSetter(Shape, "fillLinearGradientStartPoint", [
  "x",
  "y"
]);
Factory.addComponentsGetterSetter(Shape, "strokeLinearGradientStartPoint", [
  "x",
  "y"
]);
Factory.addGetterSetter(Shape, "fillLinearGradientStartPointX", 0);
Factory.addGetterSetter(Shape, "strokeLinearGradientStartPointX", 0);
Factory.addGetterSetter(Shape, "fillLinearGradientStartPointY", 0);
Factory.addGetterSetter(Shape, "strokeLinearGradientStartPointY", 0);
Factory.addComponentsGetterSetter(Shape, "fillLinearGradientEndPoint", [
  "x",
  "y"
]);
Factory.addComponentsGetterSetter(Shape, "strokeLinearGradientEndPoint", [
  "x",
  "y"
]);
Factory.addGetterSetter(Shape, "fillLinearGradientEndPointX", 0);
Factory.addGetterSetter(Shape, "strokeLinearGradientEndPointX", 0);
Factory.addGetterSetter(Shape, "fillLinearGradientEndPointY", 0);
Factory.addGetterSetter(Shape, "strokeLinearGradientEndPointY", 0);
Factory.addComponentsGetterSetter(Shape, "fillRadialGradientStartPoint", [
  "x",
  "y"
]);
Factory.addGetterSetter(Shape, "fillRadialGradientStartPointX", 0);
Factory.addGetterSetter(Shape, "fillRadialGradientStartPointY", 0);
Factory.addComponentsGetterSetter(Shape, "fillRadialGradientEndPoint", [
  "x",
  "y"
]);
Factory.addGetterSetter(Shape, "fillRadialGradientEndPointX", 0);
Factory.addGetterSetter(Shape, "fillRadialGradientEndPointY", 0);
Factory.addGetterSetter(Shape, "fillPatternRotation", 0);
Factory.addGetterSetter(Shape, "fillRule", void 0, getStringValidator());
Factory.backCompat(Shape, {
  dashArray: "dash",
  getDashArray: "getDash",
  setDashArray: "setDash",
  drawFunc: "sceneFunc",
  getDrawFunc: "getSceneFunc",
  setDrawFunc: "setSceneFunc",
  drawHitFunc: "hitFunc",
  getDrawHitFunc: "getHitFunc",
  setDrawHitFunc: "setHitFunc"
});

// node_modules/konva/lib/Layer.js
var BEFORE_DRAW = "beforeDraw";
var DRAW = "draw";
var HIT_SEARCH_RADIUS = 10;
var HIT_SEARCH_MAX_DISTANCE = 256;
function getHitShape(data, i2) {
  return data[i2 + 3] >= 128 ? shapes[Util.getHitColorKey(data[i2], data[i2 + 1], data[i2 + 2])] : void 0;
}
var Layer = class extends Container {
  constructor(config) {
    super(config);
    this.canvas = new SceneCanvas();
    this.hitCanvas = new HitCanvas({
      pixelRatio: 1
    });
    this._waitingForDraw = false;
    this.on("visibleChange.konva", this._checkVisibility);
    this._checkVisibility();
    this.on("imageSmoothingEnabledChange.konva", this._setSmoothEnabled);
    this._setSmoothEnabled();
  }
  // for nodejs?
  createPNGStream() {
    const c2 = this.canvas._canvas;
    return c2.createPNGStream();
  }
  /**
   * get layer canvas wrapper
   * @method
   * @name Konva.Layer#getCanvas
   */
  getCanvas() {
    return this.canvas;
  }
  /**
   * get native canvas element
   * @method
   * @name Konva.Layer#getNativeCanvasElement
   */
  getNativeCanvasElement() {
    return this.canvas._canvas;
  }
  /**
   * get layer hit canvas
   * @method
   * @name Konva.Layer#getHitCanvas
   */
  getHitCanvas() {
    return this.hitCanvas;
  }
  /**
   * get layer canvas context
   * @method
   * @name Konva.Layer#getContext
   */
  getContext() {
    return this.getCanvas().getContext();
  }
  /**
   * clear the scene and hit canvas of the layer. The nodes stay and are
   * drawn again by the next `draw()`
   * @method
   * @name Konva.Layer#clear
   * @param {Object} [bounds] clear only this rectangle: `{ x, y, width, height }`
   * @returns {Konva.Layer}
   * @example
   * layer.clear();
   * layer.clear({ x: 0, y: 0, width: 100, height: 100 });
   */
  clear(bounds) {
    this.getContext().clear(bounds);
    this.getHitCanvas().getContext().clear(bounds);
    return this;
  }
  // extend Node.prototype.setZIndex
  setZIndex(index) {
    super.setZIndex(index);
    const stage = this.getStage();
    if (stage && stage.content) {
      stage.content.removeChild(this.getNativeCanvasElement());
      if (index < stage.children.length - 1) {
        stage.content.insertBefore(this.getNativeCanvasElement(), stage.children[index + 1].getCanvas()._canvas);
      } else {
        stage.content.appendChild(this.getNativeCanvasElement());
      }
    }
    return this;
  }
  moveToTop() {
    Node.prototype.moveToTop.call(this);
    const stage = this.getStage();
    if (stage && stage.content) {
      stage.content.removeChild(this.getNativeCanvasElement());
      stage.content.appendChild(this.getNativeCanvasElement());
    }
    return true;
  }
  moveUp() {
    const moved = Node.prototype.moveUp.call(this);
    if (!moved) {
      return false;
    }
    const stage = this.getStage();
    if (!stage || !stage.content) {
      return false;
    }
    stage.content.removeChild(this.getNativeCanvasElement());
    if (this.index < stage.children.length - 1) {
      stage.content.insertBefore(this.getNativeCanvasElement(), stage.children[this.index + 1].getCanvas()._canvas);
    } else {
      stage.content.appendChild(this.getNativeCanvasElement());
    }
    return true;
  }
  // extend Node.prototype.moveDown
  moveDown() {
    if (Node.prototype.moveDown.call(this)) {
      const stage = this.getStage();
      if (stage) {
        const children = stage.children;
        if (stage.content) {
          stage.content.removeChild(this.getNativeCanvasElement());
          stage.content.insertBefore(this.getNativeCanvasElement(), children[this.index + 1].getCanvas()._canvas);
        }
      }
      return true;
    }
    return false;
  }
  // extend Node.prototype.moveToBottom
  moveToBottom() {
    if (Node.prototype.moveToBottom.call(this)) {
      const stage = this.getStage();
      if (stage) {
        const children = stage.children;
        if (stage.content) {
          stage.content.removeChild(this.getNativeCanvasElement());
          stage.content.insertBefore(this.getNativeCanvasElement(), children[1].getCanvas()._canvas);
        }
      }
      return true;
    }
    return false;
  }
  getLayer() {
    return this;
  }
  remove() {
    var _a2, _b;
    super.remove();
    const scene = this.getNativeCanvasElement();
    const hit = this.getHitCanvas()._canvas;
    (_a2 = scene.parentNode) === null || _a2 === void 0 ? void 0 : _a2.removeChild(scene);
    (_b = hit.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(hit);
    return this;
  }
  getStage() {
    return this.parent;
  }
  // the canvases follow the stage size. The public size() of a layer, like
  // width() and height(), warns and does nothing
  _setSize({ width, height }) {
    this.canvas.setSize(width, height);
    this._syncHitCanvasSize();
    this._setSmoothEnabled();
    return this;
  }
  // the hit canvas is only allocated while the layer is listening;
  // for a non-listening layer it is kept released (0x0), so a purely
  // presentational layer does not pay for a stage-sized hit bitmap
  // https://github.com/konvajs/konva/issues/2009
  _syncHitCanvasSize() {
    const listening = this.isListening();
    this.hitCanvas.setSizeIfChanged((listening ? this.getWidth() : 0) || 0, (listening ? this.getHeight() : 0) || 0);
  }
  _validateAdd(child) {
    const type = child.getType();
    if (type !== "Group" && type !== "Shape") {
      Util.throw("You may only add groups and shapes to a layer.");
    }
  }
  _toKonvaCanvas(config) {
    config = { ...config };
    config.width = config.width || this.getWidth();
    config.height = config.height || this.getHeight();
    config.x = config.x !== void 0 ? config.x : this.x();
    config.y = config.y !== void 0 ? config.y : this.y();
    return Node.prototype._toKonvaCanvas.call(this, config);
  }
  _checkVisibility() {
    const visible = this.visible();
    if (visible) {
      this.canvas._canvas.style.display = "block";
    } else {
      this.canvas._canvas.style.display = "none";
    }
  }
  _setSmoothEnabled() {
    this.getContext()._context.imageSmoothingEnabled = this.imageSmoothingEnabled();
  }
  /**
   * get/set width of layer. getter return width of stage. setter doing nothing.
   * if you want change width use `stage.width(value);`
   * @name Konva.Layer#width
   * @method
   * @returns {Number}
   * @example
   * var width = layer.width();
   */
  getWidth() {
    if (this.parent) {
      return this.parent.width();
    }
  }
  setWidth() {
    Util.warn('Can not change width of layer. Use "stage.width(value)" function instead.');
  }
  /**
   * get/set height of layer.getter return height of stage. setter doing nothing.
   * if you want change height use `stage.height(value);`
   * @name Konva.Layer#height
   * @method
   * @returns {Number}
   * @example
   * var height = layer.height();
   */
  getHeight() {
    if (this.parent) {
      return this.parent.height();
    }
  }
  setHeight() {
    Util.warn('Can not change height of layer. Use "stage.height(value)" function instead.');
  }
  /**
   * batch draw. this function will not do immediate draw
   * but it will schedule drawing to next tick (requestAnimFrame)
   * @method
   * @name Konva.Layer#batchDraw
   * @return {Konva.Layer} this
   */
  batchDraw() {
    var _a2;
    if (!this._waitingForDraw) {
      this._waitingForDraw = true;
      Util.requestAnimFrame(() => {
        this._waitingForDraw = false;
        this.draw();
      }, (_a2 = this.getStage()) === null || _a2 === void 0 ? void 0 : _a2._getOwnerWindow());
    }
    return this;
  }
  /**
   * get visible intersection shape. This is the preferred
   * method for determining if a point intersects a shape or not.
   * It reads the hit canvas, so it finds what pointer events would: nodes with
   * listening set to false or invisible nodes are not detected, a shape with opacity 0
   * is, and `hitStrokeWidth` counts. The position is relative to the top left corner of the
   * stage container, like `stage.getPointerPosition()`, without the stage transform
   * @method
   * @name Konva.Layer#getIntersection
   * @param {Object} pos
   * @param {Number} pos.x
   * @param {Number} pos.y
   * @returns {Konva.Node}
   * @example
   * var shape = layer.getIntersection({x: 50, y: 50});
   */
  getIntersection(pos) {
    if (!this.isListening() || !this.isVisible()) {
      return null;
    }
    const hit = this._getIntersection(pos);
    if (hit.shape) {
      return hit.shape;
    }
    if (!hit.antialiased) {
      return null;
    }
    const ratio = this.hitCanvas.pixelRatio, cx = Math.floor(pos.x * ratio), cy = Math.floor(pos.y * ratio);
    const read = (r3) => this.hitCanvas.context.getImageData(cx - r3, cy - r3, r3 * 2 + 1, r3 * 2 + 1).data;
    let r2 = HIT_SEARCH_RADIUS, size = r2 * 2 + 1, data = read(r2), previousMax = data[(r2 * size + r2) * 4 + 3];
    for (let d2 = 1; d2 <= HIT_SEARCH_MAX_DISTANCE; d2++) {
      if (d2 > r2) {
        r2 = Math.min(HIT_SEARCH_MAX_DISTANCE, r2 * 2);
        size = r2 * 2 + 1;
        data = read(r2);
      }
      let max = 0;
      for (let y = -d2; y <= d2; y++) {
        const step = Math.abs(y) === d2 ? 1 : d2 * 2;
        for (let x2 = -d2; x2 <= d2; x2 += step) {
          const i2 = ((y + r2) * size + x2 + r2) * 4;
          const shape = getHitShape(data, i2);
          if (shape) {
            return shape;
          }
          max = Math.max(max, data[i2 + 3]);
        }
      }
      if (max <= previousMax && max !== 255) {
        return null;
      }
      previousMax = max;
    }
    return null;
  }
  _getIntersection(pos) {
    if (!this.hitCanvas.width || !this.hitCanvas.height) {
      return {};
    }
    const ratio = this.hitCanvas.pixelRatio;
    const p2 = this.hitCanvas.context.getImageData(Math.floor(pos.x * ratio), Math.floor(pos.y * ratio), 1, 1).data;
    const shape = getHitShape(p2, 0);
    if (shape) {
      return { shape };
    }
    if (p2[3] > 0) {
      return { antialiased: true };
    }
    return {};
  }
  drawScene(can, top) {
    const layer = this.getLayer(), canvas2 = can || layer && layer.getCanvas();
    this._fire(BEFORE_DRAW, {
      node: this
    });
    if (this.clearBeforeDraw()) {
      canvas2.getContext().clear();
    }
    Container.prototype.drawScene.call(this, canvas2, top);
    canvas2._trimIsolationCanvas();
    this._fire(DRAW, {
      node: this
    });
    return this;
  }
  // the hit graph is skipped while a node of the layer (or the stage) is
  // dragged or a transformer on the layer, or of a node on it, is
  // transforming, as the layer is redrawn every frame; the draw that follows
  // restores it
  shouldDrawHit(top) {
    var _a2;
    if (!super.shouldDrawHit(top)) {
      return false;
    }
    if (top || Konva.hitOnDragEnabled) {
      return true;
    }
    let underDrag = false;
    DD._dragElements.forEach((elem) => {
      if (elem.dragStatus === "dragging" && (elem.node === this.getStage() || elem.node.getLayer() === this)) {
        underDrag = true;
      }
    });
    return !underDrag && !((_a2 = Konva["Transformer"]) === null || _a2 === void 0 ? void 0 : _a2._isLayerTransforming(this));
  }
  drawHit(can, top) {
    const layer = this.getLayer(), canvas2 = can || layer && layer.hitCanvas;
    if (!can && layer) {
      layer._syncHitCanvasSize();
      if (layer.clearBeforeDraw()) {
        layer.getHitCanvas().getContext().clear();
      }
    }
    Container.prototype.drawHit.call(this, canvas2, top);
    return this;
  }
  /**
   * enable hit graph. **DEPRECATED!** Use `layer.listening(true)` instead.
   * @name Konva.Layer#enableHitGraph
   * @method
   * @returns {Layer}
   */
  enableHitGraph() {
    this.hitGraphEnabled(true);
    return this;
  }
  /**
   * disable hit graph. **DEPRECATED!** Use `layer.listening(false)` instead.
   * @name Konva.Layer#disableHitGraph
   * @method
   * @returns {Layer}
   */
  disableHitGraph() {
    this.hitGraphEnabled(false);
    return this;
  }
  setHitGraphEnabled(val) {
    Util.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead.");
    this.listening(val);
  }
  getHitGraphEnabled(val) {
    Util.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead.");
    return this.listening();
  }
  /**
   * Show or hide hit canvas over the stage. May be useful for debugging custom hitFunc
   * @name Konva.Layer#toggleHitCanvas
   * @method
   */
  toggleHitCanvas() {
    if (!this.parent || !this.parent["content"]) {
      return;
    }
    const parent = this.parent;
    const added = !!this.hitCanvas._canvas.parentNode;
    if (added) {
      parent.content.removeChild(this.hitCanvas._canvas);
    } else {
      parent.content.appendChild(this.hitCanvas._canvas);
    }
  }
  destroy() {
    this.getCanvas()._releaseIsolationCanvas();
    Util.releaseCanvas(this.getNativeCanvasElement(), this.getHitCanvas()._canvas);
    return super.destroy();
  }
};
Layer.prototype.nodeType = "Layer";
_registerNode(Layer);
Factory.addGetterSetter(Layer, "imageSmoothingEnabled", true);
Factory.addGetterSetter(Layer, "clearBeforeDraw", true);
Factory.addOverloadedGetterSetter(Layer, "hitGraphEnabled");

// node_modules/konva/lib/FastLayer.js
var FastLayer = class extends Layer {
  constructor(attrs) {
    super(attrs);
    this.listening(false);
    Util.warn('Konva.FastLayer is deprecated. Please use "new Konva.Layer({ listening: false })" instead.');
  }
};
FastLayer.prototype.nodeType = "FastLayer";
_registerNode(FastLayer);

// node_modules/konva/lib/Group.js
var Group = class extends Container {
  _validateAdd(child) {
    const type = child.getType();
    if (type !== "Group" && type !== "Shape") {
      Util.throw("You may only add groups and shapes to groups.");
    }
  }
  _drawChildNodes(drawMethod, canvas2, top) {
    if (drawMethod !== "drawScene" || !this.isolated() || top === this) {
      return super._drawChildNodes(drawMethod, canvas2, top);
    }
    if (!canvas2.width || !canvas2.height) {
      return;
    }
    const context = canvas2.getContext();
    const surface = canvas2._prepareIsolationCanvas(this.getClientRect({ _forDrawing: true, relativeTo: top }));
    const surfaceContext = surface.getContext();
    surfaceContext._opacityRoot = this;
    context.save();
    try {
      super._drawChildNodes(drawMethod, surface, top);
      context._applyOpacity(this);
      context._drawDeviceBuffer(surface);
    } catch (error) {
      canvas2._releaseIsolationCanvas();
      throw error;
    } finally {
      context.restore();
      surfaceContext._opacityRoot = void 0;
    }
  }
};
Factory.addGetterSetter(Group, "isolated", false, getBooleanValidator());
Group.prototype.nodeType = "Group";
_registerNode(Group);

// node_modules/konva/lib/Animation.js
var _a;
var now = ((_a = glob.performance) === null || _a === void 0 ? void 0 : _a.now) ? () => glob.performance.now() : Date.now;
var Animation = class _Animation {
  constructor(func, layers) {
    this.id = _Animation.animIdCounter++;
    this.frame = {
      time: 0,
      timeDiff: 0,
      lastTime: now(),
      frameRate: 0
    };
    this.func = func;
    this.setLayers(layers);
  }
  /**
   * set layers to be redrawn on each animation frame
   * @method
   * @name Konva.Animation#setLayers
   * @param {Konva.Layer|Array} [layers] layer(s) to be redrawn. Can be a layer, an array of layers, or null.  Not specifying a node will result in no redraw.
   * @return {Konva.Animation} this
   */
  setLayers(layers) {
    this.layers = layers ? [].concat(layers) : [];
    return this;
  }
  /**
   * get layers
   * @method
   * @name Konva.Animation#getLayers
   * @return {Array} Array of Konva.Layer
   */
  getLayers() {
    return this.layers;
  }
  /**
   * add layer.  Returns true if the layer was added, and false if it was not
   * @method
   * @name Konva.Animation#addLayer
   * @param {Konva.Layer} layer to add
   * @return {Bool} true if layer is added to animation, otherwise false
   */
  addLayer(layer) {
    const layers = this.layers;
    const len = layers.length;
    for (let n2 = 0; n2 < len; n2++) {
      if (layers[n2]._id === layer._id) {
        return false;
      }
    }
    this.layers.push(layer);
    return true;
  }
  /**
   * determine if animation is running or not.  returns true or false
   * @method
   * @name Konva.Animation#isRunning
   * @return {Bool} is animation running?
   */
  isRunning() {
    return _Animation.animations.has(this);
  }
  /**
   * start animation
   * @method
   * @name Konva.Animation#start
   * @return {Konva.Animation} this
   */
  start() {
    this.stop();
    this.frame.timeDiff = 0;
    this.frame.lastTime = now();
    _Animation._addAnimation(this);
    return this;
  }
  /**
   * stop animation
   * @method
   * @name Konva.Animation#stop
   * @return {Konva.Animation} this
   */
  stop() {
    _Animation._removeAnimation(this);
    return this;
  }
  _updateFrameObject(time) {
    this.frame.timeDiff = time - this.frame.lastTime;
    this.frame.lastTime = time;
    this.frame.time += this.frame.timeDiff;
    this.frame.frameRate = 1e3 / this.frame.timeDiff;
  }
  static _addAnimation(anim) {
    this.animations.add(anim);
    this._handleAnimation();
  }
  static _removeAnimation(anim) {
    this.animations.delete(anim);
  }
  static _runFrames() {
    const layersToDraw = /* @__PURE__ */ new Set();
    Array.from(this.animations).forEach((anim) => {
      if (!this.animations.has(anim)) {
        return;
      }
      anim._updateFrameObject(now());
      if (anim.func && anim.func.call(anim, anim.frame) === false) {
        return;
      }
      anim.layers.forEach((layer) => layer && layersToDraw.add(layer));
    });
    layersToDraw.forEach((layer) => layer.batchDraw());
  }
  static _animationLoop() {
    const Anim = _Animation;
    if (Anim.animations.size) {
      Anim._runFrames();
      Util.requestAnimFrame(Anim._animationLoop);
    } else {
      Anim.animRunning = false;
    }
  }
  static _handleAnimation() {
    if (!this.animRunning) {
      this.animRunning = true;
      Util.requestAnimFrame(this._animationLoop);
    }
  }
};
Animation.animations = /* @__PURE__ */ new Set();
Animation.animIdCounter = 0;
Animation.animRunning = false;

// node_modules/konva/lib/Tween.js
var blacklist = {
  node: 1,
  duration: 1,
  easing: 1,
  onFinish: 1,
  onUpdate: 1,
  onReset: 1,
  yoyo: 1
};
var PAUSED = 1;
var PLAYING = 2;
var REVERSING = 3;
var colorAttrs = ["fill", "stroke", "shadowColor"];
var idCounter2 = 0;
function colorToRGBA(color) {
  return Util.colorToRGBA(color) || Util.throw('can not tween the color "' + color + '", because it is not a valid color.');
}
function colorDiff(start, end) {
  return {
    r: end.r - start.r,
    g: end.g - start.g,
    b: end.b - start.b,
    a: end.a - start.a
  };
}
function tweenColor(start, diff, i2) {
  return "rgba(" + Math.round(start.r + diff.r * i2) + "," + Math.round(start.g + diff.g * i2) + "," + Math.round(start.b + diff.b * i2) + "," + (start.a + diff.a * i2) + ")";
}
var TweenEngine = class {
  constructor(prop, propFunc, func, begin, finish, duration, yoyo) {
    this.prop = prop;
    this.propFunc = propFunc;
    this.begin = begin;
    this._pos = begin;
    this.duration = duration;
    this._change = 0;
    this.prevPos = 0;
    this.yoyo = yoyo;
    this._time = 0;
    this._position = 0;
    this._startTime = 0;
    this._finish = 0;
    this.func = func;
    this._change = finish - this.begin;
    this.pause();
  }
  fire(str) {
    const handler = this[str];
    if (handler) {
      handler();
    }
  }
  setTime(t2) {
    if (t2 > this.duration) {
      if (this.yoyo) {
        this._time = this.duration;
        this.reverse();
      } else {
        this.finish();
      }
    } else if (t2 < 0) {
      if (this.yoyo) {
        this._time = 0;
        this.play();
      } else {
        this.reset();
      }
    } else {
      this._time = t2;
      this.update();
    }
  }
  getTime() {
    return this._time;
  }
  setPosition(p2) {
    this.prevPos = this._pos;
    this.propFunc(p2);
    this._pos = p2;
  }
  getPosition(t2) {
    if (t2 === void 0) {
      t2 = this._time;
    }
    return this.func(t2, this.begin, this._change, this.duration);
  }
  play() {
    this.state = PLAYING;
    this._startTime = this.getTimer() - this._time;
    this.fire("onPlay");
    this.onEnterFrame();
  }
  reverse() {
    this.state = REVERSING;
    this._time = this.duration - this._time;
    this._startTime = this.getTimer() - this._time;
    this.fire("onReverse");
    this.onEnterFrame();
  }
  seek(t2) {
    this.pause();
    this._time = t2;
    this.update();
    this.fire("onSeek");
  }
  reset() {
    this.pause();
    this._time = 0;
    this.update();
    this.fire("onReset");
  }
  finish() {
    this.pause();
    this._time = this.duration;
    this.update();
    this.fire("onFinish");
  }
  update() {
    this.setPosition(this.getPosition(this._time));
    this.fire("onUpdate");
  }
  onEnterFrame() {
    const t2 = this.getTimer() - this._startTime;
    if (this.state === PLAYING) {
      this.setTime(t2);
    } else if (this.state === REVERSING) {
      this.setTime(this.duration - t2);
    }
  }
  pause() {
    this.state = PAUSED;
    this.fire("onPause");
  }
  getTimer() {
    return Date.now();
  }
};
var Tween = class _Tween {
  constructor(config) {
    const that = this, node = config.node, nodeId = node._id, easing = config.easing || Easings.Linear, yoyo = !!config.yoyo;
    let duration, key;
    if (typeof config.duration === "undefined") {
      duration = 0.3;
    } else if (config.duration === 0) {
      duration = 1e-3;
    } else {
      duration = config.duration;
    }
    this.node = node;
    this._id = idCounter2++;
    const layers = node.getLayer() || (node instanceof Konva["Stage"] ? node.getLayers() : null);
    if (!layers) {
      Util.error("Tween constructor have `node` that is not in a layer. Please add node into layer first.");
    }
    this.anim = new Animation(function() {
      that.tween.onEnterFrame();
    }, layers);
    this.tween = new TweenEngine(key, function(i2) {
      that._tweenFunc(i2);
    }, easing, 0, 1, duration * 1e3, yoyo);
    this._addListeners();
    if (!_Tween.attrs[nodeId]) {
      _Tween.attrs[nodeId] = {};
    }
    if (!_Tween.attrs[nodeId][this._id]) {
      _Tween.attrs[nodeId][this._id] = {};
    }
    if (!_Tween.tweens[nodeId]) {
      _Tween.tweens[nodeId] = {};
    }
    for (key in config) {
      if (blacklist[key] === void 0) {
        this._addAttr(key, config[key]);
      }
    }
    this.reset();
    this.onFinish = config.onFinish;
    this.onReset = config.onReset;
    this.onUpdate = config.onUpdate;
  }
  _addAttr(key, end) {
    if (Util._isPlainObject(end)) {
      for (const component in end) {
        this._addAttr(key + Util._capitalize(component), end[component]);
      }
      return;
    }
    const node = this.node, nodeId = node._id;
    let diff, len, trueEnd, trueStart;
    const tweenId = _Tween.tweens[nodeId][key];
    if (tweenId !== void 0) {
      delete _Tween.attrs[nodeId][tweenId][key];
    }
    let start = node.getAttr(key);
    if (Util._isArray(end) || Util._isArray(start)) {
      diff = [];
      trueStart = start;
      trueEnd = end;
      start = Util._isArray(start) ? start.slice() : new Array(end.length).fill(start || 0);
      if (!Util._isArray(end)) {
        end = new Array(start.length).fill(end);
      }
      len = Math.max(end.length, start.length);
      if (key === "points" && end.length !== start.length) {
        if (end.length > start.length) {
          start = Util._prepareArrayForTween(start, end, node.closed());
        } else {
          end = Util._prepareArrayForTween(end, start, node.closed());
        }
      }
      if (key.endsWith("ColorStops")) {
        for (let n2 = 0; n2 < len; n2++) {
          if (n2 % 2 === 0) {
            diff.push((end[n2] || 0) - (start[n2] || 0));
          } else {
            const startRGBA = colorToRGBA(start[n2]);
            start[n2] = startRGBA;
            diff.push(colorDiff(startRGBA, colorToRGBA(end[n2])));
          }
        }
      } else {
        for (let n2 = 0; n2 < len; n2++) {
          diff.push((end[n2] || 0) - (start[n2] || 0));
        }
      }
    } else if (colorAttrs.indexOf(key) !== -1) {
      start = colorToRGBA(start);
      diff = colorDiff(start, colorToRGBA(end));
    } else {
      diff = end - start;
    }
    _Tween.attrs[nodeId][this._id][key] = {
      start,
      diff,
      end,
      trueEnd,
      trueStart
    };
    _Tween.tweens[nodeId][key] = this._id;
  }
  _tweenFunc(i2) {
    var _a2;
    const node = this.node, attrs = (_a2 = _Tween.attrs[node._id]) === null || _a2 === void 0 ? void 0 : _a2[this._id];
    let key, attr, start, diff, newVal, n2, len, end;
    for (key in attrs) {
      attr = attrs[key];
      start = attr.start;
      diff = attr.diff;
      end = attr.end;
      if (Util._isArray(start)) {
        newVal = [];
        len = Math.max(start.length, end.length);
        if (key.endsWith("ColorStops")) {
          for (n2 = 0; n2 < len; n2++) {
            if (n2 % 2 === 0) {
              newVal.push((start[n2] || 0) + diff[n2] * i2);
            } else {
              newVal.push(tweenColor(start[n2], diff[n2], i2));
            }
          }
        } else {
          for (n2 = 0; n2 < len; n2++) {
            newVal.push((start[n2] || 0) + diff[n2] * i2);
          }
        }
      } else if (colorAttrs.indexOf(key) !== -1) {
        newVal = tweenColor(start, diff, i2);
      } else {
        newVal = start + diff * i2;
      }
      node.setAttr(key, newVal);
    }
  }
  _addListeners() {
    const destroyEvent = `destroy.konva-tween${this._id}`;
    const onDestroy = () => this.destroy();
    const start = () => {
      this.node.off(destroyEvent).on(destroyEvent, onDestroy);
      this.anim.start();
    };
    this.tween.onPlay = start;
    this.tween.onReverse = start;
    this.tween.onPause = () => {
      this.node.off(destroyEvent);
      this.anim.stop();
    };
    const end = (edge, callback) => {
      var _a2;
      const attrs = (_a2 = _Tween.attrs[this.node._id]) === null || _a2 === void 0 ? void 0 : _a2[this._id];
      if (!attrs) {
        return;
      }
      for (const key in attrs) {
        if (attrs[key][edge] !== void 0) {
          this.node.setAttr(key, attrs[key][edge]);
        }
      }
      callback === null || callback === void 0 ? void 0 : callback.call(this);
    };
    this.tween.onFinish = () => end("trueEnd", this.onFinish);
    this.tween.onReset = () => end("trueStart", this.onReset);
    this.tween.onUpdate = () => {
      if (this.onUpdate) {
        this.onUpdate.call(this);
      }
    };
  }
  /**
   * play
   * @method
   * @name Konva.Tween#play
   * @returns {Tween}
   */
  play() {
    this.tween.play();
    return this;
  }
  /**
   * reverse
   * @method
   * @name Konva.Tween#reverse
   * @returns {Tween}
   */
  reverse() {
    this.tween.reverse();
    return this;
  }
  /**
   * reset
   * @method
   * @name Konva.Tween#reset
   * @returns {Tween}
   */
  reset() {
    this.tween.reset();
    return this;
  }
  /**
   * seek
   * @method
   * @name Konva.Tween#seek
   * @param {Number} t time in seconds between 0 and the duration
   * @returns {Tween}
   */
  seek(t2) {
    this.tween.seek(t2 * 1e3);
    return this;
  }
  /**
   * pause
   * @method
   * @name Konva.Tween#pause
   * @returns {Tween}
   */
  pause() {
    this.tween.pause();
    return this;
  }
  /**
   * finish
   * @method
   * @name Konva.Tween#finish
   * @returns {Tween}
   */
  finish() {
    this.tween.finish();
    return this;
  }
  /**
   * destroy
   * @method
   * @name Konva.Tween#destroy
   */
  destroy() {
    var _a2;
    const nodeId = this.node._id, thisId = this._id, owned = (_a2 = _Tween.attrs[nodeId]) === null || _a2 === void 0 ? void 0 : _a2[thisId], owners = _Tween.tweens[nodeId];
    this.pause();
    if (this.anim) {
      this.anim.stop();
    }
    if (owned) {
      if (owners) {
        for (const key in owned) {
          delete owners[key];
        }
        if (Object.keys(owners).length === 0) {
          delete _Tween.tweens[nodeId];
        }
      }
      delete _Tween.attrs[nodeId][thisId];
      if (Object.keys(_Tween.attrs[nodeId]).length === 0) {
        delete _Tween.attrs[nodeId];
      }
    }
  }
};
Tween.attrs = {};
Tween.tweens = {};
Node.prototype.to = function(params) {
  const onFinish = params.onFinish;
  const tween = new Tween({
    ...params,
    node: this,
    onFinish() {
      tween.destroy();
      if (onFinish) {
        onFinish();
      }
    }
  });
  tween.play();
  return tween;
};
var Easings = {
  /**
   * back ease in
   * @function
   * @memberof Konva.Easings
   */
  BackEaseIn(t2, b2, c2, d2) {
    const s2 = 1.70158;
    return c2 * (t2 /= d2) * t2 * ((s2 + 1) * t2 - s2) + b2;
  },
  /**
   * back ease out
   * @function
   * @memberof Konva.Easings
   */
  BackEaseOut(t2, b2, c2, d2) {
    const s2 = 1.70158;
    return c2 * ((t2 = t2 / d2 - 1) * t2 * ((s2 + 1) * t2 + s2) + 1) + b2;
  },
  /**
   * back ease in out
   * @function
   * @memberof Konva.Easings
   */
  BackEaseInOut(t2, b2, c2, d2) {
    let s2 = 1.70158;
    if ((t2 /= d2 / 2) < 1) {
      return c2 / 2 * (t2 * t2 * (((s2 *= 1.525) + 1) * t2 - s2)) + b2;
    }
    return c2 / 2 * ((t2 -= 2) * t2 * (((s2 *= 1.525) + 1) * t2 + s2) + 2) + b2;
  },
  /**
   * elastic ease in
   * @function
   * @memberof Konva.Easings
   */
  ElasticEaseIn(t2, b2, c2, d2, a3, p2) {
    let s2 = 0;
    if (t2 === 0) {
      return b2;
    }
    if ((t2 /= d2) === 1) {
      return b2 + c2;
    }
    if (!p2) {
      p2 = d2 * 0.3;
    }
    if (!a3 || a3 < Math.abs(c2)) {
      a3 = c2;
      s2 = p2 / 4;
    } else {
      s2 = p2 / (2 * Math.PI) * Math.asin(c2 / a3);
    }
    return -(a3 * Math.pow(2, 10 * (t2 -= 1)) * Math.sin((t2 * d2 - s2) * (2 * Math.PI) / p2)) + b2;
  },
  /**
   * elastic ease out
   * @function
   * @memberof Konva.Easings
   */
  ElasticEaseOut(t2, b2, c2, d2, a3, p2) {
    let s2 = 0;
    if (t2 === 0) {
      return b2;
    }
    if ((t2 /= d2) === 1) {
      return b2 + c2;
    }
    if (!p2) {
      p2 = d2 * 0.3;
    }
    if (!a3 || a3 < Math.abs(c2)) {
      a3 = c2;
      s2 = p2 / 4;
    } else {
      s2 = p2 / (2 * Math.PI) * Math.asin(c2 / a3);
    }
    return a3 * Math.pow(2, -10 * t2) * Math.sin((t2 * d2 - s2) * (2 * Math.PI) / p2) + c2 + b2;
  },
  /**
   * elastic ease in out
   * @function
   * @memberof Konva.Easings
   */
  ElasticEaseInOut(t2, b2, c2, d2, a3, p2) {
    let s2 = 0;
    if (t2 === 0) {
      return b2;
    }
    if ((t2 /= d2 / 2) === 2) {
      return b2 + c2;
    }
    if (!p2) {
      p2 = d2 * (0.3 * 1.5);
    }
    if (!a3 || a3 < Math.abs(c2)) {
      a3 = c2;
      s2 = p2 / 4;
    } else {
      s2 = p2 / (2 * Math.PI) * Math.asin(c2 / a3);
    }
    if (t2 < 1) {
      return -0.5 * (a3 * Math.pow(2, 10 * (t2 -= 1)) * Math.sin((t2 * d2 - s2) * (2 * Math.PI) / p2)) + b2;
    }
    return a3 * Math.pow(2, -10 * (t2 -= 1)) * Math.sin((t2 * d2 - s2) * (2 * Math.PI) / p2) * 0.5 + c2 + b2;
  },
  /**
   * bounce ease out
   * @function
   * @memberof Konva.Easings
   */
  BounceEaseOut(t2, b2, c2, d2) {
    if ((t2 /= d2) < 1 / 2.75) {
      return c2 * (7.5625 * t2 * t2) + b2;
    } else if (t2 < 2 / 2.75) {
      return c2 * (7.5625 * (t2 -= 1.5 / 2.75) * t2 + 0.75) + b2;
    } else if (t2 < 2.5 / 2.75) {
      return c2 * (7.5625 * (t2 -= 2.25 / 2.75) * t2 + 0.9375) + b2;
    } else {
      return c2 * (7.5625 * (t2 -= 2.625 / 2.75) * t2 + 0.984375) + b2;
    }
  },
  /**
   * bounce ease in
   * @function
   * @memberof Konva.Easings
   */
  BounceEaseIn(t2, b2, c2, d2) {
    return c2 - Easings.BounceEaseOut(d2 - t2, 0, c2, d2) + b2;
  },
  /**
   * bounce ease in out
   * @function
   * @memberof Konva.Easings
   */
  BounceEaseInOut(t2, b2, c2, d2) {
    if (t2 < d2 / 2) {
      return Easings.BounceEaseIn(t2 * 2, 0, c2, d2) * 0.5 + b2;
    } else {
      return Easings.BounceEaseOut(t2 * 2 - d2, 0, c2, d2) * 0.5 + c2 * 0.5 + b2;
    }
  },
  /**
   * ease in
   * @function
   * @memberof Konva.Easings
   */
  EaseIn(t2, b2, c2, d2) {
    return c2 * (t2 /= d2) * t2 + b2;
  },
  /**
   * ease out
   * @function
   * @memberof Konva.Easings
   */
  EaseOut(t2, b2, c2, d2) {
    return -c2 * (t2 /= d2) * (t2 - 2) + b2;
  },
  /**
   * ease in out
   * @function
   * @memberof Konva.Easings
   */
  EaseInOut(t2, b2, c2, d2) {
    if ((t2 /= d2 / 2) < 1) {
      return c2 / 2 * t2 * t2 + b2;
    }
    return -c2 / 2 * (--t2 * (t2 - 2) - 1) + b2;
  },
  /**
   * strong ease in
   * @function
   * @memberof Konva.Easings
   */
  StrongEaseIn(t2, b2, c2, d2) {
    return c2 * (t2 /= d2) * t2 * t2 * t2 * t2 + b2;
  },
  /**
   * strong ease out
   * @function
   * @memberof Konva.Easings
   */
  StrongEaseOut(t2, b2, c2, d2) {
    return c2 * ((t2 = t2 / d2 - 1) * t2 * t2 * t2 * t2 + 1) + b2;
  },
  /**
   * strong ease in out
   * @function
   * @memberof Konva.Easings
   */
  StrongEaseInOut(t2, b2, c2, d2) {
    if ((t2 /= d2 / 2) < 1) {
      return c2 / 2 * t2 * t2 * t2 * t2 * t2 + b2;
    }
    return c2 / 2 * ((t2 -= 2) * t2 * t2 * t2 * t2 + 2) + b2;
  },
  /**
   * linear
   * @function
   * @memberof Konva.Easings
   */
  Linear(t2, b2, c2, d2) {
    return c2 * t2 / d2 + b2;
  }
};

// node_modules/konva/lib/_CoreInternals.js
var Konva2 = Util._assign(Konva, {
  Util,
  Transform,
  Node,
  Container,
  Stage,
  stages,
  Layer,
  FastLayer,
  Group,
  DD,
  Shape,
  shapes,
  Animation,
  Tween,
  Easings,
  Context,
  Canvas
});

// node_modules/konva/lib/shapes/Arc.js
var Arc = class extends Shape {
  _sceneFunc(context) {
    const angle = Konva.getAngle(this.angle()), clockwise = this.clockwise();
    context.beginPath();
    context.arc(0, 0, Math.abs(this.outerRadius()), 0, angle, clockwise);
    context.arc(0, 0, Math.abs(this.innerRadius()), angle, 0, !clockwise);
    context.closePath();
    context.fillStrokeShape(this);
  }
  getWidth() {
    return Math.abs(this.outerRadius()) * 2;
  }
  getHeight() {
    return Math.abs(this.outerRadius()) * 2;
  }
  setWidth(width) {
    this.outerRadius(width / 2);
  }
  setHeight(height) {
    this.outerRadius(height / 2);
  }
  getSelfRect() {
    const r1 = Math.abs(this.innerRadius()), r2 = Math.abs(this.outerRadius());
    const innerRadius = Math.min(r1, r2), outerRadius = Math.max(r1, r2);
    const clockwise = this.clockwise();
    const rawAngle = Konva.getAngle(this.angle());
    if (rawAngle % (Math.PI * 2) === 0) {
      return rawAngle !== 0 ? {
        x: -outerRadius,
        y: -outerRadius,
        width: outerRadius * 2,
        height: outerRadius * 2
      } : { x: innerRadius, y: 0, width: outerRadius - innerRadius, height: 0 };
    }
    const turn = Math.PI * 2;
    const sweep = clockwise ? -rawAngle : rawAngle;
    const angle = sweep >= turn ? turn : (sweep % turn + turn) % turn;
    const boundLeftRatio = Math.cos(Math.min(angle, Math.PI));
    const boundRightRatio = 1;
    const boundTopRatio = Math.sin(Math.min(Math.max(Math.PI, angle), 3 * Math.PI / 2));
    const boundBottomRatio = Math.sin(Math.min(angle, Math.PI / 2));
    const boundLeft = boundLeftRatio * (boundLeftRatio > 0 ? innerRadius : outerRadius);
    const boundRight = boundRightRatio * (boundRightRatio > 0 ? outerRadius : innerRadius);
    const boundTop = boundTopRatio * (boundTopRatio > 0 ? innerRadius : outerRadius);
    const boundBottom = boundBottomRatio * (boundBottomRatio > 0 ? outerRadius : innerRadius);
    return {
      x: boundLeft,
      y: clockwise ? -1 * boundBottom : boundTop,
      width: boundRight - boundLeft,
      height: boundBottom - boundTop
    };
  }
};
Arc.prototype._centroid = true;
Arc.prototype.className = "Arc";
Arc.prototype._attrsAffectingSize = [
  "innerRadius",
  "outerRadius",
  "angle",
  "clockwise"
];
_registerNode(Arc, true);
Factory.addGetterSetter(Arc, "innerRadius", 0, getNumberValidator());
Factory.addGetterSetter(Arc, "outerRadius", 0, getNumberValidator());
Factory.addGetterSetter(Arc, "angle", 0, getNumberValidator());
Factory.addGetterSetter(Arc, "clockwise", false, getBooleanValidator());

// node_modules/konva/lib/BezierFunctions.js
var tValues20 = [
  -0.07652652113349734,
  0.07652652113349734,
  -0.22778585114164507,
  0.22778585114164507,
  -0.37370608871541955,
  0.37370608871541955,
  -0.5108670019508271,
  0.5108670019508271,
  -0.636053680726515,
  0.636053680726515,
  -0.7463319064601508,
  0.7463319064601508,
  -0.8391169718222188,
  0.8391169718222188,
  -0.912234428251326,
  0.912234428251326,
  -0.9639719272779138,
  0.9639719272779138,
  -0.9931285991850949,
  0.9931285991850949
];
var cValues20 = [
  0.15275338713072584,
  0.15275338713072584,
  0.14917298647260374,
  0.14917298647260374,
  0.14209610931838204,
  0.14209610931838204,
  0.13168863844917664,
  0.13168863844917664,
  0.11819453196151841,
  0.11819453196151841,
  0.10193011981724044,
  0.10193011981724044,
  0.08327674157670475,
  0.08327674157670475,
  0.06267204833410907,
  0.06267204833410907,
  0.04060142980038694,
  0.04060142980038694,
  0.017614007139152118,
  0.017614007139152118
];
var getCubicArcLength = (xs, ys, t2) => {
  const z = t2 / 2;
  let sum = 0;
  for (let i2 = 0; i2 < tValues20.length; i2++) {
    const correctedT = z * tValues20[i2] + z;
    sum += cValues20[i2] * BFunc(xs, ys, correctedT);
  }
  return z * sum;
};
var getQuadraticArcLength = (xs, ys, t2 = 1) => getCubicArcLength([
  xs[0],
  xs[0] + 2 / 3 * (xs[1] - xs[0]),
  xs[2] + 2 / 3 * (xs[1] - xs[2]),
  xs[2]
], [
  ys[0],
  ys[0] + 2 / 3 * (ys[1] - ys[0]),
  ys[2] + 2 / 3 * (ys[1] - ys[2]),
  ys[2]
], t2);
function BFunc(xs, ys, t2) {
  const mt = 1 - t2;
  const a3 = mt * mt;
  const b2 = 2 * mt * t2;
  const c2 = t2 * t2;
  const dx = a3 * (3 * (xs[1] - xs[0])) + b2 * (3 * (xs[2] - xs[1])) + c2 * (3 * (xs[3] - xs[2]));
  const dy = a3 * (3 * (ys[1] - ys[0])) + b2 * (3 * (ys[2] - ys[1])) + c2 * (3 * (ys[3] - ys[2]));
  return Math.sqrt(dx * dx + dy * dy);
}
var t2length = (length, totalLength, func) => {
  let error = 1;
  let t2 = length / totalLength;
  let step = (length - func(t2)) / totalLength;
  let numIterations = 0;
  while (error > 1e-3) {
    const increasedTLength = func(t2 + step);
    const increasedTError = Math.abs(length - increasedTLength) / totalLength;
    if (increasedTError < error) {
      error = increasedTError;
      t2 += step;
    } else {
      const decreasedTLength = func(t2 - step);
      const decreasedTError = Math.abs(length - decreasedTLength) / totalLength;
      if (decreasedTError < error) {
        error = decreasedTError;
        t2 -= step;
      } else {
        step /= 2;
      }
    }
    numIterations++;
    if (numIterations > 500) {
      break;
    }
  }
  return t2;
};
var quadraticAt = (p0, p1, p2, t2) => {
  const mt = 1 - t2;
  return mt * mt * p0 + 2 * mt * t2 * p1 + t2 * t2 * p2;
};
var getQuadraticExtremaPoints = (x0, y0, x1, y1, x2, y2) => {
  const extrema = [];
  for (const axis of [
    [x0, x1, x2],
    [y0, y1, y2]
  ]) {
    const t2 = (axis[0] - axis[1]) / (axis[0] - 2 * axis[1] + axis[2]);
    if (t2 > 0 && t2 < 1) {
      extrema.push(quadraticAt(x0, x1, x2, t2), quadraticAt(y0, y1, y2, t2));
    }
  }
  return extrema;
};
var cubicAt = (p0, p1, p2, p3, t2) => {
  const mt = 1 - t2;
  return mt * mt * mt * p0 + 3 * mt * mt * t2 * p1 + 3 * mt * t2 * t2 * p2 + t2 * t2 * t2 * p3;
};
var getCubicExtremaPoints = (x0, y0, x1, y1, x2, y2, x3, y3) => {
  const extrema = [];
  for (const axis of [
    [x0, x1, x2, x3],
    [y0, y1, y2, y3]
  ]) {
    const a3 = -3 * axis[0] + 9 * axis[1] - 9 * axis[2] + 3 * axis[3];
    const b2 = 6 * axis[0] - 12 * axis[1] + 6 * axis[2];
    const c2 = -3 * axis[0] + 3 * axis[1];
    const discriminant = b2 * b2 - 4 * a3 * c2;
    if (discriminant < 0) {
      continue;
    }
    const q = -(b2 + (b2 < 0 ? -1 : 1) * Math.sqrt(discriminant)) / 2;
    for (const t2 of [q / a3, c2 / q]) {
      if (t2 > 0 && t2 < 1) {
        extrema.push(cubicAt(x0, x1, x2, x3, t2), cubicAt(y0, y1, y2, y3, t2));
      }
    }
  }
  return extrema;
};

// node_modules/konva/lib/shapes/Line.js
function getControlPoints(x0, y0, x1, y1, x2, y2, t2) {
  const d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2)), d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)), dSum = d01 + d12;
  if (dSum === 0) {
    return [x1, y1, x1, y1];
  }
  const fa = t2 * d01 / dSum, fb = t2 * d12 / dSum, p1x = x1 - fa * (x2 - x0), p1y = y1 - fa * (y2 - y0), p2x = x1 + fb * (x2 - x0), p2y = y1 + fb * (y2 - y0);
  return [p1x, p1y, p2x, p2y];
}
function expandPoints(p2, tension) {
  const len = p2.length, allPoints = [];
  for (let n2 = 2; n2 < len - 2; n2 += 2) {
    const cp = getControlPoints(p2[n2 - 2], p2[n2 - 1], p2[n2], p2[n2 + 1], p2[n2 + 2], p2[n2 + 3], tension);
    if (isNaN(cp[0])) {
      continue;
    }
    allPoints.push(cp[0]);
    allPoints.push(cp[1]);
    allPoints.push(p2[n2]);
    allPoints.push(p2[n2 + 1]);
    allPoints.push(cp[2]);
    allPoints.push(cp[3]);
  }
  return allPoints;
}
function getBezierExtremaPoints(points) {
  const extrema = [];
  for (let n2 = 0; n2 + 7 < points.length; n2 += 6) {
    extrema.push(points[n2 + 6], points[n2 + 7], ...getCubicExtremaPoints(points[n2], points[n2 + 1], points[n2 + 2], points[n2 + 3], points[n2 + 4], points[n2 + 5], points[n2 + 6], points[n2 + 7]));
  }
  return extrema;
}
var Line = class extends Shape {
  constructor(config) {
    super(config);
    this.on("pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva", function() {
      this._clearCache("tensionPoints");
    });
  }
  _hasTension() {
    return this.tension() !== 0 && this.points().length > 4;
  }
  /**
   * Report every curve segment of a line with a tension, in draw order. Both
   * the scene function and the bounding rect read the shape through this, so
   * that they can not disagree about which curve the line is.
   *
   * The handlers take plain numbers, because this runs on every frame.
   */
  _eachTensionSegment(onQuadratic, onCubic) {
    const points = this.points(), length = points.length, closed = this.closed(), tp = this.getTensionPoints(), len = tp.length;
    let x0 = points[0], y0 = points[1], n2 = closed ? 0 : 4;
    if (!closed) {
      onQuadratic(x0, y0, tp[0], tp[1], tp[2], tp[3]);
      x0 = tp[2];
      y0 = tp[3];
    }
    while (n2 < len - 2) {
      const cp1x = tp[n2++], cp1y = tp[n2++], cp2x = tp[n2++], cp2y = tp[n2++], x2 = tp[n2++], y = tp[n2++];
      onCubic(x0, y0, cp1x, cp1y, cp2x, cp2y, x2, y);
      x0 = x2;
      y0 = y;
    }
    if (!closed) {
      onQuadratic(x0, y0, tp[len - 2], tp[len - 1], points[length - 2], points[length - 1]);
    }
  }
  _getStrokePadding(miterLimit = this.points().length === 4 && !this.closed() ? 1 : void 0) {
    return super._getStrokePadding(miterLimit);
  }
  _sceneFunc(context) {
    const points = this.points(), length = points.length, closed = this.closed(), bezier = this.bezier();
    if (!length) {
      return;
    }
    let n2 = 0;
    context.beginPath();
    context.moveTo(points[0], points[1]);
    if (this._hasTension()) {
      this._eachTensionSegment((_x0, _y0, cpx, cpy, x2, y) => context.quadraticCurveTo(cpx, cpy, x2, y), (_x0, _y0, cp1x, cp1y, cp2x, cp2y, x2, y) => context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y));
    } else if (bezier) {
      n2 = 2;
      while (n2 < length) {
        context.bezierCurveTo(points[n2++], points[n2++], points[n2++], points[n2++], points[n2++], points[n2++]);
      }
    } else {
      for (n2 = 2; n2 < length; n2 += 2) {
        context.lineTo(points[n2], points[n2 + 1]);
      }
    }
    if (closed) {
      context.closePath();
      context.fillStrokeShape(this);
    } else {
      context.strokeShape(this);
    }
  }
  getTensionPoints() {
    return this._getCache("tensionPoints", this._getTensionPoints);
  }
  _getTensionPoints() {
    if (this.closed()) {
      return this._getTensionPointsClosed();
    } else {
      return expandPoints(this.points(), this.tension());
    }
  }
  _getTensionPointsClosed() {
    const p2 = this.points(), len = p2.length, tension = this.tension(), firstControlPoints = getControlPoints(p2[len - 2], p2[len - 1], p2[0], p2[1], p2[2], p2[3], tension), lastControlPoints = getControlPoints(p2[len - 4], p2[len - 3], p2[len - 2], p2[len - 1], p2[0], p2[1], tension), middle = expandPoints(p2, tension), tp = [firstControlPoints[2], firstControlPoints[3]].concat(middle).concat([
      lastControlPoints[0],
      lastControlPoints[1],
      p2[len - 2],
      p2[len - 1],
      lastControlPoints[2],
      lastControlPoints[3],
      firstControlPoints[0],
      firstControlPoints[1],
      p2[0],
      p2[1]
    ]);
    return tp;
  }
  getWidth() {
    return this.getSelfRect().width;
  }
  getHeight() {
    return this.getSelfRect().height;
  }
  // overload size detection
  getSelfRect() {
    let points = this.points();
    if (points.length < 4) {
      return {
        x: points[0] || 0,
        y: points[1] || 0,
        width: 0,
        height: 0
      };
    }
    if (this._hasTension()) {
      const bounds = [points[0], points[1]];
      this._eachTensionSegment((x0, y0, cpx, cpy, x2, y) => bounds.push(x2, y, ...getQuadraticExtremaPoints(x0, y0, cpx, cpy, x2, y)), (x0, y0, cp1x, cp1y, cp2x, cp2y, x2, y) => bounds.push(x2, y, ...getCubicExtremaPoints(x0, y0, cp1x, cp1y, cp2x, cp2y, x2, y)));
      points = bounds;
    } else if (this.bezier()) {
      points = [points[0], points[1], ...getBezierExtremaPoints(points)];
    }
    return Util._getPointsRect(points);
  }
};
Line.prototype.className = "Line";
Line.prototype._attrsAffectingSize = ["points", "bezier", "tension", "closed"];
_registerNode(Line, true);
Factory.addGetterSetter(Line, "closed", false);
Factory.addGetterSetter(Line, "bezier", false);
Factory.addGetterSetter(Line, "tension", 0, getNumberValidator());
Factory.addGetterSetter(Line, "points", [], getNumberArrayValidator());

// node_modules/konva/lib/shapes/Path.js
var PARAM_COUNT = {
  m: 2,
  l: 2,
  h: 1,
  v: 1,
  c: 6,
  s: 4,
  q: 4,
  t: 2,
  a: 7,
  z: 0
};
var TAU = Math.PI * 2;
var Path = class _Path extends Shape {
  constructor(config) {
    super(config);
    this.dataArray = [];
    this.pathLength = 0;
    this._readDataAttribute();
    this.on("dataChange.konva", function() {
      this._readDataAttribute();
    });
  }
  _readDataAttribute() {
    this.dataArray = _Path.parsePathData(this.data());
    this.pathLength = _Path.getPathLength(this.dataArray);
  }
  _sceneFunc(context) {
    const ca = this.dataArray;
    context.beginPath();
    let isClosed = false;
    for (let n2 = 0; n2 < ca.length; n2++) {
      const c2 = ca[n2].command;
      const p2 = ca[n2].points;
      switch (c2) {
        case "L":
          context.lineTo(p2[0], p2[1]);
          break;
        case "M":
          context.moveTo(p2[0], p2[1]);
          break;
        case "C":
          context.bezierCurveTo(p2[0], p2[1], p2[2], p2[3], p2[4], p2[5]);
          break;
        case "Q":
          context.quadraticCurveTo(p2[0], p2[1], p2[2], p2[3]);
          break;
        case "A":
          context.ellipse(p2[0], p2[1], p2[2], p2[3], p2[6], p2[4], p2[4] + p2[5], !p2[7]);
          break;
        case "z":
          isClosed = true;
          context.closePath();
          break;
      }
    }
    if (!isClosed && !this.hasFill()) {
      context.strokeShape(this);
    } else {
      context.fillStrokeShape(this);
    }
  }
  getWidth() {
    return this.getSelfRect().width;
  }
  getHeight() {
    return this.getSelfRect().height;
  }
  getSelfRect() {
    const points = [];
    this.dataArray.forEach(function(data) {
      if (data.command === "A") {
        const [cx, cy, rx, ry, start, dTheta, psi] = data.points;
        const cos = Math.cos(psi), sin = Math.sin(psi);
        const end = _Path.getPointOnEllipticalArc(cx, cy, rx, ry, start + dTheta, psi);
        points.push(data.start.x, data.start.y, end.x, end.y);
        const tx = Math.atan2(-ry * sin, rx * cos);
        const ty = Math.atan2(ry * cos, rx * sin);
        [tx, tx + Math.PI, ty, ty + Math.PI].forEach((t2) => {
          const k = ((t2 - start) * Math.sign(dTheta) % TAU + TAU) % TAU;
          if (k < Math.abs(dTheta)) {
            const point = _Path.getPointOnEllipticalArc(cx, cy, rx, ry, t2, psi);
            points.push(point.x, point.y);
          }
        });
      } else if (data.command === "C") {
        points.push(data.start.x, data.start.y, data.points[4], data.points[5], ...getCubicExtremaPoints(data.start.x, data.start.y, data.points[0], data.points[1], data.points[2], data.points[3], data.points[4], data.points[5]));
      } else if (data.command === "Q") {
        points.push(data.start.x, data.start.y, data.points[2], data.points[3], ...getQuadraticExtremaPoints(data.start.x, data.start.y, data.points[0], data.points[1], data.points[2], data.points[3]));
      } else {
        points.push(...data.points);
      }
    });
    return Util._getPointsRect(points);
  }
  /**
   * Return length of the path.
   * @method
   * @name Konva.Path#getLength
   * @returns {Number} length
   * @example
   * var length = path.getLength();
   */
  getLength() {
    return this.pathLength;
  }
  /**
   * Get point on path at specific length of the path
   * @method
   * @name Konva.Path#getPointAtLength
   * @param {Number} length length
   * @returns {Object} point {x,y} point
   * @example
   * var point = path.getPointAtLength(10);
   */
  getPointAtLength(length) {
    return _Path.getPointAtLengthOfDataArray(length, this.dataArray);
  }
  static getLineLength(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  }
  static getPathLength(dataArray) {
    let pathLength = 0;
    for (let i2 = 0; i2 < dataArray.length; ++i2) {
      pathLength += dataArray[i2].pathLength;
    }
    return pathLength;
  }
  // The optional cursor is for sequential lookups within one continuous subpath.
  static getPointAtLengthOfDataArray(length, dataArray, cursor) {
    var _a2, _b;
    let points, i2 = (_a2 = cursor === null || cursor === void 0 ? void 0 : cursor.index) !== null && _a2 !== void 0 ? _a2 : 0, offset = (_b = cursor === null || cursor === void 0 ? void 0 : cursor.offset) !== null && _b !== void 0 ? _b : 0, ii = dataArray.length;
    if (!ii) {
      return null;
    }
    while (i2 > 0 && length <= offset) {
      offset -= dataArray[--i2].pathLength;
    }
    length -= offset;
    while (i2 < ii && length > dataArray[i2].pathLength) {
      const segmentLength = dataArray[i2].pathLength;
      length -= segmentLength;
      offset += segmentLength;
      ++i2;
    }
    if (cursor && i2 < ii) {
      cursor.index = i2;
      cursor.offset = offset;
    }
    if (i2 === ii) {
      i2--;
      length = dataArray[i2].pathLength;
    }
    if (length < 0.01) {
      const cmd = dataArray[i2].command;
      if (cmd === "M") {
        points = dataArray[i2].points.slice(0, 2);
        return {
          x: points[0],
          y: points[1]
        };
      } else {
        return {
          x: dataArray[i2].start.x,
          y: dataArray[i2].start.y
        };
      }
    }
    const cp = dataArray[i2];
    const p2 = cp.points;
    switch (cp.command) {
      case "L":
      case "z":
        return _Path.getPointOnLine(length, cp.start.x, cp.start.y, p2[0], p2[1]);
      case "C":
        return _Path.getPointOnCubicBezier(t2length(length, cp.pathLength, (i3) => {
          return getCubicArcLength([cp.start.x, p2[0], p2[2], p2[4]], [cp.start.y, p2[1], p2[3], p2[5]], i3);
        }), cp.start.x, cp.start.y, p2[0], p2[1], p2[2], p2[3], p2[4], p2[5]);
      case "Q":
        return _Path.getPointOnQuadraticBezier(t2length(length, cp.pathLength, (i3) => {
          return getQuadraticArcLength([cp.start.x, p2[0], p2[2]], [cp.start.y, p2[1], p2[3]], i3);
        }), cp.start.x, cp.start.y, p2[0], p2[1], p2[2], p2[3]);
      case "A":
        return _Path.getPointOnEllipticalArc(
          p2[0],
          p2[1],
          p2[2],
          p2[3],
          // on a circle angle is proportional to distance, so the walk is only
          // needed for a real ellipse
          p2[2] === p2[3] ? p2[4] + p2[5] * length / cp.pathLength : _Path._walkArc(p2, length).theta,
          p2[6]
        );
    }
    return null;
  }
  static getPointOnLine(dist, P1x, P1y, P2x, P2y, fromX, fromY) {
    fromX = fromX !== null && fromX !== void 0 ? fromX : P1x;
    fromY = fromY !== null && fromY !== void 0 ? fromY : P1y;
    const len = this.getLineLength(P1x, P1y, P2x, P2y);
    if (len < 1e-10) {
      return { x: P1x, y: P1y };
    }
    if (P2x === P1x) {
      return { x: fromX, y: fromY + (P2y > P1y ? dist : -dist) };
    }
    const m = (P2y - P1y) / (P2x - P1x);
    const run = Math.sqrt(dist * dist / (1 + m * m)) * (P2x < P1x ? -1 : 1);
    const rise = m * run;
    if (Math.abs(fromY - P1y - m * (fromX - P1x)) < 1e-10) {
      return { x: fromX + run, y: fromY + rise };
    }
    const u2 = ((fromX - P1x) * (P2x - P1x) + (fromY - P1y) * (P2y - P1y)) / (len * len);
    const ix = P1x + u2 * (P2x - P1x);
    const iy = P1y + u2 * (P2y - P1y);
    const pRise = this.getLineLength(fromX, fromY, ix, iy);
    const pRun = Math.sqrt(dist * dist - pRise * pRise);
    const adjustedRun = Math.sqrt(pRun * pRun / (1 + m * m)) * (P2x < P1x ? -1 : 1);
    const adjustedRise = m * adjustedRun;
    return { x: ix + adjustedRun, y: iy + adjustedRise };
  }
  static getPointOnCubicBezier(pct, P1x, P1y, P2x, P2y, P3x, P3y, P4x, P4y) {
    function CB1(t2) {
      return t2 * t2 * t2;
    }
    function CB2(t2) {
      return 3 * t2 * t2 * (1 - t2);
    }
    function CB3(t2) {
      return 3 * t2 * (1 - t2) * (1 - t2);
    }
    function CB4(t2) {
      return (1 - t2) * (1 - t2) * (1 - t2);
    }
    const x2 = P4x * CB1(pct) + P3x * CB2(pct) + P2x * CB3(pct) + P1x * CB4(pct);
    const y = P4y * CB1(pct) + P3y * CB2(pct) + P2y * CB3(pct) + P1y * CB4(pct);
    return { x: x2, y };
  }
  static getPointOnQuadraticBezier(pct, P1x, P1y, P2x, P2y, P3x, P3y) {
    function QB1(t2) {
      return t2 * t2;
    }
    function QB2(t2) {
      return 2 * t2 * (1 - t2);
    }
    function QB3(t2) {
      return (1 - t2) * (1 - t2);
    }
    const x2 = P3x * QB1(pct) + P2x * QB2(pct) + P1x * QB3(pct);
    const y = P3y * QB1(pct) + P2y * QB2(pct) + P1y * QB3(pct);
    return { x: x2, y };
  }
  static getPointOnEllipticalArc(cx, cy, rx, ry, theta, psi) {
    const cosPsi = Math.cos(psi), sinPsi = Math.sin(psi);
    const pt = {
      x: rx * Math.cos(theta),
      y: ry * Math.sin(theta)
    };
    return {
      x: cx + (pt.x * cosPsi - pt.y * sinPsi),
      y: cy + (pt.x * sinPsi + pt.y * cosPsi)
    };
  }
  /*
   * get parsed data array from the data
   *  string.  V, v, H, h, and l data are converted to
   *  L data for the purpose of high performance Path
   *  rendering
   */
  static parsePathData(data) {
    if (!data) {
      return [];
    }
    let cs = data;
    const cc = [
      "m",
      "M",
      "l",
      "L",
      "v",
      "V",
      "h",
      "H",
      "z",
      "Z",
      "c",
      "C",
      "q",
      "Q",
      "t",
      "T",
      "s",
      "S",
      "a",
      "A"
    ];
    cs = cs.replace(new RegExp(" ", "g"), ",");
    for (let n2 = 0; n2 < cc.length; n2++) {
      cs = cs.replace(new RegExp(cc[n2], "g"), "|" + cc[n2]);
    }
    const arr = cs.split("|");
    const ca = [];
    const coords = [];
    let cpx = 0;
    let cpy = 0;
    let spx = 0;
    let spy = 0;
    const re = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi;
    let match;
    for (let n2 = 1; n2 < arr.length; n2++) {
      let str = arr[n2];
      let c2 = str.charAt(0);
      str = str.slice(1);
      coords.length = 0;
      while (match = re.exec(str)) {
        coords.push(match[0]);
      }
      const p2 = [];
      let arcParamIndex = c2 === "A" || c2 === "a" ? 0 : -1;
      for (let j = 0, jlen = coords.length; j < jlen; j++) {
        let token = coords[j];
        while ((arcParamIndex === 3 || arcParamIndex === 4) && token.length > 1 && (token[0] === "0" || token[0] === "1")) {
          p2.push(+token[0]);
          arcParamIndex++;
          token = token.slice(1);
        }
        const parsed = parseFloat(token);
        p2.push(isNaN(parsed) ? 0 : parsed);
        if (arcParamIndex >= 0) {
          arcParamIndex = (arcParamIndex + 1) % 7;
        }
      }
      let pIndex = 0;
      while (pIndex < p2.length) {
        if (p2.length - pIndex < PARAM_COUNT[c2.toLowerCase()] || c2 === "z" || c2 === "Z") {
          break;
        }
        let cmd = "";
        let points = [];
        const startX = cpx, startY = cpy;
        let prevCmd, ctlPtx, ctlPty;
        let rx, ry, psi, fa, fs, x1, y1;
        switch (c2) {
          // Note: Keep the lineTo's above the moveTo's in this switch
          case "l":
            cpx += p2[pIndex++];
            cpy += p2[pIndex++];
            cmd = "L";
            points.push(cpx, cpy);
            break;
          case "L":
            cpx = p2[pIndex++];
            cpy = p2[pIndex++];
            points.push(cpx, cpy);
            break;
          // Note: lineTo handlers need to be above this point
          case "m":
            cpx += p2[pIndex++];
            cpy += p2[pIndex++];
            cmd = "M";
            spx = cpx;
            spy = cpy;
            points.push(cpx, cpy);
            c2 = "l";
            break;
          case "M":
            cpx = p2[pIndex++];
            cpy = p2[pIndex++];
            cmd = "M";
            spx = cpx;
            spy = cpy;
            points.push(cpx, cpy);
            c2 = "L";
            break;
          case "h":
            cpx += p2[pIndex++];
            cmd = "L";
            points.push(cpx, cpy);
            break;
          case "H":
            cpx = p2[pIndex++];
            cmd = "L";
            points.push(cpx, cpy);
            break;
          case "v":
            cpy += p2[pIndex++];
            cmd = "L";
            points.push(cpx, cpy);
            break;
          case "V":
            cpy = p2[pIndex++];
            cmd = "L";
            points.push(cpx, cpy);
            break;
          case "C":
            points.push(p2[pIndex++], p2[pIndex++], p2[pIndex++], p2[pIndex++]);
            cpx = p2[pIndex++];
            cpy = p2[pIndex++];
            points.push(cpx, cpy);
            break;
          case "c":
            points.push(cpx + p2[pIndex++], cpy + p2[pIndex++], cpx + p2[pIndex++], cpy + p2[pIndex++]);
            cpx += p2[pIndex++];
            cpy += p2[pIndex++];
            cmd = "C";
            points.push(cpx, cpy);
            break;
          case "S":
            ctlPtx = cpx;
            ctlPty = cpy;
            prevCmd = ca[ca.length - 1];
            if ((prevCmd === null || prevCmd === void 0 ? void 0 : prevCmd.command) === "C") {
              ctlPtx = cpx + (cpx - prevCmd.points[2]);
              ctlPty = cpy + (cpy - prevCmd.points[3]);
            }
            points.push(ctlPtx, ctlPty, p2[pIndex++], p2[pIndex++]);
            cpx = p2[pIndex++];
            cpy = p2[pIndex++];
            cmd = "C";
            points.push(cpx, cpy);
            break;
          case "s":
            ctlPtx = cpx;
            ctlPty = cpy;
            prevCmd = ca[ca.length - 1];
            if ((prevCmd === null || prevCmd === void 0 ? void 0 : prevCmd.command) === "C") {
              ctlPtx = cpx + (cpx - prevCmd.points[2]);
              ctlPty = cpy + (cpy - prevCmd.points[3]);
            }
            points.push(ctlPtx, ctlPty, cpx + p2[pIndex++], cpy + p2[pIndex++]);
            cpx += p2[pIndex++];
            cpy += p2[pIndex++];
            cmd = "C";
            points.push(cpx, cpy);
            break;
          case "Q":
            points.push(p2[pIndex++], p2[pIndex++]);
            cpx = p2[pIndex++];
            cpy = p2[pIndex++];
            points.push(cpx, cpy);
            break;
          case "q":
            points.push(cpx + p2[pIndex++], cpy + p2[pIndex++]);
            cpx += p2[pIndex++];
            cpy += p2[pIndex++];
            cmd = "Q";
            points.push(cpx, cpy);
            break;
          case "T":
            ctlPtx = cpx;
            ctlPty = cpy;
            prevCmd = ca[ca.length - 1];
            if ((prevCmd === null || prevCmd === void 0 ? void 0 : prevCmd.command) === "Q") {
              ctlPtx = cpx + (cpx - prevCmd.points[0]);
              ctlPty = cpy + (cpy - prevCmd.points[1]);
            }
            cpx = p2[pIndex++];
            cpy = p2[pIndex++];
            cmd = "Q";
            points.push(ctlPtx, ctlPty, cpx, cpy);
            break;
          case "t":
            ctlPtx = cpx;
            ctlPty = cpy;
            prevCmd = ca[ca.length - 1];
            if ((prevCmd === null || prevCmd === void 0 ? void 0 : prevCmd.command) === "Q") {
              ctlPtx = cpx + (cpx - prevCmd.points[0]);
              ctlPty = cpy + (cpy - prevCmd.points[1]);
            }
            cpx += p2[pIndex++];
            cpy += p2[pIndex++];
            cmd = "Q";
            points.push(ctlPtx, ctlPty, cpx, cpy);
            break;
          case "A":
          case "a":
            rx = Math.abs(p2[pIndex++]);
            ry = Math.abs(p2[pIndex++]);
            psi = p2[pIndex++];
            fa = p2[pIndex++];
            fs = p2[pIndex++];
            x1 = cpx;
            y1 = cpy;
            if (c2 === "a") {
              cpx += p2[pIndex++];
              cpy += p2[pIndex++];
            } else {
              cpx = p2[pIndex++];
              cpy = p2[pIndex++];
            }
            cmd = "A";
            if (cpx === x1 && cpy === y1) {
              continue;
            } else if (!rx || !ry) {
              cmd = "L";
              points.push(cpx, cpy);
            } else {
              points = this.convertEndpointToCenterParameterization(x1, y1, cpx, cpy, fa, fs, rx, ry, psi);
            }
            break;
        }
        ca.push({
          command: cmd || c2,
          points,
          start: {
            x: startX,
            y: startY
          },
          pathLength: this.calcLength(startX, startY, cmd || c2, points)
        });
      }
      if (c2 === "z" || c2 === "Z") {
        ca.push({
          command: "z",
          points: [spx, spy],
          start: { x: cpx, y: cpy },
          pathLength: this.getLineLength(cpx, cpy, spx, spy)
        });
        cpx = spx;
        cpy = spy;
      }
    }
    return ca;
  }
  /**
   * Walks an arc in one degree steps, accumulating its length. Returns the
   * angle `length` along the arc, or its end angle and total length when
   * `length` is past the end.
   */
  static _walkArc(points, length) {
    const [cx, cy, rx, ry, start, dTheta] = points;
    const steps = Math.max(1, Math.ceil(Math.abs(dTheta) / (Math.PI / 180)));
    let p1 = _Path.getPointOnEllipticalArc(cx, cy, rx, ry, start, 0);
    let prev = start;
    let len = 0;
    for (let i2 = 1; i2 <= steps; i2++) {
      const t2 = start + dTheta * i2 / steps;
      const p2 = _Path.getPointOnEllipticalArc(cx, cy, rx, ry, t2, 0);
      const d2 = _Path.getLineLength(p1.x, p1.y, p2.x, p2.y);
      if (len + d2 >= length) {
        return { theta: prev + (t2 - prev) * ((length - len) / d2), length };
      }
      len += d2;
      p1 = p2;
      prev = t2;
    }
    return { theta: prev, length: len };
  }
  static calcLength(x2, y, cmd, points) {
    const path = _Path;
    switch (cmd) {
      case "L":
        return path.getLineLength(x2, y, points[0], points[1]);
      case "C":
        return getCubicArcLength([x2, points[0], points[2], points[4]], [y, points[1], points[3], points[5]], 1);
      case "Q":
        return getQuadraticArcLength([x2, points[0], points[2]], [y, points[1], points[3]], 1);
      case "A":
        return path._walkArc(points, Infinity).length;
    }
    return 0;
  }
  static convertEndpointToCenterParameterization(x1, y1, x2, y2, fa, fs, rx, ry, psiDeg) {
    const psi = psiDeg * (Math.PI / 180);
    const xp = Math.cos(psi) * (x1 - x2) / 2 + Math.sin(psi) * (y1 - y2) / 2;
    const yp = -1 * Math.sin(psi) * (x1 - x2) / 2 + Math.cos(psi) * (y1 - y2) / 2;
    const lambda = xp * xp / (rx * rx) + yp * yp / (ry * ry);
    if (lambda > 1) {
      rx *= Math.sqrt(lambda);
      ry *= Math.sqrt(lambda);
    }
    let f = Math.sqrt((rx * rx * (ry * ry) - rx * rx * (yp * yp) - ry * ry * (xp * xp)) / (rx * rx * (yp * yp) + ry * ry * (xp * xp)));
    if (fa === fs) {
      f *= -1;
    }
    if (isNaN(f)) {
      f = 0;
    }
    const cxp = f * rx * yp / ry;
    const cyp = f * -ry * xp / rx;
    const cx = (x1 + x2) / 2 + Math.cos(psi) * cxp - Math.sin(psi) * cyp;
    const cy = (y1 + y2) / 2 + Math.sin(psi) * cxp + Math.cos(psi) * cyp;
    const vMag = function(v2) {
      return Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);
    };
    const vRatio = function(u3, v2) {
      return (u3[0] * v2[0] + u3[1] * v2[1]) / (vMag(u3) * vMag(v2));
    };
    const vAngle = function(u3, v2) {
      return (u3[0] * v2[1] < u3[1] * v2[0] ? -1 : 1) * Math.acos(vRatio(u3, v2));
    };
    const theta = vAngle([1, 0], [(xp - cxp) / rx, (yp - cyp) / ry]);
    const u2 = [(xp - cxp) / rx, (yp - cyp) / ry];
    const v = [(-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry];
    let dTheta = vAngle(u2, v);
    if (vRatio(u2, v) <= -1) {
      dTheta = Math.PI;
    }
    if (vRatio(u2, v) >= 1) {
      dTheta = 0;
    }
    if (fs === 0 && dTheta > 0) {
      dTheta = dTheta - 2 * Math.PI;
    }
    if (fs === 1 && dTheta < 0) {
      dTheta = dTheta + 2 * Math.PI;
    }
    return [cx, cy, rx, ry, theta, dTheta, psi, fs];
  }
};
Path.prototype.className = "Path";
Path.prototype._attrsAffectingSize = ["data"];
_registerNode(Path, true);
Factory.addGetterSetter(Path, "data");

// node_modules/konva/lib/shapes/Arrow.js
var Arrow = class extends Line {
  _getStrokePadding() {
    return super._getStrokePadding(this.pointerAtBeginning() || this.pointerAtEnding() ? this.miterLimit() || 10 : void 0);
  }
  _sceneFunc(ctx) {
    super._sceneFunc(ctx);
    const points = this.points();
    const n2 = points.length;
    if (n2 < 4)
      return;
    const length = this.pointerLength();
    const width = this.pointerWidth();
    if (this.pointerAtEnding()) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(points[n2 - 2], points[n2 - 1]);
      ctx.rotate(this._getPointerAngle(false));
      ctx.moveTo(0, 0);
      ctx.lineTo(-length, width / 2);
      ctx.lineTo(-length, -width / 2);
      ctx.closePath();
      ctx.restore();
      this.__fillStroke(ctx);
    }
    if (this.pointerAtBeginning()) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(points[0], points[1]);
      ctx.rotate(this._getPointerAngle(true));
      ctx.moveTo(0, 0);
      ctx.lineTo(-length, width / 2);
      ctx.lineTo(-length, -width / 2);
      ctx.closePath();
      ctx.restore();
      this.__fillStroke(ctx);
    }
  }
  _getPointerAngle(atBeginning) {
    const points = this.points();
    const n2 = points.length;
    const fromTension = this.tension() !== 0 && n2 > 4;
    const tp = fromTension ? this.getTensionPoints() : points;
    const ex = atBeginning ? points[0] : points[n2 - 2], ey = atBeginning ? points[1] : points[n2 - 1];
    let dx = 0, dy = 0;
    if (fromTension && atBeginning) {
      dx = ex - (tp[0] + tp[2]) / 2;
      dy = ey - (tp[1] + tp[3]) / 2;
    } else if (fromTension) {
      const x2 = tp[tp.length - 4], y = tp[tp.length - 3];
      const controlX = tp[tp.length - 2], controlY = tp[tp.length - 1];
      const lastLength = Path.calcLength(x2, y, "Q", [
        controlX,
        controlY,
        ex,
        ey
      ]);
      const previous = Path.getPointOnQuadraticBezier(lastLength ? Math.max(0, 1 - this.pointerLength() / lastLength) : 0, x2, y, controlX, controlY, ex, ey);
      dx = ex - previous.x;
      dy = ey - previous.y;
    }
    for (let i2 = atBeginning ? 0 : tp.length - 2; !dx && !dy && i2 >= 0 && i2 < tp.length; i2 += atBeginning ? 2 : -2) {
      dx = ex - tp[i2];
      dy = ey - tp[i2 + 1];
    }
    const turn = Math.PI * 2;
    return (Math.atan2(dy, dx) + turn) % turn;
  }
  __fillStroke(ctx) {
    const isDashEnabled = this.dashEnabled();
    if (isDashEnabled) {
      this.attrs.dashEnabled = false;
      ctx.setLineDash([]);
    }
    ctx.fillStrokeShape(this);
    if (isDashEnabled) {
      this.attrs.dashEnabled = true;
    }
  }
  getSelfRect() {
    const lineRect = super.getSelfRect();
    const points = this.points();
    if (points.length < 4)
      return lineRect;
    let minX = lineRect.x, minY = lineRect.y;
    let maxX = minX + lineRect.width, maxY = minY + lineRect.height;
    for (const beginning of [false, true]) {
      if (!(beginning ? this.pointerAtBeginning() : this.pointerAtEnding()))
        continue;
      const index = beginning ? 0 : points.length - 2;
      const angle = this._getPointerAngle(beginning);
      const cos = Math.cos(angle), sin = Math.sin(angle);
      const x2 = points[index] - this.pointerLength() * cos;
      const y = points[index + 1] - this.pointerLength() * sin;
      const dx = Math.abs(this.pointerWidth() * sin / 2);
      const dy = Math.abs(this.pointerWidth() * cos / 2);
      minX = Math.min(minX, x2 - dx);
      minY = Math.min(minY, y - dy);
      maxX = Math.max(maxX, x2 + dx);
      maxY = Math.max(maxY, y + dy);
    }
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
  }
};
Arrow.prototype.className = "Arrow";
Arrow.prototype._attrsAffectingSize = [
  ...Line.prototype._attrsAffectingSize,
  "pointerLength",
  "pointerWidth",
  "pointerAtBeginning",
  "pointerAtEnding"
];
_registerNode(Arrow, true);
Factory.addGetterSetter(Arrow, "pointerLength", 10, getNumberValidator());
Factory.addGetterSetter(Arrow, "pointerWidth", 10, getNumberValidator());
Factory.addGetterSetter(Arrow, "pointerAtBeginning", false);
Factory.addGetterSetter(Arrow, "pointerAtEnding", true);

// node_modules/konva/lib/shapes/Circle.js
var Circle = class extends Shape {
  _getStrokePadding() {
    return super._getStrokePadding(1);
  }
  _sceneFunc(context) {
    context.beginPath();
    context.arc(0, 0, Math.abs(this.attrs.radius || 0), 0, Math.PI * 2, false);
    context.closePath();
    context.fillStrokeShape(this);
  }
  getWidth() {
    return Math.abs(this.radius()) * 2;
  }
  getHeight() {
    return Math.abs(this.radius()) * 2;
  }
  setWidth(width) {
    this.radius(width / 2);
  }
  setHeight(height) {
    this.radius(height / 2);
  }
};
Circle.prototype._centroid = true;
Circle.prototype.className = "Circle";
Circle.prototype._attrsAffectingSize = ["radius"];
_registerNode(Circle, true);
Factory.addGetterSetter(Circle, "radius", 0, getNumberValidator());

// node_modules/konva/lib/shapes/Ellipse.js
var Ellipse = class extends Shape {
  _getStrokePadding() {
    return super._getStrokePadding(1);
  }
  _sceneFunc(context) {
    const rx = Math.abs(this.radiusX()), ry = Math.abs(this.radiusY());
    context.beginPath();
    context.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2, false);
    context.closePath();
    context.fillStrokeShape(this);
  }
  getWidth() {
    return Math.abs(this.radiusX()) * 2;
  }
  getHeight() {
    return Math.abs(this.radiusY()) * 2;
  }
  setWidth(width) {
    this.radiusX(width / 2);
  }
  setHeight(height) {
    this.radiusY(height / 2);
  }
};
Ellipse.prototype.className = "Ellipse";
Ellipse.prototype._centroid = true;
Ellipse.prototype._attrsAffectingSize = ["radiusX", "radiusY"];
_registerNode(Ellipse, true);
Factory.addComponentsGetterSetter(Ellipse, "radius", ["x", "y"]);
Factory.addGetterSetter(Ellipse, "radiusX", 0, getNumberValidator());
Factory.addGetterSetter(Ellipse, "radiusY", 0, getNumberValidator());

// node_modules/konva/lib/shapes/Image.js
var Image2 = class _Image extends Shape {
  constructor(attrs) {
    super(attrs);
    this._loadListener = () => {
      this._requestDraw();
    };
    this.on("imageChange.konva", (props) => {
      this._removeImageLoad(props.oldVal);
      this._setImageLoad();
    });
    this._setImageLoad();
  }
  _setImageLoad() {
    var _a2;
    const image2 = this.image();
    if ((image2 === null || image2 === void 0 ? void 0 : image2.complete) && image2.src || (image2 === null || image2 === void 0 ? void 0 : image2.readyState) >= 2) {
      return;
    }
    (_a2 = image2 === null || image2 === void 0 ? void 0 : image2.addEventListener) === null || _a2 === void 0 ? void 0 : _a2.call(image2, "videoWidth" in image2 ? "loadeddata" : "load", this._loadListener);
  }
  _removeImageLoad(image2) {
    var _a2;
    (_a2 = image2 === null || image2 === void 0 ? void 0 : image2.removeEventListener) === null || _a2 === void 0 ? void 0 : _a2.call(image2, "videoWidth" in image2 ? "loadeddata" : "load", this._loadListener);
  }
  destroy() {
    this._removeImageLoad(this.image());
    super.destroy();
    return this;
  }
  _useBufferCanvas(forceFill, opacity = this.getAbsoluteOpacity()) {
    if (this.attrs.perfectDrawEnabled === false)
      return false;
    const hasCornerRadius = !!this.cornerRadius();
    const hasShadow = this.hasShadow();
    if (hasCornerRadius && hasShadow) {
      return true;
    }
    return super._useBufferCanvas(true, opacity);
  }
  _getStrokePadding() {
    return super._getStrokePadding(this.strokeScaleEnabled() ? 1 : void 0);
  }
  _sceneFunc(context) {
    const width = this.getWidth();
    const height = this.getHeight();
    const cornerRadius = this.cornerRadius();
    const image2 = this.attrs.image;
    if (this.hasFill() || this.hasStroke() || cornerRadius) {
      context.beginPath();
      cornerRadius ? Util.drawRoundedRectPath(context, width, height, cornerRadius) : context.rect(0, 0, width, height);
      context.closePath();
      context.fillStrokeShape(this);
    }
    if (image2) {
      if (cornerRadius) {
        context.clip();
      }
      const cropWidth = this.attrs.cropWidth;
      const cropHeight = this.attrs.cropHeight;
      if (cropWidth && cropHeight) {
        context.drawImage(image2, this.cropX(), this.cropY(), cropWidth, cropHeight, 0, 0, width, height);
      } else {
        context.drawImage(image2, 0, 0, width, height);
      }
    }
  }
  _hitFunc(context) {
    const width = this.width(), height = this.height(), cornerRadius = this.cornerRadius();
    context.beginPath();
    if (!cornerRadius) {
      context.rect(0, 0, width, height);
    } else {
      Util.drawRoundedRectPath(context, width, height, cornerRadius);
    }
    context.closePath();
    context.fillStrokeShape(this);
  }
  getWidth() {
    var _a2, _b, _c;
    const image2 = this.image();
    return (_c = (_b = (_a2 = this.attrs.width) !== null && _a2 !== void 0 ? _a2 : image2 === null || image2 === void 0 ? void 0 : image2.videoWidth) !== null && _b !== void 0 ? _b : image2 === null || image2 === void 0 ? void 0 : image2.width) !== null && _c !== void 0 ? _c : 0;
  }
  getHeight() {
    var _a2, _b, _c;
    const image2 = this.image();
    return (_c = (_b = (_a2 = this.attrs.height) !== null && _a2 !== void 0 ? _a2 : image2 === null || image2 === void 0 ? void 0 : image2.videoHeight) !== null && _b !== void 0 ? _b : image2 === null || image2 === void 0 ? void 0 : image2.height) !== null && _c !== void 0 ? _c : 0;
  }
  /**
   * load image from given url and create `Konva.Image` instance
   * @method
   * @memberof Konva.Image
   * @param {String} url image source
   * @param {Function} callback with Konva.Image instance as first argument
   * @param {Function} onError optional error handler
   * @example
   *  Konva.Image.fromURL(imageURL, function(image){
   *    // image is Konva.Image instance
   *    layer.add(image);
   *  });
   */
  static fromURL(url, callback, onError = null) {
    const img = Util.createImageElement();
    img.onload = () => {
      img.onload = img.onerror = null;
      callback(new _Image({ image: img }));
    };
    img.onerror = onError;
    img.crossOrigin = "Anonymous";
    img.src = url;
  }
};
Image2.prototype.className = "Image";
Image2.prototype._attrsAffectingSize = ["image"];
_registerNode(Image2, true);
Factory.addGetterSetter(Image2, "cornerRadius", 0, getNumberOrArrayOfNumbersValidator(4));
Factory.addGetterSetter(Image2, "image");
Factory.addComponentsGetterSetter(Image2, "crop", ["x", "y", "width", "height"]);
Factory.addGetterSetter(Image2, "cropX", 0, getNumberValidator());
Factory.addGetterSetter(Image2, "cropY", 0, getNumberValidator());
Factory.addGetterSetter(Image2, "cropWidth", 0, getNumberValidator());
Factory.addGetterSetter(Image2, "cropHeight", 0, getNumberValidator());

// node_modules/konva/lib/shapes/Text.js
var segmenter = typeof Intl !== "undefined" && Intl.Segmenter ? new Intl.Segmenter(void 0, { granularity: "grapheme" }) : null;
function getDecorationLineWidth(fontSize) {
  return fontSize / 15;
}
function stringToArray(string) {
  if (!segmenter) {
    return string.match(/\p{RI}\p{RI}|\P{M}(?:\p{M}|\p{Emoji_Modifier}|\uFE0F|\u200D\P{M})*|\p{M}+/gu) || [];
  }
  return Array.from(segmenter.segment(string), (s2) => s2.segment);
}
var AUTO = "auto";
var CENTER = "center";
var INHERIT = "inherit";
var JUSTIFY = "justify";
var CHANGE_KONVA = "Change.konva";
var CONTEXT_2D = "2d";
var DASH = "-";
var LEFT = "left";
var TEXT = "text";
var TEXT_UPPER = "Text";
var TOP = "top";
var BOTTOM = "bottom";
var MIDDLE = "middle";
var NORMAL = "normal";
var PX_SPACE = "px ";
var SPACE2 = " ";
var RIGHT = "right";
var RTL = "rtl";
var WORD = "word";
var CHAR = "char";
var NONE = "none";
var ELLIPSIS = "\u2026";
var ATTR_CHANGE_LIST = [
  "direction",
  "fontFamily",
  "fontSize",
  "fontStyle",
  "fontVariant",
  "padding",
  "align",
  "verticalAlign",
  "lineHeight",
  "text",
  "width",
  "height",
  "wrap",
  "ellipsis",
  "letterSpacing"
];
var _shadowOpacityBuggy = null;
function hasShadowOpacityBug() {
  if (_shadowOpacityBuggy !== null) {
    return _shadowOpacityBuggy;
  }
  _shadowOpacityBuggy = false;
  let c2;
  try {
    c2 = Util.createCanvasElement();
    c2.width = 10;
    c2.height = 10;
    const ctx = c2.getContext(CONTEXT_2D);
    if (ctx) {
      ctx.globalAlpha = 0;
      ctx.shadowColor = "black";
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
      ctx.fillStyle = "black";
      ctx.font = "10px Arial";
      ctx.fillText("X", 0, 10);
      const data = ctx.getImageData(0, 0, 10, 10).data;
      for (let i2 = 3; i2 < data.length; i2 += 4) {
        if (data[i2] > 0) {
          _shadowOpacityBuggy = true;
          break;
        }
      }
    }
  } catch (e2) {
  } finally {
    if (c2) {
      Util.releaseCanvas(c2);
    }
  }
  return _shadowOpacityBuggy;
}
function normalizeFontFamily(fontFamily) {
  return fontFamily.split(",").map((family) => {
    family = family.trim();
    const hasSpace = family.indexOf(" ") >= 0;
    const hasQuotes = family.indexOf('"') >= 0 || family.indexOf("'") >= 0;
    if (hasSpace && !hasQuotes) {
      family = `"${family}"`;
    }
    return family;
  }).join(", ");
}
var dummyContext2;
function getDummyContext2() {
  if (dummyContext2) {
    return dummyContext2;
  }
  dummyContext2 = Util.createCanvasElement().getContext(CONTEXT_2D);
  return dummyContext2;
}
function _fillFunc2(context) {
  if (this._partialFillStyle) {
    context.setAttr("fillStyle", this._partialFillStyle);
  }
  context.fillText(this._partialText, this._partialTextX, this._partialTextY);
}
function _strokeFunc2(context) {
  context.setAttr("miterLimit", 2);
  if (this._partialStrokeStyle) {
    context.setAttr("strokeStyle", this._partialStrokeStyle);
  }
  context.strokeText(this._partialText, this._partialTextX, this._partialTextY);
}
function checkDefaultFill(config) {
  config = config || {};
  const hasFill = config.fill || config.fillLinearGradientColorStops || config.fillRadialGradientColorStops || config.fillPatternImage;
  return hasFill ? config : { ...config, fill: "black" };
}
var Text = class extends Shape {
  constructor(config) {
    super(checkDefaultFill(config));
    this._partialTextX = 0;
    this._partialTextY = 0;
    this._baselineShift = 0;
    this._setTextData();
  }
  _sceneFunc(context) {
    var _a2, _b;
    const textArr = this.textArr, textArrLen = textArr.length;
    if (!this.text()) {
      return;
    }
    let padding = this.padding(), fontSize = this.fontSize(), lineHeightPx = this.lineHeight() * fontSize, direction = this.direction(), align = this.align(), totalWidth = this.getWidth(), letterSpacing = this.letterSpacing(), charRenderFunc = this.charRenderFunc(), textDecoration = this.textDecoration(), shouldUnderline = textDecoration.indexOf("underline") !== -1, shouldLineThrough = textDecoration.indexOf("line-through") !== -1, n2;
    let translateY = lineHeightPx / 2;
    let baseline = MIDDLE;
    if (!Konva.legacyTextRendering) {
      const metrics = this.measureSize("M");
      baseline = "alphabetic";
      const ascent = (_a2 = metrics.fontBoundingBoxAscent) !== null && _a2 !== void 0 ? _a2 : metrics.actualBoundingBoxAscent;
      const descent = (_b = metrics.fontBoundingBoxDescent) !== null && _b !== void 0 ? _b : metrics.actualBoundingBoxDescent;
      translateY = (ascent - descent) / 2 + lineHeightPx / 2;
    }
    if (direction !== INHERIT) {
      context.setAttr("direction", direction);
    } else {
      direction = context.direction;
    }
    context.setAttr("font", this._getContextFont());
    context.setAttr("textBaseline", baseline);
    context.setAttr("textAlign", LEFT);
    context.translate(padding, this._getTextTop());
    if (charRenderFunc) {
      const style = context._getFillStyle(this);
      if (style !== void 0)
        context.fillStyle = style;
      if (this.hasStroke())
        context._applyStrokeStyle(this);
    }
    const fillStyleBefore = charRenderFunc ? context.fillStyle : void 0;
    const strokeStyleBefore = charRenderFunc ? context.strokeStyle : void 0;
    let charIndex = 0;
    for (n2 = 0; n2 < textArrLen; n2++) {
      let lineTranslateX = 0;
      let lineTranslateY = 0;
      const obj = textArr[n2], text = obj.text, width = obj.width, lastLine = obj.lastInParagraph;
      context.save();
      if (align === RIGHT) {
        lineTranslateX += totalWidth - width - padding * 2;
      } else if (align === CENTER) {
        lineTranslateX += (totalWidth - width - padding * 2) / 2;
      }
      if (shouldUnderline) {
        context.save();
        context.beginPath();
        const yOffset = this._getUnderlineOffset();
        const x2 = lineTranslateX;
        const y = translateY + lineTranslateY + yOffset;
        context.moveTo(x2, y);
        const lineWidth = align === JUSTIFY && !lastLine ? totalWidth - padding * 2 : width;
        context.lineTo(x2 + Math.round(lineWidth), y);
        context.lineWidth = getDecorationLineWidth(fontSize);
        context.strokeStyle = context._getFillStyle(this);
        context.stroke();
        context.restore();
      }
      const lineThroughStartX = lineTranslateX;
      if (direction !== RTL && (letterSpacing !== 0 || align === JUSTIFY || charRenderFunc)) {
        const spacesNumber = text.split(" ").length - 1;
        const array = stringToArray(text);
        for (let li = 0; li < array.length; li++) {
          const letter = array[li];
          if (letter === " " && !lastLine && align === JUSTIFY) {
            lineTranslateX += (totalWidth - padding * 2 - width) / spacesNumber;
          }
          this._partialTextX = lineTranslateX;
          this._partialTextY = translateY + lineTranslateY;
          this._partialText = letter;
          const letterWidth = context.measureText(letter).width;
          if (charRenderFunc) {
            context.save();
            charRenderFunc({
              char: letter,
              index: charIndex,
              x: lineTranslateX,
              y: translateY + lineTranslateY,
              lineIndex: n2,
              column: li,
              isLastInLine: li === array.length - 1,
              width: letterWidth,
              context
            });
            const fillStyleAfter = context.fillStyle;
            if (fillStyleAfter !== fillStyleBefore) {
              this._partialFillStyle = fillStyleAfter;
            }
            const strokeStyleAfter = context.strokeStyle;
            if (strokeStyleAfter !== strokeStyleBefore) {
              this._partialStrokeStyle = strokeStyleAfter;
            }
          }
          context.fillStrokeShape(this);
          if (charRenderFunc) {
            this._partialFillStyle = void 0;
            this._partialStrokeStyle = void 0;
            context.restore();
          }
          lineTranslateX += letterWidth + letterSpacing;
          charIndex++;
        }
      } else {
        if (letterSpacing !== 0) {
          context.setAttr("letterSpacing", `${letterSpacing}px`);
        }
        this._partialTextX = lineTranslateX;
        this._partialTextY = translateY + lineTranslateY;
        this._partialText = text;
        context.fillStrokeShape(this);
      }
      if (shouldLineThrough) {
        context.save();
        context.beginPath();
        const yOffset = !Konva.legacyTextRendering ? -Math.round(fontSize / 4) : 0;
        const x2 = lineThroughStartX;
        context.moveTo(x2, translateY + lineTranslateY + yOffset);
        const lineWidth = align === JUSTIFY && !lastLine ? totalWidth - padding * 2 : width;
        context.lineTo(x2 + Math.round(lineWidth), translateY + lineTranslateY + yOffset);
        context.lineWidth = getDecorationLineWidth(fontSize);
        context.strokeStyle = context._getFillStyle(this);
        context.stroke();
        context.restore();
      }
      context.restore();
      if (textArrLen > 1) {
        translateY += lineHeightPx;
      }
    }
  }
  _getTextTop() {
    const padding = this.padding(), free = this.getHeight() - this.textArr.length * this.lineHeight() * this.fontSize() - padding * 2, verticalAlign = this.verticalAlign();
    if (verticalAlign === MIDDLE)
      return padding + free / 2;
    if (verticalAlign === BOTTOM)
      return padding + free;
    return padding;
  }
  _getUnderlineOffset() {
    var _a2;
    return (_a2 = this.underlineOffset()) !== null && _a2 !== void 0 ? _a2 : Math.round(this.fontSize() / (!Konva.legacyTextRendering ? 4 : 2));
  }
  getSelfRect() {
    const rect = super.getSelfRect();
    const lines = this.textArr.length;
    if (!lines || this.textDecoration().indexOf("underline") === -1) {
      return rect;
    }
    const fontSize = this.fontSize(), lineHeightPx = this.lineHeight() * fontSize;
    let bottom = this._getTextTop() + lines * lineHeightPx - lineHeightPx / 2;
    if (!Konva.legacyTextRendering) {
      bottom += this._baselineShift;
    }
    bottom += this._getUnderlineOffset() + getDecorationLineWidth(fontSize) / 2;
    rect.height = Math.max(rect.y + rect.height, bottom) - rect.y;
    return rect;
  }
  _getSelfRectForDrawing() {
    const rect = this.getSelfRect(), fontSize = this.fontSize(), padding = this.padding(), lineHeightPx = this.lineHeight() * fontSize, available = this.getWidth() - padding * 2, align = this.align(), blockHeight = this.textArr.length * lineHeightPx, top = this._getTextTop();
    let left = rect.x, right = rect.x + rect.width;
    for (const { text, width } of this.textArr) {
      const x2 = padding + (align === RIGHT ? available - width : align === CENTER ? (available - width) / 2 : 0);
      const back = Math.min(0, this.letterSpacing()) * text.length;
      left = Math.min(left, x2 + back);
      right = Math.max(right, x2 + width - back);
    }
    const underline = this.textDecoration().includes("underline");
    const y = Math.min(rect.y, top + (underline ? Math.min(0, this._getUnderlineOffset()) : 0));
    return {
      x: left - fontSize,
      y: y - fontSize,
      width: right - left + fontSize * 2,
      height: Math.max(rect.y + rect.height, top + blockHeight) - y + fontSize * 2
    };
  }
  _hitFunc(context) {
    const width = this.getWidth(), height = this.getHeight();
    context.beginPath();
    context.rect(0, 0, width, height);
    context.closePath();
    context.fillStrokeShape(this);
  }
  setText(text) {
    const str = Util._isString(text) ? text : text === null || text === void 0 ? "" : text + "";
    this._setAttr(TEXT, str);
    return this;
  }
  getWidth() {
    const isAuto = this.attrs.width === AUTO || this.attrs.width === void 0;
    return isAuto ? this.getTextWidth() + this.padding() * 2 : this.attrs.width;
  }
  getHeight() {
    const isAuto = this.attrs.height === AUTO || this.attrs.height === void 0;
    return isAuto ? this.fontSize() * this.textArr.length * this.lineHeight() + this.padding() * 2 : this.attrs.height;
  }
  /**
   * get pure text width without padding
   * @method
   * @name Konva.Text#getTextWidth
   * @returns {Number}
   */
  getTextWidth() {
    return this.textWidth;
  }
  getTextHeight() {
    Util.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height.");
    return this.textHeight;
  }
  /**
   * measure string with the font of current text shape.
   * That method can't handle multiline text.
   * @method
   * @name Konva.Text#measureSize
   * @param {String} text text to measure
   * @returns {Object} { width , height } of measured text
   */
  measureSize(text) {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    let _context = getDummyContext2(), fontSize = this.fontSize(), metrics;
    _context.save();
    _context.font = this._getContextFont();
    metrics = _context.measureText(text);
    _context.restore();
    const scaleFactor = fontSize / 100;
    return {
      actualBoundingBoxAscent: (_a2 = metrics.actualBoundingBoxAscent) !== null && _a2 !== void 0 ? _a2 : 71.58203125 * scaleFactor,
      actualBoundingBoxDescent: (_b = metrics.actualBoundingBoxDescent) !== null && _b !== void 0 ? _b : 0,
      // Remains zero as there is no descent in the provided metrics
      actualBoundingBoxLeft: (_c = metrics.actualBoundingBoxLeft) !== null && _c !== void 0 ? _c : -7.421875 * scaleFactor,
      actualBoundingBoxRight: (_d = metrics.actualBoundingBoxRight) !== null && _d !== void 0 ? _d : 75.732421875 * scaleFactor,
      alphabeticBaseline: (_e = metrics.alphabeticBaseline) !== null && _e !== void 0 ? _e : 0,
      // Remains zero as it's typically relative to the baseline itself
      emHeightAscent: (_f = metrics.emHeightAscent) !== null && _f !== void 0 ? _f : 100 * scaleFactor,
      emHeightDescent: (_g = metrics.emHeightDescent) !== null && _g !== void 0 ? _g : -20 * scaleFactor,
      fontBoundingBoxAscent: (_h = metrics.fontBoundingBoxAscent) !== null && _h !== void 0 ? _h : 91 * scaleFactor,
      fontBoundingBoxDescent: (_j = metrics.fontBoundingBoxDescent) !== null && _j !== void 0 ? _j : 21 * scaleFactor,
      hangingBaseline: (_k = metrics.hangingBaseline) !== null && _k !== void 0 ? _k : 72.80000305175781 * scaleFactor,
      ideographicBaseline: (_l = metrics.ideographicBaseline) !== null && _l !== void 0 ? _l : -21 * scaleFactor,
      width: metrics.width,
      height: fontSize
      // Typically set to the font size
    };
  }
  _getContextFont() {
    return this.fontStyle() + SPACE2 + this.fontVariant() + SPACE2 + (this.fontSize() + PX_SPACE) + // wrap font family into " so font families with spaces works ok
    normalizeFontFamily(this.fontFamily());
  }
  _addTextLine(line) {
    const align = this.align();
    if (align === JUSTIFY) {
      line = line.trim();
    }
    const width = this._getTextWidth(line);
    return this.textArr.push({
      text: line,
      width,
      lastInParagraph: false
    });
  }
  _getTextWidth(text, graphemes) {
    const letterSpacing = this.letterSpacing();
    const spacing = letterSpacing ? letterSpacing * (graphemes !== null && graphemes !== void 0 ? graphemes : stringToArray(text).length) : 0;
    return getDummyContext2().measureText(text).width + spacing;
  }
  _setTextData() {
    let lines = this.text().split("\n"), fontSize = +this.fontSize(), lineHeightPx = this.lineHeight() * fontSize, width = this.attrs.width, height = this.attrs.height, fixedWidth = width !== AUTO && width !== void 0, fixedHeight = height !== AUTO && height !== void 0, padding = this.padding(), maxWidth = width - padding * 2, maxHeightPx = height - padding * 2, currentHeightPx = 0, wrap = this.wrap(), shouldWrap = wrap !== NONE, wrapAtWord = wrap !== CHAR && shouldWrap, shouldAddEllipsis = this.ellipsis();
    const sample = this.measureSize("M");
    this._baselineShift = (sample.fontBoundingBoxAscent - sample.fontBoundingBoxDescent) / 2;
    this.textArr = [];
    const dummyContext3 = getDummyContext2();
    dummyContext3.font = this._getContextFont();
    dummyContext3.fontKerning = this.direction() !== RTL && (this.letterSpacing() !== 0 || this.align() === JUSTIFY || !!this.charRenderFunc()) ? "none" : "auto";
    const additionalWidth = shouldAddEllipsis ? this._getTextWidth(ELLIPSIS) : 0;
    for (let i2 = 0, max = lines.length; i2 < max; ++i2) {
      let line = lines[i2];
      let lineWidth = this._getTextWidth(line);
      if (fixedWidth && lineWidth > maxWidth) {
        const graphemes = stringToArray(line);
        const length = graphemes.length;
        let start = 0;
        const text = (end) => graphemes.slice(start, end).join("");
        const isBreak = (char) => char === SPACE2 || char === DASH;
        const perLine = Math.max(1, Math.ceil(length * maxWidth / lineWidth));
        while (start < length) {
          const extraWidth = shouldAddEllipsis && fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx ? additionalWidth : 0;
          const fits = (end) => {
            const width2 = this._getTextWidth(text(end), end - start);
            if (width2 + extraWidth > maxWidth) {
              return false;
            }
            return true;
          };
          let low = start, high = Math.min(length, start + perLine);
          while (fits(high)) {
            low = high;
            if (high === length) {
              break;
            }
            high = Math.min(length, high + (high - start));
          }
          while (high - low > 1) {
            const mid = low + high >>> 1;
            if (fits(mid)) {
              low = mid;
            } else {
              high = mid;
            }
          }
          if (low === start) {
            break;
          }
          if (low === length) {
            this._addTextLine(text(length));
            currentHeightPx += lineHeightPx;
            if (fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx && i2 < max - 1) {
              this._tryToAddEllipsisToLastLine();
            }
            break;
          }
          if (wrapAtWord && !isBreak(graphemes[low])) {
            let wrapIndex = low - 1;
            while (wrapIndex >= start && !isBreak(graphemes[wrapIndex])) {
              wrapIndex--;
            }
            if (wrapIndex >= start) {
              low = wrapIndex + 1;
            }
          }
          this._addTextLine(text(low).trimRight());
          currentHeightPx += lineHeightPx;
          if (this._shouldHandleEllipsis(currentHeightPx)) {
            this._tryToAddEllipsisToLastLine();
            break;
          }
          start = low;
          while (start < length && !graphemes[start].trim()) {
            start++;
          }
        }
      } else {
        this._addTextLine(line);
        currentHeightPx += lineHeightPx;
        if (fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx && i2 < max - 1) {
          this._tryToAddEllipsisToLastLine();
        }
      }
      if (this.textArr[this.textArr.length - 1]) {
        this.textArr[this.textArr.length - 1].lastInParagraph = true;
      }
      if (fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx) {
        break;
      }
    }
    this.textHeight = fontSize;
    this.textWidth = this.textArr.reduce((width2, line) => Math.max(width2, line.width), 0);
  }
  /**
   * whether to handle ellipsis, there are two cases:
   * 1. the current line is the last line
   * 2. wrap is NONE
   * @param {Number} currentHeightPx
   * @returns {Boolean}
   */
  _shouldHandleEllipsis(currentHeightPx) {
    const fontSize = +this.fontSize(), lineHeightPx = this.lineHeight() * fontSize, height = this.attrs.height, fixedHeight = height !== AUTO && height !== void 0, padding = this.padding(), maxHeightPx = height - padding * 2, wrap = this.wrap(), shouldWrap = wrap !== NONE;
    return !shouldWrap || fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx;
  }
  _tryToAddEllipsisToLastLine() {
    const width = this.attrs.width, fixedWidth = width !== AUTO && width !== void 0, padding = this.padding(), maxWidth = width - padding * 2, shouldAddEllipsis = this.ellipsis();
    const lastLine = this.textArr[this.textArr.length - 1];
    if (!lastLine || !shouldAddEllipsis) {
      return;
    }
    let text = lastLine.text + ELLIPSIS;
    if (fixedWidth) {
      const graphemes = stringToArray(lastLine.text);
      while (graphemes.length && this._getTextWidth(text) > maxWidth) {
        graphemes.pop();
        text = graphemes.join("") + ELLIPSIS;
      }
      if (this._getTextWidth(text) > maxWidth)
        text = "";
    }
    lastLine.text = text;
    lastLine.width = this._getTextWidth(text);
  }
  // for text we can't disable stroke scaling
  // if we do, the result will be unexpected
  getStrokeScaleEnabled() {
    return true;
  }
  _getStrokePadding() {
    return super._getStrokePadding(2);
  }
  _useBufferCanvas(forceFill, opacity = this.getAbsoluteOpacity()) {
    if (this.attrs.perfectDrawEnabled === false)
      return false;
    const hasLine = this.textDecoration().indexOf("underline") !== -1 || this.textDecoration().indexOf("line-through") !== -1;
    const hasShadow = this.hasShadow();
    if (hasLine && hasShadow) {
      return true;
    }
    if (hasShadow && opacity !== 1 && hasShadowOpacityBug()) {
      return true;
    }
    return super._useBufferCanvas(forceFill, opacity);
  }
};
Text.prototype._fillFunc = _fillFunc2;
Text.prototype._strokeFunc = _strokeFunc2;
Text.prototype.className = TEXT_UPPER;
Text.prototype._attrsAffectingSize = ATTR_CHANGE_LIST.filter((attr) => attr !== "width" && attr !== "height").concat(["textDecoration", "underlineOffset"]);
_registerNode(Text, true);
Text.prototype.on(ATTR_CHANGE_LIST.map((attr) => attr + CHANGE_KONVA).join(" "), function() {
  this._setTextData();
});
Factory.overWriteSetter(Text, "width", getNumberOrAutoValidator());
Factory.overWriteSetter(Text, "height", getNumberOrAutoValidator());
Factory.addGetterSetter(Text, "direction", INHERIT);
Factory.addGetterSetter(Text, "fontFamily", "Arial");
Factory.addGetterSetter(Text, "fontSize", 12, getNumberValidator());
Factory.addGetterSetter(Text, "fontStyle", NORMAL);
Factory.addGetterSetter(Text, "fontVariant", NORMAL);
Factory.addGetterSetter(Text, "padding", 0, getNumberValidator());
Factory.addGetterSetter(Text, "align", LEFT);
Factory.addGetterSetter(Text, "verticalAlign", TOP);
Factory.addGetterSetter(Text, "lineHeight", 1, getNumberValidator());
Factory.addGetterSetter(Text, "wrap", WORD);
Factory.addGetterSetter(Text, "ellipsis", false, getBooleanValidator());
Factory.addGetterSetter(Text, "letterSpacing", 0, getNumberValidator());
Factory.addGetterSetter(Text, "text", "", getStringValidator());
Factory.addGetterSetter(Text, "textDecoration", "");
Factory.addGetterSetter(Text, "underlineOffset", void 0, getNumberValidator());
Factory.addGetterSetter(Text, "charRenderFunc", void 0);

// node_modules/konva/lib/shapes/Label.js
var ATTR_CHANGE_LIST2 = [
  ...Text.prototype._attrsAffectingSize,
  "width",
  "height",
  "pointerDirection",
  "pointerWidth",
  "pointerHeight"
];
var CHANGE_EVENTS = ATTR_CHANGE_LIST2.map((attr) => attr + "Change.konva").join(" ");
var NONE2 = "none";
var UP = "up";
var RIGHT2 = "right";
var DOWN = "down";
var LEFT2 = "left";
var Label = class extends Group {
  constructor(config) {
    super(config);
    this._sync = this._sync.bind(this);
    this.on("add.konva", function(evt) {
      evt.child.off(CHANGE_EVENTS, this._sync).on(CHANGE_EVENTS, this._sync);
      this._sync();
    });
  }
  /**
   * get Text shape for the label.  You need to access the Text shape in order to update
   * the text properties
   * @name Konva.Label#getText
   * @method
   * @example
   * label.getText().fill('red')
   */
  getText() {
    return this.find("Text")[0];
  }
  /**
   * get Tag shape for the label.  You need to access the Tag shape in order to update
   * the pointer properties and the corner radius
   * @name Konva.Label#getTag
   * @method
   */
  getTag() {
    return this.find("Tag")[0];
  }
  getWidth() {
    return this.getText().width();
  }
  getHeight() {
    return this.getText().height();
  }
  _sync() {
    let text = this.getText(), tag = this.getTag(), width, height, pointerDirection, pointerWidth, x2, y, pointerHeight;
    if (text && tag) {
      width = text.width();
      height = text.height();
      pointerDirection = tag.pointerDirection();
      pointerWidth = tag.pointerWidth();
      pointerHeight = tag.pointerHeight();
      x2 = 0;
      y = 0;
      switch (pointerDirection) {
        case UP:
          x2 = width / 2;
          y = -1 * pointerHeight;
          break;
        case RIGHT2:
          x2 = width + pointerWidth;
          y = height / 2;
          break;
        case DOWN:
          x2 = width / 2;
          y = height + pointerHeight;
          break;
        case LEFT2:
          x2 = -1 * pointerWidth;
          y = height / 2;
          break;
      }
      tag.setAttrs({
        x: -1 * x2,
        y: -1 * y,
        width,
        height
      });
      text.setAttrs({
        x: -1 * x2,
        y: -1 * y
      });
    }
  }
};
Label.prototype.className = "Label";
_registerNode(Label);
var Tag = class extends Shape {
  _sceneFunc(context) {
    const width = this.width(), height = this.height(), pointerDirection = this.pointerDirection(), pointerWidth = this.pointerWidth(), pointerHeight = this.pointerHeight(), cornerRadius = this.cornerRadius();
    const [topLeft, topRight, bottomRight, bottomLeft] = Util._cornerRadii(cornerRadius, width, height);
    context.beginPath();
    context.moveTo(topLeft, 0);
    if (pointerDirection === UP) {
      context.lineTo((width - pointerWidth) / 2, 0);
      context.lineTo(width / 2, -1 * pointerHeight);
      context.lineTo((width + pointerWidth) / 2, 0);
    }
    context.lineTo(width - topRight, 0);
    context.arc(width - topRight, topRight, topRight, Math.PI * 3 / 2, 0, false);
    if (pointerDirection === RIGHT2) {
      context.lineTo(width, (height - pointerHeight) / 2);
      context.lineTo(width + pointerWidth, height / 2);
      context.lineTo(width, (height + pointerHeight) / 2);
    }
    context.lineTo(width, height - bottomRight);
    context.arc(width - bottomRight, height - bottomRight, bottomRight, 0, Math.PI / 2, false);
    if (pointerDirection === DOWN) {
      context.lineTo((width + pointerWidth) / 2, height);
      context.lineTo(width / 2, height + pointerHeight);
      context.lineTo((width - pointerWidth) / 2, height);
    }
    context.lineTo(bottomLeft, height);
    context.arc(bottomLeft, height - bottomLeft, bottomLeft, Math.PI / 2, Math.PI, false);
    if (pointerDirection === LEFT2) {
      context.lineTo(0, (height + pointerHeight) / 2);
      context.lineTo(-1 * pointerWidth, height / 2);
      context.lineTo(0, (height - pointerHeight) / 2);
    }
    context.lineTo(0, topLeft);
    context.arc(topLeft, topLeft, topLeft, Math.PI, Math.PI * 3 / 2, false);
    context.closePath();
    context.fillStrokeShape(this);
  }
  getSelfRect() {
    const pointerWidth = this.pointerWidth(), pointerHeight = this.pointerHeight(), direction = this.pointerDirection(), width = this.width(), height = this.height();
    if (direction === UP || direction === DOWN) {
      return {
        x: Math.min(0, (width - pointerWidth) / 2),
        y: direction === UP ? -pointerHeight : 0,
        width: Math.max(width, pointerWidth),
        height: height + pointerHeight
      };
    }
    if (direction === LEFT2 || direction === RIGHT2) {
      return {
        x: direction === LEFT2 ? -pointerWidth : 0,
        y: Math.min(0, (height - pointerHeight) / 2),
        width: width + pointerWidth,
        height: Math.max(height, pointerHeight)
      };
    }
    return { x: 0, y: 0, width, height };
  }
};
Tag.prototype.className = "Tag";
_registerNode(Tag, true);
Factory.addGetterSetter(Tag, "pointerDirection", NONE2);
Factory.addGetterSetter(Tag, "pointerWidth", 0, getNumberValidator());
Factory.addGetterSetter(Tag, "pointerHeight", 0, getNumberValidator());
Factory.addGetterSetter(Tag, "cornerRadius", 0, getNumberOrArrayOfNumbersValidator(4));

// node_modules/konva/lib/shapes/Rect.js
var Rect = class extends Shape {
  _getStrokePadding() {
    return super._getStrokePadding(this.strokeScaleEnabled() ? 1 : void 0);
  }
  _sceneFunc(context) {
    const cornerRadius = this.cornerRadius(), width = this.width(), height = this.height();
    context.beginPath();
    if (!cornerRadius) {
      context.rect(0, 0, width, height);
    } else {
      Util.drawRoundedRectPath(context, width, height, cornerRadius);
    }
    context.closePath();
    context.fillStrokeShape(this);
  }
};
Rect.prototype.className = "Rect";
_registerNode(Rect, true);
Factory.addGetterSetter(Rect, "cornerRadius", 0, getNumberOrArrayOfNumbersValidator(4));

// node_modules/konva/lib/shapes/RegularPolygon.js
var RegularPolygon = class extends Shape {
  _sceneFunc(context) {
    const points = this._getPoints(), radius = this.radius(), sides = this.sides(), cornerRadius = this.cornerRadius();
    if (!points.length) {
      return;
    }
    context.beginPath();
    if (!cornerRadius) {
      context.moveTo(points[0].x, points[0].y);
      for (let n2 = 1; n2 < points.length; n2++) {
        context.lineTo(points[n2].x, points[n2].y);
      }
    } else {
      Util.drawRoundedPolygonPath(context, points, sides, radius, cornerRadius);
    }
    context.closePath();
    context.fillStrokeShape(this);
  }
  _getPoints() {
    const sides = this.attrs.sides;
    const radius = this.attrs.radius || 0;
    const points = [];
    for (let n2 = 0; n2 < sides; n2++) {
      points.push({
        x: radius * Math.sin(n2 * 2 * Math.PI / sides),
        y: -1 * radius * Math.cos(n2 * 2 * Math.PI / sides)
      });
    }
    return points;
  }
  getSelfRect() {
    const points = this._getPoints();
    if (!points.length) {
      return { x: 0, y: 0, width: 0, height: 0 };
    }
    let minX = points[0].x;
    let maxX = points[0].x;
    let minY = points[0].y;
    let maxY = points[0].y;
    points.forEach((point) => {
      minX = Math.min(minX, point.x);
      maxX = Math.max(maxX, point.x);
      minY = Math.min(minY, point.y);
      maxY = Math.max(maxY, point.y);
    });
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }
  getWidth() {
    return this.radius() * 2;
  }
  getHeight() {
    return this.radius() * 2;
  }
  setWidth(width) {
    this.radius(width / 2);
  }
  setHeight(height) {
    this.radius(height / 2);
  }
};
RegularPolygon.prototype.className = "RegularPolygon";
RegularPolygon.prototype._centroid = true;
RegularPolygon.prototype._attrsAffectingSize = ["radius", "sides"];
_registerNode(RegularPolygon, true);
Factory.addGetterSetter(RegularPolygon, "radius", 0, getNumberValidator());
Factory.addGetterSetter(RegularPolygon, "sides", 0, getNumberValidator());
Factory.addGetterSetter(RegularPolygon, "cornerRadius", 0, getNumberOrArrayOfNumbersValidator(4));

// node_modules/konva/lib/shapes/Ring.js
var PIx2 = Math.PI * 2;
var Ring = class extends Shape {
  _getStrokePadding() {
    return super._getStrokePadding(1);
  }
  _sceneFunc(context) {
    const innerRadius = Math.abs(this.innerRadius()), outerRadius = Math.abs(this.outerRadius());
    context.beginPath();
    context.arc(0, 0, innerRadius, 0, PIx2, false);
    context.moveTo(outerRadius, 0);
    context.arc(0, 0, outerRadius, PIx2, 0, true);
    context.closePath();
    context.fillStrokeShape(this);
  }
  getSelfRect() {
    const radius = Math.max(Math.abs(this.innerRadius()), Math.abs(this.outerRadius()));
    return { x: -radius, y: -radius, width: radius * 2, height: radius * 2 };
  }
  getWidth() {
    return Math.abs(this.outerRadius()) * 2;
  }
  getHeight() {
    return Math.abs(this.outerRadius()) * 2;
  }
  setWidth(width) {
    this.outerRadius(width / 2);
  }
  setHeight(height) {
    this.outerRadius(height / 2);
  }
};
Ring.prototype.className = "Ring";
Ring.prototype._centroid = true;
Ring.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"];
_registerNode(Ring, true);
Factory.addGetterSetter(Ring, "innerRadius", 0, getNumberValidator());
Factory.addGetterSetter(Ring, "outerRadius", 0, getNumberValidator());

// node_modules/konva/lib/shapes/Sprite.js
var Sprite = class extends Shape {
  constructor(config) {
    super(config);
    this._updated = true;
    this.anim = new Animation(() => {
      const updated = this._updated;
      this._updated = false;
      return updated;
    });
    this.on("animationChange.konva", function() {
      this.frameIndex(0);
    });
    this.on("frameIndexChange.konva", function() {
      this._updated = true;
    });
    this.on("frameRateChange.konva", function() {
      if (!this.anim.isRunning()) {
        return;
      }
      clearInterval(this.interval);
      this._setInterval();
    });
  }
  // the current frame: its box in the sprite sheet and where it is drawn,
  // or nothing when the animation key or the frame index does not exist
  // (then nothing is drawn, like an image without an image)
  _getFrame() {
    var _a2, _b;
    const anim = this.animation(), set = (_a2 = this.animations()) === null || _a2 === void 0 ? void 0 : _a2[anim], index = this.frameIndex(), ix4 = index * 4;
    if (!set || !Number.isInteger(index) || ix4 < 0 || ix4 + 4 > set.length) {
      return;
    }
    const offset = ((_b = this.frameOffsets()) === null || _b === void 0 ? void 0 : _b[anim]) || [];
    return {
      x: set[ix4],
      y: set[ix4 + 1],
      width: set[ix4 + 2],
      height: set[ix4 + 3],
      offsetX: offset[index * 2] || 0,
      offsetY: offset[index * 2 + 1] || 0
    };
  }
  _getStrokePadding() {
    return super._getStrokePadding(this.strokeScaleEnabled() ? 1 : void 0);
  }
  _sceneFunc(context) {
    const frame = this._getFrame();
    if (!frame) {
      return;
    }
    const { x: x2, y, width, height, offsetX, offsetY } = frame;
    const image2 = this.image();
    if (this.hasFill() || this.hasStroke()) {
      context.beginPath();
      context.rect(offsetX, offsetY, width, height);
      context.closePath();
      context.fillStrokeShape(this);
    }
    if (image2) {
      context.drawImage(image2, x2, y, width, height, offsetX, offsetY, width, height);
    }
  }
  _hitFunc(context) {
    const { x: x2, y, width, height } = this.getSelfRect();
    context.beginPath();
    context.rect(x2, y, width, height);
    context.closePath();
    context.fillShape(this);
  }
  getSelfRect() {
    const frame = this._getFrame();
    return frame ? {
      x: frame.offsetX,
      y: frame.offsetY,
      width: frame.width,
      height: frame.height
    } : { x: 0, y: 0, width: 0, height: 0 };
  }
  _useBufferCanvas(forceFill, opacity = this.getAbsoluteOpacity()) {
    return super._useBufferCanvas(true, opacity);
  }
  _setInterval() {
    const that = this;
    this.interval = setInterval(function() {
      that._updateIndex();
    }, 1e3 / this.frameRate());
  }
  /**
   * start sprite animation
   * @method
   * @name Konva.Sprite#start
   */
  start() {
    if (this.isRunning()) {
      return;
    }
    const layer = this.getLayer();
    this.anim.setLayers(layer);
    this._setInterval();
    this.anim.start();
  }
  /**
   * stop sprite animation
   * @method
   * @name Konva.Sprite#stop
   */
  stop() {
    this.anim.stop();
    clearInterval(this.interval);
  }
  destroy() {
    this.stop();
    return super.destroy();
  }
  /**
   * determine if animation of sprite is running or not.  returns true or false
   * @method
   * @name Konva.Sprite#isRunning
   * @returns {Boolean}
   */
  isRunning() {
    return this.anim.isRunning();
  }
  _updateIndex() {
    var _a2;
    const index = this.frameIndex(), set = (_a2 = this.animations()) === null || _a2 === void 0 ? void 0 : _a2[this.animation()], len = set ? set.length / 4 : 0;
    this.frameIndex(index < len - 1 ? index + 1 : 0);
  }
};
Sprite.prototype.className = "Sprite";
_registerNode(Sprite, true);
Factory.addGetterSetter(Sprite, "animation");
Factory.addGetterSetter(Sprite, "animations");
Factory.addGetterSetter(Sprite, "frameOffsets");
Factory.addGetterSetter(Sprite, "image");
Factory.addGetterSetter(Sprite, "frameIndex", 0, getNumberValidator());
Factory.addGetterSetter(Sprite, "frameRate", 17, getNumberValidator());
Factory.backCompat(Sprite, {
  index: "frameIndex",
  getIndex: "getFrameIndex",
  setIndex: "setFrameIndex"
});

// node_modules/konva/lib/shapes/Star.js
var Star = class extends Shape {
  _sceneFunc(context) {
    const innerRadius = this.innerRadius(), outerRadius = this.outerRadius(), numPoints = this.numPoints();
    context.beginPath();
    context.moveTo(0, 0 - outerRadius);
    for (let n2 = 1; n2 < numPoints * 2; n2++) {
      const radius = n2 % 2 === 0 ? outerRadius : innerRadius;
      const x2 = radius * Math.sin(n2 * Math.PI / numPoints);
      const y = -1 * radius * Math.cos(n2 * Math.PI / numPoints);
      context.lineTo(x2, y);
    }
    context.closePath();
    context.fillStrokeShape(this);
  }
  getSelfRect() {
    const radius = Math.max(Math.abs(this.innerRadius()), Math.abs(this.outerRadius()));
    return { x: -radius, y: -radius, width: radius * 2, height: radius * 2 };
  }
  getWidth() {
    return this.outerRadius() * 2;
  }
  getHeight() {
    return this.outerRadius() * 2;
  }
  setWidth(width) {
    this.outerRadius(width / 2);
  }
  setHeight(height) {
    this.outerRadius(height / 2);
  }
};
Star.prototype.className = "Star";
Star.prototype._centroid = true;
Star.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"];
_registerNode(Star, true);
Factory.addGetterSetter(Star, "numPoints", 5, getNumberValidator());
Factory.addGetterSetter(Star, "innerRadius", 0, getNumberValidator());
Factory.addGetterSetter(Star, "outerRadius", 0, getNumberValidator());

// node_modules/konva/lib/shapes/TextPath.js
var EMPTY_STRING2 = "";
var NORMAL2 = "normal";
function _fillFunc3(context) {
  context.fillText(this.partialText, 0, 0);
}
function _strokeFunc3(context) {
  context.strokeText(this.partialText, 0, 0);
}
var TextPath = class extends Shape {
  constructor(config) {
    super(config);
    this.dataArray = [];
    this._readDataAttribute();
    this._setTextData();
  }
  _getTextPathLength() {
    return Path.getPathLength(this.dataArray);
  }
  _getPointAtLength(length, cursor) {
    if (!this.attrs.data) {
      return null;
    }
    const totalLength = this.pathLength;
    if (length > totalLength) {
      return null;
    }
    return Path.getPointAtLengthOfDataArray(length, this.dataArray, cursor);
  }
  _readDataAttribute() {
    this.dataArray = Path.parsePathData(this.attrs.data);
    this.pathLength = this._getTextPathLength();
  }
  _sceneFunc(context) {
    context.setAttr("font", this._getContextFont());
    context.setAttr("textBaseline", this.textBaseline());
    context.setAttr("textAlign", "left");
    context.save();
    const textDecoration = this.textDecoration();
    const fill = this.fill();
    const fontSize = this.fontSize();
    const glyphInfo = this.glyphInfo;
    const hasUnderline = textDecoration.indexOf("underline") !== -1;
    const hasLineThrough = textDecoration.indexOf("line-through") !== -1;
    if (hasUnderline) {
      context.beginPath();
    }
    for (let i2 = 0; i2 < glyphInfo.length; i2++) {
      context.save();
      const p0 = glyphInfo[i2].p0;
      context.translate(p0.x, p0.y);
      context.rotate(glyphInfo[i2].rotation);
      this.partialText = glyphInfo[i2].text;
      context.fillStrokeShape(this);
      if (hasUnderline) {
        if (i2 === 0) {
          context.moveTo(0, fontSize / 2 + 1);
        }
        context.lineTo(glyphInfo[i2].width, fontSize / 2 + 1);
      }
      context.restore();
    }
    if (hasUnderline) {
      context.strokeStyle = fill;
      context.lineWidth = getDecorationLineWidth(fontSize);
      context.stroke();
    }
    if (hasLineThrough) {
      context.beginPath();
      for (let i2 = 0; i2 < glyphInfo.length; i2++) {
        context.save();
        const p0 = glyphInfo[i2].p0;
        context.translate(p0.x, p0.y);
        context.rotate(glyphInfo[i2].rotation);
        if (i2 === 0) {
          context.moveTo(0, 0);
        }
        context.lineTo(glyphInfo[i2].width, 0);
        context.restore();
      }
      context.strokeStyle = fill;
      context.lineWidth = getDecorationLineWidth(fontSize);
      context.stroke();
    }
    context.restore();
  }
  _hitFunc(context) {
    context.beginPath();
    const glyphInfo = this.glyphInfo;
    if (glyphInfo.length >= 1) {
      const p0 = glyphInfo[0].p0;
      context.moveTo(p0.x, p0.y);
    }
    for (let i2 = 0; i2 < glyphInfo.length; i2++) {
      const p1 = glyphInfo[i2].p1;
      context.lineTo(p1.x, p1.y);
    }
    context.setAttr("lineWidth", this.fontSize());
    context.setAttr("strokeStyle", this.colorKey);
    context.stroke();
  }
  /**
   * get text width in pixels
   * @method
   * @name Konva.TextPath#getTextWidth
   */
  getTextWidth() {
    return this.textWidth;
  }
  getTextHeight() {
    Util.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height.");
    return this.textHeight;
  }
  setText(text) {
    return Text.prototype.setText.call(this, text);
  }
  _getContextFont() {
    return Text.prototype._getContextFont.call(this);
  }
  _getTextSize(text) {
    const _context = getDummyContext2();
    _context.save();
    _context.font = this._getContextFont();
    _context.fontKerning = "auto";
    const metrics = _context.measureText(text);
    _context.restore();
    return {
      width: metrics.width,
      height: parseInt(`${this.fontSize()}`, 10)
    };
  }
  _setTextData() {
    const charArr = stringToArray(this.text());
    if (this.direction() === "rtl") {
      charArr.reverse();
    }
    const kerningFunc = this.kerningFunc();
    const chars = [];
    let width = 0;
    for (let i2 = 0; i2 < charArr.length; i2++) {
      let kern = 0;
      if (kerningFunc && i2 > 0) {
        try {
          kern = kerningFunc(charArr[i2 - 1], charArr[i2]) * this.fontSize();
        } catch (e2) {
        }
      }
      chars.push({
        char: charArr[i2],
        width: this._getTextSize(charArr[i2]).width,
        kern
      });
      width += chars[i2].width + kern;
    }
    const { width: fullTextWidth, height } = this._getTextSize(this.attrs.text);
    this.textWidth = width;
    this.textHeight = height;
    this.glyphInfo = [];
    if (!this.attrs.data) {
      return null;
    }
    const letterSpacing = this.letterSpacing();
    const align = this.align();
    const numberOfSpaces = align === "justify" ? this.text().split(" ").length - 1 : 0;
    const kerningAdjustment = Math.max(0, width - fullTextWidth);
    const textWidth = Math.max(this.textWidth + (charArr.length - 1) * letterSpacing, 0);
    let offset = 0;
    if (align === "center") {
      offset = Math.max(0, this.pathLength / 2 - textWidth / 2);
    }
    if (align === "right") {
      offset = Math.max(0, this.pathLength - textWidth);
    }
    let offsetToGlyph = offset;
    const cursor = this.dataArray.some((segment, index) => index > 0 && segment.command === "M") ? void 0 : { index: 0, offset: 0 };
    for (let i2 = 0; i2 < chars.length; i2++) {
      offsetToGlyph += chars[i2].kern;
      const charStartPoint = this._getPointAtLength(offsetToGlyph, cursor);
      if (!charStartPoint)
        return;
      const char = chars[i2].char;
      let glyphWidth = chars[i2].width + (i2 < chars.length - 1 ? letterSpacing : 0);
      if (char === " " && align === "justify") {
        glyphWidth += (this.pathLength - textWidth) / numberOfSpaces;
      }
      const charEndLength = offsetToGlyph + glyphWidth;
      const charEndPoint = this._getPointAtLength(charEndLength > this.pathLength && charEndLength - this.pathLength <= kerningAdjustment ? this.pathLength : charEndLength, cursor);
      if (!charEndPoint) {
        return;
      }
      const width2 = Path.getLineLength(charStartPoint.x, charStartPoint.y, charEndPoint.x, charEndPoint.y);
      const rotation = Math.atan2(charEndPoint.y - charStartPoint.y, charEndPoint.x - charStartPoint.x);
      this.glyphInfo.push({
        text: charArr[i2],
        rotation,
        p0: charStartPoint,
        p1: charEndPoint,
        width: width2
      });
      offsetToGlyph += glyphWidth;
    }
  }
  getSelfRect() {
    if (!this.glyphInfo.length) {
      return {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    }
    const points = [];
    this.glyphInfo.forEach(function(info) {
      points.push(info.p0.x);
      points.push(info.p0.y);
      points.push(info.p1.x);
      points.push(info.p1.y);
    });
    const rect = Util._getPointsRect(points);
    const fontSize = this.fontSize();
    return {
      x: rect.x - fontSize / 2,
      y: rect.y - fontSize / 2,
      width: rect.width + fontSize,
      height: rect.height + fontSize
    };
  }
  // Like Text: a glyph stroke is drawn with the text, so it always scales.
  getStrokeScaleEnabled() {
    return true;
  }
  _getSelfRectForDrawing() {
    const rect = this.getSelfRect(), pad = this.fontSize();
    return {
      x: rect.x - pad,
      y: rect.y - pad,
      width: rect.width + pad * 2,
      height: rect.height + pad * 2
    };
  }
};
TextPath.prototype._fillFunc = _fillFunc3;
TextPath.prototype._strokeFunc = _strokeFunc3;
TextPath.prototype._fillFuncHit = _fillFunc3;
TextPath.prototype._strokeFuncHit = _strokeFunc3;
TextPath.prototype.className = "TextPath";
TextPath.prototype._attrsAffectingSize = [
  "text",
  "fontSize",
  "data",
  "align",
  "letterSpacing",
  "kerningFunc",
  "fontFamily",
  "fontStyle",
  "fontVariant",
  "direction"
];
_registerNode(TextPath, true);
TextPath.prototype.on("dataChange.konva", function() {
  this._readDataAttribute();
  this._setTextData();
});
TextPath.prototype.on(TextPath.prototype._attrsAffectingSize.filter((attr) => attr !== "data").map((attr) => attr + "Change.konva").join(" "), function() {
  this._setTextData();
});
Factory.addGetterSetter(TextPath, "data");
Factory.addGetterSetter(TextPath, "fontFamily", "Arial");
Factory.addGetterSetter(TextPath, "fontSize", 12, getNumberValidator());
Factory.addGetterSetter(TextPath, "fontStyle", NORMAL2);
Factory.addGetterSetter(TextPath, "align", "left");
Factory.addGetterSetter(TextPath, "letterSpacing", 0, getNumberValidator());
Factory.addGetterSetter(TextPath, "textBaseline", "middle");
Factory.addGetterSetter(TextPath, "fontVariant", NORMAL2);
Factory.addGetterSetter(TextPath, "text", EMPTY_STRING2);
Factory.addGetterSetter(TextPath, "textDecoration", "");
Factory.addGetterSetter(TextPath, "kerningFunc", void 0);
Factory.addGetterSetter(TextPath, "direction", "inherit");

// node_modules/konva/lib/shapes/Transformer.js
var EVENTS_NAME = "tr-konva";
var ATTR_CHANGE_LIST3 = [
  "resizeEnabledChange",
  "rotateAnchorOffsetChange",
  "rotateAnchorAngleChange",
  "rotateEnabledChange",
  "enabledAnchorsChange",
  "anchorSizeChange",
  "borderEnabledChange",
  "shouldOverdrawWholeAreaChange",
  "borderStrokeChange",
  "borderStrokeWidthChange",
  "borderDashChange",
  "anchorStrokeChange",
  "anchorStrokeWidthChange",
  "anchorFillChange",
  "anchorCornerRadiusChange",
  "ignoreStrokeChange",
  "anchorStyleFuncChange",
  "paddingChange"
].map((e2) => e2 + `.${EVENTS_NAME}`).join(" ");
var NODES_RECT = "nodesRect";
var TRANSFORM_CHANGE_STR2 = [
  "widthChange",
  "heightChange",
  "scaleXChange",
  "scaleYChange",
  "skewXChange",
  "skewYChange",
  "rotationChange",
  "offsetXChange",
  "offsetYChange",
  "transformsEnabledChange",
  "strokeWidthChange",
  "strokeChange",
  "selfRectFuncChange",
  "strokeLinearGradientColorStopsChange",
  "strokeScaleEnabledChange",
  "strokeEnabledChange",
  "draggableChange"
];
var ANGLES = {
  "top-left": -45,
  "top-center": 0,
  "top-right": 45,
  "middle-right": -90,
  "middle-left": 90,
  "bottom-left": -135,
  "bottom-center": 180,
  "bottom-right": 135
};
var TOUCH_DEVICE = "ontouchstart" in Konva._global;
function getCursor(anchorName, rad, rotateCursor) {
  if (anchorName === "rotater") {
    return rotateCursor;
  }
  rad += Util.degToRad(ANGLES[anchorName] || 0);
  const angle = (Util.radToDeg(rad) % 360 + 360) % 360;
  if (Util._inRange(angle, 315 + 22.5, 360) || Util._inRange(angle, 0, 22.5)) {
    return "ns-resize";
  } else if (Util._inRange(angle, 45 - 22.5, 45 + 22.5)) {
    return "nesw-resize";
  } else if (Util._inRange(angle, 90 - 22.5, 90 + 22.5)) {
    return "ew-resize";
  } else if (Util._inRange(angle, 135 - 22.5, 135 + 22.5)) {
    return "nwse-resize";
  } else if (Util._inRange(angle, 180 - 22.5, 180 + 22.5)) {
    return "ns-resize";
  } else if (Util._inRange(angle, 225 - 22.5, 225 + 22.5)) {
    return "nesw-resize";
  } else if (Util._inRange(angle, 270 - 22.5, 270 + 22.5)) {
    return "ew-resize";
  } else if (Util._inRange(angle, 315 - 22.5, 315 + 22.5)) {
    return "nwse-resize";
  } else {
    Util.error("Transformer has unknown angle for cursor detection: " + angle);
    return "pointer";
  }
}
var ANCHORS_NAMES = [
  "top-left",
  "top-center",
  "top-right",
  "middle-right",
  "middle-left",
  "bottom-left",
  "bottom-center",
  "bottom-right"
];
var MAX_SAFE_INTEGER = 1e8;
function getCenter(shape) {
  return {
    x: shape.x + shape.width / 2 * Math.cos(shape.rotation) + shape.height / 2 * Math.sin(-shape.rotation),
    y: shape.y + shape.height / 2 * Math.cos(shape.rotation) + shape.width / 2 * Math.sin(shape.rotation)
  };
}
function rotateAroundPoint(shape, angleRad, point) {
  const x2 = point.x + (shape.x - point.x) * Math.cos(angleRad) - (shape.y - point.y) * Math.sin(angleRad);
  const y = point.y + (shape.x - point.x) * Math.sin(angleRad) + (shape.y - point.y) * Math.cos(angleRad);
  return {
    ...shape,
    rotation: shape.rotation + angleRad,
    x: x2,
    y
  };
}
function rotateAroundCenter(shape, deltaRad) {
  const center = getCenter(shape);
  return rotateAroundPoint(shape, deltaRad, center);
}
function getSnap(snaps, newRotationRad, tol) {
  let snapped = newRotationRad;
  let nearest = tol;
  for (let i2 = 0; i2 < snaps.length; i2++) {
    const angle = Konva.getAngle(snaps[i2]);
    const absDiff = Math.abs(angle - newRotationRad) % (Math.PI * 2);
    const dif = Math.min(absDiff, Math.PI * 2 - absDiff);
    if (dif < nearest) {
      nearest = dif;
      snapped = angle;
    }
  }
  return snapped;
}
function getRotaterLine(tr, width, height) {
  const rad = Util.degToRad(tr.rotateAnchorAngle());
  const dirX = Math.sin(rad);
  const dirY = -Math.cos(rad);
  const cx = width / 2;
  const cy = height / 2;
  let t2 = Infinity;
  if (dirY < 0) {
    t2 = Math.min(t2, -cy / dirY);
  } else if (dirY > 0) {
    t2 = Math.min(t2, (height - cy) / dirY);
  }
  if (dirX < 0) {
    t2 = Math.min(t2, -cx / dirX);
  } else if (dirX > 0) {
    t2 = Math.min(t2, (width - cx) / dirX);
  }
  const edgeX = cx + dirX * t2;
  const edgeY = cy + dirY * t2;
  const offset = tr.rotateAnchorOffset() + tr.padding();
  return {
    edgeX,
    edgeY,
    endX: edgeX + dirX * offset,
    endY: edgeY + dirY * offset
  };
}
var activeTransformers = /* @__PURE__ */ new Set();
var Transformer = class extends Group {
  // the hit graph of a layer is not drawn while a transformer on it, or of
  // a node on it, is transforming (see Layer.shouldDrawHit)
  static _isLayerTransforming(layer) {
    for (const tr of activeTransformers) {
      if (tr.getLayer() === layer || tr._nodes.some((node) => node.getLayer() === layer)) {
        return true;
      }
    }
    return false;
  }
  constructor(config) {
    super(config);
    this._movingAnchorName = null;
    this._anchors = {};
    this._transforming = false;
    this._fitting = false;
    this._transformWindow = null;
    this._elementsCreated = false;
    this._updateScheduled = false;
    this._subtreeChanged = false;
    this._createElements();
    this._handleMouseMove = this._handleMouseMove.bind(this);
    this._handleMouseUp = this._handleMouseUp.bind(this);
    this.update = this.update.bind(this);
    this.on(ATTR_CHANGE_LIST3, (event) => {
      if (event.type === "ignoreStrokeChange")
        this._resetTransformCache();
      this.update();
    });
    this.on(`rotationChange.${EVENTS_NAME}`, () => this._clearCache(NODES_RECT));
    if (this.getNode()) {
      this.update();
    }
  }
  /**
   * alias to `tr.nodes([shape])`/ This method is deprecated and will be removed soon.
   * @method
   * @name Konva.Transformer#attachTo
   * @returns {Konva.Transformer}
   * @example
   * transformer.attachTo(shape);
   */
  attachTo(node) {
    this.setNode(node);
    return this;
  }
  setNode(node) {
    Util.warn("tr.setNode(shape), tr.node(shape) and tr.attachTo(shape) methods are deprecated. Please use tr.nodes(nodesArray) instead.");
    return this.setNodes([node]);
  }
  getNode() {
    return this._nodes && this._nodes[0];
  }
  _getEventNamespace() {
    return EVENTS_NAME + this._id;
  }
  setNodes(nodes = []) {
    if (this._nodes && this._nodes.length) {
      this.detach();
    }
    const selected = new Set(nodes);
    for (const node of selected) {
      if (node.isAncestorOf(this)) {
        Util.error("Konva.Transformer cannot be an a child of the node you are trying to attach");
        selected.delete(node);
      }
    }
    const filteredNodes = Array.from(selected).filter((node) => {
      for (let parent = node.getParent(); parent; parent = parent.getParent()) {
        if (selected.has(parent))
          return false;
      }
      return true;
    });
    this._nodes = nodes = filteredNodes;
    if (nodes.length === 1 && this.useSingleNodeRotation()) {
      this.rotation(nodes[0].getAbsoluteRotation());
    } else {
      this.rotation(0);
    }
    this._nodes.forEach((node) => {
      const onChange = () => {
        var _a2;
        if (this._fitting) {
          (_a2 = this._nodeRectCache) === null || _a2 === void 0 ? void 0 : _a2.delete(node);
          return;
        }
        if (this.nodes().length === 1 && this.useSingleNodeRotation()) {
          this.rotation(this.nodes()[0].getAbsoluteRotation());
        }
        this._resetTransformCache(node);
        if (!this.isDragging()) {
          this._scheduleUpdate();
        }
      };
      if (node._attrsAffectingSize.length) {
        const additionalEvents = node._attrsAffectingSize.map((prop) => prop + "Change." + this._getEventNamespace()).join(" ");
        node.on(additionalEvents, onChange);
      }
      node.on(TRANSFORM_CHANGE_STR2.map((e2) => e2 + `.${this._getEventNamespace()}`).join(" "), onChange);
      node.on(`absoluteTransformChange.${this._getEventNamespace()}`, onChange);
      if (node instanceof Container)
        node._addSubtreeObserver(this);
      node.on(`destroy.${this._getEventNamespace()}`, () => {
        this.setNodes(this._nodes.filter((n2) => n2 !== node));
      });
      this._proxyDrag(node);
    });
    this._resetTransformCache();
    if (this._elementsCreated) {
      this.update();
    }
    return this;
  }
  _proxyDrag(node) {
    let lastPos;
    node.on(`dragstart.${this._getEventNamespace()}`, (e2) => {
      lastPos = node.getAbsolutePosition();
      if (!this.isDragging() && node !== this._back) {
        this.startDrag(e2, false);
      }
    });
    node.on(`dragmove.${this._getEventNamespace()}`, (e2) => {
      if (!lastPos) {
        return;
      }
      const abs = node.getAbsolutePosition();
      const dx = abs.x - lastPos.x;
      const dy = abs.y - lastPos.y;
      this.nodes().forEach((otherNode) => {
        if (otherNode === node) {
          return;
        }
        if (otherNode.isDragging()) {
          return;
        }
        const otherAbs = otherNode.getAbsolutePosition();
        otherNode.setAbsolutePosition({
          x: otherAbs.x + dx,
          y: otherAbs.y + dy
        });
        otherNode.startDrag(e2);
      });
      lastPos = null;
    });
  }
  getNodes() {
    return this._nodes || [];
  }
  /**
   * return the name of current active anchor
   * @method
   * @name Konva.Transformer#getActiveAnchor
   * @returns {String | Null}
   * @example
   * transformer.getActiveAnchor();
   */
  getActiveAnchor() {
    return this._movingAnchorName;
  }
  /**
   * detach transformer from an attached node
   * @method
   * @name Konva.Transformer#detach
   * @returns {Konva.Transformer}
   * @example
   * transformer.detach();
   */
  detach() {
    var _a2;
    if (this._nodes) {
      this._nodes.forEach((node) => {
        node.off("." + this._getEventNamespace());
        node._removeSubtreeObserver(this);
      });
    }
    this._nodes = [];
    this._resetTransformCache();
    (_a2 = this.getLayer()) === null || _a2 === void 0 ? void 0 : _a2.batchDraw();
  }
  /**
   * bind events to the Transformer. You can use events: `transform`, `transformstart`, `transformend`, `dragstart`, `dragmove`, `dragend`
   * @method
   * @name Konva.Transformer#on
   * @param {String} evtStr e.g. 'transform'
   * @param {Function} handler The handler function. The first argument of that function is event object. Event object has `target` as main target of the event, `currentTarget` as current node listener and `evt` as native browser event.
   * @returns {Konva.Transformer}
   * @example
   * // add click listener
   * tr.on('transformstart', function() {
   *   console.log('transform started');
   * });
   */
  _resetTransformCache(changedNode) {
    var _a2, _b;
    if (changedNode)
      (_a2 = this._nodeRectCache) === null || _a2 === void 0 ? void 0 : _a2.delete(changedNode);
    else
      (_b = this._nodeRectCache) === null || _b === void 0 ? void 0 : _b.clear();
    this._clearCache(NODES_RECT);
    this._clearCache("transform");
    this._clearSelfAndDescendantCache("absoluteTransform");
  }
  // Called for every change below an attached container. A burst of child
  // changes only drops cached values here. The new bounds are measured once,
  // before the next frame, or earlier if a draw or transform step comes first
  // (_syncSubtreeChange).
  _onSubtreeChange(node) {
    var _a2, _b;
    if (this._fitting)
      return;
    if (this._subtreeChanged && !this._cache[NODES_RECT])
      return;
    this._resetTransformCache(node);
    if (!this._subtreeChanged) {
      this._subtreeChanged = true;
      Util.requestAnimFrame(() => this._syncSubtreeChange(), (_a2 = this.getStage()) === null || _a2 === void 0 ? void 0 : _a2._getOwnerWindow());
      (_b = this.getLayer()) === null || _b === void 0 ? void 0 : _b.batchDraw();
    }
  }
  _syncSubtreeChange() {
    var _a2;
    if (this._subtreeChanged && ((_a2 = this._nodes) === null || _a2 === void 0 ? void 0 : _a2.length) && !this.isDragging()) {
      this._update();
    }
  }
  drawScene(can, top) {
    this._syncSubtreeChange();
    return super.drawScene(can, top);
  }
  drawHit(can, top) {
    this._syncSubtreeChange();
    return super.drawHit(can, top);
  }
  _getNodeRect() {
    return this._getCache(NODES_RECT, this.__getNodeRect);
  }
  __getNodeRect() {
    var _a2;
    const node = this.getNode();
    if (!node) {
      return {
        x: -MAX_SAFE_INTEGER,
        y: -MAX_SAFE_INTEGER,
        width: 0,
        height: 0,
        rotation: 0
      };
    }
    const rotation = Konva.getAngle(this.rotation());
    const ignoreStroke = this.ignoreStroke();
    const tr = new Transform();
    tr.rotate(-rotation);
    const cache2 = this._nodeRectCache || (this._nodeRectCache = /* @__PURE__ */ new Map());
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const node2 of this.nodes()) {
      const cacheable = node2 instanceof Shape && node2.getSelfRect === Shape.prototype.getSelfRect && !node2.attrs.selfRectFunc && !node2._hasCachedAncestor();
      const width = cacheable ? node2.width() : 0;
      const height = cacheable ? node2.height() : 0;
      if (cacheable)
        (_a2 = node2._attrsVersion) !== null && _a2 !== void 0 ? _a2 : node2._attrsVersion = 0;
      let bounds = cacheable ? cache2.get(node2) : void 0;
      if (!bounds || bounds.rotation !== rotation || bounds.ignoreStroke !== ignoreStroke || bounds.version !== node2._attrsVersion || bounds.width !== width || bounds.height !== height) {
        let trans = node2.getAbsoluteTransform();
        const [a3, b2, c2, d2] = trans.getMatrix();
        const collapsed = a3 * d2 - b2 * c2 === 0;
        const box = node2.getClientRect({
          skipTransform: !collapsed,
          skipShadow: true,
          skipStroke: ignoreStroke
        });
        const points = [
          { x: box.x, y: box.y },
          { x: box.x + box.width, y: box.y },
          { x: box.x + box.width, y: box.y + box.height },
          { x: box.x, y: box.y + box.height }
        ];
        if (collapsed)
          trans = new Transform();
        bounds = {
          rotation,
          ignoreStroke,
          width,
          height,
          version: node2._attrsVersion || 0,
          minX: Infinity,
          minY: Infinity,
          maxX: -Infinity,
          maxY: -Infinity
        };
        for (const point of points) {
          const projected = tr.point(trans.point(point));
          bounds.minX = Math.min(bounds.minX, projected.x);
          bounds.minY = Math.min(bounds.minY, projected.y);
          bounds.maxX = Math.max(bounds.maxX, projected.x);
          bounds.maxY = Math.max(bounds.maxY, projected.y);
        }
        if (cacheable)
          cache2.set(node2, bounds);
      }
      minX = Math.min(minX, bounds.minX);
      minY = Math.min(minY, bounds.minY);
      maxX = Math.max(maxX, bounds.maxX);
      maxY = Math.max(maxY, bounds.maxY);
    }
    tr.invert();
    const p2 = tr.point({ x: minX, y: minY });
    return {
      x: p2.x,
      y: p2.y,
      width: maxX - minX,
      height: maxY - minY,
      rotation: Konva.getAngle(this.rotation())
    };
  }
  getX() {
    return this._getNodeRect().x;
  }
  getY() {
    return this._getNodeRect().y;
  }
  getWidth() {
    return this._getNodeRect().width;
  }
  getHeight() {
    return this._getNodeRect().height;
  }
  _createElements() {
    this._createBack();
    ANCHORS_NAMES.forEach((name) => {
      this._createAnchor(name);
    });
    this._createAnchor("rotater");
    this._elementsCreated = true;
  }
  _createAnchor(name) {
    const anchor = new Rect({
      stroke: "rgb(0, 161, 255)",
      fill: "white",
      strokeWidth: 1,
      name: name + " _anchor",
      dragDistance: 0,
      // make it draggable,
      // so activating the anchor will not start drag&drop of any parent
      draggable: true,
      hitStrokeWidth: TOUCH_DEVICE ? 10 : "auto"
    });
    this._anchors[name] = anchor;
    const self2 = this;
    anchor.on("mousedown touchstart", function(e2) {
      self2._handleMouseDown(e2);
    });
    anchor.on("dragstart", (e2) => {
      anchor.stopDrag();
      e2.cancelBubble = true;
    });
    anchor.on("dragend", (e2) => {
      e2.cancelBubble = true;
    });
    anchor.on("mouseenter", () => {
      if (this.isTransforming())
        return;
      const rad = Konva.getAngle(this.rotation());
      const rotateCursor = this.rotateAnchorCursor();
      const cursor = getCursor(name, rad, rotateCursor);
      anchor.getStage().content && (anchor.getStage().content.style.cursor = cursor);
      this._cursorChange = true;
    });
    anchor.on("mouseout", () => {
      this._cursorChange = false;
      if (this.isTransforming())
        return;
      anchor.getStage().content && (anchor.getStage().content.style.cursor = "");
    });
    this.add(anchor);
  }
  _createBack() {
    const back = new Shape({
      name: "back",
      width: 0,
      height: 0,
      sceneFunc(ctx, shape) {
        const tr = shape.getParent();
        if (!tr.borderEnabled())
          return;
        const padding = tr.padding();
        const width = shape.width();
        const height = shape.height();
        ctx.beginPath();
        ctx.rect(-padding, -padding, width + padding * 2, height + padding * 2);
        if (tr.rotateEnabled() && tr.rotateLineVisible()) {
          const line = getRotaterLine(tr, width, height);
          ctx.moveTo(line.edgeX, line.edgeY);
          ctx.lineTo(line.endX, line.endY);
        }
        ctx.fillStrokeShape(shape);
      },
      hitFunc: (ctx, shape) => {
        if (!this.shouldOverdrawWholeArea()) {
          return;
        }
        const padding = this.padding();
        ctx.beginPath();
        ctx.rect(-padding, -padding, shape.width() + padding * 2, shape.height() + padding * 2);
        ctx.fillStrokeShape(shape);
      }
    });
    this._back = back;
    this.add(back);
    this._proxyDrag(back);
    back.on("dragstart", (e2) => {
      e2.cancelBubble = true;
    });
    back.on("dragmove", (e2) => {
      e2.cancelBubble = true;
    });
    back.on("dragend", (e2) => {
      e2.cancelBubble = true;
    });
    this.on("dragmove", (e2) => {
      this.update();
    });
  }
  _handleMouseDown(e2) {
    var _a2, _b;
    if (e2.evt.button !== void 0 && !Konva.dragButtons.includes(e2.evt.button))
      return;
    if (this._transforming) {
      return;
    }
    this._movingAnchorName = e2.target.name().split(" ")[0];
    const attrs = this._getNodeRect();
    const width = attrs.width;
    const height = attrs.height;
    const hypotenuse = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    this.sin = Math.abs(height / hypotenuse);
    this.cos = Math.abs(width / hypotenuse);
    const win = (_a2 = this.getStage()) === null || _a2 === void 0 ? void 0 : _a2._getOwnerWindow();
    this._transformWindow = win || null;
    if (win) {
      win.addEventListener("mousemove", this._handleMouseMove);
      win.addEventListener("touchmove", this._handleMouseMove);
      win.addEventListener("mouseup", this._handleMouseUp, true);
      win.addEventListener("touchend", this._handleMouseUp, true);
      win.addEventListener("touchcancel", this._handleMouseUp, true);
    }
    this._transforming = true;
    this._pointerId = (_b = e2.pointerId) !== null && _b !== void 0 ? _b : Util._getFirstPointerId(e2.evt);
    const ap = e2.target.getAbsolutePosition();
    const pos = e2.target.getStage()._getPointerById(this._pointerId);
    this._anchorDragOffset = {
      x: pos.x - ap.x,
      y: pos.y - ap.y
    };
    activeTransformers.add(this);
    this._fire("transformstart", { evt: e2.evt, target: this.getNode() });
    this._nodes.forEach((target) => {
      target._fire("transformstart", { evt: e2.evt, target });
    });
  }
  _handleMouseMove(e2) {
    var _a2;
    (_a2 = this.getStage()) === null || _a2 === void 0 ? void 0 : _a2._batchEvents(() => this._moveTransform(e2));
  }
  _moveTransform(e2) {
    this._syncSubtreeChange();
    let x2, y, newHypotenuse;
    const anchorNode = this._anchors[this._movingAnchorName];
    const stage = anchorNode.getStage();
    stage.setPointersPositions(e2);
    const pp = stage._getPointerById(this._pointerId);
    if (!pp) {
      return;
    }
    let newNodePos = {
      x: pp.x - this._anchorDragOffset.x,
      y: pp.y - this._anchorDragOffset.y
    };
    const oldAbs = anchorNode.getAbsolutePosition();
    if (this.anchorDragBoundFunc()) {
      newNodePos = this.anchorDragBoundFunc()(oldAbs, newNodePos, e2);
    }
    anchorNode.setAbsolutePosition(newNodePos);
    const newAbs = anchorNode.getAbsolutePosition();
    if (oldAbs.x === newAbs.x && oldAbs.y === newAbs.y) {
      return;
    }
    if (this._movingAnchorName === "rotater") {
      const attrs = this._getNodeRect();
      x2 = anchorNode.x() - attrs.width / 2;
      y = -anchorNode.y() + attrs.height / 2;
      const rotateAnchorAngleRad = Util.degToRad(this.rotateAnchorAngle());
      let delta = Math.atan2(-y, x2) + Math.PI / 2 - rotateAnchorAngleRad;
      const oldRotation = Konva.getAngle(this.rotation());
      const newRotation = oldRotation + delta;
      const tol = Konva.getAngle(this.rotationSnapTolerance());
      const snappedRot = getSnap(this.rotationSnaps(), newRotation, tol);
      const diff = snappedRot - attrs.rotation;
      const shape = rotateAroundCenter(attrs, diff);
      this._fitNodesInto(shape, e2);
      return;
    }
    const shiftBehavior = this.shiftBehavior();
    let keepProportion;
    if (shiftBehavior === "inverted") {
      keepProportion = this.keepRatio() && !e2.shiftKey;
    } else if (shiftBehavior === "none") {
      keepProportion = this.keepRatio();
    } else {
      keepProportion = this.keepRatio() || e2.shiftKey;
    }
    let centeredScaling = this.centeredScaling() || e2.altKey;
    let anchorProjected = false;
    if (this._movingAnchorName === "top-left") {
      if (keepProportion) {
        anchorProjected = true;
        const comparePoint = centeredScaling ? {
          x: this.width() / 2,
          y: this.height() / 2
        } : {
          x: this._anchors["bottom-right"].x(),
          y: this._anchors["bottom-right"].y()
        };
        newHypotenuse = Math.sqrt(Math.pow(comparePoint.x - anchorNode.x(), 2) + Math.pow(comparePoint.y - anchorNode.y(), 2));
        const reverseX = this._anchors["top-left"].x() > comparePoint.x ? -1 : 1;
        const reverseY = this._anchors["top-left"].y() > comparePoint.y ? -1 : 1;
        x2 = newHypotenuse * this.cos * reverseX;
        y = newHypotenuse * this.sin * reverseY;
        this._anchors["top-left"].x(comparePoint.x - x2);
        this._anchors["top-left"].y(comparePoint.y - y);
      }
    } else if (this._movingAnchorName === "top-center") {
      this._anchors["top-left"].y(anchorNode.y());
    } else if (this._movingAnchorName === "top-right") {
      if (keepProportion) {
        anchorProjected = true;
        const comparePoint = centeredScaling ? {
          x: this.width() / 2,
          y: this.height() / 2
        } : {
          x: this._anchors["bottom-left"].x(),
          y: this._anchors["bottom-left"].y()
        };
        newHypotenuse = Math.sqrt(Math.pow(anchorNode.x() - comparePoint.x, 2) + Math.pow(comparePoint.y - anchorNode.y(), 2));
        const reverseX = this._anchors["top-right"].x() < comparePoint.x ? -1 : 1;
        const reverseY = this._anchors["top-right"].y() > comparePoint.y ? -1 : 1;
        x2 = newHypotenuse * this.cos * reverseX;
        y = newHypotenuse * this.sin * reverseY;
        this._anchors["top-right"].x(comparePoint.x + x2);
        this._anchors["top-right"].y(comparePoint.y - y);
      }
      var pos = anchorNode.position();
      this._anchors["top-left"].y(pos.y);
      this._anchors["bottom-right"].x(pos.x);
    } else if (this._movingAnchorName === "middle-left") {
      this._anchors["top-left"].x(anchorNode.x());
    } else if (this._movingAnchorName === "middle-right") {
      this._anchors["bottom-right"].x(anchorNode.x());
    } else if (this._movingAnchorName === "bottom-left") {
      if (keepProportion) {
        anchorProjected = true;
        const comparePoint = centeredScaling ? {
          x: this.width() / 2,
          y: this.height() / 2
        } : {
          x: this._anchors["top-right"].x(),
          y: this._anchors["top-right"].y()
        };
        newHypotenuse = Math.sqrt(Math.pow(comparePoint.x - anchorNode.x(), 2) + Math.pow(anchorNode.y() - comparePoint.y, 2));
        const reverseX = comparePoint.x < anchorNode.x() ? -1 : 1;
        const reverseY = anchorNode.y() < comparePoint.y ? -1 : 1;
        x2 = newHypotenuse * this.cos * reverseX;
        y = newHypotenuse * this.sin * reverseY;
        anchorNode.x(comparePoint.x - x2);
        anchorNode.y(comparePoint.y + y);
      }
      pos = anchorNode.position();
      this._anchors["top-left"].x(pos.x);
      this._anchors["bottom-right"].y(pos.y);
    } else if (this._movingAnchorName === "bottom-center") {
      this._anchors["bottom-right"].y(anchorNode.y());
    } else if (this._movingAnchorName === "bottom-right") {
      if (keepProportion) {
        anchorProjected = true;
        const comparePoint = centeredScaling ? {
          x: this.width() / 2,
          y: this.height() / 2
        } : {
          x: this._anchors["top-left"].x(),
          y: this._anchors["top-left"].y()
        };
        newHypotenuse = Math.sqrt(Math.pow(anchorNode.x() - comparePoint.x, 2) + Math.pow(anchorNode.y() - comparePoint.y, 2));
        const reverseX = this._anchors["bottom-right"].x() < comparePoint.x ? -1 : 1;
        const reverseY = this._anchors["bottom-right"].y() < comparePoint.y ? -1 : 1;
        x2 = newHypotenuse * this.cos * reverseX;
        y = newHypotenuse * this.sin * reverseY;
        this._anchors["bottom-right"].x(comparePoint.x + x2);
        this._anchors["bottom-right"].y(comparePoint.y + y);
      }
    } else {
      console.error(new Error("Wrong position argument of selection resizer: " + this._movingAnchorName));
    }
    centeredScaling = this.centeredScaling() || e2.altKey;
    if (centeredScaling) {
      const topLeft = this._anchors["top-left"];
      const bottomRight = this._anchors["bottom-right"];
      const topOffsetX = topLeft.x();
      const topOffsetY = topLeft.y();
      const bottomOffsetX = this.getWidth() - bottomRight.x();
      const bottomOffsetY = this.getHeight() - bottomRight.y();
      bottomRight.move({
        x: -topOffsetX,
        y: -topOffsetY
      });
      topLeft.move({
        x: bottomOffsetX,
        y: bottomOffsetY
      });
    }
    const absPos = this._anchors["top-left"].getAbsolutePosition();
    x2 = absPos.x;
    y = absPos.y;
    const width = this._anchors["bottom-right"].x() - this._anchors["top-left"].x();
    const height = this._anchors["bottom-right"].y() - this._anchors["top-left"].y();
    this._fitNodesInto({
      x: x2,
      y,
      width,
      height,
      rotation: Konva.getAngle(this.rotation())
    }, e2, anchorProjected);
  }
  _handleMouseUp(e2) {
    const stage = this.getStage();
    if (stage) {
      stage.setPointersPositions(e2);
      if (!stage._changedPointerPositions.some((p2) => p2.id === this._pointerId)) {
        return;
      }
    }
    if (stage)
      stage._batchEvents(() => this._removeEvents(e2));
    else
      this._removeEvents(e2);
  }
  // the transformer positions itself in absolute coordinates (see
  // _getNodeRect), whatever the transforms of its ancestors are
  getAbsoluteTransform(top) {
    const at = this.getTransform();
    return top ? top.getAbsoluteTransform().copy().invert().multiply(at) : at;
  }
  _removeEvents(e2) {
    var _a2, _b;
    if (this._transforming) {
      this._transforming = false;
      const content = (_a2 = this.getStage()) === null || _a2 === void 0 ? void 0 : _a2.content;
      if (content && !this._cursorChange)
        content.style.cursor = "";
      const win = this._transformWindow;
      this._transformWindow = null;
      if (win) {
        win.removeEventListener("mousemove", this._handleMouseMove);
        win.removeEventListener("touchmove", this._handleMouseMove);
        win.removeEventListener("mouseup", this._handleMouseUp, true);
        win.removeEventListener("touchend", this._handleMouseUp, true);
        win.removeEventListener("touchcancel", this._handleMouseUp, true);
      }
      const node = this.getNode();
      activeTransformers.delete(this);
      this._fire("transformend", { evt: e2, target: node });
      (_b = this.getLayer()) === null || _b === void 0 ? void 0 : _b.batchDraw();
      if (node) {
        this._nodes.forEach((target) => {
          var _a3;
          target._fire("transformend", { evt: e2, target });
          (_a3 = target.getLayer()) === null || _a3 === void 0 ? void 0 : _a3.batchDraw();
        });
      }
      this._movingAnchorName = null;
    }
  }
  _fitNodesInto(newAttrs, evt, anchorProjected = false) {
    this._fitting = true;
    try {
      return this._doFitNodesInto(newAttrs, evt, anchorProjected);
    } finally {
      this._fitting = false;
    }
  }
  _doFitNodesInto(newAttrs, evt, anchorProjected = false) {
    const oldAttrs = this._getNodeRect();
    const minSize = 1;
    if (!oldAttrs.width || !oldAttrs.height || Util._inRange(newAttrs.width, -this.padding() * 2 - minSize, minSize) || Util._inRange(newAttrs.height, -this.padding() * 2 - minSize, minSize)) {
      this.update();
      return;
    }
    const t2 = new Transform();
    t2.rotate(Konva.getAngle(this.rotation()));
    const flipPadding = anchorProjected ? 0 : this.padding() * 2;
    let widthFlip = null;
    let heightFlip = null;
    if (this._movingAnchorName && newAttrs.width < 0 && this._movingAnchorName.indexOf("left") >= 0) {
      const offset = t2.point({
        x: -flipPadding,
        y: 0
      });
      newAttrs.x += offset.x;
      newAttrs.y += offset.y;
      newAttrs.width += flipPadding;
      widthFlip = { axis: "width", from: "left", to: "right", offset };
    } else if (this._movingAnchorName && newAttrs.width < 0 && this._movingAnchorName.indexOf("right") >= 0) {
      const offset = t2.point({
        x: flipPadding,
        y: 0
      });
      newAttrs.width += flipPadding;
      widthFlip = { axis: "width", from: "right", to: "left", offset };
    }
    if (this._movingAnchorName && newAttrs.height < 0 && this._movingAnchorName.indexOf("top") >= 0) {
      const offset = t2.point({
        x: 0,
        y: -flipPadding
      });
      newAttrs.x += offset.x;
      newAttrs.y += offset.y;
      newAttrs.height += flipPadding;
      heightFlip = { axis: "height", from: "top", to: "bottom", offset };
    } else if (this._movingAnchorName && newAttrs.height < 0 && this._movingAnchorName.indexOf("bottom") >= 0) {
      const offset = t2.point({
        x: 0,
        y: flipPadding
      });
      newAttrs.height += flipPadding;
      heightFlip = { axis: "height", from: "bottom", to: "top", offset };
    }
    if (this.boundBoxFunc()) {
      const bounded = this.boundBoxFunc()(oldAttrs, newAttrs);
      if (bounded) {
        newAttrs = bounded;
      } else {
        Util.warn("boundBoxFunc returned falsy. You should return new bound rect from it!");
      }
    }
    for (const flip of [widthFlip, heightFlip]) {
      if (flip && newAttrs[flip.axis] < 0 && this._movingAnchorName) {
        this._movingAnchorName = this._movingAnchorName.replace(flip.from, flip.to);
        this._anchorDragOffset.x -= flip.offset.x;
        this._anchorDragOffset.y -= flip.offset.y;
      }
    }
    const baseSize = 1e7;
    const oldTr = new Transform();
    oldTr.translate(oldAttrs.x, oldAttrs.y);
    oldTr.rotate(oldAttrs.rotation);
    oldTr.scale(oldAttrs.width / baseSize, oldAttrs.height / baseSize);
    const newTr = new Transform();
    const newScaleX = newAttrs.width / baseSize;
    const newScaleY = newAttrs.height / baseSize;
    if (this.flipEnabled() === false) {
      newTr.translate(newAttrs.x, newAttrs.y);
      newTr.rotate(newAttrs.rotation);
      newTr.translate(newAttrs.width < 0 ? newAttrs.width : 0, newAttrs.height < 0 ? newAttrs.height : 0);
      newTr.scale(Math.abs(newScaleX), Math.abs(newScaleY));
    } else {
      newTr.translate(newAttrs.x, newAttrs.y);
      newTr.rotate(newAttrs.rotation);
      newTr.scale(newScaleX, newScaleY);
    }
    const delta = newTr.multiply(oldTr.invert());
    const layersToDraw = /* @__PURE__ */ new Set();
    this._nodes.forEach((node) => {
      if (!node.getStage()) {
        return;
      }
      const parentTransform = node.getParent().getAbsoluteTransform();
      const localTransform = node.getTransform().copy();
      localTransform.translate(node.offsetX(), node.offsetY());
      const newLocalTransform = new Transform();
      newLocalTransform.multiply(parentTransform.copy().invert()).multiply(delta).multiply(parentTransform).multiply(localTransform);
      const attrs = newLocalTransform.decompose();
      node.setAttrs(attrs);
      const layer = node.getLayer();
      if (layer) {
        layersToDraw.add(layer);
      }
    });
    this.rotation(Util._getRotation(newAttrs.rotation));
    this._nodes.forEach((node) => {
      this._fire("transform", { evt, target: node });
      node._fire("transform", { evt, target: node });
    });
    this._resetTransformCache();
    this.update();
    layersToDraw.add(this.getLayer());
    layersToDraw.forEach((layer) => layer && layer.batchDraw());
  }
  // Inside an absoluteTransform cascade, queue a single update to run when
  // the cascade ends; outside a cascade, run synchronously so reads of
  // transformer state stay consistent.
  _scheduleUpdate() {
    if (this._updateScheduled)
      return;
    this._updateScheduled = true;
    Node._runAfterAbsTransformCascade(() => {
      var _a2;
      this._updateScheduled = false;
      if (!((_a2 = this._nodes) === null || _a2 === void 0 ? void 0 : _a2.length) || this._fitting || this.isDragging()) {
        return;
      }
      this._update();
    });
  }
  /**
   * force update of Konva.Transformer.
   * The transformer follows attribute changes of attached nodes and, for an attached group, any change of its descendants.
   * Use it after a change that sets no attribute, for example a `Line` points array mutated in place
   * or a custom `getSelfRect()` that depends on outside state.
   * @method
   * @name Konva.Transformer#forceUpdate
   */
  forceUpdate() {
    this._resetTransformCache();
    this.update();
  }
  update() {
    this._lastNodeRect = void 0;
    this._update();
  }
  _update() {
    var _a2;
    this._subtreeChanged = false;
    const attrs = this._getNodeRect();
    this._updateElements(attrs);
    const draggable = this.nodes().some((node) => node.draggable());
    if (this._back.draggable() !== draggable) {
      this._back.draggable(draggable);
    }
    const styleFunc = this.anchorStyleFunc();
    if (styleFunc) {
      Object.values(this._anchors).forEach((node) => styleFunc(node));
    }
    (_a2 = this.getLayer()) === null || _a2 === void 0 ? void 0 : _a2.batchDraw();
  }
  _updateElements(attrs) {
    const previous = this._lastNodeRect;
    if (previous && !this.anchorStyleFunc() && attrs.x === previous.x && attrs.y === previous.y && attrs.width === previous.width && attrs.height === previous.height && attrs.rotation === previous.rotation) {
      return;
    }
    this._lastNodeRect = { ...attrs };
    const width = attrs.width;
    const height = attrs.height;
    const enabledAnchors = this.enabledAnchors();
    const resizeEnabled = this.resizeEnabled();
    const padding = this.padding();
    const anchorSize = this.anchorSize();
    const anchors = Object.values(this._anchors);
    anchors.forEach((node) => {
      node.setAttrs({
        width: anchorSize,
        height: anchorSize,
        offsetX: anchorSize / 2,
        offsetY: anchorSize / 2,
        stroke: this.anchorStroke(),
        strokeWidth: this.anchorStrokeWidth(),
        fill: this.anchorFill(),
        cornerRadius: this.anchorCornerRadius()
      });
    });
    this._anchors["top-left"].setAttrs({
      x: 0,
      y: 0,
      offsetX: anchorSize / 2 + padding,
      offsetY: anchorSize / 2 + padding,
      visible: resizeEnabled && enabledAnchors.indexOf("top-left") >= 0
    });
    this._anchors["top-center"].setAttrs({
      x: width / 2,
      y: 0,
      offsetY: anchorSize / 2 + padding,
      visible: resizeEnabled && enabledAnchors.indexOf("top-center") >= 0
    });
    this._anchors["top-right"].setAttrs({
      x: width,
      y: 0,
      offsetX: anchorSize / 2 - padding,
      offsetY: anchorSize / 2 + padding,
      visible: resizeEnabled && enabledAnchors.indexOf("top-right") >= 0
    });
    this._anchors["middle-left"].setAttrs({
      x: 0,
      y: height / 2,
      offsetX: anchorSize / 2 + padding,
      visible: resizeEnabled && enabledAnchors.indexOf("middle-left") >= 0
    });
    this._anchors["middle-right"].setAttrs({
      x: width,
      y: height / 2,
      offsetX: anchorSize / 2 - padding,
      visible: resizeEnabled && enabledAnchors.indexOf("middle-right") >= 0
    });
    this._anchors["bottom-left"].setAttrs({
      x: 0,
      y: height,
      offsetX: anchorSize / 2 + padding,
      offsetY: anchorSize / 2 - padding,
      visible: resizeEnabled && enabledAnchors.indexOf("bottom-left") >= 0
    });
    this._anchors["bottom-center"].setAttrs({
      x: width / 2,
      y: height,
      offsetY: anchorSize / 2 - padding,
      visible: resizeEnabled && enabledAnchors.indexOf("bottom-center") >= 0
    });
    this._anchors["bottom-right"].setAttrs({
      x: width,
      y: height,
      offsetX: anchorSize / 2 - padding,
      offsetY: anchorSize / 2 - padding,
      visible: resizeEnabled && enabledAnchors.indexOf("bottom-right") >= 0
    });
    const rotaterLine = getRotaterLine(this, width, height);
    this._anchors["rotater"].setAttrs({
      x: rotaterLine.endX,
      y: rotaterLine.endY,
      visible: this.rotateEnabled()
    });
    this._back.setAttrs({
      width,
      height,
      visible: this.borderEnabled() || this.shouldOverdrawWholeArea(),
      stroke: this.borderStroke(),
      strokeWidth: this.borderStrokeWidth(),
      dash: this.borderDash(),
      x: 0,
      y: 0
    });
  }
  /**
   * determine if transformer is in active transform
   * @method
   * @name Konva.Transformer#isTransforming
   * @returns {Boolean}
   */
  isTransforming() {
    return this._transforming;
  }
  /**
   * Stop active transform action
   * @method
   * @name Konva.Transformer#stopTransform
   * @returns {Boolean}
   */
  stopTransform() {
    if (this._transforming) {
      this._removeEvents();
    }
  }
  destroy() {
    if (this.getStage() && this._cursorChange) {
      this.getStage().content && (this.getStage().content.style.cursor = "");
    }
    Group.prototype.destroy.call(this);
    this.detach();
    this._removeEvents();
    return this;
  }
  // Transformer manages its own internal children (anchors, back shape).
  // Adding external nodes as children can cause infinite recursion because
  // the Transformer's absoluteTransform depends on nodes' transforms.
  // Use tr.nodes([node]) to attach nodes instead.
  add(...children) {
    if (this._elementsCreated) {
      Util.error("You cannot add external nodes to the Transformer. Use tr.nodes([node]) instead.");
      return this;
    }
    return super.add(...children);
  }
  // do not work as a container
  // we will recreate inner nodes manually
  toObject() {
    return Node.prototype.toObject.call(this);
  }
  // overwrite clone to NOT use method from Container
  clone(obj) {
    const node = Node.prototype.clone.call(this, obj);
    return node;
  }
  getClientRect(config) {
    if (this.nodes().length > 0) {
      return super.getClientRect(config);
    } else {
      return { x: 0, y: 0, width: 0, height: 0 };
    }
  }
};
Transformer.isTransforming = () => {
  return activeTransformers.size > 0;
};
function validateAnchors(val) {
  if (!(val instanceof Array)) {
    Util.warn("enabledAnchors value should be an array");
  }
  if (val instanceof Array) {
    val.forEach(function(name) {
      if (ANCHORS_NAMES.indexOf(name) === -1) {
        Util.warn("Unknown anchor name: " + name + ". Available names are: " + ANCHORS_NAMES.join(", "));
      }
    });
  }
  return val || [];
}
Transformer.prototype.className = "Transformer";
_registerNode(Transformer);
Factory.addGetterSetter(Transformer, "enabledAnchors", ANCHORS_NAMES, validateAnchors);
Factory.addGetterSetter(Transformer, "flipEnabled", true, getBooleanValidator());
Factory.addGetterSetter(Transformer, "resizeEnabled", true);
Factory.addGetterSetter(Transformer, "anchorSize", 10, getNumberValidator());
Factory.addGetterSetter(Transformer, "rotateEnabled", true);
Factory.addGetterSetter(Transformer, "rotateLineVisible", true);
Factory.addGetterSetter(Transformer, "rotationSnaps", []);
Factory.addGetterSetter(Transformer, "rotateAnchorOffset", 50, getNumberValidator());
Factory.addGetterSetter(Transformer, "rotateAnchorAngle", 0, getNumberValidator());
Factory.addGetterSetter(Transformer, "rotateAnchorCursor", "crosshair");
Factory.addGetterSetter(Transformer, "rotationSnapTolerance", 5, getNumberValidator());
Factory.addGetterSetter(Transformer, "borderEnabled", true);
Factory.addGetterSetter(Transformer, "anchorStroke", "rgb(0, 161, 255)");
Factory.addGetterSetter(Transformer, "anchorStrokeWidth", 1, getNumberValidator());
Factory.addGetterSetter(Transformer, "anchorFill", "white");
Factory.addGetterSetter(Transformer, "anchorCornerRadius", 0, getNumberValidator());
Factory.addGetterSetter(Transformer, "borderStroke", "rgb(0, 161, 255)");
Factory.addGetterSetter(Transformer, "borderStrokeWidth", 1, getNumberValidator());
Factory.addGetterSetter(Transformer, "borderDash");
Factory.addGetterSetter(Transformer, "keepRatio", true);
Factory.addGetterSetter(Transformer, "shiftBehavior", "default");
Factory.addGetterSetter(Transformer, "centeredScaling", false);
Factory.addGetterSetter(Transformer, "ignoreStroke", false);
Factory.addGetterSetter(Transformer, "padding", 0, getNumberValidator());
Factory.addGetterSetter(Transformer, "nodes");
Factory.addGetterSetter(Transformer, "node");
Factory.addGetterSetter(Transformer, "boundBoxFunc");
Factory.addGetterSetter(Transformer, "anchorDragBoundFunc");
Factory.addGetterSetter(Transformer, "anchorStyleFunc");
Factory.addGetterSetter(Transformer, "shouldOverdrawWholeArea", false);
Factory.addGetterSetter(Transformer, "useSingleNodeRotation", true);
Factory.backCompat(Transformer, {
  lineEnabled: "borderEnabled",
  rotateHandlerOffset: "rotateAnchorOffset",
  enabledHandlers: "enabledAnchors"
});

// node_modules/konva/lib/shapes/Wedge.js
var Wedge = class extends Shape {
  _sceneFunc(context) {
    context.beginPath();
    context.arc(0, 0, Math.abs(this.radius()), 0, Konva.getAngle(this.angle()), this.clockwise());
    context.lineTo(0, 0);
    context.closePath();
    context.fillStrokeShape(this);
  }
  getWidth() {
    return Math.abs(this.radius()) * 2;
  }
  getHeight() {
    return Math.abs(this.radius()) * 2;
  }
  setWidth(width) {
    this.radius(width / 2);
  }
  setHeight(height) {
    this.radius(height / 2);
  }
};
Wedge.prototype.className = "Wedge";
Wedge.prototype._centroid = true;
Wedge.prototype._attrsAffectingSize = ["radius"];
_registerNode(Wedge, true);
Factory.addGetterSetter(Wedge, "radius", 0, getNumberValidator());
Factory.addGetterSetter(Wedge, "angle", 0, getNumberValidator());
Factory.addGetterSetter(Wedge, "clockwise", false);
Factory.backCompat(Wedge, {
  angleDeg: "angle",
  getAngleDeg: "getAngle",
  setAngleDeg: "setAngle"
});

// node_modules/konva/lib/filters/Blur.js
function BlurStack() {
  this.r = 0;
  this.g = 0;
  this.b = 0;
  this.a = 0;
  this.next = null;
}
var mul_table = [
  512,
  512,
  456,
  512,
  328,
  456,
  335,
  512,
  405,
  328,
  271,
  456,
  388,
  335,
  292,
  512,
  454,
  405,
  364,
  328,
  298,
  271,
  496,
  456,
  420,
  388,
  360,
  335,
  312,
  292,
  273,
  512,
  482,
  454,
  428,
  405,
  383,
  364,
  345,
  328,
  312,
  298,
  284,
  271,
  259,
  496,
  475,
  456,
  437,
  420,
  404,
  388,
  374,
  360,
  347,
  335,
  323,
  312,
  302,
  292,
  282,
  273,
  265,
  512,
  497,
  482,
  468,
  454,
  441,
  428,
  417,
  405,
  394,
  383,
  373,
  364,
  354,
  345,
  337,
  328,
  320,
  312,
  305,
  298,
  291,
  284,
  278,
  271,
  265,
  259,
  507,
  496,
  485,
  475,
  465,
  456,
  446,
  437,
  428,
  420,
  412,
  404,
  396,
  388,
  381,
  374,
  367,
  360,
  354,
  347,
  341,
  335,
  329,
  323,
  318,
  312,
  307,
  302,
  297,
  292,
  287,
  282,
  278,
  273,
  269,
  265,
  261,
  512,
  505,
  497,
  489,
  482,
  475,
  468,
  461,
  454,
  447,
  441,
  435,
  428,
  422,
  417,
  411,
  405,
  399,
  394,
  389,
  383,
  378,
  373,
  368,
  364,
  359,
  354,
  350,
  345,
  341,
  337,
  332,
  328,
  324,
  320,
  316,
  312,
  309,
  305,
  301,
  298,
  294,
  291,
  287,
  284,
  281,
  278,
  274,
  271,
  268,
  265,
  262,
  259,
  257,
  507,
  501,
  496,
  491,
  485,
  480,
  475,
  470,
  465,
  460,
  456,
  451,
  446,
  442,
  437,
  433,
  428,
  424,
  420,
  416,
  412,
  408,
  404,
  400,
  396,
  392,
  388,
  385,
  381,
  377,
  374,
  370,
  367,
  363,
  360,
  357,
  354,
  350,
  347,
  344,
  341,
  338,
  335,
  332,
  329,
  326,
  323,
  320,
  318,
  315,
  312,
  310,
  307,
  304,
  302,
  299,
  297,
  294,
  292,
  289,
  287,
  285,
  282,
  280,
  278,
  275,
  273,
  271,
  269,
  267,
  265,
  263,
  261,
  259
];
var shg_table = [
  9,
  11,
  12,
  13,
  13,
  14,
  14,
  15,
  15,
  15,
  15,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  18,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24
];
function premultiply(channel, alpha) {
  return alpha === 255 ? channel : channel * alpha / 255;
}
var MAX_RADIUS = 180;
function filterGaussBlurRGBA(imageData, radius) {
  const pixels = imageData.data, width = imageData.width, height = imageData.height;
  let p2, yi, yw, r_sum, g_sum, b_sum, a_sum, r_out_sum, g_out_sum, b_out_sum, a_out_sum, r_in_sum, g_in_sum, b_in_sum, a_in_sum, pr, pg, pb, pa, rbs;
  const div = radius + radius + 1, widthMinus1 = width - 1, heightMinus1 = height - 1, radiusPlus1 = radius + 1, sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2, stackStart = new BlurStack(), normalization = radius <= MAX_RADIUS ? mul_table[radius] / 2 ** shg_table[radius] : 1 / (radiusPlus1 * radiusPlus1);
  let stackEnd = null, stack = stackStart, stackIn = null, stackOut = null;
  for (let i2 = 1; i2 < div; i2++) {
    stack = stack.next = new BlurStack();
    if (i2 === radiusPlus1) {
      stackEnd = stack;
    }
  }
  stack.next = stackStart;
  yw = yi = 0;
  for (let y = 0; y < height; y++) {
    r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;
    pa = pixels[yi + 3];
    pr = premultiply(pixels[yi], pa);
    pg = premultiply(pixels[yi + 1], pa);
    pb = premultiply(pixels[yi + 2], pa);
    r_out_sum = radiusPlus1 * pr;
    g_out_sum = radiusPlus1 * pg;
    b_out_sum = radiusPlus1 * pb;
    a_out_sum = radiusPlus1 * pa;
    r_sum += sumFactor * pr;
    g_sum += sumFactor * pg;
    b_sum += sumFactor * pb;
    a_sum += sumFactor * pa;
    stack = stackStart;
    for (let i2 = 0; i2 < radiusPlus1; i2++) {
      stack.r = pr;
      stack.g = pg;
      stack.b = pb;
      stack.a = pa;
      stack = stack.next;
    }
    for (let i2 = 1; i2 < radiusPlus1; i2++) {
      p2 = yi + ((widthMinus1 < i2 ? widthMinus1 : i2) << 2);
      pa = pixels[p2 + 3];
      r_sum += (stack.r = pr = premultiply(pixels[p2], pa)) * (rbs = radiusPlus1 - i2);
      g_sum += (stack.g = pg = premultiply(pixels[p2 + 1], pa)) * rbs;
      b_sum += (stack.b = pb = premultiply(pixels[p2 + 2], pa)) * rbs;
      a_sum += (stack.a = pa) * rbs;
      r_in_sum += pr;
      g_in_sum += pg;
      b_in_sum += pb;
      a_in_sum += pa;
      stack = stack.next;
    }
    stackIn = stackStart;
    stackOut = stackEnd;
    for (let x2 = 0; x2 < width; x2++) {
      pixels[yi] = Math.floor(r_sum * normalization);
      pixels[yi + 1] = Math.floor(g_sum * normalization);
      pixels[yi + 2] = Math.floor(b_sum * normalization);
      pixels[yi + 3] = Math.floor(a_sum * normalization);
      r_sum -= r_out_sum;
      g_sum -= g_out_sum;
      b_sum -= b_out_sum;
      a_sum -= a_out_sum;
      r_out_sum -= stackIn.r;
      g_out_sum -= stackIn.g;
      b_out_sum -= stackIn.b;
      a_out_sum -= stackIn.a;
      p2 = yw + ((p2 = x2 + radius + 1) < widthMinus1 ? p2 : widthMinus1) << 2;
      pa = pixels[p2 + 3];
      r_in_sum += stackIn.r = premultiply(pixels[p2], pa);
      g_in_sum += stackIn.g = premultiply(pixels[p2 + 1], pa);
      b_in_sum += stackIn.b = premultiply(pixels[p2 + 2], pa);
      a_in_sum += stackIn.a = pa;
      r_sum += r_in_sum;
      g_sum += g_in_sum;
      b_sum += b_in_sum;
      a_sum += a_in_sum;
      stackIn = stackIn.next;
      r_out_sum += pr = stackOut.r;
      g_out_sum += pg = stackOut.g;
      b_out_sum += pb = stackOut.b;
      a_out_sum += pa = stackOut.a;
      r_in_sum -= pr;
      g_in_sum -= pg;
      b_in_sum -= pb;
      a_in_sum -= pa;
      stackOut = stackOut.next;
      yi += 4;
    }
    yw += width;
  }
  for (let x2 = 0; x2 < width; x2++) {
    g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;
    yi = x2 << 2;
    r_out_sum = radiusPlus1 * (pr = pixels[yi]);
    g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
    b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
    a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
    r_sum += sumFactor * pr;
    g_sum += sumFactor * pg;
    b_sum += sumFactor * pb;
    a_sum += sumFactor * pa;
    stack = stackStart;
    for (let i2 = 0; i2 < radiusPlus1; i2++) {
      stack.r = pr;
      stack.g = pg;
      stack.b = pb;
      stack.a = pa;
      stack = stack.next;
    }
    let yp = Math.min(1, heightMinus1) * width;
    for (let i2 = 1; i2 <= radius; i2++) {
      yi = yp + x2 << 2;
      r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i2);
      g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
      b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
      a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;
      r_in_sum += pr;
      g_in_sum += pg;
      b_in_sum += pb;
      a_in_sum += pa;
      stack = stack.next;
      if (i2 < heightMinus1) {
        yp += width;
      }
    }
    yi = x2;
    stackIn = stackStart;
    stackOut = stackEnd;
    for (let y = 0; y < height; y++) {
      p2 = yi << 2;
      pixels[p2 + 3] = pa = Math.floor(a_sum * normalization);
      if (pa > 0) {
        pa = 255 / pa;
        pixels[p2] = Math.floor(r_sum * normalization) * pa;
        pixels[p2 + 1] = Math.floor(g_sum * normalization) * pa;
        pixels[p2 + 2] = Math.floor(b_sum * normalization) * pa;
      } else {
        pixels[p2] = pixels[p2 + 1] = pixels[p2 + 2] = 0;
      }
      r_sum -= r_out_sum;
      g_sum -= g_out_sum;
      b_sum -= b_out_sum;
      a_sum -= a_out_sum;
      r_out_sum -= stackIn.r;
      g_out_sum -= stackIn.g;
      b_out_sum -= stackIn.b;
      a_out_sum -= stackIn.a;
      p2 = x2 + ((p2 = y + radiusPlus1) < heightMinus1 ? p2 : heightMinus1) * width << 2;
      r_sum += r_in_sum += stackIn.r = pixels[p2];
      g_sum += g_in_sum += stackIn.g = pixels[p2 + 1];
      b_sum += b_in_sum += stackIn.b = pixels[p2 + 2];
      a_sum += a_in_sum += stackIn.a = pixels[p2 + 3];
      stackIn = stackIn.next;
      r_out_sum += pr = stackOut.r;
      g_out_sum += pg = stackOut.g;
      b_out_sum += pb = stackOut.b;
      a_out_sum += pa = stackOut.a;
      r_in_sum -= pr;
      g_in_sum -= pg;
      b_in_sum -= pb;
      a_in_sum -= pa;
      stackOut = stackOut.next;
      yi += width;
    }
  }
}
var Blur = function Blur2(imageData, pixelRatio = 1) {
  const radius = Math.round(Math.min(this.blurRadius(), MAX_RADIUS) * pixelRatio);
  if (radius > 0) {
    filterGaussBlurRGBA(imageData, radius);
  }
};
Factory.addGetterSetter(Node, "blurRadius", 0, getNumberValidator(), Factory.afterSetFilter);

// node_modules/konva/lib/filters/Brighten.js
var Brighten = function(imageData) {
  const brightness2 = this.brightness() * 255, data = imageData.data, len = data.length;
  for (let i2 = 0; i2 < len; i2 += 4) {
    data[i2] += brightness2;
    data[i2 + 1] += brightness2;
    data[i2 + 2] += brightness2;
  }
};
Factory.addGetterSetter(Node, "brightness", 0, getNumberValidator(), Factory.afterSetFilter);

// node_modules/konva/lib/filters/Brightness.js
var Brightness = function(imageData) {
  const brightness2 = this.attrs.brightness === void 0 ? 1 : this.brightness(), data = imageData.data, len = data.length;
  for (let i2 = 0; i2 < len; i2 += 4) {
    data[i2] = Math.min(255, data[i2] * brightness2);
    data[i2 + 1] = Math.min(255, data[i2 + 1] * brightness2);
    data[i2 + 2] = Math.min(255, data[i2 + 2] * brightness2);
  }
};

// node_modules/konva/lib/filters/Contrast.js
var Contrast = function(imageData) {
  const adjust = Math.pow((this.contrast() + 100) / 100, 2);
  const data = imageData.data, nPixels = data.length;
  let red = 150, green = 150, blue = 150;
  for (let i2 = 0; i2 < nPixels; i2 += 4) {
    red = data[i2];
    green = data[i2 + 1];
    blue = data[i2 + 2];
    red /= 255;
    red -= 0.5;
    red *= adjust;
    red += 0.5;
    red *= 255;
    green /= 255;
    green -= 0.5;
    green *= adjust;
    green += 0.5;
    green *= 255;
    blue /= 255;
    blue -= 0.5;
    blue *= adjust;
    blue += 0.5;
    blue *= 255;
    red = red < 0 ? 0 : red > 255 ? 255 : red;
    green = green < 0 ? 0 : green > 255 ? 255 : green;
    blue = blue < 0 ? 0 : blue > 255 ? 255 : blue;
    data[i2] = red;
    data[i2 + 1] = green;
    data[i2 + 2] = blue;
  }
};
Factory.addGetterSetter(Node, "contrast", 0, getNumberValidator(), Factory.afterSetFilter);

// node_modules/konva/lib/filters/Emboss.js
var Emboss = function(imageData) {
  var _a2, _b, _c, _d, _e, _f, _g, _h, _j;
  const data = imageData.data;
  const w2 = imageData.width;
  const h2 = imageData.height;
  const strength01 = Math.min(1, Math.max(0, (_b = (_a2 = this.embossStrength) === null || _a2 === void 0 ? void 0 : _a2.call(this)) !== null && _b !== void 0 ? _b : 0.5));
  const whiteLevel01 = Math.min(1, Math.max(0, (_d = (_c = this.embossWhiteLevel) === null || _c === void 0 ? void 0 : _c.call(this)) !== null && _d !== void 0 ? _d : 0.5));
  const directionMap = {
    "top-left": 315,
    top: 270,
    "top-right": 225,
    right: 180,
    "bottom-right": 135,
    bottom: 90,
    "bottom-left": 45,
    left: 0
  };
  const directionDeg = (_g = directionMap[(_f = (_e = this.embossDirection) === null || _e === void 0 ? void 0 : _e.call(this)) !== null && _f !== void 0 ? _f : "top-left"]) !== null && _g !== void 0 ? _g : 315;
  const blend = !!((_j = (_h = this.embossBlend) === null || _h === void 0 ? void 0 : _h.call(this)) !== null && _j !== void 0 ? _j : false);
  const strength = strength01 * 10;
  const bias = whiteLevel01 * 255;
  const dirRad = directionDeg * Math.PI / 180;
  const cx = Math.cos(dirRad);
  const cy = Math.sin(dirRad);
  const SCALE = 128 / 1020 * strength;
  const lum = new Float32Array(w2 * h2);
  for (let p2 = 0, i2 = 0; i2 < data.length; i2 += 4, p2++) {
    lum[p2] = 0.2126 * data[i2] + 0.7152 * data[i2 + 1] + 0.0722 * data[i2 + 2];
  }
  const Gx = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
  const Gy = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
  const clamp8 = (v) => v < 0 ? 0 : v > 255 ? 255 : v;
  for (let y = 0; y < h2; y++) {
    for (let x2 = 0; x2 < w2; x2++) {
      let sx = 0, sy = 0, k = 0;
      for (let dy = -1; dy <= 1; dy++) {
        const row = Math.max(0, Math.min(h2 - 1, y + dy)) * w2;
        for (let dx = -1; dx <= 1; dx++, k++) {
          const sample = lum[row + Math.max(0, Math.min(w2 - 1, x2 + dx))];
          sx += sample * Gx[k];
          sy += sample * Gy[k];
        }
      }
      const p2 = y * w2 + x2;
      const r2 = cx * sx + cy * sy;
      const outGray = clamp8(bias + r2 * SCALE);
      const o2 = p2 * 4;
      if (blend) {
        const delta = outGray - bias;
        data[o2] = clamp8(data[o2] + delta);
        data[o2 + 1] = clamp8(data[o2 + 1] + delta);
        data[o2 + 2] = clamp8(data[o2 + 2] + delta);
      } else {
        data[o2] = data[o2 + 1] = data[o2 + 2] = outGray;
      }
    }
  }
  return imageData;
};
Factory.addGetterSetter(Node, "embossStrength", 0.5, getNumberValidator(), Factory.afterSetFilter);
Factory.addGetterSetter(Node, "embossWhiteLevel", 0.5, getNumberValidator(), Factory.afterSetFilter);
Factory.addGetterSetter(Node, "embossDirection", "top-left", void 0, Factory.afterSetFilter);
Factory.addGetterSetter(Node, "embossBlend", false, void 0, Factory.afterSetFilter);

// node_modules/konva/lib/filters/Enhance.js
function remap(fromValue, fromMin, fromMax, toMin, toMax) {
  const fromRange = fromMax - fromMin, toRange = toMax - toMin;
  if (fromRange === 0) {
    return toMin + toRange / 2;
  }
  if (toRange === 0) {
    return toMin;
  }
  let toValue = (fromValue - fromMin) / fromRange;
  toValue = toRange * toValue + toMin;
  return toValue;
}
var Enhance = function(imageData) {
  const data = imageData.data, nSubPixels = data.length;
  let rMin = data[0], rMax = rMin, r2, gMin = data[1], gMax = gMin, g2, bMin = data[2], bMax = bMin, b2;
  const enhanceAmount = this.enhance();
  if (enhanceAmount === 0) {
    return;
  }
  for (let i2 = 0; i2 < nSubPixels; i2 += 4) {
    r2 = data[i2 + 0];
    if (r2 < rMin) {
      rMin = r2;
    } else if (r2 > rMax) {
      rMax = r2;
    }
    g2 = data[i2 + 1];
    if (g2 < gMin) {
      gMin = g2;
    } else if (g2 > gMax) {
      gMax = g2;
    }
    b2 = data[i2 + 2];
    if (b2 < bMin) {
      bMin = b2;
    } else if (b2 > bMax) {
      bMax = b2;
    }
  }
  if (rMax === rMin) {
    rMax = 255;
    rMin = 0;
  }
  if (gMax === gMin) {
    gMax = 255;
    gMin = 0;
  }
  if (bMax === bMin) {
    bMax = 255;
    bMin = 0;
  }
  let rGoalMax, rGoalMin, gGoalMax, gGoalMin, bGoalMax, bGoalMin;
  if (enhanceAmount > 0) {
    rGoalMax = rMax + enhanceAmount * (255 - rMax);
    rGoalMin = rMin - enhanceAmount * (rMin - 0);
    gGoalMax = gMax + enhanceAmount * (255 - gMax);
    gGoalMin = gMin - enhanceAmount * (gMin - 0);
    bGoalMax = bMax + enhanceAmount * (255 - bMax);
    bGoalMin = bMin - enhanceAmount * (bMin - 0);
  } else {
    const rMid = (rMax + rMin) * 0.5;
    rGoalMax = rMax + enhanceAmount * (rMax - rMid);
    rGoalMin = rMin + enhanceAmount * (rMin - rMid);
    const gMid = (gMax + gMin) * 0.5;
    gGoalMax = gMax + enhanceAmount * (gMax - gMid);
    gGoalMin = gMin + enhanceAmount * (gMin - gMid);
    const bMid = (bMax + bMin) * 0.5;
    bGoalMax = bMax + enhanceAmount * (bMax - bMid);
    bGoalMin = bMin + enhanceAmount * (bMin - bMid);
  }
  for (let i2 = 0; i2 < nSubPixels; i2 += 4) {
    data[i2 + 0] = remap(data[i2 + 0], rMin, rMax, rGoalMin, rGoalMax);
    data[i2 + 1] = remap(data[i2 + 1], gMin, gMax, gGoalMin, gGoalMax);
    data[i2 + 2] = remap(data[i2 + 2], bMin, bMax, bGoalMin, bGoalMax);
  }
};
Factory.addGetterSetter(Node, "enhance", 0, getNumberValidator(), Factory.afterSetFilter);

// node_modules/konva/lib/filters/Grayscale.js
var Grayscale = function(imageData) {
  const data = imageData.data, len = data.length;
  for (let i2 = 0; i2 < len; i2 += 4) {
    const brightness2 = 0.34 * data[i2] + 0.5 * data[i2 + 1] + 0.16 * data[i2 + 2];
    data[i2] = brightness2;
    data[i2 + 1] = brightness2;
    data[i2 + 2] = brightness2;
  }
};

// node_modules/konva/lib/filters/HSL.js
Factory.addGetterSetter(Node, "hue", 0, getNumberValidator(), Factory.afterSetFilter);
Factory.addGetterSetter(Node, "saturation", 0, getNumberValidator(), Factory.afterSetFilter);
Factory.addGetterSetter(Node, "luminance", 0, getNumberValidator(), Factory.afterSetFilter);
var HSL = function(imageData) {
  const data = imageData.data, nPixels = data.length, v = 1, s2 = Math.pow(2, this.saturation()), h2 = (this.hue() % 360 + 360) % 360, l3 = this.luminance() * 127;
  const vsu = v * s2 * Math.cos(h2 * Math.PI / 180), vsw = v * s2 * Math.sin(h2 * Math.PI / 180);
  const rr = 0.299 * v + 0.701 * vsu + 0.168 * vsw, rg = 0.587 * v - 0.587 * vsu + 0.33 * vsw, rb = 0.114 * v - 0.114 * vsu - 0.497 * vsw;
  const gr = 0.299 * v - 0.299 * vsu - 0.328 * vsw, gg = 0.587 * v + 0.413 * vsu + 0.035 * vsw, gb = 0.114 * v - 0.114 * vsu + 0.292 * vsw;
  const br = 0.299 * v - 0.3 * vsu + 1.25 * vsw, bg = 0.587 * v - 0.588 * vsu - 1.05 * vsw, bb = 0.114 * v + 0.886 * vsu - 0.203 * vsw;
  let r2, g2, b2, a3;
  for (let i2 = 0; i2 < nPixels; i2 += 4) {
    r2 = data[i2 + 0];
    g2 = data[i2 + 1];
    b2 = data[i2 + 2];
    a3 = data[i2 + 3];
    data[i2 + 0] = rr * r2 + rg * g2 + rb * b2 + l3;
    data[i2 + 1] = gr * r2 + gg * g2 + gb * b2 + l3;
    data[i2 + 2] = br * r2 + bg * g2 + bb * b2 + l3;
    data[i2 + 3] = a3;
  }
};

// node_modules/konva/lib/filters/HSV.js
var HSV = function(imageData) {
  const data = imageData.data, nPixels = data.length, v = Math.pow(2, this.value()), s2 = Math.pow(2, this.saturation()), h2 = (this.hue() % 360 + 360) % 360;
  const vsu = v * s2 * Math.cos(h2 * Math.PI / 180), vsw = v * s2 * Math.sin(h2 * Math.PI / 180);
  const rr = 0.299 * v + 0.701 * vsu + 0.168 * vsw, rg = 0.587 * v - 0.587 * vsu + 0.33 * vsw, rb = 0.114 * v - 0.114 * vsu - 0.497 * vsw;
  const gr = 0.299 * v - 0.299 * vsu - 0.328 * vsw, gg = 0.587 * v + 0.413 * vsu + 0.035 * vsw, gb = 0.114 * v - 0.114 * vsu + 0.292 * vsw;
  const br = 0.299 * v - 0.3 * vsu + 1.25 * vsw, bg = 0.587 * v - 0.588 * vsu - 1.05 * vsw, bb = 0.114 * v + 0.886 * vsu - 0.203 * vsw;
  for (let i2 = 0; i2 < nPixels; i2 += 4) {
    const r2 = data[i2 + 0];
    const g2 = data[i2 + 1];
    const b2 = data[i2 + 2];
    const a3 = data[i2 + 3];
    data[i2 + 0] = rr * r2 + rg * g2 + rb * b2;
    data[i2 + 1] = gr * r2 + gg * g2 + gb * b2;
    data[i2 + 2] = br * r2 + bg * g2 + bb * b2;
    data[i2 + 3] = a3;
  }
};
Factory.addGetterSetter(Node, "hue", 0, getNumberValidator(), Factory.afterSetFilter);
Factory.addGetterSetter(Node, "saturation", 0, getNumberValidator(), Factory.afterSetFilter);
Factory.addGetterSetter(Node, "value", 0, getNumberValidator(), Factory.afterSetFilter);

// node_modules/konva/lib/filters/Invert.js
var Invert = function(imageData) {
  const data = imageData.data, len = data.length;
  for (let i2 = 0; i2 < len; i2 += 4) {
    data[i2] = 255 - data[i2];
    data[i2 + 1] = 255 - data[i2 + 1];
    data[i2 + 2] = 255 - data[i2 + 2];
  }
};

// node_modules/konva/lib/filters/Kaleidoscope.js
var ToPolar = function(src, dst, opt) {
  const srcPixels = src.data, dstPixels = dst.data, xSize = src.width, ySize = src.height, xMid = opt.polarCenterX || xSize / 2, yMid = opt.polarCenterY || ySize / 2;
  let rMax = Math.sqrt(xMid * xMid + yMid * yMid);
  let x2 = xSize - xMid;
  let y = ySize - yMid;
  const rad = Math.sqrt(x2 * x2 + y * y);
  rMax = rad > rMax ? rad : rMax;
  const rSize = ySize, tSize = xSize;
  const conversion = 360 / tSize * Math.PI / 180;
  for (let theta = 0; theta < tSize; theta += 1) {
    const sin = Math.sin(theta * conversion);
    const cos = Math.cos(theta * conversion);
    for (let radius = 0; radius < rSize; radius += 1) {
      x2 = Math.floor(xMid + rMax * radius / rSize * cos);
      y = Math.floor(yMid + rMax * radius / rSize * sin);
      let i2 = (y * xSize + x2) * 4;
      const r2 = srcPixels[i2 + 0];
      const g2 = srcPixels[i2 + 1];
      const b2 = srcPixels[i2 + 2];
      const a3 = srcPixels[i2 + 3];
      i2 = (theta + radius * xSize) * 4;
      dstPixels[i2 + 0] = r2;
      dstPixels[i2 + 1] = g2;
      dstPixels[i2 + 2] = b2;
      dstPixels[i2 + 3] = a3;
    }
  }
};
var FromPolar = function(src, dst, opt) {
  const srcPixels = src.data, dstPixels = dst.data, xSize = src.width, ySize = src.height, xMid = opt.polarCenterX || xSize / 2, yMid = opt.polarCenterY || ySize / 2;
  let rMax = Math.sqrt(xMid * xMid + yMid * yMid);
  let x2 = xSize - xMid;
  let y = ySize - yMid;
  const rad = Math.sqrt(x2 * x2 + y * y);
  rMax = rad > rMax ? rad : rMax;
  const rSize = ySize, tSize = xSize, phaseShift = opt.polarRotation || 0;
  let x1, y1;
  for (x2 = 0; x2 < xSize; x2 += 1) {
    for (y = 0; y < ySize; y += 1) {
      const dx = x2 - xMid;
      const dy = y - yMid;
      const radius = Math.sqrt(dx * dx + dy * dy) * rSize / rMax;
      let theta = (Math.atan2(dy, dx) * 180 / Math.PI + 360 + phaseShift) % 360;
      theta = theta * tSize / 360;
      x1 = Math.floor(theta);
      y1 = Math.floor(radius);
      let i2 = (y1 * xSize + x1) * 4;
      const r2 = srcPixels[i2 + 0];
      const g2 = srcPixels[i2 + 1];
      const b2 = srcPixels[i2 + 2];
      const a3 = srcPixels[i2 + 3];
      i2 = (y * xSize + x2) * 4;
      dstPixels[i2 + 0] = r2;
      dstPixels[i2 + 1] = g2;
      dstPixels[i2 + 2] = b2;
      dstPixels[i2 + 3] = a3;
    }
  }
};
var Kaleidoscope = function(imageData) {
  const xSize = imageData.width, ySize = imageData.height;
  let x2, y, xoff, i2, r2, g2, b2, a3, srcPos, dstPos;
  let power = Math.round(this.kaleidoscopePower());
  const angle = Math.round(this.kaleidoscopeAngle());
  const offset = Math.floor(xSize * ((angle % 360 + 360) % 360) / 360);
  if (power < 1) {
    return;
  }
  const scratchData = {
    width: xSize,
    height: ySize,
    data: new Uint8ClampedArray(xSize * ySize * 4)
  };
  ToPolar(imageData, scratchData, {
    polarCenterX: xSize / 2,
    polarCenterY: ySize / 2
  });
  let minSectionSize = xSize / Math.pow(2, power);
  while (minSectionSize <= 8) {
    minSectionSize = minSectionSize * 2;
    power -= 1;
  }
  minSectionSize = Math.ceil(minSectionSize);
  let sectionSize = minSectionSize;
  let xStart = 0, xEnd = sectionSize, xDelta = 1;
  if (offset + minSectionSize > xSize) {
    xStart = sectionSize;
    xEnd = 0;
    xDelta = -1;
  }
  for (y = 0; y < ySize; y += 1) {
    for (x2 = xStart; x2 !== xEnd; x2 += xDelta) {
      xoff = Math.round(x2 + offset) % xSize;
      srcPos = (xSize * y + xoff) * 4;
      r2 = scratchData.data[srcPos + 0];
      g2 = scratchData.data[srcPos + 1];
      b2 = scratchData.data[srcPos + 2];
      a3 = scratchData.data[srcPos + 3];
      dstPos = (xSize * y + x2) * 4;
      scratchData.data[dstPos + 0] = r2;
      scratchData.data[dstPos + 1] = g2;
      scratchData.data[dstPos + 2] = b2;
      scratchData.data[dstPos + 3] = a3;
    }
  }
  for (y = 0; y < ySize; y += 1) {
    sectionSize = Math.floor(minSectionSize);
    for (i2 = 0; i2 < power; i2 += 1) {
      for (x2 = 0; x2 < sectionSize + 1; x2 += 1) {
        srcPos = (xSize * y + x2) * 4;
        r2 = scratchData.data[srcPos + 0];
        g2 = scratchData.data[srcPos + 1];
        b2 = scratchData.data[srcPos + 2];
        a3 = scratchData.data[srcPos + 3];
        dstPos = (xSize * y + sectionSize * 2 - x2 - 1) * 4;
        scratchData.data[dstPos + 0] = r2;
        scratchData.data[dstPos + 1] = g2;
        scratchData.data[dstPos + 2] = b2;
        scratchData.data[dstPos + 3] = a3;
      }
      sectionSize *= 2;
    }
  }
  FromPolar(scratchData, imageData, { polarRotation: 0 });
};
Factory.addGetterSetter(Node, "kaleidoscopePower", 2, getNumberValidator(), Factory.afterSetFilter);
Factory.addGetterSetter(Node, "kaleidoscopeAngle", 0, getNumberValidator(), Factory.afterSetFilter);

// node_modules/konva/lib/filters/Mask.js
function pixelAt(idata, x2, y) {
  let idx = (y * idata.width + x2) * 4;
  const d2 = [];
  d2.push(idata.data[idx++], idata.data[idx++], idata.data[idx++], idata.data[idx++]);
  return d2;
}
function rgbDistance(p1, p2) {
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2) + Math.pow(p1[2] - p2[2], 2));
}
function rgbMean(pTab) {
  const m = [0, 0, 0];
  for (let i2 = 0; i2 < pTab.length; i2++) {
    m[0] += pTab[i2][0];
    m[1] += pTab[i2][1];
    m[2] += pTab[i2][2];
  }
  m[0] /= pTab.length;
  m[1] /= pTab.length;
  m[2] /= pTab.length;
  return m;
}
function backgroundMask(idata, threshold) {
  const rgbv_no = pixelAt(idata, 0, 0);
  const rgbv_ne = pixelAt(idata, idata.width - 1, 0);
  const rgbv_so = pixelAt(idata, 0, idata.height - 1);
  const rgbv_se = pixelAt(idata, idata.width - 1, idata.height - 1);
  if (rgbDistance(rgbv_no, rgbv_ne) < threshold && rgbDistance(rgbv_ne, rgbv_se) < threshold && rgbDistance(rgbv_se, rgbv_so) < threshold && rgbDistance(rgbv_so, rgbv_no) < threshold) {
    const mean = rgbMean([rgbv_ne, rgbv_no, rgbv_se, rgbv_so]);
    const mask = [];
    for (let i2 = 0; i2 < idata.width * idata.height; i2++) {
      const d2 = rgbDistance(mean, [
        idata.data[i2 * 4],
        idata.data[i2 * 4 + 1],
        idata.data[i2 * 4 + 2]
      ]);
      mask[i2] = d2 < threshold ? 0 : 255;
    }
    return mask;
  }
}
function applyMask(idata, mask) {
  for (let i2 = 0; i2 < idata.width * idata.height; i2++) {
    idata.data[4 * i2 + 3] = mask[i2];
  }
}
function erodeMask(mask, sw, sh) {
  const weights = [1, 1, 1, 1, 0, 1, 1, 1, 1];
  const side = Math.round(Math.sqrt(weights.length));
  const halfSide = Math.floor(side / 2);
  const maskResult = [];
  for (let y = 0; y < sh; y++) {
    for (let x2 = 0; x2 < sw; x2++) {
      const so = y * sw + x2;
      let a3 = 0;
      for (let cy = 0; cy < side; cy++) {
        for (let cx = 0; cx < side; cx++) {
          const scy = y + cy - halfSide;
          const scx = x2 + cx - halfSide;
          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
            const srcOff = scy * sw + scx;
            const wt = weights[cy * side + cx];
            a3 += mask[srcOff] * wt;
          }
        }
      }
      maskResult[so] = a3 === 255 * 8 ? 255 : 0;
    }
  }
  return maskResult;
}
function dilateMask(mask, sw, sh) {
  const weights = [1, 1, 1, 1, 1, 1, 1, 1, 1];
  const side = Math.round(Math.sqrt(weights.length));
  const halfSide = Math.floor(side / 2);
  const maskResult = [];
  for (let y = 0; y < sh; y++) {
    for (let x2 = 0; x2 < sw; x2++) {
      const so = y * sw + x2;
      let a3 = 0;
      for (let cy = 0; cy < side; cy++) {
        for (let cx = 0; cx < side; cx++) {
          const scy = y + cy - halfSide;
          const scx = x2 + cx - halfSide;
          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
            const srcOff = scy * sw + scx;
            const wt = weights[cy * side + cx];
            a3 += mask[srcOff] * wt;
          }
        }
      }
      maskResult[so] = a3 >= 255 * 4 ? 255 : 0;
    }
  }
  return maskResult;
}
function smoothEdgeMask(mask, sw, sh) {
  const weights = [
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9
  ];
  const side = Math.round(Math.sqrt(weights.length));
  const halfSide = Math.floor(side / 2);
  const maskResult = [];
  for (let y = 0; y < sh; y++) {
    for (let x2 = 0; x2 < sw; x2++) {
      const so = y * sw + x2;
      let a3 = 0;
      for (let cy = 0; cy < side; cy++) {
        for (let cx = 0; cx < side; cx++) {
          const scy = y + cy - halfSide;
          const scx = x2 + cx - halfSide;
          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
            const srcOff = scy * sw + scx;
            const wt = weights[cy * side + cx];
            a3 += mask[srcOff] * wt;
          }
        }
      }
      maskResult[so] = a3;
    }
  }
  return maskResult;
}
var Mask = function(imageData) {
  var _a2;
  const threshold = (_a2 = this.attrs.threshold) !== null && _a2 !== void 0 ? _a2 : 10;
  let mask = backgroundMask(imageData, threshold);
  if (mask) {
    mask = erodeMask(mask, imageData.width, imageData.height);
    mask = dilateMask(mask, imageData.width, imageData.height);
    mask = smoothEdgeMask(mask, imageData.width, imageData.height);
    applyMask(imageData, mask);
  }
  return imageData;
};
Factory.addGetterSetter(Node, "threshold", 0.5, getNumberValidator(), Factory.afterSetFilter);

// node_modules/konva/lib/filters/Noise.js
var Noise = function(imageData) {
  const amount = this.noise() * 255, data = imageData.data, nPixels = data.length, half = amount / 2;
  for (let i2 = 0; i2 < nPixels; i2 += 4) {
    data[i2 + 0] += half - 2 * half * Math.random();
    data[i2 + 1] += half - 2 * half * Math.random();
    data[i2 + 2] += half - 2 * half * Math.random();
  }
};
Factory.addGetterSetter(Node, "noise", 0.2, getNumberValidator(), Factory.afterSetFilter);

// node_modules/konva/lib/filters/Pixelate.js
var Pixelate = function(imageData, pixelRatio = 1) {
  let pixelSize = Math.ceil(this.pixelSize() * pixelRatio), width = imageData.width, height = imageData.height, nBinsX = Math.ceil(width / pixelSize), nBinsY = Math.ceil(height / pixelSize), data = imageData.data;
  if (pixelSize <= 0) {
    Util.error("pixelSize value can not be <= 0");
    return;
  }
  for (let xBin = 0; xBin < nBinsX; xBin += 1) {
    for (let yBin = 0; yBin < nBinsY; yBin += 1) {
      let red = 0;
      let green = 0;
      let blue = 0;
      let alpha = 0;
      const xBinStart = xBin * pixelSize;
      const xBinEnd = Math.min(xBinStart + pixelSize, width);
      const yBinStart = yBin * pixelSize;
      const yBinEnd = Math.min(yBinStart + pixelSize, height);
      for (let x2 = xBinStart; x2 < xBinEnd; x2 += 1) {
        for (let y = yBinStart; y < yBinEnd; y += 1) {
          const i2 = (width * y + x2) * 4;
          const a3 = data[i2 + 3];
          red += data[i2 + 0] * a3;
          green += data[i2 + 1] * a3;
          blue += data[i2 + 2] * a3;
          alpha += a3;
        }
      }
      if (alpha) {
        red = red / alpha;
        green = green / alpha;
        blue = blue / alpha;
      }
      alpha = alpha / ((xBinEnd - xBinStart) * (yBinEnd - yBinStart));
      for (let x2 = xBinStart; x2 < xBinEnd; x2 += 1) {
        for (let y = yBinStart; y < yBinEnd; y += 1) {
          const i2 = (width * y + x2) * 4;
          data[i2 + 0] = red;
          data[i2 + 1] = green;
          data[i2 + 2] = blue;
          data[i2 + 3] = alpha;
        }
      }
    }
  }
};
Factory.addGetterSetter(Node, "pixelSize", 8, getNumberValidator(), Factory.afterSetFilter);

// node_modules/konva/lib/filters/Posterize.js
var Posterize = function(imageData) {
  const levels = Math.round(this.levels() * 254) + 1, data = imageData.data, len = data.length, scale = 255 / levels;
  for (let i2 = 0; i2 < len; i2 += 1) {
    data[i2] = Math.floor(data[i2] / scale) * scale;
  }
};
Factory.addGetterSetter(Node, "levels", 0.5, getNumberValidator(), Factory.afterSetFilter);

// node_modules/konva/lib/filters/RGB.js
var RGB = function(imageData) {
  const data = imageData.data, nPixels = data.length, red = this.red(), green = this.green(), blue = this.blue();
  for (let i2 = 0; i2 < nPixels; i2 += 4) {
    const brightness2 = (0.34 * data[i2] + 0.5 * data[i2 + 1] + 0.16 * data[i2 + 2]) / 255;
    data[i2] = brightness2 * red;
    data[i2 + 1] = brightness2 * green;
    data[i2 + 2] = brightness2 * blue;
    data[i2 + 3] = data[i2 + 3];
  }
};
Factory.addGetterSetter(Node, "red", 0, RGBComponent, Factory.afterSetFilter);
Factory.addGetterSetter(Node, "green", 0, RGBComponent, Factory.afterSetFilter);
Factory.addGetterSetter(Node, "blue", 0, RGBComponent, Factory.afterSetFilter);

// node_modules/konva/lib/filters/RGBA.js
var RGBA = function(imageData) {
  const data = imageData.data, nPixels = data.length, red = this.red(), green = this.green(), blue = this.blue(), alpha = this.alpha();
  for (let i2 = 0; i2 < nPixels; i2 += 4) {
    const ia = 1 - alpha;
    data[i2] = red * alpha + data[i2] * ia;
    data[i2 + 1] = green * alpha + data[i2 + 1] * ia;
    data[i2 + 2] = blue * alpha + data[i2 + 2] * ia;
  }
};
Factory.addGetterSetter(Node, "alpha", 1, (val) => Math.min(1, Math.max(0, val)), Factory.afterSetFilter);

// node_modules/konva/lib/filters/Sepia.js
var Sepia = function(imageData) {
  const data = imageData.data, nPixels = data.length;
  for (let i2 = 0; i2 < nPixels; i2 += 4) {
    const r2 = data[i2 + 0];
    const g2 = data[i2 + 1];
    const b2 = data[i2 + 2];
    data[i2 + 0] = Math.min(255, r2 * 0.393 + g2 * 0.769 + b2 * 0.189);
    data[i2 + 1] = Math.min(255, r2 * 0.349 + g2 * 0.686 + b2 * 0.168);
    data[i2 + 2] = Math.min(255, r2 * 0.272 + g2 * 0.534 + b2 * 0.131);
  }
};

// node_modules/konva/lib/filters/Solarize.js
var Solarize = function(imageData) {
  const threshold = 128;
  const d2 = imageData.data;
  for (let i2 = 0; i2 < d2.length; i2 += 4) {
    const r2 = d2[i2], g2 = d2[i2 + 1], b2 = d2[i2 + 2];
    const L2 = 0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2;
    if (L2 >= threshold) {
      d2[i2] = 255 - r2;
      d2[i2 + 1] = 255 - g2;
      d2[i2 + 2] = 255 - b2;
    }
  }
  return imageData;
};

// node_modules/konva/lib/filters/Threshold.js
var Threshold = function(imageData) {
  const level = this.threshold() * 255, data = imageData.data, len = data.length;
  for (let i2 = 0; i2 < len; i2 += 1) {
    data[i2] = data[i2] < level ? 0 : 255;
  }
};
Factory.addGetterSetter(Node, "threshold", 0.5, getNumberValidator(), Factory.afterSetFilter);

// node_modules/konva/lib/_FullInternals.js
var Konva3 = Konva2.Util._assign(Konva2, {
  Arc,
  Arrow,
  Circle,
  Ellipse,
  Image: Image2,
  Label,
  Tag,
  Line,
  Path,
  Rect,
  RegularPolygon,
  Ring,
  Sprite,
  Star,
  Text,
  TextPath,
  Transformer,
  Wedge,
  /**
   * @namespace Filters
   * @memberof Konva
   */
  Filters: {
    Blur,
    Brightness,
    Brighten,
    Contrast,
    Emboss,
    Enhance,
    Grayscale,
    HSL,
    HSV,
    Invert,
    Kaleidoscope,
    Mask,
    Noise,
    Pixelate,
    Posterize,
    RGB,
    RGBA,
    Sepia,
    Solarize,
    Threshold
  }
});

// node_modules/konva/lib/index.js
var lib_default = Konva3;

// rendering-source/src/lib/notebook-tools.ts
var NOTEBOOK_FONTS = {
  serif: { label: "Serif", family: "Georgia, serif" },
  sans: { label: "Sans serif", family: "Arial, sans-serif" },
  handwritten: { label: "Handwritten", family: "cursive" },
  mono: { label: "Monospace", family: "monospace" },
  kalam: { label: "Kalam (handwriting)", family: "'Kalam', cursive" },
  dmsans: { label: "DM Sans", family: "'DM Sans', Arial, sans-serif" },
  geist: { label: "Geist", family: "'Geist', Arial, sans-serif" },
  poppins: { label: "Poppins", family: "'Poppins', Arial, sans-serif" },
  pixel: { label: "Pixel", family: "'Silkscreen', monospace" }
};
var validNotebookFont = (value) => typeof value === "string" && Object.hasOwn(NOTEBOOK_FONTS, value);
function notebookTextStyle(font) {
  return { fontFamily: font ? NOTEBOOK_FONTS[font].family : "Georgia, serif", fontStyle: font ? "normal" : "italic bold" };
}
function shapeTextBox(shape, w2, h2) {
  return shape === "triangle" ? { x: w2 * 0.27, y: h2 * 0.48, w: w2 * 0.46, h: h2 * 0.4 } : shape === "circle" ? { x: w2 * 0.16, y: h2 * 0.16, w: w2 * 0.68, h: h2 * 0.68 } : { x: 12, y: 12, w: Math.max(16, w2 - 24), h: Math.max(16, h2 - 24) };
}
function fittedShapeText(shape, w2, h2, text, font, size = 32) {
  const box = shapeTextBox(shape, w2, h2), family = notebookTextStyle(font ?? "sans").fontFamily;
  const ctx = typeof document !== "undefined" ? document.createElement("canvas").getContext("2d") : null;
  const lineCount = (s2) => {
    if (!ctx) return Math.max(1, Math.ceil(text.length * s2 * 0.6 / box.w));
    ctx.font = `${s2}px ${family}`;
    let lines2 = 0;
    for (const paragraph of text.split("\n")) {
      let line = "";
      lines2++;
      for (const word of paragraph.split(/\s+/)) {
        const next = line ? line + " " + word : word;
        if (ctx.measureText(next).width <= box.w) {
          line = next;
          continue;
        }
        if (line) {
          lines2++;
          line = "";
        }
        for (const ch of word) {
          if (line && ctx.measureText(line + ch).width > box.w) {
            lines2++;
            line = "";
          }
          line += ch;
        }
      }
    }
    return lines2;
  };
  const widestWord = (s2) => {
    if (!ctx) return Math.max(...text.split(/\s+/).map((w3) => w3.length * s2 * 0.6), 0);
    ctx.font = `${s2}px ${family}`;
    return Math.max(...text.split(/\s+/).map((w3) => ctx.measureText(w3).width), 0);
  };
  let actual = Math.max(8, size);
  while (actual > 8 && (lineCount(actual) * actual > box.h || widestWord(actual) > box.w)) actual--;
  const lines = lineCount(actual);
  return { ...box, fontSize: actual, lines, overflow: lines * actual > box.h || widestWord(actual) > box.w };
}

// rendering-source/src/lib/text-style.ts
var TEXT_FONTS = NOTEBOOK_FONTS;
var isTextFont = validNotebookFont;
function textFamily(font, fallback) {
  return font && isTextFont(font) ? TEXT_FONTS[font].family : fallback;
}
var NOTEBOOK_TITLE_SIZE = 42;
async function ensureTextFont(font) {
  if (!font || !isTextFont(font) || typeof document === "undefined" || !document.fonts) return;
  const family = TEXT_FONTS[font].family;
  try {
    await Promise.race([Promise.all([document.fonts.load(`400 24px ${family}`), document.fonts.load(`700 24px ${family}`)]), new Promise((r2) => setTimeout(r2, 3e3))]);
  } catch {
  }
}

// rendering-source/src/lib/frames.ts
var FRAME_SPECS = {
  "instax-mini": {
    label: "Instax Mini",
    card: { w: 4.47, h: 7.12 },
    photo: { x: 0.33, y: 0.41, w: 3.81, h: 5.13 },
    thumbW: 2.43
  },
  polaroid: {
    label: "Polaroid",
    card: { w: 4.48, h: 4.43 },
    photo: { x: 0.2, y: 0.19, w: 4.08, h: 3.37 },
    thumbW: 2.84
  }
};
var FRAME_FORMATS = Object.keys(FRAME_SPECS);
var STRIP_GAP = 0.15;
var STRIP_CAPTION = 0.8;
var STRIP_SIDE = 0.15;
var STRIP_TOP = 0.13;
var STRIP_WIN_RATIO = 2.78;
function stripLayout(format, count) {
  const spec = FRAME_SPECS[format];
  const w2 = spec.card.w - STRIP_SIDE * 2;
  const win = { x: STRIP_SIDE, y: STRIP_TOP, w: w2, h: w2 / STRIP_WIN_RATIO };
  const cardH = win.y + count * win.h + (count - 1) * STRIP_GAP + STRIP_CAPTION;
  return { cardH, win, gap: STRIP_GAP, captionH: STRIP_CAPTION };
}
var clamp = (value, min, max) => Math.min(max, Math.max(min, value));
var clamp01 = (value) => clamp(value, 0, 1);
var MIN_ZOOM = 1;
var MAX_ZOOM = 4;
var MIN_CAPTION_SIZE = 12;
var MAX_CAPTION_SIZE = 40;
var DEFAULT_CAPTION_SIZE = 24;
var CAPTION_REFERENCE_WIDTH = 340;
var clampZoom = (zoom) => clamp(Number.isFinite(zoom) ? zoom : 1, MIN_ZOOM, MAX_ZOOM);
var clampCaptionSize = (size) => clamp(Number.isFinite(size) ? Math.round(size) : DEFAULT_CAPTION_SIZE, MIN_CAPTION_SIZE, MAX_CAPTION_SIZE);
var captionFontPx = (captionSize, cardWidth) => clampCaptionSize(captionSize) * cardWidth / CAPTION_REFERENCE_WIDTH;
function coverRect(image2, window2, zoom, pan) {
  if (image2.width <= 0 || image2.height <= 0 || window2.width <= 0 || window2.height <= 0) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }
  const scale = Math.max(window2.width / image2.width, window2.height / image2.height) * clampZoom(zoom);
  const width = image2.width * scale;
  const height = image2.height * scale;
  return {
    x: -(width - window2.width) * clamp01(pan.x),
    y: -(height - window2.height) * clamp01(pan.y),
    width,
    height
  };
}
function panFromPosition(position, window2, drawn) {
  const overflowX = drawn.width - window2.width;
  const overflowY = drawn.height - window2.height;
  return {
    x: overflowX > 0 ? clamp01(-position.x / overflowX) : 0.5,
    y: overflowY > 0 ? clamp01(-position.y / overflowY) : 0.5
  };
}

// rendering-source/src/lib/export.ts
var INK = "#171717";
var CAPTION_FONT = "Helvetica, Arial, sans-serif";
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image2 = new Image();
    const timer = setTimeout(() => {
      image2.onload = image2.onerror = null;
      reject(new Error("Image not readable. Try again."));
    }, 2e4);
    image2.onload = () => {
      clearTimeout(timer);
      resolve(image2);
    };
    image2.onerror = () => {
      clearTimeout(timer);
      reject(new Error("Image not readable"));
    };
    image2.src = src;
  });
}
async function drawFrame(layer, frame, x2, y, cardWidth) {
  await ensureTextFont(frame.captionFont);
  const spec = FRAME_SPECS[frame.format];
  const unit = cardWidth / spec.card.w;
  const card = new lib_default.Group({ x: x2, y });
  card.add(
    new lib_default.Rect({
      width: spec.card.w * unit,
      height: spec.card.h * unit,
      fillLinearGradientStartPoint: { x: 0, y: 0 },
      fillLinearGradientEndPoint: { x: spec.card.w * unit, y: spec.card.h * unit },
      fillLinearGradientColorStops: [0, "#ffffff", 1, "#f6f6f4"],
      stroke: "#d4d7dc",
      strokeWidth: Math.max(2, unit * 0.06),
      cornerRadius: unit * 0.15
    })
  );
  const strip = frame.stripPhotos && frame.stripPhotos.length >= 2 ? frame.stripPhotos : null;
  if (strip) {
    const layout = stripLayout(frame.format, strip.length);
    const cardHU = layout.cardH;
    card.getChildren()[0].height(cardHU * unit);
    for (let i2 = 0; i2 < strip.length; i2++) {
      const wx = layout.win.x * unit;
      const wy = (layout.win.y + i2 * (layout.win.h + layout.gap)) * unit;
      const ww = layout.win.w * unit;
      const wh = layout.win.h * unit;
      const group = new lib_default.Group({ x: wx, y: wy, clipFunc: (ctx) => {
        ctx.beginPath();
        ctx.roundRect(0, 0, ww, wh, unit * 0.08);
        ctx.closePath();
      } });
      const item = strip[i2];
      const image2 = await loadImage(item.photo.src);
      const rect = coverRect({ width: image2.naturalWidth, height: image2.naturalHeight }, { width: ww, height: wh }, item.zoom, item.pan);
      group.add(new lib_default.Image({ image: image2, x: rect.x, y: rect.y, width: rect.width, height: rect.height }));
      card.add(group);
    }
    if (frame.caption.trim()) {
      const top = (cardHU - layout.captionH) * unit;
      card.add(new lib_default.Text({ x: layout.win.x * unit, y: top, width: layout.win.w * unit, height: layout.captionH * unit, text: frame.caption, align: "center", verticalAlign: "middle", wrap: "none", ellipsis: true, fontFamily: textFamily(frame.captionFont, CAPTION_FONT), fontStyle: "bold", fontSize: captionFontPx(frame.captionSize, cardWidth), fill: INK }));
    }
    const sw = spec.card.w * unit, sh = cardHU * unit;
    card.add(new lib_default.Shape({ listening: false, sceneFunc(context) {
      const ctx = context._context;
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(0, 0, sw, sh, unit * 0.15);
      ctx.clip();
      const radius = Math.hypot(0.7 * sw, 0.8 * sh);
      const radial = ctx.createRadialGradient(0.3 * sw, 0.2 * sh, 0, 0.3 * sw, 0.2 * sh, radius);
      radial.addColorStop(0, "#ffffff57");
      radial.addColorStop(0.36, "#ffffff00");
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, sw, sh);
      const vertical = ctx.createLinearGradient(0, 0, 0, sh);
      vertical.addColorStop(0, "#ffffff2e");
      vertical.addColorStop(0.35, "#ffffff00");
      vertical.addColorStop(1, "#0000000d");
      ctx.fillStyle = vertical;
      ctx.fillRect(0, 0, sw, sh);
      ctx.restore();
    } }));
    layer.add(card);
    return card;
  }
  const win = { x: spec.photo.x * unit, y: spec.photo.y * unit, w: spec.photo.w * unit, h: spec.photo.h * unit };
  const photoGroup = new lib_default.Group({
    x: win.x,
    y: win.y,
    clipFunc: (ctx) => {
      ctx.beginPath();
      ctx.roundRect(0, 0, win.w, win.h, unit * 0.08);
      ctx.closePath();
    }
  });
  if (frame.photo) {
    const image2 = await loadImage(frame.photo.src);
    const rect = coverRect(
      { width: image2.naturalWidth, height: image2.naturalHeight },
      { width: win.w, height: win.h },
      frame.zoom,
      frame.pan
    );
    photoGroup.add(new lib_default.Image({ image: image2, x: rect.x, y: rect.y, width: rect.width, height: rect.height }));
  } else {
    photoGroup.add(new lib_default.Rect({ width: win.w, height: win.h, fill: "#E2E5EA" }));
  }
  card.add(photoGroup);
  if (frame.caption.trim()) {
    const top = win.y + win.h;
    card.add(
      new lib_default.Text({
        x: win.x,
        y: top,
        width: win.w,
        height: spec.card.h * unit - top,
        text: frame.caption,
        align: "center",
        verticalAlign: "middle",
        wrap: "none",
        ellipsis: true,
        fontFamily: textFamily(frame.captionFont, CAPTION_FONT),
        fontStyle: "bold",
        fontSize: captionFontPx(frame.captionSize, cardWidth),
        fill: INK
      })
    );
  }
  const w2 = spec.card.w * unit, h2 = spec.card.h * unit;
  card.add(new lib_default.Shape({ listening: false, sceneFunc(context) {
    const ctx = context._context;
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(0, 0, w2, h2, unit * 0.15);
    ctx.clip();
    const radius = Math.hypot(0.7 * w2, 0.8 * h2);
    const radial = ctx.createRadialGradient(0.3 * w2, 0.2 * h2, 0, 0.3 * w2, 0.2 * h2, radius);
    radial.addColorStop(0, "#ffffff57");
    radial.addColorStop(0.36, "#ffffff00");
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, w2, h2);
    const dx = Math.sin(115 * Math.PI / 180), dy = -Math.cos(115 * Math.PI / 180);
    const length = Math.abs(w2 * dx) + Math.abs(h2 * dy);
    const sheen = ctx.createLinearGradient(w2 / 2 - dx * length / 2, h2 / 2 - dy * length / 2, w2 / 2 + dx * length / 2, h2 / 2 + dy * length / 2);
    for (const [stop, color] of [[0, "#ffffff00"], [0.28, "#ffffff00"], [0.4, "#ffffff42"], [0.47, "#ffffff0d"], [0.56, "#ffffff00"], [1, "#ffffff00"]]) sheen.addColorStop(stop, color);
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, w2, h2);
    const vertical = ctx.createLinearGradient(0, 0, 0, h2);
    vertical.addColorStop(0, "#ffffff2e");
    vertical.addColorStop(0.35, "#ffffff00");
    vertical.addColorStop(1, "#0000000d");
    ctx.fillStyle = vertical;
    ctx.fillRect(0, 0, w2, h2);
    ctx.restore();
  } }));
  layer.add(card);
  return card;
}
async function renderFramePng(frame, width = 1200) {
  const spec = FRAME_SPECS[frame.format];
  const cardHU = frame.stripPhotos && frame.stripPhotos.length >= 2 ? stripLayout(frame.format, frame.stripPhotos.length).cardH : spec.card.h;
  const stage = new lib_default.Stage({
    container: document.createElement("div"),
    width,
    height: Math.round(width * cardHU / spec.card.w)
  });
  const layer = new lib_default.Layer();
  stage.add(layer);
  try {
    await drawFrame(layer, frame, 0, 0, width);
    layer.draw();
    const url = stage.toDataURL({ mimeType: "image/png" });
    return url;
  } finally {
    stage.destroy();
  }
}

// rendering-source/src/lib/audio-signal.ts
function hasAudioSignal(channels) {
  return channels.some((channel) => {
    for (let i2 = 0; i2 < channel.length; i2++) if (Number.isFinite(channel[i2]) && Math.abs(channel[i2]) > 1e-7) return true;
    return false;
  });
}
async function recordingHasSignal(blob) {
  const context = new AudioContext();
  try {
    const decoded2 = await context.decodeAudioData(await blob.arrayBuffer());
    return hasAudioSignal(Array.from({ length: decoded2.numberOfChannels }, (_, i2) => decoded2.getChannelData(i2)));
  } finally {
    await context.close();
  }
}

// rendering-source/src/lib/photo-filters.ts
var canvas;
var engine;
async function renderer() {
  engine ??= Promise.resolve().then(() => (init_glfx(), glfx_exports)).then((m) => m.default);
  const fx2 = await engine;
  canvas ??= fx2.canvas();
  if (canvas._.gl.isContextLost()) {
    canvas = void 0;
    throw new Error("WebGL unavailable");
  }
  return canvas;
}
async function renderFilterPhoto(photo, id2, maxSize = 4096) {
  const originalSrc = photo.originalSrc ?? photo.src;
  if (id2 === "original") {
    const img2 = await image(originalSrc);
    return { src: originalSrc, width: img2.naturalWidth, height: img2.naturalHeight, filter: id2 };
  }
  const img = await image(originalSrc);
  let out;
  try {
    out = await renderer();
  } catch {
    return softwareFilter(photo, id2, maxSize, img);
  }
  const limit = Math.min(maxSize, out._.gl.getParameter(out._.gl.MAX_TEXTURE_SIZE));
  const ratio = Math.min(1, limit / Math.max(img.naturalWidth, img.naturalHeight));
  const w2 = Math.max(1, Math.round(img.naturalWidth * ratio)), h2 = Math.max(1, Math.round(img.naturalHeight * ratio));
  const source = document.createElement("canvas");
  source.width = w2;
  source.height = h2;
  const ctx = source.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.drawImage(img, 0, 0, w2, h2);
  let texture;
  try {
    texture = out.texture(source);
    out.draw(texture);
    switch (id2) {
      case "mono":
        out.hueSaturation(0, -1).brightnessContrast(0, 0.12);
        break;
      case "sepia":
        out.sepia(0.85);
        break;
      case "vintage":
        out.sepia(0.35).hueSaturation(0, -0.25).brightnessContrast(0.03, -0.12);
        break;
      case "warm":
        out.sepia(0.2).hueSaturation(-0.025, 0.12).brightnessContrast(0.02, 0.05);
        break;
      case "cool":
        out.curves([[0, 0], [0.5, 0.46], [1, 0.95]], [[0, 0.02], [0.5, 0.52], [1, 1]], [[0, 0.05], [0.5, 0.57], [1, 1]]).brightnessContrast(0, 0.05);
        break;
      case "fade":
        out.hueSaturation(0, -0.25).brightnessContrast(0.07, -0.22);
        break;
      case "contrast":
        out.brightnessContrast(0, 0.28).hueSaturation(0, 0.12);
        break;
    }
    out.update();
    return { src: out.toDataURL("image/png"), originalSrc, width: w2, height: h2, filter: id2 };
  } catch {
    canvas = void 0;
    return softwareFilter(photo, id2, maxSize, img);
  } finally {
    texture?.destroy();
    source.width = 0;
    source.height = 0;
  }
}
var decoded = /* @__PURE__ */ new Map();
function image(src) {
  const hit = decoded.get(src);
  if (hit) return hit;
  const pending = new Promise((resolve, reject) => {
    const img = new Image();
    const fail = () => {
      window.clearTimeout(timer);
      img.onload = img.onerror = null;
      decoded.delete(src);
      reject(new Error("Image unavailable"));
    };
    const timer = window.setTimeout(fail, 2e4);
    img.onload = () => {
      window.clearTimeout(timer);
      img.onload = img.onerror = null;
      resolve(img);
    };
    img.onerror = fail;
    img.src = src;
  });
  decoded.set(src, pending);
  while (decoded.size > 3) decoded.delete(decoded.keys().next().value);
  return pending;
}
var results = /* @__PURE__ */ new Map();
var inFlight = /* @__PURE__ */ new Map();
var cachedBytes = 0;
var CACHE_BYTES = 24 * 1024 * 1024;
function filterPhoto(photo, id2, maxSize = 4096) {
  const key = `${photo.originalSrc ?? photo.src}:${id2}:${maxSize}`;
  const hit = results.get(key);
  if (hit) {
    results.delete(key);
    results.set(key, hit);
    return Promise.resolve(hit);
  }
  const active = inFlight.get(key);
  if (active) return active;
  const pending = renderFilterPhoto(photo, id2, maxSize).then((result) => {
    const cost = key.length * 2 + (result.src.startsWith("data:") ? result.src.length * 2 : 0);
    if (cost <= CACHE_BYTES) {
      while (results.size >= 24 || cachedBytes + cost > CACHE_BYTES) {
        const first = results.keys().next().value;
        const old = results.get(first);
        cachedBytes -= first.length * 2 + (old.src.startsWith("data:") ? old.src.length * 2 : 0);
        results.delete(first);
      }
      results.set(key, result);
      cachedBytes += cost;
    }
    return result;
  }).finally(() => inFlight.delete(key));
  inFlight.set(key, pending);
  return pending;
}
var clamp2 = (n2) => Math.max(0, Math.min(1, n2));
function brightness(rgb, bright, contrast) {
  return rgb.map((n2) => clamp2(contrast > 0 ? (n2 + bright - 0.5) / (1 - contrast) + 0.5 : (n2 + bright - 0.5) * (1 + contrast) + 0.5));
}
function saturation(rgb, hue, sat) {
  const c2 = Math.cos(hue * Math.PI), s2 = Math.sin(hue * Math.PI);
  const w2 = [(2 * c2 + 1) / 3, (-Math.sqrt(3) * s2 - c2 + 1) / 3, (Math.sqrt(3) * s2 - c2 + 1) / 3];
  const [r2, g2, b2] = rgb;
  const rotated = [r2 * w2[0] + g2 * w2[1] + b2 * w2[2], r2 * w2[2] + g2 * w2[0] + b2 * w2[1], r2 * w2[1] + g2 * w2[2] + b2 * w2[0]];
  const avg = rotated.reduce((a3, b3) => a3 + b3, 0) / 3;
  const amount = sat > 0 ? 1 - 1 / (1.001 - sat) : -sat;
  return rotated.map((n2) => clamp2(n2 + (avg - n2) * amount));
}
function sepia(rgb, a3) {
  const [r2, g2, b2] = rgb;
  return [clamp2(r2 * (1 - 0.607 * a3) + g2 * 0.769 * a3 + b2 * 0.189 * a3), clamp2(r2 * 0.349 * a3 + g2 * (1 - 0.314 * a3) + b2 * 0.168 * a3), clamp2(r2 * 0.272 * a3 + g2 * 0.534 * a3 + b2 * (1 - 0.869 * a3))];
}
function curve(value, points) {
  const y2 = 6 * (points[2] - 2 * points[1] + points[0]);
  const low = value <= 0.5 ? 0 : 1, high = low + 1;
  const a3 = (high * 0.5 - value) / 0.5, b2 = 1 - a3;
  const secondLow = low === 1 ? y2 : 0, secondHigh = high === 1 ? y2 : 0;
  return clamp2(a3 * points[low] + b2 * points[high] + ((a3 * a3 * a3 - a3) * secondLow + (b2 * b2 * b2 - b2) * secondHigh) * 0.25 / 6);
}
function filterRgb(rgb, id2) {
  switch (id2) {
    case "mono":
      return brightness(saturation(rgb, 0, -1), 0, 0.12);
    case "sepia":
      return sepia(rgb, 0.85);
    case "vintage":
      return brightness(saturation(sepia(rgb, 0.35), 0, -0.25), 0.03, -0.12);
    case "warm":
      return brightness(saturation(sepia(rgb, 0.2), -0.025, 0.12), 0.02, 0.05);
    case "cool":
      return brightness([curve(rgb[0], [0, 0.46, 0.95]), curve(rgb[1], [0.02, 0.52, 1]), curve(rgb[2], [0.05, 0.57, 1])], 0, 0.05);
    case "fade":
      return brightness(saturation(rgb, 0, -0.25), 0.07, -0.22);
    case "contrast":
      return saturation(brightness(rgb, 0, 0.28), 0, 0.12);
    default:
      return rgb;
  }
}
async function softwareFilter(photo, id2, maxSize, img) {
  const ratio = Math.min(1, maxSize / Math.max(img.naturalWidth, img.naturalHeight));
  const w2 = Math.max(1, Math.round(img.naturalWidth * ratio)), h2 = Math.max(1, Math.round(img.naturalHeight * ratio));
  const output = document.createElement("canvas");
  output.width = w2;
  output.height = h2;
  try {
    const ctx = output.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");
    ctx.drawImage(img, 0, 0, w2, h2);
    const pixels = ctx.getImageData(0, 0, w2, h2);
    for (let y = 0; y < h2; y++) {
      for (let x2 = 0; x2 < w2; x2++) {
        const i2 = (y * w2 + x2) * 4, rgb = filterRgb([pixels.data[i2] / 255, pixels.data[i2 + 1] / 255, pixels.data[i2 + 2] / 255], id2);
        pixels.data[i2] = Math.round(rgb[0] * 255);
        pixels.data[i2 + 1] = Math.round(rgb[1] * 255);
        pixels.data[i2 + 2] = Math.round(rgb[2] * 255);
      }
      if (y % 64 === 63) await new Promise((resolve) => setTimeout(resolve, 0));
    }
    ctx.putImageData(pixels, 0, 0);
    return { src: output.toDataURL("image/png"), originalSrc: photo.originalSrc ?? photo.src, width: w2, height: h2, filter: id2 };
  } finally {
    output.width = 0;
    output.height = 0;
  }
}

// french-dictionary.mjs
var FR = {
  "Wide": "Large",
  "Add a YouTube link": "Ajoutez un lien YouTube",
  "Thumbnail unavailable": "Miniature indisponible",
  "Settings": "Param\xE8tres",
  "Send to notebook": "Envoyer au carnet",
  "Confirm your email": "Confirme ton e-mail",
  "Could not load these saved elements. Nothing was added.": "Impossible de charger ces \xE9l\xE9ments. Aucun \xE9l\xE9ment ajout\xE9.",
  "Start free. Upgrade when you\u2019re ready to send it.": "Commencez gratuitement. Passez \xE0 la suite quand vous \xEAtes pr\xEAt \xE0 l\u2019envoyer.",
  "Start free. Upgrade when you're ready to send it.": "Commencez gratuitement. Passez \xE0 la suite quand vous \xEAtes pr\xEAt \xE0 l\u2019envoyer.",
  "Free": "Gratuit",
  "One-time payment, lifetime access": "Paiement unique, \xE0 vie",
  "All of InstaFrame, paid once.": "Tout InstaFrame, pay\xE9 une seule fois.",
  "To get started, no account needed.": "Pour commencer, sans compte.",
  "Forever": "Pour toujours",
  "The free generator elements": "Les \xE9l\xE9ments gratuits du g\xE9n\xE9rateur",
  "Premium generator elements marked PRO (including Letter, Messages, Date, Combination)": "Les \xE9l\xE9ments premium du g\xE9n\xE9rateur, marqu\xE9s PRO (dont Lettre, Messages, Date, Combinaison)",
  "The notebook editor (Album Studio)": "L\u2019\xE9diteur de carnet (Album Studio)",
  "Lifetime access, no subscription": "Acc\xE8s \xE0 vie, sans abonnement",
  "Prices in EUR. The delivered physical notebook is not included.": "Prix en euros. Le carnet physique livr\xE9 n\u2019est pas inclus.",
  "Free or Premium. One payment, lifetime access.": "Gratuit ou Premium. Un paiement, un acc\xE8s \xE0 vie.",
  "The free generator elements stay free. Album Studio is included in Premium.": "Les \xE9l\xE9ments gratuits du g\xE9n\xE9rateur restent gratuits. Album Studio est inclus dans Premium.",
  "Stamp": "Timbre",
  "Sticker": "Sticker",
  "Write a sweet note\u2026": "\xC9cris ton mot doux\u2026",
  "Font": "Police",
  "Paper": "Papier",
  "Colour": "Couleur",
  "Date line (optional)": "Ligne de date (facultatif)",
  "Create": "Cr\xE9er",
  "Compose": "Composer",
  "Share": "Partager",
  "Order": "Commander",
  "Filters are available in Single layout.": "Les filtres sont disponibles en mise en page Simple.",
  "Post-it, letter, conversation or date.": "Post-it, lettre, conversation ou date.",
  "Your gallery is empty": "Ta galerie est vide",
  "Create an element on the left, then add it to your gallery.": "Cr\xE9e un \xE9l\xE9ment dans les r\xE9glages, puis clique sur \xAB Ajouter \xE0 la galerie \xBB.",
  "Compose my notebook \u2192": "Composer mon carnet \u2192",
  "Create your elements": "Cr\xE9er tes \xE9l\xE9ments",
  "Basic workspace": "Espace Basic",
  "Premium workspace": "Espace Premium",
  "Saved": "Enregistr\xE9s",
  "Write a note for your notebook.": "Post-it pour ton carnet.",
  "More message formats \xB7 Premium": "Autres messages \xB7 Premium",
  "Click the note preview to edit its text.": "Clique sur la note dans l\u2019aper\xE7u pour modifier son texte.",
  "Text size": "Taille du texte",
  "Compose my notebook": "Composer mon carnet",
  "Note preview": "Aper\xE7u de la note",
  "Edit note text": "Modifier le texte de la note",
  "Layout": "Mise en page",
  "Filter": "Filtre",
  "Import a photo and choose its frame.": "Importe une photo et choisis son cadre.",
  "Drop a photo here or click": "D\xE9pose une photo ici ou clique",
  "Computer or phone": "Ordinateur ou t\xE9l\xE9phone",
  "imported photos": "photos import\xE9es",
  "Photo strips \xB7 Premium": "Bandes photo \xB7 Premium",
  "Available after import": "Disponible apr\xE8s import",
  "Caption text": "Texte de la l\xE9gende",
  "Caption size": "Taille de la l\xE9gende",
  "Ex. Summer 2026": "Ex. \xC9t\xE9 2026",
  "Drag to reposition": "Glisser pour recadrer",
  "Drop a photo on the preview, or import one from your computer or phone.": "D\xE9pose une photo sur l\u2019aper\xE7u ou importe-la depuis ton ordinateur ou t\xE9l\xE9phone.",
  "Photo Gallery": "Galerie Photo",
  "Enlarge preview": "Agrandir l\u2019aper\xE7u",
  "Close enlarged preview": "Fermer l\u2019aper\xE7u agrandi",
  "Tap the text on the page to write directly.": "Touchez le texte sur la page pour \xE9crire directement.",
  "Text and shapes": "Texte et formes",
  "Close text and shapes": "Fermer texte et formes",
  "+ Text": "+ Texte",
  "\u25AD Rectangle": "\u25AD Rectangle",
  "\u25CB Circle": "\u25CB Cercle",
  "\u25B3 Triangle": "\u25B3 Triangle",
  "Text content": "Contenu du texte",
  "Font family": "Police",
  "Font size": "Taille du texte",
  "Original style": "Style original",
  "Serif": "Avec empattements",
  "Sans serif": "Sans empattements",
  "Handwritten": "Manuscrite",
  "Monospace": "Chasse fixe",
  "Shape width": "Largeur de la forme",
  "Shape height": "Hauteur de la forme",
  "Select text or a shape to change its settings.": "S\xE9lectionnez un texte ou une forme pour modifier ses r\xE9glages.",
  "Move objects on the page. Drag a corner to resize.": "D\xE9placez les objets sur la page. Tirez un coin pour changer la taille.",
  "Local saving failed. Keep this tab open: changes may be lost if you reload, close it or sign in.": "La sauvegarde locale a \xE9chou\xE9. Gardez cet onglet ouvert : vos modifications peuvent \xEAtre perdues si vous rechargez, fermez ou vous connectez.",
  "Partial local save: the browser's local storage is full, so the original photos could not be kept on this device. The cropped version is kept; re-add the original photo to crop it again.": "Sauvegarde locale partielle : l\u2019espace de stockage local du navigateur est insuffisant, les photos d\u2019origine n\u2019ont pas pu \xEAtre conserv\xE9es sur cet appareil. La version recadr\xE9e est conserv\xE9e ; r\xE9ajoute la photo d\u2019origine pour la recadrer \xE0 nouveau.",
  "Retry local save": "R\xE9essayer la sauvegarde locale",
  "Local saving failed. Sign in anyway? Unsaved work may be lost.": "La sauvegarde locale a \xE9chou\xE9. Se connecter quand m\xEAme ? Le travail non sauvegard\xE9 peut \xEAtre perdu.",
  "Retrying\u2026": "Nouvel essai\u2026",
  "Ready to save": "Pr\xEAt \xE0 enregistrer",
  "Your files are ready": "Vos fichiers sont pr\xEAts",
  "Tap Save, or press and hold an image and choose Save to Photos.": "Touchez Enregistrer, ou appuyez longuement sur une image et choisissez Enregistrer dans Photos.",
  "Caption limit:": "Limite de la l\xE9gende :",
  "Long captions may be shortened in the preview and exported image.": "Les longues l\xE9gendes peuvent \xEAtre raccourcies dans l'aper\xE7u et l'image export\xE9e.",
  "Choose a layout": "Choisissez une mise en page",
  "Three random arrangements of your elements (4 per page). Pick one, or shuffle for three more.": `Trois dispositions al\xE9atoires de vos \xE9l\xE9ments (4 par page). Choisissez-en une, ou relancez le tirage.`,
  "Layout 1": "Mise en page 1",
  "Layout 2": "Mise en page 2",
  "Layout 3": "Mise en page 3",
  "Shuffle": "Relancer",
  "Use layout 1": "Utiliser la mise en page 1",
  "Use layout 2": "Utiliser la mise en page 2",
  "Use layout 3": "Utiliser la mise en page 3",
  "Choose one photo for this stamp.": "Choisissez une seule photo pour ce timbre.",
  "Stamp photo filter": "Filtre photo du timbre",
  "Original": "Original",
  "Vintage sepia": "S\xE9pia vintage",
  "Black and white": "Noir et blanc",
  "Green engraving": "Gravure verte",
  "Blue engraving": "Gravure bleue",
  "Rose engraving": "Gravure rose",
  "Aged paper": "Papier vieilli",
  "Engraving-style effects use tones and hatching. Your original image stays unchanged.": "Effets de gravure par teintes et hachures. Votre image originale reste intacte.",
  "Could not apply this filter. Your photo has not changed. Try again or choose another photo.": "Impossible d\u2019appliquer ce filtre. Votre photo n\u2019a pas chang\xE9. R\xE9essayez ou choisissez une autre photo.",
  "Your story together, made of memories, bound in a": "Votre histoire \xE0 deux, faite de souvenirs, reli\xE9e dans un",
  "Create elements for your notebook, from Instax and Polaroid-style photos to stickers, drawings and handwritten words. Arrange them in a vintage album, then order it as a printed notebook - the birthday gift your favorite person will actually keep.": "Cr\xE9ez des \xE9l\xE9ments pour votre notebook : photos au style Instax et Polaroid, stickers, dessins et mots \xE9crits \xE0 la main. Disposez-les dans un album vintage, puis commandez-le en carnet imprim\xE9 : le cadeau d'anniversaire que votre personne pr\xE9f\xE9r\xE9e gardera vraiment.",
  "Create elements": "Cr\xE9er des \xE9l\xE9ments",
  "Generate elements": "G\xE9n\xE9rer des \xE9l\xE9ments",
  "Start with the photos that mean something - your trips, your Sundays, your inside jokes - and turn them into elements for your notebook.": "Commencez par les photos qui comptent (vos voyages, vos dimanches, vos private jokes) et transformez-les en \xE9l\xE9ments pour votre notebook.",
  "Elements for a notebook that feels like you": "Des \xE9l\xE9ments pour un notebook qui vous ressemble",
  "Some memories deserve better than a camera roll. Create your photo elements, then add stickers, drawings and words in the editor to make the notebook your own.": "Certains souvenirs m\xE9ritent mieux qu'une pellicule de t\xE9l\xE9phone. Cr\xE9ez vos \xE9l\xE9ments photo, puis ajoutez stickers, dessins et mots dans l'\xE9diteur pour personnaliser votre notebook.",
  "Download one element or the whole gallery as a ZIP": "T\xE9l\xE9chargez un \xE9l\xE9ment ou toute la galerie en ZIP",
  "This is where it becomes personal. Arrange your elements on black pages, write the words you would never text, draw with the stylus - then export it all as a PDF.": "C'est ici que \xE7a devient personnel. Disposez vos \xE9l\xE9ments sur des pages noires, \xE9crivez les mots que vous n'enverriez jamais par message, dessinez au stylet, puis exportez le tout en PDF.",
  "Resizable, rotatable elements on black notebook pages": "\xC9l\xE9ments redimensionnables et orientables sur des pages de carnet noires",
  "No. Every tool works without one. Sign in only if you want to save your elements between visits.": "Non. Tous les outils fonctionnent sans. Connectez-vous seulement pour garder vos \xE9l\xE9ments d'une visite \xE0 l'autre.",
  "Arrange and export your elements.": "Disposez et exportez vos \xE9l\xE9ments.",
  "Your generated elements are saved here.": "Vos \xE9l\xE9ments g\xE9n\xE9r\xE9s sont enregistr\xE9s ici.",
  "Elements": "\xC9l\xE9ments",
  "Add elements to your gallery in Generate Elements.": "Ajoutez des \xE9l\xE9ments \xE0 votre galerie dans G\xE9n\xE9rer des \xE9l\xE9ments.",
  "Generate a variety of elements to add to your notebook in the editor.": `G\xE9n\xE9rez une diversit\xE9 d'\xE9l\xE9ments \xE0 ajouter \xE0 votre notebook dans l'\xE9diteur.`,
  "Generate Elements": `G\xE9n\xE9rer des \xE9l\xE9ments`,
  "Move notebook": `D\xE9placer le notebook`,
  "Upload": `Importer`,
  "Upload photos": `Importer des photos`,
  "Where are your photos?": `O\xF9 sont vos photos ?`,
  "Computer": `Ordinateur`,
  "Phone (QR code)": `T\xE9l\xE9phone (QR code)`,
  Generator: `G\xE9n\xE9rateur`,
  "Album Studio": `Studio Album`,
  Shop: `Boutique`,
  "Open the app": `Ouvrir l'appli`,
  "Your story together, framed like film, bound in a": `Votre histoire \xE0 deux, encadr\xE9e comme une pellicule, reli\xE9e dans un`,
  "real notebook": `vrai carnet`,
  "InstaFrame turns your photos into authentic Instax and Polaroid prints. Fill a vintage album with stickers, drawings and handwritten words, then order it as a printed notebook - the birthday gift your favorite person will actually keep.": `InstaFrame transforme vos photos en vrais tirages Instax et Polaroid. Remplissez un album vintage de stickers, de dessins et de mots \xE9crits \xE0 la main, puis commandez-le en carnet imprim\xE9 : le cadeau d'anniversaire que votre personne pr\xE9f\xE9r\xE9e gardera vraiment.`,
  "Create a frame": `Cr\xE9er un cadre`,
  "Open Album Studio": `Ouvrir Studio Album`,
  "Free to use \xB7 No account needed \xB7 Made for desktop and iPad": `Gratuit \xB7 Sans compte \xB7 Con\xE7u pour ordinateur et iPad`,
  "Three steps to": `Trois \xE9tapes pour`,
  "their favorite gift": `son cadeau pr\xE9f\xE9r\xE9`,
  "Generate frames": `G\xE9n\xE9rer des cadres`,
  "Pick the photos that mean something - your trips, your Sundays, your inside jokes - and frame them as Instax Mini or Polaroid prints.": `Choisissez les photos qui comptent (vos voyages, vos dimanches, vos private jokes) et encadrez-les en tirages Instax Mini ou Polaroid.`,
  "Fill your album": `Remplissez votre album`,
  "Write the caption only you two understand. Draw, sticker and doodle on black pages, like a notebook passed in class.": `\xC9crivez la l\xE9gende que vous seuls comprenez. Dessinez, collez des stickers et gribouillez sur des pages noires, comme un carnet qu'on se passe en classe.`,
  "Order the print": `Commandez l'impression`,
  "Choose a pack and get the real notebook delivered. Wrap it, give it, watch their face.": `Choisissez un pack et recevez le vrai carnet. Emballez-le, offrez-le, regardez sa t\xEAte.`,
  "InstantFrame Generator": `G\xE9n\xE9rateur InstantFrame`,
  "Authentic film prints, without the film": `De vrais tirages argentiques, sans la pellicule`,
  "Some photos deserve better than a camera roll. Import them, frame them like real instant prints, and every one lands in your gallery, ready for the album.": `Certaines photos m\xE9ritent mieux qu'une pellicule de t\xE9l\xE9phone. Importez-les, encadrez-les comme de vrais tirages instantan\xE9s, et chacune arrive dans votre galerie, pr\xEAte pour l'album.`,
  "Instax Mini (54 x 86 mm) and Polaroid formats": `Formats Instax Mini (54 x 86 mm) et Polaroid`,
  "Crop, zoom and drag until the photo sits right": `Recadrez, zoomez et d\xE9placez jusqu'\xE0 ce que la photo soit bien plac\xE9e`,
  "Captions in a handwritten style": `L\xE9gendes en \xE9criture manuscrite`,
  "Download one frame or the whole gallery as a ZIP": `T\xE9l\xE9chargez un cadre ou toute la galerie en ZIP`,
  "Try the generator": `Essayer le g\xE9n\xE9rateur`,
  "A notebook you can write on": `Un carnet sur lequel \xE9crire`,
  "This is where it becomes personal. Arrange your frames on black pages, write the words you would never text, draw with the stylus - then export it all as a PDF.": `C'est ici que \xE7a devient personnel. Disposez vos cadres sur des pages noires, \xE9crivez les mots que vous n'enverriez jamais par message, dessinez au stylet, puis exportez le tout en PDF.`,
  "Resizable, rotatable frames on black notebook pages": `Cadres redimensionnables et orientables sur des pages de carnet noires`,
  "Kawaii stickers and handwritten-style text": `Stickers kawaii et texte manuscrit`,
  "Pen, marker and highlighter, with Apple Pencil pressure": `Stylo, feutre et surligneur, avec la pression de l\u2019Apple Pencil`,
  "Editable cover and PDF export": `Couverture modifiable et export PDF`,
  "The shop": `La boutique`,
  "A gift they can": `Un cadeau \xE0`,
  hold: `tenir en main`,
  "Finished your album? Turn it into their birthday gift. Pick a print pack, or shop frames, crayons and stickers individually.": `Votre album est fini ? Faites-en son cadeau d'anniversaire. Choisissez un pack d'impression, ou achetez cadres, crayons et stickers \xE0 l'unit\xE9.`,
  "Print My Notebook": `Imprimer mon carnet`,
  "1 softcover notebook": `1 carnet souple`,
  "12 Instax Mini prints": `12 tirages Instax Mini`,
  "ready to ship": `pr\xEAt \xE0 exp\xE9dier`,
  "See in the shop": `Voir dans la boutique`,
  "MOST POPULAR": `LE PLUS POPULAIRE`,
  "Complete Memory Pack": `Pack Souvenir Complet`,
  "1 hardcover notebook": `1 carnet rigide`,
  "20 mixed frames + sleeve": `20 cadres vari\xE9s + pochette`,
  "save $7.50": `\xE9conomisez 7,50 $`,
  "Deluxe Gift Pack": `Pack Cadeau Deluxe`,
  "2 hardcover copies + 30 frames": `2 carnets rigides + 30 cadres`,
  "crayons, stickers + gift box": `crayons, stickers + bo\xEEte cadeau`,
  "save $14.00": `\xE9conomisez 14,00 $`,
  "Need extras? Every item is also sold individually.": `Besoin d'extras ? Chaque article est aussi vendu \xE0 l'unit\xE9.`,
  "Notebook copy": `Exemplaire du carnet`,
  "Instax frame": `Cadre Instax`,
  "$0.99 / $7.99 pack": `0,99 $ / pack 7,99 $`,
  "Polaroid frame": `Cadre Polaroid`,
  "$1.19 / $9.99 pack": `1,19 $ / pack 9,99 $`,
  "Color crayons": `Crayons de couleur`,
  "$0.49 / $5.99 set": `0,49 $ / set 5,99 $`,
  "Kawaii stickers": `Stickers kawaii`,
  "$0.39 / $4.99 pack": `0,39 $ / pack 4,99 $`,
  "Prices in USD. The shop is in test mode: no payment is taken, no order is placed.": `Prix en USD. La boutique est en mode test : aucun paiement n'est pr\xE9lev\xE9, aucune commande n'est pass\xE9e.`,
  "Questions, answered": `Vos questions, nos r\xE9ponses`,
  "Do I need an account?": `Ai-je besoin d\u2019un compte ?`,
  "No. Every tool works without one. Sign in only if you want to save your frames between visits.": `Non. Tous les outils fonctionnent sans. Connectez-vous seulement pour garder vos cadres d'une visite \xE0 l'autre.`,
  "Which devices does it work on?": `Sur quels appareils \xE7a marche ?`,
  "Desktop and iPad. The drawing toolbar works with a finger, a mouse and the Apple Pencil, with pressure sensitivity.": `Ordinateur et iPad. La barre de dessin fonctionne au doigt, \xE0 la souris et \xE0 l\u2019Apple Pencil, avec la sensibilit\xE9 \xE0 la pression.`,
  "Instax or Polaroid?": `Instax ou Polaroid ?`,
  "Both. You pick the format per frame and can mix them in the same album.": `Les deux. Vous choisissez le format pour chaque cadre et pouvez les m\xE9langer dans le m\xEAme album.`,
  "What is it for?": `\xC0 quoi \xE7a sert ?`,
  "Birthdays, anniversaries, or just because. If someone matters to you, an album of your shared moments beats another gift card.": `Anniversaires, f\xEAtes, ou juste comme \xE7a. Si quelqu'un compte pour vous, un album de vos moments \xE0 deux vaut mieux qu'une \xE9ni\xE8me carte cadeau.`,
  "Is the shop live?": `La boutique est-elle ouverte ?`,
  "Not yet. It runs in test mode, so you can walk through the whole order flow without being charged.": `Pas encore. Elle est en mode test : vous pouvez parcourir toute la commande sans \xEAtre d\xE9bit\xE9.`,
  "Start their gift": `Commencer son cadeau`,
  "It takes less than a minute to start, and the result is a gift they will keep.": `Il faut moins d\u2019une minute pour commencer, et le r\xE9sultat est un cadeau qu\u2019elle gardera.`,
  "Open InstaFrame": `Ouvrir InstaFrame`,
  "\xB7 Creative memory shop": `\xB7 Boutique de souvenirs cr\xE9atifs`,
  Prototype: `Prototype`,
  "Frame print generator": `G\xE9n\xE9rateur de cadres photo`,
  "CREATE & MANAGE": `CR\xC9ER ET G\xC9RER`,
  "Generate Frames": `G\xE9n\xE9rer des cadres`,
  "Suggested Spotify search link, not a direct track. You can edit or replace it.": "Lien de recherche Spotify propos\xE9, pas un lien direct vers le morceau. Vous pouvez le modifier ou le remplacer.",
  "Perforated": "Vertical",
  "Dotted": "Carr\xE9",
  "Search cover (optional)": "Rechercher une pochette (facultatif)",
  "Album or title + artist": "Album ou titre + artiste",
  "Cover search query": "Recherche de pochette",
  "Search MusicBrainz": "Rechercher sur MusicBrainz",
  "Searching\u2026": "Recherche\u2026",
  "Cover art is copyrighted. Search does not grant permission to print, crop or sell it. Upload your own image if unsure.": "Les pochettes sont prot\xE9g\xE9es par le droit d'auteur. La recherche ne donne pas le droit de les imprimer, recadrer ou vendre. En cas de doute, importez votre propre image.",
  "No cover found. Try an album title or upload an image.": "Aucune pochette trouv\xE9e. Essayez un titre d'album ou importez une image.",
  "Cover unavailable. Upload an image instead.": "Pochette indisponible. Importez une image.",
  "Search unavailable. Upload an image instead.": "Recherche indisponible. Importez une image.",
  "MusicBrainz is busy. Please upload an image or try later.": "MusicBrainz est occup\xE9. Importez une image ou r\xE9essayez plus tard.",
  "Please wait a moment before searching again.": "Patientez un instant avant de relancer la recherche.",
  "Start preview recording": "D\xE9marrer l'enregistrement",
  "Stop preview recording": "Arr\xEAter l'enregistrement",
  "Play audio": "Lire l'audio",
  "Sign in to save your frames": `Connectez-vous pour sauvegarder vos cadres`,
  "Create authentic film print": `Cr\xE9ez de vrais tirages argentiques`,
  "Instax Mini": `Instax Mini`,
  "Drag & drop or click to": `Glisse une photo ici`,
  upload: `importer`,
  "Drag to position": `Glisser pour positionner`,
  "Upload New Photo": `Importer une photo`,
  Reset: `R\xE9initialiser`,
  "Caption Size:": `Taille de la l\xE9gende :`,
  "Download Frame": `T\xE9l\xE9charger le cadre`,
  "+ Add to Gallery": `+ Ajouter \xE0 la galerie`,
  "Frame Gallery": `Galerie de cadres`,
  Download: `T\xE9l\xE9charger`,
  Delete: `Supprimer`,
  "Your generated frames will appear here.": `Vos cadres g\xE9n\xE9r\xE9s appara\xEEtront ici.`,
  "Generate Album Photo": `G\xE9n\xE9rer la photo d'album`,
  Main: `Principal`,
  "Frame editor": `\xC9diteur de cadre`,
  "Frame format": `Format du cadre`,
  "Drag & drop or click to upload": `Glisse une photo ici`,
  Caption: `L\xE9gende`,
  "Zoom out": `D\xE9zoomer`,
  "Zoom in": `Zoomer`,
  "Upload photo": `Importer une photo`,
  "Frame gallery": `Galerie de cadres`,
  "Album studio": `Studio album`,
  Stickers: `Stickers`,
  Frames: `Cadres`,
  "Add frames to your gallery in Generate Frames.": `Ajoutez des cadres \xE0 votre galerie dans G\xE9n\xE9rer des cadres.`,
  Text: `Texte`,
  "+ Page": `+ Page`,
  "Arrange and export your frames.": `Disposez et exportez vos cadres.`,
  "Zoom Out": `D\xE9zoomer`,
  "Zoom In": `Zoomer`,
  Fit: `Ajuster`,
  "+ Add page": `+ Ajouter une page`,
  Stylet: `Stylet`,
  Open: `Ouvrir`,
  Close: `Fermer`,
  "Cover": `Couverture`,
  "Preview 3D": `Aper\xE7u 3D`,
  "Preview book": `Aper\xE7u livre`,
  "Download PDF": `T\xE9l\xE9charger le PDF`,
  "InstaVintage Album": `Album InstaVintage`,
  "Your generated frames are saved here.": `Vos cadres g\xE9n\xE9r\xE9s sont enregistr\xE9s ici.`,
  "Album workspace": `Espace de l'album`,
  "Creative memory shop": `Boutique de souvenirs cr\xE9atifs`,
  "CREATE & SHOP": `CR\xC9ER ET ACHETER`,
  "Finished your album?": `Votre album est fini ?`,
  "Choose a print pack,": `Choisissez un pack d'impression,`,
  "then add any extras.": `puis ajoutez des extras.`,
  "Finish Your InstaFrame": `Finalisez votre InstaFrame`,
  "Turn your completed digital notebook into a keepsake.": `Transformez votre carnet num\xE9rique termin\xE9 en souvenir.`,
  "Notebook kits": `Kits carnet`,
  "Cart (": `Panier (`,
  "1. Create album": `1. Cr\xE9er l\u2019album`,
  "2. Finish design": `2. Finir le design`,
  "3. Choose print option": `3. Choisir l'impression`,
  "Choose a finished-notebook pack": `Choisissez un pack de carnet termin\xE9`,
  "Prepared from the album you just completed.": `Pr\xE9par\xE9 \xE0 partir de l'album que vous venez de terminer.`,
  "Choose Basic Pack": `Choisir le pack Basique`,
  "Choose Complete Pack": `Choisir le pack Complet`,
  "Choose Deluxe Pack": `Choisir le pack Deluxe`,
  "Need extras? Shop any item individually": `Besoin d'extras ? Achetez chaque article \xE0 l'unit\xE9`,
  "Add replacements, refills, or another notebook copy.": `Ajoutez des remplacements, des recharges ou un autre exemplaire du carnet.`,
  "Notebook Copy": `Exemplaire du carnet`,
  "Your finished design": `Votre design termin\xE9`,
  "Add to cart": `Ajouter au panier`,
  "Instax Frame": `Cadre Instax`,
  "$0.99 each / $7.99 pack": `0,99 $ l\u2019unit\xE9 / pack 7,99 $`,
  "Select quantity": `Choisir la quantit\xE9`,
  "Polaroid Frame": `Cadre Polaroid`,
  "$1.19 each / $9.99 pack": `1,19 $ l\u2019unit\xE9 / pack 9,99 $`,
  "Color Crayons": `Crayons de couleur`,
  "$0.49 each / $5.99 set": `0,49 $ l\u2019unit\xE9 / set 5,99 $`,
  "Choose colors": `Choisir les couleurs`,
  "Kawaii Stickers": `Stickers kawaii`,
  "$0.39 each / $4.99 pack": `0,39 $ l\u2019unit\xE9 / pack 4,99 $`,
  "Choose stickers": `Choisir les stickers`,
  "Prices shown in USD \u2022 Test mode: no payment is taken, no order is placed.": `Prix en USD \u2022 Mode test : aucun paiement n'est pr\xE9lev\xE9, aucune commande n'est pass\xE9e.`,
  "Test mode: no payment is taken and no order is placed": `Mode test : aucun paiement n'est pr\xE9lev\xE9 et aucune commande n'est pass\xE9e`,
  "Track an order": `Suivre une commande`,
  YOUR: `VOTRE`,
  DESIGN: `DESIGN`,
  "Printed from your own album": `Imprim\xE9 \xE0 partir de votre album`,
  "Frames cut to Instax Mini and Polaroid sizes": `Cadres aux tailles Instax Mini et Polaroid`,
  "Black pages made to doodle on": `Pages noires faites pour gribouiller`,
  "InstaFrame Notebook Kit": `Kit Carnet InstaFrame`,
  "Turn the notebook you designed in Album Studio into a real one. Pick a pack, we print your pages and frames.": `Transformez le carnet que vous avez cr\xE9\xE9 dans Studio Album en vrai carnet. Choisissez un pack, nous imprimons vos pages et vos cadres.`,
  "Your pages": `Vos pages`,
  "- the album you built, stickers and drawings included.": `- l\u2019album que vous avez cr\xE9\xE9, stickers et dessins compris.`,
  "Real prints": `De vrais tirages`,
  "- each frame printed at the size you chose.": `- chaque cadre imprim\xE9 \xE0 la taille choisie.`,
  "Made as a gift": `Pens\xE9 comme un cadeau`,
  "- add a sleeve or a gift box in the larger packs.": `- ajoutez une pochette ou une bo\xEEte cadeau dans les plus grands packs.`,
  Basic: `Basique`,
  "1 softcover notebook, 12 Instax Mini prints": `1 carnet souple, 12 tirages Instax Mini`,
  Complete: `Complet`,
  "1 hardcover notebook, 20 mixed frames + sleeve": `1 carnet rigide, 20 cadres vari\xE9s + pochette`,
  Deluxe: `Deluxe`,
  "2 hardcover copies, 30 frames, crayons, stickers, gift box": `2 carnets rigides, 30 cadres, crayons, stickers, bo\xEEte cadeau`,
  "Placeholder prices, final prices set at launch": `Prix provisoires, prix d\xE9finitifs fix\xE9s au lancement`,
  "ADD TO CART \xB7": `AJOUTER AU PANIER \xB7`,
  "Photos are stand-ins. Test mode only.": `Photos provisoires. Mode test uniquement.`,
  Cart: `Panier`,
  "Choose a pack": `Choisir un pack`,
  "Track your order": `Suivre votre commande`,
  "Order number": `Num\xE9ro de commande`,
  "Tracking number": `Num\xE9ro de suivi`,
  "Find my parcel \u2192": `Trouver mon colis \u2192`,
  "e.g. IF-1234": `ex. IF-1234`,
  "Email used for the order": `E-mail utilis\xE9 pour la commande`,
  "Order email": `E-mail de la commande`,
  "1. Contact": `1. Contact`,
  Email: `E-mail`,
  "2. Delivery address": `2. Adresse de livraison`,
  "Country / Region": `Pays / R\xE9gion`,
  France: `France`,
  "United States": `\xC9tats-Unis`,
  "United Kingdom": `Royaume-Uni`,
  Other: `Autre`,
  "First name": `Pr\xE9nom`,
  "Last name": `Nom`,
  Address: `Adresse`,
  "Postal code": `Code postal`,
  City: `Ville`,
  "3. Payment": `3. Paiement`,
  Card: `Carte`,
  "Test mode": `Mode test`,
  "Card fields are switched off. No card number is asked or stored.": `Les champs de carte sont d\xE9sactiv\xE9s. Aucun num\xE9ro de carte n'est demand\xE9 ni conserv\xE9.`,
  "Phone (optional)": `T\xE9l\xE9phone (facultatif)`,
  "By placing a test order you accept that nothing is charged. Final terms of sale will be shown before real payments are enabled.": `En passant une commande test, vous acceptez que rien ne soit d\xE9bit\xE9. Les conditions de vente d\xE9finitives seront affich\xE9es avant l'activation des vrais paiements.`,
  "Place test order": `Passer la commande test`,
  "Shop home": `Accueil boutique`,
  "About InstaFrame": `\xC0 propos d\u2019InstaFrame`,
  "Your cart is empty.": `Votre panier est vide.`,
  Apply: `Appliquer`,
  Subtotal: `Sous-total`,
  Shipping: `Livraison`,
  "Free in test mode": `Gratuite en mode test`,
  Total: `Total`,
  "Promo code": `Code promo`,
  "Sign in": `Se connecter`,
  "Save your frames and albums. The generator works without an account.": `Sauvegardez vos cadres et albums. Le g\xE9n\xE9rateur fonctionne sans compte.`,
  "Sign in is not configured on this environment yet.": `La connexion n'est pas encore configur\xE9e sur cet environnement.`,
  Password: `Mot de passe`,
  "No account yet? Create one": `Pas encore de compte ? Cr\xE9ez-en un`,
  "Back to the generator": `Retour au g\xE9n\xE9rateur`,
  Pages: `Pages`,
  of: `sur`,
  "Previous page": `Page pr\xE9c\xE9dente`,
  "Next page": `Page suivante`,
  "+ Upload": `+ Importer`,
  "Delete selected": `Supprimer la s\xE9lection`,
  "Drawing tools": `Outils de dessin`,
  "Move toolbar": `D\xE9placer la barre`,
  Undo: `Annuler`,
  Redo: `R\xE9tablir`,
  Pen: `Stylo`,
  Marker: `Feutre`,
  Highlighter: `Surligneur`,
  Eraser: `Gomme`,
  Add: `Ajouter`,
  "Add the pack \xB7": `Ajouter le pack \xB7`,
  Cancel: `Annuler`,
  Less: `Moins`,
  More: `Plus`,
  "Doodle of a couple hugging": `Dessin d\u2019un couple qui s\u2019enlace`,
  "Doodle of two women walking down a street": `Dessin de deux femmes qui marchent dans une rue`,
  "Doodle of two men relaxing on the grass": `Dessin de deux hommes d\xE9tendus dans l\u2019herbe`,
  "Album Studio with the drawing toolbar open on a black notebook page": `Studio Album avec la barre de dessin ouverte sur une page de carnet noire`,
  "InstantFrame Generator with an Instax Mini frame": `G\xE9n\xE9rateur InstantFrame avec un cadre Instax Mini`,
  "Album Studio page with the drawing toolbar": `Page de Studio Album avec la barre de dessin`,
  "The InstaFrame shop with print packs and extras": `La boutique InstaFrame avec ses packs d\u2019impression et extras`,
  Photos: `Photos`,
  "Remove this photo": `Retirer cette photo`,
  "Previous photo": `Photo pr\xE9c\xE9dente`,
  "Next photo": `Photo suivante`,
  "Preparing\u2026": `Pr\xE9paration\u2026`,
  "Preparing your notebook\u2026": `Pr\xE9paration de votre notebook\u2026`,
  "Taking longer than expected.": `Le chargement est plus long que pr\xE9vu.`,
  "Retry": `R\xE9essayer`,
  "Album preview": `Aper\xE7u de l'album`,
  "Export failed. Try again.": `L'export a \xE9chou\xE9. R\xE9essayez.`,
  "Unable to read this photo.": `Impossible de lire cette photo.`,
  "This file is not an image.": `Ce fichier n'est pas une image.`,
  "Photo too large (15 MB maximum).": `Photo trop lourde (15 Mo maximum).`,
  "Unable to read this photo. Try a JPEG or PNG.": `Impossible de lire cette photo. Essayez un JPEG ou un PNG.`,
  "Sign in failed: wrong email or password.": `Connexion impossible : e-mail ou mot de passe incorrect.`,
  "Check your inbox to confirm your email, then sign in.": `V\xE9rifiez votre bo\xEEte mail pour confirmer votre adresse, puis connectez-vous.`,
  "Your cart": `Votre panier`,
  "Keep shopping": `Continuer mes achats`,
  "Test order received": `Commande test re\xE7ue`,
  "This was a test. Nothing was charged and nothing will ship.": `C'\xE9tait un test. Rien n'a \xE9t\xE9 d\xE9bit\xE9 et rien ne sera exp\xE9di\xE9.`,
  "Back to the shop": `Retour \xE0 la boutique`,
  "Test mode: there are no real orders to look up yet.": `Mode test : il n'y a pas encore de vraies commandes \xE0 rechercher.`,
  "Add from my phone": `Ajouter depuis mon t\xE9l\xE9phone`,
  "Add photos from your phone": `Ajouter des photos depuis votre t\xE9l\xE9phone`,
  "Scan this code with your phone camera, choose your photos, and they appear here. Keep this window open.": `Scannez ce code avec l'appareil photo de votre t\xE9l\xE9phone, choisissez vos photos et elles apparaissent ici. Gardez cette fen\xEAtre ouverte.`,
  "Waiting for your phone\u2026": `En attente de votre t\xE9l\xE9phone\u2026`,
  "Phone connected. Choose photos on your phone.": `T\xE9l\xE9phone connect\xE9. Choisissez vos photos sur le t\xE9l\xE9phone.`,
  "Preparing the code\u2026": `Pr\xE9paration du code\u2026`,
  "Connected to your computer. Choose the photos to send.": `Connect\xE9 \xE0 votre ordinateur. Choisissez les photos \xE0 envoyer.`,
  "Choose photos": `Choisir des photos`,
  "Connecting to your computer\u2026": `Connexion \xE0 votre ordinateur\u2026`
};
Object.assign(FR, { "Work on elements": "Travailler sur les \xE9l\xE9ments", "Generate a variety of elements to add to your notebook in the editor.": "G\xE9n\xE8re des \xE9l\xE9ments \xE0 ajouter \xE0 ton carnet dans l\u2019\xE9diteur.", "Frames": "Cadres", "Music": "Musique", "Stamps": "Timbres", "Square": "Carr\xE9", "Rectangle": "Rectangle", "Pill": "Pastille", "Card": "Carte", "Disc": "Disque", "Note text": "Texte de la note", "Paper colour": "Couleur du papier", "Track title": "Titre du morceau", "Artist": "Artiste", "Title": "Titre", "Description": "Description", "Music link (optional)": "Lien musical (facultatif)", "Upload audio": "Importer un audio", "Upload image": "Importer une image", "Download note": "T\xE9l\xE9charger la note", "Download element": "T\xE9l\xE9charger l\u2019\xE9l\xE9ment", "+ Add to Gallery": "+ Ajouter \xE0 la galerie", "Open music link": "Ouvrir le lien musical", "Choose an audio file smaller than 25 MB.": "Choisissez un fichier audio de moins de 25 Mo.", "Choose a photo smaller than 15 MB.": "Choisissez une photo de moins de 15 Mo.", "Choose an image smaller than 15 MB.": "Choisissez une image de moins de 15 Mo.", "Choose a supported file.": "Choisissez un fichier compatible.", "Could not read image.": "Impossible de lire l\u2019image.", "Upload an audio recording first.": "Importez d\u2019abord un enregistrement audio.", "Add a track title.": "Ajoutez un titre de morceau.", "Use an https music link.": "Utilisez un lien musical https.", "PNG is the visual print. Audio and music links stay with the element in this browser session.": "Le PNG est l\u2019image imprimable. L\u2019audio et les liens restent associ\xE9s \xE0 l\u2019\xE9l\xE9ment dans cette session du navigateur.", "Post-its Gallery": "Galerie post-its", "Your generated post-its will appear here.": "Vos post-its appara\xEEtront ici.", "Generate Album Notes": "G\xE9n\xE9rer un album de notes", "Audio Gallery": "Galerie audio", "Your generated audio will appear here.": "Vos audio appara\xEEtront ici.", "Generate Album Audio": "G\xE9n\xE9rer un album audio", "Music Gallery": "Galerie musique", "Your generated music will appear here.": "Vos musiques appara\xEEtront ici.", "Generate Album Music": "G\xE9n\xE9rer un album de musique", "Stamps Gallery": "Galerie timbres", "Your generated stamps will appear here.": "Vos timbres appara\xEEtront ici.", "Generate Album Stamps": "G\xE9n\xE9rer un album de timbres" });
Object.assign(FR, { "All": "Tout", "All elements Gallery": "Galerie de tous les \xE9l\xE9ments", "Your generated elements will appear here.": "Vos \xE9l\xE9ments g\xE9n\xE9r\xE9s appara\xEEtront ici.", "Generate Album Elements": "G\xE9n\xE9rer un album d'\xE9l\xE9ments", "Record audio": "Enregistrer un audio", "Stop recording": "Arr\xEAter l'enregistrement", "Opening microphone\u2026": "Ouverture du micro\u2026", "Audio saved here only. No transcription or upload.": "Audio conserv\xE9 ici. Aucun envoi ni transcription.", "Microphone unavailable. Allow microphone access or upload an audio file.": "Micro indisponible. Autorisez le micro ou importez un fichier audio.", "Microphone blocked. Allow it in the address bar icon, and check Windows Settings > Privacy & security > Microphone.": "Micro bloqu\xE9. Autorisez-le via l'ic\xF4ne de la barre d'adresse, puis v\xE9rifiez Param\xE8tres Windows > Confidentialit\xE9 et s\xE9curit\xE9 > Microphone.", "No microphone found. Connect one and try again, or upload an audio file.": "Aucun micro d\xE9tect\xE9. Branchez-en un et r\xE9essayez, ou importez un fichier audio.", "The microphone is busy in another app. Close it and try again.": "Le micro est utilis\xE9 par une autre application. Fermez-la et r\xE9essayez.", "Custom paper colour": "Couleur personnalis\xE9e", "Card colour": "Couleur de la carte", "Custom card colour": "Couleur de carte personnalis\xE9e" });
Object.assign(FR, { "Video": "Vid\xE9o", "Sticker": "Sticker", "Stickers": "Stickers", "Stickers Gallery": "Galerie stickers", "Video Gallery": "Galerie vid\xE9o", "Generate Album Stickers": "G\xE9n\xE9rer un album de stickers", "Generate Album Video": "G\xE9n\xE9rer un album vid\xE9o", "Your generated stickers will appear here.": "Vos stickers appara\xEEtront ici.", "Your generated video will appear here.": "Vos vid\xE9os appara\xEEtront ici.", "Remove portrait background": "D\xE9tourer le portrait", "Restore image": "Restaurer l\u2019image", "Manual eraser": "Gomme manuelle", "Border colour": "Couleur du contour", "Download sticker": "T\xE9l\xE9charger le sticker", "Upload video": "Importer une vid\xE9o", "Film video": "Filmer une vid\xE9o", "Use current frame": "Utiliser cette image", "Poster": "Image fixe", "Video URL (optional)": "Lien vid\xE9o (facultatif)", "Choose a clip for your notebook.": "Choisissez une vid\xE9o pour votre carnet.", "Automatic removal unavailable. Use a transparent PNG or the manual eraser.": "D\xE9tourage automatique indisponible. Utilisez un PNG transparent ou la gomme manuelle.", "Background removal runs on your device. First use downloads a small model.": "Le d\xE9tourage tourne sur votre appareil. La premi\xE8re utilisation t\xE9l\xE9charge un petit mod\xE8le.", "Background removed. Check the edges.": "Arri\xE8re-plan supprim\xE9. V\xE9rifiez les contours.", "Loading model\u2026": "Chargement du mod\xE8le\u2026", "Removing background\u2026": "Suppression de l\u2019arri\xE8re-plan\u2026", "Background removal timed out. Use the manual eraser.": "D\xE9tourage trop long. Utilisez la gomme manuelle.", "Background removal unavailable": "D\xE9tourage indisponible", "Portrait background removed. Check the edges.": "Portrait d\xE9tour\xE9. V\xE9rifiez les contours.", "Portrait removal runs on your device. Objects may need manual erasing. First use downloads a model.": "Le d\xE9tourage du portrait se fait sur votre appareil. Pour les objets, utilisez la gomme. Un mod\xE8le est t\xE9l\xE9charg\xE9 au premier usage.", "Playback range: 6 seconds maximum. This does not export or upload a trimmed file.": "Lecture limit\xE9e \xE0 6 secondes. Le fichier n\u2019est ni d\xE9coup\xE9 ni envoy\xE9.", "A QR opens this URL, not the local upload or its playback range. Use an already hosted clip. Without a URL, only the poster is printed.": "Le QR ouvre ce lien, pas la vid\xE9o locale ni l\u2019extrait. Utilisez une vid\xE9o d\xE9j\xE0 h\xE9berg\xE9e. Sans lien, seule l\u2019image fixe est imprim\xE9e." });
Object.assign(FR, { "Remove background": "D\xE9tourer", "Transparent image ready.": "Image transparente pr\xEAte." });
Object.assign(FR, { "Drive video link (optional)": "Lien vid\xE9o Drive (facultatif)", "How to share on Drive": "Comment partager sur Drive", "Test link": "Tester le lien", "Drive link format valid. Public access is not verified.": "Format Drive valide. Acc\xE8s public non v\xE9rifi\xE9.", "HTTPS link format valid. Access is not verified.": "Format HTTPS valide. Acc\xE8s non v\xE9rifi\xE9.", "QR opens the shared video, not the local 6s range. Keep the file shared. Without a link, only the poster is printed.": "Le QR ouvre la vid\xE9o partag\xE9e, pas l\u2019extrait local de 6 s. Gardez le fichier partag\xE9. Sans lien, seule l\u2019image fixe est imprim\xE9e.", "Upload the original video to your own Google Drive.": "Importez la vid\xE9o originale sur votre Google Drive.", "Share \u2192 General access \u2192 Anyone with the link \u2192 Viewer.": "Partager \u2192 Acc\xE8s g\xE9n\xE9ral \u2192 Tous les utilisateurs disposant du lien \u2192 Lecteur.", "Copy the sharing link. Your name and email may be visible.": "Copiez le lien. Votre nom et votre e-mail peuvent \xEAtre visibles.", "Test the link in a private browser window before printing.": "Testez le lien en navigation priv\xE9e avant d\u2019imprimer.", "Google sharing help": "Aide au partage Google", "InstaFrame does not upload or change sharing. Storage uses your Drive quota. Google may need processing time or require sign-in at playback limits.": "InstaFrame ne t\xE9l\xE9verse rien et ne change pas le partage. La vid\xE9o utilise votre quota Drive. Google peut demander un d\xE9lai ou une connexion si une limite de lecture est atteinte." });
Object.assign(FR, { "6s playback preview only. Original file unchanged.": "Aper\xE7u de lecture de 6 s. Fichier original inchang\xE9.", "QR plays the shared file, not this 6s range. Keep it shared.": "Le QR lit le fichier partag\xE9, pas cet extrait de 6 s. Gardez-le partag\xE9." });
Object.assign(FR, { "Drive video link": "Lien vid\xE9o Drive", "Poster image (optional)": "Image de couverture (facultative)", "Reset poster": "R\xE9initialiser l\u2019image", "Use a Google Drive video sharing link.": "Utilisez un lien de partage de vid\xE9o Google Drive.", "Only a Drive link, no video upload. QR opens the full shared video. Keep the file shared.": "Lien Drive uniquement, aucun import vid\xE9o. Le QR ouvre la vid\xE9o partag\xE9e enti\xE8re. Gardez le fichier partag\xE9.", "No automatic Drive thumbnail. Add a poster image or keep the video icon.": "Pas de vignette Drive automatique. Ajoutez une image ou gardez l\u2019ic\xF4ne vid\xE9o.", "Upload your video to your own Google Drive.": "Importez votre vid\xE9o sur votre Google Drive.", "Copy the link. Your name and email may be visible.": "Copiez le lien. Votre nom et votre e-mail peuvent \xEAtre visibles.", "Test it in a private browser window before printing.": "Testez-le en navigation priv\xE9e avant d\u2019imprimer.", "Paste the sharing link of a video file, not a folder or Drive home.": "Collez le lien de partage d\u2019une vid\xE9o, pas d\u2019un dossier ni de l\u2019accueil Drive." });
Object.assign(FR, { "Drive sharing help": "Aide au partage", "Poster image": "Image de couverture" });
Object.assign(FR, { "Image that represents the video": "Image qui repr\xE9sente la vid\xE9o", "Change image": "Changer l\u2019image" });
Object.assign(FR, {
  "Upload stamp photos": "Importer des photos pour les timbres",
  "Share your video": "Partagez votre vid\xE9o",
  "Close sharing help": "Fermer l'aide au partage",
  "Keep your video on Drive. Add its sharing link here to print a QR code in your notebook.": "Gardez votre vid\xE9o sur Drive. Ajoutez son lien de partage ici pour imprimer un QR code dans votre carnet.",
  "Upload to your Drive": "Importez sur votre Drive",
  "Upload your video to your own Google Drive.": "Importez votre vid\xE9o sur votre propre Google Drive.",
  "Allow viewing by link": "Autorisez la lecture via le lien",
  "Copy and test the link": "Copiez et testez le lien",
  "Test it in a private browser window before printing.": "Testez-le en navigation priv\xE9e avant d'imprimer.",
  "Your name and email may be visible. InstaFrame does not upload or change sharing. The video uses your Drive quota. Keep the file shared.": "Votre nom et votre e-mail peuvent \xEAtre visibles. InstaFrame ne t\xE9l\xE9verse rien et ne modifie pas le partage. La vid\xE9o utilise votre quota Drive. Gardez le fichier partag\xE9.",
  "Got it": "J'ai compris"
});
Object.assign(FR, {
  "A video, a sharing link, a QR code.": "Une vid\xE9o, un lien de partage, un QR code.",
  "Share": "Partager",
  "General access": "Acc\xE8s g\xE9n\xE9ral",
  "Anyone with the link": "Tous les utilisateurs disposant du lien",
  "Viewer": "Lecteur",
  "Before printing": "Avant d'imprimer",
  "Test the link without signing in to Google.": "Testez le lien sans vous connecter \xE0 Google."
});
Object.assign(FR, {
  "Take the time to create something for that": "Prenez le temps de cr\xE9er quelque chose pour cette",
  "special person": "personne sp\xE9ciale",
  "Open Generate Elements": "Ouvrir Generate Elements",
  "Made for desktop and iPad": "Con\xE7u pour ordinateur et iPad",
  "Make the notebook and send it (digital sending, to be confirmed).": "Faire le carnet et l'envoyer (envoi num\xE9rique, \xE0 confirmer).",
  "Proposal: extra formats, variants and compositions, to be confirmed.": "Proposition : formats, variantes et compositions suppl\xE9mentaires, \xE0 confirmer.",
  "Coming later": "\xC0 venir",
  "Later, get your physical notebook delivered": "Plus tard, recevez votre carnet physique chez vous",
  "Price and contents to be defined.": "Prix et contenu \xE0 d\xE9finir.",
  "See the offers \u2193": "Voir les offres \u2193",
  "Three steps to say": "Trois \xE9tapes pour dire",
  "I care about you": "je tiens \xE0 toi",
  "Browse Get Inspired for ideas of what you can tell.": "Parcourez Get Inspired pour trouver des id\xE9es de ce qu'on peut raconter.",
  "Create, then fill": "Cr\xE9er, puis remplir",
  "Create your photos, stickers and drawings in the generator, then fill your notebook: the caption only you two understand, black pages, like a notebook passed in class.": "Cr\xE9ez vos photos, stickers et dessins dans le g\xE9n\xE9rateur, puis remplissez votre carnet : la l\xE9gende que vous seuls comprenez, des pages noires, comme un carnet qu'on se passe en classe.",
  "Give it": "Lui offrir",
  "They discover it, and see that someone took the time.": "Elle ou il le d\xE9couvre, et comprend que quelqu'un a pris le temps.",
  "Offers": "Les offres",
  "Two offers, and later the physical notebook": "Deux offres, et plus tard le carnet physique",
  "Price, contents and conditions to be defined. Not available yet.": "Prix, contenu et conditions \xE0 d\xE9finir. Non disponible pour l'instant.",
  "Take the time to make them this notebook": "Prenez le temps de lui faire ce carnet",
  "Start by getting inspired. What you took the time to make, they will keep.": "Commencez par vous inspirer. Ce que vous aurez pris le temps de faire, elle le gardera.",
  "Get inspired": "Me laisser inspirer",
  "Find inspiration": "S'inspirer",
  'Offer details, billing cadence and the meaning of "send" to be confirmed. The delivered physical notebook is a future idea, not included in the offers above.': "D\xE9tail des offres, cadence de facturation et sens d'\xAB envoyer \xBB \xE0 confirmer. Le carnet physique livr\xE9 est une id\xE9e \xE0 venir, non incluse dans les offres ci-dessus.",
  "Contents, billing cadence and conditions to be confirmed.": "Contenu, cadence de facturation et conditions \xE0 confirmer.",
  "Album Studio showing a black notebook cover": "Studio Album avec une couverture de carnet noire",
  "A notebook made of memories, for the person who matters. Find inspiration in Get Inspired, create your elements, then fill yours with your photos, words and drawings.": "Un carnet fait de souvenirs, pour la personne qui compte. Prenez de l'inspiration dans Get Inspired, cr\xE9ez vos \xE9l\xE9ments, puis remplissez le v\xF4tre de vos photos, de vos mots et de vos dessins."
});
Object.assign(FR, {
  "See physical notebook pricing \u2193": "Prix du carnet physique \u2193",
  "Digital notebook offers": "Les offres du carnet num\xE9rique",
  "Physical notebook": "Carnet physique",
  "Physical notebook pricing": "Prix du carnet physique",
  "Price to be defined": "Prix \xE0 d\xE9finir",
  "Contents and conditions to be confirmed. Not available yet.": "Contenu et conditions \xE0 confirmer. Non disponible pour l'instant.",
  "Under construction": "En construction",
  "The shop is being prepared. No purchases or orders are available here.": "La boutique est en pr\xE9paration. Aucun achat ni commande n'est disponible ici."
});
Object.assign(FR, { "The shop is under construction. No purchases or orders are available here.": "La boutique est en construction. Aucun achat ni commande n\u2019est disponible ici." });
Object.assign(FR, {
  "The shop is being prepared. Take a peek at the preview. Nothing is available to buy yet.": "La boutique est en pr\xE9paration. Jetez un coup d'\u0153il \xE0 l'aper\xE7u. Aucun achat n'est disponible pour l'instant.",
  "Close preview": "Fermer l'aper\xE7u",
  "Take a peek": "Jeter un coup d'\u0153il",
  "Read-only shop preview": "Aper\xE7u de la boutique, sans achat",
  "The prices and products shown are test examples, not confirmed commercial offers. No purchase, cart or order is available in this preview.": "Les prix et produits affich\xE9s sont des exemples de test, pas des offres commerciales confirm\xE9es. Aucun achat, panier ni commande n'est disponible dans cet aper\xE7u.",
  "Shop preview showing test packs and extras": "Aper\xE7u de la boutique avec les packs et extras de test"
});
Object.assign(FR, { "Message": "Message", "Combination": "Combinaison", "PRO": "PRO", "Note": "Note", "Letter": "Lettre", "Messages": "Messages", "Date": "Date", "Letter editor": "\xC9diteur de lettre", "Letter preview": "Aper\xE7u de la lettre", "Write your letter...": "\xC9cris ta lettre...", "Letter text": "Texte de la lettre", "Date line": "Ligne de date", "FONT": "POLICE", "PAPER": "PAPIER", "Extras": "Ornements", "Calligraphy": "Calligraphie", "Flourish": "Fioritures", "Gothic": "Gothique", "Classic": "Classique", "Parchment": "Parchemin", "Aged": "Vieilli", "Scroll": "Rouleau", "Plain": "Simple", "Wax seal": "Sceau de cire", "Ornaments": "Ornements", "Illuminated capital": "Lettrine", "Download card": "T\xE9l\xE9charger la carte", "Date card editor": "\xC9diteur de carte date", "Date card preview": "Aper\xE7u de la carte date", "Word": "Mot", "STYLE": "STYLE", "LABEL": "\xC9TIQUETTE", "Modern": "Moderne", "Dark": "Sombre", "Script": "Manuscrit", "Calendar": "Calendrier", "Anniversary": "Anniversaire", "Birthday": "Anniversaire de naissance", "Trip": "Voyage", "None": "Aucune", "Our day": "Notre jour", "12 October 2024": "12 octobre 2024", "Messages screenshot editor": "\xC9diteur de capture de messages", "Upload a message screenshot": "Importez une capture de messages", "Upload screenshot": "Importer une capture", "Message screenshot preview": "Aper\xE7u de la capture", "Screenshot preview": "Aper\xE7u de la capture", "Tap to upload a screenshot": "Touchez pour importer une capture", "Suggested for you": "Sugg\xE9r\xE9 pour vous", "Built automatically from the elements already in your galleries.": "Compositions cr\xE9\xE9es automatiquement \xE0 partir des \xE9l\xE9ments d\xE9j\xE0 dans vos galeries.", "Your galleries are empty for now.": "Vos galeries sont vides pour l'instant.", "Suggestions update when you add or remove elements.": "Les suggestions se mettent \xE0 jour quand vous ajoutez ou retirez des \xE9l\xE9ments.", "Postcard": "Carte postale", "Travel Keepsake": "Souvenir de voyage", "Love Letter": "Lettre d'amour", "Memory Map": "Carte des souvenirs", "Photo + Stamp + your message": "Photo + Timbre + votre message", "Photo + Date + Note + Stamp": "Photo + Date + Note + Timbre", "Letter + Photo": "Lettre + Photo", "Photo + Note": "Photo + Note", "Swap": "Changer", "Regenerate": "R\xE9g\xE9n\xE9rer", "Back": "Retour", "Your message": "Votre message", "Write your message...": "\xC9crivez votre message...", "Message Gallery": "Galerie de messages", "Your generated message will appear here.": "Vos messages appara\xEEtront ici.", "Combination Gallery": "Galerie de combinaisons", "Your generated combination will appear here.": "Vos combinaisons appara\xEEtront ici.", "Combination suggestions": "Suggestions de combinaisons", "Message format": "Format de message", "None yet": "Pas encore", "Add a message first.": "Ajoutez d'abord un message.", "Generate Album Photo": "G\xE9n\xE9rer un album photo", "Generated elements gallery": "Galerie des \xE9l\xE9ments g\xE9n\xE9r\xE9s", "Gallery filter": "Filtre de galerie", "Gallery pages": "Pages de la galerie", "Previous page": "Page pr\xE9c\xE9dente", "Next page": "Page suivante", "Page 1": "Page 1" });
Object.assign(FR, { "\u{1F512} Download Frame": "\u{1F512} T\xE9l\xE9charger le cadre", "\u{1F512} Add to Gallery": "\u{1F512} Ajouter \xE0 la galerie", "\u{1F512} Download": "\u{1F512} T\xE9l\xE9charger" });
Object.assign(FR, { "No real payment: choosing a plan unlocks it on this device, for testing.": "Aucun paiement r\xE9el : choisir une offre la d\xE9bloque sur cet appareil, pour tester.", "Test plan active: Basic.": "Plan de test actif : Basic.", "Test plan active: Premium.": "Plan de test actif : Premium.", "Reset": "R\xE9initialiser" });
Object.assign(FR, { "FORMAT": "FORMAT", "Single": "Simple", "Strip 3": "Bande 3", "Strip 4": "Bande 4", "Strip 5": "Bande 5", "Frame editor": "\xC9diteur de cadre", "Download Frame": "T\xE9l\xE9charger le cadre" });
Object.assign(FR, { "Photo Gallery": "Galerie photos", "Your generated photo will appear here.": "Vos photos g\xE9n\xE9r\xE9es appara\xEEtront ici." });
Object.assign(FR, { "FROM YOUR GALLERIES": "DEPUIS VOS GALERIES", "PHOTO AND STAMP FROM YOUR GALLERIES": "PHOTO ET TIMBRE DEPUIS VOS GALERIES", "Photo + Stamp + Note": "Photo + Timbre + Note", "Caption (optional)": "L\xE9gende (facultatif)", "Suggestions": "Suggestions", "Photo + stamp auto-filled": "Photo + timbre pr\xE9remplis" });
Object.assign(FR, { "Stamp": "Timbre" });
Object.assign(FR, { "Basic": "Basic", "Open the Premium version": "Ouvrir la version Premium", "Back to the Basic version": "Retour \xE0 la version Basic" });
Object.assign(FR, { "Composition": "Composition", "Click a zone on the template to change what's in it.": "Cliquez sur une zone du mod\xE8le pour changer son contenu.", "Previous template": "Mod\xE8le pr\xE9c\xE9dent", "Next template": "Mod\xE8le suivant", "Front": "Recto", "Back": "Verso", "Side": "C\xF4t\xE9", "Concert Ticket": "Billet de concert", "YOUR ELEMENTS": "VOS \xC9L\xC9MENTS", "Your elements": "Vos \xE9l\xE9ments", "Your galleries are empty for now. Create elements in the other tabs first.": "Vos galeries sont vides pour l'instant. Cr\xE9ez d'abord des \xE9l\xE9ments dans les autres onglets.", "Pick a photo for the selected zone": "Choisissez une photo pour la zone s\xE9lectionn\xE9e", "Pick a stamp for the selected zone": "Choisissez un timbre pour la zone s\xE9lectionn\xE9e", "Edit the selected zone below": "Modifiez la zone s\xE9lectionn\xE9e ci-dessous", "Click to edit": "Cliquez pour modifier", "Click to add": "Cliquez pour ajouter", "Caption": "L\xE9gende", "Address": "Adresse", "Stamp": "Timbre", "Event": "\xC9v\xE9nement", "Event name": "Nom de l'\xE9v\xE9nement", "Presenter": "Pr\xE9sentateur", "Doors": "Ouverture", "Venue": "Lieu", "City": "Ville", "Section": "Section", "Row": "Rang\xE9e", "Seat": "Si\xE8ge", "Price": "Prix", "Done": "Termin\xE9", "Composition studio": "Studio de composition" });
Object.assign(FR, { "Sign in": "Connexion", "Continue with Google": "Continuer avec Google", "Sign out": "Se d\xE9connecter", "Save your frames and albums. The generator works without an account.": "Enregistre tes frames et tes albums. Le g\xE9n\xE9rateur fonctionne sans compte.", "We only receive your name, email and photo from Google. No password to create.": "Nous recevons uniquement ton nom, ton email et ta photo depuis Google. Aucun mot de passe \xE0 cr\xE9er.", "Back to the generator": "Retour au g\xE9n\xE9rateur", "Sign-in did not complete. Please try again.": "La connexion n'a pas abouti. R\xE9essaie." });
Object.assign(FR, { "Saved to your account": "Enregistr\xE9 dans ton compte", "Save to account": "Enregistrer dans ton compte", "Saved elements": "\xC9l\xE9ments sauvegard\xE9s", "All elements Gallery": "Galerie de tous les \xE9l\xE9ments", "Sign in to keep your elements in your account and find them here.": "Connecte-toi pour garder tes \xE9l\xE9ments dans ton compte et les retrouver ici.", "Loading your saved elements\u2026": "Chargement de tes \xE9l\xE9ments sauvegard\xE9s\u2026", "No saved elements yet. Select elements in your gallery and choose Save to account.": "Aucun \xE9l\xE9ment sauvegard\xE9. S\xE9lectionne des \xE9l\xE9ments dans ta galerie puis choisis Enregistrer dans ton compte.", "Add to gallery": "Ajouter \xE0 la galerie", "Could not load your saved elements.": "Impossible de charger tes \xE9l\xE9ments sauvegard\xE9s.", "Could not load this saved element.": "Impossible de charger cet \xE9l\xE9ment sauvegard\xE9.", "Could not delete this saved element.": "Impossible de supprimer cet \xE9l\xE9ment sauvegard\xE9.", "Could not save to your account. Try again.": "Impossible d'enregistrer dans ton compte. R\xE9essaie.", "Could not load.": "Chargement impossible.", "Save album": "Enregistrer l'album", "Sign in to save": "Connexion pour enregistrer", "Saving\u2026": "Enregistrement\u2026", "Saved": "Enregistr\xE9", "My albums": "Mes albums", "Loading\u2026": "Chargement\u2026", "No saved albums yet. Arrange your notebook, then choose Save album.": "Aucun album sauvegard\xE9. Compose ton carnet, puis choisis Enregistrer l'album.", "Replace the current album? Your unsaved changes will be lost.": "Remplacer l'album actuel ? Tes modifications non enregistr\xE9es seront perdues.", "Replace": "Remplacer", "Untitled album": "Album sans titre", "Could not save the album. Try again.": "Impossible d'enregistrer l'album. R\xE9essaie.", "Could not load your albums.": "Impossible de charger tes albums.", "Could not open this album.": "Impossible d'ouvrir cet album.", "Could not delete this album.": "Impossible de supprimer cet album.", "This saved album is invalid.": "Cet album sauvegard\xE9 est invalide.", "Sign in to save to your account.": "Connecte-toi pour enregistrer dans ton compte.", "Your account storage is full (2 GB). Delete saved photos to free space.": "Ton stockage est plein (2 Go). Supprime des photos sauvegard\xE9es pour lib\xE9rer de la place.", "This photo is too large for your account (15 MB maximum).": "Cette photo est trop lourde pour ton compte (15 Mo maximum).", "This photo format cannot be saved. Try a JPEG or PNG.": "Ce format de photo ne peut pas \xEAtre enregistr\xE9. Essaie un JPEG ou PNG.", "This element is too large to save (the audio recording may be too long).": "Cet \xE9l\xE9ment est trop lourd \xE0 enregistrer (l'enregistrement audio est peut-\xEAtre trop long).", "This album is too large to save. Try removing audio messages.": "Cet album est trop lourd \xE0 enregistrer. Essaie de retirer les messages audio.", "A saved photo is missing from your account.": "Une photo sauvegard\xE9e est introuvable dans ton compte.", "The local copy of this photo can no longer be read. Keep this tab open and replace it with the original file to save it.": "La copie locale de cette photo n'est plus lisible. Garde cet onglet ouvert et remplace-la par le fichier d'origine pour l'enregistrer." });
Object.assign(FR, { "Notebooks": "Notebooks", "Open": "Ouvrir", "Sign in to find the elements and notebooks saved in your account.": "Connecte-toi pour retrouver les \xE9l\xE9ments et carnets sauvegard\xE9s dans ton compte.", "Loading your notebooks\u2026": "Chargement de tes carnets\u2026", "No saved notebooks yet. Arrange your notebook in Album Studio, then choose Save album.": "Aucun notebook sauvegard\xE9. Compose ton carnet dans Album Studio, puis choisis Enregistrer l'album.", "Saved to your account - find it in the Saved elements tab.": "Enregistr\xE9 dans ton compte - retrouve-le dans l'onglet \xC9l\xE9ments sauvegard\xE9s." });
Object.assign(FR, { "No saved elements of this type.": "Aucun \xE9l\xE9ment sauvegard\xE9 de ce type." });
Object.assign(FR, { "Name your album": "Nomme ton album", "Album name": "Nom de l'album", "Save": "Enregistrer", "Cancel": "Annuler", "Rename": "Renommer" });
Object.assign(FR, { "Could not rename this album.": "Impossible de renommer cet album." });
Object.assign(FR, { "Download my data": "T\xE9l\xE9charger mes donn\xE9es", "Delete account": "Supprimer mon compte", "Delete your account?": "Supprimer ton compte ?", "This permanently deletes your account, your saved elements, notebooks and photos. This cannot be undone.": "Cette action supprime d\xE9finitivement ton compte, tes \xE9l\xE9ments sauvegard\xE9s, tes notebooks et tes photos. Elle est irr\xE9versible.", "Download my data first": "T\xE9l\xE9charger d\u2019abord mes donn\xE9es", "Delete permanently": "Supprimer d\xE9finitivement", "Deleting\u2026": "Suppression\u2026", "Could not delete your account. Try again.": "Impossible de supprimer ton compte. R\xE9essaie." });
Object.assign(FR, { "You have reached the limit of 2,000 saved elements. Delete a few to save new ones.": "Tu as atteint la limite de 2 000 \xE9l\xE9ments sauvegard\xE9s. Supprimes-en quelques-uns pour en sauvegarder de nouveaux.", "You have reached the limit of 200 saved albums. Delete a few to save new ones.": "Tu as atteint la limite de 200 albums sauvegard\xE9s. Supprimes-en quelques-uns pour en sauvegarder de nouveaux.", "Too many requests. Take a short break and try again in a few minutes.": "Trop de requ\xEAtes. Fais une courte pause puis r\xE9essaie dans quelques minutes." });
Object.assign(FR, { "Open notebook": "Ouvrir le carnet", "Write here": "\xC9crivez ici", "Make your own": "Cr\xE9ez le v\xF4tre", "Caption": "L\xE9gende", "+ 2 pages": "+ 2 pages", "+ Add 2 pages": "+ Ajouter 2 pages", "Loading the album\u2026": "Chargement de l'album\u2026", "Your generated frames are saved here.": "Vos cadres g\xE9n\xE9r\xE9s sont enregistr\xE9s ici.", "This album link is not valid.": "Ce lien d'album n'est pas valide.", "Back to home": "Retour \xE0 l'accueil" });
Object.assign(FR, { "Your generated elements are saved here.": "Vos \xE9l\xE9ments g\xE9n\xE9r\xE9s sont enregistr\xE9s ici." });
Object.assign(FR, { "Not to use the generator. A free Google account saves your elements and notebooks if you want.": "Pas besoin de compte pour utiliser le g\xE9n\xE9rateur ; un compte Google gratuit sert \xE0 sauvegarder tes \xE9l\xE9ments et carnets si tu le souhaites." });
Object.assign(FR, { "Add image": "Ajouter une image", "Change image": "Changer d'image", "\xB7 Computer, phone or paste": "\xB7 Ordinateur, t\xE9l\xE9phone ou collage", "Computer, phone or paste": "Ordinateur, t\xE9l\xE9phone ou collage", "Portrait removal runs on your device. Objects may need manual erasing. First use downloads a model.": "Le d\xE9tourage tourne sur votre appareil. Certains objets demandent un effa\xE7age manuel. La premi\xE8re utilisation t\xE9l\xE9charge un mod\xE8le.", "Remove background": "Supprimer l'arri\xE8re-plan", "Restore image": "Restaurer l'image", "Manual eraser": "Gomme manuelle", "Drag to erase. Restore image to start again.": "Faites glisser pour effacer. Restaurez l'image pour recommencer.", "Sticker name": "Nom du sticker", "White border": "Bordure blanche", "Border colour": "Couleur de la bordure", "Download sticker": "T\xE9l\xE9charger le sticker", "Upload sticker image": "Importer l'image du sticker", "Your note": "Votre note", "Your audio title": "Le titre de votre audio", "Silver video card preview": "Aper\xE7u de la carte vid\xE9o argent\xE9e", "Image that represents the video": "Image qui repr\xE9sente la vid\xE9o", "Reset poster": "R\xE9initialiser l'affiche", "Drive video link": "Lien vid\xE9o Drive", "Drive sharing help": "Aide au partage Drive", "Test link": "Tester le lien", "Only a Drive link, no video upload. QR opens the full shared video. Keep the file shared.": "Uniquement un lien Drive, pas d'import vid\xE9o. Le QR ouvre la vid\xE9o partag\xE9e compl\xE8te. Gardez le fichier partag\xE9." });
Object.assign(FR, { "Front cover": "Couverture avant", "Back cover": "Couverture arri\xE8re" });
Object.assign(FR, { "Privacy": "Confidentialit\xE9", "Legal notice": "Mentions l\xE9gales" });
Object.assign(FR, { "Choose a file, use your phone, or paste a copied image.": "Choisis un fichier, utilise ton t\xE9l\xE9phone ou colle une image copi\xE9e.", "Copy the image itself, for example from Google Images, then paste it here.": "Copie l\u2019image elle-m\xEAme, par exemple depuis Google Images, puis colle-la ici.", "Paste copied image": "Coller l\u2019image copi\xE9e", "Paste image here": "Colle l\u2019image ici", "Paste image here (Ctrl/Cmd + V)": "Colle l\u2019image ici (Ctrl/Cmd + V)", "Importing image\u2026": "Import de l\u2019image\u2026", "No camera? Open": "Pas d\u2019appareil photo ? Ouvrez", "on your phone.": "sur votre t\xE9l\xE9phone." });
Object.assign(FR, { "Choose one image.": "Choisissez une seule image." });
Object.assign(FR, { "Your privacy": "Votre vie priv\xE9e", "InstaFrame stores your name, email and the photos and notebooks you save, hosted in the European Union, to provide the service.": "InstaFrame stocke vos nom, e-mail ainsi que les photos et carnets que vous enregistrez, h\xE9berg\xE9s dans l\u2019Union europ\xE9enne, pour fournir le service.", "I have read and accept the privacy policy.": "J\u2019ai lu et j\u2019accepte la politique de confidentialit\xE9.", "Continue": "Continuer", "Could not save your choice. Try again.": "Impossible d\u2019enregistrer votre choix. R\xE9essayez." });
Object.assign(FR, { "We receive your name, email address and Google profile picture to create your account. We never access your contacts, Drive or other Google photos.": "Nous recevons votre nom, votre adresse e-mail et votre photo de profil Google pour cr\xE9er votre compte. Nous n'acc\xE9dons ni \xE0 vos contacts, ni \xE0 votre Drive, ni \xE0 vos autres photos Google.", "Privacy policy": "Politique de confidentialit\xE9" });
Object.assign(FR, { "Storage": "Stockage", "Storage is filling up. Delete elements to free up space.": "Le stockage se remplit. Supprimez des \xE9l\xE9ments pour lib\xE9rer de la place.", "Storage almost full. Delete elements to free up space.": "Stockage presque plein. Supprimez des \xE9l\xE9ments pour lib\xE9rer de la place.", "Storage full. Delete elements to free up space.": "Stockage plein. Supprimez des \xE9l\xE9ments pour lib\xE9rer de la place." });
Object.assign(FR, { "Pricing": "Tarifs", "Three plans, one notebook. Choose the one that fits your story.": "Trois offres, un carnet. Choisissez celle qui va avec votre histoire.", "Populaire": "Populaire", "/ month": " / mois", "Coming soon": "Bient\xF4t disponible", "Gratuit": "Gratuit" });
Object.assign(FR, { "What is InstaFrame?": "Qu'est-ce qu'InstaFrame ?", "InstaFrame is a small studio to turn your photos into printable frames, stickers and notebooks. The generator works without an account; signing in saves your elements and albums.": "InstaFrame est un petit studio pour transformer vos photos en cadres, stickers et carnets imprimables. Le g\xE9n\xE9rateur fonctionne sans compte ; la connexion sauvegarde vos \xE9l\xE9ments et vos albums.", "Is InstaFrame free?": "InstaFrame est-il gratuit ?", "Yes. The free plan includes 2 GB of storage for your photos and elements. Paid plans with more storage will come later.": "Oui. L'offre gratuite comprend 2 Go de stockage pour vos photos et vos \xE9l\xE9ments. Des offres payantes avec plus de stockage viendront plus tard.", "What do you receive from Google when I sign in?": "Que recevez-vous de Google quand je me connecte ?", "We receive your name, email address and Google profile picture to create your account. We never access your contacts, Drive or other Google photos.": "Nous recevons votre nom, votre adresse e-mail et votre photo de profil Google pour cr\xE9er votre compte. Nous n'acc\xE9dons ni \xE0 vos contacts, ni \xE0 votre Drive, ni \xE0 vos autres photos Google.", "Can I export my data?": "Puis-je exporter mes donn\xE9es ?", "Yes. You can export your account data as a JSON file at any time from your account menu.": "Oui. Vous pouvez exporter les donn\xE9es de votre compte en fichier JSON \xE0 tout moment depuis le menu compte.", "What happens when I delete my account?": "Que se passe-t-il quand je supprime mon compte ?", "Your data is deleted from the service immediately, and purged from backups within 30 days.": "Vos donn\xE9es sont supprim\xE9es du service imm\xE9diatement, puis purg\xE9es des sauvegardes sous 30 jours.", "How much do the paid plans cost?": "Combien co\xFBtent les offres payantes ?", "Paid plans are not available yet. The pricing page will list them when they launch; the free plan stays.": "Les offres payantes ne sont pas encore disponibles. La page tarifs les listera \xE0 leur lancement ; l'offre gratuite reste." });
Object.assign(FR, {
  "Welcome": "Bienvenue",
  "Put your photos in frames, build a notebook, share it with a link. Want a 30-second tour?": "Mets tes photos dans des cadres, compose un carnet, partage-le par un lien. Un tour de 30 secondes ?",
  "Show me": "Montre-moi",
  "Skip": "Passer",
  "Next": "Suivant",
  "Take the tour": "Revoir le guide",
  "Photos received.": "Photos re\xE7ues.",
  "Start here: add photos from your computer or your phone, with a QR code.": "Commence ici : ajoute des photos depuis ton ordinateur ou ton t\xE9l\xE9phone, avec un QR code.",
  "Choose a frame, then adjust your photo: filters, zoom and caption.": "Choisis un cadre, puis ajuste ta photo : filtres, zoom et l\xE9gende.",
  "Save your frames to your account and generate your album from the gallery.": "Enregistre tes cadres dans ton compte et compose ton carnet depuis la galerie.",
  "Nothing saved yet. Make a frame in the generator, then choose Save to account.": "Rien d'enregistr\xE9 pour l'instant. Cr\xE9ez un cadre dans le g\xE9n\xE9rateur, puis choisissez Enregistrer dans le compte.",
  "Open the generator": "Ouvrir le g\xE9n\xE9rateur",
  "No notebooks yet. Compose yours in Album Studio, then choose Save album.": "Pas encore de carnet. Composez le v\xF4tre dans le Studio Album, puis choisissez Enregistrer l'album."
});
Object.assign(FR, {
  "$2.99": "2,99 $",
  "$5.99": "5,99 $",
  "Create your notebook": "Cr\xE9ez votre carnet",
  "Generators stay free. Creating the notebook is part of the paid plans.": "Les g\xE9n\xE9rateurs restent gratuits. La cr\xE9ation du carnet fait partie des offres payantes.",
  "Create the notebook with your elements": "Cr\xE9ez le carnet avec vos \xE9l\xE9ments",
  "Notebook web preview": "Aper\xE7u web du carnet",
  "Everything in Basic, plus:": "Tout Basic, plus :",
  "Messages, Photos,": "Messages, Photos,",
  "Combinations": "Combinaisons",
  "Choose Basic": "Choisir Basic",
  "Choose Premium": "Choisir Premium",
  "Compare plans in detail >": "Comparer les offres en d\xE9tail >",
  "No real payment yet.": "Aucun paiement r\xE9el pour l'instant.",
  "Payments are not in place yet. Your work is saved, and the generators stay free.": "Les paiements ne sont pas encore en place. Votre travail est sauvegard\xE9 et les g\xE9n\xE9rateurs restent gratuits.",
  "Close": "Fermer",
  "Premium generators": "G\xE9n\xE9rateurs Premium",
  "This generator is part of the Premium plan. The free generators stay available.": "Ce g\xE9n\xE9rateur fait partie de l'offre Premium. Les g\xE9n\xE9rateurs gratuits restent accessibles.",
  "Premium generators:": "G\xE9n\xE9rateurs premium :",
  "Messages, Photos (frames,": "Messages, Photos (cadres,",
  "Strip), Combinations": "Strip), Combinaisons",
  "Recommended": "Recommand\xE9e",
  "You already have Basic": "Vous avez d\xE9j\xE0 Basic",
  "Payments are not in place yet. Your work is saved, and the free generators stay available.": "Le paiement n'est pas encore en place. Votre travail est conserv\xE9, les g\xE9n\xE9rateurs gratuits restent accessibles.",
  "Premium": "Premium",
  "No real payment yet. The free plan and the generators stay free.": "Aucun paiement r\xE9el pour l'instant. L'offre gratuite et les g\xE9n\xE9rateurs restent gratuits."
});
Object.assign(FR, {
  "Show more frames": "Afficher plus de frames"
});
Object.assign(FR, {
  "On this device": "Sur cet appareil",
  "On my phone (QR code)": "Sur mon t\xE9l\xE9phone (QR code)",
  "Preparing\u2026": "Pr\xE9paration\u2026",
  "Scan this code with your phone. The link works for 1 hour.": "Scannez ce code avec votre t\xE9l\xE9phone. Le lien fonctionne pendant 1 heure.",
  "QR code to download on your phone": "QR code pour t\xE9l\xE9charger sur votre t\xE9l\xE9phone",
  "Done": "Termin\xE9",
  "Could not prepare the phone download.": "Impossible de pr\xE9parer le t\xE9l\xE9chargement sur t\xE9l\xE9phone.",
  "Could not reach the server. Try again.": "Impossible de joindre le serveur. R\xE9essayez."
});
Object.assign(FR, {
  "Loading photo\u2026": "Chargement de la photo\u2026"
});
Object.assign(FR, { "How do I import my photos?": "Comment importer mes photos ?", "In the generator, drag and drop a photo onto the frame or tap Upload. Photos are resized on your device before being sent, then stored in your account (2 GB free).": "Dans le g\xE9n\xE9rateur, glissez-d\xE9posez une photo sur le cadre ou touchez Importer. Les photos sont r\xE9duites sur votre appareil avant l'envoi, puis conserv\xE9es dans votre compte (2 Go gratuits).", "Where do I find my notebook?": "O\xF9 retrouver mon carnet ?", "Sign in, then open the Saved notebooks page from your account. Any notebook you saved is there and reopens in Album Studio.": "Connectez-vous, puis ouvrez la page Carnets sauvegard\xE9s depuis votre compte. Chaque carnet sauvegard\xE9 s'y trouve et se rouvre dans le Studio Album.", "How do I share my notebook?": "Comment partager mon carnet ?", "From Album Studio, use Share to create a link you can send to anyone. The link stays viewable for 30 days.": "Depuis le Studio Album, utilisez Partager pour cr\xE9er un lien \xE0 envoyer. Le lien reste visible pendant 30 jours." });
Object.assign(FR, { "How do I contact support?": "Comment contacter le support ?", "Email contact@instaframe.fr. You can also use the feedback bubble on any page to report a problem with a screenshot.": "\xC9crivez \xE0 contact@instaframe.fr. Vous pouvez aussi utiliser la bulle de feedback sur n'importe quelle page pour signaler un probl\xE8me avec une capture." });
Object.assign(FR, { "This page is not available.": "Cette page n'est pas disponible." });
Object.assign(FR, { "Only your name, email and Google picture.": "Seuls votre nom, votre e-mail et votre photo Google." });
var __autosaveNote = {
  "Signed in: your notebook saves automatically to your account.": "Connect\xE9 : ton carnet est automatiquement sauvegard\xE9 dans ton compte.",
  "Sign in with Google to use Album Studio. Your notebook saves automatically to your account.": "Connecte-toi avec Google pour utiliser le Studio Album. Ton carnet est automatiquement sauvegard\xE9 dans ton compte.",
  "Sign in with Google": "Se connecter avec Google"
};
Object.assign(FR, __autosaveNote);
Object.assign(FR, {
  "Name your notebook: autosaved notebooks left unnamed are removed after 30 days.": "Nomme ton carnet : les carnets sauvegard\xE9s automatiquement rest\xE9s sans nom sont supprim\xE9s apr\xE8s 30 jours.",
  "Name it": "Le nommer"
});
Object.assign(FR, { "Delete this notebook permanently? This cannot be undone.": "Supprimer d\xE9finitivement ce carnet ? Cette action est irr\xE9versible.", "Delete this element permanently? This cannot be undone.": "Supprimer d\xE9finitivement cet \xE9l\xE9ment ? Cette action est irr\xE9versible.", "Delete": "Supprimer" });
Object.assign(FR, { "Try a new QR code": "Cr\xE9er un nouveau QR code", "This photo is empty. Choose another file.": "Cette photo est vide. Choisissez un autre fichier." });
Object.assign(FR, { "Could not check your privacy choice. Try again.": "Impossible de v\xE9rifier votre choix de confidentialit\xE9. R\xE9essayez.", "Checking your privacy choice\u2026": "V\xE9rification de votre choix de confidentialit\xE9\u2026", "Try again": "R\xE9essayer", "Could not sign out. Try again.": "Impossible de se d\xE9connecter. R\xE9essaie." });
Object.assign(FR, { "Fill every photo in the strip before adding or downloading it.": "Remplis toutes les photos de la bande avant de l\u2019ajouter ou de la t\xE9l\xE9charger.", "This letter does not fit on one page. Shorten the text or reduce the text size.": "Cette lettre ne tient pas sur une page. Raccourcis le texte ou r\xE9duis sa taille." });
Object.assign(FR, { "Enter a valid date, such as 12 October 2026 or 2026-10-12.": "Saisis une date valide, par exemple 12 octobre 2026 ou 2026-10-12.", "Image not readable. Try again.": "Image illisible. R\xE9essaie." });
Object.assign(FR, {
  "Start free": "Commencer gratuitement",
  "\u25A3 30-second tour": "\u25A3 Visite en 30 secondes",
  "No account needed to start": "Sans compte pour commencer",
  "Import photos by QR code": "Importe tes photos par QR code",
  "What you can create": "Ce que tu peux cr\xE9er",
  "Plans": "Formules",
  "Start free. Upgrade when you're ready": "Commence gratuitement. Passe \xE0 la suite quand tu es pr\xEAt",
  "to send it.": "\xE0 l\u2019envoyer.",
  "forever": "pour toujours",
  "Create and fill your notebook.": "Cr\xE9e et remplis ton carnet.",
  "7 elements: Frames, Post-its, Audio, Music, Stamps, Stickers, Video": "7 \xE9l\xE9ments : cadres, Post-its, audio, musique, timbres, stickers, vid\xE9o",
  "Google sign-in to use Album Studio": "Connexion Google pour utiliser Studio Album",
  "Proposal": "Proposition",
  "Everything in Free": "Tout ce qui est inclus gratuitement",
  "Digital sending, to be confirmed": "Envoi num\xE9rique, \xE0 confirmer",
  "Offer details to be confirmed": "D\xE9tails de l\u2019offre \xE0 confirmer",
  "Everything in Basic": "Tout ce qui est inclus dans Basic",
  "Extra formats, variants and compositions": "Formats, variantes et compositions suppl\xE9mentaires",
  "Later, get your physical notebook delivered. Price and contents to be defined. No purchases or orders are available here.": "Plus tard, fais-toi livrer ton carnet physique. Prix et contenu \xE0 d\xE9finir. Aucun achat ni aucune commande ne sont possibles ici.",
  "Still unsure? Open the generator: it is free and needs no account.": "Encore une h\xE9sitation ? Ouvre le g\xE9n\xE9rateur : il est gratuit et sans compte.",
  "our first trip": "notre premier voyage",
  "for you": "pour toi",
  "just because \u2661": "juste comme \xE7a \u2661"
});
Object.assign(FR, {
  "Take the time to create something for that special person": "Prends le temps de cr\xE9er quelque chose pour cette personne qui compte",
  "How it works": "Comment \xE7a marche",
  "Three steps to say I care about you": "Trois \xE9tapes pour dire je tiens \xE0 toi",
  "Instax Mini and Polaroid frames, ready in seconds": "Des cadres Instax Mini et Polaroid, pr\xEAts en quelques secondes",
  "Create your photo elements, then add stickers, drawings and words in the editor.": "Cr\xE9e tes \xE9l\xE9ments photo, puis ajoute des stickers, des dessins et des mots dans l\u2019\xE9diteur.",
  "This is where it becomes personal. Arrange your elements on black pages, write the words you would never text, draw with the stylus - then preview your notebook and create a link to share it.": "C\u2019est ici que \xE7a devient personnel. Dispose tes \xE9l\xE9ments sur des pages noires, \xE9cris les mots que tu n\u2019enverrais jamais par message, dessine au stylet, puis regarde l\u2019aper\xE7u de ton carnet et cr\xE9e un lien pour le partager.",
  "Birthdays, anniversaries, or just because.": "Anniversaires, dates \xE0 c\xE9l\xE9brer, ou juste comme \xE7a.",
  "If someone matters to you, an album of your shared moments beats another gift card.": "Si quelqu\u2019un compte pour toi, un album de vos moments partag\xE9s vaut mieux qu\u2019une autre carte cadeau.",
  "What you took the time to make, they will keep.": "Ce que tu as pris le temps de cr\xE9er, cette personne le gardera.",
  "A gift they can hold": "Un cadeau \xE0 garder entre les mains",
  '\u266B Post-it \xB7 "you & me"': '\u266B Post-it \xB7 "toi et moi"'
});
Object.assign(FR, {
  "Most chosen for gifts": "Le plus choisi pour offrir",
  "Make the notebook and send it.": "Cr\xE9e ton carnet et envoie-le.",
  "Send and share your notebook with a private link": "Envoie et partage ton carnet avec un lien priv\xE9",
  "Free reading for the person who receives it": "Lecture gratuite pour la personne qui le re\xE7oit",
  "Choose Basic": "Choisir Basic",
  "Choose Premium": "Choisir Premium",
  "Pro mode for the most personal notebooks.": "Le mode Pro pour les carnets les plus personnels.",
  "Pro mode: Letter, Messages, Date, Combination": "Mode Pro : Lettre, Messages, Date, Combinaison",
  "Later, get your physical notebook delivered. Pick a print pack, or shop frames, crayons and stickers individually.": "Plus tard, fais-toi livrer ton carnet physique. Choisis un pack d\u2019impression, ou des cadres, crayons et stickers \xE0 l\u2019unit\xE9.",
  "Prices in USD. Not included in the offers above: the delivered physical notebook.": "Prix en dollars US. Le carnet physique livr\xE9 n\u2019est pas inclus dans les offres ci-dessus."
});
Object.assign(FR, {
  "Checking your session\u2026": "V\xE9rification de ta connexion\u2026",
  "No notebooks yet. Compose yours in Album Studio. Your notebook saves automatically to your account.": "Pas encore de carnet. Compose le tien dans Studio Album. Ton carnet est automatiquement sauvegard\xE9 dans ton compte."
});
Object.assign(FR, { "Could not load this album. Try again.": "Impossible de charger ce carnet. R\xE9essaie.", "This shared album is invalid.": "Ce carnet partag\xE9 n\u2019est pas valide." });
Object.assign(FR, { "Crop \xB7 Zoom \xB7 Caption": "Recadrer \xB7 Zoomer \xB7 L\xE9gender", "Photos": "Photos", "Text": "Texte", "Draw": "Dessiner" });
Object.assign(FR, { Notebooks: "Carnets" });
Object.assign(FR, { "Generated elements save automatically to your account.": "Les \xE9l\xE9ments g\xE9n\xE9r\xE9s sont sauvegard\xE9s automatiquement dans ton compte.", "Sign in with Google to save new generated elements automatically.": "Connecte-toi avec Google pour sauvegarder automatiquement les nouveaux \xE9l\xE9ments g\xE9n\xE9r\xE9s.", "No saved elements yet. New generated elements save here automatically when you are signed in.": "Aucun \xE9l\xE9ment sauvegard\xE9. Les nouveaux \xE9l\xE9ments g\xE9n\xE9r\xE9s sont sauvegard\xE9s ici automatiquement quand tu es connect\xE9." });
Object.assign(FR, { "Add some note text first.": "Ajoutez du texte \xE0 la note avant de continuer." });
Object.assign(FR, { "Skip to content": "Aller au contenu" });
Object.assign(FR, {
  "Paste cover image": "Coller la pochette",
  "Paste music cover": "Coller une pochette musicale",
  "Copy an image, not a link, then paste it here.": "Copie une image, pas un lien, puis colle-la ici.",
  "Could not import this image. Copy another image and try again.": "Impossible d'importer cette image. Copiez une autre image et r\xE9essayez.",
  "Use Paste in the box below, or Ctrl/Cmd + V.": "Collez dans la zone ci-dessous, ou utilisez Ctrl/Cmd + V.",
  "Download letter": "T\xE9l\xE9charger la lettre"
});
Object.assign(FR, { "Collect your frames in the gallery, then create a notebook. Sign in for automatic saving to your account.": "Rassemble tes cadres dans la galerie, puis cr\xE9e un carnet. Connecte-toi pour la sauvegarde automatique dans ton compte." });
Object.assign(FR, { "Previous step": "Pr\xE9c\xE9dent" });
Object.assign(FR, { "Microphone blocked. Allow microphone access in your browser and device settings, or upload an audio file.": "Micro bloqu\xE9. Autorisez le micro dans les r\xE9glages du navigateur et de votre appareil, ou importez un fichier audio." });
Object.assign(FR, { "Recording failed. Try again.": "L'enregistrement a \xE9chou\xE9. R\xE9essayez.", "Audio recording is not supported in this browser. Upload an audio file instead.": "Ce navigateur ne permet pas l'enregistrement audio. Importez un fichier audio \xE0 la place." });
Object.assign(FR, { "Use a complete https music link, for example from Spotify or Apple Music.": "Utilisez un lien musical https complet, par exemple Spotify ou Apple Music." });
Object.assign(FR, { "Starting\u2026": "D\xE9marrage\u2026", "Could not set up the phone link. Check your connection, close this window and try again, or upload from this computer.": "Impossible de pr\xE9parer le lien avec votre t\xE9l\xE9phone. V\xE9rifiez votre connexion, fermez cette fen\xEAtre et r\xE9essayez, ou importez depuis cet ordinateur." });
Object.assign(FR, { "Could not read file.": "Impossible de lire le fichier. R\xE9essayez avec un autre fichier." });
Object.assign(FR, { "Try YouTube player": "Essayer le lecteur YouTube", "Close YouTube player": "Fermer le lecteur YouTube", "Tap Play in the YouTube player. Some videos cannot be embedded. The player stays visible; no audio is extracted.": "Appuyez sur Lecture dans le lecteur YouTube. Certaines vid\xE9os refusent l'int\xE9gration. Le lecteur reste visible ; aucun audio n'est extrait." });
Object.assign(FR, { "Eraser diameter": "Diam\xE8tre de la gomme", "Drag to erase. Restore image to start again.": "Glissez pour gommer. Restaurez l'image pour recommencer." });
Object.assign(FR, { "Not saved to your account.": "Pas encore enregistr\xE9 dans ton compte." });
Object.assign(FR, { "Gallery": "Galerie" });
Object.assign(FR, { "Saved": "Enregistr\xE9s" });
Object.assign(FR, { "Get Inspired": "Inspiration", "Generate Elements": "Cr\xE9er mes \xE9l\xE9ments", "Album Studio": "Album Studio" });
Object.assign(FR, {
  "Your galleries are empty for now. Create elements in the other tabs first.": "Tes galeries sont vides pour l'instant. Cr\xE9e d'abord des \xE9l\xE9ments dans les autres onglets.",
  "YOUR ELEMENTS": "TES \xC9L\xC9MENTS",
  "Click to add": "Clique pour ajouter",
  "Click to edit": "Clique pour modifier"
});
Object.assign(FR, {
  "Generator": "G\xE9n\xE9rateur",
  "Shop": "Boutique",
  "Album Studio": "Studio Album",
  "InstaFrame Generator": "G\xE9n\xE9rateur InstaFrame",
  "Stylus": "Stylet",
  "Close elements": "Fermer les \xE9l\xE9ments",
  "My notebook": "Mon carnet",
  "Saved automatically": "Enregistr\xE9 automatiquement",
  "Open the Generator": "Ouvrir le g\xE9n\xE9rateur",
  "Add elements to your gallery in the Generator.": "Ajoutez des \xE9l\xE9ments \xE0 votre galerie dans le G\xE9n\xE9rateur.",
  "Your note will appear here": "Votre note appara\xEEtra ici",
  "Preview is not ready yet": "L'aper\xE7u n'est pas encore pr\xEAt",
  "Add an element to your gallery first": "Ajoutez d'abord un \xE9l\xE9ment \xE0 votre galerie",
  "Please wait": "Veuillez patienter",
  "Applying the filter": "Application du filtre",
  "Import in progress": "Import en cours",
  "Loading": "Chargement",
  "Remove 2 pages": "Retirer 2 pages",
  "Remove the last 2 pages": "Retirer les 2 derni\xE8res pages",
  "A notebook keeps at least 2 pages, plus the cover.": "Un carnet garde au moins 2 pages, plus la couverture.",
  "Remove the last 2 pages? They are not empty.": "Retirer les 2 derni\xE8res pages ? Elles ne sont pas vides.",
  "Added to your gallery.": "Ajout\xE9 \xE0 ta galerie.",
  "Note text on the preview": "Texte de la note sur l\u2019aper\xE7u",
  "Video import is part of Premium.": "L\u2019import vid\xE9o fait partie de Premium."
});
Object.assign(FR, { "Erase": "Effacer", "Restore": "Restaurer", "Brush diameter": "Diam\xE8tre du pinceau", "Erase removes parts of the sticker; Restore paints the original image back. Restore image resets everything.": "Effacer retire des parties du sticker ; Restaurer repeint l'image d'origine au pinceau. Restaurer l'image r\xE9initialise tout." });
Object.assign(FR, {
  "No sound was captured. Your existing audio was kept. Check your microphone before recording again.": "Aucun son n'a \xE9t\xE9 capt\xE9. Votre audio existant a \xE9t\xE9 conserv\xE9. V\xE9rifiez le micro avant d'enregistrer \xE0 nouveau.",
  "Could not verify the recording. Your existing audio was kept. Download this recording before trying again.": "Impossible de v\xE9rifier l'enregistrement. Votre audio existant a \xE9t\xE9 conserv\xE9. T\xE9l\xE9chargez cet enregistrement avant de r\xE9essayer.",
  "Download recording": "T\xE9l\xE9charger l'enregistrement"
});
Object.assign(FR, { "Preparing audio\u2026": "Pr\xE9paration de l'audio\u2026" });
Object.assign(FR, {
  "A memory book to create": "Carnet de souvenirs \xE0 cr\xE9er",
  "our-memories.notebook": "nos-souvenirs.carnet",
  "For you": "Pour toi",
  "For you \u2661": "Pour toi \u2661",
  "Someone took the time.": "Quelqu'un a pris le temps.",
  "QR import": "Import QR",
  "Send photos from your phone.": "Envoie tes photos depuis ton t\xE9l\xE9phone.",
  "Birthdays": "Anniversaires",
  "Dates that matter": "Dates qui comptent",
  "Just because": "Juste parce que",
  "A notebook passed in class": "Un carnet pass\xE9 en classe",
  "Black pages": "Pages noires",
  "Handwritten captions": "L\xE9gendes \xE0 la main",
  "Step 01": "\xC9tape 01",
  "Step 02": "\xC9tape 02",
  "Step 03": "\xC9tape 03",
  "My elements": "Mes \xE9l\xE9ments",
  "Music and audio players, stamps, post-its, video: each element gets its pixel icon, like on an old desktop.": "Musique et audio en lecteur, timbres, post-its, vid\xE9o : chaque \xE9l\xE9ment a son ic\xF4ne pixel, comme sur un vieux bureau.",
  "The generator": "Le g\xE9n\xE9rateur",
  "Your photos in real Instax and Polaroid frames": "Vos photos dans de vrais cadres Instax et Polaroid",
  "Summer 2026": "\xC9t\xE9 2026",
  "Add to gallery": "Ajouter \xE0 la galerie",
  "just you and me": "juste toi et moi",
  "What's the occasion?": "C'est pour quelle occasion ?",
  "Birthdays, dates that matter, or just because.": "Anniversaires, dates qui comptent, ou juste parce que.",
  "Conversation": "Conversation",
  "30-second tour": "Visite de 30 secondes",
  "Some memories deserve better than a camera roll": "Certains souvenirs m\xE9ritent mieux qu'une pellicule de t\xE9l\xE9phone",
  "Take the time to create something for": "Prenez le temps de cr\xE9er quelque chose pour",
  "that special person": "cette personne sp\xE9ciale",
  "Post-its": "Post-its",
  "Audio": "Audio"
});
Object.assign(FR, {
  "Phone": "T\xE9l\xE9phone",
  "Choose a file": "Choisir un fichier",
  "Video file (under 1 minute)": "Vid\xE9o de moins d\u2019une minute",
  "Cover image shown before playback": "Image affich\xE9e avant la lecture",
  "Type directly on the note.": "\xC9cris directement sur la note."
});
Object.assign(FR, {
  "In preparation": "En pr\xE9paration",
  "The shop is taking shape.": "La boutique prend forme.",
  "A little more time behind the scenes. For now, you can explore a read-only preview.": "Encore un peu de travail en coulisses. En attendant, d\xE9couvre un aper\xE7u en lecture seule.",
  "Nothing is available to buy yet.": "Aucun achat n'est disponible pour l'instant.",
  "See the preview": "Voir l'aper\xE7u",
  "Coming soon": "Bient\xF4t",
  "Preview only. No cart or orders.": "Aper\xE7u uniquement. Ni panier, ni commande."
});
Object.assign(FR, {
  "My account": "Mon compte",
  "Owner console": "Console propri\xE9taire",
  "Sign in to manage your account.": "Connecte-toi pour g\xE9rer ton compte."
});
Object.assign(FR, {
  "Try it": "Tester"
});

// isolated:pure-i18n
var language = "en";
var setRenderLanguage = (lang) => {
  language = lang === "fr" ? "fr" : "en";
};
var translate = (s2) => language === "fr" ? FR[s2] ?? s2 : s2;

// rendering-source/src/lib/youtube.ts
function youtubeVideoId(value) {
  try {
    const u2 = new URL(value);
    if (u2.protocol !== "https:" && u2.protocol !== "http:") return null;
    const host = u2.hostname.toLowerCase().replace(/^www\./, "");
    let id2 = null;
    if (host === "youtu.be") id2 = u2.pathname.split("/")[1];
    else if (["youtube.com", "m.youtube.com", "music.youtube.com"].includes(host)) {
      if (u2.pathname === "/watch") id2 = u2.searchParams.get("v");
      else if (/^\/(shorts|embed|live)\//.test(u2.pathname)) id2 = u2.pathname.split("/")[2];
    }
    return id2 && /^[A-Za-z0-9_-]{11}$/.test(id2) ? id2 : null;
  } catch {
    return null;
  }
}

// rendering-source/src/lib/pro-assets.ts
var FONTS = {
  "Pinyon Script": "/pro/PinyonScript-Regular.ttf",
  "Great Vibes": "/pro/GreatVibes-Regular.ttf",
  "UnifrakturCook": "/pro/UnifrakturCook-Bold.ttf",
  "Cormorant Garamond": "/pro/CormorantGaramond-Italic.ttf"
};
var IMAGES = {
  parchment: "/pro/parch_tex.jpg",
  seal: "/pro/seal_red.png",
  flourish: "/pro/flourish.png"
};
var fontsReady = null;
function ensureProFonts() {
  if (!fontsReady) {
    fontsReady = (async () => {
      await Promise.all(Object.entries(FONTS).map(async ([family, url]) => {
        const face = new FontFace(family, `url(${url})`, family === "Cormorant Garamond" ? { style: "italic" } : {});
        await face.load();
        document.fonts.add(face);
      }));
    })().catch(() => {
      fontsReady = null;
    });
  }
  return fontsReady;
}
var imageCache = /* @__PURE__ */ new Map();
function proImage(name) {
  let cached = imageCache.get(name);
  if (!cached) {
    cached = new Promise((ok, no) => {
      const img = new Image();
      img.onload = () => ok(img);
      img.onerror = () => {
        imageCache.delete(name);
        no(new Error(`Could not load ${name} asset.`));
      };
      img.src = IMAGES[name];
    });
    imageCache.set(name, cached);
  }
  return cached;
}
var LETTER_FONT_FAMILY = {
  Calligraphy: "'Pinyon Script', cursive",
  Flourish: "'Great Vibes', cursive",
  Gothic: "'UnifrakturCook', serif",
  Classic: "'Cormorant Garamond', serif"
};

// rendering-source/src/lib/calendar-date.ts
function validCalendarDate(value) {
  if (!value.trim()) return true;
  const months = ["january|janvier", "february|f\xE9vrier|fevrier", "march|mars", "april|avril", "may|mai", "june|juin", "july|juillet", "august|ao\xFBt|aout", "september|septembre", "october|octobre", "november|novembre", "december|d\xE9cembre|decembre"];
  const iso = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const named = value.trim().match(/^(\d{1,2})\s+([A-Za-zÀ-ÿ]+)\s+(\d{4})$/);
  const year = Number(iso?.[1] ?? named?.[3]), month = iso ? Number(iso[2]) : months.findIndex((m) => m.split("|").includes(named?.[2].toLowerCase() ?? "")) + 1, day = Number(iso?.[3] ?? named?.[1]);
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day) || year < 1 || year > 9999 || month < 1 || month > 12 || day < 1) return false;
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  return day <= [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}

// rendering-source/src/lib/pro-letter.ts
var LETTER_SIZE = { w: 360, h: 509 };
var S = LETTER_SIZE.w / 220;
var EDGE = [
  [3e-3, 9e-3],
  [0.075, 1e-3],
  [0.144, 4e-3],
  [0.215, 1e-3],
  [0.283, 4e-3],
  [0.355, 5e-3],
  [0.425, 1e-3],
  [0.502, 4e-3],
  [0.572, 7e-3],
  [0.642, 1e-3],
  [0.717, 6e-3],
  [0.787, 6e-3],
  [0.861, 4e-3],
  [0.931, 4e-3],
  [0.994, 1e-3],
  [0.997, 0.068],
  [0.995, 0.145],
  [0.994, 0.214],
  [0.994, 0.283],
  [0.998, 0.356],
  [0.992, 0.426],
  [0.999, 0.497],
  [1, 0.57],
  [0.994, 0.645],
  [0.997, 0.713],
  [0.997, 0.784],
  [0.992, 0.858],
  [0.997, 0.925],
  [1.002, 0.993],
  [0.931, 0.998],
  [0.858, 0.991],
  [0.786, 0.991],
  [0.712, 0.99],
  [0.639, 0.996],
  [0.568, 0.992],
  [0.501, 0.99],
  [0.431, 0.991],
  [0.357, 0.99],
  [0.288, 0.997],
  [0.218, 0.996],
  [0.14, 0.999],
  [0.071, 0.998],
  [9e-3, 1.004],
  [2e-3, 0.925],
  [5e-3, 0.855],
  [5e-3, 0.788],
  [3e-3, 0.714],
  [9e-3, 0.642],
  [3e-3, 0.575],
  [8e-3, 0.503],
  [7e-3, 0.428],
  [7e-3, 0.36],
  [6e-3, 0.284],
  [3e-3, 0.214],
  [8e-3, 0.143],
  [5e-3, 0.074]
];
function edgePath(x2, w2, h2, scale) {
  x2.beginPath();
  EDGE.forEach(([px, py], i2) => {
    const cx = Math.max(0, Math.min(w2, px * w2 * scale));
    const cy = Math.max(0, Math.min(h2, py * h2 * scale));
    if (i2 === 0) x2.moveTo(cx, cy);
    else x2.lineTo(cx, cy);
  });
  x2.closePath();
}
function wrapLines(x2, text, maxWidth) {
  const words = [];
  for (const word of text.split(/\s+/).filter(Boolean)) {
    let part = "";
    for (const ch of word) {
      if (part && x2.measureText(part + ch).width > maxWidth(0)) {
        words.push(part);
        part = ch;
      } else part += ch;
    }
    if (part) words.push(part);
  }
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (x2.measureText(candidate).width <= maxWidth(lines.length) || !line) line = candidate;
    else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}
async function renderLetter(d2) {
  if (!validCalendarDate(d2.letterDate || "")) throw new Error("Enter a valid date, such as 12 October 2026 or 2026-10-12.");
  await ensureProFonts();
  const { w: w2, h: h2 } = LETTER_SIZE;
  const c2 = document.createElement("canvas");
  c2.width = w2 * 3;
  c2.height = h2 * 3;
  const x2 = c2.getContext("2d");
  x2.scale(3, 3);
  const paper2 = d2.letterPaper || "Parchment";
  const font = LETTER_FONT_FAMILY[d2.letterFont || "Calligraphy"];
  const extras = new Set(d2.letterExtras || []);
  x2.save();
  if (paper2 === "Parchment") edgePath(x2, w2, h2, 1);
  else {
    x2.beginPath();
    x2.roundRect(2, 2, w2 - 4, h2 - 4, paper2 === "Plain" ? 8 : 14);
  }
  x2.clip();
  if (paper2 === "Plain") {
    x2.fillStyle = "#F7EFD9";
    x2.fillRect(0, 0, w2, h2);
  } else {
    const tex = await proImage("parchment");
    const scale = Math.max(w2 / tex.width, h2 / tex.height);
    const sw = tex.width * scale, sh = tex.height * scale;
    x2.drawImage(tex, (w2 - sw) / 2, (h2 - sh) / 2, sw, sh);
    if (paper2 === "Scroll") {
      const roll = x2.createLinearGradient(0, 0, 0, h2);
      roll.addColorStop(0, "#5A341080");
      roll.addColorStop(0.06, "#5A341000");
      roll.addColorStop(0.94, "#5A341000");
      roll.addColorStop(1, "#5A341080");
      x2.fillStyle = roll;
      x2.fillRect(0, 0, w2, h2);
    }
  }
  if (paper2 === "Parchment") {
    const vignette = x2.createRadialGradient(w2 / 2, h2 / 2, Math.min(w2, h2) * 0.35, w2 / 2, h2 / 2, Math.max(w2, h2) * 0.72);
    vignette.addColorStop(0, "#00000000");
    vignette.addColorStop(1, "#6A3E1099");
    x2.fillStyle = vignette;
    x2.fillRect(0, 0, w2, h2);
  }
  x2.restore();
  if (paper2 === "Parchment") {
    const fold = 35.2 * S;
    let g2 = x2.createLinearGradient(0, 0, fold, fold);
    g2.addColorStop(0, "#F6E8C6");
    g2.addColorStop(0.6, "#DDBE80");
    g2.addColorStop(1, "#A9783A");
    x2.fillStyle = g2;
    x2.beginPath();
    x2.moveTo(0, 0);
    x2.lineTo(fold, 0);
    x2.lineTo(0, fold);
    x2.closePath();
    x2.fill();
    g2 = x2.createLinearGradient(w2, h2, w2 - fold, h2 - fold);
    g2.addColorStop(0, "#F6E8C6");
    g2.addColorStop(0.6, "#DDBE80");
    g2.addColorStop(1, "#A9783A");
    x2.fillStyle = g2;
    x2.beginPath();
    x2.moveTo(w2, h2);
    x2.lineTo(w2 - fold, h2);
    x2.lineTo(w2, h2 - fold);
    x2.closePath();
    x2.fill();
  }
  if (extras.has("ornaments")) {
    const flour = await proImage("flourish");
    const fw = 136.4 * S, fh = fw * (flour.height / flour.width);
    x2.save();
    x2.globalAlpha = 0.85;
    x2.drawImage(flour, (w2 - fw) / 2, 16.7 * S, fw, fh);
    x2.restore();
  }
  const margin = 28.6 * S;
  const textTop = 55.5 * S;
  const fontSize = Math.round(11.5 * S * (d2.textSize / 24));
  x2.font = `${fontSize}px ${font}`;
  x2.fillStyle = "#2A1805";
  x2.textAlign = "left";
  x2.textBaseline = "top";
  const lineHeight = fontSize * 1.3;
  const capSize = 36 * S;
  const capLines = 3;
  const hasCapital = extras.has("capital") && d2.text.trim().length > 0;
  const bottomReserve = 40 * S;
  const maxLines = Math.floor((h2 - textTop - bottomReserve - (d2.letterDate ? 14 * S : 0)) / lineHeight);
  const lines = wrapLines(x2, d2.text.trim() || "Write your letter...", (line) => w2 - margin * 2 - (hasCapital && line < capLines ? capSize + 6 * S : 0));
  if (lines.length > maxLines) throw new Error("This letter does not fit on one page. Shorten the text or reduce the text size.");
  if (hasCapital) {
    const capX = margin, capY = textTop;
    const g2 = x2.createLinearGradient(capX, capY, capX + capSize, capY + capSize);
    g2.addColorStop(0, "#2B3F78");
    g2.addColorStop(1, "#1B2A58");
    x2.fillStyle = g2;
    x2.fillRect(capX, capY, capSize, capSize);
    x2.strokeStyle = "#C8A247";
    x2.lineWidth = 2 * S;
    x2.strokeRect(capX + S, capY + S, capSize - 2 * S, capSize - 2 * S);
    x2.strokeStyle = "#7A5A1C";
    x2.lineWidth = S;
    x2.strokeRect(capX - S, capY - S, capSize + 2 * S, capSize + 2 * S);
    x2.font = `${28 * S}px 'UnifrakturCook', serif`;
    x2.fillStyle = "#F0D683";
    x2.textAlign = "center";
    x2.textBaseline = "middle";
    x2.fillText(d2.text.trim()[0].toUpperCase(), capX + capSize / 2, capY + capSize / 2 + S);
    x2.textAlign = "left";
    x2.textBaseline = "top";
    x2.font = `${fontSize}px ${font}`;
    x2.fillStyle = "#2A1805";
  }
  lines.forEach((line, i2) => {
    const indent = hasCapital && i2 < capLines ? capSize + 6 * S : 0;
    x2.fillText(line, margin + indent, textTop + i2 * lineHeight);
  });
  if (d2.letterDate) {
    x2.font = `${9.7 * S}px ${font}`;
    x2.fillStyle = "#3A230A";
    x2.fillText(d2.letterDate, margin, h2 - 30 * S);
  }
  if (extras.has("seal")) {
    const seal = await proImage("seal");
    const ss = 33.3 * S;
    const sx = w2 - margin - ss, sy = h2 - 33 * S - ss;
    x2.save();
    x2.shadowColor = "#0006";
    x2.shadowBlur = 2 * S;
    x2.shadowOffsetY = 2 * S;
    x2.drawImage(seal, sx, sy, ss, ss);
    x2.restore();
    const initial = (d2.text.trim()[0] || "L").toUpperCase();
    x2.font = `700 ${11.5 * S}px 'Pinyon Script', cursive`;
    x2.textAlign = "center";
    x2.textBaseline = "middle";
    x2.fillStyle = "#C85A5A";
    x2.fillText(initial, sx + ss / 2, sy + ss / 2);
    x2.textAlign = "left";
    x2.textBaseline = "top";
  }
  return c2.toDataURL("image/png");
}

// rendering-source/src/lib/pro-date.ts
var DATE_SIZE = { w: 320, h: 400 };
var DATE_CAL_SIZE = { w: 320, h: 360 };
function pad2(n2) {
  return String(n2).padStart(2, "0");
}
function parseDateParts(raw) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const m = raw.trim().match(/^(\d{1,2})\s+([A-Za-zÀ-ÿ]+)\s+(\d{4})$/);
  if (m) {
    const aliases = ["janvier", "f\xE9vrier|fevrier", "mars", "avril", "mai", "juin", "juillet", "ao\xFBt|aout", "septembre", "octobre", "novembre", "d\xE9cembre|decembre"];
    const mi = months.findIndex((name, i2) => name.toLowerCase() === m[2].toLowerCase() || aliases[i2].split("|").includes(m[2].toLowerCase()));
    const month = mi >= 0 ? months[mi] : m[2];
    return { day: m[1], month, year: m[3], numeric: `${pad2(+m[1])} \xB7 ${pad2(mi >= 0 ? mi + 1 : 1)} \xB7 ${m[3]}` };
  }
  const iso = raw.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) return { day: String(+iso[3]), month: months[+iso[2] - 1] || iso[2], year: iso[1], numeric: `${iso[3]} \xB7 ${iso[2]} \xB7 ${iso[1]}` };
  return { day: raw.trim(), month: "", year: "", numeric: raw.trim() };
}
function todayDateLabel() {
  const n2 = /* @__PURE__ */ new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${n2.getDate()} ${months[n2.getMonth()]} ${n2.getFullYear()}`;
}
async function renderDateCard(d2) {
  await ensureTextFont(d2.textFont);
  if (!validCalendarDate(d2.subtitle)) throw new Error("Enter a valid date, such as 12 October 2026 or 2026-10-12.");
  await ensureProFonts();
  const style = d2.dateStyle || "Classic";
  const { w: w2, h: h2 } = style === "Calendar" ? DATE_CAL_SIZE : DATE_SIZE;
  const c2 = document.createElement("canvas");
  c2.width = w2 * 3;
  c2.height = h2 * 3;
  const x2 = c2.getContext("2d");
  x2.scale(3, 3);
  const word = d2.text.trim();
  const label = (d2.dateLabel && d2.dateLabel !== "None" ? d2.dateLabel : "").toUpperCase();
  const parts = parseDateParts(d2.subtitle.trim() || todayDateLabel());
  const dark = style === "Dark";
  x2.fillStyle = dark ? "#171717" : "#FFFFFF";
  x2.beginPath();
  x2.roundRect(0, 0, w2, h2, 10);
  x2.fill();
  if (!dark) {
    x2.strokeStyle = "#E5E0D8";
    x2.lineWidth = 2;
    x2.beginPath();
    x2.roundRect(1, 1, w2 - 2, h2 - 2, 9);
    x2.stroke();
  }
  if (style !== "Calendar") {
    x2.save();
    x2.globalAlpha = 0.5;
    x2.strokeStyle = dark ? "#BBBBBB" : "#737373";
    x2.lineWidth = 1;
    x2.beginPath();
    x2.roundRect(w2 * 0.07, h2 * 0.07, w2 * 0.86, h2 * 0.86, 3);
    x2.stroke();
    x2.restore();
  }
  const ink = dark ? "#FFFFFF" : "#171717";
  const sub = dark ? "#B9B9B9" : "#737373";
  x2.textAlign = "center";
  const SERIF2 = `Georgia, 'Liberation Serif', serif`;
  const wordFont = textFamily(d2.textFont, SERIF2), k = Number.isFinite(d2.textSize) && d2.textSize > 0 ? d2.textSize / 24 : 1;
  const ls = (v) => {
    try {
      x2.letterSpacing = v;
    } catch {
    }
  };
  if (style === "Calendar") {
    const bannerColor = d2.dateColor || "#171717";
    const m = bannerColor.match(/^#([0-9a-f]{6})$/i);
    const lum = m ? (0.299 * parseInt(m[1].slice(0, 2), 16) + 0.587 * parseInt(m[1].slice(2, 4), 16) + 0.114 * parseInt(m[1].slice(4, 6), 16)) / 255 : 0;
    const banner = Math.round(h2 * 0.22);
    x2.fillStyle = bannerColor;
    x2.fillRect(0, 0, w2, banner);
    x2.fillStyle = lum > 0.6 ? "#171717" : "#FFFFFF";
    x2.font = "700 21px Arial";
    x2.textBaseline = "middle";
    ls("4px");
    const monthYear = `${parts.month ? parts.month.slice(0, 3).toUpperCase() + " " : ""}${parts.year}`.trim() || parts.numeric;
    x2.fillText(monthYear, w2 / 2, banner / 2 + 1);
    ls("0px");
    x2.fillStyle = ink;
    x2.font = `700 150px ${wordFont}`;
    x2.textBaseline = "alphabetic";
    x2.fillText(parts.day, w2 / 2, Math.round(h2 * 0.54) + 52);
    if (word) {
      x2.font = `italic 400 ${44 * k}px ${wordFont}`;
      x2.fillStyle = ink;
      const measured = x2.measureText(word).width;
      if (measured > w2 - 40) x2.font = `italic 400 ${44 * k * (w2 - 40) / measured}px ${wordFont}`;
      x2.fillText(word, w2 / 2, Math.round(h2 * 0.87) + 15, w2 - 40);
    }
    return c2.toDataURL("image/png");
  }
  const cx = w2 / 2;
  if (label) {
    x2.font = "700 18px Arial";
    x2.fillStyle = sub;
    ls("3px");
    x2.fillText(label, cx, Math.round(h2 * 0.2) + 6);
    ls("0px");
  }
  if (word) {
    if (style === "Script") {
      x2.font = `54px 'Great Vibes', cursive`;
    } else if (style === "Modern") {
      x2.font = "700 40px Arial";
    } else {
      x2.font = `italic 700 52px ${SERIF2}`;
    }
    x2.fillStyle = ink;
    x2.fillText(word, cx, Math.round(h2 * 0.42) + 19);
  }
  const dy = Math.round(h2 * 0.57);
  x2.strokeStyle = dark ? "#3A3A3A" : "#D8D2C8";
  x2.lineWidth = 2;
  x2.beginPath();
  x2.moveTo(cx - 38, dy);
  x2.lineTo(cx + 38, dy);
  x2.stroke();
  x2.font = style === "Modern" ? "700 24px Arial" : "700 27px Arial";
  ls("2px");
  x2.fillStyle = ink;
  x2.fillText(parts.numeric, cx, Math.round(h2 * 0.7) + 10);
  ls("0px");
  return c2.toDataURL("image/png");
}

// rendering-source/src/lib/pro-messages.ts
var MESSAGES_SIZE = { w: 320, h: 560 };
async function renderScreenshot(d2) {
  const { w: w2, h: h2 } = MESSAGES_SIZE;
  const c2 = document.createElement("canvas");
  c2.width = w2 * 3;
  c2.height = h2 * 3;
  const x2 = c2.getContext("2d");
  x2.scale(3, 3);
  x2.fillStyle = "#FFFFFF";
  x2.beginPath();
  x2.roundRect(0, 0, w2, h2, 26);
  x2.fill();
  x2.strokeStyle = "#E5E0D8";
  x2.lineWidth = 2;
  x2.beginPath();
  x2.roundRect(1, 1, w2 - 2, h2 - 2, 25);
  x2.stroke();
  if (!d2.image) {
    x2.fillStyle = "#F5F5F5";
    x2.beginPath();
    x2.roundRect(14, 14, w2 - 28, h2 - 28, 18);
    x2.fill();
    x2.fillStyle = "#A3A3A3";
    x2.font = "20px Arial";
    x2.textAlign = "center";
    x2.textBaseline = "middle";
    x2.fillText("Add a message screenshot", w2 / 2, h2 / 2);
    return c2.toDataURL("image/png");
  }
  const img = await new Promise((ok, no) => {
    const i2 = new Image();
    i2.onload = () => ok(i2);
    i2.onerror = () => no(new Error("Could not read image."));
    i2.src = d2.image;
  });
  const iw = w2 - 28, ih = h2 - 28;
  const scale = Math.max(iw / img.width, ih / img.height);
  const sw = img.width * scale, sh = img.height * scale;
  x2.save();
  x2.beginPath();
  x2.roundRect(14, 14, iw, ih, 18);
  x2.clip();
  x2.drawImage(img, 14 + (iw - sw) / 2, 14 + (ih - sh) / 2, sw, sh);
  x2.restore();
  return c2.toDataURL("image/png");
}

// rendering-source/src/lib/pro-composition.ts
var COMP_TEMPLATE_SIZES = {
  "Postcard": { w: 740, h: 300 },
  "Concert Ticket": { w: 920, h: 360 }
};
var COMP_ZONES = {
  "Postcard": {
    front: [
      { key: "photo", label: "Photo", accepts: "photo", rect: { x: 14, y: 14, w: 712, h: 218 } },
      { key: "caption", label: "Caption", accepts: "text", rect: { x: 14, y: 240, w: 712, h: 46 }, fields: [{ key: "caption", label: "Caption", placeholder: "Greetings from Biarritz" }] }
    ],
    back: [
      { key: "message", label: "Message", accepts: "text", rect: { x: 24, y: 52, w: 312, h: 210 }, fields: [{ key: "message", label: "Message", multi: true, placeholder: "Dear Alice,\n\nHaving a wonderful time here." }] },
      { key: "address", label: "Address", accepts: "text", rect: { x: 412, y: 92, w: 280, h: 170 }, fields: [{ key: "address", label: "Address", multi: true, placeholder: "Alice Martin\n12 rue des Vignes\n17300 Rochefort" }] },
      { key: "stamp", label: "Stamp", accepts: "stamp", rect: { x: 650, y: 20, w: 60, h: 72 } }
    ]
  },
  "Concert Ticket": {
    front: [
      { key: "photo", label: "Photo", accepts: "photo", rect: { x: 14, y: 14, w: 200, h: 332 } },
      { key: "event", label: "Event", accepts: "text", rect: { x: 262, y: 46, w: 462, h: 110 }, fields: [{ key: "event", label: "Event name", placeholder: "The Midnight Sun Tour" }, { key: "presenter", label: "Presenter", placeholder: "Live Nation presents" }] },
      { key: "date", label: "Date", accepts: "text", rect: { x: 262, y: 182, w: 220, h: 84 }, fields: [{ key: "date", label: "Date", placeholder: "SAT 21 NOV 2026" }, { key: "doors", label: "Doors", placeholder: "Doors 8:00 PM" }] },
      { key: "venue", label: "Venue", accepts: "text", rect: { x: 504, y: 182, w: 220, h: 84 }, fields: [{ key: "venue", label: "Venue", placeholder: "Olympia" }, { key: "city", label: "City", placeholder: "Paris" }] },
      { key: "seat", label: "Seat", accepts: "text", rect: { x: 262, y: 288, w: 462, h: 52 }, fields: [{ key: "section", label: "Section", placeholder: "A" }, { key: "row", label: "Row", placeholder: "12" }, { key: "seat", label: "Seat", placeholder: "34" }, { key: "price", label: "Price", placeholder: "45 \u20AC" }] }
    ],
    back: [
      { key: "message", label: "Message", accepts: "text", rect: { x: 40, y: 56, w: 560, h: 240 }, fields: [{ key: "message", label: "Message", multi: true, placeholder: "A night to remember..." }] }
    ]
  }
};
function textScale(d2) {
  const n2 = d2.textSize;
  return Number.isFinite(n2) && n2 > 0 ? n2 / 24 : 1;
}
function linesFor(k, boxH, lh, original) {
  return k === 1 ? original : Math.max(1, Math.min(original, Math.floor((boxH - 20) / lh)));
}
function loadImage2(src) {
  return new Promise((ok, no) => {
    const i2 = new Image();
    i2.onload = () => ok(i2);
    i2.onerror = () => no(new Error("Could not read image."));
    i2.src = src;
  });
}
function fitWrappedTitle(x2, text, maxW, family = "Arial", k = 1) {
  for (const size of [32, 28, 24, 20, 17, 14, 12].map((n2) => Math.round(n2 * k * 10) / 10)) {
    x2.font = `700 ${size}px ${family}`;
    const lines2 = wrapLines2(x2, text, maxW, 99);
    if (lines2.length <= 3 && lines2.length * size * 1.18 <= 62) return { size, lines: lines2 };
  }
  x2.font = `700 12px ${family}`;
  const lines = wrapLines2(x2, text, maxW, 3);
  const all = wrapLines2(x2, text, maxW, 99);
  if (all.length > 3) {
    let last = lines[lines.length - 1] || "";
    while (last.length > 1 && x2.measureText(`${last}\u2026`).width > maxW) last = last.slice(0, -1);
    lines[lines.length - 1] = `${last}\u2026`;
  }
  return { size: 12, lines };
}
function fillShrinkText(x2, text, cx, y, maxW, weight, sizes, family = "Arial") {
  for (const size of sizes) {
    x2.font = `${weight} ${size}px ${family}`;
    if (x2.measureText(text).width <= maxW) {
      x2.fillText(text, cx, y);
      return;
    }
  }
  x2.font = `${weight} ${sizes[sizes.length - 1]}px ${family}`;
  x2.fillText(text, cx, y, maxW);
}
function wrapLines2(x2, text, maxWidth, maxLines) {
  const out = [];
  for (const raw of text.split("\n")) {
    const words = raw.split(/\s+/).filter(Boolean);
    if (!words.length) {
      out.push("");
      continue;
    }
    let line = "";
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (x2.measureText(candidate).width <= maxWidth || !line) line = candidate;
      else {
        out.push(line);
        line = word;
      }
      if (out.length >= maxLines) return out;
    }
    if (out.length < maxLines && line) out.push(line);
    if (out.length >= maxLines) return out;
  }
  return out.slice(0, maxLines);
}
function drawBarcode(x2, cx, cy, w2, h2, seed) {
  let s2 = [...seed].reduce((a3, c2) => Math.imul(a3, 31) + c2.charCodeAt(0) >>> 0, 7);
  let px = cx - w2 / 2;
  x2.fillStyle = "#1A1A1A";
  while (px < cx + w2 / 2 - 2) {
    s2 = Math.imul(s2, 1664525) + 1013904223 >>> 0;
    const bw = 1 + (s2 >>> 28) % 3;
    if (s2 >>> 9 & 1) x2.fillRect(px, cy - h2 / 2, bw, h2);
    px += bw + 2;
  }
}
function todayStamp() {
  return (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();
}
async function paper(x2, w2, h2, color = "#F7F1E3") {
  x2.fillStyle = color;
  x2.fillRect(0, 0, w2, h2);
  try {
    x2.save();
    x2.globalAlpha = 0.35;
    const tex = await proImage("parchment");
    const ts = Math.max(w2 / tex.width, h2 / tex.height);
    x2.drawImage(tex, (w2 - tex.width * ts) / 2, (h2 - tex.height * ts) / 2, tex.width * ts, tex.height * ts);
    x2.restore();
  } catch {
  }
  x2.strokeStyle = "#D8CCB4";
  x2.lineWidth = 2;
  x2.strokeRect(1, 1, w2 - 2, h2 - 2);
}
function drawEmptyHint(x2, label, cx, cy) {
  x2.save();
  x2.globalAlpha = 0.5;
  x2.fillStyle = "#A08D64";
  x2.font = "15px Arial";
  x2.textAlign = "center";
  x2.textBaseline = "middle";
  x2.fillText(label, cx, cy);
  x2.restore();
}
async function renderPostcardFront(d2, suppressHints = false) {
  await ensureTextFont(d2.textFont);
  const emptyHint = suppressHints ? () => {
  } : drawEmptyHint;
  const { w: w2, h: h2 } = COMP_TEMPLATE_SIZES["Postcard"];
  const c2 = document.createElement("canvas");
  c2.width = w2 * 3;
  c2.height = h2 * 3;
  const x2 = c2.getContext("2d");
  x2.scale(3, 3);
  x2.fillStyle = "#FFFFFF";
  x2.fillRect(0, 0, w2, h2);
  x2.strokeStyle = "#DDD6C4";
  x2.lineWidth = 2;
  x2.strokeRect(1, 1, w2 - 2, h2 - 2);
  const photo = COMP_ZONES["Postcard"].front[0].rect;
  if (d2.image) {
    const img = await loadImage2(d2.image);
    x2.save();
    x2.beginPath();
    x2.rect(photo.x, photo.y, photo.w, photo.h);
    x2.clip();
    const s2 = Math.max(photo.w / img.width, photo.h / img.height);
    const pan = d2.comboPan ?? { x: 0.5, y: 0.5 };
    x2.drawImage(img, photo.x - (img.width * s2 - photo.w) * pan.x, photo.y - (img.height * s2 - photo.h) * pan.y, img.width * s2, img.height * s2);
    x2.restore();
  } else {
    x2.fillStyle = "#EDE7DA";
    x2.fillRect(photo.x, photo.y, photo.w, photo.h);
    emptyHint(x2, "Pick a photo", photo.x + photo.w / 2, photo.y + photo.h / 2);
  }
  const cap = COMP_ZONES["Postcard"].front[1].rect;
  const caption = (d2.comboFields?.caption || d2.text || "").trim();
  x2.textBaseline = "middle";
  if (caption) {
    x2.textAlign = "left";
    x2.fillStyle = "#4A3A22";
    fillShrinkText(x2, caption, cap.x + 6, cap.y + cap.h / 2, cap.w - 120, "italic", [19, 17, 15, 13], "Georgia, serif");
  } else emptyHint(x2, "Add a caption...", cap.x + cap.w / 2 - 40, cap.y + cap.h / 2);
  x2.textAlign = "right";
  x2.font = "11px Arial";
  x2.fillStyle = "#8A7A52";
  x2.fillText(todayStamp(), cap.x + cap.w - 40, cap.y + cap.h / 2);
  return c2.toDataURL("image/png");
}
async function renderPostcardBack(d2, suppressHints = false) {
  await ensureTextFont(d2.textFont);
  const emptyHint = suppressHints ? () => {
  } : drawEmptyHint;
  const { w: w2, h: h2 } = COMP_TEMPLATE_SIZES["Postcard"];
  const c2 = document.createElement("canvas");
  c2.width = w2 * 3;
  c2.height = h2 * 3;
  const x2 = c2.getContext("2d");
  x2.scale(3, 3);
  await paper(x2, w2, h2);
  x2.font = "italic 15px Georgia, serif";
  x2.fillStyle = "#8A7A52";
  x2.textAlign = "left";
  x2.textBaseline = "alphabetic";
  x2.fillText("Postcard", 18, 30);
  x2.strokeStyle = "#C8B88E";
  x2.lineWidth = 1.5;
  x2.beginPath();
  x2.moveTo(370, 30);
  x2.lineTo(370, h2 - 30);
  x2.stroke();
  const msg = COMP_ZONES["Postcard"].back[0].rect;
  const message = (d2.comboFields?.message || "").trim();
  const messageImg = d2.comboImages?.message;
  if (messageImg) {
    const img = await loadImage2(messageImg);
    x2.save();
    x2.beginPath();
    x2.rect(msg.x, msg.y, msg.w, msg.h);
    x2.clip();
    const s2 = Math.max(msg.w / img.width, msg.h / img.height);
    x2.drawImage(img, msg.x + (msg.w - img.width * s2) / 2, msg.y + (msg.h - img.height * s2) / 2, img.width * s2, img.height * s2);
    x2.restore();
  } else {
    const k = textScale(d2), lh = 27 * k;
    x2.textBaseline = "top";
    x2.font = `${21 * k}px ${textFamily(d2.textFont, "'Pinyon Script', cursive")}`;
    x2.fillStyle = "#2B4C9A";
    if (message) wrapLines2(x2, message, msg.w, linesFor(k, msg.h, lh, 6)).forEach((line, i2) => x2.fillText(line, msg.x, msg.y + 20 + i2 * lh));
    else emptyHint(x2, "Write your message...", msg.x + msg.w / 2, msg.y + msg.h / 2);
  }
  const addr = COMP_ZONES["Postcard"].back[1].rect;
  const lines = (d2.comboFields?.address || "").split("\n").map((l3) => l3.trim()).filter(Boolean).slice(0, 3);
  x2.font = "italic 13px Georgia, serif";
  x2.fillStyle = "#4A3A22";
  for (let i2 = 0; i2 < 3; i2++) {
    const ly = addr.y + 34 + i2 * 48;
    x2.strokeStyle = "#B3A488";
    x2.lineWidth = 1.5;
    x2.setLineDash([2, 3]);
    x2.beginPath();
    x2.moveTo(addr.x, ly);
    x2.lineTo(addr.x + addr.w, ly);
    x2.stroke();
    x2.setLineDash([]);
    if (lines[i2]) fillShrinkText(x2, lines[i2], addr.x + 4, ly - 6, addr.w - 8, "italic", [13, 12, 11], "Georgia, serif");
  }
  if (d2.image2) {
    const stamp = await loadImage2(d2.image2);
    const sr = COMP_ZONES["Postcard"].back[2].rect;
    x2.save();
    x2.shadowColor = "#0003";
    x2.shadowBlur = 4;
    x2.shadowOffsetY = 2;
    x2.fillStyle = "#FFFFFF";
    x2.fillRect(sr.x - 3, sr.y - 3, sr.w + 6, sr.h + 6);
    x2.shadowColor = "transparent";
    const s2 = Math.max(sr.w / stamp.width, sr.h / stamp.height);
    x2.save();
    x2.beginPath();
    x2.rect(sr.x, sr.y, sr.w, sr.h);
    x2.clip();
    x2.drawImage(stamp, sr.x + (sr.w - stamp.width * s2) / 2, sr.y + (sr.h - stamp.height * s2) / 2, stamp.width * s2, stamp.height * s2);
    x2.restore();
    x2.strokeStyle = "#B03A2ACC";
    x2.lineWidth = 2;
    x2.beginPath();
    x2.arc(sr.x + 8, sr.y + 12, 20, 0, Math.PI * 2);
    x2.stroke();
    x2.beginPath();
    x2.arc(sr.x + 8, sr.y + 12, 15, 0, Math.PI * 2);
    x2.stroke();
    x2.restore();
  }
  return c2.toDataURL("image/png");
}
async function renderTicketFront(d2, suppressHints = false) {
  await ensureTextFont(d2.textFont);
  const emptyHint = suppressHints ? () => {
  } : drawEmptyHint;
  const { w: w2, h: h2 } = COMP_TEMPLATE_SIZES["Concert Ticket"];
  const c2 = document.createElement("canvas");
  c2.width = w2 * 3;
  c2.height = h2 * 3;
  const x2 = c2.getContext("2d");
  x2.scale(3, 3);
  const f = d2.comboFields || {};
  x2.fillStyle = "#FFFDF6";
  x2.fillRect(0, 0, w2, h2);
  x2.strokeStyle = "#E0D6BC";
  x2.lineWidth = 2;
  x2.strokeRect(1, 1, w2 - 2, h2 - 2);
  const photo = COMP_ZONES["Concert Ticket"].front[0].rect;
  if (d2.image) {
    const img = await loadImage2(d2.image);
    x2.save();
    x2.beginPath();
    x2.roundRect(photo.x, photo.y, photo.w, photo.h, 8);
    x2.clip();
    const s2 = Math.max(photo.w / img.width, photo.h / img.height);
    const pan = d2.comboPan ?? { x: 0.5, y: 0.5 };
    x2.drawImage(img, photo.x - (img.width * s2 - photo.w) * pan.x, photo.y - (img.height * s2 - photo.h) * pan.y, img.width * s2, img.height * s2);
    x2.restore();
  } else {
    x2.fillStyle = "#4E4862";
    x2.beginPath();
    x2.roundRect(photo.x, photo.y, photo.w, photo.h, 8);
    x2.fill();
    x2.save();
    x2.fillStyle = "#FFFFFF55";
    x2.beginPath();
    x2.moveTo(photo.x + 70, photo.y + photo.h - 40);
    x2.lineTo(photo.x + 100, photo.y + photo.h - 76);
    x2.lineTo(photo.x + 130, photo.y + photo.h - 40);
    x2.fill();
    x2.restore();
  }
  x2.strokeStyle = "#C9BC9E";
  x2.lineWidth = 2;
  x2.setLineDash([6, 6]);
  x2.beginPath();
  x2.moveTo(238, 10);
  x2.lineTo(238, h2 - 10);
  x2.stroke();
  x2.beginPath();
  x2.moveTo(744, 10);
  x2.lineTo(744, h2 - 10);
  x2.stroke();
  x2.setLineDash([]);
  const cx = (262 + 724) / 2;
  x2.textAlign = "center";
  x2.textBaseline = "alphabetic";
  if ((f.presenter || "").trim()) {
    x2.fillStyle = "#8A7A52";
    fillShrinkText(x2, f.presenter.trim(), cx, 78, 440, "400", [12, 11, 10, 9]);
  }
  x2.fillStyle = "#1C1C1C";
  if ((f.event || "").trim()) {
    const { size, lines } = fitWrappedTitle(x2, f.event.trim(), 440, textFamily(d2.textFont, "Arial"), textScale(d2));
    const lh = size * 1.18;
    const firstY = lines.length === 1 ? 118 : 119 - (lines.length - 1) * lh / 2;
    lines.forEach((line, i2) => x2.fillText(line, cx, firstY + i2 * lh));
  } else {
    x2.font = "700 32px Arial";
    emptyHint(x2, "Event name", cx, 110);
  }
  x2.textAlign = "left";
  x2.fillStyle = "#1C1C1C";
  if ((f.date || "").trim()) fillShrinkText(x2, f.date.trim(), 262, 214, 210, "700", [17, 15, 13, 11]);
  else emptyHint(x2, "Date", 320, 212);
  x2.fillStyle = "#8A7A52";
  if ((f.doors || "").trim()) fillShrinkText(x2, f.doors.trim(), 262, 236, 210, "400", [12, 11, 10, 9]);
  x2.fillStyle = "#1C1C1C";
  if ((f.venue || "").trim()) fillShrinkText(x2, f.venue.trim(), 504, 214, 210, "700", [17, 15, 13, 11]);
  else emptyHint(x2, "Venue", 560, 212);
  x2.fillStyle = "#8A7A52";
  if ((f.city || "").trim()) fillShrinkText(x2, f.city.trim(), 504, 236, 210, "400", [12, 11, 10, 9]);
  const seatBits = [["SECTION", f.section], ["ROW", f.row], ["SEAT", f.seat]].filter(([, v]) => (v || "").trim()).map(([k, v]) => `${k} ${v.trim()}`);
  x2.font = "600 14px Arial";
  x2.fillStyle = "#1C1C1C";
  if (seatBits.length) fillShrinkText(x2, seatBits.join("   "), 262, 318, 300, "600", [14, 13, 12, 10]);
  else emptyHint(x2, "Section \xB7 Row \xB7 Seat", 360, 316);
  if ((f.price || "").trim()) {
    x2.textAlign = "right";
    fillShrinkText(x2, `PRICE ${f.price.trim()}`, 724, 318, 180, "600", [14, 13, 12, 10]);
    x2.textAlign = "left";
  }
  x2.textAlign = "center";
  x2.font = "700 13px Arial";
  x2.fillStyle = "#1C1C1C";
  wrapLines2(x2, (f.event || "").trim() || "Event name", 130, 2).forEach((line, i2) => x2.fillText(line, 826, 60 + i2 * 17));
  x2.font = "11px Arial";
  x2.fillStyle = "#8A7A52";
  if ((f.date || "").trim()) {
    const dtxt = f.date.trim();
    let drawn = false;
    for (const size of [11, 10]) {
      x2.font = `400 ${size}px Arial`;
      if (x2.measureText(dtxt).width <= 130) {
        x2.fillText(dtxt, 826, 104);
        drawn = true;
        break;
      }
    }
    if (!drawn) {
      x2.font = "400 9px Arial";
      const dl = wrapLines2(x2, dtxt, 130, 2);
      if (wrapLines2(x2, dtxt, 130, 99).length > 2) {
        let last = dl[dl.length - 1] || "";
        while (last.length > 1 && x2.measureText(`${last}\u2026`).width > 130) last = last.slice(0, -1);
        dl[dl.length - 1] = `${last}\u2026`;
      }
      dl.forEach((line, i2) => x2.fillText(line, 826, 98 + i2 * 12));
    }
  }
  const serial = (f.serial || "000000").trim();
  drawBarcode(x2, 826, 200, 110, 64, serial);
  x2.font = "11px Arial";
  x2.fillStyle = "#8A7A52";
  x2.fillText(`N\xB0 ${serial}`, 826, 250);
  return c2.toDataURL("image/png");
}
async function renderTicketBack(d2, suppressHints = false) {
  await ensureTextFont(d2.textFont);
  const emptyHint = suppressHints ? () => {
  } : drawEmptyHint;
  const { w: w2, h: h2 } = COMP_TEMPLATE_SIZES["Concert Ticket"];
  const c2 = document.createElement("canvas");
  c2.width = w2 * 3;
  c2.height = h2 * 3;
  const x2 = c2.getContext("2d");
  x2.scale(3, 3);
  const f = d2.comboFields || {};
  await paper(x2, w2, h2, "#FBF6EA");
  x2.textAlign = "left";
  x2.textBaseline = "alphabetic";
  x2.font = "600 11px Arial";
  x2.fillStyle = "#8A7A52";
  x2.fillText("KEEPSAKE TICKET - NOT VALID FOR ADMISSION", 40, 36);
  const msg = COMP_ZONES["Concert Ticket"].back[0].rect;
  const message = (f.message || "").trim();
  const messageImg = d2.comboImages?.message;
  if (messageImg) {
    const img = await loadImage2(messageImg);
    x2.save();
    x2.beginPath();
    x2.rect(msg.x, msg.y, msg.w, msg.h);
    x2.clip();
    const s2 = Math.max(msg.w / img.width, msg.h / img.height);
    x2.drawImage(img, msg.x + (msg.w - img.width * s2) / 2, msg.y + (msg.h - img.height * s2) / 2, img.width * s2, img.height * s2);
    x2.restore();
  } else {
    const k = textScale(d2), lh = 28 * k;
    x2.textBaseline = "top";
    x2.font = `${22 * k}px ${textFamily(d2.textFont, "'Pinyon Script', cursive")}`;
    x2.fillStyle = "#2B4C9A";
    if (message) wrapLines2(x2, message, msg.w, linesFor(k, msg.h, lh, 7)).forEach((line, i2) => x2.fillText(line, msg.x, msg.y + 20 + i2 * lh));
    else emptyHint(x2, "Write a note for the back...", msg.x + msg.w / 2, msg.y + msg.h / 2);
  }
  x2.textBaseline = "alphabetic";
  x2.font = "12px Arial";
  x2.fillStyle = "#8A7A52";
  const recap = [[f.event, f.venue].filter((v) => (v || "").trim()).join(" - "), (f.date || "").trim()].filter(Boolean);
  recap.forEach((line, i2) => fillShrinkText(x2, line, 40, h2 - 44 + i2 * 16, 520, "400", [12, 11, 10]));
  const serial = (f.serial || "000000").trim();
  drawBarcode(x2, 740, 220, 200, 70, serial);
  x2.textAlign = "center";
  x2.font = "12px Arial";
  x2.fillStyle = "#8A7A52";
  x2.fillText(`N\xB0 ${serial}`, 740, 274);
  return c2.toDataURL("image/png");
}
async function renderCompositionSide(d2, side, suppressHints = false) {
  await ensureProFonts();
  if (d2.comboFormat === "Concert Ticket") return side === "front" ? renderTicketFront(d2, suppressHints) : renderTicketBack(d2, suppressHints);
  return side === "front" ? renderPostcardFront(d2, suppressHints) : renderPostcardBack(d2, suppressHints);
}

// rendering-source/src/lib/pro-combo-render.ts
var textScale2 = (d2) => Number.isFinite(d2.textSize) && d2.textSize > 0 ? d2.textSize / 24 : 1;
async function loadImage3(src) {
  return new Promise((ok, no) => {
    const i2 = new Image();
    i2.onload = () => ok(i2);
    i2.onerror = () => no(new Error("Could not read image."));
    i2.src = src;
  });
}
async function renderComposition(d2) {
  await ensureTextFont(d2.textFont);
  await ensureProFonts();
  const love = d2.comboFormat === "Love Letter";
  const w2 = love ? 400 : 480, h2 = love ? 500 : 320;
  const c2 = document.createElement("canvas");
  c2.width = w2 * 3;
  c2.height = h2 * 3;
  const x2 = c2.getContext("2d");
  x2.scale(3, 3);
  x2.fillStyle = "#F7F1E3";
  x2.fillRect(0, 0, w2, h2);
  x2.save();
  x2.globalAlpha = 0.35;
  const tex = await proImage("parchment");
  const ts = Math.max(w2 / tex.width, h2 / tex.height);
  x2.drawImage(tex, (w2 - tex.width * ts) / 2, (h2 - tex.height * ts) / 2, tex.width * ts, tex.height * ts);
  x2.restore();
  x2.strokeStyle = "#D8CCB4";
  x2.lineWidth = 2;
  x2.strokeRect(1, 1, w2 - 2, h2 - 2);
  const items = (d2.comboItems || []).filter(Boolean).slice(0, 4);
  if (!items.length) {
    x2.fillStyle = "#A3A3A3";
    x2.font = "18px Arial";
    x2.textAlign = "center";
    x2.textBaseline = "middle";
    x2.fillText("Pick elements from your galleries", w2 / 2, h2 / 2);
    return c2.toDataURL("image/png");
  }
  const [first, ...rest] = await Promise.all(items.map(loadImage3));
  if (love) {
    const lw = 250, lh = 420;
    x2.save();
    x2.shadowColor = "#0003";
    x2.shadowBlur = 8;
    x2.shadowOffsetY = 3;
    x2.drawImage(first, 24, 40, lw, lh);
    x2.restore();
    if (rest[0]) {
      const pw = 120, ph = 150;
      x2.save();
      x2.translate(318, 120 + ph / 2 - 40);
      x2.rotate(3 * Math.PI / 180);
      x2.shadowColor = "#0003";
      x2.shadowBlur = 8;
      x2.shadowOffsetY = 3;
      x2.fillStyle = "#FFFFFF";
      x2.fillRect(-pw / 2 - 7, -ph / 2 - 7, pw + 14, ph + 14);
      x2.shadowColor = "transparent";
      x2.drawImage(rest[0], -pw / 2, -ph / 2, pw, ph);
      x2.fillStyle = "#E8DFC8CC";
      x2.fillRect(-30, -ph / 2 - 15, 60, 16);
      x2.restore();
    }
    x2.font = `${24 * textScale2(d2)}px ${textFamily(d2.textFont, "'Pinyon Script', cursive")}`;
    x2.fillStyle = "#2B4C9A";
    x2.textAlign = "center";
    if (d2.text.trim()) x2.fillText(d2.text.trim(), w2 / 2, h2 - 32);
    return c2.toDataURL("image/png");
  }
  const mw = 250, mh = 250;
  x2.save();
  x2.translate(24 + mw / 2, 35 + mh / 2);
  x2.rotate(-1.5 * Math.PI / 180);
  x2.shadowColor = "#0003";
  x2.shadowBlur = 8;
  x2.shadowOffsetY = 3;
  x2.fillStyle = "#FFFFFF";
  x2.fillRect(-mw / 2 - 8, -mh / 2 - 8, mw + 16, mh + 16);
  x2.shadowColor = "transparent";
  x2.drawImage(first, -mw / 2, -mh / 2, mw, mh);
  x2.restore();
  rest.slice(0, 3).forEach((img, i2) => {
    const sw = 88, sh = 76;
    const sx = 310, sy = 30 + i2 * 92;
    x2.save();
    x2.translate(sx + sw / 2, sy + sh / 2);
    x2.rotate((i2 % 2 ? 2 : -2) * Math.PI / 180);
    x2.shadowColor = "#0003";
    x2.shadowBlur = 6;
    x2.shadowOffsetY = 2;
    x2.fillStyle = "#FFFFFF";
    x2.fillRect(-sw / 2 - 5, -sh / 2 - 5, sw + 10, sh + 10);
    x2.shadowColor = "transparent";
    x2.drawImage(img, -sw / 2, -sh / 2, sw, sh);
    x2.restore();
  });
  x2.font = `${20 * textScale2(d2)}px ${textFamily(d2.textFont, "'Pinyon Script', cursive")}`;
  x2.fillStyle = "#2B4C9A";
  x2.textAlign = "left";
  x2.textBaseline = "alphabetic";
  if (d2.text.trim()) x2.fillText(d2.text.trim(), 30, h2 - 14);
  return c2.toDataURL("image/png");
}
async function renderComboSkeleton(format) {
  await ensureProFonts();
  const love = format === "Love Letter";
  const w2 = love ? 400 : 480, h2 = love ? 500 : 320;
  const c2 = document.createElement("canvas");
  c2.width = w2 * 2;
  c2.height = h2 * 2;
  const x2 = c2.getContext("2d");
  x2.scale(2, 2);
  x2.fillStyle = "#F7F1E3";
  x2.fillRect(0, 0, w2, h2);
  try {
    x2.save();
    x2.globalAlpha = 0.35;
    const tex = await proImage("parchment");
    const ts = Math.max(w2 / tex.width, h2 / tex.height);
    x2.drawImage(tex, (w2 - tex.width * ts) / 2, (h2 - tex.height * ts) / 2, tex.width * ts, tex.height * ts);
    x2.restore();
  } catch {
  }
  x2.strokeStyle = "#D8CCB4";
  x2.lineWidth = 2;
  x2.strokeRect(1, 1, w2 - 2, h2 - 2);
  const photoCard = (cx, cy, pw, ph, deg) => {
    x2.save();
    x2.translate(cx, cy);
    x2.rotate(deg * Math.PI / 180);
    x2.shadowColor = "#0003";
    x2.shadowBlur = 8;
    x2.shadowOffsetY = 3;
    x2.fillStyle = "#FFFFFF";
    x2.fillRect(-pw / 2 - 8, -ph / 2 - 8, pw + 16, ph + 16);
    x2.shadowColor = "transparent";
    x2.fillStyle = "#E8E2D4";
    x2.fillRect(-pw / 2, -ph / 2, pw, ph);
    x2.strokeStyle = "#C9C0AC";
    x2.lineWidth = 3;
    x2.lineJoin = "round";
    x2.beginPath();
    x2.moveTo(-pw / 2 + 14, ph / 2 - 14);
    x2.lineTo(-pw / 6, -ph / 6);
    x2.lineTo(pw / 10, ph / 2 - 20);
    x2.lineTo(pw / 3, -ph / 12);
    x2.lineTo(pw / 2 - 14, ph / 2 - 14);
    x2.stroke();
    x2.beginPath();
    x2.arc(pw / 5, -ph / 4, 8, 0, Math.PI * 2);
    x2.stroke();
    x2.restore();
  };
  const textLines = (lx, ly, lw, n2, gap = 22) => {
    x2.save();
    x2.strokeStyle = "#D8CCB4";
    x2.lineWidth = 3;
    x2.lineCap = "round";
    for (let i2 = 0; i2 < n2; i2++) {
      x2.beginPath();
      x2.moveTo(lx, ly + i2 * gap);
      x2.lineTo(lx + lw * (i2 === n2 - 1 ? 0.6 : 1), ly + i2 * gap);
      x2.stroke();
    }
    x2.restore();
  };
  const stamp = (sx, sy, sw, sh) => {
    x2.save();
    x2.setLineDash([4, 3]);
    x2.strokeStyle = "#C9C0AC";
    x2.lineWidth = 2;
    x2.strokeRect(sx - 5, sy - 5, sw + 10, sh + 10);
    x2.setLineDash([]);
    x2.fillStyle = "#DCE7E2";
    x2.fillRect(sx, sy, sw, sh);
    x2.strokeStyle = "#B9CDBF";
    x2.strokeRect(sx, sy, sw, sh);
    x2.restore();
  };
  const seal = (cx, cy, r2) => {
    x2.fillStyle = "#A6242F";
    x2.beginPath();
    x2.arc(cx, cy, r2, 0, Math.PI * 2);
    x2.fill();
    x2.fillStyle = "#C34A54";
    x2.beginPath();
    x2.arc(cx, cy, r2 * 0.62, 0, Math.PI * 2);
    x2.fill();
  };
  const noteCard = (cx, cy, nw, nh, deg) => {
    x2.save();
    x2.translate(cx, cy);
    x2.rotate(deg * Math.PI / 180);
    x2.shadowColor = "#0002";
    x2.shadowBlur = 6;
    x2.shadowOffsetY = 2;
    x2.fillStyle = "#F5E9C8";
    x2.fillRect(-nw / 2, -nh / 2, nw, nh);
    x2.shadowColor = "transparent";
    x2.restore();
    x2.save();
    x2.translate(cx, cy);
    x2.rotate(deg * Math.PI / 180);
    textLines(-nw / 2 + 12, -nh / 4, nw - 24, 3, 16);
    x2.restore();
  };
  const dateChip = (cx, cy) => {
    x2.save();
    x2.translate(cx, cy);
    x2.fillStyle = "#171717";
    x2.fillRect(-26, -34, 52, 12);
    x2.fillStyle = "#FFFFFF";
    x2.fillRect(-26, -22, 52, 56);
    x2.strokeStyle = "#E5E0D8";
    x2.strokeRect(-26, -22, 52, 56);
    x2.fillStyle = "#171717";
    x2.fillRect(-8, -4, 16, 4);
    x2.restore();
  };
  if (format === "Postcard") {
    photoCard(130, 160, 180, 220, -2);
    x2.strokeStyle = "#D8CCB4";
    x2.lineWidth = 2;
    x2.beginPath();
    x2.moveTo(280, 30);
    x2.lineTo(280, 290);
    x2.stroke();
    stamp(360, 40, 70, 84);
    textLines(300, 170, 130, 4, 26);
  } else if (format === "Travel Keepsake") {
    photoCard(140, 160, 190, 190, -2);
    noteCard(360, 90, 120, 80, 2);
    dateChip(360, 200);
    stamp(330, 248, 56, 66);
  } else if (format === "Love Letter") {
    x2.save();
    x2.shadowColor = "#0003";
    x2.shadowBlur = 8;
    x2.shadowOffsetY = 3;
    x2.fillStyle = "#FBF6E9";
    x2.fillRect(40, 50, 220, 380);
    x2.shadowColor = "transparent";
    x2.restore();
    textLines(60, 110, 180, 10, 30);
    seal(220, 400, 18);
    photoCard(320, 160, 110, 140, 4);
  } else {
    x2.strokeStyle = "#B9A06A";
    x2.lineWidth = 3;
    x2.setLineDash([8, 7]);
    x2.beginPath();
    x2.moveTo(90, 220);
    x2.bezierCurveTo(160, 80, 300, 260, 390, 110);
    x2.stroke();
    x2.setLineDash([]);
    photoCard(90, 220, 90, 110, -4);
    photoCard(240, 170, 90, 110, 3);
    photoCard(390, 110, 90, 110, -2);
  }
  return c2.toDataURL("image/png");
}

// rendering-source/src/lib/stamp-filters.ts
function stampPhoto(image2, width, height, effect = "Original") {
  const c2 = document.createElement("canvas");
  c2.width = Math.round(width);
  c2.height = Math.round(height);
  const x2 = c2.getContext("2d");
  const scale = Math.max(width / image2.naturalWidth, height / image2.naturalHeight), sw = width / scale, sh = height / scale;
  x2.drawImage(image2, (image2.naturalWidth - sw) / 2, (image2.naturalHeight - sh) / 2, sw, sh, 0, 0, width, height);
  if (effect === "Original") return c2;
  const pixels = x2.getImageData(0, 0, c2.width, c2.height), p2 = pixels.data;
  const ink = effect === "Green engraving" ? [42, 77, 57] : effect === "Blue engraving" ? [38, 61, 94] : effect === "Rose engraving" ? [120, 52, 65] : effect === "Vintage sepia" ? [84, 57, 34] : [22, 22, 22];
  const paper2 = effect === "Black and white" ? [250, 250, 250] : [235, 221, 185];
  const engraved = effect.endsWith("engraving");
  for (let y = 0; y < c2.height; y++) for (let px = 0; px < c2.width; px++) {
    const i2 = (y * c2.width + px) * 4;
    const l3 = (p2[i2] * 0.2126 + p2[i2 + 1] * 0.7152 + p2[i2 + 2] * 0.0722) / 255;
    let tone = Math.max(0, Math.min(1, (l3 - 0.1) / 0.85));
    if (engraved) {
      const line = (px + y) % 9 < 2;
      tone = line ? Math.max(0, tone - 0.22) : Math.min(1, tone + 0.08);
      tone = Math.round(tone * 5) / 5;
    }
    for (let k = 0; k < 3; k++) p2[i2 + k] = Math.round(ink[k] + tone * (paper2[k] - ink[k]));
  }
  x2.putImageData(pixels, 0, 0);
  return c2;
}
var STAMP_EXTRAS = [
  { id: "Green engraving", en: "Green engraving", fr: "Gravure verte" },
  { id: "Blue engraving", en: "Blue engraving", fr: "Gravure bleue" },
  { id: "Rose engraving", en: "Rose engraving", fr: "Gravure rose" }
].map((preset) => ({ ...preset, render: async (photo) => {
  const im = new Image();
  im.src = photo.originalSrc ?? photo.src;
  await im.decode();
  return stampPhoto(im, 120, 160, preset.id).toDataURL("image/png");
} }));

// rendering-source/src/lib/elements.ts
var import_qrcode = __toESM(require_browser());
var elementDefaults = (kind) => ({ kind, format: kind === "Audio" ? "Pill" : kind === "Music" ? "Card" : kind === "Stamps" ? "Perforated" : kind === "Combination" ? "Postcard" : kind === "Messages" ? "Screenshot" : kind === "Date" ? "Card" : "Square", text: "", subtitle: "", colour: "#f4e6ba", textSize: 24, image: "", media: "", link: "", letterFont: "Calligraphy", letterPaper: "Parchment", letterExtras: ["capital", "seal", "ornaments"], letterDate: "", dateStyle: "Calendar", dateLabel: "Anniversary", comboFormat: "Postcard", comboStyle: "Classic", image2: "", ...kind === "Stamps" ? { stampFilter: "Green engraving" } : {}, ...kind === "Music" ? { cardColour: "#252525" } : {} });
function safeMusicLink(value) {
  if (!value.trim()) return "";
  let url;
  try {
    url = new URL(value);
  } catch {
    throw Error("Use a complete https music link, for example from Spotify or Apple Music.");
  }
  if (url.protocol !== "https:" || url.username || url.password) throw Error("Use an https music link.");
  return url.href;
}
function elementSize(d2) {
  if (d2.kind === "Letter") return LETTER_SIZE;
  if (d2.kind === "Date") return d2.dateStyle === "Calendar" ? { w: 320, h: 360 } : { w: 320, h: 400 };
  if (d2.kind === "Messages") return { w: 320, h: 560 };
  if (d2.kind === "Combination") return d2.comboFormat === "Concert Ticket" ? { w: 920, h: 360 } : d2.comboFormat === "Postcard" ? { w: 740, h: 300 } : d2.comboFormat === "Love Letter" ? { w: 400, h: 500 } : { w: 480, h: 320 };
  if (d2.kind === "Music" && d2.format === "Wide") return { w: 520, h: 390 };
  return d2.kind === "Stamps" && d2.format === "Perforated" ? { w: 280, h: 360 } : d2.kind === "Music" && d2.format === "Card" ? { w: 320, h: 440 } : d2.kind === "Audio" && d2.format === "Pill" ? { w: 480, h: 150 } : d2.format === "Rectangle" || d2.format === "Card" ? { w: 360, h: 260 } : { w: 320, h: 320 };
}
var noteGrain;
function paperGrain() {
  if (noteGrain) return noteGrain;
  const tile = document.createElement("canvas");
  tile.width = 384;
  tile.height = 384;
  const ctx = tile.getContext("2d"), pixels = ctx.createImageData(384, 384);
  let seed = 7193;
  for (let i2 = 0; i2 < pixels.data.length; i2 += 4) {
    seed = Math.imul(seed, 1664525) + 1013904223 >>> 0;
    const value = seed >>> 24;
    const ink = value < 125 ? 65 : 255;
    pixels.data[i2] = ink;
    pixels.data[i2 + 1] = ink;
    pixels.data[i2 + 2] = ink;
    pixels.data[i2 + 3] = Math.round(Math.abs(value - 128) / 128 * 28);
  }
  ctx.putImageData(pixels, 0, 0);
  noteGrain = tile;
  return tile;
}
function hexRgb(hex) {
  const v = parseInt(hex.slice(1), 16);
  return [v >> 16 & 255, v >> 8 & 255, v & 255];
}
function shadeOf(hex, amt) {
  const [r2, g2, b2] = hexRgb(hex);
  const f = (c2) => Math.max(0, Math.min(255, Math.round(c2 + amt * 255)));
  return `rgb(${f(r2)},${f(g2)},${f(b2)})`;
}
function luminanceOf(hex) {
  const [r2, g2, b2] = hexRgb(hex);
  return (0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2) / 255;
}
function fadeOf(hex, alpha) {
  const [r2, g2, b2] = hexRgb(hex);
  return `rgba(${r2},${g2},${b2},${alpha})`;
}
function agedPaperTexture(x2, w2, h2) {
  let seed = 424242;
  const rnd = () => {
    seed = Math.imul(seed, 1664525) + 1013904223 >>> 0;
    return seed / 4294967296;
  };
  x2.save();
  x2.beginPath();
  x2.rect(7, 7, w2 - 14, h2 - 14);
  x2.clip();
  const wash = x2.createLinearGradient(7, 7, w2 - 7, h2 - 7);
  wash.addColorStop(0, "rgba(255,246,214,.16)");
  wash.addColorStop(0.5, "rgba(214,182,124,.10)");
  wash.addColorStop(1, "rgba(255,240,200,.14)");
  x2.fillStyle = wash;
  x2.fillRect(7, 7, w2 - 14, h2 - 14);
  for (let n2 = 0; n2 < 7; n2++) {
    const sx = 14 + rnd() * (w2 - 40), sy = 14 + rnd() * (h2 - 40), sr = 10 + rnd() * 26;
    const stain = x2.createRadialGradient(sx, sy, 0, sx, sy, sr);
    const col = n2 % 2 ? "94,65,28" : "122,88,40";
    stain.addColorStop(0, `rgba(${col},${0.05 + rnd() * 0.05})`);
    stain.addColorStop(1, `rgba(${col},0)`);
    x2.fillStyle = stain;
    x2.beginPath();
    x2.arc(sx, sy, sr, 0, Math.PI * 2);
    x2.fill();
  }
  x2.lineWidth = 0.6;
  for (let n2 = 0; n2 < 260; n2++) {
    const fx2 = 8 + rnd() * (w2 - 18), fy = 8 + rnd() * (h2 - 18), a3 = rnd() * Math.PI, l3 = 2 + rnd() * 5;
    x2.strokeStyle = rnd() < 0.5 ? `rgba(94,65,28,${0.05 + rnd() * 0.07})` : `rgba(255,249,216,${0.18 + rnd() * 0.14})`;
    x2.beginPath();
    x2.moveTo(fx2, fy);
    x2.lineTo(fx2 + Math.cos(a3) * l3, fy + Math.sin(a3) * l3);
    x2.stroke();
  }
  for (let n2 = 0; n2 < 1100; n2++) {
    const px = 8 + rnd() * (w2 - 18), py = 8 + rnd() * (h2 - 18);
    x2.fillStyle = n2 % 3 ? "rgba(94,65,28,.045)" : "rgba(255,249,216,.22)";
    x2.fillRect(px, py, 1 + n2 % 2, 1);
  }
  const edge = x2.createRadialGradient(w2 / 2, h2 / 2, Math.min(w2, h2) * 0.32, w2 / 2, h2 / 2, Math.max(w2, h2) * 0.72);
  edge.addColorStop(0, "rgba(94,65,28,0)");
  edge.addColorStop(1, "rgba(94,65,28,.16)");
  x2.fillStyle = edge;
  x2.fillRect(7, 7, w2 - 14, h2 - 14);
  x2.restore();
}
var thumbnailCache = /* @__PURE__ */ new Map();
function musicThumbnail(id2) {
  const cached = thumbnailCache.get(id2);
  if (cached) return cached;
  const promise = new Promise((resolve) => {
    const image2 = new Image();
    const done = (value) => {
      clearTimeout(timer);
      image2.onload = image2.onerror = null;
      resolve(value);
    };
    const timer = setTimeout(() => done(null), 6e3);
    image2.crossOrigin = "anonymous";
    image2.onload = () => done(image2);
    image2.onerror = () => done(null);
    image2.src = `https://i.ytimg.com/vi/${id2}/hqdefault.jpg`;
  });
  if (thumbnailCache.size >= 30) thumbnailCache.delete(thumbnailCache.keys().next().value);
  thumbnailCache.set(id2, promise);
  return promise;
}
function drawFittedText(x2, text, px, py, maxWidth, startPx, minPx, fontFor) {
  let size = startPx;
  x2.font = fontFor(size);
  while (size > minPx && x2.measureText(text).width > maxWidth) {
    size -= 1;
    x2.font = fontFor(size);
  }
  if (x2.measureText(text).width > maxWidth) {
    let t2 = text;
    while (t2.length > 1 && x2.measureText(t2 + "\u2026").width > maxWidth) t2 = t2.slice(0, -1);
    text = t2.trimEnd() + "\u2026";
  }
  x2.fillText(text, px, py);
}
async function renderElement(d2) {
  await ensureTextFont(d2.textFont);
  const ff = (fallback) => textFamily(d2.textFont, fallback);
  if (d2.kind === "Letter") return renderLetter(d2);
  if (d2.kind === "Date") return renderDateCard(d2);
  if (d2.kind === "Messages") return renderScreenshot(d2);
  if (d2.kind === "Combination") return d2.comboFormat === "Postcard" || d2.comboFormat === "Concert Ticket" ? renderCompositionSide(d2, "front") : renderComposition(d2);
  const { w: w2, h: h2 } = elementSize(d2);
  const c2 = document.createElement("canvas");
  c2.width = w2 * 3;
  c2.height = h2 * 3;
  const x2 = c2.getContext("2d");
  x2.scale(3, 3);
  const filtered = d2.kind === "Stamps" && d2.image && d2.stampPhotoFilter ? await filterPhoto({ src: d2.image, width: 0, height: 0 }, d2.stampPhotoFilter) : null;
  const image2 = filtered?.src || d2.image ? await new Promise((ok, no) => {
    const i2 = new Image();
    const clean = () => {
      clearTimeout(timer);
      i2.onload = i2.onerror = null;
    };
    const fail = () => {
      clean();
      no(Error("Could not read image."));
    };
    const timer = setTimeout(fail, 2e4);
    i2.onload = () => {
      clean();
      ok(i2);
    };
    i2.onerror = fail;
    i2.src = filtered?.src || d2.image;
  }) : null;
  if (d2.kind === "Music" && d2.format === "Wide") {
    const base = d2.cardColour || "#E73B0D";
    await document.fonts.load("32px Kalam");
    x2.fillStyle = base;
    x2.beginPath();
    x2.roundRect(2, 2, 516, 386, 12);
    x2.fill();
    x2.save();
    x2.beginPath();
    x2.roundRect(2, 2, 516, 386, 12);
    x2.clip();
    x2.fillStyle = "#100808";
    x2.fillRect(2, 316, 516, 74);
    x2.restore();
    x2.strokeStyle = "#100808";
    x2.lineWidth = 3;
    x2.beginPath();
    x2.roundRect(2, 2, 516, 386, 12);
    x2.stroke();
    x2.fillStyle = "#211c1a";
    x2.beginPath();
    x2.roundRect(20, 20, 480, 270, 7);
    x2.fill();
    const id2 = youtubeVideoId(d2.link);
    const cover = id2 ? await musicThumbnail(id2) : image2;
    if (cover) {
      x2.save();
      x2.beginPath();
      x2.roundRect(20, 20, 480, 270, 7);
      x2.clip();
      const scale = Math.max(480 / cover.width, 270 / cover.height), sw = 480 / scale, sh = 270 / scale;
      x2.drawImage(cover, (cover.width - sw) / 2, (cover.height - sh) / 2, sw, sh, 20, 20, 480, 270);
      x2.restore();
    } else {
      x2.fillStyle = "#f7f4f1";
      x2.font = "18px Arial";
      x2.textAlign = "center";
      x2.fillText(translate(id2 ? "Thumbnail unavailable" : "Add a YouTube link"), 260, 158, 440);
    }
    x2.strokeStyle = "#f7f4f155";
    x2.lineWidth = 1;
    x2.setLineDash([2, 3]);
    x2.beginPath();
    x2.moveTo(22, 322);
    x2.lineTo(496, 322);
    x2.stroke();
    x2.setLineDash([]);
    x2.textAlign = "left";
    x2.fillStyle = "#F7F4F1";
    drawFittedText(x2, d2.text || translate("Track title"), 22, 356, 405, Math.max(18, Math.min(34, d2.textSize + 8)), 13, (size2) => `${size2}px ${ff("Kalam, cursive")}`);
    x2.fillStyle = d2.cardColour === "#252525" ? "#bbbbbb" : base;
    drawFittedText(x2, (d2.subtitle || translate("Artist")).toUpperCase(), 22, 377, 405, 12, 9, (size2) => `${size2}px ${ff("Arial")}`);
    x2.fillStyle = d2.cardColour === "#252525" ? "#E73B0D" : base;
    x2.strokeStyle = "#F7F4F1";
    x2.lineWidth = 2.5;
    x2.beginPath();
    x2.arc(478, 353, 21, 0, Math.PI * 2);
    x2.fill();
    x2.stroke();
    x2.fillStyle = "#F7F4F1";
    x2.beginPath();
    x2.moveTo(472, 342);
    x2.lineTo(488, 353);
    x2.lineTo(472, 364);
    x2.closePath();
    x2.fill();
    return c2.toDataURL("image/png");
  }
  if (d2.kind === "Music" && d2.format === "Card") {
    const base = d2.cardColour || "#252525", dark = luminanceOf(base) < 0.45, ink = dark ? "#fff" : "#171717", sub = dark ? "#bbb" : fadeOf("#171717", 0.65);
    x2.fillStyle = base;
    x2.beginPath();
    x2.roundRect(5, 5, w2 - 10, h2 - 10, 12);
    x2.fill();
    x2.fillStyle = shadeOf(base, dark ? 0.09 : -0.06);
    x2.beginPath();
    x2.roundRect(24, 24, 272, 272, 7);
    x2.fill();
    const ytid = youtubeVideoId(d2.link), cover = image2 || (ytid ? await musicThumbnail(ytid) : null);
    if (cover) {
      x2.save();
      x2.beginPath();
      x2.roundRect(24, 24, 272, 272, 7);
      x2.clip();
      const scale = Math.max(272 / cover.width, 272 / cover.height), sw = 272 / scale, sh = 272 / scale;
      x2.drawImage(cover, (cover.width - sw) / 2, (cover.height - sh) / 2, sw, sh, 24, 24, 272, 272);
      x2.restore();
    }
    x2.fillStyle = ink;
    x2.textAlign = "left";
    drawFittedText(x2, d2.text || "Track title", 24, 332, 265, Math.min(30, d2.textSize), 13, (size2) => `700 ${size2}px ${ff("Arial")}`);
    x2.fillStyle = sub;
    drawFittedText(x2, d2.subtitle || "Artist", 24, 361, 265, 19, 11, (size2) => `${size2}px ${ff("Arial")}`);
    const link = safeMusicLink(d2.link);
    let label = "Music";
    if (link) {
      const host = new URL(link).hostname;
      label = host === "spotify.com" || host.endsWith(".spotify.com") ? "Spotify" : host === "apple.com" || host.endsWith(".apple.com") ? "Apple Music" : host;
      if (!youtubeVideoId(link)) {
        const qr = new Image();
        qr.src = await import_qrcode.default.toDataURL(link, { width: 168, margin: 2, errorCorrectionLevel: "M" });
        await qr.decode();
        x2.drawImage(qr, 238, 372, 58, 58);
      }
    } else if (d2.qrPlaceholder) {
      x2.save();
      x2.strokeStyle = ink;
      x2.lineWidth = 1.5;
      x2.setLineDash([4, 4]);
      x2.strokeRect(238, 372, 58, 58);
      x2.setLineDash([]);
      x2.fillStyle = ink;
      x2.font = "600 13px Arial";
      x2.textAlign = "center";
      x2.textBaseline = "middle";
      x2.fillText("QR", 267, 402);
      x2.restore();
    }
    x2.strokeStyle = ink;
    x2.lineWidth = 2;
    x2.beginPath();
    x2.moveTo(27, 395);
    x2.lineTo(27, 414);
    x2.lineTo(31, 411);
    x2.moveTo(27, 396);
    x2.lineTo(37, 393);
    x2.lineTo(37, 407);
    x2.stroke();
    x2.fillStyle = ink;
    x2.font = "600 14px Arial";
    x2.fillText(label, 47, 412, 175);
    return c2.toDataURL("image/png");
  }
  if (d2.kind === "Music" && d2.format === "Disc") {
    x2.fillStyle = "#171717";
    x2.beginPath();
    x2.arc(w2 / 2, h2 / 2, w2 / 2 - 6, 0, Math.PI * 2);
    x2.fill();
    x2.strokeStyle = "#353535";
    for (let r2 = 105; r2 < 150; r2 += 7) {
      x2.beginPath();
      x2.arc(w2 / 2, h2 / 2, r2, 0, Math.PI * 2);
      x2.stroke();
    }
    x2.save();
    x2.beginPath();
    x2.arc(w2 / 2, 126, 84, 0, Math.PI * 2);
    x2.clip();
    x2.fillStyle = "#505d56";
    x2.fillRect(76, 42, 168, 168);
    if (image2) {
      const side = Math.min(image2.width, image2.height);
      x2.drawImage(image2, (image2.width - side) / 2, (image2.height - side) / 2, side, side, 76, 42, 168, 168);
    }
    x2.restore();
    x2.fillStyle = "#171717";
    x2.beginPath();
    x2.arc(w2 / 2, 126, 10, 0, Math.PI * 2);
    x2.fill();
    x2.strokeStyle = "#777";
    x2.lineWidth = 2;
    x2.stroke();
    x2.textAlign = "center";
    x2.fillStyle = "#fff";
    drawFittedText(x2, d2.text || "Track title", w2 / 2, 243, 205, Math.min(25, d2.textSize), 12, (size2) => `700 ${size2}px ${ff("Arial")}`);
    x2.fillStyle = "#b5b5b5";
    drawFittedText(x2, d2.subtitle || "Artist", w2 / 2, 270, 180, 16, 10, (size2) => `${size2}px ${ff("Arial")}`);
    return c2.toDataURL("image/png");
  }
  const round = (r2) => {
    x2.beginPath();
    x2.roundRect(5, 5, w2 - 10, h2 - 10, r2);
    x2.fill();
  };
  x2.fillStyle = d2.kind === "Audio" || d2.kind === "Music" ? "#171717" : d2.kind === "Stamps" ? d2.agedPaper ? "#e6d4ae" : "#fff" : d2.colour;
  if (d2.kind === "Music" && d2.format === "Disc") {
    x2.beginPath();
    x2.arc(w2 / 2, h2 / 2, w2 / 2 - 6, 0, Math.PI * 2);
    x2.fill();
    x2.strokeStyle = "#363636";
    for (let r2 = 55; r2 < 150; r2 += 7) {
      x2.beginPath();
      x2.arc(w2 / 2, h2 / 2, r2, 0, Math.PI * 2);
      x2.stroke();
    }
  } else if (d2.kind === "Stamps") {
    x2.fillRect(7, 7, w2 - 14, h2 - 14);
    if (d2.agedPaper) agedPaperTexture(x2, w2, h2);
  } else round(d2.kind === "Audio" && d2.format === "Pill" ? h2 / 2 : 8);
  if (d2.kind === "Post-its") {
    x2.save();
    x2.beginPath();
    x2.roundRect(5, 5, w2 - 10, h2 - 10, 8);
    x2.clip();
    const shade = x2.createLinearGradient(0, 5, 0, h2 - 5);
    shade.addColorStop(0, "rgba(92,72,28,.05)");
    shade.addColorStop(0.2, "rgba(255,255,255,.035)");
    shade.addColorStop(1, "rgba(92,72,28,.025)");
    x2.fillStyle = shade;
    x2.fillRect(5, 5, w2 - 10, h2 - 10);
    x2.fillStyle = x2.createPattern(paperGrain(), "repeat");
    x2.fillRect(5, 5, w2 - 10, h2 - 10);
    x2.restore();
  }
  if (d2.kind === "Stamps") {
    x2.strokeStyle = "#555";
    x2.lineWidth = 1.2;
    x2.strokeRect(7, 7, w2 - 14, h2 - 14);
    x2.globalCompositeOperation = "destination-out";
    const notch = 4.8, step = 17;
    for (let px = 16; px < w2 - 10; px += step) {
      for (const py of [7, h2 - 7]) {
        x2.beginPath();
        x2.arc(px, py, notch, 0, Math.PI * 2);
        x2.fill();
      }
    }
    for (let py = 16; py < h2 - 10; py += step) {
      for (const px of [7, w2 - 7]) {
        x2.beginPath();
        x2.arc(px, py, notch, 0, Math.PI * 2);
        x2.fill();
      }
    }
    x2.globalCompositeOperation = "source-over";
    x2.save();
    x2.beginPath();
    x2.rect(7, 7, w2 - 14, h2 - 14);
    x2.clip();
    x2.strokeStyle = "#777";
    x2.lineWidth = 1;
    for (let px = 16; px < w2 - 10; px += step) for (const py of [7, h2 - 7]) {
      x2.beginPath();
      x2.arc(px, py, notch, 0, Math.PI * 2);
      x2.stroke();
    }
    for (let py = 16; py < h2 - 10; py += step) for (const px of [7, w2 - 7]) {
      x2.beginPath();
      x2.arc(px, py, notch, 0, Math.PI * 2);
      x2.stroke();
    }
    x2.restore();
    if (d2.format === "Dotted") {
      x2.strokeStyle = "#555";
      x2.lineWidth = 1.5;
      x2.setLineDash([1, 5]);
      x2.strokeRect(21, 21, w2 - 42, h2 - 42);
      x2.setLineDash([]);
    }
  }
  if (d2.kind === "Video" && d2.videoSkin && !d2.videoAssetId) {
    const vik = "#171717";
    x2.save();
    if (d2.videoSkin === "film") {
      x2.fillStyle = vik;
      x2.fillRect(5, 5, w2 - 10, 26);
      x2.fillStyle = d2.colour;
      for (let px = 16; px < w2 - 24; px += 26) {
        x2.beginPath();
        x2.roundRect(px, 12, 14, 12, 3);
        x2.fill();
      }
    } else if (d2.videoSkin === "vhs") {
      x2.strokeStyle = vik;
      x2.lineWidth = 3;
      x2.strokeRect(28, 28, w2 - 56, 110);
      for (const cx of [w2 / 2 - 62, w2 / 2 + 62]) {
        x2.beginPath();
        x2.arc(cx, 83, 34, 0, Math.PI * 2);
        x2.stroke();
        x2.beginPath();
        x2.arc(cx, 83, 8, 0, Math.PI * 2);
        x2.stroke();
        for (let a3 = 0; a3 < 6; a3++) {
          const t2 = a3 * Math.PI / 3;
          x2.beginPath();
          x2.moveTo(cx + 10 * Math.cos(t2), 83 + 10 * Math.sin(t2));
          x2.lineTo(cx + 32 * Math.cos(t2), 83 + 32 * Math.sin(t2));
          x2.stroke();
        }
      }
    } else if (d2.videoSkin === "cam") {
      x2.strokeStyle = vik;
      x2.lineWidth = 3;
      const vm = 18, vl = 26, vb = h2 - 70;
      for (const [bx, by, dx, dy] of [[vm, vm, 1, 1], [w2 - vm, vm, -1, 1], [vm, vb, 1, -1], [w2 - vm, vb, -1, -1]]) {
        x2.beginPath();
        x2.moveTo(bx + dx * vl, by);
        x2.lineTo(bx, by);
        x2.lineTo(bx, by + dy * vl);
        x2.stroke();
      }
      x2.fillStyle = "#c3342f";
      x2.beginPath();
      x2.arc(vm + 16, vm + 22, 7, 0, Math.PI * 2);
      x2.fill();
      x2.fillStyle = vik;
      x2.font = "700 15px Arial";
      x2.textAlign = "left";
      x2.textBaseline = "middle";
      x2.fillText("REC", vm + 30, vm + 23);
    }
    x2.restore();
  }
  if (image2) {
    x2.save();
    if (d2.kind === "Music" && d2.format === "Disc") {
      x2.beginPath();
      x2.arc(w2 / 2, h2 / 2, 65, 0, Math.PI * 2);
      x2.clip();
      x2.drawImage(image2, w2 / 2 - 65, h2 / 2 - 65, 130, 130);
    } else {
      const iw = d2.kind === "Stamps" ? w2 - 60 : w2 - 40, ih = d2.kind === "Stamps" ? h2 - 100 : h2 * 0.5;
      const scale = Math.max(iw / image2.naturalWidth, ih / image2.naturalHeight);
      const sw = iw / scale, sh = ih / scale;
      if (d2.kind === "Stamps") {
        x2.drawImage(stampPhoto(image2, iw * 3, ih * 3, d2.stampFilter), 30, 30, iw, ih);
      } else {
        x2.drawImage(image2, (image2.naturalWidth - sw) / 2, (image2.naturalHeight - sh) / 2, sw, sh, 20, 20, iw, ih);
      }
    }
    x2.restore();
  }
  x2.fillStyle = d2.kind === "Audio" || d2.kind === "Music" ? "#fff" : "#171717";
  x2.textAlign = "center";
  if (d2.kind === "Audio") {
    const card = d2.format === "Card";
    for (let i2 = 0; i2 < 36; i2++) {
      const bh = card ? 18 + i2 * 17 % 64 : 12 + i2 * 17 % 40;
      const x0 = card ? 84 : 88, span = card ? w2 - 114 : w2 - 126, bw = card ? 5 : 4;
      x2.fillRect(x0 + i2 * span / 36, h2 * 0.42 - bh / 2, bw, bh);
    }
  }
  const family = ff(d2.kind === "Post-its" ? "Georgia" : "Arial");
  const wrapText = (raw) => d2.kind === "Stamps" ? [raw.replace(/\s+/g, " ").trim()] : raw.split("\n").flatMap((l3) => {
    const words = l3.split(" "), out = [];
    let line = "";
    for (const word of words) {
      if (x2.measureText(line + " " + word).width > w2 - 50 && line) {
        out.push(line);
        line = word;
      } else line += (line ? " " : "") + word;
    }
    out.push(line);
    return out;
  });
  const rawText = d2.kind === "Stamps" ? d2.text : d2.text || (d2.kind === "Post-its" ? translate("Your note") : "");
  let size = d2.textSize;
  x2.font = `600 ${size}px ${family}`;
  let lines = wrapText(rawText);
  const filmPh = d2.kind === "Video" && d2.videoSkin === "film" && !d2.videoAssetId;
  if (d2.kind === "Post-its" && (lines.length > Math.floor((h2 - 70) / (d2.textSize * 1.2)) || lines.some((line) => x2.measureText(line).width > w2 - 50))) throw Error("This note does not fit. Shorten the text, add line breaks or reduce the text size.");
  if (d2.kind !== "Post-its") {
    const baseY = d2.kind === "Audio" ? h2 * 0.75 : d2.kind === "Stamps" ? h2 - 35 : filmPh ? h2 - 66 : h2 - 55;
    const firstY = () => d2.kind === "Audio" && lines.length > 1 ? Math.min(baseY, h2 - 22 - (lines.length - 1) * size * 1.2) : baseY;
    const fits = () => lines.length <= 2 && lines.every((line) => x2.measureText(line).width <= w2 - 40) && (d2.kind === "Audio" ? lines.length === 1 ? baseY <= h2 - 22 : firstY() - size * 0.8 >= h2 * 0.42 + 28 : baseY + (lines.length - 1) * size * 1.2 <= h2 - 32);
    while (!fits() && size > 10) {
      size -= 1;
      x2.font = `600 ${size}px ${family}`;
      lines = wrapText(rawText);
    }
    lines.splice(2);
  }
  x2.textBaseline = d2.kind === "Post-its" ? "middle" : "alphabetic";
  const y = d2.kind === "Post-its" ? h2 / 2 - (lines.length - 1) * d2.textSize * 0.6 : d2.kind === "Audio" ? lines.length > 1 ? Math.min(h2 * 0.75, h2 - 22 - (lines.length - 1) * size * 1.2) : h2 * 0.75 : d2.kind === "Stamps" ? h2 - 35 : filmPh ? h2 - 66 : h2 - 55;
  lines.forEach((l3, i2) => x2.fillText(l3, w2 / 2, y + i2 * size * 1.2, w2 - 40));
  x2.font = `14px ${ff("Arial")}`;
  x2.fillText(d2.subtitle, w2 / 2, filmPh ? h2 - 42 : h2 - 24, w2 - 40);
  if (filmPh) {
    x2.fillStyle = "#171717";
    x2.fillRect(5, h2 - 31, w2 - 10, 26);
    x2.fillStyle = d2.colour;
    for (let px = 16; px < w2 - 24; px += 26) {
      x2.beginPath();
      x2.roundRect(px, h2 - 24, 14, 12, 3);
      x2.fill();
    }
  }
  return c2.toDataURL("image/png");
}

// rendering-source/src/lib/inspired-templates.ts
var INSPIRED_TEMPLATES = {
  "The Anniversary": [[{ "kind": "text", "x": 80, "y": 100, "w": 420, "h": 40, "text": "WHERE IT BEGAN", "fontSize": 15, "font": "dmsans" }, { "kind": "text", "x": 78, "y": 138, "w": 620, "h": 64, "text": "Where It Began", "fontSize": 48 }, { "kind": "text", "x": 80, "y": 252, "w": 600, "h": 100, "text": "[Write the first line of your story here \u2014 the place, the date, the feeling you still keep.]", "fontSize": 20, "font": "kalam" }, { "kind": "element", "x": 140, "y": 430, "w": 250, "h": 281, "design": { "kind": "Date", "dateStyle": "Calendar", "dateLabel": "None", "subtitle": "2027-06-14" } }, { "kind": "text", "x": 140, "y": 745, "w": 320, "h": 40, "text": "The day it all began", "fontSize": 20, "font": "kalam" }, { "kind": "photo", "x": 1080, "y": 150, "w": 330, "h": 326, "rotation": 1.5, "format": "polaroid", "caption": "[the beginning]" }, { "kind": "shape", "shape": "circle", "x": 1010, "y": 560, "w": 140, "h": 140, "rotation": -3, "text": "[sticker: two coffee cups]", "fontSize": 16, "font": "kalam" }, { "kind": "text", "x": 992, "y": 930, "w": 640, "h": 40, "text": "The first page was already ours.  Est. [YEAR]", "fontSize": 20, "font": "kalam" }], [{ "kind": "text", "x": 80, "y": 100, "w": 420, "h": 40, "text": "OUR SOUNDTRACK", "fontSize": 15, "font": "dmsans" }, { "kind": "text", "x": 78, "y": 138, "w": 640, "h": 48, "text": "The songs that followed us home", "fontSize": 34 }, { "kind": "element", "x": 80, "y": 260, "w": 300, "h": 413, "design": { "kind": "Music", "format": "Card", "text": "[Our Song]", "subtitle": "[Artist]", "cardColour": "#252525", "qrPlaceholder": true } }, { "kind": "text", "x": 80, "y": 700, "w": 620, "h": 110, "text": "01. [Track One \u2014 where we heard it]\n02. [Track Two \u2014 late night drive]\n03. [Track Three \u2014 Sunday morning]", "fontSize": 20, "font": "kalam" }, { "kind": "element", "x": 1030, "y": 150, "w": 340, "h": 246, "design": { "kind": "Audio", "format": "Card", "text": "What I was thinking that night", "subtitle": "0:34", "textSize": 20 } }, { "kind": "element", "x": 1080, "y": 470, "w": 240, "h": 240, "rotation": -2, "design": { "kind": "Post-its", "format": "Square", "text": "[Write the lyric that always brings us back...]", "colour": "#f4e6ba", "textSize": 18, "textFont": "kalam" } }], [{ "kind": "text", "x": 80, "y": 100, "w": 420, "h": 40, "text": "SMALL BEGINNINGS", "fontSize": 15, "font": "dmsans" }, { "kind": "photo", "x": 110, "y": 280, "w": 300, "h": 478, "rotation": -1, "format": "instax-mini", "strip": 3 }, { "kind": "text", "x": 110, "y": 700, "w": 620, "h": 40, "text": "[first month] \xB7 [early days] \xB7 [still beginning]", "fontSize": 16, "font": "kalam" }, { "kind": "text", "x": 440, "y": 400, "w": 380, "h": 80, "text": "Every month added a page to who we are.", "fontSize": 22, "font": "kalam" }, { "kind": "text", "x": 992, "y": 110, "w": 400, "h": 40, "text": "WHAT WE SAID", "fontSize": 15, "font": "dmsans" }, { "kind": "bubble", "x": 992, "y": 180, "w": 420, "h": 64, "text": "Do you remember the exact minute?", "time": "09:14" }, { "kind": "bubble", "x": 1250, "y": 290, "w": 420, "h": 64, "text": "Best kind of nervous.", "time": "09:16" }, { "kind": "bubble", "x": 992, "y": 400, "w": 480, "h": 64, "text": "I still get nervous when I think about it.", "time": "09:17" }, { "kind": "text", "x": 992, "y": 540, "w": 600, "h": 40, "text": "Screenshots I never deleted.", "fontSize": 20, "font": "kalam" }], [{ "kind": "text", "x": 80, "y": 100, "w": 420, "h": 40, "text": "A LETTER TO US", "fontSize": 15, "font": "dmsans" }, { "kind": "text", "x": 78, "y": 138, "w": 400, "h": 40, "text": "Keep this one.", "fontSize": 24, "font": "kalam" }, { "kind": "element", "x": 110, "y": 215, "w": 380, "h": 537, "rotation": -1, "design": { "kind": "Letter", "text": "Write your anniversary letter here...", "letterFont": "Calligraphy", "letterPaper": "Parchment", "letterExtras": ["capital", "seal", "ornaments"], "textSize": 34, "letterDate": "14 June 2027" } }, { "kind": "text", "x": 992, "y": 110, "w": 640, "h": 46, "text": "PROMISES FOR NEXT YEAR", "fontSize": 34 }, { "kind": "text", "x": 992, "y": 225, "w": 620, "h": 110, "text": "01. [Promise one]\n02. [Promise two]\n03. [Promise three]", "fontSize": 22, "font": "kalam" }, { "kind": "element", "x": 1080, "y": 520, "w": 300, "h": 300, "design": { "kind": "Video", "text": "[VIDEO]", "subtitle": "Our year in motion", "colour": "#eceae4", "textSize": 22, "videoSkin": "film" } }]],
  "Away Together": [[{ "kind": "text", "x": 80, "y": 100, "w": 460, "h": 40, "text": "DEPARTURE", "fontSize": 15, "font": "dmsans" }, { "kind": "text", "x": 78, "y": 138, "w": 620, "h": 64, "text": "Departure", "fontSize": 48 }, { "kind": "text", "x": 80, "y": 252, "w": 620, "h": 90, "text": "A notebook for two. Ticket stubs, receipts, the roads we took \u2014 start here: [where we left from] \u2192 [where we landed].", "fontSize": 18, "font": "kalam" }, { "kind": "element", "x": 80, "y": 420, "w": 480, "h": 320, "design": { "kind": "Combination", "comboFormat": "Memory Map", "text": "[City A] \u2192 [City B] \u2192 [City C]" } }, { "kind": "text", "x": 80, "y": 755, "w": 620, "h": 40, "text": "[City A] \u2192 [City B] \u2192 [City C]", "fontSize": 20, "font": "kalam" }, { "kind": "text", "x": 80, "y": 805, "w": 600, "h": 40, "text": "[number] days \xB7 [number] trains \xB7 [number] wrong turns", "fontSize": 16, "font": "dmsans" }, { "kind": "element", "x": 1060, "y": 140, "w": 250, "h": 281, "design": { "kind": "Date", "dateStyle": "Calendar", "dateLabel": "None", "subtitle": "2026-09-12" } }, { "kind": "text", "x": 1060, "y": 455, "w": 320, "h": 40, "text": "[number] km travelled", "fontSize": 20, "font": "kalam" }, { "kind": "shape", "shape": "circle", "x": 1460, "y": 160, "w": 130, "h": 130, "rotation": 2, "text": "[sticker: a compass]", "fontSize": 16, "font": "kalam" }, { "kind": "text", "x": 992, "y": 930, "w": 640, "h": 40, "text": "The long way round was always the right way.", "fontSize": 20, "font": "kalam" }], [{ "kind": "text", "x": 78, "y": 110, "w": 620, "h": 54, "text": "The Route We Took", "fontSize": 40 }, { "kind": "element", "x": 110, "y": 250, "w": 230, "h": 296, "rotation": -1.5, "design": { "kind": "Stamps", "format": "Perforated", "text": "3 views from [place]", "agedPaper": true, "stampFilter": "Green engraving" } }, { "kind": "text", "x": 110, "y": 620, "w": 600, "h": 40, "text": "Day [n] in [place] \u2014 We stayed longer than we planned.", "fontSize": 20, "font": "kalam" }, { "kind": "text", "x": 992, "y": 200, "w": 400, "h": 40, "text": "VIEWS & POSTCARDS", "fontSize": 15, "font": "dmsans" }, { "kind": "element", "x": 950, "y": 260, "w": 700, "h": 284, "rotation": 1, "design": { "kind": "Combination", "comboFormat": "Postcard", "text": "Dear us, remember [moment]?", "comboFields": { "caption": "Dear us, remember [moment]?", "message": "Dear us, remember [moment]? Keep this one.", "address": "[name]\n[street]\n[city], [country]" } } }], [{ "kind": "text", "x": 78, "y": 110, "w": 620, "h": 54, "text": "Best Moments", "fontSize": 40 }, { "kind": "element", "x": 110, "y": 240, "w": 300, "h": 300, "design": { "kind": "Video", "text": "[VIDEO]", "subtitle": "Through the train window \xB7 0:42", "colour": "#eceae4", "textSize": 22, "videoSkin": "cam" } }, { "kind": "text", "x": 110, "y": 600, "w": 620, "h": 110, "text": "Best meal \u2014 [dish] at [place]\nBest drink \u2014 [drink] at [time of day]\nWe got lost \u2014 [number] hours in [place]", "fontSize": 20, "font": "kalam" }, { "kind": "element", "x": 1e3, "y": 220, "w": 450, "h": 141, "design": { "kind": "Audio", "format": "Pill", "text": "The sound of [place] at [time of day]", "subtitle": "0:24", "textSize": 20 } }, { "kind": "photo", "x": 1150, "y": 440, "w": 300, "h": 297, "rotation": 1.5, "format": "polaroid", "caption": "[place] \xB7 [date]" }], [{ "kind": "text", "x": 78, "y": 110, "w": 640, "h": 54, "text": "Souvenirs & Next Time", "fontSize": 40 }, { "kind": "element", "x": 80, "y": 220, "w": 480, "h": 320, "design": { "kind": "Combination", "comboFormat": "Travel Keepsake", "text": "[place] \xB7 [weather] \xB7 Favourite dish: [dish]" } }, { "kind": "text", "x": 80, "y": 565, "w": 620, "h": 40, "text": "[place] \xB7 [weather] \u2014 Favourite dish: [dish]", "fontSize": 20, "font": "kalam" }, { "kind": "text", "x": 80, "y": 620, "w": 620, "h": 40, "text": "We came for [place] and left with [feeling].", "fontSize": 22, "font": "kalam" }, { "kind": "element", "x": 1050, "y": 180, "w": 260, "h": 260, "rotation": -2, "design": { "kind": "Post-its", "format": "Square", "text": "Our 3 secret addresses to remember:\n1. [...]\n2. [...]\n3. [...]", "colour": "#cfe6c3", "textSize": 18, "textFont": "kalam" } }, { "kind": "text", "x": 992, "y": 520, "w": 640, "h": 40, "text": "Where to next: [place]. The list is already started.", "fontSize": 20, "font": "kalam" }]],
  "The Big Night": [[{ "kind": "text", "x": 80, "y": 100, "w": 400, "h": 40, "text": "THE INVITATION", "fontSize": 15, "font": "dmsans" }, { "kind": "text", "x": 78, "y": 138, "w": 620, "h": 64, "text": "The Big Night", "fontSize": 48 }, { "kind": "text", "x": 80, "y": 250, "w": 620, "h": 40, "text": "A night for [name] and [name], and all who came.", "fontSize": 20, "font": "kalam" }, { "kind": "element", "x": 60, "y": 420, "w": 740, "h": 290, "rotation": -1, "design": { "kind": "Combination", "comboFormat": "Concert Ticket", "comboFields": { "presenter": "Tonight's programme", "event": "[Event name]", "date": "[Date]", "venue": "[Venue]", "city": "[City]", "section": "[Section]", "row": "[Row]", "seat": "[Seat]" } } }, { "kind": "text", "x": 80, "y": 770, "w": 620, "h": 40, "text": "Keep this stub. Proof you were there that night.", "fontSize": 18, "font": "kalam" }, { "kind": "element", "x": 1060, "y": 150, "w": 250, "h": 281, "design": { "kind": "Date", "dateStyle": "Calendar", "dateLabel": "None", "subtitle": "2027-06-14" } }, { "kind": "text", "x": 1060, "y": 465, "w": 300, "h": 40, "text": "[CITY]", "fontSize": 18, "font": "dmsans" }, { "kind": "element", "x": 1090, "y": 540, "w": 240, "h": 330, "design": { "kind": "Music", "format": "Card", "text": "The track that started it all", "subtitle": "[Song] \xB7 [Artist]", "cardColour": "#252525" } }], [{ "kind": "text", "x": 78, "y": 100, "w": 640, "h": 50, "text": "First Through the Door", "fontSize": 36 }, { "kind": "photo", "x": 120, "y": 240, "w": 210, "h": 334, "rotation": -1, "format": "instax-mini", "strip": 4 }, { "kind": "shape", "shape": "circle", "x": 990, "y": 150, "w": 140, "h": 140, "rotation": -3, "text": "[sticker: disco ball]", "fontSize": 16, "font": "kalam" }, { "kind": "photo", "x": 1200, "y": 160, "w": 300, "h": 297, "rotation": 2, "format": "polaroid", "caption": "[name] + [name]" }, { "kind": "text", "x": 992, "y": 560, "w": 660, "h": 130, "text": "20:00 \u2014 Doors open \xB7 [venue]\n20:45 \u2014 First toast\n21:30 \u2014 Speeches \u2014 [name] on the mic\n22:15 \u2014 First dance", "fontSize": 20, "font": "kalam" }], [{ "kind": "text", "x": 78, "y": 110, "w": 620, "h": 54, "text": "The Aftermovie", "fontSize": 40 }, { "kind": "element", "x": 110, "y": 240, "w": 320, "h": 320, "design": { "kind": "Video", "text": "[VIDEO]", "subtitle": "Live set \xB7 [venue]", "colour": "#eceae4", "textSize": 22, "videoSkin": "vhs" } }, { "kind": "text", "x": 110, "y": 630, "w": 600, "h": 40, "text": "To the night we will never stop talking about.", "fontSize": 20, "font": "kalam" }, { "kind": "element", "x": 1030, "y": 170, "w": 340, "h": 246, "design": { "kind": "Audio", "format": "Card", "text": "Everyone singing the chorus", "subtitle": "0:29", "textSize": 20 } }, { "kind": "text", "x": 1e3, "y": 480, "w": 600, "h": 110, "text": "01. [Song title]\n02. [Song title]\n03. [Song title]", "fontSize": 22, "font": "kalam" }], [{ "kind": "text", "x": 78, "y": 110, "w": 620, "h": 54, "text": "The Morning After", "fontSize": 40 }, { "kind": "text", "x": 80, "y": 220, "w": 620, "h": 40, "text": "Coffee, sunglasses, and the same three stories on repeat.", "fontSize": 20, "font": "kalam" }, { "kind": "bubble", "x": 80, "y": 350, "w": 380, "h": 64, "text": "We are here. Where are you?", "time": "21:04" }, { "kind": "bubble", "x": 360, "y": 450, "w": 340, "h": 64, "text": "Front row. Obviously.", "time": "21:06" }, { "kind": "bubble", "x": 80, "y": 550, "w": 340, "h": 64, "text": "Still have no voice.", "time": "09:30" }, { "kind": "element", "x": 1060, "y": 180, "w": 250, "h": 250, "rotation": 2, "design": { "kind": "Post-its", "format": "Square", "text": "Quote of the night: '[...]'", "colour": "#f6c9d4", "textSize": 20, "textFont": "kalam" } }, { "kind": "text", "x": 992, "y": 520, "w": 640, "h": 40, "text": "We danced until [time]. Next one: [occasion].", "fontSize": 20, "font": "kalam" }]],
  "The New Chapter": [[{ "kind": "text", "x": 80, "y": 100, "w": 420, "h": 40, "text": "THE BLANK PAGE", "fontSize": 15, "font": "dmsans" }, { "kind": "text", "x": 78, "y": 138, "w": 620, "h": 64, "text": "The New Chapter", "fontSize": 48 }, { "kind": "text", "x": 80, "y": 252, "w": 620, "h": 90, "text": "A record of the year [name] decided to [big change]. With love and a little fear.", "fontSize": 20, "font": "kalam" }, { "kind": "element", "x": 140, "y": 460, "w": 250, "h": 281, "design": { "kind": "Date", "dateStyle": "Calendar", "dateLabel": "None", "subtitle": "2027-01-01" } }, { "kind": "text", "x": 140, "y": 775, "w": 320, "h": 40, "text": "The day it all started", "fontSize": 18, "font": "kalam" }, { "kind": "photo", "x": 1030, "y": 170, "w": 320, "h": 316, "rotation": 1.5, "format": "polaroid", "caption": "First keys / First box" }, { "kind": "shape", "shape": "circle", "x": 1430, "y": 220, "w": 130, "h": 130, "rotation": -2, "text": "[sticker: new keys]", "fontSize": 16, "font": "kalam" }, { "kind": "text", "x": 992, "y": 570, "w": 640, "h": 40, "text": "Five small boxes, one very big feeling.", "fontSize": 20, "font": "kalam" }], [{ "kind": "text", "x": 78, "y": 110, "w": 660, "h": 54, "text": "Goodbyes & Packing", "fontSize": 40 }, { "kind": "text", "x": 80, "y": 240, "w": 620, "h": 80, "text": "The people who made it home: [names]\nWhat I will miss most: [memory]", "fontSize": 20, "font": "kalam" }, { "kind": "element", "x": 110, "y": 480, "w": 340, "h": 246, "design": { "kind": "Audio", "format": "Card", "text": "A voice note from [Name] before you start", "subtitle": "1:05", "textSize": 20 } }, { "kind": "text", "x": 992, "y": 110, "w": 420, "h": 40, "text": "FOR THIS NEW ADVENTURE", "fontSize": 15, "font": "dmsans" }, { "kind": "element", "x": 1010, "y": 160, "w": 360, "h": 509, "rotation": 1, "design": { "kind": "Letter", "text": "For this new adventure... [write what you wish for them here]", "letterFont": "Calligraphy", "letterPaper": "Parchment", "letterExtras": ["capital", "seal", "ornaments"], "textSize": 34 } }], [{ "kind": "text", "x": 78, "y": 110, "w": 620, "h": 54, "text": "The Bucket List", "fontSize": 40 }, { "kind": "element", "x": 90, "y": 230, "w": 230, "h": 230, "rotation": -2, "design": { "kind": "Post-its", "format": "Square", "text": "To discover:\n[...]", "colour": "#f4e6ba", "textSize": 20, "textFont": "kalam" } }, { "kind": "element", "x": 90, "y": 510, "w": 230, "h": 230, "rotation": 1.5, "design": { "kind": "Post-its", "format": "Square", "text": "To dare:\n[...]", "colour": "#c9dcef", "textSize": 20, "textFont": "kalam" } }, { "kind": "element", "x": 992, "y": 190, "w": 230, "h": 230, "rotation": -1, "design": { "kind": "Post-its", "format": "Square", "text": "To celebrate:\n[...]", "colour": "#cfe6c3", "textSize": 20, "textFont": "kalam" } }, { "kind": "photo", "x": 1300, "y": 180, "w": 200, "h": 319, "rotation": 2, "format": "instax-mini", "caption": "First coffee in the new neighbourhood" }, { "kind": "text", "x": 992, "y": 610, "w": 660, "h": 40, "text": "Home is [place] now, and it fits \u2014 warmer than we expected.", "fontSize": 20, "font": "kalam" }], [{ "kind": "text", "x": 78, "y": 110, "w": 620, "h": 54, "text": "What Comes Next", "fontSize": 40 }, { "kind": "text", "x": 80, "y": 230, "w": 640, "h": 110, "text": "1. Where do I hope to be this time next year?\n2. What am I still a little afraid of?\n3. What will I say yes to next?", "fontSize": 20, "font": "kalam" }, { "kind": "element", "x": 90, "y": 500, "w": 300, "h": 413, "design": { "kind": "Music", "format": "Card", "text": "Anthem for this chapter", "subtitle": "[Song] \xB7 [Artist]", "cardColour": "#252525", "qrPlaceholder": true } }, { "kind": "element", "x": 1060, "y": 240, "w": 320, "h": 320, "design": { "kind": "Video", "text": "[VIDEO]", "subtitle": "Quick tour of the new place", "colour": "#eceae4", "textSize": 22 } }]],
  "The Reunion": [[{ "kind": "text", "x": 78, "y": 138, "w": 620, "h": 64, "text": "The Reunion", "fontSize": 48 }, { "kind": "text", "x": 80, "y": 250, "w": 620, "h": 40, "text": "A whole year of counting down...", "fontSize": 22, "font": "kalam" }, { "kind": "text", "x": 80, "y": 370, "w": 620, "h": 80, "text": "[Number] days we were apart\n[Number] kilometres between us", "fontSize": 20, "font": "dmsans" }, { "kind": "element", "x": 80, "y": 500, "w": 460, "h": 307, "design": { "kind": "Combination", "comboFormat": "Memory Map", "text": "[City A] \u2194 [City B] \u2014 the meeting point" } }, { "kind": "text", "x": 80, "y": 830, "w": 660, "h": 40, "text": "[City A] \u2194 [City B] \u2014 the meeting point", "fontSize": 20, "font": "kalam" }, { "kind": "bubble", "x": 992, "y": 180, "w": 360, "h": 64, "text": "Are you really coming?", "time": "21:14" }, { "kind": "bubble", "x": 1150, "y": 290, "w": 500, "h": 64, "text": "Already packed. Outside the station.", "time": "21:15" }, { "kind": "text", "x": 992, "y": 450, "w": 600, "h": 40, "text": "The countdown is finally over.", "fontSize": 20, "font": "kalam" }], [{ "kind": "text", "x": 78, "y": 100, "w": 620, "h": 54, "text": "Like Yesterday", "fontSize": 40 }, { "kind": "photo", "x": 110, "y": 260, "w": 300, "h": 478, "rotation": -1, "format": "instax-mini", "strip": 3 }, { "kind": "shape", "shape": "circle", "x": 990, "y": 150, "w": 150, "h": 150, "rotation": -2, "text": "[sticker: ticket home]", "fontSize": 16, "font": "kalam" }, { "kind": "photo", "x": 1200, "y": 180, "w": 300, "h": 297, "rotation": 1.5, "format": "polaroid", "caption": "There you were" }, { "kind": "text", "x": 992, "y": 560, "w": 640, "h": 40, "text": "The paper that finally made it real.", "fontSize": 20, "font": "kalam" }], [{ "kind": "text", "x": 78, "y": 110, "w": 620, "h": 54, "text": "First Days Back", "fontSize": 40 }, { "kind": "text", "x": 80, "y": 220, "w": 620, "h": 40, "text": "Picking up right where we left off, as if no time had passed.", "fontSize": 20, "font": "kalam" }, { "kind": "element", "x": 90, "y": 460, "w": 460, "h": 144, "design": { "kind": "Audio", "format": "Pill", "text": "The story we couldn't stop laughing about", "subtitle": "0:47", "textSize": 20 } }, { "kind": "element", "x": 1060, "y": 240, "w": 320, "h": 320, "design": { "kind": "Video", "text": "[VIDEO]", "subtitle": "The reunion toast", "colour": "#eceae4", "textSize": 22, "videoSkin": "film" } }], [{ "kind": "text", "x": 78, "y": 110, "w": 620, "h": 54, "text": "Next Time", "fontSize": 40 }, { "kind": "text", "x": 80, "y": 215, "w": 600, "h": 40, "text": "Send it before I miss you", "fontSize": 22, "font": "kalam" }, { "kind": "text", "x": 80, "y": 310, "w": 620, "h": 110, "text": "[ ]  Place: [...]\n[ ]  Date: [...]\n[ ]  Our song: [...]", "fontSize": 20, "font": "dmsans" }, { "kind": "element", "x": 480, "y": 580, "w": 240, "h": 240, "rotation": -2, "design": { "kind": "Post-its", "format": "Square", "text": "What we're doing next time we meet: [...]", "colour": "#f4e6ba", "textSize": 18, "textFont": "kalam" } }, { "kind": "photo", "x": 1080, "y": 230, "w": 330, "h": 326, "rotation": 1, "format": "polaroid", "caption": "All of us \xB7 [date]" }]],
  "The Firsts": [[{ "kind": "text", "x": 80, "y": 100, "w": 420, "h": 40, "text": "THE FIRSTS", "fontSize": 15, "font": "dmsans" }, { "kind": "text", "x": 78, "y": 138, "w": 620, "h": 64, "text": "The Beginning", "fontSize": 48 }, { "kind": "text", "x": 80, "y": 252, "w": 600, "h": 40, "text": "[Write a little note here about how it all started...]", "fontSize": 20, "font": "kalam" }, { "kind": "element", "x": 140, "y": 430, "w": 250, "h": 281, "design": { "kind": "Date", "dateStyle": "Calendar", "dateLabel": "None", "subtitle": "2026-03-03" } }, { "kind": "text", "x": 140, "y": 745, "w": 320, "h": 40, "text": "The very first day", "fontSize": 18, "font": "kalam" }, { "kind": "photo", "x": 1080, "y": 200, "w": 330, "h": 326, "rotation": 1.5, "format": "polaroid", "caption": "The first date / The first day" }, { "kind": "shape", "shape": "circle", "x": 1030, "y": 620, "w": 130, "h": 130, "rotation": -3, "text": "[sticker: a lucky charm]", "fontSize": 16, "font": "kalam" }], [{ "kind": "text", "x": 78, "y": 110, "w": 620, "h": 54, "text": "Our Firsts So Far", "fontSize": 40 }, { "kind": "text", "x": 80, "y": 230, "w": 620, "h": 140, "text": "First coffee: [place]\nFirst trip: [destination]\nFirst home: [address]\nFirst \u2018I love you\u2019: [moment]", "fontSize": 20, "font": "kalam" }, { "kind": "element", "x": 110, "y": 570, "w": 220, "h": 283, "rotation": -1, "design": { "kind": "Stamps", "format": "Perforated", "text": "First smile, first step, first trip..." } }, { "kind": "element", "x": 1030, "y": 180, "w": 260, "h": 260, "rotation": 2, "design": { "kind": "Post-its", "format": "Square", "text": "[a dated caption for each photo]", "colour": "#f6c9d4", "textSize": 18, "textFont": "kalam" } }], [{ "kind": "text", "x": 78, "y": 110, "w": 660, "h": 50, "text": "First Song, First Message", "fontSize": 36 }, { "kind": "element", "x": 100, "y": 240, "w": 340, "h": 246, "design": { "kind": "Audio", "format": "Card", "text": "The very first recording", "subtitle": "0:19", "textSize": 20 } }, { "kind": "text", "x": 80, "y": 550, "w": 620, "h": 40, "text": '"[The lyric or words that felt like us]"', "fontSize": 22, "font": "kalam" }, { "kind": "element", "x": 1060, "y": 240, "w": 320, "h": 320, "design": { "kind": "Video", "text": "[VIDEO]", "subtitle": "First moments on tape", "colour": "#eceae4", "textSize": 22, "videoSkin": "cam" } }], [{ "kind": "text", "x": 78, "y": 110, "w": 660, "h": 50, "text": "A Letter to Our Future", "fontSize": 36 }, { "kind": "element", "x": 70, "y": 240, "w": 720, "h": 292, "rotation": -1, "design": { "kind": "Combination", "comboFormat": "Postcard", "text": "When you read this years from now...", "comboFields": { "caption": "When you read this years from now...", "message": "When you read this years from now...", "address": "[us]\n[home]\n[the future]" } } }, { "kind": "element", "x": 1030, "y": 180, "w": 260, "h": 260, "rotation": 1, "design": { "kind": "Post-its", "format": "Square", "text": "Still to come: [first road trip], [first home], [first...]", "colour": "#c9dcef", "textSize": 17, "textFont": "kalam" } }, { "kind": "text", "x": 992, "y": 520, "w": 640, "h": 40, "text": "Seal it until [year].", "fontSize": 20, "font": "kalam" }]],
  "The Everyday": [[{ "kind": "text", "x": 78, "y": 138, "w": 620, "h": 64, "text": "The Everyday", "fontSize": 48 }, { "kind": "text", "x": 80, "y": 252, "w": 620, "h": 80, "text": "A notebook for the ordinary mornings, the small evenings, and everything in between.", "fontSize": 18, "font": "kalam" }, { "kind": "element", "x": 90, "y": 440, "w": 230, "h": 259, "design": { "kind": "Date", "dateStyle": "Calendar", "dateLabel": "None", "subtitle": "2026-11-09" } }, { "kind": "text", "x": 90, "y": 730, "w": 300, "h": 40, "text": "Week of [Month / Day]", "fontSize": 16, "font": "kalam" }, { "kind": "element", "x": 400, "y": 430, "w": 230, "h": 316, "design": { "kind": "Music", "format": "Card", "text": "On repeat all week", "subtitle": "[Song] \xB7 [Artist]", "cardColour": "#252525" } }, { "kind": "element", "x": 1e3, "y": 160, "w": 260, "h": 260, "rotation": -2, "design": { "kind": "Post-its", "format": "Square", "text": "Three small joys from this week:\n1. [...]\n2. [...]\n3. [...]", "colour": "#f4e6ba", "textSize": 18, "textFont": "kalam" } }, { "kind": "text", "x": 992, "y": 510, "w": 660, "h": 110, "text": "First coffee, still half asleep\nThe song we play getting ready\nGoodnight, the last thing we say", "fontSize": 20, "font": "kalam" }], [{ "kind": "text", "x": 78, "y": 110, "w": 640, "h": 50, "text": "Ordinary Days, Kept", "fontSize": 36 }, { "kind": "photo", "x": 90, "y": 210, "w": 190, "h": 303, "rotation": -1.5, "format": "instax-mini", "caption": "Morning light in [room]" }, { "kind": "photo", "x": 330, "y": 260, "w": 190, "h": 303, "rotation": 1.5, "format": "instax-mini", "caption": "The walk to [place]" }, { "kind": "shape", "shape": "circle", "x": 990, "y": 170, "w": 150, "h": 150, "rotation": -2, "text": "[sticker: our current read]", "fontSize": 16, "font": "kalam" }, { "kind": "text", "x": 990, "y": 390, "w": 660, "h": 40, "text": "The meals we repeat: [dish] on a [day] night.", "fontSize": 20, "font": "kalam" }], [{ "kind": "text", "x": 78, "y": 110, "w": 640, "h": 50, "text": "A Day, Hour by Hour", "fontSize": 36 }, { "kind": "text", "x": 80, "y": 225, "w": 660, "h": 110, "text": "[08:00] \u2014 First coffee, still half asleep\n[12:30] \u2014 The message that made me smile\n[19:00] \u2014 Home again, [small thing]", "fontSize": 20, "font": "kalam" }, { "kind": "element", "x": 90, "y": 530, "w": 460, "h": 144, "design": { "kind": "Audio", "format": "Pill", "text": "What I want to remember about today", "subtitle": "0:42", "textSize": 20 } }, { "kind": "element", "x": 1060, "y": 200, "w": 260, "h": 260, "rotation": 1, "design": { "kind": "Stamps", "format": "Dotted", "text": "Our usual street at [time]" } }, { "kind": "text", "x": 992, "y": 550, "w": 660, "h": 40, "text": "Record the thing you would only say out loud, the small ordinary one.", "fontSize": 18, "font": "kalam" }], [{ "kind": "text", "x": 78, "y": 110, "w": 660, "h": 48, "text": "Things I Notice, Every Day", "fontSize": 34 }, { "kind": "text", "x": 80, "y": 225, "w": 640, "h": 40, "text": "Your laugh, how you listen, your [habit], your [quality].", "fontSize": 20, "font": "kalam" }, { "kind": "element", "x": 110, "y": 430, "w": 240, "h": 240, "rotation": -1.5, "design": { "kind": "Post-its", "format": "Square", "text": "One thing I learned this week: [...]", "colour": "#cfe6c3", "textSize": 18, "textFont": "kalam" } }, { "kind": "element", "x": 1010, "y": 180, "w": 260, "h": 260, "rotation": 2, "design": { "kind": "Post-its", "format": "Square", "text": "One thing I'm looking forward to next week: [...]", "colour": "#f6c9d4", "textSize": 17, "textFont": "kalam" } }, { "kind": "text", "x": 992, "y": 530, "w": 640, "h": 40, "text": "Nothing special happened, and that was the point.", "fontSize": 22, "font": "kalam" }]],
  "Just Because": [[{ "kind": "text", "x": 78, "y": 138, "w": 620, "h": 64, "text": "Just Because", "fontSize": 48 }, { "kind": "text", "x": 80, "y": 252, "w": 620, "h": 90, "text": "No occasion needed, that is the whole reason. I saw [thing] and thought of you.", "fontSize": 20, "font": "kalam" }, { "kind": "element", "x": 100, "y": 450, "w": 250, "h": 250, "rotation": -2, "design": { "kind": "Post-its", "format": "Square", "text": "No birthday, no holiday. Just wanted to make this for you.", "colour": "#f4e6ba", "textSize": 18, "textFont": "kalam" } }, { "kind": "photo", "x": 1080, "y": 180, "w": 330, "h": 326, "rotation": 1.5, "format": "polaroid", "caption": "This one, because it is just [name]" }], [{ "kind": "text", "x": 78, "y": 110, "w": 620, "h": 54, "text": "Reasons I Love You", "fontSize": 40 }, { "kind": "text", "x": 80, "y": 230, "w": 640, "h": 110, "text": "The way you [habit]\nHow you always [kind thing]\nHow you make [place] feel like home", "fontSize": 20, "font": "kalam" }, { "kind": "shape", "shape": "circle", "x": 90, "y": 520, "w": 120, "h": 120, "rotation": -2, "text": "[sticker: their drink]", "fontSize": 16, "font": "kalam" }, { "kind": "shape", "shape": "circle", "x": 240, "y": 530, "w": 120, "h": 120, "rotation": 1.5, "text": "[sticker: an animal]", "fontSize": 16, "font": "kalam" }, { "kind": "shape", "shape": "circle", "x": 390, "y": 520, "w": 130, "h": 130, "rotation": -1, "text": "[sticker: an inside joke]", "fontSize": 16, "font": "kalam" }, { "kind": "element", "x": 1010, "y": 170, "w": 240, "h": 330, "design": { "kind": "Music", "format": "Card", "text": "Every time I hear this, I think of you", "subtitle": "[Song] \xB7 [Artist]", "cardColour": "#252525" } }, { "kind": "text", "x": 990, "y": 570, "w": 660, "h": 40, "text": "The thing I never say out loud is how [quality] you are.", "fontSize": 20, "font": "kalam" }], [{ "kind": "text", "x": 78, "y": 110, "w": 620, "h": 54, "text": "A Message for You", "fontSize": 40 }, { "kind": "bubble", "x": 80, "y": 230, "w": 430, "h": 64, "text": "[the catchphrase, out of context]", "time": "12:03" }, { "kind": "bubble", "x": 330, "y": 340, "w": 400, "h": 64, "text": "[the reply we still quote]", "time": "12:04" }, { "kind": "element", "x": 1030, "y": 200, "w": 340, "h": 246, "design": { "kind": "Audio", "format": "Card", "text": "A free voice note for your day", "subtitle": "0:31", "textSize": 20 } }, { "kind": "text", "x": 992, "y": 510, "w": 640, "h": 40, "text": "Recorded on a [day], no reason at all.", "fontSize": 20, "font": "kalam" }], [{ "kind": "text", "x": 80, "y": 100, "w": 420, "h": 40, "text": "AN OPEN PAGE", "fontSize": 15, "font": "dmsans" }, { "kind": "element", "x": 110, "y": 180, "w": 380, "h": 475, "rotation": -1, "design": { "kind": "Combination", "comboFormat": "Love Letter", "text": "No occasion, just you, [name]." } }, { "kind": "text", "x": 110, "y": 690, "w": 620, "h": 40, "text": "No occasion, just you, [name].", "fontSize": 22, "font": "kalam" }, { "kind": "photo", "x": 1060, "y": 180, "w": 210, "h": 334, "rotation": 1.5, "format": "instax-mini", "caption": "An ordinary Tuesday with you" }, { "kind": "text", "x": 992, "y": 610, "w": 680, "h": 80, "text": "What I would say if I could keep one memory of us?\nWhat I would say if you doubted how loved you are?", "fontSize": 20, "font": "kalam" }]]
};
function getInspiredTemplate(name) {
  return INSPIRED_TEMPLATES[name] ?? null;
}

// rendering-source/src/lib/inspired-template-render.ts
var seq = 0;
var id = () => `tpl-${++seq}`;
function placeholderPhoto(w2, h2, label) {
  const canvas2 = document.createElement("canvas");
  canvas2.width = w2;
  canvas2.height = h2;
  const ctx = canvas2.getContext("2d");
  ctx.fillStyle = "#efeeea";
  ctx.fillRect(0, 0, w2, h2);
  ctx.strokeStyle = "#d9d6d0";
  ctx.lineWidth = 4;
  ctx.strokeRect(8, 8, w2 - 16, h2 - 16);
  ctx.fillStyle = "#b9b6b0";
  ctx.font = `600 ${Math.round(w2 / 7)}px 'DM Sans', Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, w2 / 2, h2 / 2);
  return canvas2.toDataURL("image/png");
}
function bubbleImage(text, time, w2, h2) {
  const scale = 2, cw = w2 * scale, ch = h2 * scale;
  const canvas2 = document.createElement("canvas");
  canvas2.width = cw;
  canvas2.height = ch;
  const ctx = canvas2.getContext("2d");
  ctx.scale(scale, scale);
  const r2 = h2 * 0.32;
  ctx.fillStyle = "#f2f2f0";
  ctx.beginPath();
  ctx.roundRect(0, 0, w2, h2, r2);
  ctx.fill();
  ctx.fillStyle = "#2b2b2b";
  ctx.font = `26px 'DM Sans', Arial, sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 22, time ? h2 / 2 - 8 : h2 / 2, w2 - 44);
  if (time) {
    ctx.fillStyle = "#8a8a86";
    ctx.font = `16px 'DM Sans', Arial, sans-serif`;
    ctx.textAlign = "right";
    ctx.fillText(time, w2 - 18, h2 - 18);
  }
  return canvas2.toDataURL("image/png");
}
async function toAlbumItem(item) {
  const base = { id: id(), x: "x" in item ? item.x : 0, y: "y" in item ? item.y : 0, w: "w" in item ? item.w : 0, h: "h" in item ? item.h : 0, rotation: "rotation" in item ? item.rotation ?? 0 : 0 };
  switch (item.kind) {
    case "text":
      return { ...base, kind: "text", text: item.text, fontSize: item.fontSize, font: item.font };
    case "shape":
      return { ...base, kind: "shape", shape: item.shape, text: item.text, fontSize: item.fontSize, font: item.font };
    case "stroke":
      return { ...base, kind: "stroke", pts: item.pts, size: item.size, color: item.color, opacity: 1 };
    case "bubble":
      return { ...base, kind: "sticker", src: bubbleImage(item.text, item.time, item.w, item.h) };
    case "photo": {
      const spec = FRAME_SPECS[item.format];
      const strip = item.strip && item.strip >= 2 ? item.strip : 0;
      const photo = strip ? { src: placeholderPhoto(800, 288, "PHOTO"), width: 800, height: 288 } : { src: placeholderPhoto(800, Math.round(800 * spec.card.h / spec.card.w), "PHOTO"), width: 800, height: Math.round(800 * spec.card.h / spec.card.w) };
      const frame = { id: id(), format: item.format, photo, zoom: 1, pan: { x: 0, y: 0 }, caption: item.caption ?? "", captionSize: item.caption && item.caption.length > 14 ? 18 : 28, ...strip ? { stripPhotos: Array.from({ length: strip }, () => ({ photo, zoom: 1, pan: { x: 0, y: 0 } })) } : {} };
      return { ...base, kind: "frame", frame };
    }
    case "element": {
      const design = { ...elementDefaults(item.design.kind), ...item.design };
      let src;
      try {
        src = design.kind === "Combination" && !design.comboItems?.length && design.comboFormat !== "Postcard" && design.comboFormat !== "Concert Ticket" ? await renderComboSkeleton(design.comboFormat || "Memory Map") : await renderElement(design);
      } catch {
        src = await renderElement(elementDefaults(item.design.kind));
      }
      const size = elementSize(design);
      const element = { ...design, id: id(), src, width: size.w, height: size.h };
      return { ...base, kind: "sticker", src, element };
    }
  }
}
async function buildInspiredAlbum(name) {
  const spreads = getInspiredTemplate(name);
  if (!spreads) return null;
  const album = [];
  for (const spread of spreads) album.push(await Promise.all(spread.map(toAlbumItem)));
  return { album, innerPageCount: album.length * 2 };
}

// rendering-source/src/lib/photos.ts
var MAX_PHOTO_BYTES = 15 * 1024 * 1024;
var IMPORT_MAX_SIDE = 2400;
var PASSTHROUGH_BYTES = 3 * 1024 * 1024;
function validatePhotoFile(file) {
  if (file.size === 0) return "This photo is empty. Choose another file.";
  if (!file.type.startsWith("image/")) return "This file is not an image.";
  if (file.size > MAX_PHOTO_BYTES) return "Photo too large (15 MB maximum).";
  return null;
}
function withTimeout(pending) {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => {
      window.clearTimeout(timer);
      reject(new Error("Unable to read this photo. Try a JPEG or PNG."));
    }, 2e4);
    pending.then(
      (image2) => {
        window.clearTimeout(timer);
        resolve(image2);
      },
      (error) => {
        window.clearTimeout(timer);
        reject(error);
      }
    );
  });
}
function loadImage4(file) {
  const pending = typeof createImageBitmap === "function" ? createImageBitmap(file, { imageOrientation: "from-image" }).then((bmp) => ({ source: bmp, width: bmp.width, height: bmp.height, close: () => bmp.close() })).catch(() => loadImageElement(file)) : loadImageElement(file);
  return withTimeout(pending);
}
function loadImageElement(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image2 = new Image();
    const fail = () => {
      image2.onload = image2.onerror = null;
      URL.revokeObjectURL(url);
      reject(new Error("Unable to read this photo. Try a JPEG or PNG."));
    };
    image2.onload = () => {
      image2.onload = image2.onerror = null;
      if (!image2.naturalWidth || !image2.naturalHeight) {
        fail();
        return;
      }
      resolve({ source: image2, width: image2.naturalWidth, height: image2.naturalHeight, close: () => URL.revokeObjectURL(url) });
    };
    image2.onerror = fail;
    image2.src = url;
  });
}
async function readPhoto(file) {
  const error = validatePhotoFile(file);
  if (error) throw new Error(error);
  const image2 = await loadImage4(file);
  const scale = Math.min(1, IMPORT_MAX_SIDE / Math.max(image2.width, image2.height));
  if (scale === 1 && file.size <= PASSTHROUGH_BYTES && /^image\/(jpeg|png)$/.test(file.type)) {
    const src = URL.createObjectURL(file);
    image2.close();
    return { src, width: image2.width, height: image2.height, name: file.name };
  }
  const width = Math.max(1, Math.round(image2.width * scale));
  const height = Math.max(1, Math.round(image2.height * scale));
  const canvas2 = document.createElement("canvas");
  canvas2.width = width;
  canvas2.height = height;
  try {
    const ctx = canvas2.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");
    ctx.drawImage(image2.source, 0, 0, width, height);
    const blob = await new Promise((resolve) => canvas2.toBlob(resolve, "image/jpeg", 0.92));
    if (!blob) throw new Error("Unable to read this photo. Try a JPEG or PNG.");
    return { src: URL.createObjectURL(blob), width, height, name: file.name };
  } finally {
    image2.close();
    canvas2.width = 0;
    canvas2.height = 0;
  }
}

// rendering-source/src/lib/notebook/page-count.ts
var PAGE_WIDTH = 877;
var SPREAD_OFFSET = 914;
function innerPages(state) {
  const max = state.album.length * 2;
  if (state.innerPageCount != null && state.innerPageCount % 2 === 1 && (state.album.at(-1) ?? []).some((item) => touchesFinalPage(item, true))) return max;
  return Number.isInteger(state.innerPageCount) && state.innerPageCount >= 2 && state.innerPageCount <= max && Math.ceil(state.innerPageCount / 2) === state.album.length ? state.innerPageCount : max;
}
function touchesFinalPage(item, lastRight) {
  const angle = item.rotation * Math.PI / 180, c2 = Math.cos(angle), s2 = Math.sin(angle);
  const points = item.kind === "stroke" ? item.pts.map(([x2, y]) => ({ x: x2, y })) : [{ x: 0, y: 0 }, { x: item.w, y: 0 }, { x: 0, y: item.h }, { x: item.w, y: item.h }].map((p2) => ({ x: item.x + p2.x * c2 - p2.y * s2, y: item.y + p2.x * s2 + p2.y * c2 }));
  const margin = item.kind === "stroke" ? item.size : 0;
  const min = Math.min(...points.map((p2) => p2.x)) - margin, max = Math.max(...points.map((p2) => p2.x)) + margin;
  return lastRight ? max >= SPREAD_OFFSET : min <= PAGE_WIDTH;
}

// rendering-source/src/lib/notebook/model.ts
var COVERS = { graphite: { name: "Noir graphite", color: "#292a28" }, cognac: { name: "Brun cognac", color: "#986249" }, burgundy: { name: "Bordeaux profond", color: "#62383e" }, midnight: { name: "Bleu nuit", color: "#30414d" }, forest: { name: "Vert for\xEAt", color: "#43564a" }, terracotta: { name: "Terracotta", color: "#a85b40", ink: "#f4eedd" }, linen: { name: "Beige clair", color: "#dfd9ce", ink: "#4c463c" }, cream: { name: "Blanc cass\xE9", color: "#edeae2", ink: "#5c5648" }, rose: { name: "Rose poudr\xE9", color: "#c9a9b0", ink: "#4f3b42" } };
var coverInkFor = (id2) => COVERS[id2].ink;
var PAPERS = { black: { name: "Noir", color: "#212220", ink: "#f5f1e8", edge: "#3d3e39" }, white: { name: "Blanc", color: "#fafaf7", ink: "#302e29", edge: "#ddddd4" }, beige: { name: "Beige", color: "#ebe2d0", ink: "#302e29", edge: "#cabfaa" } };
var PAGE_W = 877;
var PAGE_H = 1115;
function documentSignature(d2, index) {
  return JSON.stringify([d2.config, d2.pages[index], index, d2.pages.length]);
}

// isolated:pure-album
var PAGE_HEIGHT = 1115;
var PAGE_WIDTH2 = 877;
var SPREAD_OFFSET2 = 914;
var SPREAD_WIDTH = 1791;

// rendering-source/src/lib/notebook/creation.ts
var initialDetails = { title: "", recipient: "", date: "", dedication: "", cover: "graphite", paper: "black", grain: 0.35 };
function notebookTitle(d2, fr) {
  return d2.title?.trim() || (d2.recipient.trim() ? `${fr ? "Pour" : "For"} ${d2.recipient.trim()}` : fr ? "Mon carnet" : "My notebook");
}
function displayNotebookDate(value, fr) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "";
  const date = /* @__PURE__ */ new Date(value + "T12:00:00");
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString(fr ? "fr-FR" : "en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).replaceAll("/", " \xB7 ");
}
function notebookConfig(d2, fr) {
  return { cover: d2.cover, paper: d2.paper, grain: d2.grain, ...coverInkFor(d2.cover) ? { coverInk: coverInkFor(d2.cover) } : {}, title: notebookTitle(d2, fr), recipient: d2.title?.trim() && d2.recipient.trim() ? `${fr ? "Pour" : "For"} ${d2.recipient.trim()}` : void 0, dedication: d2.dedication, subtitle: displayNotebookDate(d2.date, fr), thickness: 0.1, ...d2.font ? { font: d2.font } : {}, ...d2.titleSize ? { titleSize: d2.titleSize } : {} };
}
var INSPIRED_COVER = {
  "t-graphite": "burgundy",
  "t-cognac": "cognac",
  "t-black": "graphite",
  "t-grey": "rose",
  "t-pink": "linen",
  "t-cream": "midnight",
  "t-linen": "terracotta",
  "t-white": "cream"
};
var INSPIRED_THEME_COLORS = {
  "t-graphite": { cover: "#4a1c24", ink: "#f4eedd" },
  "t-cognac": { cover: "#8b5a2b", ink: "#f4eedd" },
  "t-black": { cover: "#1a1a1a", ink: "#f4eedd" },
  "t-cream": { cover: "#1e2a3a", ink: "#f4eedd" },
  "t-linen": { cover: "#a85b40", ink: "#f4eedd" },
  "t-pink": { cover: "#dfd9ce", ink: "#4c463c" },
  "t-grey": { cover: "#c9a9b0", ink: "#4f3b42" },
  "t-white": { cover: "#edeae2", ink: "#5c5648" }
};
var INSPIRED_PAPER = {
  "The Anniversary": "black",
  "Away Together": "beige",
  "The Big Night": "black",
  "The New Chapter": "beige",
  "The Reunion": "white",
  "The Firsts": "black",
  "The Everyday": "white",
  "Just Because": "beige"
};

// rendering-source/src/lib/notebook/cover-band.ts
var COVER_TITLE_BAND = 0.28;

// rendering-source/src/lib/notebook/material.ts
var textures = /* @__PURE__ */ new Map();
function notebookMaterial(color, grain, leather = false) {
  const key = `${color}:${grain}:${leather}`, hit = textures.get(key);
  if (hit) return hit;
  const c2 = document.createElement("canvas");
  c2.width = c2.height = 512;
  const x2 = c2.getContext("2d");
  x2.fillStyle = color;
  x2.fillRect(0, 0, 512, 512);
  let seed = leather ? 1987 : 749;
  const random = () => {
    seed = Math.imul(seed, 1664525) + 1013904223 | 0;
    return (seed >>> 0) / 4294967296;
  };
  const data = x2.getImageData(0, 0, 512, 512);
  for (let i2 = 0; i2 < data.data.length; i2 += 4) {
    const n2 = (random() - 0.5) * grain * (leather ? 15 : 7);
    for (let k = 0; k < 3; k++) data.data[i2 + k] += n2;
  }
  x2.putImageData(data, 0, 0);
  if (leather) {
    for (let row = -1; row < 75; row++) for (let col = -1; col < 75; col++) {
      const cx = col * 7 + row % 2 * 3.5 + (random() - 0.5) * 3, cy = row * 7 + (random() - 0.5) * 3, rx = 1.9 + random() * 1.8, ry = 1.4 + random() * 1.4, angle = (random() - 0.5) * 0.8;
      x2.fillStyle = `rgba(0,0,0,${0.025 + random() * 0.035})`;
      x2.beginPath();
      x2.ellipse(cx, cy, rx, ry, angle, 0, Math.PI * 2);
      x2.fill();
      x2.strokeStyle = "rgba(0,0,0,.13)";
      x2.lineWidth = 0.65;
      x2.stroke();
      x2.strokeStyle = "rgba(255,255,245,.075)";
      x2.lineWidth = 0.5;
      x2.beginPath();
      x2.ellipse(cx - 0.35, cy - 0.45, rx * 0.84, ry * 0.82, angle, Math.PI, Math.PI * 1.9);
      x2.stroke();
    }
    for (let i2 = 0; i2 < 3200; i2++) {
      x2.fillStyle = i2 % 2 ? "#ffffff08" : "#00000016";
      x2.fillRect(random() * 512, random() * 512, 0.5 + random(), 0.5 + random());
    }
  } else {
    for (let i2 = 0; i2 < 1800; i2++) {
      const px = random() * 512, py = random() * 512, a3 = (random() - 0.5) * Math.PI, len = 1.4 + random() * 5;
      x2.strokeStyle = `rgba(${i2 % 2 ? "255,255,245" : "0,0,0"},${grain * (i2 % 2 ? 0.065 : 0.035)})`;
      x2.lineWidth = 0.35 + random() * 0.4;
      x2.beginPath();
      x2.moveTo(px, py);
      x2.quadraticCurveTo(px + Math.cos(a3) * len * 0.5, py + Math.sin(a3) * len * 0.5 + 0.3, px + Math.cos(a3) * len, py + Math.sin(a3) * len);
      x2.stroke();
    }
  }
  if (textures.size >= 12) textures.delete(textures.keys().next().value);
  textures.set(key, c2);
  return c2;
}

// rendering-source/src/lib/notebook/render.ts
var originals = /* @__PURE__ */ new Map();
var cache = /* @__PURE__ */ new Map();
function coverColor(d2) {
  return d2.config.coverColor ?? COVERS[d2.config.cover].color;
}
function inkRgba(ink, alpha) {
  const m = /^#([0-9a-f]{6})$/i.exec(ink);
  if (!m) return `rgba(255,255,255,${alpha})`;
  const n2 = parseInt(m[1], 16);
  return `rgba(${n2 >> 16 & 255},${n2 >> 8 & 255},${n2 & 255},${alpha})`;
}
function renderSurface(d2, index, bareCover = false) {
  const key = documentSignature(d2, index) + (bareCover ? ":bare" : ""), hit = cache.get(key);
  if (hit) {
    cache.delete(key);
    cache.set(key, hit);
    return hit;
  }
  const canvas2 = document.createElement("canvas");
  canvas2.width = PAGE_W;
  canvas2.height = PAGE_H;
  const c2 = canvas2.getContext("2d"), cover = index === 0 || index === d2.pages.length + 1, p2 = PAPERS[d2.config.paper];
  c2.fillStyle = c2.createPattern(notebookMaterial(cover ? coverColor(d2) : p2.color, cover ? 0.65 : d2.config.grain, cover), "repeat");
  c2.fillRect(0, 0, PAGE_W, PAGE_H);
  if (cover) {
    const g2 = c2.createLinearGradient(0, 0, 65, 0);
    g2.addColorStop(0, "rgba(0,0,0,.23)");
    g2.addColorStop(1, "rgba(0,0,0,0)");
    c2.fillStyle = g2;
    c2.fillRect(0, 0, 65, PAGE_H);
    const sheen = c2.createLinearGradient(0, 0, PAGE_W, PAGE_H);
    sheen.addColorStop(0, "rgba(255,255,245,.045)");
    sheen.addColorStop(0.4, "rgba(255,255,245,.01)");
    sheen.addColorStop(1, "rgba(0,0,0,.06)");
    c2.fillStyle = sheen;
    c2.fillRect(0, 0, PAGE_W, PAGE_H);
    c2.strokeStyle = d2.config.coverInk ? inkRgba(d2.config.coverInk, 0.11) : "rgba(255,255,245,.11)";
    c2.lineWidth = 1;
    c2.beginPath();
    c2.moveTo(36, 0);
    c2.lineTo(36, PAGE_H);
    c2.stroke();
    if (bareCover) paintCoverStitch(c2, d2.config.coverInk);
    else if (index === 0) paintCoverTitle(c2, d2, PAGE_W, PAGE_H);
  } else {
    const binding = c2.createLinearGradient(index % 2 ? PAGE_W : 0, 0, index % 2 ? PAGE_W - 85 : 85, 0);
    binding.addColorStop(0, "rgba(0,0,0,.08)");
    binding.addColorStop(0.55, "rgba(0,0,0,.018)");
    binding.addColorStop(1, "rgba(0,0,0,0)");
    c2.fillStyle = binding;
    c2.fillRect(index % 2 ? PAGE_W - 85 : 0, 0, 85, PAGE_H);
    const page = d2.pages[index - 1];
    c2.fillStyle = p2.ink;
    c2.font = "italic 35px Georgia";
    c2.fillText(page.title, 94, 126, 680);
    for (const item of page.items) {
      const name = item.asset === "audio" && d2.config.paper === "black" ? "outline" : item.asset;
      const img = originals.get(name);
      if (img) c2.drawImage(img, item.x, item.y, item.width, item.height);
    }
    c2.fillStyle = p2.ink;
    c2.globalAlpha = 0.55;
    c2.font = "18px Arial";
    c2.fillText(`${index}`, PAGE_W - 70, PAGE_H - 45);
    c2.globalAlpha = 1;
  }
  if (cache.size >= 8) cache.delete(cache.keys().next().value);
  cache.set(key, canvas2);
  return canvas2;
}
function paintCoverStitch(c2, ink) {
  c2.save();
  c2.setLineDash([5, 4]);
  c2.lineWidth = 1;
  c2.strokeStyle = ink ? inkRgba(ink, 0.32) : "rgba(255,255,255,.32)";
  c2.beginPath();
  c2.roundRect(16, 9, PAGE_W - 26, PAGE_H - 19, 4);
  c2.stroke();
  c2.setLineDash([]);
  c2.strokeStyle = "rgba(0,0,0,.16)";
  c2.stroke();
  c2.restore();
}
function paintCoverTitle(c2, d2, width = PAGE_W, height = PAGE_H) {
  const scale = width / PAGE_W;
  const band = height * COVER_TITLE_BAND;
  const top = height - band;
  c2.save();
  c2.fillStyle = coverColor(d2);
  c2.fillRect(0, top, width, band);
  c2.fillStyle = d2.config.coverInk ?? "#f3eee3";
  const x2 = 48 * scale;
  const maxW = width - x2 * 2;
  let y = top + 52 * scale;
  c2.textBaseline = "alphabetic";
  const family = textFamily(d2.config.font, "Georgia"), k = (d2.config.titleSize ?? NOTEBOOK_TITLE_SIZE) / NOTEBOOK_TITLE_SIZE;
  c2.font = `${Math.round(42 * k * scale)}px ${family}`;
  c2.fillText(d2.config.title, x2, y, maxW);
  if (d2.config.recipient) {
    y += 38 * k * scale;
    c2.font = `${Math.round(26 * k * scale)}px ${family}`;
    c2.fillText(d2.config.recipient, x2, y, maxW);
  }
  if (d2.config.subtitle) {
    y += 34 * k * scale;
    c2.font = `${Math.round(24 * k * scale)}px ${family}`;
    c2.fillText(d2.config.subtitle, x2, y, maxW);
  }
  if (d2.config.dedication) {
    c2.font = `italic ${Math.round(22 * k * scale)}px ${family}`;
    let line = "";
    y += 34 * scale;
    for (const word of d2.config.dedication.split(/\s+/)) {
      if (!word) continue;
      if (c2.measureText(`${line}${word}`).width > maxW && line) {
        c2.fillText(line, x2, y, maxW);
        y += 28 * scale;
        line = "";
      }
      line += `${word} `;
      if (y > height - 16 * scale) break;
    }
    if (line && y <= height - 8 * scale) c2.fillText(line, x2, y, maxW);
  }
  c2.restore();
}

// node_modules/perfect-freehand/dist/esm/index.mjs
function $(e2, t2, u2, x2 = (h2) => h2) {
  return e2 * x2(0.5 - t2 * (0.5 - u2));
}
function se(e2) {
  return [-e2[0], -e2[1]];
}
function l(e2, t2) {
  return [e2[0] + t2[0], e2[1] + t2[1]];
}
function a(e2, t2) {
  return [e2[0] - t2[0], e2[1] - t2[1]];
}
function b(e2, t2) {
  return [e2[0] * t2, e2[1] * t2];
}
function he(e2, t2) {
  return [e2[0] / t2, e2[1] / t2];
}
function R(e2) {
  return [e2[1], -e2[0]];
}
function B(e2, t2) {
  return e2[0] * t2[0] + e2[1] * t2[1];
}
function ue(e2, t2) {
  return e2[0] === t2[0] && e2[1] === t2[1];
}
function ge(e2) {
  return Math.hypot(e2[0], e2[1]);
}
function de(e2) {
  return e2[0] * e2[0] + e2[1] * e2[1];
}
function A(e2, t2) {
  return de(a(e2, t2));
}
function G(e2) {
  return he(e2, ge(e2));
}
function ie(e2, t2) {
  return Math.hypot(e2[1] - t2[1], e2[0] - t2[0]);
}
function L(e2, t2, u2) {
  let x2 = Math.sin(u2), h2 = Math.cos(u2), y = e2[0] - t2[0], n2 = e2[1] - t2[1], f = y * h2 - n2 * x2, d2 = y * x2 + n2 * h2;
  return [f + t2[0], d2 + t2[1]];
}
function K(e2, t2, u2) {
  return l(e2, b(a(t2, e2), u2));
}
function ee(e2, t2, u2) {
  return l(e2, b(t2, u2));
}
var { min: C, PI: xe } = Math;
var pe = 0.275;
var V = xe + 1e-4;
function ce(e2, t2 = {}) {
  let { size: u2 = 16, smoothing: x2 = 0.5, thinning: h2 = 0.5, simulatePressure: y = true, easing: n2 = (r2) => r2, start: f = {}, end: d2 = {}, last: D = false } = t2, { cap: S2 = true, easing: j = (r2) => r2 * (2 - r2) } = f, { cap: q = true, easing: c2 = (r2) => --r2 * r2 * r2 + 1 } = d2;
  if (e2.length === 0 || u2 <= 0) return [];
  let p2 = e2[e2.length - 1].runningLength, g2 = f.taper === false ? 0 : f.taper === true ? Math.max(u2, p2) : f.taper, T = d2.taper === false ? 0 : d2.taper === true ? Math.max(u2, p2) : d2.taper, te = Math.pow(u2 * x2, 2), _ = [], M = [], H = e2.slice(0, 10).reduce((r2, i2) => {
    let o2 = i2.pressure;
    if (y) {
      let s2 = C(1, i2.distance / u2), W = C(1, 1 - s2);
      o2 = C(1, r2 + (W - r2) * (s2 * pe));
    }
    return (r2 + o2) / 2;
  }, e2[0].pressure), m = $(u2, h2, e2[e2.length - 1].pressure, n2), U, X = e2[0].vector, z = e2[0].point, F = z, O = z, E = F, J = false;
  for (let r2 = 0; r2 < e2.length; r2++) {
    let { pressure: i2 } = e2[r2], { point: o2, vector: s2, distance: W, runningLength: I } = e2[r2];
    if (r2 < e2.length - 1 && p2 - I < 3) continue;
    if (h2) {
      if (y) {
        let v = C(1, W / u2), Z = C(1, 1 - v);
        i2 = C(1, H + (Z - H) * (v * pe));
      }
      m = $(u2, h2, i2, n2);
    } else m = u2 / 2;
    U === void 0 && (U = m);
    let le = I < g2 ? j(I / g2) : 1, fe = p2 - I < T ? c2((p2 - I) / T) : 1;
    m = Math.max(0.01, m * Math.min(le, fe));
    let re = (r2 < e2.length - 1 ? e2[r2 + 1] : e2[r2]).vector, Y = r2 < e2.length - 1 ? B(s2, re) : 1, be = B(s2, X) < 0 && !J, ne = Y !== null && Y < 0;
    if (be || ne) {
      let v = b(R(X), m);
      for (let Z = 1 / 13, w2 = 0; w2 <= 1; w2 += Z) O = L(a(o2, v), o2, V * w2), _.push(O), E = L(l(o2, v), o2, V * -w2), M.push(E);
      z = O, F = E, ne && (J = true);
      continue;
    }
    if (J = false, r2 === e2.length - 1) {
      let v = b(R(s2), m);
      _.push(a(o2, v)), M.push(l(o2, v));
      continue;
    }
    let oe = b(R(K(re, s2, Y)), m);
    O = a(o2, oe), (r2 <= 1 || A(z, O) > te) && (_.push(O), z = O), E = l(o2, oe), (r2 <= 1 || A(F, E) > te) && (M.push(E), F = E), H = i2, X = s2;
  }
  let P = e2[0].point.slice(0, 2), k = e2.length > 1 ? e2[e2.length - 1].point.slice(0, 2) : l(e2[0].point, [1, 1]), Q = [], N = [];
  if (e2.length === 1) {
    if (!(g2 || T) || D) {
      let r2 = ee(P, G(R(a(P, k))), -(U || m)), i2 = [];
      for (let o2 = 1 / 13, s2 = o2; s2 <= 1; s2 += o2) i2.push(L(r2, P, V * 2 * s2));
      return i2;
    }
  } else {
    if (!(g2 || T && e2.length === 1)) if (S2) for (let i2 = 1 / 13, o2 = i2; o2 <= 1; o2 += i2) {
      let s2 = L(M[0], P, V * o2);
      Q.push(s2);
    }
    else {
      let i2 = a(_[0], M[0]), o2 = b(i2, 0.5), s2 = b(i2, 0.51);
      Q.push(a(P, o2), a(P, s2), l(P, s2), l(P, o2));
    }
    let r2 = R(se(e2[e2.length - 1].vector));
    if (T || g2 && e2.length === 1) N.push(k);
    else if (q) {
      let i2 = ee(k, r2, m);
      for (let o2 = 1 / 29, s2 = o2; s2 < 1; s2 += o2) N.push(L(i2, k, V * 3 * s2));
    } else N.push(l(k, b(r2, m)), l(k, b(r2, m * 0.99)), a(k, b(r2, m * 0.99)), a(k, b(r2, m)));
  }
  return _.concat(N, M.reverse(), Q);
}
function me(e2, t2 = {}) {
  var q;
  let { streamline: u2 = 0.5, size: x2 = 16, last: h2 = false } = t2;
  if (e2.length === 0) return [];
  let y = 0.15 + (1 - u2) * 0.85, n2 = Array.isArray(e2[0]) ? e2 : e2.map(({ x: c2, y: p2, pressure: g2 = 0.5 }) => [c2, p2, g2]);
  if (n2.length === 2) {
    let c2 = n2[1];
    n2 = n2.slice(0, -1);
    for (let p2 = 1; p2 < 5; p2++) n2.push(K(n2[0], c2, p2 / 4));
  }
  n2.length === 1 && (n2 = [...n2, [...l(n2[0], [1, 1]), ...n2[0].slice(2)]]);
  let f = [{ point: [n2[0][0], n2[0][1]], pressure: n2[0][2] >= 0 ? n2[0][2] : 0.25, vector: [1, 1], distance: 0, runningLength: 0 }], d2 = false, D = 0, S2 = f[0], j = n2.length - 1;
  for (let c2 = 1; c2 < n2.length; c2++) {
    let p2 = h2 && c2 === j ? n2[c2].slice(0, 2) : K(S2.point, n2[c2], y);
    if (ue(S2.point, p2)) continue;
    let g2 = ie(p2, S2.point);
    if (D += g2, c2 < j && !d2) {
      if (D < x2) continue;
      d2 = true;
    }
    S2 = { point: p2, pressure: n2[c2][2] >= 0 ? n2[c2][2] : 0.5, vector: G(a(S2.point, p2)), distance: g2, runningLength: D }, f.push(S2);
  }
  return f[0].vector = ((q = f[1]) == null ? void 0 : q.vector) || [0, 0], f;
}
function ae(e2, t2 = {}) {
  return ce(me(e2, t2), t2);
}

// rendering-source/src/lib/strokes.ts
function strokePath(stroke) {
  const outline = ae(stroke.pts, {
    size: stroke.size,
    thinning: 0.55,
    smoothing: 0.6,
    streamline: 0.5,
    simulatePressure: !stroke.pen
  });
  if (!outline.length) return "";
  const segments = outline.reduce((acc, [x2, y], i2, all) => {
    const [nx, ny] = all[(i2 + 1) % all.length];
    acc.push(`${x2.toFixed(1)},${y.toFixed(1)} ${((x2 + nx) / 2).toFixed(1)},${((y + ny) / 2).toFixed(1)}`);
    return acc;
  }, []);
  return `M${outline[0][0].toFixed(1)},${outline[0][1].toFixed(1)} Q${segments.join(" ")} Z`;
}

// rendering-source/src/lib/album-render.ts
var PAGE_COLOR = "#171717";
var SERIF = "Georgia, serif";
function loadImage5(src) {
  return new Promise((resolve, reject) => {
    const image2 = new Image();
    image2.onload = () => resolve(image2);
    image2.onerror = () => reject(new Error("image"));
    image2.src = src;
  });
}
var elementImages = /* @__PURE__ */ new Map();
function elementImageFor(item) {
  const element = item.element;
  if (!element || !["Audio", "Music"].includes(element.kind)) return Promise.resolve(item.src);
  const key = `${element.kind}:${element.format}:${item.src}`;
  const hit = elementImages.get(key);
  if (hit) return hit;
  const promise = loadImage5(item.src).then((image2) => {
    const canvas2 = document.createElement("canvas");
    canvas2.width = image2.naturalWidth;
    canvas2.height = image2.naturalHeight;
    const ctx = canvas2.getContext("2d"), sx = canvas2.width / element.width, sy = canvas2.height / element.height;
    ctx.drawImage(image2, 0, 0);
    ctx.scale(sx, sy);
    ctx.strokeStyle = "#e7e7e7";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    if (element.kind === "Music" && element.format === "Disc") ctx.arc(element.width / 2, element.height / 2, element.width / 2 - 6, 0, Math.PI * 2);
    else ctx.roundRect(5, 5, element.width - 10, element.height - 10, element.kind === "Audio" && element.format === "Pill" ? element.height / 2 : element.kind === "Music" ? 12 : 8);
    ctx.stroke();
    return canvas2.toDataURL("image/png");
  }).catch((error) => {
    elementImages.delete(key);
    throw error;
  });
  if (elementImages.size >= 40) elementImages.delete(elementImages.keys().next().value);
  elementImages.set(key, promise);
  return promise;
}
async function drawItems(layer, items, textFill) {
  for (const item of items) {
    const base = { x: item.x, y: item.y, rotation: item.rotation };
    if (item.kind === "stroke") {
      layer.add(new lib_default.Path({ data: strokePath(item), fill: item.color, opacity: item.opacity }));
    } else if (item.kind === "text") {
      layer.add(
        new lib_default.Text({ ...base, width: item.w, text: item.text, fontSize: item.fontSize, fill: textFill, ...notebookTextStyle(item.font) })
      );
    } else if (item.kind === "shape") {
      const group = new lib_default.Group(base);
      const shape = item.shape === "rectangle" ? new lib_default.Rect({ width: item.w, height: item.h, stroke: textFill, strokeWidth: 3 }) : item.shape === "circle" ? new lib_default.Ellipse({ x: item.w / 2, y: item.h / 2, radiusX: item.w / 2, radiusY: item.h / 2, stroke: textFill, strokeWidth: 3 }) : new lib_default.Line({ points: [item.w / 2, 0, item.w, item.h, 0, item.h], closed: true, stroke: textFill, strokeWidth: 3 });
      group.add(shape);
      if (item.text) {
        const b2 = fittedShapeText(item.shape, item.w, item.h, item.text, item.font, item.fontSize ?? 32);
        group.add(new lib_default.Text({ x: b2.x, y: b2.y, width: b2.w, height: b2.h, text: item.text, fontSize: b2.fontSize, ...notebookTextStyle(item.font ?? "sans"), fill: textFill, align: "center", verticalAlign: "middle", wrap: "word" }));
      }
      layer.add(group);
    } else if (item.kind === "frame") {
      const card = await drawFrame(layer, item.frame, item.x, item.y, item.w);
      card.rotation(item.rotation);
      const spec = FRAME_SPECS[item.frame.format];
      card.scaleY(item.h / (item.w * spec.card.h / spec.card.w));
    } else {
      const src = await elementImageFor(item);
      layer.add(new lib_default.Image({ ...base, image: await loadImage5(src), width: item.w, height: item.h }));
    }
  }
}
async function renderSpread(items, pixelRatio = 1, jpeg = false, paper2 = false, quality = 0.8, notebook) {
  const stage = new lib_default.Stage({ container: document.createElement("div"), width: SPREAD_WIDTH, height: PAGE_HEIGHT });
  const layer = new lib_default.Layer();
  stage.add(layer);
  try {
    layer.add(new lib_default.Rect({ width: SPREAD_WIDTH, height: PAGE_HEIGHT, fill: notebook ? { "#212220": "#3d3e39", "#fafaf7": "#ddddd4", "#ebe2d0": "#cabfaa" }[notebook.color] ?? notebook.color : "#000" }));
    layer.add(new lib_default.Rect({ width: PAGE_WIDTH2, height: PAGE_HEIGHT, fill: notebook?.color ?? (paper2 ? "#f4eee0" : PAGE_COLOR) }));
    layer.add(new lib_default.Rect({ x: SPREAD_OFFSET2, width: PAGE_WIDTH2, height: PAGE_HEIGHT, fill: notebook?.color ?? (paper2 ? "#f4eee0" : PAGE_COLOR) }));
    if (notebook) {
      const texture = notebookMaterial(notebook.color, notebook.grain);
      for (const x2 of [0, SPREAD_OFFSET2]) layer.add(new lib_default.Rect({ x: x2, width: PAGE_WIDTH2, height: PAGE_HEIGHT, fillPatternImage: texture, fillPatternRepeat: "repeat" }));
    }
    if (notebook) {
      const dark = notebook.color === "#212220";
      for (const [x2, left] of [[0, true], [SPREAD_OFFSET2, false]]) {
        const stops = left ? [0, "rgba(0,0,0,0)", 0.76, "rgba(0,0,0,0)", 0.88, `rgba(255,255,245,${dark ? 0.028 : 0.055})`, 0.955, "rgba(0,0,0,.035)", 1, `rgba(0,0,0,${dark ? 0.42 : 0.18})`] : [0, `rgba(0,0,0,${dark ? 0.42 : 0.18})`, 0.045, "rgba(0,0,0,.035)", 0.12, `rgba(255,255,245,${dark ? 0.028 : 0.055})`, 0.24, "rgba(0,0,0,0)", 1, "rgba(0,0,0,0)"];
        layer.add(new lib_default.Rect({ x: x2, width: PAGE_WIDTH2, height: PAGE_HEIGHT, fillLinearGradientStartPoint: { x: 0, y: 0 }, fillLinearGradientEndPoint: { x: PAGE_WIDTH2, y: 0 }, fillLinearGradientColorStops: stops }));
      }
    }
    await drawItems(layer, items, notebook ? notebook.color === "#212220" ? "#f5f1e8" : "#302e29" : paper2 ? "#302820" : "#fff");
    layer.draw();
    const url = stage.toDataURL(jpeg ? { mimeType: "image/jpeg", quality, pixelRatio } : { mimeType: "image/png", pixelRatio });
    return url;
  } finally {
    stage.destroy();
  }
}
function cropPage(spread, x2, width, height, jpeg, quality = 0.8) {
  return new Promise((resolve) => {
    const image2 = new Image();
    image2.onload = () => {
      const k = image2.width / SPREAD_WIDTH;
      const canvas2 = document.createElement("canvas");
      canvas2.width = Math.round(width * k);
      canvas2.height = Math.round(height * k);
      canvas2.getContext("2d").drawImage(image2, x2 * k, 0, width * k, height * k, 0, 0, canvas2.width, canvas2.height);
      resolve(jpeg ? canvas2.toDataURL("image/jpeg", quality) : canvas2.toDataURL("image/png"));
    };
    image2.src = spread;
  });
}
async function renderItemsPng(items) {
  const stage = new lib_default.Stage({ container: document.createElement("div"), width: PAGE_WIDTH2, height: PAGE_HEIGHT });
  const layer = new lib_default.Layer();
  stage.add(layer);
  try {
    await drawItems(layer, items, "#f3eee3");
    layer.draw();
    return stage.toDataURL({ mimeType: "image/png", pixelRatio: 1 });
  } finally {
    stage.destroy();
  }
}
async function coverPage(side, jpeg, items = [], title = "", details) {
  if (details) {
    await ensureTextFont(details.font);
    const doc = { schema: 1, revision: 1, config: { ...notebookConfig(details, document.documentElement.lang === "fr"), ...title ? { title } : {} }, pages: [{ id: "inside", title: "", items: [] }] };
    const canvas3 = renderSurface(doc, side === "front" ? 0 : 2);
    const output = document.createElement("canvas");
    output.width = canvas3.width;
    output.height = canvas3.height;
    const ctx2 = output.getContext("2d");
    ctx2.drawImage(canvas3, 0, 0);
    if (side === "front" && items.length) {
      const artwork = await loadImage5(await renderItemsPng(items));
      ctx2.drawImage(artwork, 0, 0, output.width, output.height);
      paintCoverTitle(ctx2, doc, output.width, output.height);
    }
    return output.toDataURL(jpeg ? "image/jpeg" : "image/png", 0.9);
  }
  if (side === "front" && items.length) {
    const stage = new lib_default.Stage({ container: document.createElement("div"), width: PAGE_WIDTH2, height: PAGE_HEIGHT });
    const layer = new lib_default.Layer();
    stage.add(layer);
    try {
      layer.add(new lib_default.Rect({ width: PAGE_WIDTH2, height: PAGE_HEIGHT, fill: PAGE_COLOR }));
      await drawItems(layer, items, "#fff");
      const band = PAGE_HEIGHT * COVER_TITLE_BAND;
      layer.add(new lib_default.Rect({ x: 0, y: PAGE_HEIGHT - band, width: PAGE_WIDTH2, height: band, fill: "#292a28", listening: false }));
      if (title) layer.add(new lib_default.Text({ x: 48, y: PAGE_HEIGHT - band + 28, width: PAGE_WIDTH2 - 96, text: title, fontSize: 36, fill: "#f3eee3", fontFamily: SERIF, listening: false }));
      layer.draw();
      return stage.toDataURL(jpeg ? { mimeType: "image/jpeg", quality: 0.9, pixelRatio: 1 } : { mimeType: "image/png", pixelRatio: 1 });
    } finally {
      stage.destroy();
    }
  }
  const canvas2 = document.createElement("canvas");
  canvas2.width = PAGE_WIDTH2;
  canvas2.height = PAGE_HEIGHT;
  const ctx = canvas2.getContext("2d");
  ctx.fillStyle = PAGE_COLOR;
  ctx.fillRect(0, 0, PAGE_WIDTH2, PAGE_HEIGHT);
  if (side === "front") {
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = '700 70px Georgia, "Times New Roman", serif';
    ctx.fillText(title || translate("My notebook"), PAGE_WIDTH2 / 2, PAGE_HEIGHT / 2 - 10);
    ctx.fillStyle = "#747c8c";
    ctx.font = "30px Georgia, serif";
    ctx.fillText(translate("Your generated frames are saved here."), PAGE_WIDTH2 / 2, PAGE_HEIGHT / 2 + 50);
  }
  return jpeg ? canvas2.toDataURL("image/jpeg", 0.85) : canvas2.toDataURL("image/png");
}
async function buildAlbumPages(album, compact = false, paper2 = false, hi = false, notebook, coverItems = [], coverTitle = "", details, innerPageCount) {
  const count = innerPages({ album, innerPageCount, page: 0 });
  const pages = [await coverPage("front", compact, coverItems, coverTitle, details)];
  for (const spread of album) {
    const q = hi ? 0.92 : 0.8;
    const image2 = await renderSpread(spread, hi ? 1.5 : compact ? 0.75 : 1, compact || hi, paper2, q, notebook);
    pages.push(await cropPage(image2, 0, PAGE_WIDTH2, PAGE_HEIGHT, compact, q));
    if (pages.length <= count) pages.push(await cropPage(image2, SPREAD_OFFSET2, PAGE_WIDTH2, PAGE_HEIGHT, compact, q));
  }
  pages.push(await coverPage("back", compact, [], "", details));
  return pages;
}

// rendering-source/src/lib/notebook/vendor/page-flip.js
var t = {};
var e = class {
  constructor(t2, e2) {
    this.state = { angle: 0, area: [], position: { x: 0, y: 0 }, hardAngle: 0, hardDrawingAngle: 0 }, this.createdDensity = e2, this.nowDrawingDensity = this.createdDensity, this.render = t2;
  }
  setDensity(t2) {
    this.createdDensity = t2, this.nowDrawingDensity = t2;
  }
  setDrawingDensity(t2) {
    this.nowDrawingDensity = t2;
  }
  setPosition(t2) {
    this.state.position = t2;
  }
  setAngle(t2) {
    this.state.angle = t2;
  }
  setArea(t2) {
    this.state.area = t2;
  }
  setHardDrawingAngle(t2) {
    this.state.hardDrawingAngle = t2;
  }
  setHardAngle(t2) {
    this.state.hardAngle = t2, this.state.hardDrawingAngle = t2;
  }
  setOrientation(t2) {
    this.orientation = t2;
  }
  getDrawingDensity() {
    return this.nowDrawingDensity;
  }
  getDensity() {
    return this.createdDensity;
  }
  getHardAngle() {
    return this.state.hardAngle;
  }
};
var i = class extends e {
  constructor(t2, e2, i2) {
    super(t2, i2), this.image = null, this.isLoad = false, this.loadingAngle = 0, this.image = new Image(), this.image.src = e2;
  }
  draw(t2) {
    const e2 = this.render.getContext(), i2 = this.render.convertToGlobal(this.state.position), s2 = this.render.getRect().pageWidth, n2 = this.render.getRect().height;
    e2.save(), e2.translate(i2.x, i2.y), e2.beginPath();
    for (let t3 of this.state.area) null !== t3 && (t3 = this.render.convertToGlobal(t3), e2.lineTo(t3.x - i2.x, t3.y - i2.y));
    e2.rotate(this.state.angle), e2.clip(), this.isLoad ? e2.drawImage(this.image, 0, 0, s2, n2) : this.drawLoader(e2, { x: 0, y: 0 }, s2, n2), e2.restore();
  }
  simpleDraw(t2) {
    const e2 = this.render.getRect(), i2 = this.render.getContext(), s2 = e2.pageWidth, n2 = e2.height, h2 = 1 === t2 ? e2.left + e2.pageWidth : e2.left, r2 = e2.top;
    this.isLoad ? i2.drawImage(this.image, h2, r2, s2, n2) : this.drawLoader(i2, { x: h2, y: r2 }, s2, n2);
  }
  drawLoader(t2, e2, i2, s2) {
    t2.beginPath(), t2.strokeStyle = "rgb(200, 200, 200)", t2.fillStyle = "rgb(255, 255, 255)", t2.lineWidth = 1, t2.rect(e2.x + 1, e2.y + 1, i2 - 1, s2 - 1), t2.stroke(), t2.fill();
    const n2 = { x: e2.x + i2 / 2, y: e2.y + s2 / 2 };
    t2.beginPath(), t2.lineWidth = 10, t2.arc(n2.x, n2.y, 20, this.loadingAngle, 3 * Math.PI / 2 + this.loadingAngle), t2.stroke(), t2.closePath(), this.loadingAngle += 0.07, this.loadingAngle >= 2 * Math.PI && (this.loadingAngle = 0);
  }
  load() {
    this.isLoad || (this.image.onload = () => {
      this.isLoad = true;
    });
  }
  newTemporaryCopy() {
    return this;
  }
  getTemporaryCopy() {
    return this;
  }
  hideTemporaryCopy() {
  }
};
var s = class {
  constructor(t2, e2) {
    this.pages = [], this.currentPageIndex = 0, this.currentSpreadIndex = 0, this.landscapeSpread = [], this.portraitSpread = [], this.render = e2, this.app = t2, this.currentPageIndex = 0, this.isShowCover = this.app.getSettings().showCover;
  }
  destroy() {
    this.pages = [];
  }
  createSpread() {
    this.landscapeSpread = [], this.portraitSpread = [];
    for (let t3 = 0; t3 < this.pages.length; t3++) this.portraitSpread.push([t3]);
    let t2 = 0;
    this.isShowCover && (this.pages[0].setDensity("hard"), this.landscapeSpread.push([t2]), t2++);
    for (let e2 = t2; e2 < this.pages.length; e2 += 2) e2 < this.pages.length - 1 ? this.landscapeSpread.push([e2, e2 + 1]) : (this.landscapeSpread.push([e2]), this.pages[e2].setDensity("hard"));
  }
  getSpread() {
    return "landscape" === this.render.getOrientation() ? this.landscapeSpread : this.portraitSpread;
  }
  getSpreadIndexByPage(t2) {
    const e2 = this.getSpread();
    for (let i2 = 0; i2 < e2.length; i2++) if (t2 === e2[i2][0] || t2 === e2[i2][1]) return i2;
    return null;
  }
  getPageCount() {
    return this.pages.length;
  }
  getPages() {
    return this.pages;
  }
  getPage(t2) {
    if (t2 >= 0 && t2 < this.pages.length) return this.pages[t2];
    throw new Error("Invalid page number");
  }
  nextBy(t2) {
    const e2 = this.pages.indexOf(t2);
    return e2 < this.pages.length - 1 ? this.pages[e2 + 1] : null;
  }
  prevBy(t2) {
    const e2 = this.pages.indexOf(t2);
    return e2 > 0 ? this.pages[e2 - 1] : null;
  }
  getFlippingPage(t2) {
    const e2 = this.currentSpreadIndex;
    if ("portrait" === this.render.getOrientation()) return 0 === t2 ? this.pages[e2].newTemporaryCopy() : this.pages[e2 - 1];
    {
      const i2 = 0 === t2 ? this.getSpread()[e2 + 1] : this.getSpread()[e2 - 1];
      return 1 === i2.length || 0 === t2 ? this.pages[i2[0]] : this.pages[i2[1]];
    }
  }
  getBottomPage(t2) {
    const e2 = this.currentSpreadIndex;
    if ("portrait" === this.render.getOrientation()) return 0 === t2 ? this.pages[e2 + 1] : this.pages[e2 - 1];
    {
      const i2 = 0 === t2 ? this.getSpread()[e2 + 1] : this.getSpread()[e2 - 1];
      return 1 === i2.length ? this.pages[i2[0]] : 0 === t2 ? this.pages[i2[1]] : this.pages[i2[0]];
    }
  }
  showNext() {
    this.currentSpreadIndex < this.getSpread().length && (this.currentSpreadIndex++, this.showSpread());
  }
  showPrev() {
    this.currentSpreadIndex > 0 && (this.currentSpreadIndex--, this.showSpread());
  }
  getCurrentPageIndex() {
    return this.currentPageIndex;
  }
  show(t2 = null) {
    if (null === t2 && (t2 = this.currentPageIndex), t2 < 0 || t2 >= this.pages.length) return;
    const e2 = this.getSpreadIndexByPage(t2);
    null !== e2 && (this.currentSpreadIndex = e2, this.showSpread());
  }
  getCurrentSpreadIndex() {
    return this.currentSpreadIndex;
  }
  setCurrentSpreadIndex(t2) {
    if (!(t2 >= 0 && t2 < this.getSpread().length)) throw new Error("Invalid page");
    this.currentSpreadIndex = t2;
  }
  showSpread() {
    const t2 = this.getSpread()[this.currentSpreadIndex];
    2 === t2.length ? (this.render.setLeftPage(this.pages[t2[0]]), this.render.setRightPage(this.pages[t2[1]])) : "landscape" === this.render.getOrientation() && t2[0] === this.pages.length - 1 ? (this.render.setLeftPage(this.pages[t2[0]]), this.render.setRightPage(null)) : (this.render.setLeftPage(null), this.render.setRightPage(this.pages[t2[0]])), this.currentPageIndex = t2[0], this.app.updatePageIndex(this.currentPageIndex);
  }
};
var n = class extends s {
  constructor(t2, e2, i2) {
    super(t2, e2), this.imagesHref = i2;
  }
  load() {
    for (const t2 of this.imagesHref) {
      const e2 = new i(this.render, t2, "soft");
      e2.load(), this.pages.push(e2);
    }
    this.createSpread();
  }
};
var h = class _h {
  static GetDistanceBetweenTwoPoint(t2, e2) {
    return null === t2 || null === e2 ? 1 / 0 : Math.sqrt(Math.pow(e2.x - t2.x, 2) + Math.pow(e2.y - t2.y, 2));
  }
  static GetSegmentLength(t2) {
    return _h.GetDistanceBetweenTwoPoint(t2[0], t2[1]);
  }
  static GetAngleBetweenTwoLine(t2, e2) {
    const i2 = t2[0].y - t2[1].y, s2 = e2[0].y - e2[1].y, n2 = t2[1].x - t2[0].x, h2 = e2[1].x - e2[0].x;
    return Math.acos((i2 * s2 + n2 * h2) / (Math.sqrt(i2 * i2 + n2 * n2) * Math.sqrt(s2 * s2 + h2 * h2)));
  }
  static PointInRect(t2, e2) {
    return null === e2 ? null : e2.x >= t2.left && e2.x <= t2.width + t2.left && e2.y >= t2.top && e2.y <= t2.top + t2.height ? e2 : null;
  }
  static GetRotatedPoint(t2, e2, i2) {
    return { x: t2.x * Math.cos(i2) + t2.y * Math.sin(i2) + e2.x, y: t2.y * Math.cos(i2) - t2.x * Math.sin(i2) + e2.y };
  }
  static LimitPointToCircle(t2, e2, i2) {
    if (_h.GetDistanceBetweenTwoPoint(t2, i2) <= e2) return i2;
    const s2 = t2.x, n2 = t2.y, r2 = i2.x, o2 = i2.y;
    let a3 = Math.sqrt(Math.pow(e2, 2) * Math.pow(s2 - r2, 2) / (Math.pow(s2 - r2, 2) + Math.pow(n2 - o2, 2))) + s2;
    i2.x < 0 && (a3 *= -1);
    let g2 = (a3 - s2) * (n2 - o2) / (s2 - r2) + n2;
    return s2 - r2 + n2 === 0 && (g2 = e2), { x: a3, y: g2 };
  }
  static GetIntersectBetweenTwoSegment(t2, e2, i2) {
    return _h.PointInRect(t2, _h.GetIntersectBeetwenTwoLine(e2, i2));
  }
  static GetIntersectBeetwenTwoLine(t2, e2) {
    const i2 = t2[0].y - t2[1].y, s2 = e2[0].y - e2[1].y, n2 = t2[1].x - t2[0].x, h2 = e2[1].x - e2[0].x, r2 = t2[0].x * t2[1].y - t2[1].x * t2[0].y, o2 = e2[0].x * e2[1].y - e2[1].x * e2[0].y, a3 = i2 * o2 - s2 * r2, g2 = n2 * o2 - h2 * r2, l3 = -(r2 * h2 - o2 * n2) / (i2 * h2 - s2 * n2), d2 = -(i2 * o2 - s2 * r2) / (i2 * h2 - s2 * n2);
    if (isFinite(l3) && isFinite(d2)) return { x: l3, y: d2 };
    if (Math.abs(a3 - g2) < 0.1) throw new Error("Segment included");
    return null;
  }
  static GetCordsFromTwoPoint(t2, e2) {
    const i2 = Math.abs(t2.x - e2.x), s2 = Math.abs(t2.y - e2.y), n2 = Math.max(i2, s2), h2 = [t2];
    function r2(t3, e3, i3, s3, n3) {
      return e3 > t3 ? t3 + n3 * (i3 / s3) : e3 < t3 ? t3 - n3 * (i3 / s3) : t3;
    }
    for (let o2 = 1; o2 <= n2; o2 += 1) h2.push({ x: r2(t2.x, e2.x, i2, n2, o2), y: r2(t2.y, e2.y, s2, n2, o2) });
    return h2;
  }
};
var r = class _r extends e {
  constructor(t2, e2, i2) {
    super(t2, i2), this.copiedElement = null, this.temporaryCopy = null, this.isLoad = false, this.element = e2, this.element.classList.add("stf__item"), this.element.classList.add("--" + i2);
  }
  newTemporaryCopy() {
    return "hard" === this.nowDrawingDensity ? this : (null === this.temporaryCopy && (this.copiedElement = this.element.cloneNode(true), this.element.querySelectorAll("canvas").forEach((source, index) => {
      const target = this.copiedElement.querySelectorAll("canvas")[index];
      if (target) {
        target.width = source.width;
        target.height = source.height;
        target.getContext("2d").drawImage(source, 0, 0);
      }
    }), this.element.parentElement.appendChild(this.copiedElement), this.temporaryCopy = new _r(this.render, this.copiedElement, this.nowDrawingDensity)), this.getTemporaryCopy());
  }
  getTemporaryCopy() {
    return this.temporaryCopy;
  }
  hideTemporaryCopy() {
    null !== this.temporaryCopy && (this.copiedElement.remove(), this.copiedElement = null, this.temporaryCopy = null);
  }
  draw(t2) {
    const e2 = t2 || this.nowDrawingDensity, i2 = this.render.convertToGlobal(this.state.position), s2 = this.render.getRect().pageWidth, n2 = this.render.getRect().height;
    this.element.classList.remove("--simple");
    const h2 = `
            display: block;
            z-index: ${this.element.style.zIndex};
            left: 0;
            top: 0;
            width: ${s2}px;
            height: ${n2}px;
        `;
    "hard" === e2 ? this.drawHard(h2) : this.drawSoft(i2, h2);
  }
  drawHard(t2 = "") {
    const e2 = this.render.getRect().left + this.render.getRect().width / 2, i2 = this.state.hardDrawingAngle, s2 = t2 + "\n                backface-visibility: hidden;\n                -webkit-backface-visibility: hidden;\n                clip-path: none;\n                -webkit-clip-path: none;\n            " + (0 === this.orientation ? `transform-origin: ${this.render.getRect().pageWidth}px 0; 
                   transform: translate3d(0, 0, 0) rotateY(${i2}deg);` : `transform-origin: 0 0; 
                   transform: translate3d(${e2}px, 0, 0) rotateY(${i2}deg);`);
    this.element.style.cssText = s2;
  }
  drawSoft(t2, e2 = "") {
    let i2 = "polygon( ";
    for (const t3 of this.state.area) if (null !== t3) {
      let e3 = 1 === this.render.getDirection() ? { x: -t3.x + this.state.position.x, y: t3.y - this.state.position.y } : { x: t3.x - this.state.position.x, y: t3.y - this.state.position.y };
      e3 = h.GetRotatedPoint(e3, { x: 0, y: 0 }, this.state.angle), i2 += e3.x + "px " + e3.y + "px, ";
    }
    i2 = i2.slice(0, -2), i2 += ")";
    const s2 = e2 + `transform-origin: 0 0; clip-path: ${i2}; -webkit-clip-path: ${i2};` + (this.render.isSafari() && 0 === this.state.angle ? `transform: translate(${t2.x}px, ${t2.y}px);` : `transform: translate3d(${t2.x}px, ${t2.y}px, 0) rotate(${this.state.angle}rad);`);
    this.element.style.cssText = s2;
  }
  simpleDraw(t2) {
    const e2 = this.render.getRect(), i2 = e2.pageWidth, s2 = e2.height, n2 = 1 === t2 ? e2.left + e2.pageWidth : e2.left, h2 = e2.top;
    this.element.classList.add("--simple"), this.element.style.cssText = `
            position: absolute; 
            display: block; 
            height: ${s2}px; 
            left: ${n2}px; 
            top: ${h2}px; 
            width: ${i2}px; 
            z-index: ${this.render.getSettings().startZIndex + 1};`;
  }
  getElement() {
    return this.element;
  }
  load() {
    this.isLoad = true;
  }
  setOrientation(t2) {
    super.setOrientation(t2), this.element.classList.remove("--left", "--right"), this.element.classList.add(1 === t2 ? "--right" : "--left");
  }
  setDrawingDensity(t2) {
    this.element.classList.remove("--soft", "--hard"), this.element.classList.add("--" + t2), super.setDrawingDensity(t2);
  }
};
var o = class extends s {
  constructor(t2, e2, i2, s2) {
    super(t2, e2), this.element = i2, this.pagesElement = s2;
  }
  load() {
    for (const t2 of this.pagesElement) {
      const e2 = new r(this.render, t2, "hard" === t2.dataset.density ? "hard" : "soft");
      e2.load(), this.pages.push(e2);
    }
    this.createSpread();
  }
};
var a2 = class {
  constructor(t2, e2, i2, s2) {
    this.direction = t2, this.corner = e2, this.topIntersectPoint = null, this.sideIntersectPoint = null, this.bottomIntersectPoint = null, this.pageWidth = parseInt(i2, 10), this.pageHeight = parseInt(s2, 10);
  }
  calc(t2) {
    try {
      return this.position = this.calcAngleAndPosition(t2), this.calculateIntersectPoint(this.position), true;
    } catch (t3) {
      return false;
    }
  }
  getFlippingClipArea() {
    const t2 = [];
    let e2 = false;
    return t2.push(this.rect.topLeft), t2.push(this.topIntersectPoint), null === this.sideIntersectPoint ? e2 = true : (t2.push(this.sideIntersectPoint), null === this.bottomIntersectPoint && (e2 = false)), t2.push(this.bottomIntersectPoint), (e2 || "bottom" === this.corner) && t2.push(this.rect.bottomLeft), t2;
  }
  getBottomClipArea() {
    const t2 = [];
    return t2.push(this.topIntersectPoint), "top" === this.corner ? t2.push({ x: this.pageWidth, y: 0 }) : (null !== this.topIntersectPoint && t2.push({ x: this.pageWidth, y: 0 }), t2.push({ x: this.pageWidth, y: this.pageHeight })), null !== this.sideIntersectPoint ? h.GetDistanceBetweenTwoPoint(this.sideIntersectPoint, this.topIntersectPoint) >= 10 && t2.push(this.sideIntersectPoint) : "top" === this.corner && t2.push({ x: this.pageWidth, y: this.pageHeight }), t2.push(this.bottomIntersectPoint), t2.push(this.topIntersectPoint), t2;
  }
  getAngle() {
    return 0 === this.direction ? -this.angle : this.angle;
  }
  getRect() {
    return this.rect;
  }
  getPosition() {
    return this.position;
  }
  getActiveCorner() {
    return 0 === this.direction ? this.rect.topLeft : this.rect.topRight;
  }
  getDirection() {
    return this.direction;
  }
  getFlippingProgress() {
    return Math.abs((this.position.x - this.pageWidth) / (2 * this.pageWidth) * 100);
  }
  getCorner() {
    return this.corner;
  }
  getBottomPagePosition() {
    return 1 === this.direction ? { x: this.pageWidth, y: 0 } : { x: 0, y: 0 };
  }
  getShadowStartPoint() {
    return "top" === this.corner ? this.topIntersectPoint : null !== this.sideIntersectPoint ? this.sideIntersectPoint : this.topIntersectPoint;
  }
  getShadowAngle() {
    const t2 = h.GetAngleBetweenTwoLine(this.getSegmentToShadowLine(), [{ x: 0, y: 0 }, { x: this.pageWidth, y: 0 }]);
    return 0 === this.direction ? t2 : Math.PI - t2;
  }
  calcAngleAndPosition(t2) {
    let e2 = t2;
    if (this.updateAngleAndGeometry(e2), e2 = "top" === this.corner ? this.checkPositionAtCenterLine(e2, { x: 0, y: 0 }, { x: 0, y: this.pageHeight }) : this.checkPositionAtCenterLine(e2, { x: 0, y: this.pageHeight }, { x: 0, y: 0 }), Math.abs(e2.x - this.pageWidth) < 1 && Math.abs(e2.y) < 1) throw new Error("Point is too small");
    return e2;
  }
  updateAngleAndGeometry(t2) {
    this.angle = this.calculateAngle(t2), this.rect = this.getPageRect(t2);
  }
  calculateAngle(t2) {
    const e2 = this.pageWidth - t2.x + 1, i2 = "bottom" === this.corner ? this.pageHeight - t2.y : t2.y;
    let s2 = 2 * Math.acos(e2 / Math.sqrt(i2 * i2 + e2 * e2));
    i2 < 0 && (s2 = -s2);
    const n2 = Math.PI - s2;
    if (!isFinite(s2) || n2 >= 0 && n2 < 3e-3) throw new Error("The G point is too small");
    return "bottom" === this.corner && (s2 = -s2), s2;
  }
  getPageRect(t2) {
    return "top" === this.corner ? this.getRectFromBasePoint([{ x: 0, y: 0 }, { x: this.pageWidth, y: 0 }, { x: 0, y: this.pageHeight }, { x: this.pageWidth, y: this.pageHeight }], t2) : this.getRectFromBasePoint([{ x: 0, y: -this.pageHeight }, { x: this.pageWidth, y: -this.pageHeight }, { x: 0, y: 0 }, { x: this.pageWidth, y: 0 }], t2);
  }
  getRectFromBasePoint(t2, e2) {
    return { topLeft: this.getRotatedPoint(t2[0], e2), topRight: this.getRotatedPoint(t2[1], e2), bottomLeft: this.getRotatedPoint(t2[2], e2), bottomRight: this.getRotatedPoint(t2[3], e2) };
  }
  getRotatedPoint(t2, e2) {
    return { x: t2.x * Math.cos(this.angle) + t2.y * Math.sin(this.angle) + e2.x, y: t2.y * Math.cos(this.angle) - t2.x * Math.sin(this.angle) + e2.y };
  }
  calculateIntersectPoint(t2) {
    const e2 = { left: -1, top: -1, width: this.pageWidth + 2, height: this.pageHeight + 2 };
    "top" === this.corner ? (this.topIntersectPoint = h.GetIntersectBetweenTwoSegment(e2, [t2, this.rect.topRight], [{ x: 0, y: 0 }, { x: this.pageWidth, y: 0 }]), this.sideIntersectPoint = h.GetIntersectBetweenTwoSegment(e2, [t2, this.rect.bottomLeft], [{ x: this.pageWidth, y: 0 }, { x: this.pageWidth, y: this.pageHeight }]), this.bottomIntersectPoint = h.GetIntersectBetweenTwoSegment(e2, [this.rect.bottomLeft, this.rect.bottomRight], [{ x: 0, y: this.pageHeight }, { x: this.pageWidth, y: this.pageHeight }])) : (this.topIntersectPoint = h.GetIntersectBetweenTwoSegment(e2, [this.rect.topLeft, this.rect.topRight], [{ x: 0, y: 0 }, { x: this.pageWidth, y: 0 }]), this.sideIntersectPoint = h.GetIntersectBetweenTwoSegment(e2, [t2, this.rect.topLeft], [{ x: this.pageWidth, y: 0 }, { x: this.pageWidth, y: this.pageHeight }]), this.bottomIntersectPoint = h.GetIntersectBetweenTwoSegment(e2, [this.rect.bottomLeft, this.rect.bottomRight], [{ x: 0, y: this.pageHeight }, { x: this.pageWidth, y: this.pageHeight }]));
  }
  checkPositionAtCenterLine(t2, e2, i2) {
    let s2 = t2;
    const n2 = h.LimitPointToCircle(e2, this.pageWidth, s2);
    s2 !== n2 && (s2 = n2, this.updateAngleAndGeometry(s2));
    const r2 = Math.sqrt(Math.pow(this.pageWidth, 2) + Math.pow(this.pageHeight, 2));
    let o2 = this.rect.bottomRight, a3 = this.rect.topLeft;
    if ("bottom" === this.corner && (o2 = this.rect.topRight, a3 = this.rect.bottomLeft), o2.x <= 0) {
      const t3 = h.LimitPointToCircle(i2, r2, a3);
      t3 !== s2 && (s2 = t3, this.updateAngleAndGeometry(s2));
    }
    return s2;
  }
  getSegmentToShadowLine() {
    const t2 = this.getShadowStartPoint();
    return [t2, t2 !== this.sideIntersectPoint && null !== this.sideIntersectPoint ? this.sideIntersectPoint : this.bottomIntersectPoint];
  }
};
var g = class {
  constructor(t2, e2) {
    this.flippingPage = null, this.bottomPage = null, this.calc = null, this.state = "read", this.render = t2, this.app = e2;
  }
  fold(t2) {
    this.setState("user_fold"), null === this.calc && this.start(t2), this.do(this.render.convertToPage(t2));
  }
  flip(t2) {
    if (this.app.getSettings().disableFlipByClick && !this.isPointOnCorners(t2)) return;
    if (null !== this.calc && this.render.finishAnimation(), !this.start(t2)) return;
    const e2 = this.getBoundsRect();
    this.setState("flipping");
    const i2 = e2.height / 10, s2 = "bottom" === this.calc.getCorner() ? e2.height - i2 : i2, n2 = "bottom" === this.calc.getCorner() ? e2.height : 0;
    this.calc.calc({ x: e2.pageWidth - i2, y: s2 }), this.animateFlippingTo({ x: e2.pageWidth - i2, y: s2 }, { x: -e2.pageWidth, y: n2 }, true);
  }
  start(t2) {
    this.reset();
    const e2 = this.render.convertToBook(t2), i2 = this.getBoundsRect(), s2 = this.getDirectionByPoint(e2), n2 = e2.y >= i2.height / 2 ? "bottom" : "top";
    if (!this.checkDirection(s2)) return false;
    try {
      if (this.flippingPage = this.app.getPageCollection().getFlippingPage(s2), this.bottomPage = this.app.getPageCollection().getBottomPage(s2), "landscape" === this.render.getOrientation()) if (1 === s2) {
        const t3 = this.app.getPageCollection().nextBy(this.flippingPage);
        null !== t3 && this.flippingPage.getDensity() !== t3.getDensity() && (this.flippingPage.setDrawingDensity("hard"), t3.setDrawingDensity("hard"));
      } else {
        const t3 = this.app.getPageCollection().prevBy(this.flippingPage);
        null !== t3 && this.flippingPage.getDensity() !== t3.getDensity() && (this.flippingPage.setDrawingDensity("hard"), t3.setDrawingDensity("hard"));
      }
      return this.render.setDirection(s2), this.calc = new a2(s2, n2, i2.pageWidth.toString(10), i2.height.toString(10)), true;
    } catch (t3) {
      return false;
    }
  }
  do(t2) {
    if (null !== this.calc && this.calc.calc(t2)) {
      const t3 = this.calc.getFlippingProgress();
      this.bottomPage.setArea(this.calc.getBottomClipArea()), this.bottomPage.setPosition(this.calc.getBottomPagePosition()), this.bottomPage.setAngle(0), this.bottomPage.setHardAngle(0), this.flippingPage.setArea(this.calc.getFlippingClipArea()), this.flippingPage.setPosition(this.calc.getActiveCorner()), this.flippingPage.setAngle(this.calc.getAngle()), 0 === this.calc.getDirection() ? this.flippingPage.setHardAngle(90 * (200 - 2 * t3) / 100) : this.flippingPage.setHardAngle(-90 * (200 - 2 * t3) / 100), this.render.setPageRect(this.calc.getRect()), this.render.setBottomPage(this.bottomPage), this.render.setFlippingPage(this.flippingPage), this.render.setShadowData(this.calc.getShadowStartPoint(), this.calc.getShadowAngle(), t3, this.calc.getDirection());
    }
  }
  flipToPage(t2, e2) {
    const i2 = this.app.getPageCollection().getCurrentSpreadIndex(), s2 = this.app.getPageCollection().getSpreadIndexByPage(t2);
    try {
      s2 > i2 && (this.app.getPageCollection().setCurrentSpreadIndex(s2 - 1), this.flipNext(e2)), s2 < i2 && (this.app.getPageCollection().setCurrentSpreadIndex(s2 + 1), this.flipPrev(e2));
    } catch (t3) {
    }
  }
  flipNext(t2) {
    this.flip({ x: this.render.getRect().left + 2 * this.render.getRect().pageWidth - 10, y: "top" === t2 ? 1 : this.render.getRect().height - 2 });
  }
  flipPrev(t2) {
    this.flip({ x: 10, y: "top" === t2 ? 1 : this.render.getRect().height - 2 });
  }
  stopMove() {
    if (null === this.calc) return;
    const t2 = this.calc.getPosition(), e2 = this.getBoundsRect(), i2 = "bottom" === this.calc.getCorner() ? e2.height : 0;
    t2.x <= 0 ? this.animateFlippingTo(t2, { x: -e2.pageWidth, y: i2 }, true) : this.animateFlippingTo(t2, { x: e2.pageWidth, y: i2 }, false);
  }
  showCorner(t2) {
    if (!this.checkState("read", "fold_corner")) return;
    const e2 = this.getBoundsRect(), i2 = e2.pageWidth;
    if (this.isPointOnCorners(t2)) if (null === this.calc) {
      if (!this.start(t2)) return;
      this.setState("fold_corner"), this.calc.calc({ x: i2 - 1, y: 1 });
      const s2 = 50, n2 = "bottom" === this.calc.getCorner() ? e2.height - 1 : 1, h2 = "bottom" === this.calc.getCorner() ? e2.height - s2 : s2;
      this.animateFlippingTo({ x: i2 - 1, y: n2 }, { x: i2 - s2, y: h2 }, false, false);
    } else this.do(this.render.convertToPage(t2));
    else this.setState("read"), this.render.finishAnimation(), this.stopMove();
  }
  animateFlippingTo(t2, e2, i2, s2 = true) {
    const n2 = h.GetCordsFromTwoPoint(t2, e2), r2 = [];
    for (const t3 of n2) r2.push(() => this.do(t3));
    const o2 = this.getAnimationDuration(n2.length);
    this.render.startAnimation(r2, o2, () => {
      this.calc && (i2 && (1 === this.calc.getDirection() ? this.app.turnToPrevPage() : this.app.turnToNextPage()), s2 && (this.render.setBottomPage(null), this.render.setFlippingPage(null), this.render.clearShadow(), this.setState("read"), this.reset()));
    });
  }
  getCalculation() {
    return this.calc;
  }
  getState() {
    return this.state;
  }
  setState(t2) {
    this.state !== t2 && (this.app.updateState(t2), this.state = t2);
  }
  getDirectionByPoint(t2) {
    const e2 = this.getBoundsRect();
    if ("portrait" === this.render.getOrientation()) {
      if (t2.x - e2.pageWidth <= e2.width / 5) return 1;
    } else if (t2.x < e2.width / 2) return 1;
    return 0;
  }
  getAnimationDuration(t2) {
    const e2 = this.app.getSettings().flippingTime;
    return t2 >= 1e3 ? e2 : t2 / 1e3 * e2;
  }
  checkDirection(t2) {
    return 0 === t2 ? this.app.getCurrentPageIndex() < this.app.getPageCount() - 1 : this.app.getCurrentPageIndex() >= 1;
  }
  reset() {
    this.calc = null, this.flippingPage = null, this.bottomPage = null;
  }
  getBoundsRect() {
    return this.render.getRect();
  }
  checkState(...t2) {
    for (const e2 of t2) if (this.state === e2) return true;
    return false;
  }
  isPointOnCorners(t2) {
    const e2 = this.getBoundsRect(), i2 = e2.pageWidth, s2 = Math.sqrt(Math.pow(i2, 2) + Math.pow(e2.height, 2)) / 5, n2 = this.render.convertToBook(t2);
    return n2.x > 0 && n2.y > 0 && n2.x < e2.width && n2.y < e2.height && (n2.x < s2 || n2.x > e2.width - s2) && (n2.y < s2 || n2.y > e2.height - s2);
  }
};
var l2 = class {
  constructor(t2, e2) {
    this.leftPage = null, this.rightPage = null, this.flippingPage = null, this.bottomPage = null, this.direction = null, this.orientation = null, this.shadow = null, this.animation = null, this.pageRect = null, this.boundsRect = null, this.timer = 0, this.safari = false, this.setting = e2, this.app = t2;
    const i2 = new RegExp("Version\\/[\\d\\.]+.*Safari/");
    this.safari = null !== i2.exec(window.navigator.userAgent);
  }
  render(t2) {
    if (null !== this.animation) {
      const e2 = Math.round((t2 - this.animation.startedAt) / this.animation.durationFrame);
      e2 < this.animation.frames.length ? this.animation.frames[e2]() : (this.animation.onAnimateEnd(), this.animation = null);
    }
    this.timer = t2, this.drawFrame();
  }
  start() {
    this.update();
    const t2 = (e2) => {
      if (!this.app.block.isConnected) return;
      this.render(e2);
      this.frame = requestAnimationFrame(t2);
    };
    this.frame = requestAnimationFrame(t2);
  }
  startAnimation(t2, e2, i2) {
    this.finishAnimation(), this.animation = { frames: t2, duration: e2, durationFrame: e2 / t2.length, onAnimateEnd: i2, startedAt: this.timer };
  }
  finishAnimation() {
    null !== this.animation && (this.animation.frames[this.animation.frames.length - 1](), null !== this.animation.onAnimateEnd && this.animation.onAnimateEnd()), this.animation = null;
  }
  update() {
    this.boundsRect = null;
    const t2 = this.calculateBoundsRect();
    this.orientation !== t2 && (this.orientation = t2, this.app.updateOrientation(t2));
  }
  calculateBoundsRect() {
    let t2 = "landscape";
    const e2 = this.getBlockWidth(), i2 = e2 / 2, s2 = this.getBlockHeight() / 2, n2 = this.setting.width / this.setting.height;
    let h2 = this.setting.width, r2 = this.setting.height, o2 = i2 - h2;
    return "stretch" === this.setting.size ? (e2 < 2 * this.setting.minWidth && this.app.getSettings().usePortrait && (t2 = "portrait"), h2 = "portrait" === t2 ? this.getBlockWidth() : this.getBlockWidth() / 2, h2 > this.setting.maxWidth && (h2 = this.setting.maxWidth), r2 = h2 / n2, r2 > this.getBlockHeight() && (r2 = this.getBlockHeight(), h2 = r2 * n2), o2 = "portrait" === t2 ? i2 - h2 / 2 - h2 : i2 - h2) : e2 < 2 * h2 && this.app.getSettings().usePortrait && (t2 = "portrait", o2 = i2 - h2 / 2 - h2), this.boundsRect = { left: o2, top: s2 - r2 / 2, width: 2 * h2, height: r2, pageWidth: h2 }, t2;
  }
  setShadowData(t2, e2, i2, s2) {
    if (!this.app.getSettings().drawShadow) return;
    const n2 = 100 * this.getSettings().maxShadowOpacity;
    this.shadow = { pos: t2, angle: e2, width: 3 * this.getRect().pageWidth / 4 * i2 / 100, opacity: (100 - i2) * n2 / 100 / 100, direction: s2, progress: 2 * i2 };
  }
  clearShadow() {
    this.shadow = null;
  }
  getBlockWidth() {
    return this.app.getUI().getDistElement().offsetWidth;
  }
  getBlockHeight() {
    return this.app.getUI().getDistElement().offsetHeight;
  }
  getDirection() {
    return this.direction;
  }
  getRect() {
    return null === this.boundsRect && this.calculateBoundsRect(), this.boundsRect;
  }
  getSettings() {
    return this.app.getSettings();
  }
  getOrientation() {
    return this.orientation;
  }
  setPageRect(t2) {
    this.pageRect = t2;
  }
  setDirection(t2) {
    this.direction = t2;
  }
  setRightPage(t2) {
    null !== t2 && t2.setOrientation(1), this.rightPage = t2;
  }
  setLeftPage(t2) {
    null !== t2 && t2.setOrientation(0), this.leftPage = t2;
  }
  setBottomPage(t2) {
    null !== t2 && t2.setOrientation(1 === this.direction ? 0 : 1), this.bottomPage = t2;
  }
  setFlippingPage(t2) {
    null !== t2 && t2.setOrientation(0 === this.direction && "portrait" !== this.orientation ? 0 : 1), this.flippingPage = t2;
  }
  convertToBook(t2) {
    const e2 = this.getRect();
    return { x: t2.x - e2.left, y: t2.y - e2.top };
  }
  isSafari() {
    return this.safari;
  }
  convertToPage(t2, e2) {
    e2 || (e2 = this.direction);
    const i2 = this.getRect();
    return { x: 0 === e2 ? t2.x - i2.left - i2.width / 2 : i2.width / 2 - t2.x + i2.left, y: t2.y - i2.top };
  }
  convertToGlobal(t2, e2) {
    if (e2 || (e2 = this.direction), null == t2) return null;
    const i2 = this.getRect();
    return { x: 0 === e2 ? t2.x + i2.left + i2.width / 2 : i2.width / 2 - t2.x + i2.left, y: t2.y + i2.top };
  }
  convertRectToGlobal(t2, e2) {
    return e2 || (e2 = this.direction), { topLeft: this.convertToGlobal(t2.topLeft, e2), topRight: this.convertToGlobal(t2.topRight, e2), bottomLeft: this.convertToGlobal(t2.bottomLeft, e2), bottomRight: this.convertToGlobal(t2.bottomRight, e2) };
  }
};
var d = class extends l2 {
  constructor(t2, e2, i2) {
    super(t2, e2), this.canvas = i2, this.ctx = i2.getContext("2d");
  }
  getContext() {
    return this.ctx;
  }
  reload() {
  }
  drawFrame() {
    this.clear(), "portrait" !== this.orientation && null != this.leftPage && this.leftPage.simpleDraw(0), null != this.rightPage && this.rightPage.simpleDraw(1), null != this.bottomPage && this.bottomPage.draw(), this.drawBookShadow(), null != this.flippingPage && this.flippingPage.draw(), null != this.shadow && (this.drawOuterShadow(), this.drawInnerShadow());
    const t2 = this.getRect();
    "portrait" === this.orientation && (this.ctx.beginPath(), this.ctx.rect(t2.left + t2.pageWidth, t2.top, t2.width, t2.height), this.ctx.clip());
  }
  drawBookShadow() {
    const t2 = this.getRect();
    this.ctx.save(), this.ctx.beginPath();
    const e2 = t2.width / 20;
    this.ctx.rect(t2.left, t2.top, t2.width, t2.height);
    const i2 = { x: t2.left + t2.width / 2 - e2 / 2, y: 0 };
    this.ctx.translate(i2.x, i2.y);
    const s2 = this.ctx.createLinearGradient(0, 0, e2, 0);
    s2.addColorStop(0, "rgba(0, 0, 0, 0)"), s2.addColorStop(0.4, "rgba(0, 0, 0, 0.2)"), s2.addColorStop(0.49, "rgba(0, 0, 0, 0.1)"), s2.addColorStop(0.5, "rgba(0, 0, 0, 0.5)"), s2.addColorStop(0.51, "rgba(0, 0, 0, 0.4)"), s2.addColorStop(1, "rgba(0, 0, 0, 0)"), this.ctx.clip(), this.ctx.fillStyle = s2, this.ctx.fillRect(0, 0, e2, 2 * t2.height), this.ctx.restore();
  }
  drawOuterShadow() {
    const t2 = this.getRect();
    this.ctx.save(), this.ctx.beginPath(), this.ctx.rect(t2.left, t2.top, t2.width, t2.height);
    const e2 = this.convertToGlobal({ x: this.shadow.pos.x, y: this.shadow.pos.y });
    this.ctx.translate(e2.x, e2.y), this.ctx.rotate(Math.PI + this.shadow.angle + Math.PI / 2);
    const i2 = this.ctx.createLinearGradient(0, 0, this.shadow.width, 0);
    0 === this.shadow.direction ? (this.ctx.translate(0, -100), i2.addColorStop(0, "rgba(0, 0, 0, " + this.shadow.opacity + ")"), i2.addColorStop(1, "rgba(0, 0, 0, 0)")) : (this.ctx.translate(-this.shadow.width, -100), i2.addColorStop(0, "rgba(0, 0, 0, 0)"), i2.addColorStop(1, "rgba(0, 0, 0, " + this.shadow.opacity + ")")), this.ctx.clip(), this.ctx.fillStyle = i2, this.ctx.fillRect(0, 0, this.shadow.width, 2 * t2.height), this.ctx.restore();
  }
  drawInnerShadow() {
    const t2 = this.getRect();
    this.ctx.save(), this.ctx.beginPath();
    const e2 = this.convertToGlobal({ x: this.shadow.pos.x, y: this.shadow.pos.y }), i2 = this.convertRectToGlobal(this.pageRect);
    this.ctx.moveTo(i2.topLeft.x, i2.topLeft.y), this.ctx.lineTo(i2.topRight.x, i2.topRight.y), this.ctx.lineTo(i2.bottomRight.x, i2.bottomRight.y), this.ctx.lineTo(i2.bottomLeft.x, i2.bottomLeft.y), this.ctx.translate(e2.x, e2.y), this.ctx.rotate(Math.PI + this.shadow.angle + Math.PI / 2);
    const s2 = 3 * this.shadow.width / 4, n2 = this.ctx.createLinearGradient(0, 0, s2, 0);
    0 === this.shadow.direction ? (this.ctx.translate(-s2, -100), n2.addColorStop(1, "rgba(0, 0, 0, " + this.shadow.opacity + ")"), n2.addColorStop(0.9, "rgba(0, 0, 0, 0.05)"), n2.addColorStop(0.7, "rgba(0, 0, 0, " + this.shadow.opacity + ")"), n2.addColorStop(0, "rgba(0, 0, 0, 0)")) : (this.ctx.translate(0, -100), n2.addColorStop(0, "rgba(0, 0, 0, " + this.shadow.opacity + ")"), n2.addColorStop(0.1, "rgba(0, 0, 0, 0.05)"), n2.addColorStop(0.3, "rgba(0, 0, 0, " + this.shadow.opacity + ")"), n2.addColorStop(1, "rgba(0, 0, 0, 0)")), this.ctx.clip(), this.ctx.fillStyle = n2, this.ctx.fillRect(0, 0, s2, 2 * t2.height), this.ctx.restore();
  }
  clear() {
    this.ctx.fillStyle = "white", this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
};
var p = class {
  constructor(t2, e2, i2) {
    this.touchPoint = null, this.swipeTimeout = 250, this.onResize = () => {
      this.update();
    }, this.onMouseDown = (t3) => {
      if (this.checkTarget(t3.target)) {
        const e3 = this.getMousePos(t3.clientX, t3.clientY);
        this.app.startUserTouch(e3), t3.preventDefault();
      }
    }, this.onTouchStart = (t3) => {
      if (this.checkTarget(t3.target) && t3.changedTouches.length > 0) {
        const e3 = t3.changedTouches[0], i3 = this.getMousePos(e3.clientX, e3.clientY);
        this.touchPoint = { point: i3, time: Date.now() }, setTimeout(() => {
          null !== this.touchPoint && this.app.startUserTouch(i3);
        }, this.swipeTimeout), this.app.getSettings().mobileScrollSupport || t3.preventDefault();
      }
    }, this.onMouseUp = (t3) => {
      const e3 = this.getMousePos(t3.clientX, t3.clientY);
      this.app.userStop(e3);
    }, this.onMouseMove = (t3) => {
      const e3 = this.getMousePos(t3.clientX, t3.clientY);
      this.app.userMove(e3, false);
    }, this.onTouchMove = (t3) => {
      if (t3.changedTouches.length > 0) {
        const e3 = t3.changedTouches[0], i3 = this.getMousePos(e3.clientX, e3.clientY);
        this.app.getSettings().mobileScrollSupport ? (null !== this.touchPoint && (Math.abs(this.touchPoint.point.x - i3.x) > 10 || "read" !== this.app.getState()) && t3.cancelable && this.app.userMove(i3, true), "read" !== this.app.getState() && t3.preventDefault()) : this.app.userMove(i3, true);
      }
    }, this.onTouchEnd = (t3) => {
      if (t3.changedTouches.length > 0) {
        const e3 = t3.changedTouches[0], i3 = this.getMousePos(e3.clientX, e3.clientY);
        let s3 = false;
        if (null !== this.touchPoint) {
          const t4 = i3.x - this.touchPoint.point.x, e4 = Math.abs(i3.y - this.touchPoint.point.y);
          Math.abs(t4) > this.swipeDistance && e4 < 2 * this.swipeDistance && Date.now() - this.touchPoint.time < this.swipeTimeout && (t4 > 0 ? this.app.flipPrev(this.touchPoint.point.y < this.app.getRender().getRect().height / 2 ? "top" : "bottom") : this.app.flipNext(this.touchPoint.point.y < this.app.getRender().getRect().height / 2 ? "top" : "bottom"), s3 = true), this.touchPoint = null;
        }
        this.app.userStop(i3, s3);
      }
    }, this.parentElement = t2, t2.classList.add("stf__parent"), t2.insertAdjacentHTML("afterbegin", '<div class="stf__wrapper"></div>'), this.wrapper = t2.querySelector(".stf__wrapper"), this.app = e2;
    const s2 = this.app.getSettings().usePortrait ? 1 : 2;
    t2.style.minWidth = i2.minWidth * s2 + "px", t2.style.minHeight = i2.minHeight + "px", "fixed" === i2.size && (t2.style.minWidth = i2.width * s2 + "px", t2.style.minHeight = i2.height + "px"), i2.autoSize && (t2.style.width = "100%", t2.style.maxWidth = 2 * i2.maxWidth + "px"), t2.style.display = "block", window.addEventListener("resize", this.onResize, false), this.swipeDistance = i2.swipeDistance;
  }
  destroy() {
    this.app.getSettings().useMouseEvents && this.removeHandlers(), this.distElement.remove(), this.wrapper.remove();
  }
  getDistElement() {
    return this.distElement;
  }
  getWrapper() {
    return this.wrapper;
  }
  setOrientationStyle(t2) {
    this.wrapper.classList.remove("--portrait", "--landscape"), "portrait" === t2 ? (this.app.getSettings().autoSize && (this.wrapper.style.paddingBottom = this.app.getSettings().height / this.app.getSettings().width * 100 + "%"), this.wrapper.classList.add("--portrait")) : (this.app.getSettings().autoSize && (this.wrapper.style.paddingBottom = this.app.getSettings().height / (2 * this.app.getSettings().width) * 100 + "%"), this.wrapper.classList.add("--landscape")), this.update();
  }
  removeHandlers() {
    window.removeEventListener("resize", this.onResize), this.distElement.removeEventListener("mousedown", this.onMouseDown), this.distElement.removeEventListener("touchstart", this.onTouchStart), window.removeEventListener("mousemove", this.onMouseMove), window.removeEventListener("touchmove", this.onTouchMove), window.removeEventListener("mouseup", this.onMouseUp), window.removeEventListener("touchend", this.onTouchEnd);
  }
  setHandlers() {
    window.addEventListener("resize", this.onResize, false), this.app.getSettings().useMouseEvents && (this.distElement.addEventListener("mousedown", this.onMouseDown), this.distElement.addEventListener("touchstart", this.onTouchStart), window.addEventListener("mousemove", this.onMouseMove), window.addEventListener("touchmove", this.onTouchMove, { passive: !this.app.getSettings().mobileScrollSupport }), window.addEventListener("mouseup", this.onMouseUp), window.addEventListener("touchend", this.onTouchEnd));
  }
  getMousePos(t2, e2) {
    const i2 = this.distElement.getBoundingClientRect();
    return { x: t2 - i2.left, y: e2 - i2.top };
  }
  checkTarget(t2) {
    return !this.app.getSettings().clickEventForward || !["a", "button"].includes(t2.tagName.toLowerCase());
  }
};
var c = class extends p {
  constructor(t2, e2, i2, s2) {
    super(t2, e2, i2), this.wrapper.insertAdjacentHTML("afterbegin", '<div class="stf__block"></div>'), this.distElement = t2.querySelector(".stf__block"), this.items = s2;
    for (const t3 of s2) this.distElement.appendChild(t3);
    this.setHandlers();
  }
  clear() {
    for (const t2 of this.items) this.parentElement.appendChild(t2);
  }
  updateItems(t2) {
    this.removeHandlers(), this.distElement.innerHTML = "";
    for (const e2 of t2) this.distElement.appendChild(e2);
    this.items = t2, this.setHandlers();
  }
  update() {
    this.app.getRender().update();
  }
};
var u = class extends p {
  constructor(t2, e2, i2) {
    super(t2, e2, i2), this.wrapper.innerHTML = '<canvas class="stf__canvas"></canvas>', this.canvas = t2.querySelectorAll("canvas")[0], this.distElement = this.canvas, this.resizeCanvas(), this.setHandlers();
  }
  resizeCanvas() {
    const t2 = getComputedStyle(this.canvas), e2 = parseInt(t2.getPropertyValue("width"), 10), i2 = parseInt(t2.getPropertyValue("height"), 10);
    this.canvas.width = e2, this.canvas.height = i2;
  }
  getCanvas() {
    return this.canvas;
  }
  update() {
    this.resizeCanvas(), this.app.getRender().update();
  }
};
var w = class extends l2 {
  constructor(t2, e2, i2) {
    super(t2, e2), this.outerShadow = null, this.innerShadow = null, this.hardShadow = null, this.hardInnerShadow = null, this.element = i2, this.createShadows();
  }
  createShadows() {
    this.element.insertAdjacentHTML("beforeend", '<div class="stf__outerShadow"></div>\n             <div class="stf__innerShadow"></div>\n             <div class="stf__hardShadow"></div>\n             <div class="stf__hardInnerShadow"></div>'), this.outerShadow = this.element.querySelector(".stf__outerShadow"), this.innerShadow = this.element.querySelector(".stf__innerShadow"), this.hardShadow = this.element.querySelector(".stf__hardShadow"), this.hardInnerShadow = this.element.querySelector(".stf__hardInnerShadow");
  }
  clearShadow() {
    super.clearShadow(), this.outerShadow.style.cssText = "display: none", this.innerShadow.style.cssText = "display: none", this.hardShadow.style.cssText = "display: none", this.hardInnerShadow.style.cssText = "display: none";
  }
  reload() {
    this.element.querySelector(".stf__outerShadow") || this.createShadows();
  }
  drawHardInnerShadow() {
    const t2 = this.getRect(), e2 = this.shadow.progress > 100 ? 200 - this.shadow.progress : this.shadow.progress;
    let i2 = (100 - e2) * (2.5 * t2.pageWidth) / 100 + 20;
    i2 > t2.pageWidth && (i2 = t2.pageWidth);
    let s2 = `
            display: block;
            z-index: ${(this.getSettings().startZIndex + 5).toString(10)};
            width: ${i2}px;
            height: ${t2.height}px;
            background: linear-gradient(to right,
                rgba(0, 0, 0, ${this.shadow.opacity * e2 / 100}) 5%,
                rgba(0, 0, 0, 0) 100%);
            left: ${t2.left + t2.width / 2}px;
            transform-origin: 0 0;
        `;
    s2 += 0 === this.getDirection() && this.shadow.progress > 100 || 1 === this.getDirection() && this.shadow.progress <= 100 ? "transform: translate3d(0, 0, 0);" : "transform: translate3d(0, 0, 0) rotateY(180deg);", this.hardInnerShadow.style.cssText = s2;
  }
  drawHardOuterShadow() {
    const t2 = this.getRect();
    let e2 = (100 - (this.shadow.progress > 100 ? 200 - this.shadow.progress : this.shadow.progress)) * (2.5 * t2.pageWidth) / 100 + 20;
    e2 > t2.pageWidth && (e2 = t2.pageWidth);
    let i2 = `
            display: block;
            z-index: ${(this.getSettings().startZIndex + 4).toString(10)};
            width: ${e2}px;
            height: ${t2.height}px;
            background: linear-gradient(to left, rgba(0, 0, 0, ${this.shadow.opacity}) 5%, rgba(0, 0, 0, 0) 100%);
            left: ${t2.left + t2.width / 2}px;
            transform-origin: 0 0;
        `;
    i2 += 0 === this.getDirection() && this.shadow.progress > 100 || 1 === this.getDirection() && this.shadow.progress <= 100 ? "transform: translate3d(0, 0, 0) rotateY(180deg);" : "transform: translate3d(0, 0, 0);", this.hardShadow.style.cssText = i2;
  }
  drawInnerShadow() {
    const t2 = this.getRect(), e2 = 3 * this.shadow.width / 4, i2 = 0 === this.getDirection() ? e2 : 0, s2 = 0 === this.getDirection() ? "to left" : "to right", n2 = this.convertToGlobal(this.shadow.pos), r2 = this.shadow.angle + 3 * Math.PI / 2, o2 = [this.pageRect.topLeft, this.pageRect.topRight, this.pageRect.bottomRight, this.pageRect.bottomLeft];
    let a3 = "polygon( ";
    for (const t3 of o2) {
      let e3 = 1 === this.getDirection() ? { x: -t3.x + this.shadow.pos.x, y: t3.y - this.shadow.pos.y } : { x: t3.x - this.shadow.pos.x, y: t3.y - this.shadow.pos.y };
      e3 = h.GetRotatedPoint(e3, { x: i2, y: 100 }, r2), a3 += e3.x + "px " + e3.y + "px, ";
    }
    a3 = a3.slice(0, -2), a3 += ")";
    const g2 = `
            display: block;
            z-index: ${(this.getSettings().startZIndex + 10).toString(10)};
            width: ${e2}px;
            height: ${2 * t2.height}px;
            background: linear-gradient(${s2},
                rgba(0, 0, 0, ${this.shadow.opacity}) 5%,
                rgba(0, 0, 0, 0.05) 15%,
                rgba(0, 0, 0, ${this.shadow.opacity}) 35%,
                rgba(0, 0, 0, 0) 100%);
            transform-origin: ${i2}px 100px;
            transform: translate3d(${n2.x - i2}px, ${n2.y - 100}px, 0) rotate(${r2}rad);
            clip-path: ${a3};
            -webkit-clip-path: ${a3};
        `;
    this.innerShadow.style.cssText = g2;
  }
  drawOuterShadow() {
    const t2 = this.getRect(), e2 = this.convertToGlobal({ x: this.shadow.pos.x, y: this.shadow.pos.y }), i2 = this.shadow.angle + 3 * Math.PI / 2, s2 = 1 === this.getDirection() ? this.shadow.width : 0, n2 = 0 === this.getDirection() ? "to right" : "to left", r2 = [{ x: 0, y: 0 }, { x: t2.pageWidth, y: 0 }, { x: t2.pageWidth, y: t2.height }, { x: 0, y: t2.height }];
    let o2 = "polygon( ";
    for (const t3 of r2) if (null !== t3) {
      let e3 = 1 === this.getDirection() ? { x: -t3.x + this.shadow.pos.x, y: t3.y - this.shadow.pos.y } : { x: t3.x - this.shadow.pos.x, y: t3.y - this.shadow.pos.y };
      e3 = h.GetRotatedPoint(e3, { x: s2, y: 100 }, i2), o2 += e3.x + "px " + e3.y + "px, ";
    }
    o2 = o2.slice(0, -2), o2 += ")";
    const a3 = `
            display: block;
            z-index: ${(this.getSettings().startZIndex + 10).toString(10)};
            width: ${this.shadow.width}px;
            height: ${2 * t2.height}px;
            background: linear-gradient(${n2}, rgba(0, 0, 0, ${this.shadow.opacity}), rgba(0, 0, 0, 0));
            transform-origin: ${s2}px 100px;
            transform: translate3d(${e2.x - s2}px, ${e2.y - 100}px, 0) rotate(${i2}rad);
            clip-path: ${o2};
            -webkit-clip-path: ${o2};
        `;
    this.outerShadow.style.cssText = a3;
  }
  drawLeftPage() {
    "portrait" !== this.orientation && null !== this.leftPage && (1 === this.direction && null !== this.flippingPage && "hard" === this.flippingPage.getDrawingDensity() ? (this.leftPage.getElement().style.zIndex = (this.getSettings().startZIndex + 5).toString(10), this.leftPage.setHardDrawingAngle(180 + this.flippingPage.getHardAngle()), this.leftPage.draw(this.flippingPage.getDrawingDensity())) : this.leftPage.simpleDraw(0));
  }
  drawRightPage() {
    null !== this.rightPage && (0 === this.direction && null !== this.flippingPage && "hard" === this.flippingPage.getDrawingDensity() ? (this.rightPage.getElement().style.zIndex = (this.getSettings().startZIndex + 5).toString(10), this.rightPage.setHardDrawingAngle(180 + this.flippingPage.getHardAngle()), this.rightPage.draw(this.flippingPage.getDrawingDensity())) : this.rightPage.simpleDraw(1));
  }
  drawBottomPage() {
    if (null === this.bottomPage) return;
    const t2 = null != this.flippingPage ? this.flippingPage.getDrawingDensity() : null;
    "portrait" === this.orientation && 1 === this.direction || (this.bottomPage.getElement().style.zIndex = (this.getSettings().startZIndex + 3).toString(10), this.bottomPage.draw(t2));
  }
  drawFrame() {
    this.clear(), this.drawLeftPage(), this.drawRightPage(), this.drawBottomPage(), null != this.flippingPage && (this.flippingPage.getElement().style.zIndex = (this.getSettings().startZIndex + 5).toString(10), this.flippingPage.draw()), null != this.shadow && null !== this.flippingPage && ("soft" === this.flippingPage.getDrawingDensity() ? (this.drawOuterShadow(), this.drawInnerShadow()) : (this.drawHardOuterShadow(), this.drawHardInnerShadow()));
  }
  clear() {
    for (const t2 of this.app.getPageCollection().getPages()) t2 !== this.leftPage && t2 !== this.rightPage && t2 !== this.flippingPage && t2 !== this.bottomPage && (t2.getElement().style.cssText = "display: none"), t2.getTemporaryCopy() !== this.flippingPage && t2.hideTemporaryCopy();
  }
  update() {
    super.update(), null !== this.rightPage && this.rightPage.setOrientation(1), null !== this.leftPage && this.leftPage.setOrientation(0);
  }
};
var x = class {
  constructor() {
    this._default = { startPage: 0, size: "fixed", width: 0, height: 0, minWidth: 0, maxWidth: 0, minHeight: 0, maxHeight: 0, drawShadow: true, flippingTime: 1e3, usePortrait: true, startZIndex: 0, autoSize: true, maxShadowOpacity: 1, showCover: false, mobileScrollSupport: true, swipeDistance: 30, clickEventForward: true, useMouseEvents: true, showPageCorners: true, disableFlipByClick: false };
  }
  getSettings(t2) {
    const e2 = this._default;
    if (Object.assign(e2, t2), "stretch" !== e2.size && "fixed" !== e2.size) throw new Error('Invalid size type. Available only "fixed" and "stretch" value');
    if (e2.width <= 0 || e2.height <= 0) throw new Error("Invalid width or height");
    if (e2.flippingTime <= 0) throw new Error("Invalid flipping time");
    return "stretch" === e2.size ? (e2.minWidth <= 0 && (e2.minWidth = 100), e2.maxWidth < e2.minWidth && (e2.maxWidth = 2e3), e2.minHeight <= 0 && (e2.minHeight = 100), e2.maxHeight < e2.minHeight && (e2.maxHeight = 2e3)) : (e2.minWidth = e2.width, e2.maxWidth = e2.width, e2.minHeight = e2.height, e2.maxHeight = e2.height), e2;
  }
};
!(function(t2, e2) {
  void 0 === e2 && (e2 = {});
  var i2 = e2.insertAt;
  if (t2 && "undefined" != typeof document) {
    var s2 = document.head || document.getElementsByTagName("head")[0], n2 = document.createElement("style");
    n2.type = "text/css", "top" === i2 && s2.firstChild ? s2.insertBefore(n2, s2.firstChild) : s2.appendChild(n2), n2.styleSheet ? n2.styleSheet.cssText = t2 : n2.appendChild(document.createTextNode(t2));
  }
})(".stf__parent {\n  position: relative;\n  display: block;\n  box-sizing: border-box;\n  transform: translateZ(0);\n\n  -ms-touch-action: pan-y;\n  touch-action: pan-y;\n}\n\n.sft__wrapper {\n  position: relative;\n  width: 100%;\n  box-sizing: border-box;\n}\n\n.stf__parent canvas {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n}\n\n.stf__block {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n  perspective: 2000px;\n}\n\n.stf__item {\n  display: none;\n  position: absolute;\n  transform-style: preserve-3d;\n}\n\n.stf__outerShadow {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.stf__innerShadow {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.stf__hardShadow {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.stf__hardInnerShadow {\n  position: absolute;\n  left: 0;\n  top: 0;\n}");
t.PageFlip = class extends class {
  constructor() {
    this.events = /* @__PURE__ */ new Map();
  }
  on(t2, e2) {
    return this.events.has(t2) ? this.events.get(t2).push(e2) : this.events.set(t2, [e2]), this;
  }
  off(t2) {
    this.events.delete(t2);
  }
  trigger(t2, e2, i2 = null) {
    if (this.events.has(t2)) for (const s2 of this.events.get(t2)) s2({ data: i2, object: e2 });
  }
} {
  constructor(t2, e2) {
    super(), this.isUserTouch = false, this.isUserMove = false, this.setting = null, this.pages = null, this.setting = new x().getSettings(e2), this.block = t2;
  }
  destroy() {
    cancelAnimationFrame(this.render.frame);
    this.ui.destroy();
    this.block.remove();
  }
  update() {
    this.render.update(), this.pages.show();
  }
  loadFromImages(t2) {
    this.ui = new u(this.block, this, this.setting);
    const e2 = this.ui.getCanvas();
    this.render = new d(this, this.setting, e2), this.flipController = new g(this.render, this), this.pages = new n(this, this.render, t2), this.pages.load(), this.render.start(), this.pages.show(this.setting.startPage), setTimeout(() => {
      this.ui.update(), this.trigger("init", this, { page: this.setting.startPage, mode: this.render.getOrientation() });
    }, 1);
  }
  loadFromHTML(t2) {
    this.ui = new c(this.block, this, this.setting, t2), this.render = new w(this, this.setting, this.ui.getDistElement()), this.flipController = new g(this.render, this), this.pages = new o(this, this.render, this.ui.getDistElement(), t2), this.pages.load(), this.render.start(), this.pages.show(this.setting.startPage), setTimeout(() => {
      this.ui.update(), this.trigger("init", this, { page: this.setting.startPage, mode: this.render.getOrientation() });
    }, 1);
  }
  updateFromImages(t2) {
    const e2 = this.pages.getCurrentPageIndex();
    this.pages.destroy(), this.pages = new n(this, this.render, t2), this.pages.load(), this.pages.show(e2), this.trigger("update", this, { page: e2, mode: this.render.getOrientation() });
  }
  updateFromHtml(t2) {
    const e2 = this.pages.getCurrentPageIndex();
    this.pages.destroy(), this.pages = new o(this, this.render, this.ui.getDistElement(), t2), this.pages.load(), this.ui.updateItems(t2), this.render.reload(), this.pages.show(e2), this.trigger("update", this, { page: e2, mode: this.render.getOrientation() });
  }
  clear() {
    this.pages.destroy(), this.ui.clear();
  }
  turnToPrevPage() {
    this.pages.showPrev();
  }
  turnToNextPage() {
    this.pages.showNext();
  }
  turnToPage(t2) {
    this.pages.show(t2);
  }
  flipNext(t2 = "top") {
    this.flipController.flipNext(t2);
  }
  flipPrev(t2 = "top") {
    this.flipController.flipPrev(t2);
  }
  flip(t2, e2 = "top") {
    this.flipController.flipToPage(t2, e2);
  }
  updateState(t2) {
    this.trigger("changeState", this, t2);
  }
  updatePageIndex(t2) {
    this.trigger("flip", this, t2);
  }
  updateOrientation(t2) {
    this.ui.setOrientationStyle(t2), this.update(), this.trigger("changeOrientation", this, t2);
  }
  getPageCount() {
    return this.pages.getPageCount();
  }
  getCurrentPageIndex() {
    return this.pages.getCurrentPageIndex();
  }
  getPage(t2) {
    return this.pages.getPage(t2);
  }
  getRender() {
    return this.render;
  }
  getFlipController() {
    return this.flipController;
  }
  getOrientation() {
    return this.render.getOrientation();
  }
  getBoundsRect() {
    return this.render.getRect();
  }
  getSettings() {
    return this.setting;
  }
  getUI() {
    return this.ui;
  }
  getState() {
    return this.flipController.getState();
  }
  getPageCollection() {
    return this.pages;
  }
  startUserTouch(t2) {
    this.mousePosition = t2, this.isUserTouch = true, this.isUserMove = false;
  }
  userMove(t2, e2) {
    this.isUserTouch || e2 || !this.setting.showPageCorners ? this.isUserTouch && h.GetDistanceBetweenTwoPoint(this.mousePosition, t2) > 5 && (this.isUserMove = true, this.flipController.fold(t2)) : this.flipController.showCorner(t2);
  }
  userStop(t2, e2 = false) {
    this.isUserTouch && (this.isUserTouch = false, e2 || (this.isUserMove ? this.flipController.stopMove() : this.flipController.flip(t2)));
  }
}, Object.defineProperty(t, "__esModule", { value: true });
var PageFlip = t.PageFlip;

// rendering-source/src/lib/notebook/spread-nav.ts
function createFlipNav(index) {
  return { index, phase: "read", queued: null };
}
function requestFlip(nav, dir) {
  if (nav.phase !== "read") return { nav: { ...nav, queued: dir }, start: null };
  return { nav: { ...nav, phase: "flipping", queued: null }, start: dir };
}
function applyFlip(nav, index) {
  return { ...nav, index };
}
function applyChangeState(nav, state, canMove = () => true) {
  if (state === "flipping") return { nav: { ...nav, phase: "flipping" }, start: null };
  if (state !== "read") return { nav, start: null };
  const queued = nav.queued;
  const settled = { ...nav, phase: "read", queued: null };
  if (queued == null || !canMove(queued)) return { nav: settled, start: null };
  return { nav: { ...settled, phase: "flipping" }, start: queued };
}

// rendering-source/src/lib/notebook/viewer2d.ts
function mount2D(host, d2, index, onChange, surface = renderSurface, maxPageWidth = 440, inset = 60, portraitBreakpoint = 720, fitSpreadToHost = false) {
  const outer = document.createElement("div");
  outer.className = "flip-shell if-book";
  outer.dataset.paper = d2.config.paper === "black" ? "dark" : "light";
  host.appendChild(outer);
  outer.style.setProperty("--edge", d2.config.paper === "black" ? "#3d3e39" : d2.config.paper === "white" ? "#ddddd4" : "#cabfaa");
  outer.style.setProperty("--leather", d2.config.coverColor ?? (d2.config.cover === "graphite" ? "#292a28" : { "cognac": "#986249", "burgundy": "#62383e", "midnight": "#30414d", "forest": "#43564a", "terracotta": "#a85b40", "linen": "#dfd9ce", "cream": "#edeae2", "rose": "#c9a9b0" }[d2.config.cover]));
  outer.style.setProperty("--if-paper", d2.config.paper === "black" ? "#212220" : d2.config.paper === "white" ? "#f4efe4" : "#ebe2d0");
  outer.style.setProperty("--thickness", `${Math.round(d2.config.thickness * 160)}px`);
  if (d2.config.coverInk) outer.style.setProperty("--cover-ink", d2.config.coverInk);
  const edge = document.createElement("canvas");
  edge.width = 512;
  edge.height = 128;
  const ec = edge.getContext("2d");
  ec.fillStyle = d2.config.paper === "black" ? "#3d3e39" : d2.config.paper === "white" ? "#ddddd4" : "#cabfaa";
  ec.fillRect(0, 0, 512, 128);
  let seed = 836;
  const random = () => {
    seed = Math.imul(seed, 1664525) + 1013904223 | 0;
    return (seed >>> 0) / 4294967296;
  };
  for (let y = 1; y < 128; y += 1.6 + random() * 1.2) {
    const phase = random() * 6.28;
    ec.strokeStyle = `rgba(0,0,0,${0.055 + random() * 0.045})`;
    ec.lineWidth = 0.45 + random() * 0.3;
    ec.beginPath();
    for (let x2 = 0; x2 <= 512; x2 += 8) {
      const yy = y + Math.sin(x2 / 105 + phase) * 0.24;
      if (x2 === 0) ec.moveTo(x2, yy);
      else ec.lineTo(x2, yy);
    }
    ec.stroke();
  }
  outer.style.setProperty("--edge-texture", `url(${edge.toDataURL()})`);
  let book, current = index, pages = [], disposed = false, lastSize = "", resizeFrame = 0, flushTimer = 0, portrait = false, closedMode = index === 0 || index === d2.pages.length + 1;
  let nav = createFlipNav(index), pendingRebuild = false, queuedStart = null;
  const odd = d2.pages.length % 2 === 1;
  let terminal = false;
  function state(i2) {
    current = i2;
    outer.dataset.bookState = i2 === 0 ? "front" : i2 === d2.pages.length + 1 ? "back" : "open";
    outer.dataset.portrait = String(portrait);
  }
  function prepare(i2) {
    for (let n2 = Math.max(0, i2 - 2); n2 <= Math.min(pages.length - 1, i2 + 3); n2++) {
      const p2 = pages[n2];
      if (!p2.firstChild) {
        const source = surface(d2, n2), copy = document.createElement("canvas");
        copy.width = source.width;
        copy.height = source.height;
        copy.getContext("2d").drawImage(source, 0, 0);
        p2.appendChild(copy);
      }
    }
    for (let n2 = 0; n2 < pages.length; n2++) if (Math.abs(n2 - i2) > 4) pages[n2].replaceChildren();
  }
  function canMove(dir) {
    if (terminal) return dir === 1 ? current < d2.pages.length + 1 : current > 0;
    const n2 = book.getCurrentPageIndex();
    return dir === 1 ? n2 < pages.length - 1 : n2 > 0;
  }
  function go(dir) {
    const decision = requestFlip(nav, dir);
    nav = decision.nav;
    if (decision.start) begin(decision.start);
  }
  function begin(dir) {
    if (terminal) {
      if (!canMove(dir)) {
        nav = createFlipNav(current);
        return;
      }
      current = dir === 1 ? d2.pages.length + 1 : current === d2.pages.length + 1 ? d2.pages.length : Math.max(0, d2.pages.length - (portrait ? 1 : 2));
      nav = createFlipNav(current);
      onChange(current);
      lastSize = "";
      build(true);
      return;
    }
    if (!canMove(dir)) {
      nav = { ...nav, phase: "read", queued: null };
      return;
    }
    const n2 = book.getCurrentPageIndex();
    prepare(dir === 1 ? Math.min(pages.length - 1, n2 + 2) : Math.max(0, n2 - 2));
    if (dir === 1) book.flipNext();
    else book.flipPrev();
  }
  function flushAfterFlip() {
    flushTimer = 0;
    if (disposed) return;
    if (pendingRebuild) {
      pendingRebuild = false;
      lastSize = "";
      build(true);
    }
    const start = queuedStart;
    queuedStart = null;
    if (start) begin(start);
  }
  function scheduleFlush() {
    clearTimeout(flushTimer);
    flushTimer = window.setTimeout(flushAfterFlip, 0);
  }
  function build(force = false) {
    if (disposed) return;
    if (!force && nav.phase !== "read") {
      pendingRebuild = true;
      return;
    }
    const size = `${host.clientWidth}:${host.clientHeight}`;
    if (!force && size === lastSize) return;
    lastSize = size;
    if (book && !terminal) book.destroy();
    outer.replaceChildren();
    terminal = odd && current >= d2.pages.length;
    outer.style.pointerEvents = nav.phase === "flipping" ? "none" : "";
    const bookHost = document.createElement("div");
    outer.appendChild(bookHost);
    portrait = host.clientWidth < portraitBreakpoint && (portraitBreakpoint === 720 || host.clientHeight > host.clientWidth);
    closedMode = current === 0 || current === d2.pages.length + 1;
    const pageRatio = fitSpreadToHost ? Math.floor(host.clientWidth / 2) / host.clientHeight : 877 / 1115;
    const width = fitSpreadToHost ? Math.floor(host.clientWidth / 2) : Math.max(120, Math.min(maxPageWidth, Math.floor((host.clientWidth - inset) / (portrait || closedMode || terminal ? 1 : 2)), Math.floor((host.clientHeight - (inset === 60 ? 45 : 12)) * 877 / 1115)));
    outer.style.setProperty("--page-width", `${width}px`);
    if (terminal) {
      const p2 = document.createElement("div");
      p2.className = "flip-page if-terminal-page";
      p2.dataset.page = String(current);
      p2.style.cssText = `position:relative;width:${width}px;height:${Math.round(width / pageRatio)}px`;
      const source = surface(d2, current), copy = document.createElement("canvas");
      copy.width = source.width;
      copy.height = source.height;
      copy.style.cssText = "display:block;width:100%;height:100%";
      copy.getContext("2d").drawImage(source, 0, 0);
      p2.appendChild(copy);
      bookHost.appendChild(p2);
      bookHost.style.touchAction = "pan-y pinch-zoom";
      let start = null;
      bookHost.onpointerdown = (e2) => {
        start = { x: e2.clientX, y: e2.clientY };
      };
      bookHost.onpointercancel = () => {
        start = null;
      };
      bookHost.onpointerup = (e2) => {
        if (!start) return;
        const dx = e2.clientX - start.x, dy = e2.clientY - start.y;
        start = null;
        if (Math.abs(dx) > 48 && Math.abs(dy) < 40) {
          go(dx < 0 ? 1 : -1);
          return;
        }
        if (Math.abs(dx) > 8 || Math.abs(dy) > 8) return;
        const r2 = bookHost.getBoundingClientRect();
        if (e2.clientX < r2.left + r2.width * 0.18) go(-1);
        else if (e2.clientX > r2.right - r2.width * 0.18) go(1);
      };
      state(current);
      return;
    }
    book = new PageFlip(bookHost, { width, height: Math.round(width / pageRatio), size: "fixed", showCover: true, usePortrait: portrait, startPage: current, maxShadowOpacity: 0.36, mobileScrollSupport: true, useMouseEvents: false, flippingTime: matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 650 });
    bookHost.style.touchAction = "pan-y pinch-zoom";
    const interactive = (e2) => e2.target instanceof HTMLElement && !!e2.target.closest("button,a,input,select,textarea,audio,video,.page-media,[data-flip-ignore]");
    let track = null;
    bookHost.addEventListener("pointerdown", (e2) => {
      if (interactive(e2)) return;
      if (track) {
        track = null;
        return;
      }
      track = { x: e2.clientX, y: e2.clientY, id: e2.pointerId };
    });
    bookHost.addEventListener("pointerdown", (e2) => {
      if (track && e2.pointerId !== track.id) track = null;
    }, true);
    bookHost.addEventListener("pointercancel", () => {
      track = null;
    });
    bookHost.addEventListener("pointerup", (e2) => {
      if (!track || e2.pointerId !== track.id) return;
      const dx = e2.clientX - track.x, dy = e2.clientY - track.y;
      track = null;
      if (interactive(e2) || nav.phase !== "read") return;
      if (Math.abs(dx) > 48 && Math.abs(dy) < 40) {
        go(dx < 0 ? 1 : -1);
        return;
      }
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) return;
      const r2 = bookHost.getBoundingClientRect();
      const fx2 = (e2.clientX - r2.left) / Math.max(1, r2.width);
      if (fx2 < 0.18) go(-1);
      else if (fx2 > 0.82) go(1);
    });
    pages = Array.from({ length: d2.pages.length + 2 }, (_, i2) => {
      const p2 = document.createElement("div");
      p2.className = "flip-page";
      p2.dataset.density = i2 === 0 || i2 === d2.pages.length + 1 ? "hard" : "soft";
      p2.dataset.page = String(i2);
      return p2;
    });
    prepare(current);
    book.loadFromHTML(pages);
    book.on("flip", (e2) => {
      const i2 = Number(e2.data);
      if (!Number.isFinite(i2)) return;
      nav = applyFlip(nav, i2);
      prepare(i2);
      state(i2);
      onChange(nav.index);
      const closed = i2 === 0 || i2 === d2.pages.length + 1;
      if (closed !== closedMode || odd && i2 >= d2.pages.length) pendingRebuild = true;
    });
    book.on("changeState", (e2) => {
      const name = String(e2.data);
      outer.dataset.turning = String(name !== "read");
      outer.style.pointerEvents = name === "flipping" ? "none" : "";
      const decision = applyChangeState(nav, name, canMove);
      nav = decision.nav;
      if (name !== "read") return;
      if (decision.start) queuedStart = decision.start;
      scheduleFlush();
    });
    const gutter = document.createElement("div");
    gutter.className = "if-gutter";
    gutter.setAttribute("aria-hidden", "true");
    outer.appendChild(gutter);
    state(current);
  }
  build();
  const observer = new ResizeObserver(() => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => build());
  });
  observer.observe(host);
  return { next() {
    const decision = requestFlip(nav, 1);
    nav = decision.nav;
    if (decision.start) begin(decision.start);
  }, prev() {
    const decision = requestFlip(nav, -1);
    nav = decision.nav;
    if (decision.start) begin(decision.start);
  }, goto(i2) {
    if (nav.phase !== "read") return;
    if (terminal || odd && i2 >= d2.pages.length) {
      current = i2;
      nav = createFlipNav(i2);
      onChange(i2);
      lastSize = "";
      build(true);
      return;
    }
    prepare(i2);
    book.turnToPage(i2);
    if (pendingRebuild) scheduleFlush();
  }, dispose() {
    disposed = true;
    clearTimeout(flushTimer);
    observer.disconnect();
    cancelAnimationFrame(resizeFrame);
    if (!terminal) book.destroy();
    outer.remove();
  } };
}

// rendering-source/src/lib/stickers.ts
var IDS = ["01", "02", "03", "06", "07", "12", "13", "14", "16", "17"];
var STICKERS = IDS.map((n2) => ({
  id: `kawaii_${n2}`,
  label: `Kawaii ${n2}`,
  src: `/stickers/kawaii_${n2}.png`
}));
async function stickerCanvas(src) {
  const im = new Image();
  im.src = src;
  await im.decode();
  const ratio = Math.min(1, 768 / Math.max(im.naturalWidth, im.naturalHeight));
  const c2 = document.createElement("canvas");
  c2.width = Math.round(im.naturalWidth * ratio);
  c2.height = Math.round(im.naturalHeight * ratio);
  c2.getContext("2d").drawImage(im, 0, 0, c2.width, c2.height);
  return c2;
}
function portraitCutout(src, onProgress) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL("./sticker-worker.mjs", import.meta.url), { type: "module" });
    const timeout = setTimeout(() => {
      worker.terminate();
      reject(Error("Background removal timed out. Use the manual eraser."));
    }, 12e4);
    const finish = () => {
      clearTimeout(timeout);
      worker.terminate();
    };
    worker.onmessage = (e2) => {
      if (e2.data.progress) onProgress(e2.data.progress);
      if (e2.data.src) {
        finish();
        resolve(e2.data.src);
      }
      if (e2.data.error) {
        finish();
        reject(Error(e2.data.error));
      }
    };
    worker.onerror = () => {
      finish();
      reject(Error("Background removal unavailable"));
    };
    worker.postMessage(src);
  });
}
async function borderedSticker(src, colour, size) {
  const base = await stickerCanvas(src), pad = size + 4, c2 = document.createElement("canvas");
  c2.width = base.width + pad * 2;
  c2.height = base.height + pad * 2;
  const x2 = c2.getContext("2d"), mask = document.createElement("canvas");
  mask.width = c2.width;
  mask.height = c2.height;
  const m = mask.getContext("2d");
  m.drawImage(base, pad, pad);
  m.globalCompositeOperation = "source-in";
  m.fillStyle = colour;
  m.fillRect(0, 0, c2.width, c2.height);
  for (let r2 = 1; r2 <= size; r2 += 2) for (let n2 = 0; n2 < 48; n2++) {
    const a3 = n2 * Math.PI / 24;
    x2.drawImage(mask, Math.cos(a3) * r2, Math.sin(a3) * r2);
  }
  x2.drawImage(base, pad, pad);
  return { src: c2.toDataURL("image/png"), width: c2.width, height: c2.height };
}

// rendering-source/video-card.ts
var import_qrcode2 = __toESM(require_browser());
async function renderVideoCard(poster, title, link, textSize = 26, textFont) {
  await ensureTextFont(textFont);
  const c2 = document.createElement("canvas");
  c2.width = 640;
  c2.height = 480;
  const x2 = c2.getContext("2d"), silver = x2.createLinearGradient(0, 0, 640, 480);
  silver.addColorStop(0, "#f5f5f7");
  silver.addColorStop(0.28, "#b9bbc0");
  silver.addColorStop(0.54, "#eeeef0");
  silver.addColorStop(1, "#989ba2");
  x2.fillStyle = silver;
  x2.fillRect(0, 0, 640, 480);
  x2.strokeStyle = "#9b9da3";
  x2.strokeRect(1, 1, 638, 478);
  x2.fillStyle = "#29292b";
  x2.fillRect(18, 18, 604, 338);
  if (poster) {
    const im = new Image();
    await new Promise((resolve, reject) => {
      im.onload = () => resolve();
      im.onerror = () => reject(new Error("poster"));
      im.src = poster;
    });
    const s2 = Math.min(604 / im.width, 338 / im.height);
    x2.drawImage(im, 320 - im.width * s2 / 2, 187 - im.height * s2 / 2, im.width * s2, im.height * s2);
  } else {
    x2.fillStyle = "#dedee1";
    x2.beginPath();
    x2.moveTo(294, 154);
    x2.lineTo(294, 220);
    x2.lineTo(352, 187);
    x2.closePath();
    x2.fill();
    x2.textAlign = "center";
    x2.font = "17px Arial";
    x2.fillText("VIDEO", 320, 263);
    x2.textAlign = "left";
  }
  x2.fillStyle = "#171717";
  x2.font = `600 ${textSize}px ${textFamily(textFont, "Arial")}`;
  x2.fillText(title || "Video", 24, 414, 450);
  x2.font = "16px Arial";
  x2.fillText(link ? "Google Drive" : "Video", 24, 448);
  if (link) {
    const qr = new Image();
    qr.src = await import_qrcode2.default.toDataURL(link, { width: 105, margin: 2 });
    await qr.decode();
    x2.drawImage(qr, 510, 365, 105, 105);
  }
  return c2.toDataURL("image/png");
}
export {
  COMP_TEMPLATE_SIZES,
  COMP_ZONES,
  COVERS,
  INSPIRED_COVER,
  INSPIRED_PAPER,
  INSPIRED_THEME_COLORS,
  PAPERS,
  STAMP_EXTRAS,
  borderedSticker,
  buildAlbumPages,
  buildInspiredAlbum,
  captionFontPx,
  coverRect,
  elementDefaults,
  elementSize,
  ensureTextFont,
  filterPhoto,
  initialDetails,
  isTextFont,
  loadImage5 as loadImage,
  mount2D,
  notebookConfig,
  notebookMaterial,
  panFromPosition,
  portraitCutout,
  readPhoto,
  recordingHasSignal,
  renderCompositionSide,
  renderElement,
  renderFramePng,
  renderSurface,
  renderVideoCard,
  setRenderLanguage,
  stickerCanvas,
  stripLayout,
  textFamily,
  validatePhotoFile
};
/*! Bundled license information:

konva/lib/Global.js:
  (*
   * Konva JavaScript Framework v10.7.1
   * http://konvajs.org/
   * Licensed under the MIT
   * Date: @@date
   *
   * Original work Copyright (C) 2011 - 2013 by Eric Rowell (KineticJS)
   * Modified work Copyright (C) 2014 - present by Anton Lavrenov (Konva)
   *
   * @license
   *)

konva/lib/filters/Blur.js:
  (*
  
       StackBlur - a fast almost Gaussian Blur For Canvas
  
       Version:   0.5
       Author:    Mario Klingemann
       Contact:   mario@quasimondo.com
       Website:   http://www.quasimondo.com/StackBlurForCanvas
       Twitter:   @quasimondo
  
       In case you find this class useful - especially in commercial projects -
       I am not totally unhappy for a small donation to my PayPal account
       mario@quasimondo.de
  
       Or support me on flattr:
       https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript
  
       Copyright (c) 2010 Mario Klingemann
  
       Permission is hereby granted, free of charge, to any person
       obtaining a copy of this software and associated documentation
       files (the "Software"), to deal in the Software without
       restriction, including without limitation the rights to use,
       copy, modify, merge, publish, distribute, sublicense, and/or sell
       copies of the Software, and to permit persons to whom the
       Software is furnished to do so, subject to the following
       conditions:
  
       The above copyright notice and this permission notice shall be
       included in all copies or substantial portions of the Software.
  
       THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
       EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
       OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
       NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
       HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
       WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
       FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
       OTHER DEALINGS IN THE SOFTWARE.
       * @license MIT
       *)
*/
