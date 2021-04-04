const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000;
const baseURL = `http://localhost:${PORT}`;

const wrap = (f) => (...args) => f(...args).catch(console.log);

app.use((req, res, next) => {
    res.setHeader(`Access-Control-Allow-Origin`, `*`); // better to show accessible sources
    res.setHeader(`Access-Control-Allow-Methods`, `GET,POST,OPTIONS,PUT,PATCH,DELETE`);
    res.setHeader(`Access-Control-Allow-Headers`, `Origin,X-Requested-With,Content-Type,Auth-Token`);
    res.setHeader(`Access-Control-Allow-Credentials`, true);
    next();
});

app.use(bodyParser.urlencoded({}));

wrap(app.get('/card', (req, res) => {
    fs.readFile(
        path.resolve(__dirname, 'card.json'), { encoding: 'utf8' },
        (err, data) => res.type('application/json').send(data)
    );
}));

wrap(app.get('/cards', (req, res) => {
    fs.readFile(
        path.resolve(__dirname, 'cards.json'), { encoding: 'utf8' },
        (err, data) => res.type('application/json').send(data)
    );
}));

wrap(app.get('/user', (req, res) => {
    fs.readFile(
        path.resolve(__dirname, 'user.json'), { encoding: 'utf8' },
        (err, data) => res.type('application/json').send(data)
    );
}))

app.listen(PORT, (err) => {
    if (err) {
        return console.log('something BAD happened', err);
    }

    console.log(`Server is listening on ${PORT} port`);
});