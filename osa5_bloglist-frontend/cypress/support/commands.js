/* eslint-disable no-undef */
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', (content) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: {
      title: content.title,
      author: content.author,
      url: content.url,
      likes: content.likes
    },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
    }
  })
  cy.visit('http://localhost:3000')
})