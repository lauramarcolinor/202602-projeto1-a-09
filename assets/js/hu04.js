  // QR Code ilustrativo (não escaneável)
  var n = 29, s = 20261020, d = '';
  function rnd(){ s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; }
  var cantos = [[0,0],[n-7,0],[0,n-7]];
  for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) {
    var escuro = false, finder = false;
    cantos.forEach(function(c){
      var dx = x - c[0], dy = y - c[1];
      if (dx >= -1 && dx <= 7 && dy >= -1 && dy <= 7) {
        finder = true;
        escuro = dx >= 0 && dy >= 0 && dx <= 6 && dy <= 6 &&
          (dx == 0 || dx == 6 || dy == 0 || dy == 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4));
      }
    });
    if (!finder) escuro = rnd() > 0.52;
    if (escuro) d += 'M' + x + ' ' + y + 'h1v1h-1z';
  }
  document.getElementById('qr').setAttribute('d', d);

  var btn = document.getElementById('copiar');
  btn.onclick = function () {
    var codigo = document.getElementById('codigo').textContent.trim();
    if (navigator.clipboard) navigator.clipboard.writeText(codigo);
    btn.textContent = 'Código copiado!';
    setTimeout(function(){ btn.textContent = 'Copiar código'; }, 2500);
  };
  document.getElementById('verificar').onclick = function () {
    document.getElementById('ret').hidden = false;
  };

  var navFeedback = document.getElementById('nav-feedback');
  var navFeedbackTimeout;
  document.querySelectorAll('nav [data-tab]').forEach(function (tab) {
    tab.addEventListener('click', function (event) {
      // Faturas abre o resumo; as demais áreas ainda não foram implementadas.
      if (tab.dataset.tab === 'faturas') return;
      event.preventDefault();
      document.querySelectorAll('nav [data-tab]').forEach(function (item) {
        if (item === tab) item.setAttribute('aria-current', 'page');
        else item.removeAttribute('aria-current');
      });
      navFeedback.textContent = 'A área de ' + tab.dataset.tab + ' será integrada ao fluxo do MVP.';
      navFeedback.hidden = false;
      clearTimeout(navFeedbackTimeout);
      navFeedbackTimeout = setTimeout(function () {
        navFeedback.hidden = true;
      }, 3200);
    });
  });
