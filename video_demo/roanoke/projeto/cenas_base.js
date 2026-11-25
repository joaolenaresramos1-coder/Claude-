// ===== Cenas: "A Colônia Perdida — o mistério de Roanoke" =====
window.YEARS={1:[1580,1584],2:[1584,1585],3:[1586,1587],4:[1587,1587],5:[1587,1587],6:[1587,1588],7:[1588,1590],8:[1590,1590],9:[1590,1607],10:[1607,2012],11:[1800,1937],12:[1937,2024]};

// animação: travessia do oceano (Inglaterra ↔ Roanoke)
ANIMS.oceano=function(b,o,idx){const {s,world,hud,film}=animBase(b);
  svgEl('path',{d:'M0 0 L360 0 C 420 200, 330 420, 400 620 C 450 800, 360 950, 420 1080 L0 1080Z',fill:'#b9a47a',stroke:ink,'stroke-width':4},world);
  svgEl('path',{d:'M1560 260 C 1620 220, 1700 240, 1720 320 C 1760 420, 1660 520, 1600 500 C 1540 470, 1520 330, 1560 260Z',fill:'#b9a47a',stroke:ink,'stroke-width':4},world);
  svgEl('path',{d:'M1640 560 C 1760 540, 1920 560, 1920 700 L1920 1080 L1700 1080 C 1660 900, 1600 720, 1640 560Z',fill:'#b9a47a',stroke:ink,'stroke-width':4},world);
  for(let i=0;i<30;i++)svgEl('path',{d:`M${500+hash(i)*1000} ${150+hash(i+5)*800} q 20 -10 40 0 q 20 10 40 0`,fill:'none',stroke:ink2,'stroke-width':2,opacity:.5},world);
  const txt=(t,x,y,sz=28)=>{const e=svgEl('text',{x,y,'font-family':'Courier Prime','font-weight':700,'font-size':sz,fill:ink,'letter-spacing':4},world);e.textContent=t;};
  txt('INGLATERRA',1500,220);txt('ESPANHA',1680,610);txt('ROANOKE',420,560);txt('OCEANO ATLÂNTICO',760,1000,30);
  svgEl('circle',{cx:400,cy:540,r:10,fill:'#a3221a'},world);svgEl('circle',{cx:1620,cy:380,r:10,fill:'#a3221a'},world);
  const path=o.volta?'M400 540 C 700 420, 1200 300, 1620 380':'M1620 380 C 1200 520, 800 700, 400 540';
  const tr=svgEl('path',{d:path,fill:'none',stroke:'#a3221a','stroke-width':5,'stroke-dasharray':'16 12'},world);const Lp=tr.getTotalLength();
  const ship=svgEl('g',{},world);svgEl('path',{d:'M-40 0 L40 0 L28 18 L-28 18Z',fill:ink},ship);svgEl('path',{d:'M0 0 L0 -60 M-18 0 L-18 -45',stroke:ink,'stroke-width':4},ship);
  svgEl('path',{d:'M2 -58 L34 -34 L2 -12Z',fill:cream,stroke:ink,'stroke-width':3},ship);svgEl('path',{d:'M-16 -44 L8 -26 L-16 -8Z',fill:cream,stroke:ink,'stroke-width':3},ship);
  const h1=hud(o.rotulo||'1587 · A TRAVESSIA',70,60);SFX.push({t:b.t0+0.4,type:'scribble',d:3});
  ITEMS.push(t=>{if(!film(t))return;const tq=Math.floor(t*12)/12;const k=eio(P(tq,b.t0+0.4,b.t1-0.5));tr.style.strokeDasharray=`${Lp*k} ${Lp}`;
    const p=tr.getPointAtLength(Lp*k);ship.setAttribute('transform',`translate(${p.x},${p.y-10+Math.sin(tq*4)*4}) scale(${o.volta?1:-1},1)`);vis(h1,t,b.t0+0.3);});};

