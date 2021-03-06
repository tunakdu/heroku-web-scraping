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
          log = "??r??nler e??le??medi";
          result = {
            log: log
          };
          return result;
        } else {
          if (option == 1) {
            // ! Sepet Sahipli??inin al??nd?????? senaryo                    
            saltData["otherMerchants"].forEach(function (otherMerchants) {
              newArray.push(otherMerchants["price"]["discountedPrice"]["value"]);
            });

            if (newArray.length == 0) {
              log = "Bu ??r??n i??in herhangi bir rakip bulunamad??";
            } else {
              var min = newArray[0];
              var mak = newArray[0];

              for (var i = 0; i < newArray.length; i++) {
                /*min dizideki de??erden b??y??kse mini dizideki ile de??i??tiriyoruz.*/
                if (min > newArray[i]) {
                  min = newArray[i];
                }
                /*mak dizideki de??erden k??????kse mak?? dizideki de??er ile de??i??tiriyoruz.*/


                if (mak < newArray[i]) {
                  mak = newArray[i];
                }
              }

              if (trendyolPrice > min) {
                newPrice = min - changePrice;
                log = "Eski fiyat??n??z olan '" + trendyolPrice + "' ???, sat??c??lar aras??nda en d??????k fiyat olan '" + min + "' ???'nin alt??na, girmi?? oldu??unuz azaltma miktar?? '" + changePrice + "' kadar azalt??l??p, yeni fiyat??n??z '" + newPrice + "' olmustur.";
              } else {
                log = "En d??????k fiyat senin.";
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
            // ? Fiyat??n minimumda kald?????? senaryo                    
            saltData["otherMerchants"].forEach(function (otherMerchants) {
              newArray.push(otherMerchants["price"]["discountedPrice"]["value"]);
            });

            if (newArray.length == 0) {
              log = "Bu ??r??n i??in herhangi bir rakip bulunamad??";
            } else {
              var min = newArray[0];
              var mak = newArray[0];

              for (var i = 0; i < newArray.length; i++) {
                /*min dizideki de??erden b??y??kse mini dizideki ile de??i??tiriyoruz.*/
                if (min > newArray[i]) {
                  min = newArray[i];
                }
                /*mak dizideki de??erden k??????kse mak?? dizideki de??er ile de??i??tiriyoruz.*/


                if (mak < newArray[i]) {
                  mak = newArray[i];
                }
              }

              if (min < minPrice) {
                log = "fiyat rekabeti yap??lamaz. Verdi??iniz minimum tutar rekabette size ??st??nl??k sa??lm??yor.";
              } else {
                if (trendyolPrice > min) {
                  newPrice = min - changePrice;
                  log = "Eski fiyat??n??z olan '" + trendyolPrice + "' ???, sat??c??lar aras??nda en d??????k fiyat olan '" + min + "' ???'nin alt??na, girmi?? oldu??unuz azaltma miktar?? '" + changePrice + "' kadar azalt??l??p, yeni fiyat??n??z '" + newPrice + "' olmustur.";
                } else {
                  log = "En d??????k fiyat senin.";
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
            // * Fiyat??n maximumda kald?????? senaryo                    
            saltData["otherMerchants"].forEach(function (otherMerchants) {
              newArray.push(otherMerchants["price"]["discountedPrice"]["value"]);
            });

            if (newArray.length == 0) {
              log = "Eski fiyat??n??z olan '" + trendyolPrice + "' ???, ba??ka bir sat??c?? olmad??????ndan dolay?? sizlerin verdi??iniz yeni tutar olan '" + maxPrice + "' ??eklinde de??i??tirilmi??tir.";
            } else {
              log = "Bu ??r??n alt??nda rakipleriniz oldu??u i??in bu opsiyonu kullanamazs??n??z.";
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