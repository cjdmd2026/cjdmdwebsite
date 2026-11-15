import { solarPosition } from './solar-position.js?v=20261103-01';

export const SUN_PATH_SIZE = Object.freeze({ width: 150, height: 110 });
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

// Cheongju / KST, using the same NOAA/Meeus coordinates as the scene.
// Sunrise/sunset use the standard -0.833° solar-center threshold; the scene's
// geometric light direction is unchanged. https://gml.noaa.gov/grad/solcalc/calcdetails.html
export function createSunPath(date) {
  const at = minutes => solarPosition({ date, minutes });
  function crossing(low, high, difference) {
    const lowSign = Math.sign(difference(low));
    for (let step = 0; step < 36; step += 1) {
      const middle = (low + high) / 2;
      if (Math.sign(difference(middle)) === lowSign) low = middle;
      else high = middle;
    }
    return (low + high) / 2;
  }
  // At this latitude the meridian crossing is always south, between 06 and 18.
  const noon = crossing(360, 1080, minutes => at(minutes).azimuth - 180);
  const sunrise = crossing(0, noon, minutes => at(minutes).elevation + .833);
  const sunset = crossing(noon, 1440, minutes => at(minutes).elevation + .833);
  // Keep the control's geometry fixed across modes and dates. Real event
  // times still determine where the selected minute lies along the dial.
  const startX = 12.5;
  const endX = 137.5;
  const centerX = (startX + endX) / 2;
  const radiusX = (endX - startX) / 2;
  const baseline = 88;
  const points = Array.from({ length: 129 }, (_, index) => {
    const phase = index / 128;
    const minutes = phase <= .5 ? sunrise + (noon - sunrise) * phase * 2
      : noon + (sunset - noon) * (phase - .5) * 2;
    // A circular control, with real event times mapped onto its angle. Directly
    // using elevation for Y and a cosine for X produced a distorted dial.
    return { minutes, x: centerX - radiusX * Math.cos(Math.PI * phase),
      y: baseline - radiusX * Math.sin(Math.PI * phase) };
  });
  const path = `M${startX.toFixed(5)} ${baseline.toFixed(5)} A${radiusX.toFixed(5)} ${radiusX.toFixed(5)} 0 0 1 ${endX.toFixed(5)} ${baseline.toFixed(5)}`;
  const ticks = points.flatMap((point, index) => {
    if (index % 8 !== 0) return [];
    const previous = points[Math.max(0, index - 1)], next = points[Math.min(points.length - 1, index + 1)];
    const dx = next.x - previous.x, dy = next.y - previous.y;
    const length = Math.hypot(dx, dy), nx = dy / length, ny = -dx / length;
    const outer = index % 32 === 0 ? 7 : 6;
    return [`M${(point.x + nx * 4).toFixed(5)} ${(point.y + ny * 4).toFixed(5)} L${(point.x + nx * outer).toFixed(5)} ${(point.y + ny * outer).toFixed(5)}`];
  }).join(' ');
  return { date, sunrise, noon, sunset, points, path, ticks };
}

export const sunMinutesAtProgress = (day, progress) => day.sunrise + clamp(progress) * (day.sunset - day.sunrise);
export const sunProgressAtMinutes = (day, minutes) => clamp((minutes - day.sunrise) / (day.sunset - day.sunrise));

// Permanent short marks around the whole dial, with extra marks and longer
// strokes smoothly concentrated around the handle. No accumulated trail.
export function sunPathTicks(day, minutes) {
  const handle = sunPathPoint(day, minutes);
  const first = day.points[0], last = day.points.at(-1);
  const cx = (first.x + last.x) / 2, cy = first.y;
  const handleAngle = Math.atan2(handle.y - cy, handle.x - cx);
  return day.points.filter((_, index) => index % 4 === 0).map((point, index) => {
    const dx = point.x - cx, dy = point.y - cy;
    const radius = Math.hypot(dx, dy), nx = dx / radius, ny = dy / radius;
    const angle = Math.atan2(dy, dx);
    const difference = angle - handleAngle;
    const distance = Math.abs(Math.atan2(Math.sin(difference), Math.cos(difference)));
    const reach = Math.PI * .14;
    const influence = distance < reach ? (1 + Math.cos(Math.PI * distance / reach)) / 2 : 0;
    const length = (index % 8 === 0 ? 3 : 2) + influence * 4;
    const start = 6, end = start + length;
    return {
      d: `M${(point.x + nx * start).toFixed(5)} ${(point.y + ny * start).toFixed(5)} L${(point.x + nx * end).toFixed(5)} ${(point.y + ny * end).toFixed(5)}`,
      opacity: index % 2 === 0 ? 1 : influence
    };
  });
}

export function sunPathPoint(day, minutes) {
  const points = day.points;
  if (minutes <= day.sunrise) return points[0];
  for (let index = 1; index < points.length; index += 1) {
    const end = points[index], start = points[index - 1];
    if (minutes <= end.minutes) {
      const t = (minutes - start.minutes) / (end.minutes - start.minutes);
      return { minutes, x: start.x + (end.x - start.x) * t, y: start.y + (end.y - start.y) * t };
    }
  }
  return points.at(-1);
}

// Project onto the rendered curve in screen space, so dragging also works on
// a flattened responsive arc. Date input / central content are excluded by UI.
export function sunMinutesAtPoint(day, x, y, scaleX = 1, scaleY = 1) {
  let closest = Infinity, minutes = day.sunrise;
  for (let index = 1; index < day.points.length; index += 1) {
    const start = day.points[index - 1], end = day.points[index];
    const dx = (end.x - start.x) * scaleX, dy = (end.y - start.y) * scaleY;
    const px = (x - start.x) * scaleX, py = (y - start.y) * scaleY;
    const t = clamp((px * dx + py * dy) / (dx * dx + dy * dy));
    const distance = (px - t * dx) ** 2 + (py - t * dy) ** 2;
    if (distance < closest) { closest = distance; minutes = start.minutes + t * (end.minutes - start.minutes); }
  }
  return minutes;
}

// The handle stays on the curve, but pointer input follows its horizontal
// position. A straight left-to-right gesture works at any height in the dial.
export function sunMinutesAtX(day, x) {
  const points = day.points;
  if (x <= points[0].x) return day.sunrise;
  for (let index = 1; index < points.length; index += 1) {
    const end = points[index], start = points[index - 1];
    if (x <= end.x) {
      const t = (x - start.x) / (end.x - start.x);
      return start.minutes + t * (end.minutes - start.minutes);
    }
  }
  return day.sunset;
}
