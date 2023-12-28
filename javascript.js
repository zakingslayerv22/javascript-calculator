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
        if (array[1] == 0) {
           return "Can't divide by 0";
        } else {
            return array.reduce((quotient, current) => quotient / current);
        }
}


let firstNumber = "",
        secondNumber = "",
            result = "",
            operator;

let calculateOperands = [];
let finalOperands = [];

function resetAll() {
    firstNumber = "";
    secondNumber = "";
    result = "";
    operator = "";
    finalOperands = [];
}

function roundedToEightDecimals(number) {
    return Math.round(number * 100000000) / 100000000
}

// const roundedToNineDecimals = (number) => Math.round(number * 1000000000) / 1000000000;



const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals")
const negativeButton = document.querySelector("#negative")
const decimalButton = document.querySelector('#decimal');
const display = document.querySelector('#screen');

//handle Numbers
const handleNumbers = (input) => {
    firstNumber += input;
    secondNumber = firstNumber
    console.log(secondNumber)
    display.textContent = secondNumber;
};
//handle decimals
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

//handle the +/- toggle button
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
                //negativeButtonText is not defined
                //if i change it to theInput or "-", the 
                //code will break
                
                if (finalOperands.length >= 1 && operator) {
                    firstNumber = negativeButtonText + firstNumber; 
                    secondNumber = firstNumber;
                    // result = secondNumber;
                    display.textContent = secondNumber;
                }
        }
};

const handleOperators = (operator) => {
    
}

function handleCalculations() {

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
        handleDecimals(".");
    });


    // for the +/- toggle button
    negativeButton.addEventListener('click', () => {
        handleMinusPlusToggle("-");
    });

    for (let i = 0; i < numberButtons.length; i++) {
        numberButtons[i].addEventListener("click", () => {
            let buttonText = numberButtons[i].textContent;

            if (buttonText) {
                handleNumbers(buttonText);
            } 

            // if (finalOperands.length > 0) {
            //     console.log ("Target");
            // }
        });
    }


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

                        // finalOperands.push(operator);
                        display.textContent = result;
                    
                    // finalOperands.push(operator);

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

    //add event listener on the equals button
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


 //the clear button
 const clearButton = document.querySelector("#clear");

 clearButton.addEventListener('click', () => {
     display.textContent = 0;
     firstNumber = '';
     secondNumber = ''; 
     result = '';
     finalOperands = [];
     operator = '';
 });

 //the backspace button

 const backspaceButton = document.querySelector("#backspace");

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


    // if (result) {
    //     result = String(result);
    //     result = result.slice(0, -1);
    //     display.textContent = result;
    //         if (result === "") {
    //             result = "0"
    //             firstNumber = "";
    //             secondNumber = "";
    //             operator = "";
    //             finalOperands = [];
    //             display.textContent = result;
    //         }
    // }


     
 });


}

handleCalculations()

