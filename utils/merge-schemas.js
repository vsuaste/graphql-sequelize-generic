
var { fileLoader, mergeTypes } = require('merge-graphql-schemas');

module.exports = function( schemas_folder ) {
  const typesArray = fileLoader( schemas_folder);
  let merged = mergeTypes(typesArray);
  console.log("From merging...\n", merged);
  return merged;
}
