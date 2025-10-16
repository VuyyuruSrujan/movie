require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/userModels');

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Find the most recent user
    const user = await User.findOne().sort({ _id: -1 });
    
    if (user) {
      user.isAdmin = true;
      await user.save();
      console.log(`✅ User '${user.email}' is now an admin!`);
    } else {
      console.log('❌ No users found in database');
    }
    
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
