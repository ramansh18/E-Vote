import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Card, CardContent, CircularProgress, Alert } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
const VoterListPage = () => {
  const [votersData, setVotersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
    const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    // Fetching data from the API
    axios
      .get("http://localhost:5000/api/voter/all",{
        headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setVotersData(response.data.votersData);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch voter data.");
        console.log(err)
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Typography variant="h4" gutterBottom>
        Registered Voters
      </Typography>
      <Grid container spacing={3}>
        {votersData.length === 0 ? (
          <Alert severity="info">No registered voters found.</Alert>
        ) : (
          votersData.map((voter) => (
            <Grid item xs={12} sm={6} md={4} key={voter._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{voter.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Wallet Address: {voter.walletAddress}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Email: {voter.email}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default VoterListPage;
