let staticServer = require("static-server")

let server = new staticServer({
    rootPath : "./dist",
    port : 8000
});

server.start(function(){
 console.log("server started at port "+ server.port);
});