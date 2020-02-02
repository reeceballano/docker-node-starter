const express	 	= require('express');
const app	 		= express();
const cors	 		= require('cors');
const users     	= require('./router/users');
const mongoose  	= require('mongoose');

app.use(express.json());
app.use(cors());

// CONNECT TO MONGOODB (change 'localhost' to 'mongo' if you are are using DOCKER)
mongoose.connect(`mongodb://mongo:27017/todo`, 
  {  
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

//GET USERS REST API
app.use('/api', users);

// Handle production
if (process.env.NODE_ENV === 'production') {
  console.log('prod');
  // Static folder
  app.use(express.static(__dirname + '/public/'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
} else {
  console.log('dev');
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port: ${port}`));
