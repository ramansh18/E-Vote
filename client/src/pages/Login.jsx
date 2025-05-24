import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert, Link } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoginSuccess } from '../redux/authSlice';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      const token = response.data.token;
      const decoded = jwtDecode(token);
      const isAdmin = decoded.isAdmin;

      // ✅ Store in Redux and localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('isAdmin', isAdmin);
      dispatch(setLoginSuccess({ token, isAdmin }));

      setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });

      // ✅ Delay navigation slightly for Snackbar
      setTimeout(() => {
        if (isAdmin) {
          navigate('/admin/dashboard');
        } else {
          navigate('/profile');
        }
      }, 1500);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Login failed',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Navigate to the Forgot Password page
  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            fullWidth
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="flex justify-end mt-2">
          <Link onClick={handleForgotPassword} className="text-blue-600 cursor-pointer">
            Forgot Password?
          </Link>
        </div>
      </div>

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
};

export default Login;
