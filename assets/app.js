// Липкая кнопка внизу экрана.
// Показывается, когда первый экран уехал вверх, и прячется у блока контактов —
// там кнопки и так на виду.

(function () {
  'use strict';

  var bar = document.getElementById('bar');
  var hero = document.querySelector('.hero');
  var contact = document.getElementById('contact');

  if (!bar || !hero || !('IntersectionObserver' in window)) return;

  var pastHero = false;
  var atContact = false;

  function update() {
    bar.classList.toggle('is-on', pastHero && !atContact);
  }

  new IntersectionObserver(function (entries) {
    pastHero = !entries[0].isIntersecting;
    update();
  }, { rootMargin: '-120px 0px 0px 0px' }).observe(hero);

  if (contact) {
    new IntersectionObserver(function (entries) {
      atContact = entries[0].isIntersecting;
      update();
    }).observe(contact);
  }
})();
