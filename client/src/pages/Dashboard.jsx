"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  Card,
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
} from "@mui/material"
import {
  HowToVote as VoteIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
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
  Star as StarIcon,
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
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Fade in timeout={800}>
          <Card className="w-full max-w-md shadow-2xl rounded-3xl border-0">
            <CardContent className="text-center p-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <ErrorIcon className="text-white text-3xl" />
              </div>
              <Typography variant="h4" className="font-bold text-gray-800 mb-4">
                Access Denied
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                Please log in to access your voting dashboard.
              </Typography>
            </CardContent>
          </Card>
        </Fade>
      </div>
    )
  }

  return (
    <>
      <Backdrop open={loading} className="z-50 bg-black bg-opacity-50">
        <div className="text-center text-white">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center animate-pulse">
            <DashboardIcon className="text-white text-3xl" />
          </div>
          <Typography variant="h6">Loading your dashboard...</Typography>
        </div>
      </Backdrop>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Container maxWidth="xl" className="py-8">
          <Fade in={!loading} timeout={1000}>
            <div>
              {/* Header Section */}
              <div className="mb-8 p-8 rounded-3xl shadow-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full transform translate-x-48 -translate-y-48"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full transform -translate-x-32 translate-y-32"></div>

                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <div className="absolute -inset-3 bg-white rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                      <Avatar
                        src={userDetails?.avatar || "/placeholder.svg"}
                        className="relative w-20 h-20 border-4 border-white shadow-2xl"
                        sx={{ bgcolor: "#1e40af" }}
                      >
                        <Typography variant="h4" className="font-bold text-white">
                          {userDetails?.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </Typography>
                      </Avatar>
                    </div>
                    <div>
                      <Typography variant="h3" className="font-bold mb-3">
                        Welcome back, {userDetails?.name}!
                      </Typography>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <Chip
                          icon={userDetails?.isVerified ? <VerifiedIcon /> : <WarningIcon />}
                          label={userDetails?.isVerified ? "Verified Voter" : "Verification Pending"}
                          className={`${
                            userDetails?.isVerified ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
                          } font-semibold`}
                          size="medium"
                        />
                        <Chip
                          icon={<StarIcon />}
                          label="Premium Member"
                          className="bg-white bg-opacity-20 text-white font-semibold"
                          size="medium"
                        />
                      </div>
                      <Typography variant="body1" className="opacity-90">
                        Member since {new Date(userDetails?.registrationDate || "").getFullYear()} • Manage your voting
                        preferences and participate in elections
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <IconButton
                      onClick={fetchRealTimeUpdates}
                      disabled={refreshing}
                      className="text-white hover:bg-white hover:bg-opacity-20 transition-all duration-200"
                    >
                      <RefreshIcon className={refreshing ? "animate-spin" : ""} />
                    </IconButton>
                    <Badge badgeContent={notifications.filter((n) => !n.read).length} color="error">
                      <Button
                        variant="outlined"
                        startIcon={<NotificationsIcon />}
                        className="text-white border-white border-2 hover:bg-white hover:text-blue-600 font-semibold rounded-2xl px-6 py-3"
                      >
                        Notifications
                      </Button>
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Registration Section */}
              <div className="mb-8 p-8 rounded-3xl shadow-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-72 h-72 bg-white opacity-10 rounded-full transform -translate-x-36 -translate-y-36"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full transform translate-x-48 translate-y-48"></div>

                <div className="relative z-10 text-center mb-8">
                  <Typography variant="h4" className="font-bold mb-4">
                    Join the Democratic Process
                  </Typography>
                  <Typography variant="h6" className="opacity-90 max-w-2xl mx-auto">
                    Take part in shaping your community's future by registering as a voter or candidate
                  </Typography>
                </div>

                <Grid container spacing={4} justifyContent="center">
                  <Grid item xs={12} sm={6} md={5}>
                    <div
                      className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-3xl p-8 hover:bg-opacity-20 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl"
                      onClick={handleRegisterAsVoter}
                    >
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                          <HowToRegIcon className="text-white text-3xl" />
                        </div>
                        <Typography variant="h5" className="font-bold mb-4">
                          Register as Voter
                        </Typography>
                        <Typography variant="body1" className="mb-6 opacity-90 leading-relaxed">
                          Get verified to participate in all elections and make your voice heard in democratic decisions
                        </Typography>
                        <Button
                          variant="contained"
                          fullWidth
                          startIcon={<PersonAddIcon />}
                          className="bg-white text-emerald-600 hover:bg-gray-100 font-bold rounded-2xl py-4 text-lg shadow-lg"
                        >
                          Register as Voter
                        </Button>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={5}>
                    <div
                      className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-3xl p-8 hover:bg-opacity-20 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl"
                      onClick={handleRegisterAsCandidate}
                    >
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                          <CampaignIcon className="text-white text-3xl" />
                        </div>
                        <Typography variant="h5" className="font-bold mb-4">
                          Register as Candidate
                        </Typography>
                        <Typography variant="body1" className="mb-6 opacity-90 leading-relaxed">
                          Run for office and represent your community's interests in important electoral positions
                        </Typography>
                        <Button
                          variant="contained"
                          fullWidth
                          startIcon={<CampaignIcon />}
                          className="bg-white text-emerald-600 hover:bg-gray-100 font-bold rounded-2xl py-4 text-lg shadow-lg"
                        >
                          Register as Candidate
                        </Button>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>

              {/* Error Alert */}
              {error && (
                <Grow in timeout={500}>
                  <Alert severity="error" className="mb-6 shadow-lg rounded-2xl border-0" icon={<ErrorIcon />}>
                    <Typography variant="h6" className="font-semibold">
                      {error}
                    </Typography>
                  </Alert>
                </Grow>
              )}

              {/* Main Content */}
              <Paper className="shadow-2xl rounded-3xl overflow-hidden border-0">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    className="px-6"
                    TabIndicatorProps={{
                      style: {
                        height: 4,
                        borderRadius: 2,
                        background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                      },
                    }}
                  >
                    <Tab icon={<VoteIcon />} label="Elections" className="font-bold text-lg py-6 min-h-20" />
                    <Tab icon={<HistoryIcon />} label="Voting History" className="font-bold text-lg py-6 min-h-20" />
                    <Tab
                      icon={<NotificationsIcon />}
                      label="Notifications"
                      className="font-bold text-lg py-6 min-h-20"
                    />
                    <Tab icon={<AnalyticsIcon />} label="Analytics" className="font-bold text-lg py-6 min-h-20" />
                  </Tabs>
                </div>

                {/* Elections Tab */}
                {activeTab === 0 && (
                  <div className="p-8">
                    <div className="text-center mb-8">
                      <Typography variant="h4" className="font-bold text-gray-800 mb-3">
                        Active & Upcoming Elections
                      </Typography>
                      <Typography variant="h6" className="text-gray-600">
                        Elections you can participate in or are scheduled to vote
                      </Typography>
                    </div>

                    <div className="space-y-6">
                      {elections
                        .filter((e) => e.status !== "completed")
                        .map((election, index) => (
                          <Grow in timeout={600 + index * 200} key={election.id}>
                            <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl border-0 overflow-hidden">
                              <CardContent className="p-8">
                                <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
                                  <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                      <Typography variant="h5" className="font-bold text-gray-800">
                                        {election.title}
                                      </Typography>
                                      <Chip
                                        icon={getElectionStatusIcon(election.status)}
                                        label={election.status.charAt(0).toUpperCase() + election.status.slice(1)}
                                        color={getElectionStatusColor(election.status)}
                                        className="font-semibold"
                                      />
                                      {election.hasVoted && (
                                        <Chip
                                          icon={<CheckCircleIcon />}
                                          label="Voted"
                                          color="success"
                                          variant="outlined"
                                          className="font-semibold"
                                        />
                                      )}
                                    </div>
                                    <Typography variant="body1" className="text-gray-600 mb-6 leading-relaxed">
                                      {election.description}
                                    </Typography>
                                    <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-6">
                                      <div className="flex items-center gap-2">
                                        <CalendarIcon className="text-blue-500" />
                                        <span className="font-medium">
                                          Ends: {new Date(election.endDate).toLocaleDateString()}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <VoteIcon className="text-green-500" />
                                        <span className="font-medium">{election.candidates} candidates</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <AnalyticsIcon className="text-purple-500" />
                                        <span className="font-medium">
                                          {election.totalVotes.toLocaleString()} votes cast
                                        </span>
                                      </div>
                                    </div>
                                    {election.status === "active" && (
                                      <div className="mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                          <Typography variant="body2" className="text-gray-600 font-medium">
                                            Voting Progress
                                          </Typography>
                                          <Typography variant="body2" className="text-gray-600 font-bold">
                                            75%
                                          </Typography>
                                        </div>
                                        <LinearProgress
                                          variant="determinate"
                                          value={75}
                                          className="h-3 rounded-full"
                                          sx={{
                                            backgroundColor: "#e5e7eb",
                                            "& .MuiLinearProgress-bar": {
                                              background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                                              borderRadius: 4,
                                            },
                                          }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex flex-col gap-3">
                                    {election.status === "active" && !election.hasVoted ? (
                                      <Button
                                        variant="contained"
                                        size="large"
                                        startIcon={<VoteIcon />}
                                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg rounded-2xl px-8 py-4 font-bold text-lg"
                                      >
                                        Vote Now
                                      </Button>
                                    ) : election.status === "completed" ? (
                                      <Button
                                        variant="outlined"
                                        size="large"
                                        startIcon={<AnalyticsIcon />}
                                        className="rounded-2xl px-8 py-4 font-bold text-lg border-2"
                                      >
                                        View Results
                                      </Button>
                                    ) : (
                                      <Button
                                        variant="outlined"
                                        size="large"
                                        disabled
                                        startIcon={<ScheduleIcon />}
                                        className="rounded-2xl px-8 py-4 font-bold text-lg border-2"
                                      >
                                        Upcoming
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Grow>
                        ))}
                    </div>
                  </div>
                )}

                {/* Voting History Tab */}
                {activeTab === 1 && (
                  <div className="p-8">
                    <div className="text-center mb-8">
                      <Typography variant="h4" className="font-bold text-gray-800 mb-3">
                        Your Voting History
                      </Typography>
                      <Typography variant="h6" className="text-gray-600">
                        Complete record of your participation in elections
                      </Typography>
                    </div>

                    <div className="space-y-4">
                      {votingHistory.map((vote, index) => (
                        <Grow in timeout={400 + index * 150} key={vote.id}>
                          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl border-0">
                            <ListItem className="p-6">
                              <ListItemIcon>
                                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                                  <CheckCircleIcon className="text-white" />
                                </div>
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
                                className="font-semibold"
                              />
                            </ListItem>
                          </Card>
                        </Grow>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 2 && (
                  <div className="p-8">
                    <div className="text-center mb-8">
                      <Typography variant="h4" className="font-bold text-gray-800 mb-3">
                        Recent Notifications
                      </Typography>
                      <Typography variant="h6" className="text-gray-600">
                        Important updates and announcements
                      </Typography>
                    </div>

                    <div className="space-y-4">
                      {notifications.map((notification, index) => (
                        <Grow in timeout={400 + index * 150} key={notification.id}>
                          <Alert
                            severity={notification.type}
                            className={`rounded-2xl shadow-lg border-0 ${
                              !notification.read ? "ring-2 ring-blue-500 ring-opacity-50" : ""
                            }`}
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
                    </div>
                  </div>
                )}

                {/* Analytics Tab */}
                {activeTab === 3 && (
                  <div className="p-8">
                    <div className="text-center mb-8">
                      <Typography variant="h4" className="font-bold text-gray-800 mb-3">
                        Analytics Dashboard
                      </Typography>
                      <Typography variant="h6" className="text-gray-600">
                        Your voting statistics and insights
                      </Typography>
                    </div>

                    <Grid container spacing={6}>
                      <Grid item xs={12} md={6}>
                        <Card className="shadow-xl rounded-3xl h-full border-0">
                          <CardContent className="p-8">
                            <div className="flex items-center gap-4 mb-6">
                              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                                <AnalyticsIcon className="text-white text-2xl" />
                              </div>
                              <Typography variant="h5" className="font-bold text-gray-800">
                                Your Participation
                              </Typography>
                            </div>
                            <div className="space-y-6">
                              <div className="p-4 bg-blue-50 rounded-2xl">
                                <div className="flex justify-between items-center mb-2">
                                  <Typography variant="body1" className="text-gray-700 font-medium">
                                    Participation Rate
                                  </Typography>
                                  <Typography variant="h5" className="font-bold text-blue-600">
                                    80%
                                  </Typography>
                                </div>
                                <LinearProgress
                                  variant="determinate"
                                  value={80}
                                  className="h-3 rounded-full"
                                  sx={{
                                    backgroundColor: "#dbeafe",
                                    "& .MuiLinearProgress-bar": {
                                      background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                                      borderRadius: 4,
                                    },
                                  }}
                                />
                              </div>

                              <div className="flex justify-between items-center p-4 bg-green-50 rounded-2xl">
                                <Typography variant="h6" className="text-gray-700 font-medium">
                                  Elections Voted
                                </Typography>
                                <Typography variant="h4" className="font-bold text-green-600">
                                  12
                                </Typography>
                              </div>

                              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-2xl">
                                <Typography variant="h6" className="text-gray-700 font-medium">
                                  Total Available
                                </Typography>
                                <Typography variant="h4" className="font-bold text-purple-600">
                                  15
                                </Typography>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Card className="shadow-xl rounded-3xl h-full border-0">
                          <CardContent className="p-8">
                            <div className="flex items-center gap-4 mb-6">
                              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                                <DashboardIcon className="text-white text-2xl" />
                              </div>
                              <Typography variant="h5" className="font-bold text-gray-800">
                                System Statistics
                              </Typography>
                            </div>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-2xl">
                                <Typography variant="h6" className="text-gray-700 font-medium">
                                  Total Votes Cast
                                </Typography>
                                <Typography variant="h4" className="font-bold text-blue-600">
                                  18,750
                                </Typography>
                              </div>

                              <div className="flex justify-between items-center p-4 bg-green-50 rounded-2xl">
                                <Typography variant="h6" className="text-gray-700 font-medium">
                                  Active Elections
                                </Typography>
                                <Typography variant="h4" className="font-bold text-green-600">
                                  3
                                </Typography>
                              </div>

                              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-2xl">
                                <Typography variant="h6" className="text-gray-700 font-medium">
                                  Registered Voters
                                </Typography>
                                <Typography variant="h4" className="font-bold text-purple-600">
                                  5,420
                                </Typography>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </div>
                )}
              </Paper>
            </div>
          </Fade>
        </Container>
      </div>
    </>
  )
}

export default Dashboard
