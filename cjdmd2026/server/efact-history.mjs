import { createR2Storage, r2Configuration, StorageConflictError } from './r2.mjs';
import { facilities, timestamp, day } from './efact-data.mjs';

// A bounded object per facility preserves observations across serverless instances.
// Conditional writes merge simultaneous polls without overwriting another sample.
export function createEfactHistory({ storage = null, now = Date.now } = {}) {
  const memory = new Map();
  const key = id => {
    if (!facilities.some(facility => facility.id === id)) throw new Error('Unknown facility');
    return `efact/history/${id}.json`;
  };
  async function get(id) {
    const path = key(id);
    if (!storage) return { outlets: memory.get(path) ?? {} };
    const stored = await storage.get(path);
    return stored ? { outlets: (await new Response(stored.stream).json()).outlets ?? {}, etag: stored.blob.etag } : { outlets: {} };
  }
  return {
    mode: storage ? 'persistent' : 'memory',
    async record(data) {
      if (data.status !== 'ok') return;
      await Promise.all(data.facilities.filter(facility => facility.outlets.length).map(async facility => {
        for (let attempt = 0; attempt < 4; attempt++) {
          const previous = await get(facility.id), merged = new Map(Object.entries(previous.outlets));
          for (const outlet of facility.outlets) {
            const time = timestamp(outlet.measuredAt);
            if (time === null || time <= now() - 2 * day || time > now()) continue;
            const points = new Map((merged.get(outlet.code) ?? []).map(point => [point.time, point]));
            points.set(time, { time, label: outlet.measuredAt, metrics: outlet.metrics });
            merged.set(outlet.code, [...points.values()]);
          }
          const outlets = Object.fromEntries([...merged].map(([code, points]) => [code,
            points.filter(point => point.time > now() - 2 * day && point.time <= now()).sort((a, b) => a.time - b.time),
          ]).filter(([, points]) => points.length));
          if (!storage) { memory.set(key(facility.id), outlets); return; }
          try {
            await storage.writeJson(key(facility.id), { outlets }, { ifMatch: previous.etag });
            return;
          } catch (error) { if (!(error instanceof StorageConflictError) || attempt === 3) throw error; }
        }
      }));
    },
    async read(id) {
      const end = now(), previous = await get(id);
      const outlets = Object.fromEntries(Object.entries(previous.outlets).map(([code, points]) => [code,
        points.filter(point => point.time > end - day && point.time <= end),
      ]).filter(([, points]) => points.length));
      return { status: 'ok', outlets, end, source: 'CleanSYS', mode: 'collected', storage: this.mode };
    },
  };
}

export function configuredEfactHistory(env = process.env) {
  const config = r2Configuration(env);
  return createEfactHistory({ storage: config.missing.length ? null : createR2Storage({ config }) });
}
