document
  .getElementById("submitbtn")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const user = document.getElementById("lookup").value;
    fetchGitHubProfile(user);
  });

async function fetchGitHubProfile(user) {
  const profileDiv = document.getElementById("profileDiv");
  profileDiv.innerHTML = "";

  try {
    const response = await fetch(`https://api.github.com/users/${user}`);
    if (!response.ok) throw new Error("Profile not found");

    const profileData = await response.json();
    displayProfile(profileData);
  } catch (error) {
    profileDiv.innerHTML = `<p>${error}</p>`;
  }
}

function displayProfile(profile) {
  const profileHTML = `
  <div class="div0">
    <img src="${profile.avatar_url}" alt="Profile Image">
    <h>${profile.name || "No name provided"}</h>
    </div></br>
    <div class="div1">
      <p>User: ${profile.login}</p>
      <p>Followers: ${profile.followers}</p>
      <p>Public Repositories: ${profile.public_repos}</p>
      <a href="${
        profile.html_url
      }" target="_blank"><button class="linkbtn">Visit Profile</button></a>
    </div>
  `;
  document.getElementById("profileDiv").innerHTML = profileHTML;
}