function buildScenes(){
// ---------- ABERTURA ----------
CH('No dia 18 de agosto de 1590');
B.card('c00_the_englishmen_s_arrival_in_virginia.jpg','No dia 18 de agosto de 1590',{labels:[['18 AGO 1590',0.4]]});
B.card('c02_village_of_secotan.jpg','Ele tinha atravessado o oceano',{labels:[['MAIS DE CEM PESSOAS',0.5]]});
B.card('c04_virginia_dare_monument_manteo_north_car.jpg','Naquele dia',{});
B.title('QUANDO ELE CHEGOU...','Não havia ninguém.','Mas, quando ele chegou',{big:'não havia ninguém',size:120});
B.anim('entalhe','E, em um tronco de madeira',{inicio:'Croatoan.',porLetra:0.12,rotulo:'O ÚNICO SINAL'});
B.numero(115,'+',' PESSOAS','DESAPARECIDAS','Mais de cento e quinze',{sub:'HOMENS, MULHERES E CRIANÇAS'});
B.title('MAIS DE 400 ANOS DEPOIS,','Ninguém sabe.','Mais de quatrocentos anos depois',{big:'ninguém sabe',size:120});
B.title('1587 — 1590','A COLÔNIA PERDIDA','Esta é a história da Colônia Perdida',{big:'Colônia Perdida',size:110});

// ---------- 1 ----------
CH('No fim do século dezesseis');
B.chapter(1,'O sonho de um novo mundo','No fim do século dezesseis');
B.comparar('c01_queen_elizabeth.jpg','c06_spanish_armada.jpg','INGLATERRA','ESPANHA','a Inglaterra olhava com inveja',{swipe:'Os espanhóis já dominavam'});
B.card('c01_queen_elizabeth.jpg','Em 1584, a rainha Elizabeth',{labels:[['ELIZABETH I',0.4],['1584 · A CARTA DE RALEIGH','Sir Walter Raleigh']]});
B.card('c01_0_sir_walter_raleigh_full_length_portrait.jpg','Raleigh nunca atravessou',{labels:[['SIR WALTER RALEIGH',0.4]],lupa:[0.5,0.18,'Mas financiou']});
B.card('c00_map_of_the_coast_of_virginia_in_1585.jpg','A primeira delas chegou',{labels:[['ILHAS LONGAS E ESTREITAS',0.5],['ROANOKE','Roanoke']],lupa:[0.42,0.45,'uma chamada Roanoke']});
B.checklist('O RELATÓRIO DOS EXPLORADORES',[['TERRA FÉRTIL',1,'terra fértil'],['CAÇA E PEIXES',1,'cheia de caça'],['POVOS RECEPTIVOS',1,'habitada por povos']],'Os exploradores voltaram',{});
B.silhueta('MANTEO · WANCHESE','E trouxeram com eles dois homens',{n:2});
B.title('A NOVA TERRA SE CHAMARIA','Virgínia.','A Inglaterra decidiu',{big:'Virgínia',size:150});
B.note([['EM LONDRES:',0],['> MANTEO: ALIADO FIEL','Manteo se tornaria'],['> WANCHESE: DESCONFIADO','Wanchese, ao contrário']],'Manteo e Wanchese passaram meses',{});

// ---------- 2 ----------
CH('Em 1585, uma expedição militar');
B.chapter(2,'A primeira tentativa','Em 1585, uma expedição militar');
B.linhaTempo([['1584','EXPLORAÇÃO',0.4],['1585','O FORTE','Em 1585'],['1586','O ABANDONO',1.6],['1587','AS FAMÍLIAS',2.2],['1590','O SUMIÇO',2.8]],'Em 1585, uma expedição militar',{titulo:'ROANOKE · LINHA DO TEMPO'});
B.card('c02_the_wyfe_of_an_herowan_of_secotan.jpg','Com eles estava um artista',{labels:[['AQUARELA DE JOHN WHITE · 1585',0.4]]});
B.pilha(['c02_secotan.jpg','c02_a_noblewoman_of_pomeiock.jpg','c02_the_dances_at_their_great_feasts.jpg','c02_praying_around_the_fire_with_rattles.jpg','c02_the_tomb_of_the_weroans.jpg'],'White pintou dezenas de aquarelas',{rotulo:'AS AQUARELAS DE JOHN WHITE',gap:0.8});
B.filme(['c02_village_of_secotan.jpg','c02_how_the_chief_ladies_of_the_town_of_das.jpg','c02_sasquesahanougs_detail_of_virginia_indi.jpg','c00_the_englishmen_s_arrival_in_virginia.jpg','c02_the_dances_at_their_great_feasts.jpg'],'Ao lado dele trabalhava',{rotulo:'GRAVURAS DE THEODOR DE BRY · 1590'});
B.note([['A CONVIVÊNCIA:',0],['> INGLESES PRECISAM DE COMIDA','dependiam dos nativos'],['> NATIVOS SOFREM COM DOENÇAS','sofriam com doenças'],['> DESCONFIANÇA DOS DOIS LADOS','A desconfiança']],'Mas a convivência começou',{stamp:['CONFLITO','A desconfiança cresceu']});
B.card('c02_praying_around_the_fire_with_rattles.jpg','Em 1586, o comandante',{labels:[['1586 · WINGINA É MORTO',0.6]]});
B.card('c01_0_s_i_r_francis_drake.jpg','Quando a frota do corsário Francis Drake',{labels:[['FRANCIS DRAKE',0.4]]});
B.numero(15,'',' HOMENS','DEIXADOS NA ILHA','deixaram quinze homens',{sub:'NUNCA MAIS VISTOS COM VIDA'});

// ---------- 3 ----------
CH('Mesmo depois do fracasso');
B.chapter(3,'Uma colônia de famílias','Mesmo depois do fracasso');
B.card('c01_bruno_lucchesi_s_1976_statue_of_sir_walt.jpg','Walter Raleigh não desistiu',{labels:[['RALEIGH NÃO DESISTE',0.4]]});
B.silhueta('HOMENS · MULHERES · CRIANÇAS','Não seriam soldados',{n:5});
B.card('c02_the_wyfe_of_an_herowan_of_secotan.jpg','O governador escolhido',{labels:[['GOVERNADOR: JOHN WHITE',0.4],['O ARTISTA DE 1585','o artista da primeira']]});
B.note([['A FAMÍLIA DE JOHN WHITE:',0],['> ELEANOR, A FILHA (GRÁVIDA)','a filha, Eleanor'],['> ANANIAS DARE, O GENRO','Ananias Dare']],'Com ele viajavam a filha',{});
B.anim('oceano','O destino planejado não era Roanoke',{rotulo:'1587 · DESTINO: CHESAPEAKE?'});
B.card('c00_map_of_the_coast_of_virginia_in_1585.jpg','Mas o piloto da frota',{labels:[['PILOTO: SIMÃO FERNANDES',0.4]],stamp:['RECUSA','se recusou a levá-los']});
B.numero(115,'~',' COLONOS','DEIXADOS EM ROANOKE','os cerca de cento e quinze colonos',{sub:'JULHO DE 1587'});
B.checklist('A SITUAÇÃO DA COLÔNIA',[['CHEGARAM TARDE PARA PLANTAR',0,'tarde demais para plantar'],['ILHA HOSTIL',0,'vistos com desconfiança'],['DEPENDENTES DE SUPRIMENTOS',0,'dependiam de um navio']],'Para muitos historiadores',{});

// ---------- 4 ----------
CH('Quando chegaram, os colonos procuraram');
B.chapter(4,'Virginia Dare','Quando chegaram, os colonos procuraram');
B.card('c07_fort_raleigh_fort_u_s_64_264_manteo_dare.jpg','Quando chegaram, os colonos procuraram',{labels:[['O LOCAL DO FORTE',0.4]]});
B.title('DOS QUINZE HOMENS,','Restaram apenas ossos.','Encontraram apenas os ossos',{big:'apenas os ossos',size:110});
B.card('c02_the_tomb_of_the_weroans.jpg','Poucos dias depois',{labels:[['GEORGE HOWE É MORTO',0.6]]});
B.card('c02_secotan.jpg','Mas havia aliados',{labels:[['MANTEO · O ALIADO',0.4]],stamp:['BATIZADO','ele foi batizado']});
B.title('18 DE AGOSTO DE 1587','Nasce uma menina.','E, no dia 18 de agosto de 1587',{big:'nasceu uma menina',size:120});
B.card('c04_0_baptism_of_virginia_dare.jpg','Ela recebeu o nome de Virginia',{labels:[['VIRGINIA DARE',0.4],['1ª CRIANÇA INGLESA NAS AMÉRICAS','primeira criança inglesa']]});

// ---------- 5 ----------
CH('Logo ficou claro que a colônia');
B.chapter(5,'A viagem de volta','Logo ficou claro que a colônia');
B.checklist('PARA O INVERNO',[['COMIDA SUFICIENTE',0,'suprimentos suficientes'],['NAVIO DE AJUDA',0,'em busca de ajuda']],'Logo ficou claro',{});
B.note([['O SINAL COMBINADO:',0],['> ENTALHAR O DESTINO','deveriam entalhar'],['> SE HOUVESSE PERIGO:','se saíssem por causa'],['  DESENHAR UMA CRUZ','desenhar uma cruz']],'Antes de partir, combinou',{stamp:['✝ = PERIGO','desenhar uma cruz']});
B.anim('oceano','No fim de agosto de 1587',{volta:true,rotulo:'AGO 1587 · WHITE VOLTA À INGLATERRA'});
B.numero(9,'',' DIAS','A IDADE DE VIRGINIA','apenas nove dias',{sub:'ELE NUNCA MAIS A VERIA'});

// ---------- 6 ----------
CH('White chegou à Inglaterra');
B.chapter(6,'A Invencível Armada','White chegou à Inglaterra');
B.card('c06_0_eigentliche_abbildung_dess_herrlichen_si.jpg','A Espanha estava preparando',{labels:[['A INVENCÍVEL ARMADA · 1588',0.4]]});
B.card('c01_queen_elizabeth.jpg','A rainha proibiu',{labels:[['TODOS OS NAVIOS RETIDOS',0.5]],stamp:['PROIBIDO','A rainha proibiu']});
B.card('c06_1_spanish_armada.jpg','Em 1588, White conseguiu partir',{labels:[['1588 · DOIS NAVIOS PEQUENOS',0.4]],stamp:['PIRATAS','atacados por piratas']});
B.card('c06_0_1588_deo_trin_vni_britanniae_bis_ultori.jpg','No verão de 1588',{labels:[['A ARMADA É DERROTADA',0.5]]});
B.card('c06_2_spanish_armada.jpg','Mas a guerra continuou',{labels:[['ROANOKE É ESQUECIDA',0.6]]});
B.numero(3,'',' ANOS','SEM NOTÍCIAS DA COLÔNIA','Passaram-se três anos',{sub:'1587 → 1590'});

// ---------- 7 ----------
CH('Somente em 1590');
B.chapter(7,'Croatoan','Somente em 1590');
B.anim('oceano','Somente em 1590',{rotulo:'1590 · A VOLTA À AMÉRICA'});
B.card('c07_fort_raleigh_entrance_gate_u_s_64_264_ma.jpg','No dia seguinte, 18 de agosto',{labels:[['18 AGO 1590 · ROANOKE',0.4]]});
B.title('ELE DESEMBARCOU.','A colônia estava abandonada.','A colônia estava abandonada',{big:'A colônia estava abandonada',size:96});
B.card('c07_0_scene_from_the_lost_colony_a_historical.jpg','As casas tinham sido desmontadas',{labels:[['CASAS DESMONTADAS',0.4],['UMA PALIÇADA NOVA','havia uma paliçada']]});
B.anim('entalhe','Em uma árvore, estavam entalhadas',{palavra:'CRO',inicio:'três letras',porLetra:0.45,rotulo:'NA ÁRVORE'});
B.anim('entalhe','E, em um dos troncos da paliçada',{palavra:'CROATOAN',inicio:'Croatoan.',porLetra:0.14,rotulo:'NA PALIÇADA'});
B.checklist('O SINAL COMBINADO',[['NOME DO DESTINO: CROATOAN',1,'White procurou'],['CRUZ DE PERIGO',0,'Não havia cruz']],'White procurou o sinal combinado',{});
B.card('c02_secotan.jpg','Croatoan era o nome da ilha',{labels:[['CROATOAN: O POVO DE MANTEO',0.4]]});

// ---------- 8 ----------
CH('Perto dali, os marinheiros');
B.chapter(8,'A tempestade','Perto dali, os marinheiros');
B.note([['OS BAÚS DE WHITE:',0],['> DESENTERRADOS','desenterrados e revirados'],['> LIVROS E MAPAS RASGADOS','livros, mapas'],['> PINTURAS ESTRAGADAS','estragados pela chuva']],'Perto dali, os marinheiros',{stamp:['PERDIDO','estragados pela chuva']});
B.card('c08_navio_na_tempestade.jpg','Uma tempestade violenta',{labels:[['A TEMPESTADE',0.4]],stamp:['ÂNCORAS PERDIDAS','perderam âncoras']});
B.title('O CAPITÃO DECIDIU VOLTAR.','White nunca chegou a Croatoan.','O capitão decidiu voltar',{big:'nunca chegou a Croatoan',size:84});
B.card('c02_the_wyfe_of_an_herowan_of_secotan.jpg','Ele voltou para a Inglaterra',{labels:[['JOHN WHITE NUNCA MAIS VOLTOU',0.5]]});

// ---------- 9 ----------
CH('O que aconteceu com os colonos');
B.chapter(9,'As teorias','O que aconteceu com os colonos');
B.checklist('AS TEORIAS',[['FORAM VIVER COM OS CROATOAN','se mudado para Croatoan',''],['SE DIVIDIRAM E FORAM AO INTERIOR','se dividido',''],['MORTOS POR POWHATAN','Powhatan',''],['FOME, DOENÇA OU O MAR','morreram de fome','']].map(x=>[x[0],0,x[1]]),'O que aconteceu com os colonos',{});
B.card('c02_how_the_chief_ladies_of_the_town_of_das.jpg','A explicação mais simples',{labels:[['TEORIA 1 · CROATOAN',0.4]]});
B.card('c00_map_of_the_coast_of_virginia_in_1585.jpg','Outra possibilidade',{labels:[['TEORIA 2 · CHESAPEAKE',0.4]],lupa:[0.45,0.25,'rumo à baía']});
B.card('c09_settlement_of_jamestown_1607.jpg','Vinte anos depois',{labels:[['1607 · JAMESTOWN',0.4],['TEORIA 3 · POWHATAN','Powhatan']]});
B.title('NENHUMA DESSAS TEORIAS','Foi comprovada.','Nenhuma dessas teorias',{big:'foi comprovada',size:120});
B.card('c07_fort_raleigh_fort_u_s_64_264_manteo_dare.jpg','Arqueólogos já escavaram',{labels:[['FORT RALEIGH · ESCAVAÇÕES',0.4]]});

// ---------- 10 ----------
CH('Por mais de quatrocentos anos');
B.chapter(10,'O segredo do mapa','Por mais de quatrocentos anos');
B.card('c00_map_of_the_coast_of_virginia_in_1585.jpg','John White desenhou um mapa',{labels:[['O MAPA DE JOHN WHITE',0.4],['MUSEU BRITÂNICO','Museu Britânico']]});
B.title('2012 · LUZ ESPECIAL','Algo escondido sob o papel.','Em 2012, pesquisadores',{big:'tinham sido colados',size:96});
B.card('c00_map_of_the_coast_of_virginia_in_1585.jpg','Embaixo de um deles',{labels:[['O SÍMBOLO ESCONDIDO',0.4]],lupa:[0.3,0.4,'Uma pequena estrela'],circle:[0.3,0.4,0.06,0.08,'Perto de onde dois rios']});
B.silhueta('POR QUE ELE ESCONDEU?','Ninguém sabe por que White',{n:1});
B.card('c07_fort_raleigh_entrance_gate_u_s_64_264_ma.jpg','Arqueólogos foram até o lugar',{labels:[['SÍTIO X',0.4],['CERÂMICA INGLESA','cerâmica inglesa']]});
B.checklist('ACHADOS EM HATTERAS (CROATOAN)',[['PEÇAS DE ARMAS',1,'peças de armas'],['PLACA DE ESCREVER',1,'placa de escrever'],['CABO DE ESPADA',1,'cabo de uma espada']],'Ao mesmo tempo, na ilha de Hatteras',{});
B.comparar('c00_map_of_the_coast_of_virginia_in_1585.jpg','c02_village_of_secotan.jpg','SÍTIO X','HATTERAS','As duas descobertas',{swipe:'Para alguns pesquisadores'});

// ---------- 11 ----------
CH('Ao longo dos séculos');
B.chapter(11,'As pistas falsas','Ao longo dos séculos');
B.note([['1937 · AS PEDRAS DE DARE',0],['> MENSAGEM DE ELEANOR DARE?','supostamente escrita'],['> DEZENAS DE OUTRAS PEDRAS','dezenas de outras pedras']],'Em 1937, um homem apareceu',{stamp:['FALSIFICAÇÃO','considerada falsificação']});
B.card('c02_a_noblewoman_of_pomeiock.jpg','Outros relatos',{labels:[['RELATOS DE VIAJANTES',0.4]]});
B.checklist('A PROVA DEFINITIVA',[['DIÁRIOS DOS COLONOS',0,0.5],['ESQUELETOS',0,1.3],['DNA CONCLUSIVO',0,'testes de DNA']],'Hoje, cientistas tentam',{});

// ---------- 12 ----------
CH('A história de Roanoke virou');
B.chapter(12,'A colônia perdida','A história de Roanoke virou');
B.card('c11_scene_from_the_lost_colony_a_historical.jpg','Na ilha, uma peça de teatro',{labels:[['"A COLÔNIA PERDIDA" · DESDE 1937',0.4]]});
B.card('c07_1_scene_from_the_lost_colony_a_historical.jpg','Virginia Dare virou nome',{labels:[['VIRGINIA DARE',0.4]]});
B.card('c12_the_roanoke_marshes_lighthouse_in_manteo.jpg','Talvez os colonos tenham encontrado abrigo',{labels:[['ILHA DE ROANOKE · HOJE',0.4]]});
B.card('c07_2_scene_from_the_lost_colony_a_historical.jpg','Talvez tenham enfrentado',{});
B.numero(115,'+',' PESSOAS','ATRAVESSARAM UM OCEANO','Mais de cento e quinze pessoas',{sub:'E DESAPARECERAM'});
B.anim('entalhe','E deixaram para trás apenas uma palavra',{inicio:'Croatoan.',porLetra:0.1,rotulo:'CROATOAN'});
}
