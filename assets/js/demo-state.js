import { buscarFaturas } from './api.js?v=fluxo-1';

export const FATURA_ID = 103;
const KEY = `bulbe:demo:fatura-${FATURA_ID}:v1`;
const METHODS = ['automatico', 'pix', 'credito', 'debito', 'boleto'];

export function lerEstado() {
  try {
    const value = JSON.parse(sessionStorage.getItem(KEY) || '{}');
    return {
      forma: METHODS.includes(value?.forma) ? value.forma : null,
      lembreteRecebido: value?.lembreteRecebido === true,
      pagamento: value?.pagamento?.ficticio === true
        && value.pagamento.forma === 'pix'
        && Number.isFinite(value.pagamento.valor)
        && !Number.isNaN(Date.parse(value.pagamento.em)) ? value.pagamento : null
    };
  } catch { return { forma: null, lembreteRecebido: false, pagamento: null }; }
}

export function salvarEstado(changes) {
  const estado = { ...lerEstado(), ...changes };
  // Não seguimos para outra página se a sessão não puder ser salva.
  sessionStorage.setItem(KEY, JSON.stringify(estado));
  return estado;
}

export async function buscarFaturaDemo() {
  const fatura = (await buscarFaturas()).find(item => item.id === FATURA_ID);
  if (!fatura || !Number.isFinite(fatura.valor) || !Number.isFinite(fatura.economia)
    || !/^\d{4}-\d{2}-\d{2}$/.test(fatura.vencimento)
    || !fatura.composicao || !fatura.demonstracao || !fatura.pixCopiaECola
    || Number.isNaN(Date.parse(fatura.demonstracao.pagamentoEm))) {
    throw new Error('Dados da primeira fatura indisponíveis.');
  }
  const { energia, iluminacaoPublica, pisCofins } = fatura.composicao;
  if (![energia, iluminacaoPublica, pisCofins].every(Number.isFinite)
    || Math.abs(energia + iluminacaoPublica + pisCofins - fatura.economia - fatura.valor) > 0.01) {
    throw new Error('Composição da fatura inconsistente.');
  }
  const pagamento = lerEstado().pagamento;
  return { ...fatura, status: pagamento?.valor === fatura.valor ? 'paga' : fatura.status };
}

export function simularPagamento(fatura) {
  const estado = lerEstado();
  if (estado.forma !== 'pix') throw new Error('Selecione PIX antes de simular o pagamento.');
  if (estado.pagamento?.valor === fatura.valor) return estado;
  return salvarEstado({ pagamento: {
    ficticio: true, forma: 'pix', valor: fatura.valor,
    em: fatura.demonstracao.pagamentoEm, registradoEm: new Date().toISOString()
  } });
}

export const moeda = valor => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
export const dataCurta = valor => new Intl.DateTimeFormat('pt-BR').format(new Date(`${valor}T12:00:00`));
export const dataLonga = valor => new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(`${valor}T12:00:00`));

export function preencherFatura(fatura) {
  const taxas = fatura.composicao.iluminacaoPublica + fatura.composicao.pisCofins;
  const referencia = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(new Date(`${fatura.referencia}-01T12:00:00`));
  const campos = {
    original: `De ${moeda(fatura.valorOriginal ?? fatura.valor + fatura.economia)}`,
    originalNumero: moeda(fatura.valorOriginal ?? fatura.valor + fatura.economia),
    totalPor: `Por ${moeda(fatura.valor)}`,
    desconto: moeda(fatura.economia), total: moeda(fatura.valor),
    vencimento: dataCurta(fatura.vencimento), vencimentoLongo: dataLonga(fatura.vencimento),
    diaSemana: new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(new Date(`${fatura.vencimento}T12:00:00`)),
    referencia: `Primeira fatura · ${referencia}`,
    status: fatura.status === 'paga' ? 'Paga · simulação' : 'Em aberto · pagamento pendente',
    energia: moeda(fatura.composicao.energia), iluminacao: moeda(fatura.composicao.iluminacaoPublica),
    tributos: moeda(fatura.composicao.pisCofins), taxas: moeda(taxas),
    taxasSoma: `+ ${moeda(taxas)}`, descontoMenos: `− ${moeda(fatura.economia)}`,
    economia: `Você economiza ${moeda(fatura.economia)} nesta fatura.`,
    descontoTexto: `Desconto Bulbe: ${moeda(fatura.economia)}`,
    vencimentoResumo: `Vencimento: ${dataCurta(fatura.vencimento)}`,
    validadePix: `Código fictício válido até ${dataCurta(fatura.vencimento)}, às 23:59`,
    conferirPix: `O valor deve ser ${moeda(fatura.valor)} e o favorecido, Bulbe (dados ilustrativos).`,
    pix: fatura.pixCopiaECola, titular: fatura.demonstracao.titular,
    instalacao: fatura.demonstracao.instalacao, autenticacao: fatura.demonstracao.autenticacao,
    proximaReferencia: `Próxima fatura: ${fatura.demonstracao.proximaReferencia}`,
    proximoVencimento: `Vence em ${dataCurta(fatura.demonstracao.proximoVencimento)}. Avisamos você 5 dias antes.`
  };
  document.querySelectorAll('[data-field]').forEach(elemento => {
    const valor = campos[elemento.dataset.field];
    if (valor !== undefined) elemento.textContent = valor;
    if (elemento.dataset.field === 'status') elemento.classList.toggle('is-paid', fatura.status === 'paga');
  });
}
