import { useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import axios from "axios";

const cookies = new Cookies();

export const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [navigate, setNavigate] = useState(false);

  if(cookies.get('access_token')) {
    return <Navigate to="/" />
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Register submit');

    await axios.post('auth/register', {
      firstName,
      lastName,
      email,
      password,
    });
    setNavigate(true);
  }
  if(navigate) {
    return <Navigate to="/login" />
  }

  return (
      <div className="container App-header">
        <h1 className="h3 mb-3 font-weight-normal text-center">Please sign up</h1>
        <form className="form-signin" onSubmit={onSubmit}>
          <label htmlFor="inputFirstName" className="sr-only">First Name</label>
          <input type="text" id="inputFirstName" className="form-control"
                 placeholder="First Name" required autoFocus
                 onChange={e => setFirstName(e.target.value)}/>

          <label htmlFor="inputLastName" className="sr-only">Last Name</label>
          <input type="text" id="inputLastName" className="form-control"
                 placeholder="Last Name" required autoFocus
                 onChange={e => setLastName(e.target.value)}/>

          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input type="email" id="inputEmail" className="form-control"
                 placeholder="Email address" required autoFocus
                 onChange={e => setEmail(e.target.value)}/>

          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control"
                 placeholder="Password" required
                 onChange={e => setPassword(e.target.value)}/>

          <label htmlFor="inputPasswordConfirm" className="sr-only">Confirm Password</label>
          <input type="password" id="inputPasswordConfirm" className="form-control"
                 placeholder="Confirm Password" required
                 onChange={e => setPassword2(e.target.value)}/>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
        </form>
      </div>
  )
}