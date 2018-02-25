import localforage from "localforage";
import React, { Component } from "react";
import vis from "vis";

import "./index.css";
import SwapiGraphInterface from "./../../lib/SwapiGraphInterface";

class App extends Component {
  constructor() {
    super();

    this.state = {
      nodes: [],
      edges: []
    };
  }

  componentDidMount = () => {
    // localforage.removeItem("swapiData");
    this.getNodes();
  };

  clearCache = () => {
    localforage.removeItem("swapiData");
    this.setState({ nodes: [], edges: [] });
    this.getNodes();
  };

  drawGraph = () => {
    // create an array with nodes
    var nodes = new vis.DataSet(this.state.nodes);

    // create an array with edges
    var edges = new vis.DataSet(this.state.edges);

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
    new vis.Network(container, data, options);
  };

  getNodes = async () => {
    const swapiData = await localforage.getItem("swapiData");
    if (swapiData) {
      this.setState({
        cacheEmpty: false,
        nodes: swapiData.nodes,
        edges: swapiData.edges
      });
    } else {
      this.setState({ cacheEmpty: true });
      const peopleInterface = SwapiGraphInterface(
        "https://swapi.co/api/people/"
      );
      const peopleNodes = await peopleInterface.getCollectionItems();
      const peopleEdges = await peopleInterface.addEdges();

      const filmsInterface = SwapiGraphInterface("https://swapi.co/api/films/");
      const filmsNodes = await filmsInterface.getCollectionItems();
      const filmsEdges = await filmsInterface.addEdges();

      const planetsInterface = SwapiGraphInterface(
        "https://swapi.co/api/planets/"
      );
      const planetsNodes = await planetsInterface.getCollectionItems();
      const planetsEdges = await planetsInterface.addEdges();

      const speciesInterface = SwapiGraphInterface(
        "https://swapi.co/api/species/"
      );
      const speciesNodes = await speciesInterface.getCollectionItems();
      const speciesEdges = await speciesInterface.addEdges();

      const starshipsInterface = SwapiGraphInterface(
        "https://swapi.co/api/starships/"
      );
      const starshipsNodes = await starshipsInterface.getCollectionItems();
      const starshipsEdges = await starshipsInterface.addEdges();

      const vehiclesInterface = SwapiGraphInterface(
        "https://swapi.co/api/vehicles/"
      );
      const vehiclesNodes = await vehiclesInterface.getCollectionItems();
      const vehiclesEdges = await vehiclesInterface.addEdges();

      const newNodes = this.state.nodes.concat(
        peopleNodes,
        filmsNodes,
        planetsNodes,
        speciesNodes,
        starshipsNodes,
        vehiclesNodes
      );

      const newEdges = this.state.edges.concat(
        peopleEdges,
        filmsEdges,
        planetsEdges,
        speciesEdges,
        starshipsEdges,
        vehiclesEdges
      );

      this.setState({
        nodes: newNodes,
        edges: newEdges
      });

      localforage
        .setItem("swapiData", { nodes: newNodes, edges: newEdges })
        .then(() => {
          this.setState({ cacheSuccessful: true });
        })
        .catch(error =>
          this.setState({ cacheSuccessful: false, cachingError: error })
        );
    }

    this.drawGraph();
  };

  render() {
    return this.state.nodes.length > 0 ? (
      <div className="graphContainer">
        <button onClick={() => this.clearCache()}>Clear Cache</button>
        <div id="mynetwork" />
      </div>
    ) : (
      <p>Loading</p>
    );
  }
}

export default App;
