import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Elections = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/election/available");
        setElections(res.data);
      } catch (err) {
        console.loh(err)
        setSnackbar({
          open: true,
          message: "Failed to load elections",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchElections();
  }, []);

  const handleJoinElection = (electionId) => {
    navigate(`/election/${electionId}`);
  };

  return (
    <Box className="flex justify-center items-center min-h-screen bg-gray-100 py-8">
      <div className="w-full max-w-4xl p-4">
        <Typography variant="h4" className="mb-6 text-center font-bold">
          Upcoming & Ongoing Elections
        </Typography>

        {loading ? (
          <Box className="flex justify-center mt-10">
            <CircularProgress />
          </Box>
        ) : elections.length === 0 ? (
          <Typography className="text-center text-gray-500">
            No elections are currently available.
          </Typography>
        ) : (
          elections.map((election) => (
            <Card key={election._id} className="mb-4 shadow-md">
              <CardContent>
                <Typography variant="h6" className="font-semibold">
                  {election.title}
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-2">
                  {election.description}
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  Start: {new Date(election.startTime).toLocaleString()}
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  End: {new Date(election.endTime).toLocaleString()}
                </Typography>
                <Typography variant="body2" className="text-gray-500 mb-2">
                  Status: <strong>{election.status}</strong>
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleJoinElection(election._id)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>

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

export default Elections;
