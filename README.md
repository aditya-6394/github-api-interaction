# GitHub API Interaction

This project demonstrates how to interact with the GitHub API using JavaScript. It allows you to perform various operations on your GitHub account, such as fetching your profile, listing repositories, creating new repositories, updating existing repositories, and deleting repositories.

## Prerequisites

Before you can run this project, you need to obtain a GitHub Personal Access Token. You can generate one by following these steps:

1. Go to your GitHub account settings.
2. Click on "Developer settings" in the left sidebar.
3. Click on "Personal access tokens" under "Access tokens."
4. Click the "Generate token" button and follow the prompts to create a new token.
5. Make sure to grant the necessary permissions (e.g., `user` and `repo`) depending on the operations you want to perform.

Copy the generated access token as you will need it to authenticate with the GitHub API.

## Usage

1. Clone this repository to your local machine:

```bash
git clone https://github.com/aditya-6394/github-api-interaction.git
```

2. Navigate to the project directory:

```bash
cd github-api-interaction
```

3. Open the index.html file in your web browser.

4. Fill in your GitHub Personal Access Token and GitHub username in the provided fields.

5. You can use the following features in the application:

-Profile: Click the "Get Profile" button to fetch and display your GitHub profile information.
-Repositories: Your repositories will be listed in a card format.
-Create Repository: Fill in the repository details and click the "Create Repository" button to create a new repository on your GitHub account.
-Update Repository: Fill in the existing repository name, new repository name, and description. Click the "Update Repository" button to make changes to an existing repository.
-Delete Repository: Enter the name of the repository you want to delete and click the "Delete Repository" button.
Note: Make sure you have a stable internet connection and that your Personal Access Token has the necessary permissions to perform these operations.

## Credits

This project uses the Octokit library to interact with the GitHub API. Octokit is a set of GitHub API clients for various programming languages.
