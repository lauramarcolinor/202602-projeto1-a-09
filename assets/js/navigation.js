export const rotas = {
  resumo: 'hu01-resumo-primeira-fatura.html', detalhes: 'hu02-composicao-vencimento.html',
  formas: 'hu03-formas-pagamento.html', pix: 'hu04-pagamento-pix.html',
  lembrete: 'hu05-lembrete-vencimento.html', confirmacao: 'hu06-confirmacao-pagamento.html'
};
export function irPara(destino) {
  if (!rotas[destino]) throw new Error('Destino inválido.');
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
    irPara(voltar);
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
  if (!navigator.clipboard?.writeText) throw new Error('Cópia indisponível neste navegador.');
  await navigator.clipboard.writeText(texto);
}
