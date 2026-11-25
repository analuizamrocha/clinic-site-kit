# Autoridade local

Consulta de cidade, na prática, se resolve muito no mapa e nas menções, não em mais um post. O site precisa de uma página dona, NAP idêntico e um Perfil da Empresa no Google completo. Quem mais diz que você existe conta — menção, não só link.

Dado de terceiro (AirOps, citado no mapa de Lawrence Hitches): grande parte da visibilidade de topo de funil nas IAs viria de fontes fora do site (o número citado foi 85%). Use como argumento para cuidar de diretórios e menções, não como lei. Sempre confira a fonte em [fontes.md](fontes.md).

Redes sociais, segundo o Google, não são fator de ranqueamento. Mesmo assim, um perfil citado por uma IA ou por um jornal importa como menção e como caminho de confiança.

## NAP idêntico em todo lugar

Nome, endereço e telefone iguais, caractere a caractere no que for possível, em:

- `site.config.ts` (única fonte no código)
- Site (rodapé, contato, páginas de local, schema)
- Google Meu Negócio (Perfil da Empresa)
- Diretórios (Doctoralia e equivalentes, quando o cliente usar)
- Sites de hospitais, convênios e parceiros que listem o profissional

Horário também. Divergência de telefone, complemento de endereço ou horário é o tipo de erro que confunde mapa, IA e paciente.

Nunca altere telefone, WhatsApp ou destino de contato sem o cliente.

## Google Meu Negócio

Checklist mínimo (peça acesso ao cliente; não invente o que está na ficha):

- Categoria principal correta (a especialidade, não um genérico)
- Categorias secundárias só se forem reais
- Nome sem keyword stuffing
- Endereço e área de atendimento verdadeiros
- Horário atual, inclusive feriado quando couber
- Telefone e link do site no host canônico
- Descrição sóbria, com identificação profissional
- Fotos próprias: fachada, recepção, sala, o profissional. Sem paciente identificável
- Perguntas e respostas da ficha, no tom de paciente, sem promessa
- Produtos ou serviços da ficha alinhados às páginas donas do site
- Pedido ético de avaliação (abaixo)
- Resposta a avaliações: educada, sem discutir caso clínico, sem quebrar sigilo

Cidade principal: a home do site dona a consulta "[especialidade] em [cidade]". O perfil no mapa sustenta essa consulta. Um segundo local, em outra cidade, ganha página própria e ficha própria.

## Avaliações éticas

Pode:

- Convidar o paciente, sem contraprestação, a deixar uma opinião honesta no Google ou no diretório que de fato importa
- Responder de forma sóbria

Não pode (medicina / CFM; outros conselhos: confirme no `docs/compliance-guidelines.md`):

- Comprar avaliação, oferecer brinde ou desconto em troca
- Mandar texto pronto que soe a depoimento de resultado
- Pedir só para quem ficou satisfeito de um jeito que distorça a verdade
- Republicar depoimento com adjetivo de superioridade ou cara de promessa
- Encher o perfil com republicação reiterada de elogio (o manual da Codame trata repetição excessiva como problema)

## Menções, parceiros e imprensa

Pergunte, para cada oportunidade: este link ou esta menção traria um paciente? Se não, o custo provavelmente não vale.

Caminhos legítimos:

- Página correta em hospital, clínica parceira ou convênio, com NAP igual
- Diretório profissional em que o cliente já está ou que as IAs já citam
- Sociedade de especialidade, se houver perfil real
- Imprensa local e guias da cidade, quando houver pauta de verdade (educativa, não "melhor médico")
- Material original do site que um jornalista ou um blog da área possa citar (ver formatos em [05-conteudo-e-ia.md](05-conteudo-e-ia.md))

Em entrevista ou artigo na imprensa, o médico fala como representante da medicina: sem captar clientela, sem endereço e telefone na peça, com conflito de interesse declarado, quando for o caso. Isso é regra de publicidade, não detalhe de SEO.

Não inscreva o cliente em prêmio ou ranking de "melhor médico".

## Fora do código, mas no plano do cliente

Várias ações desta página não são pull request. Deixe isso explícito no relatório: o que o agente faz no repo, o que Diego ou o cliente faz no Google Meu Negócio, no diretório e com parceiros.
