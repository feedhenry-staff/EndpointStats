var accessStats = require("./lib/objectAccess.js");

/**
* @description Method to dynamically change the time window
*/
exports.changeTimeWindow = function(params, cb){
	accessStats.changeWindow(params, function(err){
		if (err) {
			console.log('Change Window Error: ' + err);
		}
	});
}

/**
* @description Process to increment access.
*/
exports.incAccess = function(params, cb){
	accessStats.inc(params, function(err){
		if (err) {
			console.log('Inc Error: ' + err);
		}
	});
}

/**
* @description Process to decrememnt access.
*/
exports.decAccess = function(params, cb){
	accessStats.dec(params, function(err){
		if (err) {
			console.log('Dec Error: ' + err);
		}
	});
}