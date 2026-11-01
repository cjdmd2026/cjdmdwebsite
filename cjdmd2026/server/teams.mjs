import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// The exhibition's existing project list is the source of truth, never client input.
const context = { window: {} };
vm.runInNewContext(readFileSync(new URL('../js/project-data.js', import.meta.url), 'utf8'), context);
// Public folder names are fixed by the exhibition's published URL plan.
// Keep project IDs unchanged because other exhibition pages use those IDs.
const slugs = {
  cocorang: 'coco-lang',
  efact: 'e-fact',
  jikji: 'jigjijaembeoli',
  cheoma: 'geuneuljab-i',
  '28': 'byeol-ungwan',
};
export const teams = JSON.parse(JSON.stringify(context.window.PROJECTS.map(project => ({
  id: project.id,
  name: project.title,
  members: project.members,
  slug: slugs[project.id] || project.id,
}))));
export const findTeam = id => teams.find(team => team.id === id);
