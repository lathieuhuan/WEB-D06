import { getInpAndBtn, getLiveUserInfo, callApi } from "./utils.js";
import {
  addSignInOutListener,
  addCartSummarizer,
  renderUsername,
  renderCart,
  cart,
  renderTotal,
  renderLastBtn,
  makeSignInForm,
} from "./helpers.js";

(() => {
  addSignInOutListener();
  const userInfo = getLiveUserInfo();
  if (!userInfo) return;
  renderUsername(userInfo);
  addCartSummarizer();
  // get cart to render
  callApi("/cart/" + userInfo.uid, "GET")
    .then((res) => {
      if (res.status === 200) return res.json();
      throw res;
    })
    .then(({ cartItems }) => renderCart(cartItems))
    .catch((err) => {
      // handle error
      console.log(err);
    });
})();

// handle button click: increase, decrease, add/change
document.querySelector("#shelf").addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  const hasClass = (cname) => e.target.classList.contains(cname);
  if (card && hasClass("primary-btn")) {
    const id = card.getAttribute("data-id");
    if (hasClass("amount-btn")) {
      const doIncrease = e.target.getAttribute("data-action") === "increase";
      changeInputByAmount(id, doIncrease ? 1 : -1);
    } else if (hasClass("last-btn")) {
      if (getLiveUserInfo()) {
        addOrChange(id);
      } else {
        makeSignInForm();
      }
    }
  }
});

function changeInputByAmount(id, amount) {
  const [input, btn] = getInpAndBtn(id);
  input.value = Math.max(+input.value + amount, 0);
  renderLastBtn(id, +input.value, btn);
}

function addOrChange(id) {
  const [input, btn] = getInpAndBtn(id);
  const amount = +input.value;
  // rui ro khi dung ban sao cart o FE (?)
  const itemIndex = cart.findIndex((item) => item.id === id);

  if (itemIndex === -1 && amount) {
    addNewItem(id, amount, btn);
  } else {
    if (!btn.classList.contains("disabled")) {
      changeItemAmount(id, amount, itemIndex, btn);
    }
  }
}
function addNewItem(id, amount, btn) {
  const userInfo = getLiveUserInfo();
  if (!userInfo) return;
  callApi("/cart", "POST", { userInfo, id, amount })
    .then((res) => {
      if (res.status === 200) return res.json();
      throw res.json();
    })
    .then(({ addAmount }) => {
      cart.push({ id, amount });
      renderTotal(addAmount);
      btn.classList.add("disabled");
      btn.innerText = "DA THEM";
    })
    .catch((err) => {
      // handle error
      console.log(err.message);
    });
}
function changeItemAmount(id, amount, itemIndex, btn) {
  const userInfo = getLiveUserInfo();
  if (!userInfo) return;
  callApi("/cart", "PUT", { userInfo, id, amount })
    .then((res) => {
      if (res.status === 200) return res.json();
      throw res;
    })
    .then(({ changeAmount }) => {
      if (amount) {
        cart[itemIndex].amount = amount;
        btn.innerText = "DA THAY DOI";
      } else {
        cart.splice(itemIndex, 1);
        btn.innerText = "THEM VAO GIO";
      }
      renderTotal(changeAmount);
      btn.classList.add("disabled");
    })
    .catch((err) => {
      // handle error
      console.log(err);
    });
}

// handle amount input change
document.querySelectorAll(".amount").forEach((inpElmt) => {
  inpElmt.addEventListener("input", (e) => {
    const [, btn] = getInpAndBtn(e.target.name);
    renderLastBtn(e.target.name, +e.target.value, btn);
  });
});
