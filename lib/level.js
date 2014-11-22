'use strict';

var Point = require('./point');
var _ = require('underscore');

var Level = function(game, width, height) {
  this.game = game;
  this.width = width;
  this.height = height;
};

Level.prototype.preload = function() {
};  

Level.prototype.create = function() {
  this.points = new Phaser.Group(this.game, this.game.stage, 'points');
  this.points.x = 40;
  this.points.y = 40;
  this.spacing = 80;

  this._placePoints();
  this._assignConnections();

  this.entrance = _.sortBy(this.points.children, function(point) {
    return point.x;
  })[0];

  this.exit = _.sortBy(this.points.children, function(point) {
    return -point.x;
  })[0];
};

Level.prototype.update = function() {
};

Level.prototype._placePoints = function() {
  var k = 0;

  for(var i = 0; i < this.height; i++) {
    var amount = this.width - Math.abs(i - Math.floor(this.height / 2));
    for(var j = 0; j < amount; j++) {
      var x = j * this.spacing + ((this.width - amount) * this.spacing / 2);
      var y = i * this.spacing;

      var point = new Point(this.game, x, y, k);
      point.create();
      this.points.add(point);

      k += 1;
    }
  }
};

Level.prototype._assignConnections = function() {
  for(var i = 0; i < this.points.children.length; i++) {
    var point = this.points.children[i];

    var positions = [
      { x: point.x + this.spacing / 2, y: point.y - this.spacing }, // above
      { x: point.x + this.spacing / 2, y: point.y + this.spacing }, // below
      { x: point.x + this.spacing, y: point.y } // infront
    ];

    for(var j = 0; j < positions.length; j++) {
      var other = _.findWhere(this.points.children, positions[j]);

      if(other) {
        point.addConnected(other);
      }
    }
  }
};

module.exports = Level;
