import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Paper,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { People, Event, Poll } from '@mui/icons-material';

// Components
import RequestApproval from './RequestApproval';
import CreateElection from './CreateElection';
import ElectionList from './ElectionList';
import Results from './Results';
import VoterListPage from './VoterListPage';
import ApprovedCandidates from './ApprovedCandidates';

const stats = [
  { label: 'Total Candidates', value: 10, icon: <People fontSize="large" /> },
  { label: 'Total Voters', value: 500, icon: <People fontSize="large" /> },
  { label: 'Ongoing Elections', value: 2, icon: <Event fontSize="large" /> },
  { label: 'Upcoming Elections', value: 1, icon: <Poll fontSize="large" /> },
];

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedQuickActionsTab, setSelectedQuickActionsTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleQuickActionsTabChange = (event, newValue) => {
    setSelectedQuickActionsTab(newValue);
  };

  return (
    <div className="p-6 space-y-10">
      <Typography variant="h4" className="font-bold mb-6">
        Welcome to the Admin Dashboard
      </Typography>

      {/* Top Tabs */}
      <Tabs value={selectedTab} onChange={handleTabChange} variant="fullWidth" centered>
        <Tab label="Overview" />
        <Tab label="Recent Activities" />
        <Tab label="Quick Actions" />
      </Tabs>

      {/* Overview Tab */}
      {selectedTab === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-primary text-white shadow-lg">
              <CardContent className="flex items-center gap-4">
                <div className="text-white">{stat.icon}</div>
                <div>
                  <Typography className="text-lg">{stat.label}</Typography>
                  <Typography variant="h5" className="font-bold">
                    {stat.value}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Recent Activities Tab */}
      {selectedTab === 1 && (
        <Paper elevation={3} className="p-6 mt-6">
          <Typography variant="h5" className="mb-4 font-semibold">
            Recent Activities
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="New candidate request received" />
            </ListItem>
            <ListItem>
              <ListItemText primary='Election "Presidential Election" started' />
            </ListItem>
            <ListItem>
              <ListItemText primary='Voter "John Doe" registered' />
            </ListItem>
          </List>
        </Paper>
      )}

      {/* Quick Actions Tab */}
      {selectedTab === 2 && (
        <>
          <Tabs
            value={selectedQuickActionsTab}
            onChange={handleQuickActionsTabChange}
            variant="scrollable"
            scrollButtons="auto"
            centered
            className="mb-6"
          >
            <Tab label="Candidate Requests" />
            <Tab label="Create Election" />
            <Tab label="Election List" />
            {/* Commented out View Results tab */}
            {/* <Tab label="View Results" /> */}
            <Tab label="Voter List" />
            <Tab label="Approved Candidates" />
          </Tabs>

          {/* Nested Quick Action Tab Contents */}
          <div className="flex justify-center items-center w-full">
            {selectedQuickActionsTab === 0 && <RequestApproval />}
            {selectedQuickActionsTab === 1 && <CreateElection />}
            {selectedQuickActionsTab === 2 && <ElectionList />}
            {/* Commented out Results section */}
            {/* {selectedQuickActionsTab === 3 && <Results />} */}
            {selectedQuickActionsTab === 3 && <VoterListPage />}
            {selectedQuickActionsTab === 4 && <ApprovedCandidates />}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
