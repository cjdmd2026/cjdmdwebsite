const SCRAMBLE_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ+-*/';

// 데스크탑 / 모바일 최대 scramble 글자 수
const MAX_SCRAMBLE_LENGTH_DESKTOP = 10;
const MAX_SCRAMBLE_LENGTH_MOBILE = 4;

// 모바일 기준 너비
const MOBILE_BREAKPOINT = 768;

const EXPAND_FRAMES = 6;
const SHRINK_FRAMES = 24;
const SCRAMBLE_INTERVAL_SPEED = 35;

const dDayBox = document.getElementById('dDayText');
const prefixEl = document.getElementById('dPrefix');
const countdownEl = document.getElementById('countdown');

let dDayScrambleInterval = null;
let isScrambling = false;

function getMaxScrambleLength() {
    const isMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;

    return isMobile
        ? MAX_SCRAMBLE_LENGTH_MOBILE
        : MAX_SCRAMBLE_LENGTH_DESKTOP;
}

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

    // 화면 크기에 따라 최대 글자 수 변경
    const maxLength = Math.max(getMaxScrambleLength(), targetLength);

    const totalFrames = EXPAND_FRAMES + SHRINK_FRAMES;

    if (dDayScrambleInterval) {
        clearInterval(dDayScrambleInterval);
    }

    dDayScrambleInterval = setInterval(() => {
        frame++;

        // 1단계: 원래 텍스트에서 랜덤 텍스트로 길어짐
        if (frame <= EXPAND_FRAMES) {
            const progress = frame / EXPAND_FRAMES;

            const currentLength = Math.round(
                targetLength + (maxLength - targetLength) * progress
            );

            renderDdayText(getRandomText(currentLength));
            return;
        }

        // 2단계: 랜덤 텍스트에서 다시 원래 D-day 값으로 줄어듦
        const shrinkFrame = frame - EXPAND_FRAMES;
        const progress = Math.min(shrinkFrame / SHRINK_FRAMES, 1);

        const currentLength = Math.round(
            maxLength - (maxLength - targetLength) * progress
        );

        // 원래 텍스트가 오른쪽부터 서서히 드러남
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