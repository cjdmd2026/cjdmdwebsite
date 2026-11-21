(() => {
    'use strict';

    const currentScript = document.currentScript;
    if (!currentScript?.src || window.EFactAudio) return;

    const siteRoot = new URL('../', currentScript.src);
    const sources = {
        ambience: new URL('images/audio/industrial-ambience.mp3', siteRoot).href,
        click: new URL('images/audio/interface-click.mp3?v=20261120-ui-deep', siteRoot).href,
        whoosh: new URL('images/audio/section-whoosh.mp3', siteRoot).href
    };
    const storageKey = 'efact-sound-muted';
    let muted = false;
    try { muted = localStorage.getItem(storageKey) === 'true'; } catch (_) {}
    let unlocked = false;
    let lastClickAt = 0;
    let lastWhooshAt = 0;
    let whooshIndex = 0;

    const ambience = new Audio(sources.ambience);
    ambience.loop = true;
    ambience.preload = 'auto';
    ambience.volume = .045;

    const playClip = (src, volume, duration, startAt = 0) => {
        if (!unlocked || muted || document.hidden) return null;
        const audio = new Audio(src);
        audio.preload = 'auto';
        audio.volume = volume;
        const begin = () => {
            if (Number.isFinite(audio.duration) && startAt < audio.duration) audio.currentTime = startAt;
            audio.play().catch(() => {});
            window.setTimeout(() => {
                audio.pause();
                audio.removeAttribute('src');
                audio.load();
            }, duration);
        };
        if (audio.readyState >= 1) begin();
        else audio.addEventListener('loadedmetadata', begin, { once: true });
        return audio;
    };

    const startAmbience = () => {
        if (!unlocked || muted || document.hidden || !ambience.paused) return;
        ambience.play().catch(() => {});
    };

    const stopAmbience = () => ambience.pause();

    const playClick = () => {
        const now = performance.now();
        if (now - lastClickAt < 90) return;
        lastClickAt = now;
        playClip(sources.click, .12, 1180);
    };

    const whooshOffsets = [0, 2.15, 4.25, 6.35, 8.15];
    const playWhoosh = () => {
        const now = performance.now();
        if (now - lastWhooshAt < 1100) return;
        lastWhooshAt = now;
        const offset = whooshOffsets[whooshIndex % whooshOffsets.length];
        whooshIndex += 1;
        playClip(sources.whoosh, .095, 900, offset);
    };

    const updateToggle = () => {
        const button = document.getElementById('efact-sound-toggle');
        if (!button) return;
        button.setAttribute('aria-pressed', String(!muted));
        button.setAttribute('aria-label', muted ? '사이트 음향 켜기' : '사이트 음향 끄기');
        button.innerHTML = `<span aria-hidden="true">${muted ? '×' : '◦'}</span>${muted ? 'SOUND OFF' : 'SOUND ON'}`;
    };

    const setMuted = value => {
        muted = Boolean(value);
        try { localStorage.setItem(storageKey, String(muted)); } catch (_) {}
        if (muted) stopAmbience();
        else startAmbience();
        updateToggle();
    };

    const unlock = () => {
        if (unlocked) return;
        unlocked = true;
        startAmbience();
    };

    const makeToggle = () => {
        const style = document.createElement('style');
        style.textContent = `
            #efact-sound-toggle{position:fixed;left:clamp(14px,2vw,32px);bottom:clamp(14px,2vw,28px);z-index:9998;display:flex;align-items:center;gap:8px;min-height:34px;padding:0 12px;border:1px solid rgba(0,194,201,.34);border-radius:999px;background:rgba(1,11,12,.76);color:rgba(224,242,241,.78);font:600 9px/1 Arial,sans-serif;letter-spacing:.14em;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);cursor:pointer;transition:border-color .2s,color .2s,background .2s}
            #efact-sound-toggle:hover,#efact-sound-toggle:focus-visible{border-color:rgba(0,214,220,.8);color:#fff;background:rgba(2,22,24,.9);outline:none}
            #efact-sound-toggle span{display:grid;place-items:center;width:12px;height:12px;color:#00c9d0;font-size:15px;line-height:1}
            .efact-audio-credits{display:grid;grid-template-columns:minmax(90px,.22fr) 1fr;gap:18px 32px;width:100%;margin-top:20px;padding-top:20px;border-top:1px solid rgba(124,177,177,.18);color:rgba(210,226,225,.62);font:400 11px/1.7 Arial,sans-serif;letter-spacing:.015em}
            .efact-audio-credits strong{color:rgba(235,246,245,.82);font-size:10px;letter-spacing:.14em;text-transform:uppercase}
            .efact-audio-credits div{display:flex;flex-wrap:wrap;gap:6px 24px}
            .efact-audio-credits span{white-space:normal}
            footer:not(.ef-footer)>.efact-audio-credits{box-sizing:border-box;max-width:1440px;margin:22px auto 0;padding:20px clamp(20px,5vw,80px) 0}
            @media(max-width:640px){#efact-sound-toggle{min-height:30px;padding:0 10px;font-size:8px}}
            @media(max-width:640px){.efact-audio-credits{grid-template-columns:1fr;gap:8px}.efact-audio-credits div{display:grid;gap:5px}}
        `;
        document.head.append(style);
        const button = document.createElement('button');
        button.type = 'button';
        button.id = 'efact-sound-toggle';
        button.addEventListener('pointerdown', event => event.stopPropagation());
        button.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();
            unlock();
            setMuted(!muted);
        });
        document.body.append(button);
        updateToggle();
    };

    const makeAudioCredits = () => {
        const footer = document.querySelector('footer');
        if (!footer || footer.querySelector('.efact-audio-credits')) return;
        const credits = document.createElement('div');
        credits.className = 'efact-audio-credits';
        credits.setAttribute('aria-label', '사용 음원');
        credits.innerHTML = `
            <strong>Audio credits</strong>
            <div>
                <span>alex_jauk — Industrial Machinery Ambience · 배경 환경음</span>
                <span>SoundShelfStudio — UI Click Deep · 인터페이스 클릭음</span>
                <span>Basic Whooshes V2 · 섹션 전환음</span>
            </div>
        `;
        const sourceArea = footer.querySelector('.ef-footer-sources');
        (sourceArea || footer).append(credits);
    };

    const interactiveSelector = 'a,button,[role="button"],summary,select,input[type="button"],input[type="submit"]';
    document.addEventListener('pointerdown', event => {
        if (!(event.target instanceof Element)) return;
        const target = event.target.closest(interactiveSelector);
        if (!target || target.id === 'efact-sound-toggle' || target.matches('[disabled],[aria-disabled="true"]')) return;
        unlock();
        playClick();
    }, { passive: true });
    document.addEventListener('keydown', event => {
        unlock();
        if ((event.key === 'Enter' || event.key === ' ') && event.target instanceof Element && event.target.closest(interactiveSelector)) playClick();
    });
    document.addEventListener('pointerdown', unlock, { once: true, passive: true });

    const observeSections = () => {
        const candidates = [...document.querySelectorAll('main > section, main > article, .hero-scroll, .hero-section')]
            .filter(section => section.getBoundingClientRect().height > 240);
        if (!('IntersectionObserver' in window) || candidates.length < 2) return;
        const seen = new WeakSet([candidates[0]]);
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting || seen.has(entry.target)) return;
                seen.add(entry.target);
                playWhoosh();
            });
        }, { threshold: .42, rootMargin: '-8% 0px -8% 0px' });
        candidates.slice(1).forEach(section => observer.observe(section));
    };

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopAmbience();
        else startAmbience();
    });
    window.addEventListener('pagehide', stopAmbience);

    window.EFactAudio = {
        playClick,
        playWhoosh,
        isMuted: () => muted,
        setMuted
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            makeToggle();
            makeAudioCredits();
            observeSections();
        }, { once: true });
    } else {
        makeToggle();
        makeAudioCredits();
        observeSections();
    }
})();
