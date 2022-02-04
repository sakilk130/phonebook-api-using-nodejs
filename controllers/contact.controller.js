import Contact from '../models/Contact.js';
import asyncHandler from 'express-async-handler';

// @desc Create new contact
// @desc route POST /api/contacts
// @access Public
// @return {json} mixed
const createNewContact = asyncHandler(async (req, res) => {
  const { name, mobile } = req.body;
  const contactExists = await Contact.findOne({ mobile });
  if (contactExists) {
    res.status(400);
    throw new Error('Contact already exists');
  }
  const contact = new Contact({
    name,
    mobile,
  });
  const createContact = await contact.save();
  res.status(201).json(createContact);
});

export { createNewContact };
