// Elementos
const botaoVoltar = document.getElementById('voltar');
const botaoNotificacoes = document.getElementById('notificacoes');
const botaoPerfil = document.getElementById('perfil');
const formulario = document.getElementById('formulario');
const opcoes = document.querySelectorAll('input[name="pagamento"]');

const menuFaturas = document.getElementById('menu-faturas');
const menuConsumo = document.getElementById('menu-consumo');
const menuIndicacoes = document.getElementById('menu-indicacoes');

const modal = document.getElementById('modal');
const tituloModal = document.getElementById('titulo-modal');
const mensagemModal = document.getElementById('mensagem-modal');
const avisoDemo = document.getElementById('aviso-demo');
const fecharModal = document.getElementById('fechar-modal');
const entendi = document.getElementById('entendi');

// Textos de cada forma de pagamento
const formas = {
  automatico: {
    nome: 'PIX Automático',
    mensagem: 'Você vai autorizar o débito no seu banco e as próximas faturas serão pagas sozinhas.'
  },
  pix: {
    nome: 'PIX',
    mensagem: 'Você vai receber o QR Code e o Pix Copia e Cola para pagar sua fatura.'
  },
  credito: {
    nome: 'Cartão de crédito',
    mensagem: 'Sua fatura será cobrada no cartão de crédito na data de vencimento.'
  },
  debito: {
    nome: 'Cartão de débito',
    mensagem: 'Sua fatura será cobrada no cartão de débito na data de vencimento.'
  },
  boleto: {
    nome: 'Boleto bancário',
    mensagem: 'Você vai receber o boleto no seu e-mail para pagar em qualquer banco.'
  }
};

// Abre a janela com título e mensagem
function abrirModal(titulo, mensagem, demonstracao) {
  tituloModal.textContent = titulo;
  mensagemModal.textContent = mensagem;
  avisoDemo.hidden = !demonstracao;
  if (!modal.open) {
    modal.showModal();
  }
}

// Seta do cabeçalho: volta para a tela anterior
botaoVoltar.addEventListener('click', function () {
  if (history.length > 1) {
    history.back();
  } else {
    window.location.href = '../index.html';
  }
});

botaoNotificacoes.addEventListener('click', function () {
  abrirModal('Notificações', 'Você não tem notificações novas.', false);
});

botaoPerfil.addEventListener('click', function () {
  abrirModal('Seu perfil', 'Em breve você poderá ver e editar seus dados por aqui.', false);
});

// Menu inferior
menuFaturas.addEventListener('click', function () {
  window.location.href = 'hu01-resumo-primeira-fatura.html';
});

menuConsumo.addEventListener('click', function () {
  abrirModal('Consumo', 'Esta área estará disponível em breve.', false);
});

menuIndicacoes.addEventListener('click', function () {
  abrirModal('Indicações', 'Esta área estará disponível em breve.', false);
});

// Atualiza o texto "Selecionado" / "Selecionar" de cada opção
function atualizarTextos() {
  opcoes.forEach(function (opcao) {
    const texto = opcao.closest('.opcao').querySelector('.texto-selecao');
    texto.textContent = opcao.checked ? 'Selecionado' : 'Selecionar';
  });
}

opcoes.forEach(function (opcao) {
  opcao.addEventListener('change', atualizarTextos);
});

// Continuar
formulario.addEventListener('submit', function (evento) {
  evento.preventDefault();
  const escolhida = document.querySelector('input[name="pagamento"]:checked');
  const forma = formas[escolhida.value];
  abrirModal(forma.nome, forma.mensagem, true);
});

// Fechar a janela
fecharModal.addEventListener('click', function () {
  modal.close();
});

entendi.addEventListener('click', function () {
  modal.close();
});

// Clique no fundo escuro também fecha
modal.addEventListener('click', function (evento) {
  if (evento.target === modal) {
    modal.close();
  }
});

atualizarTextos();
