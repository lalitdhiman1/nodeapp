const express = require('express');
require('dotenv').config();
var cors = require('cors');
var app = express();
var allowedOrigins = ['http://localhost:3000'];
app.use(cors({
    origin: function(origin, callback){
      // allow requests with no origin 
      // (like mobile apps or curl requests)
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  }));

app.use(express.json())
const  userRouter  = require('./api/user/user.routes');

app.use("/api/users", userRouter);
app.listen(process.env.APP_PORT, ()=>{
    console.log('Server Started')
})