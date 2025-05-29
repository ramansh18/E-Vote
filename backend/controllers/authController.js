const User = require("../models/User");
const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const sendOTP = require("../utils/sendOTP");
const crypto = require('crypto');
const {generateWallet} = require("../utils/wallet")
const mailSender = require('../utils/mailSender')
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
    const { name, email, password, phone } = req.body; 

    if (!name || !email || !password || !phone) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedEmail = email.toLowerCase();
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();  // 6-digit OTP
    const otpPayload = { email: normalizedEmail, otp };
    await OTP.create(otpPayload);
    sendOTP(normalizedEmail, otp);
    

    const emailTitle = "Your OTP for E-Voting Registration";
    const emailBody = `<h3>Your OTP is: ${otp}</h3><p>Please use this OTP to complete your registration.</p>`;
    
    await mailSender(normalizedEmail, emailTitle, emailBody);
    console.log(otp)
    res.status(200).json({
        message: "OTP sent successfully",
        otp,
    });
};

// After OTP verification, create user with isAdmin flag
const verifyOTP = async (req, res) => {
    const {name, email, otp,phone,password } = req.body;  // isAdmin included
    const normalizedEmail = email.toLowerCase();
    console.log("otp",otp)
    const otpRecord = await OTP.findOne({ email: normalizedEmail, otp });
    if (!otpRecord) {
        return res.status(400).json({ message: "Invalid OTP" });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const { address: walletAddress } = generateWallet();
    const user = await User.create({ 
        name: name, 
        email: normalizedEmail, 
        password: hashedPassword,
        isVerified : true,
        walletAddress: walletAddress, 
        phone: phone,
    });
    
    await OTP.deleteOne({ email: normalizedEmail });
    
    res.status(201).json({
        _id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,  // return the isAdmin field
        token: generateToken(user.id, user.isAdmin),  // Pass isAdmin to token generation
    });
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(403).json({
            success: false,
            message: "All fields are required. Please enter carefully",
        });
    }

    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "User is not registered, please signup first",
        });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        // Use isAdmin field from the database
        res.json({
            message: "Logged in Successfully",
            _id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,  // Include isAdmin field
            token: generateToken(user.id, user.isAdmin),  // Pass isAdmin to token generation
        });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
};


// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password'); // exclude password for security
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };


  const resendOTP = async (req, res) => {
    const { email } = req.body;
  
    if (!email) return res.status(400).json({ message: "Email is required" });
  
    try {
        const normalizedEmail = email.toLowerCase();
        const otp = crypto.randomInt(100000, 999999).toString(); 
      
  
      await sendOTP(normalizedEmail, otp);
  
      res.status(200).json({ message: "OTP resent successfully" });
    } catch (error) {
      console.error("Resend OTP error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

const sendResetPasswordToken = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found.' });
  
      const rawToken = crypto.randomBytes(32).toString('hex');
      const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
  
      user.resetPasswordToken = hashedToken;
      user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
      await user.save();
  
      const resetUrl = `http://localhost:5173/reset-password?token=${rawToken}`;
      const message = `Click this link to reset your password:\n\n${resetUrl}`;
  
      await mailSender(user.email, 'Password Reset Request', message);
  
      res.status(200).json({ message: 'Reset link sent to email.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to send reset token.' });
    }
  };
  
  // Reset password using token


const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token.' });

    // Check if the new password is the same as the current password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);

    if (isSamePassword) {
      return res.status(400).json({ message: 'New password cannot be the same as the old password.' });
    }

    // Hash the new password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedNewPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to reset password.' });
  }
};


module.exports = { register, verifyOTP, login, getMe, resendOTP,sendResetPasswordToken,resetPassword };