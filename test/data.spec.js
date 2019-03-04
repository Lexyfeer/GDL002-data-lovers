require("../src/data/pokemon/pokemon.js");
require("../src/data.js");

// describe('example', () => {
//   it('is a function', () => {
//     expect(typeof example).toBe('function');
//   });

//   it('returns `example`', () => {
//     expect(example()).toBe('example');
//   });
// });

describe("getAllPokemon", () => {
  it("is a function", () => {
    expect(typeof dataLovers.getAllPokemon).toBe("function");
  });

  it("returns an object", () => {
    expect(typeof dataLovers.getAllPokemon()).toBe("object");
  });

  it("returns 151 elements", () => {
    expect(dataLovers.getAllPokemon().length).toBe(151);
  });
});

describe("getPokemonByTypeFilter", () => {
  it("is a function", () => {
    expect(typeof dataLovers.getPokemonByTypeFilter).toBe("function");
  });
  it("returns an object", () => {
    expect(typeof dataLovers.getPokemonByTypeFilter("Normal")).toBe("object");
  });
  it("returns 24 pokemon", () => {
    expect(dataLovers.getPokemonByTypeFilter("Normal").length).toBe(24);
  });
});

describe("getPokemonByWeaknessesFilter", () => {
  it("is a function", () => {
    expect(typeof dataLovers.getPokemonByWeaknessesFilter).toBe("function");
  });
  it("returns an object", () => {
    expect(typeof dataLovers.getPokemonByWeaknessesFilter("Grass")).toBe(
      "object"
    );
  });
  it("returns ", () => {
    expect(typeof dataLovers.getPokemonByWeaknessesFilter("Grass")).toBe(
      "object"
    );
  });
});

describe("getPokemonByNum", () => {
  it("is a function", () => {
    expect(typeof dataLovers.getPokemonByNum).toBe("function");
  });
  it("returns an object", () => {
    expect(typeof dataLovers.getPokemonByNum("001")).toBe("object");
  });
  it("returns a pokemon ", () => {
    expect(dataLovers.getPokemonByNum("001").name).toBe("Bulbasaur");
  });
});
