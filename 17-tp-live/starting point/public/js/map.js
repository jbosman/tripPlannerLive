
$( function initializeMap () {

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

  // drawMarker('hotel', [40.705137, -74.007624]);
  // drawMarker('restaurant', [40.705137, -74.013940]);
  // drawMarker('activity', [40.716291, -73.995315]);


  $('#hotelsPlusBtn').on('click', function(){
    addItemToItin('hotel', drawMarker);
  });

  $('#restPlusBtn').on('click', function(){
    addItemToItin('restaurant', drawMarker);
  });

  $('#activityPlusBtn').on('click', function(){
    addItemToItin('activity', drawMarker);
  });

  $('#day-add').on('click', function(){
    addNewDay();
  });

  $('.current-day').on('click', switchToCurrentDay );
 
  $('#day-title button').on('click', removeDay );


});


function addItemToItin(string, func){
    var currentDay = "Day_" + $('.current-day').text();

    var elementIdToSearch = string + "-choices";
    var selected = document.getElementById(elementIdToSearch).value;
    // var location = document.getElementById(elementIdToSearch).getAttribute("location")
      var location = $("#"+ elementIdToSearch +' option:selected').attr('location')
    var Div = $('<div class="itinerary-item"> </div>'); 
    Div.addClass(currentDay);

    var savedElementSpan = $('<span class="title">' + selected + '</span>');
    var savedElSpanXbtn = $('<button class="btn btn-xs btn-danger remove btn-circle itinXbtn">x</button>');
    
    // Register X button event handler
    savedElSpanXbtn.on('click', function(){
      $(this).parent().remove();
    });

    Div.append(savedElementSpan);
    Div.append(savedElSpanXbtn);

    var elementID = "#" + string + "_Itin";

    $(elementID).append(Div);

    console.log(JSON.parse('['+location+']'));
    func(string, JSON.parse('['+location+']'))

    // if( string === 'hotel' )
    //   func(string, Place.getLocationByID( Hotel.getplaceIDofHotel(selected) ));
    // else if( string === 'restaurant' )
    //   func(string, Place.getLocationByID( Restaurant.getplaceIDofHotel(selected) ));
    // else
    //   func(string, Place.getLocationByID( Activity.getplaceIDofHotel(selected) ));
}

function removeDay(){
  var CurrentDayNum = + $('.current-day').text()
  var currentDayToDelete = '.Day_' + $('.current-day').text();
  console.log($(currentDayToDelete))
  $(currentDayToDelete).remove();
  for(var i=CurrentDayNum+1; i < $('.day-btn').length; i++) {
    console.log(i);
    $('.Day_'+ i).addClass('Day_'+ (i - 1));
    $('.Day_'+ i).removeClass('Day_'+ i);
  }
  $('#day-add').prev().remove();

}

function switchToCurrentDay(){
  $('.current-day').removeClass("current-day");
  $(this).addClass('current-day');
  $('#day-title span').remove();
  $('#day-title').prepend($('<span>Day '+ $(this).text() + '</span>'));
  $('.itinerary-item').css('display', 'none');
  $('.Day_'+ $('.current-day').text()).css('display', 'block')
  // console.log($(this).text())
}

function addNewDay() {
  var newDay = $('.day-btn').length;
  
  var newDayBtn = $('<button class="btn btn-circle day-btn">'+ newDay +'</button>')
  newDayBtn.on('click', switchToCurrentDay );

  $('#day-add').before(newDayBtn);
}

// $(document).ready( function(){

//   $('#hotelsPlusBtn').on('click', function(){
//     addItemToItin('hotel');
//   });

//   $('#restPlusBtn').on('click', function(){
//     addItemToItin('restaurant');
//   });

//   $('#activityPlusBtn').on('click', function(){
//     addItemToItin('activity');
//   });

//   $('#day-add').on('click', function(){
//     addNewDay();
//   });

//   $('.current-day').on('click', switchToCurrentDay );
 
//   $('#day-title button').on('click', removeDay );
  
// });
