console.log('js is ready...');

$(document).ready(function() {
  console.log('domcontentloaded...');

  var isPage = function(name) {
    return document.location.pathname.indexOf(name) !== -1;
  };


  // index page
  $.getJSON('data/projects.json')
  .done(function(data) {
    var json = data,
        projects = '',
        items = '',
        item = '';

    // fetch projects
    if (isPage('index')) {
      $.each(data, function(idx, itm) {
        projects += '<article>'
                  + '    <a href="project.html#' + idx + '" class="project">'
                  + '        <h2 class="name">' + itm.name + '</h2>'
                  + '        <div class="description">' + itm.desc + '</div>'
                  + '        <img src="' + itm.images[0] + '" class="image">'
                  + '    </a>'
                  + '</article>';
      });

      $('section').html(projects);

      items = $('.project > *');
    }

    if (isPage('project')) {
      var project = document.location.hash.substr(1),
          itm = data[project];

      var imgs = '';
      $.each(itm.images, function(i, img) {
        imgs += '        <img src="' + img + '" class="image">';
      });

      item += '<article class="project gallery">'
          + '        <h2 class="name">' + itm.name + '</h2>'
          + '        <div class="description">' + itm.desc + '</div>'
          + imgs
          + '</article>';

      $('section').html(item);

      items = $('article > *');
    }

    // fade in tiles
    $(items).each(function(idx, itm) {
      setTimeout(function() {
        $(itm).animate({
          opacity: 1
        }, 250);
      }, idx * 250);
    });
    
  })
  .fail(function(error) {
    console.log(error);
  });






  $('.images a').on('click', function(event) {
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
  });

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


});