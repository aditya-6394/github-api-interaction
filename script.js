import { Octokit } from "https://esm.sh/@octokit/core";

class GitHubAPI {
  constructor(accessToken, githubUsername) {
    this.octokit = new Octokit({ auth: accessToken });
    this.githubUsername = githubUsername;
  }

  async getProfile() {
    try {
      const response = await this.octokit.request("GET /user");
      const userData = response.data;
      const userFullName = userData.name || "Not provided";
      const userBio = userData.bio || "Not provided";
      const userLocation = userData.location || "Not provided";
      const userEmail = userData.email || "Not provided";
      const userWebsite = userData.blog || "Not provided";
      const githubJoinDate = new Date(userData.created_at).toLocaleDateString();
      const githubFollowers = userData.followers;
      const githubFollowing = userData.following;
      const publicRepos = userData.public_repos;
      const gitHubUrl = userData.html_url;

      document.getElementById("avatar").src = userData.avatar_url;
      document.getElementById("user-name").textContent = userData.login;
      document.getElementById("user-full-name").textContent = `${userFullName}`;
      document.getElementById("user-bio").textContent = `Bio: ${userBio}`;
      document.getElementById(
        "user-location"
      ).textContent = `Location: ${userLocation}`;
      document.getElementById("user-email").textContent = `Email: ${userEmail}`;
      document.getElementById(
        "user-website"
      ).textContent = `Website: ${userWebsite}`;
      document.getElementById(
        "github-join-date"
      ).textContent = `Joined GitHub: ${githubJoinDate}`;
      document.getElementById(
        "github-followers"
      ).textContent = `Followers: ${githubFollowers}`;
      document.getElementById(
        "github-following"
      ).textContent = `Following: ${githubFollowing}`;
      document.getElementById(
        "public-repos"
      ).textContent = `Public Repositories: ${publicRepos}`;
      document.getElementById("github-profile-link").href = gitHubUrl;
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }

  async listRepositories() {
    try {
      const timestamp = new Date().getTime();
      const response = await this.octokit.request(
        `GET /user/repos?timestamp=${timestamp}`
      );
      const repositories = response.data;
      const repositoryList = document.getElementById("repository-list");
      const updateRepoSelect = document.getElementById("update-repo-name");
      const deleteRepoSelect = document.getElementById("delete-repo-name");

      repositoryList.innerHTML = "";
      updateRepoSelect.innerHTML = "";
      deleteRepoSelect.innerHTML = "";

      repositories.forEach((repo) => {
        const card = document.createElement("div");
        card.classList.add("repository-card");

        const cardContent = document.createElement("div");
        cardContent.classList.add("repository-card-content");

        const repoName = document.createElement("h3");
        repoName.textContent = repo.name;
        cardContent.appendChild(repoName);

        if (repo.description) {
          const repoDescription = document.createElement("p");
          repoDescription.textContent = repo.description;
          cardContent.appendChild(repoDescription);
        }

        if (repo.updated_at) {
          const lastUpdated = document.createElement("p");
          const updatedAt = new Date(repo.updated_at).toLocaleString();
          lastUpdated.textContent = `Last Updated: ${updatedAt}`;
          cardContent.appendChild(lastUpdated);
        }

        card.appendChild(cardContent);
        repositoryList.appendChild(card);

        const option = document.createElement("option");
        option.value = repo.name;
        option.textContent = repo.name;
        updateRepoSelect.appendChild(option);
        deleteRepoSelect.appendChild(option.cloneNode(true));
      });
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  }

  async createRepository(name, description, isPrivate) {
    try {
      const response = await this.octokit.request("POST /user/repos", {
        name,
        description,
        private: isPrivate,
      });

      if (response.status === 201) {
        console.log("Repository created:", response.data);
        alert("Repository created successfully.");
        await this.listRepositories();
      } else {
        console.error("Error creating repository:", response.status);
      }
    } catch (error) {
      console.error("Error creating repository:", error);
    }
  }

  async updateRepository(oldName, newName, newDescription) {
    try {
      const response = await this.octokit.request(
        "PATCH /repos/{owner}/{repo}",
        {
          owner: this.githubUsername,
          repo: oldName,
          name: newName,
          description: newDescription,
        }
      );

      if (response.status === 200) {
        console.log("Repository updated:", response.data);
        alert("Repository updated successfully.");
        document.getElementById("new-repo-name").value = "";
        document.getElementById("new-repo-description").value = "";
        await this.listRepositories();
      } else {
        console.error("Error updating repository:", response.status);
      }
    } catch (error) {
      console.error("Error updating repository:", error);
    }
  }

  async deleteRepository(name) {
    try {
      const response = await this.octokit.request(
        "DELETE /repos/{owner}/{repo}",
        {
          owner: this.githubUsername,
          repo: name,
        }
      );

      if (response.status === 204) {
        console.log("Repository deleted:", name);
        alert("Repository deleted successfully.");

        document.getElementById("delete-repo-name").value = "";
        await this.listRepositories();
      } else {
        console.error("Error deleting repository:", response.status);
      }
    } catch (error) {
      console.error("Error deleting repository:", error);
    }
  }
}

// Fetch user profile and list repositories
async function main() {
  const githubUsername = "1bi0";
  const accessToken = "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";
  const githubApi = new GitHubAPI(accessToken, githubUsername);
  await githubApi.getProfile();
  await githubApi.listRepositories();

  // Event listener for creating a new repository
  document
    .getElementById("create-repo-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const repoName = document.getElementById("repo-name").value;
      const repoDescription = document.getElementById("repo-description").value;
      const isPrivate = document.getElementById("repo-private").checked;
      githubApi.createRepository(repoName, repoDescription, isPrivate);
    });

  // Event listener for updating a repository
  document
    .getElementById("update-repo-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const oldName = document.getElementById("update-repo-name").value;
      const newName = document.getElementById("new-repo-name").value;
      const newDescription = document.getElementById(
        "new-repo-description"
      ).value;
      githubApi.updateRepository(oldName, newName, newDescription);
    });

  // Event listener for deleting a repository
  document
    .getElementById("delete-repo-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const repoName = document.getElementById("delete-repo-name").value;
      githubApi.deleteRepository(repoName);
    });

  setInterval(() => {
    document.getElementById("time").innerHTML = Date();
  }, 1000);
}

main();
