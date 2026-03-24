const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');

async function create_users_if_not_exist() {
  return new Promise((res, rej) => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name text)`, (err) => {
        err ? rej(err) : res();
      });
  })
}

async function insert_user(name) {
  return new Promise((res, rej) => {
    db.run("INSERT INTO users (name) VALUES (?)", [name], function(err) {
      err ? rej(err) : res(this.lastID);
    })
  })
}

async function insert_user_with_id(id, name) {
  return new Promise((res, rej) => {
    db.run("INSERT INTO users (id, name) VALUES (?, ?)", [id, name], (err) => {
      err ? rej(err) : res();
    })
  })
}

async function get_user_by_id(id) {
  return new Promise((res, rej) => {
    db.get("SELECT id, name FROM users WHERE id = ?", [id], (err, row) => {
      err || !row ? rej(err) : res(row);
    })
  })
}

create_users_if_not_exist()
  .then(() => insert_user_with_id(1, 'Михайлов Даниил'))
  .then(() => insert_user_with_id(2, 'Бочкарёва Дарья'))
  .catch(() => {})


/* GET users listing. */
router.get('/', function(req, res, next) {
  db.all("SELECT id, name FROM users", [], (err, rows) => {
    if (err) {
        console.log(err);
    } else {
        res.send(rows);
    }
  })
}).post('/', function(req, res, next) {
  insert_user(req.body.name)
  .then(id => {
    const newUser = {id, name: req.body.name};
    res.status(201).json(newUser);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
})
.get('/:id', function(req, res, next) {
  get_user_by_id(req.params.id)
    .then(user => res.send(user))
    .catch(() => res.sendStatus(404));
})

module.exports = router;
