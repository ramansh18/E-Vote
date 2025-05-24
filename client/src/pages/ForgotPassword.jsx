import { useState } from "react";
import { TextField, Button, Snackbar, Alert, CircularProgress, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";  // Import the ArrowBack icon
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate hook for navigation

function ForgotPassword() {
  const navigate = useNavigate();  // Hook for navigating to the login page
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/request-reset", { email });
      setSnackbar({ open: true, message: "Password reset link sent to your email!", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: error.response?.data?.message || "Failed to send reset link", severity: "error" });
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 shadow-lg rounded-lg">
        {/* Header section with back arrow */}
        <div className="flex items-center mb-4">
          <IconButton onClick={() => navigate("/login")} color="primary" edge="start">
            <ArrowBack /> {/* Back arrow button */}
          </IconButton>
          <h2 className="text-2xl font-bold text-center text-blue-600 ml-4 flex-grow">Forgot Password</h2> {/* Center the title */}
        </div>

        <p className="text-gray-600 text-center mb-6">Enter your email to receive a password reset link.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            variant="outlined"
            size="small"
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Send Reset Link"}
          </Button>
        </form>

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
    </div>
  );
}

export default ForgotPassword;
