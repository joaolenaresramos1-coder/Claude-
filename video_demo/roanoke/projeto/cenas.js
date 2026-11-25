// ===== Recursos visuais extras do canal =====
// Número grande animado (conta até o valor)
B.numero=function(valor,prefixo,sufixo,rotulo,phrase,o={}){BEATS.push({kind:'numero',cur:CUR,t0:T(phrase),until:o.until?T(o.until):null,make:(b)=>{
  const d=el('div','ttl');d.style.zIndex=ZI++;
  const top=el('div','l1',d,rotulo);top.style.fontSize='34px';
  const big=el('div','l2',d,'');big.style.cssText+="font-size:190px;color:#f3efe6;margin-top:18px;font-variant-numeric:tabular-nums";
  const bar=el('div','rule',d);bar.style.height='5px';
  const sub=o.sub?el('div','l1',d,o.sub):null;if(sub){sub.style.marginTop='26px';sub.style.color='#c0302a';}
  const fmt=v=>Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.');
  SFX.push({t:b.t0+0.2,type:'type',n:18,cps:16});SFX.push({t:b.t0+1.5,type:'hit'});
  ITEMS.push(t=>{const on=P(t,b.t0-0.25,b.t0+0.15)*(1-P(t,b.t1-0.35,b.t1));d.style.opacity=on;d.style.display=on>0?'flex':'none';if(!on)return;
    d.style.background='radial-gradient(ellipse at 50% 50%,rgba(0,0,0,.2),rgba(0,0,0,.65))';
    const k=eo(P(t,b.t0+0.2,b.t0+1.5));big.textContent=(prefixo||'')+fmt(valor*k)+(sufixo||'');
    big.style.transform=`scale(${lerp(0.85,1,k)+0.02*Math.sin(P(t,b.t0+1.5,b.t1)*Math.PI)})`;
    bar.style.width=lerp(0,700,eio(P(t,b.t0+0.6,b.t0+1.6)))+'px';if(sub)sub.style.opacity=P(t,b.t0+1.6,b.t0+2.1);});}});};

// Linha do tempo com relógio: o avião avança até o horário falado
B.linhaTempo=function(eventos,phrase,o={}){BEATS.push({kind:'tempo',cur:CUR,t0:T(phrase),until:o.until?T(o.until):null,make:(b)=>{
  const sv=svgEl('svg',{width:1920,height:1080,style:'position:absolute;left:0;top:0;z-index:'+(ZI++)},layer);
  const g=svgEl('g',{},sv);const x0=220,x1=1700,y=560;
  svgEl('rect',{x:0,y:0,width:1920,height:1080,fill:'rgba(0,0,0,.45)'},g);
  const base=svgEl('line',{x1:x0,y1:y,x2:x0,y2:y,stroke:'#d9e4e2','stroke-width':4},g);
  const ev=eventos.map((E,i)=>{const x=x0+(x1-x0)*i/(eventos.length-1);const te=typeof E[2]==='string'?T(E[2]):b.t0+0.6+i*0.7;
    const gg=svgEl('g',{opacity:0},g);svgEl('circle',{cx:x,cy:y,r:12,fill:'#c0302a',stroke:'#fff','stroke-width':3},gg);
    const hr=svgEl('text',{x,y:y-50,'text-anchor':'middle','font-family':'Libre Baskerville','font-weight':700,'font-size':52,fill:'#f3efe6'},gg);hr.textContent=E[0];
    const lb=svgEl('text',{x,y:y+60,'text-anchor':'middle','font-family':'Courier Prime','font-weight':700,'font-size':24,fill:'#d9e4e2','letter-spacing':2},gg);lb.textContent=E[1];
    SFX.push({t:te,type:'stamp'});return {x,te,gg};});
  const pl=svgEl('path',{d:'M-34 0 L18 -6 L34 0 L18 6Z M-6 -4 L-18 -26 L-8 -26 L10 -5Z M-6 4 L-18 26 L-8 26 L10 5Z M-30 -2 L-38 -14 L-32 -14 L-24 -2Z',fill:'#f3efe6'},g);
  const ttl=svgEl('text',{x:960,y:250,'text-anchor':'middle','font-family':'Courier Prime','font-weight':700,'font-size':36,fill:'#d9e4e2','letter-spacing':6},g);ttl.textContent=o.titulo||'';
  ITEMS.push(t=>{const on=P(t,b.t0-0.3,b.t0+0.2)*(1-P(t,b.t1-0.35,b.t1));sv.style.opacity=on;sv.style.display=on>0?'block':'none';if(!on)return;
    let cur=x0;ev.forEach((E,i)=>{const k=P(t,E.te-0.25,E.te+0.2);E.gg.setAttribute('opacity',k);if(t>=E.te-0.25)cur=E.x;});
    const prevX=pl.__x||x0;const nx=lerp(prevX,cur,0.18);pl.__x=nx;
    base.setAttribute('x2',Math.max(nx,x0+(x1-x0)*eio(P(t,b.t0,b.t0+0.8))*0.08));pl.setAttribute('transform',`translate(${nx},${y-90})`);
    g.style.transform=`translate(${lerp(30,-30,P(t,b.t0,b.t1))}px,0)`;});}});};

