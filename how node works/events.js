const EventEmitter = require("events");
// All EventEmitters emit the event 'newListener'
//when new listeners are added and 'removeListener'
// when existing listeners are removed.

//emit named events and subscribe to these events while using this emitter

const http = require("http"); //getting the http module first to make a web server

class Sales extends EventEmitter {
  //make a new class that inherits from Event Emitter Class
  constructor() {
    super();
  }
}

const myEmitter = new Sales(); //buttons etc...

myEmitter.on("newSale", () => {
  //this on
  console.log("there was a new sale!");
});

myEmitter.on("newSale", () => {
  // and this on are the observers
  console.log("cust@: Tony");
});

myEmitter.on("newSale", (stock) => {
  //2nd arg in emit obj
  console.log(`there are now ${stock} items left in stock`);
});

//we want to emit an event called new sale
myEmitter.emit("newSale", 9); //object that emits the events

/////////////

const server = http.createServer();

//on method is used for listening for events in our code
server.on("request", (req, res) => {
  console.log("Request received!");
  console.log(req.url);
  res.end("Request Received"); //immediately emmits this response as soon as we send a req from our end
});

server.on("request", (req, res) => {
  console.log("Another request 🤑");
});

server.on("close", () => {
  console.log("Server Closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for request..."); //first message/logic / when we start this server and it waits for incoming I/O to the server/event loop
});


