# Prompt: mapa do assunto, gaps e links internos

Cole este prompt no Cursor ou no Claude Code com o repositório do site (ou do kit, se estiver planejando um cliente) aberto. Preencha o bloco de contexto. O que não souber, deixe em branco — não invente.

---

Contexto do cliente (preencha):

- Especialidade ou serviço: [ESPECIALIDADE]
- Cidade principal: [CIDADE]
- Outras cidades ou endereços reais com equipe: [ENDEREÇOS]
- Serviços e procedimentos que o profissional de fato realiza: [LISTA]
- Perguntas reais do consultório, da secretária ou do WhatsApp: [COLE A LISTA OU ESCREVA "NÃO TENHO AINDA"]
- Site no ar (URL canônica): [URL OU "AINDA NÃO"]
- Conselho de classe (CFM, CFO, etc.): [CONSELHO]
- Restrições conhecidas de compliance: [OU APONTE docs/compliance-guidelines.md]

Você vai montar o mapa completo do assunto e compará-lo com as páginas que já existem neste repositório. Não escreva páginas novas neste passo. Não invente procedimento, endereço, volume de busca, posição ou fato clínico. Em exemplos, evite termo médico constrangedor.

Leia, se existirem: `docs/clinic-kit/seo/02-mapa-do-assunto.md` (no kit: `reference/seo/02-mapa-do-assunto.md`), `docs/seo-strategy.md`, `docs/mapa-do-assunto.md`, `docs/client-brief.md`, `docs/compliance-guidelines.md`, `site/site.config.ts` (ou equivalente) e as rotas de conteúdo.

## 1. Inventário

Liste as URLs/rotas já existentes, com intenção aparente e arquivo de origem. Marque as que já estão na tabela de ownership.

## 2. Árvore do assunto

A partir do contexto e do inventário, monte o mapa do mais geral para o mais específico:

1. Pilar: especialidade + cidade principal (em geral a home)
2. Hub de serviços
3. Um galho por procedimento ou condição realmente oferecido
4. Um galho por endereço real com equipe (sem página por bairro)
5. Perguntas do paciente, inclusive as de volume zero que o consultório ouve e quase ninguém pesquisa
6. Material de referência que mereça URL (tabela de preparo, checklist da primeira consulta, glossário, experimento próprio), se houver substância

Para cada item da árvore, diga:

- Intenção (informativa, comercial, local)
- Página própria ou seção de outra
- URL dona (existente ou proposta, no padrão de rotas do repo)
- Status: existe / falta / está raso / unir com [URL] / redirecionar para [URL]
- De onde veio o galho (brief, config, consultório, Search Console, inferência de vocabulário — e se for inferência, marque como hipótese)

Não use volume de busca como veto. Não crie galho para serviço que o profissional não realiza.

## 3. Gaps, fusões e redirects

Produza uma tabela priorizada:

| Prioridade | Ação | URL envolvida | Por quê | Depende do profissional? |
|---|---|---|---|---|

Prioridade = demanda real do paciente × apoio a uma página que converte. Unir e reescrever vem antes de URL nova quando a intenção já existe.

Sugira 301 só quando a intenção for a mesma e houver URL sobrevivente. O redirect, neste repo, vive em `site.config.ts` (ou no equivalente), com motivo. Não aplique.

## 4. Plano de links internos

Para as páginas existentes e para as propostas de alta prioridade, liste:

origem → destino → âncora sugerida (nas palavras do paciente) → onde no texto o link entra

Regras: links no corpo, não só no menu; post aponta para a página dona do serviço; serviço aponta para conteúdo de apoio quando existir; teto prático de uns 15 links editoriais por página; não repetir a frase dona "[especialidade] em [cidade principal]" em várias páginas; não apontar para slug morto.

## 5. Entrega

Gere (ou atualize, sem apagar dados já preenchidos pelo cliente) `docs/mapa-do-assunto.md`. Não grave o mapa dentro de `docs/clinic-kit/`: o `install.sh` substitui essa pasta. Se a tabela de ownership estiver desatualizada, proponha o diff de `docs/seo-strategy.md` — não escreva o diff no arquivo sem pedir.

No fim, liste o que só o profissional pode responder, em placeholders, e as 5 primeiras ações da semana.
