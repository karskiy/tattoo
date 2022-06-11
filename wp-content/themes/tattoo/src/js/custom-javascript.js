const button = document.createElement("button");
button.innerHTML = "Посмотреть всё";
button.setAttribute("class", "btn btn-outline-light rounded-0 d-block mt-4 m-auto");

const port = document.getElementById("portfolio");
const div_p = document.getElementById("div_2");

if (window.matchMedia("(max-width: 575.98px)").matches) {
    port.appendChild(button);
} else {
    div_p.appendChild(button);
}


button.addEventListener ("click", function() {
    window.open("/portfolio/", "_self");
});




