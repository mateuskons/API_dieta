const { Router } = require('express')


const RefeicaoController = require('../controllers/RefeicaoController')


const refeicaoRoutes = Router()


// Controller
const refeicaoController = new RefeicaoController()


// Rotas
refeicaoRoutes.post('/create', refeicaoController.create)
refeicaoRoutes.get('/show', refeicaoController.show)
refeicaoRoutes.get('/showRefeicao/:id', refeicaoController.showRefeicao)
refeicaoRoutes.get('/showMetricaRefeicao', refeicaoController.showMetricaRefeicao)
refeicaoRoutes.put('/update/:id', refeicaoController.update)
refeicaoRoutes.delete('/delete/:id', refeicaoController.delete)

// Exporta
module.exports = refeicaoRoutes