const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "1st",
    author: "me",
    url: "test/url",
    likes: 2
  },
  {
    title: "2nd",
    author: "you",
    url: "test/url2",
    likes: 3
  },
]

module.exports = {
  initialBlogs,
}