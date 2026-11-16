/* A single pearl room throughout the existing scroll narrative. */
(()=>{
 const root=document.getElementById('ypInfographic'),stage=root?.querySelector('.wn-stage');if(!stage)return;
 const room=document.createElement('div');room.className='wn-pearl-space';room.setAttribute('aria-hidden','true');const background=document.createElement('img');background.src='assets/images/about-pearl-reference-20261117.jpg';background.alt='';room.append(background);stage.prepend(room);
 const clamp=x=>Math.max(0,Math.min(1,x)),smooth=x=>{x=clamp(x);return x*x*(3-2*x)},mix=(a,b,t)=>`rgb(${a.map((n,i)=>Math.round(n+(b[i]-n)*t)).join(' ')})`;
 window.YEARONWenessAppearance=p=>{
  const light=1;
  root.style.setProperty('--wn-room-light',light);document.body.style.setProperty('--wn-header-ink','#f2f5f8');document.body.style.setProperty('--wn-logo-brightness',1);
  root.style.setProperty('--wn-ink',mix([237,242,247],[240,244,248],light));
  root.style.setProperty('--wn-muted',mix([174,184,194],[214,223,231],light));
  root.style.setProperty('--wn-line',mix([183,197,210],[181,198,211],light));
  root.style.setProperty('--wn-rim',mix([160,175,190],[255,255,255],light));
  const body=root.querySelector('#wnIndividualBody');if(body){const dark=[.14,.07,.05,.12],bright=[.065,.032,.012,.045];const old=[[229,234,242],[154,164,182],[75,85,105],[189,200,216]],pearl=[[255,255,255],[224,232,241],[197,206,216],[245,247,250]];body.querySelectorAll('stop').forEach((s,i)=>{s.setAttribute('stop-opacity',dark[i]+(bright[i]-dark[i])*light);s.setAttribute('stop-color',mix(old[i],pearl[i],light));});}
 };
})();
