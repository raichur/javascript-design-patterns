// Click Cat
$('img').click(function(){
  $(this).parent().find('#count').text(parseInt($(this).parent().find('#count').text()) + 1);
});
