const express = require('express');
const connect = require('./config/connection'); 
const routes = require('./routes'); 

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

connect(); 

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});