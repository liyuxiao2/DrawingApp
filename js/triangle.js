/**

Author: Liyu, Nevathan 

Student Number: 400559252, 400576019

Date Created: Mar 6 2025



This JavaScript file defines the Triangle class, which represents a triangle shape on an HTML5 canvas.

*/

export class Triangle{
    constructor(sideA,sideB,sideC, color, x, y){
        this.sideA = sideA;
        this.sideB = sideB;
        this.sideC = sideC;
        this.color = color;
        this.x = x;
        this.y = y;
    }


    /**
     * Draws the triangle on the canvas.
     */
    draw(){
        ctx.beginPath();
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x + this.sideA, this.y);
        ctx.lineTo(this.x + this.sideA, this.y + this.sideB);
        ctx.lineTo(this.x, this.y);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}