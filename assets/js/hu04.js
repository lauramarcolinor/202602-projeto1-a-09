import { buscarFaturaDemo, preencherFatura, lerEstado, salvarEstado, simularPagamento } from './demo-state.js';
import { iniciarNavegacao, carregarTela, irPara, avisar, copiarTexto } from './navigation.js';
iniciarNavegacao({ voltar: 'formas' });
// QR apenas ilustrativo: nunca representa uma cobrança real.
let seed = 20261020, path = '';
const n = 29, cantos = [[0, 0], [22, 0], [0, 22]];
for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
  let escuro = false, finder = false;
  for (const [cx, cy] of cantos) {
    const dx = x - cx, dy = y - cy;
    if (dx >= -1 && dx <= 7 && dy >= -1 && dy <= 7) {
      finder = true;
      escuro = dx >= 0 && dy >= 0 && dx <= 6 && dy <= 6 && (dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4));
    }
  }
  if (!finder) { seed = (seed * 1664525 + 1013904223) % 4294967296; escuro = seed / 4294967296 > .52; }
  if (escuro) path += 'M' + x + ' ' + y + 'h1v1h-1z';
}
document.querySelector('#qr').setAttribute('d', path);
let fatura;
const simular = document.querySelector('#verificar');
const copiar = document.querySelector('#copiar');
simular.disabled = copiar.disabled = true;
copiar.addEventListener('click', async () => {
  if (!fatura) return;
  try { await copiarTexto(fatura.pixCopiaECola); avisar('Código fictício copiado. Nenhum pagamento foi realizado.'); }
  catch { avisar('Não foi possível copiar. Selecione o código fictício manualmente.'); }
});
simular.addEventListener('click', () => {
  if (!fatura || simular.disabled) return;
  try {
    if (fatura.status !== 'paga') simularPagamento(fatura);
    simular.disabled = true;
    irPara('confirmacao');
  } catch (erro) { avisar(erro.message); }
});
document.querySelector('[data-action="support"]')?.addEventListener('click', () => avisar('Suporte demonstrativo; nenhuma mensagem foi enviada.'));
await carregarTela(async () => {
  fatura = await buscarFaturaDemo();
  preencherFatura(fatura);
  if (fatura.status !== 'paga' && lerEstado().forma !== 'pix') {
    avisar('Escolha PIX na tela de formas de pagamento para iniciar a simulação.');
    return;
  }
  simular.disabled = false;
  copiar.disabled = fatura.status === 'paga';
  if (fatura.status === 'paga') simular.textContent = 'Ver confirmação da simulação';
});
