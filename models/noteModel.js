const mongoose = require('mongoose');
const User = require('./userModel');

const noteSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {
  timestamps: true
});

noteSchema.index({ owner: 1, createdAt: -1 });
noteSchema.index({ title: 'text', content: 'text' });
noteSchema.index({ createdAt: -1 });

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;