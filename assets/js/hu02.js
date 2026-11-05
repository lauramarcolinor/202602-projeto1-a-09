// Telas
const telaDetalhes = document.getElementById('tela-detalhes');
const telaComposicao = document.getElementById('tela-composicao');
 
// Botões
const btnVerComposicao = document.getElementById('btn-ver-composicao');
const btnVoltarDetalhes = document.getElementById('btn-voltar-detalhes');
const btnVoltarTopo = document.getElementById('btn-voltar-topo');
 
// Mostra uma tela e esconde a outra
function mostrarTela(tela) {
  telaDetalhes.classList.remove('ativa');
  telaComposicao.classList.remove('ativa');
  tela.classList.add('ativa');
  document.querySelector('.screen-content').scrollTo({ top: 0, behavior: 'smooth' });
}
 
// Tela 1 -> Tela 2
btnVerComposicao.addEventListener('click', function () {
  mostrarTela(telaComposicao);
});
 
// Tela 2 -> Tela 1
btnVoltarDetalhes.addEventListener('click', function () {
  mostrarTela(telaDetalhes);
});
 
// Seta do cabeçalho: na tela 2, volta para a tela 1
btnVoltarTopo.addEventListener('click', function () {
  if (telaComposicao.classList.contains('ativa')) {
    mostrarTela(telaDetalhes);
  } else {
    window.location.href = 'hu01-resumo-primeira-fatura.html';
  }
});

// Alterna apenas o destaque do rodapé, sem abrir telas ou popups.
document.querySelectorAll('[data-tab]').forEach(function (tab) {
  tab.addEventListener('click', function () {
    document.querySelectorAll('[data-tab]').forEach(function (item) {
      item.classList.toggle('is-active', item === tab);
      if (item === tab) item.setAttribute('aria-current', 'page');
      else item.removeAttribute('aria-current');
    });
  });
});
