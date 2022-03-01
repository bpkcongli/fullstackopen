import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';
import BlogForm from './BlogForm';

const env = {
  title: '75 WEB ANIMATION TOOLS YOU HAVE TO TRY',
  author: 'NATALY BIRCH',
  url: 'https://www.webdesignerdepot.com/2017/08/75-web-animation-tools-you-have-to-try',
};

describe('BlogForm component', () => {
  test(`when form is submitted, the adding blog handler should received the
    appropriate argument`, () => {
    const mockHandler = jest.fn();
    const {container} = render(<BlogForm addingBlog={mockHandler} />);

    const blogTitleInput = container.querySelector('#blogTitleInput');
    const blogAuthorInput = container.querySelector('#blogAuthorInput');
    const blogUrlInput = container.querySelector('#blogUrlInput');
    const buttonSubmit = screen.getByRole('button');

    userEvent.type(blogTitleInput, env.title);
    userEvent.type(blogAuthorInput, env.author);
    userEvent.type(blogUrlInput, env.url);
    userEvent.click(buttonSubmit);

    expect(mockHandler.mock.calls[0]).toEqual([env]);
  });
});
