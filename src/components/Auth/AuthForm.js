import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from './AuthForm.module.css';
import { useDispatch } from 'react-redux';
import { AuthAction } from '../../Store/AuthToken';
import { useHistory } from 'react-router-dom';

const AuthForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const switchAuthModeHandler = () => {
    setIsLogin(prevState => !prevState);
  };

  let name, value;

  const handleChange = e => {
    // console.log(e.target.value);

    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };
  const submitHandler = e => {
    e.preventDefault();
    console.log(user);
    setIsLoading(true);

    if (isLogin) {
      axios
        .post(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCMQOwacc2zj8mu_5DB_VR5JkRP3xnwl9U',
          {
            email: user.email,
            password: user.password,
            returnSecureToken: true
          }
        )
        .then(res => {
          console.log(res.data);
          dispatch(AuthAction.loggedIn(res.data.idToken));
          localStorage.setItem('token', res.data.idToken);
          localStorage.setItem('isLoggedIn', true);
          setIsLoading(false);
          toast.success('Sign In Successfully', {
            theme: 'colored',
            type: 'success'
          });
          history.replace('/');
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
          toast.error(err.response.data.error.message, {
            type: 'error',
            theme: 'colored'
          });
        });
    } else {
      axios
        .post(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCMQOwacc2zj8mu_5DB_VR5JkRP3xnwl9U',
          {
            email: user.email,
            password: user.password,
            returnSecureToken: true
          }
        )
        .then(res => {
          console.log(res.data);
          setIsLoading(false);
          toast.success('Sign Up Successfully', {
            theme: 'colored',
            type: 'success'
          });
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
          toast.error(err.response.data.error.message, {
            type: 'error',
            theme: 'colored'
          });
        });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={user.email}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={user.password}
            required
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <CircularProgress color="secondary" />}

          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
        <ToastContainer />
      </form>
    </section>
  );
};

export default AuthForm;
