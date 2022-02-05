import Contact from '../models/Contact.js';
import asyncHandler from 'express-async-handler';
import yup from 'yup';

// @desc Create new contact
// @desc route POST /api/contacts
// @access Public
// @return {json} mixed
const createNewContact = asyncHandler(async (req, res) => {
  const { name, mobile } = req.body;
  // input data validation
  const createContactSchema = yup.object().shape({
    name: yup.string().trim().required(),
    mobile: yup
      .string()
      .trim()
      .min(11)
      .max(11)
      .required()
      .matches(/^(?:(?:\+|00)88|01)?\d{11}/, 'Mobile number is not valid'),
  });

  try {
    await createContactSchema.validate({ name, mobile });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }

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

// @desc Get contact by mobile
// @desc route GET /api/contacts/:mobile
// @access Public
// @return {json} mixed
const getContactByMobile = asyncHandler(async (req, res) => {
  const contact = await Contact.findOne({ mobile: req.params.mobile });
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  res.status(200).json(contact);
});

// @desc Get all contact
// @desc route GET /api/contacts
// @access Public
// @return {json} mixed
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

// @desc Update a contact
// @desc route PUT /api/contacts/:mobile
// @access Public
// @return {json} mixed
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findOne({ mobile: req.params.mobile });
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  contact.name = req.body.name || contact.name;
  contact.mobile = req.body.mobile || contact.mobile;
  const updatedContact = await contact.save();
  res.json(updatedContact);
});

// @desc Delete a contact
// @desc route DELETE /api/contacts/:mobile
// @access Public
// @return {json} mixed
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findOne({ mobile: req.params.mobile });

  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  await contact.remove();
  res.json({ message: 'Contact removed' });
});

export {
  createNewContact,
  getContactByMobile,
  getContacts,
  updateContact,
  deleteContact,
};
