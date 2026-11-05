# Bulbe Acompanha

> Projeto em Ciência de Dados I · Ibmec BH · 2º semestre de 2026
> Cliente: **Bulbe Energia** · Turma **A** · Squad **09**

Demonstração web para ajudar o cliente novo a entender e pagar a primeira fatura da Bulbe, mostrando o valor, a composição, o vencimento, as formas de pagamento e a confirmação simulada da transação.

---

## 1. Problema

O cliente novo pode ter dificuldade para entender e pagar a primeira fatura da Bulbe. A falta de clareza sobre o valor, a composição, o vencimento e as formas de pagamento pode gerar atrasos.

- **Dor escolhida:** dificuldade para compreender e pagar a primeira fatura.
- **Evidência:** a inadimplência da primeira fatura chega a 32,4%.
- **Indicador que a solução pretende mover:** pagamento da primeira fatura.

## 2. Persona e jornada

- **Persona principal documentada:** Marina Alves, 29 anos, cliente no primeiro mês da Bulbe, que precisa compreender o serviço e pagar corretamente sua primeira fatura.
- **Mapa de jornada:** [docs/jornada.md](docs/jornada.md)

## 3. Solução

A demonstração em HTML, CSS e JavaScript conecta as seis telas definidas a partir do mapa de jornada e das histórias de usuário. O fluxo principal vai do resumo da primeira fatura à confirmação simulada do pagamento; o lembrete pode ser acessado pelo sino.

