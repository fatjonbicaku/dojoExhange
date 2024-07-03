const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

//App middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors(
  {
    origin: 'http://localhost:5173', // Replace with your frontend origin
    credentials: true, // Allow credentials (cookies)
  }
))
app.use(cookieParser());

//Connect to DB
require('./configs/mongoose.config')

//App Routes
require('./routes/user.routes')(app)
require('./routes/deposit.routes')(app)
require('./routes/transaction.routes')(app)

//Run the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
