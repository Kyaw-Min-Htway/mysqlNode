const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'mysqlNode'
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Mysql connected ....');
});

const app = express();

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE mysqlNode';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created ...');
    });
});

app.get('/createTable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Table created ...');
    });
});

app.get('/addpost', (req, res) => {
    let post = {title: 'Post One', body: 'This is post number one'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Add post created ...');
    })
})

app.get('/getpost', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Posts fetched ...');
    })
})

app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post fetched ...');
    })
})

app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Batman';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Posts updated ...');
    })
})

app.listen('3000', () => {
    console.log('Sever started on port 3000');
});