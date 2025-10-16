const Note = require('../models/noteModel');

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    const user = req.user;
    if (!note) {
      return res.status(404).json({ message: 'Note does not exist'});
    }
    if (user._id !== note.owner && user.role !== 'admin') {
      return res.status(403).json({ message: 'Not your note. Forbidden'});
    }

    await note.deleteOne();

    return res.status(200).json({ message: 'Note successfully deleted'});

  } catch(err) {
    return res.status(500).json({ message: 'Internal server error', err});
  }
}

module.exports = deleteNote;