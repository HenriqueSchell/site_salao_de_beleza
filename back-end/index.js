const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const User = require('./models/User')

//require('./criarSecret/token')

const app = express()
app.use(express.json())
app.use(cors())

//public route
app.get('/', (req, res) => {
    res.status(200).send('<h1>Olá, seja bem vindo a minha API!</h1>')
})

//Private route 
app.get('/user/:id', checkToken, async(req, res) =>{
    const id = req.params.id 

    //check if user exists
    const user = await User.findById(id, '-password')

    if(!user){
        return res.status(404).json({msg: 'Usuário não encontrado!'})
    }

    res.status(200).json({ user })
})

function checkToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const decoded = jwt.verify(token, secret)
    req.userId = decoded.id

    if(!token){
        return res.status(401).json({msg: 'Acessp negado!'})
    }

    try{
        const secret = process.env.SECRET 
        jwt.verify(token, secret)
        next()
    }catch(error){
         res.status(400).json({msg: 'Token inválido'})
    }
}

//User register
app.post('/auth/register', async(req, res) =>{
    const {name, email, password, confirmPassword} = req.body || {}

    //Validations
    if(!name){
        return res.status(422).json({msg: 'O nome é obrigatório!'})
    }
    if(!email){
        return res.status(422).json({msg: 'O E-mail é obrigatório!'})
    }
    if(!password){
        return res.status(422).json({msg: 'A senha é obrigatória!'})
    }
    if(!confirmPassword){
        return res.status(422).json({msg: 'Confirme sua senha!'})
    }
    if(password !== confirmPassword){
        return res.status(422).json({msg: 'As senhas precisam ser iguais!'})
    }

    //Check if user exists
    const userExists = await User.findOne({email: email})
    if (userExists){
        return res.status(422).json({msg: 'E-mail já cadastrado, insira um e-mail válido!'})
    }

    //Create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    //Create user
    const user = new User({name, email, password: passwordHash})

    try{
        await user.save()
        res.status(201).json({msg: 'Usuário criado com sucesso!'})
    }catch(error){
         res.status(500).json({msg: 'Erro no servidor, tente novamente mais tarde!'})
         console.log(error)
    }
})

//Login User
app.post('/auth/login', async(req, res) =>{
    const {email, password} = req.body || {}

    //Validations
    if(!email){
        return res.status(422).json({msg: 'O E-mail é obrigatório!'})
    }

    if(!password){
        return res.status(422).json({msg: 'A senha é obrigatória!'})
    }

    //Check if user exists
    const user = await User.findOne({email: email})
    
    if(!user){
        return res.status(404).json({msg: 'Usuário não encontrado!'})
    }

    //check if password match
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword){
        return res.status(422).json({msg: 'Senha inválida!'})
    }

    try{
        const secret = process.env.SECRET

        const token = jwt.sign({id: user._id}, secret)

        res.status(200).json({msg: 'Autenticação realizada com sucesso!', token})

    }catch(error){
        res.status(500).json({msg: 'Erro no servidor, tente novamente mais tarde!'})
    }
})

//run server
const port = 3000

//Database credencial
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

//Database connect
mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cursonodejs.kg76knd.mongodb.net/authdb?retryWrites=true&w=majority&appName=Cursonodejs`).then( () => {

    app.listen(port, () => console.log(`Rodando na porta ${port}`))
    console.log('Conexão com banco de dados estabelecida com sucesso!')

}).catch((error) => console.log(error))