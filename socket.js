const express = require('express'),
http = require('http'),
app = express(),
server = http.createServer(app),
io = require('socket.io').listen(server);

app.get('/', (req, res) => {
    res.send('Socket Server is running on port 4011')
});

io.on('connection', function(socket) {

    socket.on('join', function(idSession) {
      console.log('Connection '+idSession);
      socket.join(idSession);

      //io.sockets.emit('enviarMensaje', idSession);      //Enviar a todos los usuarios
      //io.to(idSession).emit('prueba_unic', idSession);  //Enviar a un usaurio especifico

      //socket.broadcast.emit('userjoinedthechat',userNickname +" : has joined the chat ");
    });

    socket.on('disconnect', function() {
      //socket.broadcast.emit( "userdisconnect" , 'user has left');
    });

    socket.on('sqlCustom', function(sql, idSession) {
      sqlCustom(sql, idSession);
    });

    socket.on('getUsers', function(idSession) {
      getUsers(idSession);
    });

    socket.on('getRequests', function(idSession) {
      getRequests(idSession);
    });

    socket.on('getNotes', function(idSession) {
      getNotes(idSession);
    });

    socket.on('insertUser', function(email, password, role, name, idSession) {
      insertUser(email, password, role, name, idSession);
    });

    socket.on('inserRequests', function(user_id, state, type, description, responsed_at, created_at, idSession) {
      inserRequests(user_id, state, type, description, responsed_at, created_at, idSession);
    });

    socket.on('inserNotes', function(description, request_id, user_id, idSession) {
      inserNotes(description, request_id, user_id, idSession);
    });

    socket.on('validateSession', function(idSession, password) {
      validateSession(idSession, password);
    });
});

server.listen(4011,()=>{
    console.log('Node app is running on port 4011');
});














//BD
// Paquete necesario para conectar a bases de datos MySQL.
var mysql = require('mysql');

// Parámetros de conexión a la base de datos.
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "contraseña",
  database : 'base_prueba'
});

con.connect(function(err) {
  if (err) throw err;
});

function sqlCustom(sql, idSession) {
  con.query(sql, function (err, result) {
    if (err) throw err;
    io.to(idSession).emit('returnSqlCustom', result);
  });
}

function getUsers(idSession) {
  con.query('SELECT * FROM users', function (err, result) {
    if (err) throw err;
    io.to(idSession).emit('getUsers', result);
  });
}

function getNotes(idSession) {
  con.query('SELECT * FROM notes', function (err, result) {
    if (err) throw err;
    io.to(idSession).emit('getNotes', result);
  });
}

function getRequests(idSession) {
  con.query('SELECT * FROM requests', function (err, result) {
    if (err) throw err;
    io.to(idSession).emit('getRequests', result);
  });
}

function insertUser(email, password, role, name, idSession) {
  con.query('INSERT INTO `users`(`email`, `password`, `role`, `name`) VALUES ('+email+','+password+','+role+','+name+')', function (err, result) {
    if (err) throw err;
    io.to(idSession).emit('returnInsertUser', result);
  });
}

function inserRequests(user_id, state, type, description, responsed_at, created_at, idSession) {
  con.query('INSERT INTO `requests`(`user_id`, `state`, `type`, `description`, `responsed_at`, `created_at`) VALUES ('+user_id+','+state+','+type+','+description+','+responsed_at+','+created_at+')', function (err, result) {
    if (err) throw err;
    io.to(idSession).emit('returnInsertRequests', result);
  });
}

function inserNotes(description, request_id, user_id, idSession) {
  con.query('INSERT INTO `notes`(`description`, `request_id`, `user_id`) VALUES ('+description+','+request_id+','+user_id+')', function (err, result) {
    if (err) throw err;
    io.to(idSession).emit('returnInsertNotes', result);
  });
}

function validateSession(idSession, password) {
  con.query('SELECT * FROM users WHERE email = "'+idSession+'"', function (err, result) {
    if (err) throw err;
    
    if(result[0] != null){
      io.to(idSession).emit('returnValidateSession', result[0].password == password);
    }else{
      io.to(idSession).emit('returnValidateSession', 'Correo no Registrado');
    }
  });
}