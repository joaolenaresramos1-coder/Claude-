import sys
R=sys.argv[1]
p=R+'/engine.js';s=open(p).read()
def rep(a,b):
  global s
  assert a in s,a
  s=s.replace(a,b)
# 1) cortes internos: fotos longas ganham novos enquadramentos a cada ~4 s
rep("""   const z0=o.zoom||[1,1.09];
   ITEMS.push(t=>{im.style.transform=`scale(${lerp(z0[0],z0[1],P(t,b.t0,b.t1))})`;});""",
"""   const z0=o.zoom||[1,1.09];const dur=b.t1-b.t0;const nseg=Math.max(1,Math.round(dur/4.2));
   const shots=[...Array(nseg)].map((_,k)=>k==0?{s:z0[0],e:z0[1],fx:50,fy:50}:{s:1.22+0.25*hash(idx*11+k),e:1.3+0.25*hash(idx*11+k),fx:25+50*hash(idx*3+k*7),fy:25+50*hash(idx*5+k*3)});
   for(let k=1;k<nseg;k++){CUTS.push(b.t0+dur*k/nseg);SFX.push({t:b.t0+dur*k/nseg,type:'whoosh',v:.35});}
   ITEMS.push(t=>{const u=clamp((t-b.t0)/dur*nseg,0,nseg-0.0001),k=Math.floor(u),q=u-k,sh=shots[k];
     let sc=lerp(sh.s,sh.e,q),fx=sh.fx,fy=sh.fy;
     if(k>0){const pr=shots[k-1],qq=eo(clamp((t-(b.t0+dur*k/nseg))/0.45,0,1));sc=lerp(pr.e,sc,qq);fx=lerp(pr.fx,fx,qq);fy=lerp(pr.fy,fy,qq);}
     im.style.transformOrigin=(o.focus&&k==0)?o.focus:`${fx}% ${fy}%`;im.style.transform=`scale(${sc})`;});""")
# 2) entradas mais rápidas, com desfoque de movimento
rep("const tin=[b.t0-0.3,b.t0+0.65], tout=[b.t1-0.35,b.t1+0.45];","const tin=[b.t0-0.22,b.t0+0.42], tout=[b.t1-0.28,b.t1+0.3];")
rep("    node.style.transform=`translate(${x-w/2}px,${y-h/2}px) rotate(${r}deg)`;});}",
"""    const mv=t<tin[1]?1-P(t,tin[0],tin[1]):t>tout[0]?P(t,tout[0],tout[1]):0;node.style.filter=mv>0.05?`blur(${(mv*7).toFixed(1)}px)`:'none';
    node.style.transform=`translate(${x-w/2}px,${y-h/2}px) rotate(${r}deg)`;});}""")
# 3) tremida no carimbo
rep("SFX.push({t:t0+0.12,type:'stamp'});","SFX.push({t:t0+0.12,type:'stamp'});SHAKES.push(t0+0.12);")
rep("const SFX=[], ITEMS=[], BEATS=[]","const SFX=[], ITEMS=[], BEATS=[], CUTS=[], SHAKES=[], FLASH=[]")
# 4) câmera global
rep("function renderFrame(t){const f=Math.floor(t*25);","""let CAMT=[];
function renderFrame(t){const f=Math.floor(t*25);
  let pz=0;for(const c of CAMT){const d=t-c;if(d>=0&&d<1.2)pz=Math.max(pz,0.035*Math.exp(-d*3.2));}
  let sh=0;for(const c of SHAKES){const d=t-c;if(d>=0&&d<0.35)sh=Math.max(sh,(1-d/0.35));}
  const sx=(hash(f*1.3)-.5)*14*sh,sy=(hash(f*2.9)-.5)*14*sh;
  layer.style.transformOrigin='50% 50%';layer.style.transform=`translate(${Math.sin(t*0.11)*10+sx}px,${Math.cos(t*0.09)*7+sy}px) scale(${1.015+pz+0.01*Math.sin(t*0.13)})`;
  let fl=0;for(const c of FLASH){const d=t-c;if(d>=0&&d<0.25)fl=Math.max(fl,0.55*(1-d/0.25));}flash.style.opacity=fl;""")
rep("  BEATS.forEach((b,i)=>{CUR=b.cur;b.make(b,i+1);});","""  BEATS.forEach((b,i)=>{CUR=b.cur;b.make(b,i+1);});
  CAMT=main.map(b=>b.t0).concat(CUTS);BEATS.filter(b=>b.chapter).forEach(b=>FLASH.push(b.t0));""")
rep("const bg=document.getElementById('bg')","const flash=document.getElementById('flash'),bg=document.getElementById('bg')")
open(p,'w').write(s)
p=R+'/index.html';s=open(p).read()
if 'id="flash"' not in s:
  s=s.replace('<div id="fade" class="abs"></div>','<div id="flash" class="abs" style="width:1920px;height:1080px;background:#fff;opacity:0;z-index:55"></div>\n  <div id="fade" class="abs"></div>')
open(p,'w').write(s)
print("ok")
