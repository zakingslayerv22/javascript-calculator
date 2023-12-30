//the operations functions

const addition = (array) => {
    array.splice(1, 1);
    array = array.map(Number);
    return array.reduce((sum, current) => sum + current, 0);
}

const subtraction = (array) => {
    array.splice(1, 1);
    array = array.map(Number);
    return array.reduce((difference, current) => difference - current);
}

const multiplication = (array) => {
    array.splice(1, 1);
    array = array.map(Number);
    return array.reduce((product, current) => product * current, 1);
}

const division = (array) => {
    array.splice(1, 1);
    array = array.map(Number);
        if (array[1] == 0) {
           return "Can't divide by 0";
        } else {
            return array.reduce((quotient, current) => quotient / current);
        }
}


//define the operands, result and operator
let firstNumber = "",
        secondNumber = "",
            result = "",
            operator;

//define the finalOperands array
let finalOperands = [];

function resetAll() {
    firstNumber = "";
    secondNumber = "";
    result = "";
    operator = "";
    finalOperands = [];
}

const roundedToEightDecimals = (number) => {
    return Math.round(number * 100000000) / 100000000
}

// const roundedToEightDecimals = (number) => Math.round(number * 1000000000) / 1000000000;


//define all the buttons - dom elements
const buttons = document.querySelectorAll("button");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals")
const negativeButton = document.querySelector("#negative")
const decimalButton = document.querySelector('#decimal');
const clearButton = document.querySelector("#clear");
const backspaceButton = document.querySelector("#backspace");
const display = document.querySelector('#screen');

//function to handle Numbers
const handleNumbers = (input) => {
    firstNumber += input;
    secondNumber = firstNumber
    console.log(secondNumber)
    display.textContent = secondNumber;
};
//function to handle decimals
const handleDecimal = (theDecimalPoint) => {
    if (!result && !firstNumber.includes(theDecimalPoint)) {
        firstNumber += theDecimalPoint;
        secondNumber = firstNumber;
        display.textContent = firstNumber;
    } 

    if (result && operator) {
       
        result = String(result)

            if (!firstNumber.includes(theDecimalPoint)) {
                // firstNumber = ""
                firstNumber += theDecimalPoint;
                secondNumber = firstNumber;

                display.textContent = firstNumber;
            }
    }

};

//function to handle the +/- toggle button
const handleMinusPlusToggle = (theInput) => {
    theInput = ("-");
        
    //if there is no result yet and firstNumber
    //doesn't include a negative
        if (!result && !firstNumber.includes("-")) {
            // console.log("wait")
            firstNumber = theInput + firstNumber; 
            secondNumber = firstNumber;
            display.textContent = secondNumber;
        } else {
            firstNumber = firstNumber.replace("-", "");
            secondNumber = firstNumber;
            display.textContent = secondNumber;     
        }

        //else
        if (result) {
            result = String(result);
                if (result.includes("-")){
                    result = result.replace("-", "");
                    finalOperands[0] = result;
                    display.textContent = result;
                } else {
                    result = "-" + result;
                    finalOperands[0] = result;
                    display.textContent = result;
                }

                
                if (finalOperands.length >= 1 && operator) {
                    firstNumber = negativeButtonText + firstNumber; 
                    secondNumber = firstNumber;
                    // result = secondNumber;
                    display.textContent = secondNumber;
                }
        }
}

//handle pressing down (and staying down) of button

 buttons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');

        setTimeout(() => { button.classList.remove('active'); }, 1000);
    });
});


//function to handle calculations
function handleCalculations() {

    //for the keyboard
    document.addEventListener("keydown", (event) => {
        let theEventKey = event.key;
           if (theEventKey === "0" || theEventKey === "1" || theEventKey === "2"
                    || theEventKey === "3" || theEventKey === "4" || theEventKey === "5"
                    || theEventKey === "6" || theEventKey === "7" || theEventKey === "8"
                    || theEventKey === "9") {
               
            handleNumbers(theEventKey)
           } else if (theEventKey === ".") {
                handleDecimal(theEventKey)
           } else if (theEventKey === "-") {
                handleMinusPlusToggle(theEventKey)
           }
    });


    //handle decimals
    decimalButton.addEventListener('click', () => {
        handleDecimal(".");
    });


    // handle the +/- toggle button
    negativeButton.addEventListener('click', () => {
        handleMinusPlusToggle("-");
    });


    //handle the number buttons
    for (let i = 0; i < numberButtons.length; i++) {
        numberButtons[i].addEventListener("click", () => {
            let numberButtonText = numberButtons[i].textContent;

            if (numberButtonText) {
                handleNumbers(numberButtonText);
            } 
        });
    };


    //handle operator buttons and a string of continuous calculations
    for (let j = 0; j < operatorButtons.length; j++) {
        operatorButtons[j].addEventListener("click", () => {
            let operatorButtonText = operatorButtons[j].textContent;
            // display.textContent += operatorButtonText

            if (operatorButtonText) {//HERE IF OPERATOR BUTTON AND N0
                //RESULT
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
                        //if result is not "Can't divide by 0"
                        if (result !== "Can't divide by 0") {
                            result = roundedToEightDecimals(result);
                            finalOperands.unshift(result)
                            //remove the previous 2 operands from the array
                            finalOperands.splice(1, 2);
                            finalOperands.push(operator);  
                        } else {
                            finalOperands = [];
                        }

                      
                        display.textContent = result;
                    

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
        result = operation(finalOperands); //between here

            if (result !== "Can't divide by 0") {
                result = roundedToEightDecimals(result)
                finalOperands.unshift(result);
                finalOperands.splice(1, 2);
            } else {
                finalOperands = [];
            }
       

        secondNumber = +firstNumber;
        console.log(finalOperands);

    }

    //handle the equals equals button after inputting 
    //operand, operator and then operand
    equalsButton.addEventListener('click', () => {
        let equalsButtonText = equalsButton.textContent;

        //should this be greater or equals to 2 instead?
        if (equalsButtonText && (finalOperands.length == 2)) {
            if (finalOperands[1] === "+") {
                cleanUpArrayAfterEquals(addition); 
             } else if (finalOperands[1] === "-") {
                 cleanUpArrayAfterEquals(subtraction); 
             } else if (finalOperands[1] === "*") {
                 cleanUpArrayAfterEquals(multiplication);
             } else if (finalOperands[1] === "/") {
                 cleanUpArrayAfterEquals(division);  
             }
     
             console.log(finalOperands)
             display.textContent = result;
            //  firstNumber = "";
            //  secondNumber = "";
        }

    });


 //handle the clear button
 
 clearButton.addEventListener('click', () => {
     display.textContent = 0;
     firstNumber = '';
     secondNumber = ''; 
     result = '';
     finalOperands = [];
     operator = '';
 });

 
 //handle the backspace button

 backspaceButton.addEventListener('click', () => { 
    
    if (firstNumber && !result) {
        firstNumber = firstNumber.slice(0, -1);
        secondNumber = firstNumber;
        console.log(secondNumber)
        display.textContent = secondNumber;
            if (firstNumber === "") {
                display.textContent = 0;
            } else if (firstNumber !== "") {
                display.textContent = firstNumber;
            }
    } 
     
 });


}

handleCalculations()

