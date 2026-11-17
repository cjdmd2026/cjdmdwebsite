/* One entrance per tab session; never replay on device changes, reload or back. */
(()=>{
 const entry=document.querySelector('.media-entry-crt');if(!entry)return;
 const skip=false;
 window.YEARON_MEDIA_ENTRY={started:performance.now(),skip};
 const remove=()=>{entry.remove();const sound=document.getElementById('mediaEntrySound');if(sound){sound.pause();sound.remove()}};
 if(skip){remove();return;}
 entry.addEventListener('animationend',event=>{if(event.target===entry&&event.animationName==='yearonPowerOnExit')remove()});
 const fallback=setTimeout(remove,3800);
 addEventListener('pagehide',()=>{clearTimeout(fallback);remove()},{once:true});
 addEventListener('pageshow',event=>{if(event.persisted)remove()});
 // A late stylesheet must not restart the effect over an active device.
 document.addEventListener('pointerdown',event=>{if(event.target.closest('#timeDeck,#timeNav'))remove()},{capture:true});
})();
