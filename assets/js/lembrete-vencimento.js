import { buscarFaturas } from './api.js';

// Mesmo identificador utilizado na HU01. Confirmar o lembrete não altera o pagamento.
const faturaId = 103;
const chave = `bulbe:hu05:fatura-${faturaId}:recebimento`;
const app = document.querySelector('.app-shell');
const acoes = document.querySelector('#acoes');
const alerta = document.querySelector('#alerta');
const detalhes = document.querySelector('#detalhes');
const confirmar = document.querySelector('#confirmar');
const verFatura = document.querySelector('#ver-fatura');
const erro = document.querySelector('#erro-fatura');
const tentarNovamente = document.querySelector('#tentar-novamente');
let confirmado = false;
let fatura = null;

try {
  confirmado = sessionStorage.getItem(chave) === 'confirmado'
    || sessionStorage.getItem('bulbe:hu05:marco-2026:recebimento') === 'confirmado';
} catch {
  // A confirmação também funciona em memória quando o armazenamento é bloqueado.
}

function renderizar() {
  app.classList.toggle('recebido', confirmado);
  document.querySelector('#titulo-mensagem').textContent = confirmado
    ? 'Recebimento confirmado!' : 'Sua fatura vence em breve';
  document.querySelector('#texto-mensagem').textContent = confirmado
    ? 'Você confirmou que recebeu este lembrete de vencimento.'
    : 'Confira o vencimento da sua primeira fatura e organize seu pagamento.';
  acoes.hidden = confirmado;
  alerta.hidden = !confirmado || fatura?.status !== 'aberta';
}

async function carregarFatura() {
  confirmar.disabled = true;
  verFatura.disabled = true;
  erro.hidden = true;
  tentarNovamente.hidden = true;
  try {
    const faturas = await buscarFaturas();
    const encontrada = faturas.find((item) => item.id === faturaId);
    if (!encontrada) throw new Error('Fatura não encontrada.');
    const vencimento = new Date(`${encontrada.vencimento}T12:00:00`);
    const referencia = new Date(`${encontrada.referencia}-01T12:00:00`);
    if (!Number.isFinite(encontrada.valor) || Number.isNaN(vencimento.getTime())
      || Number.isNaN(referencia.getTime())) throw new Error('Dados de fatura inválidos.');
    const valor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(encontrada.valor);
    const data = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(vencimento);
    const status = { aberta: 'Em aberto', prevista: 'Pagamento previsto', paga: 'Paga', pago: 'Pago', quitada: 'Quitada' }[encontrada.status] ?? 'Status indisponível';
    document.querySelector('#referencia-fatura').textContent = `FATURA DE ${new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(referencia).toLocaleUpperCase('pt-BR')}`;
    document.querySelectorAll('[data-valor-fatura]').forEach((elemento) => { elemento.textContent = valor; });
    document.querySelectorAll('[data-status-fatura]').forEach((elemento) => { elemento.textContent = status; });
    const time = document.querySelector('[data-vencimento-fatura]');
    time.textContent = data;
    time.dateTime = encontrada.vencimento;
    document.querySelector('[data-data-detalhes]').textContent = data;
    fatura = encontrada;
    confirmar.disabled = false;
    verFatura.disabled = false;
    renderizar();
  } catch {
    document.querySelector('#referencia-fatura').textContent = 'Fatura indisponível';
    erro.textContent = 'Não foi possível carregar a fatura. Abra a página pelo Live Server e tente novamente.';
    erro.hidden = false;
    tentarNovamente.hidden = false;
  }
}

confirmar.addEventListener('click', () => {
  if (!fatura) return;
  confirmado = true;
  try { sessionStorage.setItem(chave, 'confirmado'); } catch { /* Mantém o estado em memória. */ }
  renderizar();
  verFatura.focus();
});

// Navegar não desfaz a confirmação já registrada.
document.querySelector('#voltar').addEventListener('click', () => {
  window.location.href = 'hu01-resumo-primeira-fatura.html';
});
document.querySelector('#notificacoes').addEventListener('click', () => {
  document.querySelector('h1').scrollIntoView({ block: 'nearest' });
});
verFatura.addEventListener('click', () => detalhes.showModal());
document.querySelector('#nav-faturas').addEventListener('click', () => {
  window.location.href = 'hu01-resumo-primeira-fatura.html';
});
tentarNovamente.addEventListener('click', carregarFatura);
renderizar();
carregarFatura();
