//FirstView Component Constructor
function CheckOneTimePassword() {
	var FirstView = require('ui/common/FirstView');
	
	var db = Ti.Database.open('USEACdb');
	var passwordRS = db.execute('Select password, active from masterlock');
	var password = 0;
	var isActive = 'F';
	if (passwordRS.isValidRow()) {
		isActive = passwordRS.fieldByName('active');
		password = passwordRS.fieldByName('password');
	}
	passwordRS.close();
	db.close();
	if ( isActive == 'T') {
		var self = new FirstView();
		return self;
	} else {
		
		var self = Ti.UI.createView({
			backgroundColor: '#C1D6D6',
			top: 20,
			left: 0,
			width: '100%',
			layout:'vertical'
		});
		
		var image = Ti.UI.createImageView({
			width:'25%',
			height:'20%',
			top:5,
			image:'/images/CSlogo4insquare.png'
			});			
		self.add(image);
	
		var instructionsLabel = Ti.UI.createLabel({color: '#000000',
  			font: { fontSize:20 },
  			shadowColor: '#aaa',
  			shadowOffset: {x:1, y:1},
  			shadowRadius: 3,
  			text: 'Enter your one-time pin to install and access this application.',
  			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  			top: 20});
  			
		var pinField = Ti.UI.createTextField({width:'20%', maxLength:4, keyboardType:Titanium.UI.KEYBOARD_DECIMAL_PAD});
		var okButton = Ti.UI.createButton({width:'80%', title:'OK'});
		var cancelButton = Ti.UI.createButton({width:'80%', title:'Cancel'});
		var helpButton = Ti.UI.createButton({width:'80%', title:'Help'});
		cancelButton.addEventListener('click', function (e) {
			var activity = Titanium.Android.currentActivity; 
			activity.finish();
		});
		helpButton.addEventListener('click', function (e) {
			alert('The Beta version of this application is to be used only by members of ITA within the Department of Commerce. You need a 4 digit one-time pin to access this version. Please contact the application developer for your pin.');
		});
		okButton.addEventListener('click', function  (e) {		
			if (pinField.getValue().toString() == password.toString() ) {
				// Passwords match - set the flag
				updateStatus();
				var baseWin = Ti.UI.createWindow({
						backgroundColor:'#ffffff',
						exitOnClose:true,
						});
				var self = new FirstView();
				baseWin.add(self);
				baseWin.open({modal:true});
				baseWin.show();
				
			} else {
				alert('Incorrect Pin - please try again');
			}
		});
		self.add(instructionsLabel);
		self.add(pinField);
		self.add(okButton);
		self.add(helpButton);
		self.add(cancelButton);
		return self;
	}
}
// Passwords match - this function just updates the status of the active flag so next time its not called
function updateStatus() {
	var db = Ti.Database.open('USEACdb');
	var passwordRS = db.execute('Update masterlock set  active=?', 'T');
	db.close();
	
}
module.exports = CheckOneTimePassword;