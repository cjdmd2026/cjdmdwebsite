// Geographic input: +X east, +Y up, +Z south.
// The house front faces +Z, the temple's plaque/doors face -X, and the gate faces +X.
// Rotate light into each model's axes so its front always represents south.
export function orientLightToBuilding({ x, y, z }, buildingKey) {
  if (buildingKey === 'gate') return { x: z, y, z: -x };
  if (buildingKey === 'sachal') return { x: -z, y, z: x };
  return { x, y, z };
}
