// src/pages/admin/ApprovedCandidates.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Chip,
} from "@mui/material";
import { CheckCircle, ArrowBack } from "@mui/icons-material";

export default function ApprovedCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApprovedCandidates = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/candidate/approved"
        );
        setCandidates(data.candidates);
      } catch (error) {
        console.error("Error fetching approved candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedCandidates();
  }, []);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/admin/dashboard")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition mb-4"
      >
        <ArrowBack />
        <span className="text-md font-medium">Back</span>
      </button>

      <Typography variant="h4" gutterBottom>
        Approved Candidates
      </Typography>

      <Grid container spacing={3}>
        {candidates.map((candidate) => (
          <Grid item xs={12} sm={6} md={4} key={candidate._id}>
            <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="h6" component="div">
                    {candidate.userId.name}
                  </Typography>
                  <Chip
                    label="Approved"
                    color="success"
                    size="small"
                    icon={<CheckCircle fontSize="small" />}
                  />
                </div>
                <Typography variant="body2" color="text.secondary">
                  <strong>Email:</strong> {candidate.userId.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Election:</strong> {candidate.electionId.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Party:</strong> {candidate.party}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="break-all"
                >
                  <strong>Wallet:</strong> {candidate.walletAddress}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
