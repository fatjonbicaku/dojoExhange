const UserController = require('../controllers/user.controller')
const {authenticate} = require('../middleware/authenticate.middleware')


module.exports = (app)=>{
  app.post('/api/register' , UserController.register);
  app.post('/api/login', UserController.login);
  app.post('/api/logout', UserController.logout)
  app.get('/api/user', authenticate , UserController.getUser)
}