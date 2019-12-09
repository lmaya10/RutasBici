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
  res.redirect("/");

});


function crearPaseo(content, callback){
  console.log("Entra a crearPaseo");
  myMongoLib.crearPaseo(content);

}

router.get("/paseos", (req, res) => {
  console.log("Get Paseos");
  myMongoLib.getPaseos()
    .then(docs => res.send(docs))
    .catch(err => res.send({err: true, msg: err}));
});


module.exports = router;
