window.addEventListener("DOMContentLoaded", () => {
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
});
