import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = (props) => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <h1>Log In</h1>
      <LogInForm />
    </>
  );
};

const LogInForm = (props) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData.username, formData.password);
      console.log('Log in successful', response);
      setErrors([]);

      navigate('/');
    } catch (error) {
      console.error('Error during login:', error.response.data);
      setErrors(error.response.data.error);
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
      <button type="submit">Submit</button>

      {errors && <p className="error">{errors}</p>}
    </form>
  );
};

export default Login;
