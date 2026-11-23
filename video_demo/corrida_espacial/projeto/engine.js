// ===== Motor de cenas: cada cena é presa a uma frase do roteiro, cronometrada pela narração =====
let SCRIPT='', TOK=[], IMG={}, TOTAL=0, CUR=0;
const SFX=[], ITEMS=[], BEATS=[], NS='http://www.w3.org/2000/svg';
const layer=document.getElementById('layer');
const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const P=(t,a,b)=>clamp((t-a)/(b-a));
const lerp=(a,b,k)=>a+(b-a)*k;
const eo=x=>1-Math.pow(1-x,3), ei=x=>x*x*x, eio=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
const eback=x=>{const c1=1.15,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2);};
function hash(n){const s=Math.sin(n*127.1+311.7)*43758.5453;return s-Math.floor(s);}
function el(tag,cls,parent,html){const e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;(parent||layer).appendChild(e);return e;}
function svgEl(tag,attrs,parent){const e=document.createElementNS(NS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);parent.appendChild(e);return e;}

// ---- tempo de uma frase do roteiro ----
function T(phrase){
  const i=SCRIPT.indexOf(phrase,CUR); if(i<0) throw new Error('Frase não encontrada: '+phrase);
  let lo=0,hi=TOK.length-1; while(lo<hi){const m=(lo+hi+1)>>1; if(TOK[m][0]<=i) lo=m; else hi=m-1;}
  return TOK[lo][1];
}
function CH(phrase){const i=SCRIPT.indexOf(phrase,CUR);if(i<0)throw new Error('Capítulo não encontrado: '+phrase);CUR=i;return T(phrase);}
const tt=(v,base)=>typeof v==='number'?base+v:T(v);

// ---- peças visuais ----
function scribblePath(cx,cy,rx,ry,seed){let d='',n=90,turn=1.18;for(let i=0;i<=n;i++){const k=i/n,a=-2.2+k*turn*2*Math.PI;
  const w=1+0.06*Math.sin(k*9+seed)+0.04*Math.sin(k*23+seed*2)+0.05*k;d+=(i?'L':'M')+(cx+Math.cos(a)*rx*w).toFixed(1)+' '+(cy+Math.sin(a)*ry*w*(1-0.04*k)).toFixed(1);}return d;}
function addCircle(parent,cx,cy,rx,ry,t0,dur=0.55,seed=1,width=6){
  const s=svgEl('svg',{width:1,height:1,style:'position:absolute;left:0;top:0;z-index:4'},parent);
  const p=svgEl('path',{d:scribblePath(cx,cy,rx,ry,seed),fill:'none',stroke:'#c4291f','stroke-width':width,'stroke-linecap':'round',opacity:.92},s);
  const L=p.getTotalLength();p.style.strokeDasharray=L;SFX.push({t:t0,type:'scribble',d:dur});
  ITEMS.push(t=>{p.style.strokeDashoffset=L*(1-eio(P(t,t0,t0+dur)));});}
function addLabel(parent,text,t0,x,y,opt={}){
  const l=el('div','lbl',parent);l.style.left=x+'px';l.style.top=y+'px';const cps=opt.cps||22;
  SFX.push({t:t0,type:'type',n:text.length,cps});
  ITEMS.push(t=>{if(t<t0){l.style.opacity=0;return;}l.style.opacity=1;const n=Math.floor((t-t0)*cps),done=n>=text.length;
    l.textContent=text.slice(0,Math.min(n,text.length))+((!done||Math.floor(t*2.4)%2==0)?'_':' ');});return l;}
function addStamp(parent,text,t0,x,y,rot=-11,size=70){
  const s=el('div','stamp',parent,text);s.style.fontSize=size+'px';SFX.push({t:t0+0.12,type:'stamp'});
  ITEMS.push(t=>{if(t<t0){s.style.opacity=0;return;}const k=P(t,t0,t0+0.16);s.style.opacity=lerp(0,.9,k);
    s.style.transform=`translate(${x}px,${y}px) translate(-50%,-50%) rotate(${rot}deg) scale(${lerp(2.3,1,ei(k))})`;});return s;}

