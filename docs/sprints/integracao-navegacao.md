# Navegação integrada — HU01 a HU06

## Estrutura

- Mantidos os seis HTMLs em `pages`, sem framework.
- `assets/js/navigation.js`: rotas, Voltar, sino, perfil, feedback e seleção do rodapé.
- `assets/js/demo-state.js`: fatura ID 103 via `api.js`, validação do cálculo, renderização e estado da sessão.
- `data/faturas.json`: valores, composição, código PIX e dados fictícios do comprovante. Nenhum pagamento real.
- Cabeçalho de 72 px e rodapé de 80 px; largura máxima de 320 px. Voltar e sino têm alvos de 44 × 44 px, sem aumentar os ícones de 22 px.

## Fluxo

1. Página inicial → **Abrir demonstração** → HU01.
2. HU01 → **Ver detalhes** → HU02; a composição abre dentro da HU02.
3. HU01/HU02 → **Escolher forma de pagamento** → HU03.
4. Selecionar PIX → **Continuar** → HU04.
5. **Simular confirmação do pagamento** → HU06. Copiar o código não paga a fatura.
6. **Voltar para minhas faturas** → HU01, agora com estado **Paga · simulação**.
7. Sino de qualquer tela → HU05; **Confirmar recebimento** só registra o lembrete; **Ver fatura** → HU01.

Voltar usa destinos explícitos: HU04 → HU03; HU06 → HU04; outras telas → HU01. Na composição da HU02, Voltar primeiro retorna aos detalhes. O rodapé apenas alterna o destaque: não navega nem abre avisos.

## Estado e limites

- `sessionStorage`, chave `bulbe:demo:fatura-103:v1`, guarda forma escolhida, recebimento do lembrete e pagamento fictício.
- O estado permanece ao recarregar ou navegar na mesma aba. Uma sessão nova começa sem pagamento; o JSON não é alterado.
- Data fictícia de pagamento vem do cenário em `demonstracao.pagamentoEm`; `registradoEm` registra quando a simulação foi acionada.
- A HU06 não exibe comprovante nem pagamento confirmado sem simulação correspondente à fatura.
- Boleto, cartões e PIX Automático permanecem selecionáveis, mas avisam que somente PIX tem fluxo implementado. Não simulam pagamento PIX silenciosamente.
- Download do comprovante, ativação automática e suporte permanecem demonstrativos.
- Se a rede falhar, os controles dependentes dos dados ficam bloqueados, sem valores de reserva. A HU05 oferece nova tentativa; nas demais, recarregue.
- Se o armazenamento da sessão for bloqueado, o usuário recebe aviso e não avança com confirmação falsa.

## Verificação

Execute `node --test --test-isolation=none tests/demo-state.test.mjs`.

Pelo Live Server, teste o fluxo completo acima, recarregue após escolher PIX, após receber o lembrete e após simular o pagamento. Confira que valor, desconto, vencimento e composição vêm da mesma fatura. Abra a HU06 numa sessão nova: deve indicar ausência de pagamento simulado.

Esta integração não é um serviço de pagamentos e não deve receber dados reais.
