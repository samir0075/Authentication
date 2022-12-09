import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './ProfileForm.module.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
  const [password, setPassword] = useState('');

  const AuthToken = useSelector(state => state.AuthSlice.token);

  const history = useHistory();

  const handleChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCMQOwacc2zj8mu_5DB_VR5JkRP3xnwl9U',
        {
          idToken: AuthToken,
          password: password,
          returnSecureToken: false
        }
      )
      .then(res => {
        console.log(res.data);
        // setIsLoading(false);
        toast.success('Password Updated Successfully', {
          theme: 'colored',
          type: 'success'
        });
        history.replace('/');
      })
      .catch(err => {
        console.log(err);
        // setIsLoading(false);
        toast.error(err.response.data.error.message, {
          type: 'error',
          theme: 'colored'
        });
      });
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          required
          onChange={handleChange}
          value={password}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default ProfileForm;
