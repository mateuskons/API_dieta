const { Router } = require('express')


const UsersController = require('../controllers/UsersController')


const usersRoutes = Router()


// Controller
const usersController = new UsersController()


// Rotas
usersRoutes.post('/create', usersController.create)
usersRoutes.get('/show', usersController.show)
usersRoutes.put('/update/:id', usersController.update)
usersRoutes.delete('/delete/:id', usersController.delete)
usersRoutes.post('/login', usersController.login)

// Exporta
module.exports = usersRoutes