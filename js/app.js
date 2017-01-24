(function() {
  "use strict";

  $(".button-collapse").sideNav();
  var mumbai = {
      lat: 19.0760,
      lng: 72.8777
    },
    map = new GoogleMap(mumbai);

  function PlacesViewModel(locations) {
    var self = this;

    self.places = getPlacesObservable(locations);
    self.filteredPlaces = ko.observableArray(self.places());
    self.searchQuery = ko.observable('');

    self.searchQuery.subscribe(function(e) {
      self.filteredPlaces(ko.utils.arrayFilter(self.places(), function(item) {
        if (item.name.toLowerCase().indexOf(e.toLowerCase()) >= 0) {
          item.marker.setVisible(true);
          return true;
        }
        item.marker.setVisible(false);
        return false;
      }));
    });

    self.displayInfo = function(e) {
      map.animateMarker(e.marker);
      map.showTooltip(e.marker, e.name);
    };
  }

  ko.applyBindings(new PlacesViewModel(locations));

  function getPlacesObservable (locations) {
    var placesAndMarkers = locations.map(function(place) {
      return {
        name: place.name,
        lat: place.lat,
        lng: place.lng,
        marker: map.createMarker(place)
      };
    });
    return ko.observableArray(placesAndMarkers);
  }
})();
