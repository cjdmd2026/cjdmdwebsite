export class SharedResources {
    entries = new Map();
    acquire(key, make) {
        let entry = this.entries.get(key);
        if (!entry) {
            entry = {
                value: make(),
                users: 0
            };
            this.entries.set(key, entry);
        }
        entry.users++;
        return entry.value;
    }
    release(key) {
        const entry = this.entries.get(key);
        if (!entry || --entry.users > 0) return;
        this.entries.delete(key);
        entry.value.dispose();
    }
}
const byRenderer = new WeakMap();
export function sharedResources(renderer) {
    let shared = byRenderer.get(renderer);
    if (!shared) {
        shared = new SharedResources();
        byRenderer.set(renderer, shared);
    }
    return shared;
}


//# sourceURL=shared.ts