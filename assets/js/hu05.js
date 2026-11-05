import { buscarFaturaDemo, preencherFatura, lerEstado, salvarEstado } from './demo-state.js';
import { iniciarNavegacao, carregarTela, irPara, avisar } from './navigation.js';
iniciarNavegacao();
let fatura;
const confirmar = document.querySelector('#confirmar');
const ver = document.querySelector('#ver-fatura');
const erro = document.querySelector('#erro-fatura');
const tentar = document.querySelector('#tentar-novamente');
function renderizar() {
  const recebido = lerEstado().lembreteRecebido;
  document.querySelector('.app-shell').classList.toggle('recebido', recebido);
  document.querySelector('#titulo-mensagem').textContent = fatura?.status === 'paga' ? 'Fatura paga na simulação' : recebido ? 'Recebimento confirmado!' : 'Sua fatura vence em breve';
  document.querySelector('#texto-mensagem').textContent = recebido ? 'Você confirmou que recebeu este lembrete. Isso não confirma pagamento.' : 'Confira o vencimento da sua primeira fatura e organize seu pagamento.';
  document.querySelector('#acoes').hidden = recebido || fatura?.status === 'paga';
  document.querySelector('#alerta').hidden = !recebido || fatura?.status !== 'aberta';
}
async function carregar() {
  confirmar.disabled = ver.disabled = true;
  erro.hidden = tentar.hidden = true;
  const ok = await carregarTela(async () => {
    fatura = await buscarFaturaDemo();
    preencherFatura(fatura);
    confirmar.disabled = ver.disabled = false;
    renderizar();
  });
  if (!ok) { erro.textContent = 'Não foi possível carregar a fatura.'; erro.hidden = tentar.hidden = false; }
}
confirmar.addEventListener('click', () => {
  if (!fatura) return;
  try {
    salvarEstado({ lembreteRecebido: true });
    renderizar();
    // Exibe a confirmação antes de convidar a pessoa a abrir a fatura.
    const titulo = document.querySelector('#titulo-mensagem');
    titulo.tabIndex = -1;
    titulo.focus({ preventScroll: true });
    document.querySelector('.screen-content').scrollTo({ top: 0, behavior: 'instant' });
  }
  catch { avisar('Permita o armazenamento da sessão para confirmar o recebimento.'); }
});
ver.addEventListener('click', () => irPara('resumo'));
tentar.addEventListener('click', carregar);
await carregar();
