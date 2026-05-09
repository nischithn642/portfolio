/* ═══════════════════════════════════════════
   NISCHITH N. PORTFOLIO v4 — WILD MODE
   Typewriter, Cursor Trail, Glitch, Terminal
═══════════════════════════════════════════ */

const root = document.documentElement;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── THEME TOGGLE ──────────────────────────
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    root.removeAttribute('data-theme');
    themeToggle.textContent = '◐';
  } else {
    root.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '◐';
  }

  themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// ── CUSTOM CURSOR WITH TRAIL ──────────────
const cursorMain = document.getElementById('cursor-main');
const cursorTrail = document.getElementById('cursor-trail');

if (cursorMain && cursorTrail && !prefersReducedMotion && window.innerWidth > 768) {
  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorMain.style.left = mouseX + 'px';
    cursorMain.style.top = mouseY + 'px';
  });

  function animateTrail() {
    trailX += (mouseX - trailX) * 0.15;
    trailY += (mouseY - trailY) * 0.15;
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top = trailY + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  document.addEventListener('mouseleave', () => {
    cursorMain.style.opacity = '0';
    cursorTrail.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursorMain.style.opacity = '1';
    cursorTrail.style.opacity = '0.6';
  });
}

// ── TYPEWRITER EFFECT ─────────────────────
const typewriterEl = document.getElementById('typewriter');
if (typewriterEl && !prefersReducedMotion) {
  const texts = [
    'VLSI Engineering Student',
    'Hardware Designer',
    'UVM Verification Engineer',
    'Graphic Design Lead',
    'Entrepreneurship Enthusiast'
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeWriter() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typewriterEl.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typewriterEl.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500; // Pause before new word
    }

    setTimeout(typeWriter, typingSpeed);
  }

  setTimeout(typeWriter, 1500);
}

// ── COORDINATES TRACKER ───────────────────
const coordsEl = document.getElementById('coords');
if (coordsEl) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth * 180 - 90).toFixed(2);
    const y = (e.clientY / window.innerHeight * 180 - 90).toFixed(2);
    coordsEl.textContent = `${x}°N ${y}°E`;
  });
}

// ── YEAR COUNTER ──────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ── MARQUEE SPEED ON SCROLL ───────────────
const marqueeTrack = document.getElementById('marquee-track');
if (marqueeTrack) {
  // Removed JS dynamic animationDuration to fix scrolling glitch. Pure CSS handles it now.
}

// ── INTERSECTION OBSERVER FOR REVEALS ─────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

