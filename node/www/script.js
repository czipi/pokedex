var pokeList = [];
var pokemonTypes = {};
var pokeGroups = {};
var pokemonDetails = {};

var typeColors = {
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
}

var pokeUrl = "http://localhost:3000/api/pokemons/";
var currentPage = 1;

// fetchTypes("https://raw.githubusercontent.com/flaki/pokedex/master/poketypes.json");
fetchTypes("http://localhost:3000/api/allpoketypes");

function fetchTypes(url) {
  fetch(url).then(
    function(response) {
      return response.json();
    }).then(function(types){
      addTypes(types);
    });
}

function addTypes(types) {
  pokemonTypes = types;
  transformTypesToGroups();
  fetchPokemons(pokeUrl + currentPage);
}

function fetchPokemons (url) {
  fetch(url).then(
    function(response) {
      return response.json();
    }).then(function(pokemons){
      addPokemons(pokemons.results);
    });
};

function addPokemons(pokemons) {
  pokemons.forEach(function(pokemon){
    pokeList.push(pokemon); // lista elmentése
    var main = document.createElement('div');
    main.setAttribute('class','list-element');
    main.setAttribute('id', pokemon.name);
    // onclick event -> fetch details
    main.addEventListener('click', function(e) {
      if(e.target.nodeName == "IMG") { // ha a képre kattintottunk
        fetchPokemonDetails(e.target.parentElement.childNodes[1].innerHTML.toLowerCase());
      } else { // ha a spanra kattintottunk
        fetchPokemonDetails(e.target.innerHTML.toLowerCase());
      }

      document.getElementById('loadingScreen').style.display = "flex";
      document.getElementById('pokemons').style.display = "none";
    });

    var sub = document.createElement('div');
    main.appendChild(sub);

    var img = document.createElement('img');
    var id = pokemon.url.match(/\/(\d+)\/$/)[1];
    //var imgUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/%id.png";
    var imgUrl = "http://localhost:3000/api/pokepic/%id";
    // main.style.backgroundImage = "url('"+imgUrl.replace("%id", id)+"')";
    // console.log("url("+imgUrl.replace("%id", id)+")");
    img.setAttribute('src', imgUrl.replace("%id", id));
    sub.appendChild(img);

    var types = pokemonTypes[pokemon.name];

    if (types.length == 1) {
      main.style.background = "#" + typeColors[types[0]];
    } else if (types.length == 2) {
      main.style.background = "linear-gradient(90deg, #"+typeColors[types[0]]+" 50%, #"+typeColors[types[1]]+" 50%)";
    }

    document.getElementById('list').appendChild(main);

    var spn = document.createElement('span');
    spn.style.opacity = '0.5';
    spn.style.backgroundColor = 'white';
    var name = pokemon.name.substring(0, 1).toUpperCase() + pokemon.name.substring(1, pokemon.name.length) ;
    spn.textContent = name;

    sub.appendChild(spn);
  });


  document.getElementById('loadingScreen').style.display = "none";
  document.getElementById('pokemons').style.display = "flex";
  document.getElementById('pokemons').style.flexDirection = "column";
}

function searchPokemons(type, name) {
  var pokemons = document.getElementById("list").childNodes;

  console.log("Searching for '" + name + "' in type '" + (type == "" ? "all" : "type") + "'.");

  if (type == "" && name == "") {

    pokemons.forEach(function(p){
      p.style.display = "block";
    });

    return;
  }

  var validPokemons = [];

  pokemons.forEach(function(p){
    validPokemons.push(p.id);
  });

  if (type != "") {
    validPokemons = pokeGroups[type];
  }

  if (name != "")
  {
    var result = [];

    for (var i = 0; validPokemons != null && i < validPokemons.length; i++) {
      if ((validPokemons[i].toLowerCase().startsWith(name.toLowerCase()))) {
        result.push(validPokemons[i]);
      }
    }

    validPokemons = result;
  }

  pokemons.forEach(function(p){
    var name = p.id;
    if (validPokemons != null && validPokemons.indexOf(name) != -1) {
      p.style.display = "block";
    } else {
      p.style.display = "none";
    }
  });
}

