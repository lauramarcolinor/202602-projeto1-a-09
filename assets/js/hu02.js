import { buscarFaturaDemo, preencherFatura } from './demo-state.js';
import { iniciarNavegacao, carregarTela, irPara } from './navigation.js?v=voltar-1';
const detalhes = document.querySelector('#tela-detalhes');
const composicao = document.querySelector('#tela-composicao');
function mostrar(tela) {
  detalhes.classList.toggle('ativa', tela === detalhes);
  composicao.classList.toggle('ativa', tela === composicao);
  document.querySelector('main').scrollTo({ top: 0 });
  const titulo = tela.querySelector('h1');
  titulo.tabIndex = -1;
  titulo.focus({ preventScroll: true });
}
iniciarNavegacao({ antesDeVoltar() {
  if (!composicao.classList.contains('ativa')) return false;
  mostrar(detalhes);
  return true;
} });
document.querySelector('#btn-ver-composicao').addEventListener('click', () => mostrar(composicao));
document.querySelector('#btn-voltar-detalhes').addEventListener('click', () => mostrar(detalhes));
let paga = false;
document.querySelectorAll('.btn-primario').forEach(botao => botao.addEventListener('click', () => irPara(paga ? 'confirmacao' : 'formas')));
await carregarTela(async () => {
  const fatura = await buscarFaturaDemo();
  preencherFatura(fatura);
  paga = fatura.status === 'paga';
  document.querySelectorAll('.btn-primario').forEach(botao => {
    botao.disabled = false;
    if (paga) botao.textContent = 'Ver confirmação da simulação';
  });
});
