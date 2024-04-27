<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<div align="center">
  <!-- <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

<h3 align="center">D&D Social Inventory</h3>

  <p align="center">
    This project showcases a Dungeons & Dragons inventory client application built with React and Material UI. Create items, manage your character inventory, keep track of your gold, and view items/inventories of other users!
    <br />
    <!-- <a href="https://github.com/github_username/repo_name"><strong>Explore the docs »</strong></a>
    <br /> -->
    <br />
    <a href="https://inventory-client-plum.vercel.app/">View Demo</a>
    <!-- ·
    <a href="https://github.com/snaeem3/inventory-api/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/snaeem3/inventory-api/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a> -->
  </p>
</div>

![home page](https://github.com/snaeem3/inventory-client/assets/11710951/badb6a86-4780-4395-9c1a-5ed5c1a99fbd)

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#project-links">Project Links</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#planned-features">Planned Features</a></li>
    <li><a href="#skills-involved-with-this-project">Skills Involved with this project</a></li>
    <li><a href="#installation">Installation</a></li>
  </ol>
</details>

## Project Links

**Live view:** [inventory-client-plum.vercel.app/](https://inventory-client-plum.vercel.app/)

NodeJS Backend: [github.com/snaeem3/inventory-api](https://github.com/snaeem3/inventory-api)

This project was inspired by a previous application: [github.com/snaeem3/inventory-application](https://github.com/snaeem3/inventory-application)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features

💼 **User Account Management:** Sign up and manage your account, enabling you to add items from the catalog to your personal inventory

📦 **Effortless Inventory Management:** Seamlessly manage your items and their quantities from the dedicated inventory page

⚔️ **Equipment Tracking:** Quickly equip and unequip items to monitor your character's active gear and possessions

💰 **Gold Management:** Utilize the Gold tracker to efficiently manage your gold reserves, keeping track of your wealth

📜 **Transaction History:** Create and log gold transactions to remember when and where your wealth is going

🛠️ **Custom Item Creation:** Craft custom items for yourself or share them with friends

👥 **Social Interaction:** Explore the inventories of friends and other users

![item detail](https://github.com/snaeem3/inventory-client/assets/11710951/a1538abf-9ed0-4090-961a-aa78aea97200)

![gold](https://github.com/snaeem3/inventory-client/assets/11710951/87d08d31-1e66-43c5-b5e4-2da29110efea)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Planned Features

- Parties
  - Create and join a party to view items carried by your friends
  - Utilize a group treasury to manage your party's gold
  - Easily track the total quantity of specific items (e.g. health potions)
- Inventory Organization
  - Custom categories/tags
  - Favorite items
  - Mark items as private
  - Item groups/folders
- User interaction
  - Favorite/follow other users
  - Transactions to transfer gold to other players

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Skills involved with this project:

- ReactJS & Javascript
  - Authentication management
    - Sign up, Log in, and Log out functionality
    - `createContext` and `useAuth` providers/hooks to store local user auth data
    - [jwtDecode](https://www.npmjs.com/package/jwt-decode) to store and manage [JSON web tokens](https://jwt.io/) from the server
  - [Axios](https://www.npmjs.com/package/axios?activeTab=readme) to communicate with the NodeJS server
    - `GET`, `POST`, `PUT`, and `DELETE` requests
    - Axios interceptor to include token information when sending a request
    - Async error handling
  - React Hooks
    - `useState`
    - `useEffect`
  - [React Router](https://reactrouter.com/en/main) (`BrowserRouter`, `Routes`, `Route`, `Link`, etc.) for handling navigation and routing within the application.
    - Protected Routes to limit access of specified pages to authorized users
    - `useLocation` to transfer data from the previous page to the new page
  - Image uploading for profile pictures and items
  - React functional components
  - Conditional rendering based on log-in status, admin status, etc.
  - Javascript Object Array methods- `map`, `includes`, `sort`, `every`, etc.
- [Material UI](https://mui.com/material-ui/) styled components
  - `ThemeProvider` and `useTheme` for managing global colors/styles
  - Responsive design for mobile and desktop use
- [JSDoc](https://jsdoc.app/) to document components and functions
- App deployment with [Vercel](https://vercel.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Installation:

1. Clone the repository:

   ```bash
   git clone git@github.com:snaeem3/inventory-client.git
   ```

2. Navigate to the project directory:

   ```bash
   cd inventory-client
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Update the `baseURL` variable in `src/config.js` with the URL of your api server

   ```javascript
   const config = {
     baseURL: "YOUR_URL_HERE",
   };
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to view the application.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/snaeem3/inventory-client.svg?style=for-the-badge
[contributors-url]: https://github.com/snaeem3/inventory-client/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/snaeem3/inventory-client.svg?style=for-the-badge
[forks-url]: https://github.com/snaeem3/inventory-client/network/members
[stars-shield]: https://img.shields.io/github/stars/snaeem3/inventory-client.svg?style=for-the-badge
[stars-url]: https://github.com/snaeem3/inventory-client/stargazers
[issues-shield]: https://img.shields.io/github/issues/snaeem3/inventory-client.svg?style=for-the-badge
[issues-url]: https://github.com/snaeem3/inventory-client/issues
