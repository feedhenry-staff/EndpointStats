var async = require('async');
var noop = function() {};
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var _ = require('underscore');
var dbConn;
var url;
var statsCollection = 'ENDPOINT_STATS'; // TODO: make configurable

// URL must be in the format mongodb://user:pass@host:port/dbname
if (typeof $conf !== 'undefined') {
  url = $conf.endpoints.mongo_url;
}else{
  url = 'mongodb://localhost:27017/FH_LOCAL';
}

var dbUrl = url;

//setup direct mongo db connection
var connectDB = function connectDB(cb) {
  if (_.isUndefined(dbConn)) {
    MongoClient.connect(dbUrl, function(err, db) {
      if (err) {
        dbConn = undefined;
        return cb('connection error' + err);
      }
      dbConn = db;
      return cb(null, dbConn);
    });
  } else {
    return cb(null, dbConn);
  }
}
exports.connectDB = connectDB;
connectDB(noop);

function disconnectDB(cb) {
  if (!_.isUndefined(dbConn)) {
    dbConn.close();
    dbConn = undefined;
  }
  cb();
}

var addData = exports.addData = function(collectionName, data, cb) {
  connectDB(function(err, conn) {
    if (err) return cb(err);

    var collection = conn.collection(collectionName);
    collection.insert(data, function(err, result) {
      if (err) {
        return cb('Issues adding data : ' + err)
      }

      // create FH structured output
      var output = {
        fields: result.ops[0],
        guid: result.ops[0]._id,
        type: collectionName
      };
      return cb(null, output);
    });
  });
}

var test = exports.test = function(obj){
  var date = new Date();

  for (var key in obj) {
    // Construct object
    mongoObj = {
      "date" : date, 
      "key" : key,
      "count" : obj[key]
    };

    // Send to database
    addData(statsCollection, mongoObj, function(err, res){
      if (err) {
        console.log(err);
      }
    });
  }
}