function fetchPokemonDetails(pokeName) {
  console.log('kiválasztott poke neve:' + pokeName);
  var poke = pokeList.find(function(poke){
    return (poke.name == pokeName);
  });

  if (pokeName in pokemonDetails) {
    loadPokeDetails(pokemonDetails[pokeName]);
  } else {
    fetch(poke.url).then(function(response) {
      return response.json();
    }).then(function(pokeDetails){
         pokemonDetails[pokeName] = pokeDetails;
         loadPokeDetails(pokeDetails);
       });
  }
}

function loadPokeDetails(pokeDetails){
  var types = pokemonTypes[pokeDetails.name];

  if (types.length == 1) {
    document.getElementById("details-wrapper").style.background = "#" + typeColors[types[0]];;
  } else if (types.length == 2) {
    document.getElementById("details-wrapper").style.background = "linear-gradient(90deg, #"+typeColors[types[0]]+" 50%, #"+typeColors[types[1]]+" 50%)";
  }

  var name = pokeDetails.name.substring(0, 1).toUpperCase() + pokeDetails.name.substring(1, pokeDetails.name.length);

  document.getElementById('poke-name').innerHTML = name;
  document.getElementById('poke-img').setAttribute('src', pokeDetails.sprites.front_default);
  document.getElementById('poke-stat-hp').innerHTML = pokeDetails.stats[5].base_stat;
  document.getElementById('poke-stat-attack').innerHTML = pokeDetails.stats[4].base_stat;
  document.getElementById('poke-stat-defense').innerHTML = pokeDetails.stats[3].base_stat;
  document.getElementById('poke-stat-speed').innerHTML = pokeDetails.stats[0].base_stat;
  document.getElementById('poke-stat-spatk').innerHTML = pokeDetails.stats[2].base_stat;
  document.getElementById('poke-stat-spdef').innerHTML = pokeDetails.stats[1].base_stat;

  document.getElementById('loadingScreen').style.display = "none";
  document.getElementById("details-wrapper").style.display='flex';
}

function transformTypesToGroups() {
  for (var pokeName in pokemonTypes) {
    if (pokemonTypes.hasOwnProperty(pokeName)) {
      var typeArr = pokemonTypes[pokeName];
      typeArr.forEach(function(type){
        if (pokeGroups.hasOwnProperty(type)){
          pokeGroups[type].push(pokeName);
        } else {
          pokeGroups[type] = [];
          pokeGroups[type].push(pokeName);
        }
      });
    }
  }

  var select = document.getElementById("filter");
  for (var type in pokeGroups) {
    var option = document.createElement("option");
    option.value = type;
    option.innerHTML = type + " type";
    select.appendChild(option);
  }
}



document.getElementById("details-wrapper").addEventListener("click", function(e){
    if (e.target === this) {
      this.style.display = "none";
      document.getElementById('details-wrapper').style.display = 'none';
      document.getElementById('loadingScreen').style.display = 'none';
      document.getElementById('pokemons').style.display = "flex";
    }
});

document.getElementById("filter").addEventListener("change", function(){
  var searchValue = document.getElementById("search").value.toLowerCase();
  var typeValue = this.value.toLowerCase();

  searchPokemons(typeValue, searchValue);
});

document.getElementById("search").addEventListener("input", function(){
  var searchValue = this.value.toLowerCase();
  var typeValue = document.getElementById("filter").value.toLowerCase();

  searchPokemons(typeValue, searchValue);
});

document.getElementById("prev").addEventListener("click", function(){
  if (currentPage-- == 2) {
    this.disabled = true;
  }

  pokeList = [];
  document.getElementById("buttons").display = "none";
  document.getElementById("list").innerHTML = "";
  fetchPokemons(pokeUrl + currentPage);
  document.getElementById("buttons").display = "flex";
});

document.getElementById("next").addEventListener("click", function(){
  if (currentPage++ == 1) {
    document.getElementById("prev").disabled = false;
  }

  pokeList = [];
  document.getElementById("buttons").display = "none";
  document.getElementById("list").innerHTML = "";
  fetchPokemons(pokeUrl + currentPage);
  document.getElementById("buttons").display = "flex";
});