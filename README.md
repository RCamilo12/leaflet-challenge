# leaflet-challenge
In this project we create a map to show the differents earthquakes that have been reported in the past 7days accross the world. The used data belongs to the USGS and it can be found in this link: 

-https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

There were four functions created for this process:
- createMap function that allowed us to create all the layers and display our map.
- legends funcion allowed us to create the legend of the map by looping the data through some intervals and creating labels for it.
- getColor function allowed us to sort the depth values into different colors to display.
- createMarkers function which loops through the USGS's API to obtain the points and information for the markers.


Part two of this challenge was attemped fetching the GeoJSON file of the tectonic plates, however an CORS error was found in the console and I was not able to fix it.