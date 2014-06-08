var minPrice = null,
    maxPrice = null,
    numRooms = null,
    center = null,
    radius = null;

function filter() {
  console.log("min price: " + minPrice + "\n" +
              "max price: " + maxPrice + "\n" +
              "num rooms: " + numRooms + "\n" +
              "radius: " + radius);
  $("#cars_list > li").each(function() {
    var element = $(this);
    var elementId = element.attr('data-id');
    var currentPrice = parseInt(element.attr('data-cena'));
    var currentRooms = parseInt(element.attr('data-pokoje'));
    var currentLat = element.attr('data-lat');
    var currentLong = element.attr('data-long');
    var pass = true;
    if(minPrice != null && currentPrice < minPrice) pass = false;
    if(maxPrice != null && currentPrice > maxPrice) pass = false;
    if(numRooms != null && currentRooms != numRooms) pass = false;
    if(radius != null && !insideCircle(currentLat, currentLong)) pass = false;

    if(pass) {
      showMarker(elementId);
      element.show();
    } else {
      element.hide();
      hideMarker(elementId);
    }
  });
}

function filter_setMin(element) {
  var value = $(element).val();
  var minValue = $('#cenamin').val();
  minPrice = (minValue != "") ? value : null;
  filter();
}
     
function filter_setMax(element) {
  var value = $(element).val();
  var maxValue = $('#cenamax').val();
  maxPrice = (maxValue != "") ? value : null;
  filter();
}

function filter_setRooms(number) {
  numRooms = number >= 1 ? number : null;
  $('#lpval').html(number >= 1 ? numRooms : "~~");
  filter();
}

function filter_setRadius(number) {
  radius = number >= 1 ? 1000 * number : null;
  $('#odlval').html(number >= 1 ? number : "~~");
  setMaxDist(radius);
  filter();
}

function filter_setLocation(element) {
  var location = $('#lokalizacja').val();
  if(location != "") {
    setLocation(location);
  } else {
    setLocation(null);
  }
  filter();
}

function apartmentClick(element) {
  if($(element).hasClass("selected"))
  {
    $(element).removeClass("selected");
  } else {
    $('li').removeClass("selected");
    $(element).addClass("selected");
    $('#id_car_id').val($(element).attr('data-id'));
  }
}

function updateLatLong() {
  $("#cars_list > li").each(function() {
    var element = $(this);
    var elementId = element.attr('data-id');
    var currentCity = element.attr('data-miasto');
    var currentAddress = element.attr('data-adres');
    getPosition(currentCity, currentAddress, function(lat, lng) {
      if(lat != null && lng != null) {
        element.attr('data-lat', lat);
        element.attr('data-long', lng);
        createMarker(elementId, lat, lng, currentCity + ', ' + currentAddress, function(){
          apartmentClick(element);
          element.scrollIntoView();
        })
      }
    });
  });
}

function updateTime() {
   var cost = parseInt($("#days").attr('data-cena')) * parseInt($("#days").val());
   $("#cost_final").html(cost);
}

$(document).ready( function(){
  if(document.getElementById("map-canvas") != null) {
    initMaps();
  }
  if(document.getElementById("cars_list") != null) {
     updateLatLong();
  }
});