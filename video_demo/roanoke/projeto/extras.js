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
