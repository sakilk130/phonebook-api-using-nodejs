import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);
