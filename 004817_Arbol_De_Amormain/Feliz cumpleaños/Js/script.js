// © Zero - Código libre no comercial

// ----------------------
// Cargar el SVG y animar
// ----------------------
fetch('Img/treelove.svg')
  .then(res => res.text())
  .then(svgText => {
    const container = document.getElementById('tree-container');
    container.innerHTML = svgText;

    const svg = container.querySelector('svg');
    if (!svg) return;

    // Crear imagen happy.png (oculta al inicio)
    const people = document.createElement('img');
    people.src = 'Img/happy.png';
    people.id = 'people';
    people.alt = 'Personas encima del árbol';
    people.className = 'people-img';
    container.appendChild(people);

    // Animación de dibujo
    const allPaths = Array.from(svg.querySelectorAll('path'));
    allPaths.forEach(path => {
      path.style.stroke = '#222';
      path.style.strokeWidth = '2.5';
      path.style.fillOpacity = '0';
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.transition = 'none';
    });

    setTimeout(() => {
      allPaths.forEach((path, i) => {
        path.style.transition =
          `stroke-dashoffset 1.2s cubic-bezier(.77,0,.18,1) ${i * 0.08}s,
           fill-opacity 0.5s ${0.9 + i * 0.08}s`;
        path.style.strokeDashoffset = 0;

        setTimeout(() => {
          path.style.fillOpacity = '1';
          path.style.stroke = '';
          path.style.strokeWidth = '';
        }, 1200 + i * 80);
      });

      // Después del dibujo
      const totalDuration = 1200 + (allPaths.length - 1) * 80 + 500;
      setTimeout(() => {
        svg.classList.add('move-and-scale');

        setTimeout(() => {
          showDedicationText();
          startFloatingObjects();
          playBackgroundMusic();

          // Mostrar happy.png
          const peopleImg = document.getElementById('people');
          if (peopleImg) {
            peopleImg.classList.add('visible');
          }

        }, 1200);
      }, totalDuration);
    }, 50);

    // Corazones animados
    const heartPaths = allPaths.filter(el => {
      const style = el.getAttribute('style') || '';
      return style.includes('#110093') || style.includes('#831607');
    });
    heartPaths.forEach(path => path.classList.add('animated-heart'));
  });

// ----------------------
// Texto con efecto typing
// ----------------------
function getURLParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function showDedicationText() {
  let text = getURLParam('text');
  if (!text) {
    text = `Feliz cumpleaños\n\nHoy celebramos tus 21 años y no puedo evitar sentirme muy feliz por compartir este día contigo.\n\n Ya son 2 años de amistad y de verdad agradezco cada momento, cada risa y cada conversación que hemos tenido.\n\n Eres una persona muy especial y mereces que este nuevo año de vida esté lleno de sueños cumplidos, amor, éxito y muchas experiencias bonitas. Que este 14 de febrero no solo sea el día del amor y la amistad, sino también un recordatorio de lo importante que eres para las personas que te queremos. ¡Disfruta muchísimo tus 21!`;
  }

  const container = document.getElementById('dedication-text');
  container.classList.add('typing');

  let i = 0;
  function type() {
    if (i <= text.length) {
      container.textContent = text.slice(0, i);
      i++;
      setTimeout(type, text[i - 2] === '\n' ? 350 : 45);
    } else {
      setTimeout(showSignature, 600);
    }
  }
  type();
}

// ----------------------
// Firma
// ----------------------
function showSignature() {
  const dedication = document.getElementById('dedication-text');
  let signature = dedication.querySelector('#signature');

  if (!signature) {
    signature = document.createElement('div');
    signature.id = 'signature';
    signature.className = 'signature';
    dedication.appendChild(signature);
  }

  signature.textContent = "con amor , ventilador";
  signature.classList.add('visible');
}

// ----------------------
// Pétalos flotantes
// ----------------------
function startFloatingObjects() {
  const container = document.getElementById('floating-objects');

  function spawn() {
    const el = document.createElement('div');
    el.className = 'floating-petal';
    el.style.left = `${Math.random() * 90 + 5}%`;
    el.style.top = '110%';
    container.appendChild(el);

    const duration = 6000 + Math.random() * 4000;
    const drift = (Math.random() - 0.5) * 80;

    setTimeout(() => {
      el.style.transition = `transform ${duration}ms linear, opacity 1.2s`;
      el.style.transform = `translate(${drift}px, -120vh)`;
      el.style.opacity = 0;
    }, 30);

    setTimeout(() => el.remove(), duration + 2000);
    setTimeout(spawn, 500);
  }
  spawn();
}

// ----------------------
// Música
// ----------------------
function playBackgroundMusic() {
  const audio = document.getElementById('bg-music');
  if (!audio) return;

  audio.volume = 0.7;
  audio.loop = true;

  audio.play().catch(() => {
    const btn = document.createElement('button');
    btn.textContent = '▶️ Música';
    btn.style.position = 'fixed';
    btn.style.bottom = '18px';
    btn.style.right = '18px';
    btn.style.zIndex = 99;
    btn.onclick = () => {
      audio.play();
      btn.remove();
    };
    document.body.appendChild(btn);
  });
}
