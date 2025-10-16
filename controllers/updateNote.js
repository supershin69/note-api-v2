const Note = require('../models/noteModel');

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const user = req.user;
    if (!title && !content) {
      return res.status(400).json({ message: 'You need to fill at least one field'});
    }
    const note = await Note.findById(req.params.id);
    if(!note) {
      return res.status(404).json({ message: 'Note does not exist'});
    }

    if(user._id !== note.owner && user.role !== 'admin') {
      return res.status(403).json({ message: 'Not your note. Forbidden'});
    }

    note.title = title || note.title;
    note.content = content || note.content;

    await note.save();
  } catch(err) {
    return res.status(500).json({ message: 'Internal server error', err});
  }
}

module.exports = updateNote;