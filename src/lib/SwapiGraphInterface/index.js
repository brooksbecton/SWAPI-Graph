// @flow

/**
 * Interface for adding SWAPI collections to a graph.
 */
export default (url: string = "https://swapi.dev/api/", data: ?{}) => {
  const swapiBaseUrl = "https://swapi.dev/api/";

  let nodes: Array<Object> = [];
  let edges: Array<{ from: string, to: string }> = [];
  let knownSwapiCollections: Array<String> = [];

  /**
   * Gets all items from a SWAPI collection and
   * adds it to 'nodes' property
   */
  const addEdges = async () => {
    if (knownSwapiCollections.length === 0) {
      knownSwapiCollections = await getKnownCollection();
    }

    nodes.forEach(node => {
      knownSwapiCollections.forEach(collectionName => {
        if (node.hasOwnProperty(collectionName)) {
          node[collectionName].forEach(url => {
            edges = edges.concat({ from: node.url, to: url });
          });
        }
      });
    });
    return edges;
  };

  /**
   * 
   */
  const getCollectionItems = async (collectionName: string) => {
    let targetUrl: string;
    if (collectionName) {
      targetUrl = swapiBaseUrl + collectionName;
    } else {
      targetUrl = url;
    }
    while (targetUrl !== null) {
      const resp = await fetch(targetUrl);
      const { next, results } = await resp.json();
      // Assigning name so that graph can display something
      results.forEach(item => (item.label = item.name || item.title));

      // Grouping nodes by their collection
      results.forEach(item => {
        item.id = item.url;
        item.group = item.url.slice(7, item.url.length).split("/")[3];
      });

      // Targeting next page of results
      targetUrl = next;

      // Saving current results
      nodes = nodes.concat(results);
    }
    return nodes;
  };

  const getEdges = () => edges; 
  
  const getNodes = () => nodes; 

  /**
   * Queries the SWAPI for it's known collection like people, films, etc
   * and adds it the object prop 'knownSwapiCollections'
   * 
   * @async
   */
  const getKnownCollection = async (): {collectionName: string, collectionUrl: string} => {
    const resp = await fetch(swapiBaseUrl);
    const collectionUrls = await resp.json();
    knownSwapiCollections = Object.keys(collectionUrls).map(key => key);
    return knownSwapiCollections;
  };

  const getNodesEdges = async (node: {
    url: string,
    [collectionName: String]: Array<string>
  }) => {
    if (knownSwapiCollections.length === 0) {
      knownSwapiCollections = await getKnownCollection();
    }

    let edges: Array<{ from: string, to: string }> = [];
    knownSwapiCollections.forEach(collectionName => {
      if (node.hasOwnProperty(collectionName)) {
        node[collectionName].forEach(url => {
          edges = edges.concat({ from: node.url, to: url });
        });
      }
    });
    return edges;
  };

  return {
    addEdges,
    edges: getEdges(),
    nodes: getNodes(),
    getCollectionItems,
    getKnownCollection,
    getNodesEdges
  };
};
