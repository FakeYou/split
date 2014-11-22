'use strict';

var Boot = function(game) {
  this.game = game;
};

Boot.prototype.preload = function() {
  this.load.image('preloadBackground', 'assets/preloadBackground.gif');
  this.load.image('preloadProgressBar', 'assets/preloadProgressBar.gif');
};

Boot.prototype.create = function() {
  this.game.stage.backgroundColor = 0x1E222B;

  this.state.start('preload');
};

module.exports = Boot;