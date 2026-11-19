import * as THREE from "../../three.module.js";
const floor = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const inverse = new THREE.Matrix4();
const localRay = new THREE.Ray();
export function floorPoint(object, ray, target) {
    object.updateWorldMatrix(true, false);
    localRay.copy(ray).applyMatrix4(inverse.copy(object.matrixWorld).invert());
    return localRay.intersectPlane(floor, target);
}
const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
export function rayThrough(camera, element, clientX, clientY, ray) {
    const rect = element.getBoundingClientRect();
    if (!rect.width || !rect.height) return false;
    ndc.set((clientX - rect.left) / rect.width * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    camera.updateWorldMatrix(true, false);
    raycaster.setFromCamera(ndc, camera);
    ray.copy(raycaster.ray);
    return true;
}


//# sourceURL=engine.ts