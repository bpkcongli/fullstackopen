const countBy = require('lodash/countBy');
const maxBy = require('lodash/maxBy');
const sumBy = require('lodash/sumBy');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return sumBy(blogs, 'likes');
};

const favoriteBlog = (blogs) => {
  const likesArr = blogs.map((blog) => blog.likes);
  const mostLikes = Math.max(...likesArr);
  const {title, author, likes} = blogs.find((blog) => blog.likes === mostLikes);
  return {title, author, likes};
};

const mostBlogs = (blogsArr) => {
  const authors = blogsArr.map((blog) => blog.author);
  const authorsTotalBlogs = Object.entries(countBy(authors));
  const [author, blogs] = maxBy(authorsTotalBlogs, (a) => a[1]);
  return {author, blogs};
};

const mostLikes = (blogs) => {
  const authors = blogs.map((blog) => blog.author);
  const authorsTotalLikes = [];
  authors.forEach((author) => {
    const likes = blogs
        .map((blog) => (blog.author === author) ? blog.likes : 0)
        .reduce((prev, curr) => prev + curr, 0);
    authorsTotalLikes.push({author, likes});
  });
  return maxBy(authorsTotalLikes, (o) => o.likes);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
