import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';

export async function buildMainIntro(){
  const root=fileURLToPath(new URL('../',import.meta.url));
  await build({absWorkingDir:root,entryPoints:['js/main-intro/loading.js'],outfile:'js/main-intro-loading.js',bundle:true,minify:true,format:'iife',target:['chrome110','safari16']});
  await build({absWorkingDir:root,entryPoints:['js/main-intro/scene.js'],outfile:'js/main-intro.js',bundle:true,minify:true,format:'iife',target:['chrome110','safari16']});
  await build({absWorkingDir:root,entryPoints:['js/main-intro/style.css'],outfile:'css/main-intro.css',bundle:true,minify:true,target:['chrome110','safari16'],loader:{'.ttf':'file','.woff2':'file'},external:['../assets/*']});
}
if(process.argv[1]===fileURLToPath(import.meta.url))await buildMainIntro();
