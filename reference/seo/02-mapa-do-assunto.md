# Mapa do assunto

Monte a árvore da especialidade **antes** de criar URL nova. O Google quer saber se o site cobre o assunto de forma substancial e completa. Isso não se resolve com volume de busca.

A tabela de ownership em `docs/seo-strategy.md` é a forma arquitetural deste mapa. Os dois precisam bater.

## Como a árvore se organiza (saúde)

Do mais geral para o mais específico:

1. **Pilar: especialidade + cidade principal.** Em geral a home. Ela é a dona de "[especialidade] em [cidade]". Não repita essa linha no título, na description e no corpo de outra página da mesma cidade.
2. **Hub de serviços.** Ex.: `/tratamentos`. Organiza o portfólio. Não compete com as páginas filhas.
3. **Uma página por procedimento ou condição que o profissional realmente realiza.** Ex.: `/tratamentos/[slug]`. Intenção comercial (consulta + tratamento). Confirme no brief, não por inferência.
4. **Uma página por endereço real, com equipe.** Ex.: `/locais-de-atendimento/[slug]`. Dona de "[especialidade] em [outra cidade ou este endereço]". Não gere página por bairro: isso é padrão de doorway.
5. **Perguntas do paciente.** Ex.: `/blog/[slug]` ou seção de FAQ na página dona. Intenção informativa. Cada post aponta para a página dona do serviço. Post sem dono não entra no plano.
6. **Perguntas de volume zero.** As que a secretária, o WhatsApp e o consultório ouvem o tempo todo, mesmo que nenhuma ferramenta de palavra-chave mostre volume. Essas perguntas são o material mais original do site.

Sobre, contato e FAQ geral sustentam, mas não roubam a intenção das páginas acima.

Para negócios que não são saúde, troque "procedimento" por serviço e "consultório" por atendimento. A lógica é a mesma.

## Página própria ou seção?

Antes de criar URL, pergunte:

- A pessoa pesquisa isso de um jeito que pede uma resposta completa?
- Já existe uma página dona dessa intenção? Se sim: atualize, diferencie ou una. Não crie a segunda URL.
- Isso cabe como H2 (ou FAQ) numa página que já existe?
- O profissional de fato entrega esse serviço?
- Há substância própria para pôr (experiência, foto, número, opinião), ou só texto genérico?

Intenção comercial ou local não vive em post de blog.

## De onde saem os galhos

Não comece pela ferramenta de palavra-chave. Comece por:

- Brief do cliente e serviços confirmados
- Perguntas reais do consultório, da secretária e do WhatsApp (peça uma lista; use placeholder até chegar)
- Vocabulário que o paciente usa, ao lado do termo clínico
- Páginas já no ar
- Search Console, se houver: consultas que já impressionam, inclusive as que 404
- Diretórios e Perfil da Empresa no Google (perguntas da ficha)

A ferramenta de palavra-chave entra depois, para nomear como a pessoa pesquisa e para não ignorar um galho óbvio. Ela não veta galho de volume zero.

## Prompt para montar o mapa

Há uma versão completa em [prompts/mapa-do-assunto.md](prompts/mapa-do-assunto.md). A semente, adaptada do prompt usado por Daniel Sócrates (teste dele: clínica de fisioterapia em Curitiba):

> Meu business é [O QUE VOCÊ VENDE / ESPECIALIDADE] em [CIDADE]. Monte o mapa completo desse assunto: todos os subtemas e todas as perguntas que um cliente ou paciente faz antes de comprar ou agendar, inclusive as que quase ninguém pesquisa. Organize do mais geral para o mais específico e diga qual página deve ter link para qual. Não invente procedimento que o profissional não realiza. Separe o que merece página própria do que é seção. Em saúde, evite termos constrangedores nos exemplos e siga o CFM.

Depois compare o mapa com as URLs existentes e gere o plano de gaps, fusões e redirects.

## Links internos

Regras práticas (a de "no máximo uns 15 links no corpo" é heurística de terceiros, não regra do Google):

- O link principal vive **dentro do texto**, no momento em que o próximo passo da dúvida aparece. Menu e rodapé não bastam.
- Cada link leva para o próximo passo útil: da dúvida para o procedimento, do procedimento para o local, do post para a página dona.
- Âncora descreve o destino e, quando fizer sentido, se aproxima do título da página de destino. Evite "clique aqui".
- Uns 15 links editoriais no corpo é um teto razoável por página. Qualidade da relação vale mais do que a cota.
- Todo post indexável aponta para pelo menos um serviço (`relatedServiceSlugs` no starter). Toda página de serviço aponta para pelo menos um conteúdo de apoio, quando ele já existir.
- Locais, serviços e "sobre" se cruzam.
- Não aponte para slug antigo. Redirect 301 fica no `site.config.ts`, com motivo.
- Não force a mesma frase de "[especialidade] em [cidade principal]" em várias páginas.

## Entrega do mapa

Um arquivo por cliente: `docs/mapa-do-assunto.md`, a partir de `templates/mapa-do-assunto.template.md`. Não grave o mapa dentro de `docs/clinic-kit/`: o `install.sh` substitui essa pasta. Deve conter:

- Árvore do geral ao específico
- Para cada item: intenção, URL dona (existente ou proposta), página própria vs seção, status (existe / falta / unir / redirecionar)
- Plano de links (origem → destino → âncora sugerida)
- Lista do que foi cortado e por quê
- Lacunas que só o profissional pode preencher, em placeholder

Não publique o mapa inteiro de uma vez. Prioridade = demanda real do paciente × apoio a uma página que converte.
