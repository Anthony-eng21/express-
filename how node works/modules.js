// console.log(arguments);
//node internal wrapper function code templates our code then fills up the body of this function with our code
// ["(function (exports, require, module, __filename, __dirname) { ", "\n});"];
// console.log(require("module").wrapper);

const C = require("./test-module-1"); //C is our class
//module.exports
const calc1 = new C(); //instanciate class

console.log(calc1.add(2, 5));

//exports

// const calc2 = require("./test-module-2");
// console.log(calc2.add(5, 20));
// console.log(calc2.multiply(5, 20));
// console.log(calc2.divide(5, 20));
//using anonymous functions from another folder and assigning their methods onto our object here
// 7
// 25
// 100
// 0.25

const { add, multiply, divide } = require("./test-module-2");
console.log(multiply(2, 5));
console.log(add(2, 5));
console.log(divide(2, 5));

//Caching technically this module was called once so this whole module is called at once
require("./test-module-3")(); //will return the function we defined and call it here
require("./test-module-3")(); //will return the function we defined and call it here
require("./test-module-3")(); //will return the function we defined and call it here
