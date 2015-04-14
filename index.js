var fs = require('fs');
var async = require('async');
var safeParse = require('safe-json-parse/callback');
//publish document-migrator to npm

var documentUpdater = {
  schemas: {},
  currentVersion: 1,

  init: function(schemaPath, migrationPath, cb) {
    this.getSchemas(schemaPath, cb);
  },

  //fetch the schemas from the files in the specified schema directory
  //populate the schemas dictionary AND update the currentVersion (most recent schema version)
  getSchemas: function(schemaPath, cb) {
    var self = this;

    //loop through all the schemas in the specified folder and populate the scheams object
    fs.readdir(schemaPath, function(err, result) {
      var schemaFiles = result;

      async.each(schemaFiles, function(filename, callback) {

        fs.readFile(schemaPath + "/" + filename, 'utf-8', function (err, schema) {
          if (err) return callback(err);

          safeParse(schema, function(err, parsedSchema) {
            if (err) return callback(err);

            //save the json schema (not parsed) against the version number
            self.schemas[parsedSchema.version] = schema;

            var versionInt = parseInt(parsedSchema.version);
            if (versionInt > self.currentVersion) self.currentVersion = parsedSchema.version;
            return callback();
          });
        });
      }, function(err, result) {
        console.log('schemas',self.schemas);
        console.log('currentVersion',self.currentVersion);
        console.log('current schema',self.schemas['2']);
        cb();
      });

    });
  }

  //updateDocument: function(do) {
  
  //}
}

module.exports = documentUpdater;
