import { toPriceStr, getInpAndBtn, getLiveUserInfo, callApi } from "./utils.js";

let total = 0;
export function renderTotal(changeAmount = 0) {
  total += changeAmount;
  document.querySelector("#total").innerText = toPriceStr(total);
}

export let cart = [];
export function renderCart(cartItems) {
  cart = cartItems.map(({ id, amount }) => ({ id, amount }));
  for (const item of cartItems) {
    total += item.amount * item.price;
    const [input, btn] = getInpAndBtn(item.id);
    input.value = item.amount.toString();
    btn.classList.add("disabled");
    btn.innerText = "DA THEM";
  }
  renderTotal();
}

export function renderUsername(userInfo) {
  document.querySelector("#username").innerText = userInfo.username;
  document.querySelector("#sign-io-btn").innerText = "Dang xuat";
}

export function renderLastBtn(id, value, btn) {
  const itemById = cart.find((item) => item.id === id);
  if (!itemById || itemById.amount !== value) {
    if (!itemById && !value) {
      btn.classList.add("disabled");
    } else {
      btn.classList.remove("disabled");
      if (itemById) {
        btn.innerText = "THAY DOI";
      }
    }
  } else if (itemById && itemById.amount === value) {
    btn.classList.add("disabled");
  }
}

export function addSignInOutListener() {
  document.querySelector("#sign-io-btn").addEventListener("click", (e) => {
    if (getLiveUserInfo()) {
      // sign out
      localStorage.removeItem("userInfo");
      total = 0;
      cart = [];
      document
        .querySelector("#topbar")
        .removeChild(document.querySelector("#cart_summarizer"));
      document.querySelector("#username").innerText = "";
      e.currentTarget.innerText = "Dang nhap";
      document.querySelectorAll(".amount").forEach((inp) => (inp.value = "0"));
      document.querySelectorAll(".last-btn").forEach((btn) => {
        btn.classList.add("disabled");
        btn.innerText = "THEM VAO GIO";
      });
    } else {
      makeSignInForm();
    }
  });
}

export function makeSignInForm() {
  const modal = document.createElement("div");
  modal.classList.add("modal", "flex-center");
  modal.addEventListener("click", (e) => {
    if (!e.target.closest(".modal_content")) {
      document.body.removeChild(modal);
    }
  });

  const content = document.createElement("div");
  content.classList.add("modal_content", "flex-col", "align-center");

  const inp = document.createElement("input");
  inp.setAttribute("placeholder", "Nhap username");

  const btn = document.createElement("button");
  btn.classList.add("secondary-btn");
  btn.innerText = "Dang nhap";
  btn.addEventListener("click", () => {
    callApi("/users", "POST", { username: inp.value })
      .then((res) => {
        if (res.status === 200) return res.json();
        throw res;
      })
      .then(({ userInfo, cartItems }) => {
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        addCartSummarizer();
        renderUsername(userInfo);
        renderCart(cartItems);
        document.body.removeChild(modal);
      })
      .catch((err) => {
        // handle error
        console.log(err);
      });
  });

  content.appendChild(inp);
  content.appendChild(btn);
  modal.appendChild(content);
  document.body.appendChild(modal);
}

export function addCartSummarizer() {
  const topbar = document.querySelector("#topbar");
  if (topbar) {
    const cs = document.createElement("div");
    cs.setAttribute("id", "cart_summarizer");
    cs.classList.add("flex", "align-center");

    const p = document.createElement("p");
    const span1 = document.createElement("span");
    span1.innerText = "0";
    span1.setAttribute("id", "total");
    const span2 = document.createElement("span");
    span2.innerText = "VND";
    p.appendChild(span1);
    p.appendChild(span2);

    const btn = document.createElement("button");
    btn.classList.add("fas", "fa-shopping-cart");
    btn.addEventListener("click", () => {
      const userInfo = getLiveUserInfo();
      if (!userInfo) return;
      // fake form to post => /checkout
      const myForm = document.createElement("form");
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

    cs.appendChild(p);
    cs.appendChild(btn);
    topbar.insertBefore(cs, document.querySelector("#account"));
  }
}
