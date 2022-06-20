const express = require('express');
const app = express();
const morgan = require('morgan')
const http = require('http').Server(app);
const io = require('socket.io')(http);
let sockety = new Set()

app.use(morgan('dev'))
app.set('view engine', 'ejs')
app.use(express.static('./public/'))

app.get('/', (req, res) => {
    res.render('home')
})

io.on('connection', (socket) => {
    sockety.add(socket.id, socket)
    io.emit("usercount", sockety.size)

    socket.on('message', (msg) => {
        io.emit('new message', {msg, id: socket.id})
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} wychodzi, ${sockety}`)
        sockety.delete(socket.id)
        io.emit("usercount", sockety.size)
    })
})


http.listen(8080, () => console.log('App is ready'))