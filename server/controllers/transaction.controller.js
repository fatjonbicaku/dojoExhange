const Transaction = require('../models/transaction.model');
const User = require('../models/user.model');
const Wallet = require('../models/wallet.model');

module.exports.buy = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const totalCost = req.body.quantity * req.body.price;

    if (user.balance < totalCost) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    user.balance -= totalCost;
    await user.save();

    const transaction = await Transaction.create({
      user: req.body.userId,
      coinName: req.body.coinName,
      quantity: req.body.quantity,
      type: 'buy',
      price: req.body.price
    });

    const wallet = await Wallet.findOne({ user: req.body.userId }) || new Wallet({ user: req.body.userId, coins: [] });
    const coin = wallet.coins.find(c => c.coinName === req.body.coinName);

    if (coin) {
      coin.quantity += req.body.quantity;
    } else {
      wallet.coins.push({ coinName: req.body.coinName, quantity: req.body.quantity });
    }

    await wallet.save();

    res.json({ message: "Buy transaction successful", transaction });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.sell = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ user: req.body.userId });
    const coin = wallet.coins.find(c => c.coinName === req.body.coinName);

    if (!coin || coin.quantity < req.body.quantity) {
      return res.status(400).json({ message: "Insufficient coin balance" });
    }

    const user = await User.findById(req.body.userId);
    const totalGain = req.body.quantity * req.body.price;

    user.balance += totalGain;
    await user.save();

    coin.quantity -= req.body.quantity;

    const transaction = await Transaction.create({
      user: req.body.userId,
      coinName: req.body.coinName,
      quantity: req.body.quantity,
      type: 'sell',
      price: req.body.price
    });

    await wallet.save();

    res.json({ message: "Sell transaction successful", transaction });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.body.userId }).populate('user');
    res.json(transactions);
  } catch (err) {
    res.status(400).json(err);
  }
};
