(()=>{var zf=0,qh=1,kf=2;var ka=1,Vf=2,yr=3,Mi=0,Qt=1,en=2,ii=0,ms=1,Zh=2,Yh=3,Jh=4,Hf=5;var Xi=100,Gf=101,Wf=102,Xf=103,qf=104,Zf=200,Yf=201,Jf=202,$f=203,Oo=204,Bo=205,Kf=206,jf=207,Qf=208,ep=209,tp=210,np=211,ip=212,sp=213,rp=214,zo=0,ko=1,Vo=2,gs=3,Ho=4,Go=5,Wo=6,Xo=7,$h=0,ap=1,op=2,On=0,Kh=1,jh=2,Qh=3,Va=4,eu=5,tu=6,nu=7;var iu=300,Qi=301,Ss=302,yc=303,vc=304,Ha=306,En=1e3,rn=1001,qi=1002,At=1003,Mc=1004;var bs=1005;var St=1006,vr=1007;var si=1008;var an=1009,su=1010,ru=1011,Mr=1012,Sc=1013,Bn=1014,An=1015,ri=1016,bc=1017,Ec=1018,Sr=1020,au=35902,ou=35899,cu=1021,lu=1022,on=1023,jn=1026,es=1027,wc=1028,Tc=1029,ts=1030,Ac=1031;var Rc=1033,Ga=33776,Wa=33777,Xa=33778,qa=33779,Cc=35840,Ic=35841,Pc=35842,Lc=35843,Nc=36196,Dc=37492,Uc=37496,Fc=37488,Oc=37489,Za=37490,Bc=37491,zc=37808,kc=37809,Vc=37810,Hc=37811,Gc=37812,Wc=37813,Xc=37814,qc=37815,Zc=37816,Yc=37817,Jc=37818,$c=37819,Kc=37820,jc=37821,Qc=36492,el=36494,tl=36495,nl=36283,il=36284,Ya=36285,sl=36286;var xs=2300,nr=2301,Fo=2302,Ih=2303,Ph=2400,Lh=2401,Nh=2402;var cp=3200;var rl=0,lp=1,zn="",_t="srgb",ca="srgb-linear",la="linear",ht="srgb";var fs=7680;var Dh=519,hp=512,up=513,dp=514,al=515,fp=516,pp=517,ol=518,mp=519,qo=35044,br=35048;var hu="300 es",Dn=2e3,ir=2001;function wg(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Tg(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function ha(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function gp(){let i=ha("canvas");return i.style.display="block",i}var Kd={},sr=null;function ua(...i){let e="THREE."+i.shift();sr?sr("log",e,...i):console.log(e,...i)}function xp(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Xe(...i){i=xp(i);let e="THREE."+i.shift();if(sr)sr("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ye(...i){i=xp(i);let e="THREE."+i.shift();if(sr)sr("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function ps(...i){let e=i.join(" ");e in Kd||(Kd[e]=!0,Xe(...i))}function _p(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var yp={[zo]:ko,[Vo]:Wo,[Ho]:Xo,[gs]:Go,[ko]:zo,[Wo]:Vo,[Xo]:Ho,[Go]:gs},Qn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],jd=1234567,sa=Math.PI/180,rr=180/Math.PI;function Kn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Xt[i&255]+Xt[i>>8&255]+Xt[i>>16&255]+Xt[i>>24&255]+"-"+Xt[e&255]+Xt[e>>8&255]+"-"+Xt[e>>16&15|64]+Xt[e>>24&255]+"-"+Xt[t&63|128]+Xt[t>>8&255]+"-"+Xt[t>>16&255]+Xt[t>>24&255]+Xt[n&255]+Xt[n>>8&255]+Xt[n>>16&255]+Xt[n>>24&255]).toLowerCase()}function $e(i,e,t){return Math.max(e,Math.min(t,i))}function uu(i,e){return(i%e+e)%e}function Ag(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Rg(i,e,t){return i!==e?(t-i)/(e-i):0}function ra(i,e,t){return(1-t)*i+t*e}function Cg(i,e,t,n){return ra(i,e,1-Math.exp(-t*n))}function Ig(i,e=1){return e-Math.abs(uu(i,e*2)-e)}function Pg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Lg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Ng(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Dg(i,e){return i+Math.random()*(e-i)}function Ug(i){return i*(.5-Math.random())}function Fg(i){i!==void 0&&(jd=i);let e=jd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Og(i){return i*sa}function Bg(i){return i*rr}function zg(i){return(i&i-1)===0&&i!==0}function kg(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Vg(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Hg(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),m=a((n-e)/2);switch(s){case"XYX":i.set(o*h,c*u,c*d,o*l);break;case"YZY":i.set(c*d,o*h,c*u,o*l);break;case"ZXZ":i.set(c*u,c*d,o*h,o*l);break;case"XZX":i.set(o*h,c*m,c*f,o*l);break;case"YXY":i.set(c*f,o*h,c*m,o*l);break;case"ZYZ":i.set(c*m,c*f,o*h,o*l);break;default:Xe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Nn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ft(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var ct={DEG2RAD:sa,RAD2DEG:rr,generateUUID:Kn,clamp:$e,euclideanModulo:uu,mapLinear:Ag,inverseLerp:Rg,lerp:ra,damp:Cg,pingpong:Ig,smoothstep:Pg,smootherstep:Lg,randInt:Ng,randFloat:Dg,randFloatSpread:Ug,seededRandom:Fg,degToRad:Og,radToDeg:Bg,isPowerOfTwo:zg,ceilPowerOfTwo:kg,floorPowerOfTwo:Vg,setQuaternionFromProperEuler:Hg,normalize:ft,denormalize:Nn},xu=class xu{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};xu.prototype.isVector2=!0;var de=xu,wn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],d=r[a+0],f=r[a+1],m=r[a+2],_=r[a+3];if(u!==_||c!==d||l!==f||h!==m){let g=c*d+l*f+h*m+u*_;g<0&&(d=-d,f=-f,m=-m,_=-_,g=-g);let p=1-o;if(g<.9995){let b=Math.acos(g),M=Math.sin(b);p=Math.sin(p*b)/M,o=Math.sin(o*b)/M,c=c*p+d*o,l=l*p+f*o,h=h*p+m*o,u=u*p+_*o}else{c=c*p+d*o,l=l*p+f*o,h=h*p+m*o,u=u*p+_*o;let b=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=b,l*=b,h*=b,u*=b}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[a],d=r[a+1],f=r[a+2],m=r[a+3];return e[t]=o*m+h*u+c*f-l*d,e[t+1]=c*m+h*d+l*u-o*f,e[t+2]=l*m+h*f+o*d-c*u,e[t+3]=h*m-o*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),u=o(r/2),d=c(n/2),f=c(s/2),m=c(r/2);switch(a){case"XYZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"YZX":this._x=d*h*u+l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u-d*f*m;break;case"XZY":this._x=d*h*u-l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u+d*f*m;break;default:Xe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>u){let f=2*Math.sqrt(1+n-o-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>u){let f=2*Math.sqrt(1+o-n-u);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($e(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},_u=class _u{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Qd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Qd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),h=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=s+c*u+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return nh.copy(this).projectOnVector(e),this.sub(nh)}reflect(e){return this.sub(nh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};_u.prototype.isVector3=!0;var z=_u,nh=new z,Qd=new wn,yu=class yu{constructor(e,t,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],_=s[0],g=s[3],p=s[6],b=s[1],M=s[4],x=s[7],E=s[2],w=s[5],C=s[8];return r[0]=a*_+o*b+c*E,r[3]=a*g+o*M+c*w,r[6]=a*p+o*x+c*C,r[1]=l*_+h*b+u*E,r[4]=l*g+h*M+u*w,r[7]=l*p+h*x+u*C,r[2]=d*_+f*b+m*E,r[5]=d*g+f*M+m*w,r[8]=d*p+f*x+m*C,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*r,f=l*r-a*c,m=t*u+n*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return e[0]=u*_,e[1]=(s*l-h*n)*_,e[2]=(o*n-s*a)*_,e[3]=d*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-o*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return ps("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ih.makeScale(e,t)),this}rotate(e){return ps("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ih.makeRotation(-e)),this}translate(e,t){return ps("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ih.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};yu.prototype.isMatrix3=!0;var qe=yu,ih=new qe,ef=new qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),tf=new qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Gg(){let i={enabled:!0,workingColorSpace:ca,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ht&&(s.r=vi(s.r),s.g=vi(s.g),s.b=vi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ht&&(s.r=tr(s.r),s.g=tr(s.g),s.b=tr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===zn?la:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ps("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ps("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ca]:{primaries:e,whitePoint:n,transfer:la,toXYZ:ef,fromXYZ:tf,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:_t},outputColorSpaceConfig:{drawingBufferColorSpace:_t}},[_t]:{primaries:e,whitePoint:n,transfer:ht,toXYZ:ef,fromXYZ:tf,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:_t}}}),i}var st=Gg();function vi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function tr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Fs,ar=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Fs===void 0&&(Fs=ha("canvas")),Fs.width=e.width,Fs.height=e.height;let s=Fs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Fs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ha("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=vi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(vi(t[n]/255)*255):t[n]=vi(t[n]);return{data:t,width:e.width,height:e.height}}else return Xe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Wg=0,Si=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wg++}),this.uuid=Kn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(sh(s[a].image)):r.push(sh(s[a]))}else r=sh(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function sh(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ar.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Xe("Texture: Unable to serialize Texture."),{})}var Xg=0,rh=new z,Ut=class i extends Qn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=rn,s=rn,r=St,a=si,o=on,c=an,l=i.DEFAULT_ANISOTROPY,h=zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xg++}),this.uuid=Kn(),this.name="",this.source=new Si(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new de(0,0),this.repeat=new de(1,1),this.center=new de(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(rh).x}get height(){return this.source.getSize(rh).y}get depth(){return this.source.getSize(rh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Xe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Xe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==iu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case En:e.x=e.x-Math.floor(e.x);break;case rn:e.x=e.x<0?0:1;break;case qi:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case En:e.y=e.y-Math.floor(e.y);break;case rn:e.y=e.y<0?0:1;break;case qi:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ut.DEFAULT_IMAGE=null;Ut.DEFAULT_MAPPING=iu;Ut.DEFAULT_ANISOTROPY=1;var vu=class vu{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],m=c[9],_=c[2],g=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(m+g)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let M=(l+1)/2,x=(f+1)/2,E=(p+1)/2,w=(h+d)/4,C=(u+_)/4,y=(m+g)/4;return M>x&&M>E?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=w/n,r=C/n):x>E?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=w/s,r=y/s):E<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),n=C/r,s=y/r),this.set(n,s,r,t),this}let b=Math.sqrt((g-m)*(g-m)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(g-m)/b,this.y=(u-_)/b,this.z=(d-h)/b,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this.w=$e(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this.w=$e(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};vu.prototype.isVector4=!0;var ot=vu,Zo=class extends Qn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:St,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ot(0,0,e,t),this.scissorTest=!1,this.viewport=new ot(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new Ut(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:St,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Si(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},jt=class extends Zo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},da=class extends Ut{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=At,this.minFilter=At,this.wrapR=rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Yo=class extends Ut{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=At,this.minFilter=At,this.wrapR=rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var _c=class _c{constructor(e,t,n,s,r,a,o,c,l,h,u,d,f,m,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,h,u,d,f,m,_,g)}set(e,t,n,s,r,a,o,c,l,h,u,d,f,m,_,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new _c().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/Os.setFromMatrixColumn(e,0).length(),r=1/Os.setFromMatrixColumn(e,1).length(),a=1/Os.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=a*h,f=a*u,m=o*h,_=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+m*l,t[5]=d-_*l,t[9]=-o*c,t[2]=_-d*l,t[6]=m+f*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*h,f=c*u,m=l*h,_=l*u;t[0]=d+_*o,t[4]=m*o-f,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-m,t[6]=_+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*h,f=c*u,m=l*h,_=l*u;t[0]=d-_*o,t[4]=-a*u,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*h,f=a*u,m=o*h,_=o*u;t[0]=c*h,t[4]=m*l-f,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=f*l-m,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,f=a*l,m=o*c,_=o*l;t[0]=c*h,t[4]=_-d*u,t[8]=m*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=f*u+m,t[10]=d-_*u}else if(e.order==="XZY"){let d=a*c,f=a*l,m=o*c,_=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=a*h,t[9]=f*u-m,t[2]=m*u-f,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(qg,e,Zg)}lookAt(e,t,n){let s=this.elements;return un.subVectors(e,t),un.lengthSq()===0&&(un.z=1),un.normalize(),zi.crossVectors(n,un),zi.lengthSq()===0&&(Math.abs(n.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),zi.crossVectors(n,un)),zi.normalize(),ao.crossVectors(un,zi),s[0]=zi.x,s[4]=ao.x,s[8]=un.x,s[1]=zi.y,s[5]=ao.y,s[9]=un.y,s[2]=zi.z,s[6]=ao.z,s[10]=un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],_=n[6],g=n[10],p=n[14],b=n[3],M=n[7],x=n[11],E=n[15],w=s[0],C=s[4],y=s[8],A=s[12],D=s[1],T=s[5],I=s[9],B=s[13],F=s[2],U=s[6],X=s[10],H=s[14],G=s[3],K=s[7],ie=s[11],he=s[15];return r[0]=a*w+o*D+c*F+l*G,r[4]=a*C+o*T+c*U+l*K,r[8]=a*y+o*I+c*X+l*ie,r[12]=a*A+o*B+c*H+l*he,r[1]=h*w+u*D+d*F+f*G,r[5]=h*C+u*T+d*U+f*K,r[9]=h*y+u*I+d*X+f*ie,r[13]=h*A+u*B+d*H+f*he,r[2]=m*w+_*D+g*F+p*G,r[6]=m*C+_*T+g*U+p*K,r[10]=m*y+_*I+g*X+p*ie,r[14]=m*A+_*B+g*H+p*he,r[3]=b*w+M*D+x*F+E*G,r[7]=b*C+M*T+x*U+E*K,r[11]=b*y+M*I+x*X+E*ie,r[15]=b*A+M*B+x*H+E*he,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],m=e[3],_=e[7],g=e[11],p=e[15],b=c*f-l*d,M=o*f-l*u,x=o*d-c*u,E=a*f-l*h,w=a*d-c*h,C=a*u-o*h;return t*(_*b-g*M+p*x)-n*(m*b-g*E+p*w)+s*(m*M-_*E+p*C)-r*(m*x-_*w+g*C)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-n*(r*h-o*c)+s*(r*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],m=e[12],_=e[13],g=e[14],p=e[15],b=t*o-n*a,M=t*c-s*a,x=t*l-r*a,E=n*c-s*o,w=n*l-r*o,C=s*l-r*c,y=h*_-u*m,A=h*g-d*m,D=h*p-f*m,T=u*g-d*_,I=u*p-f*_,B=d*p-f*g,F=b*B-M*I+x*T+E*D-w*A+C*y;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let U=1/F;return e[0]=(o*B-c*I+l*T)*U,e[1]=(s*I-n*B-r*T)*U,e[2]=(_*C-g*w+p*E)*U,e[3]=(d*w-u*C-f*E)*U,e[4]=(c*D-a*B-l*A)*U,e[5]=(t*B-s*D+r*A)*U,e[6]=(g*x-m*C-p*M)*U,e[7]=(h*C-d*x+f*M)*U,e[8]=(a*I-o*D+l*y)*U,e[9]=(n*D-t*I-r*y)*U,e[10]=(m*w-_*x+p*b)*U,e[11]=(u*x-h*w-f*b)*U,e[12]=(o*A-a*T-c*y)*U,e[13]=(t*T-n*A+s*y)*U,e[14]=(_*M-m*E-g*b)*U,e[15]=(h*E-u*M+d*b)*U,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,u=o+o,d=r*l,f=r*h,m=r*u,_=a*h,g=a*u,p=o*u,b=c*l,M=c*h,x=c*u,E=n.x,w=n.y,C=n.z;return s[0]=(1-(_+p))*E,s[1]=(f+x)*E,s[2]=(m-M)*E,s[3]=0,s[4]=(f-x)*w,s[5]=(1-(d+p))*w,s[6]=(g+b)*w,s[7]=0,s[8]=(m+M)*C,s[9]=(g-b)*C,s[10]=(1-(d+_))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Os.set(s[0],s[1],s[2]).length(),o=Os.set(s[4],s[5],s[6]).length(),c=Os.set(s[8],s[9],s[10]).length();r<0&&(a=-a),In.copy(this);let l=1/a,h=1/o,u=1/c;return In.elements[0]*=l,In.elements[1]*=l,In.elements[2]*=l,In.elements[4]*=h,In.elements[5]*=h,In.elements[6]*=h,In.elements[8]*=u,In.elements[9]*=u,In.elements[10]*=u,t.setFromRotationMatrix(In),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=Dn,c=!1){let l=this.elements,h=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s),m,_;if(c)m=r/(a-r),_=a*r/(a-r);else if(o===Dn)m=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===ir)m=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Dn,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-s),d=-(t+e)/(t-e),f=-(n+s)/(n-s),m,_;if(c)m=1/(a-r),_=a/(a-r);else if(o===Dn)m=-2/(a-r),_=-(a+r)/(a-r);else if(o===ir)m=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};_c.prototype.isMatrix4=!0;var nt=_c,Os=new z,In=new nt,qg=new z(0,0,0),Zg=new z(1,1,1),zi=new z,ao=new z,un=new z,nf=new nt,sf=new wn,bi=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin($e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin($e(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-$e(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin($e(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-$e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Xe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return nf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(nf,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return sf.setFromEuler(this),this.setFromQuaternion(sf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};bi.DEFAULT_ORDER="XYZ";var or=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Yg=0,rf=new z,Bs=new wn,fi=new nt,oo=new z,Zr=new z,Jg=new z,$g=new wn,af=new z(1,0,0),of=new z(0,1,0),cf=new z(0,0,1),lf={type:"added"},Kg={type:"removed"},zs={type:"childadded",child:null},ah={type:"childremoved",child:null},Lt=class i extends Qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yg++}),this.uuid=Kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new z,t=new bi,n=new wn,s=new z(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new nt},normalMatrix:{value:new qe}}),this.matrix=new nt,this.matrixWorld=new nt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new or,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Bs.setFromAxisAngle(e,t),this.quaternion.multiply(Bs),this}rotateOnWorldAxis(e,t){return Bs.setFromAxisAngle(e,t),this.quaternion.premultiply(Bs),this}rotateX(e){return this.rotateOnAxis(af,e)}rotateY(e){return this.rotateOnAxis(of,e)}rotateZ(e){return this.rotateOnAxis(cf,e)}translateOnAxis(e,t){return rf.copy(e).applyQuaternion(this.quaternion),this.position.add(rf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(af,e)}translateY(e){return this.translateOnAxis(of,e)}translateZ(e){return this.translateOnAxis(cf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(fi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?oo.copy(e):oo.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Zr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fi.lookAt(Zr,oo,this.up):fi.lookAt(oo,Zr,this.up),this.quaternion.setFromRotationMatrix(fi),s&&(fi.extractRotation(s.matrixWorld),Bs.setFromRotationMatrix(fi),this.quaternion.premultiply(Bs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ye("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(lf),zs.child=e,this.dispatchEvent(zs),zs.child=null):Ye("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Kg),ah.child=e,this.dispatchEvent(ah),ah.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),fi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),fi.multiply(e.parent.matrixWorld)),e.applyMatrix4(fi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(lf),zs.child=e,this.dispatchEvent(zs),zs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zr,e,Jg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zr,$g,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};Lt.DEFAULT_UP=new z(0,1,0);Lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var fn=class extends Lt{constructor(){super(),this.isGroup=!0,this.type="Group"}},jg={type:"move"},cr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let _ of e.hand.values()){let g=t.getJointPose(_,n),p=this._getHandJoint(l,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;l.inputState.pinching&&d>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(jg)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new fn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},vp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ki={h:0,s:0,l:0},co={h:0,s:0,l:0};function oh(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var ke=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=_t){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=st.workingColorSpace){return this.r=e,this.g=t,this.b=n,st.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=st.workingColorSpace){if(e=uu(e,1),t=$e(t,0,1),n=$e(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=oh(a,r,e+1/3),this.g=oh(a,r,e),this.b=oh(a,r,e-1/3)}return st.colorSpaceToWorking(this,s),this}setStyle(e,t=_t){function n(r){r!==void 0&&parseFloat(r)<1&&Xe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Xe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Xe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=_t){let n=vp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Xe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=vi(e.r),this.g=vi(e.g),this.b=vi(e.b),this}copyLinearToSRGB(e){return this.r=tr(e.r),this.g=tr(e.g),this.b=tr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=_t){return st.workingToColorSpace(qt.copy(this),e),Math.round($e(qt.r*255,0,255))*65536+Math.round($e(qt.g*255,0,255))*256+Math.round($e(qt.b*255,0,255))}getHexString(e=_t){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.workingToColorSpace(qt.copy(this),t);let n=qt.r,s=qt.g,r=qt.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=st.workingColorSpace){return st.workingToColorSpace(qt.copy(this),t),e.r=qt.r,e.g=qt.g,e.b=qt.b,e}getStyle(e=_t){st.workingToColorSpace(qt.copy(this),e);let t=qt.r,n=qt.g,s=qt.b;return e!==_t?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(ki),this.setHSL(ki.h+e,ki.s+t,ki.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ki),e.getHSL(co);let n=ra(ki.h,co.h,t),s=ra(ki.s,co.s,t),r=ra(ki.l,co.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},qt=new ke;ke.NAMES=vp;var fa=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new ke(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Tn=class extends Lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new bi,this.environmentIntensity=1,this.environmentRotation=new bi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Pn=new z,pi=new z,ch=new z,mi=new z,ks=new z,Vs=new z,hf=new z,lh=new z,hh=new z,uh=new z,dh=new ot,fh=new ot,ph=new ot,yi=class i{constructor(e=new z,t=new z,n=new z){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Pn.subVectors(e,t),s.cross(Pn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Pn.subVectors(s,t),pi.subVectors(n,t),ch.subVectors(e,t);let a=Pn.dot(Pn),o=Pn.dot(pi),c=Pn.dot(ch),l=pi.dot(pi),h=pi.dot(ch),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(l*c-o*h)*d,m=(a*h-o*c)*d;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,mi)===null?!1:mi.x>=0&&mi.y>=0&&mi.x+mi.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,mi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,mi.x),c.addScaledVector(a,mi.y),c.addScaledVector(o,mi.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return dh.setScalar(0),fh.setScalar(0),ph.setScalar(0),dh.fromBufferAttribute(e,t),fh.fromBufferAttribute(e,n),ph.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(dh,r.x),a.addScaledVector(fh,r.y),a.addScaledVector(ph,r.z),a}static isFrontFacing(e,t,n,s){return Pn.subVectors(n,t),pi.subVectors(e,t),Pn.cross(pi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Pn.subVectors(this.c,this.b),pi.subVectors(this.a,this.b),Pn.cross(pi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;ks.subVectors(s,n),Vs.subVectors(r,n),lh.subVectors(e,n);let c=ks.dot(lh),l=Vs.dot(lh);if(c<=0&&l<=0)return t.copy(n);hh.subVectors(e,s);let h=ks.dot(hh),u=Vs.dot(hh);if(h>=0&&u<=h)return t.copy(s);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(ks,a);uh.subVectors(e,r);let f=ks.dot(uh),m=Vs.dot(uh);if(m>=0&&f<=m)return t.copy(r);let _=f*l-c*m;if(_<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(Vs,o);let g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return hf.subVectors(r,s),o=(u-h)/(u-h+(f-m)),t.copy(s).addScaledVector(hf,o);let p=1/(g+_+d);return a=_*p,o=d*p,t.copy(n).addScaledVector(ks,a).addScaledVector(Vs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Rt=class{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ln.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ln.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Ln.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ln):Ln.fromBufferAttribute(r,a),Ln.applyMatrix4(e.matrixWorld),this.expandByPoint(Ln);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),lo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),lo.copy(n.boundingBox)),lo.applyMatrix4(e.matrixWorld),this.union(lo)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ln),Ln.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Yr),ho.subVectors(this.max,Yr),Hs.subVectors(e.a,Yr),Gs.subVectors(e.b,Yr),Ws.subVectors(e.c,Yr),Vi.subVectors(Gs,Hs),Hi.subVectors(Ws,Gs),ls.subVectors(Hs,Ws);let t=[0,-Vi.z,Vi.y,0,-Hi.z,Hi.y,0,-ls.z,ls.y,Vi.z,0,-Vi.x,Hi.z,0,-Hi.x,ls.z,0,-ls.x,-Vi.y,Vi.x,0,-Hi.y,Hi.x,0,-ls.y,ls.x,0];return!mh(t,Hs,Gs,Ws,ho)||(t=[1,0,0,0,1,0,0,0,1],!mh(t,Hs,Gs,Ws,ho))?!1:(uo.crossVectors(Vi,Hi),t=[uo.x,uo.y,uo.z],mh(t,Hs,Gs,Ws,ho))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ln).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ln).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},gi=[new z,new z,new z,new z,new z,new z,new z,new z],Ln=new z,lo=new Rt,Hs=new z,Gs=new z,Ws=new z,Vi=new z,Hi=new z,ls=new z,Yr=new z,ho=new z,uo=new z,hs=new z;function mh(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){hs.fromArray(i,r);let o=s.x*Math.abs(hs.x)+s.y*Math.abs(hs.y)+s.z*Math.abs(hs.z),c=e.dot(hs),l=t.dot(hs),h=n.dot(hs);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Dt=new z,fo=new de,Qg=0,Mt=class extends Qn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Qg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=qo,this.updateRanges=[],this.gpuType=An,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)fo.fromBufferAttribute(this,t),fo.applyMatrix3(e),this.setXY(t,fo.x,fo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix3(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Nn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ft(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Nn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Nn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Nn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Nn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),s=ft(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),s=ft(s,this.array),r=ft(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==qo&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var pa=class extends Mt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var ma=class extends Mt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var ut=class extends Mt{constructor(e,t,n){super(new Float32Array(e),t,n)}},e0=new Rt,Jr=new z,gh=new z,pn=class{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):e0.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Jr.subVectors(e,this.center);let t=Jr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Jr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(gh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Jr.copy(e.center).add(gh)),this.expandByPoint(Jr.copy(e.center).sub(gh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},t0=0,bn=new nt,xh=new Lt,Xs=new z,dn=new Rt,$r=new Rt,zt=new z,Et=class i extends Qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:t0++}),this.uuid=Kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(wg(e)?ma:pa)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new qe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return bn.makeRotationFromQuaternion(e),this.applyMatrix4(bn),this}rotateX(e){return bn.makeRotationX(e),this.applyMatrix4(bn),this}rotateY(e){return bn.makeRotationY(e),this.applyMatrix4(bn),this}rotateZ(e){return bn.makeRotationZ(e),this.applyMatrix4(bn),this}translate(e,t,n){return bn.makeTranslation(e,t,n),this.applyMatrix4(bn),this}scale(e,t,n){return bn.makeScale(e,t,n),this.applyMatrix4(bn),this}lookAt(e){return xh.lookAt(e),xh.updateMatrix(),this.applyMatrix4(xh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xs).negate(),this.translate(Xs.x,Xs.y,Xs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ut(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Xe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];dn.setFromBufferAttribute(r),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,dn.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,dn.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(dn.min),this.boundingBox.expandByPoint(dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ye('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(e){let n=this.boundingSphere.center;if(dn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];$r.setFromBufferAttribute(o),this.morphTargetsRelative?(zt.addVectors(dn.min,$r.min),dn.expandByPoint(zt),zt.addVectors(dn.max,$r.max),dn.expandByPoint(zt)):(dn.expandByPoint($r.min),dn.expandByPoint($r.max))}dn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)zt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(zt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)zt.fromBufferAttribute(o,l),c&&(Xs.fromBufferAttribute(e,l),zt.add(Xs)),s=Math.max(s,n.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ye('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ye("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Mt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let y=0;y<n.count;y++)o[y]=new z,c[y]=new z;let l=new z,h=new z,u=new z,d=new de,f=new de,m=new de,_=new z,g=new z;function p(y,A,D){l.fromBufferAttribute(n,y),h.fromBufferAttribute(n,A),u.fromBufferAttribute(n,D),d.fromBufferAttribute(r,y),f.fromBufferAttribute(r,A),m.fromBufferAttribute(r,D),h.sub(l),u.sub(l),f.sub(d),m.sub(d);let T=1/(f.x*m.y-m.x*f.y);isFinite(T)&&(_.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(T),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(T),o[y].add(_),o[A].add(_),o[D].add(_),c[y].add(g),c[A].add(g),c[D].add(g))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let y=0,A=b.length;y<A;++y){let D=b[y],T=D.start,I=D.count;for(let B=T,F=T+I;B<F;B+=3)p(e.getX(B+0),e.getX(B+1),e.getX(B+2))}let M=new z,x=new z,E=new z,w=new z;function C(y){E.fromBufferAttribute(s,y),w.copy(E);let A=o[y];M.copy(A),M.sub(E.multiplyScalar(E.dot(A))).normalize(),x.crossVectors(w,A);let T=x.dot(c[y])<0?-1:1;a.setXYZW(y,M.x,M.y,M.z,T)}for(let y=0,A=b.length;y<A;++y){let D=b[y],T=D.start,I=D.count;for(let B=T,F=T+I;B<F;B+=3)C(e.getX(B+0)),C(e.getX(B+1)),C(e.getX(B+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Mt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new z,r=new z,a=new z,o=new z,c=new z,l=new z,h=new z,u=new z;if(e)for(let d=0,f=e.count;d<f;d+=3){let m=e.getX(d+0),_=e.getX(d+1),g=e.getX(d+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,g),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),o.add(h),c.add(h),l.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)zt.fromBufferAttribute(e,t),zt.normalize(),e.setXYZ(t,zt.x,zt.y,zt.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h),f=0,m=0;for(let _=0,g=c.length;_<g;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*h;for(let p=0;p<h;p++)d[m++]=l[f++]}return new Mt(d,h,u)}if(this.index===null)return Xe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){let d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},ga=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=qo,this.updateRanges=[],this.version=0,this.uuid=Kn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Kt=new z,mn=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix4(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyNormalMatrix(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.transformDirection(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Nn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ft(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Nn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Nn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Nn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Nn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),s=ft(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),s=ft(s,this.array),r=ft(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){ua("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Mt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ua("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},n0=0,ei=class extends Qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:n0++}),this.uuid=Kn(),this.name="",this.type="Material",this.blending=ms,this.side=Mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Oo,this.blendDst=Bo,this.blendEquation=Xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ke(0,0,0),this.blendAlpha=0,this.depthFunc=gs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Dh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fs,this.stencilZFail=fs,this.stencilZPass=fs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Xe(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Xe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ms&&(n.blending=this.blending),this.side!==Mi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Oo&&(n.blendSrc=this.blendSrc),this.blendDst!==Bo&&(n.blendDst=this.blendDst),this.blendEquation!==Xi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==gs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Dh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==fs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==fs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ke().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new de().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new de().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},lr=class extends ei{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ke(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},qs,Kr=new z,Zs=new z,Ys=new z,Js=new de,jr=new de,Mp=new nt,po=new z,Qr=new z,mo=new z,uf=new de,_h=new de,df=new de,xa=class extends Lt{constructor(e=new lr){if(super(),this.isSprite=!0,this.type="Sprite",qs===void 0){qs=new Et;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ga(t,5);qs.setIndex([0,1,2,0,2,3]),qs.setAttribute("position",new mn(n,3,0,!1)),qs.setAttribute("uv",new mn(n,2,3,!1))}this.geometry=qs,this.material=e,this.center=new de(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Ye('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Zs.setFromMatrixScale(this.matrixWorld),Mp.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ys.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Zs.multiplyScalar(-Ys.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;go(po.set(-.5,-.5,0),Ys,a,Zs,s,r),go(Qr.set(.5,-.5,0),Ys,a,Zs,s,r),go(mo.set(.5,.5,0),Ys,a,Zs,s,r),uf.set(0,0),_h.set(1,0),df.set(1,1);let o=e.ray.intersectTriangle(po,Qr,mo,!1,Kr);if(o===null&&(go(Qr.set(-.5,.5,0),Ys,a,Zs,s,r),_h.set(0,1),o=e.ray.intersectTriangle(po,mo,Qr,!1,Kr),o===null))return;let c=e.ray.origin.distanceTo(Kr);c<e.near||c>e.far||t.push({distance:c,point:Kr.clone(),uv:yi.getInterpolation(Kr,po,Qr,mo,uf,_h,df,new de),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function go(i,e,t,n,s,r){Js.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(jr.x=r*Js.x-s*Js.y,jr.y=s*Js.x+r*Js.y):jr.copy(Js),i.copy(e),i.x+=jr.x,i.y+=jr.y,i.applyMatrix4(Mp)}var xi=new z,yh=new z,xo=new z,Gi=new z,vh=new z,_o=new z,Mh=new z,hr=class{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,xi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=xi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(xi.copy(this.origin).addScaledVector(this.direction,t),xi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){yh.copy(e).add(t).multiplyScalar(.5),xo.copy(t).sub(e).normalize(),Gi.copy(this.origin).sub(yh);let r=e.distanceTo(t)*.5,a=-this.direction.dot(xo),o=Gi.dot(this.direction),c=-Gi.dot(xo),l=Gi.lengthSq(),h=Math.abs(1-a*a),u,d,f,m;if(h>0)if(u=a*c-o,d=a*o-c,m=r*h,u>=0)if(d>=-m)if(d<=m){let _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d<=-m?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=m?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(yh).addScaledVector(xo,d),f}intersectSphere(e,t){xi.subVectors(e.center,this.origin);let n=xi.dot(this.direction),s=xi.dot(xi)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,xi)!==null}intersectTriangle(e,t,n,s,r){vh.subVectors(t,e),_o.subVectors(n,e),Mh.crossVectors(vh,_o);let a=this.direction.dot(Mh),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Gi.subVectors(this.origin,e);let c=o*this.direction.dot(_o.crossVectors(Gi,_o));if(c<0)return null;let l=o*this.direction.dot(vh.cross(Gi));if(l<0||c+l>a)return null;let h=-o*Gi.dot(Mh);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Yt=class extends ei{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bi,this.combine=$h,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ff=new nt,us=new hr,yo=new pn,pf=new z,vo=new z,Mo=new z,So=new z,Sh=new z,bo=new z,mf=new z,Eo=new z,pt=class extends Lt{constructor(e=new Et,t=new Yt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){bo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],u=r[c];h!==0&&(Sh.fromBufferAttribute(u,e),a?bo.addScaledVector(Sh,h):bo.addScaledVector(Sh.sub(t),h))}t.add(bo)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),yo.copy(n.boundingSphere),yo.applyMatrix4(r),us.copy(e.ray).recast(e.near),!(yo.containsPoint(us.origin)===!1&&(us.intersectSphere(yo,pf)===null||us.origin.distanceToSquared(pf)>(e.far-e.near)**2))&&(ff.copy(r).invert(),us.copy(e.ray).applyMatrix4(ff),!(n.boundingBox!==null&&us.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,us)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){let g=d[m],p=a[g.materialIndex],b=Math.max(g.start,f.start),M=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let x=b,E=M;x<E;x+=3){let w=o.getX(x),C=o.getX(x+1),y=o.getX(x+2);s=wo(this,p,e,n,l,h,u,w,C,y),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){let b=o.getX(g),M=o.getX(g+1),x=o.getX(g+2);s=wo(this,a,e,n,l,h,u,b,M,x),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){let g=d[m],p=a[g.materialIndex],b=Math.max(g.start,f.start),M=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let x=b,E=M;x<E;x+=3){let w=x,C=x+1,y=x+2;s=wo(this,p,e,n,l,h,u,w,C,y),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){let b=g,M=g+1,x=g+2;s=wo(this,a,e,n,l,h,u,b,M,x),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function i0(i,e,t,n,s,r,a,o){let c;if(e.side===Qt?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===Mi,o),c===null)return null;Eo.copy(o),Eo.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Eo);return l<t.near||l>t.far?null:{distance:l,point:Eo.clone(),object:i}}function wo(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,vo),i.getVertexPosition(c,Mo),i.getVertexPosition(l,So);let h=i0(i,e,t,n,vo,Mo,So,mf);if(h){let u=new z;yi.getBarycoord(mf,vo,Mo,So,u),s&&(h.uv=yi.getInterpolatedAttribute(s,o,c,l,u,new de)),r&&(h.uv1=yi.getInterpolatedAttribute(r,o,c,l,u,new de)),a&&(h.normal=yi.getInterpolatedAttribute(a,o,c,l,u,new z),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new z,materialIndex:0};yi.getNormal(vo,Mo,So,d.normal),h.face=d,h.barycoord=u}return h}var _a=class extends Ut{constructor(e=null,t=1,n=1,s,r,a,o,c,l=At,h=At,u,d){super(null,a,o,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Un=class extends Mt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},$s=new nt,gf=new nt,To=[],xf=new Rt,s0=new nt,ea=new pt,ta=new pn,ur=class extends pt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Un(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,s0)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Rt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,$s),xf.copy(e.boundingBox).applyMatrix4($s),this.boundingBox.union(xf)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new pn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,$s),ta.copy(e.boundingSphere).applyMatrix4($s),this.boundingSphere.union(ta)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(ea.geometry=this.geometry,ea.material=this.material,ea.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ta.copy(this.boundingSphere),ta.applyMatrix4(n),e.ray.intersectsSphere(ta)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,$s),gf.multiplyMatrices(n,$s),ea.matrixWorld=gf,ea.raycast(e,To);for(let a=0,o=To.length;a<o;a++){let c=To[a];c.instanceId=r,c.object=this,t.push(c)}To.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Un(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new _a(new Float32Array(s*this.count),s,this.count,wc,An));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},bh=new z,r0=new z,a0=new qe,Zt=class{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=bh.subVectors(n,t).cross(r0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(bh),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||a0.getNormalMatrix(e),s=this.coplanarPoint(bh).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},ds=new pn,o0=new de(.5,.5),Ao=new z,dr=class{constructor(e=new Zt,t=new Zt,n=new Zt,s=new Zt,r=new Zt,a=new Zt){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Dn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],u=r[5],d=r[6],f=r[7],m=r[8],_=r[9],g=r[10],p=r[11],b=r[12],M=r[13],x=r[14],E=r[15];if(s[0].setComponents(l-a,f-h,p-m,E-b).normalize(),s[1].setComponents(l+a,f+h,p+m,E+b).normalize(),s[2].setComponents(l+o,f+u,p+_,E+M).normalize(),s[3].setComponents(l-o,f-u,p-_,E-M).normalize(),n)s[4].setComponents(c,d,g,x).normalize(),s[5].setComponents(l-c,f-d,p-g,E-x).normalize();else if(s[4].setComponents(l-c,f-d,p-g,E-x).normalize(),t===Dn)s[5].setComponents(l+c,f+d,p+g,E+x).normalize();else if(t===ir)s[5].setComponents(c,d,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ds.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ds.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ds)}intersectsSprite(e){ds.center.set(0,0,0);let t=o0.distanceTo(e.center);return ds.radius=.7071067811865476+t,ds.applyMatrix4(e.matrixWorld),this.intersectsSphere(ds)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Ao.x=s.normal.x>0?e.max.x:e.min.x,Ao.y=s.normal.y>0?e.max.y:e.min.y,Ao.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ao)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Zi=class extends ei{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ke(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Jo=new z,$o=new z,_f=new nt,na=new hr,Ro=new pn,Eh=new z,yf=new z,_s=class extends Lt{constructor(e=new Et,t=new Zi){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Jo.fromBufferAttribute(t,s-1),$o.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Jo.distanceTo($o);e.setAttribute("lineDistance",new ut(n,1))}else Xe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ro.copy(n.boundingSphere),Ro.applyMatrix4(s),Ro.radius+=r,e.ray.intersectsSphere(Ro)===!1)return;_f.copy(s).invert(),na.copy(e.ray).applyMatrix4(_f);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let _=f,g=m-1;_<g;_+=l){let p=h.getX(_),b=h.getX(_+1),M=Co(this,e,na,c,p,b,_);M&&t.push(M)}if(this.isLineLoop){let _=h.getX(m-1),g=h.getX(f),p=Co(this,e,na,c,_,g,m-1);p&&t.push(p)}}else{let f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let _=f,g=m-1;_<g;_+=l){let p=Co(this,e,na,c,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){let _=Co(this,e,na,c,m-1,f,m-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Co(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(Jo.fromBufferAttribute(o,s),$o.fromBufferAttribute(o,r),t.distanceSqToSegment(Jo,$o,Eh,yf)>n)return;Eh.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Eh);if(!(l<e.near||l>e.far))return{distance:l,point:yf.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var vf=new z,Mf=new z,fr=class extends _s{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)vf.fromBufferAttribute(t,s),Mf.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+vf.distanceTo(Mf);e.setAttribute("lineDistance",new ut(n,1))}else Xe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var ya=class extends Ut{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=At,this.minFilter=At,this.generateMipmaps=!1,this.needsUpdate=!0}},Yi=class extends Ut{constructor(e,t,n,s,r,a,o,c,l,h,u,d){super(null,a,o,c,l,h,s,r,u,d),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}};var va=class extends Ut{constructor(e=[],t=Qi,n,s,r,a,o,c,l,h){super(e,t,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},gn=class extends Ut{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Ei=class extends Ut{constructor(e,t,n=Bn,s,r,a,o=At,c=At,l,h=jn,u=1){if(h!==jn&&h!==es)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Si(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Ko=class extends Ei{constructor(e,t=Bn,n=Qi,s,r,a=At,o=At,c,l=jn){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ma=class extends Ut{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},pr=class i extends Et{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],u=[],d=0,f=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,s,a,2),m("x","z","y",1,-1,e,n,-t,s,a,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ut(l,3)),this.setAttribute("normal",new ut(h,3)),this.setAttribute("uv",new ut(u,2));function m(_,g,p,b,M,x,E,w,C,y,A){let D=x/C,T=E/y,I=x/2,B=E/2,F=w/2,U=C+1,X=y+1,H=0,G=0,K=new z;for(let ie=0;ie<X;ie++){let he=ie*T-B;for(let pe=0;pe<U;pe++){let ve=pe*D-I;K[_]=ve*b,K[g]=he*M,K[p]=F,l.push(K.x,K.y,K.z),K[_]=0,K[g]=0,K[p]=w>0?1:-1,h.push(K.x,K.y,K.z),u.push(pe/C),u.push(1-ie/y),H+=1}}for(let ie=0;ie<y;ie++)for(let he=0;he<C;he++){let pe=d+he+U*ie,ve=d+he+U*(ie+1),Ge=d+(he+1)+U*(ie+1),Ue=d+(he+1)+U*ie;c.push(pe,ve,Ue),c.push(ve,Ge,Ue),G+=6}o.addGroup(f,G,A),f+=G,d+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var xn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Xe("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);let h=n[s],d=n[s+1]-h,f=(a-h)/d;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new de:new z);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new z,s=[],r=[],a=[],o=new z,c=new nt;for(let f=0;f<=e;f++){let m=f/e;s[f]=this.getTangentAt(m,new z)}r[0]=new z,a[0]=new z;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos($e(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,m))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos($e(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let m=1;m<=e;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],f*m)),a[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},mr=class extends xn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new de){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},jo=class extends mr{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function du(){let i=0,e=0,t=0,n=0;function s(r,a,o,c){i=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,u){let d=(a-r)/l-(o-r)/(l+h)+(o-a)/h,f=(o-a)/h-(c-a)/(h+u)+(c-o)/u;d*=h,f*=h,s(a,o,d,f)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var Sf=new z,bf=new z,wh=new du,Th=new du,Ah=new du,Qo=class extends xn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new z){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=s[(o-1)%r]:(bf.subVectors(s[0],s[1]).add(s[0]),l=bf);let u=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Sf.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Sf),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),wh.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,m,_,g),Th.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,m,_,g),Ah.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,m,_,g)}else this.curveType==="catmullrom"&&(wh.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),Th.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),Ah.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(wh.calc(c),Th.calc(c),Ah.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new z().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Ef(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,c=i*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*i+t}function c0(i,e){let t=1-i;return t*t*e}function l0(i,e){return 2*(1-i)*i*e}function h0(i,e){return i*i*e}function aa(i,e,t,n){return c0(i,e)+l0(i,t)+h0(i,n)}function u0(i,e){let t=1-i;return t*t*t*e}function d0(i,e){let t=1-i;return 3*t*t*i*e}function f0(i,e){return 3*(1-i)*i*i*e}function p0(i,e){return i*i*i*e}function oa(i,e,t,n,s){return u0(i,e)+d0(i,t)+f0(i,n)+p0(i,s)}var Sa=class extends xn{constructor(e=new de,t=new de,n=new de,s=new de){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new de){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(oa(e,s.x,r.x,a.x,o.x),oa(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ec=class extends xn{constructor(e=new z,t=new z,n=new z,s=new z){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new z){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(oa(e,s.x,r.x,a.x,o.x),oa(e,s.y,r.y,a.y,o.y),oa(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ba=class extends xn{constructor(e=new de,t=new de){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new de){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new de){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},tc=class extends xn{constructor(e=new z,t=new z){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new z){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new z){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ea=class extends xn{constructor(e=new de,t=new de,n=new de){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new de){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(aa(e,s.x,r.x,a.x),aa(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},nc=class extends xn{constructor(e=new z,t=new z,n=new z){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new z){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(aa(e,s.x,r.x,a.x),aa(e,s.y,r.y,a.y),aa(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},wa=class extends xn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new de){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(Ef(o,c.x,l.x,h.x,u.x),Ef(o,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new de().fromArray(s))}return this}},Uh=Object.freeze({__proto__:null,ArcCurve:jo,CatmullRomCurve3:Qo,CubicBezierCurve:Sa,CubicBezierCurve3:ec,EllipseCurve:mr,LineCurve:ba,LineCurve3:tc,QuadraticBezierCurve:Ea,QuadraticBezierCurve3:nc,SplineCurve:wa}),ic=class extends xn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Uh[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new Uh[s.type]().fromJSON(s))}return this}},ti=class extends ic{constructor(e){super(),this.type="Path",this.currentPoint=new de,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ba(this.currentPoint.clone(),new de(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new Ea(this.currentPoint.clone(),new de(e,t),new de(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){let o=new Sa(this.currentPoint.clone(),new de(e,t),new de(n,s),new de(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new wa(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,r,a,o,c),this}absellipse(e,t,n,s,r,a,o,c){let l=new mr(e,t,n,s,r,a,o,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Ta=class extends ti{constructor(e){super(e),this.uuid=Kn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new ti().fromJSON(s))}return this}};function m0(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=Sp(i,0,s,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(n&&(r=v0(i,e,r,t)),i.length>80*t){o=i[0],c=i[1];let h=o,u=c;for(let d=t;d<s;d+=t){let f=i[d],m=i[d+1];f<o&&(o=f),m<c&&(c=m),f>h&&(h=f),m>u&&(u=m)}l=Math.max(h-o,u-c),l=l!==0?32767/l:0}return Aa(r,a,t,o,c,l,0),a}function Sp(i,e,t,n,s){let r;if(s===P0(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=wf(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=wf(a/n|0,i[a],i[a+1],r);return r&&gr(r,r.next)&&(Ca(r),r=r.next),r}function ys(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(gr(t,t.next)||bt(t.prev,t,t.next)===0)){if(Ca(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Aa(i,e,t,n,s,r,a){if(!i)return;!a&&r&&w0(i,n,s,r);let o=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?x0(i,n,s,r):g0(i)){e.push(c.i,i.i,l.i),Ca(i),i=l.next,o=l.next;continue}if(i=l,i===o){a?a===1?(i=_0(ys(i),e),Aa(i,e,t,n,s,r,2)):a===2&&y0(i,e,t,n,s,r):Aa(ys(i),e,t,n,s,r,1);break}}}function g0(i){let e=i.prev,t=i,n=i.next;if(bt(e,t,n)>=0)return!1;let s=e.x,r=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(s,r,a),u=Math.min(o,c,l),d=Math.max(s,r,a),f=Math.max(o,c,l),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&ia(s,o,r,c,a,l,m.x,m.y)&&bt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function x0(i,e,t,n){let s=i.prev,r=i,a=i.next;if(bt(s,r,a)>=0)return!1;let o=s.x,c=r.x,l=a.x,h=s.y,u=r.y,d=a.y,f=Math.min(o,c,l),m=Math.min(h,u,d),_=Math.max(o,c,l),g=Math.max(h,u,d),p=Fh(f,m,e,t,n),b=Fh(_,g,e,t,n),M=i.prevZ,x=i.nextZ;for(;M&&M.z>=p&&x&&x.z<=b;){if(M.x>=f&&M.x<=_&&M.y>=m&&M.y<=g&&M!==s&&M!==a&&ia(o,h,c,u,l,d,M.x,M.y)&&bt(M.prev,M,M.next)>=0||(M=M.prevZ,x.x>=f&&x.x<=_&&x.y>=m&&x.y<=g&&x!==s&&x!==a&&ia(o,h,c,u,l,d,x.x,x.y)&&bt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;M&&M.z>=p;){if(M.x>=f&&M.x<=_&&M.y>=m&&M.y<=g&&M!==s&&M!==a&&ia(o,h,c,u,l,d,M.x,M.y)&&bt(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;x&&x.z<=b;){if(x.x>=f&&x.x<=_&&x.y>=m&&x.y<=g&&x!==s&&x!==a&&ia(o,h,c,u,l,d,x.x,x.y)&&bt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function _0(i,e){let t=i;do{let n=t.prev,s=t.next.next;!gr(n,s)&&Ep(n,t,t.next,s)&&Ra(n,s)&&Ra(s,n)&&(e.push(n.i,t.i,s.i),Ca(t),Ca(t.next),t=i=s),t=t.next}while(t!==i);return ys(t)}function y0(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&R0(a,o)){let c=wp(a,o);a=ys(a,a.next),c=ys(c,c.next),Aa(a,e,t,n,s,r,0),Aa(c,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function v0(i,e,t,n){let s=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,c=r<a-1?e[r+1]*n:i.length,l=Sp(i,o,c,n,!1);l===l.next&&(l.steiner=!0),s.push(A0(l))}s.sort(M0);for(let r=0;r<s.length;r++)t=S0(s[r],t);return t}function M0(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function S0(i,e){let t=b0(i,e);if(!t)return e;let n=wp(t,i);return ys(n,n.next),ys(t,t.next)}function b0(i,e){let t=e,n=i.x,s=i.y,r=-1/0,a;if(gr(i,t))return t;do{if(gr(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let u=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,a=t.x<t.next.x?t:t.next,u===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,c=a.x,l=a.y,h=1/0;t=a;do{if(n>=t.x&&t.x>=c&&n!==t.x&&bp(s<l?n:r,s,c,l,s<l?r:n,s,t.x,t.y)){let u=Math.abs(s-t.y)/(n-t.x);Ra(t,i)&&(u<h||u===h&&(t.x>a.x||t.x===a.x&&E0(a,t)))&&(a=t,h=u)}t=t.next}while(t!==o);return a}function E0(i,e){return bt(i.prev,i,e.prev)<0&&bt(e.next,i,i.next)<0}function w0(i,e,t,n){let s=i;do s.z===0&&(s.z=Fh(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,T0(s)}function T0(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,!!a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function Fh(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function A0(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function bp(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function ia(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&bp(i,e,t,n,s,r,a,o)}function R0(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!C0(i,e)&&(Ra(i,e)&&Ra(e,i)&&I0(i,e)&&(bt(i.prev,i,e.prev)||bt(i,e.prev,e))||gr(i,e)&&bt(i.prev,i,i.next)>0&&bt(e.prev,e,e.next)>0)}function bt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function gr(i,e){return i.x===e.x&&i.y===e.y}function Ep(i,e,t,n){let s=Po(bt(i,e,t)),r=Po(bt(i,e,n)),a=Po(bt(t,n,i)),o=Po(bt(t,n,e));return!!(s!==r&&a!==o||s===0&&Io(i,t,e)||r===0&&Io(i,n,e)||a===0&&Io(t,i,n)||o===0&&Io(t,e,n))}function Io(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Po(i){return i>0?1:i<0?-1:0}function C0(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Ep(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Ra(i,e){return bt(i.prev,i,i.next)<0?bt(i,e,i.next)>=0&&bt(i,i.prev,e)>=0:bt(i,e,i.prev)<0||bt(i,i.next,e)<0}function I0(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function wp(i,e){let t=Oh(i.i,i.x,i.y),n=Oh(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function wf(i,e,t,n){let s=Oh(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Ca(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Oh(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function P0(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var Bh=class{static triangulate(e,t,n=2){return m0(e,t,n)}},$n=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];Tf(e),Af(n,e);let a=e.length;t.forEach(Tf);for(let c=0;c<t.length;c++)s.push(a),a+=t[c].length,Af(n,t[c]);let o=Bh.triangulate(n,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}};function Tf(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Af(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Ia=class i extends Et{constructor(e=new Ta([new de(.5,.5),new de(-.5,.5),new de(-.5,-.5),new de(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let o=0,c=e.length;o<c;o++){let l=e[o];a(l)}this.setAttribute("position",new ut(s,3)),this.setAttribute("uv",new ut(r,2)),this.computeVertexNormals();function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,b=t.UVGenerator!==void 0?t.UVGenerator:L0,M,x=!1,E,w,C,y;if(p){M=p.getSpacedPoints(h),x=!0,d=!1;let P=p.isCatmullRomCurve3?p.closed:!1;E=p.computeFrenetFrames(h,P),w=new z,C=new z,y=new z}d||(g=0,f=0,m=0,_=0);let A=o.extractPoints(l),D=A.shape,T=A.holes;if(!$n.isClockWise(D)){D=D.reverse();for(let P=0,Z=T.length;P<Z;P++){let V=T[P];$n.isClockWise(V)&&(T[P]=V.reverse())}}function B(P){let V=10000000000000001e-36,Q=P[0];for(let ne=1;ne<=P.length;ne++){let le=ne%P.length,xe=P[le],_e=xe.x-Q.x,J=xe.y-Q.y,S=_e*_e+J*J,Pe=Math.max(Math.abs(xe.x),Math.abs(xe.y),Math.abs(Q.x),Math.abs(Q.y)),Fe=V*Pe*Pe;if(S<=Fe){P.splice(le,1),ne--;continue}Q=xe}}B(D),T.forEach(B);let F=T.length,U=D;for(let P=0;P<F;P++){let Z=T[P];D=D.concat(Z)}function X(P,Z,V){return Z||Ye("ExtrudeGeometry: vec does not exist"),P.clone().addScaledVector(Z,V)}let H=D.length;function G(P,Z,V){let Q,ne,le,xe=P.x-Z.x,_e=P.y-Z.y,J=V.x-P.x,S=V.y-P.y,Pe=xe*xe+_e*_e,Fe=xe*S-_e*J;if(Math.abs(Fe)>Number.EPSILON){let L=Math.sqrt(Pe),v=Math.sqrt(J*J+S*S),$=Z.x-_e/L,te=Z.y+xe/L,ce=V.x-S/v,Me=V.y+J/v,Se=((ce-$)*S-(Me-te)*J)/(xe*S-_e*J);Q=$+xe*Se-P.x,ne=te+_e*Se-P.y;let ue=Q*Q+ne*ne;if(ue<=2)return new de(Q,ne);le=Math.sqrt(ue/2)}else{let L=!1;xe>Number.EPSILON?J>Number.EPSILON&&(L=!0):xe<-Number.EPSILON?J<-Number.EPSILON&&(L=!0):Math.sign(_e)===Math.sign(S)&&(L=!0),L?(Q=-_e,ne=xe,le=Math.sqrt(Pe)):(Q=xe,ne=_e,le=Math.sqrt(Pe/2))}return new de(Q/le,ne/le)}let K=[];for(let P=0,Z=U.length,V=Z-1,Q=P+1;P<Z;P++,V++,Q++)V===Z&&(V=0),Q===Z&&(Q=0),K[P]=G(U[P],U[V],U[Q]);let ie=[],he,pe=K.concat();for(let P=0,Z=F;P<Z;P++){let V=T[P];he=[];for(let Q=0,ne=V.length,le=ne-1,xe=Q+1;Q<ne;Q++,le++,xe++)le===ne&&(le=0),xe===ne&&(xe=0),he[Q]=G(V[Q],V[le],V[xe]);ie.push(he),pe=pe.concat(he)}let ve;if(g===0)ve=$n.triangulateShape(U,T);else{let P=[],Z=[];for(let V=0;V<g;V++){let Q=V/g,ne=f*Math.cos(Q*Math.PI/2),le=m*Math.sin(Q*Math.PI/2)+_;for(let xe=0,_e=U.length;xe<_e;xe++){let J=X(U[xe],K[xe],le);O(J.x,J.y,-ne),Q===0&&P.push(J)}for(let xe=0,_e=F;xe<_e;xe++){let J=T[xe];he=ie[xe];let S=[];for(let Pe=0,Fe=J.length;Pe<Fe;Pe++){let L=X(J[Pe],he[Pe],le);O(L.x,L.y,-ne),Q===0&&S.push(L)}Q===0&&Z.push(S)}}ve=$n.triangulateShape(P,Z)}let Ge=ve.length,Ue=m+_;for(let P=0;P<H;P++){let Z=d?X(D[P],pe[P],Ue):D[P];x?(C.copy(E.normals[0]).multiplyScalar(Z.x),w.copy(E.binormals[0]).multiplyScalar(Z.y),y.copy(M[0]).add(C).add(w),O(y.x,y.y,y.z)):O(Z.x,Z.y,0)}for(let P=1;P<=h;P++)for(let Z=0;Z<H;Z++){let V=d?X(D[Z],pe[Z],Ue):D[Z];x?(C.copy(E.normals[P]).multiplyScalar(V.x),w.copy(E.binormals[P]).multiplyScalar(V.y),y.copy(M[P]).add(C).add(w),O(y.x,y.y,y.z)):O(V.x,V.y,u/h*P)}for(let P=g-1;P>=0;P--){let Z=P/g,V=f*Math.cos(Z*Math.PI/2),Q=m*Math.sin(Z*Math.PI/2)+_;for(let ne=0,le=U.length;ne<le;ne++){let xe=X(U[ne],K[ne],Q);O(xe.x,xe.y,u+V)}for(let ne=0,le=T.length;ne<le;ne++){let xe=T[ne];he=ie[ne];for(let _e=0,J=xe.length;_e<J;_e++){let S=X(xe[_e],he[_e],Q);x?O(S.x,S.y+M[h-1].y,M[h-1].x+V):O(S.x,S.y,u+V)}}}ee(),W();function ee(){let P=s.length/3;if(d){let Z=0,V=H*Z;for(let Q=0;Q<Ge;Q++){let ne=ve[Q];N(ne[2]+V,ne[1]+V,ne[0]+V)}Z=h+g*2,V=H*Z;for(let Q=0;Q<Ge;Q++){let ne=ve[Q];N(ne[0]+V,ne[1]+V,ne[2]+V)}}else{for(let Z=0;Z<Ge;Z++){let V=ve[Z];N(V[2],V[1],V[0])}for(let Z=0;Z<Ge;Z++){let V=ve[Z];N(V[0]+H*h,V[1]+H*h,V[2]+H*h)}}n.addGroup(P,s.length/3-P,0)}function W(){let P=s.length/3,Z=0;k(U,Z),Z+=U.length;for(let V=0,Q=T.length;V<Q;V++){let ne=T[V];k(ne,Z),Z+=ne.length}n.addGroup(P,s.length/3-P,1)}function k(P,Z){let V=P.length;for(;--V>=0;){let Q=V,ne=V-1;ne<0&&(ne=P.length-1);for(let le=0,xe=h+g*2;le<xe;le++){let _e=H*le,J=H*(le+1),S=Z+Q+_e,Pe=Z+ne+_e,Fe=Z+ne+J,L=Z+Q+J;q(S,Pe,Fe,L)}}}function O(P,Z,V){c.push(P),c.push(Z),c.push(V)}function N(P,Z,V){oe(P),oe(Z),oe(V);let Q=s.length/3,ne=b.generateTopUV(n,s,Q-3,Q-2,Q-1);fe(ne[0]),fe(ne[1]),fe(ne[2])}function q(P,Z,V,Q){oe(P),oe(Z),oe(Q),oe(Z),oe(V),oe(Q);let ne=s.length/3,le=b.generateSideWallUV(n,s,ne-6,ne-3,ne-2,ne-1);fe(le[0]),fe(le[1]),fe(le[3]),fe(le[1]),fe(le[2]),fe(le[3])}function oe(P){s.push(c[P*3+0]),s.push(c[P*3+1]),s.push(c[P*3+2])}function fe(P){r.push(P.x),r.push(P.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return N0(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Uh[s.type]().fromJSON(s)),new i(n,e.options)}},L0={generateTopUV:function(i,e,t,n,s){let r=e[t*3],a=e[t*3+1],o=e[n*3],c=e[n*3+1],l=e[s*3],h=e[s*3+1];return[new de(r,a),new de(o,c),new de(l,h)]},generateSideWallUV:function(i,e,t,n,s,r){let a=e[t*3],o=e[t*3+1],c=e[t*3+2],l=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[s*3],f=e[s*3+1],m=e[s*3+2],_=e[r*3],g=e[r*3+1],p=e[r*3+2];return Math.abs(o-h)<Math.abs(a-l)?[new de(a,1-c),new de(l,1-u),new de(d,1-m),new de(_,1-p)]:[new de(o,1-c),new de(h,1-u),new de(f,1-m),new de(g,1-p)]}};function N0(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var _n=class i extends Et{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,u=e/o,d=t/c,f=[],m=[],_=[],g=[];for(let p=0;p<h;p++){let b=p*d-a;for(let M=0;M<l;M++){let x=M*u-r;m.push(x,-b,0),_.push(0,0,1),g.push(M/o),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let b=0;b<o;b++){let M=b+l*p,x=b+l*(p+1),E=b+1+l*(p+1),w=b+1+l*p;f.push(M,x,w),f.push(x,E,w)}this.setIndex(f),this.setAttribute("position",new ut(m,3)),this.setAttribute("normal",new ut(_,3)),this.setAttribute("uv",new ut(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Pa=class i extends Et{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new z,d=new z,f=[],m=[],_=[],g=[];for(let p=0;p<=n;p++){let b=[],M=p/n,x=a+M*o,E=e*Math.cos(x),w=Math.sqrt(e*e-E*E),C=0;p===0&&a===0?C=.5/t:p===n&&c===Math.PI&&(C=-.5/t);for(let y=0;y<=t;y++){let A=y/t,D=s+A*r;u.x=-w*Math.cos(D),u.y=E,u.z=w*Math.sin(D),m.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),g.push(A+C,1-M),b.push(l++)}h.push(b)}for(let p=0;p<n;p++)for(let b=0;b<t;b++){let M=h[p][b+1],x=h[p][b],E=h[p+1][b],w=h[p+1][b+1];(p!==0||a>0)&&f.push(M,x,w),(p!==n-1||c<Math.PI)&&f.push(x,E,w)}this.setIndex(f),this.setAttribute("position",new ut(m,3)),this.setAttribute("normal",new ut(_,3)),this.setAttribute("uv",new ut(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var La=class extends Et{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,s=new z,r=new z;if(e.index!==null){let a=e.attributes.position,o=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){let u=c[l],d=u.start,f=u.count;for(let m=d,_=d+f;m<_;m+=3)for(let g=0;g<3;g++){let p=o.getX(m+g),b=o.getX(m+(g+1)%3);s.fromBufferAttribute(a,p),r.fromBufferAttribute(a,b),Rf(s,r,n)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}}else{let a=e.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){let h=3*o+l,u=3*o+(l+1)%3;s.fromBufferAttribute(a,h),r.fromBufferAttribute(a,u),Rf(s,r,n)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new ut(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Rf(i,e,t){let n=`${i.x},${i.y},${i.z}-${e.x},${e.y},${e.z}`,s=`${e.x},${e.y},${e.z}-${i.x},${i.y},${i.z}`;return t.has(n)===!0||t.has(s)===!0?!1:(t.add(n),t.add(s),!0)}function Es(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(Cf(s))s.isRenderTargetTexture?(Xe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Cf(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Jt(i){let e={};for(let t=0;t<i.length;t++){let n=Es(i[t]);for(let s in n)e[s]=n[s]}return e}function Cf(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function D0(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function fu(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:st.workingColorSpace}var Ja={clone:Es,merge:Jt},U0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,F0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ft=class extends ei{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=U0,this.fragmentShader=F0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Es(e.uniforms),this.uniformsGroups=D0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new ke().setHex(s.value);break;case"v2":this.uniforms[n].value=new de().fromArray(s.value);break;case"v3":this.uniforms[n].value=new z().fromArray(s.value);break;case"v4":this.uniforms[n].value=new ot().fromArray(s.value);break;case"m3":this.uniforms[n].value=new qe().fromArray(s.value);break;case"m4":this.uniforms[n].value=new nt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},sc=class extends Ft{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Na=class extends ei{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=rl,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var rc=class extends ei{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=cp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ac=class extends ei{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Lo(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}var Ji=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},oc=class extends Ji{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ph,endingEnd:Ph}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Lh:r=e,o=2*t-n;break;case Nh:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Lh:a=e,c=2*n-t;break;case Nh:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(s-t),_=m*m,g=_*m,p=-d*g+2*d*_-d*m,b=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*m+1,M=(-1-f)*g+(1.5+f)*_+.5*m,x=f*g-f*_;for(let E=0;E!==o;++E)r[E]=p*a[h+E]+b*a[l+E]+M*a[c+E]+x*a[u+E];return r}},cc=class extends Ji{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(s-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[l+d]*u+a[c+d]*h;return r}},lc=class extends Ji{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},hc=class extends Ji{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this.inTangents,u=this.outTangents;if(!h||!u){let m=(n-t)/(s-t),_=1-m;for(let g=0;g!==o;++g)r[g]=a[l+g]*_+a[c+g]*m;return r}let d=o*2,f=e-1;for(let m=0;m!==o;++m){let _=a[l+m],g=a[c+m],p=f*d+m*2,b=u[p],M=u[p+1],x=e*d+m*2,E=h[x],w=h[x+1],C=(n-t)/(s-t),y,A,D,T,I;for(let B=0;B<8;B++){y=C*C,A=y*C,D=1-C,T=D*D,I=T*D;let U=I*t+3*T*C*b+3*D*y*E+A*s-n;if(Math.abs(U)<1e-10)break;let X=3*T*(b-t)+6*D*C*(E-b)+3*y*(s-E);if(Math.abs(X)<1e-10)break;C=C-U/X,C=Math.max(0,Math.min(1,C))}r[m]=I*_+3*T*C*M+3*D*y*w+A*g}return r}},yn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Lo(t,this.TimeBufferType),this.values=Lo(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Lo(e.times,Array),values:Lo(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new lc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new cc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new oc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new hc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case xs:t=this.InterpolantFactoryMethodDiscrete;break;case nr:t=this.InterpolantFactoryMethodLinear;break;case Fo:t=this.InterpolantFactoryMethodSmooth;break;case Ih:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Xe("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return xs;case this.InterpolantFactoryMethodLinear:return nr;case this.InterpolantFactoryMethodSmooth:return Fo;case this.InterpolantFactoryMethodBezier:return Ih}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ye("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ye("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){Ye("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){Ye("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&Tg(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){Ye("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Fo,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(s)c=!0;else{let u=o*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){let _=t[u+m];if(_!==t[d+m]||_!==t[f+m]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};yn.prototype.ValueTypeName="";yn.prototype.TimeBufferType=Float32Array;yn.prototype.ValueBufferType=Float32Array;yn.prototype.DefaultInterpolation=nr;var $i=class extends yn{constructor(e,t,n){super(e,t,n)}};$i.prototype.ValueTypeName="bool";$i.prototype.ValueBufferType=Array;$i.prototype.DefaultInterpolation=xs;$i.prototype.InterpolantFactoryMethodLinear=void 0;$i.prototype.InterpolantFactoryMethodSmooth=void 0;var uc=class extends yn{constructor(e,t,n,s){super(e,t,n,s)}};uc.prototype.ValueTypeName="color";var dc=class extends yn{constructor(e,t,n,s){super(e,t,n,s)}};dc.prototype.ValueTypeName="number";var fc=class extends Ji{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t),l=e*o;for(let h=l+o;l!==h;l+=4)wn.slerpFlat(r,0,a,l-o,a,l,c);return r}},Da=class extends yn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new fc(this.times,this.values,this.getValueSize(),e)}};Da.prototype.ValueTypeName="quaternion";Da.prototype.InterpolantFactoryMethodSmooth=void 0;var Ki=class extends yn{constructor(e,t,n){super(e,t,n)}};Ki.prototype.ValueTypeName="string";Ki.prototype.ValueBufferType=Array;Ki.prototype.DefaultInterpolation=xs;Ki.prototype.InterpolantFactoryMethodLinear=void 0;Ki.prototype.InterpolantFactoryMethodSmooth=void 0;var pc=class extends yn{constructor(e,t,n,s){super(e,t,n,s)}};pc.prototype.ValueTypeName="vector";var zh={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(If(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!If(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function If(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var mc=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let f=l[u],m=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Tp=new mc,vs=class{constructor(e){this.manager=e!==void 0?e:Tp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};vs.DEFAULT_MATERIAL_NAME="__DEFAULT";var _i={},kh=class extends Error{constructor(e,t){super(e),this.response=t}},Ua=class extends vs{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=zh.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(_i[e]!==void 0){_i[e].push({onLoad:t,onProgress:n,onError:s});return}_i[e]=[],_i[e].push({onLoad:t,onProgress:n,onError:s});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Xe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=_i[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0,_=0,g=new ReadableStream({start(p){b();function b(){u.read().then(({done:M,value:x})=>{if(M)p.close();else{_+=x.byteLength;let E=new ProgressEvent("progress",{lengthComputable:m,loaded:_,total:f});for(let w=0,C=h.length;w<C;w++){let y=h[w];y.onProgress&&y.onProgress(E)}p.enqueue(x),b()}},M=>{p.error(M)})}}});return new Response(g)}else throw new kh(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(m=>f.decode(m))}}}).then(l=>{zh.add(`file:${e}`,l);let h=_i[e];delete _i[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{let h=_i[e];if(h===void 0)throw this.manager.itemError(e),l;delete _i[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Fa=class extends Lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ke(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Oa=class extends Fa{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ke(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Rh=new nt,Pf=new z,Lf=new z,Vh=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new de(512,512),this.mapType=an,this.map=null,this.mapPass=null,this.matrix=new nt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new dr,this._frameExtents=new de(1,1),this._viewportCount=1,this._viewports=[new ot(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Pf.setFromMatrixPosition(e.matrixWorld),t.position.copy(Pf),Lf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Lf),t.updateMatrixWorld(),Rh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Rh,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===ir||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Rh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},No=new z,Do=new wn,Jn=new z,Ba=class extends Lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new nt,this.projectionMatrix=new nt,this.projectionMatrixInverse=new nt,this.coordinateSystem=Dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(No,Do,Jn),Jn.x===1&&Jn.y===1&&Jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(No,Do,Jn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(No,Do,Jn),Jn.x===1&&Jn.y===1&&Jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(No,Do,Jn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Wi=new z,Nf=new de,Df=new de,kt=class extends Ba{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=rr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(sa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return rr*2*Math.atan(Math.tan(sa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Wi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Wi.x,Wi.y).multiplyScalar(-e/Wi.z),Wi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Wi.x,Wi.y).multiplyScalar(-e/Wi.z)}getViewSize(e,t){return this.getViewBounds(e,Nf,Df),t.subVectors(Df,Nf)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(sa*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var ni=class extends Ba{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Hh=class extends Vh{constructor(){super(new ni(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},xr=class extends Fa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.target=new Lt,this.shadow=new Hh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Ms=class extends Et{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var Ks=-90,js=1,gc=class extends Lt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new kt(Ks,js,e,t);s.layers=this.layers,this.add(s);let r=new kt(Ks,js,e,t);r.layers=this.layers,this.add(r);let a=new kt(Ks,js,e,t);a.layers=this.layers,this.add(a);let o=new kt(Ks,js,e,t);o.layers=this.layers,this.add(o);let c=new kt(Ks,js,e,t);c.layers=this.layers,this.add(c);let l=new kt(Ks,js,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===Dn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ir)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},xc=class extends kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var pu="\\[\\]\\.:\\/",O0=new RegExp("["+pu+"]","g"),mu="[^"+pu+"]",B0="[^"+pu.replace("\\.","")+"]",z0=/((?:WC+[\/:])*)/.source.replace("WC",mu),k0=/(WCOD+)?/.source.replace("WCOD",B0),V0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",mu),H0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",mu),G0=new RegExp("^"+z0+k0+V0+H0+"$"),W0=["material","materials","bones","map"],Gh=class{constructor(e,t,n){let s=n||lt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},lt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(O0,"")}static parseTrackName(e){let t=G0.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);W0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Xe("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){Ye("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ye("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ye("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ye("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ye("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ye("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){Ye("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[s];if(a===void 0){let l=t.nodeName;Ye("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ye("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ye("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};lt.Composite=Gh;lt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};lt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};lt.prototype.GetterByBindingType=[lt.prototype._getValue_direct,lt.prototype._getValue_array,lt.prototype._getValue_arrayElement,lt.prototype._getValue_toArray];lt.prototype.SetterByBindingTypeAndVersioning=[[lt.prototype._setValue_direct,lt.prototype._setValue_direct_setNeedsUpdate,lt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[lt.prototype._setValue_array,lt.prototype._setValue_array_setNeedsUpdate,lt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[lt.prototype._setValue_arrayElement,lt.prototype._setValue_arrayElement_setNeedsUpdate,lt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[lt.prototype._setValue_fromArray,lt.prototype._setValue_fromArray_setNeedsUpdate,lt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var UM=new Float32Array(1);var ji=class extends ga{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}};var Uf=new nt,wi=class{constructor(e,t,n=0,s=1/0){this.ray=new hr(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new or,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ye("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Uf.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Uf),this}intersectObject(e,t=!0,n=[]){return Wh(e,this,n,t),n.sort(Ff),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Wh(e[s],this,n,t);return n.sort(Ff),n}};function Ff(i,e){return i.distance-e.distance}function Wh(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)Wh(r[a],e,t,!0)}}var Mu=class Mu{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};Mu.prototype.isMatrix2=!0;var Xh=Mu,Of=new de,_r=class{constructor(e=new de(1/0,1/0),t=new de(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Of.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Of).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Bf=new z,Uo=new z,Qs=new z,er=new z,Ch=new z,X0=new z,q0=new z,za=class{constructor(e=new z,t=new z){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Bf.subVectors(e,this.start),Uo.subVectors(this.end,this.start);let n=Uo.dot(Uo);if(n===0)return 0;let r=Uo.dot(Bf)/n;return t&&(r=$e(r,0,1)),r}closestPointToPoint(e,t,n){let s=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(s).add(this.start)}distanceSqToLine3(e,t=X0,n=q0){let s=10000000000000001e-32,r,a,o=this.start,c=e.start,l=this.end,h=e.end;Qs.subVectors(l,o),er.subVectors(h,c),Ch.subVectors(o,c);let u=Qs.dot(Qs),d=er.dot(er),f=er.dot(Ch);if(u<=s&&d<=s)return t.copy(o),n.copy(c),t.sub(n),t.dot(t);if(u<=s)r=0,a=f/d,a=$e(a,0,1);else{let m=Qs.dot(Ch);if(d<=s)a=0,r=$e(-m/u,0,1);else{let _=Qs.dot(er),g=u*d-_*_;g!==0?r=$e((_*f-m*d)/g,0,1):r=0,a=(_*r+f)/d,a<0?(a=0,r=$e(-m/u,0,1)):a>1&&(a=1,r=$e((_-m)/u,0,1))}}return t.copy(o).addScaledVector(Qs,r),n.copy(c).addScaledVector(er,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};var Fn=class{constructor(){this.type="ShapePath",this.color=new ke,this.subPaths=[],this.currentPath=null,this.userData={}}moveTo(e,t){return this.currentPath=new ti,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,s){return this.currentPath.quadraticCurveTo(e,t,n,s),this}bezierCurveTo(e,t,n,s,r,a){return this.currentPath.bezierCurveTo(e,t,n,s,r,a),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(){function e(c,l){let h=!1,u=l.length;for(let d=0,f=u-1;d<u;f=d++){let m=l[d],_=l[f];m.y>c.y!=_.y>c.y&&c.x<(_.x-m.x)*(c.y-m.y)/(_.y-m.y)+m.x&&(h=!h)}return h}function t(c,l){let h=l.getCenter(new de);if(e(h,c))return h;let u=h.y,d=[],f=c.length;for(let m=0;m<f;m++){let _=c[m],g=c[(m+1)%f];if(_.y>u!=g.y>u){let p=_.x+(u-_.y)*(g.x-_.x)/(g.y-_.y);d.push(p)}}return d.length>1&&(d.sort((m,_)=>m-_),h.x=(d[0]+d[1])/2),h}let n=this.userData.style&&this.userData.style.fillRule||"nonzero";n!=="nonzero"&&n!=="evenodd"&&(Xe('Fill-rule "'+n+'" is not supported, falling back to "nonzero".'),n="nonzero");let s=n==="nonzero"?(c=>c!==0):(c=>(c&1)!==0),r=[];for(let c of this.subPaths){let l=c.getPoints();if(l.length<3)continue;let h=$n.area(l);if(h===0)continue;let u=new _r;for(let d=0;d<l.length;d++)u.expandByPoint(l[d]);r.push({subPath:c,points:l,boundingBox:u,interiorPoint:t(l,u),absArea:Math.abs(h),winding:h<0?-1:1,container:null,exclude:!1,role:null})}r.sort((c,l)=>l.absArea-c.absArea);for(let c=0;c<r.length;c++){let l=r[c],h=0;for(let u=c-1;u>=0;u--){let d=r[u];if(d.boundingBox.containsPoint(l.interiorPoint)&&e(l.interiorPoint,d.points)){l.container=d.exclude?d.container:d,h=d.winding,l.winding+=h;break}}s(l.winding)===s(h)&&(l.exclude=!0)}for(let c of r)c.exclude||(c.role=c.container===null||c.container.role==="hole"?"outer":"hole");let a=[],o=new Map;for(let c of r){if(c.exclude||c.role!=="outer")continue;let l=new Ta;l.curves=c.subPath.curves,a.push(l),o.set(c,l)}for(let c of r){if(c.exclude||c.role!=="hole")continue;let l=o.get(c.container);if(!l)continue;let h=new ti;h.curves=c.subPath.curves,l.holes.push(h)}return a}};function gu(i,e,t,n){let s=Z0(n);switch(t){case cu:return i*e;case wc:return i*e/s.components*s.byteLength;case Tc:return i*e/s.components*s.byteLength;case ts:return i*e*2/s.components*s.byteLength;case Ac:return i*e*2/s.components*s.byteLength;case lu:return i*e*3/s.components*s.byteLength;case on:return i*e*4/s.components*s.byteLength;case Rc:return i*e*4/s.components*s.byteLength;case Ga:case Wa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Xa:case qa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ic:case Lc:return Math.max(i,16)*Math.max(e,8)/4;case Cc:case Pc:return Math.max(i,8)*Math.max(e,8)/2;case Nc:case Dc:case Fc:case Oc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Uc:case Za:case Bc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case zc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case kc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Vc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Hc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Gc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Wc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Xc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case qc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Zc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Yc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Jc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case $c:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Kc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case jc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Qc:case el:case tl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case nl:case il:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ya:case sl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Z0(i){switch(i){case an:case su:return{byteLength:1,components:1};case Mr:case ru:case ri:return{byteLength:2,components:1};case bc:case Ec:return{byteLength:2,components:4};case Bn:case Sc:case An:return{byteLength:4,components:1};case au:case ou:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));typeof window<"u"&&(window.__THREE__?Xe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function Jp(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Y0(i){let e=new WeakMap;function t(o,c){let l=o.array,h=o.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,o),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){let m=u[d],_=u[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){let _=u[f];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var J0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$0=`#ifdef USE_ALPHAHASH
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
#endif`,K0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,j0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Q0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ex=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tx=`#ifdef USE_AOMAP
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
#endif`,nx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ix=`#ifdef USE_BATCHING
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
#endif`,sx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ax=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ox=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,cx=`#ifdef USE_IRIDESCENCE
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
#endif`,lx=`#ifdef USE_BUMPMAP
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
#endif`,hx=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ux=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,dx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,px=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,mx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,gx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,xx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,_x=`#define PI 3.141592653589793
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
} // validated`,yx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,vx=`vec3 transformedNormal = objectNormal;
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
#endif`,Mx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,bx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ex=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,wx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Tx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ax=`#ifdef USE_ENVMAP
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
#endif`,Rx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Cx=`#ifdef USE_ENVMAP
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
#endif`,Ix=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Px=`#ifdef USE_ENVMAP
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
#endif`,Lx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Nx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Dx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ux=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fx=`#ifdef USE_GRADIENTMAP
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
}`,Ox=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,zx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,kx=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Vx=`#ifdef USE_ENVMAP
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
#endif`,Hx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Gx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qx=`PhysicalMaterial material;
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
#endif`,Zx=`uniform sampler2D dfgLUT;
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
}`,Yx=`
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
#endif`,Jx=`#if defined( RE_IndirectDiffuse )
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
#endif`,$x=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Kx=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,jx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,e_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,t_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,n_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,i_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,s_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,r_=`#if defined( USE_POINTS_UV )
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
#endif`,a_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,o_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,c_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,l_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,h_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,u_=`#ifdef USE_MORPHTARGETS
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
#endif`,d_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,f_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,p_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,m_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,g_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,x_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,__=`#ifdef USE_NORMALMAP
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
#endif`,y_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,v_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,M_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,S_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,b_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,E_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,w_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,T_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,A_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,R_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,C_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,I_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,P_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,L_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,N_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,D_=`float getShadowMask() {
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
}`,U_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,F_=`#ifdef USE_SKINNING
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
#endif`,O_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,B_=`#ifdef USE_SKINNING
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
#endif`,z_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,k_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,V_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,H_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,G_=`#ifdef USE_TRANSMISSION
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
#endif`,W_=`#ifdef USE_TRANSMISSION
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
#endif`,X_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,q_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Z_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Y_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,J_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$_=`uniform sampler2D t2D;
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
}`,K_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,j_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Q_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ey=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ty=`#include <common>
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
}`,ny=`#if DEPTH_PACKING == 3200
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
}`,iy=`#define DISTANCE
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
}`,sy=`#define DISTANCE
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
}`,ry=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ay=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oy=`uniform float scale;
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
}`,cy=`uniform vec3 diffuse;
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
}`,ly=`#include <common>
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
}`,hy=`uniform vec3 diffuse;
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
}`,uy=`#define LAMBERT
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
}`,dy=`#define LAMBERT
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
}`,fy=`#define MATCAP
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
}`,py=`#define MATCAP
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
}`,my=`#define NORMAL
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
}`,gy=`#define NORMAL
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
}`,xy=`#define PHONG
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
}`,_y=`#define PHONG
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
}`,yy=`#define STANDARD
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
}`,vy=`#define STANDARD
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
}`,My=`#define TOON
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
}`,Sy=`#define TOON
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
}`,by=`uniform float size;
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
}`,Ey=`uniform vec3 diffuse;
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
}`,wy=`#include <common>
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
}`,Ty=`uniform vec3 color;
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
}`,Ay=`uniform float rotation;
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
}`,Ry=`uniform vec3 diffuse;
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
}`,Qe={alphahash_fragment:J0,alphahash_pars_fragment:$0,alphamap_fragment:K0,alphamap_pars_fragment:j0,alphatest_fragment:Q0,alphatest_pars_fragment:ex,aomap_fragment:tx,aomap_pars_fragment:nx,batching_pars_vertex:ix,batching_vertex:sx,begin_vertex:rx,beginnormal_vertex:ax,bsdfs:ox,iridescence_fragment:cx,bumpmap_pars_fragment:lx,clipping_planes_fragment:hx,clipping_planes_pars_fragment:ux,clipping_planes_pars_vertex:dx,clipping_planes_vertex:fx,color_fragment:px,color_pars_fragment:mx,color_pars_vertex:gx,color_vertex:xx,common:_x,cube_uv_reflection_fragment:yx,defaultnormal_vertex:vx,displacementmap_pars_vertex:Mx,displacementmap_vertex:Sx,emissivemap_fragment:bx,emissivemap_pars_fragment:Ex,colorspace_fragment:wx,colorspace_pars_fragment:Tx,envmap_fragment:Ax,envmap_common_pars_fragment:Rx,envmap_pars_fragment:Cx,envmap_pars_vertex:Ix,envmap_physical_pars_fragment:Vx,envmap_vertex:Px,fog_vertex:Lx,fog_pars_vertex:Nx,fog_fragment:Dx,fog_pars_fragment:Ux,gradientmap_pars_fragment:Fx,lightmap_pars_fragment:Ox,lights_lambert_fragment:Bx,lights_lambert_pars_fragment:zx,lights_pars_begin:kx,lights_toon_fragment:Hx,lights_toon_pars_fragment:Gx,lights_phong_fragment:Wx,lights_phong_pars_fragment:Xx,lights_physical_fragment:qx,lights_physical_pars_fragment:Zx,lights_fragment_begin:Yx,lights_fragment_maps:Jx,lights_fragment_end:$x,lightprobes_pars_fragment:Kx,logdepthbuf_fragment:jx,logdepthbuf_pars_fragment:Qx,logdepthbuf_pars_vertex:e_,logdepthbuf_vertex:t_,map_fragment:n_,map_pars_fragment:i_,map_particle_fragment:s_,map_particle_pars_fragment:r_,metalnessmap_fragment:a_,metalnessmap_pars_fragment:o_,morphinstance_vertex:c_,morphcolor_vertex:l_,morphnormal_vertex:h_,morphtarget_pars_vertex:u_,morphtarget_vertex:d_,normal_fragment_begin:f_,normal_fragment_maps:p_,normal_pars_fragment:m_,normal_pars_vertex:g_,normal_vertex:x_,normalmap_pars_fragment:__,clearcoat_normal_fragment_begin:y_,clearcoat_normal_fragment_maps:v_,clearcoat_pars_fragment:M_,iridescence_pars_fragment:S_,opaque_fragment:b_,packing:E_,premultiplied_alpha_fragment:w_,project_vertex:T_,dithering_fragment:A_,dithering_pars_fragment:R_,roughnessmap_fragment:C_,roughnessmap_pars_fragment:I_,shadowmap_pars_fragment:P_,shadowmap_pars_vertex:L_,shadowmap_vertex:N_,shadowmask_pars_fragment:D_,skinbase_vertex:U_,skinning_pars_vertex:F_,skinning_vertex:O_,skinnormal_vertex:B_,specularmap_fragment:z_,specularmap_pars_fragment:k_,tonemapping_fragment:V_,tonemapping_pars_fragment:H_,transmission_fragment:G_,transmission_pars_fragment:W_,uv_pars_fragment:X_,uv_pars_vertex:q_,uv_vertex:Z_,worldpos_vertex:Y_,background_vert:J_,background_frag:$_,backgroundCube_vert:K_,backgroundCube_frag:j_,cube_vert:Q_,cube_frag:ey,depth_vert:ty,depth_frag:ny,distance_vert:iy,distance_frag:sy,equirect_vert:ry,equirect_frag:ay,linedashed_vert:oy,linedashed_frag:cy,meshbasic_vert:ly,meshbasic_frag:hy,meshlambert_vert:uy,meshlambert_frag:dy,meshmatcap_vert:fy,meshmatcap_frag:py,meshnormal_vert:my,meshnormal_frag:gy,meshphong_vert:xy,meshphong_frag:_y,meshphysical_vert:yy,meshphysical_frag:vy,meshtoon_vert:My,meshtoon_frag:Sy,points_vert:by,points_frag:Ey,shadow_vert:wy,shadow_frag:Ty,sprite_vert:Ay,sprite_frag:Ry},Ee={common:{diffuse:{value:new ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},envMapRotation:{value:new qe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new de(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new z},probesMax:{value:new z},probesResolution:{value:new z}},points:{diffuse:{value:new ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new ke(16777215)},opacity:{value:1},center:{value:new de(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}}},tn={basic:{uniforms:Jt([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:Jt([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new ke(0)},envMapIntensity:{value:1}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:Jt([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new ke(0)},specular:{value:new ke(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:Jt([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:Jt([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new ke(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:Jt([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:Jt([Ee.points,Ee.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:Jt([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:Jt([Ee.common,Ee.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:Jt([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:Jt([Ee.sprite,Ee.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qe}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distance:{uniforms:Jt([Ee.common,Ee.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distance_vert,fragmentShader:Qe.distance_frag},shadow:{uniforms:Jt([Ee.lights,Ee.fog,{color:{value:new ke(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};tn.physical={uniforms:Jt([tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new de(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new de},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new ke(0)},specularColor:{value:new ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe},anisotropyVector:{value:new de},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qe}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};var cl={r:0,b:0,g:0},Cy=new nt,$p=new qe;$p.set(-1,0,0,0,1,0,0,0,1);function Iy(i,e,t,n,s,r){let a=new ke(0),o=s===!0?0:1,c,l,h=null,u=0,d=null;function f(b){let M=b.isScene===!0?b.background:null;if(M&&M.isTexture){let x=b.backgroundBlurriness>0;M=e.get(M,x)}return M}function m(b){let M=!1,x=f(b);x===null?g(a,o):x&&x.isColor&&(g(x,1),M=!0);let E=i.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(b,M){let x=f(M);x&&(x.isCubeTexture||x.mapping===Ha)?(l===void 0&&(l=new pt(new pr(1,1,1),new Ft({name:"BackgroundCubeMaterial",uniforms:Es(tn.backgroundCube.uniforms),vertexShader:tn.backgroundCube.vertexShader,fragmentShader:tn.backgroundCube.fragmentShader,side:Qt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(E,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=x,l.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Cy.makeRotationFromEuler(M.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply($p),l.material.toneMapped=st.getTransfer(x.colorSpace)!==ht,(h!==x||u!==x.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=x,u=x.version,d=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new pt(new _n(2,2),new Ft({name:"BackgroundMaterial",uniforms:Es(tn.background.uniforms),vertexShader:tn.background.vertexShader,fragmentShader:tn.background.fragmentShader,side:Mi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=st.getTransfer(x.colorSpace)!==ht,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||u!==x.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=x,u=x.version,d=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function g(b,M){b.getRGB(cl,fu(i)),t.buffers.color.setClear(cl.r,cl.g,cl.b,M,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,M=1){a.set(b),o=M,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(b){o=b,g(a,o)},render:m,addToRenderList:_,dispose:p}}function Py(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,a=!1;function o(T,I,B,F,U){let X=!1,H=u(T,F,B,I);r!==H&&(r=H,l(r.object)),X=f(T,F,B,U),X&&m(T,F,B,U),U!==null&&e.update(U,i.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,x(T,I,B,F),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function c(){return i.createVertexArray()}function l(T){return i.bindVertexArray(T)}function h(T){return i.deleteVertexArray(T)}function u(T,I,B,F){let U=F.wireframe===!0,X=n[I.id];X===void 0&&(X={},n[I.id]=X);let H=T.isInstancedMesh===!0?T.id:0,G=X[H];G===void 0&&(G={},X[H]=G);let K=G[B.id];K===void 0&&(K={},G[B.id]=K);let ie=K[U];return ie===void 0&&(ie=d(c()),K[U]=ie),ie}function d(T){let I=[],B=[],F=[];for(let U=0;U<t;U++)I[U]=0,B[U]=0,F[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:B,attributeDivisors:F,object:T,attributes:{},index:null}}function f(T,I,B,F){let U=r.attributes,X=I.attributes,H=0,G=B.getAttributes();for(let K in G)if(G[K].location>=0){let he=U[K],pe=X[K];if(pe===void 0&&(K==="instanceMatrix"&&T.instanceMatrix&&(pe=T.instanceMatrix),K==="instanceColor"&&T.instanceColor&&(pe=T.instanceColor)),he===void 0||he.attribute!==pe||pe&&he.data!==pe.data)return!0;H++}return r.attributesNum!==H||r.index!==F}function m(T,I,B,F){let U={},X=I.attributes,H=0,G=B.getAttributes();for(let K in G)if(G[K].location>=0){let he=X[K];he===void 0&&(K==="instanceMatrix"&&T.instanceMatrix&&(he=T.instanceMatrix),K==="instanceColor"&&T.instanceColor&&(he=T.instanceColor));let pe={};pe.attribute=he,he&&he.data&&(pe.data=he.data),U[K]=pe,H++}r.attributes=U,r.attributesNum=H,r.index=F}function _(){let T=r.newAttributes;for(let I=0,B=T.length;I<B;I++)T[I]=0}function g(T){p(T,0)}function p(T,I){let B=r.newAttributes,F=r.enabledAttributes,U=r.attributeDivisors;B[T]=1,F[T]===0&&(i.enableVertexAttribArray(T),F[T]=1),U[T]!==I&&(i.vertexAttribDivisor(T,I),U[T]=I)}function b(){let T=r.newAttributes,I=r.enabledAttributes;for(let B=0,F=I.length;B<F;B++)I[B]!==T[B]&&(i.disableVertexAttribArray(B),I[B]=0)}function M(T,I,B,F,U,X,H){H===!0?i.vertexAttribIPointer(T,I,B,U,X):i.vertexAttribPointer(T,I,B,F,U,X)}function x(T,I,B,F){_();let U=F.attributes,X=B.getAttributes(),H=I.defaultAttributeValues;for(let G in X){let K=X[G];if(K.location>=0){let ie=U[G];if(ie===void 0&&(G==="instanceMatrix"&&T.instanceMatrix&&(ie=T.instanceMatrix),G==="instanceColor"&&T.instanceColor&&(ie=T.instanceColor)),ie!==void 0){let he=ie.normalized,pe=ie.itemSize,ve=e.get(ie);if(ve===void 0)continue;let Ge=ve.buffer,Ue=ve.type,ee=ve.bytesPerElement,W=Ue===i.INT||Ue===i.UNSIGNED_INT||ie.gpuType===Sc;if(ie.isInterleavedBufferAttribute){let k=ie.data,O=k.stride,N=ie.offset;if(k.isInstancedInterleavedBuffer){for(let q=0;q<K.locationSize;q++)p(K.location+q,k.meshPerAttribute);T.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let q=0;q<K.locationSize;q++)g(K.location+q);i.bindBuffer(i.ARRAY_BUFFER,Ge);for(let q=0;q<K.locationSize;q++)M(K.location+q,pe/K.locationSize,Ue,he,O*ee,(N+pe/K.locationSize*q)*ee,W)}else{if(ie.isInstancedBufferAttribute){for(let k=0;k<K.locationSize;k++)p(K.location+k,ie.meshPerAttribute);T.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let k=0;k<K.locationSize;k++)g(K.location+k);i.bindBuffer(i.ARRAY_BUFFER,Ge);for(let k=0;k<K.locationSize;k++)M(K.location+k,pe/K.locationSize,Ue,he,pe*ee,pe/K.locationSize*k*ee,W)}}else if(H!==void 0){let he=H[G];if(he!==void 0)switch(he.length){case 2:i.vertexAttrib2fv(K.location,he);break;case 3:i.vertexAttrib3fv(K.location,he);break;case 4:i.vertexAttrib4fv(K.location,he);break;default:i.vertexAttrib1fv(K.location,he)}}}}b()}function E(){A();for(let T in n){let I=n[T];for(let B in I){let F=I[B];for(let U in F){let X=F[U];for(let H in X)h(X[H].object),delete X[H];delete F[U]}}delete n[T]}}function w(T){if(n[T.id]===void 0)return;let I=n[T.id];for(let B in I){let F=I[B];for(let U in F){let X=F[U];for(let H in X)h(X[H].object),delete X[H];delete F[U]}}delete n[T.id]}function C(T){for(let I in n){let B=n[I];for(let F in B){let U=B[F];if(U[T.id]===void 0)continue;let X=U[T.id];for(let H in X)h(X[H].object),delete X[H];delete U[T.id]}}}function y(T){for(let I in n){let B=n[I],F=T.isInstancedMesh===!0?T.id:0,U=B[F];if(U!==void 0){for(let X in U){let H=U[X];for(let G in H)h(H[G].object),delete H[G];delete U[X]}delete B[F],Object.keys(B).length===0&&delete n[I]}}}function A(){D(),a=!0,r!==s&&(r=s,l(r.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:D,dispose:E,releaseStatesOfGeometry:w,releaseStatesOfObject:y,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:g,disableUnusedAttributes:b}}function Ly(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let d=0;for(let f=0;f<h;f++)d+=l[f];t.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Ny(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let C=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==on&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let y=C===ri&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==an&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==An&&!y)}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(Xe("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Xe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:b,maxVaryings:M,maxFragmentUniforms:x,maxSamples:E,samples:w}}function Dy(i){let e=this,t=null,n=0,s=!1,r=!1,a=new Zt,o=new qe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let m=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,p=i.get(u);if(!s||m===null||m.length===0||r&&!g)r?h(null):l();else{let b=r?0:n,M=b*4,x=p.clippingState||null;c.value=x,x=h(m,d,M,f);for(let E=0;E!==M;++E)x[E]=t[E];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,m){let _=u!==null?u.length:0,g=null;if(_!==0){if(g=c.value,m!==!0||g===null){let p=f+_*4,b=d.matrixWorldInverse;o.getNormalMatrix(b),(g===null||g.length<p)&&(g=new Float32Array(p));for(let M=0,x=f;M!==_;++M,x+=4)a.copy(u[M]).applyMatrix4(b,o),a.normal.toArray(g,x),g[x+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}var ns=4,Ap=[.125,.215,.35,.446,.526,.582],ws=20,Uy=256,$a=new ni,Rp=new ke,Su=null,bu=0,Eu=0,wu=!1,Fy=new z,hl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=Fy}=r;Su=this._renderer.getRenderTarget(),bu=this._renderer.getActiveCubeFace(),Eu=this._renderer.getActiveMipmapLevel(),wu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ip(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Su,bu,Eu),this._renderer.xr.enabled=wu,e.scissorTest=!1,Er(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Qi||e.mapping===Ss?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Su=this._renderer.getRenderTarget(),bu=this._renderer.getActiveCubeFace(),Eu=this._renderer.getActiveMipmapLevel(),wu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:St,minFilter:St,generateMipmaps:!1,type:ri,format:on,colorSpace:ca,depthBuffer:!1},s=Cp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Cp(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Oy(r)),this._blurMaterial=zy(r,e,t),this._ggxMaterial=By(r,e,t)}return s}_compileMaterial(e){let t=new pt(new Et,e);this._renderer.compile(t,$a)}_sceneToCubeUV(e,t,n,s,r){let c=new kt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Rp),u.toneMapping=On,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new pt(new pr,new Yt({name:"PMREM.Background",side:Qt,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,g=_.material,p=!1,b=e.background;b?b.isColor&&(g.color.copy(b),e.background=null,p=!0):(g.color.copy(Rp),p=!0);for(let M=0;M<6;M++){let x=M%3;x===0?(c.up.set(0,l[M],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[M],r.y,r.z)):x===1?(c.up.set(0,0,l[M]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[M],r.z)):(c.up.set(0,l[M],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[M]));let E=this._cubeSize;Er(s,x*E,M>2?E:0,E,E),u.setRenderTarget(s),p&&u.render(_,c),u.render(e,c)}u.toneMapping=f,u.autoClear=d,e.background=b}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Qi||e.mapping===Ss;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ip());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;Er(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,$a)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),d=0+l*1.25,f=u*d,{_lodMax:m}=this,_=this._sizeLods[n],g=3*_*(n>m-ns?n-m+ns:0),p=4*(this._cubeSize-_);c.envMap.value=e.texture,c.roughness.value=f,c.mipInt.value=m-t,Er(r,g,p,3*_,2*_),s.setRenderTarget(r),s.render(o,$a),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=m-n,Er(e,g,p,3*_,2*_),s.setRenderTarget(e),s.render(o,$a)}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ye("blur direction must be either latitudinal or longitudinal!");let h=3,u=this._lodMeshes[s];u.material=l;let d=l.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ws-1),_=r/m,g=isFinite(r)?1+Math.floor(h*_):ws;g>ws&&Xe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${ws}`);let p=[],b=0;for(let C=0;C<ws;++C){let y=C/_,A=Math.exp(-y*y/2);p.push(A),C===0?b+=A:C<g&&(b+=2*A)}for(let C=0;C<p.length;C++)p[C]=p[C]/b;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:M}=this;d.dTheta.value=m,d.mipInt.value=M-n;let x=this._sizeLods[s],E=3*x*(s>M-ns?s-M+ns:0),w=4*(this._cubeSize-x);Er(t,E,w,3*x,2*x),c.setRenderTarget(t),c.render(u,$a)}};function Oy(i){let e=[],t=[],n=[],s=i,r=i-ns+1+Ap.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let c=1/o;a>i-ns?c=Ap[a-i+ns-1]:a===0&&(c=0),t.push(c);let l=1/(o-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,_=3,g=2,p=1,b=new Float32Array(_*m*f),M=new Float32Array(g*m*f),x=new Float32Array(p*m*f);for(let w=0;w<f;w++){let C=w%3*2/3-1,y=w>2?0:-1,A=[C,y,0,C+2/3,y,0,C+2/3,y+1,0,C,y,0,C+2/3,y+1,0,C,y+1,0];b.set(A,_*m*w),M.set(d,g*m*w);let D=[w,w,w,w,w,w];x.set(D,p*m*w)}let E=new Et;E.setAttribute("position",new Mt(b,_)),E.setAttribute("uv",new Mt(M,g)),E.setAttribute("faceIndex",new Mt(x,p)),n.push(new pt(E,null)),s>ns&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Cp(i,e,t){let n=new jt(i,e,t);return n.texture.mapping=Ha,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Er(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function By(i,e,t){return new Ft({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Uy,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:dl(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function zy(i,e,t){let n=new Float32Array(ws),s=new z(0,1,0);return new Ft({name:"SphericalGaussianBlur",defines:{n:ws,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:dl(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Ip(){return new Ft({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:dl(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Pp(){return new Ft({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:dl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function dl(){return`

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
	`}var ul=class extends jt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new va(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new pr(5,5,5),r=new Ft({name:"CubemapFromEquirect",uniforms:Es(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Qt,blending:ii});r.uniforms.tEquirect.value=t;let a=new pt(s,r),o=t.minFilter;return t.minFilter===si&&(t.minFilter=St),new gc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function ky(i){let e=new WeakMap,t=new WeakMap,n=null;function s(d,f=!1){return d==null?null:f?a(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===yc||f===vc)if(e.has(d)){let m=e.get(d).texture;return o(m,d.mapping)}else{let m=d.image;if(m&&m.height>0){let _=new ul(m.height);return _.fromEquirectangularTexture(i,d),e.set(d,_),d.addEventListener("dispose",l),o(_.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){let f=d.mapping,m=f===yc||f===vc,_=f===Qi||f===Ss;if(m||_){let g=t.get(d),p=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return n===null&&(n=new hl(i)),g=m?n.fromEquirectangular(d,g):n.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{let b=d.image;return m&&b&&b.height>0||_&&b&&c(b)?(n===null&&(n=new hl(i)),g=m?n.fromEquirectangular(d):n.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",h),g.texture):null}}}return d}function o(d,f){return f===yc?d.mapping=Qi:f===vc&&(d.mapping=Ss),d}function c(d){let f=0,m=6;for(let _=0;_<m;_++)d[_]!==void 0&&f++;return f===m}function l(d){let f=d.target;f.removeEventListener("dispose",l);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function Vy(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&ps("WebGLRenderer: "+n+" extension not supported."),s}}}function Hy(i,e,t,n){let s={},r=new WeakMap;function a(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete s[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function c(u){let d=u.attributes;for(let f in d)e.update(d[f],i.ARRAY_BUFFER)}function l(u){let d=[],f=u.index,m=u.attributes.position,_=0;if(m===void 0)return;if(f!==null){let b=f.array;_=f.version;for(let M=0,x=b.length;M<x;M+=3){let E=b[M+0],w=b[M+1],C=b[M+2];d.push(E,w,w,C,C,E)}}else{let b=m.array;_=m.version;for(let M=0,x=b.length/3-1;M<x;M+=3){let E=M+0,w=M+1,C=M+2;d.push(E,w,w,C,C,E)}}let g=new(m.count>=65535?ma:pa)(d,1);g.version=_;let p=r.get(u);p&&e.remove(p),r.set(u,g)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function Gy(i,e,t){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function c(u,d){i.drawElements(n,d,r,u*a),t.update(d,n,1)}function l(u,d,f){f!==0&&(i.drawElementsInstanced(n,d,r,u*a,f),t.update(d,n,f))}function h(u,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,f);let _=0;for(let g=0;g<f;g++)_+=d[g];t.update(_,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function Wy(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Ye("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Xy(i,e,t){let n=new WeakMap,s=new ot;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(o);if(d===void 0||d.count!==u){let A=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",A)};d!==void 0&&d.texture.dispose();let f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],b=o.morphAttributes.color||[],M=0;f===!0&&(M=1),m===!0&&(M=2),_===!0&&(M=3);let x=o.attributes.position.count*M,E=1;x>e.maxTextureSize&&(E=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let w=new Float32Array(x*E*4*u),C=new da(w,x,E,u);C.type=An,C.needsUpdate=!0;let y=M*4;for(let D=0;D<u;D++){let T=g[D],I=p[D],B=b[D],F=x*E*4*D;for(let U=0;U<T.count;U++){let X=U*y;f===!0&&(s.fromBufferAttribute(T,U),w[F+X+0]=s.x,w[F+X+1]=s.y,w[F+X+2]=s.z,w[F+X+3]=0),m===!0&&(s.fromBufferAttribute(I,U),w[F+X+4]=s.x,w[F+X+5]=s.y,w[F+X+6]=s.z,w[F+X+7]=0),_===!0&&(s.fromBufferAttribute(B,U),w[F+X+8]=s.x,w[F+X+9]=s.y,w[F+X+10]=s.z,w[F+X+11]=B.itemSize===4?s.w:1)}}d={count:u,texture:C,size:new de(x,E)},n.set(o,d),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];let m=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function qy(i,e,t,n,s){let r=new WeakMap;function a(l){let h=s.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let f=l.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function o(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var Zy={[Kh]:"LINEAR_TONE_MAPPING",[jh]:"REINHARD_TONE_MAPPING",[Qh]:"CINEON_TONE_MAPPING",[Va]:"ACES_FILMIC_TONE_MAPPING",[tu]:"AGX_TONE_MAPPING",[nu]:"NEUTRAL_TONE_MAPPING",[eu]:"CUSTOM_TONE_MAPPING"};function Yy(i,e,t,n,s,r){let a=new jt(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Ei(e,t):void 0}),o=new jt(e,t,{type:ri,depthBuffer:!1,stencilBuffer:!1}),c=new Et;c.setAttribute("position",new ut([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new ut([0,2,0,0,2,0],2));let l=new sc({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new pt(c,l),u=new ni(-1,1,1,-1,0,1),d=null,f=null,m=!1,_,g=null,p=[],b=!1;this.setSize=function(M,x){a.setSize(M,x),o.setSize(M,x);for(let E=0;E<p.length;E++){let w=p[E];w.setSize&&w.setSize(M,x)}},this.setEffects=function(M){p=M,b=p.length>0&&p[0].isRenderPass===!0;let x=a.width,E=a.height;for(let w=0;w<p.length;w++){let C=p[w];C.setSize&&C.setSize(x,E)}},this.begin=function(M,x){if(m||M.toneMapping===On&&p.length===0)return!1;if(g=x,x!==null){let E=x.width,w=x.height;(a.width!==E||a.height!==w)&&this.setSize(E,w)}return b===!1&&M.setRenderTarget(a),_=M.toneMapping,M.toneMapping=On,!0},this.hasRenderPass=function(){return b},this.end=function(M,x){M.toneMapping=_,m=!0;let E=a,w=o;for(let C=0;C<p.length;C++){let y=p[C];if(y.enabled!==!1&&(y.render(M,w,E,x),y.needsSwap!==!1)){let A=E;E=w,w=A}}if(d!==M.outputColorSpace||f!==M.toneMapping){d=M.outputColorSpace,f=M.toneMapping,l.defines={},st.getTransfer(d)===ht&&(l.defines.SRGB_TRANSFER="");let C=Zy[f];C&&(l.defines[C]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=E.texture,M.setRenderTarget(g),M.render(h,u),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),c.dispose(),l.dispose()}}var Kp=new Ut,Ru=new Ei(1,1),jp=new da,Qp=new Yo,em=new va,Lp=[],Np=[],Dp=new Float32Array(16),Up=new Float32Array(9),Fp=new Float32Array(4);function Ar(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Lp[s];if(r===void 0&&(r=new Float32Array(s),Lp[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Ot(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Bt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function fl(i,e){let t=Np[e];t===void 0&&(t=new Int32Array(e),Np[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Jy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function $y(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;i.uniform2fv(this.addr,e),Bt(t,e)}}function Ky(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ot(t,e))return;i.uniform3fv(this.addr,e),Bt(t,e)}}function jy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;i.uniform4fv(this.addr,e),Bt(t,e)}}function Qy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ot(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Bt(t,e)}else{if(Ot(t,n))return;Fp.set(n),i.uniformMatrix2fv(this.addr,!1,Fp),Bt(t,n)}}function ev(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ot(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Bt(t,e)}else{if(Ot(t,n))return;Up.set(n),i.uniformMatrix3fv(this.addr,!1,Up),Bt(t,n)}}function tv(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ot(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Bt(t,e)}else{if(Ot(t,n))return;Dp.set(n),i.uniformMatrix4fv(this.addr,!1,Dp),Bt(t,n)}}function nv(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function iv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;i.uniform2iv(this.addr,e),Bt(t,e)}}function sv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ot(t,e))return;i.uniform3iv(this.addr,e),Bt(t,e)}}function rv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;i.uniform4iv(this.addr,e),Bt(t,e)}}function av(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function ov(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;i.uniform2uiv(this.addr,e),Bt(t,e)}}function cv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ot(t,e))return;i.uniform3uiv(this.addr,e),Bt(t,e)}}function lv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;i.uniform4uiv(this.addr,e),Bt(t,e)}}function hv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ru.compareFunction=t.isReversedDepthBuffer()?ol:al,r=Ru):r=Kp,t.setTexture2D(e||r,s)}function uv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Qp,s)}function dv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||em,s)}function fv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||jp,s)}function pv(i){switch(i){case 5126:return Jy;case 35664:return $y;case 35665:return Ky;case 35666:return jy;case 35674:return Qy;case 35675:return ev;case 35676:return tv;case 5124:case 35670:return nv;case 35667:case 35671:return iv;case 35668:case 35672:return sv;case 35669:case 35673:return rv;case 5125:return av;case 36294:return ov;case 36295:return cv;case 36296:return lv;case 35678:case 36198:case 36298:case 36306:case 35682:return hv;case 35679:case 36299:case 36307:return uv;case 35680:case 36300:case 36308:case 36293:return dv;case 36289:case 36303:case 36311:case 36292:return fv}}function mv(i,e){i.uniform1fv(this.addr,e)}function gv(i,e){let t=Ar(e,this.size,2);i.uniform2fv(this.addr,t)}function xv(i,e){let t=Ar(e,this.size,3);i.uniform3fv(this.addr,t)}function _v(i,e){let t=Ar(e,this.size,4);i.uniform4fv(this.addr,t)}function yv(i,e){let t=Ar(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function vv(i,e){let t=Ar(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Mv(i,e){let t=Ar(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Sv(i,e){i.uniform1iv(this.addr,e)}function bv(i,e){i.uniform2iv(this.addr,e)}function Ev(i,e){i.uniform3iv(this.addr,e)}function wv(i,e){i.uniform4iv(this.addr,e)}function Tv(i,e){i.uniform1uiv(this.addr,e)}function Av(i,e){i.uniform2uiv(this.addr,e)}function Rv(i,e){i.uniform3uiv(this.addr,e)}function Cv(i,e){i.uniform4uiv(this.addr,e)}function Iv(i,e,t){let n=this.cache,s=e.length,r=fl(t,s);Ot(n,r)||(i.uniform1iv(this.addr,r),Bt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Ru:a=Kp;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Pv(i,e,t){let n=this.cache,s=e.length,r=fl(t,s);Ot(n,r)||(i.uniform1iv(this.addr,r),Bt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Qp,r[a])}function Lv(i,e,t){let n=this.cache,s=e.length,r=fl(t,s);Ot(n,r)||(i.uniform1iv(this.addr,r),Bt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||em,r[a])}function Nv(i,e,t){let n=this.cache,s=e.length,r=fl(t,s);Ot(n,r)||(i.uniform1iv(this.addr,r),Bt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||jp,r[a])}function Dv(i){switch(i){case 5126:return mv;case 35664:return gv;case 35665:return xv;case 35666:return _v;case 35674:return yv;case 35675:return vv;case 35676:return Mv;case 5124:case 35670:return Sv;case 35667:case 35671:return bv;case 35668:case 35672:return Ev;case 35669:case 35673:return wv;case 5125:return Tv;case 36294:return Av;case 36295:return Rv;case 36296:return Cv;case 35678:case 36198:case 36298:case 36306:case 35682:return Iv;case 35679:case 36299:case 36307:return Pv;case 35680:case 36300:case 36308:case 36293:return Lv;case 36289:case 36303:case 36311:case 36292:return Nv}}var Cu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=pv(t.type)}},Iu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Dv(t.type)}},Pu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},Tu=/(\w+)(\])?(\[|\.)?/g;function Op(i,e){i.seq.push(e),i.map[e.id]=e}function Uv(i,e,t){let n=i.name,s=n.length;for(Tu.lastIndex=0;;){let r=Tu.exec(n),a=Tu.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Op(t,l===void 0?new Cu(o,i,e):new Iu(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new Pu(o),Op(t,u)),t=u}}}var wr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);Uv(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function Bp(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Fv=37297,Ov=0;function Bv(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var zp=new qe;function zv(i){st._getMatrix(zp,st.workingColorSpace,i);let e=`mat3( ${zp.elements.map(t=>t.toFixed(4))} )`;switch(st.getTransfer(i)){case la:return[e,"LinearTransferOETF"];case ht:return[e,"sRGBTransferOETF"];default:return Xe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function kp(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Bv(i.getShaderSource(e),o)}else return r}function kv(i,e){let t=zv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Vv={[Kh]:"Linear",[jh]:"Reinhard",[Qh]:"Cineon",[Va]:"ACESFilmic",[tu]:"AgX",[nu]:"Neutral",[eu]:"Custom"};function Hv(i,e){let t=Vv[e];return t===void 0?(Xe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ll=new z;function Gv(){st.getLuminanceCoefficients(ll);let i=ll.x.toFixed(4),e=ll.y.toFixed(4),t=ll.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Wv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ja).join(`
`)}function Xv(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function qv(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ja(i){return i!==""}function Vp(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Hp(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Zv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Lu(i){return i.replace(Zv,Jv)}var Yv=new Map;function Jv(i,e){let t=Qe[e];if(t===void 0){let n=Yv.get(e);if(n!==void 0)t=Qe[n],Xe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Lu(t)}var $v=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gp(i){return i.replace($v,Kv)}function Kv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Wp(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var jv={[ka]:"SHADOWMAP_TYPE_PCF",[yr]:"SHADOWMAP_TYPE_VSM"};function Qv(i){return jv[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var e1={[Qi]:"ENVMAP_TYPE_CUBE",[Ss]:"ENVMAP_TYPE_CUBE",[Ha]:"ENVMAP_TYPE_CUBE_UV"};function t1(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":e1[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var n1={[Ss]:"ENVMAP_MODE_REFRACTION"};function i1(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":n1[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var s1={[$h]:"ENVMAP_BLENDING_MULTIPLY",[ap]:"ENVMAP_BLENDING_MIX",[op]:"ENVMAP_BLENDING_ADD"};function r1(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":s1[i.combine]||"ENVMAP_BLENDING_NONE"}function a1(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function o1(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=Qv(t),l=t1(t),h=i1(t),u=r1(t),d=a1(t),f=Wv(t),m=Xv(r),_=s.createProgram(),g,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ja).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ja).join(`
`),p.length>0&&(p+=`
`)):(g=[Wp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ja).join(`
`),p=[Wp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==On?"#define TONE_MAPPING":"",t.toneMapping!==On?Qe.tonemapping_pars_fragment:"",t.toneMapping!==On?Hv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,kv("linearToOutputTexel",t.outputColorSpace),Gv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ja).join(`
`)),a=Lu(a),a=Vp(a,t),a=Hp(a,t),o=Lu(o),o=Vp(o,t),o=Hp(o,t),a=Gp(a),o=Gp(o),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===hu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===hu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let M=b+g+a,x=b+p+o,E=Bp(s,s.VERTEX_SHADER,M),w=Bp(s,s.FRAGMENT_SHADER,x);s.attachShader(_,E),s.attachShader(_,w),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(T){if(i.debug.checkShaderErrors){let I=s.getProgramInfoLog(_)||"",B=s.getShaderInfoLog(E)||"",F=s.getShaderInfoLog(w)||"",U=I.trim(),X=B.trim(),H=F.trim(),G=!0,K=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,E,w);else{let ie=kp(s,E,"vertex"),he=kp(s,w,"fragment");Ye("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+U+`
`+ie+`
`+he)}else U!==""?Xe("WebGLProgram: Program Info Log:",U):(X===""||H==="")&&(K=!1);K&&(T.diagnostics={runnable:G,programLog:U,vertexShader:{log:X,prefix:g},fragmentShader:{log:H,prefix:p}})}s.deleteShader(E),s.deleteShader(w),y=new wr(s,_),A=qv(s,_)}let y;this.getUniforms=function(){return y===void 0&&C(this),y};let A;this.getAttributes=function(){return A===void 0&&C(this),A};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(_,Fv)),D},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ov++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=w,this}var c1=0,Nu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Du(e),t.set(e,n)),n}},Du=class{constructor(e){this.id=c1++,this.code=e,this.usedTimes=0}};function l1(i){return i===ts||i===Za||i===Ya}function h1(i,e,t,n,s,r){let a=new or,o=new Nu,c=new Set,l=[],h=new Map,u=n.logarithmicDepthBuffer,d=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(y){return c.add(y),y===0?"uv":`uv${y}`}function _(y,A,D,T,I,B){let F=T.fog,U=I.geometry,X=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?T.environment:null,H=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,G=e.get(y.envMap||X,H),K=G&&G.mapping===Ha?G.image.height:null,ie=f[y.type];y.precision!==null&&(d=n.getMaxPrecision(y.precision),d!==y.precision&&Xe("WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));let he=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,pe=he!==void 0?he.length:0,ve=0;U.morphAttributes.position!==void 0&&(ve=1),U.morphAttributes.normal!==void 0&&(ve=2),U.morphAttributes.color!==void 0&&(ve=3);let Ge,Ue,ee,W;if(ie){let Oe=tn[ie];Ge=Oe.vertexShader,Ue=Oe.fragmentShader}else{Ge=y.vertexShader,Ue=y.fragmentShader;let Oe=o.getVertexShaderStage(y),wt=o.getFragmentShaderStage(y);o.update(y,Oe,wt),ee=Oe.id,W=wt.id}let k=i.getRenderTarget(),O=i.state.buffers.depth.getReversed(),N=I.isInstancedMesh===!0,q=I.isBatchedMesh===!0,oe=!!y.map,fe=!!y.matcap,P=!!G,Z=!!y.aoMap,V=!!y.lightMap,Q=!!y.bumpMap&&y.wireframe===!1,ne=!!y.normalMap,le=!!y.displacementMap,xe=!!y.emissiveMap,_e=!!y.metalnessMap,J=!!y.roughnessMap,S=y.anisotropy>0,Pe=y.clearcoat>0,Fe=y.dispersion>0,L=y.iridescence>0,v=y.sheen>0,$=y.transmission>0,te=S&&!!y.anisotropyMap,ce=Pe&&!!y.clearcoatMap,Me=Pe&&!!y.clearcoatNormalMap,Se=Pe&&!!y.clearcoatRoughnessMap,ue=L&&!!y.iridescenceMap,me=L&&!!y.iridescenceThicknessMap,be=v&&!!y.sheenColorMap,Be=v&&!!y.sheenRoughnessMap,Ae=!!y.specularMap,we=!!y.specularColorMap,Ze=!!y.specularIntensityMap,Je=$&&!!y.transmissionMap,Ke=$&&!!y.thicknessMap,Y=!!y.gradientMap,Te=!!y.alphaMap,ge=y.alphaTest>0,Re=!!y.alphaHash,Le=!!y.extensions,ye=On;y.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(ye=i.toneMapping);let Ve={shaderID:ie,shaderType:y.type,shaderName:y.name,vertexShader:Ge,fragmentShader:Ue,defines:y.defines,customVertexShaderID:ee,customFragmentShaderID:W,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:q,batchingColor:q&&I._colorsTexture!==null,instancing:N,instancingColor:N&&I.instanceColor!==null,instancingMorph:N&&I.morphTexture!==null,outputColorSpace:k===null?i.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:st.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:oe,matcap:fe,envMap:P,envMapMode:P&&G.mapping,envMapCubeUVHeight:K,aoMap:Z,lightMap:V,bumpMap:Q,normalMap:ne,displacementMap:le,emissiveMap:xe,normalMapObjectSpace:ne&&y.normalMapType===lp,normalMapTangentSpace:ne&&y.normalMapType===rl,packedNormalMap:ne&&y.normalMapType===rl&&l1(y.normalMap.format),metalnessMap:_e,roughnessMap:J,anisotropy:S,anisotropyMap:te,clearcoat:Pe,clearcoatMap:ce,clearcoatNormalMap:Me,clearcoatRoughnessMap:Se,dispersion:Fe,iridescence:L,iridescenceMap:ue,iridescenceThicknessMap:me,sheen:v,sheenColorMap:be,sheenRoughnessMap:Be,specularMap:Ae,specularColorMap:we,specularIntensityMap:Ze,transmission:$,transmissionMap:Je,thicknessMap:Ke,gradientMap:Y,opaque:y.transparent===!1&&y.blending===ms&&y.alphaToCoverage===!1,alphaMap:Te,alphaTest:ge,alphaHash:Re,combine:y.combine,mapUv:oe&&m(y.map.channel),aoMapUv:Z&&m(y.aoMap.channel),lightMapUv:V&&m(y.lightMap.channel),bumpMapUv:Q&&m(y.bumpMap.channel),normalMapUv:ne&&m(y.normalMap.channel),displacementMapUv:le&&m(y.displacementMap.channel),emissiveMapUv:xe&&m(y.emissiveMap.channel),metalnessMapUv:_e&&m(y.metalnessMap.channel),roughnessMapUv:J&&m(y.roughnessMap.channel),anisotropyMapUv:te&&m(y.anisotropyMap.channel),clearcoatMapUv:ce&&m(y.clearcoatMap.channel),clearcoatNormalMapUv:Me&&m(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&m(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ue&&m(y.iridescenceMap.channel),iridescenceThicknessMapUv:me&&m(y.iridescenceThicknessMap.channel),sheenColorMapUv:be&&m(y.sheenColorMap.channel),sheenRoughnessMapUv:Be&&m(y.sheenRoughnessMap.channel),specularMapUv:Ae&&m(y.specularMap.channel),specularColorMapUv:we&&m(y.specularColorMap.channel),specularIntensityMapUv:Ze&&m(y.specularIntensityMap.channel),transmissionMapUv:Je&&m(y.transmissionMap.channel),thicknessMapUv:Ke&&m(y.thicknessMap.channel),alphaMapUv:Te&&m(y.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(ne||S),vertexNormals:!!U.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!U.attributes.uv&&(oe||Te),fog:!!F,useFog:y.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||U.attributes.normal===void 0&&ne===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:O,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:pe,morphTextureStride:ve,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:B.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:ye,decodeVideoTexture:oe&&y.map.isVideoTexture===!0&&st.getTransfer(y.map.colorSpace)===ht,decodeVideoTextureEmissive:xe&&y.emissiveMap.isVideoTexture===!0&&st.getTransfer(y.emissiveMap.colorSpace)===ht,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===en,flipSided:y.side===Qt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Le&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Le&&y.extensions.multiDraw===!0||q)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ve.vertexUv1s=c.has(1),Ve.vertexUv2s=c.has(2),Ve.vertexUv3s=c.has(3),c.clear(),Ve}function g(y){let A=[];if(y.shaderID?A.push(y.shaderID):(A.push(y.customVertexShaderID),A.push(y.customFragmentShaderID)),y.defines!==void 0)for(let D in y.defines)A.push(D),A.push(y.defines[D]);return y.isRawShaderMaterial===!1&&(p(A,y),b(A,y),A.push(i.outputColorSpace)),A.push(y.customProgramCacheKey),A.join()}function p(y,A){y.push(A.precision),y.push(A.outputColorSpace),y.push(A.envMapMode),y.push(A.envMapCubeUVHeight),y.push(A.mapUv),y.push(A.alphaMapUv),y.push(A.lightMapUv),y.push(A.aoMapUv),y.push(A.bumpMapUv),y.push(A.normalMapUv),y.push(A.displacementMapUv),y.push(A.emissiveMapUv),y.push(A.metalnessMapUv),y.push(A.roughnessMapUv),y.push(A.anisotropyMapUv),y.push(A.clearcoatMapUv),y.push(A.clearcoatNormalMapUv),y.push(A.clearcoatRoughnessMapUv),y.push(A.iridescenceMapUv),y.push(A.iridescenceThicknessMapUv),y.push(A.sheenColorMapUv),y.push(A.sheenRoughnessMapUv),y.push(A.specularMapUv),y.push(A.specularColorMapUv),y.push(A.specularIntensityMapUv),y.push(A.transmissionMapUv),y.push(A.thicknessMapUv),y.push(A.combine),y.push(A.fogExp2),y.push(A.sizeAttenuation),y.push(A.morphTargetsCount),y.push(A.morphAttributeCount),y.push(A.numDirLights),y.push(A.numPointLights),y.push(A.numSpotLights),y.push(A.numSpotLightMaps),y.push(A.numHemiLights),y.push(A.numRectAreaLights),y.push(A.numDirLightShadows),y.push(A.numPointLightShadows),y.push(A.numSpotLightShadows),y.push(A.numSpotLightShadowsWithMaps),y.push(A.numLightProbes),y.push(A.shadowMapType),y.push(A.toneMapping),y.push(A.numClippingPlanes),y.push(A.numClipIntersection),y.push(A.depthPacking)}function b(y,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function M(y){let A=f[y.type],D;if(A){let T=tn[A];D=Ja.clone(T.uniforms)}else D=y.uniforms;return D}function x(y,A){let D=h.get(A);return D!==void 0?++D.usedTimes:(D=new o1(i,A,y,s),l.push(D),h.set(A,D)),D}function E(y){if(--y.usedTimes===0){let A=l.indexOf(y);l[A]=l[l.length-1],l.pop(),h.delete(y.cacheKey),y.destroy()}}function w(y){o.remove(y)}function C(){o.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:M,acquireProgram:x,releaseProgram:E,releaseShaderCache:w,programs:l,dispose:C}}function u1(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function d1(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Xp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function qp(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,m,_,g,p){let b=i[e];return b===void 0?(b={id:d.id,object:d,geometry:f,material:m,materialVariant:a(d),groupOrder:_,renderOrder:d.renderOrder,z:g,group:p},i[e]=b):(b.id=d.id,b.object=d,b.geometry=f,b.material=m,b.materialVariant=a(d),b.groupOrder=_,b.renderOrder=d.renderOrder,b.z=g,b.group=p),e++,b}function c(d,f,m,_,g,p){let b=o(d,f,m,_,g,p);m.transmission>0?n.push(b):m.transparent===!0?s.push(b):t.push(b)}function l(d,f,m,_,g,p){let b=o(d,f,m,_,g,p);m.transmission>0?n.unshift(b):m.transparent===!0?s.unshift(b):t.unshift(b)}function h(d,f,m){t.length>1&&t.sort(d||d1),n.length>1&&n.sort(f||Xp),s.length>1&&s.sort(f||Xp),m&&(t.reverse(),n.reverse(),s.reverse())}function u(){for(let d=e,f=i.length;d<f;d++){let m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:u,sort:h}}function f1(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new qp,i.set(n,[a])):s>=r.length?(a=new qp,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function p1(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new z,color:new ke};break;case"SpotLight":t={position:new z,direction:new z,color:new ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new ke,groundColor:new ke};break;case"RectAreaLight":t={color:new ke,position:new z,halfWidth:new z,halfHeight:new z};break}return i[e.id]=t,t}}}function m1(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var g1=0;function x1(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function _1(i){let e=new p1,t=m1(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new z);let s=new z,r=new nt,a=new nt;function o(l){let h=0,u=0,d=0;for(let A=0;A<9;A++)n.probe[A].set(0,0,0);let f=0,m=0,_=0,g=0,p=0,b=0,M=0,x=0,E=0,w=0,C=0;l.sort(x1);for(let A=0,D=l.length;A<D;A++){let T=l[A],I=T.color,B=T.intensity,F=T.distance,U=null;if(T.shadow&&T.shadow.map&&(T.shadow.map.texture.format===ts?U=T.shadow.map.texture:U=T.shadow.map.depthTexture||T.shadow.map.texture),T.isAmbientLight)h+=I.r*B,u+=I.g*B,d+=I.b*B;else if(T.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(T.sh.coefficients[X],B);C++}else if(T.isDirectionalLight){let X=e.get(T);if(X.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){let H=T.shadow,G=t.get(T);G.shadowIntensity=H.intensity,G.shadowBias=H.bias,G.shadowNormalBias=H.normalBias,G.shadowRadius=H.radius,G.shadowMapSize=H.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=U,n.directionalShadowMatrix[f]=T.shadow.matrix,b++}n.directional[f]=X,f++}else if(T.isSpotLight){let X=e.get(T);X.position.setFromMatrixPosition(T.matrixWorld),X.color.copy(I).multiplyScalar(B),X.distance=F,X.coneCos=Math.cos(T.angle),X.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),X.decay=T.decay,n.spot[_]=X;let H=T.shadow;if(T.map&&(n.spotLightMap[E]=T.map,E++,H.updateMatrices(T),T.castShadow&&w++),n.spotLightMatrix[_]=H.matrix,T.castShadow){let G=t.get(T);G.shadowIntensity=H.intensity,G.shadowBias=H.bias,G.shadowNormalBias=H.normalBias,G.shadowRadius=H.radius,G.shadowMapSize=H.mapSize,n.spotShadow[_]=G,n.spotShadowMap[_]=U,x++}_++}else if(T.isRectAreaLight){let X=e.get(T);X.color.copy(I).multiplyScalar(B),X.halfWidth.set(T.width*.5,0,0),X.halfHeight.set(0,T.height*.5,0),n.rectArea[g]=X,g++}else if(T.isPointLight){let X=e.get(T);if(X.color.copy(T.color).multiplyScalar(T.intensity),X.distance=T.distance,X.decay=T.decay,T.castShadow){let H=T.shadow,G=t.get(T);G.shadowIntensity=H.intensity,G.shadowBias=H.bias,G.shadowNormalBias=H.normalBias,G.shadowRadius=H.radius,G.shadowMapSize=H.mapSize,G.shadowCameraNear=H.camera.near,G.shadowCameraFar=H.camera.far,n.pointShadow[m]=G,n.pointShadowMap[m]=U,n.pointShadowMatrix[m]=T.shadow.matrix,M++}n.point[m]=X,m++}else if(T.isHemisphereLight){let X=e.get(T);X.skyColor.copy(T.color).multiplyScalar(B),X.groundColor.copy(T.groundColor).multiplyScalar(B),n.hemi[p]=X,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ee.LTC_FLOAT_1,n.rectAreaLTC2=Ee.LTC_FLOAT_2):(n.rectAreaLTC1=Ee.LTC_HALF_1,n.rectAreaLTC2=Ee.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let y=n.hash;(y.directionalLength!==f||y.pointLength!==m||y.spotLength!==_||y.rectAreaLength!==g||y.hemiLength!==p||y.numDirectionalShadows!==b||y.numPointShadows!==M||y.numSpotShadows!==x||y.numSpotMaps!==E||y.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=x+E-w,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=C,y.directionalLength=f,y.pointLength=m,y.spotLength=_,y.rectAreaLength=g,y.hemiLength=p,y.numDirectionalShadows=b,y.numPointShadows=M,y.numSpotShadows=x,y.numSpotMaps=E,y.numLightProbes=C,n.version=g1++)}function c(l,h){let u=0,d=0,f=0,m=0,_=0,g=h.matrixWorldInverse;for(let p=0,b=l.length;p<b;p++){let M=l[p];if(M.isDirectionalLight){let x=n.directional[u];x.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),u++}else if(M.isSpotLight){let x=n.spot[f];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),f++}else if(M.isRectAreaLight){let x=n.rectArea[m];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(g),a.identity(),r.copy(M.matrixWorld),r.premultiply(g),a.extractRotation(r),x.halfWidth.set(M.width*.5,0,0),x.halfHeight.set(0,M.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),m++}else if(M.isPointLight){let x=n.point[d];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(g),d++}else if(M.isHemisphereLight){let x=n.hemi[_];x.direction.setFromMatrixPosition(M.matrixWorld),x.direction.transformDirection(g),_++}}}return{setup:o,setupView:c,state:n}}function Zp(i){let e=new _1(i),t=[],n=[],s=[];function r(d){u.camera=d,t.length=0,n.length=0,s.length=0}function a(d){t.push(d)}function o(d){n.push(d)}function c(d){s.push(d)}function l(){e.setup(t)}function h(d){e.setupView(t,d)}let u={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function y1(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new Zp(i),e.set(s,[o])):r>=a.length?(o=new Zp(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var v1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,M1=`uniform sampler2D shadow_pass;
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
}`,S1=[new z(1,0,0),new z(-1,0,0),new z(0,1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1)],b1=[new z(0,-1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1),new z(0,-1,0),new z(0,-1,0)],Yp=new nt,Ka=new z,Au=new z;function E1(i,e,t){let n=new dr,s=new de,r=new de,a=new ot,o=new rc,c=new ac,l={},h=t.maxTextureSize,u={[Mi]:Qt,[Qt]:Mi,[en]:en},d=new Ft({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new de},radius:{value:4}},vertexShader:v1,fragmentShader:M1}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let m=new Et;m.setAttribute("position",new Mt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new pt(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ka;let p=this.type;this.render=function(w,C,y){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;this.type===Vf&&(Xe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=ka);let A=i.getRenderTarget(),D=i.getActiveCubeFace(),T=i.getActiveMipmapLevel(),I=i.state;I.setBlending(ii),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);let B=p!==this.type;B&&C.traverse(function(F){F.material&&(Array.isArray(F.material)?F.material.forEach(U=>U.needsUpdate=!0):F.material.needsUpdate=!0)});for(let F=0,U=w.length;F<U;F++){let X=w[F],H=X.shadow;if(H===void 0){Xe("WebGLShadowMap:",X,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);let G=H.getFrameExtents();s.multiply(G),r.copy(H.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/G.x),s.x=r.x*G.x,H.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/G.y),s.y=r.y*G.y,H.mapSize.y=r.y));let K=i.state.buffers.depth.getReversed();if(H.camera._reversedDepth=K,H.map===null||B===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===yr){if(X.isPointLight){Xe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new jt(s.x,s.y,{format:ts,type:ri,minFilter:St,magFilter:St,generateMipmaps:!1}),H.map.texture.name=X.name+".shadowMap",H.map.depthTexture=new Ei(s.x,s.y,An),H.map.depthTexture.name=X.name+".shadowMapDepth",H.map.depthTexture.format=jn,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=At,H.map.depthTexture.magFilter=At}else X.isPointLight?(H.map=new ul(s.x),H.map.depthTexture=new Ko(s.x,Bn)):(H.map=new jt(s.x,s.y),H.map.depthTexture=new Ei(s.x,s.y,Bn)),H.map.depthTexture.name=X.name+".shadowMap",H.map.depthTexture.format=jn,this.type===ka?(H.map.depthTexture.compareFunction=K?ol:al,H.map.depthTexture.minFilter=St,H.map.depthTexture.magFilter=St):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=At,H.map.depthTexture.magFilter=At);H.camera.updateProjectionMatrix()}let ie=H.map.isWebGLCubeRenderTarget?6:1;for(let he=0;he<ie;he++){if(H.map.isWebGLCubeRenderTarget)i.setRenderTarget(H.map,he),i.clear();else{he===0&&(i.setRenderTarget(H.map),i.clear());let pe=H.getViewport(he);a.set(r.x*pe.x,r.y*pe.y,r.x*pe.z,r.y*pe.w),I.viewport(a)}if(X.isPointLight){let pe=H.camera,ve=H.matrix,Ge=X.distance||pe.far;Ge!==pe.far&&(pe.far=Ge,pe.updateProjectionMatrix()),Ka.setFromMatrixPosition(X.matrixWorld),pe.position.copy(Ka),Au.copy(pe.position),Au.add(S1[he]),pe.up.copy(b1[he]),pe.lookAt(Au),pe.updateMatrixWorld(),ve.makeTranslation(-Ka.x,-Ka.y,-Ka.z),Yp.multiplyMatrices(pe.projectionMatrix,pe.matrixWorldInverse),H._frustum.setFromProjectionMatrix(Yp,pe.coordinateSystem,pe.reversedDepth)}else H.updateMatrices(X);n=H.getFrustum(),x(C,y,H.camera,X,this.type)}H.isPointLightShadow!==!0&&this.type===yr&&b(H,y),H.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(A,D,T)};function b(w,C){let y=e.update(_);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new jt(s.x,s.y,{format:ts,type:ri})),d.uniforms.shadow_pass.value=w.map.depthTexture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(C,null,y,d,_,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(C,null,y,f,_,null)}function M(w,C,y,A){let D=null,T=y.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(T!==void 0)D=T;else if(D=y.isPointLight===!0?c:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let I=D.uuid,B=C.uuid,F=l[I];F===void 0&&(F={},l[I]=F);let U=F[B];U===void 0&&(U=D.clone(),F[B]=U,C.addEventListener("dispose",E)),D=U}if(D.visible=C.visible,D.wireframe=C.wireframe,A===yr?D.side=C.shadowSide!==null?C.shadowSide:C.side:D.side=C.shadowSide!==null?C.shadowSide:u[C.side],D.alphaMap=C.alphaMap,D.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,D.map=C.map,D.clipShadows=C.clipShadows,D.clippingPlanes=C.clippingPlanes,D.clipIntersection=C.clipIntersection,D.displacementMap=C.displacementMap,D.displacementScale=C.displacementScale,D.displacementBias=C.displacementBias,D.wireframeLinewidth=C.wireframeLinewidth,D.linewidth=C.linewidth,y.isPointLight===!0&&D.isMeshDistanceMaterial===!0){let I=i.properties.get(D);I.light=y}return D}function x(w,C,y,A,D){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&D===yr)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,w.matrixWorld);let B=e.update(w),F=w.material;if(Array.isArray(F)){let U=B.groups;for(let X=0,H=U.length;X<H;X++){let G=U[X],K=F[G.materialIndex];if(K&&K.visible){let ie=M(w,K,A,D);w.onBeforeShadow(i,w,C,y,B,ie,G),i.renderBufferDirect(y,null,B,ie,w,G),w.onAfterShadow(i,w,C,y,B,ie,G)}}}else if(F.visible){let U=M(w,F,A,D);w.onBeforeShadow(i,w,C,y,B,U,null),i.renderBufferDirect(y,null,B,U,w,null),w.onAfterShadow(i,w,C,y,B,U,null)}}let I=w.children;for(let B=0,F=I.length;B<F;B++)x(I[B],C,y,A,D)}function E(w){w.target.removeEventListener("dispose",E);for(let y in l){let A=l[y],D=w.target.uuid;D in A&&(A[D].dispose(),delete A[D])}}}function w1(i,e){function t(){let Y=!1,Te=new ot,ge=null,Re=new ot(0,0,0,0);return{setMask:function(Le){ge!==Le&&!Y&&(i.colorMask(Le,Le,Le,Le),ge=Le)},setLocked:function(Le){Y=Le},setClear:function(Le,ye,Ve,Oe,wt){wt===!0&&(Le*=Oe,ye*=Oe,Ve*=Oe),Te.set(Le,ye,Ve,Oe),Re.equals(Te)===!1&&(i.clearColor(Le,ye,Ve,Oe),Re.copy(Te))},reset:function(){Y=!1,ge=null,Re.set(-1,0,0,0)}}}function n(){let Y=!1,Te=!1,ge=null,Re=null,Le=null;return{setReversed:function(ye){if(Te!==ye){let Ve=e.get("EXT_clip_control");ye?Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.ZERO_TO_ONE_EXT):Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.NEGATIVE_ONE_TO_ONE_EXT),Te=ye;let Oe=Le;Le=null,this.setClear(Oe)}},getReversed:function(){return Te},setTest:function(ye){ye?k(i.DEPTH_TEST):O(i.DEPTH_TEST)},setMask:function(ye){ge!==ye&&!Y&&(i.depthMask(ye),ge=ye)},setFunc:function(ye){if(Te&&(ye=yp[ye]),Re!==ye){switch(ye){case zo:i.depthFunc(i.NEVER);break;case ko:i.depthFunc(i.ALWAYS);break;case Vo:i.depthFunc(i.LESS);break;case gs:i.depthFunc(i.LEQUAL);break;case Ho:i.depthFunc(i.EQUAL);break;case Go:i.depthFunc(i.GEQUAL);break;case Wo:i.depthFunc(i.GREATER);break;case Xo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Re=ye}},setLocked:function(ye){Y=ye},setClear:function(ye){Le!==ye&&(Le=ye,Te&&(ye=1-ye),i.clearDepth(ye))},reset:function(){Y=!1,ge=null,Re=null,Le=null,Te=!1}}}function s(){let Y=!1,Te=null,ge=null,Re=null,Le=null,ye=null,Ve=null,Oe=null,wt=null;return{setTest:function(yt){Y||(yt?k(i.STENCIL_TEST):O(i.STENCIL_TEST))},setMask:function(yt){Te!==yt&&!Y&&(i.stencilMask(yt),Te=yt)},setFunc:function(yt,qn,Zn){(ge!==yt||Re!==qn||Le!==Zn)&&(i.stencilFunc(yt,qn,Zn),ge=yt,Re=qn,Le=Zn)},setOp:function(yt,qn,Zn){(ye!==yt||Ve!==qn||Oe!==Zn)&&(i.stencilOp(yt,qn,Zn),ye=yt,Ve=qn,Oe=Zn)},setLocked:function(yt){Y=yt},setClear:function(yt){wt!==yt&&(i.clearStencil(yt),wt=yt)},reset:function(){Y=!1,Te=null,ge=null,Re=null,Le=null,ye=null,Ve=null,Oe=null,wt=null}}}let r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap,h={},u={},d={},f=new WeakMap,m=[],_=null,g=!1,p=null,b=null,M=null,x=null,E=null,w=null,C=null,y=new ke(0,0,0),A=0,D=!1,T=null,I=null,B=null,F=null,U=null,X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,G=0,K=i.getParameter(i.VERSION);K.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(K)[1]),H=G>=1):K.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),H=G>=2);let ie=null,he={},pe=i.getParameter(i.SCISSOR_BOX),ve=i.getParameter(i.VIEWPORT),Ge=new ot().fromArray(pe),Ue=new ot().fromArray(ve);function ee(Y,Te,ge,Re){let Le=new Uint8Array(4),ye=i.createTexture();i.bindTexture(Y,ye),i.texParameteri(Y,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(Y,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ve=0;Ve<ge;Ve++)Y===i.TEXTURE_3D||Y===i.TEXTURE_2D_ARRAY?i.texImage3D(Te,0,i.RGBA,1,1,Re,0,i.RGBA,i.UNSIGNED_BYTE,Le):i.texImage2D(Te+Ve,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Le);return ye}let W={};W[i.TEXTURE_2D]=ee(i.TEXTURE_2D,i.TEXTURE_2D,1),W[i.TEXTURE_CUBE_MAP]=ee(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),W[i.TEXTURE_2D_ARRAY]=ee(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),W[i.TEXTURE_3D]=ee(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),k(i.DEPTH_TEST),a.setFunc(gs),Q(!1),ne(qh),k(i.CULL_FACE),Z(ii);function k(Y){h[Y]!==!0&&(i.enable(Y),h[Y]=!0)}function O(Y){h[Y]!==!1&&(i.disable(Y),h[Y]=!1)}function N(Y,Te){return d[Y]!==Te?(i.bindFramebuffer(Y,Te),d[Y]=Te,Y===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=Te),Y===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=Te),!0):!1}function q(Y,Te){let ge=m,Re=!1;if(Y){ge=f.get(Te),ge===void 0&&(ge=[],f.set(Te,ge));let Le=Y.textures;if(ge.length!==Le.length||ge[0]!==i.COLOR_ATTACHMENT0){for(let ye=0,Ve=Le.length;ye<Ve;ye++)ge[ye]=i.COLOR_ATTACHMENT0+ye;ge.length=Le.length,Re=!0}}else ge[0]!==i.BACK&&(ge[0]=i.BACK,Re=!0);Re&&i.drawBuffers(ge)}function oe(Y){return _!==Y?(i.useProgram(Y),_=Y,!0):!1}let fe={[Xi]:i.FUNC_ADD,[Gf]:i.FUNC_SUBTRACT,[Wf]:i.FUNC_REVERSE_SUBTRACT};fe[Xf]=i.MIN,fe[qf]=i.MAX;let P={[Zf]:i.ZERO,[Yf]:i.ONE,[Jf]:i.SRC_COLOR,[Oo]:i.SRC_ALPHA,[tp]:i.SRC_ALPHA_SATURATE,[Qf]:i.DST_COLOR,[Kf]:i.DST_ALPHA,[$f]:i.ONE_MINUS_SRC_COLOR,[Bo]:i.ONE_MINUS_SRC_ALPHA,[ep]:i.ONE_MINUS_DST_COLOR,[jf]:i.ONE_MINUS_DST_ALPHA,[np]:i.CONSTANT_COLOR,[ip]:i.ONE_MINUS_CONSTANT_COLOR,[sp]:i.CONSTANT_ALPHA,[rp]:i.ONE_MINUS_CONSTANT_ALPHA};function Z(Y,Te,ge,Re,Le,ye,Ve,Oe,wt,yt){if(Y===ii){g===!0&&(O(i.BLEND),g=!1);return}if(g===!1&&(k(i.BLEND),g=!0),Y!==Hf){if(Y!==p||yt!==D){if((b!==Xi||E!==Xi)&&(i.blendEquation(i.FUNC_ADD),b=Xi,E=Xi),yt)switch(Y){case ms:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Zh:i.blendFunc(i.ONE,i.ONE);break;case Yh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Jh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ye("WebGLState: Invalid blending: ",Y);break}else switch(Y){case ms:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Zh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Yh:Ye("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Jh:Ye("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ye("WebGLState: Invalid blending: ",Y);break}M=null,x=null,w=null,C=null,y.set(0,0,0),A=0,p=Y,D=yt}return}Le=Le||Te,ye=ye||ge,Ve=Ve||Re,(Te!==b||Le!==E)&&(i.blendEquationSeparate(fe[Te],fe[Le]),b=Te,E=Le),(ge!==M||Re!==x||ye!==w||Ve!==C)&&(i.blendFuncSeparate(P[ge],P[Re],P[ye],P[Ve]),M=ge,x=Re,w=ye,C=Ve),(Oe.equals(y)===!1||wt!==A)&&(i.blendColor(Oe.r,Oe.g,Oe.b,wt),y.copy(Oe),A=wt),p=Y,D=!1}function V(Y,Te){Y.side===en?O(i.CULL_FACE):k(i.CULL_FACE);let ge=Y.side===Qt;Te&&(ge=!ge),Q(ge),Y.blending===ms&&Y.transparent===!1?Z(ii):Z(Y.blending,Y.blendEquation,Y.blendSrc,Y.blendDst,Y.blendEquationAlpha,Y.blendSrcAlpha,Y.blendDstAlpha,Y.blendColor,Y.blendAlpha,Y.premultipliedAlpha),a.setFunc(Y.depthFunc),a.setTest(Y.depthTest),a.setMask(Y.depthWrite),r.setMask(Y.colorWrite);let Re=Y.stencilWrite;o.setTest(Re),Re&&(o.setMask(Y.stencilWriteMask),o.setFunc(Y.stencilFunc,Y.stencilRef,Y.stencilFuncMask),o.setOp(Y.stencilFail,Y.stencilZFail,Y.stencilZPass)),xe(Y.polygonOffset,Y.polygonOffsetFactor,Y.polygonOffsetUnits),Y.alphaToCoverage===!0?k(i.SAMPLE_ALPHA_TO_COVERAGE):O(i.SAMPLE_ALPHA_TO_COVERAGE)}function Q(Y){T!==Y&&(Y?i.frontFace(i.CW):i.frontFace(i.CCW),T=Y)}function ne(Y){Y!==zf?(k(i.CULL_FACE),Y!==I&&(Y===qh?i.cullFace(i.BACK):Y===kf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):O(i.CULL_FACE),I=Y}function le(Y){Y!==B&&(H&&i.lineWidth(Y),B=Y)}function xe(Y,Te,ge){Y?(k(i.POLYGON_OFFSET_FILL),(F!==Te||U!==ge)&&(F=Te,U=ge,a.getReversed()&&(Te=-Te),i.polygonOffset(Te,ge))):O(i.POLYGON_OFFSET_FILL)}function _e(Y){Y?k(i.SCISSOR_TEST):O(i.SCISSOR_TEST)}function J(Y){Y===void 0&&(Y=i.TEXTURE0+X-1),ie!==Y&&(i.activeTexture(Y),ie=Y)}function S(Y,Te,ge){ge===void 0&&(ie===null?ge=i.TEXTURE0+X-1:ge=ie);let Re=he[ge];Re===void 0&&(Re={type:void 0,texture:void 0},he[ge]=Re),(Re.type!==Y||Re.texture!==Te)&&(ie!==ge&&(i.activeTexture(ge),ie=ge),i.bindTexture(Y,Te||W[Y]),Re.type=Y,Re.texture=Te)}function Pe(){let Y=he[ie];Y!==void 0&&Y.type!==void 0&&(i.bindTexture(Y.type,null),Y.type=void 0,Y.texture=void 0)}function Fe(){try{i.compressedTexImage2D(...arguments)}catch(Y){Ye("WebGLState:",Y)}}function L(){try{i.compressedTexImage3D(...arguments)}catch(Y){Ye("WebGLState:",Y)}}function v(){try{i.texSubImage2D(...arguments)}catch(Y){Ye("WebGLState:",Y)}}function $(){try{i.texSubImage3D(...arguments)}catch(Y){Ye("WebGLState:",Y)}}function te(){try{i.compressedTexSubImage2D(...arguments)}catch(Y){Ye("WebGLState:",Y)}}function ce(){try{i.compressedTexSubImage3D(...arguments)}catch(Y){Ye("WebGLState:",Y)}}function Me(){try{i.texStorage2D(...arguments)}catch(Y){Ye("WebGLState:",Y)}}function Se(){try{i.texStorage3D(...arguments)}catch(Y){Ye("WebGLState:",Y)}}function ue(){try{i.texImage2D(...arguments)}catch(Y){Ye("WebGLState:",Y)}}function me(){try{i.texImage3D(...arguments)}catch(Y){Ye("WebGLState:",Y)}}function be(Y){return u[Y]!==void 0?u[Y]:i.getParameter(Y)}function Be(Y,Te){u[Y]!==Te&&(i.pixelStorei(Y,Te),u[Y]=Te)}function Ae(Y){Ge.equals(Y)===!1&&(i.scissor(Y.x,Y.y,Y.z,Y.w),Ge.copy(Y))}function we(Y){Ue.equals(Y)===!1&&(i.viewport(Y.x,Y.y,Y.z,Y.w),Ue.copy(Y))}function Ze(Y,Te){let ge=l.get(Te);ge===void 0&&(ge=new WeakMap,l.set(Te,ge));let Re=ge.get(Y);Re===void 0&&(Re=i.getUniformBlockIndex(Te,Y.name),ge.set(Y,Re))}function Je(Y,Te){let Re=l.get(Te).get(Y);c.get(Te)!==Re&&(i.uniformBlockBinding(Te,Re,Y.__bindingPointIndex),c.set(Te,Re))}function Ke(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},ie=null,he={},d={},f=new WeakMap,m=[],_=null,g=!1,p=null,b=null,M=null,x=null,E=null,w=null,C=null,y=new ke(0,0,0),A=0,D=!1,T=null,I=null,B=null,F=null,U=null,Ge.set(0,0,i.canvas.width,i.canvas.height),Ue.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:k,disable:O,bindFramebuffer:N,drawBuffers:q,useProgram:oe,setBlending:Z,setMaterial:V,setFlipSided:Q,setCullFace:ne,setLineWidth:le,setPolygonOffset:xe,setScissorTest:_e,activeTexture:J,bindTexture:S,unbindTexture:Pe,compressedTexImage2D:Fe,compressedTexImage3D:L,texImage2D:ue,texImage3D:me,pixelStorei:Be,getParameter:be,updateUBOMapping:Ze,uniformBlockBinding:Je,texStorage2D:Me,texStorage3D:Se,texSubImage2D:v,texSubImage3D:$,compressedTexSubImage2D:te,compressedTexSubImage3D:ce,scissor:Ae,viewport:we,reset:Ke}}function T1(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new de,h=new WeakMap,u=new Set,d,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(L,v){return m?new OffscreenCanvas(L,v):ha("canvas")}function g(L,v,$){let te=1,ce=Fe(L);if((ce.width>$||ce.height>$)&&(te=$/Math.max(ce.width,ce.height)),te<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){let Me=Math.floor(te*ce.width),Se=Math.floor(te*ce.height);d===void 0&&(d=_(Me,Se));let ue=v?_(Me,Se):d;return ue.width=Me,ue.height=Se,ue.getContext("2d").drawImage(L,0,0,Me,Se),Xe("WebGLRenderer: Texture has been resized from ("+ce.width+"x"+ce.height+") to ("+Me+"x"+Se+")."),ue}else return"data"in L&&Xe("WebGLRenderer: Image in DataTexture is too big ("+ce.width+"x"+ce.height+")."),L;return L}function p(L){return L.generateMipmaps}function b(L){i.generateMipmap(L)}function M(L){return L.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?i.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(L,v,$,te,ce,Me=!1){if(L!==null){if(i[L]!==void 0)return i[L];Xe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let Se;te&&(Se=e.get("EXT_texture_norm16"),Se||Xe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ue=v;if(v===i.RED&&($===i.FLOAT&&(ue=i.R32F),$===i.HALF_FLOAT&&(ue=i.R16F),$===i.UNSIGNED_BYTE&&(ue=i.R8),$===i.UNSIGNED_SHORT&&Se&&(ue=Se.R16_EXT),$===i.SHORT&&Se&&(ue=Se.R16_SNORM_EXT)),v===i.RED_INTEGER&&($===i.UNSIGNED_BYTE&&(ue=i.R8UI),$===i.UNSIGNED_SHORT&&(ue=i.R16UI),$===i.UNSIGNED_INT&&(ue=i.R32UI),$===i.BYTE&&(ue=i.R8I),$===i.SHORT&&(ue=i.R16I),$===i.INT&&(ue=i.R32I)),v===i.RG&&($===i.FLOAT&&(ue=i.RG32F),$===i.HALF_FLOAT&&(ue=i.RG16F),$===i.UNSIGNED_BYTE&&(ue=i.RG8),$===i.UNSIGNED_SHORT&&Se&&(ue=Se.RG16_EXT),$===i.SHORT&&Se&&(ue=Se.RG16_SNORM_EXT)),v===i.RG_INTEGER&&($===i.UNSIGNED_BYTE&&(ue=i.RG8UI),$===i.UNSIGNED_SHORT&&(ue=i.RG16UI),$===i.UNSIGNED_INT&&(ue=i.RG32UI),$===i.BYTE&&(ue=i.RG8I),$===i.SHORT&&(ue=i.RG16I),$===i.INT&&(ue=i.RG32I)),v===i.RGB_INTEGER&&($===i.UNSIGNED_BYTE&&(ue=i.RGB8UI),$===i.UNSIGNED_SHORT&&(ue=i.RGB16UI),$===i.UNSIGNED_INT&&(ue=i.RGB32UI),$===i.BYTE&&(ue=i.RGB8I),$===i.SHORT&&(ue=i.RGB16I),$===i.INT&&(ue=i.RGB32I)),v===i.RGBA_INTEGER&&($===i.UNSIGNED_BYTE&&(ue=i.RGBA8UI),$===i.UNSIGNED_SHORT&&(ue=i.RGBA16UI),$===i.UNSIGNED_INT&&(ue=i.RGBA32UI),$===i.BYTE&&(ue=i.RGBA8I),$===i.SHORT&&(ue=i.RGBA16I),$===i.INT&&(ue=i.RGBA32I)),v===i.RGB&&($===i.UNSIGNED_SHORT&&Se&&(ue=Se.RGB16_EXT),$===i.SHORT&&Se&&(ue=Se.RGB16_SNORM_EXT),$===i.UNSIGNED_INT_5_9_9_9_REV&&(ue=i.RGB9_E5),$===i.UNSIGNED_INT_10F_11F_11F_REV&&(ue=i.R11F_G11F_B10F)),v===i.RGBA){let me=Me?la:st.getTransfer(ce);$===i.FLOAT&&(ue=i.RGBA32F),$===i.HALF_FLOAT&&(ue=i.RGBA16F),$===i.UNSIGNED_BYTE&&(ue=me===ht?i.SRGB8_ALPHA8:i.RGBA8),$===i.UNSIGNED_SHORT&&Se&&(ue=Se.RGBA16_EXT),$===i.SHORT&&Se&&(ue=Se.RGBA16_SNORM_EXT),$===i.UNSIGNED_SHORT_4_4_4_4&&(ue=i.RGBA4),$===i.UNSIGNED_SHORT_5_5_5_1&&(ue=i.RGB5_A1)}return(ue===i.R16F||ue===i.R32F||ue===i.RG16F||ue===i.RG32F||ue===i.RGBA16F||ue===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ue}function E(L,v){let $;return L?v===null||v===Bn||v===Sr?$=i.DEPTH24_STENCIL8:v===An?$=i.DEPTH32F_STENCIL8:v===Mr&&($=i.DEPTH24_STENCIL8,Xe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Bn||v===Sr?$=i.DEPTH_COMPONENT24:v===An?$=i.DEPTH_COMPONENT32F:v===Mr&&($=i.DEPTH_COMPONENT16),$}function w(L,v){return p(L)===!0||L.isFramebufferTexture&&L.minFilter!==At&&L.minFilter!==St?Math.log2(Math.max(v.width,v.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?v.mipmaps.length:1}function C(L){let v=L.target;v.removeEventListener("dispose",C),A(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&u.delete(v)}function y(L){let v=L.target;v.removeEventListener("dispose",y),T(v)}function A(L){let v=n.get(L);if(v.__webglInit===void 0)return;let $=L.source,te=f.get($);if(te){let ce=te[v.__cacheKey];ce.usedTimes--,ce.usedTimes===0&&D(L),Object.keys(te).length===0&&f.delete($)}n.remove(L)}function D(L){let v=n.get(L);i.deleteTexture(v.__webglTexture);let $=L.source,te=f.get($);delete te[v.__cacheKey],a.memory.textures--}function T(L){let v=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(v.__webglFramebuffer[te]))for(let ce=0;ce<v.__webglFramebuffer[te].length;ce++)i.deleteFramebuffer(v.__webglFramebuffer[te][ce]);else i.deleteFramebuffer(v.__webglFramebuffer[te]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[te])}else{if(Array.isArray(v.__webglFramebuffer))for(let te=0;te<v.__webglFramebuffer.length;te++)i.deleteFramebuffer(v.__webglFramebuffer[te]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let te=0;te<v.__webglColorRenderbuffer.length;te++)v.__webglColorRenderbuffer[te]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[te]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let $=L.textures;for(let te=0,ce=$.length;te<ce;te++){let Me=n.get($[te]);Me.__webglTexture&&(i.deleteTexture(Me.__webglTexture),a.memory.textures--),n.remove($[te])}n.remove(L)}let I=0;function B(){I=0}function F(){return I}function U(L){I=L}function X(){let L=I;return L>=s.maxTextures&&Xe("WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+s.maxTextures),I+=1,L}function H(L){let v=[];return v.push(L.wrapS),v.push(L.wrapT),v.push(L.wrapR||0),v.push(L.magFilter),v.push(L.minFilter),v.push(L.anisotropy),v.push(L.internalFormat),v.push(L.format),v.push(L.type),v.push(L.generateMipmaps),v.push(L.premultiplyAlpha),v.push(L.flipY),v.push(L.unpackAlignment),v.push(L.colorSpace),v.join()}function G(L,v){let $=n.get(L);if(L.isVideoTexture&&S(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&$.__version!==L.version){let te=L.image;if(te===null)Xe("WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)Xe("WebGLRenderer: Texture marked for update but image is incomplete");else{O($,L,v);return}}else L.isExternalTexture&&($.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,$.__webglTexture,i.TEXTURE0+v)}function K(L,v){let $=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&$.__version!==L.version){O($,L,v);return}else L.isExternalTexture&&($.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,$.__webglTexture,i.TEXTURE0+v)}function ie(L,v){let $=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&$.__version!==L.version){O($,L,v);return}t.bindTexture(i.TEXTURE_3D,$.__webglTexture,i.TEXTURE0+v)}function he(L,v){let $=n.get(L);if(L.isCubeDepthTexture!==!0&&L.version>0&&$.__version!==L.version){N($,L,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture,i.TEXTURE0+v)}let pe={[En]:i.REPEAT,[rn]:i.CLAMP_TO_EDGE,[qi]:i.MIRRORED_REPEAT},ve={[At]:i.NEAREST,[Mc]:i.NEAREST_MIPMAP_NEAREST,[bs]:i.NEAREST_MIPMAP_LINEAR,[St]:i.LINEAR,[vr]:i.LINEAR_MIPMAP_NEAREST,[si]:i.LINEAR_MIPMAP_LINEAR},Ge={[hp]:i.NEVER,[mp]:i.ALWAYS,[up]:i.LESS,[al]:i.LEQUAL,[dp]:i.EQUAL,[ol]:i.GEQUAL,[fp]:i.GREATER,[pp]:i.NOTEQUAL};function Ue(L,v){if(v.type===An&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===St||v.magFilter===vr||v.magFilter===bs||v.magFilter===si||v.minFilter===St||v.minFilter===vr||v.minFilter===bs||v.minFilter===si)&&Xe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(L,i.TEXTURE_WRAP_S,pe[v.wrapS]),i.texParameteri(L,i.TEXTURE_WRAP_T,pe[v.wrapT]),(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)&&i.texParameteri(L,i.TEXTURE_WRAP_R,pe[v.wrapR]),i.texParameteri(L,i.TEXTURE_MAG_FILTER,ve[v.magFilter]),i.texParameteri(L,i.TEXTURE_MIN_FILTER,ve[v.minFilter]),v.compareFunction&&(i.texParameteri(L,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(L,i.TEXTURE_COMPARE_FUNC,Ge[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===At||v.minFilter!==bs&&v.minFilter!==si||v.type===An&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let $=e.get("EXT_texture_filter_anisotropic");i.texParameterf(L,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function ee(L,v){let $=!1;L.__webglInit===void 0&&(L.__webglInit=!0,v.addEventListener("dispose",C));let te=v.source,ce=f.get(te);ce===void 0&&(ce={},f.set(te,ce));let Me=H(v);if(Me!==L.__cacheKey){ce[Me]===void 0&&(ce[Me]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,$=!0),ce[Me].usedTimes++;let Se=ce[L.__cacheKey];Se!==void 0&&(ce[L.__cacheKey].usedTimes--,Se.usedTimes===0&&D(v)),L.__cacheKey=Me,L.__webglTexture=ce[Me].texture}return $}function W(L,v,$){return Math.floor(Math.floor(L/$)/v)}function k(L,v,$,te){let Me=L.updateRanges;if(Me.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,$,te,v.data);else{Me.sort((Be,Ae)=>Be.start-Ae.start);let Se=0;for(let Be=1;Be<Me.length;Be++){let Ae=Me[Se],we=Me[Be],Ze=Ae.start+Ae.count,Je=W(we.start,v.width,4),Ke=W(Ae.start,v.width,4);we.start<=Ze+1&&Je===Ke&&W(we.start+we.count-1,v.width,4)===Je?Ae.count=Math.max(Ae.count,we.start+we.count-Ae.start):(++Se,Me[Se]=we)}Me.length=Se+1;let ue=t.getParameter(i.UNPACK_ROW_LENGTH),me=t.getParameter(i.UNPACK_SKIP_PIXELS),be=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let Be=0,Ae=Me.length;Be<Ae;Be++){let we=Me[Be],Ze=Math.floor(we.start/4),Je=Math.ceil(we.count/4),Ke=Ze%v.width,Y=Math.floor(Ze/v.width),Te=Je,ge=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ke),t.pixelStorei(i.UNPACK_SKIP_ROWS,Y),t.texSubImage2D(i.TEXTURE_2D,0,Ke,Y,Te,ge,$,te,v.data)}L.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,ue),t.pixelStorei(i.UNPACK_SKIP_PIXELS,me),t.pixelStorei(i.UNPACK_SKIP_ROWS,be)}}function O(L,v,$){let te=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(te=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(te=i.TEXTURE_3D);let ce=ee(L,v),Me=v.source;t.bindTexture(te,L.__webglTexture,i.TEXTURE0+$);let Se=n.get(Me);if(Me.version!==Se.__version||ce===!0){if(t.activeTexture(i.TEXTURE0+$),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let ge=st.getPrimaries(st.workingColorSpace),Re=v.colorSpace===zn?null:st.getPrimaries(v.colorSpace),Le=v.colorSpace===zn||ge===Re?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le)}t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let me=g(v.image,!1,s.maxTextureSize);me=Pe(v,me);let be=r.convert(v.format,v.colorSpace),Be=r.convert(v.type),Ae=x(v.internalFormat,be,Be,v.normalized,v.colorSpace,v.isVideoTexture);Ue(te,v);let we,Ze=v.mipmaps,Je=v.isVideoTexture!==!0,Ke=Se.__version===void 0||ce===!0,Y=Me.dataReady,Te=w(v,me);if(v.isDepthTexture)Ae=E(v.format===es,v.type),Ke&&(Je?t.texStorage2D(i.TEXTURE_2D,1,Ae,me.width,me.height):t.texImage2D(i.TEXTURE_2D,0,Ae,me.width,me.height,0,be,Be,null));else if(v.isDataTexture)if(Ze.length>0){Je&&Ke&&t.texStorage2D(i.TEXTURE_2D,Te,Ae,Ze[0].width,Ze[0].height);for(let ge=0,Re=Ze.length;ge<Re;ge++)we=Ze[ge],Je?Y&&t.texSubImage2D(i.TEXTURE_2D,ge,0,0,we.width,we.height,be,Be,we.data):t.texImage2D(i.TEXTURE_2D,ge,Ae,we.width,we.height,0,be,Be,we.data);v.generateMipmaps=!1}else Je?(Ke&&t.texStorage2D(i.TEXTURE_2D,Te,Ae,me.width,me.height),Y&&k(v,me,be,Be)):t.texImage2D(i.TEXTURE_2D,0,Ae,me.width,me.height,0,be,Be,me.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Je&&Ke&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Te,Ae,Ze[0].width,Ze[0].height,me.depth);for(let ge=0,Re=Ze.length;ge<Re;ge++)if(we=Ze[ge],v.format!==on)if(be!==null)if(Je){if(Y)if(v.layerUpdates.size>0){let Le=gu(we.width,we.height,v.format,v.type);for(let ye of v.layerUpdates){let Ve=we.data.subarray(ye*Le/we.data.BYTES_PER_ELEMENT,(ye+1)*Le/we.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ge,0,0,ye,we.width,we.height,1,be,Ve)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ge,0,0,0,we.width,we.height,me.depth,be,we.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ge,Ae,we.width,we.height,me.depth,0,we.data,0,0);else Xe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Je?Y&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ge,0,0,0,we.width,we.height,me.depth,be,Be,we.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ge,Ae,we.width,we.height,me.depth,0,be,Be,we.data)}else{Je&&Ke&&t.texStorage2D(i.TEXTURE_2D,Te,Ae,Ze[0].width,Ze[0].height);for(let ge=0,Re=Ze.length;ge<Re;ge++)we=Ze[ge],v.format!==on?be!==null?Je?Y&&t.compressedTexSubImage2D(i.TEXTURE_2D,ge,0,0,we.width,we.height,be,we.data):t.compressedTexImage2D(i.TEXTURE_2D,ge,Ae,we.width,we.height,0,we.data):Xe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Je?Y&&t.texSubImage2D(i.TEXTURE_2D,ge,0,0,we.width,we.height,be,Be,we.data):t.texImage2D(i.TEXTURE_2D,ge,Ae,we.width,we.height,0,be,Be,we.data)}else if(v.isDataArrayTexture)if(Je){if(Ke&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Te,Ae,me.width,me.height,me.depth),Y)if(v.layerUpdates.size>0){let ge=gu(me.width,me.height,v.format,v.type);for(let Re of v.layerUpdates){let Le=me.data.subarray(Re*ge/me.data.BYTES_PER_ELEMENT,(Re+1)*ge/me.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Re,me.width,me.height,1,be,Be,Le)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,me.width,me.height,me.depth,be,Be,me.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ae,me.width,me.height,me.depth,0,be,Be,me.data);else if(v.isData3DTexture)Je?(Ke&&t.texStorage3D(i.TEXTURE_3D,Te,Ae,me.width,me.height,me.depth),Y&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,me.width,me.height,me.depth,be,Be,me.data)):t.texImage3D(i.TEXTURE_3D,0,Ae,me.width,me.height,me.depth,0,be,Be,me.data);else if(v.isFramebufferTexture){if(Ke)if(Je)t.texStorage2D(i.TEXTURE_2D,Te,Ae,me.width,me.height);else{let ge=me.width,Re=me.height;for(let Le=0;Le<Te;Le++)t.texImage2D(i.TEXTURE_2D,Le,Ae,ge,Re,0,be,Be,null),ge>>=1,Re>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){let ge=i.canvas;if(ge.hasAttribute("layoutsubtree")||ge.setAttribute("layoutsubtree","true"),me.parentNode!==ge){ge.appendChild(me),u.add(v),ge.onpaint=Re=>{let Le=Re.changedElements;for(let ye of u)Le.includes(ye.image)&&(ye.needsUpdate=!0)},ge.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,me);else{let Le=i.RGBA,ye=i.RGBA,Ve=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Le,ye,Ve,me)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ze.length>0){if(Je&&Ke){let ge=Fe(Ze[0]);t.texStorage2D(i.TEXTURE_2D,Te,Ae,ge.width,ge.height)}for(let ge=0,Re=Ze.length;ge<Re;ge++)we=Ze[ge],Je?Y&&t.texSubImage2D(i.TEXTURE_2D,ge,0,0,be,Be,we):t.texImage2D(i.TEXTURE_2D,ge,Ae,be,Be,we);v.generateMipmaps=!1}else if(Je){if(Ke){let ge=Fe(me);t.texStorage2D(i.TEXTURE_2D,Te,Ae,ge.width,ge.height)}Y&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,be,Be,me)}else t.texImage2D(i.TEXTURE_2D,0,Ae,be,Be,me);p(v)&&b(te),Se.__version=Me.version,v.onUpdate&&v.onUpdate(v)}L.__version=v.version}function N(L,v,$){if(v.image.length!==6)return;let te=ee(L,v),ce=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+$);let Me=n.get(ce);if(ce.version!==Me.__version||te===!0){t.activeTexture(i.TEXTURE0+$);let Se=st.getPrimaries(st.workingColorSpace),ue=v.colorSpace===zn?null:st.getPrimaries(v.colorSpace),me=v.colorSpace===zn||Se===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);let be=v.isCompressedTexture||v.image[0].isCompressedTexture,Be=v.image[0]&&v.image[0].isDataTexture,Ae=[];for(let ye=0;ye<6;ye++)!be&&!Be?Ae[ye]=g(v.image[ye],!0,s.maxCubemapSize):Ae[ye]=Be?v.image[ye].image:v.image[ye],Ae[ye]=Pe(v,Ae[ye]);let we=Ae[0],Ze=r.convert(v.format,v.colorSpace),Je=r.convert(v.type),Ke=x(v.internalFormat,Ze,Je,v.normalized,v.colorSpace),Y=v.isVideoTexture!==!0,Te=Me.__version===void 0||te===!0,ge=ce.dataReady,Re=w(v,we);Ue(i.TEXTURE_CUBE_MAP,v);let Le;if(be){Y&&Te&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Re,Ke,we.width,we.height);for(let ye=0;ye<6;ye++){Le=Ae[ye].mipmaps;for(let Ve=0;Ve<Le.length;Ve++){let Oe=Le[Ve];v.format!==on?Ze!==null?Y?ge&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,Ve,0,0,Oe.width,Oe.height,Ze,Oe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,Ve,Ke,Oe.width,Oe.height,0,Oe.data):Xe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Y?ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,Ve,0,0,Oe.width,Oe.height,Ze,Je,Oe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,Ve,Ke,Oe.width,Oe.height,0,Ze,Je,Oe.data)}}}else{if(Le=v.mipmaps,Y&&Te){Le.length>0&&Re++;let ye=Fe(Ae[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Re,Ke,ye.width,ye.height)}for(let ye=0;ye<6;ye++)if(Be){Y?ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,0,0,Ae[ye].width,Ae[ye].height,Ze,Je,Ae[ye].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,Ke,Ae[ye].width,Ae[ye].height,0,Ze,Je,Ae[ye].data);for(let Ve=0;Ve<Le.length;Ve++){let wt=Le[Ve].image[ye].image;Y?ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,Ve+1,0,0,wt.width,wt.height,Ze,Je,wt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,Ve+1,Ke,wt.width,wt.height,0,Ze,Je,wt.data)}}else{Y?ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,0,0,Ze,Je,Ae[ye]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,Ke,Ze,Je,Ae[ye]);for(let Ve=0;Ve<Le.length;Ve++){let Oe=Le[Ve];Y?ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,Ve+1,0,0,Ze,Je,Oe.image[ye]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,Ve+1,Ke,Ze,Je,Oe.image[ye])}}}p(v)&&b(i.TEXTURE_CUBE_MAP),Me.__version=ce.version,v.onUpdate&&v.onUpdate(v)}L.__version=v.version}function q(L,v,$,te,ce,Me){let Se=r.convert($.format,$.colorSpace),ue=r.convert($.type),me=x($.internalFormat,Se,ue,$.normalized,$.colorSpace),be=n.get(v),Be=n.get($);if(Be.__renderTarget=v,!be.__hasExternalTextures){let Ae=Math.max(1,v.width>>Me),we=Math.max(1,v.height>>Me);ce===i.TEXTURE_3D||ce===i.TEXTURE_2D_ARRAY?t.texImage3D(ce,Me,me,Ae,we,v.depth,0,Se,ue,null):t.texImage2D(ce,Me,me,Ae,we,0,Se,ue,null)}t.bindFramebuffer(i.FRAMEBUFFER,L),J(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,te,ce,Be.__webglTexture,0,_e(v)):(ce===i.TEXTURE_2D||ce>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ce<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,te,ce,Be.__webglTexture,Me),t.bindFramebuffer(i.FRAMEBUFFER,null)}function oe(L,v,$){if(i.bindRenderbuffer(i.RENDERBUFFER,L),v.depthBuffer){let te=v.depthTexture,ce=te&&te.isDepthTexture?te.type:null,Me=E(v.stencilBuffer,ce),Se=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;J(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,_e(v),Me,v.width,v.height):$?i.renderbufferStorageMultisample(i.RENDERBUFFER,_e(v),Me,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,Me,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Se,i.RENDERBUFFER,L)}else{let te=v.textures;for(let ce=0;ce<te.length;ce++){let Me=te[ce],Se=r.convert(Me.format,Me.colorSpace),ue=r.convert(Me.type),me=x(Me.internalFormat,Se,ue,Me.normalized,Me.colorSpace);J(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,_e(v),me,v.width,v.height):$?i.renderbufferStorageMultisample(i.RENDERBUFFER,_e(v),me,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,me,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function fe(L,v,$){let te=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,L),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ce=n.get(v.depthTexture);if(ce.__renderTarget=v,(!ce.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),te){if(ce.__webglInit===void 0&&(ce.__webglInit=!0,v.depthTexture.addEventListener("dispose",C)),ce.__webglTexture===void 0){ce.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,ce.__webglTexture),Ue(i.TEXTURE_CUBE_MAP,v.depthTexture);let be=r.convert(v.depthTexture.format),Be=r.convert(v.depthTexture.type),Ae;v.depthTexture.format===jn?Ae=i.DEPTH_COMPONENT24:v.depthTexture.format===es&&(Ae=i.DEPTH24_STENCIL8);for(let we=0;we<6;we++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,Ae,v.width,v.height,0,be,Be,null)}}else G(v.depthTexture,0);let Me=ce.__webglTexture,Se=_e(v),ue=te?i.TEXTURE_CUBE_MAP_POSITIVE_X+$:i.TEXTURE_2D,me=v.depthTexture.format===es?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===jn)J(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,me,ue,Me,0,Se):i.framebufferTexture2D(i.FRAMEBUFFER,me,ue,Me,0);else if(v.depthTexture.format===es)J(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,me,ue,Me,0,Se):i.framebufferTexture2D(i.FRAMEBUFFER,me,ue,Me,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function P(L){let v=n.get(L),$=L.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==L.depthTexture){let te=L.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),te){let ce=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,te.removeEventListener("dispose",ce)};te.addEventListener("dispose",ce),v.__depthDisposeCallback=ce}v.__boundDepthTexture=te}if(L.depthTexture&&!v.__autoAllocateDepthBuffer)if($)for(let te=0;te<6;te++)fe(v.__webglFramebuffer[te],L,te);else{let te=L.texture.mipmaps;te&&te.length>0?fe(v.__webglFramebuffer[0],L,0):fe(v.__webglFramebuffer,L,0)}else if($){v.__webglDepthbuffer=[];for(let te=0;te<6;te++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[te]),v.__webglDepthbuffer[te]===void 0)v.__webglDepthbuffer[te]=i.createRenderbuffer(),oe(v.__webglDepthbuffer[te],L,!1);else{let ce=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=v.__webglDepthbuffer[te];i.bindRenderbuffer(i.RENDERBUFFER,Me),i.framebufferRenderbuffer(i.FRAMEBUFFER,ce,i.RENDERBUFFER,Me)}}else{let te=L.texture.mipmaps;if(te&&te.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),oe(v.__webglDepthbuffer,L,!1);else{let ce=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Me),i.framebufferRenderbuffer(i.FRAMEBUFFER,ce,i.RENDERBUFFER,Me)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Z(L,v,$){let te=n.get(L);v!==void 0&&q(te.__webglFramebuffer,L,L.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),$!==void 0&&P(L)}function V(L){let v=L.texture,$=n.get(L),te=n.get(v);L.addEventListener("dispose",y);let ce=L.textures,Me=L.isWebGLCubeRenderTarget===!0,Se=ce.length>1;if(Se||(te.__webglTexture===void 0&&(te.__webglTexture=i.createTexture()),te.__version=v.version,a.memory.textures++),Me){$.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(v.mipmaps&&v.mipmaps.length>0){$.__webglFramebuffer[ue]=[];for(let me=0;me<v.mipmaps.length;me++)$.__webglFramebuffer[ue][me]=i.createFramebuffer()}else $.__webglFramebuffer[ue]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){$.__webglFramebuffer=[];for(let ue=0;ue<v.mipmaps.length;ue++)$.__webglFramebuffer[ue]=i.createFramebuffer()}else $.__webglFramebuffer=i.createFramebuffer();if(Se)for(let ue=0,me=ce.length;ue<me;ue++){let be=n.get(ce[ue]);be.__webglTexture===void 0&&(be.__webglTexture=i.createTexture(),a.memory.textures++)}if(L.samples>0&&J(L)===!1){$.__webglMultisampledFramebuffer=i.createFramebuffer(),$.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let ue=0;ue<ce.length;ue++){let me=ce[ue];$.__webglColorRenderbuffer[ue]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,$.__webglColorRenderbuffer[ue]);let be=r.convert(me.format,me.colorSpace),Be=r.convert(me.type),Ae=x(me.internalFormat,be,Be,me.normalized,me.colorSpace,L.isXRRenderTarget===!0),we=_e(L);i.renderbufferStorageMultisample(i.RENDERBUFFER,we,Ae,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,$.__webglColorRenderbuffer[ue])}i.bindRenderbuffer(i.RENDERBUFFER,null),L.depthBuffer&&($.__webglDepthRenderbuffer=i.createRenderbuffer(),oe($.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Me){t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),Ue(i.TEXTURE_CUBE_MAP,v);for(let ue=0;ue<6;ue++)if(v.mipmaps&&v.mipmaps.length>0)for(let me=0;me<v.mipmaps.length;me++)q($.__webglFramebuffer[ue][me],L,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,me);else q($.__webglFramebuffer[ue],L,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);p(v)&&b(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){for(let ue=0,me=ce.length;ue<me;ue++){let be=ce[ue],Be=n.get(be),Ae=i.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(Ae=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Ae,Be.__webglTexture),Ue(Ae,be),q($.__webglFramebuffer,L,be,i.COLOR_ATTACHMENT0+ue,Ae,0),p(be)&&b(Ae)}t.unbindTexture()}else{let ue=i.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ue=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,te.__webglTexture),Ue(ue,v),v.mipmaps&&v.mipmaps.length>0)for(let me=0;me<v.mipmaps.length;me++)q($.__webglFramebuffer[me],L,v,i.COLOR_ATTACHMENT0,ue,me);else q($.__webglFramebuffer,L,v,i.COLOR_ATTACHMENT0,ue,0);p(v)&&b(ue),t.unbindTexture()}L.depthBuffer&&P(L)}function Q(L){let v=L.textures;for(let $=0,te=v.length;$<te;$++){let ce=v[$];if(p(ce)){let Me=M(L),Se=n.get(ce).__webglTexture;t.bindTexture(Me,Se),b(Me),t.unbindTexture()}}}let ne=[],le=[];function xe(L){if(L.samples>0){if(J(L)===!1){let v=L.textures,$=L.width,te=L.height,ce=i.COLOR_BUFFER_BIT,Me=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Se=n.get(L),ue=v.length>1;if(ue)for(let be=0;be<v.length;be++)t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer);let me=L.texture.mipmaps;me&&me.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let be=0;be<v.length;be++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(ce|=i.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(ce|=i.STENCIL_BUFFER_BIT)),ue){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Se.__webglColorRenderbuffer[be]);let Be=n.get(v[be]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Be,0)}i.blitFramebuffer(0,0,$,te,0,0,$,te,ce,i.NEAREST),c===!0&&(ne.length=0,le.length=0,ne.push(i.COLOR_ATTACHMENT0+be),L.depthBuffer&&L.resolveDepthBuffer===!1&&(ne.push(Me),le.push(Me),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,le)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ne))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ue)for(let be=0;be<v.length;be++){t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,Se.__webglColorRenderbuffer[be]);let Be=n.get(v[be]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,Be,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&c){let v=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function _e(L){return Math.min(s.maxSamples,L.samples)}function J(L){let v=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function S(L){let v=a.render.frame;h.get(L)!==v&&(h.set(L,v),L.update())}function Pe(L,v){let $=L.colorSpace,te=L.format,ce=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||$!==ca&&$!==zn&&(st.getTransfer($)===ht?(te!==on||ce!==an)&&Xe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ye("WebGLTextures: Unsupported texture color space:",$)),v}function Fe(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(l.width=L.naturalWidth||L.width,l.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(l.width=L.displayWidth,l.height=L.displayHeight):(l.width=L.width,l.height=L.height),l}this.allocateTextureUnit=X,this.resetTextureUnits=B,this.getTextureUnits=F,this.setTextureUnits=U,this.setTexture2D=G,this.setTexture2DArray=K,this.setTexture3D=ie,this.setTextureCube=he,this.rebindTextures=Z,this.setupRenderTarget=V,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=xe,this.setupDepthRenderbuffer=P,this.setupFrameBufferTexture=q,this.useMultisampledRTT=J,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function A1(i,e){function t(n,s=zn){let r,a=st.getTransfer(s);if(n===an)return i.UNSIGNED_BYTE;if(n===bc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ec)return i.UNSIGNED_SHORT_5_5_5_1;if(n===au)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ou)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===su)return i.BYTE;if(n===ru)return i.SHORT;if(n===Mr)return i.UNSIGNED_SHORT;if(n===Sc)return i.INT;if(n===Bn)return i.UNSIGNED_INT;if(n===An)return i.FLOAT;if(n===ri)return i.HALF_FLOAT;if(n===cu)return i.ALPHA;if(n===lu)return i.RGB;if(n===on)return i.RGBA;if(n===jn)return i.DEPTH_COMPONENT;if(n===es)return i.DEPTH_STENCIL;if(n===wc)return i.RED;if(n===Tc)return i.RED_INTEGER;if(n===ts)return i.RG;if(n===Ac)return i.RG_INTEGER;if(n===Rc)return i.RGBA_INTEGER;if(n===Ga||n===Wa||n===Xa||n===qa)if(a===ht)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ga)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Wa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Xa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===qa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ga)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Wa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Xa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===qa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Cc||n===Ic||n===Pc||n===Lc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Cc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ic)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Pc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Lc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Nc||n===Dc||n===Uc||n===Fc||n===Oc||n===Za||n===Bc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Nc||n===Dc)return a===ht?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Uc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Fc)return r.COMPRESSED_R11_EAC;if(n===Oc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Za)return r.COMPRESSED_RG11_EAC;if(n===Bc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===zc||n===kc||n===Vc||n===Hc||n===Gc||n===Wc||n===Xc||n===qc||n===Zc||n===Yc||n===Jc||n===$c||n===Kc||n===jc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===zc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===kc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Vc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Hc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Gc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Wc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Xc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===qc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Zc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Yc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Jc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===$c)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Kc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===jc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Qc||n===el||n===tl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Qc)return a===ht?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===el)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===tl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===nl||n===il||n===Ya||n===sl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===nl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===il)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ya)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===sl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Sr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var R1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,C1=`
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

}`,Uu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ma(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ft({vertexShader:R1,fragmentShader:C1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new pt(new _n(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Fu=class extends Qn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,m=null,_=typeof XRWebGLBinding<"u",g=new Uu,p={},b=t.getContextAttributes(),M=null,x=null,E=[],w=[],C=new de,y=null,A=new kt;A.viewport=new ot;let D=new kt;D.viewport=new ot;let T=[A,D],I=new xc,B=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let W=E[ee];return W===void 0&&(W=new cr,E[ee]=W),W.getTargetRaySpace()},this.getControllerGrip=function(ee){let W=E[ee];return W===void 0&&(W=new cr,E[ee]=W),W.getGripSpace()},this.getHand=function(ee){let W=E[ee];return W===void 0&&(W=new cr,E[ee]=W),W.getHandSpace()};function U(ee){let W=w.indexOf(ee.inputSource);if(W===-1)return;let k=E[W];k!==void 0&&(k.update(ee.inputSource,ee.frame,l||a),k.dispatchEvent({type:ee.type,data:ee.inputSource}))}function X(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",H);for(let ee=0;ee<E.length;ee++){let W=w[ee];W!==null&&(w[ee]=null,E[ee].disconnect(W))}B=null,F=null,g.reset();for(let ee in p)delete p[ee];e.setRenderTarget(M),f=null,d=null,u=null,s=null,x=null,Ue.stop(),n.isPresenting=!1,e.setPixelRatio(y),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){r=ee,n.isPresenting===!0&&Xe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){o=ee,n.isPresenting===!0&&Xe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ee){l=ee},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(ee){if(s=ee,s!==null){if(M=e.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",X),s.addEventListener("inputsourceschange",H),b.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let k=null,O=null,N=null;b.depth&&(N=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,k=b.stencil?es:jn,O=b.stencil?Sr:Bn);let q={colorFormat:t.RGBA8,depthFormat:N,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(q),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new jt(d.textureWidth,d.textureHeight,{format:on,type:an,depthTexture:new Ei(d.textureWidth,d.textureHeight,O,void 0,void 0,void 0,void 0,void 0,void 0,k),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let k={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,k),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new jt(f.framebufferWidth,f.framebufferHeight,{format:on,type:an,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Ue.setContext(s),Ue.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function H(ee){for(let W=0;W<ee.removed.length;W++){let k=ee.removed[W],O=w.indexOf(k);O>=0&&(w[O]=null,E[O].disconnect(k))}for(let W=0;W<ee.added.length;W++){let k=ee.added[W],O=w.indexOf(k);if(O===-1){for(let q=0;q<E.length;q++)if(q>=w.length){w.push(k),O=q;break}else if(w[q]===null){w[q]=k,O=q;break}if(O===-1)break}let N=E[O];N&&N.connect(k)}}let G=new z,K=new z;function ie(ee,W,k){G.setFromMatrixPosition(W.matrixWorld),K.setFromMatrixPosition(k.matrixWorld);let O=G.distanceTo(K),N=W.projectionMatrix.elements,q=k.projectionMatrix.elements,oe=N[14]/(N[10]-1),fe=N[14]/(N[10]+1),P=(N[9]+1)/N[5],Z=(N[9]-1)/N[5],V=(N[8]-1)/N[0],Q=(q[8]+1)/q[0],ne=oe*V,le=oe*Q,xe=O/(-V+Q),_e=xe*-V;if(W.matrixWorld.decompose(ee.position,ee.quaternion,ee.scale),ee.translateX(_e),ee.translateZ(xe),ee.matrixWorld.compose(ee.position,ee.quaternion,ee.scale),ee.matrixWorldInverse.copy(ee.matrixWorld).invert(),N[10]===-1)ee.projectionMatrix.copy(W.projectionMatrix),ee.projectionMatrixInverse.copy(W.projectionMatrixInverse);else{let J=oe+xe,S=fe+xe,Pe=ne-_e,Fe=le+(O-_e),L=P*fe/S*J,v=Z*fe/S*J;ee.projectionMatrix.makePerspective(Pe,Fe,L,v,J,S),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert()}}function he(ee,W){W===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(W.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(s===null)return;let W=ee.near,k=ee.far;g.texture!==null&&(g.depthNear>0&&(W=g.depthNear),g.depthFar>0&&(k=g.depthFar)),I.near=D.near=A.near=W,I.far=D.far=A.far=k,(B!==I.near||F!==I.far)&&(s.updateRenderState({depthNear:I.near,depthFar:I.far}),B=I.near,F=I.far),I.layers.mask=ee.layers.mask|6,A.layers.mask=I.layers.mask&-5,D.layers.mask=I.layers.mask&-3;let O=ee.parent,N=I.cameras;he(I,O);for(let q=0;q<N.length;q++)he(N[q],O);N.length===2?ie(I,A,D):I.projectionMatrix.copy(A.projectionMatrix),pe(ee,I,O)};function pe(ee,W,k){k===null?ee.matrix.copy(W.matrixWorld):(ee.matrix.copy(k.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(W.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(W.projectionMatrix),ee.projectionMatrixInverse.copy(W.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=rr*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(ee){c=ee,d!==null&&(d.fixedFoveation=ee),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=ee)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(I)},this.getCameraTexture=function(ee){return p[ee]};let ve=null;function Ge(ee,W){if(h=W.getViewerPose(l||a),m=W,h!==null){let k=h.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let O=!1;k.length!==I.cameras.length&&(I.cameras.length=0,O=!0);for(let fe=0;fe<k.length;fe++){let P=k[fe],Z=null;if(f!==null)Z=f.getViewport(P);else{let Q=u.getViewSubImage(d,P);Z=Q.viewport,fe===0&&(e.setRenderTargetTextures(x,Q.colorTexture,Q.depthStencilTexture),e.setRenderTarget(x))}let V=T[fe];V===void 0&&(V=new kt,V.layers.enable(fe),V.viewport=new ot,T[fe]=V),V.matrix.fromArray(P.transform.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale),V.projectionMatrix.fromArray(P.projectionMatrix),V.projectionMatrixInverse.copy(V.projectionMatrix).invert(),V.viewport.set(Z.x,Z.y,Z.width,Z.height),fe===0&&(I.matrix.copy(V.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),O===!0&&I.cameras.push(V)}let N=s.enabledFeatures;if(N&&N.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=n.getBinding();let fe=u.getDepthInformation(k[0]);fe&&fe.isValid&&fe.texture&&g.init(fe,s.renderState)}if(N&&N.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let fe=0;fe<k.length;fe++){let P=k[fe].camera;if(P){let Z=p[P];Z||(Z=new Ma,p[P]=Z);let V=u.getCameraImage(P);Z.sourceTexture=V}}}}for(let k=0;k<E.length;k++){let O=w[k],N=E[k];O!==null&&N!==void 0&&N.update(O,W,l||a)}ve&&ve(ee,W),W.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:W}),m=null}let Ue=new Jp;Ue.setAnimationLoop(Ge),this.setAnimationLoop=function(ee){ve=ee},this.dispose=function(){}}},I1=new nt,tm=new qe;tm.set(-1,0,0,0,1,0,0,0,1);function P1(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,fu(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,b,M,x){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,x)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?c(g,p,b,M):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Qt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Qt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let b=e.get(p),M=b.envMap,x=b.envMapRotation;M&&(g.envMap.value=M,g.envMapRotation.value.setFromMatrix4(I1.makeRotationFromEuler(x)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(tm),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,b,M){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*b,g.scale.value=M*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,b){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Qt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=b.texture,g.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){let b=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(b.matrixWorld),g.nearDistance.value=b.shadow.camera.near,g.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function L1(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,E){let w=E.program;n.uniformBlockBinding(x,w)}function l(x,E){let w=s[x.id];w===void 0&&(g(x),w=h(x),s[x.id]=w,x.addEventListener("dispose",b));let C=E.program;n.updateUBOMapping(x,C);let y=e.render.frame;r[x.id]!==y&&(d(x),r[x.id]=y)}function h(x){let E=u();x.__bindingPointIndex=E;let w=i.createBuffer(),C=x.__size,y=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,C,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,w),w}function u(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return Ye("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){let E=s[x.id],w=x.uniforms,C=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let y=0,A=w.length;y<A;y++){let D=w[y];if(Array.isArray(D))for(let T=0,I=D.length;T<I;T++)f(D[T],y,T,C);else f(D,y,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(x,E,w,C){if(_(x,E,w,C)===!0){let y=x.__offset,A=x.value;if(Array.isArray(A)){let D=0;for(let T=0;T<A.length;T++){let I=A[T],B=p(I);m(I,x.__data,D),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(D+=B.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(A,x.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,y,x.__data)}}function m(x,E,w){typeof x=="number"||typeof x=="boolean"?E[0]=x:x.isMatrix3?(E[0]=x.elements[0],E[1]=x.elements[1],E[2]=x.elements[2],E[3]=0,E[4]=x.elements[3],E[5]=x.elements[4],E[6]=x.elements[5],E[7]=0,E[8]=x.elements[6],E[9]=x.elements[7],E[10]=x.elements[8],E[11]=0):ArrayBuffer.isView(x)?E.set(new x.constructor(x.buffer,x.byteOffset,E.length)):x.toArray(E,w)}function _(x,E,w,C){let y=x.value,A=E+"_"+w;if(C[A]===void 0)return typeof y=="number"||typeof y=="boolean"?C[A]=y:ArrayBuffer.isView(y)?C[A]=y.slice():C[A]=y.clone(),!0;{let D=C[A];if(typeof y=="number"||typeof y=="boolean"){if(D!==y)return C[A]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(D.equals(y)===!1)return D.copy(y),!0}}return!1}function g(x){let E=x.uniforms,w=0,C=16;for(let A=0,D=E.length;A<D;A++){let T=Array.isArray(E[A])?E[A]:[E[A]];for(let I=0,B=T.length;I<B;I++){let F=T[I],U=Array.isArray(F.value)?F.value:[F.value];for(let X=0,H=U.length;X<H;X++){let G=U[X],K=p(G),ie=w%C,he=ie%K.boundary,pe=ie+he;w+=he,pe!==0&&C-pe<K.storage&&(w+=C-pe),F.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=w,w+=K.storage}}}let y=w%C;return y>0&&(w+=C-y),x.__size=w,x.__cache={},this}function p(x){let E={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(E.boundary=4,E.storage=4):x.isVector2?(E.boundary=8,E.storage=8):x.isVector3||x.isColor?(E.boundary=16,E.storage=12):x.isVector4?(E.boundary=16,E.storage=16):x.isMatrix3?(E.boundary=48,E.storage=48):x.isMatrix4?(E.boundary=64,E.storage=64):x.isTexture?Xe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(E.boundary=16,E.storage=x.byteLength):Xe("WebGLRenderer: Unsupported uniform value type.",x),E}function b(x){let E=x.target;E.removeEventListener("dispose",b);let w=a.indexOf(E.__bindingPointIndex);a.splice(w,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function M(){for(let x in s)i.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:c,update:l,dispose:M}}var N1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ai=null;function D1(){return ai===null&&(ai=new _a(N1,16,16,ts,ri),ai.name="DFG_LUT",ai.minFilter=St,ai.magFilter=St,ai.wrapS=rn,ai.wrapT=rn,ai.generateMipmaps=!1,ai.needsUpdate=!0),ai}var Tr=class{constructor(e={}){let{canvas:t=gp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=an}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let _=f,g=new Set([Rc,Ac,Tc]),p=new Set([an,Bn,Mr,Sr,bc,Ec]),b=new Uint32Array(4),M=new Int32Array(4),x=new z,E=null,w=null,C=[],y=[],A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=On,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let D=this,T=!1,I=null,B=null,F=null,U=null;this._outputColorSpace=_t;let X=0,H=0,G=null,K=-1,ie=null,he=new ot,pe=new ot,ve=null,Ge=new ke(0),Ue=0,ee=t.width,W=t.height,k=1,O=null,N=null,q=new ot(0,0,ee,W),oe=new ot(0,0,ee,W),fe=!1,P=new dr,Z=!1,V=!1,Q=new nt,ne=new z,le=new ot,xe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},_e=!1;function J(){return G===null?k:1}let S=n;function Pe(R,j){return t.getContext(R,j)}try{let R={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"185"}`),t.addEventListener("webglcontextlost",wt,!1),t.addEventListener("webglcontextrestored",yt,!1),t.addEventListener("webglcontextcreationerror",qn,!1),S===null){let j="webgl2";if(S=Pe(j,R),S===null)throw Pe(j)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(R){throw Ye("WebGLRenderer: "+R.message),R}let Fe,L,v,$,te,ce,Me,Se,ue,me,be,Be,Ae,we,Ze,Je,Ke,Y,Te,ge,Re,Le,ye;function Ve(){Fe=new Vy(S),Fe.init(),Re=new A1(S,Fe),L=new Ny(S,Fe,e,Re),v=new w1(S,Fe),L.reversedDepthBuffer&&d&&v.buffers.depth.setReversed(!0),B=S.createFramebuffer(),F=S.createFramebuffer(),U=S.createFramebuffer(),$=new Wy(S),te=new u1,ce=new T1(S,Fe,v,te,L,Re,$),Me=new ky(D),Se=new Y0(S),Le=new Py(S,Se),ue=new Hy(S,Se,$,Le),me=new qy(S,ue,Se,Le,$),Y=new Xy(S,L,ce),Ze=new Dy(te),be=new h1(D,Me,Fe,L,Le,Ze),Be=new P1(D,te),Ae=new f1,we=new y1(Fe),Ke=new Iy(D,Me,v,me,m,c),Je=new E1(D,me,L),ye=new L1(S,$,L,v),Te=new Ly(S,Fe,$),ge=new Gy(S,Fe,$),$.programs=be.programs,D.capabilities=L,D.extensions=Fe,D.properties=te,D.renderLists=Ae,D.shadowMap=Je,D.state=v,D.info=$}Ve(),_!==an&&(A=new Yy(_,t.width,t.height,o,s,r));let Oe=new Fu(D,S);this.xr=Oe,this.getContext=function(){return S},this.getContextAttributes=function(){return S.getContextAttributes()},this.forceContextLoss=function(){let R=Fe.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=Fe.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(R){R!==void 0&&(k=R,this.setSize(ee,W,!1))},this.getSize=function(R){return R.set(ee,W)},this.setSize=function(R,j,ae=!0){if(Oe.isPresenting){Xe("WebGLRenderer: Can't change size while VR device is presenting.");return}ee=R,W=j,t.width=Math.floor(R*k),t.height=Math.floor(j*k),ae===!0&&(t.style.width=R+"px",t.style.height=j+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,R,j)},this.getDrawingBufferSize=function(R){return R.set(ee*k,W*k).floor()},this.setDrawingBufferSize=function(R,j,ae){ee=R,W=j,k=ae,t.width=Math.floor(R*ae),t.height=Math.floor(j*ae),this.setViewport(0,0,R,j)},this.setEffects=function(R){if(_===an){Ye("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let j=0;j<R.length;j++)if(R[j].isOutputPass===!0){Xe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(he)},this.getViewport=function(R){return R.copy(q)},this.setViewport=function(R,j,ae,se){R.isVector4?q.set(R.x,R.y,R.z,R.w):q.set(R,j,ae,se),v.viewport(he.copy(q).multiplyScalar(k).round())},this.getScissor=function(R){return R.copy(oe)},this.setScissor=function(R,j,ae,se){R.isVector4?oe.set(R.x,R.y,R.z,R.w):oe.set(R,j,ae,se),v.scissor(pe.copy(oe).multiplyScalar(k).round())},this.getScissorTest=function(){return fe},this.setScissorTest=function(R){v.setScissorTest(fe=R)},this.setOpaqueSort=function(R){O=R},this.setTransparentSort=function(R){N=R},this.getClearColor=function(R){return R.copy(Ke.getClearColor())},this.setClearColor=function(){Ke.setClearColor(...arguments)},this.getClearAlpha=function(){return Ke.getClearAlpha()},this.setClearAlpha=function(){Ke.setClearAlpha(...arguments)},this.clear=function(R=!0,j=!0,ae=!0){let se=0;if(R){let re=!1;if(G!==null){let Ie=G.texture.format;re=g.has(Ie)}if(re){let Ie=G.texture.type,De=p.has(Ie),Ce=Ke.getClearColor(),ze=Ke.getClearAlpha(),He=Ce.r,je=Ce.g,et=Ce.b;De?(b[0]=He,b[1]=je,b[2]=et,b[3]=ze,S.clearBufferuiv(S.COLOR,0,b)):(M[0]=He,M[1]=je,M[2]=et,M[3]=ze,S.clearBufferiv(S.COLOR,0,M))}else se|=S.COLOR_BUFFER_BIT}j&&(se|=S.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ae&&(se|=S.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),se!==0&&S.clear(se)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),I=R},this.dispose=function(){t.removeEventListener("webglcontextlost",wt,!1),t.removeEventListener("webglcontextrestored",yt,!1),t.removeEventListener("webglcontextcreationerror",qn,!1),Ke.dispose(),Ae.dispose(),we.dispose(),te.dispose(),Me.dispose(),me.dispose(),Le.dispose(),ye.dispose(),be.dispose(),Oe.dispose(),Oe.removeEventListener("sessionstart",Gd),Oe.removeEventListener("sessionend",Wd),cs.stop()};function wt(R){R.preventDefault(),ua("WebGLRenderer: Context Lost."),T=!0}function yt(){ua("WebGLRenderer: Context Restored."),T=!1;let R=$.autoReset,j=Je.enabled,ae=Je.autoUpdate,se=Je.needsUpdate,re=Je.type;Ve(),$.autoReset=R,Je.enabled=j,Je.autoUpdate=ae,Je.needsUpdate=se,Je.type=re}function qn(R){Ye("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Zn(R){let j=R.target;j.removeEventListener("dispose",Zn),_g(j)}function _g(R){yg(R),te.remove(R)}function yg(R){let j=te.get(R).programs;j!==void 0&&(j.forEach(function(ae){be.releaseProgram(ae)}),R.isShaderMaterial&&be.releaseShaderCache(R))}this.renderBufferDirect=function(R,j,ae,se,re,Ie){j===null&&(j=xe);let De=re.isMesh&&re.matrixWorld.determinantAffine()<0,Ce=Sg(R,j,ae,se,re);v.setMaterial(se,De);let ze=ae.index,He=1;if(se.wireframe===!0){if(ze=ue.getWireframeAttribute(ae),ze===void 0)return;He=2}let je=ae.drawRange,et=ae.attributes.position,We=je.start*He,mt=(je.start+je.count)*He;Ie!==null&&(We=Math.max(We,Ie.start*He),mt=Math.min(mt,(Ie.start+Ie.count)*He)),ze!==null?(We=Math.max(We,0),mt=Math.min(mt,ze.count)):et!=null&&(We=Math.max(We,0),mt=Math.min(mt,et.count));let It=mt-We;if(It<0||It===1/0)return;Le.setup(re,se,Ce,ae,ze);let Tt,gt=Te;if(ze!==null&&(Tt=Se.get(ze),gt=ge,gt.setIndex(Tt)),re.isMesh)se.wireframe===!0?(v.setLineWidth(se.wireframeLinewidth*J()),gt.setMode(S.LINES)):gt.setMode(S.TRIANGLES);else if(re.isLine){let Wt=se.linewidth;Wt===void 0&&(Wt=1),v.setLineWidth(Wt*J()),re.isLineSegments?gt.setMode(S.LINES):re.isLineLoop?gt.setMode(S.LINE_LOOP):gt.setMode(S.LINE_STRIP)}else re.isPoints?gt.setMode(S.POINTS):re.isSprite&&gt.setMode(S.TRIANGLES);if(re.isBatchedMesh)if(Fe.get("WEBGL_multi_draw"))gt.renderMultiDraw(re._multiDrawStarts,re._multiDrawCounts,re._multiDrawCount);else{let Wt=re._multiDrawStarts,Ne=re._multiDrawCounts,hn=re._multiDrawCount,at=ze?Se.get(ze).bytesPerElement:1,Sn=te.get(se).currentProgram.getUniforms();for(let Yn=0;Yn<hn;Yn++)Sn.setValue(S,"_gl_DrawID",Yn),gt.render(Wt[Yn]/at,Ne[Yn])}else if(re.isInstancedMesh)gt.renderInstances(We,It,re.count);else if(ae.isInstancedBufferGeometry){let Wt=ae._maxInstanceCount!==void 0?ae._maxInstanceCount:1/0,Ne=Math.min(ae.instanceCount,Wt);gt.renderInstances(We,It,Ne)}else gt.render(We,It)};function Hd(R,j,ae){R.transparent===!0&&R.side===en&&R.forceSinglePass===!1?(R.side=Qt,R.needsUpdate=!0,ro(R,j,ae),R.side=Mi,R.needsUpdate=!0,ro(R,j,ae),R.side=en):ro(R,j,ae)}this.compile=function(R,j,ae=null){ae===null&&(ae=R),w=we.get(ae),w.init(j),y.push(w),ae.traverseVisible(function(re){re.isLight&&re.layers.test(j.layers)&&(w.pushLight(re),re.castShadow&&w.pushShadow(re))}),R!==ae&&R.traverseVisible(function(re){re.isLight&&re.layers.test(j.layers)&&(w.pushLight(re),re.castShadow&&w.pushShadow(re))}),w.setupLights();let se=new Set;return R.traverse(function(re){if(!(re.isMesh||re.isPoints||re.isLine||re.isSprite))return;let Ie=re.material;if(Ie)if(Array.isArray(Ie))for(let De=0;De<Ie.length;De++){let Ce=Ie[De];Hd(Ce,ae,re),se.add(Ce)}else Hd(Ie,ae,re),se.add(Ie)}),w=y.pop(),se},this.compileAsync=function(R,j,ae=null){let se=this.compile(R,j,ae);return new Promise(re=>{function Ie(){if(se.forEach(function(De){te.get(De).currentProgram.isReady()&&se.delete(De)}),se.size===0){re(R);return}setTimeout(Ie,10)}Fe.get("KHR_parallel_shader_compile")!==null?Ie():setTimeout(Ie,10)})};let eh=null;function vg(R){eh&&eh(R)}function Gd(){cs.stop()}function Wd(){cs.start()}let cs=new Jp;cs.setAnimationLoop(vg),typeof self<"u"&&cs.setContext(self),this.setAnimationLoop=function(R){eh=R,Oe.setAnimationLoop(R),R===null?cs.stop():cs.start()},Oe.addEventListener("sessionstart",Gd),Oe.addEventListener("sessionend",Wd),this.render=function(R,j){if(j!==void 0&&j.isCamera!==!0){Ye("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;I!==null&&I.renderStart(R,j);let ae=Oe.enabled===!0&&Oe.isPresenting===!0,se=A!==null&&(G===null||ae)&&A.begin(D,G);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),Oe.enabled===!0&&Oe.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Oe.cameraAutoUpdate===!0&&Oe.updateCamera(j),j=Oe.getCamera()),R.isScene===!0&&R.onBeforeRender(D,R,j,G),w=we.get(R,y.length),w.init(j),w.state.textureUnits=ce.getTextureUnits(),y.push(w),Q.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),P.setFromProjectionMatrix(Q,Dn,j.reversedDepth),V=this.localClippingEnabled,Z=Ze.init(this.clippingPlanes,V),E=Ae.get(R,C.length),E.init(),C.push(E),Oe.enabled===!0&&Oe.isPresenting===!0){let De=D.xr.getDepthSensingMesh();De!==null&&th(De,j,-1/0,D.sortObjects)}th(R,j,0,D.sortObjects),E.finish(),D.sortObjects===!0&&E.sort(O,N,j.reversedDepth),_e=Oe.enabled===!1||Oe.isPresenting===!1||Oe.hasDepthSensing()===!1,_e&&Ke.addToRenderList(E,R),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Z===!0&&Ze.beginShadows();let re=w.state.shadowsArray;if(Je.render(re,R,j),Z===!0&&Ze.endShadows(),(se&&A.hasRenderPass())===!1){let De=E.opaque,Ce=E.transmissive;if(w.setupLights(),j.isArrayCamera){let ze=j.cameras;if(Ce.length>0)for(let He=0,je=ze.length;He<je;He++){let et=ze[He];qd(De,Ce,R,et)}_e&&Ke.render(R);for(let He=0,je=ze.length;He<je;He++){let et=ze[He];Xd(E,R,et,et.viewport)}}else Ce.length>0&&qd(De,Ce,R,j),_e&&Ke.render(R),Xd(E,R,j)}G!==null&&H===0&&(ce.updateMultisampleRenderTarget(G),ce.updateRenderTargetMipmap(G)),se&&A.end(D),R.isScene===!0&&R.onAfterRender(D,R,j),Le.resetDefaultState(),K=-1,ie=null,y.pop(),y.length>0?(w=y[y.length-1],ce.setTextureUnits(w.state.textureUnits),Z===!0&&Ze.setGlobalState(D.clippingPlanes,w.state.camera)):w=null,C.pop(),C.length>0?E=C[C.length-1]:E=null,I!==null&&I.renderEnd()};function th(R,j,ae,se){if(R.visible===!1)return;if(R.layers.test(j.layers)){if(R.isGroup)ae=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(j);else if(R.isLightProbeGrid)w.pushLightProbeGrid(R);else if(R.isLight)w.pushLight(R),R.castShadow&&w.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||P.intersectsSprite(R)){se&&le.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Q);let De=me.update(R),Ce=R.material;Ce.visible&&E.push(R,De,Ce,ae,le.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||P.intersectsObject(R))){let De=me.update(R),Ce=R.material;if(se&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),le.copy(R.boundingSphere.center)):(De.boundingSphere===null&&De.computeBoundingSphere(),le.copy(De.boundingSphere.center)),le.applyMatrix4(R.matrixWorld).applyMatrix4(Q)),Array.isArray(Ce)){let ze=De.groups;for(let He=0,je=ze.length;He<je;He++){let et=ze[He],We=Ce[et.materialIndex];We&&We.visible&&E.push(R,De,We,ae,le.z,et)}}else Ce.visible&&E.push(R,De,Ce,ae,le.z,null)}}let Ie=R.children;for(let De=0,Ce=Ie.length;De<Ce;De++)th(Ie[De],j,ae,se)}function Xd(R,j,ae,se){let{opaque:re,transmissive:Ie,transparent:De}=R;w.setupLightsView(ae),Z===!0&&Ze.setGlobalState(D.clippingPlanes,ae),se&&v.viewport(he.copy(se)),re.length>0&&so(re,j,ae),Ie.length>0&&so(Ie,j,ae),De.length>0&&so(De,j,ae),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function qd(R,j,ae,se){if((ae.isScene===!0?ae.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[se.id]===void 0){let We=Fe.has("EXT_color_buffer_half_float")||Fe.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[se.id]=new jt(1,1,{generateMipmaps:!0,type:We?ri:an,minFilter:si,samples:Math.max(4,L.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:st.workingColorSpace})}let Ie=w.state.transmissionRenderTarget[se.id],De=se.viewport||he;Ie.setSize(De.z*D.transmissionResolutionScale,De.w*D.transmissionResolutionScale);let Ce=D.getRenderTarget(),ze=D.getActiveCubeFace(),He=D.getActiveMipmapLevel();D.setRenderTarget(Ie),D.getClearColor(Ge),Ue=D.getClearAlpha(),Ue<1&&D.setClearColor(16777215,.5),D.clear(),_e&&Ke.render(ae);let je=D.toneMapping;D.toneMapping=On;let et=se.viewport;if(se.viewport!==void 0&&(se.viewport=void 0),w.setupLightsView(se),Z===!0&&Ze.setGlobalState(D.clippingPlanes,se),so(R,ae,se),ce.updateMultisampleRenderTarget(Ie),ce.updateRenderTargetMipmap(Ie),Fe.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let mt=0,It=j.length;mt<It;mt++){let Tt=j[mt],{object:gt,geometry:Wt,material:Ne,group:hn}=Tt;if(Ne.side===en&&gt.layers.test(se.layers)){let at=Ne.side;Ne.side=Qt,Ne.needsUpdate=!0,Zd(gt,ae,se,Wt,Ne,hn),Ne.side=at,Ne.needsUpdate=!0,We=!0}}We===!0&&(ce.updateMultisampleRenderTarget(Ie),ce.updateRenderTargetMipmap(Ie))}D.setRenderTarget(Ce,ze,He),D.setClearColor(Ge,Ue),et!==void 0&&(se.viewport=et),D.toneMapping=je}function so(R,j,ae){let se=j.isScene===!0?j.overrideMaterial:null;for(let re=0,Ie=R.length;re<Ie;re++){let De=R[re],{object:Ce,geometry:ze,group:He}=De,je=De.material;je.allowOverride===!0&&se!==null&&(je=se),Ce.layers.test(ae.layers)&&Zd(Ce,j,ae,ze,je,He)}}function Zd(R,j,ae,se,re,Ie){R.onBeforeRender(D,j,ae,se,re,Ie),R.modelViewMatrix.multiplyMatrices(ae.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),re.onBeforeRender(D,j,ae,se,R,Ie),re.transparent===!0&&re.side===en&&re.forceSinglePass===!1?(re.side=Qt,re.needsUpdate=!0,D.renderBufferDirect(ae,j,se,re,R,Ie),re.side=Mi,re.needsUpdate=!0,D.renderBufferDirect(ae,j,se,re,R,Ie),re.side=en):D.renderBufferDirect(ae,j,se,re,R,Ie),R.onAfterRender(D,j,ae,se,re,Ie)}function ro(R,j,ae){j.isScene!==!0&&(j=xe);let se=te.get(R),re=w.state.lights,Ie=w.state.shadowsArray,De=re.state.version,Ce=be.getParameters(R,re.state,Ie,j,ae,w.state.lightProbeGridArray),ze=be.getProgramCacheKey(Ce),He=se.programs;se.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?j.environment:null,se.fog=j.fog;let je=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;se.envMap=Me.get(R.envMap||se.environment,je),se.envMapRotation=se.environment!==null&&R.envMap===null?j.environmentRotation:R.envMapRotation,He===void 0&&(R.addEventListener("dispose",Zn),He=new Map,se.programs=He);let et=He.get(ze);if(et!==void 0){if(se.currentProgram===et&&se.lightsStateVersion===De)return Jd(R,Ce),et}else Ce.uniforms=be.getUniforms(R),I!==null&&R.isNodeMaterial&&I.build(R,ae,Ce),R.onBeforeCompile(Ce,D),et=be.acquireProgram(Ce,ze),He.set(ze,et),se.uniforms=Ce.uniforms;let We=se.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(We.clippingPlanes=Ze.uniform),Jd(R,Ce),se.needsLights=Eg(R),se.lightsStateVersion=De,se.needsLights&&(We.ambientLightColor.value=re.state.ambient,We.lightProbe.value=re.state.probe,We.directionalLights.value=re.state.directional,We.directionalLightShadows.value=re.state.directionalShadow,We.spotLights.value=re.state.spot,We.spotLightShadows.value=re.state.spotShadow,We.rectAreaLights.value=re.state.rectArea,We.ltc_1.value=re.state.rectAreaLTC1,We.ltc_2.value=re.state.rectAreaLTC2,We.pointLights.value=re.state.point,We.pointLightShadows.value=re.state.pointShadow,We.hemisphereLights.value=re.state.hemi,We.directionalShadowMatrix.value=re.state.directionalShadowMatrix,We.spotLightMatrix.value=re.state.spotLightMatrix,We.spotLightMap.value=re.state.spotLightMap,We.pointShadowMatrix.value=re.state.pointShadowMatrix),se.lightProbeGrid=w.state.lightProbeGridArray.length>0,se.currentProgram=et,se.uniformsList=null,et}function Yd(R){if(R.uniformsList===null){let j=R.currentProgram.getUniforms();R.uniformsList=wr.seqWithValue(j.seq,R.uniforms)}return R.uniformsList}function Jd(R,j){let ae=te.get(R);ae.outputColorSpace=j.outputColorSpace,ae.batching=j.batching,ae.batchingColor=j.batchingColor,ae.instancing=j.instancing,ae.instancingColor=j.instancingColor,ae.instancingMorph=j.instancingMorph,ae.skinning=j.skinning,ae.morphTargets=j.morphTargets,ae.morphNormals=j.morphNormals,ae.morphColors=j.morphColors,ae.morphTargetsCount=j.morphTargetsCount,ae.numClippingPlanes=j.numClippingPlanes,ae.numIntersection=j.numClipIntersection,ae.vertexAlphas=j.vertexAlphas,ae.vertexTangents=j.vertexTangents,ae.toneMapping=j.toneMapping}function Mg(R,j){if(R.length===0)return null;if(R.length===1)return R[0].texture!==null?R[0]:null;x.setFromMatrixPosition(j.matrixWorld);for(let ae=0,se=R.length;ae<se;ae++){let re=R[ae];if(re.texture!==null&&re.boundingBox.containsPoint(x))return re}return null}function Sg(R,j,ae,se,re){j.isScene!==!0&&(j=xe),ce.resetTextureUnits();let Ie=j.fog,De=se.isMeshStandardMaterial||se.isMeshLambertMaterial||se.isMeshPhongMaterial?j.environment:null,Ce=G===null?D.outputColorSpace:G.isXRRenderTarget===!0?G.texture.colorSpace:st.workingColorSpace,ze=se.isMeshStandardMaterial||se.isMeshLambertMaterial&&!se.envMap||se.isMeshPhongMaterial&&!se.envMap,He=Me.get(se.envMap||De,ze),je=se.vertexColors===!0&&!!ae.attributes.color&&ae.attributes.color.itemSize===4,et=!!ae.attributes.tangent&&(!!se.normalMap||se.anisotropy>0),We=!!ae.morphAttributes.position,mt=!!ae.morphAttributes.normal,It=!!ae.morphAttributes.color,Tt=On;se.toneMapped&&(G===null||G.isXRRenderTarget===!0)&&(Tt=D.toneMapping);let gt=ae.morphAttributes.position||ae.morphAttributes.normal||ae.morphAttributes.color,Wt=gt!==void 0?gt.length:0,Ne=te.get(se),hn=w.state.lights;if(Z===!0&&(V===!0||R!==ie)){let vt=R===ie&&se.id===K;Ze.setState(se,R,vt)}let at=!1;se.version===Ne.__version?(Ne.needsLights&&Ne.lightsStateVersion!==hn.state.version||Ne.outputColorSpace!==Ce||re.isBatchedMesh&&Ne.batching===!1||!re.isBatchedMesh&&Ne.batching===!0||re.isBatchedMesh&&Ne.batchingColor===!0&&re.colorTexture===null||re.isBatchedMesh&&Ne.batchingColor===!1&&re.colorTexture!==null||re.isInstancedMesh&&Ne.instancing===!1||!re.isInstancedMesh&&Ne.instancing===!0||re.isSkinnedMesh&&Ne.skinning===!1||!re.isSkinnedMesh&&Ne.skinning===!0||re.isInstancedMesh&&Ne.instancingColor===!0&&re.instanceColor===null||re.isInstancedMesh&&Ne.instancingColor===!1&&re.instanceColor!==null||re.isInstancedMesh&&Ne.instancingMorph===!0&&re.morphTexture===null||re.isInstancedMesh&&Ne.instancingMorph===!1&&re.morphTexture!==null||Ne.envMap!==He||se.fog===!0&&Ne.fog!==Ie||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==Ze.numPlanes||Ne.numIntersection!==Ze.numIntersection)||Ne.vertexAlphas!==je||Ne.vertexTangents!==et||Ne.morphTargets!==We||Ne.morphNormals!==mt||Ne.morphColors!==It||Ne.toneMapping!==Tt||Ne.morphTargetsCount!==Wt||!!Ne.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(at=!0):(at=!0,Ne.__version=se.version);let Sn=Ne.currentProgram;at===!0&&(Sn=ro(se,j,re),I&&se.isNodeMaterial&&I.onUpdateProgram(se,Sn,Ne));let Yn=!1,Fi=!1,Ds=!1,xt=Sn.getUniforms(),Pt=Ne.uniforms;if(v.useProgram(Sn.program)&&(Yn=!0,Fi=!0,Ds=!0),se.id!==K&&(K=se.id,Fi=!0),Ne.needsLights){let vt=Mg(w.state.lightProbeGridArray,re);Ne.lightProbeGrid!==vt&&(Ne.lightProbeGrid=vt,Fi=!0)}if(Yn||ie!==R){v.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),xt.setValue(S,"projectionMatrix",R.projectionMatrix),xt.setValue(S,"viewMatrix",R.matrixWorldInverse);let Bi=xt.map.cameraPosition;Bi!==void 0&&Bi.setValue(S,ne.setFromMatrixPosition(R.matrixWorld)),L.logarithmicDepthBuffer&&xt.setValue(S,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(se.isMeshPhongMaterial||se.isMeshToonMaterial||se.isMeshLambertMaterial||se.isMeshBasicMaterial||se.isMeshStandardMaterial||se.isShaderMaterial)&&xt.setValue(S,"isOrthographic",R.isOrthographicCamera===!0),ie!==R&&(ie=R,Fi=!0,Ds=!0)}if(Ne.needsLights&&(hn.state.directionalShadowMap.length>0&&xt.setValue(S,"directionalShadowMap",hn.state.directionalShadowMap,ce),hn.state.spotShadowMap.length>0&&xt.setValue(S,"spotShadowMap",hn.state.spotShadowMap,ce),hn.state.pointShadowMap.length>0&&xt.setValue(S,"pointShadowMap",hn.state.pointShadowMap,ce)),re.isSkinnedMesh){xt.setOptional(S,re,"bindMatrix"),xt.setOptional(S,re,"bindMatrixInverse");let vt=re.skeleton;vt&&(vt.boneTexture===null&&vt.computeBoneTexture(),xt.setValue(S,"boneTexture",vt.boneTexture,ce))}re.isBatchedMesh&&(xt.setOptional(S,re,"batchingTexture"),xt.setValue(S,"batchingTexture",re._matricesTexture,ce),xt.setOptional(S,re,"batchingIdTexture"),xt.setValue(S,"batchingIdTexture",re._indirectTexture,ce),xt.setOptional(S,re,"batchingColorTexture"),re._colorsTexture!==null&&xt.setValue(S,"batchingColorTexture",re._colorsTexture,ce));let Oi=ae.morphAttributes;if((Oi.position!==void 0||Oi.normal!==void 0||Oi.color!==void 0)&&Y.update(re,ae,Sn),(Fi||Ne.receiveShadow!==re.receiveShadow)&&(Ne.receiveShadow=re.receiveShadow,xt.setValue(S,"receiveShadow",re.receiveShadow)),(se.isMeshStandardMaterial||se.isMeshLambertMaterial||se.isMeshPhongMaterial)&&se.envMap===null&&j.environment!==null&&(Pt.envMapIntensity.value=j.environmentIntensity),Pt.dfgLUT!==void 0&&(Pt.dfgLUT.value=D1()),Fi){if(xt.setValue(S,"toneMappingExposure",D.toneMappingExposure),Ne.needsLights&&bg(Pt,Ds),Ie&&se.fog===!0&&Be.refreshFogUniforms(Pt,Ie),Be.refreshMaterialUniforms(Pt,se,k,W,w.state.transmissionRenderTarget[R.id]),Ne.needsLights&&Ne.lightProbeGrid){let vt=Ne.lightProbeGrid;Pt.probesSH.value=vt.texture,Pt.probesMin.value.copy(vt.boundingBox.min),Pt.probesMax.value.copy(vt.boundingBox.max),Pt.probesResolution.value.copy(vt.resolution)}wr.upload(S,Yd(Ne),Pt,ce)}if(se.isShaderMaterial&&se.uniformsNeedUpdate===!0&&(wr.upload(S,Yd(Ne),Pt,ce),se.uniformsNeedUpdate=!1),se.isSpriteMaterial&&xt.setValue(S,"center",re.center),xt.setValue(S,"modelViewMatrix",re.modelViewMatrix),xt.setValue(S,"normalMatrix",re.normalMatrix),xt.setValue(S,"modelMatrix",re.matrixWorld),se.uniformsGroups!==void 0){let vt=se.uniformsGroups;for(let Bi=0,Us=vt.length;Bi<Us;Bi++){let $d=vt[Bi];ye.update($d,Sn),ye.bind($d,Sn)}}return Sn}function bg(R,j){R.ambientLightColor.needsUpdate=j,R.lightProbe.needsUpdate=j,R.directionalLights.needsUpdate=j,R.directionalLightShadows.needsUpdate=j,R.pointLights.needsUpdate=j,R.pointLightShadows.needsUpdate=j,R.spotLights.needsUpdate=j,R.spotLightShadows.needsUpdate=j,R.rectAreaLights.needsUpdate=j,R.hemisphereLights.needsUpdate=j}function Eg(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return G},this.setRenderTargetTextures=function(R,j,ae){let se=te.get(R);se.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,se.__autoAllocateDepthBuffer===!1&&(se.__useRenderToTexture=!1),te.get(R.texture).__webglTexture=j,te.get(R.depthTexture).__webglTexture=se.__autoAllocateDepthBuffer?void 0:ae,se.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,j){let ae=te.get(R);ae.__webglFramebuffer=j,ae.__useDefaultFramebuffer=j===void 0},this.setRenderTarget=function(R,j=0,ae=0){G=R,X=j,H=ae;let se=null,re=!1,Ie=!1;if(R){let Ce=te.get(R);if(Ce.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(S.FRAMEBUFFER,Ce.__webglFramebuffer),he.copy(R.viewport),pe.copy(R.scissor),ve=R.scissorTest,v.viewport(he),v.scissor(pe),v.setScissorTest(ve),K=-1;return}else if(Ce.__webglFramebuffer===void 0)ce.setupRenderTarget(R);else if(Ce.__hasExternalTextures)ce.rebindTextures(R,te.get(R.texture).__webglTexture,te.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){let je=R.depthTexture;if(Ce.__boundDepthTexture!==je){if(je!==null&&te.has(je)&&(R.width!==je.image.width||R.height!==je.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ce.setupDepthRenderbuffer(R)}}let ze=R.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(Ie=!0);let He=te.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(He[j])?se=He[j][ae]:se=He[j],re=!0):R.samples>0&&ce.useMultisampledRTT(R)===!1?se=te.get(R).__webglMultisampledFramebuffer:Array.isArray(He)?se=He[ae]:se=He,he.copy(R.viewport),pe.copy(R.scissor),ve=R.scissorTest}else he.copy(q).multiplyScalar(k).floor(),pe.copy(oe).multiplyScalar(k).floor(),ve=fe;if(ae!==0&&(se=B),v.bindFramebuffer(S.FRAMEBUFFER,se)&&v.drawBuffers(R,se),v.viewport(he),v.scissor(pe),v.setScissorTest(ve),re){let Ce=te.get(R.texture);S.framebufferTexture2D(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ce.__webglTexture,ae)}else if(Ie){let Ce=j;for(let ze=0;ze<R.textures.length;ze++){let He=te.get(R.textures[ze]);S.framebufferTextureLayer(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0+ze,He.__webglTexture,ae,Ce)}}else if(R!==null&&ae!==0){let Ce=te.get(R.texture);S.framebufferTexture2D(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,Ce.__webglTexture,ae)}K=-1},this.readRenderTargetPixels=function(R,j,ae,se,re,Ie,De,Ce=0){if(!(R&&R.isWebGLRenderTarget)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ze=te.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&De!==void 0&&(ze=ze[De]),ze){v.bindFramebuffer(S.FRAMEBUFFER,ze);try{let He=R.textures[Ce],je=He.format,et=He.type;if(R.textures.length>1&&S.readBuffer(S.COLOR_ATTACHMENT0+Ce),!L.textureFormatReadable(je)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!L.textureTypeReadable(et)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=R.width-se&&ae>=0&&ae<=R.height-re&&S.readPixels(j,ae,se,re,Re.convert(je),Re.convert(et),Ie)}finally{let He=G!==null?te.get(G).__webglFramebuffer:null;v.bindFramebuffer(S.FRAMEBUFFER,He)}}},this.readRenderTargetPixelsAsync=async function(R,j,ae,se,re,Ie,De,Ce=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ze=te.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&De!==void 0&&(ze=ze[De]),ze)if(j>=0&&j<=R.width-se&&ae>=0&&ae<=R.height-re){v.bindFramebuffer(S.FRAMEBUFFER,ze);let He=R.textures[Ce],je=He.format,et=He.type;if(R.textures.length>1&&S.readBuffer(S.COLOR_ATTACHMENT0+Ce),!L.textureFormatReadable(je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!L.textureTypeReadable(et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let We=S.createBuffer();S.bindBuffer(S.PIXEL_PACK_BUFFER,We),S.bufferData(S.PIXEL_PACK_BUFFER,Ie.byteLength,S.STREAM_READ),S.readPixels(j,ae,se,re,Re.convert(je),Re.convert(et),0);let mt=G!==null?te.get(G).__webglFramebuffer:null;v.bindFramebuffer(S.FRAMEBUFFER,mt);let It=S.fenceSync(S.SYNC_GPU_COMMANDS_COMPLETE,0);return S.flush(),await _p(S,It,4),S.bindBuffer(S.PIXEL_PACK_BUFFER,We),S.getBufferSubData(S.PIXEL_PACK_BUFFER,0,Ie),S.deleteBuffer(We),S.deleteSync(It),Ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,j=null,ae=0){let se=Math.pow(2,-ae),re=Math.floor(R.image.width*se),Ie=Math.floor(R.image.height*se),De=j!==null?j.x:0,Ce=j!==null?j.y:0;ce.setTexture2D(R,0),S.copyTexSubImage2D(S.TEXTURE_2D,ae,0,0,De,Ce,re,Ie),v.unbindTexture()},this.copyTextureToTexture=function(R,j,ae=null,se=null,re=0,Ie=0){let De,Ce,ze,He,je,et,We,mt,It,Tt=R.isCompressedTexture?R.mipmaps[Ie]:R.image;if(ae!==null)De=ae.max.x-ae.min.x,Ce=ae.max.y-ae.min.y,ze=ae.isBox3?ae.max.z-ae.min.z:1,He=ae.min.x,je=ae.min.y,et=ae.isBox3?ae.min.z:0;else{let Pt=Math.pow(2,-re);De=Math.floor(Tt.width*Pt),Ce=Math.floor(Tt.height*Pt),R.isDataArrayTexture?ze=Tt.depth:R.isData3DTexture?ze=Math.floor(Tt.depth*Pt):ze=1,He=0,je=0,et=0}se!==null?(We=se.x,mt=se.y,It=se.z):(We=0,mt=0,It=0);let gt=Re.convert(j.format),Wt=Re.convert(j.type),Ne;j.isData3DTexture?(ce.setTexture3D(j,0),Ne=S.TEXTURE_3D):j.isDataArrayTexture||j.isCompressedArrayTexture?(ce.setTexture2DArray(j,0),Ne=S.TEXTURE_2D_ARRAY):(ce.setTexture2D(j,0),Ne=S.TEXTURE_2D),v.activeTexture(S.TEXTURE0),v.pixelStorei(S.UNPACK_FLIP_Y_WEBGL,j.flipY),v.pixelStorei(S.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),v.pixelStorei(S.UNPACK_ALIGNMENT,j.unpackAlignment);let hn=v.getParameter(S.UNPACK_ROW_LENGTH),at=v.getParameter(S.UNPACK_IMAGE_HEIGHT),Sn=v.getParameter(S.UNPACK_SKIP_PIXELS),Yn=v.getParameter(S.UNPACK_SKIP_ROWS),Fi=v.getParameter(S.UNPACK_SKIP_IMAGES);v.pixelStorei(S.UNPACK_ROW_LENGTH,Tt.width),v.pixelStorei(S.UNPACK_IMAGE_HEIGHT,Tt.height),v.pixelStorei(S.UNPACK_SKIP_PIXELS,He),v.pixelStorei(S.UNPACK_SKIP_ROWS,je),v.pixelStorei(S.UNPACK_SKIP_IMAGES,et);let Ds=R.isDataArrayTexture||R.isData3DTexture,xt=j.isDataArrayTexture||j.isData3DTexture;if(R.isDepthTexture){let Pt=te.get(R),Oi=te.get(j),vt=te.get(Pt.__renderTarget),Bi=te.get(Oi.__renderTarget);v.bindFramebuffer(S.READ_FRAMEBUFFER,vt.__webglFramebuffer),v.bindFramebuffer(S.DRAW_FRAMEBUFFER,Bi.__webglFramebuffer);for(let Us=0;Us<ze;Us++)Ds&&(S.framebufferTextureLayer(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,te.get(R).__webglTexture,re,et+Us),S.framebufferTextureLayer(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,te.get(j).__webglTexture,Ie,It+Us)),S.blitFramebuffer(He,je,De,Ce,We,mt,De,Ce,S.DEPTH_BUFFER_BIT,S.NEAREST);v.bindFramebuffer(S.READ_FRAMEBUFFER,null),v.bindFramebuffer(S.DRAW_FRAMEBUFFER,null)}else if(re!==0||R.isRenderTargetTexture||te.has(R)){let Pt=te.get(R),Oi=te.get(j);v.bindFramebuffer(S.READ_FRAMEBUFFER,F),v.bindFramebuffer(S.DRAW_FRAMEBUFFER,U);for(let vt=0;vt<ze;vt++)Ds?S.framebufferTextureLayer(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,Pt.__webglTexture,re,et+vt):S.framebufferTexture2D(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,Pt.__webglTexture,re),xt?S.framebufferTextureLayer(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,Oi.__webglTexture,Ie,It+vt):S.framebufferTexture2D(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,Oi.__webglTexture,Ie),re!==0?S.blitFramebuffer(He,je,De,Ce,We,mt,De,Ce,S.COLOR_BUFFER_BIT,S.NEAREST):xt?S.copyTexSubImage3D(Ne,Ie,We,mt,It+vt,He,je,De,Ce):S.copyTexSubImage2D(Ne,Ie,We,mt,He,je,De,Ce);v.bindFramebuffer(S.READ_FRAMEBUFFER,null),v.bindFramebuffer(S.DRAW_FRAMEBUFFER,null)}else xt?R.isDataTexture||R.isData3DTexture?S.texSubImage3D(Ne,Ie,We,mt,It,De,Ce,ze,gt,Wt,Tt.data):j.isCompressedArrayTexture?S.compressedTexSubImage3D(Ne,Ie,We,mt,It,De,Ce,ze,gt,Tt.data):S.texSubImage3D(Ne,Ie,We,mt,It,De,Ce,ze,gt,Wt,Tt):R.isDataTexture?S.texSubImage2D(S.TEXTURE_2D,Ie,We,mt,De,Ce,gt,Wt,Tt.data):R.isCompressedTexture?S.compressedTexSubImage2D(S.TEXTURE_2D,Ie,We,mt,Tt.width,Tt.height,gt,Tt.data):S.texSubImage2D(S.TEXTURE_2D,Ie,We,mt,De,Ce,gt,Wt,Tt);v.pixelStorei(S.UNPACK_ROW_LENGTH,hn),v.pixelStorei(S.UNPACK_IMAGE_HEIGHT,at),v.pixelStorei(S.UNPACK_SKIP_PIXELS,Sn),v.pixelStorei(S.UNPACK_SKIP_ROWS,Yn),v.pixelStorei(S.UNPACK_SKIP_IMAGES,Fi),Ie===0&&j.generateMipmaps&&S.generateMipmap(Ne),v.unbindTexture()},this.initRenderTarget=function(R){te.get(R).__webglFramebuffer===void 0&&ce.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?ce.setTextureCube(R,0):R.isData3DTexture?ce.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?ce.setTexture2DArray(R,0):ce.setTexture2D(R,0),v.unbindTexture()},this.resetState=function(){X=0,H=0,G=null,v.reset(),Le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=st._getDrawingBufferColorSpace(e),t.unpackColorSpace=st._getUnpackColorSpace()}};var Qa=_t,pl=class i extends vs{constructor(e){super(e),this.defaultDPI=90,this.defaultUnit="px"}load(e,t,n,s){let r=this,a=new Ua(r.manager);a.setPath(r.path),a.setRequestHeader(r.requestHeader),a.setWithCredentials(r.withCredentials),a.load(e,function(o){try{t(r.parse(o))}catch(c){s?s(c):console.error(c),r.manager.itemError(e)}},n,s)}parse(e){let t=this;function n(k,O){if(k.nodeType!==1)return;k.hasAttribute("filter")&&console.warn("THREE.SVGLoader: Filters are not supported.");let N=E(k),q=!1,oe=null;switch(k.nodeName){case"svg":O=_(k,O);break;case"style":r(k);break;case"g":O=_(k,O);break;case"path":O=_(k,O),k.hasAttribute("d")&&(oe=s(k));break;case"rect":O=_(k,O),oe=c(k);break;case"polygon":O=_(k,O),oe=l(k);break;case"polyline":O=_(k,O),oe=h(k);break;case"circle":O=_(k,O),oe=u(k);break;case"ellipse":O=_(k,O),oe=d(k);break;case"line":O=_(k,O),oe=f(k);break;case"defs":q=!0;break;case"use":O=_(k,O);let Z=(k.getAttributeNS("http://www.w3.org/1999/xlink","href")||"").substring(1),V=k.viewportElement.getElementById(Z);V?n(V,O):console.warn("SVGLoader: 'use node' references non-existent node id: "+Z);break;default:}if(oe){O.fill!==void 0&&O.fill!=="none"&&!O.fill.startsWith("url")&&oe.color.setStyle(O.fill,Qa),y(oe,Ue),U.push(oe);let P=Object.assign({},O);P.strokeWidth=O.strokeWidth*B(Ue),oe.userData={node:k,style:P,transform:Ue.clone(),gradients:H}}let fe=k.childNodes;for(let P=0;P<fe.length;P++){let Z=fe[P];q&&Z.nodeName!=="style"&&Z.nodeName!=="defs"||n(Z,O)}N&&(G.pop(),G.length>0?Ue.copy(G[G.length-1]):Ue.identity())}function s(k){let O=new Fn,N=new de,q=new de,oe=new de,fe=!0,P=!1,Z=k.getAttribute("d");if(Z===""||Z==="none")return null;let V=Z.match(/[a-df-z][^a-df-z]*/ig);for(let Q=0,ne=V.length;Q<ne;Q++){let le=V[Q],xe=le.charAt(0),_e=le.slice(1).trim();fe===!0&&(P=!0,fe=!1);let J;switch(xe){case"M":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S+=2)N.x=J[S+0],N.y=J[S+1],q.x=N.x,q.y=N.y,S===0?O.moveTo(N.x,N.y):O.lineTo(N.x,N.y),S===0&&oe.copy(N);break;case"H":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S++)N.x=J[S],q.x=N.x,q.y=N.y,O.lineTo(N.x,N.y),S===0&&P===!0&&oe.copy(N);break;case"V":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S++)N.y=J[S],q.x=N.x,q.y=N.y,O.lineTo(N.x,N.y),S===0&&P===!0&&oe.copy(N);break;case"L":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S+=2)N.x=J[S+0],N.y=J[S+1],q.x=N.x,q.y=N.y,O.lineTo(N.x,N.y),S===0&&P===!0&&oe.copy(N);break;case"C":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S+=6)O.bezierCurveTo(J[S+0],J[S+1],J[S+2],J[S+3],J[S+4],J[S+5]),q.x=J[S+2],q.y=J[S+3],N.x=J[S+4],N.y=J[S+5],S===0&&P===!0&&oe.copy(N);break;case"S":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S+=4)O.bezierCurveTo(g(N.x,q.x),g(N.y,q.y),J[S+0],J[S+1],J[S+2],J[S+3]),q.x=J[S+0],q.y=J[S+1],N.x=J[S+2],N.y=J[S+3],S===0&&P===!0&&oe.copy(N);break;case"Q":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S+=4)O.quadraticCurveTo(J[S+0],J[S+1],J[S+2],J[S+3]),q.x=J[S+0],q.y=J[S+1],N.x=J[S+2],N.y=J[S+3],S===0&&P===!0&&oe.copy(N);break;case"T":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S+=2){let Fe=g(N.x,q.x),L=g(N.y,q.y);O.quadraticCurveTo(Fe,L,J[S+0],J[S+1]),q.x=Fe,q.y=L,N.x=J[S+0],N.y=J[S+1],S===0&&P===!0&&oe.copy(N)}break;case"A":J=p(_e,[3,4],7);for(let S=0,Pe=J.length;S<Pe;S+=7){if(J[S+5]==N.x&&J[S+6]==N.y)continue;let Fe=N.clone();N.x=J[S+5],N.y=J[S+6],q.x=N.x,q.y=N.y,a(O,J[S],J[S+1],J[S+2],J[S+3],J[S+4],Fe,N),S===0&&P===!0&&oe.copy(N)}break;case"m":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S+=2)N.x+=J[S+0],N.y+=J[S+1],q.x=N.x,q.y=N.y,S===0?O.moveTo(N.x,N.y):O.lineTo(N.x,N.y),S===0&&oe.copy(N);break;case"h":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S++)N.x+=J[S],q.x=N.x,q.y=N.y,O.lineTo(N.x,N.y),S===0&&P===!0&&oe.copy(N);break;case"v":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S++)N.y+=J[S],q.x=N.x,q.y=N.y,O.lineTo(N.x,N.y),S===0&&P===!0&&oe.copy(N);break;case"l":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S+=2)N.x+=J[S+0],N.y+=J[S+1],q.x=N.x,q.y=N.y,O.lineTo(N.x,N.y),S===0&&P===!0&&oe.copy(N);break;case"c":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S+=6)O.bezierCurveTo(N.x+J[S+0],N.y+J[S+1],N.x+J[S+2],N.y+J[S+3],N.x+J[S+4],N.y+J[S+5]),q.x=N.x+J[S+2],q.y=N.y+J[S+3],N.x+=J[S+4],N.y+=J[S+5],S===0&&P===!0&&oe.copy(N);break;case"s":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S+=4)O.bezierCurveTo(g(N.x,q.x),g(N.y,q.y),N.x+J[S+0],N.y+J[S+1],N.x+J[S+2],N.y+J[S+3]),q.x=N.x+J[S+0],q.y=N.y+J[S+1],N.x+=J[S+2],N.y+=J[S+3],S===0&&P===!0&&oe.copy(N);break;case"q":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S+=4)O.quadraticCurveTo(N.x+J[S+0],N.y+J[S+1],N.x+J[S+2],N.y+J[S+3]),q.x=N.x+J[S+0],q.y=N.y+J[S+1],N.x+=J[S+2],N.y+=J[S+3],S===0&&P===!0&&oe.copy(N);break;case"t":J=p(_e);for(let S=0,Pe=J.length;S<Pe;S+=2){let Fe=g(N.x,q.x),L=g(N.y,q.y);O.quadraticCurveTo(Fe,L,N.x+J[S+0],N.y+J[S+1]),q.x=Fe,q.y=L,N.x=N.x+J[S+0],N.y=N.y+J[S+1],S===0&&P===!0&&oe.copy(N)}break;case"a":J=p(_e,[3,4],7);for(let S=0,Pe=J.length;S<Pe;S+=7){if(J[S+5]==0&&J[S+6]==0)continue;let Fe=N.clone();N.x+=J[S+5],N.y+=J[S+6],q.x=N.x,q.y=N.y,a(O,J[S],J[S+1],J[S+2],J[S+3],J[S+4],Fe,N),S===0&&P===!0&&oe.copy(N)}break;case"Z":case"z":O.currentPath.autoClose=!0,O.currentPath.curves.length>0&&(N.copy(oe),O.currentPath.currentPoint.copy(N),fe=!0);break;default:console.warn(le)}P=!1}return O}function r(k){if(!(!k.sheet||!k.sheet.cssRules||!k.sheet.cssRules.length))for(let O=0;O<k.sheet.cssRules.length;O++){let N=k.sheet.cssRules[O];if(N.type!==1)continue;let q=N.selectorText.split(/,/gm).filter(Boolean).map(oe=>oe.trim());for(let oe=0;oe<q.length;oe++){let fe=Object.fromEntries(Object.entries(N.style).filter(([,P])=>P!==""));X[q[oe]]=Object.assign(X[q[oe]]||{},fe)}}}function a(k,O,N,q,oe,fe,P,Z){if(O==0||N==0){k.lineTo(Z.x,Z.y);return}q=q*Math.PI/180,O=Math.abs(O),N=Math.abs(N);let V=(P.x-Z.x)/2,Q=(P.y-Z.y)/2,ne=Math.cos(q)*V+Math.sin(q)*Q,le=-Math.sin(q)*V+Math.cos(q)*Q,xe=O*O,_e=N*N,J=ne*ne,S=le*le,Pe=J/xe+S/_e;if(Pe>1){let me=Math.sqrt(Pe);O=me*O,N=me*N,xe=O*O,_e=N*N}let Fe=xe*S+_e*J,L=(xe*_e-Fe)/Fe,v=Math.sqrt(Math.max(0,L));oe===fe&&(v=-v);let $=v*O*le/N,te=-v*N*ne/O,ce=Math.cos(q)*$-Math.sin(q)*te+(P.x+Z.x)/2,Me=Math.sin(q)*$+Math.cos(q)*te+(P.y+Z.y)/2,Se=o(1,0,(ne-$)/O,(le-te)/N),ue=o((ne-$)/O,(le-te)/N,(-ne-$)/O,(-le-te)/N)%(Math.PI*2);k.currentPath.absellipse(ce,Me,O,N,Se,Se+ue,fe===0,q)}function o(k,O,N,q){let oe=k*N+O*q,fe=Math.sqrt(k*k+O*O)*Math.sqrt(N*N+q*q),P=Math.acos(Math.max(-1,Math.min(1,oe/fe)));return k*q-O*N<0&&(P=-P),P}function c(k){let O=x(k.getAttribute("x")||0),N=x(k.getAttribute("y")||0),q=x(k.getAttribute("rx")||k.getAttribute("ry")||0),oe=x(k.getAttribute("ry")||k.getAttribute("rx")||0),fe=x(k.getAttribute("width")),P=x(k.getAttribute("height")),Z=1-.551915024494,V=new Fn;return V.moveTo(O+q,N),V.lineTo(O+fe-q,N),(q!==0||oe!==0)&&V.bezierCurveTo(O+fe-q*Z,N,O+fe,N+oe*Z,O+fe,N+oe),V.lineTo(O+fe,N+P-oe),(q!==0||oe!==0)&&V.bezierCurveTo(O+fe,N+P-oe*Z,O+fe-q*Z,N+P,O+fe-q,N+P),V.lineTo(O+q,N+P),(q!==0||oe!==0)&&V.bezierCurveTo(O+q*Z,N+P,O,N+P-oe*Z,O,N+P-oe),V.lineTo(O,N+oe),(q!==0||oe!==0)&&V.bezierCurveTo(O,N+oe*Z,O+q*Z,N,O+q,N),V}function l(k){function O(fe,P,Z){let V=x(P),Q=x(Z);oe===0?q.moveTo(V,Q):q.lineTo(V,Q),oe++}let N=/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,q=new Fn,oe=0;return k.getAttribute("points").replace(N,O),q.currentPath.autoClose=!0,q}function h(k){function O(fe,P,Z){let V=x(P),Q=x(Z);oe===0?q.moveTo(V,Q):q.lineTo(V,Q),oe++}let N=/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,q=new Fn,oe=0;return k.getAttribute("points").replace(N,O),q.currentPath.autoClose=!1,q}function u(k){let O=x(k.getAttribute("cx")||0),N=x(k.getAttribute("cy")||0),q=x(k.getAttribute("r")||0),oe=new ti;oe.absarc(O,N,q,0,Math.PI*2);let fe=new Fn;return fe.subPaths.push(oe),fe}function d(k){let O=x(k.getAttribute("cx")||0),N=x(k.getAttribute("cy")||0),q=x(k.getAttribute("rx")||0),oe=x(k.getAttribute("ry")||0),fe=new ti;fe.absellipse(O,N,q,oe,0,Math.PI*2);let P=new Fn;return P.subPaths.push(fe),P}function f(k){let O=x(k.getAttribute("x1")||0),N=x(k.getAttribute("y1")||0),q=x(k.getAttribute("x2")||0),oe=x(k.getAttribute("y2")||0),fe=new Fn;return fe.moveTo(O,N),fe.lineTo(q,oe),fe.currentPath.autoClose=!1,fe}function m(k){let O="http://www.w3.org/1999/xlink",N=k.querySelectorAll("linearGradient, radialGradient"),q=["x1","y1","x2","y2","cx","cy","r","fx","fy","gradientUnits","gradientTransform","spreadMethod"],oe={};for(let P of N){let Z=P.getAttribute("id");if(!Z)continue;let V={type:P.nodeName==="radialGradient"?"radialGradient":"linearGradient",attrs:{},stops:null,href:null},Q=P.getAttributeNS(O,"href")||P.getAttribute("href")||"";Q.startsWith("#")&&(V.href=Q.substring(1));for(let le of q)P.hasAttribute(le)&&(V.attrs[le]=P.getAttribute(le));let ne=P.querySelectorAll("stop");if(ne.length>0){V.stops=[];for(let le of ne){let xe=le.getAttribute("stop-color");!xe&&le.style&&(xe=le.style["stop-color"]),xe||(xe="#000");let _e=le.getAttribute("stop-opacity");(_e===null||_e==="")&&le.style&&(_e=le.style["stop-opacity"]),_e=_e===null||_e===""||_e===void 0?1:Math.max(0,Math.min(1,parseFloat(_e)));let J=Math.max(0,Math.min(1,parseFloat(le.getAttribute("offset")||"0")));V.stops.push({offset:J,color:xe,opacity:_e})}}oe[Z]=V}function fe(P,Z){let V=oe[P];if(!V||Z.has(P))return V;if(Z.add(P),V.href&&oe[V.href]){let Q=fe(V.href,Z);if(Q){V.stops||(V.stops=Q.stops);for(let ne in Q.attrs)ne in V.attrs||(V.attrs[ne]=Q.attrs[ne])}}return V}for(let P in oe)fe(P,new Set);for(let P in oe){let le=function(xe){return typeof xe!="string"?0:xe.endsWith("%")?parseFloat(xe)/100:x(xe)},Z=oe[P],V=Z.attrs,Q=V.gradientUnits==="userSpaceOnUse"?"userSpaceOnUse":"objectBoundingBox",ne={type:Z.type,gradientUnits:Q,spreadMethod:V.spreadMethod==="reflect"||V.spreadMethod==="repeat"?V.spreadMethod:"pad",gradientTransform:null,stops:(Z.stops||[]).slice().sort((xe,_e)=>xe.offset-_e.offset)};if(V.gradientTransform&&(ne.gradientTransform=new qe,C(V.gradientTransform,ne.gradientTransform)),Z.type==="linearGradient")ne.x1=V.x1!==void 0?le(V.x1):0,ne.y1=V.y1!==void 0?le(V.y1):0,ne.x2=V.x2!==void 0?le(V.x2):Q==="objectBoundingBox"?1:0,ne.y2=V.y2!==void 0?le(V.y2):0;else{let xe=Q==="objectBoundingBox"?.5:0,_e=Q==="objectBoundingBox"?.5:0;ne.cx=V.cx!==void 0?le(V.cx):xe,ne.cy=V.cy!==void 0?le(V.cy):xe,ne.r=V.r!==void 0?le(V.r):_e,ne.fx=V.fx!==void 0?le(V.fx):ne.cx,ne.fy=V.fy!==void 0?le(V.fy):ne.cy}H[P]=ne}}function _(k,O){O=Object.assign({},O);let N={};if(k.hasAttribute("class")){let P=k.getAttribute("class").split(/\s/).filter(Boolean).map(Z=>Z.trim());for(let Z=0;Z<P.length;Z++)N=Object.assign(N,X["."+P[Z]])}k.hasAttribute("id")&&(N=Object.assign(N,X["#"+k.getAttribute("id")]));function q(P,Z,V){V===void 0&&(V=function(ne){return ne}),k.hasAttribute(P)&&(O[Z]=V(k.getAttribute(P))),N[Z]&&(O[Z]=V(N[Z])),k.style&&k.style[P]!==""&&(O[Z]=V(k.style[P]))}function oe(P){return Math.max(0,Math.min(1,x(P)))}function fe(P){return Math.max(0,x(P))}return q("fill","fill"),q("fill-opacity","fillOpacity",oe),q("fill-rule","fillRule"),q("opacity","opacity",oe),q("stroke","stroke"),q("stroke-opacity","strokeOpacity",oe),q("stroke-width","strokeWidth",fe),q("stroke-linejoin","strokeLineJoin"),q("stroke-linecap","strokeLineCap"),q("stroke-miterlimit","strokeMiterLimit",fe),q("visibility","visibility"),O}function g(k,O){return k-(O-k)}function p(k,O,N){if(typeof k!="string")throw new TypeError("Invalid input: "+typeof k);let q={SEPARATOR:/[ \t\r\n\,.\-+]/,WHITESPACE:/[ \t\r\n]/,DIGIT:/[\d]/,SIGN:/[-+]/,POINT:/\./,COMMA:/,/,EXP:/e/i,FLAGS:/[01]/},oe=0,fe=1,P=2,Z=3,V=oe,Q=!0,ne="",le="",xe=[];function _e(Fe,L,v){let $=new SyntaxError('Unexpected character "'+Fe+'" at index '+L+".");throw $.partial=v,$}function J(){ne!==""&&(le===""?xe.push(Number(ne)):xe.push(Number(ne)*Math.pow(10,Number(le)))),ne="",le=""}let S,Pe=k.length;for(let Fe=0;Fe<Pe;Fe++){if(S=k[Fe],Array.isArray(O)&&O.includes(xe.length%N)&&q.FLAGS.test(S)){V=fe,ne=S,J();continue}if(V===oe){if(q.WHITESPACE.test(S))continue;if(q.DIGIT.test(S)||q.SIGN.test(S)){V=fe,ne=S;continue}if(q.POINT.test(S)){V=P,ne=S;continue}q.COMMA.test(S)&&(Q&&_e(S,Fe,xe),Q=!0)}if(V===fe){if(q.DIGIT.test(S)){ne+=S;continue}if(q.POINT.test(S)){ne+=S,V=P;continue}if(q.EXP.test(S)){V=Z;continue}q.SIGN.test(S)&&ne.length===1&&q.SIGN.test(ne[0])&&_e(S,Fe,xe)}if(V===P){if(q.DIGIT.test(S)){ne+=S;continue}if(q.EXP.test(S)){V=Z;continue}q.POINT.test(S)&&ne[ne.length-1]==="."&&_e(S,Fe,xe)}if(V===Z){if(q.DIGIT.test(S)){le+=S;continue}if(q.SIGN.test(S)){if(le===""){le+=S;continue}le.length===1&&q.SIGN.test(le)&&_e(S,Fe,xe)}}q.WHITESPACE.test(S)?(J(),V=oe,Q=!1):q.COMMA.test(S)?(J(),V=oe,Q=!0):q.SIGN.test(S)?(J(),V=fe,ne=S):q.POINT.test(S)?(J(),V=P,ne=S):_e(S,Fe,xe)}return J(),xe}let b=["mm","cm","in","pt","pc","px"],M={mm:{mm:1,cm:.1,in:1/25.4,pt:72/25.4,pc:6/25.4,px:-1},cm:{mm:10,cm:1,in:1/2.54,pt:72/2.54,pc:6/2.54,px:-1},in:{mm:25.4,cm:2.54,in:1,pt:72,pc:6,px:-1},pt:{mm:25.4/72,cm:2.54/72,in:1/72,pt:1,pc:6/72,px:-1},pc:{mm:25.4/6,cm:2.54/6,in:1/6,pt:72/6,pc:1,px:-1},px:{px:1}};function x(k){let O="px";if(typeof k=="string"||k instanceof String)for(let q=0,oe=b.length;q<oe;q++){let fe=b[q];if(k.endsWith(fe)){O=fe,k=k.substring(0,k.length-fe.length);break}}let N;return O==="px"&&t.defaultUnit!=="px"?N=M.in[t.defaultUnit]/t.defaultDPI:(N=M[O][t.defaultUnit],N<0&&(N=M[O].in*t.defaultDPI)),N*parseFloat(k)}function E(k){if(!(k.hasAttribute("transform")||k.nodeName==="use"&&(k.hasAttribute("x")||k.hasAttribute("y"))))return null;let O=w(k);return G.length>0&&O.premultiply(G[G.length-1]),Ue.copy(O),G.push(O),O}function w(k){let O=new qe;if(k.nodeName==="use"&&(k.hasAttribute("x")||k.hasAttribute("y"))){let N=x(k.getAttribute("x")||0),q=x(k.getAttribute("y")||0);O.makeTranslation(N,q)}return k.hasAttribute("transform")&&C(k.getAttribute("transform"),O),O}function C(k,O){let N=K,q=k.split(")");for(let oe=q.length-1;oe>=0;oe--){let fe=q[oe].trim();if(fe==="")continue;let P=fe.indexOf("("),Z=fe.length;if(P>0&&P<Z){let V=fe.slice(0,P),Q=p(fe.slice(P+1));switch(N.identity(),V){case"translate":if(Q.length>=1){let ne=Q[0],le=0;Q.length>=2&&(le=Q[1]),N.makeTranslation(ne,le)}break;case"rotate":if(Q.length>=1){let ne=0,le=0,xe=0;ne=Q[0]*Math.PI/180,Q.length>=3&&(le=Q[1],xe=Q[2]),ie.makeTranslation(-le,-xe),he.makeRotation(ne),pe.multiplyMatrices(he,ie),ie.makeTranslation(le,xe),N.multiplyMatrices(ie,pe)}break;case"scale":if(Q.length>=1){let ne=Q[0],le=ne;Q.length>=2&&(le=Q[1]),N.makeScale(ne,le)}break;case"skewX":Q.length===1&&N.set(1,Math.tan(Q[0]*Math.PI/180),0,0,1,0,0,0,1);break;case"skewY":Q.length===1&&N.set(1,0,0,Math.tan(Q[0]*Math.PI/180),1,0,0,0,1);break;case"matrix":Q.length===6&&N.set(Q[0],Q[2],Q[4],Q[1],Q[3],Q[5],0,0,1);break}O.premultiply(N)}}return O}function y(k,O){function N(P){Ge.set(P.x,P.y,1).applyMatrix3(O),P.set(Ge.x,Ge.y)}function q(P){let Z=P.xRadius,V=P.yRadius,Q=Math.cos(P.aRotation),ne=Math.sin(P.aRotation),le=new z(Z*Q,Z*ne,0),xe=new z(-V*ne,V*Q,0),_e=le.applyMatrix3(O),J=xe.applyMatrix3(O),S=K.set(_e.x,J.x,0,_e.y,J.y,0,0,0,1),Pe=ie.copy(S).invert(),v=he.copy(Pe).transpose().multiply(Pe).elements,$=F(v[0],v[1],v[4]),te=Math.sqrt($.rt1),ce=Math.sqrt($.rt2);if(P.xRadius=1/te,P.yRadius=1/ce,P.aRotation=Math.atan2($.sn,$.cs),!((P.aEndAngle-P.aStartAngle)%(2*Math.PI)<Number.EPSILON)){let Se=ie.set(te,0,0,0,ce,0,0,0,1),ue=he.set($.cs,$.sn,0,-$.sn,$.cs,0,0,0,1),me=Se.multiply(ue).multiply(S),be=Be=>{let{x:Ae,y:we}=new z(Math.cos(Be),Math.sin(Be),0).applyMatrix3(me);return Math.atan2(we,Ae)};P.aStartAngle=be(P.aStartAngle),P.aEndAngle=be(P.aEndAngle),A(O)&&(P.aClockwise=!P.aClockwise)}}function oe(P){let Z=T(O),V=I(O);P.xRadius*=Z,P.yRadius*=V;let Q=Z>Number.EPSILON?Math.atan2(O.elements[1],O.elements[0]):Math.atan2(-O.elements[3],O.elements[4]);P.aRotation+=Q,A(O)&&(P.aStartAngle*=-1,P.aEndAngle*=-1,P.aClockwise=!P.aClockwise)}let fe=k.subPaths;for(let P=0,Z=fe.length;P<Z;P++){let Q=fe[P].curves;for(let ne=0;ne<Q.length;ne++){let le=Q[ne];le.isLineCurve?(N(le.v1),N(le.v2)):le.isCubicBezierCurve?(N(le.v0),N(le.v1),N(le.v2),N(le.v3)):le.isQuadraticBezierCurve?(N(le.v0),N(le.v1),N(le.v2)):le.isEllipseCurve&&(ve.set(le.aX,le.aY),N(ve),le.aX=ve.x,le.aY=ve.y,D(O)?q(le):oe(le))}}}function A(k){let O=k.elements;return O[0]*O[4]-O[1]*O[3]<0}function D(k){let O=k.elements,N=O[0]*O[3]+O[1]*O[4];if(N===0)return!1;let q=T(k),oe=I(k);return Math.abs(N/(q*oe))>Number.EPSILON}function T(k){let O=k.elements;return Math.sqrt(O[0]*O[0]+O[1]*O[1])}function I(k){let O=k.elements;return Math.sqrt(O[3]*O[3]+O[4]*O[4])}function B(k){let O=k.elements,N=O[0]*O[4]-O[1]*O[3];return Math.sqrt(Math.abs(N))}function F(k,O,N){let q,oe,fe,P,Z,V=k+N,Q=k-N,ne=Math.sqrt(Q*Q+4*O*O);return V>0?(q=.5*(V+ne),Z=1/q,oe=k*Z*N-O*Z*O):V<0?oe=.5*(V-ne):(q=.5*ne,oe=-.5*ne),Q>0?fe=Q+ne:fe=Q-ne,Math.abs(fe)>2*Math.abs(O)?(Z=-2*O/fe,P=1/Math.sqrt(1+Z*Z),fe=Z*P):Math.abs(O)===0?(fe=1,P=0):(Z=-.5*fe/O,fe=1/Math.sqrt(1+Z*Z),P=Z*fe),Q>0&&(Z=fe,fe=-P,P=Z),{rt1:q,rt2:oe,cs:fe,sn:P}}let U=[],X={},H={},G=[],K=new qe,ie=new qe,he=new qe,pe=new qe,ve=new de,Ge=new z,Ue=new qe,ee=new DOMParser().parseFromString(e,"image/svg+xml");return m(ee),n(ee.documentElement,{fill:"#000",fillOpacity:1,strokeOpacity:1,strokeWidth:1,strokeLineJoin:"miter",strokeLineCap:"butt",strokeMiterLimit:4}),{paths:U,gradients:H,xml:ee.documentElement}}static createFillMaterial(e){let t=e.userData.style;if(t.fill===void 0||t.fill==="none")return null;let n=e.color,s=null,r=nm.exec(t.fill);if(r){let o=e.userData.gradients&&e.userData.gradients[r[1]];s=U1(o,e)}let a=new Yt({opacity:t.fillOpacity*(t.opacity||1),transparent:!0,side:en,depthWrite:!1});return s!==null?a.map=s:a.color=n,a}static createStrokeMaterial(e){let t=e.userData.style;return t.stroke===void 0||t.stroke==="none"?null:(nm.test(t.stroke)&&console.warn("THREE.SVGLoader: Gradient strokes are not supported."),new Yt({color:new ke().setStyle(t.stroke,Qa),opacity:t.strokeOpacity*(t.opacity||1),transparent:!0,side:en,depthWrite:!1}))}static createShapes(e){return console.warn("SVGLoader: createShapes() is deprecated. Use shapePath.toShapes() instead."),e.toShapes()}static getStrokeStyle(e,t,n,s,r){return e=e!==void 0?e:1,t=t!==void 0?t:"#000",n=n!==void 0?n:"miter",s=s!==void 0?s:"butt",r=r!==void 0?r:4,{strokeColor:t,strokeWidth:e,strokeLineJoin:n,strokeLineCap:s,strokeMiterLimit:r}}static pointsToStroke(e,t,n,s){let r=[],a=[],o=[];if(i.pointsToStrokeWithBuffers(e,t,n,s,r,a,o)===0)return null;let c=new Et;return c.setAttribute("position",new ut(r,3)),c.setAttribute("normal",new ut(a,3)),c.setAttribute("uv",new ut(o,2)),c}static pointsToStrokeWithBuffers(e,t,n,s,r,a,o,c){let l=new de,h=new de,u=new de,d=new de,f=new de,m=new de,_=new de,g=new de,p=new de,b=new de,M=new de,x=new de,E=new de,w=new de,C=new de,y=new de,A=new de;n=n!==void 0?n:12,s=s!==void 0?s:.001,c=c!==void 0?c:0,e=fe(e);let D=e.length;if(D<2)return 0;let T=e[0].equals(e[D-1]),I,B=e[0],F,U=t.strokeWidth/2,X=1/(D-1),H=0,G,K,ie,he,pe=!1,ve=0,Ge=c*3,Ue=c*2;ee(e[0],e[1],l).multiplyScalar(U),g.copy(e[0]).sub(l),p.copy(e[0]).add(l),b.copy(g),M.copy(p);for(let P=1;P<D;P++){I=e[P],P===D-1?T?F=e[1]:F=void 0:F=e[P+1];let Z=l;if(ee(B,I,Z),u.copy(Z).multiplyScalar(U),x.copy(I).sub(u),E.copy(I).add(u),G=H+X,K=!1,F!==void 0){ee(I,F,h),u.copy(h).multiplyScalar(U),w.copy(I).sub(u),C.copy(I).add(u),ie=!0,u.subVectors(F,B),Z.dot(u)<0&&(ie=!1),P===1&&(pe=ie),u.subVectors(F,I),u.normalize();let V=Math.abs(Z.dot(u));if(V>Number.EPSILON){let Q=U/V;u.multiplyScalar(-Q),d.subVectors(I,B),f.copy(d).setLength(Q).add(u),y.copy(f).negate();let ne=f.length(),le=d.length();d.divideScalar(le),m.subVectors(F,I);let xe=m.length();if(m.divideScalar(xe),d.dot(y)<le&&m.dot(y)<xe&&(K=!0),A.copy(f).add(I),y.add(I),K){let _e=ie?p:g,J=(A.x-_e.x)*(y.y-_e.y)-(A.y-_e.y)*(y.x-_e.x);(ie&&J<0||!ie&&J>0)&&y.copy(_e)}switch(he=!1,K?ie?(C.copy(y),E.copy(y)):(w.copy(y),x.copy(y)):O(),t.strokeLineJoin){case"bevel":N(ie,K,G);break;case"round":q(ie,K),ie?k(I,x,w,G,0):k(I,C,E,G,1);break;default:let _e=U*t.strokeMiterLimit/ne;if(_e<1)if(t.strokeLineJoin!=="miter-clip"){N(ie,K,G);break}else q(ie,K),ie?(m.subVectors(A,x).multiplyScalar(_e).add(x),_.subVectors(A,w).multiplyScalar(_e).add(w),W(x,G,0),W(m,G,0),W(I,G,.5),W(I,G,.5),W(m,G,0),W(_,G,0),W(I,G,.5),W(_,G,0),W(w,G,0)):(m.subVectors(A,E).multiplyScalar(_e).add(E),_.subVectors(A,C).multiplyScalar(_e).add(C),W(E,G,1),W(m,G,1),W(I,G,.5),W(I,G,.5),W(m,G,1),W(_,G,1),W(I,G,.5),W(_,G,1),W(C,G,1));else K?(ie?(W(p,H,1),W(g,H,0),W(A,G,0),W(p,H,1),W(A,G,0),W(y,G,1)):(W(p,H,1),W(g,H,0),W(A,G,1),W(g,H,0),W(y,G,0),W(A,G,1)),ie?w.copy(A):C.copy(A)):ie?(W(x,G,0),W(A,G,0),W(I,G,.5),W(I,G,.5),W(A,G,0),W(w,G,0)):(W(E,G,1),W(A,G,1),W(I,G,.5),W(I,G,.5),W(A,G,1),W(C,G,1)),he=!0;break}}else O()}else O();!T&&P===D-1&&oe(e[0],b,M,ie,!0,H),H=G,B=I,g.copy(w),p.copy(C)}if(!T)oe(I,x,E,ie,!1,G);else if(K&&r){let P=A,Z=y;pe!==ie&&(P=y,Z=A),ie?(he||pe)&&(Z.toArray(r,0),Z.toArray(r,9),he&&P.toArray(r,3)):(he||!pe)&&(Z.toArray(r,3),Z.toArray(r,9),he&&P.toArray(r,0))}if(r){let P=[new de,new de,new de],Z=c*3;for(let V=Z;V<Ge;V+=9)P[0].set(r[V],r[V+1]),P[1].set(r[V+3],r[V+4]),P[2].set(r[V+6],r[V+7]),$n.area(P)<0&&(r[V+3]=P[0].x,r[V+4]=P[0].y)}return ve;function ee(P,Z,V){return V.subVectors(Z,P),V.set(-V.y,V.x).normalize()}function W(P,Z,V){r&&(r[Ge]=P.x,r[Ge+1]=P.y,r[Ge+2]=0,a&&(a[Ge]=0,a[Ge+1]=0,a[Ge+2]=1),Ge+=3,o&&(o[Ue]=Z,o[Ue+1]=V,Ue+=2)),ve+=3}function k(P,Z,V,Q,ne){l.copy(Z).sub(P).normalize(),h.copy(V).sub(P).normalize();let le=Math.PI,xe=l.dot(h);Math.abs(xe)<1&&(le=Math.abs(Math.acos(xe))),le/=n,u.copy(Z);for(let _e=0,J=n-1;_e<J;_e++)d.copy(u).rotateAround(P,le),W(u,Q,ne),W(d,Q,ne),W(P,Q,.5),u.copy(d);W(u,Q,ne),W(V,Q,ne),W(P,Q,.5)}function O(){W(p,H,1),W(g,H,0),W(x,G,0),W(p,H,1),W(x,G,0),W(E,G,1)}function N(P,Z,V){Z?P?(W(p,H,1),W(g,H,0),W(x,G,0),W(p,H,1),W(x,G,0),W(y,G,1),W(x,V,0),W(w,V,0),W(y,V,.5)):(W(p,H,1),W(g,H,0),W(E,G,1),W(g,H,0),W(y,G,0),W(E,G,1),W(E,V,1),W(y,V,0),W(C,V,1)):P?(W(x,V,0),W(w,V,0),W(I,V,.5)):(W(E,V,1),W(C,V,0),W(I,V,.5))}function q(P,Z){Z&&(P?(W(p,H,1),W(g,H,0),W(x,G,0),W(p,H,1),W(x,G,0),W(y,G,1),W(x,H,0),W(I,G,.5),W(y,G,1),W(I,G,.5),W(w,H,0),W(y,G,1)):(W(p,H,1),W(g,H,0),W(E,G,1),W(g,H,0),W(y,G,0),W(E,G,1),W(E,H,1),W(y,G,0),W(I,G,.5),W(I,G,.5),W(y,G,0),W(C,H,1)))}function oe(P,Z,V,Q,ne,le){switch(t.strokeLineCap){case"round":ne?k(P,V,Z,le,.5):k(P,Z,V,le,.5);break;case"square":if(ne)l.subVectors(Z,P),h.set(l.y,-l.x),u.addVectors(l,h).add(P),d.subVectors(h,l).add(P),Q?(u.toArray(r,3),d.toArray(r,0),d.toArray(r,9)):(u.toArray(r,3),o[7]===1?d.toArray(r,9):u.toArray(r,9),d.toArray(r,0));else{l.subVectors(V,P),h.set(l.y,-l.x),u.addVectors(l,h).add(P),d.subVectors(h,l).add(P);let xe=r.length;Q?(u.toArray(r,xe-3),d.toArray(r,xe-6),d.toArray(r,xe-12)):(d.toArray(r,xe-6),u.toArray(r,xe-3),d.toArray(r,xe-12))}break;default:break}}function fe(P){let Z=!1;for(let Q=1,ne=P.length-1;Q<ne;Q++)if(P[Q].distanceTo(P[Q+1])<s){Z=!0;break}if(!Z)return P;let V=[];V.push(P[0]);for(let Q=1,ne=P.length-1;Q<ne;Q++)P[Q].distanceTo(P[Q+1])>=s&&V.push(P[Q]);return V.push(P[P.length-1]),V}}},nm=/^\s*url\(\s*(?:["']\s*)?#([^)'"\s]+)(?:\s*["'])?\s*\)\s*$/;function U1(i,e,t=256){if(!i||!Array.isArray(i.stops)||i.stops.length===0)return null;let n=e.userData.transform,s=i.gradientUnits==="objectBoundingBox",r=null;if(s&&(r=F1(e,n),r===null))return null;function a(u,d,f){f.set(u,d,1),i.gradientTransform&&f.applyMatrix3(i.gradientTransform),s&&f.set(r.minX+f.x*r.width,r.minY+f.y*r.height,1),n&&f.applyMatrix3(n)}let o=document.createElement("canvas"),c;if(i.type==="linearGradient"){o.width=t,o.height=1;let u=o.getContext("2d"),d=u.createLinearGradient(0,0,t,0);im(d,i.stops),u.fillStyle=d,u.fillRect(0,0,t,1);let f=new z,m=new z;a(i.x1,i.y1,f),a(i.x2,i.y2,m);let _=m.x-f.x,g=m.y-f.y,p=_*_+g*g||1e-20,b=_/p,M=g/p,x=-(b*f.x+M*f.y);c=new qe().set(b,M,x,0,0,.5,0,0,1)}else{let u=i.cx,d=i.cy,f=i.fx,m=i.fy,_=i.r;if(i.gradientTransform){let y=new z;y.set(u,d,1).applyMatrix3(i.gradientTransform),u=y.x,d=y.y,y.set(f,m,1).applyMatrix3(i.gradientTransform),f=y.x,m=y.y}if(s&&(u=r.minX+u*r.width,d=r.minY+d*r.height,f=r.minX+f*r.width,m=r.minY+m*r.height,_=_*Math.sqrt((r.width*r.width+r.height*r.height)/2)),_<=0)return null;o.width=t,o.height=t;let g=o.getContext("2d"),p=u-_,b=d-_,M=2*_,x=t/M;g.setTransform(x,0,0,x,-p*x,-b*x);let E=g.createRadialGradient(f,m,0,u,d,_);im(E,i.stops),g.fillStyle=E,g.fillRect(p,b,M,M);let w=n?n.clone().invert():new qe;c=new qe().set(1/M,0,-p/M,0,1/M,-b/M,0,0,1).multiply(w)}let l=new gn(o);l.colorSpace=Qa,l.flipY=!1,l.matrixAutoUpdate=!1,l.matrix=c;let h=i.spreadMethod==="reflect"?qi:i.spreadMethod==="repeat"?En:rn;return l.wrapS=h,l.wrapT=h,l}function F1(i,e){let t=e?e.clone().invert():null,n=new de,s=new _r;for(let r of i.subPaths)for(let a of r.getPoints())n.copy(a),t&&n.applyMatrix3(t),s.expandByPoint(n);return s.isEmpty()?null:{minX:s.min.x,minY:s.min.y,width:s.max.x-s.min.x,height:s.max.y-s.min.y}}function im(i,e){let t=new ke;for(let n of e){let s=n.color;if(n.opacity<1){t.setStyle(n.color,Qa);let r=/rgb\(([^)]+)\)/.exec(t.getStyle(Qa));r&&(s=`rgba(${r[1]},${n.opacity})`)}i.addColorStop(Math.max(0,Math.min(1,n.offset)),s)}}var sm={POSITION:["byte","byte normalized","unsigned byte","unsigned byte normalized","short","short normalized","unsigned short","unsigned short normalized"],NORMAL:["byte normalized","short normalized"],TANGENT:["byte normalized","short normalized"],TEXCOORD:["byte","byte normalized","unsigned byte","short","short normalized","unsigned short"]},is=class{constructor(){this.textureUtils=null,this.pluginCallbacks=[],this.register(function(e){return new Hu(e)}),this.register(function(e){return new Gu(e)}),this.register(function(e){return new Zu(e)}),this.register(function(e){return new Yu(e)}),this.register(function(e){return new Ju(e)}),this.register(function(e){return new $u(e)}),this.register(function(e){return new Wu(e)}),this.register(function(e){return new Xu(e)}),this.register(function(e){return new qu(e)}),this.register(function(e){return new Ku(e)}),this.register(function(e){return new ju(e)}),this.register(function(e){return new Qu(e)}),this.register(function(e){return new ed(e)}),this.register(function(e){return new td(e)})}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}setTextureUtils(e){return this.textureUtils=e,this}parse(e,t,n,s){let r=new Vu,a=[];for(let o=0,c=this.pluginCallbacks.length;o<c;o++)a.push(this.pluginCallbacks[o](r));r.setPlugins(a),r.setTextureUtils(this.textureUtils),r.writeAsync(e,t,s).catch(n)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,s,r,t)})}},it={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,INT:5124,UNSIGNED_INT:5125,FLOAT:5126,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,REPEAT:10497},Bu="KHR_mesh_quantization",Mn={};Mn[At]=it.NEAREST;Mn[Mc]=it.NEAREST_MIPMAP_NEAREST;Mn[bs]=it.NEAREST_MIPMAP_LINEAR;Mn[St]=it.LINEAR;Mn[vr]=it.LINEAR_MIPMAP_NEAREST;Mn[si]=it.LINEAR_MIPMAP_LINEAR;Mn[rn]=it.CLAMP_TO_EDGE;Mn[En]=it.REPEAT;Mn[qi]=it.MIRRORED_REPEAT;var rm={scale:"scale",position:"translation",quaternion:"rotation",morphTargetInfluences:"weights"},O1=new ke,am=12,B1=1179937895,z1=2,om=8,k1=1313821514,V1=5130562;function Ti(i,e){return i.length===e.length&&i.every(function(t,n){return t===e[n]})}function H1(i){return new TextEncoder().encode(i).buffer}function G1(i){return Ti(i.elements,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}function W1(i,e,t){let n={min:new Array(i.itemSize).fill(Number.POSITIVE_INFINITY),max:new Array(i.itemSize).fill(Number.NEGATIVE_INFINITY)};for(let s=e;s<e+t;s++)for(let r=0;r<i.itemSize;r++){let a;i.itemSize>4?a=i.array[s*i.itemSize+r]:(r===0?a=i.getX(s):r===1?a=i.getY(s):r===2?a=i.getZ(s):r===3&&(a=i.getW(s)),i.normalized===!0&&(a=ct.normalize(a,i.array))),n.min[r]=Math.min(n.min[r],a),n.max[r]=Math.max(n.max[r],a)}return n}function cm(i){return Math.ceil(i/4)*4}function zu(i,e=0){let t=cm(i.byteLength);if(t!==i.byteLength){let n=new Uint8Array(t);if(n.set(new Uint8Array(i)),e!==0)for(let s=i.byteLength;s<t;s++)n[s]=e;return n.buffer}return i}function ku(){return typeof document>"u"&&typeof OffscreenCanvas<"u"?new OffscreenCanvas(1,1):document.createElement("canvas")}function X1(i,e){if(typeof OffscreenCanvas<"u"&&i instanceof OffscreenCanvas){let t;return e==="image/jpeg"?t=.92:e==="image/webp"&&(t=.8),i.convertToBlob({type:e,quality:t})}else return new Promise(t=>i.toBlob(t,e))}var Vu=class{constructor(){this.plugins=[],this.options={},this.pending=[],this.buffers=[],this.byteOffset=0,this.buffers=[],this.nodeMap=new Map,this.skins=[],this.extensionsUsed={},this.extensionsRequired={},this.uids=new Map,this.uid=0,this.json={asset:{version:"2.0",generator:"THREE.GLTFExporter r185"}},this.cache={meshes:new Map,attributes:new Map,attributesNormalized:new Map,materials:new Map,textures:new Map,images:new Map},this.textureUtils=null}setPlugins(e){this.plugins=e}setTextureUtils(e){this.textureUtils=e}async writeAsync(e,t,n={}){this.options=Object.assign({binary:!1,trs:!1,onlyVisible:!0,maxTextureSize:1/0,animations:[],includeCustomExtensions:!1},n),this.options.animations.length>0&&(this.options.trs=!0),await this.processInputAsync(e),await Promise.all(this.pending);let s=this,r=s.buffers,a=s.json;n=s.options;let o=s.extensionsUsed,c=s.extensionsRequired,l=new Blob(r,{type:"application/octet-stream"}),h=Object.keys(o),u=Object.keys(c);if(h.length>0&&(a.extensionsUsed=h),u.length>0&&(a.extensionsRequired=u),a.buffers&&a.buffers.length>0&&(a.buffers[0].byteLength=l.size),n.binary===!0){let d=new FileReader;d.readAsArrayBuffer(l),d.onloadend=function(){let f=zu(d.result),m=new DataView(new ArrayBuffer(om));m.setUint32(0,f.byteLength,!0),m.setUint32(4,V1,!0);let _=zu(H1(JSON.stringify(a)),32),g=new DataView(new ArrayBuffer(om));g.setUint32(0,_.byteLength,!0),g.setUint32(4,k1,!0);let p=new ArrayBuffer(am),b=new DataView(p);b.setUint32(0,B1,!0),b.setUint32(4,z1,!0);let M=am+g.byteLength+_.byteLength+m.byteLength+f.byteLength;b.setUint32(8,M,!0);let x=new Blob([p,g,_,m,f],{type:"application/octet-stream"}),E=new FileReader;E.readAsArrayBuffer(x),E.onloadend=function(){t(E.result)}}}else if(a.buffers&&a.buffers.length>0){let d=new FileReader;d.readAsDataURL(l),d.onloadend=function(){let f=d.result;a.buffers[0].uri=f,t(a)}}else t(a)}serializeUserData(e,t){if(Object.keys(e.userData).length===0)return;let n=this.options,s=this.extensionsUsed;try{let r=JSON.parse(JSON.stringify(e.userData));if(n.includeCustomExtensions&&r.gltfExtensions){t.extensions===void 0&&(t.extensions={});for(let a in r.gltfExtensions)t.extensions[a]=r.gltfExtensions[a],s[a]=!0;delete r.gltfExtensions}Object.keys(r).length>0&&(t.extras=r)}catch(r){console.warn("THREE.GLTFExporter: userData of '"+e.name+"' won't be serialized because of JSON.stringify error - "+r.message)}}getUID(e,t=!1){if(this.uids.has(e)===!1){let s=new Map;s.set(!0,this.uid++),s.set(!1,this.uid++),this.uids.set(e,s)}return this.uids.get(e).get(t)}isNormalizedNormalAttribute(e){if(this.cache.attributesNormalized.has(e))return!1;let n=new z;for(let s=0,r=e.count;s<r;s++)if(Math.abs(n.fromBufferAttribute(e,s).length()-1)>5e-4)return!1;return!0}createNormalizedNormalAttribute(e){let t=this.cache;if(t.attributesNormalized.has(e))return t.attributesNormalized.get(e);let n=e.clone(),s=new z;for(let r=0,a=n.count;r<a;r++)s.fromBufferAttribute(n,r),s.x===0&&s.y===0&&s.z===0?s.setX(1):s.normalize(),n.setXYZ(r,s.x,s.y,s.z);return t.attributesNormalized.set(e,n),n}applyTextureTransform(e,t){let n=!1,s={};(t.offset.x!==0||t.offset.y!==0)&&(s.offset=t.offset.toArray(),n=!0),t.rotation!==0&&(s.rotation=t.rotation,n=!0),(t.repeat.x!==1||t.repeat.y!==1)&&(s.scale=t.repeat.toArray(),n=!0),n&&(e.extensions=e.extensions||{},e.extensions.KHR_texture_transform=s,this.extensionsUsed.KHR_texture_transform=!0)}async buildMetalRoughTextureAsync(e,t){if(e===t)return e;function n(f){return f.colorSpace===_t?function(_){return _<.04045?_*.0773993808:Math.pow(_*.9478672986+.0521327014,2.4)}:function(_){return _}}e instanceof Yi&&(e=await this.decompressTextureAsync(e)),t instanceof Yi&&(t=await this.decompressTextureAsync(t));let s=e?e.image:null,r=t?t.image:null,a=Math.max(s?s.width:0,r?r.width:0),o=Math.max(s?s.height:0,r?r.height:0),c=ku();c.width=a,c.height=o;let l=c.getContext("2d",{willReadFrequently:!0});l.fillStyle="#00ffff",l.fillRect(0,0,a,o);let h=l.getImageData(0,0,a,o);if(s){l.drawImage(s,0,0,a,o);let f=n(e),m=l.getImageData(0,0,a,o).data;for(let _=2;_<m.length;_+=4)h.data[_]=f(m[_]/256)*256}if(r){l.drawImage(r,0,0,a,o);let f=n(t),m=l.getImageData(0,0,a,o).data;for(let _=1;_<m.length;_+=4)h.data[_]=f(m[_]/256)*256}l.putImageData(h,0,0);let d=(e||t).clone();return d.source=new Si(c),d.colorSpace=zn,d.channel=(e||t).channel,e&&t&&e.channel!==t.channel&&console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match."),console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures."),d}async buildNormalMapTextureAsync(e,t,n){e instanceof Yi&&(e=await this.decompressTextureAsync(e));let s=e.image,r=ku();r.width=s.width,r.height=s.height;let a=r.getContext("2d",{willReadFrequently:!0});a.drawImage(s,0,0,r.width,r.height);let o=a.getImageData(0,0,r.width,r.height),c=o.data;for(let h=0;h<c.length;h+=4)t&&(c[h+0]=255-c[h+0]),n&&(c[h+1]=255-c[h+1]);a.putImageData(o,0,0);let l=e.clone();return l.source=new Si(r),l}async decompressTextureAsync(e,t=1/0){if(this.textureUtils===null)throw new Error("THREE.GLTFExporter: setTextureUtils() must be called to process compressed textures.");return await this.textureUtils.decompress(e,t)}processBuffer(e){let t=this.json,n=this.buffers;return t.buffers||(t.buffers=[{byteLength:0}]),n.push(e),0}processBufferView(e,t,n,s,r){let a=this.json;a.bufferViews||(a.bufferViews=[]);let o;switch(t){case it.BYTE:case it.UNSIGNED_BYTE:o=1;break;case it.SHORT:case it.UNSIGNED_SHORT:o=2;break;default:o=4}let c=e.itemSize*o;r===it.ARRAY_BUFFER&&(c=Math.ceil(c/4)*4);let l=cm(s*c),h=new DataView(new ArrayBuffer(l)),u=0;for(let m=n;m<n+s;m++){for(let _=0;_<e.itemSize;_++){let g;e.itemSize>4?g=e.array[m*e.itemSize+_]:(_===0?g=e.getX(m):_===1?g=e.getY(m):_===2?g=e.getZ(m):_===3&&(g=e.getW(m)),e.normalized===!0&&(g=ct.normalize(g,e.array))),t===it.FLOAT?h.setFloat32(u,g,!0):t===it.INT?h.setInt32(u,g,!0):t===it.UNSIGNED_INT?h.setUint32(u,g,!0):t===it.SHORT?h.setInt16(u,g,!0):t===it.UNSIGNED_SHORT?h.setUint16(u,g,!0):t===it.BYTE?h.setInt8(u,g):t===it.UNSIGNED_BYTE&&h.setUint8(u,g),u+=o}u%c!==0&&(u+=c-u%c)}let d={buffer:this.processBuffer(h.buffer),byteOffset:this.byteOffset,byteLength:l};return r!==void 0&&(d.target=r),r===it.ARRAY_BUFFER&&(d.byteStride=c),this.byteOffset+=l,a.bufferViews.push(d),{id:a.bufferViews.length-1,byteLength:0}}processBufferViewImage(e){let t=this,n=t.json;return n.bufferViews||(n.bufferViews=[]),new Promise(function(s){let r=new FileReader;r.readAsArrayBuffer(e),r.onloadend=function(){let a=zu(r.result),o={buffer:t.processBuffer(a),byteOffset:t.byteOffset,byteLength:a.byteLength};t.byteOffset+=a.byteLength,s(n.bufferViews.push(o)-1)}})}processAccessor(e,t,n,s){let r=this.json,a={1:"SCALAR",2:"VEC2",3:"VEC3",4:"VEC4",9:"MAT3",16:"MAT4"},o;if(e.array.constructor===Float32Array)o=it.FLOAT;else if(e.array.constructor===Int32Array)o=it.INT;else if(e.array.constructor===Uint32Array)o=it.UNSIGNED_INT;else if(e.array.constructor===Int16Array)o=it.SHORT;else if(e.array.constructor===Uint16Array)o=it.UNSIGNED_SHORT;else if(e.array.constructor===Int8Array)o=it.BYTE;else if(e.array.constructor===Uint8Array)o=it.UNSIGNED_BYTE;else throw new Error("THREE.GLTFExporter: Unsupported bufferAttribute component type: "+e.array.constructor.name);if(n===void 0&&(n=0),(s===void 0||s===1/0)&&(s=e.count),s===0)return null;let c=W1(e,n,s),l;t!==void 0&&(l=e===t.index?it.ELEMENT_ARRAY_BUFFER:it.ARRAY_BUFFER);let h=this.processBufferView(e,o,n,s,l),u={bufferView:h.id,byteOffset:h.byteOffset,componentType:o,count:s,max:c.max,min:c.min,type:a[e.itemSize]};return e.normalized===!0&&(u.normalized=!0),r.accessors||(r.accessors=[]),r.accessors.push(u)-1}processImage(e,t,n,s="image/png"){if(e!==null){let r=this,a=r.cache,o=r.json,c=r.options,l=r.pending;a.images.has(e)||a.images.set(e,{});let h=a.images.get(e),u=s+":flipY/"+n.toString();if(h[u]!==void 0)return h[u];o.images||(o.images=[]);let d={mimeType:s},f=ku();f.width=Math.min(e.width,c.maxTextureSize),f.height=Math.min(e.height,c.maxTextureSize);let m=f.getContext("2d",{willReadFrequently:!0});if(n===!0&&(m.translate(0,f.height),m.scale(1,-1)),e.data!==void 0){t!==on&&console.error("GLTFExporter: Only RGBAFormat is supported.",t),(e.width>c.maxTextureSize||e.height>c.maxTextureSize)&&console.warn("GLTFExporter: Image size is bigger than maxTextureSize",e);let g=new Uint8ClampedArray(e.height*e.width*4);for(let p=0;p<g.length;p+=4)g[p+0]=e.data[p+0],g[p+1]=e.data[p+1],g[p+2]=e.data[p+2],g[p+3]=e.data[p+3];m.putImageData(new ImageData(g,e.width,e.height),0,0)}else if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas)m.drawImage(e,0,0,f.width,f.height);else throw new Error("THREE.GLTFExporter: Invalid image type. Use HTMLImageElement, HTMLCanvasElement, ImageBitmap or OffscreenCanvas.");c.binary===!0?l.push(X1(f,s).then(g=>r.processBufferViewImage(g)).then(g=>{d.bufferView=g})):d.uri=ar.getDataURL(f,s);let _=o.images.push(d)-1;return h[u]=_,_}else throw new Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.")}processSampler(e){let t=this.json;t.samplers||(t.samplers=[]);let n={magFilter:Mn[e.magFilter],minFilter:Mn[e.minFilter],wrapS:Mn[e.wrapS],wrapT:Mn[e.wrapT]};return t.samplers.push(n)-1}async processTextureAsync(e){let n=this.options,s=this.cache,r=this.json;if(s.textures.has(e))return s.textures.get(e);r.textures||(r.textures=[]),e instanceof Yi&&(e=await this.decompressTextureAsync(e,n.maxTextureSize));let a=e.userData.mimeType,o=this.processImage(e.image,e.format,e.flipY,a),c={sampler:this.processSampler(e)};a==="image/webp"?(c.extensions=c.extensions||{},c.extensions.EXT_texture_webp={source:o},this.extensionsUsed.EXT_texture_webp=!0,this.extensionsRequired.EXT_texture_webp=!0):c.source=o,e.name&&(c.name=e.name),await this._invokeAllAsync(async function(h){h.writeTexture&&await h.writeTexture(e,c)});let l=r.textures.push(c)-1;return s.textures.set(e,l),l}async processMaterialAsync(e,t){let n=this.cache,s=this.json,r=t!==void 0&&t.hasAttribute("tangent"),a=e.normalMap?e.uuid+":"+r:e.uuid;if(n.materials.has(a))return n.materials.get(a);if(e.isShaderMaterial)return console.warn("GLTFExporter: THREE.ShaderMaterial not supported."),null;s.materials||(s.materials=[]);let o={pbrMetallicRoughness:{}};e.isMeshStandardMaterial!==!0&&e.isMeshBasicMaterial!==!0&&console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");let c=e.color.toArray().concat([e.opacity]);if(Ti(c,[1,1,1,1])||(o.pbrMetallicRoughness.baseColorFactor=c),e.isMeshStandardMaterial?(o.pbrMetallicRoughness.metallicFactor=e.metalness,o.pbrMetallicRoughness.roughnessFactor=e.roughness):(o.pbrMetallicRoughness.metallicFactor=0,o.pbrMetallicRoughness.roughnessFactor=1),e.metalnessMap||e.roughnessMap){let h=await this.buildMetalRoughTextureAsync(e.metalnessMap,e.roughnessMap),u={index:await this.processTextureAsync(h),texCoord:h.channel};this.applyTextureTransform(u,h),o.pbrMetallicRoughness.metallicRoughnessTexture=u}if(e.map){let h={index:await this.processTextureAsync(e.map),texCoord:e.map.channel};this.applyTextureTransform(h,e.map),o.pbrMetallicRoughness.baseColorTexture=h}if(e.emissive){let h=e.emissive;if(Math.max(h.r,h.g,h.b)>0&&(o.emissiveFactor=e.emissive.toArray()),e.emissiveMap){let d={index:await this.processTextureAsync(e.emissiveMap),texCoord:e.emissiveMap.channel};this.applyTextureTransform(d,e.emissiveMap),o.emissiveTexture=d}}if(e.normalMap){let h=e.normalScale,u=h.x<0,d=r?h.y<0:h.y>0,f=e.normalMap;(u||d)&&(f=await this.buildNormalMapTextureAsync(e.normalMap,u,d));let m={index:await this.processTextureAsync(f),texCoord:e.normalMap.channel};Math.abs(h.x)!==1&&(m.scale=Math.abs(h.x)),this.applyTextureTransform(m,e.normalMap),o.normalTexture=m}if(e.aoMap){let h={index:await this.processTextureAsync(e.aoMap),texCoord:e.aoMap.channel};e.aoMapIntensity!==1&&(h.strength=e.aoMapIntensity),this.applyTextureTransform(h,e.aoMap),o.occlusionTexture=h}e.transparent?o.alphaMode="BLEND":e.alphaTest>0&&(o.alphaMode="MASK",o.alphaCutoff=e.alphaTest),e.side===en&&(o.doubleSided=!0),e.name!==""&&(o.name=e.name),this.serializeUserData(e,o),await this._invokeAllAsync(async function(h){h.writeMaterialAsync&&await h.writeMaterialAsync(e,o)});let l=s.materials.push(o)-1;return n.materials.set(a,l),l}async processMeshAsync(e){let t=this.cache,n=this.json,s=[e.geometry.uuid];if(Array.isArray(e.material))for(let x=0,E=e.material.length;x<E;x++)s.push(e.material[x].uuid);else s.push(e.material.uuid);let r=s.join(":");if(t.meshes.has(r))return t.meshes.get(r);let a=e.geometry,o;e.isLineSegments?o=it.LINES:e.isLineLoop?o=it.LINE_LOOP:e.isLine?o=it.LINE_STRIP:e.isPoints?o=it.POINTS:o=e.material.wireframe?it.LINES:it.TRIANGLES;let c={},l={},h=[],u=[],d={uv:"TEXCOORD_0",uv1:"TEXCOORD_1",uv2:"TEXCOORD_2",uv3:"TEXCOORD_3",color:"COLOR_0",skinWeight:"WEIGHTS_0",skinIndex:"JOINTS_0"},f=a.getAttribute("normal");f!==void 0&&!this.isNormalizedNormalAttribute(f)&&(console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."),a.setAttribute("normal",this.createNormalizedNormalAttribute(f)));let m=null;for(let x in a.attributes){if(x.slice(0,5)==="morph")continue;let E=a.attributes[x];if(x=d[x]||x.toUpperCase(),!/^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(x)&&!x.startsWith("_")&&(x="_"+x),t.attributes.has(this.getUID(E))){l[x]=t.attributes.get(this.getUID(E));continue}m=null;let C=E.array;x==="JOINTS_0"&&!(C instanceof Uint16Array)&&!(C instanceof Uint8Array)?(console.warn('GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.'),m=is.Utils.toTypedBufferAttribute(E,Uint16Array)):(C instanceof Uint32Array||C instanceof Int32Array)&&!x.startsWith("_")&&(console.warn(`GLTFExporter: Attribute "${x}" converted to type FLOAT.`),m=is.Utils.toTypedBufferAttribute(E,Float32Array));let y=this.processAccessor(m||E,a);y!==null&&(x.startsWith("_")||this.detectMeshQuantization(x,E),l[x]=y,t.attributes.set(this.getUID(E),y))}if(f!==void 0&&a.setAttribute("normal",f),Object.keys(l).length===0)return null;if(e.morphTargetInfluences!==void 0&&e.morphTargetInfluences.length>0){let x=[],E=[],w={};if(e.morphTargetDictionary!==void 0)for(let C in e.morphTargetDictionary)w[e.morphTargetDictionary[C]]=C;for(let C=0;C<e.morphTargetInfluences.length;++C){let y={},A=!1;for(let D in a.morphAttributes){if(D!=="position"&&D!=="normal"){A||(console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."),A=!0);continue}let T=a.morphAttributes[D][C],I=D.toUpperCase(),B=a.attributes[D];if(t.attributes.has(this.getUID(T,!0))){y[I]=t.attributes.get(this.getUID(T,!0));continue}let F=T.clone();if(!a.morphTargetsRelative)for(let U=0,X=T.count;U<X;U++)for(let H=0;H<T.itemSize;H++)H===0&&F.setX(U,T.getX(U)-B.getX(U)),H===1&&F.setY(U,T.getY(U)-B.getY(U)),H===2&&F.setZ(U,T.getZ(U)-B.getZ(U)),H===3&&F.setW(U,T.getW(U)-B.getW(U));y[I]=this.processAccessor(F,a),t.attributes.set(this.getUID(B,!0),y[I])}u.push(y),x.push(e.morphTargetInfluences[C]),e.morphTargetDictionary!==void 0&&E.push(w[C])}c.weights=x,E.length>0&&(c.extras={},c.extras.targetNames=E)}let _=Array.isArray(e.material);if(_&&a.groups.length===0)return null;let g=!1;if(_&&a.index===null){let x=[];for(let E=0,w=a.attributes.position.count;E<w;E++)x[E]=E;a.setIndex(x),g=!0}let p=_?e.material:[e.material],b=_?a.groups:[{materialIndex:0,start:void 0,count:void 0}];for(let x=0,E=b.length;x<E;x++){let w={mode:o,attributes:l};if(this.serializeUserData(a,w),u.length>0&&(w.targets=u),a.index!==null){let y=this.getUID(a.index);(b[x].start!==void 0||b[x].count!==void 0)&&(y+=":"+b[x].start+":"+b[x].count),t.attributes.has(y)?w.indices=t.attributes.get(y):(w.indices=this.processAccessor(a.index,a,b[x].start,b[x].count),t.attributes.set(y,w.indices)),w.indices===null&&delete w.indices}let C=await this.processMaterialAsync(p[b[x].materialIndex],a);C!==null&&(w.material=C),h.push(w)}g===!0&&a.setIndex(null),c.primitives=h,n.meshes||(n.meshes=[]),await this._invokeAllAsync(function(x){x.writeMesh&&x.writeMesh(e,c)});let M=n.meshes.push(c)-1;return t.meshes.set(r,M),M}detectMeshQuantization(e,t){if(this.extensionsUsed[Bu])return;let n;switch(t.array.constructor){case Int8Array:n="byte";break;case Uint8Array:n="unsigned byte";break;case Int16Array:n="short";break;case Uint16Array:n="unsigned short";break;default:return}t.normalized&&(n+=" normalized");let s=e.split("_",1)[0];sm[s]&&sm[s].includes(n)&&(this.extensionsUsed[Bu]=!0,this.extensionsRequired[Bu]=!0)}processCamera(e){let t=this.json;t.cameras||(t.cameras=[]);let n=e.isOrthographicCamera,s={type:n?"orthographic":"perspective"};return n?s.orthographic={xmag:e.right*2,ymag:e.top*2,zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near}:s.perspective={aspectRatio:e.aspect,yfov:ct.degToRad(e.fov),zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near},e.name!==""&&(s.name=e.type),t.cameras.push(s)-1}processAnimation(e,t){let n=this.json,s=this.nodeMap;n.animations||(n.animations=[]),e=is.Utils.mergeMorphTargetTracks(e.clone(),t);let r=e.tracks,a=[],o=[];for(let l=0;l<r.length;++l){let h=r[l],u=lt.parseTrackName(h.name),d=lt.findNode(t,u.nodeName),f=rm[u.propertyName];if(u.objectName==="bones"&&(d.isSkinnedMesh===!0?d=d.skeleton.getBoneByName(u.objectIndex):d=void 0),!d||!f){console.warn('THREE.GLTFExporter: Could not export animation track "%s".',h.name);continue}let m=1,_=h.values.length/h.times.length;f===rm.morphTargetInfluences&&(_/=d.morphTargetInfluences.length);let g;h.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline===!0?(g="CUBICSPLINE",_/=3):h.getInterpolation()===xs?g="STEP":g="LINEAR",o.push({input:this.processAccessor(new Mt(h.times,m)),output:this.processAccessor(new Mt(h.values,_)),interpolation:g}),a.push({sampler:o.length-1,target:{node:s.get(d),path:f}})}let c={name:e.name||"clip_"+n.animations.length,samplers:o,channels:a};return this.serializeUserData(e,c),n.animations.push(c),n.animations.length-1}processSkin(e){let t=this.json,n=this.nodeMap,s=t.nodes[n.get(e)],r=e.skeleton;if(r===void 0)return null;let a=e.skeleton.bones[0];if(a===void 0)return null;let o=[],c=new Float32Array(r.bones.length*16),l=new nt;for(let u=0;u<r.bones.length;++u)o.push(n.get(r.bones[u])),l.copy(r.boneInverses[u]),l.multiply(e.bindMatrix).toArray(c,u*16);return t.skins===void 0&&(t.skins=[]),t.skins.push({inverseBindMatrices:this.processAccessor(new Mt(c,16)),joints:o,skeleton:n.get(a)}),s.skin=t.skins.length-1}async processNodeAsync(e){let t=this.json,n=this.options,s=this.nodeMap;if(t.nodes||(t.nodes=[]),e.pivot!==null)return await this._processNodeWithPivotAsync(e);let r={};if(n.trs){let o=e.quaternion.toArray(),c=e.position.toArray(),l=e.scale.toArray();Ti(o,[0,0,0,1])||(r.rotation=o),Ti(c,[0,0,0])||(r.translation=c),Ti(l,[1,1,1])||(r.scale=l)}else e.matrixAutoUpdate&&e.updateMatrix(),G1(e.matrix)===!1&&(r.matrix=e.matrix.elements);if(e.name!==""&&(r.name=String(e.name)),this.serializeUserData(e,r),e.isMesh||e.isLine||e.isPoints){let o=await this.processMeshAsync(e);o!==null&&(r.mesh=o)}else e.isCamera&&(r.camera=this.processCamera(e));e.isSkinnedMesh&&this.skins.push(e);let a=t.nodes.push(r)-1;if(s.set(e,a),e.children.length>0){let o=[];for(let c=0,l=e.children.length;c<l;c++){let h=e.children[c];if(h.visible||n.onlyVisible===!1){let u=await this.processNodeAsync(h);u!==null&&o.push(u)}}o.length>0&&(r.children=o)}return await this._invokeAllAsync(function(o){o.writeNode&&o.writeNode(e,r)}),a}async _processNodeWithPivotAsync(e){let t=this.json,n=this.options,s=this.nodeMap,r=e.pivot,a={},o=e.quaternion.toArray(),c=[e.position.x+r.x,e.position.y+r.y,e.position.z+r.z],l=e.scale.toArray();Ti(o,[0,0,0,1])||(a.rotation=o),Ti(c,[0,0,0])||(a.translation=c),Ti(l,[1,1,1])||(a.scale=l),a.extras={pivot:r.toArray()},e.name!==""&&(a.name=String(e.name)),this.serializeUserData(e,a);let h=t.nodes.push(a)-1;s.set(e,h);let u={},d=[-r.x,-r.y,-r.z];if(Ti(d,[0,0,0])||(u.translation=d),e.isMesh||e.isLine||e.isPoints){let _=await this.processMeshAsync(e);_!==null&&(u.mesh=_)}else e.isCamera&&(u.camera=this.processCamera(e));e.isSkinnedMesh&&this.skins.push(e);let m=[t.nodes.push(u)-1];if(e.children.length>0){let _=[];for(let g=0,p=e.children.length;g<p;g++){let b=e.children[g];if(b.visible||n.onlyVisible===!1){let M=await this.processNodeAsync(b);M!==null&&_.push(M)}}_.length>0&&(u.children=_)}return a.children=m,await this._invokeAllAsync(function(_){_.writeNode&&_.writeNode(e,a)}),h}async processSceneAsync(e){let t=this.json,n=this.options;t.scenes||(t.scenes=[],t.scene=0);let s={};e.name!==""&&(s.name=e.name),t.scenes.push(s);let r=[];for(let a=0,o=e.children.length;a<o;a++){let c=e.children[a];if(c.visible||n.onlyVisible===!1){let l=await this.processNodeAsync(c);l!==null&&r.push(l)}}r.length>0&&(s.nodes=r),this.serializeUserData(e,s)}async processObjectsAsync(e){let t=new Tn;t.name="AuxScene";for(let n=0;n<e.length;n++)t.children.push(e[n]);await this.processSceneAsync(t)}async processInputAsync(e){let t=this.options;e=e instanceof Array?e:[e],await this._invokeAllAsync(function(s){s.beforeParse&&s.beforeParse(e)});let n=[];for(let s=0;s<e.length;s++)e[s]instanceof Tn?await this.processSceneAsync(e[s]):n.push(e[s]);n.length>0&&await this.processObjectsAsync(n);for(let s=0;s<this.skins.length;++s)this.processSkin(this.skins[s]);if(e.length===1)for(let s=0;s<t.animations.length;++s)this.processAnimation(t.animations[s],e[0]);else for(let s=0;s<e.length;s++){let r=t.animations[s]||[];for(let a=0;a<r.length;++a)this.processAnimation(r[a],e[s])}await this._invokeAllAsync(function(s){s.afterParse&&s.afterParse(e)})}async _invokeAllAsync(e){for(let t=0,n=this.plugins.length;t<n;t++)await e(this.plugins[t])}},Hu=class{constructor(e){this.writer=e,this.name="KHR_lights_punctual"}writeNode(e,t){if(!e.isLight)return;if(!e.isDirectionalLight&&!e.isPointLight&&!e.isSpotLight){console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.",e);return}let n=this.writer,s=n.json,r=n.extensionsUsed,a={};e.name&&(a.name=e.name),a.color=e.color.toArray(),a.intensity=e.intensity,e.isDirectionalLight?a.type="directional":e.isPointLight?(a.type="point",e.distance>0&&(a.range=e.distance)):e.isSpotLight&&(a.type="spot",e.distance>0&&(a.range=e.distance),a.spot={},a.spot.innerConeAngle=(1-e.penumbra)*e.angle,a.spot.outerConeAngle=e.angle),e.decay!==void 0&&e.decay!==2&&console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."),e.target&&(e.target.parent!==e||e.target.position.x!==0||e.target.position.y!==0||e.target.position.z!==-1)&&console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."),r[this.name]||(s.extensions=s.extensions||{},s.extensions[this.name]={lights:[]},r[this.name]=!0);let o=s.extensions[this.name].lights;o.push(a),t.extensions=t.extensions||{},t.extensions[this.name]={light:o.length-1}}},Gu=class{constructor(e){this.writer=e,this.name="KHR_materials_unlit"}async writeMaterialAsync(e,t){if(!e.isMeshBasicMaterial)return;let s=this.writer.extensionsUsed;t.extensions=t.extensions||{},t.extensions[this.name]={},s[this.name]=!0,t.pbrMetallicRoughness.metallicFactor=0,t.pbrMetallicRoughness.roughnessFactor=.9}},Wu=class{constructor(e){this.writer=e,this.name="KHR_materials_clearcoat"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.clearcoat===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.clearcoatFactor=e.clearcoat,e.clearcoatMap){let a={index:await n.processTextureAsync(e.clearcoatMap),texCoord:e.clearcoatMap.channel};n.applyTextureTransform(a,e.clearcoatMap),r.clearcoatTexture=a}if(r.clearcoatRoughnessFactor=e.clearcoatRoughness,e.clearcoatRoughnessMap){let a={index:await n.processTextureAsync(e.clearcoatRoughnessMap),texCoord:e.clearcoatRoughnessMap.channel};n.applyTextureTransform(a,e.clearcoatRoughnessMap),r.clearcoatRoughnessTexture=a}if(e.clearcoatNormalMap){let a={index:await n.processTextureAsync(e.clearcoatNormalMap),texCoord:e.clearcoatNormalMap.channel};e.clearcoatNormalScale.x!==1&&(a.scale=e.clearcoatNormalScale.x),n.applyTextureTransform(a,e.clearcoatNormalMap),r.clearcoatNormalTexture=a}t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Xu=class{constructor(e){this.writer=e,this.name="KHR_materials_dispersion"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.dispersion===0)return;let s=this.writer.extensionsUsed,r={};r.dispersion=e.dispersion,t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},qu=class{constructor(e){this.writer=e,this.name="KHR_materials_iridescence"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.iridescence===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.iridescenceFactor=e.iridescence,e.iridescenceMap){let a={index:await n.processTextureAsync(e.iridescenceMap),texCoord:e.iridescenceMap.channel};n.applyTextureTransform(a,e.iridescenceMap),r.iridescenceTexture=a}if(r.iridescenceIor=e.iridescenceIOR,r.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],r.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1],e.iridescenceThicknessMap){let a={index:await n.processTextureAsync(e.iridescenceThicknessMap),texCoord:e.iridescenceThicknessMap.channel};n.applyTextureTransform(a,e.iridescenceThicknessMap),r.iridescenceThicknessTexture=a}t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Zu=class{constructor(e){this.writer=e,this.name="KHR_materials_transmission"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.transmissionFactor=e.transmission,e.transmissionMap){let a={index:await n.processTextureAsync(e.transmissionMap),texCoord:e.transmissionMap.channel};n.applyTextureTransform(a,e.transmissionMap),r.transmissionTexture=a}t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Yu=class{constructor(e){this.writer=e,this.name="KHR_materials_volume"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.thicknessFactor=e.thickness,e.thicknessMap){let a={index:await n.processTextureAsync(e.thicknessMap),texCoord:e.thicknessMap.channel};n.applyTextureTransform(a,e.thicknessMap),r.thicknessTexture=a}e.attenuationDistance!==1/0&&(r.attenuationDistance=e.attenuationDistance),r.attenuationColor=e.attenuationColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Ju=class{constructor(e){this.writer=e,this.name="KHR_materials_ior"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.ior===1.5)return;let s=this.writer.extensionsUsed,r={};r.ior=e.ior,t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},$u=class{constructor(e){this.writer=e,this.name="KHR_materials_specular"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.specularIntensity===1&&e.specularColor.equals(O1)&&!e.specularIntensityMap&&!e.specularColorMap)return;let n=this.writer,s=n.extensionsUsed,r={};if(e.specularIntensityMap){let a={index:await n.processTextureAsync(e.specularIntensityMap),texCoord:e.specularIntensityMap.channel};n.applyTextureTransform(a,e.specularIntensityMap),r.specularTexture=a}if(e.specularColorMap){let a={index:await n.processTextureAsync(e.specularColorMap),texCoord:e.specularColorMap.channel};n.applyTextureTransform(a,e.specularColorMap),r.specularColorTexture=a}r.specularFactor=e.specularIntensity,r.specularColorFactor=e.specularColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Ku=class{constructor(e){this.writer=e,this.name="KHR_materials_sheen"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.sheen==0)return;let n=this.writer,s=n.extensionsUsed,r={};if(e.sheenRoughnessMap){let a={index:await n.processTextureAsync(e.sheenRoughnessMap),texCoord:e.sheenRoughnessMap.channel};n.applyTextureTransform(a,e.sheenRoughnessMap),r.sheenRoughnessTexture=a}if(e.sheenColorMap){let a={index:await n.processTextureAsync(e.sheenColorMap),texCoord:e.sheenColorMap.channel};n.applyTextureTransform(a,e.sheenColorMap),r.sheenColorTexture=a}r.sheenRoughnessFactor=e.sheenRoughness,r.sheenColorFactor=e.sheenColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},ju=class{constructor(e){this.writer=e,this.name="KHR_materials_anisotropy"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.anisotropy==0)return;let n=this.writer,s=n.extensionsUsed,r={};if(e.anisotropyMap){let a={index:await n.processTextureAsync(e.anisotropyMap)};n.applyTextureTransform(a,e.anisotropyMap),r.anisotropyTexture=a}r.anisotropyStrength=e.anisotropy,r.anisotropyRotation=e.anisotropyRotation,t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},Qu=class{constructor(e){this.writer=e,this.name="KHR_materials_emissive_strength"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.emissiveIntensity===1)return;let s=this.writer.extensionsUsed,r={};r.emissiveStrength=e.emissiveIntensity,t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},ed=class{constructor(e){this.writer=e,this.name="EXT_materials_bump"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.bumpScale===1&&!e.bumpMap)return;let n=this.writer,s=n.extensionsUsed,r={};if(e.bumpMap){let a={index:await n.processTextureAsync(e.bumpMap),texCoord:e.bumpMap.channel};n.applyTextureTransform(a,e.bumpMap),r.bumpTexture=a}r.bumpFactor=e.bumpScale,t.extensions=t.extensions||{},t.extensions[this.name]=r,s[this.name]=!0}},td=class{constructor(e){this.writer=e,this.name="EXT_mesh_gpu_instancing"}writeNode(e,t){if(!e.isInstancedMesh)return;let n=this.writer,s=e,r=new Float32Array(s.count*3),a=new Float32Array(s.count*4),o=new Float32Array(s.count*3),c=new nt,l=new z,h=new wn,u=new z;for(let f=0;f<s.count;f++)s.getMatrixAt(f,c),c.decompose(l,h,u),l.toArray(r,f*3),h.toArray(a,f*4),u.toArray(o,f*3);let d={TRANSLATION:n.processAccessor(new Mt(r,3)),ROTATION:n.processAccessor(new Mt(a,4)),SCALE:n.processAccessor(new Mt(o,3))};s.instanceColor&&(d._COLOR_0=n.processAccessor(s.instanceColor)),t.extensions=t.extensions||{},t.extensions[this.name]={attributes:d},n.extensionsUsed[this.name]=!0,n.extensionsRequired[this.name]=!0}};is.Utils={insertKeyframe:function(i,e){let n=i.getValueSize(),s=new i.TimeBufferType(i.times.length+1),r=new i.ValueBufferType(i.values.length+n),a=i.createInterpolant(new i.ValueBufferType(n)),o;if(i.times.length===0){s[0]=e;for(let c=0;c<n;c++)r[c]=0;o=0}else if(e<i.times[0]){if(Math.abs(i.times[0]-e)<.001)return 0;s[0]=e,s.set(i.times,1),r.set(a.evaluate(e),0),r.set(i.values,n),o=0}else if(e>i.times[i.times.length-1]){if(Math.abs(i.times[i.times.length-1]-e)<.001)return i.times.length-1;s[s.length-1]=e,s.set(i.times,0),r.set(i.values,0),r.set(a.evaluate(e),i.values.length),o=s.length-1}else for(let c=0;c<i.times.length;c++){if(Math.abs(i.times[c]-e)<.001)return c;if(i.times[c]<e&&i.times[c+1]>e){s.set(i.times.slice(0,c+1),0),s[c+1]=e,s.set(i.times.slice(c+1),c+2),r.set(i.values.slice(0,(c+1)*n),0),r.set(a.evaluate(e),(c+1)*n),r.set(i.values.slice((c+1)*n),(c+2)*n),o=c+1;break}}return i.times=s,i.values=r,o},mergeMorphTargetTracks:function(i,e){let t=[],n={},s=i.tracks;for(let r=0;r<s.length;++r){let a=s[r],o=lt.parseTrackName(a.name),c=lt.findNode(e,o.nodeName);if(o.propertyName!=="morphTargetInfluences"||o.propertyIndex===void 0){t.push(a);continue}if(a.createInterpolant!==a.InterpolantFactoryMethodDiscrete&&a.createInterpolant!==a.InterpolantFactoryMethodLinear){if(a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)throw new Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead."),a=a.clone(),a.setInterpolation(nr)}let l=c.morphTargetInfluences.length,h=c.morphTargetDictionary[o.propertyIndex];if(h===void 0)throw new Error("THREE.GLTFExporter: Morph target name not found: "+o.propertyIndex);let u;if(n[c.uuid]===void 0){u=a.clone();let f=new u.ValueBufferType(l*u.times.length);for(let m=0;m<u.times.length;m++)f[m*l+h]=u.values[m];u.name=(o.nodeName||"")+".morphTargetInfluences",u.values=f,n[c.uuid]=u,t.push(u);continue}let d=a.createInterpolant(new a.ValueBufferType(1));u=n[c.uuid];for(let f=0;f<u.times.length;f++)u.values[f*l+h]=d.evaluate(u.times[f]);for(let f=0;f<a.times.length;f++){let m=this.insertKeyframe(u,a.times[f]);u.values[m*l+h]=a.values[f]}}return i.tracks=t,i},toTypedBufferAttribute:function(i,e){let t=new Mt(new e(i.count*i.itemSize),i.itemSize,!1);if(!i.normalized&&!i.isInterleavedBufferAttribute)return t.array.set(i.array),t;for(let n=0,s=i.count;n<s;n++)for(let r=0;r<i.itemSize;r++)t.setComponent(n,r,i.getComponent(n,r));return t}};var eo=2.4000000000000004,Ts=3,nn=1.2,nd=Ts+nn,ml=Ts+nn*.68;function lm(i){return i<Ts?i:i<nd?3-1e-6:i-nn}var As=3,kn=As+.04,gl=kn+nn,hm=.42,Ai=2.1,ss=kn+Ai,Vn=ss+.08,Hn=.9,Ri=Vn+Hn,Rs=Ri+.08,Rr=.84,xl=Rs+Rr,Gn=xl+.05;var BE=Ri+.01,_l=i=>ct.clamp(i,0,1),oi=i=>{let e=_l(i);return e*e*(3-2*e)},rd=i=>oi(i),q1=new ke(16777215),um=new ke(9476257),id;function dm(i,e=0){let t={phase:i<As?"guide":i<kn?"point":i<ss?"outline":i<Vn?"fill":i<Ri?"extrude":i<Rs?"white":i<xl?"color":"solid",guideProgress:oi(i/eo),guideOpacity:oi(i/(3*.28))*(1-oi((i-Vn)/(Hn*.7))),stroke:_l((i-kn)/Ai),fill:oi((i-ss)/.08),extrusion:oi((i-Vn)/Hn),tint:oi((i-Rs)/Rr),flatness:0,complete:i>=xl,lineOpacity:1-oi((i-(Vn+Hn/6))/(Hn*5/6))};return e>0&&i>=Ri&&(t.phase=e>=1?"flat":"flattening",t.flatness=rd(e),t.extrusion=1-t.flatness,t.fill=1,t.lineOpacity=0),t}function fm(i){let{minX:e,maxX:t,minZ:n,maxZ:s}=i;return[{a:[e,n],b:[t,n]},{a:[t,s],b:[e,s]},{a:[e,s],b:[e,n]},{a:[t,n],b:[t,s]}]}function Z1(i,e){let t=fm(i),n=new Et;n.setAttribute("position",new Mt(new Float32Array(24),3).setUsage(br));let s=new Zi({color:11581375,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1}),r=new fr(n,s);if(r.name="SVG construction guide",r.renderOrder=2,r.frustumCulled=!1,r.userData={segments:t,mode:e,svgBounds:i,bounds:i,origins:t.map(({a})=>a),exits:t.map(({b:a})=>a)},e==="viewport"){let a=new fr(n.clone(),new Zi({color:16727100,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1}));a.name="Red guide sweep",a.renderOrder=3,a.frustumCulled=!1,a.visible=!1,r.add(a),r.userData.sweep=a}return r}function yl(i,e){let t=i.guide.userData,n=t.svgBounds,s=e?Math.min(1,(e.stepX/2-.1)/Math.max(Math.abs(n.minX),Math.abs(n.maxX)),(e.stepZ/2-.1)/Math.max(Math.abs(n.minZ),Math.abs(n.maxZ))):1;t.bounds=Object.fromEntries(Object.entries(n).map(([r,a])=>[r,a*s])),t.segments=fm(t.bounds),t.origins=t.segments.map(({a:r})=>r),t.exits=t.segments.map(({b:r})=>r)}function ad(i,e,t=0){let n=i.guide;if(n.userData.mode!=="viewport")return;i.group.updateWorldMatrix(!0,!1);let s=i.group.localToWorld(new z(0,.008,0)).y,r=new Zt(new z(0,1,0),-s),a=new wi,o=[];for(let l of[-1.06,1.06])for(let h of[-1.06,1.06+t]){a.setFromCamera(new de(l,h),e);let u=a.ray.intersectPlane(r,new z);u&&o.push(i.group.worldToLocal(u))}if(o.length!==4)return;let c=new Rt().setFromPoints(o);n.userData.origins=n.userData.segments.map(({a:l,b:h})=>l[0]!==h[0]?[h[0]>l[0]?c.min.x:c.max.x,l[1]]:[l[0],h[1]>l[1]?c.min.z:c.max.z]),n.userData.exits=n.userData.segments.map(({a:l,b:h})=>l[0]!==h[0]?[h[0]>l[0]?c.max.x:c.min.x,l[1]]:[l[0],h[1]>l[1]?c.max.z:c.min.z]),n.userData.originScreens=n.userData.origins.map(([l,h])=>i.group.localToWorld(new z(l,.008,h)).project(e).toArray().slice(0,2)),n.userData.exitScreens=n.userData.exits.map(([l,h])=>i.group.localToWorld(new z(l,.008,h)).project(e).toArray().slice(0,2))}function Y1(i,e){if(i.visible=e.guideOpacity>0,i.material.opacity=e.guideOpacity,!i.visible)return;let t=i.geometry.attributes.position,n=e.guideProgress,s=i.userData.sweep,r=s?.geometry.attributes.position;s&&(s.visible=n>0&&n<1,s.material.opacity=e.guideOpacity),i.userData.segments.forEach(({a,b:o},c)=>{let l=n;if(s){let h=i.userData.origins[c],u=i.userData.exits[c],d=Math.hypot(o[0]-a[0],o[1]-a[1]),f=(o[0]-a[0])/d,m=(o[1]-a[1])/d,_=Math.hypot(u[0]-h[0],u[1]-h[1]),g=_*oi(n/.52),p=_*oi((n-.58)/.42);r.setXYZ(c*2,h[0]+f*p,.0085,h[1]+m*p),r.setXYZ(c*2+1,h[0]+f*g,.0085,h[1]+m*g);let b=(a[0]-h[0])*f+(a[1]-h[1])*m;l=_l((p-b)/d)}t.setXYZ(c*2,a[0],.008,a[1]),t.setXYZ(c*2+1,ct.lerp(a[0],o[0],l),.008,ct.lerp(a[1],o[1],l))}),t.needsUpdate=!0,r&&(r.needsUpdate=!0)}function vl(i){let e=i.guide.userData.sweep;return{enabled:!0,mode:i.guide.userData.mode,bounds:i.guide.userData.bounds,origins:i.guide.userData.origins,originScreens:i.guide.userData.originScreens,color:i.guide.material.color.getHexString(),visible:i.group.visible&&i.guide.visible,opacity:i.guide.material.opacity,sweep:e?{visible:i.group.visible&&i.guide.visible&&e.visible,color:e.material.color.getHexString(),points:Array.from(e.geometry.attributes.position.array),exits:i.guide.userData.exits,exitScreens:i.guide.userData.exitScreens}:null,progress:i.state.guideProgress,points:Array.from(i.guide.geometry.attributes.position.array)}}function Ml(i,e,t="edge"){let n=new fn;n.name=i.icon.id+"-drawing",n.position.copy(i.mesh.position),n.rotation.copy(i.mesh.rotation);let s=um.clone(),r=new ke(i.color),a=Z1(i.caster.svgBounds,t);a.visible=!1,n.add(a);let o=new Zi({color:s,transparent:!0,opacity:1,depthWrite:!1,toneMapped:!1}),c=[],l=0;for(let[d,f]of i.caster.contours.entries()){if(e){let p=e.lines[d],b=p.geometry.clone();b.setDrawRange(0,0);let M=new _s(b,o);M.renderOrder=3,M.userData={offset:l,count:p.userData.count},l+=p.userData.count,n.add(M),c.push(M);continue}let m=[];for(let p=0;p<f.points.length;p++){let b=f.points[p],M=f.points[(p+1)%f.points.length],x=Math.max(1,Math.ceil(Math.hypot(M[0]-b[0],M[1]-b[1])/.006));for(let E=0;E<x;E++)m.push(new z(ct.lerp(b[0],M[0],E/x),.012,ct.lerp(b[1],M[1],E/x)))}m.push(m[0].clone());let _=new Et().setFromPoints(m);_.setDrawRange(0,0);let g=new _s(_,o);g.renderOrder=3,g.userData={offset:l,count:m.length},l+=m.length,n.add(g),c.push(g)}let h=new pt(e?.dot.geometry||new Pa(.018,16,12),new Yt({color:s,transparent:!0,depthWrite:!1,depthTest:!1,toneMapped:!1}));if(h.position.fromBufferAttribute(c[0].geometry.attributes.position,0),h.renderOrder=4,n.add(h),!id){let d=document.createElement("canvas");d.width=d.height=64;let f=d.getContext("2d"),m=f.createRadialGradient(32,32,0,32,32,32);m.addColorStop(0,"rgba(255,255,255,.5)"),m.addColorStop(.3,"rgba(255,255,255,.18)"),m.addColorStop(1,"rgba(255,255,255,0)"),f.fillStyle=m,f.fillRect(0,0,64,64),id=new gn(d)}let u=new xa(new lr({map:id,color:s,transparent:!0,depthWrite:!1,depthTest:!1}));return u.position.copy(h.position),u.scale.setScalar(.18),n.add(u),{group:n,guide:a,lines:c,dot:h,halo:u,total:l,targetColor:r,active:!1,drawing:!1,sparkAt:-1/0,state:dm(0)}}function od(i,e,t,n,s=0){let r=i.reveal,a=r.guide.userData.mode==="viewport",o=a&&e>=Ts&&e<nd;if(a&&(e=lm(e)),r.group.visible=t,!t)return r.active=!1,r.drawing=!1,r.state;r.active=!0;let c=dm(e,s);r.state=c,o&&(c.phase="measure"),Y1(r.guide,c);for(let d of r.lines){let{offset:f,count:m}=d.userData;d.visible=c.lineOpacity>0,d.geometry.setDrawRange(0,ct.clamp(Math.floor(c.stroke*r.total-f),0,m)),d.position.y=i.caster.height*n*c.extrusion}r.lines[0].material.opacity=c.lineOpacity,r.lines[0].material.color.lerpColors(um,r.targetColor,c.tint),e>=As&&!r.drawing&&(r.sparkAt=performance.now(),r.drawing=!0),e<As&&(r.drawing=!1);let l=(performance.now()-r.sparkAt)/300,h=Math.sin(_l(l)*Math.PI),u=c.stroke===0?1:Math.max(0,1-l);return r.dot.visible=r.halo.visible=e>=As&&e<As+.18&&u>0,r.dot.material.opacity=u,r.dot.scale.setScalar(1+h*.8),r.halo.material.opacity=u*(.25+h*.7),c}function pm(i,e,t,n,s,r=0){let a=od(i,e,t,n,r);i.mesh.visible=t&&a.fill>0,i.shadow.visible=t&&a.extrusion>0,t&&(i.mesh.scale.y=Math.max(.001,a.extrusion)*n,i.mesh.material.opacity=a.fill,i.mesh.material.depthWrite=a.fill>.5,i.mesh.material.color.lerpColors(q1,i.reveal.targetColor,a.tint),i.mesh.material.emissive.copy(i.mesh.material.color),i.shadow.material.opacity=s,i.shadow.material.userData.shadowHeight.value=a.extrusion)}function Ci(i){let e=i>>>0;return()=>(e=Math.imul(e,1664525)+1013904223>>>0,e/4294967296)}var gm=.22,mm=5,Sl=class{constructor(){this.cells=new Map,this.maxRadius=0}add(e){let t=Math.floor(e.x/4)+":"+Math.floor(e.z/4);this.cells.has(t)||this.cells.set(t,[]),this.cells.get(t).push(e),this.maxRadius=Math.max(this.maxRadius,e.radius)}accepts(e,t=gm){let n=Math.floor(e.x/4),s=Math.floor(e.z/4),r=Math.ceil((e.radius+this.maxRadius+Math.max(t,mm))/4);for(let a=n-r;a<=n+r;a++)for(let o=s-r;o<=s+r;o++)for(let c of this.cells.get(a+":"+o)||[]){let l=e.sourceIndex!==void 0&&e.sourceIndex===c.sourceIndex;if(Math.hypot(e.x-c.x,e.z-c.z)<e.radius+c.radius+(l?mm:t))return!1}return!0}};function xm(i,e){let t=Ci(90317),n=new Sl,s=[],r=i?7.2:14,a=i?15:9,o={x:-3.5,z:i?10:5.7,radius:e[0]};s.push(o),n.add(o);for(let c=1;c<3;c++){let l=s[c-1],h=c===1?-.23:-.4,u=l.radius+e[c]+.5,d={x:l.x+Math.cos(h)*u,z:l.z+Math.sin(h)*u,radius:e[c]};s.push(d),n.add(d)}for(let c=3;c<33;c++){let l;for(let h=0;h<2e4;h++){let u=t()*Math.PI*2,d=Math.sqrt(t()),f=1+Math.floor(h/5e3)*.1,m={x:Math.cos(u)*r*d*f,z:Math.sin(u)*a*d*f,radius:e[c]};if(n.accepts(m)){l=m;break}}if(!l)throw new Error("Could not place icon "+c+" without overlap");s.push(l),n.add(l)}return s.map(c=>({...c,height:1+1.1*Math.exp(-2.4*((c.x/r)**2+(c.z/a)**2))}))}function _m(i,e){let t=Ci(192807),n=new Sl,s=[],r=e.map((l,h)=>({x:l.mesh.position.x,z:l.mesh.position.z,radius:l.radius,sourceIndex:h}));r.forEach(l=>n.add(l));let a=[],o=0;function c(){if(o===a.length){a=e.map((l,h)=>h),o=0;for(let l=a.length-1;l>0;l--){let h=Math.floor(t()*(l+1));[a[l],a[h]]=[a[h],a[l]]}}return a[o]}for(;r.length;){let l=Math.floor(t()*r.length),h=r[l],u=!1,d=c(),f=e[d].radius;for(let m=0;m<36;m++){let _=t()*Math.PI*2,g=(h.radius+f+gm)*(1+t()),p={x:h.x+Math.cos(_)*g,z:h.z+Math.sin(_)*g,radius:f,sourceIndex:d};if(!(p.x<i.left||p.x>i.right||p.z<i.back||p.z>i.front||!n.accepts(p))){p.rotation=0,n.add(p),r.push(p),s.push(p),o++,u=!0;break}}u||(r[l]=r[r.length-1],r.pop())}return s}var Cr=3,rs=.8,ym=Gn+nn+.45,Rn=[{start:0,tempo:1,measureDuration:nn,colorExtra:rs,duration:Gn+nn+rs},{start:ym,tempo:1,colorExtra:rs,duration:Gn+rs},{start:ym+Ri-.02,tempo:1,colorExtra:rs,duration:Gn+rs}],Wn=Rn[2].start+Ri,cd=Wn-.08,Sm=7.2,as=Wn+Sm+.52*Gn/.7+.27,Cn=as-1.05,Ii=as+1.55,J1=as+.8*(Ii-as),ci=Ii,$1=.48,bl=2+rs,ld=4.2,vm=7,Mm=4,hd=Cn+.45+rs,K1=[[kn,Ai,"outlineExtra"],[Vn,Hn,"extrusionExtra"],[Rs,Rr,"colorExtra"]];function bm(i){return i<Rn[1].start?0:i<Rn[2].start?1:2}function El(i){return Math.max(0,Math.min(1,(i-as)/(J1-as)))}function Em(i){return Rn[i]}function ud(i,e,t){let n=Math.max(0,Math.min(1,(i-e)/Math.max(.001,t-e))),s=Math.round(n*(vm-1)),r=s/(vm-1),a=(.76-r*.24)/.7,o=cd+Sm*r,c=(Vn-ss+(Rs-Ri))*a,l=(Cn-.65+.4*r-o-c)*$1,h=Math.round(r*(Mm-1)),u=h/(Mm-1),f=hd-bl-ld*(1-u)-o-c-l-Ai*a,m=l-Hn*a,_=bl-Rr*a;return{start:o-kn*a,tempo:a,waveStep:s,colorStep:h,outlineExtra:f,extrusionExtra:m,colorExtra:_,duration:a*Gn+f+m+_}}function Ir(i,e){let t=Math.max(0,i-e.start),n=e.tempo||e.duration/Gn,s=e.measureDuration||0;for(let[r,a,o]of K1){let c=e[o]||0;if(!c)continue;let l=r*n+s,h=a*n+c;if(t<=l)break;if(t<l+h)return r+s/n+(t-l)/h*a;t-=c}return t/n}function wm(i,e="grid",t=[]){if(e==="scattered")return xm(i,t);let n=i?[3,4,4,4,4,4,4,3,3]:[3,7,9,9,5],s=[];n.forEach((l,h)=>{for(let u=0;u<l;u++)s.push({x:(u-Math.floor(l/2))*(i?3.15:3.3),z:((n.length-1)/2-h)*(i?3.05:2.85)})});let r=s.splice(0,Cr),a=Ci(90317);for(let l=s.length-1;l>0;l--){let h=Math.floor(a()*(l+1));[s[l],s[h]]=[s[h],s[l]]}let o=Math.max(...[...r,...s].map(l=>Math.abs(l.x)))||1,c=Math.max(...[...r,...s].map(l=>Math.abs(l.z)))||1;return[...r,...s].map(l=>({...l,height:1+1.1*Math.exp(-2.4*((l.x/o)**2+(l.z/c)**2))}))}function wl(i){return{stepX:i?3.15:3.3,stepZ:i?3.05:2.85,originZ:i?12.2:5.7,offset:()=>0}}var Tl={value:0},dd={value:1},fd=1.15,Pr={value:0},Lr={value:1};function pd(i){let e=i.onBeforeCompile,t=i.customProgramCacheKey();return i.onBeforeCompile=function(n,s){e.call(this,n,s),Object.assign(n.uniforms,{gridNear:dd,gridFlat:Tl,gridRecession:Pr,gridInk:Lr}),n.vertexShader=`uniform float gridRecession; varying vec3 vGridView;
`+n.vertexShader,n.vertexShader=n.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
mvPosition.z-=gridRecession; gl_Position=projectionMatrix*mvPosition; vGridView=mvPosition.xyz;`),n.fragmentShader=`varying vec3 vGridView; uniform float gridNear,gridFlat,gridInk;
`+n.fragmentShader,n.fragmentShader=n.fragmentShader.replace("#include <opaque_fragment>",`
      float eye=length(vGridView);
      float distanceInk=1./(1.+${fd}*max(0.,eye/gridNear-1.));
      diffuseColor.a*=mix(1.,distanceInk*gridInk,gridFlat);
      #include <opaque_fragment>`)},i.customProgramCacheKey=()=>t+"-grid-distance",i}function Al(i){let e=i.onBeforeCompile,t=i.customProgramCacheKey();return i.onBeforeCompile=function(n,s){e.call(this,n,s),n.uniforms.flatFinish=Tl,n.fragmentShader=`uniform float flatFinish;
`+n.fragmentShader,n.fragmentShader=n.fragmentShader.replace("#include <opaque_fragment>",`outgoingLight=mix(outgoingLight,diffuseColor.rgb,flatFinish);
#include <opaque_fragment>`)},i.customProgramCacheKey=()=>t+"-flat-color-finish",pd(i)}function Tm(i,e,t){let n=null,s=new jt(1,1,{depthBuffer:!1}),r={image:{value:null},original:{value:null},blend:{value:1},step:{value:new de}},a=new Ft({uniforms:r,depthTest:!1,depthWrite:!1,toneMapped:!1,vertexShader:`varying vec2 uvAt;
      void main(){uvAt=uv;gl_Position=vec4(position.xy,0.,1.);}`,fragmentShader:`uniform sampler2D image,original;uniform float blend;uniform vec2 step;varying vec2 uvAt;
      void main(){
        vec4 color=texture2D(image,uvAt)*.2270270270;
        color+=(texture2D(image,uvAt+step)+texture2D(image,uvAt-step))*.1945945946;
        color+=(texture2D(image,uvAt+2.*step)+texture2D(image,uvAt-2.*step))*.1216216216;
        color+=(texture2D(image,uvAt+3.*step)+texture2D(image,uvAt-3.*step))*.0540540541;
        color+=(texture2D(image,uvAt+4.*step)+texture2D(image,uvAt-4.*step))*.0162162162;
        gl_FragColor=mix(texture2D(original,uvAt),color,blend);
      }`}),o=new Tn,c=new ni(-1,1,1,-1,0,1);o.add(new pt(new _n(2,2),a));let l=1,h=1;return{ready:i.compileAsync(o,c),fit(u,d){l=u,h=d;let f=i.getDrawingBufferSize(new de);(!n||n.image.width!==f.x||n.image.height!==f.y)&&(n?.dispose(),n=new ya(f.x,f.y),n.minFilter=n.magFilter=St,i.initTexture(n));let m=Math.min(i.getPixelRatio(),Math.sqrt(18e5/(u*d))),_=Math.max(1,Math.round(u*m)),g=Math.max(1,Math.round(d*m));s.setSize(_,g),i.initRenderTarget(s)},render(u,d){if(d<=.01){i.render(e,u);return}let f=i.getRenderTarget(),m=i.autoClear,_=t.visible;try{t.visible=!1,i.autoClear=!0,i.render(e,u),i.copyFramebufferToTexture(n),r.original.value=n,r.blend.value=1,r.image.value=n,r.step.value.set(d*.5/l,0),i.setRenderTarget(s),i.render(o,c),r.image.value=s.texture,r.step.value.set(0,d*.5/h),r.blend.value=ct.smootherstep(d,0,.9),i.setRenderTarget(f),i.render(o,c),t.visible=_,i.autoClear=!1,i.clearDepth(),_&&i.render(t,u)}finally{t.visible=_,i.autoClear=m,i.setRenderTarget(f)}}}}var j1=[3,6,8,12,16,24,32,44,62],md={x:570/1130,y:590/1600};function Am(i){if(i>=.24)return(i-.24/2)/(1-.24/2);let t=i/.24;return .24*(t*t*t-.5*t*t*t*t)/(1-.24/2)}var Q1=`
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
}`,eM=`
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
}`;function Rm(i,e,t,n=()=>{}){let s=window.MainWordSurface,r=new Map,a=new fn;a.name="\uACB0\uD569 \xB7 size-ordered depth field",e.add(a);let o=Tm(i,e,a),c=0,l={ink:{value:null},cameraStart:{value:1},cameraEnd:{value:8},cameraNow:{value:1},units:{value:1},halfTexel:{value:new de},endPan:{value:new de},wordSize:{value:new de},viewport:{value:new de},frameOffset:{value:new de},paperInk:{value:0},flight:{value:0},recession:Pr,swimTime:{value:0},swimScale:{value:1},motionEnabled:{value:1},gather:{value:0},detailFlight:{value:0},detailGather:{value:0},detailTravel:{value:1}},h=new Ft({uniforms:l,vertexShader:Q1,fragmentShader:eM,transparent:!0,premultipliedAlpha:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),u=e.background,d=new ke,f=new ke,m=new z,_=new z,g=new z,p=null,b=null,M=null,x=0,E=0,w=null;function C(B){let F=[],U=[],X=[],H=[],G=[],K=[],ie=[];for(let ve of B)F.push(...ve.rect),U.push(...ve.tile),X.push(ve.depthRatio),H.push(ve.opacity??1,ve.backFraction??0,ve.blurRatio??0,1-ct.smoothstep(ve.size,8,20)),G.push(...ve.swim),K.push(...ve.scatter),ie.push(...ve.span);let he=new Ms,pe=new _n(1,1);he.index=pe.index,he.setAttribute("position",pe.attributes.position);for(let[ve,Ge,Ue]of[["piece",F,4],["tile",U,4],["depthRatio",X,1],["appearance",H,4],["swim",G,4],["scatter",K,4],["gatherSpan",ie,2]])he.setAttribute(ve,new Un(new Float32Array(Ge),Ue));return he.instanceCount=B.length,he}async function y(B){let{set:F,image:U,prints:X}=s.getSource(B);await U.decode();let H=new Ut(U);H.flipY=!1,H.premultiplyAlpha=!0,H.generateMipmaps=!1,H.minFilter=St,H.needsUpdate=!0;let G=F.s.map(([ee,W,k,O,N,q],oe)=>{let fe=Math.max(k,O),P=Math.sin(oe*78.233)*43758.5453;return{rect:[(ee+k/2)/F.w,(W+O/2)/F.h,k/F.w,O/F.h],tile:[N/U.naturalWidth,q/U.naturalHeight,k/U.naturalWidth,O/U.naturalHeight],size:fe,order:P-Math.floor(P),...X[oe]}}),K=[...G].sort((ee,W)=>ee.size-W.size||ee.order-W.order),ie=K[0].size,he=K.at(-1).size;for(let ee=0;ee<K.length;ee++){let W=K[ee],k=(W.size-ie)/Math.max(1,he-ie),O=ee/Math.max(1,K.length-1);W.depthRatio=.018+.685*Math.pow(k,1.22)+.145*Math.pow(O,1.65)}let pe=C(K),ve=pe.attributes.depthRatio.array,Ge=[];for(let ee of[...j1.filter(W=>W<he),he]){let W=K.findIndex(k=>k.size>=ee);Ge.push({size:K[W].size,depth:ve[W]})}let Ue=new pt(pe,h);Ue.frustumCulled=!1,Ue.renderOrder=4,r.set(B,{records:K,bySource:G,atlas:H,stops:Ge,layer:Ue,svgHeight:F.h,layeredCount:ve.reduce((ee,W)=>ee+(W>0),0),ordered:ve.every((ee,W)=>W===0||ee>=ve[W-1])})}function A(B,F){let U=s.getSurroundings(p);if(U===B.field)return;let X=U.map(K=>{let ie=B.bySource[K.sprite.sourceIndex],he=Math.max(K.w,K.h)*B.svgHeight/F.h,pe=B.bySource[K.ownerIndex],ve=pe?[pe.scatter[0]+(K.x-F.x-pe.rect[0]*F.w)*pe.scatter[2]/x,pe.scatter[1]+(K.y-F.y-pe.rect[1]*F.h)*pe.scatter[2]/E,pe.scatter[2],0]:[K.x/x,K.y/E,1,0];return{...ie,rect:[(K.x-F.x)/F.w,(K.y-F.y)/F.h,K.w/F.w,K.h/F.h],depthRatio:K.blurRatio?.02+.0012*he:ie.depthRatio,blurRatio:K.blurRatio,scatter:ve,span:pe?.span??ie.span,swim:K.swim,opacity:K.opacity,backFraction:K.detail?.8-(ie.size-3)*.13:0}});B.field=U,B.detailCount=U.filter(K=>K.detail).length;let H=[...X,...B.records].sort((K,ie)=>K.depthRatio-ie.depthRatio),G=C(H);B.layer.geometry.dispose(),B.layer.geometry=G}function D(B){let F=r.get(B);!F||p===B||(b&&a.remove(b),p=B,b=F.layer,a.add(b),l.ink.value=F.atlas,l.halfTexel.value.set(.5/F.atlas.image.width,.5/F.atlas.image.height),t())}let T=0,I=Promise.all([o.ready,...["light","dark"].map(async B=>{await y(B),n(++T,2)})]).then(()=>D(s.theme));return window.addEventListener("main-word-layout",t),{ready:I,fit(B,F,U){M=B.clone(),x=F,E=U,o.fit(F,U)},update(B,F,U,X,H,G){D(s.theme);let K=Am(U),ie=ct.smootherstep(U,0,.16);F.visible=ie<1,F.material.opacity=1-ie,l.flight.value=K,l.gather.value=H,l.detailFlight.value=Am(G.progress),l.detailGather.value=G.gather,l.detailTravel.value=G.travel,Lr.value=1-ct.smootherstep(U,.38,.88),c=3.2*ct.smootherstep(U,.12,.76),Pr.value=0,d.copy(u).lerp(f.setHex(p==="dark"?0:16777215),ct.smootherstep(U,0,p==="dark"?.2:.16)),e.background=U>0?d:u;let he=r.get(p),pe=s.frame;if(he&&A(he,pe),a.visible=!!(he&&U>0),w=null,!M||!he||X<=0)return;let ve=M.position.y-.003,Ge=Math.tan(ct.degToRad(M.fov/2)),Ue=ct.clamp(Math.min(x,E)/12/(12*pe.w/1130),9,19),ee=ve*Ue,W=ve*Math.pow(Ue,K),k=2*Ge/E;dd.value=ve,_.setFromMatrixColumn(M.matrixWorld,0),m.setFromMatrixColumn(M.matrixWorld,1),g.set(M.position.x,.003,M.position.z),a.position.copy(g),a.quaternion.copy(M.quaternion);let O=l;O.cameraStart.value=ve,O.cameraEnd.value=ee,O.cameraNow.value=W,O.swimTime.value=s.time,O.swimScale.value=pe.h/he.svgHeight,O.motionEnabled.value=Number(s.motionEnabled),O.units.value=k,O.wordSize.value.set(pe.w,pe.h),O.viewport.value.set(x,E),O.frameOffset.value.set(pe.x+pe.w/2-x/2,E/2-pe.y-pe.h/2);let N=x/2-pe.x-pe.w*md.x,q=pe.y+pe.h*md.y-E/2;if(O.endPan.value.set(N*k*ee,q*k*ee),U>0){let fe=(W-ve)/(ee-ve);B.position.lerp(M.position,ie).addScaledVector(_,N*k*ee*fe).addScaledVector(m,q*k*ee*fe),B.position.y+=W-ve,B.quaternion.slerp(M.quaternion,ie),B.view?.enabled&&(B.view.offsetX*=1-ie,B.view.offsetY*=1-ie),B.near=Math.max(.05,W*.012),B.far=ee*3+250,B.updateProjectionMatrix(),B.updateMatrixWorld(!0),e.fog.near=W+45,e.fog.far=W+110}O.paperInk.value=1-Lr.value/(1+fd*((W+Pr.value)/ve-1));let oe=W*.988/ee;w={distance:W,zoom:ee/W,flight:K,gather:H,detail:md,wordPieces:he.records.length,printsVisible:a.visible,detailFlight:l.detailFlight.value,detailGather:l.detailGather.value,detailTravel:l.detailTravel.value,position:B.position.toArray(),quaternion:B.quaternion.toArray(),entrance:ie,gridInk:Lr.value,gridRecession:Pr.value,gridBlur:c,surroundings:he.field.length,detailPrints:he.detailCount,layeredPieces:he.layeredCount,sizeDepthOrdered:he.ordered,sizeDepths:he.stops,passedSizeStops:he.stops.filter(fe=>oe>=fe.depth).map(fe=>fe.size),frame:{...pe},theme:p}},render(B){o.render(B,Lr.value>0?c:0)},inspect:()=>w}}var li=[-10,30,16],Cs=1,Rl=4,gd=16,cn=256;function xd(i,e,t,n=0){let s=document.createElement("canvas");s.width=s.height=Rl*cn;let r=s.getContext("2d"),a=document.createElement("canvas");a.width=a.height=cn;let o=a.getContext("2d"),c=document.createElement("canvas");c.width=c.height=cn;let l=c.getContext("2d"),h=cn/e,u=Math.cos(n),d=Math.sin(n),f=(M,x,E,w,C)=>[(M-E*(u*w-d*C)/li[1])*h+cn/2,(x-E*(d*w+u*C)/li[1])*h+cn/2];function m(M,x,E=!0){let w=0;for(let C=0;C<x.length;C++){let y=x[C],A=x[(C+1)%x.length];w+=y[0]*A[1]-A[0]*y[1]}w>0!==E&&x.reverse(),M.moveTo(...x[0]);for(let C=1;C<x.length;C++)M.lineTo(...x[C]);M.closePath()}function _(M,x,E){let w=new Path2D;for(let C of i.contours){let y=C.points.map(([D,T])=>f(D,T,.003,x,E)),A=C.points.map(([D,T])=>f(D,T,M+.003,x,E));m(w,[...y],!C.hole),m(w,[...A],!C.hole);for(let D=0;D<y.length;D++){let T=(D+1)%y.length;m(w,[y[D],y[T],A[T],A[D]])}}return w}let g=_(0,li[0],li[2]),p=Array.from({length:12},(M,x)=>{let E=11*Math.sqrt((x+.5)/12),w=x*2.39996323;return[li[0]+Math.cos(w)*E,li[2]+Math.sin(w)*E]});for(let M=0;M<gd;M++){let x=i.height*t*M/(gd-1);l.clearRect(0,0,cn,cn),l.globalCompositeOperation="lighter",l.globalAlpha=.72/p.length,l.filter=`blur(${(.018+x*.018)*h}px)`;for(let[E,w]of p)o.clearRect(0,0,cn,cn),o.fillStyle="#ffffff",o.fill(_(x,E,w)),l.drawImage(a,0,0);o.clearRect(0,0,cn,cn),o.fill(g),l.globalCompositeOperation="source-over",l.globalAlpha=.35,l.filter=`blur(${.035*h}px)`,l.drawImage(a,0,0),r.drawImage(c,M%Rl*cn,(Rl-1-Math.floor(M/Rl))*cn)}let b=new gn(s);return b.colorSpace=_t,b.generateMipmaps=!1,b.minFilter=b.magFilter=St,b.userData={style:"height-aware-area-light",frames:gd,light:li},b}function Cl(i=null,e=!1){let t=new Yt({map:i,transparent:!0,opacity:1,depthWrite:!1,color:13225686,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4}),n={value:0};return t.userData.shadowHeight=n,t.onBeforeCompile=s=>{s.uniforms.shadowHeight=n,s.vertexShader=`varying float vShadowHeight;
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
    `)},t.customProgramCacheKey=()=>"height-aware-ground-shadow-"+e,t}function Cm(i,e,t,n,s,r,a){let{stepX:o,stepZ:c,originZ:l}=i,h=t-e+1,u=s-n+1,d=(e-.5)*o,f=l-(s+.5)*c,m=h*o,_=u*c,g=Math.min(96,Math.floor(2048/Math.max(h,u)))||1,p=document.createElement("canvas");p.width=h*g,p.height=u*g;let b=p.getContext("2d"),M=r.map(U=>{let X=new Path2D;for(let{points:H}of U.caster.contours)if(!(H.length<3)){X.moveTo(...H[0]);for(let G=1;G<H.length;G++)X.lineTo(...H[G]);X.closePath()}return X}),x=g/o,E=g/c;function w(U,X,H){b.setTransform(x,0,0,E,(U-d)*x,(X-f)*E),b.fillStyle=r[H].color,b.fill(M[H])}r.forEach(({mesh:U},X)=>w(U.position.x,U.position.z,X)),a.forEach(({x:U,z:X,sourceIndex:H})=>w(U,X,H));let C=new gn(p);C.flipY=!1,C.colorSpace=_t,C.wrapS=C.wrapT=En;let y=new Et,A=[],D=[],T=[];function I(U,X,H,G){let K=A.length/3;for(let[ie,he]of[[U,X],[U,G],[H,G],[H,X]])A.push(d+ie*m,.003,f+he*_),D.push(ie,he);T.push(K,K+1,K+2,K,K+2,K+3)}I(-20,-20,21,0),I(-20,1,21,21),I(-20,0,0,1),I(1,0,21,1),y.setAttribute("position",new ut(A,3)),y.setAttribute("uv",new ut(D,2)),y.setIndex(T);let B=pd(new Yt({map:C,transparent:!0,depthWrite:!1,toneMapped:!1,fog:!1})),F=new pt(y,B);return F.name="Continuous flat icon grid",F.visible=!1,F}function tM(i,e){let t=i.clone();return t.transparent=!0,t.opacity=1,t.color.set(e),t.emissive.set(e),t.onBeforeCompile=n=>{n.uniforms.neutralEmissive={value:new ke(16777215).multiplyScalar(t.emissiveIntensity)},n.vertexShader=`attribute float instanceReveal; attribute float instanceTint; varying float vReveal; varying float vTint;
`+n.vertexShader,n.vertexShader=n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vReveal=instanceReveal; vTint=instanceTint;`),n.fragmentShader=`varying float vReveal; varying float vTint; uniform vec3 neutralEmissive;
`+n.fragmentShader,n.fragmentShader=n.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
diffuseColor.rgb=mix(vec3(1.0),diffuseColor.rgb,vTint); diffuseColor.a *= vReveal;`),n.fragmentShader=n.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
totalEmissiveRadiance=mix(neutralEmissive,totalEmissiveRadiance,vTint);`)},t.customProgramCacheKey=()=>"floor-pattern-color-reveal",Al(t)}var Il=class{constructor(e,t,n){this.scene=e,this.sources=t,this.material=n,this.copies=[],this.batches=[],this.key="",this.stats={count:0,visible:0,complete:0,active:0},this.transform=new Lt}fit(e,t,n,s){let r=new wi,a=new Zt(new z(0,1,0),-.003),o=[];for(let E of e)for(let w of[-1.16,1.16])for(let C of[-1.16,1.16]){r.setFromCamera(new de(w,C),E);let y=r.ray.intersectPlane(a,new z);y&&o.push(y)}let c=wl(t),l=new Rt().setFromPoints(o),h=Math.floor((c.originZ-l.max.z)/c.stepZ)-1,u=Math.ceil((c.originZ-l.min.z)/c.stepZ)+1,d=Math.floor(l.min.x/c.stepX)-1,f=Math.ceil(l.max.x/c.stepX)+1,m=[t,h,u,d,f,n.layout,n.depth,s.x.toFixed(5),s.z.toFixed(5)].join(":");if(this.coverage={left:l.min.x,right:l.max.x,front:l.max.z,back:l.min.z},m===this.key)return;this.clear(),this.key=m;let _=new Map(this.sources.map(({mesh:E},w)=>{let C=Math.round((c.originZ-E.position.z)/c.stepZ);return[C+":"+Math.round(E.position.x/c.stepX-c.offset(C)),w]})),g=n.layout==="scattered"?_m({left:d*c.stepX,right:f*c.stepX,back:c.originZ-u*c.stepZ,front:c.originZ-h*c.stepZ},this.sources):[];if(n.layout==="grid")for(let E=h;E<=u;E++)for(let w=d;w<=f;w++){if(_.has(E+":"+w))continue;let C=(w+c.offset(E))*c.stepX,y=c.originZ-E*c.stepZ;g.push({x:C,z:y,row:E,col:w,rotation:0})}if(n.layout==="grid"){let E=Ci(192807),w=[...g],C=this.sources.map(()=>1);for(let y=w.length-1;y>0;y--){let A=Math.floor(E()*(y+1));[w[y],w[A]]=[w[A],w[y]]}for(let y of w){let A=new Set;for(let B=y.row-2;B<=y.row+2;B++)for(let F=y.col-2;F<=y.col+2;F++){let U=_.get(B+":"+F);U!==void 0&&A.add(U)}let D=C.map((B,F)=>F).filter(B=>!A.has(B)),T=Math.min(...D.map(B=>C[B])),I=D.filter(B=>C[B]===T);y.sourceIndex=I[Math.floor(E()*I.length)],y.radius=this.sources[y.sourceIndex].radius,C[y.sourceIndex]++,_.set(y.row+":"+y.col,y.sourceIndex)}}let p=E=>Math.hypot(E.x-s.x,E.z-s.z);g.forEach(E=>{E.radial=p(E)});let b=[...g.map(E=>E.radial),...this.sources.slice(Cr).map(E=>p(E.mesh.position))],M=Math.min(...b),x=Math.max(...b);this.wave={origin:{x:s.x,z:s.z},nearest:M,farthest:x},this.sources.forEach((E,w)=>{E.cue=w<Cr?Em(w):ud(p(E.mesh.position),M,x)}),this.sources.forEach((E,w)=>{let C=g.filter(X=>X.sourceIndex===w);if(!C.length)return;let y=E.mesh.geometry.clone(),A=E.shadow.geometry.clone(),D=new Un(new Float32Array(C.length),1),T=new Un(new Float32Array(C.length),1),I=new Un(new Float32Array(C.length),1);y.setAttribute("instanceReveal",D),A.setAttribute("instanceReveal",T),y.setAttribute("instanceTint",I);let B=new ur(y,tM(E.mesh.material,E.color),C.length),F=new ur(A,Cl(E.patternShadow,!0),C.length);F.layers.set(Cs),B.name=E.icon.id+"-pattern",F.name=E.icon.id+"-pattern-contact",F.renderOrder=1,B.castShadow=B.receiveShadow=!1,B.frustumCulled=F.frustumCulled=!1,B.instanceMatrix.setUsage(br),F.instanceMatrix.setUsage(br),this.scene.add(B,F);let U={mesh:B,shadow:F,fill:D,contact:T,tint:I};this.batches.push(U),C.forEach((X,H)=>{let G=new Lt;G.position.set(X.x,.003,X.z),G.rotation.y=X.rotation;let K=ud(X.radial,M,x),ie={...X,icon:E.icon,color:E.color,mesh:G,caster:E.caster,heightFactor:E.heightFactor,batch:U,slot:H,cue:K};ie.reveal=Ml(ie,E.reveal),ie.reveal.group.visible=!1,yl(ie.reveal,n.layout==="grid"?c:null),this.scene.add(ie.reveal.group),this.copies.push(ie),this.transform.position.set(X.x,.001,X.z),this.transform.rotation.set(-Math.PI/2,0,X.rotation),this.transform.scale.setScalar(1),this.transform.updateMatrix(),F.setMatrixAt(H,this.transform.matrix)}),F.instanceMatrix.needsUpdate=!0}),n.layout==="grid"&&(this.extension=Cm(c,d,f,h,u,this.sources,this.copies),this.scene.add(this.extension)),this.stats.count=this.copies.length}update(e,t,n){let s=0,r=0,a=0,o=0,c=El(e);this.extension&&(this.extension.visible=c===1),this.batches.forEach(l=>{l.dirty=!1});for(let l of this.copies){let h=e>=l.cue.start,u=Ir(e,l.cue);if(h&&u>=Gn&&c===0&&l.settled){s++,r++;continue}if(h&&c===1&&l.finalized){s++,r++,o++;continue}if(!h&&l.dormant)continue;l.settled=h&&u>=Gn&&c===0,l.finalized=h&&c===1,l.dormant=!h,l.batch.dirty=!0;let d=t.depth*l.heightFactor,f=od(l,u,h,d,c);(f.phase==="solid"||f.phase==="flat")&&(l.reveal.group.visible=!1),this.transform.position.copy(l.mesh.position),this.transform.rotation.copy(l.mesh.rotation),this.transform.scale.set(h?1:0,Math.max(.001,f.extrusion)*d,h?1:0),this.transform.updateMatrix(),l.batch.mesh.setMatrixAt(l.slot,this.transform.matrix),l.batch.fill.setX(l.slot,h?f.fill:0),l.batch.contact.setX(l.slot,h?f.extrusion:0),l.batch.tint.setX(l.slot,h?f.tint:0),h&&(f.fill>0||f.lineOpacity>0)&&s++,h&&f.complete&&r++,h&&(!f.complete||c>0&&c<1)&&a++,h&&f.phase==="flat"&&o++}for(let l of this.batches)l.dirty&&(l.mesh.visible=l.fill.array.some(h=>h>0),l.shadow.visible=l.contact.array.some(h=>h>0),l.mesh.instanceMatrix.needsUpdate=!0,l.fill.needsUpdate=l.contact.needsUpdate=l.tint.needsUpdate=!0),l.shadow.material.opacity=n;this.stats={count:this.copies.length,visible:s,complete:r,active:a,flattened:o}}isFlashing(){return this.copies.some(e=>e.reveal.active&&performance.now()-e.reveal.sparkAt<360)}inspect(){return{...this.stats,coverage:this.coverage,wave:this.wave,instances:this.copies.map(e=>({id:e.icon.id,color:new ke(16777215).lerp(e.reveal.targetColor,e.batch.tint.getX(e.slot)).getHexString(),tint:e.batch.tint.getX(e.slot),fill:e.batch.fill.getX(e.slot),flatness:e.reveal.state.flatness,lineOpacity:e.reveal.state.lineOpacity,lineColor:e.reveal.lines[0].material.color.getHexString(),x:e.x,z:e.z,radius:e.radius,rotation:e.rotation,cue:e.cue,visible:e.batch.fill.getX(e.slot)>0,extrusion:e.batch.contact.getX(e.slot),guide:vl(e.reveal),drawingVisible:e.reveal.group.visible,pointVisible:e.reveal.group.visible&&e.reveal.dot.visible,strokeVertices:e.reveal.lines.reduce((t,n)=>t+n.geometry.drawRange.count,0),phase:e.reveal.state.phase}))}}clear(){this.extension&&(this.scene.remove(this.extension),this.extension.material.map.dispose(),this.extension.material.dispose(),this.extension.geometry.dispose(),this.extension=null);for(let e of this.copies)this.scene.remove(e.reveal.group),e.reveal.guide.geometry.dispose(),e.reveal.guide.material.dispose(),e.reveal.lines.forEach(t=>t.geometry.dispose()),e.reveal.lines[0].material.dispose(),e.reveal.dot.material.dispose(),e.reveal.halo.material.dispose();for(let{mesh:e,shadow:t}of this.batches)this.scene.remove(e,t),e.dispose(),t.dispose(),e.geometry.dispose(),t.geometry.dispose(),e.material.dispose(),t.material.dispose();this.copies=[],this.batches=[]}};var Im=nn+Vn+Hn*.5,nM=[Im,Rn[1].start+kn+Ai*.46,Rn[2].start+kn+Ai*.66,Wn,Wn+(Cn-Wn)*.604,Cn,Ii],Pl=(i,e,t)=>i+(e-i)*t;function os(i,e){let t=nM,n=t.length-1;if(i<=t[0])return e[0];if(i>=t[n])return e[n];let s=t.slice(1).map((d,f)=>d-t[f]),r=s.map((d,f)=>(e[f+1]-e[f])/d),a=e.map((d,f)=>{if(!f||f===n||r[f-1]*r[f]<=0)return 0;let m=2*s[f]+s[f-1],_=s[f]+2*s[f-1];return(m+_)/(m/r[f-1]+_/r[f])}),o=t.findIndex((d,f)=>f<n&&i<t[f+1]),c=s[o],l=(i-t[o])/c,h=l*l,u=h*l;return(2*u-3*h+1)*e[o]+(u-2*h+l)*c*a[o]+(-2*u+3*h)*e[o+1]+(u-h)*c*a[o+1]}function Ll(i,e,t,n=1){let s=Math.max(0,Math.min(Ii,i)),[r,a,o]=e,c=t.distance-r.distance,l=(_,g)=>Pl(o[_],t[_],g),h=[r.center,a.center,o.center,...[.16,.65,.9,1].map(_=>({x:Pl(o.center.x,t.center.x,_),y:Pl(o.center.y,t.center.y,_),z:Pl(o.center.z,t.center.z,_)}))],u={};for(let _ of["x","y","z"])u[_]=os(s,h.map(g=>g[_]));u.y+=n*os(s,[0,.06,.1,.18,.3,.12,0]);let d=os(s,[r.distance,a.distance*1.02,o.distance*1.08,r.distance+c*.06,r.distance+c*.4,r.distance+c*.7,t.distance]),f=os(s,[r.yaw,a.yaw,o.yaw,l("yaw",.18),l("yaw",.58),l("yaw",.82),t.yaw]),m=os(s,[r.pitch,a.pitch,o.pitch,o.pitch+1,o.pitch+3,68,90]);return{center:u,distance:d,yaw:f,pitch:m,shiftX:os(s,[r.shiftX,a.shiftX,o.shiftX,l("shiftX",.16),l("shiftX",.65),l("shiftX",.9),t.shiftX]),shiftY:os(s,[r.shiftY,a.shiftY,o.shiftY,l("shiftY",.16),l("shiftY",.65),l("shiftY",.9),t.shiftY]),fov:34,roll:n?os(s,[0,-.018,-.02,-.016,-.012,-.008,0]):0,solo:s<Wn,index:bm(s),travelling:s>Im&&s<Ii,pullback:Math.max(0,Math.min(1,(d-o.distance*1.08)/(t.distance-o.distance*1.08))),overhead:Math.max(0,Math.min(1,(m-o.pitch)/(90-o.pitch)))}}var Dl=1.25,Sd=ss+nn,Nl=Sd*(Dl-1),Dr=Cn-.65,Ur=1.6,Is=.6,iM=Is*(1+Ur)/2,_d=i=>Math.max(0,Math.min(ci,i));function Pm(i){if(i>=Is)return i*Ur-(Ur-1)*Is/2;let e=i/Is;return i+(Ur-1)*Is*(e*e*e-.5*e*e*e*e)}function sM(i){let e=i<=Sd*Dl?i/Dl:i-Nl;return e<=Dr?_d(e):_d(Dr+Pm(e-Dr))}function Fl(i){let e=_d(i),t=e-Dr;if(e<=Sd)return e*Dl;if(t<=0)return e+Nl;if(t>=iM)return Dr+Nl+(t+(Ur-1)*Is/2)/Ur;let n=0,s=Is;for(let r=0;r<32;r++){let a=(n+s)/2;Pm(a)<t?n=a:s=a}return Dr+Nl+(n+s)/2}var rM=cd,aM=Cn+.45,oM=6.2,Ul=Fl(rM),yd=Fl(aM),Ps=yd-Ul,Xn=Math.min(.6,Ps/2),Lm=(oM-Xn)/(Ps-Xn),vd=(1-Lm)*(Ps-Xn),Md=i=>i*i*i-.5*i*i*i*i;function bd(i){let e=i-Ul;if(e<=0)return i;if(e>=Ps)return i-vd;let t=e<Xn?Xn*Md(e/Xn):e>Ps-Xn?Ps-Xn-Xn*Md((Ps-e)/Xn):e-Xn/2;return i-(1-Lm)*t}function cM(i){if(i<=Ul)return i;if(i>=yd-vd)return i+vd;let e=Ul,t=yd;for(let n=0;n<36;n++){let s=(e+t)/2;bd(s)<i?e=s:t=s}return(e+t)/2}var lM=Rn[1].start,Fr=.5,Nr=bd(Fl(lM)),Ls=.6,hM=Ls*(1+Fr)/2;function Nm(i){let e=i-Nr;return e<=0?i:e>=Ls?Nr+e*Fr+(1-Fr)*Ls/2:i-(1-Fr)*Ls*Md(e/Ls)}function uM(i){let e=i-Nr;if(e<=0)return i;if(e>=hM)return Nr+(e-(1-Fr)*Ls/2)/Fr;let t=Nr,n=Nr+Ls;for(let s=0;s<36;s++){let r=(t+n)/2;Nm(r)<i?t=r:n=r}return(t+n)/2}function Dm(i){return sM(cM(uM(i)))}function dM(i){return Nm(bd(Fl(i)))}var Ed=dM(ci),Um=.85,fM=.42,Fm=100+Ed*115*fM-Um*100;function Om(i,e,t){let n=t*Um;return{start:i-n,distance:Math.max(1,e-t+n)}}var wd=200,Td=20,Bm=2;function zm(i){let e=document.createElement("canvas");e.width=e.height=128;let t=e.getContext("2d");t.fillStyle="#ffffff",t.fillRect(0,0,128,128),t.fillStyle="#dddddd",t.beginPath(),t.arc(64,64,128*Bm/Td/2,0,Math.PI*2),t.fill();let n=new gn(e);n.colorSpace=_t,n.wrapS=n.wrapT=En,n.anisotropy=i.capabilities.getMaxAnisotropy();let s={value:1},r=new Yt({name:"White dotted floor",map:n,color:16777215,toneMapped:!1,depthWrite:!1,transparent:!0});r.onBeforeCompile=c=>{c.uniforms.dotOpacity=s,c.fragmentShader=`uniform float dotOpacity;
`+c.fragmentShader,c.fragmentShader=c.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
       diffuseColor.rgb=mix(vec3(1.0),diffuseColor.rgb,dotOpacity);`)},r.customProgramCacheKey=()=>"dotted-floor-fade";let a=new pt(new _n(wd,wd),r);a.name="White floor",a.rotation.x=-Math.PI/2,a.renderOrder=-1;let o=0;return{mesh:a,fit(c,l,h=34){o=2*(c.distance+c.center.y)*Math.tan(ct.degToRad(h)/2)/l*Td,n.repeat.setScalar(wd/o)},update(c,l){s.value=l?1-ct.smoothstep(c,70,90):1},inspect(){return{color:"#dddddd",spacingPx:Td,diameterPx:Bm,worldSpacing:o,opacity:s.value}}}}var Ol="http://www.w3.org/2000/svg",Ad="#FF3C3C",km=i=>Math.max(0,Math.min(1,i)),Or=i=>{let e=km(i);return e*e*(3-2*e)};function Vm(i,e){let t=Number(e.icon.viewBox.trim().split(/[\s,]+/)[3]),n=String(Number(t.toFixed(2))),s=document.createElementNS(Ol,"svg");s.setAttribute("class","opening-dimension"),s.setAttribute("aria-hidden","true"),Object.assign(s.style,{position:"absolute",inset:"0",width:"100%",height:"100%",pointerEvents:"none",display:"none"});let r=document.createElementNS(Ol,"g");r.setAttribute("stroke",Ad),r.setAttribute("stroke-width","1"),r.setAttribute("fill","none"),s.append(r);let a=["upper-cap","stem","lower-cap"].map(d=>{let f=document.createElementNS(Ol,"line");return f.setAttribute("data-part",d),r.append(f),f}),o=document.createElementNS(Ol,"text");o.textContent=n,o.setAttribute("fill",Ad),o.setAttribute("stroke","none"),o.setAttribute("dominant-baseline","middle"),o.setAttribute("font-family","Handjet, monospace"),o.setAttribute("font-weight","400"),o.style.fontVariantNumeric="tabular-nums",r.append(o),i.append(s);let c={visible:!1,label:n,svgHeight:t,color:Ad,progress:0,opacity:0},l=new z;function h(d,f,m,_,g){return l.set(d,.008,f),e.reveal.group.localToWorld(l),l.project(m),{x:(l.x+1)*_/2,y:(1-l.y)*g/2}}function u(d,f,m){d.setAttribute("x1",f.x),d.setAttribute("y1",f.y),d.setAttribute("x2",m.x),d.setAttribute("y2",m.y)}return{update(d,f,m,_){let g=km((d-Ts)/nn),p=Or(g/.12)*(1-Or((d-gl)/hm))*e.reveal.state.guideOpacity;if(c={...c,visible:p>.001,progress:g,opacity:p},s.style.display=c.visible?"block":"none",r.setAttribute("opacity",p),!c.visible)return;s.setAttribute("viewBox",`0 0 ${m} ${_}`);let{minZ:b,maxZ:M,maxX:x}=e.reveal.guide.userData.bounds,E=h(x,b,f,m,_),w=h(x,M,f,m,_),C=Math.hypot(w.x-E.x,w.y-E.y),y={x:(w.y-E.y)/C,y:-(w.x-E.x)/C},A={x:E.x+y.x*9,y:E.y+y.y*9},D={x:w.x+y.x*9,y:w.y+y.y*9},T=Or(g/.2),I=Or((g-.1)/.55),B=Or((g-.62)/.18),F=(K,ie)=>[{x:K.x-y.x*6*ie,y:K.y-y.y*6*ie},{x:K.x+y.x*6*ie,y:K.y+y.y*6*ie}];u(a[0],...F(A,T)),u(a[1],A,{x:A.x+(D.x-A.x)*I,y:A.y+(D.y-A.y)*I}),u(a[2],...F(D,B));let U=Or((d-ml)/(nn*.2)),X=m<500?12:14,H=(A.x+D.x)/2+y.x*(7+(1-U)*5),G=(A.y+D.y)/2+y.y*7;o.setAttribute("x",H),o.setAttribute("y",G),o.setAttribute("font-size",X),o.setAttribute("opacity",U),c={...c,upper:T,stem:I,lower:B,labelOpacity:U,top:A,bottom:D,labelPosition:{x:H,y:G},fontSize:X}},inspect(){return{...c}}}}var Bl="http://www.w3.org/2000/svg",pM=i=>Math.max(0,Math.min(1,i)),to=i=>{let e=pM(i);return e*e*(3-2*e)},zl=i=>String(Number(i.toFixed(2)));function Hm(i,e){let[t,n,s,r]=e.icon.viewBox.trim().split(/[\s,]+/).map(Number),a=e.caster.svgBounds,o=t+s/2,c=n+r/2,l=e.caster.contours.filter(T=>!T.hole).map(T=>{let I=T.points.map(([pe])=>t+(pe-a.minX)/(a.maxX-a.minX)*s),B=T.points.map(([,pe])=>n+(pe-a.minZ)/(a.maxZ-a.minZ)*r),F=Math.min(...I),U=Math.max(...I),X=Math.min(...B),H=Math.max(...B),G=(F+U)/2,K=(X+H)/2,ie=Math.hypot(G-o,K-c)||1,he=I.map((pe,ve)=>((pe-o)*(G-o)+(B[ve]-c)*(K-c))/ie);return{left:F,right:U,top:X,bottom:H,centerX:G,centerY:K,radius:Math.max(...I.map((pe,ve)=>Math.hypot(pe-o,B[ve]-c))),radialInner:Math.min(...he),radialOuter:Math.max(...he)}}),h=l.filter(T=>T.left<o&&T.right>o&&T.bottom<c).sort((T,I)=>T.top-I.top)[0],u=l.filter(T=>T.left<o&&T.right>o&&T.top<c&&T.bottom>c),d=Math.max(...u.map(T=>T.radius)),f=u.sort((T,I)=>(T.right-T.left)*(T.bottom-T.top)-(I.right-I.left)*(I.bottom-I.top))[0],m=[c-h.top,c-h.bottom,d],_=l.filter(T=>(T.right<o||T.left>o)&&(T.bottom<c||T.top>c)),g=["radialOuter","radialInner"].map(T=>_.reduce((I,B)=>I+B[T],0)/_.length),p=document.createElementNS(Bl,"svg");p.setAttribute("class","opening-construction"),p.setAttribute("aria-hidden","true"),p.style.cssText="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;display:none";let b=document.createElementNS(Bl,"g");p.append(b),i.append(p);function M(T,I,B){let F=document.createElementNS(Bl,"path");return F.dataset.part=T,F.setAttribute("fill","none"),F.setAttribute("stroke",I),F.setAttribute("stroke-width",B),F.setAttribute("stroke-linecap","round"),b.append(F),F}let x=m.map((T,I)=>({element:M(["outer-circle","inner-circle","center-circle"][I],"#b0b7bf",.85),radius:T,centerX:o,centerY:c,start:.08+I*.24,duration:1.08,direction:I?-1:1}));g.forEach((T,I)=>x.push({element:M(`small-box-${I?"inner":"outer"}-circle`,"#b0b7bf",.85),radius:T,centerX:o,centerY:c,start:.72+I*.22,duration:.78,direction:I?-1:1}));let E=[M("horizontal-axis","#c3c9cf",.65),M("vertical-axis","#c3c9cf",.65)];E.forEach(T=>T.setAttribute("stroke-dasharray","3 5"));let w=[{name:"block-width",value:zl(h.right-h.left),a:[h.left,h.top-8],b:[h.right,h.top-8],anchor:"middle",offset:[0,-9],start:.64},{name:"block-height",value:zl(h.bottom-h.top),a:[h.right+8,h.top],b:[h.right+8,h.bottom],anchor:"start",offset:[6,0],start:.98},{name:"center-width",value:zl(f.right-f.left),a:[f.left,f.top-8],b:[f.right,f.top-8],anchor:"middle",offset:[0,-9],start:1.12},{name:"center-height",value:zl(f.bottom-f.top),a:[f.right+8,f.top],b:[f.right+8,f.bottom],anchor:"start",offset:[6,0],start:1.32}].map(T=>{let I=M(T.name,"#FF3C3C",1),B=document.createElementNS(Bl,"text");return B.textContent=T.value,B.dataset.part=T.name+"-value",B.setAttribute("fill","#FF3C3C"),B.setAttribute("font-family","Handjet, monospace"),B.setAttribute("font-weight","400"),B.setAttribute("text-anchor",T.anchor),B.setAttribute("dominant-baseline","middle"),B.setAttribute("stroke","#fff"),B.setAttribute("stroke-width","3"),B.setAttribute("stroke-linejoin","round"),B.setAttribute("paint-order","stroke"),B.style.fontVariantNumeric="tabular-nums",b.append(B),{...T,element:I,label:B}}),C=new z;function y(T,I,B,F,U){return C.set(a.minX+(T-t)/s*(a.maxX-a.minX),.009,a.minZ+(I-n)/r*(a.maxZ-a.minZ)),e.reveal.group.localToWorld(C),C.project(B),{x:(C.x+1)*F/2,y:(1-C.y)*U/2}}function A(T,I,B,F,U,X,H){let G=y(...I,U,X,H),K=y(I[0]+(B[0]-I[0])*F,I[1]+(B[1]-I[1])*F,U,X,H);T.setAttribute("d",`M${G.x},${G.y}L${K.x},${K.y}`),T.setAttribute("opacity",F>0?1:0)}let D={visible:!1,opacity:0,circles:x.map(()=>0),dimensions:w.map(({value:T})=>({value:T,progress:0,labelOpacity:0}))};return{update(T,I,B,F){let U=T-gl,X=to(U/.24)*e.reveal.state.guideOpacity;if(D={...D,visible:e.reveal.group.visible&&X>.001,opacity:X},p.style.display=D.visible?"block":"none",b.setAttribute("opacity",X),!D.visible)return;p.setAttribute("viewBox",`0 0 ${B} ${F}`),D.circles=x.map(({element:K,radius:ie,centerX:he,centerY:pe,start:ve,duration:Ge,direction:Ue})=>{let ee=to((U-ve)/Ge),W=Math.max(1,Math.ceil(ee*128)),k="";for(let O=0;O<=W;O++){let N=-Math.PI/2+ee*(O/W)*Math.PI*2*Ue,q=y(he+Math.cos(N)*ie,pe+Math.sin(N)*ie,I,B,F);k+=(O?"L":"M")+q.x+","+q.y}return K.setAttribute("d",k),K.setAttribute("opacity",ee>0?1:0),ee});let H=to((U-.42)/.75),G=m[0];A(E[0],[o-G,c],[o+G,c],H,I,B,F),A(E[1],[o,c-G],[o,c+G],H,I,B,F),D.dimensions=w.map(({element:K,label:ie,value:he,a:pe,b:ve,anchor:Ge,offset:Ue,start:ee})=>{let W=to((U-ee)/.46),k=to((U-ee-.32)/.32);A(K,pe,ve,W,I,B,F);let O=y((pe[0]+ve[0])/2,(pe[1]+ve[1])/2,I,B,F);return ie.setAttribute("x",O.x+Ue[0]+(Ge==="start"?(1-k)*4:0)),ie.setAttribute("y",O.y+Ue[1]+(Ge==="middle"?(1-k)*4:0)),ie.setAttribute("font-size",B<500?12:14),ie.setAttribute("opacity",k),{value:he,progress:W,labelOpacity:k}})},inspect(){return{...D,block:h,radii:m}}}}function Gm(i,e){let{guide:t}=e,n=t.userData.sweep,s="http://www.w3.org/2000/svg",r=document.createElementNS(s,"svg");r.classList.add("opening-guide-sweep"),r.setAttribute("aria-hidden","true"),r.style.cssText="position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:3;display:none",r.setAttribute("fill","none"),r.setAttribute("stroke","#"+n.material.color.getHexString()),r.setAttribute("stroke-width","1");let a=Array.from({length:4},()=>{let c=document.createElementNS(s,"line");return r.append(c),c});document.body.append(r),n.material.visible=!1;let o=new z;return{update(c){let l=e.group.visible&&t.visible&&n.visible;if(r.style.display=l?"block":"none",!l)return;let h=i.getBoundingClientRect(),u=n.geometry.attributes.position;r.setAttribute("viewBox",`0 0 ${innerWidth} ${innerHeight}`),r.setAttribute("opacity",String(n.material.opacity)),a.forEach((d,f)=>{for(let m=0;m<2;m++)o.fromBufferAttribute(u,f*2+m),n.localToWorld(o).project(c),d.setAttribute("x"+(m+1),String(h.left+(o.x+1)*h.width/2)),d.setAttribute("y"+(m+1),String(h.top+(1-o.y)*h.height/2))})}}}function Wm(){if(window.MainIntro)return{setAutoHideProgress(h){window.MainIntro.headerProgress=h}};let i=document.querySelector(".header"),e=document.querySelector(".menu-button"),t=document.querySelector(".mobile-menu"),n=document.querySelector("main"),s=matchMedia("(max-width:759px)"),r=0,a=0,o=!1;function c(h=!1){let u=a>0&&!o;i.style.setProperty("--header-hide-offset",`calc(${-100*a}% - ${a}px)`),i.style.setProperty("--header-hide-opacity",String(1-a)),i.style.setProperty("--header-slide-duration",h?"0s":".4s"),i.style.setProperty("--header-background-duration",h?"0s":".6s"),i.classList.contains("is-intro-hidden")!==u&&i.classList.toggle("is-intro-hidden",u)}document.addEventListener("pointermove",h=>{h.pointerType!=="touch"&&(o=h.clientY<=i.offsetHeight+(o?16:0),c())},{passive:!0}),document.addEventListener("pointerleave",()=>{o=!1,c()}),i.addEventListener("focusin",()=>c()),i.addEventListener("focusout",()=>c());function l(h,u=!1){clearTimeout(r),e.setAttribute("aria-expanded",String(h)),e.setAttribute("aria-label",h?"\uBA54\uB274 \uB2EB\uAE30":"\uBA54\uB274 \uC5F4\uAE30"),document.body.classList.toggle("mobile-menu-open",h),c(),n.inert=h,t.inert=!h,h?(t.hidden=!1,requestAnimationFrame(()=>{e.getAttribute("aria-expanded")==="true"&&t.classList.add("is-open")})):(t.classList.remove("is-open"),r=setTimeout(()=>{t.hidden=!0},280)),u&&e.focus({preventScroll:!0})}return e.addEventListener("click",()=>l(e.getAttribute("aria-expanded")!=="true")),document.querySelectorAll(".header a").forEach(h=>h.addEventListener("click",()=>l(!1))),document.addEventListener("keydown",h=>{if(e.getAttribute("aria-expanded")!=="true")return;if(h.key==="Escape"){l(!1,!0);return}if(h.key!=="Tab")return;let u=[...document.querySelectorAll(".header .logo a,.menu-button,.mobile-menu a")],d=u[0],f=u.at(-1);h.shiftKey&&document.activeElement===d?(h.preventDefault(),f.focus()):!h.shiftKey&&document.activeElement===f&&(h.preventDefault(),d.focus())}),s.addEventListener("change",()=>{s.matches||l(!1)}),{setAutoHideProgress(h){let u=Math.max(0,Math.min(1,h));u!==a&&(a=u,c(!0))}}}var mM=i=>Math.max(0,Math.min(1,i));function kl(i,e,t="[data-read]"){let n=matchMedia("(hover: hover) and (pointer: fine)"),s={x:0,y:0,active:!1},r=[...i.querySelectorAll(t)].map(m=>{let _=[...m.childNodes].filter(w=>w.nodeType===Node.TEXT_NODE).map(w=>w.textContent).join(""),g=document.createElement("span"),p=document.createElement("span");g.className="reading-source",g.textContent=_,p.className="reading-letters",p.setAttribute("aria-hidden","true");let b=m.dataset.readAccent||"",M=b?_.indexOf(b):-1,x=Array.from(_,(w,C)=>{let y=document.createElement("span");return y.className="reading-char",y.textContent=w,p.append(y),M>=0&&C>=M&&C<M+b.length&&y.classList.add("reading-accent"),{element:y,center:0,x:0,velocity:0,target:0}});for(let w of[...m.childNodes])w.nodeType===Node.TEXT_NODE&&w.remove();m.prepend(g,p),m.classList.add("reading-interactive");let E=x.findLast(w=>w.element.classList.contains("reading-accent"));return{word:m,letters:p,chars:x,accentEnd:E,fontSize:0}}),a=0,o=0;function c(m){let _=Math.min(.03333333333333333,(m-o)/1e3||.016666666666666666);o=m;let g=!1;for(let p of r){for(let b of p.chars)b.velocity+=((b.target-b.x)*260-b.velocity*24)*_,b.x+=b.velocity*_,Math.abs(b.target-b.x)<.015&&Math.abs(b.velocity)<.05?(b.x=b.target,b.velocity=0):g=!0,b.element.style.transform=`translate3d(${b.x.toFixed(3)}px,0,0)`;p.word.style.setProperty("--read-end-shift",`${p.chars.at(-1).x.toFixed(3)}px`),p.accentEnd&&p.word.style.setProperty("--read-accent-shift",`${p.accentEnd.x.toFixed(3)}px`)}a=g?requestAnimationFrame(c):0}function l(){a||(o=performance.now(),a=requestAnimationFrame(c))}function h(m=!1){s.active=!1;for(let _ of r){for(let g of _.chars)g.target=0,m&&(g.x=0,g.velocity=0,g.element.style.transform="none");m&&(_.word.style.setProperty("--read-end-shift","0px"),_.word.style.setProperty("--read-accent-shift","0px"))}m?(cancelAnimationFrame(a),a=0):l()}function u(){if(!s.active)return;let m=i.getBoundingClientRect();if(s.x<m.left||s.x>m.right||s.y<m.top||s.y>m.bottom){h();return}let _=[];for(let g of r){let p=g.letters.getBoundingClientRect(),b=p.top+p.height/2,M=_.find(x=>Math.abs(x.center-b)<Math.min(x.height,p.height)*.25);M||(M={center:b,height:p.height,left:p.left,right:p.right,fontSize:g.fontSize,runs:[]},_.push(M)),M.left=Math.min(M.left,p.left),M.right=Math.max(M.right,p.right),M.fontSize=Math.max(M.fontSize,g.fontSize),M.runs.push({row:g,bounds:p})}for(let g of _){let p=(s.y-g.center)/(g.height*1.15),b=Math.pow(mM(1-p*p),2),M=g.fontSize*1.35,x=g.fontSize*.64,E=Math.max(0,g.left-s.x,s.x-g.right)/M,w=Math.exp(-E*E);for(let{row:C,bounds:y}of g.runs)for(let A of C.chars){let D=(y.left+A.center-s.x)/M;A.target=x*Math.tanh(D)*b*w,A.target=Math.max(20-g.left,Math.min(innerWidth-20-g.right,A.target))}}l()}function d(){for(let m of r){let _=m.letters.getBoundingClientRect();m.fontSize=parseFloat(getComputedStyle(m.word).fontSize),m.word.style.setProperty("--read-width",`${_.width}px`);for(let g of m.chars){let p=g.element.getBoundingClientRect(),b=p.left-_.left-g.x;g.center=b+p.width/2,g.element.style.setProperty("--char-left",`${b}px`),g===m.accentEnd&&m.word.style.setProperty("--read-accent-end",`${b+p.width}px`)}}u()}i.addEventListener("pointermove",m=>{m.pointerType==="touch"||!n.matches||e.matches||(s.x=m.clientX,s.y=m.clientY,s.active=!0,u())}),i.addEventListener("pointerleave",()=>h()),i.addEventListener("pointercancel",()=>h()),window.addEventListener("blur",()=>h()),window.addEventListener("scroll",u,{passive:!0}),document.addEventListener("visibilitychange",()=>{document.hidden&&h(!0)}),e.addEventListener("change",()=>h(!0)),n.addEventListener("change",()=>h(!0));let f=new ResizeObserver(d);r.forEach(m=>f.observe(m.letters)),document.fonts.ready.then(d),d()}var Br=[{id:"yun-jiwon",name:"\uC724\uC9C0\uC6D0",viewBox:"-14 -14 268 268",color:"#3b82a6",svg:'<path d="M190.62,161.45l16.88,16.88-29.17,29.17-16.88-16.88,29.17-29.17ZM207.5,61.67l-16.88,16.88-29.17-29.17,16.88-16.88,29.17,29.17ZM120,138.42l-18.42-18.42,18.42-18.42,18.42,18.42-18.42,18.42ZM32.5,61.67l29.17-29.17,16.88,16.88-29.17,29.17-16.88-16.88ZM32.5,178.33l16.88-16.88,29.17,29.17-16.88,16.88-29.17-29.17Z"/><path d="M27.78,144.01H0v-48.02h27.78v48.02ZM95.99,240v-27.78h48.02v27.78s-48.02,0-48.02,0ZM104.84,104.84h30.32v30.32s-30.32,0-30.32,0v-30.32ZM240,95.99v48.02s-27.78,0-27.78,0v-48.02h27.78ZM144.01,0v27.78h-48.02V0h48.02Z"/>'},{id:"seo-yeonwoo",name:"\uC11C\uC5F0\uC6B0",viewBox:"-14 -14 268 268",color:"#f59000",svg:'<path d="M89.99,30.04v30h59.98v-30L119.98.04l-29.99,30ZM30,150.04h29.99v-60h-29.99L.01,120.04l29.99,30ZM89.99,210.04l29.99,30,29.99-30v-30h-59.98v30ZM179.96,90.04v60h29.99l29.99-30-29.99-30h-29.99Z" fill-rule="evenodd"/>'},{id:"lee-nayeong",name:"\uC774\uB098\uC601",viewBox:"-14 -14 268 268",color:"#00aaff",svg:'<path d="M159.57,62.27v-24.19l17.3-17.3h24.19l17.3,17.3v24.19l-17.3,17.3h-24.19l-17.3-17.3ZM176.87,217.86l-17.3-17.3v-24.19l17.3-17.3h24.19l17.3,17.3v24.19l-17.3,17.3h-24.19ZM90.44,131.43v-24.22l17.27-17.27h24.22l17.27,17.27v24.22l-17.27,17.27h-24.22l-17.27-17.27ZM21.28,62.27v-24.19l17.3-17.3h24.19l17.3,17.3v24.19l-17.3,17.3h-24.19l-17.3-17.3ZM38.58,217.86l-17.3-17.3v-24.19l17.3-17.3h24.19l17.3,17.3v24.19l-17.3,17.3h-24.19Z"/>'},{id:"kim-doyeon",name:"\uAE40\uB3C4\uC5F0",viewBox:"-14 -14 268 268",color:"#4ccad1",svg:'<path d="M135.76,239.71l-2.71.29v-36.19l3.49-.59,5.42-1.27,5.32-1.6,5.19-1.96,5.06-2.28,4.9-2.61,4.7-2.94,4.54-3.23,4.28-3.52,4.05-3.82,3.82-4.05,3.52-4.28,3.23-4.54,2.94-4.7,2.61-4.9,2.28-5.06,1.96-5.19,1.6-5.32,1.27-5.42.59-3.49h36.19l-.29,2.71-1.27,7.8-1.79,7.7-2.28,7.54-2.81,7.41-3.26,7.18-3.72,6.98-4.18,6.72-4.6,6.4-4.99,6.14-5.42,5.74-5.74,5.42-6.14,4.99-6.4,4.6-6.72,4.18-6.98,3.72-7.18,3.26-7.41,2.81-7.54,2.28-7.7,1.79-7.8,1.27ZM239.71,104.24l.29,2.71h-36.19l-.59-3.49-1.27-5.42-1.6-5.32-1.96-5.19-2.28-5.06-2.61-4.9-2.94-4.7-3.23-4.54-3.52-4.28-3.82-4.05-4.05-3.82-4.28-3.52-4.54-3.23-4.7-2.94-4.9-2.61-5.06-2.28-5.19-1.96-5.32-1.6-5.42-1.27-3.49-.59V0l2.71.29,7.8,1.27,7.7,1.79,7.54,2.28,7.41,2.81,7.18,3.26,6.98,3.72,6.72,4.18,6.4,4.6,6.14,4.99,5.74,5.42,5.42,5.74,4.99,6.14,4.6,6.4,4.18,6.72,3.72,6.98,3.26,7.18,2.81,7.41,2.28,7.54,1.79,7.7,1.27,7.8ZM104.24.29l2.71-.29v36.19l-3.49.59-5.42,1.27-5.32,1.6-5.19,1.96-5.06,2.28-4.9,2.61-4.7,2.94-4.54,3.23-4.28,3.52-4.05,3.82-3.82,4.05-3.52,4.28-3.23,4.54-2.94,4.7-2.61,4.9-2.28,5.06-1.96,5.19-1.6,5.32-1.27,5.42-.59,3.49H0l.29-2.71,1.27-7.8,1.79-7.7,2.28-7.54,2.81-7.41,3.26-7.18,3.72-6.98,4.18-6.72,4.6-6.4,4.99-6.14,5.42-5.74,5.74-5.42,6.14-4.99,6.4-4.6,6.72-4.18,6.98-3.72,7.18-3.26,7.41-2.81,7.54-2.28,7.7-1.79,7.8-1.27ZM.29,135.76l-.29-2.71h36.19l.59,3.49,1.27,5.42,1.6,5.32,1.96,5.19,2.28,5.06,2.61,4.9,2.94,4.7,3.23,4.54,3.52,4.28,3.82,4.05,4.05,3.82,4.28,3.52,4.54,3.23,4.7,2.94,4.9,2.61,5.06,2.28,5.19,1.96,5.32,1.6,5.42,1.27,3.49.59v36.19l-2.71-.29-7.8-1.27-7.7-1.79-7.54-2.28-7.41-2.81-7.18-3.26-6.98-3.72-6.72-4.18-6.4-4.6-6.14-4.99-5.74-5.42-5.42-5.74-4.99-6.14-4.6-6.4-4.18-6.72-3.72-6.98-3.26-7.18-2.81-7.41-2.28-7.54-1.79-7.7-1.27-7.8Z"/>'},{id:"kim-juyoun",name:"\uAE40\uC8FC\uC5F0",viewBox:"-14 -14 268 268",color:"#fbe19f",svg:'<path d="M160.68,183.3l22.62-22.62,56.7,56.7v2.61l-20.01,20.01h-2.61l-56.7-56.7ZM219.99,0l20.01,20.01v2.61l-56.7,56.7-22.62-22.62L217.38,0h2.61ZM135.99,218.01l-15.99,15.99-15.99-15.99v-82.02H21.99l-15.99-15.99,15.99-15.99h82.02V21.99l15.99-15.99,15.99,15.99v82.02h82.02l15.99,15.99-15.99,15.99h-82.02v82.02ZM0,219.99v-2.61l56.7-56.7,22.62,22.62-56.7,56.7h-2.61L0,219.99ZM79.32,56.7l-22.62,22.62L0,22.62v-2.61L20.01,0h2.61l56.7,56.7Z"/>'},{id:"kim-jiyou-cocorang",name:"\uAE40\uC9C0\uC720",viewBox:"-14 -14 268 268",color:"#ffba79",svg:'<path d="M210.05,90.24l29.95-30.03L179.97.56l-30.06,29.38L119.91.47l-30.07,29.62L60.08.35,0,60.24l30.15,29.89,60-59.82,29.6,29.87c-30.36.12-55.33,22.81-59.14,52.16-.37,2.48-.65,5-.73,7.58l-29.82-29.48L.04,120.26l29.95,29.58,29.95-28.73c.06,1.6.24,3.15.41,4.71.02.22.03.44.06.66.12.95.28,1.88.43,2.82.21,1.36.44,2.71.74,4.04,0,.03.02.06.02.09,1.31,5.75,3.42,11.18,6.25,16.17.14.24.29.47.43.71.79,1.34,1.6,2.67,2.48,3.94.42.6.87,1.17,1.31,1.75.67.89,1.33,1.8,2.05,2.65.63.75,1.3,1.44,1.96,2.16.62.67,1.22,1.36,1.87,2,.64.63,1.33,1.21,1.99,1.81.77.7,1.54,1.41,2.35,2.07.38.31.79.58,1.18.88,10.1,7.79,22.71,12.47,36.44,12.49l-29.52,30.09,29.51,29.53,30.12-29.33,29.83,29.53,59.76-59.71-29.34-29.85,29.64-30.37-29.85-29.71ZM209.53,89.68l-29.38,30.23c-.1-2.75-.42-5.44-.83-8.08-4.03-29.06-28.84-51.47-58.97-51.64l29.36-29.58,59.83,59.07ZM149.93,209.94l-29.76-29.64c5.37-.17,10.47-1.01,15.32-2.33.87-.23,1.76-.43,2.61-.7.55-.17,1.07-.4,1.6-.59,1.3-.45,2.6-.9,3.85-1.44,1.45-.62,2.85-1.32,4.23-2.04.27-.14.55-.25.81-.39,10.27-5.54,18.56-13.86,24.07-24.06.29-.53.52-1.09.79-1.63.57-1.13,1.15-2.24,1.64-3.41.44-1.03.81-2.11,1.19-3.17.28-.77.59-1.52.84-2.31.21-.67.37-1.37.56-2.05,1.39-4.9,2.27-10.04,2.47-15.42l29.64,29.18-59.89,59.99Z"/><polygon points=".4 180.23 60.26 239.84 89.87 210.08 30.05 150.26 .4 180.23"/>'},{id:"ahn-nagyeong",name:"\uC548\uB098\uACBD",viewBox:"-14 -14 268 268",color:"#ccebf5",svg:'<path d="M214.99,133.31h-55.09l-13.31-13.31,13.31-13.31h55.09l13.31,13.31-13.31,13.31ZM120,139.01l-19.01-19.01,19.01-19.01,19.01,19.01-19.01,19.01ZM106.69,214.99v-55.09l13.31-13.31,13.31,13.31v55.09l-13.31,13.31-13.31-13.31ZM133.31,80.1l-13.31,13.31-13.31-13.31V25.01l13.31-13.31,13.31,13.31v55.09ZM80.1,106.69l13.31,13.31-13.31,13.31H25.01l-13.31-13.31,13.31-13.31h55.09Z"/>'},{id:"kim-minjae",name:"\uAE40\uBBFC\uC7AC",viewBox:"-14 -14 268 268",color:"#b5b5b5",svg:'<path d="M160,80.01V0h80v80h-80ZM240,240.01h-80v-80h80v80ZM0,80.01V0h80v80H0ZM80,80.01h80v80h-80v-80ZM80,240.01H0v-80h80v80Z"/>'},{id:"nam-nayoung",name:"\uB0A8\uB098\uC601",viewBox:"-14 -14 268 268",color:"#f2f070",svg:'<path d="M-.22-.05h120L-.22,119.95V-.05ZM-.22,119.95l120,120,120-120L119.78-.05h120v240H-.22v-120Z"/>'},{id:"jo-eungyo",name:"\uC870\uC740\uAD50",viewBox:"-14 -14 268 268",color:"#ffd834",svg:'<path d="M.34,-.66h60v30h-30v30h-30ZM180.34,-.66h60v60h-30v-30h-30ZM.34,179.34h30v30h30v30h-60ZM210.34,179.34h30v60h-60v-30h30Z"/><polygon points="120.34 50.91 188.77 119.34 120.34 187.77 51.91 119.34"/>'},{id:"song-yujin",name:"\uC1A1\uC720\uC9C4",viewBox:"-14 -14 268 268",color:"#4df4ff",svg:'<polygon points="117.34 68.5 67.06 17.22 16.13 68.38 67.4 118.43 66.86 68.43 117.34 68.5"/><polygon points="117.96 170.13 168.66 119.44 117.34 68.5 67.4 118.43 15.94 170.09 66.83 221.24 117.42 170.52 66.82 170.16 67.05 119.58 117.96 170.13"/><polygon points="169.2 118.7 219.73 68.39 168.7 17.38 118.3 68.23 168.73 68.47 169.2 118.7"/><polygon points="169.04 119.85 168.73 170.27 118.35 170.54 169.01 221.12 219.83 170.04 169.04 119.85"/>'},{id:"kim-jiyoo-phishing-ddook",name:"\uAE40\uC9C0\uC720",viewBox:"-14 -14 268 268",color:"#e5903a",svg:'<path d="M120,240L0,120,120,0l120,120-120,120ZM120,200l80-80L120,40,40,120l80,80ZM86.67,120l33.33-33.33,33.33,33.33-33.33,33.33-33.33-33.33Z"/>'},{id:"son-yejin",name:"\uC190\uC608\uC9C4",viewBox:"-14 -14 268 268",color:"#536dea",svg:'<path d="M-.16.02v84h24V24.02h60V.02H-.16ZM215.84,24.02v60h24V.02h-84v24h60ZM-.16,156.02v84h84v-24H23.84v-60H-.16ZM155.84,240.02h84v-84h-24v60h-60v24Z" fill-rule="evenodd"/><path d="M134.2,52.94v-12.41h-33.1v12.41h33.1ZM51.45,135.69v-33.1h-12.41v33.1h12.41ZM196.26,135.69v-33.1h-12.41v33.1h12.41ZM134.2,197.75v-12.41h-33.1v12.41h33.1ZM107.31,119.14l10.34,10.34,10.34-10.34-10.34-10.34-10.34,10.34Z" fill-rule="evenodd"/>'},{id:"lim-jongwon",name:"\uC784\uC885\uC6D0",viewBox:"-14 -14 268 268",color:"#e1ff85",svg:'<path d="M185.28,54.89V0H54.89v54.89H0v130.4h54.89v54.72h130.4v-54.72h54.72V54.89h-54.72ZM174.65,65.35v109.29h-109.29v-109.29h109.29Z"/><rect x="11.18" y="11.1" width="32.76" height="32.76" transform="translate(-11.36 27.54) rotate(-45)"/><rect x="196.32" y="11.1" width="32.76" height="32.76" transform="translate(42.87 158.45) rotate(-45)"/><rect x="11.18" y="196.15" width="32.76" height="32.76" transform="translate(-142.21 81.74) rotate(-45)"/><rect x="196.32" y="196.15" width="32.76" height="32.76" transform="translate(-87.99 212.65) rotate(-45)"/>'},{id:"min-jiho",name:"\uBBFC\uC9C0\uD638",viewBox:"-14 -14 268 268",color:"#ccbbff",svg:'<path d="M147.49,226.94c-18.22,4.31-36.68,4.41-54.83-.04l-.37-39.62-28.41,27.73c-16.16-9.95-29.35-22.77-38.62-39.01l27.64-27.94-39.36-.16c-4.66-18.12-4.75-36.64-.06-54.89l39.15-.75-27.35-27.48c8.94-16.19,22.16-29.2,38.62-39.16l28.46,27.74.28-39.66c17.76-4.47,36.14-4.27,54.62-.15l.46,39.77,27.91-27.59c16.46,8.86,29.04,22.27,39.13,38.6l-27.8,28.38,39.61.27c4.61,18.3,4.51,36.73-.08,54.91l-39.38.16,27.31,27.6c-.72,4.91-4.8,7.03-7.05,10.45-7.92,12.07-18.69,20.97-31.46,29.04l-28.21-27.81-.23,39.59ZM120.18,158.92l38.48-38.99-38.52-38.51,27.06-27.57c-17.66-7.1-36.59-7.08-54.26-.02l26.77,27.6-38.57,38.91,39.04,38.58ZM80.77,119.63l-27.24-26.71c-6.95,18.14-7.39,36.73.18,54.69l27.06-27.98ZM186.53,147.42c7.11-18.42,7.12-36.4-.17-54.33l-27.4,27.21,27.57,27.11ZM147.01,186.41l-26.94-27.47-27.28,27.79c18.36,7.27,37.58,7.31,54.22-.32Z"/>'},{id:"ju-bomin",name:"\uC8FC\uBCF4\uBBFC",viewBox:"-14 -14 268 268",color:"#3f66b5",svg:'<path d="M119.99,7.85l-.25-7.85h28.3l.21,6.01.57,5.98.99,5.94,1.38,5.87,1.73,5.77,2.12,5.62,2.48,5.48,2.83,5.31,3.18,5.09,3.5,4.92,3.82,4.63,4.14,4.39,4.39,4.14,4.63,3.82,4.92,3.5,5.09,3.18,5.31,2.83,5.48,2.48,5.62,2.12,5.77,1.73,5.87,1.38,5.94.99,5.98.57,6.01.21v28.3l-7.85-.25-7.85-.78-7.75-1.27-7.68-1.8-7.53-2.26-7.36-2.79-7.18-3.25-6.93-3.71-6.68-4.14-6.4-4.6-6.08-4.99-5.73-5.38-5.38-5.73-4.99-6.08-4.6-6.4-4.14-6.68-3.71-6.93-3.25-7.18-2.79-7.36-2.26-7.53-1.8-7.68-1.27-7.75-.78-7.85ZM240,120.12v28.21l-5.99.21-5.96.56-5.92.99-5.85,1.38-5.75,1.73-5.61,2.12-5.47,2.47-5.29,2.82-5.08,3.17-4.9,3.49-4.62,3.81-4.37,4.13-4.13,4.37-3.81,4.62-3.49,4.9-3.17,5.08-2.82,5.29-2.47,5.47-2.12,5.61-1.73,5.75-1.38,5.85-.99,5.92-.56,5.96-.21,5.99h-28.21l.25-7.83.78-7.83,1.27-7.72,1.8-7.65,2.26-7.51,2.79-7.33,3.24-7.16,3.7-6.91,4.13-6.66,4.58-6.38,4.97-6.06,5.36-5.71,5.71-5.36,6.06-4.97,6.38-4.58,6.66-4.13,6.91-3.7,7.16-3.24,7.33-2.79,7.51-2.26,7.65-1.8,7.72-1.27,7.83-.78,7.83-.25ZM7.83,119.65l-7.83.25v-28.21l5.99-.21,5.96-.56,5.92-.99,5.85-1.38,5.75-1.73,5.61-2.12,5.47-2.47,5.29-2.82,5.08-3.17,4.9-3.49,4.62-3.81,4.37-4.13,4.13-4.37,3.81-4.62,3.49-4.9,3.17-5.08,2.82-5.29,2.47-5.47,2.12-5.61,1.73-5.75,1.38-5.85.99-5.92.56-5.96.21-5.99h28.21l-.25,7.83-.78,7.83-1.27,7.72-1.8,7.65-2.26,7.51-2.79,7.34-3.24,7.16-3.7,6.91-4.13,6.67-4.58,6.38-4.97,6.07-5.36,5.71-5.71,5.36-6.07,4.97-6.38,4.58-6.67,4.13-6.91,3.7-7.16,3.24-7.34,2.79-7.51,2.26-7.65,1.8-7.72,1.27-7.83.78ZM116.34,208.83l1.81,7.69,1.28,7.76.78,7.86.25,7.86h-28.34l-.21-6.02-.57-5.99-.99-5.95-1.38-5.88-1.74-5.77-2.13-5.63-2.48-5.49-2.83-5.31-3.19-5.1-3.51-4.92-3.83-4.64-4.14-4.39-4.39-4.14-4.64-3.83-4.92-3.51-5.1-3.19-5.31-2.83-5.49-2.48-5.63-2.13-5.77-1.74-5.88-1.38-5.95-.99-5.99-.57-6.02-.21v-28.34l7.86.25,7.86.78,7.76,1.28,7.69,1.81,7.55,2.27,7.37,2.8,7.19,3.26,6.94,3.72,6.7,4.14,6.41,4.61,6.09,4.99,5.74,5.38,5.38,5.74,4.99,6.09,4.61,6.41,4.14,6.7,3.72,6.94,3.26,7.19,2.8,7.37,2.27,7.55Z"/>'},{id:"ham-daeyeon",name:"\uD568\uB300\uC5F0",viewBox:"-14 -14 268 268",color:"#7f1616",svg:'<path d="M10.63,46.9l5.01-6.97,4.66-5.72,99.7,85.8L20.3,205.8l-4.66-5.72-5.01-6.97-4.55-7.32-4.05-7.61-2.03-4.44,6.51-2.7,3.27-1.74,6.19-4.16,5.58-4.91,4.91-5.58,2.17-3.02,1.99-3.16,3.27-6.68,2.38-7.04.85-3.63,1-7.36v-7.47l-1-7.36-.85-3.63-2.38-7.04-3.27-6.68-4.16-6.19-4.91-5.58-5.58-4.91-6.19-4.16-3.27-1.74-6.51-2.7,2.03-4.44,4.05-7.61,4.55-7.32ZM120,120L34.2,20.3l5.72-4.66,6.97-5.01,7.32-4.55,7.61-4.05,4.44-2.03,2.7,6.51,1.74,3.27,4.16,6.19,2.35,2.88,5.26,5.26,5.9,4.52,6.44,3.73,3.41,1.53,7.04,2.38,3.63.85,7.36,1h7.47l7.36-1,7.18-1.92,6.9-2.84,3.27-1.74,6.19-4.16,5.58-4.91,4.91-5.58,4.16-6.19,1.74-3.27,2.7-6.51,4.44,2.03,7.61,4.05,7.32,4.55,6.97,5.01,5.72,4.66-85.8,99.7,99.7-85.8,4.66,5.72,5.01,6.97,4.55,7.32,4.05,7.61,2.03,4.44-6.51,2.7-3.27,1.74-6.19,4.16-2.88,2.35-5.26,5.26-4.52,5.9-3.73,6.44-1.53,3.41-2.38,7.04-.85,3.63-1,7.36v7.47l1,7.36,1.92,7.18,1.32,3.48,3.27,6.68,4.16,6.19,4.91,5.58,5.58,4.91,6.19,4.16,3.27,1.74,6.51,2.7-2.03,4.44-4.05,7.61-4.55,7.32-5.01,6.97-4.66,5.72-99.7-85.8,85.8,99.7-5.72,4.66-6.97,5.01-7.32,4.55-7.61,4.05-4.44,2.03-2.7-6.51-1.74-3.27-4.16-6.19-4.91-5.58-2.7-2.56-5.9-4.52-3.16-1.99-6.68-3.27-7.04-2.38-3.63-.85-7.36-1h-7.47l-7.36,1-7.18,1.92-3.48,1.32-6.68,3.27-6.19,4.16-5.58,4.91-4.91,5.58-4.16,6.19-1.74,3.27-2.7,6.51-4.44-2.03-7.61-4.05-7.32-4.55-6.97-5.01-5.72-4.66,85.8-99.7Z"/>'},{id:"youn-taegyun",name:"\uC724\uD0DC\uADE0",viewBox:"-14 -14 268 268",color:"#ffce07",svg:'<path d="M133.33,106.67V0h106.67v40h-66.67v26.67h66.67v40h-106.67ZM133.33,240v-106.67h106.67v40h-66.67v26.67h66.67v40h-106.67ZM106.67,0v106.67H0v-40h66.67v-26.67H0V0h106.67ZM106.67,133.33v106.67H0v-40h66.67v-26.67H0v-40h106.67Z"/>'},{id:"lee-goeun",name:"\uC774\uACE0\uC740",viewBox:"-14 -14 268 268",color:"#eec35a",svg:'<path d="M127.82,239.42c-11.17.29-24.5.07-37.02-3.38l-.14-39.9c0-.58.82-1.54.39-2.55-.45-1.05-2.12-1.08-2.71-.16l-1.4,2.18-27.29,27.56c-17.98-10.36-32.02-24.86-42.67-42.62l29.83-30.25-42.63-.51c-4.91-20.02-5.03-40.34.04-59.96l42.82-.46-29.97-30.57c10.56-17.82,24.8-31.85,42.57-42.56l30.66,30.52.25-43.23c19.79-5.1,40.03-5.06,59.83.03l.14,43.46,30.97-30.75c17.48,10.61,31.85,24.8,42.38,42.5l-29.78,30.41,42.58.61c5.16,19.69,4.91,39.94.05,60.05l-42.46.44c9.71,10.68,19.1,19.49,29.62,29.87-9.83,17.85-24.56,32.39-42.46,42.97l-30.62-30.2-.39,42.78c-6.55,2.14-13.28,3.49-19.64,3.57M90.64,149.62l-.02-59.69,59.65-.05.34,60.11,41.24-.37-28.61-29.84,28.92-29.62-41.7-.43-.37-41.55-29.89,29.13-29.34-28.93-.35,41.52-42.55.38,29.88,29.71-29.55,29.83,41.95.33c.21-.24.43-.39.39-.52ZM91.87,150.04c-.31.54-.71.93-1.24,1.24l.15,40.67,29.69-29.58,29.55,28.9.26-41.3-58.42.05Z"/>'},{id:"ju-yejin",name:"\uC8FC\uC608\uC9C4",viewBox:"-14 -14 268 268",color:"#d5c8ac",svg:'<path d="M.34.26v30h30V.26H.34ZM60.34,30.26V.26l-30,30h30ZM.34,60.26h30v-30L.34,60.26ZM90.34,90.26l-30,30,30,30,30,30,30-30,30-30-30-30-30-30-30,30ZM30.34,180.26H.34l30,30v-30ZM30.34,210.26H.34v30h30v-30ZM60.34,240.26v-30h-30l30,30ZM180.34.26v30h30L180.34.26ZM210.34,30.26h30V.26h-30v30ZM210.34,60.26h30l-30-30v30ZM240.34,180.26h-30v30l30-30ZM180.34,210.26v30l30-30h-30ZM240.34,240.26v-30h-30v30h30Z" fill-rule="evenodd"/>'},{id:"jo-wooseong",name:"\uC870\uC6B0\uC131",viewBox:"-14 -14 268 268",color:"#72a7c1",svg:'<path d="M240,86.31v25.26h-88.42v-23.15h-23.15V0h25.26v86.31h86.31ZM240,128.43v25.26h-86.31v86.31h-25.26v-88.42h23.15v-23.15h88.42ZM98.94,141.06v-42.13h42.13v42.13h-42.13ZM0,86.31h86.31V0h25.26v88.42h-23.15v23.15H0v-25.26ZM86.31,153.69H0v-25.26h88.42v23.15h23.15v88.42h-25.26v-86.31Z"/>'},{id:"kim-hawon",name:"\uAE40\uD558\uC6D0",viewBox:"-14 -14 268 268",color:"#e692ff",svg:'<path d="M35.94,240.06c.13-43.47,37.43-78.68,83.43-78.68s83.31,35.2,83.43,78.68h36.57c-.13-62.57-53.8-113.25-120-113.25S-.5,177.5-.63,240.06h36.57Z"/><path d="M61.88,240.06h26.26c.13-16.21,14.06-29.31,31.24-29.31s31.11,13.1,31.24,29.31h26.26c-.13-29.92-25.82-54.14-57.49-54.14s-57.37,24.22-57.49,54.14Z"/><path d="M202.81.06c-.13,43.47-37.43,78.68-83.43,78.68S36.06,43.53,35.94.06H-.63c.13,62.57,53.8,113.25,120,113.25S239.25,62.63,239.37.06h-36.57Z"/><path d="M176.87.07h-26.26c-.13,16.21-14.06,29.31-31.24,29.31S88.27,16.28,88.14.07h-26.26c.13,29.92,25.82,54.14,57.49,54.14S176.74,29.99,176.87.07Z"/>'},{id:"song-seungbin",name:"\uC1A1\uC2B9\uBE48",viewBox:"-14 -14 268 268",color:"#ffc5c8",svg:'<path d="M240,120l-30.56,30.53-30.53-30.53,30.53-30.53,30.56,30.53ZM82.92,135.28v-30.56l21.79-21.79h30.56l21.79,21.79v30.56l-21.79,21.79h-30.56l-21.79-21.79ZM120,61.1l-30.53-30.53L120,0l30.53,30.56-30.53,30.53ZM150.53,209.44l-30.53,30.56-30.53-30.56,30.53-30.53,30.53,30.53ZM30.56,150.53L0,120l30.56-30.53,30.53,30.53-30.53,30.53Z"/>'},{id:"park-yoonji",name:"\uBC15\uC724\uC9C0",viewBox:"-14 -14 268 268",color:"#065182",svg:'<path d="M60.34,60.26h120v-30h-30V.26h-60v30h-30v30ZM.34,120.26v30h30v30h30V60.26h-30v30H.34v30ZM180.34,120.26v60h30v-30h30v-60h-30v-30h-30v60ZM60.34,210.26h30v30h60v-30h30v-30H60.34v30Z" fill-rule="evenodd"/>'},{id:"kim-jiyoon",name:"\uAE40\uC9C0\uC724",viewBox:"-14 -14 268 268",color:"#ff7154",svg:'<path d="M193.67.12h46.33v46.33h-46.33V.12ZM240,240.12h-46.33v-46.33h46.33v46.33ZM90.54,132.75v-25.26l16.83-16.83h25.26l16.83,16.83v25.26l-16.83,16.83h-25.26l-16.83-16.83ZM46.33.12v46.33H0V.12h46.33ZM46.33,193.79v46.33H0v-46.33h46.33Z"/>'},{id:"noh-minyeong",name:"\uB178\uBBFC\uC601",viewBox:"-14 -14 268 268",color:"#c4272f",svg:'<path d="M153.33,26.67V0h86.67v86.67h-26.67V26.67h-60ZM153.33,240v-26.67h60v-60h26.67v86.67h-86.67ZM153.33,63.33v-20h43.33v43.33h-20v-23.33h-23.33ZM153.33,196.67v-20h23.33v-23.33h20v43.33h-43.33ZM0,153.33h26.67v60h60v26.67H0v-86.67ZM26.67,86.67H0V0h86.67v26.67H26.67v60ZM43.33,153.33h20v23.33h23.33v20h-43.33v-43.33ZM63.33,86.67h-20v-43.33h43.33v20h-23.33v23.33Z"/>'},{id:"kwon-minseong",name:"\uAD8C\uBBFC\uC131",viewBox:"-14 -14 268 268",color:"#4f00b4",svg:'<circle cx="119.84" cy="118.02" r="13.21"/><path d="M240.1,95.81V-.17S141.63-.17,141.63-.17c49.47,8.76,88.67,47.03,98.48,95.98Z"/><path d="M141.63,239.83h98.48v-95.98c-9.81,48.95-49.01,87.22-98.48,95.98Z"/><path d="M98.58-.17H.1v95.98C9.91,46.86,49.12,8.59,98.58-.17Z"/><path d="M.1,143.85v95.98h98.48C49.12,231.07,9.91,192.79.1,143.85Z"/>'},{id:"kim-hyejin",name:"\uAE40\uD61C\uC9C4",viewBox:"-14 -14 268 268",color:"#178466",svg:'<path d="M132.22,10l97.78,97.78h-97.78V10ZM230,132.22l-97.78,97.78v-97.78h97.78ZM10,107.78L107.78,10v97.78H10ZM107.78,230L10,132.22h97.78v97.78Z"/>'},{id:"yoo-hyejin",name:"\uC720\uD61C\uC9C4",viewBox:"-14 -14 268 268",color:"#8bff6c",svg:'<path d="M150.51,221.71l26.55-26.55-26.55-26.52,18.21-18.21,26.52,26.55,26.55-26.55,18.21,18.21-26.55,26.52,26.55,26.55-18.21,18.21-26.55-26.55-26.52,26.55-18.21-18.21ZM195.24,62.86l-26.52,26.55-18.21-18.21,26.55-26.52-26.55-26.55L168.72-.08l26.52,26.55L221.8-.08l18.21,18.21-26.55,26.55,26.55,26.52-18.21,18.21-26.55-26.55ZM44.77,176.97l26.52-26.55,18.21,18.21-26.55,26.52,26.55,26.55-18.21,18.21-26.52-26.55-26.55,26.55L0,221.71l26.55-26.55L0,168.63l18.21-18.21,26.55,26.55ZM89.5,18.12l-26.55,26.55,26.55,26.52-18.21,18.21-26.52-26.55-26.55,26.55L0,71.2l26.55-26.52L0,18.12,18.21-.08l26.55,26.55L71.29-.08l18.21,18.21Z"/>'},{id:"kim-sungeun",name:"\uAE40\uC131\uC740",viewBox:"-14 -14 268 268",color:"#a8f0db",svg:'<path d="M240,0v40L200,0h40ZM240,240h-40l40-40v40ZM193.33,120l26.67,26.67-26.67,26.67-53.33-53.33,53.33-53.33,26.67,26.67-26.67,26.67ZM120,46.67l26.67-26.67,26.67,26.67-53.33,53.33-53.33-53.33,26.67-26.67,26.67,26.67ZM120,193.33l-26.67,26.67-26.67-26.67,53.33-53.33,53.33,53.33-26.67,26.67-26.67-26.67ZM46.67,120l-26.67-26.67,26.67-26.67,53.33,53.33-53.33,53.33-26.67-26.67,26.67-26.67ZM0,0h40L0,40V0ZM0,240v-40l40,40H0Z"/>'},{id:"park-yuna",name:"\uBC15\uC724\uC544",viewBox:"-14 -14 268 268",color:"#bdffbf",svg:'<path d="M225.26,134.66h-18.95l-14.72-14.75,14.72-14.75h18.95l14.75,14.75-14.75,14.75ZM120,183.07l-63.16-63.16,63.16-63.16,63.16,63.16-63.16,63.16ZM105.26,225.17v-18.95l14.75-14.72,14.75,14.72v18.95l-14.75,14.75-14.75-14.75ZM134.75,33.61l-14.75,14.72-14.75-14.72V14.66L120-.08l14.75,14.75v18.95ZM33.7,105.17l14.72,14.75-14.72,14.75H14.75L0,119.92l14.75-14.75h18.95Z"/>'},{id:"go-biju",name:"\uACE0\uBE44\uC8FC",viewBox:"-14 -14 268 268",color:"#50c4a6",svg:'<path d="M167.3,9.57l-.47-4.77-.17-4.8h73.33v73.33l-4.8-.17-4.77-.47-4.73-.77-4.67-1.1-4.6-1.4-4.5-1.67-4.37-2-4.23-2.27-4.07-2.53-3.9-2.8-3.73-3.03-3.5-3.27-3.27-3.5-3.03-3.73-2.8-3.9-2.53-4.07-2.27-4.23-2-4.37-1.67-4.5-1.4-4.6-1.1-4.67-.77-4.73ZM235.2,166.83l4.8-.17v73.33h-73.33l.17-4.8.47-4.77.77-4.73,1.1-4.67,1.4-4.6,1.67-4.5,2-4.37,2.27-4.23,2.53-4.07,2.8-3.9,3.03-3.73,3.27-3.5,3.5-3.27,3.73-3.03,3.9-2.8,4.07-2.53,4.23-2.27,4.37-2,4.5-1.67,4.6-1.4,4.67-1.1,4.73-.77,4.77-.47ZM163.33,120l-.37,5.67-1.1,5.53-.83,2.73-2.17,5.23-1.33,2.5-1.5,2.4-3.47,4.5-4,4-2.2,1.8-4.7,3.17-2.5,1.33-5.23,2.17-2.73.83-5.53,1.1-2.83.27-2.83.1-5.67-.37-2.8-.47-5.47-1.47-2.63-1-5.1-2.5-4.7-3.17-2.2-1.8-4-4-1.8-2.2-3.17-4.7-1.33-2.5-2.17-5.23-.83-2.73-1.1-5.53-.27-2.83-.1-2.83.37-5.67,1.1-5.53.83-2.73,1-2.63,2.5-5.1,3.17-4.7,1.8-2.2,4-4,2.2-1.8,2.3-1.67,4.9-2.83,2.6-1.17,5.37-1.83,5.53-1.1,2.83-.27,2.83-.1,5.67.37,5.53,1.1,2.73.83,2.63,1,5.1,2.5,2.4,1.5,4.5,3.47,4,4,1.8,2.2,1.67,2.3,2.83,4.9,2.17,5.23.83,2.73,1.1,5.53.37,5.67ZM9.57,72.7l-4.77.47-4.8.17V0h73.33l-.17,4.8-.47,4.77-.77,4.73-1.1,4.67-1.4,4.6-1.67,4.5-2,4.37-2.27,4.23-2.53,4.07-2.8,3.9-3.03,3.73-3.27,3.5-3.5,3.27-3.73,3.03-3.9,2.8-4.07,2.53-4.23,2.27-4.37,2-4.5,1.67-4.6,1.4-4.67,1.1-4.73.77ZM70.83,221.03l1.1,4.67.77,4.73.47,4.77.17,4.8H0v-73.33l4.8.17,4.77.47,4.73.77,4.67,1.1,4.6,1.4,4.5,1.67,4.37,2,4.23,2.27,4.07,2.53,3.9,2.8,3.73,3.03,3.5,3.27,3.27,3.5,3.03,3.73,2.8,3.9,2.53,4.07,2.27,4.23,2,4.37,1.67,4.5,1.4,4.6Z"/>'},{id:"kim-dahyun",name:"\uAE40\uB2E4\uD604",viewBox:"-14 -14 268 268",color:"#d33bff",svg:'<path d="M119.27,104.35l.77,7.83.27,7.83.27-7.83.77-7.83,1.27-7.73,1.8-7.67,2.27-7.5,2.77-7.37,3.23-7.13,3.7-6.93,4.17-6.67,4.57-6.4,4.97-6.07,5.37-5.73,5.73-5.37,6.07-4.97,6.4-4.57,6.67-4.17,6.93-3.7,7.13-3.23,7.37-2.77,7.5-2.27,7.67-1.8,7.73-1.27,7.83-.77,7.83-.27v240l-7.83-.27-7.83-.77-7.73-1.27-7.67-1.8-7.5-2.27-7.37-2.77-7.13-3.23-6.93-3.7-6.67-4.17-6.4-4.57-6.07-4.97-5.73-5.37-5.37-5.73-4.97-6.07-4.57-6.4-4.17-6.67-3.7-6.93-3.23-7.13-2.77-7.37-2.27-7.5-1.8-7.67-1.27-7.73-.77-7.83-.27-7.83-.27,7.83-.77,7.83-1.27,7.73-1.8,7.67-2.27,7.5-2.77,7.37-3.23,7.13-3.7,6.93-4.17,6.67-4.57,6.4-4.97,6.07-5.37,5.73-5.73,5.37-6.07,4.97-6.4,4.57-6.67,4.17-6.93,3.7-7.13,3.23-7.37,2.77-7.5,2.27-7.67,1.8-7.73,1.27-7.83.77-7.83.27V.02l7.83.27,7.83.77,7.73,1.27,7.67,1.8,7.5,2.27,7.37,2.77,7.13,3.23,6.93,3.7,6.67,4.17,6.4,4.57,6.07,4.97,5.73,5.37,5.37,5.73,4.97,6.07,4.57,6.4,4.17,6.67,3.7,6.93,3.23,7.13,2.77,7.37,2.27,7.5,1.8,7.67,1.27,7.73Z"/>'}];var xM=Br.filter(({color:i})=>{let[e,t,n]=i.slice(1).match(/../g).map(s=>{let r=parseInt(s,16)/255;return r<=.04045?r/12.92:((r+.055)/1.055)**2.4});return 1.05/(.2126*e+.7152*t+.0722*n+.05)>=2.3});function Vl(){let i=new Set;return e=>{let t=xM.filter(s=>!i.has(s.color)),n=t[Math.floor(Math.random()*t.length)];e.icon&&i.delete(e.icon.color),i.add(n.color),e.icon=n,e.word.style.setProperty("--keyword-color",n.color),e.glyph.dataset.iconId=n.id,e.glyph.innerHTML=`<svg viewBox="${n.viewBox}" fill="currentColor" aria-hidden="true">${n.svg}</svg>`}}function Hl(i,e){let t=e.matches?[{opacity:0},{opacity:1,offset:.25},{opacity:0}]:[{opacity:0,transform:"translate(0,.12em) rotate(-12deg) scale(.25)"},{opacity:1,transform:"translate(.18em,-.28em) rotate(14deg) scale(1.25)",offset:.25},{opacity:1,transform:"translate(.28em,-.12em) rotate(30deg) scale(.90)",offset:.55},{opacity:0,transform:"translate(.42em,-.30em) rotate(48deg) scale(.20)"}];return i.animate(t,{duration:e.matches?240:480,easing:"cubic-bezier(.22,.7,.3,1)"})}var Rd=i=>Math.max(0,Math.min(1,i));function Xm(i,e){let t=Vl(),n=[...i.querySelectorAll("[data-keyword]")].map(p=>{let b=p.querySelector("[data-read]"),M=document.createElement("span");M.className="keyword-pop",M.setAttribute("aria-hidden","true"),b.append(M);let x={row:p,word:b,glyph:M,completed:!1,animation:null,started:!1,recolor:!1,icon:null};return t(x),x}),s=i.querySelector(".reading-line:not([data-keyword]) [data-read]");kl(i.querySelector(".individuality-title"),e);let r=n.length+(s?.7:0),a=0,o=0,c=0,l=0,h=!1,u=null;function d(p){p&&(p.animation?.cancel(),p.animation=null,p.completed&&(p.row.dataset.phase="complete"),u===p&&(u=null))}function f(p){d(u);let b=p.word.getBoundingClientRect();if(b.bottom<=70||b.top>=innerHeight)return;u=p;let M=Hl(p.glyph,e);p.animation=M,p.row.dataset.phase="pop",M.onfinish=()=>{p.animation===M&&d(p)}}function m(p=!0){let b=o*r;n.forEach((M,x)=>{let E=b-x,w=Rd(E/.52);E<=0?(M.started&&(M.recolor=!0),M.started=!1):M.started||(M.recolor&&t(M),M.started=!0,M.recolor=!1),M.word.style.setProperty("--read-fill",`${w*100}%`),w<1?(d(M),M.completed=!1,M.row.dataset.phase=E<=0?"waiting":"text"):M.completed||(M.completed=!0,p&&f(M)),w===1&&(M.row.dataset.phase=M.animation?"pop":"complete")}),s?.style.setProperty("--read-fill",`${Rd((b-n.length)/.7)*100}%`)}function _(p){let b=Math.min(.05,(p-l)/1e3||.016666666666666666);l=p,o+=(a-o)*(1-Math.exp(-b/.09)),Math.abs(a-o)<5e-5&&(o=a),m(),c=o===a?0:requestAnimationFrame(_)}function g(p){a=Rd(p);let b=i.getBoundingClientRect(),M=b.bottom<=0||b.top>=innerHeight;if(!h||M||e.matches){c&&cancelAnimationFrame(c),c=0,M&&d(u),o=a,m(h&&!M),h=!0;return}!c&&o!==a&&(l=performance.now(),c=requestAnimationFrame(_))}return e.addEventListener("change",()=>{d(u),g(a)}),m(!1),{update:g}}var Cd=.65,qm=.9,_M=i=>{let e=Math.max(0,Math.min(1,i));return e*e*(3-2*e)};function Zm(i,e){let t=Vl(),n=new Map,s=null;i.forEach((o,c)=>{let l=o.querySelector("[data-caption-keyword]");if(!l)return;let h=document.createElement("span"),u=document.createElement("span");h.className="caption-keyword-color",h.dataset.label=l.textContent,h.setAttribute("aria-hidden","true"),u.className="keyword-pop",u.setAttribute("aria-hidden","true"),l.append(h,u);let d={word:l,glyph:u,icon:null,started:!1,recolor:!1,completed:!1,animation:null};t(d),n.set(c,d)});function r(o){o&&(o.animation?.cancel(),o.animation=null,s===o&&(s=null))}function a(o){r(s);let c=o.word.getBoundingClientRect();if(c.bottom<=70||c.top>=innerHeight)return;s=o;let l=Hl(o.glyph,e);o.animation=l,l.onfinish=()=>{o.animation===l&&(r(o),o.word.dataset.phase="complete")}}return e.addEventListener("change",()=>{n.forEach(o=>{r(o),o.word.dataset.phase=o.completed?"complete":"color"})}),{update(o,c,l){let h=n.get(o);if(!h)return;let u=_M((c-Cd)/qm);c<=Cd?(h.started&&(h.recolor=!0),h.started=!1):h.started||(h.recolor&&t(h),h.started=!0,h.recolor=!1),h.word.style.setProperty("--keyword-tint",String(u)),u<1?(r(h),h.completed=!1):h.completed||(h.completed=!0,l>.9&&c<Cd+qm+.55&&a(h)),l<.05&&r(h),h.word.dataset.phase=h.animation?"pop":u===1?"complete":u>0?"color":"waiting"}}}function Ym(i){let e=[...i.querySelectorAll(".construction-tool")],t=0,n=!1;function s(){e.forEach((r,a)=>{r.setAttribute("aria-pressed",String(n&&a===t)),r.tabIndex=n&&a===t?0:-1})}return e.forEach((r,a)=>{r.addEventListener("click",()=>{n&&(t=a,i.classList.add("is-tool-manual"),s())}),r.addEventListener("keydown",o=>{if(!n||o.altKey||o.ctrlKey||o.metaKey)return;let c=o.key==="ArrowRight"?(a+1)%e.length:o.key==="ArrowLeft"?(a+e.length-1)%e.length:o.key==="Home"?0:o.key==="End"?e.length-1:null;c!==null&&(o.preventDefault(),e.forEach((l,h)=>{l.tabIndex=h===c?0:-1}),e[c].focus({preventScroll:!0}))})}),s(),{update(r,a){r===0&&(t=0,i.classList.remove("is-tool-manual"));let o=r===1&&a<1;o!==n&&(n=o,!n&&i.contains(document.activeElement)&&document.activeElement.blur(),i.inert=!n,i.setAttribute("aria-hidden",String(!n)),i.classList.toggle("is-tool-selected",n),s())}}}var Jm=i=>Math.max(0,Math.min(1,i)),zr=i=>{let e=Jm(i);return e*e*(3-2*e)},Gl=[eo,ml],$m=Rn[1].start,Km=.55,yM=$m+Km,vM=hd-bl-ld,MM=2.4;function jm(){let i=Wm(),e=[...document.querySelectorAll("[data-caption]")],t=document.querySelector(".construction-bar"),n=Ym(t),s=document.querySelector(".hero-heading"),r=document.querySelector(".section-year"),a=matchMedia("(prefers-reduced-motion: reduce)");kl(s,a,"[data-hover-text]");let o=Zm(e,a),c=document.querySelector("#content01"),l=Xm(c,a),h=-1,u=0;function d(){t.style.setProperty("--bar-scale",String(Math.min(1,Math.max(0,innerWidth-40)/308))),f()}function f(){for(let _ of[s,r]){let g=zr((innerHeight*.64-_.getBoundingClientRect().top)/(innerHeight*.44));_.style.opacity=String((_===r?.7:1)*(1-g)),_.style.filter=`blur(${a.matches?0:g*12}px)`}u=Jm((innerHeight*.6-c.getBoundingClientRect().top)/innerHeight),l.update(u)}function m(_){i.setAutoHideProgress(zr((_-vM)/MM));let g=zr((_-eo)/.55),p=zr((_-Rn[1].start)/.55),b=g*(1-p);t.style.opacity=String(b),t.style.visibility=b>0?"visible":"hidden",t.style.transform=`translate(-50%,${a.matches?0:(1-g+p)*66}px) scale(var(--bar-scale,1))`,n.update(g,p),h=-1,Gl.forEach((M,x)=>{_>=M&&(h=x)}),_>=yM&&(h=-1),e.forEach((M,x)=>{let E=zr((_-Gl[x])/.55),w=x===e.length-1,C=zr((_-(w?$m:Gl[x+1]))/(w?Km:.55)),y=E*(1-C);M.style.opacity=String(y),M.style.filter=`blur(${a.matches?0:(1-E+C)*10}px)`,M.style.transform=`translateY(${a.matches?0:(1-E)*10-C*10}px)`,M.setAttribute("aria-hidden",String(x!==h)),o.update(x,_-Gl[x],y)})}return addEventListener("scroll",f,{passive:!0}),addEventListener("resize",d),d(),m(0),{update:m,inspect:()=>({caption:h,reading:u,text:e[h]?.textContent.trim()})}}var Qm=new Rt,Wl=new z,kr=class extends Ms{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new ut(e,3)),this.setAttribute("uv",new ut(t,2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new ji(t,6,1);return this.setAttribute("instanceStart",new mn(n,3,0)),this.setAttribute("instanceEnd",new mn(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new ji(t,6,1);return this.setAttribute("instanceColorStart",new mn(n,3,0)),this.setAttribute("instanceColorEnd",new mn(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new La(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rt);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Qm.setFromBufferAttribute(t),this.boundingBox.union(Qm))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pn),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Wl.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Wl)),Wl.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Wl));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}};Ee.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new de},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};tn.line={uniforms:Ja.merge([Ee.common,Ee.fog,Ee.line]),vertexShader:`
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
		`};var Vr=class extends Ft{constructor(e){super({type:"LineMaterial",uniforms:Ja.clone(tn.line.uniforms),vertexShader:tn.line.vertexShader,fragmentShader:tn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};var Id=new ot,eg=new z,tg=new z,Vt=new ot,Ht=new ot,hi=new ot,Pd=new z,Ld=new nt,Gt=new za,ng=new z,Xl=new Rt,ql=new pn,ui=new ot,di,Ns;function ig(i,e,t){return ui.set(0,0,-e,1).applyMatrix4(i.projectionMatrix),ui.multiplyScalar(1/ui.w),ui.x=Ns/t.width,ui.y=Ns/t.height,ui.applyMatrix4(i.projectionMatrixInverse),ui.multiplyScalar(1/ui.w),Math.abs(Math.max(ui.x,ui.y))}function SM(i,e){let t=i.matrixWorld,n=i.geometry,s=n.attributes.instanceStart,r=n.attributes.instanceEnd,a=Math.min(n.instanceCount,s.count);for(let o=0,c=a;o<c;o++){Gt.start.fromBufferAttribute(s,o),Gt.end.fromBufferAttribute(r,o),Gt.applyMatrix4(t);let l=new z,h=new z;di.distanceSqToSegment(Gt.start,Gt.end,h,l),h.distanceTo(l)<Ns*.5&&e.push({point:h,pointOnLine:l,distance:di.origin.distanceTo(h),object:i,face:null,faceIndex:o,uv:null,uv1:null})}}function bM(i,e,t){let n=e.projectionMatrix,r=i.material.resolution,a=i.matrixWorld,o=i.geometry,c=o.attributes.instanceStart,l=o.attributes.instanceEnd,h=Math.min(o.instanceCount,c.count),u=-e.near;di.at(1,hi),hi.w=1,hi.applyMatrix4(e.matrixWorldInverse),hi.applyMatrix4(n),hi.multiplyScalar(1/hi.w),hi.x*=r.x/2,hi.y*=r.y/2,hi.z=0,Pd.copy(hi),Ld.multiplyMatrices(e.matrixWorldInverse,a);for(let d=0,f=h;d<f;d++){if(Vt.fromBufferAttribute(c,d),Ht.fromBufferAttribute(l,d),Vt.w=1,Ht.w=1,Vt.applyMatrix4(Ld),Ht.applyMatrix4(Ld),Vt.z>u&&Ht.z>u)continue;if(Vt.z>u){let M=Vt.z-Ht.z,x=(Vt.z-u)/M;Vt.lerp(Ht,x)}else if(Ht.z>u){let M=Ht.z-Vt.z,x=(Ht.z-u)/M;Ht.lerp(Vt,x)}Vt.applyMatrix4(n),Ht.applyMatrix4(n),Vt.multiplyScalar(1/Vt.w),Ht.multiplyScalar(1/Ht.w),Vt.x*=r.x/2,Vt.y*=r.y/2,Ht.x*=r.x/2,Ht.y*=r.y/2,Gt.start.copy(Vt),Gt.start.z=0,Gt.end.copy(Ht),Gt.end.z=0;let _=Gt.closestPointToPointParameter(Pd,!0);Gt.at(_,ng);let g=ct.lerp(Vt.z,Ht.z,_),p=g>=-1&&g<=1,b=Pd.distanceTo(ng)<Ns*.5;if(p&&b){Gt.start.fromBufferAttribute(c,d),Gt.end.fromBufferAttribute(l,d),Gt.start.applyMatrix4(a),Gt.end.applyMatrix4(a);let M=new z,x=new z;di.distanceSqToSegment(Gt.start,Gt.end,x,M),t.push({point:x,pointOnLine:M,distance:di.origin.distanceTo(x),object:i,face:null,faceIndex:d,uv:null,uv1:null})}}}var Zl=class extends pt{constructor(e=new kr,t=new Vr({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,s=new Float32Array(2*t.count);for(let a=0,o=0,c=t.count;a<c;a++,o+=2)eg.fromBufferAttribute(t,a),tg.fromBufferAttribute(n,a),s[o]=o===0?0:s[o-1],s[o+1]=s[o]+eg.distanceTo(tg);let r=new ji(s,2,1);return e.setAttribute("instanceDistanceStart",new mn(r,1,0)),e.setAttribute("instanceDistanceEnd",new mn(r,1,1)),this}raycast(e,t){let n=this.material.worldUnits,s=e.camera;if(s===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),n===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;di=e.ray;let a=this.matrixWorld,o=this.geometry,c=this.material;Ns=c.linewidth+r,o.boundingSphere===null&&o.computeBoundingSphere(),ql.copy(o.boundingSphere).applyMatrix4(a);let l;if(n)l=Ns*.5;else{let u=Math.max(s.near,ql.distanceToPoint(di.origin));l=ig(s,u,c.resolution)}if(ql.radius+=l,di.intersectsSphere(ql)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),Xl.copy(o.boundingBox).applyMatrix4(a);let h;if(n)h=Ns*.5;else{let u=Math.max(s.near,Xl.distanceToPoint(di.origin));h=ig(s,u,c.resolution)}Xl.expandByScalar(h),di.intersectsBox(Xl)!==!1&&(n?SM(this,t):bM(this,s,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(Id),this.material.uniforms.resolution.value.set(Id.z,Id.w))}};function EM(i){let e=[],t=i.caster.height,n=t/2,s=(r,a)=>e.push(...r,...a);for(let r of i.caster.contours){let a=r.points.filter((o,c,l)=>!c||Math.hypot(o[0]-l[c-1][0],o[1]-l[c-1][1])>1e-5);a.length<3||(Math.hypot(a[0][0]-a.at(-1)[0],a[0][1]-a.at(-1)[1])<1e-5&&a.pop(),a.forEach((o,c)=>{let l=a[(c+a.length-1)%a.length],h=a[(c+1)%a.length];for(let f of[-n,n])s([o[0],f,o[1]],[h[0],f,h[1]]);let u=new de(o[0]-l[0],o[1]-l[1]).normalize(),d=new de(h[0]-o[0],h[1]-o[1]).normalize();u.dot(d)<.78&&s([o[0],-n,o[1]],[o[0],n,o[1]])}))}return new kr().setPositions(e)}function sg(i,e){let t=matchMedia("(prefers-reduced-motion: reduce)"),n=new Tr({alpha:!0,antialias:!0,powerPreference:"low-power"});n.setClearColor(16777215,0),n.autoClear=!1,n.outputColorSpace=_t,n.domElement.className="hero-nebula-canvas",i.append(n.domElement);let s=new ni(-1,1,1,-1,.1,4e3);s.position.z=2e3,s.lookAt(0,0,0);let r=new Tn,a=Ci(210426),o=[],c=e.map(A=>({source:A,outline:EM(A)})),l=Ci(110626),h=new ke("#819098");for(let A=0;A<e.length*2;A++){let D=c[A*13%c.length],T=new Vr({color:h,linewidth:.9,transparent:!0,opacity:.55,depthTest:!1,depthWrite:!1}),I=new Zl(D.outline,T);r.add(I);let B=((A*13%e.length+.5)/e.length-.5)*1.8+(a()+a()+a()-1.5)*.24,F=l()<.36&&Math.abs(B)>.45?Math.sign(B)*(.55+l()*.3):0,U=l()<.26?.78+l()*.12:1,X=(l()-.5)*.6;o.push({wire:I,asset:D,offset:B,breakout:F,phaseJitter:X,size:(.64+a()*.95)*U,pitch:(a()-.5)*.85,yaw:(a()-.5)*1.2,roll:(a()-.5)*Math.PI*2,speed:.008+a()*.004,spin:(a()-.5)*.07,seed:a()*Math.PI*2})}let u=1,d=1,f=0,m=0,_=0,g=!0,p=0,b=!1;function M(A){let D=u<650,T=e.length*(D?1:2),I=D?46:92,B=Math.max(I*2.25,u*.14);o.forEach((F,U)=>{let X=U<T;if(F.wire.visible=X,!X)return;let H=(Math.sin(A*F.speed*5+F.seed)-Math.sin(F.seed))*.002,G=((U+.5+F.phaseJitter)/T+A*.01+H)%1,K=(G*(u+B*2)-B)/u,ie=Math.sin(Math.PI*Math.max(0,Math.min(1,K))),he=Math.min(d*.2,u*.2)*(.48+.52*ie),pe=(F.offset+F.breakout*ie)*he+Math.sin(A*.25+F.seed)*he*.1,ve=u*K-pe*.36,Ge=d*(.02+.72*K+.035*Math.sin(K*Math.PI*2))+pe,Ue=I*F.size*(.8+.2*ie);F.wire.position.set(ve-u/2,d/2-Ge,Math.sin(F.seed)*80),F.wire.rotation.set(Math.PI/2+F.pitch+Math.sin(A*.13+F.seed)*.1,F.yaw,F.roll+A*F.spin),F.wire.scale.setScalar(Ue/F.asset.source.size)})}function x(){M(f),n.clear(),n.render(r,s),p++,i.classList.add("is-ready")}function E(A){if(_=0,!g||document.hidden)return;if(m&&A-m<32){_=requestAnimationFrame(E);return}let D=m?Math.min((A-m)/1e3,.1):1/60;m=A;let T=!b&&!t.matches;T&&(f+=D),x(),T&&(_=requestAnimationFrame(E))}function w(){!_&&g&&!document.hidden&&(m=0,_=requestAnimationFrame(E))}function C(){u=i.clientWidth,d=i.clientHeight;let A=Math.min(devicePixelRatio||1,1.75);n.setPixelRatio(A),n.setSize(u,d,!1),s.left=-u/2,s.right=u/2,s.top=d/2,s.bottom=-d/2,s.updateProjectionMatrix(),o.forEach(D=>{D.wire.material.linewidth=u<650?.8:.9}),x(),w()}return new IntersectionObserver(([A])=>{g=A.isIntersecting&&A.intersectionRatio>.001,g?w():(cancelAnimationFrame(_),_=0,m=0)},{threshold:.001}).observe(i),new ResizeObserver(C).observe(i),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(_),_=0):w()}),t.addEventListener("change",()=>{cancelAnimationFrame(_),_=0,w()}),C(),{inspect:()=>({ready:p>0,sourceCount:e.length,count:o.filter(A=>A.wire.visible).length,baseSize:u<650?46:92,elapsed:f,frames:p,visible:g,paused:!_,width:u,height:d,mode:"neutral-contour-stream"}),renderAt(A){b=!0,cancelAnimationFrame(_),_=0,f=A,x()},play(){b=!1,w()},exportPNG(){return x(),n.domElement.toDataURL("image/png")}}}function rg(i,e,t,n,s=()=>{}){let o=new WeakMap,c=[],l=0,h=0,u=!1,d={ready:!1,total:0,completed:0,batches:0,maxBatchMs:0,error:null},f=M=>Array.isArray(M.material)?M.material:[M.material],m=M=>[M.geometry?.uuid,...f(M).flatMap(x=>[x.uuid,x.version,x.map?.uuid,x.map?.version])].join(":");function _(M){let x=i.getViewport(new ot),E=i.getScissor(new ot),w=i.getScissorTest(),C=i.autoClear,y=e.background,A=t.layers.mask,D=new Map,T=new Map,I=new Map,B=F=>{D.has(F)||D.set(F,{visible:F.visible,mask:F.layers.mask,culled:F.frustumCulled})};try{i.autoClear=!1,e.background=null,i.setViewport(0,0,1,1),i.setScissor(0,0,1,1),i.setScissorTest(!0),t.layers.set(31),e.traverse(F=>{F.isLight&&(B(F),F.layers.enable(31))});for(let{object:F}of M){B(F),F.visible=!0,F.frustumCulled=!1,F.layers.enable(31);for(let X=F.parent;X;X=X.parent)B(X),X.visible=!0;for(let X of f(F))T.has(X)||T.set(X,{colorWrite:X.colorWrite,depthWrite:X.depthWrite}),X.colorWrite=!1,X.depthWrite=!1;let U=F.geometry;U&&!I.has(U)&&(I.set(U,{...U.drawRange}),U.setDrawRange(0,Math.min(3,U.index?.count||U.attributes.position.count)))}i.render(e,t)}finally{for(let[F,U]of I)F.setDrawRange(U.start,U.count);for(let[F,U]of T)Object.assign(F,U);for(let[F,U]of D)F.visible=U.visible,F.layers.mask=U.mask,F.frustumCulled=U.culled;t.layers.mask=A,e.background=y,i.autoClear=C,i.setViewport(x),i.setScissor(E),i.setScissorTest(w)}}function g(){h||u||!c.length||document.hidden||(h=window.requestIdleCallback?requestIdleCallback(p,{timeout:120}):setTimeout(p,16))}async function p(){if(h=0,u||document.hidden)return;u=!0;let M=l,x=c.splice(0,12);try{if(await Promise.all(x.map(({object:w})=>i.compileAsync(w,t,e))),M!==l)return;let E=performance.now();_(x),d.maxBatchMs=Math.max(d.maxBatchMs,performance.now()-E);for(let{object:w}of x)o.set(w,m(w));d.completed+=x.length,d.batches++,c.length||(d.ready=!0),s({...d}),d.ready&&n()}catch(E){M===l&&(d.error=String(E),c=[],s({...d}))}finally{u=!1,g()}}function b(){l++;let M=[];e.traverse(x=>{x.material&&(x.isMesh||x.isLine||x.isPoints||x.isSprite)&&M.push(x)}),c=M.filter(x=>o.get(x)!==m(x)).map(x=>({object:x})),c.sort((x,E)=>(x.object.isInstancedMesh?0:x.object.isMesh?1:2)-(E.object.isInstancedMesh?0:E.object.isMesh?1:2)),d={ready:c.length===0,total:M.length,completed:M.length-c.length,batches:0,maxBatchMs:0,error:null},s({...d}),d.ready&&n(),g()}return document.addEventListener("visibilitychange",g),i.domElement.addEventListener("webglcontextrestored",()=>{o=new WeakMap,b()}),{prepare:b,inspect:()=>({...d,pending:d.total-d.completed})}}var Pi=i=>Math.max(0,Math.min(1,i));function ag(i){if(i>1-.22)return 1-ag(1-i);if(i>=.22)return(i-.22/2)/(1-.22);let t=i/.22;return .22*(t*t*t-.5*t*t*t*t)/(1-.22)}var wM=()=>typeof lenis>"u"?null:lenis,TM=.56,Yl=i=>1-Math.cbrt(Pi((1-i)/(1-TM)));function og(i,e){let t=window.MainIntro,n=i.closest(".animation-stage"),s=()=>i.clientHeight*.85,r=()=>t.anchor()-s(),a=()=>i.clientHeight*.18,o=0,c=0,l=0,h=-1/0,u=0,d=0,f=0,m=1,_=0,g=0,p={progress:0,gather:0,travel:1},b=p;function M(T,I){T=Pi(T);let B=I??(T>d+1e-6?1:T<d-1e-6?-1:m);B!==m&&(_=d,g=f,b=p,m=B);let F;if(T===0||T===1)F=T;else if(m<0)F=_>0?g*Pi(T/_):T;else{let X=Yl(_);F=g+(1-g)*Pi((Yl(T)-X)/Math.max(1e-8,1-X))}let U;if(T===0||T===1)U={progress:T,gather:F,travel:1};else if(m<0){let X=_>0?Pi(1-T/_):1,H=1-Math.pow(X,1.8),G=_>0?Pi((_-T)/(_*.26)):1,K=G*G*(3-2*G);U={progress:b.progress*H,gather:b.gather*H,travel:b.travel+(.12-b.travel)*K}}else{let X=Yl(_),H=Pi((T-_)/Math.max(1e-8,1-_));U={progress:b.progress+(1-b.progress)*H,gather:b.gather+(1-b.gather)*Pi((Yl(T)-X)/Math.max(1e-8,1-X)),travel:b.travel+(1-b.travel)*H*H*(3-2*H)}}d=T,f=F,p=U,t.zoomingIn=m<0,e(T,F,U)}function x(T,I){let B=t.complete;t.progress=T,t.complete=T===1&&I===1,document.body.classList.toggle("intro-before-main",!t.complete),n.style.visibility=t.complete?"hidden":"visible",document.getElementById("mainIntro").inert=t.complete,B!==t.complete&&window.dispatchEvent(new CustomEvent("main-intro-handoff",{detail:{complete:t.complete}}))}function E(){if(t.moving)return;let T=scrollY-r(),I=s();M(T<=1?0:T>=I-1?1:T/I)}async function w(T){let I=scrollY-r(),B=s(),F=I>=B-1?1:Math.abs(I)<=1?0:Math.max(-a()/B,Math.min(1,I/B)),U=T?1:0;if(F===U&&!t.moving)return;let X=++c;cancelAnimationFrame(o),t.moving=!0;let H=wM();H?.stop();let G=window.MainWordSurface,K=G?.getSource(G.theme).image;if(K&&!K.complete)try{await K.decode()}catch{}if(X!==c)return;let he=(matchMedia("(prefers-reduced-motion: reduce)").matches?240:6200)*Math.abs(U-F),pe=performance.now();function ve(Ge){if(X!==c)return;let Ue=Ge-pe,ee=he?Pi(Ue/he):1,W=ee===1?U:F+(U-F)*ag(ee),k=r()+s()*W;if(window.scrollTo({top:k,behavior:"instant"}),M(W,T?1:-1),Ue<he){o=requestAnimationFrame(ve);return}t.moving=!1,t.inputUntil=performance.now()+300,H?.scrollTo(k,{immediate:!0,force:!0}),H?.start()}o=requestAnimationFrame(ve)}t.reverse=()=>w(!1);let C=T=>T.defaultPrevented||T.ctrlKey||T.metaKey||T.altKey||document.body.classList.contains("mobile-menu-open")||document.documentElement.classList.contains("page-transition-active")||T.target.closest?.("input,textarea,select,[contenteditable]");function y(T){if(t.moving)return!0;let I=scrollY-r();return T>0?I>=-a()&&I<s()-1:I>1&&I<=s()+2}let A=T=>{T.preventDefault(),T.stopImmediatePropagation()};addEventListener("wheel",T=>{if(C(T)||Math.abs(T.deltaX)>=Math.abs(T.deltaY))return;let I=Math.sign(T.deltaY),B=performance.now();y(I)&&(A(T),!(t.moving||B<t.inputUntil)&&((B-h>220||I!==u)&&(l=0),u=I,h=B,l+=Math.abs(T.deltaY)*(T.deltaMode===1?16:T.deltaMode===2?innerHeight:1),l>=60&&(l=0,w(I>0))))},{capture:!0,passive:!1});let D=null;return addEventListener("touchstart",T=>{D=T.touches.length===1?T.touches[0]:null},{passive:!0}),addEventListener("touchmove",T=>{if(!D||C(T)||T.touches.length!==1)return;let I=D.clientY-T.touches[0].clientY;Math.abs(I)<Math.abs(D.clientX-T.touches[0].clientX)||!y(Math.sign(I))||(A(T),!t.moving&&Math.abs(I)>=42&&(D=null,w(I>0)))},{capture:!0,passive:!1}),addEventListener("keydown",T=>{if(C(T)||T.target.closest?.("button,a"))return;let I=["ArrowDown","PageDown"," "].includes(T.key)?1:["ArrowUp","PageUp"].includes(T.key)?-1:0;!I||!y(I)||(A(T),!t.moving&&!T.repeat&&w(I>0))},{capture:!0}),{update:x,readScroll:E}}var $l=i=>document.querySelector(i),$t=$l("#scene"),ln=window.MainIntroLoading,AM=jm(),sn={angle:38,depth:1,shadow:.64,layout:"grid"},rt=[],Dd=[],Nt,Ct,tt,Hr,io,Gr,Ud,hg,ug,Wr,Fd=0,Li=1,Ni=1,Kl=!1,RM=()=>ci,dt={current:0,target:0,poses:[],lastFrame:0},kd,Xr,Di=0,Jl=0,dg={progress:0,gather:0,travel:1},Od=!1,Bd=matchMedia("(prefers-reduced-motion: reduce)"),no=new z,fg=new kt,pg=new Na({name:"Soft colored clay",color:16777215,roughness:.78,metalness:0,emissive:16777215,emissiveIntensity:.02,toneMapped:!1}),Nd={depth:46.2,bevelEnabled:!0,bevelSize:1.3,bevelThickness:2.2,bevelSegments:5,steps:1,curveSegments:20},CM=(i,e=1)=>{let t=Math.sin((i+1)*127.1+e*311.7)*43758.5453;return t-Math.floor(t)};function IM(i){if(Fd=0,!Nt||Kl)return;let e=Math.min((i-dt.lastFrame)/1e3||.016,.05);if(dt.lastFrame=i,window.MainIntro.complete&&Di===1&&Jl===1)return;let t=Di>0?ci:dt.target,n=t-dt.current;dt.current=Bd.matches||Math.abs(n)<.001?t:dt.current+n*(1-Math.exp(-12*e)),Di===0||tt.userData.timeline!==dt.current?Vd(Li,Ni):tt.copy(fg,!1),Xr.update(tt,Gr.mesh,Di,tt.userData.ending,Jl,dg),Xr.render(tt),kd?.update(Di,Jl),(Di>0&&Di<1&&!Bd.matches&&!document.hidden||Math.abs(t-dt.current)>1e-4||rt.some(r=>r.reveal.active&&performance.now()-r.reveal.sparkAt<360)||io?.isFlashing())&&qr()}function qr(){Fd||(Fd=requestAnimationFrame(IM))}function Ui(i,e,t,n,s=0,r=0,a=38,o=44,c=0,l=34){let h=ct.degToRad(a),u=ct.degToRad(o);tt.aspect=i/e,tt.fov=l,tt.near=Math.max(.1,n*.05),tt.position.set(t.x+Math.sin(h)*Math.cos(u)*n,t.y+Math.sin(u)*n,t.z+Math.cos(h)*Math.cos(u)*n),tt.up.set(-Math.sin(h)*Math.sin(u),Math.cos(u),-Math.cos(h)*Math.sin(u)),tt.lookAt(t.x,t.y,t.z),tt.rotateZ(c),tt.setViewOffset(i,e,s*i,r*e,i,e),tt.updateMatrixWorld(!0)}function jl(i){let e=i.geometry.attributes.position,t=new z,n=new nt().multiplyMatrices(tt.projectionMatrix,tt.matrixWorldInverse).multiply(i.matrixWorld),s={left:1/0,right:-1/0,top:1/0,bottom:-1/0};for(let r=0;r<e.count;r++){t.fromBufferAttribute(e,r).applyMatrix4(n);let a=(t.x+1)/2,o=(1-t.y)/2;s.left=Math.min(s.left,a),s.right=Math.max(s.right,a),s.top=Math.min(s.top,o),s.bottom=Math.max(s.bottom,o)}return s}function mg(i,e){let t=rt.map(({mesh:b})=>b.scale.y);rt.forEach(({mesh:b,heightFactor:M})=>{b.scale.y=sn.depth*M}),Ct.updateMatrixWorld(!0),dt.poses=rt.slice(0,Cr).map(({mesh:b,index:M})=>{let x=new Rt().setFromObject(b).getCenter(new z);x.y=b.position.y;let E=M===0?0:sn.angle+(M===1?-8:12),w=M===0?90:M===1?48:58,C=4,y;for(let A=0;A<80&&(Ui(i,e,x,C,0,0,E,w),y=jl(b),!(y.right-y.left<(i/e<1?.78:.52)&&y.bottom-y.top<.45));A++)C*=1.035;return{center:x,distance:C,yaw:E,pitch:w,shiftX:(y.left+y.right)/2-.5,shiftY:(y.top+y.bottom)/2-.5}});let n=Math.max(...dt.poses.map(b=>b.distance));dt.poses.forEach((b,M)=>{b.distance=n,Ui(i,e,b.center,b.distance,0,0,b.yaw,b.pitch);let x=jl(rt[M].mesh);b.shiftX=(x.left+x.right)/2-.5,b.shiftY=(x.top+x.bottom)/2-.5}),Gr.fit(dt.poses[0],e);let s=sn.layout==="grid"?wl(dt.layoutMode==="portrait"):null;rt.forEach(b=>yl(b.reveal,s));let r=dt.poses[0];Ui(i,e,r.center,r.distance,r.shiftX,r.shiftY,r.yaw,r.pitch),ad(rt[0].reveal,tt);let a=new Rt;rt.forEach(({mesh:b})=>a.expandByObject(b));let o=a.getCenter(new z),c=sn.angle,l=54;o.y=.003;let h=14,u;for(let b=0;b<90&&(Ui(i,e,o,h,0,0,c,l,0,34),u=zd(),!(u.right-u.left<.94&&u.bottom-u.top<(i/e<.8?.72:.76)));b++)h*=1.045;let d=90+sn.angle-38,f=h*1.65;for(let b=0;b<60;b++){Ui(i,e,o,f,0,0,d,90);let M=zd();if(M.right-M.left<.9&&M.bottom-M.top<.76)break;f*=1.045}dt.wide={center:o,distance:f,yaw:d,pitch:90,fov:34,shiftX:0,shiftY:0};let m=[];for(let b=Wn;b<=Ii+.001;b+=(Ii-Wn)/12){let M=Ll(b,dt.poses,dt.wide);Ui(i,e,M.center,M.distance,M.shiftX,M.shiftY,M.yaw,M.pitch,M.roll,M.fov),m.push(tt.clone())}let _=Ll(Wn,dt.poses,dt.wide);Ui(i,e,_.center,_.distance,_.shiftX,_.shiftY,_.yaw,_.pitch,_.roll,_.fov);let g=new wi,p=new z;g.setFromCamera(new de(0,0),tt),g.ray.intersectPlane(new Zt(new z(0,1,0),-.003),p),io?.fit(m,dt.layoutMode==="portrait",sn,p),rt.forEach(({mesh:b},M)=>{b.scale.y=t[M]}),Ct.updateMatrixWorld(!0)}function zd(){let i={left:1/0,right:-1/0,top:1/0,bottom:-1/0};return rt.forEach(({mesh:e})=>{let t=jl(e);i.left=Math.min(i.left,t.left),i.right=Math.max(i.right,t.right),i.top=Math.min(i.top,t.top),i.bottom=Math.max(i.bottom,t.bottom)}),i}function Vd(i,e){if(!dt.poses.length)return;let t=ct.clamp(dt.current,0,ci);AM.update(t);let n=El(t);Tl.value=rd(n);let s=Di>0?0:sn.shadow*(1-ct.smoothstep(t,Cn,as));s>0?tt.layers.enable(Cs):tt.layers.disable(Cs);let r=Ll(t,dt.poses,dt.wide,Bd.matches?0:1),{solo:a,index:o,distance:c,yaw:l,pitch:h,shiftX:u,shiftY:d,roll:f,fov:m,travelling:_,pullback:g,overhead:p}=r;if(no.set(r.center.x,r.center.y,r.center.z),Ui(i,e,no,c,u,d,l,h,f,m),t<=3){let D=$t.getBoundingClientRect();ad(rt[0].reveal,tt,2*Math.max(0,D.top)/Math.max(1,D.height))}Gr.update(h,t>=Cn);let b=0,M=0,x=0;rt.forEach(D=>{let T=t>=D.cue.start,I=T;pm(D,Ir(t,D.cue),I,sn.depth*D.heightFactor,s,n),T&&b++,I&&D.reveal.state.complete&&M++,I&&(!D.reveal.state.complete||n>0&&n<1)&&x++}),io?.update(t,sn,s),Ct.updateMatrixWorld(!0),ug?.update(tt),Ud?.update(Ir(t,rt[0].cue),tt,i,e),hg?.update(Ir(t,rt[0].cue),tt,i,e),Ct.fog.near=c+45,Ct.fog.far=c+110,Hr.position.copy(no).add(new z(...li)),Hr.target.position.copy(no);let E=rt.filter(D=>t>=D.cue.start).sort((D,T)=>T.cue.start-D.cue.start)[0],w=a?o:E.index,C=rt[w].reveal.state,y=a?"solo":t<Cn+.3?"crescendo":"finale",A=g>.99?zd():jl(rt[w].mesh);tt.userData={projection:"cinematic-perspective",framing:A,position:tt.position.toArray(),focus:no.toArray(),index:w,progress:t/ci,timeline:t,yaw:l,pitch:h,roll:f,distance:c,travelling:_,pullback:g,overhead:p,ending:n,groundShadows:tt.layers.isEnabled(Cs),direction:tt.getWorldDirection(new z).toArray(),phase:y,generated:b,complete:M,activeReveals:x,reveal:{...C}},fg.copy(tt,!1)}function gg(){let i=$l("#journey"),e=i.getBoundingClientRect().top+scrollY,t=$t.clientHeight*.85,{start:n,distance:s}=Om(e,i.offsetHeight-t,$t.clientHeight),r=scrollY-n-s;kd?.readScroll();let a=Dm(ct.clamp((scrollY-n)/s,0,1)*Ed),o=Math.round(a);dt.target=r>=-1?ci:Math.abs(a-o)<.001?Math.min(o,ci):a,qr()}async function PM(){let i=new pl;for(let e=0;e<Br.length;e++){let t=Br[e];try{let s=i.parse(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${t.viewBox}" fill="white">${t.svg}</svg>`).paths.flatMap(C=>C.toShapes());if(!s.length)throw new Error("Empty geometry");let r=new Ia(s,Nd);r.rotateX(Math.PI/2),r.computeBoundingBox();let a=r.boundingBox,o=a.getCenter(new z);r.translate(-o.x,-a.min.y,-o.z);let c=2.25+(CM(e,2)-.5)*.65,l=c/Math.max(a.max.x-a.min.x,a.max.z-a.min.z);r.scale(l,l,l),r.computeBoundingBox(),r.computeBoundingSphere();let h=r.attributes.position,u=0;for(let C=0;C<h.count;C++)u=Math.max(u,Math.hypot(h.getX(C),h.getZ(C)));let d=t.color,f=Al(pg.clone());f.transparent=!0,f.name=t.id+"-clay";let m=new pt(r,f);m.name=t.id,m.castShadow=!0,m.receiveShadow=!0,m.userData={id:t.id,name:t.name,index:e,source:"SVG",shapeCount:s.length,holeCount:s.reduce((C,y)=>C+y.holes.length,0)},Ct.add(m);let _=c+4.2,[g,p,b,M]=t.viewBox.trim().split(/[\s,]+/).map(Number),x={minX:(g-o.x)*l,maxX:(g+b-o.x)*l,minZ:(p-o.z)*l,maxZ:(p+M-o.z)*l};m.userData.svgBounds=x;let E={svgBounds:x,height:(Nd.depth+Nd.bevelThickness*2)*l,contours:s.flatMap(C=>[{hole:!1,points:C.getPoints(16)},...C.holes.map(y=>({hole:!0,points:y.getPoints(16)}))]).map(C=>({hole:C.hole,points:C.points.map(y=>[(y.x-o.x)*l,(y.y-o.z)*l])}))},w=new pt(new _n(_,_),Cl());w.layers.set(Cs),w.name=t.id+"-contact",w.rotation.x=-Math.PI/2,w.position.y=.001,w.renderOrder=1,Ct.add(w),rt.push({icon:t,color:d,mesh:m,shadow:w,size:c,radius:u,index:e,shadowSpan:_,caster:E,shadowKey:""})}catch(n){Dd.push({id:t.id,error:n.message})}ln?.update(5+40*(e+1)/Br.length),await ln?.yieldFrame()}if(rt.length!==33)throw new Error(`Expected 33 objects, created ${rt.length}: ${JSON.stringify(Dd)}`);xg(),ln?.update(50)}function xg(){let i=$t.clientWidth/$t.clientHeight<.8,e=wm(i,sn.layout,rt.map(t=>t.radius));dt.layoutMode=i?"portrait":"landscape",rt.forEach(t=>{let{index:n,mesh:s,shadow:r}=t,a=e[n],o=a.x,c=a.z,l=0;t.heightFactor=a.height;let h=sn.depth*t.heightFactor;s.position.set(o,.003,c),s.rotation.y=l,s.scale.y=h,r.position.set(o,.001,c),r.rotation.z=l,t.reveal&&(t.reveal.group.position.copy(s.position),t.reveal.group.rotation.copy(s.rotation));let u=`${h}:${l}`;if(t.shadowKey!==u){let d=r.material.map;t.patternShadow&&t.patternShadow!==d&&t.patternShadow.dispose(),r.material.map=xd(t.caster,t.shadowSpan,h,l),t.patternShadow=l===0?r.material.map:xd(t.caster,t.shadowSpan,h,0),r.material.needsUpdate=!0,d?.dispose(),t.shadowKey=u}r.material.opacity=sn.shadow}),Ct.updateMatrixWorld(!0)}function Ql(){if(!Nt||Kl)return;Li=$t.clientWidth,Ni=$t.clientHeight,dt.layoutMode!==(Li/Ni<.8?"portrait":"landscape")&&xg(),Nt.setPixelRatio(2),Nt.setSize(Li,Ni,!1),mg(Li,Ni);let i=dt.wide;Ui(Li,Ni,i.center,i.distance,0,0,i.yaw,90,0,i.fov),Xr.fit(tt,Li,Ni),gg(),Vd(Li,Ni),Wr?.prepare(),qr()}function cg(){if(!($t.clientWidth===Li&&$t.clientHeight===Ni)){if(Wr&&!Wr.inspect().ready&&!Wr.inspect().error){Od=!0;return}Ql()}}async function LM(i=3840,e=2160){Kl=!0;try{return Nt.setPixelRatio(1),Nt.setSize(i,e,!1),mg(i,e),Vd(i,e),Nt.render(Ct,tt),Nt.domElement.toDataURL("image/png")}finally{Kl=!1,Ql()}}async function NM(i){let e=new is,t,n=[],s=c=>{let l=c.mesh.material.clone();return l.opacity=1,l.transparent=!1,l.depthWrite=!0,l.color.set(c.color),l.emissive.set(c.color),n.push(l),l};Number.isInteger(i)?(t=rt[i].mesh.clone(),t.visible=!0,t.material=s(rt[i]),t.position.set(0,0,0),t.rotation.set(0,0,0),t.scale.y=sn.depth*rt[i].heightFactor):(t=new fn,t.name="CJU_33_COLOR_OBJECTS",rt.forEach(c=>{let l=c.mesh.clone();l.visible=!0,l.material=s(c),c.mesh.matrixWorld.decompose(l.position,l.quaternion,l.scale),l.scale.y=sn.depth*c.heightFactor,t.add(l)}));let r;try{r=await e.parseAsync(t,{binary:!0})}finally{n.forEach(c=>c.dispose())}let a="",o=new Uint8Array(r);for(let c=0;c<o.length;c+=16384)a+=String.fromCharCode(...o.subarray(c,c+16384));return btoa(a)}async function DM(){try{await ln?.yieldFrame(),Nt=new Tr({antialias:!0,alpha:!1,preserveDrawingBuffer:!0,powerPreference:"high-performance"}),Nt.setClearColor(16448250),Nt.outputColorSpace=_t,Nt.toneMapping=Va,Nt.toneMappingExposure=1,Nt.shadowMap.enabled=!1,Nt.domElement.setAttribute("aria-label","33\uC885\uC758 \uC6D0\uBCF8 \uCEEC\uB7EC \uC785\uCCB4 \uC544\uC774\uCF58\uC774 \uBC18\uBCF5\uB418\uC5B4 \uBC14\uB2E5\uC744 \uCC44\uC6B0\uB294 \uD328\uD134"),$t.append(Nt.domElement),Ct=new Tn,Ct.background=new ke(16448250),Ct.fog=new fa(16448250,10,17),tt=new kt(32,1,.1,250),Ct.add(new Oa(16777215,15855853,1.9)),Hr=new xr(16776696,1.7),Hr.position.set(...li),Ct.add(Hr),Ct.add(Hr.target);let i=new xr(16777215,.7);i.position.set(12,16,-8),Ct.add(i),Gr=zm(Nt),Ct.add(Gr.mesh),ln?.update(5),await PM(),window.heroNebula=sg($l(".hero-art"),rt);for(let[e,t]of rt.entries())t.reveal=Ml(t,void 0,e===0?"viewport":"edge"),Ct.add(t.reveal.group),ln?.update(50+5*(e+1)/rt.length),e%4===3&&await ln?.yieldFrame();Ud=Vm($t,rt[0]),hg=Hm($t,rt[0]),ug=Gm($t,rt[0].reveal),io=new Il(Ct,rt,pg),ln?.update(60),await ln?.yieldFrame(),Wr=rg(Nt,Ct,tt,()=>{if(Od){Od=!1,Ql();return}qr(),ln?.finish()},e=>{if(e.error){ln?.fail();return}ln?.update(70+29*(e.total?e.completed/e.total:1))}),Xr=Rm(Nt,Ct,qr,(e,t)=>ln?.update(60+10*e/t)),await Xr.ready,kd=og($t,(e,t,n)=>{Di=e,Jl=t,dg=n,qr()}),$l("#journey").style.height=`${Fm+.85*100}svh`,addEventListener("scroll",gg,{passive:!0}),addEventListener("resize",cg),Ql(),Nt.render(Ct,tt),$t.classList.add("ready"),new ResizeObserver(cg).observe($t),window.heroStudio={ready:!0,exportPNG:LM,exportGLB:NM,inspect:()=>({count:rt.length,preparation:Wr.inspect(),pattern:io.inspect(),floor:Gr.inspect(),dimension:Ud.inspect(),errors:Dd,settings:{...sn},timelineEnd:RM(),cameraPath:{poses:dt.poses,wide:dt.wide},wordFlight:Xr.inspect(),camera:{...tt.userData,rotation:tt.rotation.toArray(),up:tt.up.toArray()},objects:rt.map(({mesh:e,icon:t,reveal:n,heightFactor:s,index:r,radius:a,cue:o})=>({id:t.id,name:t.name,vertices:e.geometry.attributes.position.count,triangles:e.geometry.attributes.position.count/3,...e.userData,color:e.material.color.getHexString(),lineColor:n.lines[0].material.color.getHexString(),cue:o,heightFactor:s,radius:a,position:e.position.toArray(),baseY:e.position.y,rotation:e.rotation.toArray(),heightScale:e.scale.y,visible:e.visible,guide:vl(n),drawingVisible:n.group.visible,pointVisible:n.group.visible&&n.dot.visible,strokeVertices:n.lines.reduce((c,l)=>c+l.geometry.drawRange.count,0),reveal:{...n.state}})),renderer:Nt.info.render})}}catch(i){ln?.fail(),console.warn("Intro unavailable; continuing with the existing main hero.",i),window.MainIntro.complete=!0,window.MainIntro.progress=1,document.body.classList.remove("intro-before-main"),document.body.classList.add("intro-unavailable"),window.dispatchEvent(new CustomEvent("main-intro-handoff",{detail:{complete:!0}})),window.heroStudio={ready:!1,error:String(i)}}}DM();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
