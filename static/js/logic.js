
function createMap(earthquakes) {

    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Create a baseMaps object to hold the streetmap layer.
    let baseMaps = {
      "Street Map": streetmap,
    };
    // Create an overlayMaps object to hold the earthquakes layer.
    let overlayMaps = {
      "Earthquakes": earthquakes
    };

    // Create the map object with options.
    let map = L.map("map", {
      center: [37.0902, -95.7129],
      zoom: 5,
      layers: [streetmap, earthquakes]
    });
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
      // Create a legend control
      let legend = L.control({position: 'bottomright'});

      legend.onAdd = function () {
          let div = L.DomUtil.create('div', 'info legend'),
              depths = [0, 5, 10, 30, 70, 100],
              labels = [];

          // Add a title to the legend
          div.innerHTML += '<p>Depth of the earthquake in km</p>';
  
          // Loop through depth intervals and generate a label with a colored square for each interval
          for (let i = 0; i < depths.length; i++) {
              div.innerHTML +=
                  '<i style="background:' + getColor(depths[i]) + '"></i> ' +
                  depths[i] + (depths[i] ? '&ndash;' + depths[i] + '<br>' : '+');
          }
  
          return div;
      };
  
      // Add the legend to the map
      legend.addTo(map);
  }
  
  // Define getColor function to return color based on depth
function getColor(depth) {
  return depth > 100 ? "#fcaf8a" : //Here we add colors from green to red to each possible value of the depth.
         depth > 70 ? "#fee9ad" :   //Colors were grabbed from https://colorbrewer2.org/#type=sequential&scheme=YlOrRd&n=6
         depth > 30  ? "#e4f3ad" :
         depth > 10  ? "#d9ef8b" :
         depth > 5  ? "#b2dd8f" :
                       "#5eb684";
}

function createMarkers(response) {

    // Pull the properties from response.data.
    let events = response.features;
  
    // Initialize an array to hold markers.
    let earthquakeMarkers = [];

    // Loop through the properties "events" array.
    for (let index = 0; index < events.length; index++) {
      let coordinates = events[index].geometry.coordinates; //we create the coordinates function with the API info
      let mag = events[index].properties.mag; //Bringing the magnitude to the loop
      let radius = mag * 20000; //We Amplify the radius of the marker to make it more visible
      let depth1 = coordinates[2]; //We bring the depth from the API
      let depth = depth1*10 //Amplify the depth, once again to make it more visible
      let place = events[index].properties.place //Info for the pop up
      let url = events[index].properties.url //Info for the pop up
      
      // Print depth value to the console
      console.log(`Earthquake depth: ${depth} km`); //I printed this to give myself an idea of the depth values and create the range for colors

      let color = getColor(depth); //We create a color variable depending on the function created above
        
      //Create a marker per event, and bind a popup with the the API info.
      let earthquakeMarker = L.circle([coordinates[1], coordinates[0]],{
        color: color,
        fillColor: color,
        fillOpacity: color,
        radius: radius
      })
        .bindPopup(`<h3>${place}</h3><br><p>Magnitude: ${mag}<br>Depth: ${depth}<br>More Information: ${url}</p>`);
  
      // Add the marker to the array.
      earthquakeMarkers.push(earthquakeMarker);
    }
  
    // Create a layer group and pass it to the createMap function.
    createMap(L.layerGroup(earthquakeMarkers));
  }


  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);