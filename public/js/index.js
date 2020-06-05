//variáveis que recebem os elementos do HTML
const buttonSearch = document.querySelector('#page-home main a');
const modal = document.querySelector("#modal")
const closeSearch = document.querySelector("#modal .header a");

//mostrar o camppo de pesquisa de pontos de coleta
buttonSearch.addEventListener("click", () => {
  modal.classList.remove("hide");
})

//ocultar o campo de pesquisa
closeSearch.addEventListener("click", () => {
  modal.classList.add("hide");
})