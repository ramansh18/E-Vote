"use client"

import { useState, useEffect } from "react"
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Paper,
  TextField,
  Fade,
  Grow,
  Snackbar,
  Alert,
  CircularProgress,
  Chip,
} from "@mui/material"
import {
  Email,
  Phone,
  LocationOn,
  Schedule,
  Send,
  Support,
  Business,
  Help,
  Security,
  Language,
  Groups,
  Chat,
  ContactSupport,
  Public,
  AccessTime,
} from "@mui/icons-material"

const ContactUs = () => {
  const [showContent, setShowContent] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    inquiryType: "general",
  })
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })
<<<<<<< HEAD
  const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    background: "rgba(255,255,255,0.8)",
    "&:hover fieldset": {
      borderColor: "#3b82f6",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3b82f6",
    },
  },
};
=======
>>>>>>> bd9fa6d383f7203ba5137105720a2020638346ab

  useEffect(() => {
    setShowContent(true)
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSnackbar({
        open: true,
        message: "Thank you for your message! We'll get back to you within 24 hours.",
        severity: "success",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
        inquiryType: "general",
      })
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to send message. Please try again.",
        severity: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  const contactMethods = [
    {
      icon: <Email />,
      title: "Email Support",
      description: "Get help via email",
<<<<<<< HEAD
      contact: "ramansh8055@gmail.com",
=======
      contact: "support@e-vote.com",
>>>>>>> bd9fa6d383f7203ba5137105720a2020638346ab
      action: "Send Email",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      responseTime: "Within 4 hours",
    },
    {
      icon: <Phone />,
      title: "Phone Support",
      description: "Speak with our team",
<<<<<<< HEAD
      contact: "+91 8188875241",
=======
      contact: "+1 (555) 123-VOTE",
>>>>>>> bd9fa6d383f7203ba5137105720a2020638346ab
      action: "Call Now",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      responseTime: "Immediate",
    },
    {
      icon: <Chat />,
      title: "Live Chat",
      description: "Chat with support",
      contact: "Available 24/7",
      action: "Start Chat",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      responseTime: "Real-time",
    },
    {
      icon: <Help />,
      title: "Help Center",
      description: "Browse our knowledge base",
      contact: "Self-service portal",
      action: "Visit Center",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      responseTime: "Instant",
    },
  ]

<<<<<<< HEAD
=======
  const offices = [
    {
      city: "San Francisco",
      country: "USA",
      address: "123 Democracy Street, Suite 400",
      zipCode: "CA 94102",
      phone: "+1 (555) 123-VOTE",
      email: "sf@e-vote.com",
      timezone: "PST (UTC-8)",
      isHeadquarters: true,
    },
    {
      city: "New York",
      country: "USA",
      address: "456 Liberty Avenue, Floor 15",
      zipCode: "NY 10001",
      phone: "+1 (555) 456-VOTE",
      email: "ny@e-vote.com",
      timezone: "EST (UTC-5)",
      isHeadquarters: false,
    },
    {
      city: "London",
      country: "UK",
      address: "789 Parliament Road, Level 8",
      zipCode: "SW1A 1AA",
      phone: "+44 20 7123 4567",
      email: "london@e-vote.com",
      timezone: "GMT (UTC+0)",
      isHeadquarters: false,
    },
    {
      city: "Toronto",
      country: "Canada",
      address: "321 Maple Street, Suite 200",
      zipCode: "ON M5V 3A8",
      phone: "+1 (416) 555-VOTE",
      email: "toronto@e-vote.com",
      timezone: "EST (UTC-5)",
      isHeadquarters: false,
    },
  ]

  const inquiryTypes = [
    { value: "general", label: "General Inquiry", icon: <ContactSupport /> },
    { value: "sales", label: "Sales & Pricing", icon: <Business /> },
    { value: "support", label: "Technical Support", icon: <Support /> },
    { value: "security", label: "Security Questions", icon: <Security /> },
    { value: "partnership", label: "Partnership", icon: <Groups /> },
  ]
>>>>>>> bd9fa6d383f7203ba5137105720a2020638346ab

  return (
    <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-bounce"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      <Container maxWidth="xl" className="relative z-10 py-8">
        <Fade in={showContent} timeout={1000}>
          <div>
            {/* Hero Section */}
            <Box className="text-center mb-16">
              <Box className="flex justify-center mb-8">
                <Box className="relative">
                  <Box className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                    <ContactSupport className="text-white text-5xl" />
                  </Box>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping"></div>
                </Box>
              </Box>

              <Typography
                variant="h2"
                className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
                sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" } }}
              >
                Get in Touch
              </Typography>

<<<<<<< HEAD
              <Box className="flex justify-center mb-3">
                <Typography
=======
              <Typography
>>>>>>> bd9fa6d383f7203ba5137105720a2020638346ab
                variant="h5"
                className="text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8"
                sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}
              >
                Have questions about E-Vote? Need technical support? Want to discuss enterprise solutions? We're here to
                help you every step of the way.
              </Typography>
<<<<<<< HEAD
              </Box>

              
            </Box>

            

            {/* Contact Form and Office Locations */}
         <Grid container spacing={6} justifyContent="center" className="mb-16">
  {/* Contact Form */}
  <Grid item xs={12} md={10} lg={10}>
    <Grow in={showContent} timeout={1200}>
      <Paper
        elevation={24}
        sx={{
          borderRadius: 4,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.2)",
          p: 6,
          mx: "auto",
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        <Typography variant="h4" className="font-bold text-gray-800 mb-6">
          Send Us a Message
        </Typography>

        <Box component="form" onSubmit={handleSubmit} >
          <TextField
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            required
            fullWidth
            variant="outlined"
            sx={{
                mt:3,
                mb:2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                background: "rgba(255,255,255,0.8)",
                "&:hover fieldset": {
                  borderColor: "#3b82f6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3b82f6",
                },
              },
            }}
          />

          <TextField
            name="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            fullWidth
            variant="outlined"
            sx={{
                mb:2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                background: "rgba(255,255,255,0.8)",
                "&:hover fieldset": {
                  borderColor: "#3b82f6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3b82f6",
                },
              },
            }}
          />

          <TextField
            name="subject"
            label="Subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            fullWidth
            variant="outlined"
            sx={{
                mb:2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                background: "rgba(255,255,255,0.8)",
                "&:hover fieldset": {
                  borderColor: "#3b82f6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3b82f6",
                },
              },
            }}
          />

          <TextField
            name="message"
            label="Message"
            value={formData.message}
            onChange={handleInputChange}
            required
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{
                mb:2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                background: "rgba(255,255,255,0.8)",
                "&:hover fieldset": {
                  borderColor: "#3b82f6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3b82f6",
                },
              },
            }}
          />

          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
              sx={{
                px: 5,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 700,
                borderRadius: 4,
                textTransform: "none",
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                  transform: "translateY(-2px) scale(1.02)",
                  boxShadow: "0 12px 40px rgba(59, 130, 246, 0.4)",
                },
                "&:disabled": {
                  background: "linear-gradient(135deg, #9ca3af, #6b7280)",
                  transform: "none",
                },
              }}
            >
              {loading ? "Sending Message..." : "Send Message"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Grow>
  </Grid>
</Grid>




{/* Contact Methods */}
=======

              <Box className="flex flex-wrap justify-center gap-4">
                <Chip
                  icon={<AccessTime />}
                  label="24/7 Support Available"
                  sx={{
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1rem",
                    py: 3,
                    px: 2,
                  }}
                />
                <Chip
                  icon={<Public />}
                  label="Global Coverage"
                  sx={{
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1rem",
                    py: 3,
                    px: 2,
                  }}
                />
                <Chip
                  icon={<Language />}
                  label="Multiple Languages"
                  sx={{
                    background: "linear-gradient(135deg, #f59e0b, #d97706)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1rem",
                    py: 3,
                    px: 2,
                  }}
                />
              </Box>
            </Box>

            {/* Contact Methods */}
>>>>>>> bd9fa6d383f7203ba5137105720a2020638346ab
            <Box className="mb-16">
              <Box className="text-center mb-12">
                <Typography variant="h3" className="font-bold text-gray-800 mb-4">
                  How Can We Help?
                </Typography>
<<<<<<< HEAD
                <Box className="flex justify-center">
                    <Typography variant="h6" className="text-gray-600 max-w-3xl mx-auto">
                  Choose the best way to reach us based on your needs and urgency
                </Typography>
                </Box>
=======
                <Typography variant="h6" className="text-gray-600 max-w-3xl mx-auto">
                  Choose the best way to reach us based on your needs and urgency
                </Typography>
>>>>>>> bd9fa6d383f7203ba5137105720a2020638346ab
              </Box>

              <Grid container spacing={4}>
                {contactMethods.map((method, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Grow in={showContent} timeout={800 + index * 200}>
                      <Card
                        sx={{
                          borderRadius: 4,
                          background: "rgba(255,255,255,0.95)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          height: "100%",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-8px) scale(1.02)",
                            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                          },
                        }}
                      >
                        <CardContent sx={{ p: 4, textAlign: "center", height: "100%" }}>
                          <Box
                            sx={{
                              width: 64,
                              height: 64,
                              borderRadius: 4,
                              background: method.gradient,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              mx: "auto",
                              mb: 3,
                              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                            }}
                          >
                            {method.icon}
                          </Box>
                          <Typography variant="h6" className="font-bold text-gray-800 mb-2">
                            {method.title}
                          </Typography>
                          <Typography variant="body2" className="text-gray-600 mb-3">
                            {method.description}
                          </Typography>
                          <Typography variant="body1" className="font-semibold text-gray-800 mb-2">
                            {method.contact}
                          </Typography>
                          <Chip
                            label={method.responseTime}
                            size="small"
                            sx={{
                              background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
                              color: "#3b82f6",
                              fontWeight: 600,
                              mb: 3,
                            }}
                          />
                          <Button
                            variant="contained"
                            fullWidth
                            sx={{
                              mt: 2,
                              background: method.gradient,
                              fontWeight: 600,
                              borderRadius: 3,
                              py: 1.5,
                              "&:hover": {
                                transform: "translateY(-2px)",
                                boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                              },
                            }}
                          >
                            {method.action}
                          </Button>
                        </CardContent>
                      </Card>
                    </Grow>
                  </Grid>
                ))}
              </Grid>
            </Box>

