# Wireframes prontos

As seis telas do MVP foram exportadas e estão prontas para consulta. Os arquivos seguem o ID da história e podem ser usados como referência visual para a implementação.

| História | Tela | Arquivo | Status |
| --- | --- | --- | --- |
| HU01 | Resumo da primeira fatura | `hu01-resumo-primeira-fatura.png` | Pronto |
| HU02 | Detalhes e vencimento | `hu02-detalhes-e-vencimento.png` | Pronto |
| HU03 | Formas de pagamento | `hu03-formas-pagamento.png` | Pronto |
| HU04 | Pagamento via PIX | `hu04-pagamento-pix.png` | Pronto |
| HU05 | Lembrete de vencimento | `hu05-lembrete-vencimento.png` | Pronto |
| HU06 | Confirmação do pagamento | `hu06-confirmacao-pagamento.png` | Pronto |

Também está disponível a imagem atualizada do mapa de jornada:

- `jornada-atualizada.png`

Os arquivos desta pasta são referências visuais das seis telas. A implementação
HTML, CSS e JavaScript do fluxo demonstrativo HU01–HU06 está integrada na `main`;
consulte a seção [Entregas do README principal](../../README.md#9-entregas) para
o status registrado do projeto.

## Padrão compartilhado do aplicativo

Todas as telas devem reutilizar `assets/css/app-shell.css`. Em um HTML localizado
na pasta `pages/`, inclua no `<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<link rel="stylesheet" href="../assets/css/app-shell.css">
<!-- Carregue o CSS específico da sua HU depois do CSS compartilhado. -->
```

Use `class="app-page"` no `<body>` e a seguinte estrutura dentro dele:

```html
<div class="app-shell">
  <header class="app-header">
    <button class="icon-button" type="button" data-action="back" aria-label="Voltar">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7" /></svg>
    </button>

    <a class="brand" href="../index.html" aria-label="Bulbe, página inicial"></a>

    <div class="header-actions">
      <button class="icon-button" type="button" data-action="notifications" aria-label="Notificações">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></svg>
      </button>
      <button class="profile-button" type="button" data-action="profile" aria-label="Perfil">M</button>
    </div>
  </header>

  <main class="screen-content">
    <!-- conteúdo específico da HU -->
  </main>

  <nav class="bottom-nav" aria-label="Navegação principal">
    <button class="nav-item is-active" type="button" data-tab="faturas" aria-current="page">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l3 3v15H6zM15 3v4h4M9 12h6M9 16h6" /></svg>
      <span>Faturas</span>
    </button>
    <button class="nav-item" type="button" data-tab="consumo">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m13 2-8 12h6l-1 8 8-12h-6z" /></svg>
      <span>Consumo</span>
    </button>
    <button class="nav-item" type="button" data-tab="indicacoes">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3" /><path d="M5 21a7 7 0 0 1 14 0M18 8h4M20 6v4" /></svg>
      <span>Indicações</span>
    </button>
  </nav>
</div>
```

O `app-shell.css` fixa o cabeçalho em `72px`, o rodapé em `80px` e deixa apenas o
conteúdo central rolar. Cada integrante deve trocar somente o conteúdo da sua HU,
mantendo esses nomes de classes e proporções.

A classe `brand` exibe a logo branca em SVG, com `100 × 30px`, a partir de
`assets/img/compartilhado/logo-bulbe-branca.svg`. Para fundos claros, está
disponível a versão `assets/img/compartilhado/logo-bulbe.svg`. Não reconstrua a
logo com texto ou barras em CSS nem sobrescreva suas medidas no CSS da HU.

Os três botões do rodapé devem permanecer em todas as telas. Se o wireframe
original não mostrar o rodapé, ele deve ser acrescentado mesmo assim para manter
a navegação do MVP consistente. O botão ativo muda conforme a área da tela; na
HU01, `Faturas` fica ativo.

Os atributos `data-action` e `data-tab` identificam os controles. A navegação
compartilhada — voltar, notificações, perfil e destaque do rodapé — é centralizada
em `assets/js/navigation.js`; cada HU mantém suas ações específicas no próprio
JavaScript. A letra `M` representa o perfil demonstrativo da persona. Ações sem
integração real, como pagamento ou envio de notificações, são identificadas como
simulação nas telas e nos relatórios.

O padrão de logo foi integrado pelo PR #39. A HU01 e o ajuste de centralização
do cabeçalho também já foram integrados à `main` pelo PR #41.
