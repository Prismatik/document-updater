var assert = require('assert');
var documentUpdater = require('../index.js');


describe('document-updater', function() {
  describe('.fetchSchemas', function() {
    it('must do stuff', function(done) {
      console.log('Running tests');
      //define where the schema and migrations live for this document type
      documentUpdater.fetchSchemas('./test/schema', done);
    });
  });
  describe('.updateDocument', function() {
    it('must work', function(done) {
      var doc = {
        version: 1
      }

      documentUpdater.updateDocument(doc, function(err, updated) {
        assert.deepEqual(updated, {version: 2});
        done();
      });
    });
  });
});
