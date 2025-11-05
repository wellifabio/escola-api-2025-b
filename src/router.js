const express = require('express')
const router = express.Router()

const Professor = require('./controllers/professor')
const Turma = require('./controllers/turma')
const Atividade = require('./controllers/atividade')

router.get('/', (req, res) => {
    res.json({
        titulo: "Escola Modelo",
        rotas: [
            { professor: "/professores" },
            { professor: "/login" },
            { turma: "/turmas" },
            { atividade: "/atividades" },
        ]
    })
})

router.post('/professores', Professor.create)
router.get('/professores', Professor.read)
router.post('/login', Professor.login)

router.post('/turmas', Turma.create)
router.get('/turmas', Turma.read)
router.get('/turmas/:id', Turma.readOne)
router.patch('/turmas/:id', Turma.update)
router.delete('/turmas/:id', Turma.del)

router.post('/atividades', Atividade.create)
router.get('/atividades', Atividade.read)
router.patch('/atividades/:id', Atividade.update)
router.delete('/atividades/:id', Atividade.del)

module.exports = router