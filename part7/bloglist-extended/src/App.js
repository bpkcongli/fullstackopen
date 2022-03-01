import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate,
  Navigate,
} from 'react-router-dom';

import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetails';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import UserList from './components/UserList';
import User from './components/User';
import './App.css';

import BlogsService from './services/blogs';
import LoginService from './services/login';
import UsersService from './services/users';

import {
  setNotification,
  resetNotification,
} from './reducers/notificationReducer';
import {
  initiateBlogs,
  addingBlog,
  likingBlog,
  deletingBlog,
  addingComment,
} from './reducers/blogsReducer';
import {initiateUser, removeUser} from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const {user, notification} = useSelector((state) => state);
  const blogs = [...useSelector((state) => state.blogs)];
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const blogFormRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initiateBlogs());
  }, []);

  useEffect(() => {
    const userFromLocal = JSON.parse(window.localStorage.getItem('user'));

    if (userFromLocal) {
      dispatch(initiateUser(userFromLocal));
      BlogsService.setToken(userFromLocal.token);
    }
  }, []);

  useEffect(() => {
    UsersService.getAll().then((users) => setUsers(users));
  }, []);

  const usernameHandler = (e) => setUsername(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const payload = {username, password};
      const user = await LoginService.login(payload);
      dispatch(initiateUser(user));
      window.localStorage.setItem('user', JSON.stringify(user));
      BlogsService.setToken(user.token);
      setUsername('');
      setPassword('');
      dispatch(
        setNotification({
          message: 'login successful',
          type: 'info',
        }),
      );
    } catch (err) {
      dispatch(
        setNotification({
          message: err.message,
          type: 'error',
        }),
      );
    }

    setTimeout(() => dispatch(resetNotification()), 3000);
  };

  const logoutHandler = () => {
    dispatch(removeUser());
    window.localStorage.removeItem('user');
    dispatch(
      setNotification({
        message: 'logout successfull',
        type: 'info',
      }),
    );
    setTimeout(() => dispatch(resetNotification()), 3000);
    navigate('/');
  };

  const addingBlogHandler = async ({title, author, url}) => {
    const payload = {title, author, url};
    dispatch(addingBlog(payload));
    blogFormRef.current.loginVisibleHandler();
    dispatch(
      setNotification({
        message: `a new blog ${title} by ${author} added`,
        type: 'info',
      }),
    );
    setTimeout(() => dispatch(resetNotification()), 3000);
  };

  const likeHandler = async (id) => {
    dispatch(likingBlog(blogs, id));
  };

  const deleteHandler = async (id) => {
    const {title, author} = blogs.find((blog) => blog.id === id);
    const isDelete = window.confirm(`Remove blog ${title} by ${author}`);

    if (isDelete) {
      navigate('/');
      dispatch(deletingBlog(id, title, author));
    }
  };

  const addingCommentHandler = async (id, content) => {
    dispatch(addingComment(id, content));
  };

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
  const linkPadding = {padding: 5};
  const match = useMatch('/blogs/:id');
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  return (
    <div>
      <div className="nav-bar">
        <Link style={linkPadding} to="/">
          blogs
        </Link>
        <Link style={linkPadding} to="/users">
          users
        </Link>
        {user === null ? null : (
          <>
            <span style={linkPadding}>{user.name} logged-in</span>
            <button type="button" onClick={logoutHandler}>
              logout
            </button>
          </>
        )}
      </div>
      <h2>{user === null ? 'log in to application' : 'blog app'}</h2>
      <Notification notification={notification} />
      <Routes>
        <Route
          path="/users"
          element={
            user ? <UserList users={users} /> : <Navigate replace to="/" />
          }
        />
        <Route path="/users/:id" element={<User />} />
        <Route
          path="/blogs/:id"
          element={
            <BlogDetail
              blog={blog}
              likeHandler={likeHandler}
              deleteHandler={deleteHandler}
              addingCommentHandler={addingCommentHandler}
            />
          }
        />
        <Route
          path="/"
          element={
            user === null ? (
              <LoginForm
                username={username}
                password={password}
                usernameHandler={usernameHandler}
                passwordHandler={passwordHandler}
                loginHandler={loginHandler}
              />
            ) : (
              <div>
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                  <BlogForm addingBlog={addingBlogHandler} />
                </Togglable>
                <BlogList blogs={sortedBlogs} />
              </div>
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
