const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');

async function encripta(senha) {
    if (!senha) return null;
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(senha, salt);
        return hash;
    } catch (error) {
        console.error('Erro ao criar hash:', error);
        throw new Error('Erro ao criar hash');
    }
}

const create = async (req, res) => {
    req.body.senha = await encripta(req.body.senha)
    try {
        const professor = await prisma.professor.create({
            data: req.body
        })
        delete professor.senha
        res.status(201).json(professor);
    } catch (e) {
        res.status(400).json(e).end()
    }
}

const read = async (req, res) => {
    const professores = await prisma.professor.findMany({
        select: {
            id: true,
            nome: true,
            email: true
        }
    })
    res.json(professores)
}

const login = async (req, res) => {
    try {
        const professor = await prisma.professor.findFirst({
            where: {
                email: req.body.email
            }
        })
        if (professor) {
            if (await bcrypt.compare(req.body.senha, professor.senha)) {
                delete professor.senha
                res.json(professor).end()
            } else {
                res.status(401).json({ message: "Senha inválida" })
            }
        } else {
            res.status(401).json({ message: "Email não encontrado" })
        }
    } catch (e) {
        res.status(400).json({ message: e })
    }
}

module.exports = {
    create,
    read,
    login
}