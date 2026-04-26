export function initContactModal() {
  const modal = document.getElementById("contactModal");
  const form = document.getElementById("contactForm");

  if (!modal || !form) {
    return;
  }

  function openContactModal() {
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeContactModal() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  window.openContactModal = openContactModal;
  window.closeContactModal = closeContactModal;

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeContactModal();
    }
  });

  modal.querySelectorAll("[data-contact-close]").forEach(function (button) {
    button.addEventListener("click", closeContactModal);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Thanks for your message! We'll be in touch soon.");
    form.reset();
    closeContactModal();
  });
}
