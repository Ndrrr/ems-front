import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

const logout = () => {
    cookies.remove("access_token");
    cookies.remove("refresh_token")
    axios.post("auth/logout");
    window.location.href = "/login";
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
    <Link to="/course" className="nav-link">
      My Courses
    </Link>
    </li>
    <li className="nav-item">
        <Link to="/quiz" className="nav-link">
            My Quizzes
        </Link>
    </li>
    <li className="nav-item">
    <a href="#" onClick={logout} className="nav-link">
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
          {cookies.get('access_token') ? userLink : loginRegLink}
        </div>
      </nav>
  )
}