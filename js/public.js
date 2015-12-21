/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {

  var $map = $('#map');
  var $switch = $('#switch');
  var $summary = $('#summary');
  var $direction = $('#direction');
  var $directionPanel = $('#direction_panel');
  var $travelMode = $('input[type="radio"][name="travel_mode"]');
  var _map = null;
  var _trafficLayer = null;
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
    _trafficLayer = new google.maps.TrafficLayer ();
    // 

    $direction.click (calcRoute);
    $travelMode.change (calcRoute);
    $switch.change (function () {
      if ($(this).prop ('checked') === true) {
        $(this).nextAll ('label').text ('交通狀況(開啟)');
        _trafficLayer.setMap (_map);
      } else {
        $(this).nextAll ('label').text ('交通狀況(關閉)');
        _trafficLayer.setMap (null);
      }
    });
  }
  google.maps.event.addDomListener (window, 'load', initialize);
});