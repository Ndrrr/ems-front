import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [navigate, setNavigate] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Login submit');

    const {data} = await axios.post('auth/login', {
      email,
      password,
    });
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;

    setNavigate(true);
  }

  if(navigate) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
      <form className="form-signin" onSubmit={onSubmit}>
        <label htmlFor="inputEmail" className="sr-only">Email address</label>
        <input type="email" id="inputEmail" className="form-control"
               placeholder="Email address" required autoFocus
               onChange={e => setEmail(e.target.value)}></input>

        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input type="password" id="inputPassword" className="form-control"
               placeholder="Password" required
               onChange={e => setPassword(e.target.value)}></input>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    </div>
  );
}