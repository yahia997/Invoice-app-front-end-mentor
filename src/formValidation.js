// Methods to check form validation
// all methods returns true if it is valid and error message if not


// For Email Input
function emailValid() {
    let element = document.getElementById("client-email");
    const pattern = /\w+@{1}[a-z]+\.[a-z]+/gi;
    element.classList.remove("notValidMessage");

    if(pattern.test(element.value)) {
        return true;
    }else {
        element.classList.add("notValidMessage");
        return false;
    }
}

// Loop throgh all inputs
function valid() {
    // get all inputs
    let inputs = document.querySelectorAll("input");
    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].value === "") {
            return false;
        }
    }
    return true;
}

export {valid, emailValid};