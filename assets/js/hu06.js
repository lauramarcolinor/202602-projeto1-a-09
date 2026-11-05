/* =========================================================
   HU06 — Confirmação do pagamento · Bulbe
   Interações da tela e leitura da fatura em data/faturas.json.
   ========================================================= */

// Dados da transação fictícia que não ficam no JSON de faturas.
const pagamentoFicticio = {
  pagoEm: '2026-03-03',
  horario: '14h32',
  forma: 'PIX'
};

// Usado se o fetch falhar (arquivo aberto sem servidor, por exemplo).
const faturaReserva = {
  vencimento: '2026-03-05',
  valor: 344.42,
  valorOriginal: 386.45,
  economia: 42.03
};

const moeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

const elementos = {
  original: document.querySelector('#valor-original'),
  desconto: document.querySelector('#valor-desconto'),
  total: document.querySelector('#valor-total'),
  pagoEm: document.querySelector('#valor-pago-em'),
  vencia: document.querySelector('#valor-vencia'),
  codigo: document.querySelector('#codigo-autenticacao'),
  copiar: document.querySelector('[data-action="copiar"]'),
  feedback: document.querySelector('#screen-feedback')
};

function formatarData(valor) {
  const [ano, mes, dia] = valor.split('-');
  return `${dia}/${mes}/${ano}`;
}

function avisar(mensagem) {
  elementos.feedback.textContent = mensagem;
  window.clearTimeout(avisar.timer);
  avisar.timer = window.setTimeout(() => {
    elementos.feedback.textContent = '';
  }, 3200);
}

function mostrarFatura(fatura) {
  const original = fatura.valorOriginal ?? fatura.valor + fatura.economia;
  elementos.original.textContent = `De ${moeda.format(original)}`;
  elementos.desconto.textContent = moeda.format(fatura.economia);
  elementos.total.textContent = moeda.format(fatura.valor);
  elementos.pagoEm.textContent =
    `Pago em ${formatarData(pagamentoFicticio.pagoEm)} às ${pagamentoFicticio.horario} via ${pagamentoFicticio.forma}`;

  const emDia = pagamentoFicticio.pagoEm <= fatura.vencimento;
  elementos.vencia.textContent =
    `Vencia em ${formatarData(fatura.vencimento)} · ${emDia ? 'pago em dia' : 'pago em atraso'}`;
}

async function carregarFatura() {
  try {
    const resposta = await fetch('../data/faturas.json');
    if (!resposta.ok) throw new Error('Não foi possível carregar as faturas.');
    const faturas = await resposta.json();
    mostrarFatura(faturas.find((fatura) => fatura.id === 103) ?? faturaReserva);
  } catch (erro) {
    mostrarFatura(faturaReserva);
    console.warn(erro);
  }
}

/* ---------------------------------------------------------
   Copiar o código de autenticação

   navigator.clipboard só existe em contexto seguro (https ou
   localhost). Abrindo o arquivo direto pelo Finder (file://)
   ele não aparece, então existe o plano B com execCommand,
   que o Safari do iPhone ainda aceita.
   --------------------------------------------------------- */

function copiarPeloCampo(texto) {
  return new Promise((resolve, reject) => {
    const campo = document.createElement('textarea');
    campo.value = texto;
    campo.setAttribute('readonly', '');
    campo.style.position = 'fixed';
    campo.style.top = '0';
    campo.style.opacity = '0';
    document.body.appendChild(campo);

    // No iOS o select() sozinho não basta: precisa do range.
    campo.contentEditable = 'true';
    const range = document.createRange();
    range.selectNodeContents(campo);
    const selecao = window.getSelection();
    selecao.removeAllRanges();
    selecao.addRange(range);
    campo.setSelectionRange(0, texto.length);

    let deuCerto = false;
    try {
      deuCerto = document.execCommand('copy');
    } catch (erro) {
      deuCerto = false;
    }

    document.body.removeChild(campo);
    if (deuCerto) resolve();
    else reject(new Error('Cópia não suportada'));
  });
}

function copiarTexto(texto) {
  if (navigator.clipboard && window.isSecureContext) {
    // A API pode existir e ainda assim ser negada, então o plano B
    // também cobre esse caso.
    return navigator.clipboard.writeText(texto).catch(() => copiarPeloCampo(texto));
  }
  return copiarPeloCampo(texto);
}

function marcarCopia(mensagem, erro) {
  const textoOriginal = marcarCopia.textoOriginal;
  elementos.copiar.textContent = mensagem;
  elementos.copiar.classList.toggle('botao--copiado', !erro);

  window.clearTimeout(marcarCopia.timer);
  marcarCopia.timer = window.setTimeout(() => {
    elementos.copiar.textContent = textoOriginal;
    elementos.copiar.classList.remove('botao--copiado');
  }, 2000);
}

marcarCopia.textoOriginal = elementos.copiar.textContent;

/* ---------------------------------------------------------
   Ações da tela
   --------------------------------------------------------- */

const acoes = {
  back() {
    if (window.history.length > 1) window.history.back();
    else window.location.href = '../index.html';
  },
  copiar() {
    copiarTexto(elementos.codigo.textContent.trim())
      .then(() => marcarCopia('Código copiado!', false))
      .catch(() => marcarCopia('Não deu para copiar', true));
  },
  faturas() {
    // A área de faturas é a tela da HU01, que ainda não está na main
    // (PR #41). Até lá o retorno vai para a página inicial do projeto,
    // mesmo destino que a HU01 usa no botão de voltar.
    window.location.href = '../index.html';
  },
  comprovante() {
    avisar('O download do comprovante será ligado na integração do MVP.');
  },
  'pix-automatico'() {
    avisar('A ativação do PIX Automático entra em uma próxima sprint.');
  },
  suporte() {
    avisar('O atendimento por WhatsApp é demonstrativo nesta entrega.');
  },
  notifications() {
    avisar('Você não tem novas notificações.');
  },
  profile() {
    avisar('Perfil de Marina Souza.');
  }
};

document.querySelectorAll('[data-action]').forEach((controle) => {
  controle.addEventListener('click', () => {
    const acao = acoes[controle.dataset.action];
    if (acao) acao();
  });
});

document.querySelectorAll('[data-tab]').forEach((aba) => {
  aba.addEventListener('click', () => {
    document.querySelectorAll('[data-tab]').forEach((item) => {
      item.classList.toggle('is-active', item === aba);
      if (item === aba) item.setAttribute('aria-current', 'page');
      else item.removeAttribute('aria-current');
    });

    if (aba.dataset.tab !== 'faturas') {
      avisar(`A área de ${aba.dataset.tab} será integrada ao fluxo do MVP.`);
    }
  });
});

carregarFatura();
