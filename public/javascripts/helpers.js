export function getLiveUserInfo() {
  return JSON.parse(localStorage.getItem("userInfo"));
}

export function getInpAndBtn(id) {
  const targetElmt = (classname, name) =>
    document.querySelector(`.${classname}[name="${name}"]`);
  return [targetElmt("amount", id), targetElmt("last-btn", id)];
}

export function toPriceStr(n) {
  return n.toLocaleString().replace(/,/g, ".");
}

export async function callApi(endpoint, method = "GET", reqData = {}, params) {
  const settings = { method };
  if (method !== "GET") {
    settings.body = JSON.stringify(reqData);
    settings.headers = {
      "Content-Type": "application/json",
    };
  }
  return await fetch(
    `http://localhost:3000${endpoint}${params ? "?" + params : ""}`,
    settings
  );
}
