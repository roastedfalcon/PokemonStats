import "./App.css";
import React, { useState } from "react";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    id: "",
    img: "",
    type: "",
    hp: "",
    attack: "",
    defense: "",
    spAttack: "",
    spDefense: "",
    speed: "",
    height: "",
    weight: "",
  });

  const searchPokemon = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const pokemonData = await response.json();
    console.log(pokemonData);

    const getPokemonType = (typesObj) => {
      let types = [];
      for (let i = 0; i < typesObj.length; i++) {
        types.push(typesObj[i].type.name);
      }
      return types;
    };

    setPokemon({
      name: pokemonName,
      id: pokemonData.id,
      img: pokemonData.sprites.front_default,
      type: getPokemonType(pokemonData.types),
      hp: pokemonData.stats[0].base_stat,
      attack: pokemonData.stats[1].base_stat,
      defense: pokemonData.stats[2].base_stat,
      spAttack: pokemonData.stats[3].base_stat,
      spDefense: pokemonData.stats[4].base_stat,
      speed: pokemonData.stats[5].base_stat,
      height: pokemonData.height / 10, //meters
      weight: pokemonData.weight / 10, //kg
    });

    setPokemonChosen(true);
  };

  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokemon Stats</h1>
        <input
          type="text"
          onChange={(event) => setPokemonName(event.target.value.toLowerCase())}
        />
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className="DisplaySection">
        {!pokemonChosen ? (
          <h1>Search for a Pokemon</h1>
        ) : (
          <>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.img} alt="" />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