// movimento de entrada/saída comum a fotos e bilhetes
const DIRS=[{x:0,y:1300},{x:-1500,y:0},{x:1500,y:0},{x:0,y:-1300},{x:1200,y:900},{x:-1200,y:900}];
function mover(node,w,h,b,at,idx){
  const di=DIRS[Math.floor(hash(idx*3.1)*DIRS.length)],dout=DIRS[Math.floor(hash(idx*7.7+1)*DIRS.length)];
  const rin=(hash(idx)-.5)*30, rout=(hash(idx+9)-.5)*30;
  const tin=[b.t0-0.3,b.t0+0.65], tout=[b.t1-0.35,b.t1+0.45];
  SFX.push({t:tin[0],type:'whoosh'});SFX.push({t:tout[0],type:'whoosh',v:.55});
  const drift=[(hash(idx+2)-.5)*40,(hash(idx+4)-.5)*24];
  ITEMS.push(t=>{
    if(t<tin[0]||t>tout[1]){node.style.display='none';return;}node.style.display='block';
    let x=at.x,y=at.y,r=at.r;
    if(t<tin[1]){const q=eback(P(t,tin[0],tin[1]));x=lerp(at.x+di.x,at.x,q);y=lerp(at.y+di.y,at.y,q);r=lerp(at.r+rin,at.r,q);}
    else if(t>tout[0]){const q=ei(P(t,tout[0],tout[1]));x=lerp(at.x,at.x+dout.x,q);y=lerp(at.y,at.y+dout.y,q);r=lerp(at.r,at.r+rout,q);}
    const life=P(t,tin[0],tout[1]);x+=drift[0]*life;y+=drift[1]*life;
    node.style.transform=`translate(${x-w/2}px,${y-h/2}px) rotate(${r}deg)`;});}

let ZI=10;
const B={
 // foto com moldura
 card(img,phrase,o={}){BEATS.push({cur:CUR,t0:T(phrase),until:o.until?T(o.until):null,side:!!o.side,make:(b,idx)=>{
   const sz=IMG[img]; if(!sz){console.warn('sem imagem',img);return;}
   const asp=sz[0]/sz[1]; const pos=o.pos||'c';
   const box=pos==='c'?[1180,880]:[800,820]; const cx=o.x||(pos==='c'?960:pos==='l'?600:1320), cy=o.y||545;
   let pw=Math.min(box[0]-32,(box[1]-34)*asp); if(o.w) pw=Math.min(pw,o.w); pw=Math.round(pw);
   const ph=Math.round(pw/asp), W=pw+32, H=ph+34;
   const c=el('div','card');c.style.width=W+'px';c.style.zIndex=ZI++;
   const phd=el('div','ph',c);phd.style.height=ph+'px';const im=el('img',null,phd);im.src='../imagens/'+img;
   if(o.focus) im.style.transformOrigin=o.focus;
   const lab=el('div','lbls',c);
   (o.labels||[]).forEach((L,i)=>addLabel(lab,L[0],tt(L[1],b.t0+0.6),30,30+46*i));
   if(o.circle){const q=o.circle;addCircle(lab,16+q[0]*pw,16+q[1]*ph,q[2]*pw,q[3]*ph,tt(q[4],b.t0+1),0.55,idx);}
   if(o.stamp){const q=o.stamp;addStamp(lab,q[0],tt(q[1],b.t0+1),q[2]!=null?q[2]*W:W*0.62,q[3]!=null?q[3]*H:H*0.78,q[4]||-11,q[5]||66);}
   const z0=o.zoom||[1,1.09];
   ITEMS.push(t=>{im.style.transform=`scale(${lerp(z0[0],z0[1],P(t,b.t0,b.t1))})`;});
   mover(c,W,H,b,{x:cx,y:cy,r:o.r!=null?o.r:(hash(idx*5.3)-.5)*7},idx);}});},
 // bilhete datilografado
 note(lines,phrase,o={}){BEATS.push({cur:CUR,t0:T(phrase),until:o.until?T(o.until):null,side:!!o.side,make:(b,idx)=>{
   const maxc=Math.max(...lines.map(L=>L[0].length));const W=Math.min(1700,Math.max(700,maxc*26.5+160)),H=lines.length*66+124;
   const n=el('div','note');n.style.width=W+'px';n.style.height=H+'px';n.style.zIndex=ZI++;
   lines.forEach((L,i)=>{const d=el('div',null,n);d.style.minHeight='1.5em';if(L[2])d.style.color=L[2];const t0=tt(L[1],b.t0+0.5+i*0.4);const cps=26;
     SFX.push({t:t0,type:'type',n:L[0].length,cps});ITEMS.push(t=>{d.textContent=t<t0?'':L[0].slice(0,Math.floor((t-t0)*cps));});});
   if(o.stamp){const q=o.stamp;addStamp(n,q[0],tt(q[1],b.t0+1.5),W*0.78,H*1.0,q[4]||-10,Math.round((q[5]||64)*1.25));}
   const pos=o.pos||'c';mover(n,W,H,b,{x:o.x||(pos==='c'?960:pos==='l'?620:1300),y:o.y||520,r:(hash(idx*2.1)-.5)*6},idx);}});},
 // cartela de título (frase riscada + título serifado)
 title(l1,l2,phrase,o={}){BEATS.push({cur:CUR,t0:T(phrase),until:o.until?T(o.until):null,make:(b)=>{
   const d=el('div','ttl');d.style.zIndex=ZI++;const a=el('div','l1',d),sp=el('span',null,a),st=el('i',null,a);const big=el('div','l2',d,l2.replace(/\.$/,'<b>.</b>'));
   if(o.size)big.style.fontSize=o.size+'px';
   const t1s=b.t0+0.1,tS=o.strike?tt(o.strike,b.t0):null,tB=o.big?tt(o.big,b.t0+1):b.t0+0.9;
   SFX.push({t:t1s,type:'type',n:l1.length,cps:28});if(tS)SFX.push({t:tS,type:'scribble',d:.3});SFX.push({t:tB,type:'hit'});
   ITEMS.push(t=>{const on=P(t,b.t0-0.3,b.t0)*(1-P(t,b.t1-0.3,b.t1+0.1));d.style.opacity=on;d.style.display=on>0?'flex':'none';if(!on)return;
     d.style.background='radial-gradient(ellipse at 50% 50%,rgba(0,0,0,.25),rgba(0,0,0,.6))';
     sp.textContent=l1.slice(0,clamp(Math.floor((t-t1s)*28),0,l1.length));
     const sk=tS?eio(P(t,tS,tS+0.3)):0;st.style.width=(sp.offsetWidth+12)*sk+'px';a.style.opacity=lerp(1,.55,sk);
     const k=eo(P(t,tB,tB+0.5));big.style.opacity=k;big.style.transform=`scale(${lerp(1.12,1,k)})`;});}});},
 // cartela de capítulo
 chapter(num,name,phrase){BEATS.push({cur:CUR,t0:T(phrase),chapter:true,make:(b)=>{
   const d=el('div','ttl');d.style.zIndex=ZI++;const c=el('div','ch',d,'CAPÍTULO '+num);const big=el('div','l2',d,name);big.style.fontSize='96px';const r=el('div','rule',d);
   SFX.push({t:b.t0,type:'hit'});
   ITEMS.push(t=>{const on=P(t,b.t0-0.2,b.t0+0.3)*(1-P(t,b.t1-0.4,b.t1));d.style.opacity=on;d.style.display=on>0?'flex':'none';if(!on)return;
     d.style.background='radial-gradient(ellipse at 50% 50%,rgba(0,0,0,.25),rgba(0,0,0,.6))';
     const k=eo(P(t,b.t0,b.t0+0.8));big.style.opacity=k;big.style.letterSpacing=lerp(18,2,k)+'px';r.style.width=lerp(0,520,eio(P(t,b.t0+0.3,b.t0+1.2)))+'px';
     c.style.opacity=P(t,b.t0,b.t0+0.4);});}});},
 // mapa Terra–Lua
 map(phrase,o={}){BEATS.push({cur:CUR,t0:T(phrase),until:o.until?T(o.until):null,make:(b,idx)=>buildMap(b,o)});},
 // animação 2D vintage
 anim(kind,phrase,o={}){BEATS.push({cur:CUR,t0:T(phrase),until:o.until?T(o.until):null,make:(b,idx)=>ANIMS[kind](b,o,idx)});},
};

