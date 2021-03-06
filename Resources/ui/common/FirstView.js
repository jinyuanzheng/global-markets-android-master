function FirstView() {
	var osname = Ti.Platform.osname;
	var isAndroid = (osname=='android') ? true : false;
	var isRetina = Titanium.Platform.displayCaps.platformHeight > 500 ? true: false; 
	
	var self = Ti.UI.createView({
//		backgroundColor:'#C1D6D6',
		backgroundColor:'#000000',
		top:0,
		left:0,
		width:'100%',
		height:'100%',
		layout:'vertical'
	});
	var headingLabel;
	if(osname == 'iphone')
	{
		headingLabel = Titanium.UI.createLabel({
			//color: '#900',
  			color: '#ffffff',
  			font: { fontSize:20 },
  			shadowColor: '#aaa',
  			shadowOffset: {x:1, y:1},
  			shadowRadius: 3,
  			text: 'Welcome to Global Markets',
  			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  			top: 20
		});
	} else{
		headingLabel = Titanium.UI.createLabel({
			//color: '#900',
  			color: '#ffffff',
  			font: { fontSize:40 },
  			shadowColor: '#aaa',
  			shadowOffset: {x:1, y:1},
  			shadowRadius: 3,
  			text: 'Welcome to Global Markets',
  			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  			top: 20
		});
	}
	
	var useacbutton;
	var searchHS;
	var searchNAICS;
	var callTICbutton;
	var staffbutton;
	var buttonTop = (osname=='android' || osname=='ipad') ? 20 : 7;
	buttonTop = (isRetina &&  osname=='iphone') ? 10 : buttonTop;
	var fntSize = (osname=='android' || osname=='ipad') ? 20 : 14;
   	if(osname != 'iphone')
   	{
		useacbutton = Titanium.UI.createButton({
   			title: 'Nearest Export Assistance Center',
   			backgroundImage: '/images/CSLogoIconSize-pad.png',
   			font: { fontSize:20 },
   			opacity: 1,
   			color: '#4989ff',
   			borderRadius: 10,
   			top: buttonTop,
   			backgroundColor: '#e1e1e1',
   			width: '90%',
   			height: '8%'
 		});		 	
 		searchHS = Titanium.UI.createButton({
 			title: 'Search HS Codes',
 			backgroundImage: '/images/ic_action_search-pad.png',
   			font: { fontSize:20 },
   			color: '#4989ff',
 			top: buttonTop,
 			borderRadius: 10,
 			backgroundColor: '#e1e1e1',
 			width: '90%',
 			height: '8%'
 		});
 		searchNAICS = Titanium.UI.createButton({
 			title: 'Search NAICS Codes',
 			backgroundImage: '/images/ic_action_search-pad.png',
   			font: { fontSize:20 },
   			color: '#4989ff',
 			top: buttonTop,
 			borderRadius: 10,
 			backgroundColor: '#e1e1e1',
 			width: '90%',
 			height: '8%'
 		});
 		
		callTICbutton = Titanium.UI.createButton({
   			title: 'Trade Information Center',
   			top: buttonTop,
   			color: '#4989ff',
   			font: { fontSize:20 },
   			backgroundImage:'/images/phone-icon-pad.png',
   			borderRadius: 10,
   			backgroundColor: '#e1e1e1',
   			width: '90%',
   			height: '8%'
 		});
 		
		staffbutton = Titanium.UI.createButton({
   			title: 'Contact Us',
   			borderRadius: 10,
   			color: '#4989ff',
   			font: { fontSize:20 },
			backgroundColor: '#e1e1e1',
   			top: buttonTop,
   			width: '90%',
   			height: '8%'
   		});	   		
   	} else {
   		
		useacbutton = Titanium.UI.createButton({
   			title: '		Nearest Export Assistance Center',
   			backgroundImage: '/images/CSLogoIconSize.png',
   			font: { fontSize:14 },
   			opacity: 1,
   			color: '#4989ff',
   			borderRadius: 10,
   			top: buttonTop,
   			backgroundColor: '#e1e1e1',
   			width: '90%',
   			height: '8%'
 		});		 	
 		searchHS = Titanium.UI.createButton({
 			title: '	Search HS Codes',
 			backgroundImage: '/images/ic_action_search.png',
   			font: { fontSize:14 },
   			color: '#4989ff',
   			top: buttonTop,
 			borderRadius: 10,
 			backgroundColor: '#e1e1e1',
 			width: '90%',
 			height: '8%'
 		});
 		searchNAICS = Titanium.UI.createButton({
 			title: '	Search NAICS Codes',
 			backgroundImage: '/images/ic_action_search.png',
   			top: buttonTop,
   			font: { fontSize:14 },
   			color: '#4989ff',
 			borderRadius: 10,
 			backgroundColor: '#e1e1e1',
 			width: '90%',
 			height: '8%'
 		});
 		
		callTICbutton = Titanium.UI.createButton({
   			title: '	Trade Information Center',
   			top: buttonTop,
   			font: { fontSize:14 },
   			color: '#4989ff',
   			backgroundImage:'/images/phone-icon.png',
   			borderRadius: 10,
   			backgroundColor: '#e1e1e1',
   			width: '90%',
   			height: '8%'
 		});
 		
		staffbutton = Titanium.UI.createButton({
   			title: 'Contact Us',
   			borderRadius: 10,
   			top: buttonTop,
   			font: { fontSize:14 },
			backgroundColor: '#e1e1e1',
   			width: '90%',
   			height: '8%'
   		});	   		   		
   	}
	var mapView = MapView(10);
	useacbutton.addEventListener('click', function  (e) {
		if (mapView == null) { alert ('Cant get to map view - use a global');}
		else { 
			if( Titanium.Geolocation.locationServicesEnabled === false ) {
				alert('Your device has GPS turned off. Please turn it on.');
				return;
			}
			// Get current position and find the USEAC closest to it
			Titanium.Geolocation.getCurrentPosition(function (e) {
				if (e.error)
				{
    				alert('Cannot get your current location. Make sure your device has GPS turned on.');
    				return;
				}
				var i = 0;
				var closestUSEAC = mapNearest(e.coords.latitude, e.coords.longitude);
				mapView.setRegion({latitude: closestUSEAC.lat,  longitude: closestUSEAC.lng, latitudeDelta: 0.1, longitudeDelta: 0.1 });
				var annot = null;
				var Map = require('ti.map');
				var win = Titanium.UI.createWindow();
				
				annot= Map.createAnnotation({
				    latitude:closestUSEAC.lat,
				    longitude:closestUSEAC.lng,
				    city:closestUSEAC.city,
				    state:closestUSEAC.state,
				    myid:i++ // Custom property to uniquely identify this annotation.
				});
				mapView.addAnnotation(annot);
			});	
		}
	});
	
	callTICbutton.addEventListener('click',function(e)
	{
		if (isAndroid) {
			var intent = Ti.Android.createIntent({
				action: Ti.Android.ACTION_CALL,
				data: 'tel:1-800-872-8723'
			});
			Ti.Android.currentActivity.startActivity(intent);
	  	} else{
			Titanium.Platform.openURL('tel:18008728723');		  		
	  	}
	});
	
	
	self.add(headingLabel);
	self.add(mapView);
	self.add(useacbutton);
	self.add(searchHS);
	self.add(searchNAICS);
	self.add(callTICbutton);
	self.add(staffbutton);
	
	staffbutton.addEventListener('click',function(e)
	{
		var listView = USEACListView();
		var listContainerWindow = Ti.UI.createWindow({
			title:'Our Office Locations',
			navBarHidden:false,
			backgroundColor:'#ffffff'
		});
		
		var button = Titanium.UI.createButton({
			title:'<< Back',
			left: 5,
			top: 30,
			width: 60,
			height: 20
		});
		
		button.addEventListener('click', function(e) {
			var self = Ti.UI.createWindow({
				backgroundColor:'#ffffff'
			});
				
			//construct UI
			//var firstView = new FirstView();
			var firstView = FirstView();
			self.add(firstView);
			self.open({modal:true});
			self.show();
		});
		
		listContainerWindow.add(button);
		listContainerWindow.add(listView);
/*
 		listContainerWindow.addEventListener('click', function(e) {
			
			self.fireEvent('itemSelected', {
				city:e.rowData.city,
				state:e.rowData.state,
				staff:e.rowData.staff
			});
		});
*/
		listContainerWindow.open({modal:true});
		listContainerWindow.show();   				
	});
		
	searchNAICS.addEventListener('click', function(e) {
		var naicsView = NAICSListView();
		var naicsWindow = Ti.UI.createWindow({
			title: 'Search by Description',
			navBarHidden: false,
			backgroundColor: '#ffffff'
		});
		naicsWindow.add(naicsView);
		naicsWindow.open({modal:true});
		naicsWindow.show();
	});
	searchHS.addEventListener('click', function(e) {
		var hsView = HSListView();
		var hsWindow = Ti.UI.createWindow({
			title: 'Search by Description',
			navBarHidden: false,
			backgroundColor: '#ffffff'
		});
		hsWindow.add(hsView);
		hsWindow.open({modal:true});
		hsWindow.show();
	});
	
	return self;
}

