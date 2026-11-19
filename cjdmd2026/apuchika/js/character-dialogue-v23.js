(() => {
  const voices = {
    apu: [
      { text: '안녕!', src: '../assets/audio/apu-voice-v25-01-soft-v71.mp3' },
      { text: '아푸치카 출동!', src: '../assets/audio/apu-voice-v25-02-soft-v71.mp3' },
      { text: '나는 아푸야!', src: '../assets/audio/apu-voice-v25-03-soft-v71.mp3' }
    ],
    chika: [
      { text: '안녕~', src: '../assets/audio/chika-voice-hello-v30-soft-v71.mp3' },
      { text: '나는 치카야!', src: '../assets/audio/chika-voice-01-soft-v71.mp3' },
      { text: '치카치카~ 양치하자!', src: '../assets/audio/chika-voice-02-soft-v71.mp3' }
    ]
  };
  const targets = [
    ['.profile-character-apu', 'apu'],
    ['.profile-character-chika', 'chika']
  ];
  const previous = new WeakMap();

  function attach(target, character) {
    if (!target || target.dataset.dialogueReady) return;
    target.dataset.dialogueReady = 'true';
    target.classList.add('character-dialogue-target');
    const bubble = document.createElement('span');
    bubble.className = 'character-speech';
    bubble.setAttribute('role', 'status');
    bubble.setAttribute('aria-live', 'polite');
    bubble.setAttribute('aria-atomic', 'true');
    target.append(bubble);

    let hideTimer;
    let currentAudio = null;
    const play = () => {
      if (!currentAudio || !currentAudio.paused) return;
      currentAudio.play().catch(() => {});
    };
    const show = () => {
      clearTimeout(hideTimer);
      const choices = voices[character];
      let index = Math.floor(Math.random() * choices.length);
      if (choices.length > 1 && index === previous.get(target)) index = (index + 1) % choices.length;
      previous.set(target, index);
      const line = choices[index];
      bubble.textContent = line.text;
      target.classList.add('is-speaking');
      currentAudio?.pause();
      currentAudio = new Audio(line.src);
      currentAudio.preload = 'auto';
      play();
    };
    const hide = () => {
      hideTimer = setTimeout(() => target.classList.remove('is-speaking'), 240);
      currentAudio?.pause();
    };
    const mobile=()=>matchMedia('(max-width:800px)').matches;
    target.addEventListener('click',()=>{if(mobile())show()});
    target.addEventListener('pointerenter',()=>{if(!mobile())show()});
    target.addEventListener('pointerdown',()=>{if(!mobile())play()});
    target.addEventListener('pointerleave',()=>{if(!mobile())hide()});
    target.addEventListener('focus',()=>{if(!mobile())show()});
    target.addEventListener('blur',()=>{if(!mobile())hide()});
  }

  function init() {
    targets.forEach(([selector, character]) => {
      document.querySelectorAll(selector).forEach(target => attach(target, character));
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();
