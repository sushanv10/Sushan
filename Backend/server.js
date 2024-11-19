
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/Config/db.js');
const authRoutes= require('./src/Routes/authRoutes.js')

require('dotenv').config();

const server = express();
server.use(cors());
server.use(express.json());

const port = process.env.port || 3000;

connectDB();

//Routes
server.use('/api/auth', authRoutes)

server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
