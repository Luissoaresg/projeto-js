const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    // add digit to calculator screen
    addDigit(digit) {
        // check if current operation already has a dot
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    // Process all calculator operations
    processOperation(operation) {
        // Check if current is empty
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            // change operation 
            if (this.previousOperationText.innerText !== "") {
                this.changeoperation(operation);
            }
            return;
        }


        // Get current and previous value
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;


        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperation();
                break;
            case "CE":
                this.precessClearCurrentOperation();
                break;
            case "C":
                this.processClearAllOperation();
                break;
            case "=":
                this.processEqualOperation();
                break;
            default:
                return;
        }
    }

    // Change values of the calculator screen
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null) {

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            //Check if is zero, if it is just add current value
            if (previous === 0) {
                operationValue = current;
            }

            // Add currente value to previos
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
    }

    // CHange math operation
    changeoperation(operation) {
        const mathOperation = ["*", "/", "+", "-"];

        if (!mathOperation.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // Delete the last digit
    processDelOperation() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    // Clear current Operation
    precessClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }

    // Clear all operation
    processClearAllOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // Equal operation
    processEqualOperation() {

        const operation = previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});