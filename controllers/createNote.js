const Note = require('../models/noteModel');

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const user = req.user;
    if (!title || !content) {
      return res.status(400).json({ message: 'You need to fill all fields'});
    }
    const note = await Note.create({
      title,
      content,
      owner: user._id
    });

    return res.status(201).json({ message: 'Note successfully created'});
  } catch(err) {
    return res.status(500).json({ message: 'Internal server error', err});
  }
}

module.exports = createNote;