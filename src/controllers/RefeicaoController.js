const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class RefeicaoController {
    async create(request, response) {
        try {
            const { userId } = request.auth
            const { name, descricao, dataHora, dentroDieta } = request.body

            const refeicao = await prisma.refeicao.create({
                data: {
                    name,
                    descricao,
                    dataHora,
                    dentroDieta,
                    userId
                },
            })


            response.json(refeicao)
        } catch (err) {
            console.log(err)
            return response.status(409).send()
        }
    }

    async show(request, response) {
        try {
            const { userId } = request.auth
            const refeicoes = await prisma.refeicao.findMany({ where: { userId } })

            response.json(refeicoes)

        } catch (err) {
            return response.status(409).send()
        }
    }

    async showRefeicao(request, response) {
        try {
            const { userId } = request.auth
            const { id } = request.params
            const refeicoes = await prisma.refeicao.findFirst({ where: { id, userId } })

            response.json(refeicoes)

        }
        catch (err) {
            console.log(err)
            return response.status(409).send()
        }
    }

    async update(request, response) {
        try {

            const { userId } = request.auth
            const { name, descricao, dataHora, dentroDieta } = request.body
            const { id } = request.params

            const result = await prisma.refeicao.update({
                where: {
                    id,
                    userId
                },
                data: {
                    name,
                    descricao,
                    dataHora,
                    dentroDieta,
                },
            });

            return response.status(200).send()

        } catch (err) {
            console.log(err)
            return response.status(409).send()
        }

    }

    async delete(request, response) {

        try {
            const { userId } = request.auth
            const { id } = request.params
            //const { id } = request.body
            console.log(`id: ${id}`)


            await prisma.refeicao.delete({
                where: {
                    id,
                    userId
                },
            })

            return response.status(200).send()

        } catch (err) {
            return response.status(409).send()
        }

    }

    async showMetricaRefeicao(request, response) {
        try {
            const { userId } = request.auth
            const totalRefeicoes = await prisma.refeicao.count({ where: { userId } })
            const totalRefeicoesDentro = await prisma.refeicao.count({ where: { userId, dentroDieta: true } })
            const totalRefeicoesFora = await prisma.refeicao.count({ where: { userId, dentroDieta: false } })
            const todasRefeicoesUser = await prisma.refeicao.findMany({ where: { userId }, orderBy: [{ dataHora: 'asc' }] })
            let sequencia = 0
            let maiorSequencia = 0

            for (let index = 0; index < todasRefeicoesUser.length; index++) {
                const refeicao = todasRefeicoesUser[index];
                if (refeicao.dentroDieta) {
                    sequencia++
                    if (sequencia > maiorSequencia) {
                        maiorSequencia = sequencia
                    }

                } else {
                    sequencia = 0
                }

            }

            response.json({
                totalRefeicoes,
                totalRefeicoesDentro,
                totalRefeicoesFora,
                maiorSequencia
            })

        } catch (err) {
            console.log(err)
            return response.status(409).send()
        }
    }

}

module.exports = RefeicaoController