const axios = require('axios');

class TrendyolPriceModul
{

     getPriceAmountInfo(url,option,minPrice,maxPrice,changePrice,productBarcode){
     

     return  axios.get(url).then((response) => {
               
               let data = response["data"];

               let stringArray = data.toString();
               let split = stringArray.split("window.__PRODUCT_DETAIL_APP_INITIAL_STATE__=");
               let split2 = split[1].split(',"htmlContent":');
               let split2End = split2[0] + "}";
               let dataResponse = JSON.parse(split2End);
               let saltData = dataResponse["product"];
               let trendyolPrice = saltData["price"]["discountedPrice"]["value"];
               let newArray = [];
               let barcodeArray = [];
               let productBarcodeTrendyol;
               let productVariant;
               let log;
               let newPrice;
               let result ;
               if(saltData["variants"].length < 2){
                    productBarcodeTrendyol = saltData["variants"][0]["barcode"];
                    barcodeArray.push(productBarcodeTrendyol);
               }else{
                    productVariant = saltData["variants"];

                    productVariant.forEach(otherBarcode => {
                         barcodeArray.push(otherBarcode["barcode"]);
                    });
               }

               const found = barcodeArray.find(element => element == productBarcode );

               if(found == undefined){
                    log = "Ürünler eşleşmedi";
                    result = {
                         log : log
                    }
                    return result;
               }else{
                    if(option == 1){

                         // ! Sepet Sahipliğinin alındığı senaryo                    

                              saltData["otherMerchants"].forEach(otherMerchants => {
                                   newArray.push(otherMerchants["price"]["discountedPrice"]["value"]);
                              });
                              if(newArray.length == 0){
                                   log = "Bu ürün için herhangi bir rakip bulunamadı";
                              }else{
                                   var min = newArray[0];
                                   var mak = newArray[0];   
          
                                   for(var i=0;i<newArray.length;i++)
                                        {
                                        /*min dizideki değerden büyükse mini dizideki ile değiştiriyoruz.*/
                                        if (min > newArray[i])
                                        {
                                             min = newArray[i];
                                        }
                                        /*mak dizideki değerden küçükse makı dizideki değer ile değiştiriyoruz.*/
                                        if (mak < newArray[i])  
                                        {
                                             mak = newArray[i]; 
                                        }
                                   }

                                   if(trendyolPrice>min){
                                        newPrice = min - changePrice;
                                        log = "Eski fiyatınız olan '" +trendyolPrice+ "' ₺, satıcılar arasında en düşük fiyat olan '" +min+ "' ₺'nin altına, girmiş olduğunuz azaltma miktarı '" +changePrice+ "' kadar azaltılıp, yeni fiyatınız '" +newPrice+ "' olmustur."
                                   }
                                   else{
                                        log = "En düşük fiyat senin."
                                   }

                                   
                              }
                              let newChangePrice = parseFloat(changePrice);
                              let newMinPrice= parseFloat(minPrice);
                              let newMaxPrice = parseFloat(maxPrice);
                              result = { 
                                   trendyolPrice : trendyolPrice,
                                   min : min,
                                   changePrice : newChangePrice,
                                   newPrice : newPrice,
                                   log : log,
                                   customerMinPrice : newMinPrice,
                                   customerMaxPrice : newMaxPrice,
                              };
                    return result;
                    }
                    else if(option == 2){

                         // ? Fiyatın minimumda kaldığı senaryo                    

                         saltData["otherMerchants"].forEach(otherMerchants => {
                              newArray.push(otherMerchants["price"]["discountedPrice"]["value"]);
                         });
                         if(newArray.length == 0){
                              log = "Bu ürün için herhangi bir rakip bulunamadı";
                         }else{
                              

                              var min = newArray[0];
                              var mak = newArray[0];   
     
                              for(var i=0;i<newArray.length;i++)
                                   {
                                   /*min dizideki değerden büyükse mini dizideki ile değiştiriyoruz.*/
                                   if (min > newArray[i])
                                   {
                                        min = newArray[i];
                                   }
                                   /*mak dizideki değerden küçükse makı dizideki değer ile değiştiriyoruz.*/
                                   if (mak < newArray[i])  
                                   {
                                        mak = newArray[i]; 
                                   }
                              }


                              if(min < minPrice){
                                   log ="fiyat rekabeti yapılamaz. Verdiğiniz minimum tutar rekabette size üstünlük sağlmıyor."
                              }else{

                                   if(trendyolPrice>min){
                                        newPrice = min - changePrice;
                                        log = "Eski fiyatınız olan '" +trendyolPrice+ "' ₺, satıcılar arasında en düşük fiyat olan '" +min+ "' ₺'nin altına, girmiş olduğunuz azaltma miktarı '" +changePrice+ "' kadar azaltılıp, yeni fiyatınız '" +newPrice+ "' olmustur."
                                   }
                                   else{
                                        log = "En düşük fiyat senin."
                                   }
                              }

                         }
                         let newChangePrice = parseFloat(changePrice);
                         let newMinPrice= parseFloat(minPrice);
                         let newMaxPrice = parseFloat(maxPrice);
                         result = { 
                              trendyolPrice : trendyolPrice,
                              min : min,
                              changePrice : newChangePrice,
                              newPrice : newPrice,
                              log : log,
                              customerMinPrice : newMinPrice,
                              customerMaxPrice : newMaxPrice,
                         };
               return result;

                    }
                    else if(option == 3) {
                          // * Fiyatın maximumda kaldığı senaryo                    

                         saltData["otherMerchants"].forEach(otherMerchants => {
                              newArray.push(otherMerchants["price"]["discountedPrice"]["value"]);
                         });
                         if(newArray.length == 0){
                              log = "Eski fiyatınız olan '" +trendyolPrice+ "' ₺, başka bir satıcı olmadığından dolayı sizlerin verdiğiniz yeni tutar olan '" +maxPrice+ "' şeklinde değiştirilmiştir."

                         }else{
                              
                              log = "Bu ürün altında rakipleriniz olduğu için bu opsiyonu kullanamazsınız."

                         }
                         
                         let newMaxPrice = parseFloat(maxPrice);
                         result = { 
                              trendyolPrice : trendyolPrice,
                              log : log,
                              customerMaxPrice : newMaxPrice,
                         };
               return result;
                    }
               }
          });
     }
}

module.exports = TrendyolPriceModul;
