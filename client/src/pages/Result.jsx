import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AB47BC', '#FF5252'];

const ResultPage = () => {
  const { electionId } = useParams();
  const [election, setElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [winner, setWinner] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error',
  });

  const { width, height } = useWindowSize();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        console.log(electionId)
        const res = await axios.get(`http://localhost:5000/api/election/${electionId}/results`);
        setElection(res.data.election);
        console.log(res.data)
        setCandidates(res.data.candidates);
        const sorted = [...res.data.candidates].sort((a, b) => b.votes - a.votes);
        if (res.data.election.status === 'completed' && sorted[0]?.votes > 0) {
          setWinner(sorted[0]);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000); // Stop after 5s
        }
        console.log("election kya hai",election)
      } catch (error) {
        console.error(error);
        setSnackbar({
          open: true,
          message: 'Failed to fetch election results',
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [electionId]);

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const pieData = candidates.map((c, i) => ({
    name: c.name,
    value: c.votes,
    color: COLORS[i % COLORS.length],
  }));

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Result of National Leadership Election 2025
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', height: '60vh' }}>
          <CircularProgress size={80} />
        </Box>
      ) : (
        <>
          <Card sx={{ maxWidth: 1000, margin: 'auto', mb: 4 }}>
            <CardContent>
              <Typography variant="h5" align="center">
                {election.status === 'ongoing' ? 'Election Ongoing' : 'Election Completed'}
              </Typography>
              {election.status === 'completed' && (
                <Typography variant="h6" align="center" color="green">
                  Final Results
                </Typography>
              )}
            </CardContent>
          </Card>

          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={140}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          <AnimatePresence>
            {showConfetti && (
              <>
                <Confetti width={width} height={height} zIndex={9999} />
                {winner && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      position: 'fixed',
                      top: '20%',
                      left: '25%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 9999,
                      background: 'white',
                      padding: '30px 40px',
                      borderRadius: '12px',
                      textAlign: 'center',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    }}
                  >
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      🎉 Congratulations {winner.name}!
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      You are the winner of this election!
                    </Typography>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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

export default ResultPage;
