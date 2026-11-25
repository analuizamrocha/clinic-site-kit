# Playbook operacional de SEO

Processo único para sites de médicos, clínicas e outros serviços locais no Brasil, pensado para o `clinic-site-kit`.

Este diretório é `reference/seo/` no kit. O `install.sh` copia `reference/` para `docs/clinic-kit/` do cliente, então os mesmos arquivos aparecem em `docs/clinic-kit/seo/`. Os links relativos daqui para o playbook técnico (`../SEO-AEO-PLAYBOOK.md`) e para o exemplo de CFM (`../compliance-examples/cfm-brazil-medicine.md`) valem nos dois lugares.

A camada técnica e de arquitetura continua naquele playbook em inglês (ownership, canonical, schema, AEO, testes). Use os dois juntos. Onde o assunto já está resolvido lá, ou no exemplo de CFM, este playbook aponta em vez de copiar.

Arquivos do cliente não ficam nesta pasta: o próximo `install.sh` substitui `docs/clinic-kit/`. O mapa preenchido vai para `docs/mapa-do-assunto.md`, o changelog para `docs/seo-strategy.md`, a tabela de visibilidade em IA para `docs/visibilidade-ia.md`.

Nunca invente números. Não prometa o resultado de um caso para outro cliente. Estatística de terceiros leva fonte e a marca de que não é regra do Google.

## Documentos

1. [Princípios](01-principios.md) — o que o Google de fato diz, esforço, IA assistida
2. [Mapa do assunto](02-mapa-do-assunto.md) — árvore da especialidade e links internos
3. [Checklist da página](03-checklist-pagina.md) — perguntas para cada página e para o PR
4. [Técnico](04-tecnico.md) — HTML sem JS e o que conferir sem reabrir o playbook técnico
5. [Conteúdo e IA](05-conteudo-e-ia.md) — fluxo de escrita, GPTZero, formatos que ganham citação
6. [Autoridade local](06-autoridade-local.md) — Google Meu Negócio, NAP, menções, avaliações éticas
7. [Medição](07-medicao.md) — Search Console, GA4, consulta marcada, changelog, core update
8. [Visibilidade em IA](08-visibilidade-ia.md) — busca por IA e o teste de 8 perguntas
9. [Saúde e CFM](09-saude-cfm.md) — piso editorial em medicina; o exemplo trabalhado está ao lado
10. [Fontes](fontes.md) — origem de cada afirmação deste playbook

Prompts prontos, nesta pasta: [mapa-do-assunto](prompts/mapa-do-assunto.md), [nova-pagina](prompts/nova-pagina.md), [auditoria-ia-gptzero](prompts/auditoria-ia-gptzero.md), [checagem-tecnica](prompts/checagem-tecnica.md).

## Ordem para um cliente novo

1. Brief completo e pesquisa de compliance (`/clinic-compliance-research`). Sem isso, não escreva texto clínico.
2. Monte o [mapa do assunto](02-mapa-do-assunto.md), inclusive perguntas de volume zero que saem do consultório, da secretária e do WhatsApp. Grave em `docs/mapa-do-assunto.md`.
3. Preencha a tabela de ownership em `docs/seo-strategy.md`: uma URL dona por cluster de intenção. A home dona "[especialidade] em [cidade principal]". O mapa e a tabela precisam nomear a mesma URL.
4. Suba a base técnica: HTML no código-fonte, schema fiel ao texto visível, sitemap, `robots.txt`, NAP único em `site.config.ts`. O desenho está no playbook técnico; a conferência, em [Técnico](04-tecnico.md).
5. Publique primeiro as páginas que convertem: especialidade + cidade, uma página por procedimento ou condição que o profissional de fato realiza, e uma página por endereço real com equipe.
6. Em cada página, deixe o esforço visível (foto própria, número próprio, prova, opinião assinada) e responda a pergunta no primeiro parágrafo. Ver [Checklist](03-checklist-pagina.md).
7. Ligue as páginas com links no corpo do texto, não só no menu. Posts apontam para a página dona do serviço.
8. Feche o [Google Meu Negócio e o NAP](06-autoridade-local.md) no mesmo dia do ar.
9. Ligue Search Console e GA4 no lançamento. Abra o changelog em `docs/seo-strategy.md`. Faça a previsão antes de cada mudança relevante. Ver [Medição](07-medicao.md).
10. Rode o [teste de visibilidade em IA](08-visibilidade-ia.md) para ter a linha de base (X/32).
11. Só então o blog: menos páginas, mais fundas, assistidas por IA e revisadas linha a linha pelo profissional. Texto clínico nasce com `indexable: false` até a aprovação.

## Ordem para um site que já existe

1. Inventário das páginas indexáveis e leitura do Search Console (3 meses, se houver acesso). Sem acesso, declare a lacuna. Não invente cliques nem posição.
2. Auditoria de qualidade e de IA (`prompts/auditoria-ia-gptzero.md`), com os critérios de esforço.
3. Mapa do assunto comparado com o que já está no ar: o que falta, o que juntar, o que redirecionar (301), onde pôr link interno (`prompts/mapa-do-assunto.md`).
4. Checagem técnica (`prompts/checagem-tecnica.md`): HTML sem JavaScript, schema = texto visível, sitemap, profundidade de clique.
5. Reescreva primeiro o que estiver raso, duplicado ou 100% gerado por IA. Unir páginas fracas costuma valer mais do que criar URL nova.
6. Complete o mapa só depois de limpar o que já existe. Cada página nova passa no checklist e no compliance do projeto.
7. Auditoria de NAP e Google Meu Negócio.
8. Teste de visibilidade em IA e plano de 30 dias, sem prometer que a IA vai passar a indicar o negócio.
9. Loop mensal e checagem depois de cada core update.

## O que não fazer

- Um artigo raso por dia, só para "ter conteúdo".
- Publicar texto 100% gerado por IA sem revisão humana linha a linha.
- Criar página por bairro ou por variação de palavra-chave com a mesma intenção.
- Prometer resultado de tratamento, "melhor médico" ou antes e depois como isca. O piso editorial está em [Saúde e CFM](09-saude-cfm.md); o que a resolução de fato permite está no exemplo de CFM, não neste resumo.
- Usar o caso de um cliente como meta garantida para outro. O caso da Ana (cerca de 19 mil cliques e 2,61 milhões de impressões em 3 meses) também teve Google Ads.
