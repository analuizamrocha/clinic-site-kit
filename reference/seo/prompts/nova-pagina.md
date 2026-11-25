# Prompt: nova página assistida por IA

Cole este prompt para rascunhar uma página (serviço, local, post ou material de referência) seguindo o playbook. A página não vai no ar sozinha: texto clínico nasce não indexável até a aprovação do profissional.

---

Contexto (preencha):

- Tipo de página: [serviço / local / post / referência / outro]
- Intenção e pergunta do paciente: [PERGUNTA]
- URL proposta: [ROTA]
- Página dona desta intenção (se este for um post, qual serviço ela apoia): [URL]
- Especialidade, cidade, profissional: [DADOS]
- Fatos confirmados (brief, `site.config.ts`, lista do cliente): [COLE]
- Experiência real que o profissional já entregou (voz, áudio transcrito, tópicos, "como eu conduzo"): [COLE OU "AINDA NÃO"]
- Números próprios autorizados: [COLE OU "NENHUM"]
- Fotos disponíveis (arquivo ou descrição do que falta): [ ]
- Conselho e compliance: [CFM / outro / docs/compliance-guidelines.md]

Leia, se existirem: `docs/clinic-kit/seo/03-checklist-pagina.md`, `docs/clinic-kit/seo/05-conteudo-e-ia.md`, `docs/clinic-kit/seo/09-saude-cfm.md` (no kit: `reference/seo/` com os mesmos nomes), `docs/compliance-guidelines.md`, `docs/seo-strategy.md`, `docs/checklist-pagina-pr.md`, a skill `clinic-treatment-page` ou `clinic-blog-post`, e uma página irmã no repo para copiar a forma (frontmatter, schema, componentes).

Regras inegociáveis:

- Não invente número, resultado, credencial, convênio, preço, prazo, depoimento, foto ou procedimento que o profissional não realiza.
- O que faltar vira placeholder visível, neste formato: `[EXPERIÊNCIA DO PROFISSIONAL]`, `[NÚMERO PRÓPRIO]`, `[FOTO PRÓPRIA: o que fotografar]`, `[FONTE]`, `[CONFIRMAR COM O PROFISSIONAL]`.
- Sem promessa de resultado, sem "melhor/único/milagroso", sem gancho de medo, sem paciente identificável, sem antes e depois como isca, sem preço como chamariz.
- Resposta na primeira frase da página e na primeira frase de cada H2. H2 em forma de pergunta, nas palavras do paciente. Seções autoexplicativas, sem "como dito acima".
- Inclua quando **não** é indicado, o que depende de avaliação, e FAQs reais. FAQ do schema = FAQ visível.
- Links no corpo para o próximo passo, com âncora descritiva.
- Identificação: nome, MÉDICO, CRM, especialidade, RQE quando houver, data. `lastReviewed` só se já houver aprovação — senão deixe claro que falta.
- Português do Brasil, frases curtas, tom sóbrio. Sem emoji.
- Não marque a página como indexável. No starter, `indexable: false`.

## O que entregar

1. Confirmação de ownership: esta URL pode existir, ou deveria ser seção de outra? Se houver conflito, pare e explique.
2. Rascunho no formato do repositório (MDX/Markdown ou o módulo da rota), mais os campos de metadata e o esquema sugerido.
3. Lista de placeholders que o profissional precisa preencher, agrupada (experiência, números, fotos, confirmações).
4. Auto-checklist de `docs/clinic-kit/seo/03-checklist-pagina.md` (no kit: `reference/seo/03-checklist-pagina.md`), com sim / não / não se aplica e o que falta.
5. Sugestão de previsão para o changelog: o que esperamos medir depois de publicar.

Não faça commit. Não altere páginas vizinhas (links de volta, sitemap, `llms.txt`) sem listar o diff e pedir ok. Se a substância do profissional não chegou, entregue o esqueleto com placeholders — não complete a voz por conta própria.
