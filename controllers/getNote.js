const Note = require('../models/noteModel');

const getNote = async (req, res) => {
  try {
    let notes;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const allowedSortFields = ['title', 'content', 'createdAt', 'updatedAt'];
    const sortBy = allowedSortFields.includes(req.query.sortBy) ? req.query.sortBy : 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;
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

    if (search) {
      query.$or = [
        {title: {$regex: search, $options: 'i'}},
        {content: {$regex: search, $options: 'i'}}
      ];
    }

    if (startDate || endDate) {
      query.createdAt = {};

      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }

      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      } 
    }

    const totalNotes = await Note.countDocuments(query);
    const totalPages = Math.ceil(totalNotes / limit);

    notes = await Note.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: order });
    
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