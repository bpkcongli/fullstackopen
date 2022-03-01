const env = {
  user: {
    username: 'testing',
    name: 'Testing User',
    password: 'supersecret',
  },
  otherUser: {
    username: 'testing2',
    name: 'Testing User 2',
    password: 'supersecret',
  },
  blogs: [
    {
      title: 'THE RESUME THAT GOT ME INTO FAANG !!',
      author: 'Riddhi Dutta',
      url: 'https://rite2riddhi.medium.com/the-resume-that-got-me-into-faang-ca168ac15df2',
    },
    {
      title: 'The Ultimate Engineer’s Guide to Code Refactoring',
      author: 'Alex Omeyer',
      url: 'https://medium.com/swlh/the-ultimate-engineers-guide-to-code-refactoring-c38372632906',
    },
  ],
};

describe('Blog List App', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3000/api/testing/reset');
    cy.visit('http://localhost:3000');
  });

  it('display login form by default', () => {
    cy.contains('log in to application');
    cy.get('#usernameInput').parent().contains('username');
    cy.get('#passwordInput').parent().contains('password');
    cy.get('button').contains('login');
  });

  describe('Login Functionality', () => {
    beforeEach(() => {
      cy.request('POST', 'http://localhost:3000/api/users', env.user);
    });

    it('succeeds with correct credentials', () => {
      cy.get('#usernameInput').type(env.user.username);
      cy.get('#passwordInput').type(env.user.password);
      cy.get('button').click();

      cy.contains(`${env.user.name} logged-in`);
      cy.get('.notification-info')
        .should('contain', 'login successful')
        .and('have.css', 'borderColor', 'rgb(0, 128, 0)')
        .and('have.css', 'color', 'rgb(0, 128, 0)');
      cy.get('button').contains('create new blog');
    });

    it('fails with wrong credentials', () => {
      cy.get('#usernameInput').type(env.user.username);
      cy.get('#passwordInput').type('blablabla');
      cy.get('button').click();

      cy.get('.notification-error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'borderColor', 'rgb(255, 0, 0)')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('Create New Blog Functionality', () => {
    beforeEach(() => {
      cy.request('POST', 'http://localhost:3000/api/users', env.user);
      cy.login({
        username: env.user.username,
        password: env.user.password,
      });
    });

    it('a blog can be created', () => {
      const {title, author, url} = env.blogs[0];
      cy.contains('create new blog').click();
      cy.get('#blogTitleInput').type(title);
      cy.get('#blogAuthorInput').type(author);
      cy.get('#blogUrlInput').type(url);
      cy.get('.togglable-content button').contains('create').click();

      cy.contains(`${title} ${author}`);
      cy.get('.notification-info').should(
        'contain',
        `a new blog ${title} by ${author} added`
      );
    });
  });

  describe('Liking Blog Functionality', () => {
    beforeEach(() => {
      cy.request('POST', 'http://localhost:3000/api/users', env.user);
      cy.login({
        username: env.user.username,
        password: env.user.password,
      });
      cy.addNewBlog(env.blogs[0]);
    });

    it('user can liking a blog', () => {
      cy.contains('view').click();
      cy.contains(env.blogs[0].url);
      cy.contains('likes 0');
      cy.contains(env.user.name);

      const count = 3;
      for (let i = 0; i < count; i++) cy.get('.like-button').click();
      cy.contains('likes 3');
    });
  });

  describe('Delete Blog Functionality', () => {
    beforeEach(() => {
      cy.request('POST', 'http://localhost:3000/api/users', env.user);
      cy.request('POST', 'http://localhost:3000/api/users', env.otherUser);
      cy.login({
        username: env.user.username,
        password: env.user.password,
      });
      cy.addNewBlog(env.blogs[0]);
      cy.login({
        username: env.otherUser.username,
        password: env.otherUser.password,
      });
      cy.addNewBlog(env.blogs[1]);
    });

    it('user can delete his/her owned blog', () => {
      const {title, author} = env.blogs[1];
      cy.get('article').should('have.length', 2);
      cy.get('.view-button:last').click();
      cy.get('article:last').contains('remove').click();

      cy.get('.notification-info').should(
        'contain',
        `a blog ${title} by ${author} successfully deleted`
      );
      cy.get('article').should('have.length', 1);
      cy.get('html').should('not.contain', `${title} ${author}`);
    });

    it("user cannot delete other user's blog", () => {
      const {title, author} = env.blogs[0];
      cy.get('article').should('have.length', 2);
      cy.contains('view').click();
      cy.contains('remove').click();

      cy.get('.notification-error').should(
        'contain',
        'failed to delete a blog'
      );
      cy.get('article').should('have.length', 2);
      cy.get('html').should('contain', `${title} ${author}`);
    });
  });

  describe('Blogs sorted by Most Likes', () => {
    beforeEach(() => {
      cy.request('POST', 'http://localhost:3000/api/users', env.user);
      cy.login({
        username: env.user.username,
        password: env.user.password,
      });
      cy.addNewBlog(env.blogs[0]);
      cy.addNewBlog(env.blogs[1]);
    });

    it('the blogs are ordered according to likes', () => {
      const {title: titleA, author: authorA} = env.blogs[0];
      const {title: titleB, author: authorB} = env.blogs[1];
      cy.get('.view-button:last').click();
      cy.get('.like-button:last').click();
      cy.get('article:first').should('contain', `${titleB} ${authorB}`);

      cy.get('.view-button:last').click();
      cy.get('.like-button:last').click();
      cy.get('.like-button:last').click();
      cy.get('article:first').should('contain', `${titleA} ${authorA}`);
    });
  });
});
