(()=>{var uf=0,Eh=1,df=2;var Ea=1,ff=2,lr=3,fi=0,Kt=1,jt=2,$n=0,os=1,Th=2,wh=3,Ah=4,pf=5;var Oi=100,mf=101,gf=102,xf=103,_f=104,yf=200,vf=201,Mf=202,Sf=203,vo=204,Mo=205,bf=206,Ef=207,Tf=208,wf=209,Af=210,Rf=211,Cf=212,If=213,Pf=214,So=0,bo=1,Eo=2,cs=3,To=4,wo=5,Ao=6,Ro=7,Rh=0,Lf=1,Nf=2,In=0,Ch=1,Ih=2,Ph=3,Ta=4,Lh=5,Nh=6,Dh=7;var Uh=300,Xi=301,fs=302,ic=303,sc=304,wa=306,xn=1e3,tn=1001,Bi=1002,wt=1003,rc=1004;var ps=1005;var St=1006,hr=1007;var Kn=1008;var nn=1009,Fh=1010,Oh=1011,ur=1012,ac=1013,Pn=1014,yn=1015,jn=1016,oc=1017,cc=1018,dr=1020,Bh=35902,zh=35899,kh=1021,Vh=1022,sn=1023,Xn=1026,qi=1027,lc=1028,hc=1029,Zi=1030,uc=1031;var dc=1033,Aa=33776,Ra=33777,Ca=33778,Ia=33779,fc=35840,pc=35841,mc=35842,gc=35843,xc=36196,_c=37492,yc=37496,vc=37488,Mc=37489,Pa=37490,Sc=37491,bc=37808,Ec=37809,Tc=37810,wc=37811,Ac=37812,Rc=37813,Cc=37814,Ic=37815,Pc=37816,Lc=37817,Nc=37818,Dc=37819,Uc=37820,Fc=37821,Oc=36492,Bc=36494,zc=36495,kc=36283,Vc=36284,La=36285,Hc=36286;var ls=2300,qs=2301,yo=2302,ch=2303,lh=2400,hh=2401,uh=2402;var Df=3200;var Gc=0,Uf=1,Ln="",vt="srgb",Zr="srgb-linear",Yr="linear",lt="srgb";var rs=7680;var dh=519,Ff=512,Of=513,Bf=514,Wc=515,zf=516,kf=517,Xc=518,Vf=519,Co=35044,fr=35048;var Hh="300 es",An=2e3,Zs=2001;function jm(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Qm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Jr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Hf(){let i=Jr("canvas");return i.style.display="block",i}var Td={},Ys=null;function $r(...i){let e="THREE."+i.shift();Ys?Ys("log",e,...i):console.log(e,...i)}function Gf(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Xe(...i){i=Gf(i);let e="THREE."+i.shift();if(Ys)Ys("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ye(...i){i=Gf(i);let e="THREE."+i.shift();if(Ys)Ys("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function as(...i){let e=i.join(" ");e in Td||(Td[e]=!0,Xe(...i))}function Wf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Xf={[So]:bo,[Eo]:Ao,[To]:Ro,[cs]:wo,[bo]:So,[Ao]:Eo,[Ro]:To,[wo]:cs},qn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Ht=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],wd=1234567,Gr=Math.PI/180,Js=180/Math.PI;function Wn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ht[i&255]+Ht[i>>8&255]+Ht[i>>16&255]+Ht[i>>24&255]+"-"+Ht[e&255]+Ht[e>>8&255]+"-"+Ht[e>>16&15|64]+Ht[e>>24&255]+"-"+Ht[t&63|128]+Ht[t>>8&255]+"-"+Ht[t>>16&255]+Ht[t>>24&255]+Ht[n&255]+Ht[n>>8&255]+Ht[n>>16&255]+Ht[n>>24&255]).toLowerCase()}function tt(i,e,t){return Math.max(e,Math.min(t,i))}function Gh(i,e){return(i%e+e)%e}function eg(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function tg(i,e,t){return i!==e?(t-i)/(e-i):0}function Wr(i,e,t){return(1-t)*i+t*e}function ng(i,e,t,n){return Wr(i,e,1-Math.exp(-t*n))}function ig(i,e=1){return e-Math.abs(Gh(i,e*2)-e)}function sg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function rg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function ag(i,e){return i+Math.floor(Math.random()*(e-i+1))}function og(i,e){return i+Math.random()*(e-i)}function cg(i){return i*(.5-Math.random())}function lg(i){i!==void 0&&(wd=i);let e=wd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function hg(i){return i*Gr}function ug(i){return i*Js}function dg(i){return(i&i-1)===0&&i!==0}function fg(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function pg(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function mg(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),d=r((e-n)/2),u=a((e-n)/2),f=r((n-e)/2),m=a((n-e)/2);switch(s){case"XYX":i.set(o*h,c*d,c*u,o*l);break;case"YZY":i.set(c*u,o*h,c*d,o*l);break;case"ZXZ":i.set(c*d,c*u,o*h,o*l);break;case"XZX":i.set(o*h,c*m,c*f,o*l);break;case"YXY":i.set(c*f,o*h,c*m,o*l);break;case"ZYZ":i.set(c*m,c*f,o*h,o*l);break;default:Xe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function wn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ut(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var ot={DEG2RAD:Gr,RAD2DEG:Js,generateUUID:Wn,clamp:tt,euclideanModulo:Gh,mapLinear:eg,inverseLerp:tg,lerp:Wr,damp:ng,pingpong:ig,smoothstep:sg,smootherstep:rg,randInt:ag,randFloat:og,randFloatSpread:cg,seededRandom:lg,degToRad:hg,radToDeg:ug,isPowerOfTwo:dg,ceilPowerOfTwo:fg,floorPowerOfTwo:pg,setQuaternionFromProperEuler:mg,normalize:ut,denormalize:wn},Jh=class Jh{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Jh.prototype.isVector2=!0;var fe=Jh,_n=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],f=r[a+1],m=r[a+2],y=r[a+3];if(d!==y||c!==u||l!==f||h!==m){let g=c*u+l*f+h*m+d*y;g<0&&(u=-u,f=-f,m=-m,y=-y,g=-g);let p=1-o;if(g<.9995){let E=Math.acos(g),b=Math.sin(E);p=Math.sin(p*E)/b,o=Math.sin(o*E)/b,c=c*p+u*o,l=l*p+f*o,h=h*p+m*o,d=d*p+y*o}else{c=c*p+u*o,l=l*p+f*o,h=h*p+m*o,d=d*p+y*o;let E=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=E,l*=E,h*=E,d*=E}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],m=r[a+3];return e[t]=o*m+h*d+c*f-l*u,e[t+1]=c*m+h*u+l*d-o*f,e[t+2]=l*m+h*f+o*u-c*d,e[t+3]=h*m-o*d-c*u-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),d=o(r/2),u=c(n/2),f=c(s/2),m=c(r/2);switch(a){case"XYZ":this._x=u*h*d+l*f*m,this._y=l*f*d-u*h*m,this._z=l*h*m+u*f*d,this._w=l*h*d-u*f*m;break;case"YXZ":this._x=u*h*d+l*f*m,this._y=l*f*d-u*h*m,this._z=l*h*m-u*f*d,this._w=l*h*d+u*f*m;break;case"ZXY":this._x=u*h*d-l*f*m,this._y=l*f*d+u*h*m,this._z=l*h*m+u*f*d,this._w=l*h*d-u*f*m;break;case"ZYX":this._x=u*h*d-l*f*m,this._y=l*f*d+u*h*m,this._z=l*h*m-u*f*d,this._w=l*h*d+u*f*m;break;case"YZX":this._x=u*h*d+l*f*m,this._y=l*f*d+u*h*m,this._z=l*h*m-u*f*d,this._w=l*h*d-u*f*m;break;case"XZY":this._x=u*h*d-l*f*m,this._y=l*f*d-u*h*m,this._z=l*h*m+u*f*d,this._w=l*h*d+u*f*m;break;default:Xe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>d){let f=2*Math.sqrt(1+n-o-d);this._w=(h-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>d){let f=2*Math.sqrt(1+o-n-d);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(tt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},$h=class $h{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ad.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ad.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),h=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+c*l+a*d-o*h,this.y=n+c*h+o*l-r*d,this.z=s+c*d+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this.z=tt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this.z=tt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ul.copy(this).projectOnVector(e),this.sub(Ul)}reflect(e){return this.sub(Ul.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};$h.prototype.isVector3=!0;var V=$h,Ul=new V,Ad=new _n,Kh=class Kh{constructor(e,t,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],f=n[5],m=n[8],y=s[0],g=s[3],p=s[6],E=s[1],b=s[4],_=s[7],M=s[2],T=s[5],A=s[8];return r[0]=a*y+o*E+c*M,r[3]=a*g+o*b+c*T,r[6]=a*p+o*_+c*A,r[1]=l*y+h*E+d*M,r[4]=l*g+h*b+d*T,r[7]=l*p+h*_+d*A,r[2]=u*y+f*E+m*M,r[5]=u*g+f*b+m*T,r[8]=u*p+f*_+m*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=h*a-o*l,u=o*c-h*r,f=l*r-a*c,m=t*d+n*u+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return e[0]=d*y,e[1]=(s*l-h*n)*y,e[2]=(o*n-s*a)*y,e[3]=u*y,e[4]=(h*t-s*c)*y,e[5]=(s*r-o*t)*y,e[6]=f*y,e[7]=(n*c-l*t)*y,e[8]=(a*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return as("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Fl.makeScale(e,t)),this}rotate(e){return as("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Fl.makeRotation(-e)),this}translate(e,t){return as("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Fl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Kh.prototype.isMatrix3=!0;var qe=Kh,Fl=new qe,Rd=new qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Cd=new qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function gg(){let i={enabled:!0,workingColorSpace:Zr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===lt&&(s.r=di(s.r),s.g=di(s.g),s.b=di(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===lt&&(s.r=Xs(s.r),s.g=Xs(s.g),s.b=Xs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ln?Yr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return as("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return as("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Zr]:{primaries:e,whitePoint:n,transfer:Yr,toXYZ:Rd,fromXYZ:Cd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:vt},outputColorSpaceConfig:{drawingBufferColorSpace:vt}},[vt]:{primaries:e,whitePoint:n,transfer:lt,toXYZ:Rd,fromXYZ:Cd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:vt}}}),i}var it=gg();function di(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Xs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Rs,$s=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Rs===void 0&&(Rs=Jr("canvas")),Rs.width=e.width,Rs.height=e.height;let s=Rs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Rs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Jr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=di(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(di(t[n]/255)*255):t[n]=di(t[n]);return{data:t,width:e.width,height:e.height}}else return Xe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},xg=0,pi=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:xg++}),this.uuid=Wn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ol(s[a].image)):r.push(Ol(s[a]))}else r=Ol(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Ol(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?$s.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Xe("Texture: Unable to serialize Texture."),{})}var _g=0,Bl=new V,Nt=class i extends qn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=tn,s=tn,r=St,a=Kn,o=sn,c=nn,l=i.DEFAULT_ANISOTROPY,h=Ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_g++}),this.uuid=Wn(),this.name="",this.source=new pi(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new fe(0,0),this.repeat=new fe(1,1),this.center=new fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Bl).x}get height(){return this.source.getSize(Bl).y}get depth(){return this.source.getSize(Bl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Xe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Xe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Uh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case xn:e.x=e.x-Math.floor(e.x);break;case tn:e.x=e.x<0?0:1;break;case Bi:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case xn:e.y=e.y-Math.floor(e.y);break;case tn:e.y=e.y<0?0:1;break;case Bi:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Nt.DEFAULT_IMAGE=null;Nt.DEFAULT_MAPPING=Uh;Nt.DEFAULT_ANISOTROPY=1;var jh=class jh{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],m=c[9],y=c[2],g=c[6],p=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-y)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+y)<.1&&Math.abs(m+g)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let b=(l+1)/2,_=(f+1)/2,M=(p+1)/2,T=(h+u)/4,A=(d+y)/4,x=(m+g)/4;return b>_&&b>M?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=T/n,r=A/n):_>M?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=T/s,r=x/s):M<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(M),n=A/r,s=x/r),this.set(n,s,r,t),this}let E=Math.sqrt((g-m)*(g-m)+(d-y)*(d-y)+(u-h)*(u-h));return Math.abs(E)<.001&&(E=1),this.x=(g-m)/E,this.y=(d-y)/E,this.z=(u-h)/E,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this.z=tt(this.z,e.z,t.z),this.w=tt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this.z=tt(this.z,e,t),this.w=tt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};jh.prototype.isVector4=!0;var mt=jh,Io=class extends qn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:St,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new Nt(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:St,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new pi(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},$t=class extends Io{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Kr=class extends Nt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=wt,this.minFilter=wt,this.wrapR=tn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Po=class extends Nt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=wt,this.minFilter=wt,this.wrapR=tn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var nc=class nc{constructor(e,t,n,s,r,a,o,c,l,h,d,u,f,m,y,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,h,d,u,f,m,y,g)}set(e,t,n,s,r,a,o,c,l,h,d,u,f,m,y,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=m,p[11]=y,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new nc().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/Cs.setFromMatrixColumn(e,0).length(),r=1/Cs.setFromMatrixColumn(e,1).length(),a=1/Cs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let u=a*h,f=a*d,m=o*h,y=o*d;t[0]=c*h,t[4]=-c*d,t[8]=l,t[1]=f+m*l,t[5]=u-y*l,t[9]=-o*c,t[2]=y-u*l,t[6]=m+f*l,t[10]=a*c}else if(e.order==="YXZ"){let u=c*h,f=c*d,m=l*h,y=l*d;t[0]=u+y*o,t[4]=m*o-f,t[8]=a*l,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-m,t[6]=y+u*o,t[10]=a*c}else if(e.order==="ZXY"){let u=c*h,f=c*d,m=l*h,y=l*d;t[0]=u-y*o,t[4]=-a*d,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*h,t[9]=y-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let u=a*h,f=a*d,m=o*h,y=o*d;t[0]=c*h,t[4]=m*l-f,t[8]=u*l+y,t[1]=c*d,t[5]=y*l+u,t[9]=f*l-m,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let u=a*c,f=a*l,m=o*c,y=o*l;t[0]=c*h,t[4]=y-u*d,t[8]=m*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=f*d+m,t[10]=u-y*d}else if(e.order==="XZY"){let u=a*c,f=a*l,m=o*c,y=o*l;t[0]=c*h,t[4]=-d,t[8]=l*h,t[1]=u*d+y,t[5]=a*h,t[9]=f*d-m,t[2]=m*d-f,t[6]=o*h,t[10]=y*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(yg,e,vg)}lookAt(e,t,n){let s=this.elements;return on.subVectors(e,t),on.lengthSq()===0&&(on.z=1),on.normalize(),Pi.crossVectors(n,on),Pi.lengthSq()===0&&(Math.abs(n.z)===1?on.x+=1e-4:on.z+=1e-4,on.normalize(),Pi.crossVectors(n,on)),Pi.normalize(),Wa.crossVectors(on,Pi),s[0]=Pi.x,s[4]=Wa.x,s[8]=on.x,s[1]=Pi.y,s[5]=Wa.y,s[9]=on.y,s[2]=Pi.z,s[6]=Wa.z,s[10]=on.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],f=n[13],m=n[2],y=n[6],g=n[10],p=n[14],E=n[3],b=n[7],_=n[11],M=n[15],T=s[0],A=s[4],x=s[8],R=s[12],D=s[1],w=s[5],I=s[9],O=s[13],B=s[2],U=s[6],q=s[10],G=s[14],H=s[3],j=s[7],ie=s[11],ue=s[15];return r[0]=a*T+o*D+c*B+l*H,r[4]=a*A+o*w+c*U+l*j,r[8]=a*x+o*I+c*q+l*ie,r[12]=a*R+o*O+c*G+l*ue,r[1]=h*T+d*D+u*B+f*H,r[5]=h*A+d*w+u*U+f*j,r[9]=h*x+d*I+u*q+f*ie,r[13]=h*R+d*O+u*G+f*ue,r[2]=m*T+y*D+g*B+p*H,r[6]=m*A+y*w+g*U+p*j,r[10]=m*x+y*I+g*q+p*ie,r[14]=m*R+y*O+g*G+p*ue,r[3]=E*T+b*D+_*B+M*H,r[7]=E*A+b*w+_*U+M*j,r[11]=E*x+b*I+_*q+M*ie,r[15]=E*R+b*O+_*G+M*ue,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],d=e[6],u=e[10],f=e[14],m=e[3],y=e[7],g=e[11],p=e[15],E=c*f-l*u,b=o*f-l*d,_=o*u-c*d,M=a*f-l*h,T=a*u-c*h,A=a*d-o*h;return t*(y*E-g*b+p*_)-n*(m*E-g*M+p*T)+s*(m*b-y*M+p*A)-r*(m*_-y*T+g*A)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-n*(r*h-o*c)+s*(r*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=e[9],u=e[10],f=e[11],m=e[12],y=e[13],g=e[14],p=e[15],E=t*o-n*a,b=t*c-s*a,_=t*l-r*a,M=n*c-s*o,T=n*l-r*o,A=s*l-r*c,x=h*y-d*m,R=h*g-u*m,D=h*p-f*m,w=d*g-u*y,I=d*p-f*y,O=u*p-f*g,B=E*O-b*I+_*w+M*D-T*R+A*x;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let U=1/B;return e[0]=(o*O-c*I+l*w)*U,e[1]=(s*I-n*O-r*w)*U,e[2]=(y*A-g*T+p*M)*U,e[3]=(u*T-d*A-f*M)*U,e[4]=(c*D-a*O-l*R)*U,e[5]=(t*O-s*D+r*R)*U,e[6]=(g*_-m*A-p*b)*U,e[7]=(h*A-u*_+f*b)*U,e[8]=(a*I-o*D+l*x)*U,e[9]=(n*D-t*I-r*x)*U,e[10]=(m*T-y*_+p*E)*U,e[11]=(d*_-h*T-f*E)*U,e[12]=(o*R-a*w-c*x)*U,e[13]=(t*w-n*R+s*x)*U,e[14]=(y*b-m*M-g*E)*U,e[15]=(h*M-d*b+u*E)*U,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,d=o+o,u=r*l,f=r*h,m=r*d,y=a*h,g=a*d,p=o*d,E=c*l,b=c*h,_=c*d,M=n.x,T=n.y,A=n.z;return s[0]=(1-(y+p))*M,s[1]=(f+_)*M,s[2]=(m-b)*M,s[3]=0,s[4]=(f-_)*T,s[5]=(1-(u+p))*T,s[6]=(g+E)*T,s[7]=0,s[8]=(m+b)*A,s[9]=(g-E)*A,s[10]=(1-(u+y))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Cs.set(s[0],s[1],s[2]).length(),o=Cs.set(s[4],s[5],s[6]).length(),c=Cs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),bn.copy(this);let l=1/a,h=1/o,d=1/c;return bn.elements[0]*=l,bn.elements[1]*=l,bn.elements[2]*=l,bn.elements[4]*=h,bn.elements[5]*=h,bn.elements[6]*=h,bn.elements[8]*=d,bn.elements[9]*=d,bn.elements[10]*=d,t.setFromRotationMatrix(bn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=An,c=!1){let l=this.elements,h=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s),m,y;if(c)m=r/(a-r),y=a*r/(a-r);else if(o===An)m=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===Zs)m=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=An,c=!1){let l=this.elements,h=2/(t-e),d=2/(n-s),u=-(t+e)/(t-e),f=-(n+s)/(n-s),m,y;if(c)m=1/(a-r),y=a/(a-r);else if(o===An)m=-2/(a-r),y=-(a+r)/(a-r);else if(o===Zs)m=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=m,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};nc.prototype.isMatrix4=!0;var rt=nc,Cs=new V,bn=new rt,yg=new V(0,0,0),vg=new V(1,1,1),Pi=new V,Wa=new V,on=new V,Id=new rt,Pd=new _n,mi=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(tt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-tt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(tt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-tt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(tt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-tt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Xe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Id.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Id,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Pd.setFromEuler(this),this.setFromQuaternion(Pd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};mi.DEFAULT_ORDER="XYZ";var Ks=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Mg=0,Ld=new V,Is=new _n,ri=new rt,Xa=new V,Lr=new V,Sg=new V,bg=new _n,Nd=new V(1,0,0),Dd=new V(0,1,0),Ud=new V(0,0,1),Fd={type:"added"},Eg={type:"removed"},Ps={type:"childadded",child:null},zl={type:"childremoved",child:null},It=class i extends qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Mg++}),this.uuid=Wn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new V,t=new mi,n=new _n,s=new V(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new rt},normalMatrix:{value:new qe}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ks,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Is.setFromAxisAngle(e,t),this.quaternion.multiply(Is),this}rotateOnWorldAxis(e,t){return Is.setFromAxisAngle(e,t),this.quaternion.premultiply(Is),this}rotateX(e){return this.rotateOnAxis(Nd,e)}rotateY(e){return this.rotateOnAxis(Dd,e)}rotateZ(e){return this.rotateOnAxis(Ud,e)}translateOnAxis(e,t){return Ld.copy(e).applyQuaternion(this.quaternion),this.position.add(Ld.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Nd,e)}translateY(e){return this.translateOnAxis(Dd,e)}translateZ(e){return this.translateOnAxis(Ud,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ri.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Xa.copy(e):Xa.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Lr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ri.lookAt(Lr,Xa,this.up):ri.lookAt(Xa,Lr,this.up),this.quaternion.setFromRotationMatrix(ri),s&&(ri.extractRotation(s.matrixWorld),Is.setFromRotationMatrix(ri),this.quaternion.premultiply(Is.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ye("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Fd),Ps.child=e,this.dispatchEvent(Ps),Ps.child=null):Ye("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Eg),zl.child=e,this.dispatchEvent(zl),zl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ri.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ri.multiply(e.parent.matrixWorld)),e.applyMatrix4(ri),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Fd),Ps.child=e,this.dispatchEvent(Ps),Ps.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Lr,e,Sg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Lr,bg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};It.DEFAULT_UP=new V(0,1,0);It.DEFAULT_MATRIX_AUTO_UPDATE=!0;It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ln=class extends It{constructor(){super(),this.isGroup=!0,this.type="Group"}},Tg={type:"move"},js=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ln,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ln,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ln,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let y of e.hand.values()){let g=t.getJointPose(y,n),p=this._getHandJoint(l,y);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,m=.005;l.inputState.pinching&&u>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Tg)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new ln;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},qf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Li={h:0,s:0,l:0},qa={h:0,s:0,l:0};function kl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ve=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=vt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=it.workingColorSpace){return this.r=e,this.g=t,this.b=n,it.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=it.workingColorSpace){if(e=Gh(e,1),t=tt(t,0,1),n=tt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=kl(a,r,e+1/3),this.g=kl(a,r,e),this.b=kl(a,r,e-1/3)}return it.colorSpaceToWorking(this,s),this}setStyle(e,t=vt){function n(r){r!==void 0&&parseFloat(r)<1&&Xe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Xe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Xe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=vt){let n=qf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Xe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=di(e.r),this.g=di(e.g),this.b=di(e.b),this}copyLinearToSRGB(e){return this.r=Xs(e.r),this.g=Xs(e.g),this.b=Xs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=vt){return it.workingToColorSpace(Gt.copy(this),e),Math.round(tt(Gt.r*255,0,255))*65536+Math.round(tt(Gt.g*255,0,255))*256+Math.round(tt(Gt.b*255,0,255))}getHexString(e=vt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=it.workingColorSpace){it.workingToColorSpace(Gt.copy(this),t);let n=Gt.r,s=Gt.g,r=Gt.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=it.workingColorSpace){return it.workingToColorSpace(Gt.copy(this),t),e.r=Gt.r,e.g=Gt.g,e.b=Gt.b,e}getStyle(e=vt){it.workingToColorSpace(Gt.copy(this),e);let t=Gt.r,n=Gt.g,s=Gt.b;return e!==vt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Li),this.setHSL(Li.h+e,Li.s+t,Li.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Li),e.getHSL(qa);let n=Wr(Li.h,qa.h,t),s=Wr(Li.s,qa.s,t),r=Wr(Li.l,qa.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Gt=new Ve;Ve.NAMES=qf;var jr=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ve(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Zn=class extends It{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new mi,this.environmentIntensity=1,this.environmentRotation=new mi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},En=new V,ai=new V,Vl=new V,oi=new V,Ls=new V,Ns=new V,Od=new V,Hl=new V,Gl=new V,Wl=new V,Xl=new mt,ql=new mt,Zl=new mt,ui=class i{constructor(e=new V,t=new V,n=new V){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),En.subVectors(e,t),s.cross(En);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){En.subVectors(s,t),ai.subVectors(n,t),Vl.subVectors(e,t);let a=En.dot(En),o=En.dot(ai),c=En.dot(Vl),l=ai.dot(ai),h=ai.dot(Vl),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(l*c-o*h)*u,m=(a*h-o*c)*u;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,oi)===null?!1:oi.x>=0&&oi.y>=0&&oi.x+oi.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,oi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,oi.x),c.addScaledVector(a,oi.y),c.addScaledVector(o,oi.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return Xl.setScalar(0),ql.setScalar(0),Zl.setScalar(0),Xl.fromBufferAttribute(e,t),ql.fromBufferAttribute(e,n),Zl.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Xl,r.x),a.addScaledVector(ql,r.y),a.addScaledVector(Zl,r.z),a}static isFrontFacing(e,t,n,s){return En.subVectors(n,t),ai.subVectors(e,t),En.cross(ai).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return En.subVectors(this.c,this.b),ai.subVectors(this.a,this.b),En.cross(ai).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Ls.subVectors(s,n),Ns.subVectors(r,n),Hl.subVectors(e,n);let c=Ls.dot(Hl),l=Ns.dot(Hl);if(c<=0&&l<=0)return t.copy(n);Gl.subVectors(e,s);let h=Ls.dot(Gl),d=Ns.dot(Gl);if(h>=0&&d<=h)return t.copy(s);let u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(Ls,a);Wl.subVectors(e,r);let f=Ls.dot(Wl),m=Ns.dot(Wl);if(m>=0&&f<=m)return t.copy(r);let y=f*l-c*m;if(y<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(Ns,o);let g=h*m-f*d;if(g<=0&&d-h>=0&&f-m>=0)return Od.subVectors(r,s),o=(d-h)/(d-h+(f-m)),t.copy(s).addScaledVector(Od,o);let p=1/(g+y+u);return a=y*p,o=u*p,t.copy(n).addScaledVector(Ls,a).addScaledVector(Ns,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},zt=class{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Tn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Tn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Tn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Tn):Tn.fromBufferAttribute(r,a),Tn.applyMatrix4(e.matrixWorld),this.expandByPoint(Tn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Za.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Za.copy(n.boundingBox)),Za.applyMatrix4(e.matrixWorld),this.union(Za)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Tn),Tn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Nr),Ya.subVectors(this.max,Nr),Ds.subVectors(e.a,Nr),Us.subVectors(e.b,Nr),Fs.subVectors(e.c,Nr),Ni.subVectors(Us,Ds),Di.subVectors(Fs,Us),ts.subVectors(Ds,Fs);let t=[0,-Ni.z,Ni.y,0,-Di.z,Di.y,0,-ts.z,ts.y,Ni.z,0,-Ni.x,Di.z,0,-Di.x,ts.z,0,-ts.x,-Ni.y,Ni.x,0,-Di.y,Di.x,0,-ts.y,ts.x,0];return!Yl(t,Ds,Us,Fs,Ya)||(t=[1,0,0,0,1,0,0,0,1],!Yl(t,Ds,Us,Fs,Ya))?!1:(Ja.crossVectors(Ni,Di),t=[Ja.x,Ja.y,Ja.z],Yl(t,Ds,Us,Fs,Ya))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Tn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Tn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ci),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ci=[new V,new V,new V,new V,new V,new V,new V,new V],Tn=new V,Za=new zt,Ds=new V,Us=new V,Fs=new V,Ni=new V,Di=new V,ts=new V,Nr=new V,Ya=new V,Ja=new V,ns=new V;function Yl(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ns.fromArray(i,r);let o=s.x*Math.abs(ns.x)+s.y*Math.abs(ns.y)+s.z*Math.abs(ns.z),c=e.dot(ns),l=t.dot(ns),h=n.dot(ns);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Lt=new V,$a=new fe,wg=0,Mt=class extends qn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:wg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Co,this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)$a.fromBufferAttribute(this,t),$a.applyMatrix3(e),this.setXY(t,$a.x,$a.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix3(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ut(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=wn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=wn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=wn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=wn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array),r=ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Co&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var Qr=class extends Mt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var ea=class extends Mt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var yt=class extends Mt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Ag=new zt,Dr=new V,Jl=new V,gi=class{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Ag.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Dr.subVectors(e,this.center);let t=Dr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Dr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Jl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Dr.copy(e.center).add(Jl)),this.expandByPoint(Dr.copy(e.center).sub(Jl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Rg=0,gn=new rt,$l=new It,Os=new V,cn=new zt,Ur=new zt,Ot=new V,At=class i extends qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Rg++}),this.uuid=Wn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(jm(e)?ea:Qr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new qe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return gn.makeRotationFromQuaternion(e),this.applyMatrix4(gn),this}rotateX(e){return gn.makeRotationX(e),this.applyMatrix4(gn),this}rotateY(e){return gn.makeRotationY(e),this.applyMatrix4(gn),this}rotateZ(e){return gn.makeRotationZ(e),this.applyMatrix4(gn),this}translate(e,t,n){return gn.makeTranslation(e,t,n),this.applyMatrix4(gn),this}scale(e,t,n){return gn.makeScale(e,t,n),this.applyMatrix4(gn),this}lookAt(e){return $l.lookAt(e),$l.updateMatrix(),this.applyMatrix4($l.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Os).negate(),this.translate(Os.x,Os.y,Os.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new yt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Xe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];cn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ye('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){let n=this.boundingSphere.center;if(cn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Ur.setFromBufferAttribute(o),this.morphTargetsRelative?(Ot.addVectors(cn.min,Ur.min),cn.expandByPoint(Ot),Ot.addVectors(cn.max,Ur.max),cn.expandByPoint(Ot)):(cn.expandByPoint(Ur.min),cn.expandByPoint(Ur.max))}cn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Ot.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ot));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Ot.fromBufferAttribute(o,l),c&&(Os.fromBufferAttribute(e,l),Ot.add(Os)),s=Math.max(s,n.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ye('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ye("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Mt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let x=0;x<n.count;x++)o[x]=new V,c[x]=new V;let l=new V,h=new V,d=new V,u=new fe,f=new fe,m=new fe,y=new V,g=new V;function p(x,R,D){l.fromBufferAttribute(n,x),h.fromBufferAttribute(n,R),d.fromBufferAttribute(n,D),u.fromBufferAttribute(r,x),f.fromBufferAttribute(r,R),m.fromBufferAttribute(r,D),h.sub(l),d.sub(l),f.sub(u),m.sub(u);let w=1/(f.x*m.y-m.x*f.y);isFinite(w)&&(y.copy(h).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(w),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(w),o[x].add(y),o[R].add(y),o[D].add(y),c[x].add(g),c[R].add(g),c[D].add(g))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let x=0,R=E.length;x<R;++x){let D=E[x],w=D.start,I=D.count;for(let O=w,B=w+I;O<B;O+=3)p(e.getX(O+0),e.getX(O+1),e.getX(O+2))}let b=new V,_=new V,M=new V,T=new V;function A(x){M.fromBufferAttribute(s,x),T.copy(M);let R=o[x];b.copy(R),b.sub(M.multiplyScalar(M.dot(R))).normalize(),_.crossVectors(T,R);let w=_.dot(c[x])<0?-1:1;a.setXYZW(x,b.x,b.y,b.z,w)}for(let x=0,R=E.length;x<R;++x){let D=E[x],w=D.start,I=D.count;for(let O=w,B=w+I;O<B;O+=3)A(e.getX(O+0)),A(e.getX(O+1)),A(e.getX(O+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Mt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let s=new V,r=new V,a=new V,o=new V,c=new V,l=new V,h=new V,d=new V;if(e)for(let u=0,f=e.count;u<f;u+=3){let m=e.getX(u+0),y=e.getX(u+1),g=e.getX(u+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,g),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,g),o.add(h),c.add(h),l.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,d=o.normalized,u=new l.constructor(c.length*h),f=0,m=0;for(let y=0,g=c.length;y<g;y++){o.isInterleavedBufferAttribute?f=c[y]*o.data.stride+o.offset:f=c[y]*h;for(let p=0;p<h;p++)u[m++]=l[f++]}return new Mt(u,h,d)}if(this.index===null)return Xe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,d=l.length;h<d;h++){let u=l[h],f=e(u,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){let f=l[d];h.push(f.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],d=r[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Lo=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Co,this.updateRanges=[],this.version=0,this.uuid=Wn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Wn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Wn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Jt=new V,ta=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix4(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyNormalMatrix(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.transformDirection(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ut(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=wn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=wn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=wn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=wn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array),r=ut(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){$r("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Mt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){$r("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Cg=0,Yn=class extends qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Cg++}),this.uuid=Wn(),this.name="",this.type="Material",this.blending=os,this.side=fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=vo,this.blendDst=Mo,this.blendEquation=Oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ve(0,0,0),this.blendAlpha=0,this.depthFunc=cs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=dh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=rs,this.stencilZFail=rs,this.stencilZPass=rs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Xe(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Xe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==os&&(n.blending=this.blending),this.side!==fi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==vo&&(n.blendSrc=this.blendSrc),this.blendDst!==Mo&&(n.blendDst=this.blendDst),this.blendEquation!==Oi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==cs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==dh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==rs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==rs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==rs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ve().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new fe().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new fe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Qs=class extends Yn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ve(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Bs,Fr=new V,zs=new V,ks=new V,Vs=new fe,Or=new fe,Zf=new rt,Ka=new V,Br=new V,ja=new V,Bd=new fe,Kl=new fe,zd=new fe,na=class extends It{constructor(e=new Qs){if(super(),this.isSprite=!0,this.type="Sprite",Bs===void 0){Bs=new At;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Lo(t,5);Bs.setIndex([0,1,2,0,2,3]),Bs.setAttribute("position",new ta(n,3,0,!1)),Bs.setAttribute("uv",new ta(n,2,3,!1))}this.geometry=Bs,this.material=e,this.center=new fe(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Ye('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),zs.setFromMatrixScale(this.matrixWorld),Zf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ks.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&zs.multiplyScalar(-ks.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;Qa(Ka.set(-.5,-.5,0),ks,a,zs,s,r),Qa(Br.set(.5,-.5,0),ks,a,zs,s,r),Qa(ja.set(.5,.5,0),ks,a,zs,s,r),Bd.set(0,0),Kl.set(1,0),zd.set(1,1);let o=e.ray.intersectTriangle(Ka,Br,ja,!1,Fr);if(o===null&&(Qa(Br.set(-.5,.5,0),ks,a,zs,s,r),Kl.set(0,1),o=e.ray.intersectTriangle(Ka,ja,Br,!1,Fr),o===null))return;let c=e.ray.origin.distanceTo(Fr);c<e.near||c>e.far||t.push({distance:c,point:Fr.clone(),uv:ui.getInterpolation(Fr,Ka,Br,ja,Bd,Kl,zd,new fe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Qa(i,e,t,n,s,r){Vs.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Or.x=r*Vs.x-s*Vs.y,Or.y=s*Vs.x+r*Vs.y):Or.copy(Vs),i.copy(e),i.x+=Or.x,i.y+=Or.y,i.applyMatrix4(Zf)}var li=new V,jl=new V,eo=new V,Ui=new V,Ql=new V,to=new V,eh=new V,er=class{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,li)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=li.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(li.copy(this.origin).addScaledVector(this.direction,t),li.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){jl.copy(e).add(t).multiplyScalar(.5),eo.copy(t).sub(e).normalize(),Ui.copy(this.origin).sub(jl);let r=e.distanceTo(t)*.5,a=-this.direction.dot(eo),o=Ui.dot(this.direction),c=-Ui.dot(eo),l=Ui.lengthSq(),h=Math.abs(1-a*a),d,u,f,m;if(h>0)if(d=a*c-o,u=a*o-c,m=r*h,d>=0)if(u>=-m)if(u<=m){let y=1/h;d*=y,u*=y,f=d*(d+a*u+2*o)+u*(a*d+u+2*c)+l}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u<=-m?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l):u<=m?(d=0,u=Math.min(Math.max(-r,-c),r),f=u*(u+2*c)+l):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(jl).addScaledVector(eo,u),f}intersectSphere(e,t){li.subVectors(e.center,this.origin);let n=li.dot(this.direction),s=li.dot(li)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,c=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,c=(e.min.z-u.z)*d),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,li)!==null}intersectTriangle(e,t,n,s,r){Ql.subVectors(t,e),to.subVectors(n,e),eh.crossVectors(Ql,to);let a=this.direction.dot(eh),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ui.subVectors(this.origin,e);let c=o*this.direction.dot(to.crossVectors(Ui,to));if(c<0)return null;let l=o*this.direction.dot(Ql.cross(Ui));if(l<0||c+l>a)return null;let h=-o*Ui.dot(eh);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Xt=class extends Yn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mi,this.combine=Rh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},kd=new rt,is=new er,no=new gi,Vd=new V,io=new V,so=new V,ro=new V,th=new V,ao=new V,Hd=new V,oo=new V,gt=class extends It{constructor(e=new At,t=new Xt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){ao.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],d=r[c];h!==0&&(th.fromBufferAttribute(d,e),a?ao.addScaledVector(th,h):ao.addScaledVector(th.sub(t),h))}t.add(ao)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),no.copy(n.boundingSphere),no.applyMatrix4(r),is.copy(e.ray).recast(e.near),!(no.containsPoint(is.origin)===!1&&(is.intersectSphere(no,Vd)===null||is.origin.distanceToSquared(Vd)>(e.far-e.near)**2))&&(kd.copy(r).invert(),is.copy(e.ray).applyMatrix4(kd),!(n.boundingBox!==null&&is.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,is)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,y=u.length;m<y;m++){let g=u[m],p=a[g.materialIndex],E=Math.max(g.start,f.start),b=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let _=E,M=b;_<M;_+=3){let T=o.getX(_),A=o.getX(_+1),x=o.getX(_+2);s=co(this,p,e,n,l,h,d,T,A,x),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),y=Math.min(o.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){let E=o.getX(g),b=o.getX(g+1),_=o.getX(g+2);s=co(this,a,e,n,l,h,d,E,b,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let m=0,y=u.length;m<y;m++){let g=u[m],p=a[g.materialIndex],E=Math.max(g.start,f.start),b=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let _=E,M=b;_<M;_+=3){let T=_,A=_+1,x=_+2;s=co(this,p,e,n,l,h,d,T,A,x),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),y=Math.min(c.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){let E=g,b=g+1,_=g+2;s=co(this,a,e,n,l,h,d,E,b,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function Ig(i,e,t,n,s,r,a,o){let c;if(e.side===Kt?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===fi,o),c===null)return null;oo.copy(o),oo.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(oo);return l<t.near||l>t.far?null:{distance:l,point:oo.clone(),object:i}}function co(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,io),i.getVertexPosition(c,so),i.getVertexPosition(l,ro);let h=Ig(i,e,t,n,io,so,ro,Hd);if(h){let d=new V;ui.getBarycoord(Hd,io,so,ro,d),s&&(h.uv=ui.getInterpolatedAttribute(s,o,c,l,d,new fe)),r&&(h.uv1=ui.getInterpolatedAttribute(r,o,c,l,d,new fe)),a&&(h.normal=ui.getInterpolatedAttribute(a,o,c,l,d,new V),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:c,c:l,normal:new V,materialIndex:0};ui.getNormal(io,so,ro,u.normal),h.face=u,h.barycoord=d}return h}var ia=class extends Nt{constructor(e=null,t=1,n=1,s,r,a,o,c,l=wt,h=wt,d,u){super(null,a,o,c,l,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Rn=class extends Mt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Hs=new rt,Gd=new rt,lo=[],Wd=new zt,Pg=new rt,zr=new gt,kr=new gi,tr=class extends gt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Rn(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Pg)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new zt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Hs),Wd.copy(e.boundingBox).applyMatrix4(Hs),this.boundingBox.union(Wd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new gi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Hs),kr.copy(e.boundingSphere).applyMatrix4(Hs),this.boundingSphere.union(kr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(zr.geometry=this.geometry,zr.material=this.material,zr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),kr.copy(this.boundingSphere),kr.applyMatrix4(n),e.ray.intersectsSphere(kr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Hs),Gd.multiplyMatrices(n,Hs),zr.matrixWorld=Gd,zr.raycast(e,lo);for(let a=0,o=lo.length;a<o;a++){let c=lo[a];c.instanceId=r,c.object=this,t.push(c)}lo.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Rn(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new ia(new Float32Array(s*this.count),s,this.count,lc,yn));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},nh=new V,Lg=new V,Ng=new qe,Wt=class{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=nh.subVectors(n,t).cross(Lg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(nh),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Ng.getNormalMatrix(e),s=this.coplanarPoint(nh).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},ss=new gi,Dg=new fe(.5,.5),ho=new V,nr=class{constructor(e=new Wt,t=new Wt,n=new Wt,s=new Wt,r=new Wt,a=new Wt){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=An,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],d=r[5],u=r[6],f=r[7],m=r[8],y=r[9],g=r[10],p=r[11],E=r[12],b=r[13],_=r[14],M=r[15];if(s[0].setComponents(l-a,f-h,p-m,M-E).normalize(),s[1].setComponents(l+a,f+h,p+m,M+E).normalize(),s[2].setComponents(l+o,f+d,p+y,M+b).normalize(),s[3].setComponents(l-o,f-d,p-y,M-b).normalize(),n)s[4].setComponents(c,u,g,_).normalize(),s[5].setComponents(l-c,f-u,p-g,M-_).normalize();else if(s[4].setComponents(l-c,f-u,p-g,M-_).normalize(),t===An)s[5].setComponents(l+c,f+u,p+g,M+_).normalize();else if(t===Zs)s[5].setComponents(c,u,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ss.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ss.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ss)}intersectsSprite(e){ss.center.set(0,0,0);let t=Dg.distanceTo(e.center);return ss.radius=.7071067811865476+t,ss.applyMatrix4(e.matrixWorld),this.intersectsSphere(ss)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(ho.x=s.normal.x>0?e.max.x:e.min.x,ho.y=s.normal.y>0?e.max.y:e.min.y,ho.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ho)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var zi=class extends Yn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ve(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},No=new V,Do=new V,Xd=new rt,Vr=new er,uo=new gi,ih=new V,qd=new V,hs=class extends It{constructor(e=new At,t=new zi){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)No.fromBufferAttribute(t,s-1),Do.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=No.distanceTo(Do);e.setAttribute("lineDistance",new yt(n,1))}else Xe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),uo.copy(n.boundingSphere),uo.applyMatrix4(s),uo.radius+=r,e.ray.intersectsSphere(uo)===!1)return;Xd.copy(s).invert(),Vr.copy(e.ray).applyMatrix4(Xd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let y=f,g=m-1;y<g;y+=l){let p=h.getX(y),E=h.getX(y+1),b=fo(this,e,Vr,c,p,E,y);b&&t.push(b)}if(this.isLineLoop){let y=h.getX(m-1),g=h.getX(f),p=fo(this,e,Vr,c,y,g,m-1);p&&t.push(p)}}else{let f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let y=f,g=m-1;y<g;y+=l){let p=fo(this,e,Vr,c,y,y+1,y);p&&t.push(p)}if(this.isLineLoop){let y=fo(this,e,Vr,c,m-1,f,m-1);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function fo(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(No.fromBufferAttribute(o,s),Do.fromBufferAttribute(o,r),t.distanceSqToSegment(No,Do,ih,qd)>n)return;ih.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(ih);if(!(l<e.near||l>e.far))return{distance:l,point:qd.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Zd=new V,Yd=new V,ir=class extends hs{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Zd.fromBufferAttribute(t,s),Yd.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Zd.distanceTo(Yd);e.setAttribute("lineDistance",new yt(n,1))}else Xe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var sa=class extends Nt{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=wt,this.minFilter=wt,this.generateMipmaps=!1,this.needsUpdate=!0}},ki=class extends Nt{constructor(e,t,n,s,r,a,o,c,l,h,d,u){super(null,a,o,c,l,h,s,r,d,u),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}};var ra=class extends Nt{constructor(e=[],t=Xi,n,s,r,a,o,c,l,h){super(e,t,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},hn=class extends Nt{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var xi=class extends Nt{constructor(e,t,n=Pn,s,r,a,o=wt,c=wt,l,h=Xn,d=1){if(h!==Xn&&h!==qi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new pi(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Uo=class extends xi{constructor(e,t=Pn,n=Xi,s,r,a=wt,o=wt,c,l=Xn){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},aa=class extends Nt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},sr=class i extends At{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],d=[],u=0,f=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,s,a,2),m("x","z","y",1,-1,e,n,-t,s,a,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new yt(l,3)),this.setAttribute("normal",new yt(h,3)),this.setAttribute("uv",new yt(d,2));function m(y,g,p,E,b,_,M,T,A,x,R){let D=_/A,w=M/x,I=_/2,O=M/2,B=T/2,U=A+1,q=x+1,G=0,H=0,j=new V;for(let ie=0;ie<q;ie++){let ue=ie*w-O;for(let pe=0;pe<U;pe++){let ve=pe*D-I;j[y]=ve*E,j[g]=ue*b,j[p]=B,l.push(j.x,j.y,j.z),j[y]=0,j[g]=0,j[p]=T>0?1:-1,h.push(j.x,j.y,j.z),d.push(pe/A),d.push(1-ie/x),G+=1}}for(let ie=0;ie<x;ie++)for(let ue=0;ue<A;ue++){let pe=u+ue+U*ie,ve=u+ue+U*(ie+1),He=u+(ue+1)+U*(ie+1),Ue=u+(ue+1)+U*ie;c.push(pe,ve,Ue),c.push(ve,He,Ue),H+=6}o.addGroup(f,H,R),f+=H,u+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var un=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Xe("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);let h=n[s],u=n[s+1]-h,f=(a-h)/u;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new fe:new V);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new V,s=[],r=[],a=[],o=new V,c=new rt;for(let f=0;f<=e;f++){let m=f/e;s[f]=this.getTangentAt(m,new V)}r[0]=new V,a[0]=new V;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),u<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(tt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,m))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(tt(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let m=1;m<=e;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],f*m)),a[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},rr=class extends un{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new fe){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=c-this.aX,f=l-this.aY;c=u*h-f*d+this.aX,l=u*d+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Fo=class extends rr{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Wh(){let i=0,e=0,t=0,n=0;function s(r,a,o,c){i=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,d){let u=(a-r)/l-(o-r)/(l+h)+(o-a)/h,f=(o-a)/h-(c-a)/(h+d)+(c-o)/d;u*=h,f*=h,s(a,o,u,f)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var Jd=new V,$d=new V,sh=new Wh,rh=new Wh,ah=new Wh,Oo=class extends un{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new V){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=s[(o-1)%r]:($d.subVectors(s[0],s[1]).add(s[0]),l=$d);let d=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Jd.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Jd),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(l.distanceToSquared(d),f),y=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);y<1e-4&&(y=1),m<1e-4&&(m=y),g<1e-4&&(g=y),sh.initNonuniformCatmullRom(l.x,d.x,u.x,h.x,m,y,g),rh.initNonuniformCatmullRom(l.y,d.y,u.y,h.y,m,y,g),ah.initNonuniformCatmullRom(l.z,d.z,u.z,h.z,m,y,g)}else this.curveType==="catmullrom"&&(sh.initCatmullRom(l.x,d.x,u.x,h.x,this.tension),rh.initCatmullRom(l.y,d.y,u.y,h.y,this.tension),ah.initCatmullRom(l.z,d.z,u.z,h.z,this.tension));return n.set(sh.calc(c),rh.calc(c),ah.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new V().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Kd(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,c=i*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*i+t}function Ug(i,e){let t=1-i;return t*t*e}function Fg(i,e){return 2*(1-i)*i*e}function Og(i,e){return i*i*e}function Xr(i,e,t,n){return Ug(i,e)+Fg(i,t)+Og(i,n)}function Bg(i,e){let t=1-i;return t*t*t*e}function zg(i,e){let t=1-i;return 3*t*t*i*e}function kg(i,e){return 3*(1-i)*i*i*e}function Vg(i,e){return i*i*i*e}function qr(i,e,t,n,s){return Bg(i,e)+zg(i,t)+kg(i,n)+Vg(i,s)}var oa=class extends un{constructor(e=new fe,t=new fe,n=new fe,s=new fe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new fe){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(qr(e,s.x,r.x,a.x,o.x),qr(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Bo=class extends un{constructor(e=new V,t=new V,n=new V,s=new V){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new V){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(qr(e,s.x,r.x,a.x,o.x),qr(e,s.y,r.y,a.y,o.y),qr(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ca=class extends un{constructor(e=new fe,t=new fe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new fe){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new fe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},zo=class extends un{constructor(e=new V,t=new V){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new V){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new V){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},la=class extends un{constructor(e=new fe,t=new fe,n=new fe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new fe){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Xr(e,s.x,r.x,a.x),Xr(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ko=class extends un{constructor(e=new V,t=new V,n=new V){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new V){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Xr(e,s.x,r.x,a.x),Xr(e,s.y,r.y,a.y),Xr(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ha=class extends un{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new fe){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(Kd(o,c.x,l.x,h.x,d.x),Kd(o,c.y,l.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new fe().fromArray(s))}return this}},fh=Object.freeze({__proto__:null,ArcCurve:Fo,CatmullRomCurve3:Oo,CubicBezierCurve:oa,CubicBezierCurve3:Bo,EllipseCurve:rr,LineCurve:ca,LineCurve3:zo,QuadraticBezierCurve:la,QuadraticBezierCurve3:ko,SplineCurve:ha}),Vo=class extends un{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new fh[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new fh[s.type]().fromJSON(s))}return this}},Jn=class extends Vo{constructor(e){super(),this.type="Path",this.currentPoint=new fe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ca(this.currentPoint.clone(),new fe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new la(this.currentPoint.clone(),new fe(e,t),new fe(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){let o=new oa(this.currentPoint.clone(),new fe(e,t),new fe(n,s),new fe(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new ha(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,r,a,o,c),this}absellipse(e,t,n,s,r,a,o,c){let l=new rr(e,t,n,s,r,a,o,c);if(this.curves.length>0){let d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ua=class extends Jn{constructor(e){super(e),this.uuid=Wn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new Jn().fromJSON(s))}return this}};function Hg(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=Yf(i,0,s,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(n&&(r=Zg(i,e,r,t)),i.length>80*t){o=i[0],c=i[1];let h=o,d=c;for(let u=t;u<s;u+=t){let f=i[u],m=i[u+1];f<o&&(o=f),m<c&&(c=m),f>h&&(h=f),m>d&&(d=m)}l=Math.max(h-o,d-c),l=l!==0?32767/l:0}return da(r,a,t,o,c,l,0),a}function Yf(i,e,t,n,s){let r;if(s===s0(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=jd(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=jd(a/n|0,i[a],i[a+1],r);return r&&ar(r,r.next)&&(pa(r),r=r.next),r}function us(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(ar(t,t.next)||bt(t.prev,t,t.next)===0)){if(pa(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function da(i,e,t,n,s,r,a){if(!i)return;!a&&r&&jg(i,n,s,r);let o=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?Wg(i,n,s,r):Gg(i)){e.push(c.i,i.i,l.i),pa(i),i=l.next,o=l.next;continue}if(i=l,i===o){a?a===1?(i=Xg(us(i),e),da(i,e,t,n,s,r,2)):a===2&&qg(i,e,t,n,s,r):da(us(i),e,t,n,s,r,1);break}}}function Gg(i){let e=i.prev,t=i,n=i.next;if(bt(e,t,n)>=0)return!1;let s=e.x,r=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(s,r,a),d=Math.min(o,c,l),u=Math.max(s,r,a),f=Math.max(o,c,l),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=u&&m.y>=d&&m.y<=f&&Hr(s,o,r,c,a,l,m.x,m.y)&&bt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Wg(i,e,t,n){let s=i.prev,r=i,a=i.next;if(bt(s,r,a)>=0)return!1;let o=s.x,c=r.x,l=a.x,h=s.y,d=r.y,u=a.y,f=Math.min(o,c,l),m=Math.min(h,d,u),y=Math.max(o,c,l),g=Math.max(h,d,u),p=ph(f,m,e,t,n),E=ph(y,g,e,t,n),b=i.prevZ,_=i.nextZ;for(;b&&b.z>=p&&_&&_.z<=E;){if(b.x>=f&&b.x<=y&&b.y>=m&&b.y<=g&&b!==s&&b!==a&&Hr(o,h,c,d,l,u,b.x,b.y)&&bt(b.prev,b,b.next)>=0||(b=b.prevZ,_.x>=f&&_.x<=y&&_.y>=m&&_.y<=g&&_!==s&&_!==a&&Hr(o,h,c,d,l,u,_.x,_.y)&&bt(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;b&&b.z>=p;){if(b.x>=f&&b.x<=y&&b.y>=m&&b.y<=g&&b!==s&&b!==a&&Hr(o,h,c,d,l,u,b.x,b.y)&&bt(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;_&&_.z<=E;){if(_.x>=f&&_.x<=y&&_.y>=m&&_.y<=g&&_!==s&&_!==a&&Hr(o,h,c,d,l,u,_.x,_.y)&&bt(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Xg(i,e){let t=i;do{let n=t.prev,s=t.next.next;!ar(n,s)&&$f(n,t,t.next,s)&&fa(n,s)&&fa(s,n)&&(e.push(n.i,t.i,s.i),pa(t),pa(t.next),t=i=s),t=t.next}while(t!==i);return us(t)}function qg(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&t0(a,o)){let c=Kf(a,o);a=us(a,a.next),c=us(c,c.next),da(a,e,t,n,s,r,0),da(c,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function Zg(i,e,t,n){let s=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,c=r<a-1?e[r+1]*n:i.length,l=Yf(i,o,c,n,!1);l===l.next&&(l.steiner=!0),s.push(e0(l))}s.sort(Yg);for(let r=0;r<s.length;r++)t=Jg(s[r],t);return t}function Yg(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Jg(i,e){let t=$g(i,e);if(!t)return e;let n=Kf(t,i);return us(n,n.next),us(t,t.next)}function $g(i,e){let t=e,n=i.x,s=i.y,r=-1/0,a;if(ar(i,t))return t;do{if(ar(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let d=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,a=t.x<t.next.x?t:t.next,d===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,c=a.x,l=a.y,h=1/0;t=a;do{if(n>=t.x&&t.x>=c&&n!==t.x&&Jf(s<l?n:r,s,c,l,s<l?r:n,s,t.x,t.y)){let d=Math.abs(s-t.y)/(n-t.x);fa(t,i)&&(d<h||d===h&&(t.x>a.x||t.x===a.x&&Kg(a,t)))&&(a=t,h=d)}t=t.next}while(t!==o);return a}function Kg(i,e){return bt(i.prev,i,e.prev)<0&&bt(e.next,i,i.next)<0}function jg(i,e,t,n){let s=i;do s.z===0&&(s.z=ph(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Qg(s)}function Qg(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,!!a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function ph(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function e0(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Jf(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function Hr(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&Jf(i,e,t,n,s,r,a,o)}function t0(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!n0(i,e)&&(fa(i,e)&&fa(e,i)&&i0(i,e)&&(bt(i.prev,i,e.prev)||bt(i,e.prev,e))||ar(i,e)&&bt(i.prev,i,i.next)>0&&bt(e.prev,e,e.next)>0)}function bt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function ar(i,e){return i.x===e.x&&i.y===e.y}function $f(i,e,t,n){let s=mo(bt(i,e,t)),r=mo(bt(i,e,n)),a=mo(bt(t,n,i)),o=mo(bt(t,n,e));return!!(s!==r&&a!==o||s===0&&po(i,t,e)||r===0&&po(i,n,e)||a===0&&po(t,i,n)||o===0&&po(t,e,n))}function po(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function mo(i){return i>0?1:i<0?-1:0}function n0(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&$f(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function fa(i,e){return bt(i.prev,i,i.next)<0?bt(i,e,i.next)>=0&&bt(i,i.prev,e)>=0:bt(i,e,i.prev)<0||bt(i,i.next,e)<0}function i0(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Kf(i,e){let t=mh(i.i,i.x,i.y),n=mh(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function jd(i,e,t,n){let s=mh(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function pa(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function mh(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function s0(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var gh=class{static triangulate(e,t,n=2){return Hg(e,t,n)}},Gn=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];Qd(e),ef(n,e);let a=e.length;t.forEach(Qd);for(let c=0;c<t.length;c++)s.push(a),a+=t[c].length,ef(n,t[c]);let o=gh.triangulate(n,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}};function Qd(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function ef(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var ma=class i extends At{constructor(e=new ua([new fe(.5,.5),new fe(-.5,.5),new fe(-.5,-.5),new fe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let o=0,c=e.length;o<c;o++){let l=e[o];a(l)}this.setAttribute("position",new yt(s,3)),this.setAttribute("uv",new yt(r,2)),this.computeVertexNormals();function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:f-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,E=t.UVGenerator!==void 0?t.UVGenerator:r0,b,_=!1,M,T,A,x;if(p){b=p.getSpacedPoints(h),_=!0,u=!1;let P=p.isCatmullRomCurve3?p.closed:!1;M=p.computeFrenetFrames(h,P),T=new V,A=new V,x=new V}u||(g=0,f=0,m=0,y=0);let R=o.extractPoints(l),D=R.shape,w=R.holes;if(!Gn.isClockWise(D)){D=D.reverse();for(let P=0,Z=w.length;P<Z;P++){let k=w[P];Gn.isClockWise(k)&&(w[P]=k.reverse())}}function O(P){let k=10000000000000001e-36,Q=P[0];for(let ne=1;ne<=P.length;ne++){let le=ne%P.length,xe=P[le],_e=xe.x-Q.x,J=xe.y-Q.y,S=_e*_e+J*J,Pe=Math.max(Math.abs(xe.x),Math.abs(xe.y),Math.abs(Q.x),Math.abs(Q.y)),Fe=k*Pe*Pe;if(S<=Fe){P.splice(le,1),ne--;continue}Q=xe}}O(D),w.forEach(O);let B=w.length,U=D;for(let P=0;P<B;P++){let Z=w[P];D=D.concat(Z)}function q(P,Z,k){return Z||Ye("ExtrudeGeometry: vec does not exist"),P.clone().addScaledVector(Z,k)}let G=D.length;function H(P,Z,k){let Q,ne,le,xe=P.x-Z.x,_e=P.y-Z.y,J=k.x-P.x,S=k.y-P.y,Pe=xe*xe+_e*_e,Fe=xe*S-_e*J;if(Math.abs(Fe)>Number.EPSILON){let L=Math.sqrt(Pe),v=Math.sqrt(J*J+S*S),$=Z.x-_e/L,te=Z.y+xe/L,ce=k.x-S/v,Me=k.y+J/v,Se=((ce-$)*S-(Me-te)*J)/(xe*S-_e*J);Q=$+xe*Se-P.x,ne=te+_e*Se-P.y;let he=Q*Q+ne*ne;if(he<=2)return new fe(Q,ne);le=Math.sqrt(he/2)}else{let L=!1;xe>Number.EPSILON?J>Number.EPSILON&&(L=!0):xe<-Number.EPSILON?J<-Number.EPSILON&&(L=!0):Math.sign(_e)===Math.sign(S)&&(L=!0),L?(Q=-_e,ne=xe,le=Math.sqrt(Pe)):(Q=xe,ne=_e,le=Math.sqrt(Pe/2))}return new fe(Q/le,ne/le)}let j=[];for(let P=0,Z=U.length,k=Z-1,Q=P+1;P<Z;P++,k++,Q++)k===Z&&(k=0),Q===Z&&(Q=0),j[P]=H(U[P],U[k],U[Q]);let ie=[],ue,pe=j.concat();for(let P=0,Z=B;P<Z;P++){let k=w[P];ue=[];for(let Q=0,ne=k.length,le=ne-1,xe=Q+1;Q<ne;Q++,le++,xe++)le===ne&&(le=0),xe===ne&&(xe=0),ue[Q]=H(k[Q],k[le],k[xe]);ie.push(ue),pe=pe.concat(ue)}let ve;if(g===0)ve=Gn.triangulateShape(U,w);else{let P=[],Z=[];for(let k=0;k<g;k++){let Q=k/g,ne=f*Math.cos(Q*Math.PI/2),le=m*Math.sin(Q*Math.PI/2)+y;for(let xe=0,_e=U.length;xe<_e;xe++){let J=q(U[xe],j[xe],le);F(J.x,J.y,-ne),Q===0&&P.push(J)}for(let xe=0,_e=B;xe<_e;xe++){let J=w[xe];ue=ie[xe];let S=[];for(let Pe=0,Fe=J.length;Pe<Fe;Pe++){let L=q(J[Pe],ue[Pe],le);F(L.x,L.y,-ne),Q===0&&S.push(L)}Q===0&&Z.push(S)}}ve=Gn.triangulateShape(P,Z)}let He=ve.length,Ue=m+y;for(let P=0;P<G;P++){let Z=u?q(D[P],pe[P],Ue):D[P];_?(A.copy(M.normals[0]).multiplyScalar(Z.x),T.copy(M.binormals[0]).multiplyScalar(Z.y),x.copy(b[0]).add(A).add(T),F(x.x,x.y,x.z)):F(Z.x,Z.y,0)}for(let P=1;P<=h;P++)for(let Z=0;Z<G;Z++){let k=u?q(D[Z],pe[Z],Ue):D[Z];_?(A.copy(M.normals[P]).multiplyScalar(k.x),T.copy(M.binormals[P]).multiplyScalar(k.y),x.copy(b[P]).add(A).add(T),F(x.x,x.y,x.z)):F(k.x,k.y,d/h*P)}for(let P=g-1;P>=0;P--){let Z=P/g,k=f*Math.cos(Z*Math.PI/2),Q=m*Math.sin(Z*Math.PI/2)+y;for(let ne=0,le=U.length;ne<le;ne++){let xe=q(U[ne],j[ne],Q);F(xe.x,xe.y,d+k)}for(let ne=0,le=w.length;ne<le;ne++){let xe=w[ne];ue=ie[ne];for(let _e=0,J=xe.length;_e<J;_e++){let S=q(xe[_e],ue[_e],Q);_?F(S.x,S.y+b[h-1].y,b[h-1].x+k):F(S.x,S.y,d+k)}}}ee(),W();function ee(){let P=s.length/3;if(u){let Z=0,k=G*Z;for(let Q=0;Q<He;Q++){let ne=ve[Q];N(ne[2]+k,ne[1]+k,ne[0]+k)}Z=h+g*2,k=G*Z;for(let Q=0;Q<He;Q++){let ne=ve[Q];N(ne[0]+k,ne[1]+k,ne[2]+k)}}else{for(let Z=0;Z<He;Z++){let k=ve[Z];N(k[2],k[1],k[0])}for(let Z=0;Z<He;Z++){let k=ve[Z];N(k[0]+G*h,k[1]+G*h,k[2]+G*h)}}n.addGroup(P,s.length/3-P,0)}function W(){let P=s.length/3,Z=0;z(U,Z),Z+=U.length;for(let k=0,Q=w.length;k<Q;k++){let ne=w[k];z(ne,Z),Z+=ne.length}n.addGroup(P,s.length/3-P,1)}function z(P,Z){let k=P.length;for(;--k>=0;){let Q=k,ne=k-1;ne<0&&(ne=P.length-1);for(let le=0,xe=h+g*2;le<xe;le++){let _e=G*le,J=G*(le+1),S=Z+Q+_e,Pe=Z+ne+_e,Fe=Z+ne+J,L=Z+Q+J;X(S,Pe,Fe,L)}}}function F(P,Z,k){c.push(P),c.push(Z),c.push(k)}function N(P,Z,k){oe(P),oe(Z),oe(k);let Q=s.length/3,ne=E.generateTopUV(n,s,Q-3,Q-2,Q-1);de(ne[0]),de(ne[1]),de(ne[2])}function X(P,Z,k,Q){oe(P),oe(Z),oe(Q),oe(Z),oe(k),oe(Q);let ne=s.length/3,le=E.generateSideWallUV(n,s,ne-6,ne-3,ne-2,ne-1);de(le[0]),de(le[1]),de(le[3]),de(le[1]),de(le[2]),de(le[3])}function oe(P){s.push(c[P*3+0]),s.push(c[P*3+1]),s.push(c[P*3+2])}function de(P){r.push(P.x),r.push(P.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return a0(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new fh[s.type]().fromJSON(s)),new i(n,e.options)}},r0={generateTopUV:function(i,e,t,n,s){let r=e[t*3],a=e[t*3+1],o=e[n*3],c=e[n*3+1],l=e[s*3],h=e[s*3+1];return[new fe(r,a),new fe(o,c),new fe(l,h)]},generateSideWallUV:function(i,e,t,n,s,r){let a=e[t*3],o=e[t*3+1],c=e[t*3+2],l=e[n*3],h=e[n*3+1],d=e[n*3+2],u=e[s*3],f=e[s*3+1],m=e[s*3+2],y=e[r*3],g=e[r*3+1],p=e[r*3+2];return Math.abs(o-h)<Math.abs(a-l)?[new fe(a,1-c),new fe(l,1-d),new fe(u,1-m),new fe(y,1-p)]:[new fe(o,1-c),new fe(h,1-d),new fe(f,1-m),new fe(g,1-p)]}};function a0(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var dn=class i extends At{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,d=e/o,u=t/c,f=[],m=[],y=[],g=[];for(let p=0;p<h;p++){let E=p*u-a;for(let b=0;b<l;b++){let _=b*d-r;m.push(_,-E,0),y.push(0,0,1),g.push(b/o),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let E=0;E<o;E++){let b=E+l*p,_=E+l*(p+1),M=E+1+l*(p+1),T=E+1+l*p;f.push(b,_,T),f.push(_,M,T)}this.setIndex(f),this.setAttribute("position",new yt(m,3)),this.setAttribute("normal",new yt(y,3)),this.setAttribute("uv",new yt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var ga=class i extends At{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],d=new V,u=new V,f=[],m=[],y=[],g=[];for(let p=0;p<=n;p++){let E=[],b=p/n,_=a+b*o,M=e*Math.cos(_),T=Math.sqrt(e*e-M*M),A=0;p===0&&a===0?A=.5/t:p===n&&c===Math.PI&&(A=-.5/t);for(let x=0;x<=t;x++){let R=x/t,D=s+R*r;d.x=-T*Math.cos(D),d.y=M,d.z=T*Math.sin(D),m.push(d.x,d.y,d.z),u.copy(d).normalize(),y.push(u.x,u.y,u.z),g.push(R+A,1-b),E.push(l++)}h.push(E)}for(let p=0;p<n;p++)for(let E=0;E<t;E++){let b=h[p][E+1],_=h[p][E],M=h[p+1][E],T=h[p+1][E+1];(p!==0||a>0)&&f.push(b,_,T),(p!==n-1||c<Math.PI)&&f.push(_,M,T)}this.setIndex(f),this.setAttribute("position",new yt(m,3)),this.setAttribute("normal",new yt(y,3)),this.setAttribute("uv",new yt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function ms(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(tf(s))s.isRenderTargetTexture?(Xe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(tf(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function qt(i){let e={};for(let t=0;t<i.length;t++){let n=ms(i[t]);for(let s in n)e[s]=n[s]}return e}function tf(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function o0(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Xh(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:it.workingColorSpace}var jf={clone:ms,merge:qt},c0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,l0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,kt=class extends Yn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=c0,this.fragmentShader=l0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ms(e.uniforms),this.uniformsGroups=o0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Ve().setHex(s.value);break;case"v2":this.uniforms[n].value=new fe().fromArray(s.value);break;case"v3":this.uniforms[n].value=new V().fromArray(s.value);break;case"v4":this.uniforms[n].value=new mt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new qe().fromArray(s.value);break;case"m4":this.uniforms[n].value=new rt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Ho=class extends kt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},xa=class extends Yn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gc,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Go=class extends Yn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Df,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Wo=class extends Yn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function go(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}var Vi=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Xo=class extends Vi{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:lh,endingEnd:lh}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case hh:r=e,o=2*t-n;break;case uh:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case hh:a=e,c=2*n-t;break;case uh:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,m=(n-t)/(s-t),y=m*m,g=y*m,p=-u*g+2*u*y-u*m,E=(1+u)*g+(-1.5-2*u)*y+(-.5+u)*m+1,b=(-1-f)*g+(1.5+f)*y+.5*m,_=f*g-f*y;for(let M=0;M!==o;++M)r[M]=p*a[h+M]+E*a[l+M]+b*a[c+M]+_*a[d+M];return r}},qo=class extends Vi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(s-t),d=1-h;for(let u=0;u!==o;++u)r[u]=a[l+u]*d+a[c+u]*h;return r}},Zo=class extends Vi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Yo=class extends Vi{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let m=(n-t)/(s-t),y=1-m;for(let g=0;g!==o;++g)r[g]=a[l+g]*y+a[c+g]*m;return r}let u=o*2,f=e-1;for(let m=0;m!==o;++m){let y=a[l+m],g=a[c+m],p=f*u+m*2,E=d[p],b=d[p+1],_=e*u+m*2,M=h[_],T=h[_+1],A=(n-t)/(s-t),x,R,D,w,I;for(let O=0;O<8;O++){x=A*A,R=x*A,D=1-A,w=D*D,I=w*D;let U=I*t+3*w*A*E+3*D*x*M+R*s-n;if(Math.abs(U)<1e-10)break;let q=3*w*(E-t)+6*D*A*(M-E)+3*x*(s-M);if(Math.abs(q)<1e-10)break;A=A-U/q,A=Math.max(0,Math.min(1,A))}r[m]=I*y+3*w*A*b+3*D*x*T+R*g}return r}},fn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=go(t,this.TimeBufferType),this.values=go(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:go(e.times,Array),values:go(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Zo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new qo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Xo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Yo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ls:t=this.InterpolantFactoryMethodDiscrete;break;case qs:t=this.InterpolantFactoryMethodLinear;break;case yo:t=this.InterpolantFactoryMethodSmooth;break;case ch:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Xe("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ls;case this.InterpolantFactoryMethodLinear:return qs;case this.InterpolantFactoryMethodSmooth:return yo;case this.InterpolantFactoryMethodBezier:return ch}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ye("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ye("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){Ye("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){Ye("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&Qm(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){Ye("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===yo,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(s)c=!0;else{let d=o*n,u=d-n,f=d+n;for(let m=0;m!==n;++m){let y=t[d+m];if(y!==t[u+m]||y!==t[f+m]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let d=o*n,u=a*n;for(let f=0;f!==n;++f)t[u+f]=t[d+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};fn.prototype.ValueTypeName="";fn.prototype.TimeBufferType=Float32Array;fn.prototype.ValueBufferType=Float32Array;fn.prototype.DefaultInterpolation=qs;var Hi=class extends fn{constructor(e,t,n){super(e,t,n)}};Hi.prototype.ValueTypeName="bool";Hi.prototype.ValueBufferType=Array;Hi.prototype.DefaultInterpolation=ls;Hi.prototype.InterpolantFactoryMethodLinear=void 0;Hi.prototype.InterpolantFactoryMethodSmooth=void 0;var Jo=class extends fn{constructor(e,t,n,s){super(e,t,n,s)}};Jo.prototype.ValueTypeName="color";var $o=class extends fn{constructor(e,t,n,s){super(e,t,n,s)}};$o.prototype.ValueTypeName="number";var Ko=class extends Vi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t),l=e*o;for(let h=l+o;l!==h;l+=4)_n.slerpFlat(r,0,a,l-o,a,l,c);return r}},_a=class extends fn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Ko(this.times,this.values,this.getValueSize(),e)}};_a.prototype.ValueTypeName="quaternion";_a.prototype.InterpolantFactoryMethodSmooth=void 0;var Gi=class extends fn{constructor(e,t,n){super(e,t,n)}};Gi.prototype.ValueTypeName="string";Gi.prototype.ValueBufferType=Array;Gi.prototype.DefaultInterpolation=ls;Gi.prototype.InterpolantFactoryMethodLinear=void 0;Gi.prototype.InterpolantFactoryMethodSmooth=void 0;var jo=class extends fn{constructor(e,t,n,s){super(e,t,n,s)}};jo.prototype.ValueTypeName="vector";var xh={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(nf(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!nf(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function nf(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var Qo=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){let d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){let f=l[d],m=l[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Qf=new Qo,ds=class{constructor(e){this.manager=e!==void 0?e:Qf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};ds.DEFAULT_MATERIAL_NAME="__DEFAULT";var hi={},_h=class extends Error{constructor(e,t){super(e),this.response=t}},ya=class extends ds{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=xh.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(hi[e]!==void 0){hi[e].push({onLoad:t,onProgress:n,onError:s});return}hi[e]=[],hi[e].push({onLoad:t,onProgress:n,onError:s});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Xe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=hi[e],d=l.body.getReader(),u=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=u?parseInt(u):0,m=f!==0,y=0,g=new ReadableStream({start(p){E();function E(){d.read().then(({done:b,value:_})=>{if(b)p.close();else{y+=_.byteLength;let M=new ProgressEvent("progress",{lengthComputable:m,loaded:y,total:f});for(let T=0,A=h.length;T<A;T++){let x=h[T];x.onProgress&&x.onProgress(M)}p.enqueue(_),E()}},b=>{p.error(b)})}}});return new Response(g)}else throw new _h(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{let d=/charset="?([^;"\s]*)"?/i.exec(o),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return l.arrayBuffer().then(m=>f.decode(m))}}}).then(l=>{xh.add(`file:${e}`,l);let h=hi[e];delete hi[e];for(let d=0,u=h.length;d<u;d++){let f=h[d];f.onLoad&&f.onLoad(l)}}).catch(l=>{let h=hi[e];if(h===void 0)throw this.manager.itemError(e),l;delete hi[e];for(let d=0,u=h.length;d<u;d++){let f=h[d];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var va=class extends It{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ve(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ma=class extends va{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(It.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ve(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},oh=new rt,sf=new V,rf=new V,yh=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new fe(512,512),this.mapType=nn,this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new nr,this._frameExtents=new fe(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;sf.setFromMatrixPosition(e.matrixWorld),t.position.copy(sf),rf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(rf),t.updateMatrixWorld(),oh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(oh,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Zs||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(oh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},xo=new V,_o=new _n,Hn=new V,Sa=class extends It{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=An,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(xo,_o,Hn),Hn.x===1&&Hn.y===1&&Hn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xo,_o,Hn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(xo,_o,Hn),Hn.x===1&&Hn.y===1&&Hn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xo,_o,Hn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Fi=new V,af=new fe,of=new fe,Bt=class extends Sa{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Js*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Gr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Js*2*Math.atan(Math.tan(Gr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Fi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Fi.x,Fi.y).multiplyScalar(-e/Fi.z),Fi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Fi.x,Fi.y).multiplyScalar(-e/Fi.z)}getViewSize(e,t){return this.getViewBounds(e,af,of),t.subVectors(of,af)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Gr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Wi=class extends Sa{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},vh=class extends yh{constructor(){super(new Wi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},or=class extends va{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(It.DEFAULT_UP),this.updateMatrix(),this.target=new It,this.shadow=new vh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var ba=class extends At{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var Gs=-90,Ws=1,ec=class extends It{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Bt(Gs,Ws,e,t);s.layers=this.layers,this.add(s);let r=new Bt(Gs,Ws,e,t);r.layers=this.layers,this.add(r);let a=new Bt(Gs,Ws,e,t);a.layers=this.layers,this.add(a);let o=new Bt(Gs,Ws,e,t);o.layers=this.layers,this.add(o);let c=new Bt(Gs,Ws,e,t);c.layers=this.layers,this.add(c);let l=new Bt(Gs,Ws,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===An)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Zs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},tc=class extends Bt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var qh="\\[\\]\\.:\\/",h0=new RegExp("["+qh+"]","g"),Zh="[^"+qh+"]",u0="[^"+qh.replace("\\.","")+"]",d0=/((?:WC+[\/:])*)/.source.replace("WC",Zh),f0=/(WCOD+)?/.source.replace("WCOD",u0),p0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Zh),m0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Zh),g0=new RegExp("^"+d0+f0+p0+m0+"$"),x0=["material","materials","bones","map"],Mh=class{constructor(e,t,n){let s=n||ct.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ct=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(h0,"")}static parseTrackName(e){let t=g0.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);x0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Xe("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){Ye("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ye("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ye("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ye("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ye("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ye("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){Ye("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[s];if(a===void 0){let l=t.nodeName;Ye("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ye("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ye("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ct.Composite=Mh;ct.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ct.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ct.prototype.GetterByBindingType=[ct.prototype._getValue_direct,ct.prototype._getValue_array,ct.prototype._getValue_arrayElement,ct.prototype._getValue_toArray];ct.prototype.SetterByBindingTypeAndVersioning=[[ct.prototype._setValue_direct,ct.prototype._setValue_direct_setNeedsUpdate,ct.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_array,ct.prototype._setValue_array_setNeedsUpdate,ct.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_arrayElement,ct.prototype._setValue_arrayElement_setNeedsUpdate,ct.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_fromArray,ct.prototype._setValue_fromArray_setNeedsUpdate,ct.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var iM=new Float32Array(1);var cf=new rt,_i=class{constructor(e,t,n=0,s=1/0){this.ray=new er(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Ks,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ye("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return cf.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(cf),this}intersectObject(e,t=!0,n=[]){return Sh(e,this,n,t),n.sort(lf),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Sh(e[s],this,n,t);return n.sort(lf),n}};function lf(i,e){return i.distance-e.distance}function Sh(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)Sh(r[a],e,t,!0)}}var Qh=class Qh{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};Qh.prototype.isMatrix2=!0;var bh=Qh,hf=new fe,cr=class{constructor(e=new fe(1/0,1/0),t=new fe(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=hf.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,hf).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}};var Cn=class{constructor(){this.type="ShapePath",this.color=new Ve,this.subPaths=[],this.currentPath=null,this.userData={}}moveTo(e,t){return this.currentPath=new Jn,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,s){return this.currentPath.quadraticCurveTo(e,t,n,s),this}bezierCurveTo(e,t,n,s,r,a){return this.currentPath.bezierCurveTo(e,t,n,s,r,a),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(){function e(c,l){let h=!1,d=l.length;for(let u=0,f=d-1;u<d;f=u++){let m=l[u],y=l[f];m.y>c.y!=y.y>c.y&&c.x<(y.x-m.x)*(c.y-m.y)/(y.y-m.y)+m.x&&(h=!h)}return h}function t(c,l){let h=l.getCenter(new fe);if(e(h,c))return h;let d=h.y,u=[],f=c.length;for(let m=0;m<f;m++){let y=c[m],g=c[(m+1)%f];if(y.y>d!=g.y>d){let p=y.x+(d-y.y)*(g.x-y.x)/(g.y-y.y);u.push(p)}}return u.length>1&&(u.sort((m,y)=>m-y),h.x=(u[0]+u[1])/2),h}let n=this.userData.style&&this.userData.style.fillRule||"nonzero";n!=="nonzero"&&n!=="evenodd"&&(Xe('Fill-rule "'+n+'" is not supported, falling back to "nonzero".'),n="nonzero");let s=n==="nonzero"?(c=>c!==0):(c=>(c&1)!==0),r=[];for(let c of this.subPaths){let l=c.getPoints();if(l.length<3)continue;let h=Gn.area(l);if(h===0)continue;let d=new cr;for(let u=0;u<l.length;u++)d.expandByPoint(l[u]);r.push({subPath:c,points:l,boundingBox:d,interiorPoint:t(l,d),absArea:Math.abs(h),winding:h<0?-1:1,container:null,exclude:!1,role:null})}r.sort((c,l)=>l.absArea-c.absArea);for(let c=0;c<r.length;c++){let l=r[c],h=0;for(let d=c-1;d>=0;d--){let u=r[d];if(u.boundingBox.containsPoint(l.interiorPoint)&&e(l.interiorPoint,u.points)){l.container=u.exclude?u.container:u,h=u.winding,l.winding+=h;break}}s(l.winding)===s(h)&&(l.exclude=!0)}for(let c of r)c.exclude||(c.role=c.container===null||c.container.role==="hole"?"outer":"hole");let a=[],o=new Map;for(let c of r){if(c.exclude||c.role!=="outer")continue;let l=new ua;l.curves=c.subPath.curves,a.push(l),o.set(c,l)}for(let c of r){if(c.exclude||c.role!=="hole")continue;let l=o.get(c.container);if(!l)continue;let h=new Jn;h.curves=c.subPath.curves,l.holes.push(h)}return a}};function Yh(i,e,t,n){let s=_0(n);switch(t){case kh:return i*e;case lc:return i*e/s.components*s.byteLength;case hc:return i*e/s.components*s.byteLength;case Zi:return i*e*2/s.components*s.byteLength;case uc:return i*e*2/s.components*s.byteLength;case Vh:return i*e*3/s.components*s.byteLength;case sn:return i*e*4/s.components*s.byteLength;case dc:return i*e*4/s.components*s.byteLength;case Aa:case Ra:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ca:case Ia:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case pc:case gc:return Math.max(i,16)*Math.max(e,8)/4;case fc:case mc:return Math.max(i,8)*Math.max(e,8)/2;case xc:case _c:case vc:case Mc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case yc:case Pa:case Sc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case bc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ec:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Tc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case wc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ac:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Rc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Cc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ic:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Pc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Lc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Nc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Dc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Uc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Fc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Oc:case Bc:case zc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case kc:case Vc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case La:case Hc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function _0(i){switch(i){case nn:case Fh:return{byteLength:1,components:1};case ur:case Oh:case jn:return{byteLength:2,components:1};case oc:case cc:return{byteLength:2,components:4};case Pn:case ac:case yn:return{byteLength:4,components:1};case Bh:case zh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));typeof window<"u"&&(window.__THREE__?Xe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function Sp(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function y0(i){let e=new WeakMap;function t(o,c){let l=o.array,h=o.usage,d=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){let h=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,h);else{d.sort((f,m)=>f.start-m.start);let u=0;for(let f=1;f<d.length;f++){let m=d[u],y=d[f];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++u,d[u]=y)}d.length=u+1;for(let f=0,m=d.length;f<m;f++){let y=d[f];i.bufferSubData(l,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var v0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,M0=`#ifdef USE_ALPHAHASH
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
#endif`,S0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,b0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,E0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,T0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,w0=`#ifdef USE_AOMAP
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
#endif`,A0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,R0=`#ifdef USE_BATCHING
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
#endif`,C0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,I0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,P0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,L0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,N0=`#ifdef USE_IRIDESCENCE
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
#endif`,D0=`#ifdef USE_BUMPMAP
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
#endif`,U0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,F0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,O0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,B0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,z0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,k0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,V0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,H0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,G0=`#define PI 3.141592653589793
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
} // validated`,W0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,X0=`vec3 transformedNormal = objectNormal;
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
#endif`,q0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Z0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Y0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,J0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$0="gl_FragColor = linearToOutputTexel( gl_FragColor );",K0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,j0=`#ifdef USE_ENVMAP
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
#endif`,Q0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,ex=`#ifdef USE_ENVMAP
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
#endif`,tx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,nx=`#ifdef USE_ENVMAP
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
#endif`,ix=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ax=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ox=`#ifdef USE_GRADIENTMAP
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
}`,cx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,hx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ux=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,dx=`#ifdef USE_ENVMAP
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
#endif`,fx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,px=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,mx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xx=`PhysicalMaterial material;
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
#endif`,_x=`uniform sampler2D dfgLUT;
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
}`,yx=`
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
#endif`,vx=`#if defined( RE_IndirectDiffuse )
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
#endif`,Mx=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Sx=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,bx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ex=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ax=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Rx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Cx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ix=`#if defined( USE_POINTS_UV )
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
#endif`,Px=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Lx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Nx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Dx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ux=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fx=`#ifdef USE_MORPHTARGETS
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
#endif`,Ox=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,zx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,kx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Gx=`#ifdef USE_NORMALMAP
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
#endif`,Wx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Zx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Yx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Jx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,$x=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Kx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,jx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,e_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,t_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,n_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,i_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,s_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,r_=`float getShadowMask() {
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
}`,a_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,o_=`#ifdef USE_SKINNING
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
#endif`,c_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,l_=`#ifdef USE_SKINNING
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
#endif`,h_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,u_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,d_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,f_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,p_=`#ifdef USE_TRANSMISSION
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
#endif`,m_=`#ifdef USE_TRANSMISSION
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
#endif`,g_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,x_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,__=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,y_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,v_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,M_=`uniform sampler2D t2D;
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
}`,S_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,b_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,E_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,T_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,w_=`#include <common>
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
}`,A_=`#if DEPTH_PACKING == 3200
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
}`,R_=`#define DISTANCE
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
}`,C_=`#define DISTANCE
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
}`,I_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,P_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,L_=`uniform float scale;
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
}`,N_=`uniform vec3 diffuse;
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
}`,D_=`#include <common>
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
}`,U_=`uniform vec3 diffuse;
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
}`,F_=`#define LAMBERT
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
}`,O_=`#define LAMBERT
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
}`,B_=`#define MATCAP
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
}`,z_=`#define MATCAP
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
}`,k_=`#define NORMAL
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
}`,V_=`#define NORMAL
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
}`,H_=`#define PHONG
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
}`,G_=`#define PHONG
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
}`,W_=`#define STANDARD
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
}`,X_=`#define STANDARD
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
}`,q_=`#define TOON
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
}`,Z_=`#define TOON
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
}`,Y_=`uniform float size;
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
}`,J_=`uniform vec3 diffuse;
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
}`,$_=`#include <common>
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
}`,K_=`uniform vec3 color;
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
}`,j_=`uniform float rotation;
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
}`,Q_=`uniform vec3 diffuse;
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
}`,je={alphahash_fragment:v0,alphahash_pars_fragment:M0,alphamap_fragment:S0,alphamap_pars_fragment:b0,alphatest_fragment:E0,alphatest_pars_fragment:T0,aomap_fragment:w0,aomap_pars_fragment:A0,batching_pars_vertex:R0,batching_vertex:C0,begin_vertex:I0,beginnormal_vertex:P0,bsdfs:L0,iridescence_fragment:N0,bumpmap_pars_fragment:D0,clipping_planes_fragment:U0,clipping_planes_pars_fragment:F0,clipping_planes_pars_vertex:O0,clipping_planes_vertex:B0,color_fragment:z0,color_pars_fragment:k0,color_pars_vertex:V0,color_vertex:H0,common:G0,cube_uv_reflection_fragment:W0,defaultnormal_vertex:X0,displacementmap_pars_vertex:q0,displacementmap_vertex:Z0,emissivemap_fragment:Y0,emissivemap_pars_fragment:J0,colorspace_fragment:$0,colorspace_pars_fragment:K0,envmap_fragment:j0,envmap_common_pars_fragment:Q0,envmap_pars_fragment:ex,envmap_pars_vertex:tx,envmap_physical_pars_fragment:dx,envmap_vertex:nx,fog_vertex:ix,fog_pars_vertex:sx,fog_fragment:rx,fog_pars_fragment:ax,gradientmap_pars_fragment:ox,lightmap_pars_fragment:cx,lights_lambert_fragment:lx,lights_lambert_pars_fragment:hx,lights_pars_begin:ux,lights_toon_fragment:fx,lights_toon_pars_fragment:px,lights_phong_fragment:mx,lights_phong_pars_fragment:gx,lights_physical_fragment:xx,lights_physical_pars_fragment:_x,lights_fragment_begin:yx,lights_fragment_maps:vx,lights_fragment_end:Mx,lightprobes_pars_fragment:Sx,logdepthbuf_fragment:bx,logdepthbuf_pars_fragment:Ex,logdepthbuf_pars_vertex:Tx,logdepthbuf_vertex:wx,map_fragment:Ax,map_pars_fragment:Rx,map_particle_fragment:Cx,map_particle_pars_fragment:Ix,metalnessmap_fragment:Px,metalnessmap_pars_fragment:Lx,morphinstance_vertex:Nx,morphcolor_vertex:Dx,morphnormal_vertex:Ux,morphtarget_pars_vertex:Fx,morphtarget_vertex:Ox,normal_fragment_begin:Bx,normal_fragment_maps:zx,normal_pars_fragment:kx,normal_pars_vertex:Vx,normal_vertex:Hx,normalmap_pars_fragment:Gx,clearcoat_normal_fragment_begin:Wx,clearcoat_normal_fragment_maps:Xx,clearcoat_pars_fragment:qx,iridescence_pars_fragment:Zx,opaque_fragment:Yx,packing:Jx,premultiplied_alpha_fragment:$x,project_vertex:Kx,dithering_fragment:jx,dithering_pars_fragment:Qx,roughnessmap_fragment:e_,roughnessmap_pars_fragment:t_,shadowmap_pars_fragment:n_,shadowmap_pars_vertex:i_,shadowmap_vertex:s_,shadowmask_pars_fragment:r_,skinbase_vertex:a_,skinning_pars_vertex:o_,skinning_vertex:c_,skinnormal_vertex:l_,specularmap_fragment:h_,specularmap_pars_fragment:u_,tonemapping_fragment:d_,tonemapping_pars_fragment:f_,transmission_fragment:p_,transmission_pars_fragment:m_,uv_pars_fragment:g_,uv_pars_vertex:x_,uv_vertex:__,worldpos_vertex:y_,background_vert:v_,background_frag:M_,backgroundCube_vert:S_,backgroundCube_frag:b_,cube_vert:E_,cube_frag:T_,depth_vert:w_,depth_frag:A_,distance_vert:R_,distance_frag:C_,equirect_vert:I_,equirect_frag:P_,linedashed_vert:L_,linedashed_frag:N_,meshbasic_vert:D_,meshbasic_frag:U_,meshlambert_vert:F_,meshlambert_frag:O_,meshmatcap_vert:B_,meshmatcap_frag:z_,meshnormal_vert:k_,meshnormal_frag:V_,meshphong_vert:H_,meshphong_frag:G_,meshphysical_vert:W_,meshphysical_frag:X_,meshtoon_vert:q_,meshtoon_frag:Z_,points_vert:Y_,points_frag:J_,shadow_vert:$_,shadow_frag:K_,sprite_vert:j_,sprite_frag:Q_},Re={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},envMapRotation:{value:new qe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new V},probesMax:{value:new V},probesResolution:{value:new V}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}}},ei={basic:{uniforms:qt([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:qt([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Ve(0)},envMapIntensity:{value:1}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:qt([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:qt([Re.common,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.roughnessmap,Re.metalnessmap,Re.fog,Re.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:qt([Re.common,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.gradientmap,Re.fog,Re.lights,{emissive:{value:new Ve(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:qt([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:qt([Re.points,Re.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:qt([Re.common,Re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:qt([Re.common,Re.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:qt([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:qt([Re.sprite,Re.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qe}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distance:{uniforms:qt([Re.common,Re.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distance_vert,fragmentShader:je.distance_frag},shadow:{uniforms:qt([Re.lights,Re.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};ei.physical={uniforms:qt([ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe},anisotropyVector:{value:new fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qe}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};var qc={r:0,b:0,g:0},ey=new rt,bp=new qe;bp.set(-1,0,0,0,1,0,0,0,1);function ty(i,e,t,n,s,r){let a=new Ve(0),o=s===!0?0:1,c,l,h=null,d=0,u=null;function f(E){let b=E.isScene===!0?E.background:null;if(b&&b.isTexture){let _=E.backgroundBlurriness>0;b=e.get(b,_)}return b}function m(E){let b=!1,_=f(E);_===null?g(a,o):_&&_.isColor&&(g(_,1),b=!0);let M=i.xr.getEnvironmentBlendMode();M==="additive"?t.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(E,b){let _=f(b);_&&(_.isCubeTexture||_.mapping===wa)?(l===void 0&&(l=new gt(new sr(1,1,1),new kt({name:"BackgroundCubeMaterial",uniforms:ms(ei.backgroundCube.uniforms),vertexShader:ei.backgroundCube.vertexShader,fragmentShader:ei.backgroundCube.fragmentShader,side:Kt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(M,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=_,l.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(ey.makeRotationFromEuler(b.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(bp),l.material.toneMapped=it.getTransfer(_.colorSpace)!==lt,(h!==_||d!==_.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,d=_.version,u=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new gt(new dn(2,2),new kt({name:"BackgroundMaterial",uniforms:ms(ei.background.uniforms),vertexShader:ei.background.vertexShader,fragmentShader:ei.background.fragmentShader,side:fi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=it.getTransfer(_.colorSpace)!==lt,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=_,d=_.version,u=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function g(E,b){E.getRGB(qc,Xh(i)),t.buffers.color.setClear(qc.r,qc.g,qc.b,b,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,b=1){a.set(E),o=b,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(E){o=E,g(a,o)},render:m,addToRenderList:y,dispose:p}}function ny(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(w,I,O,B,U){let q=!1,G=d(w,B,O,I);r!==G&&(r=G,l(r.object)),q=f(w,B,O,U),q&&m(w,B,O,U),U!==null&&e.update(U,i.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,_(w,I,O,B),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function c(){return i.createVertexArray()}function l(w){return i.bindVertexArray(w)}function h(w){return i.deleteVertexArray(w)}function d(w,I,O,B){let U=B.wireframe===!0,q=n[I.id];q===void 0&&(q={},n[I.id]=q);let G=w.isInstancedMesh===!0?w.id:0,H=q[G];H===void 0&&(H={},q[G]=H);let j=H[O.id];j===void 0&&(j={},H[O.id]=j);let ie=j[U];return ie===void 0&&(ie=u(c()),j[U]=ie),ie}function u(w){let I=[],O=[],B=[];for(let U=0;U<t;U++)I[U]=0,O[U]=0,B[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:O,attributeDivisors:B,object:w,attributes:{},index:null}}function f(w,I,O,B){let U=r.attributes,q=I.attributes,G=0,H=O.getAttributes();for(let j in H)if(H[j].location>=0){let ue=U[j],pe=q[j];if(pe===void 0&&(j==="instanceMatrix"&&w.instanceMatrix&&(pe=w.instanceMatrix),j==="instanceColor"&&w.instanceColor&&(pe=w.instanceColor)),ue===void 0||ue.attribute!==pe||pe&&ue.data!==pe.data)return!0;G++}return r.attributesNum!==G||r.index!==B}function m(w,I,O,B){let U={},q=I.attributes,G=0,H=O.getAttributes();for(let j in H)if(H[j].location>=0){let ue=q[j];ue===void 0&&(j==="instanceMatrix"&&w.instanceMatrix&&(ue=w.instanceMatrix),j==="instanceColor"&&w.instanceColor&&(ue=w.instanceColor));let pe={};pe.attribute=ue,ue&&ue.data&&(pe.data=ue.data),U[j]=pe,G++}r.attributes=U,r.attributesNum=G,r.index=B}function y(){let w=r.newAttributes;for(let I=0,O=w.length;I<O;I++)w[I]=0}function g(w){p(w,0)}function p(w,I){let O=r.newAttributes,B=r.enabledAttributes,U=r.attributeDivisors;O[w]=1,B[w]===0&&(i.enableVertexAttribArray(w),B[w]=1),U[w]!==I&&(i.vertexAttribDivisor(w,I),U[w]=I)}function E(){let w=r.newAttributes,I=r.enabledAttributes;for(let O=0,B=I.length;O<B;O++)I[O]!==w[O]&&(i.disableVertexAttribArray(O),I[O]=0)}function b(w,I,O,B,U,q,G){G===!0?i.vertexAttribIPointer(w,I,O,U,q):i.vertexAttribPointer(w,I,O,B,U,q)}function _(w,I,O,B){y();let U=B.attributes,q=O.getAttributes(),G=I.defaultAttributeValues;for(let H in q){let j=q[H];if(j.location>=0){let ie=U[H];if(ie===void 0&&(H==="instanceMatrix"&&w.instanceMatrix&&(ie=w.instanceMatrix),H==="instanceColor"&&w.instanceColor&&(ie=w.instanceColor)),ie!==void 0){let ue=ie.normalized,pe=ie.itemSize,ve=e.get(ie);if(ve===void 0)continue;let He=ve.buffer,Ue=ve.type,ee=ve.bytesPerElement,W=Ue===i.INT||Ue===i.UNSIGNED_INT||ie.gpuType===ac;if(ie.isInterleavedBufferAttribute){let z=ie.data,F=z.stride,N=ie.offset;if(z.isInstancedInterleavedBuffer){for(let X=0;X<j.locationSize;X++)p(j.location+X,z.meshPerAttribute);w.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let X=0;X<j.locationSize;X++)g(j.location+X);i.bindBuffer(i.ARRAY_BUFFER,He);for(let X=0;X<j.locationSize;X++)b(j.location+X,pe/j.locationSize,Ue,ue,F*ee,(N+pe/j.locationSize*X)*ee,W)}else{if(ie.isInstancedBufferAttribute){for(let z=0;z<j.locationSize;z++)p(j.location+z,ie.meshPerAttribute);w.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let z=0;z<j.locationSize;z++)g(j.location+z);i.bindBuffer(i.ARRAY_BUFFER,He);for(let z=0;z<j.locationSize;z++)b(j.location+z,pe/j.locationSize,Ue,ue,pe*ee,pe/j.locationSize*z*ee,W)}}else if(G!==void 0){let ue=G[H];if(ue!==void 0)switch(ue.length){case 2:i.vertexAttrib2fv(j.location,ue);break;case 3:i.vertexAttrib3fv(j.location,ue);break;case 4:i.vertexAttrib4fv(j.location,ue);break;default:i.vertexAttrib1fv(j.location,ue)}}}}E()}function M(){R();for(let w in n){let I=n[w];for(let O in I){let B=I[O];for(let U in B){let q=B[U];for(let G in q)h(q[G].object),delete q[G];delete B[U]}}delete n[w]}}function T(w){if(n[w.id]===void 0)return;let I=n[w.id];for(let O in I){let B=I[O];for(let U in B){let q=B[U];for(let G in q)h(q[G].object),delete q[G];delete B[U]}}delete n[w.id]}function A(w){for(let I in n){let O=n[I];for(let B in O){let U=O[B];if(U[w.id]===void 0)continue;let q=U[w.id];for(let G in q)h(q[G].object),delete q[G];delete U[w.id]}}}function x(w){for(let I in n){let O=n[I],B=w.isInstancedMesh===!0?w.id:0,U=O[B];if(U!==void 0){for(let q in U){let G=U[q];for(let H in G)h(G[H].object),delete G[H];delete U[q]}delete O[B],Object.keys(O).length===0&&delete n[I]}}}function R(){D(),a=!0,r!==s&&(r=s,l(r.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:R,resetDefaultState:D,dispose:M,releaseStatesOfGeometry:T,releaseStatesOfObject:x,releaseStatesOfProgram:A,initAttributes:y,enableAttribute:g,disableUnusedAttributes:E}}function iy(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let u=0;for(let f=0;f<h;f++)u+=l[f];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function sy(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==sn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){let x=A===jn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==nn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==yn&&!x)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(Xe("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Xe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),M=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:E,maxVaryings:b,maxFragmentUniforms:_,maxSamples:M,samples:T}}function ry(i){let e=this,t=null,n=0,s=!1,r=!1,a=new Wt,o=new qe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){let m=d.clippingPlanes,y=d.clipIntersection,g=d.clipShadows,p=i.get(d);if(!s||m===null||m.length===0||r&&!g)r?h(null):l();else{let E=r?0:n,b=E*4,_=p.clippingState||null;c.value=_,_=h(m,u,b,f);for(let M=0;M!==b;++M)_[M]=t[M];p.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,m){let y=d!==null?d.length:0,g=null;if(y!==0){if(g=c.value,m!==!0||g===null){let p=f+y*4,E=u.matrixWorldInverse;o.getNormalMatrix(E),(g===null||g.length<p)&&(g=new Float32Array(p));for(let b=0,_=f;b!==y;++b,_+=4)a.copy(d[b]).applyMatrix4(E,o),a.normal.toArray(g,_),g[_+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}var Yi=4,ep=[.125,.215,.35,.446,.526,.582],gs=20,ay=256,Na=new Wi,tp=new Ve,eu=null,tu=0,nu=0,iu=!1,oy=new V,Yc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=oy}=r;eu=this._renderer.getRenderTarget(),tu=this._renderer.getActiveCubeFace(),nu=this._renderer.getActiveMipmapLevel(),iu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ip(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(eu,tu,nu),this._renderer.xr.enabled=iu,e.scissorTest=!1,pr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Xi||e.mapping===fs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),eu=this._renderer.getRenderTarget(),tu=this._renderer.getActiveCubeFace(),nu=this._renderer.getActiveMipmapLevel(),iu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:St,minFilter:St,generateMipmaps:!1,type:jn,format:sn,colorSpace:Zr,depthBuffer:!1},s=np(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=np(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=cy(r)),this._blurMaterial=hy(r,e,t),this._ggxMaterial=ly(r,e,t)}return s}_compileMaterial(e){let t=new gt(new At,e);this._renderer.compile(t,Na)}_sceneToCubeUV(e,t,n,s,r){let c=new Bt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(tp),d.toneMapping=In,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new gt(new sr,new Xt({name:"PMREM.Background",side:Kt,depthWrite:!1,depthTest:!1})));let y=this._backgroundBox,g=y.material,p=!1,E=e.background;E?E.isColor&&(g.color.copy(E),e.background=null,p=!0):(g.color.copy(tp),p=!0);for(let b=0;b<6;b++){let _=b%3;_===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[b],r.y,r.z)):_===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[b]));let M=this._cubeSize;pr(s,_*M,b>2?M:0,M,M),d.setRenderTarget(s),p&&d.render(y,c),d.render(e,c)}d.toneMapping=f,d.autoClear=u,e.background=E}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Xi||e.mapping===fs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=sp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ip());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;pr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Na)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),u=0+l*1.25,f=d*u,{_lodMax:m}=this,y=this._sizeLods[n],g=3*y*(n>m-Yi?n-m+Yi:0),p=4*(this._cubeSize-y);c.envMap.value=e.texture,c.roughness.value=f,c.mipInt.value=m-t,pr(r,g,p,3*y,2*y),s.setRenderTarget(r),s.render(o,Na),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=m-n,pr(e,g,p,3*y,2*y),s.setRenderTarget(e),s.render(o,Na)}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ye("blur direction must be either latitudinal or longitudinal!");let h=3,d=this._lodMeshes[s];d.material=l;let u=l.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*gs-1),y=r/m,g=isFinite(r)?1+Math.floor(h*y):gs;g>gs&&Xe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${gs}`);let p=[],E=0;for(let A=0;A<gs;++A){let x=A/y,R=Math.exp(-x*x/2);p.push(R),A===0?E+=R:A<g&&(E+=2*R)}for(let A=0;A<p.length;A++)p[A]=p[A]/E;u.envMap.value=e.texture,u.samples.value=g,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:b}=this;u.dTheta.value=m,u.mipInt.value=b-n;let _=this._sizeLods[s],M=3*_*(s>b-Yi?s-b+Yi:0),T=4*(this._cubeSize-_);pr(t,M,T,3*_,2*_),c.setRenderTarget(t),c.render(d,Na)}};function cy(i){let e=[],t=[],n=[],s=i,r=i-Yi+1+ep.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let c=1/o;a>i-Yi?c=ep[a-i+Yi-1]:a===0&&(c=0),t.push(c);let l=1/(o-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,m=6,y=3,g=2,p=1,E=new Float32Array(y*m*f),b=new Float32Array(g*m*f),_=new Float32Array(p*m*f);for(let T=0;T<f;T++){let A=T%3*2/3-1,x=T>2?0:-1,R=[A,x,0,A+2/3,x,0,A+2/3,x+1,0,A,x,0,A+2/3,x+1,0,A,x+1,0];E.set(R,y*m*T),b.set(u,g*m*T);let D=[T,T,T,T,T,T];_.set(D,p*m*T)}let M=new At;M.setAttribute("position",new Mt(E,y)),M.setAttribute("uv",new Mt(b,g)),M.setAttribute("faceIndex",new Mt(_,p)),n.push(new gt(M,null)),s>Yi&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function np(i,e,t){let n=new $t(i,e,t);return n.texture.mapping=wa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function pr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function ly(i,e,t){return new kt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ay,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Kc(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function hy(i,e,t){let n=new Float32Array(gs),s=new V(0,1,0);return new kt({name:"SphericalGaussianBlur",defines:{n:gs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Kc(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function ip(){return new kt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Kc(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function sp(){return new kt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Kc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Kc(){return`

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
	`}var Jc=class extends $t{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new ra(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new sr(5,5,5),r=new kt({name:"CubemapFromEquirect",uniforms:ms(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Kt,blending:$n});r.uniforms.tEquirect.value=t;let a=new gt(s,r),o=t.minFilter;return t.minFilter===Kn&&(t.minFilter=St),new ec(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function uy(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===ic||f===sc)if(e.has(u)){let m=e.get(u).texture;return o(m,u.mapping)}else{let m=u.image;if(m&&m.height>0){let y=new Jc(m.height);return y.fromEquirectangularTexture(i,u),e.set(u,y),u.addEventListener("dispose",l),o(y.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,m=f===ic||f===sc,y=f===Xi||f===fs;if(m||y){let g=t.get(u),p=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new Yc(i)),g=m?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{let E=u.image;return m&&E&&E.height>0||y&&E&&c(E)?(n===null&&(n=new Yc(i)),g=m?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function o(u,f){return f===ic?u.mapping=Xi:f===sc&&(u.mapping=fs),u}function c(u){let f=0,m=6;for(let y=0;y<m;y++)u[y]!==void 0&&f++;return f===m}function l(u){let f=u.target;f.removeEventListener("dispose",l);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function dy(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&as("WebGLRenderer: "+n+" extension not supported."),s}}}function fy(i,e,t,n){let s={},r=new WeakMap;function a(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let m in u.attributes)e.remove(u.attributes[m]);u.removeEventListener("dispose",a),delete s[u.id];let f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function c(d){let u=d.attributes;for(let f in u)e.update(u[f],i.ARRAY_BUFFER)}function l(d){let u=[],f=d.index,m=d.attributes.position,y=0;if(m===void 0)return;if(f!==null){let E=f.array;y=f.version;for(let b=0,_=E.length;b<_;b+=3){let M=E[b+0],T=E[b+1],A=E[b+2];u.push(M,T,T,A,A,M)}}else{let E=m.array;y=m.version;for(let b=0,_=E.length/3-1;b<_;b+=3){let M=b+0,T=b+1,A=b+2;u.push(M,T,T,A,A,M)}}let g=new(m.count>=65535?ea:Qr)(u,1);g.version=y;let p=r.get(d);p&&e.remove(p),r.set(d,g)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function py(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,u){i.drawElements(n,u,r,d*a),t.update(u,n,1)}function l(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,d*a,f),t.update(u,n,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let y=0;for(let g=0;g<f;g++)y+=u[g];t.update(y,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function my(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Ye("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function gy(i,e,t){let n=new WeakMap,s=new mt;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==d){let R=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",R)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],E=o.morphAttributes.color||[],b=0;f===!0&&(b=1),m===!0&&(b=2),y===!0&&(b=3);let _=o.attributes.position.count*b,M=1;_>e.maxTextureSize&&(M=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let T=new Float32Array(_*M*4*d),A=new Kr(T,_,M,d);A.type=yn,A.needsUpdate=!0;let x=b*4;for(let D=0;D<d;D++){let w=g[D],I=p[D],O=E[D],B=_*M*4*D;for(let U=0;U<w.count;U++){let q=U*x;f===!0&&(s.fromBufferAttribute(w,U),T[B+q+0]=s.x,T[B+q+1]=s.y,T[B+q+2]=s.z,T[B+q+3]=0),m===!0&&(s.fromBufferAttribute(I,U),T[B+q+4]=s.x,T[B+q+5]=s.y,T[B+q+6]=s.z,T[B+q+7]=0),y===!0&&(s.fromBufferAttribute(O,U),T[B+q+8]=s.x,T[B+q+9]=s.y,T[B+q+10]=s.z,T[B+q+11]=O.itemSize===4?s.w:1)}}u={count:d,texture:A,size:new fe(_,M)},n.set(o,u),o.addEventListener("dispose",R)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let y=0;y<l.length;y++)f+=l[y];let m=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function xy(i,e,t,n,s){let r=new WeakMap;function a(l){let h=s.render.frame,d=l.geometry,u=e.get(l,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let f=l.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var _y={[Ch]:"LINEAR_TONE_MAPPING",[Ih]:"REINHARD_TONE_MAPPING",[Ph]:"CINEON_TONE_MAPPING",[Ta]:"ACES_FILMIC_TONE_MAPPING",[Nh]:"AGX_TONE_MAPPING",[Dh]:"NEUTRAL_TONE_MAPPING",[Lh]:"CUSTOM_TONE_MAPPING"};function yy(i,e,t,n,s,r){let a=new $t(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new xi(e,t):void 0}),o=new $t(e,t,{type:jn,depthBuffer:!1,stencilBuffer:!1}),c=new At;c.setAttribute("position",new yt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new yt([0,2,0,0,2,0],2));let l=new Ho({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new gt(c,l),d=new Wi(-1,1,1,-1,0,1),u=null,f=null,m=!1,y,g=null,p=[],E=!1;this.setSize=function(b,_){a.setSize(b,_),o.setSize(b,_);for(let M=0;M<p.length;M++){let T=p[M];T.setSize&&T.setSize(b,_)}},this.setEffects=function(b){p=b,E=p.length>0&&p[0].isRenderPass===!0;let _=a.width,M=a.height;for(let T=0;T<p.length;T++){let A=p[T];A.setSize&&A.setSize(_,M)}},this.begin=function(b,_){if(m||b.toneMapping===In&&p.length===0)return!1;if(g=_,_!==null){let M=_.width,T=_.height;(a.width!==M||a.height!==T)&&this.setSize(M,T)}return E===!1&&b.setRenderTarget(a),y=b.toneMapping,b.toneMapping=In,!0},this.hasRenderPass=function(){return E},this.end=function(b,_){b.toneMapping=y,m=!0;let M=a,T=o;for(let A=0;A<p.length;A++){let x=p[A];if(x.enabled!==!1&&(x.render(b,T,M,_),x.needsSwap!==!1)){let R=M;M=T,T=R}}if(u!==b.outputColorSpace||f!==b.toneMapping){u=b.outputColorSpace,f=b.toneMapping,l.defines={},it.getTransfer(u)===lt&&(l.defines.SRGB_TRANSFER="");let A=_y[f];A&&(l.defines[A]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=M.texture,b.setRenderTarget(g),b.render(h,d),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),c.dispose(),l.dispose()}}var Ep=new Nt,au=new xi(1,1),Tp=new Kr,wp=new Po,Ap=new ra,rp=[],ap=[],op=new Float32Array(16),cp=new Float32Array(9),lp=new Float32Array(4);function gr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=rp[s];if(r===void 0&&(r=new Float32Array(s),rp[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Dt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ut(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function jc(i,e){let t=ap[e];t===void 0&&(t=new Int32Array(e),ap[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function vy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function My(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2fv(this.addr,e),Ut(t,e)}}function Sy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Dt(t,e))return;i.uniform3fv(this.addr,e),Ut(t,e)}}function by(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4fv(this.addr,e),Ut(t,e)}}function Ey(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ut(t,e)}else{if(Dt(t,n))return;lp.set(n),i.uniformMatrix2fv(this.addr,!1,lp),Ut(t,n)}}function Ty(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ut(t,e)}else{if(Dt(t,n))return;cp.set(n),i.uniformMatrix3fv(this.addr,!1,cp),Ut(t,n)}}function wy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ut(t,e)}else{if(Dt(t,n))return;op.set(n),i.uniformMatrix4fv(this.addr,!1,op),Ut(t,n)}}function Ay(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Ry(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2iv(this.addr,e),Ut(t,e)}}function Cy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;i.uniform3iv(this.addr,e),Ut(t,e)}}function Iy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4iv(this.addr,e),Ut(t,e)}}function Py(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Ly(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2uiv(this.addr,e),Ut(t,e)}}function Ny(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;i.uniform3uiv(this.addr,e),Ut(t,e)}}function Dy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4uiv(this.addr,e),Ut(t,e)}}function Uy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(au.compareFunction=t.isReversedDepthBuffer()?Xc:Wc,r=au):r=Ep,t.setTexture2D(e||r,s)}function Fy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||wp,s)}function Oy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Ap,s)}function By(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Tp,s)}function zy(i){switch(i){case 5126:return vy;case 35664:return My;case 35665:return Sy;case 35666:return by;case 35674:return Ey;case 35675:return Ty;case 35676:return wy;case 5124:case 35670:return Ay;case 35667:case 35671:return Ry;case 35668:case 35672:return Cy;case 35669:case 35673:return Iy;case 5125:return Py;case 36294:return Ly;case 36295:return Ny;case 36296:return Dy;case 35678:case 36198:case 36298:case 36306:case 35682:return Uy;case 35679:case 36299:case 36307:return Fy;case 35680:case 36300:case 36308:case 36293:return Oy;case 36289:case 36303:case 36311:case 36292:return By}}function ky(i,e){i.uniform1fv(this.addr,e)}function Vy(i,e){let t=gr(e,this.size,2);i.uniform2fv(this.addr,t)}function Hy(i,e){let t=gr(e,this.size,3);i.uniform3fv(this.addr,t)}function Gy(i,e){let t=gr(e,this.size,4);i.uniform4fv(this.addr,t)}function Wy(i,e){let t=gr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Xy(i,e){let t=gr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function qy(i,e){let t=gr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Zy(i,e){i.uniform1iv(this.addr,e)}function Yy(i,e){i.uniform2iv(this.addr,e)}function Jy(i,e){i.uniform3iv(this.addr,e)}function $y(i,e){i.uniform4iv(this.addr,e)}function Ky(i,e){i.uniform1uiv(this.addr,e)}function jy(i,e){i.uniform2uiv(this.addr,e)}function Qy(i,e){i.uniform3uiv(this.addr,e)}function ev(i,e){i.uniform4uiv(this.addr,e)}function tv(i,e,t){let n=this.cache,s=e.length,r=jc(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=au:a=Ep;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function nv(i,e,t){let n=this.cache,s=e.length,r=jc(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||wp,r[a])}function iv(i,e,t){let n=this.cache,s=e.length,r=jc(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Ap,r[a])}function sv(i,e,t){let n=this.cache,s=e.length,r=jc(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Tp,r[a])}function rv(i){switch(i){case 5126:return ky;case 35664:return Vy;case 35665:return Hy;case 35666:return Gy;case 35674:return Wy;case 35675:return Xy;case 35676:return qy;case 5124:case 35670:return Zy;case 35667:case 35671:return Yy;case 35668:case 35672:return Jy;case 35669:case 35673:return $y;case 5125:return Ky;case 36294:return jy;case 36295:return Qy;case 36296:return ev;case 35678:case 36198:case 36298:case 36306:case 35682:return tv;case 35679:case 36299:case 36307:return nv;case 35680:case 36300:case 36308:case 36293:return iv;case 36289:case 36303:case 36311:case 36292:return sv}}var ou=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=zy(t.type)}},cu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=rv(t.type)}},lu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},su=/(\w+)(\])?(\[|\.)?/g;function hp(i,e){i.seq.push(e),i.map[e.id]=e}function av(i,e,t){let n=i.name,s=n.length;for(su.lastIndex=0;;){let r=su.exec(n),a=su.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){hp(t,l===void 0?new ou(o,i,e):new cu(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new lu(o),hp(t,d)),t=d}}}var mr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);av(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function up(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var ov=37297,cv=0;function lv(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var dp=new qe;function hv(i){it._getMatrix(dp,it.workingColorSpace,i);let e=`mat3( ${dp.elements.map(t=>t.toFixed(4))} )`;switch(it.getTransfer(i)){case Yr:return[e,"LinearTransferOETF"];case lt:return[e,"sRGBTransferOETF"];default:return Xe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function fp(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+lv(i.getShaderSource(e),o)}else return r}function uv(i,e){let t=hv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var dv={[Ch]:"Linear",[Ih]:"Reinhard",[Ph]:"Cineon",[Ta]:"ACESFilmic",[Nh]:"AgX",[Dh]:"Neutral",[Lh]:"Custom"};function fv(i,e){let t=dv[e];return t===void 0?(Xe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Zc=new V;function pv(){it.getLuminanceCoefficients(Zc);let i=Zc.x.toFixed(4),e=Zc.y.toFixed(4),t=Zc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function mv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ua).join(`
`)}function gv(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function xv(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Ua(i){return i!==""}function pp(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function mp(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var _v=/^[ \t]*#include +<([\w\d./]+)>/gm;function hu(i){return i.replace(_v,vv)}var yv=new Map;function vv(i,e){let t=je[e];if(t===void 0){let n=yv.get(e);if(n!==void 0)t=je[n],Xe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return hu(t)}var Mv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function gp(i){return i.replace(Mv,Sv)}function Sv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function xp(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var bv={[Ea]:"SHADOWMAP_TYPE_PCF",[lr]:"SHADOWMAP_TYPE_VSM"};function Ev(i){return bv[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Tv={[Xi]:"ENVMAP_TYPE_CUBE",[fs]:"ENVMAP_TYPE_CUBE",[wa]:"ENVMAP_TYPE_CUBE_UV"};function wv(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Tv[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Av={[fs]:"ENVMAP_MODE_REFRACTION"};function Rv(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Av[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Cv={[Rh]:"ENVMAP_BLENDING_MULTIPLY",[Lf]:"ENVMAP_BLENDING_MIX",[Nf]:"ENVMAP_BLENDING_ADD"};function Iv(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Cv[i.combine]||"ENVMAP_BLENDING_NONE"}function Pv(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Lv(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=Ev(t),l=wv(t),h=Rv(t),d=Iv(t),u=Pv(t),f=mv(t),m=gv(r),y=s.createProgram(),g,p,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Ua).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Ua).join(`
`),p.length>0&&(p+=`
`)):(g=[xp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ua).join(`
`),p=[xp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==In?"#define TONE_MAPPING":"",t.toneMapping!==In?je.tonemapping_pars_fragment:"",t.toneMapping!==In?fv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,uv("linearToOutputTexel",t.outputColorSpace),pv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ua).join(`
`)),a=hu(a),a=pp(a,t),a=mp(a,t),o=hu(o),o=pp(o,t),o=mp(o,t),a=gp(a),o=gp(o),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Hh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Hh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let b=E+g+a,_=E+p+o,M=up(s,s.VERTEX_SHADER,b),T=up(s,s.FRAGMENT_SHADER,_);s.attachShader(y,M),s.attachShader(y,T),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function A(w){if(i.debug.checkShaderErrors){let I=s.getProgramInfoLog(y)||"",O=s.getShaderInfoLog(M)||"",B=s.getShaderInfoLog(T)||"",U=I.trim(),q=O.trim(),G=B.trim(),H=!0,j=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(H=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,M,T);else{let ie=fp(s,M,"vertex"),ue=fp(s,T,"fragment");Ye("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+U+`
`+ie+`
`+ue)}else U!==""?Xe("WebGLProgram: Program Info Log:",U):(q===""||G==="")&&(j=!1);j&&(w.diagnostics={runnable:H,programLog:U,vertexShader:{log:q,prefix:g},fragmentShader:{log:G,prefix:p}})}s.deleteShader(M),s.deleteShader(T),x=new mr(s,y),R=xv(s,y)}let x;this.getUniforms=function(){return x===void 0&&A(this),x};let R;this.getAttributes=function(){return R===void 0&&A(this),R};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(y,ov)),D},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=cv++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=M,this.fragmentShader=T,this}var Nv=0,uu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new du(e),t.set(e,n)),n}},du=class{constructor(e){this.id=Nv++,this.code=e,this.usedTimes=0}};function Dv(i){return i===Zi||i===Pa||i===La}function Uv(i,e,t,n,s,r){let a=new Ks,o=new uu,c=new Set,l=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return c.add(x),x===0?"uv":`uv${x}`}function y(x,R,D,w,I,O){let B=w.fog,U=I.geometry,q=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?w.environment:null,G=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,H=e.get(x.envMap||q,G),j=H&&H.mapping===wa?H.image.height:null,ie=f[x.type];x.precision!==null&&(u=n.getMaxPrecision(x.precision),u!==x.precision&&Xe("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));let ue=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,pe=ue!==void 0?ue.length:0,ve=0;U.morphAttributes.position!==void 0&&(ve=1),U.morphAttributes.normal!==void 0&&(ve=2),U.morphAttributes.color!==void 0&&(ve=3);let He,Ue,ee,W;if(ie){let Oe=ei[ie];He=Oe.vertexShader,Ue=Oe.fragmentShader}else{He=x.vertexShader,Ue=x.fragmentShader;let Oe=o.getVertexShaderStage(x),Et=o.getFragmentShaderStage(x);o.update(x,Oe,Et),ee=Oe.id,W=Et.id}let z=i.getRenderTarget(),F=i.state.buffers.depth.getReversed(),N=I.isInstancedMesh===!0,X=I.isBatchedMesh===!0,oe=!!x.map,de=!!x.matcap,P=!!H,Z=!!x.aoMap,k=!!x.lightMap,Q=!!x.bumpMap&&x.wireframe===!1,ne=!!x.normalMap,le=!!x.displacementMap,xe=!!x.emissiveMap,_e=!!x.metalnessMap,J=!!x.roughnessMap,S=x.anisotropy>0,Pe=x.clearcoat>0,Fe=x.dispersion>0,L=x.iridescence>0,v=x.sheen>0,$=x.transmission>0,te=S&&!!x.anisotropyMap,ce=Pe&&!!x.clearcoatMap,Me=Pe&&!!x.clearcoatNormalMap,Se=Pe&&!!x.clearcoatRoughnessMap,he=L&&!!x.iridescenceMap,me=L&&!!x.iridescenceThicknessMap,be=v&&!!x.sheenColorMap,Be=v&&!!x.sheenRoughnessMap,we=!!x.specularMap,Ee=!!x.specularColorMap,Ze=!!x.specularIntensityMap,Je=$&&!!x.transmissionMap,$e=$&&!!x.thicknessMap,Y=!!x.gradientMap,Te=!!x.alphaMap,ge=x.alphaTest>0,Ae=!!x.alphaHash,Le=!!x.extensions,ye=In;x.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(ye=i.toneMapping);let ke={shaderID:ie,shaderType:x.type,shaderName:x.name,vertexShader:He,fragmentShader:Ue,defines:x.defines,customVertexShaderID:ee,customFragmentShaderID:W,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:X,batchingColor:X&&I._colorsTexture!==null,instancing:N,instancingColor:N&&I.instanceColor!==null,instancingMorph:N&&I.morphTexture!==null,outputColorSpace:z===null?i.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:it.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:oe,matcap:de,envMap:P,envMapMode:P&&H.mapping,envMapCubeUVHeight:j,aoMap:Z,lightMap:k,bumpMap:Q,normalMap:ne,displacementMap:le,emissiveMap:xe,normalMapObjectSpace:ne&&x.normalMapType===Uf,normalMapTangentSpace:ne&&x.normalMapType===Gc,packedNormalMap:ne&&x.normalMapType===Gc&&Dv(x.normalMap.format),metalnessMap:_e,roughnessMap:J,anisotropy:S,anisotropyMap:te,clearcoat:Pe,clearcoatMap:ce,clearcoatNormalMap:Me,clearcoatRoughnessMap:Se,dispersion:Fe,iridescence:L,iridescenceMap:he,iridescenceThicknessMap:me,sheen:v,sheenColorMap:be,sheenRoughnessMap:Be,specularMap:we,specularColorMap:Ee,specularIntensityMap:Ze,transmission:$,transmissionMap:Je,thicknessMap:$e,gradientMap:Y,opaque:x.transparent===!1&&x.blending===os&&x.alphaToCoverage===!1,alphaMap:Te,alphaTest:ge,alphaHash:Ae,combine:x.combine,mapUv:oe&&m(x.map.channel),aoMapUv:Z&&m(x.aoMap.channel),lightMapUv:k&&m(x.lightMap.channel),bumpMapUv:Q&&m(x.bumpMap.channel),normalMapUv:ne&&m(x.normalMap.channel),displacementMapUv:le&&m(x.displacementMap.channel),emissiveMapUv:xe&&m(x.emissiveMap.channel),metalnessMapUv:_e&&m(x.metalnessMap.channel),roughnessMapUv:J&&m(x.roughnessMap.channel),anisotropyMapUv:te&&m(x.anisotropyMap.channel),clearcoatMapUv:ce&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:Me&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:he&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:me&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:be&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:Be&&m(x.sheenRoughnessMap.channel),specularMapUv:we&&m(x.specularMap.channel),specularColorMapUv:Ee&&m(x.specularColorMap.channel),specularIntensityMapUv:Ze&&m(x.specularIntensityMap.channel),transmissionMapUv:Je&&m(x.transmissionMap.channel),thicknessMapUv:$e&&m(x.thicknessMap.channel),alphaMapUv:Te&&m(x.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(ne||S),vertexNormals:!!U.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!U.attributes.uv&&(oe||Te),fog:!!B,useFog:x.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||U.attributes.normal===void 0&&ne===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:F,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:pe,morphTextureStride:ve,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:O.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:ye,decodeVideoTexture:oe&&x.map.isVideoTexture===!0&&it.getTransfer(x.map.colorSpace)===lt,decodeVideoTextureEmissive:xe&&x.emissiveMap.isVideoTexture===!0&&it.getTransfer(x.emissiveMap.colorSpace)===lt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===jt,flipSided:x.side===Kt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Le&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Le&&x.extensions.multiDraw===!0||X)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return ke.vertexUv1s=c.has(1),ke.vertexUv2s=c.has(2),ke.vertexUv3s=c.has(3),c.clear(),ke}function g(x){let R=[];if(x.shaderID?R.push(x.shaderID):(R.push(x.customVertexShaderID),R.push(x.customFragmentShaderID)),x.defines!==void 0)for(let D in x.defines)R.push(D),R.push(x.defines[D]);return x.isRawShaderMaterial===!1&&(p(R,x),E(R,x),R.push(i.outputColorSpace)),R.push(x.customProgramCacheKey),R.join()}function p(x,R){x.push(R.precision),x.push(R.outputColorSpace),x.push(R.envMapMode),x.push(R.envMapCubeUVHeight),x.push(R.mapUv),x.push(R.alphaMapUv),x.push(R.lightMapUv),x.push(R.aoMapUv),x.push(R.bumpMapUv),x.push(R.normalMapUv),x.push(R.displacementMapUv),x.push(R.emissiveMapUv),x.push(R.metalnessMapUv),x.push(R.roughnessMapUv),x.push(R.anisotropyMapUv),x.push(R.clearcoatMapUv),x.push(R.clearcoatNormalMapUv),x.push(R.clearcoatRoughnessMapUv),x.push(R.iridescenceMapUv),x.push(R.iridescenceThicknessMapUv),x.push(R.sheenColorMapUv),x.push(R.sheenRoughnessMapUv),x.push(R.specularMapUv),x.push(R.specularColorMapUv),x.push(R.specularIntensityMapUv),x.push(R.transmissionMapUv),x.push(R.thicknessMapUv),x.push(R.combine),x.push(R.fogExp2),x.push(R.sizeAttenuation),x.push(R.morphTargetsCount),x.push(R.morphAttributeCount),x.push(R.numDirLights),x.push(R.numPointLights),x.push(R.numSpotLights),x.push(R.numSpotLightMaps),x.push(R.numHemiLights),x.push(R.numRectAreaLights),x.push(R.numDirLightShadows),x.push(R.numPointLightShadows),x.push(R.numSpotLightShadows),x.push(R.numSpotLightShadowsWithMaps),x.push(R.numLightProbes),x.push(R.shadowMapType),x.push(R.toneMapping),x.push(R.numClippingPlanes),x.push(R.numClipIntersection),x.push(R.depthPacking)}function E(x,R){a.disableAll(),R.instancing&&a.enable(0),R.instancingColor&&a.enable(1),R.instancingMorph&&a.enable(2),R.matcap&&a.enable(3),R.envMap&&a.enable(4),R.normalMapObjectSpace&&a.enable(5),R.normalMapTangentSpace&&a.enable(6),R.clearcoat&&a.enable(7),R.iridescence&&a.enable(8),R.alphaTest&&a.enable(9),R.vertexColors&&a.enable(10),R.vertexAlphas&&a.enable(11),R.vertexUv1s&&a.enable(12),R.vertexUv2s&&a.enable(13),R.vertexUv3s&&a.enable(14),R.vertexTangents&&a.enable(15),R.anisotropy&&a.enable(16),R.alphaHash&&a.enable(17),R.batching&&a.enable(18),R.dispersion&&a.enable(19),R.batchingColor&&a.enable(20),R.gradientMap&&a.enable(21),R.packedNormalMap&&a.enable(22),R.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),R.fog&&a.enable(0),R.useFog&&a.enable(1),R.flatShading&&a.enable(2),R.logarithmicDepthBuffer&&a.enable(3),R.reversedDepthBuffer&&a.enable(4),R.skinning&&a.enable(5),R.morphTargets&&a.enable(6),R.morphNormals&&a.enable(7),R.morphColors&&a.enable(8),R.premultipliedAlpha&&a.enable(9),R.shadowMapEnabled&&a.enable(10),R.doubleSided&&a.enable(11),R.flipSided&&a.enable(12),R.useDepthPacking&&a.enable(13),R.dithering&&a.enable(14),R.transmission&&a.enable(15),R.sheen&&a.enable(16),R.opaque&&a.enable(17),R.pointsUvs&&a.enable(18),R.decodeVideoTexture&&a.enable(19),R.decodeVideoTextureEmissive&&a.enable(20),R.alphaToCoverage&&a.enable(21),R.numLightProbeGrids>0&&a.enable(22),R.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function b(x){let R=f[x.type],D;if(R){let w=ei[R];D=jf.clone(w.uniforms)}else D=x.uniforms;return D}function _(x,R){let D=h.get(R);return D!==void 0?++D.usedTimes:(D=new Lv(i,R,x,s),l.push(D),h.set(R,D)),D}function M(x){if(--x.usedTimes===0){let R=l.indexOf(x);l[R]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function T(x){o.remove(x)}function A(){o.dispose()}return{getParameters:y,getProgramCacheKey:g,getUniforms:b,acquireProgram:_,releaseProgram:M,releaseShaderCache:T,programs:l,dispose:A}}function Fv(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Ov(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function _p(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function yp(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,m,y,g,p){let E=i[e];return E===void 0?(E={id:u.id,object:u,geometry:f,material:m,materialVariant:a(u),groupOrder:y,renderOrder:u.renderOrder,z:g,group:p},i[e]=E):(E.id=u.id,E.object=u,E.geometry=f,E.material=m,E.materialVariant=a(u),E.groupOrder=y,E.renderOrder=u.renderOrder,E.z=g,E.group=p),e++,E}function c(u,f,m,y,g,p){let E=o(u,f,m,y,g,p);m.transmission>0?n.push(E):m.transparent===!0?s.push(E):t.push(E)}function l(u,f,m,y,g,p){let E=o(u,f,m,y,g,p);m.transmission>0?n.unshift(E):m.transparent===!0?s.unshift(E):t.unshift(E)}function h(u,f,m){t.length>1&&t.sort(u||Ov),n.length>1&&n.sort(f||_p),s.length>1&&s.sort(f||_p),m&&(t.reverse(),n.reverse(),s.reverse())}function d(){for(let u=e,f=i.length;u<f;u++){let m=i[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:d,sort:h}}function Bv(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new yp,i.set(n,[a])):s>=r.length?(a=new yp,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function zv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new V,color:new Ve};break;case"SpotLight":t={position:new V,direction:new V,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new V,color:new Ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new V,skyColor:new Ve,groundColor:new Ve};break;case"RectAreaLight":t={color:new Ve,position:new V,halfWidth:new V,halfHeight:new V};break}return i[e.id]=t,t}}}function kv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Vv=0;function Hv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Gv(i){let e=new zv,t=kv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new V);let s=new V,r=new rt,a=new rt;function o(l){let h=0,d=0,u=0;for(let R=0;R<9;R++)n.probe[R].set(0,0,0);let f=0,m=0,y=0,g=0,p=0,E=0,b=0,_=0,M=0,T=0,A=0;l.sort(Hv);for(let R=0,D=l.length;R<D;R++){let w=l[R],I=w.color,O=w.intensity,B=w.distance,U=null;if(w.shadow&&w.shadow.map&&(w.shadow.map.texture.format===Zi?U=w.shadow.map.texture:U=w.shadow.map.depthTexture||w.shadow.map.texture),w.isAmbientLight)h+=I.r*O,d+=I.g*O,u+=I.b*O;else if(w.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(w.sh.coefficients[q],O);A++}else if(w.isDirectionalLight){let q=e.get(w);if(q.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){let G=w.shadow,H=t.get(w);H.shadowIntensity=G.intensity,H.shadowBias=G.bias,H.shadowNormalBias=G.normalBias,H.shadowRadius=G.radius,H.shadowMapSize=G.mapSize,n.directionalShadow[f]=H,n.directionalShadowMap[f]=U,n.directionalShadowMatrix[f]=w.shadow.matrix,E++}n.directional[f]=q,f++}else if(w.isSpotLight){let q=e.get(w);q.position.setFromMatrixPosition(w.matrixWorld),q.color.copy(I).multiplyScalar(O),q.distance=B,q.coneCos=Math.cos(w.angle),q.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),q.decay=w.decay,n.spot[y]=q;let G=w.shadow;if(w.map&&(n.spotLightMap[M]=w.map,M++,G.updateMatrices(w),w.castShadow&&T++),n.spotLightMatrix[y]=G.matrix,w.castShadow){let H=t.get(w);H.shadowIntensity=G.intensity,H.shadowBias=G.bias,H.shadowNormalBias=G.normalBias,H.shadowRadius=G.radius,H.shadowMapSize=G.mapSize,n.spotShadow[y]=H,n.spotShadowMap[y]=U,_++}y++}else if(w.isRectAreaLight){let q=e.get(w);q.color.copy(I).multiplyScalar(O),q.halfWidth.set(w.width*.5,0,0),q.halfHeight.set(0,w.height*.5,0),n.rectArea[g]=q,g++}else if(w.isPointLight){let q=e.get(w);if(q.color.copy(w.color).multiplyScalar(w.intensity),q.distance=w.distance,q.decay=w.decay,w.castShadow){let G=w.shadow,H=t.get(w);H.shadowIntensity=G.intensity,H.shadowBias=G.bias,H.shadowNormalBias=G.normalBias,H.shadowRadius=G.radius,H.shadowMapSize=G.mapSize,H.shadowCameraNear=G.camera.near,H.shadowCameraFar=G.camera.far,n.pointShadow[m]=H,n.pointShadowMap[m]=U,n.pointShadowMatrix[m]=w.shadow.matrix,b++}n.point[m]=q,m++}else if(w.isHemisphereLight){let q=e.get(w);q.skyColor.copy(w.color).multiplyScalar(O),q.groundColor.copy(w.groundColor).multiplyScalar(O),n.hemi[p]=q,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Re.LTC_FLOAT_1,n.rectAreaLTC2=Re.LTC_FLOAT_2):(n.rectAreaLTC1=Re.LTC_HALF_1,n.rectAreaLTC2=Re.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let x=n.hash;(x.directionalLength!==f||x.pointLength!==m||x.spotLength!==y||x.rectAreaLength!==g||x.hemiLength!==p||x.numDirectionalShadows!==E||x.numPointShadows!==b||x.numSpotShadows!==_||x.numSpotMaps!==M||x.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=y,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=_+M-T,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,x.directionalLength=f,x.pointLength=m,x.spotLength=y,x.rectAreaLength=g,x.hemiLength=p,x.numDirectionalShadows=E,x.numPointShadows=b,x.numSpotShadows=_,x.numSpotMaps=M,x.numLightProbes=A,n.version=Vv++)}function c(l,h){let d=0,u=0,f=0,m=0,y=0,g=h.matrixWorldInverse;for(let p=0,E=l.length;p<E;p++){let b=l[p];if(b.isDirectionalLight){let _=n.directional[d];_.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),d++}else if(b.isSpotLight){let _=n.spot[f];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),f++}else if(b.isRectAreaLight){let _=n.rectArea[m];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(g),a.identity(),r.copy(b.matrixWorld),r.premultiply(g),a.extractRotation(r),_.halfWidth.set(b.width*.5,0,0),_.halfHeight.set(0,b.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),m++}else if(b.isPointLight){let _=n.point[u];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(g),u++}else if(b.isHemisphereLight){let _=n.hemi[y];_.direction.setFromMatrixPosition(b.matrixWorld),_.direction.transformDirection(g),y++}}}return{setup:o,setupView:c,state:n}}function vp(i){let e=new Gv(i),t=[],n=[],s=[];function r(u){d.camera=u,t.length=0,n.length=0,s.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function c(u){s.push(u)}function l(){e.setup(t)}function h(u){e.setupView(t,u)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function Wv(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new vp(i),e.set(s,[o])):r>=a.length?(o=new vp(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var Xv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qv=`uniform sampler2D shadow_pass;
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
}`,Zv=[new V(1,0,0),new V(-1,0,0),new V(0,1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1)],Yv=[new V(0,-1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1),new V(0,-1,0),new V(0,-1,0)],Mp=new rt,Da=new V,ru=new V;function Jv(i,e,t){let n=new nr,s=new fe,r=new fe,a=new mt,o=new Go,c=new Wo,l={},h=t.maxTextureSize,d={[fi]:Kt,[Kt]:fi,[jt]:jt},u=new kt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new fe},radius:{value:4}},vertexShader:Xv,fragmentShader:qv}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let m=new At;m.setAttribute("position",new Mt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new gt(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ea;let p=this.type;this.render=function(T,A,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;this.type===ff&&(Xe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ea);let R=i.getRenderTarget(),D=i.getActiveCubeFace(),w=i.getActiveMipmapLevel(),I=i.state;I.setBlending($n),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);let O=p!==this.type;O&&A.traverse(function(B){B.material&&(Array.isArray(B.material)?B.material.forEach(U=>U.needsUpdate=!0):B.material.needsUpdate=!0)});for(let B=0,U=T.length;B<U;B++){let q=T[B],G=q.shadow;if(G===void 0){Xe("WebGLShadowMap:",q,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);let H=G.getFrameExtents();s.multiply(H),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/H.x),s.x=r.x*H.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/H.y),s.y=r.y*H.y,G.mapSize.y=r.y));let j=i.state.buffers.depth.getReversed();if(G.camera._reversedDepth=j,G.map===null||O===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===lr){if(q.isPointLight){Xe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new $t(s.x,s.y,{format:Zi,type:jn,minFilter:St,magFilter:St,generateMipmaps:!1}),G.map.texture.name=q.name+".shadowMap",G.map.depthTexture=new xi(s.x,s.y,yn),G.map.depthTexture.name=q.name+".shadowMapDepth",G.map.depthTexture.format=Xn,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=wt,G.map.depthTexture.magFilter=wt}else q.isPointLight?(G.map=new Jc(s.x),G.map.depthTexture=new Uo(s.x,Pn)):(G.map=new $t(s.x,s.y),G.map.depthTexture=new xi(s.x,s.y,Pn)),G.map.depthTexture.name=q.name+".shadowMap",G.map.depthTexture.format=Xn,this.type===Ea?(G.map.depthTexture.compareFunction=j?Xc:Wc,G.map.depthTexture.minFilter=St,G.map.depthTexture.magFilter=St):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=wt,G.map.depthTexture.magFilter=wt);G.camera.updateProjectionMatrix()}let ie=G.map.isWebGLCubeRenderTarget?6:1;for(let ue=0;ue<ie;ue++){if(G.map.isWebGLCubeRenderTarget)i.setRenderTarget(G.map,ue),i.clear();else{ue===0&&(i.setRenderTarget(G.map),i.clear());let pe=G.getViewport(ue);a.set(r.x*pe.x,r.y*pe.y,r.x*pe.z,r.y*pe.w),I.viewport(a)}if(q.isPointLight){let pe=G.camera,ve=G.matrix,He=q.distance||pe.far;He!==pe.far&&(pe.far=He,pe.updateProjectionMatrix()),Da.setFromMatrixPosition(q.matrixWorld),pe.position.copy(Da),ru.copy(pe.position),ru.add(Zv[ue]),pe.up.copy(Yv[ue]),pe.lookAt(ru),pe.updateMatrixWorld(),ve.makeTranslation(-Da.x,-Da.y,-Da.z),Mp.multiplyMatrices(pe.projectionMatrix,pe.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Mp,pe.coordinateSystem,pe.reversedDepth)}else G.updateMatrices(q);n=G.getFrustum(),_(A,x,G.camera,q,this.type)}G.isPointLightShadow!==!0&&this.type===lr&&E(G,x),G.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(R,D,w)};function E(T,A){let x=e.update(y);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new $t(s.x,s.y,{format:Zi,type:jn})),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(A,null,x,u,y,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(A,null,x,f,y,null)}function b(T,A,x,R){let D=null,w=x.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(w!==void 0)D=w;else if(D=x.isPointLight===!0?c:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let I=D.uuid,O=A.uuid,B=l[I];B===void 0&&(B={},l[I]=B);let U=B[O];U===void 0&&(U=D.clone(),B[O]=U,A.addEventListener("dispose",M)),D=U}if(D.visible=A.visible,D.wireframe=A.wireframe,R===lr?D.side=A.shadowSide!==null?A.shadowSide:A.side:D.side=A.shadowSide!==null?A.shadowSide:d[A.side],D.alphaMap=A.alphaMap,D.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,D.map=A.map,D.clipShadows=A.clipShadows,D.clippingPlanes=A.clippingPlanes,D.clipIntersection=A.clipIntersection,D.displacementMap=A.displacementMap,D.displacementScale=A.displacementScale,D.displacementBias=A.displacementBias,D.wireframeLinewidth=A.wireframeLinewidth,D.linewidth=A.linewidth,x.isPointLight===!0&&D.isMeshDistanceMaterial===!0){let I=i.properties.get(D);I.light=x}return D}function _(T,A,x,R,D){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&D===lr)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,T.matrixWorld);let O=e.update(T),B=T.material;if(Array.isArray(B)){let U=O.groups;for(let q=0,G=U.length;q<G;q++){let H=U[q],j=B[H.materialIndex];if(j&&j.visible){let ie=b(T,j,R,D);T.onBeforeShadow(i,T,A,x,O,ie,H),i.renderBufferDirect(x,null,O,ie,T,H),T.onAfterShadow(i,T,A,x,O,ie,H)}}}else if(B.visible){let U=b(T,B,R,D);T.onBeforeShadow(i,T,A,x,O,U,null),i.renderBufferDirect(x,null,O,U,T,null),T.onAfterShadow(i,T,A,x,O,U,null)}}let I=T.children;for(let O=0,B=I.length;O<B;O++)_(I[O],A,x,R,D)}function M(T){T.target.removeEventListener("dispose",M);for(let x in l){let R=l[x],D=T.target.uuid;D in R&&(R[D].dispose(),delete R[D])}}}function $v(i,e){function t(){let Y=!1,Te=new mt,ge=null,Ae=new mt(0,0,0,0);return{setMask:function(Le){ge!==Le&&!Y&&(i.colorMask(Le,Le,Le,Le),ge=Le)},setLocked:function(Le){Y=Le},setClear:function(Le,ye,ke,Oe,Et){Et===!0&&(Le*=Oe,ye*=Oe,ke*=Oe),Te.set(Le,ye,ke,Oe),Ae.equals(Te)===!1&&(i.clearColor(Le,ye,ke,Oe),Ae.copy(Te))},reset:function(){Y=!1,ge=null,Ae.set(-1,0,0,0)}}}function n(){let Y=!1,Te=!1,ge=null,Ae=null,Le=null;return{setReversed:function(ye){if(Te!==ye){let ke=e.get("EXT_clip_control");ye?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT),Te=ye;let Oe=Le;Le=null,this.setClear(Oe)}},getReversed:function(){return Te},setTest:function(ye){ye?z(i.DEPTH_TEST):F(i.DEPTH_TEST)},setMask:function(ye){ge!==ye&&!Y&&(i.depthMask(ye),ge=ye)},setFunc:function(ye){if(Te&&(ye=Xf[ye]),Ae!==ye){switch(ye){case So:i.depthFunc(i.NEVER);break;case bo:i.depthFunc(i.ALWAYS);break;case Eo:i.depthFunc(i.LESS);break;case cs:i.depthFunc(i.LEQUAL);break;case To:i.depthFunc(i.EQUAL);break;case wo:i.depthFunc(i.GEQUAL);break;case Ao:i.depthFunc(i.GREATER);break;case Ro:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ae=ye}},setLocked:function(ye){Y=ye},setClear:function(ye){Le!==ye&&(Le=ye,Te&&(ye=1-ye),i.clearDepth(ye))},reset:function(){Y=!1,ge=null,Ae=null,Le=null,Te=!1}}}function s(){let Y=!1,Te=null,ge=null,Ae=null,Le=null,ye=null,ke=null,Oe=null,Et=null;return{setTest:function(xt){Y||(xt?z(i.STENCIL_TEST):F(i.STENCIL_TEST))},setMask:function(xt){Te!==xt&&!Y&&(i.stencilMask(xt),Te=xt)},setFunc:function(xt,zn,kn){(ge!==xt||Ae!==zn||Le!==kn)&&(i.stencilFunc(xt,zn,kn),ge=xt,Ae=zn,Le=kn)},setOp:function(xt,zn,kn){(ye!==xt||ke!==zn||Oe!==kn)&&(i.stencilOp(xt,zn,kn),ye=xt,ke=zn,Oe=kn)},setLocked:function(xt){Y=xt},setClear:function(xt){Et!==xt&&(i.clearStencil(xt),Et=xt)},reset:function(){Y=!1,Te=null,ge=null,Ae=null,Le=null,ye=null,ke=null,Oe=null,Et=null}}}let r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap,h={},d={},u={},f=new WeakMap,m=[],y=null,g=!1,p=null,E=null,b=null,_=null,M=null,T=null,A=null,x=new Ve(0,0,0),R=0,D=!1,w=null,I=null,O=null,B=null,U=null,q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,H=0,j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(j)[1]),G=H>=1):j.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),G=H>=2);let ie=null,ue={},pe=i.getParameter(i.SCISSOR_BOX),ve=i.getParameter(i.VIEWPORT),He=new mt().fromArray(pe),Ue=new mt().fromArray(ve);function ee(Y,Te,ge,Ae){let Le=new Uint8Array(4),ye=i.createTexture();i.bindTexture(Y,ye),i.texParameteri(Y,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(Y,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ke=0;ke<ge;ke++)Y===i.TEXTURE_3D||Y===i.TEXTURE_2D_ARRAY?i.texImage3D(Te,0,i.RGBA,1,1,Ae,0,i.RGBA,i.UNSIGNED_BYTE,Le):i.texImage2D(Te+ke,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Le);return ye}let W={};W[i.TEXTURE_2D]=ee(i.TEXTURE_2D,i.TEXTURE_2D,1),W[i.TEXTURE_CUBE_MAP]=ee(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),W[i.TEXTURE_2D_ARRAY]=ee(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),W[i.TEXTURE_3D]=ee(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),z(i.DEPTH_TEST),a.setFunc(cs),Q(!1),ne(Eh),z(i.CULL_FACE),Z($n);function z(Y){h[Y]!==!0&&(i.enable(Y),h[Y]=!0)}function F(Y){h[Y]!==!1&&(i.disable(Y),h[Y]=!1)}function N(Y,Te){return u[Y]!==Te?(i.bindFramebuffer(Y,Te),u[Y]=Te,Y===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=Te),Y===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=Te),!0):!1}function X(Y,Te){let ge=m,Ae=!1;if(Y){ge=f.get(Te),ge===void 0&&(ge=[],f.set(Te,ge));let Le=Y.textures;if(ge.length!==Le.length||ge[0]!==i.COLOR_ATTACHMENT0){for(let ye=0,ke=Le.length;ye<ke;ye++)ge[ye]=i.COLOR_ATTACHMENT0+ye;ge.length=Le.length,Ae=!0}}else ge[0]!==i.BACK&&(ge[0]=i.BACK,Ae=!0);Ae&&i.drawBuffers(ge)}function oe(Y){return y!==Y?(i.useProgram(Y),y=Y,!0):!1}let de={[Oi]:i.FUNC_ADD,[mf]:i.FUNC_SUBTRACT,[gf]:i.FUNC_REVERSE_SUBTRACT};de[xf]=i.MIN,de[_f]=i.MAX;let P={[yf]:i.ZERO,[vf]:i.ONE,[Mf]:i.SRC_COLOR,[vo]:i.SRC_ALPHA,[Af]:i.SRC_ALPHA_SATURATE,[Tf]:i.DST_COLOR,[bf]:i.DST_ALPHA,[Sf]:i.ONE_MINUS_SRC_COLOR,[Mo]:i.ONE_MINUS_SRC_ALPHA,[wf]:i.ONE_MINUS_DST_COLOR,[Ef]:i.ONE_MINUS_DST_ALPHA,[Rf]:i.CONSTANT_COLOR,[Cf]:i.ONE_MINUS_CONSTANT_COLOR,[If]:i.CONSTANT_ALPHA,[Pf]:i.ONE_MINUS_CONSTANT_ALPHA};function Z(Y,Te,ge,Ae,Le,ye,ke,Oe,Et,xt){if(Y===$n){g===!0&&(F(i.BLEND),g=!1);return}if(g===!1&&(z(i.BLEND),g=!0),Y!==pf){if(Y!==p||xt!==D){if((E!==Oi||M!==Oi)&&(i.blendEquation(i.FUNC_ADD),E=Oi,M=Oi),xt)switch(Y){case os:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Th:i.blendFunc(i.ONE,i.ONE);break;case wh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ah:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ye("WebGLState: Invalid blending: ",Y);break}else switch(Y){case os:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Th:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case wh:Ye("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ah:Ye("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ye("WebGLState: Invalid blending: ",Y);break}b=null,_=null,T=null,A=null,x.set(0,0,0),R=0,p=Y,D=xt}return}Le=Le||Te,ye=ye||ge,ke=ke||Ae,(Te!==E||Le!==M)&&(i.blendEquationSeparate(de[Te],de[Le]),E=Te,M=Le),(ge!==b||Ae!==_||ye!==T||ke!==A)&&(i.blendFuncSeparate(P[ge],P[Ae],P[ye],P[ke]),b=ge,_=Ae,T=ye,A=ke),(Oe.equals(x)===!1||Et!==R)&&(i.blendColor(Oe.r,Oe.g,Oe.b,Et),x.copy(Oe),R=Et),p=Y,D=!1}function k(Y,Te){Y.side===jt?F(i.CULL_FACE):z(i.CULL_FACE);let ge=Y.side===Kt;Te&&(ge=!ge),Q(ge),Y.blending===os&&Y.transparent===!1?Z($n):Z(Y.blending,Y.blendEquation,Y.blendSrc,Y.blendDst,Y.blendEquationAlpha,Y.blendSrcAlpha,Y.blendDstAlpha,Y.blendColor,Y.blendAlpha,Y.premultipliedAlpha),a.setFunc(Y.depthFunc),a.setTest(Y.depthTest),a.setMask(Y.depthWrite),r.setMask(Y.colorWrite);let Ae=Y.stencilWrite;o.setTest(Ae),Ae&&(o.setMask(Y.stencilWriteMask),o.setFunc(Y.stencilFunc,Y.stencilRef,Y.stencilFuncMask),o.setOp(Y.stencilFail,Y.stencilZFail,Y.stencilZPass)),xe(Y.polygonOffset,Y.polygonOffsetFactor,Y.polygonOffsetUnits),Y.alphaToCoverage===!0?z(i.SAMPLE_ALPHA_TO_COVERAGE):F(i.SAMPLE_ALPHA_TO_COVERAGE)}function Q(Y){w!==Y&&(Y?i.frontFace(i.CW):i.frontFace(i.CCW),w=Y)}function ne(Y){Y!==uf?(z(i.CULL_FACE),Y!==I&&(Y===Eh?i.cullFace(i.BACK):Y===df?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):F(i.CULL_FACE),I=Y}function le(Y){Y!==O&&(G&&i.lineWidth(Y),O=Y)}function xe(Y,Te,ge){Y?(z(i.POLYGON_OFFSET_FILL),(B!==Te||U!==ge)&&(B=Te,U=ge,a.getReversed()&&(Te=-Te),i.polygonOffset(Te,ge))):F(i.POLYGON_OFFSET_FILL)}function _e(Y){Y?z(i.SCISSOR_TEST):F(i.SCISSOR_TEST)}function J(Y){Y===void 0&&(Y=i.TEXTURE0+q-1),ie!==Y&&(i.activeTexture(Y),ie=Y)}function S(Y,Te,ge){ge===void 0&&(ie===null?ge=i.TEXTURE0+q-1:ge=ie);let Ae=ue[ge];Ae===void 0&&(Ae={type:void 0,texture:void 0},ue[ge]=Ae),(Ae.type!==Y||Ae.texture!==Te)&&(ie!==ge&&(i.activeTexture(ge),ie=ge),i.bindTexture(Y,Te||W[Y]),Ae.type=Y,Ae.texture=Te)}function Pe(){let Y=ue[ie];Y!==void 0&&Y.type!==void 0&&(i.bindTexture(Y.type,null),Y.type=void 0,Y.texture=void 0)}function Fe(){try{i.compressedTexImage2D(...arguments)}catch(Y){Ye("WebGLState:",Y)}}function L(){try{i.compressedTexImage3D(...arguments)}catch(Y){Ye("WebGLState:",Y)}}function v(){try{i.texSubImage2D(...arguments)}catch(Y){Ye("WebGLState:",Y)}}function $(){try{i.texSubImage3D(...arguments)}catch(Y){Ye("WebGLState:",Y)}}function te(){try{i.compressedTexSubImage2D(...arguments)}catch(Y){Ye("WebGLState:",Y)}}function ce(){try{i.compressedTexSubImage3D(...arguments)}catch(Y){Ye("WebGLState:",Y)}}function Me(){try{i.texStorage2D(...arguments)}catch(Y){Ye("WebGLState:",Y)}}function Se(){try{i.texStorage3D(...arguments)}catch(Y){Ye("WebGLState:",Y)}}function he(){try{i.texImage2D(...arguments)}catch(Y){Ye("WebGLState:",Y)}}function me(){try{i.texImage3D(...arguments)}catch(Y){Ye("WebGLState:",Y)}}function be(Y){return d[Y]!==void 0?d[Y]:i.getParameter(Y)}function Be(Y,Te){d[Y]!==Te&&(i.pixelStorei(Y,Te),d[Y]=Te)}function we(Y){He.equals(Y)===!1&&(i.scissor(Y.x,Y.y,Y.z,Y.w),He.copy(Y))}function Ee(Y){Ue.equals(Y)===!1&&(i.viewport(Y.x,Y.y,Y.z,Y.w),Ue.copy(Y))}function Ze(Y,Te){let ge=l.get(Te);ge===void 0&&(ge=new WeakMap,l.set(Te,ge));let Ae=ge.get(Y);Ae===void 0&&(Ae=i.getUniformBlockIndex(Te,Y.name),ge.set(Y,Ae))}function Je(Y,Te){let Ae=l.get(Te).get(Y);c.get(Te)!==Ae&&(i.uniformBlockBinding(Te,Ae,Y.__bindingPointIndex),c.set(Te,Ae))}function $e(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},ie=null,ue={},u={},f=new WeakMap,m=[],y=null,g=!1,p=null,E=null,b=null,_=null,M=null,T=null,A=null,x=new Ve(0,0,0),R=0,D=!1,w=null,I=null,O=null,B=null,U=null,He.set(0,0,i.canvas.width,i.canvas.height),Ue.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:z,disable:F,bindFramebuffer:N,drawBuffers:X,useProgram:oe,setBlending:Z,setMaterial:k,setFlipSided:Q,setCullFace:ne,setLineWidth:le,setPolygonOffset:xe,setScissorTest:_e,activeTexture:J,bindTexture:S,unbindTexture:Pe,compressedTexImage2D:Fe,compressedTexImage3D:L,texImage2D:he,texImage3D:me,pixelStorei:Be,getParameter:be,updateUBOMapping:Ze,uniformBlockBinding:Je,texStorage2D:Me,texStorage3D:Se,texSubImage2D:v,texSubImage3D:$,compressedTexSubImage2D:te,compressedTexSubImage3D:ce,scissor:we,viewport:Ee,reset:$e}}function Kv(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new fe,h=new WeakMap,d=new Set,u,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(L,v){return m?new OffscreenCanvas(L,v):Jr("canvas")}function g(L,v,$){let te=1,ce=Fe(L);if((ce.width>$||ce.height>$)&&(te=$/Math.max(ce.width,ce.height)),te<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){let Me=Math.floor(te*ce.width),Se=Math.floor(te*ce.height);u===void 0&&(u=y(Me,Se));let he=v?y(Me,Se):u;return he.width=Me,he.height=Se,he.getContext("2d").drawImage(L,0,0,Me,Se),Xe("WebGLRenderer: Texture has been resized from ("+ce.width+"x"+ce.height+") to ("+Me+"x"+Se+")."),he}else return"data"in L&&Xe("WebGLRenderer: Image in DataTexture is too big ("+ce.width+"x"+ce.height+")."),L;return L}function p(L){return L.generateMipmaps}function E(L){i.generateMipmap(L)}function b(L){return L.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?i.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(L,v,$,te,ce,Me=!1){if(L!==null){if(i[L]!==void 0)return i[L];Xe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let Se;te&&(Se=e.get("EXT_texture_norm16"),Se||Xe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let he=v;if(v===i.RED&&($===i.FLOAT&&(he=i.R32F),$===i.HALF_FLOAT&&(he=i.R16F),$===i.UNSIGNED_BYTE&&(he=i.R8),$===i.UNSIGNED_SHORT&&Se&&(he=Se.R16_EXT),$===i.SHORT&&Se&&(he=Se.R16_SNORM_EXT)),v===i.RED_INTEGER&&($===i.UNSIGNED_BYTE&&(he=i.R8UI),$===i.UNSIGNED_SHORT&&(he=i.R16UI),$===i.UNSIGNED_INT&&(he=i.R32UI),$===i.BYTE&&(he=i.R8I),$===i.SHORT&&(he=i.R16I),$===i.INT&&(he=i.R32I)),v===i.RG&&($===i.FLOAT&&(he=i.RG32F),$===i.HALF_FLOAT&&(he=i.RG16F),$===i.UNSIGNED_BYTE&&(he=i.RG8),$===i.UNSIGNED_SHORT&&Se&&(he=Se.RG16_EXT),$===i.SHORT&&Se&&(he=Se.RG16_SNORM_EXT)),v===i.RG_INTEGER&&($===i.UNSIGNED_BYTE&&(he=i.RG8UI),$===i.UNSIGNED_SHORT&&(he=i.RG16UI),$===i.UNSIGNED_INT&&(he=i.RG32UI),$===i.BYTE&&(he=i.RG8I),$===i.SHORT&&(he=i.RG16I),$===i.INT&&(he=i.RG32I)),v===i.RGB_INTEGER&&($===i.UNSIGNED_BYTE&&(he=i.RGB8UI),$===i.UNSIGNED_SHORT&&(he=i.RGB16UI),$===i.UNSIGNED_INT&&(he=i.RGB32UI),$===i.BYTE&&(he=i.RGB8I),$===i.SHORT&&(he=i.RGB16I),$===i.INT&&(he=i.RGB32I)),v===i.RGBA_INTEGER&&($===i.UNSIGNED_BYTE&&(he=i.RGBA8UI),$===i.UNSIGNED_SHORT&&(he=i.RGBA16UI),$===i.UNSIGNED_INT&&(he=i.RGBA32UI),$===i.BYTE&&(he=i.RGBA8I),$===i.SHORT&&(he=i.RGBA16I),$===i.INT&&(he=i.RGBA32I)),v===i.RGB&&($===i.UNSIGNED_SHORT&&Se&&(he=Se.RGB16_EXT),$===i.SHORT&&Se&&(he=Se.RGB16_SNORM_EXT),$===i.UNSIGNED_INT_5_9_9_9_REV&&(he=i.RGB9_E5),$===i.UNSIGNED_INT_10F_11F_11F_REV&&(he=i.R11F_G11F_B10F)),v===i.RGBA){let me=Me?Yr:it.getTransfer(ce);$===i.FLOAT&&(he=i.RGBA32F),$===i.HALF_FLOAT&&(he=i.RGBA16F),$===i.UNSIGNED_BYTE&&(he=me===lt?i.SRGB8_ALPHA8:i.RGBA8),$===i.UNSIGNED_SHORT&&Se&&(he=Se.RGBA16_EXT),$===i.SHORT&&Se&&(he=Se.RGBA16_SNORM_EXT),$===i.UNSIGNED_SHORT_4_4_4_4&&(he=i.RGBA4),$===i.UNSIGNED_SHORT_5_5_5_1&&(he=i.RGB5_A1)}return(he===i.R16F||he===i.R32F||he===i.RG16F||he===i.RG32F||he===i.RGBA16F||he===i.RGBA32F)&&e.get("EXT_color_buffer_float"),he}function M(L,v){let $;return L?v===null||v===Pn||v===dr?$=i.DEPTH24_STENCIL8:v===yn?$=i.DEPTH32F_STENCIL8:v===ur&&($=i.DEPTH24_STENCIL8,Xe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Pn||v===dr?$=i.DEPTH_COMPONENT24:v===yn?$=i.DEPTH_COMPONENT32F:v===ur&&($=i.DEPTH_COMPONENT16),$}function T(L,v){return p(L)===!0||L.isFramebufferTexture&&L.minFilter!==wt&&L.minFilter!==St?Math.log2(Math.max(v.width,v.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?v.mipmaps.length:1}function A(L){let v=L.target;v.removeEventListener("dispose",A),R(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&d.delete(v)}function x(L){let v=L.target;v.removeEventListener("dispose",x),w(v)}function R(L){let v=n.get(L);if(v.__webglInit===void 0)return;let $=L.source,te=f.get($);if(te){let ce=te[v.__cacheKey];ce.usedTimes--,ce.usedTimes===0&&D(L),Object.keys(te).length===0&&f.delete($)}n.remove(L)}function D(L){let v=n.get(L);i.deleteTexture(v.__webglTexture);let $=L.source,te=f.get($);delete te[v.__cacheKey],a.memory.textures--}function w(L){let v=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(v.__webglFramebuffer[te]))for(let ce=0;ce<v.__webglFramebuffer[te].length;ce++)i.deleteFramebuffer(v.__webglFramebuffer[te][ce]);else i.deleteFramebuffer(v.__webglFramebuffer[te]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[te])}else{if(Array.isArray(v.__webglFramebuffer))for(let te=0;te<v.__webglFramebuffer.length;te++)i.deleteFramebuffer(v.__webglFramebuffer[te]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let te=0;te<v.__webglColorRenderbuffer.length;te++)v.__webglColorRenderbuffer[te]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[te]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let $=L.textures;for(let te=0,ce=$.length;te<ce;te++){let Me=n.get($[te]);Me.__webglTexture&&(i.deleteTexture(Me.__webglTexture),a.memory.textures--),n.remove($[te])}n.remove(L)}let I=0;function O(){I=0}function B(){return I}function U(L){I=L}function q(){let L=I;return L>=s.maxTextures&&Xe("WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+s.maxTextures),I+=1,L}function G(L){let v=[];return v.push(L.wrapS),v.push(L.wrapT),v.push(L.wrapR||0),v.push(L.magFilter),v.push(L.minFilter),v.push(L.anisotropy),v.push(L.internalFormat),v.push(L.format),v.push(L.type),v.push(L.generateMipmaps),v.push(L.premultiplyAlpha),v.push(L.flipY),v.push(L.unpackAlignment),v.push(L.colorSpace),v.join()}function H(L,v){let $=n.get(L);if(L.isVideoTexture&&S(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&$.__version!==L.version){let te=L.image;if(te===null)Xe("WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)Xe("WebGLRenderer: Texture marked for update but image is incomplete");else{F($,L,v);return}}else L.isExternalTexture&&($.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,$.__webglTexture,i.TEXTURE0+v)}function j(L,v){let $=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&$.__version!==L.version){F($,L,v);return}else L.isExternalTexture&&($.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,$.__webglTexture,i.TEXTURE0+v)}function ie(L,v){let $=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&$.__version!==L.version){F($,L,v);return}t.bindTexture(i.TEXTURE_3D,$.__webglTexture,i.TEXTURE0+v)}function ue(L,v){let $=n.get(L);if(L.isCubeDepthTexture!==!0&&L.version>0&&$.__version!==L.version){N($,L,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture,i.TEXTURE0+v)}let pe={[xn]:i.REPEAT,[tn]:i.CLAMP_TO_EDGE,[Bi]:i.MIRRORED_REPEAT},ve={[wt]:i.NEAREST,[rc]:i.NEAREST_MIPMAP_NEAREST,[ps]:i.NEAREST_MIPMAP_LINEAR,[St]:i.LINEAR,[hr]:i.LINEAR_MIPMAP_NEAREST,[Kn]:i.LINEAR_MIPMAP_LINEAR},He={[Ff]:i.NEVER,[Vf]:i.ALWAYS,[Of]:i.LESS,[Wc]:i.LEQUAL,[Bf]:i.EQUAL,[Xc]:i.GEQUAL,[zf]:i.GREATER,[kf]:i.NOTEQUAL};function Ue(L,v){if(v.type===yn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===St||v.magFilter===hr||v.magFilter===ps||v.magFilter===Kn||v.minFilter===St||v.minFilter===hr||v.minFilter===ps||v.minFilter===Kn)&&Xe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(L,i.TEXTURE_WRAP_S,pe[v.wrapS]),i.texParameteri(L,i.TEXTURE_WRAP_T,pe[v.wrapT]),(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)&&i.texParameteri(L,i.TEXTURE_WRAP_R,pe[v.wrapR]),i.texParameteri(L,i.TEXTURE_MAG_FILTER,ve[v.magFilter]),i.texParameteri(L,i.TEXTURE_MIN_FILTER,ve[v.minFilter]),v.compareFunction&&(i.texParameteri(L,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(L,i.TEXTURE_COMPARE_FUNC,He[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===wt||v.minFilter!==ps&&v.minFilter!==Kn||v.type===yn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let $=e.get("EXT_texture_filter_anisotropic");i.texParameterf(L,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function ee(L,v){let $=!1;L.__webglInit===void 0&&(L.__webglInit=!0,v.addEventListener("dispose",A));let te=v.source,ce=f.get(te);ce===void 0&&(ce={},f.set(te,ce));let Me=G(v);if(Me!==L.__cacheKey){ce[Me]===void 0&&(ce[Me]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,$=!0),ce[Me].usedTimes++;let Se=ce[L.__cacheKey];Se!==void 0&&(ce[L.__cacheKey].usedTimes--,Se.usedTimes===0&&D(v)),L.__cacheKey=Me,L.__webglTexture=ce[Me].texture}return $}function W(L,v,$){return Math.floor(Math.floor(L/$)/v)}function z(L,v,$,te){let Me=L.updateRanges;if(Me.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,$,te,v.data);else{Me.sort((Be,we)=>Be.start-we.start);let Se=0;for(let Be=1;Be<Me.length;Be++){let we=Me[Se],Ee=Me[Be],Ze=we.start+we.count,Je=W(Ee.start,v.width,4),$e=W(we.start,v.width,4);Ee.start<=Ze+1&&Je===$e&&W(Ee.start+Ee.count-1,v.width,4)===Je?we.count=Math.max(we.count,Ee.start+Ee.count-we.start):(++Se,Me[Se]=Ee)}Me.length=Se+1;let he=t.getParameter(i.UNPACK_ROW_LENGTH),me=t.getParameter(i.UNPACK_SKIP_PIXELS),be=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let Be=0,we=Me.length;Be<we;Be++){let Ee=Me[Be],Ze=Math.floor(Ee.start/4),Je=Math.ceil(Ee.count/4),$e=Ze%v.width,Y=Math.floor(Ze/v.width),Te=Je,ge=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,$e),t.pixelStorei(i.UNPACK_SKIP_ROWS,Y),t.texSubImage2D(i.TEXTURE_2D,0,$e,Y,Te,ge,$,te,v.data)}L.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,he),t.pixelStorei(i.UNPACK_SKIP_PIXELS,me),t.pixelStorei(i.UNPACK_SKIP_ROWS,be)}}function F(L,v,$){let te=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(te=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(te=i.TEXTURE_3D);let ce=ee(L,v),Me=v.source;t.bindTexture(te,L.__webglTexture,i.TEXTURE0+$);let Se=n.get(Me);if(Me.version!==Se.__version||ce===!0){if(t.activeTexture(i.TEXTURE0+$),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let ge=it.getPrimaries(it.workingColorSpace),Ae=v.colorSpace===Ln?null:it.getPrimaries(v.colorSpace),Le=v.colorSpace===Ln||ge===Ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le)}t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let me=g(v.image,!1,s.maxTextureSize);me=Pe(v,me);let be=r.convert(v.format,v.colorSpace),Be=r.convert(v.type),we=_(v.internalFormat,be,Be,v.normalized,v.colorSpace,v.isVideoTexture);Ue(te,v);let Ee,Ze=v.mipmaps,Je=v.isVideoTexture!==!0,$e=Se.__version===void 0||ce===!0,Y=Me.dataReady,Te=T(v,me);if(v.isDepthTexture)we=M(v.format===qi,v.type),$e&&(Je?t.texStorage2D(i.TEXTURE_2D,1,we,me.width,me.height):t.texImage2D(i.TEXTURE_2D,0,we,me.width,me.height,0,be,Be,null));else if(v.isDataTexture)if(Ze.length>0){Je&&$e&&t.texStorage2D(i.TEXTURE_2D,Te,we,Ze[0].width,Ze[0].height);for(let ge=0,Ae=Ze.length;ge<Ae;ge++)Ee=Ze[ge],Je?Y&&t.texSubImage2D(i.TEXTURE_2D,ge,0,0,Ee.width,Ee.height,be,Be,Ee.data):t.texImage2D(i.TEXTURE_2D,ge,we,Ee.width,Ee.height,0,be,Be,Ee.data);v.generateMipmaps=!1}else Je?($e&&t.texStorage2D(i.TEXTURE_2D,Te,we,me.width,me.height),Y&&z(v,me,be,Be)):t.texImage2D(i.TEXTURE_2D,0,we,me.width,me.height,0,be,Be,me.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Je&&$e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Te,we,Ze[0].width,Ze[0].height,me.depth);for(let ge=0,Ae=Ze.length;ge<Ae;ge++)if(Ee=Ze[ge],v.format!==sn)if(be!==null)if(Je){if(Y)if(v.layerUpdates.size>0){let Le=Yh(Ee.width,Ee.height,v.format,v.type);for(let ye of v.layerUpdates){let ke=Ee.data.subarray(ye*Le/Ee.data.BYTES_PER_ELEMENT,(ye+1)*Le/Ee.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ge,0,0,ye,Ee.width,Ee.height,1,be,ke)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ge,0,0,0,Ee.width,Ee.height,me.depth,be,Ee.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ge,we,Ee.width,Ee.height,me.depth,0,Ee.data,0,0);else Xe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Je?Y&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ge,0,0,0,Ee.width,Ee.height,me.depth,be,Be,Ee.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ge,we,Ee.width,Ee.height,me.depth,0,be,Be,Ee.data)}else{Je&&$e&&t.texStorage2D(i.TEXTURE_2D,Te,we,Ze[0].width,Ze[0].height);for(let ge=0,Ae=Ze.length;ge<Ae;ge++)Ee=Ze[ge],v.format!==sn?be!==null?Je?Y&&t.compressedTexSubImage2D(i.TEXTURE_2D,ge,0,0,Ee.width,Ee.height,be,Ee.data):t.compressedTexImage2D(i.TEXTURE_2D,ge,we,Ee.width,Ee.height,0,Ee.data):Xe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Je?Y&&t.texSubImage2D(i.TEXTURE_2D,ge,0,0,Ee.width,Ee.height,be,Be,Ee.data):t.texImage2D(i.TEXTURE_2D,ge,we,Ee.width,Ee.height,0,be,Be,Ee.data)}else if(v.isDataArrayTexture)if(Je){if($e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Te,we,me.width,me.height,me.depth),Y)if(v.layerUpdates.size>0){let ge=Yh(me.width,me.height,v.format,v.type);for(let Ae of v.layerUpdates){let Le=me.data.subarray(Ae*ge/me.data.BYTES_PER_ELEMENT,(Ae+1)*ge/me.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ae,me.width,me.height,1,be,Be,Le)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,me.width,me.height,me.depth,be,Be,me.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,we,me.width,me.height,me.depth,0,be,Be,me.data);else if(v.isData3DTexture)Je?($e&&t.texStorage3D(i.TEXTURE_3D,Te,we,me.width,me.height,me.depth),Y&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,me.width,me.height,me.depth,be,Be,me.data)):t.texImage3D(i.TEXTURE_3D,0,we,me.width,me.height,me.depth,0,be,Be,me.data);else if(v.isFramebufferTexture){if($e)if(Je)t.texStorage2D(i.TEXTURE_2D,Te,we,me.width,me.height);else{let ge=me.width,Ae=me.height;for(let Le=0;Le<Te;Le++)t.texImage2D(i.TEXTURE_2D,Le,we,ge,Ae,0,be,Be,null),ge>>=1,Ae>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){let ge=i.canvas;if(ge.hasAttribute("layoutsubtree")||ge.setAttribute("layoutsubtree","true"),me.parentNode!==ge){ge.appendChild(me),d.add(v),ge.onpaint=Ae=>{let Le=Ae.changedElements;for(let ye of d)Le.includes(ye.image)&&(ye.needsUpdate=!0)},ge.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,me);else{let Le=i.RGBA,ye=i.RGBA,ke=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Le,ye,ke,me)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ze.length>0){if(Je&&$e){let ge=Fe(Ze[0]);t.texStorage2D(i.TEXTURE_2D,Te,we,ge.width,ge.height)}for(let ge=0,Ae=Ze.length;ge<Ae;ge++)Ee=Ze[ge],Je?Y&&t.texSubImage2D(i.TEXTURE_2D,ge,0,0,be,Be,Ee):t.texImage2D(i.TEXTURE_2D,ge,we,be,Be,Ee);v.generateMipmaps=!1}else if(Je){if($e){let ge=Fe(me);t.texStorage2D(i.TEXTURE_2D,Te,we,ge.width,ge.height)}Y&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,be,Be,me)}else t.texImage2D(i.TEXTURE_2D,0,we,be,Be,me);p(v)&&E(te),Se.__version=Me.version,v.onUpdate&&v.onUpdate(v)}L.__version=v.version}function N(L,v,$){if(v.image.length!==6)return;let te=ee(L,v),ce=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+$);let Me=n.get(ce);if(ce.version!==Me.__version||te===!0){t.activeTexture(i.TEXTURE0+$);let Se=it.getPrimaries(it.workingColorSpace),he=v.colorSpace===Ln?null:it.getPrimaries(v.colorSpace),me=v.colorSpace===Ln||Se===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);let be=v.isCompressedTexture||v.image[0].isCompressedTexture,Be=v.image[0]&&v.image[0].isDataTexture,we=[];for(let ye=0;ye<6;ye++)!be&&!Be?we[ye]=g(v.image[ye],!0,s.maxCubemapSize):we[ye]=Be?v.image[ye].image:v.image[ye],we[ye]=Pe(v,we[ye]);let Ee=we[0],Ze=r.convert(v.format,v.colorSpace),Je=r.convert(v.type),$e=_(v.internalFormat,Ze,Je,v.normalized,v.colorSpace),Y=v.isVideoTexture!==!0,Te=Me.__version===void 0||te===!0,ge=ce.dataReady,Ae=T(v,Ee);Ue(i.TEXTURE_CUBE_MAP,v);let Le;if(be){Y&&Te&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ae,$e,Ee.width,Ee.height);for(let ye=0;ye<6;ye++){Le=we[ye].mipmaps;for(let ke=0;ke<Le.length;ke++){let Oe=Le[ke];v.format!==sn?Ze!==null?Y?ge&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,ke,0,0,Oe.width,Oe.height,Ze,Oe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,ke,$e,Oe.width,Oe.height,0,Oe.data):Xe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Y?ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,ke,0,0,Oe.width,Oe.height,Ze,Je,Oe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,ke,$e,Oe.width,Oe.height,0,Ze,Je,Oe.data)}}}else{if(Le=v.mipmaps,Y&&Te){Le.length>0&&Ae++;let ye=Fe(we[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ae,$e,ye.width,ye.height)}for(let ye=0;ye<6;ye++)if(Be){Y?ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,0,0,we[ye].width,we[ye].height,Ze,Je,we[ye].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,$e,we[ye].width,we[ye].height,0,Ze,Je,we[ye].data);for(let ke=0;ke<Le.length;ke++){let Et=Le[ke].image[ye].image;Y?ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,ke+1,0,0,Et.width,Et.height,Ze,Je,Et.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,ke+1,$e,Et.width,Et.height,0,Ze,Je,Et.data)}}else{Y?ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,0,0,Ze,Je,we[ye]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,$e,Ze,Je,we[ye]);for(let ke=0;ke<Le.length;ke++){let Oe=Le[ke];Y?ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,ke+1,0,0,Ze,Je,Oe.image[ye]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,ke+1,$e,Ze,Je,Oe.image[ye])}}}p(v)&&E(i.TEXTURE_CUBE_MAP),Me.__version=ce.version,v.onUpdate&&v.onUpdate(v)}L.__version=v.version}function X(L,v,$,te,ce,Me){let Se=r.convert($.format,$.colorSpace),he=r.convert($.type),me=_($.internalFormat,Se,he,$.normalized,$.colorSpace),be=n.get(v),Be=n.get($);if(Be.__renderTarget=v,!be.__hasExternalTextures){let we=Math.max(1,v.width>>Me),Ee=Math.max(1,v.height>>Me);ce===i.TEXTURE_3D||ce===i.TEXTURE_2D_ARRAY?t.texImage3D(ce,Me,me,we,Ee,v.depth,0,Se,he,null):t.texImage2D(ce,Me,me,we,Ee,0,Se,he,null)}t.bindFramebuffer(i.FRAMEBUFFER,L),J(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,te,ce,Be.__webglTexture,0,_e(v)):(ce===i.TEXTURE_2D||ce>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ce<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,te,ce,Be.__webglTexture,Me),t.bindFramebuffer(i.FRAMEBUFFER,null)}function oe(L,v,$){if(i.bindRenderbuffer(i.RENDERBUFFER,L),v.depthBuffer){let te=v.depthTexture,ce=te&&te.isDepthTexture?te.type:null,Me=M(v.stencilBuffer,ce),Se=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;J(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,_e(v),Me,v.width,v.height):$?i.renderbufferStorageMultisample(i.RENDERBUFFER,_e(v),Me,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,Me,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Se,i.RENDERBUFFER,L)}else{let te=v.textures;for(let ce=0;ce<te.length;ce++){let Me=te[ce],Se=r.convert(Me.format,Me.colorSpace),he=r.convert(Me.type),me=_(Me.internalFormat,Se,he,Me.normalized,Me.colorSpace);J(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,_e(v),me,v.width,v.height):$?i.renderbufferStorageMultisample(i.RENDERBUFFER,_e(v),me,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,me,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function de(L,v,$){let te=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,L),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ce=n.get(v.depthTexture);if(ce.__renderTarget=v,(!ce.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),te){if(ce.__webglInit===void 0&&(ce.__webglInit=!0,v.depthTexture.addEventListener("dispose",A)),ce.__webglTexture===void 0){ce.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,ce.__webglTexture),Ue(i.TEXTURE_CUBE_MAP,v.depthTexture);let be=r.convert(v.depthTexture.format),Be=r.convert(v.depthTexture.type),we;v.depthTexture.format===Xn?we=i.DEPTH_COMPONENT24:v.depthTexture.format===qi&&(we=i.DEPTH24_STENCIL8);for(let Ee=0;Ee<6;Ee++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,we,v.width,v.height,0,be,Be,null)}}else H(v.depthTexture,0);let Me=ce.__webglTexture,Se=_e(v),he=te?i.TEXTURE_CUBE_MAP_POSITIVE_X+$:i.TEXTURE_2D,me=v.depthTexture.format===qi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===Xn)J(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,me,he,Me,0,Se):i.framebufferTexture2D(i.FRAMEBUFFER,me,he,Me,0);else if(v.depthTexture.format===qi)J(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,me,he,Me,0,Se):i.framebufferTexture2D(i.FRAMEBUFFER,me,he,Me,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function P(L){let v=n.get(L),$=L.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==L.depthTexture){let te=L.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),te){let ce=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,te.removeEventListener("dispose",ce)};te.addEventListener("dispose",ce),v.__depthDisposeCallback=ce}v.__boundDepthTexture=te}if(L.depthTexture&&!v.__autoAllocateDepthBuffer)if($)for(let te=0;te<6;te++)de(v.__webglFramebuffer[te],L,te);else{let te=L.texture.mipmaps;te&&te.length>0?de(v.__webglFramebuffer[0],L,0):de(v.__webglFramebuffer,L,0)}else if($){v.__webglDepthbuffer=[];for(let te=0;te<6;te++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[te]),v.__webglDepthbuffer[te]===void 0)v.__webglDepthbuffer[te]=i.createRenderbuffer(),oe(v.__webglDepthbuffer[te],L,!1);else{let ce=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=v.__webglDepthbuffer[te];i.bindRenderbuffer(i.RENDERBUFFER,Me),i.framebufferRenderbuffer(i.FRAMEBUFFER,ce,i.RENDERBUFFER,Me)}}else{let te=L.texture.mipmaps;if(te&&te.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),oe(v.__webglDepthbuffer,L,!1);else{let ce=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Me),i.framebufferRenderbuffer(i.FRAMEBUFFER,ce,i.RENDERBUFFER,Me)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Z(L,v,$){let te=n.get(L);v!==void 0&&X(te.__webglFramebuffer,L,L.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),$!==void 0&&P(L)}function k(L){let v=L.texture,$=n.get(L),te=n.get(v);L.addEventListener("dispose",x);let ce=L.textures,Me=L.isWebGLCubeRenderTarget===!0,Se=ce.length>1;if(Se||(te.__webglTexture===void 0&&(te.__webglTexture=i.createTexture()),te.__version=v.version,a.memory.textures++),Me){$.__webglFramebuffer=[];for(let he=0;he<6;he++)if(v.mipmaps&&v.mipmaps.length>0){$.__webglFramebuffer[he]=[];for(let me=0;me<v.mipmaps.length;me++)$.__webglFramebuffer[he][me]=i.createFramebuffer()}else $.__webglFramebuffer[he]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){$.__webglFramebuffer=[];for(let he=0;he<v.mipmaps.length;he++)$.__webglFramebuffer[he]=i.createFramebuffer()}else $.__webglFramebuffer=i.createFramebuffer();if(Se)for(let he=0,me=ce.length;he<me;he++){let be=n.get(ce[he]);be.__webglTexture===void 0&&(be.__webglTexture=i.createTexture(),a.memory.textures++)}if(L.samples>0&&J(L)===!1){$.__webglMultisampledFramebuffer=i.createFramebuffer(),$.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let he=0;he<ce.length;he++){let me=ce[he];$.__webglColorRenderbuffer[he]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,$.__webglColorRenderbuffer[he]);let be=r.convert(me.format,me.colorSpace),Be=r.convert(me.type),we=_(me.internalFormat,be,Be,me.normalized,me.colorSpace,L.isXRRenderTarget===!0),Ee=_e(L);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ee,we,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,$.__webglColorRenderbuffer[he])}i.bindRenderbuffer(i.RENDERBUFFER,null),L.depthBuffer&&($.__webglDepthRenderbuffer=i.createRenderbuffer(),oe($.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Me){t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),Ue(i.TEXTURE_CUBE_MAP,v);for(let he=0;he<6;he++)if(v.mipmaps&&v.mipmaps.length>0)for(let me=0;me<v.mipmaps.length;me++)X($.__webglFramebuffer[he][me],L,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,me);else X($.__webglFramebuffer[he],L,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);p(v)&&E(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){for(let he=0,me=ce.length;he<me;he++){let be=ce[he],Be=n.get(be),we=i.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(we=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(we,Be.__webglTexture),Ue(we,be),X($.__webglFramebuffer,L,be,i.COLOR_ATTACHMENT0+he,we,0),p(be)&&E(we)}t.unbindTexture()}else{let he=i.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(he=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(he,te.__webglTexture),Ue(he,v),v.mipmaps&&v.mipmaps.length>0)for(let me=0;me<v.mipmaps.length;me++)X($.__webglFramebuffer[me],L,v,i.COLOR_ATTACHMENT0,he,me);else X($.__webglFramebuffer,L,v,i.COLOR_ATTACHMENT0,he,0);p(v)&&E(he),t.unbindTexture()}L.depthBuffer&&P(L)}function Q(L){let v=L.textures;for(let $=0,te=v.length;$<te;$++){let ce=v[$];if(p(ce)){let Me=b(L),Se=n.get(ce).__webglTexture;t.bindTexture(Me,Se),E(Me),t.unbindTexture()}}}let ne=[],le=[];function xe(L){if(L.samples>0){if(J(L)===!1){let v=L.textures,$=L.width,te=L.height,ce=i.COLOR_BUFFER_BIT,Me=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Se=n.get(L),he=v.length>1;if(he)for(let be=0;be<v.length;be++)t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer);let me=L.texture.mipmaps;me&&me.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let be=0;be<v.length;be++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(ce|=i.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(ce|=i.STENCIL_BUFFER_BIT)),he){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Se.__webglColorRenderbuffer[be]);let Be=n.get(v[be]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Be,0)}i.blitFramebuffer(0,0,$,te,0,0,$,te,ce,i.NEAREST),c===!0&&(ne.length=0,le.length=0,ne.push(i.COLOR_ATTACHMENT0+be),L.depthBuffer&&L.resolveDepthBuffer===!1&&(ne.push(Me),le.push(Me),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,le)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ne))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),he)for(let be=0;be<v.length;be++){t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,Se.__webglColorRenderbuffer[be]);let Be=n.get(v[be]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,Be,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&c){let v=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function _e(L){return Math.min(s.maxSamples,L.samples)}function J(L){let v=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function S(L){let v=a.render.frame;h.get(L)!==v&&(h.set(L,v),L.update())}function Pe(L,v){let $=L.colorSpace,te=L.format,ce=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||$!==Zr&&$!==Ln&&(it.getTransfer($)===lt?(te!==sn||ce!==nn)&&Xe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ye("WebGLTextures: Unsupported texture color space:",$)),v}function Fe(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(l.width=L.naturalWidth||L.width,l.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(l.width=L.displayWidth,l.height=L.displayHeight):(l.width=L.width,l.height=L.height),l}this.allocateTextureUnit=q,this.resetTextureUnits=O,this.getTextureUnits=B,this.setTextureUnits=U,this.setTexture2D=H,this.setTexture2DArray=j,this.setTexture3D=ie,this.setTextureCube=ue,this.rebindTextures=Z,this.setupRenderTarget=k,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=xe,this.setupDepthRenderbuffer=P,this.setupFrameBufferTexture=X,this.useMultisampledRTT=J,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function jv(i,e){function t(n,s=Ln){let r,a=it.getTransfer(s);if(n===nn)return i.UNSIGNED_BYTE;if(n===oc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===cc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Bh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===zh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Fh)return i.BYTE;if(n===Oh)return i.SHORT;if(n===ur)return i.UNSIGNED_SHORT;if(n===ac)return i.INT;if(n===Pn)return i.UNSIGNED_INT;if(n===yn)return i.FLOAT;if(n===jn)return i.HALF_FLOAT;if(n===kh)return i.ALPHA;if(n===Vh)return i.RGB;if(n===sn)return i.RGBA;if(n===Xn)return i.DEPTH_COMPONENT;if(n===qi)return i.DEPTH_STENCIL;if(n===lc)return i.RED;if(n===hc)return i.RED_INTEGER;if(n===Zi)return i.RG;if(n===uc)return i.RG_INTEGER;if(n===dc)return i.RGBA_INTEGER;if(n===Aa||n===Ra||n===Ca||n===Ia)if(a===lt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Aa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ra)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Aa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ra)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ca)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ia)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===fc||n===pc||n===mc||n===gc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===fc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===pc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===mc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===gc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===xc||n===_c||n===yc||n===vc||n===Mc||n===Pa||n===Sc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===xc||n===_c)return a===lt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===yc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===vc)return r.COMPRESSED_R11_EAC;if(n===Mc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Pa)return r.COMPRESSED_RG11_EAC;if(n===Sc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===bc||n===Ec||n===Tc||n===wc||n===Ac||n===Rc||n===Cc||n===Ic||n===Pc||n===Lc||n===Nc||n===Dc||n===Uc||n===Fc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===bc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ec)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Tc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===wc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ac)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Rc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Cc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ic)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Pc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Lc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Nc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Dc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Uc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Fc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Oc||n===Bc||n===zc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Oc)return a===lt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Bc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===zc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===kc||n===Vc||n===La||n===Hc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===kc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Vc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===La)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Hc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===dr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Qv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,e1=`
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

}`,fu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new aa(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new kt({vertexShader:Qv,fragmentShader:e1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new gt(new dn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},pu=class extends qn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,m=null,y=typeof XRWebGLBinding<"u",g=new fu,p={},E=t.getContextAttributes(),b=null,_=null,M=[],T=[],A=new fe,x=null,R=new Bt;R.viewport=new mt;let D=new Bt;D.viewport=new mt;let w=[R,D],I=new tc,O=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let W=M[ee];return W===void 0&&(W=new js,M[ee]=W),W.getTargetRaySpace()},this.getControllerGrip=function(ee){let W=M[ee];return W===void 0&&(W=new js,M[ee]=W),W.getGripSpace()},this.getHand=function(ee){let W=M[ee];return W===void 0&&(W=new js,M[ee]=W),W.getHandSpace()};function U(ee){let W=T.indexOf(ee.inputSource);if(W===-1)return;let z=M[W];z!==void 0&&(z.update(ee.inputSource,ee.frame,l||a),z.dispatchEvent({type:ee.type,data:ee.inputSource}))}function q(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",G);for(let ee=0;ee<M.length;ee++){let W=T[ee];W!==null&&(T[ee]=null,M[ee].disconnect(W))}O=null,B=null,g.reset();for(let ee in p)delete p[ee];e.setRenderTarget(b),f=null,u=null,d=null,s=null,_=null,Ue.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){r=ee,n.isPresenting===!0&&Xe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){o=ee,n.isPresenting===!0&&Xe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ee){l=ee},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(ee){if(s=ee,s!==null){if(b=e.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",q),s.addEventListener("inputsourceschange",G),E.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(A),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let z=null,F=null,N=null;E.depth&&(N=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,z=E.stencil?qi:Xn,F=E.stencil?dr:Pn);let X={colorFormat:t.RGBA8,depthFormat:N,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(X),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),_=new $t(u.textureWidth,u.textureHeight,{format:sn,type:nn,depthTexture:new xi(u.textureWidth,u.textureHeight,F,void 0,void 0,void 0,void 0,void 0,void 0,z),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let z={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,z),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new $t(f.framebufferWidth,f.framebufferHeight,{format:sn,type:nn,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Ue.setContext(s),Ue.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function G(ee){for(let W=0;W<ee.removed.length;W++){let z=ee.removed[W],F=T.indexOf(z);F>=0&&(T[F]=null,M[F].disconnect(z))}for(let W=0;W<ee.added.length;W++){let z=ee.added[W],F=T.indexOf(z);if(F===-1){for(let X=0;X<M.length;X++)if(X>=T.length){T.push(z),F=X;break}else if(T[X]===null){T[X]=z,F=X;break}if(F===-1)break}let N=M[F];N&&N.connect(z)}}let H=new V,j=new V;function ie(ee,W,z){H.setFromMatrixPosition(W.matrixWorld),j.setFromMatrixPosition(z.matrixWorld);let F=H.distanceTo(j),N=W.projectionMatrix.elements,X=z.projectionMatrix.elements,oe=N[14]/(N[10]-1),de=N[14]/(N[10]+1),P=(N[9]+1)/N[5],Z=(N[9]-1)/N[5],k=(N[8]-1)/N[0],Q=(X[8]+1)/X[0],ne=oe*k,le=oe*Q,xe=F/(-k+Q),_e=xe*-k;if(W.matrixWorld.decompose(ee.position,ee.quaternion,ee.scale),ee.translateX(_e),ee.translateZ(xe),ee.matrixWorld.compose(ee.position,ee.quaternion,ee.scale),ee.matrixWorldInverse.copy(ee.matrixWorld).invert(),N[10]===-1)ee.projectionMatrix.copy(W.projectionMatrix),ee.projectionMatrixInverse.copy(W.projectionMatrixInverse);else{let J=oe+xe,S=de+xe,Pe=ne-_e,Fe=le+(F-_e),L=P*de/S*J,v=Z*de/S*J;ee.projectionMatrix.makePerspective(Pe,Fe,L,v,J,S),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert()}}function ue(ee,W){W===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(W.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(s===null)return;let W=ee.near,z=ee.far;g.texture!==null&&(g.depthNear>0&&(W=g.depthNear),g.depthFar>0&&(z=g.depthFar)),I.near=D.near=R.near=W,I.far=D.far=R.far=z,(O!==I.near||B!==I.far)&&(s.updateRenderState({depthNear:I.near,depthFar:I.far}),O=I.near,B=I.far),I.layers.mask=ee.layers.mask|6,R.layers.mask=I.layers.mask&-5,D.layers.mask=I.layers.mask&-3;let F=ee.parent,N=I.cameras;ue(I,F);for(let X=0;X<N.length;X++)ue(N[X],F);N.length===2?ie(I,R,D):I.projectionMatrix.copy(R.projectionMatrix),pe(ee,I,F)};function pe(ee,W,z){z===null?ee.matrix.copy(W.matrixWorld):(ee.matrix.copy(z.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(W.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(W.projectionMatrix),ee.projectionMatrixInverse.copy(W.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=Js*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(ee){c=ee,u!==null&&(u.fixedFoveation=ee),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=ee)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(I)},this.getCameraTexture=function(ee){return p[ee]};let ve=null;function He(ee,W){if(h=W.getViewerPose(l||a),m=W,h!==null){let z=h.views;f!==null&&(e.setRenderTargetFramebuffer(_,f.framebuffer),e.setRenderTarget(_));let F=!1;z.length!==I.cameras.length&&(I.cameras.length=0,F=!0);for(let de=0;de<z.length;de++){let P=z[de],Z=null;if(f!==null)Z=f.getViewport(P);else{let Q=d.getViewSubImage(u,P);Z=Q.viewport,de===0&&(e.setRenderTargetTextures(_,Q.colorTexture,Q.depthStencilTexture),e.setRenderTarget(_))}let k=w[de];k===void 0&&(k=new Bt,k.layers.enable(de),k.viewport=new mt,w[de]=k),k.matrix.fromArray(P.transform.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale),k.projectionMatrix.fromArray(P.projectionMatrix),k.projectionMatrixInverse.copy(k.projectionMatrix).invert(),k.viewport.set(Z.x,Z.y,Z.width,Z.height),de===0&&(I.matrix.copy(k.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),F===!0&&I.cameras.push(k)}let N=s.enabledFeatures;if(N&&N.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){d=n.getBinding();let de=d.getDepthInformation(z[0]);de&&de.isValid&&de.texture&&g.init(de,s.renderState)}if(N&&N.includes("camera-access")&&y){e.state.unbindTexture(),d=n.getBinding();for(let de=0;de<z.length;de++){let P=z[de].camera;if(P){let Z=p[P];Z||(Z=new aa,p[P]=Z);let k=d.getCameraImage(P);Z.sourceTexture=k}}}}for(let z=0;z<M.length;z++){let F=T[z],N=M[z];F!==null&&N!==void 0&&N.update(F,W,l||a)}ve&&ve(ee,W),W.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:W}),m=null}let Ue=new Sp;Ue.setAnimationLoop(He),this.setAnimationLoop=function(ee){ve=ee},this.dispose=function(){}}},t1=new rt,Rp=new qe;Rp.set(-1,0,0,0,1,0,0,0,1);function n1(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Xh(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,E,b,_){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),d(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),u(g,p),p.isMeshPhysicalMaterial&&f(g,p,_)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),y(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?c(g,p,E,b):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Kt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Kt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let E=e.get(p),b=E.envMap,_=E.envMapRotation;b&&(g.envMap.value=b,g.envMapRotation.value.setFromMatrix4(t1.makeRotationFromEuler(_)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Rp),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,E,b){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*E,g.scale.value=b*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function u(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,E){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Kt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=E.texture,g.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function y(g,p){let E=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(E.matrixWorld),g.nearDistance.value=E.shadow.camera.near,g.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function i1(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,M){let T=M.program;n.uniformBlockBinding(_,T)}function l(_,M){let T=s[_.id];T===void 0&&(g(_),T=h(_),s[_.id]=T,_.addEventListener("dispose",E));let A=M.program;n.updateUBOMapping(_,A);let x=e.render.frame;r[_.id]!==x&&(u(_),r[_.id]=x)}function h(_){let M=d();_.__bindingPointIndex=M;let T=i.createBuffer(),A=_.__size,x=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,A,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,T),T}function d(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return Ye("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){let M=s[_.id],T=_.uniforms,A=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let x=0,R=T.length;x<R;x++){let D=T[x];if(Array.isArray(D))for(let w=0,I=D.length;w<I;w++)f(D[w],x,w,A);else f(D,x,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(_,M,T,A){if(y(_,M,T,A)===!0){let x=_.__offset,R=_.value;if(Array.isArray(R)){let D=0;for(let w=0;w<R.length;w++){let I=R[w],O=p(I);m(I,_.__data,D),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(D+=O.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(R,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,_.__data)}}function m(_,M,T){typeof _=="number"||typeof _=="boolean"?M[0]=_:_.isMatrix3?(M[0]=_.elements[0],M[1]=_.elements[1],M[2]=_.elements[2],M[3]=0,M[4]=_.elements[3],M[5]=_.elements[4],M[6]=_.elements[5],M[7]=0,M[8]=_.elements[6],M[9]=_.elements[7],M[10]=_.elements[8],M[11]=0):ArrayBuffer.isView(_)?M.set(new _.constructor(_.buffer,_.byteOffset,M.length)):_.toArray(M,T)}function y(_,M,T,A){let x=_.value,R=M+"_"+T;if(A[R]===void 0)return typeof x=="number"||typeof x=="boolean"?A[R]=x:ArrayBuffer.isView(x)?A[R]=x.slice():A[R]=x.clone(),!0;{let D=A[R];if(typeof x=="number"||typeof x=="boolean"){if(D!==x)return A[R]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(D.equals(x)===!1)return D.copy(x),!0}}return!1}function g(_){let M=_.uniforms,T=0,A=16;for(let R=0,D=M.length;R<D;R++){let w=Array.isArray(M[R])?M[R]:[M[R]];for(let I=0,O=w.length;I<O;I++){let B=w[I],U=Array.isArray(B.value)?B.value:[B.value];for(let q=0,G=U.length;q<G;q++){let H=U[q],j=p(H),ie=T%A,ue=ie%j.boundary,pe=ie+ue;T+=ue,pe!==0&&A-pe<j.storage&&(T+=A-pe),B.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=T,T+=j.storage}}}let x=T%A;return x>0&&(T+=A-x),_.__size=T,_.__cache={},this}function p(_){let M={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(M.boundary=4,M.storage=4):_.isVector2?(M.boundary=8,M.storage=8):_.isVector3||_.isColor?(M.boundary=16,M.storage=12):_.isVector4?(M.boundary=16,M.storage=16):_.isMatrix3?(M.boundary=48,M.storage=48):_.isMatrix4?(M.boundary=64,M.storage=64):_.isTexture?Xe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(M.boundary=16,M.storage=_.byteLength):Xe("WebGLRenderer: Unsupported uniform value type.",_),M}function E(_){let M=_.target;M.removeEventListener("dispose",E);let T=a.indexOf(M.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function b(){for(let _ in s)i.deleteBuffer(s[_]);a=[],s={},r={}}return{bind:c,update:l,dispose:b}}var s1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Qn=null;function r1(){return Qn===null&&(Qn=new ia(s1,16,16,Zi,jn),Qn.name="DFG_LUT",Qn.minFilter=St,Qn.magFilter=St,Qn.wrapS=tn,Qn.wrapT=tn,Qn.generateMipmaps=!1,Qn.needsUpdate=!0),Qn}var $c=class{constructor(e={}){let{canvas:t=Hf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=nn}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let y=f,g=new Set([dc,uc,hc]),p=new Set([nn,Pn,ur,dr,oc,cc]),E=new Uint32Array(4),b=new Int32Array(4),_=new V,M=null,T=null,A=[],x=[],R=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=In,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let D=this,w=!1,I=null,O=null,B=null,U=null;this._outputColorSpace=vt;let q=0,G=0,H=null,j=-1,ie=null,ue=new mt,pe=new mt,ve=null,He=new Ve(0),Ue=0,ee=t.width,W=t.height,z=1,F=null,N=null,X=new mt(0,0,ee,W),oe=new mt(0,0,ee,W),de=!1,P=new nr,Z=!1,k=!1,Q=new rt,ne=new V,le=new mt,xe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},_e=!1;function J(){return H===null?z:1}let S=n;function Pe(C,K){return t.getContext(C,K)}try{let C={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"185"}`),t.addEventListener("webglcontextlost",Et,!1),t.addEventListener("webglcontextrestored",xt,!1),t.addEventListener("webglcontextcreationerror",zn,!1),S===null){let K="webgl2";if(S=Pe(K,C),S===null)throw Pe(K)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(C){throw Ye("WebGLRenderer: "+C.message),C}let Fe,L,v,$,te,ce,Me,Se,he,me,be,Be,we,Ee,Ze,Je,$e,Y,Te,ge,Ae,Le,ye;function ke(){Fe=new dy(S),Fe.init(),Ae=new jv(S,Fe),L=new sy(S,Fe,e,Ae),v=new $v(S,Fe),L.reversedDepthBuffer&&u&&v.buffers.depth.setReversed(!0),O=S.createFramebuffer(),B=S.createFramebuffer(),U=S.createFramebuffer(),$=new my(S),te=new Fv,ce=new Kv(S,Fe,v,te,L,Ae,$),Me=new uy(D),Se=new y0(S),Le=new ny(S,Se),he=new fy(S,Se,$,Le),me=new xy(S,he,Se,Le,$),Y=new gy(S,L,ce),Ze=new ry(te),be=new Uv(D,Me,Fe,L,Le,Ze),Be=new n1(D,te),we=new Bv,Ee=new Wv(Fe),$e=new ty(D,Me,v,me,m,c),Je=new Jv(D,me,L),ye=new i1(S,$,L,v),Te=new iy(S,Fe,$),ge=new py(S,Fe,$),$.programs=be.programs,D.capabilities=L,D.extensions=Fe,D.properties=te,D.renderLists=we,D.shadowMap=Je,D.state=v,D.info=$}ke(),y!==nn&&(R=new yy(y,t.width,t.height,o,s,r));let Oe=new pu(D,S);this.xr=Oe,this.getContext=function(){return S},this.getContextAttributes=function(){return S.getContextAttributes()},this.forceContextLoss=function(){let C=Fe.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){let C=Fe.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(C){C!==void 0&&(z=C,this.setSize(ee,W,!1))},this.getSize=function(C){return C.set(ee,W)},this.setSize=function(C,K,ae=!0){if(Oe.isPresenting){Xe("WebGLRenderer: Can't change size while VR device is presenting.");return}ee=C,W=K,t.width=Math.floor(C*z),t.height=Math.floor(K*z),ae===!0&&(t.style.width=C+"px",t.style.height=K+"px"),R!==null&&R.setSize(t.width,t.height),this.setViewport(0,0,C,K)},this.getDrawingBufferSize=function(C){return C.set(ee*z,W*z).floor()},this.setDrawingBufferSize=function(C,K,ae){ee=C,W=K,z=ae,t.width=Math.floor(C*ae),t.height=Math.floor(K*ae),this.setViewport(0,0,C,K)},this.setEffects=function(C){if(y===nn){Ye("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let K=0;K<C.length;K++)if(C[K].isOutputPass===!0){Xe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(ue)},this.getViewport=function(C){return C.copy(X)},this.setViewport=function(C,K,ae,se){C.isVector4?X.set(C.x,C.y,C.z,C.w):X.set(C,K,ae,se),v.viewport(ue.copy(X).multiplyScalar(z).round())},this.getScissor=function(C){return C.copy(oe)},this.setScissor=function(C,K,ae,se){C.isVector4?oe.set(C.x,C.y,C.z,C.w):oe.set(C,K,ae,se),v.scissor(pe.copy(oe).multiplyScalar(z).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(C){v.setScissorTest(de=C)},this.setOpaqueSort=function(C){F=C},this.setTransparentSort=function(C){N=C},this.getClearColor=function(C){return C.copy($e.getClearColor())},this.setClearColor=function(){$e.setClearColor(...arguments)},this.getClearAlpha=function(){return $e.getClearAlpha()},this.setClearAlpha=function(){$e.setClearAlpha(...arguments)},this.clear=function(C=!0,K=!0,ae=!0){let se=0;if(C){let re=!1;if(H!==null){let Ie=H.texture.format;re=g.has(Ie)}if(re){let Ie=H.texture.type,De=p.has(Ie),Ce=$e.getClearColor(),ze=$e.getClearAlpha(),Ge=Ce.r,Ke=Ce.g,Qe=Ce.b;De?(E[0]=Ge,E[1]=Ke,E[2]=Qe,E[3]=ze,S.clearBufferuiv(S.COLOR,0,E)):(b[0]=Ge,b[1]=Ke,b[2]=Qe,b[3]=ze,S.clearBufferiv(S.COLOR,0,b))}else se|=S.COLOR_BUFFER_BIT}K&&(se|=S.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ae&&(se|=S.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),se!==0&&S.clear(se)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(C){C.setRenderer(this),I=C},this.dispose=function(){t.removeEventListener("webglcontextlost",Et,!1),t.removeEventListener("webglcontextrestored",xt,!1),t.removeEventListener("webglcontextcreationerror",zn,!1),$e.dispose(),we.dispose(),Ee.dispose(),te.dispose(),Me.dispose(),me.dispose(),Le.dispose(),ye.dispose(),be.dispose(),Oe.dispose(),Oe.removeEventListener("sessionstart",xd),Oe.removeEventListener("sessionend",_d),es.stop()};function Et(C){C.preventDefault(),$r("WebGLRenderer: Context Lost."),w=!0}function xt(){$r("WebGLRenderer: Context Restored."),w=!1;let C=$.autoReset,K=Je.enabled,ae=Je.autoUpdate,se=Je.needsUpdate,re=Je.type;ke(),$.autoReset=C,Je.enabled=K,Je.autoUpdate=ae,Je.needsUpdate=se,Je.type=re}function zn(C){Ye("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function kn(C){let K=C.target;K.removeEventListener("dispose",kn),Xm(K)}function Xm(C){qm(C),te.remove(C)}function qm(C){let K=te.get(C).programs;K!==void 0&&(K.forEach(function(ae){be.releaseProgram(ae)}),C.isShaderMaterial&&be.releaseShaderCache(C))}this.renderBufferDirect=function(C,K,ae,se,re,Ie){K===null&&(K=xe);let De=re.isMesh&&re.matrixWorld.determinantAffine()<0,Ce=Jm(C,K,ae,se,re);v.setMaterial(se,De);let ze=ae.index,Ge=1;if(se.wireframe===!0){if(ze=he.getWireframeAttribute(ae),ze===void 0)return;Ge=2}let Ke=ae.drawRange,Qe=ae.attributes.position,We=Ke.start*Ge,dt=(Ke.start+Ke.count)*Ge;Ie!==null&&(We=Math.max(We,Ie.start*Ge),dt=Math.min(dt,(Ie.start+Ie.count)*Ge)),ze!==null?(We=Math.max(We,0),dt=Math.min(dt,ze.count)):Qe!=null&&(We=Math.max(We,0),dt=Math.min(dt,Qe.count));let Rt=dt-We;if(Rt<0||Rt===1/0)return;Le.setup(re,se,Ce,ae,ze);let Tt,ft=Te;if(ze!==null&&(Tt=Se.get(ze),ft=ge,ft.setIndex(Tt)),re.isMesh)se.wireframe===!0?(v.setLineWidth(se.wireframeLinewidth*J()),ft.setMode(S.LINES)):ft.setMode(S.TRIANGLES);else if(re.isLine){let Vt=se.linewidth;Vt===void 0&&(Vt=1),v.setLineWidth(Vt*J()),re.isLineSegments?ft.setMode(S.LINES):re.isLineLoop?ft.setMode(S.LINE_LOOP):ft.setMode(S.LINE_STRIP)}else re.isPoints?ft.setMode(S.POINTS):re.isSprite&&ft.setMode(S.TRIANGLES);if(re.isBatchedMesh)if(Fe.get("WEBGL_multi_draw"))ft.renderMultiDraw(re._multiDrawStarts,re._multiDrawCounts,re._multiDrawCount);else{let Vt=re._multiDrawStarts,Ne=re._multiDrawCounts,an=re._multiDrawCount,at=ze?Se.get(ze).bytesPerElement:1,mn=te.get(se).currentProgram.getUniforms();for(let Vn=0;Vn<an;Vn++)mn.setValue(S,"_gl_DrawID",Vn),ft.render(Vt[Vn]/at,Ne[Vn])}else if(re.isInstancedMesh)ft.renderInstances(We,Rt,re.count);else if(ae.isInstancedBufferGeometry){let Vt=ae._maxInstanceCount!==void 0?ae._maxInstanceCount:1/0,Ne=Math.min(ae.instanceCount,Vt);ft.renderInstances(We,Rt,Ne)}else ft.render(We,Rt)};function gd(C,K,ae){C.transparent===!0&&C.side===jt&&C.forceSinglePass===!1?(C.side=Kt,C.needsUpdate=!0,Ga(C,K,ae),C.side=fi,C.needsUpdate=!0,Ga(C,K,ae),C.side=jt):Ga(C,K,ae)}this.compile=function(C,K,ae=null){ae===null&&(ae=C),T=Ee.get(ae),T.init(K),x.push(T),ae.traverseVisible(function(re){re.isLight&&re.layers.test(K.layers)&&(T.pushLight(re),re.castShadow&&T.pushShadow(re))}),C!==ae&&C.traverseVisible(function(re){re.isLight&&re.layers.test(K.layers)&&(T.pushLight(re),re.castShadow&&T.pushShadow(re))}),T.setupLights();let se=new Set;return C.traverse(function(re){if(!(re.isMesh||re.isPoints||re.isLine||re.isSprite))return;let Ie=re.material;if(Ie)if(Array.isArray(Ie))for(let De=0;De<Ie.length;De++){let Ce=Ie[De];gd(Ce,ae,re),se.add(Ce)}else gd(Ie,ae,re),se.add(Ie)}),T=x.pop(),se},this.compileAsync=function(C,K,ae=null){let se=this.compile(C,K,ae);return new Promise(re=>{function Ie(){if(se.forEach(function(De){te.get(De).currentProgram.isReady()&&se.delete(De)}),se.size===0){re(C);return}setTimeout(Ie,10)}Fe.get("KHR_parallel_shader_compile")!==null?Ie():setTimeout(Ie,10)})};let Nl=null;function Zm(C){Nl&&Nl(C)}function xd(){es.stop()}function _d(){es.start()}let es=new Sp;es.setAnimationLoop(Zm),typeof self<"u"&&es.setContext(self),this.setAnimationLoop=function(C){Nl=C,Oe.setAnimationLoop(C),C===null?es.stop():es.start()},Oe.addEventListener("sessionstart",xd),Oe.addEventListener("sessionend",_d),this.render=function(C,K){if(K!==void 0&&K.isCamera!==!0){Ye("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;I!==null&&I.renderStart(C,K);let ae=Oe.enabled===!0&&Oe.isPresenting===!0,se=R!==null&&(H===null||ae)&&R.begin(D,H);if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),Oe.enabled===!0&&Oe.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(Oe.cameraAutoUpdate===!0&&Oe.updateCamera(K),K=Oe.getCamera()),C.isScene===!0&&C.onBeforeRender(D,C,K,H),T=Ee.get(C,x.length),T.init(K),T.state.textureUnits=ce.getTextureUnits(),x.push(T),Q.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),P.setFromProjectionMatrix(Q,An,K.reversedDepth),k=this.localClippingEnabled,Z=Ze.init(this.clippingPlanes,k),M=we.get(C,A.length),M.init(),A.push(M),Oe.enabled===!0&&Oe.isPresenting===!0){let De=D.xr.getDepthSensingMesh();De!==null&&Dl(De,K,-1/0,D.sortObjects)}Dl(C,K,0,D.sortObjects),M.finish(),D.sortObjects===!0&&M.sort(F,N,K.reversedDepth),_e=Oe.enabled===!1||Oe.isPresenting===!1||Oe.hasDepthSensing()===!1,_e&&$e.addToRenderList(M,C),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Z===!0&&Ze.beginShadows();let re=T.state.shadowsArray;if(Je.render(re,C,K),Z===!0&&Ze.endShadows(),(se&&R.hasRenderPass())===!1){let De=M.opaque,Ce=M.transmissive;if(T.setupLights(),K.isArrayCamera){let ze=K.cameras;if(Ce.length>0)for(let Ge=0,Ke=ze.length;Ge<Ke;Ge++){let Qe=ze[Ge];vd(De,Ce,C,Qe)}_e&&$e.render(C);for(let Ge=0,Ke=ze.length;Ge<Ke;Ge++){let Qe=ze[Ge];yd(M,C,Qe,Qe.viewport)}}else Ce.length>0&&vd(De,Ce,C,K),_e&&$e.render(C),yd(M,C,K)}H!==null&&G===0&&(ce.updateMultisampleRenderTarget(H),ce.updateRenderTargetMipmap(H)),se&&R.end(D),C.isScene===!0&&C.onAfterRender(D,C,K),Le.resetDefaultState(),j=-1,ie=null,x.pop(),x.length>0?(T=x[x.length-1],ce.setTextureUnits(T.state.textureUnits),Z===!0&&Ze.setGlobalState(D.clippingPlanes,T.state.camera)):T=null,A.pop(),A.length>0?M=A[A.length-1]:M=null,I!==null&&I.renderEnd()};function Dl(C,K,ae,se){if(C.visible===!1)return;if(C.layers.test(K.layers)){if(C.isGroup)ae=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(K);else if(C.isLightProbeGrid)T.pushLightProbeGrid(C);else if(C.isLight)T.pushLight(C),C.castShadow&&T.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||P.intersectsSprite(C)){se&&le.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Q);let De=me.update(C),Ce=C.material;Ce.visible&&M.push(C,De,Ce,ae,le.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||P.intersectsObject(C))){let De=me.update(C),Ce=C.material;if(se&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),le.copy(C.boundingSphere.center)):(De.boundingSphere===null&&De.computeBoundingSphere(),le.copy(De.boundingSphere.center)),le.applyMatrix4(C.matrixWorld).applyMatrix4(Q)),Array.isArray(Ce)){let ze=De.groups;for(let Ge=0,Ke=ze.length;Ge<Ke;Ge++){let Qe=ze[Ge],We=Ce[Qe.materialIndex];We&&We.visible&&M.push(C,De,We,ae,le.z,Qe)}}else Ce.visible&&M.push(C,De,Ce,ae,le.z,null)}}let Ie=C.children;for(let De=0,Ce=Ie.length;De<Ce;De++)Dl(Ie[De],K,ae,se)}function yd(C,K,ae,se){let{opaque:re,transmissive:Ie,transparent:De}=C;T.setupLightsView(ae),Z===!0&&Ze.setGlobalState(D.clippingPlanes,ae),se&&v.viewport(ue.copy(se)),re.length>0&&Ha(re,K,ae),Ie.length>0&&Ha(Ie,K,ae),De.length>0&&Ha(De,K,ae),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function vd(C,K,ae,se){if((ae.isScene===!0?ae.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[se.id]===void 0){let We=Fe.has("EXT_color_buffer_half_float")||Fe.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[se.id]=new $t(1,1,{generateMipmaps:!0,type:We?jn:nn,minFilter:Kn,samples:Math.max(4,L.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:it.workingColorSpace})}let Ie=T.state.transmissionRenderTarget[se.id],De=se.viewport||ue;Ie.setSize(De.z*D.transmissionResolutionScale,De.w*D.transmissionResolutionScale);let Ce=D.getRenderTarget(),ze=D.getActiveCubeFace(),Ge=D.getActiveMipmapLevel();D.setRenderTarget(Ie),D.getClearColor(He),Ue=D.getClearAlpha(),Ue<1&&D.setClearColor(16777215,.5),D.clear(),_e&&$e.render(ae);let Ke=D.toneMapping;D.toneMapping=In;let Qe=se.viewport;if(se.viewport!==void 0&&(se.viewport=void 0),T.setupLightsView(se),Z===!0&&Ze.setGlobalState(D.clippingPlanes,se),Ha(C,ae,se),ce.updateMultisampleRenderTarget(Ie),ce.updateRenderTargetMipmap(Ie),Fe.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let dt=0,Rt=K.length;dt<Rt;dt++){let Tt=K[dt],{object:ft,geometry:Vt,material:Ne,group:an}=Tt;if(Ne.side===jt&&ft.layers.test(se.layers)){let at=Ne.side;Ne.side=Kt,Ne.needsUpdate=!0,Md(ft,ae,se,Vt,Ne,an),Ne.side=at,Ne.needsUpdate=!0,We=!0}}We===!0&&(ce.updateMultisampleRenderTarget(Ie),ce.updateRenderTargetMipmap(Ie))}D.setRenderTarget(Ce,ze,Ge),D.setClearColor(He,Ue),Qe!==void 0&&(se.viewport=Qe),D.toneMapping=Ke}function Ha(C,K,ae){let se=K.isScene===!0?K.overrideMaterial:null;for(let re=0,Ie=C.length;re<Ie;re++){let De=C[re],{object:Ce,geometry:ze,group:Ge}=De,Ke=De.material;Ke.allowOverride===!0&&se!==null&&(Ke=se),Ce.layers.test(ae.layers)&&Md(Ce,K,ae,ze,Ke,Ge)}}function Md(C,K,ae,se,re,Ie){C.onBeforeRender(D,K,ae,se,re,Ie),C.modelViewMatrix.multiplyMatrices(ae.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),re.onBeforeRender(D,K,ae,se,C,Ie),re.transparent===!0&&re.side===jt&&re.forceSinglePass===!1?(re.side=Kt,re.needsUpdate=!0,D.renderBufferDirect(ae,K,se,re,C,Ie),re.side=fi,re.needsUpdate=!0,D.renderBufferDirect(ae,K,se,re,C,Ie),re.side=jt):D.renderBufferDirect(ae,K,se,re,C,Ie),C.onAfterRender(D,K,ae,se,re,Ie)}function Ga(C,K,ae){K.isScene!==!0&&(K=xe);let se=te.get(C),re=T.state.lights,Ie=T.state.shadowsArray,De=re.state.version,Ce=be.getParameters(C,re.state,Ie,K,ae,T.state.lightProbeGridArray),ze=be.getProgramCacheKey(Ce),Ge=se.programs;se.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?K.environment:null,se.fog=K.fog;let Ke=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;se.envMap=Me.get(C.envMap||se.environment,Ke),se.envMapRotation=se.environment!==null&&C.envMap===null?K.environmentRotation:C.envMapRotation,Ge===void 0&&(C.addEventListener("dispose",kn),Ge=new Map,se.programs=Ge);let Qe=Ge.get(ze);if(Qe!==void 0){if(se.currentProgram===Qe&&se.lightsStateVersion===De)return bd(C,Ce),Qe}else Ce.uniforms=be.getUniforms(C),I!==null&&C.isNodeMaterial&&I.build(C,ae,Ce),C.onBeforeCompile(Ce,D),Qe=be.acquireProgram(Ce,ze),Ge.set(ze,Qe),se.uniforms=Ce.uniforms;let We=se.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(We.clippingPlanes=Ze.uniform),bd(C,Ce),se.needsLights=Km(C),se.lightsStateVersion=De,se.needsLights&&(We.ambientLightColor.value=re.state.ambient,We.lightProbe.value=re.state.probe,We.directionalLights.value=re.state.directional,We.directionalLightShadows.value=re.state.directionalShadow,We.spotLights.value=re.state.spot,We.spotLightShadows.value=re.state.spotShadow,We.rectAreaLights.value=re.state.rectArea,We.ltc_1.value=re.state.rectAreaLTC1,We.ltc_2.value=re.state.rectAreaLTC2,We.pointLights.value=re.state.point,We.pointLightShadows.value=re.state.pointShadow,We.hemisphereLights.value=re.state.hemi,We.directionalShadowMatrix.value=re.state.directionalShadowMatrix,We.spotLightMatrix.value=re.state.spotLightMatrix,We.spotLightMap.value=re.state.spotLightMap,We.pointShadowMatrix.value=re.state.pointShadowMatrix),se.lightProbeGrid=T.state.lightProbeGridArray.length>0,se.currentProgram=Qe,se.uniformsList=null,Qe}function Sd(C){if(C.uniformsList===null){let K=C.currentProgram.getUniforms();C.uniformsList=mr.seqWithValue(K.seq,C.uniforms)}return C.uniformsList}function bd(C,K){let ae=te.get(C);ae.outputColorSpace=K.outputColorSpace,ae.batching=K.batching,ae.batchingColor=K.batchingColor,ae.instancing=K.instancing,ae.instancingColor=K.instancingColor,ae.instancingMorph=K.instancingMorph,ae.skinning=K.skinning,ae.morphTargets=K.morphTargets,ae.morphNormals=K.morphNormals,ae.morphColors=K.morphColors,ae.morphTargetsCount=K.morphTargetsCount,ae.numClippingPlanes=K.numClippingPlanes,ae.numIntersection=K.numClipIntersection,ae.vertexAlphas=K.vertexAlphas,ae.vertexTangents=K.vertexTangents,ae.toneMapping=K.toneMapping}function Ym(C,K){if(C.length===0)return null;if(C.length===1)return C[0].texture!==null?C[0]:null;_.setFromMatrixPosition(K.matrixWorld);for(let ae=0,se=C.length;ae<se;ae++){let re=C[ae];if(re.texture!==null&&re.boundingBox.containsPoint(_))return re}return null}function Jm(C,K,ae,se,re){K.isScene!==!0&&(K=xe),ce.resetTextureUnits();let Ie=K.fog,De=se.isMeshStandardMaterial||se.isMeshLambertMaterial||se.isMeshPhongMaterial?K.environment:null,Ce=H===null?D.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:it.workingColorSpace,ze=se.isMeshStandardMaterial||se.isMeshLambertMaterial&&!se.envMap||se.isMeshPhongMaterial&&!se.envMap,Ge=Me.get(se.envMap||De,ze),Ke=se.vertexColors===!0&&!!ae.attributes.color&&ae.attributes.color.itemSize===4,Qe=!!ae.attributes.tangent&&(!!se.normalMap||se.anisotropy>0),We=!!ae.morphAttributes.position,dt=!!ae.morphAttributes.normal,Rt=!!ae.morphAttributes.color,Tt=In;se.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(Tt=D.toneMapping);let ft=ae.morphAttributes.position||ae.morphAttributes.normal||ae.morphAttributes.color,Vt=ft!==void 0?ft.length:0,Ne=te.get(se),an=T.state.lights;if(Z===!0&&(k===!0||C!==ie)){let _t=C===ie&&se.id===j;Ze.setState(se,C,_t)}let at=!1;se.version===Ne.__version?(Ne.needsLights&&Ne.lightsStateVersion!==an.state.version||Ne.outputColorSpace!==Ce||re.isBatchedMesh&&Ne.batching===!1||!re.isBatchedMesh&&Ne.batching===!0||re.isBatchedMesh&&Ne.batchingColor===!0&&re.colorTexture===null||re.isBatchedMesh&&Ne.batchingColor===!1&&re.colorTexture!==null||re.isInstancedMesh&&Ne.instancing===!1||!re.isInstancedMesh&&Ne.instancing===!0||re.isSkinnedMesh&&Ne.skinning===!1||!re.isSkinnedMesh&&Ne.skinning===!0||re.isInstancedMesh&&Ne.instancingColor===!0&&re.instanceColor===null||re.isInstancedMesh&&Ne.instancingColor===!1&&re.instanceColor!==null||re.isInstancedMesh&&Ne.instancingMorph===!0&&re.morphTexture===null||re.isInstancedMesh&&Ne.instancingMorph===!1&&re.morphTexture!==null||Ne.envMap!==Ge||se.fog===!0&&Ne.fog!==Ie||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==Ze.numPlanes||Ne.numIntersection!==Ze.numIntersection)||Ne.vertexAlphas!==Ke||Ne.vertexTangents!==Qe||Ne.morphTargets!==We||Ne.morphNormals!==dt||Ne.morphColors!==Rt||Ne.toneMapping!==Tt||Ne.morphTargetsCount!==Vt||!!Ne.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(at=!0):(at=!0,Ne.__version=se.version);let mn=Ne.currentProgram;at===!0&&(mn=Ga(se,K,re),I&&se.isNodeMaterial&&I.onUpdateProgram(se,mn,Ne));let Vn=!1,Ri=!1,ws=!1,pt=mn.getUniforms(),Ct=Ne.uniforms;if(v.useProgram(mn.program)&&(Vn=!0,Ri=!0,ws=!0),se.id!==j&&(j=se.id,Ri=!0),Ne.needsLights){let _t=Ym(T.state.lightProbeGridArray,re);Ne.lightProbeGrid!==_t&&(Ne.lightProbeGrid=_t,Ri=!0)}if(Vn||ie!==C){v.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),pt.setValue(S,"projectionMatrix",C.projectionMatrix),pt.setValue(S,"viewMatrix",C.matrixWorldInverse);let Ii=pt.map.cameraPosition;Ii!==void 0&&Ii.setValue(S,ne.setFromMatrixPosition(C.matrixWorld)),L.logarithmicDepthBuffer&&pt.setValue(S,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(se.isMeshPhongMaterial||se.isMeshToonMaterial||se.isMeshLambertMaterial||se.isMeshBasicMaterial||se.isMeshStandardMaterial||se.isShaderMaterial)&&pt.setValue(S,"isOrthographic",C.isOrthographicCamera===!0),ie!==C&&(ie=C,Ri=!0,ws=!0)}if(Ne.needsLights&&(an.state.directionalShadowMap.length>0&&pt.setValue(S,"directionalShadowMap",an.state.directionalShadowMap,ce),an.state.spotShadowMap.length>0&&pt.setValue(S,"spotShadowMap",an.state.spotShadowMap,ce),an.state.pointShadowMap.length>0&&pt.setValue(S,"pointShadowMap",an.state.pointShadowMap,ce)),re.isSkinnedMesh){pt.setOptional(S,re,"bindMatrix"),pt.setOptional(S,re,"bindMatrixInverse");let _t=re.skeleton;_t&&(_t.boneTexture===null&&_t.computeBoneTexture(),pt.setValue(S,"boneTexture",_t.boneTexture,ce))}re.isBatchedMesh&&(pt.setOptional(S,re,"batchingTexture"),pt.setValue(S,"batchingTexture",re._matricesTexture,ce),pt.setOptional(S,re,"batchingIdTexture"),pt.setValue(S,"batchingIdTexture",re._indirectTexture,ce),pt.setOptional(S,re,"batchingColorTexture"),re._colorsTexture!==null&&pt.setValue(S,"batchingColorTexture",re._colorsTexture,ce));let Ci=ae.morphAttributes;if((Ci.position!==void 0||Ci.normal!==void 0||Ci.color!==void 0)&&Y.update(re,ae,mn),(Ri||Ne.receiveShadow!==re.receiveShadow)&&(Ne.receiveShadow=re.receiveShadow,pt.setValue(S,"receiveShadow",re.receiveShadow)),(se.isMeshStandardMaterial||se.isMeshLambertMaterial||se.isMeshPhongMaterial)&&se.envMap===null&&K.environment!==null&&(Ct.envMapIntensity.value=K.environmentIntensity),Ct.dfgLUT!==void 0&&(Ct.dfgLUT.value=r1()),Ri){if(pt.setValue(S,"toneMappingExposure",D.toneMappingExposure),Ne.needsLights&&$m(Ct,ws),Ie&&se.fog===!0&&Be.refreshFogUniforms(Ct,Ie),Be.refreshMaterialUniforms(Ct,se,z,W,T.state.transmissionRenderTarget[C.id]),Ne.needsLights&&Ne.lightProbeGrid){let _t=Ne.lightProbeGrid;Ct.probesSH.value=_t.texture,Ct.probesMin.value.copy(_t.boundingBox.min),Ct.probesMax.value.copy(_t.boundingBox.max),Ct.probesResolution.value.copy(_t.resolution)}mr.upload(S,Sd(Ne),Ct,ce)}if(se.isShaderMaterial&&se.uniformsNeedUpdate===!0&&(mr.upload(S,Sd(Ne),Ct,ce),se.uniformsNeedUpdate=!1),se.isSpriteMaterial&&pt.setValue(S,"center",re.center),pt.setValue(S,"modelViewMatrix",re.modelViewMatrix),pt.setValue(S,"normalMatrix",re.normalMatrix),pt.setValue(S,"modelMatrix",re.matrixWorld),se.uniformsGroups!==void 0){let _t=se.uniformsGroups;for(let Ii=0,As=_t.length;Ii<As;Ii++){let Ed=_t[Ii];ye.update(Ed,mn),ye.bind(Ed,mn)}}return mn}function $m(C,K){C.ambientLightColor.needsUpdate=K,C.lightProbe.needsUpdate=K,C.directionalLights.needsUpdate=K,C.directionalLightShadows.needsUpdate=K,C.pointLights.needsUpdate=K,C.pointLightShadows.needsUpdate=K,C.spotLights.needsUpdate=K,C.spotLightShadows.needsUpdate=K,C.rectAreaLights.needsUpdate=K,C.hemisphereLights.needsUpdate=K}function Km(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return H},this.setRenderTargetTextures=function(C,K,ae){let se=te.get(C);se.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,se.__autoAllocateDepthBuffer===!1&&(se.__useRenderToTexture=!1),te.get(C.texture).__webglTexture=K,te.get(C.depthTexture).__webglTexture=se.__autoAllocateDepthBuffer?void 0:ae,se.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,K){let ae=te.get(C);ae.__webglFramebuffer=K,ae.__useDefaultFramebuffer=K===void 0},this.setRenderTarget=function(C,K=0,ae=0){H=C,q=K,G=ae;let se=null,re=!1,Ie=!1;if(C){let Ce=te.get(C);if(Ce.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(S.FRAMEBUFFER,Ce.__webglFramebuffer),ue.copy(C.viewport),pe.copy(C.scissor),ve=C.scissorTest,v.viewport(ue),v.scissor(pe),v.setScissorTest(ve),j=-1;return}else if(Ce.__webglFramebuffer===void 0)ce.setupRenderTarget(C);else if(Ce.__hasExternalTextures)ce.rebindTextures(C,te.get(C.texture).__webglTexture,te.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){let Ke=C.depthTexture;if(Ce.__boundDepthTexture!==Ke){if(Ke!==null&&te.has(Ke)&&(C.width!==Ke.image.width||C.height!==Ke.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ce.setupDepthRenderbuffer(C)}}let ze=C.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(Ie=!0);let Ge=te.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Ge[K])?se=Ge[K][ae]:se=Ge[K],re=!0):C.samples>0&&ce.useMultisampledRTT(C)===!1?se=te.get(C).__webglMultisampledFramebuffer:Array.isArray(Ge)?se=Ge[ae]:se=Ge,ue.copy(C.viewport),pe.copy(C.scissor),ve=C.scissorTest}else ue.copy(X).multiplyScalar(z).floor(),pe.copy(oe).multiplyScalar(z).floor(),ve=de;if(ae!==0&&(se=O),v.bindFramebuffer(S.FRAMEBUFFER,se)&&v.drawBuffers(C,se),v.viewport(ue),v.scissor(pe),v.setScissorTest(ve),re){let Ce=te.get(C.texture);S.framebufferTexture2D(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ce.__webglTexture,ae)}else if(Ie){let Ce=K;for(let ze=0;ze<C.textures.length;ze++){let Ge=te.get(C.textures[ze]);S.framebufferTextureLayer(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0+ze,Ge.__webglTexture,ae,Ce)}}else if(C!==null&&ae!==0){let Ce=te.get(C.texture);S.framebufferTexture2D(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,Ce.__webglTexture,ae)}j=-1},this.readRenderTargetPixels=function(C,K,ae,se,re,Ie,De,Ce=0){if(!(C&&C.isWebGLRenderTarget)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ze=te.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&De!==void 0&&(ze=ze[De]),ze){v.bindFramebuffer(S.FRAMEBUFFER,ze);try{let Ge=C.textures[Ce],Ke=Ge.format,Qe=Ge.type;if(C.textures.length>1&&S.readBuffer(S.COLOR_ATTACHMENT0+Ce),!L.textureFormatReadable(Ke)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!L.textureTypeReadable(Qe)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}K>=0&&K<=C.width-se&&ae>=0&&ae<=C.height-re&&S.readPixels(K,ae,se,re,Ae.convert(Ke),Ae.convert(Qe),Ie)}finally{let Ge=H!==null?te.get(H).__webglFramebuffer:null;v.bindFramebuffer(S.FRAMEBUFFER,Ge)}}},this.readRenderTargetPixelsAsync=async function(C,K,ae,se,re,Ie,De,Ce=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ze=te.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&De!==void 0&&(ze=ze[De]),ze)if(K>=0&&K<=C.width-se&&ae>=0&&ae<=C.height-re){v.bindFramebuffer(S.FRAMEBUFFER,ze);let Ge=C.textures[Ce],Ke=Ge.format,Qe=Ge.type;if(C.textures.length>1&&S.readBuffer(S.COLOR_ATTACHMENT0+Ce),!L.textureFormatReadable(Ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!L.textureTypeReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let We=S.createBuffer();S.bindBuffer(S.PIXEL_PACK_BUFFER,We),S.bufferData(S.PIXEL_PACK_BUFFER,Ie.byteLength,S.STREAM_READ),S.readPixels(K,ae,se,re,Ae.convert(Ke),Ae.convert(Qe),0);let dt=H!==null?te.get(H).__webglFramebuffer:null;v.bindFramebuffer(S.FRAMEBUFFER,dt);let Rt=S.fenceSync(S.SYNC_GPU_COMMANDS_COMPLETE,0);return S.flush(),await Wf(S,Rt,4),S.bindBuffer(S.PIXEL_PACK_BUFFER,We),S.getBufferSubData(S.PIXEL_PACK_BUFFER,0,Ie),S.deleteBuffer(We),S.deleteSync(Rt),Ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,K=null,ae=0){let se=Math.pow(2,-ae),re=Math.floor(C.image.width*se),Ie=Math.floor(C.image.height*se),De=K!==null?K.x:0,Ce=K!==null?K.y:0;ce.setTexture2D(C,0),S.copyTexSubImage2D(S.TEXTURE_2D,ae,0,0,De,Ce,re,Ie),v.unbindTexture()},this.copyTextureToTexture=function(C,K,ae=null,se=null,re=0,Ie=0){let De,Ce,ze,Ge,Ke,Qe,We,dt,Rt,Tt=C.isCompressedTexture?C.mipmaps[Ie]:C.image;if(ae!==null)De=ae.max.x-ae.min.x,Ce=ae.max.y-ae.min.y,ze=ae.isBox3?ae.max.z-ae.min.z:1,Ge=ae.min.x,Ke=ae.min.y,Qe=ae.isBox3?ae.min.z:0;else{let Ct=Math.pow(2,-re);De=Math.floor(Tt.width*Ct),Ce=Math.floor(Tt.height*Ct),C.isDataArrayTexture?ze=Tt.depth:C.isData3DTexture?ze=Math.floor(Tt.depth*Ct):ze=1,Ge=0,Ke=0,Qe=0}se!==null?(We=se.x,dt=se.y,Rt=se.z):(We=0,dt=0,Rt=0);let ft=Ae.convert(K.format),Vt=Ae.convert(K.type),Ne;K.isData3DTexture?(ce.setTexture3D(K,0),Ne=S.TEXTURE_3D):K.isDataArrayTexture||K.isCompressedArrayTexture?(ce.setTexture2DArray(K,0),Ne=S.TEXTURE_2D_ARRAY):(ce.setTexture2D(K,0),Ne=S.TEXTURE_2D),v.activeTexture(S.TEXTURE0),v.pixelStorei(S.UNPACK_FLIP_Y_WEBGL,K.flipY),v.pixelStorei(S.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),v.pixelStorei(S.UNPACK_ALIGNMENT,K.unpackAlignment);let an=v.getParameter(S.UNPACK_ROW_LENGTH),at=v.getParameter(S.UNPACK_IMAGE_HEIGHT),mn=v.getParameter(S.UNPACK_SKIP_PIXELS),Vn=v.getParameter(S.UNPACK_SKIP_ROWS),Ri=v.getParameter(S.UNPACK_SKIP_IMAGES);v.pixelStorei(S.UNPACK_ROW_LENGTH,Tt.width),v.pixelStorei(S.UNPACK_IMAGE_HEIGHT,Tt.height),v.pixelStorei(S.UNPACK_SKIP_PIXELS,Ge),v.pixelStorei(S.UNPACK_SKIP_ROWS,Ke),v.pixelStorei(S.UNPACK_SKIP_IMAGES,Qe);let ws=C.isDataArrayTexture||C.isData3DTexture,pt=K.isDataArrayTexture||K.isData3DTexture;if(C.isDepthTexture){let Ct=te.get(C),Ci=te.get(K),_t=te.get(Ct.__renderTarget),Ii=te.get(Ci.__renderTarget);v.bindFramebuffer(S.READ_FRAMEBUFFER,_t.__webglFramebuffer),v.bindFramebuffer(S.DRAW_FRAMEBUFFER,Ii.__webglFramebuffer);for(let As=0;As<ze;As++)ws&&(S.framebufferTextureLayer(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,te.get(C).__webglTexture,re,Qe+As),S.framebufferTextureLayer(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,te.get(K).__webglTexture,Ie,Rt+As)),S.blitFramebuffer(Ge,Ke,De,Ce,We,dt,De,Ce,S.DEPTH_BUFFER_BIT,S.NEAREST);v.bindFramebuffer(S.READ_FRAMEBUFFER,null),v.bindFramebuffer(S.DRAW_FRAMEBUFFER,null)}else if(re!==0||C.isRenderTargetTexture||te.has(C)){let Ct=te.get(C),Ci=te.get(K);v.bindFramebuffer(S.READ_FRAMEBUFFER,B),v.bindFramebuffer(S.DRAW_FRAMEBUFFER,U);for(let _t=0;_t<ze;_t++)ws?S.framebufferTextureLayer(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,Ct.__webglTexture,re,Qe+_t):S.framebufferTexture2D(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,Ct.__webglTexture,re),pt?S.framebufferTextureLayer(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,Ci.__webglTexture,Ie,Rt+_t):S.framebufferTexture2D(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,Ci.__webglTexture,Ie),re!==0?S.blitFramebuffer(Ge,Ke,De,Ce,We,dt,De,Ce,S.COLOR_BUFFER_BIT,S.NEAREST):pt?S.copyTexSubImage3D(Ne,Ie,We,dt,Rt+_t,Ge,Ke,De,Ce):S.copyTexSubImage2D(Ne,Ie,We,dt,Ge,Ke,De,Ce);v.bindFramebuffer(S.READ_FRAMEBUFFER,null),v.bindFramebuffer(S.DRAW_FRAMEBUFFER,null)}else pt?C.isDataTexture||C.isData3DTexture?S.texSubImage3D(Ne,Ie,We,dt,Rt,De,Ce,ze,ft,Vt,Tt.data):K.isCompressedArrayTexture?S.compressedTexSubImage3D(Ne,Ie,We,dt,Rt,De,Ce,ze,ft,Tt.data):S.texSubImage3D(Ne,Ie,We,dt,Rt,De,Ce,ze,ft,Vt,Tt):C.isDataTexture?S.texSubImage2D(S.TEXTURE_2D,Ie,We,dt,De,Ce,ft,Vt,Tt.data):C.isCompressedTexture?S.compressedTexSubImage2D(S.TEXTURE_2D,Ie,We,dt,Tt.width,Tt.height,ft,Tt.data):S.texSubImage2D(S.TEXTURE_2D,Ie,We,dt,De,Ce,ft,Vt,Tt);v.pixelStorei(S.UNPACK_ROW_LENGTH,an),v.pixelStorei(S.UNPACK_IMAGE_HEIGHT,at),v.pixelStorei(S.UNPACK_SKIP_PIXELS,mn),v.pixelStorei(S.UNPACK_SKIP_ROWS,Vn),v.pixelStorei(S.UNPACK_SKIP_IMAGES,Ri),Ie===0&&K.generateMipmaps&&S.generateMipmap(Ne),v.unbindTexture()},this.initRenderTarget=function(C){te.get(C).__webglFramebuffer===void 0&&ce.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?ce.setTextureCube(C,0):C.isData3DTexture?ce.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?ce.setTexture2DArray(C,0):ce.setTexture2D(C,0),v.unbindTexture()},this.resetState=function(){q=0,G=0,H=null,v.reset(),Le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return An}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=it._getDrawingBufferColorSpace(e),t.unpackColorSpace=it._getUnpackColorSpace()}};var Fa=vt,Qc=class i extends ds{constructor(e){super(e),this.defaultDPI=90,this.defaultUnit="px"}load(e,t,n,s){let r=this,a=new ya(r.manager);a.setPath(r.path),a.setRequestHeader(r.requestHeader),a.setWithCredentials(r.withCredentials),a.load(e,function(o){try{t(r.parse(o))}catch(c){s?s(c):console.error(c),r.manager.itemError(e)}},n,s)}parse(e){let t=this;function n(z,F){if(z.nodeType!==1)return;z.hasAttribute("filter")&&console.warn("THREE.SVGLoader: Filters are not supported.");let N=M(z),X=!1,oe=null;switch(z.nodeName){case"svg":F=y(z,F);break;case"style":r(z);break;case"g":F=y(z,F);break;case"path":F=y(z,F),z.hasAttribute("d")&&(oe=s(z));break;case"rect":F=y(z,F),oe=c(z);break;case"polygon":F=y(z,F),oe=l(z);break;case"polyline":F=y(z,F),oe=h(z);break;case"circle":F=y(z,F),oe=d(z);break;case"ellipse":F=y(z,F),oe=u(z);break;case"line":F=y(z,F),oe=f(z);break;case"defs":X=!0;break;case"use":F=y(z,F);let Z=(z.getAttributeNS("http://www.w3.org/1999/xlink","href")||"").substring(1),k=z.viewportElement.getElementById(Z);k?n(k,F):console.warn("SVGLoader: 'use node' references non-existent node id: "+Z);break;default:}if(oe){F.fill!==void 0&&F.fill!=="none"&&!F.fill.startsWith("url")&&oe.color.setStyle(F.fill,Fa),x(oe,Ue),U.push(oe);let P=Object.assign({},F);P.strokeWidth=F.strokeWidth*O(Ue),oe.userData={node:z,style:P,transform:Ue.clone(),gradients:G}}let de=z.childNodes;for(let P=0;P<de.length;P++){let Z=de[P];X&&Z.nodeName!=="style"&&Z.nodeName!=="defs"||n(Z,F)}N&&(H.pop(),H.length>0?Ue.copy(H[H.length-1]):Ue.identity())}function s(z){let F=new Cn,N=new fe,X=new fe,oe=new fe,de=!0,P=!1,Z=z.getAttribute("d");if(Z===""||Z==="none")return null;let k=Z.match(/[a-df-z][^a-df-z]*/ig);for(let Q=0,ne=k.length;Q<ne;Q++){let le=k[Q],xe=le.charAt(0),_e=le.slice(1).trim();de===!0&&(P=!0,de=!1);let J;switch(xe){case"M":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S+=2)N.x=J[S+0],N.y=J[S+1],X.x=N.x,X.y=N.y,S===0?F.moveTo(N.x,N.y):F.lineTo(N.x,N.y),S===0&&oe.copy(N);break;case"H":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S++)N.x=J[S],X.x=N.x,X.y=N.y,F.lineTo(N.x,N.y),S===0&&P===!0&&oe.copy(N);break;case"V":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S++)N.y=J[S],X.x=N.x,X.y=N.y,F.lineTo(N.x,N.y),S===0&&P===!0&&oe.copy(N);break;case"L":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S+=2)N.x=J[S+0],N.y=J[S+1],X.x=N.x,X.y=N.y,F.lineTo(N.x,N.y),S===0&&P===!0&&oe.copy(N);break;case"C":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S+=6)F.bezierCurveTo(J[S+0],J[S+1],J[S+2],J[S+3],J[S+4],J[S+5]),X.x=J[S+2],X.y=J[S+3],N.x=J[S+4],N.y=J[S+5],S===0&&P===!0&&oe.copy(N);break;case"S":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S+=4)F.bezierCurveTo(g(N.x,X.x),g(N.y,X.y),J[S+0],J[S+1],J[S+2],J[S+3]),X.x=J[S+0],X.y=J[S+1],N.x=J[S+2],N.y=J[S+3],S===0&&P===!0&&oe.copy(N);break;case"Q":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S+=4)F.quadraticCurveTo(J[S+0],J[S+1],J[S+2],J[S+3]),X.x=J[S+0],X.y=J[S+1],N.x=J[S+2],N.y=J[S+3],S===0&&P===!0&&oe.copy(N);break;case"T":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S+=2){let Fe=g(N.x,X.x),L=g(N.y,X.y);F.quadraticCurveTo(Fe,L,J[S+0],J[S+1]),X.x=Fe,X.y=L,N.x=J[S+0],N.y=J[S+1],S===0&&P===!0&&oe.copy(N)}break;case"A":J=p(_e,[3,4],7);for(let S=0,Pe=J.length;S<Pe;S+=7){if(J[S+5]==N.x&&J[S+6]==N.y)continue;let Fe=N.clone();N.x=J[S+5],N.y=J[S+6],X.x=N.x,X.y=N.y,a(F,J[S],J[S+1],J[S+2],J[S+3],J[S+4],Fe,N),S===0&&P===!0&&oe.copy(N)}break;case"m":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S+=2)N.x+=J[S+0],N.y+=J[S+1],X.x=N.x,X.y=N.y,S===0?F.moveTo(N.x,N.y):F.lineTo(N.x,N.y),S===0&&oe.copy(N);break;case"h":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S++)N.x+=J[S],X.x=N.x,X.y=N.y,F.lineTo(N.x,N.y),S===0&&P===!0&&oe.copy(N);break;case"v":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S++)N.y+=J[S],X.x=N.x,X.y=N.y,F.lineTo(N.x,N.y),S===0&&P===!0&&oe.copy(N);break;case"l":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S+=2)N.x+=J[S+0],N.y+=J[S+1],X.x=N.x,X.y=N.y,F.lineTo(N.x,N.y),S===0&&P===!0&&oe.copy(N);break;case"c":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S+=6)F.bezierCurveTo(N.x+J[S+0],N.y+J[S+1],N.x+J[S+2],N.y+J[S+3],N.x+J[S+4],N.y+J[S+5]),X.x=N.x+J[S+2],X.y=N.y+J[S+3],N.x+=J[S+4],N.y+=J[S+5],S===0&&P===!0&&oe.copy(N);break;case"s":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S+=4)F.bezierCurveTo(g(N.x,X.x),g(N.y,X.y),N.x+J[S+0],N.y+J[S+1],N.x+J[S+2],N.y+J[S+3]),X.x=N.x+J[S+0],X.y=N.y+J[S+1],N.x+=J[S+2],N.y+=J[S+3],S===0&&P===!0&&oe.copy(N);break;case"q":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S+=4)F.quadraticCurveTo(N.x+J[S+0],N.y+J[S+1],N.x+J[S+2],N.y+J[S+3]),X.x=N.x+J[S+0],X.y=N.y+J[S+1],N.x+=J[S+2],N.y+=J[S+3],S===0&&P===!0&&oe.copy(N);break;case"t":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S+=2){let Fe=g(N.x,X.x),L=g(N.y,X.y);F.quadraticCurveTo(Fe,L,N.x+J[S+0],N.y+J[S+1]),X.x=Fe,X.y=L,N.x=N.x+J[S+0],N.y=N.y+J[S+1],S===0&&P===!0&&oe.copy(N)}break;case"a":J=p(_e,[3,4],7);for(let S=0,Pe=J.length;S<Pe;S+=7){if(J[S+5]==0&&J[S+6]==0)continue;let Fe=N.clone();N.x+=J[S+5],N.y+=J[S+6],X.x=N.x,X.y=N.y,a(F,J[S],J[S+1],J[S+2],J[S+3],J[S+4],Fe,N),S===0&&P===!0&&oe.copy(N)}break;case"Z":case"z":F.currentPath.autoClose=!0,F.currentPath.curves.length>0&&(N.copy(oe),F.currentPath.currentPoint.copy(N),de=!0);break;default:console.warn(le)}P=!1}return F}function r(z){if(!(!z.sheet||!z.sheet.cssRules||!z.sheet.cssRules.length))for(let F=0;F<z.sheet.cssRules.length;F++){let N=z.sheet.cssRules[F];if(N.type!==1)continue;let X=N.selectorText.split(/,/gm).filter(Boolean).map(oe=>oe.trim());for(let oe=0;oe<X.length;oe++){let de=Object.fromEntries(Object.entries(N.style).filter(([,P])=>P!==""));q[X[oe]]=Object.assign(q[X[oe]]||{},de)}}}function a(z,F,N,X,oe,de,P,Z){if(F==0||N==0){z.lineTo(Z.x,Z.y);return}X=X*Math.PI/180,F=Math.abs(F),N=Math.abs(N);let k=(P.x-Z.x)/2,Q=(P.y-Z.y)/2,ne=Math.cos(X)*k+Math.sin(X)*Q,le=-Math.sin(X)*k+Math.cos(X)*Q,xe=F*F,_e=N*N,J=ne*ne,S=le*le,Pe=J/xe+S/_e;if(Pe>1){let me=Math.sqrt(Pe);F=me*F,N=me*N,xe=F*F,_e=N*N}let Fe=xe*S+_e*J,L=(xe*_e-Fe)/Fe,v=Math.sqrt(Math.max(0,L));oe===de&&(v=-v);let $=v*F*le/N,te=-v*N*ne/F,ce=Math.cos(X)*$-Math.sin(X)*te+(P.x+Z.x)/2,Me=Math.sin(X)*$+Math.cos(X)*te+(P.y+Z.y)/2,Se=o(1,0,(ne-$)/F,(le-te)/N),he=o((ne-$)/F,(le-te)/N,(-ne-$)/F,(-le-te)/N)%(Math.PI*2);z.currentPath.absellipse(ce,Me,F,N,Se,Se+he,de===0,X)}function o(z,F,N,X){let oe=z*N+F*X,de=Math.sqrt(z*z+F*F)*Math.sqrt(N*N+X*X),P=Math.acos(Math.max(-1,Math.min(1,oe/de)));return z*X-F*N<0&&(P=-P),P}function c(z){let F=_(z.getAttribute("x")||0),N=_(z.getAttribute("y")||0),X=_(z.getAttribute("rx")||z.getAttribute("ry")||0),oe=_(z.getAttribute("ry")||z.getAttribute("rx")||0),de=_(z.getAttribute("width")),P=_(z.getAttribute("height")),Z=1-.551915024494,k=new Cn;return k.moveTo(F+X,N),k.lineTo(F+de-X,N),(X!==0||oe!==0)&&k.bezierCurveTo(F+de-X*Z,N,F+de,N+oe*Z,F+de,N+oe),k.lineTo(F+de,N+P-oe),(X!==0||oe!==0)&&k.bezierCurveTo(F+de,N+P-oe*Z,F+de-X*Z,N+P,F+de-X,N+P),k.lineTo(F+X,N+P),(X!==0||oe!==0)&&k.bezierCurveTo(F+X*Z,N+P,F,N+P-oe*Z,F,N+P-oe),k.lineTo(F,N+oe),(X!==0||oe!==0)&&k.bezierCurveTo(F,N+oe*Z,F+X*Z,N,F+X,N),k}function l(z){function F(de,P,Z){let k=_(P),Q=_(Z);oe===0?X.moveTo(k,Q):X.lineTo(k,Q),oe++}let N=/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,X=new Cn,oe=0;return z.getAttribute("points").replace(N,F),X.currentPath.autoClose=!0,X}function h(z){function F(de,P,Z){let k=_(P),Q=_(Z);oe===0?X.moveTo(k,Q):X.lineTo(k,Q),oe++}let N=/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,X=new Cn,oe=0;return z.getAttribute("points").replace(N,F),X.currentPath.autoClose=!1,X}function d(z){let F=_(z.getAttribute("cx")||0),N=_(z.getAttribute("cy")||0),X=_(z.getAttribute("r")||0),oe=new Jn;oe.absarc(F,N,X,0,Math.PI*2);let de=new Cn;return de.subPaths.push(oe),de}function u(z){let F=_(z.getAttribute("cx")||0),N=_(z.getAttribute("cy")||0),X=_(z.getAttribute("rx")||0),oe=_(z.getAttribute("ry")||0),de=new Jn;de.absellipse(F,N,X,oe,0,Math.PI*2);let P=new Cn;return P.subPaths.push(de),P}function f(z){let F=_(z.getAttribute("x1")||0),N=_(z.getAttribute("y1")||0),X=_(z.getAttribute("x2")||0),oe=_(z.getAttribute("y2")||0),de=new Cn;return de.moveTo(F,N),de.lineTo(X,oe),de.currentPath.autoClose=!1,de}function m(z){let F="http://www.w3.org/1999/xlink",N=z.querySelectorAll("linearGradient, radialGradient"),X=["x1","y1","x2","y2","cx","cy","r","fx","fy","gradientUnits","gradientTransform","spreadMethod"],oe={};for(let P of N){let Z=P.getAttribute("id");if(!Z)continue;let k={type:P.nodeName==="radialGradient"?"radialGradient":"linearGradient",attrs:{},stops:null,href:null},Q=P.getAttributeNS(F,"href")||P.getAttribute("href")||"";Q.startsWith("#")&&(k.href=Q.substring(1));for(let le of X)P.hasAttribute(le)&&(k.attrs[le]=P.getAttribute(le));let ne=P.querySelectorAll("stop");if(ne.length>0){k.stops=[];for(let le of ne){let xe=le.getAttribute("stop-color");!xe&&le.style&&(xe=le.style["stop-color"]),xe||(xe="#000");let _e=le.getAttribute("stop-opacity");(_e===null||_e==="")&&le.style&&(_e=le.style["stop-opacity"]),_e=_e===null||_e===""||_e===void 0?1:Math.max(0,Math.min(1,parseFloat(_e)));let J=Math.max(0,Math.min(1,parseFloat(le.getAttribute("offset")||"0")));k.stops.push({offset:J,color:xe,opacity:_e})}}oe[Z]=k}function de(P,Z){let k=oe[P];if(!k||Z.has(P))return k;if(Z.add(P),k.href&&oe[k.href]){let Q=de(k.href,Z);if(Q){k.stops||(k.stops=Q.stops);for(let ne in Q.attrs)ne in k.attrs||(k.attrs[ne]=Q.attrs[ne])}}return k}for(let P in oe)de(P,new Set);for(let P in oe){let le=function(xe){return typeof xe!="string"?0:xe.endsWith("%")?parseFloat(xe)/100:_(xe)},Z=oe[P],k=Z.attrs,Q=k.gradientUnits==="userSpaceOnUse"?"userSpaceOnUse":"objectBoundingBox",ne={type:Z.type,gradientUnits:Q,spreadMethod:k.spreadMethod==="reflect"||k.spreadMethod==="repeat"?k.spreadMethod:"pad",gradientTransform:null,stops:(Z.stops||[]).slice().sort((xe,_e)=>xe.offset-_e.offset)};if(k.gradientTransform&&(ne.gradientTransform=new qe,A(k.gradientTransform,ne.gradientTransform)),Z.type==="linearGradient")ne.x1=k.x1!==void 0?le(k.x1):0,ne.y1=k.y1!==void 0?le(k.y1):0,ne.x2=k.x2!==void 0?le(k.x2):Q==="objectBoundingBox"?1:0,ne.y2=k.y2!==void 0?le(k.y2):0;else{let xe=Q==="objectBoundingBox"?.5:0,_e=Q==="objectBoundingBox"?.5:0;ne.cx=k.cx!==void 0?le(k.cx):xe,ne.cy=k.cy!==void 0?le(k.cy):xe,ne.r=k.r!==void 0?le(k.r):_e,ne.fx=k.fx!==void 0?le(k.fx):ne.cx,ne.fy=k.fy!==void 0?le(k.fy):ne.cy}G[P]=ne}}function y(z,F){F=Object.assign({},F);let N={};if(z.hasAttribute("class")){let P=z.getAttribute("class").split(/\s/).filter(Boolean).map(Z=>Z.trim());for(let Z=0;Z<P.length;Z++)N=Object.assign(N,q["."+P[Z]])}z.hasAttribute("id")&&(N=Object.assign(N,q["#"+z.getAttribute("id")]));function X(P,Z,k){k===void 0&&(k=function(ne){return ne}),z.hasAttribute(P)&&(F[Z]=k(z.getAttribute(P))),N[Z]&&(F[Z]=k(N[Z])),z.style&&z.style[P]!==""&&(F[Z]=k(z.style[P]))}function oe(P){return Math.max(0,Math.min(1,_(P)))}function de(P){return Math.max(0,_(P))}return X("fill","fill"),X("fill-opacity","fillOpacity",oe),X("fill-rule","fillRule"),X("opacity","opacity",oe),X("stroke","stroke"),X("stroke-opacity","strokeOpacity",oe),X("stroke-width","strokeWidth",de),X("stroke-linejoin","strokeLineJoin"),X("stroke-linecap","strokeLineCap"),X("stroke-miterlimit","strokeMiterLimit",de),X("visibility","visibility"),F}function g(z,F){return z-(F-z)}function p(z,F,N){if(typeof z!="string")throw new TypeError("Invalid input: "+typeof z);let X={SEPARATOR:/[ \t\r\n\,.\-+]/,WHITESPACE:/[ \t\r\n]/,DIGIT:/[\d]/,SIGN:/[-+]/,POINT:/\./,COMMA:/,/,EXP:/e/i,FLAGS:/[01]/},oe=0,de=1,P=2,Z=3,k=oe,Q=!0,ne="",le="",xe=[];function _e(Fe,L,v){let $=new SyntaxError('Unexpected character "'+Fe+'" at index '+L+".");throw $.partial=v,$}function J(){ne!==""&&(le===""?xe.push(Number(ne)):xe.push(Number(ne)*Math.pow(10,Number(le)))),ne="",le=""}let S,Pe=z.length;for(let Fe=0;Fe<Pe;Fe++){if(S=z[Fe],Array.isArray(F)&&F.includes(xe.length%N)&&X.FLAGS.test(S)){k=de,ne=S,J();continue}if(k===oe){if(X.WHITESPACE.test(S))continue;if(X.DIGIT.test(S)||X.SIGN.test(S)){k=de,ne=S;continue}if(X.POINT.test(S)){k=P,ne=S;continue}X.COMMA.test(S)&&(Q&&_e(S,Fe,xe),Q=!0)}if(k===de){if(X.DIGIT.test(S)){ne+=S;continue}if(X.POINT.test(S)){ne+=S,k=P;continue}if(X.EXP.test(S)){k=Z;continue}X.SIGN.test(S)&&ne.length===1&&X.SIGN.test(ne[0])&&_e(S,Fe,xe)}if(k===P){if(X.DIGIT.test(S)){ne+=S;continue}if(X.EXP.test(S)){k=Z;continue}X.POINT.test(S)&&ne[ne.length-1]==="."&&_e(S,Fe,xe)}if(k===Z){if(X.DIGIT.test(S)){le+=S;continue}if(X.SIGN.test(S)){if(le===""){le+=S;continue}le.length===1&&X.SIGN.test(le)&&_e(S,Fe,xe)}}X.WHITESPACE.test(S)?(J(),k=oe,Q=!1):X.COMMA.test(S)?(J(),k=oe,Q=!0):X.SIGN.test(S)?(J(),k=de,ne=S):X.POINT.test(S)?(J(),k=P,ne=S):_e(S,Fe,xe)}return J(),xe}let E=["mm","cm","in","pt","pc","px"],b={mm:{mm:1,cm:.1,in:1/25.4,pt:72/25.4,pc:6/25.4,px:-1},cm:{mm:10,cm:1,in:1/2.54,pt:72/2.54,pc:6/2.54,px:-1},in:{mm:25.4,cm:2.54,in:1,pt:72,pc:6,px:-1},pt:{mm:25.4/72,cm:2.54/72,in:1/72,pt:1,pc:6/72,px:-1},pc:{mm:25.4/6,cm:2.54/6,in:1/6,pt:72/6,pc:1,px:-1},px:{px:1}};function _(z){let F="px";if(typeof z=="string"||z instanceof String)for(let X=0,oe=E.length;X<oe;X++){let de=E[X];if(z.endsWith(de)){F=de,z=z.substring(0,z.length-de.length);break}}let N;return F==="px"&&t.defaultUnit!=="px"?N=b.in[t.defaultUnit]/t.defaultDPI:(N=b[F][t.defaultUnit],N<0&&(N=b[F].in*t.defaultDPI)),N*parseFloat(z)}function M(z){if(!(z.hasAttribute("transform")||z.nodeName==="use"&&(z.hasAttribute("x")||z.hasAttribute("y"))))return null;let F=T(z);return H.length>0&&F.premultiply(H[H.length-1]),Ue.copy(F),H.push(F),F}function T(z){let F=new qe;if(z.nodeName==="use"&&(z.hasAttribute("x")||z.hasAttribute("y"))){let N=_(z.getAttribute("x")||0),X=_(z.getAttribute("y")||0);F.makeTranslation(N,X)}return z.hasAttribute("transform")&&A(z.getAttribute("transform"),F),F}function A(z,F){let N=j,X=z.split(")");for(let oe=X.length-1;oe>=0;oe--){let de=X[oe].trim();if(de==="")continue;let P=de.indexOf("("),Z=de.length;if(P>0&&P<Z){let k=de.slice(0,P),Q=p(de.slice(P+1));switch(N.identity(),k){case"translate":if(Q.length>=1){let ne=Q[0],le=0;Q.length>=2&&(le=Q[1]),N.makeTranslation(ne,le)}break;case"rotate":if(Q.length>=1){let ne=0,le=0,xe=0;ne=Q[0]*Math.PI/180,Q.length>=3&&(le=Q[1],xe=Q[2]),ie.makeTranslation(-le,-xe),ue.makeRotation(ne),pe.multiplyMatrices(ue,ie),ie.makeTranslation(le,xe),N.multiplyMatrices(ie,pe)}break;case"scale":if(Q.length>=1){let ne=Q[0],le=ne;Q.length>=2&&(le=Q[1]),N.makeScale(ne,le)}break;case"skewX":Q.length===1&&N.set(1,Math.tan(Q[0]*Math.PI/180),0,0,1,0,0,0,1);break;case"skewY":Q.length===1&&N.set(1,0,0,Math.tan(Q[0]*Math.PI/180),1,0,0,0,1);break;case"matrix":Q.length===6&&N.set(Q[0],Q[2],Q[4],Q[1],Q[3],Q[5],0,0,1);break}F.premultiply(N)}}return F}function x(z,F){function N(P){He.set(P.x,P.y,1).applyMatrix3(F),P.set(He.x,He.y)}function X(P){let Z=P.xRadius,k=P.yRadius,Q=Math.cos(P.aRotation),ne=Math.sin(P.aRotation),le=new V(Z*Q,Z*ne,0),xe=new V(-k*ne,k*Q,0),_e=le.applyMatrix3(F),J=xe.applyMatrix3(F),S=j.set(_e.x,J.x,0,_e.y,J.y,0,0,0,1),Pe=ie.copy(S).invert(),v=ue.copy(Pe).transpose().multiply(Pe).elements,$=B(v[0],v[1],v[4]),te=Math.sqrt($.rt1),ce=Math.sqrt($.rt2);if(P.xRadius=1/te,P.yRadius=1/ce,P.aRotation=Math.atan2($.sn,$.cs),!((P.aEndAngle-P.aStartAngle)%(2*Math.PI)<Number.EPSILON)){let Se=ie.set(te,0,0,0,ce,0,0,0,1),he=ue.set($.cs,$.sn,0,-$.sn,$.cs,0,0,0,1),me=Se.multiply(he).multiply(S),be=Be=>{let{x:we,y:Ee}=new V(Math.cos(Be),Math.sin(Be),0).applyMatrix3(me);return Math.atan2(Ee,we)};P.aStartAngle=be(P.aStartAngle),P.aEndAngle=be(P.aEndAngle),R(F)&&(P.aClockwise=!P.aClockwise)}}function oe(P){let Z=w(F),k=I(F);P.xRadius*=Z,P.yRadius*=k;let Q=Z>Number.EPSILON?Math.atan2(F.elements[1],F.elements[0]):Math.atan2(-F.elements[3],F.elements[4]);P.aRotation+=Q,R(F)&&(P.aStartAngle*=-1,P.aEndAngle*=-1,P.aClockwise=!P.aClockwise)}let de=z.subPaths;for(let P=0,Z=de.length;P<Z;P++){let Q=de[P].curves;for(let ne=0;ne<Q.length;ne++){let le=Q[ne];le.isLineCurve?(N(le.v1),N(le.v2)):le.isCubicBezierCurve?(N(le.v0),N(le.v1),N(le.v2),N(le.v3)):le.isQuadraticBezierCurve?(N(le.v0),N(le.v1),N(le.v2)):le.isEllipseCurve&&(ve.set(le.aX,le.aY),N(ve),le.aX=ve.x,le.aY=ve.y,D(F)?X(le):oe(le))}}}function R(z){let F=z.elements;return F[0]*F[4]-F[1]*F[3]<0}function D(z){let F=z.elements,N=F[0]*F[3]+F[1]*F[4];if(N===0)return!1;let X=w(z),oe=I(z);return Math.abs(N/(X*oe))>Number.EPSILON}function w(z){let F=z.elements;return Math.sqrt(F[0]*F[0]+F[1]*F[1])}function I(z){let F=z.elements;return Math.sqrt(F[3]*F[3]+F[4]*F[4])}function O(z){let F=z.elements,N=F[0]*F[4]-F[1]*F[3];return Math.sqrt(Math.abs(N))}function B(z,F,N){let X,oe,de,P,Z,k=z+N,Q=z-N,ne=Math.sqrt(Q*Q+4*F*F);return k>0?(X=.5*(k+ne),Z=1/X,oe=z*Z*N-F*Z*F):k<0?oe=.5*(k-ne):(X=.5*ne,oe=-.5*ne),Q>0?de=Q+ne:de=Q-ne,Math.abs(de)>2*Math.abs(F)?(Z=-2*F/de,P=1/Math.sqrt(1+Z*Z),de=Z*P):Math.abs(F)===0?(de=1,P=0):(Z=-.5*de/F,de=1/Math.sqrt(1+Z*Z),P=Z*de),Q>0&&(Z=de,de=-P,P=Z),{rt1:X,rt2:oe,cs:de,sn:P}}let U=[],q={},G={},H=[],j=new qe,ie=new qe,ue=new qe,pe=new qe,ve=new fe,He=new V,Ue=new qe,ee=new DOMParser().parseFromString(e,"image/svg+xml");return m(ee),n(ee.documentElement,{fill:"#000",fillOpacity:1,strokeOpacity:1,strokeWidth:1,strokeLineJoin:"miter",strokeLineCap:"butt",strokeMiterLimit:4}),{paths:U,gradients:G,xml:ee.documentElement}}static createFillMaterial(e){let t=e.userData.style;if(t.fill===void 0||t.fill==="none")return null;let n=e.color,s=null,r=Cp.exec(t.fill);if(r){let o=e.userData.gradients&&e.userData.gradients[r[1]];s=a1(o,e)}let a=new Xt({opacity:t.fillOpacity*(t.opacity||1),transparent:!0,side:jt,depthWrite:!1});return s!==null?a.map=s:a.color=n,a}static createStrokeMaterial(e){let t=e.userData.style;return t.stroke===void 0||t.stroke==="none"?null:(Cp.test(t.stroke)&&console.warn("THREE.SVGLoader: Gradient strokes are not supported."),new Xt({color:new Ve().setStyle(t.stroke,Fa),opacity:t.strokeOpacity*(t.opacity||1),transparent:!0,side:jt,depthWrite:!1}))}static createShapes(e){return console.warn("SVGLoader: createShapes() is deprecated. Use shapePath.toShapes() instead."),e.toShapes()}static getStrokeStyle(e,t,n,s,r){return e=e!==void 0?e:1,t=t!==void 0?t:"#000",n=n!==void 0?n:"miter",s=s!==void 0?s:"butt",r=r!==void 0?r:4,{strokeColor:t,strokeWidth:e,strokeLineJoin:n,strokeLineCap:s,strokeMiterLimit:r}}static pointsToStroke(e,t,n,s){let r=[],a=[],o=[];if(i.pointsToStrokeWithBuffers(e,t,n,s,r,a,o)===0)return null;let c=new At;return c.setAttribute("position",new yt(r,3)),c.setAttribute("normal",new yt(a,3)),c.setAttribute("uv",new yt(o,2)),c}static pointsToStrokeWithBuffers(e,t,n,s,r,a,o,c){let l=new fe,h=new fe,d=new fe,u=new fe,f=new fe,m=new fe,y=new fe,g=new fe,p=new fe,E=new fe,b=new fe,_=new fe,M=new fe,T=new fe,A=new fe,x=new fe,R=new fe;n=n!==void 0?n:12,s=s!==void 0?s:.001,c=c!==void 0?c:0,e=de(e);let D=e.length;if(D<2)return 0;let w=e[0].equals(e[D-1]),I,O=e[0],B,U=t.strokeWidth/2,q=1/(D-1),G=0,H,j,ie,ue,pe=!1,ve=0,He=c*3,Ue=c*2;ee(e[0],e[1],l).multiplyScalar(U),g.copy(e[0]).sub(l),p.copy(e[0]).add(l),E.copy(g),b.copy(p);for(let P=1;P<D;P++){I=e[P],P===D-1?w?B=e[1]:B=void 0:B=e[P+1];let Z=l;if(ee(O,I,Z),d.copy(Z).multiplyScalar(U),_.copy(I).sub(d),M.copy(I).add(d),H=G+q,j=!1,B!==void 0){ee(I,B,h),d.copy(h).multiplyScalar(U),T.copy(I).sub(d),A.copy(I).add(d),ie=!0,d.subVectors(B,O),Z.dot(d)<0&&(ie=!1),P===1&&(pe=ie),d.subVectors(B,I),d.normalize();let k=Math.abs(Z.dot(d));if(k>Number.EPSILON){let Q=U/k;d.multiplyScalar(-Q),u.subVectors(I,O),f.copy(u).setLength(Q).add(d),x.copy(f).negate();let ne=f.length(),le=u.length();u.divideScalar(le),m.subVectors(B,I);let xe=m.length();if(m.divideScalar(xe),u.dot(x)<le&&m.dot(x)<xe&&(j=!0),R.copy(f).add(I),x.add(I),j){let _e=ie?p:g,J=(R.x-_e.x)*(x.y-_e.y)-(R.y-_e.y)*(x.x-_e.x);(ie&&J<0||!ie&&J>0)&&x.copy(_e)}switch(ue=!1,j?ie?(A.copy(x),M.copy(x)):(T.copy(x),_.copy(x)):F(),t.strokeLineJoin){case"bevel":N(ie,j,H);break;case"round":X(ie,j),ie?z(I,_,T,H,0):z(I,A,M,H,1);break;default:let _e=U*t.strokeMiterLimit/ne;if(_e<1)if(t.strokeLineJoin!=="miter-clip"){N(ie,j,H);break}else X(ie,j),ie?(m.subVectors(R,_).multiplyScalar(_e).add(_),y.subVectors(R,T).multiplyScalar(_e).add(T),W(_,H,0),W(m,H,0),W(I,H,.5),W(I,H,.5),W(m,H,0),W(y,H,0),W(I,H,.5),W(y,H,0),W(T,H,0)):(m.subVectors(R,M).multiplyScalar(_e).add(M),y.subVectors(R,A).multiplyScalar(_e).add(A),W(M,H,1),W(m,H,1),W(I,H,.5),W(I,H,.5),W(m,H,1),W(y,H,1),W(I,H,.5),W(y,H,1),W(A,H,1));else j?(ie?(W(p,G,1),W(g,G,0),W(R,H,0),W(p,G,1),W(R,H,0),W(x,H,1)):(W(p,G,1),W(g,G,0),W(R,H,1),W(g,G,0),W(x,H,0),W(R,H,1)),ie?T.copy(R):A.copy(R)):ie?(W(_,H,0),W(R,H,0),W(I,H,.5),W(I,H,.5),W(R,H,0),W(T,H,0)):(W(M,H,1),W(R,H,1),W(I,H,.5),W(I,H,.5),W(R,H,1),W(A,H,1)),ue=!0;break}}else F()}else F();!w&&P===D-1&&oe(e[0],E,b,ie,!0,G),G=H,O=I,g.copy(T),p.copy(A)}if(!w)oe(I,_,M,ie,!1,H);else if(j&&r){let P=R,Z=x;pe!==ie&&(P=x,Z=R),ie?(ue||pe)&&(Z.toArray(r,0),Z.toArray(r,9),ue&&P.toArray(r,3)):(ue||!pe)&&(Z.toArray(r,3),Z.toArray(r,9),ue&&P.toArray(r,0))}if(r){let P=[new fe,new fe,new fe],Z=c*3;for(let k=Z;k<He;k+=9)P[0].set(r[k],r[k+1]),P[1].set(r[k+3],r[k+4]),P[2].set(r[k+6],r[k+7]),Gn.area(P)<0&&(r[k+3]=P[0].x,r[k+4]=P[0].y)}return ve;function ee(P,Z,k){return k.subVectors(Z,P),k.set(-k.y,k.x).normalize()}function W(P,Z,k){r&&(r[He]=P.x,r[He+1]=P.y,r[He+2]=0,a&&(a[He]=0,a[He+1]=0,a[He+2]=1),He+=3,o&&(o[Ue]=Z,o[Ue+1]=k,Ue+=2)),ve+=3}function z(P,Z,k,Q,ne){l.copy(Z).sub(P).normalize(),h.copy(k).sub(P).normalize();let le=Math.PI,xe=l.dot(h);Math.abs(xe)<1&&(le=Math.abs(Math.acos(xe))),le/=n,d.copy(Z);for(let _e=0,J=n-1;_e<J;_e++)u.copy(d).rotateAround(P,le),W(d,Q,ne),W(u,Q,ne),W(P,Q,.5),d.copy(u);W(d,Q,ne),W(k,Q,ne),W(P,Q,.5)}function F(){W(p,G,1),W(g,G,0),W(_,H,0),W(p,G,1),W(_,H,0),W(M,H,1)}function N(P,Z,k){Z?P?(W(p,G,1),W(g,G,0),W(_,H,0),W(p,G,1),W(_,H,0),W(x,H,1),W(_,k,0),W(T,k,0),W(x,k,.5)):(W(p,G,1),W(g,G,0),W(M,H,1),W(g,G,0),W(x,H,0),W(M,H,1),W(M,k,1),W(x,k,0),W(A,k,1)):P?(W(_,k,0),W(T,k,0),W(I,k,.5)):(W(M,k,1),W(A,k,0),W(I,k,.5))}function X(P,Z){Z&&(P?(W(p,G,1),W(g,G,0),W(_,H,0),W(p,G,1),W(_,H,0),W(x,H,1),W(_,G,0),W(I,H,.5),W(x,H,1),W(I,H,.5),W(T,G,0),W(x,H,1)):(W(p,G,1),W(g,G,0),W(M,H,1),W(g,G,0),W(x,H,0),W(M,H,1),W(M,G,1),W(x,H,0),W(I,H,.5),W(I,H,.5),W(x,H,0),W(A,G,1)))}function oe(P,Z,k,Q,ne,le){switch(t.strokeLineCap){case"round":ne?z(P,k,Z,le,.5):z(P,Z,k,le,.5);break;case"square":if(ne)l.subVectors(Z,P),h.set(l.y,-l.x),d.addVectors(l,h).add(P),u.subVectors(h,l).add(P),Q?(d.toArray(r,3),u.toArray(r,0),u.toArray(r,9)):(d.toArray(r,3),o[7]===1?u.toArray(r,9):d.toArray(r,9),u.toArray(r,0));else{l.subVectors(k,P),h.set(l.y,-l.x),d.addVectors(l,h).add(P),u.subVectors(h,l).add(P);let xe=r.length;Q?(d.toArray(r,xe-3),u.toArray(r,xe-6),u.toArray(r,xe-12)):(u.toArray(r,xe-6),d.toArray(r,xe-3),u.toArray(r,xe-12))}break;default:break}}function de(P){let Z=!1;for(let Q=1,ne=P.length-1;Q<ne;Q++)if(P[Q].distanceTo(P[Q+1])<s){Z=!0;break}if(!Z)return P;let k=[];k.push(P[0]);for(let Q=1,ne=P.length-1;Q<ne;Q++)P[Q].distanceTo(P[Q+1])>=s&&k.push(P[Q]);return k.push(P[P.length-1]),k}}},Cp=/^\s*url\(\s*(?:["']\s*)?#([^)'"\s]+)(?:\s*["'])?\s*\)\s*$/;function a1(i,e,t=256){if(!i||!Array.isArray(i.stops)||i.stops.length===0)return null;let n=e.userData.transform,s=i.gradientUnits==="objectBoundingBox",r=null;if(s&&(r=o1(e,n),r===null))return null;function a(d,u,f){f.set(d,u,1),i.gradientTransform&&f.applyMatrix3(i.gradientTransform),s&&f.set(r.minX+f.x*r.width,r.minY+f.y*r.height,1),n&&f.applyMatrix3(n)}let o=document.createElement("canvas"),c;if(i.type==="linearGradient"){o.width=t,o.height=1;let d=o.getContext("2d"),u=d.createLinearGradient(0,0,t,0);Ip(u,i.stops),d.fillStyle=u,d.fillRect(0,0,t,1);let f=new V,m=new V;a(i.x1,i.y1,f),a(i.x2,i.y2,m);let y=m.x-f.x,g=m.y-f.y,p=y*y+g*g||1e-20,E=y/p,b=g/p,_=-(E*f.x+b*f.y);c=new qe().set(E,b,_,0,0,.5,0,0,1)}else{let d=i.cx,u=i.cy,f=i.fx,m=i.fy,y=i.r;if(i.gradientTransform){let x=new V;x.set(d,u,1).applyMatrix3(i.gradientTransform),d=x.x,u=x.y,x.set(f,m,1).applyMatrix3(i.gradientTransform),f=x.x,m=x.y}if(s&&(d=r.minX+d*r.width,u=r.minY+u*r.height,f=r.minX+f*r.width,m=r.minY+m*r.height,y=y*Math.sqrt((r.width*r.width+r.height*r.height)/2)),y<=0)return null;o.width=t,o.height=t;let g=o.getContext("2d"),p=d-y,E=u-y,b=2*y,_=t/b;g.setTransform(_,0,0,_,-p*_,-E*_);let M=g.createRadialGradient(f,m,0,d,u,y);Ip(M,i.stops),g.fillStyle=M,g.fillRect(p,E,b,b);let T=n?n.clone().invert():new qe;c=new qe().set(1/b,0,-p/b,0,1/b,-E/b,0,0,1).multiply(T)}let l=new hn(o);l.colorSpace=Fa,l.flipY=!1,l.matrixAutoUpdate=!1,l.matrix=c;let h=i.spreadMethod==="reflect"?Bi:i.spreadMethod==="repeat"?xn:tn;return l.wrapS=h,l.wrapT=h,l}function o1(i,e){let t=e?e.clone().invert():null,n=new fe,s=new cr;for(let r of i.subPaths)for(let a of r.getPoints())n.copy(a),t&&n.applyMatrix3(t),s.expandByPoint(n);return s.isEmpty()?null:{minX:s.min.x,minY:s.min.y,width:s.max.x-s.min.x,height:s.max.y-s.min.y}}function Ip(i,e){let t=new Ve;for(let n of e){let s=n.color;if(n.opacity<1){t.setStyle(n.color,Fa);let r=/rgb\(([^)]+)\)/.exec(t.getStyle(Fa));r&&(s=`rgba(${r[1]},${n.opacity})`)}i.addColorStop(Math.max(0,Math.min(1,n.offset)),s)}}var Pp={POSITION:["byte","byte normalized","unsigned byte","unsigned byte normalized","short","short normalized","unsigned short","unsigned short normalized"],NORMAL:["byte normalized","short normalized"],TANGENT:["byte normalized","short normalized"],TEXCOORD:["byte","byte normalized","unsigned byte","short","short normalized","unsigned short"]},Ji=class{constructor(){this.textureUtils=null,this.pluginCallbacks=[],this.register(function(e){return new vu(e)}),this.register(function(e){return new Mu(e)}),this.register(function(e){return new Tu(e)}),this.register(function(e){return new wu(e)}),this.register(function(e){return new Au(e)}),this.register(function(e){return new Ru(e)}),this.register(function(e){return new Su(e)}),this.register(function(e){return new bu(e)}),this.register(function(e){return new Eu(e)}),this.register(function(e){return new Cu(e)}),this.register(function(e){return new Iu(e)}),this.register(function(e){return new Pu(e)}),this.register(function(e){return new Lu(e)}),this.register(function(e){return new Nu(e)})}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}setTextureUtils(e){return this.textureUtils=e,this}parse(e,t,n,s){let r=new yu,a=[];for(let o=0,c=this.pluginCallbacks.length;o<c;o++)a.push(this.pluginCallbacks[o](r));r.setPlugins(a),r.setTextureUtils(this.textureUtils),r.writeAsync(e,t,s).catch(n)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,s,r,t)})}},nt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,INT:5124,UNSIGNED_INT:5125,FLOAT:5126,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,REPEAT:10497},gu="KHR_mesh_quantization",pn={};pn[wt]=nt.NEAREST;pn[rc]=nt.NEAREST_MIPMAP_NEAREST;pn[ps]=nt.NEAREST_MIPMAP_LINEAR;pn[St]=nt.LINEAR;pn[hr]=nt.LINEAR_MIPMAP_NEAREST;pn[Kn]=nt.LINEAR_MIPMAP_LINEAR;pn[tn]=nt.CLAMP_TO_EDGE;pn[xn]=nt.REPEAT;pn[Bi]=nt.MIRRORED_REPEAT;var Lp={scale:"scale",position:"translation",quaternion:"rotation",morphTargetInfluences:"weights"},c1=new Ve,Np=12,l1=1179937895,h1=2,Dp=8,u1=1313821514,d1=5130562;function yi(i,e){return i.length===e.length&&i.every(function(t,n){return t===e[n]})}function f1(i){return new TextEncoder().encode(i).buffer}function p1(i){return yi(i.elements,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}function m1(i,e,t){let n={min:new Array(i.itemSize).fill(Number.POSITIVE_INFINITY),max:new Array(i.itemSize).fill(Number.NEGATIVE_INFINITY)};for(let s=e;s<e+t;s++)for(let r=0;r<i.itemSize;r++){let a;i.itemSize>4?a=i.array[s*i.itemSize+r]:(r===0?a=i.getX(s):r===1?a=i.getY(s):r===2?a=i.getZ(s):r===3&&(a=i.getW(s)),i.normalized===!0&&(a=ot.normalize(a,i.array))),n.min[r]=Math.min(n.min[r],a),n.max[r]=Math.max(n.max[r],a)}return n}function Up(i){return Math.ceil(i/4)*4}function xu(i,e=0){let t=Up(i.byteLength);if(t!==i.byteLength){let n=new Uint8Array(t);if(n.set(new Uint8Array(i)),e!==0)for(let s=i.byteLength;s<t;s++)n[s]=e;return n.buffer}return i}function _u(){return typeof document>"u"&&typeof OffscreenCanvas<"u"?new OffscreenCanvas(1,1):document.createElement("canvas")}function g1(i,e){if(typeof OffscreenCanvas<"u"&&i instanceof OffscreenCanvas){let t;return e==="image/jpeg"?t=.92:e==="image/webp"&&(t=.8),i.convertToBlob({type:e,quality:t})}else return new Promise(t=>i.toBlob(t,e))}var yu=class{constructor(){this.plugins=[],this.options={},this.pending=[],this.buffers=[],this.byteOffset=0,this.buffers=[],this.nodeMap=new Map,this.skins=[],this.extensionsUsed={},this.extensionsRequired={},this.uids=new Map,this.uid=0,this.json={asset:{version:"2.0",generator:"THREE.GLTFExporter r185"}},this.cache={meshes:new Map,attributes:new Map,attributesNormalized:new Map,materials:new Map,textures:new Map,images:new Map},this.textureUtils=null}setPlugins(e){this.plugins=e}setTextureUtils(e){this.textureUtils=e}async writeAsync(e,t,n={}){this.options=Object.assign({binary:!1,trs:!1,onlyVisible:!0,maxTextureSize:1/0,animations:[],includeCustomExtensions:!1},n),this.options.animations.length>0&&(this.options.trs=!0),await this.processInputAsync(e),await Promise.all(this.pending);let s=this,r=s.buffers,a=s.json;n=s.options;let o=s.extensionsUsed,c=s.extensionsRequired,l=new Blob(r,{type:"application/octet-stream"}),h=Object.keys(o),d=Object.keys(c);if(h.length>0&&(a.extensionsUsed=h),d.length>0&&(a.extensionsRequired=d),a.buffers&&a.buffers.length>0&&(a.buffers[0].byteLength=l.size),n.binary===!0){let u=new FileReader;u.readAsArrayBuffer(l),u.onloadend=function(){let f=xu(u.result),m=new DataView(new ArrayBuffer(Dp));m.setUint32(0,f.byteLength,!0),m.setUint32(4,d1,!0);let y=xu(f1(JSON.stringify(a)),32),g=new DataView(new ArrayBuffer(Dp));g.setUint32(0,y.byteLength,!0),g.setUint32(4,u1,!0);let p=new ArrayBuffer(Np),E=new DataView(p);E.setUint32(0,l1,!0),E.setUint32(4,h1,!0);let b=Np+g.byteLength+y.byteLength+m.byteLength+f.byteLength;E.setUint32(8,b,!0);let _=new Blob([p,g,y,m,f],{type:"application/octet-stream"}),M=new FileReader;M.readAsArrayBuffer(_),M.onloadend=function(){t(M.result)}}}else if(a.buffers&&a.buffers.length>0){let u=new FileReader;u.readAsDataURL(l),u.onloadend=function(){let f=u.result;a.buffers[0].uri=f,t(a)}}else t(a)}serializeUserData(e,t){if(Object.keys(e.userData).length===0)return;let n=this.options,s=this.extensionsUsed;try{let r=JSON.parse(JSON.stringify(e.userData));if(n.includeCustomExtensions&&r.gltfExtensions){t.extensions===void 0&&(t.extensions={});for(let a in r.gltfExtensions)t.extensions[a]=r.gltfExtensions[a],s[a]=!0;delete r.gltfExtensions}Object.keys(r).length>0&&(t.extras=r)}catch(r){console.warn("THREE.GLTFExporter: userData of '"+e.name+"' won't be serialized because of JSON.stringify error - "+r.message)}}getUID(e,t=!1){if(this.uids.has(e)===!1){let s=new Map;s.set(!0,this.uid++),s.set(!1,this.uid++),this.uids.set(e,s)}return this.uids.get(e).get(t)}isNormalizedNormalAttribute(e){if(this.cache.attributesNormalized.has(e))return!1;let n=new V;for(let s=0,r=e.count;s<r;s++)if(Math.abs(n.fromBufferAttribute(e,s).length()-1)>5e-4)return!1;return!0}createNormalizedNormalAttribute(e){let t=this.cache;if(t.attributesNormalized.has(e))return t.attributesNormalized.get(e);let n=e.clone(),s=new V;for(let r=0,a=n.count;r<a;r++)s.fromBufferAttribute(n,r),s.x===0&&s.y===0&&s.z===0?s.setX(1):s.normalize(),n.setXYZ(r,s.x,s.y,s.z);return t.attributesNormalized.set(e,n),n}applyTextureTransform(e,t){let n=!1,s={};(t.offset.x!==0||t.offset.y!==0)&&(s.offset=t.offset.toArray(),n=!0),t.rotation!==0&&(s.rotation=t.rotation,n=!0),(t.repeat.x!==1||t.repeat.y!==1)&&(s.scale=t.repeat.toArray(),n=!0),n&&(e.extensions=e.extensions||{},e.extensions.KHR_texture_transform=s,this.extensionsUsed.KHR_texture_transform=!0)}async buildMetalRoughTextureAsync(e,t){if(e===t)return e;function n(f){return f.colorSpace===vt?function(y){return y<.04045?y*.0773993808:Math.pow(y*.9478672986+.0521327014,2.4)}:function(y){return y}}e instanceof ki&&(e=await this.decompressTextureAsync(e)),t instanceof ki&&(t=await this.decompressTextureAsync(t));let s=e?e.image:null,r=t?t.image:null,a=Math.max(s?s.width:0,r?r.width:0),o=Math.max(s?s.height:0,r?r.height:0),c=_u();c.width=a,c.height=o;let l=c.getContext("2d",{willReadFrequently:!0});l.fillStyle="#00ffff",l.fillRect(0,0,a,o);let h=l.getImageData(0,0,a,o);if(s){l.drawImage(s,0,0,a,o);let f=n(e),m=l.getImageData(0,0,a,o).data;for(let y=2;y<m.length;y+=4)h.data[y]=f(m[y]/256)*256}if(r){l.drawImage(r,0,0,a,o);let f=n(t),m=l.getImageData(0,0,a,o).data;for(let y=1;y<m.length;y+=4)h.data[y]=f(m[y]/256)*256}l.putImageData(h,0,0);let u=(e||t).clone();return u.source=new pi(c),u.colorSpace=Ln,u.channel=(e||t).channel,e&&t&&e.channel!==t.channel&&console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match."),console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures."),u}async buildNormalMapTextureAsync(e,t,n){e instanceof ki&&(e=await this.decompressTextureAsync(e));let s=e.image,r=_u();r.width=s.width,r.height=s.height;let a=r.getContext("2d",{willReadFrequently:!0});a.drawImage(s,0,0,r.width,r.height);let o=a.getImageData(0,0,r.width,r.height),c=o.data;for(let h=0;h<c.length;h+=4)t&&(c[h+0]=255-c[h+0]),n&&(c[h+1]=255-c[h+1]);a.putImageData(o,0,0);let l=e.clone();return l.source=new pi(r),l}async decompressTextureAsync(e,t=1/0){if(this.textureUtils===null)throw new Error("THREE.GLTFExporter: setTextureUtils() must be called to process compressed textures.");return await this.textureUtils.decompress(e,t)}processBuffer(e){let t=this.json,n=this.buffers;return t.buffers||(t.buffers=[{byteLength:0}]),n.push(e),0}processBufferView(e,t,n,s,r){let a=this.json;a.bufferViews||(a.bufferViews=[]);let o;switch(t){case nt.BYTE:case nt.UNSIGNED_BYTE:o=1;break;case nt.SHORT:case nt.UNSIGNED_SHORT:o=2;break;default:o=4}let c=e.itemSize*o;r===nt.ARRAY_BUFFER&&(c=Math.ceil(c/4)*4);let l=Up(s*c),h=new DataView(new ArrayBuffer(l)),d=0;for(let m=n;m<n+s;m++){for(let y=0;y<e.itemSize;y++){let g;e.itemSize>4?g=e.array[m*e.itemSize+y]:(y===0?g=e.getX(m):y===1?g=e.getY(m):y===2?g=e.getZ(m):y===3&&(g=e.getW(m)),e.normalized===!0&&(g=ot.normalize(g,e.array))),t===nt.FLOAT?h.setFloat32(d,g,!0):t===nt.INT?h.setInt32(d,g,!0):t===nt.UNSIGNED_INT?h.setUint32(d,g,!0):t===nt.SHORT?h.setInt16(d,g,!0):t===nt.UNSIGNED_SHORT?h.setUint16(d,g,!0):t===nt.BYTE?h.setInt8(d,g):t===nt.UNSIGNED_BYTE&&h.setUint8(d,g),d+=o}d%c!==0&&(d+=c-d%c)}let u={buffer:this.processBuffer(h.buffer),byteOffset:this.byteOffset,byteLength:l};return r!==void 0&&(u.target=r),r===nt.ARRAY_BUFFER&&(u.byteStride=c),this.byteOffset+=l,a.bufferViews.push(u),{id:a.bufferViews.length-1,byteLength:0}}processBufferViewImage(e){let t=this,n=t.json;return n.bufferViews||(n.bufferViews=[]),new Promise(function(s){let r=new FileReader;r.readAsArrayBuffer(e),r.onloadend=function(){let a=xu(r.result),o={buffer:t.processBuffer(a),byteOffset:t.byteOffset,byteLength:a.byteLength};t.byteOffset+=a.byteLength,s(n.bufferViews.push(o)-1)}})}processAccessor(e,t,n,s){let r=this.json,a={1:"SCALAR",2:"VEC2",3:"VEC3",4:"VEC4",9:"MAT3",16:"MAT4"},o;if(e.array.constructor===Float32Array)o=nt.FLOAT;else if(e.array.constructor===Int32Array)o=nt.INT;else if(e.array.constructor===Uint32Array)o=nt.UNSIGNED_INT;else if(e.array.constructor===Int16Array)o=nt.SHORT;else if(e.array.constructor===Uint16Array)o=nt.UNSIGNED_SHORT;else if(e.array.constructor===Int8Array)o=nt.BYTE;else if(e.array.constructor===Uint8Array)o=nt.UNSIGNED_BYTE;else throw new Error("THREE.GLTFExporter: Unsupported bufferAttribute component type: "+e.array.constructor.name);if(n===void 0&&(n=0),(s===void 0||s===1/0)&&(s=e.count),s===0)return null;let c=m1(e,n,s),l;t!==void 0&&(l=e===t.index?nt.ELEMENT_ARRAY_BUFFER:nt.ARRAY_BUFFER);let h=this.processBufferView(e,o,n,s,l),d={bufferView:h.id,byteOffset:h.byteOffset,componentType:o,count:s,max:c.max,min:c.min,type:a[e.itemSize]};return e.normalized===!0&&(d.normalized=!0),r.accessors||(r.accessors=[]),r.accessors.push(d)-1}processImage(e,t,n,s="image/png"){if(e!==null){let r=this,a=r.cache,o=r.json,c=r.options,l=r.pending;a.images.has(e)||a.images.set(e,{});let h=a.images.get(e),d=s+":flipY/"+n.toString();if(h[d]!==void 0)return h[d];o.images||(o.images=[]);let u={mimeType:s},f=_u();f.width=Math.min(e.width,c.maxTextureSize),f.height=Math.min(e.height,c.maxTextureSize);let m=f.getContext("2d",{willReadFrequently:!0});if(n===!0&&(m.translate(0,f.height),m.scale(1,-1)),e.data!==void 0){t!==sn&&console.error("GLTFExporter: Only RGBAFormat is supported.",t),(e.width>c.maxTextureSize||e.height>c.maxTextureSize)&&console.warn("GLTFExporter: Image size is bigger than maxTextureSize",e);let g=new Uint8ClampedArray(e.height*e.width*4);for(let p=0;p<g.length;p+=4)g[p+0]=e.data[p+0],g[p+1]=e.data[p+1],g[p+2]=e.data[p+2],g[p+3]=e.data[p+3];m.putImageData(new ImageData(g,e.width,e.height),0,0)}else if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas)m.drawImage(e,0,0,f.width,f.height);else throw new Error("THREE.GLTFExporter: Invalid image type. Use HTMLImageElement, HTMLCanvasElement, ImageBitmap or OffscreenCanvas.");c.binary===!0?l.push(g1(f,s).then(g=>r.processBufferViewImage(g)).then(g=>{u.bufferView=g})):u.uri=$s.getDataURL(f,s);let y=o.images.push(u)-1;return h[d]=y,y}else throw new Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.")}processSampler(e){let t=this.json;t.samplers||(t.samplers=[]);let n={magFilter:pn[e.magFilter],minFilter:pn[e.minFilter],wrapS:pn[e.wrapS],wrapT:pn[e.wrapT]};return t.samplers.push(n)-1}async processTextureAsync(e){let n=this.options,s=this.cache,r=this.json;if(s.textures.has(e))return s.textures.get(e);r.textures||(r.textures=[]),e instanceof ki&&(e=await this.decompressTextureAsync(e,n.maxTextureSize));let a=e.userData.mimeType,o=this.processImage(e.image,e.format,e.flipY,a),c={sampler:this.processSampler(e)};a==="image/webp"?(c.extensions=c.extensions||{},c.extensions.EXT_texture_webp={source:o},this.extensionsUsed.EXT_texture_webp=!0,this.extensionsRequired.EXT_texture_webp=!0):c.source=o,e.name&&(c.name=e.name),await this._invokeAllAsync(async function(h){h.writeTexture&&await h.writeTexture(e,c)});let l=r.textures.push(c)-1;return s.textures.set(e,l),l}async processMaterialAsync(e,t){let n=this.cache,s=this.json,r=t!==void 0&&t.hasAttribute("tangent"),a=e.normalMap?e.uuid+":"+r:e.uuid;if(n.materials.has(a))return n.materials.get(a);if(e.isShaderMaterial)return console.warn("GLTFExporter: THREE.ShaderMaterial not supported."),null;s.materials||(s.materials=[]);let o={pbrMetallicRoughness:{}};e.isMeshStandardMaterial!==!0&&e.isMeshBasicMaterial!==!0&&console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");let c=e.color.toArray().concat([e.opacity]);if(yi(c,[1,1,1,1])||(o.pbrMetallicRoughness.baseColorFactor=c),e.isMeshStandardMaterial?(o.pbrMetallicRoughness.metallicFactor=e.metalness,o.pbrMetallicRoughness.roughnessFactor=e.roughness):(o.pbrMetallicRoughness.metallicFactor=0,o.pbrMetallicRoughness.roughnessFactor=1),e.metalnessMap||e.roughnessMap){let h=await this.buildMetalRoughTextureAsync(e.metalnessMap,e.roughnessMap),d={index:await this.processTextureAsync(h),texCoord:h.channel};this.applyTextureTransform(d,h),o.pbrMetallicRoughness.metallicRoughnessTexture=d}if(e.map){let h={index:await this.processTextureAsync(e.map),texCoord:e.map.channel};this.applyTextureTransform(h,e.map),o.pbrMetallicRoughness.baseColorTexture=h}if(e.emissive){let h=e.emissive;if(Math.max(h.r,h.g,h.b)>0&&(o.emissiveFactor=e.emissive.toArray()),e.emissiveMap){let u={index:await this.processTextureAsync(e.emissiveMap),texCoord:e.emissiveMap.channel};this.applyTextureTransform(u,e.emissiveMap),o.emissiveTexture=u}}if(e.normalMap){let h=e.normalScale,d=h.x<0,u=r?h.y<0:h.y>0,f=e.normalMap;(d||u)&&(f=await this.buildNormalMapTextureAsync(e.normalMap,d,u));let m={index:await this.processTextureAsync(f),texCoord:e.normalMap.channel};Math.abs(h.x)!==1&&(m.scale=Math.abs(h.x)),this.applyTextureTransform(m,e.normalMap),o.normalTexture=m}if(e.aoMap){let h={index:await this.processTextureAsync(e.aoMap),texCoord:e.aoMap.channel};e.aoMapIntensity!==1&&(h.strength=e.aoMapIntensity),this.applyTextureTransform(h,e.aoMap),o.occlusionTexture=h}e.transparent?o.alphaMode="BLEND":e.alphaTest>0&&(o.alphaMode="MASK",o.alphaCutoff=e.alphaTest),e.side===jt&&(o.doubleSided=!0),e.name!==""&&(o.name=e.name),this.serializeUserData(e,o),await this._invokeAllAsync(async function(h){h.writeMaterialAsync&&await h.writeMaterialAsync(e,o)});let l=s.materials.push(o)-1;return n.materials.set(a,l),l}async processMeshAsync(e){let t=this.cache,n=this.json,s=[e.geometry.uuid];if(Array.isArray(e.material))for(let _=0,M=e.material.length;_<M;_++)s.push(e.material[_].uuid);else s.push(e.material.uuid);let r=s.join(":");if(t.meshes.has(r))return t.meshes.get(r);let a=e.geometry,o;e.isLineSegments?o=nt.LINES:e.isLineLoop?o=nt.LINE_LOOP:e.isLine?o=nt.LINE_STRIP:e.isPoints?o=nt.POINTS:o=e.material.wireframe?nt.LINES:nt.TRIANGLES;let c={},l={},h=[],d=[],u={uv:"TEXCOORD_0",uv1:"TEXCOORD_1",uv2:"TEXCOORD_2",uv3:"TEXCOORD_3",color:"COLOR_0",skinWeight:"WEIGHTS_0",skinIndex:"JOINTS_0"},f=a.getAttribute("normal");f!==void 0&&!this.isNormalizedNormalAttribute(f)&&(console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."),a.setAttribute("normal",this.createNormalizedNormalAttribute(f)));let m=null;for(let _ in a.attributes){if(_.slice(0,5)==="morph")continue;let M=a.attributes[_];if(_=u[_]||_.toUpperCase(),!/^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(_)&&!_.startsWith("_")&&(_="_"+_),t.attributes.has(this.getUID(M))){l[_]=t.attributes.get(this.getUID(M));continue}m=null;let A=M.array;_==="JOINTS_0"&&!(A instanceof Uint16Array)&&!(A instanceof Uint8Array)?(console.warn('GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.'),m=Ji.Utils.toTypedBufferAttribute(M,Uint16Array)):(A instanceof Uint32Array||A instanceof Int32Array)&&!_.startsWith("_")&&(console.warn(`GLTFExporter: Attribute "${_}" converted to type FLOAT.`),m=Ji.Utils.toTypedBufferAttribute(M,Float32Array));let x=this.processAccessor(m||M,a);x!==null&&(_.startsWith("_")||this.detectMeshQuantization(_,M),l[_]=x,t.attributes.set(this.getUID(M),x))}if(f!==void 0&&a.setAttribute("normal",f),Object.keys(l).length===0)return null;if(e.morphTargetInfluences!==void 0&&e.morphTargetInfluences.length>0){let _=[],M=[],T={};if(e.morphTargetDictionary!==void 0)for(let A in e.morphTargetDictionary)T[e.morphTargetDictionary[A]]=A;for(let A=0;A<e.morphTargetInfluences.length;++A){let x={},R=!1;for(let D in a.morphAttributes){if(D!=="position"&&D!=="normal"){R||(console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."),R=!0);continue}let w=a.morphAttributes[D][A],I=D.toUpperCase(),O=a.attributes[D];if(t.attributes.has(this.getUID(w,!0))){x[I]=t.attributes.get(this.getUID(w,!0));continue}let B=w.clone();if(!a.morphTargetsRelative)for(let U=0,q=w.count;U<q;U++)for(let G=0;G<w.itemSize;G++)G===0&&B.setX(U,w.getX(U)-O.getX(U)),G===1&&B.setY(U,w.getY(U)-O.getY(U)),G===2&&B.setZ(U,w.getZ(U)-O.getZ(U)),G===3&&B.setW(U,w.getW(U)-O.getW(U));x[I]=this.processAccessor(B,a),t.attributes.set(this.getUID(O,!0),x[I])}d.push(x),_.push(e.morphTargetInfluences[A]),e.morphTargetDictionary!==void 0&&M.push(T[A])}c.weights=_,M.length>0&&(c.extras={},c.extras.targetNames=M)}let y=Array.isArray(e.material);if(y&&a.groups.length===0)return null;let g=!1;if(y&&a.index===null){let _=[];for(let M=0,T=a.attributes.position.count;M<T;M++)_[M]=M;a.setIndex(_),g=!0}let p=y?e.material:[e.material],E=y?a.groups:[{materialIndex:0,start:void 0,count:void 0}];for(let _=0,M=E.length;_<M;_++){let T={mode:o,attributes:l};if(this.serializeUserData(a,T),d.length>0&&(T.targets=d),a.index!==null){let x=this.getUID(a.index);(E[_].start!==void 0||E[_].count!==void 0)&&(x+=":"+E[_].start+":"+E[_].count),t.attributes.has(x)?T.indices=t.attributes.get(x):(T.indices=this.processAccessor(a.index,a,E[_].start,E[_].count),t.attributes.set(x,T.indices)),T.indices===null&&delete T.indices}let A=await this.processMaterialAsync(p[E[_].materialIndex],a);A!==null&&(T.material=A),h.push(T)}g===!0&&a.setIndex(null),c.primitives=h,n.meshes||(n.meshes=[]),await this._invokeAllAsync(function(_){_.writeMesh&&_.writeMesh(e,c)});let b=n.meshes.push(c)-1;return t.meshes.set(r,b),b}detectMeshQuantization(e,t){if(this.extensionsUsed[gu])return;let n;switch(t.array.constructor){case Int8Array:n="byte";break;case Uint8Array:n="unsigned byte";break;case Int16Array:n="short";break;case Uint16Array:n="unsigned short";break;default:return}t.normalized&&(n+=" normalized");let s=e.split("_",1)[0];Pp[s]&&Pp[s].includes(n)&&(this.extensionsUsed[gu]=!0,this.extensionsRequired[gu]=!0)}processCamera(e){let t=this.json;t.cameras||(t.cameras=[]);let n=e.isOrthographicCamera,s={type:n?"orthographic":"perspective"};return n?s.orthographic={xmag:e.right*2,ymag:e.top*2,zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near}:s.perspective={aspectRatio:e.aspect,yfov:ot.degToRad(e.fov),zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near},e.name!==""&&(s.name=e.type),t.cameras.push(s)-1}processAnimation(e,t){let n=this.json,s=this.nodeMap;n.animations||(n.animations=[]),e=Ji.Utils.mergeMorphTargetTracks(e.clone(),t);let r=e.tracks,a=[],o=[];for(let l=0;l<r.length;++l){let h=r[l],d=ct.parseTrackName(h.name),u=ct.findNode(t,d.nodeName),f=Lp[d.propertyName];if(d.objectName==="bones"&&(u.isSkinnedMesh===!0?u=u.skeleton.getBoneByName(d.objectIndex):u=void 0),!u||!f){console.warn('THREE.GLTFExporter: Could not export animation track "%s".',h.name);continue}let m=1,y=h.values.length/h.times.length;f===Lp.morphTargetInfluences&&(y/=u.morphTargetInfluences.length);let g;h.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline===!0?(g="CUBICSPLINE",y/=3):h.getInterpolation()===ls?g="STEP":g="LINEAR",o.push({input:this.processAccessor(new Mt(h.times,m)),output:this.processAccessor(new Mt(h.values,y)),interpolation:g}),a.push({sampler:o.length-1,target:{node:s.get(u),path:f}})}let c={name:e.name||"clip_"+n.animations.length,samplers:o,channels:a};return this.serializeUserData(e,c),n.animations.push(c),n.animations.length-1}processSkin(e){let t=this.json,n=this.nodeMap,s=t.nodes[n.get(e)],r=e.skeleton;if(r===void 0)return null;let a=e.skeleton.bones[0];if(a===void 0)return null;let o=[],c=new Float32Array(r.bones.length*16),l=new rt;for(let d=0;d<r.bones.length;++d)o.push(n.get(r.bones[d])),l.copy(r.boneInverses[d]),l.multiply(e.bindMatrix).toArray(c,d*16);return t.skins===void 0&&(t.skins=[]),t.skins.push({inverseBindMatrices:this.processAccessor(new Mt(c,16)),joints:o,skeleton:n.get(a)}),s.skin=t.skins.length-1}async processNodeAsync(e){let t=this.json,n=this.options,s=this.nodeMap;if(t.nodes||(t.nodes=[]),e.pivot!==null)return await this._processNodeWithPivotAsync(e);let r={};if(n.trs){let o=e.quaternion.toArray(),c=e.position.toArray(),l=e.scale.toArray();yi(o,[0,0,0,1])||(r.rotation=o),yi(c,[0,0,0])||(r.translation=c),yi(l,[1,1,1])||(r.scale=l)}else e.matrixAutoUpdate&&e.updateMatrix(),p1(e.matrix)===!1&&(r.matrix=e.matrix.elements);if(e.name!==""&&(r.name=String(e.name)),this.serializeUserData(e,r),e.isMesh||e.isLine||e.isPoints){let o=await this.processMeshAsync(e);o!==null&&(r.mesh=o)}else e.isCamera&&(r.camera=this.processCamera(e));e.isSkinnedMesh&&this.skins.push(e);let a=t.nodes.push(r)-1;if(s.set(e,a),e.children.length>0){let o=[];for(let c=0,l=e.children.length;c<l;c++){let h=e.children[c];if(h.visible||n.onlyVisible===!1){let d=await this.processNodeAsync(h);d!==null&&o.push(d)}}o.length>0&&(r.children=o)}return await this._invokeAllAsync(function(o){o.writeNode&&o.writeNode(e,r)}),a}async _processNodeWithPivotAsync(e){let t=this.json,n=this.options,s=this.nodeMap,r=e.pivot,a={},o=e.quaternion.toArray(),c=[e.position.x+r.x,e.position.y+r.y,e.position.z+r.z],l=e.scale.toArray();yi(o,[0,0,0,1])||(a.rotation=o),yi(c,[0,0,0])||(a.translation=c),yi(l,[1,1,1])||(a.scale=l),a.extras={pivot:r.toArray()},e.name!==""&&(a.name=String(e.name)),this.serializeUserData(e,a);let h=t.nodes.push(a)-1;s.set(e,h);let d={},u=[-r.x,-r.y,-r.z];if(yi(u,[0,0,0])||(d.translation=u),e.isMesh||e.isLine||e.isPoints){let y=await this.processMeshAsync(e);y!==null&&(d.mesh=y)}else e.isCamera&&(d.camera=this.processCamera(e));e.isSkinnedMesh&&this.skins.push(e);let m=[t.nodes.push(d)-1];if(e.children.length>0){let y=[];for(let g=0,p=e.children.length;g<p;g++){let E=e.children[g];if(E.visible||n.onlyVisible===!1){let b=await this.processNodeAsync(E);b!==null&&y.push(b)}}y.length>0&&(d.children=y)}return a.children=m,await this._invokeAllAsync(function(y){y.writeNode&&y.writeNode(e,a)}),h}async processSceneAsync(e){let t=this.json,n=this.options;t.scenes||(t.scenes=[],t.scene=0);let s={};e.name!==""&&(s.name=e.name),t.scenes.push(s);let r=[];for(let a=0,o=e.children.length;a<o;a++){let c=e.children[a];if(c.visible||n.onlyVisible===!1){let l=await this.processNodeAsync(c);l!==null&&r.push(l)}}r.length>0&&(s.nodes=r),this.serializeUserData(e,s)}async processObjectsAsync(e){let t=new Zn;t.name="AuxScene";for(let n=0;n<e.length;n++)t.children.push(e[n]);await this.processSceneAsync(t)}async processInputAsync(e){let t=this.options;e=e instanceof Array?e:[e],await this._invokeAllAsync(function(s){s.beforeParse&&s.beforeParse(e)});let n=[];for(let s=0;s<e.length;s++)e[s]instanceof Zn?await this.processSceneAsync(e[s]):n.push(e[s]);n.length>0&&await this.processObjectsAsync(n);for(let s=0;s<this.skins.length;++s)this.processSkin(this.skins[s]);if(e.length===1)for(let s=0;s<t.animations.length;++s)this.processAnimation(t.animations[s],e[0]);else for(let s=0;s<e.length;s++){let r=t.animations[s]||[];for(let a=0;a<r.length;++a)this.processAnimation(r[a],e[s])}await this._invokeAllAsync(function(s){s.afterParse&&s.afterParse(e)})}async _invokeAllAsync(e){for(let t=0,n=this.plugins.length;t<n;t++)await e(this.plugins[t])}},vu=class{constructor(e){this.writer=e,this.name="KHR_lights_punctual"}writeNode(e,t){if(!e.isLight)return;if(!e.isDirectionalLight&&!e.isPointLight&&!e.isSpotLight){console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.",e);return}let n=this.writer,s=n.json,r=n.extensionsUsed,a={};e.name&&(a.name=e.name),a.color=e.color.toArray(),a.intensity=e.intensity,e.isDirectionalLight?a.type="directional":e.isPointLight?(a.type="point",e.distance>0&&(a.range=e.distance)):e.isSpotLight&&(a.type="spot",e.distance>0&&(a.range=e.distance),a.spot={},a.spot.innerConeAngle=(1-e.penumbra)*e.angle,a.spot.outerConeAngle=e.angle),e.decay!==void 0&&e.decay!==2&&console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."),e.target&&(e.target.parent!==e||e.target.position.x!==0||e.target.position.y!==0||e.target.position.z!==-1)&&console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."),r[this.name]||(s.extensions=s.extensions||{},s.extensions[this.name]={lights:[]},r[this.name]=!0);let o=s.extensions[this.name].lights;o.push(a),t.extensions=t.extensions||{},t.extensions[this.name]={light:o.length-1}}},Mu=class{constructor(e){this.writer=e,this.name="KHR_materials_unlit"}async writeMaterialAsync(e,t){if(!e.isMeshBasicMaterial)return;let s=this.writer.extensionsUsed;t.extensions=t.extensions||{},t.extensions[this.name]={},s[this.name]=!0,t.pbrMetallicRoughness.metallicFactor=0,t.pbrMetallicRoughness.roughnessFactor=.9}},Su=class{constructor(e){this.writer=e,this.name="KHR_materials_clearcoat"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.clearcoat===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.clearcoatFactor=e.clearcoat,e.clearcoatMap){let a={index:await n.processTextureAsync(e.clearcoatMap),texCoord:e.clearcoatMap.channel};n.applyTextureTransform(a,e.clearcoatMap),r.clearcoatTexture=a}if(r.clearcoatRoughnessFactor=e.clearcoatRoughness,e.clearcoatRoughnessMap){let a={index:await n.processTextureAsync(e.clearcoatRoughnessMap),texCoord:e.clearcoatRoughnessMap.channel};n.applyTextureTransform(a,e.clearcoatRoughnessMap),r.clearcoatRoughnessTexture=a}if(e.clearcoatNormalMap){let a={index:await n.processTextureAsync(e.clearcoatNormalMap),texCoord:e.clearcoatNormalMap.channel};e.clearcoatNormalScale.x!==1&&(a.scale=e.clearcoatNormalScale.x),n.applyTextureTransform(a,e.clearcoatNormalMap),r.clearcoatNormalTexture=a}t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},bu=class{constructor(e){this.writer=e,this.name="KHR_materials_dispersion"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.dispersion===0)return;let s=this.writer.extensionsUsed,r={};r.dispersion=e.dispersion,t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Eu=class{constructor(e){this.writer=e,this.name="KHR_materials_iridescence"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.iridescence===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.iridescenceFactor=e.iridescence,e.iridescenceMap){let a={index:await n.processTextureAsync(e.iridescenceMap),texCoord:e.iridescenceMap.channel};n.applyTextureTransform(a,e.iridescenceMap),r.iridescenceTexture=a}if(r.iridescenceIor=e.iridescenceIOR,r.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],r.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1],e.iridescenceThicknessMap){let a={index:await n.processTextureAsync(e.iridescenceThicknessMap),texCoord:e.iridescenceThicknessMap.channel};n.applyTextureTransform(a,e.iridescenceThicknessMap),r.iridescenceThicknessTexture=a}t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Tu=class{constructor(e){this.writer=e,this.name="KHR_materials_transmission"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.transmissionFactor=e.transmission,e.transmissionMap){let a={index:await n.processTextureAsync(e.transmissionMap),texCoord:e.transmissionMap.channel};n.applyTextureTransform(a,e.transmissionMap),r.transmissionTexture=a}t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},wu=class{constructor(e){this.writer=e,this.name="KHR_materials_volume"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.thicknessFactor=e.thickness,e.thicknessMap){let a={index:await n.processTextureAsync(e.thicknessMap),texCoord:e.thicknessMap.channel};n.applyTextureTransform(a,e.thicknessMap),r.thicknessTexture=a}e.attenuationDistance!==1/0&&(r.attenuationDistance=e.attenuationDistance),r.attenuationColor=e.attenuationColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Au=class{constructor(e){this.writer=e,this.name="KHR_materials_ior"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.ior===1.5)return;let s=this.writer.extensionsUsed,r={};r.ior=e.ior,t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Ru=class{constructor(e){this.writer=e,this.name="KHR_materials_specular"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.specularIntensity===1&&e.specularColor.equals(c1)&&!e.specularIntensityMap&&!e.specularColorMap)return;let n=this.writer,s=n.extensionsUsed,r={};if(e.specularIntensityMap){let a={index:await n.processTextureAsync(e.specularIntensityMap),texCoord:e.specularIntensityMap.channel};n.applyTextureTransform(a,e.specularIntensityMap),r.specularTexture=a}if(e.specularColorMap){let a={index:await n.processTextureAsync(e.specularColorMap),texCoord:e.specularColorMap.channel};n.applyTextureTransform(a,e.specularColorMap),r.specularColorTexture=a}r.specularFactor=e.specularIntensity,r.specularColorFactor=e.specularColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Cu=class{constructor(e){this.writer=e,this.name="KHR_materials_sheen"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.sheen==0)return;let n=this.writer,s=n.extensionsUsed,r={};if(e.sheenRoughnessMap){let a={index:await n.processTextureAsync(e.sheenRoughnessMap),texCoord:e.sheenRoughnessMap.channel};n.applyTextureTransform(a,e.sheenRoughnessMap),r.sheenRoughnessTexture=a}if(e.sheenColorMap){let a={index:await n.processTextureAsync(e.sheenColorMap),texCoord:e.sheenColorMap.channel};n.applyTextureTransform(a,e.sheenColorMap),r.sheenColorTexture=a}r.sheenRoughnessFactor=e.sheenRoughness,r.sheenColorFactor=e.sheenColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Iu=class{constructor(e){this.writer=e,this.name="KHR_materials_anisotropy"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.anisotropy==0)return;let n=this.writer,s=n.extensionsUsed,r={};if(e.anisotropyMap){let a={index:await n.processTextureAsync(e.anisotropyMap)};n.applyTextureTransform(a,e.anisotropyMap),r.anisotropyTexture=a}r.anisotropyStrength=e.anisotropy,r.anisotropyRotation=e.anisotropyRotation,t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Pu=class{constructor(e){this.writer=e,this.name="KHR_materials_emissive_strength"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.emissiveIntensity===1)return;let s=this.writer.extensionsUsed,r={};r.emissiveStrength=e.emissiveIntensity,t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Lu=class{constructor(e){this.writer=e,this.name="EXT_materials_bump"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.bumpScale===1&&!e.bumpMap)return;let n=this.writer,s=n.extensionsUsed,r={};if(e.bumpMap){let a={index:await n.processTextureAsync(e.bumpMap),texCoord:e.bumpMap.channel};n.applyTextureTransform(a,e.bumpMap),r.bumpTexture=a}r.bumpFactor=e.bumpScale,t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Nu=class{constructor(e){this.writer=e,this.name="EXT_mesh_gpu_instancing"}writeNode(e,t){if(!e.isInstancedMesh)return;let n=this.writer,s=e,r=new Float32Array(s.count*3),a=new Float32Array(s.count*4),o=new Float32Array(s.count*3),c=new rt,l=new V,h=new _n,d=new V;for(let f=0;f<s.count;f++)s.getMatrixAt(f,c),c.decompose(l,h,d),l.toArray(r,f*3),h.toArray(a,f*4),d.toArray(o,f*3);let u={TRANSLATION:n.processAccessor(new Mt(r,3)),ROTATION:n.processAccessor(new Mt(a,4)),SCALE:n.processAccessor(new Mt(o,3))};s.instanceColor&&(u._COLOR_0=n.processAccessor(s.instanceColor)),t.extensions=t.extensions||{},t.extensions[this.name]={attributes:u},n.extensionsUsed[this.name]=!0,n.extensionsRequired[this.name]=!0}};Ji.Utils={insertKeyframe:function(i,e){let n=i.getValueSize(),s=new i.TimeBufferType(i.times.length+1),r=new i.ValueBufferType(i.values.length+n),a=i.createInterpolant(new i.ValueBufferType(n)),o;if(i.times.length===0){s[0]=e;for(let c=0;c<n;c++)r[c]=0;o=0}else if(e<i.times[0]){if(Math.abs(i.times[0]-e)<.001)return 0;s[0]=e,s.set(i.times,1),r.set(a.evaluate(e),0),r.set(i.values,n),o=0}else if(e>i.times[i.times.length-1]){if(Math.abs(i.times[i.times.length-1]-e)<.001)return i.times.length-1;s[s.length-1]=e,s.set(i.times,0),r.set(i.values,0),r.set(a.evaluate(e),i.values.length),o=s.length-1}else for(let c=0;c<i.times.length;c++){if(Math.abs(i.times[c]-e)<.001)return c;if(i.times[c]<e&&i.times[c+1]>e){s.set(i.times.slice(0,c+1),0),s[c+1]=e,s.set(i.times.slice(c+1),c+2),r.set(i.values.slice(0,(c+1)*n),0),r.set(a.evaluate(e),(c+1)*n),r.set(i.values.slice((c+1)*n),(c+2)*n),o=c+1;break}}return i.times=s,i.values=r,o},mergeMorphTargetTracks:function(i,e){let t=[],n={},s=i.tracks;for(let r=0;r<s.length;++r){let a=s[r],o=ct.parseTrackName(a.name),c=ct.findNode(e,o.nodeName);if(o.propertyName!=="morphTargetInfluences"||o.propertyIndex===void 0){t.push(a);continue}if(a.createInterpolant!==a.InterpolantFactoryMethodDiscrete&&a.createInterpolant!==a.InterpolantFactoryMethodLinear){if(a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)throw new Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead."),a=a.clone(),a.setInterpolation(qs)}let l=c.morphTargetInfluences.length,h=c.morphTargetDictionary[o.propertyIndex];if(h===void 0)throw new Error("THREE.GLTFExporter: Morph target name not found: "+o.propertyIndex);let d;if(n[c.uuid]===void 0){d=a.clone();let f=new d.ValueBufferType(l*d.times.length);for(let m=0;m<d.times.length;m++)f[m*l+h]=d.values[m];d.name=(o.nodeName||"")+".morphTargetInfluences",d.values=f,n[c.uuid]=d,t.push(d);continue}let u=a.createInterpolant(new a.ValueBufferType(1));d=n[c.uuid];for(let f=0;f<d.times.length;f++)d.values[f*l+h]=u.evaluate(d.times[f]);for(let f=0;f<a.times.length;f++){let m=this.insertKeyframe(d,a.times[f]);d.values[m*l+h]=a.values[f]}}return i.tracks=t,i},toTypedBufferAttribute:function(i,e){let t=new Mt(new e(i.count*i.itemSize),i.itemSize,!1);if(!i.normalized&&!i.isInterleavedBufferAttribute)return t.array.set(i.array),t;for(let n=0,s=i.count;n<s;n++)for(let r=0;r<i.itemSize;r++)t.setComponent(n,r,i.getComponent(n,r));return t}};var Oa=2.4000000000000004,xs=3,Qt=1.2,Du=xs+Qt,el=xs+Qt*.68;function Fp(i){return i<xs?i:i<Du?3-1e-6:i-Qt}var _s=3,Nn=_s+.04,tl=Nn+Qt,Op=.42,vi=2.1,$i=Nn+vi,Dn=$i+.08,Un=.9,Mi=Dn+Un,ys=Mi+.08,xr=.84,nl=ys+xr,Fn=nl+.05;var lE=Mi+.01,il=i=>ot.clamp(i,0,1),ti=i=>{let e=il(i);return e*e*(3-2*e)},Ou=i=>ti(i),x1=new Ve(16777215),Bp=new Ve(9476257),Uu;function zp(i,e=0){let t={phase:i<_s?"guide":i<Nn?"point":i<$i?"outline":i<Dn?"fill":i<Mi?"extrude":i<ys?"white":i<nl?"color":"solid",guideProgress:ti(i/Oa),guideOpacity:ti(i/(3*.28))*(1-ti((i-Dn)/(Un*.7))),stroke:il((i-Nn)/vi),fill:ti((i-$i)/.08),extrusion:ti((i-Dn)/Un),tint:ti((i-ys)/xr),flatness:0,complete:i>=nl,lineOpacity:1-ti((i-(Dn+Un/6))/(Un*5/6))};return e>0&&i>=Mi&&(t.phase=e>=1?"flat":"flattening",t.flatness=Ou(e),t.extrusion=1-t.flatness,t.fill=1,t.lineOpacity=0),t}function kp(i){let{minX:e,maxX:t,minZ:n,maxZ:s}=i;return[{a:[e,n],b:[t,n]},{a:[t,s],b:[e,s]},{a:[e,s],b:[e,n]},{a:[t,n],b:[t,s]}]}function _1(i,e){let t=kp(i),n=new At;n.setAttribute("position",new Mt(new Float32Array(24),3).setUsage(fr));let s=new zi({color:11581375,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1}),r=new ir(n,s);if(r.name="SVG construction guide",r.renderOrder=2,r.frustumCulled=!1,r.userData={segments:t,mode:e,svgBounds:i,bounds:i,origins:t.map(({a})=>a),exits:t.map(({b:a})=>a)},e==="viewport"){let a=new ir(n.clone(),new zi({color:16727100,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1}));a.name="Red guide sweep",a.renderOrder=3,a.frustumCulled=!1,a.visible=!1,r.add(a),r.userData.sweep=a}return r}function sl(i,e){let t=i.guide.userData,n=t.svgBounds,s=e?Math.min(1,(e.stepX/2-.1)/Math.max(Math.abs(n.minX),Math.abs(n.maxX)),(e.stepZ/2-.1)/Math.max(Math.abs(n.minZ),Math.abs(n.maxZ))):1;t.bounds=Object.fromEntries(Object.entries(n).map(([r,a])=>[r,a*s])),t.segments=kp(t.bounds),t.origins=t.segments.map(({a:r})=>r),t.exits=t.segments.map(({b:r})=>r)}function Bu(i,e,t=0){let n=i.guide;if(n.userData.mode!=="viewport")return;i.group.updateWorldMatrix(!0,!1);let s=i.group.localToWorld(new V(0,.008,0)).y,r=new Wt(new V(0,1,0),-s),a=new _i,o=[];for(let l of[-1.06,1.06])for(let h of[-1.06,1.06+t]){a.setFromCamera(new fe(l,h),e);let d=a.ray.intersectPlane(r,new V);d&&o.push(i.group.worldToLocal(d))}if(o.length!==4)return;let c=new zt().setFromPoints(o);n.userData.origins=n.userData.segments.map(({a:l,b:h})=>l[0]!==h[0]?[h[0]>l[0]?c.min.x:c.max.x,l[1]]:[l[0],h[1]>l[1]?c.min.z:c.max.z]),n.userData.exits=n.userData.segments.map(({a:l,b:h})=>l[0]!==h[0]?[h[0]>l[0]?c.max.x:c.min.x,l[1]]:[l[0],h[1]>l[1]?c.max.z:c.min.z]),n.userData.originScreens=n.userData.origins.map(([l,h])=>i.group.localToWorld(new V(l,.008,h)).project(e).toArray().slice(0,2)),n.userData.exitScreens=n.userData.exits.map(([l,h])=>i.group.localToWorld(new V(l,.008,h)).project(e).toArray().slice(0,2))}function y1(i,e){if(i.visible=e.guideOpacity>0,i.material.opacity=e.guideOpacity,!i.visible)return;let t=i.geometry.attributes.position,n=e.guideProgress,s=i.userData.sweep,r=s?.geometry.attributes.position;s&&(s.visible=n>0&&n<1,s.material.opacity=e.guideOpacity),i.userData.segments.forEach(({a,b:o},c)=>{let l=n;if(s){let h=i.userData.origins[c],d=i.userData.exits[c],u=Math.hypot(o[0]-a[0],o[1]-a[1]),f=(o[0]-a[0])/u,m=(o[1]-a[1])/u,y=Math.hypot(d[0]-h[0],d[1]-h[1]),g=y*ti(n/.52),p=y*ti((n-.58)/.42);r.setXYZ(c*2,h[0]+f*p,.0085,h[1]+m*p),r.setXYZ(c*2+1,h[0]+f*g,.0085,h[1]+m*g);let E=(a[0]-h[0])*f+(a[1]-h[1])*m;l=il((p-E)/u)}t.setXYZ(c*2,a[0],.008,a[1]),t.setXYZ(c*2+1,ot.lerp(a[0],o[0],l),.008,ot.lerp(a[1],o[1],l))}),t.needsUpdate=!0,r&&(r.needsUpdate=!0)}function rl(i){let e=i.guide.userData.sweep;return{enabled:!0,mode:i.guide.userData.mode,bounds:i.guide.userData.bounds,origins:i.guide.userData.origins,originScreens:i.guide.userData.originScreens,color:i.guide.material.color.getHexString(),visible:i.group.visible&&i.guide.visible,opacity:i.guide.material.opacity,sweep:e?{visible:i.group.visible&&i.guide.visible&&e.visible,color:e.material.color.getHexString(),points:Array.from(e.geometry.attributes.position.array),exits:i.guide.userData.exits,exitScreens:i.guide.userData.exitScreens}:null,progress:i.state.guideProgress,points:Array.from(i.guide.geometry.attributes.position.array)}}function al(i,e,t="edge"){let n=new ln;n.name=i.icon.id+"-drawing",n.position.copy(i.mesh.position),n.rotation.copy(i.mesh.rotation);let s=Bp.clone(),r=new Ve(i.color),a=_1(i.caster.svgBounds,t);a.visible=!1,n.add(a);let o=new zi({color:s,transparent:!0,opacity:1,depthWrite:!1,toneMapped:!1}),c=[],l=0;for(let[u,f]of i.caster.contours.entries()){if(e){let p=e.lines[u],E=p.geometry.clone();E.setDrawRange(0,0);let b=new hs(E,o);b.renderOrder=3,b.userData={offset:l,count:p.userData.count},l+=p.userData.count,n.add(b),c.push(b);continue}let m=[];for(let p=0;p<f.points.length;p++){let E=f.points[p],b=f.points[(p+1)%f.points.length],_=Math.max(1,Math.ceil(Math.hypot(b[0]-E[0],b[1]-E[1])/.006));for(let M=0;M<_;M++)m.push(new V(ot.lerp(E[0],b[0],M/_),.012,ot.lerp(E[1],b[1],M/_)))}m.push(m[0].clone());let y=new At().setFromPoints(m);y.setDrawRange(0,0);let g=new hs(y,o);g.renderOrder=3,g.userData={offset:l,count:m.length},l+=m.length,n.add(g),c.push(g)}let h=new gt(e?.dot.geometry||new ga(.018,16,12),new Xt({color:s,transparent:!0,depthWrite:!1,depthTest:!1,toneMapped:!1}));if(h.position.fromBufferAttribute(c[0].geometry.attributes.position,0),h.renderOrder=4,n.add(h),!Uu){let u=document.createElement("canvas");u.width=u.height=64;let f=u.getContext("2d"),m=f.createRadialGradient(32,32,0,32,32,32);m.addColorStop(0,"rgba(255,255,255,.5)"),m.addColorStop(.3,"rgba(255,255,255,.18)"),m.addColorStop(1,"rgba(255,255,255,0)"),f.fillStyle=m,f.fillRect(0,0,64,64),Uu=new hn(u)}let d=new na(new Qs({map:Uu,color:s,transparent:!0,depthWrite:!1,depthTest:!1}));return d.position.copy(h.position),d.scale.setScalar(.18),n.add(d),{group:n,guide:a,lines:c,dot:h,halo:d,total:l,targetColor:r,active:!1,drawing:!1,sparkAt:-1/0,state:zp(0)}}function zu(i,e,t,n,s=0){let r=i.reveal,a=r.guide.userData.mode==="viewport",o=a&&e>=xs&&e<Du;if(a&&(e=Fp(e)),r.group.visible=t,!t)return r.active=!1,r.drawing=!1,r.state;r.active=!0;let c=zp(e,s);r.state=c,o&&(c.phase="measure"),y1(r.guide,c);for(let u of r.lines){let{offset:f,count:m}=u.userData;u.visible=c.lineOpacity>0,u.geometry.setDrawRange(0,ot.clamp(Math.floor(c.stroke*r.total-f),0,m)),u.position.y=i.caster.height*n*c.extrusion}r.lines[0].material.opacity=c.lineOpacity,r.lines[0].material.color.lerpColors(Bp,r.targetColor,c.tint),e>=_s&&!r.drawing&&(r.sparkAt=performance.now(),r.drawing=!0),e<_s&&(r.drawing=!1);let l=(performance.now()-r.sparkAt)/300,h=Math.sin(il(l)*Math.PI),d=c.stroke===0?1:Math.max(0,1-l);return r.dot.visible=r.halo.visible=e>=_s&&e<_s+.18&&d>0,r.dot.material.opacity=d,r.dot.scale.setScalar(1+h*.8),r.halo.material.opacity=d*(.25+h*.7),c}function Vp(i,e,t,n,s,r=0){let a=zu(i,e,t,n,r);i.mesh.visible=t&&a.fill>0,i.shadow.visible=t&&a.extrusion>0,t&&(i.mesh.scale.y=Math.max(.001,a.extrusion)*n,i.mesh.material.opacity=a.fill,i.mesh.material.depthWrite=a.fill>.5,i.mesh.material.color.lerpColors(x1,i.reveal.targetColor,a.tint),i.mesh.material.emissive.copy(i.mesh.material.color),i.shadow.material.opacity=s,i.shadow.material.userData.shadowHeight.value=a.extrusion)}function Si(i){let e=i>>>0;return()=>(e=Math.imul(e,1664525)+1013904223>>>0,e/4294967296)}var Gp=.22,Hp=5,ol=class{constructor(){this.cells=new Map,this.maxRadius=0}add(e){let t=Math.floor(e.x/4)+":"+Math.floor(e.z/4);this.cells.has(t)||this.cells.set(t,[]),this.cells.get(t).push(e),this.maxRadius=Math.max(this.maxRadius,e.radius)}accepts(e,t=Gp){let n=Math.floor(e.x/4),s=Math.floor(e.z/4),r=Math.ceil((e.radius+this.maxRadius+Math.max(t,Hp))/4);for(let a=n-r;a<=n+r;a++)for(let o=s-r;o<=s+r;o++)for(let c of this.cells.get(a+":"+o)||[]){let l=e.sourceIndex!==void 0&&e.sourceIndex===c.sourceIndex;if(Math.hypot(e.x-c.x,e.z-c.z)<e.radius+c.radius+(l?Hp:t))return!1}return!0}};function Wp(i,e){let t=Si(90317),n=new ol,s=[],r=i?7.2:14,a=i?15:9,o={x:-3.5,z:i?10:5.7,radius:e[0]};s.push(o),n.add(o);for(let c=1;c<3;c++){let l=s[c-1],h=c===1?-.23:-.4,d=l.radius+e[c]+.5,u={x:l.x+Math.cos(h)*d,z:l.z+Math.sin(h)*d,radius:e[c]};s.push(u),n.add(u)}for(let c=3;c<33;c++){let l;for(let h=0;h<2e4;h++){let d=t()*Math.PI*2,u=Math.sqrt(t()),f=1+Math.floor(h/5e3)*.1,m={x:Math.cos(d)*r*u*f,z:Math.sin(d)*a*u*f,radius:e[c]};if(n.accepts(m)){l=m;break}}if(!l)throw new Error("Could not place icon "+c+" without overlap");s.push(l),n.add(l)}return s.map(c=>({...c,height:1+1.1*Math.exp(-2.4*((c.x/r)**2+(c.z/a)**2))}))}function Xp(i,e){let t=Si(192807),n=new ol,s=[],r=e.map((l,h)=>({x:l.mesh.position.x,z:l.mesh.position.z,radius:l.radius,sourceIndex:h}));r.forEach(l=>n.add(l));let a=[],o=0;function c(){if(o===a.length){a=e.map((l,h)=>h),o=0;for(let l=a.length-1;l>0;l--){let h=Math.floor(t()*(l+1));[a[l],a[h]]=[a[h],a[l]]}}return a[o]}for(;r.length;){let l=Math.floor(t()*r.length),h=r[l],d=!1,u=c(),f=e[u].radius;for(let m=0;m<36;m++){let y=t()*Math.PI*2,g=(h.radius+f+Gp)*(1+t()),p={x:h.x+Math.cos(y)*g,z:h.z+Math.sin(y)*g,radius:f,sourceIndex:u};if(!(p.x<i.left||p.x>i.right||p.z<i.back||p.z>i.front||!n.accepts(p))){p.rotation=0,n.add(p),r.push(p),s.push(p),o++,d=!0;break}}d||(r[l]=r[r.length-1],r.pop())}return s}var _r=3,Ki=.8,qp=Fn+Qt+.45,Mn=[{start:0,tempo:1,measureDuration:Qt,colorExtra:Ki,duration:Fn+Qt+Ki},{start:qp,tempo:1,colorExtra:Ki,duration:Fn+Ki},{start:qp+Mi-.02,tempo:1,colorExtra:Ki,duration:Fn+Ki}],On=Mn[2].start+Mi,ku=On-.08,Jp=7.2,ji=On+Jp+.52*Fn/.7+.27,Sn=ji-1.05,bi=ji+1.55,v1=ji+.8*(bi-ji),ni=bi,M1=.48,cl=2+Ki,Vu=4.2,Zp=7,Yp=4,Hu=Sn+.45+Ki,S1=[[Nn,vi,"outlineExtra"],[Dn,Un,"extrusionExtra"],[ys,xr,"colorExtra"]];function $p(i){return i<Mn[1].start?0:i<Mn[2].start?1:2}function ll(i){return Math.max(0,Math.min(1,(i-ji)/(v1-ji)))}function Kp(i){return Mn[i]}function Gu(i,e,t){let n=Math.max(0,Math.min(1,(i-e)/Math.max(.001,t-e))),s=Math.round(n*(Zp-1)),r=s/(Zp-1),a=(.76-r*.24)/.7,o=ku+Jp*r,c=(Dn-$i+(ys-Mi))*a,l=(Sn-.65+.4*r-o-c)*M1,h=Math.round(r*(Yp-1)),d=h/(Yp-1),f=Hu-cl-Vu*(1-d)-o-c-l-vi*a,m=l-Un*a,y=cl-xr*a;return{start:o-Nn*a,tempo:a,waveStep:s,colorStep:h,outlineExtra:f,extrusionExtra:m,colorExtra:y,duration:a*Fn+f+m+y}}function yr(i,e){let t=Math.max(0,i-e.start),n=e.tempo||e.duration/Fn,s=e.measureDuration||0;for(let[r,a,o]of S1){let c=e[o]||0;if(!c)continue;let l=r*n+s,h=a*n+c;if(t<=l)break;if(t<l+h)return r+s/n+(t-l)/h*a;t-=c}return t/n}function jp(i,e="grid",t=[]){if(e==="scattered")return Wp(i,t);let n=i?[3,4,4,4,4,4,4,3,3]:[3,7,9,9,5],s=[];n.forEach((l,h)=>{for(let d=0;d<l;d++)s.push({x:(d-Math.floor(l/2))*(i?3.15:3.3),z:((n.length-1)/2-h)*(i?3.05:2.85)})});let r=s.splice(0,_r),a=Si(90317);for(let l=s.length-1;l>0;l--){let h=Math.floor(a()*(l+1));[s[l],s[h]]=[s[h],s[l]]}let o=Math.max(...[...r,...s].map(l=>Math.abs(l.x)))||1,c=Math.max(...[...r,...s].map(l=>Math.abs(l.z)))||1;return[...r,...s].map(l=>({...l,height:1+1.1*Math.exp(-2.4*((l.x/o)**2+(l.z/c)**2))}))}function hl(i){return{stepX:i?3.15:3.3,stepZ:i?3.05:2.85,originZ:i?12.2:5.7,offset:()=>0}}var ul={value:0},Wu={value:1},Xu=1.15,vr={value:0},Mr={value:1};function qu(i){let e=i.onBeforeCompile,t=i.customProgramCacheKey();return i.onBeforeCompile=function(n,s){e.call(this,n,s),Object.assign(n.uniforms,{gridNear:Wu,gridFlat:ul,gridRecession:vr,gridInk:Mr}),n.vertexShader=`uniform float gridRecession; varying vec3 vGridView;
`+n.vertexShader,n.vertexShader=n.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
mvPosition.z-=gridRecession; gl_Position=projectionMatrix*mvPosition; vGridView=mvPosition.xyz;`),n.fragmentShader=`varying vec3 vGridView; uniform float gridNear,gridFlat,gridInk;
`+n.fragmentShader,n.fragmentShader=n.fragmentShader.replace("#include <opaque_fragment>",`
      float eye=length(vGridView);
      float distanceInk=1./(1.+${Xu}*max(0.,eye/gridNear-1.));
      diffuseColor.a*=mix(1.,distanceInk*gridInk,gridFlat);
      #include <opaque_fragment>`)},i.customProgramCacheKey=()=>t+"-grid-distance",i}function dl(i){let e=i.onBeforeCompile,t=i.customProgramCacheKey();return i.onBeforeCompile=function(n,s){e.call(this,n,s),n.uniforms.flatFinish=ul,n.fragmentShader=`uniform float flatFinish;
`+n.fragmentShader,n.fragmentShader=n.fragmentShader.replace("#include <opaque_fragment>",`outgoingLight=mix(outgoingLight,diffuseColor.rgb,flatFinish);
#include <opaque_fragment>`)},i.customProgramCacheKey=()=>t+"-flat-color-finish",qu(i)}function Qp(i,e,t){let n=null,s=new $t(1,1,{depthBuffer:!1}),r={image:{value:null},original:{value:null},blend:{value:1},step:{value:new fe}},a=new kt({uniforms:r,depthTest:!1,depthWrite:!1,toneMapped:!1,vertexShader:`varying vec2 uvAt;
      void main(){uvAt=uv;gl_Position=vec4(position.xy,0.,1.);}`,fragmentShader:`uniform sampler2D image,original;uniform float blend;uniform vec2 step;varying vec2 uvAt;
      void main(){
        vec4 color=texture2D(image,uvAt)*.2270270270;
        color+=(texture2D(image,uvAt+step)+texture2D(image,uvAt-step))*.1945945946;
        color+=(texture2D(image,uvAt+2.*step)+texture2D(image,uvAt-2.*step))*.1216216216;
        color+=(texture2D(image,uvAt+3.*step)+texture2D(image,uvAt-3.*step))*.0540540541;
        color+=(texture2D(image,uvAt+4.*step)+texture2D(image,uvAt-4.*step))*.0162162162;
        gl_FragColor=mix(texture2D(original,uvAt),color,blend);
      }`}),o=new Zn,c=new Wi(-1,1,1,-1,0,1);o.add(new gt(new dn(2,2),a));let l=1,h=1;return{ready:i.compileAsync(o,c),fit(d,u){l=d,h=u;let f=i.getDrawingBufferSize(new fe);(!n||n.image.width!==f.x||n.image.height!==f.y)&&(n?.dispose(),n=new sa(f.x,f.y),n.minFilter=n.magFilter=St,i.initTexture(n));let m=Math.min(i.getPixelRatio(),Math.sqrt(18e5/(d*u))),y=Math.max(1,Math.round(d*m)),g=Math.max(1,Math.round(u*m));s.setSize(y,g),i.initRenderTarget(s)},render(d,u){if(u<=.01){i.render(e,d);return}let f=i.getRenderTarget(),m=i.autoClear,y=t.visible;try{t.visible=!1,i.autoClear=!0,i.render(e,d),i.copyFramebufferToTexture(n),r.original.value=n,r.blend.value=1,r.image.value=n,r.step.value.set(u*.5/l,0),i.setRenderTarget(s),i.render(o,c),r.image.value=s.texture,r.step.value.set(0,u*.5/h),r.blend.value=ot.smootherstep(u,0,.9),i.setRenderTarget(f),i.render(o,c),t.visible=y,i.autoClear=!1,i.clearDepth(),y&&i.render(t,d)}finally{t.visible=y,i.autoClear=m,i.setRenderTarget(f)}}}}var b1=[3,6,8,12,16,24,32,44,62],Zu={x:570/1130,y:590/1600};function em(i){if(i>=.24)return(i-.24/2)/(1-.24/2);let t=i/.24;return .24*(t*t*t-.5*t*t*t*t)/(1-.24/2)}var E1=`
attribute vec4 piece, tile;
attribute float depthRatio;
attribute vec4 appearance; // opacity, recession, blur, small-icon motion weight
attribute vec4 swim; // phase, speed, travel radius, landed radius (SVG units)
attribute vec4 scatter;
attribute vec2 gatherSpan;
uniform float cameraStart,cameraEnd,cameraNow,units,flight,recession,gather;
uniform float detailFlight,detailGather,detailTravel;
uniform float swimTime,swimScale,motionEnabled;
uniform vec2 wordSize,viewport,endPan,frameOffset;
varying vec2 uvAt,blurUV;
varying vec4 bounds;
varying vec3 printDetail;
varying float markInk;
void main(){
  float z=cameraEnd*depthRatio-recession*appearance.y;
  bool passesLens=z>=cameraStart;
  float distance=cameraNow-z;
  if(distance<=cameraNow*.012){gl_Position=vec4(2.,2.,2.,1.);return;}
  float atEnd=units*(cameraEnd-z);
  vec2 cloud=vec2(scatter.x-.5,.5-scatter.y)*viewport;
  vec2 portrait=vec2(piece.x-.5,.5-piece.y)*wordSize+frameOffset;
  // During the return zoom, tiny marks separate close to their letter instead
  // of racing across the whole viewport. Larger icons retain their full route.
  float travel=mix(1.,detailTravel,appearance.w);
  cloud=mix(portrait,cloud,travel);
  float iconGather=mix(gather,detailGather,appearance.w);
  float iconFlight=mix(flight,detailFlight,appearance.w);
  float joined=smoothstep(gatherSpan.x,gatherSpan.x+gatherSpan.y,iconGather);
  vec2 route=portrait-cloud;
  float bend=min(1.,min(viewport.x,viewport.y)/max(1.,length(route)))*.04*sin(swim.x);
  vec2 arc=vec2(-route.y,route.x)*bend*4.*joined*(1.-joined)*motionEnabled;
  vec2 center=endPan+(mix(cloud,portrait,joined)+arc)*atEnd;
  vec2 size=piece.zw*wordSize*atEnd*mix(scatter.z,1.,joined);

  float extraSway=0.;
  // The soft marks already occupy the rear plane while their foreground icons fly in.
  if(motionEnabled>.5 && appearance.z==0.){
    // Launch outside the *moving* viewport when the lens first clears this plane.
    float entry=max(cameraStart,z/.988);
    float start=log(entry/cameraStart)/log(cameraEnd/cameraStart);
    float t=clamp((iconFlight-start)/(1.-start),0.,1.);
    vec2 ray=endPan*((entry-cameraStart)/(cameraEnd-cameraStart));
    vec2 delta=center-ray;
    vec2 heading=vec2(cos(swim.x),sin(swim.x));
    vec2 radial=length(delta)>.0001?normalize(delta):heading;
    float edge=units*.5*min(viewport.x,viewport.y)*max(entry-z,entry*.04);
    vec2 dir=normalize(radial + (.20+.65*(1.-smoothstep(edge,edge*3.,length(delta))))*heading);
    float extent=units*.5*min(viewport.x/max(abs(dir.x),.001),viewport.y/max(abs(dir.y),.001))*max(entry-z,entry*.04);
    float margin=length(size)*.85+(swim.z+12.)*swimScale*atEnd;
    vec2 origin=ray+dir*max(length(delta)+edge*(.14+.10*sin(swim.x)),extent*1.08+margin);
    // Stagger by depth and individual phase. Both the travel and the extra sway
    // lose their velocity at the landing point.
    float remaining=pow(1.-t,2.25+.55*sin(swim.x));
    center=mix(center,origin,remaining*travel)
      +vec2(-dir.y,dir.x)*sin(swim.x*1.9)*edge*.58*t*remaining*travel;
    extraSway=10.*remaining*travel;
  }
  if(motionEnabled>.5){
    vec2 orbit=vec2(sin(swim.x+swimTime*swim.y),-.70*cos(swim.x*1.37+swimTime*swim.y*.81));
    // A sub-pixel drift wakes the small assembled marks before their staggered
    // routes open. It blends into the unfolding and is absent on zoom out.
    float wakingDrift=.65*(1.-travel)*joined;
    center+=orbit*(mix(swim.z*travel,swim.w,joined)+extraSway+wakingDrift)*swimScale*atEnd;
  }
  vec2 screenSize=size/(units*distance);
  // Relative to the grid at z=0: distant marks stay legible while the
  // silhouettes near the lens enlarge, fall out of focus and pass the frame.
  float magnification=(cameraEnd-z)*cameraNow/(cameraEnd*distance);
  float defocus=1.15*(1.-smoothstep(.28,.94,flight));
  float blur=min(clamp((magnification-1.)*3.2+defocus,0.,15.),.20*min(screenSize.x,screenSize.y));
  blur=max(blur,appearance.z*min(screenSize.x,screenSize.y));
  blur=max(blur,scatter.w*swimScale*(1.-joined));
  vec2 padding=2.*blur/max(screenSize,vec2(.01));
  vec2 corner=position.xy*(1.+2.*padding);
  bounds=vec4(tile.xy,tile.xy+tile.zw);
  uvAt=tile.xy+(vec2(corner.x,-corner.y)+.5)*tile.zw;
  blurUV=blur*tile.zw/max(screenSize,vec2(.01));
  vec2 point=center+corner*size;
  printDetail=vec3(2.*point/(viewport*units*max(cameraStart-z,.001)),passesLens?0.:1.);
  // Newly exposed planes gain ink gradually, including the peripheral marks.
  // Switching the group on must never reveal a fully opaque first frame.
  markInk=appearance.x*smoothstep(0.,.055,flight);
  gl_Position=projectionMatrix*modelViewMatrix*vec4(point,z,1.);
}`,T1=`
uniform sampler2D ink;
uniform vec2 halfTexel;
varying vec2 uvAt,blurUV;
varying vec4 bounds;
varying vec3 printDetail;
varying float markInk;
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
  color*=markInk;
  if(color.a<.003)discard;
  gl_FragColor=color;
}`;function tm(i,e,t,n=()=>{}){let s=window.MainWordSurface,r=new Map,a=new ln;a.name="\uACB0\uD569 \xB7 size-ordered depth field",e.add(a);let o=Qp(i,e,a),c=0,l={ink:{value:null},cameraStart:{value:1},cameraEnd:{value:8},cameraNow:{value:1},units:{value:1},halfTexel:{value:new fe},endPan:{value:new fe},wordSize:{value:new fe},viewport:{value:new fe},frameOffset:{value:new fe},paperInk:{value:0},flight:{value:0},recession:vr,swimTime:{value:0},swimScale:{value:1},motionEnabled:{value:1},gather:{value:0},detailFlight:{value:0},detailGather:{value:0},detailTravel:{value:1}},h=new kt({uniforms:l,vertexShader:E1,fragmentShader:T1,transparent:!0,premultipliedAlpha:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),d=e.background,u=new Ve,f=new Ve,m=new V,y=new V,g=new V,p=null,E=null,b=null,_=0,M=0,T=null;function A(O){let B=[],U=[],q=[],G=[],H=[],j=[],ie=[];for(let ve of O)B.push(...ve.rect),U.push(...ve.tile),q.push(ve.depthRatio),G.push(ve.opacity??1,ve.backFraction??0,ve.blurRatio??0,1-ot.smoothstep(ve.size,8,20)),H.push(...ve.swim),j.push(...ve.scatter),ie.push(...ve.span);let ue=new ba,pe=new dn(1,1);ue.index=pe.index,ue.setAttribute("position",pe.attributes.position);for(let[ve,He,Ue]of[["piece",B,4],["tile",U,4],["depthRatio",q,1],["appearance",G,4],["swim",H,4],["scatter",j,4],["gatherSpan",ie,2]])ue.setAttribute(ve,new Rn(new Float32Array(He),Ue));return ue.instanceCount=O.length,ue}async function x(O){let{set:B,image:U,prints:q}=s.getSource(O);await U.decode();let G=new Nt(U);G.flipY=!1,G.premultiplyAlpha=!0,G.generateMipmaps=!1,G.minFilter=St,G.needsUpdate=!0;let H=B.s.map(([ee,W,z,F,N,X],oe)=>{let de=Math.max(z,F),P=Math.sin(oe*78.233)*43758.5453;return{rect:[(ee+z/2)/B.w,(W+F/2)/B.h,z/B.w,F/B.h],tile:[N/U.naturalWidth,X/U.naturalHeight,z/U.naturalWidth,F/U.naturalHeight],size:de,order:P-Math.floor(P),...q[oe]}}),j=[...H].sort((ee,W)=>ee.size-W.size||ee.order-W.order),ie=j[0].size,ue=j.at(-1).size;for(let ee=0;ee<j.length;ee++){let W=j[ee],z=(W.size-ie)/Math.max(1,ue-ie),F=ee/Math.max(1,j.length-1);W.depthRatio=.018+.685*Math.pow(z,1.22)+.145*Math.pow(F,1.65)}let pe=A(j),ve=pe.attributes.depthRatio.array,He=[];for(let ee of[...b1.filter(W=>W<ue),ue]){let W=j.findIndex(z=>z.size>=ee);He.push({size:j[W].size,depth:ve[W]})}let Ue=new gt(pe,h);Ue.frustumCulled=!1,Ue.renderOrder=4,r.set(O,{records:j,bySource:H,atlas:G,stops:He,layer:Ue,svgHeight:B.h,layeredCount:ve.reduce((ee,W)=>ee+(W>0),0),ordered:ve.every((ee,W)=>W===0||ee>=ve[W-1])})}function R(O,B){let U=s.getSurroundings(p);if(U===O.field)return;let q=U.map(j=>{let ie=O.bySource[j.sprite.sourceIndex],ue=Math.max(j.w,j.h)*O.svgHeight/B.h,pe=O.bySource[j.ownerIndex],ve=pe?[pe.scatter[0]+(j.x-B.x-pe.rect[0]*B.w)*pe.scatter[2]/_,pe.scatter[1]+(j.y-B.y-pe.rect[1]*B.h)*pe.scatter[2]/M,pe.scatter[2],0]:[j.x/_,j.y/M,1,0];return{...ie,rect:[(j.x-B.x)/B.w,(j.y-B.y)/B.h,j.w/B.w,j.h/B.h],depthRatio:j.blurRatio?.02+.0012*ue:ie.depthRatio,blurRatio:j.blurRatio,scatter:ve,span:pe?.span??ie.span,swim:j.swim,opacity:j.opacity,backFraction:j.detail?.8-(ie.size-3)*.13:0}});O.field=U,O.detailCount=U.filter(j=>j.detail).length;let G=[...q,...O.records].sort((j,ie)=>j.depthRatio-ie.depthRatio),H=A(G);O.layer.geometry.dispose(),O.layer.geometry=H}function D(O){let B=r.get(O);!B||p===O||(E&&a.remove(E),p=O,E=B.layer,a.add(E),l.ink.value=B.atlas,l.halfTexel.value.set(.5/B.atlas.image.width,.5/B.atlas.image.height),t())}let w=0,I=Promise.all([o.ready,...["light","dark"].map(async O=>{await x(O),n(++w,2)})]).then(()=>D(s.theme));return window.addEventListener("main-word-layout",t),{ready:I,fit(O,B,U){b=O.clone(),_=B,M=U,o.fit(B,U)},update(O,B,U,q,G,H){D(s.theme);let j=em(U),ie=ot.smootherstep(U,0,.16);B.visible=ie<1,B.material.opacity=1-ie,l.flight.value=j,l.gather.value=G,l.detailFlight.value=em(H.progress),l.detailGather.value=H.gather,l.detailTravel.value=H.travel,Mr.value=1-ot.smootherstep(U,.38,.88),c=3.2*ot.smootherstep(U,.12,.76),vr.value=0,u.copy(d).lerp(f.setHex(p==="dark"?0:16777215),ot.smootherstep(U,0,p==="dark"?.2:.16)),e.background=U>0?u:d;let ue=r.get(p),pe=s.frame;if(ue&&R(ue,pe),a.visible=!!(ue&&U>0),T=null,!b||!ue||q<=0)return;let ve=b.position.y-.003,He=Math.tan(ot.degToRad(b.fov/2)),Ue=ot.clamp(Math.min(_,M)/12/(12*pe.w/1130),9,19),ee=ve*Ue,W=ve*Math.pow(Ue,j),z=2*He/M;Wu.value=ve,y.setFromMatrixColumn(b.matrixWorld,0),m.setFromMatrixColumn(b.matrixWorld,1),g.set(b.position.x,.003,b.position.z),a.position.copy(g),a.quaternion.copy(b.quaternion);let F=l;F.cameraStart.value=ve,F.cameraEnd.value=ee,F.cameraNow.value=W,F.swimTime.value=s.time,F.swimScale.value=pe.h/ue.svgHeight,F.motionEnabled.value=Number(s.motionEnabled),F.units.value=z,F.wordSize.value.set(pe.w,pe.h),F.viewport.value.set(_,M),F.frameOffset.value.set(pe.x+pe.w/2-_/2,M/2-pe.y-pe.h/2);let N=_/2-pe.x-pe.w*Zu.x,X=pe.y+pe.h*Zu.y-M/2;if(F.endPan.value.set(N*z*ee,X*z*ee),U>0){let de=(W-ve)/(ee-ve);O.position.lerp(b.position,ie).addScaledVector(y,N*z*ee*de).addScaledVector(m,X*z*ee*de),O.position.y+=W-ve,O.quaternion.slerp(b.quaternion,ie),O.view?.enabled&&(O.view.offsetX*=1-ie,O.view.offsetY*=1-ie),O.near=Math.max(.05,W*.012),O.far=ee*3+250,O.updateProjectionMatrix(),O.updateMatrixWorld(!0),e.fog.near=W+45,e.fog.far=W+110}F.paperInk.value=1-Mr.value/(1+Xu*((W+vr.value)/ve-1));let oe=W*.988/ee;T={distance:W,zoom:ee/W,flight:j,gather:G,detail:Zu,wordPieces:ue.records.length,printsVisible:a.visible,detailFlight:l.detailFlight.value,detailGather:l.detailGather.value,detailTravel:l.detailTravel.value,position:O.position.toArray(),quaternion:O.quaternion.toArray(),entrance:ie,gridInk:Mr.value,gridRecession:vr.value,gridBlur:c,surroundings:ue.field.length,detailPrints:ue.detailCount,layeredPieces:ue.layeredCount,sizeDepthOrdered:ue.ordered,sizeDepths:ue.stops,passedSizeStops:ue.stops.filter(de=>oe>=de.depth).map(de=>de.size),frame:{...pe},theme:p}},render(O){o.render(O,Mr.value>0?c:0)},inspect:()=>T}}var ii=[-10,30,16],vs=1,fl=4,pl=16,rn=256;function*nm(i,e,t,n=0){let s=document.createElement("canvas");s.width=s.height=fl*rn;let r={willReadFrequently:!0},a=s.getContext("2d",r),o=document.createElement("canvas");o.width=o.height=rn;let c=o.getContext("2d",r),l=document.createElement("canvas");l.width=l.height=rn;let h=l.getContext("2d",r),d=rn/e,u=Math.cos(n),f=Math.sin(n),m=(_,M,T,A,x)=>[(_-T*(u*A-f*x)/ii[1])*d+rn/2,(M-T*(f*A+u*x)/ii[1])*d+rn/2];function y(_,M,T=!0){let A=0;for(let x=0;x<M.length;x++){let R=M[x],D=M[(x+1)%M.length];A+=R[0]*D[1]-D[0]*R[1]}A>0!==T&&M.reverse(),_.moveTo(...M[0]);for(let x=1;x<M.length;x++)_.lineTo(...M[x]);_.closePath()}function g(_,M,T){let A=new Path2D;for(let x of i.contours){let R=x.points.map(([w,I])=>m(w,I,.003,M,T)),D=x.points.map(([w,I])=>m(w,I,_+.003,M,T));y(A,[...R],!x.hole),y(A,[...D],!x.hole);for(let w=0;w<R.length;w++){let I=(w+1)%R.length;y(A,[R[w],R[I],D[I],D[w]])}}return A}let p=g(0,ii[0],ii[2]),E=Array.from({length:12},(_,M)=>{let T=11*Math.sqrt((M+.5)/12),A=M*2.39996323;return[ii[0]+Math.cos(A)*T,ii[2]+Math.sin(A)*T]});for(let _=0;_<pl;_++){let M=i.height*t*_/(pl-1);c.clearRect(0,0,rn,rn),c.fillStyle="#fff",c.globalCompositeOperation="lighter",c.globalAlpha=.72/E.length;for(let[T,A]of E)c.fill(g(M,T,A)),yield 1/(pl*E.length);h.clearRect(0,0,rn,rn),h.globalAlpha=1,h.filter=`blur(${(.018+M*.018)*d}px)`,h.drawImage(o,0,0),c.clearRect(0,0,rn,rn),c.globalAlpha=1,c.globalCompositeOperation="source-over",c.fill(p),h.globalAlpha=.35,h.filter=`blur(${.035*d}px)`,h.drawImage(o,0,0),a.drawImage(l,_%fl*rn,(fl-1-Math.floor(_/fl))*rn)}let b=new hn(s);return b.colorSpace=vt,b.generateMipmaps=!1,b.minFilter=b.magFilter=St,b.userData={style:"height-aware-area-light",frames:pl,light:ii},b}function ml(i=null,e=!1){let t=new Xt({map:i,transparent:!0,opacity:1,depthWrite:!1,color:13225686,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4}),n={value:0};return t.userData.shadowHeight=n,t.onBeforeCompile=s=>{s.uniforms.shadowHeight=n,s.vertexShader=`varying float vShadowHeight;
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
    `)},t.customProgramCacheKey=()=>"height-aware-ground-shadow-"+e,t}function im(i,e,t,n,s,r,a){let{stepX:o,stepZ:c,originZ:l}=i,h=t-e+1,d=s-n+1,u=(e-.5)*o,f=l-(s+.5)*c,m=h*o,y=d*c,g=Math.min(96,Math.floor(2048/Math.max(h,d)))||1,p=document.createElement("canvas");p.width=h*g,p.height=d*g;let E=p.getContext("2d"),b=g/o,_=g/c;function M(B,U,q){E.setTransform(b,0,0,_,(B-u)*b,(U-f)*_),E.fillStyle=r[q].color,E.fill(r[q].caster.path)}r.forEach(({mesh:B},U)=>M(B.position.x,B.position.z,U)),a.forEach(({x:B,z:U,sourceIndex:q})=>M(B,U,q));let T=new hn(p);T.flipY=!1,T.colorSpace=vt,T.wrapS=T.wrapT=xn;let A=new At,x=[],R=[],D=[];function w(B,U,q,G){let H=x.length/3;for(let[j,ie]of[[B,U],[B,G],[q,G],[q,U]])x.push(u+j*m,.003,f+ie*y),R.push(j,ie);D.push(H,H+1,H+2,H,H+2,H+3)}w(-20,-20,21,0),w(-20,1,21,21),w(-20,0,0,1),w(1,0,21,1),A.setAttribute("position",new yt(x,3)),A.setAttribute("uv",new yt(R,2)),A.setIndex(D);let I=qu(new Xt({map:T,transparent:!0,depthWrite:!1,toneMapped:!1,fog:!1})),O=new gt(A,I);return O.name="Continuous flat icon grid",O.visible=!1,O}function w1(i,e){let t=i.clone();return t.transparent=!0,t.opacity=1,t.color.set(e),t.emissive.set(e),t.onBeforeCompile=n=>{n.uniforms.neutralEmissive={value:new Ve(16777215).multiplyScalar(t.emissiveIntensity)},n.vertexShader=`attribute float instanceReveal; attribute float instanceTint; varying float vReveal; varying float vTint;
`+n.vertexShader,n.vertexShader=n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vReveal=instanceReveal; vTint=instanceTint;`),n.fragmentShader=`varying float vReveal; varying float vTint; uniform vec3 neutralEmissive;
`+n.fragmentShader,n.fragmentShader=n.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
diffuseColor.rgb=mix(vec3(1.0),diffuseColor.rgb,vTint); diffuseColor.a *= vReveal;`),n.fragmentShader=n.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
totalEmissiveRadiance=mix(neutralEmissive,totalEmissiveRadiance,vTint);`)},t.customProgramCacheKey=()=>"floor-pattern-color-reveal",dl(t)}var gl=class{constructor(e,t,n){this.scene=e,this.sources=t,this.material=n,this.copies=[],this.batches=[],this.key="",this.stats={count:0,visible:0,complete:0,active:0},this.transform=new It}fit(e,t,n,s){let r=new _i,a=new Wt(new V(0,1,0),-.003),o=[];for(let M of e)for(let T of[-1.16,1.16])for(let A of[-1.16,1.16]){r.setFromCamera(new fe(T,A),M);let x=r.ray.intersectPlane(a,new V);x&&o.push(x)}let c=hl(t),l=new zt().setFromPoints(o),h=Math.floor((c.originZ-l.max.z)/c.stepZ)-1,d=Math.ceil((c.originZ-l.min.z)/c.stepZ)+1,u=Math.floor(l.min.x/c.stepX)-1,f=Math.ceil(l.max.x/c.stepX)+1,m=[t,h,d,u,f,n.layout,n.depth,s.x.toFixed(5),s.z.toFixed(5)].join(":");if(this.coverage={left:l.min.x,right:l.max.x,front:l.max.z,back:l.min.z},m===this.key)return;this.clear(),this.key=m;let y=new Map(this.sources.map(({mesh:M},T)=>{let A=Math.round((c.originZ-M.position.z)/c.stepZ);return[A+":"+Math.round(M.position.x/c.stepX-c.offset(A)),T]})),g=n.layout==="scattered"?Xp({left:u*c.stepX,right:f*c.stepX,back:c.originZ-d*c.stepZ,front:c.originZ-h*c.stepZ},this.sources):[];if(n.layout==="grid")for(let M=h;M<=d;M++)for(let T=u;T<=f;T++){if(y.has(M+":"+T))continue;let A=(T+c.offset(M))*c.stepX,x=c.originZ-M*c.stepZ;g.push({x:A,z:x,row:M,col:T,rotation:0})}if(n.layout==="grid"){let M=Si(192807),T=[...g],A=this.sources.map(()=>1);for(let x=T.length-1;x>0;x--){let R=Math.floor(M()*(x+1));[T[x],T[R]]=[T[R],T[x]]}for(let x of T){let R=new Set;for(let O=x.row-2;O<=x.row+2;O++)for(let B=x.col-2;B<=x.col+2;B++){let U=y.get(O+":"+B);U!==void 0&&R.add(U)}let D=A.map((O,B)=>B).filter(O=>!R.has(O)),w=Math.min(...D.map(O=>A[O])),I=D.filter(O=>A[O]===w);x.sourceIndex=I[Math.floor(M()*I.length)],x.radius=this.sources[x.sourceIndex].radius,A[x.sourceIndex]++,y.set(x.row+":"+x.col,x.sourceIndex)}}let p=M=>Math.hypot(M.x-s.x,M.z-s.z);g.forEach(M=>{M.radial=p(M)});let E=[...g.map(M=>M.radial),...this.sources.slice(_r).map(M=>p(M.mesh.position))],b=Math.min(...E),_=Math.max(...E);this.wave={origin:{x:s.x,z:s.z},nearest:b,farthest:_},this.sources.forEach((M,T)=>{M.cue=T<_r?Kp(T):Gu(p(M.mesh.position),b,_)}),this.sources.forEach((M,T)=>{let A=g.filter(q=>q.sourceIndex===T);if(!A.length)return;let x=M.mesh.geometry.clone(),R=M.shadow.geometry.clone(),D=new Rn(new Float32Array(A.length),1),w=new Rn(new Float32Array(A.length),1),I=new Rn(new Float32Array(A.length),1);x.setAttribute("instanceReveal",D),R.setAttribute("instanceReveal",w),x.setAttribute("instanceTint",I);let O=new tr(x,w1(M.mesh.material,M.color),A.length),B=new tr(R,ml(M.patternShadow,!0),A.length);B.layers.set(vs),O.name=M.icon.id+"-pattern",B.name=M.icon.id+"-pattern-contact",B.renderOrder=1,O.castShadow=O.receiveShadow=!1,O.frustumCulled=B.frustumCulled=!1,O.instanceMatrix.setUsage(fr),B.instanceMatrix.setUsage(fr),this.scene.add(O,B);let U={mesh:O,shadow:B,fill:D,contact:w,tint:I};this.batches.push(U),A.forEach((q,G)=>{let H=new It;H.position.set(q.x,.003,q.z),H.rotation.y=q.rotation;let j=Gu(q.radial,b,_),ie={...q,icon:M.icon,color:M.color,mesh:H,caster:M.caster,heightFactor:M.heightFactor,batch:U,slot:G,cue:j};ie.reveal=al(ie,M.reveal),ie.reveal.group.visible=!1,sl(ie.reveal,n.layout==="grid"?c:null),this.scene.add(ie.reveal.group),this.copies.push(ie),this.transform.position.set(q.x,.001,q.z),this.transform.rotation.set(-Math.PI/2,0,q.rotation),this.transform.scale.setScalar(1),this.transform.updateMatrix(),B.setMatrixAt(G,this.transform.matrix)}),B.instanceMatrix.needsUpdate=!0}),n.layout==="grid"&&(this.extension=im(c,u,f,h,d,this.sources,this.copies),this.scene.add(this.extension)),this.stats.count=this.copies.length}update(e,t,n){let s=0,r=0,a=0,o=0,c=ll(e);this.extension&&(this.extension.visible=c===1),this.batches.forEach(l=>{l.dirty=!1});for(let l of this.copies){let h=e>=l.cue.start,d=yr(e,l.cue);if(h&&d>=Fn&&c===0&&l.settled){s++,r++;continue}if(h&&c===1&&l.finalized){s++,r++,o++;continue}if(!h&&l.dormant)continue;l.settled=h&&d>=Fn&&c===0,l.finalized=h&&c===1,l.dormant=!h,l.batch.dirty=!0;let u=t.depth*l.heightFactor,f=zu(l,d,h,u,c);(f.phase==="solid"||f.phase==="flat")&&(l.reveal.group.visible=!1),this.transform.position.copy(l.mesh.position),this.transform.rotation.copy(l.mesh.rotation),this.transform.scale.set(h?1:0,Math.max(.001,f.extrusion)*u,h?1:0),this.transform.updateMatrix(),l.batch.mesh.setMatrixAt(l.slot,this.transform.matrix),l.batch.fill.setX(l.slot,h?f.fill:0),l.batch.contact.setX(l.slot,h?f.extrusion:0),l.batch.tint.setX(l.slot,h?f.tint:0),h&&(f.fill>0||f.lineOpacity>0)&&s++,h&&f.complete&&r++,h&&(!f.complete||c>0&&c<1)&&a++,h&&f.phase==="flat"&&o++}for(let l of this.batches)l.dirty&&(l.mesh.visible=l.fill.array.some(h=>h>0),l.shadow.visible=l.contact.array.some(h=>h>0),l.mesh.instanceMatrix.needsUpdate=!0,l.fill.needsUpdate=l.contact.needsUpdate=l.tint.needsUpdate=!0),l.shadow.material.opacity=n;this.stats={count:this.copies.length,visible:s,complete:r,active:a,flattened:o}}isFlashing(){return this.copies.some(e=>e.reveal.active&&performance.now()-e.reveal.sparkAt<360)}inspect(){return{...this.stats,coverage:this.coverage,wave:this.wave,instances:this.copies.map(e=>({id:e.icon.id,color:new Ve(16777215).lerp(e.reveal.targetColor,e.batch.tint.getX(e.slot)).getHexString(),tint:e.batch.tint.getX(e.slot),fill:e.batch.fill.getX(e.slot),flatness:e.reveal.state.flatness,lineOpacity:e.reveal.state.lineOpacity,lineColor:e.reveal.lines[0].material.color.getHexString(),x:e.x,z:e.z,radius:e.radius,rotation:e.rotation,cue:e.cue,visible:e.batch.fill.getX(e.slot)>0,extrusion:e.batch.contact.getX(e.slot),guide:rl(e.reveal),drawingVisible:e.reveal.group.visible,pointVisible:e.reveal.group.visible&&e.reveal.dot.visible,strokeVertices:e.reveal.lines.reduce((t,n)=>t+n.geometry.drawRange.count,0),phase:e.reveal.state.phase}))}}clear(){this.extension&&(this.scene.remove(this.extension),this.extension.material.map.dispose(),this.extension.material.dispose(),this.extension.geometry.dispose(),this.extension=null);for(let e of this.copies)this.scene.remove(e.reveal.group),e.reveal.guide.geometry.dispose(),e.reveal.guide.material.dispose(),e.reveal.lines.forEach(t=>t.geometry.dispose()),e.reveal.lines[0].material.dispose(),e.reveal.dot.material.dispose(),e.reveal.halo.material.dispose();for(let{mesh:e,shadow:t}of this.batches)this.scene.remove(e,t),e.dispose(),t.dispose(),e.geometry.dispose(),t.geometry.dispose(),e.material.dispose(),t.material.dispose();this.copies=[],this.batches=[]}};var sm=Qt+Dn+Un*.5,A1=[sm,Mn[1].start+Nn+vi*.46,Mn[2].start+Nn+vi*.66,On,On+(Sn-On)*.604,Sn,bi],xl=(i,e,t)=>i+(e-i)*t;function Qi(i,e){let t=A1,n=t.length-1;if(i<=t[0])return e[0];if(i>=t[n])return e[n];let s=t.slice(1).map((u,f)=>u-t[f]),r=s.map((u,f)=>(e[f+1]-e[f])/u),a=e.map((u,f)=>{if(!f||f===n||r[f-1]*r[f]<=0)return 0;let m=2*s[f]+s[f-1],y=s[f]+2*s[f-1];return(m+y)/(m/r[f-1]+y/r[f])}),o=t.findIndex((u,f)=>f<n&&i<t[f+1]),c=s[o],l=(i-t[o])/c,h=l*l,d=h*l;return(2*d-3*h+1)*e[o]+(d-2*h+l)*c*a[o]+(-2*d+3*h)*e[o+1]+(d-h)*c*a[o+1]}function _l(i,e,t,n=1){let s=Math.max(0,Math.min(bi,i)),[r,a,o]=e,c=t.distance-r.distance,l=(y,g)=>xl(o[y],t[y],g),h=[r.center,a.center,o.center,...[.16,.65,.9,1].map(y=>({x:xl(o.center.x,t.center.x,y),y:xl(o.center.y,t.center.y,y),z:xl(o.center.z,t.center.z,y)}))],d={};for(let y of["x","y","z"])d[y]=Qi(s,h.map(g=>g[y]));d.y+=n*Qi(s,[0,.06,.1,.18,.3,.12,0]);let u=Qi(s,[r.distance,a.distance*1.02,o.distance*1.08,r.distance+c*.06,r.distance+c*.4,r.distance+c*.7,t.distance]),f=Qi(s,[r.yaw,a.yaw,o.yaw,l("yaw",.18),l("yaw",.58),l("yaw",.82),t.yaw]),m=Qi(s,[r.pitch,a.pitch,o.pitch,o.pitch+1,o.pitch+3,68,90]);return{center:d,distance:u,yaw:f,pitch:m,shiftX:Qi(s,[r.shiftX,a.shiftX,o.shiftX,l("shiftX",.16),l("shiftX",.65),l("shiftX",.9),t.shiftX]),shiftY:Qi(s,[r.shiftY,a.shiftY,o.shiftY,l("shiftY",.16),l("shiftY",.65),l("shiftY",.9),t.shiftY]),fov:34,roll:n?Qi(s,[0,-.018,-.02,-.016,-.012,-.008,0]):0,solo:s<On,index:$p(s),travelling:s>sm&&s<bi,pullback:Math.max(0,Math.min(1,(u-o.distance*1.08)/(t.distance-o.distance*1.08))),overhead:Math.max(0,Math.min(1,(m-o.pitch)/(90-o.pitch)))}}var vl=1.25,ju=$i+Qt,yl=ju*(vl-1),br=Sn-.65,Er=1.6,Ms=.6,R1=Ms*(1+Er)/2,Yu=i=>Math.max(0,Math.min(ni,i));function rm(i){if(i>=Ms)return i*Er-(Er-1)*Ms/2;let e=i/Ms;return i+(Er-1)*Ms*(e*e*e-.5*e*e*e*e)}function C1(i){let e=i<=ju*vl?i/vl:i-yl;return e<=br?Yu(e):Yu(br+rm(e-br))}function Sl(i){let e=Yu(i),t=e-br;if(e<=ju)return e*vl;if(t<=0)return e+yl;if(t>=R1)return br+yl+(t+(Er-1)*Ms/2)/Er;let n=0,s=Ms;for(let r=0;r<32;r++){let a=(n+s)/2;rm(a)<t?n=a:s=a}return br+yl+(n+s)/2}var I1=ku,P1=Sn+.45,L1=6.2,Ml=Sl(I1),Ju=Sl(P1),Ss=Ju-Ml,Bn=Math.min(.6,Ss/2),am=(L1-Bn)/(Ss-Bn),$u=(1-am)*(Ss-Bn),Ku=i=>i*i*i-.5*i*i*i*i;function Qu(i){let e=i-Ml;if(e<=0)return i;if(e>=Ss)return i-$u;let t=e<Bn?Bn*Ku(e/Bn):e>Ss-Bn?Ss-Bn-Bn*Ku((Ss-e)/Bn):e-Bn/2;return i-(1-am)*t}function N1(i){if(i<=Ml)return i;if(i>=Ju-$u)return i+$u;let e=Ml,t=Ju;for(let n=0;n<36;n++){let s=(e+t)/2;Qu(s)<i?e=s:t=s}return(e+t)/2}var D1=Mn[1].start,Tr=.5,Sr=Qu(Sl(D1)),bs=.6,U1=bs*(1+Tr)/2;function om(i){let e=i-Sr;return e<=0?i:e>=bs?Sr+e*Tr+(1-Tr)*bs/2:i-(1-Tr)*bs*Ku(e/bs)}function F1(i){let e=i-Sr;if(e<=0)return i;if(e>=U1)return Sr+(e-(1-Tr)*bs/2)/Tr;let t=Sr,n=Sr+bs;for(let s=0;s<36;s++){let r=(t+n)/2;om(r)<i?t=r:n=r}return(t+n)/2}function cm(i){return C1(N1(F1(i)))}function O1(i){return om(Qu(Sl(i)))}var ed=O1(ni),lm=.85,B1=.42,hm=100+ed*115*B1-lm*100;function um(i,e,t){let n=t*lm;return{start:i-n,distance:Math.max(1,e-t+n)}}var td=200,nd=20,dm=2;function fm(i){let e=document.createElement("canvas");e.width=e.height=128;let t=e.getContext("2d");t.fillStyle="#ffffff",t.fillRect(0,0,128,128),t.fillStyle="#dddddd",t.beginPath(),t.arc(64,64,128*dm/nd/2,0,Math.PI*2),t.fill();let n=new hn(e);n.colorSpace=vt,n.wrapS=n.wrapT=xn,n.anisotropy=i.capabilities.getMaxAnisotropy();let s={value:1},r=new Xt({name:"White dotted floor",map:n,color:16777215,toneMapped:!1,depthWrite:!1,transparent:!0});r.onBeforeCompile=c=>{c.uniforms.dotOpacity=s,c.fragmentShader=`uniform float dotOpacity;
`+c.fragmentShader,c.fragmentShader=c.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
       diffuseColor.rgb=mix(vec3(1.0),diffuseColor.rgb,dotOpacity);`)},r.customProgramCacheKey=()=>"dotted-floor-fade";let a=new gt(new dn(td,td),r);a.name="White floor",a.rotation.x=-Math.PI/2,a.renderOrder=-1;let o=0;return{mesh:a,fit(c,l,h=34){o=2*(c.distance+c.center.y)*Math.tan(ot.degToRad(h)/2)/l*nd,n.repeat.setScalar(td/o)},update(c,l){s.value=l?1-ot.smoothstep(c,70,90):1},inspect(){return{color:"#dddddd",spacingPx:nd,diameterPx:dm,worldSpacing:o,opacity:s.value}}}}var bl="http://www.w3.org/2000/svg",id="#FF3C3C",pm=i=>Math.max(0,Math.min(1,i)),wr=i=>{let e=pm(i);return e*e*(3-2*e)};function mm(i,e){let t=Number(e.icon.viewBox.trim().split(/[\s,]+/)[3]),n=String(Number(t.toFixed(2))),s=document.createElementNS(bl,"svg");s.setAttribute("class","opening-dimension"),s.setAttribute("aria-hidden","true"),Object.assign(s.style,{position:"absolute",inset:"0",width:"100%",height:"100%",pointerEvents:"none",display:"none"});let r=document.createElementNS(bl,"g");r.setAttribute("stroke",id),r.setAttribute("stroke-width","1"),r.setAttribute("fill","none"),s.append(r);let a=["upper-cap","stem","lower-cap"].map(u=>{let f=document.createElementNS(bl,"line");return f.setAttribute("data-part",u),r.append(f),f}),o=document.createElementNS(bl,"text");o.textContent=n,o.setAttribute("fill",id),o.setAttribute("stroke","none"),o.setAttribute("dominant-baseline","middle"),o.setAttribute("font-family","Handjet, monospace"),o.setAttribute("font-weight","400"),o.style.fontVariantNumeric="tabular-nums",r.append(o),i.append(s);let c={visible:!1,label:n,svgHeight:t,color:id,progress:0,opacity:0},l=new V;function h(u,f,m,y,g){return l.set(u,.008,f),e.reveal.group.localToWorld(l),l.project(m),{x:(l.x+1)*y/2,y:(1-l.y)*g/2}}function d(u,f,m){u.setAttribute("x1",f.x),u.setAttribute("y1",f.y),u.setAttribute("x2",m.x),u.setAttribute("y2",m.y)}return{update(u,f,m,y){let g=pm((u-xs)/Qt),p=wr(g/.12)*(1-wr((u-tl)/Op))*e.reveal.state.guideOpacity;if(c={...c,visible:p>.001,progress:g,opacity:p},s.style.display=c.visible?"block":"none",r.setAttribute("opacity",p),!c.visible)return;s.setAttribute("viewBox",`0 0 ${m} ${y}`);let{minZ:E,maxZ:b,maxX:_}=e.reveal.guide.userData.bounds,M=h(_,E,f,m,y),T=h(_,b,f,m,y),A=Math.hypot(T.x-M.x,T.y-M.y),x={x:(T.y-M.y)/A,y:-(T.x-M.x)/A},R={x:M.x+x.x*9,y:M.y+x.y*9},D={x:T.x+x.x*9,y:T.y+x.y*9},w=wr(g/.2),I=wr((g-.1)/.55),O=wr((g-.62)/.18),B=(j,ie)=>[{x:j.x-x.x*6*ie,y:j.y-x.y*6*ie},{x:j.x+x.x*6*ie,y:j.y+x.y*6*ie}];d(a[0],...B(R,w)),d(a[1],R,{x:R.x+(D.x-R.x)*I,y:R.y+(D.y-R.y)*I}),d(a[2],...B(D,O));let U=wr((u-el)/(Qt*.2)),q=m<500?12:14,G=(R.x+D.x)/2+x.x*(7+(1-U)*5),H=(R.y+D.y)/2+x.y*7;o.setAttribute("x",G),o.setAttribute("y",H),o.setAttribute("font-size",q),o.setAttribute("opacity",U),c={...c,upper:w,stem:I,lower:O,labelOpacity:U,top:R,bottom:D,labelPosition:{x:G,y:H},fontSize:q}},inspect(){return{...c}}}}var El="http://www.w3.org/2000/svg",z1=i=>Math.max(0,Math.min(1,i)),Ba=i=>{let e=z1(i);return e*e*(3-2*e)},Tl=i=>String(Number(i.toFixed(2)));function gm(i,e){let[t,n,s,r]=e.icon.viewBox.trim().split(/[\s,]+/).map(Number),a=e.caster.svgBounds,o=t+s/2,c=n+r/2,l=e.caster.contours.filter(w=>!w.hole).map(w=>{let I=w.points.map(([pe])=>t+(pe-a.minX)/(a.maxX-a.minX)*s),O=w.points.map(([,pe])=>n+(pe-a.minZ)/(a.maxZ-a.minZ)*r),B=Math.min(...I),U=Math.max(...I),q=Math.min(...O),G=Math.max(...O),H=(B+U)/2,j=(q+G)/2,ie=Math.hypot(H-o,j-c)||1,ue=I.map((pe,ve)=>((pe-o)*(H-o)+(O[ve]-c)*(j-c))/ie);return{left:B,right:U,top:q,bottom:G,centerX:H,centerY:j,radius:Math.max(...I.map((pe,ve)=>Math.hypot(pe-o,O[ve]-c))),radialInner:Math.min(...ue),radialOuter:Math.max(...ue)}}),h=l.filter(w=>w.left<o&&w.right>o&&w.bottom<c).sort((w,I)=>w.top-I.top)[0],d=l.filter(w=>w.left<o&&w.right>o&&w.top<c&&w.bottom>c),u=Math.max(...d.map(w=>w.radius)),f=d.sort((w,I)=>(w.right-w.left)*(w.bottom-w.top)-(I.right-I.left)*(I.bottom-I.top))[0],m=[c-h.top,c-h.bottom,u],y=l.filter(w=>(w.right<o||w.left>o)&&(w.bottom<c||w.top>c)),g=["radialOuter","radialInner"].map(w=>y.reduce((I,O)=>I+O[w],0)/y.length),p=document.createElementNS(El,"svg");p.setAttribute("class","opening-construction"),p.setAttribute("aria-hidden","true"),p.style.cssText="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;display:none";let E=document.createElementNS(El,"g");p.append(E),i.append(p);function b(w,I,O){let B=document.createElementNS(El,"path");return B.dataset.part=w,B.setAttribute("fill","none"),B.setAttribute("stroke",I),B.setAttribute("stroke-width",O),B.setAttribute("stroke-linecap","round"),E.append(B),B}let _=m.map((w,I)=>({element:b(["outer-circle","inner-circle","center-circle"][I],"#b0b7bf",.85),radius:w,centerX:o,centerY:c,start:.08+I*.24,duration:1.08,direction:I?-1:1}));g.forEach((w,I)=>_.push({element:b(`small-box-${I?"inner":"outer"}-circle`,"#b0b7bf",.85),radius:w,centerX:o,centerY:c,start:.72+I*.22,duration:.78,direction:I?-1:1}));let M=[b("horizontal-axis","#c3c9cf",.65),b("vertical-axis","#c3c9cf",.65)];M.forEach(w=>w.setAttribute("stroke-dasharray","3 5"));let T=[{name:"block-width",value:Tl(h.right-h.left),a:[h.left,h.top-8],b:[h.right,h.top-8],anchor:"middle",offset:[0,-9],start:.64},{name:"block-height",value:Tl(h.bottom-h.top),a:[h.right+8,h.top],b:[h.right+8,h.bottom],anchor:"start",offset:[6,0],start:.98},{name:"center-width",value:Tl(f.right-f.left),a:[f.left,f.top-8],b:[f.right,f.top-8],anchor:"middle",offset:[0,-9],start:1.12},{name:"center-height",value:Tl(f.bottom-f.top),a:[f.right+8,f.top],b:[f.right+8,f.bottom],anchor:"start",offset:[6,0],start:1.32}].map(w=>{let I=b(w.name,"#FF3C3C",1),O=document.createElementNS(El,"text");return O.textContent=w.value,O.dataset.part=w.name+"-value",O.setAttribute("fill","#FF3C3C"),O.setAttribute("font-family","Handjet, monospace"),O.setAttribute("font-weight","400"),O.setAttribute("text-anchor",w.anchor),O.setAttribute("dominant-baseline","middle"),O.setAttribute("stroke","#fff"),O.setAttribute("stroke-width","3"),O.setAttribute("stroke-linejoin","round"),O.setAttribute("paint-order","stroke"),O.style.fontVariantNumeric="tabular-nums",E.append(O),{...w,element:I,label:O}}),A=new V;function x(w,I,O,B,U){return A.set(a.minX+(w-t)/s*(a.maxX-a.minX),.009,a.minZ+(I-n)/r*(a.maxZ-a.minZ)),e.reveal.group.localToWorld(A),A.project(O),{x:(A.x+1)*B/2,y:(1-A.y)*U/2}}function R(w,I,O,B,U,q,G){let H=x(...I,U,q,G),j=x(I[0]+(O[0]-I[0])*B,I[1]+(O[1]-I[1])*B,U,q,G);w.setAttribute("d",`M${H.x},${H.y}L${j.x},${j.y}`),w.setAttribute("opacity",B>0?1:0)}let D={visible:!1,opacity:0,circles:_.map(()=>0),dimensions:T.map(({value:w})=>({value:w,progress:0,labelOpacity:0}))};return{update(w,I,O,B){let U=w-tl,q=Ba(U/.24)*e.reveal.state.guideOpacity;if(D={...D,visible:e.reveal.group.visible&&q>.001,opacity:q},p.style.display=D.visible?"block":"none",E.setAttribute("opacity",q),!D.visible)return;p.setAttribute("viewBox",`0 0 ${O} ${B}`),D.circles=_.map(({element:j,radius:ie,centerX:ue,centerY:pe,start:ve,duration:He,direction:Ue})=>{let ee=Ba((U-ve)/He),W=Math.max(1,Math.ceil(ee*128)),z="";for(let F=0;F<=W;F++){let N=-Math.PI/2+ee*(F/W)*Math.PI*2*Ue,X=x(ue+Math.cos(N)*ie,pe+Math.sin(N)*ie,I,O,B);z+=(F?"L":"M")+X.x+","+X.y}return j.setAttribute("d",z),j.setAttribute("opacity",ee>0?1:0),ee});let G=Ba((U-.42)/.75),H=m[0];R(M[0],[o-H,c],[o+H,c],G,I,O,B),R(M[1],[o,c-H],[o,c+H],G,I,O,B),D.dimensions=T.map(({element:j,label:ie,value:ue,a:pe,b:ve,anchor:He,offset:Ue,start:ee})=>{let W=Ba((U-ee)/.46),z=Ba((U-ee-.32)/.32);R(j,pe,ve,W,I,O,B);let F=x((pe[0]+ve[0])/2,(pe[1]+ve[1])/2,I,O,B);return ie.setAttribute("x",F.x+Ue[0]+(He==="start"?(1-z)*4:0)),ie.setAttribute("y",F.y+Ue[1]+(He==="middle"?(1-z)*4:0)),ie.setAttribute("font-size",O<500?12:14),ie.setAttribute("opacity",z),{value:ue,progress:W,labelOpacity:z}})},inspect(){return{...D,block:h,radii:m}}}}function xm(i,e){let{guide:t}=e,n=t.userData.sweep,s="http://www.w3.org/2000/svg",r=document.createElementNS(s,"svg");r.classList.add("opening-guide-sweep"),r.setAttribute("aria-hidden","true"),r.style.cssText="position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:3;display:none",r.setAttribute("fill","none"),r.setAttribute("stroke","#"+n.material.color.getHexString()),r.setAttribute("stroke-width","1");let a=Array.from({length:4},()=>{let c=document.createElementNS(s,"line");return r.append(c),c});document.body.append(r),n.material.visible=!1;let o=new V;return{update(c){let l=e.group.visible&&t.visible&&n.visible;if(r.style.display=l?"block":"none",!l)return;let h=i.getBoundingClientRect(),d=n.geometry.attributes.position;r.setAttribute("viewBox",`0 0 ${innerWidth} ${innerHeight}`),r.setAttribute("opacity",String(n.material.opacity)),a.forEach((u,f)=>{for(let m=0;m<2;m++)o.fromBufferAttribute(d,f*2+m),n.localToWorld(o).project(c),u.setAttribute("x"+(m+1),String(h.left+(o.x+1)*h.width/2)),u.setAttribute("y"+(m+1),String(h.top+(1-o.y)*h.height/2))})}}}function _m(){if(window.MainIntro)return{setAutoHideProgress(h){window.MainIntro.headerProgress=h}};let i=document.querySelector(".header"),e=document.querySelector(".menu-button"),t=document.querySelector(".mobile-menu"),n=document.querySelector("main"),s=matchMedia("(max-width:759px)"),r=0,a=0,o=!1;function c(h=!1){let d=a>0&&!o;i.style.setProperty("--header-hide-offset",`calc(${-100*a}% - ${a}px)`),i.style.setProperty("--header-hide-opacity",String(1-a)),i.style.setProperty("--header-slide-duration",h?"0s":".4s"),i.style.setProperty("--header-background-duration",h?"0s":".6s"),i.classList.contains("is-intro-hidden")!==d&&i.classList.toggle("is-intro-hidden",d)}document.addEventListener("pointermove",h=>{h.pointerType!=="touch"&&(o=h.clientY<=i.offsetHeight+(o?16:0),c())},{passive:!0}),document.addEventListener("pointerleave",()=>{o=!1,c()}),i.addEventListener("focusin",()=>c()),i.addEventListener("focusout",()=>c());function l(h,d=!1){clearTimeout(r),e.setAttribute("aria-expanded",String(h)),e.setAttribute("aria-label",h?"\uBA54\uB274 \uB2EB\uAE30":"\uBA54\uB274 \uC5F4\uAE30"),document.body.classList.toggle("mobile-menu-open",h),c(),n.inert=h,t.inert=!h,h?(t.hidden=!1,requestAnimationFrame(()=>{e.getAttribute("aria-expanded")==="true"&&t.classList.add("is-open")})):(t.classList.remove("is-open"),r=setTimeout(()=>{t.hidden=!0},280)),d&&e.focus({preventScroll:!0})}return e.addEventListener("click",()=>l(e.getAttribute("aria-expanded")!=="true")),document.querySelectorAll(".header a").forEach(h=>h.addEventListener("click",()=>l(!1))),document.addEventListener("keydown",h=>{if(e.getAttribute("aria-expanded")!=="true")return;if(h.key==="Escape"){l(!1,!0);return}if(h.key!=="Tab")return;let d=[...document.querySelectorAll(".header .logo a,.menu-button,.mobile-menu a")],u=d[0],f=d.at(-1);h.shiftKey&&document.activeElement===u?(h.preventDefault(),f.focus()):!h.shiftKey&&document.activeElement===f&&(h.preventDefault(),u.focus())}),s.addEventListener("change",()=>{s.matches||l(!1)}),{setAutoHideProgress(h){let d=Math.max(0,Math.min(1,h));d!==a&&(a=d,c(!0))}}}var k1=i=>Math.max(0,Math.min(1,i));function wl(i,e,t="[data-read]"){let n=matchMedia("(hover: hover) and (pointer: fine)"),s={x:0,y:0,active:!1},r=[...i.querySelectorAll(t)].map(m=>{let y=[...m.childNodes].filter(_=>_.nodeType===Node.TEXT_NODE).map(_=>_.textContent).join(""),g=document.createElement("span"),p=document.createElement("span");g.className="reading-source",g.textContent=y,p.className="reading-letters",p.setAttribute("aria-hidden","true");let E=m.hasAttribute("data-read"),b=Array.from(y,_=>{let M=document.createElement("span");return M.className="reading-char",M.textContent=_,E&&(M.dataset.glyph=_),p.append(M),{element:M,center:0,x:0,velocity:0,target:0}});for(let _ of[...m.childNodes])_.nodeType===Node.TEXT_NODE&&_.remove();return m.prepend(g,p),m.classList.add("reading-interactive"),{word:m,letters:p,chars:b,fontSize:0}}),a=0,o=0;function c(m){let y=Math.min(.03333333333333333,(m-o)/1e3||.016666666666666666);o=m;let g=!1;for(let p of r)for(let E of p.chars)E.velocity+=((E.target-E.x)*260-E.velocity*24)*y,E.x+=E.velocity*y,Math.abs(E.target-E.x)<.015&&Math.abs(E.velocity)<.05?(E.x=E.target,E.velocity=0):g=!0,E.element.style.transform=`translate3d(${E.x.toFixed(3)}px,0,0)`;a=g?requestAnimationFrame(c):0}function l(){a||(o=performance.now(),a=requestAnimationFrame(c))}function h(m=!1){s.active=!1;for(let y of r)for(let g of y.chars)g.target=0,m&&(g.x=0,g.velocity=0,g.element.style.transform="none");m?(cancelAnimationFrame(a),a=0):l()}function d(){if(!s.active)return;let m=i.getBoundingClientRect();if(s.x<m.left||s.x>m.right||s.y<m.top||s.y>m.bottom){h();return}let y=[];for(let g of r){let p=g.letters.getBoundingClientRect(),E=p.top+p.height/2,b=y.find(_=>Math.abs(_.center-E)<Math.min(_.height,p.height)*.25);b||(b={center:E,height:p.height,left:p.left,right:p.right,fontSize:g.fontSize,runs:[]},y.push(b)),b.left=Math.min(b.left,p.left),b.right=Math.max(b.right,p.right),b.fontSize=Math.max(b.fontSize,g.fontSize),b.runs.push({row:g,bounds:p})}for(let g of y){let p=(s.y-g.center)/(g.height*1.15),E=Math.pow(k1(1-p*p),2),b=g.fontSize*1.35,_=g.fontSize*.64,M=Math.max(0,g.left-s.x,s.x-g.right)/b,T=Math.exp(-M*M);for(let{row:A,bounds:x}of g.runs)for(let R of A.chars){let D=(x.left+R.center-s.x)/b;R.target=_*Math.tanh(D)*E*T,R.target=Math.max(20-g.left,Math.min(innerWidth-20-g.right,R.target))}}l()}function u(){for(let m of r){let y=m.letters.getBoundingClientRect();m.fontSize=parseFloat(getComputedStyle(m.word).fontSize),m.word.style.setProperty("--read-width",`${y.width}px`);for(let g of m.chars){let p=g.element.getBoundingClientRect(),E=p.left-y.left-g.x;g.center=E+p.width/2,g.element.style.setProperty("--char-left",`${E}px`)}}d()}i.addEventListener("pointermove",m=>{m.pointerType==="touch"||!n.matches||e.matches||(s.x=m.clientX,s.y=m.clientY,s.active=!0,d())}),i.addEventListener("pointerleave",()=>h()),i.addEventListener("pointercancel",()=>h()),window.addEventListener("blur",()=>h()),window.addEventListener("scroll",d,{passive:!0}),document.addEventListener("visibilitychange",()=>{document.hidden&&h(!0)}),e.addEventListener("change",()=>h(!0)),n.addEventListener("change",()=>h(!0));let f=new ResizeObserver(u);r.forEach(m=>f.observe(m.letters)),document.fonts.ready.then(u),u()}var ym=i=>Math.max(0,Math.min(1,i));function vm(i,e){let t=i.querySelectorAll("[data-read]");wl(i.querySelector(".individuality-title"),e);let n=0,s=0,r=0,a=0,o=!1;function c(){let d=s*t.length;t.forEach((u,f)=>{let m=ym((d-f)/.52);u.style.setProperty("--read-progress",String(m))})}function l(d){let u=Math.min(.05,(d-a)/1e3||.016666666666666666);a=d,s+=(n-s)*(1-Math.exp(-u/.09)),Math.abs(n-s)<5e-5&&(s=n),c(),r=s===n?0:requestAnimationFrame(l)}function h(d){n=ym(d);let u=i.getBoundingClientRect(),f=u.bottom<=0||u.top>=innerHeight;if(!o||f||e.matches){r&&cancelAnimationFrame(r),r=0,s=n,c(),o=!0;return}!r&&s!==n&&(a=performance.now(),r=requestAnimationFrame(l))}return e.addEventListener("change",()=>h(n)),c(),{update:h}}var Ar=[{id:"yun-jiwon",name:"\uC724\uC9C0\uC6D0",viewBox:"-14 -14 268 268",color:"#3b82a6",svg:'<path d="M190.62,161.45l16.88,16.88-29.17,29.17-16.88-16.88,29.17-29.17ZM207.5,61.67l-16.88,16.88-29.17-29.17,16.88-16.88,29.17,29.17ZM120,138.42l-18.42-18.42,18.42-18.42,18.42,18.42-18.42,18.42ZM32.5,61.67l29.17-29.17,16.88,16.88-29.17,29.17-16.88-16.88ZM32.5,178.33l16.88-16.88,29.17,29.17-16.88,16.88-29.17-29.17Z"/><path d="M27.78,144.01H0v-48.02h27.78v48.02ZM95.99,240v-27.78h48.02v27.78s-48.02,0-48.02,0ZM104.84,104.84h30.32v30.32s-30.32,0-30.32,0v-30.32ZM240,95.99v48.02s-27.78,0-27.78,0v-48.02h27.78ZM144.01,0v27.78h-48.02V0h48.02Z"/>'},{id:"seo-yeonwoo",name:"\uC11C\uC5F0\uC6B0",viewBox:"-14 -14 268 268",color:"#f59000",svg:'<path d="M89.99,30.04v30h59.98v-30L119.98.04l-29.99,30ZM30,150.04h29.99v-60h-29.99L.01,120.04l29.99,30ZM89.99,210.04l29.99,30,29.99-30v-30h-59.98v30ZM179.96,90.04v60h29.99l29.99-30-29.99-30h-29.99Z" fill-rule="evenodd"/>'},{id:"lee-nayeong",name:"\uC774\uB098\uC601",viewBox:"-14 -14 268 268",color:"#00aaff",svg:'<path d="M159.57,62.27v-24.19l17.3-17.3h24.19l17.3,17.3v24.19l-17.3,17.3h-24.19l-17.3-17.3ZM176.87,217.86l-17.3-17.3v-24.19l17.3-17.3h24.19l17.3,17.3v24.19l-17.3,17.3h-24.19ZM90.44,131.43v-24.22l17.27-17.27h24.22l17.27,17.27v24.22l-17.27,17.27h-24.22l-17.27-17.27ZM21.28,62.27v-24.19l17.3-17.3h24.19l17.3,17.3v24.19l-17.3,17.3h-24.19l-17.3-17.3ZM38.58,217.86l-17.3-17.3v-24.19l17.3-17.3h24.19l17.3,17.3v24.19l-17.3,17.3h-24.19Z"/>'},{id:"kim-doyeon",name:"\uAE40\uB3C4\uC5F0",viewBox:"-14 -14 268 268",color:"#4ccad1",svg:'<path d="M135.76,239.71l-2.71.29v-36.19l3.49-.59,5.42-1.27,5.32-1.6,5.19-1.96,5.06-2.28,4.9-2.61,4.7-2.94,4.54-3.23,4.28-3.52,4.05-3.82,3.82-4.05,3.52-4.28,3.23-4.54,2.94-4.7,2.61-4.9,2.28-5.06,1.96-5.19,1.6-5.32,1.27-5.42.59-3.49h36.19l-.29,2.71-1.27,7.8-1.79,7.7-2.28,7.54-2.81,7.41-3.26,7.18-3.72,6.98-4.18,6.72-4.6,6.4-4.99,6.14-5.42,5.74-5.74,5.42-6.14,4.99-6.4,4.6-6.72,4.18-6.98,3.72-7.18,3.26-7.41,2.81-7.54,2.28-7.7,1.79-7.8,1.27ZM239.71,104.24l.29,2.71h-36.19l-.59-3.49-1.27-5.42-1.6-5.32-1.96-5.19-2.28-5.06-2.61-4.9-2.94-4.7-3.23-4.54-3.52-4.28-3.82-4.05-4.05-3.82-4.28-3.52-4.54-3.23-4.7-2.94-4.9-2.61-5.06-2.28-5.19-1.96-5.32-1.6-5.42-1.27-3.49-.59V0l2.71.29,7.8,1.27,7.7,1.79,7.54,2.28,7.41,2.81,7.18,3.26,6.98,3.72,6.72,4.18,6.4,4.6,6.14,4.99,5.74,5.42,5.42,5.74,4.99,6.14,4.6,6.4,4.18,6.72,3.72,6.98,3.26,7.18,2.81,7.41,2.28,7.54,1.79,7.7,1.27,7.8ZM104.24.29l2.71-.29v36.19l-3.49.59-5.42,1.27-5.32,1.6-5.19,1.96-5.06,2.28-4.9,2.61-4.7,2.94-4.54,3.23-4.28,3.52-4.05,3.82-3.82,4.05-3.52,4.28-3.23,4.54-2.94,4.7-2.61,4.9-2.28,5.06-1.96,5.19-1.6,5.32-1.27,5.42-.59,3.49H0l.29-2.71,1.27-7.8,1.79-7.7,2.28-7.54,2.81-7.41,3.26-7.18,3.72-6.98,4.18-6.72,4.6-6.4,4.99-6.14,5.42-5.74,5.74-5.42,6.14-4.99,6.4-4.6,6.72-4.18,6.98-3.72,7.18-3.26,7.41-2.81,7.54-2.28,7.7-1.79,7.8-1.27ZM.29,135.76l-.29-2.71h36.19l.59,3.49,1.27,5.42,1.6,5.32,1.96,5.19,2.28,5.06,2.61,4.9,2.94,4.7,3.23,4.54,3.52,4.28,3.82,4.05,4.05,3.82,4.28,3.52,4.54,3.23,4.7,2.94,4.9,2.61,5.06,2.28,5.19,1.96,5.32,1.6,5.42,1.27,3.49.59v36.19l-2.71-.29-7.8-1.27-7.7-1.79-7.54-2.28-7.41-2.81-7.18-3.26-6.98-3.72-6.72-4.18-6.4-4.6-6.14-4.99-5.74-5.42-5.42-5.74-4.99-6.14-4.6-6.4-4.18-6.72-3.72-6.98-3.26-7.18-2.81-7.41-2.28-7.54-1.79-7.7-1.27-7.8Z"/>'},{id:"kim-juyoun",name:"\uAE40\uC8FC\uC5F0",viewBox:"-14 -14 268 268",color:"#fbe19f",svg:'<path d="M160.68,183.3l22.62-22.62,56.7,56.7v2.61l-20.01,20.01h-2.61l-56.7-56.7ZM219.99,0l20.01,20.01v2.61l-56.7,56.7-22.62-22.62L217.38,0h2.61ZM135.99,218.01l-15.99,15.99-15.99-15.99v-82.02H21.99l-15.99-15.99,15.99-15.99h82.02V21.99l15.99-15.99,15.99,15.99v82.02h82.02l15.99,15.99-15.99,15.99h-82.02v82.02ZM0,219.99v-2.61l56.7-56.7,22.62,22.62-56.7,56.7h-2.61L0,219.99ZM79.32,56.7l-22.62,22.62L0,22.62v-2.61L20.01,0h2.61l56.7,56.7Z"/>'},{id:"kim-jiyou-cocorang",name:"\uAE40\uC9C0\uC720",viewBox:"-14 -14 268 268",color:"#ffba79",svg:'<path d="M210.05,90.24l29.95-30.03L179.97.56l-30.06,29.38L119.91.47l-30.07,29.62L60.08.35,0,60.24l30.15,29.89,60-59.82,29.6,29.87c-30.36.12-55.33,22.81-59.14,52.16-.37,2.48-.65,5-.73,7.58l-29.82-29.48L.04,120.26l29.95,29.58,29.95-28.73c.06,1.6.24,3.15.41,4.71.02.22.03.44.06.66.12.95.28,1.88.43,2.82.21,1.36.44,2.71.74,4.04,0,.03.02.06.02.09,1.31,5.75,3.42,11.18,6.25,16.17.14.24.29.47.43.71.79,1.34,1.6,2.67,2.48,3.94.42.6.87,1.17,1.31,1.75.67.89,1.33,1.8,2.05,2.65.63.75,1.3,1.44,1.96,2.16.62.67,1.22,1.36,1.87,2,.64.63,1.33,1.21,1.99,1.81.77.7,1.54,1.41,2.35,2.07.38.31.79.58,1.18.88,10.1,7.79,22.71,12.47,36.44,12.49l-29.52,30.09,29.51,29.53,30.12-29.33,29.83,29.53,59.76-59.71-29.34-29.85,29.64-30.37-29.85-29.71ZM209.53,89.68l-29.38,30.23c-.1-2.75-.42-5.44-.83-8.08-4.03-29.06-28.84-51.47-58.97-51.64l29.36-29.58,59.83,59.07ZM149.93,209.94l-29.76-29.64c5.37-.17,10.47-1.01,15.32-2.33.87-.23,1.76-.43,2.61-.7.55-.17,1.07-.4,1.6-.59,1.3-.45,2.6-.9,3.85-1.44,1.45-.62,2.85-1.32,4.23-2.04.27-.14.55-.25.81-.39,10.27-5.54,18.56-13.86,24.07-24.06.29-.53.52-1.09.79-1.63.57-1.13,1.15-2.24,1.64-3.41.44-1.03.81-2.11,1.19-3.17.28-.77.59-1.52.84-2.31.21-.67.37-1.37.56-2.05,1.39-4.9,2.27-10.04,2.47-15.42l29.64,29.18-59.89,59.99Z"/><polygon points=".4 180.23 60.26 239.84 89.87 210.08 30.05 150.26 .4 180.23"/>'},{id:"ahn-nagyeong",name:"\uC548\uB098\uACBD",viewBox:"-14 -14 268 268",color:"#ccebf5",svg:'<path d="M214.99,133.31h-55.09l-13.31-13.31,13.31-13.31h55.09l13.31,13.31-13.31,13.31ZM120,139.01l-19.01-19.01,19.01-19.01,19.01,19.01-19.01,19.01ZM106.69,214.99v-55.09l13.31-13.31,13.31,13.31v55.09l-13.31,13.31-13.31-13.31ZM133.31,80.1l-13.31,13.31-13.31-13.31V25.01l13.31-13.31,13.31,13.31v55.09ZM80.1,106.69l13.31,13.31-13.31,13.31H25.01l-13.31-13.31,13.31-13.31h55.09Z"/>'},{id:"kim-minjae",name:"\uAE40\uBBFC\uC7AC",viewBox:"-14 -14 268 268",color:"#b5b5b5",svg:'<path d="M160,80.01V0h80v80h-80ZM240,240.01h-80v-80h80v80ZM0,80.01V0h80v80H0ZM80,80.01h80v80h-80v-80ZM80,240.01H0v-80h80v80Z"/>'},{id:"nam-nayoung",name:"\uB0A8\uB098\uC601",viewBox:"-14 -14 268 268",color:"#f2f070",svg:'<path d="M-.22-.05h120L-.22,119.95V-.05ZM-.22,119.95l120,120,120-120L119.78-.05h120v240H-.22v-120Z"/>'},{id:"jo-eungyo",name:"\uC870\uC740\uAD50",viewBox:"-14 -14 268 268",color:"#ffd834",svg:'<path d="M.34,-.66h60v30h-30v30h-30ZM180.34,-.66h60v60h-30v-30h-30ZM.34,179.34h30v30h30v30h-60ZM210.34,179.34h30v60h-60v-30h30Z"/><polygon points="120.34 50.91 188.77 119.34 120.34 187.77 51.91 119.34"/>'},{id:"song-yujin",name:"\uC1A1\uC720\uC9C4",viewBox:"-14 -14 268 268",color:"#4df4ff",svg:'<polygon points="117.34 68.5 67.06 17.22 16.13 68.38 67.4 118.43 66.86 68.43 117.34 68.5"/><polygon points="117.96 170.13 168.66 119.44 117.34 68.5 67.4 118.43 15.94 170.09 66.83 221.24 117.42 170.52 66.82 170.16 67.05 119.58 117.96 170.13"/><polygon points="169.2 118.7 219.73 68.39 168.7 17.38 118.3 68.23 168.73 68.47 169.2 118.7"/><polygon points="169.04 119.85 168.73 170.27 118.35 170.54 169.01 221.12 219.83 170.04 169.04 119.85"/>'},{id:"kim-jiyoo-phishing-ddook",name:"\uAE40\uC9C0\uC720",viewBox:"-14 -14 268 268",color:"#e5903a",svg:'<path d="M120,240L0,120,120,0l120,120-120,120ZM120,200l80-80L120,40,40,120l80,80ZM86.67,120l33.33-33.33,33.33,33.33-33.33,33.33-33.33-33.33Z"/>'},{id:"son-yejin",name:"\uC190\uC608\uC9C4",viewBox:"-14 -14 268 268",color:"#536dea",svg:'<path d="M-.16.02v84h24V24.02h60V.02H-.16ZM215.84,24.02v60h24V.02h-84v24h60ZM-.16,156.02v84h84v-24H23.84v-60H-.16ZM155.84,240.02h84v-84h-24v60h-60v24Z" fill-rule="evenodd"/><path d="M134.2,52.94v-12.41h-33.1v12.41h33.1ZM51.45,135.69v-33.1h-12.41v33.1h12.41ZM196.26,135.69v-33.1h-12.41v33.1h12.41ZM134.2,197.75v-12.41h-33.1v12.41h33.1ZM107.31,119.14l10.34,10.34,10.34-10.34-10.34-10.34-10.34,10.34Z" fill-rule="evenodd"/>'},{id:"lim-jongwon",name:"\uC784\uC885\uC6D0",viewBox:"-14 -14 268 268",color:"#e1ff85",svg:'<path d="M185.28,54.89V0H54.89v54.89H0v130.4h54.89v54.72h130.4v-54.72h54.72V54.89h-54.72ZM174.65,65.35v109.29h-109.29v-109.29h109.29Z"/><rect x="11.18" y="11.1" width="32.76" height="32.76" transform="translate(-11.36 27.54) rotate(-45)"/><rect x="196.32" y="11.1" width="32.76" height="32.76" transform="translate(42.87 158.45) rotate(-45)"/><rect x="11.18" y="196.15" width="32.76" height="32.76" transform="translate(-142.21 81.74) rotate(-45)"/><rect x="196.32" y="196.15" width="32.76" height="32.76" transform="translate(-87.99 212.65) rotate(-45)"/>'},{id:"min-jiho",name:"\uBBFC\uC9C0\uD638",viewBox:"-14 -14 268 268",color:"#ccbbff",svg:'<path d="M147.49,226.94c-18.22,4.31-36.68,4.41-54.83-.04l-.37-39.62-28.41,27.73c-16.16-9.95-29.35-22.77-38.62-39.01l27.64-27.94-39.36-.16c-4.66-18.12-4.75-36.64-.06-54.89l39.15-.75-27.35-27.48c8.94-16.19,22.16-29.2,38.62-39.16l28.46,27.74.28-39.66c17.76-4.47,36.14-4.27,54.62-.15l.46,39.77,27.91-27.59c16.46,8.86,29.04,22.27,39.13,38.6l-27.8,28.38,39.61.27c4.61,18.3,4.51,36.73-.08,54.91l-39.38.16,27.31,27.6c-.72,4.91-4.8,7.03-7.05,10.45-7.92,12.07-18.69,20.97-31.46,29.04l-28.21-27.81-.23,39.59ZM120.18,158.92l38.48-38.99-38.52-38.51,27.06-27.57c-17.66-7.1-36.59-7.08-54.26-.02l26.77,27.6-38.57,38.91,39.04,38.58ZM80.77,119.63l-27.24-26.71c-6.95,18.14-7.39,36.73.18,54.69l27.06-27.98ZM186.53,147.42c7.11-18.42,7.12-36.4-.17-54.33l-27.4,27.21,27.57,27.11ZM147.01,186.41l-26.94-27.47-27.28,27.79c18.36,7.27,37.58,7.31,54.22-.32Z"/>'},{id:"ju-bomin",name:"\uC8FC\uBCF4\uBBFC",viewBox:"-14 -14 268 268",color:"#3f66b5",svg:'<path d="M119.99,7.85l-.25-7.85h28.3l.21,6.01.57,5.98.99,5.94,1.38,5.87,1.73,5.77,2.12,5.62,2.48,5.48,2.83,5.31,3.18,5.09,3.5,4.92,3.82,4.63,4.14,4.39,4.39,4.14,4.63,3.82,4.92,3.5,5.09,3.18,5.31,2.83,5.48,2.48,5.62,2.12,5.77,1.73,5.87,1.38,5.94.99,5.98.57,6.01.21v28.3l-7.85-.25-7.85-.78-7.75-1.27-7.68-1.8-7.53-2.26-7.36-2.79-7.18-3.25-6.93-3.71-6.68-4.14-6.4-4.6-6.08-4.99-5.73-5.38-5.38-5.73-4.99-6.08-4.6-6.4-4.14-6.68-3.71-6.93-3.25-7.18-2.79-7.36-2.26-7.53-1.8-7.68-1.27-7.75-.78-7.85ZM240,120.12v28.21l-5.99.21-5.96.56-5.92.99-5.85,1.38-5.75,1.73-5.61,2.12-5.47,2.47-5.29,2.82-5.08,3.17-4.9,3.49-4.62,3.81-4.37,4.13-4.13,4.37-3.81,4.62-3.49,4.9-3.17,5.08-2.82,5.29-2.47,5.47-2.12,5.61-1.73,5.75-1.38,5.85-.99,5.92-.56,5.96-.21,5.99h-28.21l.25-7.83.78-7.83,1.27-7.72,1.8-7.65,2.26-7.51,2.79-7.33,3.24-7.16,3.7-6.91,4.13-6.66,4.58-6.38,4.97-6.06,5.36-5.71,5.71-5.36,6.06-4.97,6.38-4.58,6.66-4.13,6.91-3.7,7.16-3.24,7.33-2.79,7.51-2.26,7.65-1.8,7.72-1.27,7.83-.78,7.83-.25ZM7.83,119.65l-7.83.25v-28.21l5.99-.21,5.96-.56,5.92-.99,5.85-1.38,5.75-1.73,5.61-2.12,5.47-2.47,5.29-2.82,5.08-3.17,4.9-3.49,4.62-3.81,4.37-4.13,4.13-4.37,3.81-4.62,3.49-4.9,3.17-5.08,2.82-5.29,2.47-5.47,2.12-5.61,1.73-5.75,1.38-5.85.99-5.92.56-5.96.21-5.99h28.21l-.25,7.83-.78,7.83-1.27,7.72-1.8,7.65-2.26,7.51-2.79,7.34-3.24,7.16-3.7,6.91-4.13,6.67-4.58,6.38-4.97,6.07-5.36,5.71-5.71,5.36-6.07,4.97-6.38,4.58-6.67,4.13-6.91,3.7-7.16,3.24-7.34,2.79-7.51,2.26-7.65,1.8-7.72,1.27-7.83.78ZM116.34,208.83l1.81,7.69,1.28,7.76.78,7.86.25,7.86h-28.34l-.21-6.02-.57-5.99-.99-5.95-1.38-5.88-1.74-5.77-2.13-5.63-2.48-5.49-2.83-5.31-3.19-5.1-3.51-4.92-3.83-4.64-4.14-4.39-4.39-4.14-4.64-3.83-4.92-3.51-5.1-3.19-5.31-2.83-5.49-2.48-5.63-2.13-5.77-1.74-5.88-1.38-5.95-.99-5.99-.57-6.02-.21v-28.34l7.86.25,7.86.78,7.76,1.28,7.69,1.81,7.55,2.27,7.37,2.8,7.19,3.26,6.94,3.72,6.7,4.14,6.41,4.61,6.09,4.99,5.74,5.38,5.38,5.74,4.99,6.09,4.61,6.41,4.14,6.7,3.72,6.94,3.26,7.19,2.8,7.37,2.27,7.55Z"/>'},{id:"ham-daeyeon",name:"\uD568\uB300\uC5F0",viewBox:"-14 -14 268 268",color:"#7f1616",svg:'<path d="M10.63,46.9l5.01-6.97,4.66-5.72,99.7,85.8L20.3,205.8l-4.66-5.72-5.01-6.97-4.55-7.32-4.05-7.61-2.03-4.44,6.51-2.7,3.27-1.74,6.19-4.16,5.58-4.91,4.91-5.58,2.17-3.02,1.99-3.16,3.27-6.68,2.38-7.04.85-3.63,1-7.36v-7.47l-1-7.36-.85-3.63-2.38-7.04-3.27-6.68-4.16-6.19-4.91-5.58-5.58-4.91-6.19-4.16-3.27-1.74-6.51-2.7,2.03-4.44,4.05-7.61,4.55-7.32ZM120,120L34.2,20.3l5.72-4.66,6.97-5.01,7.32-4.55,7.61-4.05,4.44-2.03,2.7,6.51,1.74,3.27,4.16,6.19,2.35,2.88,5.26,5.26,5.9,4.52,6.44,3.73,3.41,1.53,7.04,2.38,3.63.85,7.36,1h7.47l7.36-1,7.18-1.92,6.9-2.84,3.27-1.74,6.19-4.16,5.58-4.91,4.91-5.58,4.16-6.19,1.74-3.27,2.7-6.51,4.44,2.03,7.61,4.05,7.32,4.55,6.97,5.01,5.72,4.66-85.8,99.7,99.7-85.8,4.66,5.72,5.01,6.97,4.55,7.32,4.05,7.61,2.03,4.44-6.51,2.7-3.27,1.74-6.19,4.16-2.88,2.35-5.26,5.26-4.52,5.9-3.73,6.44-1.53,3.41-2.38,7.04-.85,3.63-1,7.36v7.47l1,7.36,1.92,7.18,1.32,3.48,3.27,6.68,4.16,6.19,4.91,5.58,5.58,4.91,6.19,4.16,3.27,1.74,6.51,2.7-2.03,4.44-4.05,7.61-4.55,7.32-5.01,6.97-4.66,5.72-99.7-85.8,85.8,99.7-5.72,4.66-6.97,5.01-7.32,4.55-7.61,4.05-4.44,2.03-2.7-6.51-1.74-3.27-4.16-6.19-4.91-5.58-2.7-2.56-5.9-4.52-3.16-1.99-6.68-3.27-7.04-2.38-3.63-.85-7.36-1h-7.47l-7.36,1-7.18,1.92-3.48,1.32-6.68,3.27-6.19,4.16-5.58,4.91-4.91,5.58-4.16,6.19-1.74,3.27-2.7,6.51-4.44-2.03-7.61-4.05-7.32-4.55-6.97-5.01-5.72-4.66,85.8-99.7Z"/>'},{id:"youn-taegyun",name:"\uC724\uD0DC\uADE0",viewBox:"-14 -14 268 268",color:"#ffce07",svg:'<path d="M133.33,106.67V0h106.67v40h-66.67v26.67h66.67v40h-106.67ZM133.33,240v-106.67h106.67v40h-66.67v26.67h66.67v40h-106.67ZM106.67,0v106.67H0v-40h66.67v-26.67H0V0h106.67ZM106.67,133.33v106.67H0v-40h66.67v-26.67H0v-40h106.67Z"/>'},{id:"lee-goeun",name:"\uC774\uACE0\uC740",viewBox:"-14 -14 268 268",color:"#eec35a",svg:'<path d="M127.82,239.42c-11.17.29-24.5.07-37.02-3.38l-.14-39.9c0-.58.82-1.54.39-2.55-.45-1.05-2.12-1.08-2.71-.16l-1.4,2.18-27.29,27.56c-17.98-10.36-32.02-24.86-42.67-42.62l29.83-30.25-42.63-.51c-4.91-20.02-5.03-40.34.04-59.96l42.82-.46-29.97-30.57c10.56-17.82,24.8-31.85,42.57-42.56l30.66,30.52.25-43.23c19.79-5.1,40.03-5.06,59.83.03l.14,43.46,30.97-30.75c17.48,10.61,31.85,24.8,42.38,42.5l-29.78,30.41,42.58.61c5.16,19.69,4.91,39.94.05,60.05l-42.46.44c9.71,10.68,19.1,19.49,29.62,29.87-9.83,17.85-24.56,32.39-42.46,42.97l-30.62-30.2-.39,42.78c-6.55,2.14-13.28,3.49-19.64,3.57M90.64,149.62l-.02-59.69,59.65-.05.34,60.11,41.24-.37-28.61-29.84,28.92-29.62-41.7-.43-.37-41.55-29.89,29.13-29.34-28.93-.35,41.52-42.55.38,29.88,29.71-29.55,29.83,41.95.33c.21-.24.43-.39.39-.52ZM91.87,150.04c-.31.54-.71.93-1.24,1.24l.15,40.67,29.69-29.58,29.55,28.9.26-41.3-58.42.05Z"/>'},{id:"ju-yejin",name:"\uC8FC\uC608\uC9C4",viewBox:"-14 -14 268 268",color:"#d5c8ac",svg:'<path d="M.34.26v30h30V.26H.34ZM60.34,30.26V.26l-30,30h30ZM.34,60.26h30v-30L.34,60.26ZM90.34,90.26l-30,30,30,30,30,30,30-30,30-30-30-30-30-30-30,30ZM30.34,180.26H.34l30,30v-30ZM30.34,210.26H.34v30h30v-30ZM60.34,240.26v-30h-30l30,30ZM180.34.26v30h30L180.34.26ZM210.34,30.26h30V.26h-30v30ZM210.34,60.26h30l-30-30v30ZM240.34,180.26h-30v30l30-30ZM180.34,210.26v30l30-30h-30ZM240.34,240.26v-30h-30v30h30Z" fill-rule="evenodd"/>'},{id:"jo-wooseong",name:"\uC870\uC6B0\uC131",viewBox:"-14 -14 268 268",color:"#72a7c1",svg:'<path d="M240,86.31v25.26h-88.42v-23.15h-23.15V0h25.26v86.31h86.31ZM240,128.43v25.26h-86.31v86.31h-25.26v-88.42h23.15v-23.15h88.42ZM98.94,141.06v-42.13h42.13v42.13h-42.13ZM0,86.31h86.31V0h25.26v88.42h-23.15v23.15H0v-25.26ZM86.31,153.69H0v-25.26h88.42v23.15h23.15v88.42h-25.26v-86.31Z"/>'},{id:"kim-hawon",name:"\uAE40\uD558\uC6D0",viewBox:"-14 -14 268 268",color:"#e692ff",svg:'<path d="M35.94,240.06c.13-43.47,37.43-78.68,83.43-78.68s83.31,35.2,83.43,78.68h36.57c-.13-62.57-53.8-113.25-120-113.25S-.5,177.5-.63,240.06h36.57Z"/><path d="M61.88,240.06h26.26c.13-16.21,14.06-29.31,31.24-29.31s31.11,13.1,31.24,29.31h26.26c-.13-29.92-25.82-54.14-57.49-54.14s-57.37,24.22-57.49,54.14Z"/><path d="M202.81.06c-.13,43.47-37.43,78.68-83.43,78.68S36.06,43.53,35.94.06H-.63c.13,62.57,53.8,113.25,120,113.25S239.25,62.63,239.37.06h-36.57Z"/><path d="M176.87.07h-26.26c-.13,16.21-14.06,29.31-31.24,29.31S88.27,16.28,88.14.07h-26.26c.13,29.92,25.82,54.14,57.49,54.14S176.74,29.99,176.87.07Z"/>'},{id:"song-seungbin",name:"\uC1A1\uC2B9\uBE48",viewBox:"-14 -14 268 268",color:"#ffc5c8",svg:'<path d="M240,120l-30.56,30.53-30.53-30.53,30.53-30.53,30.56,30.53ZM82.92,135.28v-30.56l21.79-21.79h30.56l21.79,21.79v30.56l-21.79,21.79h-30.56l-21.79-21.79ZM120,61.1l-30.53-30.53L120,0l30.53,30.56-30.53,30.53ZM150.53,209.44l-30.53,30.56-30.53-30.56,30.53-30.53,30.53,30.53ZM30.56,150.53L0,120l30.56-30.53,30.53,30.53-30.53,30.53Z"/>'},{id:"park-yoonji",name:"\uBC15\uC724\uC9C0",viewBox:"-14 -14 268 268",color:"#065182",svg:'<path d="M60.34,60.26h120v-30h-30V.26h-60v30h-30v30ZM.34,120.26v30h30v30h30V60.26h-30v30H.34v30ZM180.34,120.26v60h30v-30h30v-60h-30v-30h-30v60ZM60.34,210.26h30v30h60v-30h30v-30H60.34v30Z" fill-rule="evenodd"/>'},{id:"kim-jiyoon",name:"\uAE40\uC9C0\uC724",viewBox:"-14 -14 268 268",color:"#ff7154",svg:'<path d="M193.67.12h46.33v46.33h-46.33V.12ZM240,240.12h-46.33v-46.33h46.33v46.33ZM90.54,132.75v-25.26l16.83-16.83h25.26l16.83,16.83v25.26l-16.83,16.83h-25.26l-16.83-16.83ZM46.33.12v46.33H0V.12h46.33ZM46.33,193.79v46.33H0v-46.33h46.33Z"/>'},{id:"noh-minyeong",name:"\uB178\uBBFC\uC601",viewBox:"-14 -14 268 268",color:"#c4272f",svg:'<path d="M153.33,26.67V0h86.67v86.67h-26.67V26.67h-60ZM153.33,240v-26.67h60v-60h26.67v86.67h-86.67ZM153.33,63.33v-20h43.33v43.33h-20v-23.33h-23.33ZM153.33,196.67v-20h23.33v-23.33h20v43.33h-43.33ZM0,153.33h26.67v60h60v26.67H0v-86.67ZM26.67,86.67H0V0h86.67v26.67H26.67v60ZM43.33,153.33h20v23.33h23.33v20h-43.33v-43.33ZM63.33,86.67h-20v-43.33h43.33v20h-23.33v23.33Z"/>'},{id:"kwon-minseong",name:"\uAD8C\uBBFC\uC131",viewBox:"-14 -14 268 268",color:"#4f00b4",svg:'<circle cx="119.84" cy="118.02" r="13.21"/><path d="M240.1,95.81V-.17S141.63-.17,141.63-.17c49.47,8.76,88.67,47.03,98.48,95.98Z"/><path d="M141.63,239.83h98.48v-95.98c-9.81,48.95-49.01,87.22-98.48,95.98Z"/><path d="M98.58-.17H.1v95.98C9.91,46.86,49.12,8.59,98.58-.17Z"/><path d="M.1,143.85v95.98h98.48C49.12,231.07,9.91,192.79.1,143.85Z"/>'},{id:"kim-hyejin",name:"\uAE40\uD61C\uC9C4",viewBox:"-14 -14 268 268",color:"#178466",svg:'<path d="M132.22,10l97.78,97.78h-97.78V10ZM230,132.22l-97.78,97.78v-97.78h97.78ZM10,107.78L107.78,10v97.78H10ZM107.78,230L10,132.22h97.78v97.78Z"/>'},{id:"yoo-hyejin",name:"\uC720\uD61C\uC9C4",viewBox:"-14 -14 268 268",color:"#8bff6c",svg:'<path d="M150.51,221.71l26.55-26.55-26.55-26.52,18.21-18.21,26.52,26.55,26.55-26.55,18.21,18.21-26.55,26.52,26.55,26.55-18.21,18.21-26.55-26.55-26.52,26.55-18.21-18.21ZM195.24,62.86l-26.52,26.55-18.21-18.21,26.55-26.52-26.55-26.55L168.72-.08l26.52,26.55L221.8-.08l18.21,18.21-26.55,26.55,26.55,26.52-18.21,18.21-26.55-26.55ZM44.77,176.97l26.52-26.55,18.21,18.21-26.55,26.52,26.55,26.55-18.21,18.21-26.52-26.55-26.55,26.55L0,221.71l26.55-26.55L0,168.63l18.21-18.21,26.55,26.55ZM89.5,18.12l-26.55,26.55,26.55,26.52-18.21,18.21-26.52-26.55-26.55,26.55L0,71.2l26.55-26.52L0,18.12,18.21-.08l26.55,26.55L71.29-.08l18.21,18.21Z"/>'},{id:"kim-sungeun",name:"\uAE40\uC131\uC740",viewBox:"-14 -14 268 268",color:"#a8f0db",svg:'<path d="M240,0v40L200,0h40ZM240,240h-40l40-40v40ZM193.33,120l26.67,26.67-26.67,26.67-53.33-53.33,53.33-53.33,26.67,26.67-26.67,26.67ZM120,46.67l26.67-26.67,26.67,26.67-53.33,53.33-53.33-53.33,26.67-26.67,26.67,26.67ZM120,193.33l-26.67,26.67-26.67-26.67,53.33-53.33,53.33,53.33-26.67,26.67-26.67-26.67ZM46.67,120l-26.67-26.67,26.67-26.67,53.33,53.33-53.33,53.33-26.67-26.67,26.67-26.67ZM0,0h40L0,40V0ZM0,240v-40l40,40H0Z"/>'},{id:"park-yuna",name:"\uBC15\uC724\uC544",viewBox:"-14 -14 268 268",color:"#bdffbf",svg:'<path d="M225.26,134.66h-18.95l-14.72-14.75,14.72-14.75h18.95l14.75,14.75-14.75,14.75ZM120,183.07l-63.16-63.16,63.16-63.16,63.16,63.16-63.16,63.16ZM105.26,225.17v-18.95l14.75-14.72,14.75,14.72v18.95l-14.75,14.75-14.75-14.75ZM134.75,33.61l-14.75,14.72-14.75-14.72V14.66L120-.08l14.75,14.75v18.95ZM33.7,105.17l14.72,14.75-14.72,14.75H14.75L0,119.92l14.75-14.75h18.95Z"/>'},{id:"go-biju",name:"\uACE0\uBE44\uC8FC",viewBox:"-14 -14 268 268",color:"#50c4a6",svg:'<path d="M167.3,9.57l-.47-4.77-.17-4.8h73.33v73.33l-4.8-.17-4.77-.47-4.73-.77-4.67-1.1-4.6-1.4-4.5-1.67-4.37-2-4.23-2.27-4.07-2.53-3.9-2.8-3.73-3.03-3.5-3.27-3.27-3.5-3.03-3.73-2.8-3.9-2.53-4.07-2.27-4.23-2-4.37-1.67-4.5-1.4-4.6-1.1-4.67-.77-4.73ZM235.2,166.83l4.8-.17v73.33h-73.33l.17-4.8.47-4.77.77-4.73,1.1-4.67,1.4-4.6,1.67-4.5,2-4.37,2.27-4.23,2.53-4.07,2.8-3.9,3.03-3.73,3.27-3.5,3.5-3.27,3.73-3.03,3.9-2.8,4.07-2.53,4.23-2.27,4.37-2,4.5-1.67,4.6-1.4,4.67-1.1,4.73-.77,4.77-.47ZM163.33,120l-.37,5.67-1.1,5.53-.83,2.73-2.17,5.23-1.33,2.5-1.5,2.4-3.47,4.5-4,4-2.2,1.8-4.7,3.17-2.5,1.33-5.23,2.17-2.73.83-5.53,1.1-2.83.27-2.83.1-5.67-.37-2.8-.47-5.47-1.47-2.63-1-5.1-2.5-4.7-3.17-2.2-1.8-4-4-1.8-2.2-3.17-4.7-1.33-2.5-2.17-5.23-.83-2.73-1.1-5.53-.27-2.83-.1-2.83.37-5.67,1.1-5.53.83-2.73,1-2.63,2.5-5.1,3.17-4.7,1.8-2.2,4-4,2.2-1.8,2.3-1.67,4.9-2.83,2.6-1.17,5.37-1.83,5.53-1.1,2.83-.27,2.83-.1,5.67.37,5.53,1.1,2.73.83,2.63,1,5.1,2.5,2.4,1.5,4.5,3.47,4,4,1.8,2.2,1.67,2.3,2.83,4.9,2.17,5.23.83,2.73,1.1,5.53.37,5.67ZM9.57,72.7l-4.77.47-4.8.17V0h73.33l-.17,4.8-.47,4.77-.77,4.73-1.1,4.67-1.4,4.6-1.67,4.5-2,4.37-2.27,4.23-2.53,4.07-2.8,3.9-3.03,3.73-3.27,3.5-3.5,3.27-3.73,3.03-3.9,2.8-4.07,2.53-4.23,2.27-4.37,2-4.5,1.67-4.6,1.4-4.67,1.1-4.73.77ZM70.83,221.03l1.1,4.67.77,4.73.47,4.77.17,4.8H0v-73.33l4.8.17,4.77.47,4.73.77,4.67,1.1,4.6,1.4,4.5,1.67,4.37,2,4.23,2.27,4.07,2.53,3.9,2.8,3.73,3.03,3.5,3.27,3.27,3.5,3.03,3.73,2.8,3.9,2.53,4.07,2.27,4.23,2,4.37,1.67,4.5,1.4,4.6Z"/>'},{id:"kim-dahyun",name:"\uAE40\uB2E4\uD604",viewBox:"-14 -14 268 268",color:"#d33bff",svg:'<path d="M119.27,104.35l.77,7.83.27,7.83.27-7.83.77-7.83,1.27-7.73,1.8-7.67,2.27-7.5,2.77-7.37,3.23-7.13,3.7-6.93,4.17-6.67,4.57-6.4,4.97-6.07,5.37-5.73,5.73-5.37,6.07-4.97,6.4-4.57,6.67-4.17,6.93-3.7,7.13-3.23,7.37-2.77,7.5-2.27,7.67-1.8,7.73-1.27,7.83-.77,7.83-.27v240l-7.83-.27-7.83-.77-7.73-1.27-7.67-1.8-7.5-2.27-7.37-2.77-7.13-3.23-6.93-3.7-6.67-4.17-6.4-4.57-6.07-4.97-5.73-5.37-5.37-5.73-4.97-6.07-4.57-6.4-4.17-6.67-3.7-6.93-3.23-7.13-2.77-7.37-2.27-7.5-1.8-7.67-1.27-7.73-.77-7.83-.27-7.83-.27,7.83-.77,7.83-1.27,7.73-1.8,7.67-2.27,7.5-2.77,7.37-3.23,7.13-3.7,6.93-4.17,6.67-4.57,6.4-4.97,6.07-5.37,5.73-5.73,5.37-6.07,4.97-6.4,4.57-6.67,4.17-6.93,3.7-7.13,3.23-7.37,2.77-7.5,2.27-7.67,1.8-7.73,1.27-7.83.77-7.83.27V.02l7.83.27,7.83.77,7.73,1.27,7.67,1.8,7.5,2.27,7.37,2.77,7.13,3.23,6.93,3.7,6.67,4.17,6.4,4.57,6.07,4.97,5.73,5.37,5.37,5.73,4.97,6.07,4.57,6.4,4.17,6.67,3.7,6.93,3.23,7.13,2.77,7.37,2.27,7.5,1.8,7.67,1.27,7.73Z"/>'}];var H1=Ar.filter(({color:i})=>{let[e,t,n]=i.slice(1).match(/../g).map(s=>{let r=parseInt(s,16)/255;return r<=.04045?r/12.92:((r+.055)/1.055)**2.4});return 1.05/(.2126*e+.7152*t+.0722*n+.05)>=2.3});function Mm(){let i=new Set;return e=>{let t=H1.filter(s=>!i.has(s.color)),n=t[Math.floor(Math.random()*t.length)];e.icon&&i.delete(e.icon.color),i.add(n.color),e.icon=n,e.word.style.setProperty("--keyword-color",n.color),e.glyph.dataset.iconId=n.id,e.glyph.innerHTML=`<svg viewBox="${n.viewBox}" fill="currentColor" aria-hidden="true">${n.svg}</svg>`}}function Sm(i,e){let t=e.matches?[{opacity:0},{opacity:1,offset:.25},{opacity:0}]:[{opacity:0,transform:"translate(0,.12em) rotate(-12deg) scale(.25)"},{opacity:1,transform:"translate(.18em,-.28em) rotate(14deg) scale(1.25)",offset:.25},{opacity:1,transform:"translate(.28em,-.12em) rotate(30deg) scale(.90)",offset:.55},{opacity:0,transform:"translate(.42em,-.30em) rotate(48deg) scale(.20)"}];return i.animate(t,{duration:e.matches?240:480,easing:"cubic-bezier(.22,.7,.3,1)"})}var sd=.65,bm=.9,G1=i=>{let e=Math.max(0,Math.min(1,i));return e*e*(3-2*e)};function Em(i,e){let t=Mm(),n=new Map,s=null;i.forEach((o,c)=>{let l=o.querySelector("[data-caption-keyword]");if(!l)return;let h=document.createElement("span"),d=document.createElement("span");h.className="caption-keyword-color",h.dataset.label=l.textContent,h.setAttribute("aria-hidden","true"),d.className="keyword-pop",d.setAttribute("aria-hidden","true"),l.append(h,d);let u={word:l,glyph:d,icon:null,started:!1,recolor:!1,completed:!1,animation:null};t(u),n.set(c,u)});function r(o){o&&(o.animation?.cancel(),o.animation=null,s===o&&(s=null))}function a(o){r(s);let c=o.word.getBoundingClientRect();if(c.bottom<=70||c.top>=innerHeight)return;s=o;let l=Sm(o.glyph,e);o.animation=l,l.onfinish=()=>{o.animation===l&&(r(o),o.word.dataset.phase="complete")}}return e.addEventListener("change",()=>{n.forEach(o=>{r(o),o.word.dataset.phase=o.completed?"complete":"color"})}),{update(o,c,l){let h=n.get(o);if(!h)return;let d=G1((c-sd)/bm);c<=sd?(h.started&&(h.recolor=!0),h.started=!1):h.started||(h.recolor&&t(h),h.started=!0,h.recolor=!1),h.word.style.setProperty("--keyword-tint",String(d)),d<1?(r(h),h.completed=!1):h.completed||(h.completed=!0,l>.9&&c<sd+bm+.55&&a(h)),l<.05&&r(h),h.word.dataset.phase=h.animation?"pop":d===1?"complete":d>0?"color":"waiting"}}}function Tm(i){let e=[...i.querySelectorAll(".construction-tool")],t=0,n=!1;function s(){e.forEach((r,a)=>{r.setAttribute("aria-pressed",String(n&&a===t)),r.tabIndex=n&&a===t?0:-1})}return e.forEach((r,a)=>{r.addEventListener("click",()=>{n&&(t=a,i.classList.add("is-tool-manual"),s())}),r.addEventListener("keydown",o=>{if(!n||o.altKey||o.ctrlKey||o.metaKey)return;let c=o.key==="ArrowRight"?(a+1)%e.length:o.key==="ArrowLeft"?(a+e.length-1)%e.length:o.key==="Home"?0:o.key==="End"?e.length-1:null;c!==null&&(o.preventDefault(),e.forEach((l,h)=>{l.tabIndex=h===c?0:-1}),e[c].focus({preventScroll:!0}))})}),s(),{update(r,a){r===0&&(t=0,i.classList.remove("is-tool-manual"));let o=r===1&&a<1;o!==n&&(n=o,!n&&i.contains(document.activeElement)&&document.activeElement.blur(),i.inert=!n,i.setAttribute("aria-hidden",String(!n)),i.classList.toggle("is-tool-selected",n),s())}}}var wm=i=>Math.max(0,Math.min(1,i)),Rr=i=>{let e=wm(i);return e*e*(3-2*e)},Al=[Oa,el],Am=Mn[1].start,Rm=.55,W1=Am+Rm,X1=Hu-cl-Vu,q1=2.4;function Cm(){let i=_m(),e=[...document.querySelectorAll("[data-caption]")],t=document.querySelector(".construction-bar"),n=Tm(t),s=document.querySelector(".hero-heading"),r=document.querySelector(".section-year"),a=matchMedia("(prefers-reduced-motion: reduce)");wl(s,a,"[data-hover-text]");let o=Em(e,a),c=document.querySelector("#content01"),l=vm(c,a),h=-1,d=0;function u(){t.style.setProperty("--bar-scale",String(Math.min(1,Math.max(0,innerWidth-40)/308))),f()}function f(){for(let y of[s,r]){let g=Rr((innerHeight*.64-y.getBoundingClientRect().top)/(innerHeight*.44));y.style.opacity=String((y===r?.7:1)*(1-g)),y.style.filter=`blur(${a.matches?0:g*12}px)`}d=wm((innerHeight*.6-c.getBoundingClientRect().top)/innerHeight),l.update(d)}function m(y){i.setAutoHideProgress(Rr((y-X1)/q1));let g=Rr((y-Oa)/.55),p=Rr((y-Mn[1].start)/.55),E=g*(1-p);t.style.opacity=String(E),t.style.visibility=E>0?"visible":"hidden",t.style.transform=`translate(-50%,${a.matches?0:(1-g+p)*66}px) scale(var(--bar-scale,1))`,n.update(g,p),h=-1,Al.forEach((b,_)=>{y>=b&&(h=_)}),y>=W1&&(h=-1),e.forEach((b,_)=>{let M=Rr((y-Al[_])/.55),T=_===e.length-1,A=Rr((y-(T?Am:Al[_+1]))/(T?Rm:.55)),x=M*(1-A);b.style.opacity=String(x),b.style.filter=`blur(${a.matches?0:(1-M+A)*10}px)`,b.style.transform=`translateY(${a.matches?0:(1-M)*10-A*10}px)`,b.setAttribute("aria-hidden",String(_!==h)),o.update(_,y-Al[_],x)})}return addEventListener("scroll",f,{passive:!0}),addEventListener("resize",u),u(),m(0),{update:m,inspect:()=>({caption:h,reading:d,text:e[h]?.textContent.trim()})}}function Im(i,e){let t=matchMedia("(prefers-reduced-motion: reduce)"),n=document.createElement("canvas"),s=n.getContext("2d");n.className="hero-nebula-canvas",i.append(n);let r=Si(210426),a=[],o=Si(110626);for(let A=0;A<e.length*2;A++){let x=e[A*13%e.length],R=((A*13%e.length+.5)/e.length-.5)*1.8+(r()+r()+r()-1.5)*.24,D=o()<.36&&Math.abs(R)>.45?Math.sign(R)*(.55+o()*.3):0,w=o()<.26?.78+o()*.12:1,I=(o()-.5)*.6;a.push({source:x,offset:R,breakout:D,phaseJitter:I,size:(.64+r()*.95)*w,roll:(r()-.5)*Math.PI*2,speed:.008+r()*.004,spin:(r()-.5)*.07,seed:r()*Math.PI*2})}let c=0,l=0,h=1,d=0,u=0,f=0,m=!0,y=0,g=!1,p=document.documentElement.classList.contains("intro-loading");function E(){let A=d,x=c<650,R=e.length*(x?1:2),D=x?46:92,w=Math.max(D*2.25,c*.14);s.setTransform(1,0,0,1,0,0),s.clearRect(0,0,n.width,n.height),s.strokeStyle="rgba(129,144,152,.55)",s.lineJoin="round";for(let I=0;I<R;I++){let O=a[I],B=(Math.sin(A*O.speed*5+O.seed)-Math.sin(O.seed))*.002,U=((I+.5+O.phaseJitter)/R+A*.01+B)%1,q=(U*(c+w*2)-w)/c,G=Math.sin(Math.PI*Math.max(0,Math.min(1,q))),H=Math.min(l*.2,c*.2)*(.48+.52*G),j=(O.offset+O.breakout*G)*H+Math.sin(A*.25+O.seed)*H*.1,ie=c*q-j*.36,ue=l*(.02+.72*q+.035*Math.sin(q*Math.PI*2))+j,ve=D*O.size*(.8+.2*G)/O.source.size,He=-(O.roll+A*O.spin),Ue=Math.cos(He)*ve*h,ee=Math.sin(He)*ve*h;s.setTransform(Ue,ee,-ee,Ue,ie*h,ue*h),s.lineWidth=(c<650?.8:.9)/ve,s.stroke(O.source.caster.path)}y++,i.classList.add("is-ready")}function b(A){if(f=0,p||!m||document.hidden)return;if(u&&A-u<32){f=requestAnimationFrame(b);return}let x=u?Math.min((A-u)/1e3,.1):1/60;u=A;let R=!g&&!t.matches;R&&(d+=x),E(),R&&(f=requestAnimationFrame(b))}function _(){!f&&!p&&m&&!document.hidden&&(u=0,f=requestAnimationFrame(b))}function M(){let A=Math.min(devicePixelRatio||1,1.75);c===i.clientWidth&&l===i.clientHeight&&h===A||(c=i.clientWidth,l=i.clientHeight,h=A,n.width=Math.round(c*h),n.height=Math.round(l*h),E(),_())}return new IntersectionObserver(([A])=>{m=A.isIntersecting&&A.intersectionRatio>.001,m?_():(cancelAnimationFrame(f),f=0,u=0)},{threshold:.001}).observe(i),new ResizeObserver(M).observe(i),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(f),f=0):_()}),t.addEventListener("change",()=>{cancelAnimationFrame(f),f=0,_()}),p&&window.addEventListener("main-intro-reveal",()=>{p=!1,_()},{once:!0}),M(),{inspect:()=>({ready:y>0,sourceCount:e.length,count:c<650?e.length:a.length,baseSize:c<650?46:92,elapsed:d,frames:y,visible:m,paused:!f,width:c,height:l,mode:"neutral-contour-stream"}),renderAt(A){g=!0,cancelAnimationFrame(f),f=0,d=A,E()},play(){g=!1,_()},exportPNG(){return E(),n.toDataURL("image/png")}}}function Pm(i,e,t,n,s=()=>{}){let o=new WeakMap,c=[],l=0,h=0,d=!1,u={ready:!1,total:0,completed:0,batches:0,maxBatchMs:0,error:null},f=b=>Array.isArray(b.material)?b.material:[b.material],m=b=>[b.geometry?.uuid,...f(b).flatMap(_=>[_.uuid,_.version,_.map?.uuid,_.map?.version])].join(":");function y(b){let _=i.getViewport(new mt),M=i.getScissor(new mt),T=i.getScissorTest(),A=i.autoClear,x=e.background,R=t.layers.mask,D=new Map,w=new Map,I=new Map,O=B=>{D.has(B)||D.set(B,{visible:B.visible,mask:B.layers.mask,culled:B.frustumCulled})};try{i.autoClear=!1,e.background=null,i.setViewport(0,0,1,1),i.setScissor(0,0,1,1),i.setScissorTest(!0),t.layers.set(31),e.traverse(B=>{B.isLight&&(O(B),B.layers.enable(31))});for(let{object:B}of b){O(B),B.visible=!0,B.frustumCulled=!1,B.layers.enable(31);for(let q=B.parent;q;q=q.parent)O(q),q.visible=!0;for(let q of f(B))w.has(q)||w.set(q,{colorWrite:q.colorWrite,depthWrite:q.depthWrite}),q.colorWrite=!1,q.depthWrite=!1;let U=B.geometry;U&&!I.has(U)&&(I.set(U,{...U.drawRange}),U.setDrawRange(0,Math.min(3,U.index?.count||U.attributes.position.count)))}i.render(e,t)}finally{for(let[B,U]of I)B.setDrawRange(U.start,U.count);for(let[B,U]of w)Object.assign(B,U);for(let[B,U]of D)B.visible=U.visible,B.layers.mask=U.mask,B.frustumCulled=U.culled;t.layers.mask=R,e.background=x,i.autoClear=A,i.setViewport(_),i.setScissor(M),i.setScissorTest(T)}}function g(){h||d||!c.length||document.hidden||(h=window.requestIdleCallback?requestIdleCallback(p,{timeout:120}):setTimeout(p,16))}async function p(){if(h=0,d||document.hidden)return;d=!0;let b=l,_=1,M=c[0].bytes;for(;_<c.length&&_<12&&M+c[_].bytes<=4*1024*1024;)M+=c[_].bytes,_++;let T=c.splice(0,_);try{if(await Promise.all(T.map(({object:x})=>i.compileAsync(x,t,e))),b!==l)return;let A=performance.now();y(T),u.maxBatchMs=Math.max(u.maxBatchMs,performance.now()-A);for(let{object:x}of T)o.set(x,m(x));u.completed+=T.length,u.batches++,c.length||(u.ready=!0),s({...u}),u.ready&&n()}catch(A){b===l&&(u.error=String(A),c=[],s({...u}))}finally{d=!1,g()}}function E(){l++;let b=[];e.traverse(_=>{_.material&&(_.isMesh||_.isLine||_.isPoints||_.isSprite)&&b.push(_)}),c=b.filter(_=>o.get(_)!==m(_)).map(_=>{let M=_.geometry,T=M?.index?.array.byteLength||0;for(let A of Object.values(M?.attributes||{}))T+=A.array.byteLength;for(let A of f(_)){let x=A.map?.image;x?.width&&x.height&&(T+=4*x.width*x.height)}return{object:_,bytes:T}}),c.sort((_,M)=>(_.object.isInstancedMesh?0:_.object.isMesh?1:2)-(M.object.isInstancedMesh?0:M.object.isMesh?1:2)),u={ready:c.length===0,total:b.length,completed:b.length-c.length,batches:0,maxBatchMs:0,error:null},s({...u}),u.ready&&n(),g()}return document.addEventListener("visibilitychange",g),i.domElement.addEventListener("webglcontextrestored",()=>{o=new WeakMap,E()}),{prepare:E,inspect:()=>({...u,pending:u.total-u.completed})}}var Ei=i=>Math.max(0,Math.min(1,i));function Lm(i){if(i>1-.22)return 1-Lm(1-i);if(i>=.22)return(i-.22/2)/(1-.22);let t=i/.22;return .22*(t*t*t-.5*t*t*t*t)/(1-.22)}var Z1=()=>typeof lenis>"u"?null:lenis,Y1=.56,Rl=i=>1-Math.cbrt(Ei((1-i)/(1-Y1)));function Nm(i,e){let t=window.MainIntro,n=i.closest(".animation-stage"),s=()=>i.clientHeight*.85,r=()=>t.anchor()-s(),a=()=>i.clientHeight*.18,o=0,c=0,l=0,h=-1/0,d=0,u=0,f=0,m=1,y=0,g=0,p={progress:0,gather:0,travel:1},E=p;function b(w,I){w=Ei(w);let O=I??(w>u+1e-6?1:w<u-1e-6?-1:m);O!==m&&(y=u,g=f,E=p,m=O);let B;if(w===0||w===1)B=w;else if(m<0)B=y>0?g*Ei(w/y):w;else{let q=Rl(y);B=g+(1-g)*Ei((Rl(w)-q)/Math.max(1e-8,1-q))}let U;if(w===0||w===1)U={progress:w,gather:B,travel:1};else if(m<0){let q=y>0?Ei(1-w/y):1,G=1-Math.pow(q,1.8),H=y>0?Ei((y-w)/(y*.26)):1,j=H*H*(3-2*H);U={progress:E.progress*G,gather:E.gather*G,travel:E.travel+(.12-E.travel)*j}}else{let q=Rl(y),G=Ei((w-y)/Math.max(1e-8,1-y));U={progress:E.progress+(1-E.progress)*G,gather:E.gather+(1-E.gather)*Ei((Rl(w)-q)/Math.max(1e-8,1-q)),travel:E.travel+(1-E.travel)*G*G*(3-2*G)}}u=w,f=B,p=U,t.zoomingIn=m<0,e(w,B,U)}function _(w,I){let O=t.complete;t.progress=w,t.complete=w===1&&I===1,document.body.classList.toggle("intro-before-main",!t.complete),n.style.visibility=t.complete?"hidden":"visible",document.getElementById("mainIntro").inert=t.complete,O!==t.complete&&window.dispatchEvent(new CustomEvent("main-intro-handoff",{detail:{complete:t.complete}}))}function M(){if(t.moving)return;let w=scrollY-r(),I=s();b(w<=1?0:w>=I-1?1:w/I)}async function T(w){let I=scrollY-r(),O=s(),B=I>=O-1?1:Math.abs(I)<=1?0:Math.max(-a()/O,Math.min(1,I/O)),U=w?1:0;if(B===U&&!t.moving)return;let q=++c;cancelAnimationFrame(o),t.moving=!0;let G=Z1();G?.stop();let H=window.MainWordSurface,j=H?.getSource(H.theme).image;if(j&&!j.complete)try{await j.decode()}catch{}if(q!==c)return;let ue=(matchMedia("(prefers-reduced-motion: reduce)").matches?240:6200)*Math.abs(U-B),pe=performance.now();function ve(He){if(q!==c)return;let Ue=He-pe,ee=ue?Ei(Ue/ue):1,W=ee===1?U:B+(U-B)*Lm(ee),z=r()+s()*W;if(window.scrollTo({top:z,behavior:"instant"}),b(W,w?1:-1),Ue<ue){o=requestAnimationFrame(ve);return}t.moving=!1,t.inputUntil=performance.now()+300,G?.scrollTo(z,{immediate:!0,force:!0}),G?.start()}o=requestAnimationFrame(ve)}t.reverse=()=>T(!1);let A=w=>w.defaultPrevented||w.ctrlKey||w.metaKey||w.altKey||document.body.classList.contains("mobile-menu-open")||document.documentElement.classList.contains("page-transition-active")||w.target.closest?.("input,textarea,select,[contenteditable]");function x(w){if(t.moving)return!0;let I=scrollY-r();return w>0?I>=-a()&&I<s()-1:I>1&&I<=s()+2}let R=w=>{w.preventDefault(),w.stopImmediatePropagation()};addEventListener("wheel",w=>{if(A(w)||Math.abs(w.deltaX)>=Math.abs(w.deltaY))return;let I=Math.sign(w.deltaY),O=performance.now();x(I)&&(R(w),!(t.moving||O<t.inputUntil)&&((O-h>220||I!==d)&&(l=0),d=I,h=O,l+=Math.abs(w.deltaY)*(w.deltaMode===1?16:w.deltaMode===2?innerHeight:1),l>=60&&(l=0,T(I>0))))},{capture:!0,passive:!1});let D=null;return addEventListener("touchstart",w=>{D=w.touches.length===1?w.touches[0]:null},{passive:!0}),addEventListener("touchmove",w=>{if(!D||A(w)||w.touches.length!==1)return;let I=D.clientY-w.touches[0].clientY;Math.abs(I)<Math.abs(D.clientX-w.touches[0].clientX)||!x(Math.sign(I))||(R(w),!t.moving&&Math.abs(I)>=42&&(D=null,T(I>0)))},{capture:!0,passive:!1}),addEventListener("keydown",w=>{if(A(w)||w.target.closest?.("button,a"))return;let I=["ArrowDown","PageDown"," "].includes(w.key)?1:["ArrowUp","PageUp"].includes(w.key)?-1:0;!I||!x(I)||(R(w),!t.moving&&!w.repeat&&T(I>0))},{capture:!0}),{update:_,readScroll:M}}var Cl=i=>document.querySelector(i),Yt=Cl("#scene"),Zt=window.MainIntroLoading,J1=Cm(),en={angle:38,depth:1,shadow:.64,layout:"grid"},st=[],od=[],Ft,Pt,et,Cr,Va,Es,cd,Om,Bm,Ir,ld=0,Ti=1,wi=1,Il=!1,$1=()=>ni,ht={current:0,target:0,poses:[],lastFrame:0},fd,Ts,si=0,ka=0,pd={progress:0,gather:0,travel:1},hd=!1,zm=!1,ud=matchMedia("(prefers-reduced-motion: reduce)"),za=new V,km=new Bt,Vm=new xa({name:"Soft colored clay",color:16777215,roughness:.78,metalness:0,emissive:16777215,emissiveIntensity:.02,toneMapped:!1}),rd={depth:46.2,bevelEnabled:!0,bevelSize:1.3,bevelThickness:2.2,bevelSegments:5,steps:1,curveSegments:20},K1=(i,e=1)=>{let t=Math.sin((i+1)*127.1+e*311.7)*43758.5453;return t-Math.floor(t)};function j1(i){if(ld=0,!Ft||Il)return;let e=Math.min((i-ht.lastFrame)/1e3||.016,.05);if(ht.lastFrame=i,window.MainIntro.complete&&si===1&&ka===1)return;let t=si>0?ni:ht.target,n=t-ht.current;ht.current=ud.matches||Math.abs(n)<.001?t:ht.current+n*(1-Math.exp(-12*e)),si===0||et.userData.timeline!==ht.current?md(Ti,wi):et.copy(km,!1),Ts.update(et,Es.mesh,si,et.userData.ending,ka,pd),Ts.render(et),fd?.update(si,ka),(si>0&&si<1&&!ud.matches&&!document.hidden||Math.abs(t-ht.current)>1e-4||st.some(r=>r.reveal.active&&performance.now()-r.reveal.sparkAt<360)||Va?.isFlashing())&&Pr()}function Pr(){zm&&!ld&&(ld=requestAnimationFrame(j1))}function Dm(){zm=!0,Yt.classList.add("ready"),Pr()}function Ai(i,e,t,n,s=0,r=0,a=38,o=44,c=0,l=34){let h=ot.degToRad(a),d=ot.degToRad(o);et.aspect=i/e,et.fov=l,et.near=Math.max(.1,n*.05),et.position.set(t.x+Math.sin(h)*Math.cos(d)*n,t.y+Math.sin(d)*n,t.z+Math.cos(h)*Math.cos(d)*n),et.up.set(-Math.sin(h)*Math.sin(d),Math.cos(d),-Math.cos(h)*Math.sin(d)),et.lookAt(t.x,t.y,t.z),et.rotateZ(c),et.setViewOffset(i,e,s*i,r*e,i,e),et.updateMatrixWorld(!0)}function Pl(i){let e=i.geometry.attributes.position,t=new V,n=new rt().multiplyMatrices(et.projectionMatrix,et.matrixWorldInverse).multiply(i.matrixWorld),s={left:1/0,right:-1/0,top:1/0,bottom:-1/0};for(let r=0;r<e.count;r++){t.fromBufferAttribute(e,r).applyMatrix4(n);let a=(t.x+1)/2,o=(1-t.y)/2;s.left=Math.min(s.left,a),s.right=Math.max(s.right,a),s.top=Math.min(s.top,o),s.bottom=Math.max(s.bottom,o)}return s}function ad(i,e,t,n){let s=-1,r=0;for(;r<t&&!n(i*e**r);)s=r,r=Math.min(t,2*r+1);for(;r-s>1;){let a=Math.floor((s+r)/2);n(i*e**a)?r=a:s=a}return i*e**r}function Hm(i,e){let t=st.map(({mesh:p})=>p.scale.y);st.forEach(({mesh:p,heightFactor:E})=>{p.scale.y=en.depth*E}),Pt.updateMatrixWorld(!0),ht.poses=st.slice(0,_r).map(({mesh:p,index:E})=>{let b=new zt().setFromObject(p).getCenter(new V);b.y=p.position.y;let _=E===0?0:en.angle+(E===1?-8:12),M=E===0?90:E===1?48:58,T=ad(4,1.035,80,A=>{Ai(i,e,b,A,0,0,_,M);let x=Pl(p);return x.right-x.left<(i/e<1?.78:.52)&&x.bottom-x.top<.45});return{center:b,distance:T,yaw:_,pitch:M}});let n=Math.max(...ht.poses.map(p=>p.distance));ht.poses.forEach((p,E)=>{p.distance=n,Ai(i,e,p.center,p.distance,0,0,p.yaw,p.pitch);let b=Pl(st[E].mesh);p.shiftX=(b.left+b.right)/2-.5,p.shiftY=(b.top+b.bottom)/2-.5}),Es.fit(ht.poses[0],e);let s=en.layout==="grid"?hl(ht.layoutMode==="portrait"):null;st.forEach(p=>sl(p.reveal,s));let r=ht.poses[0];Ai(i,e,r.center,r.distance,r.shiftX,r.shiftY,r.yaw,r.pitch),Bu(st[0].reveal,et);let a=new zt;st.forEach(({mesh:p})=>a.expandByObject(p));let o=a.getCenter(new V),c=en.angle,l=54;o.y=.003;let h=ad(14,1.045,90,p=>{Ai(i,e,o,p,0,0,c,l,0,34);let E=dd();return E.right-E.left<.94&&E.bottom-E.top<(i/e<.8?.72:.76)}),d=90+en.angle-38,u=ad(h*1.65,1.045,60,p=>{Ai(i,e,o,p,0,0,d,90);let E=dd();return E.right-E.left<.9&&E.bottom-E.top<.76});ht.wide={center:o,distance:u,yaw:d,pitch:90,fov:34,shiftX:0,shiftY:0};let f=[];for(let p=On;p<=bi+.001;p+=(bi-On)/12){let E=_l(p,ht.poses,ht.wide);Ai(i,e,E.center,E.distance,E.shiftX,E.shiftY,E.yaw,E.pitch,E.roll,E.fov),f.push(et.clone())}let m=_l(On,ht.poses,ht.wide);Ai(i,e,m.center,m.distance,m.shiftX,m.shiftY,m.yaw,m.pitch,m.roll,m.fov);let y=new _i,g=new V;y.setFromCamera(new fe(0,0),et),y.ray.intersectPlane(new Wt(new V(0,1,0),-.003),g),Va?.fit(f,ht.layoutMode==="portrait",en,g),st.forEach(({mesh:p},E)=>{p.scale.y=t[E]}),Pt.updateMatrixWorld(!0)}function dd(){let i={left:1/0,right:-1/0,top:1/0,bottom:-1/0};return st.forEach(({mesh:e})=>{let t=Pl(e);i.left=Math.min(i.left,t.left),i.right=Math.max(i.right,t.right),i.top=Math.min(i.top,t.top),i.bottom=Math.max(i.bottom,t.bottom)}),i}function md(i,e){if(!ht.poses.length)return;let t=ot.clamp(ht.current,0,ni);J1.update(t);let n=ll(t);ul.value=Ou(n);let s=si>0?0:en.shadow*(1-ot.smoothstep(t,Sn,ji));s>0?et.layers.enable(vs):et.layers.disable(vs);let r=_l(t,ht.poses,ht.wide,ud.matches?0:1),{solo:a,index:o,distance:c,yaw:l,pitch:h,shiftX:d,shiftY:u,roll:f,fov:m,travelling:y,pullback:g,overhead:p}=r;if(za.set(r.center.x,r.center.y,r.center.z),Ai(i,e,za,c,d,u,l,h,f,m),t<=3){let D=Yt.getBoundingClientRect();Bu(st[0].reveal,et,2*Math.max(0,D.top)/Math.max(1,D.height))}Es.update(h,t>=Sn);let E=0,b=0,_=0;st.forEach(D=>{let w=t>=D.cue.start,I=w;Vp(D,yr(t,D.cue),I,en.depth*D.heightFactor,s,n),w&&E++,I&&D.reveal.state.complete&&b++,I&&(!D.reveal.state.complete||n>0&&n<1)&&_++}),Va?.update(t,en,s),Pt.updateMatrixWorld(!0),Bm?.update(et),cd?.update(yr(t,st[0].cue),et,i,e),Om?.update(yr(t,st[0].cue),et,i,e),Pt.fog.near=c+45,Pt.fog.far=c+110,Cr.position.copy(za).add(new V(...ii)),Cr.target.position.copy(za);let M=st.filter(D=>t>=D.cue.start).sort((D,w)=>w.cue.start-D.cue.start)[0],T=a?o:M.index,A=st[T].reveal.state,x=a?"solo":t<Sn+.3?"crescendo":"finale",R=g>.99?dd():Pl(st[T].mesh);et.userData={projection:"cinematic-perspective",framing:R,position:et.position.toArray(),focus:za.toArray(),index:T,progress:t/ni,timeline:t,yaw:l,pitch:h,roll:f,distance:c,travelling:y,pullback:g,overhead:p,ending:n,groundShadows:et.layers.isEnabled(vs),direction:et.getWorldDirection(new V).toArray(),phase:x,generated:E,complete:b,activeReveals:_,reveal:{...A}},km.copy(et,!1)}function Gm(){let i=Cl("#journey"),e=i.getBoundingClientRect().top+scrollY,t=Yt.clientHeight*.85,{start:n,distance:s}=um(e,i.offsetHeight-t,Yt.clientHeight),r=scrollY-n-s;fd?.readScroll();let a=cm(ot.clamp((scrollY-n)/s,0,1)*ed),o=Math.round(a);ht.target=r>=-1?ni:Math.abs(a-o)<.001?Math.min(o,ni):a,Pr()}async function Q1(){let i=new Qc;for(let n=0;n<Ar.length;n++){let s=Ar[n];try{let a=i.parse(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${s.viewBox}" fill="white">${s.svg}</svg>`).paths.flatMap(R=>R.toShapes());if(!a.length)throw new Error("Empty geometry");let o=new ma(a,rd);o.rotateX(Math.PI/2),o.computeBoundingBox();let c=o.boundingBox,l=c.getCenter(new V);o.translate(-l.x,-c.min.y,-l.z);let h=2.25+(K1(n,2)-.5)*.65,d=h/Math.max(c.max.x-c.min.x,c.max.z-c.min.z);o.scale(d,d,d),o.computeBoundingBox(),o.computeBoundingSphere();let u=o.attributes.position,f=0;for(let R=0;R<u.count;R++)f=Math.max(f,Math.hypot(u.getX(R),u.getZ(R)));let m=s.color,y=dl(Vm.clone());y.transparent=!0,y.name=s.id+"-clay";let g=new gt(o,y);g.name=s.id,g.castShadow=!0,g.receiveShadow=!0,g.userData={id:s.id,name:s.name,index:n,source:"SVG",shapeCount:a.length,holeCount:a.reduce((R,D)=>R+D.holes.length,0)},Pt.add(g);let p=h+4.2,[E,b,_,M]=s.viewBox.trim().split(/[\s,]+/).map(Number),T={minX:(E-l.x)*d,maxX:(E+_-l.x)*d,minZ:(b-l.z)*d,maxZ:(b+M-l.z)*d};g.userData.svgBounds=T;let A={svgBounds:T,height:(rd.depth+rd.bevelThickness*2)*d,contours:a.flatMap(R=>[{hole:!1,points:R.getPoints(16)},...R.holes.map(D=>({hole:!0,points:D.getPoints(16)}))]).map(R=>({hole:R.hole,points:R.points.map(D=>[(D.x-l.x)*d,(D.y-l.z)*d])}))};A.path=new Path2D;for(let{points:R}of A.contours)if(R.length){A.path.moveTo(...R[0]);for(let D=1;D<R.length;D++)A.path.lineTo(...R[D]);A.path.closePath()}let x=new gt(new dn(p,p),ml());x.layers.set(vs),x.name=s.id+"-contact",x.rotation.x=-Math.PI/2,x.position.y=.001,x.renderOrder=1,Pt.add(x),st.push({icon:s,color:m,mesh:g,shadow:x,size:h,radius:f,index:n,shadowSpan:p,caster:A,shadowKey:""})}catch(r){od.push({id:s.id,error:r.message})}Zt?.update(5+40*(n+1)/Ar.length),await Zt?.yieldFrame()}if(st.length!==33)throw new Error(`Expected 33 objects, created ${st.length}: ${JSON.stringify(od)}`);let e=0,t=performance.now();for(let n of Wm())e+=n,!(performance.now()-t<12)&&(Zt?.update(45+5*e/st.length),globalThis.scheduler?.yield?await globalThis.scheduler.yield():await new Promise(s=>setTimeout(s,0)),t=performance.now());Zt?.update(50),await Zt?.yieldFrame()}function*Wm(){let i=Yt.clientWidth/Yt.clientHeight<.8,e=jp(i,en.layout,st.map(t=>t.radius));ht.layoutMode=i?"portrait":"landscape";for(let t of st){let{index:n,mesh:s,shadow:r}=t,a=e[n],o=a.x,c=a.z,l=0;t.heightFactor=a.height;let h=en.depth*t.heightFactor;s.position.set(o,.003,c),s.rotation.y=l,s.scale.y=h,r.position.set(o,.001,c),r.rotation.z=l,t.reveal&&(t.reveal.group.position.copy(s.position),t.reveal.group.rotation.copy(s.rotation));let d=`${h}:${l}`;if(t.shadowKey!==d){let u=r.material.map,f=yield*nm(t.caster,t.shadowSpan,h,l);r.material.map=t.patternShadow=f,r.material.needsUpdate=!0,u?.dispose(),t.shadowKey=d}r.material.opacity=en.shadow}Pt.updateMatrixWorld(!0)}function Ll(){if(!Ft||Il)return;if(Ti=Yt.clientWidth,wi=Yt.clientHeight,ht.layoutMode!==(Ti/wi<.8?"portrait":"landscape")){let e=Wm();for(;!e.next().done;);}Ft.setDrawingBufferSize(Ti,wi,2),Hm(Ti,wi);let i=ht.wide;Ai(Ti,wi,i.center,i.distance,0,0,i.yaw,90,0,i.fov),Ts.fit(et,Ti,wi),Gm(),md(Ti,wi),Ts.update(et,Es.mesh,si,et.userData.ending,ka,pd),Ir?.prepare(),Pr()}function Um(){if(!(Yt.clientWidth===Ti&&Yt.clientHeight===wi)){if(Ir&&!Ir.inspect().ready&&!Ir.inspect().error){hd=!0;return}Ll()}}async function eM(i=3840,e=2160){Il=!0;try{return Ft.setPixelRatio(1),Ft.setSize(i,e,!1),Hm(i,e),md(i,e),Ft.render(Pt,et),Ft.domElement.toDataURL("image/png")}finally{Il=!1,Ll()}}async function tM(i){let e=new Ji,t,n=[],s=c=>{let l=c.mesh.material.clone();return l.opacity=1,l.transparent=!1,l.depthWrite=!0,l.color.set(c.color),l.emissive.set(c.color),n.push(l),l};Number.isInteger(i)?(t=st[i].mesh.clone(),t.visible=!0,t.material=s(st[i]),t.position.set(0,0,0),t.rotation.set(0,0,0),t.scale.y=en.depth*st[i].heightFactor):(t=new ln,t.name="CJU_33_COLOR_OBJECTS",st.forEach(c=>{let l=c.mesh.clone();l.visible=!0,l.material=s(c),c.mesh.matrixWorld.decompose(l.position,l.quaternion,l.scale),l.scale.y=en.depth*c.heightFactor,t.add(l)}));let r;try{r=await e.parseAsync(t,{binary:!0})}finally{n.forEach(c=>c.dispose())}let a="",o=new Uint8Array(r);for(let c=0;c<o.length;c+=16384)a+=String.fromCharCode(...o.subarray(c,c+16384));return btoa(a)}async function nM(){try{await Zt?.yieldFrame(),Ft=new $c({antialias:!0,alpha:!1,preserveDrawingBuffer:!0,powerPreference:"high-performance"}),Ft.setClearColor(16448250),Ft.outputColorSpace=vt,Ft.toneMapping=Ta,Ft.toneMappingExposure=1,Ft.shadowMap.enabled=!1,Ft.domElement.setAttribute("aria-label","33\uC885\uC758 \uC6D0\uBCF8 \uCEEC\uB7EC \uC785\uCCB4 \uC544\uC774\uCF58\uC774 \uBC18\uBCF5\uB418\uC5B4 \uBC14\uB2E5\uC744 \uCC44\uC6B0\uB294 \uD328\uD134"),Yt.append(Ft.domElement),Pt=new Zn,Pt.background=new Ve(16448250),Pt.fog=new jr(16448250,10,17),et=new Bt(32,1,.1,250),Pt.add(new Ma(16777215,15855853,1.9)),Cr=new or(16776696,1.7),Cr.position.set(...ii),Pt.add(Cr),Pt.add(Cr.target);let i=new or(16777215,.7);i.position.set(12,16,-8),Pt.add(i),Es=fm(Ft),Pt.add(Es.mesh),Zt?.update(5),await Q1(),window.heroNebula=Im(Cl(".hero-art"),st);for(let[e,t]of st.entries())t.reveal=al(t,void 0,e===0?"viewport":"edge"),Pt.add(t.reveal.group),Zt?.update(50+5*(e+1)/st.length),e%4===3&&await Zt?.yieldFrame();cd=mm(Yt,st[0]),Om=gm(Yt,st[0]),Bm=xm(Yt,st[0].reveal),Va=new gl(Pt,st,Vm),Zt?.update(60),await Zt?.yieldFrame(),Ir=Pm(Ft,Pt,et,()=>{if(hd){hd=!1,Ll();return}Dm(),Zt?.finish()},e=>{if(e.error){Dm(),Zt?.fail();return}Zt?.update(70+29*(e.total?e.completed/e.total:1))}),Ts=tm(Ft,Pt,Pr,(e,t)=>Zt?.update(60+10*e/t)),await Ts.ready,fd=Nm(Yt,(e,t,n)=>{si=e,ka=t,pd=n,Pr()}),Cl("#journey").style.height=`${hm+.85*100}svh`,addEventListener("scroll",Gm,{passive:!0}),addEventListener("resize",Um),Ll(),new ResizeObserver(Um).observe(Yt),window.heroStudio={ready:!0,exportPNG:eM,exportGLB:tM,inspect:()=>({count:st.length,preparation:Ir.inspect(),pattern:Va.inspect(),floor:Es.inspect(),dimension:cd.inspect(),errors:od,settings:{...en},timelineEnd:$1(),cameraPath:{poses:ht.poses,wide:ht.wide},wordFlight:Ts.inspect(),camera:{...et.userData,rotation:et.rotation.toArray(),up:et.up.toArray()},objects:st.map(({mesh:e,icon:t,reveal:n,heightFactor:s,index:r,radius:a,cue:o})=>({id:t.id,name:t.name,vertices:e.geometry.attributes.position.count,triangles:e.geometry.attributes.position.count/3,...e.userData,color:e.material.color.getHexString(),lineColor:n.lines[0].material.color.getHexString(),cue:o,heightFactor:s,radius:a,position:e.position.toArray(),baseY:e.position.y,rotation:e.rotation.toArray(),heightScale:e.scale.y,visible:e.visible,guide:rl(n),drawingVisible:n.group.visible,pointVisible:n.group.visible&&n.dot.visible,strokeVertices:n.lines.reduce((c,l)=>c+l.geometry.drawRange.count,0),reveal:{...n.state}})),renderer:Ft.info.render})}}catch(i){Zt?.fail(),console.warn("Intro unavailable; continuing with the existing main hero.",i),window.MainIntro.complete=!0,window.MainIntro.progress=1,document.body.classList.remove("intro-before-main"),document.body.classList.add("intro-unavailable"),window.dispatchEvent(new CustomEvent("main-intro-handoff",{detail:{complete:!0}})),window.heroStudio={ready:!1,error:String(i)}}}nM();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
