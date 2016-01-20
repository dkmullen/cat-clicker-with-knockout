var myCats = [
	{name: "BJ", nickname: "Boo Boo", pic: "pix/bj.jpg", counter: 0},
	{name: "Kiri", nickname: "Wee Wee", pic: "pix/kiri.jpg", counter: 0},
	{name: "Smudge", nickname: "Jayne", pic: "pix/smudge.jpg", counter: 0},
	{name: "Thor", nickname: "Thunder", pic: "pix/thor.jpg", counter: 0},
	{name: "Unknown", nickname: "Jerry", pic: "pix/unknown.jpg", counter: 0}
];

var Cat = function(data) {
	//Sets all variables to a ko.observable that changes when cat changes
	this.name = ko.observable(data.name);
	this.nickname = ko.observable(data.nickname);
	this.pic = ko.observable(data.pic);
	this.counter = ko.observable(data.counter);
	
	//Adds a cat nickname to the main name
	this.fullName = ko.computed(function() {
		return this.name() + " (" + this.nickname() + ")";
	}, this);
	
	//Number of clicks on cat pic changes cat title
	this.title = ko.computed(function() {
		var title;
		var clicks = this.counter();
		if (clicks < 5) {
			title = 'Kitten';
		} else if (clicks < 10) {
			title = 'Teen';
		} else if (clicks < 15) {
			title = 'Adult';
		} else {
			title = 'Cat-aracts';
		}
		return title;
	}, this);	
}

var ViewModel = function() {
	//Makes sure 'self' always refers to ViewModel
	var self = this;
	//Helper function to pick a random number
	var randNum = Math.floor(Math.random() * myCats.length)
	//Creates an empty array to hold cat objects
	this.catList = ko.observableArray([]);
	
	//Adds each cat to the array catList
	myCats.forEach(function(catItem){
		self.catList.push( new Cat(catItem) );
	});
	
	//Picks a cat at random to display on page load
	this.currentCat = ko.observable( this.catList()[randNum] );
	
	//Increments the counter on click
	this.incrementCounter = function() {
		this.counter(this.counter() + 1);
	};
	
	this.setCat = function(clickedCat) {
		self.currentCat(clickedCat)
	};
	
	//Clicking the Admin button shows the admin area
	this.adminButton = function() {
		this.showAdminBox(true);
	};
	
	//Clicking the Cancel button hides the admin area
	this.cancelButton = function() {
		this.showAdminBox(false);
	};
	
	//Sets the admin area to invisible on page load
	this.showAdminBox = ko.observable(false);
};

ko.applyBindings(new ViewModel())