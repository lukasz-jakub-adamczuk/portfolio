$(document).ready(function() {

  var isPage = function(name) {
    if (name == 'index' && document.location.pathname.indexOf('.html') == -1) {
      // main page
      return true;
    } else {
      return document.location.pathname.indexOf(name) !== -1;
    }
  };

  var getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var colors = ['crimson', 'darkseagreen', 'lightslategrey', 'olivedrab', 'seagreen', 'skyblue', 'slategrey', 'steelblue', 'teal', 'tomato', 'wheat', 'yellowgreen'];

  // index page
  $.getJSON('data/projects.json')
  .done(function(data) {
    var json = data,
        projects = '',
        items = '',
        item = '';

    // fetch projects
    if (isPage('index')) {
      // console.log('index');
      $.each(data, function(idx, itm) {
        projects += '<article style="background: ' + colors[getRandomInt(0, colors.length)] + ';">'
                  + '    <a href="page.html#' + idx + '" class="page project">'
                  + (itm.name ? '        <h2 class="name-box light">' + itm.name + '</h2>' : '')
                  + (itm.text ? '        <div class="text-box normal">' + itm.text + '</div>' : '')
                  + (itm.images ? '        <div class="image-box dark"><img src="' + itm.images[0] + '"></div>' : '')
                  + (itm.tiles ? '        <div class="text-box dark">' + itm.tiles[1].text + '</div>' + '<div class="image-box dark"><img src="' + itm.tiles[0].image + '"></div>' : '')
                  + '    </a>'
                  + '</article>';
      });

      $('.projects').html(projects);

      items = $('.project > *');
    }

    if (isPage('page')) {
      // console.log('page');
      var project = null,
          tiles = '',
          color = '',
          imgs = '',
          itm = '';

      color = colors[getRandomInt(0, colors.length)];
      if (document.location.hash) {
        project = document.location.hash.substr(1);
      }

      itm = data[project];

      if (project && itm) {
        // images processing
        if (itm.images) {
          $.each(itm.images, function(i, img) {
            imgs += '        <div class="image-box dark"><img src="' + img + '"></div>';
          });
        }

        // tiles processing
        if (itm.tiles) {
          $.each(itm.tiles, function(i, val) {
            if (val.text) {
              tiles += '    <div class="text-box normal">' + val.text + '</div>';
            }
            if (val.image) {
              tiles += '    <div class="image-box dark"><img src="' + val.image + '"></div>';
            }
            if (val.contact && itm.meta) {
              tiles += '    <div class="text-box light">'
                    + (itm.meta.email ? '      <p>' + itm.meta.email.label + ' <b>' + itm.meta.email.value + '</b></p>' : '')
                    + (itm.meta.phone ? '      <p>' + itm.meta.phone.label + ' <b>' + itm.meta.phone.value + '</b></p>' : '')
                    + (itm.meta.website ? '      <p>' + itm.meta.website.label + ' <b>' + itm.meta.website.value + '</b></p>' : '')
                    + '    </div>';
            }
          });
        }

        // finalize
        item += '<article class="page project gallery' + (itm.tiles ? ' tiles' : '') + '" style="background: ' + color + ';">'
            + (itm.name ? '        <h2 class="name-box light">' + itm.name + '</h2>' : '')
            + (itm.text ? '        <div class="text-box normal">' + itm.text + '</div>' : '')
            + imgs
            + tiles
            + '</article>';
      }

      $('.projects').html(item);

      items = $('article > *');
    }

    // if (isPage('contact')) {
    //   items = $('article > *');
    // }

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