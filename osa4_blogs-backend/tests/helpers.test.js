/* eslint-disable no-unused-vars */
const totalLikes = require('../utils/helpers').totalLikes
const favoriteBlog = require('../utils/helpers').favoriteBlog
const mostBlogs = require('../utils/helpers').mostBlogs
const mostLikes = require('../utils/helpers').mostLikes
const dummy = require('../utils/helpers').dummy

// dummy
test('testi: dummy', () => {
  const result = dummy('abc')
  expect(result).toBe(1)
})

test('testi: dummy', () => {
  const result = dummy()
  expect(result).toBe(1)
})

test('testi: dummy', () => {
  const result = dummy(['1', '2', 'a'])
  expect(result).toBe(1)
})

test('testi: dummy', () => {
  const result = dummy([])
  expect(result).toBe(1)
})

// totalLikes
describe('totalLikes-funktio', () => {

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const lista_3blogia = [
    {
      _id: '5a422aa71b54a676234d34f8',
      title: 'Kauppisen Maansiirtofirman blogi',
      author: 'Pete Kauppinen',
      url: 'http://www.nettisivu.osoite',
      likes: 900,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71a34a676234d17f8',
      title: 'Testi Blogi',
      author: 'Mr. Testi Bloggaaja',
      url: 'http://www.testi.com/kirja.html',
      likes: 0,
      __v: 0
    }
  ]

  test('Tyhjä lista', () => {
    const result = totalLikes([])
    expect(result).toBe(0)
  })

  test('Listassa yksi blogi', () => {
    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('Listassa 3 blogia', () => {
    const result = totalLikes(lista_3blogia)
    expect(result).toBe(905)
  })
})

// favoriteBlog
describe('favoriteBlog-funktio', () => {

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const lista_3blogia = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d34f8',
      title: 'Kauppisen Maansiirtofirman blogi',
      author: 'Pete Kauppinen',
      url: 'http://www.nettisivu.osoite',
      likes: 900,
      __v: 0
    },
    {
      _id: '5a422aa71a34a676234d17f8',
      title: 'Testi Blogi',
      author: 'Mr. Testi Bloggaaja',
      url: 'http://www.testi.com/kirja.html',
      likes: 0,
      __v: 0
    }
  ]

  test('Tyhjä lista', () => {
    const result = favoriteBlog([])
    expect(result).toBe(null)
  })

  test('Listassa yksi blogi', () => {
    const result = favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('Listassa 3 blogia', () => {
    const result = favoriteBlog(lista_3blogia)
    expect(result).toEqual(lista_3blogia[1])
  })
})


// mostBlogs
describe('mostBlogs-funktio', () => {

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const lista_5blogia = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d34f8',
      title: 'Kauppisen Maansiirtofirman blogi',
      author: 'Pete Kauppinen',
      url: 'http://www.nettisivu.osoite',
      likes: 900,
      __v: 0
    },
    {
      _id: '5a422aa71a34a676234d17f8',
      title: 'Testi Blogi',
      author: 'Mr. Testi Bloggaaja',
      url: 'http://www.testi.com/kirja.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d34f8',
      title: 'Kauppisen Maansiirtofirman blogi',
      author: 'Pete Kauppinen',
      url: 'http://www.nettisivu.osoite',
      likes: 900,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d34f8',
      title: 'Kauppisen Maansiirtofirman blogi',
      author: 'Pete Kauppinen',
      url: 'http://www.nettisivu.osoite',
      likes: 900,
      __v: 0
    }
  ]

  test('Tyhjä lista', () => {
    const result = mostBlogs([])
    expect(result).toBe(null)
  })

  test('Listassa yksi blogi', () => {
    const result = mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      author: listWithOneBlog[0].author,
      blogs: 1
    })
  })

  test('Listassa 5 blogia', () => {
    const result = mostBlogs(lista_5blogia)
    expect(result).toEqual({
      author: 'Pete Kauppinen',
      blogs: 3
    })

  })
})


// mostLikes
describe('mostLikes-funktio', () => {

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const lista_5blogia = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d34f8',
      title: 'Kauppisen Maansiirtofirman blogi',
      author: 'Pete Kauppinen',
      url: 'http://www.nettisivu.osoite',
      likes: 900,
      __v: 0
    },
    {
      _id: '5a422aa71a34a676234d17f8',
      title: 'Testi Blogi',
      author: 'Mr. Testi Bloggaaja',
      url: 'http://www.testi.com/kirja.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d34f8',
      title: 'Kauppisen Maansiirtofirman blogi',
      author: 'Pete Kauppinen',
      url: 'http://www.nettisivu.osoite',
      likes: 2,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d34f8',
      title: 'Kauppisen Maansiirtofirman blogi',
      author: 'Pete Kauppinen',
      url: 'http://www.nettisivu.osoite',
      likes: 900,
      __v: 0
    }
  ]

  test('Tyhjä lista', () => {
    const result = mostLikes([])
    expect(result).toBe(null)
  })

  test('Listassa yksi blogi', () => {
    const result = mostLikes(listWithOneBlog)
    expect(result).toEqual({
      author: listWithOneBlog[0].author,
      likes: 5
    })
  })

  test('Listassa 5 blogia', () => {
    const result = mostLikes(lista_5blogia)
    expect(result).toEqual({
      author: 'Pete Kauppinen',
      likes: 1802
    })

  })
})