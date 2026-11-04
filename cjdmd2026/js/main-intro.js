(()=>{var Nf=0,kh=1,Df=2;var Do=1,Uf=2,xr=3,yi=0,Kt=1,jt=2,ti=0,fs=1,Vh=2,Hh=3,Gh=4,Of=5;var ki=100,Ff=101,Bf=102,zf=103,kf=104,Vf=200,Hf=201,Gf=202,Wf=203,Da=204,Ua=205,Xf=206,qf=207,Zf=208,Yf=209,Jf=210,$f=211,Kf=212,jf=213,Qf=214,Oa=0,Fa=1,Ba=2,ps=3,za=4,ka=5,Va=6,Ha=7,Wh=0,ep=1,tp=2,Un=0,Xh=1,qh=2,Zh=3,Uo=4,Yh=5,Jh=6,$h=7;var Kh=300,Ji=301,vs=302,gc=303,xc=304,Oo=306,Sn=1e3,nn=1001,Vi=1002,Dt=1003,_c=1004;var Ms=1005;var bt=1006,_r=1007;var ni=1008;var sn=1009,jh=1010,Qh=1011,yr=1012,yc=1013,On=1014,En=1015,ii=1016,vc=1017,Mc=1018,vr=1020,eu=35902,tu=35899,nu=1021,iu=1022,rn=1023,$n=1026,$i=1027,Sc=1028,bc=1029,Ki=1030,Ec=1031;var wc=1033,Fo=33776,Bo=33777,zo=33778,ko=33779,Tc=35840,Ac=35841,Rc=35842,Cc=35843,Ic=36196,Pc=37492,Lc=37496,Nc=37488,Dc=37489,Vo=37490,Uc=37491,Oc=37808,Fc=37809,Bc=37810,zc=37811,kc=37812,Vc=37813,Hc=37814,Gc=37815,Wc=37816,Xc=37817,qc=37818,Zc=37819,Yc=37820,Jc=37821,$c=36492,Kc=36494,jc=36495,Qc=36283,el=36284,Ho=36285,tl=36286;var ms=2300,er=2301,Na=2302,Eh=2303,wh=2400,Th=2401,Ah=2402;var np=3200;var nl=0,ip=1,Fn="",xt="srgb",no="srgb-linear",io="linear",ht="srgb";var us=7680;var Rh=519,sp=512,rp=513,op=514,il=515,ap=516,cp=517,sl=518,lp=519,Ga=35044,Mr=35048;var su="300 es",Pn=2e3,tr=2001;function pg(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function mg(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function so(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function hp(){let i=so("canvas");return i.style.display="block",i}var Xd={},nr=null;function ro(...i){let e="THREE."+i.shift();nr?nr("log",e,...i):console.log(e,...i)}function up(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ge(...i){i=up(i);let e="THREE."+i.shift();if(nr)nr("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ze(...i){i=up(i);let e="THREE."+i.shift();if(nr)nr("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function ds(...i){let e=i.join(" ");e in Xd||(Xd[e]=!0,Ge(...i))}function dp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var fp={[Oa]:Fa,[Ba]:Va,[za]:Ha,[ps]:ka,[Fa]:Oa,[Va]:Ba,[Ha]:za,[ka]:ps},Kn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],qd=1234567,jr=Math.PI/180,ir=180/Math.PI;function Jn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Wt[i&255]+Wt[i>>8&255]+Wt[i>>16&255]+Wt[i>>24&255]+"-"+Wt[e&255]+Wt[e>>8&255]+"-"+Wt[e>>16&15|64]+Wt[e>>24&255]+"-"+Wt[t&63|128]+Wt[t>>8&255]+"-"+Wt[t>>16&255]+Wt[t>>24&255]+Wt[n&255]+Wt[n>>8&255]+Wt[n>>16&255]+Wt[n>>24&255]).toLowerCase()}function $e(i,e,t){return Math.max(e,Math.min(t,i))}function ru(i,e){return(i%e+e)%e}function gg(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function xg(i,e,t){return i!==e?(t-i)/(e-i):0}function Qr(i,e,t){return(1-t)*i+t*e}function _g(i,e,t,n){return Qr(i,e,1-Math.exp(-t*n))}function yg(i,e=1){return e-Math.abs(ru(i,e*2)-e)}function vg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Mg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Sg(i,e){return i+Math.floor(Math.random()*(e-i+1))}function bg(i,e){return i+Math.random()*(e-i)}function Eg(i){return i*(.5-Math.random())}function wg(i){i!==void 0&&(qd=i);let e=qd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Tg(i){return i*jr}function Ag(i){return i*ir}function Rg(i){return(i&i-1)===0&&i!==0}function Cg(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ig(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Pg(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),m=o((n-e)/2);switch(s){case"XYX":i.set(a*h,c*u,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*m,c*f,a*l);break;case"YXY":i.set(c*f,a*h,c*m,a*l);break;case"ZYZ":i.set(c*m,c*f,a*h,a*l);break;default:Ge("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function In(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function dt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var pt={DEG2RAD:jr,RAD2DEG:ir,generateUUID:Jn,clamp:$e,euclideanModulo:ru,mapLinear:gg,inverseLerp:xg,lerp:Qr,damp:_g,pingpong:yg,smoothstep:vg,smootherstep:Mg,randInt:Sg,randFloat:bg,randFloatSpread:Eg,seededRandom:wg,degToRad:Tg,radToDeg:Ag,isPowerOfTwo:Rg,ceilPowerOfTwo:Cg,floorPowerOfTwo:Ig,setQuaternionFromProperEuler:Pg,normalize:dt,denormalize:In},uu=class uu{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};uu.prototype.isVector2=!0;var ue=uu,bn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],d=r[o+0],f=r[o+1],m=r[o+2],_=r[o+3];if(u!==_||c!==d||l!==f||h!==m){let g=c*d+l*f+h*m+u*_;g<0&&(d=-d,f=-f,m=-m,_=-_,g=-g);let p=1-a;if(g<.9995){let M=Math.acos(g),v=Math.sin(M);p=Math.sin(p*M)/v,a=Math.sin(a*M)/v,c=c*p+d*a,l=l*p+f*a,h=h*p+m*a,u=u*p+_*a}else{c=c*p+d*a,l=l*p+f*a,h=h*p+m*a,u=u*p+_*a;let M=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=M,l*=M,h*=M,u*=M}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],m=r[o+3];return e[t]=a*m+h*u+c*f-l*d,e[t+1]=c*m+h*d+l*u-a*f,e[t+2]=l*m+h*f+a*d-c*u,e[t+3]=h*m-a*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),d=c(n/2),f=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"YZX":this._x=d*h*u+l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u-d*f*m;break;case"XZY":this._x=d*h*u-l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u+d*f*m;break;default:Ge("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($e(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},du=class du{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Zd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Zd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return $l.copy(this).projectOnVector(e),this.sub($l)}reflect(e){return this.sub($l.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};du.prototype.isVector3=!0;var U=du,$l=new U,Zd=new bn,fu=class fu{constructor(e,t,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],_=s[0],g=s[3],p=s[6],M=s[1],v=s[4],y=s[7],E=s[2],w=s[5],T=s[8];return r[0]=o*_+a*M+c*E,r[3]=o*g+a*v+c*w,r[6]=o*p+a*y+c*T,r[1]=l*_+h*M+u*E,r[4]=l*g+h*v+u*w,r[7]=l*p+h*y+u*T,r[2]=d*_+f*M+m*E,r[5]=d*g+f*v+m*w,r[8]=d*p+f*y+m*T,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,m=t*u+n*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return e[0]=u*_,e[1]=(s*l-h*n)*_,e[2]=(a*n-s*o)*_,e[3]=d*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-a*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return ds("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Kl.makeScale(e,t)),this}rotate(e){return ds("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Kl.makeRotation(-e)),this}translate(e,t){return ds("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Kl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};fu.prototype.isMatrix3=!0;var We=fu,Kl=new We,Yd=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Jd=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Lg(){let i={enabled:!0,workingColorSpace:no,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ht&&(s.r=_i(s.r),s.g=_i(s.g),s.b=_i(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ht&&(s.r=Qs(s.r),s.g=Qs(s.g),s.b=Qs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Fn?io:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ds("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ds("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[no]:{primaries:e,whitePoint:n,transfer:io,toXYZ:Yd,fromXYZ:Jd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:xt},outputColorSpaceConfig:{drawingBufferColorSpace:xt}},[xt]:{primaries:e,whitePoint:n,transfer:ht,toXYZ:Yd,fromXYZ:Jd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:xt}}}),i}var it=Lg();function _i(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Qs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ds,sr=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ds===void 0&&(Ds=so("canvas")),Ds.width=e.width,Ds.height=e.height;let s=Ds.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ds}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=so("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=_i(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(_i(t[n]/255)*255):t[n]=_i(t[n]);return{data:t,width:e.width,height:e.height}}else return Ge("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Ng=0,vi=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ng++}),this.uuid=Jn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(jl(s[o].image)):r.push(jl(s[o]))}else r=jl(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function jl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?sr.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ge("Texture: Unable to serialize Texture."),{})}var Dg=0,Ql=new U,Bt=class i extends Kn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=nn,s=nn,r=bt,o=ni,a=rn,c=sn,l=i.DEFAULT_ANISOTROPY,h=Fn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Dg++}),this.uuid=Jn(),this.name="",this.source=new vi(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ql).x}get height(){return this.source.getSize(Ql).y}get depth(){return this.source.getSize(Ql).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ge(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ge(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Kh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Sn:e.x=e.x-Math.floor(e.x);break;case nn:e.x=e.x<0?0:1;break;case Vi:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Sn:e.y=e.y-Math.floor(e.y);break;case nn:e.y=e.y<0?0:1;break;case Vi:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Bt.DEFAULT_IMAGE=null;Bt.DEFAULT_MAPPING=Kh;Bt.DEFAULT_ANISOTROPY=1;var pu=class pu{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],m=c[9],_=c[2],g=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(m+g)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let v=(l+1)/2,y=(f+1)/2,E=(p+1)/2,w=(h+d)/4,T=(u+_)/4,x=(m+g)/4;return v>y&&v>E?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=w/n,r=T/n):y>E?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=w/s,r=x/s):E<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),n=T/r,s=x/r),this.set(n,s,r,t),this}let M=Math.sqrt((g-m)*(g-m)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(g-m)/M,this.y=(u-_)/M,this.z=(d-h)/M,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this.w=$e(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this.w=$e(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};pu.prototype.isVector4=!0;var at=pu,Wa=class extends Kn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new Bt(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:bt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new vi(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},un=class extends Wa{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},oo=class extends Bt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Xa=class extends Bt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var mc=class mc{constructor(e,t,n,s,r,o,a,c,l,h,u,d,f,m,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,u,d,f,m,_,g)}set(e,t,n,s,r,o,a,c,l,h,u,d,f,m,_,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new mc().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/Us.setFromMatrixColumn(e,0).length(),r=1/Us.setFromMatrixColumn(e,1).length(),o=1/Us.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=o*h,f=o*u,m=a*h,_=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+m*l,t[5]=d-_*l,t[9]=-a*c,t[2]=_-d*l,t[6]=m+f*l,t[10]=o*c}else if(e.order==="YXZ"){let d=c*h,f=c*u,m=l*h,_=l*u;t[0]=d+_*a,t[4]=m*a-f,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-m,t[6]=_+d*a,t[10]=o*c}else if(e.order==="ZXY"){let d=c*h,f=c*u,m=l*h,_=l*u;t[0]=d-_*a,t[4]=-o*u,t[8]=m+f*a,t[1]=f+m*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let d=o*h,f=o*u,m=a*h,_=a*u;t[0]=c*h,t[4]=m*l-f,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=f*l-m,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let d=o*c,f=o*l,m=a*c,_=a*l;t[0]=c*h,t[4]=_-d*u,t[8]=m*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=f*u+m,t[10]=d-_*u}else if(e.order==="XZY"){let d=o*c,f=o*l,m=a*c,_=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=o*h,t[9]=f*u-m,t[2]=m*u-f,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ug,e,Og)}lookAt(e,t,n){let s=this.elements;return cn.subVectors(e,t),cn.lengthSq()===0&&(cn.z=1),cn.normalize(),Di.crossVectors(n,cn),Di.lengthSq()===0&&(Math.abs(n.z)===1?cn.x+=1e-4:cn.z+=1e-4,cn.normalize(),Di.crossVectors(n,cn)),Di.normalize(),sa.crossVectors(cn,Di),s[0]=Di.x,s[4]=sa.x,s[8]=cn.x,s[1]=Di.y,s[5]=sa.y,s[9]=cn.y,s[2]=Di.z,s[6]=sa.z,s[10]=cn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],_=n[6],g=n[10],p=n[14],M=n[3],v=n[7],y=n[11],E=n[15],w=s[0],T=s[4],x=s[8],R=s[12],I=s[1],C=s[5],D=s[9],B=s[13],G=s[2],O=s[6],q=s[10],H=s[14],k=s[3],ie=s[7],re=s[11],xe=s[15];return r[0]=o*w+a*I+c*G+l*k,r[4]=o*T+a*C+c*O+l*ie,r[8]=o*x+a*D+c*q+l*re,r[12]=o*R+a*B+c*H+l*xe,r[1]=h*w+u*I+d*G+f*k,r[5]=h*T+u*C+d*O+f*ie,r[9]=h*x+u*D+d*q+f*re,r[13]=h*R+u*B+d*H+f*xe,r[2]=m*w+_*I+g*G+p*k,r[6]=m*T+_*C+g*O+p*ie,r[10]=m*x+_*D+g*q+p*re,r[14]=m*R+_*B+g*H+p*xe,r[3]=M*w+v*I+y*G+E*k,r[7]=M*T+v*C+y*O+E*ie,r[11]=M*x+v*D+y*q+E*re,r[15]=M*R+v*B+y*H+E*xe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],m=e[3],_=e[7],g=e[11],p=e[15],M=c*f-l*d,v=a*f-l*u,y=a*d-c*u,E=o*f-l*h,w=o*d-c*h,T=o*u-a*h;return t*(_*M-g*v+p*y)-n*(m*M-g*E+p*w)+s*(m*v-_*E+p*T)-r*(m*y-_*w+g*T)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],o=e[5],a=e[9],c=e[2],l=e[6],h=e[10];return t*(o*h-a*l)-n*(r*h-a*c)+s*(r*l-o*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],m=e[12],_=e[13],g=e[14],p=e[15],M=t*a-n*o,v=t*c-s*o,y=t*l-r*o,E=n*c-s*a,w=n*l-r*a,T=s*l-r*c,x=h*_-u*m,R=h*g-d*m,I=h*p-f*m,C=u*g-d*_,D=u*p-f*_,B=d*p-f*g,G=M*B-v*D+y*C+E*I-w*R+T*x;if(G===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let O=1/G;return e[0]=(a*B-c*D+l*C)*O,e[1]=(s*D-n*B-r*C)*O,e[2]=(_*T-g*w+p*E)*O,e[3]=(d*w-u*T-f*E)*O,e[4]=(c*I-o*B-l*R)*O,e[5]=(t*B-s*I+r*R)*O,e[6]=(g*y-m*T-p*v)*O,e[7]=(h*T-d*y+f*v)*O,e[8]=(o*D-a*I+l*x)*O,e[9]=(n*I-t*D-r*x)*O,e[10]=(m*w-_*y+p*M)*O,e[11]=(u*y-h*w-f*M)*O,e[12]=(a*R-o*C-c*x)*O,e[13]=(t*C-n*R+s*x)*O,e[14]=(_*v-m*E-g*M)*O,e[15]=(h*E-u*v+d*M)*O,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,m=r*u,_=o*h,g=o*u,p=a*u,M=c*l,v=c*h,y=c*u,E=n.x,w=n.y,T=n.z;return s[0]=(1-(_+p))*E,s[1]=(f+y)*E,s[2]=(m-v)*E,s[3]=0,s[4]=(f-y)*w,s[5]=(1-(d+p))*w,s[6]=(g+M)*w,s[7]=0,s[8]=(m+v)*T,s[9]=(g-M)*T,s[10]=(1-(d+_))*T,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=Us.set(s[0],s[1],s[2]).length(),a=Us.set(s[4],s[5],s[6]).length(),c=Us.set(s[8],s[9],s[10]).length();r<0&&(o=-o),An.copy(this);let l=1/o,h=1/a,u=1/c;return An.elements[0]*=l,An.elements[1]*=l,An.elements[2]*=l,An.elements[4]*=h,An.elements[5]*=h,An.elements[6]*=h,An.elements[8]*=u,An.elements[9]*=u,An.elements[10]*=u,t.setFromRotationMatrix(An),n.x=o,n.y=a,n.z=c,this}makePerspective(e,t,n,s,r,o,a=Pn,c=!1){let l=this.elements,h=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s),m,_;if(c)m=r/(o-r),_=o*r/(o-r);else if(a===Pn)m=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===tr)m=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Pn,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-s),d=-(t+e)/(t-e),f=-(n+s)/(n-s),m,_;if(c)m=1/(o-r),_=o/(o-r);else if(a===Pn)m=-2/(o-r),_=-(o+r)/(o-r);else if(a===tr)m=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};mc.prototype.isMatrix4=!0;var tt=mc,Us=new U,An=new tt,Ug=new U(0,0,0),Og=new U(1,1,1),Di=new U,sa=new U,cn=new U,$d=new tt,Kd=new bn,Mi=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin($e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin($e(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-$e(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin($e(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-$e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ge("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return $d.makeRotationFromQuaternion(e),this.setFromRotationMatrix($d,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Kd.setFromEuler(this),this.setFromQuaternion(Kd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Mi.DEFAULT_ORDER="XYZ";var rr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Fg=0,jd=new U,Os=new bn,ui=new tt,ra=new U,Vr=new U,Bg=new U,zg=new bn,Qd=new U(1,0,0),ef=new U(0,1,0),tf=new U(0,0,1),nf={type:"added"},kg={type:"removed"},Fs={type:"childadded",child:null},eh={type:"childremoved",child:null},Pt=class i extends Kn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Fg++}),this.uuid=Jn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new U,t=new Mi,n=new bn,s=new U(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new tt},normalMatrix:{value:new We}}),this.matrix=new tt,this.matrixWorld=new tt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new rr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Os.setFromAxisAngle(e,t),this.quaternion.multiply(Os),this}rotateOnWorldAxis(e,t){return Os.setFromAxisAngle(e,t),this.quaternion.premultiply(Os),this}rotateX(e){return this.rotateOnAxis(Qd,e)}rotateY(e){return this.rotateOnAxis(ef,e)}rotateZ(e){return this.rotateOnAxis(tf,e)}translateOnAxis(e,t){return jd.copy(e).applyQuaternion(this.quaternion),this.position.add(jd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Qd,e)}translateY(e){return this.translateOnAxis(ef,e)}translateZ(e){return this.translateOnAxis(tf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ui.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ra.copy(e):ra.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Vr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ui.lookAt(Vr,ra,this.up):ui.lookAt(ra,Vr,this.up),this.quaternion.setFromRotationMatrix(ui),s&&(ui.extractRotation(s.matrixWorld),Os.setFromRotationMatrix(ui),this.quaternion.premultiply(Os.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ze("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(nf),Fs.child=e,this.dispatchEvent(Fs),Fs.child=null):Ze("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(kg),eh.child=e,this.dispatchEvent(eh),eh.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ui.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ui.multiply(e.parent.matrixWorld)),e.applyMatrix4(ui),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(nf),Fs.child=e,this.dispatchEvent(Fs),Fs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,e,Bg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,zg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),m=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};Pt.DEFAULT_UP=new U(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var hn=class extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Vg={type:"move"},or=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new hn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new hn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new hn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let _ of e.hand.values()){let g=t.getJointPose(_,n),p=this._getHandJoint(l,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;l.inputState.pinching&&d>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Vg)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new hn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},pp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ui={h:0,s:0,l:0},oa={h:0,s:0,l:0};function th(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var ze=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=xt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=it.workingColorSpace){return this.r=e,this.g=t,this.b=n,it.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=it.workingColorSpace){if(e=ru(e,1),t=$e(t,0,1),n=$e(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=th(o,r,e+1/3),this.g=th(o,r,e),this.b=th(o,r,e-1/3)}return it.colorSpaceToWorking(this,s),this}setStyle(e,t=xt){function n(r){r!==void 0&&parseFloat(r)<1&&Ge("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ge("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Ge("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=xt){let n=pp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ge("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=_i(e.r),this.g=_i(e.g),this.b=_i(e.b),this}copyLinearToSRGB(e){return this.r=Qs(e.r),this.g=Qs(e.g),this.b=Qs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=xt){return it.workingToColorSpace(Xt.copy(this),e),Math.round($e(Xt.r*255,0,255))*65536+Math.round($e(Xt.g*255,0,255))*256+Math.round($e(Xt.b*255,0,255))}getHexString(e=xt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=it.workingColorSpace){it.workingToColorSpace(Xt.copy(this),t);let n=Xt.r,s=Xt.g,r=Xt.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=it.workingColorSpace){return it.workingToColorSpace(Xt.copy(this),t),e.r=Xt.r,e.g=Xt.g,e.b=Xt.b,e}getStyle(e=xt){it.workingToColorSpace(Xt.copy(this),e);let t=Xt.r,n=Xt.g,s=Xt.b;return e!==xt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Ui),this.setHSL(Ui.h+e,Ui.s+t,Ui.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ui),e.getHSL(oa);let n=Qr(Ui.h,oa.h,t),s=Qr(Ui.s,oa.s,t),r=Qr(Ui.l,oa.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Xt=new ze;ze.NAMES=pp;var ao=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new ze(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},jn=class extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Mi,this.environmentIntensity=1,this.environmentRotation=new Mi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Rn=new U,di=new U,nh=new U,fi=new U,Bs=new U,zs=new U,sf=new U,ih=new U,sh=new U,rh=new U,oh=new at,ah=new at,ch=new at,xi=class i{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Rn.subVectors(e,t),s.cross(Rn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Rn.subVectors(s,t),di.subVectors(n,t),nh.subVectors(e,t);let o=Rn.dot(Rn),a=Rn.dot(di),c=Rn.dot(nh),l=di.dot(di),h=di.dot(nh),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(l*c-a*h)*d,m=(o*h-a*c)*d;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,fi)===null?!1:fi.x>=0&&fi.y>=0&&fi.x+fi.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,fi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,fi.x),c.addScaledVector(o,fi.y),c.addScaledVector(a,fi.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return oh.setScalar(0),ah.setScalar(0),ch.setScalar(0),oh.fromBufferAttribute(e,t),ah.fromBufferAttribute(e,n),ch.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(oh,r.x),o.addScaledVector(ah,r.y),o.addScaledVector(ch,r.z),o}static isFrontFacing(e,t,n,s){return Rn.subVectors(n,t),di.subVectors(e,t),Rn.cross(di).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rn.subVectors(this.c,this.b),di.subVectors(this.a,this.b),Rn.cross(di).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;Bs.subVectors(s,n),zs.subVectors(r,n),ih.subVectors(e,n);let c=Bs.dot(ih),l=zs.dot(ih);if(c<=0&&l<=0)return t.copy(n);sh.subVectors(e,s);let h=Bs.dot(sh),u=zs.dot(sh);if(h>=0&&u<=h)return t.copy(s);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Bs,o);rh.subVectors(e,r);let f=Bs.dot(rh),m=zs.dot(rh);if(m>=0&&f<=m)return t.copy(r);let _=f*l-c*m;if(_<=0&&l>=0&&m<=0)return a=l/(l-m),t.copy(n).addScaledVector(zs,a);let g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return sf.subVectors(r,s),a=(u-h)/(u-h+(f-m)),t.copy(s).addScaledVector(sf,a);let p=1/(g+_+d);return o=_*p,a=d*p,t.copy(n).addScaledVector(Bs,o).addScaledVector(zs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Rt=class{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Cn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Cn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Cn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Cn):Cn.fromBufferAttribute(r,o),Cn.applyMatrix4(e.matrixWorld),this.expandByPoint(Cn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),aa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),aa.copy(n.boundingBox)),aa.applyMatrix4(e.matrixWorld),this.union(aa)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Cn),Cn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Hr),ca.subVectors(this.max,Hr),ks.subVectors(e.a,Hr),Vs.subVectors(e.b,Hr),Hs.subVectors(e.c,Hr),Oi.subVectors(Vs,ks),Fi.subVectors(Hs,Vs),as.subVectors(ks,Hs);let t=[0,-Oi.z,Oi.y,0,-Fi.z,Fi.y,0,-as.z,as.y,Oi.z,0,-Oi.x,Fi.z,0,-Fi.x,as.z,0,-as.x,-Oi.y,Oi.x,0,-Fi.y,Fi.x,0,-as.y,as.x,0];return!lh(t,ks,Vs,Hs,ca)||(t=[1,0,0,0,1,0,0,0,1],!lh(t,ks,Vs,Hs,ca))?!1:(la.crossVectors(Oi,Fi),t=[la.x,la.y,la.z],lh(t,ks,Vs,Hs,ca))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Cn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Cn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(pi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},pi=[new U,new U,new U,new U,new U,new U,new U,new U],Cn=new U,aa=new Rt,ks=new U,Vs=new U,Hs=new U,Oi=new U,Fi=new U,as=new U,Hr=new U,ca=new U,la=new U,cs=new U;function lh(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){cs.fromArray(i,r);let a=s.x*Math.abs(cs.x)+s.y*Math.abs(cs.y)+s.z*Math.abs(cs.z),c=e.dot(cs),l=t.dot(cs),h=n.dot(cs);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Nt=new U,ha=new ue,Hg=0,Mt=class extends Kn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Hg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ga,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ha.fromBufferAttribute(this,t),ha.applyMatrix3(e),this.setXY(t,ha.x,ha.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix3(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix4(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyNormalMatrix(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.transformDirection(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=In(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=dt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=In(t,this.array)),t}setX(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=In(t,this.array)),t}setY(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=In(t,this.array)),t}setZ(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=In(t,this.array)),t}setW(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),s=dt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),s=dt(s,this.array),r=dt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ga&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var co=class extends Mt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var lo=class extends Mt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var ut=class extends Mt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Gg=new Rt,Gr=new U,hh=new U,dn=class{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Gg.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Gr.subVectors(e,this.center);let t=Gr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Gr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(hh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Gr.copy(e.center).add(hh)),this.expandByPoint(Gr.copy(e.center).sub(hh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Wg=0,Mn=new tt,uh=new Pt,Gs=new U,ln=new Rt,Wr=new Rt,Ft=new U,Et=class i extends Kn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Wg++}),this.uuid=Jn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(pg(e)?lo:co)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new We().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Mn.makeRotationFromQuaternion(e),this.applyMatrix4(Mn),this}rotateX(e){return Mn.makeRotationX(e),this.applyMatrix4(Mn),this}rotateY(e){return Mn.makeRotationY(e),this.applyMatrix4(Mn),this}rotateZ(e){return Mn.makeRotationZ(e),this.applyMatrix4(Mn),this}translate(e,t,n){return Mn.makeTranslation(e,t,n),this.applyMatrix4(Mn),this}scale(e,t,n){return Mn.makeScale(e,t,n),this.applyMatrix4(Mn),this}lookAt(e){return uh.lookAt(e),uh.updateMatrix(),this.applyMatrix4(uh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gs).negate(),this.translate(Gs.x,Gs.y,Gs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ut(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ge("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];ln.setFromBufferAttribute(r),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,ln.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,ln.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(ln.min),this.boundingBox.expandByPoint(ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ze('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new dn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){let n=this.boundingSphere.center;if(ln.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Wr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ft.addVectors(ln.min,Wr.min),ln.expandByPoint(Ft),Ft.addVectors(ln.max,Wr.max),ln.expandByPoint(Ft)):(ln.expandByPoint(Wr.min),ln.expandByPoint(Wr.max))}ln.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Ft.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ft));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ft.fromBufferAttribute(a,l),c&&(Gs.fromBufferAttribute(e,l),Ft.add(Gs)),s=Math.max(s,n.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ze('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ze("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Mt(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],c=[];for(let x=0;x<n.count;x++)a[x]=new U,c[x]=new U;let l=new U,h=new U,u=new U,d=new ue,f=new ue,m=new ue,_=new U,g=new U;function p(x,R,I){l.fromBufferAttribute(n,x),h.fromBufferAttribute(n,R),u.fromBufferAttribute(n,I),d.fromBufferAttribute(r,x),f.fromBufferAttribute(r,R),m.fromBufferAttribute(r,I),h.sub(l),u.sub(l),f.sub(d),m.sub(d);let C=1/(f.x*m.y-m.x*f.y);isFinite(C)&&(_.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(C),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(C),a[x].add(_),a[R].add(_),a[I].add(_),c[x].add(g),c[R].add(g),c[I].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let x=0,R=M.length;x<R;++x){let I=M[x],C=I.start,D=I.count;for(let B=C,G=C+D;B<G;B+=3)p(e.getX(B+0),e.getX(B+1),e.getX(B+2))}let v=new U,y=new U,E=new U,w=new U;function T(x){E.fromBufferAttribute(s,x),w.copy(E);let R=a[x];v.copy(R),v.sub(E.multiplyScalar(E.dot(R))).normalize(),y.crossVectors(w,R);let C=y.dot(c[x])<0?-1:1;o.setXYZW(x,v.x,v.y,v.z,C)}for(let x=0,R=M.length;x<R;++x){let I=M[x],C=I.start,D=I.count;for(let B=C,G=C+D;B<G;B+=3)T(e.getX(B+0)),T(e.getX(B+1)),T(e.getX(B+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Mt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new U,r=new U,o=new U,a=new U,c=new U,l=new U,h=new U,u=new U;if(e)for(let d=0,f=e.count;d<f;d+=3){let m=e.getX(d+0),_=e.getX(d+1),g=e.getX(d+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ft.fromBufferAttribute(e,t),Ft.normalize(),e.setXYZ(t,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h),f=0,m=0;for(let _=0,g=c.length;_<g;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*h;for(let p=0;p<h;p++)d[m++]=l[f++]}return new Mt(d,h,u)}if(this.index===null)return Ge("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},ho=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ga,this.updateRanges=[],this.version=0,this.uuid=Jn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Jn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Jn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},$t=new U,fn=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix4(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyNormalMatrix(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.transformDirection(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=In(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=dt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=In(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=In(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=In(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=In(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),s=dt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),s=dt(s,this.array),r=dt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){ro("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Mt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ro("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Xg=0,Qn=class extends Kn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xg++}),this.uuid=Jn(),this.name="",this.type="Material",this.blending=fs,this.side=yi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Da,this.blendDst=Ua,this.blendEquation=ki,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=ps,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Rh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=us,this.stencilZFail=us,this.stencilZPass=us,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ge(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ge(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==fs&&(n.blending=this.blending),this.side!==yi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Da&&(n.blendSrc=this.blendSrc),this.blendDst!==Ua&&(n.blendDst=this.blendDst),this.blendEquation!==ki&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ps&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Rh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==us&&(n.stencilFail=this.stencilFail),this.stencilZFail!==us&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==us&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ze().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ue().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ue().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},ar=class extends Qn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ws,Xr=new U,Xs=new U,qs=new U,Zs=new ue,qr=new ue,mp=new tt,ua=new U,Zr=new U,da=new U,rf=new ue,dh=new ue,of=new ue,uo=class extends Pt{constructor(e=new ar){if(super(),this.isSprite=!0,this.type="Sprite",Ws===void 0){Ws=new Et;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ho(t,5);Ws.setIndex([0,1,2,0,2,3]),Ws.setAttribute("position",new fn(n,3,0,!1)),Ws.setAttribute("uv",new fn(n,2,3,!1))}this.geometry=Ws,this.material=e,this.center=new ue(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Ze('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Xs.setFromMatrixScale(this.matrixWorld),mp.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),qs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Xs.multiplyScalar(-qs.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;fa(ua.set(-.5,-.5,0),qs,o,Xs,s,r),fa(Zr.set(.5,-.5,0),qs,o,Xs,s,r),fa(da.set(.5,.5,0),qs,o,Xs,s,r),rf.set(0,0),dh.set(1,0),of.set(1,1);let a=e.ray.intersectTriangle(ua,Zr,da,!1,Xr);if(a===null&&(fa(Zr.set(-.5,.5,0),qs,o,Xs,s,r),dh.set(0,1),a=e.ray.intersectTriangle(ua,da,Zr,!1,Xr),a===null))return;let c=e.ray.origin.distanceTo(Xr);c<e.near||c>e.far||t.push({distance:c,point:Xr.clone(),uv:xi.getInterpolation(Xr,ua,Zr,da,rf,dh,of,new ue),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function fa(i,e,t,n,s,r){Zs.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(qr.x=r*Zs.x-s*Zs.y,qr.y=s*Zs.x+r*Zs.y):qr.copy(Zs),i.copy(e),i.x+=qr.x,i.y+=qr.y,i.applyMatrix4(mp)}var mi=new U,fh=new U,pa=new U,Bi=new U,ph=new U,ma=new U,mh=new U,cr=class{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,mi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=mi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(mi.copy(this.origin).addScaledVector(this.direction,t),mi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){fh.copy(e).add(t).multiplyScalar(.5),pa.copy(t).sub(e).normalize(),Bi.copy(this.origin).sub(fh);let r=e.distanceTo(t)*.5,o=-this.direction.dot(pa),a=Bi.dot(this.direction),c=-Bi.dot(pa),l=Bi.lengthSq(),h=Math.abs(1-o*o),u,d,f,m;if(h>0)if(u=o*c-a,d=o*a-c,m=r*h,u>=0)if(d>=-m)if(d<=m){let _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-m?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=m?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(fh).addScaledVector(pa,d),f}intersectSphere(e,t){mi.subVectors(e.center,this.origin);let n=mi.dot(this.direction),s=mi.dot(mi)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,mi)!==null}intersectTriangle(e,t,n,s,r){ph.subVectors(t,e),ma.subVectors(n,e),mh.crossVectors(ph,ma);let o=this.direction.dot(mh),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Bi.subVectors(this.origin,e);let c=a*this.direction.dot(ma.crossVectors(Bi,ma));if(c<0)return null;let l=a*this.direction.dot(ph.cross(Bi));if(l<0||c+l>o)return null;let h=-a*Bi.dot(mh);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Yt=class extends Qn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mi,this.combine=Wh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},af=new tt,ls=new cr,ga=new dn,cf=new U,xa=new U,_a=new U,ya=new U,gh=new U,va=new U,lf=new U,Ma=new U,_t=class extends Pt{constructor(e=new Et,t=new Yt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){va.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(gh.fromBufferAttribute(u,e),o?va.addScaledVector(gh,h):va.addScaledVector(gh.sub(t),h))}t.add(va)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ga.copy(n.boundingSphere),ga.applyMatrix4(r),ls.copy(e.ray).recast(e.near),!(ga.containsPoint(ls.origin)===!1&&(ls.intersectSphere(ga,cf)===null||ls.origin.distanceToSquared(cf)>(e.far-e.near)**2))&&(af.copy(r).invert(),ls.copy(e.ray).applyMatrix4(af),!(n.boundingBox!==null&&ls.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ls)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){let g=d[m],p=o[g.materialIndex],M=Math.max(g.start,f.start),v=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let y=M,E=v;y<E;y+=3){let w=a.getX(y),T=a.getX(y+1),x=a.getX(y+2);s=Sa(this,p,e,n,l,h,u,w,T,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){let M=a.getX(g),v=a.getX(g+1),y=a.getX(g+2);s=Sa(this,o,e,n,l,h,u,M,v,y),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){let g=d[m],p=o[g.materialIndex],M=Math.max(g.start,f.start),v=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let y=M,E=v;y<E;y+=3){let w=y,T=y+1,x=y+2;s=Sa(this,p,e,n,l,h,u,w,T,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){let M=g,v=g+1,y=g+2;s=Sa(this,o,e,n,l,h,u,M,v,y),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function qg(i,e,t,n,s,r,o,a){let c;if(e.side===Kt?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===yi,a),c===null)return null;Ma.copy(a),Ma.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Ma);return l<t.near||l>t.far?null:{distance:l,point:Ma.clone(),object:i}}function Sa(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,xa),i.getVertexPosition(c,_a),i.getVertexPosition(l,ya);let h=qg(i,e,t,n,xa,_a,ya,lf);if(h){let u=new U;xi.getBarycoord(lf,xa,_a,ya,u),s&&(h.uv=xi.getInterpolatedAttribute(s,a,c,l,u,new ue)),r&&(h.uv1=xi.getInterpolatedAttribute(r,a,c,l,u,new ue)),o&&(h.normal=xi.getInterpolatedAttribute(o,a,c,l,u,new U),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new U,materialIndex:0};xi.getNormal(xa,_a,ya,d.normal),h.face=d,h.barycoord=u}return h}var fo=class extends Bt{constructor(e=null,t=1,n=1,s,r,o,a,c,l=Dt,h=Dt,u,d){super(null,o,a,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ln=class extends Mt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ys=new tt,hf=new tt,ba=[],uf=new Rt,Zg=new tt,Yr=new _t,Jr=new dn,lr=class extends _t{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ln(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Zg)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Rt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ys),uf.copy(e.boundingBox).applyMatrix4(Ys),this.boundingBox.union(uf)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new dn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ys),Jr.copy(e.boundingSphere).applyMatrix4(Ys),this.boundingSphere.union(Jr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Yr.geometry=this.geometry,Yr.material=this.material,Yr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Jr.copy(this.boundingSphere),Jr.applyMatrix4(n),e.ray.intersectsSphere(Jr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ys),hf.multiplyMatrices(n,Ys),Yr.matrixWorld=hf,Yr.raycast(e,ba);for(let o=0,a=ba.length;o<a;o++){let c=ba[o];c.instanceId=r,c.object=this,t.push(c)}ba.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ln(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new fo(new Float32Array(s*this.count),s,this.count,Sc,En));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;return r[c]=a,r.set(n,c+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},xh=new U,Yg=new U,Jg=new We,qt=class{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=xh.subVectors(n,t).cross(Yg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(xh),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Jg.getNormalMatrix(e),s=this.coplanarPoint(xh).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},hs=new dn,$g=new ue(.5,.5),Ea=new U,hr=class{constructor(e=new qt,t=new qt,n=new qt,s=new qt,r=new qt,o=new qt){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Pn,n=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],d=r[6],f=r[7],m=r[8],_=r[9],g=r[10],p=r[11],M=r[12],v=r[13],y=r[14],E=r[15];if(s[0].setComponents(l-o,f-h,p-m,E-M).normalize(),s[1].setComponents(l+o,f+h,p+m,E+M).normalize(),s[2].setComponents(l+a,f+u,p+_,E+v).normalize(),s[3].setComponents(l-a,f-u,p-_,E-v).normalize(),n)s[4].setComponents(c,d,g,y).normalize(),s[5].setComponents(l-c,f-d,p-g,E-y).normalize();else if(s[4].setComponents(l-c,f-d,p-g,E-y).normalize(),t===Pn)s[5].setComponents(l+c,f+d,p+g,E+y).normalize();else if(t===tr)s[5].setComponents(c,d,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),hs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),hs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(hs)}intersectsSprite(e){hs.center.set(0,0,0);let t=$g.distanceTo(e.center);return hs.radius=.7071067811865476+t,hs.applyMatrix4(e.matrixWorld),this.intersectsSphere(hs)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Ea.x=s.normal.x>0?e.max.x:e.min.x,Ea.y=s.normal.y>0?e.max.y:e.min.y,Ea.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ea)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Hi=class extends Qn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},qa=new U,Za=new U,df=new tt,$r=new cr,wa=new dn,_h=new U,ff=new U,gs=class extends Pt{constructor(e=new Et,t=new Hi){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)qa.fromBufferAttribute(t,s-1),Za.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=qa.distanceTo(Za);e.setAttribute("lineDistance",new ut(n,1))}else Ge("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),wa.copy(n.boundingSphere),wa.applyMatrix4(s),wa.radius+=r,e.ray.intersectsSphere(wa)===!1)return;df.copy(s).invert(),$r.copy(e.ray).applyMatrix4(df);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let _=f,g=m-1;_<g;_+=l){let p=h.getX(_),M=h.getX(_+1),v=Ta(this,e,$r,c,p,M,_);v&&t.push(v)}if(this.isLineLoop){let _=h.getX(m-1),g=h.getX(f),p=Ta(this,e,$r,c,_,g,m-1);p&&t.push(p)}}else{let f=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let _=f,g=m-1;_<g;_+=l){let p=Ta(this,e,$r,c,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){let _=Ta(this,e,$r,c,m-1,f,m-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Ta(i,e,t,n,s,r,o){let a=i.geometry.attributes.position;if(qa.fromBufferAttribute(a,s),Za.fromBufferAttribute(a,r),t.distanceSqToSegment(qa,Za,_h,ff)>n)return;_h.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(_h);if(!(l<e.near||l>e.far))return{distance:l,point:ff.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var pf=new U,mf=new U,ur=class extends gs{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)pf.fromBufferAttribute(t,s),mf.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+pf.distanceTo(mf);e.setAttribute("lineDistance",new ut(n,1))}else Ge("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Gi=class extends Bt{constructor(e,t,n,s,r,o,a,c,l,h,u,d){super(null,o,a,c,l,h,s,r,u,d),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}};var po=class extends Bt{constructor(e=[],t=Ji,n,s,r,o,a,c,l,h){super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},pn=class extends Bt{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Si=class extends Bt{constructor(e,t,n=On,s,r,o,a=Dt,c=Dt,l,h=$n,u=1){if(h!==$n&&h!==$i)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new vi(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Ya=class extends Si{constructor(e,t=On,n=Ji,s,r,o=Dt,a=Dt,c,l=$n){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,s,r,o,a,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},mo=class extends Bt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},dr=class i extends Et{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],d=0,f=0;m("z","y","x",-1,-1,n,t,e,o,r,0),m("z","y","x",1,-1,n,t,-e,o,r,1),m("x","z","y",1,1,e,n,t,s,o,2),m("x","z","y",1,-1,e,n,-t,s,o,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ut(l,3)),this.setAttribute("normal",new ut(h,3)),this.setAttribute("uv",new ut(u,2));function m(_,g,p,M,v,y,E,w,T,x,R){let I=y/T,C=E/x,D=y/2,B=E/2,G=w/2,O=T+1,q=x+1,H=0,k=0,ie=new U;for(let re=0;re<q;re++){let xe=re*C-B;for(let ye=0;ye<O;ye++){let Ue=ye*I-D;ie[_]=Ue*M,ie[g]=xe*v,ie[p]=G,l.push(ie.x,ie.y,ie.z),ie[_]=0,ie[g]=0,ie[p]=w>0?1:-1,h.push(ie.x,ie.y,ie.z),u.push(ye/T),u.push(1-re/x),H+=1}}for(let re=0;re<x;re++)for(let xe=0;xe<T;xe++){let ye=d+xe+O*re,Ue=d+xe+O*(re+1),Je=d+(xe+1)+O*(re+1),qe=d+(xe+1)+O*re;c.push(ye,Ue,qe),c.push(Ue,Je,qe),k+=6}a.addGroup(f,k,R),f+=k,d+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var mn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ge("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=t||(o.isVector2?new ue:new U);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new U,s=[],r=[],o=[],a=new U,c=new tt;for(let f=0;f<=e;f++){let m=f/e;s[f]=this.getTangentAt(m,new U)}r[0]=new U,o[0]=new U;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos($e(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,m))}o[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos($e(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let m=1;m<=e;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],f*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},fr=class extends mn{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new ue){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Ja=class extends fr{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function ou(){let i=0,e=0,t=0,n=0;function s(r,o,a,c){i=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return i+e*r+t*o+n*a}}}var gf=new U,xf=new U,yh=new ou,vh=new ou,Mh=new ou,$a=class extends mn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new U){let n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(xf.subVectors(s[0],s[1]).add(s[0]),l=xf);let u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(gf.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=gf),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),yh.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,m,_,g),vh.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,m,_,g),Mh.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,m,_,g)}else this.curveType==="catmullrom"&&(yh.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),vh.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),Mh.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(yh.calc(c),vh.calc(c),Mh.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new U().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function _f(i,e,t,n,s){let r=(n-e)*.5,o=(s-t)*.5,a=i*i,c=i*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*i+t}function Kg(i,e){let t=1-i;return t*t*e}function jg(i,e){return 2*(1-i)*i*e}function Qg(i,e){return i*i*e}function eo(i,e,t,n){return Kg(i,e)+jg(i,t)+Qg(i,n)}function e0(i,e){let t=1-i;return t*t*t*e}function t0(i,e){let t=1-i;return 3*t*t*i*e}function n0(i,e){return 3*(1-i)*i*i*e}function i0(i,e){return i*i*i*e}function to(i,e,t,n,s){return e0(i,e)+t0(i,t)+n0(i,n)+i0(i,s)}var go=class extends mn{constructor(e=new ue,t=new ue,n=new ue,s=new ue){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ue){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(to(e,s.x,r.x,o.x,a.x),to(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ka=class extends mn{constructor(e=new U,t=new U,n=new U,s=new U){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new U){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(to(e,s.x,r.x,o.x,a.x),to(e,s.y,r.y,o.y,a.y),to(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},xo=class extends mn{constructor(e=new ue,t=new ue){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ue){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ue){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ja=class extends mn{constructor(e=new U,t=new U){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new U){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new U){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},_o=class extends mn{constructor(e=new ue,t=new ue,n=new ue){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ue){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(eo(e,s.x,r.x,o.x),eo(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Qa=class extends mn{constructor(e=new U,t=new U,n=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new U){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(eo(e,s.x,r.x,o.x),eo(e,s.y,r.y,o.y),eo(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},yo=class extends mn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ue){let n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(_f(a,c.x,l.x,h.x,u.x),_f(a,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new ue().fromArray(s))}return this}},Ch=Object.freeze({__proto__:null,ArcCurve:Ja,CatmullRomCurve3:$a,CubicBezierCurve:go,CubicBezierCurve3:Ka,EllipseCurve:fr,LineCurve:xo,LineCurve3:ja,QuadraticBezierCurve:_o,QuadraticBezierCurve3:Qa,SplineCurve:yo}),ec=class extends mn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ch[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new Ch[s.type]().fromJSON(s))}return this}},ei=class extends ec{constructor(e){super(),this.type="Path",this.currentPoint=new ue,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new xo(this.currentPoint.clone(),new ue(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new _o(this.currentPoint.clone(),new ue(e,t),new ue(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){let a=new go(this.currentPoint.clone(),new ue(e,t),new ue(n,s),new ue(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new yo(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,r,o,a,c),this}absellipse(e,t,n,s,r,o,a,c){let l=new fr(e,t,n,s,r,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},vo=class extends ei{constructor(e){super(e),this.uuid=Jn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new ei().fromJSON(s))}return this}};function s0(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=gp(i,0,s,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(n&&(r=l0(i,e,r,t)),i.length>80*t){a=i[0],c=i[1];let h=a,u=c;for(let d=t;d<s;d+=t){let f=i[d],m=i[d+1];f<a&&(a=f),m<c&&(c=m),f>h&&(h=f),m>u&&(u=m)}l=Math.max(h-a,u-c),l=l!==0?32767/l:0}return Mo(r,o,t,a,c,l,0),o}function gp(i,e,t,n,s){let r;if(s===v0(i,e,t,n)>0)for(let o=e;o<t;o+=n)r=yf(o/n|0,i[o],i[o+1],r);else for(let o=t-n;o>=e;o-=n)r=yf(o/n|0,i[o],i[o+1],r);return r&&pr(r,r.next)&&(bo(r),r=r.next),r}function xs(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(pr(t,t.next)||St(t.prev,t,t.next)===0)){if(bo(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Mo(i,e,t,n,s,r,o){if(!i)return;!o&&r&&p0(i,n,s,r);let a=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?o0(i,n,s,r):r0(i)){e.push(c.i,i.i,l.i),bo(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=a0(xs(i),e),Mo(i,e,t,n,s,r,2)):o===2&&c0(i,e,t,n,s,r):Mo(xs(i),e,t,n,s,r,1);break}}}function r0(i){let e=i.prev,t=i,n=i.next;if(St(e,t,n)>=0)return!1;let s=e.x,r=t.x,o=n.x,a=e.y,c=t.y,l=n.y,h=Math.min(s,r,o),u=Math.min(a,c,l),d=Math.max(s,r,o),f=Math.max(a,c,l),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&Kr(s,a,r,c,o,l,m.x,m.y)&&St(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function o0(i,e,t,n){let s=i.prev,r=i,o=i.next;if(St(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,d=o.y,f=Math.min(a,c,l),m=Math.min(h,u,d),_=Math.max(a,c,l),g=Math.max(h,u,d),p=Ih(f,m,e,t,n),M=Ih(_,g,e,t,n),v=i.prevZ,y=i.nextZ;for(;v&&v.z>=p&&y&&y.z<=M;){if(v.x>=f&&v.x<=_&&v.y>=m&&v.y<=g&&v!==s&&v!==o&&Kr(a,h,c,u,l,d,v.x,v.y)&&St(v.prev,v,v.next)>=0||(v=v.prevZ,y.x>=f&&y.x<=_&&y.y>=m&&y.y<=g&&y!==s&&y!==o&&Kr(a,h,c,u,l,d,y.x,y.y)&&St(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;v&&v.z>=p;){if(v.x>=f&&v.x<=_&&v.y>=m&&v.y<=g&&v!==s&&v!==o&&Kr(a,h,c,u,l,d,v.x,v.y)&&St(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;y&&y.z<=M;){if(y.x>=f&&y.x<=_&&y.y>=m&&y.y<=g&&y!==s&&y!==o&&Kr(a,h,c,u,l,d,y.x,y.y)&&St(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function a0(i,e){let t=i;do{let n=t.prev,s=t.next.next;!pr(n,s)&&_p(n,t,t.next,s)&&So(n,s)&&So(s,n)&&(e.push(n.i,t.i,s.i),bo(t),bo(t.next),t=i=s),t=t.next}while(t!==i);return xs(t)}function c0(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&x0(o,a)){let c=yp(o,a);o=xs(o,o.next),c=xs(c,c.next),Mo(o,e,t,n,s,r,0),Mo(c,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function l0(i,e,t,n){let s=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,c=r<o-1?e[r+1]*n:i.length,l=gp(i,a,c,n,!1);l===l.next&&(l.steiner=!0),s.push(g0(l))}s.sort(h0);for(let r=0;r<s.length;r++)t=u0(s[r],t);return t}function h0(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function u0(i,e){let t=d0(i,e);if(!t)return e;let n=yp(t,i);return xs(n,n.next),xs(t,t.next)}function d0(i,e){let t=e,n=i.x,s=i.y,r=-1/0,o;if(pr(i,t))return t;do{if(pr(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let u=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,c=o.x,l=o.y,h=1/0;t=o;do{if(n>=t.x&&t.x>=c&&n!==t.x&&xp(s<l?n:r,s,c,l,s<l?r:n,s,t.x,t.y)){let u=Math.abs(s-t.y)/(n-t.x);So(t,i)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&f0(o,t)))&&(o=t,h=u)}t=t.next}while(t!==a);return o}function f0(i,e){return St(i.prev,i,e.prev)<0&&St(e.next,i,i.next)<0}function p0(i,e,t,n){let s=i;do s.z===0&&(s.z=Ih(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,m0(s)}function m0(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let l=0;l<t&&(a++,o=o.nextZ,!!o);l++);let c=t;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,t*=2}while(e>1);return i}function Ih(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function g0(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function xp(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function Kr(i,e,t,n,s,r,o,a){return!(i===o&&e===a)&&xp(i,e,t,n,s,r,o,a)}function x0(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!_0(i,e)&&(So(i,e)&&So(e,i)&&y0(i,e)&&(St(i.prev,i,e.prev)||St(i,e.prev,e))||pr(i,e)&&St(i.prev,i,i.next)>0&&St(e.prev,e,e.next)>0)}function St(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function pr(i,e){return i.x===e.x&&i.y===e.y}function _p(i,e,t,n){let s=Ra(St(i,e,t)),r=Ra(St(i,e,n)),o=Ra(St(t,n,i)),a=Ra(St(t,n,e));return!!(s!==r&&o!==a||s===0&&Aa(i,t,e)||r===0&&Aa(i,n,e)||o===0&&Aa(t,i,n)||a===0&&Aa(t,e,n))}function Aa(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Ra(i){return i>0?1:i<0?-1:0}function _0(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&_p(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function So(i,e){return St(i.prev,i,i.next)<0?St(i,e,i.next)>=0&&St(i,i.prev,e)>=0:St(i,e,i.prev)<0||St(i,i.next,e)<0}function y0(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function yp(i,e){let t=Ph(i.i,i.x,i.y),n=Ph(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function yf(i,e,t,n){let s=Ph(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function bo(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Ph(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function v0(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Lh=class{static triangulate(e,t,n=2){return s0(e,t,n)}},Yn=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];vf(e),Mf(n,e);let o=e.length;t.forEach(vf);for(let c=0;c<t.length;c++)s.push(o),o+=t[c].length,Mf(n,t[c]);let a=Lh.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function vf(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Mf(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Eo=class i extends Et{constructor(e=new vo([new ue(.5,.5),new ue(-.5,.5),new ue(-.5,-.5),new ue(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let a=0,c=e.length;a<c;a++){let l=e[a];o(l)}this.setAttribute("position",new ut(s,3)),this.setAttribute("uv",new ut(r,2)),this.computeVertexNormals();function o(a){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:M0,v,y=!1,E,w,T,x;if(p){v=p.getSpacedPoints(h),y=!0,d=!1;let P=p.isCatmullRomCurve3?p.closed:!1;E=p.computeFrenetFrames(h,P),w=new U,T=new U,x=new U}d||(g=0,f=0,m=0,_=0);let R=a.extractPoints(l),I=R.shape,C=R.holes;if(!Yn.isClockWise(I)){I=I.reverse();for(let P=0,X=C.length;P<X;P++){let z=C[P];Yn.isClockWise(z)&&(C[P]=z.reverse())}}function B(P){let z=10000000000000001e-36,j=P[0];for(let ee=1;ee<=P.length;ee++){let ce=ee%P.length,me=P[ce],ge=me.x-j.x,Y=me.y-j.y,b=ge*ge+Y*Y,Ie=Math.max(Math.abs(me.x),Math.abs(me.y),Math.abs(j.x),Math.abs(j.y)),De=z*Ie*Ie;if(b<=De){P.splice(ce,1),ee--;continue}j=me}}B(I),C.forEach(B);let G=C.length,O=I;for(let P=0;P<G;P++){let X=C[P];I=I.concat(X)}function q(P,X,z){return X||Ze("ExtrudeGeometry: vec does not exist"),P.clone().addScaledVector(X,z)}let H=I.length;function k(P,X,z){let j,ee,ce,me=P.x-X.x,ge=P.y-X.y,Y=z.x-P.x,b=z.y-P.y,Ie=me*me+ge*ge,De=me*b-ge*Y;if(Math.abs(De)>Number.EPSILON){let L=Math.sqrt(Ie),S=Math.sqrt(Y*Y+b*b),$=X.x-ge/L,Q=X.y+me/L,oe=z.x-b/S,ve=z.y+Y/S,Me=((oe-$)*b-(ve-Q)*Y)/(me*b-ge*Y);j=$+me*Me-P.x,ee=Q+ge*Me-P.y;let le=j*j+ee*ee;if(le<=2)return new ue(j,ee);ce=Math.sqrt(le/2)}else{let L=!1;me>Number.EPSILON?Y>Number.EPSILON&&(L=!0):me<-Number.EPSILON?Y<-Number.EPSILON&&(L=!0):Math.sign(ge)===Math.sign(b)&&(L=!0),L?(j=-ge,ee=me,ce=Math.sqrt(Ie)):(j=me,ee=ge,ce=Math.sqrt(Ie/2))}return new ue(j/ce,ee/ce)}let ie=[];for(let P=0,X=O.length,z=X-1,j=P+1;P<X;P++,z++,j++)z===X&&(z=0),j===X&&(j=0),ie[P]=k(O[P],O[z],O[j]);let re=[],xe,ye=ie.concat();for(let P=0,X=G;P<X;P++){let z=C[P];xe=[];for(let j=0,ee=z.length,ce=ee-1,me=j+1;j<ee;j++,ce++,me++)ce===ee&&(ce=0),me===ee&&(me=0),xe[j]=k(z[j],z[ce],z[me]);re.push(xe),ye=ye.concat(xe)}let Ue;if(g===0)Ue=Yn.triangulateShape(O,C);else{let P=[],X=[];for(let z=0;z<g;z++){let j=z/g,ee=f*Math.cos(j*Math.PI/2),ce=m*Math.sin(j*Math.PI/2)+_;for(let me=0,ge=O.length;me<ge;me++){let Y=q(O[me],ie[me],ce);F(Y.x,Y.y,-ee),j===0&&P.push(Y)}for(let me=0,ge=G;me<ge;me++){let Y=C[me];xe=re[me];let b=[];for(let Ie=0,De=Y.length;Ie<De;Ie++){let L=q(Y[Ie],xe[Ie],ce);F(L.x,L.y,-ee),j===0&&b.push(L)}j===0&&X.push(b)}}Ue=Yn.triangulateShape(P,X)}let Je=Ue.length,qe=m+_;for(let P=0;P<H;P++){let X=d?q(I[P],ye[P],qe):I[P];y?(T.copy(E.normals[0]).multiplyScalar(X.x),w.copy(E.binormals[0]).multiplyScalar(X.y),x.copy(v[0]).add(T).add(w),F(x.x,x.y,x.z)):F(X.x,X.y,0)}for(let P=1;P<=h;P++)for(let X=0;X<H;X++){let z=d?q(I[X],ye[X],qe):I[X];y?(T.copy(E.normals[P]).multiplyScalar(z.x),w.copy(E.binormals[P]).multiplyScalar(z.y),x.copy(v[P]).add(T).add(w),F(x.x,x.y,x.z)):F(z.x,z.y,u/h*P)}for(let P=g-1;P>=0;P--){let X=P/g,z=f*Math.cos(X*Math.PI/2),j=m*Math.sin(X*Math.PI/2)+_;for(let ee=0,ce=O.length;ee<ce;ee++){let me=q(O[ee],ie[ee],j);F(me.x,me.y,u+z)}for(let ee=0,ce=C.length;ee<ce;ee++){let me=C[ee];xe=re[ee];for(let ge=0,Y=me.length;ge<Y;ge++){let b=q(me[ge],xe[ge],j);y?F(b.x,b.y+v[h-1].y,v[h-1].x+z):F(b.x,b.y,u+z)}}}he(),J();function he(){let P=s.length/3;if(d){let X=0,z=H*X;for(let j=0;j<Je;j++){let ee=Ue[j];N(ee[2]+z,ee[1]+z,ee[0]+z)}X=h+g*2,z=H*X;for(let j=0;j<Je;j++){let ee=Ue[j];N(ee[0]+z,ee[1]+z,ee[2]+z)}}else{for(let X=0;X<Je;X++){let z=Ue[X];N(z[2],z[1],z[0])}for(let X=0;X<Je;X++){let z=Ue[X];N(z[0]+H*h,z[1]+H*h,z[2]+H*h)}}n.addGroup(P,s.length/3-P,0)}function J(){let P=s.length/3,X=0;V(O,X),X+=O.length;for(let z=0,j=C.length;z<j;z++){let ee=C[z];V(ee,X),X+=ee.length}n.addGroup(P,s.length/3-P,1)}function V(P,X){let z=P.length;for(;--z>=0;){let j=z,ee=z-1;ee<0&&(ee=P.length-1);for(let ce=0,me=h+g*2;ce<me;ce++){let ge=H*ce,Y=H*(ce+1),b=X+j+ge,Ie=X+ee+ge,De=X+ee+Y,L=X+j+Y;W(b,Ie,De,L)}}}function F(P,X,z){c.push(P),c.push(X),c.push(z)}function N(P,X,z){ae(P),ae(X),ae(z);let j=s.length/3,ee=M.generateTopUV(n,s,j-3,j-2,j-1);fe(ee[0]),fe(ee[1]),fe(ee[2])}function W(P,X,z,j){ae(P),ae(X),ae(j),ae(X),ae(z),ae(j);let ee=s.length/3,ce=M.generateSideWallUV(n,s,ee-6,ee-3,ee-2,ee-1);fe(ce[0]),fe(ce[1]),fe(ce[3]),fe(ce[1]),fe(ce[2]),fe(ce[3])}function ae(P){s.push(c[P*3+0]),s.push(c[P*3+1]),s.push(c[P*3+2])}function fe(P){r.push(P.x),r.push(P.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return S0(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,o=e.shapes.length;r<o;r++){let a=t[e.shapes[r]];n.push(a)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Ch[s.type]().fromJSON(s)),new i(n,e.options)}},M0={generateTopUV:function(i,e,t,n,s){let r=e[t*3],o=e[t*3+1],a=e[n*3],c=e[n*3+1],l=e[s*3],h=e[s*3+1];return[new ue(r,o),new ue(a,c),new ue(l,h)]},generateSideWallUV:function(i,e,t,n,s,r){let o=e[t*3],a=e[t*3+1],c=e[t*3+2],l=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[s*3],f=e[s*3+1],m=e[s*3+2],_=e[r*3],g=e[r*3+1],p=e[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new ue(o,1-c),new ue(l,1-u),new ue(d,1-m),new ue(_,1-p)]:[new ue(a,1-c),new ue(h,1-u),new ue(f,1-m),new ue(g,1-p)]}};function S0(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Nn=class i extends Et{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=e/a,d=t/c,f=[],m=[],_=[],g=[];for(let p=0;p<h;p++){let M=p*d-o;for(let v=0;v<l;v++){let y=v*u-r;m.push(y,-M,0),_.push(0,0,1),g.push(v/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<a;M++){let v=M+l*p,y=M+l*(p+1),E=M+1+l*(p+1),w=M+1+l*p;f.push(v,y,w),f.push(y,E,w)}this.setIndex(f),this.setAttribute("position",new ut(m,3)),this.setAttribute("normal",new ut(_,3)),this.setAttribute("uv",new ut(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var wo=class i extends Et{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new U,d=new U,f=[],m=[],_=[],g=[];for(let p=0;p<=n;p++){let M=[],v=p/n,y=o+v*a,E=e*Math.cos(y),w=Math.sqrt(e*e-E*E),T=0;p===0&&o===0?T=.5/t:p===n&&c===Math.PI&&(T=-.5/t);for(let x=0;x<=t;x++){let R=x/t,I=s+R*r;u.x=-w*Math.cos(I),u.y=E,u.z=w*Math.sin(I),m.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),g.push(R+T,1-v),M.push(l++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<t;M++){let v=h[p][M+1],y=h[p][M],E=h[p+1][M],w=h[p+1][M+1];(p!==0||o>0)&&f.push(v,y,w),(p!==n-1||c<Math.PI)&&f.push(y,E,w)}this.setIndex(f),this.setAttribute("position",new ut(m,3)),this.setAttribute("normal",new ut(_,3)),this.setAttribute("uv",new ut(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var To=class extends Et{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,s=new U,r=new U;if(e.index!==null){let o=e.attributes.position,a=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:a.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){let u=c[l],d=u.start,f=u.count;for(let m=d,_=d+f;m<_;m+=3)for(let g=0;g<3;g++){let p=a.getX(m+g),M=a.getX(m+(g+1)%3);s.fromBufferAttribute(o,p),r.fromBufferAttribute(o,M),Sf(s,r,n)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}}else{let o=e.attributes.position;for(let a=0,c=o.count/3;a<c;a++)for(let l=0;l<3;l++){let h=3*a+l,u=3*a+(l+1)%3;s.fromBufferAttribute(o,h),r.fromBufferAttribute(o,u),Sf(s,r,n)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new ut(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Sf(i,e,t){let n=`${i.x},${i.y},${i.z}-${e.x},${e.y},${e.z}`,s=`${e.x},${e.y},${e.z}-${i.x},${i.y},${i.z}`;return t.has(n)===!0||t.has(s)===!0?!1:(t.add(n),t.add(s),!0)}function Ss(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(bf(s))s.isRenderTargetTexture?(Ge("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(bf(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Jt(i){let e={};for(let t=0;t<i.length;t++){let n=Ss(i[t]);for(let s in n)e[s]=n[s]}return e}function bf(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function b0(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function au(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:it.workingColorSpace}var Go={clone:Ss,merge:Jt},E0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,w0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,zt=class extends Qn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=E0,this.fragmentShader=w0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ss(e.uniforms),this.uniformsGroups=b0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new ze().setHex(s.value);break;case"v2":this.uniforms[n].value=new ue().fromArray(s.value);break;case"v3":this.uniforms[n].value=new U().fromArray(s.value);break;case"v4":this.uniforms[n].value=new at().fromArray(s.value);break;case"m3":this.uniforms[n].value=new We().fromArray(s.value);break;case"m4":this.uniforms[n].value=new tt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},tc=class extends zt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Ao=class extends Qn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nl,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var nc=class extends Qn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=np,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ic=class extends Qn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ca(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}var Wi=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},sc=class extends Wi{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:wh,endingEnd:wh}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Th:r=e,a=2*t-n;break;case Ah:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Th:o=e,c=2*n-t;break;case Ah:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(s-t),_=m*m,g=_*m,p=-d*g+2*d*_-d*m,M=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*m+1,v=(-1-f)*g+(1.5+f)*_+.5*m,y=f*g-f*_;for(let E=0;E!==a;++E)r[E]=p*o[h+E]+M*o[l+E]+v*o[c+E]+y*o[u+E];return r}},rc=class extends Wi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(s-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}},oc=class extends Wi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},ac=class extends Wi{interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let m=(n-t)/(s-t),_=1-m;for(let g=0;g!==a;++g)r[g]=o[l+g]*_+o[c+g]*m;return r}let d=a*2,f=e-1;for(let m=0;m!==a;++m){let _=o[l+m],g=o[c+m],p=f*d+m*2,M=u[p],v=u[p+1],y=e*d+m*2,E=h[y],w=h[y+1],T=(n-t)/(s-t),x,R,I,C,D;for(let B=0;B<8;B++){x=T*T,R=x*T,I=1-T,C=I*I,D=C*I;let O=D*t+3*C*T*M+3*I*x*E+R*s-n;if(Math.abs(O)<1e-10)break;let q=3*C*(M-t)+6*I*T*(E-M)+3*x*(s-E);if(Math.abs(q)<1e-10)break;T=T-O/q,T=Math.max(0,Math.min(1,T))}r[m]=D*_+3*C*T*v+3*I*x*w+R*g}return r}},gn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ca(t,this.TimeBufferType),this.values=Ca(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ca(e.times,Array),values:Ca(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new oc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new rc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new sc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new ac(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ms:t=this.InterpolantFactoryMethodDiscrete;break;case er:t=this.InterpolantFactoryMethodLinear;break;case Na:t=this.InterpolantFactoryMethodSmooth;break;case Eh:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ge("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ms;case this.InterpolantFactoryMethodLinear:return er;case this.InterpolantFactoryMethodSmooth:return Na;case this.InterpolantFactoryMethodBezier:return Eh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ze("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ze("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){Ze("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){Ze("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&mg(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){Ze("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Na,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(s)c=!0;else{let u=a*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){let _=t[u+m];if(_!==t[d+m]||_!==t[f+m]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};gn.prototype.ValueTypeName="";gn.prototype.TimeBufferType=Float32Array;gn.prototype.ValueBufferType=Float32Array;gn.prototype.DefaultInterpolation=er;var Xi=class extends gn{constructor(e,t,n){super(e,t,n)}};Xi.prototype.ValueTypeName="bool";Xi.prototype.ValueBufferType=Array;Xi.prototype.DefaultInterpolation=ms;Xi.prototype.InterpolantFactoryMethodLinear=void 0;Xi.prototype.InterpolantFactoryMethodSmooth=void 0;var cc=class extends gn{constructor(e,t,n,s){super(e,t,n,s)}};cc.prototype.ValueTypeName="color";var lc=class extends gn{constructor(e,t,n,s){super(e,t,n,s)}};lc.prototype.ValueTypeName="number";var hc=class extends Wi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t),l=e*a;for(let h=l+a;l!==h;l+=4)bn.slerpFlat(r,0,o,l-a,o,l,c);return r}},Ro=class extends gn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new hc(this.times,this.values,this.getValueSize(),e)}};Ro.prototype.ValueTypeName="quaternion";Ro.prototype.InterpolantFactoryMethodSmooth=void 0;var qi=class extends gn{constructor(e,t,n){super(e,t,n)}};qi.prototype.ValueTypeName="string";qi.prototype.ValueBufferType=Array;qi.prototype.DefaultInterpolation=ms;qi.prototype.InterpolantFactoryMethodLinear=void 0;qi.prototype.InterpolantFactoryMethodSmooth=void 0;var uc=class extends gn{constructor(e,t,n,s){super(e,t,n,s)}};uc.prototype.ValueTypeName="vector";var Nh={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(Ef(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!Ef(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Ef(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var dc=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let f=l[u],m=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},vp=new dc,_s=class{constructor(e){this.manager=e!==void 0?e:vp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};_s.DEFAULT_MATERIAL_NAME="__DEFAULT";var gi={},Dh=class extends Error{constructor(e,t){super(e),this.response=t}},Co=class extends _s{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Nh.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(gi[e]!==void 0){gi[e].push({onLoad:t,onProgress:n,onError:s});return}gi[e]=[],gi[e].push({onLoad:t,onProgress:n,onError:s});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Ge("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=gi[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0,_=0,g=new ReadableStream({start(p){M();function M(){u.read().then(({done:v,value:y})=>{if(v)p.close();else{_+=y.byteLength;let E=new ProgressEvent("progress",{lengthComputable:m,loaded:_,total:f});for(let w=0,T=h.length;w<T;w++){let x=h[w];x.onProgress&&x.onProgress(E)}p.enqueue(y),M()}},v=>{p.error(v)})}}});return new Response(g)}else throw new Dh(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a==="")return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(m=>f.decode(m))}}}).then(l=>{Nh.add(`file:${e}`,l);let h=gi[e];delete gi[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{let h=gi[e];if(h===void 0)throw this.manager.itemError(e),l;delete gi[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Io=class extends Pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Po=class extends Io{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ze(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Sh=new tt,wf=new U,Tf=new U,Uh=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.mapType=sn,this.map=null,this.mapPass=null,this.matrix=new tt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new hr,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;wf.setFromMatrixPosition(e.matrixWorld),t.position.copy(wf),Tf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Tf),t.updateMatrixWorld(),Sh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sh,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===tr||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Sh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ia=new U,Pa=new bn,Zn=new U,Lo=class extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new tt,this.projectionMatrix=new tt,this.projectionMatrixInverse=new tt,this.coordinateSystem=Pn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ia,Pa,Zn),Zn.x===1&&Zn.y===1&&Zn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ia,Pa,Zn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ia,Pa,Zn),Zn.x===1&&Zn.y===1&&Zn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ia,Pa,Zn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},zi=new U,Af=new ue,Rf=new ue,Zt=class extends Lo{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ir*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(jr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ir*2*Math.atan(Math.tan(jr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){zi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(zi.x,zi.y).multiplyScalar(-e/zi.z),zi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(zi.x,zi.y).multiplyScalar(-e/zi.z)}getViewSize(e,t){return this.getViewBounds(e,Af,Rf),t.subVectors(Rf,Af)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(jr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Zi=class extends Lo{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Oh=class extends Uh{constructor(){super(new Zi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},mr=class extends Io{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.shadow=new Oh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var ys=class extends Et{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var Js=-90,$s=1,fc=class extends Pt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Zt(Js,$s,e,t);s.layers=this.layers,this.add(s);let r=new Zt(Js,$s,e,t);r.layers=this.layers,this.add(r);let o=new Zt(Js,$s,e,t);o.layers=this.layers,this.add(o);let a=new Zt(Js,$s,e,t);a.layers=this.layers,this.add(a);let c=new Zt(Js,$s,e,t);c.layers=this.layers,this.add(c);let l=new Zt(Js,$s,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===Pn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===tr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},pc=class extends Zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var cu="\\[\\]\\.:\\/",T0=new RegExp("["+cu+"]","g"),lu="[^"+cu+"]",A0="[^"+cu.replace("\\.","")+"]",R0=/((?:WC+[\/:])*)/.source.replace("WC",lu),C0=/(WCOD+)?/.source.replace("WCOD",A0),I0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",lu),P0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",lu),L0=new RegExp("^"+R0+C0+I0+P0+"$"),N0=["material","materials","bones","map"],Fh=class{constructor(e,t,n){let s=n||lt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},lt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(T0,"")}static parseTrackName(e){let t=L0.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);N0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ge("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){Ze("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ze("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ze("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ze("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ze("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ze("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){Ze("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;Ze("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ze("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ze("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};lt.Composite=Fh;lt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};lt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};lt.prototype.GetterByBindingType=[lt.prototype._getValue_direct,lt.prototype._getValue_array,lt.prototype._getValue_arrayElement,lt.prototype._getValue_toArray];lt.prototype.SetterByBindingTypeAndVersioning=[[lt.prototype._setValue_direct,lt.prototype._setValue_direct_setNeedsUpdate,lt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[lt.prototype._setValue_array,lt.prototype._setValue_array_setNeedsUpdate,lt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[lt.prototype._setValue_arrayElement,lt.prototype._setValue_arrayElement_setNeedsUpdate,lt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[lt.prototype._setValue_fromArray,lt.prototype._setValue_fromArray_setNeedsUpdate,lt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var SM=new Float32Array(1);var Yi=class extends ho{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}};var Cf=new tt,bi=class{constructor(e,t,n=0,s=1/0){this.ray=new cr(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new rr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ze("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Cf.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Cf),this}intersectObject(e,t=!0,n=[]){return Bh(e,this,n,t),n.sort(If),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Bh(e[s],this,n,t);return n.sort(If),n}};function If(i,e){return i.distance-e.distance}function Bh(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Bh(r[o],e,t,!0)}}var mu=class mu{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};mu.prototype.isMatrix2=!0;var zh=mu,Pf=new ue,gr=class{constructor(e=new ue(1/0,1/0),t=new ue(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Pf.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Pf).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Lf=new U,La=new U,Ks=new U,js=new U,bh=new U,D0=new U,U0=new U,No=class{constructor(e=new U,t=new U){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Lf.subVectors(e,this.start),La.subVectors(this.end,this.start);let n=La.dot(La);if(n===0)return 0;let r=La.dot(Lf)/n;return t&&(r=$e(r,0,1)),r}closestPointToPoint(e,t,n){let s=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(s).add(this.start)}distanceSqToLine3(e,t=D0,n=U0){let s=10000000000000001e-32,r,o,a=this.start,c=e.start,l=this.end,h=e.end;Ks.subVectors(l,a),js.subVectors(h,c),bh.subVectors(a,c);let u=Ks.dot(Ks),d=js.dot(js),f=js.dot(bh);if(u<=s&&d<=s)return t.copy(a),n.copy(c),t.sub(n),t.dot(t);if(u<=s)r=0,o=f/d,o=$e(o,0,1);else{let m=Ks.dot(bh);if(d<=s)o=0,r=$e(-m/u,0,1);else{let _=Ks.dot(js),g=u*d-_*_;g!==0?r=$e((_*f-m*d)/g,0,1):r=0,o=(_*r+f)/d,o<0?(o=0,r=$e(-m/u,0,1)):o>1&&(o=1,r=$e((_-m)/u,0,1))}}return t.copy(a).addScaledVector(Ks,r),n.copy(c).addScaledVector(js,o),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};var Dn=class{constructor(){this.type="ShapePath",this.color=new ze,this.subPaths=[],this.currentPath=null,this.userData={}}moveTo(e,t){return this.currentPath=new ei,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,s){return this.currentPath.quadraticCurveTo(e,t,n,s),this}bezierCurveTo(e,t,n,s,r,o){return this.currentPath.bezierCurveTo(e,t,n,s,r,o),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(){function e(c,l){let h=!1,u=l.length;for(let d=0,f=u-1;d<u;f=d++){let m=l[d],_=l[f];m.y>c.y!=_.y>c.y&&c.x<(_.x-m.x)*(c.y-m.y)/(_.y-m.y)+m.x&&(h=!h)}return h}function t(c,l){let h=l.getCenter(new ue);if(e(h,c))return h;let u=h.y,d=[],f=c.length;for(let m=0;m<f;m++){let _=c[m],g=c[(m+1)%f];if(_.y>u!=g.y>u){let p=_.x+(u-_.y)*(g.x-_.x)/(g.y-_.y);d.push(p)}}return d.length>1&&(d.sort((m,_)=>m-_),h.x=(d[0]+d[1])/2),h}let n=this.userData.style&&this.userData.style.fillRule||"nonzero";n!=="nonzero"&&n!=="evenodd"&&(Ge('Fill-rule "'+n+'" is not supported, falling back to "nonzero".'),n="nonzero");let s=n==="nonzero"?(c=>c!==0):(c=>(c&1)!==0),r=[];for(let c of this.subPaths){let l=c.getPoints();if(l.length<3)continue;let h=Yn.area(l);if(h===0)continue;let u=new gr;for(let d=0;d<l.length;d++)u.expandByPoint(l[d]);r.push({subPath:c,points:l,boundingBox:u,interiorPoint:t(l,u),absArea:Math.abs(h),winding:h<0?-1:1,container:null,exclude:!1,role:null})}r.sort((c,l)=>l.absArea-c.absArea);for(let c=0;c<r.length;c++){let l=r[c],h=0;for(let u=c-1;u>=0;u--){let d=r[u];if(d.boundingBox.containsPoint(l.interiorPoint)&&e(l.interiorPoint,d.points)){l.container=d.exclude?d.container:d,h=d.winding,l.winding+=h;break}}s(l.winding)===s(h)&&(l.exclude=!0)}for(let c of r)c.exclude||(c.role=c.container===null||c.container.role==="hole"?"outer":"hole");let o=[],a=new Map;for(let c of r){if(c.exclude||c.role!=="outer")continue;let l=new vo;l.curves=c.subPath.curves,o.push(l),a.set(c,l)}for(let c of r){if(c.exclude||c.role!=="hole")continue;let l=a.get(c.container);if(!l)continue;let h=new ei;h.curves=c.subPath.curves,l.holes.push(h)}return o}};function hu(i,e,t,n){let s=O0(n);switch(t){case nu:return i*e;case Sc:return i*e/s.components*s.byteLength;case bc:return i*e/s.components*s.byteLength;case Ki:return i*e*2/s.components*s.byteLength;case Ec:return i*e*2/s.components*s.byteLength;case iu:return i*e*3/s.components*s.byteLength;case rn:return i*e*4/s.components*s.byteLength;case wc:return i*e*4/s.components*s.byteLength;case Fo:case Bo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case zo:case ko:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ac:case Cc:return Math.max(i,16)*Math.max(e,8)/4;case Tc:case Rc:return Math.max(i,8)*Math.max(e,8)/2;case Ic:case Pc:case Nc:case Dc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Lc:case Vo:case Uc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Oc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Fc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Bc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case zc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case kc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Vc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Hc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Gc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Wc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Xc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case qc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Zc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Yc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Jc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case $c:case Kc:case jc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Qc:case el:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ho:case tl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function O0(i){switch(i){case sn:case jh:return{byteLength:1,components:1};case yr:case Qh:case ii:return{byteLength:2,components:1};case vc:case Mc:return{byteLength:2,components:4};case On:case yc:case En:return{byteLength:4,components:1};case eu:case tu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));typeof window<"u"&&(window.__THREE__?Ge("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function Gp(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function F0(i){let e=new WeakMap;function t(a,c){let l=a.array,h=a.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){let m=u[d],_=u[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){let _=u[f];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var B0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,z0=`#ifdef USE_ALPHAHASH
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
#endif`,k0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,V0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,H0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,G0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,W0=`#ifdef USE_AOMAP
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
#endif`,X0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,q0=`#ifdef USE_BATCHING
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
#endif`,Z0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Y0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,J0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,K0=`#ifdef USE_IRIDESCENCE
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
#endif`,j0=`#ifdef USE_BUMPMAP
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
#endif`,Q0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ex=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,nx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ix=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,sx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,rx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,ox=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,ax=`#define PI 3.141592653589793
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
} // validated`,cx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,lx=`vec3 transformedNormal = objectNormal;
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
#endif`,hx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ux=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,dx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,fx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,px="gl_FragColor = linearToOutputTexel( gl_FragColor );",mx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,gx=`#ifdef USE_ENVMAP
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
#endif`,xx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,_x=`#ifdef USE_ENVMAP
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
#endif`,yx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,vx=`#ifdef USE_ENVMAP
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
#endif`,Mx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Sx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,bx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ex=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,wx=`#ifdef USE_GRADIENTMAP
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
}`,Tx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ax=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Rx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Cx=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Ix=`#ifdef USE_ENVMAP
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
#endif`,Px=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Lx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Nx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Dx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ux=`PhysicalMaterial material;
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
#endif`,Ox=`uniform sampler2D dfgLUT;
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
}`,Fx=`
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
#endif`,Bx=`#if defined( RE_IndirectDiffuse )
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
#endif`,zx=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,kx=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Vx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Hx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Xx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,qx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Zx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Yx=`#if defined( USE_POINTS_UV )
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
#endif`,Jx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$x=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Kx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,jx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Qx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,e_=`#ifdef USE_MORPHTARGETS
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
#endif`,t_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,n_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,i_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,s_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,r_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,o_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,a_=`#ifdef USE_NORMALMAP
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
#endif`,c_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,l_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,h_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,u_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,d_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,f_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,p_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,m_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,g_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,x_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,__=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,y_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,v_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,M_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,S_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,b_=`float getShadowMask() {
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
}`,E_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,w_=`#ifdef USE_SKINNING
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
#endif`,T_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,A_=`#ifdef USE_SKINNING
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
#endif`,R_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,C_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,I_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,P_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,L_=`#ifdef USE_TRANSMISSION
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
#endif`,N_=`#ifdef USE_TRANSMISSION
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
#endif`,D_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,U_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,O_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,F_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,B_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,z_=`uniform sampler2D t2D;
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
}`,k_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,V_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,H_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,G_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,W_=`#include <common>
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
}`,X_=`#if DEPTH_PACKING == 3200
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
}`,q_=`#define DISTANCE
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
}`,Z_=`#define DISTANCE
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
}`,Y_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,J_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$_=`uniform float scale;
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
}`,K_=`uniform vec3 diffuse;
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
}`,j_=`#include <common>
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
}`,Q_=`uniform vec3 diffuse;
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
}`,ey=`#define LAMBERT
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
}`,ty=`#define LAMBERT
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
}`,ny=`#define MATCAP
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
}`,iy=`#define MATCAP
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
}`,sy=`#define NORMAL
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
}`,ry=`#define NORMAL
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
}`,oy=`#define PHONG
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
}`,ay=`#define PHONG
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
}`,cy=`#define STANDARD
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
}`,ly=`#define STANDARD
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
}`,hy=`#define TOON
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
}`,uy=`#define TOON
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
}`,dy=`uniform float size;
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
}`,fy=`uniform vec3 diffuse;
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
}`,py=`#include <common>
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
}`,my=`uniform vec3 color;
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
}`,gy=`uniform float rotation;
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
}`,xy=`uniform vec3 diffuse;
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
}`,Qe={alphahash_fragment:B0,alphahash_pars_fragment:z0,alphamap_fragment:k0,alphamap_pars_fragment:V0,alphatest_fragment:H0,alphatest_pars_fragment:G0,aomap_fragment:W0,aomap_pars_fragment:X0,batching_pars_vertex:q0,batching_vertex:Z0,begin_vertex:Y0,beginnormal_vertex:J0,bsdfs:$0,iridescence_fragment:K0,bumpmap_pars_fragment:j0,clipping_planes_fragment:Q0,clipping_planes_pars_fragment:ex,clipping_planes_pars_vertex:tx,clipping_planes_vertex:nx,color_fragment:ix,color_pars_fragment:sx,color_pars_vertex:rx,color_vertex:ox,common:ax,cube_uv_reflection_fragment:cx,defaultnormal_vertex:lx,displacementmap_pars_vertex:hx,displacementmap_vertex:ux,emissivemap_fragment:dx,emissivemap_pars_fragment:fx,colorspace_fragment:px,colorspace_pars_fragment:mx,envmap_fragment:gx,envmap_common_pars_fragment:xx,envmap_pars_fragment:_x,envmap_pars_vertex:yx,envmap_physical_pars_fragment:Ix,envmap_vertex:vx,fog_vertex:Mx,fog_pars_vertex:Sx,fog_fragment:bx,fog_pars_fragment:Ex,gradientmap_pars_fragment:wx,lightmap_pars_fragment:Tx,lights_lambert_fragment:Ax,lights_lambert_pars_fragment:Rx,lights_pars_begin:Cx,lights_toon_fragment:Px,lights_toon_pars_fragment:Lx,lights_phong_fragment:Nx,lights_phong_pars_fragment:Dx,lights_physical_fragment:Ux,lights_physical_pars_fragment:Ox,lights_fragment_begin:Fx,lights_fragment_maps:Bx,lights_fragment_end:zx,lightprobes_pars_fragment:kx,logdepthbuf_fragment:Vx,logdepthbuf_pars_fragment:Hx,logdepthbuf_pars_vertex:Gx,logdepthbuf_vertex:Wx,map_fragment:Xx,map_pars_fragment:qx,map_particle_fragment:Zx,map_particle_pars_fragment:Yx,metalnessmap_fragment:Jx,metalnessmap_pars_fragment:$x,morphinstance_vertex:Kx,morphcolor_vertex:jx,morphnormal_vertex:Qx,morphtarget_pars_vertex:e_,morphtarget_vertex:t_,normal_fragment_begin:n_,normal_fragment_maps:i_,normal_pars_fragment:s_,normal_pars_vertex:r_,normal_vertex:o_,normalmap_pars_fragment:a_,clearcoat_normal_fragment_begin:c_,clearcoat_normal_fragment_maps:l_,clearcoat_pars_fragment:h_,iridescence_pars_fragment:u_,opaque_fragment:d_,packing:f_,premultiplied_alpha_fragment:p_,project_vertex:m_,dithering_fragment:g_,dithering_pars_fragment:x_,roughnessmap_fragment:__,roughnessmap_pars_fragment:y_,shadowmap_pars_fragment:v_,shadowmap_pars_vertex:M_,shadowmap_vertex:S_,shadowmask_pars_fragment:b_,skinbase_vertex:E_,skinning_pars_vertex:w_,skinning_vertex:T_,skinnormal_vertex:A_,specularmap_fragment:R_,specularmap_pars_fragment:C_,tonemapping_fragment:I_,tonemapping_pars_fragment:P_,transmission_fragment:L_,transmission_pars_fragment:N_,uv_pars_fragment:D_,uv_pars_vertex:U_,uv_vertex:O_,worldpos_vertex:F_,background_vert:B_,background_frag:z_,backgroundCube_vert:k_,backgroundCube_frag:V_,cube_vert:H_,cube_frag:G_,depth_vert:W_,depth_frag:X_,distance_vert:q_,distance_frag:Z_,equirect_vert:Y_,equirect_frag:J_,linedashed_vert:$_,linedashed_frag:K_,meshbasic_vert:j_,meshbasic_frag:Q_,meshlambert_vert:ey,meshlambert_frag:ty,meshmatcap_vert:ny,meshmatcap_frag:iy,meshnormal_vert:sy,meshnormal_frag:ry,meshphong_vert:oy,meshphong_frag:ay,meshphysical_vert:cy,meshphysical_frag:ly,meshtoon_vert:hy,meshtoon_frag:uy,points_vert:dy,points_frag:fy,shadow_vert:py,shadow_frag:my,sprite_vert:gy,sprite_frag:xy},be={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},Qt={basic:{uniforms:Jt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:Jt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new ze(0)},envMapIntensity:{value:1}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:Jt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:Jt([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:Jt([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new ze(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:Jt([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:Jt([be.points,be.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:Jt([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:Jt([be.common,be.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:Jt([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:Jt([be.sprite,be.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distance:{uniforms:Jt([be.common,be.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distance_vert,fragmentShader:Qe.distance_frag},shadow:{uniforms:Jt([be.lights,be.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};Qt.physical={uniforms:Jt([Qt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};var rl={r:0,b:0,g:0},_y=new tt,Wp=new We;Wp.set(-1,0,0,0,1,0,0,0,1);function yy(i,e,t,n,s,r){let o=new ze(0),a=s===!0?0:1,c,l,h=null,u=0,d=null;function f(M){let v=M.isScene===!0?M.background:null;if(v&&v.isTexture){let y=M.backgroundBlurriness>0;v=e.get(v,y)}return v}function m(M){let v=!1,y=f(M);y===null?g(o,a):y&&y.isColor&&(g(y,1),v=!0);let E=i.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||v)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(M,v){let y=f(v);y&&(y.isCubeTexture||y.mapping===Oo)?(l===void 0&&(l=new _t(new dr(1,1,1),new zt({name:"BackgroundCubeMaterial",uniforms:Ss(Qt.backgroundCube.uniforms),vertexShader:Qt.backgroundCube.vertexShader,fragmentShader:Qt.backgroundCube.fragmentShader,side:Kt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(E,w,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(_y.makeRotationFromEuler(v.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Wp),l.material.toneMapped=it.getTransfer(y.colorSpace)!==ht,(h!==y||u!==y.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=y,u=y.version,d=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new _t(new Nn(2,2),new zt({name:"BackgroundMaterial",uniforms:Ss(Qt.background.uniforms),vertexShader:Qt.background.vertexShader,fragmentShader:Qt.background.fragmentShader,side:yi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=it.getTransfer(y.colorSpace)!==ht,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||u!==y.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=y,u=y.version,d=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function g(M,v){M.getRGB(rl,au(i)),t.buffers.color.setClear(rl.r,rl.g,rl.b,v,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,v=1){o.set(M),a=v,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(M){a=M,g(o,a)},render:m,addToRenderList:_,dispose:p}}function vy(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,o=!1;function a(C,D,B,G,O){let q=!1,H=u(C,G,B,D);r!==H&&(r=H,l(r.object)),q=f(C,G,B,O),q&&m(C,G,B,O),O!==null&&e.update(O,i.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,y(C,D,B,G),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function c(){return i.createVertexArray()}function l(C){return i.bindVertexArray(C)}function h(C){return i.deleteVertexArray(C)}function u(C,D,B,G){let O=G.wireframe===!0,q=n[D.id];q===void 0&&(q={},n[D.id]=q);let H=C.isInstancedMesh===!0?C.id:0,k=q[H];k===void 0&&(k={},q[H]=k);let ie=k[B.id];ie===void 0&&(ie={},k[B.id]=ie);let re=ie[O];return re===void 0&&(re=d(c()),ie[O]=re),re}function d(C){let D=[],B=[],G=[];for(let O=0;O<t;O++)D[O]=0,B[O]=0,G[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:B,attributeDivisors:G,object:C,attributes:{},index:null}}function f(C,D,B,G){let O=r.attributes,q=D.attributes,H=0,k=B.getAttributes();for(let ie in k)if(k[ie].location>=0){let xe=O[ie],ye=q[ie];if(ye===void 0&&(ie==="instanceMatrix"&&C.instanceMatrix&&(ye=C.instanceMatrix),ie==="instanceColor"&&C.instanceColor&&(ye=C.instanceColor)),xe===void 0||xe.attribute!==ye||ye&&xe.data!==ye.data)return!0;H++}return r.attributesNum!==H||r.index!==G}function m(C,D,B,G){let O={},q=D.attributes,H=0,k=B.getAttributes();for(let ie in k)if(k[ie].location>=0){let xe=q[ie];xe===void 0&&(ie==="instanceMatrix"&&C.instanceMatrix&&(xe=C.instanceMatrix),ie==="instanceColor"&&C.instanceColor&&(xe=C.instanceColor));let ye={};ye.attribute=xe,xe&&xe.data&&(ye.data=xe.data),O[ie]=ye,H++}r.attributes=O,r.attributesNum=H,r.index=G}function _(){let C=r.newAttributes;for(let D=0,B=C.length;D<B;D++)C[D]=0}function g(C){p(C,0)}function p(C,D){let B=r.newAttributes,G=r.enabledAttributes,O=r.attributeDivisors;B[C]=1,G[C]===0&&(i.enableVertexAttribArray(C),G[C]=1),O[C]!==D&&(i.vertexAttribDivisor(C,D),O[C]=D)}function M(){let C=r.newAttributes,D=r.enabledAttributes;for(let B=0,G=D.length;B<G;B++)D[B]!==C[B]&&(i.disableVertexAttribArray(B),D[B]=0)}function v(C,D,B,G,O,q,H){H===!0?i.vertexAttribIPointer(C,D,B,O,q):i.vertexAttribPointer(C,D,B,G,O,q)}function y(C,D,B,G){_();let O=G.attributes,q=B.getAttributes(),H=D.defaultAttributeValues;for(let k in q){let ie=q[k];if(ie.location>=0){let re=O[k];if(re===void 0&&(k==="instanceMatrix"&&C.instanceMatrix&&(re=C.instanceMatrix),k==="instanceColor"&&C.instanceColor&&(re=C.instanceColor)),re!==void 0){let xe=re.normalized,ye=re.itemSize,Ue=e.get(re);if(Ue===void 0)continue;let Je=Ue.buffer,qe=Ue.type,he=Ue.bytesPerElement,J=qe===i.INT||qe===i.UNSIGNED_INT||re.gpuType===yc;if(re.isInterleavedBufferAttribute){let V=re.data,F=V.stride,N=re.offset;if(V.isInstancedInterleavedBuffer){for(let W=0;W<ie.locationSize;W++)p(ie.location+W,V.meshPerAttribute);C.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let W=0;W<ie.locationSize;W++)g(ie.location+W);i.bindBuffer(i.ARRAY_BUFFER,Je);for(let W=0;W<ie.locationSize;W++)v(ie.location+W,ye/ie.locationSize,qe,xe,F*he,(N+ye/ie.locationSize*W)*he,J)}else{if(re.isInstancedBufferAttribute){for(let V=0;V<ie.locationSize;V++)p(ie.location+V,re.meshPerAttribute);C.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let V=0;V<ie.locationSize;V++)g(ie.location+V);i.bindBuffer(i.ARRAY_BUFFER,Je);for(let V=0;V<ie.locationSize;V++)v(ie.location+V,ye/ie.locationSize,qe,xe,ye*he,ye/ie.locationSize*V*he,J)}}else if(H!==void 0){let xe=H[k];if(xe!==void 0)switch(xe.length){case 2:i.vertexAttrib2fv(ie.location,xe);break;case 3:i.vertexAttrib3fv(ie.location,xe);break;case 4:i.vertexAttrib4fv(ie.location,xe);break;default:i.vertexAttrib1fv(ie.location,xe)}}}}M()}function E(){R();for(let C in n){let D=n[C];for(let B in D){let G=D[B];for(let O in G){let q=G[O];for(let H in q)h(q[H].object),delete q[H];delete G[O]}}delete n[C]}}function w(C){if(n[C.id]===void 0)return;let D=n[C.id];for(let B in D){let G=D[B];for(let O in G){let q=G[O];for(let H in q)h(q[H].object),delete q[H];delete G[O]}}delete n[C.id]}function T(C){for(let D in n){let B=n[D];for(let G in B){let O=B[G];if(O[C.id]===void 0)continue;let q=O[C.id];for(let H in q)h(q[H].object),delete q[H];delete O[C.id]}}}function x(C){for(let D in n){let B=n[D],G=C.isInstancedMesh===!0?C.id:0,O=B[G];if(O!==void 0){for(let q in O){let H=O[q];for(let k in H)h(H[k].object),delete H[k];delete O[q]}delete B[G],Object.keys(B).length===0&&delete n[D]}}}function R(){I(),o=!0,r!==s&&(r=s,l(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:I,dispose:E,releaseStatesOfGeometry:w,releaseStatesOfObject:x,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:g,disableUnusedAttributes:M}}function My(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function o(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function a(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let d=0;for(let f=0;f<h;f++)d+=l[f];t.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function Sy(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let T=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(T){return!(T!==rn&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){let x=T===ii&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==sn&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==En&&!x)}function c(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(Ge("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ge("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:M,maxVaryings:v,maxFragmentUniforms:y,maxSamples:E,samples:w}}function by(i){let e=this,t=null,n=0,s=!1,r=!1,o=new qt,a=new We,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let m=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,p=i.get(u);if(!s||m===null||m.length===0||r&&!g)r?h(null):l();else{let M=r?0:n,v=M*4,y=p.clippingState||null;c.value=y,y=h(m,d,v,f);for(let E=0;E!==v;++E)y[E]=t[E];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,m){let _=u!==null?u.length:0,g=null;if(_!==0){if(g=c.value,m!==!0||g===null){let p=f+_*4,M=d.matrixWorldInverse;a.getNormalMatrix(M),(g===null||g.length<p)&&(g=new Float32Array(p));for(let v=0,y=f;v!==_;++v,y+=4)o.copy(u[v]).applyMatrix4(M,a),o.normal.toArray(g,y),g[y+3]=o.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}var ji=4,Mp=[.125,.215,.35,.446,.526,.582],bs=20,Ey=256,Wo=new Zi,Sp=new ze,gu=null,xu=0,_u=0,yu=!1,wy=new U,al=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:a=wy}=r;gu=this._renderer.getRenderTarget(),xu=this._renderer.getActiveCubeFace(),_u=this._renderer.getActiveMipmapLevel(),yu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ep(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(gu,xu,_u),this._renderer.xr.enabled=yu,e.scissorTest=!1,Sr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ji||e.mapping===vs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),gu=this._renderer.getRenderTarget(),xu=this._renderer.getActiveCubeFace(),_u=this._renderer.getActiveMipmapLevel(),yu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:bt,minFilter:bt,generateMipmaps:!1,type:ii,format:rn,colorSpace:no,depthBuffer:!1},s=bp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bp(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Ty(r)),this._blurMaterial=Ry(r,e,t),this._ggxMaterial=Ay(r,e,t)}return s}_compileMaterial(e){let t=new _t(new Et,e);this._renderer.compile(t,Wo)}_sceneToCubeUV(e,t,n,s,r){let c=new Zt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Sp),u.toneMapping=Un,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new _t(new dr,new Yt({name:"PMREM.Background",side:Kt,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,g=_.material,p=!1,M=e.background;M?M.isColor&&(g.color.copy(M),e.background=null,p=!0):(g.color.copy(Sp),p=!0);for(let v=0;v<6;v++){let y=v%3;y===0?(c.up.set(0,l[v],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[v],r.y,r.z)):y===1?(c.up.set(0,0,l[v]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[v],r.z)):(c.up.set(0,l[v],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[v]));let E=this._cubeSize;Sr(s,y*E,v>2?E:0,E,E),u.setRenderTarget(s),p&&u.render(_,c),u.render(e,c)}u.toneMapping=f,u.autoClear=d,e.background=M}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Ji||e.mapping===vs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=wp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ep());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;Sr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Wo)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let c=o.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),d=0+l*1.25,f=u*d,{_lodMax:m}=this,_=this._sizeLods[n],g=3*_*(n>m-ji?n-m+ji:0),p=4*(this._cubeSize-_);c.envMap.value=e.texture,c.roughness.value=f,c.mipInt.value=m-t,Sr(r,g,p,3*_,2*_),s.setRenderTarget(r),s.render(a,Wo),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=m-n,Sr(e,g,p,3*_,2*_),s.setRenderTarget(e),s.render(a,Wo)}_blur(e,t,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Ze("blur direction must be either latitudinal or longitudinal!");let h=3,u=this._lodMeshes[s];u.material=l;let d=l.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*bs-1),_=r/m,g=isFinite(r)?1+Math.floor(h*_):bs;g>bs&&Ge(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${bs}`);let p=[],M=0;for(let T=0;T<bs;++T){let x=T/_,R=Math.exp(-x*x/2);p.push(R),T===0?M+=R:T<g&&(M+=2*R)}for(let T=0;T<p.length;T++)p[T]=p[T]/M;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:v}=this;d.dTheta.value=m,d.mipInt.value=v-n;let y=this._sizeLods[s],E=3*y*(s>v-ji?s-v+ji:0),w=4*(this._cubeSize-y);Sr(t,E,w,3*y,2*y),c.setRenderTarget(t),c.render(u,Wo)}};function Ty(i){let e=[],t=[],n=[],s=i,r=i-ji+1+Mp.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>i-ji?c=Mp[o-i+ji-1]:o===0&&(c=0),t.push(c);let l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,_=3,g=2,p=1,M=new Float32Array(_*m*f),v=new Float32Array(g*m*f),y=new Float32Array(p*m*f);for(let w=0;w<f;w++){let T=w%3*2/3-1,x=w>2?0:-1,R=[T,x,0,T+2/3,x,0,T+2/3,x+1,0,T,x,0,T+2/3,x+1,0,T,x+1,0];M.set(R,_*m*w),v.set(d,g*m*w);let I=[w,w,w,w,w,w];y.set(I,p*m*w)}let E=new Et;E.setAttribute("position",new Mt(M,_)),E.setAttribute("uv",new Mt(v,g)),E.setAttribute("faceIndex",new Mt(y,p)),n.push(new _t(E,null)),s>ji&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function bp(i,e,t){let n=new un(i,e,t);return n.texture.mapping=Oo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Sr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Ay(i,e,t){return new zt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Ey,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ll(),fragmentShader:`

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
		`,blending:ti,depthTest:!1,depthWrite:!1})}function Ry(i,e,t){let n=new Float32Array(bs),s=new U(0,1,0);return new zt({name:"SphericalGaussianBlur",defines:{n:bs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ll(),fragmentShader:`

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
		`,blending:ti,depthTest:!1,depthWrite:!1})}function Ep(){return new zt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ll(),fragmentShader:`

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
		`,blending:ti,depthTest:!1,depthWrite:!1})}function wp(){return new zt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ll(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function ll(){return`

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
	`}var cl=class extends un{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new po(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new dr(5,5,5),r=new zt({name:"CubemapFromEquirect",uniforms:Ss(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Kt,blending:ti});r.uniforms.tEquirect.value=t;let o=new _t(s,r),a=t.minFilter;return t.minFilter===ni&&(t.minFilter=bt),new fc(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}};function Cy(i){let e=new WeakMap,t=new WeakMap,n=null;function s(d,f=!1){return d==null?null:f?o(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===gc||f===xc)if(e.has(d)){let m=e.get(d).texture;return a(m,d.mapping)}else{let m=d.image;if(m&&m.height>0){let _=new cl(m.height);return _.fromEquirectangularTexture(i,d),e.set(d,_),d.addEventListener("dispose",l),a(_.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){let f=d.mapping,m=f===gc||f===xc,_=f===Ji||f===vs;if(m||_){let g=t.get(d),p=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return n===null&&(n=new al(i)),g=m?n.fromEquirectangular(d,g):n.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{let M=d.image;return m&&M&&M.height>0||_&&M&&c(M)?(n===null&&(n=new al(i)),g=m?n.fromEquirectangular(d):n.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",h),g.texture):null}}}return d}function a(d,f){return f===gc?d.mapping=Ji:f===xc&&(d.mapping=vs),d}function c(d){let f=0,m=6;for(let _=0;_<m;_++)d[_]!==void 0&&f++;return f===m}function l(d){let f=d.target;f.removeEventListener("dispose",l);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function Iy(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&ds("WebGLRenderer: "+n+" extension not supported."),s}}}function Py(i,e,t,n){let s={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",o),delete s[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function c(u){let d=u.attributes;for(let f in d)e.update(d[f],i.ARRAY_BUFFER)}function l(u){let d=[],f=u.index,m=u.attributes.position,_=0;if(m===void 0)return;if(f!==null){let M=f.array;_=f.version;for(let v=0,y=M.length;v<y;v+=3){let E=M[v+0],w=M[v+1],T=M[v+2];d.push(E,w,w,T,T,E)}}else{let M=m.array;_=m.version;for(let v=0,y=M.length/3-1;v<y;v+=3){let E=v+0,w=v+1,T=v+2;d.push(E,w,w,T,T,E)}}let g=new(m.count>=65535?lo:co)(d,1);g.version=_;let p=r.get(u);p&&e.remove(p),r.set(u,g)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function Ly(i,e,t){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function c(u,d){i.drawElements(n,d,r,u*o),t.update(d,n,1)}function l(u,d,f){f!==0&&(i.drawElementsInstanced(n,d,r,u*o,f),t.update(d,n,f))}function h(u,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,f);let _=0;for(let g=0;g<f;g++)_+=d[g];t.update(_,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function Ny(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:Ze("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Dy(i,e,t){let n=new WeakMap,s=new at;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let R=function(){T.dispose(),n.delete(a),a.removeEventListener("dispose",R)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],M=a.morphAttributes.color||[],v=0;f===!0&&(v=1),m===!0&&(v=2),_===!0&&(v=3);let y=a.attributes.position.count*v,E=1;y>e.maxTextureSize&&(E=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let w=new Float32Array(y*E*4*u),T=new oo(w,y,E,u);T.type=En,T.needsUpdate=!0;let x=v*4;for(let I=0;I<u;I++){let C=g[I],D=p[I],B=M[I],G=y*E*4*I;for(let O=0;O<C.count;O++){let q=O*x;f===!0&&(s.fromBufferAttribute(C,O),w[G+q+0]=s.x,w[G+q+1]=s.y,w[G+q+2]=s.z,w[G+q+3]=0),m===!0&&(s.fromBufferAttribute(D,O),w[G+q+4]=s.x,w[G+q+5]=s.y,w[G+q+6]=s.z,w[G+q+7]=0),_===!0&&(s.fromBufferAttribute(B,O),w[G+q+8]=s.x,w[G+q+9]=s.y,w[G+q+10]=s.z,w[G+q+11]=B.itemSize===4?s.w:1)}}d={count:u,texture:T,size:new ue(y,E)},n.set(a,d),a.addEventListener("dispose",R)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];let m=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Uy(i,e,t,n,s){let r=new WeakMap;function o(l){let h=s.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let f=l.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function a(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}var Oy={[Xh]:"LINEAR_TONE_MAPPING",[qh]:"REINHARD_TONE_MAPPING",[Zh]:"CINEON_TONE_MAPPING",[Uo]:"ACES_FILMIC_TONE_MAPPING",[Jh]:"AGX_TONE_MAPPING",[$h]:"NEUTRAL_TONE_MAPPING",[Yh]:"CUSTOM_TONE_MAPPING"};function Fy(i,e,t,n,s,r){let o=new un(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Si(e,t):void 0}),a=new un(e,t,{type:ii,depthBuffer:!1,stencilBuffer:!1}),c=new Et;c.setAttribute("position",new ut([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new ut([0,2,0,0,2,0],2));let l=new tc({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new _t(c,l),u=new Zi(-1,1,1,-1,0,1),d=null,f=null,m=!1,_,g=null,p=[],M=!1;this.setSize=function(v,y){o.setSize(v,y),a.setSize(v,y);for(let E=0;E<p.length;E++){let w=p[E];w.setSize&&w.setSize(v,y)}},this.setEffects=function(v){p=v,M=p.length>0&&p[0].isRenderPass===!0;let y=o.width,E=o.height;for(let w=0;w<p.length;w++){let T=p[w];T.setSize&&T.setSize(y,E)}},this.begin=function(v,y){if(m||v.toneMapping===Un&&p.length===0)return!1;if(g=y,y!==null){let E=y.width,w=y.height;(o.width!==E||o.height!==w)&&this.setSize(E,w)}return M===!1&&v.setRenderTarget(o),_=v.toneMapping,v.toneMapping=Un,!0},this.hasRenderPass=function(){return M},this.end=function(v,y){v.toneMapping=_,m=!0;let E=o,w=a;for(let T=0;T<p.length;T++){let x=p[T];if(x.enabled!==!1&&(x.render(v,w,E,y),x.needsSwap!==!1)){let R=E;E=w,w=R}}if(d!==v.outputColorSpace||f!==v.toneMapping){d=v.outputColorSpace,f=v.toneMapping,l.defines={},it.getTransfer(d)===ht&&(l.defines.SRGB_TRANSFER="");let T=Oy[f];T&&(l.defines[T]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=E.texture,v.setRenderTarget(g),v.render(h,u),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),a.dispose(),c.dispose(),l.dispose()}}var Xp=new Bt,Su=new Si(1,1),qp=new oo,Zp=new Xa,Yp=new po,Tp=[],Ap=[],Rp=new Float32Array(16),Cp=new Float32Array(9),Ip=new Float32Array(4);function wr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Tp[s];if(r===void 0&&(r=new Float32Array(s),Tp[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Ut(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ot(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function hl(i,e){let t=Ap[e];t===void 0&&(t=new Int32Array(e),Ap[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function By(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function zy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2fv(this.addr,e),Ot(t,e)}}function ky(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ut(t,e))return;i.uniform3fv(this.addr,e),Ot(t,e)}}function Vy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4fv(this.addr,e),Ot(t,e)}}function Hy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ot(t,e)}else{if(Ut(t,n))return;Ip.set(n),i.uniformMatrix2fv(this.addr,!1,Ip),Ot(t,n)}}function Gy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ot(t,e)}else{if(Ut(t,n))return;Cp.set(n),i.uniformMatrix3fv(this.addr,!1,Cp),Ot(t,n)}}function Wy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ot(t,e)}else{if(Ut(t,n))return;Rp.set(n),i.uniformMatrix4fv(this.addr,!1,Rp),Ot(t,n)}}function Xy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function qy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2iv(this.addr,e),Ot(t,e)}}function Zy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;i.uniform3iv(this.addr,e),Ot(t,e)}}function Yy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4iv(this.addr,e),Ot(t,e)}}function Jy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function $y(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2uiv(this.addr,e),Ot(t,e)}}function Ky(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;i.uniform3uiv(this.addr,e),Ot(t,e)}}function jy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4uiv(this.addr,e),Ot(t,e)}}function Qy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Su.compareFunction=t.isReversedDepthBuffer()?sl:il,r=Su):r=Xp,t.setTexture2D(e||r,s)}function ev(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Zp,s)}function tv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Yp,s)}function nv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||qp,s)}function iv(i){switch(i){case 5126:return By;case 35664:return zy;case 35665:return ky;case 35666:return Vy;case 35674:return Hy;case 35675:return Gy;case 35676:return Wy;case 5124:case 35670:return Xy;case 35667:case 35671:return qy;case 35668:case 35672:return Zy;case 35669:case 35673:return Yy;case 5125:return Jy;case 36294:return $y;case 36295:return Ky;case 36296:return jy;case 35678:case 36198:case 36298:case 36306:case 35682:return Qy;case 35679:case 36299:case 36307:return ev;case 35680:case 36300:case 36308:case 36293:return tv;case 36289:case 36303:case 36311:case 36292:return nv}}function sv(i,e){i.uniform1fv(this.addr,e)}function rv(i,e){let t=wr(e,this.size,2);i.uniform2fv(this.addr,t)}function ov(i,e){let t=wr(e,this.size,3);i.uniform3fv(this.addr,t)}function av(i,e){let t=wr(e,this.size,4);i.uniform4fv(this.addr,t)}function cv(i,e){let t=wr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function lv(i,e){let t=wr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function hv(i,e){let t=wr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function uv(i,e){i.uniform1iv(this.addr,e)}function dv(i,e){i.uniform2iv(this.addr,e)}function fv(i,e){i.uniform3iv(this.addr,e)}function pv(i,e){i.uniform4iv(this.addr,e)}function mv(i,e){i.uniform1uiv(this.addr,e)}function gv(i,e){i.uniform2uiv(this.addr,e)}function xv(i,e){i.uniform3uiv(this.addr,e)}function _v(i,e){i.uniform4uiv(this.addr,e)}function yv(i,e,t){let n=this.cache,s=e.length,r=hl(t,s);Ut(n,r)||(i.uniform1iv(this.addr,r),Ot(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=Su:o=Xp;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function vv(i,e,t){let n=this.cache,s=e.length,r=hl(t,s);Ut(n,r)||(i.uniform1iv(this.addr,r),Ot(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Zp,r[o])}function Mv(i,e,t){let n=this.cache,s=e.length,r=hl(t,s);Ut(n,r)||(i.uniform1iv(this.addr,r),Ot(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Yp,r[o])}function Sv(i,e,t){let n=this.cache,s=e.length,r=hl(t,s);Ut(n,r)||(i.uniform1iv(this.addr,r),Ot(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||qp,r[o])}function bv(i){switch(i){case 5126:return sv;case 35664:return rv;case 35665:return ov;case 35666:return av;case 35674:return cv;case 35675:return lv;case 35676:return hv;case 5124:case 35670:return uv;case 35667:case 35671:return dv;case 35668:case 35672:return fv;case 35669:case 35673:return pv;case 5125:return mv;case 36294:return gv;case 36295:return xv;case 36296:return _v;case 35678:case 36198:case 36298:case 36306:case 35682:return yv;case 35679:case 36299:case 36307:return vv;case 35680:case 36300:case 36308:case 36293:return Mv;case 36289:case 36303:case 36311:case 36292:return Sv}}var bu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=iv(t.type)}},Eu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=bv(t.type)}},wu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},vu=/(\w+)(\])?(\[|\.)?/g;function Pp(i,e){i.seq.push(e),i.map[e.id]=e}function Ev(i,e,t){let n=i.name,s=n.length;for(vu.lastIndex=0;;){let r=vu.exec(n),o=vu.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Pp(t,l===void 0?new bu(a,i,e):new Eu(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new wu(a),Pp(t,u)),t=u}}}var br=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);Ev(a,c,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function Lp(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var wv=37297,Tv=0;function Av(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var Np=new We;function Rv(i){it._getMatrix(Np,it.workingColorSpace,i);let e=`mat3( ${Np.elements.map(t=>t.toFixed(4))} )`;switch(it.getTransfer(i)){case io:return[e,"LinearTransferOETF"];case ht:return[e,"sRGBTransferOETF"];default:return Ge("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Dp(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Av(i.getShaderSource(e),a)}else return r}function Cv(i,e){let t=Rv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Iv={[Xh]:"Linear",[qh]:"Reinhard",[Zh]:"Cineon",[Uo]:"ACESFilmic",[Jh]:"AgX",[$h]:"Neutral",[Yh]:"Custom"};function Pv(i,e){let t=Iv[e];return t===void 0?(Ge("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ol=new U;function Lv(){it.getLuminanceCoefficients(ol);let i=ol.x.toFixed(4),e=ol.y.toFixed(4),t=ol.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Nv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qo).join(`
`)}function Dv(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Uv(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function qo(i){return i!==""}function Up(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Op(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Ov=/^[ \t]*#include +<([\w\d./]+)>/gm;function Tu(i){return i.replace(Ov,Bv)}var Fv=new Map;function Bv(i,e){let t=Qe[e];if(t===void 0){let n=Fv.get(e);if(n!==void 0)t=Qe[n],Ge('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Tu(t)}var zv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fp(i){return i.replace(zv,kv)}function kv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Bp(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var Vv={[Do]:"SHADOWMAP_TYPE_PCF",[xr]:"SHADOWMAP_TYPE_VSM"};function Hv(i){return Vv[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Gv={[Ji]:"ENVMAP_TYPE_CUBE",[vs]:"ENVMAP_TYPE_CUBE",[Oo]:"ENVMAP_TYPE_CUBE_UV"};function Wv(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Gv[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Xv={[vs]:"ENVMAP_MODE_REFRACTION"};function qv(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Xv[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Zv={[Wh]:"ENVMAP_BLENDING_MULTIPLY",[ep]:"ENVMAP_BLENDING_MIX",[tp]:"ENVMAP_BLENDING_ADD"};function Yv(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Zv[i.combine]||"ENVMAP_BLENDING_NONE"}function Jv(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function $v(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=Hv(t),l=Wv(t),h=qv(t),u=Yv(t),d=Jv(t),f=Nv(t),m=Dv(r),_=s.createProgram(),g,p,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(qo).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(qo).join(`
`),p.length>0&&(p+=`
`)):(g=[Bp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qo).join(`
`),p=[Bp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Un?"#define TONE_MAPPING":"",t.toneMapping!==Un?Qe.tonemapping_pars_fragment:"",t.toneMapping!==Un?Pv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,Cv("linearToOutputTexel",t.outputColorSpace),Lv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(qo).join(`
`)),o=Tu(o),o=Up(o,t),o=Op(o,t),a=Tu(a),a=Up(a,t),a=Op(a,t),o=Fp(o),a=Fp(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===su?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===su?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let v=M+g+o,y=M+p+a,E=Lp(s,s.VERTEX_SHADER,v),w=Lp(s,s.FRAGMENT_SHADER,y);s.attachShader(_,E),s.attachShader(_,w),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function T(C){if(i.debug.checkShaderErrors){let D=s.getProgramInfoLog(_)||"",B=s.getShaderInfoLog(E)||"",G=s.getShaderInfoLog(w)||"",O=D.trim(),q=B.trim(),H=G.trim(),k=!0,ie=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(k=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,E,w);else{let re=Dp(s,E,"vertex"),xe=Dp(s,w,"fragment");Ze("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+O+`
`+re+`
`+xe)}else O!==""?Ge("WebGLProgram: Program Info Log:",O):(q===""||H==="")&&(ie=!1);ie&&(C.diagnostics={runnable:k,programLog:O,vertexShader:{log:q,prefix:g},fragmentShader:{log:H,prefix:p}})}s.deleteShader(E),s.deleteShader(w),x=new br(s,_),R=Uv(s,_)}let x;this.getUniforms=function(){return x===void 0&&T(this),x};let R;this.getAttributes=function(){return R===void 0&&T(this),R};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(_,wv)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Tv++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=w,this}var Kv=0,Au=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Ru(e),t.set(e,n)),n}},Ru=class{constructor(e){this.id=Kv++,this.code=e,this.usedTimes=0}};function jv(i){return i===Ki||i===Vo||i===Ho}function Qv(i,e,t,n,s,r){let o=new rr,a=new Au,c=new Set,l=[],h=new Map,u=n.logarithmicDepthBuffer,d=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return c.add(x),x===0?"uv":`uv${x}`}function _(x,R,I,C,D,B){let G=C.fog,O=D.geometry,q=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?C.environment:null,H=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,k=e.get(x.envMap||q,H),ie=k&&k.mapping===Oo?k.image.height:null,re=f[x.type];x.precision!==null&&(d=n.getMaxPrecision(x.precision),d!==x.precision&&Ge("WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));let xe=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,ye=xe!==void 0?xe.length:0,Ue=0;O.morphAttributes.position!==void 0&&(Ue=1),O.morphAttributes.normal!==void 0&&(Ue=2),O.morphAttributes.color!==void 0&&(Ue=3);let Je,qe,he,J;if(re){let Oe=Qt[re];Je=Oe.vertexShader,qe=Oe.fragmentShader}else{Je=x.vertexShader,qe=x.fragmentShader;let Oe=a.getVertexShaderStage(x),Tt=a.getFragmentShaderStage(x);a.update(x,Oe,Tt),he=Oe.id,J=Tt.id}let V=i.getRenderTarget(),F=i.state.buffers.depth.getReversed(),N=D.isInstancedMesh===!0,W=D.isBatchedMesh===!0,ae=!!x.map,fe=!!x.matcap,P=!!k,X=!!x.aoMap,z=!!x.lightMap,j=!!x.bumpMap&&x.wireframe===!1,ee=!!x.normalMap,ce=!!x.displacementMap,me=!!x.emissiveMap,ge=!!x.metalnessMap,Y=!!x.roughnessMap,b=x.anisotropy>0,Ie=x.clearcoat>0,De=x.dispersion>0,L=x.iridescence>0,S=x.sheen>0,$=x.transmission>0,Q=b&&!!x.anisotropyMap,oe=Ie&&!!x.clearcoatMap,ve=Ie&&!!x.clearcoatNormalMap,Me=Ie&&!!x.clearcoatRoughnessMap,le=L&&!!x.iridescenceMap,de=L&&!!x.iridescenceThicknessMap,Se=S&&!!x.sheenColorMap,Fe=S&&!!x.sheenRoughnessMap,Te=!!x.specularMap,Ee=!!x.specularColorMap,Xe=!!x.specularIntensityMap,Ye=$&&!!x.transmissionMap,Ke=$&&!!x.thicknessMap,Z=!!x.gradientMap,we=!!x.alphaMap,pe=x.alphaTest>0,Ae=!!x.alphaHash,Pe=!!x.extensions,_e=Un;x.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(_e=i.toneMapping);let ke={shaderID:re,shaderType:x.type,shaderName:x.name,vertexShader:Je,fragmentShader:qe,defines:x.defines,customVertexShaderID:he,customFragmentShaderID:J,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:W,batchingColor:W&&D._colorsTexture!==null,instancing:N,instancingColor:N&&D.instanceColor!==null,instancingMorph:N&&D.morphTexture!==null,outputColorSpace:V===null?i.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:it.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:ae,matcap:fe,envMap:P,envMapMode:P&&k.mapping,envMapCubeUVHeight:ie,aoMap:X,lightMap:z,bumpMap:j,normalMap:ee,displacementMap:ce,emissiveMap:me,normalMapObjectSpace:ee&&x.normalMapType===ip,normalMapTangentSpace:ee&&x.normalMapType===nl,packedNormalMap:ee&&x.normalMapType===nl&&jv(x.normalMap.format),metalnessMap:ge,roughnessMap:Y,anisotropy:b,anisotropyMap:Q,clearcoat:Ie,clearcoatMap:oe,clearcoatNormalMap:ve,clearcoatRoughnessMap:Me,dispersion:De,iridescence:L,iridescenceMap:le,iridescenceThicknessMap:de,sheen:S,sheenColorMap:Se,sheenRoughnessMap:Fe,specularMap:Te,specularColorMap:Ee,specularIntensityMap:Xe,transmission:$,transmissionMap:Ye,thicknessMap:Ke,gradientMap:Z,opaque:x.transparent===!1&&x.blending===fs&&x.alphaToCoverage===!1,alphaMap:we,alphaTest:pe,alphaHash:Ae,combine:x.combine,mapUv:ae&&m(x.map.channel),aoMapUv:X&&m(x.aoMap.channel),lightMapUv:z&&m(x.lightMap.channel),bumpMapUv:j&&m(x.bumpMap.channel),normalMapUv:ee&&m(x.normalMap.channel),displacementMapUv:ce&&m(x.displacementMap.channel),emissiveMapUv:me&&m(x.emissiveMap.channel),metalnessMapUv:ge&&m(x.metalnessMap.channel),roughnessMapUv:Y&&m(x.roughnessMap.channel),anisotropyMapUv:Q&&m(x.anisotropyMap.channel),clearcoatMapUv:oe&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:ve&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Me&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:le&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:de&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:Fe&&m(x.sheenRoughnessMap.channel),specularMapUv:Te&&m(x.specularMap.channel),specularColorMapUv:Ee&&m(x.specularColorMap.channel),specularIntensityMapUv:Xe&&m(x.specularIntensityMap.channel),transmissionMapUv:Ye&&m(x.transmissionMap.channel),thicknessMapUv:Ke&&m(x.thicknessMap.channel),alphaMapUv:we&&m(x.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(ee||b),vertexNormals:!!O.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!O.attributes.uv&&(ae||we),fog:!!G,useFog:x.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||O.attributes.normal===void 0&&ee===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:F,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:Ue,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:B.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:_e,decodeVideoTexture:ae&&x.map.isVideoTexture===!0&&it.getTransfer(x.map.colorSpace)===ht,decodeVideoTextureEmissive:me&&x.emissiveMap.isVideoTexture===!0&&it.getTransfer(x.emissiveMap.colorSpace)===ht,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===jt,flipSided:x.side===Kt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Pe&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pe&&x.extensions.multiDraw===!0||W)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return ke.vertexUv1s=c.has(1),ke.vertexUv2s=c.has(2),ke.vertexUv3s=c.has(3),c.clear(),ke}function g(x){let R=[];if(x.shaderID?R.push(x.shaderID):(R.push(x.customVertexShaderID),R.push(x.customFragmentShaderID)),x.defines!==void 0)for(let I in x.defines)R.push(I),R.push(x.defines[I]);return x.isRawShaderMaterial===!1&&(p(R,x),M(R,x),R.push(i.outputColorSpace)),R.push(x.customProgramCacheKey),R.join()}function p(x,R){x.push(R.precision),x.push(R.outputColorSpace),x.push(R.envMapMode),x.push(R.envMapCubeUVHeight),x.push(R.mapUv),x.push(R.alphaMapUv),x.push(R.lightMapUv),x.push(R.aoMapUv),x.push(R.bumpMapUv),x.push(R.normalMapUv),x.push(R.displacementMapUv),x.push(R.emissiveMapUv),x.push(R.metalnessMapUv),x.push(R.roughnessMapUv),x.push(R.anisotropyMapUv),x.push(R.clearcoatMapUv),x.push(R.clearcoatNormalMapUv),x.push(R.clearcoatRoughnessMapUv),x.push(R.iridescenceMapUv),x.push(R.iridescenceThicknessMapUv),x.push(R.sheenColorMapUv),x.push(R.sheenRoughnessMapUv),x.push(R.specularMapUv),x.push(R.specularColorMapUv),x.push(R.specularIntensityMapUv),x.push(R.transmissionMapUv),x.push(R.thicknessMapUv),x.push(R.combine),x.push(R.fogExp2),x.push(R.sizeAttenuation),x.push(R.morphTargetsCount),x.push(R.morphAttributeCount),x.push(R.numDirLights),x.push(R.numPointLights),x.push(R.numSpotLights),x.push(R.numSpotLightMaps),x.push(R.numHemiLights),x.push(R.numRectAreaLights),x.push(R.numDirLightShadows),x.push(R.numPointLightShadows),x.push(R.numSpotLightShadows),x.push(R.numSpotLightShadowsWithMaps),x.push(R.numLightProbes),x.push(R.shadowMapType),x.push(R.toneMapping),x.push(R.numClippingPlanes),x.push(R.numClipIntersection),x.push(R.depthPacking)}function M(x,R){o.disableAll(),R.instancing&&o.enable(0),R.instancingColor&&o.enable(1),R.instancingMorph&&o.enable(2),R.matcap&&o.enable(3),R.envMap&&o.enable(4),R.normalMapObjectSpace&&o.enable(5),R.normalMapTangentSpace&&o.enable(6),R.clearcoat&&o.enable(7),R.iridescence&&o.enable(8),R.alphaTest&&o.enable(9),R.vertexColors&&o.enable(10),R.vertexAlphas&&o.enable(11),R.vertexUv1s&&o.enable(12),R.vertexUv2s&&o.enable(13),R.vertexUv3s&&o.enable(14),R.vertexTangents&&o.enable(15),R.anisotropy&&o.enable(16),R.alphaHash&&o.enable(17),R.batching&&o.enable(18),R.dispersion&&o.enable(19),R.batchingColor&&o.enable(20),R.gradientMap&&o.enable(21),R.packedNormalMap&&o.enable(22),R.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),R.fog&&o.enable(0),R.useFog&&o.enable(1),R.flatShading&&o.enable(2),R.logarithmicDepthBuffer&&o.enable(3),R.reversedDepthBuffer&&o.enable(4),R.skinning&&o.enable(5),R.morphTargets&&o.enable(6),R.morphNormals&&o.enable(7),R.morphColors&&o.enable(8),R.premultipliedAlpha&&o.enable(9),R.shadowMapEnabled&&o.enable(10),R.doubleSided&&o.enable(11),R.flipSided&&o.enable(12),R.useDepthPacking&&o.enable(13),R.dithering&&o.enable(14),R.transmission&&o.enable(15),R.sheen&&o.enable(16),R.opaque&&o.enable(17),R.pointsUvs&&o.enable(18),R.decodeVideoTexture&&o.enable(19),R.decodeVideoTextureEmissive&&o.enable(20),R.alphaToCoverage&&o.enable(21),R.numLightProbeGrids>0&&o.enable(22),R.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function v(x){let R=f[x.type],I;if(R){let C=Qt[R];I=Go.clone(C.uniforms)}else I=x.uniforms;return I}function y(x,R){let I=h.get(R);return I!==void 0?++I.usedTimes:(I=new $v(i,R,x,s),l.push(I),h.set(R,I)),I}function E(x){if(--x.usedTimes===0){let R=l.indexOf(x);l[R]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function w(x){a.remove(x)}function T(){a.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:v,acquireProgram:y,releaseProgram:E,releaseShaderCache:w,programs:l,dispose:T}}function e1(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function t1(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function zp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function kp(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function a(d,f,m,_,g,p){let M=i[e];return M===void 0?(M={id:d.id,object:d,geometry:f,material:m,materialVariant:o(d),groupOrder:_,renderOrder:d.renderOrder,z:g,group:p},i[e]=M):(M.id=d.id,M.object=d,M.geometry=f,M.material=m,M.materialVariant=o(d),M.groupOrder=_,M.renderOrder=d.renderOrder,M.z=g,M.group=p),e++,M}function c(d,f,m,_,g,p){let M=a(d,f,m,_,g,p);m.transmission>0?n.push(M):m.transparent===!0?s.push(M):t.push(M)}function l(d,f,m,_,g,p){let M=a(d,f,m,_,g,p);m.transmission>0?n.unshift(M):m.transparent===!0?s.unshift(M):t.unshift(M)}function h(d,f,m){t.length>1&&t.sort(d||t1),n.length>1&&n.sort(f||zp),s.length>1&&s.sort(f||zp),m&&(t.reverse(),n.reverse(),s.reverse())}function u(){for(let d=e,f=i.length;d<f;d++){let m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:u,sort:h}}function n1(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new kp,i.set(n,[o])):s>=r.length?(o=new kp,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function i1(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new ze};break;case"SpotLight":t={position:new U,direction:new U,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function s1(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var r1=0;function o1(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function a1(i){let e=new i1,t=s1(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new U);let s=new U,r=new tt,o=new tt;function a(l){let h=0,u=0,d=0;for(let R=0;R<9;R++)n.probe[R].set(0,0,0);let f=0,m=0,_=0,g=0,p=0,M=0,v=0,y=0,E=0,w=0,T=0;l.sort(o1);for(let R=0,I=l.length;R<I;R++){let C=l[R],D=C.color,B=C.intensity,G=C.distance,O=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Ki?O=C.shadow.map.texture:O=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)h+=D.r*B,u+=D.g*B,d+=D.b*B;else if(C.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(C.sh.coefficients[q],B);T++}else if(C.isDirectionalLight){let q=e.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let H=C.shadow,k=t.get(C);k.shadowIntensity=H.intensity,k.shadowBias=H.bias,k.shadowNormalBias=H.normalBias,k.shadowRadius=H.radius,k.shadowMapSize=H.mapSize,n.directionalShadow[f]=k,n.directionalShadowMap[f]=O,n.directionalShadowMatrix[f]=C.shadow.matrix,M++}n.directional[f]=q,f++}else if(C.isSpotLight){let q=e.get(C);q.position.setFromMatrixPosition(C.matrixWorld),q.color.copy(D).multiplyScalar(B),q.distance=G,q.coneCos=Math.cos(C.angle),q.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),q.decay=C.decay,n.spot[_]=q;let H=C.shadow;if(C.map&&(n.spotLightMap[E]=C.map,E++,H.updateMatrices(C),C.castShadow&&w++),n.spotLightMatrix[_]=H.matrix,C.castShadow){let k=t.get(C);k.shadowIntensity=H.intensity,k.shadowBias=H.bias,k.shadowNormalBias=H.normalBias,k.shadowRadius=H.radius,k.shadowMapSize=H.mapSize,n.spotShadow[_]=k,n.spotShadowMap[_]=O,y++}_++}else if(C.isRectAreaLight){let q=e.get(C);q.color.copy(D).multiplyScalar(B),q.halfWidth.set(C.width*.5,0,0),q.halfHeight.set(0,C.height*.5,0),n.rectArea[g]=q,g++}else if(C.isPointLight){let q=e.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity),q.distance=C.distance,q.decay=C.decay,C.castShadow){let H=C.shadow,k=t.get(C);k.shadowIntensity=H.intensity,k.shadowBias=H.bias,k.shadowNormalBias=H.normalBias,k.shadowRadius=H.radius,k.shadowMapSize=H.mapSize,k.shadowCameraNear=H.camera.near,k.shadowCameraFar=H.camera.far,n.pointShadow[m]=k,n.pointShadowMap[m]=O,n.pointShadowMatrix[m]=C.shadow.matrix,v++}n.point[m]=q,m++}else if(C.isHemisphereLight){let q=e.get(C);q.skyColor.copy(C.color).multiplyScalar(B),q.groundColor.copy(C.groundColor).multiplyScalar(B),n.hemi[p]=q,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=be.LTC_FLOAT_1,n.rectAreaLTC2=be.LTC_FLOAT_2):(n.rectAreaLTC1=be.LTC_HALF_1,n.rectAreaLTC2=be.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let x=n.hash;(x.directionalLength!==f||x.pointLength!==m||x.spotLength!==_||x.rectAreaLength!==g||x.hemiLength!==p||x.numDirectionalShadows!==M||x.numPointShadows!==v||x.numSpotShadows!==y||x.numSpotMaps!==E||x.numLightProbes!==T)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=y+E-w,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=T,x.directionalLength=f,x.pointLength=m,x.spotLength=_,x.rectAreaLength=g,x.hemiLength=p,x.numDirectionalShadows=M,x.numPointShadows=v,x.numSpotShadows=y,x.numSpotMaps=E,x.numLightProbes=T,n.version=r1++)}function c(l,h){let u=0,d=0,f=0,m=0,_=0,g=h.matrixWorldInverse;for(let p=0,M=l.length;p<M;p++){let v=l[p];if(v.isDirectionalLight){let y=n.directional[u];y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(g),u++}else if(v.isSpotLight){let y=n.spot[f];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(g),f++}else if(v.isRectAreaLight){let y=n.rectArea[m];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),o.identity(),r.copy(v.matrixWorld),r.premultiply(g),o.extractRotation(r),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),m++}else if(v.isPointLight){let y=n.point[d];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),d++}else if(v.isHemisphereLight){let y=n.hemi[_];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(g),_++}}}return{setup:a,setupView:c,state:n}}function Vp(i){let e=new a1(i),t=[],n=[],s=[];function r(d){u.camera=d,t.length=0,n.length=0,s.length=0}function o(d){t.push(d)}function a(d){n.push(d)}function c(d){s.push(d)}function l(){e.setup(t)}function h(d){e.setupView(t,d)}let u={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function c1(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new Vp(i),e.set(s,[a])):r>=o.length?(a=new Vp(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var l1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,h1=`uniform sampler2D shadow_pass;
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
}`,u1=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],d1=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],Hp=new tt,Xo=new U,Mu=new U;function f1(i,e,t){let n=new hr,s=new ue,r=new ue,o=new at,a=new nc,c=new ic,l={},h=t.maxTextureSize,u={[yi]:Kt,[Kt]:yi,[jt]:jt},d=new zt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:l1,fragmentShader:h1}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let m=new Et;m.setAttribute("position",new Mt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new _t(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Do;let p=this.type;this.render=function(w,T,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;this.type===Uf&&(Ge("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Do);let R=i.getRenderTarget(),I=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),D=i.state;D.setBlending(ti),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let B=p!==this.type;B&&T.traverse(function(G){G.material&&(Array.isArray(G.material)?G.material.forEach(O=>O.needsUpdate=!0):G.material.needsUpdate=!0)});for(let G=0,O=w.length;G<O;G++){let q=w[G],H=q.shadow;if(H===void 0){Ge("WebGLShadowMap:",q,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);let k=H.getFrameExtents();s.multiply(k),r.copy(H.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/k.x),s.x=r.x*k.x,H.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/k.y),s.y=r.y*k.y,H.mapSize.y=r.y));let ie=i.state.buffers.depth.getReversed();if(H.camera._reversedDepth=ie,H.map===null||B===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===xr){if(q.isPointLight){Ge("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new un(s.x,s.y,{format:Ki,type:ii,minFilter:bt,magFilter:bt,generateMipmaps:!1}),H.map.texture.name=q.name+".shadowMap",H.map.depthTexture=new Si(s.x,s.y,En),H.map.depthTexture.name=q.name+".shadowMapDepth",H.map.depthTexture.format=$n,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Dt,H.map.depthTexture.magFilter=Dt}else q.isPointLight?(H.map=new cl(s.x),H.map.depthTexture=new Ya(s.x,On)):(H.map=new un(s.x,s.y),H.map.depthTexture=new Si(s.x,s.y,On)),H.map.depthTexture.name=q.name+".shadowMap",H.map.depthTexture.format=$n,this.type===Do?(H.map.depthTexture.compareFunction=ie?sl:il,H.map.depthTexture.minFilter=bt,H.map.depthTexture.magFilter=bt):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Dt,H.map.depthTexture.magFilter=Dt);H.camera.updateProjectionMatrix()}let re=H.map.isWebGLCubeRenderTarget?6:1;for(let xe=0;xe<re;xe++){if(H.map.isWebGLCubeRenderTarget)i.setRenderTarget(H.map,xe),i.clear();else{xe===0&&(i.setRenderTarget(H.map),i.clear());let ye=H.getViewport(xe);o.set(r.x*ye.x,r.y*ye.y,r.x*ye.z,r.y*ye.w),D.viewport(o)}if(q.isPointLight){let ye=H.camera,Ue=H.matrix,Je=q.distance||ye.far;Je!==ye.far&&(ye.far=Je,ye.updateProjectionMatrix()),Xo.setFromMatrixPosition(q.matrixWorld),ye.position.copy(Xo),Mu.copy(ye.position),Mu.add(u1[xe]),ye.up.copy(d1[xe]),ye.lookAt(Mu),ye.updateMatrixWorld(),Ue.makeTranslation(-Xo.x,-Xo.y,-Xo.z),Hp.multiplyMatrices(ye.projectionMatrix,ye.matrixWorldInverse),H._frustum.setFromProjectionMatrix(Hp,ye.coordinateSystem,ye.reversedDepth)}else H.updateMatrices(q);n=H.getFrustum(),y(T,x,H.camera,q,this.type)}H.isPointLightShadow!==!0&&this.type===xr&&M(H,x),H.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(R,I,C)};function M(w,T){let x=e.update(_);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new un(s.x,s.y,{format:Ki,type:ii})),d.uniforms.shadow_pass.value=w.map.depthTexture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(T,null,x,d,_,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(T,null,x,f,_,null)}function v(w,T,x,R){let I=null,C=x.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)I=C;else if(I=x.isPointLight===!0?c:a,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){let D=I.uuid,B=T.uuid,G=l[D];G===void 0&&(G={},l[D]=G);let O=G[B];O===void 0&&(O=I.clone(),G[B]=O,T.addEventListener("dispose",E)),I=O}if(I.visible=T.visible,I.wireframe=T.wireframe,R===xr?I.side=T.shadowSide!==null?T.shadowSide:T.side:I.side=T.shadowSide!==null?T.shadowSide:u[T.side],I.alphaMap=T.alphaMap,I.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,I.map=T.map,I.clipShadows=T.clipShadows,I.clippingPlanes=T.clippingPlanes,I.clipIntersection=T.clipIntersection,I.displacementMap=T.displacementMap,I.displacementScale=T.displacementScale,I.displacementBias=T.displacementBias,I.wireframeLinewidth=T.wireframeLinewidth,I.linewidth=T.linewidth,x.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let D=i.properties.get(I);D.light=x}return I}function y(w,T,x,R,I){if(w.visible===!1)return;if(w.layers.test(T.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&I===xr)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,w.matrixWorld);let B=e.update(w),G=w.material;if(Array.isArray(G)){let O=B.groups;for(let q=0,H=O.length;q<H;q++){let k=O[q],ie=G[k.materialIndex];if(ie&&ie.visible){let re=v(w,ie,R,I);w.onBeforeShadow(i,w,T,x,B,re,k),i.renderBufferDirect(x,null,B,re,w,k),w.onAfterShadow(i,w,T,x,B,re,k)}}}else if(G.visible){let O=v(w,G,R,I);w.onBeforeShadow(i,w,T,x,B,O,null),i.renderBufferDirect(x,null,B,O,w,null),w.onAfterShadow(i,w,T,x,B,O,null)}}let D=w.children;for(let B=0,G=D.length;B<G;B++)y(D[B],T,x,R,I)}function E(w){w.target.removeEventListener("dispose",E);for(let x in l){let R=l[x],I=w.target.uuid;I in R&&(R[I].dispose(),delete R[I])}}}function p1(i,e){function t(){let Z=!1,we=new at,pe=null,Ae=new at(0,0,0,0);return{setMask:function(Pe){pe!==Pe&&!Z&&(i.colorMask(Pe,Pe,Pe,Pe),pe=Pe)},setLocked:function(Pe){Z=Pe},setClear:function(Pe,_e,ke,Oe,Tt){Tt===!0&&(Pe*=Oe,_e*=Oe,ke*=Oe),we.set(Pe,_e,ke,Oe),Ae.equals(we)===!1&&(i.clearColor(Pe,_e,ke,Oe),Ae.copy(we))},reset:function(){Z=!1,pe=null,Ae.set(-1,0,0,0)}}}function n(){let Z=!1,we=!1,pe=null,Ae=null,Pe=null;return{setReversed:function(_e){if(we!==_e){let ke=e.get("EXT_clip_control");_e?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT),we=_e;let Oe=Pe;Pe=null,this.setClear(Oe)}},getReversed:function(){return we},setTest:function(_e){_e?V(i.DEPTH_TEST):F(i.DEPTH_TEST)},setMask:function(_e){pe!==_e&&!Z&&(i.depthMask(_e),pe=_e)},setFunc:function(_e){if(we&&(_e=fp[_e]),Ae!==_e){switch(_e){case Oa:i.depthFunc(i.NEVER);break;case Fa:i.depthFunc(i.ALWAYS);break;case Ba:i.depthFunc(i.LESS);break;case ps:i.depthFunc(i.LEQUAL);break;case za:i.depthFunc(i.EQUAL);break;case ka:i.depthFunc(i.GEQUAL);break;case Va:i.depthFunc(i.GREATER);break;case Ha:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ae=_e}},setLocked:function(_e){Z=_e},setClear:function(_e){Pe!==_e&&(Pe=_e,we&&(_e=1-_e),i.clearDepth(_e))},reset:function(){Z=!1,pe=null,Ae=null,Pe=null,we=!1}}}function s(){let Z=!1,we=null,pe=null,Ae=null,Pe=null,_e=null,ke=null,Oe=null,Tt=null;return{setTest:function(yt){Z||(yt?V(i.STENCIL_TEST):F(i.STENCIL_TEST))},setMask:function(yt){we!==yt&&!Z&&(i.stencilMask(yt),we=yt)},setFunc:function(yt,Wn,Xn){(pe!==yt||Ae!==Wn||Pe!==Xn)&&(i.stencilFunc(yt,Wn,Xn),pe=yt,Ae=Wn,Pe=Xn)},setOp:function(yt,Wn,Xn){(_e!==yt||ke!==Wn||Oe!==Xn)&&(i.stencilOp(yt,Wn,Xn),_e=yt,ke=Wn,Oe=Xn)},setLocked:function(yt){Z=yt},setClear:function(yt){Tt!==yt&&(i.clearStencil(yt),Tt=yt)},reset:function(){Z=!1,we=null,pe=null,Ae=null,Pe=null,_e=null,ke=null,Oe=null,Tt=null}}}let r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},u={},d={},f=new WeakMap,m=[],_=null,g=!1,p=null,M=null,v=null,y=null,E=null,w=null,T=null,x=new ze(0,0,0),R=0,I=!1,C=null,D=null,B=null,G=null,O=null,q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,k=0,ie=i.getParameter(i.VERSION);ie.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(ie)[1]),H=k>=1):ie.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(ie)[1]),H=k>=2);let re=null,xe={},ye=i.getParameter(i.SCISSOR_BOX),Ue=i.getParameter(i.VIEWPORT),Je=new at().fromArray(ye),qe=new at().fromArray(Ue);function he(Z,we,pe,Ae){let Pe=new Uint8Array(4),_e=i.createTexture();i.bindTexture(Z,_e),i.texParameteri(Z,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(Z,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ke=0;ke<pe;ke++)Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?i.texImage3D(we,0,i.RGBA,1,1,Ae,0,i.RGBA,i.UNSIGNED_BYTE,Pe):i.texImage2D(we+ke,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Pe);return _e}let J={};J[i.TEXTURE_2D]=he(i.TEXTURE_2D,i.TEXTURE_2D,1),J[i.TEXTURE_CUBE_MAP]=he(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[i.TEXTURE_2D_ARRAY]=he(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),J[i.TEXTURE_3D]=he(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),V(i.DEPTH_TEST),o.setFunc(ps),j(!1),ee(kh),V(i.CULL_FACE),X(ti);function V(Z){h[Z]!==!0&&(i.enable(Z),h[Z]=!0)}function F(Z){h[Z]!==!1&&(i.disable(Z),h[Z]=!1)}function N(Z,we){return d[Z]!==we?(i.bindFramebuffer(Z,we),d[Z]=we,Z===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=we),Z===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=we),!0):!1}function W(Z,we){let pe=m,Ae=!1;if(Z){pe=f.get(we),pe===void 0&&(pe=[],f.set(we,pe));let Pe=Z.textures;if(pe.length!==Pe.length||pe[0]!==i.COLOR_ATTACHMENT0){for(let _e=0,ke=Pe.length;_e<ke;_e++)pe[_e]=i.COLOR_ATTACHMENT0+_e;pe.length=Pe.length,Ae=!0}}else pe[0]!==i.BACK&&(pe[0]=i.BACK,Ae=!0);Ae&&i.drawBuffers(pe)}function ae(Z){return _!==Z?(i.useProgram(Z),_=Z,!0):!1}let fe={[ki]:i.FUNC_ADD,[Ff]:i.FUNC_SUBTRACT,[Bf]:i.FUNC_REVERSE_SUBTRACT};fe[zf]=i.MIN,fe[kf]=i.MAX;let P={[Vf]:i.ZERO,[Hf]:i.ONE,[Gf]:i.SRC_COLOR,[Da]:i.SRC_ALPHA,[Jf]:i.SRC_ALPHA_SATURATE,[Zf]:i.DST_COLOR,[Xf]:i.DST_ALPHA,[Wf]:i.ONE_MINUS_SRC_COLOR,[Ua]:i.ONE_MINUS_SRC_ALPHA,[Yf]:i.ONE_MINUS_DST_COLOR,[qf]:i.ONE_MINUS_DST_ALPHA,[$f]:i.CONSTANT_COLOR,[Kf]:i.ONE_MINUS_CONSTANT_COLOR,[jf]:i.CONSTANT_ALPHA,[Qf]:i.ONE_MINUS_CONSTANT_ALPHA};function X(Z,we,pe,Ae,Pe,_e,ke,Oe,Tt,yt){if(Z===ti){g===!0&&(F(i.BLEND),g=!1);return}if(g===!1&&(V(i.BLEND),g=!0),Z!==Of){if(Z!==p||yt!==I){if((M!==ki||E!==ki)&&(i.blendEquation(i.FUNC_ADD),M=ki,E=ki),yt)switch(Z){case fs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vh:i.blendFunc(i.ONE,i.ONE);break;case Hh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Gh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ze("WebGLState: Invalid blending: ",Z);break}else switch(Z){case fs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Hh:Ze("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Gh:Ze("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ze("WebGLState: Invalid blending: ",Z);break}v=null,y=null,w=null,T=null,x.set(0,0,0),R=0,p=Z,I=yt}return}Pe=Pe||we,_e=_e||pe,ke=ke||Ae,(we!==M||Pe!==E)&&(i.blendEquationSeparate(fe[we],fe[Pe]),M=we,E=Pe),(pe!==v||Ae!==y||_e!==w||ke!==T)&&(i.blendFuncSeparate(P[pe],P[Ae],P[_e],P[ke]),v=pe,y=Ae,w=_e,T=ke),(Oe.equals(x)===!1||Tt!==R)&&(i.blendColor(Oe.r,Oe.g,Oe.b,Tt),x.copy(Oe),R=Tt),p=Z,I=!1}function z(Z,we){Z.side===jt?F(i.CULL_FACE):V(i.CULL_FACE);let pe=Z.side===Kt;we&&(pe=!pe),j(pe),Z.blending===fs&&Z.transparent===!1?X(ti):X(Z.blending,Z.blendEquation,Z.blendSrc,Z.blendDst,Z.blendEquationAlpha,Z.blendSrcAlpha,Z.blendDstAlpha,Z.blendColor,Z.blendAlpha,Z.premultipliedAlpha),o.setFunc(Z.depthFunc),o.setTest(Z.depthTest),o.setMask(Z.depthWrite),r.setMask(Z.colorWrite);let Ae=Z.stencilWrite;a.setTest(Ae),Ae&&(a.setMask(Z.stencilWriteMask),a.setFunc(Z.stencilFunc,Z.stencilRef,Z.stencilFuncMask),a.setOp(Z.stencilFail,Z.stencilZFail,Z.stencilZPass)),me(Z.polygonOffset,Z.polygonOffsetFactor,Z.polygonOffsetUnits),Z.alphaToCoverage===!0?V(i.SAMPLE_ALPHA_TO_COVERAGE):F(i.SAMPLE_ALPHA_TO_COVERAGE)}function j(Z){C!==Z&&(Z?i.frontFace(i.CW):i.frontFace(i.CCW),C=Z)}function ee(Z){Z!==Nf?(V(i.CULL_FACE),Z!==D&&(Z===kh?i.cullFace(i.BACK):Z===Df?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):F(i.CULL_FACE),D=Z}function ce(Z){Z!==B&&(H&&i.lineWidth(Z),B=Z)}function me(Z,we,pe){Z?(V(i.POLYGON_OFFSET_FILL),(G!==we||O!==pe)&&(G=we,O=pe,o.getReversed()&&(we=-we),i.polygonOffset(we,pe))):F(i.POLYGON_OFFSET_FILL)}function ge(Z){Z?V(i.SCISSOR_TEST):F(i.SCISSOR_TEST)}function Y(Z){Z===void 0&&(Z=i.TEXTURE0+q-1),re!==Z&&(i.activeTexture(Z),re=Z)}function b(Z,we,pe){pe===void 0&&(re===null?pe=i.TEXTURE0+q-1:pe=re);let Ae=xe[pe];Ae===void 0&&(Ae={type:void 0,texture:void 0},xe[pe]=Ae),(Ae.type!==Z||Ae.texture!==we)&&(re!==pe&&(i.activeTexture(pe),re=pe),i.bindTexture(Z,we||J[Z]),Ae.type=Z,Ae.texture=we)}function Ie(){let Z=xe[re];Z!==void 0&&Z.type!==void 0&&(i.bindTexture(Z.type,null),Z.type=void 0,Z.texture=void 0)}function De(){try{i.compressedTexImage2D(...arguments)}catch(Z){Ze("WebGLState:",Z)}}function L(){try{i.compressedTexImage3D(...arguments)}catch(Z){Ze("WebGLState:",Z)}}function S(){try{i.texSubImage2D(...arguments)}catch(Z){Ze("WebGLState:",Z)}}function $(){try{i.texSubImage3D(...arguments)}catch(Z){Ze("WebGLState:",Z)}}function Q(){try{i.compressedTexSubImage2D(...arguments)}catch(Z){Ze("WebGLState:",Z)}}function oe(){try{i.compressedTexSubImage3D(...arguments)}catch(Z){Ze("WebGLState:",Z)}}function ve(){try{i.texStorage2D(...arguments)}catch(Z){Ze("WebGLState:",Z)}}function Me(){try{i.texStorage3D(...arguments)}catch(Z){Ze("WebGLState:",Z)}}function le(){try{i.texImage2D(...arguments)}catch(Z){Ze("WebGLState:",Z)}}function de(){try{i.texImage3D(...arguments)}catch(Z){Ze("WebGLState:",Z)}}function Se(Z){return u[Z]!==void 0?u[Z]:i.getParameter(Z)}function Fe(Z,we){u[Z]!==we&&(i.pixelStorei(Z,we),u[Z]=we)}function Te(Z){Je.equals(Z)===!1&&(i.scissor(Z.x,Z.y,Z.z,Z.w),Je.copy(Z))}function Ee(Z){qe.equals(Z)===!1&&(i.viewport(Z.x,Z.y,Z.z,Z.w),qe.copy(Z))}function Xe(Z,we){let pe=l.get(we);pe===void 0&&(pe=new WeakMap,l.set(we,pe));let Ae=pe.get(Z);Ae===void 0&&(Ae=i.getUniformBlockIndex(we,Z.name),pe.set(Z,Ae))}function Ye(Z,we){let Ae=l.get(we).get(Z);c.get(we)!==Ae&&(i.uniformBlockBinding(we,Ae,Z.__bindingPointIndex),c.set(we,Ae))}function Ke(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},re=null,xe={},d={},f=new WeakMap,m=[],_=null,g=!1,p=null,M=null,v=null,y=null,E=null,w=null,T=null,x=new ze(0,0,0),R=0,I=!1,C=null,D=null,B=null,G=null,O=null,Je.set(0,0,i.canvas.width,i.canvas.height),qe.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:V,disable:F,bindFramebuffer:N,drawBuffers:W,useProgram:ae,setBlending:X,setMaterial:z,setFlipSided:j,setCullFace:ee,setLineWidth:ce,setPolygonOffset:me,setScissorTest:ge,activeTexture:Y,bindTexture:b,unbindTexture:Ie,compressedTexImage2D:De,compressedTexImage3D:L,texImage2D:le,texImage3D:de,pixelStorei:Fe,getParameter:Se,updateUBOMapping:Xe,uniformBlockBinding:Ye,texStorage2D:ve,texStorage3D:Me,texSubImage2D:S,texSubImage3D:$,compressedTexSubImage2D:Q,compressedTexSubImage3D:oe,scissor:Te,viewport:Ee,reset:Ke}}function m1(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ue,h=new WeakMap,u=new Set,d,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(L,S){return m?new OffscreenCanvas(L,S):so("canvas")}function g(L,S,$){let Q=1,oe=De(L);if((oe.width>$||oe.height>$)&&(Q=$/Math.max(oe.width,oe.height)),Q<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){let ve=Math.floor(Q*oe.width),Me=Math.floor(Q*oe.height);d===void 0&&(d=_(ve,Me));let le=S?_(ve,Me):d;return le.width=ve,le.height=Me,le.getContext("2d").drawImage(L,0,0,ve,Me),Ge("WebGLRenderer: Texture has been resized from ("+oe.width+"x"+oe.height+") to ("+ve+"x"+Me+")."),le}else return"data"in L&&Ge("WebGLRenderer: Image in DataTexture is too big ("+oe.width+"x"+oe.height+")."),L;return L}function p(L){return L.generateMipmaps}function M(L){i.generateMipmap(L)}function v(L){return L.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?i.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(L,S,$,Q,oe,ve=!1){if(L!==null){if(i[L]!==void 0)return i[L];Ge("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let Me;Q&&(Me=e.get("EXT_texture_norm16"),Me||Ge("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let le=S;if(S===i.RED&&($===i.FLOAT&&(le=i.R32F),$===i.HALF_FLOAT&&(le=i.R16F),$===i.UNSIGNED_BYTE&&(le=i.R8),$===i.UNSIGNED_SHORT&&Me&&(le=Me.R16_EXT),$===i.SHORT&&Me&&(le=Me.R16_SNORM_EXT)),S===i.RED_INTEGER&&($===i.UNSIGNED_BYTE&&(le=i.R8UI),$===i.UNSIGNED_SHORT&&(le=i.R16UI),$===i.UNSIGNED_INT&&(le=i.R32UI),$===i.BYTE&&(le=i.R8I),$===i.SHORT&&(le=i.R16I),$===i.INT&&(le=i.R32I)),S===i.RG&&($===i.FLOAT&&(le=i.RG32F),$===i.HALF_FLOAT&&(le=i.RG16F),$===i.UNSIGNED_BYTE&&(le=i.RG8),$===i.UNSIGNED_SHORT&&Me&&(le=Me.RG16_EXT),$===i.SHORT&&Me&&(le=Me.RG16_SNORM_EXT)),S===i.RG_INTEGER&&($===i.UNSIGNED_BYTE&&(le=i.RG8UI),$===i.UNSIGNED_SHORT&&(le=i.RG16UI),$===i.UNSIGNED_INT&&(le=i.RG32UI),$===i.BYTE&&(le=i.RG8I),$===i.SHORT&&(le=i.RG16I),$===i.INT&&(le=i.RG32I)),S===i.RGB_INTEGER&&($===i.UNSIGNED_BYTE&&(le=i.RGB8UI),$===i.UNSIGNED_SHORT&&(le=i.RGB16UI),$===i.UNSIGNED_INT&&(le=i.RGB32UI),$===i.BYTE&&(le=i.RGB8I),$===i.SHORT&&(le=i.RGB16I),$===i.INT&&(le=i.RGB32I)),S===i.RGBA_INTEGER&&($===i.UNSIGNED_BYTE&&(le=i.RGBA8UI),$===i.UNSIGNED_SHORT&&(le=i.RGBA16UI),$===i.UNSIGNED_INT&&(le=i.RGBA32UI),$===i.BYTE&&(le=i.RGBA8I),$===i.SHORT&&(le=i.RGBA16I),$===i.INT&&(le=i.RGBA32I)),S===i.RGB&&($===i.UNSIGNED_SHORT&&Me&&(le=Me.RGB16_EXT),$===i.SHORT&&Me&&(le=Me.RGB16_SNORM_EXT),$===i.UNSIGNED_INT_5_9_9_9_REV&&(le=i.RGB9_E5),$===i.UNSIGNED_INT_10F_11F_11F_REV&&(le=i.R11F_G11F_B10F)),S===i.RGBA){let de=ve?io:it.getTransfer(oe);$===i.FLOAT&&(le=i.RGBA32F),$===i.HALF_FLOAT&&(le=i.RGBA16F),$===i.UNSIGNED_BYTE&&(le=de===ht?i.SRGB8_ALPHA8:i.RGBA8),$===i.UNSIGNED_SHORT&&Me&&(le=Me.RGBA16_EXT),$===i.SHORT&&Me&&(le=Me.RGBA16_SNORM_EXT),$===i.UNSIGNED_SHORT_4_4_4_4&&(le=i.RGBA4),$===i.UNSIGNED_SHORT_5_5_5_1&&(le=i.RGB5_A1)}return(le===i.R16F||le===i.R32F||le===i.RG16F||le===i.RG32F||le===i.RGBA16F||le===i.RGBA32F)&&e.get("EXT_color_buffer_float"),le}function E(L,S){let $;return L?S===null||S===On||S===vr?$=i.DEPTH24_STENCIL8:S===En?$=i.DEPTH32F_STENCIL8:S===yr&&($=i.DEPTH24_STENCIL8,Ge("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===On||S===vr?$=i.DEPTH_COMPONENT24:S===En?$=i.DEPTH_COMPONENT32F:S===yr&&($=i.DEPTH_COMPONENT16),$}function w(L,S){return p(L)===!0||L.isFramebufferTexture&&L.minFilter!==Dt&&L.minFilter!==bt?Math.log2(Math.max(S.width,S.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?S.mipmaps.length:1}function T(L){let S=L.target;S.removeEventListener("dispose",T),R(S),S.isVideoTexture&&h.delete(S),S.isHTMLTexture&&u.delete(S)}function x(L){let S=L.target;S.removeEventListener("dispose",x),C(S)}function R(L){let S=n.get(L);if(S.__webglInit===void 0)return;let $=L.source,Q=f.get($);if(Q){let oe=Q[S.__cacheKey];oe.usedTimes--,oe.usedTimes===0&&I(L),Object.keys(Q).length===0&&f.delete($)}n.remove(L)}function I(L){let S=n.get(L);i.deleteTexture(S.__webglTexture);let $=L.source,Q=f.get($);delete Q[S.__cacheKey],o.memory.textures--}function C(L){let S=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(S.__webglFramebuffer[Q]))for(let oe=0;oe<S.__webglFramebuffer[Q].length;oe++)i.deleteFramebuffer(S.__webglFramebuffer[Q][oe]);else i.deleteFramebuffer(S.__webglFramebuffer[Q]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[Q])}else{if(Array.isArray(S.__webglFramebuffer))for(let Q=0;Q<S.__webglFramebuffer.length;Q++)i.deleteFramebuffer(S.__webglFramebuffer[Q]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Q=0;Q<S.__webglColorRenderbuffer.length;Q++)S.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[Q]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let $=L.textures;for(let Q=0,oe=$.length;Q<oe;Q++){let ve=n.get($[Q]);ve.__webglTexture&&(i.deleteTexture(ve.__webglTexture),o.memory.textures--),n.remove($[Q])}n.remove(L)}let D=0;function B(){D=0}function G(){return D}function O(L){D=L}function q(){let L=D;return L>=s.maxTextures&&Ge("WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+s.maxTextures),D+=1,L}function H(L){let S=[];return S.push(L.wrapS),S.push(L.wrapT),S.push(L.wrapR||0),S.push(L.magFilter),S.push(L.minFilter),S.push(L.anisotropy),S.push(L.internalFormat),S.push(L.format),S.push(L.type),S.push(L.generateMipmaps),S.push(L.premultiplyAlpha),S.push(L.flipY),S.push(L.unpackAlignment),S.push(L.colorSpace),S.join()}function k(L,S){let $=n.get(L);if(L.isVideoTexture&&b(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&$.__version!==L.version){let Q=L.image;if(Q===null)Ge("WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)Ge("WebGLRenderer: Texture marked for update but image is incomplete");else{F($,L,S);return}}else L.isExternalTexture&&($.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,$.__webglTexture,i.TEXTURE0+S)}function ie(L,S){let $=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&$.__version!==L.version){F($,L,S);return}else L.isExternalTexture&&($.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,$.__webglTexture,i.TEXTURE0+S)}function re(L,S){let $=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&$.__version!==L.version){F($,L,S);return}t.bindTexture(i.TEXTURE_3D,$.__webglTexture,i.TEXTURE0+S)}function xe(L,S){let $=n.get(L);if(L.isCubeDepthTexture!==!0&&L.version>0&&$.__version!==L.version){N($,L,S);return}t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture,i.TEXTURE0+S)}let ye={[Sn]:i.REPEAT,[nn]:i.CLAMP_TO_EDGE,[Vi]:i.MIRRORED_REPEAT},Ue={[Dt]:i.NEAREST,[_c]:i.NEAREST_MIPMAP_NEAREST,[Ms]:i.NEAREST_MIPMAP_LINEAR,[bt]:i.LINEAR,[_r]:i.LINEAR_MIPMAP_NEAREST,[ni]:i.LINEAR_MIPMAP_LINEAR},Je={[sp]:i.NEVER,[lp]:i.ALWAYS,[rp]:i.LESS,[il]:i.LEQUAL,[op]:i.EQUAL,[sl]:i.GEQUAL,[ap]:i.GREATER,[cp]:i.NOTEQUAL};function qe(L,S){if(S.type===En&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===bt||S.magFilter===_r||S.magFilter===Ms||S.magFilter===ni||S.minFilter===bt||S.minFilter===_r||S.minFilter===Ms||S.minFilter===ni)&&Ge("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(L,i.TEXTURE_WRAP_S,ye[S.wrapS]),i.texParameteri(L,i.TEXTURE_WRAP_T,ye[S.wrapT]),(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)&&i.texParameteri(L,i.TEXTURE_WRAP_R,ye[S.wrapR]),i.texParameteri(L,i.TEXTURE_MAG_FILTER,Ue[S.magFilter]),i.texParameteri(L,i.TEXTURE_MIN_FILTER,Ue[S.minFilter]),S.compareFunction&&(i.texParameteri(L,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(L,i.TEXTURE_COMPARE_FUNC,Je[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Dt||S.minFilter!==Ms&&S.minFilter!==ni||S.type===En&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){let $=e.get("EXT_texture_filter_anisotropic");i.texParameterf(L,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function he(L,S){let $=!1;L.__webglInit===void 0&&(L.__webglInit=!0,S.addEventListener("dispose",T));let Q=S.source,oe=f.get(Q);oe===void 0&&(oe={},f.set(Q,oe));let ve=H(S);if(ve!==L.__cacheKey){oe[ve]===void 0&&(oe[ve]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,$=!0),oe[ve].usedTimes++;let Me=oe[L.__cacheKey];Me!==void 0&&(oe[L.__cacheKey].usedTimes--,Me.usedTimes===0&&I(S)),L.__cacheKey=ve,L.__webglTexture=oe[ve].texture}return $}function J(L,S,$){return Math.floor(Math.floor(L/$)/S)}function V(L,S,$,Q){let ve=L.updateRanges;if(ve.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,S.width,S.height,$,Q,S.data);else{ve.sort((Fe,Te)=>Fe.start-Te.start);let Me=0;for(let Fe=1;Fe<ve.length;Fe++){let Te=ve[Me],Ee=ve[Fe],Xe=Te.start+Te.count,Ye=J(Ee.start,S.width,4),Ke=J(Te.start,S.width,4);Ee.start<=Xe+1&&Ye===Ke&&J(Ee.start+Ee.count-1,S.width,4)===Ye?Te.count=Math.max(Te.count,Ee.start+Ee.count-Te.start):(++Me,ve[Me]=Ee)}ve.length=Me+1;let le=t.getParameter(i.UNPACK_ROW_LENGTH),de=t.getParameter(i.UNPACK_SKIP_PIXELS),Se=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,S.width);for(let Fe=0,Te=ve.length;Fe<Te;Fe++){let Ee=ve[Fe],Xe=Math.floor(Ee.start/4),Ye=Math.ceil(Ee.count/4),Ke=Xe%S.width,Z=Math.floor(Xe/S.width),we=Ye,pe=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ke),t.pixelStorei(i.UNPACK_SKIP_ROWS,Z),t.texSubImage2D(i.TEXTURE_2D,0,Ke,Z,we,pe,$,Q,S.data)}L.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,le),t.pixelStorei(i.UNPACK_SKIP_PIXELS,de),t.pixelStorei(i.UNPACK_SKIP_ROWS,Se)}}function F(L,S,$){let Q=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Q=i.TEXTURE_3D);let oe=he(L,S),ve=S.source;t.bindTexture(Q,L.__webglTexture,i.TEXTURE0+$);let Me=n.get(ve);if(ve.version!==Me.__version||oe===!0){if(t.activeTexture(i.TEXTURE0+$),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){let pe=it.getPrimaries(it.workingColorSpace),Ae=S.colorSpace===Fn?null:it.getPrimaries(S.colorSpace),Pe=S.colorSpace===Fn||pe===Ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe)}t.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment);let de=g(S.image,!1,s.maxTextureSize);de=Ie(S,de);let Se=r.convert(S.format,S.colorSpace),Fe=r.convert(S.type),Te=y(S.internalFormat,Se,Fe,S.normalized,S.colorSpace,S.isVideoTexture);qe(Q,S);let Ee,Xe=S.mipmaps,Ye=S.isVideoTexture!==!0,Ke=Me.__version===void 0||oe===!0,Z=ve.dataReady,we=w(S,de);if(S.isDepthTexture)Te=E(S.format===$i,S.type),Ke&&(Ye?t.texStorage2D(i.TEXTURE_2D,1,Te,de.width,de.height):t.texImage2D(i.TEXTURE_2D,0,Te,de.width,de.height,0,Se,Fe,null));else if(S.isDataTexture)if(Xe.length>0){Ye&&Ke&&t.texStorage2D(i.TEXTURE_2D,we,Te,Xe[0].width,Xe[0].height);for(let pe=0,Ae=Xe.length;pe<Ae;pe++)Ee=Xe[pe],Ye?Z&&t.texSubImage2D(i.TEXTURE_2D,pe,0,0,Ee.width,Ee.height,Se,Fe,Ee.data):t.texImage2D(i.TEXTURE_2D,pe,Te,Ee.width,Ee.height,0,Se,Fe,Ee.data);S.generateMipmaps=!1}else Ye?(Ke&&t.texStorage2D(i.TEXTURE_2D,we,Te,de.width,de.height),Z&&V(S,de,Se,Fe)):t.texImage2D(i.TEXTURE_2D,0,Te,de.width,de.height,0,Se,Fe,de.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Ye&&Ke&&t.texStorage3D(i.TEXTURE_2D_ARRAY,we,Te,Xe[0].width,Xe[0].height,de.depth);for(let pe=0,Ae=Xe.length;pe<Ae;pe++)if(Ee=Xe[pe],S.format!==rn)if(Se!==null)if(Ye){if(Z)if(S.layerUpdates.size>0){let Pe=hu(Ee.width,Ee.height,S.format,S.type);for(let _e of S.layerUpdates){let ke=Ee.data.subarray(_e*Pe/Ee.data.BYTES_PER_ELEMENT,(_e+1)*Pe/Ee.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,pe,0,0,_e,Ee.width,Ee.height,1,Se,ke)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,pe,0,0,0,Ee.width,Ee.height,de.depth,Se,Ee.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,pe,Te,Ee.width,Ee.height,de.depth,0,Ee.data,0,0);else Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ye?Z&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,pe,0,0,0,Ee.width,Ee.height,de.depth,Se,Fe,Ee.data):t.texImage3D(i.TEXTURE_2D_ARRAY,pe,Te,Ee.width,Ee.height,de.depth,0,Se,Fe,Ee.data)}else{Ye&&Ke&&t.texStorage2D(i.TEXTURE_2D,we,Te,Xe[0].width,Xe[0].height);for(let pe=0,Ae=Xe.length;pe<Ae;pe++)Ee=Xe[pe],S.format!==rn?Se!==null?Ye?Z&&t.compressedTexSubImage2D(i.TEXTURE_2D,pe,0,0,Ee.width,Ee.height,Se,Ee.data):t.compressedTexImage2D(i.TEXTURE_2D,pe,Te,Ee.width,Ee.height,0,Ee.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?Z&&t.texSubImage2D(i.TEXTURE_2D,pe,0,0,Ee.width,Ee.height,Se,Fe,Ee.data):t.texImage2D(i.TEXTURE_2D,pe,Te,Ee.width,Ee.height,0,Se,Fe,Ee.data)}else if(S.isDataArrayTexture)if(Ye){if(Ke&&t.texStorage3D(i.TEXTURE_2D_ARRAY,we,Te,de.width,de.height,de.depth),Z)if(S.layerUpdates.size>0){let pe=hu(de.width,de.height,S.format,S.type);for(let Ae of S.layerUpdates){let Pe=de.data.subarray(Ae*pe/de.data.BYTES_PER_ELEMENT,(Ae+1)*pe/de.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ae,de.width,de.height,1,Se,Fe,Pe)}S.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,de.width,de.height,de.depth,Se,Fe,de.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Te,de.width,de.height,de.depth,0,Se,Fe,de.data);else if(S.isData3DTexture)Ye?(Ke&&t.texStorage3D(i.TEXTURE_3D,we,Te,de.width,de.height,de.depth),Z&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,de.width,de.height,de.depth,Se,Fe,de.data)):t.texImage3D(i.TEXTURE_3D,0,Te,de.width,de.height,de.depth,0,Se,Fe,de.data);else if(S.isFramebufferTexture){if(Ke)if(Ye)t.texStorage2D(i.TEXTURE_2D,we,Te,de.width,de.height);else{let pe=de.width,Ae=de.height;for(let Pe=0;Pe<we;Pe++)t.texImage2D(i.TEXTURE_2D,Pe,Te,pe,Ae,0,Se,Fe,null),pe>>=1,Ae>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in i){let pe=i.canvas;if(pe.hasAttribute("layoutsubtree")||pe.setAttribute("layoutsubtree","true"),de.parentNode!==pe){pe.appendChild(de),u.add(S),pe.onpaint=Ae=>{let Pe=Ae.changedElements;for(let _e of u)Pe.includes(_e.image)&&(_e.needsUpdate=!0)},pe.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,de);else{let Pe=i.RGBA,_e=i.RGBA,ke=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Pe,_e,ke,de)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Xe.length>0){if(Ye&&Ke){let pe=De(Xe[0]);t.texStorage2D(i.TEXTURE_2D,we,Te,pe.width,pe.height)}for(let pe=0,Ae=Xe.length;pe<Ae;pe++)Ee=Xe[pe],Ye?Z&&t.texSubImage2D(i.TEXTURE_2D,pe,0,0,Se,Fe,Ee):t.texImage2D(i.TEXTURE_2D,pe,Te,Se,Fe,Ee);S.generateMipmaps=!1}else if(Ye){if(Ke){let pe=De(de);t.texStorage2D(i.TEXTURE_2D,we,Te,pe.width,pe.height)}Z&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Se,Fe,de)}else t.texImage2D(i.TEXTURE_2D,0,Te,Se,Fe,de);p(S)&&M(Q),Me.__version=ve.version,S.onUpdate&&S.onUpdate(S)}L.__version=S.version}function N(L,S,$){if(S.image.length!==6)return;let Q=he(L,S),oe=S.source;t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+$);let ve=n.get(oe);if(oe.version!==ve.__version||Q===!0){t.activeTexture(i.TEXTURE0+$);let Me=it.getPrimaries(it.workingColorSpace),le=S.colorSpace===Fn?null:it.getPrimaries(S.colorSpace),de=S.colorSpace===Fn||Me===le?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);let Se=S.isCompressedTexture||S.image[0].isCompressedTexture,Fe=S.image[0]&&S.image[0].isDataTexture,Te=[];for(let _e=0;_e<6;_e++)!Se&&!Fe?Te[_e]=g(S.image[_e],!0,s.maxCubemapSize):Te[_e]=Fe?S.image[_e].image:S.image[_e],Te[_e]=Ie(S,Te[_e]);let Ee=Te[0],Xe=r.convert(S.format,S.colorSpace),Ye=r.convert(S.type),Ke=y(S.internalFormat,Xe,Ye,S.normalized,S.colorSpace),Z=S.isVideoTexture!==!0,we=ve.__version===void 0||Q===!0,pe=oe.dataReady,Ae=w(S,Ee);qe(i.TEXTURE_CUBE_MAP,S);let Pe;if(Se){Z&&we&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ae,Ke,Ee.width,Ee.height);for(let _e=0;_e<6;_e++){Pe=Te[_e].mipmaps;for(let ke=0;ke<Pe.length;ke++){let Oe=Pe[ke];S.format!==rn?Xe!==null?Z?pe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,ke,0,0,Oe.width,Oe.height,Xe,Oe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,ke,Ke,Oe.width,Oe.height,0,Oe.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Z?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,ke,0,0,Oe.width,Oe.height,Xe,Ye,Oe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,ke,Ke,Oe.width,Oe.height,0,Xe,Ye,Oe.data)}}}else{if(Pe=S.mipmaps,Z&&we){Pe.length>0&&Ae++;let _e=De(Te[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ae,Ke,_e.width,_e.height)}for(let _e=0;_e<6;_e++)if(Fe){Z?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,Te[_e].width,Te[_e].height,Xe,Ye,Te[_e].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,Ke,Te[_e].width,Te[_e].height,0,Xe,Ye,Te[_e].data);for(let ke=0;ke<Pe.length;ke++){let Tt=Pe[ke].image[_e].image;Z?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,ke+1,0,0,Tt.width,Tt.height,Xe,Ye,Tt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,ke+1,Ke,Tt.width,Tt.height,0,Xe,Ye,Tt.data)}}else{Z?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,Xe,Ye,Te[_e]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,Ke,Xe,Ye,Te[_e]);for(let ke=0;ke<Pe.length;ke++){let Oe=Pe[ke];Z?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,ke+1,0,0,Xe,Ye,Oe.image[_e]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,ke+1,Ke,Xe,Ye,Oe.image[_e])}}}p(S)&&M(i.TEXTURE_CUBE_MAP),ve.__version=oe.version,S.onUpdate&&S.onUpdate(S)}L.__version=S.version}function W(L,S,$,Q,oe,ve){let Me=r.convert($.format,$.colorSpace),le=r.convert($.type),de=y($.internalFormat,Me,le,$.normalized,$.colorSpace),Se=n.get(S),Fe=n.get($);if(Fe.__renderTarget=S,!Se.__hasExternalTextures){let Te=Math.max(1,S.width>>ve),Ee=Math.max(1,S.height>>ve);oe===i.TEXTURE_3D||oe===i.TEXTURE_2D_ARRAY?t.texImage3D(oe,ve,de,Te,Ee,S.depth,0,Me,le,null):t.texImage2D(oe,ve,de,Te,Ee,0,Me,le,null)}t.bindFramebuffer(i.FRAMEBUFFER,L),Y(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,oe,Fe.__webglTexture,0,ge(S)):(oe===i.TEXTURE_2D||oe>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&oe<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,oe,Fe.__webglTexture,ve),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ae(L,S,$){if(i.bindRenderbuffer(i.RENDERBUFFER,L),S.depthBuffer){let Q=S.depthTexture,oe=Q&&Q.isDepthTexture?Q.type:null,ve=E(S.stencilBuffer,oe),Me=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Y(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ge(S),ve,S.width,S.height):$?i.renderbufferStorageMultisample(i.RENDERBUFFER,ge(S),ve,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,ve,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Me,i.RENDERBUFFER,L)}else{let Q=S.textures;for(let oe=0;oe<Q.length;oe++){let ve=Q[oe],Me=r.convert(ve.format,ve.colorSpace),le=r.convert(ve.type),de=y(ve.internalFormat,Me,le,ve.normalized,ve.colorSpace);Y(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ge(S),de,S.width,S.height):$?i.renderbufferStorageMultisample(i.RENDERBUFFER,ge(S),de,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,de,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function fe(L,S,$){let Q=S.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,L),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let oe=n.get(S.depthTexture);if(oe.__renderTarget=S,(!oe.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),Q){if(oe.__webglInit===void 0&&(oe.__webglInit=!0,S.depthTexture.addEventListener("dispose",T)),oe.__webglTexture===void 0){oe.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,oe.__webglTexture),qe(i.TEXTURE_CUBE_MAP,S.depthTexture);let Se=r.convert(S.depthTexture.format),Fe=r.convert(S.depthTexture.type),Te;S.depthTexture.format===$n?Te=i.DEPTH_COMPONENT24:S.depthTexture.format===$i&&(Te=i.DEPTH24_STENCIL8);for(let Ee=0;Ee<6;Ee++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,Te,S.width,S.height,0,Se,Fe,null)}}else k(S.depthTexture,0);let ve=oe.__webglTexture,Me=ge(S),le=Q?i.TEXTURE_CUBE_MAP_POSITIVE_X+$:i.TEXTURE_2D,de=S.depthTexture.format===$i?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(S.depthTexture.format===$n)Y(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,de,le,ve,0,Me):i.framebufferTexture2D(i.FRAMEBUFFER,de,le,ve,0);else if(S.depthTexture.format===$i)Y(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,de,le,ve,0,Me):i.framebufferTexture2D(i.FRAMEBUFFER,de,le,ve,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function P(L){let S=n.get(L),$=L.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==L.depthTexture){let Q=L.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),Q){let oe=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,Q.removeEventListener("dispose",oe)};Q.addEventListener("dispose",oe),S.__depthDisposeCallback=oe}S.__boundDepthTexture=Q}if(L.depthTexture&&!S.__autoAllocateDepthBuffer)if($)for(let Q=0;Q<6;Q++)fe(S.__webglFramebuffer[Q],L,Q);else{let Q=L.texture.mipmaps;Q&&Q.length>0?fe(S.__webglFramebuffer[0],L,0):fe(S.__webglFramebuffer,L,0)}else if($){S.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[Q]),S.__webglDepthbuffer[Q]===void 0)S.__webglDepthbuffer[Q]=i.createRenderbuffer(),ae(S.__webglDepthbuffer[Q],L,!1);else{let oe=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=S.__webglDepthbuffer[Q];i.bindRenderbuffer(i.RENDERBUFFER,ve),i.framebufferRenderbuffer(i.FRAMEBUFFER,oe,i.RENDERBUFFER,ve)}}else{let Q=L.texture.mipmaps;if(Q&&Q.length>0?t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),ae(S.__webglDepthbuffer,L,!1);else{let oe=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ve),i.framebufferRenderbuffer(i.FRAMEBUFFER,oe,i.RENDERBUFFER,ve)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function X(L,S,$){let Q=n.get(L);S!==void 0&&W(Q.__webglFramebuffer,L,L.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),$!==void 0&&P(L)}function z(L){let S=L.texture,$=n.get(L),Q=n.get(S);L.addEventListener("dispose",x);let oe=L.textures,ve=L.isWebGLCubeRenderTarget===!0,Me=oe.length>1;if(Me||(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=S.version,o.memory.textures++),ve){$.__webglFramebuffer=[];for(let le=0;le<6;le++)if(S.mipmaps&&S.mipmaps.length>0){$.__webglFramebuffer[le]=[];for(let de=0;de<S.mipmaps.length;de++)$.__webglFramebuffer[le][de]=i.createFramebuffer()}else $.__webglFramebuffer[le]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){$.__webglFramebuffer=[];for(let le=0;le<S.mipmaps.length;le++)$.__webglFramebuffer[le]=i.createFramebuffer()}else $.__webglFramebuffer=i.createFramebuffer();if(Me)for(let le=0,de=oe.length;le<de;le++){let Se=n.get(oe[le]);Se.__webglTexture===void 0&&(Se.__webglTexture=i.createTexture(),o.memory.textures++)}if(L.samples>0&&Y(L)===!1){$.__webglMultisampledFramebuffer=i.createFramebuffer(),$.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let le=0;le<oe.length;le++){let de=oe[le];$.__webglColorRenderbuffer[le]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,$.__webglColorRenderbuffer[le]);let Se=r.convert(de.format,de.colorSpace),Fe=r.convert(de.type),Te=y(de.internalFormat,Se,Fe,de.normalized,de.colorSpace,L.isXRRenderTarget===!0),Ee=ge(L);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ee,Te,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,$.__webglColorRenderbuffer[le])}i.bindRenderbuffer(i.RENDERBUFFER,null),L.depthBuffer&&($.__webglDepthRenderbuffer=i.createRenderbuffer(),ae($.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ve){t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),qe(i.TEXTURE_CUBE_MAP,S);for(let le=0;le<6;le++)if(S.mipmaps&&S.mipmaps.length>0)for(let de=0;de<S.mipmaps.length;de++)W($.__webglFramebuffer[le][de],L,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,de);else W($.__webglFramebuffer[le],L,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);p(S)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Me){for(let le=0,de=oe.length;le<de;le++){let Se=oe[le],Fe=n.get(Se),Te=i.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(Te=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Te,Fe.__webglTexture),qe(Te,Se),W($.__webglFramebuffer,L,Se,i.COLOR_ATTACHMENT0+le,Te,0),p(Se)&&M(Te)}t.unbindTexture()}else{let le=i.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(le=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(le,Q.__webglTexture),qe(le,S),S.mipmaps&&S.mipmaps.length>0)for(let de=0;de<S.mipmaps.length;de++)W($.__webglFramebuffer[de],L,S,i.COLOR_ATTACHMENT0,le,de);else W($.__webglFramebuffer,L,S,i.COLOR_ATTACHMENT0,le,0);p(S)&&M(le),t.unbindTexture()}L.depthBuffer&&P(L)}function j(L){let S=L.textures;for(let $=0,Q=S.length;$<Q;$++){let oe=S[$];if(p(oe)){let ve=v(L),Me=n.get(oe).__webglTexture;t.bindTexture(ve,Me),M(ve),t.unbindTexture()}}}let ee=[],ce=[];function me(L){if(L.samples>0){if(Y(L)===!1){let S=L.textures,$=L.width,Q=L.height,oe=i.COLOR_BUFFER_BIT,ve=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=n.get(L),le=S.length>1;if(le)for(let Se=0;Se<S.length;Se++)t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer);let de=L.texture.mipmaps;de&&de.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let Se=0;Se<S.length;Se++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(oe|=i.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(oe|=i.STENCIL_BUFFER_BIT)),le){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Me.__webglColorRenderbuffer[Se]);let Fe=n.get(S[Se]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Fe,0)}i.blitFramebuffer(0,0,$,Q,0,0,$,Q,oe,i.NEAREST),c===!0&&(ee.length=0,ce.length=0,ee.push(i.COLOR_ATTACHMENT0+Se),L.depthBuffer&&L.resolveDepthBuffer===!1&&(ee.push(ve),ce.push(ve),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ce)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ee))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),le)for(let Se=0;Se<S.length;Se++){t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.RENDERBUFFER,Me.__webglColorRenderbuffer[Se]);let Fe=n.get(S[Se]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.TEXTURE_2D,Fe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&c){let S=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function ge(L){return Math.min(s.maxSamples,L.samples)}function Y(L){let S=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function b(L){let S=o.render.frame;h.get(L)!==S&&(h.set(L,S),L.update())}function Ie(L,S){let $=L.colorSpace,Q=L.format,oe=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||$!==no&&$!==Fn&&(it.getTransfer($)===ht?(Q!==rn||oe!==sn)&&Ge("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ze("WebGLTextures: Unsupported texture color space:",$)),S}function De(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(l.width=L.naturalWidth||L.width,l.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(l.width=L.displayWidth,l.height=L.displayHeight):(l.width=L.width,l.height=L.height),l}this.allocateTextureUnit=q,this.resetTextureUnits=B,this.getTextureUnits=G,this.setTextureUnits=O,this.setTexture2D=k,this.setTexture2DArray=ie,this.setTexture3D=re,this.setTextureCube=xe,this.rebindTextures=X,this.setupRenderTarget=z,this.updateRenderTargetMipmap=j,this.updateMultisampleRenderTarget=me,this.setupDepthRenderbuffer=P,this.setupFrameBufferTexture=W,this.useMultisampledRTT=Y,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function g1(i,e){function t(n,s=Fn){let r,o=it.getTransfer(s);if(n===sn)return i.UNSIGNED_BYTE;if(n===vc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Mc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===eu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===tu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===jh)return i.BYTE;if(n===Qh)return i.SHORT;if(n===yr)return i.UNSIGNED_SHORT;if(n===yc)return i.INT;if(n===On)return i.UNSIGNED_INT;if(n===En)return i.FLOAT;if(n===ii)return i.HALF_FLOAT;if(n===nu)return i.ALPHA;if(n===iu)return i.RGB;if(n===rn)return i.RGBA;if(n===$n)return i.DEPTH_COMPONENT;if(n===$i)return i.DEPTH_STENCIL;if(n===Sc)return i.RED;if(n===bc)return i.RED_INTEGER;if(n===Ki)return i.RG;if(n===Ec)return i.RG_INTEGER;if(n===wc)return i.RGBA_INTEGER;if(n===Fo||n===Bo||n===zo||n===ko)if(o===ht)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Fo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Bo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===zo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ko)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Fo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Bo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===zo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ko)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Tc||n===Ac||n===Rc||n===Cc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Tc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ac)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Rc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Cc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ic||n===Pc||n===Lc||n===Nc||n===Dc||n===Vo||n===Uc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ic||n===Pc)return o===ht?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Lc)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Nc)return r.COMPRESSED_R11_EAC;if(n===Dc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Vo)return r.COMPRESSED_RG11_EAC;if(n===Uc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Oc||n===Fc||n===Bc||n===zc||n===kc||n===Vc||n===Hc||n===Gc||n===Wc||n===Xc||n===qc||n===Zc||n===Yc||n===Jc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Oc)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Fc)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Bc)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===zc)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===kc)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Vc)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Hc)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Gc)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Wc)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Xc)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===qc)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Zc)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Yc)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Jc)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===$c||n===Kc||n===jc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===$c)return o===ht?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Kc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===jc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Qc||n===el||n===Ho||n===tl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Qc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===el)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ho)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===tl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===vr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var x1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_1=`
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

}`,Cu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new mo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new zt({vertexShader:x1,fragmentShader:_1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new _t(new Nn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Iu=class extends Kn{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,m=null,_=typeof XRWebGLBinding<"u",g=new Cu,p={},M=t.getContextAttributes(),v=null,y=null,E=[],w=[],T=new ue,x=null,R=new Zt;R.viewport=new at;let I=new Zt;I.viewport=new at;let C=[R,I],D=new pc,B=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(he){let J=E[he];return J===void 0&&(J=new or,E[he]=J),J.getTargetRaySpace()},this.getControllerGrip=function(he){let J=E[he];return J===void 0&&(J=new or,E[he]=J),J.getGripSpace()},this.getHand=function(he){let J=E[he];return J===void 0&&(J=new or,E[he]=J),J.getHandSpace()};function O(he){let J=w.indexOf(he.inputSource);if(J===-1)return;let V=E[J];V!==void 0&&(V.update(he.inputSource,he.frame,l||o),V.dispatchEvent({type:he.type,data:he.inputSource}))}function q(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",H);for(let he=0;he<E.length;he++){let J=w[he];J!==null&&(w[he]=null,E[he].disconnect(J))}B=null,G=null,g.reset();for(let he in p)delete p[he];e.setRenderTarget(v),f=null,d=null,u=null,s=null,y=null,qe.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(he){r=he,n.isPresenting===!0&&Ge("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(he){a=he,n.isPresenting===!0&&Ge("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(he){l=he},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(he){if(s=he,s!==null){if(v=e.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",q),s.addEventListener("inputsourceschange",H),M.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(T),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let V=null,F=null,N=null;M.depth&&(N=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,V=M.stencil?$i:$n,F=M.stencil?vr:On);let W={colorFormat:t.RGBA8,depthFormat:N,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(W),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new un(d.textureWidth,d.textureHeight,{format:rn,type:sn,depthTexture:new Si(d.textureWidth,d.textureHeight,F,void 0,void 0,void 0,void 0,void 0,void 0,V),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let V={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,V),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new un(f.framebufferWidth,f.framebufferHeight,{format:rn,type:sn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),qe.setContext(s),qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function H(he){for(let J=0;J<he.removed.length;J++){let V=he.removed[J],F=w.indexOf(V);F>=0&&(w[F]=null,E[F].disconnect(V))}for(let J=0;J<he.added.length;J++){let V=he.added[J],F=w.indexOf(V);if(F===-1){for(let W=0;W<E.length;W++)if(W>=w.length){w.push(V),F=W;break}else if(w[W]===null){w[W]=V,F=W;break}if(F===-1)break}let N=E[F];N&&N.connect(V)}}let k=new U,ie=new U;function re(he,J,V){k.setFromMatrixPosition(J.matrixWorld),ie.setFromMatrixPosition(V.matrixWorld);let F=k.distanceTo(ie),N=J.projectionMatrix.elements,W=V.projectionMatrix.elements,ae=N[14]/(N[10]-1),fe=N[14]/(N[10]+1),P=(N[9]+1)/N[5],X=(N[9]-1)/N[5],z=(N[8]-1)/N[0],j=(W[8]+1)/W[0],ee=ae*z,ce=ae*j,me=F/(-z+j),ge=me*-z;if(J.matrixWorld.decompose(he.position,he.quaternion,he.scale),he.translateX(ge),he.translateZ(me),he.matrixWorld.compose(he.position,he.quaternion,he.scale),he.matrixWorldInverse.copy(he.matrixWorld).invert(),N[10]===-1)he.projectionMatrix.copy(J.projectionMatrix),he.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{let Y=ae+me,b=fe+me,Ie=ee-ge,De=ce+(F-ge),L=P*fe/b*Y,S=X*fe/b*Y;he.projectionMatrix.makePerspective(Ie,De,L,S,Y,b),he.projectionMatrixInverse.copy(he.projectionMatrix).invert()}}function xe(he,J){J===null?he.matrixWorld.copy(he.matrix):he.matrixWorld.multiplyMatrices(J.matrixWorld,he.matrix),he.matrixWorldInverse.copy(he.matrixWorld).invert()}this.updateCamera=function(he){if(s===null)return;let J=he.near,V=he.far;g.texture!==null&&(g.depthNear>0&&(J=g.depthNear),g.depthFar>0&&(V=g.depthFar)),D.near=I.near=R.near=J,D.far=I.far=R.far=V,(B!==D.near||G!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),B=D.near,G=D.far),D.layers.mask=he.layers.mask|6,R.layers.mask=D.layers.mask&-5,I.layers.mask=D.layers.mask&-3;let F=he.parent,N=D.cameras;xe(D,F);for(let W=0;W<N.length;W++)xe(N[W],F);N.length===2?re(D,R,I):D.projectionMatrix.copy(R.projectionMatrix),ye(he,D,F)};function ye(he,J,V){V===null?he.matrix.copy(J.matrixWorld):(he.matrix.copy(V.matrixWorld),he.matrix.invert(),he.matrix.multiply(J.matrixWorld)),he.matrix.decompose(he.position,he.quaternion,he.scale),he.updateMatrixWorld(!0),he.projectionMatrix.copy(J.projectionMatrix),he.projectionMatrixInverse.copy(J.projectionMatrixInverse),he.isPerspectiveCamera&&(he.fov=ir*2*Math.atan(1/he.projectionMatrix.elements[5]),he.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(he){c=he,d!==null&&(d.fixedFoveation=he),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=he)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(D)},this.getCameraTexture=function(he){return p[he]};let Ue=null;function Je(he,J){if(h=J.getViewerPose(l||o),m=J,h!==null){let V=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let F=!1;V.length!==D.cameras.length&&(D.cameras.length=0,F=!0);for(let fe=0;fe<V.length;fe++){let P=V[fe],X=null;if(f!==null)X=f.getViewport(P);else{let j=u.getViewSubImage(d,P);X=j.viewport,fe===0&&(e.setRenderTargetTextures(y,j.colorTexture,j.depthStencilTexture),e.setRenderTarget(y))}let z=C[fe];z===void 0&&(z=new Zt,z.layers.enable(fe),z.viewport=new at,C[fe]=z),z.matrix.fromArray(P.transform.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale),z.projectionMatrix.fromArray(P.projectionMatrix),z.projectionMatrixInverse.copy(z.projectionMatrix).invert(),z.viewport.set(X.x,X.y,X.width,X.height),fe===0&&(D.matrix.copy(z.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),F===!0&&D.cameras.push(z)}let N=s.enabledFeatures;if(N&&N.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=n.getBinding();let fe=u.getDepthInformation(V[0]);fe&&fe.isValid&&fe.texture&&g.init(fe,s.renderState)}if(N&&N.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let fe=0;fe<V.length;fe++){let P=V[fe].camera;if(P){let X=p[P];X||(X=new mo,p[P]=X);let z=u.getCameraImage(P);X.sourceTexture=z}}}}for(let V=0;V<E.length;V++){let F=w[V],N=E[V];F!==null&&N!==void 0&&N.update(F,J,l||o)}Ue&&Ue(he,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),m=null}let qe=new Gp;qe.setAnimationLoop(Je),this.setAnimationLoop=function(he){Ue=he},this.dispose=function(){}}},y1=new tt,Jp=new We;Jp.set(-1,0,0,0,1,0,0,0,1);function v1(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,au(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,M,v,y){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,y)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,M,v):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Kt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Kt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let M=e.get(p),v=M.envMap,y=M.envMapRotation;v&&(g.envMap.value=v,g.envMapRotation.value.setFromMatrix4(y1.makeRotationFromEuler(y)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Jp),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,M,v){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*M,g.scale.value=v*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,M){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Kt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){let M=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function M1(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,E){let w=E.program;n.uniformBlockBinding(y,w)}function l(y,E){let w=s[y.id];w===void 0&&(g(y),w=h(y),s[y.id]=w,y.addEventListener("dispose",M));let T=E.program;n.updateUBOMapping(y,T);let x=e.render.frame;r[y.id]!==x&&(d(y),r[y.id]=x)}function h(y){let E=u();y.__bindingPointIndex=E;let w=i.createBuffer(),T=y.__size,x=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,T,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,w),w}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return Ze("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){let E=s[y.id],w=y.uniforms,T=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let x=0,R=w.length;x<R;x++){let I=w[x];if(Array.isArray(I))for(let C=0,D=I.length;C<D;C++)f(I[C],x,C,T);else f(I,x,0,T)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,E,w,T){if(_(y,E,w,T)===!0){let x=y.__offset,R=y.value;if(Array.isArray(R)){let I=0;for(let C=0;C<R.length;C++){let D=R[C],B=p(D);m(D,y.__data,I),typeof D!="number"&&typeof D!="boolean"&&!D.isMatrix3&&!ArrayBuffer.isView(D)&&(I+=B.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(R,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,y.__data)}}function m(y,E,w){typeof y=="number"||typeof y=="boolean"?E[0]=y:y.isMatrix3?(E[0]=y.elements[0],E[1]=y.elements[1],E[2]=y.elements[2],E[3]=0,E[4]=y.elements[3],E[5]=y.elements[4],E[6]=y.elements[5],E[7]=0,E[8]=y.elements[6],E[9]=y.elements[7],E[10]=y.elements[8],E[11]=0):ArrayBuffer.isView(y)?E.set(new y.constructor(y.buffer,y.byteOffset,E.length)):y.toArray(E,w)}function _(y,E,w,T){let x=y.value,R=E+"_"+w;if(T[R]===void 0)return typeof x=="number"||typeof x=="boolean"?T[R]=x:ArrayBuffer.isView(x)?T[R]=x.slice():T[R]=x.clone(),!0;{let I=T[R];if(typeof x=="number"||typeof x=="boolean"){if(I!==x)return T[R]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(I.equals(x)===!1)return I.copy(x),!0}}return!1}function g(y){let E=y.uniforms,w=0,T=16;for(let R=0,I=E.length;R<I;R++){let C=Array.isArray(E[R])?E[R]:[E[R]];for(let D=0,B=C.length;D<B;D++){let G=C[D],O=Array.isArray(G.value)?G.value:[G.value];for(let q=0,H=O.length;q<H;q++){let k=O[q],ie=p(k),re=w%T,xe=re%ie.boundary,ye=re+xe;w+=xe,ye!==0&&T-ye<ie.storage&&(w+=T-ye),G.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=w,w+=ie.storage}}}let x=w%T;return x>0&&(w+=T-x),y.__size=w,y.__cache={},this}function p(y){let E={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(E.boundary=4,E.storage=4):y.isVector2?(E.boundary=8,E.storage=8):y.isVector3||y.isColor?(E.boundary=16,E.storage=12):y.isVector4?(E.boundary=16,E.storage=16):y.isMatrix3?(E.boundary=48,E.storage=48):y.isMatrix4?(E.boundary=64,E.storage=64):y.isTexture?Ge("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(E.boundary=16,E.storage=y.byteLength):Ge("WebGLRenderer: Unsupported uniform value type.",y),E}function M(y){let E=y.target;E.removeEventListener("dispose",M);let w=o.indexOf(E.__bindingPointIndex);o.splice(w,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function v(){for(let y in s)i.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:c,update:l,dispose:v}}var S1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),si=null;function b1(){return si===null&&(si=new fo(S1,16,16,Ki,ii),si.name="DFG_LUT",si.minFilter=bt,si.magFilter=bt,si.wrapS=nn,si.wrapT=nn,si.generateMipmaps=!1,si.needsUpdate=!0),si}var Er=class{constructor(e={}){let{canvas:t=hp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=sn}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;let _=f,g=new Set([wc,Ec,bc]),p=new Set([sn,On,yr,vr,vc,Mc]),M=new Uint32Array(4),v=new Int32Array(4),y=new U,E=null,w=null,T=[],x=[],R=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Un,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,C=!1,D=null,B=null,G=null,O=null;this._outputColorSpace=xt;let q=0,H=0,k=null,ie=-1,re=null,xe=new at,ye=new at,Ue=null,Je=new ze(0),qe=0,he=t.width,J=t.height,V=1,F=null,N=null,W=new at(0,0,he,J),ae=new at(0,0,he,J),fe=!1,P=new hr,X=!1,z=!1,j=new tt,ee=new U,ce=new at,me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ge=!1;function Y(){return k===null?V:1}let b=n;function Ie(A,K){return t.getContext(A,K)}try{let A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"185"}`),t.addEventListener("webglcontextlost",Tt,!1),t.addEventListener("webglcontextrestored",yt,!1),t.addEventListener("webglcontextcreationerror",Wn,!1),b===null){let K="webgl2";if(b=Ie(K,A),b===null)throw Ie(K)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(A){throw Ze("WebGLRenderer: "+A.message),A}let De,L,S,$,Q,oe,ve,Me,le,de,Se,Fe,Te,Ee,Xe,Ye,Ke,Z,we,pe,Ae,Pe,_e;function ke(){De=new Iy(b),De.init(),Ae=new g1(b,De),L=new Sy(b,De,e,Ae),S=new p1(b,De),L.reversedDepthBuffer&&d&&S.buffers.depth.setReversed(!0),B=b.createFramebuffer(),G=b.createFramebuffer(),O=b.createFramebuffer(),$=new Ny(b),Q=new e1,oe=new m1(b,De,S,Q,L,Ae,$),ve=new Cy(I),Me=new F0(b),Pe=new vy(b,Me),le=new Py(b,Me,$,Pe),de=new Uy(b,le,Me,Pe,$),Z=new Dy(b,L,oe),Xe=new by(Q),Se=new Qv(I,ve,De,L,Pe,Xe),Fe=new v1(I,Q),Te=new n1,Ee=new c1(De),Ke=new yy(I,ve,S,de,m,c),Ye=new f1(I,de,L),_e=new M1(b,$,L,S),we=new My(b,De,$),pe=new Ly(b,De,$),$.programs=Se.programs,I.capabilities=L,I.extensions=De,I.properties=Q,I.renderLists=Te,I.shadowMap=Ye,I.state=S,I.info=$}ke(),_!==sn&&(R=new Fy(_,t.width,t.height,a,s,r));let Oe=new Iu(I,b);this.xr=Oe,this.getContext=function(){return b},this.getContextAttributes=function(){return b.getContextAttributes()},this.forceContextLoss=function(){let A=De.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=De.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(A){A!==void 0&&(V=A,this.setSize(he,J,!1))},this.getSize=function(A){return A.set(he,J)},this.setSize=function(A,K,se=!0){if(Oe.isPresenting){Ge("WebGLRenderer: Can't change size while VR device is presenting.");return}he=A,J=K,t.width=Math.floor(A*V),t.height=Math.floor(K*V),se===!0&&(t.style.width=A+"px",t.style.height=K+"px"),R!==null&&R.setSize(t.width,t.height),this.setViewport(0,0,A,K)},this.getDrawingBufferSize=function(A){return A.set(he*V,J*V).floor()},this.setDrawingBufferSize=function(A,K,se){he=A,J=K,V=se,t.width=Math.floor(A*se),t.height=Math.floor(K*se),this.setViewport(0,0,A,K)},this.setEffects=function(A){if(_===sn){Ze("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let K=0;K<A.length;K++)if(A[K].isOutputPass===!0){Ge("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(xe)},this.getViewport=function(A){return A.copy(W)},this.setViewport=function(A,K,se,te){A.isVector4?W.set(A.x,A.y,A.z,A.w):W.set(A,K,se,te),S.viewport(xe.copy(W).multiplyScalar(V).round())},this.getScissor=function(A){return A.copy(ae)},this.setScissor=function(A,K,se,te){A.isVector4?ae.set(A.x,A.y,A.z,A.w):ae.set(A,K,se,te),S.scissor(ye.copy(ae).multiplyScalar(V).round())},this.getScissorTest=function(){return fe},this.setScissorTest=function(A){S.setScissorTest(fe=A)},this.setOpaqueSort=function(A){F=A},this.setTransparentSort=function(A){N=A},this.getClearColor=function(A){return A.copy(Ke.getClearColor())},this.setClearColor=function(){Ke.setClearColor(...arguments)},this.getClearAlpha=function(){return Ke.getClearAlpha()},this.setClearAlpha=function(){Ke.setClearAlpha(...arguments)},this.clear=function(A=!0,K=!0,se=!0){let te=0;if(A){let ne=!1;if(k!==null){let Ce=k.texture.format;ne=g.has(Ce)}if(ne){let Ce=k.texture.type,Ne=p.has(Ce),Re=Ke.getClearColor(),Be=Ke.getClearAlpha(),Ve=Re.r,je=Re.g,et=Re.b;Ne?(M[0]=Ve,M[1]=je,M[2]=et,M[3]=Be,b.clearBufferuiv(b.COLOR,0,M)):(v[0]=Ve,v[1]=je,v[2]=et,v[3]=Be,b.clearBufferiv(b.COLOR,0,v))}else te|=b.COLOR_BUFFER_BIT}K&&(te|=b.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),se&&(te|=b.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),te!==0&&b.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),D=A},this.dispose=function(){t.removeEventListener("webglcontextlost",Tt,!1),t.removeEventListener("webglcontextrestored",yt,!1),t.removeEventListener("webglcontextcreationerror",Wn,!1),Ke.dispose(),Te.dispose(),Ee.dispose(),Q.dispose(),ve.dispose(),de.dispose(),Pe.dispose(),_e.dispose(),Se.dispose(),Oe.dispose(),Oe.removeEventListener("sessionstart",Fd),Oe.removeEventListener("sessionend",Bd),os.stop()};function Tt(A){A.preventDefault(),ro("WebGLRenderer: Context Lost."),C=!0}function yt(){ro("WebGLRenderer: Context Restored."),C=!1;let A=$.autoReset,K=Ye.enabled,se=Ye.autoUpdate,te=Ye.needsUpdate,ne=Ye.type;ke(),$.autoReset=A,Ye.enabled=K,Ye.autoUpdate=se,Ye.needsUpdate=te,Ye.type=ne}function Wn(A){Ze("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Xn(A){let K=A.target;K.removeEventListener("dispose",Xn),ag(K)}function ag(A){cg(A),Q.remove(A)}function cg(A){let K=Q.get(A).programs;K!==void 0&&(K.forEach(function(se){Se.releaseProgram(se)}),A.isShaderMaterial&&Se.releaseShaderCache(A))}this.renderBufferDirect=function(A,K,se,te,ne,Ce){K===null&&(K=me);let Ne=ne.isMesh&&ne.matrixWorld.determinantAffine()<0,Re=ug(A,K,se,te,ne);S.setMaterial(te,Ne);let Be=se.index,Ve=1;if(te.wireframe===!0){if(Be=le.getWireframeAttribute(se),Be===void 0)return;Ve=2}let je=se.drawRange,et=se.attributes.position,He=je.start*Ve,ft=(je.start+je.count)*Ve;Ce!==null&&(He=Math.max(He,Ce.start*Ve),ft=Math.min(ft,(Ce.start+Ce.count)*Ve)),Be!==null?(He=Math.max(He,0),ft=Math.min(ft,Be.count)):et!=null&&(He=Math.max(He,0),ft=Math.min(ft,et.count));let Ct=ft-He;if(Ct<0||Ct===1/0)return;Pe.setup(ne,te,Re,se,Be);let At,mt=we;if(Be!==null&&(At=Me.get(Be),mt=pe,mt.setIndex(At)),ne.isMesh)te.wireframe===!0?(S.setLineWidth(te.wireframeLinewidth*Y()),mt.setMode(b.LINES)):mt.setMode(b.TRIANGLES);else if(ne.isLine){let Gt=te.linewidth;Gt===void 0&&(Gt=1),S.setLineWidth(Gt*Y()),ne.isLineSegments?mt.setMode(b.LINES):ne.isLineLoop?mt.setMode(b.LINE_LOOP):mt.setMode(b.LINE_STRIP)}else ne.isPoints?mt.setMode(b.POINTS):ne.isSprite&&mt.setMode(b.TRIANGLES);if(ne.isBatchedMesh)if(De.get("WEBGL_multi_draw"))mt.renderMultiDraw(ne._multiDrawStarts,ne._multiDrawCounts,ne._multiDrawCount);else{let Gt=ne._multiDrawStarts,Le=ne._multiDrawCounts,an=ne._multiDrawCount,ot=Be?Me.get(Be).bytesPerElement:1,vn=Q.get(te).currentProgram.getUniforms();for(let qn=0;qn<an;qn++)vn.setValue(b,"_gl_DrawID",qn),mt.render(Gt[qn]/ot,Le[qn])}else if(ne.isInstancedMesh)mt.renderInstances(He,Ct,ne.count);else if(se.isInstancedBufferGeometry){let Gt=se._maxInstanceCount!==void 0?se._maxInstanceCount:1/0,Le=Math.min(se.instanceCount,Gt);mt.renderInstances(He,Ct,Le)}else mt.render(He,Ct)};function Od(A,K,se){A.transparent===!0&&A.side===jt&&A.forceSinglePass===!1?(A.side=Kt,A.needsUpdate=!0,ia(A,K,se),A.side=yi,A.needsUpdate=!0,ia(A,K,se),A.side=jt):ia(A,K,se)}this.compile=function(A,K,se=null){se===null&&(se=A),w=Ee.get(se),w.init(K),x.push(w),se.traverseVisible(function(ne){ne.isLight&&ne.layers.test(K.layers)&&(w.pushLight(ne),ne.castShadow&&w.pushShadow(ne))}),A!==se&&A.traverseVisible(function(ne){ne.isLight&&ne.layers.test(K.layers)&&(w.pushLight(ne),ne.castShadow&&w.pushShadow(ne))}),w.setupLights();let te=new Set;return A.traverse(function(ne){if(!(ne.isMesh||ne.isPoints||ne.isLine||ne.isSprite))return;let Ce=ne.material;if(Ce)if(Array.isArray(Ce))for(let Ne=0;Ne<Ce.length;Ne++){let Re=Ce[Ne];Od(Re,se,ne),te.add(Re)}else Od(Ce,se,ne),te.add(Ce)}),w=x.pop(),te},this.compileAsync=function(A,K,se=null){let te=this.compile(A,K,se);return new Promise(ne=>{function Ce(){if(te.forEach(function(Ne){Q.get(Ne).currentProgram.isReady()&&te.delete(Ne)}),te.size===0){ne(A);return}setTimeout(Ce,10)}De.get("KHR_parallel_shader_compile")!==null?Ce():setTimeout(Ce,10)})};let Yl=null;function lg(A){Yl&&Yl(A)}function Fd(){os.stop()}function Bd(){os.start()}let os=new Gp;os.setAnimationLoop(lg),typeof self<"u"&&os.setContext(self),this.setAnimationLoop=function(A){Yl=A,Oe.setAnimationLoop(A),A===null?os.stop():os.start()},Oe.addEventListener("sessionstart",Fd),Oe.addEventListener("sessionend",Bd),this.render=function(A,K){if(K!==void 0&&K.isCamera!==!0){Ze("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;D!==null&&D.renderStart(A,K);let se=Oe.enabled===!0&&Oe.isPresenting===!0,te=R!==null&&(k===null||se)&&R.begin(I,k);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),Oe.enabled===!0&&Oe.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(Oe.cameraAutoUpdate===!0&&Oe.updateCamera(K),K=Oe.getCamera()),A.isScene===!0&&A.onBeforeRender(I,A,K,k),w=Ee.get(A,x.length),w.init(K),w.state.textureUnits=oe.getTextureUnits(),x.push(w),j.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),P.setFromProjectionMatrix(j,Pn,K.reversedDepth),z=this.localClippingEnabled,X=Xe.init(this.clippingPlanes,z),E=Te.get(A,T.length),E.init(),T.push(E),Oe.enabled===!0&&Oe.isPresenting===!0){let Ne=I.xr.getDepthSensingMesh();Ne!==null&&Jl(Ne,K,-1/0,I.sortObjects)}Jl(A,K,0,I.sortObjects),E.finish(),I.sortObjects===!0&&E.sort(F,N,K.reversedDepth),ge=Oe.enabled===!1||Oe.isPresenting===!1||Oe.hasDepthSensing()===!1,ge&&Ke.addToRenderList(E,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),X===!0&&Xe.beginShadows();let ne=w.state.shadowsArray;if(Ye.render(ne,A,K),X===!0&&Xe.endShadows(),(te&&R.hasRenderPass())===!1){let Ne=E.opaque,Re=E.transmissive;if(w.setupLights(),K.isArrayCamera){let Be=K.cameras;if(Re.length>0)for(let Ve=0,je=Be.length;Ve<je;Ve++){let et=Be[Ve];kd(Ne,Re,A,et)}ge&&Ke.render(A);for(let Ve=0,je=Be.length;Ve<je;Ve++){let et=Be[Ve];zd(E,A,et,et.viewport)}}else Re.length>0&&kd(Ne,Re,A,K),ge&&Ke.render(A),zd(E,A,K)}k!==null&&H===0&&(oe.updateMultisampleRenderTarget(k),oe.updateRenderTargetMipmap(k)),te&&R.end(I),A.isScene===!0&&A.onAfterRender(I,A,K),Pe.resetDefaultState(),ie=-1,re=null,x.pop(),x.length>0?(w=x[x.length-1],oe.setTextureUnits(w.state.textureUnits),X===!0&&Xe.setGlobalState(I.clippingPlanes,w.state.camera)):w=null,T.pop(),T.length>0?E=T[T.length-1]:E=null,D!==null&&D.renderEnd()};function Jl(A,K,se,te){if(A.visible===!1)return;if(A.layers.test(K.layers)){if(A.isGroup)se=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(K);else if(A.isLightProbeGrid)w.pushLightProbeGrid(A);else if(A.isLight)w.pushLight(A),A.castShadow&&w.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||P.intersectsSprite(A)){te&&ce.setFromMatrixPosition(A.matrixWorld).applyMatrix4(j);let Ne=de.update(A),Re=A.material;Re.visible&&E.push(A,Ne,Re,se,ce.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||P.intersectsObject(A))){let Ne=de.update(A),Re=A.material;if(te&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),ce.copy(A.boundingSphere.center)):(Ne.boundingSphere===null&&Ne.computeBoundingSphere(),ce.copy(Ne.boundingSphere.center)),ce.applyMatrix4(A.matrixWorld).applyMatrix4(j)),Array.isArray(Re)){let Be=Ne.groups;for(let Ve=0,je=Be.length;Ve<je;Ve++){let et=Be[Ve],He=Re[et.materialIndex];He&&He.visible&&E.push(A,Ne,He,se,ce.z,et)}}else Re.visible&&E.push(A,Ne,Re,se,ce.z,null)}}let Ce=A.children;for(let Ne=0,Re=Ce.length;Ne<Re;Ne++)Jl(Ce[Ne],K,se,te)}function zd(A,K,se,te){let{opaque:ne,transmissive:Ce,transparent:Ne}=A;w.setupLightsView(se),X===!0&&Xe.setGlobalState(I.clippingPlanes,se),te&&S.viewport(xe.copy(te)),ne.length>0&&na(ne,K,se),Ce.length>0&&na(Ce,K,se),Ne.length>0&&na(Ne,K,se),S.buffers.depth.setTest(!0),S.buffers.depth.setMask(!0),S.buffers.color.setMask(!0),S.setPolygonOffset(!1)}function kd(A,K,se,te){if((se.isScene===!0?se.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[te.id]===void 0){let He=De.has("EXT_color_buffer_half_float")||De.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[te.id]=new un(1,1,{generateMipmaps:!0,type:He?ii:sn,minFilter:ni,samples:Math.max(4,L.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:it.workingColorSpace})}let Ce=w.state.transmissionRenderTarget[te.id],Ne=te.viewport||xe;Ce.setSize(Ne.z*I.transmissionResolutionScale,Ne.w*I.transmissionResolutionScale);let Re=I.getRenderTarget(),Be=I.getActiveCubeFace(),Ve=I.getActiveMipmapLevel();I.setRenderTarget(Ce),I.getClearColor(Je),qe=I.getClearAlpha(),qe<1&&I.setClearColor(16777215,.5),I.clear(),ge&&Ke.render(se);let je=I.toneMapping;I.toneMapping=Un;let et=te.viewport;if(te.viewport!==void 0&&(te.viewport=void 0),w.setupLightsView(te),X===!0&&Xe.setGlobalState(I.clippingPlanes,te),na(A,se,te),oe.updateMultisampleRenderTarget(Ce),oe.updateRenderTargetMipmap(Ce),De.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let ft=0,Ct=K.length;ft<Ct;ft++){let At=K[ft],{object:mt,geometry:Gt,material:Le,group:an}=At;if(Le.side===jt&&mt.layers.test(te.layers)){let ot=Le.side;Le.side=Kt,Le.needsUpdate=!0,Vd(mt,se,te,Gt,Le,an),Le.side=ot,Le.needsUpdate=!0,He=!0}}He===!0&&(oe.updateMultisampleRenderTarget(Ce),oe.updateRenderTargetMipmap(Ce))}I.setRenderTarget(Re,Be,Ve),I.setClearColor(Je,qe),et!==void 0&&(te.viewport=et),I.toneMapping=je}function na(A,K,se){let te=K.isScene===!0?K.overrideMaterial:null;for(let ne=0,Ce=A.length;ne<Ce;ne++){let Ne=A[ne],{object:Re,geometry:Be,group:Ve}=Ne,je=Ne.material;je.allowOverride===!0&&te!==null&&(je=te),Re.layers.test(se.layers)&&Vd(Re,K,se,Be,je,Ve)}}function Vd(A,K,se,te,ne,Ce){A.onBeforeRender(I,K,se,te,ne,Ce),A.modelViewMatrix.multiplyMatrices(se.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),ne.onBeforeRender(I,K,se,te,A,Ce),ne.transparent===!0&&ne.side===jt&&ne.forceSinglePass===!1?(ne.side=Kt,ne.needsUpdate=!0,I.renderBufferDirect(se,K,te,ne,A,Ce),ne.side=yi,ne.needsUpdate=!0,I.renderBufferDirect(se,K,te,ne,A,Ce),ne.side=jt):I.renderBufferDirect(se,K,te,ne,A,Ce),A.onAfterRender(I,K,se,te,ne,Ce)}function ia(A,K,se){K.isScene!==!0&&(K=me);let te=Q.get(A),ne=w.state.lights,Ce=w.state.shadowsArray,Ne=ne.state.version,Re=Se.getParameters(A,ne.state,Ce,K,se,w.state.lightProbeGridArray),Be=Se.getProgramCacheKey(Re),Ve=te.programs;te.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?K.environment:null,te.fog=K.fog;let je=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;te.envMap=ve.get(A.envMap||te.environment,je),te.envMapRotation=te.environment!==null&&A.envMap===null?K.environmentRotation:A.envMapRotation,Ve===void 0&&(A.addEventListener("dispose",Xn),Ve=new Map,te.programs=Ve);let et=Ve.get(Be);if(et!==void 0){if(te.currentProgram===et&&te.lightsStateVersion===Ne)return Gd(A,Re),et}else Re.uniforms=Se.getUniforms(A),D!==null&&A.isNodeMaterial&&D.build(A,se,Re),A.onBeforeCompile(Re,I),et=Se.acquireProgram(Re,Be),Ve.set(Be,et),te.uniforms=Re.uniforms;let He=te.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(He.clippingPlanes=Xe.uniform),Gd(A,Re),te.needsLights=fg(A),te.lightsStateVersion=Ne,te.needsLights&&(He.ambientLightColor.value=ne.state.ambient,He.lightProbe.value=ne.state.probe,He.directionalLights.value=ne.state.directional,He.directionalLightShadows.value=ne.state.directionalShadow,He.spotLights.value=ne.state.spot,He.spotLightShadows.value=ne.state.spotShadow,He.rectAreaLights.value=ne.state.rectArea,He.ltc_1.value=ne.state.rectAreaLTC1,He.ltc_2.value=ne.state.rectAreaLTC2,He.pointLights.value=ne.state.point,He.pointLightShadows.value=ne.state.pointShadow,He.hemisphereLights.value=ne.state.hemi,He.directionalShadowMatrix.value=ne.state.directionalShadowMatrix,He.spotLightMatrix.value=ne.state.spotLightMatrix,He.spotLightMap.value=ne.state.spotLightMap,He.pointShadowMatrix.value=ne.state.pointShadowMatrix),te.lightProbeGrid=w.state.lightProbeGridArray.length>0,te.currentProgram=et,te.uniformsList=null,et}function Hd(A){if(A.uniformsList===null){let K=A.currentProgram.getUniforms();A.uniformsList=br.seqWithValue(K.seq,A.uniforms)}return A.uniformsList}function Gd(A,K){let se=Q.get(A);se.outputColorSpace=K.outputColorSpace,se.batching=K.batching,se.batchingColor=K.batchingColor,se.instancing=K.instancing,se.instancingColor=K.instancingColor,se.instancingMorph=K.instancingMorph,se.skinning=K.skinning,se.morphTargets=K.morphTargets,se.morphNormals=K.morphNormals,se.morphColors=K.morphColors,se.morphTargetsCount=K.morphTargetsCount,se.numClippingPlanes=K.numClippingPlanes,se.numIntersection=K.numClipIntersection,se.vertexAlphas=K.vertexAlphas,se.vertexTangents=K.vertexTangents,se.toneMapping=K.toneMapping}function hg(A,K){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;y.setFromMatrixPosition(K.matrixWorld);for(let se=0,te=A.length;se<te;se++){let ne=A[se];if(ne.texture!==null&&ne.boundingBox.containsPoint(y))return ne}return null}function ug(A,K,se,te,ne){K.isScene!==!0&&(K=me),oe.resetTextureUnits();let Ce=K.fog,Ne=te.isMeshStandardMaterial||te.isMeshLambertMaterial||te.isMeshPhongMaterial?K.environment:null,Re=k===null?I.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:it.workingColorSpace,Be=te.isMeshStandardMaterial||te.isMeshLambertMaterial&&!te.envMap||te.isMeshPhongMaterial&&!te.envMap,Ve=ve.get(te.envMap||Ne,Be),je=te.vertexColors===!0&&!!se.attributes.color&&se.attributes.color.itemSize===4,et=!!se.attributes.tangent&&(!!te.normalMap||te.anisotropy>0),He=!!se.morphAttributes.position,ft=!!se.morphAttributes.normal,Ct=!!se.morphAttributes.color,At=Un;te.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(At=I.toneMapping);let mt=se.morphAttributes.position||se.morphAttributes.normal||se.morphAttributes.color,Gt=mt!==void 0?mt.length:0,Le=Q.get(te),an=w.state.lights;if(X===!0&&(z===!0||A!==re)){let vt=A===re&&te.id===ie;Xe.setState(te,A,vt)}let ot=!1;te.version===Le.__version?(Le.needsLights&&Le.lightsStateVersion!==an.state.version||Le.outputColorSpace!==Re||ne.isBatchedMesh&&Le.batching===!1||!ne.isBatchedMesh&&Le.batching===!0||ne.isBatchedMesh&&Le.batchingColor===!0&&ne.colorTexture===null||ne.isBatchedMesh&&Le.batchingColor===!1&&ne.colorTexture!==null||ne.isInstancedMesh&&Le.instancing===!1||!ne.isInstancedMesh&&Le.instancing===!0||ne.isSkinnedMesh&&Le.skinning===!1||!ne.isSkinnedMesh&&Le.skinning===!0||ne.isInstancedMesh&&Le.instancingColor===!0&&ne.instanceColor===null||ne.isInstancedMesh&&Le.instancingColor===!1&&ne.instanceColor!==null||ne.isInstancedMesh&&Le.instancingMorph===!0&&ne.morphTexture===null||ne.isInstancedMesh&&Le.instancingMorph===!1&&ne.morphTexture!==null||Le.envMap!==Ve||te.fog===!0&&Le.fog!==Ce||Le.numClippingPlanes!==void 0&&(Le.numClippingPlanes!==Xe.numPlanes||Le.numIntersection!==Xe.numIntersection)||Le.vertexAlphas!==je||Le.vertexTangents!==et||Le.morphTargets!==He||Le.morphNormals!==ft||Le.morphColors!==Ct||Le.toneMapping!==At||Le.morphTargetsCount!==Gt||!!Le.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(ot=!0):(ot=!0,Le.__version=te.version);let vn=Le.currentProgram;ot===!0&&(vn=ia(te,K,ne),D&&te.isNodeMaterial&&D.onUpdateProgram(te,vn,Le));let qn=!1,Pi=!1,Ls=!1,gt=vn.getUniforms(),It=Le.uniforms;if(S.useProgram(vn.program)&&(qn=!0,Pi=!0,Ls=!0),te.id!==ie&&(ie=te.id,Pi=!0),Le.needsLights){let vt=hg(w.state.lightProbeGridArray,ne);Le.lightProbeGrid!==vt&&(Le.lightProbeGrid=vt,Pi=!0)}if(qn||re!==A){S.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),gt.setValue(b,"projectionMatrix",A.projectionMatrix),gt.setValue(b,"viewMatrix",A.matrixWorldInverse);let Ni=gt.map.cameraPosition;Ni!==void 0&&Ni.setValue(b,ee.setFromMatrixPosition(A.matrixWorld)),L.logarithmicDepthBuffer&&gt.setValue(b,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(te.isMeshPhongMaterial||te.isMeshToonMaterial||te.isMeshLambertMaterial||te.isMeshBasicMaterial||te.isMeshStandardMaterial||te.isShaderMaterial)&&gt.setValue(b,"isOrthographic",A.isOrthographicCamera===!0),re!==A&&(re=A,Pi=!0,Ls=!0)}if(Le.needsLights&&(an.state.directionalShadowMap.length>0&&gt.setValue(b,"directionalShadowMap",an.state.directionalShadowMap,oe),an.state.spotShadowMap.length>0&&gt.setValue(b,"spotShadowMap",an.state.spotShadowMap,oe),an.state.pointShadowMap.length>0&&gt.setValue(b,"pointShadowMap",an.state.pointShadowMap,oe)),ne.isSkinnedMesh){gt.setOptional(b,ne,"bindMatrix"),gt.setOptional(b,ne,"bindMatrixInverse");let vt=ne.skeleton;vt&&(vt.boneTexture===null&&vt.computeBoneTexture(),gt.setValue(b,"boneTexture",vt.boneTexture,oe))}ne.isBatchedMesh&&(gt.setOptional(b,ne,"batchingTexture"),gt.setValue(b,"batchingTexture",ne._matricesTexture,oe),gt.setOptional(b,ne,"batchingIdTexture"),gt.setValue(b,"batchingIdTexture",ne._indirectTexture,oe),gt.setOptional(b,ne,"batchingColorTexture"),ne._colorsTexture!==null&&gt.setValue(b,"batchingColorTexture",ne._colorsTexture,oe));let Li=se.morphAttributes;if((Li.position!==void 0||Li.normal!==void 0||Li.color!==void 0)&&Z.update(ne,se,vn),(Pi||Le.receiveShadow!==ne.receiveShadow)&&(Le.receiveShadow=ne.receiveShadow,gt.setValue(b,"receiveShadow",ne.receiveShadow)),(te.isMeshStandardMaterial||te.isMeshLambertMaterial||te.isMeshPhongMaterial)&&te.envMap===null&&K.environment!==null&&(It.envMapIntensity.value=K.environmentIntensity),It.dfgLUT!==void 0&&(It.dfgLUT.value=b1()),Pi){if(gt.setValue(b,"toneMappingExposure",I.toneMappingExposure),Le.needsLights&&dg(It,Ls),Ce&&te.fog===!0&&Fe.refreshFogUniforms(It,Ce),Fe.refreshMaterialUniforms(It,te,V,J,w.state.transmissionRenderTarget[A.id]),Le.needsLights&&Le.lightProbeGrid){let vt=Le.lightProbeGrid;It.probesSH.value=vt.texture,It.probesMin.value.copy(vt.boundingBox.min),It.probesMax.value.copy(vt.boundingBox.max),It.probesResolution.value.copy(vt.resolution)}br.upload(b,Hd(Le),It,oe)}if(te.isShaderMaterial&&te.uniformsNeedUpdate===!0&&(br.upload(b,Hd(Le),It,oe),te.uniformsNeedUpdate=!1),te.isSpriteMaterial&&gt.setValue(b,"center",ne.center),gt.setValue(b,"modelViewMatrix",ne.modelViewMatrix),gt.setValue(b,"normalMatrix",ne.normalMatrix),gt.setValue(b,"modelMatrix",ne.matrixWorld),te.uniformsGroups!==void 0){let vt=te.uniformsGroups;for(let Ni=0,Ns=vt.length;Ni<Ns;Ni++){let Wd=vt[Ni];_e.update(Wd,vn),_e.bind(Wd,vn)}}return vn}function dg(A,K){A.ambientLightColor.needsUpdate=K,A.lightProbe.needsUpdate=K,A.directionalLights.needsUpdate=K,A.directionalLightShadows.needsUpdate=K,A.pointLights.needsUpdate=K,A.pointLightShadows.needsUpdate=K,A.spotLights.needsUpdate=K,A.spotLightShadows.needsUpdate=K,A.rectAreaLights.needsUpdate=K,A.hemisphereLights.needsUpdate=K}function fg(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(A,K,se){let te=Q.get(A);te.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,te.__autoAllocateDepthBuffer===!1&&(te.__useRenderToTexture=!1),Q.get(A.texture).__webglTexture=K,Q.get(A.depthTexture).__webglTexture=te.__autoAllocateDepthBuffer?void 0:se,te.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,K){let se=Q.get(A);se.__webglFramebuffer=K,se.__useDefaultFramebuffer=K===void 0},this.setRenderTarget=function(A,K=0,se=0){k=A,q=K,H=se;let te=null,ne=!1,Ce=!1;if(A){let Re=Q.get(A);if(Re.__useDefaultFramebuffer!==void 0){S.bindFramebuffer(b.FRAMEBUFFER,Re.__webglFramebuffer),xe.copy(A.viewport),ye.copy(A.scissor),Ue=A.scissorTest,S.viewport(xe),S.scissor(ye),S.setScissorTest(Ue),ie=-1;return}else if(Re.__webglFramebuffer===void 0)oe.setupRenderTarget(A);else if(Re.__hasExternalTextures)oe.rebindTextures(A,Q.get(A.texture).__webglTexture,Q.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let je=A.depthTexture;if(Re.__boundDepthTexture!==je){if(je!==null&&Q.has(je)&&(A.width!==je.image.width||A.height!==je.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");oe.setupDepthRenderbuffer(A)}}let Be=A.texture;(Be.isData3DTexture||Be.isDataArrayTexture||Be.isCompressedArrayTexture)&&(Ce=!0);let Ve=Q.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ve[K])?te=Ve[K][se]:te=Ve[K],ne=!0):A.samples>0&&oe.useMultisampledRTT(A)===!1?te=Q.get(A).__webglMultisampledFramebuffer:Array.isArray(Ve)?te=Ve[se]:te=Ve,xe.copy(A.viewport),ye.copy(A.scissor),Ue=A.scissorTest}else xe.copy(W).multiplyScalar(V).floor(),ye.copy(ae).multiplyScalar(V).floor(),Ue=fe;if(se!==0&&(te=B),S.bindFramebuffer(b.FRAMEBUFFER,te)&&S.drawBuffers(A,te),S.viewport(xe),S.scissor(ye),S.setScissorTest(Ue),ne){let Re=Q.get(A.texture);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_CUBE_MAP_POSITIVE_X+K,Re.__webglTexture,se)}else if(Ce){let Re=K;for(let Be=0;Be<A.textures.length;Be++){let Ve=Q.get(A.textures[Be]);b.framebufferTextureLayer(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0+Be,Ve.__webglTexture,se,Re)}}else if(A!==null&&se!==0){let Re=Q.get(A.texture);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,Re.__webglTexture,se)}ie=-1},this.readRenderTargetPixels=function(A,K,se,te,ne,Ce,Ne,Re=0){if(!(A&&A.isWebGLRenderTarget)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Be=Q.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ne!==void 0&&(Be=Be[Ne]),Be){S.bindFramebuffer(b.FRAMEBUFFER,Be);try{let Ve=A.textures[Re],je=Ve.format,et=Ve.type;if(A.textures.length>1&&b.readBuffer(b.COLOR_ATTACHMENT0+Re),!L.textureFormatReadable(je)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!L.textureTypeReadable(et)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}K>=0&&K<=A.width-te&&se>=0&&se<=A.height-ne&&b.readPixels(K,se,te,ne,Ae.convert(je),Ae.convert(et),Ce)}finally{let Ve=k!==null?Q.get(k).__webglFramebuffer:null;S.bindFramebuffer(b.FRAMEBUFFER,Ve)}}},this.readRenderTargetPixelsAsync=async function(A,K,se,te,ne,Ce,Ne,Re=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Be=Q.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ne!==void 0&&(Be=Be[Ne]),Be)if(K>=0&&K<=A.width-te&&se>=0&&se<=A.height-ne){S.bindFramebuffer(b.FRAMEBUFFER,Be);let Ve=A.textures[Re],je=Ve.format,et=Ve.type;if(A.textures.length>1&&b.readBuffer(b.COLOR_ATTACHMENT0+Re),!L.textureFormatReadable(je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!L.textureTypeReadable(et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let He=b.createBuffer();b.bindBuffer(b.PIXEL_PACK_BUFFER,He),b.bufferData(b.PIXEL_PACK_BUFFER,Ce.byteLength,b.STREAM_READ),b.readPixels(K,se,te,ne,Ae.convert(je),Ae.convert(et),0);let ft=k!==null?Q.get(k).__webglFramebuffer:null;S.bindFramebuffer(b.FRAMEBUFFER,ft);let Ct=b.fenceSync(b.SYNC_GPU_COMMANDS_COMPLETE,0);return b.flush(),await dp(b,Ct,4),b.bindBuffer(b.PIXEL_PACK_BUFFER,He),b.getBufferSubData(b.PIXEL_PACK_BUFFER,0,Ce),b.deleteBuffer(He),b.deleteSync(Ct),Ce}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,K=null,se=0){let te=Math.pow(2,-se),ne=Math.floor(A.image.width*te),Ce=Math.floor(A.image.height*te),Ne=K!==null?K.x:0,Re=K!==null?K.y:0;oe.setTexture2D(A,0),b.copyTexSubImage2D(b.TEXTURE_2D,se,0,0,Ne,Re,ne,Ce),S.unbindTexture()},this.copyTextureToTexture=function(A,K,se=null,te=null,ne=0,Ce=0){let Ne,Re,Be,Ve,je,et,He,ft,Ct,At=A.isCompressedTexture?A.mipmaps[Ce]:A.image;if(se!==null)Ne=se.max.x-se.min.x,Re=se.max.y-se.min.y,Be=se.isBox3?se.max.z-se.min.z:1,Ve=se.min.x,je=se.min.y,et=se.isBox3?se.min.z:0;else{let It=Math.pow(2,-ne);Ne=Math.floor(At.width*It),Re=Math.floor(At.height*It),A.isDataArrayTexture?Be=At.depth:A.isData3DTexture?Be=Math.floor(At.depth*It):Be=1,Ve=0,je=0,et=0}te!==null?(He=te.x,ft=te.y,Ct=te.z):(He=0,ft=0,Ct=0);let mt=Ae.convert(K.format),Gt=Ae.convert(K.type),Le;K.isData3DTexture?(oe.setTexture3D(K,0),Le=b.TEXTURE_3D):K.isDataArrayTexture||K.isCompressedArrayTexture?(oe.setTexture2DArray(K,0),Le=b.TEXTURE_2D_ARRAY):(oe.setTexture2D(K,0),Le=b.TEXTURE_2D),S.activeTexture(b.TEXTURE0),S.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,K.flipY),S.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),S.pixelStorei(b.UNPACK_ALIGNMENT,K.unpackAlignment);let an=S.getParameter(b.UNPACK_ROW_LENGTH),ot=S.getParameter(b.UNPACK_IMAGE_HEIGHT),vn=S.getParameter(b.UNPACK_SKIP_PIXELS),qn=S.getParameter(b.UNPACK_SKIP_ROWS),Pi=S.getParameter(b.UNPACK_SKIP_IMAGES);S.pixelStorei(b.UNPACK_ROW_LENGTH,At.width),S.pixelStorei(b.UNPACK_IMAGE_HEIGHT,At.height),S.pixelStorei(b.UNPACK_SKIP_PIXELS,Ve),S.pixelStorei(b.UNPACK_SKIP_ROWS,je),S.pixelStorei(b.UNPACK_SKIP_IMAGES,et);let Ls=A.isDataArrayTexture||A.isData3DTexture,gt=K.isDataArrayTexture||K.isData3DTexture;if(A.isDepthTexture){let It=Q.get(A),Li=Q.get(K),vt=Q.get(It.__renderTarget),Ni=Q.get(Li.__renderTarget);S.bindFramebuffer(b.READ_FRAMEBUFFER,vt.__webglFramebuffer),S.bindFramebuffer(b.DRAW_FRAMEBUFFER,Ni.__webglFramebuffer);for(let Ns=0;Ns<Be;Ns++)Ls&&(b.framebufferTextureLayer(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,Q.get(A).__webglTexture,ne,et+Ns),b.framebufferTextureLayer(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,Q.get(K).__webglTexture,Ce,Ct+Ns)),b.blitFramebuffer(Ve,je,Ne,Re,He,ft,Ne,Re,b.DEPTH_BUFFER_BIT,b.NEAREST);S.bindFramebuffer(b.READ_FRAMEBUFFER,null),S.bindFramebuffer(b.DRAW_FRAMEBUFFER,null)}else if(ne!==0||A.isRenderTargetTexture||Q.has(A)){let It=Q.get(A),Li=Q.get(K);S.bindFramebuffer(b.READ_FRAMEBUFFER,G),S.bindFramebuffer(b.DRAW_FRAMEBUFFER,O);for(let vt=0;vt<Be;vt++)Ls?b.framebufferTextureLayer(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,It.__webglTexture,ne,et+vt):b.framebufferTexture2D(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,It.__webglTexture,ne),gt?b.framebufferTextureLayer(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,Li.__webglTexture,Ce,Ct+vt):b.framebufferTexture2D(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,Li.__webglTexture,Ce),ne!==0?b.blitFramebuffer(Ve,je,Ne,Re,He,ft,Ne,Re,b.COLOR_BUFFER_BIT,b.NEAREST):gt?b.copyTexSubImage3D(Le,Ce,He,ft,Ct+vt,Ve,je,Ne,Re):b.copyTexSubImage2D(Le,Ce,He,ft,Ve,je,Ne,Re);S.bindFramebuffer(b.READ_FRAMEBUFFER,null),S.bindFramebuffer(b.DRAW_FRAMEBUFFER,null)}else gt?A.isDataTexture||A.isData3DTexture?b.texSubImage3D(Le,Ce,He,ft,Ct,Ne,Re,Be,mt,Gt,At.data):K.isCompressedArrayTexture?b.compressedTexSubImage3D(Le,Ce,He,ft,Ct,Ne,Re,Be,mt,At.data):b.texSubImage3D(Le,Ce,He,ft,Ct,Ne,Re,Be,mt,Gt,At):A.isDataTexture?b.texSubImage2D(b.TEXTURE_2D,Ce,He,ft,Ne,Re,mt,Gt,At.data):A.isCompressedTexture?b.compressedTexSubImage2D(b.TEXTURE_2D,Ce,He,ft,At.width,At.height,mt,At.data):b.texSubImage2D(b.TEXTURE_2D,Ce,He,ft,Ne,Re,mt,Gt,At);S.pixelStorei(b.UNPACK_ROW_LENGTH,an),S.pixelStorei(b.UNPACK_IMAGE_HEIGHT,ot),S.pixelStorei(b.UNPACK_SKIP_PIXELS,vn),S.pixelStorei(b.UNPACK_SKIP_ROWS,qn),S.pixelStorei(b.UNPACK_SKIP_IMAGES,Pi),Ce===0&&K.generateMipmaps&&b.generateMipmap(Le),S.unbindTexture()},this.initRenderTarget=function(A){Q.get(A).__webglFramebuffer===void 0&&oe.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?oe.setTextureCube(A,0):A.isData3DTexture?oe.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?oe.setTexture2DArray(A,0):oe.setTexture2D(A,0),S.unbindTexture()},this.resetState=function(){q=0,H=0,k=null,S.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=it._getDrawingBufferColorSpace(e),t.unpackColorSpace=it._getUnpackColorSpace()}};var Zo=xt,ul=class i extends _s{constructor(e){super(e),this.defaultDPI=90,this.defaultUnit="px"}load(e,t,n,s){let r=this,o=new Co(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(e,function(a){try{t(r.parse(a))}catch(c){s?s(c):console.error(c),r.manager.itemError(e)}},n,s)}parse(e){let t=this;function n(V,F){if(V.nodeType!==1)return;V.hasAttribute("filter")&&console.warn("THREE.SVGLoader: Filters are not supported.");let N=E(V),W=!1,ae=null;switch(V.nodeName){case"svg":F=_(V,F);break;case"style":r(V);break;case"g":F=_(V,F);break;case"path":F=_(V,F),V.hasAttribute("d")&&(ae=s(V));break;case"rect":F=_(V,F),ae=c(V);break;case"polygon":F=_(V,F),ae=l(V);break;case"polyline":F=_(V,F),ae=h(V);break;case"circle":F=_(V,F),ae=u(V);break;case"ellipse":F=_(V,F),ae=d(V);break;case"line":F=_(V,F),ae=f(V);break;case"defs":W=!0;break;case"use":F=_(V,F);let X=(V.getAttributeNS("http://www.w3.org/1999/xlink","href")||"").substring(1),z=V.viewportElement.getElementById(X);z?n(z,F):console.warn("SVGLoader: 'use node' references non-existent node id: "+X);break;default:}if(ae){F.fill!==void 0&&F.fill!=="none"&&!F.fill.startsWith("url")&&ae.color.setStyle(F.fill,Zo),x(ae,qe),O.push(ae);let P=Object.assign({},F);P.strokeWidth=F.strokeWidth*B(qe),ae.userData={node:V,style:P,transform:qe.clone(),gradients:H}}let fe=V.childNodes;for(let P=0;P<fe.length;P++){let X=fe[P];W&&X.nodeName!=="style"&&X.nodeName!=="defs"||n(X,F)}N&&(k.pop(),k.length>0?qe.copy(k[k.length-1]):qe.identity())}function s(V){let F=new Dn,N=new ue,W=new ue,ae=new ue,fe=!0,P=!1,X=V.getAttribute("d");if(X===""||X==="none")return null;let z=X.match(/[a-df-z][^a-df-z]*/ig);for(let j=0,ee=z.length;j<ee;j++){let ce=z[j],me=ce.charAt(0),ge=ce.slice(1).trim();fe===!0&&(P=!0,fe=!1);let Y;switch(me){case"M":Y=p(ge);for(let b=0,Ie=Y.length;b<Ie;b+=2)N.x=Y[b+0],N.y=Y[b+1],W.x=N.x,W.y=N.y,b===0?F.moveTo(N.x,N.y):F.lineTo(N.x,N.y),b===0&&ae.copy(N);break;case"H":Y=p(ge);for(let b=0,Ie=Y.length;b<Ie;b++)N.x=Y[b],W.x=N.x,W.y=N.y,F.lineTo(N.x,N.y),b===0&&P===!0&&ae.copy(N);break;case"V":Y=p(ge);for(let b=0,Ie=Y.length;b<Ie;b++)N.y=Y[b],W.x=N.x,W.y=N.y,F.lineTo(N.x,N.y),b===0&&P===!0&&ae.copy(N);break;case"L":Y=p(ge);for(let b=0,Ie=Y.length;b<Ie;b+=2)N.x=Y[b+0],N.y=Y[b+1],W.x=N.x,W.y=N.y,F.lineTo(N.x,N.y),b===0&&P===!0&&ae.copy(N);break;case"C":Y=p(ge);for(let b=0,Ie=Y.length;b<Ie;b+=6)F.bezierCurveTo(Y[b+0],Y[b+1],Y[b+2],Y[b+3],Y[b+4],Y[b+5]),W.x=Y[b+2],W.y=Y[b+3],N.x=Y[b+4],N.y=Y[b+5],b===0&&P===!0&&ae.copy(N);break;case"S":Y=p(ge);for(let b=0,Ie=Y.length;b<Ie;b+=4)F.bezierCurveTo(g(N.x,W.x),g(N.y,W.y),Y[b+0],Y[b+1],Y[b+2],Y[b+3]),W.x=Y[b+0],W.y=Y[b+1],N.x=Y[b+2],N.y=Y[b+3],b===0&&P===!0&&ae.copy(N);break;case"Q":Y=p(ge);for(let b=0,Ie=Y.length;b<Ie;b+=4)F.quadraticCurveTo(Y[b+0],Y[b+1],Y[b+2],Y[b+3]),W.x=Y[b+0],W.y=Y[b+1],N.x=Y[b+2],N.y=Y[b+3],b===0&&P===!0&&ae.copy(N);break;case"T":Y=p(ge);for(let b=0,Ie=Y.length;b<Ie;b+=2){let De=g(N.x,W.x),L=g(N.y,W.y);F.quadraticCurveTo(De,L,Y[b+0],Y[b+1]),W.x=De,W.y=L,N.x=Y[b+0],N.y=Y[b+1],b===0&&P===!0&&ae.copy(N)}break;case"A":Y=p(ge,[3,4],7);for(let b=0,Ie=Y.length;b<Ie;b+=7){if(Y[b+5]==N.x&&Y[b+6]==N.y)continue;let De=N.clone();N.x=Y[b+5],N.y=Y[b+6],W.x=N.x,W.y=N.y,o(F,Y[b],Y[b+1],Y[b+2],Y[b+3],Y[b+4],De,N),b===0&&P===!0&&ae.copy(N)}break;case"m":Y=p(ge);for(let b=0,Ie=Y.length;b<Ie;b+=2)N.x+=Y[b+0],N.y+=Y[b+1],W.x=N.x,W.y=N.y,b===0?F.moveTo(N.x,N.y):F.lineTo(N.x,N.y),b===0&&ae.copy(N);break;case"h":Y=p(ge);for(let b=0,Ie=Y.length;b<Ie;b++)N.x+=Y[b],W.x=N.x,W.y=N.y,F.lineTo(N.x,N.y),b===0&&P===!0&&ae.copy(N);break;case"v":Y=p(ge);for(let b=0,Ie=Y.length;b<Ie;b++)N.y+=Y[b],W.x=N.x,W.y=N.y,F.lineTo(N.x,N.y),b===0&&P===!0&&ae.copy(N);break;case"l":Y=p(ge);for(let b=0,Ie=Y.length;b<Ie;b+=2)N.x+=Y[b+0],N.y+=Y[b+1],W.x=N.x,W.y=N.y,F.lineTo(N.x,N.y),b===0&&P===!0&&ae.copy(N);break;case"c":Y=p(ge);for(let b=0,Ie=Y.length;b<Ie;b+=6)F.bezierCurveTo(N.x+Y[b+0],N.y+Y[b+1],N.x+Y[b+2],N.y+Y[b+3],N.x+Y[b+4],N.y+Y[b+5]),W.x=N.x+Y[b+2],W.y=N.y+Y[b+3],N.x+=Y[b+4],N.y+=Y[b+5],b===0&&P===!0&&ae.copy(N);break;case"s":Y=p(ge);for(let b=0,Ie=Y.length;b<Ie;b+=4)F.bezierCurveTo(g(N.x,W.x),g(N.y,W.y),N.x+Y[b+0],N.y+Y[b+1],N.x+Y[b+2],N.y+Y[b+3]),W.x=N.x+Y[b+0],W.y=N.y+Y[b+1],N.x+=Y[b+2],N.y+=Y[b+3],b===0&&P===!0&&ae.copy(N);break;case"q":Y=p(ge);for(let b=0,Ie=Y.length;b<Ie;b+=4)F.quadraticCurveTo(N.x+Y[b+0],N.y+Y[b+1],N.x+Y[b+2],N.y+Y[b+3]),W.x=N.x+Y[b+0],W.y=N.y+Y[b+1],N.x+=Y[b+2],N.y+=Y[b+3],b===0&&P===!0&&ae.copy(N);break;case"t":Y=p(ge);for(let b=0,Ie=Y.length;b<Ie;b+=2){let De=g(N.x,W.x),L=g(N.y,W.y);F.quadraticCurveTo(De,L,N.x+Y[b+0],N.y+Y[b+1]),W.x=De,W.y=L,N.x=N.x+Y[b+0],N.y=N.y+Y[b+1],b===0&&P===!0&&ae.copy(N)}break;case"a":Y=p(ge,[3,4],7);for(let b=0,Ie=Y.length;b<Ie;b+=7){if(Y[b+5]==0&&Y[b+6]==0)continue;let De=N.clone();N.x+=Y[b+5],N.y+=Y[b+6],W.x=N.x,W.y=N.y,o(F,Y[b],Y[b+1],Y[b+2],Y[b+3],Y[b+4],De,N),b===0&&P===!0&&ae.copy(N)}break;case"Z":case"z":F.currentPath.autoClose=!0,F.currentPath.curves.length>0&&(N.copy(ae),F.currentPath.currentPoint.copy(N),fe=!0);break;default:console.warn(ce)}P=!1}return F}function r(V){if(!(!V.sheet||!V.sheet.cssRules||!V.sheet.cssRules.length))for(let F=0;F<V.sheet.cssRules.length;F++){let N=V.sheet.cssRules[F];if(N.type!==1)continue;let W=N.selectorText.split(/,/gm).filter(Boolean).map(ae=>ae.trim());for(let ae=0;ae<W.length;ae++){let fe=Object.fromEntries(Object.entries(N.style).filter(([,P])=>P!==""));q[W[ae]]=Object.assign(q[W[ae]]||{},fe)}}}function o(V,F,N,W,ae,fe,P,X){if(F==0||N==0){V.lineTo(X.x,X.y);return}W=W*Math.PI/180,F=Math.abs(F),N=Math.abs(N);let z=(P.x-X.x)/2,j=(P.y-X.y)/2,ee=Math.cos(W)*z+Math.sin(W)*j,ce=-Math.sin(W)*z+Math.cos(W)*j,me=F*F,ge=N*N,Y=ee*ee,b=ce*ce,Ie=Y/me+b/ge;if(Ie>1){let de=Math.sqrt(Ie);F=de*F,N=de*N,me=F*F,ge=N*N}let De=me*b+ge*Y,L=(me*ge-De)/De,S=Math.sqrt(Math.max(0,L));ae===fe&&(S=-S);let $=S*F*ce/N,Q=-S*N*ee/F,oe=Math.cos(W)*$-Math.sin(W)*Q+(P.x+X.x)/2,ve=Math.sin(W)*$+Math.cos(W)*Q+(P.y+X.y)/2,Me=a(1,0,(ee-$)/F,(ce-Q)/N),le=a((ee-$)/F,(ce-Q)/N,(-ee-$)/F,(-ce-Q)/N)%(Math.PI*2);V.currentPath.absellipse(oe,ve,F,N,Me,Me+le,fe===0,W)}function a(V,F,N,W){let ae=V*N+F*W,fe=Math.sqrt(V*V+F*F)*Math.sqrt(N*N+W*W),P=Math.acos(Math.max(-1,Math.min(1,ae/fe)));return V*W-F*N<0&&(P=-P),P}function c(V){let F=y(V.getAttribute("x")||0),N=y(V.getAttribute("y")||0),W=y(V.getAttribute("rx")||V.getAttribute("ry")||0),ae=y(V.getAttribute("ry")||V.getAttribute("rx")||0),fe=y(V.getAttribute("width")),P=y(V.getAttribute("height")),X=1-.551915024494,z=new Dn;return z.moveTo(F+W,N),z.lineTo(F+fe-W,N),(W!==0||ae!==0)&&z.bezierCurveTo(F+fe-W*X,N,F+fe,N+ae*X,F+fe,N+ae),z.lineTo(F+fe,N+P-ae),(W!==0||ae!==0)&&z.bezierCurveTo(F+fe,N+P-ae*X,F+fe-W*X,N+P,F+fe-W,N+P),z.lineTo(F+W,N+P),(W!==0||ae!==0)&&z.bezierCurveTo(F+W*X,N+P,F,N+P-ae*X,F,N+P-ae),z.lineTo(F,N+ae),(W!==0||ae!==0)&&z.bezierCurveTo(F,N+ae*X,F+W*X,N,F+W,N),z}function l(V){function F(fe,P,X){let z=y(P),j=y(X);ae===0?W.moveTo(z,j):W.lineTo(z,j),ae++}let N=/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,W=new Dn,ae=0;return V.getAttribute("points").replace(N,F),W.currentPath.autoClose=!0,W}function h(V){function F(fe,P,X){let z=y(P),j=y(X);ae===0?W.moveTo(z,j):W.lineTo(z,j),ae++}let N=/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,W=new Dn,ae=0;return V.getAttribute("points").replace(N,F),W.currentPath.autoClose=!1,W}function u(V){let F=y(V.getAttribute("cx")||0),N=y(V.getAttribute("cy")||0),W=y(V.getAttribute("r")||0),ae=new ei;ae.absarc(F,N,W,0,Math.PI*2);let fe=new Dn;return fe.subPaths.push(ae),fe}function d(V){let F=y(V.getAttribute("cx")||0),N=y(V.getAttribute("cy")||0),W=y(V.getAttribute("rx")||0),ae=y(V.getAttribute("ry")||0),fe=new ei;fe.absellipse(F,N,W,ae,0,Math.PI*2);let P=new Dn;return P.subPaths.push(fe),P}function f(V){let F=y(V.getAttribute("x1")||0),N=y(V.getAttribute("y1")||0),W=y(V.getAttribute("x2")||0),ae=y(V.getAttribute("y2")||0),fe=new Dn;return fe.moveTo(F,N),fe.lineTo(W,ae),fe.currentPath.autoClose=!1,fe}function m(V){let F="http://www.w3.org/1999/xlink",N=V.querySelectorAll("linearGradient, radialGradient"),W=["x1","y1","x2","y2","cx","cy","r","fx","fy","gradientUnits","gradientTransform","spreadMethod"],ae={};for(let P of N){let X=P.getAttribute("id");if(!X)continue;let z={type:P.nodeName==="radialGradient"?"radialGradient":"linearGradient",attrs:{},stops:null,href:null},j=P.getAttributeNS(F,"href")||P.getAttribute("href")||"";j.startsWith("#")&&(z.href=j.substring(1));for(let ce of W)P.hasAttribute(ce)&&(z.attrs[ce]=P.getAttribute(ce));let ee=P.querySelectorAll("stop");if(ee.length>0){z.stops=[];for(let ce of ee){let me=ce.getAttribute("stop-color");!me&&ce.style&&(me=ce.style["stop-color"]),me||(me="#000");let ge=ce.getAttribute("stop-opacity");(ge===null||ge==="")&&ce.style&&(ge=ce.style["stop-opacity"]),ge=ge===null||ge===""||ge===void 0?1:Math.max(0,Math.min(1,parseFloat(ge)));let Y=Math.max(0,Math.min(1,parseFloat(ce.getAttribute("offset")||"0")));z.stops.push({offset:Y,color:me,opacity:ge})}}ae[X]=z}function fe(P,X){let z=ae[P];if(!z||X.has(P))return z;if(X.add(P),z.href&&ae[z.href]){let j=fe(z.href,X);if(j){z.stops||(z.stops=j.stops);for(let ee in j.attrs)ee in z.attrs||(z.attrs[ee]=j.attrs[ee])}}return z}for(let P in ae)fe(P,new Set);for(let P in ae){let ce=function(me){return typeof me!="string"?0:me.endsWith("%")?parseFloat(me)/100:y(me)},X=ae[P],z=X.attrs,j=z.gradientUnits==="userSpaceOnUse"?"userSpaceOnUse":"objectBoundingBox",ee={type:X.type,gradientUnits:j,spreadMethod:z.spreadMethod==="reflect"||z.spreadMethod==="repeat"?z.spreadMethod:"pad",gradientTransform:null,stops:(X.stops||[]).slice().sort((me,ge)=>me.offset-ge.offset)};if(z.gradientTransform&&(ee.gradientTransform=new We,T(z.gradientTransform,ee.gradientTransform)),X.type==="linearGradient")ee.x1=z.x1!==void 0?ce(z.x1):0,ee.y1=z.y1!==void 0?ce(z.y1):0,ee.x2=z.x2!==void 0?ce(z.x2):j==="objectBoundingBox"?1:0,ee.y2=z.y2!==void 0?ce(z.y2):0;else{let me=j==="objectBoundingBox"?.5:0,ge=j==="objectBoundingBox"?.5:0;ee.cx=z.cx!==void 0?ce(z.cx):me,ee.cy=z.cy!==void 0?ce(z.cy):me,ee.r=z.r!==void 0?ce(z.r):ge,ee.fx=z.fx!==void 0?ce(z.fx):ee.cx,ee.fy=z.fy!==void 0?ce(z.fy):ee.cy}H[P]=ee}}function _(V,F){F=Object.assign({},F);let N={};if(V.hasAttribute("class")){let P=V.getAttribute("class").split(/\s/).filter(Boolean).map(X=>X.trim());for(let X=0;X<P.length;X++)N=Object.assign(N,q["."+P[X]])}V.hasAttribute("id")&&(N=Object.assign(N,q["#"+V.getAttribute("id")]));function W(P,X,z){z===void 0&&(z=function(ee){return ee}),V.hasAttribute(P)&&(F[X]=z(V.getAttribute(P))),N[X]&&(F[X]=z(N[X])),V.style&&V.style[P]!==""&&(F[X]=z(V.style[P]))}function ae(P){return Math.max(0,Math.min(1,y(P)))}function fe(P){return Math.max(0,y(P))}return W("fill","fill"),W("fill-opacity","fillOpacity",ae),W("fill-rule","fillRule"),W("opacity","opacity",ae),W("stroke","stroke"),W("stroke-opacity","strokeOpacity",ae),W("stroke-width","strokeWidth",fe),W("stroke-linejoin","strokeLineJoin"),W("stroke-linecap","strokeLineCap"),W("stroke-miterlimit","strokeMiterLimit",fe),W("visibility","visibility"),F}function g(V,F){return V-(F-V)}function p(V,F,N){if(typeof V!="string")throw new TypeError("Invalid input: "+typeof V);let W={SEPARATOR:/[ \t\r\n\,.\-+]/,WHITESPACE:/[ \t\r\n]/,DIGIT:/[\d]/,SIGN:/[-+]/,POINT:/\./,COMMA:/,/,EXP:/e/i,FLAGS:/[01]/},ae=0,fe=1,P=2,X=3,z=ae,j=!0,ee="",ce="",me=[];function ge(De,L,S){let $=new SyntaxError('Unexpected character "'+De+'" at index '+L+".");throw $.partial=S,$}function Y(){ee!==""&&(ce===""?me.push(Number(ee)):me.push(Number(ee)*Math.pow(10,Number(ce)))),ee="",ce=""}let b,Ie=V.length;for(let De=0;De<Ie;De++){if(b=V[De],Array.isArray(F)&&F.includes(me.length%N)&&W.FLAGS.test(b)){z=fe,ee=b,Y();continue}if(z===ae){if(W.WHITESPACE.test(b))continue;if(W.DIGIT.test(b)||W.SIGN.test(b)){z=fe,ee=b;continue}if(W.POINT.test(b)){z=P,ee=b;continue}W.COMMA.test(b)&&(j&&ge(b,De,me),j=!0)}if(z===fe){if(W.DIGIT.test(b)){ee+=b;continue}if(W.POINT.test(b)){ee+=b,z=P;continue}if(W.EXP.test(b)){z=X;continue}W.SIGN.test(b)&&ee.length===1&&W.SIGN.test(ee[0])&&ge(b,De,me)}if(z===P){if(W.DIGIT.test(b)){ee+=b;continue}if(W.EXP.test(b)){z=X;continue}W.POINT.test(b)&&ee[ee.length-1]==="."&&ge(b,De,me)}if(z===X){if(W.DIGIT.test(b)){ce+=b;continue}if(W.SIGN.test(b)){if(ce===""){ce+=b;continue}ce.length===1&&W.SIGN.test(ce)&&ge(b,De,me)}}W.WHITESPACE.test(b)?(Y(),z=ae,j=!1):W.COMMA.test(b)?(Y(),z=ae,j=!0):W.SIGN.test(b)?(Y(),z=fe,ee=b):W.POINT.test(b)?(Y(),z=P,ee=b):ge(b,De,me)}return Y(),me}let M=["mm","cm","in","pt","pc","px"],v={mm:{mm:1,cm:.1,in:1/25.4,pt:72/25.4,pc:6/25.4,px:-1},cm:{mm:10,cm:1,in:1/2.54,pt:72/2.54,pc:6/2.54,px:-1},in:{mm:25.4,cm:2.54,in:1,pt:72,pc:6,px:-1},pt:{mm:25.4/72,cm:2.54/72,in:1/72,pt:1,pc:6/72,px:-1},pc:{mm:25.4/6,cm:2.54/6,in:1/6,pt:72/6,pc:1,px:-1},px:{px:1}};function y(V){let F="px";if(typeof V=="string"||V instanceof String)for(let W=0,ae=M.length;W<ae;W++){let fe=M[W];if(V.endsWith(fe)){F=fe,V=V.substring(0,V.length-fe.length);break}}let N;return F==="px"&&t.defaultUnit!=="px"?N=v.in[t.defaultUnit]/t.defaultDPI:(N=v[F][t.defaultUnit],N<0&&(N=v[F].in*t.defaultDPI)),N*parseFloat(V)}function E(V){if(!(V.hasAttribute("transform")||V.nodeName==="use"&&(V.hasAttribute("x")||V.hasAttribute("y"))))return null;let F=w(V);return k.length>0&&F.premultiply(k[k.length-1]),qe.copy(F),k.push(F),F}function w(V){let F=new We;if(V.nodeName==="use"&&(V.hasAttribute("x")||V.hasAttribute("y"))){let N=y(V.getAttribute("x")||0),W=y(V.getAttribute("y")||0);F.makeTranslation(N,W)}return V.hasAttribute("transform")&&T(V.getAttribute("transform"),F),F}function T(V,F){let N=ie,W=V.split(")");for(let ae=W.length-1;ae>=0;ae--){let fe=W[ae].trim();if(fe==="")continue;let P=fe.indexOf("("),X=fe.length;if(P>0&&P<X){let z=fe.slice(0,P),j=p(fe.slice(P+1));switch(N.identity(),z){case"translate":if(j.length>=1){let ee=j[0],ce=0;j.length>=2&&(ce=j[1]),N.makeTranslation(ee,ce)}break;case"rotate":if(j.length>=1){let ee=0,ce=0,me=0;ee=j[0]*Math.PI/180,j.length>=3&&(ce=j[1],me=j[2]),re.makeTranslation(-ce,-me),xe.makeRotation(ee),ye.multiplyMatrices(xe,re),re.makeTranslation(ce,me),N.multiplyMatrices(re,ye)}break;case"scale":if(j.length>=1){let ee=j[0],ce=ee;j.length>=2&&(ce=j[1]),N.makeScale(ee,ce)}break;case"skewX":j.length===1&&N.set(1,Math.tan(j[0]*Math.PI/180),0,0,1,0,0,0,1);break;case"skewY":j.length===1&&N.set(1,0,0,Math.tan(j[0]*Math.PI/180),1,0,0,0,1);break;case"matrix":j.length===6&&N.set(j[0],j[2],j[4],j[1],j[3],j[5],0,0,1);break}F.premultiply(N)}}return F}function x(V,F){function N(P){Je.set(P.x,P.y,1).applyMatrix3(F),P.set(Je.x,Je.y)}function W(P){let X=P.xRadius,z=P.yRadius,j=Math.cos(P.aRotation),ee=Math.sin(P.aRotation),ce=new U(X*j,X*ee,0),me=new U(-z*ee,z*j,0),ge=ce.applyMatrix3(F),Y=me.applyMatrix3(F),b=ie.set(ge.x,Y.x,0,ge.y,Y.y,0,0,0,1),Ie=re.copy(b).invert(),S=xe.copy(Ie).transpose().multiply(Ie).elements,$=G(S[0],S[1],S[4]),Q=Math.sqrt($.rt1),oe=Math.sqrt($.rt2);if(P.xRadius=1/Q,P.yRadius=1/oe,P.aRotation=Math.atan2($.sn,$.cs),!((P.aEndAngle-P.aStartAngle)%(2*Math.PI)<Number.EPSILON)){let Me=re.set(Q,0,0,0,oe,0,0,0,1),le=xe.set($.cs,$.sn,0,-$.sn,$.cs,0,0,0,1),de=Me.multiply(le).multiply(b),Se=Fe=>{let{x:Te,y:Ee}=new U(Math.cos(Fe),Math.sin(Fe),0).applyMatrix3(de);return Math.atan2(Ee,Te)};P.aStartAngle=Se(P.aStartAngle),P.aEndAngle=Se(P.aEndAngle),R(F)&&(P.aClockwise=!P.aClockwise)}}function ae(P){let X=C(F),z=D(F);P.xRadius*=X,P.yRadius*=z;let j=X>Number.EPSILON?Math.atan2(F.elements[1],F.elements[0]):Math.atan2(-F.elements[3],F.elements[4]);P.aRotation+=j,R(F)&&(P.aStartAngle*=-1,P.aEndAngle*=-1,P.aClockwise=!P.aClockwise)}let fe=V.subPaths;for(let P=0,X=fe.length;P<X;P++){let j=fe[P].curves;for(let ee=0;ee<j.length;ee++){let ce=j[ee];ce.isLineCurve?(N(ce.v1),N(ce.v2)):ce.isCubicBezierCurve?(N(ce.v0),N(ce.v1),N(ce.v2),N(ce.v3)):ce.isQuadraticBezierCurve?(N(ce.v0),N(ce.v1),N(ce.v2)):ce.isEllipseCurve&&(Ue.set(ce.aX,ce.aY),N(Ue),ce.aX=Ue.x,ce.aY=Ue.y,I(F)?W(ce):ae(ce))}}}function R(V){let F=V.elements;return F[0]*F[4]-F[1]*F[3]<0}function I(V){let F=V.elements,N=F[0]*F[3]+F[1]*F[4];if(N===0)return!1;let W=C(V),ae=D(V);return Math.abs(N/(W*ae))>Number.EPSILON}function C(V){let F=V.elements;return Math.sqrt(F[0]*F[0]+F[1]*F[1])}function D(V){let F=V.elements;return Math.sqrt(F[3]*F[3]+F[4]*F[4])}function B(V){let F=V.elements,N=F[0]*F[4]-F[1]*F[3];return Math.sqrt(Math.abs(N))}function G(V,F,N){let W,ae,fe,P,X,z=V+N,j=V-N,ee=Math.sqrt(j*j+4*F*F);return z>0?(W=.5*(z+ee),X=1/W,ae=V*X*N-F*X*F):z<0?ae=.5*(z-ee):(W=.5*ee,ae=-.5*ee),j>0?fe=j+ee:fe=j-ee,Math.abs(fe)>2*Math.abs(F)?(X=-2*F/fe,P=1/Math.sqrt(1+X*X),fe=X*P):Math.abs(F)===0?(fe=1,P=0):(X=-.5*fe/F,fe=1/Math.sqrt(1+X*X),P=X*fe),j>0&&(X=fe,fe=-P,P=X),{rt1:W,rt2:ae,cs:fe,sn:P}}let O=[],q={},H={},k=[],ie=new We,re=new We,xe=new We,ye=new We,Ue=new ue,Je=new U,qe=new We,he=new DOMParser().parseFromString(e,"image/svg+xml");return m(he),n(he.documentElement,{fill:"#000",fillOpacity:1,strokeOpacity:1,strokeWidth:1,strokeLineJoin:"miter",strokeLineCap:"butt",strokeMiterLimit:4}),{paths:O,gradients:H,xml:he.documentElement}}static createFillMaterial(e){let t=e.userData.style;if(t.fill===void 0||t.fill==="none")return null;let n=e.color,s=null,r=$p.exec(t.fill);if(r){let a=e.userData.gradients&&e.userData.gradients[r[1]];s=E1(a,e)}let o=new Yt({opacity:t.fillOpacity*(t.opacity||1),transparent:!0,side:jt,depthWrite:!1});return s!==null?o.map=s:o.color=n,o}static createStrokeMaterial(e){let t=e.userData.style;return t.stroke===void 0||t.stroke==="none"?null:($p.test(t.stroke)&&console.warn("THREE.SVGLoader: Gradient strokes are not supported."),new Yt({color:new ze().setStyle(t.stroke,Zo),opacity:t.strokeOpacity*(t.opacity||1),transparent:!0,side:jt,depthWrite:!1}))}static createShapes(e){return console.warn("SVGLoader: createShapes() is deprecated. Use shapePath.toShapes() instead."),e.toShapes()}static getStrokeStyle(e,t,n,s,r){return e=e!==void 0?e:1,t=t!==void 0?t:"#000",n=n!==void 0?n:"miter",s=s!==void 0?s:"butt",r=r!==void 0?r:4,{strokeColor:t,strokeWidth:e,strokeLineJoin:n,strokeLineCap:s,strokeMiterLimit:r}}static pointsToStroke(e,t,n,s){let r=[],o=[],a=[];if(i.pointsToStrokeWithBuffers(e,t,n,s,r,o,a)===0)return null;let c=new Et;return c.setAttribute("position",new ut(r,3)),c.setAttribute("normal",new ut(o,3)),c.setAttribute("uv",new ut(a,2)),c}static pointsToStrokeWithBuffers(e,t,n,s,r,o,a,c){let l=new ue,h=new ue,u=new ue,d=new ue,f=new ue,m=new ue,_=new ue,g=new ue,p=new ue,M=new ue,v=new ue,y=new ue,E=new ue,w=new ue,T=new ue,x=new ue,R=new ue;n=n!==void 0?n:12,s=s!==void 0?s:.001,c=c!==void 0?c:0,e=fe(e);let I=e.length;if(I<2)return 0;let C=e[0].equals(e[I-1]),D,B=e[0],G,O=t.strokeWidth/2,q=1/(I-1),H=0,k,ie,re,xe,ye=!1,Ue=0,Je=c*3,qe=c*2;he(e[0],e[1],l).multiplyScalar(O),g.copy(e[0]).sub(l),p.copy(e[0]).add(l),M.copy(g),v.copy(p);for(let P=1;P<I;P++){D=e[P],P===I-1?C?G=e[1]:G=void 0:G=e[P+1];let X=l;if(he(B,D,X),u.copy(X).multiplyScalar(O),y.copy(D).sub(u),E.copy(D).add(u),k=H+q,ie=!1,G!==void 0){he(D,G,h),u.copy(h).multiplyScalar(O),w.copy(D).sub(u),T.copy(D).add(u),re=!0,u.subVectors(G,B),X.dot(u)<0&&(re=!1),P===1&&(ye=re),u.subVectors(G,D),u.normalize();let z=Math.abs(X.dot(u));if(z>Number.EPSILON){let j=O/z;u.multiplyScalar(-j),d.subVectors(D,B),f.copy(d).setLength(j).add(u),x.copy(f).negate();let ee=f.length(),ce=d.length();d.divideScalar(ce),m.subVectors(G,D);let me=m.length();if(m.divideScalar(me),d.dot(x)<ce&&m.dot(x)<me&&(ie=!0),R.copy(f).add(D),x.add(D),ie){let ge=re?p:g,Y=(R.x-ge.x)*(x.y-ge.y)-(R.y-ge.y)*(x.x-ge.x);(re&&Y<0||!re&&Y>0)&&x.copy(ge)}switch(xe=!1,ie?re?(T.copy(x),E.copy(x)):(w.copy(x),y.copy(x)):F(),t.strokeLineJoin){case"bevel":N(re,ie,k);break;case"round":W(re,ie),re?V(D,y,w,k,0):V(D,T,E,k,1);break;default:let ge=O*t.strokeMiterLimit/ee;if(ge<1)if(t.strokeLineJoin!=="miter-clip"){N(re,ie,k);break}else W(re,ie),re?(m.subVectors(R,y).multiplyScalar(ge).add(y),_.subVectors(R,w).multiplyScalar(ge).add(w),J(y,k,0),J(m,k,0),J(D,k,.5),J(D,k,.5),J(m,k,0),J(_,k,0),J(D,k,.5),J(_,k,0),J(w,k,0)):(m.subVectors(R,E).multiplyScalar(ge).add(E),_.subVectors(R,T).multiplyScalar(ge).add(T),J(E,k,1),J(m,k,1),J(D,k,.5),J(D,k,.5),J(m,k,1),J(_,k,1),J(D,k,.5),J(_,k,1),J(T,k,1));else ie?(re?(J(p,H,1),J(g,H,0),J(R,k,0),J(p,H,1),J(R,k,0),J(x,k,1)):(J(p,H,1),J(g,H,0),J(R,k,1),J(g,H,0),J(x,k,0),J(R,k,1)),re?w.copy(R):T.copy(R)):re?(J(y,k,0),J(R,k,0),J(D,k,.5),J(D,k,.5),J(R,k,0),J(w,k,0)):(J(E,k,1),J(R,k,1),J(D,k,.5),J(D,k,.5),J(R,k,1),J(T,k,1)),xe=!0;break}}else F()}else F();!C&&P===I-1&&ae(e[0],M,v,re,!0,H),H=k,B=D,g.copy(w),p.copy(T)}if(!C)ae(D,y,E,re,!1,k);else if(ie&&r){let P=R,X=x;ye!==re&&(P=x,X=R),re?(xe||ye)&&(X.toArray(r,0),X.toArray(r,9),xe&&P.toArray(r,3)):(xe||!ye)&&(X.toArray(r,3),X.toArray(r,9),xe&&P.toArray(r,0))}if(r){let P=[new ue,new ue,new ue],X=c*3;for(let z=X;z<Je;z+=9)P[0].set(r[z],r[z+1]),P[1].set(r[z+3],r[z+4]),P[2].set(r[z+6],r[z+7]),Yn.area(P)<0&&(r[z+3]=P[0].x,r[z+4]=P[0].y)}return Ue;function he(P,X,z){return z.subVectors(X,P),z.set(-z.y,z.x).normalize()}function J(P,X,z){r&&(r[Je]=P.x,r[Je+1]=P.y,r[Je+2]=0,o&&(o[Je]=0,o[Je+1]=0,o[Je+2]=1),Je+=3,a&&(a[qe]=X,a[qe+1]=z,qe+=2)),Ue+=3}function V(P,X,z,j,ee){l.copy(X).sub(P).normalize(),h.copy(z).sub(P).normalize();let ce=Math.PI,me=l.dot(h);Math.abs(me)<1&&(ce=Math.abs(Math.acos(me))),ce/=n,u.copy(X);for(let ge=0,Y=n-1;ge<Y;ge++)d.copy(u).rotateAround(P,ce),J(u,j,ee),J(d,j,ee),J(P,j,.5),u.copy(d);J(u,j,ee),J(z,j,ee),J(P,j,.5)}function F(){J(p,H,1),J(g,H,0),J(y,k,0),J(p,H,1),J(y,k,0),J(E,k,1)}function N(P,X,z){X?P?(J(p,H,1),J(g,H,0),J(y,k,0),J(p,H,1),J(y,k,0),J(x,k,1),J(y,z,0),J(w,z,0),J(x,z,.5)):(J(p,H,1),J(g,H,0),J(E,k,1),J(g,H,0),J(x,k,0),J(E,k,1),J(E,z,1),J(x,z,0),J(T,z,1)):P?(J(y,z,0),J(w,z,0),J(D,z,.5)):(J(E,z,1),J(T,z,0),J(D,z,.5))}function W(P,X){X&&(P?(J(p,H,1),J(g,H,0),J(y,k,0),J(p,H,1),J(y,k,0),J(x,k,1),J(y,H,0),J(D,k,.5),J(x,k,1),J(D,k,.5),J(w,H,0),J(x,k,1)):(J(p,H,1),J(g,H,0),J(E,k,1),J(g,H,0),J(x,k,0),J(E,k,1),J(E,H,1),J(x,k,0),J(D,k,.5),J(D,k,.5),J(x,k,0),J(T,H,1)))}function ae(P,X,z,j,ee,ce){switch(t.strokeLineCap){case"round":ee?V(P,z,X,ce,.5):V(P,X,z,ce,.5);break;case"square":if(ee)l.subVectors(X,P),h.set(l.y,-l.x),u.addVectors(l,h).add(P),d.subVectors(h,l).add(P),j?(u.toArray(r,3),d.toArray(r,0),d.toArray(r,9)):(u.toArray(r,3),a[7]===1?d.toArray(r,9):u.toArray(r,9),d.toArray(r,0));else{l.subVectors(z,P),h.set(l.y,-l.x),u.addVectors(l,h).add(P),d.subVectors(h,l).add(P);let me=r.length;j?(u.toArray(r,me-3),d.toArray(r,me-6),d.toArray(r,me-12)):(d.toArray(r,me-6),u.toArray(r,me-3),d.toArray(r,me-12))}break;default:break}}function fe(P){let X=!1;for(let j=1,ee=P.length-1;j<ee;j++)if(P[j].distanceTo(P[j+1])<s){X=!0;break}if(!X)return P;let z=[];z.push(P[0]);for(let j=1,ee=P.length-1;j<ee;j++)P[j].distanceTo(P[j+1])>=s&&z.push(P[j]);return z.push(P[P.length-1]),z}}},$p=/^\s*url\(\s*(?:["']\s*)?#([^)'"\s]+)(?:\s*["'])?\s*\)\s*$/;function E1(i,e,t=256){if(!i||!Array.isArray(i.stops)||i.stops.length===0)return null;let n=e.userData.transform,s=i.gradientUnits==="objectBoundingBox",r=null;if(s&&(r=w1(e,n),r===null))return null;function o(u,d,f){f.set(u,d,1),i.gradientTransform&&f.applyMatrix3(i.gradientTransform),s&&f.set(r.minX+f.x*r.width,r.minY+f.y*r.height,1),n&&f.applyMatrix3(n)}let a=document.createElement("canvas"),c;if(i.type==="linearGradient"){a.width=t,a.height=1;let u=a.getContext("2d"),d=u.createLinearGradient(0,0,t,0);Kp(d,i.stops),u.fillStyle=d,u.fillRect(0,0,t,1);let f=new U,m=new U;o(i.x1,i.y1,f),o(i.x2,i.y2,m);let _=m.x-f.x,g=m.y-f.y,p=_*_+g*g||1e-20,M=_/p,v=g/p,y=-(M*f.x+v*f.y);c=new We().set(M,v,y,0,0,.5,0,0,1)}else{let u=i.cx,d=i.cy,f=i.fx,m=i.fy,_=i.r;if(i.gradientTransform){let x=new U;x.set(u,d,1).applyMatrix3(i.gradientTransform),u=x.x,d=x.y,x.set(f,m,1).applyMatrix3(i.gradientTransform),f=x.x,m=x.y}if(s&&(u=r.minX+u*r.width,d=r.minY+d*r.height,f=r.minX+f*r.width,m=r.minY+m*r.height,_=_*Math.sqrt((r.width*r.width+r.height*r.height)/2)),_<=0)return null;a.width=t,a.height=t;let g=a.getContext("2d"),p=u-_,M=d-_,v=2*_,y=t/v;g.setTransform(y,0,0,y,-p*y,-M*y);let E=g.createRadialGradient(f,m,0,u,d,_);Kp(E,i.stops),g.fillStyle=E,g.fillRect(p,M,v,v);let w=n?n.clone().invert():new We;c=new We().set(1/v,0,-p/v,0,1/v,-M/v,0,0,1).multiply(w)}let l=new pn(a);l.colorSpace=Zo,l.flipY=!1,l.matrixAutoUpdate=!1,l.matrix=c;let h=i.spreadMethod==="reflect"?Vi:i.spreadMethod==="repeat"?Sn:nn;return l.wrapS=h,l.wrapT=h,l}function w1(i,e){let t=e?e.clone().invert():null,n=new ue,s=new gr;for(let r of i.subPaths)for(let o of r.getPoints())n.copy(o),t&&n.applyMatrix3(t),s.expandByPoint(n);return s.isEmpty()?null:{minX:s.min.x,minY:s.min.y,width:s.max.x-s.min.x,height:s.max.y-s.min.y}}function Kp(i,e){let t=new ze;for(let n of e){let s=n.color;if(n.opacity<1){t.setStyle(n.color,Zo);let r=/rgb\(([^)]+)\)/.exec(t.getStyle(Zo));r&&(s=`rgba(${r[1]},${n.opacity})`)}i.addColorStop(Math.max(0,Math.min(1,n.offset)),s)}}var jp={POSITION:["byte","byte normalized","unsigned byte","unsigned byte normalized","short","short normalized","unsigned short","unsigned short normalized"],NORMAL:["byte normalized","short normalized"],TANGENT:["byte normalized","short normalized"],TEXCOORD:["byte","byte normalized","unsigned byte","short","short normalized","unsigned short"]},Qi=class{constructor(){this.textureUtils=null,this.pluginCallbacks=[],this.register(function(e){return new Ou(e)}),this.register(function(e){return new Fu(e)}),this.register(function(e){return new Vu(e)}),this.register(function(e){return new Hu(e)}),this.register(function(e){return new Gu(e)}),this.register(function(e){return new Wu(e)}),this.register(function(e){return new Bu(e)}),this.register(function(e){return new zu(e)}),this.register(function(e){return new ku(e)}),this.register(function(e){return new Xu(e)}),this.register(function(e){return new qu(e)}),this.register(function(e){return new Zu(e)}),this.register(function(e){return new Yu(e)}),this.register(function(e){return new Ju(e)})}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}setTextureUtils(e){return this.textureUtils=e,this}parse(e,t,n,s){let r=new Uu,o=[];for(let a=0,c=this.pluginCallbacks.length;a<c;a++)o.push(this.pluginCallbacks[a](r));r.setPlugins(o),r.setTextureUtils(this.textureUtils),r.writeAsync(e,t,s).catch(n)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,s,r,t)})}},nt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,INT:5124,UNSIGNED_INT:5125,FLOAT:5126,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,REPEAT:10497},Lu="KHR_mesh_quantization",xn={};xn[Dt]=nt.NEAREST;xn[_c]=nt.NEAREST_MIPMAP_NEAREST;xn[Ms]=nt.NEAREST_MIPMAP_LINEAR;xn[bt]=nt.LINEAR;xn[_r]=nt.LINEAR_MIPMAP_NEAREST;xn[ni]=nt.LINEAR_MIPMAP_LINEAR;xn[nn]=nt.CLAMP_TO_EDGE;xn[Sn]=nt.REPEAT;xn[Vi]=nt.MIRRORED_REPEAT;var Qp={scale:"scale",position:"translation",quaternion:"rotation",morphTargetInfluences:"weights"},T1=new ze,em=12,A1=1179937895,R1=2,tm=8,C1=1313821514,I1=5130562;function Ei(i,e){return i.length===e.length&&i.every(function(t,n){return t===e[n]})}function P1(i){return new TextEncoder().encode(i).buffer}function L1(i){return Ei(i.elements,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}function N1(i,e,t){let n={min:new Array(i.itemSize).fill(Number.POSITIVE_INFINITY),max:new Array(i.itemSize).fill(Number.NEGATIVE_INFINITY)};for(let s=e;s<e+t;s++)for(let r=0;r<i.itemSize;r++){let o;i.itemSize>4?o=i.array[s*i.itemSize+r]:(r===0?o=i.getX(s):r===1?o=i.getY(s):r===2?o=i.getZ(s):r===3&&(o=i.getW(s)),i.normalized===!0&&(o=pt.normalize(o,i.array))),n.min[r]=Math.min(n.min[r],o),n.max[r]=Math.max(n.max[r],o)}return n}function nm(i){return Math.ceil(i/4)*4}function Nu(i,e=0){let t=nm(i.byteLength);if(t!==i.byteLength){let n=new Uint8Array(t);if(n.set(new Uint8Array(i)),e!==0)for(let s=i.byteLength;s<t;s++)n[s]=e;return n.buffer}return i}function Du(){return typeof document>"u"&&typeof OffscreenCanvas<"u"?new OffscreenCanvas(1,1):document.createElement("canvas")}function D1(i,e){if(typeof OffscreenCanvas<"u"&&i instanceof OffscreenCanvas){let t;return e==="image/jpeg"?t=.92:e==="image/webp"&&(t=.8),i.convertToBlob({type:e,quality:t})}else return new Promise(t=>i.toBlob(t,e))}var Uu=class{constructor(){this.plugins=[],this.options={},this.pending=[],this.buffers=[],this.byteOffset=0,this.buffers=[],this.nodeMap=new Map,this.skins=[],this.extensionsUsed={},this.extensionsRequired={},this.uids=new Map,this.uid=0,this.json={asset:{version:"2.0",generator:"THREE.GLTFExporter r185"}},this.cache={meshes:new Map,attributes:new Map,attributesNormalized:new Map,materials:new Map,textures:new Map,images:new Map},this.textureUtils=null}setPlugins(e){this.plugins=e}setTextureUtils(e){this.textureUtils=e}async writeAsync(e,t,n={}){this.options=Object.assign({binary:!1,trs:!1,onlyVisible:!0,maxTextureSize:1/0,animations:[],includeCustomExtensions:!1},n),this.options.animations.length>0&&(this.options.trs=!0),await this.processInputAsync(e),await Promise.all(this.pending);let s=this,r=s.buffers,o=s.json;n=s.options;let a=s.extensionsUsed,c=s.extensionsRequired,l=new Blob(r,{type:"application/octet-stream"}),h=Object.keys(a),u=Object.keys(c);if(h.length>0&&(o.extensionsUsed=h),u.length>0&&(o.extensionsRequired=u),o.buffers&&o.buffers.length>0&&(o.buffers[0].byteLength=l.size),n.binary===!0){let d=new FileReader;d.readAsArrayBuffer(l),d.onloadend=function(){let f=Nu(d.result),m=new DataView(new ArrayBuffer(tm));m.setUint32(0,f.byteLength,!0),m.setUint32(4,I1,!0);let _=Nu(P1(JSON.stringify(o)),32),g=new DataView(new ArrayBuffer(tm));g.setUint32(0,_.byteLength,!0),g.setUint32(4,C1,!0);let p=new ArrayBuffer(em),M=new DataView(p);M.setUint32(0,A1,!0),M.setUint32(4,R1,!0);let v=em+g.byteLength+_.byteLength+m.byteLength+f.byteLength;M.setUint32(8,v,!0);let y=new Blob([p,g,_,m,f],{type:"application/octet-stream"}),E=new FileReader;E.readAsArrayBuffer(y),E.onloadend=function(){t(E.result)}}}else if(o.buffers&&o.buffers.length>0){let d=new FileReader;d.readAsDataURL(l),d.onloadend=function(){let f=d.result;o.buffers[0].uri=f,t(o)}}else t(o)}serializeUserData(e,t){if(Object.keys(e.userData).length===0)return;let n=this.options,s=this.extensionsUsed;try{let r=JSON.parse(JSON.stringify(e.userData));if(n.includeCustomExtensions&&r.gltfExtensions){t.extensions===void 0&&(t.extensions={});for(let o in r.gltfExtensions)t.extensions[o]=r.gltfExtensions[o],s[o]=!0;delete r.gltfExtensions}Object.keys(r).length>0&&(t.extras=r)}catch(r){console.warn("THREE.GLTFExporter: userData of '"+e.name+"' won't be serialized because of JSON.stringify error - "+r.message)}}getUID(e,t=!1){if(this.uids.has(e)===!1){let s=new Map;s.set(!0,this.uid++),s.set(!1,this.uid++),this.uids.set(e,s)}return this.uids.get(e).get(t)}isNormalizedNormalAttribute(e){if(this.cache.attributesNormalized.has(e))return!1;let n=new U;for(let s=0,r=e.count;s<r;s++)if(Math.abs(n.fromBufferAttribute(e,s).length()-1)>5e-4)return!1;return!0}createNormalizedNormalAttribute(e){let t=this.cache;if(t.attributesNormalized.has(e))return t.attributesNormalized.get(e);let n=e.clone(),s=new U;for(let r=0,o=n.count;r<o;r++)s.fromBufferAttribute(n,r),s.x===0&&s.y===0&&s.z===0?s.setX(1):s.normalize(),n.setXYZ(r,s.x,s.y,s.z);return t.attributesNormalized.set(e,n),n}applyTextureTransform(e,t){let n=!1,s={};(t.offset.x!==0||t.offset.y!==0)&&(s.offset=t.offset.toArray(),n=!0),t.rotation!==0&&(s.rotation=t.rotation,n=!0),(t.repeat.x!==1||t.repeat.y!==1)&&(s.scale=t.repeat.toArray(),n=!0),n&&(e.extensions=e.extensions||{},e.extensions.KHR_texture_transform=s,this.extensionsUsed.KHR_texture_transform=!0)}async buildMetalRoughTextureAsync(e,t){if(e===t)return e;function n(f){return f.colorSpace===xt?function(_){return _<.04045?_*.0773993808:Math.pow(_*.9478672986+.0521327014,2.4)}:function(_){return _}}e instanceof Gi&&(e=await this.decompressTextureAsync(e)),t instanceof Gi&&(t=await this.decompressTextureAsync(t));let s=e?e.image:null,r=t?t.image:null,o=Math.max(s?s.width:0,r?r.width:0),a=Math.max(s?s.height:0,r?r.height:0),c=Du();c.width=o,c.height=a;let l=c.getContext("2d",{willReadFrequently:!0});l.fillStyle="#00ffff",l.fillRect(0,0,o,a);let h=l.getImageData(0,0,o,a);if(s){l.drawImage(s,0,0,o,a);let f=n(e),m=l.getImageData(0,0,o,a).data;for(let _=2;_<m.length;_+=4)h.data[_]=f(m[_]/256)*256}if(r){l.drawImage(r,0,0,o,a);let f=n(t),m=l.getImageData(0,0,o,a).data;for(let _=1;_<m.length;_+=4)h.data[_]=f(m[_]/256)*256}l.putImageData(h,0,0);let d=(e||t).clone();return d.source=new vi(c),d.colorSpace=Fn,d.channel=(e||t).channel,e&&t&&e.channel!==t.channel&&console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match."),console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures."),d}async buildNormalMapTextureAsync(e,t,n){e instanceof Gi&&(e=await this.decompressTextureAsync(e));let s=e.image,r=Du();r.width=s.width,r.height=s.height;let o=r.getContext("2d",{willReadFrequently:!0});o.drawImage(s,0,0,r.width,r.height);let a=o.getImageData(0,0,r.width,r.height),c=a.data;for(let h=0;h<c.length;h+=4)t&&(c[h+0]=255-c[h+0]),n&&(c[h+1]=255-c[h+1]);o.putImageData(a,0,0);let l=e.clone();return l.source=new vi(r),l}async decompressTextureAsync(e,t=1/0){if(this.textureUtils===null)throw new Error("THREE.GLTFExporter: setTextureUtils() must be called to process compressed textures.");return await this.textureUtils.decompress(e,t)}processBuffer(e){let t=this.json,n=this.buffers;return t.buffers||(t.buffers=[{byteLength:0}]),n.push(e),0}processBufferView(e,t,n,s,r){let o=this.json;o.bufferViews||(o.bufferViews=[]);let a;switch(t){case nt.BYTE:case nt.UNSIGNED_BYTE:a=1;break;case nt.SHORT:case nt.UNSIGNED_SHORT:a=2;break;default:a=4}let c=e.itemSize*a;r===nt.ARRAY_BUFFER&&(c=Math.ceil(c/4)*4);let l=nm(s*c),h=new DataView(new ArrayBuffer(l)),u=0;for(let m=n;m<n+s;m++){for(let _=0;_<e.itemSize;_++){let g;e.itemSize>4?g=e.array[m*e.itemSize+_]:(_===0?g=e.getX(m):_===1?g=e.getY(m):_===2?g=e.getZ(m):_===3&&(g=e.getW(m)),e.normalized===!0&&(g=pt.normalize(g,e.array))),t===nt.FLOAT?h.setFloat32(u,g,!0):t===nt.INT?h.setInt32(u,g,!0):t===nt.UNSIGNED_INT?h.setUint32(u,g,!0):t===nt.SHORT?h.setInt16(u,g,!0):t===nt.UNSIGNED_SHORT?h.setUint16(u,g,!0):t===nt.BYTE?h.setInt8(u,g):t===nt.UNSIGNED_BYTE&&h.setUint8(u,g),u+=a}u%c!==0&&(u+=c-u%c)}let d={buffer:this.processBuffer(h.buffer),byteOffset:this.byteOffset,byteLength:l};return r!==void 0&&(d.target=r),r===nt.ARRAY_BUFFER&&(d.byteStride=c),this.byteOffset+=l,o.bufferViews.push(d),{id:o.bufferViews.length-1,byteLength:0}}processBufferViewImage(e){let t=this,n=t.json;return n.bufferViews||(n.bufferViews=[]),new Promise(function(s){let r=new FileReader;r.readAsArrayBuffer(e),r.onloadend=function(){let o=Nu(r.result),a={buffer:t.processBuffer(o),byteOffset:t.byteOffset,byteLength:o.byteLength};t.byteOffset+=o.byteLength,s(n.bufferViews.push(a)-1)}})}processAccessor(e,t,n,s){let r=this.json,o={1:"SCALAR",2:"VEC2",3:"VEC3",4:"VEC4",9:"MAT3",16:"MAT4"},a;if(e.array.constructor===Float32Array)a=nt.FLOAT;else if(e.array.constructor===Int32Array)a=nt.INT;else if(e.array.constructor===Uint32Array)a=nt.UNSIGNED_INT;else if(e.array.constructor===Int16Array)a=nt.SHORT;else if(e.array.constructor===Uint16Array)a=nt.UNSIGNED_SHORT;else if(e.array.constructor===Int8Array)a=nt.BYTE;else if(e.array.constructor===Uint8Array)a=nt.UNSIGNED_BYTE;else throw new Error("THREE.GLTFExporter: Unsupported bufferAttribute component type: "+e.array.constructor.name);if(n===void 0&&(n=0),(s===void 0||s===1/0)&&(s=e.count),s===0)return null;let c=N1(e,n,s),l;t!==void 0&&(l=e===t.index?nt.ELEMENT_ARRAY_BUFFER:nt.ARRAY_BUFFER);let h=this.processBufferView(e,a,n,s,l),u={bufferView:h.id,byteOffset:h.byteOffset,componentType:a,count:s,max:c.max,min:c.min,type:o[e.itemSize]};return e.normalized===!0&&(u.normalized=!0),r.accessors||(r.accessors=[]),r.accessors.push(u)-1}processImage(e,t,n,s="image/png"){if(e!==null){let r=this,o=r.cache,a=r.json,c=r.options,l=r.pending;o.images.has(e)||o.images.set(e,{});let h=o.images.get(e),u=s+":flipY/"+n.toString();if(h[u]!==void 0)return h[u];a.images||(a.images=[]);let d={mimeType:s},f=Du();f.width=Math.min(e.width,c.maxTextureSize),f.height=Math.min(e.height,c.maxTextureSize);let m=f.getContext("2d",{willReadFrequently:!0});if(n===!0&&(m.translate(0,f.height),m.scale(1,-1)),e.data!==void 0){t!==rn&&console.error("GLTFExporter: Only RGBAFormat is supported.",t),(e.width>c.maxTextureSize||e.height>c.maxTextureSize)&&console.warn("GLTFExporter: Image size is bigger than maxTextureSize",e);let g=new Uint8ClampedArray(e.height*e.width*4);for(let p=0;p<g.length;p+=4)g[p+0]=e.data[p+0],g[p+1]=e.data[p+1],g[p+2]=e.data[p+2],g[p+3]=e.data[p+3];m.putImageData(new ImageData(g,e.width,e.height),0,0)}else if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas)m.drawImage(e,0,0,f.width,f.height);else throw new Error("THREE.GLTFExporter: Invalid image type. Use HTMLImageElement, HTMLCanvasElement, ImageBitmap or OffscreenCanvas.");c.binary===!0?l.push(D1(f,s).then(g=>r.processBufferViewImage(g)).then(g=>{d.bufferView=g})):d.uri=sr.getDataURL(f,s);let _=a.images.push(d)-1;return h[u]=_,_}else throw new Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.")}processSampler(e){let t=this.json;t.samplers||(t.samplers=[]);let n={magFilter:xn[e.magFilter],minFilter:xn[e.minFilter],wrapS:xn[e.wrapS],wrapT:xn[e.wrapT]};return t.samplers.push(n)-1}async processTextureAsync(e){let n=this.options,s=this.cache,r=this.json;if(s.textures.has(e))return s.textures.get(e);r.textures||(r.textures=[]),e instanceof Gi&&(e=await this.decompressTextureAsync(e,n.maxTextureSize));let o=e.userData.mimeType,a=this.processImage(e.image,e.format,e.flipY,o),c={sampler:this.processSampler(e)};o==="image/webp"?(c.extensions=c.extensions||{},c.extensions.EXT_texture_webp={source:a},this.extensionsUsed.EXT_texture_webp=!0,this.extensionsRequired.EXT_texture_webp=!0):c.source=a,e.name&&(c.name=e.name),await this._invokeAllAsync(async function(h){h.writeTexture&&await h.writeTexture(e,c)});let l=r.textures.push(c)-1;return s.textures.set(e,l),l}async processMaterialAsync(e,t){let n=this.cache,s=this.json,r=t!==void 0&&t.hasAttribute("tangent"),o=e.normalMap?e.uuid+":"+r:e.uuid;if(n.materials.has(o))return n.materials.get(o);if(e.isShaderMaterial)return console.warn("GLTFExporter: THREE.ShaderMaterial not supported."),null;s.materials||(s.materials=[]);let a={pbrMetallicRoughness:{}};e.isMeshStandardMaterial!==!0&&e.isMeshBasicMaterial!==!0&&console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");let c=e.color.toArray().concat([e.opacity]);if(Ei(c,[1,1,1,1])||(a.pbrMetallicRoughness.baseColorFactor=c),e.isMeshStandardMaterial?(a.pbrMetallicRoughness.metallicFactor=e.metalness,a.pbrMetallicRoughness.roughnessFactor=e.roughness):(a.pbrMetallicRoughness.metallicFactor=0,a.pbrMetallicRoughness.roughnessFactor=1),e.metalnessMap||e.roughnessMap){let h=await this.buildMetalRoughTextureAsync(e.metalnessMap,e.roughnessMap),u={index:await this.processTextureAsync(h),texCoord:h.channel};this.applyTextureTransform(u,h),a.pbrMetallicRoughness.metallicRoughnessTexture=u}if(e.map){let h={index:await this.processTextureAsync(e.map),texCoord:e.map.channel};this.applyTextureTransform(h,e.map),a.pbrMetallicRoughness.baseColorTexture=h}if(e.emissive){let h=e.emissive;if(Math.max(h.r,h.g,h.b)>0&&(a.emissiveFactor=e.emissive.toArray()),e.emissiveMap){let d={index:await this.processTextureAsync(e.emissiveMap),texCoord:e.emissiveMap.channel};this.applyTextureTransform(d,e.emissiveMap),a.emissiveTexture=d}}if(e.normalMap){let h=e.normalScale,u=h.x<0,d=r?h.y<0:h.y>0,f=e.normalMap;(u||d)&&(f=await this.buildNormalMapTextureAsync(e.normalMap,u,d));let m={index:await this.processTextureAsync(f),texCoord:e.normalMap.channel};Math.abs(h.x)!==1&&(m.scale=Math.abs(h.x)),this.applyTextureTransform(m,e.normalMap),a.normalTexture=m}if(e.aoMap){let h={index:await this.processTextureAsync(e.aoMap),texCoord:e.aoMap.channel};e.aoMapIntensity!==1&&(h.strength=e.aoMapIntensity),this.applyTextureTransform(h,e.aoMap),a.occlusionTexture=h}e.transparent?a.alphaMode="BLEND":e.alphaTest>0&&(a.alphaMode="MASK",a.alphaCutoff=e.alphaTest),e.side===jt&&(a.doubleSided=!0),e.name!==""&&(a.name=e.name),this.serializeUserData(e,a),await this._invokeAllAsync(async function(h){h.writeMaterialAsync&&await h.writeMaterialAsync(e,a)});let l=s.materials.push(a)-1;return n.materials.set(o,l),l}async processMeshAsync(e){let t=this.cache,n=this.json,s=[e.geometry.uuid];if(Array.isArray(e.material))for(let y=0,E=e.material.length;y<E;y++)s.push(e.material[y].uuid);else s.push(e.material.uuid);let r=s.join(":");if(t.meshes.has(r))return t.meshes.get(r);let o=e.geometry,a;e.isLineSegments?a=nt.LINES:e.isLineLoop?a=nt.LINE_LOOP:e.isLine?a=nt.LINE_STRIP:e.isPoints?a=nt.POINTS:a=e.material.wireframe?nt.LINES:nt.TRIANGLES;let c={},l={},h=[],u=[],d={uv:"TEXCOORD_0",uv1:"TEXCOORD_1",uv2:"TEXCOORD_2",uv3:"TEXCOORD_3",color:"COLOR_0",skinWeight:"WEIGHTS_0",skinIndex:"JOINTS_0"},f=o.getAttribute("normal");f!==void 0&&!this.isNormalizedNormalAttribute(f)&&(console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."),o.setAttribute("normal",this.createNormalizedNormalAttribute(f)));let m=null;for(let y in o.attributes){if(y.slice(0,5)==="morph")continue;let E=o.attributes[y];if(y=d[y]||y.toUpperCase(),!/^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(y)&&!y.startsWith("_")&&(y="_"+y),t.attributes.has(this.getUID(E))){l[y]=t.attributes.get(this.getUID(E));continue}m=null;let T=E.array;y==="JOINTS_0"&&!(T instanceof Uint16Array)&&!(T instanceof Uint8Array)?(console.warn('GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.'),m=Qi.Utils.toTypedBufferAttribute(E,Uint16Array)):(T instanceof Uint32Array||T instanceof Int32Array)&&!y.startsWith("_")&&(console.warn(`GLTFExporter: Attribute "${y}" converted to type FLOAT.`),m=Qi.Utils.toTypedBufferAttribute(E,Float32Array));let x=this.processAccessor(m||E,o);x!==null&&(y.startsWith("_")||this.detectMeshQuantization(y,E),l[y]=x,t.attributes.set(this.getUID(E),x))}if(f!==void 0&&o.setAttribute("normal",f),Object.keys(l).length===0)return null;if(e.morphTargetInfluences!==void 0&&e.morphTargetInfluences.length>0){let y=[],E=[],w={};if(e.morphTargetDictionary!==void 0)for(let T in e.morphTargetDictionary)w[e.morphTargetDictionary[T]]=T;for(let T=0;T<e.morphTargetInfluences.length;++T){let x={},R=!1;for(let I in o.morphAttributes){if(I!=="position"&&I!=="normal"){R||(console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."),R=!0);continue}let C=o.morphAttributes[I][T],D=I.toUpperCase(),B=o.attributes[I];if(t.attributes.has(this.getUID(C,!0))){x[D]=t.attributes.get(this.getUID(C,!0));continue}let G=C.clone();if(!o.morphTargetsRelative)for(let O=0,q=C.count;O<q;O++)for(let H=0;H<C.itemSize;H++)H===0&&G.setX(O,C.getX(O)-B.getX(O)),H===1&&G.setY(O,C.getY(O)-B.getY(O)),H===2&&G.setZ(O,C.getZ(O)-B.getZ(O)),H===3&&G.setW(O,C.getW(O)-B.getW(O));x[D]=this.processAccessor(G,o),t.attributes.set(this.getUID(B,!0),x[D])}u.push(x),y.push(e.morphTargetInfluences[T]),e.morphTargetDictionary!==void 0&&E.push(w[T])}c.weights=y,E.length>0&&(c.extras={},c.extras.targetNames=E)}let _=Array.isArray(e.material);if(_&&o.groups.length===0)return null;let g=!1;if(_&&o.index===null){let y=[];for(let E=0,w=o.attributes.position.count;E<w;E++)y[E]=E;o.setIndex(y),g=!0}let p=_?e.material:[e.material],M=_?o.groups:[{materialIndex:0,start:void 0,count:void 0}];for(let y=0,E=M.length;y<E;y++){let w={mode:a,attributes:l};if(this.serializeUserData(o,w),u.length>0&&(w.targets=u),o.index!==null){let x=this.getUID(o.index);(M[y].start!==void 0||M[y].count!==void 0)&&(x+=":"+M[y].start+":"+M[y].count),t.attributes.has(x)?w.indices=t.attributes.get(x):(w.indices=this.processAccessor(o.index,o,M[y].start,M[y].count),t.attributes.set(x,w.indices)),w.indices===null&&delete w.indices}let T=await this.processMaterialAsync(p[M[y].materialIndex],o);T!==null&&(w.material=T),h.push(w)}g===!0&&o.setIndex(null),c.primitives=h,n.meshes||(n.meshes=[]),await this._invokeAllAsync(function(y){y.writeMesh&&y.writeMesh(e,c)});let v=n.meshes.push(c)-1;return t.meshes.set(r,v),v}detectMeshQuantization(e,t){if(this.extensionsUsed[Lu])return;let n;switch(t.array.constructor){case Int8Array:n="byte";break;case Uint8Array:n="unsigned byte";break;case Int16Array:n="short";break;case Uint16Array:n="unsigned short";break;default:return}t.normalized&&(n+=" normalized");let s=e.split("_",1)[0];jp[s]&&jp[s].includes(n)&&(this.extensionsUsed[Lu]=!0,this.extensionsRequired[Lu]=!0)}processCamera(e){let t=this.json;t.cameras||(t.cameras=[]);let n=e.isOrthographicCamera,s={type:n?"orthographic":"perspective"};return n?s.orthographic={xmag:e.right*2,ymag:e.top*2,zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near}:s.perspective={aspectRatio:e.aspect,yfov:pt.degToRad(e.fov),zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near},e.name!==""&&(s.name=e.type),t.cameras.push(s)-1}processAnimation(e,t){let n=this.json,s=this.nodeMap;n.animations||(n.animations=[]),e=Qi.Utils.mergeMorphTargetTracks(e.clone(),t);let r=e.tracks,o=[],a=[];for(let l=0;l<r.length;++l){let h=r[l],u=lt.parseTrackName(h.name),d=lt.findNode(t,u.nodeName),f=Qp[u.propertyName];if(u.objectName==="bones"&&(d.isSkinnedMesh===!0?d=d.skeleton.getBoneByName(u.objectIndex):d=void 0),!d||!f){console.warn('THREE.GLTFExporter: Could not export animation track "%s".',h.name);continue}let m=1,_=h.values.length/h.times.length;f===Qp.morphTargetInfluences&&(_/=d.morphTargetInfluences.length);let g;h.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline===!0?(g="CUBICSPLINE",_/=3):h.getInterpolation()===ms?g="STEP":g="LINEAR",a.push({input:this.processAccessor(new Mt(h.times,m)),output:this.processAccessor(new Mt(h.values,_)),interpolation:g}),o.push({sampler:a.length-1,target:{node:s.get(d),path:f}})}let c={name:e.name||"clip_"+n.animations.length,samplers:a,channels:o};return this.serializeUserData(e,c),n.animations.push(c),n.animations.length-1}processSkin(e){let t=this.json,n=this.nodeMap,s=t.nodes[n.get(e)],r=e.skeleton;if(r===void 0)return null;let o=e.skeleton.bones[0];if(o===void 0)return null;let a=[],c=new Float32Array(r.bones.length*16),l=new tt;for(let u=0;u<r.bones.length;++u)a.push(n.get(r.bones[u])),l.copy(r.boneInverses[u]),l.multiply(e.bindMatrix).toArray(c,u*16);return t.skins===void 0&&(t.skins=[]),t.skins.push({inverseBindMatrices:this.processAccessor(new Mt(c,16)),joints:a,skeleton:n.get(o)}),s.skin=t.skins.length-1}async processNodeAsync(e){let t=this.json,n=this.options,s=this.nodeMap;if(t.nodes||(t.nodes=[]),e.pivot!==null)return await this._processNodeWithPivotAsync(e);let r={};if(n.trs){let a=e.quaternion.toArray(),c=e.position.toArray(),l=e.scale.toArray();Ei(a,[0,0,0,1])||(r.rotation=a),Ei(c,[0,0,0])||(r.translation=c),Ei(l,[1,1,1])||(r.scale=l)}else e.matrixAutoUpdate&&e.updateMatrix(),L1(e.matrix)===!1&&(r.matrix=e.matrix.elements);if(e.name!==""&&(r.name=String(e.name)),this.serializeUserData(e,r),e.isMesh||e.isLine||e.isPoints){let a=await this.processMeshAsync(e);a!==null&&(r.mesh=a)}else e.isCamera&&(r.camera=this.processCamera(e));e.isSkinnedMesh&&this.skins.push(e);let o=t.nodes.push(r)-1;if(s.set(e,o),e.children.length>0){let a=[];for(let c=0,l=e.children.length;c<l;c++){let h=e.children[c];if(h.visible||n.onlyVisible===!1){let u=await this.processNodeAsync(h);u!==null&&a.push(u)}}a.length>0&&(r.children=a)}return await this._invokeAllAsync(function(a){a.writeNode&&a.writeNode(e,r)}),o}async _processNodeWithPivotAsync(e){let t=this.json,n=this.options,s=this.nodeMap,r=e.pivot,o={},a=e.quaternion.toArray(),c=[e.position.x+r.x,e.position.y+r.y,e.position.z+r.z],l=e.scale.toArray();Ei(a,[0,0,0,1])||(o.rotation=a),Ei(c,[0,0,0])||(o.translation=c),Ei(l,[1,1,1])||(o.scale=l),o.extras={pivot:r.toArray()},e.name!==""&&(o.name=String(e.name)),this.serializeUserData(e,o);let h=t.nodes.push(o)-1;s.set(e,h);let u={},d=[-r.x,-r.y,-r.z];if(Ei(d,[0,0,0])||(u.translation=d),e.isMesh||e.isLine||e.isPoints){let _=await this.processMeshAsync(e);_!==null&&(u.mesh=_)}else e.isCamera&&(u.camera=this.processCamera(e));e.isSkinnedMesh&&this.skins.push(e);let m=[t.nodes.push(u)-1];if(e.children.length>0){let _=[];for(let g=0,p=e.children.length;g<p;g++){let M=e.children[g];if(M.visible||n.onlyVisible===!1){let v=await this.processNodeAsync(M);v!==null&&_.push(v)}}_.length>0&&(u.children=_)}return o.children=m,await this._invokeAllAsync(function(_){_.writeNode&&_.writeNode(e,o)}),h}async processSceneAsync(e){let t=this.json,n=this.options;t.scenes||(t.scenes=[],t.scene=0);let s={};e.name!==""&&(s.name=e.name),t.scenes.push(s);let r=[];for(let o=0,a=e.children.length;o<a;o++){let c=e.children[o];if(c.visible||n.onlyVisible===!1){let l=await this.processNodeAsync(c);l!==null&&r.push(l)}}r.length>0&&(s.nodes=r),this.serializeUserData(e,s)}async processObjectsAsync(e){let t=new jn;t.name="AuxScene";for(let n=0;n<e.length;n++)t.children.push(e[n]);await this.processSceneAsync(t)}async processInputAsync(e){let t=this.options;e=e instanceof Array?e:[e],await this._invokeAllAsync(function(s){s.beforeParse&&s.beforeParse(e)});let n=[];for(let s=0;s<e.length;s++)e[s]instanceof jn?await this.processSceneAsync(e[s]):n.push(e[s]);n.length>0&&await this.processObjectsAsync(n);for(let s=0;s<this.skins.length;++s)this.processSkin(this.skins[s]);if(e.length===1)for(let s=0;s<t.animations.length;++s)this.processAnimation(t.animations[s],e[0]);else for(let s=0;s<e.length;s++){let r=t.animations[s]||[];for(let o=0;o<r.length;++o)this.processAnimation(r[o],e[s])}await this._invokeAllAsync(function(s){s.afterParse&&s.afterParse(e)})}async _invokeAllAsync(e){for(let t=0,n=this.plugins.length;t<n;t++)await e(this.plugins[t])}},Ou=class{constructor(e){this.writer=e,this.name="KHR_lights_punctual"}writeNode(e,t){if(!e.isLight)return;if(!e.isDirectionalLight&&!e.isPointLight&&!e.isSpotLight){console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.",e);return}let n=this.writer,s=n.json,r=n.extensionsUsed,o={};e.name&&(o.name=e.name),o.color=e.color.toArray(),o.intensity=e.intensity,e.isDirectionalLight?o.type="directional":e.isPointLight?(o.type="point",e.distance>0&&(o.range=e.distance)):e.isSpotLight&&(o.type="spot",e.distance>0&&(o.range=e.distance),o.spot={},o.spot.innerConeAngle=(1-e.penumbra)*e.angle,o.spot.outerConeAngle=e.angle),e.decay!==void 0&&e.decay!==2&&console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."),e.target&&(e.target.parent!==e||e.target.position.x!==0||e.target.position.y!==0||e.target.position.z!==-1)&&console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."),r[this.name]||(s.extensions=s.extensions||{},s.extensions[this.name]={lights:[]},r[this.name]=!0);let a=s.extensions[this.name].lights;a.push(o),t.extensions=t.extensions||{},t.extensions[this.name]={light:a.length-1}}},Fu=class{constructor(e){this.writer=e,this.name="KHR_materials_unlit"}async writeMaterialAsync(e,t){if(!e.isMeshBasicMaterial)return;let s=this.writer.extensionsUsed;t.extensions=t.extensions||{},t.extensions[this.name]={},s[this.name]=!0,t.pbrMetallicRoughness.metallicFactor=0,t.pbrMetallicRoughness.roughnessFactor=.9}},Bu=class{constructor(e){this.writer=e,this.name="KHR_materials_clearcoat"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.clearcoat===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.clearcoatFactor=e.clearcoat,e.clearcoatMap){let o={index:await n.processTextureAsync(e.clearcoatMap),texCoord:e.clearcoatMap.channel};n.applyTextureTransform(o,e.clearcoatMap),r.clearcoatTexture=o}if(r.clearcoatRoughnessFactor=e.clearcoatRoughness,e.clearcoatRoughnessMap){let o={index:await n.processTextureAsync(e.clearcoatRoughnessMap),texCoord:e.clearcoatRoughnessMap.channel};n.applyTextureTransform(o,e.clearcoatRoughnessMap),r.clearcoatRoughnessTexture=o}if(e.clearcoatNormalMap){let o={index:await n.processTextureAsync(e.clearcoatNormalMap),texCoord:e.clearcoatNormalMap.channel};e.clearcoatNormalScale.x!==1&&(o.scale=e.clearcoatNormalScale.x),n.applyTextureTransform(o,e.clearcoatNormalMap),r.clearcoatNormalTexture=o}t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},zu=class{constructor(e){this.writer=e,this.name="KHR_materials_dispersion"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.dispersion===0)return;let s=this.writer.extensionsUsed,r={};r.dispersion=e.dispersion,t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},ku=class{constructor(e){this.writer=e,this.name="KHR_materials_iridescence"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.iridescence===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.iridescenceFactor=e.iridescence,e.iridescenceMap){let o={index:await n.processTextureAsync(e.iridescenceMap),texCoord:e.iridescenceMap.channel};n.applyTextureTransform(o,e.iridescenceMap),r.iridescenceTexture=o}if(r.iridescenceIor=e.iridescenceIOR,r.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],r.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1],e.iridescenceThicknessMap){let o={index:await n.processTextureAsync(e.iridescenceThicknessMap),texCoord:e.iridescenceThicknessMap.channel};n.applyTextureTransform(o,e.iridescenceThicknessMap),r.iridescenceThicknessTexture=o}t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Vu=class{constructor(e){this.writer=e,this.name="KHR_materials_transmission"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.transmissionFactor=e.transmission,e.transmissionMap){let o={index:await n.processTextureAsync(e.transmissionMap),texCoord:e.transmissionMap.channel};n.applyTextureTransform(o,e.transmissionMap),r.transmissionTexture=o}t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Hu=class{constructor(e){this.writer=e,this.name="KHR_materials_volume"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.thicknessFactor=e.thickness,e.thicknessMap){let o={index:await n.processTextureAsync(e.thicknessMap),texCoord:e.thicknessMap.channel};n.applyTextureTransform(o,e.thicknessMap),r.thicknessTexture=o}e.attenuationDistance!==1/0&&(r.attenuationDistance=e.attenuationDistance),r.attenuationColor=e.attenuationColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Gu=class{constructor(e){this.writer=e,this.name="KHR_materials_ior"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.ior===1.5)return;let s=this.writer.extensionsUsed,r={};r.ior=e.ior,t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Wu=class{constructor(e){this.writer=e,this.name="KHR_materials_specular"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.specularIntensity===1&&e.specularColor.equals(T1)&&!e.specularIntensityMap&&!e.specularColorMap)return;let n=this.writer,s=n.extensionsUsed,r={};if(e.specularIntensityMap){let o={index:await n.processTextureAsync(e.specularIntensityMap),texCoord:e.specularIntensityMap.channel};n.applyTextureTransform(o,e.specularIntensityMap),r.specularTexture=o}if(e.specularColorMap){let o={index:await n.processTextureAsync(e.specularColorMap),texCoord:e.specularColorMap.channel};n.applyTextureTransform(o,e.specularColorMap),r.specularColorTexture=o}r.specularFactor=e.specularIntensity,r.specularColorFactor=e.specularColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Xu=class{constructor(e){this.writer=e,this.name="KHR_materials_sheen"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.sheen==0)return;let n=this.writer,s=n.extensionsUsed,r={};if(e.sheenRoughnessMap){let o={index:await n.processTextureAsync(e.sheenRoughnessMap),texCoord:e.sheenRoughnessMap.channel};n.applyTextureTransform(o,e.sheenRoughnessMap),r.sheenRoughnessTexture=o}if(e.sheenColorMap){let o={index:await n.processTextureAsync(e.sheenColorMap),texCoord:e.sheenColorMap.channel};n.applyTextureTransform(o,e.sheenColorMap),r.sheenColorTexture=o}r.sheenRoughnessFactor=e.sheenRoughness,r.sheenColorFactor=e.sheenColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},qu=class{constructor(e){this.writer=e,this.name="KHR_materials_anisotropy"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.anisotropy==0)return;let n=this.writer,s=n.extensionsUsed,r={};if(e.anisotropyMap){let o={index:await n.processTextureAsync(e.anisotropyMap)};n.applyTextureTransform(o,e.anisotropyMap),r.anisotropyTexture=o}r.anisotropyStrength=e.anisotropy,r.anisotropyRotation=e.anisotropyRotation,t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Zu=class{constructor(e){this.writer=e,this.name="KHR_materials_emissive_strength"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.emissiveIntensity===1)return;let s=this.writer.extensionsUsed,r={};r.emissiveStrength=e.emissiveIntensity,t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Yu=class{constructor(e){this.writer=e,this.name="EXT_materials_bump"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.bumpScale===1&&!e.bumpMap)return;let n=this.writer,s=n.extensionsUsed,r={};if(e.bumpMap){let o={index:await n.processTextureAsync(e.bumpMap),texCoord:e.bumpMap.channel};n.applyTextureTransform(o,e.bumpMap),r.bumpTexture=o}r.bumpFactor=e.bumpScale,t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Ju=class{constructor(e){this.writer=e,this.name="EXT_mesh_gpu_instancing"}writeNode(e,t){if(!e.isInstancedMesh)return;let n=this.writer,s=e,r=new Float32Array(s.count*3),o=new Float32Array(s.count*4),a=new Float32Array(s.count*3),c=new tt,l=new U,h=new bn,u=new U;for(let f=0;f<s.count;f++)s.getMatrixAt(f,c),c.decompose(l,h,u),l.toArray(r,f*3),h.toArray(o,f*4),u.toArray(a,f*3);let d={TRANSLATION:n.processAccessor(new Mt(r,3)),ROTATION:n.processAccessor(new Mt(o,4)),SCALE:n.processAccessor(new Mt(a,3))};s.instanceColor&&(d._COLOR_0=n.processAccessor(s.instanceColor)),t.extensions=t.extensions||{},t.extensions[this.name]={attributes:d},n.extensionsUsed[this.name]=!0,n.extensionsRequired[this.name]=!0}};Qi.Utils={insertKeyframe:function(i,e){let n=i.getValueSize(),s=new i.TimeBufferType(i.times.length+1),r=new i.ValueBufferType(i.values.length+n),o=i.createInterpolant(new i.ValueBufferType(n)),a;if(i.times.length===0){s[0]=e;for(let c=0;c<n;c++)r[c]=0;a=0}else if(e<i.times[0]){if(Math.abs(i.times[0]-e)<.001)return 0;s[0]=e,s.set(i.times,1),r.set(o.evaluate(e),0),r.set(i.values,n),a=0}else if(e>i.times[i.times.length-1]){if(Math.abs(i.times[i.times.length-1]-e)<.001)return i.times.length-1;s[s.length-1]=e,s.set(i.times,0),r.set(i.values,0),r.set(o.evaluate(e),i.values.length),a=s.length-1}else for(let c=0;c<i.times.length;c++){if(Math.abs(i.times[c]-e)<.001)return c;if(i.times[c]<e&&i.times[c+1]>e){s.set(i.times.slice(0,c+1),0),s[c+1]=e,s.set(i.times.slice(c+1),c+2),r.set(i.values.slice(0,(c+1)*n),0),r.set(o.evaluate(e),(c+1)*n),r.set(i.values.slice((c+1)*n),(c+2)*n),a=c+1;break}}return i.times=s,i.values=r,a},mergeMorphTargetTracks:function(i,e){let t=[],n={},s=i.tracks;for(let r=0;r<s.length;++r){let o=s[r],a=lt.parseTrackName(o.name),c=lt.findNode(e,a.nodeName);if(a.propertyName!=="morphTargetInfluences"||a.propertyIndex===void 0){t.push(o);continue}if(o.createInterpolant!==o.InterpolantFactoryMethodDiscrete&&o.createInterpolant!==o.InterpolantFactoryMethodLinear){if(o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)throw new Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead."),o=o.clone(),o.setInterpolation(er)}let l=c.morphTargetInfluences.length,h=c.morphTargetDictionary[a.propertyIndex];if(h===void 0)throw new Error("THREE.GLTFExporter: Morph target name not found: "+a.propertyIndex);let u;if(n[c.uuid]===void 0){u=o.clone();let f=new u.ValueBufferType(l*u.times.length);for(let m=0;m<u.times.length;m++)f[m*l+h]=u.values[m];u.name=(a.nodeName||"")+".morphTargetInfluences",u.values=f,n[c.uuid]=u,t.push(u);continue}let d=o.createInterpolant(new o.ValueBufferType(1));u=n[c.uuid];for(let f=0;f<u.times.length;f++)u.values[f*l+h]=d.evaluate(u.times[f]);for(let f=0;f<o.times.length;f++){let m=this.insertKeyframe(u,o.times[f]);u.values[m*l+h]=o.values[f]}}return i.tracks=t,i},toTypedBufferAttribute:function(i,e){let t=new Mt(new e(i.count*i.itemSize),i.itemSize,!1);if(!i.normalized&&!i.isInterleavedBufferAttribute)return t.array.set(i.array),t;for(let n=0,s=i.count;n<s;n++)for(let r=0;r<i.itemSize;r++)t.setComponent(n,r,i.getComponent(n,r));return t}};var Yo=2.4000000000000004,Es=3,en=1.2,$u=Es+en,dl=Es+en*.68;function im(i){return i<Es?i:i<$u?3-1e-6:i-en}var ws=3,Bn=ws+.04,fl=Bn+en,sm=.42,wi=2.1,es=Bn+wi,zn=es+.08,kn=.9,Ti=zn+kn,Ts=Ti+.08,Tr=.84,pl=Ts+Tr,Vn=pl+.05;var TE=Ti+.01,ml=i=>pt.clamp(i,0,1),ri=i=>{let e=ml(i);return e*e*(3-2*e)},Qu=i=>ri(i),U1=new ze(16777215),rm=new ze(9476257),Ku;function om(i,e=0){let t={phase:i<ws?"guide":i<Bn?"point":i<es?"outline":i<zn?"fill":i<Ti?"extrude":i<Ts?"white":i<pl?"color":"solid",guideProgress:ri(i/Yo),guideOpacity:ri(i/(3*.28))*(1-ri((i-zn)/(kn*.7))),stroke:ml((i-Bn)/wi),fill:ri((i-es)/.08),extrusion:ri((i-zn)/kn),tint:ri((i-Ts)/Tr),flatness:0,complete:i>=pl,lineOpacity:1-ri((i-(zn+kn/6))/(kn*5/6))};return e>0&&i>=Ti&&(t.phase=e>=1?"flat":"flattening",t.flatness=Qu(e),t.extrusion=1-t.flatness,t.fill=1,t.lineOpacity=0),t}function am(i){let{minX:e,maxX:t,minZ:n,maxZ:s}=i;return[{a:[e,n],b:[t,n]},{a:[t,s],b:[e,s]},{a:[e,s],b:[e,n]},{a:[t,n],b:[t,s]}]}function O1(i,e){let t=am(i),n=new Et;n.setAttribute("position",new Mt(new Float32Array(24),3).setUsage(Mr));let s=new Hi({color:11581375,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1}),r=new ur(n,s);if(r.name="SVG construction guide",r.renderOrder=2,r.frustumCulled=!1,r.userData={segments:t,mode:e,svgBounds:i,bounds:i,origins:t.map(({a:o})=>o),exits:t.map(({b:o})=>o)},e==="viewport"){let o=new ur(n.clone(),new Hi({color:16727100,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1}));o.name="Red guide sweep",o.renderOrder=3,o.frustumCulled=!1,o.visible=!1,r.add(o),r.userData.sweep=o}return r}function gl(i,e){let t=i.guide.userData,n=t.svgBounds,s=e?Math.min(1,(e.stepX/2-.1)/Math.max(Math.abs(n.minX),Math.abs(n.maxX)),(e.stepZ/2-.1)/Math.max(Math.abs(n.minZ),Math.abs(n.maxZ))):1;t.bounds=Object.fromEntries(Object.entries(n).map(([r,o])=>[r,o*s])),t.segments=am(t.bounds),t.origins=t.segments.map(({a:r})=>r),t.exits=t.segments.map(({b:r})=>r)}function ed(i,e,t=0){let n=i.guide;if(n.userData.mode!=="viewport")return;i.group.updateWorldMatrix(!0,!1);let s=i.group.localToWorld(new U(0,.008,0)).y,r=new qt(new U(0,1,0),-s),o=new bi,a=[];for(let l of[-1.06,1.06])for(let h of[-1.06,1.06+t]){o.setFromCamera(new ue(l,h),e);let u=o.ray.intersectPlane(r,new U);u&&a.push(i.group.worldToLocal(u))}if(a.length!==4)return;let c=new Rt().setFromPoints(a);n.userData.origins=n.userData.segments.map(({a:l,b:h})=>l[0]!==h[0]?[h[0]>l[0]?c.min.x:c.max.x,l[1]]:[l[0],h[1]>l[1]?c.min.z:c.max.z]),n.userData.exits=n.userData.segments.map(({a:l,b:h})=>l[0]!==h[0]?[h[0]>l[0]?c.max.x:c.min.x,l[1]]:[l[0],h[1]>l[1]?c.max.z:c.min.z]),n.userData.originScreens=n.userData.origins.map(([l,h])=>i.group.localToWorld(new U(l,.008,h)).project(e).toArray().slice(0,2)),n.userData.exitScreens=n.userData.exits.map(([l,h])=>i.group.localToWorld(new U(l,.008,h)).project(e).toArray().slice(0,2))}function F1(i,e){if(i.visible=e.guideOpacity>0,i.material.opacity=e.guideOpacity,!i.visible)return;let t=i.geometry.attributes.position,n=e.guideProgress,s=i.userData.sweep,r=s?.geometry.attributes.position;s&&(s.visible=n>0&&n<1,s.material.opacity=e.guideOpacity),i.userData.segments.forEach(({a:o,b:a},c)=>{let l=n;if(s){let h=i.userData.origins[c],u=i.userData.exits[c],d=Math.hypot(a[0]-o[0],a[1]-o[1]),f=(a[0]-o[0])/d,m=(a[1]-o[1])/d,_=Math.hypot(u[0]-h[0],u[1]-h[1]),g=_*ri(n/.52),p=_*ri((n-.58)/.42);r.setXYZ(c*2,h[0]+f*p,.0085,h[1]+m*p),r.setXYZ(c*2+1,h[0]+f*g,.0085,h[1]+m*g);let M=(o[0]-h[0])*f+(o[1]-h[1])*m;l=ml((p-M)/d)}t.setXYZ(c*2,o[0],.008,o[1]),t.setXYZ(c*2+1,pt.lerp(o[0],a[0],l),.008,pt.lerp(o[1],a[1],l))}),t.needsUpdate=!0,r&&(r.needsUpdate=!0)}function xl(i){let e=i.guide.userData.sweep;return{enabled:!0,mode:i.guide.userData.mode,bounds:i.guide.userData.bounds,origins:i.guide.userData.origins,originScreens:i.guide.userData.originScreens,color:i.guide.material.color.getHexString(),visible:i.group.visible&&i.guide.visible,opacity:i.guide.material.opacity,sweep:e?{visible:i.group.visible&&i.guide.visible&&e.visible,color:e.material.color.getHexString(),points:Array.from(e.geometry.attributes.position.array),exits:i.guide.userData.exits,exitScreens:i.guide.userData.exitScreens}:null,progress:i.state.guideProgress,points:Array.from(i.guide.geometry.attributes.position.array)}}function _l(i,e,t="edge"){let n=new hn;n.name=i.icon.id+"-drawing",n.position.copy(i.mesh.position),n.rotation.copy(i.mesh.rotation);let s=rm.clone(),r=new ze(i.color),o=O1(i.caster.svgBounds,t);o.visible=!1,n.add(o);let a=new Hi({color:s,transparent:!0,opacity:1,depthWrite:!1,toneMapped:!1}),c=[],l=0;for(let[d,f]of i.caster.contours.entries()){if(e){let p=e.lines[d],M=p.geometry.clone();M.setDrawRange(0,0);let v=new gs(M,a);v.renderOrder=3,v.userData={offset:l,count:p.userData.count},l+=p.userData.count,n.add(v),c.push(v);continue}let m=[];for(let p=0;p<f.points.length;p++){let M=f.points[p],v=f.points[(p+1)%f.points.length],y=Math.max(1,Math.ceil(Math.hypot(v[0]-M[0],v[1]-M[1])/.006));for(let E=0;E<y;E++)m.push(new U(pt.lerp(M[0],v[0],E/y),.012,pt.lerp(M[1],v[1],E/y)))}m.push(m[0].clone());let _=new Et().setFromPoints(m);_.setDrawRange(0,0);let g=new gs(_,a);g.renderOrder=3,g.userData={offset:l,count:m.length},l+=m.length,n.add(g),c.push(g)}let h=new _t(e?.dot.geometry||new wo(.018,16,12),new Yt({color:s,transparent:!0,depthWrite:!1,depthTest:!1,toneMapped:!1}));if(h.position.fromBufferAttribute(c[0].geometry.attributes.position,0),h.renderOrder=4,n.add(h),!Ku){let d=document.createElement("canvas");d.width=d.height=64;let f=d.getContext("2d"),m=f.createRadialGradient(32,32,0,32,32,32);m.addColorStop(0,"rgba(255,255,255,.5)"),m.addColorStop(.3,"rgba(255,255,255,.18)"),m.addColorStop(1,"rgba(255,255,255,0)"),f.fillStyle=m,f.fillRect(0,0,64,64),Ku=new pn(d)}let u=new uo(new ar({map:Ku,color:s,transparent:!0,depthWrite:!1,depthTest:!1}));return u.position.copy(h.position),u.scale.setScalar(.18),n.add(u),{group:n,guide:o,lines:c,dot:h,halo:u,total:l,targetColor:r,active:!1,drawing:!1,sparkAt:-1/0,state:om(0)}}function td(i,e,t,n,s=0){let r=i.reveal,o=r.guide.userData.mode==="viewport",a=o&&e>=Es&&e<$u;if(o&&(e=im(e)),r.group.visible=t,!t)return r.active=!1,r.drawing=!1,r.state;r.active=!0;let c=om(e,s);r.state=c,a&&(c.phase="measure"),F1(r.guide,c);for(let d of r.lines){let{offset:f,count:m}=d.userData;d.visible=c.lineOpacity>0,d.geometry.setDrawRange(0,pt.clamp(Math.floor(c.stroke*r.total-f),0,m)),d.position.y=i.caster.height*n*c.extrusion}r.lines[0].material.opacity=c.lineOpacity,r.lines[0].material.color.lerpColors(rm,r.targetColor,c.tint),e>=ws&&!r.drawing&&(r.sparkAt=performance.now(),r.drawing=!0),e<ws&&(r.drawing=!1);let l=(performance.now()-r.sparkAt)/300,h=Math.sin(ml(l)*Math.PI),u=c.stroke===0?1:Math.max(0,1-l);return r.dot.visible=r.halo.visible=e>=ws&&e<ws+.18&&u>0,r.dot.material.opacity=u,r.dot.scale.setScalar(1+h*.8),r.halo.material.opacity=u*(.25+h*.7),c}function cm(i,e,t,n,s,r=0){let o=td(i,e,t,n,r);i.mesh.visible=t&&o.fill>0,i.shadow.visible=t&&o.extrusion>0,t&&(i.mesh.scale.y=Math.max(.001,o.extrusion)*n,i.mesh.material.opacity=o.fill,i.mesh.material.depthWrite=o.fill>.5,i.mesh.material.color.lerpColors(U1,i.reveal.targetColor,o.tint),i.mesh.material.emissive.copy(i.mesh.material.color),i.shadow.material.opacity=s,i.shadow.material.userData.shadowHeight.value=o.extrusion)}function ts(i){let e=i>>>0;return()=>(e=Math.imul(e,1664525)+1013904223>>>0,e/4294967296)}var hm=.22,lm=5,yl=class{constructor(){this.cells=new Map,this.maxRadius=0}add(e){let t=Math.floor(e.x/4)+":"+Math.floor(e.z/4);this.cells.has(t)||this.cells.set(t,[]),this.cells.get(t).push(e),this.maxRadius=Math.max(this.maxRadius,e.radius)}accepts(e,t=hm){let n=Math.floor(e.x/4),s=Math.floor(e.z/4),r=Math.ceil((e.radius+this.maxRadius+Math.max(t,lm))/4);for(let o=n-r;o<=n+r;o++)for(let a=s-r;a<=s+r;a++)for(let c of this.cells.get(o+":"+a)||[]){let l=e.sourceIndex!==void 0&&e.sourceIndex===c.sourceIndex;if(Math.hypot(e.x-c.x,e.z-c.z)<e.radius+c.radius+(l?lm:t))return!1}return!0}};function um(i,e){let t=ts(90317),n=new yl,s=[],r=i?7.2:14,o=i?15:9,a={x:-3.5,z:i?10:5.7,radius:e[0]};s.push(a),n.add(a);for(let c=1;c<3;c++){let l=s[c-1],h=c===1?-.23:-.4,u=l.radius+e[c]+.5,d={x:l.x+Math.cos(h)*u,z:l.z+Math.sin(h)*u,radius:e[c]};s.push(d),n.add(d)}for(let c=3;c<33;c++){let l;for(let h=0;h<2e4;h++){let u=t()*Math.PI*2,d=Math.sqrt(t()),f=1+Math.floor(h/5e3)*.1,m={x:Math.cos(u)*r*d*f,z:Math.sin(u)*o*d*f,radius:e[c]};if(n.accepts(m)){l=m;break}}if(!l)throw new Error("Could not place icon "+c+" without overlap");s.push(l),n.add(l)}return s.map(c=>({...c,height:1+1.1*Math.exp(-2.4*((c.x/r)**2+(c.z/o)**2))}))}function dm(i,e){let t=ts(192807),n=new yl,s=[],r=e.map((l,h)=>({x:l.mesh.position.x,z:l.mesh.position.z,radius:l.radius,sourceIndex:h}));r.forEach(l=>n.add(l));let o=[],a=0;function c(){if(a===o.length){o=e.map((l,h)=>h),a=0;for(let l=o.length-1;l>0;l--){let h=Math.floor(t()*(l+1));[o[l],o[h]]=[o[h],o[l]]}}return o[a]}for(;r.length;){let l=Math.floor(t()*r.length),h=r[l],u=!1,d=c(),f=e[d].radius;for(let m=0;m<36;m++){let _=t()*Math.PI*2,g=(h.radius+f+hm)*(1+t()),p={x:h.x+Math.cos(_)*g,z:h.z+Math.sin(_)*g,radius:f,sourceIndex:d};if(!(p.x<i.left||p.x>i.right||p.z<i.back||p.z>i.front||!n.accepts(p))){p.rotation=0,n.add(p),r.push(p),s.push(p),a++,u=!0;break}}u||(r[l]=r[r.length-1],r.pop())}return s}var Ar=3,ns=.8,fm=Vn+en+.45,_n=[{start:0,tempo:1,measureDuration:en,colorExtra:ns,duration:Vn+en+ns},{start:fm,tempo:1,colorExtra:ns,duration:Vn+ns},{start:fm+Ti-.02,tempo:1,colorExtra:ns,duration:Vn+ns}],Hn=_n[2].start+Ti,nd=Hn-.08,gm=7.2,is=Hn+gm+.52*Vn/.7+.27,Tn=is-1.05,Ai=is+1.55,B1=is+.8*(Ai-is),oi=Ai,z1=.48,vl=2+ns,id=4.2,pm=7,mm=4,sd=Tn+.45+ns,k1=[[Bn,wi,"outlineExtra"],[zn,kn,"extrusionExtra"],[Ts,Tr,"colorExtra"]];function xm(i){return i<_n[1].start?0:i<_n[2].start?1:2}function Ml(i){return Math.max(0,Math.min(1,(i-is)/(B1-is)))}function _m(i){return _n[i]}function rd(i,e,t){let n=Math.max(0,Math.min(1,(i-e)/Math.max(.001,t-e))),s=Math.round(n*(pm-1)),r=s/(pm-1),o=(.76-r*.24)/.7,a=nd+gm*r,c=(zn-es+(Ts-Ti))*o,l=(Tn-.65+.4*r-a-c)*z1,h=Math.round(r*(mm-1)),u=h/(mm-1),f=sd-vl-id*(1-u)-a-c-l-wi*o,m=l-kn*o,_=vl-Tr*o;return{start:a-Bn*o,tempo:o,waveStep:s,colorStep:h,outlineExtra:f,extrusionExtra:m,colorExtra:_,duration:o*Vn+f+m+_}}function Rr(i,e){let t=Math.max(0,i-e.start),n=e.tempo||e.duration/Vn,s=e.measureDuration||0;for(let[r,o,a]of k1){let c=e[a]||0;if(!c)continue;let l=r*n+s,h=o*n+c;if(t<=l)break;if(t<l+h)return r+s/n+(t-l)/h*o;t-=c}return t/n}function ym(i,e="grid",t=[]){if(e==="scattered")return um(i,t);let n=i?[3,4,4,4,4,4,4,3,3]:[3,7,9,9,5],s=[];n.forEach((l,h)=>{for(let u=0;u<l;u++)s.push({x:(u-Math.floor(l/2))*(i?3.15:3.3),z:((n.length-1)/2-h)*(i?3.05:2.85)})});let r=s.splice(0,Ar),o=ts(90317);for(let l=s.length-1;l>0;l--){let h=Math.floor(o()*(l+1));[s[l],s[h]]=[s[h],s[l]]}let a=Math.max(...[...r,...s].map(l=>Math.abs(l.x)))||1,c=Math.max(...[...r,...s].map(l=>Math.abs(l.z)))||1;return[...r,...s].map(l=>({...l,height:1+1.1*Math.exp(-2.4*((l.x/a)**2+(l.z/c)**2))}))}function Sl(i){return{stepX:i?3.15:3.3,stepZ:i?3.05:2.85,originZ:i?12.2:5.7,offset:()=>0}}var bl={value:0},Jo={value:1},$o=1.15;function od(i){let e=i.onBeforeCompile,t=i.customProgramCacheKey();return i.onBeforeCompile=function(n,s){e.call(this,n,s),Object.assign(n.uniforms,{gridNear:Jo,gridFlat:bl}),n.vertexShader=`varying vec3 vGridView;
`+n.vertexShader,n.vertexShader=n.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
vGridView=mvPosition.xyz;`),n.fragmentShader=`varying vec3 vGridView; uniform float gridNear,gridFlat;
`+n.fragmentShader,n.fragmentShader=n.fragmentShader.replace("#include <opaque_fragment>",`
      float eye=length(vGridView);
      float distanceInk=1./(1.+${$o}*max(0.,eye/gridNear-1.));
      diffuseColor.a*=mix(1.,distanceInk,gridFlat);
      #include <opaque_fragment>`)},i.customProgramCacheKey=()=>t+"-grid-distance",i}function El(i){let e=i.onBeforeCompile,t=i.customProgramCacheKey();return i.onBeforeCompile=function(n,s){e.call(this,n,s),n.uniforms.flatFinish=bl,n.fragmentShader=`uniform float flatFinish;
`+n.fragmentShader,n.fragmentShader=n.fragmentShader.replace("#include <opaque_fragment>",`outgoingLight=mix(outgoingLight,diffuseColor.rgb,flatFinish);
#include <opaque_fragment>`)},i.customProgramCacheKey=()=>t+"-flat-color-finish",od(i)}var V1=[3,6,8,12,16,24,32,44,62],ad={x:570/1130,y:590/1600},H1=`
attribute vec4 piece, tile;
attribute float depthRatio;
uniform float cameraStart,cameraEnd,cameraNow,units;
uniform vec2 wordSize,viewport,endPan,frameOffset;
varying vec2 uvAt,blurUV;
varying vec4 bounds;
varying vec3 printDetail;
void main(){
  float z=cameraEnd*depthRatio;
  bool passesLens=z>=cameraStart;
  float distance=cameraNow-z;
  if(distance<=cameraNow*.012){gl_Position=vec4(2.,2.,2.,1.);return;}
  float atEnd=units*(cameraEnd-z);
  vec2 center=endPan+(vec2(piece.x-.5,.5-piece.y)*wordSize+frameOffset)*atEnd;
  vec2 size=piece.zw*wordSize*atEnd;

  // A piece starts beyond an edge, never as a blurred tile on the camera axis.
  if(passesLens){
    vec2 ray=endPan*(z-cameraStart)/(cameraEnd-cameraStart);
    vec2 delta=center-ray;
    float extent=length(size)*.56;
    vec2 direction=length(delta)>.0001?normalize(delta):vec2(1.,0.);
    vec2 approach=direction*max(length(delta),extent+units*z*.04*min(viewport.x,viewport.y));
    center=ray+mix(approach,delta,smoothstep(.04,.88,distance/(cameraEnd-z)));
  }
  vec2 screenSize=size/(units*distance);
  // Relative to the grid at z=0: distant marks stay legible while the
  // silhouettes near the lens enlarge, fall out of focus and pass the frame.
  float magnification=(cameraEnd-z)*cameraNow/(cameraEnd*distance);
  float blur=min(clamp((magnification-1.)*3.2,0.,15.),.20*min(screenSize.x,screenSize.y));
  vec2 padding=2.*blur/max(screenSize,vec2(.01));
  vec2 corner=position.xy*(1.+2.*padding);
  bounds=vec4(tile.xy,tile.xy+tile.zw);
  uvAt=tile.xy+(vec2(corner.x,-corner.y)+.5)*tile.zw;
  blurUV=blur*tile.zw/max(screenSize,vec2(.01));
  vec2 point=center+corner*size;
  printDetail=vec3(2.*point/(viewport*units*max(cameraStart-z,.001)),passesLens?0.:1.);
  gl_Position=projectionMatrix*modelViewMatrix*vec4(point,z,1.);
}`,G1=`
uniform sampler2D ink;
uniform vec2 halfTexel;
varying vec2 uvAt,blurUV;
varying vec4 bounds;
varying vec3 printDetail;
uniform float paperInk;
vec4 sampleInk(vec2 uv){
  if(any(lessThan(uv,bounds.xy))||any(greaterThan(uv,bounds.zw)))return vec4(0.);
  return texture2D(ink,clamp(uv,bounds.xy+halfTexel,bounds.zw-halfTexel));
}
void main(){
  vec4 color=sampleInk(uvAt);
  if(max(blurUV.x,blurUV.y)>.00001){
    vec2 x=vec2(blurUV.x,0.),y=vec2(0.,blurUV.y);
    color=color*.25+(sampleInk(uvAt+x)+sampleInk(uvAt-x)+sampleInk(uvAt+y)+sampleInk(uvAt-y))*.125
      +(sampleInk(uvAt+x+y)+sampleInk(uvAt+x-y)+sampleInk(uvAt-x+y)+sampleInk(uvAt-x-y))*.0625;
  }
  if(printDetail.z>.5){
    float edge=smoothstep(1.20,1.80,sqrt(length(printDetail.xy*printDetail.xy)));
    color*=mix(paperInk,1.,edge);
  }
  if(color.a<.003)discard;
  gl_FragColor=color;
}`;function vm(i,e){let t=window.MainWordSurface,n=new Map,s=new hn;s.name="\uACB0\uD569 \xB7 size-ordered depth field",i.add(s);let r={ink:{value:null},cameraStart:{value:1},cameraEnd:{value:8},cameraNow:{value:1},units:{value:1},halfTexel:{value:new ue},endPan:{value:new ue},wordSize:{value:new ue},viewport:{value:new ue},frameOffset:{value:new ue},paperInk:{value:0}},o=new zt({uniforms:r,vertexShader:H1,fragmentShader:G1,transparent:!0,premultipliedAlpha:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),a=i.background,c=new ze,l=new U,h=new U,u=new U,d=null,f=null,m=null,_=0,g=0,p=null;function M(w){let T=[],x=[],R=[];for(let D of w)T.push(...D.rect),x.push(...D.tile),R.push(D.depthRatio);let I=new ys,C=new Nn(1,1);I.index=C.index,I.setAttribute("position",C.attributes.position);for(let[D,B,G]of[["piece",T,4],["tile",x,4],["depthRatio",R,1]])I.setAttribute(D,new Ln(new Float32Array(B),G));return I.instanceCount=w.length,I}async function v(w){let{set:T,image:x}=t.getSource(w);await x.decode();let R=new Bt(x);R.flipY=!1,R.premultiplyAlpha=!0,R.generateMipmaps=!1,R.minFilter=bt,R.needsUpdate=!0;let I=T.s.map(([H,k,ie,re,xe,ye],Ue)=>{let Je=Math.max(ie,re),qe=Math.sin(Ue*78.233)*43758.5453;return{rect:[(H+ie/2)/T.w,(k+re/2)/T.h,ie/T.w,re/T.h],tile:[xe/x.naturalWidth,ye/x.naturalHeight,ie/x.naturalWidth,re/x.naturalHeight],size:Je,order:qe-Math.floor(qe)}}).sort((H,k)=>H.size-k.size||H.order-k.order),C=I[0].size,D=I.at(-1).size;for(let H=0;H<I.length;H++){let k=I[H],ie=(k.size-C)/Math.max(1,D-C),re=H/Math.max(1,I.length-1);k.depthRatio=.018+.685*Math.pow(ie,1.22)+.145*Math.pow(re,1.65)}let B=M(I),G=B.attributes.depthRatio.array,O=[];for(let H of[...V1.filter(k=>k<D),D]){let k=I.findIndex(ie=>ie.size>=H);O.push({size:I[k].size,depth:G[k]})}let q=new _t(B,o);q.frustumCulled=!1,q.renderOrder=4,n.set(w,{records:I,atlas:R,stops:O,layer:q,layeredCount:G.reduce((H,k)=>H+(k>0),0),ordered:G.every((H,k)=>k===0||H>=G[k-1])})}function y(w){let T=n.get(w);!T||d===w||(f&&s.remove(f),d=w,f=T.layer,s.add(f),r.ink.value=T.atlas,r.halfTexel.value.set(.5/T.atlas.image.width,.5/T.atlas.image.height),e())}return{ready:Promise.all([v("light"),v("dark")]).then(()=>y(t.theme)),fit(w,T,x){m=w.clone(),_=T,g=x},update(w,T,x,R){y(t.theme),T.visible=x===0,c.setScalar(d==="dark"?1-pt.smoothstep(x,0,.2):1),i.background=x>0?c:a;let I=n.get(d);if(s.visible=!!(I&&x>0),p=null,!m||!I||R<=0)return;let C=t.frame,D=m.position.y-.003,B=Math.tan(pt.degToRad(m.fov/2)),G=pt.clamp(Math.min(_,g)/12/(12*C.w/1130),9,19),O=D*G,q=D*Math.pow(G,x),H=2*B/g;Jo.value=D,h.setFromMatrixColumn(m.matrixWorld,0),l.setFromMatrixColumn(m.matrixWorld,1),u.set(m.position.x,.003,m.position.z),s.position.copy(u),s.quaternion.copy(m.quaternion);let k=r;k.cameraStart.value=D,k.cameraEnd.value=O,k.cameraNow.value=q,k.units.value=H,k.wordSize.value.set(C.w,C.h),k.viewport.value.set(_,g),k.frameOffset.value.set(C.x+C.w/2-_/2,g/2-C.y-C.h/2);let ie=_/2-C.x-C.w*ad.x,re=C.y+C.h*ad.y-g/2;if(k.endPan.value.set(ie*H*O,re*H*O),x>0){let ye=(q-D)/(O-D);w.position.copy(u).addScaledVector(h,ie*H*O*ye).addScaledVector(l,re*H*O*ye),w.position.y=.003+q,w.quaternion.copy(m.quaternion),w.near=Math.max(.05,q*.012),w.far=O*3+250,w.updateProjectionMatrix(),w.updateMatrixWorld(!0),i.fog.near=q+45,i.fog.far=q+110}k.paperInk.value=1-(1-pt.smoothstep(q,O*.52,O*.9))/(1+$o*(q/D-1));let xe=q*.988/O;p={distance:q,zoom:O/q,detail:ad,wordPieces:I.records.length,printsVisible:s.visible,layeredPieces:I.layeredCount,sizeDepthOrdered:I.ordered,sizeDepths:I.stops,passedSizeStops:I.stops.filter(ye=>xe>=ye.depth).map(ye=>ye.size),frame:{...C},theme:d}},inspect:()=>p}}var ai=[-10,30,16],As=1,wl=4,cd=16,on=256;function ld(i,e,t,n=0){let s=document.createElement("canvas");s.width=s.height=wl*on;let r=s.getContext("2d"),o=document.createElement("canvas");o.width=o.height=on;let a=o.getContext("2d"),c=document.createElement("canvas");c.width=c.height=on;let l=c.getContext("2d"),h=on/e,u=Math.cos(n),d=Math.sin(n),f=(v,y,E,w,T)=>[(v-E*(u*w-d*T)/ai[1])*h+on/2,(y-E*(d*w+u*T)/ai[1])*h+on/2];function m(v,y,E=!0){let w=0;for(let T=0;T<y.length;T++){let x=y[T],R=y[(T+1)%y.length];w+=x[0]*R[1]-R[0]*x[1]}w>0!==E&&y.reverse(),v.moveTo(...y[0]);for(let T=1;T<y.length;T++)v.lineTo(...y[T]);v.closePath()}function _(v,y,E){let w=new Path2D;for(let T of i.contours){let x=T.points.map(([I,C])=>f(I,C,.003,y,E)),R=T.points.map(([I,C])=>f(I,C,v+.003,y,E));m(w,[...x],!T.hole),m(w,[...R],!T.hole);for(let I=0;I<x.length;I++){let C=(I+1)%x.length;m(w,[x[I],x[C],R[C],R[I]])}}return w}let g=_(0,ai[0],ai[2]),p=Array.from({length:12},(v,y)=>{let E=11*Math.sqrt((y+.5)/12),w=y*2.39996323;return[ai[0]+Math.cos(w)*E,ai[2]+Math.sin(w)*E]});for(let v=0;v<cd;v++){let y=i.height*t*v/(cd-1);l.clearRect(0,0,on,on),l.globalCompositeOperation="lighter",l.globalAlpha=.72/p.length,l.filter=`blur(${(.018+y*.018)*h}px)`;for(let[E,w]of p)a.clearRect(0,0,on,on),a.fillStyle="#ffffff",a.fill(_(y,E,w)),l.drawImage(o,0,0);a.clearRect(0,0,on,on),a.fill(g),l.globalCompositeOperation="source-over",l.globalAlpha=.35,l.filter=`blur(${.035*h}px)`,l.drawImage(o,0,0),r.drawImage(c,v%wl*on,(wl-1-Math.floor(v/wl))*on)}let M=new pn(s);return M.colorSpace=xt,M.generateMipmaps=!1,M.minFilter=M.magFilter=bt,M.userData={style:"height-aware-area-light",frames:cd,light:ai},M}function Tl(i=null,e=!1){let t=new Yt({map:i,transparent:!0,opacity:1,depthWrite:!1,color:13225686,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4}),n={value:0};return t.userData.shadowHeight=n,t.onBeforeCompile=s=>{s.uniforms.shadowHeight=n,s.vertexShader=`varying float vShadowHeight;
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
    `)},t.customProgramCacheKey=()=>"height-aware-ground-shadow-"+e,t}function Mm(i,e,t,n,s,r,o){let{stepX:a,stepZ:c,originZ:l}=i,h=t-e+1,u=s-n+1,d=(e-.5)*a,f=l-(s+.5)*c,m=h*a,_=u*c,g=Math.min(96,Math.floor(2048/Math.max(h,u)))||1,p=document.createElement("canvas");p.width=h*g,p.height=u*g;let M=p.getContext("2d"),v=r.map(O=>{let q=new Path2D;for(let{points:H}of O.caster.contours)if(!(H.length<3)){q.moveTo(...H[0]);for(let k=1;k<H.length;k++)q.lineTo(...H[k]);q.closePath()}return q}),y=g/a,E=g/c;function w(O,q,H){M.setTransform(y,0,0,E,(O-d)*y,(q-f)*E),M.fillStyle=r[H].color,M.fill(v[H])}r.forEach(({mesh:O},q)=>w(O.position.x,O.position.z,q)),o.forEach(({x:O,z:q,sourceIndex:H})=>w(O,q,H));let T=new pn(p);T.flipY=!1,T.colorSpace=xt,T.wrapS=T.wrapT=Sn;let x=new Et,R=[],I=[],C=[];function D(O,q,H,k){let ie=R.length/3;for(let[re,xe]of[[O,q],[O,k],[H,k],[H,q]])R.push(d+re*m,.003,f+xe*_),I.push(re,xe);C.push(ie,ie+1,ie+2,ie,ie+2,ie+3)}D(-20,-20,21,0),D(-20,1,21,21),D(-20,0,0,1),D(1,0,21,1),x.setAttribute("position",new ut(R,3)),x.setAttribute("uv",new ut(I,2)),x.setIndex(C);let B=od(new Yt({map:T,transparent:!0,depthWrite:!1,toneMapped:!1,fog:!1})),G=new _t(x,B);return G.name="Continuous flat icon grid",G.visible=!1,G.userData.tile={left:d,back:f,width:m,length:_},G}function Sm(i,e,t,n,s){if(!i||!e)return;let{left:r,back:o,width:a,length:c}=i.userData.tile;function l(p,M){let v=new U(p,.003,M).project(t);return new ue((v.x+1)*n/2,(1-v.y)*s/2)}let h=i.material.map.image,u=l(r,o),d=l(r+a,o).sub(u).divideScalar(h.width),f=l(r,o+c).sub(u).divideScalar(h.height),m=Math.min(devicePixelRatio||1,2);e.width=Math.round(n*m),e.height=Math.round(s*m);let _=e.getContext("2d"),g=_.createPattern(h,"repeat");g.setTransform(new DOMMatrix([d.x,d.y,f.x,f.y,u.x,u.y])),_.setTransform(m,0,0,m,0,0),_.fillStyle=g,_.globalAlpha=1/(1+$o*((t.position.y-.003)/Jo.value-1)),_.fillRect(0,0,n,s)}function W1(i,e){let t=i.clone();return t.transparent=!0,t.opacity=1,t.color.set(e),t.emissive.set(e),t.onBeforeCompile=n=>{n.uniforms.neutralEmissive={value:new ze(16777215).multiplyScalar(t.emissiveIntensity)},n.vertexShader=`attribute float instanceReveal; attribute float instanceTint; varying float vReveal; varying float vTint;
`+n.vertexShader,n.vertexShader=n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vReveal=instanceReveal; vTint=instanceTint;`),n.fragmentShader=`varying float vReveal; varying float vTint; uniform vec3 neutralEmissive;
`+n.fragmentShader,n.fragmentShader=n.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
diffuseColor.rgb=mix(vec3(1.0),diffuseColor.rgb,vTint); diffuseColor.a *= vReveal;`),n.fragmentShader=n.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
totalEmissiveRadiance=mix(neutralEmissive,totalEmissiveRadiance,vTint);`)},t.customProgramCacheKey=()=>"floor-pattern-color-reveal",El(t)}var Al=class{constructor(e,t,n){this.scene=e,this.sources=t,this.material=n,this.copies=[],this.batches=[],this.key="",this.stats={count:0,visible:0,complete:0,active:0},this.transform=new Pt}fit(e,t,n,s){let r=new bi,o=new qt(new U(0,1,0),-.003),a=[];for(let E of e)for(let w of[-1.16,1.16])for(let T of[-1.16,1.16]){r.setFromCamera(new ue(w,T),E);let x=r.ray.intersectPlane(o,new U);x&&a.push(x)}let c=Sl(t),l=new Rt().setFromPoints(a),h=Math.floor((c.originZ-l.max.z)/c.stepZ)-1,u=Math.ceil((c.originZ-l.min.z)/c.stepZ)+1,d=Math.floor(l.min.x/c.stepX)-1,f=Math.ceil(l.max.x/c.stepX)+1,m=[t,h,u,d,f,n.layout,n.depth,s.x.toFixed(5),s.z.toFixed(5)].join(":");if(this.coverage={left:l.min.x,right:l.max.x,front:l.max.z,back:l.min.z},m===this.key)return;this.clear(),this.key=m;let _=new Map(this.sources.map(({mesh:E},w)=>{let T=Math.round((c.originZ-E.position.z)/c.stepZ);return[T+":"+Math.round(E.position.x/c.stepX-c.offset(T)),w]})),g=n.layout==="scattered"?dm({left:d*c.stepX,right:f*c.stepX,back:c.originZ-u*c.stepZ,front:c.originZ-h*c.stepZ},this.sources):[];if(n.layout==="grid")for(let E=h;E<=u;E++)for(let w=d;w<=f;w++){if(_.has(E+":"+w))continue;let T=(w+c.offset(E))*c.stepX,x=c.originZ-E*c.stepZ;g.push({x:T,z:x,row:E,col:w,rotation:0})}if(n.layout==="grid"){let E=ts(192807),w=[...g],T=this.sources.map(()=>1);for(let x=w.length-1;x>0;x--){let R=Math.floor(E()*(x+1));[w[x],w[R]]=[w[R],w[x]]}for(let x of w){let R=new Set;for(let B=x.row-2;B<=x.row+2;B++)for(let G=x.col-2;G<=x.col+2;G++){let O=_.get(B+":"+G);O!==void 0&&R.add(O)}let I=T.map((B,G)=>G).filter(B=>!R.has(B)),C=Math.min(...I.map(B=>T[B])),D=I.filter(B=>T[B]===C);x.sourceIndex=D[Math.floor(E()*D.length)],x.radius=this.sources[x.sourceIndex].radius,T[x.sourceIndex]++,_.set(x.row+":"+x.col,x.sourceIndex)}}let p=E=>Math.hypot(E.x-s.x,E.z-s.z);g.forEach(E=>{E.radial=p(E)});let M=[...g.map(E=>E.radial),...this.sources.slice(Ar).map(E=>p(E.mesh.position))],v=Math.min(...M),y=Math.max(...M);this.wave={origin:{x:s.x,z:s.z},nearest:v,farthest:y},this.sources.forEach((E,w)=>{E.cue=w<Ar?_m(w):rd(p(E.mesh.position),v,y)}),this.sources.forEach((E,w)=>{let T=g.filter(q=>q.sourceIndex===w);if(!T.length)return;let x=E.mesh.geometry.clone(),R=E.shadow.geometry.clone(),I=new Ln(new Float32Array(T.length),1),C=new Ln(new Float32Array(T.length),1),D=new Ln(new Float32Array(T.length),1);x.setAttribute("instanceReveal",I),R.setAttribute("instanceReveal",C),x.setAttribute("instanceTint",D);let B=new lr(x,W1(E.mesh.material,E.color),T.length),G=new lr(R,Tl(E.patternShadow,!0),T.length);G.layers.set(As),B.name=E.icon.id+"-pattern",G.name=E.icon.id+"-pattern-contact",G.renderOrder=1,B.castShadow=B.receiveShadow=!1,B.frustumCulled=G.frustumCulled=!1,B.instanceMatrix.setUsage(Mr),G.instanceMatrix.setUsage(Mr),this.scene.add(B,G);let O={mesh:B,shadow:G,fill:I,contact:C,tint:D};this.batches.push(O),T.forEach((q,H)=>{let k=new Pt;k.position.set(q.x,.003,q.z),k.rotation.y=q.rotation;let ie=rd(q.radial,v,y),re={...q,icon:E.icon,color:E.color,mesh:k,caster:E.caster,heightFactor:E.heightFactor,batch:O,slot:H,cue:ie};re.reveal=_l(re,E.reveal),re.reveal.group.visible=!1,gl(re.reveal,n.layout==="grid"?c:null),this.scene.add(re.reveal.group),this.copies.push(re),this.transform.position.set(q.x,.001,q.z),this.transform.rotation.set(-Math.PI/2,0,q.rotation),this.transform.scale.setScalar(1),this.transform.updateMatrix(),G.setMatrixAt(H,this.transform.matrix)}),G.instanceMatrix.needsUpdate=!0}),n.layout==="grid"&&(this.extension=Mm(c,d,f,h,u,this.sources,this.copies),this.scene.add(this.extension)),this.stats.count=this.copies.length}update(e,t,n){let s=0,r=0,o=0,a=0,c=Ml(e);this.extension&&(this.extension.visible=c===1),this.batches.forEach(l=>{l.dirty=!1});for(let l of this.copies){let h=e>=l.cue.start,u=Rr(e,l.cue);if(h&&u>=Vn&&c===0&&l.settled){s++,r++;continue}if(h&&c===1&&l.finalized){s++,r++,a++;continue}if(!h&&l.dormant)continue;l.settled=h&&u>=Vn&&c===0,l.finalized=h&&c===1,l.dormant=!h,l.batch.dirty=!0;let d=t.depth*l.heightFactor,f=td(l,u,h,d,c);(f.phase==="solid"||f.phase==="flat")&&(l.reveal.group.visible=!1),this.transform.position.copy(l.mesh.position),this.transform.rotation.copy(l.mesh.rotation),this.transform.scale.set(h?1:0,Math.max(.001,f.extrusion)*d,h?1:0),this.transform.updateMatrix(),l.batch.mesh.setMatrixAt(l.slot,this.transform.matrix),l.batch.fill.setX(l.slot,h?f.fill:0),l.batch.contact.setX(l.slot,h?f.extrusion:0),l.batch.tint.setX(l.slot,h?f.tint:0),h&&(f.fill>0||f.lineOpacity>0)&&s++,h&&f.complete&&r++,h&&(!f.complete||c>0&&c<1)&&o++,h&&f.phase==="flat"&&a++}for(let l of this.batches)l.dirty&&(l.mesh.visible=l.fill.array.some(h=>h>0),l.shadow.visible=l.contact.array.some(h=>h>0),l.mesh.instanceMatrix.needsUpdate=!0,l.fill.needsUpdate=l.contact.needsUpdate=l.tint.needsUpdate=!0),l.shadow.material.opacity=n;this.stats={count:this.copies.length,visible:s,complete:r,active:o,flattened:a}}isFlashing(){return this.copies.some(e=>e.reveal.active&&performance.now()-e.reveal.sparkAt<360)}inspect(){return{...this.stats,coverage:this.coverage,wave:this.wave,instances:this.copies.map(e=>({id:e.icon.id,color:new ze(16777215).lerp(e.reveal.targetColor,e.batch.tint.getX(e.slot)).getHexString(),tint:e.batch.tint.getX(e.slot),fill:e.batch.fill.getX(e.slot),flatness:e.reveal.state.flatness,lineOpacity:e.reveal.state.lineOpacity,lineColor:e.reveal.lines[0].material.color.getHexString(),x:e.x,z:e.z,radius:e.radius,rotation:e.rotation,cue:e.cue,visible:e.batch.fill.getX(e.slot)>0,extrusion:e.batch.contact.getX(e.slot),guide:xl(e.reveal),drawingVisible:e.reveal.group.visible,pointVisible:e.reveal.group.visible&&e.reveal.dot.visible,strokeVertices:e.reveal.lines.reduce((t,n)=>t+n.geometry.drawRange.count,0),phase:e.reveal.state.phase}))}}clear(){this.extension&&(this.scene.remove(this.extension),this.extension.material.map.dispose(),this.extension.material.dispose(),this.extension.geometry.dispose(),this.extension=null);for(let e of this.copies)this.scene.remove(e.reveal.group),e.reveal.guide.geometry.dispose(),e.reveal.guide.material.dispose(),e.reveal.lines.forEach(t=>t.geometry.dispose()),e.reveal.lines[0].material.dispose(),e.reveal.dot.material.dispose(),e.reveal.halo.material.dispose();for(let{mesh:e,shadow:t}of this.batches)this.scene.remove(e,t),e.dispose(),t.dispose(),e.geometry.dispose(),t.geometry.dispose(),e.material.dispose(),t.material.dispose();this.copies=[],this.batches=[]}};var bm=en+zn+kn*.5,X1=[bm,_n[1].start+Bn+wi*.46,_n[2].start+Bn+wi*.66,Hn,Hn+(Tn-Hn)*.604,Tn,Ai],Rl=(i,e,t)=>i+(e-i)*t;function ss(i,e){let t=X1,n=t.length-1;if(i<=t[0])return e[0];if(i>=t[n])return e[n];let s=t.slice(1).map((d,f)=>d-t[f]),r=s.map((d,f)=>(e[f+1]-e[f])/d),o=e.map((d,f)=>{if(!f||f===n||r[f-1]*r[f]<=0)return 0;let m=2*s[f]+s[f-1],_=s[f]+2*s[f-1];return(m+_)/(m/r[f-1]+_/r[f])}),a=t.findIndex((d,f)=>f<n&&i<t[f+1]),c=s[a],l=(i-t[a])/c,h=l*l,u=h*l;return(2*u-3*h+1)*e[a]+(u-2*h+l)*c*o[a]+(-2*u+3*h)*e[a+1]+(u-h)*c*o[a+1]}function Cl(i,e,t,n=1){let s=Math.max(0,Math.min(Ai,i)),[r,o,a]=e,c=t.distance-r.distance,l=(_,g)=>Rl(a[_],t[_],g),h=[r.center,o.center,a.center,...[.16,.65,.9,1].map(_=>({x:Rl(a.center.x,t.center.x,_),y:Rl(a.center.y,t.center.y,_),z:Rl(a.center.z,t.center.z,_)}))],u={};for(let _ of["x","y","z"])u[_]=ss(s,h.map(g=>g[_]));u.y+=n*ss(s,[0,.06,.1,.18,.3,.12,0]);let d=ss(s,[r.distance,o.distance*1.02,a.distance*1.08,r.distance+c*.06,r.distance+c*.4,r.distance+c*.7,t.distance]),f=ss(s,[r.yaw,o.yaw,a.yaw,l("yaw",.18),l("yaw",.58),l("yaw",.82),t.yaw]),m=ss(s,[r.pitch,o.pitch,a.pitch,a.pitch+1,a.pitch+3,68,90]);return{center:u,distance:d,yaw:f,pitch:m,shiftX:ss(s,[r.shiftX,o.shiftX,a.shiftX,l("shiftX",.16),l("shiftX",.65),l("shiftX",.9),t.shiftX]),shiftY:ss(s,[r.shiftY,o.shiftY,a.shiftY,l("shiftY",.16),l("shiftY",.65),l("shiftY",.9),t.shiftY]),fov:34,roll:n?ss(s,[0,-.018,-.02,-.016,-.012,-.008,0]):0,solo:s<Hn,index:xm(s),travelling:s>bm&&s<Ai,pullback:Math.max(0,Math.min(1,(d-a.distance*1.08)/(t.distance-a.distance*1.08))),overhead:Math.max(0,Math.min(1,(m-a.pitch)/(90-a.pitch)))}}var Pl=1.25,pd=es+en,Il=pd*(Pl-1),Ir=Tn-.65,Pr=1.6,Rs=.6,q1=Rs*(1+Pr)/2,hd=i=>Math.max(0,Math.min(oi,i));function Em(i){if(i>=Rs)return i*Pr-(Pr-1)*Rs/2;let e=i/Rs;return i+(Pr-1)*Rs*(e*e*e-.5*e*e*e*e)}function Z1(i){let e=i<=pd*Pl?i/Pl:i-Il;return e<=Ir?hd(e):hd(Ir+Em(e-Ir))}function Nl(i){let e=hd(i),t=e-Ir;if(e<=pd)return e*Pl;if(t<=0)return e+Il;if(t>=q1)return Ir+Il+(t+(Pr-1)*Rs/2)/Pr;let n=0,s=Rs;for(let r=0;r<32;r++){let o=(n+s)/2;Em(o)<t?n=o:s=o}return Ir+Il+(n+s)/2}var Y1=nd,J1=Tn+.45,$1=6.2,Ll=Nl(Y1),ud=Nl(J1),Cs=ud-Ll,Gn=Math.min(.6,Cs/2),wm=($1-Gn)/(Cs-Gn),dd=(1-wm)*(Cs-Gn),fd=i=>i*i*i-.5*i*i*i*i;function md(i){let e=i-Ll;if(e<=0)return i;if(e>=Cs)return i-dd;let t=e<Gn?Gn*fd(e/Gn):e>Cs-Gn?Cs-Gn-Gn*fd((Cs-e)/Gn):e-Gn/2;return i-(1-wm)*t}function K1(i){if(i<=Ll)return i;if(i>=ud-dd)return i+dd;let e=Ll,t=ud;for(let n=0;n<36;n++){let s=(e+t)/2;md(s)<i?e=s:t=s}return(e+t)/2}var j1=_n[1].start,Lr=.5,Cr=md(Nl(j1)),Is=.6,Q1=Is*(1+Lr)/2;function Tm(i){let e=i-Cr;return e<=0?i:e>=Is?Cr+e*Lr+(1-Lr)*Is/2:i-(1-Lr)*Is*fd(e/Is)}function eM(i){let e=i-Cr;if(e<=0)return i;if(e>=Q1)return Cr+(e-(1-Lr)*Is/2)/Lr;let t=Cr,n=Cr+Is;for(let s=0;s<36;s++){let r=(t+n)/2;Tm(r)<i?t=r:n=r}return(t+n)/2}function Am(i){return Z1(K1(eM(i)))}function tM(i){return Tm(md(Nl(i)))}var gd=tM(oi),Rm=.85,nM=.42,Cm=100+gd*115*nM-Rm*100;function Im(i,e,t){let n=t*Rm;return{start:i-n,distance:Math.max(1,e-t+n)}}var xd=200,_d=20,Pm=2;function Lm(i){let e=document.createElement("canvas");e.width=e.height=128;let t=e.getContext("2d");t.fillStyle="#ffffff",t.fillRect(0,0,128,128),t.fillStyle="#dddddd",t.beginPath(),t.arc(64,64,128*Pm/_d/2,0,Math.PI*2),t.fill();let n=new pn(e);n.colorSpace=xt,n.wrapS=n.wrapT=Sn,n.anisotropy=i.capabilities.getMaxAnisotropy();let s={value:1},r=new Yt({name:"White dotted floor",map:n,color:16777215,toneMapped:!1,depthWrite:!1});r.onBeforeCompile=c=>{c.uniforms.dotOpacity=s,c.fragmentShader=`uniform float dotOpacity;
`+c.fragmentShader,c.fragmentShader=c.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
       diffuseColor.rgb=mix(vec3(1.0),diffuseColor.rgb,dotOpacity);`)},r.customProgramCacheKey=()=>"dotted-floor-fade";let o=new _t(new Nn(xd,xd),r);o.name="White floor",o.rotation.x=-Math.PI/2,o.renderOrder=-1;let a=0;return{mesh:o,fit(c,l,h=34){a=2*(c.distance+c.center.y)*Math.tan(pt.degToRad(h)/2)/l*_d,n.repeat.setScalar(xd/a)},update(c,l){s.value=l?1-pt.smoothstep(c,70,90):1},inspect(){return{color:"#dddddd",spacingPx:_d,diameterPx:Pm,worldSpacing:a,opacity:s.value}}}}var Dl="http://www.w3.org/2000/svg",yd="#FF3C3C",Nm=i=>Math.max(0,Math.min(1,i)),Nr=i=>{let e=Nm(i);return e*e*(3-2*e)};function Dm(i,e){let t=Number(e.icon.viewBox.trim().split(/[\s,]+/)[3]),n=String(Number(t.toFixed(2))),s=document.createElementNS(Dl,"svg");s.setAttribute("class","opening-dimension"),s.setAttribute("aria-hidden","true"),Object.assign(s.style,{position:"absolute",inset:"0",width:"100%",height:"100%",pointerEvents:"none",display:"none"});let r=document.createElementNS(Dl,"g");r.setAttribute("stroke",yd),r.setAttribute("stroke-width","1"),r.setAttribute("fill","none"),s.append(r);let o=["upper-cap","stem","lower-cap"].map(d=>{let f=document.createElementNS(Dl,"line");return f.setAttribute("data-part",d),r.append(f),f}),a=document.createElementNS(Dl,"text");a.textContent=n,a.setAttribute("fill",yd),a.setAttribute("stroke","none"),a.setAttribute("dominant-baseline","middle"),a.setAttribute("font-family","Handjet, monospace"),a.setAttribute("font-weight","400"),a.style.fontVariantNumeric="tabular-nums",r.append(a),i.append(s);let c={visible:!1,label:n,svgHeight:t,color:yd,progress:0,opacity:0},l=new U;function h(d,f,m,_,g){return l.set(d,.008,f),e.reveal.group.localToWorld(l),l.project(m),{x:(l.x+1)*_/2,y:(1-l.y)*g/2}}function u(d,f,m){d.setAttribute("x1",f.x),d.setAttribute("y1",f.y),d.setAttribute("x2",m.x),d.setAttribute("y2",m.y)}return{update(d,f,m,_){let g=Nm((d-Es)/en),p=Nr(g/.12)*(1-Nr((d-fl)/sm))*e.reveal.state.guideOpacity;if(c={...c,visible:p>.001,progress:g,opacity:p},s.style.display=c.visible?"block":"none",r.setAttribute("opacity",p),!c.visible)return;s.setAttribute("viewBox",`0 0 ${m} ${_}`);let{minZ:M,maxZ:v,maxX:y}=e.reveal.guide.userData.bounds,E=h(y,M,f,m,_),w=h(y,v,f,m,_),T=Math.hypot(w.x-E.x,w.y-E.y),x={x:(w.y-E.y)/T,y:-(w.x-E.x)/T},R={x:E.x+x.x*9,y:E.y+x.y*9},I={x:w.x+x.x*9,y:w.y+x.y*9},C=Nr(g/.2),D=Nr((g-.1)/.55),B=Nr((g-.62)/.18),G=(ie,re)=>[{x:ie.x-x.x*6*re,y:ie.y-x.y*6*re},{x:ie.x+x.x*6*re,y:ie.y+x.y*6*re}];u(o[0],...G(R,C)),u(o[1],R,{x:R.x+(I.x-R.x)*D,y:R.y+(I.y-R.y)*D}),u(o[2],...G(I,B));let O=Nr((d-dl)/(en*.2)),q=m<500?12:14,H=(R.x+I.x)/2+x.x*(7+(1-O)*5),k=(R.y+I.y)/2+x.y*7;a.setAttribute("x",H),a.setAttribute("y",k),a.setAttribute("font-size",q),a.setAttribute("opacity",O),c={...c,upper:C,stem:D,lower:B,labelOpacity:O,top:R,bottom:I,labelPosition:{x:H,y:k},fontSize:q}},inspect(){return{...c}}}}var Ul="http://www.w3.org/2000/svg",iM=i=>Math.max(0,Math.min(1,i)),Ko=i=>{let e=iM(i);return e*e*(3-2*e)},Ol=i=>String(Number(i.toFixed(2)));function Um(i,e){let[t,n,s,r]=e.icon.viewBox.trim().split(/[\s,]+/).map(Number),o=e.caster.svgBounds,a=t+s/2,c=n+r/2,l=e.caster.contours.filter(C=>!C.hole).map(C=>{let D=C.points.map(([ye])=>t+(ye-o.minX)/(o.maxX-o.minX)*s),B=C.points.map(([,ye])=>n+(ye-o.minZ)/(o.maxZ-o.minZ)*r),G=Math.min(...D),O=Math.max(...D),q=Math.min(...B),H=Math.max(...B),k=(G+O)/2,ie=(q+H)/2,re=Math.hypot(k-a,ie-c)||1,xe=D.map((ye,Ue)=>((ye-a)*(k-a)+(B[Ue]-c)*(ie-c))/re);return{left:G,right:O,top:q,bottom:H,centerX:k,centerY:ie,radius:Math.max(...D.map((ye,Ue)=>Math.hypot(ye-a,B[Ue]-c))),radialInner:Math.min(...xe),radialOuter:Math.max(...xe)}}),h=l.filter(C=>C.left<a&&C.right>a&&C.bottom<c).sort((C,D)=>C.top-D.top)[0],u=l.filter(C=>C.left<a&&C.right>a&&C.top<c&&C.bottom>c),d=Math.max(...u.map(C=>C.radius)),f=u.sort((C,D)=>(C.right-C.left)*(C.bottom-C.top)-(D.right-D.left)*(D.bottom-D.top))[0],m=[c-h.top,c-h.bottom,d],_=l.filter(C=>(C.right<a||C.left>a)&&(C.bottom<c||C.top>c)),g=["radialOuter","radialInner"].map(C=>_.reduce((D,B)=>D+B[C],0)/_.length),p=document.createElementNS(Ul,"svg");p.setAttribute("class","opening-construction"),p.setAttribute("aria-hidden","true"),p.style.cssText="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;display:none";let M=document.createElementNS(Ul,"g");p.append(M),i.append(p);function v(C,D,B){let G=document.createElementNS(Ul,"path");return G.dataset.part=C,G.setAttribute("fill","none"),G.setAttribute("stroke",D),G.setAttribute("stroke-width",B),G.setAttribute("stroke-linecap","round"),M.append(G),G}let y=m.map((C,D)=>({element:v(["outer-circle","inner-circle","center-circle"][D],"#b0b7bf",.85),radius:C,centerX:a,centerY:c,start:.08+D*.24,duration:1.08,direction:D?-1:1}));g.forEach((C,D)=>y.push({element:v(`small-box-${D?"inner":"outer"}-circle`,"#b0b7bf",.85),radius:C,centerX:a,centerY:c,start:.72+D*.22,duration:.78,direction:D?-1:1}));let E=[v("horizontal-axis","#c3c9cf",.65),v("vertical-axis","#c3c9cf",.65)];E.forEach(C=>C.setAttribute("stroke-dasharray","3 5"));let w=[{name:"block-width",value:Ol(h.right-h.left),a:[h.left,h.top-8],b:[h.right,h.top-8],anchor:"middle",offset:[0,-9],start:.64},{name:"block-height",value:Ol(h.bottom-h.top),a:[h.right+8,h.top],b:[h.right+8,h.bottom],anchor:"start",offset:[6,0],start:.98},{name:"center-width",value:Ol(f.right-f.left),a:[f.left,f.top-8],b:[f.right,f.top-8],anchor:"middle",offset:[0,-9],start:1.12},{name:"center-height",value:Ol(f.bottom-f.top),a:[f.right+8,f.top],b:[f.right+8,f.bottom],anchor:"start",offset:[6,0],start:1.32}].map(C=>{let D=v(C.name,"#FF3C3C",1),B=document.createElementNS(Ul,"text");return B.textContent=C.value,B.dataset.part=C.name+"-value",B.setAttribute("fill","#FF3C3C"),B.setAttribute("font-family","Handjet, monospace"),B.setAttribute("font-weight","400"),B.setAttribute("text-anchor",C.anchor),B.setAttribute("dominant-baseline","middle"),B.setAttribute("stroke","#fff"),B.setAttribute("stroke-width","3"),B.setAttribute("stroke-linejoin","round"),B.setAttribute("paint-order","stroke"),B.style.fontVariantNumeric="tabular-nums",M.append(B),{...C,element:D,label:B}}),T=new U;function x(C,D,B,G,O){return T.set(o.minX+(C-t)/s*(o.maxX-o.minX),.009,o.minZ+(D-n)/r*(o.maxZ-o.minZ)),e.reveal.group.localToWorld(T),T.project(B),{x:(T.x+1)*G/2,y:(1-T.y)*O/2}}function R(C,D,B,G,O,q,H){let k=x(...D,O,q,H),ie=x(D[0]+(B[0]-D[0])*G,D[1]+(B[1]-D[1])*G,O,q,H);C.setAttribute("d",`M${k.x},${k.y}L${ie.x},${ie.y}`),C.setAttribute("opacity",G>0?1:0)}let I={visible:!1,opacity:0,circles:y.map(()=>0),dimensions:w.map(({value:C})=>({value:C,progress:0,labelOpacity:0}))};return{update(C,D,B,G){let O=C-fl,q=Ko(O/.24)*e.reveal.state.guideOpacity;if(I={...I,visible:e.reveal.group.visible&&q>.001,opacity:q},p.style.display=I.visible?"block":"none",M.setAttribute("opacity",q),!I.visible)return;p.setAttribute("viewBox",`0 0 ${B} ${G}`),I.circles=y.map(({element:ie,radius:re,centerX:xe,centerY:ye,start:Ue,duration:Je,direction:qe})=>{let he=Ko((O-Ue)/Je),J=Math.max(1,Math.ceil(he*128)),V="";for(let F=0;F<=J;F++){let N=-Math.PI/2+he*(F/J)*Math.PI*2*qe,W=x(xe+Math.cos(N)*re,ye+Math.sin(N)*re,D,B,G);V+=(F?"L":"M")+W.x+","+W.y}return ie.setAttribute("d",V),ie.setAttribute("opacity",he>0?1:0),he});let H=Ko((O-.42)/.75),k=m[0];R(E[0],[a-k,c],[a+k,c],H,D,B,G),R(E[1],[a,c-k],[a,c+k],H,D,B,G),I.dimensions=w.map(({element:ie,label:re,value:xe,a:ye,b:Ue,anchor:Je,offset:qe,start:he})=>{let J=Ko((O-he)/.46),V=Ko((O-he-.32)/.32);R(ie,ye,Ue,J,D,B,G);let F=x((ye[0]+Ue[0])/2,(ye[1]+Ue[1])/2,D,B,G);return re.setAttribute("x",F.x+qe[0]+(Je==="start"?(1-V)*4:0)),re.setAttribute("y",F.y+qe[1]+(Je==="middle"?(1-V)*4:0)),re.setAttribute("font-size",B<500?12:14),re.setAttribute("opacity",V),{value:xe,progress:J,labelOpacity:V}})},inspect(){return{...I,block:h,radii:m}}}}function Om(i,e){let{guide:t}=e,n=t.userData.sweep,s="http://www.w3.org/2000/svg",r=document.createElementNS(s,"svg");r.classList.add("opening-guide-sweep"),r.setAttribute("aria-hidden","true"),r.style.cssText="position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:3;display:none",r.setAttribute("fill","none"),r.setAttribute("stroke","#"+n.material.color.getHexString()),r.setAttribute("stroke-width","1");let o=Array.from({length:4},()=>{let c=document.createElementNS(s,"line");return r.append(c),c});document.body.append(r),n.material.visible=!1;let a=new U;return{update(c){let l=e.group.visible&&t.visible&&n.visible;if(r.style.display=l?"block":"none",!l)return;let h=i.getBoundingClientRect(),u=n.geometry.attributes.position;r.setAttribute("viewBox",`0 0 ${innerWidth} ${innerHeight}`),r.setAttribute("opacity",String(n.material.opacity)),o.forEach((d,f)=>{for(let m=0;m<2;m++)a.fromBufferAttribute(u,f*2+m),n.localToWorld(a).project(c),d.setAttribute("x"+(m+1),String(h.left+(a.x+1)*h.width/2)),d.setAttribute("y"+(m+1),String(h.top+(1-a.y)*h.height/2))})}}}function Fm(){if(window.MainIntro)return{setAutoHideProgress(h){window.MainIntro.headerProgress=h}};let i=document.querySelector(".header"),e=document.querySelector(".menu-button"),t=document.querySelector(".mobile-menu"),n=document.querySelector("main"),s=matchMedia("(max-width:759px)"),r=0,o=0,a=!1;function c(h=!1){let u=o>0&&!a;i.style.setProperty("--header-hide-offset",`calc(${-100*o}% - ${o}px)`),i.style.setProperty("--header-hide-opacity",String(1-o)),i.style.setProperty("--header-slide-duration",h?"0s":".4s"),i.style.setProperty("--header-background-duration",h?"0s":".6s"),i.classList.contains("is-intro-hidden")!==u&&i.classList.toggle("is-intro-hidden",u)}document.addEventListener("pointermove",h=>{h.pointerType!=="touch"&&(a=h.clientY<=i.offsetHeight+(a?16:0),c())},{passive:!0}),document.addEventListener("pointerleave",()=>{a=!1,c()}),i.addEventListener("focusin",()=>c()),i.addEventListener("focusout",()=>c());function l(h,u=!1){clearTimeout(r),e.setAttribute("aria-expanded",String(h)),e.setAttribute("aria-label",h?"\uBA54\uB274 \uB2EB\uAE30":"\uBA54\uB274 \uC5F4\uAE30"),document.body.classList.toggle("mobile-menu-open",h),c(),n.inert=h,t.inert=!h,h?(t.hidden=!1,requestAnimationFrame(()=>{e.getAttribute("aria-expanded")==="true"&&t.classList.add("is-open")})):(t.classList.remove("is-open"),r=setTimeout(()=>{t.hidden=!0},280)),u&&e.focus({preventScroll:!0})}return e.addEventListener("click",()=>l(e.getAttribute("aria-expanded")!=="true")),document.querySelectorAll(".header a").forEach(h=>h.addEventListener("click",()=>l(!1))),document.addEventListener("keydown",h=>{if(e.getAttribute("aria-expanded")!=="true")return;if(h.key==="Escape"){l(!1,!0);return}if(h.key!=="Tab")return;let u=[...document.querySelectorAll(".header .logo a,.menu-button,.mobile-menu a")],d=u[0],f=u.at(-1);h.shiftKey&&document.activeElement===d?(h.preventDefault(),f.focus()):!h.shiftKey&&document.activeElement===f&&(h.preventDefault(),d.focus())}),s.addEventListener("change",()=>{s.matches||l(!1)}),{setAutoHideProgress(h){let u=Math.max(0,Math.min(1,h));u!==o&&(o=u,c(!0))}}}var sM=i=>Math.max(0,Math.min(1,i));function Fl(i,e,t="[data-read]"){let n=matchMedia("(hover: hover) and (pointer: fine)"),s={x:0,y:0,active:!1},r=[...i.querySelectorAll(t)].map(m=>{let _=[...m.childNodes].filter(E=>E.nodeType===Node.TEXT_NODE).map(E=>E.textContent).join(""),g=document.createElement("span"),p=document.createElement("span");g.className="reading-source",g.textContent=_,p.className="reading-letters",p.setAttribute("aria-hidden","true");let M=m.dataset.readAccent||"",v=M?_.indexOf(M):-1,y=Array.from(_,(E,w)=>{let T=document.createElement("span");return T.className="reading-char",T.textContent=E,p.append(T),v>=0&&w>=v&&w<v+M.length&&T.classList.add("reading-accent"),{element:T,center:0,x:0,velocity:0,target:0}});for(let E of[...m.childNodes])E.nodeType===Node.TEXT_NODE&&E.remove();return m.prepend(g,p),m.classList.add("reading-interactive"),{word:m,letters:p,chars:y,fontSize:0}}),o=0,a=0;function c(m){let _=Math.min(.03333333333333333,(m-a)/1e3||.016666666666666666);a=m;let g=!1;for(let p of r){for(let M of p.chars)M.velocity+=((M.target-M.x)*260-M.velocity*24)*_,M.x+=M.velocity*_,Math.abs(M.target-M.x)<.015&&Math.abs(M.velocity)<.05?(M.x=M.target,M.velocity=0):g=!0,M.element.style.transform=`translate3d(${M.x.toFixed(3)}px,0,0)`;p.word.style.setProperty("--read-end-shift",`${p.chars.at(-1).x.toFixed(3)}px`)}o=g?requestAnimationFrame(c):0}function l(){o||(a=performance.now(),o=requestAnimationFrame(c))}function h(m=!1){s.active=!1;for(let _ of r){for(let g of _.chars)g.target=0,m&&(g.x=0,g.velocity=0,g.element.style.transform="none");m&&_.word.style.setProperty("--read-end-shift","0px")}m?(cancelAnimationFrame(o),o=0):l()}function u(){if(!s.active)return;let m=i.getBoundingClientRect();if(s.x<m.left||s.x>m.right||s.y<m.top||s.y>m.bottom){h();return}let _=[];for(let g of r){let p=g.letters.getBoundingClientRect(),M=p.top+p.height/2,v=_.find(y=>Math.abs(y.center-M)<Math.min(y.height,p.height)*.25);v||(v={center:M,height:p.height,left:p.left,right:p.right,fontSize:g.fontSize,runs:[]},_.push(v)),v.left=Math.min(v.left,p.left),v.right=Math.max(v.right,p.right),v.fontSize=Math.max(v.fontSize,g.fontSize),v.runs.push({row:g,bounds:p})}for(let g of _){let p=(s.y-g.center)/(g.height*1.15),M=Math.pow(sM(1-p*p),2),v=g.fontSize*1.35,y=g.fontSize*.64,E=Math.max(0,g.left-s.x,s.x-g.right)/v,w=Math.exp(-E*E);for(let{row:T,bounds:x}of g.runs)for(let R of T.chars){let I=(x.left+R.center-s.x)/v;R.target=y*Math.tanh(I)*M*w,R.target=Math.max(20-g.left,Math.min(innerWidth-20-g.right,R.target))}}l()}function d(){for(let m of r){let _=m.letters.getBoundingClientRect();m.fontSize=parseFloat(getComputedStyle(m.word).fontSize),m.word.style.setProperty("--read-width",`${_.width}px`);for(let g of m.chars){let p=g.element.getBoundingClientRect(),M=p.left-_.left-g.x;g.center=M+p.width/2,g.element.style.setProperty("--char-left",`${M}px`)}}u()}i.addEventListener("pointermove",m=>{m.pointerType==="touch"||!n.matches||e.matches||(s.x=m.clientX,s.y=m.clientY,s.active=!0,u())}),i.addEventListener("pointerleave",()=>h()),i.addEventListener("pointercancel",()=>h()),window.addEventListener("blur",()=>h()),window.addEventListener("scroll",u,{passive:!0}),document.addEventListener("visibilitychange",()=>{document.hidden&&h(!0)}),e.addEventListener("change",()=>h(!0)),n.addEventListener("change",()=>h(!0));let f=new ResizeObserver(d);r.forEach(m=>f.observe(m.letters)),document.fonts.ready.then(d),d()}var jo=[{id:"yun-jiwon",name:"\uC724\uC9C0\uC6D0",viewBox:"-14 -14 268 268",color:"#3b82a6",svg:'<path d="M190.62,161.45l16.88,16.88-29.17,29.17-16.88-16.88,29.17-29.17ZM207.5,61.67l-16.88,16.88-29.17-29.17,16.88-16.88,29.17,29.17ZM120,138.42l-18.42-18.42,18.42-18.42,18.42,18.42-18.42,18.42ZM32.5,61.67l29.17-29.17,16.88,16.88-29.17,29.17-16.88-16.88ZM32.5,178.33l16.88-16.88,29.17,29.17-16.88,16.88-29.17-29.17Z"/><path d="M27.78,144.01H0v-48.02h27.78v48.02ZM95.99,240v-27.78h48.02v27.78s-48.02,0-48.02,0ZM104.84,104.84h30.32v30.32s-30.32,0-30.32,0v-30.32ZM240,95.99v48.02s-27.78,0-27.78,0v-48.02h27.78ZM144.01,0v27.78h-48.02V0h48.02Z"/>'},{id:"seo-yeonwoo",name:"\uC11C\uC5F0\uC6B0",viewBox:"-14 -14 268 268",color:"#f59000",svg:'<path d="M89.99,30.04v30h59.98v-30L119.98.04l-29.99,30ZM30,150.04h29.99v-60h-29.99L.01,120.04l29.99,30ZM89.99,210.04l29.99,30,29.99-30v-30h-59.98v30ZM179.96,90.04v60h29.99l29.99-30-29.99-30h-29.99Z" fill-rule="evenodd"/>'},{id:"lee-nayeong",name:"\uC774\uB098\uC601",viewBox:"-14 -14 268 268",color:"#00aaff",svg:'<path d="M159.57,62.27v-24.19l17.3-17.3h24.19l17.3,17.3v24.19l-17.3,17.3h-24.19l-17.3-17.3ZM176.87,217.86l-17.3-17.3v-24.19l17.3-17.3h24.19l17.3,17.3v24.19l-17.3,17.3h-24.19ZM90.44,131.43v-24.22l17.27-17.27h24.22l17.27,17.27v24.22l-17.27,17.27h-24.22l-17.27-17.27ZM21.28,62.27v-24.19l17.3-17.3h24.19l17.3,17.3v24.19l-17.3,17.3h-24.19l-17.3-17.3ZM38.58,217.86l-17.3-17.3v-24.19l17.3-17.3h24.19l17.3,17.3v24.19l-17.3,17.3h-24.19Z"/>'},{id:"kim-doyeon",name:"\uAE40\uB3C4\uC5F0",viewBox:"-14 -14 268 268",color:"#4ccad1",svg:'<path d="M135.76,239.71l-2.71.29v-36.19l3.49-.59,5.42-1.27,5.32-1.6,5.19-1.96,5.06-2.28,4.9-2.61,4.7-2.94,4.54-3.23,4.28-3.52,4.05-3.82,3.82-4.05,3.52-4.28,3.23-4.54,2.94-4.7,2.61-4.9,2.28-5.06,1.96-5.19,1.6-5.32,1.27-5.42.59-3.49h36.19l-.29,2.71-1.27,7.8-1.79,7.7-2.28,7.54-2.81,7.41-3.26,7.18-3.72,6.98-4.18,6.72-4.6,6.4-4.99,6.14-5.42,5.74-5.74,5.42-6.14,4.99-6.4,4.6-6.72,4.18-6.98,3.72-7.18,3.26-7.41,2.81-7.54,2.28-7.7,1.79-7.8,1.27ZM239.71,104.24l.29,2.71h-36.19l-.59-3.49-1.27-5.42-1.6-5.32-1.96-5.19-2.28-5.06-2.61-4.9-2.94-4.7-3.23-4.54-3.52-4.28-3.82-4.05-4.05-3.82-4.28-3.52-4.54-3.23-4.7-2.94-4.9-2.61-5.06-2.28-5.19-1.96-5.32-1.6-5.42-1.27-3.49-.59V0l2.71.29,7.8,1.27,7.7,1.79,7.54,2.28,7.41,2.81,7.18,3.26,6.98,3.72,6.72,4.18,6.4,4.6,6.14,4.99,5.74,5.42,5.42,5.74,4.99,6.14,4.6,6.4,4.18,6.72,3.72,6.98,3.26,7.18,2.81,7.41,2.28,7.54,1.79,7.7,1.27,7.8ZM104.24.29l2.71-.29v36.19l-3.49.59-5.42,1.27-5.32,1.6-5.19,1.96-5.06,2.28-4.9,2.61-4.7,2.94-4.54,3.23-4.28,3.52-4.05,3.82-3.82,4.05-3.52,4.28-3.23,4.54-2.94,4.7-2.61,4.9-2.28,5.06-1.96,5.19-1.6,5.32-1.27,5.42-.59,3.49H0l.29-2.71,1.27-7.8,1.79-7.7,2.28-7.54,2.81-7.41,3.26-7.18,3.72-6.98,4.18-6.72,4.6-6.4,4.99-6.14,5.42-5.74,5.74-5.42,6.14-4.99,6.4-4.6,6.72-4.18,6.98-3.72,7.18-3.26,7.41-2.81,7.54-2.28,7.7-1.79,7.8-1.27ZM.29,135.76l-.29-2.71h36.19l.59,3.49,1.27,5.42,1.6,5.32,1.96,5.19,2.28,5.06,2.61,4.9,2.94,4.7,3.23,4.54,3.52,4.28,3.82,4.05,4.05,3.82,4.28,3.52,4.54,3.23,4.7,2.94,4.9,2.61,5.06,2.28,5.19,1.96,5.32,1.6,5.42,1.27,3.49.59v36.19l-2.71-.29-7.8-1.27-7.7-1.79-7.54-2.28-7.41-2.81-7.18-3.26-6.98-3.72-6.72-4.18-6.4-4.6-6.14-4.99-5.74-5.42-5.42-5.74-4.99-6.14-4.6-6.4-4.18-6.72-3.72-6.98-3.26-7.18-2.81-7.41-2.28-7.54-1.79-7.7-1.27-7.8Z"/>'},{id:"kim-juyoun",name:"\uAE40\uC8FC\uC5F0",viewBox:"-14 -14 268 268",color:"#fbe19f",svg:'<path d="M160.68,183.3l22.62-22.62,56.7,56.7v2.61l-20.01,20.01h-2.61l-56.7-56.7ZM219.99,0l20.01,20.01v2.61l-56.7,56.7-22.62-22.62L217.38,0h2.61ZM135.99,218.01l-15.99,15.99-15.99-15.99v-82.02H21.99l-15.99-15.99,15.99-15.99h82.02V21.99l15.99-15.99,15.99,15.99v82.02h82.02l15.99,15.99-15.99,15.99h-82.02v82.02ZM0,219.99v-2.61l56.7-56.7,22.62,22.62-56.7,56.7h-2.61L0,219.99ZM79.32,56.7l-22.62,22.62L0,22.62v-2.61L20.01,0h2.61l56.7,56.7Z"/>'},{id:"kim-jiyou-cocorang",name:"\uAE40\uC9C0\uC720",viewBox:"-14 -14 268 268",color:"#ffba79",svg:'<path d="M210.05,90.24l29.95-30.03L179.97.56l-30.06,29.38L119.91.47l-30.07,29.62L60.08.35,0,60.24l30.15,29.89,60-59.82,29.6,29.87c-30.36.12-55.33,22.81-59.14,52.16-.37,2.48-.65,5-.73,7.58l-29.82-29.48L.04,120.26l29.95,29.58,29.95-28.73c.06,1.6.24,3.15.41,4.71.02.22.03.44.06.66.12.95.28,1.88.43,2.82.21,1.36.44,2.71.74,4.04,0,.03.02.06.02.09,1.31,5.75,3.42,11.18,6.25,16.17.14.24.29.47.43.71.79,1.34,1.6,2.67,2.48,3.94.42.6.87,1.17,1.31,1.75.67.89,1.33,1.8,2.05,2.65.63.75,1.3,1.44,1.96,2.16.62.67,1.22,1.36,1.87,2,.64.63,1.33,1.21,1.99,1.81.77.7,1.54,1.41,2.35,2.07.38.31.79.58,1.18.88,10.1,7.79,22.71,12.47,36.44,12.49l-29.52,30.09,29.51,29.53,30.12-29.33,29.83,29.53,59.76-59.71-29.34-29.85,29.64-30.37-29.85-29.71ZM209.53,89.68l-29.38,30.23c-.1-2.75-.42-5.44-.83-8.08-4.03-29.06-28.84-51.47-58.97-51.64l29.36-29.58,59.83,59.07ZM149.93,209.94l-29.76-29.64c5.37-.17,10.47-1.01,15.32-2.33.87-.23,1.76-.43,2.61-.7.55-.17,1.07-.4,1.6-.59,1.3-.45,2.6-.9,3.85-1.44,1.45-.62,2.85-1.32,4.23-2.04.27-.14.55-.25.81-.39,10.27-5.54,18.56-13.86,24.07-24.06.29-.53.52-1.09.79-1.63.57-1.13,1.15-2.24,1.64-3.41.44-1.03.81-2.11,1.19-3.17.28-.77.59-1.52.84-2.31.21-.67.37-1.37.56-2.05,1.39-4.9,2.27-10.04,2.47-15.42l29.64,29.18-59.89,59.99Z"/><polygon points=".4 180.23 60.26 239.84 89.87 210.08 30.05 150.26 .4 180.23"/>'},{id:"ahn-nagyeong",name:"\uC548\uB098\uACBD",viewBox:"-14 -14 268 268",color:"#ccebf5",svg:'<path d="M214.99,133.31h-55.09l-13.31-13.31,13.31-13.31h55.09l13.31,13.31-13.31,13.31ZM120,139.01l-19.01-19.01,19.01-19.01,19.01,19.01-19.01,19.01ZM106.69,214.99v-55.09l13.31-13.31,13.31,13.31v55.09l-13.31,13.31-13.31-13.31ZM133.31,80.1l-13.31,13.31-13.31-13.31V25.01l13.31-13.31,13.31,13.31v55.09ZM80.1,106.69l13.31,13.31-13.31,13.31H25.01l-13.31-13.31,13.31-13.31h55.09Z"/>'},{id:"kim-minjae",name:"\uAE40\uBBFC\uC7AC",viewBox:"-14 -14 268 268",color:"#b5b5b5",svg:'<path d="M160,80.01V0h80v80h-80ZM240,240.01h-80v-80h80v80ZM0,80.01V0h80v80H0ZM80,80.01h80v80h-80v-80ZM80,240.01H0v-80h80v80Z"/>'},{id:"nam-nayoung",name:"\uB0A8\uB098\uC601",viewBox:"-14 -14 268 268",color:"#f2f070",svg:'<path d="M-.22-.05h120L-.22,119.95V-.05ZM-.22,119.95l120,120,120-120L119.78-.05h120v240H-.22v-120Z"/>'},{id:"jo-eungyo",name:"\uC870\uC740\uAD50",viewBox:"-14 -14 268 268",color:"#ffd834",svg:'<path d="M.34,-.66h60v30h-30v30h-30ZM180.34,-.66h60v60h-30v-30h-30ZM.34,179.34h30v30h30v30h-60ZM210.34,179.34h30v60h-60v-30h30Z"/><polygon points="120.34 50.91 188.77 119.34 120.34 187.77 51.91 119.34"/>'},{id:"song-yujin",name:"\uC1A1\uC720\uC9C4",viewBox:"-14 -14 268 268",color:"#4df4ff",svg:'<polygon points="117.34 68.5 67.06 17.22 16.13 68.38 67.4 118.43 66.86 68.43 117.34 68.5"/><polygon points="117.96 170.13 168.66 119.44 117.34 68.5 67.4 118.43 15.94 170.09 66.83 221.24 117.42 170.52 66.82 170.16 67.05 119.58 117.96 170.13"/><polygon points="169.2 118.7 219.73 68.39 168.7 17.38 118.3 68.23 168.73 68.47 169.2 118.7"/><polygon points="169.04 119.85 168.73 170.27 118.35 170.54 169.01 221.12 219.83 170.04 169.04 119.85"/>'},{id:"kim-jiyoo-phishing-ddook",name:"\uAE40\uC9C0\uC720",viewBox:"-14 -14 268 268",color:"#e5903a",svg:'<path d="M120,240L0,120,120,0l120,120-120,120ZM120,200l80-80L120,40,40,120l80,80ZM86.67,120l33.33-33.33,33.33,33.33-33.33,33.33-33.33-33.33Z"/>'},{id:"son-yejin",name:"\uC190\uC608\uC9C4",viewBox:"-14 -14 268 268",color:"#536dea",svg:'<path d="M-.16.02v84h24V24.02h60V.02H-.16ZM215.84,24.02v60h24V.02h-84v24h60ZM-.16,156.02v84h84v-24H23.84v-60H-.16ZM155.84,240.02h84v-84h-24v60h-60v24Z" fill-rule="evenodd"/><path d="M134.2,52.94v-12.41h-33.1v12.41h33.1ZM51.45,135.69v-33.1h-12.41v33.1h12.41ZM196.26,135.69v-33.1h-12.41v33.1h12.41ZM134.2,197.75v-12.41h-33.1v12.41h33.1ZM107.31,119.14l10.34,10.34,10.34-10.34-10.34-10.34-10.34,10.34Z" fill-rule="evenodd"/>'},{id:"lim-jongwon",name:"\uC784\uC885\uC6D0",viewBox:"-14 -14 268 268",color:"#e1ff85",svg:'<path d="M185.28,54.89V0H54.89v54.89H0v130.4h54.89v54.72h130.4v-54.72h54.72V54.89h-54.72ZM174.65,65.35v109.29h-109.29v-109.29h109.29Z"/><rect x="11.18" y="11.1" width="32.76" height="32.76" transform="translate(-11.36 27.54) rotate(-45)"/><rect x="196.32" y="11.1" width="32.76" height="32.76" transform="translate(42.87 158.45) rotate(-45)"/><rect x="11.18" y="196.15" width="32.76" height="32.76" transform="translate(-142.21 81.74) rotate(-45)"/><rect x="196.32" y="196.15" width="32.76" height="32.76" transform="translate(-87.99 212.65) rotate(-45)"/>'},{id:"min-jiho",name:"\uBBFC\uC9C0\uD638",viewBox:"-14 -14 268 268",color:"#ccbbff",svg:'<path d="M147.49,226.94c-18.22,4.31-36.68,4.41-54.83-.04l-.37-39.62-28.41,27.73c-16.16-9.95-29.35-22.77-38.62-39.01l27.64-27.94-39.36-.16c-4.66-18.12-4.75-36.64-.06-54.89l39.15-.75-27.35-27.48c8.94-16.19,22.16-29.2,38.62-39.16l28.46,27.74.28-39.66c17.76-4.47,36.14-4.27,54.62-.15l.46,39.77,27.91-27.59c16.46,8.86,29.04,22.27,39.13,38.6l-27.8,28.38,39.61.27c4.61,18.3,4.51,36.73-.08,54.91l-39.38.16,27.31,27.6c-.72,4.91-4.8,7.03-7.05,10.45-7.92,12.07-18.69,20.97-31.46,29.04l-28.21-27.81-.23,39.59ZM120.18,158.92l38.48-38.99-38.52-38.51,27.06-27.57c-17.66-7.1-36.59-7.08-54.26-.02l26.77,27.6-38.57,38.91,39.04,38.58ZM80.77,119.63l-27.24-26.71c-6.95,18.14-7.39,36.73.18,54.69l27.06-27.98ZM186.53,147.42c7.11-18.42,7.12-36.4-.17-54.33l-27.4,27.21,27.57,27.11ZM147.01,186.41l-26.94-27.47-27.28,27.79c18.36,7.27,37.58,7.31,54.22-.32Z"/>'},{id:"ju-bomin",name:"\uC8FC\uBCF4\uBBFC",viewBox:"-14 -14 268 268",color:"#3f66b5",svg:'<path d="M119.99,7.85l-.25-7.85h28.3l.21,6.01.57,5.98.99,5.94,1.38,5.87,1.73,5.77,2.12,5.62,2.48,5.48,2.83,5.31,3.18,5.09,3.5,4.92,3.82,4.63,4.14,4.39,4.39,4.14,4.63,3.82,4.92,3.5,5.09,3.18,5.31,2.83,5.48,2.48,5.62,2.12,5.77,1.73,5.87,1.38,5.94.99,5.98.57,6.01.21v28.3l-7.85-.25-7.85-.78-7.75-1.27-7.68-1.8-7.53-2.26-7.36-2.79-7.18-3.25-6.93-3.71-6.68-4.14-6.4-4.6-6.08-4.99-5.73-5.38-5.38-5.73-4.99-6.08-4.6-6.4-4.14-6.68-3.71-6.93-3.25-7.18-2.79-7.36-2.26-7.53-1.8-7.68-1.27-7.75-.78-7.85ZM240,120.12v28.21l-5.99.21-5.96.56-5.92.99-5.85,1.38-5.75,1.73-5.61,2.12-5.47,2.47-5.29,2.82-5.08,3.17-4.9,3.49-4.62,3.81-4.37,4.13-4.13,4.37-3.81,4.62-3.49,4.9-3.17,5.08-2.82,5.29-2.47,5.47-2.12,5.61-1.73,5.75-1.38,5.85-.99,5.92-.56,5.96-.21,5.99h-28.21l.25-7.83.78-7.83,1.27-7.72,1.8-7.65,2.26-7.51,2.79-7.33,3.24-7.16,3.7-6.91,4.13-6.66,4.58-6.38,4.97-6.06,5.36-5.71,5.71-5.36,6.06-4.97,6.38-4.58,6.66-4.13,6.91-3.7,7.16-3.24,7.33-2.79,7.51-2.26,7.65-1.8,7.72-1.27,7.83-.78,7.83-.25ZM7.83,119.65l-7.83.25v-28.21l5.99-.21,5.96-.56,5.92-.99,5.85-1.38,5.75-1.73,5.61-2.12,5.47-2.47,5.29-2.82,5.08-3.17,4.9-3.49,4.62-3.81,4.37-4.13,4.13-4.37,3.81-4.62,3.49-4.9,3.17-5.08,2.82-5.29,2.47-5.47,2.12-5.61,1.73-5.75,1.38-5.85.99-5.92.56-5.96.21-5.99h28.21l-.25,7.83-.78,7.83-1.27,7.72-1.8,7.65-2.26,7.51-2.79,7.34-3.24,7.16-3.7,6.91-4.13,6.67-4.58,6.38-4.97,6.07-5.36,5.71-5.71,5.36-6.07,4.97-6.38,4.58-6.67,4.13-6.91,3.7-7.16,3.24-7.34,2.79-7.51,2.26-7.65,1.8-7.72,1.27-7.83.78ZM116.34,208.83l1.81,7.69,1.28,7.76.78,7.86.25,7.86h-28.34l-.21-6.02-.57-5.99-.99-5.95-1.38-5.88-1.74-5.77-2.13-5.63-2.48-5.49-2.83-5.31-3.19-5.1-3.51-4.92-3.83-4.64-4.14-4.39-4.39-4.14-4.64-3.83-4.92-3.51-5.1-3.19-5.31-2.83-5.49-2.48-5.63-2.13-5.77-1.74-5.88-1.38-5.95-.99-5.99-.57-6.02-.21v-28.34l7.86.25,7.86.78,7.76,1.28,7.69,1.81,7.55,2.27,7.37,2.8,7.19,3.26,6.94,3.72,6.7,4.14,6.41,4.61,6.09,4.99,5.74,5.38,5.38,5.74,4.99,6.09,4.61,6.41,4.14,6.7,3.72,6.94,3.26,7.19,2.8,7.37,2.27,7.55Z"/>'},{id:"ham-daeyeon",name:"\uD568\uB300\uC5F0",viewBox:"-14 -14 268 268",color:"#7f1616",svg:'<path d="M10.63,46.9l5.01-6.97,4.66-5.72,99.7,85.8L20.3,205.8l-4.66-5.72-5.01-6.97-4.55-7.32-4.05-7.61-2.03-4.44,6.51-2.7,3.27-1.74,6.19-4.16,5.58-4.91,4.91-5.58,2.17-3.02,1.99-3.16,3.27-6.68,2.38-7.04.85-3.63,1-7.36v-7.47l-1-7.36-.85-3.63-2.38-7.04-3.27-6.68-4.16-6.19-4.91-5.58-5.58-4.91-6.19-4.16-3.27-1.74-6.51-2.7,2.03-4.44,4.05-7.61,4.55-7.32ZM120,120L34.2,20.3l5.72-4.66,6.97-5.01,7.32-4.55,7.61-4.05,4.44-2.03,2.7,6.51,1.74,3.27,4.16,6.19,2.35,2.88,5.26,5.26,5.9,4.52,6.44,3.73,3.41,1.53,7.04,2.38,3.63.85,7.36,1h7.47l7.36-1,7.18-1.92,6.9-2.84,3.27-1.74,6.19-4.16,5.58-4.91,4.91-5.58,4.16-6.19,1.74-3.27,2.7-6.51,4.44,2.03,7.61,4.05,7.32,4.55,6.97,5.01,5.72,4.66-85.8,99.7,99.7-85.8,4.66,5.72,5.01,6.97,4.55,7.32,4.05,7.61,2.03,4.44-6.51,2.7-3.27,1.74-6.19,4.16-2.88,2.35-5.26,5.26-4.52,5.9-3.73,6.44-1.53,3.41-2.38,7.04-.85,3.63-1,7.36v7.47l1,7.36,1.92,7.18,1.32,3.48,3.27,6.68,4.16,6.19,4.91,5.58,5.58,4.91,6.19,4.16,3.27,1.74,6.51,2.7-2.03,4.44-4.05,7.61-4.55,7.32-5.01,6.97-4.66,5.72-99.7-85.8,85.8,99.7-5.72,4.66-6.97,5.01-7.32,4.55-7.61,4.05-4.44,2.03-2.7-6.51-1.74-3.27-4.16-6.19-4.91-5.58-2.7-2.56-5.9-4.52-3.16-1.99-6.68-3.27-7.04-2.38-3.63-.85-7.36-1h-7.47l-7.36,1-7.18,1.92-3.48,1.32-6.68,3.27-6.19,4.16-5.58,4.91-4.91,5.58-4.16,6.19-1.74,3.27-2.7,6.51-4.44-2.03-7.61-4.05-7.32-4.55-6.97-5.01-5.72-4.66,85.8-99.7Z"/>'},{id:"youn-taegyun",name:"\uC724\uD0DC\uADE0",viewBox:"-14 -14 268 268",color:"#ffce07",svg:'<path d="M133.33,106.67V0h106.67v40h-66.67v26.67h66.67v40h-106.67ZM133.33,240v-106.67h106.67v40h-66.67v26.67h66.67v40h-106.67ZM106.67,0v106.67H0v-40h66.67v-26.67H0V0h106.67ZM106.67,133.33v106.67H0v-40h66.67v-26.67H0v-40h106.67Z"/>'},{id:"lee-goeun",name:"\uC774\uACE0\uC740",viewBox:"-14 -14 268 268",color:"#eec35a",svg:'<path d="M127.82,239.42c-11.17.29-24.5.07-37.02-3.38l-.14-39.9c0-.58.82-1.54.39-2.55-.45-1.05-2.12-1.08-2.71-.16l-1.4,2.18-27.29,27.56c-17.98-10.36-32.02-24.86-42.67-42.62l29.83-30.25-42.63-.51c-4.91-20.02-5.03-40.34.04-59.96l42.82-.46-29.97-30.57c10.56-17.82,24.8-31.85,42.57-42.56l30.66,30.52.25-43.23c19.79-5.1,40.03-5.06,59.83.03l.14,43.46,30.97-30.75c17.48,10.61,31.85,24.8,42.38,42.5l-29.78,30.41,42.58.61c5.16,19.69,4.91,39.94.05,60.05l-42.46.44c9.71,10.68,19.1,19.49,29.62,29.87-9.83,17.85-24.56,32.39-42.46,42.97l-30.62-30.2-.39,42.78c-6.55,2.14-13.28,3.49-19.64,3.57M90.64,149.62l-.02-59.69,59.65-.05.34,60.11,41.24-.37-28.61-29.84,28.92-29.62-41.7-.43-.37-41.55-29.89,29.13-29.34-28.93-.35,41.52-42.55.38,29.88,29.71-29.55,29.83,41.95.33c.21-.24.43-.39.39-.52ZM91.87,150.04c-.31.54-.71.93-1.24,1.24l.15,40.67,29.69-29.58,29.55,28.9.26-41.3-58.42.05Z"/>'},{id:"ju-yejin",name:"\uC8FC\uC608\uC9C4",viewBox:"-14 -14 268 268",color:"#d5c8ac",svg:'<path d="M.34.26v30h30V.26H.34ZM60.34,30.26V.26l-30,30h30ZM.34,60.26h30v-30L.34,60.26ZM90.34,90.26l-30,30,30,30,30,30,30-30,30-30-30-30-30-30-30,30ZM30.34,180.26H.34l30,30v-30ZM30.34,210.26H.34v30h30v-30ZM60.34,240.26v-30h-30l30,30ZM180.34.26v30h30L180.34.26ZM210.34,30.26h30V.26h-30v30ZM210.34,60.26h30l-30-30v30ZM240.34,180.26h-30v30l30-30ZM180.34,210.26v30l30-30h-30ZM240.34,240.26v-30h-30v30h30Z" fill-rule="evenodd"/>'},{id:"jo-wooseong",name:"\uC870\uC6B0\uC131",viewBox:"-14 -14 268 268",color:"#72a7c1",svg:'<path d="M240,86.31v25.26h-88.42v-23.15h-23.15V0h25.26v86.31h86.31ZM240,128.43v25.26h-86.31v86.31h-25.26v-88.42h23.15v-23.15h88.42ZM98.94,141.06v-42.13h42.13v42.13h-42.13ZM0,86.31h86.31V0h25.26v88.42h-23.15v23.15H0v-25.26ZM86.31,153.69H0v-25.26h88.42v23.15h23.15v88.42h-25.26v-86.31Z"/>'},{id:"kim-hawon",name:"\uAE40\uD558\uC6D0",viewBox:"-14 -14 268 268",color:"#e692ff",svg:'<path d="M35.94,240.06c.13-43.47,37.43-78.68,83.43-78.68s83.31,35.2,83.43,78.68h36.57c-.13-62.57-53.8-113.25-120-113.25S-.5,177.5-.63,240.06h36.57Z"/><path d="M61.88,240.06h26.26c.13-16.21,14.06-29.31,31.24-29.31s31.11,13.1,31.24,29.31h26.26c-.13-29.92-25.82-54.14-57.49-54.14s-57.37,24.22-57.49,54.14Z"/><path d="M202.81.06c-.13,43.47-37.43,78.68-83.43,78.68S36.06,43.53,35.94.06H-.63c.13,62.57,53.8,113.25,120,113.25S239.25,62.63,239.37.06h-36.57Z"/><path d="M176.87.07h-26.26c-.13,16.21-14.06,29.31-31.24,29.31S88.27,16.28,88.14.07h-26.26c.13,29.92,25.82,54.14,57.49,54.14S176.74,29.99,176.87.07Z"/>'},{id:"song-seungbin",name:"\uC1A1\uC2B9\uBE48",viewBox:"-14 -14 268 268",color:"#ffc5c8",svg:'<path d="M240,120l-30.56,30.53-30.53-30.53,30.53-30.53,30.56,30.53ZM82.92,135.28v-30.56l21.79-21.79h30.56l21.79,21.79v30.56l-21.79,21.79h-30.56l-21.79-21.79ZM120,61.1l-30.53-30.53L120,0l30.53,30.56-30.53,30.53ZM150.53,209.44l-30.53,30.56-30.53-30.56,30.53-30.53,30.53,30.53ZM30.56,150.53L0,120l30.56-30.53,30.53,30.53-30.53,30.53Z"/>'},{id:"park-yoonji",name:"\uBC15\uC724\uC9C0",viewBox:"-14 -14 268 268",color:"#065182",svg:'<path d="M60.34,60.26h120v-30h-30V.26h-60v30h-30v30ZM.34,120.26v30h30v30h30V60.26h-30v30H.34v30ZM180.34,120.26v60h30v-30h30v-60h-30v-30h-30v60ZM60.34,210.26h30v30h60v-30h30v-30H60.34v30Z" fill-rule="evenodd"/>'},{id:"kim-jiyoon",name:"\uAE40\uC9C0\uC724",viewBox:"-14 -14 268 268",color:"#ff7154",svg:'<path d="M193.67.12h46.33v46.33h-46.33V.12ZM240,240.12h-46.33v-46.33h46.33v46.33ZM90.54,132.75v-25.26l16.83-16.83h25.26l16.83,16.83v25.26l-16.83,16.83h-25.26l-16.83-16.83ZM46.33.12v46.33H0V.12h46.33ZM46.33,193.79v46.33H0v-46.33h46.33Z"/>'},{id:"noh-minyeong",name:"\uB178\uBBFC\uC601",viewBox:"-14 -14 268 268",color:"#c4272f",svg:'<path d="M153.33,26.67V0h86.67v86.67h-26.67V26.67h-60ZM153.33,240v-26.67h60v-60h26.67v86.67h-86.67ZM153.33,63.33v-20h43.33v43.33h-20v-23.33h-23.33ZM153.33,196.67v-20h23.33v-23.33h20v43.33h-43.33ZM0,153.33h26.67v60h60v26.67H0v-86.67ZM26.67,86.67H0V0h86.67v26.67H26.67v60ZM43.33,153.33h20v23.33h23.33v20h-43.33v-43.33ZM63.33,86.67h-20v-43.33h43.33v20h-23.33v23.33Z"/>'},{id:"kwon-minseong",name:"\uAD8C\uBBFC\uC131",viewBox:"-14 -14 268 268",color:"#4f00b4",svg:'<circle cx="119.84" cy="118.02" r="13.21"/><path d="M240.1,95.81V-.17S141.63-.17,141.63-.17c49.47,8.76,88.67,47.03,98.48,95.98Z"/><path d="M141.63,239.83h98.48v-95.98c-9.81,48.95-49.01,87.22-98.48,95.98Z"/><path d="M98.58-.17H.1v95.98C9.91,46.86,49.12,8.59,98.58-.17Z"/><path d="M.1,143.85v95.98h98.48C49.12,231.07,9.91,192.79.1,143.85Z"/>'},{id:"kim-hyejin",name:"\uAE40\uD61C\uC9C4",viewBox:"-14 -14 268 268",color:"#178466",svg:'<path d="M132.22,10l97.78,97.78h-97.78V10ZM230,132.22l-97.78,97.78v-97.78h97.78ZM10,107.78L107.78,10v97.78H10ZM107.78,230L10,132.22h97.78v97.78Z"/>'},{id:"yoo-hyejin",name:"\uC720\uD61C\uC9C4",viewBox:"-14 -14 268 268",color:"#8bff6c",svg:'<path d="M150.51,221.71l26.55-26.55-26.55-26.52,18.21-18.21,26.52,26.55,26.55-26.55,18.21,18.21-26.55,26.52,26.55,26.55-18.21,18.21-26.55-26.55-26.52,26.55-18.21-18.21ZM195.24,62.86l-26.52,26.55-18.21-18.21,26.55-26.52-26.55-26.55L168.72-.08l26.52,26.55L221.8-.08l18.21,18.21-26.55,26.55,26.55,26.52-18.21,18.21-26.55-26.55ZM44.77,176.97l26.52-26.55,18.21,18.21-26.55,26.52,26.55,26.55-18.21,18.21-26.52-26.55-26.55,26.55L0,221.71l26.55-26.55L0,168.63l18.21-18.21,26.55,26.55ZM89.5,18.12l-26.55,26.55,26.55,26.52-18.21,18.21-26.52-26.55-26.55,26.55L0,71.2l26.55-26.52L0,18.12,18.21-.08l26.55,26.55L71.29-.08l18.21,18.21Z"/>'},{id:"kim-sungeun",name:"\uAE40\uC131\uC740",viewBox:"-14 -14 268 268",color:"#a8f0db",svg:'<path d="M240,0v40L200,0h40ZM240,240h-40l40-40v40ZM193.33,120l26.67,26.67-26.67,26.67-53.33-53.33,53.33-53.33,26.67,26.67-26.67,26.67ZM120,46.67l26.67-26.67,26.67,26.67-53.33,53.33-53.33-53.33,26.67-26.67,26.67,26.67ZM120,193.33l-26.67,26.67-26.67-26.67,53.33-53.33,53.33,53.33-26.67,26.67-26.67-26.67ZM46.67,120l-26.67-26.67,26.67-26.67,53.33,53.33-53.33,53.33-26.67-26.67,26.67-26.67ZM0,0h40L0,40V0ZM0,240v-40l40,40H0Z"/>'},{id:"park-yuna",name:"\uBC15\uC724\uC544",viewBox:"-14 -14 268 268",color:"#bdffbf",svg:'<path d="M225.26,134.66h-18.95l-14.72-14.75,14.72-14.75h18.95l14.75,14.75-14.75,14.75ZM120,183.07l-63.16-63.16,63.16-63.16,63.16,63.16-63.16,63.16ZM105.26,225.17v-18.95l14.75-14.72,14.75,14.72v18.95l-14.75,14.75-14.75-14.75ZM134.75,33.61l-14.75,14.72-14.75-14.72V14.66L120-.08l14.75,14.75v18.95ZM33.7,105.17l14.72,14.75-14.72,14.75H14.75L0,119.92l14.75-14.75h18.95Z"/>'},{id:"go-biju",name:"\uACE0\uBE44\uC8FC",viewBox:"-14 -14 268 268",color:"#50c4a6",svg:'<path d="M167.3,9.57l-.47-4.77-.17-4.8h73.33v73.33l-4.8-.17-4.77-.47-4.73-.77-4.67-1.1-4.6-1.4-4.5-1.67-4.37-2-4.23-2.27-4.07-2.53-3.9-2.8-3.73-3.03-3.5-3.27-3.27-3.5-3.03-3.73-2.8-3.9-2.53-4.07-2.27-4.23-2-4.37-1.67-4.5-1.4-4.6-1.1-4.67-.77-4.73ZM235.2,166.83l4.8-.17v73.33h-73.33l.17-4.8.47-4.77.77-4.73,1.1-4.67,1.4-4.6,1.67-4.5,2-4.37,2.27-4.23,2.53-4.07,2.8-3.9,3.03-3.73,3.27-3.5,3.5-3.27,3.73-3.03,3.9-2.8,4.07-2.53,4.23-2.27,4.37-2,4.5-1.67,4.6-1.4,4.67-1.1,4.73-.77,4.77-.47ZM163.33,120l-.37,5.67-1.1,5.53-.83,2.73-2.17,5.23-1.33,2.5-1.5,2.4-3.47,4.5-4,4-2.2,1.8-4.7,3.17-2.5,1.33-5.23,2.17-2.73.83-5.53,1.1-2.83.27-2.83.1-5.67-.37-2.8-.47-5.47-1.47-2.63-1-5.1-2.5-4.7-3.17-2.2-1.8-4-4-1.8-2.2-3.17-4.7-1.33-2.5-2.17-5.23-.83-2.73-1.1-5.53-.27-2.83-.1-2.83.37-5.67,1.1-5.53.83-2.73,1-2.63,2.5-5.1,3.17-4.7,1.8-2.2,4-4,2.2-1.8,2.3-1.67,4.9-2.83,2.6-1.17,5.37-1.83,5.53-1.1,2.83-.27,2.83-.1,5.67.37,5.53,1.1,2.73.83,2.63,1,5.1,2.5,2.4,1.5,4.5,3.47,4,4,1.8,2.2,1.67,2.3,2.83,4.9,2.17,5.23.83,2.73,1.1,5.53.37,5.67ZM9.57,72.7l-4.77.47-4.8.17V0h73.33l-.17,4.8-.47,4.77-.77,4.73-1.1,4.67-1.4,4.6-1.67,4.5-2,4.37-2.27,4.23-2.53,4.07-2.8,3.9-3.03,3.73-3.27,3.5-3.5,3.27-3.73,3.03-3.9,2.8-4.07,2.53-4.23,2.27-4.37,2-4.5,1.67-4.6,1.4-4.67,1.1-4.73.77ZM70.83,221.03l1.1,4.67.77,4.73.47,4.77.17,4.8H0v-73.33l4.8.17,4.77.47,4.73.77,4.67,1.1,4.6,1.4,4.5,1.67,4.37,2,4.23,2.27,4.07,2.53,3.9,2.8,3.73,3.03,3.5,3.27,3.27,3.5,3.03,3.73,2.8,3.9,2.53,4.07,2.27,4.23,2,4.37,1.67,4.5,1.4,4.6Z"/>'},{id:"kim-dahyun",name:"\uAE40\uB2E4\uD604",viewBox:"-14 -14 268 268",color:"#d33bff",svg:'<path d="M119.27,104.35l.77,7.83.27,7.83.27-7.83.77-7.83,1.27-7.73,1.8-7.67,2.27-7.5,2.77-7.37,3.23-7.13,3.7-6.93,4.17-6.67,4.57-6.4,4.97-6.07,5.37-5.73,5.73-5.37,6.07-4.97,6.4-4.57,6.67-4.17,6.93-3.7,7.13-3.23,7.37-2.77,7.5-2.27,7.67-1.8,7.73-1.27,7.83-.77,7.83-.27v240l-7.83-.27-7.83-.77-7.73-1.27-7.67-1.8-7.5-2.27-7.37-2.77-7.13-3.23-6.93-3.7-6.67-4.17-6.4-4.57-6.07-4.97-5.73-5.37-5.37-5.73-4.97-6.07-4.57-6.4-4.17-6.67-3.7-6.93-3.23-7.13-2.77-7.37-2.27-7.5-1.8-7.67-1.27-7.73-.77-7.83-.27-7.83-.27,7.83-.77,7.83-1.27,7.73-1.8,7.67-2.27,7.5-2.77,7.37-3.23,7.13-3.7,6.93-4.17,6.67-4.57,6.4-4.97,6.07-5.37,5.73-5.73,5.37-6.07,4.97-6.4,4.57-6.67,4.17-6.93,3.7-7.13,3.23-7.37,2.77-7.5,2.27-7.67,1.8-7.73,1.27-7.83.77-7.83.27V.02l7.83.27,7.83.77,7.73,1.27,7.67,1.8,7.5,2.27,7.37,2.77,7.13,3.23,6.93,3.7,6.67,4.17,6.4,4.57,6.07,4.97,5.73,5.37,5.37,5.73,4.97,6.07,4.57,6.4,4.17,6.67,3.7,6.93,3.23,7.13,2.77,7.37,2.27,7.5,1.8,7.67,1.27,7.73Z"/>'}];var oM=jo.filter(({color:i})=>{let[e,t,n]=i.slice(1).match(/../g).map(s=>{let r=parseInt(s,16)/255;return r<=.04045?r/12.92:((r+.055)/1.055)**2.4});return 1.05/(.2126*e+.7152*t+.0722*n+.05)>=2.3});function Bl(){let i=new Set;return e=>{let t=oM.filter(s=>!i.has(s.color)),n=t[Math.floor(Math.random()*t.length)];e.icon&&i.delete(e.icon.color),i.add(n.color),e.icon=n,e.word.style.setProperty("--keyword-color",n.color),e.glyph.dataset.iconId=n.id,e.glyph.innerHTML=`<svg viewBox="${n.viewBox}" fill="currentColor" aria-hidden="true">${n.svg}</svg>`}}function zl(i,e){let t=e.matches?[{opacity:0},{opacity:1,offset:.25},{opacity:0}]:[{opacity:0,transform:"translate(0,.12em) rotate(-12deg) scale(.25)"},{opacity:1,transform:"translate(.18em,-.28em) rotate(14deg) scale(1.25)",offset:.25},{opacity:1,transform:"translate(.28em,-.12em) rotate(30deg) scale(.90)",offset:.55},{opacity:0,transform:"translate(.42em,-.30em) rotate(48deg) scale(.20)"}];return i.animate(t,{duration:e.matches?240:480,easing:"cubic-bezier(.22,.7,.3,1)"})}var vd=i=>Math.max(0,Math.min(1,i));function Bm(i,e){let t=Bl(),n=[...i.querySelectorAll("[data-keyword]")].map(p=>{let M=p.querySelector("[data-read]"),v=document.createElement("span");v.className="keyword-pop",v.setAttribute("aria-hidden","true"),M.append(v);let y={row:p,word:M,glyph:v,completed:!1,animation:null,started:!1,recolor:!1,icon:null};return t(y),y}),s=i.querySelector(".reading-line:not([data-keyword]) [data-read]");Fl(i.querySelector(".individuality-title"),e);let r=n.length+.7,o=0,a=0,c=0,l=0,h=!1,u=null;function d(p){p&&(p.animation?.cancel(),p.animation=null,p.completed&&(p.row.dataset.phase="complete"),u===p&&(u=null))}function f(p){d(u);let M=p.word.getBoundingClientRect();if(M.bottom<=70||M.top>=innerHeight)return;u=p;let v=zl(p.glyph,e);p.animation=v,p.row.dataset.phase="pop",v.onfinish=()=>{p.animation===v&&d(p)}}function m(p=!0){let M=a*r;n.forEach((v,y)=>{let E=M-y,w=vd(E/.52);E<=0?(v.started&&(v.recolor=!0),v.started=!1):v.started||(v.recolor&&t(v),v.started=!0,v.recolor=!1),v.word.style.setProperty("--read-fill",`${w*100}%`),w<1?(d(v),v.completed=!1,v.row.dataset.phase=E<=0?"waiting":"text"):v.completed||(v.completed=!0,p&&f(v)),w===1&&(v.row.dataset.phase=v.animation?"pop":"complete")}),s.style.setProperty("--read-fill",`${vd((M-n.length)/.7)*100}%`)}function _(p){let M=Math.min(.05,(p-l)/1e3||.016666666666666666);l=p,a+=(o-a)*(1-Math.exp(-M/.09)),Math.abs(o-a)<5e-5&&(a=o),m(),c=a===o?0:requestAnimationFrame(_)}function g(p){o=vd(p);let M=i.getBoundingClientRect(),v=M.bottom<=0||M.top>=innerHeight;if(!h||v||e.matches){c&&cancelAnimationFrame(c),c=0,v&&d(u),a=o,m(h&&!v),h=!0;return}!c&&a!==o&&(l=performance.now(),c=requestAnimationFrame(_))}return e.addEventListener("change",()=>{d(u),g(o)}),m(!1),{update:g}}var Md=.65,zm=.9,aM=i=>{let e=Math.max(0,Math.min(1,i));return e*e*(3-2*e)};function km(i,e){let t=Bl(),n=new Map,s=null;i.forEach((a,c)=>{let l=a.querySelector("[data-caption-keyword]");if(!l)return;let h=document.createElement("span"),u=document.createElement("span");h.className="caption-keyword-color",h.dataset.label=l.textContent,h.setAttribute("aria-hidden","true"),u.className="keyword-pop",u.setAttribute("aria-hidden","true"),l.append(h,u);let d={word:l,glyph:u,icon:null,started:!1,recolor:!1,completed:!1,animation:null};t(d),n.set(c,d)});function r(a){a&&(a.animation?.cancel(),a.animation=null,s===a&&(s=null))}function o(a){r(s);let c=a.word.getBoundingClientRect();if(c.bottom<=70||c.top>=innerHeight)return;s=a;let l=zl(a.glyph,e);a.animation=l,l.onfinish=()=>{a.animation===l&&(r(a),a.word.dataset.phase="complete")}}return e.addEventListener("change",()=>{n.forEach(a=>{r(a),a.word.dataset.phase=a.completed?"complete":"color"})}),{update(a,c,l){let h=n.get(a);if(!h)return;let u=aM((c-Md)/zm);c<=Md?(h.started&&(h.recolor=!0),h.started=!1):h.started||(h.recolor&&t(h),h.started=!0,h.recolor=!1),h.word.style.setProperty("--keyword-tint",String(u)),u<1?(r(h),h.completed=!1):h.completed||(h.completed=!0,l>.9&&c<Md+zm+.55&&o(h)),l<.05&&r(h),h.word.dataset.phase=h.animation?"pop":u===1?"complete":u>0?"color":"waiting"}}}function Vm(i){let e=[...i.querySelectorAll(".construction-tool")],t=0,n=!1;function s(){e.forEach((r,o)=>{r.setAttribute("aria-pressed",String(n&&o===t)),r.tabIndex=n&&o===t?0:-1})}return e.forEach((r,o)=>{r.addEventListener("click",()=>{n&&(t=o,i.classList.add("is-tool-manual"),s())}),r.addEventListener("keydown",a=>{if(!n||a.altKey||a.ctrlKey||a.metaKey)return;let c=a.key==="ArrowRight"?(o+1)%e.length:a.key==="ArrowLeft"?(o+e.length-1)%e.length:a.key==="Home"?0:a.key==="End"?e.length-1:null;c!==null&&(a.preventDefault(),e.forEach((l,h)=>{l.tabIndex=h===c?0:-1}),e[c].focus({preventScroll:!0}))})}),s(),{update(r,o){r===0&&(t=0,i.classList.remove("is-tool-manual"));let a=r===1&&o<1;a!==n&&(n=a,!n&&i.contains(document.activeElement)&&document.activeElement.blur(),i.inert=!n,i.setAttribute("aria-hidden",String(!n)),i.classList.toggle("is-tool-selected",n),s())}}}var Hm=i=>Math.max(0,Math.min(1,i)),Dr=i=>{let e=Hm(i);return e*e*(3-2*e)},kl=[Yo,dl,_n[1].start,_n[2].start+1.5],Sd=sd-vl-id,bd=2.4,cM=Sd+bd;function Gm(){let i=Fm(),e=[...document.querySelectorAll("[data-caption]")],t=document.querySelector(".construction-bar"),n=Vm(t),s=document.querySelector(".hero-heading"),r=document.querySelector(".section-year"),o=matchMedia("(prefers-reduced-motion: reduce)");Fl(s,o,"[data-hover-text]");let a=km(e,o),c=document.querySelector("#content01"),l=Bm(c,o),h=-1,u=0;function d(){t.style.setProperty("--bar-scale",String(Math.min(1,Math.max(0,innerWidth-40)/308))),f()}function f(){for(let _ of[s,r]){let g=Dr((innerHeight*.64-_.getBoundingClientRect().top)/(innerHeight*.44));_.style.opacity=String((_===r?.7:1)*(1-g)),_.style.filter=`blur(${o.matches?0:g*12}px)`}u=Hm((innerHeight*.6-c.getBoundingClientRect().top)/innerHeight),l.update(u)}function m(_){i.setAutoHideProgress(Dr((_-Sd)/bd));let g=Dr((_-Yo)/.55),p=Dr((_-_n[1].start)/.55),M=g*(1-p);t.style.opacity=String(M),t.style.visibility=M>0?"visible":"hidden",t.style.transform=`translate(-50%,${o.matches?0:(1-g+p)*66}px) scale(var(--bar-scale,1))`,n.update(g,p),h=-1,kl.forEach((v,y)=>{_>=v&&(h=y)}),_>=cM&&(h=-1),e.forEach((v,y)=>{let E=Dr((_-kl[y])/.55),w=y===e.length-1,T=Dr((_-(w?Sd:kl[y+1]))/(w?bd:.55)),x=E*(1-T);v.style.opacity=String(x),v.style.filter=`blur(${o.matches?0:(1-E+T)*10}px)`,v.style.transform=`translateY(${o.matches?0:(1-E)*10-T*10}px)`,v.setAttribute("aria-hidden",String(y!==h)),a.update(y,_-kl[y],x)})}return addEventListener("scroll",f,{passive:!0}),addEventListener("resize",d),d(),m(0),{update:m,inspect:()=>({caption:h,reading:u,text:e[h]?.textContent.trim()})}}var Wm=new Rt,Vl=new U,Ur=class extends ys{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new ut(e,3)),this.setAttribute("uv",new ut(t,2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new Yi(t,6,1);return this.setAttribute("instanceStart",new fn(n,3,0)),this.setAttribute("instanceEnd",new fn(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new Yi(t,6,1);return this.setAttribute("instanceColorStart",new fn(n,3,0)),this.setAttribute("instanceColorEnd",new fn(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new To(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rt);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Wm.setFromBufferAttribute(t),this.boundingBox.union(Wm))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new dn),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Vl.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Vl)),Vl.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Vl));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}};be.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new ue},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Qt.line={uniforms:Go.merge([be.common,be.fog,be.line]),vertexShader:`
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
		`};var Or=class extends zt{constructor(e){super({type:"LineMaterial",uniforms:Go.clone(Qt.line.uniforms),vertexShader:Qt.line.vertexShader,fragmentShader:Qt.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};var Ed=new at,Xm=new U,qm=new U,kt=new at,Vt=new at,ci=new at,wd=new U,Td=new tt,Ht=new No,Zm=new U,Hl=new Rt,Gl=new dn,li=new at,hi,Ps;function Ym(i,e,t){return li.set(0,0,-e,1).applyMatrix4(i.projectionMatrix),li.multiplyScalar(1/li.w),li.x=Ps/t.width,li.y=Ps/t.height,li.applyMatrix4(i.projectionMatrixInverse),li.multiplyScalar(1/li.w),Math.abs(Math.max(li.x,li.y))}function lM(i,e){let t=i.matrixWorld,n=i.geometry,s=n.attributes.instanceStart,r=n.attributes.instanceEnd,o=Math.min(n.instanceCount,s.count);for(let a=0,c=o;a<c;a++){Ht.start.fromBufferAttribute(s,a),Ht.end.fromBufferAttribute(r,a),Ht.applyMatrix4(t);let l=new U,h=new U;hi.distanceSqToSegment(Ht.start,Ht.end,h,l),h.distanceTo(l)<Ps*.5&&e.push({point:h,pointOnLine:l,distance:hi.origin.distanceTo(h),object:i,face:null,faceIndex:a,uv:null,uv1:null})}}function hM(i,e,t){let n=e.projectionMatrix,r=i.material.resolution,o=i.matrixWorld,a=i.geometry,c=a.attributes.instanceStart,l=a.attributes.instanceEnd,h=Math.min(a.instanceCount,c.count),u=-e.near;hi.at(1,ci),ci.w=1,ci.applyMatrix4(e.matrixWorldInverse),ci.applyMatrix4(n),ci.multiplyScalar(1/ci.w),ci.x*=r.x/2,ci.y*=r.y/2,ci.z=0,wd.copy(ci),Td.multiplyMatrices(e.matrixWorldInverse,o);for(let d=0,f=h;d<f;d++){if(kt.fromBufferAttribute(c,d),Vt.fromBufferAttribute(l,d),kt.w=1,Vt.w=1,kt.applyMatrix4(Td),Vt.applyMatrix4(Td),kt.z>u&&Vt.z>u)continue;if(kt.z>u){let v=kt.z-Vt.z,y=(kt.z-u)/v;kt.lerp(Vt,y)}else if(Vt.z>u){let v=Vt.z-kt.z,y=(Vt.z-u)/v;Vt.lerp(kt,y)}kt.applyMatrix4(n),Vt.applyMatrix4(n),kt.multiplyScalar(1/kt.w),Vt.multiplyScalar(1/Vt.w),kt.x*=r.x/2,kt.y*=r.y/2,Vt.x*=r.x/2,Vt.y*=r.y/2,Ht.start.copy(kt),Ht.start.z=0,Ht.end.copy(Vt),Ht.end.z=0;let _=Ht.closestPointToPointParameter(wd,!0);Ht.at(_,Zm);let g=pt.lerp(kt.z,Vt.z,_),p=g>=-1&&g<=1,M=wd.distanceTo(Zm)<Ps*.5;if(p&&M){Ht.start.fromBufferAttribute(c,d),Ht.end.fromBufferAttribute(l,d),Ht.start.applyMatrix4(o),Ht.end.applyMatrix4(o);let v=new U,y=new U;hi.distanceSqToSegment(Ht.start,Ht.end,y,v),t.push({point:y,pointOnLine:v,distance:hi.origin.distanceTo(y),object:i,face:null,faceIndex:d,uv:null,uv1:null})}}}var Wl=class extends _t{constructor(e=new Ur,t=new Or({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,s=new Float32Array(2*t.count);for(let o=0,a=0,c=t.count;o<c;o++,a+=2)Xm.fromBufferAttribute(t,o),qm.fromBufferAttribute(n,o),s[a]=a===0?0:s[a-1],s[a+1]=s[a]+Xm.distanceTo(qm);let r=new Yi(s,2,1);return e.setAttribute("instanceDistanceStart",new fn(r,1,0)),e.setAttribute("instanceDistanceEnd",new fn(r,1,1)),this}raycast(e,t){let n=this.material.worldUnits,s=e.camera;if(s===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),n===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;hi=e.ray;let o=this.matrixWorld,a=this.geometry,c=this.material;Ps=c.linewidth+r,a.boundingSphere===null&&a.computeBoundingSphere(),Gl.copy(a.boundingSphere).applyMatrix4(o);let l;if(n)l=Ps*.5;else{let u=Math.max(s.near,Gl.distanceToPoint(hi.origin));l=Ym(s,u,c.resolution)}if(Gl.radius+=l,hi.intersectsSphere(Gl)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Hl.copy(a.boundingBox).applyMatrix4(o);let h;if(n)h=Ps*.5;else{let u=Math.max(s.near,Hl.distanceToPoint(hi.origin));h=Ym(s,u,c.resolution)}Hl.expandByScalar(h),hi.intersectsBox(Hl)!==!1&&(n?lM(this,t):hM(this,s,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(Ed),this.material.uniforms.resolution.value.set(Ed.z,Ed.w))}};function uM(i){let e=[],t=i.caster.height,n=t/2,s=(r,o)=>e.push(...r,...o);for(let r of i.caster.contours){let o=r.points.filter((a,c,l)=>!c||Math.hypot(a[0]-l[c-1][0],a[1]-l[c-1][1])>1e-5);o.length<3||(Math.hypot(o[0][0]-o.at(-1)[0],o[0][1]-o.at(-1)[1])<1e-5&&o.pop(),o.forEach((a,c)=>{let l=o[(c+o.length-1)%o.length],h=o[(c+1)%o.length];for(let f of[-n,n])s([a[0],f,a[1]],[h[0],f,h[1]]);let u=new ue(a[0]-l[0],a[1]-l[1]).normalize(),d=new ue(h[0]-a[0],h[1]-a[1]).normalize();u.dot(d)<.78&&s([a[0],-n,a[1]],[a[0],n,a[1]])}))}return new Ur().setPositions(e)}function Jm(i,e){let t=matchMedia("(prefers-reduced-motion: reduce)"),n=new Er({alpha:!0,antialias:!0,powerPreference:"low-power"});n.setClearColor(16777215,0),n.autoClear=!1,n.outputColorSpace=xt,n.domElement.className="hero-nebula-canvas",i.append(n.domElement);let s=new Zi(-1,1,1,-1,.1,4e3);s.position.z=2e3,s.lookAt(0,0,0);let r=new jn,o=ts(210426),a=[],c=e.map(x=>({source:x,outline:uM(x)})),l=new ze("#819098");for(let x=0;x<e.length*2;x++){let R=c[x*13%c.length],I=new Or({color:l,linewidth:.9,transparent:!0,opacity:.55,depthTest:!1,depthWrite:!1}),C=new Wl(R.outline,I);r.add(C),a.push({wire:C,asset:R,offset:o()+o()+o()-1.5,size:.64+o()*.95,pitch:(o()-.5)*.85,yaw:(o()-.5)*1.2,roll:(o()-.5)*Math.PI*2,speed:.008+o()*.004,spin:(o()-.5)*.07,seed:o()*Math.PI*2})}let h=1,u=1,d=0,f=0,m=0,_=!0,g=0,p=!1;function M(x){let R=h<650,I=e.length*(R?1:2),C=R?46:92,D=Math.max(C*2.25,h*.14);a.forEach((B,G)=>{let O=G<I;if(B.wire.visible=O,!O)return;let q=((G+.5)/I+x*B.speed)%1,H=(q*(h+D*2)-D)/h,k=Math.sin(Math.PI*Math.max(0,Math.min(1,H))),ie=Math.min(u*.2,h*.2)*(.48+.52*k),re=B.offset*ie+Math.sin(x*.25+B.seed)*ie*.1,xe=h*H-re*.36,ye=u*(.02+.72*H+.035*Math.sin(H*Math.PI*2))+re,Ue=C*B.size*(.8+.2*k);B.wire.position.set(xe-h/2,u/2-ye,Math.sin(B.seed)*80),B.wire.rotation.set(Math.PI/2+B.pitch+Math.sin(x*.13+B.seed)*.1,B.yaw,B.roll+x*B.spin),B.wire.scale.setScalar(Ue/B.asset.source.size)})}function v(){M(d),n.clear(),n.render(r,s),g++,i.classList.add("is-ready")}function y(x){if(m=0,!_||document.hidden)return;if(f&&x-f<32){m=requestAnimationFrame(y);return}let R=f?Math.min((x-f)/1e3,.1):1/60;f=x;let I=!p&&!t.matches;I&&(d+=R),v(),I&&(m=requestAnimationFrame(y))}function E(){!m&&_&&!document.hidden&&(f=0,m=requestAnimationFrame(y))}function w(){h=i.clientWidth,u=i.clientHeight;let x=Math.min(devicePixelRatio||1,1.75);n.setPixelRatio(x),n.setSize(h,u,!1),s.left=-h/2,s.right=h/2,s.top=u/2,s.bottom=-u/2,s.updateProjectionMatrix(),a.forEach(R=>{R.wire.material.linewidth=h<650?.8:.9}),v(),E()}return new IntersectionObserver(([x])=>{_=x.isIntersecting&&x.intersectionRatio>.001,_?E():(cancelAnimationFrame(m),m=0,f=0)},{threshold:.001}).observe(i),new ResizeObserver(w).observe(i),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(m),m=0):E()}),t.addEventListener("change",()=>{cancelAnimationFrame(m),m=0,E()}),w(),{inspect:()=>({ready:g>0,sourceCount:e.length,count:a.filter(x=>x.wire.visible).length,baseSize:h<650?46:92,elapsed:d,frames:g,visible:_,paused:!m,width:h,height:u,mode:"neutral-contour-stream"}),renderAt(x){p=!0,cancelAnimationFrame(m),m=0,d=x,v()},play(){p=!1,E()},exportPNG(){return v(),n.domElement.toDataURL("image/png")}}}function $m(i,e,t,n){let o=new WeakMap,a=[],c=0,l=0,h=!1,u={ready:!1,total:0,completed:0,batches:0,maxBatchMs:0,error:null},d=M=>Array.isArray(M.material)?M.material:[M.material],f=M=>[M.geometry?.uuid,...d(M).flatMap(v=>[v.uuid,v.version,v.map?.uuid,v.map?.version])].join(":");function m(M){let v=i.getViewport(new at),y=i.getScissor(new at),E=i.getScissorTest(),w=i.autoClear,T=e.background,x=t.layers.mask,R=new Map,I=new Map,C=new Map,D=B=>{R.has(B)||R.set(B,{visible:B.visible,mask:B.layers.mask,culled:B.frustumCulled})};try{i.autoClear=!1,e.background=null,i.setViewport(0,0,1,1),i.setScissor(0,0,1,1),i.setScissorTest(!0),t.layers.set(31),e.traverse(B=>{B.isLight&&(D(B),B.layers.enable(31))});for(let{object:B}of M){D(B),B.visible=!0,B.frustumCulled=!1,B.layers.enable(31);for(let O=B.parent;O;O=O.parent)D(O),O.visible=!0;for(let O of d(B))I.has(O)||I.set(O,{colorWrite:O.colorWrite,depthWrite:O.depthWrite}),O.colorWrite=!1,O.depthWrite=!1;let G=B.geometry;G&&!C.has(G)&&(C.set(G,{...G.drawRange}),G.setDrawRange(0,Math.min(3,G.index?.count||G.attributes.position.count)))}i.render(e,t)}finally{for(let[B,G]of C)B.setDrawRange(G.start,G.count);for(let[B,G]of I)Object.assign(B,G);for(let[B,G]of R)B.visible=G.visible,B.layers.mask=G.mask,B.frustumCulled=G.culled;t.layers.mask=x,e.background=T,i.autoClear=w,i.setViewport(v),i.setScissor(y),i.setScissorTest(E)}}function _(){l||h||!a.length||document.hidden||(l=window.requestIdleCallback?requestIdleCallback(g,{timeout:120}):setTimeout(g,16))}async function g(){if(l=0,h||document.hidden)return;h=!0;let M=c,v=a.splice(0,12);try{if(await Promise.all(v.map(({object:E})=>i.compileAsync(E,t,e))),M!==c)return;let y=performance.now();m(v),u.maxBatchMs=Math.max(u.maxBatchMs,performance.now()-y);for(let{object:E}of v)o.set(E,f(E));u.completed+=v.length,u.batches++,a.length||(u.ready=!0,n())}catch(y){M===c&&(u.error=String(y),a=[])}finally{h=!1,_()}}function p(){c++;let M=[];e.traverse(v=>{v.material&&(v.isMesh||v.isLine||v.isPoints||v.isSprite)&&M.push(v)}),a=M.filter(v=>o.get(v)!==f(v)).map(v=>({object:v})),a.sort((v,y)=>(v.object.isInstancedMesh?0:v.object.isMesh?1:2)-(y.object.isInstancedMesh?0:y.object.isMesh?1:2)),u={ready:a.length===0,total:M.length,completed:M.length-a.length,batches:0,maxBatchMs:0,error:null},_()}return document.addEventListener("visibilitychange",_),i.domElement.addEventListener("webglcontextrestored",()=>{o=new WeakMap,p()}),{prepare:p,inspect:()=>({...u,pending:u.total-u.completed})}}var Km=i=>Math.max(0,Math.min(1,i)),dM=i=>i*i*(3-2*i),fM=()=>typeof lenis>"u"?null:lenis;function jm(i,e){let t=window.MainIntro,n=i.closest(".animation-stage"),s=()=>i.clientHeight*.85,r=()=>t.anchor()-s(),o=0,a=0,c=0,l=-1/0,h=0;function u(M){let v=t.complete;t.progress=M,t.complete=M===1,document.body.classList.toggle("intro-before-main",!t.complete),n.style.visibility=t.complete?"hidden":"visible",document.getElementById("mainIntro").inert=t.complete,v!==t.complete&&window.dispatchEvent(new CustomEvent("main-intro-handoff",{detail:{complete:t.complete}}))}function d(){if(t.moving)return;let M=scrollY-r(),v=s();e(M<=1?0:M>=v-1?1:M/v)}async function f(M){let v=Km((scrollY-r())/s()),y=M?1:0;if(v===y&&!t.moving)return;let E=++a;cancelAnimationFrame(o),t.moving=!0;let w=fM();w?.stop();let T=window.MainWordSurface,x=T?.getSource(T.theme).image;if(x&&!x.complete)try{await x.decode()}catch{}if(E!==a)return;let I=matchMedia("(prefers-reduced-motion: reduce)").matches?180:Math.max(300,(M?2900:3600)*Math.abs(y-v)),C=performance.now();function D(B){if(E!==a)return;let G=Km((B-C)/I),O=v+(y-v)*dM(G),q=r()+s()*O;if(window.scrollTo({top:q,behavior:"instant"}),e(O),G<1){o=requestAnimationFrame(D);return}t.moving=!1,t.inputUntil=performance.now()+300,w?.scrollTo(q,{immediate:!0,force:!0}),w?.start()}o=requestAnimationFrame(D)}t.reverse=()=>f(!1);let m=M=>M.defaultPrevented||M.ctrlKey||M.metaKey||M.altKey||document.body.classList.contains("mobile-menu-open")||document.documentElement.classList.contains("page-transition-active")||M.target.closest?.("input,textarea,select,[contenteditable]");function _(M){if(t.moving)return!0;let v=scrollY-r();return M>0?v>=-2&&v<s()-1:v>1&&v<=s()+2}let g=M=>{M.preventDefault(),M.stopImmediatePropagation()};addEventListener("wheel",M=>{if(m(M)||Math.abs(M.deltaX)>=Math.abs(M.deltaY))return;let v=Math.sign(M.deltaY),y=performance.now();_(v)&&(g(M),!(t.moving||y<t.inputUntil)&&((y-l>220||v!==h)&&(c=0),h=v,l=y,c+=Math.abs(M.deltaY)*(M.deltaMode===1?16:M.deltaMode===2?innerHeight:1),c>=60&&(c=0,f(v>0))))},{capture:!0,passive:!1});let p=null;return addEventListener("touchstart",M=>{p=M.touches.length===1?M.touches[0]:null},{passive:!0}),addEventListener("touchmove",M=>{if(!p||m(M)||M.touches.length!==1)return;let v=p.clientY-M.touches[0].clientY;Math.abs(v)<Math.abs(p.clientX-M.touches[0].clientX)||!_(Math.sign(v))||(g(M),!t.moving&&Math.abs(v)>=42&&(p=null,f(v>0)))},{capture:!0,passive:!1}),addEventListener("keydown",M=>{if(m(M)||M.target.closest?.("button,a"))return;let v=["ArrowDown","PageDown"," "].includes(M.key)?1:["ArrowUp","PageUp"].includes(M.key)?-1:0;!v||!_(v)||(g(M),!t.moving&&!M.repeat&&f(v>0))},{capture:!0}),{update:u,readScroll:d}}var ta=i=>document.querySelector(i),yn=ta("#scene"),pM=Gm(),tn={angle:38,depth:1,shadow:.64,layout:"grid"},rt=[],Rd=[],Lt,wt,st,Fr,kr,Br,Cd,eg,tg,Id,Pd=0,Ri=1,Ci=1,Xl=!1,mM=()=>oi,ct={current:0,target:0,poses:[],lastFrame:0},ql,ea,rs=0,Ld=!0,ng=matchMedia("(prefers-reduced-motion: reduce)"),Qo=new U,ig=new Ao({name:"Soft colored clay",color:16777215,roughness:.78,metalness:0,emissive:16777215,emissiveIntensity:.02,toneMapped:!1}),Ad={depth:46.2,bevelEnabled:!0,bevelSize:1.3,bevelThickness:2.2,bevelSegments:5,steps:1,curveSegments:20},gM=(i,e=1)=>{let t=Math.sin((i+1)*127.1+e*311.7)*43758.5453;return t-Math.floor(t)};function xM(i){if(Pd=0,!Lt||Xl)return;let e=Math.min((i-ct.lastFrame)/1e3||.016,.05);if(ct.lastFrame=i,window.MainIntro.complete&&rs===1&&!Ld){ql?.update(1);return}if(rs>0)ct.current=oi;else{let t=ct.target-ct.current;ct.current=ng.matches||Math.abs(t)<.001?ct.target:ct.current+t*(1-Math.exp(-12*e))}Ud(Ri,Ci),ea.update(st,Br.mesh,rs,st.userData.ending),rs===1&&(Sm(kr.extension,ta("#heroGrid"),st,Ri,Ci),Ld=!1),Lt.render(wt,st),ql?.update(rs),(rs===0&&Math.abs(ct.target-ct.current)>1e-4||rt.some(t=>t.reveal.active&&performance.now()-t.reveal.sparkAt<360)||kr?.isFlashing())&&zr()}function zr(){Pd||(Pd=requestAnimationFrame(xM))}function Ii(i,e,t,n,s=0,r=0,o=38,a=44,c=0,l=34){let h=pt.degToRad(o),u=pt.degToRad(a);st.aspect=i/e,st.fov=l,st.near=Math.max(.1,n*.05),st.position.set(t.x+Math.sin(h)*Math.cos(u)*n,t.y+Math.sin(u)*n,t.z+Math.cos(h)*Math.cos(u)*n),st.up.set(-Math.sin(h)*Math.sin(u),Math.cos(u),-Math.cos(h)*Math.sin(u)),st.lookAt(t.x,t.y,t.z),st.rotateZ(c),st.setViewOffset(i,e,s*i,r*e,i,e),st.updateMatrixWorld(!0)}function Zl(i){let e=i.geometry.attributes.position,t=new U,n=new tt().multiplyMatrices(st.projectionMatrix,st.matrixWorldInverse).multiply(i.matrixWorld),s={left:1/0,right:-1/0,top:1/0,bottom:-1/0};for(let r=0;r<e.count;r++){t.fromBufferAttribute(e,r).applyMatrix4(n);let o=(t.x+1)/2,a=(1-t.y)/2;s.left=Math.min(s.left,o),s.right=Math.max(s.right,o),s.top=Math.min(s.top,a),s.bottom=Math.max(s.bottom,a)}return s}function sg(i,e){let t=rt.map(({mesh:M})=>M.scale.y);rt.forEach(({mesh:M,heightFactor:v})=>{M.scale.y=tn.depth*v}),wt.updateMatrixWorld(!0),ct.poses=rt.slice(0,Ar).map(({mesh:M,index:v})=>{let y=new Rt().setFromObject(M).getCenter(new U);y.y=M.position.y;let E=v===0?0:tn.angle+(v===1?-8:12),w=v===0?90:v===1?48:58,T=4,x;for(let R=0;R<80&&(Ii(i,e,y,T,0,0,E,w),x=Zl(M),!(x.right-x.left<(i/e<1?.78:.52)&&x.bottom-x.top<.45));R++)T*=1.035;return{center:y,distance:T,yaw:E,pitch:w,shiftX:(x.left+x.right)/2-.5,shiftY:(x.top+x.bottom)/2-.5}});let n=Math.max(...ct.poses.map(M=>M.distance));ct.poses.forEach((M,v)=>{M.distance=n,Ii(i,e,M.center,M.distance,0,0,M.yaw,M.pitch);let y=Zl(rt[v].mesh);M.shiftX=(y.left+y.right)/2-.5,M.shiftY=(y.top+y.bottom)/2-.5}),Br.fit(ct.poses[0],e);let s=tn.layout==="grid"?Sl(ct.layoutMode==="portrait"):null;rt.forEach(M=>gl(M.reveal,s));let r=ct.poses[0];Ii(i,e,r.center,r.distance,r.shiftX,r.shiftY,r.yaw,r.pitch),ed(rt[0].reveal,st);let o=new Rt;rt.forEach(({mesh:M})=>o.expandByObject(M));let a=o.getCenter(new U),c=tn.angle,l=54;a.y=.003;let h=14,u;for(let M=0;M<90&&(Ii(i,e,a,h,0,0,c,l,0,34),u=Nd(),!(u.right-u.left<.94&&u.bottom-u.top<(i/e<.8?.72:.76)));M++)h*=1.045;let d=90+tn.angle-38,f=h*1.65;for(let M=0;M<60;M++){Ii(i,e,a,f,0,0,d,90);let v=Nd();if(v.right-v.left<.9&&v.bottom-v.top<.76)break;f*=1.045}ct.wide={center:a,distance:f,yaw:d,pitch:90,fov:34,shiftX:0,shiftY:0};let m=[];for(let M=Hn;M<=Ai+.001;M+=(Ai-Hn)/12){let v=Cl(M,ct.poses,ct.wide);Ii(i,e,v.center,v.distance,v.shiftX,v.shiftY,v.yaw,v.pitch,v.roll,v.fov),m.push(st.clone())}let _=Cl(Hn,ct.poses,ct.wide);Ii(i,e,_.center,_.distance,_.shiftX,_.shiftY,_.yaw,_.pitch,_.roll,_.fov);let g=new bi,p=new U;g.setFromCamera(new ue(0,0),st),g.ray.intersectPlane(new qt(new U(0,1,0),-.003),p),kr?.fit(m,ct.layoutMode==="portrait",tn,p),rt.forEach(({mesh:M},v)=>{M.scale.y=t[v]}),wt.updateMatrixWorld(!0)}function Nd(){let i={left:1/0,right:-1/0,top:1/0,bottom:-1/0};return rt.forEach(({mesh:e})=>{let t=Zl(e);i.left=Math.min(i.left,t.left),i.right=Math.max(i.right,t.right),i.top=Math.min(i.top,t.top),i.bottom=Math.max(i.bottom,t.bottom)}),i}function Ud(i,e){if(!ct.poses.length)return;let t=pt.clamp(ct.current,0,oi);pM.update(t);let n=Ml(t);bl.value=Qu(n);let s=rs>0?0:tn.shadow*(1-pt.smoothstep(t,Tn,is));s>0?st.layers.enable(As):st.layers.disable(As);let r=Cl(t,ct.poses,ct.wide,ng.matches?0:1),{solo:o,index:a,distance:c,yaw:l,pitch:h,shiftX:u,shiftY:d,roll:f,fov:m,travelling:_,pullback:g,overhead:p}=r;if(Qo.set(r.center.x,r.center.y,r.center.z),Ii(i,e,Qo,c,u,d,l,h,f,m),t<=3){let I=yn.getBoundingClientRect();ed(rt[0].reveal,st,2*Math.max(0,I.top)/Math.max(1,I.height))}Br.update(h,t>=Tn);let M=0,v=0,y=0;rt.forEach(I=>{let C=t>=I.cue.start,D=C;cm(I,Rr(t,I.cue),D,tn.depth*I.heightFactor,s,n),C&&M++,D&&I.reveal.state.complete&&v++,D&&(!I.reveal.state.complete||n>0&&n<1)&&y++}),kr?.update(t,tn,s),wt.updateMatrixWorld(!0),tg?.update(st),Cd?.update(Rr(t,rt[0].cue),st,i,e),eg?.update(Rr(t,rt[0].cue),st,i,e),wt.fog.near=c+45,wt.fog.far=c+110,Fr.position.copy(Qo).add(new U(...ai)),Fr.target.position.copy(Qo);let E=rt.filter(I=>t>=I.cue.start).sort((I,C)=>C.cue.start-I.cue.start)[0],w=o?a:E.index,T=rt[w].reveal.state,x=o?"solo":t<Tn+.3?"crescendo":"finale",R=g>.99?Nd():Zl(rt[w].mesh);st.userData={projection:"cinematic-perspective",framing:R,position:st.position.toArray(),focus:Qo.toArray(),index:w,progress:t/oi,timeline:t,yaw:l,pitch:h,roll:f,distance:c,travelling:_,pullback:g,overhead:p,ending:n,groundShadows:st.layers.isEnabled(As),direction:st.getWorldDirection(new U).toArray(),phase:x,generated:M,complete:v,activeReveals:y,reveal:{...T}}}function rg(){let i=ta("#journey"),e=i.getBoundingClientRect().top+scrollY,t=yn.clientHeight*.85,{start:n,distance:s}=Im(e,i.offsetHeight-t,yn.clientHeight),r=scrollY-n-s;ql?.readScroll();let o=Am(pt.clamp((scrollY-n)/s,0,1)*gd),a=Math.round(o);ct.target=r>=-1?oi:Math.abs(o-a)<.001?Math.min(a,oi):o,zr()}async function _M(){let i=new ul;for(let e=0;e<jo.length;e++){let t=jo[e];try{let s=i.parse(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${t.viewBox}" fill="white">${t.svg}</svg>`).paths.flatMap(T=>T.toShapes());if(!s.length)throw new Error("Empty geometry");let r=new Eo(s,Ad);r.rotateX(Math.PI/2),r.computeBoundingBox();let o=r.boundingBox,a=o.getCenter(new U);r.translate(-a.x,-o.min.y,-a.z);let c=2.25+(gM(e,2)-.5)*.65,l=c/Math.max(o.max.x-o.min.x,o.max.z-o.min.z);r.scale(l,l,l),r.computeBoundingBox(),r.computeBoundingSphere();let h=r.attributes.position,u=0;for(let T=0;T<h.count;T++)u=Math.max(u,Math.hypot(h.getX(T),h.getZ(T)));let d=t.color,f=El(ig.clone());f.transparent=!0,f.name=t.id+"-clay";let m=new _t(r,f);m.name=t.id,m.castShadow=!0,m.receiveShadow=!0,m.userData={id:t.id,name:t.name,index:e,source:"SVG",shapeCount:s.length,holeCount:s.reduce((T,x)=>T+x.holes.length,0)},wt.add(m);let _=c+4.2,[g,p,M,v]=t.viewBox.trim().split(/[\s,]+/).map(Number),y={minX:(g-a.x)*l,maxX:(g+M-a.x)*l,minZ:(p-a.z)*l,maxZ:(p+v-a.z)*l};m.userData.svgBounds=y;let E={svgBounds:y,height:(Ad.depth+Ad.bevelThickness*2)*l,contours:s.flatMap(T=>[{hole:!1,points:T.getPoints(16)},...T.holes.map(x=>({hole:!0,points:x.getPoints(16)}))]).map(T=>({hole:T.hole,points:T.points.map(x=>[(x.x-a.x)*l,(x.y-a.z)*l])}))},w=new _t(new Nn(_,_),Tl());w.layers.set(As),w.name=t.id+"-contact",w.rotation.x=-Math.PI/2,w.position.y=.001,w.renderOrder=1,wt.add(w),rt.push({icon:t,color:d,mesh:m,shadow:w,size:c,radius:u,index:e,shadowSpan:_,caster:E,shadowKey:""})}catch(n){Rd.push({id:t.id,error:n.message})}}if(rt.length!==33)throw new Error(`Expected 33 objects, created ${rt.length}: ${JSON.stringify(Rd)}`);og()}function og(){let i=yn.clientWidth/yn.clientHeight<.8,e=ym(i,tn.layout,rt.map(t=>t.radius));ct.layoutMode=i?"portrait":"landscape",rt.forEach(t=>{let{index:n,mesh:s,shadow:r}=t,o=e[n],a=o.x,c=o.z,l=0;t.heightFactor=o.height;let h=tn.depth*t.heightFactor;s.position.set(a,.003,c),s.rotation.y=l,s.scale.y=h,r.position.set(a,.001,c),r.rotation.z=l,t.reveal&&(t.reveal.group.position.copy(s.position),t.reveal.group.rotation.copy(s.rotation));let u=`${h}:${l}`;if(t.shadowKey!==u){let d=r.material.map;t.patternShadow&&t.patternShadow!==d&&t.patternShadow.dispose(),r.material.map=ld(t.caster,t.shadowSpan,h,l),t.patternShadow=l===0?r.material.map:ld(t.caster,t.shadowSpan,h,0),r.material.needsUpdate=!0,d?.dispose(),t.shadowKey=u}r.material.opacity=tn.shadow}),wt.updateMatrixWorld(!0)}function Dd(){if(!Lt||Xl)return;Ri=yn.clientWidth,Ci=yn.clientHeight,Ld=!0,ct.layoutMode!==(Ri/Ci<.8?"portrait":"landscape")&&og(),Lt.setPixelRatio(2),Lt.setSize(Ri,Ci,!1),sg(Ri,Ci);let i=ct.wide;Ii(Ri,Ci,i.center,i.distance,0,0,i.yaw,90,0,i.fov),ea.fit(st,Ri,Ci),rg(),Ud(Ri,Ci),Id?.prepare(),zr()}async function yM(i=3840,e=2160){Xl=!0;try{return Lt.setPixelRatio(1),Lt.setSize(i,e,!1),sg(i,e),Ud(i,e),Lt.render(wt,st),Lt.domElement.toDataURL("image/png")}finally{Xl=!1,Dd()}}async function vM(i){let e=new Qi,t,n=[],s=c=>{let l=c.mesh.material.clone();return l.opacity=1,l.transparent=!1,l.depthWrite=!0,l.color.set(c.color),l.emissive.set(c.color),n.push(l),l};Number.isInteger(i)?(t=rt[i].mesh.clone(),t.visible=!0,t.material=s(rt[i]),t.position.set(0,0,0),t.rotation.set(0,0,0),t.scale.y=tn.depth*rt[i].heightFactor):(t=new hn,t.name="CJU_33_COLOR_OBJECTS",rt.forEach(c=>{let l=c.mesh.clone();l.visible=!0,l.material=s(c),c.mesh.matrixWorld.decompose(l.position,l.quaternion,l.scale),l.scale.y=tn.depth*c.heightFactor,t.add(l)}));let r;try{r=await e.parseAsync(t,{binary:!0})}finally{n.forEach(c=>c.dispose())}let o="",a=new Uint8Array(r);for(let c=0;c<a.length;c+=16384)o+=String.fromCharCode(...a.subarray(c,c+16384));return btoa(o)}async function MM(){try{Lt=new Er({antialias:!0,alpha:!1,preserveDrawingBuffer:!0,powerPreference:"high-performance"}),Lt.setClearColor(16448250),Lt.outputColorSpace=xt,Lt.toneMapping=Uo,Lt.toneMappingExposure=1,Lt.shadowMap.enabled=!1,Lt.domElement.setAttribute("aria-label","33\uC885\uC758 \uC6D0\uBCF8 \uCEEC\uB7EC \uC785\uCCB4 \uC544\uC774\uCF58\uC774 \uBC18\uBCF5\uB418\uC5B4 \uBC14\uB2E5\uC744 \uCC44\uC6B0\uB294 \uD328\uD134"),yn.append(Lt.domElement),wt=new jn,wt.background=new ze(16448250),wt.fog=new ao(16448250,10,17),st=new Zt(32,1,.1,250),wt.add(new Po(16777215,15855853,1.9)),Fr=new mr(16776696,1.7),Fr.position.set(...ai),wt.add(Fr),wt.add(Fr.target);let i=new mr(16777215,.7);i.position.set(12,16,-8),wt.add(i),Br=Lm(Lt),wt.add(Br.mesh),await _M(),window.heroNebula=Jm(ta(".hero-art"),rt),rt.forEach((e,t)=>{e.reveal=_l(e,void 0,t===0?"viewport":"edge"),wt.add(e.reveal.group)}),Cd=Dm(yn,rt[0]),eg=Um(yn,rt[0]),tg=Om(yn,rt[0].reveal),kr=new Al(wt,rt,ig),Id=$m(Lt,wt,st,zr),ea=vm(wt,zr),await ea.ready,ql=jm(yn,e=>{rs=e,zr()}),ta("#journey").style.height=`${Cm+.85*100}svh`,addEventListener("scroll",rg,{passive:!0}),addEventListener("resize",Dd),Dd(),Lt.render(wt,st),yn.classList.add("ready"),window.heroStudio={ready:!0,exportPNG:yM,exportGLB:vM,inspect:()=>({count:rt.length,preparation:Id.inspect(),pattern:kr.inspect(),floor:Br.inspect(),dimension:Cd.inspect(),errors:Rd,settings:{...tn},timelineEnd:mM(),cameraPath:{poses:ct.poses,wide:ct.wide},wordFlight:ea.inspect(),camera:{...st.userData,rotation:st.rotation.toArray(),up:st.up.toArray()},objects:rt.map(({mesh:e,icon:t,reveal:n,heightFactor:s,index:r,radius:o,cue:a})=>({id:t.id,name:t.name,vertices:e.geometry.attributes.position.count,triangles:e.geometry.attributes.position.count/3,...e.userData,color:e.material.color.getHexString(),lineColor:n.lines[0].material.color.getHexString(),cue:a,heightFactor:s,radius:o,position:e.position.toArray(),baseY:e.position.y,rotation:e.rotation.toArray(),heightScale:e.scale.y,visible:e.visible,guide:xl(n),drawingVisible:n.group.visible,pointVisible:n.group.visible&&n.dot.visible,strokeVertices:n.lines.reduce((c,l)=>c+l.geometry.drawRange.count,0),reveal:{...n.state}})),renderer:Lt.info.render})}}catch(i){console.warn("Intro unavailable; continuing with the existing main hero.",i),window.MainIntro.complete=!0,window.MainIntro.progress=1,document.body.classList.remove("intro-before-main"),document.body.classList.add("intro-unavailable"),window.dispatchEvent(new CustomEvent("main-intro-handoff",{detail:{complete:!0}})),window.heroStudio={ready:!1,error:String(i)}}}MM();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
