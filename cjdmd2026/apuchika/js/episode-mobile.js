(()=>{
 const mq=matchMedia('(max-width:800px)'), id=new URLSearchParams(location.search).get('id')||'ani-01', track=document.querySelector('.other-track'), title=document.querySelector('#episodeTitle'),poster=document.querySelector('.episode-player>img'),orig=title.textContent,src=poster?.getAttribute('src'),cards=[...track.children],names={'ani-01':'새로운 수호대원','ani-02':'어금니가 뭐예요?','ani-03':'칫솔에 대해 알아봐요','ani-05':'비비의 집을 지켜라','ani-06':'멋쟁이 사자의 비밀'};
 const rows=cards.map(el=>({el,id:el.querySelector('button').dataset.favorite,label:el.querySelector('h3').textContent}));
 function layout(){const m=mq.matches;title.textContent=m?(names[id]||orig):orig;
 if(id==='ani-01'&&poster)poster.src=m?'../assets/images/mobile-episode-first.jpg':src;
 const sorted=m?[...rows].sort((a,b)=>rank(a.id)-rank(b.id)):rows;
 sorted.forEach(({el,id:key,label})=>{el.querySelector('h3').textContent=m?(names[key]||label):label;track.append(el)});
 }function rank(k){return ['ani-02','ani-03','ani-06','ani-01'].includes(k)?['ani-02','ani-03','ani-06','ani-01'].indexOf(k):99}layout();mq.addEventListener('change',layout)
})();
