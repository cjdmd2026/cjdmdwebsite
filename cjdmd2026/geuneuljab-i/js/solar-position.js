// NOAA/Meeus solar coordinates. Geometric elevation (no atmospheric refraction).
// https://gml.noaa.gov/grad/solcalc/calcdetails.html
// Reference location: Cheongju weather office, 36°38'N / 127°26'E.
// https://www.weather.go.kr/cheongju/html/info/business01.jsp
export const SOLAR_REFERENCE = Object.freeze({ latitude: 36 + 38 / 60, longitude: 127 + 26 / 60, utcOffset: 9 });

const radians = Math.PI / 180;
const sin = (degrees) => Math.sin(degrees * radians);
const cos = (degrees) => Math.cos(degrees * radians);
const wrap = (value, range) => ((value % range) + range) % range;

export function koreanDate(now = new Date()) {
  return new Date(now.getTime() + 9 * 3600000).toISOString().slice(0, 10);
}

export function validSolarDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value < '2000-01-01' || value > '2100-12-31') return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function solarPosition({ date, minutes, latitude = SOLAR_REFERENCE.latitude, longitude = SOLAR_REFERENCE.longitude, utcOffset = SOLAR_REFERENCE.utcOffset }) {
  if (!validSolarDate(date) || ![minutes, latitude, longitude, utcOffset].every(Number.isFinite)
      || Math.abs(latitude) > 90 || Math.abs(longitude) > 180) throw new RangeError('Invalid solar coordinates or date');
  const instant = Date.parse(`${date}T00:00:00Z`) + (minutes - utcOffset * 60) * 60000;
  const century = (instant / 86400000 + 2440587.5 - 2451545) / 36525;
  const meanLongitude = wrap(280.46646 + century * (36000.76983 + century * .0003032), 360);
  const anomaly = 357.52911 + century * (35999.05029 - .0001537 * century);
  const eccentricity = .016708634 - century * (.000042037 + .0000001267 * century);
  const center = sin(anomaly) * (1.914602 - century * (.004817 + .000014 * century))
    + sin(2 * anomaly) * (.019993 - .000101 * century) + sin(3 * anomaly) * .000289;
  const omega = 125.04 - 1934.136 * century;
  const apparentLongitude = meanLongitude + center - .00569 - .00478 * sin(omega);
  const obliquity = 23 + (26 + (21.448 - century * (46.815 + century * (.00059 - century * .001813))) / 60) / 60
    + .00256 * cos(omega);
  const declination = Math.asin(sin(obliquity) * sin(apparentLongitude)) / radians;
  const y = Math.tan(obliquity * radians / 2) ** 2;
  const equationOfTime = 4 / radians * (y * sin(2 * meanLongitude) - 2 * eccentricity * sin(anomaly)
    + 4 * eccentricity * y * sin(anomaly) * cos(2 * meanLongitude)
    - .5 * y * y * sin(4 * meanLongitude) - 1.25 * eccentricity * eccentricity * sin(2 * anomaly));
  const hourAngle = wrap(minutes + equationOfTime + 4 * longitude - 60 * utcOffset, 1440) / 4 - 180;
  const elevation = Math.asin(Math.max(-1, Math.min(1,
    sin(latitude) * sin(declination) + cos(latitude) * cos(declination) * cos(hourAngle)))) / radians;
  const azimuth = wrap(Math.atan2(sin(hourAngle), cos(hourAngle) * sin(latitude)
    - Math.tan(declination * radians) * cos(latitude)) / radians + 180, 360);
  return { elevation, azimuth, aboveHorizon: elevation > 0 };
}

// Right-handed scene: +X east, +Y up, +Z south. Model orientation is an assumption.
export function solarDirection({ elevation, azimuth }) {
  return { x: cos(elevation) * sin(azimuth), y: sin(elevation), z: -cos(elevation) * cos(azimuth) };
}
