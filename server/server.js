const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors());

//!config connection
require('./config/mongoose.config');
app.use(express.json(), express.urlencoded({extended:true}));
//!routes connection
const BraceletRoutes = require("./routes/BraceletRoutes");
BraceletRoutes(app);
app.listen(port, ()=> console.log("The Server is listening on port " + port));
