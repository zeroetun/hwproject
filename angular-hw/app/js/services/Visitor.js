app.factory("Visitor", function (){

  var Visitor = function(longitude, latitude) {
  
    this.longitude = longitude;
    this.latitude = latitude; 

  }

  Visitor.prototype.toJson=function(){

  	return angular.toJson({longitude : this.longitude , latitude : this.latitude});
  }

  return Visitor;

})
