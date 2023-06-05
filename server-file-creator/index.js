const express = require('express');
const config = require('config');
const fileCreator = require('./router/file.creator');
const corsMiddleware = require('./middleware/cors.middleware')


const app = express();
const PORT = config.get('serverPort');

app.use(express.json());
app.use(corsMiddleware);
app.use('/api', fileCreator);

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log('Server started on Port ', PORT)
        })
    }
    catch (e) {

    }
}

start()