class @MicelloMap
  @ApiKey = 'rrVDMQe2qjBRuJP5dXv59kAeK77SD7'
  @mapViewer = ''
  defaultMapOptions = 
    lid : null 
  constructor:(@mapViewer) ->
    return if (@apiKey == null || @mapViewer == '')
    micello.maps.init(@apiKey,@mapInit)
    @_markers = {}
  mapInit: ->
    mapControl = new micello.maps.MapControl(@mapViewer)
    console.log @mapViewer
    console.log @apiKey 
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
    
    
    
  
