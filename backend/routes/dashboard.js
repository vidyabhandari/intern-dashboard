const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/dashboard/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ msg: 'User not found' });

        const referralCode = `${user.name.toLowerCase()}2025`;
        const totalDonations = user.totalDonations || 0;

        res.status(200).json({
            name: user.name,
            referralCode,
            totalDonations
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
