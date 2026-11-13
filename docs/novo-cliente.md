# Novo cliente — da reunião ao mês a mês

Roteiro para abrir um cliente. A apresentação da reunião está em
[`presentations/novo-cliente`](../presentations/novo-cliente/slides.md).
O brief que você preenche com ele é o [`CLIENT-BRIEF.template.md`](../CLIENT-BRIEF.template.md).
A execução técnica continua no [`WORKFLOW.md`](../WORKFLOW.md).

O kit gera a primeira versão do site. Não publica sozinho e não escreve o texto
clínico no lugar do médico. O repositório `clinic-site-kit` é a fábrica. O site
do cliente nasce numa pasta nova. Não desenvolva o site dentro deste repositório.

## Antes da reunião

```bash
cd ~/workspace/jobs/clinic-site-kit
git checkout main && git pull
```

Node 24. Abra os slides:

```bash
cd presentations/novo-cliente
bun install
bun run dev
```

`bun run export` gera o PDF. `bun run export:pptx` gera o PowerPoint. Os dois
pedem o Chromium do Playwright na primeira vez.

Leve o brief impresso ou na tela. O que não for respondido fica `UNKNOWN`.
Nada disso se inventa depois.

## A reunião

Uns 40 minutos. Os slides cobrem o combinado. O brief cobre os fatos.

1. O que o site faz: uma página para cada busca que é dele, e o botão para o
   WhatsApp certo.
2. O que não entra no combinado: posição no Google, volume de pacientes no
   primeiro mês.
3. As duas semanas até o preview, o lançamento, e os meses seguintes.
4. Quem aprova o texto, e que só o texto aprovado entra no Google.
5. Preencher o brief. Sem estes itens o gerador para:
   - nome completo, nome de uso, especialidade como no conselho, registro e RQE;
   - retrato com pelo menos 900 px de largura, e a logo se existir;
   - sete cores em hex, ou uma referência visual; as fontes, se a marca já tiver;
   - domínio, com `www` ou sem `www` decidido agora;
   - um WhatsApp por finalidade real (consulta, exame, secretária, clínica),
     número em E.164, mensagem genérica;
   - cada endereço de verdade: rua, bairro, cidade, UF, CEP, horários, link do Maps;
   - o que ele faz e o paciente busca pelo nome, uma linha por serviço;
   - quem revisa o texto clínico, e em quanto tempo;
   - se depoimento e antes/depois entram (isso segue o conselho);
   - URLs antigas que precisam continuar funcionando, se já existe site.

Perguntas que os pacientes fazem, tom e concorrentes ajudam o blog. Não
bloqueiam a primeira versão.

Mensagem de WhatsApp que passa no gerador: "Olá! Vim pelo site e gostaria de
agendar uma consulta." Doença, exame e procedimento na mensagem fazem o build
falhar.

## Quem faz o quê

| Você | O médico |
|---|---|
| Brief, paleta, site, domínio, Vercel, Search Console | Nome, registro, endereços, telefones, o que ele faz |
| Estrutura, SEO, testes, publicação | Retrato, logo, horários, mensagem de WhatsApp |
| Rascunho das páginas, fora do Google até a aprovação | Ler e aprovar cada texto clínico antes de indexar |
| Auditoria mensal e os posts combinados | Perfil da Empresa: categoria, fotos, nome, endereço e telefone iguais aos do site, ritmo de avaliações |

Texto clínico novo entra com `indexable: false`. A aprovação dele liga a
indexação. Promessa de resultado, porcentagem e prazo não entram.

## O que dizer sobre o tempo

- **Semana 1.** Reunião, brief, regra do conselho, site no ar em preview. Ele vê
  a casa, os serviços e os contatos. Ainda não é campanha de busca.
- **Semana 2.** Ele devolve o que está errado. Você corrige, aponta o domínio,
  verifica o Search Console e alinha o Perfil da Empresa.
- **Lançamento.** Só o que ele aprovou fica indexável. O resto continua no ar,
  fora do Google. Com o domínio no ar, rode `npx is-agentic <domínio> --json`
  e guarde o link do relatório. Corrija o que ele marcar como essencial antes
  de tratar o lançamento como fechado.
- **Mês 1 a 10.** A curva fica plana. A maior parte do acesso é informacional,
  não "especialidade em cidade". Essa busca depende sobretudo do Perfil da
  Empresa. Cada post leva a uma página de serviço.
- **Todo mês.** Uma auditoria, mais uma leitura do Is Agentic no domínio
  canônico. O ganho barato é melhorar o título das páginas que já aparecem
  entre as posições 5 e 12.
- **Serviço ou artigo novo.** Um de cada vez, terminado antes do próximo. A
  cada seis meses, ou se o conselho mudar a regra, a pesquisa de compliance é
  refeita.

A meta que se mede: clique no WhatsApp, ligação, mapa.

## Depois da reunião

1. Salve o brief como `docs/client-brief.md` numa pasta de trabalho sua, ainda
   fora do repositório do cliente.
2. Pesquise a regra do conselho daquela profissão: `/clinic-compliance-research`.
   Dentista e médico não seguem a mesma regra de imagem e de preço.
3. Se for explorar visual, rode o Taste Skill uma vez e escolha uma das três
   direções. Sem foto de acervo no lugar do retrato. Detalhe no
   [`WORKFLOW.md`](../WORKFLOW.md), passo 0b.
4. Transforme o brief em `client.json`, no formato de
   [`examples/demo-pediatria/client.json`](../examples/demo-pediatria/client.json).
5. Gere o site ao lado:

```bash
cd ~/workspace/jobs/clinic-site-kit/templates/next-app
bun install
bun scripts/create-site.ts \
  --brief ~/caminho/do/client.json \
  --out ~/workspace/jobs/nome-do-cliente \
  --check
```

O `--check` recusa o brief e não escreve nada se faltar fato, se o telefone
estiver fora de E.164, se a mensagem citar termo clínico, ou se a paleta ficar
abaixo do contraste AA.

6. Abra a pasta nova no Cursor. O `AGENTS.md` de lá é o contrato do agente.
   Fontes, logo, fotos, texto dos serviços e posts acontecem nesse repositório.
7. No repositório novo: `/impeccable init`, depois `/impeccable document`,
   depois `typeset`, `layout`, `quieter`, `polish` e `audit`.

A skill que conduz os passos 4 e 5 é `clinic-new-site`.
