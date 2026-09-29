
/* D3 force, dispatch, quadtree and timer (ISC)
Copyright 2010-2021 Mike Bostock

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.

*/
/* Build with build-dday-icon-matter.cjs; the emitted script is self-contained. */
(() => {
  "use strict";
  if (window.DDayIconMatter) return;
  const library = {};
  ((globalThis, exports, module, define) => {
    // https://d3js.org/d3-dispatch/ v3.0.1 Copyright 2010-2021 Mike Bostock
!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((n="undefined"!=typeof globalThis?globalThis:n||self).d3=n.d3||{})}(this,(function(n){"use strict";var e={value:()=>{}};function t(){for(var n,e=0,t=arguments.length,o={};e<t;++e){if(!(n=arguments[e]+"")||n in o||/[\s.]/.test(n))throw new Error("illegal type: "+n);o[n]=[]}return new r(o)}function r(n){this._=n}function o(n,e){return n.trim().split(/^|\s+/).map((function(n){var t="",r=n.indexOf(".");if(r>=0&&(t=n.slice(r+1),n=n.slice(0,r)),n&&!e.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:t}}))}function i(n,e){for(var t,r=0,o=n.length;r<o;++r)if((t=n[r]).name===e)return t.value}function f(n,t,r){for(var o=0,i=n.length;o<i;++o)if(n[o].name===t){n[o]=e,n=n.slice(0,o).concat(n.slice(o+1));break}return null!=r&&n.push({name:t,value:r}),n}r.prototype=t.prototype={constructor:r,on:function(n,e){var t,r=this._,l=o(n+"",r),a=-1,u=l.length;if(!(arguments.length<2)){if(null!=e&&"function"!=typeof e)throw new Error("invalid callback: "+e);for(;++a<u;)if(t=(n=l[a]).type)r[t]=f(r[t],n.name,e);else if(null==e)for(t in r)r[t]=f(r[t],n.name,null);return this}for(;++a<u;)if((t=(n=l[a]).type)&&(t=i(r[t],n.name)))return t},copy:function(){var n={},e=this._;for(var t in e)n[t]=e[t].slice();return new r(n)},call:function(n,e){if((t=arguments.length-2)>0)for(var t,r,o=new Array(t),i=0;i<t;++i)o[i]=arguments[i+2];if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(i=0,t=(r=this._[n]).length;i<t;++i)r[i].value.apply(e,o)},apply:function(n,e,t){if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(var r=this._[n],o=0,i=r.length;o<i;++o)r[o].value.apply(e,t)}},n.dispatch=t,Object.defineProperty(n,"__esModule",{value:!0})}));

// https://d3js.org/d3-quadtree/ v3.0.1 Copyright 2010-2021 Mike Bostock
!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?i(exports):"function"==typeof define&&define.amd?define(["exports"],i):i((t="undefined"!=typeof globalThis?globalThis:t||self).d3=t.d3||{})}(this,(function(t){"use strict";function i(t,i,e,n){if(isNaN(i)||isNaN(e))return t;var r,s,h,o,a,u,l,_,f,c=t._root,x={data:n},y=t._x0,d=t._y0,p=t._x1,v=t._y1;if(!c)return t._root=x,t;for(;c.length;)if((u=i>=(s=(y+p)/2))?y=s:p=s,(l=e>=(h=(d+v)/2))?d=h:v=h,r=c,!(c=c[_=l<<1|u]))return r[_]=x,t;if(o=+t._x.call(null,c.data),a=+t._y.call(null,c.data),i===o&&e===a)return x.next=c,r?r[_]=x:t._root=x,t;do{r=r?r[_]=new Array(4):t._root=new Array(4),(u=i>=(s=(y+p)/2))?y=s:p=s,(l=e>=(h=(d+v)/2))?d=h:v=h}while((_=l<<1|u)==(f=(a>=h)<<1|o>=s));return r[f]=c,r[_]=x,t}function e(t,i,e,n,r){this.node=t,this.x0=i,this.y0=e,this.x1=n,this.y1=r}function n(t){return t[0]}function r(t){return t[1]}function s(t,i,e){var s=new h(null==i?n:i,null==e?r:e,NaN,NaN,NaN,NaN);return null==t?s:s.addAll(t)}function h(t,i,e,n,r,s){this._x=t,this._y=i,this._x0=e,this._y0=n,this._x1=r,this._y1=s,this._root=void 0}function o(t){for(var i={data:t.data},e=i;t=t.next;)e=e.next={data:t.data};return i}var a=s.prototype=h.prototype;a.copy=function(){var t,i,e=new h(this._x,this._y,this._x0,this._y0,this._x1,this._y1),n=this._root;if(!n)return e;if(!n.length)return e._root=o(n),e;for(t=[{source:n,target:e._root=new Array(4)}];n=t.pop();)for(var r=0;r<4;++r)(i=n.source[r])&&(i.length?t.push({source:i,target:n.target[r]=new Array(4)}):n.target[r]=o(i));return e},a.add=function(t){const e=+this._x.call(null,t),n=+this._y.call(null,t);return i(this.cover(e,n),e,n,t)},a.addAll=function(t){var e,n,r,s,h=t.length,o=new Array(h),a=new Array(h),u=1/0,l=1/0,_=-1/0,f=-1/0;for(n=0;n<h;++n)isNaN(r=+this._x.call(null,e=t[n]))||isNaN(s=+this._y.call(null,e))||(o[n]=r,a[n]=s,r<u&&(u=r),r>_&&(_=r),s<l&&(l=s),s>f&&(f=s));if(u>_||l>f)return this;for(this.cover(u,l).cover(_,f),n=0;n<h;++n)i(this,o[n],a[n],t[n]);return this},a.cover=function(t,i){if(isNaN(t=+t)||isNaN(i=+i))return this;var e=this._x0,n=this._y0,r=this._x1,s=this._y1;if(isNaN(e))r=(e=Math.floor(t))+1,s=(n=Math.floor(i))+1;else{for(var h,o,a=r-e||1,u=this._root;e>t||t>=r||n>i||i>=s;)switch(o=(i<n)<<1|t<e,(h=new Array(4))[o]=u,u=h,a*=2,o){case 0:r=e+a,s=n+a;break;case 1:e=r-a,s=n+a;break;case 2:r=e+a,n=s-a;break;case 3:e=r-a,n=s-a}this._root&&this._root.length&&(this._root=u)}return this._x0=e,this._y0=n,this._x1=r,this._y1=s,this},a.data=function(){var t=[];return this.visit((function(i){if(!i.length)do{t.push(i.data)}while(i=i.next)})),t},a.extent=function(t){return arguments.length?this.cover(+t[0][0],+t[0][1]).cover(+t[1][0],+t[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]},a.find=function(t,i,n){var r,s,h,o,a,u,l,_=this._x0,f=this._y0,c=this._x1,x=this._y1,y=[],d=this._root;for(d&&y.push(new e(d,_,f,c,x)),null==n?n=1/0:(_=t-n,f=i-n,c=t+n,x=i+n,n*=n);u=y.pop();)if(!(!(d=u.node)||(s=u.x0)>c||(h=u.y0)>x||(o=u.x1)<_||(a=u.y1)<f))if(d.length){var p=(s+o)/2,v=(h+a)/2;y.push(new e(d[3],p,v,o,a),new e(d[2],s,v,p,a),new e(d[1],p,h,o,v),new e(d[0],s,h,p,v)),(l=(i>=v)<<1|t>=p)&&(u=y[y.length-1],y[y.length-1]=y[y.length-1-l],y[y.length-1-l]=u)}else{var w=t-+this._x.call(null,d.data),N=i-+this._y.call(null,d.data),g=w*w+N*N;if(g<n){var A=Math.sqrt(n=g);_=t-A,f=i-A,c=t+A,x=i+A,r=d.data}}return r},a.remove=function(t){if(isNaN(s=+this._x.call(null,t))||isNaN(h=+this._y.call(null,t)))return this;var i,e,n,r,s,h,o,a,u,l,_,f,c=this._root,x=this._x0,y=this._y0,d=this._x1,p=this._y1;if(!c)return this;if(c.length)for(;;){if((u=s>=(o=(x+d)/2))?x=o:d=o,(l=h>=(a=(y+p)/2))?y=a:p=a,i=c,!(c=c[_=l<<1|u]))return this;if(!c.length)break;(i[_+1&3]||i[_+2&3]||i[_+3&3])&&(e=i,f=_)}for(;c.data!==t;)if(n=c,!(c=c.next))return this;return(r=c.next)&&delete c.next,n?(r?n.next=r:delete n.next,this):i?(r?i[_]=r:delete i[_],(c=i[0]||i[1]||i[2]||i[3])&&c===(i[3]||i[2]||i[1]||i[0])&&!c.length&&(e?e[f]=c:this._root=c),this):(this._root=r,this)},a.removeAll=function(t){for(var i=0,e=t.length;i<e;++i)this.remove(t[i]);return this},a.root=function(){return this._root},a.size=function(){var t=0;return this.visit((function(i){if(!i.length)do{++t}while(i=i.next)})),t},a.visit=function(t){var i,n,r,s,h,o,a=[],u=this._root;for(u&&a.push(new e(u,this._x0,this._y0,this._x1,this._y1));i=a.pop();)if(!t(u=i.node,r=i.x0,s=i.y0,h=i.x1,o=i.y1)&&u.length){var l=(r+h)/2,_=(s+o)/2;(n=u[3])&&a.push(new e(n,l,_,h,o)),(n=u[2])&&a.push(new e(n,r,_,l,o)),(n=u[1])&&a.push(new e(n,l,s,h,_)),(n=u[0])&&a.push(new e(n,r,s,l,_))}return this},a.visitAfter=function(t){var i,n=[],r=[];for(this._root&&n.push(new e(this._root,this._x0,this._y0,this._x1,this._y1));i=n.pop();){var s=i.node;if(s.length){var h,o=i.x0,a=i.y0,u=i.x1,l=i.y1,_=(o+u)/2,f=(a+l)/2;(h=s[0])&&n.push(new e(h,o,a,_,f)),(h=s[1])&&n.push(new e(h,_,a,u,f)),(h=s[2])&&n.push(new e(h,o,f,_,l)),(h=s[3])&&n.push(new e(h,_,f,u,l))}r.push(i)}for(;i=r.pop();)t(i.node,i.x0,i.y0,i.x1,i.y1);return this},a.x=function(t){return arguments.length?(this._x=t,this):this._x},a.y=function(t){return arguments.length?(this._y=t,this):this._y},t.quadtree=s,Object.defineProperty(t,"__esModule",{value:!0})}));

// https://d3js.org/d3-timer/ v3.0.1 Copyright 2010-2021 Mike Bostock
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((t="undefined"!=typeof globalThis?globalThis:t||self).d3=t.d3||{})}(this,(function(t){"use strict";var n,e,o=0,i=0,r=0,l=0,u=0,a=0,s="object"==typeof performance&&performance.now?performance:Date,c="object"==typeof window&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(t){setTimeout(t,17)};function f(){return u||(c(_),u=s.now()+a)}function _(){u=0}function m(){this._call=this._time=this._next=null}function p(t,n,e){var o=new m;return o.restart(t,n,e),o}function w(){f(),++o;for(var t,e=n;e;)(t=u-e._time)>=0&&e._call.call(void 0,t),e=e._next;--o}function d(){u=(l=s.now())+a,o=i=0;try{w()}finally{o=0,function(){var t,o,i=n,r=1/0;for(;i;)i._call?(r>i._time&&(r=i._time),t=i,i=i._next):(o=i._next,i._next=null,i=t?t._next=o:n=o);e=t,y(r)}(),u=0}}function h(){var t=s.now(),n=t-l;n>1e3&&(a-=n,l=t)}function y(t){o||(i&&(i=clearTimeout(i)),t-u>24?(t<1/0&&(i=setTimeout(d,t-s.now()-a)),r&&(r=clearInterval(r))):(r||(l=s.now(),r=setInterval(h,1e3)),o=1,c(d)))}m.prototype=p.prototype={constructor:m,restart:function(t,o,i){if("function"!=typeof t)throw new TypeError("callback is not a function");i=(null==i?f():+i)+(null==o?0:+o),this._next||e===this||(e?e._next=this:n=this,e=this),this._call=t,this._time=i,y()},stop:function(){this._call&&(this._call=null,this._time=1/0,y())}},t.interval=function(t,n,e){var o=new m,i=n;return null==n?(o.restart(t,n,e),o):(o._restart=o.restart,o.restart=function(t,n,e){n=+n,e=null==e?f():+e,o._restart((function r(l){l+=i,o._restart(r,i+=n,e),t(l)}),n,e)},o.restart(t,n,e),o)},t.now=f,t.timeout=function(t,n,e){var o=new m;return n=null==n?0:+n,o.restart((e=>{o.stop(),t(e+n)}),n,e),o},t.timer=p,t.timerFlush=w,Object.defineProperty(t,"__esModule",{value:!0})}));

// https://d3js.org/d3-force/ v3.0.0 Copyright 2010-2021 Mike Bostock
!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("d3-quadtree"),require("d3-dispatch"),require("d3-timer")):"function"==typeof define&&define.amd?define(["exports","d3-quadtree","d3-dispatch","d3-timer"],t):t((n="undefined"!=typeof globalThis?globalThis:n||self).d3=n.d3||{},n.d3,n.d3,n.d3)}(this,(function(n,t,e,r){"use strict";function i(n){return function(){return n}}function u(n){return 1e-6*(n()-.5)}function o(n){return n.x+n.vx}function f(n){return n.y+n.vy}function a(n){return n.index}function c(n,t){var e=n.get(t);if(!e)throw new Error("node not found: "+t);return e}const l=4294967296;function h(n){return n.x}function v(n){return n.y}var y=Math.PI*(3-Math.sqrt(5));n.forceCenter=function(n,t){var e,r=1;function i(){var i,u,o=e.length,f=0,a=0;for(i=0;i<o;++i)f+=(u=e[i]).x,a+=u.y;for(f=(f/o-n)*r,a=(a/o-t)*r,i=0;i<o;++i)(u=e[i]).x-=f,u.y-=a}return null==n&&(n=0),null==t&&(t=0),i.initialize=function(n){e=n},i.x=function(t){return arguments.length?(n=+t,i):n},i.y=function(n){return arguments.length?(t=+n,i):t},i.strength=function(n){return arguments.length?(r=+n,i):r},i},n.forceCollide=function(n){var e,r,a,c=1,l=1;function h(){for(var n,i,h,y,d,g,x,s=e.length,p=0;p<l;++p)for(i=t.quadtree(e,o,f).visitAfter(v),n=0;n<s;++n)h=e[n],g=r[h.index],x=g*g,y=h.x+h.vx,d=h.y+h.vy,i.visit(M);function M(n,t,e,r,i){var o=n.data,f=n.r,l=g+f;if(!o)return t>y+l||r<y-l||e>d+l||i<d-l;if(o.index>h.index){var v=y-o.x-o.vx,s=d-o.y-o.vy,p=v*v+s*s;p<l*l&&(0===v&&(p+=(v=u(a))*v),0===s&&(p+=(s=u(a))*s),p=(l-(p=Math.sqrt(p)))/p*c,h.vx+=(v*=p)*(l=(f*=f)/(x+f)),h.vy+=(s*=p)*l,o.vx-=v*(l=1-l),o.vy-=s*l)}}}function v(n){if(n.data)return n.r=r[n.data.index];for(var t=n.r=0;t<4;++t)n[t]&&n[t].r>n.r&&(n.r=n[t].r)}function y(){if(e){var t,i,u=e.length;for(r=new Array(u),t=0;t<u;++t)i=e[t],r[i.index]=+n(i,t,e)}}return"function"!=typeof n&&(n=i(null==n?1:+n)),h.initialize=function(n,t){e=n,a=t,y()},h.iterations=function(n){return arguments.length?(l=+n,h):l},h.strength=function(n){return arguments.length?(c=+n,h):c},h.radius=function(t){return arguments.length?(n="function"==typeof t?t:i(+t),y(),h):n},h},n.forceLink=function(n){var t,e,r,o,f,l,h=a,v=function(n){return 1/Math.min(o[n.source.index],o[n.target.index])},y=i(30),d=1;function g(r){for(var i=0,o=n.length;i<d;++i)for(var a,c,h,v,y,g,x,s=0;s<o;++s)c=(a=n[s]).source,v=(h=a.target).x+h.vx-c.x-c.vx||u(l),y=h.y+h.vy-c.y-c.vy||u(l),v*=g=((g=Math.sqrt(v*v+y*y))-e[s])/g*r*t[s],y*=g,h.vx-=v*(x=f[s]),h.vy-=y*x,c.vx+=v*(x=1-x),c.vy+=y*x}function x(){if(r){var i,u,a=r.length,l=n.length,v=new Map(r.map(((n,t)=>[h(n,t,r),n])));for(i=0,o=new Array(a);i<l;++i)(u=n[i]).index=i,"object"!=typeof u.source&&(u.source=c(v,u.source)),"object"!=typeof u.target&&(u.target=c(v,u.target)),o[u.source.index]=(o[u.source.index]||0)+1,o[u.target.index]=(o[u.target.index]||0)+1;for(i=0,f=new Array(l);i<l;++i)u=n[i],f[i]=o[u.source.index]/(o[u.source.index]+o[u.target.index]);t=new Array(l),s(),e=new Array(l),p()}}function s(){if(r)for(var e=0,i=n.length;e<i;++e)t[e]=+v(n[e],e,n)}function p(){if(r)for(var t=0,i=n.length;t<i;++t)e[t]=+y(n[t],t,n)}return null==n&&(n=[]),g.initialize=function(n,t){r=n,l=t,x()},g.links=function(t){return arguments.length?(n=t,x(),g):n},g.id=function(n){return arguments.length?(h=n,g):h},g.iterations=function(n){return arguments.length?(d=+n,g):d},g.strength=function(n){return arguments.length?(v="function"==typeof n?n:i(+n),s(),g):v},g.distance=function(n){return arguments.length?(y="function"==typeof n?n:i(+n),p(),g):y},g},n.forceManyBody=function(){var n,e,r,o,f,a=i(-30),c=1,l=1/0,y=.81;function d(r){var i,u=n.length,f=t.quadtree(n,h,v).visitAfter(x);for(o=r,i=0;i<u;++i)e=n[i],f.visit(s)}function g(){if(n){var t,e,r=n.length;for(f=new Array(r),t=0;t<r;++t)e=n[t],f[e.index]=+a(e,t,n)}}function x(n){var t,e,r,i,u,o=0,a=0;if(n.length){for(r=i=u=0;u<4;++u)(t=n[u])&&(e=Math.abs(t.value))&&(o+=t.value,a+=e,r+=e*t.x,i+=e*t.y);n.x=r/a,n.y=i/a}else{(t=n).x=t.data.x,t.y=t.data.y;do{o+=f[t.data.index]}while(t=t.next)}n.value=o}function s(n,t,i,a){if(!n.value)return!0;var h=n.x-e.x,v=n.y-e.y,d=a-t,g=h*h+v*v;if(d*d/y<g)return g<l&&(0===h&&(g+=(h=u(r))*h),0===v&&(g+=(v=u(r))*v),g<c&&(g=Math.sqrt(c*g)),e.vx+=h*n.value*o/g,e.vy+=v*n.value*o/g),!0;if(!(n.length||g>=l)){(n.data!==e||n.next)&&(0===h&&(g+=(h=u(r))*h),0===v&&(g+=(v=u(r))*v),g<c&&(g=Math.sqrt(c*g)));do{n.data!==e&&(d=f[n.data.index]*o/g,e.vx+=h*d,e.vy+=v*d)}while(n=n.next)}}return d.initialize=function(t,e){n=t,r=e,g()},d.strength=function(n){return arguments.length?(a="function"==typeof n?n:i(+n),g(),d):a},d.distanceMin=function(n){return arguments.length?(c=n*n,d):Math.sqrt(c)},d.distanceMax=function(n){return arguments.length?(l=n*n,d):Math.sqrt(l)},d.theta=function(n){return arguments.length?(y=n*n,d):Math.sqrt(y)},d},n.forceRadial=function(n,t,e){var r,u,o,f=i(.1);function a(n){for(var i=0,f=r.length;i<f;++i){var a=r[i],c=a.x-t||1e-6,l=a.y-e||1e-6,h=Math.sqrt(c*c+l*l),v=(o[i]-h)*u[i]*n/h;a.vx+=c*v,a.vy+=l*v}}function c(){if(r){var t,e=r.length;for(u=new Array(e),o=new Array(e),t=0;t<e;++t)o[t]=+n(r[t],t,r),u[t]=isNaN(o[t])?0:+f(r[t],t,r)}}return"function"!=typeof n&&(n=i(+n)),null==t&&(t=0),null==e&&(e=0),a.initialize=function(n){r=n,c()},a.strength=function(n){return arguments.length?(f="function"==typeof n?n:i(+n),c(),a):f},a.radius=function(t){return arguments.length?(n="function"==typeof t?t:i(+t),c(),a):n},a.x=function(n){return arguments.length?(t=+n,a):t},a.y=function(n){return arguments.length?(e=+n,a):e},a},n.forceSimulation=function(n){var t,i=1,u=.001,o=1-Math.pow(u,1/300),f=0,a=.6,c=new Map,h=r.timer(g),v=e.dispatch("tick","end"),d=function(){let n=1;return()=>(n=(1664525*n+1013904223)%l)/l}();function g(){x(),v.call("tick",t),i<u&&(h.stop(),v.call("end",t))}function x(e){var r,u,l=n.length;void 0===e&&(e=1);for(var h=0;h<e;++h)for(i+=(f-i)*o,c.forEach((function(n){n(i)})),r=0;r<l;++r)null==(u=n[r]).fx?u.x+=u.vx*=a:(u.x=u.fx,u.vx=0),null==u.fy?u.y+=u.vy*=a:(u.y=u.fy,u.vy=0);return t}function s(){for(var t,e=0,r=n.length;e<r;++e){if((t=n[e]).index=e,null!=t.fx&&(t.x=t.fx),null!=t.fy&&(t.y=t.fy),isNaN(t.x)||isNaN(t.y)){var i=10*Math.sqrt(.5+e),u=e*y;t.x=i*Math.cos(u),t.y=i*Math.sin(u)}(isNaN(t.vx)||isNaN(t.vy))&&(t.vx=t.vy=0)}}function p(t){return t.initialize&&t.initialize(n,d),t}return null==n&&(n=[]),s(),t={tick:x,restart:function(){return h.restart(g),t},stop:function(){return h.stop(),t},nodes:function(e){return arguments.length?(n=e,s(),c.forEach(p),t):n},alpha:function(n){return arguments.length?(i=+n,t):i},alphaMin:function(n){return arguments.length?(u=+n,t):u},alphaDecay:function(n){return arguments.length?(o=+n,t):+o},alphaTarget:function(n){return arguments.length?(f=+n,t):f},velocityDecay:function(n){return arguments.length?(a=1-n,t):1-a},randomSource:function(n){return arguments.length?(d=n,c.forEach(p),t):d},force:function(n,e){return arguments.length>1?(null==e?c.delete(n):c.set(n,p(e)),t):c.get(n)},find:function(t,e,r){var i,u,o,f,a,c=0,l=n.length;for(null==r?r=1/0:r*=r,c=0;c<l;++c)(o=(i=t-(f=n[c]).x)*i+(u=e-f.y)*u)<r&&(a=f,r=o);return a},on:function(n,e){return arguments.length>1?(v.on(n,e),t):v.on(n)}}},n.forceX=function(n){var t,e,r,u=i(.1);function o(n){for(var i,u=0,o=t.length;u<o;++u)(i=t[u]).vx+=(r[u]-i.x)*e[u]*n}function f(){if(t){var i,o=t.length;for(e=new Array(o),r=new Array(o),i=0;i<o;++i)e[i]=isNaN(r[i]=+n(t[i],i,t))?0:+u(t[i],i,t)}}return"function"!=typeof n&&(n=i(null==n?0:+n)),o.initialize=function(n){t=n,f()},o.strength=function(n){return arguments.length?(u="function"==typeof n?n:i(+n),f(),o):u},o.x=function(t){return arguments.length?(n="function"==typeof t?t:i(+t),f(),o):n},o},n.forceY=function(n){var t,e,r,u=i(.1);function o(n){for(var i,u=0,o=t.length;u<o;++u)(i=t[u]).vy+=(r[u]-i.y)*e[u]*n}function f(){if(t){var i,o=t.length;for(e=new Array(o),r=new Array(o),i=0;i<o;++i)e[i]=isNaN(r[i]=+n(t[i],i,t))?0:+u(t[i],i,t)}}return"function"!=typeof n&&(n=i(null==n?0:+n)),o.initialize=function(n){t=n,f()},o.strength=function(n){return arguments.length?(u="function"==typeof n?n:i(+n),f(),o):u},o.y=function(t){return arguments.length?(n="function"==typeof t?t:i(+t),f(),o):n},o},Object.defineProperty(n,"__esModule",{value:!0})}));

  })(library, undefined, undefined, undefined);
  const d3 = library.d3;
  const icons = [{"name":"team-01-apuchika.svg","svg":"\u003c?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n\u003csvg xmlns=\"http://www.w3.org/2000/svg\" id=\"team-01-apuchika\" viewBox=\"-14 -14 268 268\" role=\"img\" aria-labelledby=\"team-01-apuchika-title\">\r\n  \u003ctitle id=\"team-01-apuchika-title\">Apuchika animated icon\u003c/title>\r\n  \u003cstyle>\r\n    #team-01-apuchika .icon-layer {\r\n      transform-box: view-box;\r\n      transform-origin: 120px 120px;\r\n      animation: team-01-apuchika-enter 700ms cubic-bezier(.22, 1, .36, 1) both;\r\n    }\r\n    #team-01-apuchika .layer-1 { animation-delay: 120ms; }\r\n    #team-01-apuchika .layer-2 { animation-delay: 500ms; }\r\n    #team-01-apuchika .layer-3 { animation-delay: 880ms; }\r\n    @keyframes team-01-apuchika-enter {\r\n      0% { transform: scale(0); animation-timing-function: ease-in-out; }\r\n      50% { transform: scale(1.11); animation-timing-function: ease-in-out; }\r\n      70% { transform: scale(.96); animation-timing-function: ease-out; }\r\n      100% { transform: scale(1); }\r\n    }\r\n    @media (prefers-reduced-motion: reduce) {\r\n      #team-01-apuchika .icon-layer { animation: none; }\r\n    }\r\n  \u003c/style>\r\n  \u003cg id=\"team-01-apuchika-layer-1\" class=\"icon-layer layer-1\">\r\n    \u003cpath d=\"M133.33,106.67V0h106.67v40h-66.67v26.67h66.67v40h-106.67ZM133.33,240v-106.67h106.67v40h-66.67v26.67h66.67v40h-106.67ZM106.67,0v106.67H0v-40h66.67v-26.67H0V0h106.67ZM106.67,133.33v106.67H0v-40h66.67v-26.67H0v-40h106.67Z\" fill=\"#ffce07\">\u003c/path>\r\n  \u003c/g>\r\n  \u003cg id=\"team-01-apuchika-layer-2\" class=\"icon-layer layer-2\">\r\n    \u003cpath d=\"M159.57,62.27v-24.19l17.3-17.3h24.19l17.3,17.3v24.19l-17.3,17.3h-24.19l-17.3-17.3ZM176.87,217.86l-17.3-17.3v-24.19l17.3-17.3h24.19l17.3,17.3v24.19l-17.3,17.3h-24.19ZM90.44,131.43v-24.22l17.27-17.27h24.22l17.27,17.27v24.22l-17.27,17.27h-24.22l-17.27-17.27ZM21.28,62.27v-24.19l17.3-17.3h24.19l17.3,17.3v24.19l-17.3,17.3h-24.19l-17.3-17.3ZM38.58,217.86l-17.3-17.3v-24.19l17.3-17.3h24.19l17.3,17.3v24.19l-17.3,17.3h-24.19Z\" fill=\"#00aaff\">\u003c/path>\r\n  \u003c/g>\r\n  \u003cg id=\"team-01-apuchika-layer-3\" class=\"icon-layer layer-3\">\r\n    \u003cpath d=\"M214.99,133.31h-55.09l-13.31-13.31,13.31-13.31h55.09l13.31,13.31-13.31,13.31ZM120,139.01l-19.01-19.01,19.01-19.01,19.01,19.01-19.01,19.01ZM106.69,214.99v-55.09l13.31-13.31,13.31,13.31v55.09l-13.31,13.31-13.31-13.31ZM133.31,80.1l-13.31,13.31-13.31-13.31V25.01l13.31-13.31,13.31,13.31v55.09ZM80.1,106.69l13.31,13.31-13.31,13.31H25.01l-13.31-13.31,13.31-13.31h55.09Z\" fill=\"#ccebf5\">\u003c/path>\r\n  \u003c/g>\r\n\u003c/svg>\r\n"},{"name":"team-02-ommix.svg","svg":"\u003c?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n\u003csvg xmlns=\"http://www.w3.org/2000/svg\" id=\"team-02-ommix\" viewBox=\"-14 -14 268 268\" role=\"img\" aria-labelledby=\"team-02-ommix-title\">\r\n  \u003ctitle id=\"team-02-ommix-title\">Ommix animated icon\u003c/title>\r\n  \u003cstyle>\r\n    #team-02-ommix .icon-layer {\r\n      transform-box: view-box;\r\n      transform-origin: 120px 120px;\r\n      animation: team-02-ommix-enter 700ms cubic-bezier(.22, 1, .36, 1) both;\r\n    }\r\n    #team-02-ommix .layer-1 { animation-delay: 120ms; }\r\n    #team-02-ommix .layer-2 { animation-delay: 500ms; }\r\n    #team-02-ommix .layer-3 { animation-delay: 880ms; }\r\n    @keyframes team-02-ommix-enter {\r\n      0% { transform: scale(0); animation-timing-function: ease-in-out; }\r\n      50% { transform: scale(1.11); animation-timing-function: ease-in-out; }\r\n      70% { transform: scale(.96); animation-timing-function: ease-out; }\r\n      100% { transform: scale(1); }\r\n    }\r\n    @media (prefers-reduced-motion: reduce) {\r\n      #team-02-ommix .icon-layer { animation: none; }\r\n    }\r\n  \u003c/style>\r\n  \u003cg id=\"team-02-ommix-layer-1\" class=\"icon-layer layer-1\">\r\n    \u003cpath d=\"M10.63,46.9l5.01-6.97,4.66-5.72,99.7,85.8L20.3,205.8l-4.66-5.72-5.01-6.97-4.55-7.32-4.05-7.61-2.03-4.44,6.51-2.7,3.27-1.74,6.19-4.16,5.58-4.91,4.91-5.58,2.17-3.02,1.99-3.16,3.27-6.68,2.38-7.04.85-3.63,1-7.36v-7.47l-1-7.36-.85-3.63-2.38-7.04-3.27-6.68-4.16-6.19-4.91-5.58-5.58-4.91-6.19-4.16-3.27-1.74-6.51-2.7,2.03-4.44,4.05-7.61,4.55-7.32ZM120,120L34.2,20.3l5.72-4.66,6.97-5.01,7.32-4.55,7.61-4.05,4.44-2.03,2.7,6.51,1.74,3.27,4.16,6.19,2.35,2.88,5.26,5.26,5.9,4.52,6.44,3.73,3.41,1.53,7.04,2.38,3.63.85,7.36,1h7.47l7.36-1,7.18-1.92,6.9-2.84,3.27-1.74,6.19-4.16,5.58-4.91,4.91-5.58,4.16-6.19,1.74-3.27,2.7-6.51,4.44,2.03,7.61,4.05,7.32,4.55,6.97,5.01,5.72,4.66-85.8,99.7,99.7-85.8,4.66,5.72,5.01,6.97,4.55,7.32,4.05,7.61,2.03,4.44-6.51,2.7-3.27,1.74-6.19,4.16-2.88,2.35-5.26,5.26-4.52,5.9-3.73,6.44-1.53,3.41-2.38,7.04-.85,3.63-1,7.36v7.47l1,7.36,1.92,7.18,1.32,3.48,3.27,6.68,4.16,6.19,4.91,5.58,5.58,4.91,6.19,4.16,3.27,1.74,6.51,2.7-2.03,4.44-4.05,7.61-4.55,7.32-5.01,6.97-4.66,5.72-99.7-85.8,85.8,99.7-5.72,4.66-6.97,5.01-7.32,4.55-7.61,4.05-4.44,2.03-2.7-6.51-1.74-3.27-4.16-6.19-4.91-5.58-2.7-2.56-5.9-4.52-3.16-1.99-6.68-3.27-7.04-2.38-3.63-.85-7.36-1h-7.47l-7.36,1-7.18,1.92-3.48,1.32-6.68,3.27-6.19,4.16-5.58,4.91-4.91,5.58-4.16,6.19-1.74,3.27-2.7,6.51-4.44-2.03-7.61-4.05-7.32-4.55-6.97-5.01-5.72-4.66,85.8-99.7Z\" fill=\"#7f1616\">\u003c/path>\r\n  \u003c/g>\r\n  \u003cg id=\"team-02-ommix-layer-2\" class=\"icon-layer layer-2\">\r\n    \u003cpath d=\"M153.33,26.67V0h86.67v86.67h-26.67V26.67h-60ZM153.33,240v-26.67h60v-60h26.67v86.67h-86.67ZM153.33,63.33v-20h43.33v43.33h-20v-23.33h-23.33ZM153.33,196.67v-20h23.33v-23.33h20v43.33h-43.33ZM0,153.33h26.67v60h60v26.67H0v-86.67ZM26.67,86.67H0V0h86.67v26.67H26.67v60ZM43.33,153.33h20v23.33h23.33v20h-43.33v-43.33ZM63.33,86.67h-20v-43.33h43.33v20h-23.33v23.33Z\" fill=\"#c4272f\">\u003c/path>\r\n  \u003c/g>\r\n  \u003cg id=\"team-02-ommix-layer-3\" class=\"icon-layer layer-3\">\r\n    \u003cpath d=\"M240,120l-30.56,30.53-30.53-30.53,30.53-30.53,30.56,30.53ZM82.92,135.28v-30.56l21.79-21.79h30.56l21.79,21.79v30.56l-21.79,21.79h-30.56l-21.79-21.79ZM120,61.1l-30.53-30.53L120,0l30.53,30.56-30.53,30.53ZM150.53,209.44l-30.53,30.56-30.53-30.56,30.53-30.53,30.53,30.53ZM30.56,150.53L0,120l30.56-30.53,30.53,30.53-30.53,30.53Z\" fill=\"#ffc5c8\">\u003c/path>\r\n  \u003c/g>\r\n\u003c/svg>\r\n"},{"name":"team-03-phishing-ttuk.svg","svg":"\u003c?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n\u003csvg xmlns=\"http://www.w3.org/2000/svg\" id=\"team-03-phishing-ttuk\" viewBox=\"-14 -14 268 268\" role=\"img\" aria-labelledby=\"team-03-phishing-ttuk-title\">\r\n  \u003ctitle id=\"team-03-phishing-ttuk-title\">Phishing Ttuk animated icon\u003c/title>\r\n  \u003cstyle>\r\n    #team-03-phishing-ttuk .icon-layer {\r\n      transform-box: view-box;\r\n      transform-origin: 120px 120px;\r\n      animation: team-03-phishing-ttuk-enter 700ms cubic-bezier(.22, 1, .36, 1) both;\r\n    }\r\n    #team-03-phishing-ttuk .layer-1 { animation-delay: 120ms; }\r\n    #team-03-phishing-ttuk .layer-2 { animation-delay: 500ms; }\r\n    #team-03-phishing-ttuk .layer-3 { animation-delay: 880ms; }\r\n    @keyframes team-03-phishing-ttuk-enter {\r\n      0% { transform: scale(0); animation-timing-function: ease-in-out; }\r\n      50% { transform: scale(1.11); animation-timing-function: ease-in-out; }\r\n      70% { transform: scale(.96); animation-timing-function: ease-out; }\r\n      100% { transform: scale(1); }\r\n    }\r\n    @media (prefers-reduced-motion: reduce) {\r\n      #team-03-phishing-ttuk .icon-layer { animation: none; }\r\n    }\r\n  \u003c/style>\r\n  \u003cg id=\"team-03-phishing-ttuk-layer-1\" class=\"icon-layer layer-1\">\r\n    \u003cpath d=\"M-.22-.05h120L-.22,119.95V-.05ZM-.22,119.95l120,120,120-120L119.78-.05h120v240H-.22v-120Z\" fill=\"#f2f070\">\u003c/path>\r\n  \u003c/g>\r\n  \u003cg id=\"team-03-phishing-ttuk-layer-2\" class=\"icon-layer layer-2\">\r\n    \u003cpath d=\"M127.82,239.42c-11.17.29-24.5.07-37.02-3.38l-.14-39.9c0-.58.82-1.54.39-2.55-.45-1.05-2.12-1.08-2.71-.16l-1.4,2.18-27.29,27.56c-17.98-10.36-32.02-24.86-42.67-42.62l29.83-30.25-42.63-.51c-4.91-20.02-5.03-40.34.04-59.96l42.82-.46-29.97-30.57c10.56-17.82,24.8-31.85,42.57-42.56l30.66,30.52.25-43.23c19.79-5.1,40.03-5.06,59.83.03l.14,43.46,30.97-30.75c17.48,10.61,31.85,24.8,42.38,42.5l-29.78,30.41,42.58.61c5.16,19.69,4.91,39.94.05,60.05l-42.46.44c9.71,10.68,19.1,19.49,29.62,29.87-9.83,17.85-24.56,32.39-42.46,42.97l-30.62-30.2-.39,42.78c-6.55,2.14-13.28,3.49-19.64,3.57M90.64,149.62l-.02-59.69,59.65-.05.34,60.11,41.24-.37-28.61-29.84,28.92-29.62-41.7-.43-.37-41.55-29.89,29.13-29.34-28.93-.35,41.52-42.55.38,29.88,29.71-29.55,29.83,41.95.33c.21-.24.43-.39.39-.52ZM91.87,150.04c-.31.54-.71.93-1.24,1.24l.15,40.67,29.69-29.58,29.55,28.9.26-41.3-58.42.05Z\" fill=\"#eec35a\">\u003c/path>\r\n  \u003c/g>\r\n  \u003cg id=\"team-03-phishing-ttuk-layer-3\" class=\"icon-layer layer-3\">\r\n    \u003cpath d=\"M120,240L0,120,120,0l120,120-120,120ZM120,200l80-80L120,40,40,120l80,80ZM86.67,120l33.33-33.33,33.33,33.33-33.33,33.33-33.33-33.33Z\" fill=\"#e5903a\">\u003c/path>\r\n  \u003c/g>\r\n\u003c/svg>\r\n"},{"name":"team-04-ilkko.svg","svg":"\u003c?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n\u003csvg xmlns=\"http://www.w3.org/2000/svg\" id=\"team-04-ilkko\" viewBox=\"-14 -14 268 268\" role=\"img\" aria-labelledby=\"team-04-ilkko-title\">\r\n  \u003ctitle id=\"team-04-ilkko-title\">Ilkko animated icon\u003c/title>\r\n  \u003cstyle>\r\n    #team-04-ilkko .icon-layer {\r\n      transform-box: view-box;\r\n      transform-origin: 120px 120px;\r\n      animation: team-04-ilkko-enter 700ms cubic-bezier(.22, 1, .36, 1) both;\r\n    }\r\n    #team-04-ilkko .layer-1 { animation-delay: 120ms; }\r\n    #team-04-ilkko .layer-2 { animation-delay: 500ms; }\r\n    #team-04-ilkko .layer-3 { animation-delay: 880ms; }\r\n    @keyframes team-04-ilkko-enter {\r\n      0% { transform: scale(0); animation-timing-function: ease-in-out; }\r\n      50% { transform: scale(1.11); animation-timing-function: ease-in-out; }\r\n      70% { transform: scale(.96); animation-timing-function: ease-out; }\r\n      100% { transform: scale(1); }\r\n    }\r\n    @media (prefers-reduced-motion: reduce) {\r\n      #team-04-ilkko .icon-layer { animation: none; }\r\n    }\r\n  \u003c/style>\r\n  \u003cg id=\"team-04-ilkko-layer-1\" class=\"icon-layer layer-1\">\r\n    \u003cpath d=\"M185.28,54.89V0H54.89v54.89H0v130.4h54.89v54.72h130.4v-54.72h54.72V54.89h-54.72ZM174.65,65.35v109.29h-109.29v-109.29h109.29Z\" fill=\"#f6ffe3\">\u003c/path>\r\n    \u003crect x=\"11.18\" y=\"11.1\" width=\"32.76\" height=\"32.76\" transform=\"translate(-11.36 27.54) rotate(-45)\" fill=\"#f6ffe3\">\u003c/rect>\r\n    \u003crect x=\"196.32\" y=\"11.1\" width=\"32.76\" height=\"32.76\" transform=\"translate(42.87 158.45) rotate(-45)\" fill=\"#f6ffe3\">\u003c/rect>\r\n    \u003crect x=\"11.18\" y=\"196.15\" width=\"32.76\" height=\"32.76\" transform=\"translate(-142.21 81.74) rotate(-45)\" fill=\"#f6ffe3\">\u003c/rect>\r\n    \u003crect x=\"196.32\" y=\"196.15\" width=\"32.76\" height=\"32.76\" transform=\"translate(-87.99 212.65) rotate(-45)\" fill=\"#f6ffe3\">\u003c/rect>\r\n  \u003c/g>\r\n  \u003cg id=\"team-04-ilkko-layer-2\" class=\"icon-layer layer-2\">\r\n    \u003cpath d=\"M30,30.04h29.99V.04H.01v60h29.99v-30ZM89.99,30.04v30h59.98v-30L119.98.04l-29.99,30ZM30,150.04h29.99v-60h-29.99L.01,120.04l29.99,30ZM59.99,210.04h-29.99v-30H.01v60h59.98v-30ZM89.99,210.04l29.99,30,29.99-30v-30h-59.98v30ZM179.96,30.04h29.99v30h29.99V.04h-59.98v30ZM179.96,90.04v60h29.99l29.99-30-29.99-30h-29.99ZM179.96,210.04v30h59.98v-60h-29.99v30h-29.99Z\" fill=\"#f59000\" fill-rule=\"evenodd\">\u003c/path>\r\n  \u003c/g>\r\n  \u003cg id=\"team-04-ilkko-layer-3\" class=\"icon-layer layer-3\">\r\n    \u003cpolygon points=\"161.09 234.7 216.33 219.04 119.82 193.15 161.09 234.7\" fill=\"#ffd834\">\u003c/polygon>\r\n    \u003cpolygon points=\"4.49 160.72 19.99 217.35 45.59 120.81 4.49 160.72\" fill=\"#ffd834\">\u003c/polygon>\r\n    \u003cpolygon points=\"217.52 217.66 232.9 160.81 191.82 121.1 217.52 217.66\" fill=\"#ffd834\">\u003c/polygon>\r\n    \u003cpolygon points=\"77.29 234.57 117.69 193.21 21.01 219.23 77.29 234.57\" fill=\"#ffd834\">\u003c/polygon>\r\n    \u003cpolygon points=\"76.69 .83 21.45 16.49 117.96 42.38 76.69 .83\" fill=\"#ffd834\">\u003c/polygon>\r\n    \u003cpolygon points=\"233.29 74.81 217.79 18.18 192.2 114.72 233.29 74.81\" fill=\"#ffd834\">\u003c/polygon>\r\n    \u003cpolygon points=\"20.27 17.87 4.88 74.72 45.97 114.42 20.27 17.87\" fill=\"#ffd834\">\u003c/polygon>\r\n    \u003cpolygon points=\"160.49 .95 120.09 42.32 216.77 16.3 160.49 .95\" fill=\"#ffd834\">\u003c/polygon>\r\n    \u003crect x=\"70.52\" y=\"68.76\" width=\"96.77\" height=\"96.77\" transform=\"translate(-48.01 118.38) rotate(-45)\" fill=\"#ffd834\">\u003c/rect>\r\n  \u003c/g>\r\n\u003c/svg>\r\n"},{"name":"team-05-kuro.svg","svg":"\u003c?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n\u003csvg xmlns=\"http://www.w3.org/2000/svg\" id=\"team-05-kuro\" viewBox=\"-14 -14 268 268\" role=\"img\" aria-labelledby=\"team-05-kuro-title\">\r\n  \u003ctitle id=\"team-05-kuro-title\">Kuro animated icon\u003c/title>\r\n  \u003cstyle>\r\n    #team-05-kuro .icon-layer {\r\n      transform-box: view-box;\r\n      transform-origin: 120px 120px;\r\n      animation: team-05-kuro-enter 700ms cubic-bezier(.22, 1, .36, 1) both;\r\n    }\r\n    #team-05-kuro .layer-1 { animation-delay: 120ms; }\r\n    #team-05-kuro .layer-2 { animation-delay: 500ms; }\r\n    #team-05-kuro .layer-3 { animation-delay: 880ms; }\r\n    @keyframes team-05-kuro-enter {\r\n      0% { transform: scale(0); animation-timing-function: ease-in-out; }\r\n      50% { transform: scale(1.11); animation-timing-function: ease-in-out; }\r\n      70% { transform: scale(.96); animation-timing-function: ease-out; }\r\n      100% { transform: scale(1); }\r\n    }\r\n    @media (prefers-reduced-motion: reduce) {\r\n      #team-05-kuro .icon-layer { animation: none; }\r\n    }\r\n  \u003c/style>\r\n  \u003cg id=\"team-05-kuro-layer-1\" class=\"icon-layer layer-1\">\r\n    \u003cpath d=\"M150.51,221.71l26.55-26.55-26.55-26.52,18.21-18.21,26.52,26.55,26.55-26.55,18.21,18.21-26.55,26.52,26.55,26.55-18.21,18.21-26.55-26.55-26.52,26.55-18.21-18.21ZM195.24,62.86l-26.52,26.55-18.21-18.21,26.55-26.52-26.55-26.55L168.72-.08l26.52,26.55L221.8-.08l18.21,18.21-26.55,26.55,26.55,26.52-18.21,18.21-26.55-26.55ZM44.77,176.97l26.52-26.55,18.21,18.21-26.55,26.52,26.55,26.55-18.21,18.21-26.52-26.55-26.55,26.55L0,221.71l26.55-26.55L0,168.63l18.21-18.21,26.55,26.55ZM89.5,18.12l-26.55,26.55,26.55,26.52-18.21,18.21-26.52-26.55-26.55,26.55L0,71.2l26.55-26.52L0,18.12,18.21-.08l26.55,26.55L71.29-.08l18.21,18.21Z\" fill=\"#8bff6c\">\u003c/path>\r\n  \u003c/g>\r\n  \u003cg id=\"team-05-kuro-layer-2\" class=\"icon-layer layer-2\">\r\n    \u003cpath d=\"M119.99,7.85l-.25-7.85h28.3l.21,6.01.57,5.98.99,5.94,1.38,5.87,1.73,5.77,2.12,5.62,2.48,5.48,2.83,5.31,3.18,5.09,3.5,4.92,3.82,4.63,4.14,4.39,4.39,4.14,4.63,3.82,4.92,3.5,5.09,3.18,5.31,2.83,5.48,2.48,5.62,2.12,5.77,1.73,5.87,1.38,5.94.99,5.98.57,6.01.21v28.3l-7.85-.25-7.85-.78-7.75-1.27-7.68-1.8-7.53-2.26-7.36-2.79-7.18-3.25-6.93-3.71-6.68-4.14-6.4-4.6-6.08-4.99-5.73-5.38-5.38-5.73-4.99-6.08-4.6-6.4-4.14-6.68-3.71-6.93-3.25-7.18-2.79-7.36-2.26-7.53-1.8-7.68-1.27-7.75-.78-7.85ZM240,120.12v28.21l-5.99.21-5.96.56-5.92.99-5.85,1.38-5.75,1.73-5.61,2.12-5.47,2.47-5.29,2.82-5.08,3.17-4.9,3.49-4.62,3.81-4.37,4.13-4.13,4.37-3.81,4.62-3.49,4.9-3.17,5.08-2.82,5.29-2.47,5.47-2.12,5.61-1.73,5.75-1.38,5.85-.99,5.92-.56,5.96-.21,5.99h-28.21l.25-7.83.78-7.83,1.27-7.72,1.8-7.65,2.26-7.51,2.79-7.33,3.24-7.16,3.7-6.91,4.13-6.66,4.58-6.38,4.97-6.06,5.36-5.71,5.71-5.36,6.06-4.97,6.38-4.58,6.66-4.13,6.91-3.7,7.16-3.24,7.33-2.79,7.51-2.26,7.65-1.8,7.72-1.27,7.83-.78,7.83-.25ZM7.83,119.65l-7.83.25v-28.21l5.99-.21,5.96-.56,5.92-.99,5.85-1.38,5.75-1.73,5.61-2.12,5.47-2.47,5.29-2.82,5.08-3.17,4.9-3.49,4.62-3.81,4.37-4.13,4.13-4.37,3.81-4.62,3.49-4.9,3.17-5.08,2.82-5.29,2.47-5.47,2.12-5.61,1.73-5.75,1.38-5.85.99-5.92.56-5.96.21-5.99h28.21l-.25,7.83-.78,7.83-1.27,7.72-1.8,7.65-2.26,7.51-2.79,7.34-3.24,7.16-3.7,6.91-4.13,6.67-4.58,6.38-4.97,6.07-5.36,5.71-5.71,5.36-6.07,4.97-6.38,4.58-6.67,4.13-6.91,3.7-7.16,3.24-7.34,2.79-7.51,2.26-7.65,1.8-7.72,1.27-7.83.78ZM116.34,208.83l1.81,7.69,1.28,7.76.78,7.86.25,7.86h-28.34l-.21-6.02-.57-5.99-.99-5.95-1.38-5.88-1.74-5.77-2.13-5.63-2.48-5.49-2.83-5.31-3.19-5.1-3.51-4.92-3.83-4.64-4.14-4.39-4.39-4.14-4.64-3.83-4.92-3.51-5.1-3.19-5.31-2.83-5.49-2.48-5.63-2.13-5.77-1.74-5.88-1.38-5.95-.99-5.99-.57-6.02-.21v-28.34l7.86.25,7.86.78,7.76,1.28,7.69,1.81,7.55,2.27,7.37,2.8,7.19,3.26,6.94,3.72,6.7,4.14,6.41,4.61,6.09,4.99,5.74,5.38,5.38,5.74,4.99,6.09,4.61,6.41,4.14,6.7,3.72,6.94,3.26,7.19,2.8,7.37,2.27,7.55Z\" fill=\"#3f66b5\">\u003c/path>\r\n  \u003c/g>\r\n  \u003cg id=\"team-05-kuro-layer-3\" class=\"icon-layer layer-3\">\r\n    \u003cpath d=\"M225.26,134.66h-18.95l-14.72-14.75,14.72-14.75h18.95l14.75,14.75-14.75,14.75ZM120,183.07l-63.16-63.16,63.16-63.16,63.16,63.16-63.16,63.16ZM105.26,225.17v-18.95l14.75-14.72,14.75,14.72v18.95l-14.75,14.75-14.75-14.75ZM134.75,33.61l-14.75,14.72-14.75-14.72V14.66L120-.08l14.75,14.75v18.95ZM33.7,105.17l14.72,14.75-14.72,14.75H14.75L0,119.92l14.75-14.75h18.95Z\" fill=\"#bdffbf\">\u003c/path>\r\n  \u003c/g>\r\n\u003c/svg>\r\n"},{"name":"team-06-dadeullim.svg","svg":"\u003c?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n\u003csvg xmlns=\"http://www.w3.org/2000/svg\" id=\"team-06-dadeullim\" viewBox=\"-14 -14 268 268\" role=\"img\" aria-labelledby=\"team-06-dadeullim-title\">\r\n  \u003ctitle id=\"team-06-dadeullim-title\">Dadeullim animated icon\u003c/title>\r\n  \u003cstyle>\r\n    #team-06-dadeullim .icon-layer {\r\n      transform-box: view-box;\r\n      transform-origin: 120px 120px;\r\n      animation: team-06-dadeullim-enter 700ms cubic-bezier(.22, 1, .36, 1) both;\r\n    }\r\n    #team-06-dadeullim .layer-1 { animation-delay: 120ms; }\r\n    #team-06-dadeullim .layer-2 { animation-delay: 500ms; }\r\n    #team-06-dadeullim .layer-3 { animation-delay: 880ms; }\r\n    @keyframes team-06-dadeullim-enter {\r\n      0% { transform: scale(0); animation-timing-function: ease-in-out; }\r\n      50% { transform: scale(1.11); animation-timing-function: ease-in-out; }\r\n      70% { transform: scale(.96); animation-timing-function: ease-out; }\r\n      100% { transform: scale(1); }\r\n    }\r\n    @media (prefers-reduced-motion: reduce) {\r\n      #team-06-dadeullim .icon-layer { animation: none; }\r\n    }\r\n  \u003c/style>\r\n  \u003cg id=\"team-06-dadeullim-layer-1\" class=\"icon-layer layer-1\">\r\n    \u003cpath d=\"M240,0v40L200,0h40ZM240,240h-40l40-40v40ZM193.33,120l26.67,26.67-26.67,26.67-53.33-53.33,53.33-53.33,26.67,26.67-26.67,26.67ZM120,46.67l26.67-26.67,26.67,26.67-53.33,53.33-53.33-53.33,26.67-26.67,26.67,26.67ZM120,193.33l-26.67,26.67-26.67-26.67,53.33-53.33,53.33,53.33-26.67,26.67-26.67-26.67ZM46.67,120l-26.67-26.67,26.67-26.67,53.33,53.33-53.33,53.33-26.67-26.67,26.67-26.67ZM0,0h40L0,40V0ZM0,240v-40l40,40H0Z\" fill=\"#a8f0db\">\u003c/path>\r\n  \u003c/g>\r\n  \u003cg id=\"team-06-dadeullim-layer-2\" class=\"icon-layer layer-2\">\r\n    \u003cpath d=\"M135.76,239.71l-2.71.29v-36.19l3.49-.59,5.42-1.27,5.32-1.6,5.19-1.96,5.06-2.28,4.9-2.61,4.7-2.94,4.54-3.23,4.28-3.52,4.05-3.82,3.82-4.05,3.52-4.28,3.23-4.54,2.94-4.7,2.61-4.9,2.28-5.06,1.96-5.19,1.6-5.32,1.27-5.42.59-3.49h36.19l-.29,2.71-1.27,7.8-1.79,7.7-2.28,7.54-2.81,7.41-3.26,7.18-3.72,6.98-4.18,6.72-4.6,6.4-4.99,6.14-5.42,5.74-5.74,5.42-6.14,4.99-6.4,4.6-6.72,4.18-6.98,3.72-7.18,3.26-7.41,2.81-7.54,2.28-7.7,1.79-7.8,1.27ZM239.71,104.24l.29,2.71h-36.19l-.59-3.49-1.27-5.42-1.6-5.32-1.96-5.19-2.28-5.06-2.61-4.9-2.94-4.7-3.23-4.54-3.52-4.28-3.82-4.05-4.05-3.82-4.28-3.52-4.54-3.23-4.7-2.94-4.9-2.61-5.06-2.28-5.19-1.96-5.32-1.6-5.42-1.27-3.49-.59V0l2.71.29,7.8,1.27,7.7,1.79,7.54,2.28,7.41,2.81,7.18,3.26,6.98,3.72,6.72,4.18,6.4,4.6,6.14,4.99,5.74,5.42,5.42,5.74,4.99,6.14,4.6,6.4,4.18,6.72,3.72,6.98,3.26,7.18,2.81,7.41,2.28,7.54,1.79,7.7,1.27,7.8ZM104.24.29l2.71-.29v36.19l-3.49.59-5.42,1.27-5.32,1.6-5.19,1.96-5.06,2.28-4.9,2.61-4.7,2.94-4.54,3.23-4.28,3.52-4.05,3.82-3.82,4.05-3.52,4.28-3.23,4.54-2.94,4.7-2.61,4.9-2.28,5.06-1.96,5.19-1.6,5.32-1.27,5.42-.59,3.49H0l.29-2.71,1.27-7.8,1.79-7.7,2.28-7.54,2.81-7.41,3.26-7.18,3.72-6.98,4.18-6.72,4.6-6.4,4.99-6.14,5.42-5.74,5.74-5.42,6.14-4.99,6.4-4.6,6.72-4.18,6.98-3.72,7.18-3.26,7.41-2.81,7.54-2.28,7.7-1.79,7.8-1.27ZM.29,135.76l-.29-2.71h36.19l.59,3.49,1.27,5.42,1.6,5.32,1.96,5.19,2.28,5.06,2.61,4.9,2.94,4.7,3.23,4.54,3.52,4.28,3.82,4.05,4.05,3.82,4.28,3.52,4.54,3.23,4.7,2.94,4.9,2.61,5.06,2.28,5.19,1.96,5.32,1.6,5.42,1.27,3.49.59v36.19l-2.71-.29-7.8-1.27-7.7-1.79-7.54-2.28-7.41-2.81-7.18-3.26-6.98-3.72-6.72-4.18-6.4-4.6-6.14-4.99-5.74-5.42-5.42-5.74-4.99-6.14-4.6-6.4-4.18-6.72-3.72-6.98-3.26-7.18-2.81-7.41-2.28-7.54-1.79-7.7-1.27-7.8Z\" fill=\"#4ccad1\">\u003c/path>\r\n  \u003c/g>\r\n  \u003cg id=\"team-06-dadeullim-layer-3\" class=\"icon-layer layer-3\">\r\n    \u003cpath d=\"M190.62,161.45l16.88,16.88-29.17,29.17-16.88-16.88,29.17-29.17ZM207.5,61.67l-16.88,16.88-29.17-29.17,16.88-16.88,29.17,29.17ZM120,138.42l-18.42-18.42,18.42-18.42,18.42,18.42-18.42,18.42ZM32.5,61.67l29.17-29.17,16.88,16.88-29.17,29.17-16.88-16.88ZM32.5,178.33l16.88-16.88,29.17,29.17-16.88,16.88-29.17-29.17Z\" fill=\"#3b82a6\">\u003c/path>\r\n    \u003cpath d=\"M27.78,144.01H0v-48.02h27.78v48.02ZM95.99,240v-27.78h48.02v27.78s-48.02,0-48.02,0ZM104.84,104.84h30.32v30.32s-30.32,0-30.32,0v-30.32ZM240,95.99v48.02s-27.78,0-27.78,0v-48.02h27.78ZM144.01,0v27.78h-48.02V0h48.02Z\" fill=\"#3b82a6\">\u003c/path>\r\n  \u003c/g>\r\n\u003c/svg>\r\n"},{"name":"team-07-style-lens.svg","svg":"\u003c?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n\u003csvg xmlns=\"http://www.w3.org/2000/svg\" id=\"team-07-style-lens\" viewBox=\"-14 -14 268 268\" role=\"img\" aria-labelledby=\"team-07-style-lens-title\">\r\n  \u003ctitle id=\"team-07-style-lens-title\">Style Lens animated icon\u003c/title>\r\n  \u003cstyle>\r\n    #team-07-style-lens .icon-layer {\r\n      transform-box: view-box;\r\n      transform-origin: 120px 120px;\r\n      animation: team-07-style-lens-enter 700ms cubic-bezier(.22, 1, .36, 1) both;\r\n    }\r\n    #team-07-style-lens .layer-1 { animation-delay: 120ms; }\r\n    #team-07-style-lens .layer-2 { animation-delay: 500ms; }\r\n    @keyframes team-07-style-lens-enter {\r\n      0% { transform: scale(0); animation-timing-function: ease-in-out; }\r\n      50% { transform: scale(1.11); animation-timing-function: ease-in-out; }\r\n      70% { transform: scale(.96); animation-timing-function: ease-out; }\r\n      100% { transform: scale(1); }\r\n    }\r\n    @media (prefers-reduced-motion: reduce) {\r\n      #team-07-style-lens .icon-layer { animation: none; }\r\n    }\r\n  \u003c/style>\r\n  \u003cg id=\"team-07-style-lens-layer-1\" class=\"icon-layer layer-1\">\r\n    \u003cpath d=\"M119.27,104.35l.77,7.83.27,7.83.27-7.83.77-7.83,1.27-7.73,1.8-7.67,2.27-7.5,2.77-7.37,3.23-7.13,3.7-6.93,4.17-6.67,4.57-6.4,4.97-6.07,5.37-5.73,5.73-5.37,6.07-4.97,6.4-4.57,6.67-4.17,6.93-3.7,7.13-3.23,7.37-2.77,7.5-2.27,7.67-1.8,7.73-1.27,7.83-.77,7.83-.27v240l-7.83-.27-7.83-.77-7.73-1.27-7.67-1.8-7.5-2.27-7.37-2.77-7.13-3.23-6.93-3.7-6.67-4.17-6.4-4.57-6.07-4.97-5.73-5.37-5.37-5.73-4.97-6.07-4.57-6.4-4.17-6.67-3.7-6.93-3.23-7.13-2.77-7.37-2.27-7.5-1.8-7.67-1.27-7.73-.77-7.83-.27-7.83-.27,7.83-.77,7.83-1.27,7.73-1.8,7.67-2.27,7.5-2.77,7.37-3.23,7.13-3.7,6.93-4.17,6.67-4.57,6.4-4.97,6.07-5.37,5.73-5.73,5.37-6.07,4.97-6.4,4.57-6.67,4.17-6.93,3.7-7.13,3.23-7.37,2.77-7.5,2.27-7.67,1.8-7.73,1.27-7.83.77-7.83.27V.02l7.83.27,7.83.77,7.73,1.27,7.67,1.8,7.5,2.27,7.37,2.77,7.13,3.23,6.93,3.7,6.67,4.17,6.4,4.57,6.07,4.97,5.73,5.37,5.37,5.73,4.97,6.07,4.57,6.4,4.17,6.67,3.7,6.93,3.23,7.13,2.77,7.37,2.27,7.5,1.8,7.67,1.27,7.73Z\" fill=\"#d33bff\">\u003c/path>\r\n  \u003c/g>\r\n  \u003cg id=\"team-07-style-lens-layer-2\" class=\"icon-layer layer-2\">\r\n    \u003cpath d=\"M35.94,240.06c.13-43.47,37.43-78.68,83.43-78.68s83.31,35.2,83.43,78.68h36.57c-.13-62.57-53.8-113.25-120-113.25S-.5,177.5-.63,240.06h36.57Z\" fill=\"#e692ff\">\u003c/path>\r\n    \u003cpath d=\"M61.88,240.06h26.26c.13-16.21,14.06-29.31,31.24-29.31s31.11,13.1,31.24,29.31h26.26c-.13-29.92-25.82-54.14-57.49-54.14s-57.37,24.22-57.49,54.14Z\" fill=\"#e692ff\">\u003c/path>\r\n    \u003cpath d=\"M202.81.06c-.13,43.47-37.43,78.68-83.43,78.68S36.06,43.53,35.94.06H-.63c.13,62.57,53.8,113.25,120,113.25S239.25,62.63,239.37.06h-36.57Z\" fill=\"#e692ff\">\u003c/path>\r\n    \u003cpath d=\"M176.87.07h-26.26c-.13,16.21-14.06,29.31-31.24,29.31S88.27,16.28,88.14.07h-26.26c.13,29.92,25.82,54.14,57.49,54.14S176.74,29.99,176.87.07Z\" fill=\"#e692ff\">\u003c/path>\r\n  \u003c/g>\r\n\u003c/svg>\r\n"},{"name":"team-08-geuneuljabi.svg","svg":"\u003c?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n\u003csvg xmlns=\"http://www.w3.org/2000/svg\" id=\"team-08-geuneuljabi\" viewBox=\"-14 -14 268 268\" role=\"img\" aria-labelledby=\"team-08-geuneuljabi-title\">\r\n  \u003ctitle id=\"team-08-geuneuljabi-title\">Geuneuljabi animated icon\u003c/title>\r\n  \u003cstyle>\r\n    #team-08-geuneuljabi .icon-layer {\r\n      transform-box: view-box;\r\n      transform-origin: 120px 120px;\r\n      animation: team-08-geuneuljabi-enter 700ms cubic-bezier(.22, 1, .36, 1) both;\r\n    }\r\n    #team-08-geuneuljabi .layer-1 { animation-delay: 120ms; }\r\n    #team-08-geuneuljabi .layer-2 { animation-delay: 500ms; }\r\n    @keyframes team-08-geuneuljabi-enter {\r\n      0% { transform: scale(0); animation-timing-function: ease-in-out; }\r\n      50% { transform: scale(1.11); animation-timing-function: ease-in-out; }\r\n      70% { transform: scale(.96); animation-timing-function: ease-out; }\r\n      100% { transform: scale(1); }\r\n    }\r\n    @media (prefers-reduced-motion: reduce) {\r\n      #team-08-geuneuljabi .icon-layer { animation: none; }\r\n    }\r\n  \u003c/style>\r\n  \u003cg id=\"team-08-geuneuljabi-layer-1\" class=\"icon-layer layer-1\">\r\n    \u003cpath d=\"M160,80.01V0h80v80h-80ZM240,240.01h-80v-80h80v80ZM0,80.01V0h80v80H0ZM80,80.01h80v80h-80v-80ZM80,240.01H0v-80h80v80Z\" fill=\"#b5b5b5\">\u003c/path>\r\n  \u003c/g>\r\n  \u003cg id=\"team-08-geuneuljabi-layer-2\" class=\"icon-layer layer-2\">\r\n    \u003cpath d=\"M240,86.31v25.26h-88.42v-23.15h-23.15V0h25.26v86.31h86.31ZM240,128.43v25.26h-86.31v86.31h-25.26v-88.42h23.15v-23.15h88.42ZM98.94,141.06v-42.13h42.13v42.13h-42.13ZM0,86.31h86.31V0h25.26v88.42h-23.15v23.15H0v-25.26ZM86.31,153.69H0v-25.26h88.42v23.15h23.15v88.42h-25.26v-86.31Z\" fill=\"#ffffff\">\u003c/path>\r\n  \u003c/g>\r\n\u003c/svg>\r\n"},{"name":"team-09-magmoa.svg","svg":"\u003c?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n\u003csvg xmlns=\"http://www.w3.org/2000/svg\" id=\"team-09-magmoa\" viewBox=\"-14 -14 268 268\" role=\"img\" aria-labelledby=\"team-09-magmoa-title\">\r\n  \u003ctitle id=\"team-09-magmoa-title\">Magmoa animated icon\u003c/title>\r\n  \u003cstyle>\r\n    #team-09-magmoa .icon-layer {\r\n      transform-box: view-box;\r\n      transform-origin: 120px 120px;\r\n      animation: team-09-magmoa-enter 700ms cubic-bezier(.22, 1, .36, 1) both;\r\n    }\r\n    #team-09-magmoa .layer-1 { animation-delay: 120ms; }\r\n    #team-09-magmoa .layer-2 { animation-delay: 500ms; }\r\n    @keyframes team-09-magmoa-enter {\r\n      0% { transform: scale(0); animation-timing-function: ease-in-out; }\r\n      50% { transform: scale(1.11); animation-timing-function: ease-in-out; }\r\n      70% { transform: scale(.96); animation-timing-function: ease-out; }\r\n      100% { transform: scale(1); }\r\n    }\r\n    @media (prefers-reduced-motion: reduce) {\r\n      #team-09-magmoa .icon-layer { animation: none; }\r\n    }\r\n  \u003c/style>\r\n  \u003cg id=\"team-09-magmoa-layer-1\" class=\"icon-layer layer-1\">\r\n    \u003cpolygon points=\"117.34 68.5 67.06 17.22 16.13 68.38 67.4 118.43 66.86 68.43 117.34 68.5\" fill=\"#4df4ff\">\u003c/polygon>\r\n    \u003cpolygon points=\"117.96 170.13 168.66 119.44 117.34 68.5 67.4 118.43 15.94 170.09 66.83 221.24 117.42 170.52 66.82 170.16 67.05 119.58 117.96 170.13\" fill=\"#4df4ff\">\u003c/polygon>\r\n    \u003cpolygon points=\"169.2 118.7 219.73 68.39 168.7 17.38 118.3 68.23 168.73 68.47 169.2 118.7\" fill=\"#4df4ff\">\u003c/polygon>\r\n    \u003cpolygon points=\"169.04 119.85 168.73 170.27 118.35 170.54 169.01 221.12 219.83 170.04 169.04 119.85\" fill=\"#4df4ff\">\u003c/polygon>\r\n  \u003c/g>\r\n  \u003cg id=\"team-09-magmoa-layer-2\" class=\"icon-layer layer-2\">\r\n    \u003cpath d=\"M-.16.02v84h24V24.02h60V.02H-.16ZM215.84,24.02v60h24V.02h-84v24h60ZM-.16,156.02v84h84v-24H23.84v-60H-.16ZM155.84,240.02h84v-84h-24v60h-60v24Z\" fill=\"#536dea\" fill-rule=\"evenodd\">\u003c/path>\r\n    \u003cpath d=\"M134.2,52.94v-12.41h-33.1v12.41h33.1ZM51.45,135.69v-33.1h-12.41v33.1h12.41ZM196.26,135.69v-33.1h-12.41v33.1h12.41ZM134.2,197.75v-12.41h-33.1v12.41h33.1ZM107.31,119.14l10.34,10.34,10.34-10.34-10.34-10.34-10.34,10.34Z\" fill=\"#536dea\" fill-rule=\"evenodd\">\u003c/path>\r\n  \u003c/g>\r\n\u003c/svg>\r\n"},{"name":"team-10-ieoon.svg","svg":"\u003c?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n\u003csvg xmlns=\"http://www.w3.org/2000/svg\" id=\"team-10-ieoon\" viewBox=\"-14 -14 268 268\" role=\"img\" aria-labelledby=\"team-10-ieoon-title\">\r\n  \u003ctitle id=\"team-10-ieoon-title\">Ieoon animated icon\u003c/title>\r\n  \u003cstyle>\r\n    #team-10-ieoon .icon-layer {\r\n      transform-box: view-box;\r\n      transform-origin: 120px 120px;\r\n      animation: team-10-ieoon-enter 700ms cubic-bezier(.22, 1, .36, 1) both;\r\n    }\r\n    #team-10-ieoon .layer-1 { animation-delay: 120ms; }\r\n    #team-10-ieoon .layer-2 { animation-delay: 500ms; }\r\n    @keyframes team-10-ieoon-enter {\r\n      0% { transform: scale(0); animation-timing-function: ease-in-out; }\r\n      50% { transform: scale(1.11); animation-timing-function: ease-in-out; }\r\n      70% { transform: scale(.96); animation-timing-function: ease-out; }\r\n      100% { transform: scale(1); }\r\n    }\r\n    @media (prefers-reduced-motion: reduce) {\r\n      #team-10-ieoon .icon-layer { animation: none; }\r\n    }\r\n  \u003c/style>\r\n  \u003cg id=\"team-10-ieoon-layer-1\" class=\"icon-layer layer-1\">\r\n    \u003cpath d=\"M147.49,226.94c-18.22,4.31-36.68,4.41-54.83-.04l-.37-39.62-28.41,27.73c-16.16-9.95-29.35-22.77-38.62-39.01l27.64-27.94-39.36-.16c-4.66-18.12-4.75-36.64-.06-54.89l39.15-.75-27.35-27.48c8.94-16.19,22.16-29.2,38.62-39.16l28.46,27.74.28-39.66c17.76-4.47,36.14-4.27,54.62-.15l.46,39.77,27.91-27.59c16.46,8.86,29.04,22.27,39.13,38.6l-27.8,28.38,39.61.27c4.61,18.3,4.51,36.73-.08,54.91l-39.38.16,27.31,27.6c-.72,4.91-4.8,7.03-7.05,10.45-7.92,12.07-18.69,20.97-31.46,29.04l-28.21-27.81-.23,39.59ZM120.18,158.92l38.48-38.99-38.52-38.51,27.06-27.57c-17.66-7.1-36.59-7.08-54.26-.02l26.77,27.6-38.57,38.91,39.04,38.58ZM80.77,119.63l-27.24-26.71c-6.95,18.14-7.39,36.73.18,54.69l27.06-27.98ZM186.53,147.42c7.11-18.42,7.12-36.4-.17-54.33l-27.4,27.21,27.57,27.11ZM147.01,186.41l-26.94-27.47-27.28,27.79c18.36,7.27,37.58,7.31,54.22-.32Z\" fill=\"#ededea\">\u003c/path>\r\n  \u003c/g>\r\n  \u003cg id=\"team-10-ieoon-layer-2\" class=\"icon-layer layer-2\">\r\n    \u003ccircle cx=\"119.84\" cy=\"118.02\" r=\"13.21\" fill=\"#4f00b4\">\u003c/circle>\r\n    \u003cpath d=\"M240.1,95.81V-.17S141.63-.17,141.63-.17c49.47,8.76,88.67,47.03,98.48,95.98Z\" fill=\"#4f00b4\">\u003c/path>\r\n    \u003cpath d=\"M141.63,239.83h98.48v-95.98c-9.81,48.95-49.01,87.22-98.48,95.98Z\" fill=\"#4f00b4\">\u003c/path>\r\n    \u003cpath d=\"M98.58-.17H.1v95.98C9.91,46.86,49.12,8.59,98.58-.17Z\" fill=\"#4f00b4\">\u003c/path>\r\n    \u003cpath d=\"M.1,143.85v95.98h98.48C49.12,231.07,9.91,192.79.1,143.85Z\" fill=\"#4f00b4\">\u003c/path>\r\n  \u003c/g>\r\n\u003c/svg>\r\n"},{"name":"team-11-byeolungwan.svg","svg":"\u003c?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n\u003csvg xmlns=\"http://www.w3.org/2000/svg\" id=\"team-11-byeolungwan\" viewBox=\"-14 -14 268 268\" role=\"img\" aria-labelledby=\"team-11-byeolungwan-title\">\r\n  \u003ctitle id=\"team-11-byeolungwan-title\">Byeolungwan animated icon\u003c/title>\r\n  \u003cstyle>\r\n    #team-11-byeolungwan .icon-layer {\r\n      transform-box: view-box;\r\n      transform-origin: 120px 120px;\r\n      animation: team-11-byeolungwan-enter 700ms cubic-bezier(.22, 1, .36, 1) both;\r\n    }\r\n    #team-11-byeolungwan .layer-1 { animation-delay: 120ms; }\r\n    #team-11-byeolungwan .layer-2 { animation-delay: 500ms; }\r\n    @keyframes team-11-byeolungwan-enter {\r\n      0% { transform: scale(0); animation-timing-function: ease-in-out; }\r\n      50% { transform: scale(1.11); animation-timing-function: ease-in-out; }\r\n      70% { transform: scale(.96); animation-timing-function: ease-out; }\r\n      100% { transform: scale(1); }\r\n    }\r\n    @media (prefers-reduced-motion: reduce) {\r\n      #team-11-byeolungwan .icon-layer { animation: none; }\r\n    }\r\n  \u003c/style>\r\n  \u003cg id=\"team-11-byeolungwan-layer-1\" class=\"icon-layer layer-1\">\r\n    \u003cpath d=\"M.34.26v30h30V.26H.34ZM60.34,30.26V.26l-30,30h30ZM.34,60.26h30v-30L.34,60.26ZM90.34,90.26l-30,30,30,30,30,30,30-30,30-30-30-30-30-30-30,30ZM30.34,180.26H.34l30,30v-30ZM30.34,210.26H.34v30h30v-30ZM60.34,240.26v-30h-30l30,30ZM180.34.26v30h30L180.34.26ZM210.34,30.26h30V.26h-30v30ZM210.34,60.26h30l-30-30v30ZM240.34,180.26h-30v30l30-30ZM180.34,210.26v30l30-30h-30ZM240.34,240.26v-30h-30v30h30Z\" fill=\"#d5c8ac\" fill-rule=\"evenodd\">\u003c/path>\r\n  \u003c/g>\r\n  \u003cg id=\"team-11-byeolungwan-layer-2\" class=\"icon-layer layer-2\">\r\n    \u003cpath d=\"M60.34,60.26h120v-30h-30V.26h-60v30h-30v30ZM.34,120.26v30h30v30h30V60.26h-30v30H.34v30ZM180.34,120.26v60h30v-30h30v-60h-30v-30h-30v60ZM60.34,210.26h30v30h60v-30h30v-30H60.34v30Z\" fill=\"#065182\" fill-rule=\"evenodd\">\u003c/path>\r\n  \u003c/g>\r\n\u003c/svg>\r\n"},{"name":"team-12-kokorang.svg","svg":"\u003c?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n\u003csvg xmlns=\"http://www.w3.org/2000/svg\" id=\"team-12-kokorang\" viewBox=\"-14 -14 268 268\" role=\"img\" aria-labelledby=\"team-12-kokorang-title\">\r\n  \u003ctitle id=\"team-12-kokorang-title\">Kokorang animated icon\u003c/title>\r\n  \u003cstyle>\r\n    #team-12-kokorang .icon-layer {\r\n      transform-box: view-box;\r\n      transform-origin: 120px 120px;\r\n      animation: team-12-kokorang-enter 700ms cubic-bezier(.22, 1, .36, 1) both;\r\n    }\r\n    #team-12-kokorang .layer-1 { animation-delay: 120ms; }\r\n    #team-12-kokorang .layer-2 { animation-delay: 500ms; }\r\n    @keyframes team-12-kokorang-enter {\r\n      0% { transform: scale(0); animation-timing-function: ease-in-out; }\r\n      50% { transform: scale(1.11); animation-timing-function: ease-in-out; }\r\n      70% { transform: scale(.96); animation-timing-function: ease-out; }\r\n      100% { transform: scale(1); }\r\n    }\r\n    @media (prefers-reduced-motion: reduce) {\r\n      #team-12-kokorang .icon-layer { animation: none; }\r\n    }\r\n  \u003c/style>\r\n  \u003cg id=\"team-12-kokorang-layer-1\" class=\"icon-layer layer-1\">\r\n    \u003cpath d=\"M210.05,90.24l29.95-30.03L179.97.56l-30.06,29.38L119.91.47l-30.07,29.62L60.08.35,0,60.24l30.15,29.89,60-59.82,29.6,29.87c-30.36.12-55.33,22.81-59.14,52.16-.37,2.48-.65,5-.73,7.58l-29.82-29.48L.04,120.26l29.95,29.58,29.95-28.73c.06,1.6.24,3.15.41,4.71.02.22.03.44.06.66.12.95.28,1.88.43,2.82.21,1.36.44,2.71.74,4.04,0,.03.02.06.02.09,1.31,5.75,3.42,11.18,6.25,16.17.14.24.29.47.43.71.79,1.34,1.6,2.67,2.48,3.94.42.6.87,1.17,1.31,1.75.67.89,1.33,1.8,2.05,2.65.63.75,1.3,1.44,1.96,2.16.62.67,1.22,1.36,1.87,2,.64.63,1.33,1.21,1.99,1.81.77.7,1.54,1.41,2.35,2.07.38.31.79.58,1.18.88,10.1,7.79,22.71,12.47,36.44,12.49l-29.52,30.09,29.51,29.53,30.12-29.33,29.83,29.53,59.76-59.71-29.34-29.85,29.64-30.37-29.85-29.71ZM209.53,89.68l-29.38,30.23c-.1-2.75-.42-5.44-.83-8.08-4.03-29.06-28.84-51.47-58.97-51.64l29.36-29.58,59.83,59.07ZM149.93,209.94l-29.76-29.64c5.37-.17,10.47-1.01,15.32-2.33.87-.23,1.76-.43,2.61-.7.55-.17,1.07-.4,1.6-.59,1.3-.45,2.6-.9,3.85-1.44,1.45-.62,2.85-1.32,4.23-2.04.27-.14.55-.25.81-.39,10.27-5.54,18.56-13.86,24.07-24.06.29-.53.52-1.09.79-1.63.57-1.13,1.15-2.24,1.64-3.41.44-1.03.81-2.11,1.19-3.17.28-.77.59-1.52.84-2.31.21-.67.37-1.37.56-2.05,1.39-4.9,2.27-10.04,2.47-15.42l29.64,29.18-59.89,59.99Z\" fill=\"#ffba79\">\u003c/path>\r\n    \u003cpolygon points=\".4 180.23 60.26 239.84 89.87 210.08 30.05 150.26 .4 180.23\" fill=\"#ffba79\">\u003c/polygon>\r\n  \u003c/g>\r\n  \u003cg id=\"team-12-kokorang-layer-2\" class=\"icon-layer layer-2\">\r\n    \u003cpath d=\"M193.67.12h46.33v46.33h-46.33V.12ZM240,240.12h-46.33v-46.33h46.33v46.33ZM90.54,132.75v-25.26l16.83-16.83h25.26l16.83,16.83v25.26l-16.83,16.83h-25.26l-16.83-16.83ZM46.33.12v46.33H0V.12h46.33ZM46.33,193.79v46.33H0v-46.33h46.33Z\" fill=\"#ff7154\">\u003c/path>\r\n  \u003c/g>\r\n\u003c/svg>\r\n"},{"name":"team-13-effect.svg","svg":"\u003c?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n\u003csvg xmlns=\"http://www.w3.org/2000/svg\" id=\"team-13-effect\" viewBox=\"-14 -14 268 268\" role=\"img\" aria-labelledby=\"team-13-effect-title\">\r\n  \u003ctitle id=\"team-13-effect-title\">Effect animated icon\u003c/title>\r\n  \u003cstyle>\r\n    #team-13-effect .icon-layer {\r\n      transform-box: view-box;\r\n      transform-origin: 120px 120px;\r\n      animation: team-13-effect-enter 700ms cubic-bezier(.22, 1, .36, 1) both;\r\n    }\r\n    #team-13-effect .layer-1 { animation-delay: 120ms; }\r\n    #team-13-effect .layer-2 { animation-delay: 500ms; }\r\n    @keyframes team-13-effect-enter {\r\n      0% { transform: scale(0); animation-timing-function: ease-in-out; }\r\n      50% { transform: scale(1.11); animation-timing-function: ease-in-out; }\r\n      70% { transform: scale(.96); animation-timing-function: ease-out; }\r\n      100% { transform: scale(1); }\r\n    }\r\n    @media (prefers-reduced-motion: reduce) {\r\n      #team-13-effect .icon-layer { animation: none; }\r\n    }\r\n  \u003c/style>\r\n  \u003cg id=\"team-13-effect-layer-1\" class=\"icon-layer layer-1\">\r\n    \u003cpath d=\"M167.3,9.57l-.47-4.77-.17-4.8h73.33v73.33l-4.8-.17-4.77-.47-4.73-.77-4.67-1.1-4.6-1.4-4.5-1.67-4.37-2-4.23-2.27-4.07-2.53-3.9-2.8-3.73-3.03-3.5-3.27-3.27-3.5-3.03-3.73-2.8-3.9-2.53-4.07-2.27-4.23-2-4.37-1.67-4.5-1.4-4.6-1.1-4.67-.77-4.73ZM235.2,166.83l4.8-.17v73.33h-73.33l.17-4.8.47-4.77.77-4.73,1.1-4.67,1.4-4.6,1.67-4.5,2-4.37,2.27-4.23,2.53-4.07,2.8-3.9,3.03-3.73,3.27-3.5,3.5-3.27,3.73-3.03,3.9-2.8,4.07-2.53,4.23-2.27,4.37-2,4.5-1.67,4.6-1.4,4.67-1.1,4.73-.77,4.77-.47ZM163.33,120l-.37,5.67-1.1,5.53-.83,2.73-2.17,5.23-1.33,2.5-1.5,2.4-3.47,4.5-4,4-2.2,1.8-4.7,3.17-2.5,1.33-5.23,2.17-2.73.83-5.53,1.1-2.83.27-2.83.1-5.67-.37-2.8-.47-5.47-1.47-2.63-1-5.1-2.5-4.7-3.17-2.2-1.8-4-4-1.8-2.2-3.17-4.7-1.33-2.5-2.17-5.23-.83-2.73-1.1-5.53-.27-2.83-.1-2.83.37-5.67,1.1-5.53.83-2.73,1-2.63,2.5-5.1,3.17-4.7,1.8-2.2,4-4,2.2-1.8,2.3-1.67,4.9-2.83,2.6-1.17,5.37-1.83,5.53-1.1,2.83-.27,2.83-.1,5.67.37,5.53,1.1,2.73.83,2.63,1,5.1,2.5,2.4,1.5,4.5,3.47,4,4,1.8,2.2,1.67,2.3,2.83,4.9,2.17,5.23.83,2.73,1.1,5.53.37,5.67ZM9.57,72.7l-4.77.47-4.8.17V0h73.33l-.17,4.8-.47,4.77-.77,4.73-1.1,4.67-1.4,4.6-1.67,4.5-2,4.37-2.27,4.23-2.53,4.07-2.8,3.9-3.03,3.73-3.27,3.5-3.5,3.27-3.73,3.03-3.9,2.8-4.07,2.53-4.23,2.27-4.37,2-4.5,1.67-4.6,1.4-4.67,1.1-4.73.77ZM70.83,221.03l1.1,4.67.77,4.73.47,4.77.17,4.8H0v-73.33l4.8.17,4.77.47,4.73.77,4.67,1.1,4.6,1.4,4.5,1.67,4.37,2,4.23,2.27,4.07,2.53,3.9,2.8,3.73,3.03,3.5,3.27,3.27,3.5,3.03,3.73,2.8,3.9,2.53,4.07,2.27,4.23,2,4.37,1.67,4.5,1.4,4.6Z\" fill=\"#50c4a6\">\u003c/path>\r\n  \u003c/g>\r\n  \u003cg id=\"team-13-effect-layer-2\" class=\"icon-layer layer-2\">\r\n    \u003cpath d=\"M132.22,10l97.78,97.78h-97.78V10ZM230,132.22l-97.78,97.78v-97.78h97.78ZM10,107.78L107.78,10v97.78H10ZM107.78,230L10,132.22h97.78v97.78Z\" fill=\"#178466\">\u003c/path>\r\n  \u003c/g>\r\n\u003c/svg>\r\n"},{"name":"team-14-jikji-jamboree.svg","svg":"\u003c?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n\u003csvg xmlns=\"http://www.w3.org/2000/svg\" id=\"team-14-jikji-jamboree\" viewBox=\"-14 -14 268 268\" role=\"img\" aria-labelledby=\"team-14-jikji-jamboree-title\">\r\n  \u003ctitle id=\"team-14-jikji-jamboree-title\">Jikji Jamboree animated icon\u003c/title>\r\n  \u003cstyle>\r\n    #team-14-jikji-jamboree .icon-layer {\r\n      transform-box: view-box;\r\n      transform-origin: 120px 120px;\r\n      animation: team-14-jikji-jamboree-enter 700ms cubic-bezier(.22, 1, .36, 1) both;\r\n    }\r\n    #team-14-jikji-jamboree .layer-1 { animation-delay: 120ms; }\r\n    @keyframes team-14-jikji-jamboree-enter {\r\n      0% { transform: scale(0); animation-timing-function: ease-in-out; }\r\n      50% { transform: scale(1.11); animation-timing-function: ease-in-out; }\r\n      70% { transform: scale(.96); animation-timing-function: ease-out; }\r\n      100% { transform: scale(1); }\r\n    }\r\n    @media (prefers-reduced-motion: reduce) {\r\n      #team-14-jikji-jamboree .icon-layer { animation: none; }\r\n    }\r\n  \u003c/style>\r\n  \u003cg id=\"team-14-jikji-jamboree-layer-1\" class=\"icon-layer layer-1\">\r\n    \u003cpath fill=\"#fbe19f\" d=\"M160.68,183.3l22.62-22.62,56.7,56.7v2.61l-20.01,20.01h-2.61l-56.7-56.7ZM219.99,0l20.01,20.01v2.61l-56.7,56.7-22.62-22.62L217.38,0h2.61ZM135.99,218.01l-15.99,15.99-15.99-15.99v-82.02H21.99l-15.99-15.99,15.99-15.99h82.02V21.99l15.99-15.99,15.99,15.99v82.02h82.02l15.99,15.99-15.99,15.99h-82.02v82.02ZM0,219.99v-2.61l56.7-56.7,22.62,22.62-56.7,56.7h-2.61L0,219.99ZM79.32,56.7l-22.62,22.62L0,22.62v-2.61L20.01,0h2.61l56.7,56.7Z\"/>\r\n  \u003c/g>\r\n\u003c/svg>\r\n"}];
  const STYLE = "/* These scoped rules are included automatically by dday-icon-matter.js. */\n.d-day.dday-matter-ready {\n  width: var(--dday-matter-width, min(86vw, 1160px));\n  height: var(--dday-matter-height, min(50svh, 460px));\n  min-height: 120px;\n  overflow: visible;\n  pointer-events: none;\n  color: transparent;\n  text-shadow: none;\n}\n.d-day.dday-matter-positioned { position: relative; }\n.d-day.dday-matter-ready > .dday-matter-source {\n  position: absolute !important;\n  width: 1px !important;\n  height: 1px !important;\n  padding: 0 !important;\n  margin: -1px !important;\n  overflow: hidden !important;\n  clip-path: inset(50%) !important;\n  white-space: nowrap !important;\n  border: 0 !important;\n  pointer-events: none !important;\n}\n.d-day > .dday-matter-canvas {\n  position: absolute;\n  display: block;\n  max-width: none;\n  max-height: none;\n  background: transparent;\n  pointer-events: none;\n  user-select: none;\n  z-index: 1;\n}\n";
  const NS = "http://www.w3.org/2000/svg";
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const random = (min, max) => min + Math.random() * (max - min);
  const instances = new Map();
  let spritePromise;

  // Connected components split compound paths without losing their holes or colors.
  function splitShape(image, team) {
    const work = document.createElement("canvas");
    work.width = image.width; work.height = image.height;
    const context = work.getContext("2d", { willReadFrequently: true });
    context.drawImage(image, 0, 0);
    const { data } = context.getImageData(0, 0, work.width, work.height);
    const w = work.width, h = work.height, visited = new Uint8Array(w * h);
    const queue = new Int32Array(w * h), result = [];
    for (let seed = 0; seed < visited.length; seed++) {
      if (visited[seed] || data[seed * 4 + 3] < 12) continue;
      let head = 0, tail = 1, minX = w, minY = h, maxX = 0, maxY = 0;
      queue[0] = seed; visited[seed] = 1;
      while (head < tail) {
        const i = queue[head++], x = i % w, y = (i / w) | 0;
        minX = Math.min(minX, x); minY = Math.min(minY, y);
        maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
          const next = ny * w + nx;
          if (!visited[next] && data[next * 4 + 3] >= 12) { visited[next] = 1; queue[tail++] = next; }
        }
      }
      if (tail < 8) continue;
      const sprite = document.createElement("canvas");
      sprite.width = maxX - minX + 3; sprite.height = maxY - minY + 3;
      const spriteCtx = sprite.getContext("2d"), pixels = spriteCtx.createImageData(sprite.width, sprite.height);
      for (let i = 0; i < tail; i++) {
        const origin = queue[i], x = origin % w - minX + 1, y = ((origin / w) | 0) - minY + 1;
        pixels.data.set(data.subarray(origin * 4, origin * 4 + 4), (y * sprite.width + x) * 4);
      }
      spriteCtx.putImageData(pixels, 0, 0);
      result.push({ image: sprite, team, ratio: sprite.width / sprite.height });
    }
    return result;
  }

  async function loadSprites() {
    const measure = document.createElementNS(NS, "svg");
    measure.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none";
    measure.setAttribute("aria-hidden", "true"); document.body.appendChild(measure);
    const jobs = [];
    try {
      for (const [team, icon] of icons.entries()) {
        const doc = new DOMParser().parseFromString(icon.svg, "image/svg+xml");
        for (const original of doc.querySelectorAll("path,rect,circle,ellipse,polygon,polyline,line")) {
          if (original.closest("defs,clipPath,mask")) continue;
          const shape = original.cloneNode(true);
          for (const name of ["id", "class", "style"]) shape.removeAttribute(name);
          const group = document.createElementNS(NS, "g");
          group.appendChild(shape); measure.appendChild(group);
          const box = group.getBBox(); group.remove();
          if (box.width < .1 || box.height < .1) continue;
          const ratio = 224 / Math.max(box.width, box.height), pad = 2;
          const width = Math.ceil(box.width * ratio) + pad * 2, height = Math.ceil(box.height * ratio) + pad * 2;
          const xml = '<svg xmlns="' + NS + '" width="' + width + '" height="' + height + '" viewBox="' +
            [box.x - pad / ratio, box.y - pad / ratio, width / ratio, height / ratio].join(" ") + '">' +
            new XMLSerializer().serializeToString(shape) + '</svg>';
          jobs.push(new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => { try { resolve(splitShape(image, team)); } catch (error) { reject(error); } };
            image.onerror = () => reject(new Error("Cannot decode " + icon.name));
            image.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(xml);
          }));
        }
      }
      const sprites = (await Promise.all(jobs)).flat();
      if (!sprites.length) throw new Error("No icon fragments found");
      return sprites;
    } finally { measure.remove(); }
  }

  function createEffect(host, sprites) {
    const canvas = document.createElement("canvas");
    canvas.className = "dday-matter-canvas"; canvas.setAttribute("aria-hidden", "true");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas is unavailable");
    const mask = document.createElement("canvas");
    const maskCtx = mask.getContext("2d", { willReadFrequently: true });
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const byTeam = icons.map((_, i) => sprites.filter((sprite) => sprite.team === i));
    const cleanups = [], hiddenChildren = new Set();
    const pointer = { x: -1000, y: -1000, oldX: -1000, oldY: -1000, vx: 0, vy: 0, active: false, down: false };
    let text = "", width = 0, height = 0, padding = 0, dpr = 1, hostWidth = 0, hostHeight = 0;
    let particles = [], simulation, spacing = 8, elapsed = 0, assembly = 0, rebuilds = 0;
    let raf = 0, previousTime = 0, accumulator = 0, activeUntil = 0;
    let disposed = false, visible = false, textTimer, resizeTimer, visibilityTimer, meanFrameMS = 0;
    const positioned = getComputedStyle(host).position === "static";
    const listen = (target, type, callback, options) => {
      target.addEventListener(type, callback, options);
      cleanups.push(() => target.removeEventListener(type, callback, options));
    };

    function currentText() {
      const prefix = host.querySelector("#dPrefix"), countdown = host.querySelector("#countdown");
      const raw = prefix && countdown ? prefix.textContent + countdown.textContent : host.textContent;
      return raw.replace(/\s+/g, "").toUpperCase();
    }
    const validText = (value) => /^(?:D[-+])?\d{1,6}$/.test(value) || /^D-?DAY$/.test(value);

    function hideSource() {
      for (const child of host.children) {
        if (child !== canvas && !hiddenChildren.has(child)) {
          child.classList.add("dday-matter-source"); hiddenChildren.add(child);
        }
      }
    }

    function targets(count) {
      mask.width = width; mask.height = height;
      const font = getComputedStyle(host).getPropertyValue("--dday-matter-font").trim() || '"Arial Black", "Pretendard Variable", Pretendard, Arial, sans-serif';
      maskCtx.font = "900 500px " + font;
      let metrics = maskCtx.measureText(text);
      const glyphWidth = Math.max(metrics.width, metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight);
      const size = 500 * Math.min(hostWidth * .93 / glyphWidth, hostHeight * .88 / (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent));
      maskCtx.font = "900 " + size + "px " + font;
      metrics = maskCtx.measureText(text);
      maskCtx.fillStyle = "#fff";
      maskCtx.fillText(text, (width - metrics.width) / 2, (height + metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent) / 2);
      const data = maskCtx.getImageData(0, 0, width, height).data, candidates = [];
      for (let y = 0; y < height; y += 2) for (let x = 0; x < width; x += 2) {
        if (data[(y * width + x) * 4 + 3] > 180) candidates.push({ x, y });
      }
      if (!candidates.length) return [];
      spacing = Math.sqrt(candidates.length * 4 / count);
      const points = Array.from({ length: count }, (_, i) => {
        const point = candidates[Math.min(candidates.length - 1, Math.floor((i + Math.random()) * candidates.length / count))];
        return { x: point.x + random(-.8, .8), y: point.y + random(-.8, .8) };
      });
      for (let i = points.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0; [points[i], points[j]] = [points[j], points[i]];
      }
      return points;
    }

    function links() {
      const cells = new Map(), grid = Math.max(spacing * 2.5, 5), result = [];
      for (const p of particles) {
        const key = Math.floor(p.tx / grid) + "," + Math.floor(p.ty / grid);
        if (!cells.has(key)) cells.set(key, []);
        cells.get(key).push(p);
      }
      for (const p of particles) {
        const gx = Math.floor(p.tx / grid), gy = Math.floor(p.ty / grid);
        let nearest, distance = Infinity;
        for (let y = gy - 1; y <= gy + 1; y++) for (let x = gx - 1; x <= gx + 1; x++) {
          for (const q of cells.get(x + "," + y) || []) {
            if (q.id <= p.id) continue;
            const d = Math.hypot(q.tx - p.tx, q.ty - p.ty);
            if (d < distance) { distance = d; nearest = q; }
          }
        }
        if (nearest && distance < grid) result.push({ source: p.id, target: nearest.id, distance });
      }
      return result;
    }

    function settle() {
      for (const p of particles) { p.x = p.tx; p.y = p.ty; p.vx = 0; p.vy = 0; p.spin = 0; }
      simulation?.tick(30);
    }

    function rebuild(initial = false) {
      if (!width || !height || !text) return;
      const configured = Number(host.dataset.matterCount);
      const count = configured > 0 ? clamp(Math.round(configured), 300, 5000) : (innerWidth < 600 ? 1500 : 2400);
      const points = targets(count), old = particles;
      if (!points.length) return;
      particles = points.map((point, i) => {
        const previous = old[i], bank = byTeam[i % icons.length];
        const sprite = previous?.sprite || bank[(Math.random() * bank.length) | 0];
        const size = spacing * random(1.7, 2.7);
        return { id: i, sprite, tx: point.x, ty: point.y, size, radius: size * .17,
          x: previous?.x ?? random(8, width - 8), y: previous?.y ?? random(8, height - 8),
          vx: previous?.vx ?? random(-4, 4), vy: previous?.vy ?? random(-4, 4),
          angle: previous?.angle ?? random(0, Math.PI * 2), spin: random(-.035, .035), phase: random(0, Math.PI * 2),
          drawWidth: size * Math.min(1, sprite.ratio), drawHeight: size / Math.max(1, sprite.ratio) };
      });
      simulation?.stop();
      simulation = d3.forceSimulation(particles).stop().alpha(1).alphaDecay(0).velocityDecay(.12)
        .force("x", d3.forceX((p) => p.tx).strength(.012))
        .force("y", d3.forceY((p) => p.ty).strength(.012))
        .force("links", d3.forceLink(links()).id((p) => p.id).distance((l) => l.distance).strength(.028))
        .force("collide", d3.forceCollide((p) => p.radius).strength(.55));
      assembly = initial ? 0 : 1.4; rebuilds++;
      if (media.matches) settle();
      draw(); wake(media.matches ? 0 : 5000);
    }

    function resize() {
      if (disposed) return;
      const rect = host.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) { syncVisibility(); return; }
      const w = Math.round(rect.width), h = Math.round(rect.height), ratio = Math.min(devicePixelRatio || 1, 2);
      if (w === hostWidth && h === hostHeight && ratio === dpr) return;
      hostWidth = w; hostHeight = h; padding = Math.round(clamp(Math.min(w, h) * .24, 24, 84));
      width = w + padding * 2; height = h + padding * 2; dpr = ratio;
      canvas.style.inset = -padding + "px";
      canvas.style.width = width + "px"; canvas.style.height = height + "px";
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      rebuild(!particles.length); syncVisibility();
    }

    function isVisible() {
      if (disposed || document.hidden || !host.isConnected) return false;
      const rect = host.getBoundingClientRect();
      if (!rect.width || !rect.height || rect.bottom < 0 || rect.right < 0 || rect.top > innerHeight || rect.left > innerWidth) return false;
      for (let el = host; el; el = el.parentElement) {
        const style = getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) < .02) return false;
      }
      return true;
    }

    function syncVisibility() {
      const next = isVisible();
      if (next === visible) return;
      visible = next;
      pointer.active = false; pointer.down = false;
      if (visible) { previousTime = 0; accumulator = 0; wake(media.matches ? 0 : 2000); }
      else { cancelAnimationFrame(raf); raf = 0; previousTime = 0; }
    }

    function observeText() {
      if (disposed) return;
      if (!canvas.isConnected) host.appendChild(canvas);
      hideSource();
      clearTimeout(textTimer);
      const next = currentText();
      // matrix.js changes text every 35ms; wait for a stable, valid D-day value.
      if (!validText(next) || next === text) return;
      textTimer = setTimeout(() => {
        if (disposed || currentText() !== next) return;
        text = next; rebuild(!particles.length);
      }, 140);
    }

    function tick() {
      elapsed += 1 / 60; assembly += 1 / 60;
      const collapse = media.matches ? 0 : Math.max(0, 1 - assembly / 1.25) * .74;
      const speed = Math.hypot(pointer.vx, pointer.vy), radius = Math.min(95, hostWidth * .2) + Math.min(speed, 30);
      const sx = pointer.x - pointer.oldX, sy = pointer.y - pointer.oldY, segment = sx * sx + sy * sy;
      for (const p of particles) {
        if (collapse) {
          p.vx += (width / 2 - p.tx) * .012 * collapse - (p.y - height / 2) * .00065 * collapse;
          p.vy += (height / 2 - p.ty) * .012 * collapse + (p.x - width / 2) * .00065 * collapse;
        }
        if (!media.matches) { p.vx += Math.sin(elapsed * 1.1 + p.phase) * .021; p.vy += Math.cos(elapsed * .9 + p.phase) * .021; }
        if (pointer.active) {
          const t = segment ? clamp(((p.x - pointer.oldX) * sx + (p.y - pointer.oldY) * sy) / segment, 0, 1) : 1;
          let dx = p.x - (pointer.oldX + sx * t), dy = p.y - (pointer.oldY + sy * t), distance = Math.hypot(dx, dy);
          if (distance < radius) {
            if (distance < .1) { dx = Math.cos(p.phase); dy = Math.sin(p.phase); distance = 1; }
            const falloff = Math.pow(1 - distance / radius, 1.5), force = falloff * (1.8 + Math.min(speed, 40) * .36 + (pointer.down ? 3 : 0));
            p.vx += dx / distance * force + pointer.vx * falloff * .17;
            p.vy += dy / distance * force + pointer.vy * falloff * .17;
            p.spin += (pointer.vx * dy - pointer.vy * dx) * falloff * .000065;
          }
        }
        p.vx = clamp(p.vx, -48, 48); p.vy = clamp(p.vy, -48, 48);
      }
      simulation.tick();
      for (const p of particles) {
        p.spin *= .954; p.angle += p.spin + (p.vx * Math.sin(p.phase) - p.vy * Math.cos(p.phase)) * .008;
        const pad = Math.max(p.size * .5, 1);
        if (p.x < pad) { p.x = pad; p.vx = Math.abs(p.vx) * .6; }
        if (p.x > width - pad) { p.x = width - pad; p.vx = -Math.abs(p.vx) * .6; }
        if (p.y < pad) { p.y = pad; p.vy = Math.abs(p.vy) * .6; }
        if (p.y > height - pad) { p.y = height - pad; p.vy = -Math.abs(p.vy) * .6; }
      }
      pointer.oldX = pointer.x; pointer.oldY = pointer.y; pointer.vx *= .65; pointer.vy *= .65;
    }

    function draw() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        const c = Math.cos(p.angle), s = Math.sin(p.angle);
        ctx.setTransform(dpr * c, dpr * s, -dpr * s, dpr * c, p.x * dpr, p.y * dpr);
        ctx.drawImage(p.sprite.image, -p.drawWidth / 2, -p.drawHeight / 2, p.drawWidth, p.drawHeight);
      }
    }

    function frame(time) {
      raf = 0;
      if (disposed || !visible || document.hidden || !simulation) return;
      const start = performance.now();
      accumulator += previousTime ? Math.min(time - previousTime, 50) : 16.667; previousTime = time;
      let n = 0;
      while (accumulator >= 16.667 && n < 3) { tick(); accumulator -= 16.667; n++; }
      draw(); meanFrameMS = meanFrameMS * .95 + (performance.now() - start) * .05;
      if (!media.matches || time < activeUntil) { if (!raf) raf = requestAnimationFrame(frame); }
      else previousTime = 0;
    }

    function wake(duration = 3000) {
      activeUntil = performance.now() + duration;
      if (!disposed && visible && !raf && simulation) raf = requestAnimationFrame(frame);
    }

    function pointerMove(event) {
      if (!visible || event.target.closest?.("a,button,input,textarea,select,[role='button']")) { clearPointer(); return; }
      const rect = canvas.getBoundingClientRect(), x = event.clientX - rect.left, y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) { clearPointer(); return; }
      if (pointer.active) {
        pointer.oldX = pointer.x; pointer.oldY = pointer.y;
        pointer.vx = clamp(x - pointer.x, -65, 65); pointer.vy = clamp(y - pointer.y, -65, 65);
      } else { pointer.oldX = x; pointer.oldY = y; pointer.vx = 0; pointer.vy = 0; }
      pointer.x = x; pointer.y = y; pointer.active = true; wake();
    }

    function clearPointer() {
      if (!pointer.active && !pointer.down) return;
      pointer.active = false; pointer.down = false; pointer.vx = 0; pointer.vy = 0; wake();
    }

    function pointerDown(event) {
      pointerMove(event);
      if (!pointer.active) return;
      pointer.down = true;
      const radius = Math.min(180, hostWidth * .32);
      for (const p of particles) {
        let dx = p.x - pointer.x, dy = p.y - pointer.y, distance = Math.hypot(dx, dy);
        if (distance >= radius) continue;
        if (distance < .1) { dx = Math.cos(p.phase); dy = Math.sin(p.phase); distance = 1; }
        const force = Math.pow(1 - distance / radius, 1.3) * 30;
        p.vx += dx / distance * force; p.vy += dy / distance * force;
        p.spin += random(-.24, .24) * force / 12;
      }
      wake(4500);
    }

    function destroy() {
      if (disposed) return;
      disposed = true; cancelAnimationFrame(raf); simulation?.stop();
      clearTimeout(textTimer); clearTimeout(resizeTimer); clearTimeout(visibilityTimer);
      for (const cleanup of cleanups) cleanup();
      canvas.remove();
      for (const child of hiddenChildren) child.classList.remove("dday-matter-source");
      host.classList.remove("dday-matter-ready");
      if (positioned) host.classList.remove("dday-matter-positioned");
      instances.delete(host);
    }

    try {
      const initial = currentText(); text = validText(initial) ? initial : "";
      if (positioned) host.classList.add("dday-matter-positioned");
      host.appendChild(canvas); host.classList.add("dday-matter-ready"); hideSource(); resize();
      const textObserver = new MutationObserver(observeText);
      textObserver.observe(host, { childList: true, subtree: true, characterData: true });
      cleanups.push(() => textObserver.disconnect());
      const resizeObserver = new ResizeObserver(() => {
        clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 100);
      });
      resizeObserver.observe(host); cleanups.push(() => resizeObserver.disconnect());
      const visibilityObserver = new MutationObserver(() => {
        syncVisibility(); clearTimeout(visibilityTimer); visibilityTimer = setTimeout(syncVisibility, 600);
      });
      for (let el = host; el; el = el.parentElement) visibilityObserver.observe(el, { attributes: true, attributeFilter: ["style", "class", "hidden"] });
      cleanups.push(() => visibilityObserver.disconnect());
      const intersection = new IntersectionObserver(syncVisibility); intersection.observe(host);
      cleanups.push(() => intersection.disconnect());
      listen(document, "pointermove", pointerMove, { passive: true });
      listen(document, "pointerdown", pointerDown, { passive: true });
      listen(document, "pointerup", (event) => { pointer.down = false; if (event.pointerType !== "mouse") clearPointer(); }, { passive: true });
      listen(document, "pointercancel", clearPointer, { passive: true });
      listen(document, "pointerleave", clearPointer, { passive: true });
      listen(window, "blur", clearPointer);
      listen(window, "scroll", syncVisibility, { passive: true });
      listen(window, "resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 120); });
      listen(document, "visibilitychange", syncVisibility);
      listen(document, "transitionend", syncVisibility);
      listen(media, "change", () => { if (media.matches) settle(); draw(); wake(media.matches ? 0 : 2500); });
      if (document.fonts?.status === "loading") document.fonts.ready.then(() => { if (!disposed && text) rebuild(); });
      syncVisibility();
    } catch (error) { destroy(); throw error; }

    return Object.freeze({
      refresh: observeText, destroy,
      snapshot: () => ({ text, count: particles.length, fragments: sprites.length, teams: byTeam.filter((bank) => bank.length).length,
        width, height, padding, visible, running: !!raf, rebuilds, reducedMotion: media.matches, meanFrameMS,
        averageDisplacement: particles.length ? particles.reduce((sum, p) => sum + Math.hypot(p.x - p.tx, p.y - p.ty), 0) / particles.length : 0,
        particles: particles.map((p) => ({ x: p.x, y: p.y, tx: p.tx, ty: p.ty, size: p.size })) })
    });
  }

  async function mount(element = ".d-day") {
    const host = typeof element === "string" ? document.querySelector(element) : element;
    if (!host) return null;
    if (instances.has(host)) return instances.get(host);
    if (!document.getElementById("dday-icon-matter-style")) {
      const style = document.createElement("style"); style.id = "dday-icon-matter-style";
      style.textContent = STYLE; document.head.appendChild(style);
    }
    const pending = (async () => {
      try {
        spritePromise ||= loadSprites();
        const sprites = await spritePromise;
        if (!host.isConnected) { instances.delete(host); return null; }
        const effect = createEffect(host, sprites); instances.set(host, effect); return effect;
      } catch (error) {
        instances.delete(host); spritePromise = undefined;
        console.warn("D-day icon effect: original text retained.", error); return null;
      }
    })();
    instances.set(host, pending); return pending;
  }

  function start() {
    document.querySelectorAll(".d-day").forEach((host) => { void mount(host); });
    const observer = new MutationObserver((records) => {
      for (const record of records) for (const node of record.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches(".d-day")) void mount(node);
        node.querySelectorAll(".d-day").forEach((host) => { void mount(host); });
      }
      for (const [host, effect] of instances) if (!host.isConnected && effect.destroy) effect.destroy();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
  window.DDayIconMatter = Object.freeze({ mount, get: (host = document.querySelector(".d-day")) => instances.get(host) || null });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
