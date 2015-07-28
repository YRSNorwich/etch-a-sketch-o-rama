var config = require('./config');

module.exports = {
	"open-weather-map": {
		"url": "http://api.openweathermap.org/data/2.5/weather?q=" + config["open-weather-map"].location,
		"format": "json",
		"ttl": 60 * 30 // 30 minutes
	}
}
