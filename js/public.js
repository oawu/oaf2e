/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {

  var $map = $('#map');
  var $summary = $('#summary');
  var $direction = $('#direction');
  var $directionPanel = $('#direction_panel');
  var $travelMode = $('input[type="radio"][name="travel_mode"]');
  var _map = null;
  var _directionsDisplay = null;

  function calcRoute () {
    var start = $('#form').val ();
    var end = $('#to').val ();
    console.error ($travelMode.filter (':checked').val ());
    
    var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode[$travelMode.filter (':checked').val ()],
      // drivingOptions: {
      //   departureTime: new Date (),
      //   trafficModel: google.maps.TrafficModel.PESSIMISTIC
      // }
    };
    new google.maps.DirectionsService ().route (request, function (response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        _directionsDisplay.setDirections (response);
      }
    });
  }

  function computeTotalDistance(result) {
    var time = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++)
      time += myroute.legs[i].duration.text;
    $summary.text ('總時間約：' + time);
  }
  function initialize () {
    _map = new google.maps.Map ($map.get (0), {
        zoom: 11,
        zoomControl: true,
        scrollwheel: true,
        scaleControl: true,
        mapTypeControl: false,
        navigationControl: true,
        streetViewControl: false,
        disableDoubleClickZoom: true,
        center: new google.maps.LatLng (25.04, 121.55),
      });
    
    _map.mapTypes.set ('map_style', new google.maps.StyledMapType ([
      { featureType: 'transit', stylers: [{ visibility: 'off' }] },
      { featureType: 'poi', stylers: [{ visibility: 'off' }] }
    ]));
    _map.setMapTypeId ('map_style');

    _directionsDisplay = new google.maps.DirectionsRenderer ({
      map: _map,
      panel: $directionPanel.get (0),
      // polylineOptions: {
      //   strokeColor: "red"
      // }
    });

    google.maps.event.addListener(_directionsDisplay, 'directions_changed', function() {
      computeTotalDistance(_directionsDisplay.directions);
    });
    // var trafficLayer = new google.maps.TrafficLayer ();
    // trafficLayer.setMap (_map);

    $direction.click (calcRoute);
    $travelMode.change (calcRoute);
  }
  google.maps.event.addDomListener (window, 'load', initialize);
});