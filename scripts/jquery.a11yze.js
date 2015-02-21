'use strict';

/**
 * A11yze Video Player
 * - wraps each element in the set in an a11yze div
 * 
 *
 * @author  Harris Schneiderman
 * @see  https://github.com/schne324/a11yze-player
 */

var A11yze = function (video, options) {
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
    return new A11yze(this, options);
  });

  return this;
};


var rndid = function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return 'a11yze-' + s4() + '-' + s4() + '-' + s4();
  };
