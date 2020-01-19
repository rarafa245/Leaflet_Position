let latitude=-19.937202;
let longitude=-43.930878;

let baseLayer = L.tileLayer(
	'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	{maxZoom: 18}
);

let map = new L.Map('mapid', {
  center: new L.LatLng(latitude, longitude),
  zoom: 18,
	//dragging: false,
	//scrollWheelZoom: false,
	//zoomControl: false,
	//tap: false,
  layers: [baseLayer]
});

marker = L.marker([latitude, longitude]).addTo(map)
    .bindPopup('Ola, Estou aqui!')
    .openPopup()

var form_local = document.getElementById('Local')
var form_marker = document.getElementById('Marker')

form_local.addEventListener("submit", (event) => {
	event.preventDefault()

	var local_data = document.getElementById('local_data')
	latitude = local_data.elements.cLat.value
	longitude = local_data.elements.cLng.value
	polygon = local_data.elements.poly_on.checked
	angulo = local_data.elements.cAngle.value
	console.log(latitude)
	console.log(longitude)

	if (polygon){
		Location = [Number.parseFloat(latitude), Number.parseFloat(longitude)]
		setm(Number.parseFloat(angulo), Location)

	}

	move(latitude, longitude)
})

form_marker.addEventListener("submit", (event) => {
	event.preventDefault()

	var marker_data = document.getElementById('marker_data')
	latitude = marker_data.elements.cLatM.value
	longitude = marker_data.elements.cLngM.value

	addmarker(latitude, longitude)
})

map.on('click', function(e){
	let lat = e.latlng.lat;
	let lng = e.latlng.lng;
	console.log(lat+","+lng)
});


function move(latitude, longitude){
		let lat = latitude
		let lng = longitude
		let position = marker.getLatLng()
		marker.setLatLng([lat,lng])
		map.panTo(new L.LatLng(lat, lng))
}

function addmarker(lat,lng){
	let marker = L.marker([lat,lng])
	marker.addTo(map);
}


function setm(m, Location){
	a = getNeighbor(Location, m + 90, 20);
	b = getNeighbor(a, m + 180, 20)
  c = getNeighbor(b, m + 270, 40)
  d = getNeighbor(c, m + 360, 20)
	let leftArea = L.polygon([a,b,c,d], {color: 'red'}).addTo(map);

	e = getNeighbor(Location, m - 90, 20);
	f = getNeighbor(e, m, 20)
  g = getNeighbor(f, m + 90, 40)
  h = getNeighbor(g, m + 180, 20)
	let rightArea = L.polygon([e,f,g,h], {color: 'blue'}).addTo(map);
}


function getNeighbor(point,deg,meters){
	hip=metersdistance2degrees(meters);
	rad=d2r(deg);
	cat_oposto=Math.sin(rad)*hip;
	cat_adjacente=Math.cos(rad)*hip;
	return[point[0]+cat_oposto, point[1]+cat_adjacente]
}


function d2r(degrees)
{
  return degrees * (Math.PI/180);
}

function r2d(radians)
{
  return radians / (Math.PI/180);
}

function degreedistance2meters(degree){
  return degree*111111;
}

function metersdistance2degrees(meters){
  return meters/111111;
}
