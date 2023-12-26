function addition (array) {
    array.splice(1, 1);
    array = array.map(Number);
    return array.reduce((sum, current) => sum + current, 0);
}

function subtraction (array) {
    array.splice(1, 1);
    array = array.map(Number);
    return array.reduce((difference, current) => difference - current);
}

function multiplication (array) {
    array.splice(1, 1);
    array = array.map(Number);
    return array.reduce((product, current) => product * current, 1);
}

function division (array) {
    array.splice(1, 1);
    array = array.map(Number);
    return array.reduce((quotient, current) => quotient / current);
}


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
            result = "",
            operator;

let calculateOperands = [];
let finalOperands = [];

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals")
const negativeButton = document.querySelector("#negative")
const decimalButton = document.querySelector('#decimal');
const display = document.querySelector('#screen');


function handleCalculations() {
    //handle decimals

    decimalButton.addEventListener('click', () => {
        if (!result && !firstNumber.includes(".")) {
            firstNumber += ".";
            secondNumber = firstNumber;
            display.textContent = firstNumber;
        } 

        // if (finalOperands.length >= 1 && operator) {
        //     firstNumber += "."; 
        //     secondNumber = firstNumber;
        //     display.textContent = secondNumber;
        // }

        // if (result && operator) {
           
        //     result = String(result)

        //         if (!secondNumber.includes(".")) {
        //             secondNumber += ".";
        //             // secondNumber = firstNumber;
        //             display.textContent = secondNumber;
        //         } else if (result.includes(".")) {
        //             result = result;
        //             display.textContent = result;
        //         }
            
        // }
    });


    // for the +/- toggle button
    negativeButton.addEventListener('click', () => {
        let negativeButtonText = ("-");
        
        //if there is no result yet and firstNumber
        //doesn't include a negative
            if (!result && !firstNumber.includes("-")) {
                // console.log("wait")
                firstNumber = negativeButtonText + firstNumber; 
                secondNumber = firstNumber;
                display.textContent = secondNumber;
            } else {
                firstNumber = firstNumber.replace("-", "");
                secondNumber = firstNumber;
                display.textContent = secondNumber;     
            }
            result = String(result);

            //else
            if (result) {
                result = String(result);
                    if (result.includes("-")){
                        result = result.replace("-", "");
                        finalOperands[0] = result;
                        display.textContent = result;
                        console.log(finalOperands)
                    } else {
                        result = "-" + result;
                        finalOperands[0] = result;
                        display.textContent = result;
                        console.log(finalOperands)
                    }

                    // for the second operand if there is a a result
                    if (finalOperands.length >= 1 && operator) {
                        firstNumber = negativeButtonText + firstNumber; 
                        secondNumber = firstNumber;
                        display.textContent = secondNumber;
                    }
            }
            
    });

    for (let i = 0; i < numberButtons.length; i++) {
        numberButtons[i].addEventListener("click", () => {
            let buttonText = numberButtons[i].textContent;

            if (buttonText) {
                firstNumber += buttonText;
                secondNumber = firstNumber
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
                }else if (finalOperands.length > 0 && secondNumber && operator) {
                    finalOperands.push(secondNumber);
                    //push the operator that was clicked on
                    //perform the operation
                        if (finalOperands[1] === "+") {
                           result = addition(finalOperands);
                        } else if (finalOperands[1] === "-") {
                            result = subtraction(finalOperands);
                        } else if (finalOperands[1] === "*") {
                            result = multiplication(finalOperands);
                        } else if (finalOperands[1] === "/") {
                            result = division(finalOperands);
                        }
                        //put answer as first element in the array
                        finalOperands.unshift(result)
                        //remove the previous 2 operands from the array
                        finalOperands.splice(1, 2);

                        display.textContent = result;
                    //MAGIC HAS TO HAPPEN HERE
                    //before pushing the second
                    //operator
                    finalOperands.push(operator);

                    console.log(finalOperands)
                    
                    // if i comment the next 2 lines out, it still works

                    console.log(finalOperands)
                    secondNumber = "";
                    firstNumber = "";

                }

            } 

        });
    }


//function to push secondNumber and clean up the
//array after equals
    function cleanUpArrayAfterEquals(operation) {
        //push the secondNumber in the array
        finalOperands.push(secondNumber);
        result = operation(finalOperands);
        finalOperands.unshift(result);
        finalOperands.splice(1, 2);

        secondNumber = firstNumber;
        console.log(finalOperands);

    }

    //add event listener on the equals button
    equalsButton.addEventListener('click', () => {
        let equalsButtonText = equalsButton.textContent;

        //should this be greater or equals to 2 instead?
        if (equalsButtonText && (finalOperands.length == 2)) {
            if (finalOperands[1] === "+") {
                console.log("It is plus");
                cleanUpArrayAfterEquals(addition);
                console.log(finalOperands);
      
             } else if (finalOperands[1] === "-") {
                 cleanUpArrayAfterEquals(subtraction); 
             } else if (finalOperands[1] === "*") {
                 cleanUpArrayAfterEquals(multiplication);
             } else if (finalOperands[1] === "/") {
                 cleanUpArrayAfterEquals(division);
             }
     
             console.log(finalOperands)
             display.textContent = result;

             //toggling this affects the display of the +/-
            //button when you want the result to
            //be used as the next operand.

            //If it is commented out, it'll display -secondNumber
            //instead of -result
             firstNumber = "";
             secondNumber = "";
             // result = addition(finalOperands);
             // display.textContent = result;
        }


    });

    //the clear button
    const clearButton = document.querySelector("#clear");

    clearButton.addEventListener('click', () => {
        display.textContent = 0;
        firstNumber = '';
        secondNumber = '';
        finalOperands = [];
        operator = '';
    })



}

handleCalculations()


















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