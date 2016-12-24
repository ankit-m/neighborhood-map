(function(){
  "use strict";
  $(".button-collapse").sideNav();
  var places = [
    {
      name: 'Gateway of India',
      lat: 18.9220,
      lng: 72.8347
    },
    {
      name: 'Sanjay Gandhi National Park',
      lat: 19.2147,
      lng: 72.9106
    }
  ];

  function PlacesViewModel(places) {
    this.places = ko.observableArray(places);
  }
  function initMap() {
    var mumbai = {
      lat: 19.0760,
      lng: 72.8777
    };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: mumbai
    });
    places.forEach(function(place) {
      var pos = {
        lat: place.lat,
        lng: place.lng
      };
      var marker = new google.maps.Marker({
        position: pos,
        map: map
      });
    });
  }
  initMap();
  ko.applyBindings(new PlacesViewModel(places));
})();
