var express = require("express");
var router = express.Router();
const path=require("path");
const app = express();


const MyMongoLib = require("../MyMongoLib");
const myMongoLib = MyMongoLib();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/crearPaseo", function(req,res,next) {

  console.log("crearProducto", req.body);
  crearPaseo(req.body);
  res.redirect("/buscarRutas");

});


function crearPaseo(content, callback){
  console.log("Entra a crearPaseo");
  myMongoLib.crearPaseo(content);

}

router.post("/upDatePaseo", function(req,res,next) {
  myMongoLib.upDatePaseo(req.body);
  //res.redirect("/buscarRutas");
});

router.get("/paseos", (req, res) => {
  console.log("Get Paseos");
  myMongoLib.getPaseos()
    .then(docs => res.send(docs))
    .catch(err => res.send({err: true, msg: err}));
});


router.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/build/index.html"));
});
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/build/index.html"));
});

module.exports = router;
