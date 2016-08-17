var Sequelize = require('sequelize');
var db = require('./_db');

var Hotel = db.define('hotel', {
  name: Sequelize.STRING,
  num_stars: {
    type: Sequelize.INTEGER,
    validate: { min: 1, max: 5 }
  },
  amenities: Sequelize.STRING
},{
	classMethods: {
		getplaceIDofHotel: function(hotel){
			Hotel.findOne({
				where: {
					name: hotel
				}
			}).then(function(hotel){
				return hotel.placeId;
			});
		}
	}
});

module.exports = Hotel;
