import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Snackbar,
  Alert,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const ElectionList = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedElectionId, setSelectedElectionId] = useState(null);
  const [durationInMin, setDurationInMin] = useState("");

  const fetchElections = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/election");
      console.log("Fetched elections:", res.data);
      setElections(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching elections:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/election/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Election deleted:", response.data);
      fetchElections();

      setSnackbar({
        open: true,
        message: "Election deleted successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error deleting election:", error);
      setSnackbar({
        open: true,
        message: "Failed to delete the election!",
        severity: "error",
      });
    }
  };

  const handleStartClick = (id) => {
    setSelectedElectionId(id);
    setDialogOpen(true);
  };

  const handleStartConfirm = async () => {
    const durationInSec = parseInt(durationInMin) * 60;
    console.log(selectedElectionId)
    try {
      await axios.put(
        `http://localhost:5000/api/election/${selectedElectionId}/start`,
        { duration: durationInSec },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchElections();
      setSnackbar({
        open: true,
        message: "Election started successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error starting election:", error.response.data);
      setSnackbar({
        open: true,
        message: "Failed to start the election!",
        severity: "error",
      });
    } finally {
      setDialogOpen(false);
      setDurationInMin("");
      setSelectedElectionId(null);
    }
  };

  const handleEnd = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/election/${id}/end`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchElections();
      setSnackbar({
        open: true,
        message: "Election ended successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error ending election:", error);
      setSnackbar({
        open: true,
        message: "Failed to end the election!",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    fetchElections();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading elections...</p>;

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom align="center">
        All Elections
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Link to="/elections/create">
          <Button variant="contained" color="primary">
            + Create New Election
          </Button>
        </Link>
      </Box>

      {elections.length === 0 ? (
        <Typography align="center">No elections found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Title</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Start Time</strong>
                </TableCell>
                <TableCell>
                  <strong>End Time</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {elections.map((election) => (
                <TableRow key={election._id}>
                  <TableCell>{election.title}</TableCell>
                  <TableCell>{election.status}</TableCell>
                  <TableCell>
                    {new Date(election.startTime).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(election.endTime).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="space-evenly" gap={2}>
                      <Link to={`/election/${election._id}`}>
                        <Button variant="outlined" color="info" size="small">
                          View
                        </Button>
                      </Link>
                      {election.status === "upcoming" && (
                        <Button
                          onClick={() => handleStartClick(election._id)}
                          variant="contained"
                          color="success"
                          size="small"
                        >
                          Start
                        </Button>
                      )}
                      {election.status === "ongoing" && (
                        <Button
                          onClick={() => handleEnd(election._id)}
                          variant="contained"
                          color="warning"
                          size="small"
                        >
                          End
                        </Button>
                      )}
                      <Button
                        onClick={() => handleDelete(election._id)}
                        variant="contained"
                        color="error"
                        size="small"
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Start Election</DialogTitle>
        <DialogContent>
          <TextField
            label="Duration (in minutes)"
            type="number"
            fullWidth
            value={durationInMin}
            onChange={(e) => setDurationInMin(e.target.value)}
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleStartConfirm}
            variant="contained"
            color="primary"
          >
            Start
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
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
    </Paper>
  );
};

export default ElectionList;
