class @MicelloMap
  @ApiKey = ''
  @mapViewer = ''
  defaultMapOptions = 
    lid : null 
  constructor:(apikey,mapContainer) ->
    return if (apikey == '' || mapContainer == '')
    @mapViewer = mapContainer
    @ApiKey = apikey
    micello.maps.init(@ApiKey,@mapInit)
    @_markers = {}
  mapInit: ->
    mapControl = new micello.maps.MapControl(@mapViewer)
    mapDataObject = mapControl.getMapData()
    mapDataObject.loadCommunity(24657)
  currentLevel:(mapObject) ->
    mapObject.getCurrentLevel()
  addMarker: (markerId, posX, posY, lid, options) ->
    return if markerId == undefined
    return if @_markers[markerId] != undefined
    thislevel = @currentLevel()
    defaultMapOptions.lid = thislevel.id
    options = exports.merge( defaultMarkerOptions, (options || {}) )
    markerSettings  = exports.merge( options, {
      mt: micello.maps.markertype.IMAGE
      mr: @beacon_pin
      mx: posX,
      my: posY
      lid:(lid || defaultMapOptions.lid)
      })
    marker = @map.addMarkerOverlay(markerSettings)
    @_markers[markerId] = marker
    
    
    
  
