const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    const users = {
    items: [
      {id: 1, name: 'FRONTENDER_1'},
      {id: 2, name: 'FRONTENDER_2'}
    ]
  }
  res.send(users);
});

module.exports = router;
