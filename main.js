/* ==========================================================================
   ROYAL CUT CALI — Lógica de la Landing
   ========================================================================== */

// -------- Configuración (editable) --------
const CONFIG = {
  phone: "573177550472", // WhatsApp sin "+"
  businessName: "Royal Cut Cali",
  defaultMessage: "Hola, quiero reservar una cita en Royal Cut. Me gustaría conocer la disponibilidad para [servicio] en la sede de [sede]."
};

// -------- Datos de servicios --------
const SERVICES = [
  { name: "Corte",                    price: 22, desc: "Corte personalizado con acabado de precisión.", tag: "Popular" },
  { name: "Corte + Pigmento",         price: 26, desc: "Corte con pigmentación para un look definido." },
  { name: "Corte + Mascarilla",       price: 32, desc: "Corte acompañado de tratamiento capilar." },
  { name: "Corte + Cejas",            price: 25, desc: "Corte y perfilado de cejas para un rostro equilibrado." },
  { name: "Barba",                    price: 14, desc: "Perfilado y arreglo de barba con acabado limpio." },
  { name: "Barba + Pigmento",         price: 18, desc: "Barba definida con pigmentación para mayor densidad." },
  { name: "Cejas",                    price: 10, desc: "Diseño y perfilado de cejas." },
  { name: "Corte + Barba",            price: 28, desc: "Servicio completo: corte y arreglo de barba.", tag: "Recomendado" },
  { name: "Corte + Barba + Pigmento", price: 32, desc: "Paquete completo con corte, barba y pigmento.", tag: "Royal" },
  { name: "Corte + Barba + Cejas",    price: 32, desc: "Corte, barba y cejas en una sola visita." }
];

// -------- Testimonios --------
const TESTIMONIALS = [
  {
    quote: "Llevo varios años yendo a la barbería… llevo 43 cortes con ellos y la verdad muy buen servicio.",
    author: "Jhonatan Florez Caicedo",
    meta: "Reseña de Google",
    stars: 5
  },
  {
    quote: "La mejor barbería a la que he podido asistir, cada uno de sus barberos hace parte de la experiencia, capacitados, respetuosos y aseados.",
    author: "Juan Pablo Jaramillo Cortez",
    meta: "Reseña de Google",
    stars: 5
  },
  {
    quote: "Excelente servicio, buen barbero Alexander.",
    author: "Juan Reyes",
    meta: "Reseña de Google",
    stars: 5
  }
];

// -------- Sedes --------
const LOCATIONS = [
  {
    tag: "Sede principal",
    name: "Boulevard Sauko",
    address: "Boulevard Conjunto Sauko, Local 11",
    city: "Cali, Valle del Cauca",
    mapUrl: "https://maps.google.com/?q=Boulevard+Conjunto+Sauko+Cali"
  },
  {
    tag: "Segunda sede",
    name: "Portal de la Bocha",
    address: "Portal de la Bocha Plaza, Local 22 · Cra. 112 #28-47",
    city: "Cali, Valle del Cauca",
    mapUrl: "https://maps.google.com/?q=Cra.+112+%2328-47,+Cali"
  }
];

/* ==========================================================================
   UTILIDADES
   ========================================================================== */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function formatPrice(value) {
  return `$${value}.000`;
}

function buildWhatsAppLink({ service = "Corte", location = "Sauko", name = "", date = "" } = {}) {
  let message = CONFIG.defaultMessage
    .replace("[servicio]", service)
    .replace("[sede]", location);

  if (name) message += ` Mi nombre es ${name}.`;
  if (date) message += ` Preferiría: ${date}.`;

  return `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(message)}`;
}

/* ==========================================================================
   RENDER: SERVICIOS
   ========================================================================== */
function renderServices() {
  const grid = $("#servicesGrid");
  if (!grid) return;

  const featured = new Set(["Corte + Barba", "Corte + Barba + Pigmento"]);

  grid.innerHTML = SERVICES.map((s) => {
    const isFeatured = featured.has(s.name);
    return `
      <article class="service-card ${isFeatured ? "service-card--featured" : ""} reveal">
        ${s.tag ? `<span class="service-card__tag">${s.tag}</span>` : ""}
        <h3 class="service-card__name">${s.name}</h3>
        <p class="service-card__desc">${s.desc}</p>
        <div class="service-card__price">
          <strong>${formatPrice(s.price)}</strong>
          <span>COP</span>
        </div>
      </article>
    `;
  }).join("");
}

