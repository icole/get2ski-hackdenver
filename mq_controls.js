/*An example of using the MQA.EventUtil to hook into the window load event and execute defined function 
    passed in as the last parameter. You could alternatively create a plain function here and have it 
    executed whenever you like (e.g. <body onload="yourfunction">).*/ 

    function loadMap() {
	
	
		
      /*Create an object for options*/ 
      var options={
        elt:document.getElementById('map_canvas'),       /*ID of element on the page where you want the map added*/ 
        zoom:13,                                  /*initial zoom level of the map*/ 
        latLng:{lat:40.320969, lng:-104.980774},   /*center of map in latitude/longitude */ 
        mtype:'osm',                              /*map type (osm)*/ 
        bestFitMargin:0,                          /*margin offset from the map viewport when applying a bestfit on shapes*/ 
        zoomOnDoubleClick:true                    /*zoom in when double-clicking on map*/ 
      };
      
	  /*Construct an instance of MQA.TileMap with the options object*/ 
      window.map = new MQA.TileMap(options);
      
      MQA.withModule('largezoom', function() {
      map.addControl(
       new MQA.LargeZoom(),
       new MQA.MapCornerPlacement(MQA.MapCorner.TOP_LEFT, new MQA.Size(5,5))
      );
      });
      
      MQA.withModule('geolocationcontrol', function() {
        
        map.addControl(
          new MQA.GeolocationControl()
        );
    
      });

      console.log('map loaded');
    }
    
    function loadWebcams() {
    
    /*Using the MQA.Poi constructor*/ 
  	var berthoud_cam=new MQA.Poi({lat:40.320969, lng:-104.980774});
  	var camIcon=new MQA.Icon("http://cotrip.org/theme/cotrip.org/images/cameraTour/icon_camera_still_22x20.gif",22,20);

  	/*Sets the rollover content of the POI.*/ 
  	berthoud_cam.setRolloverContent('View the BERTHOUD station web camera');

  	/*Sets the InfoWindow contents for the POI. By default, when the POI receives a mouseclick 
  	event, the InfoWindow will be displayed with the HTML passed in to MQA.POI.setInfoContentHTML method.*/ 
  	berthoud_cam.setInfoContentHTML('Camera type: Still. Images Courtesy of ITS <img style="width:300px; height:200px;" src="http://cotrip.org/images/ws/camera?imageURL=77"/>');
  	berthoud_cam.setIcon(camIcon);
  	berthoud_cam.maxInfoWindowWidth = 420;

  	/*This will add the POI to the map in the map's default shape collection.*/ 
  	map.addShape(berthoud_cam);
    }
    
    function findDeviceWidthAndHeight() {
    	var h = $(window).height();
		var rh = h+10;
		console.log('h: ', h, ' rh: ', rh);
		var w = $(window).width();
		$("#map_canvas").css('width',w+'px');
		console.log(' width: ',w);
		$("#map_canvas").css('height',rh+'px');
		//document.getElementById("map_canvas").style.width=window.innerWidth;
		//document.getElementById("map_canvas").style.height=window.innerHeight;

	}
	
	function addStationToMap(station) {
		console.log(station);
		var lat = station.geometry.coordinates[1];
		var lon = station.geometry.coordinates[0];
		var stationPoi = new MQA.Poi({lat:lat, lng:lon});
		var stationIcon = "http://cotrip.org/theme/cotrip.org/images/devices/icon_device_weather_station_with_cam_16x23.gif";
		stationPoi.setRolloverContent(station.properties.id);
		var stationContent = "";
		if (stationPoi.properties.NorthImage != null) {
			console.log('adding station image');
			stationConent += "NorthImage: ";
			stationContent += "<img src='";
			stationContent += stationPoi.properties.NorthImage;
			stationContent += "' style='width:200px; height:200px;' />";
		}
		stationPoi.setInfoContentHtml(stationContent);
		//{"type":"Feature","geometry":{"type":"Point","coordinates":[-104.631233,37.417255]},"properties":{"NorthImage":"http://cotrip.org/images/ws/camera?imageURL=243","SouthImage":"http://cotrip.org/images/ws/camera?imageURL=244","WestImage":"http://cotrip.org/images/ws/camera?imageURL=245"},"id":"025N033 AGUILAR"},

	}
	
	function loadWeatherStations() {
		// $.ajax({url: url,
// 				dataType: 'json',
// 				data: data,
// 				success: success
// 		});
		console.log('show weather stations');
		$.getJSON('weather.json', function(data) {
			console.log(" data.length: " + data.length);
			var numStations = data.length;
			for (var i=0; i < data.length; i++) {
				addStationToMap(data[i]);
			}
			//$('.result').html('<p>' + data.foo + '</p>'
			//+ '<p>' + data.baz[1] + '</p>');
		});

	}
	
    
    $(document).bind('pageinit', function(event) {
    	console.log('page loaded');
    	findDeviceWidthAndHeight();
    	loadMap();
    	loadWebcams();
    	$('#loadWeather').live('click', loadWeatherStations);
    });
    
    console.log('page downloaded');
    
    
    