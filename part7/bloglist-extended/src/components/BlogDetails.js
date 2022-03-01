import React, {useState} from 'react';

const BlogDetail = ({
  blog = {},
  likeHandler,
  deleteHandler,
  addingCommentHandler,
}) => {
  const [comment, setComment] = useState('');

  const addingComment = () => {
    addingCommentHandler(id, comment);
    setComment('');
  };

  const {id, title, url, likes, user, comments = []} = blog;

  return (
    <div>
      <div className="blog-detail">
        <h2>{title}</h2>
        <a href={url}>{url}</a>
        <br />
        <span>{likes} likes</span>
        <button type="button" onClick={() => likeHandler(id)}>
          like
        </button>
        <br />
        <span>added by {user ? user.name : null}</span>
        <br />
        <button type="button" onClick={() => deleteHandler(id)}>
          remove
        </button>
      </div>
      <div className="blog-comments">
        <h3>comments</h3>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="button" onClick={addingComment}>
          add comment
        </button>
        {comments.length > 0 ? (
          <ul>
            {comments.map(({content, id}) => (
              <li key={id}>{content}</li>
            ))}
          </ul>
        ) : (
          <p>No comments found.</p>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
