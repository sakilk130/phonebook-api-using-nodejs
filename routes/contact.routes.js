import express from 'express';
const router = express.Router();
import {
  createNewContact,
  deleteContact,
  getContactByMobile,
  getContacts,
  updateContact,
} from '../controllers/contact.controller.js';

router.route('/').post(createNewContact);
router.route('/:mobile').get(getContactByMobile);
router.route('/').get(getContacts);
router.route('/:mobile').put(updateContact);
router.route('/:mobile').delete(deleteContact);

export default router;
