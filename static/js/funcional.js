/*
  List of Functions used
*/

var leftArea
var rightArea

let historyX=[longitude];
let historyY=[latitude];
let historySize=10;
var lastlat=0;
var lastlng=0;

function move(latitude, longitude){
		let lat = latitude
		let lng = longitude
		let position = marker.getLatLng()
		marker.setLatLng([lat,lng])
		map.panTo(new L.LatLng(lat, lng))
}

function move_sense(direction){
  let desloc=0.00005
	let position=marker.getLatLng();
	let lat=position.lat;
	let lng=position.lng;

	if (direction==0){
		lat=lat+desloc;
		lng=lng;
		marker.setLatLng([lat,lng]);
    get_location(lat,lng)
	}
	if (direction==1){
		lat=lat;
		lng=lng+desloc;
		marker.setLatLng([lat,lng]);
    get_location(lat,lng)
	}
	if (direction==2){
		lat=lat-desloc;
		lng=lng;
		marker.setLatLng([lat,lng]);
    get_location(lat,lng)
	}
	if (direction==3){
		lat=lat;
		lng=lng-desloc;
		marker.setLatLng([lat,lng]);
    get_location(lat,lng)
	}
	historyX.push(lng);
	historyY.push(lat);

	while(historyX.length>historySize){
		historyX.shift();
		historyY.shift();
	}

	lastlat=lat;
	lastlng=lng;
}

function addmarker(lat,lng){
	let marker = L.marker([lat,lng])
	marker.addTo(map);
}


function setm(m, Location){
  if (leftArea){
    map.removeLayer(leftArea); // remove the old polygon...
  }
	a = getNeighbor(Location, m + 90, 20);
	b = getNeighbor(a, m + 180, 20)
  c = getNeighbor(b, m + 270, 40)
  d = getNeighbor(c, m + 360, 20)
	leftArea = L.polygon([a,b,c,d], {color: 'red'}).addTo(map);

  if (rightArea){
    map.removeLayer(rightArea); // remove the old polygon...
  }
	e = getNeighbor(Location, m - 90, 20);
	f = getNeighbor(e, m, 20)
  g = getNeighbor(f, m + 90, 40)
  h = getNeighbor(g, m + 180, 20)
	rightArea = L.polygon([e,f,g,h], {color: 'blue'}).addTo(map);
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

function get_location(latitude, longitude){
  let lat = latitude
  let lng = longitude
  document.getElementById("position_text").value = lat+" , "+lng
}
