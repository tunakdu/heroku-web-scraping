const app = require ("express")();
const bodyParser = require ("body-parser");
const Trendyol = require("./trendyol");
const Hepsiburada = require("./hb");


app.use(bodyParser.json())
app.unsubscribe(bodyParser.urlencoded({
     extended: true
}))

let hepsiburadaClass = new Hepsiburada();
let trendyolClass = new Trendyol();



app.post("/trendyoll", (req,res) => {

          const url =  req.body["url"];
          trendyolClass.getProductDetail(url).then((response) => {
               res.send(response);
          });

})

app.post("/hb", (req,res) => {

     res.send("ne oluyorum be agam");

     // const url =  req.body["url"];
     // let search= "?magaza";
     // let searchResponse = url.includes(search);

     // if(searchResponse == false){
     //      hepsiburadaClass.getProductDetail(url).then((response) => {
     //           res.send(response);
     //      });
     // }else{
     //      let split = url.split(search);
     //      let split2 = split[0];
     //      hepsiburadaClass.getProductDetail(split2).then((response) => {
     //           res.send(response);
     //      });
     // }

})



app.listen(process.env.PORT || 3000, () => {
     console.log("sunucu ayaktadır çalışıyor.")
})