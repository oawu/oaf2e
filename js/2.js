/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 */

$(function () {
  window.func.heatmaps.type = function (types) {
    var d4Types = ['store', 'user'];
    var showTypes = d4Types.filter (function (t) {
      return $.inArray (t, types) !== -1;
    });
    var hideType = d4Types.filter (function (t) {
      return $.inArray (t, types) === -1;
    });
    
    window.vars.heatmaps.keys.forEach (function (t, i) {
      hideType.forEach (function (u) {
        if (typeof window.vars.heatmaps.heats[u][t] != 'undefined') window.vars.heatmaps.heats[u][t].setData ([]);
      });
      showTypes.forEach (function (u) {
        if (!window.vars.heatmaps.data || typeof window.vars.heatmaps.data[u][t] == 'undefined') return false;
        if (typeof window.vars.heatmaps.heats[u][t] == 'undefined') return false;

        var data = window.vars.heatmaps.data[u][t].map (function (t, i) {
          return new google.maps.LatLng (t.a, t.n);
        });
        window.vars.heatmaps.heats[u][t].setData (data);
      });
    });
  };

  window.func.heatmaps.typeAll = function () {
    window.func.heatmaps.type (['store', 'user']);
  };
  window.func.heatmaps.typeStore = function () {
    window.func.heatmaps.type (['store']);
  };
  window.func.heatmaps.typeUser = function () {
    window.func.heatmaps.type (['user']);
  };
  window.func.heatmaps.typeClean = function () {
    window.func.heatmaps.type ();
  };

  window.vars.heatmaps = {
    $: {
      taipei: $('#heatmap_taipei'),
      tainan: $('#heatmap_tainan'),
      taichung: $('#heatmap_taichung'),
      kaohsiung: $('#heatmap_kaohsiung'),

      typeAll: $('#heatmap_all').click (window.func.heatmaps.typeAll),
      typeStore: $('#heatmap_store').click (window.func.heatmaps.typeStore),
      typeUser: $('#heatmap_user').click (window.func.heatmaps.typeUser),
      typeClean: $('#heatmap_clean').click (window.func.heatmaps.typeClean),
      types: window.vars.$.heatmaps.find ('.items a').click (function () { $(this).addClass ('a').siblings ().removeClass ('a'); })
    },
    data: null,
    maps: {},
    heats: {
      store: {},
      user: {}
    },
    mapStyles: {},

    timers: [],
    keys: ['taipei', 'tainan', 'taichung', 'kaohsiung'],

    infos: {
      taipei: {name: '台北', lat: 25.069739982463165, lng: 121.51702880859375, zoom: 11},
      tainan: {name: '台南', lat: 23.00438205746422, lng: 120.2369499206543, zoom: 12},
      taichung: {name: '台中', lat: 24.150043015935513, lng: 120.67331314086914, zoom: 12},
      kaohsiung: {name: '高雄', lat: 22.63682771081092, lng: 120.34440994262695, zoom: 12},
    }
  };

  window.func.heatmaps.resizeMap = function (key) {
    if (typeof window.vars.heatmaps.infos[key] == 'undefined') return false;
    google.maps.event.trigger (window.vars.heatmaps.maps[key], 'resize');
    window.vars.heatmaps.maps[key].setCenter (new google.maps.LatLng (window.vars.heatmaps.infos[key].lat, window.vars.heatmaps.infos[key].lng));
    return window.vars.heatmaps.maps[key];
  };
  window.func.heatmaps.initMap = function (key) {
    if (typeof window.vars.heatmaps.infos[key] == 'undefined') return null;

    var maps = new google.maps.Map (window.vars.heatmaps.$[key].find ('>div').get (0), {zoom: window.vars.heatmaps.infos[key].zoom, center: new google.maps.LatLng (window.vars.heatmaps.infos[key].lat, window.vars.heatmaps.infos[key].lng), backgroundColor: 'rgba(20, 134, 162, 1.00)', draggable: false, zoomControl: false, scrollwheel: false, scaleControl: false, mapTypeControl: false, navigationControl: false, streetViewControl: false, disableDoubleClickZoom: true});
    maps.mapTypes.set ('style2', window.vars.heatmaps.mapStyles.style2);
    maps.setMapTypeId ('style2');
    return maps;
  };

  window.func.heatmaps.initStoreHeatmap = function (key, type) {
    return new google.maps.visualization.HeatmapLayer ({
      data: [],
      map: window.vars.heatmaps.maps[key],
      radius: 20,
      opacity: 0.55
    });
  };
  window.func.heatmaps.initUserHeatmap = function (key, type) {
    return new google.maps.visualization.HeatmapLayer ({
      data: [],
      map: window.vars.heatmaps.maps[key],
      radius: 20,
      opacity: 0.55,
      gradient: ['rgba(0, 255, 255, 0)', 'rgba(0, 255, 255, 1)', 'rgba(0, 191, 255, 1)', 'rgba(0, 127, 255, 1)', 'rgba(0, 63, 255, 1)', 'rgba(0, 0, 255, 1)', 'rgba(0, 0, 223, 1)', 'rgba(0, 0, 191, 1)', 'rgba(0, 0, 159, 1)', 'rgba(0, 0, 127, 1)', 'rgba(63, 0, 91, 1)', 'rgba(127, 0, 63, 1)', 'rgba(191, 0, 31, 1)', 'rgba(255, 0, 0, 1)']
    });
  };
  google.maps.event.addDomListener (window, 'load', function () {
    window.vars.heatmaps.mapStyles = {
      style1: new google.maps.StyledMapType ([{elementType: "labels.icon", stylers:[{ visibility: 'off' }]}, {"featureType": "all", "elementType": "labels.text.fill", "stylers": [{"color":"#ffffff"}]}, {"featureType": "all", "elementType": "labels.text.stroke", "stylers": [{"color":"#000000"},{"lightness":13}]}, {"featureType": "administrative", "elementType": "geometry.fill", "stylers": [{"visibility":"on", "color":"#000000"}]}, {"featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{"visibility":"on", "color":"#144b53"},{"lightness":14},{"weight":1.4}]}, {"featureType": "administrative.locality", "elementType": "all", "stylers": [{"visibility":"off"}]}, {"featureType": "administrative.locality", "elementType": "labels.icon", "stylers": [{"visibility":"off"}]}, {"featureType": "landscape", "elementType": "all", "stylers": [{"color":"#08304b"}]}, {"featureType": "poi", "elementType": "geometry", "stylers": [{"visibility":"off", "color":"#0c4152"},{"lightness":5}]}, {"featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{'visibility': 'off', "color":"#000000"}]}, {"featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{'visibility': 'off', "color":"#0b434f"},{"lightness":25}]}, {"featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{'visibility': 'off', "color":"#000000"}]}, {"featureType": "road.arterial", "elementType": "geometry.stroke", "stylers": [{'visibility': 'off', "color":"#0b3d51"},{"lightness":16}]}, {"featureType": "road.local", "elementType": "geometry", "stylers": [{'visibility': 'off', "color":"#000000"}]}, {"featureType": "transit", "elementType": "all", "stylers": [{'visibility': 'off', "color":"#146474"}]}, {"featureType": "water", "elementType": "all", "stylers": [{"color":"#1e1e1e"}]}]),
      style2: new google.maps.StyledMapType ([{stylers: [{gamma: 0.7}, {weight: 1}, {saturation: 10}]}, {featureType: 'administrative', elementType: 'geometry.fill', stylers: [{'visibility': 'simplified', 'color': '#000000'}]}, {featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{'visibility': 'simplified', 'color': '#144b53'},{'lightness': 14},{'weight': 1.4}]}, {featureType: 'all', stylers: [{ visibility: 'on' }]}, {featureType: 'landscape', stylers: [{ visibility: 'on' }]}, {featureType: 'poi', stylers: [{ visibility: 'off' }]}, {featureType: 'road', stylers: [{ visibility: 'simplified' }]}, {featureType: 'road.arterial', stylers: [{ visibility: 'on' }]}, {featureType: 'transit', stylers: [{ visibility: 'off' }]}, {featureType: 'water', stylers: [{ color: '#b3d1ff', visibility: 'on' }]}, {elementType: "labels.icon", stylers:[{ visibility: 'off' }]}]),
    };

    window.vars.heatmaps.keys.forEach (function (t, i) {
      window.vars.heatmaps.maps[t] = window.func.heatmaps.initMap (t);
      window.vars.heatmaps.heats.store[t] = window.func.heatmaps.initStoreHeatmap (t);
      window.vars.heatmaps.heats.user[t] = window.func.heatmaps.initUserHeatmap (t);
    });
  });

  window.func.loads.heatmaps = function (callback) {
    var data = {
      store: {
        taipei: [{a: 25.069739982463165 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)},],
        tainan: [{a: 23.00438205746422 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1)},],
        taichung: [{a: 24.150043015935513 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.67331314086914 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 24.150043015935513 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.67331314086914 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 24.150043015935513 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.67331314086914 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 24.150043015935513 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.67331314086914 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 24.150043015935513 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.67331314086914 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 24.150043015935513 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.67331314086914 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 24.150043015935513 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.67331314086914 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 24.150043015935513 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.67331314086914 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)},],
        kaohsiung: [{a: 22.63682771081092 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.34440994262695 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 22.63682771081092 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.34440994262695 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 22.63682771081092 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.34440994262695 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 22.63682771081092 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.34440994262695 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 22.63682771081092 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.34440994262695 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 22.63682771081092 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.34440994262695 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 22.63682771081092 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.34440994262695 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 22.63682771081092 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.34440994262695 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)},],
      },
      user: {
        taipei: [{a: 25.069739982463165 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)}, {a: 25.069739982463165 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1), n: 121.51702880859375 + (Math.random () / 9) * (Math.random () > 0.5 ? 1 : -1)},],
        tainan: [{a: 23.00438205746422 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1)}, {a: 23.00438205746422 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1), n: 120.2369499206543 + (Math.random () / 50) * (Math.random () > 0.5 ? 1 : -1)},],
        taichung: [{a: 24.150043015935513 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.67331314086914 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 24.150043015935513 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.67331314086914 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 24.150043015935513 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.67331314086914 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 24.150043015935513 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.67331314086914 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 24.150043015935513 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.67331314086914 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 24.150043015935513 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.67331314086914 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 24.150043015935513 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.67331314086914 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 24.150043015935513 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.67331314086914 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)},],
        kaohsiung: [{a: 22.63682771081092 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.34440994262695 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 22.63682771081092 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.34440994262695 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 22.63682771081092 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.34440994262695 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 22.63682771081092 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.34440994262695 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 22.63682771081092 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.34440994262695 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 22.63682771081092 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.34440994262695 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 22.63682771081092 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.34440994262695 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)}, {a: 22.63682771081092 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1), n: 120.34440994262695 + (Math.random () / 99) * (Math.random () > 0.5 ? 1 : -1)},],
      }
    };

    window.vars.heatmaps.data = data;
    window.vars.heatmaps.$.types.filter ('.a').click ();
  };
  window.func.inits.heatmaps = function () {
    !window.vars.heatmaps.$.types.filter ('.a').length &&  window.vars.heatmaps.$.types.first ().click ();

    window.vars.$.heatmaps.addClass ('step1');

    window.vars.heatmaps.timers.push (setTimeout (function () {
      window.vars.$.heatmaps.addClass ('step2');
      
      window.vars.heatmaps.timers.push (setTimeout (function () {
        window.vars.$.heatmaps.addClass ('step3');
        
        window.vars.heatmaps.timers.push (setTimeout (function () {
          window.vars.$.heatmaps.addClass ('step4');
          
          window.vars.heatmaps.timers.push (setTimeout (function () {
            window.func.loads.heatmaps ();
          }, 450));

          window.vars.heatmaps.timers.push (setTimeout (function () {
            window.vars.heatmaps.keys.forEach (function (t, i) {
              window.func.heatmaps.resizeMap (t);
            });
          }, 450));

          window.vars.heatmaps.timers.push (setTimeout (function () {
            window.vars.$.heatmaps.addClass ('step5');
            
            window.vars.heatmaps.timers.push (setTimeout (function () {
              window.vars.$.heatmaps.addClass ('step6');

              window.vars.heatmaps.timers.push (setTimeout (function () {
                window.vars.$.heatmaps.addClass ('step7');

                window.vars.heatmaps.timers.push (setTimeout (function () {
                  window.vars.$.heatmaps.addClass ('step8');
                }, 2500));
              }, 1500));
            }, 400));
          }, 550));
        }, 650));
      }, 1000));
    }, 350));
  };
  window.func.releases.heatmaps = function () {
    window.vars.$.heatmaps.attr ('class', 'tab_panel');

    window.vars.heatmaps.$.types.removeClass ('a');

    window.vars.heatmaps.timers.forEach (function (t, i) {
      clearTimeout (t);
    });
    window.vars.heatmaps.timers = [];
    window.vars.heatmaps.data = null;
  
    window.vars.heatmaps.keys.forEach (function (t, i) {
      if (typeof window.vars.heatmaps.heats.store[t] == 'undefined') return false;
      window.vars.heatmaps.heats.store[t].setData ([]);
      if (typeof window.vars.heatmaps.heats.user[t] == 'undefined') return false;
      window.vars.heatmaps.heats.user[t].setData ([]);
    });
  };

});