// ---- mapa ----
function buildMap(b,o){
  const m=svgEl('svg',{width:1920,height:1080,style:'position:absolute;left:0;top:0;z-index:'+(ZI++)},layer);const c='rgba(215,236,232,';
  const g=svgEl('g',{},m);
  for(let x=0;x<=1920;x+=120)svgEl('line',{x1:x,y1:0,x2:x,y2:1080,stroke:c+'.08)'},g);
  for(let y=0;y<=1080;y+=120)svgEl('line',{x1:0,y1:y,x2:1920,y2:y,stroke:c+'.08)'},g);
  const E={x:430,y:700,r:180},M={x:1450,y:330,r:84};
  svgEl('circle',{cx:E.x,cy:E.y,r:E.r,fill:'rgba(150,200,195,.14)',stroke:c+'.7)','stroke-width':3},g);
  for(let i=-2;i<=2;i++)svgEl('ellipse',{cx:E.x,cy:E.y+i*58,rx:Math.sqrt(E.r*E.r-(i*58)**2),ry:9,fill:'none',stroke:c+'.22)'},g);
  for(let i=1;i<4;i++)svgEl('ellipse',{cx:E.x,cy:E.y,rx:E.r*i/4,ry:E.r,fill:'none',stroke:c+'.22)'},g);
  svgEl('circle',{cx:M.x,cy:M.y,r:M.r,fill:'rgba(150,200,195,.12)',stroke:c+'.7)','stroke-width':3},g);
  [[-25,-20,14],[22,15,10],[-10,32,8],[30,-30,7]].forEach(([dx,dy,r])=>svgEl('circle',{cx:M.x+dx,cy:M.y+dy,r,fill:'none',stroke:c+'.4)'},g));
  const txt=(s,x,y,sz=26)=>{const e=svgEl('text',{x,y,fill:c+'.85)','font-family':'Courier Prime','font-weight':700,'font-size':sz,'letter-spacing':6},g);e.textContent=s;};
  txt('T E R R A',E.x-90,E.y+E.r+56);txt('L U A',M.x-45,M.y+M.r+52);txt('— 384.400 KM —',800,250,26);
  const path=`M${E.x+140} ${E.y+115} C 820 930, 1200 720, 1360 470 C 1420 360, 1600 300, 1560 230 C 1520 170, 1400 200, 1370 270`;
  const tr=svgEl('path',{d:path,fill:'none',stroke:'#c4291f','stroke-width':6,'stroke-dasharray':'18 12','stroke-linecap':'round'},g);
  const L=tr.getTotalLength();const id='mk'+Math.floor(b.t0*100);const mk=svgEl('mask',{id},m);const mp=svgEl('path',{d:path,fill:'none',stroke:'#fff','stroke-width':12},mk);
  mp.style.strokeDasharray=L;tr.setAttribute('mask',`url(#${id})`);const dot=svgEl('circle',{r:10,fill:'#c4291f'},g);
  let lb,lt;if(o.label){lb=svgEl('g',{},g);svgEl('rect',{x:880,y:690,width:o.label.length*16+50,height:44,fill:'#0d0d0d'},lb);
    lt=svgEl('text',{x:900,y:720,fill:'#f1f1f1','font-family':'Courier Prime','font-weight':700,'font-size':24,'letter-spacing':2.5},lb);}
  const t0=b.t0+0.4,tL=o.labelAt?T(o.labelAt):b.t0+1.5;SFX.push({t:t0,type:'scribble',d:2.4});if(o.label)SFX.push({t:tL,type:'type',n:o.label.length,cps:22});
  ITEMS.push(t=>{const on=P(t,b.t0-0.4,b.t0+0.2)*(1-P(t,b.t1-0.3,b.t1+0.2));m.style.opacity=on;m.style.display=on>0?'block':'none';if(!on)return;
    const k=eio(P(t,t0,t0+2.6));mp.style.strokeDashoffset=L*(1-k);const pt=tr.getPointAtLength(L*k);dot.setAttribute('cx',pt.x);dot.setAttribute('cy',pt.y);
    if(lb){lb.style.opacity=t>tL?1:0;lt.textContent=o.label.slice(0,clamp(Math.floor((t-tL)*22),0,o.label.length))+(Math.floor(t*2.4)%2?'_':' ');}
    const life=P(t,b.t0,b.t1);g.style.transform=`translate(${lerp(10,-30,life)}px,0) scale(${lerp(1,1.03,life)})`;});
}

