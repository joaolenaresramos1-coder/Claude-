// ===== Cena 2D de palavra-chave (usada quando faltam imagens) =====
const STOP=new Set('para pela pelo pelos pelas como mais muito muitos muitas entre sobre depois antes ainda quando onde porque então também tinha tinham estava estavam seria seriam foram foram desde havia aquela aquele aquilo outra outro outros outras mesmo mesma todos todas cada esse essa esses essas este esta isso nunca sempre quase apenas'.split(' '));
function palavraChave(t){let i=TOK.findIndex(x=>x[1]>=t);if(i<0)i=TOK.length-1;const a=TOK[Math.max(0,i)][0];const frag=SCRIPT.slice(a,a+160).split(/[.?!]/)[0];
  const ws=frag.split(/\s+/).map(w=>w.replace(/[^A-Za-zÀ-ÿ0-9-]/g,'')).filter(Boolean);
  let best='',sc=-1;ws.forEach((w,k)=>{const lw=w.toLowerCase();if(STOP.has(lw)||w.length<4)return;let v=w.length+(/^[A-ZÀ-Ý]/.test(w)&&k>0?8:0)+(/\d/.test(w)?10:0);if(v>sc){sc=v;best=w;}});
  return {pal:(best||ws[0]||'').toUpperCase(),frase:ws.slice(0,9).join(' ').toUpperCase()};}
B.palavraAt=function(t0){BEATS.push({kind:'palavra',filler:true,cur:CUR,t0:t0,until:null,make:(b,idx)=>{
  const {pal,frase}=palavraChave(b.t0+0.3);const d=el('div','ttl');d.style.zIndex=ZI++;
  const sv=svgEl('svg',{width:1920,height:1080,style:'position:absolute;left:0;top:0'},d);const g=svgEl('g',{},sv);const st=Math.floor(hash(idx)*3);
  if(st===0){for(let k=0;k<16;k++)svgEl('line',{x1:960,y1:540,x2:960+Math.cos(k*Math.PI/8)*900,y2:540+Math.sin(k*Math.PI/8)*900,stroke:'rgba(215,236,232,.08)','stroke-width':2},g);
    svgEl('circle',{cx:960,cy:540,r:330,fill:'none',stroke:'rgba(215,236,232,.12)','stroke-width':3},g);svgEl('circle',{cx:960,cy:540,r:420,fill:'none',stroke:'rgba(215,236,232,.08)','stroke-width':2,'stroke-dasharray':'6 10'},g);}
  else if(st===1){for(let k=0;k<12;k++)svgEl('path',{d:`M0 ${120+k*80} q 240 -40 480 0 t 480 0 t 480 0 t 480 0`,fill:'none',stroke:'rgba(215,236,232,.09)','stroke-width':3},g);}
  else {for(let k=0;k<9;k++)svgEl('rect',{x:160+k*190,y:300+hash(k+idx)*200,width:120,height:160,fill:'rgba(236,230,214,.06)',stroke:'rgba(236,230,214,.12)',transform:`rotate(${(hash(k*3)-.5)*30} ${220+k*190} 380)`},g);}
  const w=el('div','l2',d,pal);w.style.fontSize=(pal.length>11?110:150)+'px';w.style.letterSpacing='4px';
  const r=el('div','rule',d);r.style.height='5px';const f=el('div','l1',d,frase);f.style.cssText+=';font-size:28px;margin-top:26px;max-width:1500px;white-space:normal;opacity:.85';
  SFX.push({t:b.t0+0.1,type:'whoosh',v:.6});SFX.push({t:b.t0+0.35,type:'hit'});
  ITEMS.push(t=>{const on=P(t,b.t0-0.2,b.t0+0.25)*(1-P(t,b.t1-0.3,b.t1));d.style.opacity=on;d.style.display=on>0?'flex':'none';if(!on)return;
    d.style.background='radial-gradient(ellipse at 50% 50%,rgba(0,0,0,.18),rgba(0,0,0,.6))';const k=eo(P(t,b.t0,b.t0+0.7)),life=P(t,b.t0,b.t1);
    w.style.opacity=k;w.style.transform=`scale(${lerp(1.25,1,k)+0.05*life})`;w.style.letterSpacing=lerp(30,4,k)+'px';r.style.width=lerp(0,600,eio(P(t,b.t0+0.3,b.t0+1)))+'px';f.style.opacity=0.85*P(t,b.t0+0.6,b.t0+1.1);
    g.style.transformOrigin='960px 540px';g.style.transform=st===0?`rotate(${life*25}deg) scale(${1+life*0.1})`:`translate(${lerp(0,-240,life)}px,0)`;});}});};
