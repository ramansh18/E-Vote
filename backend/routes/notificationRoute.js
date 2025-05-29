const express = require('express');
const router = express.Router();
const Notification = require('../models/Notifications'); // your Notification model

// Middleware to protect route and get userId (assumed)
const {protect} = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId)
    // Fetch global notifications + user specific notifications
    const notifications = await Notification.find({
      $or: [
        { isGlobal: true },
        { user: userId }
      ]
    })
      .sort({ createdAt: -1 })
      .limit(50); // optional limit to latest 50 notifications

    res.json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    console.error('Fetch notifications error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
