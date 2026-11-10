import { buscarFaturaDemo, preencherFatura, lerEstado } from './demo-state.js';
import { iniciarNavegacao, carregarTela, irPara, avisar, copiarTexto } from './navigation.js';
iniciarNavegacao({ voltar: 'pix' });
const estado = lerEstado();
const confirmacao = document.querySelector('.confirmacao');
const titulo = document.querySelector('#screen-title');
const recibo = document.querySelector('[aria-labelledby="comprovante-titulo"]');
const passos = document.querySelector('[aria-labelledby="passos-titulo"]');
const valor = document.querySelector('[aria-labelledby="valor-titulo"]');
const baixar = document.querySelector('[data-action="comprovante"]');
const copiar = document.querySelector('[data-action="copiar"]');
let copiaTimer;
let copiando = false;
const pagoEm = document.querySelector('#valor-pago-em');
const vencia = document.querySelector('#valor-vencia');
function pendente() {
  titulo.textContent = 'Nenhum pagamento simulado';
  confirmacao.classList.add('demo-pending');
  document.querySelector('.selo').textContent = 'Demonstração · pagamento pendente';
  document.querySelector('.confirmacao__icone').hidden = true;
  recibo.hidden = passos.hidden = valor.hidden = baixar.hidden = true;
  avisar('Inicie pelo resumo da fatura e simule o pagamento via PIX.');
}
pendente();
document.querySelector('[data-action="faturas"]').addEventListener('click', () => irPara('resumo'));
copiar.addEventListener('click', async () => {
  if (copiando) return;
  copiando = true;
  clearTimeout(copiaTimer);
  copiar.textContent = 'Copiando…';
  try {
    await copiarTexto(document.querySelector('#codigo-autenticacao').textContent.trim());
    copiar.textContent = 'Código copiado!';
    avisar('Código fictício copiado.');
  } catch {
    copiar.textContent = 'Não foi possível copiar';
    avisar('Não foi possível copiar. Selecione o código manualmente.');
  } finally {
    copiando = false;
    copiaTimer = setTimeout(() => { copiar.textContent = 'Copiar código'; }, 3500);
  }
});
baixar.addEventListener('click', () => {
  const linhas = [
    'BULBE ENERGIA — COMPROVANTE DEMONSTRATIVO',
    '',
    'Titular: ' + document.querySelector('[data-field="titular"]').textContent.trim(),
    'Instalação: ' + document.querySelector('[data-field="instalacao"]').textContent.trim(),
    'Referência: ' + document.querySelector('[data-field="referencia"]').textContent.trim(),
    'Forma de pagamento: PIX',
    'Valor pago: ' + document.querySelector('[data-field="total"]').textContent.trim(),
    document.querySelector('#valor-pago-em').textContent.trim(),
    'Código de autenticação: ' + document.querySelector('#codigo-autenticacao').textContent.trim(),
    '',
    'Comprovante de demonstração com dados fictícios. Não representa uma transação bancária real.'
  ];
  const arquivo = new Blob(['\uFEFF' + linhas.join('\n')], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(arquivo);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'comprovante-bulbe-demonstracao.txt';
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  avisar('Comprovante demonstrativo baixado.');
});

for (const action of ['pix-automatico', 'suporte']) {
  document.querySelector('[data-action="' + action + '"]').addEventListener('click', () => avisar('Recurso demonstrativo, ainda sem ação real nesta entrega.'));
}
await carregarTela(async () => {
  const fatura = await buscarFaturaDemo();
  preencherFatura(fatura);
  if (fatura.status !== 'paga' || !estado.pagamento) return;
  document.querySelector('#app-feedback').textContent = '';
  titulo.textContent = 'Pagamento simulado confirmado';
  confirmacao.classList.remove('demo-pending');
  document.querySelector('.confirmacao__icone').hidden = false;
  document.querySelector('.selo').textContent = 'Pago · simulação fictícia';
  recibo.hidden = passos.hidden = valor.hidden = baixar.hidden = false;
  const quando = new Date(estado.pagamento.em);
  const data = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo' }).format(quando);
  const hora = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' }).format(quando);
  pagoEm.textContent = 'Simulado em ' + data + ' às ' + hora + ' via PIX';
  vencia.textContent = 'Vencimento: ' + new Intl.DateTimeFormat('pt-BR').format(new Date(fatura.vencimento + 'T12:00:00'));
});
