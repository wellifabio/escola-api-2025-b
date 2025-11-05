const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const create = async (req, res) => {
    try {
        const atividade = await prisma.atividade.create({
            data: req.body
        })
        res.status(201).json(atividade);
    } catch (e) {
        res.status(400).json({ message: e });
    }
}

const read = async (req, res) => {
    const atividades = await prisma.atividade.findMany()
    res.json(atividades)
}

const update = async (req, res) => {
    try {
        const atividade = await prisma.atividade.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        })
        res.status(202).json(atividade);
    } catch (e) {
        res.status(400).json({ message: e });
    }
}

const del = async (req, res) => {
    try {
        const atividade = await prisma.atividade.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        res.status(204).json(atividade);
    } catch (e) {
        res.status(400).json({ message: e });
    }
}

module.exports = {
    create,
    read,
    update,
    del
}