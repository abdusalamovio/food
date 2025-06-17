import { openModal, closeModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector) {
  document.querySelectorAll(formSelector).forEach((item) => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(data.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showFeedbackModal("Спасибо! Скоро мы с вами свяжемся");
        })
        .catch(() => {
          showFeedbackModal("Что-то пошло не так...");
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showFeedbackModal(message) {
    const prevModalDialog = document.querySelector(".modalDialog");
    prevModalDialog.classList.add("hide");

    openModal(".modal");
    const feedbackModal = document.createElement("div");
    feedbackModal.classList.add("modalDialog");
    feedbackModal.innerHTML = `
      <div class="modalContent">
        <div data-close class="modalClose">&times;</div>
        <div class="modalTitle">${message}</div>
      </div>
    `;
    document.querySelector(".modal").append(feedbackModal);

    setTimeout(() => {
      feedbackModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal(".modal");
    }, 3000);
  }
}

export default forms;
