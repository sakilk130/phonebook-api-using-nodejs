import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './config/db.js';
import contactRoutes from './routes/contact.routes.js';

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/api/contacts', contactRoutes);

app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);
