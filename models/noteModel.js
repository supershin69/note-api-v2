const mongoose = require('mongoose');
const User = require('./userModel');

const noteSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {
  timestamps: true
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;