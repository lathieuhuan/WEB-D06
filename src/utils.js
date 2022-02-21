export function getUserData(username) {
  const api = "https://api.github.com/users/" + username;
  const user = getData(api);
  const followers = getData(api + "/followers");
  return Promise.all([user, followers]);
}

function getData(url) {
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.response);
        if (url.slice(-9) === "followers") {
          data = data.map(({ login, avatar_url }) => ({ login, avatar_url }));
          res(data);
        } else {
          const { login, avatar_url, email, company, followers } = data;
          res({ login, avatar_url, email, company, followers });
        }
      } else {
        rej(xhr.status);
      }
    };
    xhr.onerror = () => {
      rej(xhr.status);
    };
    xhr.open("GET", url);
    xhr.send();
  });
}
