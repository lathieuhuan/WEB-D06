export default function User({ login, avatar_url, email, company, followers }) {
  return `
    <div id="user">
      <div id="user-info">
        <a href="https://github.com/${login}" target="_blank">
          <button class="action-btn"><i class="fa-brands fa-github"></i></button>
        </a>
        <h1>${login}</h1>
        <p>Email: ${email || "None"}</p>
        <p>Company: ${company || "None"}</p>
        <p>Followers: ${followers || "None"}</p>
      </div>
      <div>
        <img src="${avatar_url}" alt="avatar" />
      </div>
    </div>
  `;
}
