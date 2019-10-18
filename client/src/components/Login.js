import React, {useState} from "react";
import {axiosWithAuth} from '../util/axiosWithAuth'

const Login = (props) => {

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const handleChanges = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const login = e => {
    e.preventDefault()
    axiosWithAuth()
      .post('/api/login', credentials)
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.payload)
        props.history.push('/bubble-page')
      })
      .catch(err => console.log(err.response))
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <form className="form-container" onSubmit={login}>
        <label className="username">
          Username:
          <input type='text' name='username' placeholder='Username' onChange={handleChanges} value={credentials.username} />
        </label>
        <label className="password" onChange={handleChanges} value={credentials.password}>
          Password:
          <input type='password' name='password' onChange={handleChanges} />
        </label>
        <button className='login-button'>Log in</button>
      </form>
    </>
  );
};

export default Login;
