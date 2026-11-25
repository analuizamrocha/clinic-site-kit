# Prompt: auditoria de conteúdo (GPTZero + esforço)

Cole este prompt no Cursor ou no Claude Code com o repositório do site aberto (um cliente, ou o starter em `templates/next-app/` só se for um teste).

---

Você é um auditor de SEO neste repositório. Objetivo: descobrir quais páginas de conteúdo parecem 100% geradas por IA e rasas, e quais são escritas por gente com ajuda de IA. Cruze isso com esforço visível, autoria e compliance. Depois priorize o que reescrever para reduzir risco em core updates.

Leia, se existirem: `docs/clinic-kit/seo/01-principios.md`, `docs/clinic-kit/seo/05-conteudo-e-ia.md`, `docs/clinic-kit/seo/09-saude-cfm.md` (no kit: `reference/seo/` com os mesmos nomes), `docs/compliance-guidelines.md` e `docs/seo-strategy.md`. O kit não chama a API do GPTZero. Sem chave e sem colar o texto na ferramenta, deixe a coluna vazia.

IMPORTANTE: não altere nenhum arquivo de conteúdo. Só leia, meça e gere o relatório. Não invente nota do GPTZero, tráfego, posição nem fato clínico. Ao final, mostre o resumo e pergunte antes de reescrever qualquer página.

## 1. Mapear as páginas de conteúdo

- Descubra o framework (no kit: Next.js App Router, conteúdo em `site/site.config.ts`, `content/posts/`, rotas em `src/app/`) e onde fica o texto.
- Liste todas as páginas indexáveis com conteúdo editorial: home, sobre, tratamentos, locais, posts, FAQs, landings. Ignore páginas legais, login e componentes isolados.
- Para cada uma, extraia o texto limpo (sem código, sem menu ou rodapé repetido) com: URL/rota, arquivo de origem, título, número de palavras, se está `indexable`.

## 2. Medir com o GPTZero

- Confira a documentação atual da API do GPTZero (https://gptzero.me/docs) antes de chamar: endpoint e campos mudam.
- Se existir a variável de ambiente `GPTZERO_API_KEY`, envie o texto de cada página e guarde: classificação do documento (humano / misto / IA, ou o rótulo vigente, inclusive "polished with AI"), as probabilidades e as frases marcadas como IA.
- Se NÃO existir a chave: não invente resultados. Gere `auditoria-ia/textos/<slug>.txt` com o texto de cada página (até ~5.000 caracteres por arquivo), para colar em https://gptzero.me, e deixe as colunas do GPTZero vazias no relatório.
- Textos com menos de ~250 palavras: marque "curto demais para medir". Isso já é sinal de página rasa.

## 3. Avaliar qualidade e esforço (independente do detector)

Nota de 0 a 2 em cada critério:

1. **Experiência própria:** tem algo que só o profissional saberia (como conduz o caso, dúvidas reais, exemplos, números confirmados)?
2. **Autoria:** quem escreveu ou revisou aparece, com credencial (em saúde: nome, MÉDICO, CRM, RQE), bloco de autor e data de revisão?
3. **Profundidade:** responde a dúvida por completo, inclusive quando não é indicado, ou é genérica?
4. **Originalidade:** tem dado, tabela, checklist, foto ou material próprio que alguém citaria?
5. **Duplicação:** está muito parecida com outra página do mesmo site? Compare as páginas entre si.
6. **Tom:** sinais de texto de IA sem revisão (introdução vazia, "em resumo", listas genéricas, frases de efeito)?
7. **Fotos próprias:** há foto real do profissional, da equipe ou do espaço, no HTML? (0 se só banco de imagem genérico ou nenhuma.) Em saúde, foto de paciente identificável ou antes e depois como isca é falha de compliance, não ponto positivo.
8. **Números próprios:** há pelo menos um dado que só este profissional ou este site teria, confirmado no brief ou no config? Número inventado vale zero e deve ser flagged.
9. **Prova de processo:** a página mostra como a consulta ou o serviço acontece de verdade (passos, preparo, o que esperar), ou só afirma qualidade?
10. **Opinião com nome:** há um trecho claramente atribuído ao profissional, sóbrio, sem promessa?

Total: /20.

Para sites de saúde, cheque também a Resolução CFM 2.336/2023 (ou o `docs/compliance-guidelines.md` do projeto, que prevalece): sem promessa de resultado, sem antes e depois como isca, sem preço como chamariz, sem "melhor médico".

## 4. Relatório

Crie `auditoria-ia/relatorio.md` e `auditoria-ia/relatorio.csv` com uma linha por página:

URL | arquivo | palavras | indexável | GPTZero (classe e % IA) | notas 0–2 dos 10 critérios | total /20 | risco (alto / médio / baixo) | ação recomendada

Regra de risco:

- **Alto:** GPTZero "IA" (ou sem medição) + total ≤ 8, ou duplicação forte, ou falha de CFM, ou texto claramente em escala (várias páginas com a mesma carcaça).
- **Médio:** GPTZero "misto" / "polido com IA" ou total 9–14.
- **Baixo:** GPTZero "humano" ou "polido com IA" **e** total ≥ 15, com autoria e substância.

Ações possíveis: manter; reescrever com a voz do profissional (indique quais placeholders pedir); acrescentar experiência, foto, número, autoria; unir com outra página (indique qual e sugira redirect 301); noindex; remover.

No topo do relatório: quantas páginas em cada risco; as 5 prioridades da semana; um parágrafo sobre o padrão geral do site. Não invente tráfego: se houver export do Search Console, cruze com cliques e impressões; se não, deixe a coluna vazia.

Se houver core update recente, destaque páginas que caíram e também estavam rasas ou "100% IA".

Ao final, mostre o resumo e pergunte antes de reescrever.
