class @micelloHelper
  @mapObj
  @_markers = {}
  @markerstruct = {
      "mt": micello.maps.markertype.NAMED,
      "mr": BluePin,
      "mx": null,
      "my": null,
      "lid":null,
      "idat":'',
      "anm":"Pins"
      }
  constructor (mapObj) ->
    return if mapObj == null 
    @mapObj = mapObj
  @currentLevel ->
    return if @mapObj == null
    currentlevel = @mapObj.getCurrentLevel()
  @addMarker(markerId, posX, posY, lid,beacon_name) ->
    return if markerId == undefined
    return if @_markers[markerId] != undefined
    thislevel = @currentLevel()
    markersetting = @markerstruct
    markersetting.lid = thislevel.id
    markersetting.mx = posX
    markersetting.my = posY
    markersetting.idat = beacon_name
    marker = @mapObj.addMarkerOverlay(markersetting)
    @_markers[markerId] = marker
  @clearAll ->
    return if @mapObj == null
    @mapObj.removeMarkerOverlay("Pins",true)
    
    
