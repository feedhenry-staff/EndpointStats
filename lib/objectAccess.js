var stats = {};

var increment = function (params, cb) {
	var entity = params.name;
	if (entity !== undefined) {
		// Check to see if it exists or not
		if (measurableItemExists(stats, entity)) {
			// Update existing 
			stats[entity]++;
		}else{
			stats[entity] = 1;
		}
	}
	debugPrint();
}

var decrement = function (params, cb) {
	var entity = params.name;
	if (entity !== undefined) {
		stats[entity]--;
	}
	debugPrint();
}	

function measurableItemExists(arr, searchItem){
	var item = Object.keys(arr);
	var retValue = false;

	item.forEach(function(i){
		if (i === searchItem) {
			retValue = true;
		}
	});

	return retValue;
}

var debugPrint = function(params, cb){
	console.log(stats);
};

exports.inc = increment;
exports.dec = decrement;