const { Router } = require('express')


const usersRoutes = require('./users.routes')
const refeicaoRoutes = require('./refeicao.routes')


const routes = Router()


// Rotas dos controllers
routes.use('/users', usersRoutes)

routes.use('/refeicao', refeicaoRoutes)


module.exports = routes