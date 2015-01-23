$(document).ready(function () {
  //Hide inactive tabs



  //carousel thing - need to tidy!
	counter=1;
	widthOfSlide = $('.wrap-scroll').css('width').split('px');
	widthOfSlide = (parseInt(widthOfSlide[0]));	
	howManySlides = $('.wrap-scroll-contain .inner').length;
	applyWidth=howManySlides * widthOfSlide;
	$('.wrap-scroll-contain').css('width',applyWidth);
    $wrapScrollContain = $('.wrap-scroll-contain');
	
	$('.left').click(function (e) {
		e.preventDefault();
		pos=widthOfSlide*counter;
		pos=((pos-pos) - pos);
		maxWidthOfSlide = ((applyWidth - applyWidth) - applyWidth); //turn it into negative
		if (pos > maxWidthOfSlide) {
		  counter++;
		  $wrapScrollContain.animate({
			left: '-=' + widthOfSlide
		  }, 300);
		}
		$('.right').fadeTo("slow", 1);
		if (pos <= maxWidthOfSlide) {
			$('.left').fadeTo("slow", 0.5);
		}
	});
  
	$('.right').click(function (e) {
		e.preventDefault();		
		if ($wrapScrollContain.css('left') < "0px") {
		  counter--;
		  $wrapScrollContain.animate({
			left: '+=' + widthOfSlide
		  }, 100);
		}
		$('.left').fadeTo("slow", 1);
		if ($wrapScrollContain.css('left') >= "-500") {
		  $('.right').fadeTo("slow", 0.5);
		}
	});


});
