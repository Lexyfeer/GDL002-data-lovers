// declaracion de variables
// variable para guardar el id del sliderInterval y poder detenerlo despues
let sliderInterval;
// elemento del modal para informacion del pokemon
let modal = document.getElementById("info-modal");
// elemento que se usa para mostrar la lista de pokemones
let content = document.getElementById("content");
// indice de la imagen del banner
let imageIndex = 0;
// tipos de pokemon
let typeArray = [
  "Grass",
  "Poison",
  "Fire",
  "Flying",
  "Water",
  "Bug",
  "Normal",
  "Electric",
  "Ground",
  "Fighting",
  "Psychic",
  "Rock",
  "Ice",
  "Ghost",
  "Dragon"
];
//debilidades de pokemon
let weaknessesArray = [
  "Fire",
  "Ice",
  "Flying",
  "Psychic",
  "Water",
  "Ground",
  "Rock",
  "Electric",
  "Grass",
  "Fighting",
  "Poison",
  "Bug",
  "Fairy",
  "Ghost",
  "Dark",
  "Steel",
  "Dragon"
];
// template para las tarjetas de la lista del pokemon
let cardTemplate = `<div class="col-3">
<div class="card " id="{pokemon.number}" >
<img class="pkm-thmb" src="{pokemon.img}" alt="{pokemon.name}">
<div class="name">
 <h3>{pokemon.name}</h3>
</div>
<div class="number">
 <h3>{pokemon.number}</h3>
</div>
<div class="type">
<h3>{pokemon.type}</h3>
</div>
</div>
</div>`;

let pokemonInfoTemplate = `<div>
<div class="card " id="{pokemon.number}" >
<img class="pkm-thmb" src="{pokemon.img}" alt="{pokemon.name}">
<div class="name">
 <h3>{pokemon.name}</h3>
</div>
<div class="number">
 <h3>{pokemon.number}</h3>
</div>
<div class="type">
<h3>{pokemon.type}</h3>
</div>
<div class="weaknesses">
<h3>{pokemon.debilidad}</h3>
</div>
<div class="next_evolution">
<h3>{pokemon.next_evolution.name}</h3>
<h3>{pokemon.next_evolution.num}</h3>
<img class="photoEvol" src="{pokemon.img}" alt="{pokemon.name}">

</div>
</div>
</div>`;

// asignacion de event listeners
// botones para ocultar y mostrar pokedex
document.getElementById("btn1").addEventListener("click", mostrar);
document.getElementById("btn2").addEventListener("click", ocultar);
// botones para ordenar
document.getElementById("orderABC").addEventListener("click", alphabeticalOrder);
document.getElementById("orderNum").addEventListener("click",numericalOrder);
// seleccionar tipo
document.getElementById("select-type").addEventListener("change", event => {
  resetSelect("select-weaknesses");
  displayPokemonCards(dataLovers.getPokemonByTypeFilter(event.target.value));
let averagesShow = document.getElementById("averages");
averagesShow.innerHTML ="El porcentaje del tipo seleccionado es:" + averages(dataLovers.getPokemonByTypeFilter(event.target.value)).toFixed(2)+"%";
document.getElementById("averages").style.display = "block";
});
// seleccionar debilidades
document.getElementById("select-weaknesses").addEventListener("change", event => {
    resetSelect("select-type");
     displayPokemonCards( dataLovers.getPokemonByWeaknessesFilter(event.target.value));
     let averagesShow = document.getElementById("averages");
    averagesShow.innerHTML ="El porcentaje de el tipo de debilidad seleccionado es "  +   averages(dataLovers.getPokemonByWeaknessesFilter(event.target.value)).toFixed(2)+"%";
    document.getElementById("averages").style.display = "block";
  });

