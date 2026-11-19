const STEP_SPACING = 26;
const TRAIL_LIMIT = 60;
const TRAIL_LIFETIME = 650;
const SIDE_OFFSET = 3;

export function initCanvasCursor(layer, imageSource) {
  if (!layer || !imageSource) return;

  const media = window.matchMedia("(hover: hover) and (pointer: fine)");
  if (!media.matches) return;

  // Wait for the supplied PNG before hiding the browser's native cursor.
  const imageCheck = new Image();
  imageCheck.src = imageSource;
  imageCheck.onload = () => {
    if (!media.matches || !layer.isConnected) return;
    mount();
  };

  function mount() {
    const cursor = document.createElement("img");
    cursor.className = "footprint-cursor";
    cursor.src = imageSource;
    cursor.alt = "";
    cursor.draggable = false;
    layer.append(cursor);

    const marks = [];
    let previous = null;
    let carry = 0;
    let side = 1;
    let frame = 0;
    let visible = false;
    let disposed = false;

    const positionCursor = (x, y) => {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const animateMarks = now => {
      frame = 0;
      while (marks.length && now - marks[0].created >= TRAIL_LIFETIME) {
        marks.shift().element.remove();
      }
      for (const mark of marks) {
        mark.element.style.opacity = String(.9 * (1 - (now - mark.created) / TRAIL_LIFETIME));
      }
      if (marks.length) frame = requestAnimationFrame(animateMarks);
    };

    const addMark = (x, y, angle, now) => {
      if (marks.length >= TRAIL_LIMIT) marks.shift().element.remove();
      const element = document.createElement("img");
      element.className = "footprint-mark";
      element.src = imageSource;
      element.alt = "";
      element.draggable = false;
      const radians = angle + Math.PI / 2;
      const offset = SIDE_OFFSET * side;
      element.style.left = `${x + Math.cos(radians) * offset}px`;
      element.style.top = `${y + Math.sin(radians) * offset}px`;
      element.style.transform = `translate(-50%, -50%) rotate(${angle * 180 / Math.PI}deg)`;
      element.style.opacity = ".9";
      layer.append(element);
      marks.push({ element, created: now });
      side *= -1;
      if (!frame) frame = requestAnimationFrame(animateMarks);
    };

    const onMove = event => {
      const point = { x: event.clientX, y: event.clientY };
      positionCursor(point.x, point.y);
      if (!visible) {
        visible = true;
        cursor.classList.add("is-visible");
      }

      if (!previous) {
        previous = point;
        return;
      }

      const dx = point.x - previous.x;
      const dy = point.y - previous.y;
      const distance = Math.hypot(dx, dy);
      if (!distance) return;

      const angle = Math.atan2(dy, dx);
      let offset = STEP_SPACING - carry;
      while (offset <= distance) {
        const ratio = offset / distance;
        addMark(previous.x + dx * ratio, previous.y + dy * ratio, angle, performance.now());
        offset += STEP_SPACING;
      }
      carry = (carry + distance) % STEP_SPACING;
      previous = point;
    };

    const hideCursor = () => {
      visible = false;
      previous = null;
      carry = 0;
      cursor.classList.remove("is-visible");
    };

    const onVisibilityChange = () => {
      if (document.hidden) hideCursor();
    };

    const dispose = () => {
      if (disposed) return;
      disposed = true;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", hideCursor);
      window.removeEventListener("blur", hideCursor);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (frame) cancelAnimationFrame(frame);
      marks.forEach(mark => mark.element.remove());
      cursor.remove();
      layer.replaceChildren();
      document.documentElement.classList.remove("has-custom-cursor");
    };

    document.documentElement.classList.add("has-custom-cursor");
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", hideCursor, { passive: true });
    window.addEventListener("blur", hideCursor);
    document.addEventListener("visibilitychange", onVisibilityChange);
    media.addEventListener("change", event => {
      if (!event.matches) dispose();
    }, { once: true });
  }
}