// Rolo de filme: fotos do caso passando pela tela
B.filme=function(imgs,phrase,o={}){BEATS.push({kind:'filme',cur:CUR,t0:T(phrase),until:o.until?T(o.until):null,make:(b)=>{
  const d=el('div',null);d.style.cssText=`position:absolute;left:0;top:300px;width:1920px;height:480px;z-index:${ZI++};overflow:visible`;
  const strip=el('div',null,d);strip.style.cssText='position:absolute;top:0;height:480px;background:#111;display:flex;align-items:center;gap:26px;padding:0 26px;box-shadow:0 20px 50px rgba(0,0,0,.6)';
  const holes=(top)=>{const h=el('div',null,strip);h.style.cssText=`position:absolute;left:0;right:0;${top}:14px;height:26px;background:repeating-linear-gradient(90deg,transparent 0 22px,#e9e2cf 22px 46px,transparent 46px 70px);opacity:.85`;};
  holes('top');holes('bottom');
  const list=imgs.concat(imgs);list.forEach(n=>{const f=el('div',null,strip);f.style.cssText='width:520px;height:380px;flex:none;overflow:hidden;background:#222';const im=el('img',null,f);im.src='../mini/'+n;im.style.cssText='width:100%;height:100%;object-fit:cover;filter:sepia(.35) contrast(1.1) brightness(.95)';});
  const W=list.length*546;const lbl=o.rotulo?el('div','lbl',d,o.rotulo):null;if(lbl){lbl.style.left='60px';lbl.style.top='-60px';}
  SFX.push({t:b.t0,type:'projector',d:b.t1-b.t0});
  ITEMS.push(t=>{const on=P(t,b.t0-0.3,b.t0+0.2)*(1-P(t,b.t1-0.3,b.t1));d.style.opacity=on;d.style.display=on>0?'block':'none';if(!on)return;
    const x=lerp(200,-W/2+200,P(t,b.t0-0.3,b.t1+3));strip.style.transform=`translateX(${x}px) rotate(-3deg)`;});}});};
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
// ===== Cenas: "A Colônia Perdida — o mistério de Roanoke" =====
window.YEARS={1:[1580,1584],2:[1584,1585],3:[1586,1587],4:[1587,1587],5:[1587,1587],6:[1587,1588],7:[1588,1590],8:[1590,1590],9:[1590,1607],10:[1607,2012],11:[1800,1937],12:[1937,2024]};

