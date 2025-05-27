<<<<<<< HEAD
"use client"
import {
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Paper,
  Fade,
  Grow,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import {
  Security,
  Verified,
  Devices,
  AdminPanelSettings,
  TrendingUp,
  Accessibility,
  Lightbulb,
  Groups,
  Shield,
  Visibility,
  Lock,
  CloudDone,
  Timeline,
  HowToVote,
  Public,
  CheckCircle,
  Rocket,
  EmojiEvents,
  Handshake,
  ArrowForward,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const About = () => {
  const navigate = useNavigate()

  const keyFeatures = [
    {
      icon: <Security />,
      title: "End-to-End Encryption",
      description:
        "Military-grade encryption ensures your vote remains private and secure throughout the entire process.",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      icon: <Shield />,
      title: "Blockchain Security",
      description:
        "Immutable blockchain technology guarantees transparency and prevents any tampering with election results.",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      icon: <Verified />,
      title: "Multi-Factor Authentication",
      description:
        "Advanced user verification with role-based access control for voters, candidates, and administrators.",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      icon: <Timeline />,
      title: "Real-Time Updates",
      description:
        "Live voting progress, instant notifications, and real-time election status updates for all participants.",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
    {
      icon: <Devices />,
      title: "Cross-Platform Access",
      description: "Responsive design that works seamlessly across desktop, tablet, and mobile devices.",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
    {
      icon: <AdminPanelSettings />,
      title: "Comprehensive Management",
      description: "Powerful admin panel for election setup, candidate management, and automated result processing.",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    },
  ]

  const values = [
    {
      icon: <Accessibility />,
      title: "Accessibility First",
      description:
        "Making voting accessible to everyone, regardless of location, physical ability, or technical expertise.",
      color: "#10b981",
    },
    {
      icon: <Visibility />,
      title: "Transparency",
      description: "Open, verifiable processes that build trust and confidence in democratic participation.",
      color: "#3b82f6",
    },
    {
      icon: <Lightbulb />,
      title: "Innovation",
      description: "Leveraging cutting-edge technology to modernize and improve the democratic process.",
      color: "#8b5cf6",
    },
    {
      icon: <Groups />,
      title: "Community Focus",
      description: "Designed by the community, for the community, with continuous feedback and improvement.",
      color: "#f59e0b",
    },
  ]

  const benefits = [
    "Increase voter turnout through convenient access",
    "Reduce election costs and administrative overhead",
    "Eliminate human error in vote counting",
    "Provide instant, verifiable results",
    "Enable participation from remote locations",
    "Support multiple languages and accessibility features",
    "Maintain complete audit trails for transparency",
    "Scale efficiently for elections of any size",
  ]

  const handleGetStarted = () => {
    navigate("/register")
  }

  const handleLearnMore = () => {
    navigate("/elections")
  }

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
        {[...Array(20)].map((_, i) => (
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

      <Container maxWidth="lg" className="relative z-10 py-8">
        <Fade in timeout={1000}>
          <div>
            {/* Hero Section */}
            <Box className="text-center mb-12">
              <Box className="flex justify-center mb-6">
                <Box className="relative">
                  <Box className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                    <HowToVote className="text-white text-3xl" />
                  </Box>
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping"></div>
                </Box>
              </Box>

              <Typography
                variant="h3"
                className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
              >
                About E-Vote
              </Typography>

              <Typography variant="h5" className="text-gray-700 mb-6 font-medium">
                Revolutionizing Democracy Through Technology
              </Typography>

              <Box className="max-w-3xl mx-auto">
                <Typography variant="body1" className="text-gray-600 leading-relaxed mb-6">
                  E-Vote is a cutting-edge electronic voting platform designed to make democratic participation more
                  accessible, secure, and transparent. We believe that every voice matters, and technology should
                  empower citizens to participate in democracy without barriers.
                </Typography>
              </Box>

              <Box className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGetStarted}
                  startIcon={<Rocket />}
                  sx={{
                    px: 5,
                    py: 1.5,
                    fontSize: 16,
                    fontWeight: 700,
                    borderRadius: 3,
                    textTransform: "none",
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                      transform: "translateY(-2px) scale(1.02)",
                      boxShadow: "0 12px 40px rgba(59, 130, 246, 0.4)",
                    },
                  }}
                >
                  Get Started Today
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleLearnMore}
                  startIcon={<ArrowForward />}
                  sx={{
                    px: 5,
                    py: 1.5,
                    fontSize: 16,
                    fontWeight: 700,
                    borderRadius: 3,
                    textTransform: "none",
                    borderWidth: 2,
                    borderColor: "#3b82f6",
                    color: "#3b82f6",
                    "&:hover": {
                      borderWidth: 2,
                      borderColor: "#2563eb",
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Explore Elections
                </Button>
              </Box>
            </Box>

            {/* Mission Statement */}
            <Grow in timeout={800}>
              <Paper
                elevation={24}
                sx={{
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  p: 5,
                  mb: 8,
                  textAlign: "center",
                  maxWidth: 800,
                  mx: "auto",
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                    boxShadow: "0 8px 32px rgba(16, 185, 129, 0.3)",
                  }}
                >
                  <EmojiEvents sx={{ color: "white", fontSize: 30 }} />
                </Box>

                <Typography variant="h4" className="font-bold text-gray-800 mb-3">
                  Our Mission
                </Typography>

                <Typography variant="body1" className="text-gray-600 leading-relaxed">
                  To democratize access to voting by creating a secure, transparent, and user-friendly platform that
                  increases civic participation, reduces electoral fraud, and modernizes democratic processes for the
                  digital age. We envision a world where every eligible citizen can easily and confidently participate
                  in shaping their future.
                </Typography>
              </Paper>
            </Grow>

            {/* Key Features Section */}
            <Box className="mb-12">
              <Box className="text-center mb-8">
                <Typography variant="h4" className="font-bold text-gray-800 mb-3">
                  Powerful Features
                </Typography>
                <Typography variant="body1" className="text-gray-600 max-w-2xl mx-auto">
                  Built with cutting-edge technology to ensure security, transparency, and accessibility
                </Typography>
              </Box>

              <Grid container spacing={3} justifyContent="center">
                {keyFeatures.map((feature, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Grow in timeout={1000 + index * 200}>
                      <Card
                        sx={{
                          borderRadius: 4,
                          background: "rgba(255,255,255,0.95)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          height: 280,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-8px) scale(1.02)",
                            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3, textAlign: "center", height: "100%" }}>
                          <Box
                            sx={{
                              width: 50,
                              height: 50,
                              borderRadius: 3,
                              background: feature.gradient,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              mx: "auto",
                              mb: 2,
                              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                            }}
                          >
                            {feature.icon}
                          </Box>

                          <Typography variant="h6" className="font-bold text-gray-800 mb-2" sx={{ fontSize: "1.1rem" }}>
                            {feature.title}
                          </Typography>

                          <Typography variant="body2" className="text-gray-600 leading-relaxed">
                            {feature.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grow>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Technology & Security Section */}
            <Grow in timeout={1200}>
              <Paper
                elevation={24}
                sx={{
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  overflow: "hidden",
                  mb: 8,
                  maxWidth: 900,
                  mx: "auto",
                }}
              >
                <Box
                  sx={{
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    p: 4,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h4" className="font-bold mb-2">
                    Security & Technology
                  </Typography>
                  <Typography variant="body1" className="opacity-90">
                    Built on a foundation of trust with enterprise-grade security
                  </Typography>
                </Box>

                <Box sx={{ p: 4 }}>
                  <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                      <Typography variant="h5" className="font-bold text-gray-800 mb-3">
                        Why Our Platform is Secure
                      </Typography>

                      <List sx={{ py: 0 }}>
                        {[
                          "256-bit AES encryption for all data transmission",
                          "Blockchain-based vote storage for immutability",
                          "Multi-factor authentication and biometric verification",
                          "Zero-knowledge proofs for voter privacy",
                          "Regular security audits and penetration testing",
                          "Compliance with international election standards",
                        ].map((item, index) => (
                          <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <CheckCircle sx={{ color: "#10b981", fontSize: 20 }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={item}
                              primaryTypographyProps={{
                                variant: "body2",
                                className: "text-gray-700",
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box className="grid grid-cols-2 gap-3">
                        {[
                          { icon: <Lock />, label: "Encrypted", color: "#ef4444" },
                          { icon: <CloudDone />, label: "Cloud Secure", color: "#3b82f6" },
                          { icon: <Verified />, label: "Verified", color: "#10b981" },
                          { icon: <Public />, label: "Transparent", color: "#8b5cf6" },
                        ].map((tech, index) => (
                          <Box
                            key={index}
                            sx={{
                              p: 2,
                              borderRadius: 3,
                              background: `${tech.color}10`,
                              border: `1px solid ${tech.color}20`,
                              textAlign: "center",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: `0 8px 25px ${tech.color}25`,
                              },
                            }}
                          >
                            <Box
                              sx={{
                                width: 36,
                                height: 36,
                                borderRadius: 2,
                                background: tech.color,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                mx: "auto",
                                mb: 1,
                              }}
                            >
                              {tech.icon}
                            </Box>
                            <Typography
                              variant="body2"
                              className="font-semibold text-gray-800"
                              sx={{ fontSize: "0.8rem" }}
                            >
                              {tech.label}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grow>

            {/* Our Values Section */}
            <Box className="mb-12">
              <Box className="text-center mb-8">
                <Typography variant="h4" className="font-bold text-gray-800 mb-3">
                  Our Core Values
                </Typography>
                <Typography variant="body1" className="text-gray-600 max-w-2xl mx-auto">
                  The principles that guide everything we do
                </Typography>
              </Box>

              <Grid container spacing={3} justifyContent="center">
                {values.map((value, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Grow in timeout={1400 + index * 200}>
                      <Box
                        sx={{
                          textAlign: "center",
                          p: 3,
                          borderRadius: 4,
                          background: "rgba(255,255,255,0.95)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          height: 200,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-8px)",
                            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 3,
                            background: value.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            mx: "auto",
                            mb: 2,
                            boxShadow: `0 8px 32px ${value.color}30`,
                          }}
                        >
                          {value.icon}
                        </Box>

                        <Typography variant="h6" className="font-bold text-gray-800 mb-2" sx={{ fontSize: "1rem" }}>
                          {value.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          className="text-gray-600 leading-relaxed"
                          sx={{ fontSize: "0.85rem" }}
                        >
                          {value.description}
                        </Typography>
                      </Box>
                    </Grow>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Benefits Section */}
            <Grow in timeout={1600}>
              <Paper
                elevation={24}
                sx={{
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  p: 5,
                  mb: 8,
                  maxWidth: 900,
                  mx: "auto",
                }}
              >
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 3,
                        background: "linear-gradient(135deg, #f59e0b, #d97706)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                        boxShadow: "0 8px 32px rgba(245, 158, 11, 0.3)",
                      }}
                    >
                      <TrendingUp sx={{ color: "white", fontSize: 30 }} />
                    </Box>

                    <Typography variant="h4" className="font-bold text-gray-800 mb-3">
                      Why Choose E-Vote?
                    </Typography>

                    <Typography variant="body1" className="text-gray-600 leading-relaxed mb-4">
                      Our platform delivers measurable improvements to the democratic process, benefiting voters,
                      candidates, and election administrators alike.
                    </Typography>

                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleGetStarted}
                      startIcon={<Lightbulb />}
                      sx={{
                        px: 5,
                        py: 1.5,
                        fontSize: 16,
                        fontWeight: 700,
                        borderRadius: 3,
                        textTransform: "none",
                        background: "linear-gradient(135deg, #f59e0b, #d97706)",
                        boxShadow: "0 8px 32px rgba(245, 158, 11, 0.3)",
                        "&:hover": {
                          background: "linear-gradient(135deg, #d97706, #b45309)",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      Experience the Difference
                    </Button>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box className="space-y-2">
                      {benefits.map((benefit, index) => (
                        <Box key={index} className="flex items-center gap-2">
                          <CheckCircle sx={{ color: "#10b981", fontSize: 20 }} />
                          <Typography variant="body2" className="text-gray-700">
                            {benefit}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grow>

            {/* Call to Action Section */}
            <Grow in timeout={1800}>
              <Paper
                elevation={24}
                sx={{
                  borderRadius: 4,
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  color: "white",
                  overflow: "hidden",
                  position: "relative",
                  maxWidth: 800,
                  mx: "auto",
                }}
              >
                {/* Decorative elements */}
                <Box className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-24 translate-x-24"></Box>
                <Box className="absolute bottom-0 left-0 w-36 h-36 bg-white/10 rounded-full translate-y-18 -translate-x-18"></Box>

                <Box sx={{ p: 6, textAlign: "center", position: "relative", zIndex: 1 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 3,
                      background: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 3,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Handshake sx={{ fontSize: 30 }} />
                  </Box>

                  <Typography variant="h4" className="font-bold mb-3">
                    Join the Future of Voting
                  </Typography>

                  <Typography variant="body1" className="opacity-90 mb-6">
                    Whether you're a voter looking to participate in democracy, a candidate running for office, or an
                    election authority seeking modern solutions, E-Vote is here to serve you.
                  </Typography>

                  <Box className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleGetStarted}
                      startIcon={<HowToVote />}
                      sx={{
                        px: 6,
                        py: 2,
                        fontSize: 16,
                        fontWeight: 700,
                        borderRadius: 3,
                        textTransform: "none",
                        background: "rgba(255,255,255,0.9)",
                        color: "#3b82f6",
                        "&:hover": {
                          background: "white",
                          transform: "translateY(-2px) scale(1.02)",
                          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
                        },
                      }}
                    >
                      Start Voting Today
                    </Button>

                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate("/contact")}
                      startIcon={<Groups />}
                      sx={{
                        px: 6,
                        py: 2,
                        fontSize: 16,
                        fontWeight: 700,
                        borderRadius: 3,
                        textTransform: "none",
                        borderWidth: 2,
                        borderColor: "rgba(255,255,255,0.8)",
                        color: "white",
                        "&:hover": {
                          borderWidth: 2,
                          borderColor: "white",
                          backgroundColor: "rgba(255,255,255,0.1)",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      Contact Our Team
                    </Button>
                  </Box>

                  <Box className="mt-6 pt-4 border-t border-white/20">
                    <Typography variant="body2" className="opacity-80">
                      Ready to modernize your elections? Let's build the future of democracy together.
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grow>
          </div>
        </Fade>
      </Container>
    </Box>
  )
}

export default About
=======
import React from 'react'

const AboutUs = () => {
  return (
    <div>AboutUs</div>
  )
}

export default AboutUs
>>>>>>> bd9fa6d383f7203ba5137105720a2020638346ab
