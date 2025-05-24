import React from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import SecurityIcon from "@mui/icons-material/Security";
import SpeedIcon from "@mui/icons-material/Speed";

const features = [
  {
    icon: <HowToVoteIcon sx={{ fontSize: 50, color: "#2563eb" }} />,
    title: "Easy Voting",
    description:
      "Vote easily from anywhere, anytime with a secure digital wallet.",
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 50, color: "#2563eb" }} />,
    title: "Secure & Transparent",
    description:
      "Blockchain ensures every vote is tamper-proof and fully transparent.",
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 50, color: "#2563eb" }} />,
    title: "Fast Results",
    description:
      "Instantly see election outcomes after polls close with zero delays.",
  },
];

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(270deg, #4f46e5, #3b82f6, #2563eb)",
        backgroundSize: "600% 600%",
        animation: "gradientAnimation 20s ease infinite",
        color: "white",
      }}
    >
      {/* Hero Section */}
      <Container
        maxWidth="md"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 3,
          py: 10,
          animation: "fadeIn 1.5s ease forwards",
          opacity: 0,
          "@keyframes fadeIn": {
            "to": { opacity: 1 },
          },
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: "900",
            mb: 3,
            textShadow: "2px 2px 8px rgba(0,0,0,0.4)",
            lineHeight: 1.1,
          }}
        >
          Secure & Transparent <br /> E-Voting System
        </Typography>
        <Typography
          variant="h6"
          sx={{ mb: 8, maxWidth: 600, color: "#d1d5db", fontWeight: "500" }}
        >
          Empower democracy with blockchain technology. Vote anytime, anywhere.
        </Typography>

      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
  <Button
    variant="outlined"
    size="large"
    href="/register"
    sx={{
      color: "white",
      borderColor: "white",
      px: 5,
      py: 1.8,
      fontWeight: 700,
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "white",
        color: "#2563eb",
        borderColor: "white",
        transform: "scale(1.05)",
        boxShadow: "0 4px 20px rgba(255,255,255,0.2)",
      },
    }}
  >
    Register to Vote
  </Button>

  <Button
    variant="outlined"
    size="large"
    href="/login"
    sx={{
      color: "white",
      borderColor: "white",
      px: 5,
      py: 1.8,
      fontWeight: 700,
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "white",
        color: "#2563eb",
        borderColor: "white",
        transform: "scale(1.05)",
        boxShadow: "0 4px 20px rgba(255,255,255,0.2)",
      },
    }}
  >
    Login
  </Button>
</Box>


      </Container>

      {/* Wave Divider */}
      <Box sx={{ width: "100%", overflow: "hidden", lineHeight: 0 }}>
        <svg
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: 80 }}
        >
          <path
            d="M0,30 C150,80 350,0 600,30 C850,60 1050,10 1200,30 L1200,100 L0,100 Z"
            fill="white"
          />
        </svg>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          bgcolor: "white",
          color: "#2563eb",
          py: 12,
          px: { xs: 4, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            mb={10}
            sx={{ userSelect: "none" }}
          >
            Why Choose E-Vote?
          </Typography>

          <Grid container spacing={8} justifyContent="center">
            {features.map(({ icon, title, description }, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Paper
                  elevation={6}
                  sx={{
                    p: 5,
                    borderRadius: 3,
                    textAlign: "center",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "default",
                    userSelect: "none",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 12px 24px rgba(37, 99, 235, 0.35)",
                    },
                  }}
                >
                  {icon}
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    mt={3}
                    mb={2}
                  >
                    {title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Background Gradient Animation Keyframes */}
      <style>{`
        @keyframes gradientAnimation {
          0% {background-position:0% 50%}
          50% {background-position:100% 50%}
          100% {background-position:0% 50%}
        }
      `}</style>
    </Box>
  );
}
