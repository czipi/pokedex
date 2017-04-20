const express = require("express");
const app = express();
const pokeTypes = require("./app/types");
const pokemons = require("./app/pokemons");
const path = require('path');

const publicPath = path.resolve(__dirname, 'www');

app.get("*", function(req, res, next){
  console.log("'" + req.url + "'");
  next();
});

app.get("/api/allpoketypes", function(req, res, next){
  let tp = new pokeTypes(function(result){
    res.json(result);
  });
  tp.getTypes("https://raw.githubusercontent.com/flaki/pokedex/master/poketypes.json");
});

app.get("/api/alltypes", function(req, res, next){
  let tp = new pokeTypes(function(result){
    res.json(result);
  });
  tp.getColors();
});

app.get("/api/pokemons/:page", function(req, res, next){
  let p = new pokemons(20, (Number(req.params.page) - 1) * 20, function(result){
    res.json(result);
  });
  p.getPokemons();
});

app.get("/api/pokepic/:id", function(req, res, next){
  let p = new pokemons(null, null, function(result){
    res.send(new Buffer(result, 'binary'));
  });
  p.getPicture(req.params.id);
});

app.use(express.static(publicPath));

app.listen(3000, () => console.log("Server started."));