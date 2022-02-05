import express from 'express';
const router = express.Router();
import {
  createNewContact,
  deleteContact,
  getContactByMobile,
  getContacts,
  updateContact,
} from '../controllers/contact.controller.js';

router.route('/').get(getContacts).post(createNewContact);
router
  .route('/:mobile')
  .get(getContactByMobile)
  .put(updateContact)
  .delete(deleteContact);

export default router;
