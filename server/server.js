const express = require('express');
const app = express();
// const multer = require('multer')
const port = 8000;
const cors = require('cors');
const path = require('path')
const cookieParser = require('cookie-parser')
require('dotenv').config()
app.use(cors({
    credentials:true,
    origin: 'http;//localhost:5173'
    }),
    express.json(),
    express.urlencoded({extended: true}),
    cookieParser()
);
//!Mutler Call for Images
// app.use("/uploads", express.static(__dirname + "/uploads"))
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use("/uploads", express.static('uploads'))
// const path = require('path')
// app.use('/static', express.static(path.join(__dirname, 'public')))
//!config connection
require('./config/mongoose.config');
app.use(express.json(), express.urlencoded({extended:true}));
//!routes connection
const UserRoutes = require('./routes/UserRoutes')
UserRoutes(app);

const BraceletRoutes = require("./routes/BraceletRoutes");
BraceletRoutes(app);
app.listen(port, ()=> console.log("The Server is listening on port " + port));


