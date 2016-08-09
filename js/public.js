/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 */
function inherits(e,t){function i(){}i.prototype=t.prototype,e.superClass_=t.prototype,e.prototype=new i,e.prototype.constructor=e}function MarkerLabel_(e,t,i){this.marker_=e,this.handCursorURL_=e.handCursorURL,this.labelDiv_=document.createElement("div"),this.labelDiv_.style.cssText="position: absolute; overflow: hidden;",this.eventDiv_=document.createElement("div"),this.eventDiv_.style.cssText=this.labelDiv_.style.cssText,this.eventDiv_.setAttribute("onselectstart","return false;"),this.eventDiv_.setAttribute("ondragstart","return false;"),this.crossDiv_=MarkerLabel_.getSharedCross(t)}function MarkerWithLabel(e){e=e||{},e.labelContent=e.labelContent||"",e.initCallback=e.initCallback||function(){},e.labelAnchor=e.labelAnchor||new google.maps.Point(0,0),e.labelClass=e.labelClass||"markerLabels",e.labelStyle=e.labelStyle||{},e.labelInBackground=e.labelInBackground||!1,"undefined"==typeof e.labelVisible&&(e.labelVisible=!0),"undefined"==typeof e.raiseOnDrag&&(e.raiseOnDrag=!0),"undefined"==typeof e.clickable&&(e.clickable=!0),"undefined"==typeof e.draggable&&(e.draggable=!1),"undefined"==typeof e.optimized&&(e.optimized=!1),e.crossImage=e.crossImage||"http"+("https:"===document.location.protocol?"s":"")+"://maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png",e.handCursor=e.handCursor||"http"+("https:"===document.location.protocol?"s":"")+"://maps.gstatic.com/intl/en_us/mapfiles/closedhand_8_8.cur",e.optimized=!1,this.label=new MarkerLabel_(this,e.crossImage,e.handCursor),google.maps.Marker.apply(this,arguments)}inherits(MarkerLabel_,google.maps.OverlayView),MarkerLabel_.getSharedCross=function(e){var t;return"undefined"==typeof MarkerLabel_.getSharedCross.crossDiv&&(t=document.createElement("img"),t.style.cssText="position: absolute; z-index: 1000002; display: none;",t.style.marginLeft="-8px",t.style.marginTop="-9px",t.src=e,MarkerLabel_.getSharedCross.crossDiv=t),MarkerLabel_.getSharedCross.crossDiv},MarkerLabel_.prototype.onAdd=function(){var e,t,i,s,a,r,o,n=this,l=!1,g=!1,p=20,_="url("+this.handCursorURL_+")",v=function(e){e.preventDefault&&e.preventDefault(),e.cancelBubble=!0,e.stopPropagation&&e.stopPropagation()},h=function(){n.marker_.setAnimation(null)};this.getPanes().overlayImage.appendChild(this.labelDiv_),this.getPanes().overlayMouseTarget.appendChild(this.eventDiv_),"undefined"==typeof MarkerLabel_.getSharedCross.processed&&(this.getPanes().overlayImage.appendChild(this.crossDiv_),MarkerLabel_.getSharedCross.processed=!0),this.listeners_=[google.maps.event.addDomListener(this.eventDiv_,"mouseover",function(e){(n.marker_.getDraggable()||n.marker_.getClickable())&&(this.style.cursor="pointer",google.maps.event.trigger(n.marker_,"mouseover",e))}),google.maps.event.addDomListener(this.eventDiv_,"mouseout",function(e){!n.marker_.getDraggable()&&!n.marker_.getClickable()||g||(this.style.cursor=n.marker_.getCursor(),google.maps.event.trigger(n.marker_,"mouseout",e))}),google.maps.event.addDomListener(this.eventDiv_,"mousedown",function(e){g=!1,n.marker_.getDraggable()&&(l=!0,this.style.cursor=_),(n.marker_.getDraggable()||n.marker_.getClickable())&&(google.maps.event.trigger(n.marker_,"mousedown",e),v(e))}),google.maps.event.addDomListener(document,"mouseup",function(t){var i;if(l&&(l=!1,n.eventDiv_.style.cursor="pointer",google.maps.event.trigger(n.marker_,"mouseup",t)),g){if(a){i=n.getProjection().fromLatLngToDivPixel(n.marker_.getPosition()),i.y+=p,n.marker_.setPosition(n.getProjection().fromDivPixelToLatLng(i));try{n.marker_.setAnimation(google.maps.Animation.BOUNCE),setTimeout(h,1406)}catch(r){}}n.crossDiv_.style.display="none",n.marker_.setZIndex(e),s=!0,g=!1,t.latLng=n.marker_.getPosition(),google.maps.event.trigger(n.marker_,"dragend",t)}}),google.maps.event.addListener(n.marker_.getMap(),"mousemove",function(s){var _;l&&(g?(s.latLng=new google.maps.LatLng(s.latLng.lat()-t,s.latLng.lng()-i),_=n.getProjection().fromLatLngToDivPixel(s.latLng),a&&(n.crossDiv_.style.left=_.x+"px",n.crossDiv_.style.top=_.y+"px",n.crossDiv_.style.display="",_.y-=p),n.marker_.setPosition(n.getProjection().fromDivPixelToLatLng(_)),a&&(n.eventDiv_.style.top=_.y+p+"px"),google.maps.event.trigger(n.marker_,"drag",s)):(t=s.latLng.lat()-n.marker_.getPosition().lat(),i=s.latLng.lng()-n.marker_.getPosition().lng(),e=n.marker_.getZIndex(),r=n.marker_.getPosition(),o=n.marker_.getMap().getCenter(),a=n.marker_.get("raiseOnDrag"),g=!0,n.marker_.setZIndex(1e6),s.latLng=n.marker_.getPosition(),google.maps.event.trigger(n.marker_,"dragstart",s)))}),google.maps.event.addDomListener(document,"keydown",function(e){g&&27===e.keyCode&&(a=!1,n.marker_.setPosition(r),n.marker_.getMap().setCenter(o),google.maps.event.trigger(document,"mouseup",e))}),google.maps.event.addDomListener(this.eventDiv_,"click",function(e){(n.marker_.getDraggable()||n.marker_.getClickable())&&(s?s=!1:(google.maps.event.trigger(n.marker_,"click",e),v(e)))}),google.maps.event.addDomListener(this.eventDiv_,"dblclick",function(e){(n.marker_.getDraggable()||n.marker_.getClickable())&&(google.maps.event.trigger(n.marker_,"dblclick",e),v(e))}),google.maps.event.addListener(this.marker_,"dragstart",function(e){g||(a=this.get("raiseOnDrag"))}),google.maps.event.addListener(this.marker_,"drag",function(e){g||a&&(n.setPosition(p),n.labelDiv_.style.zIndex=1e6+(this.get("labelInBackground")?-1:1))}),google.maps.event.addListener(this.marker_,"dragend",function(e){g||a&&n.setPosition(0)}),google.maps.event.addListener(this.marker_,"position_changed",function(){n.setPosition()}),google.maps.event.addListener(this.marker_,"zindex_changed",function(){n.setZIndex()}),google.maps.event.addListener(this.marker_,"visible_changed",function(){n.setVisible()}),google.maps.event.addListener(this.marker_,"labelvisible_changed",function(){n.setVisible()}),google.maps.event.addListener(this.marker_,"title_changed",function(){n.setTitle()}),google.maps.event.addListener(this.marker_,"labelcontent_changed",function(){n.setContent()}),google.maps.event.addListener(this.marker_,"labelanchor_changed",function(){n.setAnchor()}),google.maps.event.addListener(this.marker_,"labelclass_changed",function(){n.setStyles()}),google.maps.event.addListener(this.marker_,"labelstyle_changed",function(){n.setStyles()})]},MarkerLabel_.prototype.onRemove=function(){var e;for(this.labelDiv_.parentNode.removeChild(this.labelDiv_),this.eventDiv_.parentNode.removeChild(this.eventDiv_),e=0;e<this.listeners_.length;e++)google.maps.event.removeListener(this.listeners_[e])},MarkerLabel_.prototype.draw=function(){this.setContent(),this.setTitle(),this.setStyles()},MarkerLabel_.prototype.setContent=function(){var e=this.marker_.get("labelContent");"undefined"==typeof e.nodeType?(this.labelDiv_.innerHTML=e,this.eventDiv_.innerHTML=this.labelDiv_.innerHTML):(this.labelDiv_.innerHTML="",this.labelDiv_.appendChild(e),e=e.cloneNode(!0),this.eventDiv_.innerHTML="",this.eventDiv_.appendChild(e))},MarkerLabel_.prototype.setTitle=function(){this.eventDiv_.title=this.marker_.getTitle()||""},MarkerLabel_.prototype.setStyles=function(){var e,t;this.labelDiv_.className=this.marker_.get("labelClass"),this.eventDiv_.className=this.labelDiv_.className,this.labelDiv_.style.cssText="",this.eventDiv_.style.cssText="",t=this.marker_.get("labelStyle");for(e in t)t.hasOwnProperty(e)&&(this.labelDiv_.style[e]=t[e],this.eventDiv_.style[e]=t[e]);this.setMandatoryStyles()},MarkerLabel_.prototype.setMandatoryStyles=function(){this.labelDiv_.style.position="absolute",this.labelDiv_.style.overflow="","undefined"!=typeof this.labelDiv_.style.opacity&&""!==this.labelDiv_.style.opacity&&(this.labelDiv_.style.MsFilter='"progid:DXImageTransform.Microsoft.Alpha(opacity='+100*this.labelDiv_.style.opacity+')"',this.labelDiv_.style.filter="alpha(opacity="+100*this.labelDiv_.style.opacity+")"),this.eventDiv_.style.position=this.labelDiv_.style.position,this.eventDiv_.style.overflow=this.labelDiv_.style.overflow,this.eventDiv_.style.opacity=.01,this.eventDiv_.style.MsFilter='"progid:DXImageTransform.Microsoft.Alpha(opacity=1)"',this.eventDiv_.style.filter="alpha(opacity=1)",this.setAnchor(),this.setPosition(),this.setVisible()},MarkerLabel_.prototype.setAnchor=function(){var e=this.marker_.get("labelAnchor");this.labelDiv_.style.marginLeft=-e.x+"px",this.labelDiv_.style.marginTop=-e.y+"px",this.eventDiv_.style.marginLeft=-e.x+"px",this.eventDiv_.style.marginTop=-e.y+"px"},MarkerLabel_.prototype.setPosition=function(e){var t=this.getProjection().fromLatLngToDivPixel(this.marker_.getPosition());"undefined"==typeof e&&(e=0),this.labelDiv_.style.left=Math.round(t.x)+"px",this.labelDiv_.style.top=Math.round(t.y-e)+"px",this.eventDiv_.style.left=this.labelDiv_.style.left,this.eventDiv_.style.top=this.labelDiv_.style.top,this.setZIndex()},MarkerLabel_.prototype.setZIndex=function(){var e=this.marker_.get("labelInBackground")?-1:1;"undefined"==typeof this.marker_.getZIndex()?(this.labelDiv_.style.zIndex=parseInt(this.labelDiv_.style.top,10)+e,this.eventDiv_.style.zIndex=this.labelDiv_.style.zIndex):(this.labelDiv_.style.zIndex=this.marker_.getZIndex()+e,this.eventDiv_.style.zIndex=this.labelDiv_.style.zIndex)},MarkerLabel_.prototype.setVisible=function(){this.marker_.get("labelVisible")?this.labelDiv_.style.display=this.marker_.getVisible()?"block":"none":this.labelDiv_.style.display="none",this.eventDiv_.style.display=this.labelDiv_.style.display;var e=this.marker_.get("initCallback");e(this.labelDiv_)},inherits(MarkerWithLabel,google.maps.Marker),MarkerWithLabel.prototype.setMap=function(e){google.maps.Marker.prototype.setMap.apply(this,arguments),this.label.setMap(e)};

