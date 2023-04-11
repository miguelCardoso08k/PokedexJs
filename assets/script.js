const pokeName = document.querySelector(".pokeName");
const pokeNumber = document.querySelector(".pokeNumber");
const pokeImage = document.querySelector(".pokeImage");

const form = document.querySelector(".formulario");
const pesquisa = document.querySelector(".pesquisa");

const btnBack = document.querySelector(".prev");
const btnNext = document.querySelector(".next");

let idPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const apiResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon.toString().toLowerCase()}`
  );
  if (apiResponse.status === 200) {
    const data = await apiResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokeName.innerHTML = "carregando...";
  pokeNumber.innerHTML = "";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokeName.innerHTML = data.name;
    pokeNumber.innerHTML = data.id;
    pokeImage.src = data["sprites"]["front_default"];
    pokeImage.style.display = "";
    idPokemon = data.id;
  } else {
    pokeName.innerHTML = "Not found :(";
    pokeNumber.innerHTML = "";
    pokeImage.style.display = "none";
  }
  pesquisa.value = "";
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(pesquisa.value);
});

btnBack.addEventListener("click", () => {
  idPokemon -= 1;
  renderPokemon(idPokemon);
});

btnNext.addEventListener("click", () => {
  idPokemon += 1;
  renderPokemon(idPokemon);
});

renderPokemon(idPokemon);
