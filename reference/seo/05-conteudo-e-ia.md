# Conteúdo e IA

Objetivo: páginas que um paciente (e uma IA) queiram citar, escritas com ajuda de IA e com a voz do profissional. Não: um artigo raso por dia.

## Fluxo padrão (assistido)

1. **Mapa e ownership.** A URL já é a dona da intenção? Se não, pare e volte ao [mapa](02-mapa-do-assunto.md).
2. **Coleta de substância.** O profissional (ou a equipe) entrega o que a IA não sabe: como conduz o caso, perguntas reais, o que o paciente erra no preparo, números próprios, fotos do consultório. Use o prompt `prompts/nova-pagina.md`. O que faltar vira placeholder, nunca invenção.
3. **IA pesquisa e estrutura.** Fontes profissionais de referência, galhos do assunto, H2 em forma de pergunta, FAQs. A IA não fecha afirmação clínica sozinha.
4. **IA rascunha.** Texto sóbrio, resposta na primeira frase, seções autoexplicativas. Placeholders explícitos: `[EXPERIÊNCIA DO PROFISSIONAL]`, `[FOTO PRÓPRIA]`, `[NÚMERO PRÓPRIO]`, `[FONTE]`.
5. **Revisão humana linha a linha.** Corte genérico, coloque a voz do médico, confira CFM, confira fatos contra o brief e o `site.config.ts`.
6. **Aprovação clínica.** `lastReviewed` e `indexable: true` só depois do ok do profissional. No starter, o padrão de texto novo é `indexable: false`.
7. **Checagem de IA e qualidade.** GPTZero (ou equivalente) + checklist de esforço. Ver prompt `prompts/auditoria-ia-gptzero.md`.
8. **Publicar e ligar.** Links no corpo, sitemap, `llms.txt`, changelog com a previsão do que se espera medir.

A skill `clinic-content-plan` já exige escolher, por post, se o profissional entrega a substância, se o agente rascunha para revisão, ou se o tema fica de fora. Não pule essa pergunta.

## O que a revisão humana precisa mudar

Corte ou reescreva:

- Introdução vazia, "em um mundo em que", "em resumo" de encerramento genérico
- Listas que qualquer modelo escreveria sobre a especialidade
- A mesma estrutura em várias páginas, trocando só a palavra-chave
- Promessa, superlativo e gancho de medo
- Qualquer número, credencial, endereço ou prazo que não tenha vindo do cliente

Coloque:

- Como aquele profissional atende de verdade
- Perguntas que surgem no consultório, nas palavras do paciente
- O que não é indicado
- Foto, número e opinião com nome

## Auditoria com GPTZero

Use para priorizar reescrita, não para "passar no Google".

- Com `GPTZERO_API_KEY`, meça as páginas editoriais e registre classe e percentual.
- Sem chave, exporte o texto para colar em https://gptzero.me. Não invente nota.
- O kit não chama a API. Ligar o GPTZero no starter é decisão em aberto. Sem chave e sem colar o texto, a coluna fica vazia.
- Texto com menos de ~250 palavras: "curto demais para medir", e já trate como risco de raso.
- Cruze com os critérios de qualidade e esforço (experiência, autoria, profundidade, originalidade, duplicação, tom, fotos, números, prova, opinião). Uma página "humana" e rasa continua fraca. Uma página "polida com IA", profunda e assinada, pode ficar.

Risco alto típico: classificada como IA (ou sem medição) e nota baixa de qualidade, ou duplicação forte entre páginas. Ação: reescrever com a voz do profissional, unir com 301, ou noindex. Nunca altere o conteúdo sem pedir.

## Formatos que ganham citação e link

Edward Sturm resumiu um estudo de Cyrus Shepard sobre as URLs mais linkadas em centenas de domínios. Quase nunca eram posts de blog ou guias genéricos. A ordem abaixo é desse estudo (dado de terceiro, não regra do Google). Jornalistas e respostas de IA tendem a citar o mesmo tipo de coisa: dado original, material de referência, fato único.

Adapte para clínica, com CFM:

| Prioridade no estudo | Formato | Como usar em clínica (exemplos genéricos) | Atenção |
|---|---|---|---|
| 1 | Medição e acompanhamento originais | Contagem anonimizada das dúvidas mais comuns no consultório; série do próprio Search Console do site (métrica de site, não de paciente) | Só com dado real e autorização |
| 2 | Tabelas de referência | Preparo de exame, o que levar na primeira consulta, horários e convênios de fato atendidos | Sem protocolo que ensine ato médico |
| 3 | Benchmarks ranqueados | Comparar práticas do **site** (ex.: visibilidade em IA de clínicas da cidade, no seu estudo) | Nunca ranking de "melhor médico" |
| 4 | Fatos de uma localidade | Página do endereço real: como chegar, estacionamento, bairro, cidades de atendimento | Um endereço staffed; não doorway por bairro |
| 5 | Pesquisa ou experimento próprio | O teste de visibilidade em IA (8 perguntas, X/32) publicado como método e resultado | Não inventar a pontuação |
| 6 | Teste e comparação | Comparar abordagens de conteúdo ou de perfil no Google, com método | Comparação de técnica clínica só se for factual, dos dois lados, aprovada |
| 7 | Dados e tendências do setor | Compilar estatísticas oficiais com fonte | Sempre atribuir; não vestir como dado próprio |
| 8 | Listas de "melhores" | Evitar no ramo médico | CFM veda premiação do tipo "melhor médico" |
| 9 | Compilado de estatísticas | Página de referência com fontes datadas | Idem |
| 10 | Revisão de pesquisas | Leitura sóbria de literatura corrente, assinada | O médico responde pelo texto |
| 11 | Explicação de especialista | "Como eu avalio [tema neutro]", com CRM e RQE | Sem diagnóstico à distância |
| 12 | Guias de "como fazer" | Como se preparar para a consulta ou para um exame | Sem ensinar ato privativo |
| 13 | Linha do tempo | Formação, trajetória profissional, história do consultório | Fatos verificáveis |
| 14 | Glossário | Termos que o paciente ouve na consulta, em linguagem clara | Sem alarmismo |
| 15 | Checklist e material para imprimir | Lista da primeira consulta, checklist de preparo | Tom educativo |
| 16 | Ferramentas e calculadoras | Só se houver utilidade real (ex.: como chegar, checklist interativo) | Agências superestimam esse formato; no estudo ele aparece em 16º. Em saúde, nada que diagnostique ou indique procedimento |

Um único material original bem feito (a tabela de dúvidas reais, o teste de visibilidade, a página de preparo) vale mais do que uma dezena de posts que explicam o básico — o básico a IA já explica.

## Tom

Frases curtas. Resposta primeiro. Português do Brasil. Sem emoji no conteúdo profissional, salvo decisão explícita do cliente em outro canal. Sem fechamento de propaganda vazia. Prefira "pode", "em casos selecionados", "depende da avaliação".
