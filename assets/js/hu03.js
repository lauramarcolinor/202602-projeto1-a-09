import { buscarFaturaDemo, lerEstado, salvarEstado } from './demo-state.js';
import { iniciarNavegacao, carregarTela, irPara, avisar } from './navigation.js';
iniciarNavegacao();
const opcoes = [...document.querySelectorAll('input[name="pagamento"]')];
const continuar = document.querySelector('button[type="submit"]');
let carregou = false;
function atualizar() {
  opcoes.forEach(opcao => {
    opcao.closest('.opcao').querySelector('.texto-selecao').textContent = opcao.checked ? 'Selecionado' : 'Selecionar';
  });
  continuar.disabled = !carregou || !opcoes.some(opcao => opcao.checked);
}
const forma = lerEstado().forma;
opcoes.forEach(opcao => {
  opcao.checked = opcao.value === forma;
  opcao.addEventListener('change', () => {
    try { salvarEstado({ forma: opcao.value }); }
    catch { avisar('Não foi possível salvar a escolha nesta sessão.'); }
    atualizar();
  });
});
atualizar();
document.querySelector('#formulario').addEventListener('submit', event => {
  event.preventDefault();
  const escolhida = opcoes.find(opcao => opcao.checked);
  if (!carregou || !escolhida) return;
  try { salvarEstado({ forma: escolhida.value }); }
  catch { avisar('Permita o armazenamento da sessão para continuar.'); return; }
  if (escolhida.value !== 'pix') {
    avisar('Nesta demonstração, apenas PIX tem uma próxima etapa implementada. Selecione PIX para continuar.');
    return;
  }
  irPara('pix');
});
await carregarTela(async () => {
  const fatura = await buscarFaturaDemo();
  if (fatura.status === 'paga') { irPara('confirmacao'); return; }
  carregou = true; atualizar();
});
