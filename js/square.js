class Square {
  constructor(side, color, x, y) {
    this.side = side;
    this.color = color;
    this.x = x;
    this.y = y;
  }

  draw(){
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.side, this.side);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}