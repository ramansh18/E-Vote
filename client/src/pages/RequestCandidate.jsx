"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  Fade,
  Grow,
  Backdrop,
  CircularProgress,
} from "@mui/material"
import {
  Campaign as CampaignIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  HowToVote as VoteIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material"
import { useSelector } from "react-redux"

const RequestCandidate = () => {
  const [party, setParty] = useState("")
  const [electionId, setElectionId] = useState("")
  const [elections, setElections] = useState([])
  const [candidateRequests, setCandidateRequests] = useState([])
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState("success")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [editingRequest, setEditingRequest] = useState(null)
  const [editParty, setEditParty] = useState("")
  const [editElectionId, setEditElectionId] = useState("")
  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      await Promise.all([fetchElections(), fetchCandidateRequests()])
    } catch (error) {
      console.error("Error fetching data:", error)
      showSnackbar("Failed to load data", "error")
    } finally {
      setLoading(false)
    }
  }

  const fetchElections = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/election")
      setElections(response.data)
    } catch (error) {
      console.error("Error fetching elections:", error)
      // Mock data for development
      setElections([
        {
          _id: "1",
          title: "Student Council Election 2024",
          description: "Annual student council election",
          status: "upcoming",
        },
        {
          _id: "2",
          title: "Department Head Selection",
          description: "Computer Science department head selection",
          status: "active",
        },
      ])
    }
  }

  const fetchCandidateRequests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/candidate/my-requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setCandidateRequests(response.data)
    } catch (error) {
      console.error("Error fetching candidate requests:", error)
      // Mock data for development
      setCandidateRequests([
        {
          _id: "1",
          party: "Progressive Students Union",
          electionId: "1",
          electionTitle: "Student Council Election 2024",
          status: "pending",
          submittedAt: "2024-01-15T10:30:00Z",
        },
        {
          _id: "2",
          party: "Academic Excellence Party",
          electionId: "2",
          electionTitle: "Department Head Selection",
          status: "approved",
          submittedAt: "2024-01-10T14:20:00Z",
        },
      ])
    }
  }

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setOpenSnackbar(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!party.trim() || !electionId) {
      showSnackbar("Please fill in all required fields", "error")
      return
    }

    try {
      setSubmitting(true)
      const response = await axios.post(
        "http://localhost:5000/api/candidate/submit-request",
        { party: party.trim(), electionId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      )
      showSnackbar(response.data.message || "Candidate request submitted successfully!")
      setParty("")
      setElectionId("")
      await fetchCandidateRequests()
    } catch (error) {
      showSnackbar(error.response?.data?.message || "Failed to submit candidate request", "error")
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditRequest = (request) => {
    setEditingRequest(request._id)
    setEditParty(request.party)
    setEditElectionId(request.electionId)
  }

  const handleSaveEdit = async (requestId) => {
    if (!editParty.trim()) {
      showSnackbar("Party name is required", "error")
      return
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/candidate/update-request/${requestId}`,
        { party: editParty.trim(), electionId: editElectionId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      )
      showSnackbar(response.data.message || "Request updated successfully!")
      setEditingRequest(null)
      setEditParty("")
      setEditElectionId("")
      await fetchCandidateRequests()
    } catch (error) {
      showSnackbar(error.response?.data?.message || "Failed to update request", "error")
      console.error(error)
    }
  }

  const handleCancelEdit = () => {
    setEditingRequest(null)
    setEditParty("")
    setEditElectionId("")
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "success"
      case "rejected":
        return "error"
      case "pending":
        return "warning"
      default:
        return "default"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircleIcon />
      case "rejected":
        return <ErrorIcon />
      case "pending":
        return <RefreshIcon />
      default:
        return <RefreshIcon />
    }
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  return (
    <>
      <Backdrop open={loading} className="z-50 bg-black bg-opacity-50">
        <div className="text-center text-white">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
            <CampaignIcon className="text-white text-3xl" />
          </div>
          <Typography variant="h6">Loading candidate information...</Typography>
        </div>
      </Backdrop>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <Fade in={!loading} timeout={1000}>
            <div>
              {/* Header Section */}
              <div className="text-center mb-8">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl">
                  <CampaignIcon className="text-white text-4xl" />
                </div>
                <Typography variant="h3" className="font-bold text-gray-800 mb-4">
                  Candidate Registration
                </Typography>
                <Typography variant="h6" className="text-gray-600 max-w-2xl mx-auto">
                  Submit your candidacy request for upcoming elections and represent your community
                </Typography>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Registration Form */}
                <Grow in={!loading} timeout={800}>
                  <Card className="shadow-2xl rounded-3xl border-0 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                          <PersonIcon className="text-white" />
                        </div>
                        <div>
                          <Typography variant="h5" className="font-bold">
                            New Candidacy Request
                          </Typography>
                          <Typography variant="body2" className="opacity-90">
                            Fill in your details to submit a request
                          </Typography>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-8">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <FormControl fullWidth required>
                          <InputLabel className="text-gray-600 font-medium">Select Election</InputLabel>
                          <Select
                            value={electionId}
                            onChange={(e) => setElectionId(e.target.value)}
                            label="Select Election"
                            className="rounded-2xl"
                            sx={{
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderWidth: 2,
                                borderColor: "#e5e7eb",
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#a855f7",
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#a855f7",
                                boxShadow: "0 0 0 3px rgba(168, 85, 247, 0.1)",
                              },
                            }}
                          >
                            {elections.map((election) => (
                              <MenuItem key={election._id} value={election._id}>
                                <div className="flex flex-col">
                                  <Typography variant="body1" className="font-semibold">
                                    {election.title}
                                  </Typography>
                                  <Typography variant="caption" className="text-gray-500">
                                    {election.description}
                                  </Typography>
                                </div>
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <TextField
                          label="Party/Organization Name"
                          value={party}
                          onChange={(e) => setParty(e.target.value)}
                          required
                          fullWidth
                          placeholder="Enter your party or organization name"
                          variant="outlined"
                          className="rounded-2xl"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "16px",
                              "& fieldset": {
                                borderWidth: 2,
                                borderColor: "#e5e7eb",
                              },
                              "&:hover fieldset": {
                                borderColor: "#a855f7",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#a855f7",
                                boxShadow: "0 0 0 3px rgba(168, 85, 247, 0.1)",
                              },
                            },
                          }}
                        />

                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          disabled={submitting}
                          startIcon={submitting ? <CircularProgress size={20} /> : <CampaignIcon />}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-2xl py-4 text-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                          {submitting ? "Submitting Request..." : "Submit Candidacy Request"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </Grow>

                {/* My Requests */}
                <Grow in={!loading} timeout={1200}>
                  <Card className="shadow-2xl rounded-3xl border-0 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                          <VoteIcon className="text-white" />
                        </div>
                        <div>
                          <Typography variant="h5" className="font-bold">
                            My Candidacy Requests
                          </Typography>
                          <Typography variant="body2" className="opacity-90">
                            Track and manage your submitted requests
                          </Typography>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6 max-h-96 overflow-y-auto">
                      {candidateRequests.length === 0 ? (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <CampaignIcon className="text-gray-400 text-2xl" />
                          </div>
                          <Typography variant="h6" className="text-gray-500 mb-2">
                            No requests yet
                          </Typography>
                          <Typography variant="body2" className="text-gray-400">
                            Submit your first candidacy request to get started
                          </Typography>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {candidateRequests.map((request, index) => (
                            <Grow in timeout={600 + index * 200} key={request._id}>
                              <Card className="shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl border border-gray-200">
                                <CardContent className="p-6">
                                  {editingRequest === request._id ? (
                                    <div className="space-y-4">
                                      <FormControl fullWidth>
                                        <InputLabel>Election</InputLabel>
                                        <Select
                                          value={editElectionId}
                                          onChange={(e) => setEditElectionId(e.target.value)}
                                          label="Election"
                                          className="rounded-xl"
                                        >
                                          {elections.map((election) => (
                                            <MenuItem key={election._id} value={election._id}>
                                              {election.title}
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </FormControl>

                                      <TextField
                                        label="Party/Organization Name"
                                        value={editParty}
                                        onChange={(e) => setEditParty(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        className="rounded-xl"
                                      />

                                      <div className="flex gap-3">
                                        <Button
                                          variant="contained"
                                          startIcon={<SaveIcon />}
                                          onClick={() => handleSaveEdit(request._id)}
                                          className="bg-green-600 hover:bg-green-700 rounded-xl font-semibold"
                                        >
                                          Save
                                        </Button>
                                        <Button
                                          variant="outlined"
                                          startIcon={<CancelIcon />}
                                          onClick={handleCancelEdit}
                                          className="rounded-xl font-semibold"
                                        >
                                          Cancel
                                        </Button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div>
                                      <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                          <div className="flex items-center gap-3 mb-2">
                                            <Typography variant="h6" className="font-bold text-gray-800">
                                              {request.party}
                                            </Typography>
                                            <Chip
                                              icon={getStatusIcon(request.status)}
                                              label={request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                              color={getStatusColor(request.status)}
                                              className="font-semibold"
                                              size="small"
                                            />
                                          </div>
                                          <Typography variant="body2" className="text-gray-600 mb-2">
                                            Election: {request.electionTitle}
                                          </Typography>
                                          <Typography variant="caption" className="text-gray-500">
                                            Submitted: {new Date(request.submittedAt).toLocaleDateString()}
                                          </Typography>
                                        </div>
                                        {request.status === "pending" && (
                                          <IconButton
                                            onClick={() => handleEditRequest(request)}
                                            className="text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                                          >
                                            <EditIcon />
                                          </IconButton>
                                        )}
                                      </div>

                                      {request.status === "rejected" && (
                                        <Alert severity="error" className="rounded-xl">
                                          <Typography variant="body2">
                                            Your request was rejected. You can submit a new request with updated
                                            information.
                                          </Typography>
                                        </Alert>
                                      )}

                                      {request.status === "approved" && (
                                        <Alert severity="success" className="rounded-xl">
                                          <Typography variant="body2">
                                            Congratulations! Your candidacy has been approved. You can now participate
                                            in the election.
                                          </Typography>
                                        </Alert>
                                      )}
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            </Grow>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Grow>
              </div>
            </div>
          </Fade>
        </div>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            className="rounded-2xl shadow-xl"
            variant="filled"
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  )
}

export default RequestCandidate
