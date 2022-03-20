(() => {
  const form = document.querySelector("#register-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const { username, email, password } = form;
    const userInfo = {
      username: username.value,
      email: email.value,
      password: password.value,
    };
    callApi("/users", "POST", userInfo)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw res.status;
      })
      .then(({ token }) => {
        localStorage.setItem("token", token);
        window.location.assign("/");
      })
      .catch((err) => {
        console.log(err);
      });
  });
})();

async function callApi(endpoint, method = "GET", reqData = {}, params) {
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
