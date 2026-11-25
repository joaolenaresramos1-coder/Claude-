// ===== Recursos visuais extras (2ª leva) =====
// Lista de verificação: itens aparecem com ✔ ou ✖
B.checklist=function(titulo,itens,phrase,o={}){BEATS.push({kind:'check',cur:CUR,t0:T(phrase),until:o.until?T(o.until):null,make:(b)=>{
  const d=el('div',null);d.style.cssText=`position:absolute;left:0;top:0;width:1920px;height:1080px;z-index:${ZI++};display:flex;align-items:center;justify-content:center`;
  const box=el('div','note',d);box.style.cssText+=';position:relative;width:1100px;height:auto;padding:60px 80px;font-size:40px;line-height:1.7';
  const h=el('div',null,box,titulo);h.style.cssText='font-size:34px;letter-spacing:6px;margin-bottom:24px;border-bottom:3px solid #2a2620;padding-bottom:12px';
  const _te=itens.map((it,i)=>typeof it[2]==='string'?T(it[2]):b.t0+0.5+i*0.8);const _mx=Math.max(..._te),_lim=b.t1-1.6;const _r=t=>_mx>_lim?b.t0+0.4+(t-b.t0-0.4)*Math.max(0.1,_lim-b.t0-0.4)/Math.max(0.1,_mx-b.t0-0.4):t;
  const rows=itens.map((it,i)=>{const r=el('div',null,box);r.style.cssText='display:flex;align-items:center;gap:28px;opacity:0';
    const m=el('span',null,r,it[1]?'✔':'✖');m.style.cssText=`font-size:54px;width:60px;color:${it[1]?'#1f6b2a':'#b8241c'};transform:scale(0)`;el('span',null,r,it[0]);
    const te=_r(_te[i]);SFX.push({t:te,type:'type',n:it[0].length,cps:40});SFX.push({t:te+0.5,type:'stamp'});return {r,m,te};});
  ITEMS.push(t=>{const on=P(t,b.t0-0.3,b.t0+0.2)*(1-P(t,b.t1-0.3,b.t1));d.style.opacity=on;d.style.display=on>0?'flex':'none';if(!on)return;
    d.style.background='radial-gradient(ellipse at 50% 50%,rgba(0,0,0,.15),rgba(0,0,0,.55))';
    box.style.transform=`rotate(${-1.5+Math.sin(t*0.4)*0.6}deg) scale(${lerp(1,1.04,P(t,b.t0,b.t1))})`;
    rows.forEach(R=>{R.r.style.opacity=P(t,R.te,R.te+0.3);R.r.style.transform=`translateX(${lerp(-40,0,eo(P(t,R.te,R.te+0.4)))}px)`;R.m.style.transform=`scale(${eback(P(t,R.te+0.45,R.te+0.75))})`;});});}});};

// Polaroides caindo e formando uma pilha
B.pilha=function(imgs,phrase,o={}){BEATS.push({kind:'pilha',cur:CUR,t0:T(phrase),until:o.until?T(o.until):null,make:(b)=>{
  const d=el('div',null);d.style.cssText=`position:absolute;left:0;top:0;width:1920px;height:1080px;z-index:${ZI++}`;
  const cards=imgs.map((n,i)=>{const c=el('div',null,d);c.style.cssText='position:absolute;left:0;top:0;width:520px;padding:18px 18px 70px;background:#f1ecdf;box-shadow:0 18px 40px rgba(0,0,0,.55)';
    const im=el('img',null,c);im.src='../mini/'+n;im.style.cssText='width:484px;height:400px;object-fit:cover;display:block;filter:sepia(.25) contrast(1.05)';
    const te=b.t0+0.15+i*((o.gap)||0.9);SFX.push({t:te,type:'whoosh',v:.5});return {c,te,x:700+(hash(i*3+1)-.5)*700,y:270+(hash(i*7+2)-.5)*220,r:(hash(i*5)-.5)*26};});
  const lbl=o.rotulo?el('div','lbl',d,o.rotulo):null;if(lbl){lbl.style.left='70px';lbl.style.top='60px';}
  ITEMS.push(t=>{const on=P(t,b.t0-0.2,b.t0+0.1)*(1-P(t,b.t1-0.3,b.t1));d.style.opacity=on;d.style.display=on>0?'block':'none';if(!on)return;
    cards.forEach(C=>{const k=P(t,C.te,C.te+0.55);C.c.style.opacity=k>0?1:0;const s=lerp(1.6,1,eo(k));C.c.style.transform=`translate(${C.x}px,${C.y}px) rotate(${C.r+lerp(-25,0,eo(k))}deg) scale(${s})`;});
    d.style.transform=`scale(${lerp(1,1.05,P(t,b.t0,b.t1))})`;});}});};