function MapView(viewTop) {
	var osname = Ti.Platform.osname;
	
	var isAndroid = (osname=='android') ? true : false;
	var db = Ti.Database.open('USEACdb');
	var useacRS = db.execute('Select city, state, phone, blackberry, position, reportingunit, lat, lng from useacstaff group by city order by city');
	var i = 0;
	var annots = [];
	var Map = require('ti.map');
	while (useacRS.isValidRow())
	{
		var aLoc = null;
		aLoc = Map.createAnnotation({
		    latitude:useacRS.fieldByName('lat'),
		    longitude:useacRS.fieldByName('lng'),
		    image:'/mydata/small_red_dot.png',
		    pincolor:Map.ANNOTATION_BLUE,
		    city:useacRS.fieldByName('city'),
			state:useacRS.fieldByName('state'),
			title:useacRS.fieldByName('city'),
		    myid:i++ // Custom property to uniquely identify this annotation.
		});
		annots.push(aLoc);
		useacRS.next();
	}
	var map1 = Map.createView({
	    mapType: Map.STANDARD_TYPE,
	    region: {latitude: 39.8282,  longitude: -98.35, latitudeDelta: 50, longitudeDelta: 50 },
	    animate:true,
	    regionFit:true,
	    userLocation:true,
		center: {x:0, y:0},
		height: '40%',
		top: viewTop,
		left: 0,
		width: '100%',
	    annotations:annots
	});

	map1.addEventListener('click', function(evt) {
		var clicksource = evt.clicksource;
	 	Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
		var useacDetailWindow = Ti.UI.createWindow({
			title:'Office Location: ' + evt.annotation.city + ', ' + evt.annotation.state,
			navBarHidden:false,
			backgroundColor:'#ffffff'
		});
		useacDetailWindow.add(useacView(20, evt.annotation.city, evt.annotation.state, 0));
		useacDetailWindow.open({modal:true});
		useacDetailWindow.show();
	});

	useacRS.close();
	db.close();
	return map1;
}

