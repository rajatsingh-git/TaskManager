import React, { useState } from 'react';

export default function Login({ handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    const success = handleLogin(username, password);
    if (success) {
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
          <div className="card-header text-center">
            <h3>Log In</h3>
          </div>
          <div className="card-body">
            <form onSubmit={submitHandler}>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-user"></i></span>
                </div>
                <input 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text" 
                  className="form-control" 
                  placeholder="Username" 
                  required
                />
              </div>

              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-key"></i></span>
                </div>
                <input 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password" 
                  className="form-control" 
                  placeholder="Password"
                  required 
                />
              </div>

              <div className="row align-items-center remember">
                <input type="checkbox"/> Remember Me
              </div>

              <div className="form-group">
                <input type="submit" value="Login" className="btn btn-primary float-right login_btn"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