// Comparação lado a lado com cortina deslizante
B.comparar=function(imgA,imgB,rotA,rotB,phrase,o={}){BEATS.push({kind:'comparar',cur:CUR,t0:T(phrase),until:o.until?T(o.until):null,make:(b)=>{
  const d=el('div',null);d.style.cssText=`position:absolute;left:210px;top:150px;width:1500px;height:780px;z-index:${ZI++};box-shadow:0 30px 60px rgba(0,0,0,.6);border:16px solid #ece6d6;overflow:hidden;background:#111`;
  const mk=(n)=>{const im=el('img',null,d);im.src='../img/'+n;im.style.cssText='position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;filter:sepia(.25) contrast(1.05)';return im;};
  const A=mk(imgA),Bm=mk(imgB);const line=el('div',null,d);line.style.cssText='position:absolute;top:0;width:6px;height:100%;background:#c0302a;box-shadow:0 0 12px rgba(0,0,0,.6)';
  const la=el('div','lbl',d,rotA);la.style.left='24px';la.style.top='24px';const lb=el('div','lbl',d,rotB);lb.style.left='auto';lb.style.right='24px';lb.style.top='24px';
  const ts=o.swipe?T(o.swipe):b.t0+1.5;SFX.push({t:ts,type:'whoosh'});
  ITEMS.push(t=>{const on=P(t,b.t0-0.3,b.t0+0.2)*(1-P(t,b.t1-0.3,b.t1));d.style.opacity=on;d.style.display=on>0?'block':'none';if(!on)return;
    const k=eio(P(t,ts,ts+1.4));const x=lerp(100,50,k);Bm.style.clipPath=`inset(0 0 0 ${x}%)`;line.style.left=`calc(${x}% - 3px)`;
    A.style.transform=`scale(${lerp(1.02,1.08,P(t,b.t0,b.t1))})`;Bm.style.transform=A.style.transform;lb.style.opacity=k;});}});};

// Silhueta "quem eram eles?"
B.silhueta=function(texto,phrase,o={}){BEATS.push({kind:'silhueta',cur:CUR,t0:T(phrase),until:o.until?T(o.until):null,make:(b)=>{
  const sv=svgEl('svg',{width:1920,height:1080,style:'position:absolute;left:0;top:0;z-index:'+(ZI++)},layer);
  svgEl('rect',{width:1920,height:1080,fill:'rgba(0,0,0,.45)'},sv);
  const n=o.n||5;const figs=[...Array(n)].map((_,i)=>{const g=svgEl('g',{opacity:0},sv);const x=960+(i-(n-1)/2)*230,sc=i%2?0.8:1;
    svgEl('circle',{cx:0,cy:-190,r:52,fill:'#0b0b0b'},g);svgEl('path',{d:'M-95 120 Q-100 -110 0 -125 Q100 -110 95 120Z',fill:'#0b0b0b'},g);
    const q=svgEl('text',{x:0,y:-168,'text-anchor':'middle','font-family':'Libre Baskerville','font-weight':700,'font-size':64,fill:'#c0302a'},g);q.textContent='?';
    g.setAttribute('transform',`translate(${x},${640}) scale(${sc})`);return {g,i};});
  const tx=svgEl('text',{x:960,y:900,'text-anchor':'middle','font-family':'Courier Prime','font-weight':700,'font-size':40,fill:'#e4ecea','letter-spacing':6},sv);tx.textContent=texto;
  SFX.push({t:b.t0+0.3,type:'hit'});
  ITEMS.push(t=>{const on=P(t,b.t0-0.3,b.t0+0.2)*(1-P(t,b.t1-0.3,b.t1));sv.style.opacity=on;sv.style.display=on>0?'block':'none';if(!on)return;
    figs.forEach(F=>F.g.setAttribute('opacity',P(t,b.t0+0.2+F.i*0.25,b.t0+0.7+F.i*0.25)));tx.style.opacity=P(t,b.t0+1.2,b.t0+1.8);});}});};

// Animação especial: palavra entalhada na madeira, letra por letra
ANIMS.entalhe=function(b,o,idx){const {s,world,hud,film}=animBase(b);
  const post=svgEl('g',{},world);
  svgEl('rect',{x:300,y:-50,width:1320,height:1200,fill:'#7a5a36'},post);
  for(let i=0;i<40;i++)svgEl('path',{d:`M${300+hash(i)*1320} -50 Q ${300+hash(i+1)*1320} 500 ${300+hash(i+2)*1320} 1150`,stroke:'#5e4327','stroke-width':2+hash(i+4)*4,fill:'none',opacity:.6},post);
  svgEl('rect',{x:240,y:-50,width:70,height:1200,fill:'#3a2a1a'},post);svgEl('rect',{x:1610,y:-50,width:70,height:1200,fill:'#3a2a1a'},post);
  const word=o.palavra||'CROATOAN';const n=word.length;const letters=[...word].map((ch,i)=>{const tx=svgEl('text',{x:960+(i-(n-1)/2)*150,y:600,'text-anchor':'middle','font-family':'Libre Baskerville','font-weight':700,'font-size':200,fill:'#2b1c0e',stroke:'#c9a878','stroke-width':3,opacity:0},world);tx.textContent=ch;return tx;});
  const tS=o.inicio?T(o.inicio):b.t0+0.6,per=o.porLetra||0.32;letters.forEach((l,i)=>SFX.push({t:tS+i*per,type:'stamp'}));
  const h1=hud(o.rotulo||'18 AGO 1590 · ILHA DE ROANOKE',70,60);
  ITEMS.push(t=>{if(!film(t))return;letters.forEach((l,i)=>{const k=P(t,tS+i*per,tS+i*per+0.25);l.setAttribute('opacity',k);l.setAttribute('transform',`translate(${(1-k)*(hash(i)-.5)*20},${(1-k)*10})`);});
    world.setAttribute('transform',`translate(${(hash(Math.floor(t*25))-.5)*3},0) scale(${lerp(1,1.08,P(t,b.t0,b.t1))})`);world.style.transformOrigin='960px 540px';vis(h1,t,b.t0+0.3);});};
