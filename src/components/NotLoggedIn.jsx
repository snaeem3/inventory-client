import { Link } from 'react-router-dom';

const NotLoggedIn = (props) => (
  <>
    <p>You must be logged in to view this page</p>
    <Link to="/log-in">
      <button type="button">Log In</button>
    </Link>
    <Link to="/sign-up">
      <button type="button">Sign up</button>
    </Link>
  </>
);

export default NotLoggedIn;
