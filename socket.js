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

    socket.on('filterUsersEmail', function(idSession, dato) {
      if(dato != "")
        filterUsersEmail(idSession, dato);
    });

    socket.on('filterUsersRole', function(idSession, dato) {
      if(dato != "")
        filterUsersRole(idSession, dato);
    });

    socket.on('filterRequestsState', function(idSession, dato) {
      if(dato != "")
        filterRequestsState(idSession, dato);
    });

    socket.on('filterRequestsType', function(idSession, dato) {
      if(dato != "")
        filterRequestsType(idSession, dato);
    });

    socket.on('filterRequestsResponsed_at', function(idSession, dato) {
      if(dato != "")
        filterRequestsResponsed_at(idSession, dato);
    });

    socket.on('filterRequestsCreated_at', function(idSession, dato) {
      if(dato != "")
        filterRequestsCreated_at(idSession, dato);
    });

    socket.on('filterRequestsSubject', function(idSession, dato) {
      if(dato != "")
        filterRequestsSubject(idSession, dato);
    });

    socket.on('filterRequestsUser', function(idSession, dato) {
      if(dato != "")
        filterRequestsUser(idSession, dato);
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

function filterUsersEmail(idSession, email) {
  con.query('SELECT * FROM users WHERE email = "'+email+'"', function (err, result) {
    if (err) throw err;
    io.to(idSession).emit('returnFilterUsersEmail', result);
  });
}

function filterUsersRole(idSession, role) {
  con.query('SELECT * FROM users WHERE role = "'+role+'"', function (err, result) {
    if (err) throw err;
    io.to(idSession).emit('returnFilterUsersRole', result);
  });
}

function filterRequestsState(idSession, state) {
  con.query('SELECT * FROM requests WHERE state = "'+state+'"', function (err, result) {
    if (err) throw err;
    io.to(idSession).emit('returnFilterRequestsState', result);
  });
}

function filterRequestsType(idSession, type) {
  con.query('SELECT * FROM requests WHERE type = "'+type+'"', function (err, result) {
    if (err) throw err;
    io.to(idSession).emit('returnFilterRequestsType', result);
  });
}

function filterRequestsResponsed_at(idSession, responsed_at) {
  con.query('SELECT * FROM requests WHERE responsed_at = "'+responsed_at+'"', function (err, result) {
    if (err) throw err;
    io.to(idSession).emit('returnFilterRequestsResponsed_at', result);
  });
}

function filterRequestsCreated_at(idSession, created_at) {
  con.query('SELECT * FROM requests WHERE created_at = "'+created_at+'"', function (err, result) {
    if (err) throw err;
    io.to(idSession).emit('returnFilterRequestsCreated_at', result);
  });
}

function filterRequestsSubject(idSession, subject) {
  con.query('SELECT * FROM requests WHERE subject = "'+subject+'"', function (err, result) {
    if (err) throw err;
    io.to(idSession).emit('returnFilterRequestsSubject', result);
  });
}

function filterRequestsUser(idSession, user_id) {
  con.query('SELECT * FROM requests WHERE user_id = "'+subjeuser_idct+'"', function (err, result) {
    if (err) throw err;
    io.to(idSession).emit('returnFilterRequestsUser', result);
  });
}

function insertUser(email, password, role, name, idSession) {
  con.query('INSERT INTO `users`(`email`, `password`, `role`, `name`) VALUES ('+email+','+password+','+role+','+name+')', function (err, result) {
    if (err) throw err;
    io.to(idSession).emit('returnInsertUser', result);
  });
}

function inserRequests(user_id, state, type, description, responsed_at, created_at, subject, idSession) {
  con.query('INSERT INTO `requests`(`user_id`, `state`, `type`, `description`, `responsed_at`, `created_at`, `subject`) VALUES ('+user_id+','+state+','+type+','+description+','+responsed_at+','+created_at+','+subject+')', function (err, result) {
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