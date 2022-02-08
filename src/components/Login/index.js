import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitLogin = async event => {
    event.preventDefault()

    const onLoginSuccess = jwtToken => {
      const {history} = this.props
      Cookies.set('jwt_token', jwtToken, {expires: 10})
      history.replace('/')
    }

    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const fetchedData = await response.json()
    if (response.ok) {
      onLoginSuccess(fetchedData.jwt_token)
    } else {
      this.setState({errorMsg: fetchedData.error_msg})
    }
  }

  render() {
    const {errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.onSubmitLogin}>
          <img
            className="login-app-logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
          <label className="login-label" htmlFor="username">
            USERNAME
          </label>
          <input
            className="login-input"
            type="text"
            id="username"
            placeholder="Username"
            onChange={this.onChangeUsername}
          />
          <label className="login-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            className="login-input"
            type="password"
            id="password"
            placeholder="Password"
            onChange={this.onChangePassword}
          />
          <button className="login-button" type="submit">
            Login
          </button>
          {errorMsg && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
