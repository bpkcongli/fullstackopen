import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const Blog = ({blog}) => {
  const styles = {
    border: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
  };

  const {id, title, author} = blog;

  return (
    <article style={styles}>
      <span className="blog-header">
        <Link to={`/blogs/${id}`}>
          {title} {author}
        </Link>
      </span>
    </article>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
