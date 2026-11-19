/* Modest staggered arrival + position-driven wave, shared by scroll and drag. */
export function initServiceWave(track, gsap) {
  const cards = [...track.querySelectorAll(".scard")];
  const entrance = gsap.fromTo(cards, {
    x: -30, y: -46, rotation: -2.5, opacity: 0,
  }, {
    x: 0, y: 0, rotation: 0, opacity: 1,
    duration: 0.85, stagger: 0.1, ease: "power3.out",
    scrollTrigger: {
      id: "brand-world-entrance", trigger: track,
      start: "top 88%", toggleActions: "play none none reverse",
    },
  });
  let frame = 0;
  let disposed = false;
  function updateWave() {
    frame = 0;
    if (disposed) return;
    const width = track.clientWidth;
    cards.forEach(card => {
      const span = width + card.offsetWidth;
      const position = Math.max(0, Math.min(1, (width - card.offsetLeft + track.scrollLeft) / span));
      const wave = Math.sin(position * Math.PI * 2);
      card.style.setProperty("--card-wave-y", (-wave * 8).toFixed(2) + "px");
      card.style.setProperty("--card-wave-rotation", (wave * 0.65).toFixed(3) + "deg");
    });
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(updateWave);
  }
  track.addEventListener("scroll", schedule, { passive: true });
  const resize = new ResizeObserver(schedule);
  resize.observe(track);
  updateWave();
  return () => {
    disposed = true;
    track.removeEventListener("scroll", schedule);
    resize.disconnect();
    cancelAnimationFrame(frame);
    entrance.scrollTrigger?.kill();
    entrance.kill();
    cards.forEach(card => {
      card.style.removeProperty("--card-wave-y");
      card.style.removeProperty("--card-wave-rotation");
    });
  };
}