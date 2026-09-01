/*
 * canvas-mirror-slider.js
 *
 * 사용법:
 *
 * <section class="designer-slider" canvas-mirror-slider>
 *   <div class="designer-track">
 *     <a class="designer-card" canvas-mirror-card>...</a>
 *     <a class="designer-card" canvas-mirror-card>...</a>
 *   </div>
 * </section>
 *
 * 기존 카드는 그대로 유지하고,
 * Canvas는 카드 아래 반사만 그립니다.
 *
 * 정지 상태에서는 requestAnimationFrame을 계속 실행하지 않습니다.
 */

(() => {
    const ROOT_SELECTOR = '[canvas-mirror-slider]';
    const CARD_SELECTOR = '[canvas-mirror-card]';

    class CanvasMirrorSlider {
        constructor(root) {
            this.root = root;
            this.cards = [...root.querySelectorAll(CARD_SELECTOR)];

            if (!this.cards.length) return;

            this.track =
                root.querySelector('.designer-track') ||
                this.cards[0].parentElement;

            this.dpr = Math.min(
                window.devicePixelRatio || 1,
                Number(root.dataset.maxDpr || 1.5)
            );

            this.reflectionOpacity = Number(
                root.dataset.reflectionOpacity || 0.34
            );

            this.reflectionHeight = Number(
                root.dataset.reflectionHeight || 0.42
            );

            this.reflectionBlur = Number(
                root.dataset.reflectionBlur || 1.1
            );

            this.reflectionGap = Number(
                root.dataset.reflectionGap || 2
            );

            this.imageCache = new Map();

            this.rafId = null;

            this.setup();
            this.bindEvents();

            this.preloadImages().then(() => {
                this.requestDraw();
            });
        }

        setup() {
            const rootStyle = getComputedStyle(this.root);

            if (rootStyle.position === 'static') {
                this.root.style.position = 'relative';
            }

            /*
             * 반사가 카드 아래에 보일 공간 확보
             */
            this.updateReflectionSpace();

            /*
             * 반사용 Canvas
             */
            this.canvas = document.createElement('canvas');

            this.canvas.className = 'canvas-mirror-reflection';

            this.canvas.setAttribute('aria-hidden', 'true');

            Object.assign(this.canvas.style, {
                position: 'absolute',
                left: '0',
                top: '0',
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: '0'
            });

            this.root.prepend(this.canvas);

            this.ctx = this.canvas.getContext('2d', {
                alpha: true
            });

            /*
             * 기존 카드가 Canvas보다 위에 오도록 설정
             *
             * visibility / display / opacity는 건드리지 않음.
             */
            this.cards.forEach(card => {
                const style = getComputedStyle(card);

                if (style.position === 'static') {
                    card.style.position = 'relative';
                }

                if (style.zIndex === 'auto') {
                    card.style.zIndex = '1';
                }
            });
        }

        updateReflectionSpace() {
            let maxCardHeight = 0;

            this.cards.forEach(card => {
                const rect = card.getBoundingClientRect();

                maxCardHeight = Math.max(
                    maxCardHeight,
                    rect.height
                );
            });

            if (!maxCardHeight) return;

            const reflectionSpace =
                maxCardHeight * this.reflectionHeight +
                this.reflectionGap +
                8;

            const currentPaddingBottom =
                parseFloat(
                    getComputedStyle(this.root).paddingBottom
                ) || 0;

            if (currentPaddingBottom < reflectionSpace) {
                this.root.style.paddingBottom =
                    `${reflectionSpace}px`;
            }
        }

        bindEvents() {
            this.handleScroll = () => {
                this.requestDraw();
            };

            this.handleResize = () => {
                this.updateReflectionSpace();
                this.requestDraw();
            };

            /*
             * 실제 스크롤 영역이 어디든 대응
             */
            this.root.addEventListener(
                'scroll',
                this.handleScroll,
                {
                    passive: true
                }
            );

            if (
                this.track &&
                this.track !== this.root
            ) {
                this.track.addEventListener(
                    'scroll',
                    this.handleScroll,
                    {
                        passive: true
                    }
                );
            }

            window.addEventListener(
                'resize',
                this.handleResize,
                {
                    passive: true
                }
            );

            /*
             * 크기 변경 감지
             */
            this.resizeObserver =
                new ResizeObserver(() => {
                    this.handleResize();
                });

            this.resizeObserver.observe(
                this.root
            );

            this.cards.forEach(card => {
                this.resizeObserver.observe(card);
            });

            /*
             * hover scale / transition 등이 끝나면
             * 반사 위치 다시 계산
             */
            this.root.addEventListener(
                'transitionrun',
                this.handleScroll,
                true
            );

            this.root.addEventListener(
                'transitionend',
                this.handleScroll,
                true
            );
        }

        requestDraw() {
            /*
             * 이미 렌더링 예약되어 있으면
             * 중복 requestAnimationFrame 방지
             */
            if (this.rafId !== null) {
                return;
            }

            this.rafId = requestAnimationFrame(
                () => {
                    this.rafId = null;

                    this.draw();
                }
            );
        }

        resizeCanvas() {
            const rect =
                this.root.getBoundingClientRect();

            this.width =
                Math.max(1, rect.width);

            this.height =
                Math.max(1, rect.height);

            const pixelWidth =
                Math.round(
                    this.width *
                    this.dpr
                );

            const pixelHeight =
                Math.round(
                    this.height *
                    this.dpr
                );

            if (
                this.canvas.width !== pixelWidth ||
                this.canvas.height !== pixelHeight
            ) {
                this.canvas.width =
                    pixelWidth;

                this.canvas.height =
                    pixelHeight;
            }

            this.ctx.setTransform(
                this.dpr,
                0,
                0,
                this.dpr,
                0,
                0
            );
        }

        getImageTarget(card) {
            return (
                card.querySelector(
                    '.designer-card__image-wrap'
                ) ||
                card.querySelector('img') ||
                card
            );
        }

        getImageUrl(card) {
            const target =
                this.getImageTarget(card);

            /*
             * img 태그인 경우
             */
            if (
                target instanceof
                HTMLImageElement
            ) {
                return (
                    target.currentSrc ||
                    target.src ||
                    ''
                );
            }

            /*
             * background-image인 경우
             */
            const style =
                getComputedStyle(target);

            let backgroundImage =
                style.backgroundImage;

            /*
             * CSS variable 방식 대응
             *
             * --designer-card-image
             */
            if (
                !backgroundImage ||
                backgroundImage === 'none'
            ) {
                backgroundImage =
                    style.getPropertyValue(
                        '--designer-card-image'
                    ) ||
                    target.style.getPropertyValue(
                        '--designer-card-image'
                    ) ||
                    '';
            }

            const match =
                String(backgroundImage)
                    .match(
                        /url\((['"]?)(.*?)\1\)/
                    );

            return match
                ? match[2]
                : '';
        }

        loadImage(url) {
            if (!url) {
                return Promise.resolve(null);
            }

            if (
                this.imageCache.has(url)
            ) {
                return this.imageCache.get(
                    url
                );
            }

            const promise =
                new Promise(resolve => {
                    const image =
                        new Image();

                    image.decoding =
                        'async';

                    image.onload =
                        () => {
                            resolve(image);
                        };

                    image.onerror =
                        () => {
                            resolve(null);
                        };

                    image.src = url;
                });

            this.imageCache.set(
                url,
                promise
            );

            return promise;
        }

        preloadImages() {
            return Promise.all(
                this.cards.map(card => {
                    const url =
                        this.getImageUrl(card);

                    return this.loadImage(url);
                })
            );
        }

        drawImageCover(
            ctx,
            image,
            x,
            y,
            width,
            height
        ) {
            const imageWidth =
                image.naturalWidth ||
                image.width;

            const imageHeight =
                image.naturalHeight ||
                image.height;

            const imageRatio =
                imageWidth /
                imageHeight;

            const boxRatio =
                width /
                height;

            let sx = 0;
            let sy = 0;
            let sw = imageWidth;
            let sh = imageHeight;

            if (
                imageRatio >
                boxRatio
            ) {
                sw =
                    imageHeight *
                    boxRatio;

                sx =
                    (
                        imageWidth -
                        sw
                    ) / 2;
            } else {
                sh =
                    imageWidth /
                    boxRatio;

                sy =
                    (
                        imageHeight -
                        sh
                    ) / 2;
            }

            ctx.drawImage(
                image,

                sx,
                sy,
                sw,
                sh,

                x,
                y,
                width,
                height
            );
        }

        roundRect(
            ctx,
            x,
            y,
            width,
            height,
            radius
        ) {
            radius =
                Math.min(
                    radius,
                    width / 2,
                    height / 2
                );

            ctx.beginPath();

            ctx.moveTo(
                x + radius,
                y
            );

            ctx.arcTo(
                x + width,
                y,
                x + width,
                y + height,
                radius
            );

            ctx.arcTo(
                x + width,
                y + height,
                x,
                y + height,
                radius
            );

            ctx.arcTo(
                x,
                y + height,
                x,
                y,
                radius
            );

            ctx.arcTo(
                x,
                y,
                x + width,
                y,
                radius
            );

            ctx.closePath();
        }

        async makeCardSnapshot(
            card,
            width,
            height
        ) {
            const canvas =
                document.createElement(
                    'canvas'
                );

            canvas.width =
                Math.max(
                    1,
                    Math.round(
                        width *
                        this.dpr
                    )
                );

            canvas.height =
                Math.max(
                    1,
                    Math.round(
                        height *
                        this.dpr
                    )
                );

            const ctx =
                canvas.getContext(
                    '2d',
                    {
                        alpha: true
                    }
                );

            ctx.setTransform(
                this.dpr,
                0,
                0,
                this.dpr,
                0,
                0
            );

            const cardStyle =
                getComputedStyle(card);

            const radius =
                parseFloat(
                    cardStyle.borderRadius
                ) || 0;

            ctx.save();

            this.roundRect(
                ctx,
                0,
                0,
                width,
                height,
                radius
            );

            ctx.clip();

            /*
             * 카드 이미지
             */
            const image =
                await this.loadImage(
                    this.getImageUrl(card)
                );

            if (image) {
                this.drawImageCover(
                    ctx,
                    image,
                    0,
                    0,
                    width,
                    height
                );
            }

            /*
             * 카드 하단 그라디언트
             */
            const gradient =
                ctx.createLinearGradient(
                    0,
                    height * 0.45,
                    0,
                    height
                );

            gradient.addColorStop(
                0,
                'rgba(0,0,0,0)'
            );

            gradient.addColorStop(
                1,
                'rgba(0,0,0,0.72)'
            );

            ctx.fillStyle =
                gradient;

            ctx.fillRect(
                0,
                0,
                width,
                height
            );

            /*
             * 이름
             */
            const nameKo =
                card.querySelector(
                    '.designer-card__name-ko'
                );

            const nameEn =
                card.querySelector(
                    '.designer-card__name-en'
                );

            const textBox =
                card.querySelector(
                    '.designer-card__text'
                );

            let left = 18;
            let bottom = 18;

            if (textBox) {
                const textRect =
                    textBox.getBoundingClientRect();

                const cardRect =
                    card.getBoundingClientRect();

                left =
                    textRect.left -
                    cardRect.left;
            }

            if (nameEn) {
                const style =
                    getComputedStyle(
                        nameEn
                    );

                const fontSize =
                    parseFloat(
                        style.fontSize
                    ) || 12;

                ctx.font =
                    `${style.fontWeight || 400} ` +
                    `${fontSize}px ` +
                    `${style.fontFamily || 'sans-serif'}`;

                ctx.fillStyle =
                    style.color ||
                    'rgba(255,255,255,.6)';

                ctx.textBaseline =
                    'alphabetic';

                ctx.fillText(
                    nameEn.textContent.trim(),
                    left,
                    height - bottom
                );

                bottom +=
                    fontSize + 8;
            }

            if (nameKo) {
                const style =
                    getComputedStyle(
                        nameKo
                    );

                const fontSize =
                    parseFloat(
                        style.fontSize
                    ) || 24;

                ctx.font =
                    `${style.fontWeight || 700} ` +
                    `${fontSize}px ` +
                    `${style.fontFamily || 'sans-serif'}`;

                ctx.fillStyle =
                    style.color ||
                    '#fff';

                ctx.textBaseline =
                    'alphabetic';

                ctx.fillText(
                    nameKo.textContent.trim(),
                    left,
                    height - bottom
                );
            }

            ctx.restore();

            return canvas;
        }

        async draw() {
            this.resizeCanvas();

            const ctx =
                this.ctx;

            const rootRect =
                this.root.getBoundingClientRect();

            /*
             * 이전 반사 제거
             */
            ctx.clearRect(
                0,
                0,
                this.width,
                this.height
            );

            const visibleCards = [];

            /*
             * 화면 안에 있는 카드만 찾음
             */
            for (
                const card
                of this.cards
            ) {
                const style =
                    getComputedStyle(card);

                if (
                    style.display === 'none' ||
                    style.visibility === 'hidden'
                ) {
                    continue;
                }

                const rect =
                    card.getBoundingClientRect();

                if (
                    !rect.width ||
                    !rect.height
                ) {
                    continue;
                }

                const x =
                    rect.left -
                    rootRect.left;

                const y =
                    rect.top -
                    rootRect.top;

                /*
                 * 화면 밖 카드는 렌더링 안 함
                 */
                if (
                    x > this.width ||
                    x + rect.width < 0
                ) {
                    continue;
                }

                visibleCards.push({
                    card,
                    x,
                    y,
                    width:
                        rect.width,
                    height:
                        rect.height
                });
            }

            /*
             * 보이는 카드만 반사 렌더링
             */
            for (
                const item
                of visibleCards
            ) {
                const {
                    card,
                    x,
                    y,
                    width,
                    height
                } = item;

                const floorY =
                    y +
                    height;

                const reflectionHeight =
                    height *
                    this.reflectionHeight;

                /*
                 * 카드 snapshot
                 */
                const snapshot =
                    await this.makeCardSnapshot(
                        card,
                        width,
                        height
                    );

                /*
                 * 반사 전용 buffer
                 */
                const reflection =
                    document.createElement(
                        'canvas'
                    );

                reflection.width =
                    Math.max(
                        1,
                        Math.round(
                            width *
                            this.dpr
                        )
                    );

                reflection.height =
                    Math.max(
                        1,
                        Math.round(
                            reflectionHeight *
                            this.dpr
                        )
                    );

                const reflectionCtx =
                    reflection.getContext(
                        '2d',
                        {
                            alpha: true
                        }
                    );

                reflectionCtx.setTransform(
                    this.dpr,
                    0,
                    0,
                    this.dpr,
                    0,
                    0
                );

                /*
                 * 카드 뒤집기
                 */
                reflectionCtx.save();

                reflectionCtx.translate(
                    0,
                    height
                );

                reflectionCtx.scale(
                    1,
                    -1
                );

                reflectionCtx.drawImage(
                    snapshot,
                    0,
                    0,
                    width,
                    height
                );

                reflectionCtx.restore();

                /*
                 * 아래로 갈수록 투명해지는 mask
                 */
                reflectionCtx.globalCompositeOperation =
                    'destination-in';

                const fade =
                    reflectionCtx.createLinearGradient(
                        0,
                        0,
                        0,
                        reflectionHeight
                    );

                fade.addColorStop(
                    0,
                    'rgba(0,0,0,.72)'
                );

                fade.addColorStop(
                    0.18,
                    'rgba(0,0,0,.48)'
                );

                fade.addColorStop(
                    0.42,
                    'rgba(0,0,0,.19)'
                );

                fade.addColorStop(
                    0.7,
                    'rgba(0,0,0,.055)'
                );

                fade.addColorStop(
                    1,
                    'rgba(0,0,0,0)'
                );

                reflectionCtx.fillStyle =
                    fade;

                reflectionCtx.fillRect(
                    0,
                    0,
                    width,
                    reflectionHeight
                );

                /*
                 * 메인 Canvas에 반사 출력
                 */
                ctx.save();

                ctx.globalAlpha =
                    this.reflectionOpacity;

                ctx.filter =
                    `blur(${this.reflectionBlur}px)`;

                const cardRadius =
                    parseFloat(
                        getComputedStyle(card).borderRadius
                    ) || 0;

                ctx.save();

                ctx.beginPath();

                ctx.moveTo(
                    x + cardRadius,
                    floorY + this.reflectionGap
                );

                ctx.lineTo(
                    x + width - cardRadius,
                    floorY + this.reflectionGap
                );

                ctx.quadraticCurveTo(
                    x + width,
                    floorY + this.reflectionGap,
                    x + width,
                    floorY + this.reflectionGap + cardRadius
                );

                ctx.lineTo(
                    x + width,
                    floorY + this.reflectionGap + reflectionHeight
                );

                ctx.lineTo(
                    x,
                    floorY + this.reflectionGap + reflectionHeight
                );

                ctx.lineTo(
                    x,
                    floorY + this.reflectionGap + cardRadius
                );

                ctx.quadraticCurveTo(
                    x,
                    floorY + this.reflectionGap,
                    x + cardRadius,
                    floorY + this.reflectionGap
                );

                ctx.closePath();
                ctx.clip();

                ctx.drawImage(
                    reflection,

                    0,
                    0,
                    reflection.width,
                    reflection.height,

                    x,
                    floorY + this.reflectionGap,

                    width,
                    reflectionHeight
                );

                ctx.restore();

                ctx.restore();
            }
        }
    }

    function init() {
        document
            .querySelectorAll(
                ROOT_SELECTOR
            )
            .forEach(root => {
                if (
                    root.__canvasMirrorSlider
                ) {
                    return;
                }

                root.__canvasMirrorSlider =
                    new CanvasMirrorSlider(
                        root
                    );
            });
    }

    if (
        document.readyState ===
        'loading'
    ) {
        document.addEventListener(
            'DOMContentLoaded',
            init,
            {
                once: true
            }
        );
    } else {
        init();
    }

    window.CanvasMirrorSlider =
        CanvasMirrorSlider;
})();