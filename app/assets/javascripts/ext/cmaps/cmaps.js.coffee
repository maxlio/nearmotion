class @MicelloMap
  beacon_pin ={
    src:"beacon_pin.png"
    }
  defaultMapOptions = 
    lid : null
  defaultMarkerOptions =
    mt: micello.maps.markertype.IMAGE
    mr: beacon_pin
  constructor:(@apiKey, @mapViewer) ->
    return if (@apiKey == null || @mapViewer == null)
    micello.maps.init(@apiKey,@mapInit)
    @_markers = {}
  mapInit: ->
    mapControl = new micello.maps.MapControl(@mapViewer)
    alert "#{@mavViewer}"
    mapDataObject = mapControl.getMapData()
    mapDataObject.loadCommunity(15)
    @map = mapDataObject
  currentLevel:(mapObject) ->
    mapObject.getCurrentLevel()
  addMarker: (markerId, posX, posY, lid, options) ->
    return if markerId == undefined
    return if @_markers[markerId] != undefined
    thislevel = @currentLevel()
    defaultMapOptions.lid = thislevel.id
    options = exports.merge( defaultMarkerOptions, (options || {}) )
    markerSettings  = exports.merge( options, {
      
      mx: posX,
      my: posY
      lid:(lid || defaultMapOptions.lid)
      })
    marker = @map.addMarkerOverlay(markerSettings)
    @_markers[markerId] = marker
    
    
    
  