Array.prototype.column = function (k) { return this.map (function (t) { return k ? eval ("t." + k) : t; }); };
Array.prototype.diff = function (a, k) { return this.filter (function (i) { return a.column (k).indexOf (eval ("i." + k)) < 0; }); };
Array.prototype.max = function (k) { return Math.max.apply (null, this.column (k)); };
Array.prototype.min = function (k) { return Math.min.apply (null, this.column (k)); };

function getStorage (key) { return ((typeof (Storage) !== 'undefined') && (value = localStorage.getItem (key)) && (value = JSON.parse (value))) ? value : undefined; }
function setStorage (key, data) { if (typeof (Storage) !== 'undefined') { localStorage.setItem (key, JSON.stringify (data)); return true; } return false; }

$(function () {
  window.vars = {};
  window.vars.$maps = $('#maps');
  window.vars.$menus = $('#menus');
  window.vars.$form = $('#form').each (function () {
    var $that = $(this);
    var $sub = $that.find ('.sub');
    var $add = $that.find ('.add');
    var $input = $that.find ('input');
    var $prev = $that.find ('.prev');
    var $next = $that.find ('.next');

    $prev.click (function () { window.vars.$a.filter ('.a').prev ().click (); });
    $next.click (function () { window.vars.$a.filter ('.a').next ().click (); });

    $sub.click (function () {
      var $input = $(this).next ();
      var val = parseInt ($input.val (), 10) - 1;
      if (val < 0) return false;
      if (val == 0) $(this).attr ('disabled', 'disabled');
      $input.val (val);

      window.funs.updateVal ($that, $(this).parent ().attr ('class'), $input.val ());
    });
    $add.click (function () {
      var $input = $(this).prev ();
      var $s = $input.prev ();
      $input.val (parseInt ($input.val (), 10) + 1);
      if ($input.val () > 0) $s.removeAttr ('disabled');

      window.funs.updateVal ($that, $(this).parent ().attr ('class'), $input.val ());
    });
    $input.change (function () {
      window.funs.updateVal ($that, $(this).parent ().attr ('class'), $(this).val ());
    });
  });

  window.vars.$a = $('#menus a').click (function () {

    window.funs.formReset ();
    $(this).addClass ('a').siblings ().removeClass ('a');
    
    window.vars.$menus.stop ().animate ({scrollTop: $(this).index () * 45});
    
    var info = $(this).data ('info');
    window.funs.setLocation (info.id, new google.maps.LatLng (info.lat, info.lng), function (store) {
      window.funs.formInit (store, $(this));
    });
  });

  window.vars.marker = null;

  window.funs = {};
  window.funs.ajaxError = function (result) { console.error (result.responseText); };
  window.funs.formInit = function (store, $a) {
    window.vars.$form.data ('info', store);
    window.vars.$form.find ('.name').text (store.name);
    window.vars.$form.find ('.store input').val (store.store);
    window.vars.$form.find ('.gym input').val (store.gym);
    window.vars.$form.find (".tip").text ('').removeClass ('r');

    if (!window.vars.$a.filter ('.a').prev ().length) window.vars.$form.find (".prev").attr ('disabled', 'disabled');
    else window.vars.$form.find (".prev").removeAttr ('disabled');
    if (!window.vars.$a.filter ('.a').next ().length) window.vars.$form.find (".next").attr ('disabled', 'disabled');
    else window.vars.$form.find (".next").removeAttr ('disabled');

    window.vars.$form.addClass ('s');
    if (store.store > 0) window.vars.$form.find (".store .sub").removeAttr ('disabled');
    if (store.gym > 0) window.vars.$form.find (".gym .sub").removeAttr ('disabled');
  }
  window.funs.updateVal = function ($form, type, val, callback) {
    var $tip = $form.find ('.tip').removeClass ('r');
    $.ajax ({ url: 'update.php?t=' + new Date ().getTime (),
      data: {
        id: $form.data ('info').id,
        type: type,
        val: val,
      }, async: true, cache: false, dataType: 'json', type: 'POST',
      beforeSend: function () { $tip.text ('讀取中..').removeClass ('r'); }
    })
    .done (function (result) {  $tip.text ('更新成功').removeClass ('r'); })
    .fail (function (result) {  $tip.text ('更新失敗！').addClass ('r'); });
  }
  window.funs.formReset = function () {
    window.vars.$form.data ('info', {}).removeClass ('s').find ('.name').text ('');
    window.vars.$form.find ("input").val (0);
    window.vars.$form.find (".tip").text ('讀取中..').removeClass ('r');
    window.vars.$form.find (".sub").attr ('disabled', 'disabled');
  }

  window.funs.setLocation = function (id, latLng, callback) {
    $.ajax ({
      url: 'set.php?t=' + new Date ().getTime (),
      data: {
        id: id,
        lat: latLng.lat (),
        lng: latLng.lng ()
      },
      async: true, cache: false, dataType: 'json', type: 'post',
      beforeSend: function () {
        window.funs.formReset ();
        window.vars.marker.setMap (window.vars.maps);
        window.vars.marker.setPosition (latLng);
        window.vars.maps.setCenter (latLng);
      }
    })
    .done (function (result) {
      callback && callback (result);
    }.bind (this))
    .fail (function (result) { window.funs.ajaxError (result); })
    .complete (function (result) {});
  }

  google.maps.event.addDomListener (window, 'load', function () {
    var lastMaps = {
      zoom: 16,
      lat: 25.056678157775092,
      lng: 121.53488159179688,
    };

    window.vars.maps = new google.maps.Map (window.vars.$maps.get (0), {
      zoom: lastMaps.zoom, zoomControl: true, scrollwheel: true, scaleControl: true, mapTypeControl: false, navigationControl: true, streetViewControl: false, disableDoubleClickZoom: true,
      center: new google.maps.LatLng (lastMaps.lat, lastMaps.lng)}
      );

    window.vars.maps.mapTypes.set ('map_style', new google.maps.StyledMapType ([{featureType: 'all', stylers: [{ visibility: 'on' }]}, {featureType: 'administrative', stylers: [{ visibility: 'simplified' }]}, {featureType: 'landscape', stylers: [{ visibility: 'simplified' }]}, {featureType: 'poi', stylers: [{ visibility: 'simplified' }]}, {featureType: 'road', stylers: [{ visibility: 'simplified' }]}, {featureType: 'road.arterial', stylers: [{ visibility: 'simplified' }]}, {featureType: 'transit', stylers: [{ visibility: 'simplified' }]}, {featureType: 'water', stylers: [{ color: '#b3d1ff', visibility: 'simplified' }]}, {elementType: "labels.icon", stylers:[{ visibility: 'off' }]}]));
    window.vars.maps.setMapTypeId ('map_style');
    window.vars.marker = new MarkerWithLabel ({
      draggable: false,
      raiseOnDrag: false,
      clickable: false,
    });
  });
});