import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';
import Blog from './Blog';


const env = {
  blog: {
    title: '75 WEB ANIMATION TOOLS YOU HAVE TO TRY',
    author: 'NATALY BIRCH',
    url: 'https://www.webdesignerdepot.com/2017/08/75-web-animation-tools-you-have-to-try',
    likes: 153,
    user: {
      name: 'Andrian',
    },
  },
};


describe('Blog component', () => {
  let container;
  const mockHandler = jest.fn();

  beforeEach(() => {
    ({container} = render(
        <Blog
          blog={env.blog}
          likesHandler={mockHandler}
          deleteHandler={() => {}}
        />,
    ));
  });

  test('by default, render only blog\'s title and author', () => {
    const blogHeader = container.querySelector('.blog-header');
    expect(blogHeader)
        .toHaveTextContent(`${env.blog.title} ${env.blog.author}`);

    const blogContent = container.querySelector('.blog-content');
    expect(blogContent).toBe(null);
  });

  test('when view button is clicked, render blog\'s url and likes', () => {
    const viewButton = screen.getByText('view');
    userEvent.click(viewButton);

    const blogUrl = container.querySelector('.blog-url');
    const blogLikes = container.querySelector('.blog-likes');
    expect(blogUrl).toHaveTextContent(env.blog.url);
    expect(blogLikes).toHaveTextContent(`likes ${env.blog.likes}`);
  });

  test(`when like button is clicked twice, the event handler that handle that
    action should be called twice too`, () => {
    const viewButton = screen.getByText('view');
    userEvent.click(viewButton);

    const likeButton = screen.getByText('like');
    userEvent.click(likeButton);
    userEvent.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
