"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var axios = require('axios');

var TrendyolPriceModul =
/*#__PURE__*/
function () {
  function TrendyolPriceModul() {
    _classCallCheck(this, TrendyolPriceModul);
  }

  _createClass(TrendyolPriceModul, [{
    key: "getPriceAmountInfo",
    value: function getPriceAmountInfo(url, option, minPrice, maxPrice, changePrice, productBarcode) {
      return axios.get(url).then(function (response) {
        var data = response["data"];
        var stringArray = data.toString();
        var split = stringArray.split("window.__PRODUCT_DETAIL_APP_INITIAL_STATE__=");
        var split2 = split[1].split(',"htmlContent":');
        var split2End = split2[0] + "}";
        var dataResponse = JSON.parse(split2End);
        var saltData = dataResponse["product"];
        var trendyolPrice = saltData["price"]["discountedPrice"]["value"];
        var newArray = [];
        var barcodeArray = [];
        var productBarcodeTrendyol;
        var productVariant;
        var log;
        var newPrice;
        var result;

        if (saltData["variants"].length < 2) {
          productBarcodeTrendyol = saltData["variants"][0]["barcode"];
          barcodeArray.push(productBarcodeTrendyol);
        } else {
          productVariant = saltData["variants"];
          productVariant.forEach(function (otherBarcode) {
            barcodeArray.push(otherBarcode["barcode"]);
          });
        }

        var found = barcodeArray.find(function (element) {
          return element == productBarcode;
        });

        if (found == undefined) {
          log = "Ürünler eşleşmedi";
          result = {
            log: log
          };
          return result;
        } else {
          if (option == 1) {
            // ! Sepet Sahipliğinin alındığı senaryo                    
            saltData["otherMerchants"].forEach(function (otherMerchants) {
              newArray.push(otherMerchants["price"]["discountedPrice"]["value"]);
            });

            if (newArray.length == 0) {
              log = "Bu ürün için herhangi bir rakip bulunamadı";
            } else {
              var min = newArray[0];
              var mak = newArray[0];

              for (var i = 0; i < newArray.length; i++) {
                /*min dizideki değerden büyükse mini dizideki ile değiştiriyoruz.*/
                if (min > newArray[i]) {
                  min = newArray[i];
                }
                /*mak dizideki değerden küçükse makı dizideki değer ile değiştiriyoruz.*/


                if (mak < newArray[i]) {
                  mak = newArray[i];
                }
              }

              if (trendyolPrice > min) {
                newPrice = min - changePrice;
                log = "Eski fiyatınız olan '" + trendyolPrice + "' ₺, satıcılar arasında en düşük fiyat olan '" + min + "' ₺'nin altına, girmiş olduğunuz azaltma miktarı '" + changePrice + "' kadar azaltılıp, yeni fiyatınız '" + newPrice + "' olmustur.";
              } else {
                log = "En düşük fiyat senin.";
              }
            }

            var newChangePrice = parseFloat(changePrice);
            var newMinPrice = parseFloat(minPrice);
            var newMaxPrice = parseFloat(maxPrice);
            result = {
              trendyolPrice: trendyolPrice,
              min: min,
              changePrice: newChangePrice,
              newPrice: newPrice,
              log: log,
              customerMinPrice: newMinPrice,
              customerMaxPrice: newMaxPrice
            };
            return result;
          } else if (option == 2) {
            // ? Fiyatın minimumda kaldığı senaryo                    
            saltData["otherMerchants"].forEach(function (otherMerchants) {
              newArray.push(otherMerchants["price"]["discountedPrice"]["value"]);
            });

            if (newArray.length == 0) {
              log = "Bu ürün için herhangi bir rakip bulunamadı";
            } else {
              var min = newArray[0];
              var mak = newArray[0];

              for (var i = 0; i < newArray.length; i++) {
                /*min dizideki değerden büyükse mini dizideki ile değiştiriyoruz.*/
                if (min > newArray[i]) {
                  min = newArray[i];
                }
                /*mak dizideki değerden küçükse makı dizideki değer ile değiştiriyoruz.*/


                if (mak < newArray[i]) {
                  mak = newArray[i];
                }
              }

              if (min < minPrice) {
                log = "fiyat rekabeti yapılamaz. Verdiğiniz minimum tutar rekabette size üstünlük sağlmıyor.";
              } else {
                if (trendyolPrice > min) {
                  newPrice = min - changePrice;
                  log = "Eski fiyatınız olan '" + trendyolPrice + "' ₺, satıcılar arasında en düşük fiyat olan '" + min + "' ₺'nin altına, girmiş olduğunuz azaltma miktarı '" + changePrice + "' kadar azaltılıp, yeni fiyatınız '" + newPrice + "' olmustur.";
                } else {
                  log = "En düşük fiyat senin.";
                }
              }
            }

            var _newChangePrice = parseFloat(changePrice);

            var _newMinPrice = parseFloat(minPrice);

            var _newMaxPrice = parseFloat(maxPrice);

            result = {
              trendyolPrice: trendyolPrice,
              min: min,
              changePrice: _newChangePrice,
              newPrice: newPrice,
              log: log,
              customerMinPrice: _newMinPrice,
              customerMaxPrice: _newMaxPrice
            };
            return result;
          } else if (option == 3) {
            // * Fiyatın maximumda kaldığı senaryo                    
            saltData["otherMerchants"].forEach(function (otherMerchants) {
              newArray.push(otherMerchants["price"]["discountedPrice"]["value"]);
            });

            if (newArray.length == 0) {
              log = "Eski fiyatınız olan '" + trendyolPrice + "' ₺, başka bir satıcı olmadığından dolayı sizlerin verdiğiniz yeni tutar olan '" + maxPrice + "' şeklinde değiştirilmiştir.";
            } else {
              log = "Bu ürün altında rakipleriniz olduğu için bu opsiyonu kullanamazsınız.";
            }

            var _newMaxPrice2 = parseFloat(maxPrice);

            result = {
              trendyolPrice: trendyolPrice,
              log: log,
              customerMaxPrice: _newMaxPrice2
            };
            return result;
          }
        }
      });
    }
  }]);

  return TrendyolPriceModul;
}();

module.exports = TrendyolPriceModul;