
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')
const { findOne } = require('../models/usuario')





// ==========================================
// Criar um novo usuario
// ==========================================
exports.criarUsuario = async ( req, res ) => {

    try{
        const { nome, email, password, img, role  } = req.body

        let emailJaExiste = await Usuario.findOne({ email })

        if( emailJaExiste ){
            res.status(400).json({
                ok: false,
                msg: 'Já Existe um usuário com este e-mail ou está vazio!'
            })
        }

        let salt = await bcrypt.genSaltSync()

        let usuario = await new Usuario({
            nome,
            email,
            password: bcrypt.hashSync(password, salt),
            img,
            role
        })

        await usuario.save()
        res.status(201).json({
            ok:true,
            usuario:'Usuário Criado!',
            nome,
            email
        })
    }catch(err){
        res.status(500).json({
            ok: false,
            usuario: 'Erro ao Criar seu usuário!',
            errors: err
        })
    }     
}


// ==========================================
// Obter todos os usuarios
// ==========================================
exports.obterUsuarios = async (req, res) => {
    
    try{
        const usuarios = await Usuario.find({}, 'nome email password img role')

        if(!usuarios || usuarios===null){
            
        }
        res.status(200).json({
            ok: true,
            usuarios
        })
    }catch(err){
        res.status(500).json({
            ok: false,
            mensagem: 'Erro ao buscar usuários!',
            errors: err
        })
    }  
    
}

// ============================================
// Encontrar um usuario por seu id
// ============================================
exports.obterUsuario = async (req, res) => {

    try{
        const usuario = await Usuario.findById(req.params.id)
        if( !usuario ) {
            return res.status(404).json({
                msg:'O usuário não existe!'
            })           
        }
        res.status(200).json({
            ok: true,
            nome: usuario.nome,
            email: usuario.email,
            role: usuario.role

        })
    }catch(err){

        if( err.kind === 'ObjectId' ) {
                res.status(404).json({
                msg:"usuario com o id passado não foi encontrado!"
            })               
        }
        res.status(500).json({
            ok: false,
            msg: 'Erro ao buscar este usuário!',
            errors: err
        })
    }
}

// ==========================================
// Atualizar usuario
// ==========================================
exports.atualizarUsuario = async (req, res) => {

    let id = req.params.id
    const { nome, email, img, role  } = req.body

    try{
        const usuario = await Usuario.findById(id)
        if(!usuario){
            res.status(404).json({
                ok: false,
                msg: 'Usuário não encontrado!'
            })
        }

        usuario.nome = nome
        usuario.email = email
        usuario.img = img
        usuario.role = role

        await usuario.save()

        res.status(200).json({
            ok: true,
            msg: 'Usuário Atualizado!'
        })

    }catch(err){
        res.status(500).json({
            ok: false,
            errors: err
        })
    }
}


// ============================================
// Deletar/Excluir um usuario por seu id
// ============================================
exports.deletarUsuario =  async (req, res) => {

    let id = req.params.id

    try{        
        const usuario = await Usuario.findById(id)

        if(!usuario){
            res.status(404).json({
                ok: false,
                msg: 'Usuário não encontrado!'
            })
        }

        await Usuario.findByIdAndRemove(id)

        res.status(200).json({
            ok: true,
            msg: 'Usuário Excluído!'
        })
    }catch(err){
        res.status(500).json({
            ok: false,
            erros: err
        })
    }
}
