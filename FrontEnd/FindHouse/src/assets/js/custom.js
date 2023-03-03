(function($) {
    'use strict';

    // Mean Menu JS
    jQuery('.mean-menu').meanmenu({ 
        meanScreenWidth: "991"
    });

    // Navbar Area
    $(window).on('scroll', function() {
        if ($(this).scrollTop() >150){  
            $('.navbar-area').addClass("sticky-nav");
        }
        else{
            $('.navbar-area').removeClass("sticky-nav");
        }
    });

    // Others Option For Responsive JS
	$(".side-nav-responsive .dot-menu").on("click", function(){
		$(".side-nav-responsive .container .container").toggleClass("active");
	});

    // Search Overlay JS
	$(".side-nav .search-box i").on("click", function(){
		$(".search-overlay").toggleClass("search-overlay-active");
	});
	$(".search-close").on("click", function(){
		$(".search-overlay").removeClass("search-overlay-active");
	});

    // Slider Area
    $('.slider-area').owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        nav: true,
        dots: false,
        dotsData: true,
        autoplay: true,
        autoplayHoverPause: true,
        navText: [
            "<i class='flaticon-left'></i>",
            "<i class='flaticon-arrow'></i>"
        ],
    })


    // Place Slider 
    $('.place-slider').owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayHoverPause: true,
        responsive:{
            0:{
                items: 1
            },
            768:{
                items: 2
            },
            1000:{
                items: 3
            },
            1200:{
                items: 4
            }
        }
    })

    // Place Slider Two
    $('.place-slider-two').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        responsive:{
            0:{
                items: 1
            },
            768:{
                items: 2
            },
            1000:{
                items: 3
            },
            1200:{
                items: 4
            }
        },
        navText: [
            "<i class='flaticon-left'></i>",
            "<i class='flaticon-arrow'></i>"
        ],
    })

    // Place Slider Two
    $('.place-slider-three').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        responsive:{
            0:{
                items: 1
            },
            768:{
                items: 2
            },
            992:{
                items: 3
            },
            1200:{
                items: 4
            }
        },
        navText: [
            "<i class='flaticon-left'></i>",
            "<i class='flaticon-arrow'></i>"
        ],
    })

    // Testimonial Slider 
    $('.testimonial-slider').owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayHoverPause: true,
        responsive:{
            0:{
                items: 1
            },
            768:{
                items: 2
            },
            1000:{
                items: 3
            }
        }
    })

    // Testimonial Slider Two 
    $('.testimonial-slider-two').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        responsive:{
            0:{
                items: 1
            },
            768:{
                items: 2
            },
            1000:{
                items: 3
            }
        },
        navText: [
            "<i class='flaticon-left'></i>",
            "<i class='flaticon-arrow'></i>"
        ],
    })

    // Slider Area
    $('.client-slider').owlCarousel({
        loop: true,
        margin: 30,
        items: 1,
        nav: true,
        dots: false,
        dotsData: true,
        autoplay: true,
        autoplayHoverPause: true,
        navText: [
            "<i class='flaticon-left'></i>",
            "<i class='flaticon-arrow'></i>"
        ],
    })

    // Tabs Single Page
    $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
    $('.tab ul.tabs li a').on('click', function (g) {
        var tab = $(this).closest('.tab'), 
        index = $(this).closest('li').index();
        tab.find('ul.tabs > li').removeClass('current');
        $(this).closest('li').addClass('current');
        tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
        tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
        g.preventDefault();
    });

    // Gallery Slider Area
    $('.gallery-slider-area').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        responsive:{
            0:{
                items: 1
            },
            768:{
                items: 2
            }
        },
        navText: [
            "<i class='flaticon-left-arrow-1' ></i>",
            "<i class='flaticon-arrow-1'></i>"
        ],
    })

    // Popup Video 
    $('.play-btn').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    // Popup Video Two
    $('.video-btn').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    // Input Plus & Minus Number JS
    $('.form-input-counter').each(function() {
        var spinner = jQuery(this),
        input = spinner.find('input[type="text"]'),
        btnUp = spinner.find('.plus-btn'),
        btnDown = spinner.find('.minus-btn'),
        min = input.attr('min'),
        max = input.attr('max');
        
        btnUp.on('click', function() {
            var oldValue = parseFloat(input.val());
            if (oldValue >= max) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue + 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

        btnDown.on('click', function() {
            var oldValue = parseFloat(input.val());
            if (oldValue <= min) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue - 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });
    }); 

    // Input Plus & Minus Number JS
    $('.input-counter').each(function() {
        var spinner = jQuery(this),
        input = spinner.find('input[type="text"]'),
        btnUp = spinner.find('.plus-btn'),
        btnDown = spinner.find('.minus-btn'),
        min = input.attr('min'),
        max = input.attr('max');
        
        btnUp.on('click', function() {
            var oldValue = parseFloat(input.val());
            if (oldValue >= max) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue + 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

        btnDown.on('click', function() {
            var oldValue = parseFloat(input.val());
            if (oldValue <= min) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue - 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });
    }); 

    // Count Time JS
	function makeTimer() {
		var endTime = new Date("august  30, 2020 17:00:00 PDT");			
		var endTime = (Date.parse(endTime)) / 1000;
		var now = new Date();
		var now = (Date.parse(now) / 1000);
		var timeLeft = endTime - now;
		var days = Math.floor(timeLeft / 86400); 
		var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
		var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
		var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
		if (hours < "10") { hours = "0" + hours; }
		if (minutes < "10") { minutes = "0" + minutes; }
		if (seconds < "10") { seconds = "0" + seconds; }
		$("#days").html(days + "<span>Days</span>");
		$("#hours").html(hours + "<span>Hours</span>");
		$("#minutes").html(minutes + "<span>Minutes</span>");
		$("#seconds").html(seconds + "<span>Seconds</span>");
	}
	setInterval(function() { makeTimer(); }, 300);

    // Back To Top Js
    $('body').append('<div id="toTop" class="top-btn"><i class="bx bx-chevrons-up"></i></div>');
    $(window).on('scroll',function () {
        if ($(this).scrollTop() != 0) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    }); 
    $('#toTop').on('click',function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });

    // WOW JS
    new WOW().init();

    // Nice Select JS
    $('select').niceSelect();

})(jQuery);