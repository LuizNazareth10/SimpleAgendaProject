import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// ... (seus middlewares e funções de load/saveData aqui)

const DATA_PATH = path.join(process.cwd(),'data', 'data.json');

function loadData() {
    if (fs.existsSync(DATA_PATH)) {
        const data = fs.readFileSync(DATA_PATH, 'utf8');
        return JSON.parse(data);
    } else {
        return { contacts: [] }; // Retorna um objeto com um array de contatos vazio
    }
}

function saveData(data) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

let contacts = loadData().contacts;

router.get('/', (req, res) => {
    res.render('index', { contacts });
});

router.post('/add', (req, res) => {
    const { name, email, phone } = req.body;
    if (name && email && phone) {
        contacts.push({ name, email, phone });
        saveData({ contacts });
        res.redirect('/');
    } else {
        res.status(400).send('All fields are required');
    }
});

router.post('/delete', (req, res) => {
    const { index } = req.body;
    if (index >= 0 && index < contacts.length) {
        contacts.splice(index, 1);
        saveData({ contacts });
        res.status(200).send('Contact deleted'); // Alterado para enviar uma resposta de sucesso
    } else {
        res.status(400).send('Invalid index');
    }
});

// Adicionando a rota POST para editar um contato
router.post('/edit', (req, res) => {
    const { index, name, email, phone } = req.body;
    const contactIndex = parseInt(index, 10);
    
    if (contactIndex >= 0 && contactIndex < contacts.length && name && email && phone) {
        contacts[contactIndex] = { name, email, phone };
        saveData({ contacts });
        res.redirect('/');
    } else {
        res.status(400).send('Invalid data or index');
    }
});

export default router;