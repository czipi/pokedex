const http = require("https");

let types = {};
let colors = {
  normal: "A8A77A",
  fire: "EE8130",
  water: "6390F0",
  electric: "F7D02C",
  grass: "7AC74C",
  ice: "96D9D6",
  fighting: "C22E28",
  poison: "A33EA1",
  ground: "E2BF65",
  flying: "A98FF3",
  psychic: "F95587",
  bug: "A6B91A",
  rock: "B6A136",
  ghost: "735797",
  dragon: "6F35FC",
  dark: "705746",
  steel: "B7B7CE",
  fairy: "D685AD"
};

function pokeTypes(callback) {
  this.getTypes = function(url) {
    if (Object.keys(types).length == 0) {
      http.get(url, function(response) {
        response.setEncoding("utf8");
        var pokeData = "";

        response.on("data", function(data) {
          pokeData += data;
        });

        response.on("error", function(data) {
        });

        response.on("end", function(data) {
          console.log("Fetched pokemon types from " + url + ".");
          types = JSON.parse(pokeData);
          callback(types);
        });
      });
    } else {
      console.log("Fetched pokemon types from cache.");
      callback(types);
    }
  }

  this.getColors = function() {
    callback(colors);
  }
}

module.exports = pokeTypes;