// require express and path
var express = require("express"),
	path = require("path");
// create the express app
var app = express();
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");
// root route to render the index.ejs view
app.get("/", function(req, res){
	res.render("index");
});
// tell the express app where to listen
var server = app.listen(8000, function(){
	console.log("Listening on port 8000");
});
// this gets the socket.io module
var io = require("socket.io").listen(server);

// Whenever a connection event happens, run the following code:
io.sockets.on("connection", function(socket){
	console.log("WE ARE USING SOCKETS");
	console.log(socket.id);
	// all the socket code goes here!
	socket.on("button_clicked", function(data){
		console.log("Someone clicked a button! Reason: " + data.reason);
		socket.emit("server_response", {response: "sockets are the best!"});
	});
});


// Server-side emit syntax notes. The Server has three different ways to communicate w/sockets:
//io.sockets.on('connection', function(socket){
	// 1: Emit: sends data from the server to the specific client who initiated contact.
	// socket.emit("my_emit_event");

	// 2: Broadcast: sends data from the server to everyone BUT the client that initiated the contact.
	// socket.broadcast.emit("my_broadcast_event");

	// 3: Full Broadcast: sends data to all connected clients.
	// io.emit("my_full_broadcast_event");
// });


// Testing socket events:
	// Use multiple browsers (ie: Firefox and Chrome (work great in tandem));
	// Use incognito/private browsing window if multiple connections are needed in same browser;
	// Refresh every window when your server restarts;