// calc distance between 2 points
function calcDist(lat1, lon1, lat2, lon2){
	
	
	var R = 6371; // km
	var dLat = (Math.abs(lat2)-Math.abs(lat1))*Math.PI/180;
	var dLon = (Math.abs(lon2)-Math.abs(lon1))*Math.PI/180;
	var lat11 = lat1*Math.PI/180;
	var lat22 = lat2*Math.PI/180;

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat11) * Math.cos(lat22); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	return R * c;
}

// A view to show a USEAC and its staff
function useacView(viewTop, city, state, from)
{
	var Map = require('ti.map');
	var osname = Ti.Platform.osname;
	var isAndroid = (osname=='android') ? true : false;
	var nftSize = (osname=='android' || osname=='ipad') ? 40 : 23;
	var nlblftSize = (osname=='android' || osname=='ipad') ? 30 : 17;
	var niconSize = (osname=='android' || osname=='ipad') ? 64 : 40;
	var niconPos1 = (osname=='android') ? 400 : 200;
	niconPos1 = (osname=='ipad') ? 550 : niconPos1;
	var niconPos2 = (osname=='android') ? 500 : 260;
	niconPos2 = (osname=='ipad') ? 650 : niconPos2;
	var logoHeight = (osname=='android' || osname=='ipad') ? '20%' : '16%';
	var self = Ti.UI.createView({
			backgroundColor:'#C1D6D6',
			top:viewTop,
			left:0,
			width:'100%',
			height:'100%',
			layout:'vertical'
		});
	var headingLabel = Titanium.UI.createLabel({
			color: '#900',
  			font: { fontSize:nftSize },
  			shadowColor: '#aaa',
  			shadowOffset: {x:5, y:5},
  			shadowRadius: 3,
  			text: city + ', ' + state,
  			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  			top: 10
		});
	var image = Ti.UI.createImageView({
			width:'25%',
			height:logoHeight,
			top:0,
			image:'/images/CSlogo4insquare.png'
		});			
		
	var button = Titanium.UI.createButton({
		title:'<< Back',
		left: 5,
		top: 10,
		width: 60,
		height: 20
	});
	
	button.addEventListener('click', function(e) {
		var self = Ti.UI.createWindow({
			backgroundColor:'#ffffff'
		});
			
		//construct UI
		if(from == 0)
		{
			var firstView = FirstView();
			self.add(firstView);
			self.open({modal:true});
			self.show();
		}
		else
		{
			var listView = USEACListView();
			var listContainerWindow = Ti.UI.createWindow({
				title:'Our Office Locations',
				navBarHidden:false,
				backgroundColor:'#ffffff'
			});
			
			var button = Titanium.UI.createButton({
				title:'<< Back',
				left: 5,
				top: 30,
				width: 60,
				height: 20
			});
			
			button.addEventListener('click', function(e) {
				var self = Ti.UI.createWindow({
					backgroundColor:'#ffffff'
				});
					
				//construct UI
				//var firstView = new FirstView();
				var firstView = FirstView();
				self.add(firstView);
				self.open({modal:true});
				self.show();
			});
			
			listContainerWindow.add(button);
			listContainerWindow.add(listView);
	/*
	 		listContainerWindow.addEventListener('click', function(e) {
				
				self.fireEvent('itemSelected', {
					city:e.rowData.city,
					state:e.rowData.state,
					staff:e.rowData.staff
				});
			});
	*/
			listContainerWindow.open({modal:true});
			listContainerWindow.show();   				
		}				
	});
	
	self.add(button);
	self.add(image);
 	self.add(headingLabel);
	
 	// Now get the staff at this location and show them in a list
 	var table_data = [];
	var i = 0;
	var db = Ti.Database.open('USEACdb');
	var staffNameRS = db.execute('Select staff, city, state, phone, blackberry, position, lat, lng from useacstaff where city=? and state=?', city, state);
	var lat=0.0;
	var lng = 0.0;
	while (staffNameRS.isValidRow())
	{
		var row = Ti.UI.createTableViewRow({city:staffNameRS.fieldByName('city'),
  			state:staffNameRS.fieldByName('state'),
  			staff:staffNameRS.fieldByName('staff'),
  			lat:staffNameRS.fieldByName('lat'),
  			lng:staffNameRS.fieldByName('lng'),
  			phone:staffNameRS.fieldByName('phone'),
  			bb:staffNameRS.fieldByName('blackberry'),
  			rowIndex:i++
  		});
  		row.selectionStyle = 'none';
  		var staffLabel = Ti.UI.createLabel({
    		color:'#576996',
    		font:{fontFamily:'Arial', fontSize:nlblftSize, fontWeight:'bold'},
    		left:20,
    		height:niconSize+10,
    		text:staffNameRS.fieldByName('staff')
	  	});
	  	
	  	row.add(staffLabel);
	  	// Create an SMS button
	  	var smsButton = null;
	  	
	  	if ( staffNameRS.fieldByName('blackberry') == null ) {
	  		smsButton = Ti.UI.createImageView({
	  		image:'/images/Messages-Android-Disabled.png',
	  		width:niconSize,
	  		height:niconSize,
	  		left:niconPos1});
	  		smsButton.setEnabled(false);
	  	} else {
	  		smsButton = Ti.UI.createImageView({
	  		image:'/images/Messages-Android-R.png',
	  		width:niconSize,
	  		height:niconSize,
	  		left:niconPos1});
	  		smsButton.addEventListener('click', function(e) {
	  			if ( isAndroid ) {
	  				var intent = Ti.Android.createIntent({
					action: Ti.Android.ACTION_SENDTO,
					data: 'smsto:' + row.bb
					});
					intent.putExtra('sms_body', 'new message');
					Ti.Android.currentActivity.startActivity(intent);
				} else{
					Titanium.Platform.openURL('sms:' + row.bb);
				}
	  		});
	  	}
	  	row.add(smsButton);
	  	// Create a phone button
	  	var phoneButton = null;
	  	if (staffNameRS.fieldByName('phone') == null ){
	  		phoneButton = Ti.UI.createImageView({
	  		image:'/images/ic_action_call.png',
	   		width:niconSize,
	  		height:niconSize,
	  		left:niconPos2});
	  		phoneButton.setEnabled(false);
	  	} else {
	  		phoneButton = Ti.UI.createImageView({
	  		image:'/images/phone-icon1.png',
	  		width:niconSize,
	  		height:niconSize,
	  		left:niconPos2});
	  		phoneButton.addEventListener('click', function(e) {
	  			if ( isAndroid ) {
	  				var intent = Ti.Android.createIntent({
					action: Ti.Android.ACTION_CALL,
					data: 'tel:' + row.phone
					});
					Ti.Android.currentActivity.startActivity(intent);
				} else {
					Titanium.Platform.openURL('tel:' + row.phone);
				}
	  		});
	  	}
	  	row.add(phoneButton);
	  	table_data.push(row);
		staffNameRS.next();
	}
	staffNameRS.close();
	db.close();
	i = 0;
	var useacLoc = Map.createAnnotation({
	    latitude:lat,
	    longitude:lng,
		myid:i++ // Custom property to uniquely identify this annotation.
	});
	
	var tblView = Ti.UI.createTableView({backgroundColor:'transparent',
			top:10,
			left:0,
			width:'100%',
			height:'70%',
			layout:'vertical',
			data: table_data});
		
	//self.add(mapView);
	self.add(tblView);
	return self;		
}
// Plots the closest USEACs to your current location
function mapNearest(lat, lng) {
	var db = Ti.Database.open('USEACdb');
	var distArray = {};
	var shortestDist = 10000000;
	var cCity, cState = '';	
	var cLat, cLng = 0.0;
 	coordsRS = db.execute('Select distinct city, state, lat, lng from useacstaff');
	while (coordsRS.isValidRow())
	{					
		dist = calcDist(lat, lng, coordsRS.fieldByName('lat'), coordsRS.fieldByName('lng'));
		if ( dist < shortestDist ) {
			shortestDist = dist;
			cCity = coordsRS.fieldByName('city');
			cLat = coordsRS.fieldByName('lat');
			cLng = coordsRS.fieldByName('lng');
			cState = coordsRS.fieldByName('state');
			distArray[(dist)] = coordsRS.fieldByName('city') + ',' + coordsRS.fieldByName('state') + ':' + coordsRS.fieldByName('lat') + ',' + coordsRS.fieldByName('lng');
		}
		coordsRS.next();
	}
	
	coordsRS.close();
	db.close();
	return {'city':cCity, 'state':cState, 'lat':cLat, 'lng':cLng};
	
}

