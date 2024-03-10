import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { handleSignUp } from '../apiClient';
import Errors from '../components/Errors';

const Signup = (props) => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <h1>Sign Up</h1>
      <SignUpForm />
    </>
  );
};

const SignUpForm = (props) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await handleSignUp(formData);

      console.log(response);
      setErrors([]);
    } catch (error) {
      console.error('Error during registration:', error.response.data.errors);
      setErrors(error.response.data.errors.flat().map((err) => err.msg));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        name="username"
        placeholder="username@email.com"
        type="text"
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input name="password" type="password" onChange={handleChange} />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input name="confirmPassword" type="password" onChange={handleChange} />
      <button type="submit">Submit</button>
      {errors && <Errors errors={errors} />}
    </form>
  );
};

export default Signup;
