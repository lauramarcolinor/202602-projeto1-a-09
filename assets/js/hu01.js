const fallbackInvoice = {
  referencia: '2026-03',
  vencimento: '2026-03-05',
  valor: 344.42,
  valorOriginal: 386.45,
  economia: 42.03,
  status: 'aberta'
};

const money = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

const elements = {
  original: document.querySelector('#original-value'),
  discount: document.querySelector('#discount-value'),
  total: document.querySelector('#total-value'),
  dueDate: document.querySelector('#due-date'),
  status: document.querySelector('#invoice-status'),
  feedback: document.querySelector('#screen-feedback')
};

function formatDate(value) {
  const [year, month, day] = value.split('-');
  return `${day}/${month}/${year}`;
}

function showFeedback(message) {
  elements.feedback.textContent = message;
  window.clearTimeout(showFeedback.timeout);
  showFeedback.timeout = window.setTimeout(() => {
    elements.feedback.textContent = '';
  }, 3200);
}

function renderInvoice(invoice) {
  const originalValue = invoice.valorOriginal ?? invoice.valor + invoice.economia;
  elements.original.textContent = `De ${money.format(originalValue)}`;
  elements.discount.textContent = money.format(invoice.economia);
  elements.total.textContent = money.format(invoice.valor);
  elements.dueDate.textContent = formatDate(invoice.vencimento);
  elements.status.textContent = invoice.status === 'aberta'
    ? 'Em aberto · pagamento pendente'
    : 'Pagamento previsto';
}

async function loadInvoice() {
  try {
    const response = await fetch('../data/faturas.json');
    if (!response.ok) throw new Error('Não foi possível carregar as faturas.');
    const invoices = await response.json();
    const firstInvoice = invoices.find((invoice) => invoice.id === 103) ?? fallbackInvoice;
    renderInvoice(firstInvoice);
  } catch (error) {
    renderInvoice(fallbackInvoice);
    console.warn(error);
  }
}

document.querySelectorAll('[data-action]').forEach((control) => {
  control.addEventListener('click', () => {
    const action = control.dataset.action;

    if (action === 'back') {
      if (window.history.length > 1) window.history.back();
      else window.location.href = '../index.html';
      return;
    }

    if (action === 'payment') {
      showFeedback('Próxima etapa: escolher a forma de pagamento.');
      return;
    }

    if (action === 'details') {
      showFeedback('Os detalhes da composição serão abertos na HU02.');
      return;
    }

    if (action === 'notifications') {
      showFeedback('Você não tem novas notificações.');
      return;
    }

    if (action === 'profile') {
      showFeedback('Perfil de Marina Souza.');
    }
  });
});

document.querySelectorAll('[data-tab]').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('[data-tab]').forEach((item) => {
      item.classList.toggle('is-active', item === tab);
      if (item === tab) item.setAttribute('aria-current', 'page');
      else item.removeAttribute('aria-current');
    });

    if (tab.dataset.tab !== 'faturas') {
      showFeedback(`A área de ${tab.dataset.tab} será integrada ao fluxo do MVP.`);
    }
  });
});

loadInvoice();
