(function() {
  this.MicelloMap = (function() {
    var defaultMapOptions;

    defaultMapOptions = {
      lid: null
    };

    function MicelloMap(apiKey, mapViewer) {
      this.apiKey = apiKey;
      this.mapViewer = mapViewer;
      if (this.apiKey === null || this.mapViewer === null) {
        return;
      }
      micello.maps.init(this.apiKey, this.mapInit);
      this._markers = {};
    }

    MicelloMap.prototype.mapInit = function() {
      var mapControl, mapDataObject;
      mapControl = new micello.maps.MapControl(this.mapViewer);
      console.log("" + this.mapViewer);
      console.log("" + this.apiKey);
      mapDataObject = mapControl.getMapData();
      mapDataObject.loadCommunity(24657);
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
