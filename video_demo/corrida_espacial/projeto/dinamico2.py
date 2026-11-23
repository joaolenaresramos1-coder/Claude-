import sys,re
R=sys.argv[1]
p=R+'/engine.js';s=open(p).read()
def rep(a,b,cnt=1):
  global s
  assert s.count(a)>=1,a
  s=s.replace(a,b)
# cortes mais frequentes e movimentos variados (zoom in, zoom out, panorâmica, inclinação)
rep("const nseg=Math.max(1,Math.round(dur/4.2));","const nseg=Math.max(1,Math.round(dur/2.5));")
rep("k==0?{s:z0[0],e:z0[1],fx:50,fy:50}:{s:1.22+0.25*hash(idx*11+k),e:1.3+0.25*hash(idx*11+k),fx:25+50*hash(idx*3+k*7),fy:25+50*hash(idx*5+k*3)}",
    "k==0?{s:z0[0],e:z0[1]+0.04,fx:50,fy:50}:(k%3==1?{s:1.55+0.2*hash(idx+k),e:1.25,fx:20+60*hash(idx*3+k*7),fy:25+50*hash(idx*5+k*3)}:k%3==2?{s:1.2,e:1.5,fx:hash(idx+k*9)<.5?15:85,fy:40+20*hash(idx+k)}:{s:1.08,e:1.35,fx:30+40*hash(idx*7+k),fy:20+60*hash(idx*2+k)})")
# entradas variadas: deslizar, saltar (pop), girar, cair, virar
rep("const tin=[b.t0-0.22,b.t0+0.42], tout=[b.t1-0.28,b.t1+0.3];","const tin=[b.t0-0.22,b.t0+0.42], tout=[b.t1-0.28,b.t1+0.3];const style=Math.floor(hash(idx*13.7)*5);")
rep("""    if(t<tin[1]){const q=eback(P(t,tin[0],tin[1]));x=lerp(at.x+di.x,at.x,q);y=lerp(at.y+di.y,at.y,q);r=lerp(at.r+rin,at.r,q);}""",
"""    let sc=1,sx=1;
    if(t<tin[1]){const q=eback(P(t,tin[0],tin[1]));
      if(style==1){sc=lerp(0.2,1,q);r=lerp(at.r-25,at.r,q);}
      else if(style==2){sc=lerp(0.6,1,q);r=lerp(at.r+200,at.r,q);x=lerp(at.x+di.x*0.4,at.x,q);}
      else if(style==3){y=lerp(at.y-1300,at.y,q);r=lerp(at.r-12,at.r,q);}
      else if(style==4){sx=Math.max(0.02,q);sc=lerp(0.85,1,q);}
      else {x=lerp(at.x+di.x,at.x,q);y=lerp(at.y+di.y,at.y,q);r=lerp(at.r+rin,at.r,q);}}""")
rep("node.style.transform=`translate(${x-w/2}px,${y-h/2}px) rotate(${r}deg)`;});}",
    "node.style.transform=`translate(${x-w/2}px,${y-h/2}px) rotate(${r}deg) scale(${sc*sx},${sc})`;});}")
# digitação mais rápida
rep("const cps=opt.cps||22;","const cps=opt.cps||34;")
rep("const t0=tt(L[1],b.t0+0.5+i*0.4);const cps=26;","const t0=tt(L[1],b.t0+0.3+i*0.3);const cps=38;")
# clarões de filme (luz quente) nas trocas de cena
rep("let fl=0;for(const c of FLASH)","let lk=0;for(const c of CAMT){const d=t-c;if(d>=0&&d<0.5&&hash(Math.floor(c*10))>0.5)lk=Math.max(lk,0.5*Math.sin(Math.PI*d/0.5));}leak.style.opacity=lk;leak.style.backgroundPosition=`${(hash(Math.floor(t))*100).toFixed(0)}% 50%`;\n  let fl=0;for(const c of FLASH)")
rep("const flash=document.getElementById('flash')","const leak=document.getElementById('leak'),flash=document.getElementById('flash')")
# mural de fotos do capítulo flutuando ao fundo (paralaxe)
rep("  CAMT=main.map(b=>b.t0).concat(CUTS);","""  CAMT=main.map(b=>b.t0).concat(CUTS);
  const chs=BEATS.filter(b=>b.chapter).map(b=>b.t0);const bounds=[0,...chs,TOTAL];
  const back=document.getElementById('back');
  for(let c=0;c<bounds.length-1;c++){
    const tag=String(c).padStart(2,'0');let pool=Object.keys(IMG).filter(n=>n.startsWith('c'+tag+'_')||n.startsWith('b_c'+tag+'_'));
    if(c==0)pool=Object.keys(IMG).filter(n=>/^0\\d_/.test(n));if(c==9||c==10||c==11)pool=pool.concat(Object.keys(IMG).filter(n=>/^0\\d_/.test(n)));
    if(!pool.length)continue;
    for(let t0=bounds[c],i=0;t0<bounds[c+1]-1;t0+=2.3,i++){
      const n=pool[Math.floor(hash(t0*3.3+i)*pool.length)],sz=IMG[n],asp=sz[0]/sz[1];
      const w=Math.round(260+180*hash(t0+i*5)),h=Math.round(w/asp);const life=10;
      const d=el('div','card',back);d.style.width=w+'px';d.style.padding='8px';
      const ph=el('div','ph',d);ph.style.height=h+'px';const im=el('img',null,ph);im.src='../imagens/'+n;
      const fromL=hash(t0*7+i)<.5,y0=80+hash(t0*11+i)*900,y1=y0+(hash(t0+i*3)-.5)*240,rr=(hash(t0*5)-.5)*40;
      const ta=t0,tb=t0+life;
      ITEMS.push(t=>{if(t<ta||t>tb){d.style.display='none';return;}d.style.display='block';const q=(t-ta)/life;
        const x=fromL?lerp(-500,2000,q):lerp(2000,-500,q),y=lerp(y0,y1,q);
        d.style.opacity=Math.min(1,Math.min(q,1-q)*6)*0.55;d.style.transform=`translate(${x}px,${y}px) rotate(${rr+q*14}deg)`;});
    }}""")
open(p,'w').write(s)
p=R+'/index.html';s=open(p).read()
s=s.replace('<div id="layer" class="abs"></div>','<div id="back" class="abs" style="width:1920px;height:1080px;filter:blur(2px) brightness(.62) saturate(.7)"></div>\n  <div id="layer" class="abs"></div>')
s=s.replace('<div id="flash"','<div id="leak" class="abs" style="width:1920px;height:1080px;opacity:0;z-index:54;mix-blend-mode:screen;background:radial-gradient(ellipse 60% 90% at 85% 40%,rgba(255,150,60,.9),rgba(255,80,20,.4) 40%,rgba(0,0,0,0) 75%);background-size:180% 100%"></div>\n  <div id="flash"')
open(p,'w').write(s)
print('ok')
