import React, {useState} from 'react';
import PropTypes from 'prop-types';

const Blog = ({blog, likesHandler, deleteHandler}) => {
  const [detailVisible, setDetailVisible] = useState(false);
  const detailVisibleHandler = () => setDetailVisible(!detailVisible);

  const styles = {
    border: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
  };

  const {id, title, author, url, likes, user} = blog;
  const renderBlogDetail = () => {
    return (
      <div className="blog-content">
        <span className="blog-url">{url}</span>
        <br />
        <span className="blog-likes">likes {likes}</span>
        <button
          className="like-button"
          type="button"
          onClick={() => likesHandler(id)}>
          like
        </button>
        <br />
        {user.name}
        <br />
        <button type="button" onClick={() => deleteHandler(id)}>
          remove
        </button>
      </div>
    );
  };

  return (
    <article style={styles}>
      <span className="blog-header">{title} {author}</span>
      <button
        className="view-button"
        type="button"
        onClick={detailVisibleHandler}
      >{detailVisible ? 'hide' : 'view'}
      </button>
      {detailVisible ? renderBlogDetail() : null}
    </article>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likesHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default Blog;
