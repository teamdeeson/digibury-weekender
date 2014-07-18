var topRange = 200, // measure from the top of the viewport to X pixels down
    edgeMargin = 20, // margin above the top or margin from the end of the page
    animationTime = 1200, // time in milliseconds
    contentTop = [];

$(document).ready(function () {

//$('.back-to-top').hide();

    // Stop animated scroll if the user does something
    $('html,body').bind('scroll mousedown DOMMouseScroll mousewheel keyup', function (e) {
        if (e.which > 0 || e.type == 'mousedown' || e.type == 'mousewheel') {
            $('html,body').stop();
        }
    });

    // Set up content an array of locations
    $('.menu-position').find('a').each(function () {
        contentTop.push($($(this).attr('href')).offset().top);
    })

    // Animate menu scroll to content
    $('.menu-position').find('a').click(function () {
        var sel = this,
            newTop = Math.min(contentTop[$('.menu-position a').index($(this))], $(document).height() - $(window).height()); // get content top or top position if at the document bottom
        $('html,body').stop().animate({
            'scrollTop': newTop
        }, animationTime, function () {
            window.location.hash = $(sel).attr('href');
        });
        return false;
    })

    // adjust side menu
    $(window).scroll(function () {
        var winTop = $(window).scrollTop(),
            bodyHt = $(document).height(),
            vpHt = $(window).height() + edgeMargin; // viewport height + margin
        $.each(contentTop, function (i, loc) {
            if ((loc > winTop - edgeMargin && (loc < winTop + topRange || (winTop + vpHt) >= bodyHt))) {
                $('.menu-position li a')
                    .removeClass('active')
                    .eq(i).addClass('active');
            }
        });
        
        if($('.menu-position li:first-child a').hasClass('active')) {
          $('.back-to-top').fadeOut();
        } else {
        console.log('asdfasdf');
                    $('.back-to-top').fadeIn();
        }
    });
    
    
  /*function toggleBackToTop(){
    if($('#top-nav').is(':above-the-top')) {
      $('.back-to-top').addClass('show');
    } else {
      $('.back-to-top').removeClass('show');
    }
  };
      
  $(window).scroll(function(){
    //stickySidebar();
    toggleBackToTop();
  });*/
  
  // Scroll down on jump links
  $('a.back-to-top').click(function(e){
    $('html, body').animate({scrollTop: '0px'}, 1000);
    
    e.preventDefault();
  });


});

