import json,re,sys,difflib,unicodedata
script=open(sys.argv[1]).read(); words=json.load(open(sys.argv[2]))
def norm(s):
    s=unicodedata.normalize('NFD',s.lower()); s=''.join(c for c in s if unicodedata.category(c)!='Mn')
    return re.sub(r'[^a-z0-9]','',s)
toks=[{'w':m.group(0),'pos':m.start()} for m in re.finditer(r'\S+',script)]
A=[norm(t['w']) for t in toks]; B=[norm(w[2]) for w in words]
sm=difflib.SequenceMatcher(None,A,B,autojunk=False)
st=[None]*len(A); en=[None]*len(A)
for a,b,n in sm.get_matching_blocks():
    for k in range(n): st[a+k]=words[b+k][0]; en[a+k]=words[b+k][1]
matched=sum(x is not None for x in st)
# interpolate gaps
i=0
while i<len(A):
    if st[i] is None:
        j=i
        while j<len(A) and st[j] is None: j+=1
        t0=en[i-1] if i>0 else 0.0; t1=st[j] if j<len(A) else words[-1][1]
        for k in range(i,j):
            f=(k-i)/(j-i); g=(k-i+1)/(j-i); st[k]=t0+(t1-t0)*f; en[k]=t0+(t1-t0)*g
        i=j
    else: i+=1
for k,t in enumerate(toks): t['t']=round(st[k],3); t['e']=round(en[k],3); t['n']=A[k]
json.dump(toks,open(sys.argv[3],'w'),ensure_ascii=False)
print('tokens',len(A),'matched',matched,f'{matched/len(A):.1%}')
# paragraph timings
paras=[p for p in script.split('\n\n') if p.strip()]
