import { useState, useEffect } from "react";
import { TextField, Button, Snackbar, Alert, CircularProgress } from "@mui/material";
import axios from "axios";
import { useLocation,useNavigate} from "react-router-dom";

function ResetPassword() {
  const location = useLocation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [token, setToken] = useState("");
    const navigate = useNavigate();
  // Get the token from the URL query parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromURL = queryParams.get("token");
    if (tokenFromURL) {
      setToken(tokenFromURL);
    } else {
      setSnackbar({ open: true, message: "Invalid or missing token!", severity: "error" });
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setSnackbar({ open: true, message: "Passwords do not match!", severity: "warning" });
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", { token, newPassword });
      setSnackbar({ open: true, message: "Password reset successful!", severity: "success" });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setSnackbar({ open: true, message: error.response?.data?.message || "Failed to reset password", severity: "error" });
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">Reset Password</h2>
        <p className="text-gray-600 text-center mb-6">Enter your new password below.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            fullWidth
            variant="outlined"
            size="small"
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? <CircularProgress size={24} color="inherit" /> : "Reset Password"}
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

export default ResetPassword;
