const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail', // ou qualquer outro serviço de email
        auth: {
            user: 'danielopes71@gmail.com', // substitua pelo seu email
            pass: 'Dan@24501' // substitua pela sua senha ou app password
        }
    });

    const mailOptions = {
        from: email,
        to: 'danielopes71@gmail.com',
        subject: 'Contato pelo site',
        text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Erro ao enviar email.');
        }
        res.status(200).send('Email enviado com sucesso!');
    });
});

app.listen(5500, () => {
    console.log('Servidor rodando na porta 5500');
});
