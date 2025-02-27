export class Triangle{
    constructor(sideA,sideB,sideC, color, x, y){
        this.sideA = sideA;
        this.sideB = sideB;
        this.sideC = sideC;
        this.color = color;
        this.x = x;
        this.y = y;
    }

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