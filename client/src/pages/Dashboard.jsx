import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const { isLoggedIn, token } = useSelector((state) => state.auth);
    const [userDetails, setUserDetails] = useState(null);
    const [recentActivities, setRecentActivities] = useState([]);
    const [statistics, setStatistics] = useState({ elections: 0, votes: 0 });

    useEffect(() => {
        if (isLoggedIn) {
            fetchUserDetails();
            fetchRecentActivities();
            fetchStatistics();
        }
    }, [isLoggedIn]);

    // Fetch user details (mock data or API request)
    const fetchUserDetails =async () => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/me', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            setUserDetails(data);
            console.log(userDetails)
        } catch (err) {
            console.error('Failed to fetch user details', err);
        }
    };

    // Fetch recent activities (mock data or API request)
    const fetchRecentActivities = () => {
        setRecentActivities([
            { action: "Voted in Election 1", date: "2025-04-20" },
            { action: "Voted in Election 2", date: "2025-04-18" },
        ]);
    };

    // Fetch dashboard statistics (mock data or API request)
    const fetchStatistics = () => {
        setStatistics({
            elections: 10,
            votes: 32,
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto p-6">
                {isLoggedIn ? (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h1 className="text-3xl font-bold text-blue-600 mb-4">
                            Welcome, {userDetails?.name}!
                        </h1>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">User Information</h2>
                            <p className="text-lg">Email: <strong>{userDetails?.email}</strong></p>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">Dashboard Statistics</h2>
                            <div className="grid grid-cols-2 gap-6 mt-4">
                                <div className="bg-blue-100 p-4 rounded-lg shadow">
                                    <h3 className="text-lg font-semibold">Elections Participated</h3>
                                    <p className="text-2xl">{statistics.elections}</p>
                                </div>
                                <div className="bg-green-100 p-4 rounded-lg shadow">
                                    <h3 className="text-lg font-semibold">Votes Cast</h3>
                                    <p className="text-2xl">{statistics.votes}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
                            <ul className="space-y-4">
                                {recentActivities.map((activity, index) => (
                                    <li key={index} className="bg-gray-50 p-4 rounded-lg shadow">
                                        <p className="font-semibold">{activity.action}</p>
                                        <p className="text-sm text-gray-500">Date: {activity.date}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h1 className="text-3xl font-bold text-blue-600 mb-4">Access Denied</h1>
                        <p>Please log in to access the dashboard.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
