import test, { beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { lerEstado, salvarEstado, buscarFaturaDemo, simularPagamento } from '../assets/js/demo-state.js';
import { irPara, copiarTexto } from '../assets/js/navigation.js';

const fixture = JSON.parse(readFileSync(new URL('../data/faturas.json', import.meta.url)));
let storage;
beforeEach(() => {
  storage = new Map();
  globalThis.sessionStorage = { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) };
  globalThis.fetch = async () => ({ ok: true, json: async () => structuredClone(fixture) });
});

test('fatura única e composição coerente, inicialmente em aberto', async () => {
  const fatura = await buscarFaturaDemo();
  assert.equal(fatura.id, 103);
  assert.equal(fatura.status, 'aberta');
  assert.equal(Math.round((fatura.composicao.energia + fatura.composicao.iluminacaoPublica + fatura.composicao.pisCofins - fatura.economia) * 100), Math.round(fatura.valor * 100));
  assert.equal(lerEstado().pagamento, null);
});
test('receber lembrete não paga a fatura nem apaga a escolha', async () => {
  salvarEstado({ forma: 'pix' });
  salvarEstado({ lembreteRecebido: true });
  assert.equal(lerEstado().forma, 'pix');
  assert.equal(lerEstado().lembreteRecebido, true);
  assert.equal((await buscarFaturaDemo()).status, 'aberta');
});
test('pagamento exige seleção PIX', async () => {
  const fatura = await buscarFaturaDemo();
  assert.throws(() => simularPagamento(fatura), /Selecione PIX/);
  salvarEstado({ forma: 'boleto' });
  assert.throws(() => simularPagamento(fatura), /Selecione PIX/);
  assert.equal(lerEstado().pagamento, null);
});
test('simulação persiste, é idempotente e atualiza a mesma fatura', async () => {
  const fatura = await buscarFaturaDemo();
  salvarEstado({ forma: 'pix', lembreteRecebido: true });
  const primeiro = simularPagamento(fatura);
  assert.deepEqual(simularPagamento(fatura), primeiro);
  assert.equal((await buscarFaturaDemo()).status, 'paga');
  assert.equal(lerEstado().lembreteRecebido, true);
  assert.equal(lerEstado().pagamento.valor, fatura.valor);
  assert.equal(lerEstado().pagamento.em, fatura.demonstracao.pagamentoEm);
});
test('sessão inválida ou bloqueada não inventa pagamento', () => {
  sessionStorage.setItem('bulbe:demo:fatura-103:v1', '{invalido');
  assert.equal(lerEstado().pagamento, null);
  globalThis.sessionStorage = { getItem() { throw new Error('bloqueado'); }, setItem() { throw new Error('bloqueado'); } };
  assert.equal(lerEstado().pagamento, null);
  assert.throws(() => salvarEstado({ forma: 'pix' }), /bloqueado/);
});
test('falha de rede não usa valores silenciosos de reserva', async () => {
  globalThis.fetch = async () => ({ ok: false, status: 503 });
  await assert.rejects(buscarFaturaDemo, /503/);
});
test('composição inconsistente é rejeitada', async () => {
  const dados = structuredClone(fixture);
  dados.find(fatura => fatura.id === 103).composicao.energia = 1;
  globalThis.fetch = async () => ({ ok: true, json: async () => dados });
  await assert.rejects(buscarFaturaDemo, /inconsistente/);
});
test('rota resolve na pasta pages e rejeita destinos desconhecidos', () => {
  globalThis.window = { location: { href: '' } };
  irPara('pix');
  assert.equal(new URL(window.location.href).pathname.endsWith('/pages/hu04-pagamento-pix.html'), true);
  assert.throws(() => irPara('inexistente'), /inválido/);
});

function prepararCopia(clipboard, resultado) {
  const chamadas = { removido: false, texto: null, restaurado: false };
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { clipboard } });
  globalThis.window = { getSelection: () => null };
  globalThis.document = {
    activeElement: { focus() { chamadas.restaurado = true; } },
    body: { append(campo) { chamadas.texto = campo.value; } },
    createElement: () => ({ style: {}, setAttribute() {}, focus() {}, select() {}, setSelectionRange() {}, remove() { chamadas.removido = true; } }),
    execCommand: () => resultado
  };
  return chamadas;
}
test('cópia usa Clipboard API quando autorizada', async () => {
  let copiado;
  prepararCopia({ writeText: async texto => { copiado = texto; } }, false);
  await copiarTexto('PIX-FICTICIO');
  assert.equal(copiado, 'PIX-FICTICIO');
});
test('cópia negada usa alternativa e restaura foco', async () => {
  const chamadas = prepararCopia({ writeText: async () => { throw new Error('negado'); } }, true);
  await copiarTexto('PIX-FICTICIO');
  assert.equal(chamadas.texto, 'PIX-FICTICIO');
  assert.equal(chamadas.removido, true);
  assert.equal(chamadas.restaurado, true);
});
test('cópia bloqueada não informa sucesso e remove campo temporário', async () => {
  const chamadas = prepararCopia(undefined, false);
  await assert.rejects(() => copiarTexto('PIX-FICTICIO'), /bloqueada/);
  assert.equal(chamadas.removido, true);
});
