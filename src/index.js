import User from "./components/User.js";
import NotFound from "./components/NotFound.js";
import Followers from "./components/Followers.js";
import { getUserData } from "./utils.js";

const userSection = document.querySelector("#user_section");
const heading = document.querySelector("#followers-heading");
const followersList = document.querySelector("#followers-list");

handlePageLoad();
addListeners();

function handlePageLoad() {
  if (history.state) {
    if (history.state.length) {
      render(history.state);
    } else {
      userSection.innerHTML = followersList.innerHTML = ``;
      heading.setAttribute("hidden", true);
    }
  } else {
    // first time page load
    const username = new URLSearchParams(location.search).get("username");
    if (username) {
      searchAndDisplay(username, true);
    } else {
      history.replaceState([], "");
    }
  }
}

function addListeners() {
  const searchBtn = document.querySelector("#search-btn");
  const searchInput = document.querySelector("#search-input");

  searchBtn.addEventListener("mousedown", () => {
    searchBtn.classList.add("focused");
  });
  searchBtn.addEventListener("mouseup", () => {
    searchBtn.classList.remove("focused");
    searchAndDisplay(searchInput.value, false);
    searchInput.value = "";
  });
  searchBtn.addEventListener("mouseleave", () => {
    searchBtn.classList.remove("focused");
  });
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchAndDisplay(searchInput.value, false);
      searchInput.value = "";
    }
  });
  followersList.addEventListener("click", (e) => {
    const closest = e.target.closest(".follower");
    if (closest || e.target.className === "follower") {
      const followerName = (closest || e.target).getAttribute("data-username");
      searchAndDisplay(followerName);
    }
  });
  window.addEventListener("popstate", handlePageLoad);
}

function searchAndDisplay(name, isFirstTime) {
  if (name) {
    getUserData(name)
      .then((data) => {
        render(data);
        navigate(data, isFirstTime);
      })
      .catch(() => {
        userSection.innerHTML = NotFound(`No username matches "${name}"`);
        followersList.innerHTML = ``;
        heading.setAttribute("hidden", true);
      });
  }
}

function render(data) {
  userSection.innerHTML = User(data[0]);
  followersList.innerHTML = Followers(data[1]);
  heading.removeAttribute("hidden");
}

function navigate(data, isFirstTime) {
  const searchParams = "?username=" + data[0].login;
  if (isFirstTime) {
    history.replaceState(data, "");
  } else {
    history.pushState(data, "", searchParams);
  }
  document.title = "User - " + data[0].login;
}
