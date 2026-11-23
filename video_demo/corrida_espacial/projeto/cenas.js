// ===== Cenas do documentário "A Corrida Espacial" — cada uma presa a uma frase da narração =====
function buildScenes(){
// ---------- ABERTURA ----------
CH('Em julho de 1969');
B.card('08_controle_da_missao_comemora.jpg','Em julho de 1969',{labels:[['JULHO 1969',0.8],['600 MILHÕES DIANTE DA TV','seiscentos milhões']]});
B.card('11_aldrin_desce_escada.jpg'.replace('11_','c11_'),'descer uma escada',{labels:[['A ESCADA','escada']],circle:[0.45,0.55,0.22,0.3,'Não era uma escada qualquer']});
B.map('Ela estava a trezentos',{});
B.card('04_modulo_lunar_eagle_separacao.jpg','presa a uma nave frágil',{labels:[['MÓDULO LUNAR "EAGLE"',0.6],['PAREDES FINAS COMO PAPEL','alumínio tão fino']]});
B.title('ESSA HISTÓRIA NÃO COMEÇA NA LUA.','Começa com um bipe.','Mas essa história não começa na Lua',{strike:'Começa doze anos antes',big:'Começa doze anos antes'});
B.card('c02_sputnik_1.jpg','pequeno bipe vindo do céu',{labels:[['1957',0.5]],until:'Esta é a história'});
B.title('1957 — 1975','A CORRIDA ESPACIAL','Esta é a história da corrida espacial',{big:'corrida espacial.',size:118});

// ---------- 1 · DAS CINZAS DA GUERRA ----------
CH('Para entender a corrida até a Lua');
B.chapter(1,'Das cinzas da guerra','Para entender a corrida até a Lua');
B.note([['1945',0],['> FIM DA SEGUNDA GUERRA','Em 1945'],['> ALEMANHA DERROTADA','a Alemanha nazista estava derrotada']],'Segunda Guerra Mundial',{});
B.card('c01_v2_decolando_white_sands_1946.jpg','uma arma que ninguém mais tinha',{labels:[['FOGUETE V-2','o foguete V-2'],['1º OBJETO A CHEGAR AO ESPAÇO','cruzar a fronteira do espaço']]});
B.note([['ALVOS DO V-2:',0],['> LONDRES','Londres'],['> ANTUÉRPIA','Antuérpia']],'E tinha sido usado para bombardear',{stamp:['ARMA','Antuérpia']});
B.title('QUEM DOMINASSE OS FOGUETES...','Dominaria o futuro.','Os vencedores da guerra sabiam',{big:'dominaria o futuro'});
B.card('c01_wernher_von_braun.jpg','Os Estados Unidos levaram o principal engenheiro',{pos:'l',labels:[['WERNHER VON BRAUN','Wernher von Braun'],['+100 ESPECIALISTAS ALEMÃES','mais de cem']]});
B.card('c01_v2_capturado_teste.jpg','mais de cem especialistas alemães',{pos:'r',side:true,until:'Os soviéticos recolheram',labels:[['V-2 CAPTURADO · EUA',0.6]]});
B.note([['URSS RECOLHEU:',0],['> AS FÁBRICAS','as fábricas'],['> AS PEÇAS','as peças'],['> OS TÉCNICOS','os técnicos']],'Os soviéticos recolheram',{});
B.note([['DOSSIÊ Nº 1938-K',0],['NOME: SERGUEI KOROLEV','Serguei Korolev'],['> PRESO NOS EXPURGOS','tinha sido preso'],['> CAMPO NA SIBÉRIA','campo de trabalho forçado'],['> CHEFE DOS FOGUETES','Agora, era o cérebro'],['"O PROJETISTA-CHEFE"','Projetista-Chefe']],'Do lado soviético',{stamp:['SECRETO','era segredo de Estado',0.72,0.24,-8,72]});
B.title('O ESPAÇO ERA SÓ UM DETALHE.','Por enquanto.','Começava a Guerra Fria',{big:'Pelo menos, por enquanto'});

// ---------- 2 · O BIPE ----------
CH('No dia 4 de outubro de 1957');
B.chapter(2,'O bipe que assustou a América','No dia 4 de outubro de 1957');
B.card('c02_sputnik_1.jpg','No topo dele',{labels:[['4 OUT 1957 · CAZAQUISTÃO',0.5],['SPUTNIK · 58 CM','bola de praia']],circle:[0.48,0.45,0.18,0.25,'quatro antenas']});
B.anim('orbita','Ela não fazia quase nada',{label:'SPUTNIK 1 · 4 OUT 1957',sub:'1 VOLTA A CADA 96 MINUTOS',extra:'SOBRE OS EUA VÁRIAS VEZES POR DIA',extraAt:'passava por cima dos Estados Unidos'});
B.note([['SE ELES PÕEM UMA BOLA DE METAL',0],['EM ÓRBITA...',0.9],['',0],['...PODEM PÔR UMA BOMBA','também conseguiam colocar uma bomba'],['SOBRE NOVA YORK.','Nova York']],'Para os americanos, foi um choque',{stamp:['AMEAÇA','Nova York',0.7,0.82]});
B.card('c02_cadela_laika_1957.jpg','Um mês depois, veio o segundo golpe',{labels:[['SPUTNIK 2 · 3 NOV 1957','Sputnik 2'],['LAIKA','Laika']]});
B.note([['VANGUARD TV-3',0],['6 DEZ 1957 · AO VIVO NA TV','diante das câmeras'],['',0],['ALTURA ATINGIDA: ~1 METRO','Ele subiu pouco mais de um metro']],'Os Estados Unidos correram para responder',{stamp:['EXPLODIU','explodiu na plataforma',0.66,0.78,-12,80]});
B.title('OS JORNAIS NÃO PERDOARAM:','“Flopnik”','Os jornais não perdoaram',{big:'Flopnik'});
B.card('c02_lancamento_explorer1_1958.jpg','O primeiro satélite americano',{pos:'l',labels:[['EXPLORER 1 · 31 JAN 1958',0.6]]});
B.card('c02_explorer1_pickering_van_allen_von_braun.jpg','construído pela equipe de von Braun',{pos:'r',side:true,until:'O nome dela era NASA',labels:[['PICKERING · VAN ALLEN · VON BRAUN',0.6]],circle:[0.84,0.6,0.12,0.3,'von Braun']});
B.title('1958 · NOVA AGÊNCIA CIVIL','NASA.','O nome dela era NASA',{big:'NASA',size:170});

// ---------- 3 · O PRIMEIRO HOMEM NO ESPAÇO ----------
CH('Os soviéticos continuavam na frente. Em 1959');
B.chapter(3,'O primeiro homem no espaço','Os soviéticos continuavam na frente. Em 1959');
B.note([['PLACAR DA CORRIDA',0],['> 1957 · 1º SATÉLITE ..... URSS',0.5],['> 1957 · 1º SER VIVO ..... URSS',1.0],['> 1959 · ATINGE A LUA .... URSS','uma sonda soviética atingiu'],['> 1959 · LADO OCULTO .... URSS','lado oculto']],'Em 1959, uma sonda',{w:820});
B.title('O PRÓXIMO OBJETIVO:','Um ser humano no espaço.','Agora, os dois países',{big:'colocar um ser humano',size:96});
B.card('c03_iuri_gagarin_retrato.jpg','Na manhã de 12 de abril de 1961',{labels:[['12 ABR 1961','12 de abril'],['IÚRI GAGARIN · 27 ANOS','Iúri Gagarin']]});
B.title('ANTES DA DECOLAGEM, UMA PALAVRA:','“Poiekhali!”','Antes da decolagem',{big:'Poiekhali'});
B.anim('orbita','Gagarin deu uma volta completa',{sat:'vostok',beep:false,speed:0.8,label:'VOSTOK 1 · 12 ABR 1961',sub:'1 VOLTA EM 108 MINUTOS',extra:'1º HUMANO A VER A TERRA DE FORA',extraAt:'Ele foi o primeiro ser humano'});
B.card('c03_iuri_gagarin_retrato.jpg','Em poucas horas',{zoom:[1.12,1.2],labels:[['O HOMEM MAIS FAMOSO DO MUNDO',0.5]]});
B.card('c03_lancamento_freedom7_shepard.jpg','Os Estados Unidos chegaram vinte e três dias depois',{pos:'l',labels:[['5 MAIO 1961 · FREEDOM 7',0.6]]});
B.card('c03_alan_shepard_traje.jpg','Alan Shepard fez um voo',{pos:'r',side:true,until:'O jovem presidente',labels:[['ALAN SHEPARD',0.4],['VOO DE 15 MINUTOS','quinze minutos']],stamp:['2º LUGAR','segundo lugar',0.6,0.8,-10,72]});

// ---------- 4 · A PROMESSA ----------
CH('O jovem presidente John Kennedy');
B.chapter(4,'A promessa','O jovem presidente John Kennedy');
B.card('02_kennedy_discurso_lua_1962.jpg','estava sob pressão',{pos:'l',labels:[['PRESIDENTE JOHN F. KENNEDY',0.5]]});
B.note([['ABRIL DE 1961',0],['> GAGARIN NO ESPAÇO','No mesmo mês do voo'],['> FRACASSO EM CUBA','Baía dos Porcos']],'No mesmo mês do voo de Gagarin',{pos:'r',side:true,until:'Kennedy precisava de uma vitória',stamp:['DERROTA','humilhante']});
B.title('EXISTE ALGUMA CORRIDA NO ESPAÇO','Que possamos ganhar?','existe alguma corrida no espaço',{big:'que nós possamos ganhar',size:100});
B.map('levar um homem até a Lua',{label:'A META: A LUA',labelAt:'levar um homem até a Lua'});
B.card('c04_kennedy_congresso_1961.jpg','Em 25 de maio de 1961',{labels:[['25 MAIO 1961',0.5],['CONGRESSO DOS EUA','diante do Congresso']],circle:[0.48,0.48,0.14,0.2,'colocar um homem na Lua']});
B.note([['EXPERIÊNCIA DOS EUA NO ESPAÇO:',0],['',0],['15 MINUTOS','quinze minutos']],'Na época',{stamp:['SÓ ISSO','quinze minutos',0.7,0.78]});
B.card('02_kennedy_discurso_lua_1962.jpg','No ano seguinte',{labels:[['12 SET 1962 · RICE STADIUM',0.6]],circle:[0.56,0.24,0.2,0.15,'Nós escolhemos ir à Lua']});
B.title('NÃO PORQUE É FÁCIL.','Porque é difícil.','não porque é fácil',{strike:'mas porque é difícil',big:'mas porque é difícil'});
B.card('c04_lancamento_friendship7_glenn.jpg','A promessa estava feita',{labels:[['1962 · OS EUA ACELERAM',0.6]]});

// ---------- 5 · A UNIÃO SOVIÉTICA NA FRENTE ----------
CH('Enquanto os Estados Unidos se organizavam');
B.chapter(5,'A União Soviética na frente','Enquanto os Estados Unidos se organizavam');
B.note([['VALENTINA TERESHKOVA',0],['> 16 JUN 1963 · VOSTOK 6','Em 1963'],['> 1ª MULHER NO ESPAÇO','primeira mulher'],['> QUASE 3 DIAS EM ÓRBITA','quase três dias'],['  MAIS QUE TODOS OS EUA JUNTOS','Mais tempo do que']],'Em 1963, Valentina Tereshkova',{stamp:['RECORDE','Mais tempo do que',0.72,0.84]});
B.card('c05_leonov_retrato.jpg','Em março de 1965',{labels:[['ALEXEI LEONOV','Alexei Leonov'],['VOSKHOD 2 · 18 MAR 1965','abriu a escotilha']]});
B.anim('leonov','Foi a primeira caminhada espacial',{inflate:'o traje de Leonov inflou',valve:'ele abriu uma válvula',back:'até conseguir se espremer'});
B.note([['O POUSO:',0],['> FORA DO LUGAR','fora do lugar'],['> MONTES URAIS','Montes Urais'],['> UMA NOITE NO FRIO','passaram a noite']],'A volta também não foi fácil',{});
B.note([['PLACAR DA CORRIDA',0],['> 1961 · 1º HOMEM ....... URSS',0.4],['> 1963 · 1ª MULHER ...... URSS',0.8],['> 1965 · 1ª CAMINHADA ... URSS',1.2]],'Para o mundo, a mensagem era clara',{stamp:['URSS NA FRENTE','continuava ganhando',0.62,0.86,-9,58]});

// ---------- 6 · GEMINI ----------
CH('Os americanos sabiam que não bastava');
B.chapter(6,'Gemini: aprendendo a voar','Os americanos sabiam que não bastava');
B.note([['PARA CHEGAR À LUA:',0],['> SOBREVIVER 2 SEMANAS','sobreviver duas semanas'],['> TRABALHAR FORA DA NAVE','Sair da nave'],['> ACOPLAR EM ÓRBITA','encontrar outra nave'],['  A ~28.000 KM/H','trinta mil quilômetros']],'Era preciso sobreviver',{});
B.card('c05_ed_white_caminhada_espacial.jpg','Para isso, a NASA criou o programa Gemini',{labels:[['PROGRAMA GEMINI',0.6],['GEMINI 4 · ED WHITE · 1965','dez voos tripulados']]});
B.card('c06_lancamento_agena_gemini8.jpg','Mas um desses voos quase acabou',{labels:[['16 MAR 1966',0.6],['ALVO AGENA + GEMINI 8','a Gemini 8']]});
B.anim('gemini8','Minutos depois, um propulsor travou',{stuck:'um propulsor travou',save:'conseguiu desligar'});
B.card('c06_armstrong_scott_gemini8.jpg','Eles tiveram que voltar',{labels:[['GEMINI 8 · DAVID SCOTT E O COMANDANTE',0.5],['NEIL ARMSTRONG','Neil Armstrong']]});

// ---------- 7 · O PREÇO DA CORRIDA ----------
CH('Em janeiro de 1966, os soviéticos');
B.chapter(7,'O preço da corrida','Em janeiro de 1966, os soviéticos');
B.note([['DOSSIÊ Nº 1938-K',0],['NOME: SERGUEI KOROLEV',0.4],['"O PROJETISTA-CHEFE"',0.8],['> 14 JAN 1966',1.3],['> MORTO EM CIRURGIA AOS 59','durante uma cirurgia']],'Serguei Korolev',{stamp:['PERDA','perdeu o rumo',0.7,0.82]});
B.card('c07_tripulacao_apollo1.jpg','No dia 27 de janeiro de 1967',{labels:[['27 JAN 1967 · APOLLO 1',0.5],['GRISSOM · WHITE · CHAFFEE','Gus Grissom']]});
B.note([['CABINE DA APOLLO 1:',0],['> 100% OXIGÊNIO','oxigênio puro'],['> UMA FAÍSCA NUM FIO','Uma faísca'],['> ESCOTILHA ABRE PARA DENTRO','A escotilha abria']],'A cabine estava cheia',{});
B.card('c07_apollo1_cabine_queimada.jpg','Os três morreram',{labels:[['APOLLO 1 · APÓS O INCÊNDIO',0.4]],zoom:[1,1.05]});
B.card('c07_vladimir_komarov.jpg','Três meses depois',{labels:[['VLADIMIR KOMAROV','Vladimir Komarov'],['SOYUZ 1 · 24 ABR 1967','nova nave Soyuz']]});
B.title('JÁ NÃO ERA UMA DISPUTA DE PRESTÍGIO.','Era medida em vidas.','A corrida para a Lua tinha deixado',{strike:'Agora, ela era medida',big:'medida em vidas',size:104});
B.note([['A NOVA APOLLO:',0],['> ESCOTILHA NOVA','trocou a escotilha'],['> SEM OXIGÊNIO PURO EM SOLO','o oxigênio da cabine'],['> NOVA FIAÇÃO','quilômetros de fiação']],'As duas agências pararam',{stamp:['REDESENHADA','seria outra nave',0.66,0.84,-9,58]});

// ---------- 8 · NATAL NA ÓRBITA DA LUA ----------
CH('No fim de 1968');
B.chapter(8,'Natal na órbita da Lua','No fim de 1968');
B.note([['RELATÓRIO DE INTELIGÊNCIA · 1968',0],['> URSS PRONTA PARA MANDAR','prontos para mandar'],['  2 COSMONAUTAS À LUA','ao redor da Lua']],'surgiram rumores',{stamp:['URGENTE','ao redor da Lua',0.7,0.82]});
B.map('A NASA tomou uma decisão ousada',{label:'APOLLO 8 · DIRETO À LUA',labelAt:'diretamente até a Lua'});
B.card('c08_tripulacao_apollo8.jpg','No dia 21 de dezembro de 1968',{labels:[['21 DEZ 1968',0.5],['BORMAN · LOVELL · ANDERS','Frank Borman']]});
B.card('03_decolagem_saturno_v_16_julho_1969.jpg','no gigantesco foguete Saturno Cinco',{labels:[['SATURNO V',0.5],['24 DEZ · ÓRBITA DA LUA','véspera de Natal']]});
B.card('c08_nascer_da_terra_earthrise.jpg','Na quarta volta',{labels:[['24 DEZ 1968 · BILL ANDERS',0.6],['"NASCER DA TERRA"','Nascer da Terra']],circle:[0.62,0.37,0.1,0.13,'A Terra, azul e branca']});
B.card('09_eagle_retorno_terra_ao_fundo.jpg','Naquela noite',{labels:[['VÉSPERA DE NATAL · AO VIVO',0.6]]});
B.title('PEQUENA. FRÁGIL.','Sozinha na escuridão.','Pela primeira vez, a humanidade viu',{big:'sozinha na escuridão',size:100});
B.map('A Lua estava ao alcance',{label:'FALTAVA POUSAR',labelAt:'Faltava apenas pousar'});

// ---------- 9 · A DECOLAGEM ----------
CH('Na manhã de 16 de julho de 1969');
B.chapter(9,'A decolagem','Na manhã de 16 de julho de 1969');
B.card('c09_multidao_assiste_lancamento.jpg','quase um milhão de pessoas',{labels:[['16 JUL 1969 · FLÓRIDA',0.5],['~1 MILHÃO DE ESPECTADORES','quase um milhão']]});
B.card('c09_saturno_v_decolagem.jpg','Na plataforma 39A',{pos:'l',labels:[['PLATAFORMA 39A',0.4],['110 METROS','cento e dez metros'],['~3.000 TONELADAS','quase três mil toneladas']]});
B.note([['SATURNO V',0],['> 110 M · 36 ANDARES','mais alto que um prédio'],['> ~3.000 TONELADAS','quase três mil'],['> QUASE TUDO COMBUSTÍVEL','combustível']],'mais alto que um prédio',{pos:'r',side:true,until:'No topo, estavam três homens'});
B.card('01_tripulacao_apollo11_armstrong_collins_aldrin.jpg','No topo, estavam três homens',{labels:[['ARMSTRONG · COMANDANTE','Neil Armstrong'],['ALDRIN · MÓDULO LUNAR','Buzz Aldrin'],['COLLINS · FICA EM ÓRBITA','Michael Collins']]});
B.card('03_decolagem_saturno_v_16_julho_1969.jpg','Às nove e trinta e dois da manhã',{labels:[['09:32 · IGNIÇÃO',0.4],['5 MOTORES F-1','os cinco motores']],zoom:[1,1.18],focus:'50% 20%'});
B.card('c09_terra_vista_a_caminho.jpg','Doze minutos depois',{labels:[['EM ÓRBITA DA TERRA',0.5],['RUMO À LUA','em direção à Lua']]});
B.map('Foram três dias de viagem',{label:'3 DIAS',labelAt:'três dias'});

// ---------- 10 · A DESCIDA ----------
CH('No dia 20 de julho de 1969, o módulo');
B.chapter(10,'A descida','No dia 20 de julho de 1969, o módulo');
B.card('04_modulo_lunar_eagle_separacao.jpg','o módulo lunar Eagle se separou',{labels:[['20 JUL 1969 · EAGLE',0.5],['COLLINS FICA NA COLUMBIA','onde Collins']],circle:[0.5,0.38,0.22,0.22,'se separou']});
const D={start:'Armstrong e Aldrin começaram a descida',alarm:'Alarme 1202',rocks:'pedras do tamanho de carros',manual:'Armstrong assumiu o controle manual',f60:'sessenta segundos',f30:'trinta segundos',land:'Contato.'};
B.anim('descida','Armstrong e Aldrin começaram a descida',D);
B.card('c10_controle_missao_houston.jpg','Em Houston, o controle da missão',{labels:[['HOUSTON · CONTROLE DA MISSÃO',0.5],['STEVE BALES · 26 ANOS','Steve Bales']]});
B.note([['SOFTWARE DE BORDO · MIT',0],['EQUIPE: MARGARET HAMILTON','Margaret Hamilton'],['> DESCARTA O SUPÉRFLUO',0.2],['> MANTÉM O ESSENCIAL',0.6]],'Ele tinha sido programado exatamente para isso',{stamp:['PODEM CONTINUAR','podem continuar',0.6,0.84,-8,56]});
B.anim('descida','Mas havia outro problema',D);
B.card('c10_aproximacao_local_de_pouso.jpg','Às vinte horas e dezessete minutos',{labels:[['20:17 UTC',0.3],['MAR DA TRANQUILIDADE',1.2]]});
B.title('HOUSTON, AQUI É A BASE DA TRANQUILIDADE.','A Águia pousou.','Houston, aqui é a Base',{big:'A Águia pousou',size:120});
B.note([['COMBUSTÍVEL RESTANTE:',0],['',0],['~25 SEGUNDOS','vinte e cinco segundos']],'Restavam cerca de',{stamp:['POUSOU','vinte e cinco segundos',0.66,0.8,-10,84]});
B.card('08_controle_da_missao_comemora.jpg','Em Houston, uma sala inteira',{labels:[['HOUSTON VOLTA A RESPIRAR',0.6]]});

// ---------- 11 · O PRIMEIRO PASSO ----------
CH('Seis horas depois');
B.chapter(11,'O primeiro passo','Seis horas depois');
B.card('05_armstrong_dentro_do_modulo_lunar.jpg','Neil Armstrong saiu de costas',{pos:'l',until:'puxou uma alavanca',labels:[['NEIL ARMSTRONG',0.4]]});
B.card('c11_aldrin_desce_escada.jpg','por uma pequena escada',{pos:'r',side:true,until:'puxou uma alavanca',labels:[['A ESCADA DO EAGLE',0.6]],circle:[0.45,0.5,0.22,0.3,'pequena escada']});
B.card('c10_controle_missao_houston.jpg','puxou uma alavanca',{labels:[['TV AO VIVO',0.5],['600 MILHÕES ASSISTINDO','seiscentos milhões']]});
B.card('06_pegada_no_solo_lunar.jpg','Ele pisou na Lua',{labels:[['21 JUL 1969 · 02:56 UTC',0.5]],circle:[0.63,0.64,0.24,0.2,'duas horas e cinquenta e seis']});
B.title('UM PEQUENO PASSO PARA UM HOMEM,','Um salto gigantesco.','E disse:',{big:'um salto gigantesco',size:112});
B.card('07_aldrin_caminha_na_lua.jpg','Dezenove minutos depois',{labels:[['BUZZ ALDRIN',0.6],['"DESOLAÇÃO MAGNÍFICA"','Desolação magnífica']]});
B.card('c11_aldrin_e_bandeira.jpg','Os dois passaram cerca de duas horas',{labels:[['2H30 NA SUPERFÍCIE',0.5],['21,5 KG DE ROCHAS','coletaram mais de vinte quilos']]});
B.note([['LIGAÇÃO RECEBIDA:',0],['',0],['CASA BRANCA → LUA','Richard Nixon'],['PRES. RICHARD NIXON',0.8]],'Receberam até uma ligação',{});
B.card('c11_placa_viemos_em_paz.jpg','Numa das pernas do Eagle',{labels:[['A PLACA',0.5],['"VIEMOS EM PAZ"','Viemos em paz']]});
B.card('c11_lua_cheia_vista_columbia.jpg','Enquanto isso, lá em cima',{pos:'l',labels:[['MICHAEL COLLINS · COLUMBIA','Michael Collins']]});
B.note([['A CADA ÓRBITA:',0],['> 48 MIN NO LADO OCULTO','quarenta e oito minutos'],['> SEM CONTATO COM A TERRA','sem nenhum contato']],'A cada órbita',{pos:'r',side:true,until:'E os soviéticos?',stamp:['SOZINHO','mais isolado',0.66,0.82]});

// ---------- 12 · O FIM DA CORRIDA ----------
CH('E os soviéticos?');
B.chapter(12,'O fim da corrida','E os soviéticos?');
B.card('c12_foguete_n1_sovietico.jpg','Duas semanas antes da Apollo 11',{labels:[['FOGUETE N1 · URSS','o N1'],['3 JUL 1969',0.9]],stamp:['EXPLODIU','explodiu logo após',0.6,0.72,-12,74]});
B.note([['LUNA 15 · SONDA SOVIÉTICA',0],['> MISSÃO: TRAZER ROCHAS','trazer amostras'],['  ANTES DOS AMERICANOS','antes dos americanos'],['> 21 JUL 1969','Ela se chocou']],'uma sonda soviética não tripulada',{stamp:['CAIU','montanha lunar',0.66,0.84,-10,84]});
B.card('c12_amerissagem_resgate.jpg','No dia 24 de julho',{labels:[['24 JUL 1969 · PACÍFICO',0.5]]});
B.card('c12_quarentena_hornet.jpg','Os astronautas passaram três semanas',{labels:[['21 DIAS DE QUARENTENA','três semanas']]});
B.card('c04_kennedy_congresso_1961.jpg','A promessa de Kennedy estava cumprida',{labels:[['25 MAIO 1961',0.4]],stamp:['CUMPRIDA','estava cumprida',0.6,0.78,-10,74]});
B.card('c12_apollo17_ultima_missao.jpg','Nos três anos seguintes',{labels:[['6 POUSOS · 1969–1972','mais cinco missões'],['12 HOMENS NA LUA','doze homens'],['APOLLO 17 · DEZ 1972','O último deles']]});
B.card('c12_aperto_de_mao_apollo_soyuz.jpg','Em 1975',{pos:'l',labels:[['17 JUL 1975 · APOLLO-SOYUZ','se acoplaram'],['STAFFORD & LEONOV','Thomas Stafford']]});
B.card('c05_leonov_retrato.jpg','o mesmo homem que tinha feito',{pos:'r',side:true,until:'A corrida tinha começado com medo',labels:[['ALEXEI LEONOV',0.4],['O DA 1ª CAMINHADA ESPACIAL',1.2]]});
B.title('COMEÇOU COM MEDO.','Terminou com um aperto de mão.','A corrida tinha começado com medo',{big:'Terminou com um aperto',size:92});
B.card('06_pegada_no_solo_lunar.jpg','E as pegadas deixadas na Lua',{zoom:[1.05,1.2],labels:[['AINDA LÁ · HÁ MAIS DE 50 ANOS','milhões de anos']]});
B.card('c08_nascer_da_terra_earthrise.jpg','A prova de que',{zoom:[1.0,1.12]});
}
