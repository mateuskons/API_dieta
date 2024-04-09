const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const privateKey = require("../private-key")


class UsersController {


    async create(request, response) {
        try {
            const { name, email, senha } = request.body
            let hashSenha = bcrypt.hashSync(senha, 10)


            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    senha: hashSenha
                },
            })


            response.json(user)
        } catch (err) {
            console.log(err)
            return response.status(409).send()
        }
    }

    async show(request, response) {
        try {
            const users = await prisma.user.findMany();

            response.json(users)

        } catch (err) {
            return response.status(409).send()
        }
    }

    async update(request, response) {
        try {

            const { name, email } = request.body
            const { id } = request.params

            const result = await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    name: name,
                    email: email,
                },
            });

            return response.status(200).send()

        } catch (err) {
            return response.status(409).send()
        }

    }

    async delete(request, response) {

        try {
            const { id } = request.params


            const deleteUser = await prisma.user.delete({
                where: {
                    id: id,
                },
            })

            return response.status(200).send()

        } catch (err) {
            return response.status(409).send()
        }

    }

    async login(request, response) {
        try {
            const { email, senha } = request.body
            const user = await prisma.user.findFirst({ where: { email }})
            const senhaValida = bcrypt.compareSync(senha, user.senha)
            delete(user.senha)  
            if(senhaValida){
                const token = jsonwebtoken.sign(
                    { 
                        userId: user.id,
                        email: user.email,
                    },
                    privateKey,
                    { expiresIn: '60m' }
                )
                return response.json({data: {user, token}})
            }
            return response.status(400).send()
            
            
        } catch (err) {
            console.log(err)
            return response.status(409).send()
        }

    }
}

module.exports = UsersController