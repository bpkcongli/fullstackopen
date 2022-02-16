import React, {useState, useEffect, useRef} from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import BlogsService from './services/blogs';
import LoginService from './services/login';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({});

  const blogFormRef = useRef();

  useEffect(() => {
    BlogsService.getAll().then((blogs) =>
      setBlogs(blogs),
    );
  }, []);

  useEffect(() => {
    const userFromLocal = JSON.parse(window.localStorage.getItem('user'));

    if (userFromLocal) {
      setUser(userFromLocal);
      BlogsService.setToken(userFromLocal.token);
    }
  }, []);

  const usernameHandler = (e) => setUsername(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);
  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const payload = {username, password};
      const user = await LoginService.login(payload);
      setUser(user);
      window.localStorage.setItem('user', JSON.stringify(user));
      BlogsService.setToken(user.token);
      setUsername('');
      setPassword('');
      setNotification({
        message: 'login successful',
        class: 'info',
      });
    } catch (err) {
      setNotification({
        message: err.message,
        class: 'error',
      });
    }

    setTimeout(() => setNotification({}), 3000);
  };

  const logoutHandler = () => {
    setUser(null);
    window.localStorage.removeItem('user');
    setNotification({
      message: 'logout successfull',
      class: 'info',
    });
    setTimeout(() => setNotification({}), 3000);
  };

  const addingBlog = async ({title, author, url}) => {
    const payload = {title, author, url};
    const savedBlog = await BlogsService.add(payload);
    setBlogs(blogs.concat(savedBlog));
    blogFormRef.current.loginVisibleHandler();
    setNotification({
      message: `a new blog ${title} by ${author} added`,
      class: 'info',
    });
    setTimeout(() => setNotification({}), 3000);
  };

  const likesHandler = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const payload = {likes: blog.likes + 1};
    const updatedBlog = {
      ...blog,
      ...payload,
    };
    setBlogs(blogs.map((blog) => blog.id === id ? updatedBlog : blog));
    await BlogsService.update(id, payload);
  };

  const deleteHandler = async (id) => {
    const {title, author} = blogs.find((blog) => blog.id === id);
    const isDelete = window.confirm(`Remove blog ${title} by ${author}`);

    if (isDelete) {
      try {
        await BlogsService.delete(id);
        setBlogs(blogs.filter((blog) => blog.id !== id));
        setNotification({
          message: `a blog ${title} by ${author} successfully deleted`,
          class: 'info',
        });
      } catch (err) {
        setNotification({
          message: 'failed to delete a blog',
          class: 'error',
        });
      }
      setTimeout(() => setNotification({}), 3000);
    }
  };

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>
        {(user === null) ? 'log in to application' : 'blogs'}
      </h2>
      <div
        className={
          (notification.class) ?
            `notification-${notification.class}` : 'hidden'
        }>
        {notification.message}
      </div>
      {
        (user === null) ?
          <div>
            <LoginForm
              username={username}
              password={password}
              usernameHandler={usernameHandler}
              passwordHandler={passwordHandler}
              loginHandler={loginHandler}
            />
          </div> :
          <div>
            <p>
              {user.name} logged-in
              <button type="button" onClick={logoutHandler}>logout</button>
            </p>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
              <BlogForm addingBlog={addingBlog} />
            </Togglable>
            {sortedBlogs.map((blog) =>
              <Blog
                key={blog.id}
                blog={blog}
                likesHandler={likesHandler}
                deleteHandler={deleteHandler}
              />,
            )}
          </div>
      }
    </div>
  );
};

export default App;
