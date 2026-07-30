/* ==========================================================================
   effects.js — kaydırma (scroll) efekt katmanı
   silentguardacousticspro.com

   Neden ayrı dosya:
   Sitenin React kaynağı elde olmadığı için derlenmiş bundle'a hiç
   dokunulmuyor. Bu katman index.html'den bağımsız olarak yükleniyor,
   DOM'u seçicilerle bulup efektleri uyguluyor. Kaldırmak için
   index.html'deki iki satırı silmek yeterli.

   Efekt parametreleri silentguardacoustics.com (Florax / GSAP ScrollTrigger +
   SplitText) temasından birebir alındı:
     - başlık: chars, x:20 → 0, opacity 0 → 1, stagger 0.03s, 1s, power2.out,
               tetik "top 85%"
     - görsel: 1s perde açılışı, Power2.out
     - blok  : aşağıdan belirme (sitenin kendi easing'i korunarak)
   ========================================================================== */
(function () {
  'use strict';

  var CONF = {
    charStagger: 30,     // ms — referans: 0.03s
    cardStagger: 80,     // ms — kart ızgaralarında sıra gecikmesi
    maxSplitChars: 90,   // çok uzun başlıkları bölmeyi bırak (DOM şişmesin)
    triggerMargin: '0px 0px -15% 0px', // "top 85%" karşılığı
    smoothScroll: false, // yumuşak kaydırma — KAPALI (denendi, hissi kötü bulundu)
    scrollEase: 0.12     // 0–1; küçük = daha uzun süzülme
  };

  var html = document.documentElement;
  html.classList.add('sg-fx');

  var reduce = window.matchMedia &&
               window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- gözlemci */
  var io = null;
  function observer() {
    if (io) return io;
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) {
          /* EMNİYET: ekranın üstünde kalmış öğe.
             Hash ile açılış, çapa bağlantısı veya hızlı kaydırmada araya
             düşen bloklar hiç kesişmediği için kalıcı görünmez kalabiliyordu.
             Kullanıcı zaten geçtiyse animasyonsuz açıyoruz.                 */
          if (e.boundingClientRect.top < 0) {
            e.target.classList.add('sg-in');
            io.unobserve(e.target);
          }
          return;
        }
        e.target.classList.add('sg-in');
        io.unobserve(e.target);            // bir kez oynasın
      });
    }, { root: null, rootMargin: CONF.triggerMargin, threshold: 0 });
    return io;
  }

  function watch(el) {
    if (reduce) { el.classList.add('sg-in'); return; }
    observer().observe(el);
  }

  /* --------------------------------------------------- başlık karakter bölme */
  function splitChars(el) {
    if (el.dataset.sgSplit) return;

    var full = (el.textContent || '').trim();
    if (!full || full.length > CONF.maxSplitChars) return;

    var idx = 0;

    function walk(nodes, out) {
      Array.prototype.forEach.call(nodes, function (node) {
        if (node.nodeType === 3) {                       // metin
          var parts = node.textContent.split(/(\s+)/);
          parts.forEach(function (tok) {
            if (!tok) return;
            if (/^\s+$/.test(tok)) {                     // boşluk aynen kalsın
              out.appendChild(document.createTextNode(tok));
              return;
            }
            var w = document.createElement('span');
            w.className = 'sg-w';
            Array.from(tok).forEach(function (ch) {       // kod noktası bazlı
              var c = document.createElement('span');
              c.className = 'sg-c';
              c.style.setProperty('--sg-d', (idx++ * CONF.charStagger) + 'ms');
              c.textContent = ch;
              w.appendChild(c);
            });
            out.appendChild(w);
          });
        } else if (node.nodeType === 1) {                // <br> vb. korunur
          var clone = node.cloneNode(false);
          out.appendChild(clone);
          walk(node.childNodes, clone);
        }
      });
    }

    var frag = document.createDocumentFragment();
    walk(el.childNodes, frag);

    // erişilebilirlik: ekran okuyucu bölünmüş harfleri tek tek okumasın
    el.setAttribute('aria-label', full);
    el.innerHTML = '';
    el.appendChild(frag);
    Array.prototype.forEach.call(el.querySelectorAll('.sg-w'), function (w) {
      w.setAttribute('aria-hidden', 'true');
    });

    el.classList.add('sg-split');
    el.dataset.sgSplit = '1';
    watch(el);
  }

  /* ------------------------------------------------------------ blok girişi */
  function reveal(el, delay) {
    if (el.dataset.sgR) return;
    el.dataset.sgR = '1';
    if (delay) el.style.setProperty('--sg-d', delay + 'ms');
    el.classList.add('sg-r');
    watch(el);
  }

  function revealGroup(selector) {
    var items = document.querySelectorAll(selector);
    if (!items.length) return [];
    // aynı kap içindekiler sırayla gelsin
    var seen = new Map();
    Array.prototype.forEach.call(items, function (el) {
      var parent = el.parentElement || document.body;
      var n = seen.get(parent) || 0;
      seen.set(parent, n + 1);
      reveal(el, n * CONF.cardStagger);
    });
    return Array.prototype.slice.call(items);
  }

  /* ------------------------------------------------------- perde açılır görsel */
  function curtain(selector) {
    Array.prototype.forEach.call(document.querySelectorAll(selector), function (el) {
      if (el.dataset.sgImg) return;
      if (!el.querySelector('img')) return;
      el.dataset.sgImg = '1';
      el.classList.add('sg-img');
      watch(el);
    });
  }

  /* ------------------------------------------------------------------- kurulum */
  function init() {
    /* 1) kart ızgaraları — sıralı belirme
          anasayfa: .category-card / .service-card
          kategori sayfası: .subcategory-card
          alt kategori sayfası: .products-grid > .product-card              */
    var carded = [];
    ['.category-card', '.service-card', '.subcategory-card',
     '.products-grid > .product-card'
    ].forEach(function (s) { carded = carded.concat(revealGroup(s)); });

    /* anasayfadaki ürün kartları yatay carousel içinde (track transform ile
       kayıyor); tek tek oynatmak yerine kabı bir blok olarak açıyoruz */
    Array.prototype.forEach.call(
      document.querySelectorAll('.products-carousel-container'),
      function (el) { reveal(el, 0); carded.push(el); }
    );

    /* 2) kart içermeyen bölümler — bütün olarak belirsin.
          Hero atlanıyor: ekranın üstünde, ayrıca video arka planı var. */
    Array.prototype.forEach.call(document.querySelectorAll('section'), function (sec) {
      if (sec.querySelector('.hero')) return;
      var hasCarded = carded.some(function (c) { return sec.contains(c); });
      if (hasCarded) return;
      reveal(sec, 0);
    });

    /* 3) ayrı duran bloklar (bölüm etiketi olmayan sayfalar dahil) */
    ['.video-showcase-left', '.video-showcase-right', '.home-faq-left',
     '.category-seo-text'
    ].forEach(function (s) { revealGroup(s); });

    /* 4) başlıklar — karakter karakter (h1 + tüm h2'ler; 12–59 karakter arası) */
    Array.prototype.forEach.call(document.querySelectorAll('h1, h2'),
      function (h) { splitChars(h); });

    /* 5) görseller — perde açılışı
          (yalnızca kendi kutusuna sığan sarmalayıcılar; .product-image
           overflow:visible olduğu için clip-path görseli kesebilir, alınmadı) */
    curtain('.service-card-image');
    curtain('.subcategory-img-wrap');
  }

  /* ------------------------------------- React route değişiminde yeniden kur */
  var t = null;
  function queue() {
    clearTimeout(t);
    t = setTimeout(init, 120);
  }

  ['pushState', 'replaceState'].forEach(function (m) {
    var orig = history[m];
    if (typeof orig !== 'function') return;
    history[m] = function () {
      var r = orig.apply(this, arguments);
      queue();
      return r;
    };
  });
  window.addEventListener('popstate', queue);

  function boot() {
    init();
    var root = document.getElementById('root');
    if (root) {
      new MutationObserver(queue).observe(root, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  /* --------------------------------------------------------- yumuşak kaydırma
     Referans site SmoothScroll.js kullanıyor (tekerlek olayını devralıp
     ivmeli kaydırma yapan yaklaşım). Aynısı burada, ama devralmanın bilinen
     tuzakları tek tek ele alınarak:
       - tekerlek birimi her zaman piksel değil (satır / sayfa modu)
       - yatay kaydırma carousel'e ait, ona karışılmamalı
       - kendi içinde kayan alanlar (mobil menü, açılır listeler) korunmalı
       - Ctrl/Cmd + tekerlek yakınlaştırmadır
     Dokunmatikte kendiliğinden devre dışı (pointer: fine koşulu).
     Kapatmak için yukarıda CONF.smoothScroll = false yapmak yeterli.        */
  if (CONF.smoothScroll && !reduce &&
      window.matchMedia && window.matchMedia('(pointer: fine)').matches) {

    var target = window.scrollY, current = target, running = false, maxY = 0;

    function refreshMax() {
      maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    }
    refreshMax();
    window.addEventListener('resize', refreshMax);

    /* olayın hedefi kendi içinde kayabilen bir alandaysa dokunma */
    function innerScrollable(node) {
      while (node && node !== document.body && node !== document.documentElement) {
        if (node.nodeType === 1) {
          var oy = getComputedStyle(node).overflowY;
          if ((oy === 'auto' || oy === 'scroll') &&
              node.scrollHeight > node.clientHeight + 1) return true;
        }
        node = node.parentNode;
      }
      return false;
    }

    /* deltaY'yi piksele çevir: 0 = piksel, 1 = satır, 2 = sayfa */
    function toPixels(e) {
      if (e.deltaMode === 1) return e.deltaY * 16;
      if (e.deltaMode === 2) return e.deltaY * window.innerHeight;
      return e.deltaY;
    }

    function tick() {
      current += (target - current) * CONF.scrollEase;
      if (Math.abs(target - current) < 0.5) {
        current = target;
        running = false;
      }
      window.scrollTo(0, current);
      if (running) requestAnimationFrame(tick);
    }

    window.addEventListener('wheel', function (e) {
      if (e.ctrlKey || e.metaKey) return;                     // yakınlaştırma
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;    // yatay: carousel
      if (innerScrollable(e.target)) return;                  // iç kaydırma alanı
      if (!running) { refreshMax(); target = window.scrollY; }
      e.preventDefault();
      target = Math.max(0, Math.min(maxY, target + toPixels(e)));
      if (!running) { running = true; requestAnimationFrame(tick); }
    }, { passive: false });

    /* klavye, çapa bağlantısı veya scrollTo ile konum değişirse hedefi eşitle */
    window.addEventListener('scroll', function () {
      if (!running) { target = current = window.scrollY; }
    }, { passive: true });
  }
})();