function NAICSListView() {
	var self = Ti.UI.createListView({backgroundColor:'transparent',
	top:10,
	left:0,
	width:'100%',
	height:'100%',
	layout:'vertical',
	});
	var search = Titanium.UI.createSearchBar({
   		barColor:'#77B121',
   		height:85,
   		hintText:'Enter description',
   		top:0});
 
	//AUTOCOMPLETE TABLE
	var table_data = [];
	var autocomplete_table = Titanium.UI.createTableView({
//   		search: search,
   		scrollable: true,
   		top:0,
   		data: table_data
	});
	autocomplete_table.setData([]);
	autocomplete_table.setData(['aasdfasdf']);
	
	var last_search = null;
	search.addEventListener('change', function(e)
	{
		autocomplete_table.setData([]);
   		if (search.value.length > 2 && search.value !=  last_search)
   		{
  			last_search = search.value;
//     		autocomplete_table.setData(['aasdfasdf']);
     		autocomplete_table.setData(auto_complete(search.value));
			//	search.value = last_search;
     		//search.value="";
      	}
  	});
	
	search.addEventListener('return', function(e){
	    search.blur();   
	});
	 
	autocomplete_table.addEventListener('click', function(e) {
	    search.blur();
	});


	var button = Titanium.UI.createButton({
		title:'<< Back',
		left: 5,
		top: 20,
		width: 60,
		height: 20
	});
	
	button.addEventListener('click', function(e) {
		var self = Ti.UI.createWindow({
			backgroundColor:'#ffffff'
		});
			
		//construct UI
		//var firstView = new FirstView();
		var firstView = FirstView();
		self.add(firstView);
		self.open({modal:true});
		self.show();
	});
	
	self.add(button);
	
	self.add(search);
	
	//self.add(search);
	self.add(autocomplete_table);
	return self;
}

