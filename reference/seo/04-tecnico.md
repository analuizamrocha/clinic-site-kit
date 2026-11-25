# Técnico

Um robô precisa ler a página. Isso inclui o robô de uma IA. Se o conteúdo principal depende de JavaScript, para vários buscadores ele não existe.

A arquitetura que o kit já fixou está no [playbook técnico](../SEO-AEO-PLAYBOOK.md). Este arquivo não repete essas regras. Ele diz como conferir, em português, se o HTML baixado é a página que a pessoa vê.

| Assunto | Onde está |
|---|---|
| Uma URL dona por intenção | Parte 1, seção 1 |
| Canonical auto-referente; www decidido uma vez; 301 e não 302 | Parte 1, seção 2 |
| Um `@graph` com `@id` estáveis; FAQ do schema igual à FAQ visível | Parte 1, seção 3 |
| NAP, coordenadas, uma página por endereço real | Parte 1, seção 4 |
| Sitemap com `lastModified` honesto | Parte 1, seção 5 |
| Imagens com dimensão real e CLS | Parte 1, seção 6 |
| Redirect no lugar certo | Parte 1, seção 7 |
| Testes que seguram a camada | Parte 1, seção 8 |
| `llms.txt` honesto e crawlers de IA | Parte 2, seções 1, 2 e 7 |
| HTML estático, sem depender de JS | Parte 2, seção 5 |

No starter (`templates/next-app/`): Next.js App Router, renderização estática, fatos em `site/site.config.ts`, JSON-LD, sitemap, robots, `llms.txt`. Adapte o caminho se o site do cliente for outra stack. Não abra mão da leitura sem JavaScript.

## HTML cru, sem depender de JS

Crawlers de resposta de IA (relato recorrente sobre ChatGPT, Claude e Perplexity; trate como premissa de trabalho, não como documentação oficial de cada um) em geral não executam JavaScript. A fonte dessa premissa está em [fontes.md](fontes.md).

Teste mínimo de uma URL, no ar ou no preview local:

```bash
curl -sL "$URL" | head
curl -sL "$URL" | grep -i '<h1'
curl -sL "$URL" | grep -i 'application/ld+json'
curl -sL "$URL" | grep -i 'rel="canonical"'
```

No starter, o mesmo recorte em várias rotas:

```bash
bun run build && bun run start
bun run seo:html -- http://127.0.0.1:3000 / /sobre /tratamentos
```

`scripts/check-seo-html.ts` faz o fetch sem executar JavaScript e reporta title, H1, H2, presença de JSON-LD, `alt` ausente, canonical e a contagem de links internos dentro de `<main>`. Falha se faltar title, se o H1 não for único, se não houver JSON-LD, se uma imagem não tiver atributo `alt`, ou se não houver canonical. A contagem de links é relatório: o teto de cerca de 15 links no corpo é heurística de terceiros, não regra do Google.

Esse comando não entra em `bun run check`. Os testes e2e já cobrem um H1 por rota, títulos únicos e a linha "[especialidade] em [cidade]" com o browser. O script olha o HTML que o `curl` vê. Prompt completo: [checagem-tecnica](prompts/checagem-tecnica.md).

Passe se, no HTML baixado:

- Título, H1, corpo principal e FAQ estão visíveis como texto
- O JSON-LD está no HTML inicial
- O conteúdo principal aparece cedo no documento, não no fim depois de um shell vazio
- Menu e CTA importantes existem como links reais (`<a href>`), não só como botões de cliente

No kit: rotas de conteúdo estáticas; interatividade só na folha (consentimento, botão flutuante). FAQ não pode nascer vazia e ser preenchida no cliente.

## Três cliques a partir da home

Toda página que deve ranquear chega em no máximo três cliques reais, com links no HTML. Hub de tratamentos, locais e blog precisam estar na navegação. Página órfã não entra no sitemap "para ver se cola".

## O que conferir sem reabrir o playbook

- O sitemap lista só URL canônica que vale a pena ranquear. `lastModified` é honesto. Não use `new Date()` em massa.
- `robots.txt` aponta para o sitemap no host canônico. Separar bot de busca e bot de treino (`GPTBot`, `ClaudeBot`) é decisão do cliente, não um padrão silencioso.
- `/llms.txt` é inventário curado. O Google afirmou que não exige arquivo especial nem schema especial para IA. Arquivo desatualizado, com URL morta, é pior do que não ter.
- O schema descreve o que a pessoa vê. Valide no [validador de schema](https://validator.schema.org/) o HTML renderizado, não só o componente.
- NAP idêntico ao `site.config.ts` e ao Perfil da Empresa. Não crie um segundo lugar para nome, endereço ou telefone.
- A página precisa ser usável no celular (o kit trata 390px como viewport de desenho e 320px sem overflow). Área de toque de pelo menos 44px. Analytics só depois do consentimento (LGPD).
- Depois do ar, acompanhe INP, LCP e CLS no Search Console. Não invente nota de Lighthouse.

O que está quebrado e custa mais tráfego agora (404 com impressão, canonical errado, HTML vazio para o robô, NAP divergente) vem antes de micro-otimização.

## O que o starter já barra por teste

Não desligue estes guardrails:

- Uma dona por consulta de cidade
- Dois títulos iguais
- Post indexável sem `relatedServiceSlugs`
- Schema com fato que não está visível
- Redirect em `next.config.ts` em vez de `site.config.ts`
- Fato clínico ou telefone inventado fora do config
