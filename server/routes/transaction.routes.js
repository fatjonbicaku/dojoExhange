const TransactionController = require('../controllers/transaction.controller');
const { authenticate } = require('../middleware/authenticate.middleware');

module.exports = app => {
  app.post('/api/transaction/buy', authenticate, TransactionController.buy);
  app.post('/api/transaction/sell', authenticate, TransactionController.sell);
  app.get('/api/transactions', authenticate, TransactionController.getTransactions);
};