| Tela | O que faz | História relacionada |
| --- | --- | --- |
| Resumo da primeira fatura | Apresenta o valor total e a situação da primeira cobrança. | [HU01 — visualizar o resumo da primeira fatura](https://github.com/lauramarcolinor/202602-projeto1-a-09/issues/12) |
| Detalhes e vencimento | Explica a composição da fatura e destaca a data de vencimento. | [HU02 — entender a composição e o vencimento](https://github.com/lauramarcolinor/202602-projeto1-a-09/issues/13) |
| Formas de pagamento | Apresenta as opções disponíveis para quitar a fatura. | [HU03 — consultar formas de pagamento](https://github.com/lauramarcolinor/202602-projeto1-a-09/issues/10) |
| Pagamento via PIX | Orienta o cliente no pagamento por PIX. | [HU04 — realizar pagamento via PIX](https://github.com/lauramarcolinor/202602-projeto1-a-09/issues/15) |
| Lembrete de vencimento | Permite acompanhar o prazo e receber um lembrete. | [HU05 — receber lembrete de vencimento](https://github.com/lauramarcolinor/202602-projeto1-a-09/issues/11) |
| Confirmação do pagamento | Informa se o pagamento foi realizado e confirmado. | [HU06 — confirmar o pagamento realizado](https://github.com/lauramarcolinor/202602-projeto1-a-09/issues/14) |

- **Histórias de usuário:** [docs/historias.md](docs/historias.md)
- **Wireframes:** [docs/wireframes/](docs/wireframes/)

As histórias de usuário e a integração do protótipo são acompanhadas pelas [issues do projeto](https://github.com/lauramarcolinor/202602-projeto1-a-09/issues) e pelo [quadro do GitHub Projects](https://github.com/users/lauramarcolinor/projects/2/views/1).

## 4. Tecnologias

- HTML, CSS e JavaScript puro (vanilla)
- Dados fictícios em JSON, lidos com `fetch` (pasta [`data/`](data/))
- Git e GitHub (Issues, Projects e Pull Requests)

## 5. Como executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/lauramarcolinor/202602-projeto1-a-09.git
   ```
2. Abra a pasta no VS Code.
3. Instale a extensão **Live Server** no VS Code.
4. Clique com o botão direito em `index.html` e escolha **Open with Live Server**.

### Testar a navegação integrada

Com o servidor local em execução, abra `pages/hu01-resumo-primeira-fatura.html` e siga o fluxo:

1. Em HU01, abra **Ver detalhes** para consultar HU02; a composição da cobrança pode ser aberta nessa tela.
2. Use **Escolher forma de pagamento** para chegar à HU03. PIX é a opção com fluxo completo nesta demonstração.
3. Em HU04, use **Simular confirmação do pagamento** para abrir HU06. O botão apenas registra uma simulação local; não realiza cobrança real.
4. Use **Voltar para minhas faturas** para retornar a HU01 e conferir o estado pago da simulação.
5. O sino abre HU05. **Confirmar recebimento** registra apenas o recebimento do lembrete; **Ver fatura** retorna a HU01.
6. Teste os controles de voltar em cada etapa e recarregue a página para conferir a persistência da sessão.

Para iniciar um servidor sem a extensão, com Python 3 instalado, execute na raiz do projeto:

```bash
python3 -m http.server 4173
```

Nesse caso, abra [HU01 no servidor local](http://127.0.0.1:4173/pages/hu01-resumo-primeira-fatura.html). Confira a fatura fictícia de ID 103 em `data/faturas.json`: valor original de R$ 386,45, desconto de R$ 42,03, total de R$ 344,42 e vencimento em 05/03/2026. Detalhes técnicos e limites da demonstração estão em [docs/sprints/integracao-navegacao.md](docs/sprints/integracao-navegacao.md).

> As páginas devem ser abertas por um servidor. Abrir o HTML diretamente por duplo clique (`file://`) impede o carregamento dos dados com `fetch`.

## 6. Estrutura do repositório

As seis telas da demonstração ficam em `pages`; estrutura, estilos e lógica compartilhados ficam em `assets`.

```text
├── index.html                         # Base de demonstração
├── pages/
│   ├── exemplo.html                   # Modelo inicial de página
│   └── hu01–hu06-*.html               # Seis telas da demonstração
├── assets/
│   ├── css/
│   │   ├── style.css                  # Página inicial de demonstração
│   │   ├── app-shell.css              # Estrutura compartilhada do aplicativo
│   │   ├── typography.css              # Hierarquia tipográfica compartilhada
│   │   └── hu01–hu06.css               # Estilos específicos de cada tela
│   ├── js/
│   │   ├── main.js                    # Lógica da página inicial
│   │   ├── api.js, navigation.js       # Leitura de dados e navegação compartilhada
│   │   ├── demo-state.js               # Dados e estado da demonstração
│   │   └── hu01–hu06.js                # Ações específicas de cada tela
│   └── img/compartilhado/             # Logos Bulbe em SVG
├── data/                              # Dados fictícios em JSON
├── docs/
│   ├── jornada.md                     # Persona e mapa de jornada
│   ├── historias.md                   # HU01 a HU06 e critérios de aceite
│   ├── wireframes/                    # Seis telas e mapa exportados
│   └── sprints/                       # Orientações e evidências das reviews
└── .github/                           # Modelos de Issue/PR e CODEOWNERS
```

### Padrão compartilhado das telas

Todas as HUs devem carregar `assets/css/app-shell.css` antes do CSS específico da tela e usar a mesma estrutura de cabeçalho, conteúdo central e navegação inferior. O padrão define cabeçalho de 72 px, rodapé de 80 px e logo de 100 × 30 px.

A logo branca para o cabeçalho azul está em `assets/img/compartilhado/logo-bulbe-branca.svg`; a versão azul, para fundos claros, está em `assets/img/compartilhado/logo-bulbe.svg`. Essas versões foram integradas pelo [PR #39](https://github.com/lauramarcolinor/202602-projeto1-a-09/pull/39). O cabeçalho compartilhado mantém a logo centralizada.

O modelo completo de HTML e as instruções de uso estão em [docs/wireframes/README.md](docs/wireframes/README.md#padrão-compartilhado-do-aplicativo).

Cada integrante implementa e testa sua tela na própria branch, abre um PR e solicita revisão. A implementação deve entrar na `main` pelo merge do PR.

## 7. Quadro do projeto

- **GitHub Projects:** [Quadro do projeto](https://github.com/users/lauramarcolinor/projects/2/views/1)

## 8. Equipe

| Integrante | GitHub | Papel principal |
| --- | --- | --- |
| Laura Marcolino | [@lauramarcolinor](https://github.com/lauramarcolinor) | Organização do projeto |
| Alice Aroeira | [@alicearoeira](https://github.com/alicearoeira) | Pesquisa e jornada do cliente |
| Bruna Sanches | [@brunassanchess](https://github.com/brunassanchess) | Design e wireframes |
| Manuella Ferreira | [@manufpinheiro](https://github.com/manufpinheiro) | Desenvolvimento das telas |
| Maria Clara | [@mariaclarag23](https://github.com/mariaclarag23) | Dados e funcionalidades |
| Julia Dumont | [@juliamelodumont](https://github.com/juliamelodumont) | Revisão e documentação |

> Os papéis indicam o foco principal de cada integrante. Todas participam das decisões, revisões, testes e demais atividades do projeto.

## 9. Entregas

| Marco | Aula | Status |
| --- | --- | --- |
| Mapa de jornada | 19 | Concluído — documentação e imagem versionadas. |
| Histórias de usuário | 20 | Concluído — seis histórias e responsáveis registrados. |
| Wireframes | 21–23 | Concluído — seis telas exportadas em `docs/wireframes/`. |
| Sprint Review I | 24 | Registro da review ainda precisa ser versionado em `docs/sprints/`. |
| Implementação | 25–28 | Em andamento — acompanhar as issues #29 a #38 e os PRs abertos. |
| Sprint Review II | 29 | Pendente. |
| Versão final | 30 | Pendente — depende da integração e validação do fluxo. |

---

> Todos os dados deste repositório são fictícios. Nenhum dado real de cliente da Bulbe Energia é utilizado.
