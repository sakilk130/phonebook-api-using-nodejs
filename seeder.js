import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import contacts from './data/contacts.js';
import Contact from './models/Contact.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    //   destroyData
    await Contact.deleteMany();

    //  import data
    await Contact.insertMany(contacts);
    console.log('Data Imported!'.green.inverse);
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Contact.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
