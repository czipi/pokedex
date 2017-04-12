var pokeList = [];

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

        document.getElementById("pokemons").style.display='none';
        document.getElementById("details-wrapper").style.display='flex';
	    });

	    var sub = document.createElement('div');
	    main.appendChild(sub);
	    
	    var img = document.createElement('img');
	    var id = pokemon.url.match(/\/(\d+)\/$/)[1];
	    var imgUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/%id.png";
      // main.style.backgroundImage = "url('"+imgUrl.replace("%id", id)+"')";
      // console.log("url("+imgUrl.replace("%id", id)+")");
	    img.setAttribute('src', imgUrl.replace("%id", id));
	    sub.appendChild(img);
	    
      var types = pokemonTypes[pokemon.name];

      if (types.length == 1) {
        main.style.background = "#" + typeColors[types[0]] + " " + "url('"+imgUrl.replace("%id", id)+"')";
        console.log("1 " + "#" + typeColors[types[0]]);
      } else if (types.length == 2) {
        main.style.background = "linear-gradient(90deg, #"+typeColors[types[0]]+" 50%, #"+typeColors[types[1]]+" 50%)";
      }

	    document.getElementById('list').appendChild(main);

	    var spn = document.createElement('span');
	    var name = pokemon.name.substring(0, 1).toUpperCase() + pokemon.name.substring(1, pokemon.name.length) ;
	    spn.textContent = name;

	    sub.appendChild(spn);
	    
	    //var ul = document.createElement('ul');
	    //main.appendChild(ul);
	  });

	  console.log(pokeList);
	  
	  document.getElementById('loadingScreen').style.display = "none";
	  document.getElementById('pokemons').style.display = "flex";
	  document.getElementById('pokemons').style.flexDirection = "column";
	}

fetchTypes("https://raw.githubusercontent.com/flaki/pokedex/master/poketypes.json");

document.getElementById("details-wrapper").addEventListener("click", function(e){
    if (e.target === this) {
      this.style.display = "none";
      document.getElementById('pokemons').style.display = "flex";
    }
});

document.getElementById("search").addEventListener("input", function(){
  var filterValue = this.value.toLowerCase();
  var pokemons = document.getElementById("list").childNodes;

  pokemons.forEach(function(p){
    var name = p.id;

    if (name.startsWith(filterValue)) {
      p.style.display = "block";
    } else {
      p.style.display = "none";
    }
  });
});

function fetchPokemonDetails(pokeName) {
	console.log('kiválasztott poke neve:' + pokeName);
	var poke = pokeList.find(function(poke){
		return (poke.name == pokeName);
	});
	console.log(poke);
	fetch(poke.url).then(function(response) {		  
	      return response.json();
	    }).then(function(pokemonDetails){
	    	console.log(pokemonDetails.stats);
	    	//loadPokeDetails(pokemonDetails);
	    });
}

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
  console.log(pokemonTypes);
  fetchPokemons('https://pokeapi.co/api/v2/pokemon/?limit=150');
}

function fetchPokemonsWithDetails(url) {
  var promise = fetch(url).then(
    function(response) {
      return response.json();
    }).then(function(pokemons){
      pokemons.results.forEach(function(pokemon) {
        var pokePremise = fetch(pokemon.url).then(
          function(detailResponse){
            return detailResponse.json();
          }).then(function(pokemonDetails){

            var main = document.createElement('div');
        
            main.setAttribute('class','list-element');
            main.setAttribute('id', pokemonDetails.name);

            /*
            if (p.type.length == 1) {
              console.log("1");
              main.style.background = colors[p.type[0]];
            } else if (p.type.length == 2) {
              console.log("2");
              main.style.background = "linear-gradient(90deg, "+colors[p.type[0]]+" 50%, "+colors[p.type[1]]+" 50%)";
            }*/

            var sub = document.createElement('div');
            main.appendChild(sub);
            
            var img = document.createElement('img');
            img.setAttribute('src', pokemonDetails.sprites.front_default);
            sub.appendChild(img);
            
            document.getElementById('list').appendChild(main);

            var spn = document.createElement('span');
            spn.textContent = pokemonDetails.name;
            sub.appendChild(spn);
            
            var ul = document.createElement('ul');

            /*
            p.type.forEach(function(s) {
              var li = document.createElement('li');
              li.textContent = s;
              ul.appendChild(li);
            })
            */

            main.appendChild(ul);
          });        
      });	
      
      document.getElementById('loadingScreen').style.display = "none";

      return pokemons;
  });
};

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

var pokemonTypes = {};

/*
poke.forEach(function(p) {
	var main = document.createElement('div');
	
	main.setAttribute('class','list-element');
	main.setAttribute('id', p.id);
	
  if (p.type.length == 1) {
    console.log("1");
    main.style.background = colors[p.type[0]];
  } else if (p.type.length == 2) {
    console.log("2");
    main.style.background = "linear-gradient(90deg, "+colors[p.type[0]]+" 50%, "+colors[p.type[1]]+" 50%)";
  }

	var sub = document.createElement('div');
	main.appendChild(sub);
	
	var img = document.createElement('img');
	img.setAttribute('src', p.sprite);
	sub.appendChild(img);
	
	document.getElementById('list').appendChild(main);

	var spn = document.createElement('span');
	spn.textContent = p.name;
	sub.appendChild(spn);
	
	var ul = document.createElement('ul');

	p.type.forEach(function(s) {
		var li = document.createElement('li');
		li.textContent = s;
		ul.appendChild(li);
	})
	
	main.appendChild(ul);
	
});	



*/