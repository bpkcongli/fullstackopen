import React from 'react';
import {Link} from 'react-router-dom';

const UserList = ({users}) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td>name</td>
            <td>blogs created</td>
          </tr>
        </thead>
        <tbody>
          {users.map(({id, name, blogs}) => {
            return (
              <tr key={id}>
                <td>
                  <Link to={`/users/${id}`}>{name}</Link>
                </td>
                <td>{blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
