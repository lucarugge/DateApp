const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// Configurazione della connessione sicura a Gmail con i tuoi dati
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tiko.luca@gmail.com',
        pass: 'cgkw jfar lzns yuqg' // La password per l'applicazione di Google
    }
});

// Endpoint che riceve le risposte di Puncia e ti invia la mail
app.post('/api/invia-risposta', (req, res) => {
    const { data, oraOriginale, oraRitiro, cibo } = req.body;

    const mailOptions = {
        from: 'tiko.luca@gmail.com',
        to: 'tiko.luca@gmail.com', // Ricevi tu la mail
        subject: '❤️ PUNCIA HA DETTO SÌ! Ecco i dettagli dell\'appuntamento',
        text: `Grandissimo! Puncia ha accettato l'invito.\n\nEcco i dettagli:\n- Giorno scelto: ${data}\n- Orario desiderato da lei: ${oraOriginale}\n- Cosa vuole mangiare: ${cibo}\n\n🚗 Ricordati: devi passare a prenderla alle ore ${oraRitiro} (un'ora prima)!`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 2px solid #ff477e; border-radius: 10px; max-width: 500px;">
                <h2 style="color: #ff477e; text-align: center;">❤️ Puncia ha detto SÌ! ❤️</h2>
                <p>Ecco cosa ha scelto per il vostro appuntamento:</p>
                <hr style="border: 1px solid #ffccd5;">
                <p>🗓️ <strong>Giorno:</strong> ${data}</p>
                <p>⏰ <strong>Orario di lei:</strong> ${oraOriginale}</p>
                <p>🍕 <strong>Voglia di:</strong> ${cibo}</p>
                <hr style="border: 1px solid #ffccd5;">
                <p style="font-size: 16px; color: #c92c55; font-weight: bold; text-align: center;">
                    🚗 PASSA A PRENDERLA ALLE: ${oraRitiro}
                </p>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send("Errore nell'invio dell'email");
        }
        console.log('Email inviata: ' + info.response);
        res.status(200).send('Email inviata con successo!');
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Applicazione avviata su http://localhost:${PORT}`);
});