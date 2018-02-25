// @flow

/**
 * Interface for adding SWAPI collections to a graph.
 */
export default (url: string, data: ?{}) => {
  const swapiBaseUrl = "https://swapi.co/api/";

  let nodes: Array<Object> = [];
  let edges: Array<{ from: string, to: string }> = [];
  let knownSwapiCollections: Array<String> = [];
  /**
   * Queries the SWAPI for it's known collection like people, films, etc
   * and adds it the object prop 'knownSwapiCollections'
   */
  const getKnownCollection = async () => {
    const resp = await fetch(swapiBaseUrl);
    const collectionUrls = await resp.json();
    knownSwapiCollections = Object.keys(collectionUrls).map(key => key);
    return knownSwapiCollections;
  };

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

    getKnownCollection: async () => await getKnownCollection(),

    addEdges: async () => {
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
    }
  };
};
