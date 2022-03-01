import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import UsersService from '../services/users';

const User = () => {
  const [user, setUser] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    UsersService.getSpecificUser(id).then((user) => setUser(user));
  }, []);

  return user ? (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(({title, id}) => {
          return <li key={id}>{title}</li>;
        })}
      </ul>
    </div>
  ) : null;
};

export default User;
