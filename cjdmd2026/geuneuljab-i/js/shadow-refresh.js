// Reuse a static temple shadow between light changes. At 20 Hz the slowly
// travelling sun stays smooth without redrawing every roof into the shadow map.
export function createShadowRefreshGate(interval = 50) {
  let lastModel = null;
  let lastTime = NaN;
  let lastRefresh = -Infinity;
  let wasVisible = false;
  return (now, model, visible, time) => {
    if (!visible) {
      wasVisible = false;
      return false;
    }
    const force = model !== lastModel || !wasVisible;
    wasVisible = true;
    if (!force && (time === lastTime || now - lastRefresh < interval)) return false;
    lastModel = model;
    lastTime = time;
    lastRefresh = now;
    return true;
  };
}
