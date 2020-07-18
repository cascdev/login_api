const express = require('express')
const router = express.Router()

// Rota /logout

router.post( '/', (req, res) => res.json({ auth: false, token: null }) )

module.exports = router
