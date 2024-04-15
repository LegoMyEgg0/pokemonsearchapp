/*global document*/
/*jslint es6*/
const input = document.getElementById("search-input");
const inputBtn = document.getElementById("search-button");
const picture = document.getElementById("picture");
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

const getPokemon = async (pokemon) => {
  //console.log(pokemon);
  try {
    const res = await fetch(pokeApi + "/" + pokemon);
    const whosThatPokemon = await res.json();
    //console.log(whosThatPokemon, "who");
    addInfo(whosThatPokemon);
  } catch (err) {
    console.error(err);
    alert("Pokémon not found");
  }
};

const addInfo = (pokemon) => {
  //console.log(pokemon);
  const { sprites, name, id, weight, height, types, stats } = pokemon;
  //console.log(name, id, weight, height, types, stats);
  // console.log(
  //   "sprites",
  //   sprites,
  //   "hp",
  //   stats[0].base_stat,
  //   "attack",
  //   stats[1].base_stat,
  //   "defense",
  //   stats[2].base_stat,
  //   "special-attack",
  //   stats[3].base_stat,
  //   "special-defense",
  //   stats[4].base_stat,
  //   "speed",
  //   stats[5].base_stat
  // );
  picture.innerHTML = "";
  const image = document.createElement("img");
  image.alt = `Pokémon ${name}`;
  image.src = sprites.front_default;
  image.id = "sprite";
  picture.appendChild(image);
  pokemonName.innerHTML = name.toUpperCase();
  pokemonId.innerHTML = "#" + id;
  pokemonWeight.innerHTML = weight;
  pokemonHeight.innerHTML = height;
  pokemonTypes.innerHTML = "";
  pokemonTypes.innerHTML = types.reduce(
    (acc, val) =>
      acc + `<div class="${val.type.name} type">${val.type.name}</div>`,
    ``
  );
  hp.innerHTML = stats[0].base_stat;
  attack.innerHTML = stats[1].base_stat;
  defense.innerHTML = stats[2].base_stat;
  spAttack.innerHTML = stats[3].base_stat;
  spDefense.innerHTML = stats[4].base_stat;
  speed.innerHTML = stats[5].base_stat;
  input.value = "";
};

const pokemonIdAndNameCheck = () => {
  //console.log("nan?", Number.isNaN(+input.value), typeof input, input.value);
  if (Number.isNaN(+input.value)) {
    //console.log();
    //Note: Pokémon names should be in lowercase
    const lowercasePokemon = input.value.toLowerCase();
    //have special characters removed
    //and be dash separated
    lowercasePokemon.replace(/♀/, "-f");
    lowercasePokemon.replace(/♂/, "-m");
    lowercasePokemon.replaceAll(/\W/g, "-");
    //Also, if the Pokémon has either ♀ or ♂ as part of its name
    //the format is {name-f} or {name-m}, respectively
    //console.log("lowercase", lowercasePokemon);
    getPokemon(lowercasePokemon);
  } else {
    //look for id #
    getPokemon(input.value);
  }
};

inputBtn.addEventListener("click", pokemonIdAndNameCheck);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    pokemonIdAndNameCheck();
  }
});
