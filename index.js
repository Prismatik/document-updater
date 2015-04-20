var fs = require('fs');
var async = require('async');
var safeParse = require('safe-json-parse/callback');
//publish document-migrator to npm

var documentUpdater = {
  //to store schemas for each version of the document, property = version number (as string), value = the json schema itself (not parsed)
  schemas: {},

  init: function(schemaPath, migrationPath, cb) {
    this.fetchSchemas(schemaPath, cb);
  },

  //fetch the schemas from the files in the specified schema directory
  //populate the schemas dictionary AND update the currentVersion (most recent schema version)
  fetchSchemas: function(schemaPath, cb) {
    var self = this;

    //loop through all the schemas in the specified folder and populate the scheams object
    fs.readdir(schemaPath, function(err, result) {
      var schemaFiles = result;

      async.each(schemaFiles, function(filename, callback) {

        fs.readFile(schemaPath + "/" + filename, 'utf-8', function (err, schema) {
          if (err) return callback(err);

          console.log('filename', filename);
          var versionRegex = /-v([0-9])*\./
          var version = versionRegex.exec(filename);

          if (version && version[1]) {
            var verNo = version[1]
            console.log('version #', verNo);
            //version = parseInt(version);
            self.schemas[version[1]] = schema;
            callback(null, schema);
          } else {
            var err = new Error("Invalid schema doc filename, must be in the format name-vX.json, where X = the schema version");
            callback(err);
          }
        });
      }, function(err, result) {
        console.log('schemas',self.schemas);
        //console.log('currentVersion',self.currentVersion);
        //console.log('current schema',self.schemas['2']);
        cb();
      });

    });
  },

  getLatestVersion: function() {
    var self = this;
    var versions = Object.keys(self.schemas);
    versions = versions.map(function(version) { return parseInt(version); })
    console.log('test',versions)
    return Math.max(versions);
  },

  updateDocument: function(doc, cb) {
    var self = this;
    var latest = self.getLatestVersion();
    console.log('latest',latest);
    if (doc.version < self.currentVersion) {
      console.log('update needed!');
    }
    cb(null, doc);
    //first get document version
    //compare this version to the current version
    //if the document version is lesser, apply each required update
  }
}

module.exports = documentUpdater;
