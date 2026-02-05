// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve os arquivos do frontend

// "Banco de Dados" em memória
const users = [];

// Rota de Cadastro
app.post('/api/register', (req, res) => {
    const { name, age, team, password } = req.body;

    const userExists = users.find(u => u.name === name);
    if (userExists) {
        return res.status(400).json({ message: 'Usuário já existe!' });
    }

    const newUser = { name, age, team, password };
    users.push(newUser);
    
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
});

// Rota de Login
app.post('/api/login', (req, res) => {
    const { name, password } = req.body;

    const user = users.find(u => u.name === name && u.password === password);

    if (user) {
        // Retorna os dados sem a senha
        res.json({ 
            name: user.name, 
            age: user.age, 
            team: user.team 
        });
    } else {
        res.status(401).json({ message: 'Credenciais inválidas!' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});