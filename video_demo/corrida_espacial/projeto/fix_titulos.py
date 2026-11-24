import sys
R=sys.argv[1]
p=R+'/engine.js';s=open(p).read()
def rep(a,b):
  global s
  assert a in s,a
  s=s.replace(a,b)
# título guarda o momento da frase de impacto
rep(" title(l1,l2,phrase,o={}){BEATS.push({cur:CUR,",
    " title(l1,l2,phrase,o={}){const _tb=o.big?T(o.big):T(phrase)+0.9,_ts=o.strike?T(o.strike):_tb;BEATS.push({kind:'title',tkey:Math.min(_tb,_ts),cur:CUR,")
# cartão com tempo numérico (para preencher)
rep(" clip(name,phrase,o={}){B.card('clip:'+name,phrase,o);},",
""" clip(name,phrase,o={}){B.card('clip:'+name,phrase,o);},
 cardAt(img,t0,o={}){const c0=CUR;const save=T;T=(ph)=>typeof ph==='number'?ph:save(ph);try{B.card(img,'__AT__',o);}finally{T=save;}},""")
rep("card(img,phrase,o={}){BEATS.push({kind:'card',cur:CUR,t0:T(phrase),",
    "card(img,phrase,o={}){BEATS.push({kind:'card',filler:!!o.filler,cur:CUR,t0:(o.at!=null?o.at:T(phrase)),")
# antes de calcular a duração das cenas: encurta títulos e preenche o resto com fotos/vídeos do capítulo
rep("  const main=BEATS.filter(b=>!b.side);",
"""  let main=BEATS.filter(b=>!b.side);
  {const chs=BEATS.filter(b=>b.chapter).map(b=>b.t0).sort((a,b)=>a-b);const chOf=t=>{let c=0;chs.forEach((x,i)=>{if(t>=x)c=i+1;});return c;};
   const used={};const pools={};
   const poolFor=c=>{if(pools[c])return pools[c];const tag=String(c).padStart(2,'0');
     let p=Object.keys(IMG).filter(n=>n.startsWith('c'+tag+'_')||n.startsWith('b_c'+tag+'_'));
     if(c==0)p=Object.keys(IMG).filter(n=>/^0\\d_/.test(n));if(c>=9)p=p.concat(Object.keys(IMG).filter(n=>/^0\\d_/.test(n)));
     const clipsBy={9:['multidao','pad_longe','ignicao','motores_f1','lancamento_cor','subida','sala_lancamento'],10:['separacao','subida'],11:['escada_armstrong','aldrin_desce','bandeira'],12:['bandeira','lancamento_cor'],8:['subida'],2:['ignicao'],4:['lancamento_cor']}[c]||[];
     p=p.concat(clipsBy.map(x=>'clip:'+x));return pools[c]=p;};
   const pick=c=>{const p=poolFor(c);if(!p.length)return null;let best=p[0],bu=1e9;p.forEach((n,i)=>{const u=(used[n]||0)*10+hash(i+c*7)*3;if(u<bu){bu=u;best=n;}});used[best]=(used[best]||0)+1;return best;};
   const fill=(a,b)=>{const n=Math.max(1,Math.round((b-a)/3.2));for(let i=0;i<n;i++){const t=a+(b-a)*i/n;const img=pick(chOf(t+0.1));if(!img)return;
     const save=CUR;BEATS.push({kind:'card',filler:true,cur:CUR,t0:t,until:null,side:false,make:(bb,idx)=>{}});BEATS.pop();
     B.card(img,null,{at:t,zoom:[1.05+0.3*hash(t),1.25+0.3*hash(t+1)],off:Math.floor(hash(t*3)*80)});}};
   const fills=[];
   main.forEach((b,i)=>{if(b.kind!=='title')return;const n=main[i+1];const end=n?n.t0:TOTAL-0.2;const st=Math.max(b.t0,b.tkey-2.2);
     if(st-b.t0>2.5){fills.push([b.t0,st]);b.t0=st;}
     if(end-(b.tkey+3.4)>2.5){b.until=b.tkey+3.4;fills.push([b.tkey+3.4,end]);}});
   fills.forEach(([a,b])=>fill(a,b));
   BEATS.sort((a,b)=>a.t0-b.t0);main=BEATS.filter(b=>!b.side);}""")
open(p,'w').write(s)
print('ok')
