import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import PostForm from './PostForm'

test('Lisäyslomakkeen kutsut ja tila toimivat', () => {
  const createBlog = jest.fn()

  const blog = {
    title: 'Lisätty testiblogi',
    author: 'Testaaja',
    url: 'www.testiosoite.com',
  }

  const component = render(
    <PostForm createBlog={createBlog} />
  )

  const input_title = component.container.querySelector('#title')
  const input_author = component.container.querySelector('#author')
  const input_url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(input_title, {
    target: { value: blog.title }
  })
  fireEvent.change(input_author, {
    target: { value: blog.author }
  })
  fireEvent.change(input_url, {
    target: { value: blog.url }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(blog.title)
  expect(createBlog.mock.calls[0][0].author).toBe(blog.author)
  expect(createBlog.mock.calls[0][0].url).toBe(blog.url)
})