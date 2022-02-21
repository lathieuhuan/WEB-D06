import NotFound from "./NotFound.js";

export default function Followers(list) {
  if (!list.length) {
    return NotFound("No Followers");
  }
  return list
    .map(
      ({ login, avatar_url }) => `
      <div class="item">
        <div class="follower" data-username="${login}">
          <img src="${avatar_url}" alt="small-avatar" />
          <p>${login}</p>
        </div>
      </div>
    `
    )
    .join("");
}
