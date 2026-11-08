import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';
await build({
  absWorkingDir:fileURLToPath(new URL('.',import.meta.url)),
  entryPoints:['src/demo.js'],outfile:'demo.js',bundle:true,minify:true,
  format:'iife',target:['chrome110','safari16'],loader:{'.webp':'dataurl'},
  legalComments:'inline'
});
