const SCRAMBLE_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ+-*/';

const MAX_SCRAMBLE_LENGTH = 10;
const EXPAND_FRAMES = 6;
const SHRINK_FRAMES = 24;
const SCRAMBLE_INTERVAL_SPEED = 35;

const dDayBox = document.getElementById('dDayText');
const prefixEl = document.getElementById('dPrefix');
const countdownEl = document.getElementById('countdown');

let dDayScrambleInterval = null;
let isScrambling = false;

function getRandomText(length) {
    let result = '';

    for (let i = 0; i < length; i++) {
        result += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    }

    return result;
}

function renderDdayText(text) {
    prefixEl.textContent = text.slice(0, 2);
    countdownEl.textContent = text.slice(2);
}

function runDdayScramble() {
    if (isScrambling) return;

    isScrambling = true;
    let frame = 0;

    // 현재 countdown 값 기준으로 최종 텍스트 저장
    const targetText = `D-${countdownEl.textContent}`;
    const targetLength = targetText.length;
    const maxLength = Math.max(MAX_SCRAMBLE_LENGTH, targetLength);
    const totalFrames = EXPAND_FRAMES + SHRINK_FRAMES;

    if (dDayScrambleInterval) {
        clearInterval(dDayScrambleInterval);
    }

    dDayScrambleInterval = setInterval(() => {
        frame++;

        // 1단계: 텍스트가 10글자까지 늘어남
        if (frame <= EXPAND_FRAMES) {
            const progress = frame / EXPAND_FRAMES;

            const currentLength = Math.round(
                targetLength + (maxLength - targetLength) * progress
            );

            renderDdayText(getRandomText(currentLength));
            return;
        }

        // 2단계: 다시 원래 D-day 값으로 줄어듦
        const shrinkFrame = frame - EXPAND_FRAMES;
        const progress = Math.min(shrinkFrame / SHRINK_FRAMES, 1);

        const currentLength = Math.round(
            maxLength - (maxLength - targetLength) * progress
        );

        const revealedCount = Math.floor(targetLength * progress);
        const revealedText = targetText.slice(targetLength - revealedCount);

        const randomLength = Math.max(currentLength - revealedText.length, 0);
        const randomText = getRandomText(randomLength);

        renderDdayText(randomText + revealedText);

        if (frame >= totalFrames) {
            clearInterval(dDayScrambleInterval);
            renderDdayText(targetText);
            isScrambling = false;
        }
    }, SCRAMBLE_INTERVAL_SPEED);
}
// 페이지 입장 시 실행
window.addEventListener('load', () => {
    setTimeout(() => {
        runDdayScramble();
    }, 0);
});

// opacity 변화 시 실행
dDayBox.addEventListener('transitionstart', (event) => {
    if (event.propertyName === 'opacity') {
        runDdayScramble();
    }
});