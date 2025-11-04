const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  console.log(request.body)
  const blog = new Blog(request.body)

  console.log(blog)

  const newBlog = await blog.save()
  return response.status(201).json(newBlog)
})

module.exports = blogsRouter