var conn_iptv_prueba = null;

$(document).on("ready", conectarServidorIptv);

function conectarServidorIptv() 
{
    conn_iptv_prueba = io.connect("http://"+host_name+":4011", { forceNew: true});
    conn_iptv_prueba.on("connect", function () {
        //conn_iptv.emit("conectado");
        notificaciones('success', 'Iptv Conectado.');
    }).on("connect_error", function () {
        console.log("Error");
        //notificaciones('error', 'NodeJS no responde.');
    }).on("disconnect", function () {
        console.log("Desconecto");
        //notificaciones('error', 'NodeJS Desconectado.');
    });
    
    //var idnum = Math.round(Math.random() * 10);
    var idnum = "javierenriquegc@ufps.edu.co";
    conn_iptv_prueba.emit("join", idnum);
    //conn_iptv_prueba.emit("sqlCustom", 'INSERT INTO `users`(`email`, `password`, `role`, `name`) VALUES ("a@g.com","12345","com","a")');
    conn_iptv_prueba.emit("validateSession", idnum, '12345');
    
    conn_iptv_prueba.on("getUsers", function (Users) {
        console.log(Users);
    });
    
    conn_iptv_prueba.on("getNotes", function (Notes) {
        console.log(Notes);
    });
    
    conn_iptv_prueba.on("getRequests", function (Requests) {
        console.log(Requests);
    });
    
    conn_iptv_prueba.on("returnSqlCustom", function (val) {
        console.log(val);
    });
    
    conn_iptv_prueba.on("returnInsertUser", function (val) {
        console.log(val);
    });
    
    conn_iptv_prueba.on("returnInsertNotes", function (val) {
        console.log(val);
    });

    conn_iptv_prueba.on("returnValidateSession", function (val) {
        console.log(val);
    });
    
    
    

    conn_iptv_prueba.on("enviarMensaje", function (dispositivos) {
        //console.log('Entro '+dispositivos);
    });
    
    conn_iptv_prueba.on("userDis", function (dispositivos) {
        console.log('Salio '+dispositivos);
    });
}