import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('Sisältö renderöityy', () => {
  const blog = {
    title: 'Testiblogi',
    author: 'Testaaja',
    url: 'www.testiosoite.com',
    likes: 70
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('Näytä tiedot')
  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).not.toHaveTextContent(blog.url)
  expect(component.container).not.toHaveTextContent(blog.likes)
})

test('Näytä-nappi tuo kaikki tiedot näkyviin', () => {
  const blog = {
    title: 'Testiblogi',
    author: 'Testaaja',
    url: 'www.testiosoite.com',
    likes: 70,
    user: {
      username: 'mikko',
      name: 'Mikko',
      id: '61d4722c74154b905f810990'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )
  const button = component.getByText('Näytä tiedot')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('Piilota tiedot')
  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).toHaveTextContent(blog.url)
  expect(component.container).toHaveTextContent(blog.likes)
})

test('Tykkää-napin painaminen toimii', () => {
  const blog = {
    title: 'Testiblogi',
    author: 'Testaaja',
    url: 'www.testiosoite.com',
    likes: 70,
    user: {
      username: 'mikko',
      name: 'Mikko',
      id: '61d4722c74154b905f810990'
    }
  }
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleIncrementLikes={mockHandler} />
  )

  const showbutton = component.getByText('Näytä tiedot')
  fireEvent.click(showbutton)

  const likebutton = component.getByText('Tykkää')
  fireEvent.click(likebutton)
  fireEvent.click(likebutton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})