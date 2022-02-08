import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/">
        <img
          className="header-logo"
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        />
      </Link>
      <div className="nav-content">
        <ul className="nav-menu-small">
          <li>
            <Link to="/">
              <AiFillHome className="header-icon" />
            </Link>
          </li>
          <li>
            <Link to="/jobs">
              <BsBriefcaseFill className="header-icon" />
            </Link>
          </li>
          <li>
            <button
              className="logout-button-small"
              type="button"
              onClick={onClickLogout}
            >
              <FiLogOut className="header-icon" />
            </button>
          </li>
        </ul>
        <ul className="nav-menu-large">
          <Link className="header-link-large" to="/">
            Home
          </Link>
          <Link className="header-link-large" to="/jobs">
            Jobs
          </Link>
        </ul>
      </div>
      <button
        className="logout-button-large"
        type="button"
        onClick={onClickLogout}
      >
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
