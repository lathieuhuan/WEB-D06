(() => {
  const token = localStorage.getItem("token");
  if (token) {
    callApi("/auth/check-token", "POST", { token })
      .then((res) => {
        if (res.status === 200) return res.json();
        throw res;
      })
      .then(({ username, uid }) => {
        // render login
        const newPost = document.querySelector("#new-post");
        newPost.removeAttribute("hidden");
        const account = document.querySelector("#account");
        account.href = "profile/" + uid;
        account.innerText = username;
        const logBtn = document.querySelector("#log-in-out");
        logBtn.href = "";
        logBtn.innerText = "Logout";

        const logout = (e) => {
          e.preventDefault();
          localStorage.removeItem("token");
          if (location.pathname === "/posts/new") {
            location.assign("/");
          } else {
            // render logout
            newPost.setAttribute("hidden", true);
            account.href = "/auth/register";
            account.innerText = "New User";
            logBtn.href = "/auth/login";
            logBtn.innerText = "Login";
            logBtn.removeEventListener("click", logout);
          }
        };
        logBtn.addEventListener("click", logout);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const loginForm = document.querySelector("#login-form");
  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const loginInfo = {
      email: loginForm.email.value,
      password: loginForm.password.value,
    };
    callApi("/users/login", "POST", loginInfo)
      .then(async (res) => {
        const data = await res.json();
        return { status: res.status, ...data };
      })
      .then((res) => handleResponse(res, "login"))
      .catch((err) => console.log(err));
  });

  const registerForm = document.querySelector("#register-form");
  registerForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const userInfo = {
      username: registerForm.username.value,
      email: registerForm.email.value,
      password: registerForm.password.value,
    };
    callApi("/users/new", "POST", userInfo)
      .then(async (res) => {
        const data = await res.json();
        return { status: res.status, ...data };
      })
      .then((res) => handleResponse(res, "register"))
      .catch((err) => console.log(err));
  });

  function handleResponse(res, type) {
    if (res.status === 200) {
      localStorage.setItem("token", res.token);
      location.assign("/");
    } else if ([400, 401, 404].includes(res.status)) {
      const error = document.querySelector(`#${type}-error`);
      error.innerHTML = res.errors.join("<br>");
    }
  }

  const postForm = document.querySelector("#post-form");
  if (postForm && token) {
    const textarea = document.createElement("textarea");
    textarea.hidden = true;
    textarea.name = "token";
    textarea.value = token;
    postForm.appendChild(textarea);
  }

  document.querySelector("#filter-input")?.addEventListener("input", (e) => {
    const userList = document.querySelector("#users-list");
    for (const elmt of [...userList.children]) {
      const username = elmt.getAttribute("data-name").toLowerCase();
      if (username.startsWith(e.target.value.toLowerCase())) {
        elmt.classList.replace("d-none", "d-flex");
      } else {
        elmt.classList.replace("d-flex", "d-none");
      }
    }
  });

  document.querySelector("#users-list")?.addEventListener("click", (e) => {
    const username = e.target.getAttribute("data-name");
    const token = localStorage.getItem("token");
    if (username) {
      const _id = e.target.getAttribute("data-uid");
      callApi(`/users/search/${_id}`, "POST", { token })
        .then((res) => res.json())
        .then((res) => console.log(res));
    }
  });

  async function callApi(endpoint, method = "GET", reqData = {}, params) {
    const settings = { method };
    if (method !== "GET") {
      settings.body = JSON.stringify(reqData);
      settings.headers = {
        "Content-Type": "application/json",
      };
    } else if (method === "GET") {
      settings.headers = reqData;
    }
    return await fetch(
      `http://localhost:3000${endpoint}${params ? "?" + params : ""}`,
      settings
    );
  }
})();
