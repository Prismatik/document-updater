var documentUpdater = require('../index.js');


describe('document-updater', function() {
  it('.getSchemas', function(done) {
    console.log('Running tests');
    //define where the schema and migrations live for this document type
    documentUpdater.init('./test/schema', './test/migrations', done);
  });
});
