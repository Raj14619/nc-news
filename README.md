# NC News Frontend

Welcome to NC News Frontend! This project is a front-end web application that allows users to browse and interact with articles and comments from the NC News API. The app provides a user-friendly interface to view articles, vote on them, post comments, and perform other related actions.

## Deployed Version

You can access the deployed version of the app by following this link: [NC News Frontend](https://majestic-sunburst-5905cb.netlify.app/)

## General Info

NC News Frontend is built using React.js and styled with CSS. It consumes data from the NC News API, which is hosted separately on the backend.

## How to Use

1. Upon visiting the app, you'll see a list of articles displayed on the homepage. You can click on any article to view its details, including the full content and comments.

2. To interact with the articles, you can upvote or downvote them by clicking the respective buttons.

3. You can also post your comments on an article by navigating to the article details page and using the comment form at the bottom.

4. To explore different topics, you can use the navigation bar at the top, which lists all available topics. Clicking on a topic will filter the articles based on the selected category.

## Backend Repository

To see the code for the backend server/API that powers this app, you can visit the following repository: [NC News Backend GitHub](https://github.com/Raj14619/be-nc-news/).

## Local Development Requirements

Before running the project locally, ensure you have the following installed:

- Node.js (Minimum version required: 12.0.0)

You can check your Node version by running the following command in your terminal:

```bash
node --version
```

## Running the Project Locally

To run the NC News Frontend on your local machine, follow these steps:

1. Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/Raj14619/nc-news/
```

2. Navigate to the project directory:

```bash
cd nc-news
```

3. Install the required dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

5. The app should now be running on your local server at `http://localhost:port`.

Now, you can play around with the app locally and test its features.

Please note that the app will make API requests to the backend, so make sure the backend server is also running and accessible.

If you encounter any issues or have any questions, feel free to raise an issue on the GitHub repository. Happy coding!
