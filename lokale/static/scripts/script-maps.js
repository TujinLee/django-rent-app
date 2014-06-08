var map;
var myPositionMarker;
var myPositionCircle;
var geocoder;
var geolocationPositionLat = null, geolocationPositionLong = null;
var markers = new Object();

function initMaps() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById("map-canvas"), { 
    zoom: 5, 
    center: new google.maps.LatLng(51.107778, 17.038333), 
    disableDefaultUI: !0, 
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  google.maps.event.addListener(map, 'zoom_changed', function () {
    //console.log(map.zoom)
  });

  setGeolocation();
}

function setGeolocation() {
  if(geolocationPositionLat != null && geolocationPositionLong != null) {
    setMyMarker(geolocationPositionLat, geolocationPositionLong);
  } if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      geolocationPositionLat = position.coords.latitude;
      geolocationPositionLong = position.coords.longitude;
      setMyMarker(geolocationPositionLat, geolocationPositionLong);
    });
  }
}

function setLocation(location) {
  if(location == null) {
    setGeolocation();
  } else {
    getPosition(location, "", function(lat, lng) {
      setMyMarker(lat, lng);
    });
  } 
}

function setMyMarker(lat, lng) {
  if(myPositionMarker != null) {
    myPositionMarker.setMap(null);
    myPositionMarker = null;
  }
  if(myPositionCircle != null) {
    myPositionCircle.setMap(null);
    myPositionCircle = null;
  }

  initialLocation = new google.maps.LatLng(lat, lng);
  myPositionMarker = new google.maps.Marker({
    position: initialLocation,
    map: map,
    title: 'Twoja pozycja!'
  });
  var circleOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.5,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.1,
    map: map,
    center: initialLocation,
    radius: 1000
  };
  myPositionCircle = new google.maps.Circle(circleOptions);
  map.fitBounds(myPositionCircle.getBounds());
}

function setMaxDist(dist) {
  if(dist != null && dist > 0) {
    myPositionCircle.setMap(map);
    myPositionCircle.setRadius(radius);
    map.fitBounds(myPositionCircle.getBounds());
  } else {
     myPositionCircle.setMap(null);
  }
}

function createMarker(id, lat, lng, title, funcOnClick) {
  markerLocation = new google.maps.LatLng(lat, lng);
  console.log("created marker for " + title);
  var marker = new google.maps.Marker({
    position: markerLocation,
    map: map,
    title: title,
    icon: '/static/images/markers/blue_MarkerA.png'
  });
  markers[id] = marker;
  google.maps.event.addListener(marker, 'click', function() {
    funcOnClick();
  });
}

function hideMarker(id) {
  if(markers[id] != null) {
    //markers[id].setMap(null);
    markers[id].setIcon('/static/images/markers/brown_MarkerA.png');
  }
}

function showMarker(id) {
  if(markers[id] != null) {
    //markers[id].setMap(map);
    markers[id].setIcon('/static/images/markers/blue_MarkerA.png');
  }
}

function removeMarker(id) {
  if(markers[id] != null) {
    markers[id].setMap(null);
    markers[id] = null;
  }
}

function rad(x) {
  return x * Math.PI / 180;
};

function getDistance(lat1, lng1, lat2, lng2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(lat2 - lat1);
  var dLong = rad(lng2 - lng1);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  Math.cos(rad(lat1)) * Math.cos(rad(lat2)) *
  Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return Math.abs(d); // returns the distance in meter
};

function getPosition(city, address, func) {
  geocoder.geocode( { 'address': city + ', ' + address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      func(results[0].geometry.location.k, results[0].geometry.location.A);
    } else {
      func(null, null);
      //alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

function insideCircle(lat, lng) {
  var latt = myPositionCircle.getCenter().lat();
  var longg = myPositionCircle.getCenter().lng();
  var dist = getDistance(lat, lng, latt, longg);
  var rad = radius;
  console.log(lat + "-" + lng + " ???? " + latt + "-" + longg + " dist = " + dist + "   rad : " + rad);
  return (dist <= rad) ? true : false;
}