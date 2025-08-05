const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Save user info
router.post('/user', async (req, res) => {
  const { name, email, referralCode } = req.body;

  if (!name || !email || !referralCode) {
    return res.status(400).json({ msg: 'Missing fields' });
  }

  try {
    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      referralCode,
      totalDonations: 0 // default
    });

    await user.save();
    res.status(201).json({ msg: 'User saved successfully', user });

  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/user/update-donations', async (req, res) => {
  const { email, totalDonations } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { totalDonations },
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update donations' });
  }
});

router.get('/user/all',async (req,res) => {
  try{
    const users = await User.find().select('name referralCode totalDonations email');
    res.status(200).json(users);
  }catch(err){
    res.status(500).json({msg: 'Failed to fetch user'});
  }
})

module.exports = router;
