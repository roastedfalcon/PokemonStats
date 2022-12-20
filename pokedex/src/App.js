import "./App.css";
import React, { useState } from "react";
import EvoTreeComponent from "./components/evoTree";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    id: "",
    img: "",
    type: [],
    hp: "",
    attack: "",
    defense: "",
    spAttack: "",
    spDefense: "",
    speed: "",
    height: "",
    weight: "",
    speciesAPI: "",
  });

  const searchPokemon = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      const pokemonData = await response.json();

      setPokemon({
        name: pokemonName,
        id: pokemonData.id,
        img: pokemonData.sprites.front_default,
        type: pokemonData.types.map((typeValue) => typeValue.type.name), //array
        hp: pokemonData.stats[0].base_stat,
        attack: pokemonData.stats[1].base_stat,
        defense: pokemonData.stats[2].base_stat,
        spAttack: pokemonData.stats[3].base_stat,
        spDefense: pokemonData.stats[4].base_stat,
        speed: pokemonData.stats[5].base_stat,
        height: pokemonData.height / 10, //meters
        weight: pokemonData.weight / 10, //kg
        speciesAPI: pokemonData.species.url,
      });

      setPokemonChosen(true);
    } catch {
      setPokemonChosen(false);
    }
  };

  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokedex</h1>
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
            <h1>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h1>
            <h3>Pokedex ID: {pokemon.id}</h3>
            <img src={pokemon.img} alt="" />
            <div className="container">
              <div className="stats">
                <div>HP: {pokemon.hp}</div>
                <div>Attack: {pokemon.attack}</div>
                <div>Defense: {pokemon.defense}</div>
                <div>Sp. Attack: {pokemon.spAttack}</div>
                <div>Sp. Defense: {pokemon.spDefense}</div>
                <div>Speed: {pokemon.speed}</div>
              </div>
              <div>Type: {pokemon.type.toString().split(",").join(" ")}</div>
              <div>Height: {pokemon.height} m</div>
              <div>Weight: {pokemon.weight} kg</div>
            </div>
            <EvoTreeComponent speciesAPI={pokemon.speciesAPI} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
