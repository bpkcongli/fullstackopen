import React from 'react';
import {connect} from 'react-redux';

const Notification = ({message}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  return (
    message ?
      <div style={style}>
        {message}
      </div> :
      null
  );
};

const mapStateToProps = (state) => {
  return {
    message: state.notification.message,
  };
};

export default connect(mapStateToProps)(Notification);
