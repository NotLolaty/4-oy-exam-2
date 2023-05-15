const list = document.querySelector(".cart__list");
const list2 = document.querySelector(".header__bottom-list");

let cart = JSON.parse(localStorage.getItem("cart"));
const totalPrice = document.querySelector(".total-price");

const category = [
  "Home",
  "Electronics",
  "Jewelery",
  "Men's clothing",
  "Women's clothing",
];
const renderCategory = () => {
  list2.innerHTML = category
    .map(
      (item) => `
      <li class="category__item">
      <h3 class="${item} category__title" id="${item}" data-id="${item}">${item}</h3>
      </li>
      `
    )
    .join("");
};
renderCategory();

const renderCart = () => {
  list.innerHTML = "";
  list.innerHTML = cart
    ?.map((item, i) => {
      let unitPrice = Number(cart[i].price);
      let all = total.textContent * 1;
      total.textContent = all + unitPrice;
      return `
      <li class="cart__item" id="${item}">
      <button class="remove" data-id="${item.id}">x</button>
        <div class="cart__img"
            <img class="heart" id="${item.id}" src="../img/hearts.svg"/>
            <img class="cart__img" src="${item.image}" data-id="${
        item.image
      }" alt="products"/>
        </div> 
        <p class="cart__text">${item.title.split(" ", 6) + "..."}</p>
         <ul class="cart__box">
            <li class="cart__price">
                <p class="price" data-id="${item.id}">${item.userPrice}$</p>
            </li>
            <li class="cart__price cart__price-box">
                <button class="cart__dec" data-id="${item.id}">--</button>
                <span class="cart__count" id="${item.id}">${
        item.userCount
      }</span>
                <button class="cart__inc" data-id="${item.id}">+</button>
            </li>
            <li class="cart__price right">
                <p class="unit__price">${item.price}$</p>
            </li>
         </ul>
    </li><hr>
    `;
    })
    .join("");
};

renderCart();

list.addEventListener("click", (e) => {
  if (e.target.matches(".cart__inc")) {
    let incId = e.target.dataset.id;
    if (incId) {
      cart.forEach((el) => {
        if (el.id == incId) {
          el.userCount += 1;
          el.userPrice = el.price * el.userCount;
        }
      });
    }
  } else if (e.target.matches(".cart__dec")) {
    let decId = e.target.dataset.id;
    if (decId) {
      cart.forEach((el) => {
        if (el.id == decId && el.userCount > 0) {
          el.userCount -= 1;
          el.userPrice = el.price * el.userCount;
        }
      });
    }
  } else if (e.target.matches(".remove")) {
    let cartCount;
    let remId = e.target.dataset.id;
    if (remId) {
      cart = cart.filter((item) => {
        if (item.id == remId) {
          cartCount = item.userCount;
        } else {
          return item;
        }
      });
    }
  }
  renderCart();
});
