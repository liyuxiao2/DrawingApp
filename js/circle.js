/**
 * Author: Liyu, Nevathan
 * Student Number: 400559252, 400576019
 * Date Created: Mar 6 2025
 *
 * Defines the Circle class for drawing a circle on an HTML5 canvas.
 */

export class Circle {
  constructor(radius, color, x, y) {
    this.radius = radius;
    this.color = color;
    this.x = x;
    this.y = y;
  }

  /**
   * Draws the circle on the canvas.
   */
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
