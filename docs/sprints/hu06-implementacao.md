# HU06 — Confirmação do pagamento

Implementação da sexta tela da solução, a partir do wireframe aprovado
(`docs/wireframes/hu06-confirmacao-pagamento.png`) e dos requisitos da issue
[#34](https://github.com/lauramarcolinor/202602-projeto1-a-09/issues/34).

- **Responsável:** Julia Dumont
- **Branch:** `feature/hu06-confirmacao-pagamento`

## Arquivos

| Arquivo | O que é |
| --- | --- |
| `pages/hu06-confirmacao-pagamento.html` | Tela, montada sobre a estrutura compartilhada `app-shell`. |
| `assets/css/hu06.css` | Estilos do conteúdo da tela. Cabeçalho, área rolável e rodapé vêm de `app-shell.css`. |
| `assets/js/hu06.js` | Leitura da fatura, cópia do código de autenticação e navegação do rodapé. |

Nenhum arquivo compartilhado foi alterado, para não conflitar com os PRs #28, #40 e #41, que estão abertos.

## O que a tela faz

- Apresenta o estado **Pagamento confirmado** em destaque, no topo da área rolável.
- Mostra valor original, desconto Bulbe e total pago, lidos de `data/faturas.json`
  (fatura de ID 103), formatados com `Intl.NumberFormat` em `pt-BR`.
- Mostra a data do pagamento e compara com o vencimento para dizer se foi pago em dia.
- Apresenta o comprovante com titular, instalação, forma de pagamento e código de
  autenticação, com botão para copiar o código.
- Lista os próximos passos do cliente em três etapas.
- Permite voltar para a área de faturas e oferece caminho de suporte.

## Dados

Os valores da fatura vêm de `data/faturas.json`, para não duplicar dados no HTML.
A data do pagamento, o horário, o titular, a instalação e o código de autenticação
são fictícios e estão declarados no início de `assets/js/hu06.js` e no HTML. A tela
diz explicitamente que a confirmação é uma demonstração com dados fictícios.

## Como testar

1. Abrir o projeto com o Live Server.
2. Acessar `pages/hu06-confirmacao-pagamento.html`.
3. Conferir o destaque do estado de pagamento confirmado.
4. Conferir valor, desconto, total, data do pagamento e vencimento.
5. Clicar em **Copiar código** e conferir o retorno do botão.
6. Clicar em **Voltar para minhas faturas**.
7. Trocar os itens do rodapé e conferir a troca do item ativo.
8. Conferir o layout em 320, 375 e 430 px e o console do navegador.

## Pendências

- O retorno para faturas aponta para `index.html` enquanto a tela da HU01 não está
  na `main` (PR #41). Depois do merge, passa a apontar para
  `pages/hu01-resumo-primeira-fatura.html`.
- Baixar comprovante, PIX Automático e suporte por WhatsApp exibem mensagem de
  estado, sem ação real, e dependem da integração do MVP (issues #35 a #38).
- A linha da HU06 na tabela de status do `README.md` não foi alterada aqui para
  evitar conflito com o PR #41, que mexe no mesmo arquivo.
