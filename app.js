const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => navList.classList.toggle('mobile-open'));
  navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navList.classList.remove('mobile-open')));
}

const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in');
  });
}, { threshold: 0.2 });

revealEls.forEach(el => io.observe(el));

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const tagEl = document.getElementById('typedTag');
const phrases = [
  'learning AI, one build at a time.',
  'Python + problem-solving.',
  'hardware roots, software goals.'
];

if (tagEl) {
  if (prefersReduced) {
    tagEl.textContent = phrases[0];
  } else {
    let pIdx = 0, cIdx = 0, deleting = false;
    function tick() {
      const word = phrases[pIdx];
      if (!deleting) {
        cIdx++;
        tagEl.textContent = word.slice(0, cIdx);
        if (cIdx === word.length) {
          deleting = true;
          setTimeout(tick, 1200);
          return;
        }
      } else {
        cIdx--;
        tagEl.textContent = word.slice(0, cIdx);
        if (cIdx === 0) {
          deleting = false;
          pIdx = (pIdx + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting ? 35 : 65);
    }
    tick();
  }
}

const canvas = document.getElementById('netCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let w, h, nodes = [];

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  function initNodes() {
    const count = Math.min(55, Math.floor((w * h) / 22000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.strokeStyle = `rgba(232,166,61,${0.12 * (1 - dist / 140)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = 'rgba(95,211,196,0.55)';
      ctx.beginPath();
      ctx.arc(nodes[i].x, nodes[i].y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    if (!prefersReduced) requestAnimationFrame(draw);
  }

  resize();
  initNodes();
  draw();
  window.addEventListener('resize', () => { resize(); initNodes(); });
}

document.getElementById('contactForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('cf-name').value;
  const email = document.getElementById('cf-email').value;
  const message = document.getElementById('cf-message').value;

  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

  window.location.href = `mailto:narasimhaislavath9@gmail.com?subject=${subject}&body=${body}`;
});

