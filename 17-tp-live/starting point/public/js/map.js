$(function initializeMap (){

  var fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

  var styleArr = [{
    featureType: 'landscape',
    stylers: [{ saturation: -100 }, { lightness: 60 }]
  }, {
    featureType: 'road.local',
    stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
  }, {
    featureType: 'transit',
    stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
  }, {
    featureType: 'administrative.province',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'water',
    stylers: [{ visibility: 'on' }, { lightness: 30 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
  }];

  var mapCanvas = document.getElementById('map-canvas');

  var currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

  var iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
  };

  function drawMarker (type, coords) {
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var iconURL = iconURLs[type];
    var marker = new google.maps.Marker({
      icon: iconURL,
      position: latLng
    });
    marker.setMap(currentMap);
  }

  drawMarker('hotel', [40.705137, -74.007624]);
  drawMarker('restaurant', [40.705137, -74.013940]);
  drawMarker('activity', [40.716291, -73.995315]);

});

function addItemToItin(string){
    var elementIdToSearch = string + "-choices";
    var selected = document.getElementById(elementIdToSearch).value;
    var Div = $('<div class="itinerary-item"> </div>'); 

    var savedElementSpan = $('<span class="title">' + selected + '</span>');
    var savedElSpanXbtn = $('<button class="btn btn-xs btn-danger remove btn-circle itinXbtn">x</button>');
    
    // Register X button event handler
    savedElSpanXbtn.on('click', function(){
      console.log("Got here 2");
      $(this).parent().remove();
    });

    Div.append(savedElementSpan);
    Div.append(savedElSpanXbtn);

    var elementID = "#" + string + "_Itin";

    $(elementID).append(Div);
}

$(document).ready( function(){

  $('#hotelsPlusBtn').on('click', function(){
    addItemToItin('hotel');
    //   $('.itinXbtn').on('click', function(){
    //   console.log("Got here");
    //   // this.parent().remove();
    // });
  });

  $('#restPlusBtn').on('click', function(){
    addItemToItin('restaurant');
  });

  $('#activityPlusBtn').on('click', function(){
    addItemToItin('activity');
  });

  $('.itinXbtn').on('click', function(){
    console.log("Got here");
    this.parent().remove();
  });

  // $('.itinXbtn').css("border", "3px solid green");


  
});
