var ViewModel = function() {
  this.clickCount = ko.observable(0);
  this.name = ko.observable('Tabby');
  this.imgSrc = ko.observable('img/cat1.jpg');

  this.incrementCounter = function() {
    this.clickCount(this.clickCount() + 1);
  };

  this.nickNames = ko.observableArray([
        { name: 'Kitty 1' },
        { name: 'Kitty 2' },
        { name: 'Kitty 3' }
    ]);

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

ko.applyBindings(new ViewModel());
