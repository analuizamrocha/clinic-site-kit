# Checklist da página

Use como pergunta, não como tarefa cega. A tarefa muda com o tempo. A pergunta permanece.

Serve para página nova, reescrita e revisão de PR. A versão colável no GitHub está em `templates/checklist-pagina-pr.template.md` no kit e em `docs/checklist-pagina-pr.md` no site do cliente.

Em site gerado pelo starter, some a isto o checklist de 12 pontos da skill `clinic-treatment-page` e as regras de `AGENTS.md`. Texto clínico novo ou alterado entra com `indexable: false` até o profissional aprovar.

Marque sim / não / não se aplica. Todo "não" vira ação ou justificativa.

## 1. Intenção e ownership

- Qual pergunta real esta página responde?
- Esta intenção já tem URL dona em `docs/seo-strategy.md`? Se sim, por que esta página existe?
- É página própria ou deveria ser seção de outra?
- O profissional de fato realiza o que a página descreve?
- A home continua sendo a única dona de "[especialidade] em [cidade principal]"?

## 2. Título, H1 e abertura

- O título está nas palavras de quem pesquisa, não só no jargão interno?
- O `seoTitle` cabe em 60 caracteres, já contando o sufixo ` | [nome do site]`?
- A description tem no máximo 160 caracteres e só promete o que o texto cobre?
- O H1 é único e bate com a intenção (não precisa ser idêntico ao title)?
- A primeira frase responde a pergunta? Afirmação direta, depois o detalhe.
- Cada H2 é uma pergunta (ou poderia ser) e a primeira frase da seção responde com as mesmas palavras?
- A seção sobrevive sozinha, sem "como dito acima"?

## 3. Esforço e originalidade

- Há foto própria (consultório, profissional, equipe), com alt descritivo, no HTML, não só no banner de JS?
- Há `[NÚMERO PRÓPRIO]` preenchido com dado confirmado, não inventado?
- Há prova de processo (como a consulta acontece, preparo, o que levar) que não está em todo concorrente?
- Há uma opinião assinada ("como eu conduzo"), sóbria, sem promessa de resultado?
- A página diz algo que nenhuma outra do site diz?
- Se tirar o nome da especialidade, o texto ainda parece deste profissional, ou parece modelo trocando a palavra-chave?

## 4. Autoria, data e fontes

- Nome, a palavra MÉDICO, CRM do estado, especialidade e RQE (quando houver) aparecem na página ou no rodapé visível?
- Há data de publicação e data de revisão (`lastReviewed` só depois do ok do profissional)?
- Afirmação em que o leigo poderia se basear tem fonte, quando couber?
- Bloco de autor não contradiz o schema.

## 5. Completude

- A página cobre o assunto de forma substancial, ou só o óbvio do top 10?
- Inclui o lado contrário: quando **não** é indicado, limitações, o que depende de avaliação?
- As FAQs são perguntas reais de paciente, com resposta curta e sóbria?
- FAQ visível e FAQ no schema são idênticos, caractere por caractere?

## 6. Links e mídia

- Há links no corpo para o próximo passo (serviço dono, local, conteúdo de apoio)?
- A âncora descreve o destino?
- O total de links editoriais no corpo é razoável (teto prático: uns 15)?
- Imagens têm alt, dimensões reais e não atrasam o LCP além da imagem principal?
- Nenhuma imagem identifica paciente. Nenhuma é antes e depois de tratamento usada como isca. Ver [09-saude-cfm.md](09-saude-cfm.md).

## 7. Técnico desta página

- O conteúdo principal aparece no HTML cru (`curl` ou "ver código-fonte"), sem precisar de JavaScript?
- Canonical aponta para a própria URL absoluta?
- O schema descreve só o que está visível (Physician / MedicalProcedure / FAQPage / LocalBusiness, conforme o tipo)?
- A página está no sitemap (se for indexável) e é alcançável em no máximo 3 cliques a partir da home?
- Título, H1 e schema não inventam dado que não está no `site.config.ts` ou no brief.

## 8. Compliance (saúde)

- Não há resultado garantido, prometido ou insinuado?
- Não há "melhor", "único", "exclusivo", "milagroso" nem ranking de médico?
- Não há gancho de medo?
- Preço, se aparecer, é informação — não isca do tipo "o mais barato da cidade"?
- O texto foi lido por uma pessoa contra `docs/compliance-guidelines.md` (e, em medicina, contra [09-saude-cfm.md](09-saude-cfm.md))?

## 9. IA e revisão

- A IA fez pesquisa, estrutura ou rascunho, mas uma pessoa revisou linha a linha?
- Placeholders do tipo `[EXPERIÊNCIA DO PROFISSIONAL]`, `[FOTO PRÓPRIA]`, `[NÚMERO PRÓPRIO]` não foram "preenchidos" pelo modelo?
- Se a página for longa o bastante, passou por uma checagem de detector (GPTZero ou equivalente) e não ficou "100% IA" e rasa ao mesmo tempo?

## Resultado do checklist

- **Pode publicar** (ou pode pedir indexação): todos os itens aplicáveis em sim, com aprovação do profissional.
- **Publicar como noindex:** falta revisão clínica ou falta fato do profissional.
- **Não publicar:** falha de CFM, fato inventado, intenção duplicada ou texto genérico sem esforço.
