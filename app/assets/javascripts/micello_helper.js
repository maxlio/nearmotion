(function() {
  this.micelloHelper = (function() {
    micelloHelper.mapObj;

    micelloHelper._markers = {};

    micelloHelper.markerstruct = {
      "mt": null,
      "mr": "BluePin",
      "mx": null,
      "my": null,
      "lid": null,
      "idat": '',
      "anm": "Pins"
    };

    function micelloHelper(mapObj) {
      if (mapObj === null) {
        return;
      }
      this.mapObj = mapObj;
    }

    micelloHelper.prototype.currentLevel = function() {
      var currentlevel;
      if (this.mapObj === null) {
        return;
      }
      return currentlevel = this.mapObj.getCurrentLevel();
    };

    micelloHelper.prototype.addMarker = function(posX, posY, lid, beacon_name, type) {
      var marker, markersetting, thislevel;
      thislevel = this.currentLevel();
      markersetting = {
      "mt": type,
      "mr": "BluePin",
      "mx": posX,
      "my": posY,
      "lid": lid,
      "idat": beacon_name,
      "anm": "Pins"
    };
      return marker = this.mapObj.addMarkerOverlay(markersetting);
    };

    micelloHelper.prototype.clearAll = function() {
      if (this.mapObj === null) {
        return;
      }
      return this.mapObj.removeMarkerOverlay("Pins", true);
    };

    return micelloHelper;

  })();

}).call(this);
