//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var db = Ti.Database.install('/mydata/address.sqlite', 'USEACdb');
	
	var CheckOneTimePassword = require('ui/common/CheckOneTimePassword');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
		
	//construct UI
	//var firstView = new FirstView();
	var firstView = new CheckOneTimePassword();
	self.add(firstView);
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
