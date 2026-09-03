// Липкая кнопка внизу экрана.
// Появляется, когда первый экран уехал вверх, и прячется у блока контактов —
// там кнопки и так на виду.

(function () {
  'use strict';

  var bar = document.getElementById('bar');
  var hero = document.querySelector('.hero');
  var contact = document.getElementById('contact');

  if (!bar || !hero) return;

  var waiting = false;

  function update() {
    var pastHero = window.scrollY > hero.offsetTop + hero.offsetHeight - 120;
    var atContact = contact
      ? contact.getBoundingClientRect().top < window.innerHeight - 80
      : false;

    bar.classList.toggle('is-on', pastHero && !atContact);
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
