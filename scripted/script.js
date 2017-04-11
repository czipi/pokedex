var poke = [
{
  "id": 1,
  "name": "Bulbasaur",
  "type": [ "grass", "posion" ],
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
  "type": [ "bug", "posion" ],
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

poke.forEach(function(p) {
	var main = document.createElement('div');
	
	main.setAttribute('class','list-element');
	main.setAttribute('id', p.id);
	
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



