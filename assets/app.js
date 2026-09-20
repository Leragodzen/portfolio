// Липкая кнопка «Связаться» и рельс-оглавление справа.
// Кнопка появляется, когда первый экран уехал вверх, и прячется у блока
// контактов, где ссылки и так на виду. По нажатию раскрывает три способа
// связи. Рельс: по сегменту на раздел, каждый заливается по мере чтения.

(function () {
  'use strict';

  var bar = document.getElementById('bar');
  var toggle = document.getElementById('barToggle');
  var hero = document.querySelector('.hero');
  var contact = document.getElementById('contact');

  var rail = document.querySelector('.rail');
  var railMark = document.getElementById('railMark');
  var segs = [].slice.call(document.querySelectorAll('.rail__seg'));
  var parts = segs.map(function (a) {
    return document.querySelector(a.getAttribute('href'));
  });

  // ── раскрытие способов связи ──────────────────────────────────────
  if (toggle && bar) {
    toggle.addEventListener('click', function () {
      var open = bar.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.querySelector('.bar__word').textContent = open ? 'Свернуть' : 'Связаться';
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

  if (!hero && !segs.length) return;

  var waiting = false;

  function update() {
    if (bar && hero) {
      var pastHero = window.scrollY > hero.offsetTop + hero.offsetHeight - 120;
      var atContact = contact
        ? contact.getBoundingClientRect().top < window.innerHeight - 80
        : false;
      var show = pastHero && !atContact;
      bar.classList.toggle('is-on', show);

      // уехали от кнопки — сворачиваем список
      if (!show && bar.classList.contains('is-open')) {
        bar.classList.remove('is-open');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
          toggle.querySelector('.bar__word').textContent = 'Связаться';
        }
      }
    }

    // середина экрана — точка, по которой считаем, где мы сейчас
    var anchor = window.scrollY + window.innerHeight * 0.5;
    var atBottom =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 4;

    // кружок с курсором едет по рельсу вместе с прокруткой страницы
    if (rail && railMark) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var done = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      rail.style.setProperty('--go', (done * 100) + '%');
    }

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
