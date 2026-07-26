document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('open');
    });
  }

  document.querySelectorAll('.carousel').forEach(function (carousel) {
    var slides = carousel.querySelectorAll('.carousel-slide');
    var counter = carousel.querySelector('.carousel-counter');
    var prevBtn = carousel.querySelector('.carousel-btn.prev');
    var nextBtn = carousel.querySelector('.carousel-btn.next');
    var thumbsWrap = carousel.querySelector('.carousel-thumbs');
    var dotsWrap = carousel.querySelector('.carousel-dots');
    var index = 0;
    var autoPlay = true;
    var timer = null;

    slides.forEach(function (slide, i) {
      var img = slide.querySelector('img');

      if (thumbsWrap) {
        var thumb = document.createElement('button');
        if (i === 0) thumb.className = 'active';
        var thumbImg = document.createElement('img');
        thumbImg.src = img.getAttribute('src');
        thumbImg.alt = 'Thumbnail ' + (i + 1);
        thumb.appendChild(thumbImg);
        thumb.addEventListener('click', function () { goTo(i, true); });
        thumbsWrap.appendChild(thumb);
      }

      if (dotsWrap) {
        var dot = document.createElement('button');
        if (i === 0) dot.className = 'active';
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', function () { goTo(i, true); });
        dotsWrap.appendChild(dot);
      }
    });

    var thumbs = thumbsWrap ? thumbsWrap.querySelectorAll('button') : [];
    var dots = dotsWrap ? dotsWrap.querySelectorAll('button') : [];

    function goTo(i, userAction) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (s, si) { s.classList.toggle('active', si === index); });
      thumbs.forEach(function (t, ti) { t.classList.toggle('active', ti === index); });
      dots.forEach(function (d, di) { d.classList.toggle('active', di === index); });
      if (counter) counter.textContent = (index + 1) + ' / ' + slides.length;
      if (userAction) {
        autoPlay = false;
        clearInterval(timer);
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(index - 1, true); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(index + 1, true); });

    var startX = null;
    var main = carousel.querySelector('.carousel-main');
    if (main) {
      main.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; });
      main.addEventListener('touchend', function (e) {
        if (startX === null) return;
        var diff = e.changedTouches[0].clientX - startX;
        if (diff > 40) goTo(index - 1, true);
        else if (diff < -40) goTo(index + 1, true);
        startX = null;
      });
    }

    timer = setInterval(function () {
      if (autoPlay) goTo(index + 1);
    }, 5000);
  });
});
