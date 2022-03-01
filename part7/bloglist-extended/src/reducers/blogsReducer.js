import {createSlice} from '@reduxjs/toolkit';
import BlogsService from '../services/blogs';
import {setNotification, resetNotification} from './notificationReducer';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    set(_, action) {
      return action.payload;
    },
    append(state, action) {
      return [...state, action.payload];
    },
    update(state, action) {
      const {id, payload} = action.payload;
      return state.map((blog) => {
        return blog.id === id ? {...blog, ...payload} : blog;
      });
    },
    remove(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

const {set, append, update, remove} = blogsSlice.actions;
export default blogsSlice.reducer;

export const initiateBlogs = () => {
  return async (dispatch) => {
    const blogs = await BlogsService.getAll();
    dispatch(set(blogs));
  };
};

export const addingBlog = (payload) => {
  return async (dispatch) => {
    const savedBlog = await BlogsService.add(payload);
    dispatch(append(savedBlog));
  };
};

export const likingBlog = (blogs, id) => {
  return async (dispatch) => {
    const blog = blogs.find((blog) => blog.id === id);
    const payload = {likes: blog.likes + 1};
    dispatch(update({id, payload}));
    await BlogsService.update(id, payload);
  };
};

export const deletingBlog = (id, title, author) => {
  return async (dispatch) => {
    try {
      await BlogsService.delete(id);
      dispatch(remove(id));
      dispatch(
        setNotification({
          message: `a blog ${title} by ${author} successfully deleted`,
          type: 'info',
        }),
      );
    } catch (_) {
      dispatch(
        setNotification({
          message: 'failed to delete a blog',
          type: 'error',
        }),
      );
    }
    setTimeout(() => dispatch(resetNotification()), 3000);
  };
};

export const addingComment = (id, content) => {
  return async (dispatch) => {
    const payload = await BlogsService.addComment(id, {content});
    dispatch(update({id, payload}));
  };
};
