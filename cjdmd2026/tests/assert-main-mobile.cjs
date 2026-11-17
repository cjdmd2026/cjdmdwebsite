const assert = require('node:assert/strict');

// Shared mobile checks: automatic opening followed by native, static galleries.
module.exports = async function assertMainMobile(page) {
  await page.locator('main[data-mobile-ready="true"]').waitFor();
  await page.locator('#mobileAssembly[data-state="complete"]').waitFor({state: 'attached', timeout: 20000});
  await page.locator('html:not(.mobile-assembly-active)').waitFor({state: 'attached', timeout: 5000});
  await page.locator('#hero[data-poster-ready="true"]').waitFor();
  const result = await page.evaluate(() => {
    const sections = [...document.querySelectorAll('main section')].map(section => section.getBoundingClientRect());
    return {
      canvases: document.querySelectorAll('canvas').length,
      loader: document.querySelector('#introLoader') !== null,
      desktopScripts: [...document.scripts].filter(script => /\/(?:lenis[^/]*|main-intro|main-hero\.js|main-section-scroll|main-scroll-input|main\.js|page-wall-transition|stamp-effect-transition)/.test(script.src)).map(script => script.src),
      posters: document.querySelectorAll('.mobile-poster-card a[download]').length,
      icons: document.querySelectorAll('.mobile-icon-list:not([aria-hidden]) > li').length,
      departments: document.querySelectorAll('.mobile-department').length,
      professors: document.querySelectorAll('.mobile-professor').length,
      videos: document.querySelectorAll('.mobile-videos a').length,
      overflow: document.documentElement.scrollWidth > innerWidth,
      overlap: sections.some((section, index) => index > 0 && section.top < sections[index - 1].bottom - 1),
      animated: [...document.querySelectorAll('*')].some(element => {
        if (element.classList.contains('mobile-icon-track')) return false;
        const style = getComputedStyle(element);
        return style.animationName !== 'none' || style.transitionDuration.split(',').some(duration => !['0s', '0ms'].includes(duration.trim()));
      })
    };
  });
  assert.deepEqual(result, {canvases: 3, loader: false, desktopScripts: [], posters: 1, icons: 33, departments: 7, professors: 6, videos: 4, overflow: false, overlap: false, animated: false});
  assert.equal(await page.locator('#hero .mobile-gallery-dots, #hero .mobile-gallery-controls').count(), 0);
  assert.equal(await page.locator('.main-mobile .mobile-gallery-controls, .main-mobile [data-previous], .main-mobile [data-next]').count(), 0);
  assert.equal(await page.locator('.mobile-shortcuts').count(), 0);
  assert.equal(await page.getByRole('button', {name: '다시 보기', exact: true}).count(), 0);
  assert.equal(await page.locator('#mobileAssembly').isVisible(), false, 'The intro lands in the poster gallery without leaving a duplicate graphic');
  assert.equal(await page.locator('#mobile-poster-slides .mobile-poster-card').first().evaluate(card => getComputedStyle(card.querySelector('img')).opacity), '1');
  assert.equal(await page.locator('.header').evaluate(header => getComputedStyle(header).visibility), 'visible');
  assert.equal(await page.locator('.mobile-welcome').evaluate(title => getComputedStyle(title).visibility), 'visible');
  assert.equal(await page.locator('.mobile-videos p').count(), 0);
  assert.equal(await page.locator('main a[href="../project/"], main a[href="../designer/"]').count(), 0);
  const banner = await page.evaluate(() => {
    const track = document.querySelector('.mobile-icon-track');
    const icons = [...document.querySelectorAll('.mobile-icon-list:not([aria-hidden]) > li')];
    return {singleRow: icons.every(icon => Math.abs(icon.getBoundingClientRect().top - icons[0].getBoundingClientRect().top) < 1),
      animation: getComputedStyle(track).animationName, reduced: matchMedia('(prefers-reduced-motion: reduce)').matches};
  });
  assert.equal(banner.singleRow, true);
  assert.equal(banner.animation, banner.reduced ? 'none' : 'mobile-icon-drift');
  assert.equal(await page.locator('.mobile-icon-banner button').count(), 0);
  if (!banner.reduced) {
    assert.equal(await page.locator('.mobile-icon-track').evaluate(track => getComputedStyle(track).animationPlayState), 'running');
    assert.equal(await page.locator('.mobile-icon-track').evaluate(track => getComputedStyle(track).animationIterationCount), 'infinite');
  }
  assert.equal(await page.locator('.mobile-section-heading > span').count(), 0, 'Section numbers are removed');
  assert.equal(await page.locator('.mobile-professor-message').count(), 2, 'Only supplied professor messages are shown');
  const posterButton = page.getByRole('button', {name: '포스터 바꾸기', exact: true});
  await posterButton.press('Home');
  await page.locator('#hero[data-active-slide="0"][data-poster-motion="idle"]').waitFor();
  await posterButton.click();
  await page.locator('#hero[data-active-slide="1"][data-poster-motion="idle"]').waitFor();
  assert.match(await page.locator('[data-poster-download]').getAttribute('href'), /Vertical_poster_black\.pdf$/);
  assert.equal(await page.locator('[data-poster-label]').textContent(), '블랙 포스터');
  await posterButton.click();
  await page.locator('#hero[data-active-slide="0"][data-poster-motion="idle"]').waitFor();
  assert.match(await page.locator('[data-poster-download]').getAttribute('href'), /Vertical_poster_white\.pdf$/);
  for (const section of ['committee', 'professor', 'video']) {
    await page.locator(`#${section} .mobile-gallery-track`).press('Home');
    await page.locator(`#${section} .mobile-gallery-track`).press('ArrowRight');
    assert.equal(await page.locator(`#${section}`).getAttribute('data-active-slide'), '1');
    assert.equal(await page.locator(`#${section} .mobile-gallery-track > [aria-hidden="false"]`).count(), 1);
    await page.locator(`#${section} .mobile-gallery-track`).press('ArrowLeft');
    assert.equal(await page.locator(`#${section}`).getAttribute('data-active-slide'), '0');
  }
  await page.locator('#committee [data-slide="3"]').click();
  assert.equal(await page.locator('#committee').getAttribute('data-active-slide'), '3');
  await page.locator('#mobile-department-slides').press('End');
  assert.equal(await page.locator('#committee').getAttribute('data-active-slide'), '6');
  await page.locator('#mobile-department-slides').press('ArrowRight');
  assert.equal(await page.locator('#committee').getAttribute('data-active-slide'), '6');
  await page.locator('#mobile-department-slides').press('Home');
  await page.locator('#professor [data-slide="4"]').click();
  assert.equal(await page.locator('#professor').getAttribute('data-active-slide'), '4');
  assert.match(await page.locator('#professor [aria-hidden="false"] .mobile-professor-message').textContent(), /열심히 진심으로 노력하면/);
  await page.locator('#professor [data-slide="0"]').click();
  const button = page.getByRole('button', {name: '메뉴 열기', exact: true});
  await button.click();
  assert.equal(await page.locator('.menu-button').getAttribute('aria-expanded'), 'true');
  assert.equal(await page.locator('main').getAttribute('inert'), '');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.menu-button').getAttribute('aria-expanded'), 'false');
  assert.equal(await page.locator('main').getAttribute('inert'), null);
  assert.equal(await page.locator('.menu-button').evaluate(button => document.activeElement === button), true);
  await page.mouse.wheel(0, 600);
  await page.waitForFunction(() => scrollY > 0);
  return result;
};