function auto_complete(search_term)
{
	var osname = Ti.Platform.osname;
	
	var isAndroid = (osname=='android') ? true : false;
   	//var db = Ti.Database.install('/mydata/USEACdb.sqlite', 'USEACdb');	
	var db = Ti.Database.open('USEACdb');

	var tbl_data = [];
	var i = 0;
	var wildcard = '%';
	wildcard += search_term;
	wildcard += '%';
    var naicsCodesRS = db.execute('Select code, description from NAICS_Codes where description like ?', wildcard);
	var i = 0;
	while (naicsCodesRS.isValidRow()) {
    	var row = Ti.UI.createTableViewRow({
                  code:naicsCodesRS.fieldByName('code'),
                  desc:naicsCodesRS.fieldByName('description'),
                  rowIndex:i++,
                  hasChild:false
        });
        var cityLabel;
        if(isAndroid)
        {
	        cityLabel = Ti.UI.createLabel({
	    		color:'#576996',
	    		font:{fontFamily:'Arial', fontSize:30, fontWeight:'bold'},
	    		left:5,
	    		text:naicsCodesRS.fieldByName('code') + ':' + naicsCodesRS.fieldByName('description')
		  	});
       	
        } else if(osname == 'ipad') {
	        cityLabel = Ti.UI.createLabel({
	    		color:'#576996',
	    		font:{fontFamily:'Arial', fontSize:30, fontWeight:'bold'},
	    		left:5,
	    		text:naicsCodesRS.fieldByName('code') + ':' + naicsCodesRS.fieldByName('description')
		  	});
        } else {
	        cityLabel = Ti.UI.createLabel({
	    		color:'#576996',
	    		font:{fontFamily:'Arial', fontSize:15, fontWeight:'bold'},
	    		left:5,
	    		text:naicsCodesRS.fieldByName('code') + ':' + naicsCodesRS.fieldByName('description')
		  	});
        }
	  	row.add(cityLabel);
	  		
	//  apply rows to data array
        tbl_data.push(row);
        naicsCodesRS.next();
    }
    naicsCodesRS.close();
    db.close();
    
    return tbl_data;
}
function HSListView() {
	var self = Ti.UI.createListView({backgroundColor:'transparent',
	top:10,
	left:0,
	width:'100%',
	height:'100%',
	layout:'vertical',
	});
	var search = Titanium.UI.createSearchBar({
   		barColor:'#77B121',
   		height:85,
   		hintText:'Enter description',
   		top:0});
 
	//AUTOCOMPLETE TABLE
	var table_data = [];
	var autocomplete_table = Titanium.UI.createTableView({
//   		search: search,
   		scrollable: true,
   		top:0,
   		data: table_data
	});
	var last_search = null;
	search.addEventListener('change', function(e)
	{
   		if (search.value.length > 2 && search.value !=  last_search)
   		{
  			last_search = search.value;
     		autocomplete_table.setData(auto_complete_hs(search.value));
     	//	search.value = search.value;
     		
      	}
  	});
	
	search.addEventListener('return', function(e){
	    search.blur();   
	});
	 
	autocomplete_table.addEventListener('click', function(e) {
	    search.blur();
	});
	
	var button = Titanium.UI.createButton({
		title:'<< Back',
		left: 5,
		top: 20,
		width: 60,
		height: 20
	});
	
	button.addEventListener('click', function(e) {
		var self = Ti.UI.createWindow({
			backgroundColor:'#ffffff'
		});
			
		//construct UI
		//var firstView = new FirstView();
		var firstView = FirstView();
		self.add(firstView);
		self.open({modal:true});
		self.show();
	});
	
	self.add(button);
	self.add(search);
	self.add(autocomplete_table);
	return self;
}
function auto_complete_hs(search_term)
{
	var osname = Ti.Platform.osname;
	
	var isAndroid = (osname=='android') ? true : false;
	
	var db = Ti.Database.open('USEACdb');

	var tbl_data = [];
	var i = 0;
	var wildcard = '%';
	wildcard += search_term;
	wildcard += '%';
    var HSCodesRS = db.execute('Select Product, Description from HS_Codes where Description like ?', wildcard);
	var i = 0;
	while (HSCodesRS.isValidRow()) {
       var row = Ti.UI.createTableViewRow({
                  code:HSCodesRS.fieldByName('Product'),
                  desc:HSCodesRS.fieldByName('Description'),
                  rowIndex:i++,
                  hasChild:false
               });
       var hsLabel;
       if(isAndroid)
       {
	       hsLabel = Ti.UI.createLabel({
	    		color:'#576996',
	    		font:{fontFamily:'Arial', fontSize:30, fontWeight:'bold'},
	    		left:5,
	    		text:HSCodesRS.fieldByName('Product') + ':' + HSCodesRS.fieldByName('Description')
		  	});
       } else if(osname == 'ipad'){
	       hsLabel = Ti.UI.createLabel({
	    		color:'#576996',
	    		font:{fontFamily:'Arial', fontSize:30, fontWeight:'bold'},
	    		left:5,
	    		text:HSCodesRS.fieldByName('Product') + ':' + HSCodesRS.fieldByName('Description')
		  	});
       } else {
	       hsLabel = Ti.UI.createLabel({
	    		color:'#576996',
	    		font:{fontFamily:'Arial', fontSize:15, fontWeight:'bold'},
	    		left:5,
	    		text:HSCodesRS.fieldByName('Product') + ':' + HSCodesRS.fieldByName('Description')
		  	});
       }
		row.add(hsLabel);	
               // apply rows to data array
        tbl_data.push(row);
        HSCodesRS.next();
    }
    HSCodesRS.close();
    db.close();
    
    return tbl_data;
	
}

