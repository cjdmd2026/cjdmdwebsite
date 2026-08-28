(() => {
    const SELECTOR = '[typing-effect]';

    const CHARS =
        'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ';

    function randomChar() {
        return CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    function getTextNodes(el) {
        const nodes = [];
        const walker = document.createTreeWalker(
            el,
            NodeFilter.SHOW_TEXT
        );

        let node;

        while ((node = walker.nextNode())) {
            nodes.push({
                node,
                original: node.textContent
            });
        }

        return nodes;
    }

    function getCharacterCount(nodes) {
        let count = 0;

        nodes.forEach(item => {
            for (const char of item.original) {
                if (!/\s/.test(char)) count++;
            }
        });

        return count;
    }

    function playTypingEffect(el) {
        if (el.dataset.typingRunning === 'true') return;

        const speed =
            Number(el.getAttribute('typing-speed')) || 35;

        const frames =
            Number(el.getAttribute('typing-frames')) || 24;

        const reveal =
            el.getAttribute('typing-reveal') || 'right';

        const nodes = getTextNodes(el);
        const totalCharacters = getCharacterCount(nodes);

        el.dataset.typingRunning = 'true';

        let frame = 0;

        const interval = setInterval(() => {
            frame++;

            const progress = Math.min(frame / frames, 1);

            const revealedCount = Math.floor(
                totalCharacters * progress
            );

            let globalIndex = 0;

            nodes.forEach(item => {
                let output = '';

                for (const char of item.original) {

                    /* 공백, 줄바꿈 유지 */
                    if (/\s/.test(char)) {
                        output += char;
                        continue;
                    }

                    let revealed;

                    if (reveal === 'left') {
                        revealed =
                            globalIndex < revealedCount;
                    } else {
                        revealed =
                            globalIndex >=
                            totalCharacters - revealedCount;
                    }

                    output += revealed
                        ? char
                        : randomChar();

                    globalIndex++;
                }

                item.node.textContent = output;
            });

            if (progress >= 1) {
                clearInterval(interval);

                nodes.forEach(item => {
                    item.node.textContent = item.original;
                });

                el.dataset.typingRunning = 'false';
            }

        }, speed);
    }

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                playTypingEffect(entry.target);
            });
        },
        {
            threshold: 0.2
        }
    );

    document
        .querySelectorAll(SELECTOR)
        .forEach(el => {
            observer.observe(el);
        });

})();