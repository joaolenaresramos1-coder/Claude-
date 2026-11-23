import sys
R=sys.argv[1]
p=R+'/engine.js';s=open(p).read()
def rep(a,b):
  global s
  assert a in s,a
  s=s.replace(a,b)

# ---- vídeos reais (sequências de quadros) dentro das molduras ----
rep("const sz=IMG[img]; if(!sz){console.warn('sem imagem',img);return;}",
"""const isClip=img.startsWith('clip:'),cn=isClip?img.slice(5):null;
   const sz=isClip?[CLIPS[cn][1],CLIPS[cn][2]]:IMG[img]; if(!sz){console.warn('sem imagem',img);return;}""")
rep("const im=el('img',null,phd);im.src='../imagens/'+img;",
"""const im=el('img',null,phd);im.src=isClip?`../clips/${cn}/f_0001.jpg`:'../imagens/'+img;
   if(isClip){const N=CLIPS[cn][0],sp=o.speed||1,off=o.off||0;let last=-1;
     el('div','lbl',lab,'FILMAGEM REAL · NASA').style.cssText='left:auto;right:24px;top:auto;bottom:24px;background:#a3221a';
     ITEMS.push(t=>{if(t<b.t0-0.5||t>(b.parkEnd||b.t1)+0.5)return;const k=Math.min(N,Math.max(1,1+off+Math.floor((t-b.t0+0.3)*25*sp)));
       if(k!==last){last=k;im.src=`../clips/${cn}/f_${String(k).padStart(4,'0')}.jpg`;DECODE.push(im);}});}""")
rep("const box=pos==='c'?[1180,880]:[800,820];","const box=pos==='c'?[1040,800]:[800,800];")

# ---- quadro de investigação: fotos não saem, encolhem e ficam presas na tela ----
rep("const tin=[b.t0-0.22,b.t0+0.42], tout=[b.t1-0.28,b.t1+0.3];",
"const tin=[b.t0-0.22,b.t0+0.42], tout=b.park?[b.parkEnd-0.25,b.parkEnd+0.35]:[b.t1-0.28,b.t1+0.3];")
rep("    else if(t>tout[0]){const q=ei(P(t,tout[0],tout[1]));x=lerp(at.x,at.x+dout.x,q);y=lerp(at.y,at.y+dout.y,q);r=lerp(at.r,at.r+rout,q);}",
"""    if(b.park&&t>=b.t1-0.3){const q=eio(P(t,b.t1-0.3,b.t1+0.5));const S=b.slot;x=lerp(at.x,S.x,q);y=lerp(at.y,S.y,q);r=lerp(at.r,S.r,q);sc*=lerp(1,S.s,q);
      if(t>tout[0]){const q2=ei(P(t,tout[0],tout[1]));x=lerp(S.x,S.x+dout.x,q2);y=lerp(S.y,S.y+dout.y,q2);}}
    else if(t>tout[0]){const q=ei(P(t,tout[0],tout[1]));x=lerp(at.x,at.x+dout.x,q);y=lerp(at.y,at.y+dout.y,q);r=lerp(at.r,at.r+rout,q);}""")
rep("const life=P(t,tin[0],tout[1]);x+=drift[0]*life;y+=drift[1]*life;","const life=P(t,tin[0],b.t1);x+=drift[0]*life;y+=drift[1]*life;")
rep("const mv=t<tin[1]?1-P(t,tin[0],tin[1]):t>tout[0]?P(t,tout[0],tout[1]):0;",
    "const mv=t<tin[1]?1-P(t,tin[0],tin[1]):t>tout[0]?P(t,tout[0],tout[1]):0;if(b.park&&t>b.t1-0.3&&t<tout[0])node.style.zIndex=5;")

# ---- contador de ano nas cartelas de capítulo ----
rep("const d=el('div','ttl');d.style.zIndex=ZI++;const c=el('div','ch',d,'CAPÍTULO '+num);",
"""const d=el('div','ttl');d.style.zIndex=ZI++;const YR={1:[1939,1945],2:[1945,1957],3:[1957,1961],4:[1961,1962],5:[1962,1965],6:[1965,1966],7:[1966,1967],8:[1967,1968],9:[1968,1969],10:[1969,1969],11:[1969,1969],12:[1969,1975]}[num];
   const yr=el('div','yr',d);yr.style.cssText="font:700 150px/1 'Libre Baskerville',serif;color:#c0302a;margin-bottom:18px;letter-spacing:6px";
   ITEMS.push(t=>{if(YR)yr.textContent=Math.round(lerp(YR[0],YR[1],eo(P(t,b.t0+0.1,b.t0+1.5))));});SFX.push({t:b.t0+0.1,type:'type',n:12,cps:10});
   const c=el('div','ch',d,'CAPÍTULO '+num);""")

