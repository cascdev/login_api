/*
    Nas rotas Protegidas - Após ter conseguido um token na rota de login, copie-o,
    e no Headers do Postman o envie com a chave 'x-access-token'.
*/

const jwt = require('jsonwebtoken')

exports.verifyJWT = async ( req, res, next ) => {    

    try{
        const token = await req.headers['x-access-token']

        if ( !token || token===null ){
            res.status(401).json({
                auth: false,
                msg: 'O token não foi fornecido'
            })
        } 

        await jwt.verify( token, process.env.SECRET, ( err, decoded ) => {
            if ( err ){
                res.status(500).json({
                    auth: false,
                    msg: 'Falha ao autenticar - token!'
                })
            }
            // se tudo estiver ok, salva no request para uso posterior
            req.usuarioId = decoded.id //Lá na rota de login foi encritaddo com o id do usuário
            req.usuarioNome = decoded.nome                

        })         
    }catch(errors){
        res.status(500).json({
            auth: false,
            msg: 'Falha na solicitação de autenticação!',
            errors
        })
    }
    next()
}