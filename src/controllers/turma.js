const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const create = async (req, res) => {
    try {
        const turma = await prisma.turma.create({
            data: req.body
        })
        res.status(201).json(turma);
    } catch (e) {
        res.status(400).json({ message: e });
    }
}

const read = async (req, res) => {
    const turmas = await prisma.turma.findMany()
    res.json(turmas)
}

const readOne = async (req, res) => {
    const turmas = await prisma.turma.findFirst({
        where: {
            id: Number(req.params.id)
        }, include: {
            atividades: true
        }
    })
    res.json(turmas)
}

const update = async (req, res) => {
    try {
        const turma = await prisma.turma.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        })
        res.status(202).json(turma);
    } catch (e) {
        res.status(400).json({ message: e });
    }
}

const del = async (req, res) => {
    try {
        const turma = await prisma.turma.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        res.status(204).json(turma);
    } catch (e) {
        res.status(400).json({ message: e });
    }
}

module.exports = {
    create,
    read,
    readOne,
    update,
    del
}