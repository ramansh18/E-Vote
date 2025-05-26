"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  CardContent,
  Typography,
  Grid,
  Avatar,
  Chip,
  Button,
  Tabs,
  Tab,
  Alert,
  LinearProgress,
  Paper,
  IconButton,
  Badge,
  ListItem,
  ListItemText,
  ListItemIcon,
  Container,
  Fade,
  Grow,
  Backdrop,
  Box,
} from "@mui/material"
import {
  HowToVote as VoteIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Notifications as NotificationsIcon,
  Analytics as AnalyticsIcon,
  History as HistoryIcon,
  Verified as VerifiedIcon,
  Error as ErrorIcon,
  Refresh as RefreshIcon,
  PersonAdd as PersonAddIcon,
  HowToReg as HowToRegIcon,
  Campaign as CampaignIcon,
  Dashboard as DashboardIcon,
  TrendingUp,
  Security,
  Public,
} from "@mui/icons-material"

const Dashboard = () => {
  const { isLoggedIn, token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState(null)
  const [elections, setElections] = useState([])
  const [votingHistory, setVotingHistory] = useState([])
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (isLoggedIn) {
      fetchDashboardData()
      const interval = setInterval(fetchRealTimeUpdates, 30000)
      return () => clearInterval(interval)
    }
  }, [isLoggedIn])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)
      await Promise.all([fetchUserDetails(), fetchElections(), fetchVotingHistory(), fetchNotifications()])
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchRealTimeUpdates = async () => {
    try {
      setRefreshing(true)
      await Promise.all([fetchElections(), fetchNotifications()])
    } catch (err) {
      console.error("Failed to fetch real-time updates", err)
    } finally {
      setRefreshing(false)
    }
  }

  const fetchUserDetails = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      const data = await res.json()
      setUserDetails(data)
    } catch (err) {
      console.error("Failed to fetch user details", err)
    }
  }

  const fetchElections = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/elections", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      const data = await res.json()
      setElections(data)
    } catch (err) {
      console.error("Failed to fetch elections", err)
      setElections([
        {
          id: "1",
          title: "Student Council Election 2024",
          description: "Annual student council election for academic year 2024-2025",
          startDate: "2024-01-15",
          endDate: "2024-01-25",
          status: "active",
          totalVotes: 1247,
          hasVoted: false,
          category: "Student Government",
          candidates: 8,
        },
        {
          id: "2",
          title: "Department Head Selection",
          description: "Selection of new Computer Science department head",
          startDate: "2024-02-01",
          endDate: "2024-02-10",
          status: "upcoming",
          totalVotes: 0,
          hasVoted: false,
          category: "Faculty",
          candidates: 3,
        },
      ])
    }
  }

  const fetchVotingHistory = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/votes/history", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      const data = await res.json()
      setVotingHistory(data)
    } catch (err) {
      console.error("Failed to fetch voting history", err)
      setVotingHistory([
        {
          id: "1",
          electionTitle: "University Senate Election 2023",
          votedAt: "2023-12-15T10:30:00Z",
          status: "confirmed",
        },
        {
          id: "2",
          electionTitle: "Student Union President 2023",
          votedAt: "2023-11-20T14:15:00Z",
          status: "confirmed",
        },
      ])
    }
  }

  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/notifications", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      const data = await res.json()
      setNotifications(data)
    } catch (err) {
      console.error("Failed to fetch notifications", err)
      setNotifications([
        {
          id: "1",
          title: "New Election Available",
          message: "Student Council Election 2024 is now open for voting. Cast your vote before January 25th.",
          type: "info",
          timestamp: "2024-01-15T09:00:00Z",
          read: false,
        },
        {
          id: "2",
          title: "Voting Reminder",
          message: "Don't forget to vote in the ongoing Student Council Election. Only 3 days left!",
          type: "warning",
          timestamp: "2024-01-22T12:00:00Z",
          read: false,
        },
      ])
    }
  }

  const getElectionStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success"
      case "upcoming":
        return "primary"
      case "completed":
        return "default"
      default:
        return "default"
    }
  }

  const getElectionStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <VoteIcon />
      case "upcoming":
        return <ScheduleIcon />
      case "completed":
        return <CheckCircleIcon />
      default:
        return <ScheduleIcon />
    }
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleRegisterAsVoter = () => {
    navigate("/voter/register")
  }

  const handleRegisterAsCandidate = () => {
    navigate("/election/requestCandidate")
  }

  if (!isLoggedIn) {
    return (
      <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <Box className="relative z-10 flex justify-center items-center min-h-screen">
          <Fade in timeout={800}>
            <Paper
              elevation={24}
              sx={{
                borderRadius: 4,
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.2)",
                p: 6,
                textAlign: "center",
                maxWidth: 500,
              }}
            >
              <Box className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                <ErrorIcon className="text-white text-3xl" />
              </Box>
              <Typography variant="h4" className="font-bold text-gray-800 mb-4">
                Access Denied
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                Please log in to access your voting dashboard.
              </Typography>
            </Paper>
          </Fade>
        </Box>
      </Box>
    )
  }

  return (
    <>
      {/* Loading Backdrop */}
      <Backdrop open={loading} className="z-50">
        <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden w-full">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          </div>

          <Box className="relative z-10 flex justify-center items-center min-h-screen">
            <Box className="text-center">
              <Box className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
                <DashboardIcon className="text-white text-4xl" />
              </Box>
              <Typography variant="h5" className="text-gray-700 mb-2">
                Loading your dashboard...
              </Typography>
            </Box>
          </Box>
        </Box>
      </Backdrop>

      <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-bounce"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
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
          <Fade in={!loading} timeout={1000}>
            <div>
              {/* Header Section */}
              <Box className="text-center mb-8">
                <Box className="flex justify-center mb-6">
                  <Box className="relative">
                    <Box className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                      <DashboardIcon className="text-white text-4xl" />
                    </Box>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping"></div>
                  </Box>
                </Box>
                <Typography
                  variant="h3"
                  className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
                >
                  Voting Dashboard
                </Typography>
                <Typography variant="h6" className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Welcome back, {userDetails?.name}! Manage your voting activities and stay updated with the latest
                  elections
                </Typography>
              </Box>

              {/* User Profile Card */}
              <Grow in timeout={600}>
                <Paper
                  elevation={24}
                  sx={{
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    overflow: "hidden",
                    mb: 4,
                  }}
                >
                  {/* Profile Header */}
                  <Box
                    sx={{
                      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                      p: 4,
                      position: "relative",
                      color: "white",
                    }}
                  >
                    {/* Decorative elements */}
                    <Box className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></Box>
                    <Box className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></Box>
                    <Box className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full"></Box>

                    <Box className="relative z-10">
                      <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={4} className="text-center md:text-left">
                          {/* Profile Avatar */}
                          <Box className="relative inline-block mb-4 md:mb-0">
                            <Avatar
                              sx={{
                                width: 100,
                                height: 100,
                                background: "rgba(255,255,255,0.2)",
                                backdropFilter: "blur(10px)",
                                border: "3px solid rgba(255,255,255,0.3)",
                                fontSize: "2rem",
                                fontWeight: "bold",
                                mx: { xs: "auto", md: 0 },
                              }}
                            >
                              {userDetails?.name
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase() || "U"}
                            </Avatar>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping"></div>
                          </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Box className="text-center md:text-left">
                            <Typography variant="h4" className="font-bold mb-2">
                              {userDetails?.name || "User Name"}
                            </Typography>
                            <Typography variant="h6" className="opacity-90 mb-4">
                              Member since {new Date(userDetails?.registrationDate || "").getFullYear()}
                            </Typography>
                            <Box className="flex flex-wrap gap-2 justify-center md:justify-start">
                              <Chip
                                icon={<VerifiedIcon sx={{ color: "white" }} />}
                                label={userDetails?.isVerified ? "Verified Voter" : "Verification Pending"}
                                sx={{
                                  background: userDetails?.isVerified
                                    ? "rgba(16, 185, 129, 0.3)"
                                    : "rgba(245, 158, 11, 0.3)",
                                  color: "white",
                                  fontWeight: 600,
                                  backdropFilter: "blur(10px)",
                                }}
                              />
                              <Chip
                                icon={<Security sx={{ color: "white" }} />}
                                label="Secure Account"
                                sx={{
                                  background: "rgba(255,255,255,0.2)",
                                  color: "white",
                                  fontWeight: 600,
                                  backdropFilter: "blur(10px)",
                                }}
                              />
                              <Chip
                                icon={<Public sx={{ color: "white" }} />}
                                label="Active Voter"
                                sx={{
                                  background: "rgba(255,255,255,0.2)",
                                  color: "white",
                                  fontWeight: 600,
                                  backdropFilter: "blur(10px)",
                                }}
                              />
                            </Box>
                          </Box>
                        </Grid>

                        <Grid item xs={12} md={2} className="text-center">
                          <Box className="flex flex-col gap-3">
                            <IconButton
                              onClick={fetchRealTimeUpdates}
                              disabled={refreshing}
                              sx={{
                                backgroundColor: "rgba(255,255,255,0.2)",
                                color: "white",
                                "&:hover": {
                                  backgroundColor: "rgba(255,255,255,0.3)",
                                  transform: "scale(1.1)",
                                },
                              }}
                            >
                              <RefreshIcon className={refreshing ? "animate-spin" : ""} />
                            </IconButton>
                            <Badge badgeContent={notifications.filter((n) => !n.read).length} color="error">
                              <Button
                                variant="outlined"
                                startIcon={<NotificationsIcon />}
                                sx={{
                                  color: "white",
                                  borderColor: "rgba(255,255,255,0.3)",
                                  borderRadius: 3,
                                  fontWeight: 600,
                                  "&:hover": {
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    borderColor: "rgba(255,255,255,0.5)",
                                  },
                                }}
                              >
                                Alerts
                              </Button>
                            </Badge>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Paper>
              </Grow>

              {/* Stats Cards */}
              <Grid container spacing={3} className="mb-8">
                {[
                  {
                    title: "Total Votes",
                    value: votingHistory.length,
                    icon: <VoteIcon />,
                    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "#667eea",
                  },
                  {
                    title: "Active Elections",
                    value: elections.filter((e) => e.status === "active").length,
                    icon: <TrendingUp />,
                    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    color: "#f093fb",
                  },
                  {
                    title: "Participation Rate",
                    value: "85%",
                    icon: <AnalyticsIcon />,
                    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                    color: "#4facfe",
                  },
                  {
                    title: "Account Status",
                    value: userDetails?.isVerified ? "Verified" : "Pending",
                    icon: <CheckCircleIcon />,
                    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                    color: "#43e97b",
                  },
                ].map((stat, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Grow in timeout={800 + index * 200}>
                      <Paper
                        elevation={12}
                        sx={{
                          borderRadius: 4,
                          background: "rgba(255,255,255,0.95)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-8px) scale(1.02)",
                            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3, textAlign: "center" }}>
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: 3,
                              background: stat.gradient,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              mx: "auto",
                              mb: 2,
                              boxShadow: `0 8px 32px ${stat.color}30`,
                            }}
                          >
                            {stat.icon}
                          </Box>
                          <Typography variant="h5" className="font-bold text-gray-800 mb-1">
                            {stat.value}
                          </Typography>
                          <Typography variant="body2" className="text-gray-600">
                            {stat.title}
                          </Typography>
                        </CardContent>
                      </Paper>
                    </Grow>
                  </Grid>
                ))}
              </Grid>

              {/* Registration Section */}
              <Grow in timeout={1000}>
                <Paper
                  elevation={24}
                  sx={{
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    overflow: "hidden",
                    mb: 4,
                  }}
                >
                  <Box
                    sx={{
                      background: "linear-gradient(135deg, #10b981, #059669)",
                      p: 4,
                      position: "relative",
                      color: "white",
                    }}
                  >
                    {/* Decorative elements */}
                    <Box className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-36 -translate-y-36"></Box>
                    <Box className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-48 translate-y-48"></Box>

                    <Box className="relative z-10 text-center mb-6">
                      <Typography variant="h4" className="font-bold mb-4">
                        Join the Democratic Process
                      </Typography>
                      <Typography variant="h6" className="opacity-90 max-w-2xl mx-auto">
                        Take part in shaping your community's future by registering as a voter or candidate
                      </Typography>
                    </Box>

                    <Grid container spacing={4} justifyContent="center">
                      <Grid item xs={12} sm={6} md={5}>
                        <Box
                          sx={{
                            background: "rgba(255,255,255,0.1)",
                            backdropFilter: "blur(10px)",
                            borderRadius: 4,
                            border: "1px solid rgba(255,255,255,0.1)",
                            p: 4,
                            textAlign: "center",
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                            "&:hover": {
                              background: "rgba(255,255,255,0.2)",
                              transform: "translateY(-4px) scale(1.02)",
                              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                            },
                          }}
                          onClick={handleRegisterAsVoter}
                        >
                          <Box
                            sx={{
                              width: 64,
                              height: 64,
                              borderRadius: 3,
                              background: "rgba(255,255,255,0.2)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              mx: "auto",
                              mb: 3,
                            }}
                          >
                            <HowToRegIcon sx={{ fontSize: 32 }} />
                          </Box>
                          <Typography variant="h5" className="font-bold mb-3">
                            Register as Voter
                          </Typography>
                          <Typography variant="body1" className="mb-4 opacity-90 leading-relaxed">
                            Get verified to participate in all elections and make your voice heard
                          </Typography>
                          <Button
                            variant="contained"
                            fullWidth
                            startIcon={<PersonAddIcon />}
                            sx={{
                              background: "rgba(255,255,255,0.9)",
                              color: "#059669",
                              fontWeight: 700,
                              borderRadius: 3,
                              py: 2,
                              "&:hover": {
                                background: "white",
                                transform: "translateY(-2px)",
                              },
                            }}
                          >
                            Register as Voter
                          </Button>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <Box
                          sx={{
                            background: "rgba(255,255,255,0.1)",
                            backdropFilter: "blur(10px)",
                            borderRadius: 4,
                            border: "1px solid rgba(255,255,255,0.1)",
                            p: 4,
                            textAlign: "center",
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                            "&:hover": {
                              background: "rgba(255,255,255,0.2)",
                              transform: "translateY(-4px) scale(1.02)",
                              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                            },
                          }}
                          onClick={handleRegisterAsCandidate}
                        >
                          <Box
                            sx={{
                              width: 64,
                              height: 64,
                              borderRadius: 3,
                              background: "rgba(255,255,255,0.2)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              mx: "auto",
                              mb: 3,
                            }}
                          >
                            <CampaignIcon sx={{ fontSize: 32 }} />
                          </Box>
                          <Typography variant="h5" className="font-bold mb-3">
                            Register as Candidate
                          </Typography>
                          <Typography variant="body1" className="mb-4 opacity-90 leading-relaxed">
                            Run for office and represent your community's interests
                          </Typography>
                          <Button
                            variant="contained"
                            fullWidth
                            startIcon={<CampaignIcon />}
                            sx={{
                              background: "rgba(255,255,255,0.9)",
                              color: "#059669",
                              fontWeight: 700,
                              borderRadius: 3,
                              py: 2,
                              "&:hover": {
                                background: "white",
                                transform: "translateY(-2px)",
                              },
                            }}
                          >
                            Register as Candidate
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grow>

              {/* Error Alert */}
              {error && (
                <Grow in timeout={500}>
                  <Alert
                    severity="error"
                    sx={{
                      mb: 4,
                      borderRadius: 3,
                      background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                    icon={<ErrorIcon />}
                  >
                    <Typography variant="h6" className="font-semibold">
                      {error}
                    </Typography>
                  </Alert>
                </Grow>
              )}

              {/* Main Content Tabs */}
              <Grow in timeout={1200}>
                <Paper
                  elevation={24}
                  sx={{
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    overflow: "hidden",
                  }}
                >
                  {/* Tab Navigation */}
                  <Box
                    sx={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                      backdropFilter: "blur(10px)",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <Tabs
                      value={activeTab}
                      onChange={handleTabChange}
                      variant="fullWidth"
                      TabIndicatorProps={{
                        style: {
                          height: 4,
                          borderRadius: 2,
                          background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                        },
                      }}
                    >
                      <Tab
                        icon={<VoteIcon />}
                        label="Elections"
                        sx={{
                          fontWeight: 700,
                          fontSize: "1rem",
                          py: 3,
                          minHeight: 80,
                          color: "#6b7280",
                          "&.Mui-selected": {
                            color: "#3b82f6",
                          },
                        }}
                      />
                      <Tab
                        icon={<HistoryIcon />}
                        label="Voting History"
                        sx={{
                          fontWeight: 700,
                          fontSize: "1rem",
                          py: 3,
                          minHeight: 80,
                          color: "#6b7280",
                          "&.Mui-selected": {
                            color: "#3b82f6",
                          },
                        }}
                      />
                      <Tab
                        icon={<NotificationsIcon />}
                        label="Notifications"
                        sx={{
                          fontWeight: 700,
                          fontSize: "1rem",
                          py: 3,
                          minHeight: 80,
                          color: "#6b7280",
                          "&.Mui-selected": {
                            color: "#3b82f6",
                          },
                        }}
                      />
                      <Tab
                        icon={<AnalyticsIcon />}
                        label="Analytics"
                        sx={{
                          fontWeight: 700,
                          fontSize: "1rem",
                          py: 3,
                          minHeight: 80,
                          color: "#6b7280",
                          "&.Mui-selected": {
                            color: "#3b82f6",
                          },
                        }}
                      />
                    </Tabs>
                  </Box>

                  {/* Elections Tab */}
                  {activeTab === 0 && (
                    <Box sx={{ p: 4 }}>
                      <Box className="text-center mb-8">
                        <Typography variant="h4" className="font-bold text-gray-800 mb-3">
                          Active & Upcoming Elections
                        </Typography>
                        <Typography variant="h6" className="text-gray-600">
                          Elections you can participate in or are scheduled to vote
                        </Typography>
                      </Box>

                      <Box className="space-y-6">
                        {elections
                          .filter((e) => e.status !== "completed")
                          .map((election, index) => (
                            <Grow in timeout={600 + index * 200} key={election.id}>
                              <Paper
                                elevation={12}
                                sx={{
                                  borderRadius: 4,
                                  background: "rgba(255,255,255,0.95)",
                                  backdropFilter: "blur(20px)",
                                  border: "1px solid rgba(255,255,255,0.2)",
                                  transition: "all 0.3s ease",
                                  "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                                  },
                                }}
                              >
                                <CardContent sx={{ p: 4 }}>
                                  <Grid container spacing={4} alignItems="center">
                                    <Grid item xs={12} md={8}>
                                      <Box className="flex flex-wrap items-center gap-3 mb-4">
                                        <Typography variant="h5" className="font-bold text-gray-800">
                                          {election.title}
                                        </Typography>
                                        <Chip
                                          icon={getElectionStatusIcon(election.status)}
                                          label={election.status.charAt(0).toUpperCase() + election.status.slice(1)}
                                          color={getElectionStatusColor(election.status)}
                                          sx={{ fontWeight: 600 }}
                                        />
                                        {election.hasVoted && (
                                          <Chip
                                            icon={<CheckCircleIcon />}
                                            label="Voted"
                                            color="success"
                                            variant="outlined"
                                            sx={{ fontWeight: 600 }}
                                          />
                                        )}
                                      </Box>
                                      <Typography variant="body1" className="text-gray-600 mb-4 leading-relaxed">
                                        {election.description}
                                      </Typography>
                                      <Box className="flex flex-wrap items-center gap-4 text-gray-500 mb-4">
                                        <Box className="flex items-center gap-2">
                                          <CalendarIcon sx={{ color: "#3b82f6", fontSize: 20 }} />
                                          <Typography variant="body2" className="font-medium">
                                            Ends: {new Date(election.endDate).toLocaleDateString()}
                                          </Typography>
                                        </Box>
                                        <Box className="flex items-center gap-2">
                                          <VoteIcon sx={{ color: "#10b981", fontSize: 20 }} />
                                          <Typography variant="body2" className="font-medium">
                                            {election.candidates} candidates
                                          </Typography>
                                        </Box>
                                        <Box className="flex items-center gap-2">
                                          <AnalyticsIcon sx={{ color: "#8b5cf6", fontSize: 20 }} />
                                          <Typography variant="body2" className="font-medium">
                                            {election.totalVotes.toLocaleString()} votes cast
                                          </Typography>
                                        </Box>
                                      </Box>
                                      {election.status === "active" && (
                                        <Box>
                                          <Box className="flex justify-between items-center mb-2">
                                            <Typography variant="body2" className="text-gray-600 font-medium">
                                              Voting Progress
                                            </Typography>
                                            <Typography variant="body2" className="text-gray-600 font-bold">
                                              75%
                                            </Typography>
                                          </Box>
                                          <LinearProgress
                                            variant="determinate"
                                            value={75}
                                            sx={{
                                              height: 8,
                                              borderRadius: 4,
                                              backgroundColor: "#e5e7eb",
                                              "& .MuiLinearProgress-bar": {
                                                background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                                                borderRadius: 4,
                                              },
                                            }}
                                          />
                                        </Box>
                                      )}
                                    </Grid>
                                    <Grid item xs={12} md={4} className="text-center">
                                      {election.status === "active" && !election.hasVoted ? (
                                        <Button
                                          variant="contained"
                                          size="large"
                                          startIcon={<VoteIcon />}
                                          sx={{
                                            px: 6,
                                            py: 3,
                                            borderRadius: 4,
                                            fontWeight: 700,
                                            fontSize: "1.1rem",
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
                                          Vote Now
                                        </Button>
                                      ) : election.status === "completed" ? (
                                        <Button
                                          variant="outlined"
                                          size="large"
                                          startIcon={<AnalyticsIcon />}
                                          sx={{
                                            px: 6,
                                            py: 3,
                                            borderRadius: 4,
                                            fontWeight: 700,
                                            fontSize: "1.1rem",
                                            borderWidth: 2,
                                            "&:hover": {
                                              borderWidth: 2,
                                              transform: "translateY(-2px)",
                                            },
                                          }}
                                        >
                                          View Results
                                        </Button>
                                      ) : (
                                        <Button
                                          variant="outlined"
                                          size="large"
                                          disabled
                                          startIcon={<ScheduleIcon />}
                                          sx={{
                                            px: 6,
                                            py: 3,
                                            borderRadius: 4,
                                            fontWeight: 700,
                                            fontSize: "1.1rem",
                                            borderWidth: 2,
                                          }}
                                        >
                                          Upcoming
                                        </Button>
                                      )}
                                    </Grid>
                                  </Grid>
                                </CardContent>
                              </Paper>
                            </Grow>
                          ))}
                      </Box>
                    </Box>
                  )}

                  {/* Voting History Tab */}
                  {activeTab === 1 && (
                    <Box sx={{ p: 4 }}>
                      <Box className="text-center mb-8">
                        <Typography variant="h4" className="font-bold text-gray-800 mb-3">
                          Your Voting History
                        </Typography>
                        <Typography variant="h6" className="text-gray-600">
                          Complete record of your participation in elections
                        </Typography>
                      </Box>

                      <Box className="space-y-4">
                        {votingHistory.map((vote, index) => (
                          <Grow in timeout={400 + index * 150} key={vote.id}>
                            <Paper
                              elevation={12}
                              sx={{
                                borderRadius: 4,
                                background: "rgba(255,255,255,0.95)",
                                backdropFilter: "blur(20px)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  transform: "translateY(-2px)",
                                  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.1)",
                                },
                              }}
                            >
                              <ListItem sx={{ p: 3 }}>
                                <ListItemIcon>
                                  <Box
                                    sx={{
                                      width: 48,
                                      height: 48,
                                      borderRadius: 3,
                                      background: "linear-gradient(135deg, #10b981, #059669)",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      color: "white",
                                    }}
                                  >
                                    <CheckCircleIcon />
                                  </Box>
                                </ListItemIcon>
                                <ListItemText
                                  primary={
                                    <Typography variant="h6" className="font-bold text-gray-800 mb-2">
                                      {vote.electionTitle}
                                    </Typography>
                                  }
                                  secondary={
                                    <Typography variant="body1" className="text-gray-600">
                                      Voted on {new Date(vote.votedAt).toLocaleDateString()} at{" "}
                                      {new Date(vote.votedAt).toLocaleTimeString()}
                                    </Typography>
                                  }
                                />
                                <Chip
                                  icon={vote.status === "confirmed" ? <CheckCircleIcon /> : <ScheduleIcon />}
                                  label={vote.status === "confirmed" ? "Confirmed" : "Pending"}
                                  color={vote.status === "confirmed" ? "success" : "warning"}
                                  sx={{ fontWeight: 600 }}
                                />
                              </ListItem>
                            </Paper>
                          </Grow>
                        ))}
                      </Box>
                    </Box>
                  )}

                  {/* Notifications Tab */}
                  {activeTab === 2 && (
                    <Box sx={{ p: 4 }}>
                      <Box className="text-center mb-8">
                        <Typography variant="h4" className="font-bold text-gray-800 mb-3">
                          Recent Notifications
                        </Typography>
                        <Typography variant="h6" className="text-gray-600">
                          Important updates and announcements
                        </Typography>
                      </Box>

                      <Box className="space-y-4">
                        {notifications.map((notification, index) => (
                          <Grow in timeout={400 + index * 150} key={notification.id}>
                            <Alert
                              severity={notification.type}
                              sx={{
                                borderRadius: 3,
                                background: "rgba(255,255,255,0.95)",
                                backdropFilter: "blur(20px)",
                                border: !notification.read
                                  ? "2px solid rgba(59, 130, 246, 0.3)"
                                  : "1px solid rgba(255,255,255,0.2)",
                                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                              }}
                            >
                              <Typography variant="h6" className="font-bold mb-2">
                                {notification.title}
                              </Typography>
                              <Typography variant="body1" className="mb-3 leading-relaxed">
                                {notification.message}
                              </Typography>
                              <Typography variant="caption" className="text-gray-500 font-medium">
                                {new Date(notification.timestamp).toLocaleString()}
                              </Typography>
                            </Alert>
                          </Grow>
                        ))}
                      </Box>
                    </Box>
                  )}

                  {/* Analytics Tab */}
                  {activeTab === 3 && (
                    <Box sx={{ p: 4 }}>
                      <Box className="text-center mb-8">
                        <Typography variant="h4" className="font-bold text-gray-800 mb-3">
                          Analytics Dashboard
                        </Typography>
                        <Typography variant="h6" className="text-gray-600">
                          Your voting statistics and insights
                        </Typography>
                      </Box>

                      <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                          <Paper
                            elevation={12}
                            sx={{
                              borderRadius: 4,
                              background: "rgba(255,255,255,0.95)",
                              backdropFilter: "blur(20px)",
                              border: "1px solid rgba(255,255,255,0.2)",
                              height: "100%",
                            }}
                          >
                            <CardContent sx={{ p: 4 }}>
                              <Box className="flex items-center gap-4 mb-6">
                                <Box
                                  sx={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: 3,
                                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
                                  }}
                                >
                                  <AnalyticsIcon sx={{ fontSize: 28 }} />
                                </Box>
                                <Typography variant="h5" className="font-bold text-gray-800">
                                  Your Participation
                                </Typography>
                              </Box>
                              <Box className="space-y-6">
                                <Box
                                  sx={{
                                    p: 3,
                                    background:
                                      "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
                                    borderRadius: 3,
                                  }}
                                >
                                  <Box className="flex justify-between items-center mb-2">
                                    <Typography variant="body1" className="text-gray-700 font-medium">
                                      Participation Rate
                                    </Typography>
                                    <Typography variant="h5" className="font-bold text-blue-600">
                                      85%
                                    </Typography>
                                  </Box>
                                  <LinearProgress
                                    variant="determinate"
                                    value={85}
                                    sx={{
                                      height: 8,
                                      borderRadius: 4,
                                      backgroundColor: "rgba(59, 130, 246, 0.2)",
                                      "& .MuiLinearProgress-bar": {
                                        background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                                        borderRadius: 4,
                                      },
                                    }}
                                  />
                                </Box>

                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    p: 3,
                                    background:
                                      "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))",
                                    borderRadius: 3,
                                  }}
                                >
                                  <Typography variant="h6" className="text-gray-700 font-medium">
                                    Elections Voted
                                  </Typography>
                                  <Typography variant="h4" className="font-bold text-green-600">
                                    {votingHistory.length}
                                  </Typography>
                                </Box>

                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    p: 3,
                                    background:
                                      "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(124, 58, 237, 0.1))",
                                    borderRadius: 3,
                                  }}
                                >
                                  <Typography variant="h6" className="text-gray-700 font-medium">
                                    Total Available
                                  </Typography>
                                  <Typography variant="h4" className="font-bold text-purple-600">
                                    {elections.length + 3}
                                  </Typography>
                                </Box>
                              </Box>
                            </CardContent>
                          </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Paper
                            elevation={12}
                            sx={{
                              borderRadius: 4,
                              background: "rgba(255,255,255,0.95)",
                              backdropFilter: "blur(20px)",
                              border: "1px solid rgba(255,255,255,0.2)",
                              height: "100%",
                            }}
                          >
                            <CardContent sx={{ p: 4 }}>
                              <Box className="flex items-center gap-4 mb-6">
                                <Box
                                  sx={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: 3,
                                    background: "linear-gradient(135deg, #10b981, #059669)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    boxShadow: "0 8px 32px rgba(16, 185, 129, 0.3)",
                                  }}
                                >
                                  <DashboardIcon sx={{ fontSize: 28 }} />
                                </Box>
                                <Typography variant="h5" className="font-bold text-gray-800">
                                  System Statistics
                                </Typography>
                              </Box>
                              <Box className="space-y-4">
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    p: 3,
                                    background:
                                      "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1))",
                                    borderRadius: 3,
                                  }}
                                >
                                  <Typography variant="h6" className="text-gray-700 font-medium">
                                    Total Votes Cast
                                  </Typography>
                                  <Typography variant="h4" className="font-bold text-blue-600">
                                    18,750
                                  </Typography>
                                </Box>

                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    p: 3,
                                    background:
                                      "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))",
                                    borderRadius: 3,
                                  }}
                                >
                                  <Typography variant="h6" className="text-gray-700 font-medium">
                                    Active Elections
                                  </Typography>
                                  <Typography variant="h4" className="font-bold text-green-600">
                                    {elections.filter((e) => e.status === "active").length}
                                  </Typography>
                                </Box>

                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    p: 3,
                                    background:
                                      "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(124, 58, 237, 0.1))",
                                    borderRadius: 3,
                                  }}
                                >
                                  <Typography variant="h6" className="text-gray-700 font-medium">
                                    Registered Voters
                                  </Typography>
                                  <Typography variant="h4" className="font-bold text-purple-600">
                                    5,420
                                  </Typography>
                                </Box>
                              </Box>
                            </CardContent>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </Paper>
              </Grow>
            </div>
          </Fade>
        </Container>
      </Box>
    </>
  )
}

export default Dashboard
