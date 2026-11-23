# Apollo 11 — vídeo de demonstração (método do tutorial)

## O que o vídeo-tutorial ensina (resumo)
1. **Roteiro pronto** (ele usou o ChatGPT) — gancho em forma de pergunta, contexto, virada ("não foi só X, foi Y"), clímax.
2. **Pedir ao Claude os links de imagens reais** do tema (fotos, documentos, jornais).
3. **Baixar tudo em uma pasta**, em alta qualidade, **verificando os direitos de uso**.
4. **Renomear cada imagem de acordo com o roteiro** (ex.: `franz_ferdinand_assassinato.jpg`) para o Claude saber onde ela entra.
5. (Opcional) vídeos reais de arquivo.
6. **Narração** com voz natural (ele usou ElevenLabs).
7. **Plugin "Kaz Documentary"** no Claude Code: envia roteiro + narração + imagens e pede o vídeo. O Claude analisa o roteiro, casa imagens com cenas e sincroniza com a voz.
8. **Etapa extra:** pedir **animações 2D com ar vintage** em trechos específicos do roteiro, combinando com as fotos reais.

Estilo visual do resultado: fundo verde-petróleo texturizado com vinheta, fotos com moldura de papel entrando inclinadas,
rótulos pretos de máquina de escrever com cursor `_`, círculos vermelhos desenhados à mão, carimbos vermelhos,
mapa antigo com trajeto tracejado vermelho, cartela com frase riscada + título serifado, bilhete datilografado,
e uma cena de animação sépia em recortes chapados.

## Como eu apliquei
| Passo | O que eu fiz |
|---|---|
| Roteiro | `roteiro.txt` — 11 frases, ~60 s, sobre a Apollo 11 |
| Imagens | 9 fotos reais da NASA (domínio público) via images.nasa.gov |
| Renomear | `imagens/01_tripulacao_apollo11_...jpg`, `03_decolagem_saturno_v_...jpg`, etc. |
| Narração | Voz neural pt-BR (Piper, offline; o ElevenLabs não estava disponível aqui) → `narracao.wav` + `cues.json` com o tempo de cada frase |
| "Plugin" | Como eu não tenho o plugin do autor, construí um equivalente: `render/index.html` (cenas em HTML/SVG cronometradas pelas palavras da narração) renderizado quadro a quadro com o Chromium e montado no ffmpeg |
| Animação 2D vintage | Descida do módulo Eagle (s07–s08): sépia, 12 qps, alarme 1202, pedras, controle manual, combustível, carimbo "POUSOU" |
| Som | Trilha ambiente sintetizada (Ré menor → Ré maior no pouso) + efeitos: whoosh, máquina de escrever, caneta, carimbo, foguete, projetor, alarme |
