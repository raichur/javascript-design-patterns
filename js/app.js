// Click Cat
var count = 0;
$('.cat').click(function(){
  $('#count').text(count + 1);
  count++;
});
