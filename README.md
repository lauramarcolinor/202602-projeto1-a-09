# Bulbe Acompanha

> Projeto em Ciência de Dados I · Ibmec BH · 2º semestre de 2026<br>
> Bulbe Energia · Turma A · Squad 09

Protótipo web mobile-first para ajudar uma pessoa que acabou de se tornar cliente da Bulbe a entender a primeira fatura e percorrer, de forma demonstrativa, as etapas de escolha do pagamento até a confirmação simulada.

> **Importante:** este projeto acadêmico usa dados fictícios. Não realiza cobranças, pagamentos, envio de e-mails ou mensagens, nem contato real com suporte.

## Demonstração

A página inicial (`index.html`) redireciona para o resumo da primeira fatura. Para testar o fluxo, inicie a aplicação por um servidor local conforme as instruções abaixo; abrir os arquivos diretamente com `file://` não permite carregar os dados JSON com `fetch`.

## Problema e objetivo

A primeira fatura pode ser difícil de entender: o cliente precisa identificar o total, o desconto, a composição, o vencimento e como pagar. A proposta organiza essas informações em uma jornada curta, explica o valor da cobrança e deixa claro quando uma ação é apenas uma simulação.

- **Dor priorizada:** dificuldade para compreender e pagar a primeira fatura.
- **Evidência registrada no projeto:** indicador de inadimplência da primeira fatura de 32,4%, atribuído à apresentação *Bulbe & Ibmec*, set. 2026, slide 4 (período indicado: set. 2025 a jul. 2026).
- **Objetivo do protótipo:** facilitar a compreensão da cobrança e demonstrar o caminho de pagamento; o protótipo não mede impacto real sobre inadimplência.

## Personas e artefatos do projeto

- **Persona principal — Marina Alves, 29 anos:** cliente no primeiro mês da Bulbe; precisa entender a jornada após a adesão e como pagar corretamente a primeira fatura.
- **Persona complementar — Renata Oliveira, 42 anos:** precisa entender a composição da fatura, o desconto e a lógica financeira do valor cobrado.

