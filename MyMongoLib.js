const MongoClient = require("mongodb").MongoClient;

const MyMongoLib = () => {

  const MyMongoLib = this || {};
  // Connection URL
  const url = process.env.MONGO_URL || "mongodb+srv://admin:admin@cluster0-gk0ns.mongodb.net/test?retryWrites=true&w=majority";

  // Database Name
  const dbName = "EnBici";

  // Create a new MongoClient
  const client = new MongoClient(url);


  MyMongoLib.getDocs = () => 
    new Promise((resolve, reject) => {
      client.connect(function(err, client) {
        if(err !== null) {
          reject(err);
          return;
        }
        console.log("Connected correctly to server");

        const db = client.db("PruebaReactive");

        // Insert a single document
        const testCol = db.collection("test");
        testCol
          .find({})
          .limit(20)
          .toArray()
          .then(resolve)
          .catch(reject);
      });
    });

  MyMongoLib.crearPaseo = (content) => {
    client.connect(function(err, client) {
      if(err !== null) {
        return err;
      }
      console.log("Connected correctly to server");

      const db = client.db(dbName);

      // Insert a single document
      const testCol = db.collection("Paseos");
      

      testCol.insertOne(content, function(err){
        if(err) throw err;
        console.log("Inserto el paseo");
        client.close();
      });

    });
  };

  MyMongoLib.upDatePaseo = (user) => {
    client.connect(function(err, client) {
      if(err !== null) {
        return err;
      }
      console.log("Connected correctly to server");

      const db = client.db(dbName);

      // Insert a single document
      const testCol = db.collection("Paseos");
      

      testCol.find({nombre: user.nombreS}).toArray().then(data => impResultados(data));

      function impResultados(data){
        let num = data[0].numInscritas + 1;
        testCol.update({_id: data[0]._id},{$set: {numInscritas: num}} );
        console.log(data[0]._id);
      } 

    });
  };


  MyMongoLib.getPaseos = () => 
    new Promise((resolve, reject) => {
      client.connect(function(err, client) {
        if(err !== null) {
          reject(err);
          return;
        }
        console.log("Connected correctly to server");

        const db = client.db(dbName);

        // Insert a single document
        const testCol = db.collection("Paseos");
        testCol
          .find({})
          .limit(20)
          .toArray()
          .then(resolve)
          .catch(reject);
      });
    });

  MyMongoLib.listenToChangesDocs = (cbk) => {
    client.connect((err,client) => {
      if(err !== null)
      {
        throw(err);
      }
      console.log("Connected correctly to server");
      const db = client.db("PruebaReactive");
      const testCol = db.collection("test");

      const csCursor = testCol.watch();
      
      console.log("Esta escuchando");
      csCursor.on("change", data => {
        console.log("changed", data);

        MyMongoLib.getDocs().then(docs => cbk(JSON.stringify(docs)));

      });

    });
  };

  MyMongoLib.listenToChangesPaseos = (cbk) => {
    client.connect((err,client) => {
      if(err !== null)
      {
        throw(err);
      }
      console.log("Connected correctly to server");
      const db = client.db(dbName);
      const testCol = db.collection("Paseos");

      const csCursor = testCol.watch();
      
      console.log("Esta escuchando");
      csCursor.on("change", data => {
        console.log("changed", data);

        MyMongoLib.getPaseos().then(docs => cbk(JSON.stringify(docs)));

      });

    });
  };

  // Use connect method to connect to the Server
  

  return MyMongoLib;
};

module.exports = MyMongoLib;