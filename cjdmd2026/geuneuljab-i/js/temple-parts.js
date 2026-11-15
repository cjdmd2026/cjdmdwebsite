import { templeWebPartFromName } from './temple-web-parts.js?v=20261103-01';

// Authored null/group names in the temple GLBs. Floor is independent of the
// selection key: one hotspot selects the matching structure on both floors.
export const TEMPLE_PART_ORDER = Object.freeze(['giwa', 'gaepan', 'seokkarae', 'gongpo']);

export function templeGroupFromName(name = '') {
  const normalized = name.normalize('NFC').replace(/[\s_]/g, '').replace(/\.\d+$/, '');
  const match = normalized.match(/^(?:([12])층)?(지붕|덮개판|서까래|공포처마)$/);
  if (!match) return null;
  const partKey = { 지붕: 'giwa', 덮개판: 'gaepan', 서까래: 'seokkarae', 공포처마: 'gongpo' }[match[2]];
  return { partKey, floor: Number(match[1] || 2) };
}

export function findTempleGroup(object, root) {
  let webPart = null;
  for (let node = object; node && node !== root; node = node.parent) {
    if ((node.name || '').replace(/[\s_]/g, '') === '그외') return null;
    const group = templeGroupFromName(node.name || '');
    if (group) return group;
    if (/^0[1-8][\s_]/.test(node.name || '')) return webPart;
    webPart ||= templeWebPartFromName(node.name || '');
  }
  return null;
}

export function templeExplodeProfile(partKey, floor) {
  const layer = { gongpo: .04, seokkarae: .18, gaepan: .32, giwa: .48 }[partKey];
  return layer === undefined ? 0 : layer + (floor === 2 ? .50 : 0);
}
