import {
  getLiveUserInfo,
  getInpAndBtn,
  toPriceStr,
  callApi,
} from "./helpers.js";

// mo phong nguoi dung da dang nhap
if (!localStorage.getItem("userInfo")) {
  localStorage.setItem("userInfo", JSON.stringify({ uid: "A" }));
}

let total = 0;
function renderTotal() {
  document.querySelector("#total").innerHTML = toPriceStr(total);
}

let cart = [];
(() => {
  const userInfo = getLiveUserInfo();
  if (!userInfo) return;
  callApi("/cart/" + userInfo.uid, "GET")
    .then((res) => {
      if (res.status === 200) return res.json();
      throw res.status;
    })
    .then(({ cartItems }) => {
      cart = cartItems.map(({ id, amount }) => ({ id, amount }));
      for (const item of cartItems) {
        total += item.amount * item.price;
        const [input, btn] = getInpAndBtn(item.id);
        input.value = item.amount.toString();
        btn.innerHTML = "DA THEM";
      }
      renderTotal();
    })
    .catch((err) => {
      // xu ly loi
    });
})();

// handle button click: tang, giam, them/thay doi
document.querySelector("#shelf").addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  const hasClass = (cnam) => e.target.classList.contains(cnam);
  if (card && hasClass("primary-btn")) {
    const id = card.getAttribute("data-id");
    if (hasClass("amount-btn")) {
      const doIncrease = e.target.getAttribute("data-action") === "increase";
      changeInputByAmount(id, doIncrease ? 1 : -1);
    } else if (hasClass("last-btn")) {
      addOrChange(id);
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
  callApi("/cart", "POST", { userInfo: getLiveUserInfo(), id, amount })
    .then((res) => {
      if (res.status === 200) return res.json();
      throw res.json();
    })
    .then(({ addAmount }) => {
      total += addAmount;
      cart.push({ id, amount });
      renderTotal();
      btn.classList.add("disabled");
      btn.innerHTML = "DA THEM";
    })
    .catch((err) => {
      // xu ly loi
      console.log(err.message);
    });
}
function changeItemAmount(id, amount, itemIndex, btn) {
  callApi("/cart", "PUT", { userInfo: getLiveUserInfo(), id, amount })
    .then((res) => {
      if (res.status === 200) return res.json();
      throw res.json();
    })
    .then(({ changeAmount }) => {
      total += changeAmount;
      if (amount) {
        cart[itemIndex].amount = amount;
        btn.innerHTML = "DA THAY DOI";
      } else {
        cart.splice(itemIndex, 1);
        btn.innerHTML = "THEM VAO GIO";
      }
      renderTotal();
      btn.classList.add("disabled");
    })
    .catch((err) => {
      // xu ly loi
      console.log(err.message);
    });
}

// handle amount input change
document.querySelectorAll(".amount").forEach((inpElmt) => {
  inpElmt.addEventListener("input", (e) => {
    const [, btn] = getInpAndBtn(e.target.name);
    renderLastBtn(e.target.name, +e.target.value, btn);
  });
});

//
document.querySelector(".fa-shopping-cart").addEventListener("click", () => {
  const userInfo = getLiveUserInfo();
  if (!userInfo) return;
  const myForm = document.createElement("FORM");
  myForm.setAttribute("hidden", "true");
  myForm.setAttribute("method", "POST");
  myForm.setAttribute("action", "/checkout");
  myForm.setAttribute("enctype", "/application/x-www-form-urlencoded");
  document.body.appendChild(myForm);
  const myInput = document.createElement("INPUT");
  myInput.setAttribute("type", "text");
  myInput.setAttribute("name", "uid");
  myInput.setAttribute("value", userInfo.uid);
  myForm.appendChild(myInput);
  myForm.submit();
});

// as name
function renderLastBtn(id, value, btn) {
  const itemById = cart.find((item) => item.id === id);
  if (!itemById || itemById.amount !== value) {
    if (!itemById && !value) {
      btn.classList.add("disabled");
    } else {
      btn.classList.remove("disabled");
      if (itemById) {
        btn.innerHTML = "THAY DOI";
      }
    }
  } else if (itemById && itemById.amount === value) {
    btn.classList.add("disabled");
  }
}
