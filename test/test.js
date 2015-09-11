var index = require('./index.js');

var params = {
	"name":"test1"
};

var params2 = {
	"name":"test2"
}

index.incAccess(params);
index.incAccess(params2);
index.incAccess(params);
index.incAccess(params2);
index.decAccess(params);
index.decAccess(params2);
index.decAccess(params);
index.decAccess(params2);

