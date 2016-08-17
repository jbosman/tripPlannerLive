var Sequelize = require('sequelize');
var db = require('./_db');

var Place = db.define('place', {
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  phone: Sequelize.STRING,
  location: Sequelize.ARRAY(Sequelize.DOUBLE)
},{
	classMethods: {
		getLocationByID : function(id){
			Place.findOne({
				where: {
					id: id
				}
			})
			.then(function(place){
				return place.location;
			})
		}
	}
});

module.exports = Place;
