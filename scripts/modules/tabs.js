function tabs(
  tabsContentSelector,
  tabsParentSelector,
  tabsSelector,
  activeClass
) {
  const tabContent = document.querySelectorAll(tabsContentSelector);
  const tabParent = document.querySelector(tabsParentSelector);
  const tabs = document.querySelectorAll(tabsSelector);

  function hideTabContent() {
    tabContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabs.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }
  hideTabContent();

  function showTabContent(index = 0) {
    tabContent[index].classList.add("show", "fade");
    tabContent[index].classList.remove("hide");

    tabs[index].classList.add(activeClass);
  }
  showTabContent();

  tabParent.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, index) => {
        if (e.target == item) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });
}

export default tabs;
