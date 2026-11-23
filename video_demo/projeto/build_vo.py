import wave,numpy as np,json,sys,os
d=sys.argv[1]; ids=[f"s{i:02d}" for i in range(1,12)]
gap={"s01":0.9,"s02":0.45,"s03":0.6,"s04":0.45,"s05":0.45,"s06":0.4,"s07":0.4,"s08":0.9,"s09":0.5,"s10":0.4,"s11":0}
lead=0.6; sr=None; out=[np.zeros(0)]; t=lead; cues={}
for i in ids:
  w=wave.open(f"{d}/{i}.wav"); sr=w.getframerate()
  a=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768
  # trim trailing silence
  nz=np.where(np.abs(a)>0.01)[0]; a=a[:nz[-1]+int(.08*sr)]
  cues[i]=[round(t,3),round(t+len(a)/sr,3)]
  out.append(a); out.append(np.zeros(int(gap[i]*sr))); t+=len(a)/sr+gap[i]
full=np.concatenate([np.zeros(int(lead*sr))]+out[1:]+[np.zeros(int(1.6*sr))])
w=wave.open(f"{d}/../narracao.wav","wb");w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr)
w.writeframes((np.clip(full,-1,1)*32767).astype(np.int16).tobytes());w.close()
json.dump({"cues":cues,"total":round(len(full)/sr,3)},open(f"{d}/../cues.json","w"),indent=1)
print(json.dumps(cues),len(full)/sr)
