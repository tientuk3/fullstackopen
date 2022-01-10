/* eslint-disable no-undef */

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/tests/reset')
    cy.visit('http://localhost:3000')

    const validUser = {
      username: 'tuukka',
      name: 'Tuukka',
      password: 'salasana'
    }
    const another_validUser = {
      username: 'mikko',
      name: 'Mikko',
      password: 'salasana'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', validUser)
    cy.request('POST', 'http://localhost:3003/api/users/', another_validUser)

  })

  it('Kirjautumisikkuna näytetään', function() {
    cy.contains('Kirjaudu sisään')
    cy.contains('Käyttäjätunnus')
    cy.get('form').contains('Kirjaudu sisään')
  })

  describe('Kirjautuminen', function() {
    it('Kirjautuminen oikeilla tunnuksilla', function() {
      cy.get('#username').type('tuukka')
      cy.get('#password').type('salasana')
      cy.get('form').contains('Kirjaudu sisään').click()
      cy.get('.viestiGreen').contains('Kirjautuminen onnistui')
      cy.get('.viestiGreen').should('have.css', 'border-color', 'rgb(0, 128, 0)')
      cy.contains('Olet kirjautuneena käyttäjällä Tuukka')
    })

    it('Kirjautuminen väärillä tunnuksilla', function() {
      cy.get('#username').type('prööt')
      cy.get('#password').type('prölölö')
      cy.get('form').contains('Kirjaudu sisään').click()
      cy.get('.viestiRed').contains('Väärä käyttäjätunnus tai salasana')
      cy.get('.viestiRed').should('have.css', 'border-color', 'rgb(255, 0, 0)')
      cy.get('Kirjaudu ulos').should('not.exist')
    })
  })

  describe('Kirjautuneena', function() {
    beforeEach(function() {
      cy.login({ username: 'tuukka', password: 'salasana' })
    })

    it('Blogin lisääminen lomakkeella', function() {
      cy.contains('Lisää uusi blogi').click()
      cy.get('#title').type('Cypressin lisäämä blogi')
      cy.get('#author').type('Kirjoittaja')
      cy.get('#url').type('www.blogiblogi.com')
      cy.contains('Lähetä').click()
      cy.get('.viestiGreen').contains('Lisäsit uuden blogin')
      cy.get('.viestiGreen').should('have.css', 'border-color', 'rgb(0, 128, 0)')
      cy.contains('Cypressin lisäämä blogi')
    })

    it('Blogista tykkääminen', function() {
      cy.createBlog({
        title: 'Backend-blogi',
        author: 'Kirjoittaja2',
        url: 'www.testiblogi.com',
        likes: 31
      })

      cy.contains('Näytä tiedot').click()
      cy.contains('Tykkää').click()
      cy.get('.viestiGreen').contains('Tykkäsit blogista')
      cy.get('.viestiGreen').should('have.css', 'border-color', 'rgb(0, 128, 0)')
      cy.contains('Backend-blogi').parent().contains('32 tykkäystä')
    })

    it('Blogin poistaminen', function() {
      cy.contains('Lisää uusi blogi').click()
      cy.get('#title').type('Cypressin lisäämä blogi')
      cy.get('#author').type('Kirjoittaja')
      cy.get('#url').type('www.blogiblogi.com')
      cy.contains('Lähetä').click()
      cy.get('.viestiGreen').contains('Lisäsit uuden blogin')
      cy.get('.viestiGreen').should('have.css', 'border-color', 'rgb(0, 128, 0)')
      cy.contains('Cypressin lisäämä blogi').contains('Näytä tiedot').click()
      cy.contains('Poista').click()
      cy.get('Cypressin lisäämä blogi').should('not.exist')
      cy.get('Poista').should('not.exist')
      cy.contains('Lisää uusi blogi').click()
      cy.get('#title').type('Cypressin lisäämä blogi')
      cy.get('#author').type('Kirjoittaja')
      cy.get('#url').type('www.blogiblogi.com')
      cy.contains('Lähetä').click()
      cy.contains('Kirjaudu ulos')
      cy.login({ username: 'mikko', password: 'salasana' })
      cy.contains('Cypressin lisäämä blogi')
      cy.contains('Näytä tiedot').click()
      cy.get('Poista').should('not.exist')
    })

    it('Blogit oikeassa järjestyksessä', function() {
      cy.createBlog({ // create four blogs to initialize the test
        title: 'Keskinkertainen blogi',
        author: 'test',
        url: 'test_url',
        likes: 23
      })
      cy.createBlog({
        title: 'Maansiirtoblogi',
        author: 'Pete Kauppinen',
        url: 'www.maansiirtofirma.com',
        likes: 371
      })
      cy.createBlog({
        title: 'Ei tykkäyksiä',
        author: 'Kirjoittaja0',
        url: 'www.osoite.com',
        likes: 0
      })
      cy.createBlog({
        title: 'Huono blogi',
        author: 'Kirjoittaja1',
        url: 'www.osoite.com',
        likes: 2
      })

      cy.get('[id="blogi"').eq(0).contains('Näytä tiedot').click()
      cy.contains('371 tykkäystä')
      cy.contains('Piilota tiedot').click()

      cy.get('[id="blogi"').eq(1).contains('Näytä tiedot').click()
      cy.contains('23 tykkäystä')
      cy.contains('Piilota tiedot').click()

      cy.get('[id="blogi"').eq(2).contains('Näytä tiedot').click()
      cy.contains('2 tykkäystä')
      cy.contains('Piilota tiedot').click()

      cy.get('[id="blogi"').eq(3).contains('Näytä tiedot').click()
      cy.contains('0 tykkäystä')
    })
  })

})