// esta es una función de ejemplo
// puedes ver como agregamos la función a nuestro objeto global window

const example = () => {
  return "example";
};

window.example = example;

window.dataLovers = {
  getAllPokemon: () => {
    return pokemonDb.array;
  },
  getPokemonByNum: num => {
    return pokemonDb.array.find(p => p.num === num);
  },
  getPokemonByTypeFilter: type => {
    return pokemonDb.array.filter(p => p.type.indexOf(type) > -1);
  },
  getPokemonByWeaknessesFilter: weaknesses => {
    return pokemonDb.array.filter(p => p.weaknesses.indexOf(weaknesses) > -1);
  }
};
