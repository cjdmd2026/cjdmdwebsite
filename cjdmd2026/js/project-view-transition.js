/* Designer-style depth fades; slide images leave and enter through the project icon matrix. */
(() => {
  'use strict';
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const depthFront = {opacity:1,filter:'blur(0px)',transform:'perspective(1200px) translateZ(0)'};
  const depthBack = {opacity:0,filter:'blur(12px)',transform:'perspective(1200px) translateZ(-180px)'};
  let active = null;
  let gridTransition = null;

  function animateDepth(element, entering, from = null, duration = entering?460:320) {
    const rect = element.getBoundingClientRect();
    element.style.transformOrigin = from?.transformOrigin ||
      `50% ${Math.max(0,Math.min(rect.height,innerHeight/2-rect.top))}px`;
    const start = from
      ? {opacity:from.opacity,filter:from.filter,transform:from.transform}
      : entering?depthBack:depthFront;
    return element.animate([start,entering?depthFront:depthBack],{
      duration,
      easing:entering?'cubic-bezier(.16, 1, .3, 1)':'cubic-bezier(.4, 0, 1, 1)',
      fill:'both'
    });
  }

  function cancelGridResults(commit = false) {
    const previous = gridTransition;
    if (!previous) return;
    gridTransition = null;
    previous.animations.forEach(animation=>animation.cancel());
    previous.content.inert = previous.inert;
    previous.content.style.transformOrigin = previous.origin;
    if (previous.busy === null) previous.content.removeAttribute('aria-busy');
    else previous.content.setAttribute('aria-busy',previous.busy);
    previous.content.dataset.filterState = 'idle';
    if (commit && !previous.committed) previous.update();
    if (previous.gridMotionEnabled) window.ProjectGridMotion.enable();
  }

  async function transitionGridResults(update) {
    const content = document.querySelector('#gridview .content');
    if (root.dataset.projectFluidView !== 'grid' || active || reduced.matches ||
        !content?.getClientRects().length || typeof content.animate !== 'function') {
      cancelGridResults();
      update();
      return;
    }
    let interrupted = null;
    if (gridTransition) {
      const style = getComputedStyle(content);
      interrupted = {
        opacity:style.opacity,filter:style.filter,transform:style.transform,
        transformOrigin:style.transformOrigin
      };
    }
    cancelGridResults();
    const task = {
      content,update,animations:[],committed:false,
      inert:content.inert,origin:content.style.transformOrigin,
      busy:content.getAttribute('aria-busy'),
      gridMotionEnabled:window.ProjectGridMotion?.status.enabled === true
    };
    gridTransition = task;
    // Animate the actual card images together with their text, not the scroll-effect canvas.
    if (task.gridMotionEnabled) window.ProjectGridMotion.disable();
    content.inert = true;
    content.setAttribute('aria-busy','true');
    const play = entering=>{
      content.dataset.filterState = entering?'entering':'leaving';
      const animation = animateDepth(content,entering,entering?null:interrupted);
      task.animations.push(animation);
      return animation.finished.catch(()=>{});
    };
    try {
      await play(false);
      if (gridTransition !== task) return;
      task.committed = true;
      update();
      await play(true);
    } finally {
      if (gridTransition === task) cancelGridResults();
    }
  }

  function cancel() {
    if (!active) return;
    active.cancelled = true;
    active.animations.forEach(animation=>animation.cancel());
    if (active.imageTransition) window.ProjectWave?.cancel();
  }

  function contents(view) {
    const selectors = view === 'slide'
      ? '#slideview, .gradient, .project-icon-rail, .project-dial, .project-description, .project-warp .search-bar, .project-warp .view-buttons'
      : '#gridview, .title-section h1, .title-section .search-bar, .title-section .view-buttons';
    return [...document.querySelectorAll(selectors)].filter(element=>
      element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden');
  }

  async function run({swap, getSlideImage = null}) {
    if (active) return false;
    cancelGridResults(true);
    if (reduced.matches || innerWidth < 760 || !document.body.animate) { swap(); return true; }
    const task = {cancelled:false,animations:[]};
    active = task;
    const states = new Map();
    const wasInert = document.body.inert;
    const gridMotionEnabled = window.ProjectGridMotion?.status.enabled === true;
    const preventScroll = event=>{if(event.cancelable)event.preventDefault();};
    let committed = false;
    const remember = element=>{
      if (!states.has(element)) states.set(element,{
        origin:element.style.transformOrigin,visibility:element.style.visibility
      });
    };
    const animateContent = (element,entering,pending = null)=>{
      remember(element);
      const duration = entering ? (root.dataset.projectFluidView === 'slide' ? 660 : 460) : 320;
      const animation = animateDepth(element,entering,null,duration);
      if (pending) {
        animation.pause();
        pending.push(animation);
      }
      task.animations.push(animation);
      return animation.finished.catch(()=>{});
    };
    const commit = ()=>{if(!committed&&!task.cancelled){committed=true;swap();}};
    const animateView = async (view,entering)=>{
      const elements = contents(view);
      // Resolve after the swap too: returning from a filtered grid may select a different slide.
      const image = view === 'slide' ? getSlideImage?.() : null;
      if (!image || !window.ProjectWave?.transitionImage) {
        await Promise.all(elements.map(element=>animateContent(element,entering)));
        return;
      }
      const backgrounds = elements.filter(element=>element.matches('#slideview, .gradient'));
      const pendingContent = entering ? [] : null;
      const contentAnimations = elements.filter(element=>!backgrounds.includes(element))
        .map(element=>animateContent(element,entering,pendingContent));
      const revealContent = ()=>{
        if (!task.cancelled) pendingContent?.splice(0).forEach(animation=>animation.play());
      };
      task.imageTransition = true;
      let imageStarted = false;
      const hideBackgrounds = ()=>backgrounds.forEach(element=>{
        remember(element);
        element.style.visibility='hidden';
      });
      const restoreBackgrounds = ()=>backgrounds.forEach(element=>{
        const state = states.get(element);
        if (state) element.style.visibility=state.visibility;
      });
      // Capture the scrim before hiding it. The image canvas owns the background until completion.
      const imageAnimation = window.ProjectWave.transitionImage({...image,entering,onStart(){
        imageStarted = true;
        hideBackgrounds();
      },onProgress(_slideProgress,timelineProgress){
        // Start the slide's copy and controls when the image animation reaches 80%.
        if (entering && timelineProgress >= .8) revealContent();
      }});
      // Never flash the fully rendered slide while its image texture is being prepared.
      if (entering) hideBackgrounds();
      await Promise.all([
        // Also release paused content if the image/WebGL transition is unavailable.
        imageAnimation.finally(()=>{
          // Keep the finished image visible while the delayed content completes its fade.
          if (imageStarted) restoreBackgrounds();
          revealContent();
        }),
        ...contentAnimations
      ]);
      if (!imageStarted && !task.cancelled) {
        // Keep the normal depth fade when WebGL or an image is unavailable.
        restoreBackgrounds();
        await Promise.all(backgrounds.map(element=>animateContent(element,entering)));
      }
    };

    document.body.inert = true;
    root.classList.add('project-view-transitioning');
    root.dataset.projectViewState = 'leaving';
    if (gridMotionEnabled) window.ProjectGridMotion.disable();
    window.addEventListener('wheel',preventScroll,{passive:false,capture:true});
    window.addEventListener('touchmove',preventScroll,{passive:false,capture:true});
    try {
      const from = root.dataset.projectFluidView;
      await animateView(from,false);
      if (task.cancelled) return false;
      commit();
      root.dataset.projectViewState = 'entering';
      const to = root.dataset.projectFluidView;
      await animateView(to,true);
      return committed;
    } catch (error) {
      console.warn('[Project view transition]',error);
      commit();
      return committed;
    } finally {
      if (task.imageTransition) window.ProjectWave?.cancel();
      task.animations.forEach(animation=>animation.cancel());
      states.forEach((state,element)=>{
        element.style.transformOrigin = state.origin;
        element.style.visibility = state.visibility;
      });
      root.classList.remove('project-view-transitioning');
      // The view transition has already revealed this copy; do not replay its slide entrance.
      if (root.dataset.projectFluidView === 'slide') {
        document.querySelectorAll('.project-dial-item.is-active .project-dial-title,.project-info')
          .forEach(element=>element.getAnimations().forEach(animation=>animation.finish()));
      }
      if (gridMotionEnabled) window.ProjectGridMotion.enable();
      document.body.inert = wasInert;
      root.dataset.projectViewState = 'idle';
      window.removeEventListener('wheel',preventScroll,true);
      window.removeEventListener('touchmove',preventScroll,true);
      active = null;
    }
  }
  window.addEventListener('resize',()=>{cancel();cancelGridResults(true);});
  window.addEventListener('pagehide',()=>{cancel();cancelGridResults();});
  reduced.addEventListener('change',()=>{
    if(reduced.matches){cancel();cancelGridResults(true);}
  });
  window.ProjectViewTransition = Object.freeze({
    run,cancel,transitionGridResults,cancelGridResults,get busy(){return !!active;}
  });
})();
