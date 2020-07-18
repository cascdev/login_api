/*
    rota=> localhost:3030/api/usuarios/
*/
const express = require('express')
const router = express.Router()

const { 
    obterUsuario,
    obterUsuarios,
    atualizarUsuario,
    criarUsuario,
    deletarUsuario
 } = require('../controllers/usuario-controller')
 
const auth = require('../middlewares/autentication')


// ==========================================
// Criar um novo usuario
// ==========================================
router.post( '/', criarUsuario )

// ========================================== 
// Obter todos os usuarios
// ==========================================
router.get( '/', auth.verifyJWT, obterUsuarios )

// ==========================================
// Obter um usuário pelo id
// ==========================================
router.get( '/:id', auth.verifyJWT, obterUsuario )

// ==========================================
// Atualizar usuario - PUT
// ==========================================
router.put( '/:id', auth.verifyJWT, atualizarUsuario )

// ==========================================
// Atualizar usuario - PATCH
// ==========================================
router.patch( '/:id' , auth.verifyJWT, atualizarUsuario )

// ============================================
// Deletar/Excluir um usuario por seu id
// ============================================
router.delete( '/:id', auth.verifyJWT, deletarUsuario )

module.exports = router