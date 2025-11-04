const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('ID is unique identifier of blogs', async () => {
  const response = await api
    .get('/api/blogs')

  const blogs = response.body
  const uniqueIDs = [...new Set(blogs.map(blog => blog.id))]

  assert.strictEqual(blogs.length, uniqueIDs.length)
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: "nth",
    author: "someone",
    url: "test/urlNew",
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(b => b.title)

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
  assert(titles.includes(newBlog.title))
})

test('a valid blog can be deleted ', async () => {
  const response1 = await api.get('/api/blogs')
  const blogs = response1.body
  const toBeDeletedBlog = blogs[0]

  const response2 = await api.delete(`/api/blogs/${toBeDeletedBlog.id}`)
  assert.strictEqual(response2.status, 204)

  const response3 = await api.get('/api/blogs')
  const newBlogs = response3.body
  assert.strictEqual(newBlogs.length, blogs.length - 1)

  const newBlogIds = newBlogs.map(blog => blog.id)
  assert(!newBlogIds.includes(toBeDeletedBlog.id))
})

test('a blog can be updated ', async () => {
  const response1 = await api.get('/api/blogs')
  const blogs = response1.body
  const toBeUpdatedBlog = { ...blogs[0], title: 'New title' }

  const response2 = await api.put(`/api/blogs/${toBeUpdatedBlog.id}`).send(toBeUpdatedBlog)
  assert.strictEqual(response2.status, 204)

  const response3 = await api.get(`/api/blogs/${blogs[0].id}`)
  const newBlog = response3.body
  assert.strictEqual(newBlog.title, toBeUpdatedBlog.title)
})

after(async () => {
  await mongoose.connection.close()
})