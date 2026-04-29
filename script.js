// Adds to integer values and returns the output
function add(a, b) {
    if (typeof a != "number" || typeof b != "number") throw TypeError;
    return a + b;
}