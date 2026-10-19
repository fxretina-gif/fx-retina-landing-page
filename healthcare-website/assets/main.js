/* FxRetina Healthcare — interactions */
function fxInit() {
  // Mobile menu
  var btn = document.getElementById('hbtn');
  var panel = document.getElementById('mpanel');
  if (btn && panel) {
    btn.addEventListener('click', function () {
      var open = panel.classList.toggle('open');
      btn.classList.toggle('active', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    panel.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { panel.classList.remove('open'); btn.classList.remove('active'); btn.setAttribute('aria-expanded', 'false'); }
    });
  }

  // Footer year
  var y = document.getElementById('yr');
  if (y) y.textContent = new Date().getFullYear();

  // Client testimonials — injected just above the footer on every page
  (function () {
    var footer = document.querySelector('footer.footer');
    if (!footer || document.getElementById('fxTestimonials')) return;
    var ids = ['Qv_yEMzBLhI', 'KQc-qqfqyuI', 'WLtYuw210xw', '9gZoopkgd98'];
    var vids = ids.map(function (id, i) {
      return '<div style="aspect-ratio:9/16;border-radius:16px;overflow:hidden;box-shadow:0 18px 40px -24px rgba(11,42,74,.45);background:#0B2A4A;">' +
        '<iframe style="width:100%;height:100%;border:0;display:block;" src="https://www.youtube.com/embed/' + id +
        '" title="FxRetina client testimonial ' + (i + 1) + '" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
    }).join('');
    var sec = document.createElement('section');
    sec.id = 'fxTestimonials';
    sec.className = 'section soft';
    sec.innerHTML = '<div class="wrap center"><div class="kicker">Client Testimonials</div>' +
      '<h2 class="h2">Hear it straight from our clients.</h2>' +
      '<p class="lead" style="margin:16px auto 0;">Real clinic owners and founders on what it’s like to grow with FxRetina.</p>' +
      '<div class="grid4" style="margin-top:40px;">' + vids + '</div></div>';
    footer.parentNode.insertBefore(sec, footer);
  })();

  // Lead modal
  var overlay = document.getElementById('leadModal');
  function openModal(e) { if (e) e.preventDefault(); if (overlay) { overlay.classList.add('open'); document.body.style.overflow = 'hidden'; } }
  function closeModal() { if (overlay) { overlay.classList.remove('open'); document.body.style.overflow = ''; } }
  if (overlay) {
    overlay.addEventListener('click', function (e) { if (e.target === overlay || e.target.hasAttribute('data-close')) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
  }

  // Any CTA pointing to /contact/ (or marked data-popup) opens the popup
  document.querySelectorAll('a').forEach(function (a) {
    var href = a.getAttribute('href') || '';
    if (/\/contact\/?$/.test(href) || a.hasAttribute('data-popup')) {
      a.addEventListener('click', openModal);
    }
  });

  // Form handling — works for the contact-page form and the popup form.
  // To receive submissions by email, set data-endpoint to your Formspree (or similar) URL.
  function wire(form, success) {
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var endpoint = form.getAttribute('data-endpoint');
      function done() {
        if (success) { success.classList.add('show'); }
        form.style.display = 'none';
        if (success) success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      if (endpoint) {
        fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } }).then(done).catch(done);
      } else { done(); }
    });
  }
  wire(document.getElementById('leadForm'), document.getElementById('formSuccess'));
  wire(document.getElementById('leadFormModal'), document.getElementById('formSuccessModal'));
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fxInit);
} else {
  fxInit();
}
