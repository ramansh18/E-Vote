import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const RequestCandidate = () => {
  const [party, setParty] = useState("");
  const [electionId, setElectionId] = useState("");
  const [elections, setElections] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/election");
        setElections(response.data);
      } catch (error) {
        console.error("Error fetching elections:", error);
      }
    };
    fetchElections();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/candidate/submit-request",
        { party, electionId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSnackbarMessage(response.data.message);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setParty("");
      setElectionId("");
    } catch (error) {
      setSnackbarMessage("Failed to submit candidate request");
      console.error(error);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      <div className="w-full max-w-md px-6 py-10">
        <Typography variant="h5" className="text-center font-semibold mb-4">
          Request to Become a Candidate
        </Typography>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormControl fullWidth required>
            <InputLabel>Election</InputLabel>
            <Select
              value={electionId}
              onChange={(e) => setElectionId(e.target.value)}
              label="Election"
            >
              {elections.map((election) => (
                <MenuItem key={election._id} value={election._id}>
                  {election.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Party Name"
            value={party}
            onChange={(e) => setParty(e.target.value)}
            required
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary" className="mt-2">
            Submit Request
          </Button>
        </form>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default RequestCandidate;
