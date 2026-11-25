# Fontes

Tudo o que este playbook afirma cabe em uma destas caixas. Se não couber, não deveria estar nos docs.

- **Regra oficial do Google** — documentação pública, com link.
- **Norma de conselho** — resolução ou manual, com link e data de leitura.
- **Dado ou tese de terceiro** — estudo, carrossel, reel ou ferramenta. Nunca escrever como se fosse regra do Google.
- **Caso próprio** — métrica de um site real deste time, com as condições (inclusive ads).
- **Prática do kit** — regra operacional do `clinic-site-kit`, nascida de implementação e de Search Console em sites reais. Não é garantia de resultado.

Quando uma fonte de terceiro for auto-reportada (o autor do projeto publica o próprio caso), diga isso.

## Google (oficial)

| Afirmação neste playbook | Fonte | Nota |
|---|---|---|
| O Google avalia utilidade, não o fato de o texto ter sido feito com IA | Documentação de conteúdo útil / "AI-generated content" do Google Search | Releia se a página oficial mudar |
| Abuso de conteúdo em escala (*scaled content abuse*) é política spam, com ou sem IA | Google Search spam policies | Vale para fazenda de páginas rasas |
| A pergunta "a página oferece uma descrição significativa, completa ou abrangente do assunto?" | Página de conteúdo útil do Google, citada também no carrossel de Daniel Sócrates | Formulação oficial; mantenha o link atualizado |
| Dado estruturado deve refletir o conteúdo visível | Documentação de dados estruturados / diretrizes anti-spam de schema | Regra oficial |
| Não há arquivo ou schema especial obrigatório para AI Overview; a experiência roda no ranqueamento principal | Comunicações oficiais do Google sobre AI features na busca, citadas no mapa de Lawrence | Confirme o texto vigente antes de citar em proposta comercial |
| Redes sociais não são fator de ranqueamento | Posição reiterada do Google | Menção em rede ainda pode ajudar por outro caminho |
| Quality Rater Guidelines, versão citada de 11 de setembro de 2025, seções 3.2 e 4.6.6 (esforço, originalidade, talento; nota mais baixa para conteúdo copiado ou gerado com pouco esforço) | Diretrizes de avaliadores de qualidade do Google, conforme citação de Lawrence Hitches | É guia de avaliador humano, não um "detector de IA" anunciado como fator. A citação das seções veio de terceiro; se for usar em material público, abra o PDF oficial e confirme a numeração |

Links oficiais mudam de caminho. Na dúvida, busque no domínio developers.google.com / support.google.com a página vigente e atualize esta tabela com a data.

## Normas de saúde (Brasil)

| Fonte | O que é | URL / onde está no kit | Lida em |
|---|---|---|---|
| Resolução CFM nº 2.336/2023 | Norma de publicidade médica | https://sistemas.cfm.org.br/normas/arquivos/resolucoes/BR/2023/2336_2023.pdf | 12/11/2026, no exemplo do kit |
| CFM, "O que muda" | Comparativo oficial | https://publicidademedica.cfm.org.br/resolucao/o-que-muda/ | 12/11/2026 |
| Manual de Publicidade Médica (Codame, 2024) | Leitura operacional; alguns pisos práticos estão aqui, não no artigo | https://publicidademedica.cfm.org.br/manual/baixar-manual | 12/11/2026 |
| Aplicação prática, cap. XII | Sequência operacional de antes e depois | https://publicidademedica.cfm.org.br/manual/aplicacao-pratica/capitulo-12 | 12/11/2026 |
| Resolução CFM nº 2.454/2026 | IA na medicina; não afrouxa a 2.336 | https://sistemas.cfm.org.br/normas/arquivos/resolucoes/BR/2026/2454_2026.pdf | 12/11/2026 |

O exemplo trabalhado está em [cfm-brazil-medicine.md](../compliance-examples/cfm-brazil-medicine.md) (no cliente: `docs/clinic-kit/compliance-examples/cfm-brazil-medicine.md`). O piso editorial que aponta para esse exemplo, sem copiá-lo, está em [09-saude-cfm.md](09-saude-cfm.md). Outros conselhos: ver `skills/clinic-compliance-research`.

## Conteúdos que alimentaram este playbook (terceiros)

