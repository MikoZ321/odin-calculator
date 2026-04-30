
// Define system variables
let number_buffer = "";
let operator_buffer = "";
let registers = [undefined, undefined];
let current_register_index = 0;

function add(a, b) {
// Add two values, return result
    if (typeof a != "number" || typeof b != "number") throw TypeError;
    return a + b;
}

function subtract(a, b) {
// Subtract two values, return result
    if (typeof a != "number" || typeof b != "number") throw TypeError;
    return a - b;
}

function multiply(a, b) {
// Multiply two values, return result
    if (typeof a != "number" || typeof b != "number") throw TypeError;
    return a * b;
}

function divide(a, b) {
// Divide two values, return result
    if (typeof a != "number" || typeof b != "number") throw TypeError;
    if (b == 0) throw RangeError;
    return a / b;
}

function operate(a, b, operator) {
// Handle operation logic, return result
    const ALLOWED_OPERATORS = ["+", "-", "*", "/"];

    if (typeof a != "number" || typeof b != "number") throw TypeError;
    if (typeof operator != "string" && !(operator in ALLOWED_OPERATORS)) throw TypeError;

    switch (operator) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
    }
}

// Input numbers
// TODO: account for overflow
const number_display = document.querySelector("#number-display");

const number_buttons = document.querySelectorAll(".number-button");
number_buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (registers[0] != undefined && operator_buffer == "") {
            number_buffer = clear(number_display);
            current_register_index = 0;
            registers[0] == undefined;
        }
        let button_number = button.getAttribute("id");
        number_buffer += button_number;
        number_display.innerHTML = number_buffer; 
    });
});

// Handle All-Clear (AC) button
function clear(display) {
    // Clear provided display, return empty string
    display.innerHTML = "";
    return "";
}
const clear_button = document.querySelector("#clear");
clear_button.addEventListener("click", () => {
    number_buffer = clear(number_display);
    operator_buffer = clear(operator_display);

    // Clear memory
    registers.map(() => (""));
    current_register_index = 0;
})

// Input operator
const operator_display = document.querySelector("#operator-display");

const operator_buttons = document.querySelectorAll(".operator-button");
operator_buttons.forEach((button) => {
    button.addEventListener("click", () => {
        // Allow chaining operations
        if (operator_buffer != "" && registers[0] != undefined && number_buffer.length != 0) {
            evaluate();

            operator_buffer = button.getAttribute("id");
            operator_display.innerHTML = operator_buffer;

        }
        // Allow operator change if no second number input yet
        if (number_buffer.length == 0 || operator_buffer == "") {
            operator_buffer = button.getAttribute("id");
            operator_display.innerHTML = operator_buffer;
        }

        console.log(registers, current_register_index, operator_buffer);
        if (current_register_index == 0) {
            registers[current_register_index] = Number(number_buffer);
            current_register_index = 1;
            number_buffer = clear(number_display);
        }
    });
});

// Compute operation
function evaluate() {
    console.log(registers, current_register_index, number_buffer, operator_buffer);
    if (registers[0] == undefined || number_buffer.length == 0 || operator_buffer.length == 0) throw RangeError;

    registers[current_register_index] = Number(number_buffer);
    number_buffer = clear(number_display);

    try {
        registers[0] = Number(operate(registers[0], registers[1], operator_buffer));
    }
    catch(err) {
        if (err == RangeError) console.log("Don't divide by zero!")
    }
    operator_buffer = clear(operator_display);
    registers[1] = undefined;

    number_display.innerHTML = registers[0];
}

const equals_button = document.querySelector("#equals");
equals_button.addEventListener("click", () => {
    evaluate();
})