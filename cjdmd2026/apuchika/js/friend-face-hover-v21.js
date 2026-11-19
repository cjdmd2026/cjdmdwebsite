(() => {
  document.querySelectorAll('#planetFriends .friend-face[data-hover-src]').forEach(face => {
    const frame = document.createElement('span');
    frame.className = 'friend-face-motion';
    face.before(frame);
    frame.append(face);
    const alternate = new Image();
    alternate.className = 'friend-face-alternate';
    alternate.alt = '';
    alternate.setAttribute('aria-hidden', 'true');
    alternate.src = face.dataset.hoverSrc;
    alternate.decoding = 'async';
    frame.append(alternate);
  });
})();
