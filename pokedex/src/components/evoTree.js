import "./evoTree.css";
import React, { useEffect, useState } from "react";

/**
 * Get pokemon evolution object from API - Async
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
 * Make evolution tree Array from evolution JSON
 * @param {Object} evoDataChain - Pokemon evolution object
 * @returns {Array} - Array of pokemon child-parents pairs in the evolution chain
 */
const makeEvoTree = (evoDataChain, evoTree = [], treeLevel = 0) => {
  let currentPokemon = evoDataChain.species.name;
  evoTree.push([currentPokemon, treeLevel]);

  let evolvesTo = evoDataChain.evolves_to;
  if (evolvesTo.length !== 0) {
    treeLevel++;
    for (let i = 0; i < evolvesTo.length; i++) {
      makeEvoTree(evolvesTo[i], evoTree, treeLevel);
    }
  }
  treeLevel--;
};

/**
 * React component to display evolution tree
 * @component
 */
function EvoTreeComponent({ speciesAPI }) {
  const [evoTree, setEvoTree] = useState([]);
  const [makeTree, setMakeTree] = useState(false);

  useEffect(() => {
    getEvoData(speciesAPI).then((response) => {
      let evoTreeResponse = [];
      makeEvoTree(response, evoTreeResponse);
      setEvoTree(evoTreeResponse);
      setMakeTree(true);
    });
  }, [speciesAPI]);

  /**
   * Generate JSX for evolution tree
   * @param {Array} evoTree - Array of pokemon/treeLevel pairs
   * @returns {JSX} - divs to display evolution tree
   */
  const displayTree = (evoTree) => {
    let numLevels = 1;
    let evolutionLevelDivs = [];

    for (let i = 0; i < evoTree.length; i++) {
      if (evoTree[i][1] >= numLevels) {
        numLevels = evoTree[i][1] + 1;
      }
    }

    for (let i = 0; i < numLevels; i++) {
      let insideEvolutionLevelDiv = [];

      for (let j = 0; j < evoTree.length; j++) {
        if (evoTree[j][1] === i) {
          insideEvolutionLevelDiv.push(
            <div className="withinEvoLevel">{evoTree[j][0]}</div>
          );
        }
      }

      evolutionLevelDivs.push(<div>{insideEvolutionLevelDiv}</div>);
    }

    return evolutionLevelDivs;
  };

  return (
    <>
      <h5>Evolution Tree</h5>
      <div className="treeContainer">
        {!makeTree ? null : displayTree(evoTree)}
      </div>
    </>
  );
}

export default EvoTreeComponent;
