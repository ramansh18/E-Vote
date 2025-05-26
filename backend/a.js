require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User"); // update with actual path
const Election = require("./models/Election"); // update with actual path

async function updateVotingTitles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const users = await User.find({ "votingHistory.0": { $exists: true } });

    for (const user of users) {
      let updated = false;

      for (let vote of user.votingHistory) {
        // Only update if title is missing
        if (!vote.title) {
          const election = await Election.findById(vote.electionId);
          if (election) {
            vote.title = election.title;
            updated = true;
          }
        }
      }

      if (updated) {
        await user.save();
        console.log(`Updated user ${user.email || user._id}`);
      }
    }

    console.log("Voting history titles updated.");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error updating voting titles:", err);
    mongoose.connection.close();
  }
}

updateVotingTitles();
