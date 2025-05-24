const express = require("express");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/user-details", protect, (req, res) => {
  console.log("User from token:", req.user); // Log to check if it's populated

  // Example logic to return user details (you could adjust this based on your app)
  res.status(200).json({
    message: "User details",
    user: req.user, // Returning the user object populated by token
  });
});

module.exports = router;
