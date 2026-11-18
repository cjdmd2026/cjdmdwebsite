(() => {
  const section=document.querySelector('.magnet-showcase');
  if(!section || typeof PRODUCTS==='undefined')return;
  const track=section.querySelector('.magnet-showcase__track');
  const group=document.createElement('div');group.className='magnet-showcase__group';
  PRODUCTS.forEach((product,i)=>{
    const link=document.createElement('a');link.className='magnet-showcase__item';
    link.href=`detail_s.html?id=${product.id}`;
    link.style.setProperty('--tilt',`${[-7,5,-4,7,-5,4,-6,5][i%8]}deg`);
    const img=document.createElement('img');img.className='magnet-showcase__image';img.src=product.img1;img.alt=product.title;img.loading='lazy';img.decoding='async';
    const caption=document.createElement('span');caption.className='magnet-showcase__caption';caption.textContent=product.title.replace(' 3D 마그넷','');
    const price=document.createElement('small');price.textContent=`₩${product.price.toLocaleString('ko-KR')} · 자세히 보기 ↗`;caption.append(price);
    link.append(img,caption);group.append(link);
  });
  track.append(group);
  const duplicate=group.cloneNode(true);duplicate.setAttribute('aria-hidden','true');
  duplicate.querySelectorAll('a').forEach(link=>link.tabIndex=-1);
  track.append(duplicate);
  const button=section.querySelector('.magnet-showcase__pause');
  button.addEventListener('click',()=>{const paused=section.classList.toggle('is-paused');button.setAttribute('aria-pressed',String(paused));button.textContent=paused?'슬라이드 재생':'슬라이드 일시정지';});
  // Keep off-screen animation idle without losing its current position.
  const observer=new IntersectionObserver(([entry])=>{track.style.animationPlayState=entry.isIntersecting?'':'paused';});observer.observe(section);
})();
