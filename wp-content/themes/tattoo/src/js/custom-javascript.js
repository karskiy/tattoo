// 1. Create the button
const button = document.createElement("button");
button.innerHTML = "Посмотреть всё";

// 2. Append somewhere
const elem = document.getElementById("portfolio");
let divv = elem.lastElementChild.tagName;

console.log(divv);
elem.appendChild(button);

// 3. Add event handler
button.addEventListener ("click", function() {
    alert("did something");
});


