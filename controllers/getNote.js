const Note = require('../models/noteModel');

const getNote = async (req, res) => {
  try {
    let notes;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const user = req.user;

    if (page < 1 || limit < 1) {
      return res.status(400).json({ error: 'Invalid page or limit' });
    }
    if (limit > 100) {
      return res.status(400).json({ error: 'Limit cannot exceed 100' });
    }

    let query = {};
    const skip = (page - 1) * limit;
    
    

    if (user.role !== 'admin') {
      query.owner = user._id;
    }

    const totalNotes = await Note.countDocuments(query);
    const totalPages = Math.ceil(totalNotes / limit);

 

    notes = await Note.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    if(notes.length === 0) {
      return res.status(200).json({ 
        message: 'You do not have any notes yet.',  
        currentPage: page,
        totalNotes: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
        notes: []
      });
    }

    return res.status(200).json({ 
      message: 'Here is your notes: ', 
      currentPage: page, 
      totalNotes: totalNotes, 
      totalPages: totalPages, 
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      notes});

  } catch(err) {
      console.error('Error fetching notes:', err);
    return res.status(500).json({ error: 'Internal server error'});
  }
}

module.exports = getNote;