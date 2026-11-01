import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// The exhibition's existing project list is the source of truth, never client input.
const context = { window: {} };
vm.runInNewContext(readFileSync(new URL('../js/project-data.js', import.meta.url), 'utf8'), context);
const slugs = { '28': 'byeolungwan' };
export const teams = JSON.parse(JSON.stringify(context.window.PROJECTS.map(project => ({
  id: project.id,
  name: project.title,
  members: project.members,
  slug: slugs[project.id] || project.id,
}))));
export const findTeam = id => teams.find(team => team.id === id);
