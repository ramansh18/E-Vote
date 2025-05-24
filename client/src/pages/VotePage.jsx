import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Tooltip,
} from '@mui/material';

const VotePage = () => {
  const token = useSelector((state) => state.auth.token);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [loading, setLoading] = useState(false);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Fetch approved candidates
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const electionId = "6818d5c91207f152e9b3c167";
        const res = await axios.get(`http://localhost:5000/api/election/${electionId}/candidates/approved`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data.candidates)
        setCandidates(res.data.candidates || []);
      } catch (err) {
        showSnackbar('Failed to load candidates', 'error');
        console.error(err);
      }
    };
    fetchCandidates();
  }, [token]);

  // Handle vote
  const castVote = async () => {
    if (!selectedCandidate) {
      showSnackbar('Please select a candidate', 'warning');
      return;
    }
    console.log("candidate--",selectedCandidate)
    try {
      setLoading(true);
      const res = await axios.post(
        'http://localhost:5000/api/voting/vote',
        { candidateAddress: selectedCandidate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        
      );

      showSnackbar('Vote cast successfully!', 'success');
      
      console.log('Transaction Hash:', res.data.txHash);
    } catch (err) {
      const fullMessage = err.response?.data?.error?.cause?.message || "";
      const userFriendlyMessage = fullMessage.includes("revert")
          ? fullMessage.split("revert")[1].trim()
            : "An unexpected error occurred.";
      showSnackbar(userFriendlyMessage || 'Voting failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card className="rounded-2xl shadow-lg">
        <CardContent>
          <Typography variant="h5" className="font-bold mb-6 text-center">
            Cast Your Vote
          </Typography>

          <RadioGroup
            value={selectedCandidate}
            onChange={(e) => setSelectedCandidate(e.target.value)}
          >
            {candidates.length > 0 ? (
              candidates.map((candidate) => (
                <div key={candidate._id} className="mb-4">
                  <FormControlLabel
                    value={candidate.walletAddress}
                    control={<Radio />}
                    label={
                      <Card className="p-4 rounded-lg shadow-md hover:shadow-xl transition-all">
                        <Typography variant="h6" className="capitalize font-semibold">
                          {candidate.user.name}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                          Party: {candidate.party}
                        </Typography>
                        <Tooltip title={`Wallet Address: ${candidate.walletAddress}`} arrow>
                          <Typography variant="body2" className="text-blue-500">
                            Show Wallet Address
                          </Typography>
                        </Tooltip>
                      </Card>
                    }
                  />
                </div>
              ))
            ) : (
              <Typography variant="body2" className="text-gray-500">
                No approved candidates available.
              </Typography>
            )}
          </RadioGroup>

          <div className="mt-6 text-center">
            <Button
              variant="contained"
              color="primary"
              onClick={castVote}
              disabled={loading}
              className="rounded-full px-6"
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Vote'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default VotePage;
