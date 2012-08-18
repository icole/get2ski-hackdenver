/*An example of using the MQA.EventUtil to hook into the window load event and execute defined function 
    passed in as the last parameter. You could alternatively create a plain function here and have it 
    executed whenever you like (e.g. <body onload="yourfunction">).*/ 

    function loadMap() {
	
      /*Create an object for options*/ 
      var options={
        elt:document.getElementById('map'),       /*ID of element on the page where you want the map added*/ 
        zoom:13,                                  /*initial zoom level of the map*/ 
        latLng:{lat:40.735383, lng:-73.984655},   /*center of map in latitude/longitude */ 
        mtype:'osm',                              /*map type (osm)*/ 
        bestFitMargin:0,                          /*margin offset from the map viewport when applying a bestfit on shapes*/ 
        zoomOnDoubleClick:true                    /*zoom in when double-clicking on map*/ 
      };

      /*Construct an instance of MQA.TileMap with the options object*/ 
      window.map = new MQA.TileMap(options);
      console.log('map loaded');
    }
    
    $(document).bind('pageinit', function(event) {
    	console.log('page loaded');
    	loadMap();
    });
    
    console.log('page downloaded');
    
    
    