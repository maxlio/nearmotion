/*
 Copyright (c) 2015, Upnext Technologies Sp. z o.o.
 All rights reserved.

 This source code is licensed under the BSD 3-Clause License found in the
 LICENSE.txt file in the root directory of this source tree.
*/


(function() {
  this.Map = (function() {
    var defaultBehaviourOpts, defaultMapOptions, defaultMarkerOptions;

    defaultMapOptions = {
      lat: 52.31,
      lng: 13.24,
      zoom: 18,
      scrollwheel: true,
      streetViewControl: false,
      panControl: false,
      mapTypeControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    defaultMarkerOptions = {
      animation: google.maps.Animation.DROP,
      draggable: false
    };

    defaultBehaviourOpts = {
      extendBoundsOnMarkerAdd: true
    };

    function Map(mapContainer, options, behaviourOpts) {
      this.mapContainer = mapContainer;
      if (this.mapContainer === null) {
        return;
      }
      this._markers = {};
      this.behaviourOpts = exports.merge(defaultBehaviourOpts, behaviourOpts || {});
      if (options === void 0) {
        options = defaultMapOptions;
      } else {
        options = exports.merge(defaultMapOptions, options);
      }
      options = exports.merge(options, {
        div: this.mapContainer
      });
      this.map = new GMaps(options);
      this._bounds = new google.maps.LatLngBounds();
    }

    Map.prototype.addMarker = function(markerId, lat, lng, options) {
      var dragCallback, dragFun, marker, markerSettings;
      if (markerId === void 0) {
        return;
      }
      if (this._markers[markerId] !== void 0) {
        return;
      }
      options = exports.merge(defaultMarkerOptions, options || {});
      markerSettings = exports.merge(options, {
        lat: lat || defaultMapOptions.lat,
        lng: lng || defaultMapOptions.lng
      });
      marker = this.map.addMarker(markerSettings);
      this._markers[markerId] = marker;
      if (this.behaviourOpts.extendBoundsOnMarkerAdd || options.extendBoundsOnMarkerAdd) {
        this.extendBounds(marker);
      }
      if (markerSettings.draggable === true && markerSettings.dragCallback !== void 0 && markerSettings.dragCallbackError !== void 0) {
        dragFun = this.getAddressByCoordinates;
        dragCallback = function(marker) {
          var latlng;
          latlng = marker.latLng;
          return dragFun(latlng.lat(), latlng.lng(), options.dragCallback, options.dragCallbackError);
        };
        google.maps.event.addListener(marker, 'dragend', dragCallback);
      }
      return marker;
    };

    Map.prototype.addMarkerWithAddress = function(markerId, address, callback, options) {
      var fail, success,
        _this = this;
      success = function(latlng) {
        _this.addMarker(markerId, latlng.lat(), latlng.lng(), options);
        return callback(latlng.lat(), latlng.lng());
      };
      fail = function() {};
      return this.geocode(address, success, fail);
    };

    Map.prototype.updateMarker = function(markerId, lat, lng, options) {
      var k, latlng, marker, _ref, _results;
      latlng = new google.maps.LatLng(lat, lng);
      marker = this.getMarkerById(markerId);
      marker.setPosition(latlng);
      marker.infoWindow.setContent(options.infoWindow.content);
      this._bounds = new google.maps.LatLngBounds();
      _ref = this._markers;
      _results = [];
      for (k in _ref) {
        marker = _ref[k];
        _results.push(this.extendBounds(marker));
      }
      return _results;
    };

    Map.prototype.updateMarkerWithAddress = function(markerId, address, options) {
      var fail, success,
        _this = this;
      success = function(latlng) {
        return _this.updateMarker(markerId, latlng.lat(), latlng.lng(), options);
      };
      fail = function(results) {};
      return this.geocode(address, success, fail);
    };

    Map.prototype.removeMarker = function(markerId) {
      this._markers[markerId].setMap(null);
      return delete this._markers[markerId];
    };

    Map.prototype.clearMarkers = function() {
      this.map.removeMarkers();
      return this._markers = {};
    };

    Map.prototype.getMarkersCount = function() {
      var count, i;
      count = 0;
      for (i in this._markers) {
        if (this._markers.hasOwnProperty(i)) {
          count++;
        }
      }
      return count;
    };

    Map.prototype.getMarkers = function() {
      return this._markers;
    };

    Map.prototype.getMarkerById = function(markerId) {
      return this._markers[markerId];
    };

    Map.prototype.extendBounds = function(marker) {
      if (this.getMarkersCount() === 1) {
        return this.map.setCenter(marker.getPosition().lat(), marker.getPosition().lng());
      } else {
        this._bounds.extend(new google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng()));
        return this.fitBounds();
      }
    };

    Map.prototype.fitBounds = function() {
      return this.map.fitBounds(this._bounds);
    };

    Map.prototype.addToBounds = function(marker) {
      return this._bounds.extend(new google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng()));
    };

    Map.prototype.geocode = function(address, successCallback, errorCallback) {
      return GMaps.geocode({
        address: address,
        callback: function(results, status) {
          var latlng;
          if (status === 'OK') {
            latlng = results[0].geometry.location;
            return successCallback(latlng);
          } else {
            if (errorCallback !== void 0) {
              return errorCallback();
            }
          }
        }
      });
    };

    Map.prototype.setCenter = function(lat, lng) {
      return this.map.setCenter(lat, lng);
    };

    Map.prototype.getAddressByCoordinates = function(lat, lng, successCallback, errorCallback) {
      var _this = this;
      return new Promise(function(resolve, reject) {
        var geocoderApi, latlng;
        latlng = new google.maps.LatLng(lat, lng);
        geocoderApi = new google.maps.Geocoder();
        return geocoderApi.geocode({
          'latLng': latlng
        }, function(results, status) {
          if (status === 'OK') {
            resolve({
              results: results,
              latitude: lat,
              longitude: lng
            });
            if (typeof successCallback === 'function') {
              return successCallback(results, lat, lng);
            }
          } else {
            reject(new Error('Couldn\'t fetch coordinates'));
            if (typeof errorCallback === 'function') {
              return errorCallback();
            } else {
              return alert("Couldn't fetch coordinates");
            }
          }
        });
      });
    };

    Map.prototype.getCurrentPosition = function(lat, lng) {
      var _this = this;
      lat = parseFloat(lat != null ? lat : '');
      lng = parseFloat(lng != null ? lng : '');
      return new Promise(function(resolve, reject) {
        if (!isNaN(lat) && !isNaN(lng)) {
          return resolve({
            coords: {
              latitude: lat,
              longitude: lng
            }
          });
        } else if (navigator.geolocation) {
          return navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true
          });
        } else {
          return reject(new Error('Browser does not support geolocation'));
        }
      });
    };

    Map.prototype.addMarkerToCurrentPosition = function(markerId, lat, lng, options) {
      var _this = this;
      return this.getCurrentPosition(lat, lng).then(function(pos) {
        return _this.addMarker(markerId, pos.coords.latitude, pos.coords.longitude, options);
      })["catch"](function(positionError) {
        return _this.addMarker(markerId, lat, lng, options);
      });
    };

    return Map;

  })();

}).call(this);
