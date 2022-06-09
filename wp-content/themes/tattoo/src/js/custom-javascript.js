const button = document.createElement("button");
button.innerHTML = "Посмотреть всё";
button.setAttribute("class", "btn btn-outline-light rounded-0 d-block mt-4 m-auto");

const elem = document.getElementById("portfolio");
let divv = elem.lastElementChild.tagName;

console.log(divv);
elem.appendChild(button);

button.addEventListener ("click", function() {
    window.open("/portfolio/", "_self");
});


