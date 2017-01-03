(function() {
  this.MicelloMap = (function() {
    var beacon_pin, defaultMapOptions, defaultMarkerOptions;

    beacon_pin = {
      src: "beacon_pin.png"
    };

    defaultMapOptions = {
      lid: null
    };

    defaultMarkerOptions = {
      mt: micello.maps.markertype.IMAGE,
      mr: beacon_pin
    };

    function MicelloMap(apiKey, mapViewer) {
      if (apiKey === null || mapViewer === null) {
        return;
      }
      micello.maps.init(apiKey, this.mapInit(mapViewer));
      this._markers = {};
    }

    MicelloMap.prototype.mapInit = function(mapViewer) {
      var mapControl, mapDataObject;
      mapControl = new micello.maps.MapControl(mapViewer);
      alert("" + this.mavViewer);
      mapDataObject = mapControl.getMapData();
      mapDataObject.loadCommunity(15);
      return this.map = mapDataObject;
    };

    MicelloMap.prototype.currentLevel = function(mapObject) {
      return mapObject.getCurrentLevel();
    };

    MicelloMap.prototype.addMarker = function(markerId, posX, posY, lid, options) {
      var marker, markerSettings, thislevel;
      if (markerId === void 0) {
        return;
      }
      if (this._markers[markerId] !== void 0) {
        return;
      }
      thislevel = this.currentLevel();
      defaultMapOptions.lid = thislevel.id;
      options = exports.merge(defaultMarkerOptions, options || {});
      markerSettings = exports.merge(options, {
        mx: posX,
        my: posY,
        lid: lid || defaultMapOptions.lid
      });
      marker = this.map.addMarkerOverlay(markerSettings);
      return this._markers[markerId] = marker;
    };

    return MicelloMap;

  })();

}).call(this);
