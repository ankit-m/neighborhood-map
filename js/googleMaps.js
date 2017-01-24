var GoogleMap = function(location) {
  this.location = location;
  this.googleMap = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: this.location
  });
};

GoogleMap.prototype.createMarker = function(place) {
  var self = this;
  var pos = {
    lat: place.lat,
    lng: place.lng
  };
  var marker = new google.maps.Marker({position: pos, map: this.googleMap, animation: google.maps.Animation.DROP});
  marker.addListener('click', function() {
    self.animateMarker(marker);
    self.showTooltip(marker, place.name);
  });
  return marker;
};

GoogleMap.prototype.animateMarker = function(marker) {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    // stop animation after one bounce
    setTimeout(function() {
      marker.setAnimation(null);
    }, 700);
  }
};

GoogleMap.prototype.showTooltip = function(marker, name) {
  var query = encodeURIComponent(name);
  $.getJSON("https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=175&titles=" + query + "&format=json&callback=?", function(data) {
    var response = data.query.pages,
      infowindow = new google.maps.InfoWindow({
        content: response[Object.keys(response)[0]].extract,
        maxWidth: 250
      });
    infowindow.open(this.googleMap, marker);
  })
  .fail(function(e) {
    alert('An error occured while getting data from Wikipedia. Please refresh or check your internet connection.');
  });
};
