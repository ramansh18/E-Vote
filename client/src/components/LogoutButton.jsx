import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogout } from '../redux/authSlice';
import { Snackbar, Alert } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    // Dispatch Redux logout action to clear state
    dispatch(setLogout());
    localStorage.clear();

    // Show the Snackbar
    setOpen(true);

    // Redirect after Snackbar delay (so it can show properly)
    setTimeout(() => {
      navigate('/login');
    }, 1500); // Set this duration to match Snackbar autoHideDuration (2 seconds)
  };

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full transition duration-200 shadow-md"
      >
        <LogoutIcon fontSize="small" />
        Logout
      </button>

      <Snackbar
        open={open}
        autoHideDuration={2000} // Ensure this matches your setTimeout for smooth UX
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Logged out successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default LogoutButton;