// eventos para modal
document.getElementsByClassName("close")[0].addEventListener("click", function() {
  modal.style.display = "none";
  });
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// funciones
function displayPokemonCards(pokemonArray) {
  let listHtml = pokemonArray.map(pokemon => fillCardTemplate(pokemon));
  let htmlString = listHtml.join(" ");
  content.innerHTML = htmlString;
  let modalBody = document.getElementById("info-modal-body");

  Array.from(document.getElementsByClassName("card")).forEach(element => {
    element.addEventListener("click", () => {
      modal.style.display = "block";
      let selectedPokemon = dataLovers.getPokemonByNum(element.id)
      modalBody.innerHTML = pokemonInfoTemplate.replace(
        "{pokemon.img}",selectedPokemon.img).replace("{pokemon.name}", selectedPokemon.name).replace("{pokemon.name}","Nombre: " + selectedPokemon.name).replace("{pokemon.number}", selectedPokemon.num).replace("{pokemon.number}", "Número: " + selectedPokemon.num).replace("{pokemon.type}", "Es un pokemón de tipo: " + selectedPokemon.type).replace("{pokemon.debilidad}", "Su debilidad son los poquemon de tipo: " + selectedPokemon.weaknesses).replace("{pokemon.next_evolution.name}", selectedPokemon.next_evolution.map(nextEvo => nextEvo.name).join(',')).replace("{pokemon.next_evolution.num}", selectedPokemon.next_evolution.map(nextEvoNum => nextEvoNum.num).join(',')).replace("{pokemon.img}", selectedPokemon.next_evolution.img);
    });

     //let selectedPokemon = dataLovers.getAllPokemon()
    // content.innerHTML = pokemonInfoTemplate.replace(
    //   "{pokemon.img}",
    //   selectedPokemon.img)
  });
}

function fillCardTemplate(pokemon) {
  return cardTemplate
    .replace("{pokemon.img}", pokemon.img)
    .replace("{pokemon.name}", pokemon.name)
    .replace("{pokemon.name}", pokemon.name)
    .replace("{pokemon.number}", pokemon.num)
    .replace("{pokemon.number}", pokemon.num)
    .replace("{pokemon.type}", pokemon.type);
}

function alphabeticalOrder() {
  resetBothSelects();
  document.getElementById("averages").style.display = "none";
  let sortedPokemon = dataLovers.getAllPokemon().sort(function(prev, next) {
    if (prev.name > next.name) {
      return 1;
    }
    if (prev.name < next.name) {
      return -1;
    }
    return 0;
  });

  displayPokemonCards(sortedPokemon);
}

function numericalOrder() {
  document.getElementById("averages").style.display = "none";
  resetBothSelects();
  
  let numPokemon = dataLovers.getAllPokemon().sort(function(prev, next) {
    if (prev.num > next.num) {
      return 1;
    }
    if (prev.num < next.num) {
      return -1;
    }
    return 0;
  });
  displayPokemonCards(numPokemon);
}

// muestra pokedex, oculta principal
function mostrar() {
  clearInterval(sliderInterval);
  document.getElementById("pokedex").style.display = "block";
  document.getElementById("ocultar").style.display = "none";
  document.getElementById("averages").style.display = "none";
}
// oculta pokedex, muestra principal
function ocultar() {
  startSliderInterval();
  document.getElementById("pokedex").style.display = "none";
  document.getElementById("ocultar").style.display = "block";
  document.getElementById("averages").style.display = "none";
  resetSelect()
}

// cambia la imagen del banner a la siguiente en el array
function banner() {
  let images = [
    "imagenes pokemon/banner_4.jpg",
    "imagenes pokemon/banner_2.jpg",
    "imagenes pokemon/banner_6.jpg"
  ];

  document.banner.src = images[imageIndex];

  if (imageIndex < images.length - 1) {
    imageIndex++;
  } else {
    imageIndex = 0;
  }
}

// se usa para comenzar el intervalo para cambiar el banner del slider
function startSliderInterval() {
  // espera 5 segundos
  sliderInterval = setInterval(banner, 5000);
}

// llena el select con el id 'selectId' con las opciones de 'optionArray'
function fillSelect(selectId, optionsArray) {
  let selectElement = document.getElementById(selectId);

  optionsArray.forEach(option => {
    let optionElement = document.createElement("option");
    optionElement.text = option;
    selectElement.add(optionElement);
  });
}

function resetSelect(selectId) {
  document.getElementById(selectId).selectedIndex = 0;
}

function resetBothSelects() {
  resetSelect("select-type");
  resetSelect("select-weaknesses");
  
}

function averages(array) {
return ( 100 * array.length)/151
}

//
// Ejecucion al iniciar la pagina.
// instrucciones que se ejecutan cuando cargamos la pagina

// llenar con lista default de pokemon
displayPokemonCards(dataLovers.getAllPokemon());
// llenar el select con los tipos de pokemon
fillSelect("select-type", typeArray);
//llenar el select con los tipos de debilidad de pokemon
fillSelect("select-weaknesses", typeArray);
// empieza el intervalo al cargar el js
startSliderInterval();
// carga el primer banner sin esperar los 5 segundos
banner();