function USEACListView() {
//	var db = Ti.Database.install('/mydata/address.sqlite', 'USEACdb');
	var db = Ti.Database.open('USEACdb');
	
	var label = Ti.UI.createLabel({text:'Global Markets'});
	//first.add(label);
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var tbl_data = [];
	var i = 0;
	var staffNameRS = db.execute('Select staff, city, state, phone, blackberry, position, reportingunit, lat, lng from useacstaff group by city order by reportingunit');
	while (staffNameRS.isValidRow())
	{
		/*tbl_data.push({city:staffNameRS.fieldByName('city'),
  			state:staffNameRS.fieldByName('state'),
  			staff:staffNameRS.fieldByName('staff'),
  			color: '#000',
  			hasChild:'true'});
  		*/	
	
  		var row = Ti.UI.createTableViewRow({city:staffNameRS.fieldByName('city'),
  		state:staffNameRS.fieldByName('state'),
  		staff:staffNameRS.fieldByName('staff'),
  		lat:staffNameRS.fieldByName('lat'),
  		lng:staffNameRS.fieldByName('lng'),
  		rowIndex:i++, hasChild:'true'});
  		
  		var city = staffNameRS.fieldByName('city');
  		var cityLabel = Ti.UI.createLabel({
    		color:'#576996',
    		font:{fontFamily:'Arial', fontSize:30, fontWeight:'bold'},
    		left:5,
    		text:city + ',' + staffNameRS.fieldByName('state')
	  	});
	  	row.add(cityLabel);		
		tbl_data.push(row);
		staffNameRS.next();
	}
	
	staffNameRS.close();
	db.close();
		
	var self = Ti.UI.createTableView({backgroundColor:'transparent',
		hasChild: true,
		hasDetail: true,
		top:60,
		left:0,
		width:'100%',
		height:'100%',
		layout:'vertical',
		data: tbl_data
	});
	self.addEventListener('click', function(e) {
		/* Open the USEAC Detail View */		
		var useacDetailWindow = Ti.UI.createWindow({
			title:'Office Location: ' + e.rowData.city + ', ' + e.rowData.state,
			navBarHidden:false,
			backgroundColor:'#ffffff'
		});
		useacDetailWindow.add(useacView(20, e.rowData.city, e.rowData.state, 1));
		useacDetailWindow.open({modal:true});
		useacDetailWindow.show();
	});
	return self;
}
module.exports = FirstView, USEACListView;
