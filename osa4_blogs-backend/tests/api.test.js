const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const apufunktiot = require('./apufunktiot')

// importataan app.js
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const initialData = [ // määritellään testidataa
  {
    title: 'Testiblogi 1',
    author: 'Tuukka',
    url: 'www.osoite.com',
    likes: 33,
  },
  {
    title: 'Pete Kauppisen blogi',
    author: 'pete kauppinen',
    url: 'www.maansiirtofirma.com',
    likes: 900,
  },
  {
    title: 'make.mp3',
    author: 'make',
    url: 'www.make.mp3',
    likes: 1,
  },
  {
    title: 'Blogi 2',
    author: 'testi henkilö',
    url: 'not available',
    likes: 0,
  }
]

/*
Blogiosio
*/

describe('Blogien haku ja katselu', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialData)
  })

  // toimiiko GET
  test('Blogit listataan json-datana', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  // palauttaako oikean pituisen datan
  test('Blogeja on oikea määrä', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialData.length)
  })
  // onko palautettujen blogien identifioiva kenttä nimeltään 'id'
  test('Blogit identifioidaan id-nimisellä kentällä', async () => {
    const response = await api.get('/api/blogs')
    for (let listing of response.body) {
      // console.log('Jos id löytyy, se on ' + listing.id)
      expect(listing.id).toBeDefined()
    }
  })
  // toimiiko yhden blogin haku (3 testiä)
  test('Yksittäisen blogin haku id:llä', async () => {
    const kaikkiblogit = await api.get('/api/blogs')
    const yksiblogi = await api.get('/api/blogs/' + kaikkiblogit.body[kaikkiblogit.body.length - 1].id)
    expect(yksiblogi.body).toEqual(kaikkiblogit.body[kaikkiblogit.body.length - 1])
  })
  test('Yksittäisen blogin haku olemattomalla id:llä', async () => {
    const vaara_id = 'asdasdasdasd'
    await api.get('/api/blogs/' + vaara_id).expect(404)
  })
  test('Yksittäisen blogin haku vääränlaisella id:llä', async () => {
    const vaara_id = 'asd'
    await api.get('/api/blogs/' + vaara_id).expect(400)
  })
})



const initialUserData = {
  username: 'testihenkilö',
  name: 'Testinimi Testisukunimi'
}

