function Env(def){
  this.props={};
  this.def=def;
}

Env.prototype.get=function(key,def){
  return this.props[key]?this.props[key]:process.env[key]?process.env[key]:this.def[key]?this.def[key]:def;
}

Env.prototype.set=function(key,val){
  this.props[key]=val;
}

module.exports=new Env({
  "time_window":10,
});
