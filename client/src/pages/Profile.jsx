// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { TextField, Button, Card, CardContent, Snackbar, Alert } from "@mui/material";
import axios from "axios";

function Profile() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    // Fetch user data from backend
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        const response = await axios.get("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);  // Update state with fetched data
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        "http://localhost:5000/api/user/profile",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSnackbar({ open: true, message: response.data.message, severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: error.response?.data?.message || "Profile update failed", severity: "error" });
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <Card className="w-full max-w-md p-6">
        <CardContent>
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Update Profile</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField
              label="Name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleChange}
              fullWidth
              disabled
            />
            <TextField
              label="Phone"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              fullWidth
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              fullWidth
            >
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>

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

export default Profile;
