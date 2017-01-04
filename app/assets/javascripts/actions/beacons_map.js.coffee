###
 Copyright (c) 2015, Upnext Technologies Sp. z o.o.
 All rights reserved.

 This source code is licensed under the BSD 3-Clause License found in the
 LICENSE.txt file in the root directory of this source tree. 
###

ready =  ->
  if $("#beacons-map").length > 0 
    map = new MicelloMap('rrVDMQe2qjBRuJP5dXv59kAeK77SD7','beacons-map')  
$(document).ready(ready)
$(document).on('page:load',ready)
