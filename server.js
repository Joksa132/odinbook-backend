const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();

const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')

const app = express();

mongoose.set('strictQuery', false)
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.DB_String);
  console.log("Connected to database")
}

app.use(cors({
  origin: 'https://odinbook-frontend.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', "OPTIONS"],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cors({
  origin: 'https://odinbook-frontend.netlify.app',
  credentials: true,
  optionSuccessStatus: 200
}));

app.use(express.json());
app.use(express.static('public'))

app.use('/user', userRoute);
app.use('/post', postRoute)
app.use('/comment', commentRoute)

app.listen(process.env.PORT, () => console.log("Server started on port 4000"));