// ---- animações 2D vintage (sépia, recortes chapados, 12 quadros/s) ----
const ink='#3a2a1a',ink2='#5a432b',ink3='#7a6040',cream='#e9d9b0';
function animBase(b){
  const A=el('div','anim');A.style.zIndex=ZI++;const s=svgEl('svg',{width:1920,height:1080,style:'position:absolute;left:0;top:0'},A);const world=svgEl('g',{},s);
  const scr=[0,1,2].map(()=>svgEl('line',{x1:0,y1:0,x2:0,y2:1080,stroke:'#2b2116','stroke-width':1.5,opacity:0},s));
  svgEl('rect',{x:24,y:24,width:1872,height:1032,fill:'none',stroke:'#2b2116','stroke-width':6,rx:18,opacity:.5},s);
  SFX.push({t:b.t0,type:'projector',d:b.t1-b.t0});
  const hud=(txt,x,y,cls='')=>{const h=el('div','hud '+cls,A);h.style.left=x+'px';h.style.top=y+'px';h.textContent=txt;h.style.opacity=0;return h;};
  const film=t=>{const on=P(t,b.t0-0.35,b.t0+0.25)*(1-P(t,b.t1-0.35,b.t1+0.15));A.style.opacity=on;A.style.display=on>0?'block':'none';if(!on)return false;
    const f=Math.floor(t*25);world.setAttribute('transform',`translate(${(hash(f)-.5)*3},${(hash(f+5)-.5)*3})`);A.style.filter=`brightness(${0.96+0.08*hash(f*3)}) contrast(1.05)`;
    scr.forEach((l,i)=>{const x=hash(f*13+i)*1920;l.setAttribute('opacity',hash(f*7+i)>0.55?0.35:0);l.setAttribute('x1',x);l.setAttribute('x2',x+(hash(i+f)-.5)*6);});return true;};
  for(let i=0;i<80;i++)svgEl('circle',{cx:hash(i)*1920,cy:hash(i+99)*1080,r:1+hash(i+7)*2.2,fill:ink,opacity:.5},world);
  return {A,s,world,hud,film};
}
const vis=(e,t,a,b2=1e9)=>{e.style.opacity=(t>=a&&t<b2)?1:0;};
const ANIMS={
 orbita(b,o,idx){const {world,hud,film}=animBase(b);
   const C={x:960,y:600};const E=svgEl('g',{transform:`translate(${C.x},${C.y})`},world);
   const orbitBack=svgEl('ellipse',{cx:C.x,cy:C.y,rx:520,ry:170,fill:'none',stroke:ink2,'stroke-width':3,'stroke-dasharray':'10 10',transform:`rotate(-12 ${C.x} ${C.y})`},world);
   svgEl('circle',{r:250,fill:'#cdb88e',stroke:ink,'stroke-width':6},E);
   svgEl('path',{d:'M-160 -120 q60 -60 130 -20 q40 60 -20 100 q-30 70 30 130 q-90 30 -130 -50 q-60 -60 -10 -160z M60 -40 q90 -40 130 40 q0 100 -80 120 q-60 -70 -50 -160z M-40 150 q60 -10 90 40 q-60 40 -90 -40z',fill:ink3,stroke:ink,'stroke-width':3},E);
   for(let i=-3;i<=3;i++)svgEl('ellipse',{cx:0,cy:i*62,rx:Math.sqrt(250*250-(i*62)**2),ry:10,fill:'none',stroke:ink,'stroke-width':1.2,opacity:.35},E);
   const sat=svgEl('g',{},world);
   if(o.sat==='vostok'){svgEl('circle',{r:26,fill:ink2,stroke:ink,'stroke-width':4},sat);svgEl('path',{d:'M20 -18 L70 -10 L70 10 L20 18Z',fill:ink},sat);}
   else{svgEl('circle',{r:20,fill:'#d8c69c',stroke:ink,'stroke-width':4},sat);[[-1,-1],[-1,1],[1,-1],[1,1]].forEach(([a,c2])=>svgEl('line',{x1:0,y1:0,x2:-80*Math.abs(a)+0,y2:c2*22+a*8,stroke:ink,'stroke-width':3},sat));}
   const waves=[0,1,2].map(()=>svgEl('circle',{r:10,fill:'none',stroke:'#a3221a','stroke-width':4},world));
   const bip=svgEl('text',{'font-family':'Courier Prime','font-weight':700,'font-size':44,fill:'#a3221a','letter-spacing':6},world);bip.textContent='BIPE';
   const h1=hud(o.label||'SPUTNIK 1',70,60),h2=hud(o.sub||'1 VOLTA A CADA 96 MIN',70,116);const h3=o.extra?hud(o.extra,70,172,'red'):null;
   const tE=o.extraAt?T(o.extraAt):1e9;
   ITEMS.push(t=>{if(!film(t))return;const tq=Math.floor(t*12)/12;const a=(tq-b.t0)*(o.speed||0.9)-1.2;
     const ang=-12*Math.PI/180;let x=Math.cos(a)*520,y=Math.sin(a)*170;const X=C.x+x*Math.cos(ang)-y*Math.sin(ang),Y=C.y+x*Math.sin(ang)+y*Math.cos(ang);
     const behind=Math.sin(a)<0&&Math.abs(x)<250;sat.setAttribute('transform',`translate(${X},${Y}) rotate(${a*57})`);sat.style.opacity=behind?0:1;
     const beep=o.beep!==false;waves.forEach((w,i)=>{const k=((t*1.6+i/3)%1);w.setAttribute('cx',X);w.setAttribute('cy',Y);w.setAttribute('r',20+k*110);w.setAttribute('opacity',beep&&!behind?(1-k)*0.8:0);});
     bip.setAttribute('x',X+40);bip.setAttribute('y',Y-60);bip.style.opacity=beep&&!behind&&(Math.floor(t*1.6)%2==0)?1:0;
     vis(h1,t,b.t0+0.3);vis(h2,t,b.t0+1.2);if(h3)vis(h3,t,tE);});},
 leonov(b,o,idx){const {world,hud,film}=animBase(b);
   svgEl('path',{d:'M-200 1180 Q960 640 2120 1180Z',fill:ink3,stroke:ink,'stroke-width':5},world); // curvatura da Terra
   const ship=svgEl('g',{transform:'translate(420,430)'},world);
   svgEl('circle',{r:120,fill:ink2,stroke:ink,'stroke-width':6},ship);svgEl('rect',{x:-80,y:110,width:160,height:150,fill:ink,rx:10},ship);
   svgEl('rect',{x:100,y:-50,width:150,height:100,fill:'#8a7050',stroke:ink,'stroke-width':5,rx:40},ship); // câmara de ar
   svgEl('circle',{cx:30,cy:-30,r:22,fill:cream,stroke:ink,'stroke-width':4},ship);
   const teth=svgEl('path',{fill:'none',stroke:ink,'stroke-width':4},world);
   const man=svgEl('g',{},world);const body=svgEl('g',{},man);
   svgEl('rect',{x:-48,y:-10,width:96,height:130,rx:40,fill:'#e2d2a8',stroke:ink,'stroke-width':5},body);
   svgEl('circle',{cx:0,cy:-50,r:46,fill:'#e2d2a8',stroke:ink,'stroke-width':5},body);svgEl('circle',{cx:0,cy:-50,r:28,fill:ink2},body);
   [[-1],[1]].forEach(([d])=>{svgEl('path',{d:`M${d*44} 10 Q${d*95} 40 ${d*92} 100`,stroke:'#e2d2a8','stroke-width':30,fill:'none','stroke-linecap':'round'},body);
     svgEl('path',{d:`M${d*24} 110 Q${d*34} 170 ${d*28} 220`,stroke:'#e2d2a8','stroke-width':32,fill:'none','stroke-linecap':'round'},body);});
   const gas=[...Array(16)].map(()=>svgEl('circle',{r:6,fill:cream,stroke:ink2,'stroke-width':2,opacity:0},world));
   const tIn=T(o.inflate),tV=T(o.valve),tBk=T(o.back);
   const h1=hud('18 MAR 1965 · VOSKHOD 2',70,60),h2=hud('1ª CAMINHADA ESPACIAL',70,116),h3=hud('TRAJE INFLADO!',1350,60,'red'),h4=hud('VÁLVULA ABERTA',1350,116),h5=hud('DE VOLTA À NAVE',1350,172);
   SFX.push({t:tIn,type:'alarm',d:1.6});
   ITEMS.push(t=>{if(!film(t))return;const tq=Math.floor(t*12)/12;
     let x=1080+Math.sin(tq*0.6)*40,y=520+Math.sin(tq*0.9)*30,rot=Math.sin(tq*0.5)*14;
     const kb=eio(P(tq,tBk,tBk+3.5));x=lerp(x,600,kb);y=lerp(y,420,kb);rot=lerp(rot,-70,kb);
     const inf=eo(P(tq,tIn,tIn+2))*(1-0.75*eo(P(tq,tV,tV+2.5)));const sc=1+0.38*inf;
     man.setAttribute('transform',`translate(${x},${y}) rotate(${rot})`);body.setAttribute('transform',`scale(${sc*(1-0.25*kb)})`);
     teth.setAttribute('d',`M650 430 Q${(650+x)/2} ${Math.max(y,430)+160} ${x} ${y+20}`);
     gas.forEach((g,i)=>{const k=((tq-tV)*0.7+i/16)%1;const on=tq>tV&&tq<tV+4;g.setAttribute('cx',x+40+k*180*(0.6+hash(i))); g.setAttribute('cy',y+10-k*120*(hash(i+3)-.4));g.setAttribute('opacity',on?(1-k)*0.8:0);});
     vis(h1,t,b.t0+0.3);vis(h2,t,b.t0+1.2);h3.style.opacity=(t>=tIn&&t<tV+0.5&&Math.floor(t*3)%2==0)?1:0;vis(h4,t,tV);vis(h5,t,tBk+1);});},
 gemini8(b,o,idx){const {world,hud,film}=animBase(b);
   const C={x:960,y:520};const cap=svgEl('g',{},world);
   svgEl('path',{d:'M-150 -60 L60 -36 L60 36 L-150 60Z',fill:ink2,stroke:ink,'stroke-width':6},cap);svgEl('rect',{x:60,y:-34,width:70,height:68,fill:ink,rx:6},cap);
   svgEl('circle',{cx:-90,cy:0,r:16,fill:cream,stroke:ink,'stroke-width':4},cap);
   const ag=svgEl('g',{},world);svgEl('rect',{x:0,y:-48,width:340,height:96,fill:'#8a7050',stroke:ink,'stroke-width':6,rx:8},ag);svgEl('rect',{x:340,y:-30,width:60,height:60,fill:ink},ag);
   const jet=svgEl('path',{d:'M0 0 L-30 -90 L30 -90Z',fill:cream,stroke:ink2,'stroke-width':3},cap);
   const arcs=[0,1,2].map(i=>svgEl('path',{d:'',fill:'none',stroke:'#a3221a','stroke-width':5,'stroke-dasharray':'14 12'},world));
   const tStk=T(o.stuck),tSave=T(o.save);
   const h1=hud('GEMINI 8 · 16 MAR 1966',70,60),h2=hud('PRIMEIRO ACOPLAMENTO',70,116),h3=hud('PROPULSOR TRAVADO',1300,60,'red'),h4=hud('ROTAÇÃO: 0,0 VOLTA/S',1300,116),h5=hud('NAVE ESTABILIZADA',1300,172);
   SFX.push({t:tStk,type:'alarm',d:2});
   let ang=0,last=b.t0;
   ITEMS.push(t=>{if(!film(t))return;const tq=Math.floor(t*12)/12;
     const spd=lerp(0,1,eio(P(tq,tStk,tStk+7)))*(1-eio(P(tq,tSave,tSave+3)));// voltas por segundo
     ang=((tq>tStk?((tq-tStk)*0.5*Math.min(1,(tq-tStk)/7)+0):0)*360*spd*0+0); // recalculado abaixo
     // integra a rotação de forma determinística
     let a2=0;const steps=60;for(let i=0;i<steps;i++){const s=lerp(tStk,tq,i/steps),ds=(tq-tStk)/steps;if(tq>tStk){const v=lerp(0,1,eio(P(s,tStk,tStk+7)))*(1-eio(P(s,tSave,tSave+3)));a2+=v*360*ds;}}
     cap.setAttribute('transform',`translate(${C.x},${C.y}) rotate(${a2})`);
     const dk=eo(P(tq,b.t0,b.t0+1.2)),sep=eio(P(tq,tStk+1.5,tStk+5));
     ag.setAttribute('transform',`translate(${C.x+130-(1-dk)*500+sep*700},${C.y+sep*240}) rotate(${a2*(1-sep)+sep*25})`);ag.style.opacity=1-P(tq,tStk+4,tStk+5.5);
     jet.style.opacity=(tq>tStk&&tq<tSave&&Math.floor(t*10)%2)?1:0;jet.setAttribute('transform','translate(20,-36)');
     arcs.forEach((p,i)=>{const r=260+i*50;const s0=a2*Math.PI/180+i*2;p.setAttribute('d',`M${C.x+Math.cos(s0)*r} ${C.y+Math.sin(s0)*r} A${r} ${r} 0 0 1 ${C.x+Math.cos(s0+1.3)*r} ${C.y+Math.sin(s0+1.3)*r}`);p.style.opacity=spd>0.15?spd:0;});
     vis(h1,t,b.t0+0.3);vis(h2,t,b.t0+1.2,tStk);vis(h3,t,tStk,tSave);vis(h4,t,tStk);vis(h5,t,tSave+1.5);
     h4.textContent='ROTAÇÃO: '+spd.toFixed(1).replace('.',',')+' VOLTA/S';h4.className='hud'+(spd>0.6?' red':'');});},
 descida(b,o,idx){const {s,world,hud,film}=animBase(b);
   const ea=svgEl('g',{transform:'translate(860,190)'},world);svgEl('circle',{r:62,fill:'none',stroke:ink,'stroke-width':4},ea);svgEl('path',{d:'M0 -62 A62 62 0 0 1 0 62 A30 62 0 0 0 0 -62',fill:ink2},ea);
   svgEl('path',{d:'M0 760 Q200 730 420 752 T860 745 T1300 760 T1920 740 L1920 1080 L0 1080Z',fill:ink3},world);
   svgEl('path',{d:'M0 830 Q300 805 640 828 T1280 822 T1920 815 L1920 1080 L0 1080Z',fill:ink2},world);
   [[300,900,120,16],[980,960,170,20],[1650,920,110,14],[620,1010,90,10],[1380,1030,140,14]].forEach(([x,y,rx,ry])=>svgEl('ellipse',{cx:x,cy:y,rx,ry,fill:ink,opacity:.55},world));
   [[880,812,46],[960,818,30],[1040,808,58],[1120,820,34],[1190,812,42],[1010,826,22],[1250,822,26]].forEach(([x,y,r])=>svgEl('path',{d:`M${x-r} ${y} Q${x-r*.9} ${y-r*.9} ${x-r*.1} ${y-r} Q${x+r*.8} ${y-r*.85} ${x+r} ${y} Z`,fill:ink},world));
   const lm=svgEl('g',{},world);const flame=svgEl('path',{d:'M-22 64 L0 150 L22 64Z',fill:cream,stroke:ink2,'stroke-width':3},lm);
   svgEl('path',{d:'M-26 40 L-34 70 L34 70 L26 40Z',fill:ink},lm);svgEl('path',{d:'M-80 0 L-62 -20 L62 -20 L80 0 L80 40 L62 52 L-62 52 L-80 40Z',fill:ink2,stroke:ink,'stroke-width':4},lm);
   svgEl('path',{d:'M-50 -20 L-60 -70 L-30 -110 L35 -110 L62 -70 L50 -20Z',fill:ink},lm);svgEl('path',{d:'M-20 -95 L-8 -95 L-4 -70 L-24 -70Z',fill:cream},lm);
   svgEl('line',{x1:20,y1:-110,x2:30,y2:-150,stroke:ink,'stroke-width':4},lm);svgEl('circle',{cx:30,cy:-150,r:9,fill:'none',stroke:ink,'stroke-width':4},lm);
   [-1,1].forEach(d=>{svgEl('path',{d:`M${d*70} 30 L${d*128} 100`,stroke:ink,'stroke-width':8},lm);svgEl('path',{d:`M${d*55} 50 L${d*128} 100`,stroke:ink,'stroke-width':4},lm);svgEl('ellipse',{cx:d*132,cy:104,rx:24,ry:6,fill:ink},lm);});
   const puffs=[...Array(14)].map(()=>svgEl('ellipse',{rx:10,ry:6,fill:'#cbb68c',opacity:0},world));
   const tA=T(o.start),tAl=T(o.alarm),tRock=T(o.rocks),tMan=T(o.manual),tF60=T(o.f60),tF30=T(o.f30),tLand=T(o.land);
   const h0=hud('20 JULHO 1969 · DESCIDA DO EAGLE',70,60),hAl=hud('⚠ ALARME 1202',70,116,'red'),hP=hud('PEDRAS DO TAMANHO DE CARROS',760,690),hMan=hud('CONTROLE MANUAL',1350,60),hF=hud('COMBUSTÍVEL: 60 S',1350,116),hC=hud('CONTATO',1350,172,'red');
   if(!ANIMS._d){ANIMS._d=1;SFX.push({t:tAl,type:'alarm',d:2.2});SFX.push({t:tLand,type:'land'});}
   ITEMS.push(t=>{if(!film(t))return;const tq=Math.floor(t*12)/12;let x,y,rot;
     if(tq<tRock){const q=eo(P(tq,tA,tRock));x=lerp(330,1000,q);y=lerp(120,560,q)+Math.sin(tq*3)*6;rot=lerp(18,6,q);}
     else if(tq<tMan){x=1000;y=560+Math.sin(tq*3)*6;rot=6;}
     else if(tq<tLand-1.5){const q=eio(P(tq,tMan,tLand-1.5));x=lerp(1000,1520,q);y=lerp(560,600,q)-Math.sin(q*Math.PI)*45;rot=lerp(6,-8,Math.sin(q*Math.PI));}
     else{const q=eo(P(tq,tLand-1.5,tLand));x=1520;y=lerp(600,706,q);rot=0;}
     lm.setAttribute('transform',`translate(${x},${y}) rotate(${rot}) scale(.95)`);flame.style.display=t<tLand?'block':'none';flame.setAttribute('transform',`scale(1,${0.75+0.45*hash(Math.floor(t*12))})`);
     const dk=P(t,tLand-0.8,tLand+1.8);puffs.forEach((p,i)=>{const a=(i/14-0.5)*2,sp=hash(i+3);p.setAttribute('cx',1520+a*(80+380*eo(dk))*(0.6+sp*.6));p.setAttribute('cy',812-30*eo(dk)*sp);
       p.setAttribute('rx',20+90*eo(dk)*sp);p.setAttribute('ry',8+26*eo(dk));p.setAttribute('opacity',dk>0&&dk<1?(1-dk)*0.85:0);});
     vis(h0,t,tA+0.3);hAl.style.opacity=(t>=tAl&&t<tRock&&Math.floor((t-tAl)*3)%2==0)?1:0;vis(hP,t,tRock,tMan+2);vis(hMan,t,tMan);vis(hF,t,tF60);vis(hC,t,tLand-0.2);
     const fuel=t<tF30?60:Math.round(lerp(30,25,P(t,tF30,tLand)));hF.textContent='COMBUSTÍVEL: '+fuel+' S';hF.className='hud'+(t>=tF30&&t<tLand&&Math.floor(t*4)%2?' red':'');});},
};

