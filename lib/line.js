'use strict';

var Line = function(game, level) {
  this.level = level;
  this.color = 0xff0099;
  this.points = [];

  Phaser.Graphics.call(this, game, 0, 0);
  game.add.existing(this);
};

Line.prototype = Object.create(Phaser.Graphics.prototype);
Line.prototype.constructor = Line;

Line.prototype.create = function() {
  this.pointer = { 
    x: this.level.entrance.x + this.level.points.x,
    y: this.level.entrance.y + this.level.points.y
  };
};

Line.prototype.update = function() {
  this.clear();
  this.beginFill(this.color);
  this.drawCircle(this.pointer.x, this.pointer.y, 20);
  this.endFill();

  if(this.tween && !this.tween.isRunning) {
    delete this.tween;
  }
};

Line.prototype.addPoint = function(point) {
  this.points.push(point);
};

Line.prototype.play = function() {
  this.tween = this.game.add.tween(this.pointer);
  console.log(this.tween);

  while(this.points.length > 0) {
    var point = this.points.shift();
    this.tween.to({ x: point.world.x, y: point.world.y }, 2000, Phaser.Easing.Linear.None);
  }

  this.tween.start();
};

module.exports = Line;