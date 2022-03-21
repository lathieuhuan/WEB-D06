(() => {
  const token = localStorage.getItem("token");
  if (token) {
    callApi("/auth/check-token", "POST", { token })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw res;
      })
      .then(({ username }) => {
        // render login
        const newPost = document.querySelector("#new-post");
        newPost.removeAttribute("hidden");
        const account = document.querySelector("#account");
        account.href = "/users/" + username;
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
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw res.status;
      })
      .then(({ token }) => {
        localStorage.setItem("token", token);
        location.assign("/");
      })
      .catch((err) => {
        const error = document.querySelector("#error");
        if (err === 401) {
          error.innerText = "Sai mat khau";
        } else if (err === 404) {
          error.innerText = "Tai khoan khong ton tai";
        }
      });
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
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw res.status;
      })
      .then(({ token }) => {
        localStorage.setItem("token", token);
        location.assign("/");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const postForm = document.querySelector("#post-form");
  if (postForm && token) {
    const textarea = document.createElement("textarea");
    textarea.hidden = true;
    textarea.name = "token";
    textarea.value = token;
    postForm.appendChild(textarea);
  }

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
})();
