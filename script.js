document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById('calc-display');
    const buttons = document.getElementsByClassName('btn');

    let currentValue = "";

    function evaluateResult() {
        let convertedValue = currentValue
            .replace("×", "*")
            .replace("÷", "/")
            .replace("%", "*0.01")
            .replace("sin", "Math.sin")
            .replace("π", "Math.PI")
            .replace("cos", "Math.cos")
            .replace("log", "Math.log10")
            .replace("e", "Math.E")
            .replace("ln","Math.log")
            .replace("tan", "Math.tan")
            .replace("√", "Math.sqrt")
            .replace("exp", "Math.exp")

        if (convertedValue.includes("Rad")) {
            convertedValue = convertedValue.replace("Rad","")
            integers = convertedValue.replace(/\D/g, '');
            integers = parseInt(integers)
            if (convertedValue.includes("sin")) {
                convertedValue = Math.sin(integers * Math.PI / 180);
            } else if (convertedValue.includes("cos")) {
                convertedValue = Math.cos(integers * Math.PI / 180);
            } else if (convertedValue.includes("tan")) {
                convertedValue = Math.tan(integers * Math.PI / 180);
            } else {
                convertedValue = (integers * Math.PI / 180);
            }

        } else if (convertedValue.includes("Math.Exp")) {
            convertedValue = convertedValue.replace("Math.Exp", "Math.exp")
        } else if (convertedValue.includes("!")) {
            let value = convertedValue.replace("!", "")
            let res = 1
            for (i = value; i >= 1; i--) {
                res *= i
            }
            convertedValue = res
        } else if (convertedValue.includes("^")) {
            convertedValue = convertedValue.split("^")
            convertedValue = Math.pow(parseInt(convertedValue[0]), parseInt(convertedValue[1]))
        } else if (convertedValue.includes("sin-1")) {
            integers = convertedValue.replace("sin-1", '');
            integers = integers.replace(/\D/g, '');
            convertedValue = Math.asin(integers)
        } else if (convertedValue.includes("tan-1")) {
            integers = convertedValue.replace("tan-1", '');
            integers = integers.replace(/\D/g, '');
            convertedValue = Math.atan(integers)
        } else if (convertedValue.includes("cos-1")) {
            integers = convertedValue.replace("cos-1", '');
            integers = integers.replace(/\D/g, '');
            convertedValue = Math.acos(integers)
        } else if (currentValue.includes("e^")) {
            integers = parseInt(convertedValue)
            convertedValue = Math.exp(integers)
        } else if (currentValue.includes("√")) {
            integers = currentValue.replace(/\D/g, '');
            console.log(currentValue)
            convertedValue = Math.sqrt(integers)
        }

        currentValue = convertedValue;
        const result = eval(currentValue);

        currentValue = result.toString();
        display.value = currentValue;
    }


    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        button.addEventListener('click', function () {
            const value = button.innerText;
            display.value = value;
            if (value == "AC") {
                currentValue = "";
                display.value = currentValue
            } else if (value == "=" || value == "Ans") {
                evaluateResult();
            } else if (value === "ex") {
                currentValue += value.replace("x", "^")
            } else if (currentValue.includes("x2")) {
                currentValue = currentValue.replace("x2", value + "^2")
                display.value = currentValue;
            } else if (currentValue.includes("10x")) {
                currentValue = currentValue.replace("10x", "10^" + value)
                display.value = currentValue;
            } else if (currentValue.includes("√x")) {
                currentValue = currentValue.replace("√x", "√" + value)
                display.value = currentValue;
            } else {
                currentValue += value;
                if (currentValue.includes("Inv") || currentValue.includes("Deg")) {
                    currentValue = currentValue.replace("Inv", "")
                    currentValue = currentValue.replace("Deg", "")
                    currentValue = currentValue.replace("Rad", "")

                }
                display.value = currentValue;
            }
        })

    }

    const elements = document.querySelectorAll('.myText');
    const button = document.getElementById('myButton');
    const originalTexts = [];

    elements.forEach(function (element) {
        originalTexts.push(element.textContent);
    });

    button.addEventListener('click', function () {

        elements.forEach(function (element, index) {
            if (element.textContent === 'New Text') {
                pass
            } else if (element.textContent === "sin") {
                element.innerHTML = 'sin<sup>-1</sup>';
            } else if (element.textContent == "cos") {
                element.innerHTML = 'cos<sup>-1</sup>';
            } else if (element.textContent == "tan") {
                element.innerHTML = 'tan<sup>-1</sup>';
            } else if (element.textContent == "ln") {
                element.innerHTML = 'e<sup>x</sup>';
            } else if (element.textContent == "log") {
                element.innerHTML = '10<sup>x</sup>';
            } else if (element.textContent == "√") {
                element.innerHTML = 'x<sup>2</sup>';
            } else if (element.textContent == "^") {
                element.innerHTML = '√x';
            } else {
                element.textContent = originalTexts[index];
            }
        })
    })
})