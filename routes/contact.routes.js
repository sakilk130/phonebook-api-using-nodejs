import express from 'express';
const router = express.Router();
import {
  createNewContact,
  getContactByMobile,
} from '../controllers/contact.controller.js';

router.route('/').post(createNewContact);
router.route('/:mobile').get(getContactByMobile);

export default router;
