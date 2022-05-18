const express = require("express");
const app = express();
const POST = 8000;
const axios = require("axios");
const cheerio = require("cheerio");

//ウェブスクレイパーを作ろう
const URL = "https://search.rakuten.co.jp/search/mall/playstation5/568376/?s=2"
const data = [];

axios(URL)
.then((res) => {
	const htmlParser = res.data;
	const $ = cheerio.load(htmlParser);

	$(".searchresultitem", htmlParser).each(function(){
		const title = $(this).find('.title').text();
		const price = $(this).find('.important').text();

		data.push({ title, price });
	});
	console.log(data);

})
.catch((error) => {
	console.log(error);
});

app.listen(POST, console.log("server running"));

