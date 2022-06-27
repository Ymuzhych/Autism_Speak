const path = require("path");
// dotenv file for sensitive/secret configuration information
require("dotenv").config();
// Express.js server
const express = require("express");
// All routes as defined in the controllers folder
const routes = require("./controllers/");
// Sequelize connection to the database
const sequelize = require("./config/connection");
// Handlebars template engine for front-end
const exphbs = require("express-handlebars");
// Express session to handle session cookies
const session = require("express-session");
// Sequelize store to save the session so the user can remain logged in
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// Handlebars helpers
const helpers = require("./utils/helpers");

// Initialize handlebars for the html templates
const hbs = exphbs.create({ helpers });
// Initialize sessions
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
// Initialize server
const app = express();
// Define the port for the server
const PORT = process.env.PORT || 3001;
// Set handlebars as the template engine for the server
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));
// Give the server a path to the public directory for static files
app.use(express.static(path.join(__dirname, 'public')));

// Have Express parse JSON
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(routes);

sequelize.sync();
// Turn on connection to db and then to the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});