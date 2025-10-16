const authMiddleware = require('../middlewares/authMiddleware');
const express = require('express');
const getNote = require('../controllers/getNote');
const createNote = require('../controllers/createNote');
const updateNote = require('../controllers/updateNote');
const deleteNote = require('../controllers/deleteNote');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getNote);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;