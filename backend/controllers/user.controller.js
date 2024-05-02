const User = require('../models/userModel');


exports.fetchUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json({ users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };
  
  exports.updateUserType = async (req, res) => {
    try {
      const { email, userType } = req.body;
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.usertype = userType;
      await user.save();
  
      res.status(200).json({ message: 'User type updated successfully', user });
    } catch (error) {
      console.error('Error updating user type:', error);
      res.status(500).json({ error: 'Error updating user type' });
    }
  };

  exports.userType = async (req, res) => {
    try {
      const { email } = req.params;
      // Find the user by email
      const user = await User.findOne({ email });
      // If user not found, return 404
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Return the user's userType
      res.status(200).json({ userType: user.usertype, userName: user.name });
    } catch (error) {
      console.error('Error fetching user type:', error);
      res.status(500).json({ error: 'Error fetching user type' });
    }
  };