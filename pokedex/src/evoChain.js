import React from "react";
/**
 * Get pokemon evolution object from API
 * @param {string} speciesAPI - url for pokemon species
 * @returns {Promise} when resolved returns pokemon evolution Object
 */
const getEvoData = async (speciesAPI) => {
  const response = await fetch(speciesAPI);
  const data = await response.json();
  const evoChainAPI = data.evolution_chain.url;

  const evoChainResponse = await fetch(evoChainAPI);
  const evoData = await evoChainResponse.json();
  const evoDataChain = evoData.chain;

  return evoDataChain;
};

/**
 * Get evolution chain from evolution JSON
 * @param {Object} evoDataChain - Pokemon evolution object
 * @returns {Array} - Array of pokemon in the evolution chain
 */
const getEvoChain = (evoDataChain) => {
  let evoChain = [evoDataChain.species.name];
  let evolvesTo = evoDataChain.evolves_to;

  while (evolvesTo.length !== 0) {
    evoChain.push(evolvesTo[0].species.name);
    evolvesTo = evolvesTo[0].evolves_to;
  }
  return evoChain;
};

const processEvoData = (speciesAPI) => {
  getEvoData(speciesAPI).then((response) => {
    const evoChain = getEvoChain(response);
    //append evoChainHere
  });
};
