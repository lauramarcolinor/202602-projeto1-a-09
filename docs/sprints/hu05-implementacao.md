# HU05 — Lembrete de vencimento

Implementação na branch `feature/hu05-lembrete-vencimento`.

## Como visualizar

Abra `pages/lembrete-vencimento.html` com o Live Server. Configure **375 × 667 px** no modo de dispositivo do navegador (iPhone SE). A leitura do JSON por módulos JavaScript exige um servidor HTTP; abrir o HTML diretamente por `file://` não é o modo de execução do projeto.

## Referência e estrutura

- Referência de design: arquivo Figma `di3hkruEMkuDxAuCRNex9k`, página `79:2`, frames `79:3` e `79:69`.
- HTML, CSS e JavaScript puro. O cabeçalho, a logo e a navegação usam `assets/css/app-shell.css` e os recursos compartilhados do projeto. A aparência atual utiliza o padrão compartilhado do grupo, incluindo os tons alaranjados do aviso.
- Os estilos e as interações específicos ficam em `assets/css/lembrete-vencimento.css` e `assets/js/lembrete-vencimento.js`.
- O alerta utiliza `assets/img/hu05/alerta.svg`. Os demais SVGs de referência permanecem na pasta, mas o cabeçalho e os ícones atuais usam os elementos definidos no HTML e no CSS compartilhado.
- Fonte Poppins pelo Google Fonts, com alternativa sans-serif quando indisponível.

## Dados compartilhados

- A HU05 usa `buscarFaturas()` de `assets/js/api.js` para ler `data/faturas.json` e selecionar a fatura fictícia **103**.
- Valor, mês de referência, vencimento e status são preenchidos a partir do JSON, tanto no cartão quanto na consulta da fatura. A HU05 não modifica o JSON.
- Atualmente, a fatura 103 contém R$ 344,42, referência março de 2026 e vencimento em 05/03/2026. São dados fictícios do cenário do protótipo; não há cálculo de vencimento em tempo real.
- Se o carregamento falhar ou a fatura não existir, a tela informa o erro e oferece “Tentar novamente”. A confirmação e a consulta ficam desabilitadas até o carregamento ser concluído.

## Comportamento e navegação

- “Confirmar recebimento” mostra a confirmação verde. Quando a fatura está aberta, também aparece o alerta de pagamento pendente. A ação não registra nem simula pagamento.
- O recebimento é guardado em `sessionStorage`, com chave associada à fatura 103. Há compatibilidade com a chave antiga do cenário de março. Se o armazenamento estiver bloqueado, a confirmação funciona em memória enquanto a página permanece aberta.
- A seta “Voltar” leva à página inicial (`index.html`). Voltar não apaga a confirmação, que permanece ao reabrir o lembrete na mesma sessão quando o armazenamento está disponível.
- “Ver fatura” e “Faturas” abrem uma consulta na própria HU05 com os dados carregados do JSON, sem links para telas de outras histórias. A consulta pode ser fechada pelo botão ou Escape. Enquanto os dados não estão disponíveis, “Faturas” direciona a rolagem à região de feedback do carregamento.
- O sino da própria HU05 leva ao título do lembrete. Perfil, Consumo e Indicações estão desabilitados por estarem fora do escopo desta tela.

## Validação realizada

- Revisão visual dos dois estados em 375 × 667 px com a estrutura compartilhada. Cabeçalho e navegação permanecem visíveis; o conteúdo tem rolagem interna quando necessário. A revisão identificou aproximadamente 21 px de rolagem no estado inicial, portanto não se assume encaixe sem rolagem.
- Sem transbordamento horizontal em 320 × 568, 375 × 667, 390 × 844 e 667 × 375 na revisão da estrutura atual.
- Testes posteriores às correções confirmaram: leitura do JSON, valores da consulta, confirmação, navegação de retorno e preservação da confirmação ao reabrir o lembrete.
- Uma resposta JSON modificada apenas no teste comprovou atualização de valor, referência e vencimento, sem alterar o arquivo de dados do projeto.
- Falha de carregamento simulada: mensagem de erro e bloqueio das ações; recuperação ao clicar em “Tentar novamente”.
- JavaScript sem erros de sintaxe e sem erros de execução nos testes automatizados realizados no Edge. Os testes não substituem a revisão do grupo nem testes em um iPhone físico.

## Pendências para integração do grupo

- A navegação entre histórias será definida pelo grupo durante a integração. Esta entrega não inclui ligações diretas a telas de outras histórias.
- Manter o identificador da fatura alinhado entre as histórias. A HU05 usa 103; caso o grupo passe a selecionar clientes ou faturas dinamicamente, será necessário transmitir essa seleção entre as telas e atualizar a chave do recebimento.
- Validar o padrão visual compartilhado com o grupo. Os botões `.icon-button` medem 30 × 34 px no CSS compartilhado; a recomendação de ampliar a área de toque deve ser tratada como alteração comum às telas.
- Revisar a entrega e as alterações posteriores ao primeiro commit, atualizar a branch remota e solicitar revisão do Pull Request a uma integrante do grupo.

Envio real de notificações, confirmação em servidor e processamento de pagamento não fazem parte deste protótipo de frontend.
