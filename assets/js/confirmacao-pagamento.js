// HU06 — Confirmação do pagamento.
// Monta a tela a partir dos dados fictícios de data/, lidos pelo api.js.
// A estrutura espelha a HU01 (mesmo cartão de valor, mesma hierarquia) por
// consistência — heurística 4 de Nielsen.

import {
  buscarPagamentoDaFatura,
  buscarFaturaPorId,
  buscarClientePorId
} from './api.js';

// Primeira fatura do MVP, a mesma usada no wireframe da HU01.
const FATURA_DO_PROTOTIPO = 103;

const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
];

const reais = (valor) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function mesAno(referencia) {
  const [ano, mes] = referencia.split('-');
  return `${MESES[Number(mes) - 1]}/${ano.slice(2)}`;
}

function dataCurta(iso) {
  const [ano, mes, dia] = iso.slice(0, 10).split('-');
  return `${dia}/${mes}/${ano}`;
}

function dataHora(iso) {
  const [data, hora] = iso.split('T');
  const [h, min] = hora.split(':');
  return `${dataCurta(data)} às ${h}h${min}`;
}

function iniciais(nome) {
  return nome.trim()[0].toUpperCase();
}

function montar({ pagamento, fatura, cliente }) {
  const proxima = pagamento.proximaFatura;
  const canais = pagamento.comprovanteEnviadoPara.join(' e ');

  return `
    <!-- Herói: estado do sistema visível e inequívoco (heurística 1) -->
    <section class="sucesso">
      <p class="sucesso__selo">
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6"
             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="m4 12.5 5.2 5.2L20 7"/>
        </svg>
      </p>

      <h1 class="sucesso__titulo">Pagamento confirmado</h1>
      <p class="sucesso__texto">Primeira fatura · ${mesAno(fatura.referencia)}</p>

      <p class="etiqueta etiqueta--sucesso">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="m5 13 4 4L19 7"/>
        </svg>
        Pago · confirmado pela Bulbe
      </p>
    </section>

    <div class="folha">

      <!-- Cartão de valor: mesma anatomia da HU01 (heurística 4) -->
      <section class="cartao cartao-valor">
        <h2 class="rotulo">Valor pago</h2>

        <p class="valor-de">De ${reais(fatura.valorOriginal)}</p>
        <p class="desconto-pill">Desconto Bulbe: ${reais(fatura.economia)}</p>

        <h3 class="rotulo">Total pago</h3>
        <strong class="valor-total">${reais(pagamento.valorPago)}</strong>

        <!-- Critério 2: valor e data juntos, sem precisar procurar (heurística 6) -->
        <p class="valor-quando">
          Pago em <strong>${dataHora(pagamento.dataPagamento)}</strong> via PIX
        </p>
        <p class="valor-prazo">Vencia em ${dataCurta(fatura.vencimento)} · pago em dia</p>
      </section>

      <!-- Comprovante enxuto: só o que o cliente usa (heurística 8) -->
      <h2 class="secao-titulo">Comprovante</h2>
      <dl class="cartao comprovante">
        <div class="comprovante__linha">
          <dt>Titular</dt>
          <dd>${cliente.nome}</dd>
        </div>
        <div class="comprovante__linha">
          <dt>Instalação</dt>
          <dd>${fatura.instalacao}</dd>
        </div>
        <div class="comprovante__linha">
          <dt>Forma de pagamento</dt>
          <dd>PIX</dd>
        </div>
        <div class="comprovante__linha">
          <dt>Código de autenticação</dt>
          <dd class="codigo">${pagamento.codigoAutenticacao}</dd>
        </div>

        <button class="copiar" type="button" id="copiar-codigo">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="12" height="12" rx="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          Copiar código
        </button>
      </dl>

      <!-- Critério 3: próximos passos do cliente -->
      <h2 class="secao-titulo">Próximos passos</h2>
      <ol class="passos">
        <li>
          <div>
            <h3>Comprovante a caminho</h3>
            <p>Enviamos por ${canais} em até 5 minutos.</p>
          </div>
        </li>
        <li>
          <div>
            <h3>Próxima fatura: ${mesAno(proxima.referencia)}</h3>
            <p>Vence em ${dataCurta(proxima.vencimento)}. Avisamos você 5 dias antes.</p>
          </div>
        </li>
        <li>
          <div>
            <h3>Ative o PIX Automático</h3>
            <p>A fatura é paga sozinha no vencimento. <a href="#">Quero ativar</a></p>
          </div>
        </li>
      </ol>

      <div class="acoes">
        <button class="botao botao--primario" type="button" id="baixar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 3v12"/><path d="m7 11 5 5 5-5"/><path d="M5 21h14"/>
          </svg>
          Baixar comprovante
        </button>
        <a class="botao botao--secundario" href="#">Ver fatura completa</a>
      </div>

      <!-- Saída de erro e ajuda (heurísticas 9 e 10) -->
      <p class="ajuda">
        Pagamento não apareceu no seu banco?
        <a href="#">Fale com a gente pelo WhatsApp</a>
      </p>
    </div>
  `;
}

function ligarAcoes(pagamento) {
  const botaoCopiar = document.querySelector('#copiar-codigo');
  botaoCopiar?.addEventListener('click', async () => {
    const original = botaoCopiar.innerHTML;
    try {
      await navigator.clipboard.writeText(pagamento.codigoAutenticacao);
      botaoCopiar.textContent = 'Código copiado!';
    } catch {
      botaoCopiar.textContent = pagamento.codigoAutenticacao;
    }
    setTimeout(() => { botaoCopiar.innerHTML = original; }, 2000);
  });

  document.querySelector('#baixar')?.addEventListener('click', () => {
    window.print();
  });
}

async function iniciar() {
  const conteudo = document.querySelector('#conteudo');

  try {
    const pagamento = await buscarPagamentoDaFatura(FATURA_DO_PROTOTIPO);
    if (!pagamento) {
      throw new Error(`Nenhum pagamento registrado para a fatura ${FATURA_DO_PROTOTIPO}.`);
    }

    const [fatura, cliente] = await Promise.all([
      buscarFaturaPorId(pagamento.faturaId),
      buscarClientePorId(pagamento.clienteId)
    ]);

    conteudo.innerHTML = montar({ pagamento, fatura, cliente });
    document.querySelector('#avatar').textContent = iniciais(cliente.nome);
    document.querySelector('#instalacao-numero').textContent = fatura.instalacao;
    ligarAcoes(pagamento);
  } catch (erro) {
    conteudo.innerHTML = `
      <p class="estado estado--erro">
        Não foi possível carregar a confirmação.<br>
        O projeto está aberto pelo Live Server?
      </p>`;
    console.error(erro);
  }
}

iniciar();
