// ! Sayfaya Dahil Etme

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const mongoose = require("mongoose");

const Trendyol = require("./controller/trendyol");
const Hepsiburada = require("./controller/hb");
const TrendyolPriceModul = require("./controller/trendyolPriceModul");
const priceLogs = require("./models/priceLogs");

const axios = require("axios");
const params = {
  access_key: "1e345bf7bf8d0d2c8a431307ec35ce89",
  url: "https://www.trendyol.com/maviev/12-adet-ahsap-gorunumlu-elbise-askisi-p-52122841?boutiqueId=598704&merchantId=117992",
};

// ! ---------------------------

// ? Veritabanı Bağlantısı

//mongoose.connect('mongodb://localhost:27017/priceCompetiton');

// ? ---------------------------

// * Express kullanılan yer

app.use(bodyParser.json());
const urlencodedparser = bodyParser.urlencoded({ extended: false });
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));

// * -------------------------

let hepsiburadaClass = new Hepsiburada();
let trendyolClass = new Trendyol();
let trendyolPriceModulClass = new TrendyolPriceModul();

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/trendyol", (req, res) => {
  const url = req.body["url"];
  trendyolClass.getProductDetail(url).then((response) => {
    res.send(response);
  });
  
});

app.post("/test", (req, res) => {
  var myHeaders = new Headers();
  myHeaders.append("apikey", "OyJ6XkC696k7bV70KVKLJCZuXTbT6DAQ");
  
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };
  
  fetch("https://api.apilayer.com/adv_scraper/scraper?url=https%3A%2F%2Fwww.trendyol.com%2Fkzy-mobilya%2Ftek-kapak-5-rafli-dolap-p-4348364%3FboutiqueId%3D61%26merchantId%3D107234", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));


  // axios
  //   .get("http://api.scrapestack.com/scrape", { params })
  //   .then((response) => {
  //     const websiteContent = response.data;
  //     res.send(websiteContent);
  //   })
  //   .catch((error) => {
  //    res.send(error);
  //   });
});

app.post("/trendyolPriceModul", urlencodedparser, (req, res) => {
  const url = req.body["link"];
  const option = req.body["option"];
  const minPrice = req.body["minPrice"];
  const maxPrice = req.body["maxPrice"];
  const changePrice = req.body["changePrice"];
  const productName = req.body["productName"];
  const productBarcode = req.body["productBarcode"];
  const productStockCode = req.body["productStockCode"];
  const customerID = req.body["customerID"];

  trendyolPriceModulClass
    .getPriceAmountInfo(
      url,
      option,
      minPrice,
      maxPrice,
      changePrice,
      productBarcode
    )
    .then((response) => {
      const newPriceLog = new priceLogs({
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
        customerOption: option,
      });
      newPriceLog.save();
    });
});

app.post("/hb", (req, res) => {
  const url = req.body["url"];
  let search = "?magaza";
  let searchResponse = url.includes(search);
  console.log(searchResponse);

  if (searchResponse == false) {
    try {
      hepsiburadaClass.getProductDetail(url).then((response) => {
        res.send(response);
        console.log(response);
      });
    } catch (err) {
      res.send(err);
    }
  } else {
    let split = url.split(search);
    let split2 = split[0];
    try {
      hepsiburadaClass.getProductDetail(split2).then((response) => {
        res.send(response);
      });
    } catch (err) {
      res.send(err);
    }
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("sunucu ayaktadır çalışıyor.");
});
