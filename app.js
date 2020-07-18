// Importação de Recursos do app
const express = require('express')
const http = require('http')
require("dotenv-safe").config();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
} 
app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Declaração de Constantes
const PORT = process.env.PORT
const VARS = require('./bin/configuration/variables')

// Conexão com o mongoDB
mongoose.set('useCreateIndex', true) // Para o unique-validator plugin
mongoose.connect( process.env.CONN_STR , VARS.Mongoose.options )
  .then( () => console.info(`BD: `+ '\x1b[32m%s\x1b[0m', 'online') )
  .catch( e => console.info('Connect BD Error!') )

// Registre as rotas abaixo
app.use('/api/usuarios/login', require('./routes/login'))
app.use('/api/usuarios/logout', require('./routes/logout'))
app.use('/api/usuarios', require('./routes/usuario'))

// Iniciando um servidor Node
const server = http.Server(app)
server.listen(
  PORT,
  () =>  console.info(`API OK on Port: ${PORT} `+ '\x1b[32m%s\x1b[0m', 'online')
)