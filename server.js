const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const favicon = require('serve-favicon');
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const helpers = require("./utils/helpers");
// Initialize handlebars for the html templates
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });


const session = require("express-session");

// Initialize server
const app = express();


//Tells multer where to upload files
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"./images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    },
});

const upload = multer({ storage: fileStorageEngine });

// File route Handler
app.post("/single", upload.single("image"), (req, 
    res) => {
    console.log(req.file);
    res.send("Uploaded File");
});




// Define the port for the server
const PORT = process.env.PORT || 3001;

// Sequelize store to save the session so the user can remain logged in
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// dotenv file for sensitive/secret configuration information
// require("dotenv").config();

const sess = {
    secret: process.env.DB_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        checkExpirationInterval: 1000 * 60 * 10, // will check every 10 minutes
        expiration: 1000 * 60 * 30 // will expire after 30 minutes
    })
};

app.use(session(sess));
// Have Express parse JSON
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
// Give the server a path to the public directory for static files
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);


sequelize.sync();
// Turn on connection to db and then to the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});