module.exports = class {
    //using an expression to export a class
    add(a, b) {
        return a + b;
    }
    multiply(a, b) {
        return a * b;
    }
    
    divide(a, b) {
        a / b;
    }
};

// class Calculator {
//   add(a, b) {
//     return a + b;
//   }
//   multiply(a, b) {
//     return a * b;
//   }

//   divide(a, b) {
//     a / b;
//   }
// }

// //use when we want to export one single value
// module.exports = Calculator;
