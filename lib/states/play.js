'use strict';

var Level = require('../level');
var Line = require('../line');

var Play = function(game) {
  this.game = game;
};

Play.prototype.preload = function() {
};  

Play.prototype.create = function() {
  this.level = new Level(this.game, 8, 5);
  this.level.create();

  this.line = new Line(this.game, this.level);
  this.line.create();
};

Play.prototype.update = function() {
  this.level.update();
};

module.exports = Play;