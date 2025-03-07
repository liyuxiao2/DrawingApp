/**

Author: Liyu, Nevathan 

Student Number: 400559252, 400576019

Date Created: Mar 6 2025



This JavaScript file defines the Square class, which represents a square shape on an HTML5 canvas.

*/

export class Square {
  constructor(side, color, x, y) {
    this.side = side;
    this.color = color;
    this.x = x;
    this.y = y;
  }

  /**
   * Draws the square on the canvas.
   */
  draw(){
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.side, this.side);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}