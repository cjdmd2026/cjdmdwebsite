const goalDate = new Date("2026-11-01T00:00:00+09:00").getTime();

function calcDate() {
    const now = new Date().getTime();
    const timeLeft = goalDate - now;

    if (timeLeft <= 0) {
        return { days: 0 };
    }

    const days = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

    return { days };
}

function updateCountdown() {
    const countdown = document.getElementById("countdown");

    if (!countdown) return;

    countdown.innerText = calcDate().days;
}

updateCountdown();
setInterval(updateCountdown, 1000);