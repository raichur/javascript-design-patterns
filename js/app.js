// Click Cat
var count = 0, cats = ['cat1', 'cat2'];
$('img').click(function(){
  if(cats.indexOf($(this).parent().attr('class')) + 1){
    $(this).parent().find('#count').text(parseInt($(this).parent().find('#count').text()) + 1);
  }
});