<<<<<<< HEAD

           
=======
            {/* Contact Form and Office Locations */}
            <Grid container spacing={6} className="mb-16">
              {/* Contact Form */}
              <Grid item xs={12} lg={7}>
                <Grow in={showContent} timeout={1200}>
                  <Paper
                    elevation={24}
                    sx={{
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      p: 4,
                    }}
                  >
                    <Typography variant="h4" className="font-bold text-gray-800 mb-6">
                      Send Us a Message
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} className="space-y-6">
                      {/* Inquiry Type Selection */}
                      <Box>
                        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-3">
                          What can we help you with?
                        </Typography>
                        <Box className="flex flex-wrap gap-2">
                          {inquiryTypes.map((type) => (
                            <Chip
                              key={type.value}
                              icon={type.icon}
                              label={type.label}
                              clickable
                              onClick={() => setFormData({ ...formData, inquiryType: type.value })}
                              sx={{
                                background:
                                  formData.inquiryType === type.value
                                    ? "linear-gradient(135deg, #3b82f6, #8b5cf6)"
                                    : "rgba(255,255,255,0.8)",
                                color: formData.inquiryType === type.value ? "white" : "#6b7280",
                                fontWeight: 600,
                                border:
                                  formData.inquiryType === type.value ? "none" : "1px solid rgba(107, 114, 128, 0.3)",
                                "&:hover": {
                                  background:
                                    formData.inquiryType === type.value
                                      ? "linear-gradient(135deg, #2563eb, #7c3aed)"
                                      : "rgba(59, 130, 246, 0.1)",
                                },
                              }}
                            />
                          ))}
                        </Box>
                      </Box>

                      {/* Form Fields */}
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            name="name"
                            label="Full Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            variant="outlined"
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 3,
                                background: "rgba(255,255,255,0.8)",
                                "&:hover fieldset": {
                                  borderColor: "#3b82f6",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#3b82f6",
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            name="email"
                            label="Email Address"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            variant="outlined"
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 3,
                                background: "rgba(255,255,255,0.8)",
                                "&:hover fieldset": {
                                  borderColor: "#3b82f6",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#3b82f6",
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            name="company"
                            label="Company/Organization (Optional)"
                            value={formData.company}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 3,
                                background: "rgba(255,255,255,0.8)",
                                "&:hover fieldset": {
                                  borderColor: "#3b82f6",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#3b82f6",
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            name="subject"
                            label="Subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            variant="outlined"
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 3,
                                background: "rgba(255,255,255,0.8)",
                                "&:hover fieldset": {
                                  borderColor: "#3b82f6",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#3b82f6",
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            name="message"
                            label="Message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 3,
                                background: "rgba(255,255,255,0.8)",
                                "&:hover fieldset": {
                                  borderColor: "#3b82f6",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#3b82f6",
                                },
                              },
                            }}
                          />
                        </Grid>
                      </Grid>

                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
                        sx={{
                          px: 6,
                          py: 3,
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          borderRadius: 4,
                          textTransform: "none",
                          background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                          boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                            transform: "translateY(-2px) scale(1.02)",
                            boxShadow: "0 12px 40px rgba(59, 130, 246, 0.4)",
                          },
                          "&:disabled": {
                            background: "linear-gradient(135deg, #9ca3af, #6b7280)",
                            transform: "none",
                          },
                        }}
                      >
                        {loading ? "Sending Message..." : "Send Message"}
                      </Button>
                    </Box>
                  </Paper>
                </Grow>
              </Grid>

              {/* Office Locations */}
              <Grid item xs={12} lg={5}>
                <Grow in={showContent} timeout={1400}>
                  <Paper
                    elevation={24}
                    sx={{
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      p: 4,
                      height: "fit-content",
                    }}
                  >
                    <Typography variant="h4" className="font-bold text-gray-800 mb-6">
                      Our Offices
                    </Typography>

                    <Box className="space-y-4">
                      {offices.map((office, index) => (
                        <Box
                          key={index}
                          sx={{
                            p: 3,
                            borderRadius: 3,
                            background: "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6))",
                            border: "1px solid rgba(255,255,255,0.3)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-2px)",
                              boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                            },
                          }}
                        >
                          <Box className="flex items-start justify-between mb-3">
                            <Box>
                              <Box className="flex items-center gap-2 mb-1">
                                <Typography variant="h6" className="font-bold text-gray-800">
                                  {office.city}
                                </Typography>
                                {office.isHeadquarters && (
                                  <Chip
                                    label="HQ"
                                    size="small"
                                    sx={{
                                      background: "linear-gradient(135deg, #f59e0b, #d97706)",
                                      color: "white",
                                      fontWeight: 600,
                                      fontSize: "0.75rem",
                                    }}
                                  />
                                )}
                              </Box>
                              <Typography variant="body2" className="text-gray-600 font-medium">
                                {office.country}
                              </Typography>
                            </Box>
                            <LocationOn sx={{ color: "#3b82f6" }} />
                          </Box>

                          <Box className="space-y-2">
                            <Box className="flex items-center gap-2">
                              <LocationOn sx={{ color: "#6b7280", fontSize: 18 }} />
                              <Typography variant="body2" className="text-gray-600">
                                {office.address}, {office.zipCode}
                              </Typography>
                            </Box>
                            <Box className="flex items-center gap-2">
                              <Phone sx={{ color: "#6b7280", fontSize: 18 }} />
                              <Typography variant="body2" className="text-gray-600">
                                {office.phone}
                              </Typography>
                            </Box>
                            <Box className="flex items-center gap-2">
                              <Email sx={{ color: "#6b7280", fontSize: 18 }} />
                              <Typography variant="body2" className="text-gray-600">
                                {office.email}
                              </Typography>
                            </Box>
                            <Box className="flex items-center gap-2">
                              <Schedule sx={{ color: "#6b7280", fontSize: 18 }} />
                              <Typography variant="body2" className="text-gray-600">
                                {office.timezone}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                </Grow>
              </Grid>
            </Grid>

            {/* FAQ Section */}
            <Box>
              <Grow in={showContent} timeout={1600}>
                <Paper
                  elevation={24}
                  sx={{
                    borderRadius: 6,
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      background: "linear-gradient(135deg, #10b981, #059669)",
                      p: { xs: 4, md: 6 },
                      position: "relative",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {/* Decorative elements */}
                    <Box className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-24 translate-x-24"></Box>
                    <Box className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></Box>

                    <Box className="relative z-10">
                      <Typography variant="h3" className="font-bold mb-4">
                        Need Immediate Help?
                      </Typography>
                      <Typography variant="h6" className="opacity-90 mb-6 max-w-2xl mx-auto">
                        Check out our comprehensive help center with guides, tutorials, and frequently asked questions.
                      </Typography>
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<Help />}
                        sx={{
                          background: "rgba(255,255,255,0.9)",
                          color: "#059669",
                          fontWeight: 700,
                          borderRadius: 4,
                          px: 6,
                          py: 2,
                          "&:hover": {
                            background: "white",
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 25px rgba(255,255,255,0.3)",
                          },
                        }}
                      >
                        Visit Help Center
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </Grow>
            </Box>
>>>>>>> bd9fa6d383f7203ba5137105720a2020638346ab
          </div>
        </Fade>
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            borderRadius: 3,
            backdropFilter: "blur(20px)",
            fontWeight: 600,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

<<<<<<< HEAD
export default ContactUs
=======
export default ContactUs
>>>>>>> bd9fa6d383f7203ba5137105720a2020638346ab
