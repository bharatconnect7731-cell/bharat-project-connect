// Bharat Project Connect — navigation and enquiry interactions
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Service cards pre-select the matching service in the enquiry form.
document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    const select = document.getElementById("serviceSelect");
    select.value = link.dataset.service;
  });
});

// The form creates a WhatsApp message. It does not store or transmit data itself.
document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = String(form.get("name") || "").trim();
  const phone = String(form.get("phone") || "").trim();
  const email = String(form.get("email") || "").trim();
  const service = String(form.get("service") || "").trim();
  const message = String(form.get("message") || "").trim();

  if (!name || !phone || !service || !message) {
    document.getElementById("formStatus").textContent = "Please complete all required fields.";
    return;
  }

  const text = [
    "Hello Bharat Project Connect,",
    "",
    "I would like to make an enquiry.",
    `Name: ${name}`,
    `Phone: ${phone}`,
    email ? `Email: ${email}` : "",
    `Service: ${service}`,
    `Requirement: ${message}`
  ].filter(Boolean).join("\n");

  const whatsappUrl = `https://wa.me/917302614061?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, "_blank", "noopener");
  document.getElementById("formStatus").textContent = "WhatsApp opened with your enquiry. Please press Send in WhatsApp.";
});

document.getElementById("year").textContent = new Date().getFullYear();
