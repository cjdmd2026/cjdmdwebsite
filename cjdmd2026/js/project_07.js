/* Project slide variant: independent square-pixel cover/reveal (Codrops-inspired variant).
 * Replace the existing project controller script with this file (use defer).
 * Required existing files: project-data.js and assets/images/project/test/icon/*.svg.
 * CSS and overlay markup are inserted automatically. No HTML body or CSS edits.
 */
(() => {
  "use strict";
  function initialize() {
    if (window.ProjectFluidSlide) {
      console.warn("[ProjectWave] A project controller is already loaded. Use one variant at a time.");
      return;
    }
    const iconBaseUrl = new URL(
      window.PROJECT_WAVE_OPTIONS?.iconBaseUrl || "../assets/images/project/test/icon/",
      document.baseURI
    );
    const waveStyle = document.createElement("style");
    waveStyle.dataset.projectWaveStyle = "";
    waveStyle.textContent = `
.project-wave {
  position: fixed; z-index: 999; overflow: hidden;
  visibility: hidden; pointer-events: none;
}
.project-wave.is-active { visibility: visible; pointer-events: auto; }
.project-pixel canvas { display: block; width: 100%; height: 100%; }
html.project-wave-running #slideview .card,
html.project-wave-running .project-info { transition: none !important; }
html[data-project-fluid-view="slide"].project-wave-text-pending :is(
  .project-dial-title, .project-info, .title-section .project-title, .desktop-slide-description
) { visibility: hidden !important; opacity: 0 !important; animation: none !important; }
html[data-project-fluid-view="slide"].project-wave-text-enter :is(
  .project-dial-item.is-active .project-dial-title, .project-info,
  .title-section .project-title, .desktop-slide-description
) {
  visibility: visible !important;
  animation: project-wave-copy-in 520ms ease-out both !important;
}
html[data-project-fluid-view="slide"].project-wave-text-enter .project-info {
  animation-delay: 100ms !important;
}
html[data-project-fluid-view="slide"].project-wave-text-exit :is(
  .project-dial-item.is-active .project-dial-title, .project-info,
  .title-section .project-title, .desktop-slide-description
) {
  visibility: visible !important;
  animation: project-wave-copy-out 520ms ease-in reverse both !important;
}
@keyframes project-wave-copy-out {
  from { opacity: 0; transform: translateX(var(--project-wave-copy-offset, 14px)); clip-path: inset(0 100% 0 0); }
  to { opacity: 1; transform: translateX(0); clip-path: inset(0 0 0 0); }
}
@keyframes project-wave-copy-in {
  from { opacity: 0; transform: translateX(var(--project-wave-copy-offset, 14px)); clip-path: inset(0 100% 0 0); }
  to { opacity: 1; transform: translateX(0); clip-path: inset(0 0 0 0); }
}
@media (prefers-reduced-motion: reduce) {
  html.project-wave-text-enter :is(.project-dial-title, .project-info,
    .title-section .project-title, .desktop-slide-description) {
    animation: none !important; opacity: 1 !important; transform: none !important; clip-path: none !important;
  }
}
`;
    waveStyle.textContent += `
html[data-project-fluid-view="slide"].project-pixel-content-ready :is(
  .project-dial-item.is-active .project-dial-title, .project-info,
  .title-section .project-title, .desktop-slide-description
) { animation:none !important; transform:none !important; clip-path:none !important; opacity:1 !important; }
`;
    document.head.append(waveStyle);

/* Build input for project-pixel-transition.js. Not an additional browser include. */
/* Horizontal SVG blinds, independently adapted from the Codrops reference.
 * https://tympanus.net/Tutorials/SVGMaskScrollTransition/
 * Build input only; deploy project_06.js.
 */
/* Independent square-pixel cover/reveal, inspired by Codrops.
 * https://tympanus.net/Development/PixelTransition/
 * Build input only; deploy project_07.js.
 */
(() => {
  'use strict';
  const options={durationMs:1120,contentDurationMs:1760,scatterDurationMs:480,cellSize:144,color:"#ffffff",...window.PROJECT_PIXEL_OPTIONS};
  const iconSources=[{"file":"team-01-apuchika.svg","src":"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20id%3D%22team-01-apuchika%22%20viewBox%3D%22-14%20-14%20268%20268%22%20role%3D%22img%22%20aria-labelledby%3D%22team-01-apuchika-title%22%3E%3Ctitle%20id%3D%22team-01-apuchika-title%22%3EApuchika%20animated%20icon%3C%2Ftitle%3E%3Cstyle%3E%0A%20%20%20%20%23team-01-apuchika%20.icon-layer%20%7B%0A%20%20%20%20%20%20transform-box%3A%20view-box%3B%0A%20%20%20%20%20%20transform-origin%3A%20120px%20120px%3B%0A%20%20%20%20%20%20animation%3A%20team-01-apuchika-enter%20700ms%20cubic-bezier(.22%2C%201%2C%20.36%2C%201)%20both%3B%0A%20%20%20%20%7D%0A%20%20%20%20%23team-01-apuchika%20.layer-1%20%7B%20animation-delay%3A%20120ms%3B%20%7D%0A%20%20%20%20%23team-01-apuchika%20.layer-2%20%7B%20animation-delay%3A%20500ms%3B%20%7D%0A%20%20%20%20%23team-01-apuchika%20.layer-3%20%7B%20animation-delay%3A%20880ms%3B%20%7D%0A%20%20%20%20%40keyframes%20team-01-apuchika-enter%20%7B%0A%20%20%20%20%20%200%25%20%7B%20transform%3A%20scale(0)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2050%25%20%7B%20transform%3A%20scale(1.11)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2070%25%20%7B%20transform%3A%20scale(.96)%3B%20animation-timing-function%3A%20ease-out%3B%20%7D%0A%20%20%20%20%20%20100%25%20%7B%20transform%3A%20scale(1)%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20%40media%20(prefers-reduced-motion%3A%20reduce)%20%7B%0A%20%20%20%20%20%20%23team-01-apuchika%20.icon-layer%20%7B%20animation%3A%20none%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%3C%2Fstyle%3E%3Cg%20id%3D%22team-01-apuchika-layer-1%22%20class%3D%22icon-layer%20layer-1%22%3E%3Cpath%20d%3D%22M133.33%2C106.67V0h106.67v40h-66.67v26.67h66.67v40h-106.67ZM133.33%2C240v-106.67h106.67v40h-66.67v26.67h66.67v40h-106.67ZM106.67%2C0v106.67H0v-40h66.67v-26.67H0V0h106.67ZM106.67%2C133.33v106.67H0v-40h66.67v-26.67H0v-40h106.67Z%22%20fill%3D%22%23ffce07%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cg%20id%3D%22team-01-apuchika-layer-2%22%20class%3D%22icon-layer%20layer-2%22%3E%3Cpath%20d%3D%22M159.57%2C62.27v-24.19l17.3-17.3h24.19l17.3%2C17.3v24.19l-17.3%2C17.3h-24.19l-17.3-17.3ZM176.87%2C217.86l-17.3-17.3v-24.19l17.3-17.3h24.19l17.3%2C17.3v24.19l-17.3%2C17.3h-24.19ZM90.44%2C131.43v-24.22l17.27-17.27h24.22l17.27%2C17.27v24.22l-17.27%2C17.27h-24.22l-17.27-17.27ZM21.28%2C62.27v-24.19l17.3-17.3h24.19l17.3%2C17.3v24.19l-17.3%2C17.3h-24.19l-17.3-17.3ZM38.58%2C217.86l-17.3-17.3v-24.19l17.3-17.3h24.19l17.3%2C17.3v24.19l-17.3%2C17.3h-24.19Z%22%20fill%3D%22%2300aaff%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cg%20id%3D%22team-01-apuchika-layer-3%22%20class%3D%22icon-layer%20layer-3%22%3E%3Cpath%20d%3D%22M214.99%2C133.31h-55.09l-13.31-13.31%2C13.31-13.31h55.09l13.31%2C13.31-13.31%2C13.31ZM120%2C139.01l-19.01-19.01%2C19.01-19.01%2C19.01%2C19.01-19.01%2C19.01ZM106.69%2C214.99v-55.09l13.31-13.31%2C13.31%2C13.31v55.09l-13.31%2C13.31-13.31-13.31ZM133.31%2C80.1l-13.31%2C13.31-13.31-13.31V25.01l13.31-13.31%2C13.31%2C13.31v55.09ZM80.1%2C106.69l13.31%2C13.31-13.31%2C13.31H25.01l-13.31-13.31%2C13.31-13.31h55.09Z%22%20fill%3D%22%23ccebf5%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cstyle%3E*%20%7B%20animation%3A%20none%20!important%3B%20transition%3A%20none%20!important%3B%20%7D%3C%2Fstyle%3E%3C%2Fsvg%3E"},{"file":"team-02-ommix.svg","src":"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20id%3D%22team-02-ommix%22%20viewBox%3D%22-14%20-14%20268%20268%22%20role%3D%22img%22%20aria-labelledby%3D%22team-02-ommix-title%22%3E%3Ctitle%20id%3D%22team-02-ommix-title%22%3EOmmix%20animated%20icon%3C%2Ftitle%3E%3Cstyle%3E%0A%20%20%20%20%23team-02-ommix%20.icon-layer%20%7B%0A%20%20%20%20%20%20transform-box%3A%20view-box%3B%0A%20%20%20%20%20%20transform-origin%3A%20120px%20120px%3B%0A%20%20%20%20%20%20animation%3A%20team-02-ommix-enter%20700ms%20cubic-bezier(.22%2C%201%2C%20.36%2C%201)%20both%3B%0A%20%20%20%20%7D%0A%20%20%20%20%23team-02-ommix%20.layer-1%20%7B%20animation-delay%3A%20120ms%3B%20%7D%0A%20%20%20%20%23team-02-ommix%20.layer-2%20%7B%20animation-delay%3A%20500ms%3B%20%7D%0A%20%20%20%20%23team-02-ommix%20.layer-3%20%7B%20animation-delay%3A%20880ms%3B%20%7D%0A%20%20%20%20%40keyframes%20team-02-ommix-enter%20%7B%0A%20%20%20%20%20%200%25%20%7B%20transform%3A%20scale(0)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2050%25%20%7B%20transform%3A%20scale(1.11)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2070%25%20%7B%20transform%3A%20scale(.96)%3B%20animation-timing-function%3A%20ease-out%3B%20%7D%0A%20%20%20%20%20%20100%25%20%7B%20transform%3A%20scale(1)%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20%40media%20(prefers-reduced-motion%3A%20reduce)%20%7B%0A%20%20%20%20%20%20%23team-02-ommix%20.icon-layer%20%7B%20animation%3A%20none%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%3C%2Fstyle%3E%3Cg%20id%3D%22team-02-ommix-layer-1%22%20class%3D%22icon-layer%20layer-1%22%3E%3Cpath%20d%3D%22M10.63%2C46.9l5.01-6.97%2C4.66-5.72%2C99.7%2C85.8L20.3%2C205.8l-4.66-5.72-5.01-6.97-4.55-7.32-4.05-7.61-2.03-4.44%2C6.51-2.7%2C3.27-1.74%2C6.19-4.16%2C5.58-4.91%2C4.91-5.58%2C2.17-3.02%2C1.99-3.16%2C3.27-6.68%2C2.38-7.04.85-3.63%2C1-7.36v-7.47l-1-7.36-.85-3.63-2.38-7.04-3.27-6.68-4.16-6.19-4.91-5.58-5.58-4.91-6.19-4.16-3.27-1.74-6.51-2.7%2C2.03-4.44%2C4.05-7.61%2C4.55-7.32ZM120%2C120L34.2%2C20.3l5.72-4.66%2C6.97-5.01%2C7.32-4.55%2C7.61-4.05%2C4.44-2.03%2C2.7%2C6.51%2C1.74%2C3.27%2C4.16%2C6.19%2C2.35%2C2.88%2C5.26%2C5.26%2C5.9%2C4.52%2C6.44%2C3.73%2C3.41%2C1.53%2C7.04%2C2.38%2C3.63.85%2C7.36%2C1h7.47l7.36-1%2C7.18-1.92%2C6.9-2.84%2C3.27-1.74%2C6.19-4.16%2C5.58-4.91%2C4.91-5.58%2C4.16-6.19%2C1.74-3.27%2C2.7-6.51%2C4.44%2C2.03%2C7.61%2C4.05%2C7.32%2C4.55%2C6.97%2C5.01%2C5.72%2C4.66-85.8%2C99.7%2C99.7-85.8%2C4.66%2C5.72%2C5.01%2C6.97%2C4.55%2C7.32%2C4.05%2C7.61%2C2.03%2C4.44-6.51%2C2.7-3.27%2C1.74-6.19%2C4.16-2.88%2C2.35-5.26%2C5.26-4.52%2C5.9-3.73%2C6.44-1.53%2C3.41-2.38%2C7.04-.85%2C3.63-1%2C7.36v7.47l1%2C7.36%2C1.92%2C7.18%2C1.32%2C3.48%2C3.27%2C6.68%2C4.16%2C6.19%2C4.91%2C5.58%2C5.58%2C4.91%2C6.19%2C4.16%2C3.27%2C1.74%2C6.51%2C2.7-2.03%2C4.44-4.05%2C7.61-4.55%2C7.32-5.01%2C6.97-4.66%2C5.72-99.7-85.8%2C85.8%2C99.7-5.72%2C4.66-6.97%2C5.01-7.32%2C4.55-7.61%2C4.05-4.44%2C2.03-2.7-6.51-1.74-3.27-4.16-6.19-4.91-5.58-2.7-2.56-5.9-4.52-3.16-1.99-6.68-3.27-7.04-2.38-3.63-.85-7.36-1h-7.47l-7.36%2C1-7.18%2C1.92-3.48%2C1.32-6.68%2C3.27-6.19%2C4.16-5.58%2C4.91-4.91%2C5.58-4.16%2C6.19-1.74%2C3.27-2.7%2C6.51-4.44-2.03-7.61-4.05-7.32-4.55-6.97-5.01-5.72-4.66%2C85.8-99.7Z%22%20fill%3D%22%237f1616%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cg%20id%3D%22team-02-ommix-layer-2%22%20class%3D%22icon-layer%20layer-2%22%3E%3Cpath%20d%3D%22M153.33%2C26.67V0h86.67v86.67h-26.67V26.67h-60ZM153.33%2C240v-26.67h60v-60h26.67v86.67h-86.67ZM153.33%2C63.33v-20h43.33v43.33h-20v-23.33h-23.33ZM153.33%2C196.67v-20h23.33v-23.33h20v43.33h-43.33ZM0%2C153.33h26.67v60h60v26.67H0v-86.67ZM26.67%2C86.67H0V0h86.67v26.67H26.67v60ZM43.33%2C153.33h20v23.33h23.33v20h-43.33v-43.33ZM63.33%2C86.67h-20v-43.33h43.33v20h-23.33v23.33Z%22%20fill%3D%22%23c4272f%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cg%20id%3D%22team-02-ommix-layer-3%22%20class%3D%22icon-layer%20layer-3%22%3E%3Cpath%20d%3D%22M240%2C120l-30.56%2C30.53-30.53-30.53%2C30.53-30.53%2C30.56%2C30.53ZM82.92%2C135.28v-30.56l21.79-21.79h30.56l21.79%2C21.79v30.56l-21.79%2C21.79h-30.56l-21.79-21.79ZM120%2C61.1l-30.53-30.53L120%2C0l30.53%2C30.56-30.53%2C30.53ZM150.53%2C209.44l-30.53%2C30.56-30.53-30.56%2C30.53-30.53%2C30.53%2C30.53ZM30.56%2C150.53L0%2C120l30.56-30.53%2C30.53%2C30.53-30.53%2C30.53Z%22%20fill%3D%22%23ffc5c8%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cstyle%3E*%20%7B%20animation%3A%20none%20!important%3B%20transition%3A%20none%20!important%3B%20%7D%3C%2Fstyle%3E%3C%2Fsvg%3E"},{"file":"team-03-phishing-ttuk.svg","src":"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20id%3D%22team-03-phishing-ttuk%22%20viewBox%3D%22-14%20-14%20268%20268%22%20role%3D%22img%22%20aria-labelledby%3D%22team-03-phishing-ttuk-title%22%3E%3Ctitle%20id%3D%22team-03-phishing-ttuk-title%22%3EPhishing%20Ttuk%20animated%20icon%3C%2Ftitle%3E%3Cstyle%3E%0A%20%20%20%20%23team-03-phishing-ttuk%20.icon-layer%20%7B%0A%20%20%20%20%20%20transform-box%3A%20view-box%3B%0A%20%20%20%20%20%20transform-origin%3A%20120px%20120px%3B%0A%20%20%20%20%20%20animation%3A%20team-03-phishing-ttuk-enter%20700ms%20cubic-bezier(.22%2C%201%2C%20.36%2C%201)%20both%3B%0A%20%20%20%20%7D%0A%20%20%20%20%23team-03-phishing-ttuk%20.layer-1%20%7B%20animation-delay%3A%20120ms%3B%20%7D%0A%20%20%20%20%23team-03-phishing-ttuk%20.layer-2%20%7B%20animation-delay%3A%20500ms%3B%20%7D%0A%20%20%20%20%23team-03-phishing-ttuk%20.layer-3%20%7B%20animation-delay%3A%20880ms%3B%20%7D%0A%20%20%20%20%40keyframes%20team-03-phishing-ttuk-enter%20%7B%0A%20%20%20%20%20%200%25%20%7B%20transform%3A%20scale(0)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2050%25%20%7B%20transform%3A%20scale(1.11)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2070%25%20%7B%20transform%3A%20scale(.96)%3B%20animation-timing-function%3A%20ease-out%3B%20%7D%0A%20%20%20%20%20%20100%25%20%7B%20transform%3A%20scale(1)%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20%40media%20(prefers-reduced-motion%3A%20reduce)%20%7B%0A%20%20%20%20%20%20%23team-03-phishing-ttuk%20.icon-layer%20%7B%20animation%3A%20none%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%3C%2Fstyle%3E%3Cg%20id%3D%22team-03-phishing-ttuk-layer-1%22%20class%3D%22icon-layer%20layer-1%22%3E%3Cpath%20d%3D%22M-.22-.05h120L-.22%2C119.95V-.05ZM-.22%2C119.95l120%2C120%2C120-120L119.78-.05h120v240H-.22v-120Z%22%20fill%3D%22%23f2f070%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cg%20id%3D%22team-03-phishing-ttuk-layer-2%22%20class%3D%22icon-layer%20layer-2%22%3E%3Cpath%20d%3D%22M127.82%2C239.42c-11.17.29-24.5.07-37.02-3.38l-.14-39.9c0-.58.82-1.54.39-2.55-.45-1.05-2.12-1.08-2.71-.16l-1.4%2C2.18-27.29%2C27.56c-17.98-10.36-32.02-24.86-42.67-42.62l29.83-30.25-42.63-.51c-4.91-20.02-5.03-40.34.04-59.96l42.82-.46-29.97-30.57c10.56-17.82%2C24.8-31.85%2C42.57-42.56l30.66%2C30.52.25-43.23c19.79-5.1%2C40.03-5.06%2C59.83.03l.14%2C43.46%2C30.97-30.75c17.48%2C10.61%2C31.85%2C24.8%2C42.38%2C42.5l-29.78%2C30.41%2C42.58.61c5.16%2C19.69%2C4.91%2C39.94.05%2C60.05l-42.46.44c9.71%2C10.68%2C19.1%2C19.49%2C29.62%2C29.87-9.83%2C17.85-24.56%2C32.39-42.46%2C42.97l-30.62-30.2-.39%2C42.78c-6.55%2C2.14-13.28%2C3.49-19.64%2C3.57M90.64%2C149.62l-.02-59.69%2C59.65-.05.34%2C60.11%2C41.24-.37-28.61-29.84%2C28.92-29.62-41.7-.43-.37-41.55-29.89%2C29.13-29.34-28.93-.35%2C41.52-42.55.38%2C29.88%2C29.71-29.55%2C29.83%2C41.95.33c.21-.24.43-.39.39-.52ZM91.87%2C150.04c-.31.54-.71.93-1.24%2C1.24l.15%2C40.67%2C29.69-29.58%2C29.55%2C28.9.26-41.3-58.42.05Z%22%20fill%3D%22%23eec35a%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cg%20id%3D%22team-03-phishing-ttuk-layer-3%22%20class%3D%22icon-layer%20layer-3%22%3E%3Cpath%20d%3D%22M120%2C240L0%2C120%2C120%2C0l120%2C120-120%2C120ZM120%2C200l80-80L120%2C40%2C40%2C120l80%2C80ZM86.67%2C120l33.33-33.33%2C33.33%2C33.33-33.33%2C33.33-33.33-33.33Z%22%20fill%3D%22%23e5903a%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cstyle%3E*%20%7B%20animation%3A%20none%20!important%3B%20transition%3A%20none%20!important%3B%20%7D%3C%2Fstyle%3E%3C%2Fsvg%3E"},{"file":"team-04-ilkko.svg","src":"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20id%3D%22team-04-ilkko%22%20viewBox%3D%22-14%20-14%20268%20268%22%20role%3D%22img%22%20aria-labelledby%3D%22team-04-ilkko-title%22%3E%3Ctitle%20id%3D%22team-04-ilkko-title%22%3EIlkko%20animated%20icon%3C%2Ftitle%3E%3Cstyle%3E%0A%20%20%20%20%23team-04-ilkko%20.icon-layer%20%7B%0A%20%20%20%20%20%20transform-box%3A%20view-box%3B%0A%20%20%20%20%20%20transform-origin%3A%20120px%20120px%3B%0A%20%20%20%20%20%20animation%3A%20team-04-ilkko-enter%20700ms%20cubic-bezier(.22%2C%201%2C%20.36%2C%201)%20both%3B%0A%20%20%20%20%7D%0A%20%20%20%20%23team-04-ilkko%20.layer-1%20%7B%20animation-delay%3A%20120ms%3B%20%7D%0A%20%20%20%20%23team-04-ilkko%20.layer-2%20%7B%20animation-delay%3A%20500ms%3B%20%7D%0A%20%20%20%20%23team-04-ilkko%20.layer-3%20%7B%20animation-delay%3A%20880ms%3B%20%7D%0A%20%20%20%20%40keyframes%20team-04-ilkko-enter%20%7B%0A%20%20%20%20%20%200%25%20%7B%20transform%3A%20scale(0)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2050%25%20%7B%20transform%3A%20scale(1.11)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2070%25%20%7B%20transform%3A%20scale(.96)%3B%20animation-timing-function%3A%20ease-out%3B%20%7D%0A%20%20%20%20%20%20100%25%20%7B%20transform%3A%20scale(1)%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20%40media%20(prefers-reduced-motion%3A%20reduce)%20%7B%0A%20%20%20%20%20%20%23team-04-ilkko%20.icon-layer%20%7B%20animation%3A%20none%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%3C%2Fstyle%3E%3Cg%20id%3D%22team-04-ilkko-layer-1%22%20class%3D%22icon-layer%20layer-1%22%3E%3Cpath%20d%3D%22M185.28%2C54.89V0H54.89v54.89H0v130.4h54.89v54.72h130.4v-54.72h54.72V54.89h-54.72ZM174.65%2C65.35v109.29h-109.29v-109.29h109.29Z%22%20fill%3D%22%23f6ffe3%22%3E%3C%2Fpath%3E%3Crect%20x%3D%2211.18%22%20y%3D%2211.1%22%20width%3D%2232.76%22%20height%3D%2232.76%22%20transform%3D%22translate(-11.36%2027.54)%20rotate(-45)%22%20fill%3D%22%23f6ffe3%22%3E%3C%2Frect%3E%3Crect%20x%3D%22196.32%22%20y%3D%2211.1%22%20width%3D%2232.76%22%20height%3D%2232.76%22%20transform%3D%22translate(42.87%20158.45)%20rotate(-45)%22%20fill%3D%22%23f6ffe3%22%3E%3C%2Frect%3E%3Crect%20x%3D%2211.18%22%20y%3D%22196.15%22%20width%3D%2232.76%22%20height%3D%2232.76%22%20transform%3D%22translate(-142.21%2081.74)%20rotate(-45)%22%20fill%3D%22%23f6ffe3%22%3E%3C%2Frect%3E%3Crect%20x%3D%22196.32%22%20y%3D%22196.15%22%20width%3D%2232.76%22%20height%3D%2232.76%22%20transform%3D%22translate(-87.99%20212.65)%20rotate(-45)%22%20fill%3D%22%23f6ffe3%22%3E%3C%2Frect%3E%3C%2Fg%3E%3Cg%20id%3D%22team-04-ilkko-layer-2%22%20class%3D%22icon-layer%20layer-2%22%3E%3Cpath%20d%3D%22M30%2C30.04h29.99V.04H.01v60h29.99v-30ZM89.99%2C30.04v30h59.98v-30L119.98.04l-29.99%2C30ZM30%2C150.04h29.99v-60h-29.99L.01%2C120.04l29.99%2C30ZM59.99%2C210.04h-29.99v-30H.01v60h59.98v-30ZM89.99%2C210.04l29.99%2C30%2C29.99-30v-30h-59.98v30ZM179.96%2C30.04h29.99v30h29.99V.04h-59.98v30ZM179.96%2C90.04v60h29.99l29.99-30-29.99-30h-29.99ZM179.96%2C210.04v30h59.98v-60h-29.99v30h-29.99Z%22%20fill%3D%22%23f59000%22%20fill-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cg%20id%3D%22team-04-ilkko-layer-3%22%20class%3D%22icon-layer%20layer-3%22%3E%3Cpolygon%20points%3D%22161.09%20234.7%20216.33%20219.04%20119.82%20193.15%20161.09%20234.7%22%20fill%3D%22%23ffd834%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%224.49%20160.72%2019.99%20217.35%2045.59%20120.81%204.49%20160.72%22%20fill%3D%22%23ffd834%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22217.52%20217.66%20232.9%20160.81%20191.82%20121.1%20217.52%20217.66%22%20fill%3D%22%23ffd834%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%2277.29%20234.57%20117.69%20193.21%2021.01%20219.23%2077.29%20234.57%22%20fill%3D%22%23ffd834%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%2276.69%20.83%2021.45%2016.49%20117.96%2042.38%2076.69%20.83%22%20fill%3D%22%23ffd834%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22233.29%2074.81%20217.79%2018.18%20192.2%20114.72%20233.29%2074.81%22%20fill%3D%22%23ffd834%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%2220.27%2017.87%204.88%2074.72%2045.97%20114.42%2020.27%2017.87%22%20fill%3D%22%23ffd834%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22160.49%20.95%20120.09%2042.32%20216.77%2016.3%20160.49%20.95%22%20fill%3D%22%23ffd834%22%3E%3C%2Fpolygon%3E%3Crect%20x%3D%2270.52%22%20y%3D%2268.76%22%20width%3D%2296.77%22%20height%3D%2296.77%22%20transform%3D%22translate(-48.01%20118.38)%20rotate(-45)%22%20fill%3D%22%23ffd834%22%3E%3C%2Frect%3E%3C%2Fg%3E%3Cstyle%3E*%20%7B%20animation%3A%20none%20!important%3B%20transition%3A%20none%20!important%3B%20%7D%3C%2Fstyle%3E%3C%2Fsvg%3E"},{"file":"team-05-kuro.svg","src":"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20id%3D%22team-05-kuro%22%20viewBox%3D%22-14%20-14%20268%20268%22%20role%3D%22img%22%20aria-labelledby%3D%22team-05-kuro-title%22%3E%3Ctitle%20id%3D%22team-05-kuro-title%22%3EKuro%20animated%20icon%3C%2Ftitle%3E%3Cstyle%3E%0A%20%20%20%20%23team-05-kuro%20.icon-layer%20%7B%0A%20%20%20%20%20%20transform-box%3A%20view-box%3B%0A%20%20%20%20%20%20transform-origin%3A%20120px%20120px%3B%0A%20%20%20%20%20%20animation%3A%20team-05-kuro-enter%20700ms%20cubic-bezier(.22%2C%201%2C%20.36%2C%201)%20both%3B%0A%20%20%20%20%7D%0A%20%20%20%20%23team-05-kuro%20.layer-1%20%7B%20animation-delay%3A%20120ms%3B%20%7D%0A%20%20%20%20%23team-05-kuro%20.layer-2%20%7B%20animation-delay%3A%20500ms%3B%20%7D%0A%20%20%20%20%23team-05-kuro%20.layer-3%20%7B%20animation-delay%3A%20880ms%3B%20%7D%0A%20%20%20%20%40keyframes%20team-05-kuro-enter%20%7B%0A%20%20%20%20%20%200%25%20%7B%20transform%3A%20scale(0)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2050%25%20%7B%20transform%3A%20scale(1.11)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2070%25%20%7B%20transform%3A%20scale(.96)%3B%20animation-timing-function%3A%20ease-out%3B%20%7D%0A%20%20%20%20%20%20100%25%20%7B%20transform%3A%20scale(1)%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20%40media%20(prefers-reduced-motion%3A%20reduce)%20%7B%0A%20%20%20%20%20%20%23team-05-kuro%20.icon-layer%20%7B%20animation%3A%20none%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%3C%2Fstyle%3E%3Cg%20id%3D%22team-05-kuro-layer-1%22%20class%3D%22icon-layer%20layer-1%22%3E%3Cpath%20d%3D%22M150.51%2C221.71l26.55-26.55-26.55-26.52%2C18.21-18.21%2C26.52%2C26.55%2C26.55-26.55%2C18.21%2C18.21-26.55%2C26.52%2C26.55%2C26.55-18.21%2C18.21-26.55-26.55-26.52%2C26.55-18.21-18.21ZM195.24%2C62.86l-26.52%2C26.55-18.21-18.21%2C26.55-26.52-26.55-26.55L168.72-.08l26.52%2C26.55L221.8-.08l18.21%2C18.21-26.55%2C26.55%2C26.55%2C26.52-18.21%2C18.21-26.55-26.55ZM44.77%2C176.97l26.52-26.55%2C18.21%2C18.21-26.55%2C26.52%2C26.55%2C26.55-18.21%2C18.21-26.52-26.55-26.55%2C26.55L0%2C221.71l26.55-26.55L0%2C168.63l18.21-18.21%2C26.55%2C26.55ZM89.5%2C18.12l-26.55%2C26.55%2C26.55%2C26.52-18.21%2C18.21-26.52-26.55-26.55%2C26.55L0%2C71.2l26.55-26.52L0%2C18.12%2C18.21-.08l26.55%2C26.55L71.29-.08l18.21%2C18.21Z%22%20fill%3D%22%238bff6c%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cg%20id%3D%22team-05-kuro-layer-2%22%20class%3D%22icon-layer%20layer-2%22%3E%3Cpath%20d%3D%22M119.99%2C7.85l-.25-7.85h28.3l.21%2C6.01.57%2C5.98.99%2C5.94%2C1.38%2C5.87%2C1.73%2C5.77%2C2.12%2C5.62%2C2.48%2C5.48%2C2.83%2C5.31%2C3.18%2C5.09%2C3.5%2C4.92%2C3.82%2C4.63%2C4.14%2C4.39%2C4.39%2C4.14%2C4.63%2C3.82%2C4.92%2C3.5%2C5.09%2C3.18%2C5.31%2C2.83%2C5.48%2C2.48%2C5.62%2C2.12%2C5.77%2C1.73%2C5.87%2C1.38%2C5.94.99%2C5.98.57%2C6.01.21v28.3l-7.85-.25-7.85-.78-7.75-1.27-7.68-1.8-7.53-2.26-7.36-2.79-7.18-3.25-6.93-3.71-6.68-4.14-6.4-4.6-6.08-4.99-5.73-5.38-5.38-5.73-4.99-6.08-4.6-6.4-4.14-6.68-3.71-6.93-3.25-7.18-2.79-7.36-2.26-7.53-1.8-7.68-1.27-7.75-.78-7.85ZM240%2C120.12v28.21l-5.99.21-5.96.56-5.92.99-5.85%2C1.38-5.75%2C1.73-5.61%2C2.12-5.47%2C2.47-5.29%2C2.82-5.08%2C3.17-4.9%2C3.49-4.62%2C3.81-4.37%2C4.13-4.13%2C4.37-3.81%2C4.62-3.49%2C4.9-3.17%2C5.08-2.82%2C5.29-2.47%2C5.47-2.12%2C5.61-1.73%2C5.75-1.38%2C5.85-.99%2C5.92-.56%2C5.96-.21%2C5.99h-28.21l.25-7.83.78-7.83%2C1.27-7.72%2C1.8-7.65%2C2.26-7.51%2C2.79-7.33%2C3.24-7.16%2C3.7-6.91%2C4.13-6.66%2C4.58-6.38%2C4.97-6.06%2C5.36-5.71%2C5.71-5.36%2C6.06-4.97%2C6.38-4.58%2C6.66-4.13%2C6.91-3.7%2C7.16-3.24%2C7.33-2.79%2C7.51-2.26%2C7.65-1.8%2C7.72-1.27%2C7.83-.78%2C7.83-.25ZM7.83%2C119.65l-7.83.25v-28.21l5.99-.21%2C5.96-.56%2C5.92-.99%2C5.85-1.38%2C5.75-1.73%2C5.61-2.12%2C5.47-2.47%2C5.29-2.82%2C5.08-3.17%2C4.9-3.49%2C4.62-3.81%2C4.37-4.13%2C4.13-4.37%2C3.81-4.62%2C3.49-4.9%2C3.17-5.08%2C2.82-5.29%2C2.47-5.47%2C2.12-5.61%2C1.73-5.75%2C1.38-5.85.99-5.92.56-5.96.21-5.99h28.21l-.25%2C7.83-.78%2C7.83-1.27%2C7.72-1.8%2C7.65-2.26%2C7.51-2.79%2C7.34-3.24%2C7.16-3.7%2C6.91-4.13%2C6.67-4.58%2C6.38-4.97%2C6.07-5.36%2C5.71-5.71%2C5.36-6.07%2C4.97-6.38%2C4.58-6.67%2C4.13-6.91%2C3.7-7.16%2C3.24-7.34%2C2.79-7.51%2C2.26-7.65%2C1.8-7.72%2C1.27-7.83.78ZM116.34%2C208.83l1.81%2C7.69%2C1.28%2C7.76.78%2C7.86.25%2C7.86h-28.34l-.21-6.02-.57-5.99-.99-5.95-1.38-5.88-1.74-5.77-2.13-5.63-2.48-5.49-2.83-5.31-3.19-5.1-3.51-4.92-3.83-4.64-4.14-4.39-4.39-4.14-4.64-3.83-4.92-3.51-5.1-3.19-5.31-2.83-5.49-2.48-5.63-2.13-5.77-1.74-5.88-1.38-5.95-.99-5.99-.57-6.02-.21v-28.34l7.86.25%2C7.86.78%2C7.76%2C1.28%2C7.69%2C1.81%2C7.55%2C2.27%2C7.37%2C2.8%2C7.19%2C3.26%2C6.94%2C3.72%2C6.7%2C4.14%2C6.41%2C4.61%2C6.09%2C4.99%2C5.74%2C5.38%2C5.38%2C5.74%2C4.99%2C6.09%2C4.61%2C6.41%2C4.14%2C6.7%2C3.72%2C6.94%2C3.26%2C7.19%2C2.8%2C7.37%2C2.27%2C7.55Z%22%20fill%3D%22%233f66b5%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cg%20id%3D%22team-05-kuro-layer-3%22%20class%3D%22icon-layer%20layer-3%22%3E%3Cpath%20d%3D%22M225.26%2C134.66h-18.95l-14.72-14.75%2C14.72-14.75h18.95l14.75%2C14.75-14.75%2C14.75ZM120%2C183.07l-63.16-63.16%2C63.16-63.16%2C63.16%2C63.16-63.16%2C63.16ZM105.26%2C225.17v-18.95l14.75-14.72%2C14.75%2C14.72v18.95l-14.75%2C14.75-14.75-14.75ZM134.75%2C33.61l-14.75%2C14.72-14.75-14.72V14.66L120-.08l14.75%2C14.75v18.95ZM33.7%2C105.17l14.72%2C14.75-14.72%2C14.75H14.75L0%2C119.92l14.75-14.75h18.95Z%22%20fill%3D%22%23bdffbf%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cstyle%3E*%20%7B%20animation%3A%20none%20!important%3B%20transition%3A%20none%20!important%3B%20%7D%3C%2Fstyle%3E%3C%2Fsvg%3E"},{"file":"team-06-dadeullim.svg","src":"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20id%3D%22team-06-dadeullim%22%20viewBox%3D%22-14%20-14%20268%20268%22%20role%3D%22img%22%20aria-labelledby%3D%22team-06-dadeullim-title%22%3E%3Ctitle%20id%3D%22team-06-dadeullim-title%22%3EDadeullim%20animated%20icon%3C%2Ftitle%3E%3Cstyle%3E%0A%20%20%20%20%23team-06-dadeullim%20.icon-layer%20%7B%0A%20%20%20%20%20%20transform-box%3A%20view-box%3B%0A%20%20%20%20%20%20transform-origin%3A%20120px%20120px%3B%0A%20%20%20%20%20%20animation%3A%20team-06-dadeullim-enter%20700ms%20cubic-bezier(.22%2C%201%2C%20.36%2C%201)%20both%3B%0A%20%20%20%20%7D%0A%20%20%20%20%23team-06-dadeullim%20.layer-1%20%7B%20animation-delay%3A%20120ms%3B%20%7D%0A%20%20%20%20%23team-06-dadeullim%20.layer-2%20%7B%20animation-delay%3A%20500ms%3B%20%7D%0A%20%20%20%20%23team-06-dadeullim%20.layer-3%20%7B%20animation-delay%3A%20880ms%3B%20%7D%0A%20%20%20%20%40keyframes%20team-06-dadeullim-enter%20%7B%0A%20%20%20%20%20%200%25%20%7B%20transform%3A%20scale(0)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2050%25%20%7B%20transform%3A%20scale(1.11)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2070%25%20%7B%20transform%3A%20scale(.96)%3B%20animation-timing-function%3A%20ease-out%3B%20%7D%0A%20%20%20%20%20%20100%25%20%7B%20transform%3A%20scale(1)%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20%40media%20(prefers-reduced-motion%3A%20reduce)%20%7B%0A%20%20%20%20%20%20%23team-06-dadeullim%20.icon-layer%20%7B%20animation%3A%20none%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%3C%2Fstyle%3E%3Cg%20id%3D%22team-06-dadeullim-layer-1%22%20class%3D%22icon-layer%20layer-1%22%3E%3Cpath%20d%3D%22M240%2C0v40L200%2C0h40ZM240%2C240h-40l40-40v40ZM193.33%2C120l26.67%2C26.67-26.67%2C26.67-53.33-53.33%2C53.33-53.33%2C26.67%2C26.67-26.67%2C26.67ZM120%2C46.67l26.67-26.67%2C26.67%2C26.67-53.33%2C53.33-53.33-53.33%2C26.67-26.67%2C26.67%2C26.67ZM120%2C193.33l-26.67%2C26.67-26.67-26.67%2C53.33-53.33%2C53.33%2C53.33-26.67%2C26.67-26.67-26.67ZM46.67%2C120l-26.67-26.67%2C26.67-26.67%2C53.33%2C53.33-53.33%2C53.33-26.67-26.67%2C26.67-26.67ZM0%2C0h40L0%2C40V0ZM0%2C240v-40l40%2C40H0Z%22%20fill%3D%22%23a8f0db%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cg%20id%3D%22team-06-dadeullim-layer-2%22%20class%3D%22icon-layer%20layer-2%22%3E%3Cpath%20d%3D%22M135.76%2C239.71l-2.71.29v-36.19l3.49-.59%2C5.42-1.27%2C5.32-1.6%2C5.19-1.96%2C5.06-2.28%2C4.9-2.61%2C4.7-2.94%2C4.54-3.23%2C4.28-3.52%2C4.05-3.82%2C3.82-4.05%2C3.52-4.28%2C3.23-4.54%2C2.94-4.7%2C2.61-4.9%2C2.28-5.06%2C1.96-5.19%2C1.6-5.32%2C1.27-5.42.59-3.49h36.19l-.29%2C2.71-1.27%2C7.8-1.79%2C7.7-2.28%2C7.54-2.81%2C7.41-3.26%2C7.18-3.72%2C6.98-4.18%2C6.72-4.6%2C6.4-4.99%2C6.14-5.42%2C5.74-5.74%2C5.42-6.14%2C4.99-6.4%2C4.6-6.72%2C4.18-6.98%2C3.72-7.18%2C3.26-7.41%2C2.81-7.54%2C2.28-7.7%2C1.79-7.8%2C1.27ZM239.71%2C104.24l.29%2C2.71h-36.19l-.59-3.49-1.27-5.42-1.6-5.32-1.96-5.19-2.28-5.06-2.61-4.9-2.94-4.7-3.23-4.54-3.52-4.28-3.82-4.05-4.05-3.82-4.28-3.52-4.54-3.23-4.7-2.94-4.9-2.61-5.06-2.28-5.19-1.96-5.32-1.6-5.42-1.27-3.49-.59V0l2.71.29%2C7.8%2C1.27%2C7.7%2C1.79%2C7.54%2C2.28%2C7.41%2C2.81%2C7.18%2C3.26%2C6.98%2C3.72%2C6.72%2C4.18%2C6.4%2C4.6%2C6.14%2C4.99%2C5.74%2C5.42%2C5.42%2C5.74%2C4.99%2C6.14%2C4.6%2C6.4%2C4.18%2C6.72%2C3.72%2C6.98%2C3.26%2C7.18%2C2.81%2C7.41%2C2.28%2C7.54%2C1.79%2C7.7%2C1.27%2C7.8ZM104.24.29l2.71-.29v36.19l-3.49.59-5.42%2C1.27-5.32%2C1.6-5.19%2C1.96-5.06%2C2.28-4.9%2C2.61-4.7%2C2.94-4.54%2C3.23-4.28%2C3.52-4.05%2C3.82-3.82%2C4.05-3.52%2C4.28-3.23%2C4.54-2.94%2C4.7-2.61%2C4.9-2.28%2C5.06-1.96%2C5.19-1.6%2C5.32-1.27%2C5.42-.59%2C3.49H0l.29-2.71%2C1.27-7.8%2C1.79-7.7%2C2.28-7.54%2C2.81-7.41%2C3.26-7.18%2C3.72-6.98%2C4.18-6.72%2C4.6-6.4%2C4.99-6.14%2C5.42-5.74%2C5.74-5.42%2C6.14-4.99%2C6.4-4.6%2C6.72-4.18%2C6.98-3.72%2C7.18-3.26%2C7.41-2.81%2C7.54-2.28%2C7.7-1.79%2C7.8-1.27ZM.29%2C135.76l-.29-2.71h36.19l.59%2C3.49%2C1.27%2C5.42%2C1.6%2C5.32%2C1.96%2C5.19%2C2.28%2C5.06%2C2.61%2C4.9%2C2.94%2C4.7%2C3.23%2C4.54%2C3.52%2C4.28%2C3.82%2C4.05%2C4.05%2C3.82%2C4.28%2C3.52%2C4.54%2C3.23%2C4.7%2C2.94%2C4.9%2C2.61%2C5.06%2C2.28%2C5.19%2C1.96%2C5.32%2C1.6%2C5.42%2C1.27%2C3.49.59v36.19l-2.71-.29-7.8-1.27-7.7-1.79-7.54-2.28-7.41-2.81-7.18-3.26-6.98-3.72-6.72-4.18-6.4-4.6-6.14-4.99-5.74-5.42-5.42-5.74-4.99-6.14-4.6-6.4-4.18-6.72-3.72-6.98-3.26-7.18-2.81-7.41-2.28-7.54-1.79-7.7-1.27-7.8Z%22%20fill%3D%22%234ccad1%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cg%20id%3D%22team-06-dadeullim-layer-3%22%20class%3D%22icon-layer%20layer-3%22%3E%3Cpath%20d%3D%22M190.62%2C161.45l16.88%2C16.88-29.17%2C29.17-16.88-16.88%2C29.17-29.17ZM207.5%2C61.67l-16.88%2C16.88-29.17-29.17%2C16.88-16.88%2C29.17%2C29.17ZM120%2C138.42l-18.42-18.42%2C18.42-18.42%2C18.42%2C18.42-18.42%2C18.42ZM32.5%2C61.67l29.17-29.17%2C16.88%2C16.88-29.17%2C29.17-16.88-16.88ZM32.5%2C178.33l16.88-16.88%2C29.17%2C29.17-16.88%2C16.88-29.17-29.17Z%22%20fill%3D%22%233b82a6%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M27.78%2C144.01H0v-48.02h27.78v48.02ZM95.99%2C240v-27.78h48.02v27.78s-48.02%2C0-48.02%2C0ZM104.84%2C104.84h30.32v30.32s-30.32%2C0-30.32%2C0v-30.32ZM240%2C95.99v48.02s-27.78%2C0-27.78%2C0v-48.02h27.78ZM144.01%2C0v27.78h-48.02V0h48.02Z%22%20fill%3D%22%233b82a6%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cstyle%3E*%20%7B%20animation%3A%20none%20!important%3B%20transition%3A%20none%20!important%3B%20%7D%3C%2Fstyle%3E%3C%2Fsvg%3E"},{"file":"team-07-style-lens.svg","src":"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20id%3D%22team-07-style-lens%22%20viewBox%3D%22-14%20-14%20268%20268%22%20role%3D%22img%22%20aria-labelledby%3D%22team-07-style-lens-title%22%3E%3Ctitle%20id%3D%22team-07-style-lens-title%22%3EStyle%20Lens%20animated%20icon%3C%2Ftitle%3E%3Cstyle%3E%0A%20%20%20%20%23team-07-style-lens%20.icon-layer%20%7B%0A%20%20%20%20%20%20transform-box%3A%20view-box%3B%0A%20%20%20%20%20%20transform-origin%3A%20120px%20120px%3B%0A%20%20%20%20%20%20animation%3A%20team-07-style-lens-enter%20700ms%20cubic-bezier(.22%2C%201%2C%20.36%2C%201)%20both%3B%0A%20%20%20%20%7D%0A%20%20%20%20%23team-07-style-lens%20.layer-1%20%7B%20animation-delay%3A%20120ms%3B%20%7D%0A%20%20%20%20%23team-07-style-lens%20.layer-2%20%7B%20animation-delay%3A%20500ms%3B%20%7D%0A%20%20%20%20%40keyframes%20team-07-style-lens-enter%20%7B%0A%20%20%20%20%20%200%25%20%7B%20transform%3A%20scale(0)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2050%25%20%7B%20transform%3A%20scale(1.11)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2070%25%20%7B%20transform%3A%20scale(.96)%3B%20animation-timing-function%3A%20ease-out%3B%20%7D%0A%20%20%20%20%20%20100%25%20%7B%20transform%3A%20scale(1)%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20%40media%20(prefers-reduced-motion%3A%20reduce)%20%7B%0A%20%20%20%20%20%20%23team-07-style-lens%20.icon-layer%20%7B%20animation%3A%20none%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%3C%2Fstyle%3E%3Cg%20id%3D%22team-07-style-lens-layer-1%22%20class%3D%22icon-layer%20layer-1%22%3E%3Cpath%20d%3D%22M119.27%2C104.35l.77%2C7.83.27%2C7.83.27-7.83.77-7.83%2C1.27-7.73%2C1.8-7.67%2C2.27-7.5%2C2.77-7.37%2C3.23-7.13%2C3.7-6.93%2C4.17-6.67%2C4.57-6.4%2C4.97-6.07%2C5.37-5.73%2C5.73-5.37%2C6.07-4.97%2C6.4-4.57%2C6.67-4.17%2C6.93-3.7%2C7.13-3.23%2C7.37-2.77%2C7.5-2.27%2C7.67-1.8%2C7.73-1.27%2C7.83-.77%2C7.83-.27v240l-7.83-.27-7.83-.77-7.73-1.27-7.67-1.8-7.5-2.27-7.37-2.77-7.13-3.23-6.93-3.7-6.67-4.17-6.4-4.57-6.07-4.97-5.73-5.37-5.37-5.73-4.97-6.07-4.57-6.4-4.17-6.67-3.7-6.93-3.23-7.13-2.77-7.37-2.27-7.5-1.8-7.67-1.27-7.73-.77-7.83-.27-7.83-.27%2C7.83-.77%2C7.83-1.27%2C7.73-1.8%2C7.67-2.27%2C7.5-2.77%2C7.37-3.23%2C7.13-3.7%2C6.93-4.17%2C6.67-4.57%2C6.4-4.97%2C6.07-5.37%2C5.73-5.73%2C5.37-6.07%2C4.97-6.4%2C4.57-6.67%2C4.17-6.93%2C3.7-7.13%2C3.23-7.37%2C2.77-7.5%2C2.27-7.67%2C1.8-7.73%2C1.27-7.83.77-7.83.27V.02l7.83.27%2C7.83.77%2C7.73%2C1.27%2C7.67%2C1.8%2C7.5%2C2.27%2C7.37%2C2.77%2C7.13%2C3.23%2C6.93%2C3.7%2C6.67%2C4.17%2C6.4%2C4.57%2C6.07%2C4.97%2C5.73%2C5.37%2C5.37%2C5.73%2C4.97%2C6.07%2C4.57%2C6.4%2C4.17%2C6.67%2C3.7%2C6.93%2C3.23%2C7.13%2C2.77%2C7.37%2C2.27%2C7.5%2C1.8%2C7.67%2C1.27%2C7.73Z%22%20fill%3D%22%23d33bff%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cg%20id%3D%22team-07-style-lens-layer-2%22%20class%3D%22icon-layer%20layer-2%22%3E%3Cpath%20d%3D%22M35.94%2C240.06c.13-43.47%2C37.43-78.68%2C83.43-78.68s83.31%2C35.2%2C83.43%2C78.68h36.57c-.13-62.57-53.8-113.25-120-113.25S-.5%2C177.5-.63%2C240.06h36.57Z%22%20fill%3D%22%23e692ff%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M61.88%2C240.06h26.26c.13-16.21%2C14.06-29.31%2C31.24-29.31s31.11%2C13.1%2C31.24%2C29.31h26.26c-.13-29.92-25.82-54.14-57.49-54.14s-57.37%2C24.22-57.49%2C54.14Z%22%20fill%3D%22%23e692ff%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M202.81.06c-.13%2C43.47-37.43%2C78.68-83.43%2C78.68S36.06%2C43.53%2C35.94.06H-.63c.13%2C62.57%2C53.8%2C113.25%2C120%2C113.25S239.25%2C62.63%2C239.37.06h-36.57Z%22%20fill%3D%22%23e692ff%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M176.87.07h-26.26c-.13%2C16.21-14.06%2C29.31-31.24%2C29.31S88.27%2C16.28%2C88.14.07h-26.26c.13%2C29.92%2C25.82%2C54.14%2C57.49%2C54.14S176.74%2C29.99%2C176.87.07Z%22%20fill%3D%22%23e692ff%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cstyle%3E*%20%7B%20animation%3A%20none%20!important%3B%20transition%3A%20none%20!important%3B%20%7D%3C%2Fstyle%3E%3C%2Fsvg%3E"},{"file":"team-08-geuneuljabi.svg","src":"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20id%3D%22team-08-geuneuljabi%22%20viewBox%3D%22-14%20-14%20268%20268%22%20role%3D%22img%22%20aria-labelledby%3D%22team-08-geuneuljabi-title%22%3E%3Ctitle%20id%3D%22team-08-geuneuljabi-title%22%3EGeuneuljabi%20animated%20icon%3C%2Ftitle%3E%3Cstyle%3E%0A%20%20%20%20%23team-08-geuneuljabi%20.icon-layer%20%7B%0A%20%20%20%20%20%20transform-box%3A%20view-box%3B%0A%20%20%20%20%20%20transform-origin%3A%20120px%20120px%3B%0A%20%20%20%20%20%20animation%3A%20team-08-geuneuljabi-enter%20700ms%20cubic-bezier(.22%2C%201%2C%20.36%2C%201)%20both%3B%0A%20%20%20%20%7D%0A%20%20%20%20%23team-08-geuneuljabi%20.layer-1%20%7B%20animation-delay%3A%20120ms%3B%20%7D%0A%20%20%20%20%23team-08-geuneuljabi%20.layer-2%20%7B%20animation-delay%3A%20500ms%3B%20%7D%0A%20%20%20%20%40keyframes%20team-08-geuneuljabi-enter%20%7B%0A%20%20%20%20%20%200%25%20%7B%20transform%3A%20scale(0)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2050%25%20%7B%20transform%3A%20scale(1.11)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2070%25%20%7B%20transform%3A%20scale(.96)%3B%20animation-timing-function%3A%20ease-out%3B%20%7D%0A%20%20%20%20%20%20100%25%20%7B%20transform%3A%20scale(1)%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20%40media%20(prefers-reduced-motion%3A%20reduce)%20%7B%0A%20%20%20%20%20%20%23team-08-geuneuljabi%20.icon-layer%20%7B%20animation%3A%20none%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%3C%2Fstyle%3E%3Cg%20id%3D%22team-08-geuneuljabi-layer-1%22%20class%3D%22icon-layer%20layer-1%22%3E%3Cpath%20d%3D%22M160%2C80.01V0h80v80h-80ZM240%2C240.01h-80v-80h80v80ZM0%2C80.01V0h80v80H0ZM80%2C80.01h80v80h-80v-80ZM80%2C240.01H0v-80h80v80Z%22%20fill%3D%22%23b5b5b5%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cg%20id%3D%22team-08-geuneuljabi-layer-2%22%20class%3D%22icon-layer%20layer-2%22%3E%3Cpath%20d%3D%22M240%2C86.31v25.26h-88.42v-23.15h-23.15V0h25.26v86.31h86.31ZM240%2C128.43v25.26h-86.31v86.31h-25.26v-88.42h23.15v-23.15h88.42ZM98.94%2C141.06v-42.13h42.13v42.13h-42.13ZM0%2C86.31h86.31V0h25.26v88.42h-23.15v23.15H0v-25.26ZM86.31%2C153.69H0v-25.26h88.42v23.15h23.15v88.42h-25.26v-86.31Z%22%20fill%3D%22%23ffffff%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cstyle%3E*%20%7B%20animation%3A%20none%20!important%3B%20transition%3A%20none%20!important%3B%20%7D%3C%2Fstyle%3E%3C%2Fsvg%3E"},{"file":"team-09-magmoa.svg","src":"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20id%3D%22team-09-magmoa%22%20viewBox%3D%22-14%20-14%20268%20268%22%20role%3D%22img%22%20aria-labelledby%3D%22team-09-magmoa-title%22%3E%3Ctitle%20id%3D%22team-09-magmoa-title%22%3EMagmoa%20animated%20icon%3C%2Ftitle%3E%3Cstyle%3E%0A%20%20%20%20%23team-09-magmoa%20.icon-layer%20%7B%0A%20%20%20%20%20%20transform-box%3A%20view-box%3B%0A%20%20%20%20%20%20transform-origin%3A%20120px%20120px%3B%0A%20%20%20%20%20%20animation%3A%20team-09-magmoa-enter%20700ms%20cubic-bezier(.22%2C%201%2C%20.36%2C%201)%20both%3B%0A%20%20%20%20%7D%0A%20%20%20%20%23team-09-magmoa%20.layer-1%20%7B%20animation-delay%3A%20120ms%3B%20%7D%0A%20%20%20%20%23team-09-magmoa%20.layer-2%20%7B%20animation-delay%3A%20500ms%3B%20%7D%0A%20%20%20%20%40keyframes%20team-09-magmoa-enter%20%7B%0A%20%20%20%20%20%200%25%20%7B%20transform%3A%20scale(0)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2050%25%20%7B%20transform%3A%20scale(1.11)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2070%25%20%7B%20transform%3A%20scale(.96)%3B%20animation-timing-function%3A%20ease-out%3B%20%7D%0A%20%20%20%20%20%20100%25%20%7B%20transform%3A%20scale(1)%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20%40media%20(prefers-reduced-motion%3A%20reduce)%20%7B%0A%20%20%20%20%20%20%23team-09-magmoa%20.icon-layer%20%7B%20animation%3A%20none%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%3C%2Fstyle%3E%3Cg%20id%3D%22team-09-magmoa-layer-1%22%20class%3D%22icon-layer%20layer-1%22%3E%3Cpolygon%20points%3D%22117.34%2068.5%2067.06%2017.22%2016.13%2068.38%2067.4%20118.43%2066.86%2068.43%20117.34%2068.5%22%20fill%3D%22%234df4ff%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22117.96%20170.13%20168.66%20119.44%20117.34%2068.5%2067.4%20118.43%2015.94%20170.09%2066.83%20221.24%20117.42%20170.52%2066.82%20170.16%2067.05%20119.58%20117.96%20170.13%22%20fill%3D%22%234df4ff%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22169.2%20118.7%20219.73%2068.39%20168.7%2017.38%20118.3%2068.23%20168.73%2068.47%20169.2%20118.7%22%20fill%3D%22%234df4ff%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22169.04%20119.85%20168.73%20170.27%20118.35%20170.54%20169.01%20221.12%20219.83%20170.04%20169.04%20119.85%22%20fill%3D%22%234df4ff%22%3E%3C%2Fpolygon%3E%3C%2Fg%3E%3Cg%20id%3D%22team-09-magmoa-layer-2%22%20class%3D%22icon-layer%20layer-2%22%3E%3Cpath%20d%3D%22M-.16.02v84h24V24.02h60V.02H-.16ZM215.84%2C24.02v60h24V.02h-84v24h60ZM-.16%2C156.02v84h84v-24H23.84v-60H-.16ZM155.84%2C240.02h84v-84h-24v60h-60v24Z%22%20fill%3D%22%23536dea%22%20fill-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M134.2%2C52.94v-12.41h-33.1v12.41h33.1ZM51.45%2C135.69v-33.1h-12.41v33.1h12.41ZM196.26%2C135.69v-33.1h-12.41v33.1h12.41ZM134.2%2C197.75v-12.41h-33.1v12.41h33.1ZM107.31%2C119.14l10.34%2C10.34%2C10.34-10.34-10.34-10.34-10.34%2C10.34Z%22%20fill%3D%22%23536dea%22%20fill-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cstyle%3E*%20%7B%20animation%3A%20none%20!important%3B%20transition%3A%20none%20!important%3B%20%7D%3C%2Fstyle%3E%3C%2Fsvg%3E"},{"file":"team-10-ieoon.svg","src":"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20id%3D%22team-10-ieoon%22%20viewBox%3D%22-14%20-14%20268%20268%22%20role%3D%22img%22%20aria-labelledby%3D%22team-10-ieoon-title%22%3E%3Ctitle%20id%3D%22team-10-ieoon-title%22%3EIeoon%20animated%20icon%3C%2Ftitle%3E%3Cstyle%3E%0A%20%20%20%20%23team-10-ieoon%20.icon-layer%20%7B%0A%20%20%20%20%20%20transform-box%3A%20view-box%3B%0A%20%20%20%20%20%20transform-origin%3A%20120px%20120px%3B%0A%20%20%20%20%20%20animation%3A%20team-10-ieoon-enter%20700ms%20cubic-bezier(.22%2C%201%2C%20.36%2C%201)%20both%3B%0A%20%20%20%20%7D%0A%20%20%20%20%23team-10-ieoon%20.layer-1%20%7B%20animation-delay%3A%20120ms%3B%20%7D%0A%20%20%20%20%23team-10-ieoon%20.layer-2%20%7B%20animation-delay%3A%20500ms%3B%20%7D%0A%20%20%20%20%40keyframes%20team-10-ieoon-enter%20%7B%0A%20%20%20%20%20%200%25%20%7B%20transform%3A%20scale(0)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2050%25%20%7B%20transform%3A%20scale(1.11)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2070%25%20%7B%20transform%3A%20scale(.96)%3B%20animation-timing-function%3A%20ease-out%3B%20%7D%0A%20%20%20%20%20%20100%25%20%7B%20transform%3A%20scale(1)%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20%40media%20(prefers-reduced-motion%3A%20reduce)%20%7B%0A%20%20%20%20%20%20%23team-10-ieoon%20.icon-layer%20%7B%20animation%3A%20none%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%3C%2Fstyle%3E%3Cg%20id%3D%22team-10-ieoon-layer-1%22%20class%3D%22icon-layer%20layer-1%22%3E%3Cpath%20d%3D%22M147.49%2C226.94c-18.22%2C4.31-36.68%2C4.41-54.83-.04l-.37-39.62-28.41%2C27.73c-16.16-9.95-29.35-22.77-38.62-39.01l27.64-27.94-39.36-.16c-4.66-18.12-4.75-36.64-.06-54.89l39.15-.75-27.35-27.48c8.94-16.19%2C22.16-29.2%2C38.62-39.16l28.46%2C27.74.28-39.66c17.76-4.47%2C36.14-4.27%2C54.62-.15l.46%2C39.77%2C27.91-27.59c16.46%2C8.86%2C29.04%2C22.27%2C39.13%2C38.6l-27.8%2C28.38%2C39.61.27c4.61%2C18.3%2C4.51%2C36.73-.08%2C54.91l-39.38.16%2C27.31%2C27.6c-.72%2C4.91-4.8%2C7.03-7.05%2C10.45-7.92%2C12.07-18.69%2C20.97-31.46%2C29.04l-28.21-27.81-.23%2C39.59ZM120.18%2C158.92l38.48-38.99-38.52-38.51%2C27.06-27.57c-17.66-7.1-36.59-7.08-54.26-.02l26.77%2C27.6-38.57%2C38.91%2C39.04%2C38.58ZM80.77%2C119.63l-27.24-26.71c-6.95%2C18.14-7.39%2C36.73.18%2C54.69l27.06-27.98ZM186.53%2C147.42c7.11-18.42%2C7.12-36.4-.17-54.33l-27.4%2C27.21%2C27.57%2C27.11ZM147.01%2C186.41l-26.94-27.47-27.28%2C27.79c18.36%2C7.27%2C37.58%2C7.31%2C54.22-.32Z%22%20fill%3D%22%23ededea%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cg%20id%3D%22team-10-ieoon-layer-2%22%20class%3D%22icon-layer%20layer-2%22%3E%3Ccircle%20cx%3D%22119.84%22%20cy%3D%22118.02%22%20r%3D%2213.21%22%20fill%3D%22%234f00b4%22%3E%3C%2Fcircle%3E%3Cpath%20d%3D%22M240.1%2C95.81V-.17S141.63-.17%2C141.63-.17c49.47%2C8.76%2C88.67%2C47.03%2C98.48%2C95.98Z%22%20fill%3D%22%234f00b4%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M141.63%2C239.83h98.48v-95.98c-9.81%2C48.95-49.01%2C87.22-98.48%2C95.98Z%22%20fill%3D%22%234f00b4%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M98.58-.17H.1v95.98C9.91%2C46.86%2C49.12%2C8.59%2C98.58-.17Z%22%20fill%3D%22%234f00b4%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M.1%2C143.85v95.98h98.48C49.12%2C231.07%2C9.91%2C192.79.1%2C143.85Z%22%20fill%3D%22%234f00b4%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cstyle%3E*%20%7B%20animation%3A%20none%20!important%3B%20transition%3A%20none%20!important%3B%20%7D%3C%2Fstyle%3E%3C%2Fsvg%3E"},{"file":"team-11-byeolungwan.svg","src":"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20id%3D%22team-11-byeolungwan%22%20viewBox%3D%22-14%20-14%20268%20268%22%20role%3D%22img%22%20aria-labelledby%3D%22team-11-byeolungwan-title%22%3E%3Ctitle%20id%3D%22team-11-byeolungwan-title%22%3EByeolungwan%20animated%20icon%3C%2Ftitle%3E%3Cstyle%3E%0A%20%20%20%20%23team-11-byeolungwan%20.icon-layer%20%7B%0A%20%20%20%20%20%20transform-box%3A%20view-box%3B%0A%20%20%20%20%20%20transform-origin%3A%20120px%20120px%3B%0A%20%20%20%20%20%20animation%3A%20team-11-byeolungwan-enter%20700ms%20cubic-bezier(.22%2C%201%2C%20.36%2C%201)%20both%3B%0A%20%20%20%20%7D%0A%20%20%20%20%23team-11-byeolungwan%20.layer-1%20%7B%20animation-delay%3A%20120ms%3B%20%7D%0A%20%20%20%20%23team-11-byeolungwan%20.layer-2%20%7B%20animation-delay%3A%20500ms%3B%20%7D%0A%20%20%20%20%40keyframes%20team-11-byeolungwan-enter%20%7B%0A%20%20%20%20%20%200%25%20%7B%20transform%3A%20scale(0)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2050%25%20%7B%20transform%3A%20scale(1.11)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2070%25%20%7B%20transform%3A%20scale(.96)%3B%20animation-timing-function%3A%20ease-out%3B%20%7D%0A%20%20%20%20%20%20100%25%20%7B%20transform%3A%20scale(1)%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20%40media%20(prefers-reduced-motion%3A%20reduce)%20%7B%0A%20%20%20%20%20%20%23team-11-byeolungwan%20.icon-layer%20%7B%20animation%3A%20none%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%3C%2Fstyle%3E%3Cg%20id%3D%22team-11-byeolungwan-layer-1%22%20class%3D%22icon-layer%20layer-1%22%3E%3Cpath%20d%3D%22M.34.26v30h30V.26H.34ZM60.34%2C30.26V.26l-30%2C30h30ZM.34%2C60.26h30v-30L.34%2C60.26ZM90.34%2C90.26l-30%2C30%2C30%2C30%2C30%2C30%2C30-30%2C30-30-30-30-30-30-30%2C30ZM30.34%2C180.26H.34l30%2C30v-30ZM30.34%2C210.26H.34v30h30v-30ZM60.34%2C240.26v-30h-30l30%2C30ZM180.34.26v30h30L180.34.26ZM210.34%2C30.26h30V.26h-30v30ZM210.34%2C60.26h30l-30-30v30ZM240.34%2C180.26h-30v30l30-30ZM180.34%2C210.26v30l30-30h-30ZM240.34%2C240.26v-30h-30v30h30Z%22%20fill%3D%22%23d5c8ac%22%20fill-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cg%20id%3D%22team-11-byeolungwan-layer-2%22%20class%3D%22icon-layer%20layer-2%22%3E%3Cpath%20d%3D%22M60.34%2C60.26h120v-30h-30V.26h-60v30h-30v30ZM.34%2C120.26v30h30v30h30V60.26h-30v30H.34v30ZM180.34%2C120.26v60h30v-30h30v-60h-30v-30h-30v60ZM60.34%2C210.26h30v30h60v-30h30v-30H60.34v30Z%22%20fill%3D%22%23065182%22%20fill-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cstyle%3E*%20%7B%20animation%3A%20none%20!important%3B%20transition%3A%20none%20!important%3B%20%7D%3C%2Fstyle%3E%3C%2Fsvg%3E"},{"file":"team-12-kokorang.svg","src":"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20id%3D%22team-12-kokorang%22%20viewBox%3D%22-14%20-14%20268%20268%22%20role%3D%22img%22%20aria-labelledby%3D%22team-12-kokorang-title%22%3E%3Ctitle%20id%3D%22team-12-kokorang-title%22%3EKokorang%20animated%20icon%3C%2Ftitle%3E%3Cstyle%3E%0A%20%20%20%20%23team-12-kokorang%20.icon-layer%20%7B%0A%20%20%20%20%20%20transform-box%3A%20view-box%3B%0A%20%20%20%20%20%20transform-origin%3A%20120px%20120px%3B%0A%20%20%20%20%20%20animation%3A%20team-12-kokorang-enter%20700ms%20cubic-bezier(.22%2C%201%2C%20.36%2C%201)%20both%3B%0A%20%20%20%20%7D%0A%20%20%20%20%23team-12-kokorang%20.layer-1%20%7B%20animation-delay%3A%20120ms%3B%20%7D%0A%20%20%20%20%23team-12-kokorang%20.layer-2%20%7B%20animation-delay%3A%20500ms%3B%20%7D%0A%20%20%20%20%40keyframes%20team-12-kokorang-enter%20%7B%0A%20%20%20%20%20%200%25%20%7B%20transform%3A%20scale(0)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2050%25%20%7B%20transform%3A%20scale(1.11)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2070%25%20%7B%20transform%3A%20scale(.96)%3B%20animation-timing-function%3A%20ease-out%3B%20%7D%0A%20%20%20%20%20%20100%25%20%7B%20transform%3A%20scale(1)%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20%40media%20(prefers-reduced-motion%3A%20reduce)%20%7B%0A%20%20%20%20%20%20%23team-12-kokorang%20.icon-layer%20%7B%20animation%3A%20none%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%3C%2Fstyle%3E%3Cg%20id%3D%22team-12-kokorang-layer-1%22%20class%3D%22icon-layer%20layer-1%22%3E%3Cpath%20d%3D%22M210.05%2C90.24l29.95-30.03L179.97.56l-30.06%2C29.38L119.91.47l-30.07%2C29.62L60.08.35%2C0%2C60.24l30.15%2C29.89%2C60-59.82%2C29.6%2C29.87c-30.36.12-55.33%2C22.81-59.14%2C52.16-.37%2C2.48-.65%2C5-.73%2C7.58l-29.82-29.48L.04%2C120.26l29.95%2C29.58%2C29.95-28.73c.06%2C1.6.24%2C3.15.41%2C4.71.02.22.03.44.06.66.12.95.28%2C1.88.43%2C2.82.21%2C1.36.44%2C2.71.74%2C4.04%2C0%2C.03.02.06.02.09%2C1.31%2C5.75%2C3.42%2C11.18%2C6.25%2C16.17.14.24.29.47.43.71.79%2C1.34%2C1.6%2C2.67%2C2.48%2C3.94.42.6.87%2C1.17%2C1.31%2C1.75.67.89%2C1.33%2C1.8%2C2.05%2C2.65.63.75%2C1.3%2C1.44%2C1.96%2C2.16.62.67%2C1.22%2C1.36%2C1.87%2C2%2C.64.63%2C1.33%2C1.21%2C1.99%2C1.81.77.7%2C1.54%2C1.41%2C2.35%2C2.07.38.31.79.58%2C1.18.88%2C10.1%2C7.79%2C22.71%2C12.47%2C36.44%2C12.49l-29.52%2C30.09%2C29.51%2C29.53%2C30.12-29.33%2C29.83%2C29.53%2C59.76-59.71-29.34-29.85%2C29.64-30.37-29.85-29.71ZM209.53%2C89.68l-29.38%2C30.23c-.1-2.75-.42-5.44-.83-8.08-4.03-29.06-28.84-51.47-58.97-51.64l29.36-29.58%2C59.83%2C59.07ZM149.93%2C209.94l-29.76-29.64c5.37-.17%2C10.47-1.01%2C15.32-2.33.87-.23%2C1.76-.43%2C2.61-.7.55-.17%2C1.07-.4%2C1.6-.59%2C1.3-.45%2C2.6-.9%2C3.85-1.44%2C1.45-.62%2C2.85-1.32%2C4.23-2.04.27-.14.55-.25.81-.39%2C10.27-5.54%2C18.56-13.86%2C24.07-24.06.29-.53.52-1.09.79-1.63.57-1.13%2C1.15-2.24%2C1.64-3.41.44-1.03.81-2.11%2C1.19-3.17.28-.77.59-1.52.84-2.31.21-.67.37-1.37.56-2.05%2C1.39-4.9%2C2.27-10.04%2C2.47-15.42l29.64%2C29.18-59.89%2C59.99Z%22%20fill%3D%22%23ffba79%22%3E%3C%2Fpath%3E%3Cpolygon%20points%3D%22.4%20180.23%2060.26%20239.84%2089.87%20210.08%2030.05%20150.26%20.4%20180.23%22%20fill%3D%22%23ffba79%22%3E%3C%2Fpolygon%3E%3C%2Fg%3E%3Cg%20id%3D%22team-12-kokorang-layer-2%22%20class%3D%22icon-layer%20layer-2%22%3E%3Cpath%20d%3D%22M193.67.12h46.33v46.33h-46.33V.12ZM240%2C240.12h-46.33v-46.33h46.33v46.33ZM90.54%2C132.75v-25.26l16.83-16.83h25.26l16.83%2C16.83v25.26l-16.83%2C16.83h-25.26l-16.83-16.83ZM46.33.12v46.33H0V.12h46.33ZM46.33%2C193.79v46.33H0v-46.33h46.33Z%22%20fill%3D%22%23ff7154%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cstyle%3E*%20%7B%20animation%3A%20none%20!important%3B%20transition%3A%20none%20!important%3B%20%7D%3C%2Fstyle%3E%3C%2Fsvg%3E"},{"file":"team-13-effect.svg","src":"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20id%3D%22team-13-effect%22%20viewBox%3D%22-14%20-14%20268%20268%22%20role%3D%22img%22%20aria-labelledby%3D%22team-13-effect-title%22%3E%3Ctitle%20id%3D%22team-13-effect-title%22%3EEffect%20animated%20icon%3C%2Ftitle%3E%3Cstyle%3E%0A%20%20%20%20%23team-13-effect%20.icon-layer%20%7B%0A%20%20%20%20%20%20transform-box%3A%20view-box%3B%0A%20%20%20%20%20%20transform-origin%3A%20120px%20120px%3B%0A%20%20%20%20%20%20animation%3A%20team-13-effect-enter%20700ms%20cubic-bezier(.22%2C%201%2C%20.36%2C%201)%20both%3B%0A%20%20%20%20%7D%0A%20%20%20%20%23team-13-effect%20.layer-1%20%7B%20animation-delay%3A%20120ms%3B%20%7D%0A%20%20%20%20%23team-13-effect%20.layer-2%20%7B%20animation-delay%3A%20500ms%3B%20%7D%0A%20%20%20%20%40keyframes%20team-13-effect-enter%20%7B%0A%20%20%20%20%20%200%25%20%7B%20transform%3A%20scale(0)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2050%25%20%7B%20transform%3A%20scale(1.11)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2070%25%20%7B%20transform%3A%20scale(.96)%3B%20animation-timing-function%3A%20ease-out%3B%20%7D%0A%20%20%20%20%20%20100%25%20%7B%20transform%3A%20scale(1)%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20%40media%20(prefers-reduced-motion%3A%20reduce)%20%7B%0A%20%20%20%20%20%20%23team-13-effect%20.icon-layer%20%7B%20animation%3A%20none%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%3C%2Fstyle%3E%3Cg%20id%3D%22team-13-effect-layer-1%22%20class%3D%22icon-layer%20layer-1%22%3E%3Cpath%20d%3D%22M167.3%2C9.57l-.47-4.77-.17-4.8h73.33v73.33l-4.8-.17-4.77-.47-4.73-.77-4.67-1.1-4.6-1.4-4.5-1.67-4.37-2-4.23-2.27-4.07-2.53-3.9-2.8-3.73-3.03-3.5-3.27-3.27-3.5-3.03-3.73-2.8-3.9-2.53-4.07-2.27-4.23-2-4.37-1.67-4.5-1.4-4.6-1.1-4.67-.77-4.73ZM235.2%2C166.83l4.8-.17v73.33h-73.33l.17-4.8.47-4.77.77-4.73%2C1.1-4.67%2C1.4-4.6%2C1.67-4.5%2C2-4.37%2C2.27-4.23%2C2.53-4.07%2C2.8-3.9%2C3.03-3.73%2C3.27-3.5%2C3.5-3.27%2C3.73-3.03%2C3.9-2.8%2C4.07-2.53%2C4.23-2.27%2C4.37-2%2C4.5-1.67%2C4.6-1.4%2C4.67-1.1%2C4.73-.77%2C4.77-.47ZM163.33%2C120l-.37%2C5.67-1.1%2C5.53-.83%2C2.73-2.17%2C5.23-1.33%2C2.5-1.5%2C2.4-3.47%2C4.5-4%2C4-2.2%2C1.8-4.7%2C3.17-2.5%2C1.33-5.23%2C2.17-2.73.83-5.53%2C1.1-2.83.27-2.83.1-5.67-.37-2.8-.47-5.47-1.47-2.63-1-5.1-2.5-4.7-3.17-2.2-1.8-4-4-1.8-2.2-3.17-4.7-1.33-2.5-2.17-5.23-.83-2.73-1.1-5.53-.27-2.83-.1-2.83.37-5.67%2C1.1-5.53.83-2.73%2C1-2.63%2C2.5-5.1%2C3.17-4.7%2C1.8-2.2%2C4-4%2C2.2-1.8%2C2.3-1.67%2C4.9-2.83%2C2.6-1.17%2C5.37-1.83%2C5.53-1.1%2C2.83-.27%2C2.83-.1%2C5.67.37%2C5.53%2C1.1%2C2.73.83%2C2.63%2C1%2C5.1%2C2.5%2C2.4%2C1.5%2C4.5%2C3.47%2C4%2C4%2C1.8%2C2.2%2C1.67%2C2.3%2C2.83%2C4.9%2C2.17%2C5.23.83%2C2.73%2C1.1%2C5.53.37%2C5.67ZM9.57%2C72.7l-4.77.47-4.8.17V0h73.33l-.17%2C4.8-.47%2C4.77-.77%2C4.73-1.1%2C4.67-1.4%2C4.6-1.67%2C4.5-2%2C4.37-2.27%2C4.23-2.53%2C4.07-2.8%2C3.9-3.03%2C3.73-3.27%2C3.5-3.5%2C3.27-3.73%2C3.03-3.9%2C2.8-4.07%2C2.53-4.23%2C2.27-4.37%2C2-4.5%2C1.67-4.6%2C1.4-4.67%2C1.1-4.73.77ZM70.83%2C221.03l1.1%2C4.67.77%2C4.73.47%2C4.77.17%2C4.8H0v-73.33l4.8.17%2C4.77.47%2C4.73.77%2C4.67%2C1.1%2C4.6%2C1.4%2C4.5%2C1.67%2C4.37%2C2%2C4.23%2C2.27%2C4.07%2C2.53%2C3.9%2C2.8%2C3.73%2C3.03%2C3.5%2C3.27%2C3.27%2C3.5%2C3.03%2C3.73%2C2.8%2C3.9%2C2.53%2C4.07%2C2.27%2C4.23%2C2%2C4.37%2C1.67%2C4.5%2C1.4%2C4.6Z%22%20fill%3D%22%2350c4a6%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cg%20id%3D%22team-13-effect-layer-2%22%20class%3D%22icon-layer%20layer-2%22%3E%3Cpath%20d%3D%22M132.22%2C10l97.78%2C97.78h-97.78V10ZM230%2C132.22l-97.78%2C97.78v-97.78h97.78ZM10%2C107.78L107.78%2C10v97.78H10ZM107.78%2C230L10%2C132.22h97.78v97.78Z%22%20fill%3D%22%23178466%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cstyle%3E*%20%7B%20animation%3A%20none%20!important%3B%20transition%3A%20none%20!important%3B%20%7D%3C%2Fstyle%3E%3C%2Fsvg%3E"},{"file":"team-14-jikji-jamboree.svg","src":"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20id%3D%22team-14-jikji-jamboree%22%20viewBox%3D%22-14%20-14%20268%20268%22%20role%3D%22img%22%20aria-labelledby%3D%22team-14-jikji-jamboree-title%22%3E%3Ctitle%20id%3D%22team-14-jikji-jamboree-title%22%3EJikji%20Jamboree%20animated%20icon%3C%2Ftitle%3E%3Cstyle%3E%0A%20%20%20%20%23team-14-jikji-jamboree%20.icon-layer%20%7B%0A%20%20%20%20%20%20transform-box%3A%20view-box%3B%0A%20%20%20%20%20%20transform-origin%3A%20120px%20120px%3B%0A%20%20%20%20%20%20animation%3A%20team-14-jikji-jamboree-enter%20700ms%20cubic-bezier(.22%2C%201%2C%20.36%2C%201)%20both%3B%0A%20%20%20%20%7D%0A%20%20%20%20%23team-14-jikji-jamboree%20.layer-1%20%7B%20animation-delay%3A%20120ms%3B%20%7D%0A%20%20%20%20%40keyframes%20team-14-jikji-jamboree-enter%20%7B%0A%20%20%20%20%20%200%25%20%7B%20transform%3A%20scale(0)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2050%25%20%7B%20transform%3A%20scale(1.11)%3B%20animation-timing-function%3A%20ease-in-out%3B%20%7D%0A%20%20%20%20%20%2070%25%20%7B%20transform%3A%20scale(.96)%3B%20animation-timing-function%3A%20ease-out%3B%20%7D%0A%20%20%20%20%20%20100%25%20%7B%20transform%3A%20scale(1)%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20%40media%20(prefers-reduced-motion%3A%20reduce)%20%7B%0A%20%20%20%20%20%20%23team-14-jikji-jamboree%20.icon-layer%20%7B%20animation%3A%20none%3B%20%7D%0A%20%20%20%20%7D%0A%20%20%3C%2Fstyle%3E%3Cg%20id%3D%22team-14-jikji-jamboree-layer-1%22%20class%3D%22icon-layer%20layer-1%22%3E%3Cpath%20fill%3D%22%23fbe19f%22%20d%3D%22M160.68%2C183.3l22.62-22.62%2C56.7%2C56.7v2.61l-20.01%2C20.01h-2.61l-56.7-56.7ZM219.99%2C0l20.01%2C20.01v2.61l-56.7%2C56.7-22.62-22.62L217.38%2C0h2.61ZM135.99%2C218.01l-15.99%2C15.99-15.99-15.99v-82.02H21.99l-15.99-15.99%2C15.99-15.99h82.02V21.99l15.99-15.99%2C15.99%2C15.99v82.02h82.02l15.99%2C15.99-15.99%2C15.99h-82.02v82.02ZM0%2C219.99v-2.61l56.7-56.7%2C22.62%2C22.62-56.7%2C56.7h-2.61L0%2C219.99ZM79.32%2C56.7l-22.62%2C22.62L0%2C22.62v-2.61L20.01%2C0h2.61l56.7%2C56.7Z%22%20%2F%3E%3C%2Fg%3E%3Cstyle%3E*%20%7B%20animation%3A%20none%20!important%3B%20transition%3A%20none%20!important%3B%20%7D%3C%2Fstyle%3E%3C%2Fsvg%3E"}];
  const iconImages=iconSources.map(({src})=>{const image=new Image();image.src=src;return image;});
  const iconsReady=Promise.all(iconImages.map(image=>image.decode().catch(()=>null)));
  const pixelDuration=Math.max(500,Number(options.durationMs)||1120);
  const contentDuration=Math.max(500,Number(options.contentDurationMs)||1760);
  const scatterDuration=Math.max(200,Number(options.scatterDurationMs)||480);
  const coverStart=scatterDuration*.65;
  const revealStart=coverStart+pixelDuration*.5;
  const incomingStart=revealStart-pixelDuration*.08;
  const totalDuration=Math.max(coverStart+pixelDuration,contentDuration,revealStart+500);
  const ns='http://www.w3.org/2000/svg';
  const svgNode=(name,attributes={})=>{
    const node=document.createElementNS(ns,name);
    for(const [key,value] of Object.entries(attributes))node.setAttribute(key,value);
    return node;
  };
  const overlay=document.createElement('div');
  overlay.className='project-wave project-pixel';
  overlay.setAttribute('aria-hidden','true');
  const svg=svgNode('svg',{preserveAspectRatio:'none',width:'100%',height:'100%'});
  svg.style.cssText='display:block;width:100%;height:100%';
  overlay.append(svg);
  document.body.append(overlay);
  const makeLayer=()=>{
    const foreign=svgNode('foreignObject',{x:0,y:0});
    const canvas=document.createElement('canvas');
    canvas.style.cssText='display:block;width:100%;height:100%';
    foreign.append(canvas);svg.append(foreign);
    return {foreign,canvas,context:canvas.getContext('2d')};
  };
  const oldLayer=makeLayer(),newLayer=makeLayer();
  const leftLayer=makeLayer();
  leftLayer.canvas.dataset.pixelLeft='true';
  const tiles=svgNode('g',{'data-pixel-grid':'true'});
  svg.append(tiles);
  let gridKey='',cells=[];
  function layoutGrid(w,h){
    const size=Math.max(24,Math.min(160,Number(options.cellSize)||144));
    const columns=Math.ceil(w/size),rows=Math.ceil(h/size);
    const key=columns+':'+rows;
    if(key!==gridKey){
      gridKey=key;tiles.replaceChildren();
      // Balance the 14 icons, then shuffle the whole grid once per transition.
      const sources=Array.from({length:columns*rows},(_,i)=>iconSources[i%iconSources.length]);
      for(let i=sources.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [sources[i],sources[j]]=[sources[j],sources[i]];
      }
      cells=Array.from({length:columns*rows},(_,i)=>{
        const rect=svgNode('rect',{fill:options.color,'shape-rendering':'crispEdges'});
        const source=sources[i];
        const icon=svgNode('image',{href:source?.src||'',preserveAspectRatio:'xMidYMid meet','data-pixel-icon':source?.file||''});
        tiles.append(rect,icon);
        // Stable per-cell jitter breaks rows into individual squares.
        const random=(Math.sin((i+1)*127.1)*43758.5453)%1;
        return {rect,icon,column:i%columns,row:Math.floor(i/columns),random:Math.abs(random)};
      });
      const weights=cells.map(cell=>{
        const row=job.direction>0?cell.row:rows-1-cell.row;
        return row/Math.max(1,rows-1)*.45+cell.random*.55;
      });
      const first=Math.min(...weights),last=Math.max(...weights);
      // Stretch the stagger to both endpoints: no pause at full coverage.
      cells.forEach((cell,i)=>{cell.delay=(weights[i]-first)/Math.max(1e-6,last-first)*.65;});
    }
    return {size,columns,rows,offsetX:(w-columns*size)/2,offsetY:(h-rows*size)/2};
  }
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const cache=new Map();
  let job=null,frame=0,generation=0,completed=0;
  const clamp=t=>Math.max(0,Math.min(1,t));
  const ease=t=>{t=clamp(t);return t*t*t*(t*(t*6-15)+10);};
  async function prepare(source){
    const url=new URL(source,document.baseURI).href;
    if(!cache.has(url)){
      const image=new Image();
      image.crossOrigin='anonymous';image.src=url;
      const promise=image.decode().then(()=>image);
      cache.set(url,promise);
      promise.catch(()=>cache.delete(url));
      while(cache.size>4)cache.delete(cache.keys().next().value);
    }
    return cache.get(url);
  }
  function readTint(){
    const element=document.querySelector('.gradient');
    if(!element||!element.getClientRects().length)return null;
    const style=getComputedStyle(element);
    return style.visibility==='visible'?{color:style.backgroundColor,opacity:Number(style.opacity)}:null;
  }
  function paintLayer(layer,image,content,incoming,w,h,ratio,shiftY=0){
    const canvas=layer.canvas,ctx=layer.context;
    const width=Math.max(1,Math.round(w*ratio)),height=Math.max(1,Math.round(h*ratio));
    if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;}
    layer.foreign.setAttribute('width',w);layer.foreign.setAttribute('height',h);
    ctx.setTransform(ratio,0,0,ratio,0,0);
    ctx.clearRect(0,0,w,h);
    // Grow the cover crop with the translation, keeping every viewport edge filled.
    const scale=Math.max(w/image.naturalWidth,h/image.naturalHeight)*(1+2*Math.abs(shiftY)/h);
    const iw=image.naturalWidth*scale,ih=image.naturalHeight*scale;
    ctx.drawImage(image,(w-iw)/2,(h-ih)/2+shiftY,iw,ih);
    canvas.dataset.imageShiftY=shiftY.toFixed(3);
    if(job.tint){ctx.save();ctx.globalAlpha=job.tint.opacity;ctx.fillStyle=job.tint.color;ctx.fillRect(0,0,w,h);ctx.restore();}
    if(content){
      // Ambient pieces keep flowing; each scene's title and assembled icon stay in place.
      content.renderCodeFrame?.(incoming?1:0,incoming,job.direction);
      ctx.drawImage(content,0,0,w,h);
    }
  }
  function paint(progress){
    if(!job)return;
    const elapsed=progress*totalDuration;
    const maskProgress=clamp((elapsed-coverStart)/pixelDuration);
    const outgoingProgress=clamp(elapsed/scatterDuration);
    const incomingProgress=clamp((elapsed-incomingStart)/(totalDuration-incomingStart));
    const contentProgress=progress;
    const r=job.target.getBoundingClientRect(),w=Math.max(1,r.width),h=Math.max(1,r.height);
    const header=document.querySelector('.header');
    const z=parseInt(header?getComputedStyle(header).zIndex:'1000',10);
    Object.assign(overlay.style,{left:`${r.left}px`,top:`${r.top}px`,width:`${w}px`,height:`${h}px`,zIndex:String(Number.isFinite(z)&&z>1?z-1:999)});
    svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
    const grid=layoutGrid(w,h);
    const ratio=Math.min(devicePixelRatio||1,1.5);
    const imageShift=job.direction*Math.min(48,h*.06)*ease(maskProgress/.5);
    paintLayer(oldLayer,job.from,job.foreground,false,w,h,ratio,imageShift);
    if(job.incoming)paintLayer(newLayer,job.to,job.incoming,true,w,h,ratio);
    // Overlap the motion tails; keep the scene handoff hidden beneath closed pixels.
    const leftCanvas=leftLayer.canvas,leftContext=leftLayer.context;
    const width=Math.max(1,Math.round(w*ratio)),height=Math.max(1,Math.round(h*ratio));
    if(leftCanvas.width!==width||leftCanvas.height!==height){leftCanvas.width=width;leftCanvas.height=height;}
    leftLayer.foreign.setAttribute('width',w);leftLayer.foreign.setAttribute('height',h);
    leftContext.setTransform(ratio,0,0,ratio,0,0);
    leftContext.clearRect(0,0,w,h);
    const handoff=job.incoming&&maskProgress>=.5?1:0;
    for(const [content,incoming,opacity] of [[job.foreground?.leftLayer,false,1-handoff],[job.incoming?.leftLayer,true,handoff]]){
      if(!content||opacity===0)continue;
      content.renderCodeFrame(incoming?incomingProgress:outgoingProgress,incoming,job.direction);
      leftContext.globalAlpha=opacity;
      leftContext.drawImage(content,0,0,w,h);
    }
    leftContext.globalAlpha=1;
    // Switch images only while every square is fully opaque.
    newLayer.foreign.style.visibility=maskProgress>=.5?'visible':'hidden';
    const covering=maskProgress<.5;
    const phase=covering?maskProgress/.5:(maskProgress-.5)/.5;
    cells.forEach(({rect,icon,column,row,delay})=>{
      const amount=covering?ease((phase-delay)/.35):1-ease((phase-delay)/.35);
      const size=(grid.size+1)*amount;
      rect.setAttribute('x',grid.offsetX+(column+.5)*grid.size-size/2);
      rect.setAttribute('y',grid.offsetY+(row+.5)*grid.size-size/2);
      rect.setAttribute('width',size);
      rect.setAttribute('height',size);
      const iconSize=grid.size*.94*amount;
      icon.setAttribute('x',grid.offsetX+(column+.5)*grid.size-iconSize/2);
      icon.setAttribute('y',grid.offsetY+(row+.5)*grid.size-iconSize/2);
      icon.setAttribute('width',iconSize);
      icon.setAttribute('height',iconSize);
    });
    overlay.dataset.pixelPhase=elapsed<coverStart?'scattering':maskProgress<.5?'covering':maskProgress<1?'uncovering':'clear';
    overlay.dataset.scatterProgress=outgoingProgress.toFixed(3);
    overlay.dataset.incomingProgress=incomingProgress.toFixed(3);
    overlay.dataset.cellCount=String(cells.length);
    overlay.dataset.progress=progress.toFixed(3);
    overlay.dataset.maskProgress=maskProgress.toFixed(3);
    overlay.dataset.contentProgress=contentProgress.toFixed(3);
  }
  function finish(success){
    cancelAnimationFrame(frame);frame=0;
    const previous=job;job=null;
    overlay.classList.remove('is-active');overlay.dataset.phase='idle';
    document.documentElement.classList.remove('project-wave-running');
    if(success)completed++;
    previous?.resolve(success);
  }
  function tick(now){
    if(!job)return;
    const dt=Math.min(48,now-job.last);job.last=now;
    if(job.preparing){paint(0);frame=requestAnimationFrame(tick);return;}
    const duration=totalDuration,s=job.scrub;
    if(s&&!s.committed){
      if(now-s.lastInput>=s.returnDelay){
        if(job.returnStarted==null){job.returnStarted=now;job.returnFrom=job.progress;}
        const t=clamp((now-job.returnStarted)/s.returnDuration);
        job.progress=job.returnFrom*(1-ease(t));
        s.progress=job.progress;s.distance=s.progress*s.distanceScale;
        overlay.dataset.phase='returning';
        if(t===1){paint(0);finish(false);return;}
      }else{
        if(job.returnStarted!=null||job.goal!==s.progress){job.start=job.progress;job.goal=s.progress;job.followTime=now;job.returnStarted=null;}
        const t=clamp((now-job.followTime)/160);
        job.progress=job.start+(job.goal-job.start)*ease(t);
        overlay.dataset.phase='scrubbing';
        if(t===1&&s.progress===0){paint(0);finish(false);return;}
      }
    }else{job.progress=clamp(job.progress+dt/duration);overlay.dataset.phase='revealing';}
    paint(job.progress);
    if(job.progress===1){job.swap();finish(true);return;}
    frame=requestAnimationFrame(tick);
  }
  async function transition({direction=1,swap,preview,from,to,target,scrub=null,foreground=null}){
    if(job)return false;
    const current=++generation;
    if(reduced.matches){await swap();return true;}
    let images;
    try{images=await Promise.all([prepare(from),prepare(to),iconsReady]);}
    catch(error){
      console.warn('[ProjectPixel] Image unavailable',error);
      return false;
    }
    if(current!==generation)return false;
    if(reduced.matches){await swap();return true;}
    gridKey='';
    return new Promise(resolve=>{
      const active=job={direction:Math.sign(direction)||1,swap,target,scrub,foreground,resolve,
        from:images[0],to:images[1],tint:readTint(),progress:0,last:performance.now(),preparing:true};
      paint(0);overlay.classList.add('is-active');overlay.dataset.phase='preparing';
      document.documentElement.classList.add('project-wave-running');
      frame=requestAnimationFrame(tick);
      Promise.resolve().then(()=>preview?.()).then(content=>{
        if(job!==active)return;
        active.incoming=content || document.createElement('canvas');
        active.preparing=false;active.last=performance.now();
        overlay.dataset.incomingControls=String(content?.codeContent?.controlCount||0);
        overlay.dataset.incomingIcons=String(content?.codeContent?.iconCount||0);
        overlay.dataset.leftIcons=String(content?.leftLayer?.codeContent?.iconCount||0);
        if(active.skipMotion){active.swap();finish(true);}
      }).catch(error=>{console.error('[ProjectPixel]',error);if(job===active)finish(false);});
    });
  }
  function cancel(){generation++;finish(false);}
  reduced.addEventListener('change',()=>{
    if(!reduced.matches||!job)return;
    if(job.scrub&&!job.scrub.committed){finish(false);return;}
    if(job.preparing){job.skipMotion=true;return;}
    job.swap();finish(true);
  });
  window.ProjectWave=window.ProjectPixel=Object.freeze({ready:Promise.resolve(),prepare,captureForeground,transition,cancel,
    get state(){return {busy:!!job,phase:overlay.dataset.phase||'idle',completed,progress:Number(overlay.dataset.progress||0),maskProgress:Number(overlay.dataset.maskProgress||0),contentProgress:Number(overlay.dataset.contentProgress||0)};}});
// Build input: capture the project foreground and controls, excluding the header.
const asciiControlImages = new Map();
async function captureProjectControls(bounds, ratio) {
  const layer = document.createElement('canvas');
  layer.width = Math.max(1,Math.round(bounds.width*ratio));
  layer.height = Math.max(1,Math.round(bounds.height*ratio));
  const context = layer.getContext('2d');
  context.scale(ratio,ratio);
  context.translate(-bounds.left,-bounds.top);
  const root = document.querySelector('.project-description .project-warp');
  const visible = element => {
    const rect=element.getBoundingClientRect(), style=getComputedStyle(element);
    return rect.width>0 && rect.height>0 && style.visibility==='visible' && Number(style.opacity)>0;
  };
  let count=0;
  if (root && visible(root)) {
    for (const element of root.querySelectorAll('input,button')) {
      if (!visible(element)) continue;
      const rect=element.getBoundingClientRect(), style=getComputedStyle(element);
      const border=parseFloat(style.borderTopWidth)||0;
      const radius=Math.min(parseFloat(style.borderTopLeftRadius)||0,rect.width/2,rect.height/2);
      context.save();
      context.globalAlpha=Number(style.opacity);
      context.beginPath();
      context.roundRect(rect.left+border/2,rect.top+border/2,rect.width-border,rect.height-border,Math.max(0,radius-border/2));
      context.fillStyle=style.backgroundColor;
      context.fill();
      if (border) {
        context.strokeStyle=style.borderTopColor;
        context.lineWidth=border;
        context.stroke();
      }
      if (element.matches('input')) {
        context.clip();
        const text=element.value || element.placeholder;
        const textStyle=element.value?style:getComputedStyle(element,'::placeholder');
        context.globalAlpha*=Number(textStyle.opacity);
        context.font=`${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        context.fillStyle=textStyle.color;
        context.textBaseline='middle';
        context.fillText(text,rect.left+border+parseFloat(style.paddingLeft)-element.scrollLeft,rect.top+rect.height/2);
      }
      context.restore();
      count++;
    }
    // Draw images after the input surfaces: the search symbol overlays its input.
    for (const element of root.querySelectorAll('img')) {
      if (!visible(element)) continue;
      const url=element.currentSrc || element.src;
      if (!asciiControlImages.has(url)) {
        const image=new Image();
        image.crossOrigin='anonymous';
        image.src=url;
        const promise=image.decode().then(()=>image);
        asciiControlImages.set(url,promise);
        promise.catch(()=>asciiControlImages.delete(url));
      }
      const image=await asciiControlImages.get(url);
      const rect=element.getBoundingClientRect(), style=getComputedStyle(element);
      context.save();
      context.globalAlpha=Number(style.opacity);
      context.filter=style.filter;
      context.drawImage(image,rect.left,rect.top,rect.width,rect.height);
      context.restore();
    }
  }
  layer.controlCount=count;
  return layer;
}

async function capturePixelLayer(target, {includeHidden = false, iconMotion = [], leftOnly = false} = {}) {
  if (!leftOnly) iconMotion=[];
  const bounds = target.getBoundingClientRect();
  const ratio = Math.min(devicePixelRatio || 1, 1.5);
  const controls = leftOnly ? document.createElement('canvas') : await captureProjectControls(bounds,ratio);
  const surface = document.createElement('canvas');
  surface.width = Math.max(1, Math.round(bounds.width * ratio));
  surface.height = Math.max(1, Math.round(bounds.height * ratio));
  const ctx = surface.getContext('2d');
  ctx.scale(ratio, ratio);
  ctx.translate(-bounds.left, -bounds.top);
  let textRuns = 0;
  const selectors = leftOnly ? '.project-dial-item.is-active .project-dial-title, .title-section .project-title, .project-info, .desktop-slide-description' : ':not(*)';
  for (const element of document.querySelectorAll(selectors)) {
    if (!element.getClientRects().length) continue;
    const parentStyle = getComputedStyle(element);
    if (!includeHidden && (parentStyle.visibility === 'hidden' || Number(parentStyle.opacity) === 0)) continue;
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.textContent.trim()) continue;
      const style = getComputedStyle(node.parentElement);
      if (style.display === 'none' || (!includeHidden && style.visibility === 'hidden')) continue;
      ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      ctx.fillStyle = style.color;
      ctx.textBaseline = 'alphabetic';
      ctx.textAlign = 'left';
      if ('letterSpacing' in ctx) ctx.letterSpacing = style.letterSpacing === 'normal' ? '0px' : style.letterSpacing;
      const metrics = ctx.measureText('Mg');
      const ascent = metrics.fontBoundingBoxAscent ?? parseFloat(style.fontSize) * .8;
      const descent = metrics.fontBoundingBoxDescent ?? parseFloat(style.fontSize) * .2;
      const range = document.createRange();
      let offset = 0, line = null;
      const flush = () => {
        if (!line) return;
        const baseline = line.top + (line.height - ascent - descent) / 2 + ascent;
        ctx.fillText(line.text, line.left, baseline);
        textRuns++;
      };
      for (const character of node.textContent) {
        range.setStart(node, offset);
        offset += character.length;
        range.setEnd(node, offset);
        const rect = range.getBoundingClientRect();
        if (!rect.width || !rect.height) continue;
        if (!line || Math.abs(rect.top - line.top) > 1) {
          flush();
          line = {left:rect.left, top:rect.top, height:rect.height, text:character};
        } else line.text += character;
      }
      flush();
    }
  }
  const textLayer = document.createElement('canvas');
  textLayer.width = surface.width;
  textLayer.height = surface.height;
  textLayer.getContext('2d').drawImage(surface, 0, 0);
  const decodeSvg = async svg => {
    const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)], {type:'image/svg+xml'}));
    try {
      const image = new Image();
      image.src = url;
      await image.decode();
      return image;
    } finally { URL.revokeObjectURL(url); }
  };
  const icons = leftOnly ? document.querySelector('.project-icon-field') : null;
  let fieldImage = null, fieldRect = null, pieceAtlas = null;
  let iconCount = 0;
  if (icons && getComputedStyle(icons).visibility !== 'hidden') {
    const rect = icons.getBoundingClientRect();
    if (rect.width && rect.height) {
      const copy = icons.cloneNode(true);
      copy.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      copy.setAttribute('width', String(rect.width));
      copy.setAttribute('height', String(rect.height));
      copy.removeAttribute('class');
      copy.removeAttribute('style');
      iconCount = copy.querySelectorAll('[data-piece]').length;
      // Rasterize all moving pieces once into an atlas, never serialize SVG per frame.
      if (iconMotion.length) {
        const movingGroups = new Set(iconMotion.map(piece=>piece.node.parentElement.dataset.projectId));
        [...copy.children].filter(group=>movingGroups.has(group.dataset.projectId)).forEach(group=>group.remove());
        const sheet = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        sheet.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        sheet.setAttribute('width', String(128 * Math.min(16,iconMotion.length)));
        sheet.setAttribute('height', String(128 * Math.ceil(iconMotion.length/16)));
        iconMotion.forEach((piece, i) => {
          const tile = document.createElementNS(sheet.namespaceURI, 'svg');
          const size = piece.size + 4;
          tile.setAttribute('x', String((i%16) * 128));
          tile.setAttribute('y', String(Math.floor(i/16) * 128));
          tile.setAttribute('width', '128');
          tile.setAttribute('height', '128');
          tile.setAttribute('viewBox', `${-size/2} ${-size/2} ${size} ${size}`);
          const node = piece.node.cloneNode(true);
          node.removeAttribute('transform');
          node.removeAttribute('opacity');
          tile.append(node);
          sheet.append(tile);
        });
        pieceAtlas = await decodeSvg(sheet);
      }
      fieldImage = await decodeSvg(copy);
      fieldRect = rect;
    }
  }
  surface.codeContent = {textRuns, iconCount, controlCount:controls.controlCount};
  surface.hasLiveMotion = iconMotion.some(piece=>piece.readPosition);
  const ease = (a, b, value) => {
    const t = Math.max(0, Math.min(1, (value-a)/(b-a)));
    return t*t*(3-2*t);
  };
  surface.renderCodeFrame = (progress, incoming, direction) => {
    const iconPhase = incoming ? 1-ease(0,.92,progress) : ease(0,1,progress);
    const copyPhase = incoming ? 1-ease(.12,.96,progress) : ease(.04,.9,progress);
    ctx.save();
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,surface.width,surface.height);
    ctx.globalAlpha = 1-copyPhase;
    ctx.drawImage(textLayer, (incoming?1:-1)*direction*72*ratio*copyPhase, 0);
    ctx.restore();
    if (fieldImage) ctx.drawImage(fieldImage, fieldRect.left, fieldRect.top, fieldRect.width, fieldRect.height);
    const fieldScaleX = fieldRect ? fieldRect.width/innerWidth : 1;
    const fieldScaleY = fieldRect ? fieldRect.height/innerHeight : 1;
    if (pieceAtlas) iconMotion.forEach((piece, i) => {
      const p = {};
      // Small stagger keeps the original SVG fragments distinct during assembly.
      const phase = piece.active===false ? 1 : ease(0,1,Math.max(0,Math.min(1,iconPhase*1.12-(piece.stagger || 0)*.12)));
      const scattered = piece.readPosition ? piece.readPosition() : piece.scattered;
      for (const key of ['x','y','scale','rotation','opacity']) {
        p[key] = piece.assembled[key] + (scattered[key]-piece.assembled[key])*phase;
      }
      ctx.save();
      ctx.translate(fieldRect.left+p.x*fieldScaleX, fieldRect.top+p.y*fieldScaleY);
      ctx.scale(fieldScaleX,fieldScaleY);
      ctx.rotate(p.rotation*Math.PI/180);
      ctx.scale(p.scale,p.scale);
      ctx.globalAlpha = p.opacity;
      const size = piece.size+4;
      ctx.drawImage(pieceAtlas,(i%16)*128,Math.floor(i/16)*128,128,128,-size/2,-size/2,size,size);
      ctx.restore();
    });
    ctx.drawImage(controls,bounds.left,bounds.top,bounds.width,bounds.height);
    surface.codeContent.iconMotion = iconPhase;
    surface.codeContent.copyMotion = copyPhase;
    return surface;
  };
  surface.renderCodeFrame(includeHidden?1:0,includeHidden,1);
  return surface;
}

async function captureForeground(target, options={}) {
  const scene=await capturePixelLayer(target,options);
  scene.leftLayer=await capturePixelLayer(target,{...options,leftOnly:true});
  return scene;
}


})();


(function(){
    const PROJECT_FLUID_SETTINGS={
        duration: 1.05,       // 다이얼과 이미지가 비슷한 호흡으로 움직이도록 약간 단축
        overlapAt: 0.58,     // 너무 빠르게 겹치지 않도록 조금 뒤에서 다음 전환 허용
        rgbRelease: 0.18,    // 안전용 잔여값. 실제 Fluid 해제는 wipe 마지막 구간 안에서 끝냄
        rgb: 5,              // RGB를 한 단계 부드럽게
        fluid: 50,          // 세로 전환에서 과한 출렁임을 줄임
        wheelThreshold: 90,  // 미세 휠 입력에 너무 민감하게 반응하지 않도록
        wheelInterval: 120,  // 연속 입력 간 호흡
        pixelRatio: 1.25,
        maxTextureSize: 1920,
        ...window.PROJECT_FLUID_OPTIONS
    };
    // Colored matrix text dissolve replaces the bundled RGB transition.

    (() => {
        "use strict";
        let writerFrame=0,writerTimer=0,infoRevealCleanup=null;
        function clearWriterQueue(){
            cancelAnimationFrame(writerFrame);
            clearTimeout(writerTimer);
            infoRevealCleanup?.();
            infoRevealCleanup=null;
        }
        function revealProjectInfo(projectInfo,animate){
            if(!projectInfo)return;

            projectInfo.classList.remove('is-visible');
            void projectInfo.offsetWidth;

            if(!animate||matchMedia('(prefers-reduced-motion: reduce)').matches){
                projectInfo.classList.add('is-visible');
                return;
            }

            const activeTitle=document.querySelector(
                '.project-dial-item.is-active .project-dial-title'
            );
            let done=false,fallbackTimer=0;
            const cleanup=()=>{
                activeTitle?.removeEventListener('animationstart',onTitleRevealStart);
                clearTimeout(fallbackTimer);
            };
            const show=()=>{
                if(done)return;
                done=true;
                cleanup();
                requestAnimationFrame(()=>projectInfo.classList.add('is-visible'));
            };
            const onTitleRevealStart=event=>{
                if(event.animationName!=='project-dial-title-reveal')return;
                clearTimeout(fallbackTimer);
                fallbackTimer=window.setTimeout(show,300);
            };

            if(activeTitle){
                activeTitle.addEventListener('animationstart',onTitleRevealStart);
                fallbackTimer=window.setTimeout(show,2400);
                infoRevealCleanup=cleanup;
            }else{
                show();
            }
        }
        // =========================================================
        // PROJECTS 데이터
        // =========================================================
        function getProjects() {
            if (
                !window.PROJECTS ||
                !Array.isArray(window.PROJECTS)
            ) {
                console.error(
                    "PROJECTS 데이터를 찾을 수 없습니다. project-data.js 연결을 확인해주세요."
                );
                return [];
            }
            return window.PROJECTS;
        }
        function getProjectById(
            projectId
        ) {
            return getProjects().find(
                project =>
                    String(project.id) ===
                    String(projectId)
            );
        }
        // =========================================================
        // Category Label
        // =========================================================
        const CATEGORY_LABELS = {
            all:
                "ALL",
            health:
                "건강",
            education:
                "교육",
            environment:
                "환경",
            culture:
                "문화",
            leisure:
                "여가",
            welfare:
                "복지",
            life:
                "생활",
            XR:
                "생활",
            xr:
                "생활"
        };
        function getCategoryLabel(
            category
        ) {
            return (
                CATEGORY_LABELS[category]
                ||
                category
                ||
                ""
            );
        }
        // =========================================================
        // HTML 카드 ↔ project-data.js 연결
        //
        // Slide / Grid 순서는 HTML 순서를 그대로 사용.
        // =========================================================
        function bindProjectCards() {
            const cards =
                document.querySelectorAll(
                    `
                    #slideview .card[data-project-id],
                    #gridview .card[data-project-id]
                    `
                );
            cards.forEach(
                card => {
                    const projectId =
                        card.dataset.projectId;
                    const project =
                        getProjectById(
                            projectId
                        );
                    if (!project) {
                        console.warn(
                            `프로젝트 데이터를 찾을 수 없습니다: ${projectId}`
                        );
                        return;
                    }
                    // =============================================
                    // Category
                    // =============================================
                    if (project.category) {
                        card.dataset.category =
                            project.category;
                    }
                    // =============================================
                    // Grid Image
                    // =============================================
                    const gridImage =
                        card.querySelector(
                            ".card-image"
                        );
                    if (
                        gridImage &&
                        project.image
                    ) {
                        gridImage.style.backgroundImage =
                            `url("${project.image}")`;
                    }
                    // =============================================
                    // Slide Image
                    // =============================================
                    if (
                        card.closest(
                            "#slideview"
                        ) &&
                        project.image
                    ) {
                        card.style.backgroundImage =
                            `url(${project.slideImage || project.image})`;
                    }
                    // =============================================
                    // Grid Info
                    // =============================================
                    const category =
                        card.querySelector(
                            ".card-category"
                        );
                    const title =
                        card.querySelector(
                            ".card-title"
                        );
                    const members =
                        card.querySelector(
                            ".card-members"
                        );
                    const description =
                        card.querySelector(
                            ".card-description"
                        );
                    if (category) {
                        category.textContent =
                            getCategoryLabel(
                                project.category
                            );
                    }
                    if (title) {
                        title.textContent =
                            project.title;
                    }
                    if (members) {
                        members.textContent =
                            project.members.join(" / ");
                    }
                    if (description) {
                        description.textContent =
                            project.description;
                    }
                }
            );
        }
        // =========================================================
        // Slide 프로젝트 정보 변경
        // =========================================================
        function updateSlideInfo(
            projectId,
            animate = false
        ) {
            clearWriterQueue();
            const project =
                getProjectById(
                    projectId
                );
            if (!project) {
                return;
            }
            const titleGroup =
                document.querySelector(
                    ".title-section h1[typewriter-effect]"
                );
            const titles =
                document.querySelectorAll(
                    ".project-title"
                );
            const worker =
                document.querySelector(
                    ".worker"
                );
            const description = document.querySelector(
                ".project-description .project-info-block:first-child p"
            );
            // =====================================================
            // 기존 Writer 중지
            // =====================================================
            if (
                animate &&
                window.TypewriterEffect
            ) {
                if (titleGroup) {
                    window.TypewriterEffect.cancel(
                        titleGroup
                    );
                }
            }
            // =====================================================
            // 프로젝트 정보 입력
            // =====================================================
            titles.forEach(
                title => {
                    title.textContent =
                        project.title;
                }
            );
            if (worker) {
                worker.textContent =
                    project.members.join(" / ");
            }
            if (description) {
                description.textContent =
                    project.description;
            }
            const projectInfo = description?.closest(
                ".project-info"
            );
            // =====================================================
            // Writer 다시 실행
            // =====================================================
            if (
                animate &&
                window.TypewriterEffect
            ) {
                writerFrame=requestAnimationFrame(
                    () => {
                        if (titleGroup) {
                            window.TypewriterEffect.replay(
                                titleGroup
                            );
                        }
                    }
                );
            }
            revealProjectInfo(projectInfo,animate);
        }
        // =========================================================
        // Grid 제목
        // =========================================================
        function showGridTitle() {
            clearWriterQueue();
            const titleGroup =
                document.querySelector(
                    ".title-section h1[typewriter-effect]"
                );
            const titles =
                document.querySelectorAll(
                    ".project-title"
                );
            const worker =
                document.querySelector(
                    ".worker"
                );
            if (
                window.TypewriterEffect
            ) {
                if (titleGroup) {
                    window.TypewriterEffect.cancel(
                        titleGroup
                    );
                }
            }
            titles.forEach(
                title => {
                    title.textContent =
                        "프로젝트";
                }
            );
            if (worker) {
                worker.textContent =
                    "";
            }
            /*
            * cancel() 이후 manual typewriter가
            * 숨겨지는 것을 방지
            */
            if (titleGroup) {
                titleGroup.classList.add(
                    "is-typed"
                );
                titleGroup.dataset.typing =
                    "false";
                titleGroup.dataset.typed =
                    "true";
            }
        }
        // =========================================================
        // 초기화
        // =========================================================

        function initProjectPage() {
            if (window.ProjectFluidSlide) return;
            bindProjectCards();
            const slideview=document.querySelector('#slideview');
            const gridview=document.querySelector('#gridview');
            const cards=[...document.querySelectorAll('#slideview .card[data-project-id]')];
            const viewButtons=[...document.querySelectorAll('.view-button')];
            if (!slideview || !cards.length) return;
            const events=new AbortController();
            const listen=(el,event,handler,options={})=>el.addEventListener(event,handler,{...options,signal:events.signal});
            const settings={...PROJECT_FLUID_SETTINGS};
            const reduce=matchMedia('(prefers-reduced-motion: reduce)');
            let index=Math.max(0,cards.findIndex(c=>c.classList.contains('is-active')));
            let engine=null,phase='idle',pending=null,request=0,disabled=false,disposed=false;
            let wheelTotal=0,lastWheel=0,searchFrame=0,wheelTimer=0,lastStep=-Infinity;
            let wanted=null,wantedDirection=1,loading=false,prepared=null;
            let initial=true,stoppedLenis=null;
            const root=document.documentElement;

            // =========================================================
            // Project Dial
            // ---------------------------------------------------------
            // Slide View의 활성 프로젝트와 project-dial을 동기화합니다.
            // 다음 프로젝트(+1) : 리스트가 아래 -> 위로 이동
            // 이전 프로젝트(-1) : 리스트가 위 -> 아래로 이동
            // =========================================================
            const projectDial=document.querySelector('.project-dial');
            const projectDialList=projectDial?.querySelector('.project-dial-list')||null;
            const projectDialItems=projectDialList
                ? [...projectDialList.querySelectorAll('.project-dial-item[data-project-id]')]
                : [];

            // SVG 조각은 화면 좌표로 움직이고, 조립되면 원본의 좌표/겹침 순서로 돌아갑니다.
            const projectIconFiles={
                'apuchika':'team-01-apuchika.svg',
                'omix':'team-02-ommix.svg',
                'phishing-ddook':'team-03-phishing-ttuk.svg',
                'ilkko':'team-04-ilkko.svg',
                'curo':'team-05-kuro.svg',
                'dadeullim':'team-06-dadeullim.svg',
                'stylens':'team-07-style-lens.svg',
                'cheoma':'team-08-geuneuljabi.svg',
                'magmoa':'team-09-magmoa.svg',
                'year-on':'team-10-ieoon.svg',
                '28':'team-11-byeolungwan.svg',
                'cocorang':'team-12-kokorang.svg',
                'efact':'team-13-effect.svg',
                'jikji':'team-14-jikji-jamboree.svg'
            };
            // 조립/분산/간격은 ms. flowSpeed와 flowDistance는 흐름의 속도/이동 폭 배율입니다.
            const iconAssemblySettings={
                gatherDuration:700,scatterDuration:650,stagger:120,
                flowSpeed:1,flowDistance:1
            };
            const svgNamespace='http://www.w3.org/2000/svg';
            const svgElement=name=>document.createElementNS(svgNamespace,name);
            const dialIcons=new Map();
            let dialIconProjectId=null,iconFrame=0,iconFieldReady=false;
            let deferIconAssembly=false;
            let iconAssemblyWaiter=null;
            let iconFlowTime=0,iconLastFrame=0,iconFlowBounds=null;
            const iconField=svgElement('svg');
            iconField.classList.add('project-icon-field');
            iconField.setAttribute('aria-hidden','true');
            iconField.setAttribute('focusable','false');
            document.body.appendChild(iconField);

            // 복합 path의 구멍은 바깥 윤곽과 함께 움직여야 합니다.
            // 안쪽 윤곽은 바깥 윤곽과 묶어 fill-rule과 원래 도형을 보존합니다.
            function splitIconShape(shape,measure){
                const clone=()=>{
                    const node=shape.cloneNode(true);
                    node.removeAttribute('id');
                    return node;
                };
                const path=shape.getAttribute('d')||'';
                if(shape.localName!=='path'||/m/.test(path))return [clone()];
                const contours=path.match(/M[^M]+/g)||[];
                if(contours.length<2)return [clone()];
                const groups=contours.map(d=>{
                    const node=clone();node.setAttribute('d',d);measure.appendChild(node);
                    const box=measure.getBBox();node.remove();
                    return {paths:[d],box};
                });
                const contains=(a,b)=>a.x<=b.x+.01&&a.y<=b.y+.01&&
                    a.x+a.width>=b.x+b.width-.01&&a.y+a.height>=b.y+b.height-.01;
                for(let i=0;i<groups.length;i++){
                    for(let j=i+1;j<groups.length;j++){
                        const a=groups[i],b=groups[j];
                        if(!contains(a.box,b.box)&&!contains(b.box,a.box))continue;
                        const x=Math.min(a.box.x,b.box.x),y=Math.min(a.box.y,b.box.y);
                        a.box={x,y,width:Math.max(a.box.x+a.box.width,b.box.x+b.box.width)-x,
                            height:Math.max(a.box.y+a.box.height,b.box.y+b.box.height)-y};
                        a.paths.push(...b.paths);groups.splice(j,1);i=-1;break;
                    }
                }
                return groups.map(group=>{const node=clone();node.setAttribute('d',group.paths.join(''));return node;});
            }

            const iconLoads=projectDialItems.map(async(item,projectOrder)=>{
                const projectId=String(item.dataset.projectId),file=projectIconFiles[projectId];
                const title=item.querySelector('.project-dial-title');
                if(!file||!title)return;
                const slot=document.createElement('span');
                slot.className='project-dial-icon';slot.setAttribute('aria-hidden','true');
                title.before(slot);item.classList.add('has-project-icon');
                const group=svgElement('g');group.dataset.projectId=projectId;iconField.appendChild(group);
                const entry={item,slot,group,pieces:[],projectOrder};
                dialIcons.set(projectId,entry);
                const measureSvg=svgElement('svg'),measure=svgElement('g');
                measureSvg.style.cssText='position:fixed;width:1px;height:1px;visibility:hidden;pointer-events:none';
                measureSvg.setAttribute('aria-hidden','true');measureSvg.appendChild(measure);
                try{
                    const response=await fetch(new URL(file, iconBaseUrl),{signal:events.signal});
                    if(!response.ok)throw new Error(`SVG ${response.status}`);
                    const xml=new DOMParser().parseFromString(await response.text(),'image/svg+xml');
                    if(disposed)return;
                    if(xml.querySelector('parsererror'))throw new Error('Invalid SVG');
                    document.body.appendChild(measureSvg);
                    for(const layer of xml.querySelectorAll('.icon-layer')){
                        for(const source of layer.querySelectorAll('path,polygon,rect,circle,ellipse,polyline')){
                            for(const shape of splitIconShape(source,measure)){
                                measure.appendChild(shape);const box=measure.getBBox();shape.remove();
                                const cx=box.x+box.width/2,cy=box.y+box.height/2;
                                const node=svgElement('g'),centered=svgElement('g');
                                centered.setAttribute('transform',`translate(${-cx} ${-cy})`);
                                centered.appendChild(shape);node.appendChild(centered);group.appendChild(node);
                                node.dataset.piece=String(entry.pieces.length);
                                entry.pieces.push({node,cx,cy,size:Math.max(box.width,box.height,1),current:null,motion:null});
                            }
                        }
                    }
                    if(!entry.pieces.length)throw new Error('Empty SVG');
                }catch(error){
                    if(error.name!=='AbortError')console.warn(`[Project icons] ${file}`,error);
                    group.remove();slot.remove();item.classList.remove('has-project-icon','is-icon-loaded');
                    dialIcons.delete(projectId);
                }finally{measureSvg.remove();}
            });
            if(dialIcons.size)projectDial?.classList.add('has-project-icons');

            const iconMix=(a,b,t)=>a+(b-a)*t;
            const iconEase=t=>1-Math.pow(1-t,3);
            const iconRandom=seed=>{const value=Math.sin(seed*127.1+311.7)*43758.5453;return value-Math.floor(value);};
            function paintIconPiece(piece){
                const p=piece.current;
                piece.node.setAttribute('transform',`translate(${p.x.toFixed(4)} ${p.y.toFixed(4)}) rotate(${p.rotation.toFixed(4)}) scale(${p.scale.toFixed(6)})`);
                if(piece.paintedOpacity!==p.opacity){
                    piece.node.setAttribute('opacity',p.opacity);piece.paintedOpacity=p.opacity;
                }
            }
            function iconFlowRightAt(y){
                const b=iconFlowBounds;
                const vertical=(y-b.arcCenter)/b.arcRadius;
                let right=b.inset+(b.arcRight-b.inset)*Math.sqrt(Math.max(0,1-vertical*vertical));
                const dy=y-b.centerY;
                // 완성된 아이콘 주변을 완만하게 돌아가도록 연속적인 안쪽 경계를 만듭니다.
                const avoid=b.centerX-b.iconClearance+dy*dy/(2*b.iconClearance);
                const blend=Math.max(10-Math.abs(right-avoid),0)/10;
                right=Math.min(right,avoid)-blend*blend*2.5;
                return Math.max(b.inset+.01,right);
            }
            function flowingIconPosition(piece){
                if(reduce.matches||!iconFlowBounds)return {...piece.scattered};
                const b=iconFlowBounds,phase=piece.seed*Math.PI*2;
                const t=iconFlowTime*iconAssemblySettings.flowSpeed;
                const distance=iconAssemblySettings.flowDistance;
                // 삼각함수 좌표로 아치 내부를 순환하므로 경계에서 튕기거나 순간이동하지 않습니다.
                const vertical=piece.flowVertical+distance*(
                    (Math.sin(t*.24+phase)-Math.sin(phase))*28/b.arcRadius+
                    (Math.sin(t*.13+phase*2)-Math.sin(phase*2))*10/b.arcRadius
                );
                const y=b.arcCenter+Math.sin(vertical)*b.arcRadius;
                const horizontal=piece.flowHorizontal+distance*(
                    (Math.sin(t*.29+phase*1.7)-Math.sin(phase*1.7))*.34+
                    (Math.sin(t*.17+phase)-Math.sin(phase))*.12
                );
                const x=b.inset+(iconFlowRightAt(y)-b.inset)*(.5+.5*Math.sin(horizontal));
                return {...piece.scattered,x,y,
                    rotation:piece.scattered.rotation+(Math.sin(t*.22+phase)-Math.sin(phase))*12*distance};
            }
            function requestIconFrame(){
                if(!iconFrame&&iconFieldReady&&!disposed&&!slideview.hidden&&!document.hidden){
                    iconFrame=requestAnimationFrame(drawIconField);
                }
            }
            function layoutIconField(){
                if(!iconFieldReady||slideview.hidden||!projectDial)return;
                const width=innerWidth,height=innerHeight;
                iconField.setAttribute('viewBox',`0 0 ${width} ${height}`);
                // clamp() 변수는 계산 전 문자열이므로 실제 슬롯의 CSS width를 읽습니다.
                const slot=dialIcons.values().next().value?.slot;
                const iconSize=slot?parseFloat(getComputedStyle(slot).width):72;
                const left=projectDial.getBoundingClientRect().left,scale=iconSize/268;
                const centerY=height/2,centerX=left+iconSize/2;
                const pieces=[...dialIcons.values()].flatMap(entry=>entry.pieces);
                // 순서를 섞되 위치는 고정하여 스크롤할 때마다 아치가 뒤바뀌지 않습니다.
                const ranked=[...pieces].sort((a,b)=>a.seed-b.seed);
                // 아치의 테두리가 아니라 왼쪽 가장자리부터 안쪽 면적 전체에 배치합니다.
                const inset=18,arcRight=Math.max(inset+40,left+iconSize-10);
                const arcTop=Math.max(72,height*.085),arcBottom=height-24;
                const arcCenter=(arcTop+arcBottom)/2,arcRadius=(arcBottom-arcTop)/2;
                const iconClearance=iconSize/2+18;
                iconFlowBounds={inset,arcRight,arcCenter,arcRadius,centerX,centerY,iconClearance};
                let candidate=0;
                ranked.forEach((piece,i)=>{
                    let x,y;
                    // 고정된 2차원 수열로 조각들이 특정 선이나 지점에 몰리지 않게 합니다.
                    do{
                        candidate++;
                        x=inset+((.5+candidate*.754877666)%1)*(arcRight-inset);
                        y=arcTop+((.5+candidate*.569840291)%1)*(arcBottom-arcTop);
                    }while(x>iconFlowRightAt(y));
                    piece.scattered={x,y,scale:Math.min(.5,(11+iconRandom(i+31)*12)/piece.size),
                        rotation:(iconRandom(i+73)-.5)*120,opacity:.3+iconRandom(i+101)*.35};
                    const clampUnit=value=>Math.max(-1,Math.min(1,value));
                    piece.flowVertical=Math.asin(clampUnit((y-arcCenter)/arcRadius));
                    piece.flowHorizontal=Math.asin(clampUnit(2*(x-inset)/(iconFlowRightAt(y)-inset)-1));
                    piece.assembled={x:centerX+(piece.cx-120)*scale,y:centerY+(piece.cy-120)*scale,
                        scale,rotation:0,opacity:1};
                    if(!piece.current){piece.current=flowingIconPosition(piece);paintIconPiece(piece);}
                });
                iconField.classList.add('is-ready');
            }
            function finishIconAssembly(){
                if(!iconFieldReady)return;
                const entry=dialIcons.get(dialIconProjectId);
                if(entry&&entry.group.dataset.state!=='assembled'&&!entry.pieces.some(piece=>piece.motion)){
                    entry.group.dataset.state='assembled';
                }
                if(entry&&entry.group.dataset.state==='assembled'&&!entry.item.classList.contains('is-icon-loaded')){
                    entry.item.classList.add('is-icon-loaded');
                }
                const waiter=iconAssemblyWaiter;
                const target=waiter&&dialIcons.get(waiter.id);
                if(waiter&&(!target||target.group.dataset.state===waiter.state)){
                    iconAssemblyWaiter=null;
                    waiter.resolve(true);
                }
            }
            function waitForIconMotion(projectId,state){
                return new Promise(resolve=>{
                    iconAssemblyWaiter={id:String(projectId),state,resolve};
                    finishIconAssembly();
                });
            }
            function drawIconField(now){
                iconFrame=0;
                if(disposed||slideview.hidden||document.hidden){iconLastFrame=0;return;}
                if(iconLastFrame&&!reduce.matches)iconFlowTime+=Math.min((now-iconLastFrame)/1000,.05);
                iconLastFrame=now;
                let moving=false;
                dialIcons.forEach(entry=>{
                    const active=entry.group.dataset.projectId===dialIconProjectId;
                    entry.pieces.forEach(piece=>{
                        const motion=piece.motion;
                        if(!motion){
                            if(!active&&!reduce.matches){piece.current=flowingIconPosition(piece);paintIconPiece(piece);}
                            return;
                        }
                        const t=Math.max(0,Math.min(1,(now-motion.start)/motion.duration));
                        const eased=iconEase(motion.gather?Math.min(1,t/.84):t);
                        // 분산 목적지도 계속 흐르게 하여 도착 직후의 움직임이 이어지게 합니다.
                        const target=motion.gather?motion.to:flowingIconPosition(piece);
                        const p={};
                        for(const key of ['x','y','rotation','opacity'])p[key]=iconMix(motion.from[key],target[key],eased);
                        if(motion.gather){
                            p.scale=t<.84?iconMix(motion.from.scale,target.scale*1.08,eased):
                                target.scale*(t<.92?iconMix(1.08,.97,(t-.84)/.08):iconMix(.97,1,(t-.92)/.08));
                        }else p.scale=iconMix(motion.from.scale,target.scale,eased);
                        piece.current=t===1?{...target}:p;paintIconPiece(piece);
                        if(t===1)piece.motion=null;else moving=true;
                    });
                    if(!active&&entry.group.dataset.state!=='scattered'&&!entry.pieces.some(piece=>piece.motion)){
                        entry.group.dataset.state='scattered';
                    }
                });
                finishIconAssembly();
                if(moving||(!reduce.matches&&dialIcons.size>1))requestIconFrame();
            }
            function moveIconEntry(entry,gather){
                const now=performance.now();
                entry.group.dataset.state=gather?'assembling':'scattering';
                entry.pieces.forEach((piece,i)=>{
                    const to=gather?piece.assembled:flowingIconPosition(piece);
                    if(reduce.matches){piece.current={...to};piece.motion=null;paintIconPiece(piece);return;}
                    piece.motion={from:{...piece.current},to:{...to},gather,
                        start:now+(i/Math.max(1,entry.pieces.length-1))*iconAssemblySettings.stagger,
                        duration:gather?iconAssemblySettings.gatherDuration:iconAssemblySettings.scatterDuration};
                });
                if(reduce.matches)entry.group.dataset.state=gather?'assembled':'scattered';
                requestIconFrame();
            }
            function syncDialIcon(projectId){
                if(slideview.hidden)return;
                const id=String(projectId);
                // Keep the incoming fragments flowing until the wave has fully exited.
                if(deferIconAssembly){
                    const previous=dialIcons.get(dialIconProjectId);
                    previous?.item.classList.remove('is-icon-loaded');
                    dialIconProjectId=null;
                    if(iconFieldReady&&previous){
                        layoutIconField();
                        moveIconEntry(previous,false);
                    }
                    return;
                }
                if(id===dialIconProjectId)return;
                const previous=dialIcons.get(dialIconProjectId);
                previous?.item.classList.remove('is-icon-loaded');
                dialIconProjectId=id;
                if(!iconFieldReady)return;
                layoutIconField();
                if(previous)moveIconEntry(previous,false);
                const active=dialIcons.get(id);
                if(active){
                    active.item.classList.remove('is-icon-loaded');
                    iconField.appendChild(active.group);
                    moveIconEntry(active,true);
                }
            }
            function resetIconField(){
                cancelAnimationFrame(iconFrame);iconFrame=0;dialIconProjectId=null;
                iconFlowTime=0;iconLastFrame=0;
                dialIcons.forEach(entry=>{
                    entry.item.classList.remove('is-icon-loaded');entry.group.dataset.state='scattered';
                    entry.pieces.forEach(piece=>{
                        piece.motion=null;
                        if(piece.scattered){piece.current={...piece.scattered};paintIconPiece(piece);}
                    });
                });
            }
            function resizeIconField(){
                if(!iconFieldReady||slideview.hidden)return;
                layoutIconField();
                dialIcons.forEach(entry=>entry.pieces.forEach(piece=>{
                    const target=entry.group.dataset.projectId===dialIconProjectId?piece.assembled:flowingIconPosition(piece);
                    if(piece.motion){
                        piece.motion.from={...piece.current};piece.motion.to={...target};piece.motion.start=performance.now();
                    }else{piece.current={...target};paintIconPiece(piece);}
                }));
            }
            Promise.all(iconLoads).then(()=>{
                if(disposed)return;
                dialIcons.forEach(entry=>entry.pieces.forEach((piece,i)=>{piece.seed=iconRandom(entry.projectOrder*101+i+1);}));
                iconFieldReady=true;
                if(slideview.hidden)return;
                layoutIconField();
                const id=dialIconProjectId||cards[index]?.dataset.projectId;
                dialIconProjectId=null;syncDialIcon(id);
                finishIconAssembly();
            });
            // Dial은 현재 위치를 정수 index가 아니라 실수 position으로 관리합니다.
            // 예: 4 -> 5로 이동할 때 4.0, 4.1, 4.2 ... 5.0처럼
            // 연속적으로 변하기 때문에 opacity / scale도 끊기지 않습니다.
            let dialPosition=null;
            let dialRaf=0;

            const originalView=root.getAttribute('data-project-fluid-view');
            const host=document.createElement('div');
            host.className='project-fluid-surface';host.setAttribute('aria-hidden','true');
            slideview.appendChild(host);
            const style=document.createElement('style');
            style.dataset.projectFluidStyle='';
            style.textContent=`
            #slideview .project-fluid-surface {
                position:absolute;
                left:0;
                top:0;
                width:1px;
                height:1px;
                z-index:2;
                visibility:hidden;
                pointer-events:none;
                overflow:hidden;
            }
            #slideview.is-fluid-transitioning .project-fluid-surface { visibility:visible; }

            /* Fluid 캔버스는 카드보다 위에 있지만,
               활성 카드 자체를 다시 위로 올려 border가 사라지지 않게 합니다.
               카드의 background는 투명하므로 border만 Fluid 위에 남습니다. */
            #slideview.is-fluid-transitioning .card {
                background-image:none!important;
                background-color:transparent!important;
                transition:none!important;
            }
            #slideview.is-fluid-transitioning .card.is-active {
                z-index:3!important;
            }

            #slideview.is-fluid-transitioning .card img { visibility:hidden; }
            #slideview .card[data-fluid-instant] { transition:none!important; }
            html[data-project-fluid-view="slide"],html[data-project-fluid-view="slide"] body { overflow:hidden; }

            /*
             * Dial은 JS가 매 프레임 위치/농도/크기를 연속 보간합니다.
             * 기존 CSS transition과 동시에 적용되면 이중 easing이 생기므로
             * slide view에서만 transition을 잠시 맡기지 않습니다.
             */
            html[data-project-fluid-view="slide"] .project-dial-list {
                transition:none!important;
                will-change:transform;
            }

            html[data-project-fluid-view="slide"] .project-dial-item {
                transition:none!important;
                transform-origin:left center;
                will-change:transform,opacity,filter;
            }

            .project-dial.has-project-icons {
                --project-dial-icon-size:clamp(48px,5vw,80px);
                --project-dial-icon-gap:clamp(12px,1.25vw,24px);
                --project-dial-title-duration:800ms;
            }
            .container:has(#slideview:not([hidden])) .project-dial.has-project-icons {
                width:min(
                    calc(36vw + var(--project-dial-icon-size) + var(--project-dial-icon-gap)),
                    calc(100vw - 12rem)
                );
            }
            .project-dial-item.has-project-icon {
                gap:var(--project-dial-icon-gap);
            }
            .project-dial-icon {
                display:block;
                flex:0 0 var(--project-dial-icon-size);
                width:var(--project-dial-icon-size);
                height:var(--project-dial-icon-size);
                max-width:none;
                visibility:hidden;
                pointer-events:none;
            }
            .project-icon-field {
                display:none;
                position:fixed;
                inset:0;
                width:100%;
                height:100%;
                z-index:90;
                overflow:hidden;
                pointer-events:none;
            }
            html[data-project-fluid-view="slide"] .project-icon-field.is-ready { display:block; }
            /* 제목의 자리와 행 높이를 유지해 다이얼이 흔들리지 않게 합니다. */
            html[data-project-fluid-view="slide"] .project-dial-title {
                display:block;
                visibility:hidden;
                opacity:0;
                clip-path:inset(0 100% 0 0);
                animation:none;
            }
            html[data-project-fluid-view="slide"] .project-dial-item.is-active:not(.has-project-icon) .project-dial-title,
            html[data-project-fluid-view="slide"] .project-dial-item.is-active.is-icon-loaded .project-dial-title {
                visibility:visible;
                opacity:1;
                clip-path:inset(0 0 0 0);
                animation:project-dial-title-reveal var(--project-dial-title-duration,800ms) cubic-bezier(.22,1,.36,1) both;
            }
            html[data-project-fluid-view="slide"] .project-dial-item.is-active.has-project-icon.is-icon-loaded .project-dial-title {
                animation-delay:var(--project-dial-title-delay,0ms);
            }
            @keyframes project-dial-title-reveal {
                from { clip-path:inset(0 100% 0 0); }
                to { clip-path:inset(0 0 0 0); }
            }
            html[data-project-fluid-view="slide"] .project-info {
                opacity:0;
                transform:translateX(-32px);
                clip-path:inset(0 100% 0 0);
                will-change:transform,opacity,clip-path;
            }
            html[data-project-fluid-view="slide"] .project-info.is-visible {
                animation:project-info-reveal 700ms cubic-bezier(.22,1,.36,1) both;
            }
            @keyframes project-info-reveal {
                from {
                    opacity:0;
                    transform:translateX(-32px);
                    clip-path:inset(0 100% 0 0);
                }
                to {
                    opacity:1;
                    transform:translateX(0);
                    clip-path:inset(0 0 0 0);
                }
            }
            @media (prefers-reduced-motion:reduce) {
                html[data-project-fluid-view="slide"] .project-dial-item.is-active:not(.has-project-icon) .project-dial-title,
                html[data-project-fluid-view="slide"] .project-dial-item.is-active.has-project-icon.is-icon-loaded .project-dial-title {
                    animation:none;
                }
                html[data-project-fluid-view="slide"] .project-info,
                html[data-project-fluid-view="slide"] .project-info.is-visible {
                    opacity:1;
                    transform:none;
                    clip-path:none;
                    animation:none;
                }
            }
            `;
            document.head.appendChild(style);
            function visibleCards(){return cards.filter(card=>!card.hidden);}

            // =========================================================
            // Fluid Surface Bounds
            // ---------------------------------------------------------
            // WebGL 전환 캔버스를 #slideview 전체(100vh)가 아니라
            // 실제 슬라이드 카드가 차지하는 영역에만 맞춥니다.
            // 따라서 CSS에서 카드 높이/위치를 바꿔도 애니메이션이
            // 현재 레이아웃을 그대로 따라갑니다.
            // =========================================================
            function syncFluidSurfaceBounds(card=cards[wanted??index]||cards[index]){
                if(!card||slideview.hidden)return;

                const viewRect=slideview.getBoundingClientRect();
                const cardRect=card.getBoundingClientRect();

                host.style.left=`${cardRect.left-viewRect.left}px`;
                host.style.top=`${cardRect.top-viewRect.top}px`;
                host.style.width=`${Math.max(1,cardRect.width)}px`;
                host.style.height=`${Math.max(1,cardRect.height)}px`;

                /* 카드의 radius도 Fluid Surface에 그대로 적용해서
                   전환 중 모서리가 네모로 튀어나오지 않게 합니다. */
                const cardStyle=getComputedStyle(card);
                host.style.borderRadius=cardStyle.borderRadius;
            }

            function getSource(card){
                const project =
                    getProjectById(card.dataset.projectId);

                const source =
                    project?.slideImage ||
                    project?.image;

                if(source){
                    return new URL(
                        source,
                        document.baseURI
                    ).href;
                }

                const value =
                    getComputedStyle(card).backgroundImage;

                const match =
                    value.match(
                        /^url\(["']?(.*?)["']?\)$/
                    );

                return match
                    ? new URL(
                        match[1],
                        document.baseURI
                    ).href
                    : '';
            }
            // =========================================================
            // Dial Motion
            // =========================================================
            const dialClamp=(value,min,max)=>Math.max(min,Math.min(max,value));
            const dialLerp=(a,b,t)=>a+(b-a)*t;

            // 빠르게 출발하고 마지막에서 천천히 안착하는 곡선.
            // CSS의 cubic-bezier(.22,1,.36,1)와 비슷한 인상입니다.
            const dialEase=t=>1-Math.pow(1-t,3);

            function updateDialClasses(activeIndex){
                projectDialItems.forEach((item,i)=>{
                    const distance=Math.abs(i-activeIndex);
                    item.classList.toggle('is-active',distance===0);
                    item.classList.toggle('is-near',distance===1);
                    item.classList.toggle('is-far',distance===2);
                    item.classList.toggle('is-none',distance>2);
                });
            }

            function getDialItemCenterAt(position){
                if(!projectDialItems.length)return 0;

                const last=projectDialItems.length-1;
                const safe=dialClamp(position,0,last);

                const low=Math.floor(safe);
                const high=Math.ceil(safe);
                const mix=safe-low;

                const lowItem=projectDialItems[low];
                const highItem=projectDialItems[high];

                const lowCenter=lowItem.offsetTop+lowItem.offsetHeight/2;
                const highCenter=highItem.offsetTop+highItem.offsetHeight/2;

                return dialLerp(lowCenter,highCenter,mix);
            }

            function applyDialVisual(position){
                if(!projectDial||!projectDialList||!projectDialItems.length)return;

                const dialRect=projectDial.getBoundingClientRect();
                const centerInsideDial=window.innerHeight/2-dialRect.top;
                const itemCenter=getDialItemCenterAt(position);

                projectDialList.style.transform=
                    `translate3d(0, ${centerInsideDial-itemCenter}px, 0)`;

                /*
                 * 중앙을 통과하는 순간을 기준으로 각 항목의 상태를
                 * 연속적으로 계산합니다.
                 *
                 * active -> near -> far -> none이 갑자기 바뀌지 않고,
                 * 이동 도중 자연스럽게 밝아졌다가 다시 흐려집니다.
                 */
                projectDialItems.forEach((item,i)=>{
                    const signed=i-position;
                    const distance=Math.abs(signed);

                    let opacity;
                    if(distance<=1){
                        opacity=dialLerp(1,.52,distance);
                    }else if(distance<=2){
                        opacity=dialLerp(.52,.22,distance-1);
                    }else if(distance<=3){
                        opacity=dialLerp(.22,.05,distance-2);
                    }else{
                        opacity=.035;
                    }

                    let scale;

                    if(distance<=1){
                        // active 1.0 → near 0.8
                        scale=dialLerp(
                            1,
                            .5,
                            distance
                        );
                    }else if(distance<=2){
                        // near 0.8 → far 0.4
                        scale=dialLerp(
                            .5,
                            .4,
                            distance-1
                        );
                    }else if(distance<=3){
                        // far 0.4 → none 0.3
                        scale=dialLerp(
                            .4,
                            .3,
                            distance-2
                        );
                    }else{
                        scale=.3;
                    }

                    const blur=distance<=1.15
                        ? 0
                        : dialClamp((distance-1.15)*.34,0,.8);

                    /*
                     * 아주 약한 X 깊이만 줍니다.
                     * 과한 3D 다이얼 느낌 없이 중앙 항목이 살짝 앞으로
                     * 오는 듯한 인상만 남깁니다.
                     */
                    const x=dialClamp(distance*2.2,0,5.5);

                    item.style.opacity=opacity.toFixed(3);
                    item.style.transform=
                        `translate3d(${-x}px,0,0) scale(${scale.toFixed(4)})`;
                    item.style.filter=`blur(${blur.toFixed(2)}px)`;
                });
            }

            function stopDialMotion(){
                if(dialRaf){
                    cancelAnimationFrame(dialRaf);
                    dialRaf=0;
                }
            }

            function syncProjectDial(projectId,direction=0,instant=false){
                if(!projectDial||!projectDialList||!projectDialItems.length)return;

                const targetIndex=projectDialItems.findIndex(
                    item=>String(item.dataset.projectId)===String(projectId)
                );
                if(targetIndex<0)return;

                syncDialIcon(projectId);
                updateDialClasses(targetIndex);

                projectDial.classList.toggle('is-moving-up',direction>0);
                projectDial.classList.toggle('is-moving-down',direction<0);
                projectDial.dataset.direction=
                    direction>0?'up':
                    direction<0?'down':
                    'none';

                if(dialPosition===null){
                    const existing=projectDialItems.findIndex(
                        item=>item.classList.contains('is-active')
                    );
                    dialPosition=existing>=0?existing:targetIndex;
                }

                stopDialMotion();

                if(
                    instant ||
                    Math.abs(targetIndex-dialPosition)<.001 ||
                    reduce.matches
                ){
                    dialPosition=targetIndex;
                    applyDialVisual(dialPosition);
                    return;
                }

                const from=dialPosition;
                const distance=Math.abs(targetIndex-from);

                /*
                 * 1칸 이동은 약 850ms.
                 * 연속 스크롤로 2칸 이상 목표가 바뀌어도
                 * 길이가 과하게 늘어나지 않게 제한합니다.
                 */
                const duration=dialClamp(
                    settings.duration*820 + Math.max(0,distance-1)*75,
                    700,
                    1050
                );

                const started=performance.now();

                const tick=now=>{
                    const raw=dialClamp((now-started)/duration,0,1);
                    const eased=dialEase(raw);

                    dialPosition=dialLerp(from,targetIndex,eased);
                    applyDialVisual(dialPosition);

                    if(raw<1){
                        dialRaf=requestAnimationFrame(tick);
                    }else{
                        dialRaf=0;
                        dialPosition=targetIndex;
                        applyDialVisual(targetIndex);
                    }
                };

                dialRaf=requestAnimationFrame(tick);
            }

            function markActive(next,instant=false,direction=0){
                if(instant)cards.forEach(c=>c.setAttribute('data-fluid-instant',''));

                cards.forEach((c,i)=>c.classList.toggle('is-active',i===next));
                index=next;

                // 이미지 슬라이드와 Dial을 같은 project-id 기준으로 동기화
                syncProjectDial(cards[next]?.dataset.projectId,direction,instant);

                if(instant){
                    void slideview.offsetWidth;
                    cards.forEach(c=>c.removeAttribute('data-fluid-instant'));
                }
            }
            function forceTextVisible(){
                document.querySelectorAll('.title-section h1[typewriter-effect],.slide-description p[typewriter-effect]').forEach(el=>{
                    el.classList.add('is-typed');el.dataset.typing='false';el.dataset.typed='true';
                });
            }
            async function exitProjectCopy(){
                root.classList.remove('project-wave-text-enter');
                root.classList.add('project-wave-text-exit');
                const elements=document.querySelectorAll(
                    '.project-dial-item.is-active .project-dial-title, .project-info, '+
                    '.title-section .project-title, .desktop-slide-description'
                );
                // Wait for the actual reverse animations, including cancellation on view changes.
                const animations=[...elements].flatMap(element=>element.getAnimations())
                    .filter(animation=>animation.animationName==='project-wave-copy-out');
                const results=await Promise.all(animations.map(animation=>animation.finished.then(()=>true,()=>false)));
                return results.every(Boolean);
            }
            function clearTransition(){
                scrollSession=null;
                root.classList.remove('project-pixel-content-ready');
                window.ProjectWave.cancel();
                iconAssemblyWaiter?.resolve(false);
                iconAssemblyWaiter=null;
                deferIconAssembly=false;
                root.classList.remove('project-wave-text-pending', 'project-wave-text-enter', 'project-wave-text-exit');
                request++;clearTimeout(wheelTimer);wheelTimer=0;
                wanted=null;prepared=null;loading=false;phase='idle';pending=null;wheelTotal=0;lastStep=-Infinity;
                engine?.cancel();slideview.classList.remove('is-fluid-transitioning');
            }
            function jump(next,updateText=true){
                clearTransition();markActive(next,true);
                if(updateText&&!slideview.hidden)updateSlideInfo(cards[next].dataset.projectId,false);
                queueMicrotask(warm);
            }
            const imageLoads = new Map();
            function loadImage(source) {
                if (!source) return Promise.reject(new Error('Missing project image'));
                const url = new URL(source, document.baseURI).href;
                if (!imageLoads.has(url)) {
                    const image = new Image();
                    image.src = url;
                    imageLoads.set(url, image.decode().catch(error => {
                        imageLoads.delete(url);
                        throw error;
                    }));
                }
                return imageLoads.get(url);
            }
            function warm() {
                if (disposed || slideview.hidden) return;
                const visible = visibleCards(), at = visible.indexOf(cards[index]);
                for (const card of [visible[at - 1], cards[index], visible[at + 1]]) {
                    if (card) { loadImage(getSource(card)).catch(() => {}); window.ProjectPixel.prepare(getSource(card)).catch(() => {}); }
                }
            }
            async function transitionTo(next, direction = 1, scrub = null) {
                if (disposed || slideview.hidden || !cards[next] || cards[next].hidden) return;
                if (next === index || phase !== 'idle') return;
                if (reduce.matches) { jump(next); return; }
                const current = ++request;
                wanted = next;
                loading = true;
                phase = 'loading';
                try {
                    await Promise.all([window.ProjectWave.ready, loadImage(getSource(cards[next])), ...iconLoads]);
                    if (current !== request || disposed || slideview.hidden || cards[next].hidden) return;
                    const foreground=await capturePixelContent(cards[index]);
                    if(current!==request||disposed||slideview.hidden||cards[next].hidden)return;
                    loading=false;
                    deferIconAssembly=true;
                    phase = 'animating';
                    const finished = await window.ProjectWave.transition({
                        direction,
                        from: getSource(cards[index]),
                        to: getSource(cards[next]),
                        target: cards[index],
                        scrub, foreground,
                        async preview() {
                            const previous=index;
                            try {
                                root.classList.add('project-wave-text-pending');
                                markActive(next,true,direction);
                                updateSlideInfo(cards[next].dataset.projectId,false);
                                settlePixelContent(cards[next].dataset.projectId);
                                return await capturePixelContent(cards[next],{includeHidden:true});
                            } finally {
                                if(current===request&&!disposed&&!slideview.hidden){
                                    markActive(previous,true);
                                    updateSlideInfo(cards[previous].dataset.projectId,false);
                                    settlePixelContent(cards[previous].dataset.projectId);
                                    root.classList.remove('project-wave-text-pending');
                                }
                            }
                        },
                        swap() {
                            deferIconAssembly=true;
                            root.classList.add('project-wave-text-pending');
                            root.classList.remove('project-wave-text-enter', 'project-wave-text-exit');
                            root.style.setProperty('--project-wave-copy-offset', `${direction * 14}px`);
                            markActive(next, true, direction);
                            updateSlideInfo(cards[next].dataset.projectId, false);
                            forceTextVisible();
                            wanted = null;
                            settlePixelContent(cards[next].dataset.projectId);
                            return null;
                        }
                    });
                    if (!finished && current === request && !disposed && !slideview.hidden) {
                        deferIconAssembly=false;
                        root.classList.remove('project-wave-text-pending','project-wave-text-exit','project-wave-text-enter');
                        markActive(index,true);
                        updateSlideInfo(cards[index].dataset.projectId,false);
                    }
                    if (finished && current === request && !disposed && !slideview.hidden) {
                        deferIconAssembly=false;
                        root.classList.remove('project-wave-text-pending','project-wave-text-enter','project-wave-text-exit');
                        forceTextVisible();
                    }
                } catch (error) {
                    if (current === request && !disposed) {
                        deferIconAssembly=false;
                        root.classList.remove('project-wave-text-pending', 'project-wave-text-enter', 'project-wave-text-exit');
                        console.error('[Project wave transition]', error);
                        markActive(next, true, direction);
                        updateSlideInfo(cards[next].dataset.projectId, false);
                    }
                } finally {
                    if (current === request) {
                        wanted = null;
                        phase = 'idle';
                        if(scrollSession===scrub)scrollSession=null;
                        loading = false;
                        wheelTotal = 0;
                        clearTimeout(wheelTimer);
                        wheelTimer = 0;
                        lastStep = performance.now();
                        warm();
                    }
                }
            }
            function navigate(direction){
                if (phase !== 'idle') return;
                if(
                    root.classList.contains('project-intro-pending') ||
                    root.classList.contains('project-intro-running')
                ) return;

                const list=visibleCards();if(!list.length||slideview.hidden)return;
                const at=list.indexOf(cards[wanted??index]);
                const next=at<0?list[0]:list[at+direction];
                if(next)transitionTo(cards.indexOf(next),direction);
            }
// Build input, inserted inside the existing project controller.
// One wheel gesture triggers one complete transition; inertia is never queued.
let scrollSession = null;
let pixelWheelTime = -Infinity, pixelWheelTotal = 0, pixelWheelLocked = false;
function handleAsciiWheel(delta) {
    if (disposed || slideview.hidden || !delta) return;
    const now=performance.now(),options=window.PROJECT_PIXEL_OPTIONS || {};
    const value=(name,fallback,min,max)=>{
        const number=Number(options[name]);
        return Number.isFinite(number)?Math.max(min,Math.min(max,number)):fallback;
    };
    const quiet=value('wheelQuietMs',220,120,1000);
    if(now-pixelWheelTime>quiet){pixelWheelLocked=false;pixelWheelTotal=0;}
    pixelWheelTime=now;
    if(phase!=='idle'||now-lastStep<quiet){pixelWheelLocked=true;pixelWheelTotal=0;return;}
    if(pixelWheelLocked)return;
    if(Math.sign(delta)!==Math.sign(pixelWheelTotal))pixelWheelTotal=0;
    pixelWheelTotal+=delta;
    if(Math.abs(pixelWheelTotal)<value('wheelThreshold',24,4,160))return;
    const direction=Math.sign(pixelWheelTotal);
    pixelWheelLocked=true;pixelWheelTotal=0;
    navigate(direction);
}

// Resolve the real DOM underneath the canvas to the incoming texture's final pose.
function capturePixelContent(target, options = {}) {
    const iconMotion=[...dialIcons.values()].flatMap(entry=>entry.pieces.filter(piece=>piece.current).map((piece,i)=>({
        node:piece.node, size:piece.size,
        active:String(entry.group.dataset.projectId)===String(target.dataset.projectId),
        stagger:i/Math.max(1,entry.pieces.length-1),
        assembled:{...piece.current}, scattered:{...flowingIconPosition(piece)},
        readPosition:()=>flowingIconPosition(piece)
    })));
    return window.ProjectPixel.captureForeground(target,{...options,iconMotion});
}

function settlePixelContent(projectId) {
    deferIconAssembly=false;
    syncDialIcon(projectId);
    if (iconFieldReady) {
        layoutIconField();
        dialIcons.forEach((entry,id)=>{
            const active=String(id)===String(projectId);
            entry.pieces.forEach(piece=>{
                piece.motion=null;
                const position=active?piece.assembled:flowingIconPosition(piece);
                if(position){piece.current={...position};paintIconPiece(piece);}
            });
            entry.group.dataset.state=active?'assembled':'scattered';
            entry.item.classList.toggle('is-icon-loaded',active);
        });
        finishIconAssembly();
    }
    root.classList.remove('project-wave-text-enter','project-wave-text-exit');
    root.classList.add('project-pixel-content-ready');
}

            function currentLenis(){
                // The supplied HTML declares `const lenis` at window scope (not window.lenis).
                try{return typeof lenis!=='undefined'?lenis:window.lenis;}catch{return window.lenis;}
            }
            function changeView(view){
                if(view!=='grid'&&view!=='slide')return;

                const wasSlide=!slideview.hidden;

                clearTransition();
                clearWriterQueue();

                slideview.hidden=view!=='slide';
                if(gridview)gridview.hidden=view!=='grid';

                root.setAttribute(
                    'data-project-fluid-view',
                    view
                );

                viewButtons.forEach(button=>{
                    button.hidden=
                        button.dataset.view===view;

                    button.classList.toggle(
                        'is-active',
                        button.dataset.view===view
                    );
                });

                if(view==='grid'){
                    resetIconField();
                    /*
                     * Grid에서는 project-dial이 display:none이 되므로
                     * 숨겨진 상태에서 위치 계산 RAF가 계속 돌지 않게 정지합니다.
                     */
                    stopDialMotion();

                    showGridTitle();

                    if(stoppedLenis){
                        stoppedLenis.start();
                        stoppedLenis=null;
                    }
                }else{
                    const l=currentLenis();

                    if(
                        l &&
                        !l.isStopped &&
                        typeof l.stop==='function'
                    ){
                        l.stop();
                        stoppedLenis=l;
                    }

                    if(!wasSlide||initial){
                        window.scrollTo({
                            top:0,
                            left:0,
                            behavior:'instant'
                        });
                    }

                    const visible=visibleCards();

                    if(
                        visible.length &&
                        cards[index].hidden
                    ){
                        markActive(
                            cards.indexOf(visible[0]),
                            true
                        );
                    }

                    syncFluidSurfaceBounds(
                        cards[index]
                    );

                    if(engine){
                        engine.resize();
                    }

                    updateSlideInfo(
                        cards[index].dataset.projectId,
                        true
                    );

                    if(!initial){
                        forceTextVisible();
                    }

                    /*
                     * Slide가 다시 display 상태가 된 다음 프레임에
                     * Dial의 실제 크기/offsetTop을 다시 읽어 중앙 위치를 계산합니다.
                     *
                     * 이전 Grid 상태에서 남아 있던 dialPosition도 버려
                     * 화면 밖 translate 값이 재사용되지 않게 합니다.
                     */
                    requestAnimationFrame(()=>{
                        if(slideview.hidden)return;

                        dialPosition=null;

                        syncProjectDial(
                            cards[index]?.dataset.projectId,
                            0,
                            true
                        );
                    });
                }

                initial=false;

                if(view==='slide'){
                    queueMicrotask(warm);
                }
            }
            function reconcileSearch(){
                if(disposed)return;
                const list=visibleCards();
                if(!list.length){clearTransition();return;}
                if(engine?.nodes.some(n=>[n.from,n.to].some(f=>!list.some(c=>c.dataset.projectId===f.id)))){jump(list.includes(cards[index])?index:cards.indexOf(list[0]));return;}
                if(!list.includes(cards[index]))jump(cards.indexOf(list[0]));
                else if(wanted!==null&&!list.includes(cards[wanted])){wanted=null;prepared=null;loading=false;request++;warm();}
            }
            listen(document,'project-search-change',event=>{
                // The existing filter sets card.hidden and publishes visibleIds.
                const raw=event.detail?.visibleIds;
                if(Array.isArray(raw)){
                    const ids=new Set(raw.map(String));
                    const allowed=cards.filter(c=>ids.has(String(c.dataset.projectId)));
                    if(!allowed.length){clearTransition();return;}
                    if(!allowed.includes(cards[index]))jump(cards.indexOf(allowed[0]));
                    else if(wanted!==null&&!allowed.includes(cards[wanted])){wanted=null;prepared=null;loading=false;request++;warm();}
                }
                cancelAnimationFrame(searchFrame);searchFrame=requestAnimationFrame(reconcileSearch);
            });
            const observer=new MutationObserver(reconcileSearch);
            cards.forEach(card=>observer.observe(card,{attributes:true,attributeFilter:['hidden']}));
            viewButtons.forEach(button=>listen(button,'click',()=>changeView(button.dataset.view)));
            const editable=target=>target instanceof Element&&target.closest('input,textarea,select,[contenteditable="true"],[role="dialog"],[data-fluid-ignore]');
            const wheelOption=(name,fallback,min,max)=>Math.min(max,Math.max(min,Number.isFinite(Number(settings[name]))?Number(settings[name]):fallback));
            function flushWheel(){
                wheelTimer=0;
                if(disposed||slideview.hidden){wheelTotal=0;return;}
                const threshold=wheelOption('wheelThreshold',10,1,500);
                if(Math.abs(wheelTotal)<threshold)return;
                const dir=Math.sign(wheelTotal);wheelTotal=0;lastStep=performance.now();navigate(dir);
            }
            listen(document,'wheel',event=>{
                if(slideview.hidden||event.ctrlKey||event.metaKey||editable(event.target))return;
                const nested=event.composedPath().find(el=>el instanceof Element&&el.matches('[data-fluid-ignore],[role="dialog"]'));
                if(nested)return;
                if(event.cancelable)event.preventDefault();
                event.lenisStopPropagation=true;
                const delta=Math.abs(event.deltaY)>=Math.abs(event.deltaX)?event.deltaY:event.deltaX;
                if(!delta)return;
                if(!reduce.matches){
                    const unit=event.deltaMode===1?16:event.deltaMode===2?innerHeight:1;
                    handleAsciiWheel(delta*unit);
                    return;
                }
                const now=performance.now();
                if(now-lastWheel>160||Math.sign(delta)!==Math.sign(wheelTotal))wheelTotal=0;
                lastWheel=now;
                const unit=event.deltaMode===1?16:event.deltaMode===2?innerHeight:1;
                wheelTotal+=delta*unit;
                const threshold=wheelOption('wheelThreshold',10,1,500);
                if(Math.abs(wheelTotal)>=threshold){
                    const wait=wheelOption('wheelInterval',100,0,1000)-(now-lastStep);
                    if(wait<=0){clearTimeout(wheelTimer);flushWheel();}
                    else if(!wheelTimer)wheelTimer=setTimeout(flushWheel,wait);
                }
            },{passive:false,capture:true});
            listen(document,'keydown',event=>{
                if(slideview.hidden||editable(event.target)||event.ctrlKey||event.metaKey||event.altKey)return;
                const dir=['ArrowDown','ArrowRight','PageDown'].includes(event.key)?1:['ArrowUp','ArrowLeft','PageUp'].includes(event.key)?-1:0;
                if(dir){event.preventDefault();if(!event.repeat)navigate(dir);}
            });
            let touch=null;
            listen(document,'touchstart',event=>{
                if(slideview.hidden||editable(event.target)||event.touches.length!==1){touch=null;return;}
                touch={x:event.touches[0].clientX,y:event.touches[0].clientY};
            },{passive:true});
            listen(document,'touchmove',event=>{if(touch&&!slideview.hidden&&event.touches.length===1&&event.cancelable)event.preventDefault();},{passive:false});
            listen(document,'touchend',event=>{
                if(!touch||slideview.hidden)return;
                const end=event.changedTouches[0],dx=touch.x-end.clientX,dy=touch.y-end.clientY;touch=null;
                const delta=Math.abs(dy)>Math.abs(dx)?dy:dx;if(Math.abs(delta)>45)navigate(Math.sign(delta));
            },{passive:true});
            listen(document,'touchcancel',()=>{touch=null;},{passive:true});
            listen(window,'resize',()=>{
                syncFluidSurfaceBounds(cards[wanted??index]||cards[index]);

                // 화면 크기가 바뀌어도 현재 이동 중인 위치를 유지한 채 중앙 재계산
                resizeIconField();
                if(dialPosition!==null)applyDialVisual(dialPosition);
                else syncProjectDial(cards[index]?.dataset.projectId,0,true);
            });
            listen(reduce,'change',()=>{
                if(reduce.matches){
                    const next=wanted??index;
                    resetIconField();jump(next);
                }else{iconLastFrame=0;requestIconFrame();warm();}
            });
            listen(document,'visibilitychange',()=>{
                iconLastFrame=0;
                if(document.hidden){cancelAnimationFrame(iconFrame);iconFrame=0;}
                else requestIconFrame();
            });
            markActive(index,true);changeView('slide');
            window.ProjectFluidSlide={
                next:()=>navigate(1),prev:()=>navigate(-1),
                goTo(projectId){const next=cards.findIndex(c=>String(c.dataset.projectId)===String(projectId));if(next>=0)void transitionTo(next,next<index?-1:1);},
                setOptions(options){Object.assign(settings,options);engine?.setOptions(options);if(engine&&!slideview.hidden)engine.resize();},
                changeView,
                get state(){return {
                    view:slideview.hidden?'grid':'slide',phase,index,projectId:cards[index]?.dataset.projectId,
                    pendingId:wanted===null?null:cards[wanted]?.dataset.projectId,loading,disabled,
                    textureCount:engine?.imageCache.size||0,loadingCount:engine?.imageLoads.size||0,
                    activeCount:engine?.nodes.length||0,wipes:engine?.state.wipes||[],
                    transitionCount:engine?.started||0,renderCount:engine?.renderCount||0,rgbEnvelope:engine?.energy||0
                };},
                destroy(){
                    clearTransition();disposed=true;clearWriterQueue();
                    cancelAnimationFrame(searchFrame);
                    stopDialMotion();
                    resetIconField();
                    dialIcons.forEach(entry=>{
                        entry.item.classList.remove('has-project-icon','is-icon-loaded');
                        entry.slot.remove();
                    });
                    dialIcons.clear();iconField.remove();
                    projectDial?.classList.remove('has-project-icons');
                    observer.disconnect();events.abort();engine?.destroy();engine=null;host.remove();style.remove();
                    if(stoppedLenis)stoppedLenis.start();
                    if(originalView===null)root.removeAttribute('data-project-fluid-view');else root.setAttribute('data-project-fluid-view',originalView);
                    delete window.ProjectFluidSlide;
                }
            };
        }
        if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initProjectPage,{once:true});
        else initProjectPage();
    })();

    })();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
