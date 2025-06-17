function openModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

function modal(triggerSelector, modalSelector) {
  const modal = document.querySelector(modalSelector);
  const openModalBtn = document.querySelectorAll(triggerSelector);

  openModalBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal(modalSelector);
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") === "") {
      closeModal(modalSelector);
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    const scrollPosition =
      window.scrollY + document.documentElement.clientHeight;
    const documentHeight = document.documentElement.scrollHeight - 1;
    if (scrollPosition > documentHeight) {
      openModal(modalSelector);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export { openModal, closeModal };
