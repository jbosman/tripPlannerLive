var Sequelize = require('sequelize');
var db = require('./_db');

var Restaurant = db.define('restaurant', {
  name: Sequelize.STRING,
  price: {
    type: Sequelize.INTEGER,
    validate: { min: 1, max: 5 }
  },
  cuisine: Sequelize.STRING
},{
	classMethods: {
		getplaceIDofRestaraunt: function(rest){
			Restaurant.findOne({
				where: {
					name: rest
				}
			}).then(function(rest){
				return rest.placeId;
			});
		}
	}
});

module.exports = Restaurant;
