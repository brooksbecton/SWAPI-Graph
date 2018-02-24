// @flow

/**
 * Interface for adding SWAPI collections to a graph.
 */
export default (url: string) => {
  const swapiBaseUrl = "https://swapi.co/api/";

  let nodes: Array<Object> = [];
  let edges: Array<{ from: string, to: string }> = [];
  let knownSwapiCollections: Array<String> = [];

  return {
    /**
     * Gets all items from a SWAPI collection and
     * adds it to 'nodes' property
     */
    getCollectionItems: async () => {
      let targetUrl: string = url;
      while (targetUrl !== null) {
        const resp = await fetch(targetUrl);
        const { next, results } = await resp.json();
        results;
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
    },

    /**
     * Queries the SWAPI for it's known collection like people, films, etc
     * and adds it the object prop 'knownSwapiCollections'
     */
    getKnownCollection: async () => {
      const resp = await fetch(swapiBaseUrl);
      const collectionUrls = await resp.json();
      knownSwapiCollections = Object.keys(collectionUrls).map(key => key);
    },

    addEdges: async () => {
      nodes.forEach(node => {
        ["people", "vehicles", "films"].forEach(collectionName => {
          if (node.hasOwnProperty(collectionName)) {
            node[collectionName].forEach(url => {
              console.log({ from: node.url, to: url });
              edges = edges.concat({ from: node.url, to: url });
            });
          }
        });
      });
      return edges;
    }
  };
};
