const cheerio = require('cheerio');
var https = require("https");

//YQL CONSTANTS
const BASE_YQL_URL = "https://query.yahooapis.com/v1/public/yql?q=";
const SELECT_ALL_URL = "select * from htmlstring where url='";
const TABLES_PARAM = "&env=store://datatables.org/alltableswithkeys";
const FILTER_PARAM = "and xpath="

//KIJIJI SEARCH Specific variables
const BASE_KIJIJI_URL_SEARCH = "https://www.kijiji.ca";

exports.load_search_results = function(url, callback) {
	var category = "/b-appartement-condo-3-1-2";
	var city = "/ville-de-montreal";
	var neighborhood = "/beaubien";
	var category_id = "/k0c213l";
	var city_id = "1700281";
	var search_class = '"search-item"';
	var filter_class = "'//div/*[contains(@class,"  + search_class +")]'";
	var json = "&format=html";

	//final_url = BASE_YQL_URL + SELECT_ALL_URL + BASE_KIJIJI_URL_SEARCH + category + city + neighborhood + category_id + city_id + FILTER_PARAM + filter_class + TABLES_PARAM;
	final_url = BASE_KIJIJI_URL_SEARCH + category + city + neighborhood + category_id + city_id;
	console.log(final_url);
	makeCall(final_url, function(results) {
		var treatedResponse = handleResults(results);
		callback(treatedResponse);        
	});
 };

 function makeCall(url, callback) {
    https.get(url,function (res) {
    	var store = "";

        res.on('data', function (d) {
            store += d;
        });
        res.on('error', function (e) {
            console.error(e);
        });
        res.on('end', function() {
        	callback(store);
    	});
    });
}

function handleResults(results){
	var response_array= [];
    const $ = cheerio.load(results);
	var test = $('result');
	
	$('.search-item').map(function(){
		var data = $(this);
		var ad_json = {};

		ad_json.id = data.attr('data-ad-id');
		ad_json.img_url = data.find('img').attr('src');
		ad_json.url = data.attr('data-vip-url');
		ad_json.price = data.find('.price').text();
		ad_json.title = data.find('.title').text();
		ad_json.location = data.find('.location').text();
		ad_json.date = data.find('.date-posted').text();
		ad_json.description = data.find('.description').text();
		response_array.push(ad_json);
	});

	return response_array;
}