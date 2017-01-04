(function() {
  this.MicelloMap = (function() {
    var defaultMapOptions;

    MicelloMap.ApiKey = '';

    MicelloMap.mapViewer = '';

    defaultMapOptions = {
      lid: null
    };

    function MicelloMap(apikey, mapContainer) {
      if (apikey === '' || mapContainer === '') {
        return;
      }
      this.mapViewer = mapContainer;
      this.ApiKey = apikey;
      micello.maps.init(this.ApiKey, this.mapInit);
      this._markers = {};
    }

    MicelloMap.prototype.mapInit = function() {
      var mapControl, mapDataObject;
      mapControl = new micello.maps.MapControl(this.mapViewer);
      mapDataObject = mapControl.getMapData();
      return mapDataObject.loadCommunity(24657);
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
        mt: micello.maps.markertype.IMAGE,
        mr: this.beacon_pin,
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