describe('Käyttäjätunnuksen luominen', () => {

  beforeAll(async () => { // luo "kova" tunnus testihenkilö:testisalasana
    await User.deleteMany({})

    initialUserData.passwordHash = await bcrypt.hash('testisalasana', 10)
    const initialUser = new User(initialUserData)

    await initialUser.save()
  })

  // käyttäjän luonti
  test('Uuden käyttäjän luominen onnistuu', async () => {
    const lista_alku = await apufunktiot.allUsers()

    const newUser = {
      username: 'tientuk3',
      name: 'Tuukka',
      password: 'asd123123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const lista_loppu = await apufunktiot.allUsers()
    expect(lista_loppu).toHaveLength(lista_alku.length + 1)

    const usernames = lista_loppu.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('Käyttäjänimen tulee olla uniikki', async () => {
    const lista_alku = await apufunktiot.allUsers()

    const newUser = {
      username: 'tientuk3',
      name: 'dfdsfdsfds',
      password: 'adasdsd'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const lista_loppu = await apufunktiot.allUsers()
    expect(lista_loppu).toHaveLength(lista_alku.length)
  })


  // epäkelpo
  test('Liian lyhyt käyttäjätunnus ei kelpaa', async () => {
    const lista_alku = await apufunktiot.allUsers()

    const newUser = {
      username: 't',
      name: 'Tuukka',
      password: 'salainen_sana000'
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toContain('is shorter than the')

    const lista_loppu = await apufunktiot.allUsers()
    expect(lista_loppu).toHaveLength(lista_alku.length)

    const usernames = lista_loppu.map(user => user.username)
    expect(usernames).not.toContain(newUser.username)
  })
  test('Liian lyhyt salasana ei kelpaa', async () => {
    const lista_alku = await apufunktiot.allUsers()

    const newUser = {
      username: 'tuukka123',
      name: 'Tuukka',
      password: 'sa'
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toContain('salasana on liian lyhyt')

    const lista_loppu = await apufunktiot.allUsers()
    expect(lista_loppu).toHaveLength(lista_alku.length)

    const usernames = lista_loppu.map(user => user.username)
    expect(usernames).not.toContain(newUser.username)
  })
  test('Tyhjä salasana ei kelpaa', async () => {
    const lista_alku = await apufunktiot.allUsers()

    const newUser = {
      username: 't',
      name: 'Tuukka',
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toContain('salasana on pakollinen')

    const lista_loppu = await apufunktiot.allUsers()
    expect(lista_loppu).toHaveLength(lista_alku.length)

    const usernames = lista_loppu.map(user => user.username)
    expect(usernames).not.toContain(newUser.username)
  })
  test('Tyhjä käyttäjätunnus ei kelpaa', async () => {
    const lista_alku = await apufunktiot.allUsers()

    const newUser = {
      name: 'Tuukka',
      password: 'salasana111'
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toContain('`username` is required')

    const lista_loppu = await apufunktiot.allUsers()
    expect(lista_loppu).toHaveLength(lista_alku.length)

    const usernames = lista_loppu.map(user => user.username)
    expect(usernames).not.toContain(newUser.username)
  })

})

describe('Blogien lisäys ja poistaminen', () => {

  // kirjautuminen
  let session = null // tähän tulee token
  test('Kirjautuminen käyttäjällä `tientuk3` onnistuu', async () => {
    const credentials = {
      username: 'tientuk3',
      password: 'asd123123'
    }

    const response = await api
      .post('/api/login')
      .send(credentials)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    session = response.body.token
  })
  test('Väärällä salasanalla kirjautuminen -> status 401', async () => {
    const credentials = {
      username: 'tientuk3',
      password: 'asd123123' + 'väärä_osuus'
    }

    await api
      .post('/api/login')
      .send(credentials)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  // toimiiko POST
  test('Blogin lisääminen onnistuu', async () => {
    const lista_alku = await apufunktiot.allBlogs()
    const lisaaBlogi = {
      title: 'Blogi 1',
      author: 'Lisääjä 1',
      url: 'asdasdasd.com',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(lisaaBlogi)
      .set('Authorization', 'bearer ' + session)
      .expect(201) // created-response

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(lista_alku.length + 1)
    expect(response.body[lista_alku.length].title).toEqual(lisaaBlogi.title)
  })

  test('Blogin lisääminen väärällä tokenilla -> status 401', async () => {
    const lista_alku = await apufunktiot.allBlogs()
    const lisaaBlogi = {
      title: 'Väärä token title',
      author: 'Mr. Väärä token',
      url: 'www.token.fi',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(lisaaBlogi)
      .set('Authorization', 'bearer ' + 'asd' + session.substring(3))
      .expect(401) // created-response

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(lista_alku.length)
  })

  // asetetaanko likes-kentän arvoksi 0 jos sitä ei ole määritelty request bodyssa
  test('Blogin like-kenttä saa arvoksi 0 jos sitä ei ole requestissa', async () => {
    const lista_alku = await apufunktiot.allBlogs()
    const lisaaBlogi = {
      title: 'Blogi jolla ei ole tykkäyksiä',
      author: 'Lisääjä 1',
      url: 'asdasdasd.com',
    }

    await api
      .post('/api/blogs')
      .send(lisaaBlogi)
      .set('Authorization', 'bearer ' + session)
      .expect(201) // created-response

    const response = await api.get('/api/blogs')
    expect(response.body[lista_alku.length].likes).toBe(0)
  })

  // vastataan status 400 Bad Request jos pyyntö ei sisällä kenttiä title ja url (3 testiä)
  test('Jos lisätään blogi ilman url-kenttää, vastataan status 400', async () => {
    const blogiIlmanUrlia = {
      title: 'Blogi ilman urlia',
      author: 'Lisääjä 1',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(blogiIlmanUrlia)
      .set('Authorization', 'bearer ' + session)
      .expect(400) // Bad Request
  })
  test('Jos lisätään blogi ilman title-kenttää, vastataan status 400', async () => {
    const blogiIlmanTitlea = {
      author: 'Lisääjä 1',
      url: 'www.asdasdasd.com',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(blogiIlmanTitlea)
      .set('Authorization', 'bearer ' + session)
      .expect(400) // Bad Request
  })
  test('Jos yritetään postata pelkkä author-kenttä, vastataan status 400', async () => {
    const pelkkaAuthor = {
      author: 'Yksinäinen author',
    }
    await api
      .post('/api/blogs')
      .send(pelkkaAuthor)
      .set('Authorization', 'bearer ' + session)
      .expect(400) // Bad Request
  })

  test('Yksittäisen blogin poisto toimii', async () => {
    const kaikkiblogit = await api.get('/api/blogs')
    const yksiblogi = await api.get('/api/blogs/' + kaikkiblogit.body[kaikkiblogit.body.length - 1].id)

    await api.delete('/api/blogs/' + yksiblogi.body.id).set('Authorization', 'bearer ' + session).expect(204)

    const blogit_lopussa = await api.get('/api/blogs')
    expect(blogit_lopussa.body.length).toBe(kaikkiblogit.body.length - 1)
  })
  test('Olemattoman blogin poisto -> status 204 No Content', async () => {
    const invalid_id = 'asdasd123123'
    await api.delete('/api/blogs/' + invalid_id).set('Authorization', 'bearer ' + session).expect(204)
  })
  test('Olemattoman blogin poisto (väärä id) -> status 400 Bad Request', async () => {
    const invalid_id = 'asd'
    await api.delete('/api/blogs/' + invalid_id).set('Authorization', 'bearer ' + session).expect(400)
  })

  test('Yksittäisen blogin tietojen muokkaus toimii', async () => {
    const lista_alku = await apufunktiot.allBlogs()
    const lisaaBlogi = {
      title: 'päivitettävä blogi',
      author: 'Lisääjä 1',
      url: 'asdasdasd.com',
      likes: 1
    }

    const response = await api
      .post('/api/blogs')
      .send(lisaaBlogi)
      .set('Authorization', 'bearer ' + session)
      .expect(201) // created-response

    const id = response.body.id
    const response_getall = await api.get('/api/blogs')
    expect(response_getall.body).toHaveLength(lista_alku.length + 1)
    expect(response_getall.body[lista_alku.length].title).toEqual(lisaaBlogi.title)

    const updatedBlog = {
      title: 'päivitetty blogi',
      likes: 888
    }
    const res = await api
      .put('/api/blogs/' + id)
      .send(updatedBlog)
      .set('Authorization', 'bearer ' + session)
      .expect(200)
    expect(res.body.likes).toBe(updatedBlog.likes)
    expect(res.body.title).toBe(updatedBlog.title)
  })
  test('Tietojen muokkaus väärällä tokenilla -> status 401', async () => {
    const lista_alku = await apufunktiot.allBlogs()
    const lisaaBlogi = {
      title: 'päivitettävä blogi',
      author: 'Lisääjä 1',
      url: 'asdasdasd.com',
      likes: 1
    }

    const response = await api
      .post('/api/blogs')
      .send(lisaaBlogi)
      .set('Authorization', 'bearer ' + session)
      .expect(201) // created-response

    const id = response.body.id
    const response_getall = await api.get('/api/blogs')
    expect(response_getall.body).toHaveLength(lista_alku.length + 1)
    expect(response_getall.body[lista_alku.length].title).toEqual(lisaaBlogi.title)

    const updatedBlog = {
      title: 'päivitetty blogi',
      likes: 888
    }
    const res = await api
      .put('/api/blogs/' + id)
      .send(updatedBlog)
      .set('Authorization', 'bearer ' + 'asd' + session.substring(3))
      .expect(401)
    expect(res.body.likes).not.toBe(updatedBlog.likes)
    expect(res.body.title).not.toBe(updatedBlog.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})


