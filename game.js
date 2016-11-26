class Game {
  constructor(canvas, fps) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.serpent = new Serpent(canvas.width/2, canvas.height/2, this.ctx);
    this.fps = fps;
    this.treat = new Treat(this.ctx);
  }

  reset() {
    if (game.over) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.serpent = new Serpent(this.canvas.width/2, this.canvas.height/2, this.ctx);
      this.play();
    }
  }

  get over() {
    return this.outOfBounds || this.serpent.touchingSelf;
  }

  get outOfBounds() {
    return this.serpent.head.x > canvas.width - this.serpent.head.width || this.serpent.head.x < 0 || this.serpent.head.y > canvas.height - this.serpent.head.height || this.serpent.head.y < 0;
  }

  set direction(direction) {
    this.serpent.head.direction = direction;
  }

  play() {
    var game = this;
    var loop = setInterval(function() {
      game.serpent.move();
      game.resetTreat();
      game.offerTreat();
      game.writeCount();
      if (game.over) {
        console.log("Game Over");
        clearInterval(loop);
      }
    }, 1000/this.fps);
    this.offerTreat();
  }

  offerTreat() {
    this.treat.draw();
  }

  resetTreat() {
    if (this.serpent.head.x == this.treat.x && this.serpent.head.y == this.treat.y) {
      // this.treat.clear();
      this.serpent.addSegment();
      this.treat = new Treat(this.ctx);
    }
  }

  writeCount() {
    var snakeLength = document.getElementById('snakeLength');
    snakeLength.innerHTML = "Snake Length: " + this.serpent.length;
  }
}