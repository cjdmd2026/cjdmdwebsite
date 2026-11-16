/* Returning from another page starts a fresh exhibition visit, including browser Back. */
(()=>{
 addEventListener('pageshow',event=>{if(event.persisted)location.reload()});
 addEventListener('pagehide',()=>{document.querySelectorAll('video,audio').forEach(media=>media.pause())});
})();
