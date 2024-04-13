/*global document*/
/*jslint es6*/
const input = document.getElementById("search-input");
const inputBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonTypes = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const spAttack = document.getElementById("special-attack");
const spDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const pokeApi = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const getPokemon = async () => {
  console.log(input.value);
  try {
    const res = await fetch(pokeApi + "/" + input.value);
    const whosThatPokemon = await res.json();
    //console.log(whosThatPokemon, "who");
    addInfo(whosThatPokemon);
  } catch (err) {
    console.error(err);
  }
};

const addInfo = (pokemon) => {
  //console.log(pokemon);
  const { sprites, name, id, weight, height, types, stats } = pokemon;
  console.log(name, id, weight, height, types, stats);
  console.log(
    "sprites",
    sprites,
    "hp",
    stats[0].base_stat,
    "attack",
    stats[1].base_stat,
    "defense",
    stats[2].base_stat,
    "special-attack",
    stats[3].base_stat,
    "special-defense",
    stats[4].base_stat,
    "speed",
    stats[5].base_stat
  );
  pokemonName.innerHTML = "name " + name;
  pokemonId.innerHTML = "id " + id;
  pokemonWeight.innerHTML = "weight " + weight;
  pokemonHeight.innerHTML = "height " + height;
  pokemonTypes.innerHTML =
    "types " + types.reduce((acc, val) => acc + " " + val.type.name, "");
  hp.innerHTML = "hp " + stats[0].base_stat;
  attack.innerHTML = "attack " + stats[1].base_stat;
  defense.innerHTML = "defense " + stats[2].base_stat;
  spAttack.innerHTML = "sp attack " + stats[3].base_stat;
  spDefense.innerHTML = "sp defense " + stats[4].base_stat;
  speed.innerHTML = "speed " + stats[5].base_stat;
};

inputBtn.addEventListener("click", getPokemon);
