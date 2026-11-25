# Visibilidade em IA

Este galho vem por último porque os outros o alimentam: conteúdo útil com esforço, HTML legível, schema fiel, menções locais e medição. Não existe atalho de "otimizar para o ChatGPT" com arquivo secreto.

## O que o Google diz (e o que é de terceiros)

- Não há arquivo de texto obrigatório nem schema especial para aparecer em AI Overview. As visões de IA usam o ranqueamento principal.
- Dado de terceiro (Kevin Indig / Gauge, fevereiro de 2026, citado por Lawrence Hitches): 44% das citações de IA viriam dos primeiros 30% da página. Implicação prática, não lei: responda cedo, de forma autoexplicativa.
- Dado de terceiro (Shopify, 2º trimestre de 2026, mesma fonte de citação): sessões de IA em alta acentuada (+197% no recorte citado) e orgânico ainda maior em volume (+12% no mesmo recorte). Use só com a fonte, e não como retrato de clínica no Brasil.
- Escreva cada seção para ser citada sozinha. Heading em forma de pergunta, resposta na primeira frase, definição perto do topo, números explícitos quando forem reais.

O kit já entrega `llms.txt`, permissão de crawlers e texto em HTML estático. Mantenha isso honesto. Não venda esses arquivos como requisito do Google.

## Teste padrão deste playbook (8 perguntas × 4 IAs)

Objetivo: saber se ChatGPT, Gemini, Perplexity e Claude recomendam o negócio quando um paciente ou cliente pergunta **sem ouvir o nome**.

Pontuação: **X/32** (8 perguntas × 4 ferramentas). Cada menção confirmada (nome do negócio, do profissional ou do site) vale 1. Incerto não entra no numerador. Sem resposta não se inventa.

Status, sobre 32:

- **Invisível:** 0
- **Parcialmente visível:** 1 a 15
- **Visível:** 16 a 32

Se o teste estiver incompleto, o status é provisório. Mostre X menções em Y respostas recebidas.

O kit ainda não tem uma skill `visibilidade-ia`. O procedimento abaixo é a fonte. Transformar este teste em skill fica como decisão em aberto. Não prometa que a IA vai passar a indicar o negócio.

### Dados mínimos

Nome do negócio, especialidade ou segmento, cidade. Bairro, site e 1 a 3 serviços ajudam, mas não se inventa bairro.

### As 8 perguntas (nesta ordem, adaptadas ao vocabulário do segmento)

Nenhuma pode trazer o nome do negócio, do profissional, o site, o @ ou uma dica que identifique ("aquela da rua X").

1. Melhor X na cidade. Ex.: "Qual [segmento] você indica em [cidade]?" (em saúde, evite a fórmula "melhor médico")
2. X perto do bairro. Ex.: "Tem [segmento] perto do [bairro], em [cidade]?" Sem bairro, use uma região conhecida ou pule para uma variação com a cidade, sem inventar bairro
3. Me ajuda a escolher. Ex.: "Preciso escolher um [segmento] em [cidade]. Como você me ajuda a decidir?"
4. O que observar. Ex.: "O que eu devo levar em conta na hora de escolher um [segmento] em [cidade]?"
5. Serviço específico + cidade. Ex.: "Onde fazer [serviço] em [cidade]?"
6. Perto de mim. Ex.: "Tem [segmento] perto de mim em [cidade]?" (sempre com cidade)
7. Primeira vez. Ex.: "Nunca fui a um [segmento]. Quem você indica em [cidade] para uma primeira consulta?"
8. Quem você recomenda. Ex.: "Quem você recomenda para [necessidade real e neutra] em [cidade]?"

Em saúde: linguagem de paciente, respeitosa. Sem sintoma constrangedor, salvo pedido explícito do usuário com as palavras autorizadas. Sem "quem garante resultado", "o mais barato" como único critério ou "melhor antes e depois".

### Como rodar

Uma conversa nova em cada ferramenta, memória desligada, as 8 perguntas em sequência. Não avisar "estou testando meu consultório". Colar as respostas completas de volta. Tempo típico: 20 a 40 minutos.

Ferramentas: ChatGPT (chatgpt.com), Gemini (gemini.google.com), Perplexity (perplexity.ai), Claude (claude.ai, conversa diferente desta).

### Depois da pontuação

- Liste concorrentes que as IAs citaram, com a frequência. Não complete nome.
- Explique o porquê só com as fontes que as respostas realmente mostraram (Google Meu Negócio, Doctoralia, site próprio, listas locais, etc.). Se a IA não mostrou fonte, diga isso.
- Dê 5 ações concretas para 30 dias, ligadas às lacunas, sem prometer que a IA vai passar a indicar o negócio. Em saúde, as ações seguem o CFM.

Repita o teste depois de mudanças relevantes (páginas novas fundas, GBP corrigido, menções) e compare X/32 por ferramenta, não só o total.

## Medição por plataforma

Mantenha uma tabela viva por cliente em `docs/visibilidade-ia.md`. Não grave isso dentro de `docs/clinic-kit/`: o `install.sh` substitui essa pasta.

| Data | ChatGPT | Gemini | Perplexity | Claude | Total | Status | Notas (quem foi citado, fontes) |
|---|---|---|---|---|---|---|---|
| [AAAA-MM-DD] | [x]/8 | [x]/8 | [x]/8 | [x]/8 | [X]/32 | [provisório?] | |

Se alguma plataforma tiver relatório próprio de aparições (Search Console / experiências de IA, quando disponível para o cliente), anote o que for medido e a data. Não preencha com estimativa.
