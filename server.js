const fs = require("fs");
const next = require("next");
const https = require("https");
const io = require('socket.io')(server);

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

const options = {
    key: fs.readFileSync('./security/cert.key'),
    cert: fs.readFileSync('./security/cert.cert'),
};

io.sockets.on('connection', () => {
    console.log(`Client with ID of ${socket.id} connected!`)
})

app.prepare().then(() => {
    https.createServer(options, (req, res) => {
        handle(req, res);
    }).listen(port, err => {
        if (err) throw err
        console.log(`> Ready on https://localhost:${port}`)
    })
})
