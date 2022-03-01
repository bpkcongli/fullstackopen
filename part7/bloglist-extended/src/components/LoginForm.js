import React from 'react';

const LoginForm = (props) => {
  const {username, password, usernameHandler, passwordHandler, loginHandler} =
    props;

  return (
    <div>
      <form onSubmit={loginHandler}>
        <div>
          username
          <input
            id="usernameInput"
            type="text"
            value={username}
            onChange={usernameHandler}
          />
        </div>
        <div>
          password
          <input
            id="passwordInput"
            type="text"
            value={password}
            onChange={passwordHandler}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
