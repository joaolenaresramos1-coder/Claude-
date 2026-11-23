import numpy as np, sys
from PIL import Image, ImageFilter
A=sys.argv[1]; rng=np.random.default_rng(7)
def fbm(w,h,octs=6,base=4):
    out=np.zeros((h,w),np.float32); amp=1; tot=0
    for o in range(octs):
        s=base*2**o; n=rng.random((int(h/w*s)+2,s+2)).astype(np.float32)
        im=Image.fromarray((n*255).astype(np.uint8)).resize((w,h),Image.BICUBIC)
        out+=amp*np.asarray(im,np.float32)/255; tot+=amp; amp*=0.55
    out/=tot; return (out-out.min())/(out.max()-out.min())
# teal mottled background
W,H=2300,1400; n=fbm(W,H,7,3); n2=fbm(W,H,4,12)
v=(0.65*n+0.35*n2)[...,None]
dark=np.array([14,32,33]); light=np.array([44,78,76])
bg=dark+(light-dark)*v**1.3
bg+=rng.normal(0,3,(H,W,1))
Image.fromarray(np.clip(bg,0,255).astype(np.uint8)).save(f"{A}/bg_teal.jpg",quality=92)
# paper
W,H=1200,1500; n=fbm(W,H,6,4)[...,None]
p=np.array([232,224,203])-np.array([30,30,34])*n**1.5+rng.normal(0,4,(H,W,1))
Image.fromarray(np.clip(p,0,255).astype(np.uint8)).save(f"{A}/paper.jpg",quality=92)
# sepia animation background paper (large)
W,H=1920,1080; n=fbm(W,H,6,3)[...,None]
p=np.array([214,196,160])-np.array([40,38,34])*n**1.4+rng.normal(0,5,(H,W,1))
Image.fromarray(np.clip(p,0,255).astype(np.uint8)).save(f"{A}/sepia.jpg",quality=92)
# grain frames (gray, overlay)
for i in range(6):
    g=rng.normal(128,40,(540,960)).clip(0,255).astype(np.uint8)
    Image.fromarray(g).resize((1920,1080),Image.NEAREST).save(f"{A}/grain{i}.png")
# distressed stamp mask (alpha)
W,H=900,300; n=fbm(W,H,5,20); sp=rng.random((H,W))
a=((n>0.28)&(sp>0.12)).astype(np.uint8)*255
Image.fromarray(a,'L').filter(ImageFilter.GaussianBlur(0.6)).save(f"{A}/stamp_mask.png")
# moon map texture (teal, cratered) for the chart scene is drawn in SVG; lunar ground for animation not needed
print("ok")
