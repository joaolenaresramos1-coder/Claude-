const {chromium}=require('playwright');const fs=require('fs');const {spawn}=require('child_process');
(async()=>{
 const [dir,mode,out,...rest]=process.argv.slice(2);const TOTAL=+fs.readFileSync(dir+'/../total.txt','utf8');
 const b=await chromium.launch({args:['--allow-file-access-from-files']});
 const pg=await b.newPage({viewport:{width:1920,height:1080}});
 pg.on('pageerror',e=>console.error('PAGEERR',e.message));pg.on('console',m=>{if(m.type()!=='log')console.error('CONSOLE',m.text())});
 await pg.goto('file://'+dir+'/index.html');await pg.evaluate(()=>document.fonts.ready);
 const sfx=await pg.evaluate(t=>init(t),TOTAL);
 await pg.waitForFunction(()=>[...document.images].every(i=>i.complete),null,{timeout:120000});
 const bad=await pg.evaluate(()=>[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src));if(bad.length)console.error('IMAGENS RUINS',bad);
 if(mode==='check'){fs.writeFileSync(dir+'/../sfx.json',JSON.stringify(sfx));console.log('ok',sfx.length,'eventos');}
 else if(mode==='stills'){for(const t of rest){await pg.evaluate(t=>renderFrame(t),+t);await pg.screenshot({path:`${out}/st_${String((+t).toFixed(1)).padStart(6,'0')}.jpg`,type:'jpeg',quality:75});}}
 else{const fps=25;const [f0,f1]=rest.map(Number);
  const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate',''+fps,'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','19','-pix_fmt','yuv420p',out],{stdio:['pipe','inherit','inherit']});
  for(let i=f0;i<f1;i++){await pg.evaluate(t=>renderFrame(t),i/fps);const buf=await pg.screenshot({type:'jpeg',quality:92});
   if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));if((i-f0)%500==0)console.log(out.split('/').pop(),i-f0,'/',f1-f0);}
  ff.stdin.end();await new Promise(r=>ff.on('close',r));}
 await b.close();})().catch(e=>{console.error('ERRO',e.message);process.exit(1)});
