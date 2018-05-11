import { Tabs } from "antd";
import localforage from "localforage";
import React, { Component } from "react";
import vis from "vis";
import differenceby from "lodash.differenceby";
import "./index.css";
import FiltersTab from "./containers/FiltersTab";
import SwapiGraphInterface from "./../../lib/SwapiGraphInterface";

const TabPane = Tabs.TabPane;

class Graph extends Component {
  constructor() {
    super();

    this.state = {
      cacheEmpty: false,
      collections: {},
      knownCollections: [],
      nodes: [],
      edges: []
    };
  }

  componentDidMount = () => {
    this.getKnownCollections();
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.nodes !== prevState.nodes) {
      this.drawGraph();
    }
  }

  clearCache = () => {
    localforage.removeItem("swapiData");

    this.state.knownCollections.forEach(collectionName => {
      localforage.removeItem(collectionName);
    });
  };

  clearGraph = () => {
    this.setState({ nodes: [], edges: [] });
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

  getCollectionInfo = async (collectionName: string) => {
    let collectionNodes = await localforage.getItem(collectionName);
    if (!collectionNodes) {
      const collectionInterface = SwapiGraphInterface();
      collectionNodes = await collectionInterface.getCollectionItems(
        collectionName
      );
      localforage.setItem(collectionName, collectionNodes);
    }

    this.setState(prevState => ({
      collections: {
        ...prevState.collections,
        [collectionName]: collectionNodes
      }
    }));
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

  getKnownCollections = async () => {
    const knownCollections = await SwapiGraphInterface().getKnownCollection();
    this.setState({ knownCollections });
  };

  removeNodes = async node => {
    this.setState({
      nodes: differenceby(this.state.nodes, [node], "url")
    });
  };

  setNodes = async node => {
    const newEdges = await SwapiGraphInterface().getNodesEdges(node);

    this.setState({
      nodes: this.state.nodes.concat(node),
      edges: this.state.edges.concat(newEdges)
    });
  };

  render() {
    return (
      <div>
        <h1>Graph</h1>
        <Tabs>
          <TabPane tab="Filters" key="filters">
            <FiltersTab
              knownCollections={this.state.knownCollections}
              collections={this.state.collections}
              getCollectionInfo={this.getCollectionInfo}
              setNodes={this.setNodes}
              removeNodes={this.removeNodes}
            />
          </TabPane>
          <TabPane tab="Results" key="graph" forceRender>
            <div className="graphContainer">
              {this.state.nodes.length > 0 ? (
                <div id="mynetwork" />
              ) : (
                <p>I find you lack of filters disturbing</p>
              )}
            </div>
          </TabPane>
          <TabPane tab="Help" key="help" forceRender>
            <h2>Creating a Graph</h2>
            <p>
              You can add different nodes to the graph by turning on different
              toggles in the <em>Filters</em> tab. Once you turn these on, a
              graph will be made on the <em>Graph</em> tab.{" "}
            </p>
            <h2>Viewing the Graph</h2>
            <p>
              You can view your generated graph by clicking on the{" "}
              <em>Graph</em> tab. You must have toggled something for the graph
              to have generated.
            </p>
            <p>
              If you want to zoom in on a certain part of a graph, you can
              scroll or pinch closer into the graph. You can also drag nodes
              around to group things together as needed.{" "}
            </p>
          </TabPane>
        </Tabs>
        {/* <Button onClick={() => this.clearCache()}>Clear Cache</Button>{" "}
        <Button onClick={() => this.clearGraph()}>Reset Graph</Button>{" "} 
        <a href="#helpCache">?</a>
        <h2 id="helpCache">What is clearing cache?</h2>
        <p>
          The graph pulls a lot of data to generate the graph. To help with load
          times and network usage, we cache the results of the pull. If you want
          to pull the latest version of the SWAPI, you can clear the cache and
          the the app will pull down the necessary data and re cache it.
        </p>*/}
      </div>
    );
  }
}

export default Graph;
