const axios = require('axios');
class Hepsiburada
{

     getProductDetail(url){

          
     return  axios.get(url).then((response) => {
               
          let data = response["data"];
          let stringArray = data.toString();
          let split = stringArray.split('mainCategoryId');
          let split2 = split[1].split(`,"productCampaigns":`);
          let split2End = `{"product":{"mainCategoryId` + split2[0] + `}`;

               let dataResponse = JSON.parse(split2End);
               let saltData = dataResponse["product"];


console.log(saltData);

               if(saltData["variants"].length > 0){

                    let productName = saltData["name"];
                    let productCategory = saltData["definitionName"];
                    let productSalePrice = saltData["listings"][0]["sortPriceText"];
                    let productMarketPrice = saltData["listings"][0]["originalPriceText"];
                    let productStockCode = saltData["sku"];
                    let productTax = saltData["taxVatRate"];
                    let productBrand = saltData["brand"];
                    let productDesc = saltData["description"];
                    let productImages = [];
                    saltData["allImages"].forEach(imageUrl => {
                         productImages.push(imageUrl.imageUrl);  
                    });
                    let productVariants = saltData["variants"];

                    let variantProducts = {
                         "productName" : productName,
                         "productCategory" : productCategory,
                         "productSalePrice" : productSalePrice,
                         "productMarketPrice" : productMarketPrice,
                         "productStockCode" : productStockCode,
                         "productTax" : productTax,
                         "productBrand" : productBrand,
                         "productDesc" : productDesc,
                         "productImages" : productImages,
                         "productVariants" : productVariants,
                    }
                    return variantProducts;
                    
               }else{

                    let productName = saltData["name"];
                    let productCategory = saltData["definitionName"];
                    let productSalePrice = saltData["listings"][0]["sortPriceText"];
                    let productMarketPrice = saltData["listings"][0]["originalPriceText"];
                    let productStockCode = saltData["sku"];
                    let productTax = saltData["taxVatRate"];
                    let productBrand = saltData["brand"];
                    let productDesc = saltData["description"];
                    let productImages = [];
                    saltData["allImages"].forEach(imageUrl => {
                         productImages.push(imageUrl.imageUrl);  
                    });
                    let simpleProduct = {
                         "productName" : productName,
                         "productCategory" : productCategory,
                         "productSalePrice" : productSalePrice,
                         "productMarketPrice" : productMarketPrice,
                         "productStockCode" : productStockCode,
                         "productTax" : productTax,
                         "productBrand" : productBrand,
                         "productDesc" : productDesc,
                         "productImages" : productImages,
                    }
                    return simpleProduct;

               }
          });
     }
}

module.exports = Hepsiburada;
