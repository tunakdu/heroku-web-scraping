"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var axios = require('axios');

var Trendyol =
/*#__PURE__*/
function () {
  function Trendyol() {
    _classCallCheck(this, Trendyol);
  }

  _createClass(Trendyol, [{
    key: "getProductDetail",
    value: function getProductDetail(url) {
      return axios.get(url, {
        withCredentials: true
      }).then(function (response) {
        var data = response["data"];
        var stringArray = data.toString();
        return stringArray;
        var split = stringArray.split("window.__PRODUCT_DETAIL_APP_INITIAL_STATE__=");
        var saltData = null;
        console.log(stringArray.search("window.__PRODUCT_DETAIL_APP_INITIAL_STATE__="));

        if (split.length > 0) {
          var split2 = split[1].split(',"htmlContent":');
          var split2End = split2[0] + "}";
          var dataResponse = JSON.parse(split2End);
          saltData = dataResponse["product"];
        }

        if (saltData["variants"].length < 2) {
          var productName = saltData["name"];
          var productCategory = saltData["category"]["name"];
          var productCategoryHierarchy = saltData["category"]["hierarchy"];
          var productSalePrice = saltData["price"]["discountedPrice"]["text"];
          var productMarketPrice = saltData["price"]["sellingPrice"]["text"];
          var productBarcode = saltData["variants"][0]["barcode"];
          var productStockCode = saltData["productCode"];
          var productDesc = saltData["contentDescriptions"];
          var productImages = saltData["images"];
          var productTax = saltData["tax"];
          var productBrand = saltData["brand"]["name"];
          var simpleProduct = {
            "productName": productName,
            "productCategory": productCategory,
            "productCategoryHierarchy": productCategoryHierarchy,
            "productSalePrice": productSalePrice,
            "productMarketPrice": productMarketPrice,
            "productBarcode": productBarcode,
            "productStockCode": productStockCode,
            "productTax": productTax,
            "productBrand": productBrand,
            "productImages": productImages,
            "productDesc": productDesc
          };
          return simpleProduct;
        } else {
          var _productName = saltData["name"];
          var _productCategory = saltData["category"]["name"];
          var _productCategoryHierarchy = saltData["category"]["hierarchy"];
          var _productSalePrice = saltData["price"]["discountedPrice"]["text"];
          var _productMarketPrice = saltData["price"]["sellingPrice"]["text"];
          var _productStockCode = saltData["productCode"];
          var _productDesc = saltData["contentDescriptions"];
          var _productImages = saltData["images"];
          var _productTax = saltData["tax"];
          var _productBrand = saltData["brand"]["name"];
          var productVariant = saltData["variants"];
          var variantProduct = {
            "productName": _productName,
            "productCategory": _productCategory,
            "productCategoryHierarchy": _productCategoryHierarchy,
            "productSalePrice": _productSalePrice,
            "productMarketPrice": _productMarketPrice,
            "productStockCode": _productStockCode,
            "productTax": _productTax,
            "productBrand": _productBrand,
            "productVariant": productVariant,
            "productImages": _productImages,
            "productDesc": _productDesc
          };
          return variantProduct;
        }
      });
    }
  }]);

  return Trendyol;
}();

module.exports = Trendyol;