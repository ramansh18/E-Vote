import { useState } from "react";
import { TextField, Button, Card, CardContent, Snackbar, Alert, CircularProgress, Grid, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import eVotingImage from '../assets/6386.jpg'; // Ensure this is the correct path

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(formData)
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      setSnackbar({ open: true, message: response.data.message, severity: 'success' });

      // After successful OTP sent, navigate to OTP verification page
      setTimeout(() => {
        navigate('/verify-otp', { state: { email: formData.email, name: formData.name,password: formData.password, phone:formData.phone } });
      }, 1500);
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: error.response?.data?.message || 'Registration failed', severity: 'error' });
    }

    setLoading(false);
  };

  return (
    <div className="flex w-full min-h-screen">
      {/* Left Side - Form */}
      <Box
        sx={{
          width: '50%',
          bgcolor: 'white',
          borderRadius: 3,
          boxShadow: 3,
          p: 3,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 2 }}>
          Create an Account
        </Typography>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ borderRadius: 2 }}
                />
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    fontSize: 16,
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Box>

      {/* Right Side - Image */}
      <Box
        sx={{
          width: '50%',
          bgcolor: 'white',
          borderTopRightRadius: 3,
          borderBottomRightRadius: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={eVotingImage}
          alt="E-Voting"
          loading="lazy"
          style={{
            width: '80%', // Adjust image size
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        />
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Register;
