import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector for accessing redux state
import { useEffect } from "react";
import { checkAuth } from "./redux/authThunk"; // Import checkAuth to trigger auth checks

// Import pages
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import ElectionList from "./pages/admin/ElectionList";
import CreateElection from "./pages/admin/CreateElection";
import RequestCandidate from "./pages/RequestCandidate";
import RequestApproval from "./pages/admin/RequestApproval";
import VoterRegistration from "./pages/VoterRegistration";
import VotePage from "./pages/VotePage";
import ResultPage from "./pages/Result";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ApprovedCandidates from "./pages/admin/ApprovedCandidates";
import VoterListPage from "./pages/admin/VoterListPage";
import Results from "./pages/admin/Results";
import Profile from "./pages/Profile";
import Elections from "./pages/Elections";
import ElectionDetail from "./pages/ElectionDetail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ProfileUpdate from "./components/profileUpdate"
import NotAdmin from "./components/NotAdmin";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
// ProtectedRoute Component
const ProtectedRoute = ({ children, isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children; 
};

const AdminProtectedRoute = ({ children, isAdmin }) => {
  if (!isAdmin) {
    return <Navigate to="/not-admin" />;
  }
  return children; // Allow access to the admin routes
};

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, isAdmin, loading } = useSelector((state) => state.auth);

  // Dispatch checkAuth on app load to sync Redux state with localStorage
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Show loading screen while the auth state is being checked
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading App...</p>
      </div>
    );
  }

  return (
    <Router>
      <Header />
        <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />

        {/* User Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/election/requestCandidate"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <RequestCandidate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/voter/register"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <VoterRegistration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/voting/vote/:electionId"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <VotePage />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/election-list"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ElectionList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-election"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <CreateElection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/request-Approval"
          element={
            <AdminProtectedRoute isAdmin={isAdmin}>
              <RequestApproval />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute isAdmin={isAdmin}>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/candidate-requests"
          element={
            <AdminProtectedRoute isAdmin={isAdmin}>
              <RequestApproval />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/approved-candidates"
          element={
            <AdminProtectedRoute isAdmin={isAdmin}>
              <ApprovedCandidates />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/voter-list"
          element={
            <AdminProtectedRoute isAdmin={isAdmin}>
              <VoterListPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/results"
          element={
            <AdminProtectedRoute isAdmin={isAdmin}>
              <Results />
            </AdminProtectedRoute>
          }
        />

        <Route path="/result/:electionId" element={<ResultPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile-new" element={<ProfileUpdate />} />
        <Route path="/elections" element={<Elections />} />
        <Route path="/election/:id" element={<ElectionDetail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path='/not-admin' element={<NotAdmin />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<ContactUs />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