// animação: travessia do oceano (Inglaterra ↔ Roanoke)
ANIMS.oceano=function(b,o,idx){const {s,world,hud,film}=animBase(b);
  svgEl('path',{d:'M0 0 L360 0 C 420 200, 330 420, 400 620 C 450 800, 360 950, 420 1080 L0 1080Z',fill:'#b9a47a',stroke:ink,'stroke-width':4},world);
  svgEl('path',{d:'M1560 260 C 1620 220, 1700 240, 1720 320 C 1760 420, 1660 520, 1600 500 C 1540 470, 1520 330, 1560 260Z',fill:'#b9a47a',stroke:ink,'stroke-width':4},world);
  svgEl('path',{d:'M1640 560 C 1760 540, 1920 560, 1920 700 L1920 1080 L1700 1080 C 1660 900, 1600 720, 1640 560Z',fill:'#b9a47a',stroke:ink,'stroke-width':4},world);
  for(let i=0;i<30;i++)svgEl('path',{d:`M${500+hash(i)*1000} ${150+hash(i+5)*800} q 20 -10 40 0 q 20 10 40 0`,fill:'none',stroke:ink2,'stroke-width':2,opacity:.5},world);
  const txt=(t,x,y,sz=28)=>{const e=svgEl('text',{x,y,'font-family':'Courier Prime','font-weight':700,'font-size':sz,fill:ink,'letter-spacing':4},world);e.textContent=t;};
  txt('INGLATERRA',1500,220);txt('ESPANHA',1680,610);txt('ROANOKE',420,560);txt('OCEANO ATLÂNTICO',760,1000,30);
  svgEl('circle',{cx:400,cy:540,r:10,fill:'#a3221a'},world);svgEl('circle',{cx:1620,cy:380,r:10,fill:'#a3221a'},world);
  const path=o.volta?'M400 540 C 700 420, 1200 300, 1620 380':'M1620 380 C 1200 520, 800 700, 400 540';
  const tr=svgEl('path',{d:path,fill:'none',stroke:'#a3221a','stroke-width':5,'stroke-dasharray':'16 12'},world);const Lp=tr.getTotalLength();
  const ship=svgEl('g',{},world);svgEl('path',{d:'M-40 0 L40 0 L28 18 L-28 18Z',fill:ink},ship);svgEl('path',{d:'M0 0 L0 -60 M-18 0 L-18 -45',stroke:ink,'stroke-width':4},ship);
  svgEl('path',{d:'M2 -58 L34 -34 L2 -12Z',fill:cream,stroke:ink,'stroke-width':3},ship);svgEl('path',{d:'M-16 -44 L8 -26 L-16 -8Z',fill:cream,stroke:ink,'stroke-width':3},ship);
  const h1=hud(o.rotulo||'1587 · A TRAVESSIA',70,60);SFX.push({t:b.t0+0.4,type:'scribble',d:3});
  ITEMS.push(t=>{if(!film(t))return;const tq=Math.floor(t*12)/12;const k=eio(P(tq,b.t0+0.4,b.t1-0.5));tr.style.strokeDasharray=`${Lp*k} ${Lp}`;
    const p=tr.getPointAtLength(Lp*k);ship.setAttribute('transform',`translate(${p.x},${p.y-10+Math.sin(tq*4)*4}) scale(${o.volta?1:-1},1)`);vis(h1,t,b.t0+0.3);});};

