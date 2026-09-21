// Яндекс.Метрика и цели.
//
// ВАЖНО: номер счётчика указан один раз, в строке ниже.
// Создай счётчик на metrika.yandex.ru и замени XXXXXXXX на его номер
// во ВСЕХ местах этого файла (их два: в настройке и в отправке целей).

var SCHETCHIK = 'XXXXXXXX';

(function (m, e, t, r, i, k, a) {
  m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
  m[i].l = 1 * new Date();
  for (var j = 0; j < document.scripts.length; j++) {
    if (document.scripts[j].src === r) return;
  }
  k = e.createElement(t); a = e.getElementsByTagName(t)[0];
  k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
})(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

if (SCHETCHIK !== 'XXXXXXXX') {
  ym(SCHETCHIK, 'init', {
    clickmap: true,            // карта кликов
    trackLinks: true,          // переходы по внешним ссылкам
    accurateTrackBounce: true, // точный показатель отказов
    webvisor: true             // вебвизор
  });
}

// ── цели ─────────────────────────────────────────────────────────────

function cel(imya) {
  if (SCHETCHIK === 'XXXXXXXX' || typeof ym !== 'function') return;
  ym(SCHETCHIK, 'reachGoal', imya);
}

document.addEventListener('click', function (e) {
  var el = e.target.closest ? e.target.closest('a, button') : null;
  if (!el) return;

  var href = el.getAttribute('href') || '';

  // связь
  if (href.indexOf('t.me/') !== -1) return cel('click_telegram');
  if (href.indexOf('vk.ru/') !== -1 || href.indexOf('vk.com/') !== -1) return cel('click_vk');
  if (el.id === 'barToggle' || href === '#contact') return cel('click_telegram');

  // переписка с отзывом
  if (el.classList.contains('review__show')) return cel('show_chat');

  // переходы на клиентские сайты: и кнопка, и картинка кейса
  var kejsy = {
    'fedornikitich.ru': 'open_case_fedor',
    'sladkaya-molli': 'open_case_molli',
    'kvartal-tlt': 'open_case_kvartal',
    'cuerpo-massage': 'open_case_cuerpo',
    'foryouflowers.ru': 'open_case_foryou'
  };
  for (var klyuch in kejsy) {
    if (href.indexOf(klyuch) !== -1) return cel(kejsy[klyuch]);
  }
});
