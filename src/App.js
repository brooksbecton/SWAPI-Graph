import React, { Component } from "react";
import vis from "vis";

import SwapiGraphInterface from "./lib/SwapiGraphInterface";

class App extends Component {
  constructor() {
    super();

    this.state = {
      nodes: []
    };
  }

  componentDidMount = async () => {
    this.getNodes();
  };

  drawGraph = () => {
    // create an array with nodes
    var nodes = new vis.DataSet(this.state.nodes);

    // create an array with edges
    var edges = new vis.DataSet([]);

    // create a network
    var container = document.getElementById("mynetwork");

    // provide the data in the vis format
    var data = {
      nodes: nodes,
      edges: edges
    };
    var options = {
      physics: {
        enabled: false
      }
    };

    // initialize your network!
    var network = new vis.Network(container, data, options);
  };

  getNodes = async () => {
    //TODO hit the root API https://swapi.co/api and get what collections they have for less work later.
    const peopleInterface = SwapiGraphInterface("https://swapi.co/api/people/");
    const peopleNodes = await peopleInterface.getCollectionItems();

    const filmsInterface = SwapiGraphInterface("https://swapi.co/api/films/");
    const filmsNodes = await filmsInterface.getCollectionItems();

    const planetsInterface = SwapiGraphInterface(
      "https://swapi.co/api/planets/"
    );
    const planetsNodes = await planetsInterface.getCollectionItems();

    const speciesInterface = SwapiGraphInterface(
      "https://swapi.co/api/species/"
    );
    const speciesNodes = await speciesInterface.getCollectionItems();

    const starshipsInterface = SwapiGraphInterface(
      "https://swapi.co/api/starships/"
    );
    const starshipsNodes = await starshipsInterface.getCollectionItems();

    const vehiclesInterface = SwapiGraphInterface(
      "https://swapi.co/api/vehicles/"
    );
    const vehiclesNodes = await vehiclesInterface.getCollectionItems();

    this.setState({
      nodes: this.state.nodes.concat(
        peopleNodes,
        filmsNodes,
        planetsNodes,
        speciesNodes,
        starshipsNodes,
        vehiclesNodes
      )
    });

    this.drawGraph();
  };

  render() {
    return <div id="mynetwork" />;
  }
}

export default App;
