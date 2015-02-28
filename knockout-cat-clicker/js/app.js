var initialCats = [
  {
    clickCount: 0,
    name: "Tabby",
    imgSrc: "img/cat1.jpg",
    nickNames: ['Kitty 1', 'Kitty 2', 'Kitty 3']
  },
  {
    clickCount: 0,
    name: "Tabby 1",
    imgSrc: "img/cat1.jpg",
    nickNames: ['Kitty 1', 'YO 2', 'Kitty 3']
  },
  {
    clickCount: 0,
    name: "Tabby 2",
    imgSrc: "img/cat1.jpg",
    nickNames: ['Kitty 1', 'XXASA 2', 'Kitty 3']
  }
];

var Cat = function(data){
  this.clickCount = ko.observable(data.clickCount);
  this.name = ko.observable(data.name);
  this.imgSrc = ko.observable(data.imgSrc);

  this.nickNames = ko.observableArray(data.nickNames);

  this.catLevel = ko.pureComputed({
        read: function () {
            var value = this.clickCount();
            if(value <= 10) {
              return "Newborn";
            } else if(value <= 30) {
              return "Baby";
            } else if(value <= 50) {
              return "Kid";
            } else if(value <= 90) {
              return "Big Kid";
            } else {
              return "Grown Up";
            }
        },
        owner: this
    });
};

var ViewModel = function() {

  var self = this;

  this.catList = ko.observableArray([]);

  initialCats.forEach(function(catItem) {
    self.catList.push(new Cat(catItem));
  });

  this.currentCat = ko.observable(this.catList()[0]);

  this.incrementCounter = function() {
    this.clickCount(this.clickCount() + 1);
  };

  this.changeCat = function(clickedCat) {
    self.currentCat(clickedCat);
  };

};

ko.applyBindings(new ViewModel());
