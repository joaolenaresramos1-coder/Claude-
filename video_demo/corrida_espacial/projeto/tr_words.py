import sys,json,wave,numpy as np
from faster_whisper import WhisperModel
m=WhisperModel("small",device="cpu",compute_type="int8",cpu_threads=4)
w=wave.open(sys.argv[1]);a=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768
segs,info=m.transcribe(a,language="pt",word_timestamps=True,vad_filter=False,beam_size=1)
out=[]
for s in segs:
  for x in s.words: out.append([round(x.start,3),round(x.end,3),x.word])
  print(f"{s.start:.1f}",s.text[:60],flush=True)
json.dump(out,open(sys.argv[2],"w"))
