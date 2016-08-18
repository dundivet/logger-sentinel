var
    express = require('express'),
    mongoose = require('mongoose'),
    io = require('socket.io')(),
    httpConf = {
        host: '127.0.0.1',
        port: 3000
    },
    app,
    router,
    server;

// ***Configuration***
app = express();
router = express.Router();
app.set('views', './views');
app.set('view engine', 'jade');
app.use('/web', express.static(__dirname + '/../public'));
app.use(router);

// ***Routing***
router.get('/', function (req, res) {
    //res.sendFile(__dirname + '/ngangulartest.html');
    res.render('index');
});
router.get('/index', function (req, res) {
    //res.sendFile(__dirname + '/index.html');
    res.render('index');
});
//router.get('/wstest', function (req, res) {
//    res.render('wstest', {});
//});

require('../routes/routes')(app);

// ***Starting server***
mongoose.connect('mongodb://localhost/symfonylogs', function (err, res) {
    if (err) console.log('ERROR: Conectando a la Base de Datos. ' + err);
});

//http.listen(httpConf.port, function (err) {
//    if(err) console.log('ERROR: Iniciando servidor Express.');
//    console.log('Servidor Express iniciado en http://' + httpConf.host + ':' + httpConf.port);
//});
server = app.listen(httpConf.port, function (err) {
    if(err) console.log('ERROR: Iniciando servidor Express.');
    console.log('Servidor Express iniciado en http://' + httpConf.host + ':' + httpConf.port);
});

io.listen(server);
io.on('connection', function (socket) {
    console.log('user connected');

    socket.on('chat message', function (msg){
        io.emit('chat message', {message: msg});
        console.log('user message: ' + msg);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});