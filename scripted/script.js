var poke = [
{
  "id": 1,
  "name": "Bulbasaur",
  "type": [ "grass", "poison" ],
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
},
{
  "id": 5,
  "name": "Charmeleon",
  "type": [ "fire" ],
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"
},
{
  "id": 15,
  "name": "Beedrill",
  "type": [ "bug", "poison" ],
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png"
},
{
  "id": 193,
  "name": "Yanma",
  "type": [ "bug", "flying" ],
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/193.png"
},
{
  "id": 152,
  "name": "Chikorita",
  "type": [ "grass" ],
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/152.png"
},
];

var colors = {
  grass: "rgb(120, 200, 80)",
  poison: "rgb(160, 64, 160)",
  fire: "rgb(240, 128, 48)",
  bug: "rgb(168, 184, 32)",
  flying: "rgb(168, 144, 240)"
};

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



