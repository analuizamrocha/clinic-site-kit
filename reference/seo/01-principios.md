# Princípios

Estas regras valem para todo cliente. A tarefa muda. A pergunta por trás dela não.

## O que o Google de fato diz

A posição oficial, hoje, é esta:

- Não importa se o texto foi escrito por uma pessoa, por uma IA ou pelos dois. Importa se a página é útil para quem pesquisa.
- A pergunta das diretrizes de conteúdo útil ("helpful content") inclui: a página oferece uma descrição significativa, completa ou abrangente do assunto?
- O que o Google pune de forma explícita é o **abuso de conteúdo em escala** (*scaled content abuse*): muitas páginas produzidas principalmente para ranquear, com pouco valor próprio. Isso vale com IA ou sem IA.
- Dado estruturado precisa descrever o que está visível na página. Schema que não bate com o texto é manipulação, não atalho.
- Não existe arquivo de texto especial nem schema especial que faça a página entrar em AI Overview. As visões de IA do Google rodam sobre o ranqueamento principal.

Fontes oficiais estão em [fontes.md](fontes.md). Se a documentação do Google mudar, atualize este arquivo e a data em `fontes.md`.

## O que é tese de terceiros, não regra

Trate como hipótese ou dado de terceiros, nunca como política do Google:

- "O Google detecta texto 100% gerado por IA." Isso foi tese de um reel de SEO, a partir de um caso (site com um artigo de IA por dia que caiu depois de um core update) e do GPTZero. O detector é um sinal interno nosso, não o critério do Google.
- As Quality Rater Guidelines (versão citada: 11 de setembro de 2025, seções 3.2 e 4.6.6), segundo o carrossel de Lawrence Hitches, pedem que os avaliadores julguem esforço, originalidade e talento ou habilidade, e permitem a nota mais baixa para conteúdo copiado ou gerado por IA com pouco ou nenhum esforço. Isso é diretriz de avaliador humano, citada por terceiros neste playbook. Não é um "filtro de IA" anunciado como regra de ranqueamento.
- Rankings de "o que mais ganha backlink", similaridade de título, percentual de citação no topo da página e crescimento de sessões de IA em e-commerce são estudos de terceiros. Sempre vá com a fonte.

## Esforço visível

A IA deixou o texto barato. Página que claramente não deu trabalho vale menos do que nunca.

Quatro provas que a IA do concorrente não copia, porque não aconteceram com ele:

1. **Fotos suas.** Consultório, equipe, o próprio profissional. Em medicina, nunca foto que identifique paciente, e nunca antes e depois como isca. Ver [09-saude-cfm.md](09-saude-cfm.md).
2. **Números seus.** Um número que só aquele profissional tem (anos de prática, quantas dúvidas daquele tipo chegam no consultório, um dado interno anonimizado) vale mais do que dez citações repetidas. Só use número que o cliente confirmar. Placeholder: `[NÚMERO PRÓPRIO — preencher com o profissional]`.
3. **Prova de que você fez.** Print, processo, erro corrigido no caminho, antes e depois de uma métrica do **site** (Search Console), não de paciente.
4. **Opinião com nome.** "Como eu conduzo esse caso", assinado, com CRM e RQE.

## IA assistida, não IA gerada em escala

IA é uma escala, não um sim ou não.

| Polo | O que é | Risco |
|---|---|---|
| Gerado em escala | Muitas páginas rasas, só para ranquear, publicadas com pouca ou nenhuma revisão | Alto (política de conteúdo em escala + qualidade baixa) |
| Gerado e abandonado | Um texto "bom, mas raso", sem experiência própria nem autoria | Alto em core update |
| Assistido e revisado | IA pesquisa, estrutura e rascunha; uma pessoa revisa linha a linha e coloca a voz do profissional | Aceitável, se a página tiver valor próprio |
| Escrito por gente, polido com IA | A substância vem do profissional; a IA só organiza, corta e revisa forma | O alvo |

O GPTZero (e equivalentes) ajuda a priorizar reescrita. Um resultado "100% IA" ou "polished with AI" **não** é veredito do Google. Textos curtos demais (~250 palavras) são péssimos para o detector e já são sinal de página rasa.

Fluxo completo em [05-conteudo-e-ia.md](05-conteudo-e-ia.md).

## Menos páginas, mais fundas

Uma URL dona por intenção. Volume de busca e "keyword difficulty" não decidem sozinhos se a página existe: a dificuldade muda de ferramenta para ferramenta (há exemplo de terceiros com KD 82 em uma e 0 em outra). A pergunta certa é: a pessoa realmente pergunta isso, e isso merece página própria ou é seção de outra?

Páginas de volume zero que saem do consultório entram no mapa. Artigo genérico que só repete o top 10, não.

## Saúde é tema sensível (YMYL)

Em conteúdo médico, as regras do conselho e as de qualidade apontam para o mesmo lado: texto sóbrio, autoria clara, sem promessa, sem medo como gancho. Isso é feature de SEO, não burocracia no fim.

Autoria mínima em página de saúde: nome do profissional, a palavra MÉDICO, CRM do estado, especialidade e RQE quando houver, data de publicação e data de revisão.

## Números

- Não invente cliques, impressões, posição, volume, avaliação nem resultado clínico.
- Se não houver Search Console ou dado do cliente, deixe o campo vazio e diga que falta.
- O único caso próprio deste playbook: o site da Dra. Ana Luiza Moraes Rocha teve cerca de 19 mil cliques e 2,61 milhões de impressões em 3 meses. Houve também Google Ads. Nunca escreva que esse resultado veio só do orgânico. Nunca use esse número como meta contratual de outro cliente.
