$ ->
  beaconForm = new Beacon($('.beacon-form'), '#beacon-map', $('#beacon_location'), $('#beacon_lat'), $('#beacon_lng'))

  if beaconForm.isActive()
    beaconForm.updateMarker()
    beaconForm.updateAddress()

  beaconTable = new BeaconTable($('.beacons-table'))

