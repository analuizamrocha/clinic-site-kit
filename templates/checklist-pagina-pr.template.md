# Checklist de PR — página de conteúdo

Modelo do kit (`templates/checklist-pagina-pr.template.md`). No site do cliente este arquivo é `docs/checklist-pagina-pr.md`. O `install.sh` não sobrescreve se ele já existir. O gerador do starter também copia este texto para o repo novo.

Copie para a descrição do pull request (em português) quando o PR cria ou altera página indexável, post, serviço ou local.

Modelo de descrição já pedido no starter: problema, mudança, benefício esperado (hipótese), testes, pendências, como avaliar depois.

## Ownership e intenção

- [ ] A intenção desta URL está clara e não compete com outra página (`docs/seo-strategy.md`)
- [ ] A home continua dona de "[especialidade] em [cidade principal]"
- [ ] Post indexável aponta para pelo menos um serviço

## Texto e esforço

- [ ] A primeira frase responde a pergunta
- [ ] Cada H2 é respondido na primeira frase da seção
- [ ] Há substância própria (experiência, foto, número confirmado ou opinião assinada) — ou os placeholders `[EXPERIÊNCIA DO PROFISSIONAL]` / `[NÚMERO PRÓPRIO]` / `[FOTO PRÓPRIA]` estão visíveis, sem invenção
- [ ] Autoria visível: nome, MÉDICO, CRM, especialidade, RQE quando houver
- [ ] Data de revisão só foi preenchida com aprovação do profissional
- [ ] Inclui quando não é indicado / o que depende de avaliação
- [ ] Sem número, convênio, prazo ou depoimento inventado

## Compliance

- [ ] Conferido contra `docs/compliance-guidelines.md` (em medicina, também `docs/clinic-kit/seo/09-saude-cfm.md`, que aponta para o exemplo de CFM e não o substitui)
- [ ] Sem promessa de resultado, sem "melhor/único/milagroso", sem gancho de medo
- [ ] Sem foto de paciente identificável e sem antes e depois como isca
- [ ] Texto clínico está `indexable: false` até o ok do profissional

## Técnico desta página

- [ ] Conteúdo principal (título, H1, corpo, FAQ, CTA) aparece no HTML sem JS
- [ ] Canonical auto-referente
- [ ] Schema só descreve o que está visível; FAQ do schema = FAQ visível
- [ ] `seoTitle` ≤ 60 caracteres com o sufixo do site; description ≤ 160
- [ ] Links no corpo, âncora descritiva; sem apontar para slug morto
- [ ] Imagens com alt e dimensões reais
- [ ] Sitemap / `llms.txt` / ownership atualizados, ou listados como pendência
- [ ] `bun run check` (ou o equivalente do repo) passou

## Medição

- [ ] Hipótese no changelog: o que deve acontecer e como vamos ver (Search Console / GA4 / consultas)
