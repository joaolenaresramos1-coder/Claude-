const {chromium}=require('playwright');const fs=require('fs');const {spawn}=require('child_process');
(async()=>{
 const [dir,mode,out,...rest]=process.argv.slice(2);
 const cue=JSON.parse(fs.readFileSync(dir+'/../cues.json'));
 const b=await chromium.launch({args:['--allow-file-access-from-files']});
 const pg=await b.newPage({viewport:{width:1920,height:1080}});
 pg.on('pageerror',e=>console.error('PAGEERR',e.message));
 await pg.goto('file://'+dir+'/index.html');
 await pg.evaluate(()=>document.fonts.ready);
 await pg.waitForFunction(()=>[...document.images].every(i=>i.complete));
 const sfx=await pg.evaluate(([c,t])=>init(c,t),[cue.cues,cue.total]);
 await pg.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
 fs.writeFileSync(dir+'/../sfx.json',JSON.stringify(sfx));
 if(mode==='stills'){for(const t of rest){await pg.evaluate(t=>renderFrame(t),+t);await pg.screenshot({path:`${out}/st_${(+t).toFixed(2)}.jpg`,type:'jpeg',quality:80});}}
 else{
  const fps=25,N=Math.round(cue.total*fps);
  const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate',''+fps,'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p',out],{stdio:['pipe','inherit','inherit']});
  for(let i=0;i<N;i++){await pg.evaluate(t=>renderFrame(t),i/fps);const buf=await pg.screenshot({type:'jpeg',quality:93});
   if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));if(i%250==0)console.log('frame',i,'/',N);}
  ff.stdin.end();await new Promise(r=>ff.on('close',r));
 }
 await b.close();
})();
