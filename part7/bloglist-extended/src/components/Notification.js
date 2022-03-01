import React from 'react';

const Notification = ({notification}) => {
  const {type, message} = notification;

  return (
    <div className={type ? `notification-${type}` : 'hidden'}>{message}</div>
  );
};

export default Notification;
