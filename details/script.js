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
    var main = document.createElement('div');
    main.setAttribute('class','list-element');
    main.setAttribute('id', pokemon.name);

    var sub = document.createElement('div');
    main.appendChild(sub);
    
    var img = document.createElement('img');
    var id = pokemon.url.match(/\/(\d+)\/$/)[1];
    var imgUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/%id.png";
    img.setAttribute('src', imgUrl.replace("%id", id));
    sub.appendChild(img);
    
    document.getElementById('list').appendChild(main);

    var spn = document.createElement('span');
    var name = pokemon.name.substring(0, 1).toUpperCase() + pokemon.name.substring(1, pokemon.name.length) ;
    spn.textContent = name;

    sub.appendChild(spn);
    
    //var ul = document.createElement('ul');
    //main.appendChild(ul);
  });

  document.getElementById('loadingScreen').style.display = "none";
  document.getElementById('pokemons').style.display = "flex";
  document.getElementById('pokemons').style.flexDirection = "column";
}

fetchPokemons('https://pokeapi.co/api/v2/pokemon/?limit=150');

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