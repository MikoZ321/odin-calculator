const ALLOWED_OPERATORS = ["+", "-", "*", "/"];

// Adds two values and returns the output
function add(a, b) {
    if (typeof a != "number" || typeof b != "number") throw TypeError;
    return a + b;
}

// Subtracts two values and returns the output
function subtract(a, b) {
    if (typeof a != "number" || typeof b != "number") throw TypeError;
    return a - b;
}

// Multiplies two values and returns the output
function multiply(a, b) {
    if (typeof a != "number" || typeof b != "number") throw TypeError;
    return a * b;
}
// Divides two values and returns the output
function divide(a, b) {
    if (typeof a != "number" || typeof b != "number") throw TypeError;
    if (b == 0) throw RangeError;
    return a / b;
}

// Handles the operation logic, returns the result
function operate(a, b, operator) {
    if (typeof a != "number" || typeof b != "number") throw TypeError;
    if (typeof operator != "string" && !(operator in ALLOWED_OPERATORS)) throw TypeError;

    switch (operator) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
    }
}
let a, b, operator;