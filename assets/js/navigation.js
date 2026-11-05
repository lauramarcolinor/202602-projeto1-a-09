export const rotas = {
  resumo: 'hu01-resumo-primeira-fatura.html', detalhes: 'hu02-composicao-vencimento.html',
  formas: 'hu03-formas-pagamento.html', pix: 'hu04-pagamento-pix.html',
  lembrete: 'hu05-lembrete-vencimento.html', confirmacao: 'hu06-confirmacao-pagamento.html'
};
const historicoKey = 'bulbe.navigation.history';
const destinoKey = 'bulbe.navigation.pending';
const rotaAtual = () => typeof window === 'undefined' || !window.location?.pathname
  ? undefined
  : Object.keys(rotas).find(nome => window.location.pathname.endsWith(`/pages/${rotas[nome]}`));
function lerHistorico() {
  try {
    const valor = JSON.parse(sessionStorage.getItem(historicoKey) || '[]');
    return Array.isArray(valor) ? valor.filter(nome => Object.hasOwn(rotas, nome)) : [];
  } catch { return []; }
}
function guardarHistorico(historico, destino) {
  try {
    sessionStorage.setItem(historicoKey, JSON.stringify(historico));
    if (destino) sessionStorage.setItem(destinoKey, destino);
    else sessionStorage.removeItem(destinoKey);
  } catch { /* A tela continua navegável pelos destinos alternativos. */ }
}
export function irPara(destino) {
  if (!rotas[destino]) throw new Error('Destino inválido.');
  const atual = rotaAtual();
  if (atual && atual !== destino) {
    const historico = lerHistorico();
    historico.push(atual);
    guardarHistorico(historico, destino);
  }
  window.location.href = new URL(`../../pages/${rotas[destino]}`, import.meta.url).href;
}

let timer;
export function avisar(mensagem) {
  let box = document.querySelector('#app-feedback');
  if (!box) {
    box = document.createElement('p');
    box.id = 'app-feedback';
    box.className = 'app-feedback';
    box.setAttribute('role', 'status');
    box.setAttribute('aria-live', 'polite');
    document.querySelector('.app-shell').append(box);
  }
  box.textContent = mensagem;
  clearTimeout(timer);
  timer = setTimeout(() => { box.textContent = ''; }, 4000);
}

export function iniciarNavegacao({ voltar = 'resumo', antesDeVoltar } = {}) {
  const atual = rotaAtual();
  try {
    const pendente = sessionStorage.getItem(destinoKey);
    if (pendente === atual) sessionStorage.removeItem(destinoKey);
    else if (atual) guardarHistorico([], null); // Entrada direta ou navegação externa: descarta histórico antigo.
  } catch { /* O fallback de voltar continua disponível sem sessionStorage. */ }
  document.querySelectorAll('.bottom-nav [data-tab]').forEach(aba => {
    aba.addEventListener('click', () => {
      // Mantém a decisão do grupo: rodapé só alterna o destaque.
      document.querySelectorAll('.bottom-nav [data-tab]').forEach(item => {
        item.classList.toggle('is-active', item === aba);
        if (item === aba) item.setAttribute('aria-current', 'page');
        else item.removeAttribute('aria-current');
      });
    });
  });
  document.querySelector('[data-action="back"]')?.addEventListener('click', () => {
    if (antesDeVoltar?.()) return;
    const historico = lerHistorico();
    const anterior = historico.pop();
    if (anterior && rotas[anterior]) {
      guardarHistorico(historico, anterior);
      window.location.href = new URL(`../../pages/${rotas[anterior]}`, import.meta.url).href;
      return;
    }
    // Se a página foi aberta diretamente, use o destino padrão da tela.
    if (atual === 'resumo') {
      window.location.href = new URL('../../index.html', import.meta.url).href;
      return;
    }
    if (rotas[voltar]) {
      guardarHistorico([], voltar);
      window.location.href = new URL(`../../pages/${rotas[voltar]}`, import.meta.url).href;
    }
  });
  document.querySelector('[data-action="notifications"]')?.addEventListener('click', () => irPara('lembrete'));
  const perfil = document.querySelector('[data-action="profile"]');
  if (perfil) {
    perfil.disabled = false;
    perfil.removeAttribute('title');
    perfil.setAttribute('aria-label', 'Perfil de Marina');
    perfil.addEventListener('click', () => avisar('Perfil demonstrativo de Marina Souza.'));
  }
  document.querySelector('.brand')?.setAttribute('href', rotas.resumo);
  document.querySelectorAll('[data-route]').forEach(botao => {
    botao.addEventListener('click', event => { event.preventDefault(); irPara(botao.dataset.route); });
  });
  // Atualiza os dados de sessão ao retornar pelo histórico do navegador.
  window.addEventListener('pageshow', event => { if (event.persisted) window.location.reload(); });
}

export async function carregarTela(renderizar) {
  try { await renderizar(); }
  catch (erro) {
    avisar(`${erro.message} Recarregue a página para tentar novamente.`);
    document.querySelectorAll('[data-requires-invoice]').forEach(botao => { botao.disabled = true; });
    return false;
  }
  return true;
}

export async function copiarTexto(texto) {
  if (navigator.clipboard?.writeText) {
    try { await navigator.clipboard.writeText(texto); return; }
    catch { /* Tenta a alternativa quando a permissão é negada. */ }
  }
  const anterior = document.activeElement;
  const selecao = window.getSelection();
  const ranges = [];
  if (selecao) for (let i = 0; i < selecao.rangeCount; i++) ranges.push(selecao.getRangeAt(i).cloneRange());
  const campo = document.createElement('textarea');
  campo.value = texto;
  campo.setAttribute('readonly', '');
  campo.setAttribute('aria-label', 'Código para copiar');
  campo.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;font-size:16px;';
  document.body.append(campo);
  try {
    campo.focus({ preventScroll: true });
    campo.select();
    campo.setSelectionRange(0, texto.length);
    if (!document.execCommand?.('copy')) throw new Error('Cópia bloqueada pelo navegador.');
  } finally {
    campo.remove();
    anterior?.focus?.({ preventScroll: true });
    if (selecao) { selecao.removeAllRanges(); ranges.forEach(range => selecao.addRange(range)); }
  }
}
