// Плавающая кнопка «Связаться» и рельс-оглавление справа.
// Кнопка висит в правом нижнем углу всё время и по нажатию раскрывает
// Telegram и ВКонтакте. Рельс: по сегменту на раздел, каждый заливается
// по мере чтения.

(function () {
  'use strict';

  var bar = document.getElementById('bar');
  var toggle = document.getElementById('barToggle');
  var contact = document.getElementById('contact');

  var segs = [].slice.call(document.querySelectorAll('.rail__seg'));
  var parts = segs.map(function (a) {
    return document.querySelector(a.getAttribute('href'));
  });

  // ── раскрытие способов связи ──────────────────────────────────────
  if (toggle && bar) {
    function setBar(open) {
      bar.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.querySelector('.bar__word').textContent = open ? 'Свернуть' : 'Связаться';
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setBar(!bar.classList.contains('is-open'));
    });

    document.addEventListener('click', function (e) {
      if (bar.classList.contains('is-open') && !bar.contains(e.target)) setBar(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && bar.classList.contains('is-open')) setBar(false);
    });
  }


  // ── просмотр переписки с отзывом ──────────────────────────────────
  var shot = document.getElementById('shot');
  var shotImg = document.getElementById('shotImg');
  var shotClose = document.getElementById('shotClose');

  if (shot && shotImg) {
    function closeShot() {
      shot.hidden = true;
      document.body.style.overflow = '';
    }
    document.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('.review__show') : null;
      if (btn) {
        shotImg.src = btn.getAttribute('data-shot');
        shot.hidden = false;
        document.body.style.overflow = 'hidden';
        return;
      }
      if (e.target === shot || e.target === shotClose) closeShot();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !shot.hidden) closeShot();
    });
  }


  // ── плашка про cookie ─────────────────────────────────────────────
  var cookie = document.getElementById('cookie');
  var cookieOk = document.getElementById('cookieOk');

  if (cookie && cookieOk) {
    var soglasie = null;
    try { soglasie = localStorage.getItem('cookie-ok'); } catch (e) {}
    // пока плашка внизу, кнопку «Связаться» прячем: иначе они налезают друг на друга
    if (!soglasie) {
      cookie.hidden = false;
      document.body.classList.add('cookie-on');
    }

    cookieOk.addEventListener('click', function () {
      cookie.hidden = true;
      document.body.classList.remove('cookie-on');
      try { localStorage.setItem('cookie-ok', '1'); } catch (e) {}
    });
  }

  if (!segs.length) return;

  var waiting = false;

  function update() {
    // над оранжевым блоком контактов кнопка становится тёмной
    if (bar && contact && toggle) {
      var c = contact.getBoundingClientRect();
      var b = toggle.getBoundingClientRect();
      bar.classList.toggle('is-dark', c.top < b.bottom && c.bottom > b.top);
    }

    // середина экрана — точка, по которой считаем, где мы сейчас
    var anchor = window.scrollY + window.innerHeight * 0.5;
    var atBottom =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 4;

    for (var i = 0; i < segs.length; i++) {
      var part = parts[i];
      if (!part) continue;
      var fill = (anchor - part.offsetTop) / (part.offsetHeight || 1);
      if (atBottom && i === segs.length - 1) fill = 1;
      fill = Math.max(0, Math.min(1, fill));
      segs[i].style.setProperty('--fill', (fill * 100) + '%');
    }

    waiting = false;
  }

  function onScroll() {
    if (waiting) return;
    waiting = true;
    window.requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();
