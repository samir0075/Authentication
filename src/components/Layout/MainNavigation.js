import { Link } from 'react-router-dom';
import { AuthAction } from '../../Store/AuthToken';
import { useDispatch, useSelector } from 'react-redux';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.AuthSlice.isLoggedIn);

  const handleLoggedOut = () => {
    dispatch(AuthAction.loggedOut());
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={handleLoggedOut}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
