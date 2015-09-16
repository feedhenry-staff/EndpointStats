var mongo = require('./mongoConnector');
var stats = {};
var snapInterval; // Default
var snapIntervalTimer;

function init() {
	snapInterval = 10;
	startTimer();
}

init();

var changeWindow = function(interval, cb) {
	// // Restart the timer
	// if (interval >= 1) {
	// 	// Stop the timer
	// 	clearInterval(snapIntervalTimer);
	// 	// Set the new interval
	// 	snapInterval = interval;
	// 	// Restart the timer
	// 	startTimer();
	// } else {
	// 	cb('Please ensure interval is >= 1 second.', null);
	// }
	cb('*** TODO: Validate Functionality ***', null);
}

var increment = function(entityName, cb) {
	if (entityName !== undefined) {
		// Check to see if it exists or not
		if (measurableItemExists(stats, entityName)) {
			// Update existing 
			stats[entityName]++;
		} else {
			stats[entityName] = 1;
		}
	} else {
		return cb('Endpoint to increment does not exist, please provide.');
	}
	//debugPrint();
}

var decrement = function(entityName, cb) {
	if (entityName !== undefined) {
		stats[entityName]--;
	} else {
		return cb('Endpoint to decrement does not exist, please provide.');
	}
	//debugPrint();
}

/************ HELPER METHODS *************/
var purgeObject = function(params, cb) {
	stats = {};
}

function snapToDatabase() {
	// Grab a copy of the object
	var cpStats = stats; 
	// TODO: This is not the safest way to pull the stats object off the wire.  Need to provide more robust solution.

	// Reset the stats object
	purgeObject();

	// Submit the copied object to the database
	mongo.createStatEntry(cpStats);
}

function measurableItemExists(arr, searchItem) {
	var item = Object.keys(arr);
	var retValue = false;

	item.forEach(function(i) {
		if (i === searchItem) {
			retValue = true;
		}
	});

	return retValue;
}

function startTimer() {
	snapIntervalTimer = setInterval(function() {
		snapToDatabase();
	}, snapInterval * 1000);
}

var debugPrint = function(params, cb) {
	console.log(stats);
};

exports.inc = increment;
exports.dec = decrement;
exports.changeWindow = changeWindow;