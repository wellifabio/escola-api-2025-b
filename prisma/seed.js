const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');

const encripta = async (senha) => {
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

async function main() {
    await prisma.professor.createMany({
        data: [
            { nome: "Robson", email: "robson@email.com", senha: await encripta("senha123") },
            { nome: "Reenye", email: "reenye@email.com", senha: await encripta("senha123") }
        ],
    })

    await prisma.turma.createMany({
        data: [
            { nome: "Técnico em Desenvolvimento de Sistemas 2025", professorId: 1 },
            { nome: "Técnico em Mecatrônica 2026", professorId: 1 },
            { nome: "Aprendizagem Indústrial: Eletricista de Manutenção", professorId: 2 },
            { nome: "Formação Inicial e Continuada: Python", professorId: 2 }
        ],
    })


    await prisma.atividade.createMany({
        data: [
            { descricao: "Lista de exercícios", turmaId: 1 },
            { descricao: "Avaliação Prática", turmaId: 1 },
            { descricao: "Trabalho em Grupo", turmaId: 2 },
            { descricao: "Avaliação Objetiva", turmaId: 2 },
            { descricao: "TCC Projeto Final", turmaId: 3 },
            { descricao: "Desafio individual", turmaId: 3 },
        ],
    })
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })