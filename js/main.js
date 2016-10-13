console.log('js is ready...');

$(document).ready(function() {
  console.log('domcontentloaded...');


  // $('img').hide();


  var showingImages = function() {
    $('img').show();
  };

  var hidingImages = function() {
    $('img').hide();
  };

  var show = $('.show-images');

  show.click(showingImages);

  $('.hide-images').click(function() {
    $('img').hide();
  });


  $('.toggle').click(function() {
    var gallery = $(this).next();

    $(this).next().fadeToggle();

    //gowno
    // if (gallery.is(':visible')) {
    //   $(this).next().fadeOut();
    // } else {
    //   $(gallery).fadeIn();
    // }
  });

  $('.gallery').fadeOut();


  $('.images a').on('click', function(event) {
    // console.log('image click...')

    var current = $(this).find('img').eq(0).attr('src');

    $('.modal-content img').attr('src', current);

    var prev = $(this).parent().prev();
    var next = $(this).parent().next();

    if (prev.length) {
      $('.modal-prev').attr('data-src', prev.find('img').attr('src')).show();
    } else {
      $('.modal-prev').hide();
    }

    if (next.length) {
      $('.modal-next').attr('data-src', next.find('img').attr('src')).show();
    } else {
      $('.modal-next').hide();
    }

    // console.log(prev.length);
    // console.log(next.length);
  });


  // if () {
  //   ....
  // }



  $('.modal-prev').on('click', function() {
    // $('.modal-content img').attr('src', $(this).attr('data-src'));
    $('.images a img[src="'+$(this).attr('data-src')+'"]').click();
  });

  $('.modal-next').on('click', function() {
    // $('.modal-content img').attr('src', $(this).attr('data-src'));
    $('.images a img[src="'+$(this).attr('data-src')+'"]').click();
  });

});


$(window).keyup(function(event) {
  console.log('keyup event...');
  


  var keys = {
    left: 37,
    right: 39,
    up: 38,
    down: 40,
    esc: 27
  }

  var hideOverlay = function() {
    // window.location.href.replace('#overlay', '');

    $('.modal-close a').click();
  };


  switch (event.keyCode) {
    case 37:
    case 39:
    case 38:
    case 40:
    case keys.esc:
      console.log(event.keyCode);
      hideOverlay();
      break;
  }




  
  // console.log(window.location.href);

});