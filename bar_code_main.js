const splitInput = input => {
    var converted_array = [];
    //  To transform the array in int, loop all the array.
    for (var i = 0; i < input.length; i++) {
        //  Push the int covited array in new array
        converted_array.push(parseInt(input[i]));
    }
    return converted_array;
}

const getOdd = mainArray => {
    var oddValue = [];
    for (var i = 0; i < mainArray.length; i = i + 2) {
        oddValue.push(mainArray[i]);
    }
    return oddValue;
}

const getEven = mainArray => {
    var evenValue = [];

    for (var i = 1; i < mainArray.length; i = i + 2) {
        evenValue.push(mainArray[i]);
    }
    return evenValue;
}

const getSumArray = mainArray => {
    var sum = 0;
    for (var i = 0; i < mainArray.length; i++) {
        sum = sum + mainArray[i];
    }
    return sum;
}

function evaluateBar(event) {
    event.preventDefault();

    var input = event.target.elements.numbers.value;
    var splitted = input.split("");

    var reply;
    if (splitted.length !== 12) {
        reply = {
            status_code: 307,
            status: "#dc3545",
            message: "Please enter correct digits (13 required)",
            mainResponse: "Incorrect format EAN 13"
        }
    } else {
        var newArray = splitInput(splitted);

        var oddArray = getOdd(newArray);
        var evenArray = getEven(newArray);

        var sumOddArray = getSumArray(oddArray);
        var sumEvenArray = getSumArray(evenArray);

        var lastDigit = (10 - (3 * (sumEvenArray) + sumOddArray) % 10);
        reply = {
            status_code: 202,
            status: "#28a745",
            message: "Succesfully calculated!",
            answer: lastDigit,
            mainResponse: "EAN: " + input + "-" + lastDigit
        }
    }
    var output = document.getElementById('output');
    output.style.backgroundColor = `${reply.status}`;
    output.innerHTML = reply.mainResponse;

    console.log(reply);
}