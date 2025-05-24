/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // useNavigate instead of history
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import back icon

const VoterRegistration = () => {
  const [userData, setUserData] = useState({ name: "", age: "", gender: "" });
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate(); // useNavigate hook

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (err) {
        setSnackbar({
          open: true,
          message: "Failed to load user data",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/voter/register",
        {
          name: userData.name,
          age: userData.age,
          gender: userData.gender,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.message === "Voter is already registered") {
        setSnackbar({ message: "You are already registered as a voter.", severity: 'warning' });
      } else {
        setSnackbar({ message: res.data.message, severity: 'success' });
        // Redirect after successful registration
        setTimeout(() => {
          navigate("/elections"); // Redirect to elections page
        }, 2000);
      }
    } catch (err) {
      //console.error("Axios error:", err.response.data.message);

      let errorMessage = "Registration failed";

      console.log(err);

      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    }
  };

  return (
    <Box className="flex justify-center items-center min-h-screen bg-gray-100 py-8">
      <Card className="w-full max-w-md shadow-xl p-6">
        <CardContent>
          {/* Back Button */}
          <Box display="flex" justifyContent="flex-start" mb={2}>
            <IconButton onClick={() => navigate("/profile")}>
              <ArrowBackIcon />
            </IconButton>
          </Box>

          <Typography variant="h5" className="mb-6 text-center font-bold">
            Confirm Voter Details
          </Typography>

          {loading ? (
            <Typography className="text-center text-gray-500">Loading...</Typography>
          ) : (
            <form>
              <Box mb={2}>
                <TextField
                  label="Name"
                  value={userData.name}
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Age"
                  value={userData.age}
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Gender"
                  value={userData.gender}
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Box>

              <Box mb={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isConfirmed}
                      onChange={(e) => setIsConfirmed(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="I confirm that the above details are correct"
                />
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={!isConfirmed}
                onClick={handleRegister}
              >
                Register as Voter
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default VoterRegistration;
