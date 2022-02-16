import React, {useState, useImperativeHandle} from 'react';
import PropTypes from 'prop-types';

const Togglable = React.forwardRef((props, ref) => {
  const [loginVisible, setLoginVisible] = useState(false);
  const loginVisibleHandler = () => setLoginVisible(!loginVisible);

  const hideWhenVisible = {display: (loginVisible) ? 'none' : ''};
  const showWhenVisible = {display: (loginVisible) ? '' : 'none'};

  useImperativeHandle(ref, () => {
    return {
      loginVisibleHandler,
    };
  });

  return (
    <div className="togglable">
      <div style={hideWhenVisible} className="togglable-header">
        <button type="button" onClick={loginVisibleHandler}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="togglable-content">
        {props.children}
        <button type="button" onClick={loginVisibleHandler}>cancel</button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
