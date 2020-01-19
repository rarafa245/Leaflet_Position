/*
	Script for creat a leaflet map
	and make it available in the HTML file
*/

let latitude=-19.917342;
let longitude=-43.928138;

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