// ---- montagem: ordena as cenas e define quando cada uma sai ----
function finalize(){
  BEATS.sort((a,b)=>a.t0-b.t0);
  const main=BEATS.filter(b=>!b.side);
  for(let i=0;i<main.length;i++){const b=main[i],n=main[i+1];
    if(b.chapter){b.t1=b.t0+3.4;if(n&&n.t0<b.t1)n.t0=b.t1;}
    else b.t1=b.until||(n?n.t0:TOTAL-0.2);}
  BEATS.filter(b=>b.side).forEach(b=>{b.t1=b.until||b.t0+5;});
  BEATS.forEach((b,i)=>{CUR=b.cur;b.make(b,i+1);});
  const fade=document.getElementById('fade');ITEMS.push(t=>{fade.style.opacity=Math.max(1-P(t,0,0.8),P(t,TOTAL-2.2,TOTAL-0.2));});
}
const bg=document.getElementById('bg'),flick=document.getElementById('flick');const grains=[];
for(let i=0;i<6;i++){const g=el('img','abs grain',document.getElementById('grains'));g.src='assets/grain'+i+'.png';grains.push(g);}
function renderFrame(t){const f=Math.floor(t*25);
  bg.style.transform=`translate(${-190+Math.sin(t*0.07)*60}px,${-160+Math.cos(t*0.05)*40}px)`;
  grains.forEach((g,i)=>g.style.display=i==f%6?'block':'none');grains[f%6].style.transform=`translate(${(hash(f)-.5)*40}px,${(hash(f+1)-.5)*40}px) scale(1.05)`;
  flick.style.opacity=0.03+0.05*hash(f*1.7);
  for(const fn of ITEMS)fn(t);}
window.init=async function(total){
  SCRIPT=await (await fetch('roteiro.txt')).text();TOK=await (await fetch('tokens.json')).json();IMG=await (await fetch('img_sizes.json')).json();TOTAL=total;
  CUR=0;buildScenes();finalize();return SFX;};
window.renderFrame=renderFrame;
