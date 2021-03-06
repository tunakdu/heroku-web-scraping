const axios = require('axios');
const params = {
     access_key: '1e345bf7bf8d0d2c8a431307ec35ce89',
     url: 'https://www.trendyol.com/maviev/12-adet-ahsap-gorunumlu-elbise-askisi-p-52122841?boutiqueId=598704&merchantId=117992'
}

class Trendyol
{

     getProductDetail(url){
     

     return  axios.get("http://api.scrapestack.com/scrape",{params},{ withCredentials: true }).then((response) => {
               
               let data = response["data"];
               let stringArray = data.toString();
               console.log(stringArray);

               let split = stringArray.split("window.__PRODUCT_DETAIL_APP_INITIAL_STATE__=");

               let saltData = null;
               if(split.length > 0)
               {
                    
                    let split2 = split[1].split(',"htmlContent":');
                    let split2End = split2[0] + "}";
     
                    let dataResponse = JSON.parse(split2End);
                    saltData = dataResponse["product"];
               }
               


               if(saltData["variants"].length < 2){

               let productName = saltData["name"];
               let productCategory = saltData["category"]["name"];
               let productCategoryHierarchy = saltData["category"]["hierarchy"];
               let productSalePrice = saltData["price"]["discountedPrice"]["text"];
               let productMarketPrice = saltData["price"]["sellingPrice"]["text"];
               let productBarcode = saltData["variants"][0]["barcode"];
               let productStockCode = saltData["productCode"];
               let productDesc = saltData["contentDescriptions"];
               let productImages = saltData["images"];
               let productTax = saltData["tax"];
               let productBrand = saltData["brand"]["name"];



               let simpleProduct = {
                    "productName" : productName,
                    "productCategory" : productCategory,
                    "productCategoryHierarchy" : productCategoryHierarchy,
                    "productSalePrice" : productSalePrice,
                    "productMarketPrice" : productMarketPrice,
                    "productBarcode" : productBarcode,
                    "productStockCode" : productStockCode,
                    "productTax" : productTax,
                    "productBrand" : productBrand,
                    "productImages" : productImages,
                    "productDesc" : productDesc
               }
               return simpleProduct;

          }else{

               let productName = saltData["name"];
               let productCategory = saltData["category"]["name"];
               let productCategoryHierarchy = saltData["category"]["hierarchy"];
               let productSalePrice = saltData["price"]["discountedPrice"]["text"];
               let productMarketPrice = saltData["price"]["sellingPrice"]["text"];
               let productStockCode = saltData["productCode"];
               let productDesc = saltData["contentDescriptions"];
               let productImages = saltData["images"];
               let productTax = saltData["tax"];
               let productBrand = saltData["brand"]["name"];
               let productVariant = saltData["variants"];

               const variantProduct = {
                    "productName" : productName,
                    "productCategory" : productCategory,
                    "productCategoryHierarchy" : productCategoryHierarchy,
                    "productSalePrice" : productSalePrice,
                    "productMarketPrice" : productMarketPrice,
                    "productStockCode" : productStockCode,
                    "productTax" : productTax,
                    "productBrand" : productBrand,
                    "productVariant" : productVariant,
                    "productImages" : productImages,
                    "productDesc" : productDesc
               }
               return variantProduct;
          }


          });
     }

}

module.exports = Trendyol;
