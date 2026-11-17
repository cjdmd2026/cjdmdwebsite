/* Cursor artwork is native CSS, so it remains visible in dialogs and during loads. */
(()=>{document.querySelectorAll('.yearon-cursor').forEach(e=>e.remove());document.querySelectorAll('.yearon-cursor-target').forEach(e=>e.classList.remove('yearon-cursor-target'));})();
