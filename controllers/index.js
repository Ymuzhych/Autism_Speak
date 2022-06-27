// Dependencies
// Server connection
const router = require("express").Router();
// API routes folder
const apiRoutes = require("./api");
// Homepage routes
const homeRoutes = require("./home-routes.js");
// Dashboard Routes
const dashboardRoutes = require("./dashboard-routes.js");

// Define the path for the server for the API routes
router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/", homeRoutes);

// Define a catch-all route for any resource that doesn't exist
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
