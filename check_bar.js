function checkBar(event) {
    event.preventDefault();

    var input = event.target.elements.numbers.value;
    var splitted = input.split("");

    var reply;
    if (splitted.length !== 13) {
        console.log("NO 13 digits available!");
        reply = {
            status_code: 307,
            status: "#dc3545",
            message: "Please enter correct digits (13 required)",
            mainResponse: "Incorrect format EAN 13"
        }
    } else {
        var newArray = [];
        var oddArray = [];
        var evenArray = [];
        //  To transform the array in int, loop all the array.
        for (var i = 0; i < splitted.length; i++) {
            //  Push the int covited array in new array
            newArray.push(parseInt(splitted[i]));
        }
        //  Remove the last element
        var lastCode = parseInt(newArray.splice(-1));
        console.log(newArray);

        var oddArray = [];
        var evenArray = [];
        for (var i = 0; i < newArray.length; i = i + 2) {
            oddArray.push(newArray[i]);
        }
        for (var i = 1; i < newArray.length; i = i + 2) {
            evenArray.push(newArray[i]);
        }
        console.log(oddArray);
        console.log(evenArray);

        var sumOddArray = 0;
        var sumEvenArray = 0;
        for (var i = 0; i < oddArray.length; i++) {
            sumOddArray = sumOddArray + oddArray[i];
        }
        for (var i = 0; i < evenArray.length; i++) {
            sumEvenArray = sumEvenArray + evenArray[i];
        }
        console.log(sumOddArray);
        console.log(sumEvenArray);

        var lastDigit = (10 - (3 * (sumEvenArray) + sumOddArray) % 10);
        console.log(lastDigit);

        var countryCode = (newArray.slice(0,2)).join("");
        console.log("Country Code: " + countryCode);
        var producerCode = (newArray.slice(2, 7)).join("");
        console.log("Producer Code: " + producerCode);
        var productCode = (newArray.slice(7, 12)).join("");
        console.log("Procuct Code: " + productCode);

        if (lastCode === lastDigit) {
            reply = {
                status_code: 202,
                status: "#28a745",
                message: "Succesfully calculated!",
                answer: lastDigit,
                mainResponse: "Original Code: " + input,
                country_code: countryCode,
                producer_code: producerCode,
                product_code: productCode,
                verfication_code: lastCode
            }
        } else {
            reply = {
                status_code: 302,
                status: "#dc3545",
                message: "Succesfully calculated!",
                answer: lastDigit,
                mainResponse: "Dublicate Code, not matched!",
                country_code: "Not real!",
                producer_code: "Not real!",
                product_code: "Not real!",
                verfication_code: "Not real!"
            }
        }
    }
    var output = document.getElementById('output');
    output.style.backgroundColor = `${reply.status}`;
    output.innerHTML = `
        <h4>${reply.mainResponse}</h4>
        <p class="mb-1">Country Code: <span class="bolder">${reply.country_code}</span></p>
        <p class="mb-1">Producer Code: <span class="bolder">${reply.producer_code}</span></p>
        <p class="mb-1">Product Code: <span class="bolder">${reply.product_code}</span></p>
        <p class="mb-1">Verfication Code: <span class="bolder">${reply.verfication_code}</span></p>
    `;

    console.log(reply);
}