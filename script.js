// Ano no rodapé
const anoEl = document.getElementById('ano');
if (anoEl) anoEl.textContent = new Date().getFullYear();

// Menu mobile
const btnMenu = document.getElementById('btnMenu');
const menuLinks = document.getElementById('menuLinks');
btnMenu?.addEventListener('click', () => {
  const open = menuLinks.classList.toggle('open');
  btnMenu.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Scroll suave e fechamento do menu
menuLinks?.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    menuLinks.classList.remove('open');
    btnMenu?.setAttribute('aria-expanded', 'false');
  });
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('in'); });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Agenda dinâmica — edite aqui
const eventos = [
  {
    titulo: 'Roda de conversa: Fé negra e cuidado',
    data: '25/09/2025',
    local: 'Osasco/SP',
    descricao: 'Partilha, leitura bíblica e oração com foco em cuidado e antirracismo.',
    link: 'https://www.instagram.com/cuxicoletivonegroevangelico/'
  },
  {
    titulo: 'Workshop: Introdução ao antirracismo nas igrejas',
    data: '10/10/2025',
    local: 'Online',
    descricao: 'Formação prática para lideranças e equipes pastorais.',
    link: 'https://www.instagram.com/cuxicoletivonegroevangelico/'
  },
  {
    titulo: 'Slam & música — Arte que cura',
    data: '22/11/2025',
    local: 'Zona Oeste/SP',
    descricao: 'Noite cultural com poesia, música e narrativas do território.',
    link: 'https://www.instagram.com/cuxicoletivonegroevangelico/'
  }
];

const agendaGrid = document.getElementById('agendaGrid');
if (agendaGrid) {
  agendaGrid.innerHTML = eventos.map(ev => `
    <article class="card event">
      <div class="event__meta">${ev.data} • ${ev.local}</div>
      <h3>${ev.titulo}</h3>
      <p>${ev.descricao}</p>
      <a class="btn btn--primary" target="_blank" href="${ev.link}">Detalhes</a>
    </article>
  `).join('');
}

// Lightbox simples
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    lightboxImg.src = a.getAttribute('href');
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

lightboxClose?.addEventListener('click', () => {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
});

lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) lightboxClose.click();
});

// Form demo (mostra os dados sem backend)
const form = document.getElementById('formContato');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  alert('Obrigada!\n\n' + JSON.stringify(data, null, 2));
  form.reset();
});
