"use client"

import { useState, useEffect } from "react"
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  Avatar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Grid,
  Chip,
  IconButton,
  InputAdornment,
  Fade,
  Slide,
} from "@mui/material"
import {
  Person,
  Email,
  Phone,
  Wc,
  CalendarToday,
  AccountBalanceWallet,
  Edit,
  Save,
  Cancel,
  Verified,
  PhotoCamera,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material"
import { useSelector } from "react-redux"
import axios from "axios"

const ProfileUpdate = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    walletAddress: "",
    avatar: "",
    isVerified: false,
  })
  const [editMode, setEditMode] = useState(false)
  const [error, setError] = useState("")
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  const [showWallet, setShowWallet] = useState(false)
  const [focusedField, setFocusedField] = useState("")

  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setUser(response.data)
      } catch (err) {
        setError("Failed to fetch user data.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchUserData()
  }, [token])

  const validateField = (name, value) => {
    const errors = { ...fieldErrors }

    switch (name) {
      case "name":
        if (!value.trim()) {
          errors.name = "Name is required"
        } else if (value.length < 2) {
          errors.name = "Name must be at least 2 characters"
        } else {
          delete errors.name
        }
        break
      case "phone":
        if (value && !/^\d{10}$/.test(value)) {
          errors.phone = "Phone must be 10 digits"
        } else {
          delete errors.phone
        }
        break
      case "age":
        if (!value || value <= 0 || value > 120) {
          errors.age = "Please enter a valid age (1-120)"
        } else {
          delete errors.age
        }
        break
      default:
        break
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "phone") {
      if (!/^\d*$/.test(value) || value.length > 10) {
        return
      }
    }

    setUser({ ...user, [name]: value })
    validateField(name, value)
  }

  const handleUpdate = async () => {
    const isNameValid = validateField("name", user.name)
    const isAgeValid = validateField("age", user.age)
    const isPhoneValid = validateField("phone", user.phone)

    if (!isNameValid || !isAgeValid || !isPhoneValid) {
      setSnackbar({
        open: true,
        message: "Please fix the errors before saving",
        severity: "error",
      })
      return
    }

    setSaving(true)
    try {
      const response = await axios.put("http://localhost:5000/api/user/update-profile", user, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: "Profile updated successfully!",
          severity: "success",
        })
        setEditMode(false)
        setFieldErrors({})
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Failed to update profile",
        severity: "error",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setEditMode(false)
    setFieldErrors({})
  }

  if (loading) {
    return (
      <Box className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Box className="text-center">
          <Box className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
            <Person className="text-blue-600 text-2xl" />
          </Box>
          <Typography variant="h6" className="text-gray-600">
            Loading your profile...
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <Box className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <Fade in timeout={800}>
          <Paper className="mb-8 p-8 rounded-3xl shadow-lg border-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white overflow-hidden relative">
            {/* Background decoration */}
            <Box className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-32 -translate-y-32"></Box>
            <Box className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full transform -translate-x-24 translate-y-24"></Box>

            <Box className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <Box className="relative group">
                <Box className="absolute -inset-2 bg-white rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></Box>
                <Avatar
                  src={user.avatar || "/placeholder.svg"}
                  className="relative w-28 h-28 shadow-xl border-4 border-white"
                  sx={{ bgcolor: "#1e40af" }}
                >
                  <Typography variant="h3" className="font-bold text-white">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </Typography>
                </Avatar>
                {editMode && (
                  <IconButton className="absolute -bottom-2 -right-2 bg-white text-blue-600 shadow-lg hover:bg-blue-50 transform hover:scale-110 transition-all duration-200">
                    <PhotoCamera />
                  </IconButton>
                )}
              </Box>

              <Box className="flex-1 text-center md:text-left">
                <Box className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                  <Typography variant="h3" className="font-bold">
                    {user.name || "Complete Your Profile"}
                  </Typography>
                  {user.isVerified && (
                    <Chip
                      icon={<Verified />}
                      label="Verified"
                      className="bg-emerald-500 text-white border-0"
                      size="medium"
                    />
                  )}
                </Box>
                <Typography variant="h6" className="opacity-90 mb-2">
                  {user.email}
                </Typography>
                <Typography variant="body1" className="opacity-75">
                  Manage your personal information and voting preferences
                </Typography>
              </Box>

              <Slide direction="left" in timeout={1000}>
                <Box className="flex gap-3">
                  {!editMode ? (
                    <Button
                      variant="contained"
                      startIcon={<Edit />}
                      onClick={() => setEditMode(true)}
                      className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg rounded-2xl px-8 py-4 font-semibold transform hover:scale-105 transition-all duration-200"
                      size="large"
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Box className="flex gap-3">
                      <Button
                        variant="contained"
                        startIcon={<Save />}
                        onClick={handleUpdate}
                        disabled={saving}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg rounded-2xl px-8 py-4 font-semibold transform hover:scale-105 transition-all duration-200"
                        size="large"
                      >
                        {saving ? "Saving..." : "Save Changes"}
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Cancel />}
                        onClick={handleCancel}
                        className="border-2 border-white text-white hover:bg-white hover:text-blue-600 rounded-2xl px-8 py-4 font-semibold transform hover:scale-105 transition-all duration-200"
                        size="large"
                      >
                        Cancel
                      </Button>
                    </Box>
                  )}
                </Box>
              </Slide>
            </Box>
          </Paper>
        </Fade>

        {/* Error Alert */}
        {error && (
          <Slide direction="down" in timeout={500}>
            <Alert severity="error" className="mb-6 rounded-2xl shadow-lg">
              {error}
            </Alert>
          </Slide>
        )}

        {/* Form */}
        <Grid container spacing={6}>
          {/* Personal Information */}
          <Grid item xs={12} lg={6}>
            <Fade in timeout={1200}>
              <Paper className="p-8 rounded-3xl shadow-lg border-0 h-full bg-white hover:shadow-xl transition-shadow duration-300">
                <Box className="flex items-center gap-3 mb-8">
                  <Box className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Person className="text-white" />
                  </Box>
                  <Typography variant="h5" className="font-bold text-gray-800">
                    Personal Information
                  </Typography>
                </Box>

                <Box className="space-y-8">
                  {/* Name Field */}
                  <Box className="relative">
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={user.name || ""}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField("")}
                      disabled={!editMode}
                      error={!!fieldErrors.name}
                      helperText={fieldErrors.name}
                      variant="outlined"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person
                              className={`transition-colors duration-200 ${focusedField === "name" ? "text-blue-600" : "text-gray-400"}`}
                            />
                          </InputAdornment>
                        ),
                        className: `rounded-2xl transition-all duration-200 ${focusedField === "name" ? "shadow-lg" : ""}`,
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderWidth: 2,
                            borderColor: "#e5e7eb",
                          },
                          "&:hover fieldset": {
                            borderColor: "#3b82f6",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#3b82f6",
                            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Email Field */}
                  <Box className="relative">
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      value={user.email || ""}
                      disabled
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email className="text-gray-400" />
                          </InputAdornment>
                        ),
                        className: "rounded-2xl bg-gray-50",
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderWidth: 2,
                            borderColor: "#f3f4f6",
                          },
                        },
                      }}
                    />
                    <Chip
                      label="Protected"
                      size="small"
                      className="absolute -top-3 -right-3 bg-amber-100 text-amber-800 shadow-md"
                    />
                  </Box>

                  {/* Phone Field */}
                  <Box className="relative">
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={user.phone || ""}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField("")}
                      disabled={!editMode}
                      error={!!fieldErrors.phone}
                      helperText={fieldErrors.phone}
                      variant="outlined"
                      placeholder="Enter 10-digit phone number"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone
                              className={`transition-colors duration-200 ${focusedField === "phone" ? "text-blue-600" : "text-gray-400"}`}
                            />
                          </InputAdornment>
                        ),
                        className: `rounded-2xl transition-all duration-200 ${focusedField === "phone" ? "shadow-lg" : ""}`,
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderWidth: 2,
                            borderColor: "#e5e7eb",
                          },
                          "&:hover fieldset": {
                            borderColor: "#3b82f6",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#3b82f6",
                            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Paper>
            </Fade>
          </Grid>

          {/* Additional Details */}
          <Grid item xs={12} lg={6}>
            <Fade in timeout={1400}>
              <Paper className="p-8 rounded-3xl shadow-lg border-0 h-full bg-white hover:shadow-xl transition-shadow duration-300">
                <Box className="flex items-center gap-3 mb-8">
                  <Box className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <CalendarToday className="text-white" />
                  </Box>
                  <Typography variant="h5" className="font-bold text-gray-800">
                    Additional Details
                  </Typography>
                </Box>

                <Box className="space-y-8">
                  {/* Gender Field */}
                  <Box className="relative">
                    <FormControl fullWidth disabled={!editMode}>
                      <InputLabel className="text-gray-600">Gender</InputLabel>
                      <Select
                        name="gender"
                        value={user.gender || ""}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("gender")}
                        onBlur={() => setFocusedField("")}
                        label="Gender"
                        startAdornment={
                          <InputAdornment position="start">
                            <Wc
                              className={`transition-colors duration-200 ${focusedField === "gender" ? "text-blue-600" : "text-gray-400"}`}
                            />
                          </InputAdornment>
                        }
                        className={`rounded-2xl transition-all duration-200 ${focusedField === "gender" ? "shadow-lg" : ""}`}
                        sx={{
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderWidth: 2,
                            borderColor: "#e5e7eb",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#3b82f6",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#3b82f6",
                            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                          },
                        }}
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                        <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Age Field */}
                  <Box className="relative">
                    <TextField
                      fullWidth
                      label="Age"
                      name="age"
                      type="number"
                      value={user.age || ""}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("age")}
                      onBlur={() => setFocusedField("")}
                      disabled={!editMode}
                      error={!!fieldErrors.age}
                      helperText={fieldErrors.age}
                      variant="outlined"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarToday
                              className={`transition-colors duration-200 ${focusedField === "age" ? "text-blue-600" : "text-gray-400"}`}
                            />
                          </InputAdornment>
                        ),
                        className: `rounded-2xl transition-all duration-200 ${focusedField === "age" ? "shadow-lg" : ""}`,
                        inputProps: { min: 1, max: 120 },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderWidth: 2,
                            borderColor: "#e5e7eb",
                          },
                          "&:hover fieldset": {
                            borderColor: "#3b82f6",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#3b82f6",
                            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Wallet Address Field */}
                  <Box className="relative">
                    <TextField
                      fullWidth
                      label="Wallet Address"
                      name="walletAddress"
                      type={showWallet ? "text" : "password"}
                      value={user.walletAddress || ""}
                      disabled
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountBalanceWallet className="text-gray-400" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowWallet(!showWallet)}
                              className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                            >
                              {showWallet ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                        className: "rounded-2xl bg-gray-50",
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderWidth: 2,
                            borderColor: "#f3f4f6",
                          },
                        },
                      }}
                    />
                    <Chip
                      label="Protected"
                      size="small"
                      className="absolute -top-3 -right-3 bg-amber-100 text-amber-800 shadow-md"
                    />
                  </Box>
                </Box>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          className="rounded-2xl shadow-xl"
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default ProfileUpdate
