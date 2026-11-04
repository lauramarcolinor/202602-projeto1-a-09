// Protótipo local: não realiza cobranças nem solicita dados bancários.
const form = document.querySelector('#payment-form');
const dialog = document.querySelector('#information-dialog');
const menuButton = document.querySelector('#menu-button');
const navigation = document.querySelector('#navigation');
const methods = {
  automatico: ['PIX Automático', 'Você escolheu o PIX Automático. Em um aplicativo integrado, o próximo passo seria autorizar os pagamentos no seu banco.'],
  pix: ['PIX', 'Você escolheu pagar com PIX. Em um aplicativo integrado, o próximo passo exibiria o QR Code e o código Pix Copia e Cola da sua fatura.'],
  credito: ['Cartão de crédito', 'Você escolheu o cartão de crédito para pagar sua fatura no vencimento.'],
  debito: ['Cartão de débito', 'Você escolheu o cartão de débito para pagar sua fatura no vencimento.'],
  boleto: ['Boleto bancário', 'Você escolheu receber o boleto por e-mail para pagar em qualquer banco.']
};
function showInformation(title, message, isDemo = false) {
  document.querySelector('#dialog-title').textContent = title;
  document.querySelector('#dialog-message').textContent = message;
  document.querySelector('#demo-note').hidden = !isDemo;
  dialog.showModal();
}
form.addEventListener('change', () => {
  form.querySelectorAll('input[name="payment"]').forEach(input => {
    input.nextElementSibling.querySelector('.selection-text').textContent = input.checked ? 'Selecionado' : 'Selecionar';
  });
});
form.addEventListener('submit', event => {
  event.preventDefault();
  const [name, message] = methods[new FormData(form).get('payment')];
  showInformation(`${name} selecionado`, message, true);
});
menuButton.addEventListener('click', () => {
  navigation.hidden = !navigation.hidden;
  menuButton.setAttribute('aria-expanded', String(!navigation.hidden));
});
document.querySelector('#payment-menu').addEventListener('click', () => {
  navigation.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  form.querySelector('input:checked').focus();
});
document.querySelector('#help-button').addEventListener('click', () => showInformation('Como escolher?', 'Selecione a forma de pagamento de sua preferência e clique em Continuar. Você pode alterar a seleção antes de continuar.'));
document.querySelector('#notifications-button').addEventListener('click', () => showInformation('Notificações', 'Seus lembretes de vencimento aparecerão aqui. Você não tem novas notificações nesta demonstração.'));
document.querySelector('#profile-button').addEventListener('click', () => showInformation('Meu perfil', 'Olá! Este é o perfil de demonstração do aplicativo Bulbe.'));
dialog.querySelectorAll('.close-button, .dialog-done').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
