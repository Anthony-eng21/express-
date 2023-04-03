const fs = require("fs");
const crypto = require("crypto");
process.env.UV_THREADPOOL_SIZE = 2; //thread pool and changing it's size
const start = Date.now();

setTimeout(() => console.log("Timer 1 Finished"), 0);
setImmediate(() => console.log("Immediate 1 Finished"));

//CB's
fs.readFile("text-file.txt", () => {
  console.log("I/0 Finished");
  console.log("----------------");
  setTimeout(() => console.log("Timer 2 finished"), 0); //pauses this one in the polling phase
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  setImmediate(() => console.log("the Immediate 2 finished")); //sets this one first

  //first cb that gets called because nextTick is a function that gets used before the next loop sequence begins
  process.nextTick(() => console.log("process.nextTick()"));

  //with sync this will not run in the event loop "blocking-code"
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
});

//EL waits for stuff to happen in the I/O phase where the callbacks are empty
// hello from the top-level code
// I/0 Finished
// the Immediate 2 finished
// Timer 2 finished
// Timer 3 finished

console.log("hello from the top-level code");
