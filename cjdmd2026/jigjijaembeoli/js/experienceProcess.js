export function initExperienceProcess(gsap) {
  const section = document.querySelector("#experience-process");
  if (!section || !gsap || !window.ScrollTrigger) return () => {};

  const artwork = section.querySelector(".experience-process__artwork");
  const canvas = section.querySelector(".experience-process__canvas");
  const heading = section.querySelector(".experience-process__heading");
  const world = section.querySelector(".experience-process__world");
  const foregroundWorld = section.querySelector(".experience-process__foreground-world");
  const focusArtwork = section.querySelector(".experience-process__focus-artwork");
  const routeGroup = section.querySelector(".experience-process__route-geometry");
  const focusObjectLayer = section.querySelector(".experience-process__focus-object-layer");
  const travelerPosition = section.querySelector(".experience-process__traveler-position");
  const traveler = section.querySelector(".experience-process__traveler");
  const shade = section.querySelector(".experience-process__shade");
  const sceneImages = [...section.querySelectorAll("[data-journey-object]")];
  const steps = [...section.querySelectorAll("[data-journey-step]")];
  const stepRail = section.querySelector(".experience-process__step-rail");
  const originalRailSibling = stepRail?.nextSibling || null;
  const header = document.querySelector("#header");
  if (!artwork || !canvas || !world || !foregroundWorld || !focusArtwork || !routeGroup || !focusObjectLayer || !travelerPosition || !traveler || !shade || !stepRail || sceneImages.length !== 5 || steps.length !== 5) return () => {};

  const VIEWBOX_WIDTH = artwork.viewBox.baseVal.width;
  const VIEWBOX_HEIGHT = artwork.viewBox.baseVal.height;
  const TRAVELER_VIEWBOX_WIDTH = 2929.46;
  const TRAVELER_VIEWBOX_HEIGHT = 2197.1;
  const BASE_TRAVELER_WIDTH = 264;
  const TRAVELER_SCALE = 1.3;
  const TRAVELER_WIDTH = BASE_TRAVELER_WIDTH * TRAVELER_SCALE;
  const TRAVELER_HEIGHT = TRAVELER_WIDTH * TRAVELER_VIEWBOX_HEIGHT / TRAVELER_VIEWBOX_WIDTH;
  const MOVE_SCROLL_PER_ARTWORK_HEIGHT = 6;
  const HOLD_DISTANCE = 1600;
  const routeUrl = "images/experience-scenario/asset-15-guide.svg";
  const paradeUrl = "images/experience-scenario/parade.svg";

  let path = null;
  let pathLength = 0;
  let pathStart = null;
  let objectCenters = [];
  let stops = [];
  let trigger = null;
  let segments = [];
  let totalScrollDistance = 0;
  let displayedPopup = -1;
  let activeObject = -1;
  let direction = 1;
  let lastPoint = null;
  let directionDelta = 0;
  let resizeFrame = 0;
  let disposed = false;
  let popupLayer = null;
  const imageListeners = [];
  const headerOffset = () => header?.getBoundingClientRect().height || 0;
  const syncViewportHeight = () => {
    section.style.setProperty("--experience-viewport-height", `${window.innerHeight}px`);
    section.style.setProperty("--experience-header-height", `${headerOffset()}px`);
  };
  const clamp = value => Math.max(0, Math.min(1, value));
  const clampRange = (value, min, max) => Math.max(min, Math.min(max, value));

  function movePopupRailToViewport() {
    if (popupLayer) return;
    popupLayer = document.createElement("div");
    popupLayer.className = "experience-process__popup-layer";
    popupLayer.setAttribute("aria-live", "polite");
    document.body.append(popupLayer);
    popupLayer.append(stepRail);
  }

  function restorePopupRail() {
    if (!popupLayer) return;
    if (section.isConnected) section.insertBefore(stepRail, originalRailSibling);
    popupLayer.remove();
    popupLayer = null;
  }

  function nearestSafePathProgress(box, startProgress, endProgress) {
    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;
    const clearanceX = TRAVELER_WIDTH / 2 + 24;
    const clearanceY = TRAVELER_HEIGHT / 2 + 24;
    const samples = 12000;
    const first = Math.max(0, Math.floor(startProgress * samples));
    const last = Math.min(samples, Math.ceil(endProgress * samples));
    let best = null;
    let firstApproach = null;

    // Stop on the approach side of the object's expanded hit area. The old
    // nearest-to-center search could select the far side after the rail had
    // already passed the object, making the popup feel late.
    for (let i = first; i <= last; i += 1) {
      const length = pathLength * i / samples;
      const point = path.getPointAtLength(length);
      const insideExpandedBox = Math.abs(point.x - centerX) <= box.width / 2 + clearanceX
        && Math.abs(point.y - centerY) <= box.height / 2 + clearanceY;
      if (!insideExpandedBox) continue;

      const approachIndex = Math.max(first, i - 1);
      const approachLength = pathLength * approachIndex / samples;
      const approachPoint = path.getPointAtLength(approachLength);
      firstApproach = {
        progress: approachLength / pathLength,
        distance: Math.hypot(approachPoint.x - centerX, approachPoint.y - centerY),
        point: approachPoint,
        approach: true,
      };
      break;
    }

    if (firstApproach && firstApproach.progress > startProgress) return firstApproach;

    for (let i = first; i <= last; i += 1) {
      const length = pathLength * i / samples;
      const point = path.getPointAtLength(length);
      const dx = Math.abs(point.x - centerX);
      const dy = Math.abs(point.y - centerY);
      const outsideX = Math.max(0, dx - (box.width / 2 + clearanceX));
      const outsideY = Math.max(0, dy - (box.height / 2 + clearanceY));
      if (!outsideX && !outsideY) continue;
      const distance = Math.hypot(dx, dy);
      if (!best || distance < best.distance) best = { progress: length / pathLength, distance, point };
    }

    if (!best) {
      throw new Error("No safe rail stop was found beside one of the five experience objects.");
    }
    return best;
  }

  function positionPopup(index) {
    const object = sceneImages[index].getBoundingClientRect();
    const popup = steps[index];
    const width = Math.min(380, window.innerWidth - 32);
    const gap = 20;
    let left;
    let top;

    if (object.left + object.width / 2 < window.innerWidth / 2 && object.right + gap + width <= window.innerWidth - 16) {
      left = object.right + gap;
      top = object.top + object.height / 2 - 110;
    } else if (object.left - gap - width >= 16) {
      left = object.left - width - gap;
      top = object.top + object.height / 2 - 110;
    } else {
      left = Math.max(16, Math.min(window.innerWidth - width - 16, object.left + object.width / 2 - width / 2));
      top = object.bottom + gap + 220 <= window.innerHeight ? object.bottom + gap : object.top - 240;
    }

    left = Math.max(16, Math.min(window.innerWidth - width - 16, left));
    const safeTop = headerOffset() + 16;
    const popupHeight = popup.offsetHeight || 220;
    const maxTop = Math.max(16, window.innerHeight - popupHeight - 16);
    top = Math.max(Math.min(safeTop, maxTop), Math.min(maxTop, top));
    popup.style.left = `${left}px`;
    popup.style.top = `${top}px`;
    popup.style.transform = "none";
  }

  function setPopup(index) {
    if (index === displayedPopup) {
      if (index >= 0) positionPopup(index);
      return;
    }
    const previousPopup = displayedPopup;
    displayedPopup = index;
    const cards = steps.map(step => step.querySelector(".experience-process__step-card"));
    gsap.killTweensOf(steps);
    gsap.killTweensOf(cards);

    steps.forEach((step, stepIndex) => {
      const visible = stepIndex === index;
      if (!visible && !(index < 0 && stepIndex === previousPopup)) gsap.set(step, { autoAlpha: 0 });
      step.setAttribute("aria-hidden", visible ? "false" : "true");
      if (visible) gsap.set(cards[stepIndex], { y: 18 });
    });

    if (index >= 0) {
      positionPopup(index);
      gsap.set(steps[index], { autoAlpha: 0, pointerEvents: "none" });
      gsap.to(steps[index], { autoAlpha: 1, duration: 0.4, ease: "power1.out", overwrite: true });
      gsap.to(cards[index], { y: 0, duration: 0.4, ease: "power1.out", overwrite: true });
    } else if (previousPopup >= 0) {
      gsap.to(steps[previousPopup], { autoAlpha: 0, duration: 0.4, ease: "power1.out", overwrite: true });
    }
  }

  function setFocus(index) {
    if (index === activeObject) return;
    if (activeObject >= 0) sceneImages[activeObject].style.removeProperty("visibility");
    activeObject = index;
    focusObjectLayer.replaceChildren();

    if (index >= 0) {
      const clone = sceneImages[index].cloneNode(true);
      clone.removeAttribute("data-journey-object");
      clone.classList.add("experience-process__focus-object");
      focusObjectLayer.append(clone);
      sceneImages[index].style.visibility = "hidden";
      section.dataset.focusStep = String(index);
      section.dataset.focus = "true";
    } else {
      section.removeAttribute("data-focus-step");
      section.dataset.focus = "false";
    }
  }

  function renderRoute(progress, cameraFocus = pathStart) {
    progress = clamp(progress);
    const point = path.getPointAtLength(pathLength * progress);
    const currentPoint = { x: point.x, y: point.y };

    if (lastPoint) {
      directionDelta += currentPoint.x - lastPoint.x;
      if (directionDelta > 5) {
        direction = 1;
        directionDelta = 0;
      } else if (directionDelta < -5) {
        direction = -1;
        directionDelta = 0;
      }
    }
    lastPoint = currentPoint;

    // SVGElement has no offsetLeft/offsetWidth in all browsers. Use its rendered
    // width and the canvas layout to derive the centered SVG's local coordinates.
    const artworkRect = artwork.getBoundingClientRect();
    const scale = artworkRect.width / VIEWBOX_WIDTH;
    const artworkX = (canvas.clientWidth - artworkRect.width) / 2;
    const artworkY = 0;
    const travelerWidth = TRAVELER_WIDTH * scale;
    const travelerHeight = TRAVELER_HEIGHT * scale;
    travelerPosition.style.width = `${travelerWidth}px`;
    travelerPosition.style.height = `${travelerHeight}px`;
    traveler.style.width = `${travelerWidth}px`;
    traveler.style.height = `${travelerHeight}px`;
    gsap.set(travelerPosition, {
      x: artworkX + currentPoint.x * scale,
      y: artworkY + currentPoint.y * scale,
      xPercent: -50,
      yPercent: -50,
      force3D: true,
    });
    gsap.set(traveler, { scaleX: direction, force3D: true });

    const focus = cameraFocus || currentPoint;
    const safeSceneTop = Math.min(canvas.clientHeight * 0.62, headerOffset() + 32);
    const safeSceneBottom = canvas.clientHeight - Math.max(34, canvas.clientHeight * 0.06);
    const sceneCenterY = safeSceneTop + Math.max(0, safeSceneBottom - safeSceneTop) * 0.52;
    const headingOpacity = Number.parseFloat(heading.style.getPropertyValue("--experience-heading-opacity")) || 0;
    const introTravelerY = canvas.clientHeight * 0.9;
    const cameraTargetY = sceneCenterY + (introTravelerY - sceneCenterY) * headingOpacity;
    const cameraX = canvas.clientWidth / 2 - artworkX - focus.x * scale;
    const cameraY = cameraTargetY - artworkY - focus.y * scale;
    gsap.set([world, foregroundWorld], { x: cameraX, y: cameraY, force3D: true });
    section.dataset.progress = progress.toFixed(4);
    section.dataset.facing = direction < 0 ? "left" : "right";
    section.dataset.camera = `${cameraX.toFixed(1)}:${cameraY.toFixed(1)}`;
    section.dataset.artworkScale = scale.toFixed(4);
    section.dataset.artworkSize = `${artworkRect.width.toFixed(1)}:${artworkRect.height.toFixed(1)}`;
    section.dataset.artworkOrigin = `${artworkX.toFixed(1)}:${artworkY.toFixed(1)}`;
    return { cameraX, cameraY };
  }

  function renderHeading(scrollDistance) {
    const exitDistance = Math.max(1, canvas.clientHeight * 1.2);
    const progress = clamp(scrollDistance / exitDistance);
    const eased = progress * progress * (3 - 2 * progress);
    const travel = heading.offsetHeight + headerOffset() + 8;
    heading.style.setProperty("--experience-heading-y", `${-travel * eased}px`);
    heading.style.setProperty("--experience-heading-opacity", String(1 - eased));
  }

  function getCompositionShift(index) {
    const popup = steps[index];
    const activeImage = sceneImages[index];
    if (!activeImage || !popup) return { dx: 0, dy: 0 };

    const measuredObject = activeImage.getBoundingClientRect();
    const objectScale = 1.2;
    const objectCenterX = (measuredObject.left + measuredObject.right) / 2;
    const objectCenterY = (measuredObject.top + measuredObject.bottom) / 2;
    const objectWidth = measuredObject.width * objectScale;
    const objectHeight = measuredObject.height * objectScale;
    const objectRect = {
      left: objectCenterX - objectWidth / 2,
      right: objectCenterX + objectWidth / 2,
      top: objectCenterY - objectHeight / 2,
      bottom: objectCenterY + objectHeight / 2,
    };
    const travelerRect = travelerPosition.getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();
    const bounds = {
      left: Math.min(objectRect.left, travelerRect.left, popupRect.left),
      top: Math.min(objectRect.top, travelerRect.top, popupRect.top),
      right: Math.max(objectRect.right, travelerRect.right, popupRect.right),
      bottom: Math.max(objectRect.bottom, travelerRect.bottom, popupRect.bottom),
    };
    const safe = {
      left: 52,
      top: headerOffset() + 28,
      right: window.innerWidth - 52,
      bottom: window.innerHeight - 44,
    };
    let dx = window.innerWidth / 2 - (bounds.left + bounds.right) / 2;
    let dy = (safe.top + safe.bottom) / 2 - (bounds.top + bounds.bottom) / 2;

    if (bounds.right - bounds.left <= safe.right - safe.left) {
      dx = clampRange(dx, safe.left - bounds.left, safe.right - bounds.right);
    }
    if (bounds.bottom - bounds.top <= safe.bottom - safe.top) {
      dy = clampRange(dy, safe.top - bounds.top, safe.bottom - bounds.bottom);
    }

    return { dx, dy };
  }

  function centerMoveComposition(index, camera, amount) {
    if (index < 0 || !camera || amount <= 0) return;
    positionPopup(index);
    const shift = getCompositionShift(index);
    gsap.set([world, foregroundWorld], {
      x: camera.cameraX + shift.dx * amount,
      y: camera.cameraY + shift.dy * amount,
      force3D: true,
    });
  }

  function centerHoldComposition(index, camera) {
    if (index < 0 || !camera) return;
    const popup = steps[index];
    if (!focusObjectLayer.querySelector(".experience-process__focus-object") || !popup) return;
    // Measure the visible 120% focus clone, the full parade asset, and the
    // popup together. Only the shared world layers and popup screen offset move.
    const shift = getCompositionShift(index);
    gsap.set([world, foregroundWorld], { x: camera.cameraX + shift.dx, y: camera.cameraY + shift.dy, force3D: true });
    popup.style.left = `${(Number.parseFloat(popup.style.left) || 0) + shift.dx}px`;
    popup.style.top = `${(Number.parseFloat(popup.style.top) || 0) + shift.dy}px`;
    section.dataset.camera = `${(camera.cameraX + shift.dx).toFixed(1)}:${(camera.cameraY + shift.dy).toFixed(1)}`;
  }

  function renderDistance(scrollDistance) {
    if (!segments.length) return;
    const distance = Math.max(0, Math.min(totalScrollDistance, scrollDistance));
    let current = segments[segments.length - 1];
    for (const segment of segments) {
      if (distance < segment.end || segment === segments[segments.length - 1]) {
        current = segment;
        break;
      }
    }

    const localProgress = clamp((distance - current.start) / current.duration);
    const progress = current.type === "hold"
      ? current.progress
      : current.from + (current.to - current.from) * localProgress;
    let focusPoint = current.focus;
    let cameraFocusMix = 0;
    if (current.type === "move") {
      const routePoint = path.getPointAtLength(pathLength * progress);
      const fromMix = clamp(localProgress / 0.16);
      const settleMix = clamp((localProgress - 0.78) / 0.22);
      cameraFocusMix = settleMix * settleMix * (3 - 2 * settleMix);
      const easedFromMix = fromMix * fromMix * (3 - 2 * fromMix);
      const trackingPoint = {
        x: current.fromFocus.x + (routePoint.x - current.fromFocus.x) * easedFromMix,
        y: current.fromFocus.y + (routePoint.y - current.fromFocus.y) * easedFromMix,
      };
      focusPoint = {
        x: trackingPoint.x + (current.toFocus.x - trackingPoint.x) * cameraFocusMix,
        y: trackingPoint.y + (current.toFocus.y - trackingPoint.y) * cameraFocusMix,
      };
    }
    const activeStep = current.type === "hold" ? current.step : -1;

    renderHeading(distance);
    const camera = renderRoute(progress, focusPoint);
    setFocus(activeStep);
    setPopup(activeStep);
    if (current.type === "move") centerMoveComposition(current.step, camera, cameraFocusMix);
    centerHoldComposition(activeStep, camera);
    section.dataset.segment = current.type === "hold"
      ? `hold-${current.step + 1}`
      : current.step === 0 ? "move-start-1" : `move-${current.step}-${current.step + 1}`;
    section.dataset.timelineProgress = (distance / totalScrollDistance).toFixed(4);
    section.dataset.segmentDistance = String(Math.round(current.duration));
    section.dataset.segmentRemaining = String(Math.max(0, Math.round(current.end - distance)));
  }

  function buildSegments() {
    const artworkWidth = artwork.getBoundingClientRect().width;
    const artworkHeight = artworkWidth * VIEWBOX_HEIGHT / VIEWBOX_WIDTH;
    const fullPathScrollDistance = artworkHeight * MOVE_SCROLL_PER_ARTWORK_HEIGHT;
    const sequence = [];

    for (let index = 0; index < stops.length; index += 1) {
      const fromProgress = index === 0 ? 0 : stops[index - 1];
      const fromStop = index === 0 ? pathStart : path.getPointAtLength(pathLength * stops[index - 1]);
      const stop = path.getPointAtLength(pathLength * stops[index]);
      const toFocus = {
        x: (objectCenters[index].x + stop.x) / 2,
        y: (objectCenters[index].y + stop.y) / 2,
      };
      sequence.push({
        type: "move",
        step: index,
        from: fromProgress,
        to: stops[index],
        fromFocus: index === 0 ? pathStart : {
          x: (objectCenters[index - 1].x + fromStop.x) / 2,
          y: (objectCenters[index - 1].y + fromStop.y) / 2,
        },
        toFocus,
        duration: Math.max(2000, (stops[index] - fromProgress) * fullPathScrollDistance),
      });
      sequence.push({ type: "hold", step: index, progress: stops[index], focus: toFocus, duration: HOLD_DISTANCE });
    }

    let cursor = 0;
    segments = sequence.map(segment => {
      const current = { ...segment, start: cursor, end: cursor + segment.duration };
      cursor = current.end;
      return current;
    });
    totalScrollDistance = Math.ceil(cursor);
    if (!Number.isFinite(totalScrollDistance) || totalScrollDistance <= 0) {
      throw new Error("The experience timeline has an invalid scroll distance.");
    }
    section.style.setProperty("--experience-scroll-distance", `${totalScrollDistance}px`);
    section.dataset.holdDistance = String(HOLD_DISTANCE);
    section.dataset.moveDistances = segments.filter(segment => segment.type === "move").map(segment => Math.round(segment.duration)).join(",");
    section.dataset.totalScrollDistance = String(Math.round(totalScrollDistance));
    section.dataset.moveScrollPerArtworkHeight = String(MOVE_SCROLL_PER_ARTWORK_HEIGHT);
    section.dataset.artworkWidth = artworkWidth.toFixed(1);
    section.dataset.artworkHeight = artworkHeight.toFixed(1);
  }

  function createScrollTrigger() {
    buildSegments();
    trigger = window.ScrollTrigger.create({
      id: "jikji-experience-scenario",
      trigger: section,
      start: "top top",
      end: () => `+=${totalScrollDistance}`,
      pin: canvas,
      pinSpacing: false,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: self => {
        if (self.isActive) section.removeAttribute("data-outside");
        renderDistance(self.progress * totalScrollDistance);
      },
      onToggle: self => {
        if (self.isActive) {
          section.removeAttribute("data-outside");
          renderDistance(self.progress * totalScrollDistance);
        } else {
          section.setAttribute("data-outside", "true");
        }
      },
      onEnter: self => {
        section.removeAttribute("data-outside");
        renderDistance(self.progress * totalScrollDistance);
      },
      onEnterBack: self => {
        section.removeAttribute("data-outside");
        renderDistance(self.progress * totalScrollDistance);
      },
      onLeave: () => {
        setFocus(-1);
        setPopup(-1);
        section.setAttribute("data-outside", "true");
      },
      onLeaveBack: () => {
        setFocus(-1);
        setPopup(-1);
        section.setAttribute("data-outside", "true");
        lastPoint = null;
        directionDelta = 0;
        direction = 1;
        renderRoute(0, pathStart);
        renderHeading(0);
      },
    });
    window.ScrollTrigger.sort();
  }

  function refresh() {
    if (disposed || !trigger) return;
    window.ScrollTrigger.refresh();
  }

  function onResize() {
    if (resizeFrame) cancelAnimationFrame(resizeFrame);
    const progress = trigger?.progress || 0;
    resizeFrame = requestAnimationFrame(() => {
      resizeFrame = 0;
      if (disposed) return;
      syncViewportHeight();
      trigger?.kill();
      trigger = null;
      gsap.set([world, foregroundWorld, artwork, focusArtwork, travelerPosition, traveler], { clearProps: "transform" });
      createScrollTrigger();
      window.ScrollTrigger.refresh();
      const target = trigger.start + progress * (trigger.end - trigger.start);
      window.scrollTo({ top: target, behavior: "instant" });
      window.ScrollTrigger.update(true);
    });
  }

  async function initialize() {
    section.dataset.outside = "true";
    syncViewportHeight();
    renderHeading(0);
    const [routeResponse, paradeResponse] = await Promise.all([fetch(routeUrl), fetch(paradeUrl)]);
    if (!routeResponse.ok) throw new Error(`Route SVG failed to load (${routeResponse.status}).`);
    if (!paradeResponse.ok) throw new Error(`Parade SVG failed to load (${paradeResponse.status}).`);
    const routeDocument = new DOMParser().parseFromString(await routeResponse.text(), "image/svg+xml");
    const paradeDocument = new DOMParser().parseFromString(await paradeResponse.text(), "image/svg+xml");
    const centerline = routeDocument.querySelector("path.cls-1");
    const paradeImage = paradeDocument.querySelector("image");
    const paradeRoot = paradeDocument.documentElement;
    const paradeViewBox = paradeRoot.viewBox.baseVal;
    const embeddedHref = paradeImage?.getAttribute("href") || paradeImage?.getAttributeNS("http://www.w3.org/1999/xlink", "href");

    if (!centerline) throw new Error("The supplied asset 15 SVG does not contain its route path.");
    const routeViewBox = routeDocument.documentElement.viewBox.baseVal;
    if (Math.abs(routeViewBox.width - VIEWBOX_WIDTH) > 0.1 || Math.abs(routeViewBox.height - VIEWBOX_HEIGHT) > 0.1) {
      throw new Error(`Route and artwork viewBoxes differ: ${routeDocument.documentElement.getAttribute("viewBox")} vs ${artwork.getAttribute("viewBox")}`);
    }
    if (!paradeImage || !embeddedHref || !paradeViewBox.width || !paradeViewBox.height) {
      throw new Error("The supplied parade SVG does not contain a usable image and viewBox.");
    }
    if (Math.abs(paradeViewBox.width - TRAVELER_VIEWBOX_WIDTH) > 0.1 || Math.abs(paradeViewBox.height - TRAVELER_VIEWBOX_HEIGHT) > 0.1) {
      throw new Error(`Unexpected parade SVG viewBox: ${paradeRoot.getAttribute("viewBox")}`);
    }

    traveler.src = new URL(embeddedHref, new URL(paradeUrl, document.baseURI)).href;
    await traveler.decode();
    path = centerline.cloneNode(true);
    path.removeAttribute("class");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "transparent");
    path.setAttribute("stroke-width", "14");
    path.setAttribute("pointer-events", "none");
    routeGroup.append(path);
    pathLength = path.getTotalLength();
    const routeStartPoint = path.getPointAtLength(0);
    pathStart = { x: routeStartPoint.x, y: routeStartPoint.y };
    objectCenters = sceneImages.map(image => {
      const box = image.getBBox();
      return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    });

    const arrivals = [];
    stops = sceneImages.map((image, index) => {
      const start = index ? arrivals[index - 1].progress + 0.001 : 0;
      const end = Math.max(start, 1 - (sceneImages.length - index - 1) * 0.001);
      const arrival = nearestSafePathProgress(image.getBBox(), start, end);
      arrivals.push(arrival);
      return arrival.progress;
    });
    if (stops.some((value, index) => index > 0 && value <= stops[index - 1])) {
      throw new Error(`Asset-based arrival points are out of order: ${stops.map(value => value.toFixed(3)).join(", ")}`);
    }

    movePopupRailToViewport();
    gsap.set(steps, { autoAlpha: 0 });
    renderRoute(0, pathStart);
    createScrollTrigger();
    window.addEventListener("resize", onResize, { passive: true });
    artwork.querySelectorAll("image").forEach(image => {
      if (image.complete) return;
      const handler = refresh;
      image.addEventListener("load", handler, { once: true });
      imageListeners.push([image, handler]);
    });
    window.ScrollTrigger.refresh();
    section.dataset.routeReady = "true";
    section.dataset.arrivals = stops.map(value => value.toFixed(4)).join(",");
    section.dataset.arrivalDistances = arrivals.map(arrival => arrival.distance.toFixed(1)).join(",");
    section.dataset.arrivalCoordinates = arrivals.map(arrival => `${arrival.point.x.toFixed(1)}:${arrival.point.y.toFixed(1)}`).join(",");
    section.dataset.arrivalApproach = arrivals.map(arrival => String(Boolean(arrival.approach))).join(",");
    section.dataset.objectCenters = objectCenters.map(point => `${point.x.toFixed(1)}:${point.y.toFixed(1)}`).join(",");
    section.dataset.routeStart = `${pathStart.x.toFixed(2)}:${pathStart.y.toFixed(2)}`;
    section.dataset.routeLength = pathLength.toFixed(1);
    section.dataset.routeViewBox = routeDocument.documentElement.getAttribute("viewBox") || "";
    section.dataset.worldViewBox = artwork.getAttribute("viewBox") || "";
  }

  initialize().catch(error => {
    console.error("Experience scenario initialization failed:", error);
    restorePopupRail();
    section.dataset.routeError = error.message;
  });

  return () => {
    disposed = true;
    window.removeEventListener("resize", onResize);
    imageListeners.forEach(([image, handler]) => image.removeEventListener("load", handler));
    if (resizeFrame) cancelAnimationFrame(resizeFrame);
    trigger?.kill();
    setFocus(-1);
    setPopup(-1);
    restorePopupRail();
    heading.style.removeProperty("--experience-heading-y");
    heading.style.removeProperty("--experience-heading-opacity");
    routeGroup.replaceChildren();
    gsap.set([world, foregroundWorld, artwork, focusArtwork, travelerPosition, traveler, ...steps, ...steps.map(step => step.querySelector(".experience-process__step-card"))], { clearProps: "all" });
  };
}
