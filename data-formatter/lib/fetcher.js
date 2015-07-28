var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var request = require('request');

var sources = require('../config/sources');

function refreshData(ignoreCache, callback)
{
	var sourceNames = Object.keys(sources);
	var sourceData = {};
	(function getSource(sourceIndex) {
		var sourceName = sourceNames[sourceIndex];
		var source = sources[sourceName];

		var cachePath = __dirname + '/../cache/' + sourceName + '.json';

		fs.readFile(cachePath, function (error, rawData) {
			var data;
			var fetchNewData = ignoreCache || (error ? true : false);
			if (!fetchNewData)
			{
				var storedData = JSON.parse(rawData.toString());
				if ((new Date().getTime() - storedData.downloadTime) >= source.ttl)
				{
					fetchNewData = true;
				}
				else
				{
					data = storedData.data;
				}
			}

			var storeData = function (toStore) {
				if (toStore == null)
				{
					callback(new Error('Could not fetch data for \'' + sourceName + '\''));
					return;
				}

				sourceData[sourceName] = toStore;

				if (sourceIndex + 1 < sourceNames.length)
				{
					getSource(sourceIndex + 1);
				}
				else
				{
					callback(null, sourceData);
				}
			}

			if (fetchNewData)
			{
				request(source.url, function (error, response, body) {
					if (error && response.statusCode == 200)
					{
						data = null;
						return;
					}

					switch (source.format)
					{
						case 'json':
							data = JSON.parse(body);
					}

					mkdirp(path.dirname(cachePath), function (error) {
						if (error) throw new Error('Could not create cache folder!');
						var toSave = {
							'data': data,
							'downloadTime': new Date().getTime()
						}
						fs.writeFile(cachePath, JSON.stringify(toSave), function (error) {
							if (error) throw new Error('Could not write cache file for \'' + sourceName + '\'');
						});
					});

					storeData(data);
				});
				return;
			}

			storeData(data);
		})
	})(0)
}

exports.fetch = refreshData.bind(this, true);
exports.refresh = refreshData.bind(this, false);
