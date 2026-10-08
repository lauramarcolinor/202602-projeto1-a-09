# Bulbe Acompanha

> Projeto em Ciência de Dados I · Ibmec BH · 2º semestre de 2026
> Cliente: **Bulbe Energia** · Turma **A** · Squad **09**

Aplicação web que ajuda o cliente novo a entender e pagar a primeira fatura da Bulbe, mostrando o valor, a composição, o vencimento, as formas de pagamento e a confirmação da transação.

---

## 1. Problema

O cliente novo pode ter dificuldade para entender e pagar a primeira fatura da Bulbe. A falta de clareza sobre o valor, a composição, o vencimento e as formas de pagamento pode gerar atrasos.

- **Dor escolhida:** dificuldade para compreender e pagar a primeira fatura.
- **Evidência:** a inadimplência da primeira fatura chega a 32,4%.
- **Indicador que a solução pretende mover:** pagamento da primeira fatura.

## 2. Persona e jornada

- **Persona:** cliente pessoa física no primeiro mês da Bulbe, que precisa entender e pagar corretamente sua primeira fatura; a persona detalhada está documentada em `docs/jornada.md`.
- **Mapa de jornada:** [docs/jornada.md](docs/jornada.md)

## 3. Solução

A solução ajuda o cliente novo a entender a primeira fatura, visualizar seu valor e vencimento, conhecer as formas de pagamento, utilizar o PIX e receber lembretes antes do vencimento. O escopo será detalhado a partir do mapa de jornada e das histórias de usuário.

| Tela | O que faz | História relacionada |
| --- | --- | --- |
| Resumo da primeira fatura | Apresenta o valor total e a situação da primeira cobrança. | [HU01 — visualizar o resumo da primeira fatura](issues/12) |
| Detalhes e vencimento | Explica a composição da fatura e destaca a data de vencimento. | [HU02 — entender a composição e o vencimento](issues/13) |
| Formas de pagamento | Apresenta as opções disponíveis para quitar a fatura. | [HU03 — consultar formas de pagamento](issues/10) |
| Pagamento via PIX | Orienta o cliente no pagamento por PIX. | [HU04 — realizar pagamento via PIX](issues/15) |
| Lembrete de vencimento | Permite acompanhar o prazo e receber um lembrete. | [HU05 — receber lembrete de vencimento](issues/11) |
| Confirmação do pagamento | Informa se o pagamento foi realizado e confirmado. | [HU06 — confirmar o pagamento realizado](issues/14) |

- **Histórias de usuário:** [docs/historias.md](docs/historias.md)
- **Wireframes:** [docs/wireframes/](docs/wireframes/)

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
3. Instale a extensão **Live Server** (o VS Code vai sugerir automaticamente).
4. Clique com o botão direito em `index.html` e escolha **Open with Live Server**.

> Abrir o `index.html` direto no navegador (duplo clique) não funciona: o `fetch` dos arquivos JSON exige um servidor.

## 6. Estrutura do repositório

```
├── index.html            # Página inicial
├── pages/                # Demais telas da solução
├── assets/
│   ├── css/style.css     # Estilos
│   ├── js/main.js        # Lógica da página inicial
│   ├── js/api.js         # Leitura dos dados (fetch)
│   └── img/              # Imagens e ícones
├── data/                 # Dados fictícios em JSON
├── docs/                 # Jornada, histórias, wireframes e sprints
└── .github/              # Modelos de Issue e de Pull Request
```

## 7. Quadro do projeto

- **GitHub Projects:** [Quadro do projeto](https://github.com/users/lauramarcolinor/projects/2/views/1)

## 8. Equipe

| Integrante | GitHub | Papel principal |
| --- | --- | --- |
| Laura Marcolino | [@lauramarcolinor](https://github.com/lauramarcolinor) | Coordenação do produto e evidências |
| Alice Aroeira | [@alicearoeira](https://github.com/alicearoeira) | Pesquisa, persona e jornada |
| Bruna Sanches | [@brunassanchess](https://github.com/brunassanchess) | UX/UI e wireframes |
| Manuella Ferreira | [@manufpinheiro](https://github.com/manufpinheiro) | Frontend: HTML e CSS |
| Maria Clara | [@mariaclarag23](https://github.com/mariaclarag23) | JavaScript, dados e integração |
| Julia Dumont | [@juliamelodumont](https://github.com/juliamelodumont) | Qualidade, GitHub e documentação |

## 9. Entregas

| Marco | Aula | Status |
| --- | --- | --- |
| Mapa de jornada | 19 | [x] |
| Histórias de usuário | 20 | [x] |
| Wireframes | 21–23 | [ ] |
| Sprint Review I | 24 | [ ] |
| Implementação | 25–28 | [ ] |
| Sprint Review II | 29 | [ ] |
| Versão final | 30 | [ ] |

---

> Todos os dados deste repositório são fictícios. Nenhum dado real de cliente da Bulbe Energia é utilizado.
