import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';


const RequestApproval = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const token = useSelector((state) => state.auth.token);

  // Fetch requests function
  const fetchRequests = async () => {
    if (!token) return; // Exit if no token is present

    try {
      const response = await axios.get('http://localhost:5000/api/candidate/all-requests', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      // Filter out approved requests
      const filteredRequests = response.data.requests.filter((request) => request.status === 'pending');
      
      setRequests(filteredRequests);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching candidate requests:", err);
      setError('Failed to load requests');
      setLoading(false);
    }
  };

  // Fetch requests when token changes
  useEffect(() => {
    if (token) {
      fetchRequests();
    }
  }, [token]);

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/candidate/approve-candidate/${id}`,{}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      fetchRequests(); // Refresh list after approval
      setSnackbarMessage('Candidate approved successfully!');
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Approval failed:", err);
      setSnackbarMessage('Error approving candidate.');
      setSnackbarOpen(true);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/candidate/reject-candidate/${id}`,{}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      fetchRequests(); // Refresh list after rejection
      setSnackbarMessage('Candidate rejected successfully!');
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Rejection failed:", err);
      setSnackbarMessage('Error rejecting candidate.');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><CircularProgress /></div>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Candidate Requests</h1>
      {requests.length === 0 ? (
        <p className="text-lg text-gray-600">No pending requests found.</p>
      ) : (
        <TableContainer component={Paper}>
          <Table className="min-w-full" aria-label="candidate requests table">
            <TableHead>
              <TableRow>
                <TableCell>Candidate Name</TableCell>
                <TableCell>Party</TableCell>
                <TableCell>Election Title</TableCell>
                <TableCell>Wallet Address</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request._id}>
                  <TableCell>{request.userId?.name || 'N/A'}</TableCell>
                  <TableCell>{request.party || 'N/A'}</TableCell>
                  <TableCell>{request.electionId?.title || 'N/A'}</TableCell>
                  <TableCell>{request.walletAddress || request.userId?.walletAddress || 'N/A'}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
  <div className="flex">
    <div className="mr-2">
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleApprove(request._id)}
        disabled={request.status !== 'pending'}
      >
        Approve
      </Button>
    </div>
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleReject(request._id)}
        disabled={request.status !== 'pending'}
      >
        Reject
      </Button>
    </div>
  </div>
</TableCell>


                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Snackbar for success or error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('Error') ? 'error' : 'success'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RequestApproval;
