var model = {
  current_cat: null,
  cats: [
    {
      click_count: 0,
      name: 'Tiger',
      img_src: 'img/cat1.jpg'
    },
    {
      click_count: 0,
      name: 'Timmy',
      img_src: 'img/cat2.jpg'
    },
    {
      click_count: 0,
      name: 'Tommy',
      img_src: 'img/cat3.jpg'
    },
    {
      click_count: 0,
      name: 'Dash',
      img_src: 'img/cat4.jpg'
    },
    {
      click_count: 0,
      name: 'Donkey',
      img_src: 'img/cat5.jpg'
    },
    {
      click_count: 0,
      name: 'Cazzy',
      img_src: 'img/cat6.jpg'
    }
  ]
};

var controller = {

  init: function() {
    // Set the current cat to the first cat on the list
    model.current_cat = model.cats[0];

    // Initialize views
    cat_list_view.init();
    cat_detail_view.init();
  },

  get_cats: function() {
    return model.cats;
  },

  set_current_cat: function(cat) {
    model.current_cat = cat;
  },

  get_current_cat: function() {
    return model.current_cat;
  },

  increment_counter: function() {
    model.current_cat.click_count++;
    cat_detail_view.render();
  }
};

var cat_detail_view = {

  init: function() {
    // Store pointers to our DOM for later access
    this.cat_elem = $('#cat');
    this.cat_name_elem = $('#cat_name');
    this.cat_image_elem = $('#cat_img');
    this.count_elem = $('#cat_count');

    // Increment count on click
    this.cat_image_elem.click(function(e) {
      controller.increment_counter();
    });

    this.render();
  },

  render: function() {
    var current_cat = controller.get_current_cat();
    this.count_elem.text(current_cat.click_count);
    this.cat_name_elem.text(current_cat.name);
    this.cat_image_elem.attr('src', current_cat.img_src);
  }

};

var cat_list_view = {

  init: function() {
    // Store pointer to DOM element
    this.cat_list_elem = $('#cat_list');

    // Render the view (Update DOM elements)
    this.render();
  },

  render: function() {
    // Get ALL THE CATS
    var cats = controller.get_cats();

    // Make the cat list empty
    this.cat_list_elem.innerHTML = '';

    // Loop over cats and create elements
    for(var i = 0; i < cats.length; i++) {
      var cat = cats[i];

      // Create li and set its text
      var elem = document.createElement('li');
      elem.textContent = cat.name;

      elem.addEventListener('click', (function(cat) {
        return function() {
          controller.set_current_cat(cat);
          cat_detail_view.render();
        };
      })(cat));

      // Add the element to the list
      this.cat_list_elem.append(elem);
    }
  }
};

// Make all the magic happen
controller.init();
