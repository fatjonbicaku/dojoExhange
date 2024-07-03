const DepositController = require('../controllers/deposit.controller');
const { authenticate } = require('../middleware/authenticate.middleware');

module.exports = app => {
  app.post('/api/deposit', authenticate, DepositController.deposit);
};
