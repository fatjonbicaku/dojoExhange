const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coins: [{
    coinName: String,
    quantity: Number
  }]
}, {timestamps: true});

module.exports = mongoose.model('Wallet', WalletSchema);
