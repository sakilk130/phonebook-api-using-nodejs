import express from 'express';
const router = express.Router();
import { createNewContact } from '../controllers/contact.controller.js';

router.route('/').post(createNewContact);

export default router;
