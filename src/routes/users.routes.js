const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Aquí se listarán los usuarios');
});

router.post('/', (req, res) => {
  res.send('Aquí se creará un usuario');
});

module.exports = router;