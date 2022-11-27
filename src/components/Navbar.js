import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

const logout = () => {
  axios.post("auth/logout");
}

const loginRegLink = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </li>
    </ul>
)

const userLink = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/profile" className="nav-link">
          User
        </Link>
      </li>
      <li className="nav-item">
        <a href="" onClick={logout} className="nav-link">
          Logout
        </a>
      </li>
    </ul>
)


export const Navbar = () => {
  return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark rounded">
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#main-navbar"
            aria-controls="main-navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
            className="collapse navbar-collapse justify-content-md-center"
            id="main-navbar"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
          {
            // change below refresh token
          }
          {cookies.get('refresh_token') ? userLink : loginRegLink}
        </div>
      </nav>
  )
}