import { callApi, getLiveUserInfo, toPriceStr } from "./helpers.js";

let total = document.querySelector(".bottom > .price").innerHTML;
total = +total.replace(/\./g, "");

const list = document.getElementById("list");

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("primary-btn")) {
    const id = e.target.name;
    callApi("/cart", "PUT", {
      userInfo: getLiveUserInfo(),
      id,
      amount: 0,
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        throw res.json();
      })
      .then(({ changeAmount }) => {
        total += changeAmount;
        document.querySelector(".bottom > .price").innerHTML =
          toPriceStr(total);
        list.removeChild(document.querySelector(`#product_${id}`));
        if (!list.childNodes.length) {
          document
            .querySelector("main > .primary-btn")
            .classList.add("disabled");
        }
      })
      .catch((err) => {
        // xu ly loi
        console.log(err);
      });
  }
});
