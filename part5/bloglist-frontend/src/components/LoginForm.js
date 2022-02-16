import React from 'react';

const LoginForm = (props) => {
  const {
    username,
    password,
    usernameHandler,
    passwordHandler,
    loginHandler,
  } = props;

  return (
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
  );
};

export default LoginForm;
