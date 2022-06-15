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


button.addEventListener("click", function () {
    window.open("/portfolio/", "_self");
});


if (window.matchMedia("(max-width: 575.98px)").matches) {
    const a_links = document.body.querySelectorAll('.nav-link');

    for (let i = 0; i < a_links.length; i++) {
        a_links[i].addEventListener("click", function () {
            a_links[i].setAttribute("target", "_blank");
            close();
        });
    }

    const img = document.getElementById("soul-img");
    const gal = document.getElementById("gallery-2");

    if(gal && img){
        img.after(gal);
    }

    // Добавим класс в футер
    const divFooter = document.getElementById("text-2");
    divFooter.classList.add("pt-5");
}
 

