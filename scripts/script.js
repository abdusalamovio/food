window.addEventListener("DOMContentLoaded", () => {
  //
  const tabContent = document.querySelectorAll(".tabContent");
  const tabParent = document.querySelector(".tabHeaderItems");
  const tabs = document.querySelectorAll(".tabHeaderItem");

  function hideTabContent() {
    tabContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabs.forEach((item) => {
      item.classList.remove("tabHeaderItemActive");
    });
  }
  hideTabContent();

  function showTabContent(index = 0) {
    tabContent[index].classList.add("show", "fade");
    tabContent[index].classList.remove("hide");

    tabs[index].classList.add("tabHeaderItemActive");
  }
  showTabContent();

  tabParent.addEventListener("click", (e) => {
    if (e.target && target.classList.contains("tabHeaderItem")) {
      tabs.forEach((item, index) => {
        if (e.target == item) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });

  //
  const modal = document.querySelector(".modal");
  const openModalBtn = document.querySelectorAll("[data-modal]");

  function openModal() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }
  openModalBtn.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") === "") {
      closeModal();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closeModal();
    }
  });

  function showModalByScroll() {
    const scrollPosition =
      window.scrollY + document.documentElement.clientHeight;
    const documentHeight = document.documentElement.scrollHeight - 1;
    if (scrollPosition > documentHeight) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);

  //
  function timeRemaining() {
    const total = new Date("2025-05-20") - new Date();
    const days = total > 0 ? Math.floor(total / (1000 * 60 * 60 * 24)) : 0;
    const hours = total > 0 ? Math.floor((total / (1000 * 60 * 60)) % 24) : 0;
    const minutes = total > 0 ? Math.floor((total / 1000 / 60) % 60) : 0;
    const seconds = total > 0 ? Math.floor((total / 1000) % 60) : 0;
    return { days, hours, minutes, seconds, total };
  }

  function getZero(number) {
    if (number >= 0 && number <= 9) return `0${number}`;
    return number;
  }

  function setClock() {
    const { days, hours, minutes, seconds, total } = timeRemaining();

    document.querySelector("#days").textContent = getZero(days);
    document.querySelector("#hours").textContent = getZero(hours);
    document.querySelector("#minutes").textContent = getZero(minutes);
    document.querySelector("#seconds").textContent = getZero(seconds);

    if (total < 1) {
      clearInterval(timeInterval);
    }
  }
  const timeInterval = setInterval(setClock, 1000);
  setClock();

  //
  class Menu {
    constructor(src, title, descr, price) {
      this.src = src;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.menu = document.querySelector("[data-menu]");
    }

    render() {
      const element = document.createElement("div");
      element.classList.add("menuItem");

      element.innerHTML = `
        <img src=${this.src} alt=${this.title} />
        <h3 class="menuItemSubtitle">${this.title}</h3>
        <div class="menuItemDescr">${this.descr}</div>
        <div class="menuItemDivider"></div>
        <div class="menuItemPrice">
          <div class="menuItemCost">Цена:</div>
          <div class="menuItemTotal"><span>${this.price}</span> грн/день</div>
        </div>`;
      this.menu.append(element);
    }
  }

  new Menu(
    "img/tabs/tab1.jpg",
    "Меню “Фитнес”",
    "Меню “Фитнес” - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    229
  ).render();

  new Menu(
    "img/tabs/tab2.jpg",
    "Меню “Премиум”",
    "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    550
  ).render();

  new Menu(
    "img/tabs/tab3.jpg",
    "Меню “Постное”",
    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    430
  ).render();

  //
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modalDialog");
    prevModalDialog.classList.add("hide");

    openModal();
    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modalDialog");
    thanksModal.innerHTML = `
      <div class="modalContent">
        <div data-close class="modalClose">&times;</div>
        <div class="modalTitle">${message}</div>
      </div>
    `;
    modal.append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 3000);
  }

  document.addEventListener("submit", (e) => {
    if (e.target.tagName === "FORM") {
      e.preventDefault();

      const request = new XMLHttpRequest();
      request.open("POST", "server.php");
      request.setRequestHeader("Content-type", "application/json");

      const data = new FormData(e.target);
      const object = {};
      data.forEach((value, key) => (object[key] = value));
      const json = JSON.stringify(object);
      request.send(json);

      request.addEventListener("load", () => {
        if (request.status === 200) {
          showThanksModal("Спасибо! Скоро мы с вами свяжемся");
          console.log(request.response);
        } else {
          showThanksModal("Что-то пошло не так...");
        }
        e.target.reset();
      });
    }
  });
});
