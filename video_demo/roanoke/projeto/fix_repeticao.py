import sys
R=sys.argv[1]
p=R+'/engine.js';s=open(p).read()
def rep(a,b):
  global s
  assert a in s,a
  s=s.replace(a,b)
# escolha com espaçamento: imagem não volta antes de 120 s e no máximo 2 usos no total
rep("const recent=[];const pick=(c,avoid)=>{",
"""const LAST={},USES={};BEATS.forEach(x=>{if(x.kind==='card'&&x.img&&!x.filler){USES[x.img]=(USES[x.img]||0)+1;LAST[x.img]=Math.max(LAST[x.img]||-1e9,x.t0);}});
   const okImg=(n,t,avoid)=>n!==avoid&&!n.startsWith('clip:')&&(LAST[n]===undefined||Math.abs(t-LAST[n])>120)&&(USES[n]||0)<2;
   const pickT=(c,avoid,t)=>{let p=poolFor(c).filter(n=>okImg(n,t,avoid));if(!p.length)p=Object.keys(IMG).filter(n=>okImg(n,t,avoid));if(!p.length)return null;
     p.sort((a,b)=>((USES[a]||0)-(USES[b]||0))||(hash(a.length+t)-hash(b.length+t)));const n=p[0];USES[n]=(USES[n]||0)+1;LAST[n]=t;return n;};
   const recent=[];const pick=(c,avoid)=>{""")
rep("let img=pick(chOf(t+0.1),last);if(img&&i==n-1&&img===nextImg)img=pick(chOf(t+0.1),nextImg);if(!img)return;",
    "let img=pickT(chOf(t+0.1),last,t);if(img&&i==n-1&&img===nextImg)img=pickT(chOf(t+0.1),nextImg,t);if(!img){B.palavraAt(t);last=null;continue;}")
open(p,'w').write(s);print('engine ok')
