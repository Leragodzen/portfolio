// Липкая кнопка внизу экрана и фирменный индикатор прокрутки справа.
// Кнопка появляется, когда первый экран уехал вверх, и прячется у блока
// контактов — там кнопки и так на виду. Индикатор — метка на рельсе,
// показывает, сколько страницы уже пролистано, вместо системного скроллбара.

(function () {
  'use strict';

  var bar = document.getElementById('bar');
  var hero = document.querySelector('.hero');
  var contact = document.getElementById('contact');
  var railmark = document.getElementById('railmark');

  if (!hero) return;

  var waiting = false;

  function update() {
    if (bar) {
      var pastHero = window.scrollY > hero.offsetTop + hero.offsetHeight - 120;
      var atContact = contact
        ? contact.getBoundingClientRect().top < window.innerHeight - 80
        : false;
      bar.classList.toggle('is-on', pastHero && !atContact);
    }

    if (railmark) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      railmark.style.top = (pct * 100) + '%';
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
