const $ = document.querySelector.bind(document);
const button = $("#button");
button.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("ola");
});
