import React, {useState} from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({addingBlog}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const titleHandler = (e) => setTitle(e.target.value);
  const authorHandler = (e) => setAuthor(e.target.value);
  const urlHandler = (e) => setUrl(e.target.value);

  const addingBlogHandler = async (e) => {
    e.preventDefault();

    await addingBlog({title, author, url});
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addingBlogHandler}>
        <div>
          title:
          <input
            id="blogTitleInput"
            type="text"
            value={title}
            onChange={titleHandler}
          />
        </div>
        <div>
          author:
          <input
            id="blogAuthorInput"
            type="text"
            value={author}
            onChange={authorHandler}
          />
        </div>
        <div>
          url:
          <input
            id="blogUrlInput"
            type="text"
            value={url}
            onChange={urlHandler}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  addingBlog: PropTypes.func.isRequired,
};

export default BlogForm;
