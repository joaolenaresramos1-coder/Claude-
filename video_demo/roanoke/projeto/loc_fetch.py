import json,urllib.request,urllib.parse,time,sys,re,os
L=sys.argv[1];UA={'User-Agent':'DocumentaryResearchBot/1.0 (educational video project)'}
def get(u,js=True):
  for i in range(4):
    try:
      r=urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=60).read();return json.loads(r) if js else r
    except urllib.error.HTTPError as e:
      if e.code in (404,400): return None
      time.sleep(6*(i+1))
    except Exception: time.sleep(6*(i+1))
mf=f'{L}/licencas.json';meta=json.load(open(mf)) if os.path.exists(mf) else {}
Q=[l.split('|') for l in sys.argv[2].split(';')]
seen=set(v.get('url') for v in meta.values())
for prefix,q,n in Q:
  d=get('https://www.loc.gov/pictures/search/?'+urllib.parse.urlencode({'q':q,'fo':'json','c':int(n)+4}));time.sleep(2)
  if not d: print('sem busca',q,flush=True);continue
  k=0
  for r in d.get('results',[]):
    if k>=int(n): break
    full=r.get('image',{}).get('full','')
    if not full or full in seen: continue
    base=re.sub(r'(_150px|r|v|t)\.jpg$','',full)
    b=None
    for suf in ('v.jpg','r.jpg'):
      b=get((base+suf) if base.startswith('http') else 'https:'+base+suf,js=False)
      if b and len(b)>20000: break
    if not b: continue
    name=f"{prefix}_{k}_{re.sub(r'[^a-z0-9]+','_',r.get('title','').lower())[:40].strip('_')}.jpg"
    open(f'{L}/img/{name}','wb').write(b);seen.add(full)
    meta[name]={'file':r.get('title',''),'license':'Library of Congress — sem restrições conhecidas / domínio público','artist':r.get('creator','') or 'Library of Congress','url':full}
    json.dump(meta,open(mf,'w'),indent=1,ensure_ascii=False);print('ok',name,flush=True);k+=1;time.sleep(2)
print('FIM',flush=True)
