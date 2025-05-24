import { useState, useEffect } from "react";
import { Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import OTPInput from "./OTPInput";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Destructure values from location.state
  const { name, email, password,phone } = location.state || {};

  const [formData, setFormData] = useState({
    name: name || "",
    email: email || "",
    otp: "",
    password: password || "",
    phone : phone || "",
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [timer, setTimer] = useState(60);

  // Handle OTP Timer
  useEffect(() => {
    const storedTimestamp = localStorage.getItem("otpTimestamp");
    const now = Date.now();

    if (storedTimestamp) {
      const timestamp = parseInt(storedTimestamp, 10);
      const elapsed = now - timestamp;
      const remaining = Math.max(0, 60000 - elapsed); // 1 minute (60000ms) OTP timer
      setTimer(Math.floor(remaining / 1000)); // Set remaining time in seconds
    } else {
      // No timestamp, so initialize it
      const timestamp = Date.now();
      localStorage.setItem("otpTimestamp", timestamp.toString());
      setTimer(60); // OTP valid for 1 minute (60 seconds)
    }

    const interval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.otp.length !== 6) {
      setSnackbar({ open: true, message: "OTP must be 6 digits", severity: "warning" });
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/verify-otp", formData);
      setSnackbar({ open: true, message: "Registration successful!", severity: "success" });
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "OTP verification failed",
        severity: "error",
      });
    }
    setLoading(false);
  };

  const handleResendOTP = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/auth/resend-otp", { email: formData.email });
      setSnackbar({ open: true, message: "OTP resent successfully!", severity: "success" });

      // Update timestamp for the new OTP
      const timestamp = Date.now();
      localStorage.setItem("otpTimestamp", timestamp.toString());
      setTimer(60); // Restart timer for the new OTP
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to resend OTP",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">Verify Your Email</h2>
        <p className="text-gray-600 text-center mb-6">
          Enter the 6-digit code we sent to <span className="font-medium">{formData.email}</span>.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <OTPInput
            value={formData.otp}
            onChange={(otp) => setFormData({ ...formData, otp })}
            autoFocus
          />

          {/* Hidden fields for email and password */}
          <input type="hidden" name="email" value={formData.email} />
          <input type="hidden" name="password" value={formData.password} />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            fullWidth
          >
            {loading ? "Verifying OTP..." : "Verify OTP"}
          </Button>
        </form>

        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Didn't receive the code?</span>
          <button
            type="button"
            className={`ml-2 font-medium ${
              timer === 0
                ? "text-blue-600 hover:underline"
                : "text-gray-400 cursor-not-allowed"
            }`}
            onClick={handleResendOTP}
            disabled={loading || timer > 0}
          >
            {timer === 0 ? "Resend OTP" : `Resend in ${timer}s`}
          </button>
        </div>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default VerifyOTP;
