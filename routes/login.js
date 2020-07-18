/*
    Rota: (POST) localhost:3030/api/login
    função: nos fornece um token, passando no Body { email e password } de um usuário, já criado!
*/

const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()

// Model de Usuário
const Usuario = require('../models/usuario')

router.post('/', async (req, res) => {

    const { email, password } = req.body

    try {
        let usuarioDB = await Usuario.findOne({ email })

        if (!usuarioDB || usuarioDB === null) {
            res.status(500).json({
                ok: false,
                msg: 'Email ou usuário faltando ou incorretos!'

            })
        }
        // confere se a senha passada é igual a do usuário existente no BD
        const senhaOK = await bcrypt.compareSync(password, usuarioDB.password)

        if (!senhaOK || senhaOK === null) {
            res.status(500).json({
                ok: false,
                msg: 'Usuário ou senha faltando ou incorretos!'

            })
        }

        // Cria um token
        const token =await jwt.sign(
            {
                id:usuarioDB.id,
                nome:usuarioDB.nome
            },
            process.env.SECRET,
            { expiresIn: 60 * 60 }
        ) // {segundos} - 1h no caso acima

        res.status(200).json({
            auth: true,
            msg: 'Bem vindo!',
            id: usuarioDB.id,
            nome: usuarioDB.nome,
            email,
            token
        })

    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Erro ao fazer login: usuário ou senha incorretos!',
            errors: err
        })
    }


})


module.exports = router