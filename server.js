var http = require('http'),
fs = require('fs'),
url = require('url'),
blackjack = require('./lib/blackjack');


var Server = {}
var users = [];

Server.getGame = function (socket, data, callback) {
socket.get('game', function (err, game) {
    callback(socket, game);
});
}

Server.deal = function (socket, data) {
console.log('deal');
Server.getGame(socket, data, function (socket, game) {
    if (!game.isInProgress()) {
        game.newGame();
    }
    socket.emit('deal', game.toJson());
});
}
Server.stand = function (socket, data) {
console.log('stand');
Server.getGame(socket, data, function (socket, game) {
    game.stand();
    socket.emit('stand', game.toJson());
});
}

Server.hit = function (socket, data) {
console.log('hit');
Server.getGame(socket, data, function (socket, game) {
    game.hit();
    socket.emit('hit', game.toJson());
});
}
function getUsers () {
   var userNames = [];
   for(var name in users) {
     if(users[name]) {
       userNames.push(name);  
     }
   }
   return userNames;
}



Server.registerSocketIO = function (io) {
io.sockets.on('connection', function (socket) {
  console.log('User connected'); //logs user connection
 socket.on('adduser', function (user) {
        socket.user = user;
        users.push(user);
        updateClients();

Server.bet = function(socket, data) {
    console.log('bet');
    Server.getGame(socket, data, function(socket, game) {
        game.bet();
        socket.emit('bet', game.toJson());
    });
}

Server.registerSocketIO = function (io) {
    io.sockets.on('connection', function (socket) {
        console.log('User connected');
        socket.set('game', blackjack.newGame())

        socket.on('deal', function (data) {
            Server.deal(socket, data);
        });
        socket.on('stand', function (data) {
            Server.stand(socket, data);
        });
        socket.on('hit', function (data) {
            Server.hit(socket, data);
        });
        socket.on('disconnect', function (socket) {
            console.log('User disconnected');
        });
        socket.on('bet', function(data) {
            Server.bet(socket, data);
        });
    });
 //dont touch below
    socket.set('game', blackjack.newGame())

    socket.on('deal', function (data) {
        Server.deal(socket, data);
    });

    socket.on('stand', function (data) {
        Server.stand(socket, data);
    });

    socket.on('hit', function (data) {
        Server.hit(socket, data);
    });

    socket.on('disconnect', function (socket) {
       for(var i=0; i<users.length; i++) {
            if(users[i] == socket.user) {
                delete users[users[i]];
            }
        }
        console.log("User disconnected");
        updateClients(); 
    });
    function updateClients() {
        io.sockets.emit('update', users);
    }

});
}

//Found images online with .svg (scalable vector graphics)
Server.init = function () {
var httpServer = http.createServer(function (req, res) {
    var path = url.parse(req.url).pathname;
    var contentType = 'text/html';
    if (path === '/') {
        path = '/index.html';
    } else if (path.indexOf('.css')) {
        contentType = 'text/css';
    } else if (path.indexOf('.svg')) {
        contentType = 'image/svg+xml';
    }
    fs.readFile(__dirname + path, function (error, data) {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data, 'utf-8');
    });
}).listen(3000);

console.log("Listening on port 3000");

var io = require('socket.io').listen(httpServer);
io.set('log level', 1); //removes console debug info - was annoying
Server.registerSocketIO(io);
}

Server.init();