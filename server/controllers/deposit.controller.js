const Deposit = require('../models/deposit.model');
const User = require('../models/user.model');

module.exports.deposit = async (req, res) => {
  try {
    const { userId, amount, method } = req.body;

    // Create a deposit record
    const deposit = await Deposit.create({
      user: userId,
      amount,
      method
    });

    // Update user's balance
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.balance += amount;
    await user.save({ validateBeforeSave: false });

    res.json({ message: "Deposit successful", deposit });
  } catch (err) {
    console.error('Deposit failed:', err);
    res.status(400).json({ message: 'Deposit failed', error: err.message });
  }
};
