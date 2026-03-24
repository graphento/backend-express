const express = require('express');
const router = express.Router();

const users = {
  items: [
    {id: 1, name: 'Михайлов Даниил'},
    {id: 2, name: 'Бочкарёва Дарья'}
  ]
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(users);
})
.post('/', function(req, res, next) {
  const id = users.items[users.items.length - 1].id + 1;
  const newUser = {id, name: req.body.name};
  users.items.push(newUser);
  res.status(201).json(newUser);
})

module.exports = router;
