'use strict';

/**
 * A11yze Video Player
 * - wraps each element in the set in an a11yze div
 * 
 *
 * @author  Harris Schneiderman
 * @see  https://github.com/schne324/a11yze-player
 */

var init = function (video, options) {
  console.log('options: ', options);
  var $player = {};
  // wrap the video
  // based on user's skin option, class will be appended to this div
  var $wrapper = $(video).wrap('<div class="a11yze"></div>').parent();
  // creates the controlbar
  // based on options, control elements will be appended to this div
  var $controls = $('<div class="a11yze-controls"></div>');
  
  $wrapper.append($controls);

  var $play = $('<div class="a11yze-play-button control">'
            +   '<button id="' + rndid() + '" class="button" type="button">'
            +     '<i class="fa fa-play"></i>'
            +   '</button>'
            + '</div>');
  // insert the play/pause button
  $controls.append($play);

  var $time = $('<div class="control timer">'
              +   '<span class="current-time"></span>'
              +   '<span class="slash">/</span>'
              +   '<span class="total-time"></span>'
              + '</div>');
  // insert the timer div
  $controls.append($time);

  var $captions = $('<div class="control a11yze-captions">'
                  +   '<button type="button" id="' + rndid() + '" class="button">'
                  +     '<i class="fa fa-cc"></i>'
                  +   '</button>'
                  + '</div>');
  // insert the cc button
  $controls.append($captions);

  var $volume = $('<div class="control a11yze-volume slider" id="' + rndid() + '">'
                + '(insert slider here)'
                + '</div>');
  // insert the volume slider
  $controls.append($volume);

  var $fullscreen = $('<div class="control a11yze-fullscreen">'
                    +   '<button type="button" id="' + rndid() + '" class="button">'
                    +     '<i class="fa fa-expand"></i>'
                    +   '</button>'
                    + '</div>');
  // insert the fullscreen button
  $controls.append($fullscreen);

  $player.self = $(video);
  $player.wrapper = $wrapper;
  $player.controls = {
    self: $controls,
    playPause: $play,
    time: $time,
    caption: $captions,
    volume: $volume,
    fullscreen: $fullscreen
  };
  $player.captions = $player.self.find('track');
  console.log(options.captions);
  if (!options.captions) {
    $player.captions.hide();
  } else {
    var capName = rndid();
    // build the captions dropdown
    $player.controls
      .caption
      .append('<div id="fly-' + capName + '" class="captions-menu">'
              +   '<div class="caption-toggle">'
              +     '<div>'
              +       '<input type="radio" name="' + capName + '" id="on-' + capName + '">'
              +       '<label for="on-' + capName + '">ON</label>'
              +     '</div>'
              +     '<div>'
              +       '<input type="radio" name="' + capName + '" id="off-' + capName + '">'
              +       '<label for="off-' + capName + '">OFF</label>'
              +     '</div>'
              +   '</div>'
              +   '<button type="button" class="button">Settings</button>'
              + '</div>');
    $player.controls.captionsMenu = $player.captions.find('.captions-menu');
  }

  setupTime($player);

  /////////////
  // actions //
  /////////////
  $player.play = function () {
    // play the video...
    $player.self[0].play();
    // show the pause-icon
    $player.controls.playPause
      .find('i')
      .removeClass('fa-play')
      .addClass('fa-pause');

    // TODO: check if caps are on
    // and start them up here...
  };

  $player.pause = function () {
    // pause the video...
    $player.self[0].pause();
    // show the play-icon
    $player.controls.playPause
      .find('i')
      .removeClass('fa-pause')
      .addClass('fa-play');

    // TODO: check if caps are
    // on and kill them here.
  }


  ////////////
  // events //
  ////////////
  $player.controls.playPause
    .find('button')
    .on('click', function () {
      if (!isPlaying(this)) {
        $player.play();
      } else {
        $player.pause();
      }
    });

  $player.self.on('loadedmetadata', function (e) {
    console.log('loaded: ', e);
  })
};


/**
 * @param  {Object} opts User's options
 * @return {jQuery Object} this
 */
$.fn.a11yze = function (opts) {
  /**
   * The default options for the a11yze player
   *  - `theme` {String} 'default' or 'light'
   *  - `captions` {Boolean} whether or not allow captions
   *  (must also provide <track /> elements within the <video />)
   *  - `transcripts` {String} path to transcripts txt file
   */
  var defaults = {
    theme: 'default',
    captions: true,
    transcripts: null
  };
  var options = $.extend(defaults, opts);

  $(this).each(function () {
    return init(this, options);
  });

  return this;
};



///////////
// UTILS //
///////////

function setupTime($player) {
  // current time:
  $player.controls.time
    .find('.current-time')
    .html('0:00');

  $player.controls.time
    .find('.total-time')
    .html(Math.round($player.self[0].duration))
}

/**
 * Determines if video is playing based on the
 * presence of the pause class on the button
 */
function isPlaying(playPauseBtn) {
  return $(playPauseBtn).find('i').hasClass('fa-pause');
}

/**
 * Returns a random string
 */
function rndid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return 'a11yze-' + s4() + '-' + s4() + '-' + s4();
};
