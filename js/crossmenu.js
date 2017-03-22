$(document).ready(function(){

  var svg = $('svg');
  var lines = svg.find('rect');
  var line_first = $('svg rect:nth-child(1)')
  var line_second = $('svg rect:nth-child(2)')
  var line_third = $('svg rect:nth-child(3)')
  var i = true;

  svg.on('click', function(){
    if (i) {
      setTimeout(function(){
        $(this).find("g").addClass('gotcha')

        line_first.css({
          'transform':'rotate(45deg)',
          'left':'50%',
          'top':'50%',
          'width':'200px',
          // This line BELONGS to @dervondenbergen :D 
          // Enjoy your propriety my friend.
          'transform-origin': 'left bottom'
        })
        line_third.css({
          'transform':'rotate(-45deg) translate(-50%,-50%)',
          'left':'50%',
          'top':'50%'
        })
        line_second.css('opacity','0')
      },005)
    } else {
      setTimeout(function(){
        line_first.attr('style', '');
        line_third.attr('style', '');
        line_second.css('opacity','1')
      },005)
    }
    i=!i; 
  });
});