/* ==========================================================================
   RENDER: TESTIMONIOS
   ========================================================================== */
function renderTestimonials() {
  const grid = $("#testimonialsGrid");
  if (!grid) return;

  grid.innerHTML = TESTIMONIALS.map((t) => {
    const initials = t.author
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();

    return `
      <article class="testimonial reveal">
        <div class="testimonial__stars" aria-label="${t.stars} estrellas">${"★".repeat(t.stars)}</div>
        <p class="testimonial__quote">${t.quote}</p>
        <div class="testimonial__author">
          <div class="testimonial__avatar" aria-hidden="true">${initials}</div>
          <div>
            <strong>${t.author}</strong>
            <small>${t.meta}</small>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

/* ==========================================================================
   RENDER: SEDES
   ========================================================================== */
function renderLocations() {
  const grid = $("#locationsGrid");
  if (!grid) return;

  grid.innerHTML = LOCATIONS.map((l) => {
    const wa = buildWhatsAppLink({ service: "Corte", location: l.name });
    return `
      <article class="location-card reveal">
        <span class="location-card__tag">${l.tag}</span>
        <h3 class="location-card__name">${l.name}</h3>
        <p class="location-card__address">
          <strong>${l.address}</strong>
          ${l.city}
        </p>
        <div class="location-card__actions">
          <a href="${wa}" class="btn btn--primary" target="_blank" rel="noopener">Reservar</a>
          <a href="${l.mapUrl}" class="btn btn--ghost" target="_blank" rel="noopener">Cómo llegar</a>
        </div>
      </article>
    `;
  }).join("");
}

/* ==========================================================================
   RENDER: SELECTS DEL FORMULARIO
   ========================================================================== */
function populateFormSelects() {
  const serviceSelect  = $("#serviceSelect");
  const locationSelect = $("#locationSelect");
  if (!serviceSelect || !locationSelect) return;

  serviceSelect.innerHTML = SERVICES
    .map((s) => `<option value="${s.name}">${s.name} — ${formatPrice(s.price)}</option>`)
    .join("");

  locationSelect.innerHTML = LOCATIONS
    .map((l) => `<option value="${l.name}">${l.name}</option>`)
    .join("");
}

/* ==========================================================================
   HEADER: scroll + toggle móvil
   ========================================================================== */
function initHeader() {
  const header = $("#siteHeader");
  const toggle = $("#navToggle");
  const nav    = $(".main-nav");

  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    // Cerrar al hacer click en un link
    $$(".main-nav a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
}

/* ==========================================================================
   FORMULARIO WHATSAPP
   ========================================================================== */
function initWhatsAppForm() {
  const form = $("#whatsappForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);

    const link = buildWhatsAppLink({
      service:  data.get("service")  || "Corte",
      location: data.get("location") || "Sauko",
      name:     (data.get("name")    || "").toString().trim(),
      date:     (data.get("date")    || "").toString().trim()
    });

    window.open(link, "_blank", "noopener");
  });

  // Actualizar el botón principal según selects
  const serviceSelect  = $("#serviceSelect");
  const locationSelect = $("#locationSelect");
  const whatsappBtn    = $("#whatsappBtn");

  const updateBtn = () => {
    if (!whatsappBtn) return;
    whatsappBtn.href = buildWhatsAppLink({
      service:  serviceSelect?.value  || "Corte",
      location: locationSelect?.value || "Sauko"
    });
  };
  serviceSelect?.addEventListener("change", updateBtn);
  locationSelect?.addEventListener("change", updateBtn);
  updateBtn();
}

/* ==========================================================================
   BOTÓN FLOTANTE WHATSAPP
   ========================================================================== */
function initFloatingWhatsApp() {
  const float = $("#whatsappFloat");
  if (!float) return;
  float.href = buildWhatsAppLink({ service: "Corte", location: "Sauko" });
}

/* ==========================================================================
   REVEAL ON SCROLL
   ========================================================================== */
function initReveal() {
  const elements = $$(".reveal");
  if (!elements.length) return;

  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

  elements.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 6) * 60}ms`;
    observer.observe(el);
  });
}

/* ==========================================================================
   AÑO EN FOOTER
   ========================================================================== */
function setYear() {
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ==========================================================================
   INIT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderServices();
  renderTestimonials();
  renderLocations();
  populateFormSelects();
  initHeader();
  initWhatsAppForm();
  initFloatingWhatsApp();
  initReveal();
  setYear();
});