# ---- montagem: remove duplicadas, calcula estacionamento e linhas vermelhas ----
rep("  BEATS.sort((a,b)=>a.t0-b.t0);\n  const main=BEATS.filter(b=>!b.side);",
"""  BEATS.sort((a,b)=>a.t0-b.t0);
  for(let i=BEATS.length-2;i>=0;i--){const a=BEATS[i],c=BEATS[i+1];if(!a.side&&!c.side&&Math.abs(a.t0-c.t0)<0.05)BEATS.splice(i,1);}
  const main=BEATS.filter(b=>!b.side);""")
rep("  BEATS.filter(b=>b.side).forEach(b=>{b.t1=b.until||b.t0+5;});",
"""  BEATS.filter(b=>b.side).forEach(b=>{b.t1=b.until||b.t0+5;});
  const SLOTS=[{x:300,y:250,r:-6,s:.36},{x:1620,y:250,r:5,s:.36},{x:300,y:835,r:4,s:.36},{x:1620,y:835,r:-5,s:.36},{x:960,y:150,r:2,s:.3},{x:960,y:950,r:-3,s:.3}];
  let run=[],k=0;
  for(let i=0;i<main.length;i++){const b=main[i];
    if(b.kind==='card'&&!b.until){run.push(b);b.park=true;b.slot=SLOTS[k++%SLOTS.length];}
    else {run.forEach(x=>x.parkEnd=b.t0);run=[];k=0;}
    while(run.filter(x=>!x.parkEnd).length>4){run.find(x=>!x.parkEnd).parkEnd=b.t0+0.4;}}
  run.forEach(x=>x.parkEnd=TOTAL);
  main.forEach(b=>{if(b.park&&(!b.parkEnd||b.parkEnd<=b.t1+0.6)){b.park=false;}});
  // linhas vermelhas entre fotos estacionadas (quadro de investigação)
  const ln=svgEl('svg',{width:1920,height:1080,style:'position:absolute;left:0;top:0;z-index:6'},layer);
  const parked=main.filter(b=>b.park);
  for(let i=1;i<parked.length;i++){const a=parked[i-1],c=parked[i];const t0=Math.max(a.t1,c.t1)+0.4,t1=Math.min(a.parkEnd,c.parkEnd)-0.2;if(t1-t0<1)continue;
    const L=svgEl('line',{x1:a.slot.x,y1:a.slot.y,x2:c.slot.x,y2:c.slot.y,stroke:'#b8241c','stroke-width':4,opacity:.85},ln);
    const len=Math.hypot(c.slot.x-a.slot.x,c.slot.y-a.slot.y);L.style.strokeDasharray=len;
    [a.slot,c.slot].forEach(S=>svgEl('circle',{cx:S.x,cy:S.y,r:9,fill:'#d33',stroke:'#600','stroke-width':2},ln));
    SFX.push({t:t0,type:'scribble',d:.4});
    ITEMS.push(t=>{const on=t>=t0&&t<=t1;L.style.display=on?'block':'none';L.style.strokeDashoffset=len*(1-eio(P(t,t0,t0+0.5)));});}
  // pinos: só aparecem enquanto há linhas
  ITEMS.push(t=>{ln.querySelectorAll('circle').forEach(()=>{});});""")
# marca o tipo de cada cena
rep("card(img,phrase,o={}){BEATS.push({cur:CUR,","card(img,phrase,o={}){BEATS.push({kind:'card',cur:CUR,")
rep(" anim(kind,phrase,o={}){BEATS.push({cur:CUR,"," clip(name,phrase,o={}){B.card('clip:'+name,phrase,o);},\n anim(kind,phrase,o={}){BEATS.push({cur:CUR,")
# ---- câmera em movimento contínuo (sem parar), como na referência ----
rep("let pz=0;for(const c of CAMT){const d=t-c;if(d>=0&&d<1.2)pz=Math.max(pz,0.035*Math.exp(-d*3.2));}",
    "let pz=0.035*(0.5-0.5*Math.cos(t*2*Math.PI/11));for(const c of CAMT){const d=t-c;if(d>=0&&d<1.2)pz+=0.018*Math.exp(-d*3.2);}")
rep("const SFX=[], ITEMS=[], BEATS=[]","const DECODE=[];let CLIPS={};const SFX=[], ITEMS=[], BEATS=[]")
rep("IMG=await (await fetch('img_sizes.json')).json();","IMG=await (await fetch('img_sizes.json')).json();CLIPS=await (await fetch('clips.json')).json();")
rep("  for(const fn of ITEMS)fn(t);}","  DECODE.length=0;for(const fn of ITEMS)fn(t);return Promise.all(DECODE.map(i=>i.decode().catch(()=>0)));}")
open(p,'w').write(s)
# fundo mais discreto
p=R+'/engine.js';s=open(p).read()
s=s.replace("d.style.opacity=Math.min(1,Math.min(q,1-q)*6)*0.55","d.style.opacity=Math.min(1,Math.min(q,1-q)*6)*0.35")
open(p,'w').write(s)
print('ok')
