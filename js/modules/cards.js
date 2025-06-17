import { getResource } from "../services/services";

function cards() {
  getResource("http://localhost:3000/menu").then((data) => {
    createCard(data);

    function createCard(data) {
      data.forEach(({ img, alt, title, descr, price }) => {
        const elem = document.createElement("div");
        elem.classList.add("menuItem");

        elem.innerHTML = `
        <img src=${img} alt=${alt} />
        <h3 class="menuItemSubtitle">${title}</h3>
        <div class="menuItemDescr">${descr}</div>
        <div class="menuItemDivider"></div>
        <div class="menuItemPrice">
          <div class="menuItemCost">Цена:</div>
          <div class="menuItemTotal"><span>${price}</span> грн/день</div>
        </div>
        `;
        document.querySelector("[data-menu]").append(elem);
      });
    }
  });
}

export default cards;
