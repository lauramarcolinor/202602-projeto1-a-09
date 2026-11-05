import { buscarFaturaDemo, preencherFatura } from './demo-state.js';
import { iniciarNavegacao, carregarTela, irPara } from './navigation.js?v=voltar-1';
iniciarNavegacao();
let paga = false;
document.querySelector('[data-action="payment"]').addEventListener('click', () => irPara(paga ? 'confirmacao' : 'formas'));
document.querySelector('[data-action="details"]').addEventListener('click', () => irPara('detalhes'));
await carregarTela(async () => {
  const fatura = await buscarFaturaDemo();
  preencherFatura(fatura);
  paga = fatura.status === 'paga';
  document.querySelector('.total-label').textContent = paga ? 'Total pago na simulação' : 'Total a pagar';
  document.querySelector('[data-action="payment"]').disabled = false;
  document.querySelector('[data-action="payment"]').textContent = fatura.status === 'paga' ? 'Ver confirmação da simulação' : 'Escolher forma de pagamento';
});
