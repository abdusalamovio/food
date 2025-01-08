window.addEventListener("DOMContentLoaded", () => {
  // modal
  const modal = document.querySelector(".modal");
  const openModalBtn = document.querySelectorAll("[data-modal]");
  const closeModalBtn = document.querySelector("[data-close]");

  const openModal = () => {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  };
  openModalBtn.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  };
  closeModalBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closeModal();
    }
  });

  const showModalByScroll = () => {
    const scrollPosition =
      window.scrollY + document.documentElement.clientHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollPosition > documentHeight - 1) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  };
  window.addEventListener("scroll", showModalByScroll);

  // tabs
  const tabContent = document.querySelectorAll(".tabContent");
  const tabParent = document.querySelector(".tabHeaderItems");
  const tabs = document.querySelectorAll(".tabHeaderItem");

  const hideTabContent = () => {
    tabContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabs.forEach((item) => {
      item.classList.remove("tabHeaderItemActive");
    });
  };
  hideTabContent();

  const showTabContent = (index = 0) => {
    tabContent[index].classList.add("show", "fade");
    tabContent[index].classList.remove("hide");

    tabs[index].classList.add("tabHeaderItemActive");
  };
  showTabContent();

  tabParent.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.classList.contains("tabHeaderItem")) {
      tabs.forEach((item, index) => {
        if (target == item) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });

  // timer
  const getTimeRemaining = () => {
    const total = new Date("2025-05-20") - new Date();
    if (total > 0) {
      const days = Math.floor(total / (1000 * 60 * 60 * 24));
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const seconds = Math.floor((total / 1000) % 60);
      return { days, hours, minutes, seconds, total };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const getZero = (number) => {
    if (number >= 0 && number <= 9) return `0${number}`;
    return number;
  };

  const updateClock = () => {
    const { days, hours, minutes, seconds, total } = getTimeRemaining();

    document.querySelector("#days").textContent = getZero(days);
    document.querySelector("#hours").textContent = getZero(hours);
    document.querySelector("#minutes").textContent = getZero(minutes);
    document.querySelector("#seconds").textContent = getZero(seconds);

    if (total < 1) {
      clearInterval(timeInterval);
    }
  };
  const timeInterval = setInterval(updateClock, 1000);

  updateClock();
});
