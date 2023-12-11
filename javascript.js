let addition = (a, b) => a + b;

let subtraction = (a, b) => a - b;

let multiplication = (a, b) => a * b;

let division = (a, b) => a / b;

let firstNumber, 
        secondNumber, 
             operator;

function operate(operator, firstNumber, secondNumber) {
    switch (operator) {
        case "+":
            return addition(firstNumber, secondNumber);
        case "-":
            return subtraction(firstNumber, secondNumber);
        case "*":
            return multiplication(firstNumber, secondNumber);
        case "/":
            return division(firstNumber, secondNumber);
    }
}

const display = document.querySelector('#screen');

let allNumbers = document.querySelectorAll('.number');

function displayNumbers() {
    for (let i = 0; i < allNumbers.length; i++) {
        allNumbers[i].addEventListener('click', () => {
            console.log("hello");
            display.textContent += allNumbers[i].textContent;
        });
    }
}

displayNumbers();