As duas personas são fictícias. Marina orienta o fluxo principal do protótipo; Renata complementa a análise com foco na explicação dos valores. Os dados exibidos nas telas também são fictícios.
- [Mapa de jornada](docs/jornada.md)
- [Histórias de usuário e critérios de aceite](docs/historias.md)
- [Wireframes das seis telas](docs/wireframes/)
- [Documentação da integração do fluxo](docs/sprints/integracao-navegacao.md)
- [Documentação das telas HU05 e HU06](docs/sprints/)
- [Issues do repositório](https://github.com/lauramarcolinor/202602-projeto1-a-09/issues) · [Quadro do projeto](https://github.com/users/lauramarcolinor/projects/2/views/1)

## Telas e fluxo

| Etapa | Tela | O que a pessoa pode fazer |
| --- | --- | --- |
| HU01 | [Resumo da primeira fatura](pages/hu01-resumo-primeira-fatura.html) | Conferir total, desconto, vencimento e situação; avançar para detalhes ou formas de pagamento. |
| HU02 | [Composição e vencimento](pages/hu02-composicao-vencimento.html) | Entender os componentes usados no cálculo e consultar o vencimento. |
| HU03 | [Formas de pagamento](pages/hu03-formas-pagamento.html) | Ver opções e selecionar uma forma; nesta entrega, somente PIX segue para a próxima etapa. |
| HU04 | [Pagamento via PIX](pages/hu04-pagamento-pix.html) | Ver um QR ilustrativo e copiar um código PIX fictício; opcionalmente, iniciar a simulação. |
| HU05 | [Lembrete de vencimento](pages/hu05-lembrete-vencimento.html) | Consultar a fatura e confirmar o recebimento do lembrete, sem alterar o estado do pagamento. |
| HU06 | [Confirmação do pagamento](pages/hu06-confirmacao-pagamento.html) | Consultar a confirmação fictícia após a simulação e baixar um comprovante demonstrativo. |

Fluxo principal: **HU01 → HU02 (opcional) → HU03 → HU04 → HU06**. O lembrete **HU05** é acessado pelo sino e pode ser visitado sem interromper o fluxo de pagamento. Depois de confirmar o recebimento do lembrete, a pessoa permanece na tela e pode escolher **Ver fatura** para voltar à HU01.

O botão Voltar tem destinos definidos para as etapas. A navegação inferior apenas muda o destaque da aba; não abre outras telas. A composição detalhada da fatura é expandida dentro da HU02.

## Dados e limites da simulação

- As páginas carregam `data/faturas.json` e `data/clientes.json` por `fetch`; a integração não usa backend nem API de pagamentos.
- O cenário principal usa a fatura fictícia de ID `103`: valor original **R$ 386,45**, desconto **R$ 42,03**, total **R$ 344,42** e vencimento **05/03/2026**.
- A composição do JSON é validada antes da exibição. Se os dados não carregarem ou forem inconsistentes, as ações que dependem deles ficam bloqueadas, sem inventar valores de reserva.
- `sessionStorage` guarda, apenas na sessão da aba, a forma escolhida, o recebimento do lembrete e a simulação. A simulação PIX atualiza o estado exibido nas telas; não altera o JSON nem contata banco.
- Apenas PIX tem caminho demonstrativo até a confirmação. Boleto, cartões e PIX Automático não iniciam um pagamento real nem têm o fluxo completo implementado.
- O QR Code é ilustrativo e não escaneável. Copiar o código não paga a fatura.
- O comprovante baixado é um arquivo demonstrativo local. Ativação de PIX Automático, perfil, suporte e envio de notificações não realizam ações externas.

## Tecnologias

- HTML5, CSS3 e JavaScript nativo (módulos ES), sem framework.
- JSON local carregado com `fetch`.
- `sessionStorage` para estado temporário da demonstração.
- Node.js `node:test` para testes automatizados da lógica de estado, navegação e cópia.
- GitHub para versionamento, issues, pull requests e quadro do projeto.

## Como executar

### Opção 1 — VS Code e Live Server

1. Clone o repositório e abra a pasta no VS Code:

   ```bash
   git clone https://github.com/lauramarcolinor/202602-projeto1-a-09.git
   cd 202602-projeto1-a-09
   ```

2. Instale/ative a extensão **Live Server**.
3. Abra `index.html` e escolha **Open with Live Server**.
4. A página inicial deve encaminhar para HU01. Se necessário, abra `pages/hu01-resumo-primeira-fatura.html` pelo mesmo servidor.

### Opção 2 — servidor HTTP com Python

Com Python 3 instalado, execute na raiz do projeto:

```bash
python3 -m http.server 4173
```

Então acesse [HU01 no servidor local](http://127.0.0.1:4173/pages/hu01-resumo-primeira-fatura.html). Para encerrar o servidor, use `Ctrl+C` no terminal.

## Roteiro de teste manual

1. Em HU01, confira total, desconto, vencimento e status **Em aberto**.
2. Abra **Ver detalhes da fatura** e confira a composição na HU02; use **Escolher forma de pagamento**.
3. Em HU03, selecione PIX e continue. Selecione outra opção para conferir o aviso de que ela não tem próxima etapa implementada.
4. Em HU04, confirme que o QR é identificado como fictício, copie o código e confira o retorno visual. Copiar não deve marcar a fatura como paga.
5. Acione **Simular confirmação do pagamento**. Em HU06, confira o selo de simulação, o valor e os dados fictícios; teste copiar o código de autenticação e baixar o comprovante demonstrativo.
6. Volte para minhas faturas e confira que HU01 mostra **Paga · simulação** na mesma sessão.
7. Use o sino para abrir HU05. Confirme o recebimento e verifique que a confirmação aparece sem rolar automaticamente para outra parte e sem marcar a fatura como paga. **Ver fatura** deve retornar a HU01.
8. Teste Voltar, a navegação inferior, o layout em largura de 320 px e o console do navegador.

## Testes automatizados

Requer Node.js. Na raiz do projeto, execute:

```bash
node --test --test-isolation=none tests/demo-state.test.mjs
```

Os testes cobrem consistência dos dados, separação entre lembrete e pagamento, exigência de seleção PIX para simular, persistência/idempotência do estado, falhas de armazenamento e rede, resolução de rotas e cópia de texto. Na última verificação registrada neste README, **11 testes passaram**. Os testes automatizados não substituem a conferência visual e manual nos navegadores.

## Estrutura do repositório

```text
├── index.html
├── pages/                         # HU01–HU06 e exemplo inicial
├── assets/
│   ├── css/                       # Estilos compartilhados e por tela
│   ├── js/                        # Navegação, dados/estado e lógica por tela
│   └── img/                       # Logos e imagens ilustrativas
├── data/                          # Clientes e faturas fictícias em JSON
├── tests/                         # Testes automatizados Node.js
├── docs/
│   ├── jornada.md
│   ├── historias.md
│   ├── wireframes/                # Wireframes e instruções do padrão visual
│   └── sprints/                   # Notas de implementação e integração
└── .github/                       # Modelos de issue/PR e CODEOWNERS
```

O cabeçalho, a navegação inferior e as regras tipográficas compartilhadas estão em `assets/css/app-shell.css` e `assets/css/typography.css`. Cada tela tem seu CSS e JavaScript próprios (`hu01` a `hu06`), enquanto `assets/js/navigation.js` e `assets/js/demo-state.js` centralizam navegação e estado compartilhados.

## Equipe

Cada integrante teve uma história/tela como foco principal. A atribuição indica responsabilidade principal, não autoria exclusiva; decisões de fluxo, revisões, testes e integração são colaborativos.

| Integrante | GitHub | Foco principal |
| --- | --- | --- |
| Laura Marcolino | [@lauramarcolinor](https://github.com/lauramarcolinor) | HU01 — resumo da primeira fatura; integração da navegação e validação conjunta. |
| Alice Aroeira | [@alicearoeira](https://github.com/alicearoeira) | HU02 — composição da fatura e vencimento. |
| Bruna Sanches | [@brunassanchess](https://github.com/brunassanchess) | HU03 — escolha da forma de pagamento. |
| Manuella Ferreira | [@manufpinheiro](https://github.com/manufpinheiro) | HU04 — pagamento via PIX. |
| Maria Clara | [@mariaclarag23](https://github.com/mariaclarag23) | HU05 — lembrete de vencimento. |
| Julia Dumont | [@juliamelodumont](https://github.com/juliamelodumont) | HU06 — confirmação do pagamento. |

## Estado das entregas

- **Mapa de jornada, histórias e wireframes:** documentados em `docs/`.
- **Implementação:** seis telas e fluxo demonstrativo integrados na `main` (PR #45).
- **Testes automatizados:** 11 testes existentes passaram na última execução descrita acima.
- **Critérios de aceite:** registrados em `docs/historias.md`; as caixas representam requisitos e não foram marcadas como validação final apenas porque issues foram encerradas.
- **Sprint Reviews:** os arquivos de registro das reviews ainda não estão presentes em `docs/sprints/`; não são declarados como entregues neste README.

Consulte o [quadro do GitHub Projects](https://github.com/users/lauramarcolinor/projects/2/views/1) para o acompanhamento das tarefas. O estado do quadro e o fechamento de uma issue, isoladamente, não substituem evidências de teste ou validação dos critérios.

---

Todos os dados do protótipo são fictícios. Nenhum pagamento, cobrança, envio de notificação ou atendimento real é realizado.
