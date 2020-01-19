/*
  List of leaflet events with the form´s response
*/

window.onload = () => {
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
  	get_location(e.latlng.lat , e.latlng.lng)
  })

  document.addEventListener('keypress', (event) => {
    if(event.which==119){
  		move_sense(0);
      return
  	}
  	if(event.which==100){
  		move_sense(1);
      return
  	}
  	if(event.which==115){
  		move_sense(2);
      return
  	}
  	if(event.which==97){
  		move_sense(3);
      return
  	}
  })

}
