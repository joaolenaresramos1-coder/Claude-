import sys
R=sys.argv[1]
p=R+'/engine.js';s=open(p).read()
def rep(a,b):
  global s
  assert a in s,a
  s=s.replace(a,b)
# imagem e círculo dentro do mesmo "envelope" que recebe o zoom
rep("const im=el('img',null,phd);im.src=isClip?",
    "const zw=el('div',null,phd);zw.style.cssText='position:absolute;left:0;top:0;width:100%;height:100%;transform-origin:50% 50%';const im=el('img',null,zw);im.src=isClip?")
rep("if(o.circle){const q=o.circle;addCircle(lab,16+q[0]*pw,16+q[1]*ph,q[2]*pw,q[3]*ph,tt(q[4],b.t0+1),0.55,idx);}",
    "if(o.circle){const q=o.circle;addCircle(zw,q[0]*pw,q[1]*ph,q[2]*pw,q[3]*ph,tt(q[4],b.t0+1),0.55,idx);}")
# reenquadramentos miram no objeto circulado
rep("const shots=[...Array(nseg)].map((_,k)=>",
    "const CQ=o.circle;const shots0=[...Array(nseg)].map((_,k)=>")
rep("   for(let k=1;k<nseg;k++){CUTS.push(",
    "   const shots=shots0.map((sh,k)=>CQ&&k>0?{s:Math.min(sh.s,1.3),e:Math.min(sh.e,1.35),fx:CQ[0]*100,fy:CQ[1]*100}:sh);\n   for(let k=1;k<nseg;k++){CUTS.push(")
rep("im.style.transformOrigin=(o.focus&&k==0)?o.focus:`${fx}% ${fy}%`;im.style.transform=`scale(${sc})`;",
    "zw.style.transformOrigin=(o.focus&&k==0)?o.focus:`${fx}% ${fy}%`;zw.style.transform=`scale(${sc})`;")
open(p,'w').write(s)
# posições corretas
p=R+'/cenas.js';s=open(p).read()
rep2=[("circle:[0.48,0.45,0.18,0.25,'quatro antenas']","circle:[0.215,0.43,0.14,0.19,'bola de praia']"),
      ("circle:[0.84,0.6,0.12,0.3,'von Braun']","circle:[0.73,0.38,0.1,0.13,'von Braun']")]
for a,b in rep2:
  assert a in s,a
  s=s.replace(a,b)
open(p,'w').write(s)
print('ok')