// Observe project cards
const projectCards = document.querySelectorAll('.project-holo');
projectCards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateX(-40px)';
  card.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`;

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  cardObserver.observe(card);
});

// Observe scatter rows + wire up JS-controlled burst
const scatterRows = document.querySelectorAll('.scatter-row');
scatterRows.forEach((row, index) => {
  row.style.opacity = '0';
  row.style.transform = 'translateY(30px)';
  row.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;

  const rowObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          rowObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  rowObserver.observe(row);

  // JS-driven burst activation (more reliable than CSS :hover for fixed elements)
  row.addEventListener('mouseenter', () => row.classList.add('is-active'));
  row.addEventListener('mouseleave', () => row.classList.remove('is-active'));
});

// Observe pitch items
const pitchItems = document.querySelectorAll('.pitch-item');
pitchItems.forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(-20px)';
  item.style.transition = `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`;

  const itemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
          itemObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  itemObserver.observe(item);
});

// ── NAV ACTIVE STATE ──────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-item[href^="#"]');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  },
  { threshold: 0.3 }
);

sections.forEach(section => navObserver.observe(section));

// ── SMOOTH SCROLL ─────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── RANDOM GLITCH ON HERO CHARS ───────────
const glitchChars = document.querySelectorAll('.glitch-char');
if (glitchChars.length && !prefersReducedMotion) {
  setInterval(() => {
    const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
    randomChar.style.color = Math.random() > 0.5 ? 'var(--accent-2)' : 'var(--accent-3)';
    randomChar.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;

    setTimeout(() => {
      randomChar.style.color = '';
      randomChar.style.transform = '';
    }, 100);
  }, 3000);
}

// ── HERO PARALLAX ON SCROLL ───────────────
const hero = document.getElementById('hero');
if (hero && !prefersReducedMotion) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;
    const progress = Math.min(scrollY / heroHeight, 1);
    const bigName = document.querySelector('.hero-title');
    if (bigName) {
      bigName.style.transform = `translateY(${progress * 50}px)`;
      bigName.style.opacity = 1 - progress * 0.7;
    }
  }, { passive: true });
}

// ── PARTICLE CIRCUIT NETWORK ──────────────
(function initParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, animId;
  let mouseX = -9999, mouseY = -9999;

  // Config
  const COUNT       = 70;
  const MAX_DIST    = 160;   // max px to draw a connection line
  const MOUSE_REPEL = 120;   // repel radius around cursor
  const SPEED       = 0.45;

  // Accent palette
  const COLORS = ['#FF6B00', '#00F0FF', '#FF00E5', '#FF6B00', '#00F0FF'];

  // Particle class
  class Particle {
    constructor() { this.reset(true); }

    reset(initial) {
      this.x  = Math.random() * W;
      this.y  = initial ? Math.random() * H : (Math.random() < 0.5 ? -8 : H + 8);
      this.vx = (Math.random() - 0.5) * SPEED;
      this.vy = (Math.random() - 0.5) * SPEED;
      this.r  = Math.random() * 1.8 + 0.6;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.alpha = Math.random() * 0.5 + 0.3;
      this.pulse = Math.random() * Math.PI * 2; // phase offset for pulsing
    }

    update() {
      this.pulse += 0.02;

      // Gentle mouse repulsion
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_REPEL && dist > 0) {
        const force = (MOUSE_REPEL - dist) / MOUSE_REPEL * 0.6;
        this.vx += (dx / dist) * force;
        this.vy += (dy / dist) * force;
      }

      // Damping to prevent runaway
      this.vx *= 0.99;
      this.vy *= 0.99;

      // Clamp speed
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > SPEED * 3) {
        this.vx = (this.vx / speed) * SPEED * 3;
        this.vy = (this.vy / speed) * SPEED * 3;
      }

      this.x += this.vx;
      this.y += this.vy;

      // Wrap around
      if (this.x < -20) this.x = W + 20;
      if (this.x > W + 20) this.x = -20;
      if (this.y < -20) this.y = H + 20;
      if (this.y > H + 20) this.y = -20;
    }

    draw() {
      const pulse = 0.7 + Math.sin(this.pulse) * 0.3;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * pulse, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha * pulse;
      ctx.fill();

      // Outer glow
      const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 4 * pulse);
      grd.addColorStop(0, this.color + '60');
      grd.addColorStop(1, this.color + '00');
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * 4 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.globalAlpha = this.alpha * 0.4;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  let particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    // Rebuild particles on resize so they fill the new area
    particles = Array.from({ length: COUNT }, () => new Particle());
  }

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return `${r},${g},${b}`;
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist > MAX_DIST) continue;

        const opacity = (1 - dist / MAX_DIST) * 0.35;

        // Gradient line between the two particle colors
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, `rgba(${hexToRgb(a.color)},${opacity})`);
        grad.addColorStop(1, `rgba(${hexToRgb(b.color)},${opacity})`);

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = (1 - dist / MAX_DIST) * 1.2;
        ctx.stroke();
      }
    }
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(tick);
  }

  // Mouse tracking (only for hero section)
  function onMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  }
  function onMouseLeave() { mouseX = -9999; mouseY = -9999; }

  window.addEventListener('resize', resize);
  hero.addEventListener('mousemove', onMouseMove);
  hero.addEventListener('mouseleave', onMouseLeave);

  // Enable pointer events on canvas only for hero hover
  canvas.style.pointerEvents = 'none';

  resize();
  tick();

  // Pause when not visible (performance)
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          if (!animId) { resize(); tick(); }
        } else {
          cancelAnimationFrame(animId);
          animId = null;
        }
      });
    }, { threshold: 0 });
    obs.observe(hero);
  }
})();

// ── DESIGN FOLDER MOBILE MARQUEE ──────────
if (window.innerWidth <= 768) {
  document.querySelectorAll('.scatter-row').forEach(row => {
    const imagesContainer = row.querySelector('.scatter-images');
    if (imagesContainer) {
      const children = Array.from(imagesContainer.children);
      children.forEach(child => {
        const clone = child.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        imagesContainer.appendChild(clone);
      });

      imagesContainer.style.cssText = `
        position: relative !important;
        display: flex !important;
        opacity: 1 !important;
        pointer-events: auto !important;
        inset: auto !important;
        padding: 16px 0;
        gap: 12px;
        width: max-content;
        animation: mobileMarquee 20s linear infinite;
        overflow-x: auto;
        scrollbar-width: none;
      `;

      const imgs = imagesContainer.querySelectorAll('.scatter-img');
      imgs.forEach(img => {
        img.style.cssText = `
          position: relative !important;
          height: 120px !important;
          width: auto !important;
          transform: none !important;
          opacity: 1 !important;
          flex-shrink: 0;
        `;
      });
    }
  });
}

// ── TERMINAL TYPING EFFECT ─────────────────
// Staggered line-by-line reveal
const terminalBody = document.getElementById('terminal-body') || document.querySelector('.terminal-body');
if (terminalBody && !prefersReducedMotion) {
  const termLines = terminalBody.querySelectorAll('.term-line, .term-output, .term-divider');
  termLines.forEach((line) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(8px)';
  });

  const termObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          termLines.forEach((line, i) => {
            setTimeout(() => {
              line.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              line.style.opacity = '1';
              line.style.transform = 'translateY(0)';
            }, i * 110);
          });
          termObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  termObserver.observe(terminalBody);
}

// ── REDUCED MOTION ────────────────────────
if (prefersReducedMotion) {
  document.querySelectorAll('.glitch-char').forEach(char => {
    char.style.animation = 'none';
    char.style.opacity = '1';
    char.style.transform = 'none';
  });

  document.querySelectorAll('.project-holo, .scatter-row, .pitch-item').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}

// Add mobile marquee keyframes
const mobileStyle = document.createElement('style');
mobileStyle.textContent = `
  @keyframes mobileMarquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;
