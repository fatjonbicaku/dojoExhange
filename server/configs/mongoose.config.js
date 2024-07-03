const mongoose = require('mongoose');


mongoose.connect(process.env.DB_URL)
  .then(res => console.log("Connected to DB"))
  .catch(err => console.log(err))