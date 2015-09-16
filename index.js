var accessStats = require("./lib/objectAccess.js");
var validate = require('jsonschema').validate;

/**
 * @description Method to dynamically change the time window
 */
exports.changeTimeWindow = function(interval, cb) {
	var dataCheck = validate(interval, {"type":"number"});

	if (typeof interval === 'undefined') {
		return cb('Error: interval undefined, please provide.');
	}

	if (dataCheck['errors'].length == 0) {
		accessStats.changeWindow(interval, function(err) {
			if (err) {
				console.log('Change Window Error: ' + err);
			} else {
				return cb(null, 'ok');
			}
		});
	}else{
		return cb('Error: ' + interval + ' ' + dataCheck['errors'][0]['message']);
	}
}

/**
 * @description Process to increment access.
 */
exports.incAccess = function(entityName, cb) {
	var dataCheck = validate(entityName, {"type":"string"});
	
	if (typeof entityName === 'undefined') {
		return cb('Error: incAccess[entityName] undefined, please provide.');
	}

	if (dataCheck['errors'].length == 0) {
		accessStats.inc(entityName, function(err) {
			if (err) {
				console.log('Inc Error: ' + err);
			}
		});
	} else {
		return cb('Error: incAccess[entityName] ' + entityName + ' ' + dataCheck['errors'][0]['message']);
	}
}

/**
 * @description Process to decrememnt access.
 */
exports.decAccess = function(entityName, cb) {
	var dataCheck = validate(entityName, {"type":"string"});
	
	if (typeof entityName === 'undefined') {
		return cb('Error: decAccess[entityName] undefined, please provide.');
	}

	if (dataCheck['errors'].length == 0) {
		accessStats.inc(entityName, function(err) {
			if (err) {
				console.log('Inc Error: ' + err);
			}
		});
	}else{
		return cb('Error: decAccess[entityName] ' + entityName + ' ' + dataCheck['errors'][0]['message']);
	}
}