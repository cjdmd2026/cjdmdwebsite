(()=>{var Id=0,Oh=1,Pd=2;var Io=1,Ld=2,fr=3,_i=0,Kt=1,jt=2,ei=0,hs=1,Fh=2,Bh=3,zh=4,Nd=5;var Fi=100,Dd=101,Ud=102,Od=103,Fd=104,Bd=200,zd=201,kd=202,Vd=203,Ca=204,Ia=205,Hd=206,Gd=207,Wd=208,Xd=209,qd=210,Zd=211,Yd=212,Jd=213,$d=214,Pa=0,La=1,Na=2,us=3,Da=4,Ua=5,Oa=6,Fa=7,kh=0,Kd=1,jd=2,Pn=0,Vh=1,Hh=2,Gh=3,Po=4,Wh=5,Xh=6,qh=7;var Zh=300,qi=301,gs=302,uc=303,fc=304,Lo=306,Yn=1e3,nn=1001,Bi=1002,Dt=1003,dc=1004;var xs=1005;var Ct=1006,dr=1007;var ti=1008;var rn=1009,Yh=1010,Jh=1011,pr=1012,pc=1013,Ln=1014,Sn=1015,ni=1016,mc=1017,gc=1018,mr=1020,$h=35902,Kh=35899,jh=1021,Qh=1022,on=1023,Jn=1026,Zi=1027,xc=1028,_c=1029,Yi=1030,yc=1031;var vc=1033,No=33776,Do=33777,Uo=33778,Oo=33779,Mc=35840,Sc=35841,bc=35842,Ec=35843,wc=36196,Tc=37492,Ac=37496,Rc=37488,Cc=37489,Fo=37490,Ic=37491,Pc=37808,Lc=37809,Nc=37810,Dc=37811,Uc=37812,Oc=37813,Fc=37814,Bc=37815,zc=37816,kc=37817,Vc=37818,Hc=37819,Gc=37820,Wc=37821,Xc=36492,qc=36494,Zc=36495,Yc=36283,Jc=36284,Bo=36285,$c=36286;var fs=2300,Js=2301,Ra=2302,vh=2303,Mh=2400,Sh=2401,bh=2402;var Qd=3200;var Kc=0,ep=1,Nn="",yt="srgb",Kr="srgb-linear",jr="linear",lt="srgb";var cs=7680;var Eh=519,tp=512,np=513,ip=514,jc=515,sp=516,rp=517,Qc=518,op=519,Ba=35044,gr=35048;var eu="300 es",An=2e3,$s=2001;function rg(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function og(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Qr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ap(){let i=Qr("canvas");return i.style.display="block",i}var Gf={},Ks=null;function eo(...i){let e="THREE."+i.shift();Ks?Ks("log",e,...i):console.log(e,...i)}function cp(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ge(...i){i=cp(i);let e="THREE."+i.shift();if(Ks)Ks("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function qe(...i){i=cp(i);let e="THREE."+i.shift();if(Ks)Ks("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function ls(...i){let e=i.join(" ");e in Gf||(Gf[e]=!0,Ge(...i))}function lp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var hp={[Pa]:La,[Na]:Oa,[Da]:Fa,[us]:Ua,[La]:Pa,[Oa]:Na,[Fa]:Da,[Ua]:us},$n=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Wf=1234567,Zr=Math.PI/180,js=180/Math.PI;function Zn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Gt[i&255]+Gt[i>>8&255]+Gt[i>>16&255]+Gt[i>>24&255]+"-"+Gt[e&255]+Gt[e>>8&255]+"-"+Gt[e>>16&15|64]+Gt[e>>24&255]+"-"+Gt[t&63|128]+Gt[t>>8&255]+"-"+Gt[t>>16&255]+Gt[t>>24&255]+Gt[n&255]+Gt[n>>8&255]+Gt[n>>16&255]+Gt[n>>24&255]).toLowerCase()}function $e(i,e,t){return Math.max(e,Math.min(t,i))}function tu(i,e){return(i%e+e)%e}function ag(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function cg(i,e,t){return i!==e?(t-i)/(e-i):0}function Yr(i,e,t){return(1-t)*i+t*e}function lg(i,e,t,n){return Yr(i,e,1-Math.exp(-t*n))}function hg(i,e=1){return e-Math.abs(tu(i,e*2)-e)}function ug(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function fg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function dg(i,e){return i+Math.floor(Math.random()*(e-i+1))}function pg(i,e){return i+Math.random()*(e-i)}function mg(i){return i*(.5-Math.random())}function gg(i){i!==void 0&&(Wf=i);let e=Wf+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function xg(i){return i*Zr}function _g(i){return i*js}function yg(i){return(i&i-1)===0&&i!==0}function vg(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Mg(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Sg(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),f=o((e-n)/2),d=r((n-e)/2),m=o((n-e)/2);switch(s){case"XYX":i.set(a*h,c*u,c*f,a*l);break;case"YZY":i.set(c*f,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*f,a*h,a*l);break;case"XZX":i.set(a*h,c*m,c*d,a*l);break;case"YXY":i.set(c*d,a*h,c*m,a*l);break;case"ZYZ":i.set(c*m,c*d,a*h,a*l);break;default:Ge("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Tn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ut(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var gt={DEG2RAD:Zr,RAD2DEG:js,generateUUID:Zn,clamp:$e,euclideanModulo:tu,mapLinear:ag,inverseLerp:cg,lerp:Yr,damp:lg,pingpong:hg,smoothstep:ug,smootherstep:fg,randInt:dg,randFloat:pg,randFloatSpread:mg,seededRandom:gg,degToRad:xg,radToDeg:_g,isPowerOfTwo:yg,ceilPowerOfTwo:vg,floorPowerOfTwo:Mg,setQuaternionFromProperEuler:Sg,normalize:ut,denormalize:Tn},au=class au{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};au.prototype.isVector2=!0;var ue=au,Mn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],f=r[o+0],d=r[o+1],m=r[o+2],y=r[o+3];if(u!==y||c!==f||l!==d||h!==m){let g=c*f+l*d+h*m+u*y;g<0&&(f=-f,d=-d,m=-m,y=-y,g=-g);let p=1-a;if(g<.9995){let E=Math.acos(g),M=Math.sin(E);p=Math.sin(p*E)/M,a=Math.sin(a*E)/M,c=c*p+f*a,l=l*p+d*a,h=h*p+m*a,u=u*p+y*a}else{c=c*p+f*a,l=l*p+d*a,h=h*p+m*a,u=u*p+y*a;let E=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=E,l*=E,h*=E,u*=E}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],m=r[o+3];return e[t]=a*m+h*u+c*d-l*f,e[t+1]=c*m+h*f+l*u-a*d,e[t+2]=l*m+h*d+a*f-c*u,e[t+3]=h*m-a*u-c*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),d=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u-f*d*m;break;case"YXZ":this._x=f*h*u+l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u+f*d*m;break;case"ZXY":this._x=f*h*u-l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u-f*d*m;break;case"ZYX":this._x=f*h*u-l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u+f*d*m;break;case"YZX":this._x=f*h*u+l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u-f*d*m;break;case"XZY":this._x=f*h*u-l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u+f*d*m;break;default:Ge("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],f=n+a+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>u){let d=2*Math.sqrt(1+n-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){let d=2*Math.sqrt(1+a-n-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($e(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},cu=class cu{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Xf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Xf.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ql.copy(this).projectOnVector(e),this.sub(ql)}reflect(e){return this.sub(ql.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};cu.prototype.isVector3=!0;var U=cu,ql=new U,Xf=new Mn,lu=class lu{constructor(e,t,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],m=n[8],y=s[0],g=s[3],p=s[6],E=s[1],M=s[4],_=s[7],S=s[2],w=s[5],R=s[8];return r[0]=o*y+a*E+c*S,r[3]=o*g+a*M+c*w,r[6]=o*p+a*_+c*R,r[1]=l*y+h*E+u*S,r[4]=l*g+h*M+u*w,r[7]=l*p+h*_+u*R,r[2]=f*y+d*E+m*S,r[5]=f*g+d*M+m*w,r[8]=f*p+d*_+m*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,m=t*u+n*f+s*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return e[0]=u*y,e[1]=(s*l-h*n)*y,e[2]=(a*n-s*o)*y,e[3]=f*y,e[4]=(h*t-s*c)*y,e[5]=(s*r-a*t)*y,e[6]=d*y,e[7]=(n*c-l*t)*y,e[8]=(o*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return ls("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Zl.makeScale(e,t)),this}rotate(e){return ls("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Zl.makeRotation(-e)),this}translate(e,t){return ls("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Zl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};lu.prototype.isMatrix3=!0;var We=lu,Zl=new We,qf=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Zf=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function bg(){let i={enabled:!0,workingColorSpace:Kr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===lt&&(s.r=xi(s.r),s.g=xi(s.g),s.b=xi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===lt&&(s.r=Ys(s.r),s.g=Ys(s.g),s.b=Ys(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Nn?jr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ls("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ls("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Kr]:{primaries:e,whitePoint:n,transfer:jr,toXYZ:qf,fromXYZ:Zf,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:yt},outputColorSpaceConfig:{drawingBufferColorSpace:yt}},[yt]:{primaries:e,whitePoint:n,transfer:lt,toXYZ:qf,fromXYZ:Zf,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:yt}}}),i}var it=bg();function xi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ys(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Cs,Qs=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Cs===void 0&&(Cs=Qr("canvas")),Cs.width=e.width,Cs.height=e.height;let s=Cs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Cs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Qr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=xi(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(xi(t[n]/255)*255):t[n]=xi(t[n]);return{data:t,width:e.width,height:e.height}}else return Ge("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Eg=0,yi=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Eg++}),this.uuid=Zn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Yl(s[o].image)):r.push(Yl(s[o]))}else r=Yl(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Yl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Qs.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ge("Texture: Unable to serialize Texture."),{})}var wg=0,Jl=new U,Zt=class i extends $n{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=nn,s=nn,r=Ct,o=ti,a=on,c=rn,l=i.DEFAULT_ANISOTROPY,h=Nn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wg++}),this.uuid=Zn(),this.name="",this.source=new yi(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Jl).x}get height(){return this.source.getSize(Jl).y}get depth(){return this.source.getSize(Jl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ge(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ge(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Zh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Yn:e.x=e.x-Math.floor(e.x);break;case nn:e.x=e.x<0?0:1;break;case Bi:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Yn:e.y=e.y-Math.floor(e.y);break;case nn:e.y=e.y<0?0:1;break;case Bi:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Zt.DEFAULT_IMAGE=null;Zt.DEFAULT_MAPPING=Zh;Zt.DEFAULT_ANISOTROPY=1;var hu=class hu{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],m=c[9],y=c[2],g=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-y)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+y)<.1&&Math.abs(m+g)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let M=(l+1)/2,_=(d+1)/2,S=(p+1)/2,w=(h+f)/4,R=(u+y)/4,x=(m+g)/4;return M>_&&M>S?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=w/n,r=R/n):_>S?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=w/s,r=x/s):S<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),n=R/r,s=x/r),this.set(n,s,r,t),this}let E=Math.sqrt((g-m)*(g-m)+(u-y)*(u-y)+(f-h)*(f-h));return Math.abs(E)<.001&&(E=1),this.x=(g-m)/E,this.y=(u-y)/E,this.z=(f-h)/E,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this.w=$e(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this.w=$e(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};hu.prototype.isVector4=!0;var at=hu,za=class extends $n{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ct,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new Zt(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Ct,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new yi(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},un=class extends za{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},to=class extends Zt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ka=class extends Zt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var hc=class hc{constructor(e,t,n,s,r,o,a,c,l,h,u,f,d,m,y,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,u,f,d,m,y,g)}set(e,t,n,s,r,o,a,c,l,h,u,f,d,m,y,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=m,p[11]=y,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new hc().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/Is.setFromMatrixColumn(e,0).length(),r=1/Is.setFromMatrixColumn(e,1).length(),o=1/Is.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let f=o*h,d=o*u,m=a*h,y=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=d+m*l,t[5]=f-y*l,t[9]=-a*c,t[2]=y-f*l,t[6]=m+d*l,t[10]=o*c}else if(e.order==="YXZ"){let f=c*h,d=c*u,m=l*h,y=l*u;t[0]=f+y*a,t[4]=m*a-d,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=d*a-m,t[6]=y+f*a,t[10]=o*c}else if(e.order==="ZXY"){let f=c*h,d=c*u,m=l*h,y=l*u;t[0]=f-y*a,t[4]=-o*u,t[8]=m+d*a,t[1]=d+m*a,t[5]=o*h,t[9]=y-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let f=o*h,d=o*u,m=a*h,y=a*u;t[0]=c*h,t[4]=m*l-d,t[8]=f*l+y,t[1]=c*u,t[5]=y*l+f,t[9]=d*l-m,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let f=o*c,d=o*l,m=a*c,y=a*l;t[0]=c*h,t[4]=y-f*u,t[8]=m*u+d,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=d*u+m,t[10]=f-y*u}else if(e.order==="XZY"){let f=o*c,d=o*l,m=a*c,y=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=f*u+y,t[5]=o*h,t[9]=d*u-m,t[2]=m*u-d,t[6]=a*h,t[10]=y*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Tg,e,Ag)}lookAt(e,t,n){let s=this.elements;return ln.subVectors(e,t),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),Pi.crossVectors(n,ln),Pi.lengthSq()===0&&(Math.abs(n.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),Pi.crossVectors(n,ln)),Pi.normalize(),Qo.crossVectors(ln,Pi),s[0]=Pi.x,s[4]=Qo.x,s[8]=ln.x,s[1]=Pi.y,s[5]=Qo.y,s[9]=ln.y,s[2]=Pi.z,s[6]=Qo.z,s[10]=ln.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],m=n[2],y=n[6],g=n[10],p=n[14],E=n[3],M=n[7],_=n[11],S=n[15],w=s[0],R=s[4],x=s[8],T=s[12],N=s[1],C=s[5],D=s[9],F=s[13],W=s[2],k=s[6],j=s[10],X=s[14],G=s[3],le=s[7],he=s[11],_e=s[15];return r[0]=o*w+a*N+c*W+l*G,r[4]=o*R+a*C+c*k+l*le,r[8]=o*x+a*D+c*j+l*he,r[12]=o*T+a*F+c*X+l*_e,r[1]=h*w+u*N+f*W+d*G,r[5]=h*R+u*C+f*k+d*le,r[9]=h*x+u*D+f*j+d*he,r[13]=h*T+u*F+f*X+d*_e,r[2]=m*w+y*N+g*W+p*G,r[6]=m*R+y*C+g*k+p*le,r[10]=m*x+y*D+g*j+p*he,r[14]=m*T+y*F+g*X+p*_e,r[3]=E*w+M*N+_*W+S*G,r[7]=E*R+M*C+_*k+S*le,r[11]=E*x+M*D+_*j+S*he,r[15]=E*T+M*F+_*X+S*_e,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],f=e[10],d=e[14],m=e[3],y=e[7],g=e[11],p=e[15],E=c*d-l*f,M=a*d-l*u,_=a*f-c*u,S=o*d-l*h,w=o*f-c*h,R=o*u-a*h;return t*(y*E-g*M+p*_)-n*(m*E-g*S+p*w)+s*(m*M-y*S+p*R)-r*(m*_-y*w+g*R)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],o=e[5],a=e[9],c=e[2],l=e[6],h=e[10];return t*(o*h-a*l)-n*(r*h-a*c)+s*(r*l-o*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],f=e[10],d=e[11],m=e[12],y=e[13],g=e[14],p=e[15],E=t*a-n*o,M=t*c-s*o,_=t*l-r*o,S=n*c-s*a,w=n*l-r*a,R=s*l-r*c,x=h*y-u*m,T=h*g-f*m,N=h*p-d*m,C=u*g-f*y,D=u*p-d*y,F=f*p-d*g,W=E*F-M*D+_*C+S*N-w*T+R*x;if(W===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/W;return e[0]=(a*F-c*D+l*C)*k,e[1]=(s*D-n*F-r*C)*k,e[2]=(y*R-g*w+p*S)*k,e[3]=(f*w-u*R-d*S)*k,e[4]=(c*N-o*F-l*T)*k,e[5]=(t*F-s*N+r*T)*k,e[6]=(g*_-m*R-p*M)*k,e[7]=(h*R-f*_+d*M)*k,e[8]=(o*D-a*N+l*x)*k,e[9]=(n*N-t*D-r*x)*k,e[10]=(m*w-y*_+p*E)*k,e[11]=(u*_-h*w-d*E)*k,e[12]=(a*T-o*C-c*x)*k,e[13]=(t*C-n*T+s*x)*k,e[14]=(y*M-m*S-g*E)*k,e[15]=(h*S-u*M+f*E)*k,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,m=r*u,y=o*h,g=o*u,p=a*u,E=c*l,M=c*h,_=c*u,S=n.x,w=n.y,R=n.z;return s[0]=(1-(y+p))*S,s[1]=(d+_)*S,s[2]=(m-M)*S,s[3]=0,s[4]=(d-_)*w,s[5]=(1-(f+p))*w,s[6]=(g+E)*w,s[7]=0,s[8]=(m+M)*R,s[9]=(g-E)*R,s[10]=(1-(f+y))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=Is.set(s[0],s[1],s[2]).length(),a=Is.set(s[4],s[5],s[6]).length(),c=Is.set(s[8],s[9],s[10]).length();r<0&&(o=-o),bn.copy(this);let l=1/o,h=1/a,u=1/c;return bn.elements[0]*=l,bn.elements[1]*=l,bn.elements[2]*=l,bn.elements[4]*=h,bn.elements[5]*=h,bn.elements[6]*=h,bn.elements[8]*=u,bn.elements[9]*=u,bn.elements[10]*=u,t.setFromRotationMatrix(bn),n.x=o,n.y=a,n.z=c,this}makePerspective(e,t,n,s,r,o,a=An,c=!1){let l=this.elements,h=2*r/(t-e),u=2*r/(n-s),f=(t+e)/(t-e),d=(n+s)/(n-s),m,y;if(c)m=r/(o-r),y=o*r/(o-r);else if(a===An)m=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(a===$s)m=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=An,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-s),f=-(t+e)/(t-e),d=-(n+s)/(n-s),m,y;if(c)m=1/(o-r),y=o/(o-r);else if(a===An)m=-2/(o-r),y=-(o+r)/(o-r);else if(a===$s)m=-1/(o-r),y=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=m,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};hc.prototype.isMatrix4=!0;var tt=hc,Is=new U,bn=new tt,Tg=new U(0,0,0),Ag=new U(1,1,1),Pi=new U,Qo=new U,ln=new U,Yf=new tt,Jf=new Mn,vi=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin($e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin($e(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-$e(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin($e(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-$e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Ge("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Yf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Yf,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Jf.setFromEuler(this),this.setFromQuaternion(Jf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};vi.DEFAULT_ORDER="XYZ";var er=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Rg=0,$f=new U,Ps=new Mn,hi=new tt,ea=new U,Or=new U,Cg=new U,Ig=new Mn,Kf=new U(1,0,0),jf=new U(0,1,0),Qf=new U(0,0,1),ed={type:"added"},Pg={type:"removed"},Ls={type:"childadded",child:null},$l={type:"childremoved",child:null},It=class i extends $n{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Rg++}),this.uuid=Zn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new U,t=new vi,n=new Mn,s=new U(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new tt},normalMatrix:{value:new We}}),this.matrix=new tt,this.matrixWorld=new tt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new er,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ps.setFromAxisAngle(e,t),this.quaternion.multiply(Ps),this}rotateOnWorldAxis(e,t){return Ps.setFromAxisAngle(e,t),this.quaternion.premultiply(Ps),this}rotateX(e){return this.rotateOnAxis(Kf,e)}rotateY(e){return this.rotateOnAxis(jf,e)}rotateZ(e){return this.rotateOnAxis(Qf,e)}translateOnAxis(e,t){return $f.copy(e).applyQuaternion(this.quaternion),this.position.add($f.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Kf,e)}translateY(e){return this.translateOnAxis(jf,e)}translateZ(e){return this.translateOnAxis(Qf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ea.copy(e):ea.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Or.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hi.lookAt(Or,ea,this.up):hi.lookAt(ea,Or,this.up),this.quaternion.setFromRotationMatrix(hi),s&&(hi.extractRotation(s.matrixWorld),Ps.setFromRotationMatrix(hi),this.quaternion.premultiply(Ps.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ed),Ls.child=e,this.dispatchEvent(Ls),Ls.child=null):qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Pg),$l.child=e,this.dispatchEvent($l),$l.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hi.multiply(e.parent.matrixWorld)),e.applyMatrix4(hi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ed),Ls.child=e,this.dispatchEvent(Ls),Ls.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Or,e,Cg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Or,Ig,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),d=o(e.animations),m=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};It.DEFAULT_UP=new U(0,1,0);It.DEFAULT_MATRIX_AUTO_UPDATE=!0;It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Rn=class extends It{constructor(){super(),this.isGroup=!0,this.type="Group"}},Lg={type:"move"},tr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Rn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Rn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Rn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let y of e.hand.values()){let g=t.getJointPose(y,n),p=this._getHandJoint(l,y);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,m=.005;l.inputState.pinching&&f>d+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Lg)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Rn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},up={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Li={h:0,s:0,l:0},ta={h:0,s:0,l:0};function Kl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ve=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=it.workingColorSpace){return this.r=e,this.g=t,this.b=n,it.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=it.workingColorSpace){if(e=tu(e,1),t=$e(t,0,1),n=$e(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Kl(o,r,e+1/3),this.g=Kl(o,r,e),this.b=Kl(o,r,e-1/3)}return it.colorSpaceToWorking(this,s),this}setStyle(e,t=yt){function n(r){r!==void 0&&parseFloat(r)<1&&Ge("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ge("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Ge("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yt){let n=up[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ge("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=xi(e.r),this.g=xi(e.g),this.b=xi(e.b),this}copyLinearToSRGB(e){return this.r=Ys(e.r),this.g=Ys(e.g),this.b=Ys(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yt){return it.workingToColorSpace(Wt.copy(this),e),Math.round($e(Wt.r*255,0,255))*65536+Math.round($e(Wt.g*255,0,255))*256+Math.round($e(Wt.b*255,0,255))}getHexString(e=yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=it.workingColorSpace){it.workingToColorSpace(Wt.copy(this),t);let n=Wt.r,s=Wt.g,r=Wt.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=it.workingColorSpace){return it.workingToColorSpace(Wt.copy(this),t),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=yt){it.workingToColorSpace(Wt.copy(this),e);let t=Wt.r,n=Wt.g,s=Wt.b;return e!==yt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Li),this.setHSL(Li.h+e,Li.s+t,Li.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Li),e.getHSL(ta);let n=Yr(Li.h,ta.h,t),s=Yr(Li.s,ta.s,t),r=Yr(Li.l,ta.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Wt=new Ve;Ve.NAMES=up;var no=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ve(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Kn=class extends It{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vi,this.environmentIntensity=1,this.environmentRotation=new vi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},En=new U,ui=new U,jl=new U,fi=new U,Ns=new U,Ds=new U,td=new U,Ql=new U,eh=new U,th=new U,nh=new at,ih=new at,sh=new at,gi=class i{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),En.subVectors(e,t),s.cross(En);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){En.subVectors(s,t),ui.subVectors(n,t),jl.subVectors(e,t);let o=En.dot(En),a=En.dot(ui),c=En.dot(jl),l=ui.dot(ui),h=ui.dot(jl),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(l*c-a*h)*f,m=(o*h-a*c)*f;return r.set(1-d-m,m,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,fi)===null?!1:fi.x>=0&&fi.y>=0&&fi.x+fi.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,fi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,fi.x),c.addScaledVector(o,fi.y),c.addScaledVector(a,fi.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return nh.setScalar(0),ih.setScalar(0),sh.setScalar(0),nh.fromBufferAttribute(e,t),ih.fromBufferAttribute(e,n),sh.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(nh,r.x),o.addScaledVector(ih,r.y),o.addScaledVector(sh,r.z),o}static isFrontFacing(e,t,n,s){return En.subVectors(n,t),ui.subVectors(e,t),En.cross(ui).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return En.subVectors(this.c,this.b),ui.subVectors(this.a,this.b),En.cross(ui).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;Ns.subVectors(s,n),Ds.subVectors(r,n),Ql.subVectors(e,n);let c=Ns.dot(Ql),l=Ds.dot(Ql);if(c<=0&&l<=0)return t.copy(n);eh.subVectors(e,s);let h=Ns.dot(eh),u=Ds.dot(eh);if(h>=0&&u<=h)return t.copy(s);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Ns,o);th.subVectors(e,r);let d=Ns.dot(th),m=Ds.dot(th);if(m>=0&&d<=m)return t.copy(r);let y=d*l-c*m;if(y<=0&&l>=0&&m<=0)return a=l/(l-m),t.copy(n).addScaledVector(Ds,a);let g=h*m-d*u;if(g<=0&&u-h>=0&&d-m>=0)return td.subVectors(r,s),a=(u-h)/(u-h+(d-m)),t.copy(s).addScaledVector(td,a);let p=1/(g+y+f);return o=y*p,a=f*p,t.copy(n).addScaledVector(Ns,o).addScaledVector(Ds,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},wt=class{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(wn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(wn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=wn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,wn):wn.fromBufferAttribute(r,o),wn.applyMatrix4(e.matrixWorld),this.expandByPoint(wn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),na.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),na.copy(n.boundingBox)),na.applyMatrix4(e.matrixWorld),this.union(na)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,wn),wn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Fr),ia.subVectors(this.max,Fr),Us.subVectors(e.a,Fr),Os.subVectors(e.b,Fr),Fs.subVectors(e.c,Fr),Ni.subVectors(Os,Us),Di.subVectors(Fs,Os),ss.subVectors(Us,Fs);let t=[0,-Ni.z,Ni.y,0,-Di.z,Di.y,0,-ss.z,ss.y,Ni.z,0,-Ni.x,Di.z,0,-Di.x,ss.z,0,-ss.x,-Ni.y,Ni.x,0,-Di.y,Di.x,0,-ss.y,ss.x,0];return!rh(t,Us,Os,Fs,ia)||(t=[1,0,0,0,1,0,0,0,1],!rh(t,Us,Os,Fs,ia))?!1:(sa.crossVectors(Ni,Di),t=[sa.x,sa.y,sa.z],rh(t,Us,Os,Fs,ia))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,wn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(wn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(di),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},di=[new U,new U,new U,new U,new U,new U,new U,new U],wn=new U,na=new wt,Us=new U,Os=new U,Fs=new U,Ni=new U,Di=new U,ss=new U,Fr=new U,ia=new U,sa=new U,rs=new U;function rh(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){rs.fromArray(i,r);let a=s.x*Math.abs(rs.x)+s.y*Math.abs(rs.y)+s.z*Math.abs(rs.z),c=e.dot(rs),l=t.dot(rs),h=n.dot(rs);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Nt=new U,ra=new ue,Ng=0,vt=class extends $n{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ng++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ba,this.updateRanges=[],this.gpuType=Sn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ra.fromBufferAttribute(this,t),ra.applyMatrix3(e),this.setXY(t,ra.x,ra.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix3(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix4(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyNormalMatrix(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.transformDirection(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Tn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ut(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Tn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Tn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Tn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Tn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array),r=ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ba&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var io=class extends vt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var so=class extends vt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var mt=class extends vt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Dg=new wt,Br=new U,oh=new U,fn=class{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Dg.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Br.subVectors(e,this.center);let t=Br.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Br,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(oh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Br.copy(e.center).add(oh)),this.expandByPoint(Br.copy(e.center).sub(oh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Ug=0,vn=new tt,ah=new It,Bs=new U,hn=new wt,zr=new wt,Ft=new U,Pt=class i extends $n{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ug++}),this.uuid=Zn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(rg(e)?so:io)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new We().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return vn.makeRotationFromQuaternion(e),this.applyMatrix4(vn),this}rotateX(e){return vn.makeRotationX(e),this.applyMatrix4(vn),this}rotateY(e){return vn.makeRotationY(e),this.applyMatrix4(vn),this}rotateZ(e){return vn.makeRotationZ(e),this.applyMatrix4(vn),this}translate(e,t,n){return vn.makeTranslation(e,t,n),this.applyMatrix4(vn),this}scale(e,t,n){return vn.makeScale(e,t,n),this.applyMatrix4(vn),this}lookAt(e){return ah.lookAt(e),ah.updateMatrix(),this.applyMatrix4(ah.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bs).negate(),this.translate(Bs.x,Bs.y,Bs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new mt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ge("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];hn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,hn.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,hn.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(hn.min),this.boundingBox.expandByPoint(hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){let n=this.boundingSphere.center;if(hn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];zr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ft.addVectors(hn.min,zr.min),hn.expandByPoint(Ft),Ft.addVectors(hn.max,zr.max),hn.expandByPoint(Ft)):(hn.expandByPoint(zr.min),hn.expandByPoint(zr.max))}hn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Ft.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ft));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ft.fromBufferAttribute(a,l),c&&(Bs.fromBufferAttribute(e,l),Ft.add(Bs)),s=Math.max(s,n.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new vt(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],c=[];for(let x=0;x<n.count;x++)a[x]=new U,c[x]=new U;let l=new U,h=new U,u=new U,f=new ue,d=new ue,m=new ue,y=new U,g=new U;function p(x,T,N){l.fromBufferAttribute(n,x),h.fromBufferAttribute(n,T),u.fromBufferAttribute(n,N),f.fromBufferAttribute(r,x),d.fromBufferAttribute(r,T),m.fromBufferAttribute(r,N),h.sub(l),u.sub(l),d.sub(f),m.sub(f);let C=1/(d.x*m.y-m.x*d.y);isFinite(C)&&(y.copy(h).multiplyScalar(m.y).addScaledVector(u,-d.y).multiplyScalar(C),g.copy(u).multiplyScalar(d.x).addScaledVector(h,-m.x).multiplyScalar(C),a[x].add(y),a[T].add(y),a[N].add(y),c[x].add(g),c[T].add(g),c[N].add(g))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let x=0,T=E.length;x<T;++x){let N=E[x],C=N.start,D=N.count;for(let F=C,W=C+D;F<W;F+=3)p(e.getX(F+0),e.getX(F+1),e.getX(F+2))}let M=new U,_=new U,S=new U,w=new U;function R(x){S.fromBufferAttribute(s,x),w.copy(S);let T=a[x];M.copy(T),M.sub(S.multiplyScalar(S.dot(T))).normalize(),_.crossVectors(w,T);let C=_.dot(c[x])<0?-1:1;o.setXYZW(x,M.x,M.y,M.z,C)}for(let x=0,T=E.length;x<T;++x){let N=E[x],C=N.start,D=N.count;for(let F=C,W=C+D;F<W;F+=3)R(e.getX(F+0)),R(e.getX(F+1)),R(e.getX(F+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new vt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let s=new U,r=new U,o=new U,a=new U,c=new U,l=new U,h=new U,u=new U;if(e)for(let f=0,d=e.count;f<d;f+=3){let m=e.getX(f+0),y=e.getX(f+1),g=e.getX(f+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,y),o.fromBufferAttribute(t,g),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ft.fromBufferAttribute(e,t),Ft.normalize(),e.setXYZ(t,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h),d=0,m=0;for(let y=0,g=c.length;y<g;y++){a.isInterleavedBufferAttribute?d=c[y]*a.data.stride+a.offset:d=c[y]*h;for(let p=0;p<h;p++)f[m++]=l[d++]}return new vt(f,h,u)}if(this.index===null)return Ge("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let f=l[h],d=e(f,n);c.push(d)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let d=l[u];h.push(d.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},ro=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ba,this.updateRanges=[],this.version=0,this.uuid=Zn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Jt=new U,dn=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix4(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyNormalMatrix(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.transformDirection(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Tn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ut(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Tn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Tn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Tn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Tn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array),r=ut(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){eo("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new vt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){eo("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Og=0,jn=class extends $n{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Og++}),this.uuid=Zn(),this.name="",this.type="Material",this.blending=hs,this.side=_i,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ca,this.blendDst=Ia,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ve(0,0,0),this.blendAlpha=0,this.depthFunc=us,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Eh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=cs,this.stencilZFail=cs,this.stencilZPass=cs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ge(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ge(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==hs&&(n.blending=this.blending),this.side!==_i&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ca&&(n.blendSrc=this.blendSrc),this.blendDst!==Ia&&(n.blendDst=this.blendDst),this.blendEquation!==Fi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==us&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Eh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==cs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==cs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==cs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ve().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ue().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ue().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},nr=class extends jn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ve(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},zs,kr=new U,ks=new U,Vs=new U,Hs=new ue,Vr=new ue,fp=new tt,oa=new U,Hr=new U,aa=new U,nd=new ue,ch=new ue,id=new ue,oo=class extends It{constructor(e=new nr){if(super(),this.isSprite=!0,this.type="Sprite",zs===void 0){zs=new Pt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ro(t,5);zs.setIndex([0,1,2,0,2,3]),zs.setAttribute("position",new dn(n,3,0,!1)),zs.setAttribute("uv",new dn(n,2,3,!1))}this.geometry=zs,this.material=e,this.center=new ue(.5,.5),this.count=1}raycast(e,t){e.camera===null&&qe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ks.setFromMatrixScale(this.matrixWorld),fp.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Vs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ks.multiplyScalar(-Vs.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;ca(oa.set(-.5,-.5,0),Vs,o,ks,s,r),ca(Hr.set(.5,-.5,0),Vs,o,ks,s,r),ca(aa.set(.5,.5,0),Vs,o,ks,s,r),nd.set(0,0),ch.set(1,0),id.set(1,1);let a=e.ray.intersectTriangle(oa,Hr,aa,!1,kr);if(a===null&&(ca(Hr.set(-.5,.5,0),Vs,o,ks,s,r),ch.set(0,1),a=e.ray.intersectTriangle(oa,aa,Hr,!1,kr),a===null))return;let c=e.ray.origin.distanceTo(kr);c<e.near||c>e.far||t.push({distance:c,point:kr.clone(),uv:gi.getInterpolation(kr,oa,Hr,aa,nd,ch,id,new ue),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function ca(i,e,t,n,s,r){Hs.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Vr.x=r*Hs.x-s*Hs.y,Vr.y=s*Hs.x+r*Hs.y):Vr.copy(Hs),i.copy(e),i.x+=Vr.x,i.y+=Vr.y,i.applyMatrix4(fp)}var pi=new U,lh=new U,la=new U,Ui=new U,hh=new U,ha=new U,uh=new U,ir=class{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,pi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=pi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(pi.copy(this.origin).addScaledVector(this.direction,t),pi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){lh.copy(e).add(t).multiplyScalar(.5),la.copy(t).sub(e).normalize(),Ui.copy(this.origin).sub(lh);let r=e.distanceTo(t)*.5,o=-this.direction.dot(la),a=Ui.dot(this.direction),c=-Ui.dot(la),l=Ui.lengthSq(),h=Math.abs(1-o*o),u,f,d,m;if(h>0)if(u=o*c-a,f=o*a-c,m=r*h,u>=0)if(f>=-m)if(f<=m){let y=1/h;u*=y,f*=y,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-m?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=m?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(lh).addScaledVector(la,f),d}intersectSphere(e,t){pi.subVectors(e.center,this.origin);let n=pi.dot(this.direction),s=pi.dot(pi)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,pi)!==null}intersectTriangle(e,t,n,s,r){hh.subVectors(t,e),ha.subVectors(n,e),uh.crossVectors(hh,ha);let o=this.direction.dot(uh),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ui.subVectors(this.origin,e);let c=a*this.direction.dot(ha.crossVectors(Ui,ha));if(c<0)return null;let l=a*this.direction.dot(hh.cross(Ui));if(l<0||c+l>o)return null;let h=-a*Ui.dot(uh);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},sn=class extends jn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vi,this.combine=kh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},sd=new tt,os=new ir,ua=new fn,rd=new U,fa=new U,da=new U,pa=new U,fh=new U,ma=new U,od=new U,ga=new U,St=class extends It{constructor(e=new Pt,t=new sn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){ma.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(fh.fromBufferAttribute(u,e),o?ma.addScaledVector(fh,h):ma.addScaledVector(fh.sub(t),h))}t.add(ma)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ua.copy(n.boundingSphere),ua.applyMatrix4(r),os.copy(e.ray).recast(e.near),!(ua.containsPoint(os.origin)===!1&&(os.intersectSphere(ua,rd)===null||os.origin.distanceToSquared(rd)>(e.far-e.near)**2))&&(sd.copy(r).invert(),os.copy(e.ray).applyMatrix4(sd),!(n.boundingBox!==null&&os.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,os)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,y=f.length;m<y;m++){let g=f[m],p=o[g.materialIndex],E=Math.max(g.start,d.start),M=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let _=E,S=M;_<S;_+=3){let w=a.getX(_),R=a.getX(_+1),x=a.getX(_+2);s=xa(this,p,e,n,l,h,u,w,R,x),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,d.start),y=Math.min(a.count,d.start+d.count);for(let g=m,p=y;g<p;g+=3){let E=a.getX(g),M=a.getX(g+1),_=a.getX(g+2);s=xa(this,o,e,n,l,h,u,E,M,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,y=f.length;m<y;m++){let g=f[m],p=o[g.materialIndex],E=Math.max(g.start,d.start),M=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let _=E,S=M;_<S;_+=3){let w=_,R=_+1,x=_+2;s=xa(this,p,e,n,l,h,u,w,R,x),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,d.start),y=Math.min(c.count,d.start+d.count);for(let g=m,p=y;g<p;g+=3){let E=g,M=g+1,_=g+2;s=xa(this,o,e,n,l,h,u,E,M,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function Fg(i,e,t,n,s,r,o,a){let c;if(e.side===Kt?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===_i,a),c===null)return null;ga.copy(a),ga.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(ga);return l<t.near||l>t.far?null:{distance:l,point:ga.clone(),object:i}}function xa(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,fa),i.getVertexPosition(c,da),i.getVertexPosition(l,pa);let h=Fg(i,e,t,n,fa,da,pa,od);if(h){let u=new U;gi.getBarycoord(od,fa,da,pa,u),s&&(h.uv=gi.getInterpolatedAttribute(s,a,c,l,u,new ue)),r&&(h.uv1=gi.getInterpolatedAttribute(r,a,c,l,u,new ue)),o&&(h.normal=gi.getInterpolatedAttribute(o,a,c,l,u,new U),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new U,materialIndex:0};gi.getNormal(fa,da,pa,f.normal),h.face=f,h.barycoord=u}return h}var ao=class extends Zt{constructor(e=null,t=1,n=1,s,r,o,a,c,l=Dt,h=Dt,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Mi=class extends vt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Gs=new tt,ad=new tt,_a=[],cd=new wt,Bg=new tt,Gr=new St,Wr=new fn,sr=class extends St{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Mi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Bg)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new wt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Gs),cd.copy(e.boundingBox).applyMatrix4(Gs),this.boundingBox.union(cd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new fn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Gs),Wr.copy(e.boundingSphere).applyMatrix4(Gs),this.boundingSphere.union(Wr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Gr.geometry=this.geometry,Gr.material=this.material,Gr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Wr.copy(this.boundingSphere),Wr.applyMatrix4(n),e.ray.intersectsSphere(Wr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Gs),ad.multiplyMatrices(n,Gs),Gr.matrixWorld=ad,Gr.raycast(e,_a);for(let o=0,a=_a.length;o<a;o++){let c=_a[o];c.instanceId=r,c.object=this,t.push(c)}_a.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Mi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new ao(new Float32Array(s*this.count),s,this.count,xc,Sn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;return r[c]=a,r.set(n,c+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},dh=new U,zg=new U,kg=new We,Xt=class{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=dh.subVectors(n,t).cross(zg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(dh),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||kg.getNormalMatrix(e),s=this.coplanarPoint(dh).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},as=new fn,Vg=new ue(.5,.5),ya=new U,rr=class{constructor(e=new Xt,t=new Xt,n=new Xt,s=new Xt,r=new Xt,o=new Xt){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=An,n=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],m=r[8],y=r[9],g=r[10],p=r[11],E=r[12],M=r[13],_=r[14],S=r[15];if(s[0].setComponents(l-o,d-h,p-m,S-E).normalize(),s[1].setComponents(l+o,d+h,p+m,S+E).normalize(),s[2].setComponents(l+a,d+u,p+y,S+M).normalize(),s[3].setComponents(l-a,d-u,p-y,S-M).normalize(),n)s[4].setComponents(c,f,g,_).normalize(),s[5].setComponents(l-c,d-f,p-g,S-_).normalize();else if(s[4].setComponents(l-c,d-f,p-g,S-_).normalize(),t===An)s[5].setComponents(l+c,d+f,p+g,S+_).normalize();else if(t===$s)s[5].setComponents(c,f,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),as.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),as.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(as)}intersectsSprite(e){as.center.set(0,0,0);let t=Vg.distanceTo(e.center);return as.radius=.7071067811865476+t,as.applyMatrix4(e.matrixWorld),this.intersectsSphere(as)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(ya.x=s.normal.x>0?e.max.x:e.min.x,ya.y=s.normal.y>0?e.max.y:e.min.y,ya.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ya)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var zi=class extends jn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ve(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Va=new U,Ha=new U,ld=new tt,Xr=new ir,va=new fn,ph=new U,hd=new U,ds=class extends It{constructor(e=new Pt,t=new zi){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Va.fromBufferAttribute(t,s-1),Ha.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Va.distanceTo(Ha);e.setAttribute("lineDistance",new mt(n,1))}else Ge("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),va.copy(n.boundingSphere),va.applyMatrix4(s),va.radius+=r,e.ray.intersectsSphere(va)===!1)return;ld.copy(s).invert(),Xr.copy(e.ray).applyMatrix4(ld);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){let d=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let y=d,g=m-1;y<g;y+=l){let p=h.getX(y),E=h.getX(y+1),M=Ma(this,e,Xr,c,p,E,y);M&&t.push(M)}if(this.isLineLoop){let y=h.getX(m-1),g=h.getX(d),p=Ma(this,e,Xr,c,y,g,m-1);p&&t.push(p)}}else{let d=Math.max(0,o.start),m=Math.min(f.count,o.start+o.count);for(let y=d,g=m-1;y<g;y+=l){let p=Ma(this,e,Xr,c,y,y+1,y);p&&t.push(p)}if(this.isLineLoop){let y=Ma(this,e,Xr,c,m-1,d,m-1);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Ma(i,e,t,n,s,r,o){let a=i.geometry.attributes.position;if(Va.fromBufferAttribute(a,s),Ha.fromBufferAttribute(a,r),t.distanceSqToSegment(Va,Ha,ph,hd)>n)return;ph.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(ph);if(!(l<e.near||l>e.far))return{distance:l,point:hd.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var ud=new U,fd=new U,or=class extends ds{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)ud.fromBufferAttribute(t,s),fd.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+ud.distanceTo(fd);e.setAttribute("lineDistance",new mt(n,1))}else Ge("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var ki=class extends Zt{constructor(e,t,n,s,r,o,a,c,l,h,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}};var co=class extends Zt{constructor(e=[],t=qi,n,s,r,o,a,c,l,h){super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Cn=class extends Zt{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Si=class extends Zt{constructor(e,t,n=Ln,s,r,o,a=Dt,c=Dt,l,h=Jn,u=1){if(h!==Jn&&h!==Zi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:u};super(f,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new yi(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Ga=class extends Si{constructor(e,t=Ln,n=qi,s,r,o=Dt,a=Dt,c,l=Jn){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,s,r,o,a,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},lo=class extends Zt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ar=class i extends Pt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],f=0,d=0;m("z","y","x",-1,-1,n,t,e,o,r,0),m("z","y","x",1,-1,n,t,-e,o,r,1),m("x","z","y",1,1,e,n,t,s,o,2),m("x","z","y",1,-1,e,n,-t,s,o,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new mt(l,3)),this.setAttribute("normal",new mt(h,3)),this.setAttribute("uv",new mt(u,2));function m(y,g,p,E,M,_,S,w,R,x,T){let N=_/R,C=S/x,D=_/2,F=S/2,W=w/2,k=R+1,j=x+1,X=0,G=0,le=new U;for(let he=0;he<j;he++){let _e=he*C-F;for(let ye=0;ye<k;ye++){let Be=ye*N-D;le[y]=Be*E,le[g]=_e*M,le[p]=W,l.push(le.x,le.y,le.z),le[y]=0,le[g]=0,le[p]=w>0?1:-1,h.push(le.x,le.y,le.z),u.push(ye/R),u.push(1-he/x),X+=1}}for(let he=0;he<x;he++)for(let _e=0;_e<R;_e++){let ye=f+_e+k*he,Be=f+_e+k*(he+1),Je=f+(_e+1)+k*(he+1),Ze=f+(_e+1)+k*he;c.push(ye,Be,Ze),c.push(Be,Je,Ze),G+=6}a.addGroup(d,G,T),d+=G,f+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var pn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ge("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let h=n[s],f=n[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=t||(o.isVector2?new ue:new U);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new U,s=[],r=[],o=[],a=new U,c=new tt;for(let d=0;d<=e;d++){let m=d/e;s[d]=this.getTangentAt(m,new U)}r[0]=new U,o[0]=new U;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos($e(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,m))}o[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos($e(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(d=-d);for(let m=1;m<=e;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],d*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},cr=class extends pn{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new ue){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Wa=class extends cr{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function nu(){let i=0,e=0,t=0,n=0;function s(r,o,a,c){i=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let f=(o-r)/l-(a-r)/(l+h)+(a-o)/h,d=(a-o)/h-(c-o)/(h+u)+(c-a)/u;f*=h,d*=h,s(o,a,f,d)},calc:function(r){let o=r*r,a=o*r;return i+e*r+t*o+n*a}}}var dd=new U,pd=new U,mh=new nu,gh=new nu,xh=new nu,Xa=class extends pn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new U){let n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(pd.subVectors(s[0],s[1]).add(s[0]),l=pd);let u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(dd.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=dd),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,m=Math.pow(l.distanceToSquared(u),d),y=Math.pow(u.distanceToSquared(f),d),g=Math.pow(f.distanceToSquared(h),d);y<1e-4&&(y=1),m<1e-4&&(m=y),g<1e-4&&(g=y),mh.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,m,y,g),gh.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,m,y,g),xh.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,m,y,g)}else this.curveType==="catmullrom"&&(mh.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),gh.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),xh.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return n.set(mh.calc(c),gh.calc(c),xh.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new U().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function md(i,e,t,n,s){let r=(n-e)*.5,o=(s-t)*.5,a=i*i,c=i*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*i+t}function Hg(i,e){let t=1-i;return t*t*e}function Gg(i,e){return 2*(1-i)*i*e}function Wg(i,e){return i*i*e}function Jr(i,e,t,n){return Hg(i,e)+Gg(i,t)+Wg(i,n)}function Xg(i,e){let t=1-i;return t*t*t*e}function qg(i,e){let t=1-i;return 3*t*t*i*e}function Zg(i,e){return 3*(1-i)*i*i*e}function Yg(i,e){return i*i*i*e}function $r(i,e,t,n,s){return Xg(i,e)+qg(i,t)+Zg(i,n)+Yg(i,s)}var ho=class extends pn{constructor(e=new ue,t=new ue,n=new ue,s=new ue){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ue){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set($r(e,s.x,r.x,o.x,a.x),$r(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},qa=class extends pn{constructor(e=new U,t=new U,n=new U,s=new U){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new U){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set($r(e,s.x,r.x,o.x,a.x),$r(e,s.y,r.y,o.y,a.y),$r(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},uo=class extends pn{constructor(e=new ue,t=new ue){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ue){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ue){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Za=class extends pn{constructor(e=new U,t=new U){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new U){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new U){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},fo=class extends pn{constructor(e=new ue,t=new ue,n=new ue){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ue){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Jr(e,s.x,r.x,o.x),Jr(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ya=class extends pn{constructor(e=new U,t=new U,n=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new U){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Jr(e,s.x,r.x,o.x),Jr(e,s.y,r.y,o.y),Jr(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},po=class extends pn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ue){let n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(md(a,c.x,l.x,h.x,u.x),md(a,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new ue().fromArray(s))}return this}},wh=Object.freeze({__proto__:null,ArcCurve:Wa,CatmullRomCurve3:Xa,CubicBezierCurve:ho,CubicBezierCurve3:qa,EllipseCurve:cr,LineCurve:uo,LineCurve3:Za,QuadraticBezierCurve:fo,QuadraticBezierCurve3:Ya,SplineCurve:po}),Ja=class extends pn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new wh[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new wh[s.type]().fromJSON(s))}return this}},Qn=class extends Ja{constructor(e){super(),this.type="Path",this.currentPoint=new ue,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new uo(this.currentPoint.clone(),new ue(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new fo(this.currentPoint.clone(),new ue(e,t),new ue(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){let a=new ho(this.currentPoint.clone(),new ue(e,t),new ue(n,s),new ue(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new po(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,r,o,a,c),this}absellipse(e,t,n,s,r,o,a,c){let l=new cr(e,t,n,s,r,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},mo=class extends Qn{constructor(e){super(e),this.uuid=Zn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new Qn().fromJSON(s))}return this}};function Jg(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=dp(i,0,s,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(n&&(r=e0(i,e,r,t)),i.length>80*t){a=i[0],c=i[1];let h=a,u=c;for(let f=t;f<s;f+=t){let d=i[f],m=i[f+1];d<a&&(a=d),m<c&&(c=m),d>h&&(h=d),m>u&&(u=m)}l=Math.max(h-a,u-c),l=l!==0?32767/l:0}return go(r,o,t,a,c,l,0),o}function dp(i,e,t,n,s){let r;if(s===u0(i,e,t,n)>0)for(let o=e;o<t;o+=n)r=gd(o/n|0,i[o],i[o+1],r);else for(let o=t-n;o>=e;o-=n)r=gd(o/n|0,i[o],i[o+1],r);return r&&lr(r,r.next)&&(_o(r),r=r.next),r}function ps(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(lr(t,t.next)||Mt(t.prev,t,t.next)===0)){if(_o(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function go(i,e,t,n,s,r,o){if(!i)return;!o&&r&&r0(i,n,s,r);let a=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?Kg(i,n,s,r):$g(i)){e.push(c.i,i.i,l.i),_o(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=jg(ps(i),e),go(i,e,t,n,s,r,2)):o===2&&Qg(i,e,t,n,s,r):go(ps(i),e,t,n,s,r,1);break}}}function $g(i){let e=i.prev,t=i,n=i.next;if(Mt(e,t,n)>=0)return!1;let s=e.x,r=t.x,o=n.x,a=e.y,c=t.y,l=n.y,h=Math.min(s,r,o),u=Math.min(a,c,l),f=Math.max(s,r,o),d=Math.max(a,c,l),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=f&&m.y>=u&&m.y<=d&&qr(s,a,r,c,o,l,m.x,m.y)&&Mt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Kg(i,e,t,n){let s=i.prev,r=i,o=i.next;if(Mt(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,f=o.y,d=Math.min(a,c,l),m=Math.min(h,u,f),y=Math.max(a,c,l),g=Math.max(h,u,f),p=Th(d,m,e,t,n),E=Th(y,g,e,t,n),M=i.prevZ,_=i.nextZ;for(;M&&M.z>=p&&_&&_.z<=E;){if(M.x>=d&&M.x<=y&&M.y>=m&&M.y<=g&&M!==s&&M!==o&&qr(a,h,c,u,l,f,M.x,M.y)&&Mt(M.prev,M,M.next)>=0||(M=M.prevZ,_.x>=d&&_.x<=y&&_.y>=m&&_.y<=g&&_!==s&&_!==o&&qr(a,h,c,u,l,f,_.x,_.y)&&Mt(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;M&&M.z>=p;){if(M.x>=d&&M.x<=y&&M.y>=m&&M.y<=g&&M!==s&&M!==o&&qr(a,h,c,u,l,f,M.x,M.y)&&Mt(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;_&&_.z<=E;){if(_.x>=d&&_.x<=y&&_.y>=m&&_.y<=g&&_!==s&&_!==o&&qr(a,h,c,u,l,f,_.x,_.y)&&Mt(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function jg(i,e){let t=i;do{let n=t.prev,s=t.next.next;!lr(n,s)&&mp(n,t,t.next,s)&&xo(n,s)&&xo(s,n)&&(e.push(n.i,t.i,s.i),_o(t),_o(t.next),t=i=s),t=t.next}while(t!==i);return ps(t)}function Qg(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&c0(o,a)){let c=gp(o,a);o=ps(o,o.next),c=ps(c,c.next),go(o,e,t,n,s,r,0),go(c,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function e0(i,e,t,n){let s=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,c=r<o-1?e[r+1]*n:i.length,l=dp(i,a,c,n,!1);l===l.next&&(l.steiner=!0),s.push(a0(l))}s.sort(t0);for(let r=0;r<s.length;r++)t=n0(s[r],t);return t}function t0(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function n0(i,e){let t=i0(i,e);if(!t)return e;let n=gp(t,i);return ps(n,n.next),ps(t,t.next)}function i0(i,e){let t=e,n=i.x,s=i.y,r=-1/0,o;if(lr(i,t))return t;do{if(lr(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let u=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,c=o.x,l=o.y,h=1/0;t=o;do{if(n>=t.x&&t.x>=c&&n!==t.x&&pp(s<l?n:r,s,c,l,s<l?r:n,s,t.x,t.y)){let u=Math.abs(s-t.y)/(n-t.x);xo(t,i)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&s0(o,t)))&&(o=t,h=u)}t=t.next}while(t!==a);return o}function s0(i,e){return Mt(i.prev,i,e.prev)<0&&Mt(e.next,i,i.next)<0}function r0(i,e,t,n){let s=i;do s.z===0&&(s.z=Th(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,o0(s)}function o0(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let l=0;l<t&&(a++,o=o.nextZ,!!o);l++);let c=t;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,t*=2}while(e>1);return i}function Th(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function a0(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function pp(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function qr(i,e,t,n,s,r,o,a){return!(i===o&&e===a)&&pp(i,e,t,n,s,r,o,a)}function c0(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!l0(i,e)&&(xo(i,e)&&xo(e,i)&&h0(i,e)&&(Mt(i.prev,i,e.prev)||Mt(i,e.prev,e))||lr(i,e)&&Mt(i.prev,i,i.next)>0&&Mt(e.prev,e,e.next)>0)}function Mt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function lr(i,e){return i.x===e.x&&i.y===e.y}function mp(i,e,t,n){let s=ba(Mt(i,e,t)),r=ba(Mt(i,e,n)),o=ba(Mt(t,n,i)),a=ba(Mt(t,n,e));return!!(s!==r&&o!==a||s===0&&Sa(i,t,e)||r===0&&Sa(i,n,e)||o===0&&Sa(t,i,n)||a===0&&Sa(t,e,n))}function Sa(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function ba(i){return i>0?1:i<0?-1:0}function l0(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&mp(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function xo(i,e){return Mt(i.prev,i,i.next)<0?Mt(i,e,i.next)>=0&&Mt(i,i.prev,e)>=0:Mt(i,e,i.prev)<0||Mt(i,i.next,e)<0}function h0(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function gp(i,e){let t=Ah(i.i,i.x,i.y),n=Ah(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function gd(i,e,t,n){let s=Ah(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function _o(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Ah(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function u0(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Rh=class{static triangulate(e,t,n=2){return Jg(e,t,n)}},qn=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];xd(e),_d(n,e);let o=e.length;t.forEach(xd);for(let c=0;c<t.length;c++)s.push(o),o+=t[c].length,_d(n,t[c]);let a=Rh.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function xd(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function _d(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var yo=class i extends Pt{constructor(e=new mo([new ue(.5,.5),new ue(-.5,.5),new ue(-.5,-.5),new ue(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let a=0,c=e.length;a<c;a++){let l=e[a];o(l)}this.setAttribute("position",new mt(s,3)),this.setAttribute("uv",new mt(r,2)),this.computeVertexNormals();function o(a){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:d-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,E=t.UVGenerator!==void 0?t.UVGenerator:f0,M,_=!1,S,w,R,x;if(p){M=p.getSpacedPoints(h),_=!0,f=!1;let I=p.isCatmullRomCurve3?p.closed:!1;S=p.computeFrenetFrames(h,I),w=new U,R=new U,x=new U}f||(g=0,d=0,m=0,y=0);let T=a.extractPoints(l),N=T.shape,C=T.holes;if(!qn.isClockWise(N)){N=N.reverse();for(let I=0,H=C.length;I<H;I++){let B=C[I];qn.isClockWise(B)&&(C[I]=B.reverse())}}function F(I){let B=10000000000000001e-36,K=I[0];for(let ee=1;ee<=I.length;ee++){let oe=ee%I.length,me=I[oe],ge=me.x-K.x,Z=me.y-K.y,b=ge*ge+Z*Z,Ie=Math.max(Math.abs(me.x),Math.abs(me.y),Math.abs(K.x),Math.abs(K.y)),De=B*Ie*Ie;if(b<=De){I.splice(oe,1),ee--;continue}K=me}}F(N),C.forEach(F);let W=C.length,k=N;for(let I=0;I<W;I++){let H=C[I];N=N.concat(H)}function j(I,H,B){return H||qe("ExtrudeGeometry: vec does not exist"),I.clone().addScaledVector(H,B)}let X=N.length;function G(I,H,B){let K,ee,oe,me=I.x-H.x,ge=I.y-H.y,Z=B.x-I.x,b=B.y-I.y,Ie=me*me+ge*ge,De=me*b-ge*Z;if(Math.abs(De)>Number.EPSILON){let P=Math.sqrt(Ie),v=Math.sqrt(Z*Z+b*b),J=H.x-ge/P,Q=H.y+me/P,se=B.x-b/v,ve=B.y+Z/v,Me=((se-J)*b-(ve-Q)*Z)/(me*b-ge*Z);K=J+me*Me-I.x,ee=Q+ge*Me-I.y;let ae=K*K+ee*ee;if(ae<=2)return new ue(K,ee);oe=Math.sqrt(ae/2)}else{let P=!1;me>Number.EPSILON?Z>Number.EPSILON&&(P=!0):me<-Number.EPSILON?Z<-Number.EPSILON&&(P=!0):Math.sign(ge)===Math.sign(b)&&(P=!0),P?(K=-ge,ee=me,oe=Math.sqrt(Ie)):(K=me,ee=ge,oe=Math.sqrt(Ie/2))}return new ue(K/oe,ee/oe)}let le=[];for(let I=0,H=k.length,B=H-1,K=I+1;I<H;I++,B++,K++)B===H&&(B=0),K===H&&(K=0),le[I]=G(k[I],k[B],k[K]);let he=[],_e,ye=le.concat();for(let I=0,H=W;I<H;I++){let B=C[I];_e=[];for(let K=0,ee=B.length,oe=ee-1,me=K+1;K<ee;K++,oe++,me++)oe===ee&&(oe=0),me===ee&&(me=0),_e[K]=G(B[K],B[oe],B[me]);he.push(_e),ye=ye.concat(_e)}let Be;if(g===0)Be=qn.triangulateShape(k,C);else{let I=[],H=[];for(let B=0;B<g;B++){let K=B/g,ee=d*Math.cos(K*Math.PI/2),oe=m*Math.sin(K*Math.PI/2)+y;for(let me=0,ge=k.length;me<ge;me++){let Z=j(k[me],le[me],oe);O(Z.x,Z.y,-ee),K===0&&I.push(Z)}for(let me=0,ge=W;me<ge;me++){let Z=C[me];_e=he[me];let b=[];for(let Ie=0,De=Z.length;Ie<De;Ie++){let P=j(Z[Ie],_e[Ie],oe);O(P.x,P.y,-ee),K===0&&b.push(P)}K===0&&H.push(b)}}Be=qn.triangulateShape(I,H)}let Je=Be.length,Ze=m+y;for(let I=0;I<X;I++){let H=f?j(N[I],ye[I],Ze):N[I];_?(R.copy(S.normals[0]).multiplyScalar(H.x),w.copy(S.binormals[0]).multiplyScalar(H.y),x.copy(M[0]).add(R).add(w),O(x.x,x.y,x.z)):O(H.x,H.y,0)}for(let I=1;I<=h;I++)for(let H=0;H<X;H++){let B=f?j(N[H],ye[H],Ze):N[H];_?(R.copy(S.normals[I]).multiplyScalar(B.x),w.copy(S.binormals[I]).multiplyScalar(B.y),x.copy(M[I]).add(R).add(w),O(x.x,x.y,x.z)):O(B.x,B.y,u/h*I)}for(let I=g-1;I>=0;I--){let H=I/g,B=d*Math.cos(H*Math.PI/2),K=m*Math.sin(H*Math.PI/2)+y;for(let ee=0,oe=k.length;ee<oe;ee++){let me=j(k[ee],le[ee],K);O(me.x,me.y,u+B)}for(let ee=0,oe=C.length;ee<oe;ee++){let me=C[ee];_e=he[ee];for(let ge=0,Z=me.length;ge<Z;ge++){let b=j(me[ge],_e[ge],K);_?O(b.x,b.y+M[h-1].y,M[h-1].x+B):O(b.x,b.y,u+B)}}}ce(),Y();function ce(){let I=s.length/3;if(f){let H=0,B=X*H;for(let K=0;K<Je;K++){let ee=Be[K];L(ee[2]+B,ee[1]+B,ee[0]+B)}H=h+g*2,B=X*H;for(let K=0;K<Je;K++){let ee=Be[K];L(ee[0]+B,ee[1]+B,ee[2]+B)}}else{for(let H=0;H<Je;H++){let B=Be[H];L(B[2],B[1],B[0])}for(let H=0;H<Je;H++){let B=Be[H];L(B[0]+X*h,B[1]+X*h,B[2]+X*h)}}n.addGroup(I,s.length/3-I,0)}function Y(){let I=s.length/3,H=0;z(k,H),H+=k.length;for(let B=0,K=C.length;B<K;B++){let ee=C[B];z(ee,H),H+=ee.length}n.addGroup(I,s.length/3-I,1)}function z(I,H){let B=I.length;for(;--B>=0;){let K=B,ee=B-1;ee<0&&(ee=I.length-1);for(let oe=0,me=h+g*2;oe<me;oe++){let ge=X*oe,Z=X*(oe+1),b=H+K+ge,Ie=H+ee+ge,De=H+ee+Z,P=H+K+Z;V(b,Ie,De,P)}}}function O(I,H,B){c.push(I),c.push(H),c.push(B)}function L(I,H,B){re(I),re(H),re(B);let K=s.length/3,ee=E.generateTopUV(n,s,K-3,K-2,K-1);de(ee[0]),de(ee[1]),de(ee[2])}function V(I,H,B,K){re(I),re(H),re(K),re(H),re(B),re(K);let ee=s.length/3,oe=E.generateSideWallUV(n,s,ee-6,ee-3,ee-2,ee-1);de(oe[0]),de(oe[1]),de(oe[3]),de(oe[1]),de(oe[2]),de(oe[3])}function re(I){s.push(c[I*3+0]),s.push(c[I*3+1]),s.push(c[I*3+2])}function de(I){r.push(I.x),r.push(I.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return d0(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,o=e.shapes.length;r<o;r++){let a=t[e.shapes[r]];n.push(a)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new wh[s.type]().fromJSON(s)),new i(n,e.options)}},f0={generateTopUV:function(i,e,t,n,s){let r=e[t*3],o=e[t*3+1],a=e[n*3],c=e[n*3+1],l=e[s*3],h=e[s*3+1];return[new ue(r,o),new ue(a,c),new ue(l,h)]},generateSideWallUV:function(i,e,t,n,s,r){let o=e[t*3],a=e[t*3+1],c=e[t*3+2],l=e[n*3],h=e[n*3+1],u=e[n*3+2],f=e[s*3],d=e[s*3+1],m=e[s*3+2],y=e[r*3],g=e[r*3+1],p=e[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new ue(o,1-c),new ue(l,1-u),new ue(f,1-m),new ue(y,1-p)]:[new ue(a,1-c),new ue(h,1-u),new ue(d,1-m),new ue(g,1-p)]}};function d0(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var bi=class i extends Pt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=e/a,f=t/c,d=[],m=[],y=[],g=[];for(let p=0;p<h;p++){let E=p*f-o;for(let M=0;M<l;M++){let _=M*u-r;m.push(_,-E,0),y.push(0,0,1),g.push(M/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let E=0;E<a;E++){let M=E+l*p,_=E+l*(p+1),S=E+1+l*(p+1),w=E+1+l*p;d.push(M,_,w),d.push(_,S,w)}this.setIndex(d),this.setAttribute("position",new mt(m,3)),this.setAttribute("normal",new mt(y,3)),this.setAttribute("uv",new mt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var vo=class i extends Pt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new U,f=new U,d=[],m=[],y=[],g=[];for(let p=0;p<=n;p++){let E=[],M=p/n,_=o+M*a,S=e*Math.cos(_),w=Math.sqrt(e*e-S*S),R=0;p===0&&o===0?R=.5/t:p===n&&c===Math.PI&&(R=-.5/t);for(let x=0;x<=t;x++){let T=x/t,N=s+T*r;u.x=-w*Math.cos(N),u.y=S,u.z=w*Math.sin(N),m.push(u.x,u.y,u.z),f.copy(u).normalize(),y.push(f.x,f.y,f.z),g.push(T+R,1-M),E.push(l++)}h.push(E)}for(let p=0;p<n;p++)for(let E=0;E<t;E++){let M=h[p][E+1],_=h[p][E],S=h[p+1][E],w=h[p+1][E+1];(p!==0||o>0)&&d.push(M,_,w),(p!==n-1||c<Math.PI)&&d.push(_,S,w)}this.setIndex(d),this.setAttribute("position",new mt(m,3)),this.setAttribute("normal",new mt(y,3)),this.setAttribute("uv",new mt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Mo=class extends Pt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,s=new U,r=new U;if(e.index!==null){let o=e.attributes.position,a=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:a.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){let u=c[l],f=u.start,d=u.count;for(let m=f,y=f+d;m<y;m+=3)for(let g=0;g<3;g++){let p=a.getX(m+g),E=a.getX(m+(g+1)%3);s.fromBufferAttribute(o,p),r.fromBufferAttribute(o,E),yd(s,r,n)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}}else{let o=e.attributes.position;for(let a=0,c=o.count/3;a<c;a++)for(let l=0;l<3;l++){let h=3*a+l,u=3*a+(l+1)%3;s.fromBufferAttribute(o,h),r.fromBufferAttribute(o,u),yd(s,r,n)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new mt(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function yd(i,e,t){let n=`${i.x},${i.y},${i.z}-${e.x},${e.y},${e.z}`,s=`${e.x},${e.y},${e.z}-${i.x},${i.y},${i.z}`;return t.has(n)===!0||t.has(s)===!0?!1:(t.add(n),t.add(s),!0)}function _s(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(vd(s))s.isRenderTargetTexture?(Ge("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(vd(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Yt(i){let e={};for(let t=0;t<i.length;t++){let n=_s(i[t]);for(let s in n)e[s]=n[s]}return e}function vd(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function p0(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function iu(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:it.workingColorSpace}var zo={clone:_s,merge:Yt},m0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,g0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,$t=class extends jn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=m0,this.fragmentShader=g0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=_s(e.uniforms),this.uniformsGroups=p0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Ve().setHex(s.value);break;case"v2":this.uniforms[n].value=new ue().fromArray(s.value);break;case"v3":this.uniforms[n].value=new U().fromArray(s.value);break;case"v4":this.uniforms[n].value=new at().fromArray(s.value);break;case"m3":this.uniforms[n].value=new We().fromArray(s.value);break;case"m4":this.uniforms[n].value=new tt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},$a=class extends $t{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},So=class extends jn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Kc,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Ka=class extends jn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Qd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ja=class extends jn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ea(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}var Vi=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Qa=class extends Vi{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Mh,endingEnd:Mh}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Sh:r=e,a=2*t-n;break;case bh:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Sh:o=e,c=2*n-t;break;case bh:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,m=(n-t)/(s-t),y=m*m,g=y*m,p=-f*g+2*f*y-f*m,E=(1+f)*g+(-1.5-2*f)*y+(-.5+f)*m+1,M=(-1-d)*g+(1.5+d)*y+.5*m,_=d*g-d*y;for(let S=0;S!==a;++S)r[S]=p*o[h+S]+E*o[l+S]+M*o[c+S]+_*o[u+S];return r}},ec=class extends Vi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(s-t),u=1-h;for(let f=0;f!==a;++f)r[f]=o[l+f]*u+o[c+f]*h;return r}},tc=class extends Vi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},nc=class extends Vi{interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let m=(n-t)/(s-t),y=1-m;for(let g=0;g!==a;++g)r[g]=o[l+g]*y+o[c+g]*m;return r}let f=a*2,d=e-1;for(let m=0;m!==a;++m){let y=o[l+m],g=o[c+m],p=d*f+m*2,E=u[p],M=u[p+1],_=e*f+m*2,S=h[_],w=h[_+1],R=(n-t)/(s-t),x,T,N,C,D;for(let F=0;F<8;F++){x=R*R,T=x*R,N=1-R,C=N*N,D=C*N;let k=D*t+3*C*R*E+3*N*x*S+T*s-n;if(Math.abs(k)<1e-10)break;let j=3*C*(E-t)+6*N*R*(S-E)+3*x*(s-S);if(Math.abs(j)<1e-10)break;R=R-k/j,R=Math.max(0,Math.min(1,R))}r[m]=D*y+3*C*R*M+3*N*x*w+T*g}return r}},mn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ea(t,this.TimeBufferType),this.values=Ea(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ea(e.times,Array),values:Ea(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new tc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ec(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Qa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new nc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case fs:t=this.InterpolantFactoryMethodDiscrete;break;case Js:t=this.InterpolantFactoryMethodLinear;break;case Ra:t=this.InterpolantFactoryMethodSmooth;break;case vh:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ge("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return fs;case this.InterpolantFactoryMethodLinear:return Js;case this.InterpolantFactoryMethodSmooth:return Ra;case this.InterpolantFactoryMethodBezier:return vh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(qe("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(qe("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){qe("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){qe("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&og(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){qe("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ra,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(s)c=!0;else{let u=a*n,f=u-n,d=u+n;for(let m=0;m!==n;++m){let y=t[u+m];if(y!==t[f+m]||y!==t[d+m]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let u=a*n,f=o*n;for(let d=0;d!==n;++d)t[f+d]=t[u+d]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};mn.prototype.ValueTypeName="";mn.prototype.TimeBufferType=Float32Array;mn.prototype.ValueBufferType=Float32Array;mn.prototype.DefaultInterpolation=Js;var Hi=class extends mn{constructor(e,t,n){super(e,t,n)}};Hi.prototype.ValueTypeName="bool";Hi.prototype.ValueBufferType=Array;Hi.prototype.DefaultInterpolation=fs;Hi.prototype.InterpolantFactoryMethodLinear=void 0;Hi.prototype.InterpolantFactoryMethodSmooth=void 0;var ic=class extends mn{constructor(e,t,n,s){super(e,t,n,s)}};ic.prototype.ValueTypeName="color";var sc=class extends mn{constructor(e,t,n,s){super(e,t,n,s)}};sc.prototype.ValueTypeName="number";var rc=class extends Vi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t),l=e*a;for(let h=l+a;l!==h;l+=4)Mn.slerpFlat(r,0,o,l-a,o,l,c);return r}},bo=class extends mn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new rc(this.times,this.values,this.getValueSize(),e)}};bo.prototype.ValueTypeName="quaternion";bo.prototype.InterpolantFactoryMethodSmooth=void 0;var Gi=class extends mn{constructor(e,t,n){super(e,t,n)}};Gi.prototype.ValueTypeName="string";Gi.prototype.ValueBufferType=Array;Gi.prototype.DefaultInterpolation=fs;Gi.prototype.InterpolantFactoryMethodLinear=void 0;Gi.prototype.InterpolantFactoryMethodSmooth=void 0;var oc=class extends mn{constructor(e,t,n,s){super(e,t,n,s)}};oc.prototype.ValueTypeName="vector";var Ch={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(Md(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!Md(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Md(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var ac=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let d=l[u],m=l[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},xp=new ac,ms=class{constructor(e){this.manager=e!==void 0?e:xp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};ms.DEFAULT_MATERIAL_NAME="__DEFAULT";var mi={},Ih=class extends Error{constructor(e,t){super(e),this.response=t}},Eo=class extends ms{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Ch.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(mi[e]!==void 0){mi[e].push({onLoad:t,onProgress:n,onError:s});return}mi[e]=[],mi[e].push({onLoad:t,onProgress:n,onError:s});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Ge("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=mi[e],u=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=f?parseInt(f):0,m=d!==0,y=0,g=new ReadableStream({start(p){E();function E(){u.read().then(({done:M,value:_})=>{if(M)p.close();else{y+=_.byteLength;let S=new ProgressEvent("progress",{lengthComputable:m,loaded:y,total:d});for(let w=0,R=h.length;w<R;w++){let x=h[w];x.onProgress&&x.onProgress(S)}p.enqueue(_),E()}},M=>{p.error(M)})}}});return new Response(g)}else throw new Ih(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a==="")return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),f=u&&u[1]?u[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(m=>d.decode(m))}}}).then(l=>{Ch.add(`file:${e}`,l);let h=mi[e];delete mi[e];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onLoad&&d.onLoad(l)}}).catch(l=>{let h=mi[e];if(h===void 0)throw this.manager.itemError(e),l;delete mi[e];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var wo=class extends It{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ve(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},To=class extends wo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(It.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ve(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},_h=new tt,Sd=new U,bd=new U,Ph=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.mapType=rn,this.map=null,this.mapPass=null,this.matrix=new tt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new rr,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Sd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Sd),bd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(bd),t.updateMatrixWorld(),_h.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_h,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===$s||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(_h)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},wa=new U,Ta=new Mn,Xn=new U,Ao=class extends It{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new tt,this.projectionMatrix=new tt,this.projectionMatrixInverse=new tt,this.coordinateSystem=An,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(wa,Ta,Xn),Xn.x===1&&Xn.y===1&&Xn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(wa,Ta,Xn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(wa,Ta,Xn),Xn.x===1&&Xn.y===1&&Xn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(wa,Ta,Xn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Oi=new U,Ed=new ue,wd=new ue,qt=class extends Ao{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=js*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Zr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return js*2*Math.atan(Math.tan(Zr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z),Oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z)}getViewSize(e,t){return this.getViewBounds(e,Ed,wd),t.subVectors(wd,Ed)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Zr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Wi=class extends Ao{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Lh=class extends Ph{constructor(){super(new Wi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},hr=class extends wo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(It.DEFAULT_UP),this.updateMatrix(),this.target=new It,this.shadow=new Lh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Ro=class extends Pt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var Ws=-90,Xs=1,cc=class extends It{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new qt(Ws,Xs,e,t);s.layers=this.layers,this.add(s);let r=new qt(Ws,Xs,e,t);r.layers=this.layers,this.add(r);let o=new qt(Ws,Xs,e,t);o.layers=this.layers,this.add(o);let a=new qt(Ws,Xs,e,t);a.layers=this.layers,this.add(a);let c=new qt(Ws,Xs,e,t);c.layers=this.layers,this.add(c);let l=new qt(Ws,Xs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===An)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===$s)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,f,d),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},lc=class extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var su="\\[\\]\\.:\\/",x0=new RegExp("["+su+"]","g"),ru="[^"+su+"]",_0="[^"+su.replace("\\.","")+"]",y0=/((?:WC+[\/:])*)/.source.replace("WC",ru),v0=/(WCOD+)?/.source.replace("WCOD",_0),M0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ru),S0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ru),b0=new RegExp("^"+y0+v0+M0+S0+"$"),E0=["material","materials","bones","map"],Nh=class{constructor(e,t,n){let s=n||ct.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ct=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(x0,"")}static parseTrackName(e){let t=b0.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);E0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ge("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){qe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){qe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){qe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){qe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){qe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){qe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){qe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;qe("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ct.Composite=Nh;ct.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ct.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ct.prototype.GetterByBindingType=[ct.prototype._getValue_direct,ct.prototype._getValue_array,ct.prototype._getValue_arrayElement,ct.prototype._getValue_toArray];ct.prototype.SetterByBindingTypeAndVersioning=[[ct.prototype._setValue_direct,ct.prototype._setValue_direct_setNeedsUpdate,ct.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_array,ct.prototype._setValue_array_setNeedsUpdate,ct.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_arrayElement,ct.prototype._setValue_arrayElement_setNeedsUpdate,ct.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_fromArray,ct.prototype._setValue_fromArray_setNeedsUpdate,ct.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var aM=new Float32Array(1);var Xi=class extends ro{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}};var Td=new tt,Ei=class{constructor(e,t,n=0,s=1/0){this.ray=new ir(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new er,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):qe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Td.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Td),this}intersectObject(e,t=!0,n=[]){return Dh(e,this,n,t),n.sort(Ad),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Dh(e[s],this,n,t);return n.sort(Ad),n}};function Ad(i,e){return i.distance-e.distance}function Dh(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Dh(r[o],e,t,!0)}}var uu=class uu{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};uu.prototype.isMatrix2=!0;var Uh=uu,Rd=new ue,ur=class{constructor(e=new ue(1/0,1/0),t=new ue(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Rd.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Rd).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Cd=new U,Aa=new U,qs=new U,Zs=new U,yh=new U,w0=new U,T0=new U,Co=class{constructor(e=new U,t=new U){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Cd.subVectors(e,this.start),Aa.subVectors(this.end,this.start);let n=Aa.dot(Aa);if(n===0)return 0;let r=Aa.dot(Cd)/n;return t&&(r=$e(r,0,1)),r}closestPointToPoint(e,t,n){let s=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(s).add(this.start)}distanceSqToLine3(e,t=w0,n=T0){let s=10000000000000001e-32,r,o,a=this.start,c=e.start,l=this.end,h=e.end;qs.subVectors(l,a),Zs.subVectors(h,c),yh.subVectors(a,c);let u=qs.dot(qs),f=Zs.dot(Zs),d=Zs.dot(yh);if(u<=s&&f<=s)return t.copy(a),n.copy(c),t.sub(n),t.dot(t);if(u<=s)r=0,o=d/f,o=$e(o,0,1);else{let m=qs.dot(yh);if(f<=s)o=0,r=$e(-m/u,0,1);else{let y=qs.dot(Zs),g=u*f-y*y;g!==0?r=$e((y*d-m*f)/g,0,1):r=0,o=(y*r+d)/f,o<0?(o=0,r=$e(-m/u,0,1)):o>1&&(o=1,r=$e((y-m)/u,0,1))}}return t.copy(a).addScaledVector(qs,r),n.copy(c).addScaledVector(Zs,o),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};var In=class{constructor(){this.type="ShapePath",this.color=new Ve,this.subPaths=[],this.currentPath=null,this.userData={}}moveTo(e,t){return this.currentPath=new Qn,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,s){return this.currentPath.quadraticCurveTo(e,t,n,s),this}bezierCurveTo(e,t,n,s,r,o){return this.currentPath.bezierCurveTo(e,t,n,s,r,o),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(){function e(c,l){let h=!1,u=l.length;for(let f=0,d=u-1;f<u;d=f++){let m=l[f],y=l[d];m.y>c.y!=y.y>c.y&&c.x<(y.x-m.x)*(c.y-m.y)/(y.y-m.y)+m.x&&(h=!h)}return h}function t(c,l){let h=l.getCenter(new ue);if(e(h,c))return h;let u=h.y,f=[],d=c.length;for(let m=0;m<d;m++){let y=c[m],g=c[(m+1)%d];if(y.y>u!=g.y>u){let p=y.x+(u-y.y)*(g.x-y.x)/(g.y-y.y);f.push(p)}}return f.length>1&&(f.sort((m,y)=>m-y),h.x=(f[0]+f[1])/2),h}let n=this.userData.style&&this.userData.style.fillRule||"nonzero";n!=="nonzero"&&n!=="evenodd"&&(Ge('Fill-rule "'+n+'" is not supported, falling back to "nonzero".'),n="nonzero");let s=n==="nonzero"?(c=>c!==0):(c=>(c&1)!==0),r=[];for(let c of this.subPaths){let l=c.getPoints();if(l.length<3)continue;let h=qn.area(l);if(h===0)continue;let u=new ur;for(let f=0;f<l.length;f++)u.expandByPoint(l[f]);r.push({subPath:c,points:l,boundingBox:u,interiorPoint:t(l,u),absArea:Math.abs(h),winding:h<0?-1:1,container:null,exclude:!1,role:null})}r.sort((c,l)=>l.absArea-c.absArea);for(let c=0;c<r.length;c++){let l=r[c],h=0;for(let u=c-1;u>=0;u--){let f=r[u];if(f.boundingBox.containsPoint(l.interiorPoint)&&e(l.interiorPoint,f.points)){l.container=f.exclude?f.container:f,h=f.winding,l.winding+=h;break}}s(l.winding)===s(h)&&(l.exclude=!0)}for(let c of r)c.exclude||(c.role=c.container===null||c.container.role==="hole"?"outer":"hole");let o=[],a=new Map;for(let c of r){if(c.exclude||c.role!=="outer")continue;let l=new mo;l.curves=c.subPath.curves,o.push(l),a.set(c,l)}for(let c of r){if(c.exclude||c.role!=="hole")continue;let l=a.get(c.container);if(!l)continue;let h=new Qn;h.curves=c.subPath.curves,l.holes.push(h)}return o}};function ou(i,e,t,n){let s=A0(n);switch(t){case jh:return i*e;case xc:return i*e/s.components*s.byteLength;case _c:return i*e/s.components*s.byteLength;case Yi:return i*e*2/s.components*s.byteLength;case yc:return i*e*2/s.components*s.byteLength;case Qh:return i*e*3/s.components*s.byteLength;case on:return i*e*4/s.components*s.byteLength;case vc:return i*e*4/s.components*s.byteLength;case No:case Do:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Uo:case Oo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Sc:case Ec:return Math.max(i,16)*Math.max(e,8)/4;case Mc:case bc:return Math.max(i,8)*Math.max(e,8)/2;case wc:case Tc:case Rc:case Cc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ac:case Fo:case Ic:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Pc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Lc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Nc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Dc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Uc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Oc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Fc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Bc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case zc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case kc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Vc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Hc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Gc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Wc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Xc:case qc:case Zc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Yc:case Jc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Bo:case $c:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function A0(i){switch(i){case rn:case Yh:return{byteLength:1,components:1};case pr:case Jh:case ni:return{byteLength:2,components:1};case mc:case gc:return{byteLength:2,components:4};case Ln:case pc:case Sn:return{byteLength:4,components:1};case $h:case Kh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));typeof window<"u"&&(window.__THREE__?Ge("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function kp(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function R0(i){let e=new WeakMap;function t(a,c){let l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,m)=>d.start-m.start);let f=0;for(let d=1;d<u.length;d++){let m=u[f],y=u[d];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++f,u[f]=y)}u.length=f+1;for(let d=0,m=u.length;d<m;d++){let y=u[d];i.bufferSubData(l,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var C0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,I0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,P0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,L0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,N0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,D0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,U0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,O0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,F0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,B0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,z0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,k0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,V0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,H0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,G0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,W0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,X0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,q0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Z0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Y0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,J0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,$0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,K0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,j0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Q0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ex=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,tx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,nx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ix=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,sx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,rx="gl_FragColor = linearToOutputTexel( gl_FragColor );",ox=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ax=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,cx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,lx=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,hx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ux=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,dx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,px=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,mx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gx=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,xx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_x=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,yx=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,vx=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Mx=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Sx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bx=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ex=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,wx=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Tx=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ax=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Rx=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Cx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ix=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Px=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Lx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Nx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ux=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ox=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Fx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Bx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,zx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Vx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Wx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,qx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Yx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Jx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$x=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,jx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Qx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,e_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,t_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,n_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,i_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,s_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,r_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,o_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,a_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,c_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,l_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,h_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,u_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,f_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,d_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,p_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,m_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,g_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,x_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,__=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,y_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,v_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,M_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,S_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,b_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,E_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,w_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,T_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,A_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,R_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,C_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,I_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,P_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,L_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,N_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,D_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,U_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,O_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,F_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,B_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,z_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,k_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,V_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,H_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,G_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,W_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,X_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,q_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Z_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Y_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,J_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,$_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,K_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,j_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Q_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ey=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ty=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ny=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iy=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,sy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ry=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,oy=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ay=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,cy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Qe={alphahash_fragment:C0,alphahash_pars_fragment:I0,alphamap_fragment:P0,alphamap_pars_fragment:L0,alphatest_fragment:N0,alphatest_pars_fragment:D0,aomap_fragment:U0,aomap_pars_fragment:O0,batching_pars_vertex:F0,batching_vertex:B0,begin_vertex:z0,beginnormal_vertex:k0,bsdfs:V0,iridescence_fragment:H0,bumpmap_pars_fragment:G0,clipping_planes_fragment:W0,clipping_planes_pars_fragment:X0,clipping_planes_pars_vertex:q0,clipping_planes_vertex:Z0,color_fragment:Y0,color_pars_fragment:J0,color_pars_vertex:$0,color_vertex:K0,common:j0,cube_uv_reflection_fragment:Q0,defaultnormal_vertex:ex,displacementmap_pars_vertex:tx,displacementmap_vertex:nx,emissivemap_fragment:ix,emissivemap_pars_fragment:sx,colorspace_fragment:rx,colorspace_pars_fragment:ox,envmap_fragment:ax,envmap_common_pars_fragment:cx,envmap_pars_fragment:lx,envmap_pars_vertex:hx,envmap_physical_pars_fragment:Mx,envmap_vertex:ux,fog_vertex:fx,fog_pars_vertex:dx,fog_fragment:px,fog_pars_fragment:mx,gradientmap_pars_fragment:gx,lightmap_pars_fragment:xx,lights_lambert_fragment:_x,lights_lambert_pars_fragment:yx,lights_pars_begin:vx,lights_toon_fragment:Sx,lights_toon_pars_fragment:bx,lights_phong_fragment:Ex,lights_phong_pars_fragment:wx,lights_physical_fragment:Tx,lights_physical_pars_fragment:Ax,lights_fragment_begin:Rx,lights_fragment_maps:Cx,lights_fragment_end:Ix,lightprobes_pars_fragment:Px,logdepthbuf_fragment:Lx,logdepthbuf_pars_fragment:Nx,logdepthbuf_pars_vertex:Dx,logdepthbuf_vertex:Ux,map_fragment:Ox,map_pars_fragment:Fx,map_particle_fragment:Bx,map_particle_pars_fragment:zx,metalnessmap_fragment:kx,metalnessmap_pars_fragment:Vx,morphinstance_vertex:Hx,morphcolor_vertex:Gx,morphnormal_vertex:Wx,morphtarget_pars_vertex:Xx,morphtarget_vertex:qx,normal_fragment_begin:Zx,normal_fragment_maps:Yx,normal_pars_fragment:Jx,normal_pars_vertex:$x,normal_vertex:Kx,normalmap_pars_fragment:jx,clearcoat_normal_fragment_begin:Qx,clearcoat_normal_fragment_maps:e_,clearcoat_pars_fragment:t_,iridescence_pars_fragment:n_,opaque_fragment:i_,packing:s_,premultiplied_alpha_fragment:r_,project_vertex:o_,dithering_fragment:a_,dithering_pars_fragment:c_,roughnessmap_fragment:l_,roughnessmap_pars_fragment:h_,shadowmap_pars_fragment:u_,shadowmap_pars_vertex:f_,shadowmap_vertex:d_,shadowmask_pars_fragment:p_,skinbase_vertex:m_,skinning_pars_vertex:g_,skinning_vertex:x_,skinnormal_vertex:__,specularmap_fragment:y_,specularmap_pars_fragment:v_,tonemapping_fragment:M_,tonemapping_pars_fragment:S_,transmission_fragment:b_,transmission_pars_fragment:E_,uv_pars_fragment:w_,uv_pars_vertex:T_,uv_vertex:A_,worldpos_vertex:R_,background_vert:C_,background_frag:I_,backgroundCube_vert:P_,backgroundCube_frag:L_,cube_vert:N_,cube_frag:D_,depth_vert:U_,depth_frag:O_,distance_vert:F_,distance_frag:B_,equirect_vert:z_,equirect_frag:k_,linedashed_vert:V_,linedashed_frag:H_,meshbasic_vert:G_,meshbasic_frag:W_,meshlambert_vert:X_,meshlambert_frag:q_,meshmatcap_vert:Z_,meshmatcap_frag:Y_,meshnormal_vert:J_,meshnormal_frag:$_,meshphong_vert:K_,meshphong_frag:j_,meshphysical_vert:Q_,meshphysical_frag:ey,meshtoon_vert:ty,meshtoon_frag:ny,points_vert:iy,points_frag:sy,shadow_vert:ry,shadow_frag:oy,sprite_vert:ay,sprite_frag:cy},be={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},Qt={basic:{uniforms:Yt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:Yt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Ve(0)},envMapIntensity:{value:1}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:Yt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:Yt([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:Yt([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:Yt([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:Yt([be.points,be.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:Yt([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:Yt([be.common,be.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:Yt([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:Yt([be.sprite,be.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distance:{uniforms:Yt([be.common,be.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distance_vert,fragmentShader:Qe.distance_frag},shadow:{uniforms:Yt([be.lights,be.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};Qt.physical={uniforms:Yt([Qt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};var el={r:0,b:0,g:0},ly=new tt,Vp=new We;Vp.set(-1,0,0,0,1,0,0,0,1);function hy(i,e,t,n,s,r){let o=new Ve(0),a=s===!0?0:1,c,l,h=null,u=0,f=null;function d(E){let M=E.isScene===!0?E.background:null;if(M&&M.isTexture){let _=E.backgroundBlurriness>0;M=e.get(M,_)}return M}function m(E){let M=!1,_=d(E);_===null?g(o,a):_&&_.isColor&&(g(_,1),M=!0);let S=i.xr.getEnvironmentBlendMode();S==="additive"?t.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(E,M){let _=d(M);_&&(_.isCubeTexture||_.mapping===Lo)?(l===void 0&&(l=new St(new ar(1,1,1),new $t({name:"BackgroundCubeMaterial",uniforms:_s(Qt.backgroundCube.uniforms),vertexShader:Qt.backgroundCube.vertexShader,fragmentShader:Qt.backgroundCube.fragmentShader,side:Kt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(S,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=_,l.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(ly.makeRotationFromEuler(M.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Vp),l.material.toneMapped=it.getTransfer(_.colorSpace)!==lt,(h!==_||u!==_.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,u=_.version,f=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new St(new bi(2,2),new $t({name:"BackgroundMaterial",uniforms:_s(Qt.background.uniforms),vertexShader:Qt.background.vertexShader,fragmentShader:Qt.background.fragmentShader,side:_i,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=it.getTransfer(_.colorSpace)!==lt,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||u!==_.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=_,u=_.version,f=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function g(E,M){E.getRGB(el,iu(i)),t.buffers.color.setClear(el.r,el.g,el.b,M,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(E,M=1){o.set(E),a=M,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(E){a=E,g(o,a)},render:m,addToRenderList:y,dispose:p}}function uy(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(C,D,F,W,k){let j=!1,X=u(C,W,F,D);r!==X&&(r=X,l(r.object)),j=d(C,W,F,k),j&&m(C,W,F,k),k!==null&&e.update(k,i.ELEMENT_ARRAY_BUFFER),(j||o)&&(o=!1,_(C,D,F,W),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function c(){return i.createVertexArray()}function l(C){return i.bindVertexArray(C)}function h(C){return i.deleteVertexArray(C)}function u(C,D,F,W){let k=W.wireframe===!0,j=n[D.id];j===void 0&&(j={},n[D.id]=j);let X=C.isInstancedMesh===!0?C.id:0,G=j[X];G===void 0&&(G={},j[X]=G);let le=G[F.id];le===void 0&&(le={},G[F.id]=le);let he=le[k];return he===void 0&&(he=f(c()),le[k]=he),he}function f(C){let D=[],F=[],W=[];for(let k=0;k<t;k++)D[k]=0,F[k]=0,W[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:F,attributeDivisors:W,object:C,attributes:{},index:null}}function d(C,D,F,W){let k=r.attributes,j=D.attributes,X=0,G=F.getAttributes();for(let le in G)if(G[le].location>=0){let _e=k[le],ye=j[le];if(ye===void 0&&(le==="instanceMatrix"&&C.instanceMatrix&&(ye=C.instanceMatrix),le==="instanceColor"&&C.instanceColor&&(ye=C.instanceColor)),_e===void 0||_e.attribute!==ye||ye&&_e.data!==ye.data)return!0;X++}return r.attributesNum!==X||r.index!==W}function m(C,D,F,W){let k={},j=D.attributes,X=0,G=F.getAttributes();for(let le in G)if(G[le].location>=0){let _e=j[le];_e===void 0&&(le==="instanceMatrix"&&C.instanceMatrix&&(_e=C.instanceMatrix),le==="instanceColor"&&C.instanceColor&&(_e=C.instanceColor));let ye={};ye.attribute=_e,_e&&_e.data&&(ye.data=_e.data),k[le]=ye,X++}r.attributes=k,r.attributesNum=X,r.index=W}function y(){let C=r.newAttributes;for(let D=0,F=C.length;D<F;D++)C[D]=0}function g(C){p(C,0)}function p(C,D){let F=r.newAttributes,W=r.enabledAttributes,k=r.attributeDivisors;F[C]=1,W[C]===0&&(i.enableVertexAttribArray(C),W[C]=1),k[C]!==D&&(i.vertexAttribDivisor(C,D),k[C]=D)}function E(){let C=r.newAttributes,D=r.enabledAttributes;for(let F=0,W=D.length;F<W;F++)D[F]!==C[F]&&(i.disableVertexAttribArray(F),D[F]=0)}function M(C,D,F,W,k,j,X){X===!0?i.vertexAttribIPointer(C,D,F,k,j):i.vertexAttribPointer(C,D,F,W,k,j)}function _(C,D,F,W){y();let k=W.attributes,j=F.getAttributes(),X=D.defaultAttributeValues;for(let G in j){let le=j[G];if(le.location>=0){let he=k[G];if(he===void 0&&(G==="instanceMatrix"&&C.instanceMatrix&&(he=C.instanceMatrix),G==="instanceColor"&&C.instanceColor&&(he=C.instanceColor)),he!==void 0){let _e=he.normalized,ye=he.itemSize,Be=e.get(he);if(Be===void 0)continue;let Je=Be.buffer,Ze=Be.type,ce=Be.bytesPerElement,Y=Ze===i.INT||Ze===i.UNSIGNED_INT||he.gpuType===pc;if(he.isInterleavedBufferAttribute){let z=he.data,O=z.stride,L=he.offset;if(z.isInstancedInterleavedBuffer){for(let V=0;V<le.locationSize;V++)p(le.location+V,z.meshPerAttribute);C.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let V=0;V<le.locationSize;V++)g(le.location+V);i.bindBuffer(i.ARRAY_BUFFER,Je);for(let V=0;V<le.locationSize;V++)M(le.location+V,ye/le.locationSize,Ze,_e,O*ce,(L+ye/le.locationSize*V)*ce,Y)}else{if(he.isInstancedBufferAttribute){for(let z=0;z<le.locationSize;z++)p(le.location+z,he.meshPerAttribute);C.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let z=0;z<le.locationSize;z++)g(le.location+z);i.bindBuffer(i.ARRAY_BUFFER,Je);for(let z=0;z<le.locationSize;z++)M(le.location+z,ye/le.locationSize,Ze,_e,ye*ce,ye/le.locationSize*z*ce,Y)}}else if(X!==void 0){let _e=X[G];if(_e!==void 0)switch(_e.length){case 2:i.vertexAttrib2fv(le.location,_e);break;case 3:i.vertexAttrib3fv(le.location,_e);break;case 4:i.vertexAttrib4fv(le.location,_e);break;default:i.vertexAttrib1fv(le.location,_e)}}}}E()}function S(){T();for(let C in n){let D=n[C];for(let F in D){let W=D[F];for(let k in W){let j=W[k];for(let X in j)h(j[X].object),delete j[X];delete W[k]}}delete n[C]}}function w(C){if(n[C.id]===void 0)return;let D=n[C.id];for(let F in D){let W=D[F];for(let k in W){let j=W[k];for(let X in j)h(j[X].object),delete j[X];delete W[k]}}delete n[C.id]}function R(C){for(let D in n){let F=n[D];for(let W in F){let k=F[W];if(k[C.id]===void 0)continue;let j=k[C.id];for(let X in j)h(j[X].object),delete j[X];delete k[C.id]}}}function x(C){for(let D in n){let F=n[D],W=C.isInstancedMesh===!0?C.id:0,k=F[W];if(k!==void 0){for(let j in k){let X=k[j];for(let G in X)h(X[G].object),delete X[G];delete k[j]}delete F[W],Object.keys(F).length===0&&delete n[D]}}}function T(){N(),o=!0,r!==s&&(r=s,l(r.object))}function N(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:T,resetDefaultState:N,dispose:S,releaseStatesOfGeometry:w,releaseStatesOfObject:x,releaseStatesOfProgram:R,initAttributes:y,enableAttribute:g,disableUnusedAttributes:E}}function fy(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function o(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function a(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let f=0;for(let d=0;d<h;d++)f+=l[d];t.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function dy(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==on&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let x=R===ni&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==rn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Sn&&!x)}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(Ge("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&Ge("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:E,maxVaryings:M,maxFragmentUniforms:_,maxSamples:S,samples:w}}function py(i){let e=this,t=null,n=0,s=!1,r=!1,o=new Xt,a=new We,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,d){let m=u.clippingPlanes,y=u.clipIntersection,g=u.clipShadows,p=i.get(u);if(!s||m===null||m.length===0||r&&!g)r?h(null):l();else{let E=r?0:n,M=E*4,_=p.clippingState||null;c.value=_,_=h(m,f,M,d);for(let S=0;S!==M;++S)_[S]=t[S];p.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,d,m){let y=u!==null?u.length:0,g=null;if(y!==0){if(g=c.value,m!==!0||g===null){let p=d+y*4,E=f.matrixWorldInverse;a.getNormalMatrix(E),(g===null||g.length<p)&&(g=new Float32Array(p));for(let M=0,_=d;M!==y;++M,_+=4)o.copy(u[M]).applyMatrix4(E,a),o.normal.toArray(g,_),g[_+3]=o.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}var Ji=4,_p=[.125,.215,.35,.446,.526,.582],ys=20,my=256,ko=new Wi,yp=new Ve,fu=null,du=0,pu=0,mu=!1,gy=new U,nl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:a=gy}=r;fu=this._renderer.getRenderTarget(),du=this._renderer.getActiveCubeFace(),pu=this._renderer.getActiveMipmapLevel(),mu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Sp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Mp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(fu,du,pu),this._renderer.xr.enabled=mu,e.scissorTest=!1,xr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===qi||e.mapping===gs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fu=this._renderer.getRenderTarget(),du=this._renderer.getActiveCubeFace(),pu=this._renderer.getActiveMipmapLevel(),mu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ct,minFilter:Ct,generateMipmaps:!1,type:ni,format:on,colorSpace:Kr,depthBuffer:!1},s=vp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=vp(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=xy(r)),this._blurMaterial=yy(r,e,t),this._ggxMaterial=_y(r,e,t)}return s}_compileMaterial(e){let t=new St(new Pt,e);this._renderer.compile(t,ko)}_sceneToCubeUV(e,t,n,s,r){let c=new qt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(yp),u.toneMapping=Pn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new St(new ar,new sn({name:"PMREM.Background",side:Kt,depthWrite:!1,depthTest:!1})));let y=this._backgroundBox,g=y.material,p=!1,E=e.background;E?E.isColor&&(g.color.copy(E),e.background=null,p=!0):(g.color.copy(yp),p=!0);for(let M=0;M<6;M++){let _=M%3;_===0?(c.up.set(0,l[M],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[M],r.y,r.z)):_===1?(c.up.set(0,0,l[M]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[M],r.z)):(c.up.set(0,l[M],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[M]));let S=this._cubeSize;xr(s,_*S,M>2?S:0,S,S),u.setRenderTarget(s),p&&u.render(y,c),u.render(e,c)}u.toneMapping=d,u.autoClear=f,e.background=E}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===qi||e.mapping===gs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Sp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Mp());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;xr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,ko)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let c=o.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),f=0+l*1.25,d=u*f,{_lodMax:m}=this,y=this._sizeLods[n],g=3*y*(n>m-Ji?n-m+Ji:0),p=4*(this._cubeSize-y);c.envMap.value=e.texture,c.roughness.value=d,c.mipInt.value=m-t,xr(r,g,p,3*y,2*y),s.setRenderTarget(r),s.render(a,ko),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=m-n,xr(e,g,p,3*y,2*y),s.setRenderTarget(e),s.render(a,ko)}_blur(e,t,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&qe("blur direction must be either latitudinal or longitudinal!");let h=3,u=this._lodMeshes[s];u.material=l;let f=l.uniforms,d=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*ys-1),y=r/m,g=isFinite(r)?1+Math.floor(h*y):ys;g>ys&&Ge(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${ys}`);let p=[],E=0;for(let R=0;R<ys;++R){let x=R/y,T=Math.exp(-x*x/2);p.push(T),R===0?E+=T:R<g&&(E+=2*T)}for(let R=0;R<p.length;R++)p[R]=p[R]/E;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:M}=this;f.dTheta.value=m,f.mipInt.value=M-n;let _=this._sizeLods[s],S=3*_*(s>M-Ji?s-M+Ji:0),w=4*(this._cubeSize-_);xr(t,S,w,3*_,2*_),c.setRenderTarget(t),c.render(u,ko)}};function xy(i){let e=[],t=[],n=[],s=i,r=i-Ji+1+_p.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>i-Ji?c=_p[o-i+Ji-1]:o===0&&(c=0),t.push(c);let l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,m=6,y=3,g=2,p=1,E=new Float32Array(y*m*d),M=new Float32Array(g*m*d),_=new Float32Array(p*m*d);for(let w=0;w<d;w++){let R=w%3*2/3-1,x=w>2?0:-1,T=[R,x,0,R+2/3,x,0,R+2/3,x+1,0,R,x,0,R+2/3,x+1,0,R,x+1,0];E.set(T,y*m*w),M.set(f,g*m*w);let N=[w,w,w,w,w,w];_.set(N,p*m*w)}let S=new Pt;S.setAttribute("position",new vt(E,y)),S.setAttribute("uv",new vt(M,g)),S.setAttribute("faceIndex",new vt(_,p)),n.push(new St(S,null)),s>Ji&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function vp(i,e,t){let n=new un(i,e,t);return n.texture.mapping=Lo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function xr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function _y(i,e,t){return new $t({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:my,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:sl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function yy(i,e,t){let n=new Float32Array(ys),s=new U(0,1,0);return new $t({name:"SphericalGaussianBlur",defines:{n:ys,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function Mp(){return new $t({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function Sp(){return new $t({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function sl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var il=class extends un{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new co(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ar(5,5,5),r=new $t({name:"CubemapFromEquirect",uniforms:_s(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Kt,blending:ei});r.uniforms.tEquirect.value=t;let o=new St(s,r),a=t.minFilter;return t.minFilter===ti&&(t.minFilter=Ct),new cc(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}};function vy(i){let e=new WeakMap,t=new WeakMap,n=null;function s(f,d=!1){return f==null?null:d?o(f):r(f)}function r(f){if(f&&f.isTexture){let d=f.mapping;if(d===uc||d===fc)if(e.has(f)){let m=e.get(f).texture;return a(m,f.mapping)}else{let m=f.image;if(m&&m.height>0){let y=new il(m.height);return y.fromEquirectangularTexture(i,f),e.set(f,y),f.addEventListener("dispose",l),a(y.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){let d=f.mapping,m=d===uc||d===fc,y=d===qi||d===gs;if(m||y){let g=t.get(f),p=g!==void 0?g.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return n===null&&(n=new nl(i)),g=m?n.fromEquirectangular(f,g):n.fromCubemap(f,g),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),g.texture;if(g!==void 0)return g.texture;{let E=f.image;return m&&E&&E.height>0||y&&E&&c(E)?(n===null&&(n=new nl(i)),g=m?n.fromEquirectangular(f):n.fromCubemap(f),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),f.addEventListener("dispose",h),g.texture):null}}}return f}function a(f,d){return d===uc?f.mapping=qi:d===fc&&(f.mapping=gs),f}function c(f){let d=0,m=6;for(let y=0;y<m;y++)f[y]!==void 0&&d++;return d===m}function l(f){let d=f.target;d.removeEventListener("dispose",l);let m=e.get(d);m!==void 0&&(e.delete(d),m.dispose())}function h(f){let d=f.target;d.removeEventListener("dispose",h);let m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function My(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&ls("WebGLRenderer: "+n+" extension not supported."),s}}}function Sy(i,e,t,n){let s={},r=new WeakMap;function o(u){let f=u.target;f.index!==null&&e.remove(f.index);for(let m in f.attributes)e.remove(f.attributes[m]);f.removeEventListener("dispose",o),delete s[f.id];let d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function c(u){let f=u.attributes;for(let d in f)e.update(f[d],i.ARRAY_BUFFER)}function l(u){let f=[],d=u.index,m=u.attributes.position,y=0;if(m===void 0)return;if(d!==null){let E=d.array;y=d.version;for(let M=0,_=E.length;M<_;M+=3){let S=E[M+0],w=E[M+1],R=E[M+2];f.push(S,w,w,R,R,S)}}else{let E=m.array;y=m.version;for(let M=0,_=E.length/3-1;M<_;M+=3){let S=M+0,w=M+1,R=M+2;f.push(S,w,w,R,R,S)}}let g=new(m.count>=65535?so:io)(f,1);g.version=y;let p=r.get(u);p&&e.remove(p),r.set(u,g)}function h(u){let f=r.get(u);if(f){let d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function by(i,e,t){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function c(u,f){i.drawElements(n,f,r,u*o),t.update(f,n,1)}function l(u,f,d){d!==0&&(i.drawElementsInstanced(n,f,r,u*o,d),t.update(f,n,d))}function h(u,f,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,d);let y=0;for(let g=0;g<d;g++)y+=f[g];t.update(y,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function Ey(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:qe("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function wy(i,e,t){let n=new WeakMap,s=new at;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(a);if(f===void 0||f.count!==u){let T=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",T)};f!==void 0&&f.texture.dispose();let d=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],E=a.morphAttributes.color||[],M=0;d===!0&&(M=1),m===!0&&(M=2),y===!0&&(M=3);let _=a.attributes.position.count*M,S=1;_>e.maxTextureSize&&(S=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let w=new Float32Array(_*S*4*u),R=new to(w,_,S,u);R.type=Sn,R.needsUpdate=!0;let x=M*4;for(let N=0;N<u;N++){let C=g[N],D=p[N],F=E[N],W=_*S*4*N;for(let k=0;k<C.count;k++){let j=k*x;d===!0&&(s.fromBufferAttribute(C,k),w[W+j+0]=s.x,w[W+j+1]=s.y,w[W+j+2]=s.z,w[W+j+3]=0),m===!0&&(s.fromBufferAttribute(D,k),w[W+j+4]=s.x,w[W+j+5]=s.y,w[W+j+6]=s.z,w[W+j+7]=0),y===!0&&(s.fromBufferAttribute(F,k),w[W+j+8]=s.x,w[W+j+9]=s.y,w[W+j+10]=s.z,w[W+j+11]=F.itemSize===4?s.w:1)}}f={count:u,texture:R,size:new ue(_,S)},n.set(a,f),a.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let d=0;for(let y=0;y<l.length;y++)d+=l[y];let m=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Ty(i,e,t,n,s){let r=new WeakMap;function o(l){let h=s.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==h&&(e.update(f),r.set(f,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return f}function a(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}var Ay={[Vh]:"LINEAR_TONE_MAPPING",[Hh]:"REINHARD_TONE_MAPPING",[Gh]:"CINEON_TONE_MAPPING",[Po]:"ACES_FILMIC_TONE_MAPPING",[Xh]:"AGX_TONE_MAPPING",[qh]:"NEUTRAL_TONE_MAPPING",[Wh]:"CUSTOM_TONE_MAPPING"};function Ry(i,e,t,n,s,r){let o=new un(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Si(e,t):void 0}),a=new un(e,t,{type:ni,depthBuffer:!1,stencilBuffer:!1}),c=new Pt;c.setAttribute("position",new mt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new mt([0,2,0,0,2,0],2));let l=new $a({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new St(c,l),u=new Wi(-1,1,1,-1,0,1),f=null,d=null,m=!1,y,g=null,p=[],E=!1;this.setSize=function(M,_){o.setSize(M,_),a.setSize(M,_);for(let S=0;S<p.length;S++){let w=p[S];w.setSize&&w.setSize(M,_)}},this.setEffects=function(M){p=M,E=p.length>0&&p[0].isRenderPass===!0;let _=o.width,S=o.height;for(let w=0;w<p.length;w++){let R=p[w];R.setSize&&R.setSize(_,S)}},this.begin=function(M,_){if(m||M.toneMapping===Pn&&p.length===0)return!1;if(g=_,_!==null){let S=_.width,w=_.height;(o.width!==S||o.height!==w)&&this.setSize(S,w)}return E===!1&&M.setRenderTarget(o),y=M.toneMapping,M.toneMapping=Pn,!0},this.hasRenderPass=function(){return E},this.end=function(M,_){M.toneMapping=y,m=!0;let S=o,w=a;for(let R=0;R<p.length;R++){let x=p[R];if(x.enabled!==!1&&(x.render(M,w,S,_),x.needsSwap!==!1)){let T=S;S=w,w=T}}if(f!==M.outputColorSpace||d!==M.toneMapping){f=M.outputColorSpace,d=M.toneMapping,l.defines={},it.getTransfer(f)===lt&&(l.defines.SRGB_TRANSFER="");let R=Ay[d];R&&(l.defines[R]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=S.texture,M.setRenderTarget(g),M.render(h,u),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),a.dispose(),c.dispose(),l.dispose()}}var Hp=new Zt,_u=new Si(1,1),Gp=new to,Wp=new ka,Xp=new co,bp=[],Ep=[],wp=new Float32Array(16),Tp=new Float32Array(9),Ap=new Float32Array(4);function vr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=bp[s];if(r===void 0&&(r=new Float32Array(s),bp[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Ut(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ot(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function rl(i,e){let t=Ep[e];t===void 0&&(t=new Int32Array(e),Ep[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Cy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Iy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2fv(this.addr,e),Ot(t,e)}}function Py(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ut(t,e))return;i.uniform3fv(this.addr,e),Ot(t,e)}}function Ly(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4fv(this.addr,e),Ot(t,e)}}function Ny(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ot(t,e)}else{if(Ut(t,n))return;Ap.set(n),i.uniformMatrix2fv(this.addr,!1,Ap),Ot(t,n)}}function Dy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ot(t,e)}else{if(Ut(t,n))return;Tp.set(n),i.uniformMatrix3fv(this.addr,!1,Tp),Ot(t,n)}}function Uy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ot(t,e)}else{if(Ut(t,n))return;wp.set(n),i.uniformMatrix4fv(this.addr,!1,wp),Ot(t,n)}}function Oy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Fy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2iv(this.addr,e),Ot(t,e)}}function By(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;i.uniform3iv(this.addr,e),Ot(t,e)}}function zy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4iv(this.addr,e),Ot(t,e)}}function ky(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Vy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2uiv(this.addr,e),Ot(t,e)}}function Hy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;i.uniform3uiv(this.addr,e),Ot(t,e)}}function Gy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4uiv(this.addr,e),Ot(t,e)}}function Wy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(_u.compareFunction=t.isReversedDepthBuffer()?Qc:jc,r=_u):r=Hp,t.setTexture2D(e||r,s)}function Xy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Wp,s)}function qy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Xp,s)}function Zy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Gp,s)}function Yy(i){switch(i){case 5126:return Cy;case 35664:return Iy;case 35665:return Py;case 35666:return Ly;case 35674:return Ny;case 35675:return Dy;case 35676:return Uy;case 5124:case 35670:return Oy;case 35667:case 35671:return Fy;case 35668:case 35672:return By;case 35669:case 35673:return zy;case 5125:return ky;case 36294:return Vy;case 36295:return Hy;case 36296:return Gy;case 35678:case 36198:case 36298:case 36306:case 35682:return Wy;case 35679:case 36299:case 36307:return Xy;case 35680:case 36300:case 36308:case 36293:return qy;case 36289:case 36303:case 36311:case 36292:return Zy}}function Jy(i,e){i.uniform1fv(this.addr,e)}function $y(i,e){let t=vr(e,this.size,2);i.uniform2fv(this.addr,t)}function Ky(i,e){let t=vr(e,this.size,3);i.uniform3fv(this.addr,t)}function jy(i,e){let t=vr(e,this.size,4);i.uniform4fv(this.addr,t)}function Qy(i,e){let t=vr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function ev(i,e){let t=vr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function tv(i,e){let t=vr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function nv(i,e){i.uniform1iv(this.addr,e)}function iv(i,e){i.uniform2iv(this.addr,e)}function sv(i,e){i.uniform3iv(this.addr,e)}function rv(i,e){i.uniform4iv(this.addr,e)}function ov(i,e){i.uniform1uiv(this.addr,e)}function av(i,e){i.uniform2uiv(this.addr,e)}function cv(i,e){i.uniform3uiv(this.addr,e)}function lv(i,e){i.uniform4uiv(this.addr,e)}function hv(i,e,t){let n=this.cache,s=e.length,r=rl(t,s);Ut(n,r)||(i.uniform1iv(this.addr,r),Ot(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=_u:o=Hp;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function uv(i,e,t){let n=this.cache,s=e.length,r=rl(t,s);Ut(n,r)||(i.uniform1iv(this.addr,r),Ot(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Wp,r[o])}function fv(i,e,t){let n=this.cache,s=e.length,r=rl(t,s);Ut(n,r)||(i.uniform1iv(this.addr,r),Ot(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Xp,r[o])}function dv(i,e,t){let n=this.cache,s=e.length,r=rl(t,s);Ut(n,r)||(i.uniform1iv(this.addr,r),Ot(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Gp,r[o])}function pv(i){switch(i){case 5126:return Jy;case 35664:return $y;case 35665:return Ky;case 35666:return jy;case 35674:return Qy;case 35675:return ev;case 35676:return tv;case 5124:case 35670:return nv;case 35667:case 35671:return iv;case 35668:case 35672:return sv;case 35669:case 35673:return rv;case 5125:return ov;case 36294:return av;case 36295:return cv;case 36296:return lv;case 35678:case 36198:case 36298:case 36306:case 35682:return hv;case 35679:case 36299:case 36307:return uv;case 35680:case 36300:case 36308:case 36293:return fv;case 36289:case 36303:case 36311:case 36292:return dv}}var yu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Yy(t.type)}},vu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=pv(t.type)}},Mu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},gu=/(\w+)(\])?(\[|\.)?/g;function Rp(i,e){i.seq.push(e),i.map[e.id]=e}function mv(i,e,t){let n=i.name,s=n.length;for(gu.lastIndex=0;;){let r=gu.exec(n),o=gu.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Rp(t,l===void 0?new yu(a,i,e):new vu(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new Mu(a),Rp(t,u)),t=u}}}var _r=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);mv(a,c,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function Cp(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var gv=37297,xv=0;function _v(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var Ip=new We;function yv(i){it._getMatrix(Ip,it.workingColorSpace,i);let e=`mat3( ${Ip.elements.map(t=>t.toFixed(4))} )`;switch(it.getTransfer(i)){case jr:return[e,"LinearTransferOETF"];case lt:return[e,"sRGBTransferOETF"];default:return Ge("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Pp(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+_v(i.getShaderSource(e),a)}else return r}function vv(i,e){let t=yv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Mv={[Vh]:"Linear",[Hh]:"Reinhard",[Gh]:"Cineon",[Po]:"ACESFilmic",[Xh]:"AgX",[qh]:"Neutral",[Wh]:"Custom"};function Sv(i,e){let t=Mv[e];return t===void 0?(Ge("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var tl=new U;function bv(){it.getLuminanceCoefficients(tl);let i=tl.x.toFixed(4),e=tl.y.toFixed(4),t=tl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ev(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ho).join(`
`)}function wv(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Tv(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Ho(i){return i!==""}function Lp(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Np(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Av=/^[ \t]*#include +<([\w\d./]+)>/gm;function Su(i){return i.replace(Av,Cv)}var Rv=new Map;function Cv(i,e){let t=Qe[e];if(t===void 0){let n=Rv.get(e);if(n!==void 0)t=Qe[n],Ge('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Su(t)}var Iv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Dp(i){return i.replace(Iv,Pv)}function Pv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Up(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var Lv={[Io]:"SHADOWMAP_TYPE_PCF",[fr]:"SHADOWMAP_TYPE_VSM"};function Nv(i){return Lv[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Dv={[qi]:"ENVMAP_TYPE_CUBE",[gs]:"ENVMAP_TYPE_CUBE",[Lo]:"ENVMAP_TYPE_CUBE_UV"};function Uv(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Dv[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Ov={[gs]:"ENVMAP_MODE_REFRACTION"};function Fv(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Ov[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Bv={[kh]:"ENVMAP_BLENDING_MULTIPLY",[Kd]:"ENVMAP_BLENDING_MIX",[jd]:"ENVMAP_BLENDING_ADD"};function zv(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Bv[i.combine]||"ENVMAP_BLENDING_NONE"}function kv(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Vv(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=Nv(t),l=Uv(t),h=Fv(t),u=zv(t),f=kv(t),d=Ev(t),m=wv(r),y=s.createProgram(),g,p,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Ho).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Ho).join(`
`),p.length>0&&(p+=`
`)):(g=[Up(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ho).join(`
`),p=[Up(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pn?"#define TONE_MAPPING":"",t.toneMapping!==Pn?Qe.tonemapping_pars_fragment:"",t.toneMapping!==Pn?Sv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,vv("linearToOutputTexel",t.outputColorSpace),bv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ho).join(`
`)),o=Su(o),o=Lp(o,t),o=Np(o,t),a=Su(a),a=Lp(a,t),a=Np(a,t),o=Dp(o),a=Dp(a),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===eu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===eu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let M=E+g+o,_=E+p+a,S=Cp(s,s.VERTEX_SHADER,M),w=Cp(s,s.FRAGMENT_SHADER,_);s.attachShader(y,S),s.attachShader(y,w),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function R(C){if(i.debug.checkShaderErrors){let D=s.getProgramInfoLog(y)||"",F=s.getShaderInfoLog(S)||"",W=s.getShaderInfoLog(w)||"",k=D.trim(),j=F.trim(),X=W.trim(),G=!0,le=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,S,w);else{let he=Pp(s,S,"vertex"),_e=Pp(s,w,"fragment");qe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+k+`
`+he+`
`+_e)}else k!==""?Ge("WebGLProgram: Program Info Log:",k):(j===""||X==="")&&(le=!1);le&&(C.diagnostics={runnable:G,programLog:k,vertexShader:{log:j,prefix:g},fragmentShader:{log:X,prefix:p}})}s.deleteShader(S),s.deleteShader(w),x=new _r(s,y),T=Tv(s,y)}let x;this.getUniforms=function(){return x===void 0&&R(this),x};let T;this.getAttributes=function(){return T===void 0&&R(this),T};let N=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=s.getProgramParameter(y,gv)),N},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=xv++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=S,this.fragmentShader=w,this}var Hv=0,bu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Eu(e),t.set(e,n)),n}},Eu=class{constructor(e){this.id=Hv++,this.code=e,this.usedTimes=0}};function Gv(i){return i===Yi||i===Fo||i===Bo}function Wv(i,e,t,n,s,r){let o=new er,a=new bu,c=new Set,l=[],h=new Map,u=n.logarithmicDepthBuffer,f=n.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return c.add(x),x===0?"uv":`uv${x}`}function y(x,T,N,C,D,F){let W=C.fog,k=D.geometry,j=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?C.environment:null,X=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,G=e.get(x.envMap||j,X),le=G&&G.mapping===Lo?G.image.height:null,he=d[x.type];x.precision!==null&&(f=n.getMaxPrecision(x.precision),f!==x.precision&&Ge("WebGLProgram.getParameters:",x.precision,"not supported, using",f,"instead."));let _e=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ye=_e!==void 0?_e.length:0,Be=0;k.morphAttributes.position!==void 0&&(Be=1),k.morphAttributes.normal!==void 0&&(Be=2),k.morphAttributes.color!==void 0&&(Be=3);let Je,Ze,ce,Y;if(he){let Ue=Qt[he];Je=Ue.vertexShader,Ze=Ue.fragmentShader}else{Je=x.vertexShader,Ze=x.fragmentShader;let Ue=a.getVertexShaderStage(x),bt=a.getFragmentShaderStage(x);a.update(x,Ue,bt),ce=Ue.id,Y=bt.id}let z=i.getRenderTarget(),O=i.state.buffers.depth.getReversed(),L=D.isInstancedMesh===!0,V=D.isBatchedMesh===!0,re=!!x.map,de=!!x.matcap,I=!!G,H=!!x.aoMap,B=!!x.lightMap,K=!!x.bumpMap&&x.wireframe===!1,ee=!!x.normalMap,oe=!!x.displacementMap,me=!!x.emissiveMap,ge=!!x.metalnessMap,Z=!!x.roughnessMap,b=x.anisotropy>0,Ie=x.clearcoat>0,De=x.dispersion>0,P=x.iridescence>0,v=x.sheen>0,J=x.transmission>0,Q=b&&!!x.anisotropyMap,se=Ie&&!!x.clearcoatMap,ve=Ie&&!!x.clearcoatNormalMap,Me=Ie&&!!x.clearcoatRoughnessMap,ae=P&&!!x.iridescenceMap,fe=P&&!!x.iridescenceThicknessMap,Se=v&&!!x.sheenColorMap,Oe=v&&!!x.sheenRoughnessMap,Te=!!x.specularMap,Ee=!!x.specularColorMap,Xe=!!x.specularIntensityMap,Ye=J&&!!x.transmissionMap,Ke=J&&!!x.thicknessMap,q=!!x.gradientMap,we=!!x.alphaMap,pe=x.alphaTest>0,Ae=!!x.alphaHash,Pe=!!x.extensions,xe=Pn;x.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(xe=i.toneMapping);let ze={shaderID:he,shaderType:x.type,shaderName:x.name,vertexShader:Je,fragmentShader:Ze,defines:x.defines,customVertexShaderID:ce,customFragmentShaderID:Y,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:f,batching:V,batchingColor:V&&D._colorsTexture!==null,instancing:L,instancingColor:L&&D.instanceColor!==null,instancingMorph:L&&D.morphTexture!==null,outputColorSpace:z===null?i.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:it.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:re,matcap:de,envMap:I,envMapMode:I&&G.mapping,envMapCubeUVHeight:le,aoMap:H,lightMap:B,bumpMap:K,normalMap:ee,displacementMap:oe,emissiveMap:me,normalMapObjectSpace:ee&&x.normalMapType===ep,normalMapTangentSpace:ee&&x.normalMapType===Kc,packedNormalMap:ee&&x.normalMapType===Kc&&Gv(x.normalMap.format),metalnessMap:ge,roughnessMap:Z,anisotropy:b,anisotropyMap:Q,clearcoat:Ie,clearcoatMap:se,clearcoatNormalMap:ve,clearcoatRoughnessMap:Me,dispersion:De,iridescence:P,iridescenceMap:ae,iridescenceThicknessMap:fe,sheen:v,sheenColorMap:Se,sheenRoughnessMap:Oe,specularMap:Te,specularColorMap:Ee,specularIntensityMap:Xe,transmission:J,transmissionMap:Ye,thicknessMap:Ke,gradientMap:q,opaque:x.transparent===!1&&x.blending===hs&&x.alphaToCoverage===!1,alphaMap:we,alphaTest:pe,alphaHash:Ae,combine:x.combine,mapUv:re&&m(x.map.channel),aoMapUv:H&&m(x.aoMap.channel),lightMapUv:B&&m(x.lightMap.channel),bumpMapUv:K&&m(x.bumpMap.channel),normalMapUv:ee&&m(x.normalMap.channel),displacementMapUv:oe&&m(x.displacementMap.channel),emissiveMapUv:me&&m(x.emissiveMap.channel),metalnessMapUv:ge&&m(x.metalnessMap.channel),roughnessMapUv:Z&&m(x.roughnessMap.channel),anisotropyMapUv:Q&&m(x.anisotropyMap.channel),clearcoatMapUv:se&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:ve&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Me&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:ae&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:fe&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&m(x.sheenRoughnessMap.channel),specularMapUv:Te&&m(x.specularMap.channel),specularColorMapUv:Ee&&m(x.specularColorMap.channel),specularIntensityMapUv:Xe&&m(x.specularIntensityMap.channel),transmissionMapUv:Ye&&m(x.transmissionMap.channel),thicknessMapUv:Ke&&m(x.thicknessMap.channel),alphaMapUv:we&&m(x.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(ee||b),vertexNormals:!!k.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!k.attributes.uv&&(re||we),fog:!!W,useFog:x.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||k.attributes.normal===void 0&&ee===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:O,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:Be,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:F.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:xe,decodeVideoTexture:re&&x.map.isVideoTexture===!0&&it.getTransfer(x.map.colorSpace)===lt,decodeVideoTextureEmissive:me&&x.emissiveMap.isVideoTexture===!0&&it.getTransfer(x.emissiveMap.colorSpace)===lt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===jt,flipSided:x.side===Kt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Pe&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pe&&x.extensions.multiDraw===!0||V)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return ze.vertexUv1s=c.has(1),ze.vertexUv2s=c.has(2),ze.vertexUv3s=c.has(3),c.clear(),ze}function g(x){let T=[];if(x.shaderID?T.push(x.shaderID):(T.push(x.customVertexShaderID),T.push(x.customFragmentShaderID)),x.defines!==void 0)for(let N in x.defines)T.push(N),T.push(x.defines[N]);return x.isRawShaderMaterial===!1&&(p(T,x),E(T,x),T.push(i.outputColorSpace)),T.push(x.customProgramCacheKey),T.join()}function p(x,T){x.push(T.precision),x.push(T.outputColorSpace),x.push(T.envMapMode),x.push(T.envMapCubeUVHeight),x.push(T.mapUv),x.push(T.alphaMapUv),x.push(T.lightMapUv),x.push(T.aoMapUv),x.push(T.bumpMapUv),x.push(T.normalMapUv),x.push(T.displacementMapUv),x.push(T.emissiveMapUv),x.push(T.metalnessMapUv),x.push(T.roughnessMapUv),x.push(T.anisotropyMapUv),x.push(T.clearcoatMapUv),x.push(T.clearcoatNormalMapUv),x.push(T.clearcoatRoughnessMapUv),x.push(T.iridescenceMapUv),x.push(T.iridescenceThicknessMapUv),x.push(T.sheenColorMapUv),x.push(T.sheenRoughnessMapUv),x.push(T.specularMapUv),x.push(T.specularColorMapUv),x.push(T.specularIntensityMapUv),x.push(T.transmissionMapUv),x.push(T.thicknessMapUv),x.push(T.combine),x.push(T.fogExp2),x.push(T.sizeAttenuation),x.push(T.morphTargetsCount),x.push(T.morphAttributeCount),x.push(T.numDirLights),x.push(T.numPointLights),x.push(T.numSpotLights),x.push(T.numSpotLightMaps),x.push(T.numHemiLights),x.push(T.numRectAreaLights),x.push(T.numDirLightShadows),x.push(T.numPointLightShadows),x.push(T.numSpotLightShadows),x.push(T.numSpotLightShadowsWithMaps),x.push(T.numLightProbes),x.push(T.shadowMapType),x.push(T.toneMapping),x.push(T.numClippingPlanes),x.push(T.numClipIntersection),x.push(T.depthPacking)}function E(x,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),T.packedNormalMap&&o.enable(22),T.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),T.numLightProbeGrids>0&&o.enable(22),T.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function M(x){let T=d[x.type],N;if(T){let C=Qt[T];N=zo.clone(C.uniforms)}else N=x.uniforms;return N}function _(x,T){let N=h.get(T);return N!==void 0?++N.usedTimes:(N=new Vv(i,T,x,s),l.push(N),h.set(T,N)),N}function S(x){if(--x.usedTimes===0){let T=l.indexOf(x);l[T]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function w(x){a.remove(x)}function R(){a.dispose()}return{getParameters:y,getProgramCacheKey:g,getUniforms:M,acquireProgram:_,releaseProgram:S,releaseShaderCache:w,programs:l,dispose:R}}function Xv(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function qv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Op(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Fp(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function a(f,d,m,y,g,p){let E=i[e];return E===void 0?(E={id:f.id,object:f,geometry:d,material:m,materialVariant:o(f),groupOrder:y,renderOrder:f.renderOrder,z:g,group:p},i[e]=E):(E.id=f.id,E.object=f,E.geometry=d,E.material=m,E.materialVariant=o(f),E.groupOrder=y,E.renderOrder=f.renderOrder,E.z=g,E.group=p),e++,E}function c(f,d,m,y,g,p){let E=a(f,d,m,y,g,p);m.transmission>0?n.push(E):m.transparent===!0?s.push(E):t.push(E)}function l(f,d,m,y,g,p){let E=a(f,d,m,y,g,p);m.transmission>0?n.unshift(E):m.transparent===!0?s.unshift(E):t.unshift(E)}function h(f,d,m){t.length>1&&t.sort(f||qv),n.length>1&&n.sort(d||Op),s.length>1&&s.sort(d||Op),m&&(t.reverse(),n.reverse(),s.reverse())}function u(){for(let f=e,d=i.length;f<d;f++){let m=i[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:u,sort:h}}function Zv(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new Fp,i.set(n,[o])):s>=r.length?(o=new Fp,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Yv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new Ve};break;case"SpotLight":t={position:new U,direction:new U,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new Ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new Ve,groundColor:new Ve};break;case"RectAreaLight":t={color:new Ve,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function Jv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var $v=0;function Kv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function jv(i){let e=new Yv,t=Jv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new U);let s=new U,r=new tt,o=new tt;function a(l){let h=0,u=0,f=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let d=0,m=0,y=0,g=0,p=0,E=0,M=0,_=0,S=0,w=0,R=0;l.sort(Kv);for(let T=0,N=l.length;T<N;T++){let C=l[T],D=C.color,F=C.intensity,W=C.distance,k=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Yi?k=C.shadow.map.texture:k=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)h+=D.r*F,u+=D.g*F,f+=D.b*F;else if(C.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(C.sh.coefficients[j],F);R++}else if(C.isDirectionalLight){let j=e.get(C);if(j.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let X=C.shadow,G=t.get(C);G.shadowIntensity=X.intensity,G.shadowBias=X.bias,G.shadowNormalBias=X.normalBias,G.shadowRadius=X.radius,G.shadowMapSize=X.mapSize,n.directionalShadow[d]=G,n.directionalShadowMap[d]=k,n.directionalShadowMatrix[d]=C.shadow.matrix,E++}n.directional[d]=j,d++}else if(C.isSpotLight){let j=e.get(C);j.position.setFromMatrixPosition(C.matrixWorld),j.color.copy(D).multiplyScalar(F),j.distance=W,j.coneCos=Math.cos(C.angle),j.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),j.decay=C.decay,n.spot[y]=j;let X=C.shadow;if(C.map&&(n.spotLightMap[S]=C.map,S++,X.updateMatrices(C),C.castShadow&&w++),n.spotLightMatrix[y]=X.matrix,C.castShadow){let G=t.get(C);G.shadowIntensity=X.intensity,G.shadowBias=X.bias,G.shadowNormalBias=X.normalBias,G.shadowRadius=X.radius,G.shadowMapSize=X.mapSize,n.spotShadow[y]=G,n.spotShadowMap[y]=k,_++}y++}else if(C.isRectAreaLight){let j=e.get(C);j.color.copy(D).multiplyScalar(F),j.halfWidth.set(C.width*.5,0,0),j.halfHeight.set(0,C.height*.5,0),n.rectArea[g]=j,g++}else if(C.isPointLight){let j=e.get(C);if(j.color.copy(C.color).multiplyScalar(C.intensity),j.distance=C.distance,j.decay=C.decay,C.castShadow){let X=C.shadow,G=t.get(C);G.shadowIntensity=X.intensity,G.shadowBias=X.bias,G.shadowNormalBias=X.normalBias,G.shadowRadius=X.radius,G.shadowMapSize=X.mapSize,G.shadowCameraNear=X.camera.near,G.shadowCameraFar=X.camera.far,n.pointShadow[m]=G,n.pointShadowMap[m]=k,n.pointShadowMatrix[m]=C.shadow.matrix,M++}n.point[m]=j,m++}else if(C.isHemisphereLight){let j=e.get(C);j.skyColor.copy(C.color).multiplyScalar(F),j.groundColor.copy(C.groundColor).multiplyScalar(F),n.hemi[p]=j,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=be.LTC_FLOAT_1,n.rectAreaLTC2=be.LTC_FLOAT_2):(n.rectAreaLTC1=be.LTC_HALF_1,n.rectAreaLTC2=be.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;let x=n.hash;(x.directionalLength!==d||x.pointLength!==m||x.spotLength!==y||x.rectAreaLength!==g||x.hemiLength!==p||x.numDirectionalShadows!==E||x.numPointShadows!==M||x.numSpotShadows!==_||x.numSpotMaps!==S||x.numLightProbes!==R)&&(n.directional.length=d,n.spot.length=y,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=_+S-w,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=R,x.directionalLength=d,x.pointLength=m,x.spotLength=y,x.rectAreaLength=g,x.hemiLength=p,x.numDirectionalShadows=E,x.numPointShadows=M,x.numSpotShadows=_,x.numSpotMaps=S,x.numLightProbes=R,n.version=$v++)}function c(l,h){let u=0,f=0,d=0,m=0,y=0,g=h.matrixWorldInverse;for(let p=0,E=l.length;p<E;p++){let M=l[p];if(M.isDirectionalLight){let _=n.directional[u];_.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),u++}else if(M.isSpotLight){let _=n.spot[d];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),d++}else if(M.isRectAreaLight){let _=n.rectArea[m];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(g),o.identity(),r.copy(M.matrixWorld),r.premultiply(g),o.extractRotation(r),_.halfWidth.set(M.width*.5,0,0),_.halfHeight.set(0,M.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),m++}else if(M.isPointLight){let _=n.point[f];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(g),f++}else if(M.isHemisphereLight){let _=n.hemi[y];_.direction.setFromMatrixPosition(M.matrixWorld),_.direction.transformDirection(g),y++}}}return{setup:a,setupView:c,state:n}}function Bp(i){let e=new jv(i),t=[],n=[],s=[];function r(f){u.camera=f,t.length=0,n.length=0,s.length=0}function o(f){t.push(f)}function a(f){n.push(f)}function c(f){s.push(f)}function l(){e.setup(t)}function h(f){e.setupView(t,f)}let u={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function Qv(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new Bp(i),e.set(s,[a])):r>=o.length?(a=new Bp(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var e1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,t1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,n1=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],i1=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],zp=new tt,Vo=new U,xu=new U;function s1(i,e,t){let n=new rr,s=new ue,r=new ue,o=new at,a=new Ka,c=new ja,l={},h=t.maxTextureSize,u={[_i]:Kt,[Kt]:_i,[jt]:jt},f=new $t({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:e1,fragmentShader:t1}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let m=new Pt;m.setAttribute("position",new vt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new St(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Io;let p=this.type;this.render=function(w,R,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;this.type===Ld&&(Ge("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Io);let T=i.getRenderTarget(),N=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),D=i.state;D.setBlending(ei),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let F=p!==this.type;F&&R.traverse(function(W){W.material&&(Array.isArray(W.material)?W.material.forEach(k=>k.needsUpdate=!0):W.material.needsUpdate=!0)});for(let W=0,k=w.length;W<k;W++){let j=w[W],X=j.shadow;if(X===void 0){Ge("WebGLShadowMap:",j,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);let G=X.getFrameExtents();s.multiply(G),r.copy(X.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/G.x),s.x=r.x*G.x,X.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/G.y),s.y=r.y*G.y,X.mapSize.y=r.y));let le=i.state.buffers.depth.getReversed();if(X.camera._reversedDepth=le,X.map===null||F===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===fr){if(j.isPointLight){Ge("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new un(s.x,s.y,{format:Yi,type:ni,minFilter:Ct,magFilter:Ct,generateMipmaps:!1}),X.map.texture.name=j.name+".shadowMap",X.map.depthTexture=new Si(s.x,s.y,Sn),X.map.depthTexture.name=j.name+".shadowMapDepth",X.map.depthTexture.format=Jn,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Dt,X.map.depthTexture.magFilter=Dt}else j.isPointLight?(X.map=new il(s.x),X.map.depthTexture=new Ga(s.x,Ln)):(X.map=new un(s.x,s.y),X.map.depthTexture=new Si(s.x,s.y,Ln)),X.map.depthTexture.name=j.name+".shadowMap",X.map.depthTexture.format=Jn,this.type===Io?(X.map.depthTexture.compareFunction=le?Qc:jc,X.map.depthTexture.minFilter=Ct,X.map.depthTexture.magFilter=Ct):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Dt,X.map.depthTexture.magFilter=Dt);X.camera.updateProjectionMatrix()}let he=X.map.isWebGLCubeRenderTarget?6:1;for(let _e=0;_e<he;_e++){if(X.map.isWebGLCubeRenderTarget)i.setRenderTarget(X.map,_e),i.clear();else{_e===0&&(i.setRenderTarget(X.map),i.clear());let ye=X.getViewport(_e);o.set(r.x*ye.x,r.y*ye.y,r.x*ye.z,r.y*ye.w),D.viewport(o)}if(j.isPointLight){let ye=X.camera,Be=X.matrix,Je=j.distance||ye.far;Je!==ye.far&&(ye.far=Je,ye.updateProjectionMatrix()),Vo.setFromMatrixPosition(j.matrixWorld),ye.position.copy(Vo),xu.copy(ye.position),xu.add(n1[_e]),ye.up.copy(i1[_e]),ye.lookAt(xu),ye.updateMatrixWorld(),Be.makeTranslation(-Vo.x,-Vo.y,-Vo.z),zp.multiplyMatrices(ye.projectionMatrix,ye.matrixWorldInverse),X._frustum.setFromProjectionMatrix(zp,ye.coordinateSystem,ye.reversedDepth)}else X.updateMatrices(j);n=X.getFrustum(),_(R,x,X.camera,j,this.type)}X.isPointLightShadow!==!0&&this.type===fr&&E(X,x),X.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(T,N,C)};function E(w,R){let x=e.update(y);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new un(s.x,s.y,{format:Yi,type:ni})),f.uniforms.shadow_pass.value=w.map.depthTexture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(R,null,x,f,y,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(R,null,x,d,y,null)}function M(w,R,x,T){let N=null,C=x.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)N=C;else if(N=x.isPointLight===!0?c:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let D=N.uuid,F=R.uuid,W=l[D];W===void 0&&(W={},l[D]=W);let k=W[F];k===void 0&&(k=N.clone(),W[F]=k,R.addEventListener("dispose",S)),N=k}if(N.visible=R.visible,N.wireframe=R.wireframe,T===fr?N.side=R.shadowSide!==null?R.shadowSide:R.side:N.side=R.shadowSide!==null?R.shadowSide:u[R.side],N.alphaMap=R.alphaMap,N.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,N.map=R.map,N.clipShadows=R.clipShadows,N.clippingPlanes=R.clippingPlanes,N.clipIntersection=R.clipIntersection,N.displacementMap=R.displacementMap,N.displacementScale=R.displacementScale,N.displacementBias=R.displacementBias,N.wireframeLinewidth=R.wireframeLinewidth,N.linewidth=R.linewidth,x.isPointLight===!0&&N.isMeshDistanceMaterial===!0){let D=i.properties.get(N);D.light=x}return N}function _(w,R,x,T,N){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&N===fr)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,w.matrixWorld);let F=e.update(w),W=w.material;if(Array.isArray(W)){let k=F.groups;for(let j=0,X=k.length;j<X;j++){let G=k[j],le=W[G.materialIndex];if(le&&le.visible){let he=M(w,le,T,N);w.onBeforeShadow(i,w,R,x,F,he,G),i.renderBufferDirect(x,null,F,he,w,G),w.onAfterShadow(i,w,R,x,F,he,G)}}}else if(W.visible){let k=M(w,W,T,N);w.onBeforeShadow(i,w,R,x,F,k,null),i.renderBufferDirect(x,null,F,k,w,null),w.onAfterShadow(i,w,R,x,F,k,null)}}let D=w.children;for(let F=0,W=D.length;F<W;F++)_(D[F],R,x,T,N)}function S(w){w.target.removeEventListener("dispose",S);for(let x in l){let T=l[x],N=w.target.uuid;N in T&&(T[N].dispose(),delete T[N])}}}function r1(i,e){function t(){let q=!1,we=new at,pe=null,Ae=new at(0,0,0,0);return{setMask:function(Pe){pe!==Pe&&!q&&(i.colorMask(Pe,Pe,Pe,Pe),pe=Pe)},setLocked:function(Pe){q=Pe},setClear:function(Pe,xe,ze,Ue,bt){bt===!0&&(Pe*=Ue,xe*=Ue,ze*=Ue),we.set(Pe,xe,ze,Ue),Ae.equals(we)===!1&&(i.clearColor(Pe,xe,ze,Ue),Ae.copy(we))},reset:function(){q=!1,pe=null,Ae.set(-1,0,0,0)}}}function n(){let q=!1,we=!1,pe=null,Ae=null,Pe=null;return{setReversed:function(xe){if(we!==xe){let ze=e.get("EXT_clip_control");xe?ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.ZERO_TO_ONE_EXT):ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.NEGATIVE_ONE_TO_ONE_EXT),we=xe;let Ue=Pe;Pe=null,this.setClear(Ue)}},getReversed:function(){return we},setTest:function(xe){xe?z(i.DEPTH_TEST):O(i.DEPTH_TEST)},setMask:function(xe){pe!==xe&&!q&&(i.depthMask(xe),pe=xe)},setFunc:function(xe){if(we&&(xe=hp[xe]),Ae!==xe){switch(xe){case Pa:i.depthFunc(i.NEVER);break;case La:i.depthFunc(i.ALWAYS);break;case Na:i.depthFunc(i.LESS);break;case us:i.depthFunc(i.LEQUAL);break;case Da:i.depthFunc(i.EQUAL);break;case Ua:i.depthFunc(i.GEQUAL);break;case Oa:i.depthFunc(i.GREATER);break;case Fa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ae=xe}},setLocked:function(xe){q=xe},setClear:function(xe){Pe!==xe&&(Pe=xe,we&&(xe=1-xe),i.clearDepth(xe))},reset:function(){q=!1,pe=null,Ae=null,Pe=null,we=!1}}}function s(){let q=!1,we=null,pe=null,Ae=null,Pe=null,xe=null,ze=null,Ue=null,bt=null;return{setTest:function(xt){q||(xt?z(i.STENCIL_TEST):O(i.STENCIL_TEST))},setMask:function(xt){we!==xt&&!q&&(i.stencilMask(xt),we=xt)},setFunc:function(xt,Hn,Gn){(pe!==xt||Ae!==Hn||Pe!==Gn)&&(i.stencilFunc(xt,Hn,Gn),pe=xt,Ae=Hn,Pe=Gn)},setOp:function(xt,Hn,Gn){(xe!==xt||ze!==Hn||Ue!==Gn)&&(i.stencilOp(xt,Hn,Gn),xe=xt,ze=Hn,Ue=Gn)},setLocked:function(xt){q=xt},setClear:function(xt){bt!==xt&&(i.clearStencil(xt),bt=xt)},reset:function(){q=!1,we=null,pe=null,Ae=null,Pe=null,xe=null,ze=null,Ue=null,bt=null}}}let r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},u={},f={},d=new WeakMap,m=[],y=null,g=!1,p=null,E=null,M=null,_=null,S=null,w=null,R=null,x=new Ve(0,0,0),T=0,N=!1,C=null,D=null,F=null,W=null,k=null,j=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),X=!1,G=0,le=i.getParameter(i.VERSION);le.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(le)[1]),X=G>=1):le.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(le)[1]),X=G>=2);let he=null,_e={},ye=i.getParameter(i.SCISSOR_BOX),Be=i.getParameter(i.VIEWPORT),Je=new at().fromArray(ye),Ze=new at().fromArray(Be);function ce(q,we,pe,Ae){let Pe=new Uint8Array(4),xe=i.createTexture();i.bindTexture(q,xe),i.texParameteri(q,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(q,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ze=0;ze<pe;ze++)q===i.TEXTURE_3D||q===i.TEXTURE_2D_ARRAY?i.texImage3D(we,0,i.RGBA,1,1,Ae,0,i.RGBA,i.UNSIGNED_BYTE,Pe):i.texImage2D(we+ze,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Pe);return xe}let Y={};Y[i.TEXTURE_2D]=ce(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=ce(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=ce(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=ce(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),z(i.DEPTH_TEST),o.setFunc(us),K(!1),ee(Oh),z(i.CULL_FACE),H(ei);function z(q){h[q]!==!0&&(i.enable(q),h[q]=!0)}function O(q){h[q]!==!1&&(i.disable(q),h[q]=!1)}function L(q,we){return f[q]!==we?(i.bindFramebuffer(q,we),f[q]=we,q===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=we),q===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=we),!0):!1}function V(q,we){let pe=m,Ae=!1;if(q){pe=d.get(we),pe===void 0&&(pe=[],d.set(we,pe));let Pe=q.textures;if(pe.length!==Pe.length||pe[0]!==i.COLOR_ATTACHMENT0){for(let xe=0,ze=Pe.length;xe<ze;xe++)pe[xe]=i.COLOR_ATTACHMENT0+xe;pe.length=Pe.length,Ae=!0}}else pe[0]!==i.BACK&&(pe[0]=i.BACK,Ae=!0);Ae&&i.drawBuffers(pe)}function re(q){return y!==q?(i.useProgram(q),y=q,!0):!1}let de={[Fi]:i.FUNC_ADD,[Dd]:i.FUNC_SUBTRACT,[Ud]:i.FUNC_REVERSE_SUBTRACT};de[Od]=i.MIN,de[Fd]=i.MAX;let I={[Bd]:i.ZERO,[zd]:i.ONE,[kd]:i.SRC_COLOR,[Ca]:i.SRC_ALPHA,[qd]:i.SRC_ALPHA_SATURATE,[Wd]:i.DST_COLOR,[Hd]:i.DST_ALPHA,[Vd]:i.ONE_MINUS_SRC_COLOR,[Ia]:i.ONE_MINUS_SRC_ALPHA,[Xd]:i.ONE_MINUS_DST_COLOR,[Gd]:i.ONE_MINUS_DST_ALPHA,[Zd]:i.CONSTANT_COLOR,[Yd]:i.ONE_MINUS_CONSTANT_COLOR,[Jd]:i.CONSTANT_ALPHA,[$d]:i.ONE_MINUS_CONSTANT_ALPHA};function H(q,we,pe,Ae,Pe,xe,ze,Ue,bt,xt){if(q===ei){g===!0&&(O(i.BLEND),g=!1);return}if(g===!1&&(z(i.BLEND),g=!0),q!==Nd){if(q!==p||xt!==N){if((E!==Fi||S!==Fi)&&(i.blendEquation(i.FUNC_ADD),E=Fi,S=Fi),xt)switch(q){case hs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Fh:i.blendFunc(i.ONE,i.ONE);break;case Bh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:qe("WebGLState: Invalid blending: ",q);break}else switch(q){case hs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Fh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Bh:qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case zh:qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:qe("WebGLState: Invalid blending: ",q);break}M=null,_=null,w=null,R=null,x.set(0,0,0),T=0,p=q,N=xt}return}Pe=Pe||we,xe=xe||pe,ze=ze||Ae,(we!==E||Pe!==S)&&(i.blendEquationSeparate(de[we],de[Pe]),E=we,S=Pe),(pe!==M||Ae!==_||xe!==w||ze!==R)&&(i.blendFuncSeparate(I[pe],I[Ae],I[xe],I[ze]),M=pe,_=Ae,w=xe,R=ze),(Ue.equals(x)===!1||bt!==T)&&(i.blendColor(Ue.r,Ue.g,Ue.b,bt),x.copy(Ue),T=bt),p=q,N=!1}function B(q,we){q.side===jt?O(i.CULL_FACE):z(i.CULL_FACE);let pe=q.side===Kt;we&&(pe=!pe),K(pe),q.blending===hs&&q.transparent===!1?H(ei):H(q.blending,q.blendEquation,q.blendSrc,q.blendDst,q.blendEquationAlpha,q.blendSrcAlpha,q.blendDstAlpha,q.blendColor,q.blendAlpha,q.premultipliedAlpha),o.setFunc(q.depthFunc),o.setTest(q.depthTest),o.setMask(q.depthWrite),r.setMask(q.colorWrite);let Ae=q.stencilWrite;a.setTest(Ae),Ae&&(a.setMask(q.stencilWriteMask),a.setFunc(q.stencilFunc,q.stencilRef,q.stencilFuncMask),a.setOp(q.stencilFail,q.stencilZFail,q.stencilZPass)),me(q.polygonOffset,q.polygonOffsetFactor,q.polygonOffsetUnits),q.alphaToCoverage===!0?z(i.SAMPLE_ALPHA_TO_COVERAGE):O(i.SAMPLE_ALPHA_TO_COVERAGE)}function K(q){C!==q&&(q?i.frontFace(i.CW):i.frontFace(i.CCW),C=q)}function ee(q){q!==Id?(z(i.CULL_FACE),q!==D&&(q===Oh?i.cullFace(i.BACK):q===Pd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):O(i.CULL_FACE),D=q}function oe(q){q!==F&&(X&&i.lineWidth(q),F=q)}function me(q,we,pe){q?(z(i.POLYGON_OFFSET_FILL),(W!==we||k!==pe)&&(W=we,k=pe,o.getReversed()&&(we=-we),i.polygonOffset(we,pe))):O(i.POLYGON_OFFSET_FILL)}function ge(q){q?z(i.SCISSOR_TEST):O(i.SCISSOR_TEST)}function Z(q){q===void 0&&(q=i.TEXTURE0+j-1),he!==q&&(i.activeTexture(q),he=q)}function b(q,we,pe){pe===void 0&&(he===null?pe=i.TEXTURE0+j-1:pe=he);let Ae=_e[pe];Ae===void 0&&(Ae={type:void 0,texture:void 0},_e[pe]=Ae),(Ae.type!==q||Ae.texture!==we)&&(he!==pe&&(i.activeTexture(pe),he=pe),i.bindTexture(q,we||Y[q]),Ae.type=q,Ae.texture=we)}function Ie(){let q=_e[he];q!==void 0&&q.type!==void 0&&(i.bindTexture(q.type,null),q.type=void 0,q.texture=void 0)}function De(){try{i.compressedTexImage2D(...arguments)}catch(q){qe("WebGLState:",q)}}function P(){try{i.compressedTexImage3D(...arguments)}catch(q){qe("WebGLState:",q)}}function v(){try{i.texSubImage2D(...arguments)}catch(q){qe("WebGLState:",q)}}function J(){try{i.texSubImage3D(...arguments)}catch(q){qe("WebGLState:",q)}}function Q(){try{i.compressedTexSubImage2D(...arguments)}catch(q){qe("WebGLState:",q)}}function se(){try{i.compressedTexSubImage3D(...arguments)}catch(q){qe("WebGLState:",q)}}function ve(){try{i.texStorage2D(...arguments)}catch(q){qe("WebGLState:",q)}}function Me(){try{i.texStorage3D(...arguments)}catch(q){qe("WebGLState:",q)}}function ae(){try{i.texImage2D(...arguments)}catch(q){qe("WebGLState:",q)}}function fe(){try{i.texImage3D(...arguments)}catch(q){qe("WebGLState:",q)}}function Se(q){return u[q]!==void 0?u[q]:i.getParameter(q)}function Oe(q,we){u[q]!==we&&(i.pixelStorei(q,we),u[q]=we)}function Te(q){Je.equals(q)===!1&&(i.scissor(q.x,q.y,q.z,q.w),Je.copy(q))}function Ee(q){Ze.equals(q)===!1&&(i.viewport(q.x,q.y,q.z,q.w),Ze.copy(q))}function Xe(q,we){let pe=l.get(we);pe===void 0&&(pe=new WeakMap,l.set(we,pe));let Ae=pe.get(q);Ae===void 0&&(Ae=i.getUniformBlockIndex(we,q.name),pe.set(q,Ae))}function Ye(q,we){let Ae=l.get(we).get(q);c.get(we)!==Ae&&(i.uniformBlockBinding(we,Ae,q.__bindingPointIndex),c.set(we,Ae))}function Ke(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},he=null,_e={},f={},d=new WeakMap,m=[],y=null,g=!1,p=null,E=null,M=null,_=null,S=null,w=null,R=null,x=new Ve(0,0,0),T=0,N=!1,C=null,D=null,F=null,W=null,k=null,Je.set(0,0,i.canvas.width,i.canvas.height),Ze.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:z,disable:O,bindFramebuffer:L,drawBuffers:V,useProgram:re,setBlending:H,setMaterial:B,setFlipSided:K,setCullFace:ee,setLineWidth:oe,setPolygonOffset:me,setScissorTest:ge,activeTexture:Z,bindTexture:b,unbindTexture:Ie,compressedTexImage2D:De,compressedTexImage3D:P,texImage2D:ae,texImage3D:fe,pixelStorei:Oe,getParameter:Se,updateUBOMapping:Xe,uniformBlockBinding:Ye,texStorage2D:ve,texStorage3D:Me,texSubImage2D:v,texSubImage3D:J,compressedTexSubImage2D:Q,compressedTexSubImage3D:se,scissor:Te,viewport:Ee,reset:Ke}}function o1(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ue,h=new WeakMap,u=new Set,f,d=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(P,v){return m?new OffscreenCanvas(P,v):Qr("canvas")}function g(P,v,J){let Q=1,se=De(P);if((se.width>J||se.height>J)&&(Q=J/Math.max(se.width,se.height)),Q<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let ve=Math.floor(Q*se.width),Me=Math.floor(Q*se.height);f===void 0&&(f=y(ve,Me));let ae=v?y(ve,Me):f;return ae.width=ve,ae.height=Me,ae.getContext("2d").drawImage(P,0,0,ve,Me),Ge("WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+ve+"x"+Me+")."),ae}else return"data"in P&&Ge("WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),P;return P}function p(P){return P.generateMipmaps}function E(P){i.generateMipmap(P)}function M(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(P,v,J,Q,se,ve=!1){if(P!==null){if(i[P]!==void 0)return i[P];Ge("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let Me;Q&&(Me=e.get("EXT_texture_norm16"),Me||Ge("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ae=v;if(v===i.RED&&(J===i.FLOAT&&(ae=i.R32F),J===i.HALF_FLOAT&&(ae=i.R16F),J===i.UNSIGNED_BYTE&&(ae=i.R8),J===i.UNSIGNED_SHORT&&Me&&(ae=Me.R16_EXT),J===i.SHORT&&Me&&(ae=Me.R16_SNORM_EXT)),v===i.RED_INTEGER&&(J===i.UNSIGNED_BYTE&&(ae=i.R8UI),J===i.UNSIGNED_SHORT&&(ae=i.R16UI),J===i.UNSIGNED_INT&&(ae=i.R32UI),J===i.BYTE&&(ae=i.R8I),J===i.SHORT&&(ae=i.R16I),J===i.INT&&(ae=i.R32I)),v===i.RG&&(J===i.FLOAT&&(ae=i.RG32F),J===i.HALF_FLOAT&&(ae=i.RG16F),J===i.UNSIGNED_BYTE&&(ae=i.RG8),J===i.UNSIGNED_SHORT&&Me&&(ae=Me.RG16_EXT),J===i.SHORT&&Me&&(ae=Me.RG16_SNORM_EXT)),v===i.RG_INTEGER&&(J===i.UNSIGNED_BYTE&&(ae=i.RG8UI),J===i.UNSIGNED_SHORT&&(ae=i.RG16UI),J===i.UNSIGNED_INT&&(ae=i.RG32UI),J===i.BYTE&&(ae=i.RG8I),J===i.SHORT&&(ae=i.RG16I),J===i.INT&&(ae=i.RG32I)),v===i.RGB_INTEGER&&(J===i.UNSIGNED_BYTE&&(ae=i.RGB8UI),J===i.UNSIGNED_SHORT&&(ae=i.RGB16UI),J===i.UNSIGNED_INT&&(ae=i.RGB32UI),J===i.BYTE&&(ae=i.RGB8I),J===i.SHORT&&(ae=i.RGB16I),J===i.INT&&(ae=i.RGB32I)),v===i.RGBA_INTEGER&&(J===i.UNSIGNED_BYTE&&(ae=i.RGBA8UI),J===i.UNSIGNED_SHORT&&(ae=i.RGBA16UI),J===i.UNSIGNED_INT&&(ae=i.RGBA32UI),J===i.BYTE&&(ae=i.RGBA8I),J===i.SHORT&&(ae=i.RGBA16I),J===i.INT&&(ae=i.RGBA32I)),v===i.RGB&&(J===i.UNSIGNED_SHORT&&Me&&(ae=Me.RGB16_EXT),J===i.SHORT&&Me&&(ae=Me.RGB16_SNORM_EXT),J===i.UNSIGNED_INT_5_9_9_9_REV&&(ae=i.RGB9_E5),J===i.UNSIGNED_INT_10F_11F_11F_REV&&(ae=i.R11F_G11F_B10F)),v===i.RGBA){let fe=ve?jr:it.getTransfer(se);J===i.FLOAT&&(ae=i.RGBA32F),J===i.HALF_FLOAT&&(ae=i.RGBA16F),J===i.UNSIGNED_BYTE&&(ae=fe===lt?i.SRGB8_ALPHA8:i.RGBA8),J===i.UNSIGNED_SHORT&&Me&&(ae=Me.RGBA16_EXT),J===i.SHORT&&Me&&(ae=Me.RGBA16_SNORM_EXT),J===i.UNSIGNED_SHORT_4_4_4_4&&(ae=i.RGBA4),J===i.UNSIGNED_SHORT_5_5_5_1&&(ae=i.RGB5_A1)}return(ae===i.R16F||ae===i.R32F||ae===i.RG16F||ae===i.RG32F||ae===i.RGBA16F||ae===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ae}function S(P,v){let J;return P?v===null||v===Ln||v===mr?J=i.DEPTH24_STENCIL8:v===Sn?J=i.DEPTH32F_STENCIL8:v===pr&&(J=i.DEPTH24_STENCIL8,Ge("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Ln||v===mr?J=i.DEPTH_COMPONENT24:v===Sn?J=i.DEPTH_COMPONENT32F:v===pr&&(J=i.DEPTH_COMPONENT16),J}function w(P,v){return p(P)===!0||P.isFramebufferTexture&&P.minFilter!==Dt&&P.minFilter!==Ct?Math.log2(Math.max(v.width,v.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?v.mipmaps.length:1}function R(P){let v=P.target;v.removeEventListener("dispose",R),T(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&u.delete(v)}function x(P){let v=P.target;v.removeEventListener("dispose",x),C(v)}function T(P){let v=n.get(P);if(v.__webglInit===void 0)return;let J=P.source,Q=d.get(J);if(Q){let se=Q[v.__cacheKey];se.usedTimes--,se.usedTimes===0&&N(P),Object.keys(Q).length===0&&d.delete(J)}n.remove(P)}function N(P){let v=n.get(P);i.deleteTexture(v.__webglTexture);let J=P.source,Q=d.get(J);delete Q[v.__cacheKey],o.memory.textures--}function C(P){let v=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(v.__webglFramebuffer[Q]))for(let se=0;se<v.__webglFramebuffer[Q].length;se++)i.deleteFramebuffer(v.__webglFramebuffer[Q][se]);else i.deleteFramebuffer(v.__webglFramebuffer[Q]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[Q])}else{if(Array.isArray(v.__webglFramebuffer))for(let Q=0;Q<v.__webglFramebuffer.length;Q++)i.deleteFramebuffer(v.__webglFramebuffer[Q]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Q=0;Q<v.__webglColorRenderbuffer.length;Q++)v.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[Q]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let J=P.textures;for(let Q=0,se=J.length;Q<se;Q++){let ve=n.get(J[Q]);ve.__webglTexture&&(i.deleteTexture(ve.__webglTexture),o.memory.textures--),n.remove(J[Q])}n.remove(P)}let D=0;function F(){D=0}function W(){return D}function k(P){D=P}function j(){let P=D;return P>=s.maxTextures&&Ge("WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),D+=1,P}function X(P){let v=[];return v.push(P.wrapS),v.push(P.wrapT),v.push(P.wrapR||0),v.push(P.magFilter),v.push(P.minFilter),v.push(P.anisotropy),v.push(P.internalFormat),v.push(P.format),v.push(P.type),v.push(P.generateMipmaps),v.push(P.premultiplyAlpha),v.push(P.flipY),v.push(P.unpackAlignment),v.push(P.colorSpace),v.join()}function G(P,v){let J=n.get(P);if(P.isVideoTexture&&b(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&J.__version!==P.version){let Q=P.image;if(Q===null)Ge("WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)Ge("WebGLRenderer: Texture marked for update but image is incomplete");else{O(J,P,v);return}}else P.isExternalTexture&&(J.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,J.__webglTexture,i.TEXTURE0+v)}function le(P,v){let J=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&J.__version!==P.version){O(J,P,v);return}else P.isExternalTexture&&(J.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,J.__webglTexture,i.TEXTURE0+v)}function he(P,v){let J=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&J.__version!==P.version){O(J,P,v);return}t.bindTexture(i.TEXTURE_3D,J.__webglTexture,i.TEXTURE0+v)}function _e(P,v){let J=n.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&J.__version!==P.version){L(J,P,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture,i.TEXTURE0+v)}let ye={[Yn]:i.REPEAT,[nn]:i.CLAMP_TO_EDGE,[Bi]:i.MIRRORED_REPEAT},Be={[Dt]:i.NEAREST,[dc]:i.NEAREST_MIPMAP_NEAREST,[xs]:i.NEAREST_MIPMAP_LINEAR,[Ct]:i.LINEAR,[dr]:i.LINEAR_MIPMAP_NEAREST,[ti]:i.LINEAR_MIPMAP_LINEAR},Je={[tp]:i.NEVER,[op]:i.ALWAYS,[np]:i.LESS,[jc]:i.LEQUAL,[ip]:i.EQUAL,[Qc]:i.GEQUAL,[sp]:i.GREATER,[rp]:i.NOTEQUAL};function Ze(P,v){if(v.type===Sn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Ct||v.magFilter===dr||v.magFilter===xs||v.magFilter===ti||v.minFilter===Ct||v.minFilter===dr||v.minFilter===xs||v.minFilter===ti)&&Ge("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,ye[v.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,ye[v.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,ye[v.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,Be[v.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,Be[v.minFilter]),v.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,Je[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Dt||v.minFilter!==xs&&v.minFilter!==ti||v.type===Sn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let J=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function ce(P,v){let J=!1;P.__webglInit===void 0&&(P.__webglInit=!0,v.addEventListener("dispose",R));let Q=v.source,se=d.get(Q);se===void 0&&(se={},d.set(Q,se));let ve=X(v);if(ve!==P.__cacheKey){se[ve]===void 0&&(se[ve]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,J=!0),se[ve].usedTimes++;let Me=se[P.__cacheKey];Me!==void 0&&(se[P.__cacheKey].usedTimes--,Me.usedTimes===0&&N(v)),P.__cacheKey=ve,P.__webglTexture=se[ve].texture}return J}function Y(P,v,J){return Math.floor(Math.floor(P/J)/v)}function z(P,v,J,Q){let ve=P.updateRanges;if(ve.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,J,Q,v.data);else{ve.sort((Oe,Te)=>Oe.start-Te.start);let Me=0;for(let Oe=1;Oe<ve.length;Oe++){let Te=ve[Me],Ee=ve[Oe],Xe=Te.start+Te.count,Ye=Y(Ee.start,v.width,4),Ke=Y(Te.start,v.width,4);Ee.start<=Xe+1&&Ye===Ke&&Y(Ee.start+Ee.count-1,v.width,4)===Ye?Te.count=Math.max(Te.count,Ee.start+Ee.count-Te.start):(++Me,ve[Me]=Ee)}ve.length=Me+1;let ae=t.getParameter(i.UNPACK_ROW_LENGTH),fe=t.getParameter(i.UNPACK_SKIP_PIXELS),Se=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let Oe=0,Te=ve.length;Oe<Te;Oe++){let Ee=ve[Oe],Xe=Math.floor(Ee.start/4),Ye=Math.ceil(Ee.count/4),Ke=Xe%v.width,q=Math.floor(Xe/v.width),we=Ye,pe=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ke),t.pixelStorei(i.UNPACK_SKIP_ROWS,q),t.texSubImage2D(i.TEXTURE_2D,0,Ke,q,we,pe,J,Q,v.data)}P.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,ae),t.pixelStorei(i.UNPACK_SKIP_PIXELS,fe),t.pixelStorei(i.UNPACK_SKIP_ROWS,Se)}}function O(P,v,J){let Q=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Q=i.TEXTURE_3D);let se=ce(P,v),ve=v.source;t.bindTexture(Q,P.__webglTexture,i.TEXTURE0+J);let Me=n.get(ve);if(ve.version!==Me.__version||se===!0){if(t.activeTexture(i.TEXTURE0+J),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let pe=it.getPrimaries(it.workingColorSpace),Ae=v.colorSpace===Nn?null:it.getPrimaries(v.colorSpace),Pe=v.colorSpace===Nn||pe===Ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe)}t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let fe=g(v.image,!1,s.maxTextureSize);fe=Ie(v,fe);let Se=r.convert(v.format,v.colorSpace),Oe=r.convert(v.type),Te=_(v.internalFormat,Se,Oe,v.normalized,v.colorSpace,v.isVideoTexture);Ze(Q,v);let Ee,Xe=v.mipmaps,Ye=v.isVideoTexture!==!0,Ke=Me.__version===void 0||se===!0,q=ve.dataReady,we=w(v,fe);if(v.isDepthTexture)Te=S(v.format===Zi,v.type),Ke&&(Ye?t.texStorage2D(i.TEXTURE_2D,1,Te,fe.width,fe.height):t.texImage2D(i.TEXTURE_2D,0,Te,fe.width,fe.height,0,Se,Oe,null));else if(v.isDataTexture)if(Xe.length>0){Ye&&Ke&&t.texStorage2D(i.TEXTURE_2D,we,Te,Xe[0].width,Xe[0].height);for(let pe=0,Ae=Xe.length;pe<Ae;pe++)Ee=Xe[pe],Ye?q&&t.texSubImage2D(i.TEXTURE_2D,pe,0,0,Ee.width,Ee.height,Se,Oe,Ee.data):t.texImage2D(i.TEXTURE_2D,pe,Te,Ee.width,Ee.height,0,Se,Oe,Ee.data);v.generateMipmaps=!1}else Ye?(Ke&&t.texStorage2D(i.TEXTURE_2D,we,Te,fe.width,fe.height),q&&z(v,fe,Se,Oe)):t.texImage2D(i.TEXTURE_2D,0,Te,fe.width,fe.height,0,Se,Oe,fe.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ye&&Ke&&t.texStorage3D(i.TEXTURE_2D_ARRAY,we,Te,Xe[0].width,Xe[0].height,fe.depth);for(let pe=0,Ae=Xe.length;pe<Ae;pe++)if(Ee=Xe[pe],v.format!==on)if(Se!==null)if(Ye){if(q)if(v.layerUpdates.size>0){let Pe=ou(Ee.width,Ee.height,v.format,v.type);for(let xe of v.layerUpdates){let ze=Ee.data.subarray(xe*Pe/Ee.data.BYTES_PER_ELEMENT,(xe+1)*Pe/Ee.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,pe,0,0,xe,Ee.width,Ee.height,1,Se,ze)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,pe,0,0,0,Ee.width,Ee.height,fe.depth,Se,Ee.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,pe,Te,Ee.width,Ee.height,fe.depth,0,Ee.data,0,0);else Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ye?q&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,pe,0,0,0,Ee.width,Ee.height,fe.depth,Se,Oe,Ee.data):t.texImage3D(i.TEXTURE_2D_ARRAY,pe,Te,Ee.width,Ee.height,fe.depth,0,Se,Oe,Ee.data)}else{Ye&&Ke&&t.texStorage2D(i.TEXTURE_2D,we,Te,Xe[0].width,Xe[0].height);for(let pe=0,Ae=Xe.length;pe<Ae;pe++)Ee=Xe[pe],v.format!==on?Se!==null?Ye?q&&t.compressedTexSubImage2D(i.TEXTURE_2D,pe,0,0,Ee.width,Ee.height,Se,Ee.data):t.compressedTexImage2D(i.TEXTURE_2D,pe,Te,Ee.width,Ee.height,0,Ee.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?q&&t.texSubImage2D(i.TEXTURE_2D,pe,0,0,Ee.width,Ee.height,Se,Oe,Ee.data):t.texImage2D(i.TEXTURE_2D,pe,Te,Ee.width,Ee.height,0,Se,Oe,Ee.data)}else if(v.isDataArrayTexture)if(Ye){if(Ke&&t.texStorage3D(i.TEXTURE_2D_ARRAY,we,Te,fe.width,fe.height,fe.depth),q)if(v.layerUpdates.size>0){let pe=ou(fe.width,fe.height,v.format,v.type);for(let Ae of v.layerUpdates){let Pe=fe.data.subarray(Ae*pe/fe.data.BYTES_PER_ELEMENT,(Ae+1)*pe/fe.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ae,fe.width,fe.height,1,Se,Oe,Pe)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,fe.width,fe.height,fe.depth,Se,Oe,fe.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Te,fe.width,fe.height,fe.depth,0,Se,Oe,fe.data);else if(v.isData3DTexture)Ye?(Ke&&t.texStorage3D(i.TEXTURE_3D,we,Te,fe.width,fe.height,fe.depth),q&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,fe.width,fe.height,fe.depth,Se,Oe,fe.data)):t.texImage3D(i.TEXTURE_3D,0,Te,fe.width,fe.height,fe.depth,0,Se,Oe,fe.data);else if(v.isFramebufferTexture){if(Ke)if(Ye)t.texStorage2D(i.TEXTURE_2D,we,Te,fe.width,fe.height);else{let pe=fe.width,Ae=fe.height;for(let Pe=0;Pe<we;Pe++)t.texImage2D(i.TEXTURE_2D,Pe,Te,pe,Ae,0,Se,Oe,null),pe>>=1,Ae>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){let pe=i.canvas;if(pe.hasAttribute("layoutsubtree")||pe.setAttribute("layoutsubtree","true"),fe.parentNode!==pe){pe.appendChild(fe),u.add(v),pe.onpaint=Ae=>{let Pe=Ae.changedElements;for(let xe of u)Pe.includes(xe.image)&&(xe.needsUpdate=!0)},pe.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,fe);else{let Pe=i.RGBA,xe=i.RGBA,ze=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Pe,xe,ze,fe)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Xe.length>0){if(Ye&&Ke){let pe=De(Xe[0]);t.texStorage2D(i.TEXTURE_2D,we,Te,pe.width,pe.height)}for(let pe=0,Ae=Xe.length;pe<Ae;pe++)Ee=Xe[pe],Ye?q&&t.texSubImage2D(i.TEXTURE_2D,pe,0,0,Se,Oe,Ee):t.texImage2D(i.TEXTURE_2D,pe,Te,Se,Oe,Ee);v.generateMipmaps=!1}else if(Ye){if(Ke){let pe=De(fe);t.texStorage2D(i.TEXTURE_2D,we,Te,pe.width,pe.height)}q&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Se,Oe,fe)}else t.texImage2D(i.TEXTURE_2D,0,Te,Se,Oe,fe);p(v)&&E(Q),Me.__version=ve.version,v.onUpdate&&v.onUpdate(v)}P.__version=v.version}function L(P,v,J){if(v.image.length!==6)return;let Q=ce(P,v),se=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+J);let ve=n.get(se);if(se.version!==ve.__version||Q===!0){t.activeTexture(i.TEXTURE0+J);let Me=it.getPrimaries(it.workingColorSpace),ae=v.colorSpace===Nn?null:it.getPrimaries(v.colorSpace),fe=v.colorSpace===Nn||Me===ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);let Se=v.isCompressedTexture||v.image[0].isCompressedTexture,Oe=v.image[0]&&v.image[0].isDataTexture,Te=[];for(let xe=0;xe<6;xe++)!Se&&!Oe?Te[xe]=g(v.image[xe],!0,s.maxCubemapSize):Te[xe]=Oe?v.image[xe].image:v.image[xe],Te[xe]=Ie(v,Te[xe]);let Ee=Te[0],Xe=r.convert(v.format,v.colorSpace),Ye=r.convert(v.type),Ke=_(v.internalFormat,Xe,Ye,v.normalized,v.colorSpace),q=v.isVideoTexture!==!0,we=ve.__version===void 0||Q===!0,pe=se.dataReady,Ae=w(v,Ee);Ze(i.TEXTURE_CUBE_MAP,v);let Pe;if(Se){q&&we&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ae,Ke,Ee.width,Ee.height);for(let xe=0;xe<6;xe++){Pe=Te[xe].mipmaps;for(let ze=0;ze<Pe.length;ze++){let Ue=Pe[ze];v.format!==on?Xe!==null?q?pe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ze,0,0,Ue.width,Ue.height,Xe,Ue.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ze,Ke,Ue.width,Ue.height,0,Ue.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):q?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ze,0,0,Ue.width,Ue.height,Xe,Ye,Ue.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ze,Ke,Ue.width,Ue.height,0,Xe,Ye,Ue.data)}}}else{if(Pe=v.mipmaps,q&&we){Pe.length>0&&Ae++;let xe=De(Te[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ae,Ke,xe.width,xe.height)}for(let xe=0;xe<6;xe++)if(Oe){q?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,Te[xe].width,Te[xe].height,Xe,Ye,Te[xe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,Ke,Te[xe].width,Te[xe].height,0,Xe,Ye,Te[xe].data);for(let ze=0;ze<Pe.length;ze++){let bt=Pe[ze].image[xe].image;q?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ze+1,0,0,bt.width,bt.height,Xe,Ye,bt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ze+1,Ke,bt.width,bt.height,0,Xe,Ye,bt.data)}}else{q?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,Xe,Ye,Te[xe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,Ke,Xe,Ye,Te[xe]);for(let ze=0;ze<Pe.length;ze++){let Ue=Pe[ze];q?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ze+1,0,0,Xe,Ye,Ue.image[xe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ze+1,Ke,Xe,Ye,Ue.image[xe])}}}p(v)&&E(i.TEXTURE_CUBE_MAP),ve.__version=se.version,v.onUpdate&&v.onUpdate(v)}P.__version=v.version}function V(P,v,J,Q,se,ve){let Me=r.convert(J.format,J.colorSpace),ae=r.convert(J.type),fe=_(J.internalFormat,Me,ae,J.normalized,J.colorSpace),Se=n.get(v),Oe=n.get(J);if(Oe.__renderTarget=v,!Se.__hasExternalTextures){let Te=Math.max(1,v.width>>ve),Ee=Math.max(1,v.height>>ve);se===i.TEXTURE_3D||se===i.TEXTURE_2D_ARRAY?t.texImage3D(se,ve,fe,Te,Ee,v.depth,0,Me,ae,null):t.texImage2D(se,ve,fe,Te,Ee,0,Me,ae,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),Z(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,se,Oe.__webglTexture,0,ge(v)):(se===i.TEXTURE_2D||se>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,se,Oe.__webglTexture,ve),t.bindFramebuffer(i.FRAMEBUFFER,null)}function re(P,v,J){if(i.bindRenderbuffer(i.RENDERBUFFER,P),v.depthBuffer){let Q=v.depthTexture,se=Q&&Q.isDepthTexture?Q.type:null,ve=S(v.stencilBuffer,se),Me=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Z(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ge(v),ve,v.width,v.height):J?i.renderbufferStorageMultisample(i.RENDERBUFFER,ge(v),ve,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ve,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Me,i.RENDERBUFFER,P)}else{let Q=v.textures;for(let se=0;se<Q.length;se++){let ve=Q[se],Me=r.convert(ve.format,ve.colorSpace),ae=r.convert(ve.type),fe=_(ve.internalFormat,Me,ae,ve.normalized,ve.colorSpace);Z(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ge(v),fe,v.width,v.height):J?i.renderbufferStorageMultisample(i.RENDERBUFFER,ge(v),fe,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,fe,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function de(P,v,J){let Q=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let se=n.get(v.depthTexture);if(se.__renderTarget=v,(!se.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),Q){if(se.__webglInit===void 0&&(se.__webglInit=!0,v.depthTexture.addEventListener("dispose",R)),se.__webglTexture===void 0){se.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,se.__webglTexture),Ze(i.TEXTURE_CUBE_MAP,v.depthTexture);let Se=r.convert(v.depthTexture.format),Oe=r.convert(v.depthTexture.type),Te;v.depthTexture.format===Jn?Te=i.DEPTH_COMPONENT24:v.depthTexture.format===Zi&&(Te=i.DEPTH24_STENCIL8);for(let Ee=0;Ee<6;Ee++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,Te,v.width,v.height,0,Se,Oe,null)}}else G(v.depthTexture,0);let ve=se.__webglTexture,Me=ge(v),ae=Q?i.TEXTURE_CUBE_MAP_POSITIVE_X+J:i.TEXTURE_2D,fe=v.depthTexture.format===Zi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===Jn)Z(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,fe,ae,ve,0,Me):i.framebufferTexture2D(i.FRAMEBUFFER,fe,ae,ve,0);else if(v.depthTexture.format===Zi)Z(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,fe,ae,ve,0,Me):i.framebufferTexture2D(i.FRAMEBUFFER,fe,ae,ve,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function I(P){let v=n.get(P),J=P.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==P.depthTexture){let Q=P.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Q){let se=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Q.removeEventListener("dispose",se)};Q.addEventListener("dispose",se),v.__depthDisposeCallback=se}v.__boundDepthTexture=Q}if(P.depthTexture&&!v.__autoAllocateDepthBuffer)if(J)for(let Q=0;Q<6;Q++)de(v.__webglFramebuffer[Q],P,Q);else{let Q=P.texture.mipmaps;Q&&Q.length>0?de(v.__webglFramebuffer[0],P,0):de(v.__webglFramebuffer,P,0)}else if(J){v.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[Q]),v.__webglDepthbuffer[Q]===void 0)v.__webglDepthbuffer[Q]=i.createRenderbuffer(),re(v.__webglDepthbuffer[Q],P,!1);else{let se=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=v.__webglDepthbuffer[Q];i.bindRenderbuffer(i.RENDERBUFFER,ve),i.framebufferRenderbuffer(i.FRAMEBUFFER,se,i.RENDERBUFFER,ve)}}else{let Q=P.texture.mipmaps;if(Q&&Q.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),re(v.__webglDepthbuffer,P,!1);else{let se=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ve),i.framebufferRenderbuffer(i.FRAMEBUFFER,se,i.RENDERBUFFER,ve)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function H(P,v,J){let Q=n.get(P);v!==void 0&&V(Q.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),J!==void 0&&I(P)}function B(P){let v=P.texture,J=n.get(P),Q=n.get(v);P.addEventListener("dispose",x);let se=P.textures,ve=P.isWebGLCubeRenderTarget===!0,Me=se.length>1;if(Me||(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=v.version,o.memory.textures++),ve){J.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(v.mipmaps&&v.mipmaps.length>0){J.__webglFramebuffer[ae]=[];for(let fe=0;fe<v.mipmaps.length;fe++)J.__webglFramebuffer[ae][fe]=i.createFramebuffer()}else J.__webglFramebuffer[ae]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){J.__webglFramebuffer=[];for(let ae=0;ae<v.mipmaps.length;ae++)J.__webglFramebuffer[ae]=i.createFramebuffer()}else J.__webglFramebuffer=i.createFramebuffer();if(Me)for(let ae=0,fe=se.length;ae<fe;ae++){let Se=n.get(se[ae]);Se.__webglTexture===void 0&&(Se.__webglTexture=i.createTexture(),o.memory.textures++)}if(P.samples>0&&Z(P)===!1){J.__webglMultisampledFramebuffer=i.createFramebuffer(),J.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let ae=0;ae<se.length;ae++){let fe=se[ae];J.__webglColorRenderbuffer[ae]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,J.__webglColorRenderbuffer[ae]);let Se=r.convert(fe.format,fe.colorSpace),Oe=r.convert(fe.type),Te=_(fe.internalFormat,Se,Oe,fe.normalized,fe.colorSpace,P.isXRRenderTarget===!0),Ee=ge(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ee,Te,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,J.__webglColorRenderbuffer[ae])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(J.__webglDepthRenderbuffer=i.createRenderbuffer(),re(J.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ve){t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),Ze(i.TEXTURE_CUBE_MAP,v);for(let ae=0;ae<6;ae++)if(v.mipmaps&&v.mipmaps.length>0)for(let fe=0;fe<v.mipmaps.length;fe++)V(J.__webglFramebuffer[ae][fe],P,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,fe);else V(J.__webglFramebuffer[ae],P,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);p(v)&&E(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Me){for(let ae=0,fe=se.length;ae<fe;ae++){let Se=se[ae],Oe=n.get(Se),Te=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Te=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Te,Oe.__webglTexture),Ze(Te,Se),V(J.__webglFramebuffer,P,Se,i.COLOR_ATTACHMENT0+ae,Te,0),p(Se)&&E(Te)}t.unbindTexture()}else{let ae=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ae=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ae,Q.__webglTexture),Ze(ae,v),v.mipmaps&&v.mipmaps.length>0)for(let fe=0;fe<v.mipmaps.length;fe++)V(J.__webglFramebuffer[fe],P,v,i.COLOR_ATTACHMENT0,ae,fe);else V(J.__webglFramebuffer,P,v,i.COLOR_ATTACHMENT0,ae,0);p(v)&&E(ae),t.unbindTexture()}P.depthBuffer&&I(P)}function K(P){let v=P.textures;for(let J=0,Q=v.length;J<Q;J++){let se=v[J];if(p(se)){let ve=M(P),Me=n.get(se).__webglTexture;t.bindTexture(ve,Me),E(ve),t.unbindTexture()}}}let ee=[],oe=[];function me(P){if(P.samples>0){if(Z(P)===!1){let v=P.textures,J=P.width,Q=P.height,se=i.COLOR_BUFFER_BIT,ve=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=n.get(P),ae=v.length>1;if(ae)for(let Se=0;Se<v.length;Se++)t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer);let fe=P.texture.mipmaps;fe&&fe.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let Se=0;Se<v.length;Se++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(se|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(se|=i.STENCIL_BUFFER_BIT)),ae){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Me.__webglColorRenderbuffer[Se]);let Oe=n.get(v[Se]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Oe,0)}i.blitFramebuffer(0,0,J,Q,0,0,J,Q,se,i.NEAREST),c===!0&&(ee.length=0,oe.length=0,ee.push(i.COLOR_ATTACHMENT0+Se),P.depthBuffer&&P.resolveDepthBuffer===!1&&(ee.push(ve),oe.push(ve),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,oe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ee))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ae)for(let Se=0;Se<v.length;Se++){t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.RENDERBUFFER,Me.__webglColorRenderbuffer[Se]);let Oe=n.get(v[Se]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.TEXTURE_2D,Oe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){let v=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function ge(P){return Math.min(s.maxSamples,P.samples)}function Z(P){let v=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function b(P){let v=o.render.frame;h.get(P)!==v&&(h.set(P,v),P.update())}function Ie(P,v){let J=P.colorSpace,Q=P.format,se=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||J!==Kr&&J!==Nn&&(it.getTransfer(J)===lt?(Q!==on||se!==rn)&&Ge("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):qe("WebGLTextures: Unsupported texture color space:",J)),v}function De(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=j,this.resetTextureUnits=F,this.getTextureUnits=W,this.setTextureUnits=k,this.setTexture2D=G,this.setTexture2DArray=le,this.setTexture3D=he,this.setTextureCube=_e,this.rebindTextures=H,this.setupRenderTarget=B,this.updateRenderTargetMipmap=K,this.updateMultisampleRenderTarget=me,this.setupDepthRenderbuffer=I,this.setupFrameBufferTexture=V,this.useMultisampledRTT=Z,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function a1(i,e){function t(n,s=Nn){let r,o=it.getTransfer(s);if(n===rn)return i.UNSIGNED_BYTE;if(n===mc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===gc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===$h)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Kh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Yh)return i.BYTE;if(n===Jh)return i.SHORT;if(n===pr)return i.UNSIGNED_SHORT;if(n===pc)return i.INT;if(n===Ln)return i.UNSIGNED_INT;if(n===Sn)return i.FLOAT;if(n===ni)return i.HALF_FLOAT;if(n===jh)return i.ALPHA;if(n===Qh)return i.RGB;if(n===on)return i.RGBA;if(n===Jn)return i.DEPTH_COMPONENT;if(n===Zi)return i.DEPTH_STENCIL;if(n===xc)return i.RED;if(n===_c)return i.RED_INTEGER;if(n===Yi)return i.RG;if(n===yc)return i.RG_INTEGER;if(n===vc)return i.RGBA_INTEGER;if(n===No||n===Do||n===Uo||n===Oo)if(o===lt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===No)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Do)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Uo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Oo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===No)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Do)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Uo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Oo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Mc||n===Sc||n===bc||n===Ec)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Mc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Sc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===bc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ec)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===wc||n===Tc||n===Ac||n===Rc||n===Cc||n===Fo||n===Ic)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===wc||n===Tc)return o===lt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ac)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Rc)return r.COMPRESSED_R11_EAC;if(n===Cc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Fo)return r.COMPRESSED_RG11_EAC;if(n===Ic)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Pc||n===Lc||n===Nc||n===Dc||n===Uc||n===Oc||n===Fc||n===Bc||n===zc||n===kc||n===Vc||n===Hc||n===Gc||n===Wc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Pc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Lc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Nc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Dc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Uc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Oc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Fc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Bc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===zc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===kc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Vc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Hc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Gc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Wc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Xc||n===qc||n===Zc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Xc)return o===lt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===qc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Zc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Yc||n===Jc||n===Bo||n===$c)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Yc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Jc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Bo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===$c)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===mr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var c1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,l1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,wu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new lo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new $t({vertexShader:c1,fragmentShader:l1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new St(new bi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Tu=class extends $n{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,m=null,y=typeof XRWebGLBinding<"u",g=new wu,p={},E=t.getContextAttributes(),M=null,_=null,S=[],w=[],R=new ue,x=null,T=new qt;T.viewport=new at;let N=new qt;N.viewport=new at;let C=[T,N],D=new lc,F=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ce){let Y=S[ce];return Y===void 0&&(Y=new tr,S[ce]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(ce){let Y=S[ce];return Y===void 0&&(Y=new tr,S[ce]=Y),Y.getGripSpace()},this.getHand=function(ce){let Y=S[ce];return Y===void 0&&(Y=new tr,S[ce]=Y),Y.getHandSpace()};function k(ce){let Y=w.indexOf(ce.inputSource);if(Y===-1)return;let z=S[Y];z!==void 0&&(z.update(ce.inputSource,ce.frame,l||o),z.dispatchEvent({type:ce.type,data:ce.inputSource}))}function j(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",j),s.removeEventListener("inputsourceschange",X);for(let ce=0;ce<S.length;ce++){let Y=w[ce];Y!==null&&(w[ce]=null,S[ce].disconnect(Y))}F=null,W=null,g.reset();for(let ce in p)delete p[ce];e.setRenderTarget(M),d=null,f=null,u=null,s=null,_=null,Ze.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ce){r=ce,n.isPresenting===!0&&Ge("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ce){a=ce,n.isPresenting===!0&&Ge("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(ce){l=ce},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&y&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(ce){if(s=ce,s!==null){if(M=e.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",j),s.addEventListener("inputsourceschange",X),E.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(R),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let z=null,O=null,L=null;E.depth&&(L=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,z=E.stencil?Zi:Jn,O=E.stencil?mr:Ln);let V={colorFormat:t.RGBA8,depthFormat:L,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(V),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),_=new un(f.textureWidth,f.textureHeight,{format:on,type:rn,depthTexture:new Si(f.textureWidth,f.textureHeight,O,void 0,void 0,void 0,void 0,void 0,void 0,z),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let z={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,z),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new un(d.framebufferWidth,d.framebufferHeight,{format:on,type:rn,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Ze.setContext(s),Ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function X(ce){for(let Y=0;Y<ce.removed.length;Y++){let z=ce.removed[Y],O=w.indexOf(z);O>=0&&(w[O]=null,S[O].disconnect(z))}for(let Y=0;Y<ce.added.length;Y++){let z=ce.added[Y],O=w.indexOf(z);if(O===-1){for(let V=0;V<S.length;V++)if(V>=w.length){w.push(z),O=V;break}else if(w[V]===null){w[V]=z,O=V;break}if(O===-1)break}let L=S[O];L&&L.connect(z)}}let G=new U,le=new U;function he(ce,Y,z){G.setFromMatrixPosition(Y.matrixWorld),le.setFromMatrixPosition(z.matrixWorld);let O=G.distanceTo(le),L=Y.projectionMatrix.elements,V=z.projectionMatrix.elements,re=L[14]/(L[10]-1),de=L[14]/(L[10]+1),I=(L[9]+1)/L[5],H=(L[9]-1)/L[5],B=(L[8]-1)/L[0],K=(V[8]+1)/V[0],ee=re*B,oe=re*K,me=O/(-B+K),ge=me*-B;if(Y.matrixWorld.decompose(ce.position,ce.quaternion,ce.scale),ce.translateX(ge),ce.translateZ(me),ce.matrixWorld.compose(ce.position,ce.quaternion,ce.scale),ce.matrixWorldInverse.copy(ce.matrixWorld).invert(),L[10]===-1)ce.projectionMatrix.copy(Y.projectionMatrix),ce.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{let Z=re+me,b=de+me,Ie=ee-ge,De=oe+(O-ge),P=I*de/b*Z,v=H*de/b*Z;ce.projectionMatrix.makePerspective(Ie,De,P,v,Z,b),ce.projectionMatrixInverse.copy(ce.projectionMatrix).invert()}}function _e(ce,Y){Y===null?ce.matrixWorld.copy(ce.matrix):ce.matrixWorld.multiplyMatrices(Y.matrixWorld,ce.matrix),ce.matrixWorldInverse.copy(ce.matrixWorld).invert()}this.updateCamera=function(ce){if(s===null)return;let Y=ce.near,z=ce.far;g.texture!==null&&(g.depthNear>0&&(Y=g.depthNear),g.depthFar>0&&(z=g.depthFar)),D.near=N.near=T.near=Y,D.far=N.far=T.far=z,(F!==D.near||W!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),F=D.near,W=D.far),D.layers.mask=ce.layers.mask|6,T.layers.mask=D.layers.mask&-5,N.layers.mask=D.layers.mask&-3;let O=ce.parent,L=D.cameras;_e(D,O);for(let V=0;V<L.length;V++)_e(L[V],O);L.length===2?he(D,T,N):D.projectionMatrix.copy(T.projectionMatrix),ye(ce,D,O)};function ye(ce,Y,z){z===null?ce.matrix.copy(Y.matrixWorld):(ce.matrix.copy(z.matrixWorld),ce.matrix.invert(),ce.matrix.multiply(Y.matrixWorld)),ce.matrix.decompose(ce.position,ce.quaternion,ce.scale),ce.updateMatrixWorld(!0),ce.projectionMatrix.copy(Y.projectionMatrix),ce.projectionMatrixInverse.copy(Y.projectionMatrixInverse),ce.isPerspectiveCamera&&(ce.fov=js*2*Math.atan(1/ce.projectionMatrix.elements[5]),ce.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(ce){c=ce,f!==null&&(f.fixedFoveation=ce),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=ce)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(D)},this.getCameraTexture=function(ce){return p[ce]};let Be=null;function Je(ce,Y){if(h=Y.getViewerPose(l||o),m=Y,h!==null){let z=h.views;d!==null&&(e.setRenderTargetFramebuffer(_,d.framebuffer),e.setRenderTarget(_));let O=!1;z.length!==D.cameras.length&&(D.cameras.length=0,O=!0);for(let de=0;de<z.length;de++){let I=z[de],H=null;if(d!==null)H=d.getViewport(I);else{let K=u.getViewSubImage(f,I);H=K.viewport,de===0&&(e.setRenderTargetTextures(_,K.colorTexture,K.depthStencilTexture),e.setRenderTarget(_))}let B=C[de];B===void 0&&(B=new qt,B.layers.enable(de),B.viewport=new at,C[de]=B),B.matrix.fromArray(I.transform.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale),B.projectionMatrix.fromArray(I.projectionMatrix),B.projectionMatrixInverse.copy(B.projectionMatrix).invert(),B.viewport.set(H.x,H.y,H.width,H.height),de===0&&(D.matrix.copy(B.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),O===!0&&D.cameras.push(B)}let L=s.enabledFeatures;if(L&&L.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){u=n.getBinding();let de=u.getDepthInformation(z[0]);de&&de.isValid&&de.texture&&g.init(de,s.renderState)}if(L&&L.includes("camera-access")&&y){e.state.unbindTexture(),u=n.getBinding();for(let de=0;de<z.length;de++){let I=z[de].camera;if(I){let H=p[I];H||(H=new lo,p[I]=H);let B=u.getCameraImage(I);H.sourceTexture=B}}}}for(let z=0;z<S.length;z++){let O=w[z],L=S[z];O!==null&&L!==void 0&&L.update(O,Y,l||o)}Be&&Be(ce,Y),Y.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Y}),m=null}let Ze=new kp;Ze.setAnimationLoop(Je),this.setAnimationLoop=function(ce){Be=ce},this.dispose=function(){}}},h1=new tt,qp=new We;qp.set(-1,0,0,0,1,0,0,0,1);function u1(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,iu(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,E,M,_){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),f(g,p),p.isMeshPhysicalMaterial&&d(g,p,_)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),y(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,E,M):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Kt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Kt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let E=e.get(p),M=E.envMap,_=E.envMapRotation;M&&(g.envMap.value=M,g.envMapRotation.value.setFromMatrix4(h1.makeRotationFromEuler(_)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(qp),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,E,M){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*E,g.scale.value=M*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,E){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Kt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=E.texture,g.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function y(g,p){let E=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(E.matrixWorld),g.nearDistance.value=E.shadow.camera.near,g.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function f1(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,S){let w=S.program;n.uniformBlockBinding(_,w)}function l(_,S){let w=s[_.id];w===void 0&&(g(_),w=h(_),s[_.id]=w,_.addEventListener("dispose",E));let R=S.program;n.updateUBOMapping(_,R);let x=e.render.frame;r[_.id]!==x&&(f(_),r[_.id]=x)}function h(_){let S=u();_.__bindingPointIndex=S;let w=i.createBuffer(),R=_.__size,x=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,R,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,w),w}function u(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){let S=s[_.id],w=_.uniforms,R=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let x=0,T=w.length;x<T;x++){let N=w[x];if(Array.isArray(N))for(let C=0,D=N.length;C<D;C++)d(N[C],x,C,R);else d(N,x,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(_,S,w,R){if(y(_,S,w,R)===!0){let x=_.__offset,T=_.value;if(Array.isArray(T)){let N=0;for(let C=0;C<T.length;C++){let D=T[C],F=p(D);m(D,_.__data,N),typeof D!="number"&&typeof D!="boolean"&&!D.isMatrix3&&!ArrayBuffer.isView(D)&&(N+=F.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(T,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,_.__data)}}function m(_,S,w){typeof _=="number"||typeof _=="boolean"?S[0]=_:_.isMatrix3?(S[0]=_.elements[0],S[1]=_.elements[1],S[2]=_.elements[2],S[3]=0,S[4]=_.elements[3],S[5]=_.elements[4],S[6]=_.elements[5],S[7]=0,S[8]=_.elements[6],S[9]=_.elements[7],S[10]=_.elements[8],S[11]=0):ArrayBuffer.isView(_)?S.set(new _.constructor(_.buffer,_.byteOffset,S.length)):_.toArray(S,w)}function y(_,S,w,R){let x=_.value,T=S+"_"+w;if(R[T]===void 0)return typeof x=="number"||typeof x=="boolean"?R[T]=x:ArrayBuffer.isView(x)?R[T]=x.slice():R[T]=x.clone(),!0;{let N=R[T];if(typeof x=="number"||typeof x=="boolean"){if(N!==x)return R[T]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(N.equals(x)===!1)return N.copy(x),!0}}return!1}function g(_){let S=_.uniforms,w=0,R=16;for(let T=0,N=S.length;T<N;T++){let C=Array.isArray(S[T])?S[T]:[S[T]];for(let D=0,F=C.length;D<F;D++){let W=C[D],k=Array.isArray(W.value)?W.value:[W.value];for(let j=0,X=k.length;j<X;j++){let G=k[j],le=p(G),he=w%R,_e=he%le.boundary,ye=he+_e;w+=_e,ye!==0&&R-ye<le.storage&&(w+=R-ye),W.__data=new Float32Array(le.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=w,w+=le.storage}}}let x=w%R;return x>0&&(w+=R-x),_.__size=w,_.__cache={},this}function p(_){let S={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(S.boundary=4,S.storage=4):_.isVector2?(S.boundary=8,S.storage=8):_.isVector3||_.isColor?(S.boundary=16,S.storage=12):_.isVector4?(S.boundary=16,S.storage=16):_.isMatrix3?(S.boundary=48,S.storage=48):_.isMatrix4?(S.boundary=64,S.storage=64):_.isTexture?Ge("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(S.boundary=16,S.storage=_.byteLength):Ge("WebGLRenderer: Unsupported uniform value type.",_),S}function E(_){let S=_.target;S.removeEventListener("dispose",E);let w=o.indexOf(S.__bindingPointIndex);o.splice(w,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function M(){for(let _ in s)i.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:c,update:l,dispose:M}}var d1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ii=null;function p1(){return ii===null&&(ii=new ao(d1,16,16,Yi,ni),ii.name="DFG_LUT",ii.minFilter=Ct,ii.magFilter=Ct,ii.wrapS=nn,ii.wrapT=nn,ii.generateMipmaps=!1,ii.needsUpdate=!0),ii}var yr=class{constructor(e={}){let{canvas:t=ap(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:d=rn}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;let y=d,g=new Set([vc,yc,_c]),p=new Set([rn,Ln,pr,mr,mc,gc]),E=new Uint32Array(4),M=new Int32Array(4),_=new U,S=null,w=null,R=[],x=[],T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Pn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let N=this,C=!1,D=null,F=null,W=null,k=null;this._outputColorSpace=yt;let j=0,X=0,G=null,le=-1,he=null,_e=new at,ye=new at,Be=null,Je=new Ve(0),Ze=0,ce=t.width,Y=t.height,z=1,O=null,L=null,V=new at(0,0,ce,Y),re=new at(0,0,ce,Y),de=!1,I=new rr,H=!1,B=!1,K=new tt,ee=new U,oe=new at,me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ge=!1;function Z(){return G===null?z:1}let b=n;function Ie(A,$){return t.getContext(A,$)}try{let A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"185"}`),t.addEventListener("webglcontextlost",bt,!1),t.addEventListener("webglcontextrestored",xt,!1),t.addEventListener("webglcontextcreationerror",Hn,!1),b===null){let $="webgl2";if(b=Ie($,A),b===null)throw Ie($)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(A){throw qe("WebGLRenderer: "+A.message),A}let De,P,v,J,Q,se,ve,Me,ae,fe,Se,Oe,Te,Ee,Xe,Ye,Ke,q,we,pe,Ae,Pe,xe;function ze(){De=new My(b),De.init(),Ae=new a1(b,De),P=new dy(b,De,e,Ae),v=new r1(b,De),P.reversedDepthBuffer&&f&&v.buffers.depth.setReversed(!0),F=b.createFramebuffer(),W=b.createFramebuffer(),k=b.createFramebuffer(),J=new Ey(b),Q=new Xv,se=new o1(b,De,v,Q,P,Ae,J),ve=new vy(N),Me=new R0(b),Pe=new uy(b,Me),ae=new Sy(b,Me,J,Pe),fe=new Ty(b,ae,Me,Pe,J),q=new wy(b,P,se),Xe=new py(Q),Se=new Wv(N,ve,De,P,Pe,Xe),Oe=new u1(N,Q),Te=new Zv,Ee=new Qv(De),Ke=new hy(N,ve,v,fe,m,c),Ye=new s1(N,fe,P),xe=new f1(b,J,P,v),we=new fy(b,De,J),pe=new by(b,De,J),J.programs=Se.programs,N.capabilities=P,N.extensions=De,N.properties=Q,N.renderLists=Te,N.shadowMap=Ye,N.state=v,N.info=J}ze(),y!==rn&&(T=new Ry(y,t.width,t.height,a,s,r));let Ue=new Tu(N,b);this.xr=Ue,this.getContext=function(){return b},this.getContextAttributes=function(){return b.getContextAttributes()},this.forceContextLoss=function(){let A=De.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=De.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(A){A!==void 0&&(z=A,this.setSize(ce,Y,!1))},this.getSize=function(A){return A.set(ce,Y)},this.setSize=function(A,$,ie=!0){if(Ue.isPresenting){Ge("WebGLRenderer: Can't change size while VR device is presenting.");return}ce=A,Y=$,t.width=Math.floor(A*z),t.height=Math.floor($*z),ie===!0&&(t.style.width=A+"px",t.style.height=$+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,A,$)},this.getDrawingBufferSize=function(A){return A.set(ce*z,Y*z).floor()},this.setDrawingBufferSize=function(A,$,ie){ce=A,Y=$,z=ie,t.width=Math.floor(A*ie),t.height=Math.floor($*ie),this.setViewport(0,0,A,$)},this.setEffects=function(A){if(y===rn){qe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let $=0;$<A.length;$++)if(A[$].isOutputPass===!0){Ge("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(_e)},this.getViewport=function(A){return A.copy(V)},this.setViewport=function(A,$,ie,te){A.isVector4?V.set(A.x,A.y,A.z,A.w):V.set(A,$,ie,te),v.viewport(_e.copy(V).multiplyScalar(z).round())},this.getScissor=function(A){return A.copy(re)},this.setScissor=function(A,$,ie,te){A.isVector4?re.set(A.x,A.y,A.z,A.w):re.set(A,$,ie,te),v.scissor(ye.copy(re).multiplyScalar(z).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(A){v.setScissorTest(de=A)},this.setOpaqueSort=function(A){O=A},this.setTransparentSort=function(A){L=A},this.getClearColor=function(A){return A.copy(Ke.getClearColor())},this.setClearColor=function(){Ke.setClearColor(...arguments)},this.getClearAlpha=function(){return Ke.getClearAlpha()},this.setClearAlpha=function(){Ke.setClearAlpha(...arguments)},this.clear=function(A=!0,$=!0,ie=!0){let te=0;if(A){let ne=!1;if(G!==null){let Ce=G.texture.format;ne=g.has(Ce)}if(ne){let Ce=G.texture.type,Ne=p.has(Ce),Re=Ke.getClearColor(),Fe=Ke.getClearAlpha(),ke=Re.r,je=Re.g,et=Re.b;Ne?(E[0]=ke,E[1]=je,E[2]=et,E[3]=Fe,b.clearBufferuiv(b.COLOR,0,E)):(M[0]=ke,M[1]=je,M[2]=et,M[3]=Fe,b.clearBufferiv(b.COLOR,0,M))}else te|=b.COLOR_BUFFER_BIT}$&&(te|=b.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ie&&(te|=b.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),te!==0&&b.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),D=A},this.dispose=function(){t.removeEventListener("webglcontextlost",bt,!1),t.removeEventListener("webglcontextrestored",xt,!1),t.removeEventListener("webglcontextcreationerror",Hn,!1),Ke.dispose(),Te.dispose(),Ee.dispose(),Q.dispose(),ve.dispose(),fe.dispose(),Pe.dispose(),xe.dispose(),Se.dispose(),Ue.dispose(),Ue.removeEventListener("sessionstart",Uf),Ue.removeEventListener("sessionend",Of),is.stop()};function bt(A){A.preventDefault(),eo("WebGLRenderer: Context Lost."),C=!0}function xt(){eo("WebGLRenderer: Context Restored."),C=!1;let A=J.autoReset,$=Ye.enabled,ie=Ye.autoUpdate,te=Ye.needsUpdate,ne=Ye.type;ze(),J.autoReset=A,Ye.enabled=$,Ye.autoUpdate=ie,Ye.needsUpdate=te,Ye.type=ne}function Hn(A){qe("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Gn(A){let $=A.target;$.removeEventListener("dispose",Gn),jm($)}function jm(A){Qm(A),Q.remove(A)}function Qm(A){let $=Q.get(A).programs;$!==void 0&&($.forEach(function(ie){Se.releaseProgram(ie)}),A.isShaderMaterial&&Se.releaseShaderCache(A))}this.renderBufferDirect=function(A,$,ie,te,ne,Ce){$===null&&($=me);let Ne=ne.isMesh&&ne.matrixWorld.determinantAffine()<0,Re=ng(A,$,ie,te,ne);v.setMaterial(te,Ne);let Fe=ie.index,ke=1;if(te.wireframe===!0){if(Fe=ae.getWireframeAttribute(ie),Fe===void 0)return;ke=2}let je=ie.drawRange,et=ie.attributes.position,He=je.start*ke,ft=(je.start+je.count)*ke;Ce!==null&&(He=Math.max(He,Ce.start*ke),ft=Math.min(ft,(Ce.start+Ce.count)*ke)),Fe!==null?(He=Math.max(He,0),ft=Math.min(ft,Fe.count)):et!=null&&(He=Math.max(He,0),ft=Math.min(ft,et.count));let At=ft-He;if(At<0||At===1/0)return;Pe.setup(ne,te,Re,ie,Fe);let Et,dt=we;if(Fe!==null&&(Et=Me.get(Fe),dt=pe,dt.setIndex(Et)),ne.isMesh)te.wireframe===!0?(v.setLineWidth(te.wireframeLinewidth*Z()),dt.setMode(b.LINES)):dt.setMode(b.TRIANGLES);else if(ne.isLine){let Ht=te.linewidth;Ht===void 0&&(Ht=1),v.setLineWidth(Ht*Z()),ne.isLineSegments?dt.setMode(b.LINES):ne.isLineLoop?dt.setMode(b.LINE_LOOP):dt.setMode(b.LINE_STRIP)}else ne.isPoints?dt.setMode(b.POINTS):ne.isSprite&&dt.setMode(b.TRIANGLES);if(ne.isBatchedMesh)if(De.get("WEBGL_multi_draw"))dt.renderMultiDraw(ne._multiDrawStarts,ne._multiDrawCounts,ne._multiDrawCount);else{let Ht=ne._multiDrawStarts,Le=ne._multiDrawCounts,cn=ne._multiDrawCount,ot=Fe?Me.get(Fe).bytesPerElement:1,yn=Q.get(te).currentProgram.getUniforms();for(let Wn=0;Wn<cn;Wn++)yn.setValue(b,"_gl_DrawID",Wn),dt.render(Ht[Wn]/ot,Le[Wn])}else if(ne.isInstancedMesh)dt.renderInstances(He,At,ne.count);else if(ie.isInstancedBufferGeometry){let Ht=ie._maxInstanceCount!==void 0?ie._maxInstanceCount:1/0,Le=Math.min(ie.instanceCount,Ht);dt.renderInstances(He,At,Le)}else dt.render(He,At)};function Df(A,$,ie){A.transparent===!0&&A.side===jt&&A.forceSinglePass===!1?(A.side=Kt,A.needsUpdate=!0,jo(A,$,ie),A.side=_i,A.needsUpdate=!0,jo(A,$,ie),A.side=jt):jo(A,$,ie)}this.compile=function(A,$,ie=null){ie===null&&(ie=A),w=Ee.get(ie),w.init($),x.push(w),ie.traverseVisible(function(ne){ne.isLight&&ne.layers.test($.layers)&&(w.pushLight(ne),ne.castShadow&&w.pushShadow(ne))}),A!==ie&&A.traverseVisible(function(ne){ne.isLight&&ne.layers.test($.layers)&&(w.pushLight(ne),ne.castShadow&&w.pushShadow(ne))}),w.setupLights();let te=new Set;return A.traverse(function(ne){if(!(ne.isMesh||ne.isPoints||ne.isLine||ne.isSprite))return;let Ce=ne.material;if(Ce)if(Array.isArray(Ce))for(let Ne=0;Ne<Ce.length;Ne++){let Re=Ce[Ne];Df(Re,ie,ne),te.add(Re)}else Df(Ce,ie,ne),te.add(Ce)}),w=x.pop(),te},this.compileAsync=function(A,$,ie=null){let te=this.compile(A,$,ie);return new Promise(ne=>{function Ce(){if(te.forEach(function(Ne){Q.get(Ne).currentProgram.isReady()&&te.delete(Ne)}),te.size===0){ne(A);return}setTimeout(Ce,10)}De.get("KHR_parallel_shader_compile")!==null?Ce():setTimeout(Ce,10)})};let Wl=null;function eg(A){Wl&&Wl(A)}function Uf(){is.stop()}function Of(){is.start()}let is=new kp;is.setAnimationLoop(eg),typeof self<"u"&&is.setContext(self),this.setAnimationLoop=function(A){Wl=A,Ue.setAnimationLoop(A),A===null?is.stop():is.start()},Ue.addEventListener("sessionstart",Uf),Ue.addEventListener("sessionend",Of),this.render=function(A,$){if($!==void 0&&$.isCamera!==!0){qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;D!==null&&D.renderStart(A,$);let ie=Ue.enabled===!0&&Ue.isPresenting===!0,te=T!==null&&(G===null||ie)&&T.begin(N,G);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),$.parent===null&&$.matrixWorldAutoUpdate===!0&&$.updateMatrixWorld(),Ue.enabled===!0&&Ue.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Ue.cameraAutoUpdate===!0&&Ue.updateCamera($),$=Ue.getCamera()),A.isScene===!0&&A.onBeforeRender(N,A,$,G),w=Ee.get(A,x.length),w.init($),w.state.textureUnits=se.getTextureUnits(),x.push(w),K.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),I.setFromProjectionMatrix(K,An,$.reversedDepth),B=this.localClippingEnabled,H=Xe.init(this.clippingPlanes,B),S=Te.get(A,R.length),S.init(),R.push(S),Ue.enabled===!0&&Ue.isPresenting===!0){let Ne=N.xr.getDepthSensingMesh();Ne!==null&&Xl(Ne,$,-1/0,N.sortObjects)}Xl(A,$,0,N.sortObjects),S.finish(),N.sortObjects===!0&&S.sort(O,L,$.reversedDepth),ge=Ue.enabled===!1||Ue.isPresenting===!1||Ue.hasDepthSensing()===!1,ge&&Ke.addToRenderList(S,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),H===!0&&Xe.beginShadows();let ne=w.state.shadowsArray;if(Ye.render(ne,A,$),H===!0&&Xe.endShadows(),(te&&T.hasRenderPass())===!1){let Ne=S.opaque,Re=S.transmissive;if(w.setupLights(),$.isArrayCamera){let Fe=$.cameras;if(Re.length>0)for(let ke=0,je=Fe.length;ke<je;ke++){let et=Fe[ke];Bf(Ne,Re,A,et)}ge&&Ke.render(A);for(let ke=0,je=Fe.length;ke<je;ke++){let et=Fe[ke];Ff(S,A,et,et.viewport)}}else Re.length>0&&Bf(Ne,Re,A,$),ge&&Ke.render(A),Ff(S,A,$)}G!==null&&X===0&&(se.updateMultisampleRenderTarget(G),se.updateRenderTargetMipmap(G)),te&&T.end(N),A.isScene===!0&&A.onAfterRender(N,A,$),Pe.resetDefaultState(),le=-1,he=null,x.pop(),x.length>0?(w=x[x.length-1],se.setTextureUnits(w.state.textureUnits),H===!0&&Xe.setGlobalState(N.clippingPlanes,w.state.camera)):w=null,R.pop(),R.length>0?S=R[R.length-1]:S=null,D!==null&&D.renderEnd()};function Xl(A,$,ie,te){if(A.visible===!1)return;if(A.layers.test($.layers)){if(A.isGroup)ie=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update($);else if(A.isLightProbeGrid)w.pushLightProbeGrid(A);else if(A.isLight)w.pushLight(A),A.castShadow&&w.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||I.intersectsSprite(A)){te&&oe.setFromMatrixPosition(A.matrixWorld).applyMatrix4(K);let Ne=fe.update(A),Re=A.material;Re.visible&&S.push(A,Ne,Re,ie,oe.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||I.intersectsObject(A))){let Ne=fe.update(A),Re=A.material;if(te&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),oe.copy(A.boundingSphere.center)):(Ne.boundingSphere===null&&Ne.computeBoundingSphere(),oe.copy(Ne.boundingSphere.center)),oe.applyMatrix4(A.matrixWorld).applyMatrix4(K)),Array.isArray(Re)){let Fe=Ne.groups;for(let ke=0,je=Fe.length;ke<je;ke++){let et=Fe[ke],He=Re[et.materialIndex];He&&He.visible&&S.push(A,Ne,He,ie,oe.z,et)}}else Re.visible&&S.push(A,Ne,Re,ie,oe.z,null)}}let Ce=A.children;for(let Ne=0,Re=Ce.length;Ne<Re;Ne++)Xl(Ce[Ne],$,ie,te)}function Ff(A,$,ie,te){let{opaque:ne,transmissive:Ce,transparent:Ne}=A;w.setupLightsView(ie),H===!0&&Xe.setGlobalState(N.clippingPlanes,ie),te&&v.viewport(_e.copy(te)),ne.length>0&&Ko(ne,$,ie),Ce.length>0&&Ko(Ce,$,ie),Ne.length>0&&Ko(Ne,$,ie),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function Bf(A,$,ie,te){if((ie.isScene===!0?ie.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[te.id]===void 0){let He=De.has("EXT_color_buffer_half_float")||De.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[te.id]=new un(1,1,{generateMipmaps:!0,type:He?ni:rn,minFilter:ti,samples:Math.max(4,P.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:it.workingColorSpace})}let Ce=w.state.transmissionRenderTarget[te.id],Ne=te.viewport||_e;Ce.setSize(Ne.z*N.transmissionResolutionScale,Ne.w*N.transmissionResolutionScale);let Re=N.getRenderTarget(),Fe=N.getActiveCubeFace(),ke=N.getActiveMipmapLevel();N.setRenderTarget(Ce),N.getClearColor(Je),Ze=N.getClearAlpha(),Ze<1&&N.setClearColor(16777215,.5),N.clear(),ge&&Ke.render(ie);let je=N.toneMapping;N.toneMapping=Pn;let et=te.viewport;if(te.viewport!==void 0&&(te.viewport=void 0),w.setupLightsView(te),H===!0&&Xe.setGlobalState(N.clippingPlanes,te),Ko(A,ie,te),se.updateMultisampleRenderTarget(Ce),se.updateRenderTargetMipmap(Ce),De.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let ft=0,At=$.length;ft<At;ft++){let Et=$[ft],{object:dt,geometry:Ht,material:Le,group:cn}=Et;if(Le.side===jt&&dt.layers.test(te.layers)){let ot=Le.side;Le.side=Kt,Le.needsUpdate=!0,zf(dt,ie,te,Ht,Le,cn),Le.side=ot,Le.needsUpdate=!0,He=!0}}He===!0&&(se.updateMultisampleRenderTarget(Ce),se.updateRenderTargetMipmap(Ce))}N.setRenderTarget(Re,Fe,ke),N.setClearColor(Je,Ze),et!==void 0&&(te.viewport=et),N.toneMapping=je}function Ko(A,$,ie){let te=$.isScene===!0?$.overrideMaterial:null;for(let ne=0,Ce=A.length;ne<Ce;ne++){let Ne=A[ne],{object:Re,geometry:Fe,group:ke}=Ne,je=Ne.material;je.allowOverride===!0&&te!==null&&(je=te),Re.layers.test(ie.layers)&&zf(Re,$,ie,Fe,je,ke)}}function zf(A,$,ie,te,ne,Ce){A.onBeforeRender(N,$,ie,te,ne,Ce),A.modelViewMatrix.multiplyMatrices(ie.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),ne.onBeforeRender(N,$,ie,te,A,Ce),ne.transparent===!0&&ne.side===jt&&ne.forceSinglePass===!1?(ne.side=Kt,ne.needsUpdate=!0,N.renderBufferDirect(ie,$,te,ne,A,Ce),ne.side=_i,ne.needsUpdate=!0,N.renderBufferDirect(ie,$,te,ne,A,Ce),ne.side=jt):N.renderBufferDirect(ie,$,te,ne,A,Ce),A.onAfterRender(N,$,ie,te,ne,Ce)}function jo(A,$,ie){$.isScene!==!0&&($=me);let te=Q.get(A),ne=w.state.lights,Ce=w.state.shadowsArray,Ne=ne.state.version,Re=Se.getParameters(A,ne.state,Ce,$,ie,w.state.lightProbeGridArray),Fe=Se.getProgramCacheKey(Re),ke=te.programs;te.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?$.environment:null,te.fog=$.fog;let je=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;te.envMap=ve.get(A.envMap||te.environment,je),te.envMapRotation=te.environment!==null&&A.envMap===null?$.environmentRotation:A.envMapRotation,ke===void 0&&(A.addEventListener("dispose",Gn),ke=new Map,te.programs=ke);let et=ke.get(Fe);if(et!==void 0){if(te.currentProgram===et&&te.lightsStateVersion===Ne)return Vf(A,Re),et}else Re.uniforms=Se.getUniforms(A),D!==null&&A.isNodeMaterial&&D.build(A,ie,Re),A.onBeforeCompile(Re,N),et=Se.acquireProgram(Re,Fe),ke.set(Fe,et),te.uniforms=Re.uniforms;let He=te.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(He.clippingPlanes=Xe.uniform),Vf(A,Re),te.needsLights=sg(A),te.lightsStateVersion=Ne,te.needsLights&&(He.ambientLightColor.value=ne.state.ambient,He.lightProbe.value=ne.state.probe,He.directionalLights.value=ne.state.directional,He.directionalLightShadows.value=ne.state.directionalShadow,He.spotLights.value=ne.state.spot,He.spotLightShadows.value=ne.state.spotShadow,He.rectAreaLights.value=ne.state.rectArea,He.ltc_1.value=ne.state.rectAreaLTC1,He.ltc_2.value=ne.state.rectAreaLTC2,He.pointLights.value=ne.state.point,He.pointLightShadows.value=ne.state.pointShadow,He.hemisphereLights.value=ne.state.hemi,He.directionalShadowMatrix.value=ne.state.directionalShadowMatrix,He.spotLightMatrix.value=ne.state.spotLightMatrix,He.spotLightMap.value=ne.state.spotLightMap,He.pointShadowMatrix.value=ne.state.pointShadowMatrix),te.lightProbeGrid=w.state.lightProbeGridArray.length>0,te.currentProgram=et,te.uniformsList=null,et}function kf(A){if(A.uniformsList===null){let $=A.currentProgram.getUniforms();A.uniformsList=_r.seqWithValue($.seq,A.uniforms)}return A.uniformsList}function Vf(A,$){let ie=Q.get(A);ie.outputColorSpace=$.outputColorSpace,ie.batching=$.batching,ie.batchingColor=$.batchingColor,ie.instancing=$.instancing,ie.instancingColor=$.instancingColor,ie.instancingMorph=$.instancingMorph,ie.skinning=$.skinning,ie.morphTargets=$.morphTargets,ie.morphNormals=$.morphNormals,ie.morphColors=$.morphColors,ie.morphTargetsCount=$.morphTargetsCount,ie.numClippingPlanes=$.numClippingPlanes,ie.numIntersection=$.numClipIntersection,ie.vertexAlphas=$.vertexAlphas,ie.vertexTangents=$.vertexTangents,ie.toneMapping=$.toneMapping}function tg(A,$){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;_.setFromMatrixPosition($.matrixWorld);for(let ie=0,te=A.length;ie<te;ie++){let ne=A[ie];if(ne.texture!==null&&ne.boundingBox.containsPoint(_))return ne}return null}function ng(A,$,ie,te,ne){$.isScene!==!0&&($=me),se.resetTextureUnits();let Ce=$.fog,Ne=te.isMeshStandardMaterial||te.isMeshLambertMaterial||te.isMeshPhongMaterial?$.environment:null,Re=G===null?N.outputColorSpace:G.isXRRenderTarget===!0?G.texture.colorSpace:it.workingColorSpace,Fe=te.isMeshStandardMaterial||te.isMeshLambertMaterial&&!te.envMap||te.isMeshPhongMaterial&&!te.envMap,ke=ve.get(te.envMap||Ne,Fe),je=te.vertexColors===!0&&!!ie.attributes.color&&ie.attributes.color.itemSize===4,et=!!ie.attributes.tangent&&(!!te.normalMap||te.anisotropy>0),He=!!ie.morphAttributes.position,ft=!!ie.morphAttributes.normal,At=!!ie.morphAttributes.color,Et=Pn;te.toneMapped&&(G===null||G.isXRRenderTarget===!0)&&(Et=N.toneMapping);let dt=ie.morphAttributes.position||ie.morphAttributes.normal||ie.morphAttributes.color,Ht=dt!==void 0?dt.length:0,Le=Q.get(te),cn=w.state.lights;if(H===!0&&(B===!0||A!==he)){let _t=A===he&&te.id===le;Xe.setState(te,A,_t)}let ot=!1;te.version===Le.__version?(Le.needsLights&&Le.lightsStateVersion!==cn.state.version||Le.outputColorSpace!==Re||ne.isBatchedMesh&&Le.batching===!1||!ne.isBatchedMesh&&Le.batching===!0||ne.isBatchedMesh&&Le.batchingColor===!0&&ne.colorTexture===null||ne.isBatchedMesh&&Le.batchingColor===!1&&ne.colorTexture!==null||ne.isInstancedMesh&&Le.instancing===!1||!ne.isInstancedMesh&&Le.instancing===!0||ne.isSkinnedMesh&&Le.skinning===!1||!ne.isSkinnedMesh&&Le.skinning===!0||ne.isInstancedMesh&&Le.instancingColor===!0&&ne.instanceColor===null||ne.isInstancedMesh&&Le.instancingColor===!1&&ne.instanceColor!==null||ne.isInstancedMesh&&Le.instancingMorph===!0&&ne.morphTexture===null||ne.isInstancedMesh&&Le.instancingMorph===!1&&ne.morphTexture!==null||Le.envMap!==ke||te.fog===!0&&Le.fog!==Ce||Le.numClippingPlanes!==void 0&&(Le.numClippingPlanes!==Xe.numPlanes||Le.numIntersection!==Xe.numIntersection)||Le.vertexAlphas!==je||Le.vertexTangents!==et||Le.morphTargets!==He||Le.morphNormals!==ft||Le.morphColors!==At||Le.toneMapping!==Et||Le.morphTargetsCount!==Ht||!!Le.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(ot=!0):(ot=!0,Le.__version=te.version);let yn=Le.currentProgram;ot===!0&&(yn=jo(te,$,ne),D&&te.isNodeMaterial&&D.onUpdateProgram(te,yn,Le));let Wn=!1,Ri=!1,As=!1,pt=yn.getUniforms(),Rt=Le.uniforms;if(v.useProgram(yn.program)&&(Wn=!0,Ri=!0,As=!0),te.id!==le&&(le=te.id,Ri=!0),Le.needsLights){let _t=tg(w.state.lightProbeGridArray,ne);Le.lightProbeGrid!==_t&&(Le.lightProbeGrid=_t,Ri=!0)}if(Wn||he!==A){v.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),pt.setValue(b,"projectionMatrix",A.projectionMatrix),pt.setValue(b,"viewMatrix",A.matrixWorldInverse);let Ii=pt.map.cameraPosition;Ii!==void 0&&Ii.setValue(b,ee.setFromMatrixPosition(A.matrixWorld)),P.logarithmicDepthBuffer&&pt.setValue(b,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(te.isMeshPhongMaterial||te.isMeshToonMaterial||te.isMeshLambertMaterial||te.isMeshBasicMaterial||te.isMeshStandardMaterial||te.isShaderMaterial)&&pt.setValue(b,"isOrthographic",A.isOrthographicCamera===!0),he!==A&&(he=A,Ri=!0,As=!0)}if(Le.needsLights&&(cn.state.directionalShadowMap.length>0&&pt.setValue(b,"directionalShadowMap",cn.state.directionalShadowMap,se),cn.state.spotShadowMap.length>0&&pt.setValue(b,"spotShadowMap",cn.state.spotShadowMap,se),cn.state.pointShadowMap.length>0&&pt.setValue(b,"pointShadowMap",cn.state.pointShadowMap,se)),ne.isSkinnedMesh){pt.setOptional(b,ne,"bindMatrix"),pt.setOptional(b,ne,"bindMatrixInverse");let _t=ne.skeleton;_t&&(_t.boneTexture===null&&_t.computeBoneTexture(),pt.setValue(b,"boneTexture",_t.boneTexture,se))}ne.isBatchedMesh&&(pt.setOptional(b,ne,"batchingTexture"),pt.setValue(b,"batchingTexture",ne._matricesTexture,se),pt.setOptional(b,ne,"batchingIdTexture"),pt.setValue(b,"batchingIdTexture",ne._indirectTexture,se),pt.setOptional(b,ne,"batchingColorTexture"),ne._colorsTexture!==null&&pt.setValue(b,"batchingColorTexture",ne._colorsTexture,se));let Ci=ie.morphAttributes;if((Ci.position!==void 0||Ci.normal!==void 0||Ci.color!==void 0)&&q.update(ne,ie,yn),(Ri||Le.receiveShadow!==ne.receiveShadow)&&(Le.receiveShadow=ne.receiveShadow,pt.setValue(b,"receiveShadow",ne.receiveShadow)),(te.isMeshStandardMaterial||te.isMeshLambertMaterial||te.isMeshPhongMaterial)&&te.envMap===null&&$.environment!==null&&(Rt.envMapIntensity.value=$.environmentIntensity),Rt.dfgLUT!==void 0&&(Rt.dfgLUT.value=p1()),Ri){if(pt.setValue(b,"toneMappingExposure",N.toneMappingExposure),Le.needsLights&&ig(Rt,As),Ce&&te.fog===!0&&Oe.refreshFogUniforms(Rt,Ce),Oe.refreshMaterialUniforms(Rt,te,z,Y,w.state.transmissionRenderTarget[A.id]),Le.needsLights&&Le.lightProbeGrid){let _t=Le.lightProbeGrid;Rt.probesSH.value=_t.texture,Rt.probesMin.value.copy(_t.boundingBox.min),Rt.probesMax.value.copy(_t.boundingBox.max),Rt.probesResolution.value.copy(_t.resolution)}_r.upload(b,kf(Le),Rt,se)}if(te.isShaderMaterial&&te.uniformsNeedUpdate===!0&&(_r.upload(b,kf(Le),Rt,se),te.uniformsNeedUpdate=!1),te.isSpriteMaterial&&pt.setValue(b,"center",ne.center),pt.setValue(b,"modelViewMatrix",ne.modelViewMatrix),pt.setValue(b,"normalMatrix",ne.normalMatrix),pt.setValue(b,"modelMatrix",ne.matrixWorld),te.uniformsGroups!==void 0){let _t=te.uniformsGroups;for(let Ii=0,Rs=_t.length;Ii<Rs;Ii++){let Hf=_t[Ii];xe.update(Hf,yn),xe.bind(Hf,yn)}}return yn}function ig(A,$){A.ambientLightColor.needsUpdate=$,A.lightProbe.needsUpdate=$,A.directionalLights.needsUpdate=$,A.directionalLightShadows.needsUpdate=$,A.pointLights.needsUpdate=$,A.pointLightShadows.needsUpdate=$,A.spotLights.needsUpdate=$,A.spotLightShadows.needsUpdate=$,A.rectAreaLights.needsUpdate=$,A.hemisphereLights.needsUpdate=$}function sg(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return G},this.setRenderTargetTextures=function(A,$,ie){let te=Q.get(A);te.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,te.__autoAllocateDepthBuffer===!1&&(te.__useRenderToTexture=!1),Q.get(A.texture).__webglTexture=$,Q.get(A.depthTexture).__webglTexture=te.__autoAllocateDepthBuffer?void 0:ie,te.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,$){let ie=Q.get(A);ie.__webglFramebuffer=$,ie.__useDefaultFramebuffer=$===void 0},this.setRenderTarget=function(A,$=0,ie=0){G=A,j=$,X=ie;let te=null,ne=!1,Ce=!1;if(A){let Re=Q.get(A);if(Re.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(b.FRAMEBUFFER,Re.__webglFramebuffer),_e.copy(A.viewport),ye.copy(A.scissor),Be=A.scissorTest,v.viewport(_e),v.scissor(ye),v.setScissorTest(Be),le=-1;return}else if(Re.__webglFramebuffer===void 0)se.setupRenderTarget(A);else if(Re.__hasExternalTextures)se.rebindTextures(A,Q.get(A.texture).__webglTexture,Q.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let je=A.depthTexture;if(Re.__boundDepthTexture!==je){if(je!==null&&Q.has(je)&&(A.width!==je.image.width||A.height!==je.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");se.setupDepthRenderbuffer(A)}}let Fe=A.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(Ce=!0);let ke=Q.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(ke[$])?te=ke[$][ie]:te=ke[$],ne=!0):A.samples>0&&se.useMultisampledRTT(A)===!1?te=Q.get(A).__webglMultisampledFramebuffer:Array.isArray(ke)?te=ke[ie]:te=ke,_e.copy(A.viewport),ye.copy(A.scissor),Be=A.scissorTest}else _e.copy(V).multiplyScalar(z).floor(),ye.copy(re).multiplyScalar(z).floor(),Be=de;if(ie!==0&&(te=F),v.bindFramebuffer(b.FRAMEBUFFER,te)&&v.drawBuffers(A,te),v.viewport(_e),v.scissor(ye),v.setScissorTest(Be),ne){let Re=Q.get(A.texture);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_CUBE_MAP_POSITIVE_X+$,Re.__webglTexture,ie)}else if(Ce){let Re=$;for(let Fe=0;Fe<A.textures.length;Fe++){let ke=Q.get(A.textures[Fe]);b.framebufferTextureLayer(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0+Fe,ke.__webglTexture,ie,Re)}}else if(A!==null&&ie!==0){let Re=Q.get(A.texture);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,Re.__webglTexture,ie)}le=-1},this.readRenderTargetPixels=function(A,$,ie,te,ne,Ce,Ne,Re=0){if(!(A&&A.isWebGLRenderTarget)){qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Fe=Q.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ne!==void 0&&(Fe=Fe[Ne]),Fe){v.bindFramebuffer(b.FRAMEBUFFER,Fe);try{let ke=A.textures[Re],je=ke.format,et=ke.type;if(A.textures.length>1&&b.readBuffer(b.COLOR_ATTACHMENT0+Re),!P.textureFormatReadable(je)){qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!P.textureTypeReadable(et)){qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}$>=0&&$<=A.width-te&&ie>=0&&ie<=A.height-ne&&b.readPixels($,ie,te,ne,Ae.convert(je),Ae.convert(et),Ce)}finally{let ke=G!==null?Q.get(G).__webglFramebuffer:null;v.bindFramebuffer(b.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(A,$,ie,te,ne,Ce,Ne,Re=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Fe=Q.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ne!==void 0&&(Fe=Fe[Ne]),Fe)if($>=0&&$<=A.width-te&&ie>=0&&ie<=A.height-ne){v.bindFramebuffer(b.FRAMEBUFFER,Fe);let ke=A.textures[Re],je=ke.format,et=ke.type;if(A.textures.length>1&&b.readBuffer(b.COLOR_ATTACHMENT0+Re),!P.textureFormatReadable(je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!P.textureTypeReadable(et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let He=b.createBuffer();b.bindBuffer(b.PIXEL_PACK_BUFFER,He),b.bufferData(b.PIXEL_PACK_BUFFER,Ce.byteLength,b.STREAM_READ),b.readPixels($,ie,te,ne,Ae.convert(je),Ae.convert(et),0);let ft=G!==null?Q.get(G).__webglFramebuffer:null;v.bindFramebuffer(b.FRAMEBUFFER,ft);let At=b.fenceSync(b.SYNC_GPU_COMMANDS_COMPLETE,0);return b.flush(),await lp(b,At,4),b.bindBuffer(b.PIXEL_PACK_BUFFER,He),b.getBufferSubData(b.PIXEL_PACK_BUFFER,0,Ce),b.deleteBuffer(He),b.deleteSync(At),Ce}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,$=null,ie=0){let te=Math.pow(2,-ie),ne=Math.floor(A.image.width*te),Ce=Math.floor(A.image.height*te),Ne=$!==null?$.x:0,Re=$!==null?$.y:0;se.setTexture2D(A,0),b.copyTexSubImage2D(b.TEXTURE_2D,ie,0,0,Ne,Re,ne,Ce),v.unbindTexture()},this.copyTextureToTexture=function(A,$,ie=null,te=null,ne=0,Ce=0){let Ne,Re,Fe,ke,je,et,He,ft,At,Et=A.isCompressedTexture?A.mipmaps[Ce]:A.image;if(ie!==null)Ne=ie.max.x-ie.min.x,Re=ie.max.y-ie.min.y,Fe=ie.isBox3?ie.max.z-ie.min.z:1,ke=ie.min.x,je=ie.min.y,et=ie.isBox3?ie.min.z:0;else{let Rt=Math.pow(2,-ne);Ne=Math.floor(Et.width*Rt),Re=Math.floor(Et.height*Rt),A.isDataArrayTexture?Fe=Et.depth:A.isData3DTexture?Fe=Math.floor(Et.depth*Rt):Fe=1,ke=0,je=0,et=0}te!==null?(He=te.x,ft=te.y,At=te.z):(He=0,ft=0,At=0);let dt=Ae.convert($.format),Ht=Ae.convert($.type),Le;$.isData3DTexture?(se.setTexture3D($,0),Le=b.TEXTURE_3D):$.isDataArrayTexture||$.isCompressedArrayTexture?(se.setTexture2DArray($,0),Le=b.TEXTURE_2D_ARRAY):(se.setTexture2D($,0),Le=b.TEXTURE_2D),v.activeTexture(b.TEXTURE0),v.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,$.flipY),v.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),v.pixelStorei(b.UNPACK_ALIGNMENT,$.unpackAlignment);let cn=v.getParameter(b.UNPACK_ROW_LENGTH),ot=v.getParameter(b.UNPACK_IMAGE_HEIGHT),yn=v.getParameter(b.UNPACK_SKIP_PIXELS),Wn=v.getParameter(b.UNPACK_SKIP_ROWS),Ri=v.getParameter(b.UNPACK_SKIP_IMAGES);v.pixelStorei(b.UNPACK_ROW_LENGTH,Et.width),v.pixelStorei(b.UNPACK_IMAGE_HEIGHT,Et.height),v.pixelStorei(b.UNPACK_SKIP_PIXELS,ke),v.pixelStorei(b.UNPACK_SKIP_ROWS,je),v.pixelStorei(b.UNPACK_SKIP_IMAGES,et);let As=A.isDataArrayTexture||A.isData3DTexture,pt=$.isDataArrayTexture||$.isData3DTexture;if(A.isDepthTexture){let Rt=Q.get(A),Ci=Q.get($),_t=Q.get(Rt.__renderTarget),Ii=Q.get(Ci.__renderTarget);v.bindFramebuffer(b.READ_FRAMEBUFFER,_t.__webglFramebuffer),v.bindFramebuffer(b.DRAW_FRAMEBUFFER,Ii.__webglFramebuffer);for(let Rs=0;Rs<Fe;Rs++)As&&(b.framebufferTextureLayer(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,Q.get(A).__webglTexture,ne,et+Rs),b.framebufferTextureLayer(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,Q.get($).__webglTexture,Ce,At+Rs)),b.blitFramebuffer(ke,je,Ne,Re,He,ft,Ne,Re,b.DEPTH_BUFFER_BIT,b.NEAREST);v.bindFramebuffer(b.READ_FRAMEBUFFER,null),v.bindFramebuffer(b.DRAW_FRAMEBUFFER,null)}else if(ne!==0||A.isRenderTargetTexture||Q.has(A)){let Rt=Q.get(A),Ci=Q.get($);v.bindFramebuffer(b.READ_FRAMEBUFFER,W),v.bindFramebuffer(b.DRAW_FRAMEBUFFER,k);for(let _t=0;_t<Fe;_t++)As?b.framebufferTextureLayer(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,Rt.__webglTexture,ne,et+_t):b.framebufferTexture2D(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,Rt.__webglTexture,ne),pt?b.framebufferTextureLayer(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,Ci.__webglTexture,Ce,At+_t):b.framebufferTexture2D(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,Ci.__webglTexture,Ce),ne!==0?b.blitFramebuffer(ke,je,Ne,Re,He,ft,Ne,Re,b.COLOR_BUFFER_BIT,b.NEAREST):pt?b.copyTexSubImage3D(Le,Ce,He,ft,At+_t,ke,je,Ne,Re):b.copyTexSubImage2D(Le,Ce,He,ft,ke,je,Ne,Re);v.bindFramebuffer(b.READ_FRAMEBUFFER,null),v.bindFramebuffer(b.DRAW_FRAMEBUFFER,null)}else pt?A.isDataTexture||A.isData3DTexture?b.texSubImage3D(Le,Ce,He,ft,At,Ne,Re,Fe,dt,Ht,Et.data):$.isCompressedArrayTexture?b.compressedTexSubImage3D(Le,Ce,He,ft,At,Ne,Re,Fe,dt,Et.data):b.texSubImage3D(Le,Ce,He,ft,At,Ne,Re,Fe,dt,Ht,Et):A.isDataTexture?b.texSubImage2D(b.TEXTURE_2D,Ce,He,ft,Ne,Re,dt,Ht,Et.data):A.isCompressedTexture?b.compressedTexSubImage2D(b.TEXTURE_2D,Ce,He,ft,Et.width,Et.height,dt,Et.data):b.texSubImage2D(b.TEXTURE_2D,Ce,He,ft,Ne,Re,dt,Ht,Et);v.pixelStorei(b.UNPACK_ROW_LENGTH,cn),v.pixelStorei(b.UNPACK_IMAGE_HEIGHT,ot),v.pixelStorei(b.UNPACK_SKIP_PIXELS,yn),v.pixelStorei(b.UNPACK_SKIP_ROWS,Wn),v.pixelStorei(b.UNPACK_SKIP_IMAGES,Ri),Ce===0&&$.generateMipmaps&&b.generateMipmap(Le),v.unbindTexture()},this.initRenderTarget=function(A){Q.get(A).__webglFramebuffer===void 0&&se.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?se.setTextureCube(A,0):A.isData3DTexture?se.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?se.setTexture2DArray(A,0):se.setTexture2D(A,0),v.unbindTexture()},this.resetState=function(){j=0,X=0,G=null,v.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return An}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=it._getDrawingBufferColorSpace(e),t.unpackColorSpace=it._getUnpackColorSpace()}};var Go=yt,ol=class i extends ms{constructor(e){super(e),this.defaultDPI=90,this.defaultUnit="px"}load(e,t,n,s){let r=this,o=new Eo(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(e,function(a){try{t(r.parse(a))}catch(c){s?s(c):console.error(c),r.manager.itemError(e)}},n,s)}parse(e){let t=this;function n(z,O){if(z.nodeType!==1)return;z.hasAttribute("filter")&&console.warn("THREE.SVGLoader: Filters are not supported.");let L=S(z),V=!1,re=null;switch(z.nodeName){case"svg":O=y(z,O);break;case"style":r(z);break;case"g":O=y(z,O);break;case"path":O=y(z,O),z.hasAttribute("d")&&(re=s(z));break;case"rect":O=y(z,O),re=c(z);break;case"polygon":O=y(z,O),re=l(z);break;case"polyline":O=y(z,O),re=h(z);break;case"circle":O=y(z,O),re=u(z);break;case"ellipse":O=y(z,O),re=f(z);break;case"line":O=y(z,O),re=d(z);break;case"defs":V=!0;break;case"use":O=y(z,O);let H=(z.getAttributeNS("http://www.w3.org/1999/xlink","href")||"").substring(1),B=z.viewportElement.getElementById(H);B?n(B,O):console.warn("SVGLoader: 'use node' references non-existent node id: "+H);break;default:}if(re){O.fill!==void 0&&O.fill!=="none"&&!O.fill.startsWith("url")&&re.color.setStyle(O.fill,Go),x(re,Ze),k.push(re);let I=Object.assign({},O);I.strokeWidth=O.strokeWidth*F(Ze),re.userData={node:z,style:I,transform:Ze.clone(),gradients:X}}let de=z.childNodes;for(let I=0;I<de.length;I++){let H=de[I];V&&H.nodeName!=="style"&&H.nodeName!=="defs"||n(H,O)}L&&(G.pop(),G.length>0?Ze.copy(G[G.length-1]):Ze.identity())}function s(z){let O=new In,L=new ue,V=new ue,re=new ue,de=!0,I=!1,H=z.getAttribute("d");if(H===""||H==="none")return null;let B=H.match(/[a-df-z][^a-df-z]*/ig);for(let K=0,ee=B.length;K<ee;K++){let oe=B[K],me=oe.charAt(0),ge=oe.slice(1).trim();de===!0&&(I=!0,de=!1);let Z;switch(me){case"M":Z=p(ge);for(let b=0,Ie=Z.length;b<Ie;b+=2)L.x=Z[b+0],L.y=Z[b+1],V.x=L.x,V.y=L.y,b===0?O.moveTo(L.x,L.y):O.lineTo(L.x,L.y),b===0&&re.copy(L);break;case"H":Z=p(ge);for(let b=0,Ie=Z.length;b<Ie;b++)L.x=Z[b],V.x=L.x,V.y=L.y,O.lineTo(L.x,L.y),b===0&&I===!0&&re.copy(L);break;case"V":Z=p(ge);for(let b=0,Ie=Z.length;b<Ie;b++)L.y=Z[b],V.x=L.x,V.y=L.y,O.lineTo(L.x,L.y),b===0&&I===!0&&re.copy(L);break;case"L":Z=p(ge);for(let b=0,Ie=Z.length;b<Ie;b+=2)L.x=Z[b+0],L.y=Z[b+1],V.x=L.x,V.y=L.y,O.lineTo(L.x,L.y),b===0&&I===!0&&re.copy(L);break;case"C":Z=p(ge);for(let b=0,Ie=Z.length;b<Ie;b+=6)O.bezierCurveTo(Z[b+0],Z[b+1],Z[b+2],Z[b+3],Z[b+4],Z[b+5]),V.x=Z[b+2],V.y=Z[b+3],L.x=Z[b+4],L.y=Z[b+5],b===0&&I===!0&&re.copy(L);break;case"S":Z=p(ge);for(let b=0,Ie=Z.length;b<Ie;b+=4)O.bezierCurveTo(g(L.x,V.x),g(L.y,V.y),Z[b+0],Z[b+1],Z[b+2],Z[b+3]),V.x=Z[b+0],V.y=Z[b+1],L.x=Z[b+2],L.y=Z[b+3],b===0&&I===!0&&re.copy(L);break;case"Q":Z=p(ge);for(let b=0,Ie=Z.length;b<Ie;b+=4)O.quadraticCurveTo(Z[b+0],Z[b+1],Z[b+2],Z[b+3]),V.x=Z[b+0],V.y=Z[b+1],L.x=Z[b+2],L.y=Z[b+3],b===0&&I===!0&&re.copy(L);break;case"T":Z=p(ge);for(let b=0,Ie=Z.length;b<Ie;b+=2){let De=g(L.x,V.x),P=g(L.y,V.y);O.quadraticCurveTo(De,P,Z[b+0],Z[b+1]),V.x=De,V.y=P,L.x=Z[b+0],L.y=Z[b+1],b===0&&I===!0&&re.copy(L)}break;case"A":Z=p(ge,[3,4],7);for(let b=0,Ie=Z.length;b<Ie;b+=7){if(Z[b+5]==L.x&&Z[b+6]==L.y)continue;let De=L.clone();L.x=Z[b+5],L.y=Z[b+6],V.x=L.x,V.y=L.y,o(O,Z[b],Z[b+1],Z[b+2],Z[b+3],Z[b+4],De,L),b===0&&I===!0&&re.copy(L)}break;case"m":Z=p(ge);for(let b=0,Ie=Z.length;b<Ie;b+=2)L.x+=Z[b+0],L.y+=Z[b+1],V.x=L.x,V.y=L.y,b===0?O.moveTo(L.x,L.y):O.lineTo(L.x,L.y),b===0&&re.copy(L);break;case"h":Z=p(ge);for(let b=0,Ie=Z.length;b<Ie;b++)L.x+=Z[b],V.x=L.x,V.y=L.y,O.lineTo(L.x,L.y),b===0&&I===!0&&re.copy(L);break;case"v":Z=p(ge);for(let b=0,Ie=Z.length;b<Ie;b++)L.y+=Z[b],V.x=L.x,V.y=L.y,O.lineTo(L.x,L.y),b===0&&I===!0&&re.copy(L);break;case"l":Z=p(ge);for(let b=0,Ie=Z.length;b<Ie;b+=2)L.x+=Z[b+0],L.y+=Z[b+1],V.x=L.x,V.y=L.y,O.lineTo(L.x,L.y),b===0&&I===!0&&re.copy(L);break;case"c":Z=p(ge);for(let b=0,Ie=Z.length;b<Ie;b+=6)O.bezierCurveTo(L.x+Z[b+0],L.y+Z[b+1],L.x+Z[b+2],L.y+Z[b+3],L.x+Z[b+4],L.y+Z[b+5]),V.x=L.x+Z[b+2],V.y=L.y+Z[b+3],L.x+=Z[b+4],L.y+=Z[b+5],b===0&&I===!0&&re.copy(L);break;case"s":Z=p(ge);for(let b=0,Ie=Z.length;b<Ie;b+=4)O.bezierCurveTo(g(L.x,V.x),g(L.y,V.y),L.x+Z[b+0],L.y+Z[b+1],L.x+Z[b+2],L.y+Z[b+3]),V.x=L.x+Z[b+0],V.y=L.y+Z[b+1],L.x+=Z[b+2],L.y+=Z[b+3],b===0&&I===!0&&re.copy(L);break;case"q":Z=p(ge);for(let b=0,Ie=Z.length;b<Ie;b+=4)O.quadraticCurveTo(L.x+Z[b+0],L.y+Z[b+1],L.x+Z[b+2],L.y+Z[b+3]),V.x=L.x+Z[b+0],V.y=L.y+Z[b+1],L.x+=Z[b+2],L.y+=Z[b+3],b===0&&I===!0&&re.copy(L);break;case"t":Z=p(ge);for(let b=0,Ie=Z.length;b<Ie;b+=2){let De=g(L.x,V.x),P=g(L.y,V.y);O.quadraticCurveTo(De,P,L.x+Z[b+0],L.y+Z[b+1]),V.x=De,V.y=P,L.x=L.x+Z[b+0],L.y=L.y+Z[b+1],b===0&&I===!0&&re.copy(L)}break;case"a":Z=p(ge,[3,4],7);for(let b=0,Ie=Z.length;b<Ie;b+=7){if(Z[b+5]==0&&Z[b+6]==0)continue;let De=L.clone();L.x+=Z[b+5],L.y+=Z[b+6],V.x=L.x,V.y=L.y,o(O,Z[b],Z[b+1],Z[b+2],Z[b+3],Z[b+4],De,L),b===0&&I===!0&&re.copy(L)}break;case"Z":case"z":O.currentPath.autoClose=!0,O.currentPath.curves.length>0&&(L.copy(re),O.currentPath.currentPoint.copy(L),de=!0);break;default:console.warn(oe)}I=!1}return O}function r(z){if(!(!z.sheet||!z.sheet.cssRules||!z.sheet.cssRules.length))for(let O=0;O<z.sheet.cssRules.length;O++){let L=z.sheet.cssRules[O];if(L.type!==1)continue;let V=L.selectorText.split(/,/gm).filter(Boolean).map(re=>re.trim());for(let re=0;re<V.length;re++){let de=Object.fromEntries(Object.entries(L.style).filter(([,I])=>I!==""));j[V[re]]=Object.assign(j[V[re]]||{},de)}}}function o(z,O,L,V,re,de,I,H){if(O==0||L==0){z.lineTo(H.x,H.y);return}V=V*Math.PI/180,O=Math.abs(O),L=Math.abs(L);let B=(I.x-H.x)/2,K=(I.y-H.y)/2,ee=Math.cos(V)*B+Math.sin(V)*K,oe=-Math.sin(V)*B+Math.cos(V)*K,me=O*O,ge=L*L,Z=ee*ee,b=oe*oe,Ie=Z/me+b/ge;if(Ie>1){let fe=Math.sqrt(Ie);O=fe*O,L=fe*L,me=O*O,ge=L*L}let De=me*b+ge*Z,P=(me*ge-De)/De,v=Math.sqrt(Math.max(0,P));re===de&&(v=-v);let J=v*O*oe/L,Q=-v*L*ee/O,se=Math.cos(V)*J-Math.sin(V)*Q+(I.x+H.x)/2,ve=Math.sin(V)*J+Math.cos(V)*Q+(I.y+H.y)/2,Me=a(1,0,(ee-J)/O,(oe-Q)/L),ae=a((ee-J)/O,(oe-Q)/L,(-ee-J)/O,(-oe-Q)/L)%(Math.PI*2);z.currentPath.absellipse(se,ve,O,L,Me,Me+ae,de===0,V)}function a(z,O,L,V){let re=z*L+O*V,de=Math.sqrt(z*z+O*O)*Math.sqrt(L*L+V*V),I=Math.acos(Math.max(-1,Math.min(1,re/de)));return z*V-O*L<0&&(I=-I),I}function c(z){let O=_(z.getAttribute("x")||0),L=_(z.getAttribute("y")||0),V=_(z.getAttribute("rx")||z.getAttribute("ry")||0),re=_(z.getAttribute("ry")||z.getAttribute("rx")||0),de=_(z.getAttribute("width")),I=_(z.getAttribute("height")),H=1-.551915024494,B=new In;return B.moveTo(O+V,L),B.lineTo(O+de-V,L),(V!==0||re!==0)&&B.bezierCurveTo(O+de-V*H,L,O+de,L+re*H,O+de,L+re),B.lineTo(O+de,L+I-re),(V!==0||re!==0)&&B.bezierCurveTo(O+de,L+I-re*H,O+de-V*H,L+I,O+de-V,L+I),B.lineTo(O+V,L+I),(V!==0||re!==0)&&B.bezierCurveTo(O+V*H,L+I,O,L+I-re*H,O,L+I-re),B.lineTo(O,L+re),(V!==0||re!==0)&&B.bezierCurveTo(O,L+re*H,O+V*H,L,O+V,L),B}function l(z){function O(de,I,H){let B=_(I),K=_(H);re===0?V.moveTo(B,K):V.lineTo(B,K),re++}let L=/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,V=new In,re=0;return z.getAttribute("points").replace(L,O),V.currentPath.autoClose=!0,V}function h(z){function O(de,I,H){let B=_(I),K=_(H);re===0?V.moveTo(B,K):V.lineTo(B,K),re++}let L=/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,V=new In,re=0;return z.getAttribute("points").replace(L,O),V.currentPath.autoClose=!1,V}function u(z){let O=_(z.getAttribute("cx")||0),L=_(z.getAttribute("cy")||0),V=_(z.getAttribute("r")||0),re=new Qn;re.absarc(O,L,V,0,Math.PI*2);let de=new In;return de.subPaths.push(re),de}function f(z){let O=_(z.getAttribute("cx")||0),L=_(z.getAttribute("cy")||0),V=_(z.getAttribute("rx")||0),re=_(z.getAttribute("ry")||0),de=new Qn;de.absellipse(O,L,V,re,0,Math.PI*2);let I=new In;return I.subPaths.push(de),I}function d(z){let O=_(z.getAttribute("x1")||0),L=_(z.getAttribute("y1")||0),V=_(z.getAttribute("x2")||0),re=_(z.getAttribute("y2")||0),de=new In;return de.moveTo(O,L),de.lineTo(V,re),de.currentPath.autoClose=!1,de}function m(z){let O="http://www.w3.org/1999/xlink",L=z.querySelectorAll("linearGradient, radialGradient"),V=["x1","y1","x2","y2","cx","cy","r","fx","fy","gradientUnits","gradientTransform","spreadMethod"],re={};for(let I of L){let H=I.getAttribute("id");if(!H)continue;let B={type:I.nodeName==="radialGradient"?"radialGradient":"linearGradient",attrs:{},stops:null,href:null},K=I.getAttributeNS(O,"href")||I.getAttribute("href")||"";K.startsWith("#")&&(B.href=K.substring(1));for(let oe of V)I.hasAttribute(oe)&&(B.attrs[oe]=I.getAttribute(oe));let ee=I.querySelectorAll("stop");if(ee.length>0){B.stops=[];for(let oe of ee){let me=oe.getAttribute("stop-color");!me&&oe.style&&(me=oe.style["stop-color"]),me||(me="#000");let ge=oe.getAttribute("stop-opacity");(ge===null||ge==="")&&oe.style&&(ge=oe.style["stop-opacity"]),ge=ge===null||ge===""||ge===void 0?1:Math.max(0,Math.min(1,parseFloat(ge)));let Z=Math.max(0,Math.min(1,parseFloat(oe.getAttribute("offset")||"0")));B.stops.push({offset:Z,color:me,opacity:ge})}}re[H]=B}function de(I,H){let B=re[I];if(!B||H.has(I))return B;if(H.add(I),B.href&&re[B.href]){let K=de(B.href,H);if(K){B.stops||(B.stops=K.stops);for(let ee in K.attrs)ee in B.attrs||(B.attrs[ee]=K.attrs[ee])}}return B}for(let I in re)de(I,new Set);for(let I in re){let oe=function(me){return typeof me!="string"?0:me.endsWith("%")?parseFloat(me)/100:_(me)},H=re[I],B=H.attrs,K=B.gradientUnits==="userSpaceOnUse"?"userSpaceOnUse":"objectBoundingBox",ee={type:H.type,gradientUnits:K,spreadMethod:B.spreadMethod==="reflect"||B.spreadMethod==="repeat"?B.spreadMethod:"pad",gradientTransform:null,stops:(H.stops||[]).slice().sort((me,ge)=>me.offset-ge.offset)};if(B.gradientTransform&&(ee.gradientTransform=new We,R(B.gradientTransform,ee.gradientTransform)),H.type==="linearGradient")ee.x1=B.x1!==void 0?oe(B.x1):0,ee.y1=B.y1!==void 0?oe(B.y1):0,ee.x2=B.x2!==void 0?oe(B.x2):K==="objectBoundingBox"?1:0,ee.y2=B.y2!==void 0?oe(B.y2):0;else{let me=K==="objectBoundingBox"?.5:0,ge=K==="objectBoundingBox"?.5:0;ee.cx=B.cx!==void 0?oe(B.cx):me,ee.cy=B.cy!==void 0?oe(B.cy):me,ee.r=B.r!==void 0?oe(B.r):ge,ee.fx=B.fx!==void 0?oe(B.fx):ee.cx,ee.fy=B.fy!==void 0?oe(B.fy):ee.cy}X[I]=ee}}function y(z,O){O=Object.assign({},O);let L={};if(z.hasAttribute("class")){let I=z.getAttribute("class").split(/\s/).filter(Boolean).map(H=>H.trim());for(let H=0;H<I.length;H++)L=Object.assign(L,j["."+I[H]])}z.hasAttribute("id")&&(L=Object.assign(L,j["#"+z.getAttribute("id")]));function V(I,H,B){B===void 0&&(B=function(ee){return ee}),z.hasAttribute(I)&&(O[H]=B(z.getAttribute(I))),L[H]&&(O[H]=B(L[H])),z.style&&z.style[I]!==""&&(O[H]=B(z.style[I]))}function re(I){return Math.max(0,Math.min(1,_(I)))}function de(I){return Math.max(0,_(I))}return V("fill","fill"),V("fill-opacity","fillOpacity",re),V("fill-rule","fillRule"),V("opacity","opacity",re),V("stroke","stroke"),V("stroke-opacity","strokeOpacity",re),V("stroke-width","strokeWidth",de),V("stroke-linejoin","strokeLineJoin"),V("stroke-linecap","strokeLineCap"),V("stroke-miterlimit","strokeMiterLimit",de),V("visibility","visibility"),O}function g(z,O){return z-(O-z)}function p(z,O,L){if(typeof z!="string")throw new TypeError("Invalid input: "+typeof z);let V={SEPARATOR:/[ \t\r\n\,.\-+]/,WHITESPACE:/[ \t\r\n]/,DIGIT:/[\d]/,SIGN:/[-+]/,POINT:/\./,COMMA:/,/,EXP:/e/i,FLAGS:/[01]/},re=0,de=1,I=2,H=3,B=re,K=!0,ee="",oe="",me=[];function ge(De,P,v){let J=new SyntaxError('Unexpected character "'+De+'" at index '+P+".");throw J.partial=v,J}function Z(){ee!==""&&(oe===""?me.push(Number(ee)):me.push(Number(ee)*Math.pow(10,Number(oe)))),ee="",oe=""}let b,Ie=z.length;for(let De=0;De<Ie;De++){if(b=z[De],Array.isArray(O)&&O.includes(me.length%L)&&V.FLAGS.test(b)){B=de,ee=b,Z();continue}if(B===re){if(V.WHITESPACE.test(b))continue;if(V.DIGIT.test(b)||V.SIGN.test(b)){B=de,ee=b;continue}if(V.POINT.test(b)){B=I,ee=b;continue}V.COMMA.test(b)&&(K&&ge(b,De,me),K=!0)}if(B===de){if(V.DIGIT.test(b)){ee+=b;continue}if(V.POINT.test(b)){ee+=b,B=I;continue}if(V.EXP.test(b)){B=H;continue}V.SIGN.test(b)&&ee.length===1&&V.SIGN.test(ee[0])&&ge(b,De,me)}if(B===I){if(V.DIGIT.test(b)){ee+=b;continue}if(V.EXP.test(b)){B=H;continue}V.POINT.test(b)&&ee[ee.length-1]==="."&&ge(b,De,me)}if(B===H){if(V.DIGIT.test(b)){oe+=b;continue}if(V.SIGN.test(b)){if(oe===""){oe+=b;continue}oe.length===1&&V.SIGN.test(oe)&&ge(b,De,me)}}V.WHITESPACE.test(b)?(Z(),B=re,K=!1):V.COMMA.test(b)?(Z(),B=re,K=!0):V.SIGN.test(b)?(Z(),B=de,ee=b):V.POINT.test(b)?(Z(),B=I,ee=b):ge(b,De,me)}return Z(),me}let E=["mm","cm","in","pt","pc","px"],M={mm:{mm:1,cm:.1,in:1/25.4,pt:72/25.4,pc:6/25.4,px:-1},cm:{mm:10,cm:1,in:1/2.54,pt:72/2.54,pc:6/2.54,px:-1},in:{mm:25.4,cm:2.54,in:1,pt:72,pc:6,px:-1},pt:{mm:25.4/72,cm:2.54/72,in:1/72,pt:1,pc:6/72,px:-1},pc:{mm:25.4/6,cm:2.54/6,in:1/6,pt:72/6,pc:1,px:-1},px:{px:1}};function _(z){let O="px";if(typeof z=="string"||z instanceof String)for(let V=0,re=E.length;V<re;V++){let de=E[V];if(z.endsWith(de)){O=de,z=z.substring(0,z.length-de.length);break}}let L;return O==="px"&&t.defaultUnit!=="px"?L=M.in[t.defaultUnit]/t.defaultDPI:(L=M[O][t.defaultUnit],L<0&&(L=M[O].in*t.defaultDPI)),L*parseFloat(z)}function S(z){if(!(z.hasAttribute("transform")||z.nodeName==="use"&&(z.hasAttribute("x")||z.hasAttribute("y"))))return null;let O=w(z);return G.length>0&&O.premultiply(G[G.length-1]),Ze.copy(O),G.push(O),O}function w(z){let O=new We;if(z.nodeName==="use"&&(z.hasAttribute("x")||z.hasAttribute("y"))){let L=_(z.getAttribute("x")||0),V=_(z.getAttribute("y")||0);O.makeTranslation(L,V)}return z.hasAttribute("transform")&&R(z.getAttribute("transform"),O),O}function R(z,O){let L=le,V=z.split(")");for(let re=V.length-1;re>=0;re--){let de=V[re].trim();if(de==="")continue;let I=de.indexOf("("),H=de.length;if(I>0&&I<H){let B=de.slice(0,I),K=p(de.slice(I+1));switch(L.identity(),B){case"translate":if(K.length>=1){let ee=K[0],oe=0;K.length>=2&&(oe=K[1]),L.makeTranslation(ee,oe)}break;case"rotate":if(K.length>=1){let ee=0,oe=0,me=0;ee=K[0]*Math.PI/180,K.length>=3&&(oe=K[1],me=K[2]),he.makeTranslation(-oe,-me),_e.makeRotation(ee),ye.multiplyMatrices(_e,he),he.makeTranslation(oe,me),L.multiplyMatrices(he,ye)}break;case"scale":if(K.length>=1){let ee=K[0],oe=ee;K.length>=2&&(oe=K[1]),L.makeScale(ee,oe)}break;case"skewX":K.length===1&&L.set(1,Math.tan(K[0]*Math.PI/180),0,0,1,0,0,0,1);break;case"skewY":K.length===1&&L.set(1,0,0,Math.tan(K[0]*Math.PI/180),1,0,0,0,1);break;case"matrix":K.length===6&&L.set(K[0],K[2],K[4],K[1],K[3],K[5],0,0,1);break}O.premultiply(L)}}return O}function x(z,O){function L(I){Je.set(I.x,I.y,1).applyMatrix3(O),I.set(Je.x,Je.y)}function V(I){let H=I.xRadius,B=I.yRadius,K=Math.cos(I.aRotation),ee=Math.sin(I.aRotation),oe=new U(H*K,H*ee,0),me=new U(-B*ee,B*K,0),ge=oe.applyMatrix3(O),Z=me.applyMatrix3(O),b=le.set(ge.x,Z.x,0,ge.y,Z.y,0,0,0,1),Ie=he.copy(b).invert(),v=_e.copy(Ie).transpose().multiply(Ie).elements,J=W(v[0],v[1],v[4]),Q=Math.sqrt(J.rt1),se=Math.sqrt(J.rt2);if(I.xRadius=1/Q,I.yRadius=1/se,I.aRotation=Math.atan2(J.sn,J.cs),!((I.aEndAngle-I.aStartAngle)%(2*Math.PI)<Number.EPSILON)){let Me=he.set(Q,0,0,0,se,0,0,0,1),ae=_e.set(J.cs,J.sn,0,-J.sn,J.cs,0,0,0,1),fe=Me.multiply(ae).multiply(b),Se=Oe=>{let{x:Te,y:Ee}=new U(Math.cos(Oe),Math.sin(Oe),0).applyMatrix3(fe);return Math.atan2(Ee,Te)};I.aStartAngle=Se(I.aStartAngle),I.aEndAngle=Se(I.aEndAngle),T(O)&&(I.aClockwise=!I.aClockwise)}}function re(I){let H=C(O),B=D(O);I.xRadius*=H,I.yRadius*=B;let K=H>Number.EPSILON?Math.atan2(O.elements[1],O.elements[0]):Math.atan2(-O.elements[3],O.elements[4]);I.aRotation+=K,T(O)&&(I.aStartAngle*=-1,I.aEndAngle*=-1,I.aClockwise=!I.aClockwise)}let de=z.subPaths;for(let I=0,H=de.length;I<H;I++){let K=de[I].curves;for(let ee=0;ee<K.length;ee++){let oe=K[ee];oe.isLineCurve?(L(oe.v1),L(oe.v2)):oe.isCubicBezierCurve?(L(oe.v0),L(oe.v1),L(oe.v2),L(oe.v3)):oe.isQuadraticBezierCurve?(L(oe.v0),L(oe.v1),L(oe.v2)):oe.isEllipseCurve&&(Be.set(oe.aX,oe.aY),L(Be),oe.aX=Be.x,oe.aY=Be.y,N(O)?V(oe):re(oe))}}}function T(z){let O=z.elements;return O[0]*O[4]-O[1]*O[3]<0}function N(z){let O=z.elements,L=O[0]*O[3]+O[1]*O[4];if(L===0)return!1;let V=C(z),re=D(z);return Math.abs(L/(V*re))>Number.EPSILON}function C(z){let O=z.elements;return Math.sqrt(O[0]*O[0]+O[1]*O[1])}function D(z){let O=z.elements;return Math.sqrt(O[3]*O[3]+O[4]*O[4])}function F(z){let O=z.elements,L=O[0]*O[4]-O[1]*O[3];return Math.sqrt(Math.abs(L))}function W(z,O,L){let V,re,de,I,H,B=z+L,K=z-L,ee=Math.sqrt(K*K+4*O*O);return B>0?(V=.5*(B+ee),H=1/V,re=z*H*L-O*H*O):B<0?re=.5*(B-ee):(V=.5*ee,re=-.5*ee),K>0?de=K+ee:de=K-ee,Math.abs(de)>2*Math.abs(O)?(H=-2*O/de,I=1/Math.sqrt(1+H*H),de=H*I):Math.abs(O)===0?(de=1,I=0):(H=-.5*de/O,de=1/Math.sqrt(1+H*H),I=H*de),K>0&&(H=de,de=-I,I=H),{rt1:V,rt2:re,cs:de,sn:I}}let k=[],j={},X={},G=[],le=new We,he=new We,_e=new We,ye=new We,Be=new ue,Je=new U,Ze=new We,ce=new DOMParser().parseFromString(e,"image/svg+xml");return m(ce),n(ce.documentElement,{fill:"#000",fillOpacity:1,strokeOpacity:1,strokeWidth:1,strokeLineJoin:"miter",strokeLineCap:"butt",strokeMiterLimit:4}),{paths:k,gradients:X,xml:ce.documentElement}}static createFillMaterial(e){let t=e.userData.style;if(t.fill===void 0||t.fill==="none")return null;let n=e.color,s=null,r=Zp.exec(t.fill);if(r){let a=e.userData.gradients&&e.userData.gradients[r[1]];s=m1(a,e)}let o=new sn({opacity:t.fillOpacity*(t.opacity||1),transparent:!0,side:jt,depthWrite:!1});return s!==null?o.map=s:o.color=n,o}static createStrokeMaterial(e){let t=e.userData.style;return t.stroke===void 0||t.stroke==="none"?null:(Zp.test(t.stroke)&&console.warn("THREE.SVGLoader: Gradient strokes are not supported."),new sn({color:new Ve().setStyle(t.stroke,Go),opacity:t.strokeOpacity*(t.opacity||1),transparent:!0,side:jt,depthWrite:!1}))}static createShapes(e){return console.warn("SVGLoader: createShapes() is deprecated. Use shapePath.toShapes() instead."),e.toShapes()}static getStrokeStyle(e,t,n,s,r){return e=e!==void 0?e:1,t=t!==void 0?t:"#000",n=n!==void 0?n:"miter",s=s!==void 0?s:"butt",r=r!==void 0?r:4,{strokeColor:t,strokeWidth:e,strokeLineJoin:n,strokeLineCap:s,strokeMiterLimit:r}}static pointsToStroke(e,t,n,s){let r=[],o=[],a=[];if(i.pointsToStrokeWithBuffers(e,t,n,s,r,o,a)===0)return null;let c=new Pt;return c.setAttribute("position",new mt(r,3)),c.setAttribute("normal",new mt(o,3)),c.setAttribute("uv",new mt(a,2)),c}static pointsToStrokeWithBuffers(e,t,n,s,r,o,a,c){let l=new ue,h=new ue,u=new ue,f=new ue,d=new ue,m=new ue,y=new ue,g=new ue,p=new ue,E=new ue,M=new ue,_=new ue,S=new ue,w=new ue,R=new ue,x=new ue,T=new ue;n=n!==void 0?n:12,s=s!==void 0?s:.001,c=c!==void 0?c:0,e=de(e);let N=e.length;if(N<2)return 0;let C=e[0].equals(e[N-1]),D,F=e[0],W,k=t.strokeWidth/2,j=1/(N-1),X=0,G,le,he,_e,ye=!1,Be=0,Je=c*3,Ze=c*2;ce(e[0],e[1],l).multiplyScalar(k),g.copy(e[0]).sub(l),p.copy(e[0]).add(l),E.copy(g),M.copy(p);for(let I=1;I<N;I++){D=e[I],I===N-1?C?W=e[1]:W=void 0:W=e[I+1];let H=l;if(ce(F,D,H),u.copy(H).multiplyScalar(k),_.copy(D).sub(u),S.copy(D).add(u),G=X+j,le=!1,W!==void 0){ce(D,W,h),u.copy(h).multiplyScalar(k),w.copy(D).sub(u),R.copy(D).add(u),he=!0,u.subVectors(W,F),H.dot(u)<0&&(he=!1),I===1&&(ye=he),u.subVectors(W,D),u.normalize();let B=Math.abs(H.dot(u));if(B>Number.EPSILON){let K=k/B;u.multiplyScalar(-K),f.subVectors(D,F),d.copy(f).setLength(K).add(u),x.copy(d).negate();let ee=d.length(),oe=f.length();f.divideScalar(oe),m.subVectors(W,D);let me=m.length();if(m.divideScalar(me),f.dot(x)<oe&&m.dot(x)<me&&(le=!0),T.copy(d).add(D),x.add(D),le){let ge=he?p:g,Z=(T.x-ge.x)*(x.y-ge.y)-(T.y-ge.y)*(x.x-ge.x);(he&&Z<0||!he&&Z>0)&&x.copy(ge)}switch(_e=!1,le?he?(R.copy(x),S.copy(x)):(w.copy(x),_.copy(x)):O(),t.strokeLineJoin){case"bevel":L(he,le,G);break;case"round":V(he,le),he?z(D,_,w,G,0):z(D,R,S,G,1);break;default:let ge=k*t.strokeMiterLimit/ee;if(ge<1)if(t.strokeLineJoin!=="miter-clip"){L(he,le,G);break}else V(he,le),he?(m.subVectors(T,_).multiplyScalar(ge).add(_),y.subVectors(T,w).multiplyScalar(ge).add(w),Y(_,G,0),Y(m,G,0),Y(D,G,.5),Y(D,G,.5),Y(m,G,0),Y(y,G,0),Y(D,G,.5),Y(y,G,0),Y(w,G,0)):(m.subVectors(T,S).multiplyScalar(ge).add(S),y.subVectors(T,R).multiplyScalar(ge).add(R),Y(S,G,1),Y(m,G,1),Y(D,G,.5),Y(D,G,.5),Y(m,G,1),Y(y,G,1),Y(D,G,.5),Y(y,G,1),Y(R,G,1));else le?(he?(Y(p,X,1),Y(g,X,0),Y(T,G,0),Y(p,X,1),Y(T,G,0),Y(x,G,1)):(Y(p,X,1),Y(g,X,0),Y(T,G,1),Y(g,X,0),Y(x,G,0),Y(T,G,1)),he?w.copy(T):R.copy(T)):he?(Y(_,G,0),Y(T,G,0),Y(D,G,.5),Y(D,G,.5),Y(T,G,0),Y(w,G,0)):(Y(S,G,1),Y(T,G,1),Y(D,G,.5),Y(D,G,.5),Y(T,G,1),Y(R,G,1)),_e=!0;break}}else O()}else O();!C&&I===N-1&&re(e[0],E,M,he,!0,X),X=G,F=D,g.copy(w),p.copy(R)}if(!C)re(D,_,S,he,!1,G);else if(le&&r){let I=T,H=x;ye!==he&&(I=x,H=T),he?(_e||ye)&&(H.toArray(r,0),H.toArray(r,9),_e&&I.toArray(r,3)):(_e||!ye)&&(H.toArray(r,3),H.toArray(r,9),_e&&I.toArray(r,0))}if(r){let I=[new ue,new ue,new ue],H=c*3;for(let B=H;B<Je;B+=9)I[0].set(r[B],r[B+1]),I[1].set(r[B+3],r[B+4]),I[2].set(r[B+6],r[B+7]),qn.area(I)<0&&(r[B+3]=I[0].x,r[B+4]=I[0].y)}return Be;function ce(I,H,B){return B.subVectors(H,I),B.set(-B.y,B.x).normalize()}function Y(I,H,B){r&&(r[Je]=I.x,r[Je+1]=I.y,r[Je+2]=0,o&&(o[Je]=0,o[Je+1]=0,o[Je+2]=1),Je+=3,a&&(a[Ze]=H,a[Ze+1]=B,Ze+=2)),Be+=3}function z(I,H,B,K,ee){l.copy(H).sub(I).normalize(),h.copy(B).sub(I).normalize();let oe=Math.PI,me=l.dot(h);Math.abs(me)<1&&(oe=Math.abs(Math.acos(me))),oe/=n,u.copy(H);for(let ge=0,Z=n-1;ge<Z;ge++)f.copy(u).rotateAround(I,oe),Y(u,K,ee),Y(f,K,ee),Y(I,K,.5),u.copy(f);Y(u,K,ee),Y(B,K,ee),Y(I,K,.5)}function O(){Y(p,X,1),Y(g,X,0),Y(_,G,0),Y(p,X,1),Y(_,G,0),Y(S,G,1)}function L(I,H,B){H?I?(Y(p,X,1),Y(g,X,0),Y(_,G,0),Y(p,X,1),Y(_,G,0),Y(x,G,1),Y(_,B,0),Y(w,B,0),Y(x,B,.5)):(Y(p,X,1),Y(g,X,0),Y(S,G,1),Y(g,X,0),Y(x,G,0),Y(S,G,1),Y(S,B,1),Y(x,B,0),Y(R,B,1)):I?(Y(_,B,0),Y(w,B,0),Y(D,B,.5)):(Y(S,B,1),Y(R,B,0),Y(D,B,.5))}function V(I,H){H&&(I?(Y(p,X,1),Y(g,X,0),Y(_,G,0),Y(p,X,1),Y(_,G,0),Y(x,G,1),Y(_,X,0),Y(D,G,.5),Y(x,G,1),Y(D,G,.5),Y(w,X,0),Y(x,G,1)):(Y(p,X,1),Y(g,X,0),Y(S,G,1),Y(g,X,0),Y(x,G,0),Y(S,G,1),Y(S,X,1),Y(x,G,0),Y(D,G,.5),Y(D,G,.5),Y(x,G,0),Y(R,X,1)))}function re(I,H,B,K,ee,oe){switch(t.strokeLineCap){case"round":ee?z(I,B,H,oe,.5):z(I,H,B,oe,.5);break;case"square":if(ee)l.subVectors(H,I),h.set(l.y,-l.x),u.addVectors(l,h).add(I),f.subVectors(h,l).add(I),K?(u.toArray(r,3),f.toArray(r,0),f.toArray(r,9)):(u.toArray(r,3),a[7]===1?f.toArray(r,9):u.toArray(r,9),f.toArray(r,0));else{l.subVectors(B,I),h.set(l.y,-l.x),u.addVectors(l,h).add(I),f.subVectors(h,l).add(I);let me=r.length;K?(u.toArray(r,me-3),f.toArray(r,me-6),f.toArray(r,me-12)):(f.toArray(r,me-6),u.toArray(r,me-3),f.toArray(r,me-12))}break;default:break}}function de(I){let H=!1;for(let K=1,ee=I.length-1;K<ee;K++)if(I[K].distanceTo(I[K+1])<s){H=!0;break}if(!H)return I;let B=[];B.push(I[0]);for(let K=1,ee=I.length-1;K<ee;K++)I[K].distanceTo(I[K+1])>=s&&B.push(I[K]);return B.push(I[I.length-1]),B}}},Zp=/^\s*url\(\s*(?:["']\s*)?#([^)'"\s]+)(?:\s*["'])?\s*\)\s*$/;function m1(i,e,t=256){if(!i||!Array.isArray(i.stops)||i.stops.length===0)return null;let n=e.userData.transform,s=i.gradientUnits==="objectBoundingBox",r=null;if(s&&(r=g1(e,n),r===null))return null;function o(u,f,d){d.set(u,f,1),i.gradientTransform&&d.applyMatrix3(i.gradientTransform),s&&d.set(r.minX+d.x*r.width,r.minY+d.y*r.height,1),n&&d.applyMatrix3(n)}let a=document.createElement("canvas"),c;if(i.type==="linearGradient"){a.width=t,a.height=1;let u=a.getContext("2d"),f=u.createLinearGradient(0,0,t,0);Yp(f,i.stops),u.fillStyle=f,u.fillRect(0,0,t,1);let d=new U,m=new U;o(i.x1,i.y1,d),o(i.x2,i.y2,m);let y=m.x-d.x,g=m.y-d.y,p=y*y+g*g||1e-20,E=y/p,M=g/p,_=-(E*d.x+M*d.y);c=new We().set(E,M,_,0,0,.5,0,0,1)}else{let u=i.cx,f=i.cy,d=i.fx,m=i.fy,y=i.r;if(i.gradientTransform){let x=new U;x.set(u,f,1).applyMatrix3(i.gradientTransform),u=x.x,f=x.y,x.set(d,m,1).applyMatrix3(i.gradientTransform),d=x.x,m=x.y}if(s&&(u=r.minX+u*r.width,f=r.minY+f*r.height,d=r.minX+d*r.width,m=r.minY+m*r.height,y=y*Math.sqrt((r.width*r.width+r.height*r.height)/2)),y<=0)return null;a.width=t,a.height=t;let g=a.getContext("2d"),p=u-y,E=f-y,M=2*y,_=t/M;g.setTransform(_,0,0,_,-p*_,-E*_);let S=g.createRadialGradient(d,m,0,u,f,y);Yp(S,i.stops),g.fillStyle=S,g.fillRect(p,E,M,M);let w=n?n.clone().invert():new We;c=new We().set(1/M,0,-p/M,0,1/M,-E/M,0,0,1).multiply(w)}let l=new Cn(a);l.colorSpace=Go,l.flipY=!1,l.matrixAutoUpdate=!1,l.matrix=c;let h=i.spreadMethod==="reflect"?Bi:i.spreadMethod==="repeat"?Yn:nn;return l.wrapS=h,l.wrapT=h,l}function g1(i,e){let t=e?e.clone().invert():null,n=new ue,s=new ur;for(let r of i.subPaths)for(let o of r.getPoints())n.copy(o),t&&n.applyMatrix3(t),s.expandByPoint(n);return s.isEmpty()?null:{minX:s.min.x,minY:s.min.y,width:s.max.x-s.min.x,height:s.max.y-s.min.y}}function Yp(i,e){let t=new Ve;for(let n of e){let s=n.color;if(n.opacity<1){t.setStyle(n.color,Go);let r=/rgb\(([^)]+)\)/.exec(t.getStyle(Go));r&&(s=`rgba(${r[1]},${n.opacity})`)}i.addColorStop(Math.max(0,Math.min(1,n.offset)),s)}}var Jp={POSITION:["byte","byte normalized","unsigned byte","unsigned byte normalized","short","short normalized","unsigned short","unsigned short normalized"],NORMAL:["byte normalized","short normalized"],TANGENT:["byte normalized","short normalized"],TEXCOORD:["byte","byte normalized","unsigned byte","short","short normalized","unsigned short"]},$i=class{constructor(){this.textureUtils=null,this.pluginCallbacks=[],this.register(function(e){return new Lu(e)}),this.register(function(e){return new Nu(e)}),this.register(function(e){return new Fu(e)}),this.register(function(e){return new Bu(e)}),this.register(function(e){return new zu(e)}),this.register(function(e){return new ku(e)}),this.register(function(e){return new Du(e)}),this.register(function(e){return new Uu(e)}),this.register(function(e){return new Ou(e)}),this.register(function(e){return new Vu(e)}),this.register(function(e){return new Hu(e)}),this.register(function(e){return new Gu(e)}),this.register(function(e){return new Wu(e)}),this.register(function(e){return new Xu(e)})}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}setTextureUtils(e){return this.textureUtils=e,this}parse(e,t,n,s){let r=new Pu,o=[];for(let a=0,c=this.pluginCallbacks.length;a<c;a++)o.push(this.pluginCallbacks[a](r));r.setPlugins(o),r.setTextureUtils(this.textureUtils),r.writeAsync(e,t,s).catch(n)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,s,r,t)})}},nt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,INT:5124,UNSIGNED_INT:5125,FLOAT:5126,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,REPEAT:10497},Ru="KHR_mesh_quantization",gn={};gn[Dt]=nt.NEAREST;gn[dc]=nt.NEAREST_MIPMAP_NEAREST;gn[xs]=nt.NEAREST_MIPMAP_LINEAR;gn[Ct]=nt.LINEAR;gn[dr]=nt.LINEAR_MIPMAP_NEAREST;gn[ti]=nt.LINEAR_MIPMAP_LINEAR;gn[nn]=nt.CLAMP_TO_EDGE;gn[Yn]=nt.REPEAT;gn[Bi]=nt.MIRRORED_REPEAT;var $p={scale:"scale",position:"translation",quaternion:"rotation",morphTargetInfluences:"weights"},x1=new Ve,Kp=12,_1=1179937895,y1=2,jp=8,v1=1313821514,M1=5130562;function wi(i,e){return i.length===e.length&&i.every(function(t,n){return t===e[n]})}function S1(i){return new TextEncoder().encode(i).buffer}function b1(i){return wi(i.elements,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}function E1(i,e,t){let n={min:new Array(i.itemSize).fill(Number.POSITIVE_INFINITY),max:new Array(i.itemSize).fill(Number.NEGATIVE_INFINITY)};for(let s=e;s<e+t;s++)for(let r=0;r<i.itemSize;r++){let o;i.itemSize>4?o=i.array[s*i.itemSize+r]:(r===0?o=i.getX(s):r===1?o=i.getY(s):r===2?o=i.getZ(s):r===3&&(o=i.getW(s)),i.normalized===!0&&(o=gt.normalize(o,i.array))),n.min[r]=Math.min(n.min[r],o),n.max[r]=Math.max(n.max[r],o)}return n}function Qp(i){return Math.ceil(i/4)*4}function Cu(i,e=0){let t=Qp(i.byteLength);if(t!==i.byteLength){let n=new Uint8Array(t);if(n.set(new Uint8Array(i)),e!==0)for(let s=i.byteLength;s<t;s++)n[s]=e;return n.buffer}return i}function Iu(){return typeof document>"u"&&typeof OffscreenCanvas<"u"?new OffscreenCanvas(1,1):document.createElement("canvas")}function w1(i,e){if(typeof OffscreenCanvas<"u"&&i instanceof OffscreenCanvas){let t;return e==="image/jpeg"?t=.92:e==="image/webp"&&(t=.8),i.convertToBlob({type:e,quality:t})}else return new Promise(t=>i.toBlob(t,e))}var Pu=class{constructor(){this.plugins=[],this.options={},this.pending=[],this.buffers=[],this.byteOffset=0,this.buffers=[],this.nodeMap=new Map,this.skins=[],this.extensionsUsed={},this.extensionsRequired={},this.uids=new Map,this.uid=0,this.json={asset:{version:"2.0",generator:"THREE.GLTFExporter r185"}},this.cache={meshes:new Map,attributes:new Map,attributesNormalized:new Map,materials:new Map,textures:new Map,images:new Map},this.textureUtils=null}setPlugins(e){this.plugins=e}setTextureUtils(e){this.textureUtils=e}async writeAsync(e,t,n={}){this.options=Object.assign({binary:!1,trs:!1,onlyVisible:!0,maxTextureSize:1/0,animations:[],includeCustomExtensions:!1},n),this.options.animations.length>0&&(this.options.trs=!0),await this.processInputAsync(e),await Promise.all(this.pending);let s=this,r=s.buffers,o=s.json;n=s.options;let a=s.extensionsUsed,c=s.extensionsRequired,l=new Blob(r,{type:"application/octet-stream"}),h=Object.keys(a),u=Object.keys(c);if(h.length>0&&(o.extensionsUsed=h),u.length>0&&(o.extensionsRequired=u),o.buffers&&o.buffers.length>0&&(o.buffers[0].byteLength=l.size),n.binary===!0){let f=new FileReader;f.readAsArrayBuffer(l),f.onloadend=function(){let d=Cu(f.result),m=new DataView(new ArrayBuffer(jp));m.setUint32(0,d.byteLength,!0),m.setUint32(4,M1,!0);let y=Cu(S1(JSON.stringify(o)),32),g=new DataView(new ArrayBuffer(jp));g.setUint32(0,y.byteLength,!0),g.setUint32(4,v1,!0);let p=new ArrayBuffer(Kp),E=new DataView(p);E.setUint32(0,_1,!0),E.setUint32(4,y1,!0);let M=Kp+g.byteLength+y.byteLength+m.byteLength+d.byteLength;E.setUint32(8,M,!0);let _=new Blob([p,g,y,m,d],{type:"application/octet-stream"}),S=new FileReader;S.readAsArrayBuffer(_),S.onloadend=function(){t(S.result)}}}else if(o.buffers&&o.buffers.length>0){let f=new FileReader;f.readAsDataURL(l),f.onloadend=function(){let d=f.result;o.buffers[0].uri=d,t(o)}}else t(o)}serializeUserData(e,t){if(Object.keys(e.userData).length===0)return;let n=this.options,s=this.extensionsUsed;try{let r=JSON.parse(JSON.stringify(e.userData));if(n.includeCustomExtensions&&r.gltfExtensions){t.extensions===void 0&&(t.extensions={});for(let o in r.gltfExtensions)t.extensions[o]=r.gltfExtensions[o],s[o]=!0;delete r.gltfExtensions}Object.keys(r).length>0&&(t.extras=r)}catch(r){console.warn("THREE.GLTFExporter: userData of '"+e.name+"' won't be serialized because of JSON.stringify error - "+r.message)}}getUID(e,t=!1){if(this.uids.has(e)===!1){let s=new Map;s.set(!0,this.uid++),s.set(!1,this.uid++),this.uids.set(e,s)}return this.uids.get(e).get(t)}isNormalizedNormalAttribute(e){if(this.cache.attributesNormalized.has(e))return!1;let n=new U;for(let s=0,r=e.count;s<r;s++)if(Math.abs(n.fromBufferAttribute(e,s).length()-1)>5e-4)return!1;return!0}createNormalizedNormalAttribute(e){let t=this.cache;if(t.attributesNormalized.has(e))return t.attributesNormalized.get(e);let n=e.clone(),s=new U;for(let r=0,o=n.count;r<o;r++)s.fromBufferAttribute(n,r),s.x===0&&s.y===0&&s.z===0?s.setX(1):s.normalize(),n.setXYZ(r,s.x,s.y,s.z);return t.attributesNormalized.set(e,n),n}applyTextureTransform(e,t){let n=!1,s={};(t.offset.x!==0||t.offset.y!==0)&&(s.offset=t.offset.toArray(),n=!0),t.rotation!==0&&(s.rotation=t.rotation,n=!0),(t.repeat.x!==1||t.repeat.y!==1)&&(s.scale=t.repeat.toArray(),n=!0),n&&(e.extensions=e.extensions||{},e.extensions.KHR_texture_transform=s,this.extensionsUsed.KHR_texture_transform=!0)}async buildMetalRoughTextureAsync(e,t){if(e===t)return e;function n(d){return d.colorSpace===yt?function(y){return y<.04045?y*.0773993808:Math.pow(y*.9478672986+.0521327014,2.4)}:function(y){return y}}e instanceof ki&&(e=await this.decompressTextureAsync(e)),t instanceof ki&&(t=await this.decompressTextureAsync(t));let s=e?e.image:null,r=t?t.image:null,o=Math.max(s?s.width:0,r?r.width:0),a=Math.max(s?s.height:0,r?r.height:0),c=Iu();c.width=o,c.height=a;let l=c.getContext("2d",{willReadFrequently:!0});l.fillStyle="#00ffff",l.fillRect(0,0,o,a);let h=l.getImageData(0,0,o,a);if(s){l.drawImage(s,0,0,o,a);let d=n(e),m=l.getImageData(0,0,o,a).data;for(let y=2;y<m.length;y+=4)h.data[y]=d(m[y]/256)*256}if(r){l.drawImage(r,0,0,o,a);let d=n(t),m=l.getImageData(0,0,o,a).data;for(let y=1;y<m.length;y+=4)h.data[y]=d(m[y]/256)*256}l.putImageData(h,0,0);let f=(e||t).clone();return f.source=new yi(c),f.colorSpace=Nn,f.channel=(e||t).channel,e&&t&&e.channel!==t.channel&&console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match."),console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures."),f}async buildNormalMapTextureAsync(e,t,n){e instanceof ki&&(e=await this.decompressTextureAsync(e));let s=e.image,r=Iu();r.width=s.width,r.height=s.height;let o=r.getContext("2d",{willReadFrequently:!0});o.drawImage(s,0,0,r.width,r.height);let a=o.getImageData(0,0,r.width,r.height),c=a.data;for(let h=0;h<c.length;h+=4)t&&(c[h+0]=255-c[h+0]),n&&(c[h+1]=255-c[h+1]);o.putImageData(a,0,0);let l=e.clone();return l.source=new yi(r),l}async decompressTextureAsync(e,t=1/0){if(this.textureUtils===null)throw new Error("THREE.GLTFExporter: setTextureUtils() must be called to process compressed textures.");return await this.textureUtils.decompress(e,t)}processBuffer(e){let t=this.json,n=this.buffers;return t.buffers||(t.buffers=[{byteLength:0}]),n.push(e),0}processBufferView(e,t,n,s,r){let o=this.json;o.bufferViews||(o.bufferViews=[]);let a;switch(t){case nt.BYTE:case nt.UNSIGNED_BYTE:a=1;break;case nt.SHORT:case nt.UNSIGNED_SHORT:a=2;break;default:a=4}let c=e.itemSize*a;r===nt.ARRAY_BUFFER&&(c=Math.ceil(c/4)*4);let l=Qp(s*c),h=new DataView(new ArrayBuffer(l)),u=0;for(let m=n;m<n+s;m++){for(let y=0;y<e.itemSize;y++){let g;e.itemSize>4?g=e.array[m*e.itemSize+y]:(y===0?g=e.getX(m):y===1?g=e.getY(m):y===2?g=e.getZ(m):y===3&&(g=e.getW(m)),e.normalized===!0&&(g=gt.normalize(g,e.array))),t===nt.FLOAT?h.setFloat32(u,g,!0):t===nt.INT?h.setInt32(u,g,!0):t===nt.UNSIGNED_INT?h.setUint32(u,g,!0):t===nt.SHORT?h.setInt16(u,g,!0):t===nt.UNSIGNED_SHORT?h.setUint16(u,g,!0):t===nt.BYTE?h.setInt8(u,g):t===nt.UNSIGNED_BYTE&&h.setUint8(u,g),u+=a}u%c!==0&&(u+=c-u%c)}let f={buffer:this.processBuffer(h.buffer),byteOffset:this.byteOffset,byteLength:l};return r!==void 0&&(f.target=r),r===nt.ARRAY_BUFFER&&(f.byteStride=c),this.byteOffset+=l,o.bufferViews.push(f),{id:o.bufferViews.length-1,byteLength:0}}processBufferViewImage(e){let t=this,n=t.json;return n.bufferViews||(n.bufferViews=[]),new Promise(function(s){let r=new FileReader;r.readAsArrayBuffer(e),r.onloadend=function(){let o=Cu(r.result),a={buffer:t.processBuffer(o),byteOffset:t.byteOffset,byteLength:o.byteLength};t.byteOffset+=o.byteLength,s(n.bufferViews.push(a)-1)}})}processAccessor(e,t,n,s){let r=this.json,o={1:"SCALAR",2:"VEC2",3:"VEC3",4:"VEC4",9:"MAT3",16:"MAT4"},a;if(e.array.constructor===Float32Array)a=nt.FLOAT;else if(e.array.constructor===Int32Array)a=nt.INT;else if(e.array.constructor===Uint32Array)a=nt.UNSIGNED_INT;else if(e.array.constructor===Int16Array)a=nt.SHORT;else if(e.array.constructor===Uint16Array)a=nt.UNSIGNED_SHORT;else if(e.array.constructor===Int8Array)a=nt.BYTE;else if(e.array.constructor===Uint8Array)a=nt.UNSIGNED_BYTE;else throw new Error("THREE.GLTFExporter: Unsupported bufferAttribute component type: "+e.array.constructor.name);if(n===void 0&&(n=0),(s===void 0||s===1/0)&&(s=e.count),s===0)return null;let c=E1(e,n,s),l;t!==void 0&&(l=e===t.index?nt.ELEMENT_ARRAY_BUFFER:nt.ARRAY_BUFFER);let h=this.processBufferView(e,a,n,s,l),u={bufferView:h.id,byteOffset:h.byteOffset,componentType:a,count:s,max:c.max,min:c.min,type:o[e.itemSize]};return e.normalized===!0&&(u.normalized=!0),r.accessors||(r.accessors=[]),r.accessors.push(u)-1}processImage(e,t,n,s="image/png"){if(e!==null){let r=this,o=r.cache,a=r.json,c=r.options,l=r.pending;o.images.has(e)||o.images.set(e,{});let h=o.images.get(e),u=s+":flipY/"+n.toString();if(h[u]!==void 0)return h[u];a.images||(a.images=[]);let f={mimeType:s},d=Iu();d.width=Math.min(e.width,c.maxTextureSize),d.height=Math.min(e.height,c.maxTextureSize);let m=d.getContext("2d",{willReadFrequently:!0});if(n===!0&&(m.translate(0,d.height),m.scale(1,-1)),e.data!==void 0){t!==on&&console.error("GLTFExporter: Only RGBAFormat is supported.",t),(e.width>c.maxTextureSize||e.height>c.maxTextureSize)&&console.warn("GLTFExporter: Image size is bigger than maxTextureSize",e);let g=new Uint8ClampedArray(e.height*e.width*4);for(let p=0;p<g.length;p+=4)g[p+0]=e.data[p+0],g[p+1]=e.data[p+1],g[p+2]=e.data[p+2],g[p+3]=e.data[p+3];m.putImageData(new ImageData(g,e.width,e.height),0,0)}else if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas)m.drawImage(e,0,0,d.width,d.height);else throw new Error("THREE.GLTFExporter: Invalid image type. Use HTMLImageElement, HTMLCanvasElement, ImageBitmap or OffscreenCanvas.");c.binary===!0?l.push(w1(d,s).then(g=>r.processBufferViewImage(g)).then(g=>{f.bufferView=g})):f.uri=Qs.getDataURL(d,s);let y=a.images.push(f)-1;return h[u]=y,y}else throw new Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.")}processSampler(e){let t=this.json;t.samplers||(t.samplers=[]);let n={magFilter:gn[e.magFilter],minFilter:gn[e.minFilter],wrapS:gn[e.wrapS],wrapT:gn[e.wrapT]};return t.samplers.push(n)-1}async processTextureAsync(e){let n=this.options,s=this.cache,r=this.json;if(s.textures.has(e))return s.textures.get(e);r.textures||(r.textures=[]),e instanceof ki&&(e=await this.decompressTextureAsync(e,n.maxTextureSize));let o=e.userData.mimeType,a=this.processImage(e.image,e.format,e.flipY,o),c={sampler:this.processSampler(e)};o==="image/webp"?(c.extensions=c.extensions||{},c.extensions.EXT_texture_webp={source:a},this.extensionsUsed.EXT_texture_webp=!0,this.extensionsRequired.EXT_texture_webp=!0):c.source=a,e.name&&(c.name=e.name),await this._invokeAllAsync(async function(h){h.writeTexture&&await h.writeTexture(e,c)});let l=r.textures.push(c)-1;return s.textures.set(e,l),l}async processMaterialAsync(e,t){let n=this.cache,s=this.json,r=t!==void 0&&t.hasAttribute("tangent"),o=e.normalMap?e.uuid+":"+r:e.uuid;if(n.materials.has(o))return n.materials.get(o);if(e.isShaderMaterial)return console.warn("GLTFExporter: THREE.ShaderMaterial not supported."),null;s.materials||(s.materials=[]);let a={pbrMetallicRoughness:{}};e.isMeshStandardMaterial!==!0&&e.isMeshBasicMaterial!==!0&&console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");let c=e.color.toArray().concat([e.opacity]);if(wi(c,[1,1,1,1])||(a.pbrMetallicRoughness.baseColorFactor=c),e.isMeshStandardMaterial?(a.pbrMetallicRoughness.metallicFactor=e.metalness,a.pbrMetallicRoughness.roughnessFactor=e.roughness):(a.pbrMetallicRoughness.metallicFactor=0,a.pbrMetallicRoughness.roughnessFactor=1),e.metalnessMap||e.roughnessMap){let h=await this.buildMetalRoughTextureAsync(e.metalnessMap,e.roughnessMap),u={index:await this.processTextureAsync(h),texCoord:h.channel};this.applyTextureTransform(u,h),a.pbrMetallicRoughness.metallicRoughnessTexture=u}if(e.map){let h={index:await this.processTextureAsync(e.map),texCoord:e.map.channel};this.applyTextureTransform(h,e.map),a.pbrMetallicRoughness.baseColorTexture=h}if(e.emissive){let h=e.emissive;if(Math.max(h.r,h.g,h.b)>0&&(a.emissiveFactor=e.emissive.toArray()),e.emissiveMap){let f={index:await this.processTextureAsync(e.emissiveMap),texCoord:e.emissiveMap.channel};this.applyTextureTransform(f,e.emissiveMap),a.emissiveTexture=f}}if(e.normalMap){let h=e.normalScale,u=h.x<0,f=r?h.y<0:h.y>0,d=e.normalMap;(u||f)&&(d=await this.buildNormalMapTextureAsync(e.normalMap,u,f));let m={index:await this.processTextureAsync(d),texCoord:e.normalMap.channel};Math.abs(h.x)!==1&&(m.scale=Math.abs(h.x)),this.applyTextureTransform(m,e.normalMap),a.normalTexture=m}if(e.aoMap){let h={index:await this.processTextureAsync(e.aoMap),texCoord:e.aoMap.channel};e.aoMapIntensity!==1&&(h.strength=e.aoMapIntensity),this.applyTextureTransform(h,e.aoMap),a.occlusionTexture=h}e.transparent?a.alphaMode="BLEND":e.alphaTest>0&&(a.alphaMode="MASK",a.alphaCutoff=e.alphaTest),e.side===jt&&(a.doubleSided=!0),e.name!==""&&(a.name=e.name),this.serializeUserData(e,a),await this._invokeAllAsync(async function(h){h.writeMaterialAsync&&await h.writeMaterialAsync(e,a)});let l=s.materials.push(a)-1;return n.materials.set(o,l),l}async processMeshAsync(e){let t=this.cache,n=this.json,s=[e.geometry.uuid];if(Array.isArray(e.material))for(let _=0,S=e.material.length;_<S;_++)s.push(e.material[_].uuid);else s.push(e.material.uuid);let r=s.join(":");if(t.meshes.has(r))return t.meshes.get(r);let o=e.geometry,a;e.isLineSegments?a=nt.LINES:e.isLineLoop?a=nt.LINE_LOOP:e.isLine?a=nt.LINE_STRIP:e.isPoints?a=nt.POINTS:a=e.material.wireframe?nt.LINES:nt.TRIANGLES;let c={},l={},h=[],u=[],f={uv:"TEXCOORD_0",uv1:"TEXCOORD_1",uv2:"TEXCOORD_2",uv3:"TEXCOORD_3",color:"COLOR_0",skinWeight:"WEIGHTS_0",skinIndex:"JOINTS_0"},d=o.getAttribute("normal");d!==void 0&&!this.isNormalizedNormalAttribute(d)&&(console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."),o.setAttribute("normal",this.createNormalizedNormalAttribute(d)));let m=null;for(let _ in o.attributes){if(_.slice(0,5)==="morph")continue;let S=o.attributes[_];if(_=f[_]||_.toUpperCase(),!/^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(_)&&!_.startsWith("_")&&(_="_"+_),t.attributes.has(this.getUID(S))){l[_]=t.attributes.get(this.getUID(S));continue}m=null;let R=S.array;_==="JOINTS_0"&&!(R instanceof Uint16Array)&&!(R instanceof Uint8Array)?(console.warn('GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.'),m=$i.Utils.toTypedBufferAttribute(S,Uint16Array)):(R instanceof Uint32Array||R instanceof Int32Array)&&!_.startsWith("_")&&(console.warn(`GLTFExporter: Attribute "${_}" converted to type FLOAT.`),m=$i.Utils.toTypedBufferAttribute(S,Float32Array));let x=this.processAccessor(m||S,o);x!==null&&(_.startsWith("_")||this.detectMeshQuantization(_,S),l[_]=x,t.attributes.set(this.getUID(S),x))}if(d!==void 0&&o.setAttribute("normal",d),Object.keys(l).length===0)return null;if(e.morphTargetInfluences!==void 0&&e.morphTargetInfluences.length>0){let _=[],S=[],w={};if(e.morphTargetDictionary!==void 0)for(let R in e.morphTargetDictionary)w[e.morphTargetDictionary[R]]=R;for(let R=0;R<e.morphTargetInfluences.length;++R){let x={},T=!1;for(let N in o.morphAttributes){if(N!=="position"&&N!=="normal"){T||(console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."),T=!0);continue}let C=o.morphAttributes[N][R],D=N.toUpperCase(),F=o.attributes[N];if(t.attributes.has(this.getUID(C,!0))){x[D]=t.attributes.get(this.getUID(C,!0));continue}let W=C.clone();if(!o.morphTargetsRelative)for(let k=0,j=C.count;k<j;k++)for(let X=0;X<C.itemSize;X++)X===0&&W.setX(k,C.getX(k)-F.getX(k)),X===1&&W.setY(k,C.getY(k)-F.getY(k)),X===2&&W.setZ(k,C.getZ(k)-F.getZ(k)),X===3&&W.setW(k,C.getW(k)-F.getW(k));x[D]=this.processAccessor(W,o),t.attributes.set(this.getUID(F,!0),x[D])}u.push(x),_.push(e.morphTargetInfluences[R]),e.morphTargetDictionary!==void 0&&S.push(w[R])}c.weights=_,S.length>0&&(c.extras={},c.extras.targetNames=S)}let y=Array.isArray(e.material);if(y&&o.groups.length===0)return null;let g=!1;if(y&&o.index===null){let _=[];for(let S=0,w=o.attributes.position.count;S<w;S++)_[S]=S;o.setIndex(_),g=!0}let p=y?e.material:[e.material],E=y?o.groups:[{materialIndex:0,start:void 0,count:void 0}];for(let _=0,S=E.length;_<S;_++){let w={mode:a,attributes:l};if(this.serializeUserData(o,w),u.length>0&&(w.targets=u),o.index!==null){let x=this.getUID(o.index);(E[_].start!==void 0||E[_].count!==void 0)&&(x+=":"+E[_].start+":"+E[_].count),t.attributes.has(x)?w.indices=t.attributes.get(x):(w.indices=this.processAccessor(o.index,o,E[_].start,E[_].count),t.attributes.set(x,w.indices)),w.indices===null&&delete w.indices}let R=await this.processMaterialAsync(p[E[_].materialIndex],o);R!==null&&(w.material=R),h.push(w)}g===!0&&o.setIndex(null),c.primitives=h,n.meshes||(n.meshes=[]),await this._invokeAllAsync(function(_){_.writeMesh&&_.writeMesh(e,c)});let M=n.meshes.push(c)-1;return t.meshes.set(r,M),M}detectMeshQuantization(e,t){if(this.extensionsUsed[Ru])return;let n;switch(t.array.constructor){case Int8Array:n="byte";break;case Uint8Array:n="unsigned byte";break;case Int16Array:n="short";break;case Uint16Array:n="unsigned short";break;default:return}t.normalized&&(n+=" normalized");let s=e.split("_",1)[0];Jp[s]&&Jp[s].includes(n)&&(this.extensionsUsed[Ru]=!0,this.extensionsRequired[Ru]=!0)}processCamera(e){let t=this.json;t.cameras||(t.cameras=[]);let n=e.isOrthographicCamera,s={type:n?"orthographic":"perspective"};return n?s.orthographic={xmag:e.right*2,ymag:e.top*2,zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near}:s.perspective={aspectRatio:e.aspect,yfov:gt.degToRad(e.fov),zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near},e.name!==""&&(s.name=e.type),t.cameras.push(s)-1}processAnimation(e,t){let n=this.json,s=this.nodeMap;n.animations||(n.animations=[]),e=$i.Utils.mergeMorphTargetTracks(e.clone(),t);let r=e.tracks,o=[],a=[];for(let l=0;l<r.length;++l){let h=r[l],u=ct.parseTrackName(h.name),f=ct.findNode(t,u.nodeName),d=$p[u.propertyName];if(u.objectName==="bones"&&(f.isSkinnedMesh===!0?f=f.skeleton.getBoneByName(u.objectIndex):f=void 0),!f||!d){console.warn('THREE.GLTFExporter: Could not export animation track "%s".',h.name);continue}let m=1,y=h.values.length/h.times.length;d===$p.morphTargetInfluences&&(y/=f.morphTargetInfluences.length);let g;h.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline===!0?(g="CUBICSPLINE",y/=3):h.getInterpolation()===fs?g="STEP":g="LINEAR",a.push({input:this.processAccessor(new vt(h.times,m)),output:this.processAccessor(new vt(h.values,y)),interpolation:g}),o.push({sampler:a.length-1,target:{node:s.get(f),path:d}})}let c={name:e.name||"clip_"+n.animations.length,samplers:a,channels:o};return this.serializeUserData(e,c),n.animations.push(c),n.animations.length-1}processSkin(e){let t=this.json,n=this.nodeMap,s=t.nodes[n.get(e)],r=e.skeleton;if(r===void 0)return null;let o=e.skeleton.bones[0];if(o===void 0)return null;let a=[],c=new Float32Array(r.bones.length*16),l=new tt;for(let u=0;u<r.bones.length;++u)a.push(n.get(r.bones[u])),l.copy(r.boneInverses[u]),l.multiply(e.bindMatrix).toArray(c,u*16);return t.skins===void 0&&(t.skins=[]),t.skins.push({inverseBindMatrices:this.processAccessor(new vt(c,16)),joints:a,skeleton:n.get(o)}),s.skin=t.skins.length-1}async processNodeAsync(e){let t=this.json,n=this.options,s=this.nodeMap;if(t.nodes||(t.nodes=[]),e.pivot!==null)return await this._processNodeWithPivotAsync(e);let r={};if(n.trs){let a=e.quaternion.toArray(),c=e.position.toArray(),l=e.scale.toArray();wi(a,[0,0,0,1])||(r.rotation=a),wi(c,[0,0,0])||(r.translation=c),wi(l,[1,1,1])||(r.scale=l)}else e.matrixAutoUpdate&&e.updateMatrix(),b1(e.matrix)===!1&&(r.matrix=e.matrix.elements);if(e.name!==""&&(r.name=String(e.name)),this.serializeUserData(e,r),e.isMesh||e.isLine||e.isPoints){let a=await this.processMeshAsync(e);a!==null&&(r.mesh=a)}else e.isCamera&&(r.camera=this.processCamera(e));e.isSkinnedMesh&&this.skins.push(e);let o=t.nodes.push(r)-1;if(s.set(e,o),e.children.length>0){let a=[];for(let c=0,l=e.children.length;c<l;c++){let h=e.children[c];if(h.visible||n.onlyVisible===!1){let u=await this.processNodeAsync(h);u!==null&&a.push(u)}}a.length>0&&(r.children=a)}return await this._invokeAllAsync(function(a){a.writeNode&&a.writeNode(e,r)}),o}async _processNodeWithPivotAsync(e){let t=this.json,n=this.options,s=this.nodeMap,r=e.pivot,o={},a=e.quaternion.toArray(),c=[e.position.x+r.x,e.position.y+r.y,e.position.z+r.z],l=e.scale.toArray();wi(a,[0,0,0,1])||(o.rotation=a),wi(c,[0,0,0])||(o.translation=c),wi(l,[1,1,1])||(o.scale=l),o.extras={pivot:r.toArray()},e.name!==""&&(o.name=String(e.name)),this.serializeUserData(e,o);let h=t.nodes.push(o)-1;s.set(e,h);let u={},f=[-r.x,-r.y,-r.z];if(wi(f,[0,0,0])||(u.translation=f),e.isMesh||e.isLine||e.isPoints){let y=await this.processMeshAsync(e);y!==null&&(u.mesh=y)}else e.isCamera&&(u.camera=this.processCamera(e));e.isSkinnedMesh&&this.skins.push(e);let m=[t.nodes.push(u)-1];if(e.children.length>0){let y=[];for(let g=0,p=e.children.length;g<p;g++){let E=e.children[g];if(E.visible||n.onlyVisible===!1){let M=await this.processNodeAsync(E);M!==null&&y.push(M)}}y.length>0&&(u.children=y)}return o.children=m,await this._invokeAllAsync(function(y){y.writeNode&&y.writeNode(e,o)}),h}async processSceneAsync(e){let t=this.json,n=this.options;t.scenes||(t.scenes=[],t.scene=0);let s={};e.name!==""&&(s.name=e.name),t.scenes.push(s);let r=[];for(let o=0,a=e.children.length;o<a;o++){let c=e.children[o];if(c.visible||n.onlyVisible===!1){let l=await this.processNodeAsync(c);l!==null&&r.push(l)}}r.length>0&&(s.nodes=r),this.serializeUserData(e,s)}async processObjectsAsync(e){let t=new Kn;t.name="AuxScene";for(let n=0;n<e.length;n++)t.children.push(e[n]);await this.processSceneAsync(t)}async processInputAsync(e){let t=this.options;e=e instanceof Array?e:[e],await this._invokeAllAsync(function(s){s.beforeParse&&s.beforeParse(e)});let n=[];for(let s=0;s<e.length;s++)e[s]instanceof Kn?await this.processSceneAsync(e[s]):n.push(e[s]);n.length>0&&await this.processObjectsAsync(n);for(let s=0;s<this.skins.length;++s)this.processSkin(this.skins[s]);if(e.length===1)for(let s=0;s<t.animations.length;++s)this.processAnimation(t.animations[s],e[0]);else for(let s=0;s<e.length;s++){let r=t.animations[s]||[];for(let o=0;o<r.length;++o)this.processAnimation(r[o],e[s])}await this._invokeAllAsync(function(s){s.afterParse&&s.afterParse(e)})}async _invokeAllAsync(e){for(let t=0,n=this.plugins.length;t<n;t++)await e(this.plugins[t])}},Lu=class{constructor(e){this.writer=e,this.name="KHR_lights_punctual"}writeNode(e,t){if(!e.isLight)return;if(!e.isDirectionalLight&&!e.isPointLight&&!e.isSpotLight){console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.",e);return}let n=this.writer,s=n.json,r=n.extensionsUsed,o={};e.name&&(o.name=e.name),o.color=e.color.toArray(),o.intensity=e.intensity,e.isDirectionalLight?o.type="directional":e.isPointLight?(o.type="point",e.distance>0&&(o.range=e.distance)):e.isSpotLight&&(o.type="spot",e.distance>0&&(o.range=e.distance),o.spot={},o.spot.innerConeAngle=(1-e.penumbra)*e.angle,o.spot.outerConeAngle=e.angle),e.decay!==void 0&&e.decay!==2&&console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."),e.target&&(e.target.parent!==e||e.target.position.x!==0||e.target.position.y!==0||e.target.position.z!==-1)&&console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."),r[this.name]||(s.extensions=s.extensions||{},s.extensions[this.name]={lights:[]},r[this.name]=!0);let a=s.extensions[this.name].lights;a.push(o),t.extensions=t.extensions||{},t.extensions[this.name]={light:a.length-1}}},Nu=class{constructor(e){this.writer=e,this.name="KHR_materials_unlit"}async writeMaterialAsync(e,t){if(!e.isMeshBasicMaterial)return;let s=this.writer.extensionsUsed;t.extensions=t.extensions||{},t.extensions[this.name]={},s[this.name]=!0,t.pbrMetallicRoughness.metallicFactor=0,t.pbrMetallicRoughness.roughnessFactor=.9}},Du=class{constructor(e){this.writer=e,this.name="KHR_materials_clearcoat"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.clearcoat===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.clearcoatFactor=e.clearcoat,e.clearcoatMap){let o={index:await n.processTextureAsync(e.clearcoatMap),texCoord:e.clearcoatMap.channel};n.applyTextureTransform(o,e.clearcoatMap),r.clearcoatTexture=o}if(r.clearcoatRoughnessFactor=e.clearcoatRoughness,e.clearcoatRoughnessMap){let o={index:await n.processTextureAsync(e.clearcoatRoughnessMap),texCoord:e.clearcoatRoughnessMap.channel};n.applyTextureTransform(o,e.clearcoatRoughnessMap),r.clearcoatRoughnessTexture=o}if(e.clearcoatNormalMap){let o={index:await n.processTextureAsync(e.clearcoatNormalMap),texCoord:e.clearcoatNormalMap.channel};e.clearcoatNormalScale.x!==1&&(o.scale=e.clearcoatNormalScale.x),n.applyTextureTransform(o,e.clearcoatNormalMap),r.clearcoatNormalTexture=o}t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Uu=class{constructor(e){this.writer=e,this.name="KHR_materials_dispersion"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.dispersion===0)return;let s=this.writer.extensionsUsed,r={};r.dispersion=e.dispersion,t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Ou=class{constructor(e){this.writer=e,this.name="KHR_materials_iridescence"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.iridescence===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.iridescenceFactor=e.iridescence,e.iridescenceMap){let o={index:await n.processTextureAsync(e.iridescenceMap),texCoord:e.iridescenceMap.channel};n.applyTextureTransform(o,e.iridescenceMap),r.iridescenceTexture=o}if(r.iridescenceIor=e.iridescenceIOR,r.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],r.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1],e.iridescenceThicknessMap){let o={index:await n.processTextureAsync(e.iridescenceThicknessMap),texCoord:e.iridescenceThicknessMap.channel};n.applyTextureTransform(o,e.iridescenceThicknessMap),r.iridescenceThicknessTexture=o}t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Fu=class{constructor(e){this.writer=e,this.name="KHR_materials_transmission"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.transmissionFactor=e.transmission,e.transmissionMap){let o={index:await n.processTextureAsync(e.transmissionMap),texCoord:e.transmissionMap.channel};n.applyTextureTransform(o,e.transmissionMap),r.transmissionTexture=o}t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Bu=class{constructor(e){this.writer=e,this.name="KHR_materials_volume"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.thicknessFactor=e.thickness,e.thicknessMap){let o={index:await n.processTextureAsync(e.thicknessMap),texCoord:e.thicknessMap.channel};n.applyTextureTransform(o,e.thicknessMap),r.thicknessTexture=o}e.attenuationDistance!==1/0&&(r.attenuationDistance=e.attenuationDistance),r.attenuationColor=e.attenuationColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},zu=class{constructor(e){this.writer=e,this.name="KHR_materials_ior"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.ior===1.5)return;let s=this.writer.extensionsUsed,r={};r.ior=e.ior,t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},ku=class{constructor(e){this.writer=e,this.name="KHR_materials_specular"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.specularIntensity===1&&e.specularColor.equals(x1)&&!e.specularIntensityMap&&!e.specularColorMap)return;let n=this.writer,s=n.extensionsUsed,r={};if(e.specularIntensityMap){let o={index:await n.processTextureAsync(e.specularIntensityMap),texCoord:e.specularIntensityMap.channel};n.applyTextureTransform(o,e.specularIntensityMap),r.specularTexture=o}if(e.specularColorMap){let o={index:await n.processTextureAsync(e.specularColorMap),texCoord:e.specularColorMap.channel};n.applyTextureTransform(o,e.specularColorMap),r.specularColorTexture=o}r.specularFactor=e.specularIntensity,r.specularColorFactor=e.specularColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Vu=class{constructor(e){this.writer=e,this.name="KHR_materials_sheen"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.sheen==0)return;let n=this.writer,s=n.extensionsUsed,r={};if(e.sheenRoughnessMap){let o={index:await n.processTextureAsync(e.sheenRoughnessMap),texCoord:e.sheenRoughnessMap.channel};n.applyTextureTransform(o,e.sheenRoughnessMap),r.sheenRoughnessTexture=o}if(e.sheenColorMap){let o={index:await n.processTextureAsync(e.sheenColorMap),texCoord:e.sheenColorMap.channel};n.applyTextureTransform(o,e.sheenColorMap),r.sheenColorTexture=o}r.sheenRoughnessFactor=e.sheenRoughness,r.sheenColorFactor=e.sheenColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Hu=class{constructor(e){this.writer=e,this.name="KHR_materials_anisotropy"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.anisotropy==0)return;let n=this.writer,s=n.extensionsUsed,r={};if(e.anisotropyMap){let o={index:await n.processTextureAsync(e.anisotropyMap)};n.applyTextureTransform(o,e.anisotropyMap),r.anisotropyTexture=o}r.anisotropyStrength=e.anisotropy,r.anisotropyRotation=e.anisotropyRotation,t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Gu=class{constructor(e){this.writer=e,this.name="KHR_materials_emissive_strength"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.emissiveIntensity===1)return;let s=this.writer.extensionsUsed,r={};r.emissiveStrength=e.emissiveIntensity,t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Wu=class{constructor(e){this.writer=e,this.name="EXT_materials_bump"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.bumpScale===1&&!e.bumpMap)return;let n=this.writer,s=n.extensionsUsed,r={};if(e.bumpMap){let o={index:await n.processTextureAsync(e.bumpMap),texCoord:e.bumpMap.channel};n.applyTextureTransform(o,e.bumpMap),r.bumpTexture=o}r.bumpFactor=e.bumpScale,t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Xu=class{constructor(e){this.writer=e,this.name="EXT_mesh_gpu_instancing"}writeNode(e,t){if(!e.isInstancedMesh)return;let n=this.writer,s=e,r=new Float32Array(s.count*3),o=new Float32Array(s.count*4),a=new Float32Array(s.count*3),c=new tt,l=new U,h=new Mn,u=new U;for(let d=0;d<s.count;d++)s.getMatrixAt(d,c),c.decompose(l,h,u),l.toArray(r,d*3),h.toArray(o,d*4),u.toArray(a,d*3);let f={TRANSLATION:n.processAccessor(new vt(r,3)),ROTATION:n.processAccessor(new vt(o,4)),SCALE:n.processAccessor(new vt(a,3))};s.instanceColor&&(f._COLOR_0=n.processAccessor(s.instanceColor)),t.extensions=t.extensions||{},t.extensions[this.name]={attributes:f},n.extensionsUsed[this.name]=!0,n.extensionsRequired[this.name]=!0}};$i.Utils={insertKeyframe:function(i,e){let n=i.getValueSize(),s=new i.TimeBufferType(i.times.length+1),r=new i.ValueBufferType(i.values.length+n),o=i.createInterpolant(new i.ValueBufferType(n)),a;if(i.times.length===0){s[0]=e;for(let c=0;c<n;c++)r[c]=0;a=0}else if(e<i.times[0]){if(Math.abs(i.times[0]-e)<.001)return 0;s[0]=e,s.set(i.times,1),r.set(o.evaluate(e),0),r.set(i.values,n),a=0}else if(e>i.times[i.times.length-1]){if(Math.abs(i.times[i.times.length-1]-e)<.001)return i.times.length-1;s[s.length-1]=e,s.set(i.times,0),r.set(i.values,0),r.set(o.evaluate(e),i.values.length),a=s.length-1}else for(let c=0;c<i.times.length;c++){if(Math.abs(i.times[c]-e)<.001)return c;if(i.times[c]<e&&i.times[c+1]>e){s.set(i.times.slice(0,c+1),0),s[c+1]=e,s.set(i.times.slice(c+1),c+2),r.set(i.values.slice(0,(c+1)*n),0),r.set(o.evaluate(e),(c+1)*n),r.set(i.values.slice((c+1)*n),(c+2)*n),a=c+1;break}}return i.times=s,i.values=r,a},mergeMorphTargetTracks:function(i,e){let t=[],n={},s=i.tracks;for(let r=0;r<s.length;++r){let o=s[r],a=ct.parseTrackName(o.name),c=ct.findNode(e,a.nodeName);if(a.propertyName!=="morphTargetInfluences"||a.propertyIndex===void 0){t.push(o);continue}if(o.createInterpolant!==o.InterpolantFactoryMethodDiscrete&&o.createInterpolant!==o.InterpolantFactoryMethodLinear){if(o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)throw new Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead."),o=o.clone(),o.setInterpolation(Js)}let l=c.morphTargetInfluences.length,h=c.morphTargetDictionary[a.propertyIndex];if(h===void 0)throw new Error("THREE.GLTFExporter: Morph target name not found: "+a.propertyIndex);let u;if(n[c.uuid]===void 0){u=o.clone();let d=new u.ValueBufferType(l*u.times.length);for(let m=0;m<u.times.length;m++)d[m*l+h]=u.values[m];u.name=(a.nodeName||"")+".morphTargetInfluences",u.values=d,n[c.uuid]=u,t.push(u);continue}let f=o.createInterpolant(new o.ValueBufferType(1));u=n[c.uuid];for(let d=0;d<u.times.length;d++)u.values[d*l+h]=f.evaluate(u.times[d]);for(let d=0;d<o.times.length;d++){let m=this.insertKeyframe(u,o.times[d]);u.values[m*l+h]=o.values[d]}}return i.tracks=t,i},toTypedBufferAttribute:function(i,e){let t=new vt(new e(i.count*i.itemSize),i.itemSize,!1);if(!i.normalized&&!i.isInterleavedBufferAttribute)return t.array.set(i.array),t;for(let n=0,s=i.count;n<s;n++)for(let r=0;r<i.itemSize;r++)t.setComponent(n,r,i.getComponent(n,r));return t}};var Wo=2.4000000000000004,vs=3,en=1.2,qu=vs+en,al=vs+en*.68;function em(i){return i<vs?i:i<qu?3-1e-6:i-en}var Ms=3,Un=Ms+.04,cl=Un+en,tm=.42,Ti=2.1,Ki=Un+Ti,On=Ki+.08,Fn=.9,Ai=On+Fn,Ss=Ai+.08,Mr=.84,ll=Ss+Mr,Bn=ll+.05;var uE=Ai+.01,hl=i=>gt.clamp(i,0,1),si=i=>{let e=hl(i);return e*e*(3-2*e)},Ju=i=>si(i/.8),T1=new Ve(16777215),nm=new Ve(9476257),Zu;function im(i,e=0){let t={phase:i<Ms?"guide":i<Un?"point":i<Ki?"outline":i<On?"fill":i<Ai?"extrude":i<Ss?"white":i<ll?"color":"solid",guideProgress:si(i/Wo),guideOpacity:si(i/(3*.28))*(1-si((i-On)/(Fn*.7))),stroke:hl((i-Un)/Ti),fill:si((i-Ki)/.08),extrusion:si((i-On)/Fn),tint:si((i-Ss)/Mr),flatness:0,complete:i>=ll,lineOpacity:1-si((i-(On+Fn/6))/(Fn*5/6))};return e>0&&i>=Ai&&(t.phase=e>=1?"flat":"flattening",t.flatness=Ju(e),t.extrusion=1-t.flatness,t.fill=1,t.lineOpacity=0),t}function sm(i){let{minX:e,maxX:t,minZ:n,maxZ:s}=i;return[{a:[e,n],b:[t,n]},{a:[t,s],b:[e,s]},{a:[e,s],b:[e,n]},{a:[t,n],b:[t,s]}]}function A1(i,e){let t=sm(i),n=new Pt;n.setAttribute("position",new vt(new Float32Array(24),3).setUsage(gr));let s=new zi({color:11581375,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1}),r=new or(n,s);if(r.name="SVG construction guide",r.renderOrder=2,r.frustumCulled=!1,r.userData={segments:t,mode:e,svgBounds:i,bounds:i,origins:t.map(({a:o})=>o),exits:t.map(({b:o})=>o)},e==="viewport"){let o=new or(n.clone(),new zi({color:16727100,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1}));o.name="Red guide sweep",o.renderOrder=3,o.frustumCulled=!1,o.visible=!1,r.add(o),r.userData.sweep=o}return r}function ul(i,e){let t=i.guide.userData,n=t.svgBounds,s=e?Math.min(1,(e.stepX/2-.1)/Math.max(Math.abs(n.minX),Math.abs(n.maxX)),(e.stepZ/2-.1)/Math.max(Math.abs(n.minZ),Math.abs(n.maxZ))):1;t.bounds=Object.fromEntries(Object.entries(n).map(([r,o])=>[r,o*s])),t.segments=sm(t.bounds),t.origins=t.segments.map(({a:r})=>r),t.exits=t.segments.map(({b:r})=>r)}function $u(i,e,t=0){let n=i.guide;if(n.userData.mode!=="viewport")return;i.group.updateWorldMatrix(!0,!1);let s=i.group.localToWorld(new U(0,.008,0)).y,r=new Xt(new U(0,1,0),-s),o=new Ei,a=[];for(let l of[-1.06,1.06])for(let h of[-1.06,1.06+t]){o.setFromCamera(new ue(l,h),e);let u=o.ray.intersectPlane(r,new U);u&&a.push(i.group.worldToLocal(u))}if(a.length!==4)return;let c=new wt().setFromPoints(a);n.userData.origins=n.userData.segments.map(({a:l,b:h})=>l[0]!==h[0]?[h[0]>l[0]?c.min.x:c.max.x,l[1]]:[l[0],h[1]>l[1]?c.min.z:c.max.z]),n.userData.exits=n.userData.segments.map(({a:l,b:h})=>l[0]!==h[0]?[h[0]>l[0]?c.max.x:c.min.x,l[1]]:[l[0],h[1]>l[1]?c.max.z:c.min.z]),n.userData.originScreens=n.userData.origins.map(([l,h])=>i.group.localToWorld(new U(l,.008,h)).project(e).toArray().slice(0,2)),n.userData.exitScreens=n.userData.exits.map(([l,h])=>i.group.localToWorld(new U(l,.008,h)).project(e).toArray().slice(0,2))}function R1(i,e){if(i.visible=e.guideOpacity>0,i.material.opacity=e.guideOpacity,!i.visible)return;let t=i.geometry.attributes.position,n=e.guideProgress,s=i.userData.sweep,r=s?.geometry.attributes.position;s&&(s.visible=n>0&&n<1,s.material.opacity=e.guideOpacity),i.userData.segments.forEach(({a:o,b:a},c)=>{let l=n;if(s){let h=i.userData.origins[c],u=i.userData.exits[c],f=Math.hypot(a[0]-o[0],a[1]-o[1]),d=(a[0]-o[0])/f,m=(a[1]-o[1])/f,y=Math.hypot(u[0]-h[0],u[1]-h[1]),g=y*si(n/.52),p=y*si((n-.58)/.42);r.setXYZ(c*2,h[0]+d*p,.0085,h[1]+m*p),r.setXYZ(c*2+1,h[0]+d*g,.0085,h[1]+m*g);let E=(o[0]-h[0])*d+(o[1]-h[1])*m;l=hl((p-E)/f)}t.setXYZ(c*2,o[0],.008,o[1]),t.setXYZ(c*2+1,gt.lerp(o[0],a[0],l),.008,gt.lerp(o[1],a[1],l))}),t.needsUpdate=!0,r&&(r.needsUpdate=!0)}function fl(i){let e=i.guide.userData.sweep;return{enabled:!0,mode:i.guide.userData.mode,bounds:i.guide.userData.bounds,origins:i.guide.userData.origins,originScreens:i.guide.userData.originScreens,color:i.guide.material.color.getHexString(),visible:i.group.visible&&i.guide.visible,opacity:i.guide.material.opacity,sweep:e?{visible:i.group.visible&&i.guide.visible&&e.visible,color:e.material.color.getHexString(),points:Array.from(e.geometry.attributes.position.array),exits:i.guide.userData.exits,exitScreens:i.guide.userData.exitScreens}:null,progress:i.state.guideProgress,points:Array.from(i.guide.geometry.attributes.position.array)}}function dl(i,e,t="edge"){let n=new Rn;n.name=i.icon.id+"-drawing",n.position.copy(i.mesh.position),n.rotation.copy(i.mesh.rotation);let s=nm.clone(),r=new Ve(i.color),o=A1(i.caster.svgBounds,t);o.visible=!1,n.add(o);let a=new zi({color:s,transparent:!0,opacity:1,depthWrite:!1,toneMapped:!1}),c=[],l=0;for(let[f,d]of i.caster.contours.entries()){if(e){let p=e.lines[f],E=p.geometry.clone();E.setDrawRange(0,0);let M=new ds(E,a);M.renderOrder=3,M.userData={offset:l,count:p.userData.count},l+=p.userData.count,n.add(M),c.push(M);continue}let m=[];for(let p=0;p<d.points.length;p++){let E=d.points[p],M=d.points[(p+1)%d.points.length],_=Math.max(1,Math.ceil(Math.hypot(M[0]-E[0],M[1]-E[1])/.006));for(let S=0;S<_;S++)m.push(new U(gt.lerp(E[0],M[0],S/_),.012,gt.lerp(E[1],M[1],S/_)))}m.push(m[0].clone());let y=new Pt().setFromPoints(m);y.setDrawRange(0,0);let g=new ds(y,a);g.renderOrder=3,g.userData={offset:l,count:m.length},l+=m.length,n.add(g),c.push(g)}let h=new St(e?.dot.geometry||new vo(.018,16,12),new sn({color:s,transparent:!0,depthWrite:!1,depthTest:!1,toneMapped:!1}));if(h.position.fromBufferAttribute(c[0].geometry.attributes.position,0),h.renderOrder=4,n.add(h),!Zu){let f=document.createElement("canvas");f.width=f.height=64;let d=f.getContext("2d"),m=d.createRadialGradient(32,32,0,32,32,32);m.addColorStop(0,"rgba(255,255,255,.5)"),m.addColorStop(.3,"rgba(255,255,255,.18)"),m.addColorStop(1,"rgba(255,255,255,0)"),d.fillStyle=m,d.fillRect(0,0,64,64),Zu=new Cn(f)}let u=new oo(new nr({map:Zu,color:s,transparent:!0,depthWrite:!1,depthTest:!1}));return u.position.copy(h.position),u.scale.setScalar(.18),n.add(u),{group:n,guide:o,lines:c,dot:h,halo:u,total:l,targetColor:r,active:!1,drawing:!1,sparkAt:-1/0,state:im(0)}}function Ku(i,e,t,n,s=0){let r=i.reveal,o=r.guide.userData.mode==="viewport",a=o&&e>=vs&&e<qu;if(o&&(e=em(e)),r.group.visible=t,!t)return r.active=!1,r.drawing=!1,r.state;r.active=!0;let c=im(e,s);r.state=c,a&&(c.phase="measure"),R1(r.guide,c);for(let f of r.lines){let{offset:d,count:m}=f.userData;f.visible=c.lineOpacity>0,f.geometry.setDrawRange(0,gt.clamp(Math.floor(c.stroke*r.total-d),0,m)),f.position.y=i.caster.height*n*c.extrusion}r.lines[0].material.opacity=c.lineOpacity,r.lines[0].material.color.lerpColors(nm,r.targetColor,c.tint),e>=Ms&&!r.drawing&&(r.sparkAt=performance.now(),r.drawing=!0),e<Ms&&(r.drawing=!1);let l=(performance.now()-r.sparkAt)/300,h=Math.sin(hl(l)*Math.PI),u=c.stroke===0?1:Math.max(0,1-l);return r.dot.visible=r.halo.visible=e>=Ms&&e<Ms+.18&&u>0,r.dot.material.opacity=u,r.dot.scale.setScalar(1+h*.8),r.halo.material.opacity=u*(.25+h*.7),c}function rm(i,e,t,n,s,r=0){let o=Ku(i,e,t,n,r);i.mesh.visible=t&&o.fill>0,i.shadow.visible=t&&o.extrusion>0,t&&(i.mesh.scale.y=Math.max(.001,o.extrusion)*n,i.mesh.material.opacity=o.fill,i.mesh.material.depthWrite=o.fill>.5,i.mesh.material.color.lerpColors(T1,i.reveal.targetColor,o.tint),i.mesh.material.emissive.copy(i.mesh.material.color),i.shadow.material.opacity=s,i.shadow.material.userData.shadowHeight.value=o.extrusion)}function ji(i){let e=i>>>0;return()=>(e=Math.imul(e,1664525)+1013904223>>>0,e/4294967296)}var am=.22,om=5,pl=class{constructor(){this.cells=new Map,this.maxRadius=0}add(e){let t=Math.floor(e.x/4)+":"+Math.floor(e.z/4);this.cells.has(t)||this.cells.set(t,[]),this.cells.get(t).push(e),this.maxRadius=Math.max(this.maxRadius,e.radius)}accepts(e,t=am){let n=Math.floor(e.x/4),s=Math.floor(e.z/4),r=Math.ceil((e.radius+this.maxRadius+Math.max(t,om))/4);for(let o=n-r;o<=n+r;o++)for(let a=s-r;a<=s+r;a++)for(let c of this.cells.get(o+":"+a)||[]){let l=e.sourceIndex!==void 0&&e.sourceIndex===c.sourceIndex;if(Math.hypot(e.x-c.x,e.z-c.z)<e.radius+c.radius+(l?om:t))return!1}return!0}};function cm(i,e){let t=ji(90317),n=new pl,s=[],r=i?7.2:14,o=i?15:9,a={x:-3.5,z:i?10:5.7,radius:e[0]};s.push(a),n.add(a);for(let c=1;c<3;c++){let l=s[c-1],h=c===1?-.23:-.4,u=l.radius+e[c]+.5,f={x:l.x+Math.cos(h)*u,z:l.z+Math.sin(h)*u,radius:e[c]};s.push(f),n.add(f)}for(let c=3;c<33;c++){let l;for(let h=0;h<2e4;h++){let u=t()*Math.PI*2,f=Math.sqrt(t()),d=1+Math.floor(h/5e3)*.1,m={x:Math.cos(u)*r*f*d,z:Math.sin(u)*o*f*d,radius:e[c]};if(n.accepts(m)){l=m;break}}if(!l)throw new Error("Could not place icon "+c+" without overlap");s.push(l),n.add(l)}return s.map(c=>({...c,height:1+1.1*Math.exp(-2.4*((c.x/r)**2+(c.z/o)**2))}))}function lm(i,e){let t=ji(192807),n=new pl,s=[],r=e.map((l,h)=>({x:l.mesh.position.x,z:l.mesh.position.z,radius:l.radius,sourceIndex:h}));r.forEach(l=>n.add(l));let o=[],a=0;function c(){if(a===o.length){o=e.map((l,h)=>h),a=0;for(let l=o.length-1;l>0;l--){let h=Math.floor(t()*(l+1));[o[l],o[h]]=[o[h],o[l]]}}return o[a]}for(;r.length;){let l=Math.floor(t()*r.length),h=r[l],u=!1,f=c(),d=e[f].radius;for(let m=0;m<36;m++){let y=t()*Math.PI*2,g=(h.radius+d+am)*(1+t()),p={x:h.x+Math.cos(y)*g,z:h.z+Math.sin(y)*g,radius:d,sourceIndex:f};if(!(p.x<i.left||p.x>i.right||p.z<i.back||p.z>i.front||!n.accepts(p))){p.rotation=0,n.add(p),r.push(p),s.push(p),a++,u=!0;break}}u||(r[l]=r[r.length-1],r.pop())}return s}var Sr=3,Qi=.8,hm=Bn+en+.45,xn=[{start:0,tempo:1,measureDuration:en,colorExtra:Qi,duration:Bn+en+Qi},{start:hm,tempo:1,colorExtra:Qi,duration:Bn+Qi},{start:hm+Ai-.02,tempo:1,colorExtra:Qi,duration:Bn+Qi}],zn=xn[2].start+Ai,ju=zn-.08,dm=7.2,ml=zn+dm+.52*Bn/.7+.27,kn=ml-1.05,es=ml+1.55,ri=es+.5,C1=.48,gl=2+Qi,Qu=4.2,um=7,fm=4,ef=kn+.45+Qi,I1=[[Un,Ti,"outlineExtra"],[On,Fn,"extrusionExtra"],[Ss,Mr,"colorExtra"]];function pm(i){return i<xn[1].start?0:i<xn[2].start?1:2}function xl(i){return Math.max(0,Math.min(1,(i-ml)/(es-ml)))}function mm(i){return xn[i]}function tf(i,e,t){let n=Math.max(0,Math.min(1,(i-e)/Math.max(.001,t-e))),s=Math.round(n*(um-1)),r=s/(um-1),o=(.76-r*.24)/.7,a=ju+dm*r,c=(On-Ki+(Ss-Ai))*o,l=(kn-.65+.4*r-a-c)*C1,h=Math.round(r*(fm-1)),u=h/(fm-1),d=ef-gl-Qu*(1-u)-a-c-l-Ti*o,m=l-Fn*o,y=gl-Mr*o;return{start:a-Un*o,tempo:o,waveStep:s,colorStep:h,outlineExtra:d,extrusionExtra:m,colorExtra:y,duration:o*Bn+d+m+y}}function br(i,e){let t=Math.max(0,i-e.start),n=e.tempo||e.duration/Bn,s=e.measureDuration||0;for(let[r,o,a]of I1){let c=e[a]||0;if(!c)continue;let l=r*n+s,h=o*n+c;if(t<=l)break;if(t<l+h)return r+s/n+(t-l)/h*o;t-=c}return t/n}function gm(i,e="grid",t=[]){if(e==="scattered")return cm(i,t);let n=i?[3,4,4,4,4,4,4,3,3]:[3,7,9,9,5],s=[];n.forEach((l,h)=>{for(let u=0;u<l;u++)s.push({x:(u-Math.floor(l/2))*(i?3.15:3.3),z:((n.length-1)/2-h)*(i?3.05:2.85)})});let r=s.splice(0,Sr),o=ji(90317);for(let l=s.length-1;l>0;l--){let h=Math.floor(o()*(l+1));[s[l],s[h]]=[s[h],s[l]]}let a=Math.max(...[...r,...s].map(l=>Math.abs(l.x)))||1,c=Math.max(...[...r,...s].map(l=>Math.abs(l.z)))||1;return[...r,...s].map(l=>({...l,height:1+1.1*Math.exp(-2.4*((l.x/a)**2+(l.z/c)**2))}))}function _l(i){return{stepX:i?3.15:3.3,stepZ:i?3.05:2.85,originZ:i?12.2:5.7,offset:()=>0}}var oi=[-10,30,16],yl=4,nf=16,an=256;function sf(i,e,t,n=0){let s=document.createElement("canvas");s.width=s.height=yl*an;let r=s.getContext("2d"),o=document.createElement("canvas");o.width=o.height=an;let a=o.getContext("2d"),c=document.createElement("canvas");c.width=c.height=an;let l=c.getContext("2d"),h=an/e,u=Math.cos(n),f=Math.sin(n),d=(M,_,S,w,R)=>[(M-S*(u*w-f*R)/oi[1])*h+an/2,(_-S*(f*w+u*R)/oi[1])*h+an/2];function m(M,_,S=!0){let w=0;for(let R=0;R<_.length;R++){let x=_[R],T=_[(R+1)%_.length];w+=x[0]*T[1]-T[0]*x[1]}w>0!==S&&_.reverse(),M.moveTo(..._[0]);for(let R=1;R<_.length;R++)M.lineTo(..._[R]);M.closePath()}function y(M,_,S){let w=new Path2D;for(let R of i.contours){let x=R.points.map(([N,C])=>d(N,C,.003,_,S)),T=R.points.map(([N,C])=>d(N,C,M+.003,_,S));m(w,[...x],!R.hole),m(w,[...T],!R.hole);for(let N=0;N<x.length;N++){let C=(N+1)%x.length;m(w,[x[N],x[C],T[C],T[N]])}}return w}let g=y(0,oi[0],oi[2]),p=Array.from({length:12},(M,_)=>{let S=11*Math.sqrt((_+.5)/12),w=_*2.39996323;return[oi[0]+Math.cos(w)*S,oi[2]+Math.sin(w)*S]});for(let M=0;M<nf;M++){let _=i.height*t*M/(nf-1);l.clearRect(0,0,an,an),l.globalCompositeOperation="lighter",l.globalAlpha=.72/p.length,l.filter=`blur(${(.018+_*.018)*h}px)`;for(let[S,w]of p)a.clearRect(0,0,an,an),a.fillStyle="#ffffff",a.fill(y(_,S,w)),l.drawImage(o,0,0);a.clearRect(0,0,an,an),a.fill(g),l.globalCompositeOperation="source-over",l.globalAlpha=.35,l.filter=`blur(${.035*h}px)`,l.drawImage(o,0,0),r.drawImage(c,M%yl*an,(yl-1-Math.floor(M/yl))*an)}let E=new Cn(s);return E.colorSpace=yt,E.generateMipmaps=!1,E.minFilter=E.magFilter=Ct,E.userData={style:"height-aware-area-light",frames:nf,light:oi},E}function vl(i=null,e=!1){let t=new sn({map:i,transparent:!0,opacity:1,depthWrite:!1,color:13225686,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4}),n={value:0};return t.userData.shadowHeight=n,t.onBeforeCompile=s=>{s.uniforms.shadowHeight=n,s.vertexShader=`varying float vShadowHeight;
${e?"attribute float instanceReveal;":"uniform float shadowHeight;"}
`+s.vertexShader,s.vertexShader=s.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vShadowHeight = ${e?"instanceReveal":"shadowHeight"};`),s.fragmentShader=`varying float vShadowHeight;
      vec2 shadowFrameUv(vec2 uv, float frame) {
        vec2 cell = vec2(mod(frame, 4.0), floor(frame / 4.0));
        return (cell + clamp(uv, vec2(.5 / 256.0), vec2(1.0 - .5 / 256.0))) / 4.0;
      }
`+s.fragmentShader,s.fragmentShader=s.fragmentShader.replace("#include <map_fragment>",`
      float frame = clamp(vShadowHeight, 0.0, 1.0) * 15.0;
      float lower = floor(frame);
      float alpha = mix(texture2D(map, shadowFrameUv(vMapUv, lower)).a,
        texture2D(map, shadowFrameUv(vMapUv, min(lower + 1.0, 15.0))).a, fract(frame));
      diffuseColor.a *= alpha * smoothstep(0.0, .18, vShadowHeight);
    `)},t.customProgramCacheKey=()=>"height-aware-ground-shadow-"+e,t}var rf={value:0};function Ml(i){let e=i.onBeforeCompile,t=i.customProgramCacheKey();return i.onBeforeCompile=function(n,s){e.call(this,n,s),n.uniforms.flatFinish=rf,n.fragmentShader=`uniform float flatFinish;
`+n.fragmentShader,n.fragmentShader=n.fragmentShader.replace("#include <opaque_fragment>",`outgoingLight=mix(outgoingLight,diffuseColor.rgb,flatFinish);
#include <opaque_fragment>`)},i.customProgramCacheKey=()=>t+"-flat-color-finish",i}function P1(i,e){let t=i.clone();return t.transparent=!0,t.opacity=1,t.color.set(e),t.emissive.set(e),t.onBeforeCompile=n=>{n.uniforms.neutralEmissive={value:new Ve(16777215).multiplyScalar(t.emissiveIntensity)},n.vertexShader=`attribute float instanceReveal; attribute float instanceTint; varying float vReveal; varying float vTint;
`+n.vertexShader,n.vertexShader=n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vReveal=instanceReveal; vTint=instanceTint;`),n.fragmentShader=`varying float vReveal; varying float vTint; uniform vec3 neutralEmissive;
`+n.fragmentShader,n.fragmentShader=n.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
diffuseColor.rgb=mix(vec3(1.0),diffuseColor.rgb,vTint); diffuseColor.a *= vReveal;`),n.fragmentShader=n.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
totalEmissiveRadiance=mix(neutralEmissive,totalEmissiveRadiance,vTint);`)},t.customProgramCacheKey=()=>"floor-pattern-color-reveal",Ml(t)}var Sl=class{constructor(e,t,n){this.scene=e,this.sources=t,this.material=n,this.copies=[],this.batches=[],this.key="",this.stats={count:0,visible:0,complete:0,active:0},this.transform=new It}fit(e,t,n,s){let r=new Ei,o=new Xt(new U(0,1,0),-.003),a=[];for(let S of e)for(let w of[-1.16,1.16])for(let R of[-1.16,1.16]){r.setFromCamera(new ue(w,R),S);let x=r.ray.intersectPlane(o,new U);x&&a.push(x)}let c=_l(t),l=new wt().setFromPoints(a),h=Math.floor((c.originZ-l.max.z)/c.stepZ)-1,u=Math.ceil((c.originZ-l.min.z)/c.stepZ)+1,f=Math.floor(l.min.x/c.stepX)-1,d=Math.ceil(l.max.x/c.stepX)+1,m=[t,h,u,f,d,n.layout,n.depth,s.x.toFixed(5),s.z.toFixed(5)].join(":");if(this.coverage={left:l.min.x,right:l.max.x,front:l.max.z,back:l.min.z},m===this.key)return;this.clear(),this.key=m;let y=new Map(this.sources.map(({mesh:S},w)=>{let R=Math.round((c.originZ-S.position.z)/c.stepZ);return[R+":"+Math.round(S.position.x/c.stepX-c.offset(R)),w]})),g=n.layout==="scattered"?lm({left:f*c.stepX,right:d*c.stepX,back:c.originZ-u*c.stepZ,front:c.originZ-h*c.stepZ},this.sources):[];if(n.layout==="grid")for(let S=h;S<=u;S++)for(let w=f;w<=d;w++){if(y.has(S+":"+w))continue;let R=(w+c.offset(S))*c.stepX,x=c.originZ-S*c.stepZ;g.push({x:R,z:x,row:S,col:w,rotation:0})}if(n.layout==="grid"){let S=ji(192807),w=[...g],R=this.sources.map(()=>1);for(let x=w.length-1;x>0;x--){let T=Math.floor(S()*(x+1));[w[x],w[T]]=[w[T],w[x]]}for(let x of w){let T=new Set;for(let F=x.row-2;F<=x.row+2;F++)for(let W=x.col-2;W<=x.col+2;W++){let k=y.get(F+":"+W);k!==void 0&&T.add(k)}let N=R.map((F,W)=>W).filter(F=>!T.has(F)),C=Math.min(...N.map(F=>R[F])),D=N.filter(F=>R[F]===C);x.sourceIndex=D[Math.floor(S()*D.length)],x.radius=this.sources[x.sourceIndex].radius,R[x.sourceIndex]++,y.set(x.row+":"+x.col,x.sourceIndex)}}let p=S=>Math.hypot(S.x-s.x,S.z-s.z);g.forEach(S=>{S.radial=p(S)});let E=[...g.map(S=>S.radial),...this.sources.slice(Sr).map(S=>p(S.mesh.position))],M=Math.min(...E),_=Math.max(...E);this.wave={origin:{x:s.x,z:s.z},nearest:M,farthest:_},this.sources.forEach((S,w)=>{S.cue=w<Sr?mm(w):tf(p(S.mesh.position),M,_)}),this.sources.forEach((S,w)=>{let R=g.filter(j=>j.sourceIndex===w);if(!R.length)return;let x=S.mesh.geometry.clone(),T=S.shadow.geometry.clone(),N=new Mi(new Float32Array(R.length),1),C=new Mi(new Float32Array(R.length),1),D=new Mi(new Float32Array(R.length),1);x.setAttribute("instanceReveal",N),T.setAttribute("instanceReveal",C),x.setAttribute("instanceTint",D);let F=new sr(x,P1(S.mesh.material,S.color),R.length),W=new sr(T,vl(S.patternShadow,!0),R.length);F.name=S.icon.id+"-pattern",W.name=S.icon.id+"-pattern-contact",W.renderOrder=1,F.castShadow=F.receiveShadow=!1,F.frustumCulled=W.frustumCulled=!1,F.instanceMatrix.setUsage(gr),W.instanceMatrix.setUsage(gr),this.scene.add(F,W);let k={mesh:F,shadow:W,fill:N,contact:C,tint:D};this.batches.push(k),R.forEach((j,X)=>{let G=new It;G.position.set(j.x,.003,j.z),G.rotation.y=j.rotation;let le=tf(j.radial,M,_),he={...j,icon:S.icon,color:S.color,mesh:G,caster:S.caster,heightFactor:S.heightFactor,batch:k,slot:X,cue:le};he.reveal=dl(he,S.reveal),he.reveal.group.visible=!1,ul(he.reveal,n.layout==="grid"?c:null),this.scene.add(he.reveal.group),this.copies.push(he),this.transform.position.set(j.x,.001,j.z),this.transform.rotation.set(-Math.PI/2,0,j.rotation),this.transform.scale.setScalar(1),this.transform.updateMatrix(),W.setMatrixAt(X,this.transform.matrix)}),W.instanceMatrix.needsUpdate=!0}),this.stats.count=this.copies.length}update(e,t){let n=0,s=0,r=0,o=0,a=xl(e);this.batches.forEach(c=>{c.dirty=!1});for(let c of this.copies){let l=e>=c.cue.start,h=br(e,c.cue);if(l&&h>=Bn&&a===0&&c.settled){n++,s++;continue}if(l&&a===1&&c.finalized){n++,s++,o++;continue}if(!l&&c.dormant)continue;c.settled=l&&h>=Bn&&a===0,c.finalized=l&&a===1,c.dormant=!l,c.batch.dirty=!0;let u=t.depth*c.heightFactor,f=Ku(c,h,l,u,a);(f.phase==="solid"||f.phase==="flat")&&(c.reveal.group.visible=!1),this.transform.position.copy(c.mesh.position),this.transform.rotation.copy(c.mesh.rotation),this.transform.scale.set(l?1:0,Math.max(.001,f.extrusion)*u,l?1:0),this.transform.updateMatrix(),c.batch.mesh.setMatrixAt(c.slot,this.transform.matrix),c.batch.fill.setX(c.slot,l?f.fill:0),c.batch.contact.setX(c.slot,l?f.extrusion:0),c.batch.tint.setX(c.slot,l?f.tint:0),l&&(f.fill>0||f.lineOpacity>0)&&n++,l&&f.complete&&s++,l&&(!f.complete||a>0&&a<1)&&r++,l&&f.phase==="flat"&&o++}for(let c of this.batches)c.dirty&&(c.mesh.visible=c.fill.array.some(l=>l>0),c.shadow.visible=c.contact.array.some(l=>l>0),c.mesh.instanceMatrix.needsUpdate=!0,c.fill.needsUpdate=c.contact.needsUpdate=c.tint.needsUpdate=!0),c.shadow.material.opacity=t.shadow;this.stats={count:this.copies.length,visible:n,complete:s,active:r,flattened:o}}isFlashing(){return this.copies.some(e=>e.reveal.active&&performance.now()-e.reveal.sparkAt<360)}inspect(){return{...this.stats,coverage:this.coverage,wave:this.wave,instances:this.copies.map(e=>({id:e.icon.id,color:new Ve(16777215).lerp(e.reveal.targetColor,e.batch.tint.getX(e.slot)).getHexString(),tint:e.batch.tint.getX(e.slot),fill:e.batch.fill.getX(e.slot),flatness:e.reveal.state.flatness,lineOpacity:e.reveal.state.lineOpacity,lineColor:e.reveal.lines[0].material.color.getHexString(),x:e.x,z:e.z,radius:e.radius,rotation:e.rotation,cue:e.cue,visible:e.batch.fill.getX(e.slot)>0,extrusion:e.batch.contact.getX(e.slot),guide:fl(e.reveal),drawingVisible:e.reveal.group.visible,pointVisible:e.reveal.group.visible&&e.reveal.dot.visible,strokeVertices:e.reveal.lines.reduce((t,n)=>t+n.geometry.drawRange.count,0),phase:e.reveal.state.phase}))}}clear(){for(let e of this.copies)this.scene.remove(e.reveal.group),e.reveal.guide.geometry.dispose(),e.reveal.guide.material.dispose(),e.reveal.lines.forEach(t=>t.geometry.dispose()),e.reveal.lines[0].material.dispose(),e.reveal.dot.material.dispose(),e.reveal.halo.material.dispose();for(let{mesh:e,shadow:t}of this.batches)this.scene.remove(e,t),e.dispose(),t.dispose(),e.geometry.dispose(),t.geometry.dispose(),e.material.dispose(),t.material.dispose();this.copies=[],this.batches=[]}};var xm=en+On+Fn*.5,L1=[xm,xn[1].start+Un+Ti*.46,xn[2].start+Un+Ti*.66,zn,zn+(kn-zn)*.604,kn,es],bl=(i,e,t)=>i+(e-i)*t;function ts(i,e){let t=L1,n=t.length-1;if(i<=t[0])return e[0];if(i>=t[n])return e[n];let s=t.slice(1).map((f,d)=>f-t[d]),r=s.map((f,d)=>(e[d+1]-e[d])/f),o=e.map((f,d)=>{if(!d||d===n||r[d-1]*r[d]<=0)return 0;let m=2*s[d]+s[d-1],y=s[d]+2*s[d-1];return(m+y)/(m/r[d-1]+y/r[d])}),a=t.findIndex((f,d)=>d<n&&i<t[d+1]),c=s[a],l=(i-t[a])/c,h=l*l,u=h*l;return(2*u-3*h+1)*e[a]+(u-2*h+l)*c*o[a]+(-2*u+3*h)*e[a+1]+(u-h)*c*o[a+1]}function El(i,e,t,n=1){let s=Math.max(0,Math.min(ri,i)),[r,o,a]=e,c=t.distance-r.distance,l=(y,g)=>bl(a[y],t[y],g),h=[r.center,o.center,a.center,...[.16,.65,.9,1].map(y=>({x:bl(a.center.x,t.center.x,y),y:bl(a.center.y,t.center.y,y),z:bl(a.center.z,t.center.z,y)}))],u={};for(let y of["x","y","z"])u[y]=ts(s,h.map(g=>g[y]));u.y+=n*ts(s,[0,.06,.1,.18,.3,.12,0]);let f=ts(s,[r.distance,o.distance*1.02,a.distance*1.08,r.distance+c*.06,r.distance+c*.4,r.distance+c*.7,t.distance]),d=ts(s,[r.yaw,o.yaw,a.yaw,l("yaw",.18),l("yaw",.58),l("yaw",.82),t.yaw]),m=ts(s,[r.pitch,o.pitch,a.pitch,a.pitch+1,a.pitch+3,68,90]);return{center:u,distance:f,yaw:d,pitch:m,shiftX:ts(s,[r.shiftX,o.shiftX,a.shiftX,l("shiftX",.16),l("shiftX",.65),l("shiftX",.9),t.shiftX]),shiftY:ts(s,[r.shiftY,o.shiftY,a.shiftY,l("shiftY",.16),l("shiftY",.65),l("shiftY",.9),t.shiftY]),fov:34,roll:n?ts(s,[0,-.018,-.02,-.016,-.012,-.008,0]):0,solo:s<zn,index:pm(s),travelling:s>xm&&s<es,pullback:Math.max(0,Math.min(1,(f-a.distance*1.08)/(t.distance-a.distance*1.08))),overhead:Math.max(0,Math.min(1,(m-a.pitch)/(90-a.pitch)))}}var Tl=1.25,hf=Ki+en,wl=hf*(Tl-1),wr=kn-.65,Tr=1.6,bs=.6,N1=bs*(1+Tr)/2,of=i=>Math.max(0,Math.min(ri,i));function _m(i){if(i>=bs)return i*Tr-(Tr-1)*bs/2;let e=i/bs;return i+(Tr-1)*bs*(e*e*e-.5*e*e*e*e)}function D1(i){let e=i<=hf*Tl?i/Tl:i-wl;return e<=wr?of(e):of(wr+_m(e-wr))}function Rl(i){let e=of(i),t=e-wr;if(e<=hf)return e*Tl;if(t<=0)return e+wl;if(t>=N1)return wr+wl+(t+(Tr-1)*bs/2)/Tr;let n=0,s=bs;for(let r=0;r<32;r++){let o=(n+s)/2;_m(o)<t?n=o:s=o}return wr+wl+(n+s)/2}var U1=ju,O1=kn+.45,F1=6.2,Al=Rl(U1),af=Rl(O1),Es=af-Al,Vn=Math.min(.6,Es/2),ym=(F1-Vn)/(Es-Vn),cf=(1-ym)*(Es-Vn),lf=i=>i*i*i-.5*i*i*i*i;function uf(i){let e=i-Al;if(e<=0)return i;if(e>=Es)return i-cf;let t=e<Vn?Vn*lf(e/Vn):e>Es-Vn?Es-Vn-Vn*lf((Es-e)/Vn):e-Vn/2;return i-(1-ym)*t}function B1(i){if(i<=Al)return i;if(i>=af-cf)return i+cf;let e=Al,t=af;for(let n=0;n<36;n++){let s=(e+t)/2;uf(s)<i?e=s:t=s}return(e+t)/2}var z1=xn[1].start,Ar=.5,Er=uf(Rl(z1)),ws=.6,k1=ws*(1+Ar)/2;function vm(i){let e=i-Er;return e<=0?i:e>=ws?Er+e*Ar+(1-Ar)*ws/2:i-(1-Ar)*ws*lf(e/ws)}function V1(i){let e=i-Er;if(e<=0)return i;if(e>=k1)return Er+(e-(1-Ar)*ws/2)/Ar;let t=Er,n=Er+ws;for(let s=0;s<36;s++){let r=(t+n)/2;vm(r)<i?t=r:n=r}return(t+n)/2}function Mm(i){return D1(B1(V1(i)))}function H1(i){return vm(uf(Rl(i)))}var ff=H1(ri),Sm=.85,G1=.42,bm=100+ff*115*G1-Sm*100;function Em(i,e,t){let n=t*Sm;return{start:i-n,distance:Math.max(1,e-t+n)}}var df=200,pf=20,wm=2;function Tm(i){let e=document.createElement("canvas");e.width=e.height=128;let t=e.getContext("2d");t.fillStyle="#ffffff",t.fillRect(0,0,128,128),t.fillStyle="#dddddd",t.beginPath(),t.arc(64,64,128*wm/pf/2,0,Math.PI*2),t.fill();let n=new Cn(e);n.colorSpace=yt,n.wrapS=n.wrapT=Yn,n.anisotropy=i.capabilities.getMaxAnisotropy();let s={value:1},r=new sn({name:"White dotted floor",map:n,color:16777215,toneMapped:!1});r.onBeforeCompile=c=>{c.uniforms.dotOpacity=s,c.fragmentShader=`uniform float dotOpacity;
`+c.fragmentShader,c.fragmentShader=c.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
diffuseColor.rgb=mix(vec3(1.0),diffuseColor.rgb,dotOpacity);`)},r.customProgramCacheKey=()=>"dotted-floor-fade";let o=new St(new bi(df,df),r);o.name="White floor",o.rotation.x=-Math.PI/2;let a=0;return{mesh:o,fit(c,l,h=34){a=2*(c.distance+c.center.y)*Math.tan(gt.degToRad(h)/2)/l*pf,n.repeat.setScalar(df/a)},update(c,l){s.value=l?1-gt.smoothstep(c,70,90):1},inspect(){return{color:"#dddddd",spacingPx:pf,diameterPx:wm,worldSpacing:a,opacity:s.value}}}}var Cl="http://www.w3.org/2000/svg",mf="#FF3C3C",Am=i=>Math.max(0,Math.min(1,i)),Rr=i=>{let e=Am(i);return e*e*(3-2*e)};function Rm(i,e){let t=Number(e.icon.viewBox.trim().split(/[\s,]+/)[3]),n=String(Number(t.toFixed(2))),s=document.createElementNS(Cl,"svg");s.setAttribute("class","opening-dimension"),s.setAttribute("aria-hidden","true"),Object.assign(s.style,{position:"absolute",inset:"0",width:"100%",height:"100%",pointerEvents:"none",display:"none"});let r=document.createElementNS(Cl,"g");r.setAttribute("stroke",mf),r.setAttribute("stroke-width","1"),r.setAttribute("fill","none"),s.append(r);let o=["upper-cap","stem","lower-cap"].map(f=>{let d=document.createElementNS(Cl,"line");return d.setAttribute("data-part",f),r.append(d),d}),a=document.createElementNS(Cl,"text");a.textContent=n,a.setAttribute("fill",mf),a.setAttribute("stroke","none"),a.setAttribute("dominant-baseline","middle"),a.setAttribute("font-family","Handjet, monospace"),a.setAttribute("font-weight","400"),a.style.fontVariantNumeric="tabular-nums",r.append(a),i.append(s);let c={visible:!1,label:n,svgHeight:t,color:mf,progress:0,opacity:0},l=new U;function h(f,d,m,y,g){return l.set(f,.008,d),e.reveal.group.localToWorld(l),l.project(m),{x:(l.x+1)*y/2,y:(1-l.y)*g/2}}function u(f,d,m){f.setAttribute("x1",d.x),f.setAttribute("y1",d.y),f.setAttribute("x2",m.x),f.setAttribute("y2",m.y)}return{update(f,d,m,y){let g=Am((f-vs)/en),p=Rr(g/.12)*(1-Rr((f-cl)/tm))*e.reveal.state.guideOpacity;if(c={...c,visible:p>.001,progress:g,opacity:p},s.style.display=c.visible?"block":"none",r.setAttribute("opacity",p),!c.visible)return;s.setAttribute("viewBox",`0 0 ${m} ${y}`);let{minZ:E,maxZ:M,maxX:_}=e.reveal.guide.userData.bounds,S=h(_,E,d,m,y),w=h(_,M,d,m,y),R=Math.hypot(w.x-S.x,w.y-S.y),x={x:(w.y-S.y)/R,y:-(w.x-S.x)/R},T={x:S.x+x.x*9,y:S.y+x.y*9},N={x:w.x+x.x*9,y:w.y+x.y*9},C=Rr(g/.2),D=Rr((g-.1)/.55),F=Rr((g-.62)/.18),W=(le,he)=>[{x:le.x-x.x*6*he,y:le.y-x.y*6*he},{x:le.x+x.x*6*he,y:le.y+x.y*6*he}];u(o[0],...W(T,C)),u(o[1],T,{x:T.x+(N.x-T.x)*D,y:T.y+(N.y-T.y)*D}),u(o[2],...W(N,F));let k=Rr((f-al)/(en*.2)),j=m<500?12:14,X=(T.x+N.x)/2+x.x*(7+(1-k)*5),G=(T.y+N.y)/2+x.y*7;a.setAttribute("x",X),a.setAttribute("y",G),a.setAttribute("font-size",j),a.setAttribute("opacity",k),c={...c,upper:C,stem:D,lower:F,labelOpacity:k,top:T,bottom:N,labelPosition:{x:X,y:G},fontSize:j}},inspect(){return{...c}}}}var Il="http://www.w3.org/2000/svg",W1=i=>Math.max(0,Math.min(1,i)),Xo=i=>{let e=W1(i);return e*e*(3-2*e)},Pl=i=>String(Number(i.toFixed(2)));function Cm(i,e){let[t,n,s,r]=e.icon.viewBox.trim().split(/[\s,]+/).map(Number),o=e.caster.svgBounds,a=t+s/2,c=n+r/2,l=e.caster.contours.filter(C=>!C.hole).map(C=>{let D=C.points.map(([ye])=>t+(ye-o.minX)/(o.maxX-o.minX)*s),F=C.points.map(([,ye])=>n+(ye-o.minZ)/(o.maxZ-o.minZ)*r),W=Math.min(...D),k=Math.max(...D),j=Math.min(...F),X=Math.max(...F),G=(W+k)/2,le=(j+X)/2,he=Math.hypot(G-a,le-c)||1,_e=D.map((ye,Be)=>((ye-a)*(G-a)+(F[Be]-c)*(le-c))/he);return{left:W,right:k,top:j,bottom:X,centerX:G,centerY:le,radius:Math.max(...D.map((ye,Be)=>Math.hypot(ye-a,F[Be]-c))),radialInner:Math.min(..._e),radialOuter:Math.max(..._e)}}),h=l.filter(C=>C.left<a&&C.right>a&&C.bottom<c).sort((C,D)=>C.top-D.top)[0],u=l.filter(C=>C.left<a&&C.right>a&&C.top<c&&C.bottom>c),f=Math.max(...u.map(C=>C.radius)),d=u.sort((C,D)=>(C.right-C.left)*(C.bottom-C.top)-(D.right-D.left)*(D.bottom-D.top))[0],m=[c-h.top,c-h.bottom,f],y=l.filter(C=>(C.right<a||C.left>a)&&(C.bottom<c||C.top>c)),g=["radialOuter","radialInner"].map(C=>y.reduce((D,F)=>D+F[C],0)/y.length),p=document.createElementNS(Il,"svg");p.setAttribute("class","opening-construction"),p.setAttribute("aria-hidden","true"),p.style.cssText="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;display:none";let E=document.createElementNS(Il,"g");p.append(E),i.append(p);function M(C,D,F){let W=document.createElementNS(Il,"path");return W.dataset.part=C,W.setAttribute("fill","none"),W.setAttribute("stroke",D),W.setAttribute("stroke-width",F),W.setAttribute("stroke-linecap","round"),E.append(W),W}let _=m.map((C,D)=>({element:M(["outer-circle","inner-circle","center-circle"][D],"#b0b7bf",.85),radius:C,centerX:a,centerY:c,start:.08+D*.24,duration:1.08,direction:D?-1:1}));g.forEach((C,D)=>_.push({element:M(`small-box-${D?"inner":"outer"}-circle`,"#b0b7bf",.85),radius:C,centerX:a,centerY:c,start:.72+D*.22,duration:.78,direction:D?-1:1}));let S=[M("horizontal-axis","#c3c9cf",.65),M("vertical-axis","#c3c9cf",.65)];S.forEach(C=>C.setAttribute("stroke-dasharray","3 5"));let w=[{name:"block-width",value:Pl(h.right-h.left),a:[h.left,h.top-8],b:[h.right,h.top-8],anchor:"middle",offset:[0,-9],start:.64},{name:"block-height",value:Pl(h.bottom-h.top),a:[h.right+8,h.top],b:[h.right+8,h.bottom],anchor:"start",offset:[6,0],start:.98},{name:"center-width",value:Pl(d.right-d.left),a:[d.left,d.top-8],b:[d.right,d.top-8],anchor:"middle",offset:[0,-9],start:1.12},{name:"center-height",value:Pl(d.bottom-d.top),a:[d.right+8,d.top],b:[d.right+8,d.bottom],anchor:"start",offset:[6,0],start:1.32}].map(C=>{let D=M(C.name,"#FF3C3C",1),F=document.createElementNS(Il,"text");return F.textContent=C.value,F.dataset.part=C.name+"-value",F.setAttribute("fill","#FF3C3C"),F.setAttribute("font-family","Handjet, monospace"),F.setAttribute("font-weight","400"),F.setAttribute("text-anchor",C.anchor),F.setAttribute("dominant-baseline","middle"),F.setAttribute("stroke","#fff"),F.setAttribute("stroke-width","3"),F.setAttribute("stroke-linejoin","round"),F.setAttribute("paint-order","stroke"),F.style.fontVariantNumeric="tabular-nums",E.append(F),{...C,element:D,label:F}}),R=new U;function x(C,D,F,W,k){return R.set(o.minX+(C-t)/s*(o.maxX-o.minX),.009,o.minZ+(D-n)/r*(o.maxZ-o.minZ)),e.reveal.group.localToWorld(R),R.project(F),{x:(R.x+1)*W/2,y:(1-R.y)*k/2}}function T(C,D,F,W,k,j,X){let G=x(...D,k,j,X),le=x(D[0]+(F[0]-D[0])*W,D[1]+(F[1]-D[1])*W,k,j,X);C.setAttribute("d",`M${G.x},${G.y}L${le.x},${le.y}`),C.setAttribute("opacity",W>0?1:0)}let N={visible:!1,opacity:0,circles:_.map(()=>0),dimensions:w.map(({value:C})=>({value:C,progress:0,labelOpacity:0}))};return{update(C,D,F,W){let k=C-cl,j=Xo(k/.24)*e.reveal.state.guideOpacity;if(N={...N,visible:e.reveal.group.visible&&j>.001,opacity:j},p.style.display=N.visible?"block":"none",E.setAttribute("opacity",j),!N.visible)return;p.setAttribute("viewBox",`0 0 ${F} ${W}`),N.circles=_.map(({element:le,radius:he,centerX:_e,centerY:ye,start:Be,duration:Je,direction:Ze})=>{let ce=Xo((k-Be)/Je),Y=Math.max(1,Math.ceil(ce*128)),z="";for(let O=0;O<=Y;O++){let L=-Math.PI/2+ce*(O/Y)*Math.PI*2*Ze,V=x(_e+Math.cos(L)*he,ye+Math.sin(L)*he,D,F,W);z+=(O?"L":"M")+V.x+","+V.y}return le.setAttribute("d",z),le.setAttribute("opacity",ce>0?1:0),ce});let X=Xo((k-.42)/.75),G=m[0];T(S[0],[a-G,c],[a+G,c],X,D,F,W),T(S[1],[a,c-G],[a,c+G],X,D,F,W),N.dimensions=w.map(({element:le,label:he,value:_e,a:ye,b:Be,anchor:Je,offset:Ze,start:ce})=>{let Y=Xo((k-ce)/.46),z=Xo((k-ce-.32)/.32);T(le,ye,Be,Y,D,F,W);let O=x((ye[0]+Be[0])/2,(ye[1]+Be[1])/2,D,F,W);return he.setAttribute("x",O.x+Ze[0]+(Je==="start"?(1-z)*4:0)),he.setAttribute("y",O.y+Ze[1]+(Je==="middle"?(1-z)*4:0)),he.setAttribute("font-size",F<500?12:14),he.setAttribute("opacity",z),{value:_e,progress:Y,labelOpacity:z}})},inspect(){return{...N,block:h,radii:m}}}}function Im(i,e){let{guide:t}=e,n=t.userData.sweep,s="http://www.w3.org/2000/svg",r=document.createElementNS(s,"svg");r.classList.add("opening-guide-sweep"),r.setAttribute("aria-hidden","true"),r.style.cssText="position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:3;display:none",r.setAttribute("fill","none"),r.setAttribute("stroke","#"+n.material.color.getHexString()),r.setAttribute("stroke-width","1");let o=Array.from({length:4},()=>{let c=document.createElementNS(s,"line");return r.append(c),c});document.body.append(r),n.material.visible=!1;let a=new U;return{update(c){let l=e.group.visible&&t.visible&&n.visible;if(r.style.display=l?"block":"none",!l)return;let h=i.getBoundingClientRect(),u=n.geometry.attributes.position;r.setAttribute("viewBox",`0 0 ${innerWidth} ${innerHeight}`),r.setAttribute("opacity",String(n.material.opacity)),o.forEach((f,d)=>{for(let m=0;m<2;m++)a.fromBufferAttribute(u,d*2+m),n.localToWorld(a).project(c),f.setAttribute("x"+(m+1),String(h.left+(a.x+1)*h.width/2)),f.setAttribute("y"+(m+1),String(h.top+(1-a.y)*h.height/2))})}}}function Pm(){if(window.MainIntro)return{setAutoHideProgress(h){window.MainIntro.headerProgress=h}};let i=document.querySelector(".header"),e=document.querySelector(".menu-button"),t=document.querySelector(".mobile-menu"),n=document.querySelector("main"),s=matchMedia("(max-width:759px)"),r=0,o=0,a=!1;function c(h=!1){let u=o>0&&!a;i.style.setProperty("--header-hide-offset",`calc(${-100*o}% - ${o}px)`),i.style.setProperty("--header-hide-opacity",String(1-o)),i.style.setProperty("--header-slide-duration",h?"0s":".4s"),i.style.setProperty("--header-background-duration",h?"0s":".6s"),i.classList.contains("is-intro-hidden")!==u&&i.classList.toggle("is-intro-hidden",u)}document.addEventListener("pointermove",h=>{h.pointerType!=="touch"&&(a=h.clientY<=i.offsetHeight+(a?16:0),c())},{passive:!0}),document.addEventListener("pointerleave",()=>{a=!1,c()}),i.addEventListener("focusin",()=>c()),i.addEventListener("focusout",()=>c());function l(h,u=!1){clearTimeout(r),e.setAttribute("aria-expanded",String(h)),e.setAttribute("aria-label",h?"\uBA54\uB274 \uB2EB\uAE30":"\uBA54\uB274 \uC5F4\uAE30"),document.body.classList.toggle("mobile-menu-open",h),c(),n.inert=h,t.inert=!h,h?(t.hidden=!1,requestAnimationFrame(()=>{e.getAttribute("aria-expanded")==="true"&&t.classList.add("is-open")})):(t.classList.remove("is-open"),r=setTimeout(()=>{t.hidden=!0},280)),u&&e.focus({preventScroll:!0})}return e.addEventListener("click",()=>l(e.getAttribute("aria-expanded")!=="true")),document.querySelectorAll(".header a").forEach(h=>h.addEventListener("click",()=>l(!1))),document.addEventListener("keydown",h=>{if(e.getAttribute("aria-expanded")!=="true")return;if(h.key==="Escape"){l(!1,!0);return}if(h.key!=="Tab")return;let u=[...document.querySelectorAll(".header .logo a,.menu-button,.mobile-menu a")],f=u[0],d=u.at(-1);h.shiftKey&&document.activeElement===f?(h.preventDefault(),d.focus()):!h.shiftKey&&document.activeElement===d&&(h.preventDefault(),f.focus())}),s.addEventListener("change",()=>{s.matches||l(!1)}),{setAutoHideProgress(h){let u=Math.max(0,Math.min(1,h));u!==o&&(o=u,c(!0))}}}var X1=i=>Math.max(0,Math.min(1,i));function Ll(i,e,t="[data-read]"){let n=matchMedia("(hover: hover) and (pointer: fine)"),s={x:0,y:0,active:!1},r=[...i.querySelectorAll(t)].map(m=>{let y=[...m.childNodes].filter(S=>S.nodeType===Node.TEXT_NODE).map(S=>S.textContent).join(""),g=document.createElement("span"),p=document.createElement("span");g.className="reading-source",g.textContent=y,p.className="reading-letters",p.setAttribute("aria-hidden","true");let E=m.dataset.readAccent||"",M=E?y.indexOf(E):-1,_=Array.from(y,(S,w)=>{let R=document.createElement("span");return R.className="reading-char",R.textContent=S,p.append(R),M>=0&&w>=M&&w<M+E.length&&R.classList.add("reading-accent"),{element:R,center:0,x:0,velocity:0,target:0}});for(let S of[...m.childNodes])S.nodeType===Node.TEXT_NODE&&S.remove();return m.prepend(g,p),m.classList.add("reading-interactive"),{word:m,letters:p,chars:_,fontSize:0}}),o=0,a=0;function c(m){let y=Math.min(.03333333333333333,(m-a)/1e3||.016666666666666666);a=m;let g=!1;for(let p of r){for(let E of p.chars)E.velocity+=((E.target-E.x)*260-E.velocity*24)*y,E.x+=E.velocity*y,Math.abs(E.target-E.x)<.015&&Math.abs(E.velocity)<.05?(E.x=E.target,E.velocity=0):g=!0,E.element.style.transform=`translate3d(${E.x.toFixed(3)}px,0,0)`;p.word.style.setProperty("--read-end-shift",`${p.chars.at(-1).x.toFixed(3)}px`)}o=g?requestAnimationFrame(c):0}function l(){o||(a=performance.now(),o=requestAnimationFrame(c))}function h(m=!1){s.active=!1;for(let y of r){for(let g of y.chars)g.target=0,m&&(g.x=0,g.velocity=0,g.element.style.transform="none");m&&y.word.style.setProperty("--read-end-shift","0px")}m?(cancelAnimationFrame(o),o=0):l()}function u(){if(!s.active)return;let m=i.getBoundingClientRect();if(s.x<m.left||s.x>m.right||s.y<m.top||s.y>m.bottom){h();return}let y=[];for(let g of r){let p=g.letters.getBoundingClientRect(),E=p.top+p.height/2,M=y.find(_=>Math.abs(_.center-E)<Math.min(_.height,p.height)*.25);M||(M={center:E,height:p.height,left:p.left,right:p.right,fontSize:g.fontSize,runs:[]},y.push(M)),M.left=Math.min(M.left,p.left),M.right=Math.max(M.right,p.right),M.fontSize=Math.max(M.fontSize,g.fontSize),M.runs.push({row:g,bounds:p})}for(let g of y){let p=(s.y-g.center)/(g.height*1.15),E=Math.pow(X1(1-p*p),2),M=g.fontSize*1.35,_=g.fontSize*.64,S=Math.max(0,g.left-s.x,s.x-g.right)/M,w=Math.exp(-S*S);for(let{row:R,bounds:x}of g.runs)for(let T of R.chars){let N=(x.left+T.center-s.x)/M;T.target=_*Math.tanh(N)*E*w,T.target=Math.max(20-g.left,Math.min(innerWidth-20-g.right,T.target))}}l()}function f(){for(let m of r){let y=m.letters.getBoundingClientRect();m.fontSize=parseFloat(getComputedStyle(m.word).fontSize),m.word.style.setProperty("--read-width",`${y.width}px`);for(let g of m.chars){let p=g.element.getBoundingClientRect(),E=p.left-y.left-g.x;g.center=E+p.width/2,g.element.style.setProperty("--char-left",`${E}px`)}}u()}i.addEventListener("pointermove",m=>{m.pointerType==="touch"||!n.matches||e.matches||(s.x=m.clientX,s.y=m.clientY,s.active=!0,u())}),i.addEventListener("pointerleave",()=>h()),i.addEventListener("pointercancel",()=>h()),window.addEventListener("blur",()=>h()),window.addEventListener("scroll",u,{passive:!0}),document.addEventListener("visibilitychange",()=>{document.hidden&&h(!0)}),e.addEventListener("change",()=>h(!0)),n.addEventListener("change",()=>h(!0));let d=new ResizeObserver(f);r.forEach(m=>d.observe(m.letters)),document.fonts.ready.then(f),f()}var qo=[{id:"yun-jiwon",name:"\uC724\uC9C0\uC6D0",viewBox:"-14 -14 268 268",color:"#3b82a6",svg:'<path d="M190.62,161.45l16.88,16.88-29.17,29.17-16.88-16.88,29.17-29.17ZM207.5,61.67l-16.88,16.88-29.17-29.17,16.88-16.88,29.17,29.17ZM120,138.42l-18.42-18.42,18.42-18.42,18.42,18.42-18.42,18.42ZM32.5,61.67l29.17-29.17,16.88,16.88-29.17,29.17-16.88-16.88ZM32.5,178.33l16.88-16.88,29.17,29.17-16.88,16.88-29.17-29.17Z"/><path d="M27.78,144.01H0v-48.02h27.78v48.02ZM95.99,240v-27.78h48.02v27.78s-48.02,0-48.02,0ZM104.84,104.84h30.32v30.32s-30.32,0-30.32,0v-30.32ZM240,95.99v48.02s-27.78,0-27.78,0v-48.02h27.78ZM144.01,0v27.78h-48.02V0h48.02Z"/>'},{id:"seo-yeonwoo",name:"\uC11C\uC5F0\uC6B0",viewBox:"-14 -14 268 268",color:"#f59000",svg:'<path d="M89.99,30.04v30h59.98v-30L119.98.04l-29.99,30ZM30,150.04h29.99v-60h-29.99L.01,120.04l29.99,30ZM89.99,210.04l29.99,30,29.99-30v-30h-59.98v30ZM179.96,90.04v60h29.99l29.99-30-29.99-30h-29.99Z" fill-rule="evenodd"/>'},{id:"lee-nayeong",name:"\uC774\uB098\uC601",viewBox:"-14 -14 268 268",color:"#00aaff",svg:'<path d="M159.57,62.27v-24.19l17.3-17.3h24.19l17.3,17.3v24.19l-17.3,17.3h-24.19l-17.3-17.3ZM176.87,217.86l-17.3-17.3v-24.19l17.3-17.3h24.19l17.3,17.3v24.19l-17.3,17.3h-24.19ZM90.44,131.43v-24.22l17.27-17.27h24.22l17.27,17.27v24.22l-17.27,17.27h-24.22l-17.27-17.27ZM21.28,62.27v-24.19l17.3-17.3h24.19l17.3,17.3v24.19l-17.3,17.3h-24.19l-17.3-17.3ZM38.58,217.86l-17.3-17.3v-24.19l17.3-17.3h24.19l17.3,17.3v24.19l-17.3,17.3h-24.19Z"/>'},{id:"kim-doyeon",name:"\uAE40\uB3C4\uC5F0",viewBox:"-14 -14 268 268",color:"#4ccad1",svg:'<path d="M135.76,239.71l-2.71.29v-36.19l3.49-.59,5.42-1.27,5.32-1.6,5.19-1.96,5.06-2.28,4.9-2.61,4.7-2.94,4.54-3.23,4.28-3.52,4.05-3.82,3.82-4.05,3.52-4.28,3.23-4.54,2.94-4.7,2.61-4.9,2.28-5.06,1.96-5.19,1.6-5.32,1.27-5.42.59-3.49h36.19l-.29,2.71-1.27,7.8-1.79,7.7-2.28,7.54-2.81,7.41-3.26,7.18-3.72,6.98-4.18,6.72-4.6,6.4-4.99,6.14-5.42,5.74-5.74,5.42-6.14,4.99-6.4,4.6-6.72,4.18-6.98,3.72-7.18,3.26-7.41,2.81-7.54,2.28-7.7,1.79-7.8,1.27ZM239.71,104.24l.29,2.71h-36.19l-.59-3.49-1.27-5.42-1.6-5.32-1.96-5.19-2.28-5.06-2.61-4.9-2.94-4.7-3.23-4.54-3.52-4.28-3.82-4.05-4.05-3.82-4.28-3.52-4.54-3.23-4.7-2.94-4.9-2.61-5.06-2.28-5.19-1.96-5.32-1.6-5.42-1.27-3.49-.59V0l2.71.29,7.8,1.27,7.7,1.79,7.54,2.28,7.41,2.81,7.18,3.26,6.98,3.72,6.72,4.18,6.4,4.6,6.14,4.99,5.74,5.42,5.42,5.74,4.99,6.14,4.6,6.4,4.18,6.72,3.72,6.98,3.26,7.18,2.81,7.41,2.28,7.54,1.79,7.7,1.27,7.8ZM104.24.29l2.71-.29v36.19l-3.49.59-5.42,1.27-5.32,1.6-5.19,1.96-5.06,2.28-4.9,2.61-4.7,2.94-4.54,3.23-4.28,3.52-4.05,3.82-3.82,4.05-3.52,4.28-3.23,4.54-2.94,4.7-2.61,4.9-2.28,5.06-1.96,5.19-1.6,5.32-1.27,5.42-.59,3.49H0l.29-2.71,1.27-7.8,1.79-7.7,2.28-7.54,2.81-7.41,3.26-7.18,3.72-6.98,4.18-6.72,4.6-6.4,4.99-6.14,5.42-5.74,5.74-5.42,6.14-4.99,6.4-4.6,6.72-4.18,6.98-3.72,7.18-3.26,7.41-2.81,7.54-2.28,7.7-1.79,7.8-1.27ZM.29,135.76l-.29-2.71h36.19l.59,3.49,1.27,5.42,1.6,5.32,1.96,5.19,2.28,5.06,2.61,4.9,2.94,4.7,3.23,4.54,3.52,4.28,3.82,4.05,4.05,3.82,4.28,3.52,4.54,3.23,4.7,2.94,4.9,2.61,5.06,2.28,5.19,1.96,5.32,1.6,5.42,1.27,3.49.59v36.19l-2.71-.29-7.8-1.27-7.7-1.79-7.54-2.28-7.41-2.81-7.18-3.26-6.98-3.72-6.72-4.18-6.4-4.6-6.14-4.99-5.74-5.42-5.42-5.74-4.99-6.14-4.6-6.4-4.18-6.72-3.72-6.98-3.26-7.18-2.81-7.41-2.28-7.54-1.79-7.7-1.27-7.8Z"/>'},{id:"kim-juyoun",name:"\uAE40\uC8FC\uC5F0",viewBox:"-14 -14 268 268",color:"#fbe19f",svg:'<path d="M160.68,183.3l22.62-22.62,56.7,56.7v2.61l-20.01,20.01h-2.61l-56.7-56.7ZM219.99,0l20.01,20.01v2.61l-56.7,56.7-22.62-22.62L217.38,0h2.61ZM135.99,218.01l-15.99,15.99-15.99-15.99v-82.02H21.99l-15.99-15.99,15.99-15.99h82.02V21.99l15.99-15.99,15.99,15.99v82.02h82.02l15.99,15.99-15.99,15.99h-82.02v82.02ZM0,219.99v-2.61l56.7-56.7,22.62,22.62-56.7,56.7h-2.61L0,219.99ZM79.32,56.7l-22.62,22.62L0,22.62v-2.61L20.01,0h2.61l56.7,56.7Z"/>'},{id:"kim-jiyou-cocorang",name:"\uAE40\uC9C0\uC720",viewBox:"-14 -14 268 268",color:"#ffba79",svg:'<path d="M210.05,90.24l29.95-30.03L179.97.56l-30.06,29.38L119.91.47l-30.07,29.62L60.08.35,0,60.24l30.15,29.89,60-59.82,29.6,29.87c-30.36.12-55.33,22.81-59.14,52.16-.37,2.48-.65,5-.73,7.58l-29.82-29.48L.04,120.26l29.95,29.58,29.95-28.73c.06,1.6.24,3.15.41,4.71.02.22.03.44.06.66.12.95.28,1.88.43,2.82.21,1.36.44,2.71.74,4.04,0,.03.02.06.02.09,1.31,5.75,3.42,11.18,6.25,16.17.14.24.29.47.43.71.79,1.34,1.6,2.67,2.48,3.94.42.6.87,1.17,1.31,1.75.67.89,1.33,1.8,2.05,2.65.63.75,1.3,1.44,1.96,2.16.62.67,1.22,1.36,1.87,2,.64.63,1.33,1.21,1.99,1.81.77.7,1.54,1.41,2.35,2.07.38.31.79.58,1.18.88,10.1,7.79,22.71,12.47,36.44,12.49l-29.52,30.09,29.51,29.53,30.12-29.33,29.83,29.53,59.76-59.71-29.34-29.85,29.64-30.37-29.85-29.71ZM209.53,89.68l-29.38,30.23c-.1-2.75-.42-5.44-.83-8.08-4.03-29.06-28.84-51.47-58.97-51.64l29.36-29.58,59.83,59.07ZM149.93,209.94l-29.76-29.64c5.37-.17,10.47-1.01,15.32-2.33.87-.23,1.76-.43,2.61-.7.55-.17,1.07-.4,1.6-.59,1.3-.45,2.6-.9,3.85-1.44,1.45-.62,2.85-1.32,4.23-2.04.27-.14.55-.25.81-.39,10.27-5.54,18.56-13.86,24.07-24.06.29-.53.52-1.09.79-1.63.57-1.13,1.15-2.24,1.64-3.41.44-1.03.81-2.11,1.19-3.17.28-.77.59-1.52.84-2.31.21-.67.37-1.37.56-2.05,1.39-4.9,2.27-10.04,2.47-15.42l29.64,29.18-59.89,59.99Z"/><polygon points=".4 180.23 60.26 239.84 89.87 210.08 30.05 150.26 .4 180.23"/>'},{id:"ahn-nagyeong",name:"\uC548\uB098\uACBD",viewBox:"-14 -14 268 268",color:"#ccebf5",svg:'<path d="M214.99,133.31h-55.09l-13.31-13.31,13.31-13.31h55.09l13.31,13.31-13.31,13.31ZM120,139.01l-19.01-19.01,19.01-19.01,19.01,19.01-19.01,19.01ZM106.69,214.99v-55.09l13.31-13.31,13.31,13.31v55.09l-13.31,13.31-13.31-13.31ZM133.31,80.1l-13.31,13.31-13.31-13.31V25.01l13.31-13.31,13.31,13.31v55.09ZM80.1,106.69l13.31,13.31-13.31,13.31H25.01l-13.31-13.31,13.31-13.31h55.09Z"/>'},{id:"kim-minjae",name:"\uAE40\uBBFC\uC7AC",viewBox:"-14 -14 268 268",color:"#b5b5b5",svg:'<path d="M160,80.01V0h80v80h-80ZM240,240.01h-80v-80h80v80ZM0,80.01V0h80v80H0ZM80,80.01h80v80h-80v-80ZM80,240.01H0v-80h80v80Z"/>'},{id:"nam-nayoung",name:"\uB0A8\uB098\uC601",viewBox:"-14 -14 268 268",color:"#f2f070",svg:'<path d="M-.22-.05h120L-.22,119.95V-.05ZM-.22,119.95l120,120,120-120L119.78-.05h120v240H-.22v-120Z"/>'},{id:"jo-eungyo",name:"\uC870\uC740\uAD50",viewBox:"-14 -14 268 268",color:"#ffd834",svg:'<path d="M.34,-.66h60v30h-30v30h-30ZM180.34,-.66h60v60h-30v-30h-30ZM.34,179.34h30v30h30v30h-60ZM210.34,179.34h30v60h-60v-30h30Z"/><polygon points="120.34 50.91 188.77 119.34 120.34 187.77 51.91 119.34"/>'},{id:"song-yujin",name:"\uC1A1\uC720\uC9C4",viewBox:"-14 -14 268 268",color:"#4df4ff",svg:'<polygon points="117.34 68.5 67.06 17.22 16.13 68.38 67.4 118.43 66.86 68.43 117.34 68.5"/><polygon points="117.96 170.13 168.66 119.44 117.34 68.5 67.4 118.43 15.94 170.09 66.83 221.24 117.42 170.52 66.82 170.16 67.05 119.58 117.96 170.13"/><polygon points="169.2 118.7 219.73 68.39 168.7 17.38 118.3 68.23 168.73 68.47 169.2 118.7"/><polygon points="169.04 119.85 168.73 170.27 118.35 170.54 169.01 221.12 219.83 170.04 169.04 119.85"/>'},{id:"kim-jiyoo-phishing-ddook",name:"\uAE40\uC9C0\uC720",viewBox:"-14 -14 268 268",color:"#e5903a",svg:'<path d="M120,240L0,120,120,0l120,120-120,120ZM120,200l80-80L120,40,40,120l80,80ZM86.67,120l33.33-33.33,33.33,33.33-33.33,33.33-33.33-33.33Z"/>'},{id:"son-yejin",name:"\uC190\uC608\uC9C4",viewBox:"-14 -14 268 268",color:"#536dea",svg:'<path d="M-.16.02v84h24V24.02h60V.02H-.16ZM215.84,24.02v60h24V.02h-84v24h60ZM-.16,156.02v84h84v-24H23.84v-60H-.16ZM155.84,240.02h84v-84h-24v60h-60v24Z" fill-rule="evenodd"/><path d="M134.2,52.94v-12.41h-33.1v12.41h33.1ZM51.45,135.69v-33.1h-12.41v33.1h12.41ZM196.26,135.69v-33.1h-12.41v33.1h12.41ZM134.2,197.75v-12.41h-33.1v12.41h33.1ZM107.31,119.14l10.34,10.34,10.34-10.34-10.34-10.34-10.34,10.34Z" fill-rule="evenodd"/>'},{id:"lim-jongwon",name:"\uC784\uC885\uC6D0",viewBox:"-14 -14 268 268",color:"#e1ff85",svg:'<path d="M185.28,54.89V0H54.89v54.89H0v130.4h54.89v54.72h130.4v-54.72h54.72V54.89h-54.72ZM174.65,65.35v109.29h-109.29v-109.29h109.29Z"/><rect x="11.18" y="11.1" width="32.76" height="32.76" transform="translate(-11.36 27.54) rotate(-45)"/><rect x="196.32" y="11.1" width="32.76" height="32.76" transform="translate(42.87 158.45) rotate(-45)"/><rect x="11.18" y="196.15" width="32.76" height="32.76" transform="translate(-142.21 81.74) rotate(-45)"/><rect x="196.32" y="196.15" width="32.76" height="32.76" transform="translate(-87.99 212.65) rotate(-45)"/>'},{id:"min-jiho",name:"\uBBFC\uC9C0\uD638",viewBox:"-14 -14 268 268",color:"#ccbbff",svg:'<path d="M147.49,226.94c-18.22,4.31-36.68,4.41-54.83-.04l-.37-39.62-28.41,27.73c-16.16-9.95-29.35-22.77-38.62-39.01l27.64-27.94-39.36-.16c-4.66-18.12-4.75-36.64-.06-54.89l39.15-.75-27.35-27.48c8.94-16.19,22.16-29.2,38.62-39.16l28.46,27.74.28-39.66c17.76-4.47,36.14-4.27,54.62-.15l.46,39.77,27.91-27.59c16.46,8.86,29.04,22.27,39.13,38.6l-27.8,28.38,39.61.27c4.61,18.3,4.51,36.73-.08,54.91l-39.38.16,27.31,27.6c-.72,4.91-4.8,7.03-7.05,10.45-7.92,12.07-18.69,20.97-31.46,29.04l-28.21-27.81-.23,39.59ZM120.18,158.92l38.48-38.99-38.52-38.51,27.06-27.57c-17.66-7.1-36.59-7.08-54.26-.02l26.77,27.6-38.57,38.91,39.04,38.58ZM80.77,119.63l-27.24-26.71c-6.95,18.14-7.39,36.73.18,54.69l27.06-27.98ZM186.53,147.42c7.11-18.42,7.12-36.4-.17-54.33l-27.4,27.21,27.57,27.11ZM147.01,186.41l-26.94-27.47-27.28,27.79c18.36,7.27,37.58,7.31,54.22-.32Z"/>'},{id:"ju-bomin",name:"\uC8FC\uBCF4\uBBFC",viewBox:"-14 -14 268 268",color:"#3f66b5",svg:'<path d="M119.99,7.85l-.25-7.85h28.3l.21,6.01.57,5.98.99,5.94,1.38,5.87,1.73,5.77,2.12,5.62,2.48,5.48,2.83,5.31,3.18,5.09,3.5,4.92,3.82,4.63,4.14,4.39,4.39,4.14,4.63,3.82,4.92,3.5,5.09,3.18,5.31,2.83,5.48,2.48,5.62,2.12,5.77,1.73,5.87,1.38,5.94.99,5.98.57,6.01.21v28.3l-7.85-.25-7.85-.78-7.75-1.27-7.68-1.8-7.53-2.26-7.36-2.79-7.18-3.25-6.93-3.71-6.68-4.14-6.4-4.6-6.08-4.99-5.73-5.38-5.38-5.73-4.99-6.08-4.6-6.4-4.14-6.68-3.71-6.93-3.25-7.18-2.79-7.36-2.26-7.53-1.8-7.68-1.27-7.75-.78-7.85ZM240,120.12v28.21l-5.99.21-5.96.56-5.92.99-5.85,1.38-5.75,1.73-5.61,2.12-5.47,2.47-5.29,2.82-5.08,3.17-4.9,3.49-4.62,3.81-4.37,4.13-4.13,4.37-3.81,4.62-3.49,4.9-3.17,5.08-2.82,5.29-2.47,5.47-2.12,5.61-1.73,5.75-1.38,5.85-.99,5.92-.56,5.96-.21,5.99h-28.21l.25-7.83.78-7.83,1.27-7.72,1.8-7.65,2.26-7.51,2.79-7.33,3.24-7.16,3.7-6.91,4.13-6.66,4.58-6.38,4.97-6.06,5.36-5.71,5.71-5.36,6.06-4.97,6.38-4.58,6.66-4.13,6.91-3.7,7.16-3.24,7.33-2.79,7.51-2.26,7.65-1.8,7.72-1.27,7.83-.78,7.83-.25ZM7.83,119.65l-7.83.25v-28.21l5.99-.21,5.96-.56,5.92-.99,5.85-1.38,5.75-1.73,5.61-2.12,5.47-2.47,5.29-2.82,5.08-3.17,4.9-3.49,4.62-3.81,4.37-4.13,4.13-4.37,3.81-4.62,3.49-4.9,3.17-5.08,2.82-5.29,2.47-5.47,2.12-5.61,1.73-5.75,1.38-5.85.99-5.92.56-5.96.21-5.99h28.21l-.25,7.83-.78,7.83-1.27,7.72-1.8,7.65-2.26,7.51-2.79,7.34-3.24,7.16-3.7,6.91-4.13,6.67-4.58,6.38-4.97,6.07-5.36,5.71-5.71,5.36-6.07,4.97-6.38,4.58-6.67,4.13-6.91,3.7-7.16,3.24-7.34,2.79-7.51,2.26-7.65,1.8-7.72,1.27-7.83.78ZM116.34,208.83l1.81,7.69,1.28,7.76.78,7.86.25,7.86h-28.34l-.21-6.02-.57-5.99-.99-5.95-1.38-5.88-1.74-5.77-2.13-5.63-2.48-5.49-2.83-5.31-3.19-5.1-3.51-4.92-3.83-4.64-4.14-4.39-4.39-4.14-4.64-3.83-4.92-3.51-5.1-3.19-5.31-2.83-5.49-2.48-5.63-2.13-5.77-1.74-5.88-1.38-5.95-.99-5.99-.57-6.02-.21v-28.34l7.86.25,7.86.78,7.76,1.28,7.69,1.81,7.55,2.27,7.37,2.8,7.19,3.26,6.94,3.72,6.7,4.14,6.41,4.61,6.09,4.99,5.74,5.38,5.38,5.74,4.99,6.09,4.61,6.41,4.14,6.7,3.72,6.94,3.26,7.19,2.8,7.37,2.27,7.55Z"/>'},{id:"ham-daeyeon",name:"\uD568\uB300\uC5F0",viewBox:"-14 -14 268 268",color:"#7f1616",svg:'<path d="M10.63,46.9l5.01-6.97,4.66-5.72,99.7,85.8L20.3,205.8l-4.66-5.72-5.01-6.97-4.55-7.32-4.05-7.61-2.03-4.44,6.51-2.7,3.27-1.74,6.19-4.16,5.58-4.91,4.91-5.58,2.17-3.02,1.99-3.16,3.27-6.68,2.38-7.04.85-3.63,1-7.36v-7.47l-1-7.36-.85-3.63-2.38-7.04-3.27-6.68-4.16-6.19-4.91-5.58-5.58-4.91-6.19-4.16-3.27-1.74-6.51-2.7,2.03-4.44,4.05-7.61,4.55-7.32ZM120,120L34.2,20.3l5.72-4.66,6.97-5.01,7.32-4.55,7.61-4.05,4.44-2.03,2.7,6.51,1.74,3.27,4.16,6.19,2.35,2.88,5.26,5.26,5.9,4.52,6.44,3.73,3.41,1.53,7.04,2.38,3.63.85,7.36,1h7.47l7.36-1,7.18-1.92,6.9-2.84,3.27-1.74,6.19-4.16,5.58-4.91,4.91-5.58,4.16-6.19,1.74-3.27,2.7-6.51,4.44,2.03,7.61,4.05,7.32,4.55,6.97,5.01,5.72,4.66-85.8,99.7,99.7-85.8,4.66,5.72,5.01,6.97,4.55,7.32,4.05,7.61,2.03,4.44-6.51,2.7-3.27,1.74-6.19,4.16-2.88,2.35-5.26,5.26-4.52,5.9-3.73,6.44-1.53,3.41-2.38,7.04-.85,3.63-1,7.36v7.47l1,7.36,1.92,7.18,1.32,3.48,3.27,6.68,4.16,6.19,4.91,5.58,5.58,4.91,6.19,4.16,3.27,1.74,6.51,2.7-2.03,4.44-4.05,7.61-4.55,7.32-5.01,6.97-4.66,5.72-99.7-85.8,85.8,99.7-5.72,4.66-6.97,5.01-7.32,4.55-7.61,4.05-4.44,2.03-2.7-6.51-1.74-3.27-4.16-6.19-4.91-5.58-2.7-2.56-5.9-4.52-3.16-1.99-6.68-3.27-7.04-2.38-3.63-.85-7.36-1h-7.47l-7.36,1-7.18,1.92-3.48,1.32-6.68,3.27-6.19,4.16-5.58,4.91-4.91,5.58-4.16,6.19-1.74,3.27-2.7,6.51-4.44-2.03-7.61-4.05-7.32-4.55-6.97-5.01-5.72-4.66,85.8-99.7Z"/>'},{id:"youn-taegyun",name:"\uC724\uD0DC\uADE0",viewBox:"-14 -14 268 268",color:"#ffce07",svg:'<path d="M133.33,106.67V0h106.67v40h-66.67v26.67h66.67v40h-106.67ZM133.33,240v-106.67h106.67v40h-66.67v26.67h66.67v40h-106.67ZM106.67,0v106.67H0v-40h66.67v-26.67H0V0h106.67ZM106.67,133.33v106.67H0v-40h66.67v-26.67H0v-40h106.67Z"/>'},{id:"lee-goeun",name:"\uC774\uACE0\uC740",viewBox:"-14 -14 268 268",color:"#eec35a",svg:'<path d="M127.82,239.42c-11.17.29-24.5.07-37.02-3.38l-.14-39.9c0-.58.82-1.54.39-2.55-.45-1.05-2.12-1.08-2.71-.16l-1.4,2.18-27.29,27.56c-17.98-10.36-32.02-24.86-42.67-42.62l29.83-30.25-42.63-.51c-4.91-20.02-5.03-40.34.04-59.96l42.82-.46-29.97-30.57c10.56-17.82,24.8-31.85,42.57-42.56l30.66,30.52.25-43.23c19.79-5.1,40.03-5.06,59.83.03l.14,43.46,30.97-30.75c17.48,10.61,31.85,24.8,42.38,42.5l-29.78,30.41,42.58.61c5.16,19.69,4.91,39.94.05,60.05l-42.46.44c9.71,10.68,19.1,19.49,29.62,29.87-9.83,17.85-24.56,32.39-42.46,42.97l-30.62-30.2-.39,42.78c-6.55,2.14-13.28,3.49-19.64,3.57M90.64,149.62l-.02-59.69,59.65-.05.34,60.11,41.24-.37-28.61-29.84,28.92-29.62-41.7-.43-.37-41.55-29.89,29.13-29.34-28.93-.35,41.52-42.55.38,29.88,29.71-29.55,29.83,41.95.33c.21-.24.43-.39.39-.52ZM91.87,150.04c-.31.54-.71.93-1.24,1.24l.15,40.67,29.69-29.58,29.55,28.9.26-41.3-58.42.05Z"/>'},{id:"ju-yejin",name:"\uC8FC\uC608\uC9C4",viewBox:"-14 -14 268 268",color:"#d5c8ac",svg:'<path d="M.34.26v30h30V.26H.34ZM60.34,30.26V.26l-30,30h30ZM.34,60.26h30v-30L.34,60.26ZM90.34,90.26l-30,30,30,30,30,30,30-30,30-30-30-30-30-30-30,30ZM30.34,180.26H.34l30,30v-30ZM30.34,210.26H.34v30h30v-30ZM60.34,240.26v-30h-30l30,30ZM180.34.26v30h30L180.34.26ZM210.34,30.26h30V.26h-30v30ZM210.34,60.26h30l-30-30v30ZM240.34,180.26h-30v30l30-30ZM180.34,210.26v30l30-30h-30ZM240.34,240.26v-30h-30v30h30Z" fill-rule="evenodd"/>'},{id:"jo-wooseong",name:"\uC870\uC6B0\uC131",viewBox:"-14 -14 268 268",color:"#72a7c1",svg:'<path d="M240,86.31v25.26h-88.42v-23.15h-23.15V0h25.26v86.31h86.31ZM240,128.43v25.26h-86.31v86.31h-25.26v-88.42h23.15v-23.15h88.42ZM98.94,141.06v-42.13h42.13v42.13h-42.13ZM0,86.31h86.31V0h25.26v88.42h-23.15v23.15H0v-25.26ZM86.31,153.69H0v-25.26h88.42v23.15h23.15v88.42h-25.26v-86.31Z"/>'},{id:"kim-hawon",name:"\uAE40\uD558\uC6D0",viewBox:"-14 -14 268 268",color:"#e692ff",svg:'<path d="M35.94,240.06c.13-43.47,37.43-78.68,83.43-78.68s83.31,35.2,83.43,78.68h36.57c-.13-62.57-53.8-113.25-120-113.25S-.5,177.5-.63,240.06h36.57Z"/><path d="M61.88,240.06h26.26c.13-16.21,14.06-29.31,31.24-29.31s31.11,13.1,31.24,29.31h26.26c-.13-29.92-25.82-54.14-57.49-54.14s-57.37,24.22-57.49,54.14Z"/><path d="M202.81.06c-.13,43.47-37.43,78.68-83.43,78.68S36.06,43.53,35.94.06H-.63c.13,62.57,53.8,113.25,120,113.25S239.25,62.63,239.37.06h-36.57Z"/><path d="M176.87.07h-26.26c-.13,16.21-14.06,29.31-31.24,29.31S88.27,16.28,88.14.07h-26.26c.13,29.92,25.82,54.14,57.49,54.14S176.74,29.99,176.87.07Z"/>'},{id:"song-seungbin",name:"\uC1A1\uC2B9\uBE48",viewBox:"-14 -14 268 268",color:"#ffc5c8",svg:'<path d="M240,120l-30.56,30.53-30.53-30.53,30.53-30.53,30.56,30.53ZM82.92,135.28v-30.56l21.79-21.79h30.56l21.79,21.79v30.56l-21.79,21.79h-30.56l-21.79-21.79ZM120,61.1l-30.53-30.53L120,0l30.53,30.56-30.53,30.53ZM150.53,209.44l-30.53,30.56-30.53-30.56,30.53-30.53,30.53,30.53ZM30.56,150.53L0,120l30.56-30.53,30.53,30.53-30.53,30.53Z"/>'},{id:"park-yoonji",name:"\uBC15\uC724\uC9C0",viewBox:"-14 -14 268 268",color:"#065182",svg:'<path d="M60.34,60.26h120v-30h-30V.26h-60v30h-30v30ZM.34,120.26v30h30v30h30V60.26h-30v30H.34v30ZM180.34,120.26v60h30v-30h30v-60h-30v-30h-30v60ZM60.34,210.26h30v30h60v-30h30v-30H60.34v30Z" fill-rule="evenodd"/>'},{id:"kim-jiyoon",name:"\uAE40\uC9C0\uC724",viewBox:"-14 -14 268 268",color:"#ff7154",svg:'<path d="M193.67.12h46.33v46.33h-46.33V.12ZM240,240.12h-46.33v-46.33h46.33v46.33ZM90.54,132.75v-25.26l16.83-16.83h25.26l16.83,16.83v25.26l-16.83,16.83h-25.26l-16.83-16.83ZM46.33.12v46.33H0V.12h46.33ZM46.33,193.79v46.33H0v-46.33h46.33Z"/>'},{id:"noh-minyeong",name:"\uB178\uBBFC\uC601",viewBox:"-14 -14 268 268",color:"#c4272f",svg:'<path d="M153.33,26.67V0h86.67v86.67h-26.67V26.67h-60ZM153.33,240v-26.67h60v-60h26.67v86.67h-86.67ZM153.33,63.33v-20h43.33v43.33h-20v-23.33h-23.33ZM153.33,196.67v-20h23.33v-23.33h20v43.33h-43.33ZM0,153.33h26.67v60h60v26.67H0v-86.67ZM26.67,86.67H0V0h86.67v26.67H26.67v60ZM43.33,153.33h20v23.33h23.33v20h-43.33v-43.33ZM63.33,86.67h-20v-43.33h43.33v20h-23.33v23.33Z"/>'},{id:"kwon-minseong",name:"\uAD8C\uBBFC\uC131",viewBox:"-14 -14 268 268",color:"#4f00b4",svg:'<circle cx="119.84" cy="118.02" r="13.21"/><path d="M240.1,95.81V-.17S141.63-.17,141.63-.17c49.47,8.76,88.67,47.03,98.48,95.98Z"/><path d="M141.63,239.83h98.48v-95.98c-9.81,48.95-49.01,87.22-98.48,95.98Z"/><path d="M98.58-.17H.1v95.98C9.91,46.86,49.12,8.59,98.58-.17Z"/><path d="M.1,143.85v95.98h98.48C49.12,231.07,9.91,192.79.1,143.85Z"/>'},{id:"kim-hyejin",name:"\uAE40\uD61C\uC9C4",viewBox:"-14 -14 268 268",color:"#178466",svg:'<path d="M132.22,10l97.78,97.78h-97.78V10ZM230,132.22l-97.78,97.78v-97.78h97.78ZM10,107.78L107.78,10v97.78H10ZM107.78,230L10,132.22h97.78v97.78Z"/>'},{id:"yoo-hyejin",name:"\uC720\uD61C\uC9C4",viewBox:"-14 -14 268 268",color:"#8bff6c",svg:'<path d="M150.51,221.71l26.55-26.55-26.55-26.52,18.21-18.21,26.52,26.55,26.55-26.55,18.21,18.21-26.55,26.52,26.55,26.55-18.21,18.21-26.55-26.55-26.52,26.55-18.21-18.21ZM195.24,62.86l-26.52,26.55-18.21-18.21,26.55-26.52-26.55-26.55L168.72-.08l26.52,26.55L221.8-.08l18.21,18.21-26.55,26.55,26.55,26.52-18.21,18.21-26.55-26.55ZM44.77,176.97l26.52-26.55,18.21,18.21-26.55,26.52,26.55,26.55-18.21,18.21-26.52-26.55-26.55,26.55L0,221.71l26.55-26.55L0,168.63l18.21-18.21,26.55,26.55ZM89.5,18.12l-26.55,26.55,26.55,26.52-18.21,18.21-26.52-26.55-26.55,26.55L0,71.2l26.55-26.52L0,18.12,18.21-.08l26.55,26.55L71.29-.08l18.21,18.21Z"/>'},{id:"kim-sungeun",name:"\uAE40\uC131\uC740",viewBox:"-14 -14 268 268",color:"#a8f0db",svg:'<path d="M240,0v40L200,0h40ZM240,240h-40l40-40v40ZM193.33,120l26.67,26.67-26.67,26.67-53.33-53.33,53.33-53.33,26.67,26.67-26.67,26.67ZM120,46.67l26.67-26.67,26.67,26.67-53.33,53.33-53.33-53.33,26.67-26.67,26.67,26.67ZM120,193.33l-26.67,26.67-26.67-26.67,53.33-53.33,53.33,53.33-26.67,26.67-26.67-26.67ZM46.67,120l-26.67-26.67,26.67-26.67,53.33,53.33-53.33,53.33-26.67-26.67,26.67-26.67ZM0,0h40L0,40V0ZM0,240v-40l40,40H0Z"/>'},{id:"park-yuna",name:"\uBC15\uC724\uC544",viewBox:"-14 -14 268 268",color:"#bdffbf",svg:'<path d="M225.26,134.66h-18.95l-14.72-14.75,14.72-14.75h18.95l14.75,14.75-14.75,14.75ZM120,183.07l-63.16-63.16,63.16-63.16,63.16,63.16-63.16,63.16ZM105.26,225.17v-18.95l14.75-14.72,14.75,14.72v18.95l-14.75,14.75-14.75-14.75ZM134.75,33.61l-14.75,14.72-14.75-14.72V14.66L120-.08l14.75,14.75v18.95ZM33.7,105.17l14.72,14.75-14.72,14.75H14.75L0,119.92l14.75-14.75h18.95Z"/>'},{id:"go-biju",name:"\uACE0\uBE44\uC8FC",viewBox:"-14 -14 268 268",color:"#50c4a6",svg:'<path d="M167.3,9.57l-.47-4.77-.17-4.8h73.33v73.33l-4.8-.17-4.77-.47-4.73-.77-4.67-1.1-4.6-1.4-4.5-1.67-4.37-2-4.23-2.27-4.07-2.53-3.9-2.8-3.73-3.03-3.5-3.27-3.27-3.5-3.03-3.73-2.8-3.9-2.53-4.07-2.27-4.23-2-4.37-1.67-4.5-1.4-4.6-1.1-4.67-.77-4.73ZM235.2,166.83l4.8-.17v73.33h-73.33l.17-4.8.47-4.77.77-4.73,1.1-4.67,1.4-4.6,1.67-4.5,2-4.37,2.27-4.23,2.53-4.07,2.8-3.9,3.03-3.73,3.27-3.5,3.5-3.27,3.73-3.03,3.9-2.8,4.07-2.53,4.23-2.27,4.37-2,4.5-1.67,4.6-1.4,4.67-1.1,4.73-.77,4.77-.47ZM163.33,120l-.37,5.67-1.1,5.53-.83,2.73-2.17,5.23-1.33,2.5-1.5,2.4-3.47,4.5-4,4-2.2,1.8-4.7,3.17-2.5,1.33-5.23,2.17-2.73.83-5.53,1.1-2.83.27-2.83.1-5.67-.37-2.8-.47-5.47-1.47-2.63-1-5.1-2.5-4.7-3.17-2.2-1.8-4-4-1.8-2.2-3.17-4.7-1.33-2.5-2.17-5.23-.83-2.73-1.1-5.53-.27-2.83-.1-2.83.37-5.67,1.1-5.53.83-2.73,1-2.63,2.5-5.1,3.17-4.7,1.8-2.2,4-4,2.2-1.8,2.3-1.67,4.9-2.83,2.6-1.17,5.37-1.83,5.53-1.1,2.83-.27,2.83-.1,5.67.37,5.53,1.1,2.73.83,2.63,1,5.1,2.5,2.4,1.5,4.5,3.47,4,4,1.8,2.2,1.67,2.3,2.83,4.9,2.17,5.23.83,2.73,1.1,5.53.37,5.67ZM9.57,72.7l-4.77.47-4.8.17V0h73.33l-.17,4.8-.47,4.77-.77,4.73-1.1,4.67-1.4,4.6-1.67,4.5-2,4.37-2.27,4.23-2.53,4.07-2.8,3.9-3.03,3.73-3.27,3.5-3.5,3.27-3.73,3.03-3.9,2.8-4.07,2.53-4.23,2.27-4.37,2-4.5,1.67-4.6,1.4-4.67,1.1-4.73.77ZM70.83,221.03l1.1,4.67.77,4.73.47,4.77.17,4.8H0v-73.33l4.8.17,4.77.47,4.73.77,4.67,1.1,4.6,1.4,4.5,1.67,4.37,2,4.23,2.27,4.07,2.53,3.9,2.8,3.73,3.03,3.5,3.27,3.27,3.5,3.03,3.73,2.8,3.9,2.53,4.07,2.27,4.23,2,4.37,1.67,4.5,1.4,4.6Z"/>'},{id:"kim-dahyun",name:"\uAE40\uB2E4\uD604",viewBox:"-14 -14 268 268",color:"#d33bff",svg:'<path d="M119.27,104.35l.77,7.83.27,7.83.27-7.83.77-7.83,1.27-7.73,1.8-7.67,2.27-7.5,2.77-7.37,3.23-7.13,3.7-6.93,4.17-6.67,4.57-6.4,4.97-6.07,5.37-5.73,5.73-5.37,6.07-4.97,6.4-4.57,6.67-4.17,6.93-3.7,7.13-3.23,7.37-2.77,7.5-2.27,7.67-1.8,7.73-1.27,7.83-.77,7.83-.27v240l-7.83-.27-7.83-.77-7.73-1.27-7.67-1.8-7.5-2.27-7.37-2.77-7.13-3.23-6.93-3.7-6.67-4.17-6.4-4.57-6.07-4.97-5.73-5.37-5.37-5.73-4.97-6.07-4.57-6.4-4.17-6.67-3.7-6.93-3.23-7.13-2.77-7.37-2.27-7.5-1.8-7.67-1.27-7.73-.77-7.83-.27-7.83-.27,7.83-.77,7.83-1.27,7.73-1.8,7.67-2.27,7.5-2.77,7.37-3.23,7.13-3.7,6.93-4.17,6.67-4.57,6.4-4.97,6.07-5.37,5.73-5.73,5.37-6.07,4.97-6.4,4.57-6.67,4.17-6.93,3.7-7.13,3.23-7.37,2.77-7.5,2.27-7.67,1.8-7.73,1.27-7.83.77-7.83.27V.02l7.83.27,7.83.77,7.73,1.27,7.67,1.8,7.5,2.27,7.37,2.77,7.13,3.23,6.93,3.7,6.67,4.17,6.4,4.57,6.07,4.97,5.73,5.37,5.37,5.73,4.97,6.07,4.57,6.4,4.17,6.67,3.7,6.93,3.23,7.13,2.77,7.37,2.27,7.5,1.8,7.67,1.27,7.73Z"/>'}];var Z1=qo.filter(({color:i})=>{let[e,t,n]=i.slice(1).match(/../g).map(s=>{let r=parseInt(s,16)/255;return r<=.04045?r/12.92:((r+.055)/1.055)**2.4});return 1.05/(.2126*e+.7152*t+.0722*n+.05)>=2.3});function Nl(){let i=new Set;return e=>{let t=Z1.filter(s=>!i.has(s.color)),n=t[Math.floor(Math.random()*t.length)];e.icon&&i.delete(e.icon.color),i.add(n.color),e.icon=n,e.word.style.setProperty("--keyword-color",n.color),e.glyph.dataset.iconId=n.id,e.glyph.innerHTML=`<svg viewBox="${n.viewBox}" fill="currentColor" aria-hidden="true">${n.svg}</svg>`}}function Dl(i,e){let t=e.matches?[{opacity:0},{opacity:1,offset:.25},{opacity:0}]:[{opacity:0,transform:"translate(0,.12em) rotate(-12deg) scale(.25)"},{opacity:1,transform:"translate(.18em,-.28em) rotate(14deg) scale(1.25)",offset:.25},{opacity:1,transform:"translate(.28em,-.12em) rotate(30deg) scale(.90)",offset:.55},{opacity:0,transform:"translate(.42em,-.30em) rotate(48deg) scale(.20)"}];return i.animate(t,{duration:e.matches?240:480,easing:"cubic-bezier(.22,.7,.3,1)"})}var gf=i=>Math.max(0,Math.min(1,i));function Lm(i,e){let t=Nl(),n=[...i.querySelectorAll("[data-keyword]")].map(p=>{let E=p.querySelector("[data-read]"),M=document.createElement("span");M.className="keyword-pop",M.setAttribute("aria-hidden","true"),E.append(M);let _={row:p,word:E,glyph:M,completed:!1,animation:null,started:!1,recolor:!1,icon:null};return t(_),_}),s=i.querySelector(".reading-line:not([data-keyword]) [data-read]");Ll(i.querySelector(".individuality-title"),e);let r=n.length+.7,o=0,a=0,c=0,l=0,h=!1,u=null;function f(p){p&&(p.animation?.cancel(),p.animation=null,p.completed&&(p.row.dataset.phase="complete"),u===p&&(u=null))}function d(p){f(u);let E=p.word.getBoundingClientRect();if(E.bottom<=70||E.top>=innerHeight)return;u=p;let M=Dl(p.glyph,e);p.animation=M,p.row.dataset.phase="pop",M.onfinish=()=>{p.animation===M&&f(p)}}function m(p=!0){let E=a*r;n.forEach((M,_)=>{let S=E-_,w=gf(S/.52);S<=0?(M.started&&(M.recolor=!0),M.started=!1):M.started||(M.recolor&&t(M),M.started=!0,M.recolor=!1),M.word.style.setProperty("--read-fill",`${w*100}%`),w<1?(f(M),M.completed=!1,M.row.dataset.phase=S<=0?"waiting":"text"):M.completed||(M.completed=!0,p&&d(M)),w===1&&(M.row.dataset.phase=M.animation?"pop":"complete")}),s.style.setProperty("--read-fill",`${gf((E-n.length)/.7)*100}%`)}function y(p){let E=Math.min(.05,(p-l)/1e3||.016666666666666666);l=p,a+=(o-a)*(1-Math.exp(-E/.09)),Math.abs(o-a)<5e-5&&(a=o),m(),c=a===o?0:requestAnimationFrame(y)}function g(p){o=gf(p);let E=i.getBoundingClientRect(),M=E.bottom<=0||E.top>=innerHeight;if(!h||M||e.matches){c&&cancelAnimationFrame(c),c=0,M&&f(u),a=o,m(h&&!M),h=!0;return}!c&&a!==o&&(l=performance.now(),c=requestAnimationFrame(y))}return e.addEventListener("change",()=>{f(u),g(o)}),m(!1),{update:g}}var xf=.65,Nm=.9,Y1=i=>{let e=Math.max(0,Math.min(1,i));return e*e*(3-2*e)};function Dm(i,e){let t=Nl(),n=new Map,s=null;i.forEach((a,c)=>{let l=a.querySelector("[data-caption-keyword]");if(!l)return;let h=document.createElement("span"),u=document.createElement("span");h.className="caption-keyword-color",h.dataset.label=l.textContent,h.setAttribute("aria-hidden","true"),u.className="keyword-pop",u.setAttribute("aria-hidden","true"),l.append(h,u);let f={word:l,glyph:u,icon:null,started:!1,recolor:!1,completed:!1,animation:null};t(f),n.set(c,f)});function r(a){a&&(a.animation?.cancel(),a.animation=null,s===a&&(s=null))}function o(a){r(s);let c=a.word.getBoundingClientRect();if(c.bottom<=70||c.top>=innerHeight)return;s=a;let l=Dl(a.glyph,e);a.animation=l,l.onfinish=()=>{a.animation===l&&(r(a),a.word.dataset.phase="complete")}}return e.addEventListener("change",()=>{n.forEach(a=>{r(a),a.word.dataset.phase=a.completed?"complete":"color"})}),{update(a,c,l){let h=n.get(a);if(!h)return;let u=Y1((c-xf)/Nm);c<=xf?(h.started&&(h.recolor=!0),h.started=!1):h.started||(h.recolor&&t(h),h.started=!0,h.recolor=!1),h.word.style.setProperty("--keyword-tint",String(u)),u<1?(r(h),h.completed=!1):h.completed||(h.completed=!0,l>.9&&c<xf+Nm+.55&&o(h)),l<.05&&r(h),h.word.dataset.phase=h.animation?"pop":u===1?"complete":u>0?"color":"waiting"}}}function Um(i){let e=[...i.querySelectorAll(".construction-tool")],t=0,n=!1;function s(){e.forEach((r,o)=>{r.setAttribute("aria-pressed",String(n&&o===t)),r.tabIndex=n&&o===t?0:-1})}return e.forEach((r,o)=>{r.addEventListener("click",()=>{n&&(t=o,i.classList.add("is-tool-manual"),s())}),r.addEventListener("keydown",a=>{if(!n||a.altKey||a.ctrlKey||a.metaKey)return;let c=a.key==="ArrowRight"?(o+1)%e.length:a.key==="ArrowLeft"?(o+e.length-1)%e.length:a.key==="Home"?0:a.key==="End"?e.length-1:null;c!==null&&(a.preventDefault(),e.forEach((l,h)=>{l.tabIndex=h===c?0:-1}),e[c].focus({preventScroll:!0}))})}),s(),{update(r,o){r===0&&(t=0,i.classList.remove("is-tool-manual"));let a=r===1&&o<1;a!==n&&(n=a,!n&&i.contains(document.activeElement)&&document.activeElement.blur(),i.inert=!n,i.setAttribute("aria-hidden",String(!n)),i.classList.toggle("is-tool-selected",n),s())}}}var Om=i=>Math.max(0,Math.min(1,i)),Cr=i=>{let e=Om(i);return e*e*(3-2*e)},Ul=[Wo,al,xn[1].start,xn[2].start+1.5],_f=ef-gl-Qu,yf=2.4,J1=_f+yf;function Fm(){let i=Pm(),e=[...document.querySelectorAll("[data-caption]")],t=document.querySelector(".construction-bar"),n=Um(t),s=document.querySelector(".hero-heading"),r=document.querySelector(".section-year"),o=matchMedia("(prefers-reduced-motion: reduce)");Ll(s,o,"[data-hover-text]");let a=Dm(e,o),c=document.querySelector("#content01"),l=Lm(c,o),h=-1,u=0;function f(){t.style.setProperty("--bar-scale",String(Math.min(1,Math.max(0,innerWidth-40)/308))),d()}function d(){for(let y of[s,r]){let g=Cr((innerHeight*.64-y.getBoundingClientRect().top)/(innerHeight*.44));y.style.opacity=String((y===r?.7:1)*(1-g)),y.style.filter=`blur(${o.matches?0:g*12}px)`}u=Om((innerHeight*.6-c.getBoundingClientRect().top)/innerHeight),l.update(u)}function m(y){i.setAutoHideProgress(Cr((y-_f)/yf));let g=Cr((y-Wo)/.55),p=Cr((y-xn[1].start)/.55),E=g*(1-p);t.style.opacity=String(E),t.style.visibility=E>0?"visible":"hidden",t.style.transform=`translate(-50%,${o.matches?0:(1-g+p)*66}px) scale(var(--bar-scale,1))`,n.update(g,p),h=-1,Ul.forEach((M,_)=>{y>=M&&(h=_)}),y>=J1&&(h=-1),e.forEach((M,_)=>{let S=Cr((y-Ul[_])/.55),w=_===e.length-1,R=Cr((y-(w?_f:Ul[_+1]))/(w?yf:.55)),x=S*(1-R);M.style.opacity=String(x),M.style.filter=`blur(${o.matches?0:(1-S+R)*10}px)`,M.style.transform=`translateY(${o.matches?0:(1-S)*10-R*10}px)`,M.setAttribute("aria-hidden",String(_!==h)),a.update(_,y-Ul[_],x)})}return addEventListener("scroll",d,{passive:!0}),addEventListener("resize",f),f(),m(0),{update:m,inspect:()=>({caption:h,reading:u,text:e[h]?.textContent.trim()})}}var Bm=new wt,Ol=new U,Ir=class extends Ro{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new mt(e,3)),this.setAttribute("uv",new mt(t,2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new Xi(t,6,1);return this.setAttribute("instanceStart",new dn(n,3,0)),this.setAttribute("instanceEnd",new dn(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new Xi(t,6,1);return this.setAttribute("instanceColorStart",new dn(n,3,0)),this.setAttribute("instanceColorEnd",new dn(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new Mo(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wt);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Bm.setFromBufferAttribute(t),this.boundingBox.union(Bm))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fn),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Ol.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ol)),Ol.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ol));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}};be.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new ue},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Qt.line={uniforms:zo.merge([be.common,be.fog,be.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		float trimSegmentAlpha( const in vec4 start, const in vec4 end ) {

			// compute the interpolation factor needed to trim the segment so it terminates
			// between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column

			// we need different nearEstimate formula for reversed and default depth buffer
			// a is positive with a reversed depth buffer so it can be used for controlling the code flow
			float nearEstimate = ( a > 0.0 ) ? ( - b / ( a + 1.0 ) ) : ( - 0.5 * b / a );

			return ( nearEstimate - start.z ) / ( end.z - start.z );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef USE_DASH

				float lineDistanceStart = dashScale * instanceDistanceStart;
				float lineDistanceEnd = dashScale * instanceDistanceEnd;

			#endif

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( start, end );
					end.xyz = mix( start.xyz, end.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceEnd = mix( lineDistanceStart, lineDistanceEnd, alpha );

					#endif

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( end, start );
					start.xyz = mix( end.xyz, start.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceStart = mix( lineDistanceEnd, lineDistanceStart, alpha );

					#endif

				}

			}

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? lineDistanceStart : lineDistanceEnd;
				vUv = uv;

			#endif

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

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

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};var Pr=class extends $t{constructor(e){super({type:"LineMaterial",uniforms:zo.clone(Qt.line.uniforms),vertexShader:Qt.line.vertexShader,fragmentShader:Qt.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};var vf=new at,zm=new U,km=new U,Bt=new at,zt=new at,ai=new at,Mf=new U,Sf=new tt,kt=new Co,Vm=new U,Fl=new wt,Bl=new fn,ci=new at,li,Ts;function Hm(i,e,t){return ci.set(0,0,-e,1).applyMatrix4(i.projectionMatrix),ci.multiplyScalar(1/ci.w),ci.x=Ts/t.width,ci.y=Ts/t.height,ci.applyMatrix4(i.projectionMatrixInverse),ci.multiplyScalar(1/ci.w),Math.abs(Math.max(ci.x,ci.y))}function $1(i,e){let t=i.matrixWorld,n=i.geometry,s=n.attributes.instanceStart,r=n.attributes.instanceEnd,o=Math.min(n.instanceCount,s.count);for(let a=0,c=o;a<c;a++){kt.start.fromBufferAttribute(s,a),kt.end.fromBufferAttribute(r,a),kt.applyMatrix4(t);let l=new U,h=new U;li.distanceSqToSegment(kt.start,kt.end,h,l),h.distanceTo(l)<Ts*.5&&e.push({point:h,pointOnLine:l,distance:li.origin.distanceTo(h),object:i,face:null,faceIndex:a,uv:null,uv1:null})}}function K1(i,e,t){let n=e.projectionMatrix,r=i.material.resolution,o=i.matrixWorld,a=i.geometry,c=a.attributes.instanceStart,l=a.attributes.instanceEnd,h=Math.min(a.instanceCount,c.count),u=-e.near;li.at(1,ai),ai.w=1,ai.applyMatrix4(e.matrixWorldInverse),ai.applyMatrix4(n),ai.multiplyScalar(1/ai.w),ai.x*=r.x/2,ai.y*=r.y/2,ai.z=0,Mf.copy(ai),Sf.multiplyMatrices(e.matrixWorldInverse,o);for(let f=0,d=h;f<d;f++){if(Bt.fromBufferAttribute(c,f),zt.fromBufferAttribute(l,f),Bt.w=1,zt.w=1,Bt.applyMatrix4(Sf),zt.applyMatrix4(Sf),Bt.z>u&&zt.z>u)continue;if(Bt.z>u){let M=Bt.z-zt.z,_=(Bt.z-u)/M;Bt.lerp(zt,_)}else if(zt.z>u){let M=zt.z-Bt.z,_=(zt.z-u)/M;zt.lerp(Bt,_)}Bt.applyMatrix4(n),zt.applyMatrix4(n),Bt.multiplyScalar(1/Bt.w),zt.multiplyScalar(1/zt.w),Bt.x*=r.x/2,Bt.y*=r.y/2,zt.x*=r.x/2,zt.y*=r.y/2,kt.start.copy(Bt),kt.start.z=0,kt.end.copy(zt),kt.end.z=0;let y=kt.closestPointToPointParameter(Mf,!0);kt.at(y,Vm);let g=gt.lerp(Bt.z,zt.z,y),p=g>=-1&&g<=1,E=Mf.distanceTo(Vm)<Ts*.5;if(p&&E){kt.start.fromBufferAttribute(c,f),kt.end.fromBufferAttribute(l,f),kt.start.applyMatrix4(o),kt.end.applyMatrix4(o);let M=new U,_=new U;li.distanceSqToSegment(kt.start,kt.end,_,M),t.push({point:_,pointOnLine:M,distance:li.origin.distanceTo(_),object:i,face:null,faceIndex:f,uv:null,uv1:null})}}}var zl=class extends St{constructor(e=new Ir,t=new Pr({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,s=new Float32Array(2*t.count);for(let o=0,a=0,c=t.count;o<c;o++,a+=2)zm.fromBufferAttribute(t,o),km.fromBufferAttribute(n,o),s[a]=a===0?0:s[a-1],s[a+1]=s[a]+zm.distanceTo(km);let r=new Xi(s,2,1);return e.setAttribute("instanceDistanceStart",new dn(r,1,0)),e.setAttribute("instanceDistanceEnd",new dn(r,1,1)),this}raycast(e,t){let n=this.material.worldUnits,s=e.camera;if(s===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),n===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;li=e.ray;let o=this.matrixWorld,a=this.geometry,c=this.material;Ts=c.linewidth+r,a.boundingSphere===null&&a.computeBoundingSphere(),Bl.copy(a.boundingSphere).applyMatrix4(o);let l;if(n)l=Ts*.5;else{let u=Math.max(s.near,Bl.distanceToPoint(li.origin));l=Hm(s,u,c.resolution)}if(Bl.radius+=l,li.intersectsSphere(Bl)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Fl.copy(a.boundingBox).applyMatrix4(o);let h;if(n)h=Ts*.5;else{let u=Math.max(s.near,Fl.distanceToPoint(li.origin));h=Hm(s,u,c.resolution)}Fl.expandByScalar(h),li.intersectsBox(Fl)!==!1&&(n?$1(this,t):K1(this,s,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(vf),this.material.uniforms.resolution.value.set(vf.z,vf.w))}};function j1(i){let e=[],t=i.caster.height,n=t/2,s=(r,o)=>e.push(...r,...o);for(let r of i.caster.contours){let o=r.points.filter((a,c,l)=>!c||Math.hypot(a[0]-l[c-1][0],a[1]-l[c-1][1])>1e-5);o.length<3||(Math.hypot(o[0][0]-o.at(-1)[0],o[0][1]-o.at(-1)[1])<1e-5&&o.pop(),o.forEach((a,c)=>{let l=o[(c+o.length-1)%o.length],h=o[(c+1)%o.length];for(let d of[-n,n])s([a[0],d,a[1]],[h[0],d,h[1]]);let u=new ue(a[0]-l[0],a[1]-l[1]).normalize(),f=new ue(h[0]-a[0],h[1]-a[1]).normalize();u.dot(f)<.78&&s([a[0],-n,a[1]],[a[0],n,a[1]])}))}return new Ir().setPositions(e)}function Gm(i,e){let t=matchMedia("(prefers-reduced-motion: reduce)"),n=new yr({alpha:!0,antialias:!0,powerPreference:"low-power"});n.setClearColor(16777215,0),n.autoClear=!1,n.outputColorSpace=yt,n.domElement.className="hero-nebula-canvas",i.append(n.domElement);let s=new Wi(-1,1,1,-1,.1,4e3);s.position.z=2e3,s.lookAt(0,0,0);let r=new Kn,o=ji(210426),a=[],c=e.map(x=>({source:x,outline:j1(x)})),l=new Ve("#819098");for(let x=0;x<e.length*2;x++){let T=c[x*13%c.length],N=new Pr({color:l,linewidth:.9,transparent:!0,opacity:.55,depthTest:!1,depthWrite:!1}),C=new zl(T.outline,N);r.add(C),a.push({wire:C,asset:T,offset:o()+o()+o()-1.5,size:.64+o()*.95,pitch:(o()-.5)*.85,yaw:(o()-.5)*1.2,roll:(o()-.5)*Math.PI*2,speed:.008+o()*.004,spin:(o()-.5)*.07,seed:o()*Math.PI*2})}let h=1,u=1,f=0,d=0,m=0,y=!0,g=0,p=!1;function E(x){let T=h<650,N=e.length*(T?1:2),C=T?46:92,D=Math.max(C*2.25,h*.14);a.forEach((F,W)=>{let k=W<N;if(F.wire.visible=k,!k)return;let j=((W+.5)/N+x*F.speed)%1,X=(j*(h+D*2)-D)/h,G=Math.sin(Math.PI*Math.max(0,Math.min(1,X))),le=Math.min(u*.2,h*.2)*(.48+.52*G),he=F.offset*le+Math.sin(x*.25+F.seed)*le*.1,_e=h*X-he*.36,ye=u*(.02+.72*X+.035*Math.sin(X*Math.PI*2))+he,Be=C*F.size*(.8+.2*G);F.wire.position.set(_e-h/2,u/2-ye,Math.sin(F.seed)*80),F.wire.rotation.set(Math.PI/2+F.pitch+Math.sin(x*.13+F.seed)*.1,F.yaw,F.roll+x*F.spin),F.wire.scale.setScalar(Be/F.asset.source.size)})}function M(){E(f),n.clear(),n.render(r,s),g++,i.classList.add("is-ready")}function _(x){if(m=0,!y||document.hidden)return;if(d&&x-d<32){m=requestAnimationFrame(_);return}let T=d?Math.min((x-d)/1e3,.1):1/60;d=x;let N=!p&&!t.matches;N&&(f+=T),M(),N&&(m=requestAnimationFrame(_))}function S(){!m&&y&&!document.hidden&&(d=0,m=requestAnimationFrame(_))}function w(){h=i.clientWidth,u=i.clientHeight;let x=Math.min(devicePixelRatio||1,1.75);n.setPixelRatio(x),n.setSize(h,u,!1),s.left=-h/2,s.right=h/2,s.top=u/2,s.bottom=-u/2,s.updateProjectionMatrix(),a.forEach(T=>{T.wire.material.linewidth=h<650?.8:.9}),M(),S()}return new IntersectionObserver(([x])=>{y=x.isIntersecting&&x.intersectionRatio>.001,y?S():(cancelAnimationFrame(m),m=0,d=0)},{threshold:.001}).observe(i),new ResizeObserver(w).observe(i),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(m),m=0):S()}),t.addEventListener("change",()=>{cancelAnimationFrame(m),m=0,S()}),w(),{inspect:()=>({ready:g>0,sourceCount:e.length,count:a.filter(x=>x.wire.visible).length,baseSize:h<650?46:92,elapsed:f,frames:g,visible:y,paused:!m,width:h,height:u,mode:"neutral-contour-stream"}),renderAt(x){p=!0,cancelAnimationFrame(m),m=0,f=x,M()},play(){p=!1,S()},exportPNG(){return M(),n.domElement.toDataURL("image/png")}}}function Wm(i,e,t,n){let o=new WeakMap,a=[],c=0,l=0,h=!1,u={ready:!1,total:0,completed:0,batches:0,maxBatchMs:0,error:null},f=E=>Array.isArray(E.material)?E.material:[E.material],d=E=>[E.geometry?.uuid,...f(E).flatMap(M=>[M.uuid,M.version,M.map?.uuid,M.map?.version])].join(":");function m(E){let M=i.getViewport(new at),_=i.getScissor(new at),S=i.getScissorTest(),w=i.autoClear,R=e.background,x=t.layers.mask,T=new Map,N=new Map,C=new Map,D=F=>{T.has(F)||T.set(F,{visible:F.visible,mask:F.layers.mask,culled:F.frustumCulled})};try{i.autoClear=!1,e.background=null,i.setViewport(0,0,1,1),i.setScissor(0,0,1,1),i.setScissorTest(!0),t.layers.set(31),e.traverse(F=>{F.isLight&&(D(F),F.layers.enable(31))});for(let{object:F}of E){D(F),F.visible=!0,F.frustumCulled=!1,F.layers.enable(31);for(let k=F.parent;k;k=k.parent)D(k),k.visible=!0;for(let k of f(F))N.has(k)||N.set(k,{colorWrite:k.colorWrite,depthWrite:k.depthWrite}),k.colorWrite=!1,k.depthWrite=!1;let W=F.geometry;W&&!C.has(W)&&(C.set(W,{...W.drawRange}),W.setDrawRange(0,Math.min(3,W.index?.count||W.attributes.position.count)))}i.render(e,t)}finally{for(let[F,W]of C)F.setDrawRange(W.start,W.count);for(let[F,W]of N)Object.assign(F,W);for(let[F,W]of T)F.visible=W.visible,F.layers.mask=W.mask,F.frustumCulled=W.culled;t.layers.mask=x,e.background=R,i.autoClear=w,i.setViewport(M),i.setScissor(_),i.setScissorTest(S)}}function y(){l||h||!a.length||document.hidden||(l=window.requestIdleCallback?requestIdleCallback(g,{timeout:120}):setTimeout(g,16))}async function g(){if(l=0,h||document.hidden)return;h=!0;let E=c,M=a.splice(0,12);try{if(await Promise.all(M.map(({object:S})=>i.compileAsync(S,t,e))),E!==c)return;let _=performance.now();m(M),u.maxBatchMs=Math.max(u.maxBatchMs,performance.now()-_);for(let{object:S}of M)o.set(S,d(S));u.completed+=M.length,u.batches++,a.length||(u.ready=!0,n())}catch(_){E===c&&(u.error=String(_),a=[])}finally{h=!1,y()}}function p(){c++;let E=[];e.traverse(M=>{M.material&&(M.isMesh||M.isLine||M.isPoints||M.isSprite)&&E.push(M)}),a=E.filter(M=>o.get(M)!==d(M)).map(M=>({object:M})),a.sort((M,_)=>(M.object.isInstancedMesh?0:M.object.isMesh?1:2)-(_.object.isInstancedMesh?0:_.object.isMesh?1:2)),u={ready:a.length===0,total:E.length,completed:E.length-a.length,batches:0,maxBatchMs:0,error:null},y()}return document.addEventListener("visibilitychange",y),i.domElement.addEventListener("webglcontextrestored",()=>{o=new WeakMap,p()}),{prepare:p,inspect:()=>({...u,pending:u.total-u.completed})}}var Zo=.85,Ef=i=>Math.max(0,Math.min(1,i)),bf=i=>{let e=Ef(i);return e*e*(3-2*e)};function Xm(i,e,t,n){let s=window.MainIntro,r=i.closest(".animation-stage"),o=document.createElement("canvas");o.className="intro-scatter-canvas",o.setAttribute("aria-hidden","true"),r.append(o);let a=o.getContext("2d"),c=new Map,l=null,h=0,u=0,f=!1;function d(S){if(c.has(S.icon.id))return c.get(S.icon.id);let w=new Path2D;for(let{points:R}of S.caster.contours){w.moveTo(...R[0]);for(let x of R.slice(1))w.lineTo(...x);w.closePath()}return c.set(S.icon.id,w),w}function m(){h=i.clientWidth,u=i.clientHeight;let S=Math.min(devicePixelRatio||1,2);o.width=Math.round(h*S),o.height=Math.round(u*S),a.setTransform(S,0,0,S,0,0);let w=window.MainHeroIntro?.targets()||[],R=(T,N)=>{let C=new U(T,.003,N).project(n);return{x:(C.x+1)*h/2,y:(1-C.y)*u/2}},x=[...e,...t()].map(T=>{let N=e[T.sourceIndex??T.index],C=T.mesh.position.x,D=T.mesh.position.z,F=R(C,D),W=R(C+1,D);return{source:N,path:d(N),x:F.x,y:F.y,scale:Math.hypot(W.x-F.x,W.y-F.y),angle:Math.atan2(W.y-F.y,W.x-F.x)}}).sort((T,N)=>Math.hypot(T.x-h/2,T.y-u/2)-Math.hypot(N.x-h/2,N.y-u/2));l=x.map((T,N)=>{let C=w[N]||{x:h*(.5+Math.cos(N*2.39996)*1.2),y:u*(.5+Math.sin(N*2.39996)*1.2),size:12};return{...T,target:C,delay:Math.min(.12,N/x.length*.12)}})}function y(S){let w=Ef(S),R=s.complete;if(s.progress=w,s.complete=w>=.99999,document.body.classList.toggle("intro-before-main",!s.complete),document.body.classList.toggle("intro-scattering",w>0&&!s.complete),document.getElementById("mainIntro").inert=s.complete,w>0&&w<1){(!l||h!==i.clientWidth||u!==i.clientHeight)&&m(),a.fillStyle="#fff",a.fillRect(0,0,h,u);for(let x of l){let T=bf((w-x.delay)/(1-x.delay)),N=Math.sin(T*Math.PI)*(1-T)*.1,C=gt.lerp(x.x,x.target.x,T)+(x.target.x-h/2)*N,D=gt.lerp(x.y,x.target.y,T)+(x.target.y-u/2)*N,F=gt.lerp(x.scale,x.target.size/x.source.size,T);a.save(),a.translate(C,D),a.rotate(x.angle*(1-T)),a.scale(F,F),a.fillStyle=x.source.color,a.fill(x.path,"evenodd"),a.restore()}}o.style.display=w>0&&!s.complete?"block":"none",i.style.visibility=w>0?"hidden":"visible",r.style.opacity=String(1-bf((w-.72)/.28)),r.style.visibility=s.complete?"hidden":"visible",s.complete!==R&&window.dispatchEvent(new CustomEvent("main-intro-handoff",{detail:{complete:s.complete}}))}let g=()=>{try{return typeof lenis<"u"?lenis:null}catch{return null}};function p(S){if(f)return;f=!0,s.moving=!0;let w=scrollY,R=s.anchor()-(S?0:innerHeight*Zo),x=performance.now(),T=matchMedia("(prefers-reduced-motion:reduce)").matches?180:1250;g()?.stop();let N=C=>{let D=Ef((C-x)/T);window.scrollTo({top:w+(R-w)*bf(D),behavior:"instant"}),D<1?requestAnimationFrame(N):(f=!1,s.moving=!1,s.inputUntil=performance.now()+450,g()?.scrollTo(R,{immediate:!0,force:!0}),S||g()?.start(),window.dispatchEvent(new Event("scroll")))};requestAnimationFrame(N)}s.reverse=()=>p(!1);let E=S=>S.defaultPrevented||document.body.classList.contains("mobile-menu-open")||document.documentElement.classList.contains("page-transition-active")||S.target.closest?.("input,textarea,select,[contenteditable]");function M(S){return f||!s.complete&&S>0&&scrollY>=s.anchor()-innerHeight*Zo-Math.min(80,innerHeight*.08)}addEventListener("wheel",S=>{E(S)||!M(Math.sign(S.deltaY))||(S.preventDefault(),S.stopImmediatePropagation(),f||p(!0))},{capture:!0,passive:!1});let _=0;return addEventListener("touchstart",S=>{_=S.touches[0].clientY},{passive:!0}),addEventListener("touchmove",S=>{if(E(S)||S.touches.length!==1)return;let w=_-S.touches[0].clientY;M(Math.sign(w))&&(S.preventDefault(),S.stopImmediatePropagation(),!f&&w>36&&p(!0))},{capture:!0,passive:!1}),addEventListener("keydown",S=>{E(S)||!["ArrowDown","PageDown"," "].includes(S.key)||S.target.closest?.("button,a")||M(1)&&(S.preventDefault(),S.stopImmediatePropagation(),!f&&!S.repeat&&p(!0))},{capture:!0}),{update:y,reset(){l=null},inspect:()=>({progress:s.progress,complete:s.complete,moving:f,count:l?.length||0,anchor:s.anchor()})}}var kl=i=>document.querySelector(i),_n=kl("#scene"),Q1=Fm(),tn={angle:38,depth:1,shadow:.64,layout:"grid"},rt=[],Tf=[],Lt,Tt,ht,Dr,Ur,Jo,Af,qm,Zm,Rf,Cf=0,Lr=1,Nr=1,Vl=!1,eM=()=>ri,st={current:0,target:0,poses:[],lastFrame:0},Hl,Vt={current:0,target:0},If=matchMedia("(prefers-reduced-motion: reduce)"),Yo=new U,Ym=new So({name:"Soft colored clay",color:16777215,roughness:.78,metalness:0,emissive:16777215,emissiveIntensity:.02,toneMapped:!1}),wf={depth:46.2,bevelEnabled:!0,bevelSize:1.3,bevelThickness:2.2,bevelSegments:5,steps:1,curveSegments:20},tM=(i,e=1)=>{let t=Math.sin((i+1)*127.1+e*311.7)*43758.5453;return t-Math.floor(t)};function nM(i){if(Cf=0,!Lt||Vl)return;let e=Math.min((i-st.lastFrame)/1e3||.016,.05);st.lastFrame=i;let t=st.target-st.current;st.current=If.matches||Math.abs(t)<1e-4?st.target:st.current+t*(1-Math.exp(-12*e)),Math.abs(st.target-st.current)<1e-4&&(st.current=st.target);let n=Vt.target-Vt.current;if(Vt.current=If.matches||Math.abs(n)<1e-5?Vt.target:Vt.current+n*(1-Math.exp(-12*e)),Math.abs(Vt.target-Vt.current)<1e-5&&(Vt.current=Vt.target),window.MainIntro.complete&&Vt.current===1&&Vt.target===1){Hl?.update(1);return}Vt.current>0&&(st.current=ri),Nf(Lr,Nr),Vt.current===0&&Lt.render(Tt,ht),Hl?.update(Vt.current),Math.abs(Vt.target-Vt.current)>1e-5&&$o(),(Math.abs(st.target-st.current)>1e-4||rt.some(s=>s.reveal.active&&performance.now()-s.reveal.sparkAt<360)||Ur?.isFlashing())&&$o()}function $o(){Cf||(Cf=requestAnimationFrame(nM))}function ns(i,e,t,n,s=0,r=0,o=38,a=44,c=0,l=34){let h=gt.degToRad(o),u=gt.degToRad(a);ht.aspect=i/e,ht.fov=l,ht.near=Math.max(.1,n*.05),ht.position.set(t.x+Math.sin(h)*Math.cos(u)*n,t.y+Math.sin(u)*n,t.z+Math.cos(h)*Math.cos(u)*n),ht.up.set(-Math.sin(h)*Math.sin(u),Math.cos(u),-Math.cos(h)*Math.sin(u)),ht.lookAt(t.x,t.y,t.z),ht.rotateZ(c),ht.setViewOffset(i,e,s*i,r*e,i,e),ht.updateMatrixWorld(!0)}function Gl(i){let e=i.geometry.attributes.position,t=new U,n=new tt().multiplyMatrices(ht.projectionMatrix,ht.matrixWorldInverse).multiply(i.matrixWorld),s={left:1/0,right:-1/0,top:1/0,bottom:-1/0};for(let r=0;r<e.count;r++){t.fromBufferAttribute(e,r).applyMatrix4(n);let o=(t.x+1)/2,a=(1-t.y)/2;s.left=Math.min(s.left,o),s.right=Math.max(s.right,o),s.top=Math.min(s.top,a),s.bottom=Math.max(s.bottom,a)}return s}function Jm(i,e){let t=rt.map(({mesh:E})=>E.scale.y);rt.forEach(({mesh:E,heightFactor:M})=>{E.scale.y=tn.depth*M}),Tt.updateMatrixWorld(!0),st.poses=rt.slice(0,Sr).map(({mesh:E,index:M})=>{let _=new wt().setFromObject(E).getCenter(new U);_.y=E.position.y;let S=M===0?0:tn.angle+(M===1?-8:12),w=M===0?90:M===1?48:58,R=4,x;for(let T=0;T<80&&(ns(i,e,_,R,0,0,S,w),x=Gl(E),!(x.right-x.left<(i/e<1?.78:.52)&&x.bottom-x.top<.45));T++)R*=1.035;return{center:_,distance:R,yaw:S,pitch:w,shiftX:(x.left+x.right)/2-.5,shiftY:(x.top+x.bottom)/2-.5}});let n=Math.max(...st.poses.map(E=>E.distance));st.poses.forEach((E,M)=>{E.distance=n,ns(i,e,E.center,E.distance,0,0,E.yaw,E.pitch);let _=Gl(rt[M].mesh);E.shiftX=(_.left+_.right)/2-.5,E.shiftY=(_.top+_.bottom)/2-.5}),Jo.fit(st.poses[0],e);let s=tn.layout==="grid"?_l(st.layoutMode==="portrait"):null;rt.forEach(E=>ul(E.reveal,s));let r=st.poses[0];ns(i,e,r.center,r.distance,r.shiftX,r.shiftY,r.yaw,r.pitch),$u(rt[0].reveal,ht);let o=new wt;rt.forEach(({mesh:E})=>o.expandByObject(E));let a=o.getCenter(new U),c=tn.angle,l=54;a.y=.003;let h=14,u;for(let E=0;E<90&&(ns(i,e,a,h,0,0,c,l,0,34),u=Pf(),!(u.right-u.left<.94&&u.bottom-u.top<(i/e<.8?.72:.76)));E++)h*=1.045;let f=90+tn.angle-38,d=h*1.65;for(let E=0;E<60;E++){ns(i,e,a,d,0,0,f,90);let M=Pf();if(M.right-M.left<.9&&M.bottom-M.top<.76)break;d*=1.045}st.wide={center:a,distance:d,yaw:f,pitch:90,fov:34,shiftX:0,shiftY:0};let m=[];for(let E=zn;E<=es+.001;E+=(es-zn)/12){let M=El(E,st.poses,st.wide);ns(i,e,M.center,M.distance,M.shiftX,M.shiftY,M.yaw,M.pitch,M.roll,M.fov),m.push(ht.clone())}let y=El(zn,st.poses,st.wide);ns(i,e,y.center,y.distance,y.shiftX,y.shiftY,y.yaw,y.pitch,y.roll,y.fov);let g=new Ei,p=new U;g.setFromCamera(new ue(0,0),ht),g.ray.intersectPlane(new Xt(new U(0,1,0),-.003),p),Ur?.fit(m,st.layoutMode==="portrait",tn,p),rt.forEach(({mesh:E},M)=>{E.scale.y=t[M]}),Tt.updateMatrixWorld(!0)}function Pf(){let i={left:1/0,right:-1/0,top:1/0,bottom:-1/0};return rt.forEach(({mesh:e})=>{let t=Gl(e);i.left=Math.min(i.left,t.left),i.right=Math.max(i.right,t.right),i.top=Math.min(i.top,t.top),i.bottom=Math.max(i.bottom,t.bottom)}),i}function Nf(i,e){if(!st.poses.length)return;let t=gt.clamp(st.current,0,ri);Q1.update(t);let n=xl(t);rf.value=Ju(n);let s=El(t,st.poses,st.wide,If.matches?0:1),{solo:r,index:o,distance:a,yaw:c,pitch:l,shiftX:h,shiftY:u,roll:f,fov:d,travelling:m,pullback:y,overhead:g}=s;if(Yo.set(s.center.x,s.center.y,s.center.z),ns(i,e,Yo,a,h,u,c,l,f,d),t<=3){let T=_n.getBoundingClientRect();$u(rt[0].reveal,ht,2*Math.max(0,T.top)/Math.max(1,T.height))}Jo.update(l,t>=kn);let p=0,E=0,M=0;rt.forEach(T=>{let N=t>=T.cue.start,C=N;rm(T,br(t,T.cue),C,tn.depth*T.heightFactor,tn.shadow,n),N&&p++,C&&T.reveal.state.complete&&E++,C&&(!T.reveal.state.complete||n>0&&n<1)&&M++}),Ur?.update(t,tn),Tt.updateMatrixWorld(!0),Zm?.update(ht),Af?.update(br(t,rt[0].cue),ht,i,e),qm?.update(br(t,rt[0].cue),ht,i,e),Tt.fog.near=a+45,Tt.fog.far=a+110,Dr.position.copy(Yo).add(new U(...oi)),Dr.target.position.copy(Yo);let _=rt.filter(T=>t>=T.cue.start).sort((T,N)=>N.cue.start-T.cue.start)[0],S=r?o:_.index,w=rt[S].reveal.state,R=r?"solo":t<kn+.3?"crescendo":"finale",x=y>.99?Pf():Gl(rt[S].mesh);ht.userData={projection:"cinematic-perspective",framing:x,position:ht.position.toArray(),focus:Yo.toArray(),index:S,progress:t/ri,timeline:t,yaw:c,pitch:l,roll:f,distance:a,travelling:m,pullback:y,overhead:g,ending:n,direction:ht.getWorldDirection(new U).toArray(),phase:R,generated:p,complete:E,activeReveals:M,reveal:{...w}}}function $m(){let i=kl("#journey"),e=i.getBoundingClientRect().top+scrollY,t=_n.clientHeight*Zo,{start:n,distance:s}=Em(e,i.offsetHeight-t,_n.clientHeight);Vt.target=gt.clamp((scrollY-n-s)/t,0,1);let r=Mm(gt.clamp((scrollY-n)/s,0,1)*ff),o=Math.round(r);st.target=Math.abs(r-o)<.001?o:r,$o()}async function iM(){let i=new ol;for(let e=0;e<qo.length;e++){let t=qo[e];try{let s=i.parse(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${t.viewBox}" fill="white">${t.svg}</svg>`).paths.flatMap(R=>R.toShapes());if(!s.length)throw new Error("Empty geometry");let r=new yo(s,wf);r.rotateX(Math.PI/2),r.computeBoundingBox();let o=r.boundingBox,a=o.getCenter(new U);r.translate(-a.x,-o.min.y,-a.z);let c=2.25+(tM(e,2)-.5)*.65,l=c/Math.max(o.max.x-o.min.x,o.max.z-o.min.z);r.scale(l,l,l),r.computeBoundingBox(),r.computeBoundingSphere();let h=r.attributes.position,u=0;for(let R=0;R<h.count;R++)u=Math.max(u,Math.hypot(h.getX(R),h.getZ(R)));let f=t.color,d=Ml(Ym.clone());d.transparent=!0,d.name=t.id+"-clay";let m=new St(r,d);m.name=t.id,m.castShadow=!0,m.receiveShadow=!0,m.userData={id:t.id,name:t.name,index:e,source:"SVG",shapeCount:s.length,holeCount:s.reduce((R,x)=>R+x.holes.length,0)},Tt.add(m);let y=c+4.2,[g,p,E,M]=t.viewBox.trim().split(/[\s,]+/).map(Number),_={minX:(g-a.x)*l,maxX:(g+E-a.x)*l,minZ:(p-a.z)*l,maxZ:(p+M-a.z)*l};m.userData.svgBounds=_;let S={svgBounds:_,height:(wf.depth+wf.bevelThickness*2)*l,contours:s.flatMap(R=>[{hole:!1,points:R.getPoints(16)},...R.holes.map(x=>({hole:!0,points:x.getPoints(16)}))]).map(R=>({hole:R.hole,points:R.points.map(x=>[(x.x-a.x)*l,(x.y-a.z)*l])}))},w=new St(new bi(y,y),vl());w.name=t.id+"-contact",w.rotation.x=-Math.PI/2,w.position.y=.001,w.renderOrder=1,Tt.add(w),rt.push({icon:t,color:f,mesh:m,shadow:w,size:c,radius:u,index:e,shadowSpan:y,caster:S,shadowKey:""})}catch(n){Tf.push({id:t.id,error:n.message})}}if(rt.length!==33)throw new Error(`Expected 33 objects, created ${rt.length}: ${JSON.stringify(Tf)}`);Km()}function Km(){let i=_n.clientWidth/_n.clientHeight<.8,e=gm(i,tn.layout,rt.map(t=>t.radius));st.layoutMode=i?"portrait":"landscape",rt.forEach(t=>{let{index:n,mesh:s,shadow:r}=t,o=e[n],a=o.x,c=o.z,l=0;t.heightFactor=o.height;let h=tn.depth*t.heightFactor;s.position.set(a,.003,c),s.rotation.y=l,s.scale.y=h,r.position.set(a,.001,c),r.rotation.z=l,t.reveal&&(t.reveal.group.position.copy(s.position),t.reveal.group.rotation.copy(s.rotation));let u=`${h}:${l}`;if(t.shadowKey!==u){let f=r.material.map;t.patternShadow&&t.patternShadow!==f&&t.patternShadow.dispose(),r.material.map=sf(t.caster,t.shadowSpan,h,l),t.patternShadow=l===0?r.material.map:sf(t.caster,t.shadowSpan,h,0),r.material.needsUpdate=!0,f?.dispose(),t.shadowKey=u}r.material.opacity=tn.shadow}),Tt.updateMatrixWorld(!0)}function Lf(){!Lt||Vl||(Lr=_n.clientWidth,Nr=_n.clientHeight,st.layoutMode!==(Lr/Nr<.8?"portrait":"landscape")&&Km(),Lt.setPixelRatio(2),Lt.setSize(Lr,Nr,!1),Jm(Lr,Nr),Hl?.reset(),$m(),Nf(Lr,Nr),Rf?.prepare(),$o())}async function sM(i=3840,e=2160){Vl=!0;try{return Lt.setPixelRatio(1),Lt.setSize(i,e,!1),Jm(i,e),Nf(i,e),Lt.render(Tt,ht),Lt.domElement.toDataURL("image/png")}finally{Vl=!1,Lf()}}async function rM(i){let e=new $i,t,n=[],s=c=>{let l=c.mesh.material.clone();return l.opacity=1,l.transparent=!1,l.depthWrite=!0,l.color.set(c.color),l.emissive.set(c.color),n.push(l),l};Number.isInteger(i)?(t=rt[i].mesh.clone(),t.visible=!0,t.material=s(rt[i]),t.position.set(0,0,0),t.rotation.set(0,0,0),t.scale.y=tn.depth*rt[i].heightFactor):(t=new Rn,t.name="CJU_33_COLOR_OBJECTS",rt.forEach(c=>{let l=c.mesh.clone();l.visible=!0,l.material=s(c),c.mesh.matrixWorld.decompose(l.position,l.quaternion,l.scale),l.scale.y=tn.depth*c.heightFactor,t.add(l)}));let r;try{r=await e.parseAsync(t,{binary:!0})}finally{n.forEach(c=>c.dispose())}let o="",a=new Uint8Array(r);for(let c=0;c<a.length;c+=16384)o+=String.fromCharCode(...a.subarray(c,c+16384));return btoa(o)}async function oM(){try{Lt=new yr({antialias:!0,alpha:!1,preserveDrawingBuffer:!0,powerPreference:"high-performance"}),Lt.setClearColor(16448250),Lt.outputColorSpace=yt,Lt.toneMapping=Po,Lt.toneMappingExposure=1,Lt.shadowMap.enabled=!1,Lt.domElement.setAttribute("aria-label","33\uC885\uC758 \uC6D0\uBCF8 \uCEEC\uB7EC \uC785\uCCB4 \uC544\uC774\uCF58\uC774 \uBC18\uBCF5\uB418\uC5B4 \uBC14\uB2E5\uC744 \uCC44\uC6B0\uB294 \uD328\uD134"),_n.append(Lt.domElement),Tt=new Kn,Tt.background=new Ve(16448250),Tt.fog=new no(16448250,10,17),ht=new qt(32,1,.1,250),Tt.add(new To(16777215,15855853,1.9)),Dr=new hr(16776696,1.7),Dr.position.set(...oi),Tt.add(Dr),Tt.add(Dr.target);let i=new hr(16777215,.7);i.position.set(12,16,-8),Tt.add(i),Jo=Tm(Lt),Tt.add(Jo.mesh),await iM(),window.heroNebula=Gm(kl(".hero-art"),rt),rt.forEach((e,t)=>{e.reveal=dl(e,void 0,t===0?"viewport":"edge"),Tt.add(e.reveal.group)}),Af=Rm(_n,rt[0]),qm=Cm(_n,rt[0]),Zm=Im(_n,rt[0].reveal),Ur=new Sl(Tt,rt,Ym),Rf=Wm(Lt,Tt,ht,$o),Hl=Xm(_n,rt,()=>Ur.copies,ht),kl("#journey").style.height=`${bm+Zo*100}svh`,addEventListener("scroll",$m,{passive:!0}),addEventListener("resize",Lf),Lf(),Lt.render(Tt,ht),_n.classList.add("ready"),window.heroStudio={ready:!0,exportPNG:sM,exportGLB:rM,inspect:()=>({count:rt.length,preparation:Rf.inspect(),pattern:Ur.inspect(),floor:Jo.inspect(),dimension:Af.inspect(),errors:Tf,settings:{...tn},timelineEnd:eM(),cameraPath:{poses:st.poses,wide:st.wide},camera:{...ht.userData,rotation:ht.rotation.toArray(),up:ht.up.toArray()},objects:rt.map(({mesh:e,icon:t,reveal:n,heightFactor:s,index:r,radius:o,cue:a})=>({id:t.id,name:t.name,vertices:e.geometry.attributes.position.count,triangles:e.geometry.attributes.position.count/3,...e.userData,color:e.material.color.getHexString(),lineColor:n.lines[0].material.color.getHexString(),cue:a,heightFactor:s,radius:o,position:e.position.toArray(),baseY:e.position.y,rotation:e.rotation.toArray(),heightScale:e.scale.y,visible:e.visible,guide:fl(n),drawingVisible:n.group.visible,pointVisible:n.group.visible&&n.dot.visible,strokeVertices:n.lines.reduce((c,l)=>c+l.geometry.drawRange.count,0),reveal:{...n.state}})),renderer:Lt.info.render})}}catch(i){console.warn("Intro unavailable; continuing with the existing main hero.",i),window.MainIntro.complete=!0,window.MainIntro.progress=1,document.body.classList.remove("intro-before-main","intro-scattering"),document.body.classList.add("intro-unavailable"),window.dispatchEvent(new CustomEvent("main-intro-handoff",{detail:{complete:!0}})),window.heroStudio={ready:!1,error:String(i)}}}oM();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
