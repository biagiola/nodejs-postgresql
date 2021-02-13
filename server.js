const express = require('express')
const mysql = require('mysql')

const app = express();

// create connection
const db = mysql.createConnection({
  //host: 'localhost',
  user: 'root',
  password: 'certina123',
  database: 'prueba'
})

// connect
db.connect( err => {
  if(err) throw err;
  console.log('mysql connected!! :D')
})

// create DB
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE nodemysql'
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result)
    res.send('database created...')
  })
})

// create table
app.get('/createPostTable', (req, res) => {
  let sql = 'CREATE TABLE Posts (id int auto_increment primary key, title varchar(255), body varchar(255))'
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result)
    res.send('posts table created...')
  })
})

// insert posts
app.get('/addPost1', (req, res) => {
  let Post = { title: 'post one', body: 'this is posts body number one'}
  let sql = 'INSERT INTO Posts set ?'
  let query = db.query(sql, Post, (err, result) => {
    if(err) throw err;
    console.log(result)
    res.send('post 1  added...')
  })
})
app.get('/addPost2', (req, res) => {
  let Post = { title: 'post one', body: 'this is posts body number two'}
  let sql = 'INSERT INTO Posts set ?'
  let query = db.query(sql, Post, (err, result) => {
    if(err) throw err;
    console.log(result)
    res.send('post 2  added...')
  })
})

// select posts
app.get('/getPosts', (req, res) => {
  let sql = 'SELECT * FROM Posts';
  let query = db.query(sql, (err, result) => {
    if(err) throw err 
    console.log(result)
    res.send('posts featched...')
  })
})

// select single post
app.get('/getPosts/:id', (req, res) => {
  let sql = `SELECT * FROM Posts WHERE id=${req.params.id}`
  let query = db.query(sql, (err, result) => {
    if(err) throw err
    console.log(result)
    res.send('single post featched...')
  })
})

// update post
app.get('/updatePost/:id', (req, res) => {
  let newTitle = 'updated title'
  let sql = `update Posts set title='${newTitle}' WHERE id=${req.params.id}`
  let query = db.query(sql, (err, result) => {
    if(err) throw err
    console.log(result)
    res.send('posts featched...')
  })
})

// delete post
app.get('/deletePost/:id', (req, res) => {
  let sql = `DELETE FROM Posts WHERE id=${req.params.id}`
  let query = db.query(sql, (err, result) => {
    if(err) throw err
    console.log(result)
    res.send(`post with the id ${req.params.id} was deleted...`)
  })
})

app.listen(3000, () => console.log('Server running at PORT 3000'))