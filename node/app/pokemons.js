const http = require("https");

const pokemonsUrl = "https://pokeapi.co/api/v2/pokemon/?limit=%limit&offset=%offset";
const imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/%id.png";

let pokeList = {};
let pokePictures = {};

function pokemons(limit, offset, callback) {
  this.getPokemons = function() {
    if (!(offset in pokeList)) {
      http.get(pokemonsUrl.replace("%limit", limit).replace("%offset", offset), function(response){
        response.setEncoding("utf8");
        var pokeData = "";

        response.on("data", function(data){
          pokeData += data;
        });

        response.on("error", function(data){
        });

        response.on("end", function(data){
          console.log("Fetched pokemons from " + pokemonsUrl.replace("%limit", limit).replace("%offset", offset) + ".");
          pokeList[offset] = JSON.parse(pokeData);
          callback(pokeList[offset]);
        });
      });
    } else {
      console.log("Fetched pokemons from cache.");
      callback(pokeList[offset]);
    }
  }

  this.getPicture = function(id){
    if (id in pokePictures) {
      console.log("Fetched picture from cache.");
      callback(pokePictures[id]);
    } else {
      http.get(imageUrl.replace("%id", id), function(response){
        response.setEncoding("binary");
        var picData = "";

        response.on("data", function(data){
          picData += data;
        });

        response.on("error", function(data){
        });

        response.on("end", function(data){
          console.log("Fetched picture from " + imageUrl.replace("%id", id) + ".");
          pokePictures[id] = picData;
          callback(picData);
        });
      });
    }
  };
}

module.exports = pokemons;