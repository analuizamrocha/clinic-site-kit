# Prompt: checagem técnica (HTML, schema, sitemap)

Cole este prompt no Cursor ou no Claude Code com o repositório do site aberto. Se o site já estiver no ar, informe a URL canônica. Não invente nota de Lighthouse, posição ou tráfego.

---

URL canônica (se houver): [https://…]
Ambiente para testar: [produção / preview / build local]
Stack esperada no kit: Next.js App Router, conteúdo estático, schema no HTML inicial.

Você vai auditar se um robô que **não executa JavaScript** consegue ler o conteúdo que deve ranquear, se o schema bate com o texto visível, e se o sitemap e a profundidade de clique estão sãos.

Leia, se existirem: `docs/clinic-kit/seo/04-tecnico.md` (no kit: `reference/seo/04-tecnico.md`), `docs/clinic-kit/SEO-AEO-PLAYBOOK.md` (no kit: `reference/SEO-AEO-PLAYBOOK.md`), `src/lib/schema.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`, `site/site.config.ts`.

No starter, `bun run seo:html -- <origem> [rotas...]` baixa o HTML sem executar JavaScript e reporta title, H1, H2, JSON-LD, alt e links internos. Não invente esse relatório se o comando não rodou. Ele não substitui esta auditoria nem o `bun run check`. Os testes e2e já cobrem um H1, títulos únicos e a linha da cidade.

IMPORTANTE: auditoria é somente leitura. Produza um relatório. Só aplique correção se eu pedir.

## 1. Host e redirecionamento

```bash
curl -sI "[URL]"
```

Confira: um host canônico; o outro faz 301 (não 302); não há cadeia longa; `https` ok.

## 2. HTML cru por tipo de página

Escolha pelo menos: home, uma página de serviço, um local (se houver), um post, o hub de tratamentos. Para cada URL:

```bash
curl -sL "[URL]" -o /tmp/page.html
```

No arquivo baixado (sem headless browser), verifique:

- `<title>`, `<h1>`, headings H2, corpo, FAQ e CTA como texto e links `<a href>`
- `rel="canonical"` apontando para a própria URL
- JSON-LD presente (`application/ld+json`)
- Conteúdo principal aparece cedo no HTML
- Imagens importantes têm `alt`
- Telefone, endereço e horário, se mencionados, iguais ao config

Marque falha se o H1, o artigo ou a FAQ só existirem depois de JS.

Se o site só estiver local, rode o build ou o preview da stack (`bun run build` / `bun run preview` no starter) e faça o `curl` nessas URLs. Se não puder subir o servidor, leia o código das rotas e diga com clareza que o teste de HTML renderizado ficou pendente.

## 3. Schema vs texto visível

Para cada página amostrada:

- Extraia os blocos JSON-LD
- Liste os tipos (`Physician`, `MedicalClinic` / `LocalBusiness`, `MedicalProcedure`, `Article`, `FAQPage`, `BreadcrumbList`, etc.)
- Confira `@id` estáveis e se o grafo está conectado, ou se há blobs soltos
- Confira credencial: CRM como identificador, conselho em `recognizedBy`, especialidade
- FAQ do schema = FAQ visível, caractere a caractere
- Horário, NAP, serviços e afirmações do schema existem no texto
- Nada no schema que a página não mostre

Se possível, lembre de validar o HTML renderizado em https://validator.schema.org/.

## 4. Sitemap, robots, llms.txt, profundidade

- `/sitemap.xml` no host canônico, só URLs que devem ranquear, `lastModified` honesto
- Toda página indexável importante está no sitemap; não há órfã indexável de substância zero
- `robots.txt` com a linha Sitemap correta; blocos de crawlers de IA conferidos (reporte a política de bots de treino, não a altere sem perguntar)
- `llms.txt` (se existir): conjunto de posts = posts no disco; link no `<head>` se o kit já fizer isso
- Toda URL que deve ranquear está a no máximo 3 cliques da home, com links no HTML (navegação + hubs). Liste exceções.

## 5. NAP e fatos

Compare nome, endereço, telefone e horário em config, páginas, schema e, se o usuário tiver colado, o Google Meu Negócio. Liste divergências. Não "corrija" o telefone.

## 6. Relatório

Gere `auditoria-tecnica/relatorio.md` com:

1. **Quebrado** — impede leitura ou indexação correta (HTML vazio para o robô, canonical errado, 404, schema divergente, NAP errado)
2. **Fraco** — funciona pela metade (FAQ só no cliente, sitemap desatualizado, llms.txt mentindo, página a mais de 3 cliques)
3. **Oportunidade**
4. **O que já está certo** — para ninguém "consertar"

Cada item: o que, onde (URL e arquivo), por que importa, correção sugerida, esforço. Separe o que foi verificado com `curl` do que é leitura de código. No fim, pergunte o que aplicar.