function buildScenes(){
// ---------- ABERTURA ----------
CH('No dia 18 de agosto de 1590');
B.card('c00_the_englishmen_s_arrival_in_virginia.jpg','No dia 18 de agosto de 1590',{labels:[['18 AGO 1590',0.4]]});
B.card('c02_village_of_secotan.jpg','Ele tinha atravessado o oceano',{labels:[['MAIS DE CEM PESSOAS',0.5]]});
B.card('c04_virginia_dare_monument_manteo_north_car.jpg','Naquele dia',{});
B.title('QUANDO ELE CHEGOU...','Não havia ninguém.','Mas, quando ele chegou',{big:'não havia ninguém',size:120});
B.anim('entalhe','E, em um tronco de madeira',{inicio:'Croatoan.',porLetra:0.12,rotulo:'O ÚNICO SINAL'});
B.numero(115,'+',' PESSOAS','DESAPARECIDAS','Mais de cento e quinze',{sub:'HOMENS, MULHERES E CRIANÇAS'});
B.title('MAIS DE 400 ANOS DEPOIS,','Ninguém sabe.','Mais de quatrocentos anos depois',{big:'ninguém sabe',size:120});
B.title('1587 — 1590','A COLÔNIA PERDIDA','Esta é a história da Colônia Perdida',{big:'Colônia Perdida',size:110});

// ---------- 1 ----------
CH('No fim do século dezesseis');
B.chapter(1,'O sonho de um novo mundo','No fim do século dezesseis');
B.comparar('c01_queen_elizabeth.jpg','c06_spanish_armada.jpg','INGLATERRA','ESPANHA','a Inglaterra olhava com inveja',{swipe:'Os espanhóis já dominavam'});
B.card('c01_queen_elizabeth.jpg','Em 1584, a rainha Elizabeth',{labels:[['ELIZABETH I',0.4],['1584 · A CARTA DE RALEIGH','Sir Walter Raleigh']]});
B.card('c01_0_sir_walter_raleigh_full_length_portrait.jpg','Raleigh nunca atravessou',{labels:[['SIR WALTER RALEIGH',0.4]],lupa:[0.5,0.18,'Mas financiou']});
B.card('c00_map_of_the_coast_of_virginia_in_1585.jpg','A primeira delas chegou',{labels:[['ILHAS LONGAS E ESTREITAS',0.5],['ROANOKE','Roanoke']],lupa:[0.42,0.45,'uma chamada Roanoke']});
B.checklist('O RELATÓRIO DOS EXPLORADORES',[['TERRA FÉRTIL',1,'terra fértil'],['CAÇA E PEIXES',1,'cheia de caça'],['POVOS RECEPTIVOS',1,'habitada por povos']],'Os exploradores voltaram',{});
B.silhueta('MANTEO · WANCHESE','E trouxeram com eles dois homens',{n:2});
B.title('A NOVA TERRA SE CHAMARIA','Virgínia.','A Inglaterra decidiu',{big:'Virgínia',size:150});
B.note([['EM LONDRES:',0],['> MANTEO: ALIADO FIEL','Manteo se tornaria'],['> WANCHESE: DESCONFIADO','Wanchese, ao contrário']],'Manteo e Wanchese passaram meses',{});

// ---------- 2 ----------
CH('Em 1585, uma expedição militar');
B.chapter(2,'A primeira tentativa','Em 1585, uma expedição militar');
B.linhaTempo([['1584','EXPLORAÇÃO',0.4],['1585','O FORTE','Em 1585'],['1586','O ABANDONO',1.6],['1587','AS FAMÍLIAS',2.2],['1590','O SUMIÇO',2.8]],'Em 1585, uma expedição militar',{titulo:'ROANOKE · LINHA DO TEMPO'});
B.card('c02_the_wyfe_of_an_herowan_of_secotan.jpg','Com eles estava um artista',{labels:[['AQUARELA DE JOHN WHITE · 1585',0.4]]});
B.pilha(['c02_secotan.jpg','c02_a_noblewoman_of_pomeiock.jpg','c02_the_dances_at_their_great_feasts.jpg','c02_praying_around_the_fire_with_rattles.jpg','c02_the_tomb_of_the_weroans.jpg'],'White pintou dezenas de aquarelas',{rotulo:'AS AQUARELAS DE JOHN WHITE',gap:0.8});
B.filme(['c02_village_of_secotan.jpg','c02_how_the_chief_ladies_of_the_town_of_das.jpg','c02_sasquesahanougs_detail_of_virginia_indi.jpg','c00_the_englishmen_s_arrival_in_virginia.jpg','c02_the_dances_at_their_great_feasts.jpg'],'Ao lado dele trabalhava',{rotulo:'GRAVURAS DE THEODOR DE BRY · 1590'});
B.note([['A CONVIVÊNCIA:',0],['> INGLESES PRECISAM DE COMIDA','dependiam dos nativos'],['> NATIVOS SOFREM COM DOENÇAS','sofriam com doenças'],['> DESCONFIANÇA DOS DOIS LADOS','A desconfiança']],'Mas a convivência começou',{stamp:['CONFLITO','A desconfiança cresceu']});
B.card('c02_praying_around_the_fire_with_rattles.jpg','Em 1586, o comandante',{labels:[['1586 · WINGINA É MORTO',0.6]]});
B.card('c01_0_s_i_r_francis_drake.jpg','Quando a frota do corsário Francis Drake',{labels:[['FRANCIS DRAKE',0.4]]});
B.numero(15,'',' HOMENS','DEIXADOS NA ILHA','deixaram quinze homens',{sub:'NUNCA MAIS VISTOS COM VIDA'});

// ---------- 3 ----------
CH('Mesmo depois do fracasso');
B.chapter(3,'Uma colônia de famílias','Mesmo depois do fracasso');
B.card('c01_bruno_lucchesi_s_1976_statue_of_sir_walt.jpg','Walter Raleigh não desistiu',{labels:[['RALEIGH NÃO DESISTE',0.4]]});
B.silhueta('HOMENS · MULHERES · CRIANÇAS','Não seriam soldados',{n:5});
B.card('c02_the_wyfe_of_an_herowan_of_secotan.jpg','O governador escolhido',{labels:[['GOVERNADOR: JOHN WHITE',0.4],['O ARTISTA DE 1585','o artista da primeira']]});
B.note([['A FAMÍLIA DE JOHN WHITE:',0],['> ELEANOR, A FILHA (GRÁVIDA)','a filha, Eleanor'],['> ANANIAS DARE, O GENRO','Ananias Dare']],'Com ele viajavam a filha',{});
B.anim('oceano','O destino planejado não era Roanoke',{rotulo:'1587 · DESTINO: CHESAPEAKE?'});
B.card('c00_map_of_the_coast_of_virginia_in_1585.jpg','Mas o piloto da frota',{labels:[['PILOTO: SIMÃO FERNANDES',0.4]],stamp:['RECUSA','se recusou a levá-los']});
B.numero(115,'~',' COLONOS','DEIXADOS EM ROANOKE','os cerca de cento e quinze colonos',{sub:'JULHO DE 1587'});
B.checklist('A SITUAÇÃO DA COLÔNIA',[['CHEGARAM TARDE PARA PLANTAR',0,'tarde demais para plantar'],['ILHA HOSTIL',0,'vistos com desconfiança'],['DEPENDENTES DE SUPRIMENTOS',0,'dependiam de um navio']],'Para muitos historiadores',{});

// ---------- 4 ----------
CH('Quando chegaram, os colonos procuraram');
B.chapter(4,'Virginia Dare','Quando chegaram, os colonos procuraram');
B.card('c07_fort_raleigh_fort_u_s_64_264_manteo_dare.jpg','Quando chegaram, os colonos procuraram',{labels:[['O LOCAL DO FORTE',0.4]]});
B.title('DOS QUINZE HOMENS,','Restaram apenas ossos.','Encontraram apenas os ossos',{big:'apenas os ossos',size:110});
B.card('c02_the_tomb_of_the_weroans.jpg','Poucos dias depois',{labels:[['GEORGE HOWE É MORTO',0.6]]});
B.card('c02_secotan.jpg','Mas havia aliados',{labels:[['MANTEO · O ALIADO',0.4]],stamp:['BATIZADO','ele foi batizado']});
B.title('18 DE AGOSTO DE 1587','Nasce uma menina.','E, no dia 18 de agosto de 1587',{big:'nasceu uma menina',size:120});
B.card('c04_0_baptism_of_virginia_dare.jpg','Ela recebeu o nome de Virginia',{labels:[['VIRGINIA DARE',0.4],['1ª CRIANÇA INGLESA NAS AMÉRICAS','primeira criança inglesa']]});

// ---------- 5 ----------
CH('Logo ficou claro que a colônia');
B.chapter(5,'A viagem de volta','Logo ficou claro que a colônia');
B.checklist('PARA O INVERNO',[['COMIDA SUFICIENTE',0,'suprimentos suficientes'],['NAVIO DE AJUDA',0,'em busca de ajuda']],'Logo ficou claro',{});
B.note([['O SINAL COMBINADO:',0],['> ENTALHAR O DESTINO','deveriam entalhar'],['> SE HOUVESSE PERIGO:','se saíssem por causa'],['  DESENHAR UMA CRUZ','desenhar uma cruz']],'Antes de partir, combinou',{stamp:['✝ = PERIGO','desenhar uma cruz']});
B.anim('oceano','No fim de agosto de 1587',{volta:true,rotulo:'AGO 1587 · WHITE VOLTA À INGLATERRA'});
B.numero(9,'',' DIAS','A IDADE DE VIRGINIA','apenas nove dias',{sub:'ELE NUNCA MAIS A VERIA'});

// ---------- 6 ----------
CH('White chegou à Inglaterra');
B.chapter(6,'A Invencível Armada','White chegou à Inglaterra');
B.card('c06_0_eigentliche_abbildung_dess_herrlichen_si.jpg','A Espanha estava preparando',{labels:[['A INVENCÍVEL ARMADA · 1588',0.4]]});
B.card('c01_queen_elizabeth.jpg','A rainha proibiu',{labels:[['TODOS OS NAVIOS RETIDOS',0.5]],stamp:['PROIBIDO','A rainha proibiu']});
B.card('c06_1_spanish_armada.jpg','Em 1588, White conseguiu partir',{labels:[['1588 · DOIS NAVIOS PEQUENOS',0.4]],stamp:['PIRATAS','atacados por piratas']});
B.card('c06_0_1588_deo_trin_vni_britanniae_bis_ultori.jpg','No verão de 1588',{labels:[['A ARMADA É DERROTADA',0.5]]});
B.card('c06_2_spanish_armada.jpg','Mas a guerra continuou',{labels:[['ROANOKE É ESQUECIDA',0.6]]});
B.numero(3,'',' ANOS','SEM NOTÍCIAS DA COLÔNIA','Passaram-se três anos',{sub:'1587 → 1590'});

// ---------- 7 ----------
CH('Somente em 1590');
B.chapter(7,'Croatoan','Somente em 1590');
B.anim('oceano','Somente em 1590',{rotulo:'1590 · A VOLTA À AMÉRICA'});
B.card('c07_fort_raleigh_entrance_gate_u_s_64_264_ma.jpg','No dia seguinte, 18 de agosto',{labels:[['18 AGO 1590 · ROANOKE',0.4]]});
B.title('ELE DESEMBARCOU.','A colônia estava abandonada.','A colônia estava abandonada',{big:'A colônia estava abandonada',size:96});
B.card('c07_0_scene_from_the_lost_colony_a_historical.jpg','As casas tinham sido desmontadas',{labels:[['CASAS DESMONTADAS',0.4],['UMA PALIÇADA NOVA','havia uma paliçada']]});
B.anim('entalhe','Em uma árvore, estavam entalhadas',{palavra:'CRO',inicio:'três letras',porLetra:0.45,rotulo:'NA ÁRVORE'});
B.anim('entalhe','E, em um dos troncos da paliçada',{palavra:'CROATOAN',inicio:'Croatoan.',porLetra:0.14,rotulo:'NA PALIÇADA'});
B.checklist('O SINAL COMBINADO',[['NOME DO DESTINO: CROATOAN',1,'White procurou'],['CRUZ DE PERIGO',0,'Não havia cruz']],'White procurou o sinal combinado',{});
B.card('c02_secotan.jpg','Croatoan era o nome da ilha',{labels:[['CROATOAN: O POVO DE MANTEO',0.4]]});

// ---------- 8 ----------
CH('Perto dali, os marinheiros');
B.chapter(8,'A tempestade','Perto dali, os marinheiros');
B.note([['OS BAÚS DE WHITE:',0],['> DESENTERRADOS','desenterrados e revirados'],['> LIVROS E MAPAS RASGADOS','livros, mapas'],['> PINTURAS ESTRAGADAS','estragados pela chuva']],'Perto dali, os marinheiros',{stamp:['PERDIDO','estragados pela chuva']});
B.card('c08_navio_na_tempestade.jpg','Uma tempestade violenta',{labels:[['A TEMPESTADE',0.4]],stamp:['ÂNCORAS PERDIDAS','perderam âncoras']});
B.title('O CAPITÃO DECIDIU VOLTAR.','White nunca chegou a Croatoan.','O capitão decidiu voltar',{big:'nunca chegou a Croatoan',size:84});
B.card('c02_the_wyfe_of_an_herowan_of_secotan.jpg','Ele voltou para a Inglaterra',{labels:[['JOHN WHITE NUNCA MAIS VOLTOU',0.5]]});

// ---------- 9 ----------
CH('O que aconteceu com os colonos');
B.chapter(9,'As teorias','O que aconteceu com os colonos');
B.checklist('AS TEORIAS',[['FORAM VIVER COM OS CROATOAN','se mudado para Croatoan',''],['SE DIVIDIRAM E FORAM AO INTERIOR','se dividido',''],['MORTOS POR POWHATAN','Powhatan',''],['FOME, DOENÇA OU O MAR','morreram de fome','']].map(x=>[x[0],0,x[1]]),'O que aconteceu com os colonos',{});
B.card('c02_how_the_chief_ladies_of_the_town_of_das.jpg','A explicação mais simples',{labels:[['TEORIA 1 · CROATOAN',0.4]]});
B.card('c00_map_of_the_coast_of_virginia_in_1585.jpg','Outra possibilidade',{labels:[['TEORIA 2 · CHESAPEAKE',0.4]],lupa:[0.45,0.25,'rumo à baía']});
B.card('c09_settlement_of_jamestown_1607.jpg','Vinte anos depois',{labels:[['1607 · JAMESTOWN',0.4],['TEORIA 3 · POWHATAN','Powhatan']]});
B.title('NENHUMA DESSAS TEORIAS','Foi comprovada.','Nenhuma dessas teorias',{big:'foi comprovada',size:120});
B.card('c07_fort_raleigh_fort_u_s_64_264_manteo_dare.jpg','Arqueólogos já escavaram',{labels:[['FORT RALEIGH · ESCAVAÇÕES',0.4]]});

// ---------- 10 ----------
CH('Por mais de quatrocentos anos');
B.chapter(10,'O segredo do mapa','Por mais de quatrocentos anos');
B.card('c00_map_of_the_coast_of_virginia_in_1585.jpg','John White desenhou um mapa',{labels:[['O MAPA DE JOHN WHITE',0.4],['MUSEU BRITÂNICO','Museu Britânico']]});
B.title('2012 · LUZ ESPECIAL','Algo escondido sob o papel.','Em 2012, pesquisadores',{big:'tinham sido colados',size:96});
B.card('c00_map_of_the_coast_of_virginia_in_1585.jpg','Embaixo de um deles',{labels:[['O SÍMBOLO ESCONDIDO',0.4]],lupa:[0.3,0.4,'Uma pequena estrela'],circle:[0.3,0.4,0.06,0.08,'Perto de onde dois rios']});
B.silhueta('POR QUE ELE ESCONDEU?','Ninguém sabe por que White',{n:1});
B.card('c07_fort_raleigh_entrance_gate_u_s_64_264_ma.jpg','Arqueólogos foram até o lugar',{labels:[['SÍTIO X',0.4],['CERÂMICA INGLESA','cerâmica inglesa']]});
B.checklist('ACHADOS EM HATTERAS (CROATOAN)',[['PEÇAS DE ARMAS',1,'peças de armas'],['PLACA DE ESCREVER',1,'placa de escrever'],['CABO DE ESPADA',1,'cabo de uma espada']],'Ao mesmo tempo, na ilha de Hatteras',{});
B.comparar('c00_map_of_the_coast_of_virginia_in_1585.jpg','c02_village_of_secotan.jpg','SÍTIO X','HATTERAS','As duas descobertas',{swipe:'Para alguns pesquisadores'});

// ---------- 11 ----------
CH('Ao longo dos séculos');
B.chapter(11,'As pistas falsas','Ao longo dos séculos');
B.note([['1937 · AS PEDRAS DE DARE',0],['> MENSAGEM DE ELEANOR DARE?','supostamente escrita'],['> DEZENAS DE OUTRAS PEDRAS','dezenas de outras pedras']],'Em 1937, um homem apareceu',{stamp:['FALSIFICAÇÃO','considerada falsificação']});
B.card('c02_a_noblewoman_of_pomeiock.jpg','Outros relatos',{labels:[['RELATOS DE VIAJANTES',0.4]]});
B.checklist('A PROVA DEFINITIVA',[['DIÁRIOS DOS COLONOS',0,0.5],['ESQUELETOS',0,1.3],['DNA CONCLUSIVO',0,'testes de DNA']],'Hoje, cientistas tentam',{});

// ---------- 12 ----------
CH('A história de Roanoke virou');
B.chapter(12,'A colônia perdida','A história de Roanoke virou');
B.card('c11_scene_from_the_lost_colony_a_historical.jpg','Na ilha, uma peça de teatro',{labels:[['"A COLÔNIA PERDIDA" · DESDE 1937',0.4]]});
B.card('c07_1_scene_from_the_lost_colony_a_historical.jpg','Virginia Dare virou nome',{labels:[['VIRGINIA DARE',0.4]]});
B.card('c12_the_roanoke_marshes_lighthouse_in_manteo.jpg','Talvez os colonos tenham encontrado abrigo',{labels:[['ILHA DE ROANOKE · HOJE',0.4]]});
B.card('c07_2_scene_from_the_lost_colony_a_historical.jpg','Talvez tenham enfrentado',{});
B.numero(115,'+',' PESSOAS','ATRAVESSARAM UM OCEANO','Mais de cento e quinze pessoas',{sub:'E DESAPARECERAM'});
B.anim('entalhe','E deixaram para trás apenas uma palavra',{inicio:'Croatoan.',porLetra:0.1,rotulo:'CROATOAN'});
}
