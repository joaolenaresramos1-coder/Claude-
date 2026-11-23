"""Trilha + efeitos sonoros sintetizados, sincronizados com os eventos do render (sfx.json)."""
import json, sys, wave, numpy as np
proj = sys.argv[1]
SR = 44100
cues = json.load(open(f"{proj}/cues.json")); TOTAL = cues["total"]
ev = json.load(open(f"{proj}/sfx.json"))
N = int(TOTAL * SR) + SR
rng = np.random.default_rng(3)
L = np.zeros(N); R = np.zeros(N)

def band(x, lo, hi):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR)
    m = np.ones_like(f)
    if lo: m *= 1 / (1 + (lo / np.maximum(f, 1)) ** 4)
    if hi: m *= 1 / (1 + (f / hi) ** 4)
    return np.fft.irfft(X * m, len(x))

def add(sig, t, gain=1.0, pan=0.0):
    i = int(t * SR)
    if i < 0: sig = sig[-i:]; i = 0
    if i >= N: return
    sig = sig[: N - i]
    L[i:i + len(sig)] += sig * gain * (1 - pan) ** 0.5 if pan > 0 else sig * gain
    R[i:i + len(sig)] += sig * gain * (1 + pan) ** 0.5 if pan < 0 else sig * gain

def env(n, a, d):
    t = np.arange(n) / SR
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)

def whoosh(v=1):
    n = int(0.7 * SR); x = rng.normal(0, 1, n)
    t = np.arange(n) / SR; e = np.sin(np.pi * np.clip(t / 0.7, 0, 1)) ** 2
    return band(x, 300, 2500) * e * 0.10 * v

def click():
    n = int(0.03 * SR); x = rng.normal(0, 1, n) * env(n, 0.0005, 0.006)
    body = np.sin(2 * np.pi * 1800 * np.arange(n) / SR) * env(n, 0.0003, 0.004)
    return band(x, 1500, 9000) * 0.25 + body * 0.08

def scribble(d):
    n = int(d * SR); t = np.arange(n) / SR
    x = band(rng.normal(0, 1, n), 2000, 6000) * (0.6 + 0.4 * np.sin(2 * np.pi * 11 * t)) ** 2
    return x * np.sin(np.pi * t / d) * 0.05

def thud(f=70, d=0.35, g=0.5):
    n = int(1.2 * SR); t = np.arange(n) / SR
    s = np.sin(2 * np.pi * f * t * (1 - 0.3 * t)) * env(n, 0.002, d)
    return (s + band(rng.normal(0, 1, n), 100, 1200) * env(n, 0.001, 0.05) * 0.5) * g

def rumble(d):
    n = int(d * SR); t = np.arange(n) / SR
    x = band(np.cumsum(rng.normal(0, 1, n)) * 0.02, 25, 180)
    x /= np.abs(x).max() + 1e-9
    return x * np.minimum(1, t / 0.8) * np.minimum(1, (d - t) / 2) * 0.22

def projector(d):
    n = int(d * SR); t = np.arange(n) / SR
    pulses = (np.sin(2 * np.pi * 24 * t) > 0.92).astype(float)
    x = band(rng.normal(0, 1, n), 800, 5000) * pulses * 0.035 + band(rng.normal(0, 1, n), 200, 3000) * 0.006
    return x * np.minimum(1, t / 0.4) * np.minimum(1, (d - t) / 0.4)

def alarm(d):
    n = int(d * SR); t = np.arange(n) / SR
    on = ((t * 4) % 1 < 0.5).astype(float)
    return np.sin(2 * np.pi * 1250 * t) * on * 0.035 * np.minimum(1, (d - t) / 0.2)

for e in ev:
    k, t = e["type"], e["t"]
    if k == "whoosh": add(whoosh(e.get("v", 1)), t - 0.15)
    elif k == "type":
        for j in range(e["n"]):
            add(click() * (0.6 + 0.4 * rng.random()), t + j / e["cps"], pan=rng.uniform(-.2, .2))
    elif k == "scribble": add(scribble(e["d"]), t)
    elif k == "stamp": add(thud(65, 0.25, 0.55), t)
    elif k == "hit": add(thud(45, 0.9, 0.5), t)
    elif k == "rumble": add(rumble(e["d"]), t)
    elif k == "projector": add(projector(e["d"]), t)
    elif k == "alarm": add(alarm(e["d"]), t)
    elif k == "land": add(thud(55, 0.6, 0.55), t); add(band(rng.normal(0, 1, SR * 2), 80, 900) * env(SR * 2, 0.05, 0.5) * 0.12, t)

# --- trilha: drone sombrio em Ré menor -> resolve em Ré maior após o pouso
t = np.arange(N) / SR
tLand = cues["cues"]["s08"][1]
def voice(freq, amp, det=0.15):
    return amp * (np.sin(2 * np.pi * freq * t) + 0.5 * np.sin(2 * np.pi * (freq + det) * t + 1) + 0.25 * np.sin(2 * np.pi * freq * 2 * t))
lfo = 0.75 + 0.25 * np.sin(2 * np.pi * 0.11 * t)
minor = voice(73.42, .5) + voice(110, .35) + voice(146.83, .25) + voice(174.61, .18, .2)
major = voice(73.42, .5) + voice(110, .35) + voice(146.83, .25) + voice(185.0, .2, .2) + voice(220, .14) + voice(293.66, .08)
xf = np.clip((t - tLand) / 2.5, 0, 1)
music = (minor * (1 - xf) + major * xf) * lfo
# tensão: pulso grave durante a descida
s07 = cues["cues"]["s07"]
pulse_t = (t * 1.6) % 1
pulse = np.sin(2 * np.pi * 55 * t) * np.exp(-pulse_t * 9) * ((t > s07[0] - 0.5) & (t < tLand)) * 0.9
music = band(music, 40, 1200) + pulse
level = 0.045 * np.clip(t / 2, 0, 1) * np.clip((TOTAL - t) / 1.6, 0, 1)
level *= 1 + 0.5 * ((t > s07[0]) & (t < tLand)) + 0.7 * np.clip((t - tLand) / 2, 0, 1)
music *= level
L += music; R += music * 0.97

for name, ch in (("sfx_L", L), ("sfx_R", R)):
    pass
st = np.stack([L, R], 1)
st /= max(1, np.abs(st).max() / 0.9)
w = wave.open(f"{proj}/trilha_sfx.wav", "wb"); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((st * 32767).astype(np.int16).tobytes()); w.close()
print("ok", TOTAL, len(ev), "eventos")
