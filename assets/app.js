// Липкая кнопка внизу экрана и рельс-оглавление справа.
// Кнопка появляется, когда первый экран уехал вверх, и прячется у блока
// контактов — там кнопки и так на виду. Рельс: по сегменту на раздел,
// каждый заливается по мере того, как читатель проходит этот раздел.

(function () {
  'use strict';

  var bar = document.getElementById('bar');
  var hero = document.querySelector('.hero');
  var contact = document.getElementById('contact');

  var segs = [].slice.call(document.querySelectorAll('.rail__seg'));
  var parts = segs.map(function (a) {
    return document.querySelector(a.getAttribute('href'));
  });

  if (!hero && !segs.length) return;

  var waiting = false;

  function update() {
    if (bar && hero) {
      var pastHero = window.scrollY > hero.offsetTop + hero.offsetHeight - 120;
      var atContact = contact
        ? contact.getBoundingClientRect().top < window.innerHeight - 80
        : false;
      bar.classList.toggle('is-on', pastHero && !atContact);
    }

    // середина экрана — точка, по которой считаем «где мы сейчас»
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
