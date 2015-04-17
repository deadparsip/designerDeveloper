var dd = function($) {
	var $nav = $('nav a'),$main=$('.main'),$wrapscroll = $('.wrap-scroll');
	
	//Hide inactive tabs
	$main.not('.main.about').hide();
	$nav.first().addClass('active');	

	function withHash() {
		var page = window.location.hash.substring(1);
		$main.hide();
		$('section.main.' + page).fadeIn(500);
		$('nav a.active').removeClass('active');
		$nav.each(function () {
			if ($(this).attr("data-num") == page) {
				$(this).addClass('active');
			}
		});
		$('nav a#' + page).addClass('active');
	}	
	function noHash() {
		if (typeof (Storage) !== "undefined") {
			localStorage.page = "about";
		} else {
			window.location.hash = "about";
		}
	}
	if (typeof (Storage) !== "undefined") {
		//Use local storage to save state, because I like it. Else use url hashes for pap browsers :(
		if (localStorage.page) {
			console.log(localStorage.page);
			page = localStorage.page;
			$main.hide();
			$('.main.' + page).fadeIn(500);
			$('nav a.active').removeClass('active');
			$('nav a').each(function () {
				if ($(this).attr("data-num") == page) {
					$(this).addClass('active');
				}
			});
			$('nav a#' + page).addClass('active');
		} else {
			window.location.hash ? withHash() : noHash();
		}
	}
	$nav.not('.contact').click(function (e) {    
		e.preventDefault();
		page = $(this).attr("data-num");
		window.location.hash = page;
		$('nav a.active').removeClass('active');
		$(this).addClass('active');
		$('.main:visible').addClass('fadeOutLeft');
		$('.main.fadeOutLeft').bind('oanimationend animationend webkitAnimationEnd', function() { 
		   $(this).hide(100).removeClass('fadeOutLeft');
		   console.log(page + "gash" );
			$('.main.' + page).fadeIn(200).addClass('fadeInLeft');		
			setTimeout(function() {$('.main.fadeInLeft').removeClass('fadeInLeft')},600)
		});
		if (typeof (Storage) !== "undefined") {
		  localStorage.page = page;
		} else {
		  window.location.hash = page;
		}
	});
	$('nav a.contact').click(function (e) {    
		if (typeof (Storage) !== "undefined") {
		  localStorage.page = "contact";
		} else {
		  window.location.hash = "contact";
		}
	});
	

	
	/*(function carousel(){
		//carousel thing - need to tidy!
		var counter=1,
			widthOfSlide = $wrapscroll.css('width').split('px'),
			widthOfSlide = (parseInt(widthOfSlide[0])),
			howManySlides = $('.wrap-scroll-contain .inner').length,
			applyWidth=howManySlides * widthOfSlide,
			$right = $('.right'), $left = $('.left'),
			$wrapScrollContain = $('.wrap-scroll-contain');

		$wrapScrollContain.css('width',applyWidth);		
		
		$right.click(function (e) {
			e.preventDefault();
			var pos=widthOfSlide*counter;
			pos=((pos-pos) - pos);
			maxWidthOfSlide = ((applyWidth - applyWidth) - applyWidth); //turn it into negative
			if (pos > maxWidthOfSlide) {
			  counter++;
			  $wrapScrollContain.animate({
				left: '-=' + widthOfSlide
			  }, 300);
			}
			$left.fadeTo("slow", 1);
			if (pos <= maxWidthOfSlide) {
				$right.fadeTo("slow", 0.5);
			}
			console.log(maxWidthOfSlide + " and pos = " + pos)
		});
	  
		$left.click(function (e) {
			e.preventDefault();		
			if ($wrapScrollContain.css('left') < "0px") {
			  counter--;
			  $wrapScrollContain.animate({
				left: '+=' + widthOfSlide
			  }, 100);
			}
			$right.fadeTo("slow", 1);
			if ($wrapScrollContain.css('left') >= "-500") {
			  $right.fadeTo("slow", 0.5);
			}
		});
		
		$left.fadeTo("slow", 0.5);
	})();*/
	
	var scrollers = (function(){
		//scrollers
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('a.top').fadeIn();
				$('a.home').fadeOut();
				$('nav').addClass('fixed');
				$('.findAside').addClass('fixed');
				$('.top').fadeIn(300);
				$('.findAside').fadeIn(300);
			} else {
				$('.top').fadeOut(300);
				$('a.home').fadeIn(400);
				$('nav').removeClass('fixed');
				$('.findAside').removeClass('fixed');
			}
		});
			$('.top').click(function () {
				$("html, body").animate({
					scrollTop: 0
				}, 600);
				return false;
			});
			$('.findAside').click(function () {
				$("html, body").animate({
					scrollTop: "+=250px"
				}, 600);
				return false;
			});
	})();
	
	function loadXMLDoc() {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				document.getElementById("ajaxContent").innerHTML = xmlhttp.responseText;
			}
		}
		xmlhttp.open("GET", "ajax.txt", true);
		xmlhttp.send();
	};

	$('#getLocate').on('click',function() {
		var $status = $('#status');
		$status.text("checking...");

		function success(position) {
			if ($status.className == 'success') {
				return;
			};
			$status.innerHTML = "found you!";
			$status.className = 'success';
			var mapcanvas = document.createElement('div');
			mapcanvas.id = 'mapcanvas';
			document.querySelector('#locater').appendChild(mapcanvas);
			var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
			myOptions = {
				zoom: 15,
				center: latlng,
				mapTypeControl: false,
				navigationControlOptions: {
					style: google.maps.NavigationControlStyle.SMALL
				},
				mapTypeId: google.maps.MapTypeId.ROADMAP
			},
			map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);

			var marker = new google.maps.Marker({
				position: latlng,
				map: map,
				title: "You are here! (at least within a " + position.coords.accuracy + " meter radius)"
			});
		};

		function error(msg) {
			var s = document.querySelector('#status');
			s.innerHTML = typeof msg == 'string' ? msg : "failed";
			s.className = 'fail';
			console.log(arguments);
		};

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(success, error);
		} else {
			error('not supported');
		}
	});
	
	(function toggleClasses(){
		// toggle css3 classes
		var toggle = $('.toggleClass'),
		    test = $('#classListTest')[0];
			
		//if (toggle.classList) {			
			$('#status').hide();
			// bit of event delegation otherwise its binding to each input
			toggle.on('click', function (event) {
				if (event.target.nodeName == 'INPUT') {
					test.className = '';
					$(test).addClass('animated');
					test.classList.toggle(event.target.value);
				}
			});		
	})();
	
	$('#runJon').on('click',function() {
		localStorage.jon = prompt("Type some text to store in your browser's local storage", "");

		if (typeof(Storage) !== "undefined") {
			if (localStorage.jon != "" && localStorage.jon != null) {
				document.getElementById("result").innerHTML = "Your gibberish: " + localStorage.jon + " ,which, incidentally, is a bit weird.";
			}
		}
		else {
			document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
		}
	});
	if (localStorage.jon != "" && localStorage.jon !== null) {
		$("result").text("Your gibberish: " + localStorage.jon + ", which, incidentally, is a bit weird. If you refresh the page the text will still be there.");
	}
	
	ClickCounterViewModel = function () {
		this.numberOfClicks = ko.observable(0);	 
		this.registerClick = function() {
			this.numberOfClicks(this.numberOfClicks() + 1);
		};	 
		this.resetClicks = function() {
			this.numberOfClicks(0);
		};	 
		this.hasClickedTooManyTimes = ko.computed(function() {
			return this.numberOfClicks() >= 3;
		}, this);
	};
	
	function random_color() {
		var rint = Math.round(0xffffff * Math.random());
		return 'rgb(' + (rint >> 16) + ',' + (rint >> 8 & 255) + ',' + (rint & 255) + ')';
	};
	function retRandom(upper){
		return Math.floor(Math.random()*upper);
	};
	function retRandomTF(){
		if(retRandom(10) > 5){return true} else {return false;};
	}	;
	
	
	(function canvasStuffs() {
		//  canvasRandom
		var icount = 0;
		var myInterval;
		function scribble() {
			canvas = document.getElementById('scribs');
			if (canvas.getContext){
			ctx = canvas.getContext('2d');
			clearInterval(myInterval);
			ctx.clearRect (0, 0,  canvas.width, canvas.height);
			this.gridSize = 1;
			ctx.globalAlpha = 0;
			myInterval = setInterval(makeScribble,80);
			}
		};

		function makeScribble(){
			var cw = canvas.width;
			var ch = canvas.height;
			icount+=1;
			if(icount>10){ctx.clearRect (0, 0,  cw, ch);icount=0;ctx.beginPath();ctx.globalAlpha = 0;}
			ctx.globalAlpha +=0.01;
			ctx.beginPath();

			ctx.moveTo(retRandom(cw),retRandom(ch));
			ctx.strokeStyle = random_color();
			ctx.lineWidth = retRandom(10);
			for (var x = 0; x <= retRandom(50); x++) {
				if(retRandom(10)>5)	{
					ctx.quadraticCurveTo(retRandom(cw),retRandom(ch),retRandom(500),retRandom(90));
				}
				//arc(x, y, radius, startAngle, endAngle, anticlockwise)
				else {
					ctx.lineTo(retRandom(cw),retRandom(ch));
				}
				ctx.stroke();				
			}
		};

		var iCountHeight=2, iCountWidth=2, x=0, y=0;
		function motion() {
			canvas = document.getElementById('canvas');
			if (canvas.getContext){
			ctx = canvas.getContext('2d');
			//x=0;
			//y=0;
			clearInterval(myInterval);
			ctx.globalAlpha = 1;
			ctx.clearRect (0, 0,  canvas.width, canvas.height);

			myInterval = setInterval(makemotion,10);
			}
		};

		function makemotion(){
			var cw = canvas.width;
			var ch = canvas.height;
			ctx.clearRect (0, 0,  cw, ch)
			icount+=1

			if (iCountHeight+y+20>ch || iCountHeight+y<0 ){iCountHeight =- iCountHeight}
			if (iCountWidth+x+20>cw || iCountWidth+x<0){iCountWidth =- iCountWidth}
			ctx.fillStyle = "#000";
			x += iCountWidth;
			y += iCountHeight;
			ctx.fillRect(x,y, 20, 20);
		};	
	})();
	
	
};

$(document).ready(function () { 
	dd(jQuery);
});