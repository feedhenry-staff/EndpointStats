var accessStats = require("./lib/objectAccess.js");

/**
 * @description Method to dynamically change the time window
 */
exports.changeTimeWindow = function(interval, cb) {
	if (typeof interval !== 'undefined') {
		accessStats.changeWindow(interval, function(err) {
			if (err) {
				console.log('Change Window Error: ' + err);
			} else {
				return cb(null, 'ok');
			}
		});
	} else {
		return cb('Please provide integer interval.', null);
	}
}

/**
 * @description Process to increment access.
 */
exports.incAccess = function(entityName, cb) {
	if (typeof entityName !== 'undefined') {
		accessStats.inc(entityName, function(err) {
			if (err) {
				console.log('Inc Error: ' + err);
			}
		});
	} else {
		return cb('Please provide entity name to increment.', null);
	}
}

/**
 * @description Process to decrememnt access.
 */
exports.decAccess = function(entityName, cb) {
	if (typeof entityName !== 'undefined') {
		accessStats.dec(entityName, function(err) {
			if (err) {
				console.log('Dec Error: ' + err);
			}
		});
	} else {
		return cb('Please provide entity name to decrement.', null);
	}
}