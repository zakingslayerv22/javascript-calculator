let addition = (a, b) => a + b;

let subtraction = (a, b) => a - b;

let multiplication = (a, b) => a * b;

let division = (a, b) => a / b;


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

let firstNumber = "",
        secondNumber = "",
            operator;

let singleOperand = [];
let finalOperands = [];

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const display = document.querySelector('#screen');


function handleCalculations() {


    for (let i = 0; i < numberButtons.length; i++) {
        numberButtons[i].addEventListener("click", () => {
            let buttonText = numberButtons[i].textContent;

            if (buttonText) {
                firstNumber += buttonText;
                secondNumber = +firstNumber
                console.log(secondNumber)
                display.textContent = secondNumber;
            }

        });
    }


    for (let j = 0; j < operatorButtons.length; j++) {
        operatorButtons[j].addEventListener("click", () => {
            let operatorButtonText = operatorButtons[j].textContent;
            // display.textContent += operatorButtonText

            if (operatorButtonText) {
                operator = operatorButtonText;
                if (finalOperands.length == 0 && secondNumber) {
                    finalOperands[0] = secondNumber;
                    finalOperands.push(operator);
                    console.log (finalOperands.length);
                    console.log(finalOperands)
                    
                    firstNumber = "";
                }else if (finalOperands.length > 0 && secondNumber) {
                    finalOperands.push(secondNumber);
                    console.log(finalOperands)
                    // if i comment the next 2 lines out, it still works
                    secondNumber = "";
                    firstNumber = "";
                    
                }
            }
        });
    }


}

handleCalculations()

// console.
// console.log(numberButtons);

console.log(finalOperands);


























// if (operator) {
//     secondNumber += numberButtons[i].textContent;
//     document.querySelector(".second-number").textContent = secondNumber;
// } else {
//     firstNumber += numberButtons[i].textContent;
//     document.querySelector(".first-number").textContent = firstNumber;
// }
// console.log (firstNumber, secondNumber, operator);

// if (allNumbers[i].textContent === 'C') {
//     display.textContent = '';
// } else if (allNumbers[i].textContent === 'CE') {
//     display.textContent = display.textContent.slice(0, -1);
// } else {
//     display.textContent += allNumbers[i].textContent;
// }


// console.log(singleOperand);