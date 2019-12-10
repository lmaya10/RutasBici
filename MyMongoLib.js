const MongoClient = require("mongodb").MongoClient;

const MyMongoLib = () => {

  const MyMongoLib = this || {};
  // Connection URL
  const url = process.env.MONGO_URL;

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
 
      let contenido = {
        capacidad: content.capacidad,
        fecha: content.fecha,
        user: content.user,
        idRuta: content.idRuta,
        inscritos: [],
        numInscritas: content.numInscritas
      };

      const db = client.db(dbName);

      // Insert a single document
      const testCol = db.collection("Paseos");
      

      testCol.insertOne(contenido, function(err){
        if(err) throw err;
        console.log("Inserto el paseo");
        client.close();
      });

    });
  };

  MyMongoLib.upDatePaseo = (info) => {
    client.connect(function(err, client) {
      if(err !== null) {
        return err;
      }
      console.log("Connected correctly to server");

      const db = client.db(dbName);

      // Insert a single document
      const testCol = db.collection("Paseos");
      console.log("Info req update", info);

      let participante = {
        nombre: info.nombre,
        id: info.id
      };
      //testCol.find({idRuta: info.idRuta, fecha: info.fecha}).toArray().then(data => console.log(data));

      testCol.find({idRuta: info.idRuta}).toArray().then(data => impResultados(data));

      function impResultados(data){
        let num = parseInt(data[0].numInscritas,10) + 1;
        testCol.update({_id: data[0]._id},{$set: {numInscritas: num}, $push: {inscritos: participante}} );
        console.log(data[0]._id);
        client.close();
      } 

    });
  };

  MyMongoLib.cancelarPaseo = (info) => {
    client.connect(function(err, client) {
      if(err !== null) {
        return err;
      }
      console.log("Connected correctly to server");

      const db = client.db(dbName);

      // Insert a single document
      const testCol = db.collection("Paseos");
      console.log("Info req update", info);
      //testCol.find({idRuta: info.idRuta, fecha: info.fecha}).toArray().then(data => console.log(data));

      testCol.find({idRuta: info.idRuta}).toArray().then(data => impResultados(data));

      function impResultados(data){
        let num = parseInt(data[0].numInscritas,10) - 1;
        testCol.update({_id: data[0]._id},{$set: {numInscritas: num}} );
        console.log(data[0]._id);
        client.close();
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