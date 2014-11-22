'use strict';

var Point = function(game, x, y, index) {
  this.radius = 10;
  this.color = 0xFFC700;
  this.index = index;
  this.connected = [];

  x = x - this.radius / 2;
  y = y - this.radius / 2;

  Phaser.Graphics.call(this, game, x, y);
  game.add.existing(this);
};

Point.prototype = Object.create(Phaser.Graphics.prototype);
Point.prototype.constructor = Point;

Point.prototype.create = function() {
  var text = new Phaser.Text(this.game, this.x + 50, this.y + 40, '' + this.index);
  text.fontSize = 10;
  text.addColor('#ffffff', 0);
  this.game.add.existing(text);
};

Point.prototype.update = function() {
  this.clear();
  
  this.beginFill(this.color);
  this.drawCircle(0, 0, this.radius);
  this.endFill();

  this.lineStyle(1, 0x0000FF, 1);

  for(var i = 0; i < this.connected.length; i++) {
    var connected = this.connected[i];

    this.moveTo(0, 0);
    this.lineTo(connected.x - this.x, connected.y - this.y);
  }
};

Point.prototype.addConnected = function(point) {
  this.connected.push(point);
};

module.exports = Point;