document.head.appendChild(mobileStyle);

// ── TERMINAL INTERACTIVE COMMANDS ─────────
const termInput = document.getElementById('term-input');
const termInputContainer = document.getElementById('term-input-container');

if (termInput && terminalBody) {
  termInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      const cmd = termInput.value.trim().toLowerCase();
      termInput.value = '';
      
      if (cmd === '') return;

      // Echo the command
      const echoLine = document.createElement('div');
      echoLine.className = 'term-line visible';
      echoLine.style.opacity = '1';
      echoLine.style.transform = 'translateY(0)';
      echoLine.innerHTML = `
        <span class="term-ps1">
            <span class="term-user-ps1">nischith</span><span class="term-at-ps1">@</span><span class="term-host-ps1">nmit-vlsi</span><span class="term-sep-ps1">:</span><span class="term-path-ps1">~</span><span class="term-dollar">$</span>
        </span>
        <span class="term-cmd">${cmd}</span>
      `;
      terminalBody.insertBefore(echoLine, termInputContainer);

      // Handle output
      const outputLine = document.createElement('div');
      outputLine.className = 'term-output visible';
      outputLine.style.opacity = '1';
      outputLine.style.transform = 'translateY(0)';

      if (cmd === 'help') {
        outputLine.innerHTML = `
          <p><span class="term-info">Available commands:</span></p>
          <p>&nbsp;&nbsp;<span class="term-highlight">whoami</span>    - Display current role</p>
          <p>&nbsp;&nbsp;<span class="term-highlight">skills</span>    - List technical skills</p>
          <p>&nbsp;&nbsp;<span class="term-highlight">sudo</span>      - Gain root access</p>
          <p>&nbsp;&nbsp;<span class="term-highlight">matrix</span>    - Enter the matrix</p>
          <p>&nbsp;&nbsp;<span class="term-highlight">party</span>     - Start a disco party</p>
          <p>&nbsp;&nbsp;<span class="term-highlight">invert</span>    - Invert the simulation</p>
          <p>&nbsp;&nbsp;<span class="term-highlight">destroy</span>   - Proceed with caution</p>
          <p>&nbsp;&nbsp;<span class="term-highlight">clear</span>     - Clear terminal window</p>
        `;
      } else if (cmd === 'whoami') {
        outputLine.innerHTML = `<p>Curious Explorer × VLSI Engineer × Design Lead</p>`;
      } else if (cmd === 'skills') {
        outputLine.innerHTML = `<p>Verilog, SystemVerilog, UVM, C/C++, Python, Embedded C, Cadence, Vivado, LTSpice, Figma</p>`;
      } else if (cmd.startsWith('sudo')) {
        outputLine.innerHTML = `<p class="term-error">nischith is not in the sudoers file. This incident will be reported.</p>`;
      } else if (cmd === 'su') {
         outputLine.innerHTML = `<p class="term-error">Authentication failure</p>`;
      } else if (cmd === 'matrix') {
        outputLine.innerHTML = `<p class="term-success">Wake up, Neo...</p>`;
        document.body.style.filter = 'hue-rotate(90deg) contrast(1.2)';
        setTimeout(() => { document.body.style.filter = ''; }, 3000);
      } else if (cmd === 'party') {
        outputLine.innerHTML = `<p class="term-success">Let's party! Type 'chill' to stop.</p>`;
        const style = document.createElement('style');
        style.id = 'party-style';
        style.textContent = `
          @keyframes partyTime {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
          }
          body { animation: partyTime 1.5s linear infinite !important; }
        `;
        document.head.appendChild(style);
      } else if (cmd === 'chill') {
        outputLine.innerHTML = `<p class="term-info">Party over.</p>`;
        const style = document.getElementById('party-style');
        if (style) style.remove();
      } else if (cmd === 'invert') {
        outputLine.innerHTML = `<p class="term-info">Reality inverted.</p>`;
        document.body.style.filter = document.body.style.filter.includes('invert') ? '' : 'invert(1)';
      } else if (cmd === 'destroy') {
        outputLine.innerHTML = `<p class="term-error">CRITICAL FAILURE IMMINENT. GOODBYE.</p>`;
        const style = document.createElement('style');
        style.textContent = `
          body { overflow: hidden; }
          body * { 
            transition: all 3s cubic-bezier(0.5, 0, 0.5, 1) !important; 
            transform: translateY(100vh) rotate(45deg) !important; 
            opacity: 0 !important; 
          }
        `;
        document.head.appendChild(style);
        setTimeout(() => { location.reload(); }, 3500);
      } else if (cmd === 'clear') {
        // Keep only the input container
        Array.from(terminalBody.children).forEach(child => {
          if (child !== termInputContainer) child.remove();
        });
        return;
      } else {
        outputLine.innerHTML = `<p>bash: ${cmd}: command not found</p>`;
      }

      terminalBody.insertBefore(outputLine, termInputContainer);
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });

  // Focus input when clicking anywhere in terminal
  terminalBody.addEventListener('click', () => {
    termInput.focus();
  });
}
