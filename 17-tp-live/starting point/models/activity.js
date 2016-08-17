var Sequelize = require('sequelize');
var db = require('./_db');

var Activity = db.define('activity', {
  name: Sequelize.STRING,
  age_range: Sequelize.STRING
},{
	classMethods: {
		getplaceIDofActivity: function(activity){
			Activity.findOne({
				where: {
					name: activity
				}
			}).then(function(activity){
				return activity.placeId;
			});
		}
	}
});

module.exports = Activity