| Conteúdo | Autor / veículo | O que afirma | Classificação |
|---|---|---|---|
| Reel sobre site que publicava um artigo de IA por dia e perdeu tráfego após core update; GPTZero distinguindo "100% IA" e "polished with AI" | Criador de SEO (reel no Instagram, conversa do Diego) | Tese: o Google provavelmente diferencia IA pura de texto polido com IA; IA é uma escala | Caso anedótico + tese do autor. O GPTZero é detector de terceiro, não ferramenta do Google |
| Reel sobre URLs mais linkadas | Edward Sturm, citando estudo de Cyrus Shepard | Quase nunca posts ou guias; lista de 16 formatos, calculadoras em 16º; jornalistas e IAs citam dado original e referência | Estudo de terceiro, filtrado por um reel |
| Carrossel "The next SEO trend is effort" | Lawrence Hitches (@lawrenceaiseo) | Esforço, originalidade e habilidade nas QRG; quatro provas (fotos, números, prova, opinião) | Interpretação de diretrizes oficiais + tese prática do autor |
| Carrossel do mapa do assunto, links internos e resposta direta | Daniel Sócrates (@danielsocrates.seo) | Site de curso de inglês de 10 mil para 200 mil cliques/mês em cerca de 5 meses; mapa antes de escrever; ~15 links no texto; frases curtas | **Caso auto-reportado** pelo projeto. Não usar como meta para cliente |
| Prompt de mapa no Gemini (clínica de fisioterapia em Curitiba) | Daniel Sócrates, no mesmo carrossel | Semente do prompt de mapa adaptado neste pacote | Método de terceiro, adaptado |
| Carrossel "o SEO inteiro num mapa" (7 galhos em forma de pergunta) | Lawrence Hitches | Estrutura de 7 galhos; várias estatísticas de terceiros (abaixo) | Framework do autor + números de outros |
| Similaridade título–prompt 0,602 vs 0,484 em páginas recomendadas por IA | Ahrefs, 1,4 milhão de prompts, citado por Lawrence | Dado de terceiro | Não é regra do Google |
| Aberturas declarativas seriam escolhidas 14% mais vezes por IA | Growth Memo, cerca de 98 mil citações no ChatGPT, citado por Lawrence | Dado de terceiro | Idem |
| 85% da visibilidade de topo de funil em IA viria de fora do site | AirOps, citado por Lawrence | Dado de terceiro | Idem |
| 44% das citações de IA viriam dos primeiros 30% da página | Kevin Indig / Gauge, fevereiro de 2026, citado por Lawrence | Dado de terceiro | Idem |
| Sessões de IA +197% e orgânico +12% no 2º trimestre de 2026, orgânico ainda maior | Shopify, citado por Lawrence | Dado de e-commerce, de terceiro, de outro país e setor | Não extrapolar para clínica no Brasil |
| Crawlers de ChatGPT, Claude e Perplexity não executam JS | Relato recorrente, inclusive no mapa de Lawrence e no playbook do kit | Premissa de trabalho bem reportada; confirme na documentação vigente de cada bot se for crítico | Não é documentação do Google |
| KD 82 numa ferramenta e 0 em outra, no mesmo termo | Exemplo de Lawrence | Ilustra que "dificuldade" não é fato único | Anedótico |

## Caso próprio

| Caso | Número | Condições que não podem sumir | Uso permitido |
|---|---|---|---|
| Site da Dra. Ana Luiza Moraes Rocha (coloproctologia) | Cerca de 19 mil cliques e 2,61 milhões de impressões em 3 meses | Também houve Google Ads. Nunca afirmar que o resultado veio só do orgânico | Prova de trabalho deste time, com contexto. Nunca como meta garantida de outro contrato |

Métricas do site de origem do kit (consultas rastreadas, posições, dezenas de páginas) estão no playbook em inglês e são medição pontual, não promessa. Não as copie para proposta comercial sem a data e sem o contexto.

## Ferramentas citadas

| Ferramenta | Papel neste playbook | Limite |
|---|---|---|
| GPTZero (https://gptzero.me) | Sinal interno de "IA" vs "polido com IA" vs "humano" | Não é o Google. API pode ser paga. Texto curto é pouco confiável |
| Google Search Console e GA4 | Medição | Só com acesso real |
| Validador de schema (validator.schema.org) | Checar JSON-LD no HTML renderizado | — |
| Is Agentic (`npx is-agentic`) | Prontidão do host canônico para agentes | Já está no kit; score alto não desculpa falha de CFM |

## Como citar isto para o cliente

Errado: "O Google pune IA, por isso seu site precisa passar no GPTZero."

Certo: "O Google pune conteúdo raso feito em escala. Um detector ajuda a achar página fraca. A correção é profundidade, autoria e revisão humana."

Errado: "Vamos repetir o caso de 200 mil cliques."

Certo: "Esse número é de um caso auto-reportado em outro nicho. O nosso caso próprio tem [X], e teve ads."
