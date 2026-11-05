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
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
  }
});
