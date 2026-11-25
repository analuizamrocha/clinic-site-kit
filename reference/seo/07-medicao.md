# Medição

Meça consulta marcada (e, quando der, consulta que aconteceu), não só posição e não só lead. Sem dado, declare a lacuna. Não invente número.

## Ferramentas (poucas, estáveis)

- **Search Console.** Fonte principal de impressões, cliques, CTR e posição. Também indexação, vitais e 404.
- **GA4.** Escolha um número de negócio para olhar com disciplina (ex.: clique para WhatsApp ou pedido de agendamento, depois do consentimento). Não espalhe dezenas de eventos com título de página ou mensagem pré-preenchida — o starter já restringe isso por LGPD.
- **Uma ferramenta de posição**, se houver. Só uma. A "dificuldade" da palavra muda de fornecedor para fornecedor.
- **Changelog do site.** Sem isso, ninguém sabe o que mudou antes de um core update.

Não misture Google Ads com orgânico na hora de contar vitória. Se o cliente veicula ads, registre os dois canais. O caso da Ana (cerca de 19 mil cliques e 2,61 milhões de impressões em 3 meses) teve ads. Esse recorte não se conta como "só SEO".

## Search Console — rotina

Olhe os últimos 3 meses (e um recorte de 28 dias para ver mudança recente):

| Sinal | O que fazer |
|---|---|
| Muita impressão, CTR baixo | Testar title e description, nas palavras de quem pesquisa, sem prometer o que o texto não cobre. Recorte útil na prática do kit: posições 5–12 com CTR fraco |
| Posição 4–10 | Melhorar match de intenção, profundidade e links internos. Em geral o melhor retorno, melhor do que URL nova |
| URL errada ranqueando | Corrigir ownership / canibalização |
| Ranqueia e não vira consulta | Corrigir jornada e CTA, não a posição |
| 404 ainda com impressão | 301 para a página dona, com o motivo no `site.config.ts` |
| Sem demanda real | Não publique só porque a ferramenta tem a palavra |
| Consultas de cidade paradas e informacionais em alta | Olhar Google Meu Negócio e NAP, não só o blog |

A curva dos primeiros meses costuma ser lenta. O [playbook técnico](../SEO-AEO-PLAYBOOK.md) (parte 1, seção 9) descreve isso com honestidade: não chame um site novo de "atrasado" no mês 3 só porque o tráfego ainda é baixo.

Proteja o que já está na primeira página antes de caçar consulta nova.

## Previsão antes de mudar

Nenhuma mudança relevante (título, fusão de páginas, redirect, reescrita grande, noindex) entra sem uma linha no changelog. No site do cliente, essa tabela fica na seção "SEO changelog" de `docs/seo-strategy.md`. Não grave o changelog dentro de `docs/clinic-kit/`: o `install.sh` substitui essa pasta.

```md
| Data | Página / URL | Mudança | Hipótese (o que deve acontecer) | Como vamos ver | Resultado (preencher depois) |
|---|---|---|---|---|---|
| [AAAA-MM-DD] | [URL] | [o que muda] | [ex.: CTR da consulta X sobe] | Search Console em 28 dias | [preencher] |
```

A hipótese é hipótese. Se não se confirmar, registre. O PR do kit já pede isso em português: problema, mudança, benefício esperado, testes, pendências, como avaliar depois.

## Depois de um core update

1. Anote a data do update (fonte: blog do Google / painel de status).
2. Compare impressões, cliques e páginas no Search Console: 28 dias depois vs. 28 dias antes, e também vs. o ano anterior se houver sazonalidade.
3. Liste páginas que caíram com substância, não variação de ruído.
4. Cruze com a auditoria de IA e qualidade: queda em lote de páginas rasas ou muito parecidas é sinal de conteúdo, não de "o Google odeia IA".
5. Não reescreva o site inteiro no dia seguinte. Corrija primeiro o que já estava fraco no checklist.
6. Registre no changelog o que foi observado, mesmo que a ação seja "esperar mais 2 semanas".

## Relatório para o cliente

Sempre separe:

- O que é medido (GSC, GA4, consultas)
- O que é hipótese
- O que é caso de outro site (e suas condições, inclusive ads)
- O que ainda não temos acesso

Sucesso = paciente que agendou e, se o cliente puder informar, que compareceu. Lead solto é intermediário.
