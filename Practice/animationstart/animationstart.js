class Grid{
    constructor(w,h,intervalW,strokeC,strokeW){
        this.w = w;
        this.h = h;
        this.intervalW = intervalW;
        this.strokeC = strokeC;
        this.strokeW = strokeW;
    }
    update(){
        this.draw()
    }
    draw(){
        // these loops also draw the grid outside as it is useful when analysing translations
        // and rotations (so you can ignore the negatives and use - instead
        // a loop for the vertical lines
        for(let i = -this.w; i <= this.w; i += this.intervalW) {
            this.drawLine(i, -this.h, i, this.h, this.strokeC, this.strokeW)
        }
        // a loop for the horizontals
        for(let j = -this.h; j <= this.h; j+= this.intervalW){
            this.drawLine(-this.w, j, this.w, j, this.strokeC, this.strokeW)
        }
    }
    drawLine(x_1, y_1, x_2, y_2, strokeC, strokeW){
        ctx.beginPath();
        ctx.moveTo(x_1, y_1);
        ctx.lineTo(x_2, y_2);
        ctx.lineCap = "round";
        ctx.strokeStyle = strokeC;
        ctx.lineWidth = strokeW;
        ctx.stroke();
    }
}

/*
* text box - text on coloured box
* @param {number} x top corner of bounding box
* @param {number} y top corner of bounding box
* @param {number} w width
* @param {string} txt text
* @param {string} fill fill colour
* @param {string} txtColour colour of text
*/

class TextBox {
    constructor(x, y, width, fillC, txtC) {
        this.x = x;
        this.y = y;
        this.w = width;
        // fixed height
        this.h = 50;
        // text managed through update
        this.txt = "Placeholder";
        console.log(this.txt);
        this.fillC = fillC;
        this.txtC = txtC;
    }

    update(txt = "Placeholder") {
        this.txt = txt
        this.draw()
    }

    draw(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = this.fillC;
        ctx.fill();
        ctx.font = "20px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = this.txtC;
        ctx.fillText(this.txt, this.x + this.w / 2, this.y + this.h/2);
    }
}