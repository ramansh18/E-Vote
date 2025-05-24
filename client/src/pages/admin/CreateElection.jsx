import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {
    Box,
    TextField,
    Typography,
    Button,
    Snackbar,
    Alert,
    IconButton,
    Paper
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CreateElection = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [snackMessage, setSnackMessage] = useState('');
    const [severity, setSeverity] = useState('error');
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !startTime || !endTime) {
            setSnackMessage("All fields are required!");
            setSeverity('error');
            setOpen(true);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/election', {
                title,
                description,
                startTime,
                endTime,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                setSnackMessage("Election created successfully!");
                setSeverity('success');
                setOpen(true);
                setTitle('');
                setDescription('');
                setStartTime('');
                setEndTime('');
            }
        } catch (error) {
            console.error("Error creating election:", error);
            setSnackMessage("Error creating election. Please try again.");
            setSeverity('error');
            setOpen(true);
        }
    };

    const handleClose = () => setOpen(false);
    const handleBack = () => navigate('/elections');

    return (
        <Box maxWidth="600px" mx="auto" p={3}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box display="flex" alignItems="center" mb={2}>
                    <IconButton onClick={handleBack} aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h5" fontWeight="bold" ml={1}>
                        Create New Election
                    </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        fullWidth
                        label="Election Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        margin="normal"
                        multiline
                        rows={3}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Start Time"
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="End Time"
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                    >
                        Create Election
                    </Button>
                </Box>
            </Paper>

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {snackMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CreateElection;
