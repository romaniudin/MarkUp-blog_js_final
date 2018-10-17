const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false}))

let blogs = [
  {
    id: 'blog-title-1',
    title: 'Blog Title 1',
    summary: 'This is a blog summary 1.',
    content: 'This is the blog content 1',
    author: 'John Smith',
    created: 'February 5, 2018'
  },
  {
    id: 'blog-title-2',
    title: 'Blog Title 2',
    summary: 'This is a blog summary 2.',
    content: 'This is the blog content 2',
    author: 'John Smithe',
    created: 'February 6, 2018'
  }
]

function BlogPost(title, author, summary, content) {
  this.title = title
  this.author = author
  this.summary = summary
  this.content = content
  this.created = new Date()
  this.id = title.toLowerCase().split(' ').join('-')
}

app.get('/blogs', (req, res) => {
  res.render('blogs', { blogs })
})

app.get('/blogs/:blogId', (req, res) => {
  const id = req.params.blogId
  let post = {}
  for(let i=0; i<blogs.length; i++) {
    if(blogs[i].id === id) {
      post = blogs[i]
      break;
    }
  }

  res.render('post', { post })
})

app.get('/addPost', (req, res) => {
  res.render('addPost')
})

app.post('/addPost', (req, res) => {
  const { title, author, summary, content } = req.body
  const newPost = new BlogPost(title, author, summary, content)
  blogs.push(newPost)
  res.render('blogs', { blogs })
})

app.listen(8080)