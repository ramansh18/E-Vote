require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require('http');
const { Server } = require('socket.io');
// const { Web3 } = require("web3");
const connectDB = require("./config/database")
const authRoutes = require("./routes/auth");
const electionRoutes = require("./routes/electionRoutes");
const app = express();
const votingRoutes = require("./routes/votingRoutes");
const candidateRoutes = require("./routes/candidateRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js")
const voterRegistration = require('./routes/voterRegistration.js')
const profileUpdateRoutes = require('./routes/profileUpdateRoutes.js')
const test = require("./routes/test.js")
const activityRoutes = require("./routes/activityRoutes");
const server = http.createServer(app); 
const uploadRoute = require('./routes/uploadRoute')// create HTTP server
// Setup socket.io server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // replace with frontend origin in production
    methods: ['GET', 'POST'],
  },
});

// Allow accessing `io` in routes/controllers


// Example connection log
io.on('connection', (socket) => {
  console.log('✅ A client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

app.set('io', io);
//middlewares
app.use(cors());
app.use(express.json());


//routes
app.use("/api/candidate", candidateRoutes);
app.use("/api/voting", votingRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/voter',voterRegistration)
app.use('/api/admin', adminRoutes);
app.use("/api/election", electionRoutes);
app.use('/api/user', profileUpdateRoutes);
app.use('/api/test',test)
app.use('/api', uploadRoute);
app.use("/api/activity", activityRoutes);
// const web3 = new Web3("http://127.0.0.1:8545"); // Connect to Ganache

// // Check connection to Ganache
// web3.eth.net.isListening()
//   .then(() => {
//     console.log("Successfully connected to Ganache");
//   })
//   .catch((error) => {
//     console.error("Error connecting to Ganache:", error);
//   });


connectDB();

app.get("/", (req, res) => {
  res.send("Blockchain Voting Backend is Running!");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
