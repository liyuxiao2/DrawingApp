/**
 * Author: Liyu, Nevathan
 * Student Number: 400559252, 400576019
 * Date Created: Mar 6 2025
 *
 * Defines the Triangle class for drawing a triangle on an HTML5 canvas.
 * Uses three side lengths: sideA (base), sideB, and sideC.
 */

export class Triangle {
    constructor(sideA, sideB, sideC, color, x, y) {
      this.sideA = sideA; // Base of the triangle
      this.sideB = sideB; // Side between vertex B and C
      this.sideC = sideC; // Side between vertex A and C
      this.color = color;
      this.x = x;
      this.y = y;
    }
  
    /**
     * Draws the triangle on the canvas.
     * Vertex A is at (x, y), vertex B is at (x + sideA, y),
     * and vertex C is computed using the law of cosines.
     */
    draw() {
      // Vertex A at (x, y)
      const A = { x: this.x, y: this.y };
      // Vertex B at (x + sideA, y)
      const B = { x: this.x + this.sideA, y: this.y };
      // Compute horizontal offset (d) for vertex C using law of cosines:
      const d = (this.sideA ** 2 + this.sideC ** 2 - this.sideB ** 2) / (2 * this.sideA);
      // Compute vertical offset (h)
      let h = 0;
      const hSquared = this.sideC ** 2 - d ** 2;
      if (hSquared > 0) {
        h = Math.sqrt(hSquared);
      }
      // Vertex C at (x + d, y + h)
      const C = { x: this.x + d, y: this.y + h };
  
      ctx.beginPath();
      ctx.moveTo(A.x, A.y);
      ctx.lineTo(B.x, B.y);
      ctx.lineTo(C.x, C.y);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }
  