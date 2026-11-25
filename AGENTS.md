# AGENTS.md

Acordo para quem edita o clinic-site-kit, a fábrica dos sites. O site de um cliente mora em outro repositório.

## Onde está o SEO

- Playbook operacional (pt-BR): `reference/seo/`. O `install.sh` copia `reference/` para `docs/clinic-kit/` no repo de destino, e o cliente vê `docs/clinic-kit/seo/`.
- Playbook técnico (inglês): `reference/SEO-AEO-PLAYBOOK.md`. Os dois valem. Onde o assunto já está no técnico, o operacional aponta para ele.
- Exemplo de CFM: `reference/compliance-examples/cfm-brazil-medicine.md`. `reference/seo/09-saude-cfm.md` é o piso editorial e não substitui o exemplo nem a pesquisa por projeto.
- Prompts: `reference/seo/prompts/`.
- Checklist de página: `templates/checklist-pagina-pr.template.md`. No cliente vira `docs/checklist-pagina-pr.md` e o `install.sh` não sobrescreve se o arquivo já existir.

## O que não se faz neste repositório

- Não altere cópia clínica, telefone, avaliação ou fato de um cliente. Isso vive no repo do cliente, em `site/site.config.ts` e no conteúdo daquele site.
- Não invente número, resultado, credencial, endereço ou procedimento. O que falta fica em branco ou como `[CONFIRMAR COM O PROFISSIONAL]`.
- Compliance é pesquisado por projeto (`clinic-compliance-research`). Não aplique o exemplo de CFM a outra profissão.
- Não apague o playbook técnico, as skills nem os testes para encurtar o fluxo com o playbook novo.
- Texto clínico, no site gerado, nasce com `indexable: false`. JSON-LD só descreve texto visível.

## Antes de mudar o kit

Acrescente e cruze links. Uma mudança grande em `install.sh`, `WORKFLOW.md` ou nas skills precisa preservar a sequência que já existe (compliance, ownership, serviços, blog, auditoria). A barra do starter continua `bun run check` em `templates/next-app`, com Node 24.

O kit não usa `.cursor/rules`. O contrato do agente no site gerado é `templates/next-app/AGENTS.md`.
