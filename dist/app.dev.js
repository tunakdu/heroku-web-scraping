"use strict";

// ! Sayfaya Dahil Etme
var express = require("express");

var app = express();

var bodyParser = require("body-parser"); //const mongoose = require("mongoose");


var Trendyol = require("./controller/trendyol");

var Hepsiburada = require("./controller/hb");

var TrendyolPriceModul = require("./controller/trendyolPriceModul");

var priceLogs = require("./models/priceLogs");

var axios = require("axios");

var params = {
  access_key: "1e345bf7bf8d0d2c8a431307ec35ce89",
  url: "https://www.trendyol.com/maviev/12-adet-ahsap-gorunumlu-elbise-askisi-p-52122841?boutiqueId=598704&merchantId=117992"
}; // ! ---------------------------
// ? Veritabanı Bağlantısı
//mongoose.connect('mongodb://localhost:27017/priceCompetiton');
// ? ---------------------------
// * Express kullanılan yer

app.use(bodyParser.json());
var urlencodedparser = bodyParser.urlencoded({
  extended: false
});
app.set("view engine", "ejs");
app.use(express["static"]("public"));
app.use("/css", express["static"](__dirname + "public/css"));
app.use("/js", express["static"](__dirname + "public/js"));
app.use("/img", express["static"](__dirname + "public/img")); // * -------------------------

var hepsiburadaClass = new Hepsiburada();
var trendyolClass = new Trendyol();
var trendyolPriceModulClass = new TrendyolPriceModul();
app.get("/", function (req, res) {
  res.render("index");
});
app.post("/trendyol", function (req, res) {
  var url = req.body["url"];
  trendyolClass.getProductDetail(url).then(function (response) {
    res.send(response);
  });
});
app.post("/test", function (req, res) {
  var myHeaders = new Headers();
  myHeaders.append("apikey", "OyJ6XkC696k7bV70KVKLJCZuXTbT6DAQ");
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };
  fetch("https://api.apilayer.com/adv_scraper/scraper?url=https%3A%2F%2Fwww.trendyol.com%2Fkzy-mobilya%2Ftek-kapak-5-rafli-dolap-p-4348364%3FboutiqueId%3D61%26merchantId%3D107234", requestOptions).then(function (response) {
    return response.text();
  }).then(function (result) {
    return console.log(result);
  })["catch"](function (error) {
    return console.log('error', error);
  }); // axios
  //   .get("http://api.scrapestack.com/scrape", { params })
  //   .then((response) => {
  //     const websiteContent = response.data;
  //     res.send(websiteContent);
  //   })
  //   .catch((error) => {
  //    res.send(error);
  //   });
});
app.post("/trendyolPriceModul", urlencodedparser, function (req, res) {
  var url = req.body["link"];
  var option = req.body["option"];
  var minPrice = req.body["minPrice"];
  var maxPrice = req.body["maxPrice"];
  var changePrice = req.body["changePrice"];
  var productName = req.body["productName"];
  var productBarcode = req.body["productBarcode"];
  var productStockCode = req.body["productStockCode"];
  var customerID = req.body["customerID"];
  trendyolPriceModulClass.getPriceAmountInfo(url, option, minPrice, maxPrice, changePrice, productBarcode).then(function (response) {
    var newPriceLog = new priceLogs({
      productName: productName,
      productBarcode: productBarcode,
      productStockCode: productStockCode,
      productTrendyolPrice: response.trendyolPrice,
      productMerchantMinPrice: response.min,
      productChangePrice: response.changePrice,
      productNewPrice: response.newPrice,
      productSystemLog: response.log,
      customerMinPrice: response.customerMinPrice,
      customerMaxPrice: response.customerMaxPrice,
      customerID: customerID,
      customerOption: option
    });
    newPriceLog.save();
  });
});
app.post("/hb", function (req, res) {
  var url = req.body["url"];
  var search = "?magaza";
  var searchResponse = url.includes(search);
  console.log(searchResponse);

  if (searchResponse == false) {
    try {
      hepsiburadaClass.getProductDetail(url).then(function (response) {
        res.send(response);
        console.log(response);
      });
    } catch (err) {
      res.send(err);
    }
  } else {
    var split = url.split(search);
    var split2 = split[0];

    try {
      hepsiburadaClass.getProductDetail(split2).then(function (response) {
        res.send(response);
      });
    } catch (err) {
      res.send(err);
    }
  }
});
app.listen(process.env.PORT || 3000, function () {
  console.log("sunucu ayaktadır çalışıyor.");
});