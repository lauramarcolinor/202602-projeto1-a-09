# Bulbe Acompanha

> Projeto em Ciência de Dados I · Ibmec BH · 2º semestre de 2026
> Cliente: **Bulbe Energia** · Turma **A** · Squad **09**

Aplicação web que acompanha o cliente novo após a adesão, mostra o status da conexão e confirma os canais de contato para reduzir falhas de comunicação até a primeira fatura.

---

## 1. Problema

O cliente novo pode ficar sem sinal de acompanhamento depois da adesão e antes da primeira fatura. Essa espera gera insegurança e aumenta o risco de a Bulbe não conseguir entregar uma comunicação importante.

- **Dor escolhida:** silêncio no onboarding e falta de confirmação dos canais de contato após a adesão.
- **Evidência:** clientes chegaram a ficar até 20 dias sem nenhuma comunicação, e cerca de 20% das mensagens de WhatsApp falham.
- **Indicador que a solução pretende mover:** entregabilidade das comunicações.

## 2. Persona e jornada

- **Persona:** cliente pessoa física no primeiro mês de Bulbe; a persona detalhada está documentada em `docs/jornada.md`.
- **Mapa de jornada:** [docs/jornada.md](docs/jornada.md)

## 3. Solução

A solução apresenta ao cliente o andamento do primeiro mês, confirma os canais de contato e sinaliza os próximos passos até a chegada da primeira fatura. O escopo será detalhado a partir do mapa de jornada e das histórias de usuário.

| Tela | O que faz | História relacionada |
| --- | --- | --- |
| Acompanhamento do primeiro mês | Mostra o status da conexão, os próximos passos e os canais de contato confirmados. | Oportunidades #7–#9; histórias serão detalhadas na Aula 20. |
| Explicação da primeira fatura e pagamento | Explica o valor, o vencimento e as formas de pagamento, com destaque para PIX e lembretes. | Oportunidades #8 e #9; histórias serão detalhadas na Aula 20. |

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
| Julia | Usuário do GitHub pendente | Qualidade, GitHub e documentação |

## 9. Entregas

| Marco | Aula | Status |
| --- | --- | --- |
| Mapa de jornada | 19 | [x] |
| Histórias de usuário | 20 | [ ] |
| Wireframes | 21–23 | [ ] |
| Sprint Review I | 24 | [ ] |
| Implementação | 25–28 | [ ] |
| Sprint Review II | 29 | [ ] |
| Versão final | 30 | [ ] |

---

> Todos os dados deste repositório são fictícios. Nenhum dado real de cliente da Bulbe Energia é utilizado.
