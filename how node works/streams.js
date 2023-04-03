const fs = require("fs");

const Server = require("http").createServer();

Server.on("request", (req, res) => {
  //S1: read the file into a variable then send it to a client
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });

  //   const readable = fs.createReadStream("test-file.txt");
  //S2: using streams to make this process smoother
  //creates a stream from this text file which we can consume piece by piece via chunks

  //   readable.on("data", (chunk) => {
  //     //(response) write this chunk into a writable stream
  //     res.write(chunk); //the response is the writable stream
  //     //writing the data right to the client
  //   });
  //   readable.on("end", () => {
  //     res.end(); //calling end on the response no more data will be sent to this writable stream
  //   });
  //   //Error Event
  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("file not found");
  //   });
  const readable = fs.createReadStream("test-file.txt");
  //pipe is available on all readable streams it allows us to pipe the output of the readable stream
  //right into the input of a writable stream
  //S3: use our pipe() to ease the BackPressure of the response and not overload some network
  readable.pipe(res); //writable stream
  // readableSource.pipe(writableDest)
  console.log("REadinig")
});

Server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});
