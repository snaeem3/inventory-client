# D&D Social Inventory App

This project is a full-stack application designed to help Dungeons & Dragons players manage their character inventories and keep track of their gold.

**Live view:**

NodeJS Backend: [github.com/snaeem3/inventory-api](https://github.com/snaeem3/inventory-api)

This project was inspired by a previous application: [github.com/snaeem3/inventory-application](https://github.com/snaeem3/inventory-application)

## Features

💼 **User Account Management:** Sign up and manage your account, enabling you to add items from the catalog to your personal inventory.

📦 **Effortless Inventory Management:** Seamlessly manage your items and their quantities from the dedicated inventory page.

⚔️ **Equipment Tracking:** Quickly equip and unequip items to monitor your character's active gear and possessions.

💰 **Gold Management:** Utilize the Gold tracker to efficiently manage your gold reserves, keeping track of your wealth.

📜 **Transaction History:** Create and log gold transactions to remember when and where your wealth is going

🛠️ **Custom Item Creation:** Craft custom items for yourself or share them with friends.

👥 **Social Interaction:** Explore the inventories of friends and other users

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
  - Javascript Object Array methods- `map`, `includes`, `sort`, etc.
- [Material UI](https://mui.com/material-ui/) styled components
  - `ThemeProvider` and `useTheme` for managing global colors/styles
  - Responsive design for mobile and desktop use
- [JSDoc](https://jsdoc.app/) to document components and functions

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

4. Update `src/config.js` with the URL of your api server

```javascript
const config = {
  baseURL: "YOUR_URL_HERE",
};
```

6. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to view the application.
